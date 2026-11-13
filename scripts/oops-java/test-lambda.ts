/**
 * Quick Java Lambda judge smoke test.
 */
const JAVA_URL = "https://mneuwd5qjng75muooscp6556640eklem.lambda-url.ap-south-1.on.aws/";

async function runMulti(code, testcases, checks) {
  const body = {
    code,
    language: "java",
    testcases,
    timeoutMs: 20000,
    ...(checks ? { checks } : {}),
  };
  const res = await fetch(JAVA_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  try {
    return { status: res.status, data: JSON.parse(text) };
  } catch {
    return { status: res.status, data: text.slice(0, 500) };
  }
}

// Test 1: multi-testcase with stdin
const code1 = `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long a = sc.nextLong();
        long b = sc.nextLong();
        System.out.println(a + b);
    }
}`;
console.log("--- Test 1: sum of two (multi-testcase) ---");
console.log(JSON.stringify(await runMulti(code1, [
  { input: "2 3", expectedOutput: "5" },
  { input: "0 0", expectedOutput: "0" },
  { input: "100 250", expectedOutput: "350" },
  { input: "-5 -7", expectedOutput: "-12" },
]), null, 2));

// Test 2: blacklist check (code uses a blacklisted keyword)
const code2 = `public class Main {
    public static void main(String[] args) {
        java.util.Arrays.sort(new int[]{3,1,2});
        System.out.println("done");
    }
}`;
console.log("--- Test 2: blacklist enforcement (Arrays banned) ---");
console.log(JSON.stringify(await runMulti(code2, [
  { input: "", expectedOutput: "done" },
], { blacklist: "Arrays.sort, Collections.sort" }), null, 2));

// Test 3: whitelist check (code missing required keyword)
const code3 = `public class Main {
    public static void main(String[] args) {
        int x = 5;
        System.out.println(x);
    }
}`;
console.log("--- Test 3: whitelist enforcement (for required) ---");
console.log(JSON.stringify(await runMulti(code3, [
  { input: "", expectedOutput: "5" },
], { whitelist: "for" }), null, 2));

// Test 4: compile error
console.log("--- Test 4: compile error ---");
console.log(JSON.stringify(await runMulti(`public class Main { public static void main(String[] args) { int x = } }`, [
  { input: "", expectedOutput: "x" },
]), null, 2));
