#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# AtomCode Lambda compilers — one-command build + deploy
#
# Prerequisites:
#   1. AWS CLI v2 configured        →  aws configure / aws sso login
#   2. AWS SAM CLI installed        →  https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html
#   3. Docker running (image builds) →  docker info
#
# Usage:
#   ./deploy.sh                                  # guided-ish deploy (defaults)
#   ATOM_TOKEN=my-secret ./deploy.sh             # protect endpoints with a token
#   AWS_REGION=ap-south-1 ./deploy.sh            # pick a region
#   STACK_NAME=my-stack ./deploy.sh              # custom stack name
#
# After deployment the script prints every Function URL — including the
# all-in-one URL you wire into the app:
#   NEXT_PUBLIC_LAMBDA_URL="https://…lambda-url…/atomcode-all"
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

cd "$(dirname "$0")"

STACK_NAME="${STACK_NAME:-atomcode-compilers}"
AWS_REGION="${AWS_REGION:-${AWS_DEFAULT_REGION:-us-east-1}}"
ATOM_TOKEN="${ATOM_TOKEN:-}"

echo "▸ Stack   : ${STACK_NAME}"
echo "▸ Region  : ${AWS_REGION}"
echo "▸ Token   : $([[ -n "${ATOM_TOKEN}" ]] && echo "enabled" || echo "disabled (open endpoints!)")"
echo

command -v sam >/dev/null 2>&1 || {
  echo "✗ AWS SAM CLI not found. Install it first:"; echo "  https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html"; exit 1;
}
docker info >/dev/null 2>&1 || {
  echo "✗ Docker is not running. Start Docker, then re-run."; exit 1;
}

echo "▸ Building container images (first build takes a few minutes)…"
sam build --use-container

echo "▸ Deploying…"
sam deploy \
  --stack-name "${STACK_NAME}" \
  --capabilities CAPABILITY_IAM \
  --resolve-s3 \
  --resolve-image-repos \
  --no-confirm-changeset \
  --no-fail-on-empty-changeset \
  --parameter-overrides AtomToken="${ATOM_TOKEN}" \
  --region "${AWS_REGION}"

echo
echo "───────────────────────────── Function URLs ─────────────────────────────"
aws cloudformation describe-stacks \
  --stack-name "${STACK_NAME}" \
  --region "${AWS_REGION}" \
  --query "Stacks[0].Outputs" \
  --output text \
  | awk '{printf "  %-14s %s\n", $3, $2}'

cat <<'EOF'

─────────────────────────────── next steps ───────────────────────────────
1. Copy the `UrlAllInOne` value.
2. Put it in the app's .env:

     NEXT_PUBLIC_LAMBDA_URL="<UrlAllInOne>"      # enables Lambda execution
     LAMBDA_JUDGE_TOKEN="<ATOM_TOKEN if set>"

3. Restart `bun run dev` — practice/IDE/assessments now run on Lambda
   instead of the browser WASM engine.
4. Verify:  ./smoke-test.sh <UrlAllInOne>
EOF
