/**
 * Builder for Day 12 — "Pointers and Memory Management".
 * Emits:
 *   /home/z/my-project/scripts/c-programming/data/day-12.code.json  (20 code questions)
 *   /home/z/my-project/scripts/c-programming/data/day-12.mcq.json   (20 MCQ questions)
 *
 * Subtopics (exact strings from taxonomy.ts):
 *   Introduction to Pointers, Pointer Arithmetic, Pointers and Arrays,
 *   Null Pointers, Pointer to Pointer, Function Pointers
 */
import { writeFileSync } from "node:fs";

const DAY = 12;
const TOPIC = "Pointers and Memory Management";
const SUBTOPICS = [
  "Introduction to Pointers",
  "Pointer Arithmetic",
  "Pointers and Arrays",
  "Null Pointers",
  "Pointer to Pointer",
  "Function Pointers",
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
  /* ─────────── EASY BASIC (6) ─────────── */
  codeQ({
    title: "Dereference Pointer Drill",
    description:
      "Read an integer n into a variable. Create a pointer to that variable and print the value via the pointer.\n\nInput Format:\nA single line containing one integer n.\n\nOutput Format:\nThe integer n printed via pointer dereference.\n\nConstraints:\n-10^9 <= n <= 10^9",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Introduction to Pointers",
    sampleinput1: "5",
    sampleoutput1: "5",
    sampleinput2: "42",
    sampleoutput2: "42",
    input1: "-3",
    output1: "-3",
    input2: "0",
    output2: "0",
    input3: "100",
    output3: "100",
    inputconstrains: "-10^9 <= n <= 10^9",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int *p = &n;
    printf("%d\\n", *p);
    return 0;
}
`,
  }),
  codeQ({
    title: "Pointer Offset Access Drill",
    description:
      "Read three integers a, b, c into a 3-element array, then access the third element (index 2) via pointer arithmetic and print it.\n\nInput Format:\nA single line with three space-separated integers.\n\nOutput Format:\nThe third integer printed via *(p + 2).\n\nConstraints:\n-10^9 <= each integer <= 10^9",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Pointer Arithmetic",
    sampleinput1: "1 2 3",
    sampleoutput1: "3",
    sampleinput2: "10 20 30",
    sampleoutput2: "30",
    input1: "-1 -2 -3",
    output1: "-3",
    input2: "0 0 0",
    output2: "0",
    input3: "5 5 7",
    output3: "7",
    inputconstrains: "-10^9 <= each integer <= 10^9",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int a, b, c;
    if (scanf("%d %d %d", &a, &b, &c) != 3) return 0;
    int arr[3];
    arr[0] = a;
    arr[1] = b;
    arr[2] = c;
    int *p = arr;
    printf("%d\\n", *(p + 2));
    return 0;
}
`,
  }),
  codeQ({
    title: "Pointer Array Sum Drill",
    description:
      "Read n followed by n integers. Compute the sum of the integers by traversing the array with pointer arithmetic.\n\nInput Format:\nLine 1: integer n.\nLine 2: n space-separated integers.\n\nOutput Format:\nThe sum of the integers.\n\nConstraints:\n1 <= n <= 100, -10^4 <= each integer <= 10^4",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Pointers and Arrays",
    sampleinput1: "3\n1 2 3",
    sampleoutput1: "6",
    sampleinput2: "5\n1 2 3 4 5",
    sampleoutput2: "15",
    input1: "1\n7",
    output1: "7",
    input2: "4\n-1 -2 -3 -4",
    output2: "-10",
    input3: "2\n0 0",
    output3: "0",
    inputconstrains: "1 <= n <= 100, -10^4 <= each value <= 10^4",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[100];
    for (int i = 0; i < n; i++) {
        if (scanf("%d", &arr[i]) != 1) return 0;
    }
    int *p = arr;
    int sum = 0;
    for (int i = 0; i < n; i++) sum += *(p + i);
    printf("%d\\n", sum);
    return 0;
}
`,
  }),
  codeQ({
    title: "Null Pointer Guard Drill",
    description:
      "Read an integer n. If n is non-zero, set a pointer p to &n; otherwise set p to NULL. Print the value via *p when p is not NULL, otherwise print \"NULL\".\n\nInput Format:\nA single line containing one integer n.\n\nOutput Format:\nThe value of n (when non-zero) or the string \"NULL\" (when n == 0).\n\nConstraints:\n-10^9 <= n <= 10^9",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Null Pointers",
    sampleinput1: "5",
    sampleoutput1: "5",
    sampleinput2: "0",
    sampleoutput2: "NULL",
    input1: "42",
    output1: "42",
    input2: "-1",
    output2: "-1",
    input3: "100",
    output3: "100",
    inputconstrains: "-10^9 <= n <= 10^9",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int *p = NULL;
    if (n != 0) p = &n;
    if (p == NULL) {
        printf("NULL\\n");
    } else {
        printf("%d\\n", *p);
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Pointer to Pointer Drill",
    description:
      "Read an integer n. Create a pointer p pointing to n and a pointer-to-pointer pp pointing to p. Print the value via double dereference **pp.\n\nInput Format:\nA single line containing one integer n.\n\nOutput Format:\nThe value n printed via **pp.\n\nConstraints:\n-10^9 <= n <= 10^9",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Pointer to Pointer",
    sampleinput1: "7",
    sampleoutput1: "7",
    sampleinput2: "99",
    sampleoutput2: "99",
    input1: "-5",
    output1: "-5",
    input2: "0",
    output2: "0",
    input3: "256",
    output3: "256",
    inputconstrains: "-10^9 <= n <= 10^9",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int *p = &n;
    int **pp = &p;
    printf("%d\\n", **pp);
    return 0;
}
`,
  }),
  codeQ({
    title: "Function Pointer Call Drill",
    description:
      "Read two integers a and b. Use a function pointer fp pointing to an add(int, int) helper to compute and print a + b.\n\nInput Format:\nA single line with two space-separated integers.\n\nOutput Format:\nThe sum a + b computed via fp(a, b).\n\nConstraints:\n-10^9 <= a, b <= 10^9",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Function Pointers",
    sampleinput1: "2 3",
    sampleoutput1: "5",
    sampleinput2: "10 20",
    sampleoutput2: "30",
    input1: "-5 5",
    output1: "0",
    input2: "0 0",
    output2: "0",
    input3: "1000 -999",
    output3: "1",
    inputconstrains: "-10^9 <= a, b <= 10^9",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

static int add(int a, int b) { return a + b; }

int main(void) {
    int a, b;
    if (scanf("%d %d", &a, &b) != 2) return 0;
    int (*fp)(int, int) = add;
    printf("%d\\n", fp(a, b));
    return 0;
}
`,
  }),

  /* ─────────── EASY SCENARIO (4) ─────────── */
  codeQ({
    title: "Sensor Reading via Pointer",
    description:
      "A temperature sensor stores its reading in a variable. Read an integer temperature (in degrees Celsius) and print the value via a pointer, simulating hardware indirection.\n\nInput Format:\nA single line containing one integer temperature.\n\nOutput Format:\nThe temperature value printed via pointer dereference.\n\nConstraints:\n-1000 <= t <= 1000",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Introduction to Pointers",
    sampleinput1: "25",
    sampleoutput1: "25",
    sampleinput2: "-10",
    sampleoutput2: "-10",
    input1: "0",
    output1: "0",
    input2: "100",
    output2: "100",
    input3: "-273",
    output3: "-273",
    inputconstrains: "-1000 <= t <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int temp;
    if (scanf("%d", &temp) != 1) return 0;
    int *sensor = &temp;
    printf("%d\\n", *sensor);
    return 0;
}
`,
  }),
  codeQ({
    title: "Warehouse Price Index Lookup",
    description:
      "A warehouse has 5 item prices stored in an array. Read 5 integers (the prices), then a 0-based index i, and print the price at index i via pointer arithmetic.\n\nInput Format:\nLine 1: five space-separated integers.\nLine 2: an integer index i (0 <= i <= 4).\n\nOutput Format:\nThe price at index i.\n\nConstraints:\n1 <= price <= 10000, 0 <= i <= 4",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Pointer Arithmetic",
    sampleinput1: "10 20 30 40 50\n2",
    sampleoutput1: "30",
    sampleinput2: "5 10 15 20 25\n4",
    sampleoutput2: "25",
    input1: "1 2 3 4 5\n0",
    output1: "1",
    input2: "100 200 300 400 500\n3",
    output2: "400",
    input3: "7 14 21 28 35\n1",
    output3: "14",
    inputconstrains: "1 <= price <= 10000, 0 <= i <= 4",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int prices[5];
    for (int i = 0; i < 5; i++) {
        if (scanf("%d", &prices[i]) != 1) return 0;
    }
    int idx;
    if (scanf("%d", &idx) != 1) return 0;
    int *p = prices;
    printf("%d\\n", *(p + idx));
    return 0;
}
`,
  }),
  codeQ({
    title: "Daily High Temperature Maximum",
    description:
      "A weather station records daily high temperatures for n days. Find the maximum temperature using pointer traversal of the array.\n\nInput Format:\nLine 1: integer n.\nLine 2: n space-separated integers (temperatures).\n\nOutput Format:\nThe maximum temperature.\n\nConstraints:\n1 <= n <= 100, -1000 <= t <= 1000",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Pointers and Arrays",
    sampleinput1: "3\n10 20 15",
    sampleoutput1: "20",
    sampleinput2: "5\n-5 0 10 5 -10",
    sampleoutput2: "10",
    input1: "1\n42",
    output1: "42",
    input2: "4\n-100 -50 -75 -25",
    output2: "-25",
    input3: "2\n7 9",
    output3: "9",
    inputconstrains: "1 <= n <= 100, -1000 <= t <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int temps[100];
    for (int i = 0; i < n; i++) {
        if (scanf("%d", &temps[i]) != 1) return 0;
    }
    int *p = temps;
    int max = *p;
    for (int i = 1; i < n; i++) {
        if (*(p + i) > max) max = *(p + i);
    }
    printf("%d\\n", max);
    return 0;
}
`,
  }),
  codeQ({
    title: "Bootloader Config Pointer Check",
    description:
      "A bootloader reads a flag f and a config value v. If f is 1, the config pointer is set to &v; if f is 0, the pointer stays NULL. Print the dereferenced value when f is 1, otherwise print \"FAIL\".\n\nInput Format:\nA single line with two space-separated integers: f and v.\n\nOutput Format:\nThe value v (when f == 1) or \"FAIL\" (when f == 0).\n\nConstraints:\nf in {0, 1}, -10^9 <= v <= 10^9",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Null Pointers",
    sampleinput1: "1 42",
    sampleoutput1: "42",
    sampleinput2: "0 100",
    sampleoutput2: "FAIL",
    input1: "1 -5",
    output1: "-5",
    input2: "0 0",
    output2: "FAIL",
    input3: "1 256",
    output3: "256",
    inputconstrains: "f in {0, 1}, -10^9 <= v <= 10^9",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int f, v;
    if (scanf("%d %d", &f, &v) != 2) return 0;
    int *cfg = NULL;
    if (f) cfg = &v;
    if (cfg == NULL) {
        printf("FAIL\\n");
    } else {
        printf("%d\\n", *cfg);
    }
    return 0;
}
`,
  }),

  /* ─────────── MEDIUM SCENARIO (6) ─────────── */
  codeQ({
    title: "Pointer Swap Helper Function",
    description:
      "Two players' scores a and b must be exchanged using a helper function that takes two int pointers. Read a and b, then call swap(&a, &b), then print the swapped values separated by a single space.\n\nInput Format:\nA single line with two space-separated integers a and b.\n\nOutput Format:\nThe two integers after swapping, space-separated.\n\nConstraints:\n-10^9 <= a, b <= 10^9",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Introduction to Pointers",
    sampleinput1: "3 5",
    sampleoutput1: "5 3",
    sampleinput2: "10 20",
    sampleoutput2: "20 10",
    input1: "-1 1",
    output1: "1 -1",
    input2: "0 0",
    output2: "0 0",
    input3: "1000 999",
    output3: "999 1000",
    inputconstrains: "-10^9 <= a, b <= 10^9",
    blacklist: "qsort, bsearch",
    whitelist: "int *, *pa, &",
    sourcecode: `#include <stdio.h>

static void swap(int *pa, int *pb) {
    int t = *pa;
    *pa = *pb;
    *pb = t;
}

int main(void) {
    int a, b;
    if (scanf("%d %d", &a, &b) != 2) return 0;
    swap(&a, &b);
    printf("%d %d\\n", a, b);
    return 0;
}
`,
  }),
  codeQ({
    title: "In Place Array Reversal via Pointers",
    description:
      "A signal processing tool reverses an array of n integers in place using two pointer walkers (lo and hi). Read n and n integers, reverse the array, then print the reversed elements space-separated.\n\nInput Format:\nLine 1: integer n.\nLine 2: n space-separated integers.\n\nOutput Format:\nThe reversed array, space-separated.\n\nConstraints:\n1 <= n <= 100, -10^4 <= each value <= 10^4",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Pointer Arithmetic",
    sampleinput1: "5\n1 2 3 4 5",
    sampleoutput1: "5 4 3 2 1",
    sampleinput2: "3\n10 20 30",
    sampleoutput2: "30 20 10",
    input1: "1\n7",
    output1: "7",
    input2: "4\n1 -2 3 -4",
    output2: "-4 3 -2 1",
    input3: "2\n0 9",
    output3: "9 0",
    inputconstrains: "1 <= n <= 100, -10^4 <= value <= 10^4",
    blacklist: "qsort, bsearch, strrev",
    whitelist: "int *, *(p, *lo",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int data[100];
    int *p = data;
    for (int i = 0; i < n; i++) {
        if (scanf("%d", p + i) != 1) return 0;
    }
    int *lo = p;
    int *hi = p + (n - 1);
    while (lo < hi) {
        int t = *lo;
        *lo = *hi;
        *hi = t;
        lo++;
        hi--;
    }
    for (int i = 0; i < n; i++) {
        if (i) putchar(' ');
        printf("%d", *(p + i));
    }
    putchar('\\n');
    return 0;
}
`,
  }),
  codeQ({
    title: "Second Largest via Pointer Traversal",
    description:
      "Given an array of n distinct integers, find the second largest using pointer traversal. Print the second largest value.\n\nInput Format:\nLine 1: integer n (n >= 2).\nLine 2: n space-separated distinct integers.\n\nOutput Format:\nThe second largest integer.\n\nConstraints:\n2 <= n <= 100, all values distinct, -10^4 <= value <= 10^4",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Pointers and Arrays",
    sampleinput1: "5\n5 1 4 2 3",
    sampleoutput1: "4",
    sampleinput2: "3\n10 20 30",
    sampleoutput2: "20",
    input1: "4\n9 1 8 2",
    output1: "8",
    input2: "2\n-5 -10",
    output2: "-10",
    input3: "3\n-1 -2 -3",
    output3: "-2",
    inputconstrains: "2 <= n <= 100, values distinct, -10^4 <= value <= 10^4",
    blacklist: "qsort, bsearch",
    whitelist: "int *, *(p",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[100];
    int *p = arr;
    for (int i = 0; i < n; i++) {
        if (scanf("%d", p + i) != 1) return 0;
    }
    int max1 = *p;
    int max2 = -2147483647 - 1;
    for (int i = 1; i < n; i++) {
        if (*(p + i) > max1) {
            max2 = max1;
            max1 = *(p + i);
        } else if (*(p + i) > max2) {
            max2 = *(p + i);
        }
    }
    printf("%d\\n", max2);
    return 0;
}
`,
  }),
  codeQ({
    title: "Pointer Table Lookup Guard",
    description:
      "A database stores n integers and exposes them via an array of n pointers (each ptr[i] points to data[i]). Given a 0-based query index q, print the value via the pointer table, or print \"NULL\" if q is out of range.\n\nInput Format:\nLine 1: integer n.\nLine 2: n space-separated integers.\nLine 3: an integer query index q.\n\nOutput Format:\nThe value at index q, or \"NULL\" if q is out of range.\n\nConstraints:\n1 <= n <= 100, -10^4 <= value <= 10^4, -10^4 <= q <= 10^4",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Null Pointers",
    sampleinput1: "3\n10 20 30\n1",
    sampleoutput1: "20",
    sampleinput2: "3\n10 20 30\n5",
    sampleoutput2: "NULL",
    input1: "1\n42\n0",
    output1: "42",
    input2: "2\n-5 7\n-1",
    output2: "NULL",
    input3: "4\n1 2 3 4\n3",
    output3: "4",
    inputconstrains: "1 <= n <= 100, -10^4 <= value <= 10^4, -10^4 <= q <= 10^4",
    blacklist: "qsort, bsearch",
    whitelist: "int *, NULL, &",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    static int data[100];
    static int *ptrs[100];
    for (int i = 0; i < n; i++) {
        if (scanf("%d", &data[i]) != 1) return 0;
        ptrs[i] = &data[i];
    }
    int q;
    if (scanf("%d", &q) != 1) return 0;
    int *result = NULL;
    if (q >= 0 && q < n) result = ptrs[q];
    if (result == NULL) {
        printf("NULL\\n");
    } else {
        printf("%d\\n", *result);
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Active Setting via Pointer to Pointer",
    description:
      "A configuration manager has two settings (a and b). Given a flag f (0 means use a, 1 means use b), set an active pointer to the chosen setting and use a pointer-to-pointer to print the active setting's value.\n\nInput Format:\nA single line with three space-separated integers: a b f.\n\nOutput Format:\nThe value of the active setting.\n\nConstraints:\n-10^9 <= a, b <= 10^9, f in {0, 1}",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Pointer to Pointer",
    sampleinput1: "10 20 0",
    sampleoutput1: "10",
    sampleinput2: "10 20 1",
    sampleoutput2: "20",
    input1: "-5 5 1",
    output1: "5",
    input2: "0 100 0",
    output2: "0",
    input3: "1000 1 1",
    output3: "1",
    inputconstrains: "-10^9 <= a, b <= 10^9, f in {0, 1}",
    blacklist: "qsort",
    whitelist: "int *, int **, &",
    sourcecode: `#include <stdio.h>

int main(void) {
    int a, b, f;
    if (scanf("%d %d %d", &a, &b, &f) != 3) return 0;
    int *active = (f == 0) ? &a : &b;
    int **cfg = &active;
    printf("%d\\n", **cfg);
    return 0;
}
`,
  }),
  codeQ({
    title: "Function Pointer Calculator Dispatch",
    description:
      "A simple calculator dispatches to one of two operations via a function pointer. Read two integers a and b, and an operator char op ('+' for add, '*' for multiply). Print the result, or \"INVALID\" for unsupported operators.\n\nInput Format:\nA single line with two integers and an operator: \"a b op\".\n\nOutput Format:\nThe result of a op b, or \"INVALID\".\n\nConstraints:\n-10^9 <= a, b <= 10^9, op in {'+', '*', others}",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Function Pointers",
    sampleinput1: "3 5 +",
    sampleoutput1: "8",
    sampleinput2: "3 5 *",
    sampleoutput2: "15",
    input1: "10 2 -",
    output1: "INVALID",
    input2: "5 7 +",
    output2: "12",
    input3: "4 6 *",
    output3: "24",
    inputconstrains: "-10^9 <= a, b <= 10^9",
    blacklist: "qsort",
    whitelist: "int (*, NULL, &",
    sourcecode: `#include <stdio.h>

static int add(int a, int b) { return a + b; }
static int mul(int a, int b) { return a * b; }

int main(void) {
    int a, b;
    char op;
    if (scanf("%d %d %c", &a, &b, &op) != 3) return 0;
    int (*fp)(int, int) = NULL;
    if (op == '+') fp = add;
    else if (op == '*') fp = mul;
    if (fp == NULL) {
        printf("INVALID\\n");
    } else {
        printf("%d\\n", fp(a, b));
    }
    return 0;
}
`,
  }),

  /* ─────────── HARD SCENARIO (4) ─────────── */
  codeQ({
    title: "Pointer Arithmetic Palindrome Check",
    description:
      "Check whether an array of n integers is a palindrome (reads the same forward and backward) using two pointer walkers (lo and hi). Read n then n integers, print \"Yes\" or \"No\".\n\nInput Format:\nLine 1: integer n.\nLine 2: n space-separated integers.\n\nOutput Format:\n\"Yes\" if palindrome, else \"No\".\n\nConstraints:\n1 <= n <= 100, -10^4 <= value <= 10^4",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Pointer Arithmetic",
    sampleinput1: "5\n1 2 3 2 1",
    sampleoutput1: "Yes",
    sampleinput2: "4\n1 2 3 4",
    sampleoutput2: "No",
    input1: "3\n7 7 7",
    output1: "Yes",
    input2: "1\n42",
    output2: "Yes",
    input3: "6\n1 2 3 3 2 1",
    output3: "Yes",
    inputconstrains: "1 <= n <= 100, -10^4 <= value <= 10^4",
    blacklist: "qsort, bsearch",
    whitelist: "int *, *lo, *hi",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    static int data[100];
    int *p = data;
    for (int i = 0; i < n; i++) {
        if (scanf("%d", p + i) != 1) return 0;
    }
    int *lo = p;
    int *hi = p + (n - 1);
    int is_pal = 1;
    while (lo < hi) {
        if (*lo != *hi) { is_pal = 0; break; }
        lo++;
        hi--;
    }
    printf("%s\\n", is_pal ? "Yes" : "No");
    return 0;
}
`,
  }),
  codeQ({
    title: "Max Index via Pointer Walk",
    description:
      "A streaming service has n subscriber usage values. Find the 0-based index of the maximum usage using pointer arithmetic. If there is a tie, return the smallest index.\n\nInput Format:\nLine 1: integer n.\nLine 2: n space-separated integers.\n\nOutput Format:\nThe 0-based index of the maximum value.\n\nConstraints:\n1 <= n <= 100, -10^4 <= value <= 10^4",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Pointers and Arrays",
    sampleinput1: "5\n10 50 30 40 50",
    sampleoutput1: "1",
    sampleinput2: "4\n1 2 3 4",
    sampleoutput2: "3",
    input1: "3\n-5 -10 -3",
    output1: "2",
    input2: "1\n99",
    output2: "0",
    input3: "4\n7 7 7 7",
    output3: "0",
    inputconstrains: "1 <= n <= 100, -10^4 <= value <= 10^4",
    blacklist: "qsort, bsearch",
    whitelist: "int *, *max_ptr, *(p",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    static int usage[100];
    int *p = usage;
    for (int i = 0; i < n; i++) {
        if (scanf("%d", p + i) != 1) return 0;
    }
    int *max_ptr = p;
    int max_idx = 0;
    for (int i = 1; i < n; i++) {
        if (*(p + i) > *max_ptr) {
            max_ptr = p + i;
            max_idx = i;
        }
    }
    printf("%d\\n", max_idx);
    return 0;
}
`,
  }),
  codeQ({
    title: "Active Array Sum via Pointer to Pointer",
    description:
      "A traffic monitor keeps two parallel arrays A and B (each of n integers). A flag f selects which array is active. Use a pointer-to-pointer to the active array's first element pointer to compute and print the sum of the active array.\n\nInput Format:\nLine 1: integer n.\nLine 2: n integers for array A.\nLine 3: n integers for array B.\nLine 4: integer flag f (0 selects A, 1 selects B).\n\nOutput Format:\nThe sum of the active array.\n\nConstraints:\n1 <= n <= 100, -10^4 <= value <= 10^4, f in {0, 1}",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Pointer to Pointer",
    sampleinput1: "3\n1 2 3\n10 20 30\n0",
    sampleoutput1: "6",
    sampleinput2: "3\n1 2 3\n10 20 30\n1",
    sampleoutput2: "60",
    input1: "1\n5\n100\n0",
    output1: "5",
    input2: "1\n5\n100\n1",
    output2: "100",
    input3: "4\n1 2 3 4\n5 6 7 8\n0",
    output3: "10",
    inputconstrains: "1 <= n <= 100, -10^4 <= value <= 10^4, f in {0, 1}",
    blacklist: "qsort, bsearch",
    whitelist: "int **, *pp, int *",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    static int A[100], B[100];
    for (int i = 0; i < n; i++) {
        if (scanf("%d", &A[i]) != 1) return 0;
    }
    for (int i = 0; i < n; i++) {
        if (scanf("%d", &B[i]) != 1) return 0;
    }
    int f;
    if (scanf("%d", &f) != 1) return 0;
    int *active = (f == 0) ? A : B;
    int **pp = &active;
    int sum = 0;
    for (int i = 0; i < n; i++) sum += *(*pp + i);
    printf("%d\\n", sum);
    return 0;
}
`,
  }),
  codeQ({
    title: "Dispatch Table of Function Pointers",
    description:
      "A dispatch table holds 4 function pointers: add, sub, mul, divide (integer division). Read an operation index op (0..3), two integers a and b, then print the result via the function pointer. Print \"ERROR\" if op is out of range or if division by zero is attempted.\n\nInput Format:\nA single line with three space-separated values: op, a, b.\n\nOutput Format:\nThe result, or \"ERROR\".\n\nConstraints:\nop in {-1..5}, -10^9 <= a, b <= 10^9",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Function Pointers",
    sampleinput1: "0 3 5",
    sampleoutput1: "8",
    sampleinput2: "2 3 4",
    sampleoutput2: "12",
    input1: "1 10 4",
    output1: "6",
    input2: "3 17 5",
    output2: "3",
    input3: "3 5 0",
    output3: "ERROR",
    inputconstrains: "op in {-1..5}, -10^9 <= a, b <= 10^9",
    blacklist: "qsort, bsearch",
    whitelist: "int (*, NULL",
    sourcecode: `#include <stdio.h>

static int add(int a, int b) { return a + b; }
static int sub(int a, int b) { return a - b; }
static int mul(int a, int b) { return a * b; }
static int divide(int a, int b) {
    if (b == 0) return 0;
    return a / b;
}

int main(void) {
    int op, a, b;
    if (scanf("%d %d %d", &op, &a, &b) != 3) return 0;
    int (*ops[4])(int, int) = {add, sub, mul, divide};
    int (*fp)(int, int) = NULL;
    if (op >= 0 && op <= 3) fp = ops[op];
    if (fp == NULL || (op == 3 && b == 0)) {
        printf("ERROR\\n");
        return 0;
    }
    printf("%d\\n", fp(a, b));
    return 0;
}
`,
  }),
];

/* ────────────────────────────── MCQ QUESTIONS ────────────────────────────── */
const mcqs = [
  /* ─────────── EASY (10) ─────────── */
  mcq({
    title: "Pointer Declaration Meaning",
    description:
      "What does the declaration int *p = &x; establish in C?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Introduction to Pointers",
    Option1: "p is a pointer to int holding the address of x",
    Option2: "p is an int whose value equals x",
    Option3: "p is a pointer that stores the value of x directly",
    Option4: "p is a function returning a pointer to int",
    CorrectOption: 1,
  }),
  mcq({
    title: "Pointer Offset Value",
    description:
      "Given int arr[3] = {10, 20, 30}; int *p = arr; what is the value of *(p + 1)?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Pointer Arithmetic",
    Option1: "20",
    Option2: "10",
    Option3: "30",
    Option4: "The address of arr[1]",
    CorrectOption: 1,
  }),
  mcq({
    title: "Array Name Decay",
    description:
      "In C, when an array name is used in an expression (except as operand of sizeof or &), it decays into:",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Pointers and Arrays",
    Option1: "A pointer to its first element",
    Option2: "A pointer to its last element",
    Option3: "A copy of the whole array",
    Option4: "An integer equal to the array length",
    CorrectOption: 1,
  }),
  mcq({
    title: "NULL Macro Expansion",
    description:
      "In standard C, the NULL macro typically expands to which value?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Null Pointers",
    Option1: "An integer zero or ((void*)0)",
    Option2: "The literal character '0'",
    Option3: "A pointer to address 1",
    Option4: "An empty string literal",
    CorrectOption: 1,
  }),
  mcq({
    title: "Pointer to Pointer Meaning",
    description:
      "What does the declaration int **pp; describe in C?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Pointer to Pointer",
    Option1: "A pointer to a pointer to int",
    Option2: "A pointer to a two-dimensional int array",
    Option3: "An int stored twice in memory",
    Option4: "A function returning an int twice",
    CorrectOption: 1,
  }),
  mcq({
    title: "Function Pointer Syntax",
    description:
      "Which declaration creates a function pointer fp that can hold the address of a function int f(int, int)?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Function Pointers",
    Option1: "int (*fp)(int, int);",
    Option2: "int *fp(int, int);",
    Option3: "int fp*(int, int);",
    Option4: "(int *)fp(int, int);",
    CorrectOption: 1,
  }),
  mcq({
    title: "Pointer Arithmetic Step Size",
    description:
      "If p is a pointer to int (int *p), then the expression p + 1 advances p by how many bytes?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Pointer Arithmetic",
    Option1: "sizeof(int) bytes",
    Option2: "Exactly 1 byte",
    Option3: "8 bytes always",
    Option4: "0 bytes",
    CorrectOption: 1,
  }),
  mcq({
    title: "Dereferencing NULL Behavior",
    description:
      "What happens if you dereference a NULL pointer in a typical hosted C environment?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Null Pointers",
    Option1: "Undefined behavior, typically a segmentation fault",
    Option2: "It returns 0",
    Option3: "It returns the address 0x0",
    Option4: "It is well-defined and returns the previous stack value",
    CorrectOption: 1,
  }),
  mcq({
    title: "Address-of Operator Result",
    description:
      "What does the expression &x yield when x is an int variable?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Introduction to Pointers",
    Option1: "A pointer to x holding its memory address",
    Option2: "The value stored in x",
    Option3: "Twice the value of x",
    Option4: "An integer representing x's bit pattern",
    CorrectOption: 1,
  }),
  mcq({
    title: "Pointer Difference Value",
    description:
      "Given int arr[5]; int *p = arr + 2; what is the value of p - arr?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Pointer Arithmetic",
    Option1: "2 (the number of int elements between them)",
    Option2: "8 (bytes between them assuming 4-byte ints)",
    Option3: "0",
    Option4: "5",
    CorrectOption: 1,
  }),

  /* ─────────── MEDIUM (6) — all snippets ─────────── */
  mcq({
    title: "Dereference Output",
    description: "What does the following C snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Introduction to Pointers",
    Option1: "42",
    Option2: "An address",
    Option3: "0",
    Option4: "Undefined",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int x = 42;
    int *p = &x;
    printf("%d\\n", *p);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Array Element via Pointer",
    description: "What does the following C snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Pointer Arithmetic",
    Option1: "30",
    Option2: "20",
    Option3: "10",
    Option4: "An address",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int arr[] = {10, 20, 30};
    int *p = arr;
    printf("%d\\n", *(p + 2));
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Pointer to Pointer Output",
    description: "What does the following C snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Pointer to Pointer",
    Option1: "5",
    Option2: "An address",
    Option3: "0",
    Option4: "Undefined",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int x = 5;
    int *p = &x;
    int **pp = &p;
    printf("%d\\n", **pp);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Function Pointer Call Result",
    description: "What does the following C snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Function Pointers",
    Option1: "5",
    Option2: "6",
    Option3: "1",
    Option4: "Compilation error",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
static int add(int a, int b) { return a + b; }
int main(void) {
    int (*fp)(int, int) = add;
    printf("%d\\n", fp(2, 3));
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Pointer Swap Output",
    description: "What does the following C snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Introduction to Pointers",
    Option1: "7 3",
    Option2: "3 7",
    Option3: "7 7",
    Option4: "3 3",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int a = 3, b = 7;
    int *pa = &a, *pb = &b;
    int t = *pa;
    *pa = *pb;
    *pb = t;
    printf("%d %d\\n", a, b);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Pointer Summation Output",
    description: "What does the following C snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Pointers and Arrays",
    Option1: "15",
    Option2: "5",
    Option3: "10",
    Option4: "25",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int arr[] = {1, 2, 3, 4, 5};
    int *p = arr;
    int sum = 0;
    for (int i = 0; i < 5; i++) sum += *(p + i);
    printf("%d\\n", sum);
    return 0;
}
`,
    snippetLang: "c",
  }),

  /* ─────────── HARD (4) — all snippets ─────────── */
  mcq({
    title: "Pointer Loop Summation Output",
    description: "What does the following C snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Pointer Arithmetic",
    Option1: "15",
    Option2: "10",
    Option3: "5",
    Option4: "25",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int arr[] = {5, 4, 3, 2, 1};
    int *p = arr;
    int *end = arr + 5;
    int sum = 0;
    while (p < end) {
        sum += *p;
        p++;
    }
    printf("%d\\n", sum);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Pointer End-Swap Result",
    description: "What does the following C snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Pointers and Arrays",
    Option1: "50 10",
    Option2: "10 50",
    Option3: "50 50",
    Option4: "10 10",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int arr[] = {10, 20, 30, 40, 50};
    int *p = arr;
    int *q = arr + 4;
    int t = *p;
    *p = *q;
    *q = t;
    printf("%d %d\\n", arr[0], arr[4]);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Function Pointer Table Dispatch",
    description: "What does the following C snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Function Pointers",
    Option1: "6",
    Option2: "14",
    Option3: "40",
    Option4: "Compilation error",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
static int mul(int a, int b) { return a * b; }
static int sub(int a, int b) { return a - b; }
int main(void) {
    int (*ops[2])(int, int) = {mul, sub};
    printf("%d\\n", ops[1](10, 4));
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Double Indirection Write Through",
    description: "What does the following C snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Pointer to Pointer",
    Option1: "50",
    Option2: "100",
    Option3: "0",
    Option4: "Undefined",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int x = 100;
    int *p = &x;
    int **pp = &p;
    **pp = 50;
    printf("%d\\n", x);
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
