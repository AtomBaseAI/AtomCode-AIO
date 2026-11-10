/**
 * AtomCode — local verification of the java21 ZIP judge
 * (compilers/functions/java-zip → target/atomcode-java-judge.jar).
 *
 * Runs the REAL judge jar in direct-invoke mode (JSON on stdin → JSON on
 * stdout, same code path as the Lambda handler minus the HTTP envelope) and
 * checks the full single-run + multi-testcase judge contract from
 * compilers/functions/_shared/handler.mjs.
 *
 *   node verify-java.mjs                 # system compiler path
 *   ATOM_COMPILER=ecj node verify-java.mjs   # bundled ECJ path (subset)
 *
 * Requires `java` on PATH (or $JAVA). Exit code 0 = all checks passed.
 */

import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const jar = process.env.JUDGE_JAR
  ?? path.join(here, "..", "functions", "java-zip", "target", "atomcode-java-judge.jar");
const java = process.env.JAVA ?? "java";

if (!existsSync(jar)) {
  console.error(`Judge jar not found at ${jar}`);
  console.error("Build it first: mvn -q -B package (in compilers/functions/java-zip)");
  process.exit(1);
}

let pass = 0, fail = 0;
function check(label, ok, detail = "") {
  console.log(`${ok ? "✓" : "✗"} ${label}${detail && !ok ? `\n    ${detail.split("\n").join("\n    ")}` : ""}`);
  ok ? pass++ : fail++;
}

/** POST a direct-invoke request to the judge jar. */
function call(payload, mode = "system") {
  const env = { ...process.env, ATOM_COMPILER: process.env.ATOM_COMPILER ?? mode };
  const res = spawnSync(java, ["-jar", jar], {
    input: JSON.stringify(payload),
    encoding: "utf8",
    timeout: 60_000,
    env,
  });
  if (res.error) return { type: "error", message: `spawn failed: ${res.error.message}` };
  try {
    return JSON.parse(res.stdout.trim().split("\n").pop());
  } catch {
    return { type: "error", message: `unparseable output: ${res.stdout?.slice(0, 200)}` };
  }
}

const HELLO =
  'import java.util.Scanner;\npublic class Main {\n  public static void main(String[] args) {\n' +
  '    Scanner s = new Scanner(System.in);\n    System.out.println("Hello, " + s.nextLine() + "!");\n  }\n}';
const DOUBLE =
  'import java.util.Scanner;\npublic class Main {\n  public static void main(String[] args) {\n' +
  '    System.out.println(new Scanner(System.in).nextInt() * 2);\n  }\n}';

const suffix = process.env.ATOM_COMPILER === "ecj" ? " [ecj]" : "";
console.log(`\nAtomCode Java judge (${jar}) — compiler mode: ${process.env.ATOM_COMPILER ?? "auto"}`);

/* ── 1. single runs ─────────────────────────────────────────────────────── */
console.log(`\nA. SINGLE RUN${suffix}`);

const hello = call({ code: HELLO, stdin: "Atom", timeoutMs: 15000 });
check(
  `hello + stdin${suffix}`,
  hello.type === "result" && hello.exitCode === 0 &&
    String(hello.stdout ?? "").replace(/\n+$/, "") === "Hello, Atom!",
  JSON.stringify(hello).slice(0, 300),
);

const arith = call({ code: "public class Main{public static void main(String[] a){System.out.println(40+2);}}" });
check(
  `expression stdout${suffix}`,
  arith.type === "result" && arith.stdout?.trim() === "42" &&
    typeof arith.executionTimeMs === "number" && arith.executionId === "",
  JSON.stringify(arith).slice(0, 300),
);

const packaged = call({
  code: "package foo.bar;\npublic class Main{public static void main(String[] a){System.out.println(\"pkg-ok\");}}",
});
check(
  `package + mainClass detection${suffix}`,
  packaged.type === "result" && packaged.stdout?.trim() === "pkg-ok",
  JSON.stringify(packaged).slice(0, 300),
);

const named = call({ code: 'public class Hello{public static void main(String[] a){System.out.println("named-ok");}}' });
check(
  `public type name detection${suffix}`,
  named.type === "result" && named.stdout?.trim() === "named-ok",
  JSON.stringify(named).slice(0, 300),
);

const rec = call({
  // non-public record + public Main: one public top-level type per file
  code: "record P(int v){}\npublic class Main{public static void main(String[] a){System.out.println(new P(7).v());}}",
  versionProfileId: "java-21",
});
check(
  `java-21 profile (records)${suffix}`,
  rec.type === "result" && rec.stdout?.trim() === "7",
  JSON.stringify(rec).slice(0, 300),
);

const old = call({
  code: "public class Main{public static void main(String[] a){var x = 5; System.out.println(x);}}",
  versionProfileId: "java-8",
});
check(
  `java-8 profile rejects var${suffix}`,
  old.type === "error" && old.stage === "compile" && /var/i.test(old.message ?? ""),
  JSON.stringify(old).slice(0, 300),
);

const runtime = call({ code: "public class Main{public static void main(String[] a){throw new RuntimeException(\"boom\");}}" });
check(
  `runtime exception → result with exitCode≠0 (compiled-language contract)${suffix}`,
  runtime.type === "result" && runtime.exitCode !== 0 && /boom/.test(runtime.stderr ?? ""),
  JSON.stringify(runtime).slice(0, 300),
);

const timeout = call({ code: "public class Main{public static void main(String[] a){while(true){}}}", timeoutMs: 1500 });
check(
  `timeout → {stage:execute, timedOut:true}${suffix}`,
  timeout.type === "error" && timeout.stage === "execute" && timeout.timedOut === true &&
    timeout.message === "Execution timed out.",
  JSON.stringify(timeout).slice(0, 300),
);

const compileErr = call({ code: "class Main{ public static void main(String[] a){ System.out.println(1 } }" });
check(
  `compile error → {stage:compile, message non-empty}${suffix}`,
  compileErr.type === "error" && compileErr.stage === "compile" &&
    typeof compileErr.message === "string" && compileErr.message.length > 0,
  JSON.stringify(compileErr).slice(0, 300),
);

/* ── 2. multi-testcase judge ────────────────────────────────────────────── */
console.log(`\nB. MULTI-TESTCASE JUDGE${suffix}`);

const twoOfThree = call({
  code: DOUBLE,
  testcases: [
    { input: "5", expectedOutput: "10" },
    { input: "7", expectedOutput: "14" },
    { input: "9", expectedOutput: "999" },
  ],
  timeoutMs: 15000,
});
check(
  `judge 2/3 → aggregate Failed${suffix}`,
  twoOfThree.compileMessage === "Failed" && twoOfThree.passedCount === 2 && twoOfThree.total === 3 &&
    twoOfThree.results?.[0]?.status === "Success" && twoOfThree.results?.[1]?.status === "Success" &&
    twoOfThree.results?.[2]?.status === "Failed" &&
    twoOfThree.testcase1status === "success" && twoOfThree.testcase3status === "failed" &&
    twoOfThree.output3?.trim() === "18",
  JSON.stringify(twoOfThree).slice(0, 400),
);

const allPass = call({
  code: DOUBLE,
  testcases: [{ input: "5", expectedOutput: "10" }, { input: "7", expectedOutput: "14" }],
  timeoutMs: 15000,
});
check(
  `judge all-pass → aggregate Success${suffix}`,
  allPass.compileMessage === "Success" && allPass.passedCount === 2 && allPass.total === 2,
  JSON.stringify(allPass).slice(0, 400),
);

const autoPass = call({
  code: DOUBLE,
  testcases: [{ input: "5", expectedOutput: "10" }, { input: "", expectedOutput: "" }, { input: "7", expectedOutput: "14" }],
  timeoutMs: 15000,
});
check(
  `judge placeholder auto-pass${suffix}`,
  autoPass.compileMessage === "Success" && autoPass.passedCount === 3 &&
    autoPass.results?.[1]?.status === "Success" && autoPass.results?.[1]?.output === "",
  JSON.stringify(autoPass).slice(0, 400),
);

const judgeCompileFail = call({
  code: "class Main{ public static void main(String[] a){ System.out.println(1 } }",
  testcases: [{ input: "1", expectedOutput: "1" }, { input: "2", expectedOutput: "2" }, { input: "3", expectedOutput: "3" }],
  timeoutMs: 15000,
});
check(
  `judge compile failure → Error + sticky${suffix}`,
  judgeCompileFail.compileMessage === "Error" &&
    judgeCompileFail.results?.[0]?.status === "Error" && judgeCompileFail.results?.[0]?.output?.length > 0 &&
    judgeCompileFail.results?.[1]?.status === "Error" && judgeCompileFail.results?.[1]?.output === "" &&
    judgeCompileFail.results?.[2]?.status === "Error" &&
    (judgeCompileFail.compileMessageDetail ?? "").length > 0 &&
    judgeCompileFail.passedCount === 0 && judgeCompileFail.total === 3,
  JSON.stringify(judgeCompileFail).slice(0, 400),
);

const judgeTimeout = call({
  code: "public class Main{public static void main(String[] a){while(true){}}}",
  testcases: [{ input: "", expectedOutput: "1" }, { input: "", expectedOutput: "2" }],
  timeoutMs: 1200,
});
check(
  `judge timeout → sticky Error${suffix}`,
  judgeTimeout.compileMessage === "Error" && judgeTimeout.results?.[0]?.status === "Error" &&
    judgeTimeout.results?.[0]?.output === "Execution timed out." &&
    judgeTimeout.results?.[1]?.status === "Error" && judgeTimeout.results?.[1]?.output === "",
  JSON.stringify(judgeTimeout).slice(0, 400),
);

const emptyCases = call({ code: DOUBLE, stdin: "5", testcases: [] });
// mirrors handler.mjs: multi = testcases.length > 0 → an EMPTY list routes to
// the single-run path (runMulti's empty guard is defensive dead code there too)
check(
  `empty testcase list routes to single run${suffix}`,
  emptyCases.type === "result" && emptyCases.stdout?.trim() === "10",
  JSON.stringify(emptyCases).slice(0, 300),
);

/* ── 3. error paths ─────────────────────────────────────────────────────── */
console.log(`\nC. ERROR PATHS${suffix}`);

const emptyCode = call({ code: "   " });
check(
  `empty code → bad-request${suffix}`,
  emptyCode.type === "error" && emptyCode.stage === "bad-request" && emptyCode.message === "Code is empty.",
  JSON.stringify(emptyCode).slice(0, 300),
);

const blacklisted = call({ code: 'public class Main{public static void main(String[] a){System.out.println(1);}}', checks: { blacklist: "println" } });
check(
  `blacklist enforced${suffix}`,
  blacklisted.type === "error" && blacklisted.stage === "compile" &&
    blacklisted.message === "Blacklist keyword(s) found in the code!",
  JSON.stringify(blacklisted).slice(0, 300),
);

const whitelisted = call({ code: 'public class Main{public static void main(String[] a){System.out.println(1);}}', checks: { whitelist: "loop" } });
check(
  `whitelist enforced${suffix}`,
  whitelisted.type === "error" && whitelisted.stage === "compile" &&
    whitelisted.message === "Whitelist keyword(s) missing from the code!",
  JSON.stringify(whitelisted).slice(0, 300),
);

const tooMany = call({
  code: DOUBLE,
  testcases: Array.from({ length: 11 }, (_, i) => ({ input: String(i), expectedOutput: String(i * 2) })),
});
check(
  `too many testcases rejected${suffix}`,
  tooMany.type === "error" && tooMany.stage === "bad-request" &&
    /limit 10/.test(tooMany.message ?? ""),
  JSON.stringify(tooMany).slice(0, 300),
);

const execId = call({ code: "public class Main{public static void main(String[] a){System.out.println(1);}}", executionId: "exec-verify-9" });
check(
  `executionId echoed${suffix}`,
  execId.executionId === "exec-verify-9",
  JSON.stringify(execId.executionId),
);

/* ── summary ────────────────────────────────────────────────────────────── */
console.log(`\nTOTAL: ${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);
