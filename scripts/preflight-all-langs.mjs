/**
 * Pre-flight E2E check: validate the 8 sample question codes + test cases
 * against the REAL deployed Lambda judge endpoints (same protocol the app's
 * Run Test Cases button uses via /api/execute/lambda).
 */
import { readFileSync } from "node:fs";

const raw = readFileSync("/home/z/my-project/.env", "utf8");
const urlMap = JSON.parse(
  raw.match(/LAMBDA_JUDGE_URLS=(.*)/)[1].trim().replace(/^'/, "").replace(/'$/, "")
);

// Canonical problem: "Sum of 1..N" — input N, print 1+2+...+N
const cases = [
  { input: "5", expectedOutput: "15" },
  { input: "10", expectedOutput: "55" },
  { input: "100", expectedOutput: "5050" },
  { input: "3", expectedOutput: "6" },
  { input: "7", expectedOutput: "28" },
];

const SQL_GRID = ["name | salary", "--- | ---", "Bob | 7000", "Cara | 6000"].join("\n");
const sqlCases = Array.from({ length: 5 }, (_, i) => ({
  input: "-",
  expectedOutput: SQL_GRID,
}));

const questions = {
  python: {
    code: "n = int(input())\nprint(sum(range(1, n + 1)))\n",
    testcases: cases,
  },
  c: {
    code: '#include <stdio.h>\n\nint main(void) {\n    int n;\n    scanf("%d", &n);\n    printf("%d\\n", n * (n + 1) / 2);\n    return 0;\n}\n',
    testcases: cases,
  },
  cpp: {
    code: '#include <iostream>\n\nint main() {\n    int n;\n    std::cin >> n;\n    std::cout << n * (n + 1) / 2 << std::endl;\n    return 0;\n}\n',
    testcases: cases,
  },
  java: {
    code: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        System.out.println(n * (n + 1) / 2);\n    }\n}\n',
    testcases: cases,
  },
  javascript: {
    code: 'const input = require("fs").readFileSync(0, "utf8").trim();\nconst n = parseInt(input, 10);\nconsole.log((n * (n + 1)) / 2);\n',
    testcases: cases,
  },
  typescript: {
    code: 'const input: string = require("fs").readFileSync(0, "utf8").trim();\nconst n: number = parseInt(input, 10);\nconsole.log((n * (n + 1)) / 2);\n',
    testcases: cases,
  },
  ruby: {
    code: "n = gets.to_i\nputs (1..n).sum\n",
    testcases: cases,
  },
  sql: {
    code: "WITH emp AS (\n    SELECT 1 AS id, 'Alice' AS name, 5000 AS salary\n    UNION ALL SELECT 2, 'Bob', 7000\n    UNION ALL SELECT 3, 'Cara', 6000\n)\nSELECT name, salary FROM emp WHERE salary > 5500 ORDER BY salary DESC;\n",
    testcases: sqlCases,
  },
};

let allPass = true;
for (const [lang, spec] of Object.entries(questions)) {
  const url = urlMap[lang];
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: lang,
        code: spec.code,
        testcases: spec.testcases,
        timeoutMs: 20000,
      }),
    });
    const data = await res.json();
    const statuses = (data.results ?? []).map((r) => r.status);
    const pass = statuses.length === spec.testcases.length && statuses.every((s) => s === "Success");
    console.log(
      `${pass ? "PASS" : "FAIL"} ${lang.padEnd(12)} statuses=[${statuses.join(",")}] overall=${data.compileMessage} passed=${data.passedCount}/${data.total}`
    );
    if (!pass) {
      allPass = false;
      console.log("   detail:", JSON.stringify(data).slice(0, 500));
    }
  } catch (err) {
    allPass = false;
    console.log(`FAIL ${lang}: ${err.message}`);
  }
}
console.log(allPass ? "\nALL 8 LANGUAGES PASS ✅" : "\nSOME LANGUAGES FAILED ❌");
process.exit(allPass ? 0 : 1);
