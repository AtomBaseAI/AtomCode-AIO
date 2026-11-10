# AtomCode Lambda Compilers — AWS Deployment Guide

**Step-by-step instructions to deploy the AtomCode server-side compilers to AWS Lambda and wire them into the web app.**

> ⚡ **Prefer zero CLI?** See [`aws/README.md`](./aws/README.md) — push to
> GitHub and a workflow deploys for you. Two flavors: **ZIP (no ECR, no
> containers — all 8 languages, Java via the java21 managed
> runtime)** via `aws/atomcode-zip.yaml`, or **container (ECR — all 8
> languages)** via
> `aws/atomcode-lambda.yaml`. This document covers the SAM/CLI path in
> full detail.

This document supersedes the quick-start in `README.md` §1 with full detail:
every command, every flag, expected outputs, verification checkpoints,
security hardening, tuning, troubleshooting, and cleanup.

---

## Table of contents

- [0. What you are deploying](#0-what-you-are-deploying)
- [1. Prerequisites](#1-prerequisites)
  - [1.1 AWS account & credentials](#11-aws-account--credentials)
  - [1.2 Install AWS CLI v2](#12-install-aws-cli-v2)
  - [1.3 Install AWS SAM CLI](#13-install-aws-sam-cli)
  - [1.4 Install & start Docker](#14-install--start-docker)
  - [1.5 Required IAM permissions](#15-required-iam-permissions)
  - [1.6 Preflight checklist](#16-preflight-checklist)
- [2. Choose a deployment shape](#2-choose-a-deployment-shape)
- [3. The 5-minute path (deploy.sh)](#3-the-5-minute-path-deploysh)
- [4. Manual deployment (understanding every step)](#4-manual-deployment-understanding-every-step)
- [5. Post-deployment verification](#5-post-deployment-verification)
- [6. Wire the app to Lambda](#6-wire-the-app-to-lambda)
- [7. Verify inside the app (single & multi mode)](#7-verify-inside-the-app-single--multi-mode)
- [8. Security hardening](#8-security-hardening)
- [9. Tuning & operations](#9-tuning--operations)
- [10. Updating / redeploying](#10-updating--redeploying)
- [11. Cost model](#11-cost-model)
- [12. Troubleshooting](#12-troubleshooting)
- [13. Cleanup (tear down)](#13-cleanup-tear-down)
- [Appendix A — Command cheat sheet](#appendix-a--command-cheat-sheet)
- [Appendix B — Environment variable reference](#appendix-b--environment-variable-reference)

---

## 0. What you are deploying

The `compilers/` folder contains a SAM stack that deploys **up to 9 Lambda
functions** as **container images**, each fronted by a public **Lambda
Function URL** (no API Gateway needed):

| Function | Purpose | Default memory | Languages served |
|---|---|---|---|
| `atomcode-c` | C execution | 1024 MB | C (gcc, c99/c11/c17) |
| `atomcode-cpp` | C++ execution | 1024 MB | C++ (g++, cpp11–cpp20) |
| `atomcode-java` | Java execution | 2048 MB | Java (Corretto 21, release 8–21) |
| `atomcode-python` | Python execution | 1024 MB | Python 3.12 (profiles 3.11–3.14) |
| `atomcode-ruby` | Ruby execution | 1024 MB | Ruby 3.2 |
| `atomcode-sql` | SQLite execution | 512 MB | SQL (sql.js in-memory) |
| `atomcode-javascript` | JS execution | 1024 MB | JavaScript (Node 20) |
| `atomcode-typescript` | TS execution | 1024 MB | TypeScript (tsc → Node 20) |
| `atomcode-all` ⭐ | **All-in-one** | 3008 MB | **All 8 — dispatches on `language`** |

⭐ The **all-in-one** function is the recommended deployment: one URL, one
`.env` line for the whole app.

Every function:

- runs the same handler (`functions/_shared/handler.mjs`),
- accepts the app's two protocols on the same endpoint (single-run **and**
  multi-testcase judge),
- sandboxes each run (fresh `/tmp` workspace, `ulimit` rlimits, hard
  timeouts, optional privilege drop to `nobody`),
- optionally requires a shared secret (`ATOM_TOKEN` → `x-atom-token` header).

Request flow once wired into the app:

```
browser ──POST /api/execute/lambda──▶ Next.js server route
                                       │ picks URL (all-in-one or per-lang map)
                                       │ adds x-atom-token if configured
                                       ▼
                              Lambda Function URL → handler.mjs → toolchain
```

---

## 1. Prerequisites

You need **one machine with Docker** — your laptop, an EC2 instance, or a
CI runner. Builds are local; AWS only receives the finished images.

### 1.1 AWS account & credentials

1. Sign in to the [AWS Console](https://console.aws.amazon.com/) (or use an
   existing account). Root account usage is discouraged — create an IAM
   user or use IAM Identity Center (SSO).
2. Decide the **region**. Pick the one closest to your users — for India,
   `ap-south-1` (Mumbai) gives the lowest latency. Every `aws`/`sam` command
   below honors `AWS_REGION`.
3. Collect credentials (either path works):
   - **IAM user access key** — Console → IAM → Users → *your-user* →
     Security credentials → *Create access key* → CLI use-case.
   - **SSO** — your org's `aws sso login` flow (ask your admin for the
     start URL and role).

### 1.2 Install AWS CLI v2

```bash
# Linux (x86_64)
curl -fsSL "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o awscliv2.zip
unzip -q awscliv2.zip && sudo ./aws/install
aws --version          # expect: aws-cli/2.x.x …

# macOS (Apple Silicon)
curl -fsSL "https://awscli.amazonaws.com/awscli-exe-linux-aarch64.zip" -o awscliv2.zip
unzip -q awscliv2.zip && sudo ./aws/install

# Windows (PowerShell, admin)
# msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi
```

Configure:

```bash
aws configure
#   AWS Access Key ID:     AKIA…          (or press Enter if using SSO)
#   AWS Secret Access Key: …
#   Default region name:   ap-south-1      ← or your chosen region
#   Default output format: json

# SSO alternative:
aws sso login --profile your-profile
export AWS_PROFILE=your-profile
```

Verify:

```bash
aws sts get-caller-identity
# → {"Account": "123456789012", "Arn": "arn:aws:iam::…:user/…"}
```

✅ **Checkpoint:** `aws sts get-caller-identity` returns your account ARN.

### 1.3 Install AWS SAM CLI

```bash
# Linux (x86_64)
curl -fsSL -o sam.zip https://github.com/aws/aws-sam-cli/releases/latest/download/aws-sam-cli-linux-x86_64.zip
unzip -q sam.zip -d sam-install && sudo ./sam-install/install
sam --version          # expect: SAM CLI, version 1.1xx+

# Linux (arm64) → use aws-sam-cli-linux-arm64.zip in the URL above.
# macOS (Homebrew):
brew install aws-sam-cli

# Windows (PowerShell):
# winget install AWS.SAM-CLI
```

✅ **Checkpoint:** `sam --version` prints a version ≥ 1.100.

### 1.4 Install & start Docker

`sam build` compiles the Dockerfiles in `compilers/functions/*/Dockerfile`
locally, so Docker must be **running** (not just installed).

```bash
docker info    # must succeed without errors
```

- **Linux:** install the Docker Engine and `sudo systemctl start docker`,
  and add yourself to the `docker` group (`sudo usermod -aG docker $USER`,
  re-login). Needed packages: `gcc git unzip` for the AWS/SAM installers.
- **macOS:** Docker Desktop → start it.
- **Windows:** Docker Desktop with WSL2 backend → start it.
- **EC2 AL2023/Ubuntu:** `sudo dnf install docker -y && sudo systemctl start docker`
  (or `apt-get install docker.io`).

> Docker is needed **only for building**. The deployed Lambdas do not use it.

✅ **Checkpoint:** `docker info` exits 0 and shows Server Version.

### 1.5 Required IAM permissions

The deploying identity needs permissions to: create CloudFormation stacks,
create ECR repositories and push images, create S3 deployment buckets,
create Lambda functions + Function URLs + execution roles, and read stack
outputs. For a personal/dev account, an admin-equivalent policy is
simplest. For stricter environments, attach this policy set:

```jsonc
// Minimum for `sam deploy` of this stack (adjust Resource as needed)
{
  "Statement": [
    { "Effect": "Allow", "Action": [
        "cloudformation:*"
      ], "Resource": "*" },
    { "Effect": "Allow", "Action": [
        "ecr:CreateRepository", "ecr:CompleteLayerUpload",
        "ecr:UploadLayerPart", "ecr:InitiateLayerUpload",
        "ecr:PutImage", "ecr:BatchCheckLayerAvailability",
        "ecr:GetDownloadUrlForLayer", "ecr:BatchGetImage",
        "ecr:GetAuthorizationToken", "ecr:SetRepositoryPolicy",
        "ecr:DescribeRepositories", "ecr:DescribeImages"
      ], "Resource": "*" },
    { "Effect": "Allow", "Action": [
        "s3:CreateBucket", "s3:PutObject", "s3:GetObject",
        "s3:ListBucket", "s3:GetBucketLocation"
      ], "Resource": "*" },
    { "Effect": "Allow", "Action": [
        "lambda:CreateFunction", "lambda:UpdateFunctionCode",
        "lambda:UpdateFunctionConfiguration", "lambda:GetFunction",
        "lambda:GetFunctionUrlConfig", "lambda:CreateFunctionUrlConfig",
        "lambda:UpdateFunctionUrlConfig", "lambda:TagResource",
        "lambda:ListFunctions", "lambda:DeleteFunction",
        "lambda:AddPermission", "lambda:RemovePermission"
      ], "Resource": "*" },
    { "Effect": "Allow", "Action": [
        "iam:CreateRole", "iam:PutRolePolicy", "iam:DeleteRolePolicy",
        "iam:DeleteRole", "iam:GetRole", "iam:PassRole",
        "iam:TagRole", "iam:UpdateRole"
      ], "Resource": "*" }
  ]
}
```

(The Lambda execution role itself only needs basic CloudWatch Logs — SAM
creates it via `CAPABILITY_IAM`.)

### 1.6 Preflight checklist

```bash
aws sts get-caller-identity     # → your ARN
sam --version                   # → 1.1xx
docker info >/dev/null          # → exit 0
node --version                  # → v18+ (only needed for local tests)
```

All four pass? Continue. Otherwise fix before proceeding.

---

## 2. Choose a deployment shape

| | **All-in-one** ⭐ recommended | **Per-language** |
|---|---|---|
| Functions deployed | 1 used (`atomcode-all`) — the stack still creates all 9 | all 9, each used |
| App `.env` wiring | 1 line | JSON map, 1 line |
| Scale/limit control | shared | per-language reserved concurrency |
| Cost | one 3 GB image billed per invoke | smaller images billed per invoke |
| Best for | typical AtomCode campus use | isolating a hot language, per-lang budgets |

> The stack deploys all 9 regardless; with the all-in-one shape you simply
> don't wire the per-language URLs. If cost matters, delete the unused
> per-language entries from `template.yaml` before step 3 — nothing else
> changes.

Version profiles supported by the handler (sent as `versionProfileId`):

```
c-c99 · c-c11 · c-c17          cpp-cpp11 · cpp-cpp14 · cpp-cpp17 · cpp-cpp20
java-8 · java-11 · java-17 · java-21
python-3.11 · python-3.12 · python-3.13 · python-3.14   (run on image 3.12)
ruby-3.4 · ruby-3.2            sqlite-3.54
javascript-browser             typescript-5.9
```

---

## 3. The 5-minute path (deploy.sh)

All commands run from the repo root, inside `compilers/`.

```bash
cd compilers
npm install          # dev deps for the local test harness (optional but recommended)
node test/full-verification.mjs   # 69-check gate — should PASS before you deploy
```

### Step 3.1 — Set your variables

```bash
export AWS_REGION=ap-south-1          # your region
export STACK_NAME=atomcode-compilers  # any lowercase/hyphen name
export ATOM_TOKEN="$(openssl rand -base64 32)"   # OPTIONAL but recommended
echo "$ATOM_TOKEN"                    # save this — the app needs it later
```

> `ATOM_TOKEN` protects every endpoint: requests without header
> `x-atom-token: <value>` are rejected with **401**. Leaving it empty
> deploys **open endpoints** (fine for a quick demo, not for production).

### Step 3.2 — Build + deploy (one command)

```bash
./deploy.sh
```

What happens, in order:

1. Preflight — checks `sam` and `docker` exist.
2. `sam build --use-container` — builds each Dockerfile into a local image.
   **First run takes ~3–8 min** (pulls `public.ecr.aws/lambda/nodejs:20`,
   installs gcc/g++/Corretto/Python/Ruby via dnf, npm-installs sql.js +
   TypeScript). Subsequent builds are cached and much faster.
3. `sam deploy` — uploads images to auto-created ECR repos
   (`--resolve-image-repos`), creates an auto-named S3 bucket
   (`--resolve-s3`), creates the CloudFormation stack with
   `CAPABILITY_IAM` (creates each function's execution role), no manual
   confirmation needed (`--no-confirm-changeset`).
4. Prints every Function URL from the stack outputs.

Expected tail of output:

```
───────────────────────────── Function URLs ─────────────────────────────
  UrlC            https://<id>.lambda-url.ap-south-1.on.aws/
  UrlCpp          https://<id>.lambda-url.ap-south-1.on.aws/
  UrlJava         https://<id>.lambda-url.ap-south-1.on.aws/
  UrlPython       https://<id>.lambda-url.ap-south-1.on.aws/
  UrlRuby         https://<id>.lambda-url.ap-south-1.on.aws/
  UrlSql          https://<id>.lambda-url.ap-south-1.on.aws/
  UrlJavascript   https://<id>.lambda-url.ap-south-1.on.aws/
  UrlTypescript   https://<id>.lambda-url.ap-south-1.on.aws/
  UrlAllInOne     https://<id>.lambda-url.ap-south-1.on.aws/   ← use this
```

✅ **Checkpoint:** `UrlAllInOne` (or your per-language URLs) printed above.

If the URLs are gone from your terminal, re-fetch them:

```bash
aws cloudformation describe-stacks --stack-name "$STACK_NAME" \
  --region "$AWS_REGION" \
  --query 'Stacks[0].Outputs[].{Key:@.OutputKey,Url:@.OutputValue}' --output table
```

---

## 4. Manual deployment (understanding every step)

Use this path when you want explicit control, or deploy.sh is unavailable.

### Step 4.1 — Build the images

```bash
cd compilers
sam build --use-container
```

Artifacts land in `.aws-sam/build/`. Each template resource produces one
OCI image tar. Expect ~5 min the first time.

### Step 4.2 — Create the deployment bucket (optional)

`--resolve-s3` auto-creates one. To use your own:

```bash
aws s3 mb s3://my-atomcode-deploy-$AWS_REGION --region $AWS_REGION
```

### Step 4.3 — Deploy

```bash
sam deploy \
  --stack-name atomcode-compilers \
  --capabilities CAPABILITY_IAM \
  --resolve-s3 \
  --resolve-image-repos \
  --no-confirm-changeset \
  --no-fail-on-empty-changeset \
  --parameter-overrides AtomToken="$(openssl rand -base64 32)" \
  --region "$AWS_REGION"
```

Flag meanings:

| Flag | Why |
|---|---|
| `--capabilities CAPABILITY_IAM` | allow CloudFormation to create the functions' IAM execution roles |
| `--resolve-s3` | auto-create/find the deployment S3 bucket |
| `--resolve-image-repos` | auto-create ECR repos for each container image and push |
| `--no-confirm-changeset` | skip the interactive "apply changes?" prompt |
| `--no-fail-on-empty-changeset` | re-running deploy with no changes exits 0 instead of failing |
| `--parameter-overrides AtomToken=…` | sets the stack's `AtomToken` parameter (empty ⇒ open endpoints) |

**Guided alternative:** `sam deploy --guided` walks you through every
prompt (and offers to save defaults to `samconfig.toml` for future deploys).

### Step 4.4 — Grab the URLs

```bash
aws cloudformation describe-stacks \
  --stack-name atomcode-compilers --region "$AWS_REGION" \
  --query 'Stacks[0].Outputs' --output text
# or:
sam list endpoints --stack-name atomcode-compilers --region "$AWS_REGION"
```

---

## 5. Post-deployment verification

Set `URL` to your endpoint and `TOKEN` to the `ATOM_TOKEN` you deployed
with (omit `-H "x-atom-token: …"` if you deployed without a token).

### Step 5.1 — One-shot smoke tests (recommended)

```bash
cd compilers
./smoke-test.sh "$URL"          # all 8 languages × single-run + python multi-judge
```

Expected:

```
  ✓ c
  ✓ cpp
  ✓ java
  ✓ python
  ✓ python (multi-judge 2/2)
  ✓ ruby
  ✓ sql
  ✓ javascript
  ✓ typescript
  Passed: 9   Failed: 0
```

(Per-language deployment: `./smoke-test.sh java <java-url> python <python-url> …`)

### Step 5.2 — Single-run mode, manual curl

One input → one output:

```bash
curl -sS -X POST "$URL" \
  -H "Content-Type: application/json" \
  -H "x-atom-token: $TOKEN" \
  -d '{
    "language": "python",
    "versionProfileId": "python-3.12",
    "code": "name = input()\nprint(f\"Hello, {name}!\")",
    "stdin": "Atom",
    "timeoutMs": 15000
  }'
```

Expected **200**:

```jsonc
{
  "type": "result",
  "executionId": "",            // echoes request executionId if given
  "stdout": "Hello, Atom!\n",
  "stderr": "",
  "exitCode": 0,
  "compileTimeMs": 0.0,         // 0 for interpreted languages
  "executionTimeMs": 8.1
}
```

Error shape (compile failure → stage `compile`; runtime crash → `execute`;
unknown language/toolchain → `toolchain`; malformed body → `bad-request`):

```jsonc
{ "type": "error", "executionId": "", "message": "Traceback (most recent call last): …",
  "stage": "execute" }
```

### Step 5.3 — Multi-testcase judge mode (one request, N cases)

```bash
curl -sS -X POST "$URL" \
  -H "Content-Type: application/json" \
  -H "x-atom-token: $TOKEN" \
  -d '{
    "language": "python",
    "code": "n = int(input())\nprint(n * 2)",
    "testcases": [
      { "input": "5",  "expectedOutput": "10" },
      { "input": "7",  "expectedOutput": "14" },
      { "input": "9",  "expectedOutput": "999" }   // deliberately wrong
    ],
    "timeoutMs": 15000
  }'
```

Expected (note the third case is `Failed`, and the desktop-route alias
fields `testcase1status` / `output1`… are present):

```jsonc
{
  "compileMessage": "Success",
  "compileMessageDetail": "",
  "results": [
    { "status": "Success", "output": "10" },
    { "status": "Success", "output": "14" },
    { "status": "Failed",  "output": "18" }
  ],
  "passedCount": 2,
  "total": 3,
  "testcase1status": "success", "output1": "10",
  "testcase2status": "success", "output2": "14",
  "testcase3status": "failed",  "output3": "18"
}
```

Judge semantics to know: output comparison ignores CR/LF, per-line trailing
whitespace and trailing blank lines; a case with no input **and** no
expected output (index > 0) auto-passes; after a runtime error every
remaining case reports `Error`.

### Step 5.4 — Negative checks

```bash
# 401 — wrong/missing token (only when ATOM_TOKEN was set)
curl -sS -o /dev/null -w '%{http_code}\n' -X POST "$URL" \
  -H "Content-Type: application/json" -d '{"language":"python","code":"1"}'

# 400 — malformed body / unknown language (bad-request)
curl -sS -X POST "$URL" -H "Content-Type: application/json" \
  -H "x-atom-token: $TOKEN" -d '{"language":"cobol","code":"MOVE 1 TO X."}'
# → {"type":"error",…,"stage":"toolchain"}  (unknown language)
```

✅ **Checkpoint:** smoke script 9/9 · curl single-run returns
`type:"result"` · multi-judge returns `passedCount` matching the intended
mix of pass/fail · 401/400 behave as above.

---

## 6. Wire the app to Lambda

The Next.js app auto-detects Lambda and switches **every** language to
server execution. Nothing else changes in the UI.

### Step 6.1 — Edit `.env` in the project root

**All-in-one (recommended):**

```dotenv
NEXT_PUBLIC_LAMBDA_URL="https://<id>.lambda-url.ap-south-1.on.aws/"
LAMBDA_JUDGE_TOKEN="<the ATOM_TOKEN you deployed with>"   # omit if none
```

**Per-language** (overrides the single URL per language; unknown
languages fall back to the single URL if set):

```dotenv
LAMBDA_JUDGE_URLS={"java":"https://<java-url>/","python":"https://<py-url>/","sql":"https://<sql-url>/"}
NEXT_PUBLIC_LAMBDA_URL="https://<all-in-one-or-default>/"
LAMBDA_JUDGE_TOKEN="<the ATOM_TOKEN>"
```

Resolution order inside `/api/execute/lambda` (server-side):
`LAMBDA_JUDGE_URLS` → `LAMBDA_JUDGE_URL` → `NEXT_PUBLIC_LAMBDA_URL`.
`LAMBDA_JUDGE_TOKEN` is attached automatically as the `x-atom-token`
header. Keep `NEXT_PUBLIC_LAMBDA_URL` set even when using the map — the
client's capability probe (`GET /api/execute/lambda`) uses it.

> **Variables are read at server start.** After editing `.env`, restart
> the dev server (`bun run dev`) or redeploy the app for changes to take
> effect.

### Step 6.2 — Restart and confirm the probe

```bash
# restart the app first, then from the machine running the app:
curl -sS http://127.0.0.1:3000/api/execute/lambda
# → {"enabled":true}
```

- `{"enabled":true}` ⇒ wired correctly.
- `{"enabled":false}` ⇒ env not loaded; check `.env` location, spelling,
  and that you restarted.
- Leaving all Lambda env vars **empty** restores the app's built-in local
  executor (native server toolchains; on serverless hosts like Vercel this
  fallback does not exist, so map all languages) — the switch is fully
  opt-in and reversible. Only an *unreachable* Lambda endpoint makes the
  app fall back to the local executor; compile/runtime verdicts from
  Lambda are authoritative.

---

## 7. Verify inside the app (single & multi mode)

Log in as a student (`student@atom.com` / `User@Atom`) and exercise both
execution paths end-to-end:

| What to do | Proves |
|---|---|
| **Practice → code question** — write `n=int(input())`, `print(n*2)`, run with stdin `5` → expect `10`; submit the question (multi-testcase judge runs server-side, per-case ✓/✗ shows) | single-run **and** multi-judge with stdout rendering |
| **Staff/Admin IDE** (staff workspace) — pick each language C, C++, Java, Python, Ruby, SQL, JS, TS and run a hello-world; SQL also renders the structured result grid | every toolchain compiles & runs; errors display in the output panel |
| **Assessment code question** — start, answer, submit | Lambda verdicts flow into grading/results |
| Deliberate failure — run code that raises/crashes or fails compilation | the error message + stage appears in the UI (not a hang) |

✅ **Checkpoint:** outputs and error messages render in the app exactly as
they did with the built-in engine — same panels, now served by Lambda.

For an automated end-to-end gate against a deployed URL, reuse the smoke
script (§5.1) plus the local full verification (§3 preamble) which covers
69 checks including version profiles, SQL grids, error cascades, hard
timeouts, keyword blacklist/whitelist, payload limits, and HTTP contract.

---

## 8. Security hardening

Production checklist, in order of importance:

1. **Shared secret (deploy-time).** Deploy with `ATOM_TOKEN` — done above.
   Rotate by redeploying with a new value and updating the app's
   `LAMBDA_JUDGE_TOKEN`.
2. **Network-isolate user code.** A default Lambda has internet egress.
   To forbid it, attach the functions to **private VPC subnets with no NAT
   gateway** — user code can then never reach the network:

   ```yaml
   # template.yaml → each function's Properties:
       VpcConfig:
         SecurityGroupIds: ["sg-0123456789abcdef0"]
         SubnetIds: ["subnet-0123456789abcdef0"]
   ```

   (The execution role needs the `AWSLambdaVPCAccessExecutionRole`
   managed policy; SAM's default role can be extended accordingly. Function
   URLs still work — inbound access is unaffected.)

3. **Rate-limit at the app layer.** The Next.js proxy already requires a
   next-auth session, size-caps payloads, and clamps timeouts — the app is
   the natural choke point. Optionally add reserved concurrency on the
   Lambda side (§9) so abuse cannot fan out.
4. **Restrict CORS.** The app calls the Lambda **server-side**, so
   browsers never hit the Function URL directly. You can lock CORS down
   to nothing usable in production:

   ```yaml
       FunctionUrlConfig:
         AuthType: NONE
         Cors:
           AllowOrigins: ["https://your-app.example.com"]   # or remove Cors entirely
   ```

5. **Watch the logs.** Every run is logged to CloudWatch
   (`/aws/lambda/atomcode-all-<stack>`). Add an alarm on `Errors` +
   `Throttles`:

   ```yaml
   # add to Resources: (per function)
   AtomAllErrorsAlarm:
     Type: AWS::CloudWatch::Alarm
     Properties:
       FunctionName: !Ref AtomAllFn
       Statistic: Sum
       MetricName: Errors
       Namespace: AWS/Lambda
       Period: 300
       EvaluationPeriods: 1
       Threshold: 5
       ComparisonOperator: GreaterThanThreshold
       AlarmActions: [<your-sns-topic-arn>]
   ```

6. **Keyword rules per question.** The app's question editor blacklists/
   whitelists substrings (e.g. forbid `process`, `fs`, `ProcessBuilder`)
   — these are enforced **server-side** by the handler too, so they hold
   even against clients bypassing the browser checks.

---

## 9. Tuning & operations

### Memory & timeout

Defaults live in `template.yaml` Globals (`Timeout: 300`, `MemorySize:
1024`; Java 2048 MB; all-in-one 3008 MB). Lambda CPU scales with memory —
the all-in-one at 3 GB gives roughly one vCPU, which suits one compile/run
at a time. Raise memory for faster compiles (cost scales linearly with
GB-second, so it's roughly time-neutral for CPU-bound runs).

### Ephemeral storage (compilers' scratch space)

Each run writes to `/tmp` (default quota **512 MB** — fine for typical
student programs). For large artifacts (bigger Java builds), raise it:

```yaml
    Properties:
      EphemeralStorage: { Size: 2048 }   # MB, up to 10240
```

### Cold starts & concurrency

- Cold start: ~1–3 s interpreted languages, ~3–6 s JVM; **once per warm
  instance**. Campus-sized traffic keeps instances warm naturally.
- **Reserved concurrency** (protect other workloads + cap fan-out):

  ```yaml
      Properties:
        ReservedConcurrentExecutions: 50
  ```

- **Provisioned concurrency** (eliminates cold starts; costs ~$0.05/h at
  3 GB): create an alias and point the Function URL at it:

  ```yaml
      AutoPublishAlias: live
      ProvisionedConcurrencyConfig:
        ProvisionedConcurrentExecutions: 2
      FunctionUrlConfig:
        AuthType: NONE
        # Function URLs serve the alias automatically when AutoPublishAlias is set
  ```

- Default account limit is 1,000 concurrent executions (soft quota —
  request an increase in Service Quotas if needed).

### Observability

```bash
sam logs -n --stack-name "$STACK_NAME" --region "$AWS_REGION" --tail     # live tail
aws logs tail "/aws/lambda/atomcode-all-$STACK_NAME" --follow            # same, via CLI
aws lambda list-function-urls --region "$AWS_REGION" --output table      # all URLs
```

---

## 10. Updating / redeploying

Handler or langspec change → `./deploy.sh` again. CloudFormation only
replaces what changed; `--no-fail-on-empty-changeset` makes no-op reruns
exit 0. ECR layers are cached, so handler-only changes redeploy in ~1–2
min.

`template.yaml` change (memory, token, VPC) → same: rerun deploy.

Rollback to the previous deployment:

```bash
aws cloudformation rollback --stack-name "$STACK_NAME" --region "$AWS_REGION"
```

---

## 11. Cost model

Billed per **GB-second** of execution + per request:

- All-in-one (3 GB): ~1 s per run ⇒ ≈ **$0.000005 per execution** +
  ≈ $0.0000002/request (Function URL). A campus of 1,000 students × 50
  runs/day ≈ **≈ $1/month**.
- Cold starts are billed as normal invokes (1–3 s each) — negligible at
  campus scale.
- Provisioned concurrency (optional §9) is the only material extra
  (~$0.05/h per warm instance at 3 GB).
- ECR storage (~1–3 GB of images) ≈ $0.10/GB-month.

Check the [Lambda pricing page](https://aws.amazon.com/lambda/pricing/)
for your region's exact rates.

---

## 12. Troubleshooting

| Symptom | Cause → Fix |
|---|---|
| `✗ Docker is not running` (deploy.sh) | Start Docker Desktop / `systemctl start docker`; verify `docker info` |
| `sam: command not found` | Install SAM CLI (§1.3); check PATH |
| `sam build` hangs pulling `public.ecr.aws/lambda/nodejs:20` | Slow mirror/proxy; retry, or pre-pull: `docker pull public.ecr.aws/lambda/nodejs:20` |
| `Error: Not authorized to perform: ecr:CreateRepository` (or iam:/s3:) | Deploying identity lacks §1.5 permissions → attach them or use an admin identity |
| `CAPABILITY_IAM` error from `sam deploy` | You omitted `--capabilities CAPABILITY_IAM` (only relevant in manual path) |
| Deploy succeeds, but curl returns **401** | `ATOM_TOKEN` is set; add header `x-atom-token: <token>` — the app reads it from `LAMBDA_JUDGE_TOKEN` |
| curl returns **400** stage `bad-request` | Body must be JSON with `code`; unknown languages yield stage `toolchain` |
| curl returns **502** through the app proxy (`Could not reach the Lambda compiler runtime.`) | Function URL wrong/unreachable from the app server; test the URL directly with curl (§5.2) |
| App probe says `{"enabled":false}` | `.env` not loaded or empty Lambda vars → set `NEXT_PUBLIC_LAMBDA_URL` / `LAMBDA_JUDGE_URLS`, **restart** the app |
| A language errors with stage `toolchain` only for that language | Per-language URL map (`LAMBDA_JUDGE_URLS`) points at the wrong function; or toolchain missing in a custom image — redeploy stock Dockerfiles |
| Java/C/C++ runs hang then `timeout` | Insufficient memory (raise `MemorySize`) or `timeoutMs` too low; JVM needs ~2 GB for comfortable compiles |
| `ECONNREFUSED`/`timeout` in app logs but curl works | App server can't reach the URL (proxy/firewall); ensure the app host has egress to `*.on.aws` |
| Build/run succeeds locally but 500s on Lambda | Compare CloudWatch logs (§9); the images bake the same handler — usually a `/tmp` or rlimit nuance; check `ATOM_ULIMITS`/`ATOM_DROP_PRIVILEGES` notes in `handler.mjs` |
| Stack stuck in `CREATE_FAILED` | Read `aws cloudformation describe-stack-events --stack-name … --max-items 20`; fix the named resource, then delete + redeploy |

Debug escalation path: smoke-test.sh → direct curl (§5.2) → app proxy logs
(`[execute/lambda]` lines) → `sam logs` → CloudWatch Logs Insights.

---

## 13. Cleanup (tear down)

```bash
cd compilers
sam delete --stack-name "$STACK_NAME" --region "$AWS_REGION"   # guided; deletes ECR repos too
```

Manual equivalent:

```bash
aws cloudformation delete-stack --stack-name "$STACK_NAME" --region "$AWS_REGION"
# then remove auto-created ECR repos if any remain:
aws ecr describe-repositories --region "$AWS_REGION" \
  --query 'repositories[?starts_with(repositoryName, `atomcode-compilers`)].repositoryName' --output text \
  | tr '\t' '\n' | xargs -r -n1 aws ecr delete-repository --repository-name --force --region "$AWS_REGION"
```

And empty/delete the `--resolve-s3` deployment bucket if you want zero
residue. Then clear the Lambda env vars from the app `.env` (fall back to
the built-in local executor).

---

## Appendix A — Command cheat sheet

```bash
# ── one-time setup ────────────────────────────────────────────────
aws configure                          # credentials + region
export AWS_REGION=ap-south-1 STACK_NAME=atomcode-compilers
export ATOM_TOKEN="$(openssl rand -base64 32)"

# ── pre-deploy local gate ─────────────────────────────────────────
cd compilers && npm install && node test/full-verification.mjs

# ── deploy ────────────────────────────────────────────────────────
./deploy.sh                            # build + deploy + print URLs

# ── verify ────────────────────────────────────────────────────────
./smoke-test.sh "https://<all-in-one-url>"        # 9/9 expected (script takes no token flag)
curl -sS -X POST "https://<url>" -H "Content-Type: application/json" \
  -H "x-atom-token: $ATOM_TOKEN" \
  -d '{"language":"python","code":"print(1+1)"}'

# ── wire app ──────────────────────────────────────────────────────
# .env:  NEXT_PUBLIC_LAMBDA_URL="https://<url>"  LAMBDA_JUDGE_TOKEN="<token>"
curl -sS http://127.0.0.1:3000/api/execute/lambda   # → {"enabled":true}

# ── operate ───────────────────────────────────────────────────────
sam logs -n --stack-name "$STACK_NAME" --tail
aws lambda list-function-urls --region "$AWS_REGION" --output table

# ── redeploy / rollback / delete ──────────────────────────────────
./deploy.sh
aws cloudformation rollback --stack-name "$STACK_NAME" --region "$AWS_REGION"
sam delete --stack-name "$STACK_NAME"
```

## Appendix B — Environment variable reference

**Lambda side** (set via `template.yaml` / deploy overrides):

| Variable | Effect |
|---|---|
| `ATOM_TOKEN` | when non-empty, requests must send `x-atom-token: <value>` (401 otherwise) |
| `ATOM_DROP_PRIVILEGES` | `off` disables the `runuser nobody` drop (local/emulator use) |
| `ATOM_ULIMITS` | `off` skips rlimits (shared-host emulator use) |

**App side** (project `.env`, read by `/api/execute/lambda`):

| Variable | Effect |
|---|---|
| `NEXT_PUBLIC_LAMBDA_URL` | all-in-one Function URL; also flips the client probe to `{enabled:true}` |
| `LAMBDA_JUDGE_URL` | server-only single URL (takes precedence over the public var) |
| `LAMBDA_JUDGE_URLS` | JSON map `{ "java": "url", … }` — per-language routing on top of the single URL |
| `LAMBDA_JUDGE_TOKEN` | shared secret sent as `x-atom-token` on every upstream call |

All empty ⇒ the app uses its built-in local executor (native server
toolchains — server-side only; serverless hosts must map all languages).
