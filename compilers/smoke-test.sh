#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# AtomCode Lambda compilers — smoke tests
#
# Usage:
#   ./smoke-test.sh https://<all-in-one-function-url>           # all languages on one URL
#   ./smoke-test.sh java https://<java-url> [python <url>] ...  # per-language URLs
#
# Requires: curl. Exits non-zero if any test fails.
# ─────────────────────────────────────────────────────────────────────────────
set -uo pipefail

PASS=0; FAIL=0

# run_test <language> <url> <code> <expected-stdout> [stdin]
run_test() {
  local lang="$1" url="$2" code="$3" expected="$4" stdin="${5:-}"
  local body
  body=$(printf '{"language":"%s","code":%s,"stdin":%s,"timeoutMs":15000}' \
    "$lang" "$(python3 -c "import json,sys;print(json.dumps(sys.argv[1]))" "$code")" \
    "$(python3 -c "import json,sys;print(json.dumps(sys.argv[1]))" "$stdin")")

  local resp status out
  resp=$(curl -sS -w $'\n%{http_code}' -X POST "$url" \
    -H "Content-Type: application/json" -d "$body" 2>/dev/null)
  status=$(printf '%s' "$resp" | tail -n1)
  out=$(printf '%s' "$resp" | sed '$d' | python3 -c "import json,sys;d=json.load(sys.stdin);print(d.get('stdout','') if d.get('type')=='result' else 'ERROR:'+str(d.get('message','')))" 2>/dev/null)

  if [[ "$status" == "200" && "$out" == "$expected" ]]; then
    echo "  ✓ $lang"
    PASS=$((PASS+1))
  else
    echo "  ✗ $lang (HTTP $status) got: $(printf '%s' "$out" | head -c 200)"
    FAIL=$((FAIL+1))
  fi
}

# multi_test <language> <url> <code> <input1> <expected1> <input2> <expected2>
multi_test() {
  local lang="$1" url="$2" code="$3" in1="$4" e1="$5" in2="$6" e2="$7"
  local payload resp out
  payload=$(python3 - "$lang" "$code" "$in1" "$e1" "$in2" "$e2" <<'PY'
import json, sys
lang, code, in1, e1, in2, e2 = sys.argv[1:7]
print(json.dumps({
  "language": lang, "code": code, "timeoutMs": 15000,
  "testcases": [{"input": in1, "expectedOutput": e1}, {"input": in2, "expectedOutput": e2}],
}))
PY
)
  resp=$(curl -sS -X POST "$url" -H "Content-Type: application/json" -d "$payload" 2>/dev/null)
  out=$(printf '%s' "$resp" | python3 -c "import json,sys;d=json.load(sys.stdin);print(d.get('compileMessage',''), d.get('passedCount','-'),'/',d.get('total','-'))" 2>/dev/null)
  if [[ "$out" == Success\ 2\ /\ 2* ]]; then
    echo "  ✓ $lang (multi-judge 2/2)"
    PASS=$((PASS+1))
  else
    echo "  ✗ $lang multi-judge → $out"
    FAIL=$((FAIL+1))
  fi
}

URLS=()
if [[ $# -eq 1 ]]; then
  BASE="$1"; shift
  for lang in c cpp java python ruby sql javascript typescript; do
    URLS+=("$lang" "$BASE")
  done
else
  while [[ $# -ge 2 ]]; do URLS+=("$1" "$2"); shift 2; done
fi

echo "AtomCode Lambda compilers — smoke tests"
echo "────────────────────────────────────────"
for ((i=0; i<${#URLS[@]}; i+=2)); do
  lang="${URLS[$i]}"; url="${URLS[$((i+1))]}"
  case "$lang" in
    c)
      run_test c "$url" '#include <stdio.h>
int main(){ printf("Hello, Atom!\n"); return 0; }' 'Hello, Atom!'
      ;;
    cpp)
      run_test cpp "$url" '#include <iostream>
int main(){ std::cout << "Hello, Atom!" << std::endl; }' 'Hello, Atom!'
      ;;
    java)
      run_test java "$url" 'public class Main {
    public static void main(String[] args) { System.out.println("Hello, Atom!"); }
}' 'Hello, Atom!'
      ;;
    python)
      run_test python "$url" 'name = input()
print(f"Hello, {name}!")' 'Hello, Atom!' 'Atom'
      multi_test python "$url" 'n = int(input())
print(n * 2)' '3' '6' '7' '14'
      ;;
    ruby)
      run_test ruby "$url" 'puts "Hello, Atom!"' 'Hello, Atom!'
      ;;
    sql)
      run_test sql "$url" "CREATE TABLE t (id INTEGER, name TEXT);
INSERT INTO t VALUES (1, 'Asha'), (2, 'Rahul');
SELECT * FROM t;" $'id | name\n--- | ---\n1 | Asha\n2 | Rahul'
      ;;
    javascript)
      run_test javascript "$url" 'console.log("Hello, Atom!");' 'Hello, Atom!'
      ;;
    typescript)
      run_test typescript "$url" 'const msg: string = "Hello, Atom!";
console.log(msg);' 'Hello, Atom!'
      ;;
  esac
done

echo "────────────────────────────────────────"
echo "Passed: $PASS   Failed: $FAIL"
[[ $FAIL -eq 0 ]]
