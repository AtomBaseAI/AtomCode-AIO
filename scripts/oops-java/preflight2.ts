const JAVA_URL = "https://mneuwd5qjng75muooscp6556640eklem.lambda-url.ap-south-1.on.aws/";

async function runMulti(code, testcases) {
  const res = await fetch(JAVA_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, language: "java", testcases, timeoutMs: 20000 }),
  });
  return { status: res.status, data: await res.json().catch(() => res.text()) };
}

// Test A: printf %.2f locale (decimal separator)
const codeA = `public class Main {
    public static void main(String[] args) {
        double x = 12.5;
        System.out.printf("%.2f%n", x);
        System.out.println(String.format("%.2f", x / 4));
    }
}`;
console.log("--- Test A: double formatting ---");
console.log(JSON.stringify(await runMulti(codeA, [{ input: "", expectedOutput: "12.50\n3.13" }])));

// Test B: Scanner nextLine after nextInt gotcha
const codeB = `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = Integer.parseInt(sc.nextLine().trim());
        String name = sc.nextLine().trim();
        System.out.println(n + " " + name);
    }
}`;
console.log("--- Test B: nextLine-based parsing ---");
console.log(JSON.stringify(await runMulti(codeB, [
  { input: "3\nAtom Code", expectedOutput: "3 Atom Code" },
])));

// Test C: integer division + modulo negative handling
const codeC = `public class Main {
    public static void main(String[] args) {
        System.out.println(-7 / 2);
        System.out.println(-7 % 2);
        long big = 3000000000L;
        System.out.println(big * 2);
    }
}`;
console.log("--- Test C: int division/modulo/long ---");
console.log(JSON.stringify(await runMulti(codeC, [{ input: "", expectedOutput: "-3\n-1\n6000000000" }])));

// Test D: long compile+run timing (measure)
const t0 = Date.now();
const codeD = `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        long fact = 1;
        for (int i = 2; i <= n; i++) fact *= i;
        System.out.println(fact);
    }
}`;
const r = await runMulti(codeD, [
  { input: "5", expectedOutput: "120" },
  { input: "10", expectedOutput: "3628800" },
  { input: "20", expectedOutput: "2432902008176640000" },
]);
console.log("--- Test D: factorial timing ---");
console.log("elapsed ms:", Date.now() - t0);
console.log(JSON.stringify(r));
