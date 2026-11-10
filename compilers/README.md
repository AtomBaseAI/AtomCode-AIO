# AtomCode — AWS Lambda Compilers

Server-side code execution for **every AtomCode language**, deployable to
AWS Lambda. Two deployment flavors: **ZIP (no ECR)** — 3 functions covering
all 8 languages incl. Java via the java21 managed runtime — or the
all-in-one **container (ECR)** image.

| Language | Lambda toolchain | Version profiles supported |
|---|---|---|
| C | GCC (AL2023) | `c-c99`, `c-c11`, `c-c17` |
| C++ | g++ (AL2023) | `cpp-cpp11`, `cpp-cpp14`, `cpp-cpp17`, `cpp-cpp20` |
| Java | Corretto 21 `javac` + JVM (`--release 8/11/17/21`) | `java-8`, `java-11`, `java-17`, `java-21` |
| Python | CPython 3.12 | `python-3.11`…`python-3.14` (run on the image's 3.12) |
| Ruby | CRuby 3.2 (AL2023) | `ruby-3.4`, `ruby-3.2` |
| SQL | SQLite (sql.js, in-memory) | `sqlite-3.54` |
| JavaScript | Node.js 20 | `javascript-browser` |
| TypeScript | tsc `transpileModule` → Node 20 | `typescript-5.9` |

Two deployment shapes ship out of the box:

- **All-in-one** (recommended) — one Lambda image containing every toolchain,
  one Function URL for the whole app.
- **Per-language** — eight independent functions (scale, version and budget
  each language separately).

```
compilers/
├── functions/
│   ├── _shared/handler.mjs        ← THE handler (one file drives every language)
│   ├── _shared/langspec/*.json    ← per-language toolchain configuration
│   ├── c/Dockerfile  cpp/Dockerfile  java/Dockerfile  python/Dockerfile
│   ├── ruby/Dockerfile  sql/Dockerfile  javascript/Dockerfile
│   ├── typescript/Dockerfile  all/Dockerfile   ← all-in-one image
├── template.yaml                  ← AWS SAM stack (9 functions + Function URLs)
├── deploy.sh                      ← sam build + sam deploy + prints URLs
├── smoke-test.sh                  ← end-to-end checks against deployed URLs
├── test/local-test.mjs            ← runs the real handler locally, no AWS
├── package.json                   ← dev deps for the local test harness
```

---

## 1. Deploy to AWS

> 📘 **Full step-by-step guide:** [`DEPLOYMENT.md`](./DEPLOYMENT.md) — every
> command, expected outputs, IAM permissions, hardening, tuning,
> troubleshooting, and teardown.
>
> ⚡ **No-CLI alternative:** [`aws/README.md`](./aws/README.md) — pick one:
> **ZIP deploy (no ECR, no Docker, 7 languages)** or **container deploy
> (ECR, all 8 languages)** — both are push-to-GitHub workflows with a plain
> CloudFormation template, ap-south-1, open endpoints, no tokens.

Prerequisites: **AWS CLI v2** (configured), **SAM CLI**, **Docker** running.

```bash
cd compilers
./deploy.sh                       # stack "atomcode-compilers" in us-east-1
# options:
#   AWS_REGION=ap-south-1 ./deploy.sh
#   STACK_NAME=my-stack ./deploy.sh
#   ATOM_TOKEN=some-secret ./deploy.sh   # require x-atom-token header on every call
```

The script builds every container image with `sam build --use-container`,
deploys the stack, and prints all Function URLs:

```
───────────────────────────── Function URLs ─────────────────────────────
  UrlC            https://xxxx.lambda-url.us-east-1.on.aws/
  UrlJava         https://xxxx.lambda-url.us-east-1.on.aws/
  ...
  UrlAllInOne     https://xxxx.lambda-url.us-east-1.on.aws/   ← use this one
```

Then smoke-test:

```bash
./smoke-test.sh https://<UrlAllInOne>          # all languages, one URL
# or per-language:
./smoke-test.sh java https://<java-url> python https://<python-url> ...
```

## 2. Wire the app to Lambda (instead of the built-in engine)

Put the all-in-one URL in the project `.env`:

```dotenv
# Enables Lambda execution for the whole web app (practice, IDE, assessments).
NEXT_PUBLIC_LAMBDA_URL="https://xxxx.lambda-url.us-east-1.on.aws/"

# Optional per-language override map (JSON, server-side) — a per-language
# deployment instead of the all-in-one:
# LAMBDA_JUDGE_URLS={"java":"https://…","python":"https://…"}

# Only when you deployed with ATOM_TOKEN:
# LAMBDA_JUDGE_TOKEN="some-secret"
```

Restart the dev server. On the first code run the client probes
`GET /api/execute/lambda` (cached per session); when it answers
`{ enabled: true }`, `judgeRunSingle` / `judgeRunTestCases` route **every**
language through `/api/execute/lambda` → Lambda. Leave the env vars empty
to keep using the built-in local executor — the switch is fully opt-in and
reversible. The Lambda's compile/runtime verdicts are authoritative; only
an unreachable endpoint falls back to the built-in engines.

Flow:

```
browser judge ──GET /api/execute/lambda──▶ { enabled }  (once, cached)
              ──POST /api/execute/lambda─▶ Next.js server route
                                           │ picks URL (per-lang map or single)
                                           │ adds x-atom-token if configured
                                           ▼
                                  Lambda Function URL (handler.mjs)
```

### Try it locally before deploying AWS

A mini-service serves the REAL handler at `http://127.0.0.1:3030` with
exact Function-URL semantics (the sandbox's `dev.sh` auto-starts it):

```
mini-services/lambda-emulator/      # bun --hot, port 3030
```

Add `LAMBDA_JUDGE_URL=http://127.0.0.1:3030` to `.env` and every code run
in the app executes through the same handler that ships inside the Lambda
images (Java/C/C++/Ruby need their toolchains, which exist on AWS but not
on the local sandbox — locally use Python/JS/TS/SQL to see full success).

## 3. HTTP contract

Both protocols are served by the same endpoint (HTTP POST, JSON body).

### Single run (mirrors `src/lib/execution-types.ts`)

```jsonc
// request
{
  "executionId": "exec-…",          // optional, echoed back
  "language": "java",               // required on all-in-one; ignored per-language
  "versionProfileId": "java-17",    // optional → toolchain flags (see table above)
  "code": "public class Main { … }",
  "stdin": "optional input",
  "timeoutMs": 15000,               // clamped 1s…60s
  "checks": {                       // optional keyword rules (same semantics as
    "blacklist": "ProcessBuilder",  // the app's client checks: comma-separated
    "whitelist": ""                 // substrings; blacklist = any hit rejects,
  }                                 // whitelist = all must be present)
}

// 200 OK — success (exactly the app's RunResult)
{
  "type": "result",
  "executionId": "exec-…",
  "stdout": "Hello, Atom!\n",
  "stderr": "",
  "exitCode": 0,
  "compileTimeMs": 812.3,
  "executionTimeMs": 42.1,
  "sql": { "columns": ["id"], "rows": [["1"]], "changes": 0 }   // sql only
}

// 200 OK — failure (exactly the app's RunError)
{ "type": "error", "executionId": "exec-…", "message": "Compilation failed…", "stage": "compile" }
//   stage ∈ compile | execute | toolchain | bad-request
```

### Multi-testcase judge (mirrors `wasm-judge.ts` + the desktop route shape)

```jsonc
// request
{
  "language": "python",
  "code": "n = int(input())\nprint(n*2)",
  "testcases": [
    { "input": "5", "expectedOutput": "10" },
    { "input": "7", "expectedOutput": "14" },
    { "input": "",  "expectedOutput": "" }        // placeholder → auto-pass
  ],
  "timeoutMs": 15000
}

// response
{
  "compileMessage": "Success",       // Success | Failed | Error (overall)
  "compileMessageDetail": "",        // compiler stderr when a compile failed
  "results": [ { "status": "Success", "output": "10" }, … ],
  "passedCount": 3,
  "total": 3,
  "testcase1status": "success",      // ← desktop-route compatible aliases
  "output1": "10", ...
}
```

Semantics match the app's judge exactly: output comparison normalizes
CR/LF, per-line trailing whitespace and trailing blank lines; a case with
no input **and** no expected output (index > 0) auto-passes; after a
runtime `Error` every remaining case reports `Error`.

## 4. Sandbox & limits

| Control | Value |
|---|---|
| Fresh temp workspace per run (`/tmp/atomlambda-*`) | removed in `finally` |
| Compile timeout | 30 s hard kill (whole process group) |
| Run timeout | per-language default (5–30 s), request clamped 1–60 s |
| CPU rlimit (`ulimit -t`) | run timeout + 1 s |
| Process rlimit (`ulimit -u`) | 128 (256 for Java) |
| File-size rlimit (`ulimit -f`) | 32 MB (64 MB for Java) |
| Privilege drop | `runuser -u nobody` (auto-fallback when unavailable; disable with `ATOM_DROP_PRIVILEGES=off` locally) |
| Payload limits | code ≤ 200 k chars, stdin ≤ 1 M chars, ≤ 10 testcases |
| Shared secret | `ATOM_TOKEN` env → require `x-atom-token` header |
| Keyword rules | server-side blacklist/whitelist, same as client checks |

> **Hardening for production:** a Lambda function with NAT-vpc egress can
> reach the internet. For strict network isolation attach the functions to a
> VPC whose subnets have **no NAT gateway / internet gateway** — user code
> then has no outbound network at all. Combine with `ATOM_TOKEN`.

## 5. Cost model

Billed per GB-second. The all-in-one image (3 GB, ~1 s per run at
3 GB) ≈ **$0.000005 per execution** + ~$0.0000002/req Function URL. A
campus of 1,000 students × 50 runs/day ≈ **≈ $1/month**. Cold starts:
~1–3 s for interpreted languages, ~3–6 s for the JVM (first invoke only
per warm instance).

## 6. Local development (no AWS)

```bash
cd compilers
npm install                       # typescript + sql.js for the TS/SQL paths
node test/full-verification.mjs   # FULL matrix: every language × every mode
node test/local-test.mjs          # quick smoke of the REAL handler
# optional HTTP emulator (same as mini-services/lambda-emulator):
node test/local-server.mjs        # listens on :3030
```

`test/full-verification.mjs` is the authoritative gate (69 checks): toolchain
inventory · single-run hello + stdin→output for all 8 languages · version
profiles · SQL structured payload · multi-testcase judge for all 8 languages
(incl. wrong-expected → `Failed`, compile-fail cascade, runtime-error
cascade) · compile/runtime error stages · native exit codes · hard timeouts ·
keyword blacklist/whitelist · payload limits · `executionId` echo · and the
full HTTP Function-URL contract (200/400/401, `ATOM_TOKEN`, CORS) against a
spawned local emulator. Portable JDK/Ruby under `/tmp` are picked up
automatically when present, so Java and Ruby are exercised locally too.

Missing local toolchains (e.g. javac, ruby) are auto-skipped in the quick
smoke — they exist inside the Lambda images. Every fix should pass the full
verification first; the handler file is byte-identical to the one baked into
the images.

## 7. Notes & version differences vs the built-in engine

- **Python** runs CPython 3.12 (not the four Pyodide builds); pure-stdlib
  code and stdin behave identically. Pip packages are not supported.
- **Ruby** runs CRuby 3.2 (AL2023 package) under the `ruby-3.4` profile id.
- **JavaScript/TypeScript** run on server-side Node 20 — that includes Node
  built-ins (`fs`, `process`…). Use question `blacklist` fields to forbid
  them, exactly as you would forbid them in the browser engine.
- **Java** uses real javac semantics (`--release 8/11/17/21`): in-process
  JDK compiler or bundled ECJ on the ZIP function, `javac --release` in the
  container image. The file-name rule for `public` classes still applies.
- **SQL** uses SQLite via sql.js with byte-identical grid rendering
  (`col | col`, `--- | ---`, `NULL`) to keep judged outputs identical.
