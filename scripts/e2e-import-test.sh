#!/bin/bash
# E2E test: import the uploaded question-group JSON through the real API.
set -euo pipefail

BASE=http://localhost:3000
JAR=/tmp/atom-cookies.txt
FILE=/home/z/my-project/upload/question-group-c-programming-2026-11-13.json
rm -f "$JAR"

echo "== 1. Get CSRF token =="
CSRF_JSON=$(curl -s -c "$JAR" "$BASE/api/auth/csrf")
CSRF=$(echo "$CSRF_JSON" | python3 -c "import sys,json;print(json.load(sys.stdin)['csrfToken'])")
echo "csrfToken=${CSRF:0:12}..."

echo "== 2. Sign in as admin@atom.com =="
LOGIN_HTTP=$(curl -s -o /tmp/atom-login-body.txt -w "%{http_code}" -b "$JAR" -c "$JAR" \
  -X POST "$BASE/api/auth/callback/credentials" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  --data-urlencode "csrfToken=$CSRF" \
  --data-urlencode "email=admin@atom.com" \
  --data-urlencode "password=Admin@Atom" \
  --data-urlencode "callbackUrl=$BASE/admin" \
  --data-urlencode "json=true")
echo "login HTTP $LOGIN_HTTP"

echo "== 3. Verify session =="
SESSION=$(curl -s -b "$JAR" "$BASE/api/auth/session")
echo "$SESSION" | python3 -c "import sys,json;d=json.load(sys.stdin);print('session user:',d.get('user',{}).get('email'),'role:',d.get('user',{}).get('role'))" 2>/dev/null \
  || { echo "session: $SESSION"; tail -5 /tmp/atom-login-body.txt; }

echo "== 4. POST the question-group import (400 code questions) =="
IMPORT_HTTP=$(curl -s -o /tmp/atom-import-resp.json -w "%{http_code}" -b "$JAR" \
  -X POST "$BASE/api/question-groups/import" \
  -H "Content-Type: application/json" \
  --data-binary @"$FILE")
echo "import HTTP $IMPORT_HTTP"
python3 -m json.tool /tmp/atom-import-resp.json | head -30
