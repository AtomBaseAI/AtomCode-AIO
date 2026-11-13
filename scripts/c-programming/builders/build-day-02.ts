/**
 * Builder for Day 2 — "Operators".
 * Emits:
 *   /home/z/my-project/scripts/c-programming/data/day-02.code.json  (20 code questions)
 *   /home/z/my-project/scripts/c-programming/data/day-02.mcq.json   (20 MCQ questions)
 */
import { writeFileSync } from "node:fs";

const DAY = 2;
const TOPIC = "Operators";
const SUBTOPICS = [
  "Arithmetic Operators",
  "Relational Operators",
  "Logical Operators",
  "Bitwise Operators",
  "Assignment Operators",
  "Increment and Decrement Operators",
  "Conditional (Ternary) Operator",
  "Sizeof Operator",
  "Pointer Operators",
  "Special Operators",
  "Precedence and Associativity",
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
    title: "Two Integer Sum Drill",
    description: `Read two integers and print their sum. This drill exercises the addition operator.

Input Format:
Two space-separated integers A and B.

Output Format:
Print the sum A + B on its own line.

Constraints:
-1000000 <= A, B <= 1000000`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Arithmetic Operators",
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

int main(void) {
    int a, b;
    scanf("%d %d", &a, &b);
    printf("%d\\n", a + b);
    return 0;
}
`,
  }),
  codeQ({
    title: "Modulo Remainder Drill",
    description: `Read two integers A and B and print the remainder of A divided by B using the modulo operator.

Input Format:
Two space-separated integers A and B.

Output Format:
Print A % B on its own line.

Constraints:
-1000000 <= A <= 1000000, 1 <= B <= 1000000`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Arithmetic Operators",
    sampleinput1: "10 3",
    sampleoutput1: "1",
    sampleinput2: "17 5",
    sampleoutput2: "2",
    input1: "4 2",
    output1: "0",
    input2: "100 7",
    output2: "2",
    input3: "9 3",
    output3: "0",
    inputconstrains: "-1000000 <= A <= 1000000, 1 <= B <= 1000000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int a, b;
    scanf("%d %d", &a, &b);
    printf("%d\\n", a % b);
    return 0;
}
`,
  }),
  codeQ({
    title: "Post Increment Triple Printer",
    description: `Read an integer N and print three consecutive integers starting at N, each separated by a space, using the post-increment operator.

Input Format:
A single integer N.

Output Format:
Print three integers on one line separated by single spaces: N, N+1, N+2.

Constraints:
-1000000 <= N <= 1000000`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Increment and Decrement Operators",
    sampleinput1: "5",
    sampleoutput1: "5 6 7",
    sampleinput2: "10",
    sampleoutput2: "10 11 12",
    input1: "0",
    output1: "0 1 2",
    input2: "-3",
    output2: "-3 -2 -1",
    input3: "100",
    output3: "100 101 102",
    inputconstrains: "-1000000 <= N <= 1000000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    printf("%d ", n++);
    printf("%d ", n++);
    printf("%d\\n", n++);
    return 0;
}
`,
  }),
  codeQ({
    title: "Greater Than Boolean Result",
    description: `Read two integers and print 1 if the first is strictly greater than the second, otherwise 0. This demonstrates that relational operators in C yield an int value.

Input Format:
Two space-separated integers A and B.

Output Format:
Print 1 if A > B, else 0.

Constraints:
-1000000 <= A, B <= 1000000`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Relational Operators",
    sampleinput1: "5 3",
    sampleoutput1: "1",
    sampleinput2: "3 5",
    sampleoutput2: "0",
    input1: "5 5",
    output1: "0",
    input2: "100 99",
    output2: "1",
    input3: "0 1",
    output3: "0",
    inputconstrains: "-1000000 <= A, B <= 1000000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int a, b;
    scanf("%d %d", &a, &b);
    printf("%d\\n", a > b);
    return 0;
}
`,
  }),
  codeQ({
    title: "Bitwise AND Drill",
    description: `Read two non-negative integers and print the result of their bitwise AND.

Input Format:
Two space-separated non-negative integers A and B.

Output Format:
Print A & B on its own line.

Constraints:
0 <= A, B <= 1000000`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Bitwise Operators",
    sampleinput1: "12 10",
    sampleoutput1: "8",
    sampleinput2: "15 7",
    sampleoutput2: "7",
    input1: "0 0",
    output1: "0",
    input2: "255 15",
    output2: "15",
    input3: "8 4",
    output3: "0",
    inputconstrains: "0 <= A, B <= 1000000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int a, b;
    scanf("%d %d", &a, &b);
    printf("%d\\n", a & b);
    return 0;
}
`,
  }),
  codeQ({
    title: "Bitwise OR Drill",
    description: `Read two non-negative integers and print the result of their bitwise OR.

Input Format:
Two space-separated non-negative integers A and B.

Output Format:
Print A | B on its own line.

Constraints:
0 <= A, B <= 1000000`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Bitwise Operators",
    sampleinput1: "12 10",
    sampleoutput1: "14",
    sampleinput2: "8 4",
    sampleoutput2: "12",
    input1: "0 0",
    output1: "0",
    input2: "255 0",
    output2: "255",
    input3: "1 2",
    output3: "3",
    inputconstrains: "0 <= A, B <= 1000000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int a, b;
    scanf("%d %d", &a, &b);
    printf("%d\\n", a | b);
    return 0;
}
`,
  }),

  // ── EASY SCENARIO (4) ───────────────────────────────────────────────────────
  codeQ({
    title: "Shopping Cart Total Calculator",
    description: `A grocery app reads three item prices and prints the cart total to two decimal places.

Input Format:
Three space-separated floating-point prices.

Output Format:
Print the total to two decimal places.

Constraints:
0.0 <= each price <= 10000.0`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Arithmetic Operators",
    sampleinput1: "10.50 20.00 5.25",
    sampleoutput1: "35.75",
    sampleinput2: "100 200 300",
    sampleoutput2: "600.00",
    input1: "0 0 0",
    output1: "0.00",
    input2: "1.5 2.5 3.5",
    output2: "7.50",
    input3: "99.99 0.01 50.00",
    output3: "150.00",
    inputconstrains: "0.0 <= each price <= 10000.0",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    double p1, p2, p3;
    scanf("%lf %lf %lf", &p1, &p2, &p3);
    printf("%.2f\\n", p1 + p2 + p3);
    return 0;
}
`,
  }),
  codeQ({
    title: "Discounted Price Calculator",
    description: `A retail checkout reads an original price and a discount percentage, then prints the discounted final price to two decimals.

Input Format:
Two space-separated values: PRICE (double) and DISCOUNT_PERCENT (double).

Output Format:
Print the final price (PRICE - PRICE * DISCOUNT_PERCENT / 100) to two decimals.

Constraints:
0.0 <= PRICE <= 1000000.0, 0.0 <= DISCOUNT_PERCENT <= 100.0`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Arithmetic Operators",
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
    inputconstrains: "0.0 <= PRICE <= 1000000.0, 0.0 <= DISCOUNT_PERCENT <= 100.0",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    double price, discount;
    scanf("%lf %lf", &price, &discount);
    double final_price = price - (price * discount / 100.0);
    printf("%.2f\\n", final_price);
    return 0;
}
`,
  }),
  codeQ({
    title: "Leap Year Ternary Classifier",
    description: `A calendar tool reads a year and classifies it as a leap year or not using a single conditional (ternary) expression. A year is leap if it is divisible by 4 but not by 100, unless it is also divisible by 400.

Input Format:
A single integer YEAR.

Output Format:
Print "Leap" or "Not Leap" on its own line.

Constraints:
1 <= YEAR <= 10000`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Conditional (Ternary) Operator",
    sampleinput1: "2000",
    sampleoutput1: "Leap",
    sampleinput2: "1900",
    sampleoutput2: "Not Leap",
    input1: "2024",
    output1: "Leap",
    input2: "2023",
    output2: "Not Leap",
    input3: "2020",
    output3: "Leap",
    inputconstrains: "1 <= YEAR <= 10000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int y;
    scanf("%d", &y);
    printf("%s\\n", ((y % 4 == 0 && y % 100 != 0) || (y % 400 == 0)) ? "Leap" : "Not Leap");
    return 0;
}
`,
  }),
  codeQ({
    title: "Parking Minutes Round-Up Calculator",
    description: `A parking garage charges by the hour, rounding any partial hour up. Read the total minutes parked and print the number of billable hours. Use integer arithmetic (no math library).

Input Format:
A single integer MINUTES.

Output Format:
Print the billable hours as an integer (ceiling of MINUTES / 60).

Constraints:
0 <= MINUTES <= 100000`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Arithmetic Operators",
    sampleinput1: "45",
    sampleoutput1: "1",
    sampleinput2: "120",
    sampleoutput2: "2",
    input1: "0",
    output1: "0",
    input2: "60",
    output2: "1",
    input3: "61",
    output3: "2",
    inputconstrains: "0 <= MINUTES <= 100000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int m;
    scanf("%d", &m);
    int hours = (m + 59) / 60;
    printf("%d\\n", hours);
    return 0;
}
`,
  }),

  // ── MEDIUM SCENARIO (6) ────────────────────────────────────────────────────
  codeQ({
    title: "Bitwise Permission Flag Packer",
    description: `A file-system permission tool packs four permission bits (read, write, execute, admin) into a single byte using bit shifts and bitwise OR. Each input is 0 or 1. The packed layout is: read in bit 3, write in bit 2, execute in bit 1, admin in bit 0.

Input Format:
Four space-separated 0/1 values: R W X A.

Output Format:
Print the packed integer value.

Constraints:
Each of R, W, X, A is 0 or 1`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Bitwise Operators",
    sampleinput1: "1 0 1 0",
    sampleoutput1: "10",
    sampleinput2: "1 1 1 1",
    sampleoutput2: "15",
    input1: "0 0 0 0",
    output1: "0",
    input2: "1 1 0 0",
    output2: "12",
    input3: "0 0 0 1",
    output3: "1",
    inputconstrains: "Each of R, W, X, A is 0 or 1",
    blacklist: "pow, malloc",
    whitelist: "<<, |",
    sourcecode: `#include <stdio.h>

int main(void) {
    int r, w, x, a;
    scanf("%d %d %d %d", &r, &w, &x, &a);
    int packed = (r << 3) | (w << 2) | (x << 1) | a;
    printf("%d\\n", packed);
    return 0;
}
`,
  }),
  codeQ({
    title: "Compound Assignment Accumulator",
    description: `A batch processor reads N integer values, accumulates their sum using the += operator, then multiplies the accumulated sum by a fixed factor using the *= operator. Print the final value.

Input Format:
Line 1: two space-separated integers N and FACTOR.
Next N lines: one integer value each.

Output Format:
Print the final accumulated and scaled value on its own line.

Constraints:
1 <= N <= 1000, -1000 <= FACTOR <= 1000, -10000 <= each value <= 10000`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Assignment Operators",
    sampleinput1: "3 2\n1 2 3",
    sampleoutput1: "12",
    sampleinput2: "2 10\n5 5",
    sampleoutput2: "100",
    input1: "1 1\n10",
    output1: "10",
    input2: "4 0\n1 2 3 4",
    output2: "0",
    input3: "5 3\n1 1 1 1 1",
    output3: "15",
    inputconstrains: "1 <= N <= 1000, -1000 <= FACTOR <= 1000",
    blacklist: "while",
    whitelist: "+=, *=",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n, i;
    int sum = 0;
    int factor;
    scanf("%d %d", &n, &factor);
    for (i = 0; i < n; i++) {
        int v;
        scanf("%d", &v);
        sum += v;
    }
    sum *= factor;
    printf("%d\\n", sum);
    return 0;
}
`,
  }),
  codeQ({
    title: "Ternary Tax Bracket Selector",
    description: `A payroll program classifies an income into tax brackets using a single nested conditional (ternary) expression, without using any if statements.
Brackets:
- income <= 10000: tax = 0
- income <= 50000: tax = (income - 10000) * 0.10
- income <= 100000: tax = 4000 + (income - 50000) * 0.20
- otherwise: tax = 14000 + (income - 100000) * 0.30

Input Format:
A single integer INCOME.

Output Format:
Print the tax amount to two decimals.

Constraints:
0 <= INCOME <= 10000000`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Conditional (Ternary) Operator",
    sampleinput1: "10000",
    sampleoutput1: "0.00",
    sampleinput2: "50000",
    sampleoutput2: "4000.00",
    input1: "0",
    output1: "0.00",
    input2: "30000",
    output2: "2000.00",
    input3: "150000",
    output3: "29000.00",
    inputconstrains: "0 <= INCOME <= 10000000",
    blacklist: "if (",
    whitelist: "?, :",
    sourcecode: `#include <stdio.h>

int main(void) {
    int income;
    scanf("%d", &income);
    double tax = (income <= 10000) ? 0.0
               : (income <= 50000) ? (income - 10000) * 0.10
               : (income <= 100000) ? (4000 + (income - 50000) * 0.20)
               : (14000 + (income - 100000) * 0.30);
    printf("%.2f\\n", tax);
    return 0;
}
`,
  }),
  codeQ({
    title: "Bitwise Shift Encoder",
    description: `A simple obfuscation tool reads a byte value and a non-negative shift amount, then prints the value after a left bitwise shift. Use the shift operator directly.

Input Format:
Two space-separated non-negative integers V and N.

Output Format:
Print V << N on its own line.

Constraints:
0 <= V <= 65535, 0 <= N <= 15`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Bitwise Operators",
    sampleinput1: "1 3",
    sampleoutput1: "8",
    sampleinput2: "5 2",
    sampleoutput2: "20",
    input1: "0 5",
    output1: "0",
    input2: "1 0",
    output2: "1",
    input3: "100 1",
    output3: "200",
    inputconstrains: "0 <= V <= 65535, 0 <= N <= 15",
    blacklist: "pow",
    whitelist: "<<",
    sourcecode: `#include <stdio.h>

int main(void) {
    unsigned int v, n;
    scanf("%u %u", &v, &n);
    printf("%u\\n", v << n);
    return 0;
}
`,
  }),
  codeQ({
    title: "Precedence-Aware Formula Evaluator",
    description: `A scientific calculator reads four integers and evaluates the expression a * b + c * d - a using C's default operator precedence (multiplication before addition).

Input Format:
Four space-separated integers A, B, C, D.

Output Format:
Print the integer result of A * B + C * D - A.

Constraints:
-10000 <= A, B, C, D <= 10000`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Precedence and Associativity",
    sampleinput1: "1 2 3 4",
    sampleoutput1: "13",
    sampleinput2: "2 3 4 5",
    sampleoutput2: "24",
    input1: "0 0 0 0",
    output1: "0",
    input2: "1 1 1 1",
    output2: "1",
    input3: "10 10 10 10",
    output3: "190",
    inputconstrains: "-10000 <= A, B, C, D <= 10000",
    blacklist: "pow",
    whitelist: "+, *",
    sourcecode: `#include <stdio.h>

int main(void) {
    int a, b, c, d;
    scanf("%d %d %d %d", &a, &b, &c, &d);
    int result = a * b + c * d - a;
    printf("%d\\n", result);
    return 0;
}
`,
  }),
  codeQ({
    title: "Logical Gate Emulator",
    description: `A digital circuit simulator reads four boolean inputs (each 0 or 1) labeled a, b, c, d and evaluates the boolean expression (a AND b) OR (c AND NOT d) using C's logical operators. Print 1 if the expression is true, 0 otherwise.

Input Format:
Four space-separated 0/1 integers A B C D.

Output Format:
Print 1 or 0.

Constraints:
Each input is 0 or 1`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Logical Operators",
    sampleinput1: "1 1 0 0",
    sampleoutput1: "1",
    sampleinput2: "0 0 0 0",
    sampleoutput2: "0",
    input1: "0 0 1 0",
    output1: "1",
    input2: "0 0 0 1",
    output2: "0",
    input3: "1 0 1 1",
    output3: "0",
    inputconstrains: "Each input is 0 or 1",
    blacklist: "if (",
    whitelist: "&&, ||",
    sourcecode: `#include <stdio.h>

int main(void) {
    int a, b, c, d;
    scanf("%d %d %d %d", &a, &b, &c, &d);
    int result = (a && b) || (c && !d);
    printf("%d\\n", result);
    return 0;
}
`,
  }),

  // ── HARD SCENARIO (4) ──────────────────────────────────────────────────────
  codeQ({
    title: "Bitwise RGB Color Blender",
    description: `A graphics utility blends two colors stored as packed 24-bit RGB integers (red in bits 16-23, green in bits 8-15, blue in bits 0-7). For each channel compute the integer average of the two colors, then repack and print the blended color.

Input Format:
Two space-separated non-negative integers C1 and C2 (each in [0, 16777215]).

Output Format:
Print the blended packed RGB value on its own line.

Constraints:
0 <= C1, C2 <= 16777215`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Bitwise Operators",
    sampleinput1: "0 16777215",
    sampleoutput1: "8355711",
    sampleinput2: "16711680 65280",
    sampleoutput2: "8355584",
    input1: "0 0",
    output1: "0",
    input2: "255 255",
    output2: "255",
    input3: "16777215 16777215",
    output3: "16777215",
    inputconstrains: "0 <= C1, C2 <= 16777215",
    blacklist: "pow, malloc",
    whitelist: ">>, <<, &",
    sourcecode: `#include <stdio.h>

int main(void) {
    unsigned int c1, c2;
    scanf("%u %u", &c1, &c2);
    unsigned int r1 = (c1 >> 16) & 0xFF;
    unsigned int g1 = (c1 >> 8) & 0xFF;
    unsigned int b1 = c1 & 0xFF;
    unsigned int r2 = (c2 >> 16) & 0xFF;
    unsigned int g2 = (c2 >> 8) & 0xFF;
    unsigned int b2 = c2 & 0xFF;
    unsigned int r = (r1 + r2) / 2;
    unsigned int g = (g1 + g2) / 2;
    unsigned int b = (b1 + b2) / 2;
    unsigned int blended = (r << 16) | (g << 8) | b;
    printf("%u\\n", blended);
    return 0;
}
`,
  }),
  codeQ({
    title: "Compound Assignment Currency Exchanger",
    description: `A currency exchange counter reads N amounts and a single conversion factor. Each amount is converted in place using the *= compound assignment, and the running total is accumulated using the += compound assignment. Print the final total.

Input Format:
Line 1: integer N and floating-point FACTOR, space-separated.
Next N lines: one floating-point amount each.

Output Format:
Print the converted total to two decimals.

Constraints:
1 <= N <= 1000, 0.0 <= FACTOR <= 1000.0, 0.0 <= amount <= 1000000.0`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Assignment Operators",
    sampleinput1: "3 1.5\n10 20 30",
    sampleoutput1: "90.00",
    sampleinput2: "2 2.0\n5 5",
    sampleoutput2: "20.00",
    input1: "1 1.0\n100",
    output1: "100.00",
    input2: "3 0.5\n2 4 6",
    output2: "6.00",
    input3: "4 1.0\n1 1 1 1",
    output3: "4.00",
    inputconstrains: "1 <= N <= 1000, 0.0 <= FACTOR <= 1000.0",
    blacklist: "while, malloc",
    whitelist: "*=, +=",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n, i;
    double factor;
    double total = 0.0;
    scanf("%d %lf", &n, &factor);
    for (i = 0; i < n; i++) {
        double v;
        scanf("%lf", &v);
        v *= factor;
        total += v;
    }
    printf("%.2f\\n", total);
    return 0;
}
`,
  }),
  codeQ({
    title: "Ternary Grade Classifier",
    description: `An instructor reads a student's marks (0-100) and classifies the grade using a single nested conditional (ternary) expression without any if or switch statements.

Grading:
- marks >= 90: A
- marks >= 75: B
- marks >= 60: C
- marks >= 40: D
- otherwise: F

Input Format:
A single integer MARKS.

Output Format:
Print the grade letter on its own line.

Constraints:
0 <= MARKS <= 100`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Conditional (Ternary) Operator",
    sampleinput1: "95",
    sampleoutput1: "A",
    sampleinput2: "80",
    sampleoutput2: "B",
    input1: "100",
    output1: "A",
    input2: "60",
    output2: "C",
    input3: "30",
    output3: "F",
    inputconstrains: "0 <= MARKS <= 100",
    blacklist: "if (, switch (",
    whitelist: "?, :",
    sourcecode: `#include <stdio.h>

int main(void) {
    int marks;
    scanf("%d", &marks);
    const char *grade = (marks >= 90) ? "A"
                     : (marks >= 75) ? "B"
                     : (marks >= 60) ? "C"
                     : (marks >= 40) ? "D"
                     : "F";
    printf("%s\\n", grade);
    return 0;
}
`,
  }),
  codeQ({
    title: "Bitwise Parity Bit Counter",
    description: `A communications protocol computes the parity of a 32-bit word by counting the number of set bits. Read an unsigned integer and print the count of 1 bits in its binary representation, using a while loop and bitwise operators.

Input Format:
A single unsigned integer N.

Output Format:
Print the count of 1 bits.

Constraints:
0 <= N <= 4294967295`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Bitwise Operators",
    sampleinput1: "7",
    sampleoutput1: "3",
    sampleinput2: "15",
    sampleoutput2: "4",
    input1: "0",
    output1: "0",
    input2: "1",
    output2: "1",
    input3: "1023",
    output3: "10",
    inputconstrains: "0 <= N <= 4294967295",
    blacklist: "pow, malloc",
    whitelist: "&, >>=, while (",
    sourcecode: `#include <stdio.h>

int main(void) {
    unsigned int n;
    scanf("%u", &n);
    int count = 0;
    while (n > 0) {
        count += n & 1;
        n >>= 1;
    }
    printf("%d\\n", count);
    return 0;
}
`,
  }),
];

/* ────────────────────────────── MCQ QUESTIONS ────────────────────────────── */
const mcqs = [
  // ── EASY (10) ───────────────────────────────────────────────────────────────
  mcq({
    title: "Integer Division Result",
    description: "What is the value of the expression 10 / 3 in C when both operands are int?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Arithmetic Operators",
    Option1: "3",
    Option2: "3.333333",
    Option3: "4",
    Option4: "0",
    CorrectOption: 1,
  }),
  mcq({
    title: "Modulo Operator Result",
    description: "What is the result of 17 % 5 in C?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Arithmetic Operators",
    Option1: "2",
    Option2: "3",
    Option3: "0",
    Option4: "1",
    CorrectOption: 1,
  }),
  mcq({
    title: "Logical AND Truth Value",
    description: "What is the value of the expression (1 && 0) in C?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Logical Operators",
    Option1: "0",
    Option2: "1",
    Option3: "2",
    Option4: "true",
    CorrectOption: 1,
  }),
  mcq({
    title: "Bitwise AND of 12 and 10",
    description: "What is the result of 12 & 10 in C?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Bitwise Operators",
    Option1: "8",
    Option2: "10",
    Option3: "14",
    Option4: "2",
    CorrectOption: 1,
  }),
  mcq({
    title: "Post-Increment Return Value",
    description: "What does the following program print?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Increment and Decrement Operators",
    Option1: "6 5",
    Option2: "5 5",
    Option3: "5 6",
    Option4: "6 6",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int x = 5;
    int y = x++;
    printf("%d %d\\n", x, y);
    return 0;
}`,
    snippetLang: "c",
  }),
  mcq({
    title: "Relational Comparison Result Type",
    description: "In C, what is the type and value of the expression (5 > 3)?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Relational Operators",
    Option1: "int with value 1",
    Option2: "bool with value true",
    Option3: "int with value 5",
    Option4: "float with value 1.0",
    CorrectOption: 1,
  }),
  mcq({
    title: "Compound Addition Assignment Symbol",
    description: "Which operator adds a value to a variable and stores the result back in the same variable?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Assignment Operators",
    Option1: "+=",
    Option2: "=+",
    Option3: "++",
    Option4: "+=+",
    CorrectOption: 1,
  }),
  mcq({
    title: "Ternary Operator Symbol",
    description: "Which symbol pair forms the conditional (ternary) operator in C?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Conditional (Ternary) Operator",
    Option1: "?:",
    Option2: "->",
    Option3: "&&",
    Option4: "::",
    CorrectOption: 1,
  }),
  mcq({
    title: "sizeof Return Type",
    description: "What type of value does the sizeof operator yield in C?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Sizeof Operator",
    Option1: "An unsigned integer type (size_t)",
    Option2: "A signed int",
    Option3: "A floating-point value",
    Option4: "A pointer",
    CorrectOption: 1,
  }),
  mcq({
    title: "Multiplication vs Addition Precedence",
    description: "Which of the following is true about operator precedence in C?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Precedence and Associativity",
    Option1: "* has higher precedence than +",
    Option2: "+ has higher precedence than *",
    Option3: "* and + have equal precedence, evaluated left-to-right",
    Option4: "Precedence depends on the order of operands",
    CorrectOption: 1,
  }),

  // ── MEDIUM (6) ─────────────────────────────────────────────────────────────
  mcq({
    title: "Mixed-Type Arithmetic Result",
    description: "What does the following program print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Arithmetic Operators",
    Option1: "3.50",
    Option2: "2.50",
    Option3: "3.5",
    Option4: "4.00",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int a = 5;
    double b = 2.0;
    printf("%.2f\\n", a / b + 1);
    return 0;
}`,
    snippetLang: "c",
  }),
  mcq({
    title: "Short-Circuit Evaluation",
    description: "What does the following program print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Logical Operators",
    Option1: "No",
    Option2: "Yes",
    Option3: "Compile error",
    Option4: "Runtime divide-by-zero crash",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int a = 0, b = 5;
    if (a != 0 && b / a > 1) {
        printf("Yes\\n");
    } else {
        printf("No\\n");
    }
    return 0;
}`,
    snippetLang: "c",
  }),
  mcq({
    title: "Pre vs Post Increment Sequence",
    description: "What does the following program print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Increment and Decrement Operators",
    Option1: "5 7 7",
    Option2: "6 6 7",
    Option3: "5 6 7",
    Option4: "5 7 6",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int i = 5;
    int a = i++;
    int b = ++i;
    printf("%d %d %d\\n", a, b, i);
    return 0;
}`,
    snippetLang: "c",
  }),
  mcq({
    title: "Bitwise XOR Result",
    description: "What does the following program print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Bitwise Operators",
    Option1: "6",
    Option2: "8",
    Option3: "2",
    Option4: "14",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int x = 12;
    int y = 10;
    printf("%d\\n", x ^ y);
    return 0;
}`,
    snippetLang: "c",
  }),
  mcq({
    title: "Compound Assignment Chain",
    description: "What does the following program print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Assignment Operators",
    Option1: "27",
    Option2: "30",
    Option3: "12",
    Option4: "32",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int x = 10;
    x += 5;
    x *= 2;
    x -= 3;
    printf("%d\\n", x);
    return 0;
}`,
    snippetLang: "c",
  }),
  mcq({
    title: "Nested Ternary Maximum",
    description: "What does the following program print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Conditional (Ternary) Operator",
    Option1: "15",
    Option2: "5",
    Option3: "10",
    Option4: "0",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int a = 5, b = 10, c = 15;
    int max = (a > b) ? (a > c ? a : c) : (b > c ? b : c);
    printf("%d\\n", max);
    return 0;
}`,
    snippetLang: "c",
  }),

  // ── HARD (4) ───────────────────────────────────────────────────────────────
  mcq({
    title: "Complex Operator Precedence",
    description: "What does the following program print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Precedence and Associativity",
    Option1: "9",
    Option2: "11",
    Option3: "8",
    Option4: "10",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int a = 5, b = 2, c = 3;
    int r = a + b * c - a / b;
    printf("%d\\n", r);
    return 0;
}`,
    snippetLang: "c",
  }),
  mcq({
    title: "Comma Operator Result",
    description: "What does the following program print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Special Operators",
    Option1: "3",
    Option2: "1",
    Option3: "2",
    Option4: "Compile error",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int a = (1, 2, 3);
    printf("%d\\n", a);
    return 0;
}`,
    snippetLang: "c",
  }),
  mcq({
    title: "Right Shift of Negative Int",
    description: "What is the behavior of the following program?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Bitwise Operators",
    Option1: "Implementation-defined; commonly yields -1 on arithmetic-shift platforms",
    Option2: "Always yields 0",
    Option3: "Always yields a large positive number",
    Option4: "Compile error",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int x = -1;
    printf("%d\\n", x >> 1);
    return 0;
}`,
    snippetLang: "c",
  }),
  mcq({
    title: "sizeof on Promoted Expression",
    description: "On a platform where sizeof(int) == 4 and sizeof(double) == 8, what does the following program print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Sizeof Operator",
    Option1: "8",
    Option2: "4",
    Option3: "12",
    Option4: "16",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int a = 5;
    double b = 2.0;
    printf("%zu\\n", sizeof(a + b));
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
