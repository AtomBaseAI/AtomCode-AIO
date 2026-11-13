/**
 * Builder for Day 4 — "Looping Statements".
 * Emits:
 *   /home/z/my-project/scripts/c-programming/data/day-04.code.json  (20 code questions)
 *   /home/z/my-project/scripts/c-programming/data/day-04.mcq.json   (20 MCQ questions)
 */
import { writeFileSync } from "node:fs";

const DAY = 4;
const TOPIC = "Looping Statements";
const SUBTOPICS = [
  "for Loop",
  "while Loop",
  "do-while Loop",
  "Nested Loops",
  "break and continue in Loops",
];

function codeQ(o: Record<string, unknown>) {
  return Object.assign({ lang: "c", topic: TOPIC }, o);
}
function mcq(o: Record<string, unknown>) {
  return Object.assign(
    { iscodesnippet: false, codesnippet: null, snippetLang: null },
    o
  );
}

/* ────────────────────────────── CODE QUESTIONS ────────────────────────────── */
const questions = [
  // ── EASY BASIC (6) ─────────────────────────────────────────────────────────
  codeQ({
    title: "Series Sum One to N",
    description: `Read a non-negative integer N and print the sum 1 + 2 + ... + N using a for loop.

Input Format:
A single integer N.

Output Format:
Print the sum as a 64-bit integer.

Constraints:
0 <= N <= 100000`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "for Loop",
    sampleinput1: "5",
    sampleoutput1: "15",
    sampleinput2: "10",
    sampleoutput2: "55",
    input1: "0",
    output1: "0",
    input2: "1",
    output2: "1",
    input3: "100",
    output3: "5050",
    inputconstrains: "0 <= N <= 100000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n, i;
    long long sum = 0;
    scanf("%d", &n);
    for (i = 1; i <= n; i++) {
        sum += i;
    }
    printf("%lld\\n", sum);
    return 0;
}
`,
  }),
  codeQ({
    title: "Factorial Calculator",
    description: `Read a non-negative integer N and print N! (N factorial) using a for loop. Use a 64-bit accumulator (0! = 1).

Input Format:
A single integer N.

Output Format:
Print N! as a 64-bit integer.

Constraints:
0 <= N <= 20`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "for Loop",
    sampleinput1: "5",
    sampleoutput1: "120",
    sampleinput2: "0",
    sampleoutput2: "1",
    input1: "1",
    output1: "1",
    input2: "10",
    output2: "3628800",
    input3: "3",
    output3: "6",
    inputconstrains: "0 <= N <= 20",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n, i;
    long long fact = 1;
    scanf("%d", &n);
    for (i = 1; i <= n; i++) {
        fact *= i;
    }
    printf("%lld\\n", fact);
    return 0;
}
`,
  }),
  codeQ({
    title: "Countdown Printer",
    description: `Read a non-negative integer N and print every integer from N down to 0 (inclusive), each on its own line, using a while loop.

Input Format:
A single integer N.

Output Format:
Print N, N-1, ..., 1, 0 each on its own line.

Constraints:
0 <= N <= 1000`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "while Loop",
    sampleinput1: "5",
    sampleoutput1: "5\n4\n3\n2\n1\n0",
    sampleinput2: "2",
    sampleoutput2: "2\n1\n0",
    input1: "0",
    output1: "0",
    input2: "3",
    output2: "3\n2\n1\n0",
    input3: "1",
    output3: "1\n0",
    inputconstrains: "0 <= N <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    while (n >= 0) {
        printf("%d\\n", n);
        n--;
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Count Inputs Until Zero",
    description: `Read integers one by one until a 0 is encountered. Count the number of non-zero integers read (excluding the terminating 0) using a while loop.

Input Format:
A sequence of space- or newline-separated integers, terminated by 0.

Output Format:
Print the count of non-zero integers as an integer.

Constraints:
At least one integer is provided (the terminating 0); each integer is in [-1000000, 1000000].`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "while Loop",
    sampleinput1: "1 2 3 0",
    sampleoutput1: "3",
    sampleinput2: "5 10 15 20 0",
    sampleoutput2: "4",
    input1: "0",
    output1: "0",
    input2: "100 0",
    output2: "1",
    input3: "1 1 1 1 0",
    output3: "4",
    inputconstrains: "Each integer in [-1000000, 1000000]; 0 terminates",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int v;
    int count = 0;
    scanf("%d", &v);
    while (v != 0) {
        count++;
        scanf("%d", &v);
    }
    printf("%d\\n", count);
    return 0;
}
`,
  }),
  codeQ({
    title: "Repeated Greeting Printer",
    description: `Read a positive integer N and print the word "Hi" on its own line exactly N times using a for loop.

Input Format:
A single integer N.

Output Format:
Print N lines, each containing the word "Hi".

Constraints:
1 <= N <= 1000`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "for Loop",
    sampleinput1: "3",
    sampleoutput1: "Hi\nHi\nHi",
    sampleinput2: "2",
    sampleoutput2: "Hi\nHi",
    input1: "1",
    output1: "Hi",
    input2: "5",
    output2: "Hi\nHi\nHi\nHi\nHi",
    input3: "10",
    output3: "Hi\nHi\nHi\nHi\nHi\nHi\nHi\nHi\nHi\nHi",
    inputconstrains: "1 <= N <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n, i;
    scanf("%d", &n);
    for (i = 0; i < n; i++) {
        printf("Hi\\n");
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Multiplication Table Row Printer",
    description: `Read an integer N and print N*1, N*2, ..., N*10 each on its own line using a for loop.

Input Format:
A single integer N.

Output Format:
Print 10 lines, the i-th containing N * i for i from 1 to 10.

Constraints:
-1000 <= N <= 1000`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "for Loop",
    sampleinput1: "5",
    sampleoutput1: "5\n10\n15\n20\n25\n30\n35\n40\n45\n50",
    sampleinput2: "2",
    sampleoutput2: "2\n4\n6\n8\n10\n12\n14\n16\n18\n20",
    input1: "1",
    output1: "1\n2\n3\n4\n5\n6\n7\n8\n9\n10",
    input2: "10",
    output2: "10\n20\n30\n40\n50\n60\n70\n80\n90\n100",
    input3: "0",
    output3: "0\n0\n0\n0\n0\n0\n0\n0\n0\n0",
    inputconstrains: "-1000 <= N <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n, i;
    scanf("%d", &n);
    for (i = 1; i <= 10; i++) {
        printf("%d\\n", n * i);
    }
    return 0;
}
`,
  }),

  // ── EASY SCENARIO (4) ───────────────────────────────────────────────────────
  codeQ({
    title: "Sum of Even Numbers Up to N",
    description: `A math drill reads an integer N and prints the sum of all even numbers from 1 to N (inclusive) using a for loop with the continue statement to skip odd numbers.

Input Format:
A single integer N.

Output Format:
Print the sum as a 64-bit integer.

Constraints:
0 <= N <= 1000000`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "break and continue in Loops",
    sampleinput1: "10",
    sampleoutput1: "30",
    sampleinput2: "5",
    sampleoutput2: "6",
    input1: "1",
    output1: "0",
    input2: "100",
    output2: "2550",
    input3: "2",
    output3: "2",
    inputconstrains: "0 <= N <= 1000000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n, i;
    long long sum = 0;
    scanf("%d", &n);
    for (i = 1; i <= n; i++) {
        if (i % 2 != 0) {
            continue;
        }
        sum += i;
    }
    printf("%lld\\n", sum);
    return 0;
}
`,
  }),
  codeQ({
    title: "Attendance Sheet Printer",
    description: `A teacher reads the number of students in a class followed by their single-word names, and prints an indexed attendance sheet.

Input Format:
Line 1: integer N (number of students).
Next N lines: one single-word NAME per line.

Output Format:
Print N lines, the i-th line containing "<i>. <NAME>" (1-based index).

Constraints:
1 <= N <= 1000, 1 <= length(NAME) <= 50`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "for Loop",
    sampleinput1: "3\nAlice\nBob\nCara",
    sampleoutput1: "1. Alice\n2. Bob\n3. Cara",
    sampleinput2: "2\nDave\nEve",
    sampleoutput2: "1. Dave\n2. Eve",
    input1: "1\nZoe",
    output1: "1. Zoe",
    input2: "4\nA\nB\nC\nD",
    output2: "1. A\n2. B\n3. C\n4. D",
    input3: "1\nSolo",
    output3: "1. Solo",
    inputconstrains: "1 <= N <= 1000, 1 <= length(NAME) <= 50",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n, i;
    scanf("%d", &n);
    for (i = 1; i <= n; i++) {
        char name[100];
        scanf("%99s", name);
        printf("%d. %s\\n", i, name);
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Integer Digit Count Drill",
    description: `A digit counter reads an integer (which may be negative) and prints the number of decimal digits it contains. Use a while loop.

Input Format:
A single integer N (may be negative).

Output Format:
Print the digit count.

Constraints:
-1000000000 <= N <= 1000000000`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "while Loop",
    sampleinput1: "123",
    sampleoutput1: "3",
    sampleinput2: "0",
    sampleoutput2: "1",
    input1: "10000",
    output1: "5",
    input2: "-456",
    output2: "3",
    input3: "9",
    output3: "1",
    inputconstrains: "-1000000000 <= N <= 1000000000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    long long n;
    int count = 0;
    scanf("%lld", &n);
    if (n < 0) n = -n;
    if (n == 0) {
        count = 1;
    } else {
        while (n != 0) {
            count++;
            n /= 10;
        }
    }
    printf("%d\\n", count);
    return 0;
}
`,
  }),
  codeQ({
    title: "First N Multiples of Seven",
    description: `A number-theory drill reads N and prints the first N positive multiples of 7 (7, 14, 21, ...) each on its own line, using a for loop.

Input Format:
A single integer N.

Output Format:
Print N lines, the i-th containing 7 * i.

Constraints:
1 <= N <= 1000`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "for Loop",
    sampleinput1: "3",
    sampleoutput1: "7\n14\n21",
    sampleinput2: "5",
    sampleoutput2: "7\n14\n21\n28\n35",
    input1: "1",
    output1: "7",
    input2: "2",
    output2: "7\n14",
    input3: "10",
    output3: "7\n14\n21\n28\n35\n42\n49\n56\n63\n70",
    inputconstrains: "1 <= N <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n, i;
    scanf("%d", &n);
    for (i = 1; i <= n; i++) {
        printf("%d\\n", 7 * i);
    }
    return 0;
}
`,
  }),

  // ── MEDIUM SCENARIO (6) ────────────────────────────────────────────────────
  codeQ({
    title: "Prime Number Checker",
    description: `A primality tester reads a positive integer N and prints "Prime" or "Not Prime" using a for loop that breaks early when a divisor is found.

Input Format:
A single integer N.

Output Format:
Print "Prime" if N is prime (greater than 1 and divisible only by 1 and itself), otherwise "Not Prime".

Constraints:
1 <= N <= 1000000`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "break and continue in Loops",
    sampleinput1: "7",
    sampleoutput1: "Prime",
    sampleinput2: "10",
    sampleoutput2: "Not Prime",
    input1: "2",
    output1: "Prime",
    input2: "1",
    output2: "Not Prime",
    input3: "13",
    output3: "Prime",
    inputconstrains: "1 <= N <= 1000000",
    blacklist: "pow",
    whitelist: "for (, break;",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n, i;
    scanf("%d", &n);
    int is_prime = 1;
    if (n < 2) {
        is_prime = 0;
    }
    for (i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            is_prime = 0;
            break;
        }
    }
    printf("%s\\n", is_prime ? "Prime" : "Not Prime");
    return 0;
}
`,
  }),
  codeQ({
    title: "Fibonacci Sequence Printer",
    description: `A Fibonacci generator reads N and prints the first N Fibonacci numbers (starting from 0, 1) each on its own line using a for loop and a 64-bit accumulator.

Input Format:
A single integer N.

Output Format:
Print N lines: the i-th line contains the i-th Fibonacci number (F0 = 0, F1 = 1, F2 = 1, F3 = 2, ...).

Constraints:
1 <= N <= 80`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "for Loop",
    sampleinput1: "5",
    sampleoutput1: "0\n1\n1\n2\n3",
    sampleinput2: "3",
    sampleoutput2: "0\n1\n1",
    input1: "1",
    output1: "0",
    input2: "10",
    output2: "0\n1\n1\n2\n3\n5\n8\n13\n21\n34",
    input3: "8",
    output3: "0\n1\n1\n2\n3\n5\n8\n13",
    inputconstrains: "1 <= N <= 80",
    blacklist: "pow",
    whitelist: "for (, long long",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n, i;
    long long a = 0, b = 1, c;
    scanf("%d", &n);
    for (i = 0; i < n; i++) {
        printf("%lld\\n", a);
        c = a + b;
        a = b;
        b = c;
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "GCD Using Euclidean Algorithm",
    description: `A number-theory tool reads two non-negative integers A and B and prints their greatest common divisor (GCD) using the Euclidean algorithm with a while loop.

Input Format:
Two space-separated non-negative integers A and B.

Output Format:
Print the GCD as a 64-bit integer.

Constraints:
0 <= A, B <= 1000000000`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "while Loop",
    sampleinput1: "48 18",
    sampleoutput1: "6",
    sampleinput2: "100 75",
    sampleoutput2: "25",
    input1: "7 13",
    output1: "1",
    input2: "100 0",
    output2: "100",
    input3: "17 17",
    output3: "17",
    inputconstrains: "0 <= A, B <= 1000000000",
    blacklist: "pow",
    whitelist: "while (",
    sourcecode: `#include <stdio.h>

int main(void) {
    long long a, b;
    scanf("%lld %lld", &a, &b);
    if (a < 0) a = -a;
    if (b < 0) b = -b;
    while (b != 0) {
        long long t = b;
        b = a % b;
        a = t;
    }
    printf("%lld\\n", a);
    return 0;
}
`,
  }),
  codeQ({
    title: "Digit Sum Calculator",
    description: `A digit-sum drill reads an integer (possibly negative) and prints the sum of its decimal digits using a while loop. Use a compound assignment to accumulate the running sum.

Input Format:
A single integer N.

Output Format:
Print the sum of digits.

Constraints:
-1000000000 <= N <= 1000000000`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "while Loop",
    sampleinput1: "123",
    sampleoutput1: "6",
    sampleinput2: "9999",
    sampleoutput2: "36",
    input1: "0",
    output1: "0",
    input2: "100",
    output2: "1",
    input3: "555",
    output3: "15",
    inputconstrains: "-1000000000 <= N <= 1000000000",
    blacklist: "pow",
    whitelist: "while (, +=",
    sourcecode: `#include <stdio.h>

int main(void) {
    long long n;
    int sum = 0;
    scanf("%lld", &n);
    if (n < 0) n = -n;
    while (n != 0) {
        sum += n % 10;
        n /= 10;
    }
    printf("%d\\n", sum);
    return 0;
}
`,
  }),
  codeQ({
    title: "First N Primes Printer",
    description: `A prime-sequence generator reads N and prints the first N prime numbers (2, 3, 5, 7, 11, ...) each on its own line. Use a while loop to count primes and an inner for loop with break to test primality.

Input Format:
A single integer N.

Output Format:
Print N lines, the i-th containing the i-th prime.

Constraints:
1 <= N <= 1000`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Nested Loops",
    sampleinput1: "5",
    sampleoutput1: "2\n3\n5\n7\n11",
    sampleinput2: "3",
    sampleoutput2: "2\n3\n5",
    input1: "1",
    output1: "2",
    input2: "10",
    output2: "2\n3\n5\n7\n11\n13\n17\n19\n23\n29",
    input3: "2",
    output3: "2\n3",
    inputconstrains: "1 <= N <= 1000",
    blacklist: "pow, malloc",
    whitelist: "for (, while (",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    int count = 0;
    int candidate = 2;
    while (count < n) {
        int is_prime = 1;
        int i;
        for (i = 2; i * i <= candidate; i++) {
            if (candidate % i == 0) {
                is_prime = 0;
                break;
            }
        }
        if (is_prime) {
            printf("%d\\n", candidate);
            count++;
        }
        candidate++;
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Password Retry Simulator",
    description: `A login system stores a 4-digit PIN. It then reads up to 3 attempts. If any attempt matches the PIN, print "Unlocked" and stop reading; otherwise after 3 wrong attempts print "Locked". Use a do-while loop.

Input Format:
Line 1: integer PIN (the correct PIN).
Next lines: integer ATTEMPT values, up to 3 attempts.

Output Format:
Print "Unlocked" on the first match, or "Locked" if all 3 attempts are wrong.

Constraints:
0 <= PIN <= 9999, 0 <= ATTEMPT <= 9999`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "do-while Loop",
    sampleinput1: "1234\n1234",
    sampleoutput1: "Unlocked",
    sampleinput2: "9999\n1111\n2222\n3333",
    sampleoutput2: "Locked",
    input1: "4321\n0000\n4321",
    output1: "Unlocked",
    input2: "0000\n0000",
    output2: "Unlocked",
    input3: "5555\n1111\n2222\n3333",
    output3: "Locked",
    inputconstrains: "0 <= PIN, ATTEMPT <= 9999",
    blacklist: "pow",
    whitelist: "do {",
    sourcecode: `#include <stdio.h>

int main(void) {
    int pin, attempt;
    int tries = 0;
    int unlocked = 0;
    scanf("%d", &pin);
    do {
        scanf("%d", &attempt);
        tries++;
        if (attempt == pin) {
            unlocked = 1;
            break;
        }
    } while (tries < 3);
    printf("%s\\n", unlocked ? "Unlocked" : "Locked");
    return 0;
}
`,
  }),

  // ── HARD SCENARIO (4) ──────────────────────────────────────────────────────
  codeQ({
    title: "Collatz Conjecture Step Counter",
    description: `A math exploration tool reads a positive integer N and counts how many steps the Collatz process takes to reach 1, where each step is:
- if N is even: N = N / 2
- if N is odd:  N = 3 * N + 1

Use a while loop and an if-else inside it. Print the step count.

Input Format:
A single integer N.

Output Format:
Print the number of steps to reach 1.

Constraints:
1 <= N <= 100000`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "while Loop",
    sampleinput1: "6",
    sampleoutput1: "8",
    sampleinput2: "1",
    sampleoutput2: "0",
    input1: "2",
    output1: "1",
    input2: "7",
    output2: "16",
    input3: "27",
    output3: "111",
    inputconstrains: "1 <= N <= 100000",
    blacklist: "pow",
    whitelist: "while (, if (",
    sourcecode: `#include <stdio.h>

int main(void) {
    long long n;
    int steps = 0;
    scanf("%lld", &n);
    while (n != 1) {
        if (n % 2 == 0) {
            n /= 2;
        } else {
            n = 3 * n + 1;
        }
        steps++;
    }
    printf("%d\\n", steps);
    return 0;
}
`,
  }),
  codeQ({
    title: "Star Pyramid Pattern Printer",
    description: `A pattern printer reads the height N and prints a centered pyramid of '*' characters of that height, using nested for loops. Each row i (1-indexed) has (N - i) leading spaces followed by (2i - 1) stars.

Input Format:
A single integer N.

Output Format:
Print N lines forming the pyramid.

Constraints:
1 <= N <= 30`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Nested Loops",
    sampleinput1: "3",
    sampleoutput1: "  *\n ***\n*****",
    sampleinput2: "5",
    sampleoutput2: "    *\n   ***\n  *****\n *******\n*********",
    input1: "1",
    output1: "*",
    input2: "2",
    output2: " *\n***",
    input3: "4",
    output3: "   *\n  ***\n *****\n*******",
    inputconstrains: "1 <= N <= 30",
    blacklist: "pow, malloc",
    whitelist: "for (, for (",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n, i, j;
    scanf("%d", &n);
    for (i = 1; i <= n; i++) {
        for (j = 0; j < n - i; j++) {
            printf(" ");
        }
        for (j = 0; j < 2 * i - 1; j++) {
            printf("*");
        }
        printf("\\n");
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Prime Factorization Printer",
    description: `A factorization tool reads an integer N >= 2 and prints all of its prime factors in non-decreasing order, each on its own line. Use a while loop that divides out each prime factor as many times as possible.

Input Format:
A single integer N.

Output Format:
Print one prime factor per line, with repeats for multiplicity.

Constraints:
2 <= N <= 1000000000`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "while Loop",
    sampleinput1: "12",
    sampleoutput1: "2\n2\n3",
    sampleinput2: "17",
    sampleoutput2: "17",
    input1: "2",
    output1: "2",
    input2: "60",
    output2: "2\n2\n3\n5",
    input3: "100",
    output3: "2\n2\n5\n5",
    inputconstrains: "2 <= N <= 1000000000",
    blacklist: "pow",
    whitelist: "while (, /=",
    sourcecode: `#include <stdio.h>

int main(void) {
    long long n;
    scanf("%lld", &n);
    long long factor = 2;
    while (factor * factor <= n) {
        while (n % factor == 0) {
            printf("%lld\\n", factor);
            n /= factor;
        }
        factor++;
    }
    if (n > 1) {
        printf("%lld\\n", n);
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Armstrong Number Range Finder",
    description: `An Armstrong number is an integer that equals the sum of its own digits each raised to the power of the number of digits (e.g. 153 = 1^3 + 5^3 + 3^3). Read a closed range [LOW, HIGH] and print every Armstrong number in that range, each on its own line. Use nested loops and a manual power computation (no math library).

Input Format:
Two space-separated integers LOW and HIGH.

Output Format:
Print every Armstrong number in [LOW, HIGH] on its own line, in ascending order.

Constraints:
0 <= LOW <= HIGH <= 100000`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Nested Loops",
    sampleinput1: "100 200",
    sampleoutput1: "153",
    sampleinput2: "1 10",
    sampleoutput2: "1\n2\n3\n4\n5\n6\n7\n8\n9",
    input1: "150 160",
    output1: "153",
    input2: "370 410",
    output2: "370\n371\n407",
    input3: "0 9",
    output3: "0\n1\n2\n3\n4\n5\n6\n7\n8\n9",
    inputconstrains: "0 <= LOW <= HIGH <= 100000",
    blacklist: "pow",
    whitelist: "for (, while (",
    sourcecode: `#include <stdio.h>

int main(void) {
    long long low, high;
    scanf("%lld %lld", &low, &high);
    long long i;
    for (i = low; i <= high; i++) {
        long long temp = i;
        int ndigits = 0;
        if (temp == 0) ndigits = 1;
        while (temp != 0) {
            ndigits++;
            temp /= 10;
        }
        long long sum = 0;
        temp = i;
        while (temp != 0) {
            int digit = (int)(temp % 10);
            long long p = 1;
            int k;
            for (k = 0; k < ndigits; k++) {
                p *= digit;
            }
            sum += p;
            temp /= 10;
        }
        if (sum == i) {
            printf("%lld\\n", i);
        }
    }
    return 0;
}
`,
  }),
];

/* ────────────────────────────── MCQ QUESTIONS ────────────────────────────── */
const mcqs = [
  // ── EASY (10) ───────────────────────────────────────────────────────────────
  mcq({
    title: "for Loop Syntax",
    description: "Which of the following is the correct syntax for a for loop in C?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "for Loop",
    Option1: "for (init; condition; update) { body }",
    Option2: "for (init, condition, update) { body }",
    Option3: "for (init : condition : update) { body }",
    Option4: "for init; condition; update { body }",
    CorrectOption: 1,
  }),
  mcq({
    title: "while vs do-while Body",
    description: "What is the key difference between while and do-while loops in C?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "do-while Loop",
    Option1: "do-while executes its body at least once before checking the condition; while checks first",
    Option2: "while executes its body at least once; do-while checks first",
    Option3: "while and do-while behave identically in every situation",
    Option4: "do-while cannot be used inside a function",
    CorrectOption: 1,
  }),
  mcq({
    title: "Infinite for Loop Header",
    description: "Which of the following for-loop headers results in an unconditional infinite loop?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "for Loop",
    Option1: "for (;;)",
    Option2: "for (int i = 0; i < 10; i++)",
    Option3: "for (int i = 10; i > 0; i--)",
    Option4: "for (int i = 0; i < 100; i += 5)",
    CorrectOption: 1,
  }),
  mcq({
    title: "for Loop Update Timing",
    description: "In a for-loop header 'for (i = 0; i < n; i++)', when is the update expression i++ evaluated?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "for Loop",
    Option1: "After the body executes, before the next condition check",
    Option2: "Before the condition is first tested",
    Option3: "Only when the loop exits",
    Option4: "In parallel with the body, on a separate thread",
    CorrectOption: 1,
  }),
  mcq({
    title: "Break Statement Effect",
    description: "What does the break statement do when used inside a for or while loop?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "break and continue in Loops",
    Option1: "It immediately terminates the loop and resumes execution after the loop",
    Option2: "It skips the remaining statements in the current iteration only",
    Option3: "It restarts the loop from the beginning",
    Option4: "It pauses the loop until the next input is read",
    CorrectOption: 1,
  }),
  mcq({
    title: "Continue in for Loop",
    description: "What is the effect of continue inside a for loop?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "break and continue in Loops",
    Option1: "It skips the remaining statements in the current iteration and proceeds to the update step",
    Option2: "It exits the loop entirely",
    Option3: "It repeats the current iteration from the start",
    Option4: "It terminates the program",
    CorrectOption: 1,
  }),
  mcq({
    title: "Nested Loop Step Counter",
    description: "If an outer loop runs 3 times and an inner loop runs 4 times per outer iteration, how many total inner-body executions occur?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Nested Loops",
    Option1: "12",
    Option2: "7",
    Option3: "3",
    Option4: "4",
    CorrectOption: 1,
  }),
  mcq({
    title: "do-while Minimum Iterations",
    description: "What is the minimum number of times the body of a do-while loop is executed?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "do-while Loop",
    Option1: "1",
    Option2: "0",
    Option3: "At least 2",
    Option4: "It depends on the condition",
    CorrectOption: 1,
  }),
  mcq({
    title: "Empty for Loop Body",
    description: "What is the effect of the statement 'for (int i = 0; i < 5; i++);' (note the trailing semicolon)?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "for Loop",
    Option1: "The loop iterates 5 times with an empty body, then continues with the next statement",
    Option2: "Compile error: an empty body is not allowed",
    Option3: "The loop iterates infinitely",
    Option4: "The loop iterates 0 times because the body is missing",
    CorrectOption: 1,
  }),
  mcq({
    title: "while Condition Evaluation",
    description: "In a while loop 'while (condition) { body }', when is the condition evaluated?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "while Loop",
    Option1: "Before each iteration, including the first",
    Option2: "Only once, before the loop starts",
    Option3: "After each iteration, but not before the first",
    Option4: "Only when break is reached",
    CorrectOption: 1,
  }),

  // ── MEDIUM (6) ─────────────────────────────────────────────────────────────
  mcq({
    title: "for Loop Sum Output",
    description: "What does the following program print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "for Loop",
    Option1: "15",
    Option2: "10",
    Option3: "5",
    Option4: "20",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int i, sum = 0;
    for (i = 1; i <= 5; i++) {
        sum += i;
    }
    printf("%d\\n", sum);
    return 0;
}`,
    snippetLang: "c",
  }),
  mcq({
    title: "while Loop Iteration Output",
    description: "What does the following program print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "while Loop",
    Option1: "0 1 2",
    Option2: "0 1 2 3",
    Option3: "1 2 3",
    Option4: "0 1 2 3 4",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int i = 0;
    while (i < 3) {
        printf("%d ", i);
        i++;
    }
    printf("\\n");
    return 0;
}`,
    snippetLang: "c",
  }),
  mcq({
    title: "do-while One-Shot Body",
    description: "What does the following program print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "do-while Loop",
    Option1: "5",
    Option2: "5 4 3 2 1",
    Option3: "Nothing",
    Option4: "5 4",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int i = 5;
    do {
        printf("%d ", i);
        i--;
    } while (i > 5);
    printf("\\n");
    return 0;
}`,
    snippetLang: "c",
  }),
  mcq({
    title: "Nested Loop Product Output",
    description: "What does the following program print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Nested Loops",
    Option1: "1 2 3 2 4 6",
    Option2: "1 2 3 4 5 6",
    Option3: "2 4 6",
    Option4: "1 4 9",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int i, j;
    for (i = 1; i <= 2; i++) {
        for (j = 1; j <= 3; j++) {
            printf("%d ", i * j);
        }
    }
    printf("\\n");
    return 0;
}`,
    snippetLang: "c",
  }),
  mcq({
    title: "Break in for Loop Output",
    description: "What does the following program print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "break and continue in Loops",
    Option1: "0 1 2",
    Option2: "0 1 2 3",
    Option3: "0 1 2 3 4 5 6 7 8 9",
    Option4: "3",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int i;
    for (i = 0; i < 10; i++) {
        if (i == 3) {
            break;
        }
        printf("%d ", i);
    }
    printf("\\n");
    return 0;
}`,
    snippetLang: "c",
  }),
  mcq({
    title: "Continue Skipping Even Numbers",
    description: "What does the following program print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "break and continue in Loops",
    Option1: "1 3",
    Option2: "0 2 4",
    Option3: "0 1 2 3 4",
    Option4: "1 2 3 4",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int i;
    for (i = 0; i < 5; i++) {
        if (i % 2 == 0) {
            continue;
        }
        printf("%d ", i);
    }
    printf("\\n");
    return 0;
}`,
    snippetLang: "c",
  }),

  // ── HARD (4) ───────────────────────────────────────────────────────────────
  mcq({
    title: "Nested Loop Star Triangle",
    description: "What does the following program print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Nested Loops",
    Option1: "*\n**\n***",
    Option2: "***\n**\n*",
    Option3: "******",
    Option4: "*\n*\n*",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int i, j;
    for (i = 1; i <= 3; i++) {
        for (j = 1; j <= i; j++) {
            printf("*");
        }
        printf("\\n");
    }
    return 0;
}`,
    snippetLang: "c",
  }),
  mcq({
    title: "Identifying an Infinite Loop",
    description: "Which of the following code snippets is an infinite loop?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "while Loop",
    Option1: "while (1) { printf(\"hi\"); }",
    Option2: "for (int i = 0; i < 5; i++) printf(\"%d\", i);",
    Option3: "int i = 0; while (i < 5) { printf(\"%d\", i); i++; }",
    Option4: "for (int i = 5; i > 0; i--) printf(\"%d\", i);",
    CorrectOption: 1,
  }),
  mcq({
    title: "Break in Inner Loop Only",
    description: "What does the following program print? (Trailing whitespace per line is normalized.)",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "break and continue in Loops",
    Option1: "0 10 20",
    Option2: "0 1 10 11 20 21",
    Option3: "0 1 2 10 11 12 20 21 22",
    Option4: "0",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int i, j;
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            if (j == 1) {
                break;
            }
            printf("%d ", i * 10 + j);
        }
    }
    printf("\\n");
    return 0;
}`,
    snippetLang: "c",
  }),
  mcq({
    title: "Combined Break and Continue",
    description: "What does the following program print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "break and continue in Loops",
    Option1: "3",
    Option2: "5",
    Option3: "4",
    Option4: "20",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int i, count = 0;
    for (i = 1; i <= 20; i++) {
        if (i % 3 == 0) {
            continue;
        }
        if (i % 5 == 0) {
            break;
        }
        count++;
    }
    printf("%d\\n", count);
    return 0;
}`,
    snippetLang: "c",
  }),
];

const d = String(DAY).padStart(2, "0");
writeFileSync(
  `scripts/c-programming/data/day-${d}.code.json`,
  JSON.stringify({ day: DAY, topics: [{ name: TOPIC, subtopics: SUBTOPICS }], questions }, null, 2)
);
writeFileSync(
  `scripts/c-programming/data/day-${d}.mcq.json`,
  JSON.stringify({ day: DAY, questions: mcqs }, null, 2)
);
console.log("wrote day", DAY);
