#!/bin/bash
# Functional verification of the super-admin fixes:
#  1. super admin 2FA login (email + password + authcode 1997)
#  2. judge-ping endpoint reachable for superadmin (was 403)
#  3. question testing endpoint permission for superadmin (was 403)
#  4. uncapped topic import (>200 topics) into a seeded group
#  5. /admin/settings renders the Super Admin tab for superadmin
#  6. /admin/settings has NO Super Admin tab for regular admin
BASE="http://localhost:3000"
JAR="/tmp/verify-sa-cookies.txt"
rm -f "$JAR"

csrf() { curl -s -c "$JAR" -b "$JAR" "$BASE/api/auth/csrf" | sed -E 's/.*"csrfToken":"([^"]+)".*/\1/'; }

login() { # $1 email, $2 password, $3 code(optional)
  local token=$(csrf)
  local data="csrfToken=$token&email=$1&password=$2"
  [ -n "$3" ] && data="$data&code=$3"
  curl -s -o /dev/null -w "%{http_code}" -c "$JAR" -b "$JAR" \
    -H "Content-Type: application/x-www-form-urlencoded" \
    --data-raw "$data" "$BASE/api/auth/callback/credentials"
}

echo "== 1. superadmin 2FA login =="
S=$(login "superadmin@atomcode.dev" "Mr@1811321" "1997")
echo "callback status: $S (302 = ok)"
curl -s -b "$JAR" "$BASE/api/auth/session" | head -c 300; echo

echo "== 2. judge-ping as superadmin =="
curl -s -o /tmp/ping.json -w "%{http_code}\n" -b "$JAR" "$BASE/api/admin/settings/judge-ping"
head -c 200 /tmp/ping.json; echo

echo "== 3. questions/test permission (empty body -> expect 400, NOT 403) =="
curl -s -w "\nstatus:%{http_code}\n" -b "$JAR" -H "Content-Type: application/json" \
  -X POST --data-raw '{"ids":[]}' "$BASE/api/questions/test"

echo "== 4. uncapped import: 250 topics into seeded group =="
GID=$(curl -s -b "$JAR" "$BASE/api/question-groups" | python3 -c "import sys,json;d=json.load(sys.stdin);g=d if isinstance(d,list) else d.get('groups',d.get('data',[]));print(g[0]['id'] if g else '')" 2>/dev/null)
echo "group id: $GID"
if [ -n "$GID" ]; then
python3 - "$GID" <<'EOF' > /tmp/import-body.json
import json, sys
gid = sys.argv[1]
topics = [{"name": f"bulk-topic-{i}", "subtopics": [{"name": f"sub-{i}-{j}"} for j in range(2)]} for i in range(250)]
json.dump({"topics": topics}, sys.stdout)
EOF
curl -s -w "\nstatus:%{http_code}\n" -b "$JAR" -H "Content-Type: application/json" \
  -X POST --data-binary @/tmp/import-body.json \
  "$BASE/api/question-groups/$GID/topics/import" | head -c 400
else
  echo "SKIP: no question groups found"
fi

echo "== 5. /admin/settings shows Super Admin tab for superadmin =="
curl -s -b "$JAR" "$BASE/admin/settings" | grep -o 'Super Admin' | head -3

echo "== 6. regular admin session: /admin/settings must NOT show Super Admin tab =="
rm -f "$JAR"
A=$(login "admin@atom.com" "Admin@Atom")
echo "admin login status: $A"
H=$(curl -s -b "$JAR" "$BASE/admin/settings")
echo "$H" | grep -c 'value="superadmin"' | xargs echo "superadmin-tab occurrences (expect 0):"
echo "$H" | grep -o 'Code Judge' | head -1

echo "== 7. judge-ping as regular admin (should be 200 too) =="
curl -s -o /dev/null -w "%{http_code}\n" -b "$JAR" "$BASE/api/admin/settings/judge-ping"
