/**
 * Builder for Day 15 — "Dynamic Memory Allocation".
 * Emits:
 *   /home/z/my-project/scripts/c-programming/data/day-15.code.json  (20 code questions)
 *   /home/z/my-project/scripts/c-programming/data/day-15.mcq.json   (20 MCQ questions)
 *
 * Subtopics (exact strings from taxonomy.ts):
 *   malloc Function, calloc Function, realloc Function, free Function,
 *   Memory Leaks, Handling Large Data Structures
 *
 * Day-15 rules (per CONVENTIONS.md):
 *   - ALWAYS check malloc/calloc/realloc returns for NULL.
 *   - ALWAYS free(...) before return 0; to avoid leaks.
 *   - realloc uses a temp pointer (never assign back directly).
 *   - Heap bound: arrays <= 10^6 ints.
 */
import { writeFileSync } from "node:fs";

const DAY = 15;
const TOPIC = "Dynamic Memory Allocation";
const SUBTOPICS = [
  "malloc Function",
  "calloc Function",
  "realloc Function",
  "free Function",
  "Memory Leaks",
  "Handling Large Data Structures",
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
    title: "malloc Index Sequence Printer",
    description:
      "Read an integer n. Use malloc to allocate n integers, fill arr[i] = i for i in [0, n), print them space-separated on one line, then free the array.\n\nInput Format:\nA single line containing one integer n.\n\nOutput Format:\nThe integers 0 through n-1 separated by single spaces.\n\nConstraints:\n1 <= n <= 1000",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "malloc Function",
    sampleinput1: "3",
    sampleoutput1: "0 1 2",
    sampleinput2: "5",
    sampleoutput2: "0 1 2 3 4",
    input1: "1",
    output1: "0",
    input2: "10",
    output2: "0 1 2 3 4 5 6 7 8 9",
    input3: "4",
    output3: "0 1 2 3",
    inputconstrains: "1 <= n <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int *arr = malloc((size_t)n * sizeof(int));
    if (arr == NULL) return 1;
    for (int i = 0; i < n; i++) {
        arr[i] = i;
    }
    for (int i = 0; i < n; i++) {
        if (i) putchar(' ');
        printf("%d", arr[i]);
    }
    putchar('\\n');
    free(arr);
    return 0;
}
`,
  }),
  codeQ({
    title: "calloc Zero Sum Verifier",
    description:
      "Read an integer n. Use calloc to allocate n integers (which must all be zero), sum them, print the sum (which verifies calloc zero-initialized), then free.\n\nInput Format:\nA single line containing one integer n.\n\nOutput Format:\nThe integer sum of all calloc-initialized slots (always 0).\n\nConstraints:\n1 <= n <= 10000",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "calloc Function",
    sampleinput1: "5",
    sampleoutput1: "0",
    sampleinput2: "1",
    sampleoutput2: "0",
    input1: "10",
    output1: "0",
    input2: "100",
    output2: "0",
    input3: "3",
    output3: "0",
    inputconstrains: "1 <= n <= 10000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int *arr = calloc((size_t)n, sizeof(int));
    if (arr == NULL) return 1;
    long long sum = 0;
    for (int i = 0; i < n; i++) {
        sum += arr[i];
    }
    printf("%lld\\n", sum);
    free(arr);
    return 0;
}
`,
  }),
  codeQ({
    title: "realloc Fibonacci Extender",
    description:
      "Read an integer n (n >= 2). malloc an array of 2 integers and set arr[0]=1, arr[1]=2. Then realloc to n integers and fill arr[i] = arr[i-1] + arr[i-2] for i in [2, n). Print all n values space-separated, then free.\n\nInput Format:\nA single line containing one integer n.\n\nOutput Format:\nThe first n terms of the sequence 1, 2, 3, 5, 8, ... separated by single spaces.\n\nConstraints:\n2 <= n <= 50",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "realloc Function",
    sampleinput1: "5",
    sampleoutput1: "1 2 3 5 8",
    sampleinput2: "2",
    sampleoutput2: "1 2",
    input1: "3",
    output1: "1 2 3",
    input2: "7",
    output2: "1 2 3 5 8 13 21",
    input3: "10",
    output3: "1 2 3 5 8 13 21 34 55 89",
    inputconstrains: "2 <= n <= 50",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int *arr = malloc(2 * sizeof(int));
    if (arr == NULL) return 1;
    arr[0] = 1;
    arr[1] = 2;
    int *tmp = realloc(arr, (size_t)n * sizeof(int));
    if (tmp == NULL) { free(arr); return 1; }
    arr = tmp;
    for (int i = 2; i < n; i++) {
        arr[i] = arr[i - 1] + arr[i - 2];
    }
    for (int i = 0; i < n; i++) {
        if (i) putchar(' ');
        printf("%d", arr[i]);
    }
    putchar('\\n');
    free(arr);
    return 0;
}
`,
  }),
  codeQ({
    title: "malloc Free Sum Drill",
    description:
      "Read an integer n followed by n integers. Allocate an int array of size n via malloc, store the inputs, print their sum, then free the array before returning.\n\nInput Format:\nLine 1: integer n. Line 2: n space-separated integers.\n\nOutput Format:\nThe sum of the n integers.\n\nConstraints:\n1 <= n <= 1000, -10^9 <= each value <= 10^9",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "free Function",
    sampleinput1: "3\n1 2 3",
    sampleoutput1: "6",
    sampleinput2: "1\n5",
    sampleoutput2: "5",
    input1: "4\n10 20 30 40",
    output1: "100",
    input2: "2\n-1 -2",
    output2: "-3",
    input3: "5\n1 1 1 1 1",
    output3: "5",
    inputconstrains: "1 <= n <= 1000, -10^9 <= each value <= 10^9",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int *arr = malloc((size_t)n * sizeof(int));
    if (arr == NULL) return 1;
    long long sum = 0;
    for (int i = 0; i < n; i++) {
        if (scanf("%d", &arr[i]) != 1) { free(arr); return 0; }
        sum += arr[i];
    }
    printf("%lld\\n", sum);
    free(arr);
    return 0;
}
`,
  }),
  codeQ({
    title: "Sum of Squares Leak Free",
    description:
      "Read an integer n. malloc an array of n integers, fill arr[i] = i * i, print the sum of these squares, then free the array. The free call ensures no memory is leaked.\n\nInput Format:\nA single line containing one integer n.\n\nOutput Format:\nThe sum 0*0 + 1*1 + ... + (n-1)*(n-1).\n\nConstraints:\n1 <= n <= 1000",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Memory Leaks",
    sampleinput1: "3",
    sampleoutput1: "5",
    sampleinput2: "1",
    sampleoutput2: "0",
    input1: "4",
    output1: "14",
    input2: "10",
    output2: "285",
    input3: "2",
    output3: "1",
    inputconstrains: "1 <= n <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int *arr = malloc((size_t)n * sizeof(int));
    if (arr == NULL) return 1;
    long long sum = 0;
    for (int i = 0; i < n; i++) {
        arr[i] = i * i;
        sum += arr[i];
    }
    printf("%lld\\n", sum);
    free(arr);
    return 0;
}
`,
  }),
  codeQ({
    title: "Large Array Maximum Finder",
    description:
      "Read an integer n followed by n integers. Allocate n integers on the heap via malloc (large datasets need heap allocation), find and print the maximum value, then free.\n\nInput Format:\nLine 1: integer n. Line 2: n space-separated integers.\n\nOutput Format:\nThe maximum value among the n integers.\n\nConstraints:\n1 <= n <= 10^6, -10^9 <= each value <= 10^9",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Handling Large Data Structures",
    sampleinput1: "3\n4 9 2",
    sampleoutput1: "9",
    sampleinput2: "1\n-5",
    sampleoutput2: "-5",
    input1: "5\n1 2 3 4 5",
    output1: "5",
    input2: "3\n-10 -20 -30",
    output2: "-10",
    input3: "4\n100 50 200 75",
    output3: "200",
    inputconstrains: "1 <= n <= 10^6, -10^9 <= each value <= 10^9",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int *arr = malloc((size_t)n * sizeof(int));
    if (arr == NULL) return 1;
    for (int i = 0; i < n; i++) {
        if (scanf("%d", &arr[i]) != 1) { free(arr); return 0; }
    }
    int mx = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] > mx) mx = arr[i];
    }
    printf("%d\\n", mx);
    free(arr);
    return 0;
}
`,
  }),

  /* ─────────── EASY SCENARIO (4) ─────────── */
  codeQ({
    title: "Weather Sample Dynamic Allocator",
    description:
      "A weather station records n temperature samples. Allocate n integers via malloc to hold the samples, then print the integer average (sum divided by n, truncated toward zero), then free.\n\nInput Format:\nLine 1: integer n. Line 2: n space-separated integer temperatures.\n\nOutput Format:\nThe integer average of the n temperatures.\n\nConstraints:\n1 <= n <= 10000, -10^9 <= each temperature <= 10^9",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "malloc Function",
    sampleinput1: "3\n10 20 30",
    sampleoutput1: "20",
    sampleinput2: "4\n5 5 5 5",
    sampleoutput2: "5",
    input1: "1\n100",
    output1: "100",
    input2: "5\n1 2 3 4 5",
    output2: "3",
    input3: "2\n-10 10",
    output3: "0",
    inputconstrains: "1 <= n <= 10000, -10^9 <= each temperature <= 10^9",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int *samples = malloc((size_t)n * sizeof(int));
    if (samples == NULL) return 1;
    long long sum = 0;
    for (int i = 0; i < n; i++) {
        if (scanf("%d", &samples[i]) != 1) { free(samples); return 0; }
        sum += samples[i];
    }
    printf("%lld\\n", sum / n);
    free(samples);
    return 0;
}
`,
  }),
  codeQ({
    title: "Warehouse Zero Stock Counter",
    description:
      "A warehouse creates a stock table of n slots, all initialized to 0 via calloc. Count how many slots are zero to confirm the zero-initialization, print the count, then free.\n\nInput Format:\nA single line containing one integer n.\n\nOutput Format:\nThe number of zero-initialized slots (equal to n).\n\nConstraints:\n1 <= n <= 10000",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "calloc Function",
    sampleinput1: "5",
    sampleoutput1: "5",
    sampleinput2: "1",
    sampleoutput2: "1",
    input1: "10",
    output1: "10",
    input2: "100",
    output2: "100",
    input3: "3",
    output3: "3",
    inputconstrains: "1 <= n <= 10000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int *stock = calloc((size_t)n, sizeof(int));
    if (stock == NULL) return 1;
    int zeros = 0;
    for (int i = 0; i < n; i++) {
        if (stock[i] == 0) zeros++;
    }
    printf("%d\\n", zeros);
    free(stock);
    return 0;
}
`,
  }),
  codeQ({
    title: "Concert Seating Reallocator",
    description:
      "A concert ticketing system starts with 2 reserved seats valued at 10 and 20. Read an integer m (m >= 2). Use realloc to extend the seating to m seats, then fill seats 2..m-1 with seat[i] = seat[i-1] + 10. Print all seat values space-separated, then free.\n\nInput Format:\nA single line containing one integer m.\n\nOutput Format:\nm space-separated integers: 10, 20, 30, ..., up to 10*m.\n\nConstraints:\n2 <= m <= 100",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "realloc Function",
    sampleinput1: "5",
    sampleoutput1: "10 20 30 40 50",
    sampleinput2: "2",
    sampleoutput2: "10 20",
    input1: "3",
    output1: "10 20 30",
    input2: "7",
    output2: "10 20 30 40 50 60 70",
    input3: "10",
    output3: "10 20 30 40 50 60 70 80 90 100",
    inputconstrains: "2 <= m <= 100",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int m;
    if (scanf("%d", &m) != 1) return 0;
    int *seats = malloc(2 * sizeof(int));
    if (seats == NULL) return 1;
    seats[0] = 10;
    seats[1] = 20;
    int *tmp = realloc(seats, (size_t)m * sizeof(int));
    if (tmp == NULL) { free(seats); return 1; }
    seats = tmp;
    for (int i = 2; i < m; i++) {
        seats[i] = seats[i - 1] + 10;
    }
    for (int i = 0; i < m; i++) {
        if (i) putchar(' ');
        printf("%d", seats[i]);
    }
    putchar('\\n');
    free(seats);
    return 0;
}
`,
  }),
  codeQ({
    title: "Log Buffer Cleanup Reporter",
    description:
      "A logging system allocates a buffer of n+1 characters via malloc, fills positions 0..n-1 with the letters 'A', 'B', 'C', ... (capital letters), null-terminates at position n, prints the buffer string, then frees the buffer and prints the word \"freed\".\n\nInput Format:\nA single line containing one integer n.\n\nOutput Format:\nTwo lines: the buffer string, then the word \"freed\".\n\nConstraints:\n1 <= n <= 26",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "free Function",
    sampleinput1: "3",
    sampleoutput1: "ABC\nfreed",
    sampleinput2: "1",
    sampleoutput2: "A\nfreed",
    input1: "5",
    output1: "ABCDE\nfreed",
    input2: "2",
    output2: "AB\nfreed",
    input3: "26",
    output3: "ABCDEFGHIJKLMNOPQRSTUVWXYZ\nfreed",
    inputconstrains: "1 <= n <= 26",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    char *buf = malloc((size_t)(n + 1));
    if (buf == NULL) return 1;
    for (int i = 0; i < n; i++) {
        buf[i] = (char)('A' + i);
    }
    buf[n] = '\\0';
    printf("%s\\n", buf);
    free(buf);
    printf("freed\\n");
    return 0;
}
`,
  }),

  /* ─────────── MEDIUM SCENARIO (6) ─────────── */
  codeQ({
    title: "Shopping Cart Sum Max Reporter",
    description:
      "An online store reads n item prices into a dynamically-allocated cart via malloc. Compute both the total price (sum) and the highest single price (max), then print \"<sum> <max>\" on one line, then free the cart.\n\nInput Format:\nLine 1: integer n. Line 2: n space-separated integer prices.\n\nOutput Format:\nTwo space-separated integers: total price and maximum price.\n\nConstraints:\n1 <= n <= 10^5, 0 <= price <= 10^9",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "malloc Function",
    sampleinput1: "3\n10 20 30",
    sampleoutput1: "60 30",
    sampleinput2: "1\n5",
    sampleoutput2: "5 5",
    input1: "4\n100 50 200 75",
    output1: "425 200",
    input2: "2\n0 0",
    output2: "0 0",
    input3: "5\n1 2 3 4 5",
    output3: "15 5",
    inputconstrains: "1 <= n <= 10^5, 0 <= price <= 10^9",
    blacklist: "realloc, calloc, memset, memcpy",
    whitelist: "malloc(, free(",
    sourcecode: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int *cart = malloc((size_t)n * sizeof(int));
    if (cart == NULL) return 1;
    long long sum = 0;
    int mx = 0;
    for (int i = 0; i < n; i++) {
        if (scanf("%d", &cart[i]) != 1) { free(cart); return 0; }
        sum += cart[i];
        if (cart[i] > mx) mx = cart[i];
    }
    printf("%lld %d\\n", sum, mx);
    free(cart);
    return 0;
}
`,
  }),
  codeQ({
    title: "Student Marks Zero Init Average",
    description:
      "A teacher records n marks into a table allocated with calloc (so all slots start at 0). Then read n marks and add each to its slot. Print the integer average of the marks, then free the table.\n\nInput Format:\nLine 1: integer n. Line 2: n space-separated integer marks.\n\nOutput Format:\nThe integer average of the marks (sum / n).\n\nConstraints:\n1 <= n <= 10^5, 0 <= mark <= 100",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "calloc Function",
    sampleinput1: "3\n10 20 30",
    sampleoutput1: "20",
    sampleinput2: "1\n100",
    sampleoutput2: "100",
    input1: "4\n5 5 5 5",
    output1: "5",
    input2: "2\n0 0",
    output2: "0",
    input3: "5\n1 2 3 4 5",
    output3: "3",
    inputconstrains: "1 <= n <= 10^5, 0 <= mark <= 100",
    blacklist: "malloc, memset, memcpy",
    whitelist: "calloc(, free(",
    sourcecode: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int *marks = calloc((size_t)n, sizeof(int));
    if (marks == NULL) return 1;
    long long sum = 0;
    for (int i = 0; i < n; i++) {
        int v;
        if (scanf("%d", &v) != 1) { free(marks); return 0; }
        marks[i] += v;
        sum += marks[i];
    }
    printf("%lld\\n", sum / n);
    free(marks);
    return 0;
}
`,
  }),
  codeQ({
    title: "Sensor Buffer Capacity Doubler",
    description:
      "A sensor logger starts with a buffer of n integers initialized as arr[i] = i + 1. Then a new size m is requested. Use realloc to grow (or shrink) the buffer to m. For new positions i in [n, m), set arr[i] = arr[i-1] + 1. Print all m values space-separated, then free.\n\nInput Format:\nLine 1: two integers n and m.\n\nOutput Format:\nm space-separated integers 1, 2, ..., m.\n\nConstraints:\n1 <= n <= 1000, 1 <= m <= 1000",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "realloc Function",
    sampleinput1: "2 5",
    sampleoutput1: "1 2 3 4 5",
    sampleinput2: "3 3",
    sampleoutput2: "1 2 3",
    input1: "1 4",
    output1: "1 2 3 4",
    input2: "5 2",
    output2: "1 2",
    input3: "2 10",
    output3: "1 2 3 4 5 6 7 8 9 10",
    inputconstrains: "1 <= n <= 1000, 1 <= m <= 1000",
    blacklist: "calloc, memset, memcpy",
    whitelist: "realloc(, malloc(, free(",
    sourcecode: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    int *arr = malloc((size_t)n * sizeof(int));
    if (arr == NULL) return 1;
    for (int i = 0; i < n; i++) {
        arr[i] = i + 1;
    }
    int *tmp = realloc(arr, (size_t)m * sizeof(int));
    if (tmp == NULL) { free(arr); return 1; }
    arr = tmp;
    for (int i = n; i < m; i++) {
        if (i == 0) {
            arr[i] = 1;
        } else {
            arr[i] = arr[i - 1] + 1;
        }
    }
    for (int i = 0; i < m; i++) {
        if (i) putchar(' ');
        printf("%d", arr[i]);
    }
    putchar('\\n');
    free(arr);
    return 0;
}
`,
  }),
  codeQ({
    title: "Triple Buffer Cleanup Reporter",
    description:
      "An analytics tool allocates three separate buffers of sizes a, b, c via malloc. Fill buffer1 with i*i, buffer2 with i+1, buffer3 with i*2 (index i from 0). Print the three buffer sums space-separated, then free all three buffers in order.\n\nInput Format:\nA single line with three space-separated integers a b c.\n\nOutput Format:\nThree space-separated integers: sum1 sum2 sum3.\n\nConstraints:\n1 <= a, b, c <= 1000",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "free Function",
    sampleinput1: "2 3 4",
    sampleoutput1: "1 6 12",
    sampleinput2: "1 1 1",
    sampleoutput2: "0 1 0",
    input1: "3 2 3",
    output1: "5 3 6",
    input2: "5 1 2",
    output2: "30 1 2",
    input3: "2 2 2",
    output3: "1 3 2",
    inputconstrains: "1 <= a, b, c <= 1000",
    blacklist: "memcpy, memset, realloc",
    whitelist: "malloc(, free(",
    sourcecode: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int a, b, c;
    if (scanf("%d %d %d", &a, &b, &c) != 3) return 0;
    int *buf1 = malloc((size_t)a * sizeof(int));
    if (buf1 == NULL) return 1;
    int *buf2 = malloc((size_t)b * sizeof(int));
    if (buf2 == NULL) { free(buf1); return 1; }
    int *buf3 = malloc((size_t)c * sizeof(int));
    if (buf3 == NULL) { free(buf2); free(buf1); return 1; }
    long long s1 = 0, s2 = 0, s3 = 0;
    for (int i = 0; i < a; i++) { buf1[i] = i * i; s1 += buf1[i]; }
    for (int i = 0; i < b; i++) { buf2[i] = i + 1; s2 += buf2[i]; }
    for (int i = 0; i < c; i++) { buf3[i] = i * 2; s3 += buf3[i]; }
    printf("%lld %lld %lld\\n", s1, s2, s3);
    free(buf1);
    free(buf2);
    free(buf3);
    return 0;
}
`,
  }),
  codeQ({
    title: "Leak Safe Overflow Checker",
    description:
      "A leak-safe calculator reads n, mallocs an array of n integers, fills arr[i] = i + 1, then computes the sum. If the sum exceeds 100, print \"overflow\"; otherwise print the sum. Always free the array before returning.\n\nInput Format:\nA single line containing one integer n.\n\nOutput Format:\nThe integer sum if it is at most 100, otherwise the word \"overflow\".\n\nConstraints:\n1 <= n <= 1000",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Memory Leaks",
    sampleinput1: "5",
    sampleoutput1: "15",
    sampleinput2: "20",
    sampleoutput2: "overflow",
    input1: "10",
    output1: "55",
    input2: "15",
    output2: "overflow",
    input3: "1",
    output3: "1",
    inputconstrains: "1 <= n <= 1000",
    blacklist: "exit(, abort",
    whitelist: "malloc(, free(",
    sourcecode: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int *arr = malloc((size_t)n * sizeof(int));
    if (arr == NULL) return 1;
    long long sum = 0;
    for (int i = 0; i < n; i++) {
        arr[i] = i + 1;
        sum += arr[i];
    }
    if (sum > 100) {
        printf("overflow\\n");
    } else {
        printf("%lld\\n", sum);
    }
    free(arr);
    return 0;
}
`,
  }),
  codeQ({
    title: "Large Dataset Sum Min Max",
    description:
      "A data pipeline reads a large dataset of n integers (up to 10^6 values) via malloc. Compute the total, minimum and maximum values. Print \"<sum> <min> <max>\" on one line, then free.\n\nInput Format:\nLine 1: integer n. Line 2: n space-separated integers.\n\nOutput Format:\nThree space-separated integers: sum, min, max.\n\nConstraints:\n1 <= n <= 10^6, -10^9 <= each value <= 10^9",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Handling Large Data Structures",
    sampleinput1: "3\n10 20 30",
    sampleoutput1: "60 10 30",
    sampleinput2: "1\n-5",
    sampleoutput2: "-5 -5 -5",
    input1: "5\n1 2 3 4 5",
    output1: "15 1 5",
    input2: "4\n-10 5 -20 15",
    output2: "-10 -20 15",
    input3: "2\n100 200",
    output3: "300 100 200",
    inputconstrains: "1 <= n <= 10^6, -10^9 <= each value <= 10^9",
    blacklist: "qsort, calloc, memcpy, memset",
    whitelist: "malloc(, free(",
    sourcecode: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int *data = malloc((size_t)n * sizeof(int));
    if (data == NULL) return 1;
    for (int i = 0; i < n; i++) {
        if (scanf("%d", &data[i]) != 1) { free(data); return 0; }
    }
    long long sum = data[0];
    int mn = data[0], mx = data[0];
    for (int i = 1; i < n; i++) {
        sum += data[i];
        if (data[i] < mn) mn = data[i];
        if (data[i] > mx) mx = data[i];
    }
    printf("%lld %d %d\\n", sum, mn, mx);
    free(data);
    return 0;
}
`,
  }),

  /* ─────────── HARD SCENARIO (4) ─────────── */
  codeQ({
    title: "Dynamic Matrix Transpose Allocator",
    description:
      "A linear-algebra tool reads an r x c matrix into a dynamically-allocated 2D array (an array of int* pointers, each row malloc'd separately). Compute and print the transpose as a c x r matrix (c rows, r columns per row). Free every row and both pointer arrays before returning.\n\nInput Format:\nLine 1: two integers r and c. Next r lines: c space-separated integers each.\n\nOutput Format:\nc lines, each with r space-separated integers representing the transpose.\n\nConstraints:\n1 <= r, c <= 100, -10^9 <= each value <= 10^9",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "malloc Function",
    sampleinput1: "2 3\n1 2 3\n4 5 6",
    sampleoutput1: "1 4\n2 5\n3 6",
    sampleinput2: "1 1\n5",
    sampleoutput2: "5",
    input1: "3 2\n1 2\n3 4\n5 6",
    output1: "1 3 5\n2 4 6",
    input2: "2 2\n1 2\n3 4",
    output2: "1 3\n2 4",
    input3: "3 3\n1 2 3\n4 5 6\n7 8 9",
    output3: "1 4 7\n2 5 8\n3 6 9",
    inputconstrains: "1 <= r, c <= 100, -10^9 <= each value <= 10^9",
    blacklist: "memcpy, memset, calloc",
    whitelist: "malloc(, free(",
    sourcecode: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int r, c;
    if (scanf("%d %d", &r, &c) != 2) return 0;
    int **mat = malloc((size_t)r * sizeof(int *));
    if (mat == NULL) return 1;
    for (int i = 0; i < r; i++) {
        mat[i] = malloc((size_t)c * sizeof(int));
        if (mat[i] == NULL) {
            for (int k = 0; k < i; k++) free(mat[k]);
            free(mat);
            return 1;
        }
        for (int j = 0; j < c; j++) {
            if (scanf("%d", &mat[i][j]) != 1) {
                for (int k = 0; k <= i; k++) free(mat[k]);
                free(mat);
                return 0;
            }
        }
    }
    int **t = malloc((size_t)c * sizeof(int *));
    if (t == NULL) {
        for (int i = 0; i < r; i++) free(mat[i]);
        free(mat);
        return 1;
    }
    for (int i = 0; i < c; i++) {
        t[i] = malloc((size_t)r * sizeof(int));
        if (t[i] == NULL) {
            for (int k = 0; k < i; k++) free(t[k]);
            free(t);
            for (int j = 0; j < r; j++) free(mat[j]);
            free(mat);
            return 1;
        }
        for (int j = 0; j < r; j++) {
            t[i][j] = mat[j][i];
        }
    }
    for (int i = 0; i < c; i++) {
        for (int j = 0; j < r; j++) {
            if (j) putchar(' ');
            printf("%d", t[i][j]);
        }
        putchar('\\n');
    }
    for (int i = 0; i < c; i++) free(t[i]);
    free(t);
    for (int i = 0; i < r; i++) free(mat[i]);
    free(mat);
    return 0;
}
`,
  }),
  codeQ({
    title: "Growing Stack Realloc Doubler",
    description:
      "A stack machine starts with capacity 1 (malloc'd). For each of n pushed values, if the stack is full, double the capacity via realloc (using a temp pointer). After pushing all n values, print the stack contents from bottom to top space-separated, then free.\n\nInput Format:\nLine 1: integer n. Line 2: n space-separated integers to push in order.\n\nOutput Format:\nn space-separated integers representing the stack from bottom to top.\n\nConstraints:\n1 <= n <= 10^5, -10^9 <= each value <= 10^9",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "realloc Function",
    sampleinput1: "3\n5 10 15",
    sampleoutput1: "5 10 15",
    sampleinput2: "1\n7",
    sampleoutput2: "7",
    input1: "5\n1 2 3 4 5",
    output1: "1 2 3 4 5",
    input2: "2\n100 200",
    output2: "100 200",
    input3: "4\n-1 -2 -3 -4",
    output3: "-1 -2 -3 -4",
    inputconstrains: "1 <= n <= 10^5, -10^9 <= each value <= 10^9",
    blacklist: "calloc, memcpy, memset",
    whitelist: "realloc(, malloc(, free(",
    sourcecode: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int cap = 1;
    int size = 0;
    int *stack = malloc((size_t)cap * sizeof(int));
    if (stack == NULL) return 1;
    for (int i = 0; i < n; i++) {
        int v;
        if (scanf("%d", &v) != 1) { free(stack); return 0; }
        if (size == cap) {
            int newcap = cap * 2;
            int *tmp = realloc(stack, (size_t)newcap * sizeof(int));
            if (tmp == NULL) { free(stack); return 1; }
            stack = tmp;
            cap = newcap;
        }
        stack[size++] = v;
    }
    for (int i = 0; i < size; i++) {
        if (i) putchar(' ');
        printf("%d", stack[i]);
    }
    putchar('\\n');
    free(stack);
    return 0;
}
`,
  }),
  codeQ({
    title: "Two Buffer Leak Free Pipeline",
    description:
      "A two-stage pipeline reads n. Stage 1: malloc buf1 of n integers, fill buf1[i] = i + 1, compute sum1 = sum of buf1. Stage 2: malloc buf2 of n integers, fill buf2[i] = sum1 - buf1[i], compute sum2 = sum of buf2. Free buf1, then free buf2. Print \"<sum1> <sum2>\" on one line.\n\nInput Format:\nA single line containing one integer n.\n\nOutput Format:\nTwo space-separated integers: sum1 and sum2.\n\nConstraints:\n1 <= n <= 10^6",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Memory Leaks",
    sampleinput1: "3",
    sampleoutput1: "6 12",
    sampleinput2: "1",
    sampleoutput2: "1 0",
    input1: "5",
    output1: "15 60",
    input2: "10",
    output2: "55 495",
    input3: "2",
    output3: "3 3",
    inputconstrains: "1 <= n <= 10^6",
    blacklist: "memcpy, memset, calloc, realloc",
    whitelist: "malloc(, free(",
    sourcecode: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int *buf1 = malloc((size_t)n * sizeof(int));
    if (buf1 == NULL) return 1;
    long long sum1 = 0;
    for (int i = 0; i < n; i++) {
        buf1[i] = i + 1;
        sum1 += buf1[i];
    }
    int *buf2 = malloc((size_t)n * sizeof(int));
    if (buf2 == NULL) { free(buf1); return 1; }
    long long sum2 = 0;
    for (int i = 0; i < n; i++) {
        buf2[i] = sum1 - buf1[i];
        sum2 += buf2[i];
    }
    free(buf1);
    printf("%lld %lld\\n", sum1, sum2);
    free(buf2);
    return 0;
}
`,
  }),
  codeQ({
    title: "Large Frequency Mode Counter",
    description:
      "A polling system reads n votes where each vote is an integer in [0, 100]. Use calloc to allocate a frequency table of 101 integers (all zero). Count occurrences. Print the value with the highest frequency (lowest value if there is a tie), then free the table.\n\nInput Format:\nLine 1: integer n. Line 2: n space-separated integers in [0, 100].\n\nOutput Format:\nThe value in [0, 100] with the highest frequency (ties broken by lowest value).\n\nConstraints:\n1 <= n <= 10^6, 0 <= vote <= 100",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Handling Large Data Structures",
    sampleinput1: "5\n1 2 1 3 1",
    sampleoutput1: "1",
    sampleinput2: "3\n5 5 10",
    sampleoutput2: "5",
    input1: "4\n10 20 20 30",
    output1: "20",
    input2: "6\n0 1 2 0 1 0",
    output2: "0",
    input3: "1\n50",
    output3: "50",
    inputconstrains: "1 <= n <= 10^6, 0 <= vote <= 100",
    blacklist: "qsort, memcpy, memset, malloc",
    whitelist: "calloc(, free(",
    sourcecode: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int *freq = calloc(101, sizeof(int));
    if (freq == NULL) return 1;
    for (int i = 0; i < n; i++) {
        int v;
        if (scanf("%d", &v) != 1) { free(freq); return 0; }
        if (v >= 0 && v <= 100) freq[v]++;
    }
    int best_val = 0;
    int best_count = freq[0];
    for (int v = 1; v <= 100; v++) {
        if (freq[v] > best_count) {
            best_count = freq[v];
            best_val = v;
        }
    }
    printf("%d\\n", best_val);
    free(freq);
    return 0;
}
`,
  }),
];

/* ────────────────────────────── MCQ QUESTIONS ────────────────────────────── */
const mcqs = [
  /* ─────────── EASY (10) ─────────── */
  mcq({
    title: "malloc Return Type",
    description:
      "What does malloc(size_t n) return on success?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "malloc Function",
    Option1: "A void * pointer to n bytes of uninitialized memory",
    Option2: "A void * pointer to n bytes of zero-initialized memory",
    Option3: "A null pointer always",
    Option4: "An integer representing the allocated size",
    CorrectOption: 1,
  }),
  mcq({
    title: "calloc vs malloc Difference",
    description:
      "How does calloc differ from malloc?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "calloc Function",
    Option1: "calloc takes a count and a size, and zero-initializes the allocated memory",
    Option2: "calloc allocates memory only on the stack",
    Option3: "calloc is faster but does not actually allocate memory",
    Option4: "There is no difference; they are aliases for the same function",
    CorrectOption: 1,
  }),
  mcq({
    title: "realloc Purpose",
    description:
      "What is the purpose of realloc(ptr, new_size)?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "realloc Function",
    Option1: "Resize a previously allocated block, possibly moving it to a new location",
    Option2: "Free a previously allocated block",
    Option3: "Allocate a brand new block without regard to ptr",
    Option4: "Copy bytes from one block to another",
    CorrectOption: 1,
  }),
  mcq({
    title: "free Function Behavior",
    description:
      "What does free(ptr) do when ptr was returned by a successful malloc?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "free Function",
    Option1: "Deallocates the memory block pointed to by ptr so it can be reused",
    Option2: "Sets ptr itself to NULL",
    Option3: "Fills the memory block with zeros",
    Option4: "Returns the number of bytes freed",
    CorrectOption: 1,
  }),
  mcq({
    title: "Memory Leak Definition",
    description:
      "What is a memory leak in C?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Memory Leaks",
    Option1: "Allocated memory that is no longer reachable by the program but has not been freed",
    Option2: "A pointer that is set to NULL after being freed",
    Option3: "An array that is allocated on the stack instead of the heap",
    Option4: "A compiler warning about unused variables",
    CorrectOption: 1,
  }),
  mcq({
    title: "Why Dynamic Allocation",
    description:
      "Why use dynamic memory allocation for large data structures in C?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Handling Large Data Structures",
    Option1: "It allows array sizes to be determined at runtime and avoids fixed stack-size limits",
    Option2: "Dynamic memory is always faster than stack memory",
    Option3: "Stack memory cannot hold integers",
    Option4: "Dynamic memory is required to use pointers at all",
    CorrectOption: 1,
  }),
  mcq({
    title: "Required Header for malloc",
    description:
      "Which standard header must be included to use malloc, calloc, realloc, and free?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "malloc Function",
    Option1: "<stdlib.h>",
    Option2: "<stdio.h>",
    Option3: "<string.h>",
    Option4: "<memory.h>",
    CorrectOption: 1,
  }),
  mcq({
    title: "calloc Argument Count",
    description:
      "How many arguments does calloc take?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "calloc Function",
    Option1: "Two: a count of elements and the size of each element",
    Option2: "One: the total number of bytes to allocate",
    Option3: "Three: count, size, and an initial value",
    Option4: "Zero: it takes no arguments",
    CorrectOption: 1,
  }),
  mcq({
    title: "realloc NULL Behavior",
    description:
      "What does realloc(NULL, n) do?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "realloc Function",
    Option1: "Behaves like malloc(n), allocating a new block of n bytes",
    Option2: "Returns NULL without allocating anything",
    Option3: "Causes undefined behavior",
    Option4: "Behaves like calloc(1, n)",
    CorrectOption: 1,
  }),
  mcq({
    title: "free NULL Safety",
    description:
      "What happens if you call free(NULL)?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "free Function",
    Option1: "It is a safe no-op and does nothing",
    Option2: "It causes a segmentation fault",
    Option3: "It causes undefined behavior",
    Option4: "It allocates one byte of memory",
    CorrectOption: 1,
  }),

  /* ─────────── MEDIUM (6) — all snippets ─────────── */
  mcq({
    title: "malloc Sum Output Snippet",
    description: "What does the following C snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "malloc Function",
    Option1: "60",
    Option2: "0",
    Option3: "30",
    Option4: "Compilation error",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
#include <stdlib.h>
int main(void) {
    int *p = malloc(3 * sizeof(int));
    if (p == NULL) return 1;
    p[0] = 10; p[1] = 20; p[2] = 30;
    printf("%d\\n", p[0] + p[1] + p[2]);
    free(p);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "calloc Zero Sum Snippet",
    description: "What does the following C snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "calloc Function",
    Option1: "0",
    Option2: "5",
    Option3: "20",
    Option4: "Compilation error",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
#include <stdlib.h>
int main(void) {
    int *p = calloc(5, sizeof(int));
    if (p == NULL) return 1;
    int s = 0;
    for (int i = 0; i < 5; i++) s += p[i];
    printf("%d\\n", s);
    free(p);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "realloc Extend Sum Snippet",
    description: "What does the following C snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "realloc Function",
    Option1: "50",
    Option2: "30",
    Option3: "0",
    Option4: "Compilation error",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
#include <stdlib.h>
int main(void) {
    int *p = malloc(2 * sizeof(int));
    if (p == NULL) return 1;
    p[0] = 5; p[1] = 10;
    int *tmp = realloc(p, 4 * sizeof(int));
    if (tmp == NULL) { free(p); return 1; }
    p = tmp;
    p[2] = 15; p[3] = 20;
    printf("%d\\n", p[0] + p[1] + p[2] + p[3]);
    free(p);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Memory Leak Reassign Snippet",
    description:
      "What does the following snippet print, and what additional problem occurs?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Memory Leaks",
    Option1: "Prints 2; the original p block is leaked (no longer reachable but not freed)",
    Option2: "Prints 1; the original q block is leaked",
    Option3: "Prints 2; no leak occurs",
    Option4: "Compilation error",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
#include <stdlib.h>
int main(void) {
    int *p = malloc(4 * sizeof(int));
    int *q = malloc(2 * sizeof(int));
    if (p == NULL || q == NULL) return 1;
    p[0] = 1; q[0] = 2;
    p = q;
    printf("%d\\n", p[0]);
    free(q);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Deref After malloc Snippet",
    description: "What does the following C snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "free Function",
    Option1: "42",
    Option2: "0",
    Option3: "Undefined value",
    Option4: "Compilation error",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
#include <stdlib.h>
int main(void) {
    int *p = malloc(sizeof(int));
    if (p == NULL) return 1;
    *p = 42;
    printf("%d\\n", *p);
    free(p);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Pointer Copy Traverse Snippet",
    description: "What does the following C snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Handling Large Data Structures",
    Option1: "100 200 300",
    Option2: "100 0 0",
    Option3: "0 0 0",
    Option4: "Compilation error",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
#include <stdlib.h>
int main(void) {
    int *p = malloc(3 * sizeof(int));
    if (p == NULL) return 1;
    p[0] = 100; p[1] = 200; p[2] = 300;
    int *q = p;
    printf("%d %d %d\\n", q[0], q[1], q[2]);
    free(p);
    return 0;
}
`,
    snippetLang: "c",
  }),

  /* ─────────── HARD (4) — all snippets ─────────── */
  mcq({
    title: "realloc Temp Pointer Snippet",
    description: "What does the following C snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "realloc Function",
    Option1: "1 2 3 5",
    Option2: "1 2 3 4",
    Option3: "0 0 3 5",
    Option4: "Compilation error",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
#include <stdlib.h>
int main(void) {
    int *p = malloc(2 * sizeof(int));
    if (p == NULL) return 1;
    p[0] = 1; p[1] = 2;
    int *tmp = realloc(p, 4 * sizeof(int));
    if (tmp == NULL) { free(p); return 1; }
    p = tmp;
    p[2] = p[0] + p[1];
    p[3] = p[2] + p[1];
    printf("%d %d %d %d\\n", p[0], p[1], p[2], p[3]);
    free(p);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Dangling Pointer Reset Snippet",
    description: "What does the following C snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Memory Leaks",
    Option1: "NULL",
    Option2: "99",
    Option3: "0",
    Option4: "Compilation error",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
#include <stdlib.h>
int main(void) {
    int *p = malloc(sizeof(int));
    if (p == NULL) return 1;
    *p = 99;
    free(p);
    p = NULL;
    if (p == NULL) {
        printf("NULL\\n");
    } else {
        printf("%d\\n", *p);
    }
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Double Free Behavior Snippet",
    description:
      "What is the behavior of the following snippet, which calls free on the same pointer twice without resetting it?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "free Function",
    Option1: "Undefined behavior (often crashes the program)",
    Option2: "Prints done",
    Option3: "Prints 5",
    Option4: "Compilation error",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
#include <stdlib.h>
int main(void) {
    int *p = malloc(sizeof(int));
    if (p == NULL) return 1;
    *p = 5;
    free(p);
    free(p);
    printf("done\\n");
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Array Sum After Free Snippet",
    description: "What does the following C snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Handling Large Data Structures",
    Option1: "100",
    Option2: "0",
    Option3: "40",
    Option4: "Compilation error",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
#include <stdlib.h>
int main(void) {
    int n = 4;
    int *p = malloc((size_t)n * sizeof(int));
    if (p == NULL) return 1;
    for (int i = 0; i < n; i++) p[i] = (i + 1) * 10;
    int s = 0;
    for (int i = 0; i < n; i++) s += p[i];
    free(p);
    printf("%d\\n", s);
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
