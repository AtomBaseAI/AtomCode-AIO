/**
 * Builder for Day 1 — "Introduction to C Programming".
 * Emits:
 *   /home/z/my-project/scripts/c-programming/data/day-01.code.json  (20 code questions)
 *   /home/z/my-project/scripts/c-programming/data/day-01.mcq.json   (20 MCQ questions)
 */
import { writeFileSync } from "node:fs";

const DAY = 1;
const TOPIC = "Introduction to C Programming";
const SUBTOPICS = [
  "History Features and Applications of C",
  "Role of C in System Programming",
  "Compiling and Running C Programs",
  "Main Function and Header Files",
  "printf and scanf Basics",
  "Comments and Code Formatting",
  "Primitive Data Types",
  "Variables and Constants",
  "Scope and Lifetime of Variables",
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
    title: "Integer Echo Drill",
    description: `Read a single integer from standard input and print it back on its own line.

Input Format:
A single integer N.

Output Format:
Print the integer N on its own line.

Constraints:
-1000000 <= N <= 1000000`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "printf and scanf Basics",
    sampleinput1: "42",
    sampleoutput1: "42",
    sampleinput2: "100",
    sampleoutput2: "100",
    input1: "0",
    output1: "0",
    input2: "-5",
    output2: "-5",
    input3: "999",
    output3: "999",
    inputconstrains: "-1000000 <= N <= 1000000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    printf("%d\\n", n);
    return 0;
}
`,
  }),
  codeQ({
    title: "Character Echo Drill",
    description: `Read a single character from standard input and print it back on its own line.

Input Format:
A single character C.

Output Format:
Print the character C on its own line.

Constraints:
C is a printable ASCII character.`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "printf and scanf Basics",
    sampleinput1: "A",
    sampleoutput1: "A",
    sampleinput2: "z",
    sampleoutput2: "z",
    input1: "0",
    output1: "0",
    input2: "9",
    output2: "9",
    input3: "X",
    output3: "X",
    inputconstrains: "C is a printable ASCII character",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    char c;
    scanf(" %c", &c);
    printf("%c\\n", c);
    return 0;
}
`,
  }),
  codeQ({
    title: "Float Two Decimal Echo",
    description: `Read a double value and print it formatted to exactly two decimal places.

Input Format:
A single floating-point number X.

Output Format:
Print X with exactly two digits after the decimal point.

Constraints:
-1000000.0 <= X <= 1000000.0`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Primitive Data Types",
    sampleinput1: "3.14159",
    sampleoutput1: "3.14",
    sampleinput2: "2.71828",
    sampleoutput2: "2.72",
    input1: "0",
    output1: "0.00",
    input2: "1.5",
    output2: "1.50",
    input3: "100.999",
    output3: "101.00",
    inputconstrains: "-1000000.0 <= X <= 1000000.0",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    double x;
    scanf("%lf", &x);
    printf("%.2f\\n", x);
    return 0;
}
`,
  }),
  codeQ({
    title: "Two Integer Order Swap Display",
    description: `Read two integers and print them first in the order received, then on a second line in swapped order.

Input Format:
Two space-separated integers A and B.

Output Format:
Line 1: A B
Line 2: B A

Constraints:
-1000000 <= A, B <= 1000000`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Variables and Constants",
    sampleinput1: "3 7",
    sampleoutput1: "3 7\n7 3",
    sampleinput2: "10 20",
    sampleoutput2: "10 20\n20 10",
    input1: "0 5",
    output1: "0 5\n5 0",
    input2: "-1 1",
    output2: "-1 1\n1 -1",
    input3: "100 200",
    output3: "100 200\n200 100",
    inputconstrains: "-1000000 <= A, B <= 1000000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int a, b;
    scanf("%d %d", &a, &b);
    printf("%d %d\\n", a, b);
    printf("%d %d\\n", b, a);
    return 0;
}
`,
  }),
  codeQ({
    title: "Name Banner Printer",
    description: `Read a single-word name and print it wrapped in a banner of equals signs.

Input Format:
A single-word string NAME (no spaces).

Output Format:
Print the line "=== NAME ===" exactly.

Constraints:
1 <= length(NAME) <= 50`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "printf and scanf Basics",
    sampleinput1: "Alice",
    sampleoutput1: "=== Alice ===",
    sampleinput2: "Bob",
    sampleoutput2: "=== Bob ===",
    input1: "Marie",
    output1: "=== Marie ===",
    input2: "Jo",
    output2: "=== Jo ===",
    input3: "Alex",
    output3: "=== Alex ===",
    inputconstrains: "1 <= length(NAME) <= 50",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    char name[100];
    scanf("%99s", name);
    printf("=== %s ===\\n", name);
    return 0;
}
`,
  }),
  codeQ({
    title: "Integer Float Pair Echo",
    description: `Read an integer and a floating-point value and print them on separate lines, the integer first, the float formatted to two decimals second.

Input Format:
A line containing an integer N and a floating-point X separated by a space.

Output Format:
Line 1: N
Line 2: X formatted with exactly two decimal places.

Constraints:
-1000000 <= N <= 1000000 and -1000000.0 <= X <= 1000000.0`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Primitive Data Types",
    sampleinput1: "5 3.14159",
    sampleoutput1: "5\n3.14",
    sampleinput2: "10 2.5",
    sampleoutput2: "10\n2.50",
    input1: "0 0",
    output1: "0\n0.00",
    input2: "100 99.999",
    output2: "100\n100.00",
    input3: "-3 1.234",
    output3: "-3\n1.23",
    inputconstrains: "-1000000 <= N <= 1000000 and -1000000.0 <= X <= 1000000.0",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    double x;
    scanf("%d %lf", &n, &x);
    printf("%d\\n", n);
    printf("%.2f\\n", x);
    return 0;
}
`,
  }),

  // ── EASY SCENARIO (4) ───────────────────────────────────────────────────────
  codeQ({
    title: "Cafe Order Receipt Printer",
    description: `A small cafe prints a basic receipt for every order. Read the item name and its price, then print a two-line receipt.

Input Format:
Line 1: a single-word item name ITEM.
Line 2: the price PRICE as a floating-point number.

Output Format:
Line 1: "Item: <ITEM>"
Line 2: "Price: <PRICE>" with PRICE formatted to two decimals.

Constraints:
1 <= length(ITEM) <= 50 and 0.0 <= PRICE <= 100000.0`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "printf and scanf Basics",
    sampleinput1: "Coffee\n2.50",
    sampleoutput1: "Item: Coffee\nPrice: 2.50",
    sampleinput2: "Tea\n1.25",
    sampleoutput2: "Item: Tea\nPrice: 1.25",
    input1: "Bagel\n3.00",
    output1: "Item: Bagel\nPrice: 3.00",
    input2: "Muffin\n2.75",
    output2: "Item: Muffin\nPrice: 2.75",
    input3: "Donut\n1.00",
    output3: "Item: Donut\nPrice: 1.00",
    inputconstrains: "1 <= length(ITEM) <= 50 and 0.0 <= PRICE <= 100000.0",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    char item[100];
    double price;
    scanf("%99s", item);
    scanf("%lf", &price);
    printf("Item: %s\\n", item);
    printf("Price: %.2f\\n", price);
    return 0;
}
`,
  }),
  codeQ({
    title: "Library Member Card Profile",
    description: `The city library issues a numeric ID and a single-word member name. Print a one-line profile that combines them.

Input Format:
Line 1: integer member ID.
Line 2: single-word member NAME.

Output Format:
Print "Member #<ID>: <NAME>" on a single line.

Constraints:
0 <= ID <= 1000000 and 1 <= length(NAME) <= 50`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "printf and scanf Basics",
    sampleinput1: "1\nAlice",
    sampleoutput1: "Member #1: Alice",
    sampleinput2: "42\nBob",
    sampleoutput2: "Member #42: Bob",
    input1: "100\nMarie",
    output1: "Member #100: Marie",
    input2: "0\nAlex",
    output2: "Member #0: Alex",
    input3: "999\nZoe",
    output3: "Member #999: Zoe",
    inputconstrains: "0 <= ID <= 1000000 and 1 <= length(NAME) <= 50",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int id;
    char name[100];
    scanf("%d", &id);
    scanf("%99s", name);
    printf("Member #%d: %s\\n", id, name);
    return 0;
}
`,
  }),
  codeQ({
    title: "Celsius Temperature Display",
    description: `A weather station reads a temperature in degrees Celsius and prints it in a fixed-format line.

Input Format:
A single floating-point value C representing degrees Celsius.

Output Format:
Print "T = <C> C" with C formatted to two decimals.

Constraints:
-100.0 <= C <= 200.0`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Primitive Data Types",
    sampleinput1: "25.5",
    sampleoutput1: "T = 25.50 C",
    sampleinput2: "0",
    sampleoutput2: "T = 0.00 C",
    input1: "100",
    output1: "T = 100.00 C",
    input2: "-10.5",
    output2: "T = -10.50 C",
    input3: "37.0",
    output3: "T = 37.00 C",
    inputconstrains: "-100.0 <= C <= 200.0",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    double c;
    scanf("%lf", &c);
    printf("T = %.2f C\\n", c);
    return 0;
}
`,
  }),
  codeQ({
    title: "Student Grade Card Printer",
    description: `A school prints a three-line grade card for every student. Read the roll number, single-word name, and marks (out of 100) and print them as a formatted card.

Input Format:
Line 1: integer roll number.
Line 2: single-word NAME.
Line 3: floating-point marks.

Output Format:
Line 1: "Roll: <roll>"
Line 2: "Name: <NAME>"
Line 3: "Marks: <marks>" with marks formatted to two decimals.

Constraints:
0 <= roll <= 1000000, 1 <= length(NAME) <= 50, 0.0 <= marks <= 100.0`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "printf and scanf Basics",
    sampleinput1: "1\nAlice\n85.5",
    sampleoutput1: "Roll: 1\nName: Alice\nMarks: 85.50",
    sampleinput2: "2\nBob\n90.0",
    sampleoutput2: "Roll: 2\nName: Bob\nMarks: 90.00",
    input1: "10\nMarie\n99.99",
    output1: "Roll: 10\nName: Marie\nMarks: 99.99",
    input2: "0\nAlex\n50.0",
    output2: "Roll: 0\nName: Alex\nMarks: 50.00",
    input3: "5\nZoe\n75.25",
    output3: "Roll: 5\nName: Zoe\nMarks: 75.25",
    inputconstrains: "0 <= roll <= 1000000, 1 <= length(NAME) <= 50, 0.0 <= marks <= 100.0",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int roll;
    char name[100];
    double marks;
    scanf("%d", &roll);
    scanf("%99s", name);
    scanf("%lf", &marks);
    printf("Roll: %d\\n", roll);
    printf("Name: %s\\n", name);
    printf("Marks: %.2f\\n", marks);
    return 0;
}
`,
  }),

  // ── MEDIUM SCENARIO (6) ────────────────────────────────────────────────────
  codeQ({
    title: "Warehouse Pallet Quantity Reporter",
    description: `A warehouse supervisor walks the aisles counting pallets. For each pallet she records a code and the quantity of items on it. After touring N pallets she wants a quick summary: how many pallets she counted and the total quantity across all of them.

Input Format:
Line 1: integer N (number of pallets).
Next N lines: two space-separated integers CODE and QTY.

Output Format:
Line 1: "Pallets: <N>"
Line 2: "Total Qty: <sum of QTY>"

Constraints:
1 <= N <= 1000, 1 <= CODE <= 100000, 1 <= QTY <= 100000`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Variables and Constants",
    sampleinput1: "3\n1 10\n2 20\n3 30",
    sampleoutput1: "Pallets: 3\nTotal Qty: 60",
    sampleinput2: "2\n100 5\n200 7",
    sampleoutput2: "Pallets: 2\nTotal Qty: 12",
    input1: "1\n1 100",
    output1: "Pallets: 1\nTotal Qty: 100",
    input2: "4\n1 1\n2 2\n3 3\n4 4",
    output2: "Pallets: 4\nTotal Qty: 10",
    input3: "5\n1 0\n2 0\n3 0\n4 0\n5 100",
    output3: "Pallets: 5\nTotal Qty: 100",
    inputconstrains: "1 <= N <= 1000, 1 <= CODE <= 100000, 0 <= QTY <= 100000",
    blacklist: "malloc, struct",
    whitelist: "for (, scanf(",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n, i;
    int code, qty;
    int total_qty = 0;
    scanf("%d", &n);
    for (i = 0; i < n; i++) {
        scanf("%d %d", &code, &qty);
        total_qty += qty;
    }
    printf("Pallets: %d\\n", n);
    printf("Total Qty: %d\\n", total_qty);
    return 0;
}
`,
  }),
  codeQ({
    title: "Constant Circle Metrics Calculator",
    description: `A mechanical drafting tool uses a compile-time constant for PI to compute the circumference and area of a circle from a given radius. Use a #define constant for PI equal to 3.14159 and print both metrics to two decimals.

Input Format:
A single floating-point value R representing the radius.

Output Format:
Line 1: "Circumference: <C>" with two decimals.
Line 2: "Area: <A>" with two decimals.

Constraints:
0.0 <= R <= 10000.0`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Variables and Constants",
    sampleinput1: "1",
    sampleoutput1: "Circumference: 6.28\nArea: 3.14",
    sampleinput2: "2.5",
    sampleoutput2: "Circumference: 15.71\nArea: 19.63",
    input1: "0",
    output1: "Circumference: 0.00\nArea: 0.00",
    input2: "10",
    output2: "Circumference: 62.83\nArea: 314.16",
    input3: "1.5",
    output3: "Circumference: 9.42\nArea: 7.07",
    inputconstrains: "0.0 <= R <= 10000.0",
    blacklist: "M_PI",
    whitelist: "#define, %.2f",
    sourcecode: `#include <stdio.h>

#define PI 3.14159

int main(void) {
    double r;
    scanf("%lf", &r);
    double circ = 2 * PI * r;
    double area = PI * r * r;
    printf("Circumference: %.2f\\n", circ);
    printf("Area: %.2f\\n", area);
    return 0;
}
`,
  }),
  codeQ({
    title: "Sensor Reading Averager",
    description: `An embedded system samples a voltage sensor five times per cycle and reports the average. Read exactly five voltage readings and print the average to two decimal places.

Input Format:
Five lines, each containing one floating-point voltage value.

Output Format:
Print "Average: <avg>" with avg formatted to two decimals.

Constraints:
0.0 <= voltage <= 12.0`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Primitive Data Types",
    sampleinput1: "1.0\n2.0\n3.0\n4.0\n5.0",
    sampleoutput1: "Average: 3.00",
    sampleinput2: "10.5\n20.5\n30.5\n40.5\n50.5",
    sampleoutput2: "Average: 30.50",
    input1: "0\n0\n0\n0\n0",
    output1: "Average: 0.00",
    input2: "1.5\n2.5\n3.5\n4.5\n5.5",
    output2: "Average: 3.50",
    input3: "100\n200\n300\n400\n500",
    output3: "Average: 300.00",
    inputconstrains: "0.0 <= voltage <= 1000.0",
    blacklist: "pow, malloc",
    whitelist: "for (, %.2f",
    sourcecode: `#include <stdio.h>

int main(void) {
    int i;
    double sum = 0.0, v;
    for (i = 0; i < 5; i++) {
        scanf("%lf", &v);
        sum += v;
    }
    printf("Average: %.2f\\n", sum / 5.0);
    return 0;
}
`,
  }),
  codeQ({
    title: "Static Counter Lifetime Demo",
    description: `A controller increments a file-scope counter N times and reports the final value, demonstrating that the counter retains its lifetime across function calls. Read N and print the resulting counter.

Input Format:
A single integer N.

Output Format:
Print "Counter: <N>" on its own line.

Constraints:
0 <= N <= 1000000`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Scope and Lifetime of Variables",
    sampleinput1: "5",
    sampleoutput1: "Counter: 5",
    sampleinput2: "10",
    sampleoutput2: "Counter: 10",
    input1: "0",
    output1: "Counter: 0",
    input2: "1",
    output2: "Counter: 1",
    input3: "100",
    output3: "Counter: 100",
    inputconstrains: "0 <= N <= 1000000",
    blacklist: "malloc",
    whitelist: "static , int main",
    sourcecode: `#include <stdio.h>

static int counter = 0;

void bump(void) {
    counter++;
}

int main(void) {
    int n, i;
    scanf("%d", &n);
    for (i = 0; i < n; i++) {
        bump();
    }
    printf("Counter: %d\\n", counter);
    return 0;
}
`,
  }),
  codeQ({
    title: "Train Coach Numbering Sequence",
    description: `A railway yard assigns consecutive coach numbers starting from a given first number. Given the starting coach number and the count of coaches, print each coach number on its own line. Use a const-qualified variable for the step between coaches.

Input Format:
Two space-separated integers: FIRST (the starting coach number) and N (the count of coaches).

Output Format:
Print N lines, each containing one coach number, starting from FIRST and incrementing by 1.

Constraints:
1 <= FIRST <= 100000, 1 <= N <= 1000`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Variables and Constants",
    sampleinput1: "1001 3",
    sampleoutput1: "1001\n1002\n1003",
    sampleinput2: "2000 5",
    sampleoutput2: "2000\n2001\n2002\n2003\n2004",
    input1: "0 1",
    output1: "0",
    input2: "10 4",
    output2: "10\n11\n12\n13",
    input3: "5000 2",
    output3: "5000\n5001",
    inputconstrains: "0 <= FIRST <= 100000, 1 <= N <= 1000",
    blacklist: "while",
    whitelist: "const , for (",
    sourcecode: `#include <stdio.h>

int main(void) {
    const int step = 1;
    int first, n, i;
    scanf("%d %d", &first, &n);
    for (i = 0; i < n; i++) {
        printf("%d\\n", first + i * step);
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "ATM Receipt Header Builder",
    description: `An ATM prints a receipt header containing a customer name bracketed by lines of equals signs. Read the customer name from a single line and print the header.

Input Format:
A single line containing the customer NAME (may contain spaces).

Output Format:
Print exactly four lines:
"========================"
"ATM RECEIPT"
"Customer: <NAME>"
"========================"

Constraints:
1 <= length(NAME) <= 80`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "printf and scanf Basics",
    sampleinput1: "Alice",
    sampleoutput1: "========================\nATM RECEIPT\nCustomer: Alice\n========================",
    sampleinput2: "Bob",
    sampleoutput2: "========================\nATM RECEIPT\nCustomer: Bob\n========================",
    input1: "Marie",
    output1: "========================\nATM RECEIPT\nCustomer: Marie\n========================",
    input2: "Alex",
    output2: "========================\nATM RECEIPT\nCustomer: Alex\n========================",
    input3: "Zoe",
    output3: "========================\nATM RECEIPT\nCustomer: Zoe\n========================",
    inputconstrains: "1 <= length(NAME) <= 80",
    blacklist: "strcpy, strcat",
    whitelist: "printf(, fgets(",
    sourcecode: `#include <stdio.h>
#include <string.h>

int main(void) {
    char name[100];
    fgets(name, sizeof(name), stdin);
    name[strcspn(name, "\\n")] = 0;
    printf("========================\\n");
    printf("ATM RECEIPT\\n");
    printf("Customer: %s\\n", name);
    printf("========================\\n");
    return 0;
}
`,
  }),

  // ── HARD SCENARIO (4) ──────────────────────────────────────────────────────
  codeQ({
    title: "Employee Pay Slip Generator",
    description: `A payroll clerk prepares pay slips for several employees. For each employee she reads a single-word name and a basic salary, then computes the house-rent allowance (10% of basic), dearness allowance (5% of basic) and gross pay. Use const-qualified constants for the allowance percentages. Print one pay slip line per employee.

Input Format:
Line 1: integer N (employee count).
Next N lines: each contains a single-word NAME and a floating-point BASIC salary, space-separated.

Output Format:
For each employee print exactly one line:
"<NAME>: Basic <B> HRA <H> DA <D> Gross <G>"
with B, H, D, G each formatted to two decimals.

Constraints:
1 <= N <= 1000, 1 <= length(NAME) <= 50, 0.0 <= BASIC <= 1000000.0`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Variables and Constants",
    sampleinput1: "2\nAlice 5000\nBob 8000",
    sampleoutput1: "Alice: Basic 5000.00 HRA 500.00 DA 250.00 Gross 5750.00\nBob: Basic 8000.00 HRA 800.00 DA 400.00 Gross 9200.00",
    sampleinput2: "1\nMarie 10000",
    sampleoutput2: "Marie: Basic 10000.00 HRA 1000.00 DA 500.00 Gross 11500.00",
    input1: "1\nAlex 0",
    output1: "Alex: Basic 0.00 HRA 0.00 DA 0.00 Gross 0.00",
    input2: "3\nA 1000\nB 2000\nC 3000",
    output2: "A: Basic 1000.00 HRA 100.00 DA 50.00 Gross 1150.00\nB: Basic 2000.00 HRA 200.00 DA 100.00 Gross 2300.00\nC: Basic 3000.00 HRA 300.00 DA 150.00 Gross 3450.00",
    input3: "1\nZoe 12000",
    output3: "Zoe: Basic 12000.00 HRA 1200.00 DA 600.00 Gross 13800.00",
    inputconstrains: "1 <= N <= 1000, 0.0 <= BASIC <= 1000000.0",
    blacklist: "malloc, struct",
    whitelist: "for (, const , %.2f",
    sourcecode: `#include <stdio.h>

int main(void) {
    const double hra_pct = 0.10;
    const double da_pct = 0.05;
    int n, i;
    scanf("%d", &n);
    for (i = 0; i < n; i++) {
        char name[100];
        double basic;
        scanf("%99s %lf", name, &basic);
        double hra = basic * hra_pct;
        double da = basic * da_pct;
        double gross = basic + hra + da;
        printf("%s: Basic %.2f HRA %.2f DA %.2f Gross %.2f\\n",
               name, basic, hra, da, gross);
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Library Loan Fine Calculator",
    description: `A municipal library charges overdue fines using a tiered policy: 0 rupees for 0 days late, 2 rupees per day for the first 10 days, and 5 rupees per day for every day beyond 10. Read the number of overdue books followed by (book_id, days_late) pairs and print the total fine collected.

Input Format:
Line 1: integer N (number of books).
Next N lines: two space-separated integers BOOK_ID and DAYS_LATE.

Output Format:
Print "Total Fine: <amount>" on its own line.

Constraints:
1 <= N <= 1000, 1 <= BOOK_ID <= 1000000, 0 <= DAYS_LATE <= 1000`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Scope and Lifetime of Variables",
    sampleinput1: "3\n1 5\n2 15\n3 0",
    sampleoutput1: "Total Fine: 55",
    sampleinput2: "2\n100 8\n200 25",
    sampleoutput2: "Total Fine: 111",
    input1: "1\n1 0",
    output1: "Total Fine: 0",
    input2: "1\n1 100",
    output2: "Total Fine: 470",
    input3: "2\n1 10\n2 20",
    output3: "Total Fine: 90",
    inputconstrains: "1 <= N <= 1000, 0 <= DAYS_LATE <= 1000",
    blacklist: "switch",
    whitelist: "for (, if (, else if",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n, i;
    int total_fine = 0;
    scanf("%d", &n);
    for (i = 0; i < n; i++) {
        int id, days;
        scanf("%d %d", &id, &days);
        int fine;
        if (days <= 0) {
            fine = 0;
        } else if (days <= 10) {
            fine = days * 2;
        } else {
            fine = 10 * 2 + (days - 10) * 5;
        }
        total_fine += fine;
    }
    printf("Total Fine: %d\\n", total_fine);
    return 0;
}
`,
  }),
  codeQ({
    title: "Inventory Restock Value Reporter",
    description: `A store manager tallies the restock value of N items. For each item she records a numeric code, a quantity, and a unit price. She wants a per-item line plus the grand total at the end.

Input Format:
Line 1: integer N (number of items).
Next N lines: three space-separated values CODE (int), QTY (int), PRICE (double).

Output Format:
For each item print: "Code <CODE> Qty <QTY> Total <T>" with T formatted to two decimals.
After all items, print: "Grand Total: <G>" with G formatted to two decimals.

Constraints:
1 <= N <= 1000, 1 <= CODE <= 1000000, 0 <= QTY <= 10000, 0.0 <= PRICE <= 10000.0`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Variables and Constants",
    sampleinput1: "2\n1 10 5.0\n2 5 2.0",
    sampleoutput1: "Code 1 Qty 10 Total 50.00\nCode 2 Qty 5 Total 10.00\nGrand Total: 60.00",
    sampleinput2: "1\n100 3 12.50",
    sampleoutput2: "Code 100 Qty 3 Total 37.50\nGrand Total: 37.50",
    input1: "1\n1 1 1.0",
    output1: "Code 1 Qty 1 Total 1.00\nGrand Total: 1.00",
    input2: "3\n10 2 5.0\n20 3 4.0\n30 4 2.5",
    output2: "Code 10 Qty 2 Total 10.00\nCode 20 Qty 3 Total 12.00\nCode 30 Qty 4 Total 10.00\nGrand Total: 32.00",
    input3: "2\n1 100 0.5\n2 50 1.5",
    output3: "Code 1 Qty 100 Total 50.00\nCode 2 Qty 50 Total 75.00\nGrand Total: 125.00",
    inputconstrains: "1 <= N <= 1000, 0 <= QTY <= 10000, 0.0 <= PRICE <= 10000.0",
    blacklist: "struct, malloc",
    whitelist: "for (, %.2f",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n, i;
    double grand = 0.0;
    scanf("%d", &n);
    for (i = 0; i < n; i++) {
        int code, qty;
        double price;
        scanf("%d %d %lf", &code, &qty, &price);
        double total = qty * price;
        grand += total;
        printf("Code %d Qty %d Total %.2f\\n", code, qty, total);
    }
    printf("Grand Total: %.2f\\n", grand);
    return 0;
}
`,
  }),
  codeQ({
    title: "Battery Voltage Range Classifier",
    description: `A battery management system reads N voltage readings and classifies each reading as Low (strictly below 3.0 V), Normal (3.0 V up to and including 4.2 V), or High (strictly above 4.2 V). At the end it reports the three counts.

Input Format:
Line 1: integer N (number of readings).
Next N lines: a single floating-point voltage value.

Output Format:
Line 1: "Low: <count>"
Line 2: "Normal: <count>"
Line 3: "High: <count>"

Constraints:
1 <= N <= 100000, 0.0 <= voltage <= 12.0`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Primitive Data Types",
    sampleinput1: "5\n2.5 3.5 4.5 3.0 4.2",
    sampleoutput1: "Low: 1\nNormal: 3\nHigh: 1",
    sampleinput2: "3\n4.0 4.3 2.9",
    sampleoutput2: "Low: 1\nNormal: 1\nHigh: 1",
    input1: "1\n2.0",
    output1: "Low: 1\nNormal: 0\nHigh: 0",
    input2: "1\n4.5",
    output2: "Low: 0\nNormal: 0\nHigh: 1",
    input3: "3\n3.0 3.5 4.2",
    output3: "Low: 0\nNormal: 3\nHigh: 0",
    inputconstrains: "1 <= N <= 100000, 0.0 <= voltage <= 12.0",
    blacklist: "switch",
    whitelist: "if (, else if, for (",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n, i;
    int low = 0, normal = 0, high = 0;
    scanf("%d", &n);
    for (i = 0; i < n; i++) {
        double v;
        scanf("%lf", &v);
        if (v < 3.0) {
            low++;
        } else if (v <= 4.2) {
            normal++;
        } else {
            high++;
        }
    }
    printf("Low: %d\\n", low);
    printf("Normal: %d\\n", normal);
    printf("High: %d\\n", high);
    return 0;
}
`,
  }),
];

/* ────────────────────────────── MCQ QUESTIONS ────────────────────────────── */
const mcqs = [
  mcq({
    title: "Inventor of C Language",
    description: "Who is credited with developing the C programming language at Bell Labs in the early 1970s?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "History Features and Applications of C",
    Option1: "Dennis M. Ritchie",
    Option2: "Bjarne Stroustrup",
    Option3: "Guido van Rossum",
    Option4: "James Gosling",
    CorrectOption: 1,
  }),
  mcq({
    title: "Purpose of stdio.h Header",
    description: "What does the header file <stdio.h> provide to a C program?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Main Function and Header Files",
    Option1: "Declarations for standard input/output functions like printf and scanf",
    Option2: "Automatic dynamic memory management routines",
    Option3: "Trigonometric and logarithmic math functions",
    Option4: "Definitions of the sizes of all primitive data types",
    CorrectOption: 1,
  }),
  mcq({
    title: "Standard main Function Signature",
    description: "Which of the following is the standard signature of main in a hosted C program that takes no command-line arguments?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Main Function and Header Files",
    Option1: "int main(void)",
    Option2: "void main(void)",
    Option3: "public static void main(String[] args)",
    Option4: "main()",
    CorrectOption: 1,
  }),
  mcq({
    title: "scanf Format Specifier for double",
    description: "Which format specifier is used with scanf to read a value into a double variable?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "printf and scanf Basics",
    Option1: "%lf",
    Option2: "%f",
    Option3: "%d",
    Option4: "%c",
    CorrectOption: 1,
  }),
  mcq({
    title: "scanf Return Value on Success",
    description: "If scanf successfully reads one integer, what does it return?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "printf and scanf Basics",
    Option1: "1",
    Option2: "0",
    Option3: "EOF",
    Option4: "The integer that was read",
    CorrectOption: 1,
  }),
  mcq({
    title: "Valid C Identifier",
    description: "Which of the following is a valid C identifier?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Variables and Constants",
    Option1: "_total",
    Option2: "2nd_place",
    Option3: "total-value",
    Option4: "return",
    CorrectOption: 1,
  }),
  mcq({
    title: "Compile-Time Constant Definition",
    description: "Which of the following defines a compile-time constant named PI with value 3.14 in C?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Variables and Constants",
    Option1: "#define PI 3.14",
    Option2: "const PI = 3.14;",
    Option3: "int PI = 3.14;",
    Option4: "define PI 3.14;",
    CorrectOption: 1,
  }),
  mcq({
    title: "Lifetime of a Global Variable",
    description: "What is the lifetime of a variable declared at file scope (a global variable) in C?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Scope and Lifetime of Variables",
    Option1: "The entire duration of the program",
    Option2: "Only while the function that uses it executes",
    Option3: "Until the variable is first read",
    Option4: "Until the end of the source file in which it appears",
    CorrectOption: 1,
  }),
  mcq({
    title: "Guaranteed Size of char",
    description: "What is the guaranteed size of the char type in C, in bytes?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Primitive Data Types",
    Option1: "1",
    Option2: "2",
    Option3: "4",
    Option4: "8",
    CorrectOption: 1,
  }),
  mcq({
    title: "Why C Suits System Programming",
    description: "Why is C widely used for system programming (operating systems, embedded firmware, compilers)?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Role of C in System Programming",
    Option1: "It allows low-level memory access and compiles to efficient, hardware-near code",
    Option2: "It automatically manages memory through a built-in garbage collector",
    Option3: "It runs entirely inside a virtual machine that guarantees safety",
    Option4: "It forbids pointer arithmetic to keep programs portable",
    CorrectOption: 1,
  }),

  // ── MEDIUM (6) ─────────────────────────────────────────────────────────────
  mcq({
    title: "Integer Division Output",
    description: "What does the following program print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Primitive Data Types",
    Option1: "3",
    Option2: "3.5",
    Option3: "4",
    Option4: "2",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int a = 7, b = 2;
    printf("%d\\n", a / b);
    return 0;
}`,
    snippetLang: "c",
  }),
  mcq({
    title: "Printing int as char via %c",
    description: "What does the following program print on an ASCII system?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Primitive Data Types",
    Option1: "A",
    Option2: "65",
    Option3: "a",
    Option4: "Compile error",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int n = 65;
    printf("%c\\n", n);
    return 0;
}`,
    snippetLang: "c",
  }),
  mcq({
    title: "sizeof(char) Result",
    description: "What does the following program print? (%zu is the correct specifier for sizeof results.)",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Primitive Data Types",
    Option1: "1",
    Option2: "2",
    Option3: "4",
    Option4: "8",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    printf("%zu\\n", sizeof(char));
    return 0;
}`,
    snippetLang: "c",
  }),
  mcq({
    title: "Local Variable Shadowing",
    description: "What does the following program print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Scope and Lifetime of Variables",
    Option1: "20",
    Option2: "10",
    Option3: "30",
    Option4: "Compile error",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int x = 10;
int main(void) {
    int x = 20;
    printf("%d\\n", x);
    return 0;
}`,
    snippetLang: "c",
  }),
  mcq({
    title: "Missing & in scanf",
    description: "What happens when the following program is compiled and run, with input such as 5?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "printf and scanf Basics",
    Option1: "It usually compiles with a warning and exhibits undefined behavior at runtime",
    Option2: "It is a hard compiler error: 'missing & in scanf'",
    Option3: "It prints the entered value back correctly",
    Option4: "It always prints 0",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int n;
    scanf("%d", n); /* & is missing */
    printf("%d\\n", n);
    return 0;
}`,
    snippetLang: "c",
  }),
  mcq({
    title: "Static Local Variable Persistence",
    description: "What does the following program print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Scope and Lifetime of Variables",
    Option1: "1 2 3",
    Option2: "1 1 1",
    Option3: "0 0 0",
    Option4: "3 3 3",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
void f(void) {
    static int x = 0;
    x++;
    printf("%d ", x);
}
int main(void) {
    f();
    f();
    f();
    printf("\\n");
    return 0;
}`,
    snippetLang: "c",
  }),

  // ── HARD (4) ───────────────────────────────────────────────────────────────
  mcq({
    title: "Mixed-Type Arithmetic Promotion",
    description: "What does the following program print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Primitive Data Types",
    Option1: "2.50",
    Option2: "2.00",
    Option3: "2.5",
    Option4: "3.00",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int a = 5;
    double b = 2.0;
    printf("%.2f\\n", a / b);
    return 0;
}`,
    snippetLang: "c",
  }),
  mcq({
    title: "Format Specifier Mismatch",
    description: "What is the behavior of the following program when compiled and run?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "printf and scanf Basics",
    Option1: "Undefined behavior; the output cannot be predicted reliably",
    Option2: "It reliably prints 5.000000",
    Option3: "It reliably prints 5",
    Option4: "It is a hard compiler error",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int n = 5;
    printf("%f\\n", n);
    return 0;
}`,
    snippetLang: "c",
  }),
  mcq({
    title: "sizeof Array via Macro",
    description: "On a platform where sizeof(int) == 4, what does the following program print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Variables and Constants",
    Option1: "32",
    Option2: "8",
    Option3: "4",
    Option4: "16",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
#define ARR_SIZE 8
int main(void) {
    int arr[ARR_SIZE];
    printf("%zu\\n", sizeof(arr));
    return 0;
}`,
    snippetLang: "c",
  }),
  mcq({
    title: "Producing an Executable with gcc",
    description: "Which gcc invocation compiles hello.c into an executable named hello?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Compiling and Running C Programs",
    Option1: "gcc hello.c -o hello",
    Option2: "gcc -r hello.c",
    Option3: "compile hello.c",
    Option4: "link hello.c -x",
    CorrectOption: 1,
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
