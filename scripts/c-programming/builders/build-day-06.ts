/**
 * Builder for Day 6 — "Recursion and Inline Functions".
 * Emits:
 *   /home/z/my-project/scripts/c-programming/data/day-06.code.json  (20 code questions)
 *   /home/z/my-project/scripts/c-programming/data/day-06.mcq.json   (20 MCQ questions)
 */
import { writeFileSync } from "node:fs";

const DAY = 6;
const TOPIC = "Recursion and Inline Functions";
const SUBTOPICS = [
  "Recursion Basics",
  "Base and Recursive Case",
  "Mathematical Recursion",
  "Recursion on Strings",
  "Recursion on Arrays",
  "Recursion vs Iteration",
  "Inline Functions",
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
    title: "Recursive Factorial Drill",
    description: `Read a non-negative integer N and print N factorial (N!) using a recursive function.

Input Format:
A single integer N.

Output Format:
Print N! as a single integer on its own line.

Constraints:
0 <= N <= 20`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Mathematical Recursion",
    sampleinput1: "5",
    sampleoutput1: "120",
    sampleinput2: "0",
    sampleoutput2: "1",
    input1: "1",
    output1: "1",
    input2: "7",
    output2: "5040",
    input3: "10",
    output3: "3628800",
    inputconstrains: "0 <= N <= 20",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

static long long factRec(int n) {
    if (n <= 1) return 1;
    return n * factRec(n - 1);
}

int main(void) {
    int n;
    scanf("%d", &n);
    printf("%lld\\n", factRec(n));
    return 0;
}
`,
  }),
  codeQ({
    title: "Recursive Countdown Printer",
    description: `Read a positive integer N and print numbers from N down to 1, each on its own line, using recursion.

Input Format:
A single integer N.

Output Format:
N lines, each containing one integer from N to 1.

Constraints:
1 <= N <= 100`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Recursion Basics",
    sampleinput1: "5",
    sampleoutput1: "5\n4\n3\n2\n1",
    sampleinput2: "3",
    sampleoutput2: "3\n2\n1",
    input1: "1",
    output1: "1",
    input2: "8",
    output2: "8\n7\n6\n5\n4\n3\n2\n1",
    input3: "10",
    output3: "10\n9\n8\n7\n6\n5\n4\n3\n2\n1",
    inputconstrains: "1 <= N <= 100",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

static void countdown(int n) {
    if (n < 1) return;
    printf("%d\\n", n);
    countdown(n - 1);
}

int main(void) {
    int n;
    scanf("%d", &n);
    countdown(n);
    return 0;
}
`,
  }),
  codeQ({
    title: "Recursive Natural Number Sum",
    description: `Read a non-negative integer N and print the sum 1 + 2 + ... + N using a recursive function whose base case is N == 0 returning 0.

Input Format:
A single integer N.

Output Format:
Print the sum as a single integer on its own line.

Constraints:
0 <= N <= 1000`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Base and Recursive Case",
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
    inputconstrains: "0 <= N <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

static long long sumRec(int n) {
    if (n == 0) return 0;
    return n + sumRec(n - 1);
}

int main(void) {
    int n;
    scanf("%d", &n);
    printf("%lld\\n", sumRec(n));
    return 0;
}
`,
  }),
  codeQ({
    title: "Recursive Power Calculator x to n",
    description: `Read an integer base X and a non-negative integer exponent N, then print X raised to the power N using a recursive function.

Input Format:
Two space-separated integers X and N.

Output Format:
Print X^N as a single integer on its own line.

Constraints:
-10 <= X <= 10, 0 <= N <= 15`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Mathematical Recursion",
    sampleinput1: "2 10",
    sampleoutput1: "1024",
    sampleinput2: "3 4",
    sampleoutput2: "81",
    input1: "5 3",
    output1: "125",
    input2: "-2 5",
    output2: "-32",
    input3: "10 9",
    output3: "1000000000",
    inputconstrains: "-10 <= X <= 10, 0 <= N <= 15",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

static long long powerRec(int x, int n) {
    if (n == 0) return 1;
    return x * powerRec(x, n - 1);
}

int main(void) {
    int x, n;
    scanf("%d %d", &x, &n);
    printf("%lld\\n", powerRec(x, n));
    return 0;
}
`,
  }),
  codeQ({
    title: "Recursive Digit Sum Counter",
    description: `Read a non-negative integer N and print the number of decimal digits in N using a recursive function.

Input Format:
A single integer N.

Output Format:
Print the digit count as a single integer on its own line.

Constraints:
0 <= N <= 1000000000`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Recursion Basics",
    sampleinput1: "12345",
    sampleoutput1: "5",
    sampleinput2: "7",
    sampleoutput2: "1",
    input1: "0",
    output1: "1",
    input2: "999",
    output2: "3",
    input3: "1000000000",
    output3: "10",
    inputconstrains: "0 <= N <= 1000000000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

static int countDigits(long long n) {
    if (n < 10) return 1;
    return 1 + countDigits(n / 10);
}

int main(void) {
    long long n;
    scanf("%lld", &n);
    printf("%d\\n", countDigits(n));
    return 0;
}
`,
  }),
  codeQ({
    title: "Recursive Array Element Printer",
    description: `Read an integer N followed by N integers, then print each integer on its own line using a recursive traversal of the array.

Input Format:
First line: integer N. Second line: N space-separated integers.

Output Format:
N lines, each containing one integer in the original order.

Constraints:
1 <= N <= 1000, -1000000 <= arr[i] <= 1000000`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Recursion on Arrays",
    sampleinput1: "4\n10 20 30 40",
    sampleoutput1: "10\n20\n30\n40",
    sampleinput2: "3\n-5 0 7",
    sampleoutput2: "-5\n0\n7",
    input1: "1\n42",
    output1: "42",
    input2: "5\n1 2 3 4 5",
    output2: "1\n2\n3\n4\n5",
    input3: "2\n-100 100",
    output3: "-100\n100",
    inputconstrains: "1 <= N <= 1000, -1000000 <= arr[i] <= 1000000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

static void printArr(int arr[], int i, int n) {
    if (i >= n) return;
    printf("%d\\n", arr[i]);
    printArr(arr, i + 1, n);
}

int main(void) {
    int n;
    scanf("%d", &n);
    int arr[1000];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printArr(arr, 0, n);
    return 0;
}
`,
  }),

  // ── EASY SCENARIO (4) ──────────────────────────────────────────────────────
  codeQ({
    title: "Conveyor Belt Good Item Counter",
    description: `A factory conveyor belt scans N items one by one. Each item has an integer quality code. A code greater than zero means the item passed inspection. Use a recursive function to count how many items passed.

Input Format:
First line: integer N. Second line: N space-separated integer codes.

Output Format:
Print the count of items with positive codes on its own line.

Constraints:
1 <= N <= 1000, -1000000 <= code <= 1000000`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Recursion on Arrays",
    sampleinput1: "5\n3 -1 0 7 2",
    sampleoutput1: "3",
    sampleinput2: "4\n-2 -3 -4 -5",
    sampleoutput2: "0",
    input1: "1\n0",
    output1: "0",
    input2: "6\n1 2 3 4 5 6",
    output2: "6",
    input3: "3\n10 -10 10",
    output3: "2",
    inputconstrains: "1 <= N <= 1000, -1000000 <= code <= 1000000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

static int countPositive(int arr[], int i, int n) {
    if (i >= n) return 0;
    int add = (arr[i] > 0) ? 1 : 0;
    return add + countPositive(arr, i + 1, n);
}

int main(void) {
    int n;
    scanf("%d", &n);
    int arr[1000];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("%d\\n", countPositive(arr, 0, n));
    return 0;
}
`,
  }),
  codeQ({
    title: "Recursive Message Length Counter",
    description: `A messaging app receives a single-line message and reports how many characters are in it (excluding the trailing newline). Use a recursive function to count characters.

Input Format:
A single line of text (may contain spaces), at most 200 characters.

Output Format:
Print the character count on its own line.

Constraints:
1 <= message length <= 200`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Recursion on Strings",
    sampleinput1: "hello",
    sampleoutput1: "5",
    sampleinput2: "AtomCode C",
    sampleoutput2: "10",
    input1: "a",
    output1: "1",
    input2: "recursion is fun",
    output2: "16",
    input3: "1234567890",
    output3: "10",
    inputconstrains: "1 <= message length <= 200",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

static int lenRec(const char *s, int i) {
    if (s[i] == '\\0' || s[i] == '\\n') return 0;
    return 1 + lenRec(s, i + 1);
}

int main(void) {
    char buf[256];
    if (!fgets(buf, sizeof(buf), stdin)) return 0;
    printf("%d\\n", lenRec(buf, 0));
    return 0;
}
`,
  }),
  codeQ({
    title: "Investment Doubler Yearly Calculator",
    description: `An investor deposits P rupees in a scheme that doubles the principal every year. Compute the value of the investment after Y years using a recursive function.

Input Format:
Two space-separated integers P and Y.

Output Format:
Print the final value as a single integer on its own line.

Constraints:
1 <= P <= 1000, 0 <= Y <= 30`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Mathematical Recursion",
    sampleinput1: "1000 5",
    sampleoutput1: "32000",
    sampleinput2: "500 0",
    sampleoutput2: "500",
    input1: "1 30",
    output1: "1073741824",
    input2: "100 1",
    output2: "200",
    input3: "250 4",
    output3: "4000",
    inputconstrains: "1 <= P <= 1000, 0 <= Y <= 30",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

static long long investRec(long long p, int y) {
    if (y == 0) return p;
    return investRec(p * 2, y - 1);
}

int main(void) {
    long long p;
    int y;
    scanf("%lld %d", &p, &y);
    printf("%lld\\n", investRec(p, y));
    return 0;
}
`,
  }),
  codeQ({
    title: "Sum Both Ways Iterative Recursive",
    description: `A teaching tool demonstrates the equivalence of iteration and recursion by computing the sum 1 + 2 + ... + N both ways. Print the iterative result on the first line and the recursive result on the second line; both must be equal.

Input Format:
A single integer N.

Output Format:
Two lines, each containing the sum 1 + 2 + ... + N.

Constraints:
0 <= N <= 100000`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Recursion vs Iteration",
    sampleinput1: "5",
    sampleoutput1: "15\n15",
    sampleinput2: "10",
    sampleoutput2: "55\n55",
    input1: "0",
    output1: "0\n0",
    input2: "1",
    output2: "1\n1",
    input3: "1000",
    output3: "500500\n500500",
    inputconstrains: "0 <= N <= 100000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

static long long sumIter(int n) {
    long long s = 0;
    for (int i = 1; i <= n; i++) s += i;
    return s;
}

static long long sumRec(int n) {
    if (n == 0) return 0;
    return n + sumRec(n - 1);
}

int main(void) {
    int n;
    scanf("%d", &n);
    printf("%lld\\n", sumIter(n));
    printf("%lld\\n", sumRec(n));
    return 0;
}
`,
  }),

  // ── MEDIUM (6) ─────────────────────────────────────────────────────────────
  codeQ({
    title: "Library Bundle GCD Calculator",
    description: `A librarian wants to divide two stacks of books with M and N books into the largest possible equal-sized bundles with no books left over. Use a recursive Euclidean GCD function (no loops) to compute the bundle size.

Input Format:
Two space-separated integers M and N.

Output Format:
Print the GCD as a single integer on its own line.

Constraints:
0 <= M, N <= 1000000 (not both zero)`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Mathematical Recursion",
    sampleinput1: "12 18",
    sampleoutput1: "6",
    sampleinput2: "7 13",
    sampleoutput2: "1",
    input1: "100 50",
    output1: "50",
    input2: "0 5",
    output2: "5",
    input3: "17 17",
    output3: "17",
    inputconstrains: "0 <= M, N <= 1000000, not both zero",
    blacklist: "for (, while (, do {, goto",
    whitelist: "gcdRec(",
    sourcecode: `#include <stdio.h>

static int gcdRec(int a, int b) {
    if (b == 0) return a;
    return gcdRec(b, a % b);
}

int main(void) {
    int a, b;
    scanf("%d %d", &a, &b);
    printf("%d\\n", gcdRec(a, b));
    return 0;
}
`,
  }),
  codeQ({
    title: "Cargo Container Weight Recursive Sum",
    description: `A shipping dock records the weight of N cargo containers in an array. The supervisor insists the total weight be computed using recursion only (no loops anywhere in the program, including for reading input). Print the total weight.

Input Format:
First line: integer N. Second line: N space-separated integer weights.

Output Format:
Print the total weight as a single integer on its own line.

Constraints:
1 <= N <= 1000, -1000000 <= weight <= 1000000`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Recursion on Arrays",
    sampleinput1: "4\n10 20 30 40",
    sampleoutput1: "100",
    sampleinput2: "3\n-5 0 5",
    sampleoutput2: "0",
    input1: "1\n42",
    output1: "42",
    input2: "5\n1 2 3 4 5",
    output2: "15",
    input3: "2\n-100 100",
    output3: "0",
    inputconstrains: "1 <= N <= 1000, -1000000 <= weight <= 1000000",
    blacklist: "for (, while (, do {",
    whitelist: "cargoSum(",
    sourcecode: `#include <stdio.h>

static void readRec(int arr[], int i, int n) {
    if (i >= n) return;
    scanf("%d", &arr[i]);
    readRec(arr, i + 1, n);
}

static long long cargoSum(int arr[], int i, int n) {
    if (i >= n) return 0;
    return arr[i] + cargoSum(arr, i + 1, n);
}

int main(void) {
    int n;
    scanf("%d", &n);
    int arr[1000];
    readRec(arr, 0, n);
    printf("%lld\\n", cargoSum(arr, 0, n));
    return 0;
}
`,
  }),
  codeQ({
    title: "Secret Message Length Counter",
    description: `A cryptographer manually counts the characters of a secret message without using any string library function or any loop. Use a recursive function to compute the length of the message excluding the trailing newline.

Input Format:
A single line of text (may contain spaces), at most 200 characters.

Output Format:
Print the length as a single integer on its own line.

Constraints:
1 <= message length <= 200`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Recursion on Strings",
    sampleinput1: "atomcode",
    sampleoutput1: "8",
    sampleinput2: "top secret",
    sampleoutput2: "10",
    input1: "a",
    output1: "1",
    input2: "the quick brown fox",
    output2: "19",
    input3: "x",
    output3: "1",
    inputconstrains: "1 <= message length <= 200",
    blacklist: "strlen, for (, while (",
    whitelist: "lenRec(",
    sourcecode: `#include <stdio.h>

static int lenRec(const char *s, int i) {
    if (s[i] == '\\0' || s[i] == '\\n') return 0;
    return 1 + lenRec(s, i + 1);
}

int main(void) {
    char buf[256];
    if (!fgets(buf, sizeof(buf), stdin)) return 0;
    printf("%d\\n", lenRec(buf, 0));
    return 0;
}
`,
  }),
  codeQ({
    title: "Genetic Strand Palindrome Validator",
    description: `A geneticist checks whether a DNA strand reads the same forwards and backwards. The strand is a single line of uppercase letters with no spaces. Use a recursive function to decide if it is a palindrome; print 1 if it is, 0 otherwise. No loops or string reversal library functions allowed.

Input Format:
A single line of uppercase letters (length at most 200).

Output Format:
Print 1 if the strand is a palindrome, 0 otherwise.

Constraints:
1 <= length <= 200, only uppercase A-Z`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Recursion on Strings",
    sampleinput1: "racecar",
    sampleoutput1: "1",
    sampleinput2: "hello",
    sampleoutput2: "0",
    input1: "A",
    output1: "1",
    input2: "ABBA",
    output2: "1",
    input3: "ABCDBA",
    output3: "0",
    inputconstrains: "1 <= length <= 200, only uppercase A-Z",
    blacklist: "strrev, strlen, for (, while (",
    whitelist: "isPalin(",
    sourcecode: `#include <stdio.h>

static int lenRec(const char *s, int i) {
    if (s[i] == '\\0' || s[i] == '\\n') return 0;
    return 1 + lenRec(s, i + 1);
}

static int isPalin(const char *s, int lo, int hi) {
    if (lo >= hi) return 1;
    if (s[lo] != s[hi]) return 0;
    return isPalin(s, lo + 1, hi - 1);
}

int main(void) {
    char buf[256];
    if (!fgets(buf, sizeof(buf), stdin)) return 0;
    int n = lenRec(buf, 0);
    printf("%d\\n", isPalin(buf, 0, n - 1));
    return 0;
}
`,
  }),
  codeQ({
    title: "Sorted Shelf Binary Search",
    description: `A library shelf holds N book IDs in strictly increasing order. A librarian searches for a target ID using a recursive binary search function (no loops anywhere). Print the 0-based index of the target, or -1 if not found.

Input Format:
First line: integer N. Second line: N space-separated sorted integers. Third line: target integer.

Output Format:
Print the index of the target, or -1 if absent.

Constraints:
1 <= N <= 1000, -1000000 <= id <= 1000000`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Recursion on Arrays",
    sampleinput1: "5\n1 3 5 7 9\n5",
    sampleoutput1: "2",
    sampleinput2: "5\n1 3 5 7 9\n4",
    sampleoutput2: "-1",
    input1: "1\n10\n10",
    output1: "0",
    input2: "3\n2 4 6\n6",
    output2: "2",
    input3: "6\n1 2 3 4 5 6\n1",
    output3: "0",
    inputconstrains: "1 <= N <= 1000, -1000000 <= id <= 1000000",
    blacklist: "for (, while (, bsearch",
    whitelist: "binSearch(",
    sourcecode: `#include <stdio.h>

static void readRec(int arr[], int i, int n) {
    if (i >= n) return;
    scanf("%d", &arr[i]);
    readRec(arr, i + 1, n);
}

static int binSearch(int arr[], int lo, int hi, int target) {
    if (lo > hi) return -1;
    int mid = lo + (hi - lo) / 2;
    if (arr[mid] == target) return mid;
    if (arr[mid] > target) return binSearch(arr, lo, mid - 1, target);
    return binSearch(arr, mid + 1, hi, target);
}

int main(void) {
    int n, target;
    scanf("%d", &n);
    int arr[1000];
    readRec(arr, 0, n);
    scanf("%d", &target);
    printf("%d\\n", binSearch(arr, 0, n - 1, target));
    return 0;
}
`,
  }),
  codeQ({
    title: "Tower of Hanoi Move Counter",
    description: `A puzzle enthusiast solves the Tower of Hanoi with K disks and wants to know the total number of disk moves required. Use a recursive function (no loops, no exponent library function) to compute the move count.

Input Format:
A single integer K.

Output Format:
Print the number of moves as a single integer on its own line.

Constraints:
1 <= K <= 30`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Recursion Basics",
    sampleinput1: "1",
    sampleoutput1: "1",
    sampleinput2: "3",
    sampleoutput2: "7",
    input1: "2",
    output1: "3",
    input2: "5",
    output2: "31",
    input3: "10",
    output3: "1023",
    inputconstrains: "1 <= K <= 30",
    blacklist: "for (, while (, pow",
    whitelist: "hanoi(",
    sourcecode: `#include <stdio.h>

static long long hanoi(int k) {
    if (k == 1) return 1;
    return 2 * hanoi(k - 1) + 1;
}

int main(void) {
    int k;
    scanf("%d", &k);
    printf("%lld\\n", hanoi(k));
    return 0;
}
`,
  }),

  // ── HARD (4) ───────────────────────────────────────────────────────────────
  codeQ({
    title: "Numerology Digital Root Calculator",
    description: `A numerology app reduces a number to its digital root by repeatedly summing its digits until a single digit remains. Use recursive functions only (no loops anywhere) to compute the digital root. For input 0, output 0.

Input Format:
A single non-negative integer N.

Output Format:
Print the digital root (a single digit 0-9) on its own line.

Constraints:
0 <= N <= 1000000000000000000`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Mathematical Recursion",
    sampleinput1: "9875",
    sampleoutput1: "2",
    sampleinput2: "0",
    sampleoutput2: "0",
    input1: "5",
    output1: "5",
    input2: "12345",
    output2: "6",
    input3: "999999999999999999",
    output3: "9",
    inputconstrains: "0 <= N <= 10^18",
    blacklist: "for (, while (, do {",
    whitelist: "digRoot(",
    sourcecode: `#include <stdio.h>

static long long digitSum(long long n) {
    if (n == 0) return 0;
    return (n % 10) + digitSum(n / 10);
}

static long long digRoot(long long n) {
    if (n < 10) return n;
    return digRoot(digitSum(n));
}

int main(void) {
    long long n;
    scanf("%lld", &n);
    printf("%lld\\n", digRoot(n));
    return 0;
}
`,
  }),
  codeQ({
    title: "Recursive Sentence Reverser and Vowel Counter",
    description: `A text editor must reverse a sentence and report the number of vowels it contains, doing both jobs with recursive functions only. No loops and no string library functions are allowed. Print the reversed sentence on the first line and the vowel count on the second line.

Input Format:
A single line of text (may contain spaces, lowercase or uppercase letters), at most 200 characters.

Output Format:
Two lines: first the reversed sentence (excluding newline), then the vowel count.

Constraints:
1 <= length <= 200`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Recursion on Strings",
    sampleinput1: "hello",
    sampleoutput1: "olleh\n2",
    sampleinput2: "AEIOU",
    sampleoutput2: "UOIEA\n5",
    input1: "xyz",
    output1: "zyx\n0",
    input2: "a",
    output2: "a\n1",
    input3: "rhythm",
    output3: "mhtyhr\n0",
    inputconstrains: "1 <= length <= 200",
    blacklist: "strrev, strlen, for (, while (",
    whitelist: "revRec(, vowelRec(",
    sourcecode: `#include <stdio.h>

static int isVowel(char c) {
    return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u'
        || c == 'A' || c == 'E' || c == 'I' || c == 'O' || c == 'U';
}

static int vowelRec(const char *s, int i) {
    if (s[i] == '\\0' || s[i] == '\\n') return 0;
    return isVowel(s[i]) + vowelRec(s, i + 1);
}

static void revRec(const char *s, int i) {
    if (s[i] == '\\0' || s[i] == '\\n') return;
    revRec(s, i + 1);
    putchar(s[i]);
}

int main(void) {
    char buf[256];
    if (!fgets(buf, sizeof(buf), stdin)) return 0;
    revRec(buf, 0);
    putchar('\\n');
    printf("%d\\n", vowelRec(buf, 0));
    return 0;
}
`,
  }),
  codeQ({
    title: "Fibonacci Both Ways Memoized",
    description: `A biology class models rabbit population growth using the Fibonacci sequence. Compute the Nth Fibonacci number using BOTH a recursive function (with memoization) and an iterative loop. Print the recursive result on the first line and the iterative result on the second line; both must match.

Input Format:
A single integer N.

Output Format:
Two lines, each containing the Nth Fibonacci number (F(0) = 0, F(1) = 1).

Constraints:
0 <= N <= 50`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Recursion vs Iteration",
    sampleinput1: "10",
    sampleoutput1: "55\n55",
    sampleinput2: "0",
    sampleoutput2: "0\n0",
    input1: "1",
    output1: "1\n1",
    input2: "20",
    output2: "6765\n6765",
    input3: "30",
    output3: "832040\n832040",
    inputconstrains: "0 <= N <= 50",
    blacklist: "pow, math.h",
    whitelist: "fibRec(, for (",
    sourcecode: `#include <stdio.h>

static long long memo[51];

static long long fibRec(int n) {
    if (n <= 1) return n;
    if (memo[n] != 0) return memo[n];
    memo[n] = fibRec(n - 1) + fibRec(n - 2);
    return memo[n];
}

int main(void) {
    int n;
    scanf("%d", &n);
    long long rec = fibRec(n);
    long long a = 0, b = 1, c;
    if (n == 0) c = 0;
    else if (n == 1) c = 1;
    else {
        c = 0;
        for (int i = 2; i <= n; i++) {
            c = a + b;
            a = b;
            b = c;
        }
    }
    printf("%lld\\n", rec);
    printf("%lld\\n", c);
    return 0;
}
`,
  }),
  codeQ({
    title: "Inline Geometry Area Calculator",
    description: `A CAD tool computes the area of rectangles and circles using inline helper functions for performance. Read Q queries; each query specifies a type (1 = rectangle with width and height, 2 = circle with radius) and the dimensions. Print each area with exactly two decimal places.

Input Format:
First line: integer Q. Next Q lines: each contains type T followed by two values. For T=1 use width and height; for T=2 use radius (third value ignored).

Output Format:
Q lines, each containing the area with exactly two decimal places.

Constraints:
1 <= Q <= 1000, 0 <= width, height, radius <= 1000`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Inline Functions",
    sampleinput1: "3\n1 3 4\n2 5 0\n1 2.5 4",
    sampleoutput1: "12.00\n78.54\n10.00",
    sampleinput2: "1\n2 1 0",
    sampleoutput2: "3.14",
    input1: "2\n1 5 5\n2 2 0",
    output1: "25.00\n12.57",
    input2: "1\n1 10 10",
    output2: "100.00",
    input3: "1\n2 0 0",
    output3: "0.00",
    inputconstrains: "1 <= Q <= 1000, 0 <= width, height, radius <= 1000",
    blacklist: "pow, sqrt, math.h",
    whitelist: "inline , static ",
    sourcecode: `#include <stdio.h>

static inline double rectArea(double w, double h) { return w * h; }
static inline double circleArea(double r) { return 3.14159265358979 * r * r; }

int main(void) {
    int q;
    scanf("%d", &q);
    for (int i = 0; i < q; i++) {
        int t;
        double a, b;
        scanf("%d %lf %lf", &t, &a, &b);
        if (t == 1) printf("%.2f\\n", rectArea(a, b));
        else printf("%.2f\\n", circleArea(a));
    }
    return 0;
}
`,
  }),
];

/* ────────────────────────────── MCQ QUESTIONS ─────────────────────────────── */
const mcqs = [
  // ── EASY (10) ──────────────────────────────────────────────────────────────
  mcq({
    title: "Definition of Recursion in C",
    description: "Which statement best defines recursion in C?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Recursion Basics",
    Option1: "A function that calls itself directly or indirectly",
    Option2: "A function that calls another function once",
    Option3: "A function that returns void",
    Option4: "A function declared with the static keyword",
    CorrectOption: 1,
  }),
  mcq({
    title: "Purpose of Base Case in Recursion",
    description: "What is the role of the base case in a recursive function?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Base and Recursive Case",
    Option1: "It stops the recursion from continuing indefinitely",
    Option2: "It is the first call to the function from main",
    Option3: "It performs the recursive call",
    Option4: "It declares the return type",
    CorrectOption: 1,
  }),
  mcq({
    title: "Effect of Missing Base Case",
    description: "What happens if a recursive function has no base case?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Base and Recursive Case",
    Option1: "Stack overflow due to unbounded calls",
    Option2: "Infinite loop without recursion",
    Option3: "Returns 0 immediately",
    Option4: "Returns 1 immediately",
    CorrectOption: 1,
  }),
  mcq({
    title: "C Keyword for Inline Functions",
    description: "Which keyword suggests the compiler inline a function?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Inline Functions",
    Option1: "inline",
    Option2: "static",
    Option3: "auto",
    Option4: "extern",
    CorrectOption: 1,
  }),
  mcq({
    title: "Call Stack Usage in Recursion vs Iteration",
    description: "Between recursion and iteration, which typically uses more call stack space?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Recursion vs Iteration",
    Option1: "Recursion, because each call adds a stack frame",
    Option2: "Iteration, because loops use the stack",
    Option3: "Both use identical stack space",
    Option4: "Neither uses the call stack",
    CorrectOption: 1,
  }),
  mcq({
    title: "Value of Zero Factorial",
    description: "By definition, what is the value of 0! (zero factorial)?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Mathematical Recursion",
    Option1: "1",
    Option2: "0",
    Option3: "Undefined",
    Option4: "10",
    CorrectOption: 1,
  }),
  mcq({
    title: "Advancing Through Array in Recursion",
    description: "When recursing through an array, what is typically passed to advance to the next element?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Recursion on Arrays",
    Option1: "An index parameter incremented in the recursive call",
    Option2: "A global counter variable",
    Option3: "A pointer to the entire array only",
    Option4: "A floating-point step value",
    CorrectOption: 1,
  }),
  mcq({
    title: "Risk of Unbounded Recursion",
    description: "What is the main risk of very deep recursion in C?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Recursion Basics",
    Option1: "Stack overflow",
    Option2: "Memory leak",
    Option3: "Slow compilation",
    Option4: "Type mismatch",
    CorrectOption: 1,
  }),
  mcq({
    title: "Primary Purpose of Inline Functions",
    description: "What is the primary purpose of marking a function inline?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Inline Functions",
    Option1: "Reduce function call overhead by substituting the body at the call site",
    Option2: "Force the compiler to optimize all loops",
    Option3: "Allow the function to recurse",
    Option4: "Prevent memory leaks",
    CorrectOption: 1,
  }),
  mcq({
    title: "Recursion on Strings Index Parameter",
    description: "In a recursive function that traverses a C string, which parameter is most commonly used to track position?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Recursion on Strings",
    Option1: "An integer index incremented in each recursive call",
    Option2: "A floating-point counter",
    Option3: "A boolean flag",
    Option4: "The original string length as a constant",
    CorrectOption: 1,
  }),

  // ── MEDIUM (6) ─────────────────────────────────────────────────────────────
  mcq({
    title: "Recursive Factorial Output Snippet",
    description: "What does the following snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Mathematical Recursion",
    Option1: "120",
    Option2: "24",
    Option3: "720",
    Option4: "25",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int fact(int n) {
    if (n <= 1) return 1;
    return n * fact(n - 1);
}
int main(void) {
    printf("%d\\n", fact(5));
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Recursive Sum Base Case Snippet",
    description: "What does the following snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Base and Recursive Case",
    Option1: "10",
    Option2: "6",
    Option3: "4",
    Option4: "24",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int sum(int n) {
    if (n == 0) return 0;
    return n + sum(n - 1);
}
int main(void) {
    printf("%d\\n", sum(4));
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Recursive Count Print Order Snippet",
    description: "What does the following snippet print to stdout (after trailing-whitespace normalization)?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Recursion Basics",
    Option1: "1 2 3",
    Option2: "3 2 1",
    Option3: "123",
    Option4: "1 2 3 0",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
void count(int n) {
    if (n == 0) return;
    count(n - 1);
    printf("%d ", n);
}
int main(void) {
    count(3);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Recursive String Length Snippet",
    description: "What does the following snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Recursion on Strings",
    Option1: "4",
    Option2: "3",
    Option3: "5",
    Option4: "0",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int lenRec(const char *s, int i) {
    if (s[i] == '\\0') return 0;
    return 1 + lenRec(s, i + 1);
}
int main(void) {
    printf("%d\\n", lenRec("atom", 0));
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "When to Prefer Recursion Over Iteration",
    description: "When is recursion usually preferred over iteration?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Recursion vs Iteration",
    Option1: "When the problem has a naturally recursive structure such as tree traversal",
    Option2: "When performance is the only priority",
    Option3: "When memory is severely limited",
    Option4: "When the function must return void",
    CorrectOption: 1,
  }),
  mcq({
    title: "Tail Recursion Characteristic",
    description: "Which property makes a recursive function tail-recursive?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Recursion Basics",
    Option1: "The recursive call is the last operation performed in the function",
    Option2: "The function has no base case",
    Option3: "The function uses the inline keyword",
    Option4: "The function returns void",
    CorrectOption: 1,
  }),

  // ── HARD (4) ────────────────────────────────────────────────────────────────
  mcq({
    title: "Ackermann Function Trace Snippet",
    description: "What does the following snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Mathematical Recursion",
    Option1: "9",
    Option2: "7",
    Option3: "11",
    Option4: "5",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int ack(int m, int n) {
    if (m == 0) return n + 1;
    if (n == 0) return ack(m - 1, 1);
    return ack(m - 1, ack(m, n - 1));
}
int main(void) {
    printf("%d\\n", ack(2, 3));
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Recursive Palindrome Check Snippet",
    description: "What does the following snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Recursion on Strings",
    Option1: "1",
    Option2: "0",
    Option3: "-1",
    Option4: "7",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
#include <string.h>
int isPalin(const char *s, int lo, int hi) {
    if (lo >= hi) return 1;
    if (s[lo] != s[hi]) return 0;
    return isPalin(s, lo + 1, hi - 1);
}
int main(void) {
    char s[] = "racecar";
    printf("%d\\n", isPalin(s, 0, (int)strlen(s) - 1));
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "McCarthy 91 Function Snippet",
    description: "What does the following snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Mathematical Recursion",
    Option1: "91",
    Option2: "95",
    Option3: "85",
    Option4: "106",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int f(int n) {
    if (n > 100) return n - 10;
    return f(f(n + 11));
}
int main(void) {
    printf("%d\\n", f(95));
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Inline Square Function Snippet",
    description: "What does the following snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Inline Functions",
    Option1: "36",
    Option2: "26",
    Option3: "25",
    Option4: "11",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
static inline int square(int x) { return x * x; }
int main(void) {
    int a = 5;
    printf("%d\\n", square(a + 1));
    return 0;
}
`,
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
