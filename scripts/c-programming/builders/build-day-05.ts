/**
 * Builder for Day 5 — "Functions and Modular Programming".
 * Emits:
 *   /home/z/my-project/scripts/c-programming/data/day-05.code.json  (20 code questions)
 *   /home/z/my-project/scripts/c-programming/data/day-05.mcq.json   (20 MCQ questions)
 */
import { writeFileSync } from "node:fs";

const DAY = 5;
const TOPIC = "Functions and Modular Programming";
const SUBTOPICS = [
  "Function Declaration and Definition",
  "Function Parameters",
  "Return Values",
  "Call by Value",
  "Function Prototypes",
  "Modular Design",
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
    title: "Square Function Drill",
    description: `Read an integer and print its square by calling a function named square that takes one int and returns its square.

Input Format:
A single integer N.

Output Format:
Print N * N as an integer.

Constraints:
-1000 <= N <= 1000`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Function Declaration and Definition",
    sampleinput1: "5",
    sampleoutput1: "25",
    sampleinput2: "10",
    sampleoutput2: "100",
    input1: "0",
    output1: "0",
    input2: "-3",
    output2: "9",
    input3: "7",
    output3: "49",
    inputconstrains: "-1000 <= N <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int square(int n) {
    return n * n;
}

int main(void) {
    int n;
    scanf("%d", &n);
    printf("%d\\n", square(n));
    return 0;
}
`,
  }),
  codeQ({
    title: "Add Two Numbers via Function",
    description: `Read two integers and print their sum by calling a function named add that takes two int parameters and returns their sum.

Input Format:
Two space-separated integers A and B.

Output Format:
Print A + B as an integer.

Constraints:
-1000000 <= A, B <= 1000000`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Function Parameters",
    sampleinput1: "3 5",
    sampleoutput1: "8",
    sampleinput2: "10 20",
    sampleoutput2: "30",
    input1: "0 0",
    output1: "0",
    input2: "-5 5",
    output2: "0",
    input3: "100 200",
    output3: "300",
    inputconstrains: "-1000000 <= A, B <= 1000000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int add(int a, int b) {
    return a + b;
}

int main(void) {
    int a, b;
    scanf("%d %d", &a, &b);
    printf("%d\\n", add(a, b));
    return 0;
}
`,
  }),
  codeQ({
    title: "Maximum of Two via Function",
    description: `Read two integers and print the larger one by calling a function named max_of_two that returns the maximum of its two int parameters.

Input Format:
Two space-separated integers A and B.

Output Format:
Print the maximum of A and B.

Constraints:
-1000000 <= A, B <= 1000000`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Return Values",
    sampleinput1: "5 3",
    sampleoutput1: "5",
    sampleinput2: "10 20",
    sampleoutput2: "20",
    input1: "0 0",
    output1: "0",
    input2: "-5 -10",
    output2: "-5",
    input3: "100 99",
    output3: "100",
    inputconstrains: "-1000000 <= A, B <= 1000000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int max_of_two(int a, int b) {
    return (a > b) ? a : b;
}

int main(void) {
    int a, b;
    scanf("%d %d", &a, &b);
    printf("%d\\n", max_of_two(a, b));
    return 0;
}
`,
  }),
  codeQ({
    title: "Absolute Value Function",
    description: `Read an integer and print its absolute value by calling a function named abs_val that returns the absolute value of its int parameter.

Input Format:
A single integer N.

Output Format:
Print the absolute value of N.

Constraints:
-1000000 <= N <= 1000000`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Return Values",
    sampleinput1: "-5",
    sampleoutput1: "5",
    sampleinput2: "10",
    sampleoutput2: "10",
    input1: "0",
    output1: "0",
    input2: "-100",
    output2: "100",
    input3: "999",
    output3: "999",
    inputconstrains: "-1000000 <= N <= 1000000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int abs_val(int n) {
    return (n < 0) ? -n : n;
}

int main(void) {
    int n;
    scanf("%d", &n);
    printf("%d\\n", abs_val(n));
    return 0;
}
`,
  }),
  codeQ({
    title: "Cube Function Drill",
    description: `Read an integer and print its cube by calling a function named cube that returns the cube of its int parameter.

Input Format:
A single integer N.

Output Format:
Print N * N * N as an integer.

Constraints:
-1000 <= N <= 1000`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Function Declaration and Definition",
    sampleinput1: "3",
    sampleoutput1: "27",
    sampleinput2: "5",
    sampleoutput2: "125",
    input1: "0",
    output1: "0",
    input2: "-2",
    output2: "-8",
    input3: "10",
    output3: "1000",
    inputconstrains: "-1000 <= N <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int cube(int n) {
    return n * n * n;
}

int main(void) {
    int n;
    scanf("%d", &n);
    printf("%d\\n", cube(n));
    return 0;
}
`,
  }),
  codeQ({
    title: "Greeting Function with Prototype",
    description: `Read a single-word name and print "Hello, <NAME>!" by calling a function named greet. The function greet must be declared with a prototype before main and defined after main.

Input Format:
A single-word string NAME.

Output Format:
Print "Hello, <NAME>!" exactly.

Constraints:
1 <= length(NAME) <= 50`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Function Prototypes",
    sampleinput1: "Alice",
    sampleoutput1: "Hello, Alice!",
    sampleinput2: "Bob",
    sampleoutput2: "Hello, Bob!",
    input1: "Marie",
    output1: "Hello, Marie!",
    input2: "Alex",
    output2: "Hello, Alex!",
    input3: "Zoe",
    output3: "Hello, Zoe!",
    inputconstrains: "1 <= length(NAME) <= 50",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

void greet(char *name);  /* function prototype */

int main(void) {
    char name[100];
    scanf("%99s", name);
    greet(name);
    return 0;
}

void greet(char *name) {
    printf("Hello, %s!\\n", name);
}
`,
  }),

  // ── EASY SCENARIO (4) ───────────────────────────────────────────────────────
  codeQ({
    title: "Circle Area via Function",
    description: `A geometry helper reads a circle's radius and prints its area by calling a function circle_area that uses a #define constant PI = 3.14159.

Input Format:
A single floating-point value R (radius).

Output Format:
Print the area to two decimals.

Constraints:
0.0 <= R <= 10000.0`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Function Parameters",
    sampleinput1: "1",
    sampleoutput1: "3.14",
    sampleinput2: "2",
    sampleoutput2: "12.57",
    input1: "0",
    output1: "0.00",
    input2: "10",
    output2: "314.16",
    input3: "1.5",
    output3: "7.07",
    inputconstrains: "0.0 <= R <= 10000.0",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

#define PI 3.14159

double circle_area(double r) {
    return PI * r * r;
}

int main(void) {
    double r;
    scanf("%lf", &r);
    printf("%.2f\\n", circle_area(r));
    return 0;
}
`,
  }),
  codeQ({
    title: "Celsius Fahrenheit Converter",
    description: `A weather app reads a temperature in Celsius and prints the equivalent Fahrenheit value by calling a function to_fahrenheit that performs the conversion F = C * 9/5 + 32.

Input Format:
A single floating-point value C (degrees Celsius).

Output Format:
Print the Fahrenheit value to two decimals.

Constraints:
-100.0 <= C <= 200.0`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Function Parameters",
    sampleinput1: "0",
    sampleoutput1: "32.00",
    sampleinput2: "100",
    sampleoutput2: "212.00",
    input1: "25",
    output1: "77.00",
    input2: "-40",
    output2: "-40.00",
    input3: "37",
    output3: "98.60",
    inputconstrains: "-100.0 <= C <= 200.0",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

double to_fahrenheit(double c) {
    return (c * 9.0 / 5.0) + 32.0;
}

int main(void) {
    double c;
    scanf("%lf", &c);
    printf("%.2f\\n", to_fahrenheit(c));
    return 0;
}
`,
  }),
  codeQ({
    title: "Simple Interest Calculator Function",
    description: `A loan officer reads a principal P, an annual interest rate R (in percent), and a time T (in years), then prints the simple interest by calling a function simple_interest that returns (P * R * T) / 100.

Input Format:
Three space-separated floating-point values: P, R, T.

Output Format:
Print the simple interest to two decimals.

Constraints:
0.0 <= P <= 1000000.0, 0.0 <= R <= 100.0, 0.0 <= T <= 50.0`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Return Values",
    sampleinput1: "1000 5 2",
    sampleoutput1: "100.00",
    sampleinput2: "5000 10 1",
    sampleoutput2: "500.00",
    input1: "0 5 2",
    output1: "0.00",
    input2: "100 10 10",
    output2: "100.00",
    input3: "1000 0 5",
    output3: "0.00",
    inputconstrains: "0.0 <= P <= 1000000.0, 0.0 <= R <= 100.0, 0.0 <= T <= 50.0",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

double simple_interest(double p, double r, double t) {
    return (p * r * t) / 100.0;
}

int main(void) {
    double p, r, t;
    scanf("%lf %lf %lf", &p, &r, &t);
    printf("%.2f\\n", simple_interest(p, r, t));
    return 0;
}
`,
  }),
  codeQ({
    title: "Average Speed Calculator",
    description: `A trip computer reads the distance traveled and the time taken, then prints the average speed by calling a function speed that returns distance / time (and 0.0 when time is 0 to avoid division by zero).

Input Format:
Two space-separated floating-point values: DISTANCE and TIME.

Output Format:
Print the average speed to two decimals.

Constraints:
0.0 <= DISTANCE <= 1000000.0, 0.0 <= TIME <= 100000.0`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Return Values",
    sampleinput1: "100 2",
    sampleoutput1: "50.00",
    sampleinput2: "60 1.5",
    sampleoutput2: "40.00",
    input1: "0 1",
    output1: "0.00",
    input2: "100 0",
    output2: "0.00",
    input3: "200 4",
    output3: "50.00",
    inputconstrains: "0.0 <= DISTANCE <= 1000000.0, 0.0 <= TIME <= 100000.0",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

double speed(double distance, double time) {
    if (time == 0.0) {
        return 0.0;
    }
    return distance / time;
}

int main(void) {
    double d, t;
    scanf("%lf %lf", &d, &t);
    printf("%.2f\\n", speed(d, t));
    return 0;
}
`,
  }),

  // ── MEDIUM SCENARIO (6) ────────────────────────────────────────────────────
  codeQ({
    title: "Manual Power Function",
    description: `A math utility reads a base and a non-negative exponent, then prints base raised to that exponent by calling a function power that computes the result with a for loop (no math library).

Input Format:
Two space-separated integers BASE and EXP.

Output Format:
Print BASE^EXP as a 64-bit integer.

Constraints:
-1000 <= BASE <= 1000, 0 <= EXP <= 30`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Function Declaration and Definition",
    sampleinput1: "2 10",
    sampleoutput1: "1024",
    sampleinput2: "5 3",
    sampleoutput2: "125",
    input1: "1 100",
    output1: "1",
    input2: "10 5",
    output2: "100000",
    input3: "3 4",
    output3: "81",
    inputconstrains: "-1000 <= BASE <= 1000, 0 <= EXP <= 30",
    blacklist: "pow(",
    whitelist: "int main, for (",
    sourcecode: `#include <stdio.h>

long long power(int base, int exp) {
    long long result = 1;
    int i;
    for (i = 0; i < exp; i++) {
        result *= base;
    }
    return result;
}

int main(void) {
    int b, e;
    scanf("%d %d", &b, &e);
    printf("%lld\\n", power(b, e));
    return 0;
}
`,
  }),
  codeQ({
    title: "GCD Function Pair",
    description: `A number-theory drill reads two non-negative integers and prints their GCD by calling a function gcd that implements the Euclidean algorithm with a while loop.

Input Format:
Two space-separated non-negative integers A and B.

Output Format:
Print the GCD as an integer.

Constraints:
0 <= A, B <= 1000000`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Function Parameters",
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
    inputconstrains: "0 <= A, B <= 1000000",
    blacklist: "pow",
    whitelist: "int main, while (",
    sourcecode: `#include <stdio.h>

int gcd(int a, int b) {
    while (b != 0) {
        int t = b;
        b = a % b;
        a = t;
    }
    return a;
}

int main(void) {
    int a, b;
    scanf("%d %d", &a, &b);
    printf("%d\\n", gcd(a, b));
    return 0;
}
`,
  }),
  codeQ({
    title: "Reverse Digits Function",
    description: `A palindrome helper reads an integer (possibly negative) and prints its digits reversed by calling a function reverse_digits that uses a while loop. The sign is dropped in the reversed form.

Input Format:
A single integer N.

Output Format:
Print the reversed digits as a 64-bit integer.

Constraints:
-1000000000 <= N <= 1000000000`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Return Values",
    sampleinput1: "123",
    sampleoutput1: "321",
    sampleinput2: "1000",
    sampleoutput2: "1",
    input1: "0",
    output1: "0",
    input2: "-456",
    output2: "654",
    input3: "99",
    output3: "99",
    inputconstrains: "-1000000000 <= N <= 1000000000",
    blacklist: "pow",
    whitelist: "long long, while (",
    sourcecode: `#include <stdio.h>

long long reverse_digits(long long n) {
    if (n < 0) n = -n;
    long long rev = 0;
    while (n != 0) {
        rev = rev * 10 + n % 10;
        n /= 10;
    }
    return rev;
}

int main(void) {
    long long n;
    scanf("%lld", &n);
    printf("%lld\\n", reverse_digits(n));
    return 0;
}
`,
  }),
  codeQ({
    title: "Prime Check Function with Prototype",
    description: `A primality tester reads an integer N and prints "Prime" or "Not Prime" by calling a function is_prime that returns 1 for prime and 0 otherwise. Provide an explicit function prototype for is_prime before main, and define is_prime after main.

Input Format:
A single integer N.

Output Format:
Print "Prime" or "Not Prime".

Constraints:
1 <= N <= 1000000`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Function Prototypes",
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
    whitelist: "int is_prime, int main",
    sourcecode: `#include <stdio.h>

int is_prime(int n);  /* function prototype */

int main(void) {
    int n;
    scanf("%d", &n);
    printf("%s\\n", is_prime(n) ? "Prime" : "Not Prime");
    return 0;
}

int is_prime(int n) {
    if (n < 2) {
        return 0;
    }
    int i;
    for (i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            return 0;
        }
    }
    return 1;
}
`,
  }),
  codeQ({
    title: "Modular Calculator Suite",
    description: `A modular calculator reads N and prints three values computed by three separate functions:
- factorial(N) = N!
- square(N) = N * N
- cube(N) = N * N * N

Use three function definitions above main to demonstrate modular design.

Input Format:
A single integer N.

Output Format:
Print three lines:
"Factorial: <F>"
"Square: <S>"
"Cube: <C>"

Constraints:
0 <= N <= 20`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Modular Design",
    sampleinput1: "5",
    sampleoutput1: "Factorial: 120\nSquare: 25\nCube: 125",
    sampleinput2: "3",
    sampleoutput2: "Factorial: 6\nSquare: 9\nCube: 27",
    input1: "0",
    output1: "Factorial: 1\nSquare: 0\nCube: 0",
    input2: "1",
    output2: "Factorial: 1\nSquare: 1\nCube: 1",
    input3: "10",
    output3: "Factorial: 3628800\nSquare: 100\nCube: 1000",
    inputconstrains: "0 <= N <= 20",
    blacklist: "pow",
    whitelist: "int main, return",
    sourcecode: `#include <stdio.h>

long long factorial(int n) {
    long long f = 1;
    int i;
    for (i = 1; i <= n; i++) {
        f *= i;
    }
    return f;
}

int square(int n) {
    return n * n;
}

int cube(int n) {
    return n * n * n;
}

int main(void) {
    int n;
    scanf("%d", &n);
    printf("Factorial: %lld\\n", factorial(n));
    printf("Square: %d\\n", square(n));
    printf("Cube: %d\\n", cube(n));
    return 0;
}
`,
  }),
  codeQ({
    title: "Discount Calculator Function",
    description: `A checkout system reads an item price and a discount percentage and prints the discounted price by calling a function apply_discount that returns price - (price * percent / 100).

Input Format:
Two space-separated floating-point values: PRICE and PERCENT.

Output Format:
Print the discounted price to two decimals.

Constraints:
0.0 <= PRICE <= 1000000.0, 0.0 <= PERCENT <= 100.0`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Function Parameters",
    sampleinput1: "100 10",
    sampleoutput1: "90.00",
    sampleinput2: "50 20",
    sampleoutput2: "40.00",
    input1: "0 0",
    output1: "0.00",
    input2: "200 50",
    output2: "100.00",
    input3: "1.99 5",
    output3: "1.89",
    inputconstrains: "0.0 <= PRICE <= 1000000.0, 0.0 <= PERCENT <= 100.0",
    blacklist: "pow",
    whitelist: "double, int main",
    sourcecode: `#include <stdio.h>

double apply_discount(double price, double percent) {
    return price - (price * percent / 100.0);
}

int main(void) {
    double price, percent;
    scanf("%lf %lf", &price, &percent);
    printf("%.2f\\n", apply_discount(price, percent));
    return 0;
}
`,
  }),

  // ── HARD SCENARIO (4) ──────────────────────────────────────────────────────
  codeQ({
    title: "Modular Statistics Reporter",
    description: `A statistics tool reads N floating-point values into an array and reports the minimum, maximum, sum, and average by calling three helper functions: find_min, find_max, and compute_sum. Modular design is required.

Input Format:
Line 1: integer N.
Next N lines: one floating-point value each.

Output Format:
Print four lines:
"Min: <min>"
"Max: <max>"
"Sum: <sum>"
"Avg: <avg>"
with each value to two decimals.

Constraints:
1 <= N <= 1000, -1000000.0 <= value <= 1000000.0`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Modular Design",
    sampleinput1: "5\n10 20 30 40 50",
    sampleoutput1: "Min: 10.00\nMax: 50.00\nSum: 150.00\nAvg: 30.00",
    sampleinput2: "3\n1 2 3",
    sampleoutput2: "Min: 1.00\nMax: 3.00\nSum: 6.00\nAvg: 2.00",
    input1: "1\n5",
    output1: "Min: 5.00\nMax: 5.00\nSum: 5.00\nAvg: 5.00",
    input2: "4\n-1 0 1 2",
    output2: "Min: -1.00\nMax: 2.00\nSum: 2.00\nAvg: 0.50",
    input3: "2\n100 200",
    output3: "Min: 100.00\nMax: 200.00\nSum: 300.00\nAvg: 150.00",
    inputconstrains: "1 <= N <= 1000, -1000000.0 <= value <= 1000000.0",
    blacklist: "pow, malloc",
    whitelist: "double, int main, for (",
    sourcecode: `#include <stdio.h>

double find_min(double arr[], int n) {
    double m = arr[0];
    int i;
    for (i = 1; i < n; i++) {
        if (arr[i] < m) m = arr[i];
    }
    return m;
}

double find_max(double arr[], int n) {
    double m = arr[0];
    int i;
    for (i = 1; i < n; i++) {
        if (arr[i] > m) m = arr[i];
    }
    return m;
}

double compute_sum(double arr[], int n) {
    double s = 0.0;
    int i;
    for (i = 0; i < n; i++) {
        s += arr[i];
    }
    return s;
}

int main(void) {
    int n, i;
    scanf("%d", &n);
    double arr[1000];
    for (i = 0; i < n; i++) {
        scanf("%lf", &arr[i]);
    }
    double mn = find_min(arr, n);
    double mx = find_max(arr, n);
    double sum = compute_sum(arr, n);
    double avg = sum / n;
    printf("Min: %.2f\\n", mn);
    printf("Max: %.2f\\n", mx);
    printf("Sum: %.2f\\n", sum);
    printf("Avg: %.2f\\n", avg);
    return 0;
}
`,
  }),
  codeQ({
    title: "Modular Triangle Validator",
    description: `A geometry tool reads three side lengths and prints the area of the triangle. Use two helper functions: is_valid_triangle (returns 1 if sides form a valid triangle, 0 otherwise) and triangle_area (returns 0.0 if invalid; otherwise applies Heron's formula and computes the square root via Newton's method, without using math.h).

Input Format:
Three space-separated integers A, B, C (side lengths).

Output Format:
Print the area to two decimals. Print 0.00 if the sides do not form a valid triangle.

Constraints:
1 <= A, B, C <= 10000`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Modular Design",
    sampleinput1: "3 4 5",
    sampleoutput1: "6.00",
    sampleinput2: "5 5 5",
    sampleoutput2: "10.83",
    input1: "1 1 1",
    output1: "0.43",
    input2: "1 1 5",
    output2: "0.00",
    input3: "6 8 10",
    output3: "24.00",
    inputconstrains: "1 <= A, B, C <= 10000",
    blacklist: "pow",
    whitelist: "double, int main, for (",
    sourcecode: `#include <stdio.h>

int is_valid_triangle(int a, int b, int c) {
    return (a + b > c) && (b + c > a) && (a + c > b);
}

double triangle_area(int a, int b, int c) {
    if (!is_valid_triangle(a, b, c)) {
        return 0.0;
    }
    double s = (a + b + c) / 2.0;
    double prod = s * (s - a) * (s - b) * (s - c);
    if (prod <= 0.0) {
        return 0.0;
    }
    double x = prod;
    int i;
    for (i = 0; i < 50; i++) {
        x = 0.5 * (x + prod / x);
    }
    return x;
}

int main(void) {
    int a, b, c;
    scanf("%d %d %d", &a, &b, &c);
    printf("%.2f\\n", triangle_area(a, b, c));
    return 0;
}
`,
  }),
  codeQ({
    title: "Modular Number Theory Suite",
    description: `A number-theory explorer reads an integer N and prints three classifications computed by three separate functions:
- is_prime(N): "Yes" if N is prime, else "No"
- is_armstrong(N): "Yes" if N is an Armstrong number (sum of its digits each raised to the digit count equals N), else "No"
- is_perfect(N): "Yes" if N equals the sum of its proper divisors, else "No"

Modular design is required; do not use the math library.

Input Format:
A single integer N.

Output Format:
Print three lines:
"Prime: <Yes|No>"
"Armstrong: <Yes|No>"
"Perfect: <Yes|No>"

Constraints:
0 <= N <= 100000`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Modular Design",
    sampleinput1: "11",
    sampleoutput1: "Prime: Yes\nArmstrong: No\nPerfect: No",
    sampleinput2: "153",
    sampleoutput2: "Prime: No\nArmstrong: Yes\nPerfect: No",
    input1: "6",
    output1: "Prime: No\nArmstrong: Yes\nPerfect: Yes",
    input2: "28",
    output2: "Prime: No\nArmstrong: No\nPerfect: Yes",
    input3: "2",
    output3: "Prime: Yes\nArmstrong: Yes\nPerfect: No",
    inputconstrains: "0 <= N <= 100000",
    blacklist: "pow",
    whitelist: "int is_prime, int main, return",
    sourcecode: `#include <stdio.h>

int is_prime(int n) {
    if (n < 2) return 0;
    int i;
    for (i = 2; i * i <= n; i++) {
        if (n % i == 0) return 0;
    }
    return 1;
}

int is_armstrong(int n) {
    if (n < 0) return 0;
    int ndigits = 0;
    int temp = n;
    if (temp == 0) ndigits = 1;
    while (temp != 0) {
        ndigits++;
        temp /= 10;
    }
    int sum = 0;
    temp = n;
    while (temp != 0) {
        int digit = temp % 10;
        int p = 1;
        int i;
        for (i = 0; i < ndigits; i++) {
            p *= digit;
        }
        sum += p;
        temp /= 10;
    }
    return sum == n;
}

int is_perfect(int n) {
    if (n < 2) return 0;
    int sum = 1;
    int i;
    for (i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            sum += i;
            if (i != n / i) {
                sum += n / i;
            }
        }
    }
    return sum == n;
}

int main(void) {
    int n;
    scanf("%d", &n);
    printf("Prime: %s\\n", is_prime(n) ? "Yes" : "No");
    printf("Armstrong: %s\\n", is_armstrong(n) ? "Yes" : "No");
    printf("Perfect: %s\\n", is_perfect(n) ? "Yes" : "No");
    return 0;
}
`,
  }),
  codeQ({
    title: "Modular Day-of-Year Calculator",
    description: `A date utility reads a day, month, and year, then prints the day-of-year (1 to 366) by calling a function day_of_year that uses two helper functions: is_leap_year (returns 1 if the year is a leap year) and days_in_month (returns the number of days in a given month, accounting for leap years).

Input Format:
Three space-separated integers: DAY, MONTH, YEAR.

Output Format:
Print the day-of-year as an integer.

Constraints:
1 <= DAY <= 31, 1 <= MONTH <= 12, 1 <= YEAR <= 9999. The input is guaranteed to be a valid date.`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Modular Design",
    sampleinput1: "1 1 2024",
    sampleoutput1: "1",
    sampleinput2: "31 12 2023",
    sampleoutput2: "365",
    input1: "1 3 2024",
    output1: "61",
    input2: "31 12 2024",
    output2: "366",
    input3: "15 6 2023",
    output3: "166",
    inputconstrains: "1 <= DAY <= 31, 1 <= MONTH <= 12, 1 <= YEAR <= 9999",
    blacklist: "pow",
    whitelist: "int is_leap_year, int main, return",
    sourcecode: `#include <stdio.h>

int is_leap_year(int y) {
    return (y % 4 == 0 && y % 100 != 0) || (y % 400 == 0);
}

int days_in_month(int m, int y) {
    switch (m) {
        case 1: case 3: case 5: case 7: case 8: case 10: case 12:
            return 31;
        case 4: case 6: case 9: case 11:
            return 30;
        case 2:
            return is_leap_year(y) ? 29 : 28;
        default:
            return 0;
    }
}

int day_of_year(int d, int m, int y) {
    int total = d;
    int i;
    for (i = 1; i < m; i++) {
        total += days_in_month(i, y);
    }
    return total;
}

int main(void) {
    int d, m, y;
    scanf("%d %d %d", &d, &m, &y);
    printf("%d\\n", day_of_year(d, m, y));
    return 0;
}
`,
  }),
];

/* ────────────────────────────── MCQ QUESTIONS ────────────────────────────── */
const mcqs = [
  // ── EASY (10) ───────────────────────────────────────────────────────────────
  mcq({
    title: "Function Definition Components",
    description: "Which of the following correctly describes a function definition in C?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Function Declaration and Definition",
    Option1: "It consists of a return type, function name, parameter list, and a body containing statements",
    Option2: "It only declares the function name and return type without a body",
    Option3: "It must always be placed before main in the source file",
    Option4: "It cannot contain a return statement",
    CorrectOption: 1,
  }),
  mcq({
    title: "void Return Type Meaning",
    description: "What does a return type of void indicate for a function in C?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Return Values",
    Option1: "The function does not return a value",
    Option2: "The function returns an integer",
    Option3: "The function can return any type",
    Option4: "The function returns a pointer",
    CorrectOption: 1,
  }),
  mcq({
    title: "Function Declaration Purpose",
    description: "What is the primary purpose of a function prototype in C?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Function Prototypes",
    Option1: "To declare the function's signature before its definition so it can be called earlier in the file",
    Option2: "To define the function body in advance",
    Option3: "To allocate memory for the function's local variables",
    Option4: "To force the function to be inlined by the compiler",
    CorrectOption: 1,
  }),
  mcq({
    title: "Call by Value Semantics",
    description: "In C, when an argument is passed to a function by value, what happens?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Call by Value",
    Option1: "A copy of the argument's value is made; changes inside the function do not affect the original variable",
    Option2: "The function receives the memory address of the argument",
    Option3: "The function can modify the original variable directly",
    Option4: "The argument is shared between caller and function",
    CorrectOption: 1,
  }),
  mcq({
    title: "Function Parameter Declaration",
    description: "Which of the following correctly declares a function that takes two int parameters and returns int?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Function Parameters",
    Option1: "int add(int a, int b);",
    Option2: "int add(int a b);",
    Option3: "int add(int, int, int);",
    Option4: "function int add(int a, int b);",
    CorrectOption: 1,
  }),
  mcq({
    title: "Return Statement Behavior",
    description: "What happens when a return statement is encountered during a function's execution?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Return Values",
    Option1: "The function immediately exits and returns the specified value to the caller",
    Option2: "The function pauses execution and resumes later",
    Option3: "The function restarts from the beginning",
    Option4: "The function continues to the next statement",
    CorrectOption: 1,
  }),
  mcq({
    title: "main Return Type Convention",
    description: "What is the conventional return type of main in a hosted C program, and what does returning 0 signify?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Return Values",
    Option1: "int; returning 0 indicates successful execution to the operating system",
    Option2: "void; returning nothing is required",
    Option3: "float; 0 indicates success",
    Option4: "char; '0' indicates success",
    CorrectOption: 1,
  }),
  mcq({
    title: "Function Signature Components",
    description: "Which of the following is part of a function's signature in C?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Function Declaration and Definition",
    Option1: "The function name and the parameter types",
    Option2: "Only the return type",
    Option3: "Only the function name",
    Option4: "The body statements",
    CorrectOption: 1,
  }),
  mcq({
    title: "void Parameter List Meaning",
    description: "What does 'int func(void)' indicate?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Function Parameters",
    Option1: "The function takes no parameters",
    Option2: "The function takes any number of parameters",
    Option3: "The function returns no value",
    Option4: "The function returns a void pointer",
    CorrectOption: 1,
  }),
  mcq({
    title: "Modular Design Benefit",
    description: "Which of the following is a key benefit of modular design using functions?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Modular Design",
    Option1: "Code is split into reusable, testable units that hide implementation details",
    Option2: "Programs run faster automatically without any other change",
    Option3: "Memory usage is always reduced",
    Option4: "Compilation becomes unnecessary",
    CorrectOption: 1,
  }),

  // ── MEDIUM (6) ─────────────────────────────────────────────────────────────
  mcq({
    title: "Function Return Value Prediction",
    description: "What does the following program print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Return Values",
    Option1: "25",
    Option2: "5",
    Option3: "10",
    Option4: "0",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int square(int x) {
    return x * x;
}
int main(void) {
    int n = 5;
    printf("%d\\n", square(n));
    return 0;
}`,
    snippetLang: "c",
  }),
  mcq({
    title: "Call by Value Output",
    description: "What does the following program print? (Note: arguments in C are passed by value.)",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Call by Value",
    Option1: "5",
    Option2: "6",
    Option3: "0",
    Option4: "1",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
void increment(int x) {
    x = x + 1;
}
int main(void) {
    int n = 5;
    increment(n);
    printf("%d\\n", n);
    return 0;
}`,
    snippetLang: "c",
  }),
  mcq({
    title: "Multiple Return Paths",
    description: "What does the following program print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Return Values",
    Option1: "1 -1 0",
    Option2: "1 1 1",
    Option3: "0 0 0",
    Option4: "-1 1 0",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int classify(int n) {
    if (n > 0) {
        return 1;
    }
    if (n < 0) {
        return -1;
    }
    return 0;
}
int main(void) {
    printf("%d %d %d\\n", classify(5), classify(-3), classify(0));
    return 0;
}`,
    snippetLang: "c",
  }),
  mcq({
    title: "Function Local Variable Reset",
    description: "What does the following program print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Call by Value",
    Option1: "3",
    Option2: "6",
    Option3: "1",
    Option4: "0",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int counter(void) {
    int x = 0;
    x++;
    return x;
}
int main(void) {
    printf("%d\\n", counter() + counter() + counter());
    return 0;
}`,
    snippetLang: "c",
  }),
  mcq({
    title: "Function Composition Output",
    description: "What does the following program print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Function Parameters",
    Option1: "11",
    Option2: "12",
    Option3: "10",
    Option4: "20",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int double_it(int x) {
    return x * 2;
}
int add_one(int x) {
    return x + 1;
}
int main(void) {
    printf("%d\\n", add_one(double_it(5)));
    return 0;
}`,
    snippetLang: "c",
  }),
  mcq({
    title: "Integer-to-Double Parameter Promotion",
    description: "What does the following program print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Function Parameters",
    Option1: "3.50",
    Option2: "3.00",
    Option3: "4.00",
    Option4: "7.00",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
double half(int x) {
    return x / 2.0;
}
int main(void) {
    printf("%.2f\\n", half(7));
    return 0;
}`,
    snippetLang: "c",
  }),

  // ── HARD (4) ───────────────────────────────────────────────────────────────
  mcq({
    title: "Static Local in Function",
    description: "What does the following program print? (The variable id is declared static inside next_id.)",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Function Declaration and Definition",
    Option1: "100 101 102",
    Option2: "100 100 100",
    Option3: "101 102 103",
    Option4: "0 1 2",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int next_id(void) {
    static int id = 100;
    return id++;
}
int main(void) {
    printf("%d ", next_id());
    printf("%d ", next_id());
    printf("%d\\n", next_id());
    return 0;
}`,
    snippetLang: "c",
  }),
  mcq({
    title: "Function Call Sequence",
    description: "What does the following program print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Function Parameters",
    Option1: "10",
    Option2: "6",
    Option3: "3",
    Option4: "1",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int add(int a, int b) {
    return a + b;
}
int main(void) {
    int r1 = add(1, 2);
    int r2 = add(r1, 3);
    int r3 = add(r2, 4);
    printf("%d\\n", r3);
    return 0;
}`,
    snippetLang: "c",
  }),
  mcq({
    title: "Function Modifying Global Variable",
    description: "What does the following program print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Modular Design",
    Option1: "30",
    Option2: "15",
    Option3: "0",
    Option4: "5",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int total = 0;
void add_to_total(int x) {
    total += x;
}
int main(void) {
    add_to_total(5);
    add_to_total(10);
    add_to_total(15);
    printf("%d\\n", total);
    return 0;
}`,
    snippetLang: "c",
  }),
  mcq({
    title: "Boolean Return via Function",
    description: "What does the following program print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Return Values",
    Option1: "1 0 1",
    Option2: "1 1 1",
    Option3: "0 1 0",
    Option4: "true false true",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int is_even(int n) {
    return n % 2 == 0;
}
int main(void) {
    printf("%d %d %d\\n", is_even(4), is_even(7), is_even(0));
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
