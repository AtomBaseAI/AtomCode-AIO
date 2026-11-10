# AtomCode Compilers — Deploy from GitHub (no CLI)

**The whole deployment is: push this repo to GitHub. Done.**

- Region: **ap-south-1 (Mumbai)** — hardcoded everywhere.
- Access: **open** — no token, no header, anyone with the URL can use it.
- Two ways to deploy — **pick exactly one**:

| | **Option A — ZIP** ⭐ no ECR | **Option B — Container** |
|---|---|---|
| Uses ECR / Docker | **none** | ECR repo (auto-created) |
| Languages on Lambda | **8**: python, ruby, javascript, typescript, sql, c, cpp, **java** | **8**: all |
| Java runtime | java21 managed runtime (Lambda provides the JVM) + bundled ECJ | javac + JVM inside the image |
| Cold start | ~1 s (node) · ~1–3 s (java) | ~3–6 s (container boot + JVM) |
| AWS resources | 3 Lambda functions + 1 plain S3 bucket | 1 Lambda + 1 ECR repo |
| Stack / workflow | `atomcode-compilers-zip` · `deploy-compilers-zip.yml` | `atomcode-compilers` · `deploy-compilers.yml` |

**Recommended: Option A.** No container registry, no Docker, faster cold
starts — and since the java21 runtime supplies the JVM itself, Java fits
the 250 MB ZIP limit with room to spare (~6 MB judge jar).

Both options share the same setup steps 1–2 below; only the deploy step
and the app `.env` wiring differ.

---

## Step 1 — Create the deployer IAM user (AWS Console)

1. Sign in to the AWS Console → **switch region to Mumbai (ap-south-1)**.
2. Go to **IAM → Users → Create user**:
   - Name: `atomcode-github-deploy`
   - Console access: **off**
3. On the permissions page choose **Attach policies directly → Create policy**,
   switch to the **JSON** tab and paste:

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "AtomCfn",
         "Effect": "Allow",
         "Action": [
           "cloudformation:CreateStack", "cloudformation:UpdateStack",
           "cloudformation:DeleteStack", "cloudformation:DescribeStacks",
           "cloudformation:DescribeStackEvents", "cloudformation:DescribeStackResource",
           "cloudformation:CreateChangeSet", "cloudformation:ExecuteChangeSet",
           "cloudformation:DeleteChangeSet", "cloudformation:DescribeChangeSet",
           "cloudformation:ValidateTemplate", "cloudformation:GetTemplate",
           "cloudformation:ListStacks", "cloudformation:GetStackPolicy",
           "cloudformation:GetTemplateSummary"
         ],
         "Resource": "*"
       },
       {
         "Sid": "AtomLambda",
         "Effect": "Allow",
         "Action": [
           "lambda:CreateFunction", "lambda:UpdateFunctionCode",
           "lambda:UpdateFunctionConfiguration", "lambda:GetFunction",
           "lambda:GetFunctionConfiguration", "lambda:DeleteFunction",
           "lambda:TagResource", "lambda:UntagResource", "lambda:ListTags",
           "lambda:CreateFunctionUrlConfig", "lambda:UpdateFunctionUrlConfig",
           "lambda:GetFunctionUrlConfig", "lambda:DeleteFunctionUrlConfig",
           "lambda:AddPermission", "lambda:RemovePermission", "lambda:GetPolicy",
           "lambda:ListFunctions"
         ],
         "Resource": "*"
       },
       {
         "Sid": "AtomIamRoles",
         "Effect": "Allow",
         "Action": [
           "iam:CreateRole", "iam:DeleteRole", "iam:GetRole",
           "iam:PassRole", "iam:TagRole", "iam:UntagRole", "iam:UpdateRole",
           "iam:PutRolePolicy", "iam:DeleteRolePolicy", "iam:GetRolePolicy",
           "iam:AttachRolePolicy", "iam:DetachRolePolicy"
         ],
         "Resource": "*"
       },
       {
         "Sid": "AtomZipStorage",
         "Effect": "Allow",
         "Action": [
           "s3:CreateBucket", "s3:PutObject", "s3:GetObject",
           "s3:ListBucket", "s3:GetBucketLocation", "s3:DeleteObject"
         ],
         "Resource": "*"
       },
       {
         "Sid": "AtomLambdaLogs",
         "Effect": "Allow",
         "Action": [
           "logs:DescribeLogGroups", "logs:DescribeLogStreams",
           "logs:FilterLogEvents", "logs:GetLogEvents"
         ],
         "Resource": "*"
       },
       {
         "Sid": "AtomEcrOnlyForOptionB",
         "Effect": "Allow",
         "Action": [
           "ecr:GetAuthorizationToken", "ecr:CreateRepository",
           "ecr:DescribeRepositories", "ecr:BatchCheckLayerAvailability",
           "ecr:InitiateLayerUpload", "ecr:UploadLayerPart",
           "ecr:CompleteLayerUpload", "ecr:PutImage", "ecr:BatchGetImage",
           "ecr:GetDownloadUrlForLayer"
         ],
         "Resource": "*"
       }
     ]
   }
   ```

   Name it `atomcode-github-deploy`, create it, attach it to the user.
   (The `AtomEcrOnlyForOptionB` block is only needed if you pick Option B —
   harmless to include.)

4. On the user's **Security credentials** tab → **Create access key** →
   *Application running outside AWS* → **Create**.
5. Copy the two values for the next step.

## Step 2 — Add the secrets in GitHub

1. Push this project to a GitHub repository (`main` branch):

   ```bash
   git init && git add -A && git commit -m "atomcode"
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```

2. Repo → **Settings → Secrets and variables → Actions** → **New repository
   secret**, twice:

   | Name | Value |
   |---|---|
   | `AWS_ACCESS_KEY_ID` | the access key ID from step 1 |
   | `AWS_SECRET_ACCESS_KEY` | the secret access key from step 1 |

No AWS CLI, no SAM, no Docker on your machine — the GitHub runner does
all of it.

---

## Step 3A — Deploy Option A: ZIP (no ECR) ⭐

Open the repo's **Actions** tab → **deploy-compilers-zip** → **Run
workflow**, or just `git push` (any change under `compilers/` triggers it).

What the workflow does:

1. Builds three self-contained Lambda zips on the runner:
   - `atomcode-core.zip` (~140 MB unpacked): handler + bundled
     python-build-standalone 3.12 + portable-ruby 3.4.5 + sql.js + tsc —
     serves **python, ruby, javascript, typescript, sql**
   - `atomcode-gcc.zip`: gcc/g++/binutils mirrored from `amazonlinux:2023`
     (same glibc as the Lambda runtime) — serves **c, cpp**
   - `atomcode-java.zip` (~6 MB): the Java judge jar
     ([`compilers/functions/java-zip`](../functions/java-zip)) for the
     **java21 managed runtime** — serves **java**
2. Runs the local verification suites against the built artifacts (real
   handler/judge, real toolchains — the gates must pass before anything
   uploads): `verify-local.mjs` (core layout) + `verify-java.mjs` (judge
   contract, both compiler paths).
3. Uploads all three zips to a plain S3 bucket
   `atomcode-deploy-<account>-aps1` (auto-created).
4. Creates/updates the CloudFormation stack `atomcode-compilers-zip`
   from `compilers/aws/atomcode-zip.yaml` — three open Function URLs.
5. Smoke-tests all three functions and writes to the run **Summary**:
   - **Core URL**, **GCC URL**, **Java URL**, and a ready-to-paste
     `LAMBDA_JUDGE_URLS=…` JSON line.
6. Prunes the deploy bucket — keeps the **3 newest zips per folder**
   (core/gcc/java) and deletes older ones, so the bucket never grows
   past ~320 MB no matter how many times you redeploy.

### How the Java judge works (java21 managed runtime)

A JVM is ~300 MB — it can't ship inside a 250 MB ZIP. The trick: **Lambda's
managed `java21` runtime provides the JVM**, so the deployment zip only
needs the judge jar (~6 MB, shaded with Jackson + the Eclipse compiler).

- Compilation of user code runs **in-process**: the runtime's JDK compiler
  first (`javax.tools`), with **bundled ECJ 3.42.0** as a guaranteed
  fallback for JRE-only runtimes. Selection via `ATOM_COMPILER=system|ecj|auto`.
- User code runs as a subprocess (`java -Xmx512m -cp out Main`) with stdin
  piped, 200k-char stream caps and a tree-kill on timeout — same sandbox
  semantics as the Node handler.
- The response contract is byte-compatible with the Node handler
  (`{type:"result",stdout,stderr,exitCode,executionTimeMs}` /
  `{type:"error",stage}` and the full multi-testcase judge shape), so the
  app treats it exactly like every other function. Local contract suite:
  `node compilers/zipbuild/verify-java.mjs` (20 checks × both compilers).

## Step 4A — Wire the app (Option A)

In the project `.env` — paste the `LAMBDA_JUDGE_URLS` line **exactly as
printed in the workflow summary** (it looks like this):

```dotenv
LAMBDA_JUDGE_URLS={"python":"https://<core>.lambda-url.ap-south-1.on.aws/","ruby":"https://<core>…/","javascript":"https://<core>…/","typescript":"https://<core>…/","sql":"https://<core>…/","c":"https://<gcc>…/","cpp":"https://<gcc>…/","java":"https://<java>…/"}
```

Notes:

- **All 8 languages are on the map** — java included. That matters for
  serverless hosting (e.g. Vercel): unmapped languages fall back to the
  app's **native server executor** (ECJ + local JVM), which **does not
  exist on Vercel/Serverless functions** — so always keep `java` mapped.
- Keep it a per-language map. Don't set `NEXT_PUBLIC_LAMBDA_URL` unless you
  deploy the all-in-one Option B stack — that single-URL variable routes
  *every* language (java included) to that one function.
- **No** `LAMBDA_JUDGE_TOKEN` — endpoints are open.

Restart the app, then confirm the probe:

```bash
curl http://127.0.0.1:3000/api/execute/lambda     # → {"enabled":true}
```

Quick endpoint checks:

```bash
curl -sS -X POST "https://<core-url>" -H "Content-Type: application/json" \
  -d '{"language":"python","code":"print(2+3)"}'
# → {"type":"result","stdout":"5\n",...}

curl -sS -X POST "https://<gcc-url>" -H "Content-Type: application/json" \
  -d '{"language":"cpp","code":"#include <iostream>\nint main(){ std::cout << 40+2; }"}'
# → {"type":"result","stdout":"42",...}

curl -sS -X POST "https://<java-url>" -H "Content-Type: application/json" \
  -d '{"language":"java","code":"public class Main{public static void main(String[] a){System.out.println(40+2);}}"}'
# → {"type":"result","stdout":"42\n",...}
```

Full checks: `node compilers/zipbuild/verify-local.mjs` (layout),
`node compilers/zipbuild/verify-java.mjs` (java judge) and
`compilers/smoke-test.sh <url>` / `node compilers/test/full-verification.mjs`
(protocol — needs local toolchains; on a bare machine the core languages
still run via the downloaded layout under `compilers/zipbuild/dist/core`).

---

## Step 3B / 4B — Deploy Option B: Container (all 8 languages)

The original one-function container image (javac + JVM + all toolchains in
ECR). Same IAM user and secrets.

1. Actions tab → **deploy-compilers** → **Run workflow** (or push).
   It builds the all-in-one image, pushes it to the auto-created ECR repo
   `atomcode-compilers` (~$0.15/mo storage), and creates stack
   `atomcode-compilers` with one open Function URL.
2. Copy the **Function URL** from the run Summary.
3. `.env`:

   ```dotenv
   NEXT_PUBLIC_LAMBDA_URL="https://<random>.lambda-url.ap-south-1.on.aws/"
   ```

Full container details (manual SAM path, hardening, tuning):
[`../DEPLOYMENT.md`](../DEPLOYMENT.md).

---

## Switching between options

- **A → B or B → A:** delete one stack, deploy the other, swap the `.env`
  line (`LAMBDA_JUDGE_URLS` vs `NEXT_PUBLIC_LAMBDA_URL`), restart the app.
- Both stacks can coexist temporarily; give the two URLs different names in
  `.env` and cut over per language via the map.

## Updating

Change any compiler file → `git push` → the chosen workflow redeploys.
Stack updates reuse the same URLs, so the app `.env` never changes.
Rollback: re-run an older successful workflow run, or Console →
CloudFormation → stack → **Stack actions → Rollback stack**.

## Costs (Mumbai)

- ZIP (Option A): core/gcc ≈ **$0.000003 per run** at 1 GB; java ≈
  **$0.000006 per run** at 2 GB + ~$0.0000002/request each. S3 storage of
  zips ~$0.03/mo. 1,000 students × 50 runs/day ≈ **<$2/month** total.
- Container (Option B): similar + ECR image storage ~$0.15/mo.

## Deleting everything

- **Option A:** Console → CloudFormation → delete stack
  `atomcode-compilers-zip`; S3 → empty + delete
  `atomcode-deploy-<account>-aps1`.
- **Option B:** delete stack `atomcode-compilers`; ECR → delete repo
  `atomcode-compilers`.
- IAM user can be deleted if you no longer deploy.

## ⚠️ One honest warning

"Anyone can access from anywhere" means **anyone with the URL runs code on
your AWS bill**. The URLs are long random names (unguessable in practice)
and the app only exposes them through your logged-in server — but don't
paste them publicly. Timeouts and payload caps bound what a single abuse
can cost. If you ever change your mind about tokens, add an `ATOM_TOKEN`
env var on the Lambda(s) (Console → Function → Configuration → Environment
variables) and set `LAMBDA_JUDGE_TOKEN` in the app `.env` — two minutes,
documented in [`../DEPLOYMENT.md`](../DEPLOYMENT.md) §8.
