# Local pre-check harness (authoring tool, not part of the shipped bank).
# Runs every code question's sourcecode against its 5 cases with local python3
# and emulates the blacklist/whitelist mechanical checks.
# Usage: python3 scripts/python-programming/builders/localcheck.py <file.code.json>
import json, subprocess, sys, tempfile, os

def norm(s):
    lines = [ln.rstrip() for ln in str(s).replace("\r\n", "\n").split("\n")]
    out = "\n".join(lines).rstrip("\n")
    return out.strip()

path = sys.argv[1]
data = json.load(open(path))
fails = 0
for q in data["questions"]:
    cases = [
        (q["sampleinput1"], q["sampleoutput1"]),
        (q["sampleinput2"], q["sampleoutput2"]),
        (q["input1"], q["output1"]),
        (q["input2"], q["output2"]),
        (q["input3"], q["output3"]),
    ]
    for idx, (inp, exp) in enumerate(cases):
        fd, fn = tempfile.mkstemp(suffix=".py")
        with os.fdopen(fd, "w") as f:
            f.write(q["sourcecode"])
        try:
            r = subprocess.run([sys.executable, fn], input=inp, capture_output=True, text=True, timeout=20)
        finally:
            os.unlink(fn)
        act = norm(r.stdout)
        exp_n = norm(exp)
        for field, want in (("blacklist", False), ("whitelist", True)):
            items = [s.strip() for s in str(q.get(field, "")).split(",") if s.strip()]
            for kw in items:
                present = q["sourcecode"].find(kw) != -1
                if want is False and present:
                    print(f"CHECK-FAIL [{q['title']}]: blacklisted '{kw}' present in solution")
                    fails += 1
                if want is True and not present:
                    print(f"CHECK-FAIL [{q['title']}]: whitelisted '{kw}' missing from solution")
                    fails += 1
        if r.returncode != 0 or act != exp_n:
            fails += 1
            print(f"FAIL [{q['title']}] case{idx+1}: rc={r.returncode} exp={exp_n!r} got={act!r} err={r.stderr[-200:]!r}")
print("TOTAL FAILS:", fails)
