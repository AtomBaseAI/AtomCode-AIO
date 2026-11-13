/**
 * Builder for Day 7 — "1D Arrays".
 * Emits:
 *   /home/z/my-project/scripts/c-programming/data/day-07.code.json  (20 code questions)
 *   /home/z/my-project/scripts/c-programming/data/day-07.mcq.json   (20 MCQ questions)
 */
import { writeFileSync } from "node:fs";

const DAY = 7;
const TOPIC = "1D Arrays";
const SUBTOPICS = [
  "Array Declaration and Initialization",
  "Array Traversal",
  "Array Input and Output",
  "Aggregation Sum Min Max",
  "Searching in Arrays",
  "Array Reversal and Rotation",
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
    title: "Array Echo Space Separated Drill",
    description: `Read an integer N followed by N integers, store them in an array, and print them back on one line space-separated.

Input Format:
First line: integer N. Second line: N space-separated integers.

Output Format:
A single line containing N space-separated integers.

Constraints:
1 <= N <= 1000, -1000000 <= arr[i] <= 1000000`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Array Declaration and Initialization",
    sampleinput1: "5\n10 20 30 40 50",
    sampleoutput1: "10 20 30 40 50",
    sampleinput2: "3\n-1 0 1",
    sampleoutput2: "-1 0 1",
    input1: "1\n7",
    output1: "7",
    input2: "4\n1 2 3 4",
    output2: "1 2 3 4",
    input3: "2\n100 -100",
    output3: "100 -100",
    inputconstrains: "1 <= N <= 1000, -1000000 <= arr[i] <= 1000000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    int arr[1000];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    for (int i = 0; i < n; i++) {
        if (i > 0) printf(" ");
        printf("%d", arr[i]);
    }
    printf("\\n");
    return 0;
}
`,
  }),
  codeQ({
    title: "Array Forward Traversal Drill",
    description: `Read an integer N followed by N integers and print each integer on its own line by traversing the array forward.

Input Format:
First line: integer N. Second line: N space-separated integers.

Output Format:
N lines, each containing one integer.

Constraints:
1 <= N <= 1000, -1000000 <= arr[i] <= 1000000`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Array Traversal",
    sampleinput1: "4\n10 20 30 40",
    sampleoutput1: "10\n20\n30\n40",
    sampleinput2: "2\n-5 7",
    sampleoutput2: "-5\n7",
    input1: "1\n42",
    output1: "42",
    input2: "3\n1 2 3",
    output2: "1\n2\n3",
    input3: "5\n5 4 3 2 1",
    output3: "5\n4\n3\n2\n1",
    inputconstrains: "1 <= N <= 1000, -1000000 <= arr[i] <= 1000000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    int arr[1000];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    for (int i = 0; i < n; i++) printf("%d\\n", arr[i]);
    return 0;
}
`,
  }),
  codeQ({
    title: "Array Sum Aggregation Drill",
    description: `Read an integer N followed by N integers and print their sum.

Input Format:
First line: integer N. Second line: N space-separated integers.

Output Format:
Print the sum as a single integer on its own line.

Constraints:
1 <= N <= 1000, -1000000 <= arr[i] <= 1000000`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Aggregation Sum Min Max",
    sampleinput1: "4\n10 20 30 40",
    sampleoutput1: "100",
    sampleinput2: "3\n-5 0 5",
    sampleoutput2: "0",
    input1: "1\n7",
    output1: "7",
    input2: "5\n1 2 3 4 5",
    output2: "15",
    input3: "2\n-100 100",
    output3: "0",
    inputconstrains: "1 <= N <= 1000, -1000000 <= arr[i] <= 1000000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    int arr[1000];
    long long sum = 0;
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
        sum += arr[i];
    }
    printf("%lld\\n", sum);
    return 0;
}
`,
  }),
  codeQ({
    title: "Array Min and Max Drill",
    description: `Read an integer N followed by N integers and print the minimum value on the first line and the maximum value on the second line.

Input Format:
First line: integer N. Second line: N space-separated integers.

Output Format:
Two lines: first the minimum, then the maximum.

Constraints:
1 <= N <= 1000, -1000000 <= arr[i] <= 1000000`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Aggregation Sum Min Max",
    sampleinput1: "5\n3 7 1 9 4",
    sampleoutput1: "1\n9",
    sampleinput2: "1\n42",
    sampleoutput2: "42\n42",
    input1: "3\n-5 -10 -3",
    output1: "-10\n-3",
    input2: "4\n2 2 2 2",
    output2: "2\n2",
    input3: "6\n0 -1 5 -3 8 2",
    output3: "-3\n8",
    inputconstrains: "1 <= N <= 1000, -1000000 <= arr[i] <= 1000000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    int arr[1000];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    int mn = arr[0], mx = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] < mn) mn = arr[i];
        if (arr[i] > mx) mx = arr[i];
    }
    printf("%d\\n", mn);
    printf("%d\\n", mx);
    return 0;
}
`,
  }),
  codeQ({
    title: "Linear Search First Index Drill",
    description: `Read an integer N, then N integers, then a target value. Print the 0-based index of the first occurrence of the target, or -1 if not found.

Input Format:
First line: integer N. Second line: N space-separated integers. Third line: target integer.

Output Format:
A single integer index, or -1.

Constraints:
1 <= N <= 1000, -1000000 <= arr[i] <= 1000000`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Searching in Arrays",
    sampleinput1: "5\n10 20 30 40 50\n30",
    sampleoutput1: "2",
    sampleinput2: "4\n1 2 3 4\n5",
    sampleoutput2: "-1",
    input1: "1\n7\n7",
    output1: "0",
    input2: "6\n5 5 5 5 5 5\n5",
    output2: "0",
    input3: "3\n-1 -2 -3\n-2",
    output3: "1",
    inputconstrains: "1 <= N <= 1000, -1000000 <= arr[i] <= 1000000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n, target;
    scanf("%d", &n);
    int arr[1000];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    scanf("%d", &target);
    int idx = -1;
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) { idx = i; break; }
    }
    printf("%d\\n", idx);
    return 0;
}
`,
  }),
  codeQ({
    title: "Array Reversal Print Drill",
    description: `Read an integer N followed by N integers and print them in reverse order, space-separated, on a single line.

Input Format:
First line: integer N. Second line: N space-separated integers.

Output Format:
A single line containing N space-separated integers in reverse order.

Constraints:
1 <= N <= 1000, -1000000 <= arr[i] <= 1000000`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Array Reversal and Rotation",
    sampleinput1: "5\n1 2 3 4 5",
    sampleoutput1: "5 4 3 2 1",
    sampleinput2: "3\n10 20 30",
    sampleoutput2: "30 20 10",
    input1: "1\n7",
    output1: "7",
    input2: "2\n-5 5",
    output2: "5 -5",
    input3: "4\n0 1 0 1",
    output3: "1 0 1 0",
    inputconstrains: "1 <= N <= 1000, -1000000 <= arr[i] <= 1000000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    int arr[1000];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    for (int i = n - 1; i >= 0; i--) {
        if (i < n - 1) printf(" ");
        printf("%d", arr[i]);
    }
    printf("\\n");
    return 0;
}
`,
  }),

  // ── EASY SCENARIO (4) ──────────────────────────────────────────────────────
  codeQ({
    title: "Classroom Marks Entry Reporter",
    description: `A teacher enters the marks of all students in a class. The system stores them in an array and prints them back prefixed with "Class marks:" so the teacher can verify the entry.

Input Format:
First line: integer N (number of students). Second line: N space-separated integer marks.

Output Format:
A single line starting with "Class marks:" followed by the marks space-separated.

Constraints:
1 <= N <= 1000, 0 <= mark <= 100`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Array Input and Output",
    sampleinput1: "5\n80 75 90 65 88",
    sampleoutput1: "Class marks: 80 75 90 65 88",
    sampleinput2: "3\n100 50 75",
    sampleoutput2: "Class marks: 100 50 75",
    input1: "1\n42",
    output1: "Class marks: 42",
    input2: "4\n60 70 80 90",
    output2: "Class marks: 60 70 80 90",
    input3: "2\n0 100",
    output3: "Class marks: 0 100",
    inputconstrains: "1 <= N <= 1000, 0 <= mark <= 100",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    int marks[1000];
    for (int i = 0; i < n; i++) scanf("%d", &marks[i]);
    printf("Class marks:");
    for (int i = 0; i < n; i++) printf(" %d", marks[i]);
    printf("\\n");
    return 0;
}
`,
  }),
  codeQ({
    title: "Sensor Reading Sum and Average",
    description: `A weather station records N temperature readings. Compute and print the total sum on the first line and the average on the second line (two decimal places).

Input Format:
First line: integer N. Second line: N space-separated integer readings.

Output Format:
Two lines: first the sum (integer), then the average (2 decimal places).

Constraints:
1 <= N <= 1000, -1000 <= reading <= 1000`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Aggregation Sum Min Max",
    sampleinput1: "4\n10 20 30 40",
    sampleoutput1: "100\n25.00",
    sampleinput2: "3\n-5 0 5",
    sampleoutput2: "0\n0.00",
    input1: "1\n7",
    output1: "7\n7.00",
    input2: "5\n1 2 3 4 5",
    output2: "15\n3.00",
    input3: "2\n10 20",
    output3: "30\n15.00",
    inputconstrains: "1 <= N <= 1000, -1000 <= reading <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    int arr[1000];
    long long sum = 0;
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
        sum += arr[i];
    }
    double avg = (double) sum / n;
    printf("%lld\\n", sum);
    printf("%.2f\\n", avg);
    return 0;
}
`,
  }),
  codeQ({
    title: "Inventory Stock Code Lookup",
    description: `A warehouse stores N product codes in an array. A clerk searches for a target code; print 1 if it is present, 0 otherwise.

Input Format:
First line: integer N. Second line: N space-separated integer product codes. Third line: target code.

Output Format:
A single integer 1 (found) or 0 (not found).

Constraints:
1 <= N <= 1000, 1 <= code <= 1000000`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Searching in Arrays",
    sampleinput1: "5\n101 203 305 407 509\n305",
    sampleoutput1: "1",
    sampleinput2: "4\n10 20 30 40\n99",
    sampleoutput2: "0",
    input1: "1\n7\n7",
    output1: "1",
    input2: "3\n1 2 3\n4",
    output2: "0",
    input3: "6\n5 5 5 5 5 5\n5",
    output3: "1",
    inputconstrains: "1 <= N <= 1000, 1 <= code <= 1000000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n, target;
    scanf("%d", &n);
    int arr[1000];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    scanf("%d", &target);
    int found = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) { found = 1; break; }
    }
    printf("%d\\n", found);
    return 0;
}
`,
  }),
  codeQ({
    title: "Customer Queue Reverse Service",
    description: `A service counter serves customers in the reverse order of arrival. Read the queue of customer IDs and print "Serving: ID" for each customer in reverse order, one per line.

Input Format:
First line: integer N. Second line: N space-separated integer customer IDs.

Output Format:
N lines, each of the form "Serving: ID" in reverse arrival order.

Constraints:
1 <= N <= 1000, 1 <= id <= 1000000`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Array Reversal and Rotation",
    sampleinput1: "4\n101 202 303 404",
    sampleoutput1: "Serving: 404\nServing: 303\nServing: 202\nServing: 101",
    sampleinput2: "2\n11 22",
    sampleoutput2: "Serving: 22\nServing: 11",
    input1: "1\n7",
    output1: "Serving: 7",
    input2: "3\n1 2 3",
    output2: "Serving: 3\nServing: 2\nServing: 1",
    input3: "5\n5 4 3 2 1",
    output3: "Serving: 1\nServing: 2\nServing: 3\nServing: 4\nServing: 5",
    inputconstrains: "1 <= N <= 1000, 1 <= id <= 1000000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    int q[1000];
    for (int i = 0; i < n; i++) scanf("%d", &q[i]);
    for (int i = n - 1; i >= 0; i--) {
        printf("Serving: %d\\n", q[i]);
    }
    return 0;
}
`,
  }),

  // ── MEDIUM (6) ─────────────────────────────────────────────────────────────
  codeQ({
    title: "Bank Running Balance Reporter",
    description: `A bank records N transactions where positive values are deposits and negative values are withdrawals. Traverse the transaction array and print the running balance after each transaction, one balance per line.

Input Format:
First line: integer N. Second line: N space-separated integer transactions.

Output Format:
N lines, each containing the running balance after that transaction.

Constraints:
1 <= N <= 1000, -1000000 <= transaction <= 1000000, final balance fits in a 64-bit signed integer`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Array Traversal",
    sampleinput1: "4\n100 -50 200 -30",
    sampleoutput1: "100\n50\n250\n220",
    sampleinput2: "3\n-10 -20 -30",
    sampleoutput2: "-10\n-30\n-60",
    input1: "1\n500",
    output1: "500",
    input2: "5\n1 2 3 4 5",
    output2: "1\n3\n6\n10\n15",
    input3: "2\n-100 100",
    output3: "-100\n0",
    inputconstrains: "1 <= N <= 1000, -1000000 <= transaction <= 1000000",
    blacklist: "memcpy, memmove",
    whitelist: "for (",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    int txns[1000];
    for (int i = 0; i < n; i++) scanf("%d", &txns[i]);
    long long bal = 0;
    for (int i = 0; i < n; i++) {
        bal += txns[i];
        printf("%lld\\n", bal);
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Library Duplicate Book Finder",
    description: `A library shelf may contain duplicate copies of the same book ID. The librarian searches for a target ID and prints every 0-based index at which it occurs, space-separated on one line. If no copies exist, print -1.

Input Format:
First line: integer N. Second line: N space-separated integer book IDs. Third line: target ID.

Output Format:
A single line with indices space-separated, or -1 if none.

Constraints:
1 <= N <= 1000, 1 <= id <= 1000000`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Searching in Arrays",
    sampleinput1: "7\n1 2 3 2 4 2 5\n2",
    sampleoutput1: "1 3 5",
    sampleinput2: "4\n10 20 30 40\n99",
    sampleoutput2: "-1",
    input1: "1\n7\n7",
    output1: "0",
    input2: "5\n5 5 5 5 5\n5",
    output2: "0 1 2 3 4",
    input3: "3\n1 2 3\n2",
    output3: "1",
    inputconstrains: "1 <= N <= 1000, 1 <= id <= 1000000",
    blacklist: "bsearch",
    whitelist: "for (",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n, target;
    scanf("%d", &n);
    int arr[1000];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    scanf("%d", &target);
    int found = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) {
            if (found) printf(" ");
            printf("%d", i);
            found = 1;
        }
    }
    if (!found) printf("-1");
    printf("\\n");
    return 0;
}
`,
  }),
  codeQ({
    title: "Student Marks Second Highest",
    description: `A teacher wants to find the second highest mark in a class where all marks are distinct. Do not sort the array; traverse it once to find both the highest and second highest values.

Input Format:
First line: integer N. Second line: N space-separated distinct integer marks.

Output Format:
Print the second highest mark on its own line.

Constraints:
2 <= N <= 1000, 0 <= mark <= 100, all marks distinct`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Aggregation Sum Min Max",
    sampleinput1: "5\n80 95 70 88 92",
    sampleoutput1: "92",
    sampleinput2: "3\n10 30 20",
    sampleoutput2: "20",
    input1: "2\n50 100",
    output1: "50",
    input2: "4\n9 7 5 3",
    output2: "7",
    input3: "6\n1 2 3 4 5 6",
    output3: "5",
    inputconstrains: "2 <= N <= 1000, 0 <= mark <= 100, all marks distinct",
    blacklist: "qsort, bsearch",
    whitelist: "for (",
    sourcecode: `#include <stdio.h>
#include <limits.h>

int main(void) {
    int n;
    scanf("%d", &n);
    int arr[1000];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    int first = INT_MIN, second = INT_MIN;
    for (int i = 0; i < n; i++) {
        if (arr[i] > first) {
            second = first;
            first = arr[i];
        } else if (arr[i] > second) {
            second = arr[i];
        }
    }
    printf("%d\\n", second);
    return 0;
}
`,
  }),
  codeQ({
    title: "Game Score Left Rotation K Steps",
    description: `A game records N player scores in order. The scoreboard must be left-rotated by K positions (the first K scores move to the end). Print the rotated scores space-separated. Do not use memcpy or memmove.

Input Format:
First line: integers N and K. Second line: N space-separated integers.

Output Format:
A single line with the rotated scores space-separated.

Constraints:
1 <= N <= 1000, 0 <= K <= 1000000, -1000000 <= score <= 1000000`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Array Reversal and Rotation",
    sampleinput1: "5 2\n1 2 3 4 5",
    sampleoutput1: "3 4 5 1 2",
    sampleinput2: "4 1\n10 20 30 40",
    sampleoutput2: "20 30 40 10",
    input1: "3 0\n1 2 3",
    output1: "1 2 3",
    input2: "5 5\n1 2 3 4 5",
    output2: "1 2 3 4 5",
    input3: "6 2\n6 5 4 3 2 1",
    output3: "4 3 2 1 6 5",
    inputconstrains: "1 <= N <= 1000, 0 <= K <= 1000000",
    blacklist: "memcpy, memmove",
    whitelist: "for (",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n, k;
    scanf("%d %d", &n, &k);
    int arr[1000];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    k = k % n;
    for (int i = 0; i < n; i++) {
        int idx = (i + k) % n;
        if (i > 0) printf(" ");
        printf("%d", arr[idx]);
    }
    printf("\\n");
    return 0;
}
`,
  }),
  codeQ({
    title: "Temperature Series In-Place Reversal",
    description: `A meteorologist stores N daily temperature readings in an array and wants them reversed in-place using a two-pointer swap (no extra array, no memcpy/memmove). Print the reversed array space-separated.

Input Format:
First line: integer N. Second line: N space-separated integer temperatures.

Output Format:
A single line with the temperatures in reverse order, space-separated.

Constraints:
1 <= N <= 1000, -1000 <= temperature <= 1000`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Array Reversal and Rotation",
    sampleinput1: "5\n23 25 21 28 30",
    sampleoutput1: "30 28 21 25 23",
    sampleinput2: "3\n10 20 30",
    sampleoutput2: "30 20 10",
    input1: "1\n15",
    output1: "15",
    input2: "4\n1 2 3 4",
    output2: "4 3 2 1",
    input3: "2\n-5 0",
    output3: "0 -5",
    inputconstrains: "1 <= N <= 1000, -1000 <= temperature <= 1000",
    blacklist: "memcpy, memmove",
    whitelist: "while (",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    int arr[1000];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    int lo = 0, hi = n - 1;
    while (lo < hi) {
        int tmp = arr[lo];
        arr[lo] = arr[hi];
        arr[hi] = tmp;
        lo++;
        hi--;
    }
    for (int i = 0; i < n; i++) {
        if (i > 0) printf(" ");
        printf("%d", arr[i]);
    }
    printf("\\n");
    return 0;
}
`,
  }),
  codeQ({
    title: "Bounded Frequency Counter",
    description: `A survey collects N integer responses, each guaranteed to be in the range [1, K]. Count how many times each value 1..K appears. Initialize a frequency array, then print K lines, line i containing the count of value i.

Input Format:
First line: integers N and K. Second line: N space-separated integers each in [1, K].

Output Format:
K lines, each containing the frequency of value i (for i from 1 to K).

Constraints:
1 <= N <= 1000, 1 <= K <= 1000, each response in [1, K]`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Array Declaration and Initialization",
    sampleinput1: "7 5\n1 2 2 3 5 1 2",
    sampleoutput1: "2\n3\n1\n0\n1",
    sampleinput2: "3 3\n1 1 1",
    sampleoutput2: "3\n0\n0",
    input1: "1 1\n1",
    output1: "1",
    input2: "4 2\n1 2 1 2",
    output2: "2\n2",
    input3: "5 4\n4 4 4 4 4",
    output3: "0\n0\n0\n5",
    inputconstrains: "1 <= N <= 1000, 1 <= K <= 1000, each response in [1, K]",
    blacklist: "qsort, bsearch",
    whitelist: "for (",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n, k;
    scanf("%d %d", &n, &k);
    int arr[1000];
    int freq[1001] = {0};
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
        freq[arr[i]]++;
    }
    for (int i = 1; i <= k; i++) {
        printf("%d\\n", freq[i]);
    }
    return 0;
}
`,
  }),

  // ── HARD (4) ───────────────────────────────────────────────────────────────
  codeQ({
    title: "Stock Single Transaction Max Profit",
    description: `A trader is given N daily stock prices and may make exactly one buy followed by one later sell. Compute the maximum achievable profit (sell price minus buy price). If no profit is possible, output 0. Traverse the array once tracking the minimum price seen so far.

Input Format:
First line: integer N. Second line: N space-separated integer prices.

Output Format:
A single integer: the maximum profit.

Constraints:
1 <= N <= 10000, 1 <= price <= 1000000`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Aggregation Sum Min Max",
    sampleinput1: "6\n7 1 5 3 6 4",
    sampleoutput1: "5",
    sampleinput2: "5\n7 6 4 3 1",
    sampleoutput2: "0",
    input1: "1\n5",
    output1: "0",
    input2: "3\n1 2 3",
    output2: "2",
    input3: "4\n10 7 5 8",
    output3: "3",
    inputconstrains: "1 <= N <= 10000, 1 <= price <= 1000000",
    blacklist: "qsort",
    whitelist: "for (",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    int prices[10000];
    for (int i = 0; i < n; i++) scanf("%d", &prices[i]);
    int minPrice = prices[0];
    int maxProfit = 0;
    for (int i = 1; i < n; i++) {
        if (prices[i] - minPrice > maxProfit) maxProfit = prices[i] - minPrice;
        if (prices[i] < minPrice) minPrice = prices[i];
    }
    printf("%d\\n", maxProfit);
    return 0;
}
`,
  }),
  codeQ({
    title: "Array Right Rotation Reversal Trick",
    description: `A log archiver right-rotates an array of N entries by K positions using the three-reversal trick: reverse the whole array, reverse the first K elements, then reverse the remaining N-K elements. Do not use memcpy or memmove. Print the rotated array space-separated.

Input Format:
First line: integers N and K. Second line: N space-separated integers.

Output Format:
A single line with the right-rotated array, space-separated.

Constraints:
1 <= N <= 1000, 0 <= K <= 1000000, -1000000 <= value <= 1000000`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Array Reversal and Rotation",
    sampleinput1: "5 2\n1 2 3 4 5",
    sampleoutput1: "4 5 1 2 3",
    sampleinput2: "4 1\n10 20 30 40",
    sampleoutput2: "40 10 20 30",
    input1: "3 0\n1 2 3",
    output1: "1 2 3",
    input2: "5 5\n1 2 3 4 5",
    output2: "1 2 3 4 5",
    input3: "6 2\n6 5 4 3 2 1",
    output3: "2 1 6 5 4 3",
    inputconstrains: "1 <= N <= 1000, 0 <= K <= 1000000",
    blacklist: "memcpy, memmove",
    whitelist: "reverse(",
    sourcecode: `#include <stdio.h>

static void reverse(int arr[], int lo, int hi) {
    while (lo < hi) {
        int tmp = arr[lo];
        arr[lo] = arr[hi];
        arr[hi] = tmp;
        lo++;
        hi--;
    }
}

int main(void) {
    int n, k;
    scanf("%d %d", &n, &k);
    int arr[1000];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    k = k % n;
    reverse(arr, 0, n - 1);
    reverse(arr, 0, k - 1);
    reverse(arr, k, n - 1);
    for (int i = 0; i < n; i++) {
        if (i > 0) printf(" ");
        printf("%d", arr[i]);
    }
    printf("\\n");
    return 0;
}
`,
  }),
  codeQ({
    title: "Sorted Catalog Distinct Element Counter",
    description: `A product catalog stores N product codes in non-decreasing order. Traverse the sorted array once to count the number of distinct codes (do not sort or binary-search).

Input Format:
First line: integer N. Second line: N space-separated non-decreasing integers.

Output Format:
A single integer: the count of distinct elements.

Constraints:
1 <= N <= 1000, -1000000 <= code <= 1000000`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Array Traversal",
    sampleinput1: "6\n1 1 2 3 3 5",
    sampleoutput1: "4",
    sampleinput2: "4\n7 7 7 7",
    sampleoutput2: "1",
    input1: "1\n42",
    output1: "1",
    input2: "3\n1 2 3",
    output2: "3",
    input3: "5\n-1 -1 0 0 1",
    output3: "3",
    inputconstrains: "1 <= N <= 1000, -1000000 <= code <= 1000000",
    blacklist: "qsort, bsearch",
    whitelist: "for (",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    int arr[1000];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    int distinct = 1;
    for (int i = 1; i < n; i++) {
        if (arr[i] != arr[i - 1]) distinct++;
    }
    printf("%d\\n", distinct);
    return 0;
}
`,
  }),
  codeQ({
    title: "Prefix Sum Range Query Processor",
    description: `A data analyst precomputes prefix sums of an array of N integers to answer Q range-sum queries fast. For each query (l r) with 0-based inclusive indices, print the sum of arr[l..r] using prefix[r+1] - prefix[l]. Do not sort the array.

Input Format:
First line: integer N. Second line: N space-separated integers. Third line: integer Q. Next Q lines: two space-separated integers l and r.

Output Format:
Q lines, each the sum of arr[l..r].

Constraints:
1 <= N <= 1000, 1 <= Q <= 1000, 0 <= l <= r < N, -1000000 <= arr[i] <= 1000000`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Array Input and Output",
    sampleinput1: "5\n1 2 3 4 5\n3\n0 2\n1 4\n3 3",
    sampleoutput1: "6\n14\n4",
    sampleinput2: "3\n10 20 30\n2\n0 0\n0 2",
    sampleoutput2: "10\n60",
    input1: "1\n7\n1\n0 0",
    output1: "7",
    input2: "4\n-1 2 -3 4\n2\n0 3\n1 2",
    output2: "2\n-1",
    input3: "6\n1 1 1 1 1 1\n1\n0 5",
    output3: "6",
    inputconstrains: "1 <= N <= 1000, 1 <= Q <= 1000, 0 <= l <= r < N",
    blacklist: "qsort",
    whitelist: "for (",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    int arr[1000];
    long long prefix[1001];
    prefix[0] = 0;
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
        prefix[i + 1] = prefix[i] + arr[i];
    }
    int q;
    scanf("%d", &q);
    for (int i = 0; i < q; i++) {
        int l, r;
        scanf("%d %d", &l, &r);
        printf("%lld\\n", prefix[r + 1] - prefix[l]);
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
    title: "Array Declaration Syntax in C",
    description: "Which line correctly declares an array of 10 integers in C?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Array Declaration and Initialization",
    Option1: "int arr[10];",
    Option2: "array[10] int;",
    Option3: "int arr(10);",
    Option4: "arr int[10];",
    CorrectOption: 1,
  }),
  mcq({
    title: "Zero-Based Array Indexing in C",
    description: "In C, the first element of an array arr is accessed as:",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Array Traversal",
    Option1: "arr[0]",
    Option2: "arr[1]",
    Option3: "arr(0)",
    Option4: "arr.first",
    CorrectOption: 1,
  }),
  mcq({
    title: "Reading Into Array Element with scanf",
    description: "Which call correctly reads an integer into arr[i]?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Array Input and Output",
    Option1: "scanf(\"%d\", &arr[i]);",
    Option2: "scanf(\"%d\", arr[i]);",
    Option3: "scanf(\"%d\", *arr[i]);",
    Option4: "scanf(\"%s\", arr[i]);",
    CorrectOption: 1,
  }),
  mcq({
    title: "Sum of Array Elements Accumulator Pattern",
    description: "To compute the sum of N array elements, the typical accumulator pattern is:",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Aggregation Sum Min Max",
    Option1: "Initialize sum to 0, then add each arr[i] in a loop",
    Option2: "Initialize sum to arr[0], then add each arr[i]",
    Option3: "Initialize sum to 1, then multiply each arr[i]",
    Option4: "Initialize sum to N, then subtract each arr[i]",
    CorrectOption: 1,
  }),
  mcq({
    title: "Linear Search Not Found Return Value",
    description: "In a typical linear search, if the target is not in the array, the function returns:",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Searching in Arrays",
    Option1: "-1",
    Option2: "0",
    Option3: "1",
    Option4: "The array length",
    CorrectOption: 1,
  }),
  mcq({
    title: "Reverse Array In-Place Swap Pattern",
    description: "To reverse an array in-place, you typically swap:",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Array Reversal and Rotation",
    Option1: "arr[i] with arr[n-1-i] for i from 0 to n/2 - 1",
    Option2: "arr[i] with arr[i+1] for i from 0 to n-1",
    Option3: "arr[0] with arr[n-1] only",
    Option4: "arr[i] with arr[n-i] for i from 0 to n-1",
    CorrectOption: 1,
  }),
  mcq({
    title: "Default Local Array Initialization",
    description: "What is the initial value of an automatic (local) array's elements if not explicitly initialized?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Array Declaration and Initialization",
    Option1: "Indeterminate (garbage values)",
    Option2: "Always zero",
    Option3: "Always -1",
    Option4: "Always the maximum int value",
    CorrectOption: 1,
  }),
  mcq({
    title: "Array Index Out of Bounds Behavior",
    description: "In C, accessing arr[N] for an array of size N is:",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Array Traversal",
    Option1: "Undefined behavior",
    Option2: "Always returns 0",
    Option3: "Always returns the last element",
    Option4: "Guaranteed to cause a runtime crash",
    CorrectOption: 1,
  }),
  mcq({
    title: "Array Initialization with Braces",
    description: "Which is a valid compile-time initialization of an array?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Array Declaration and Initialization",
    Option1: "int arr[3] = {1, 2, 3};",
    Option2: "int arr[3] = (1, 2, 3);",
    Option3: "int arr[3] = [1, 2, 3];",
    Option4: "int arr = {1, 2, 3};",
    CorrectOption: 1,
  }),
  mcq({
    title: "Min Accumulator Initial Value",
    description: "When finding the minimum of an array of N >= 1 integers, the accumulator should typically be initialized to:",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Aggregation Sum Min Max",
    Option1: "arr[0] (the first element)",
    Option2: "0",
    Option3: "-1",
    Option4: "INT_MIN",
    CorrectOption: 1,
  }),

  // ── MEDIUM (6) ─────────────────────────────────────────────────────────────
  mcq({
    title: "Array Sum Loop Output Snippet",
    description: "What does the following snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Aggregation Sum Min Max",
    Option1: "15",
    Option2: "10",
    Option3: "5",
    Option4: "25",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int arr[] = {1, 2, 3, 4, 5};
    int sum = 0;
    for (int i = 0; i < 5; i++) sum += arr[i];
    printf("%d\\n", sum);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Linear Search Index Trace Snippet",
    description: "What does the following snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Searching in Arrays",
    Option1: "2",
    Option2: "3",
    Option3: "1",
    Option4: "-1",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int arr[] = {4, 2, 7, 1, 9};
    int target = 7, idx = -1;
    for (int i = 0; i < 5; i++) {
        if (arr[i] == target) { idx = i; break; }
    }
    printf("%d\\n", idx);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Array Reverse Print Output Snippet",
    description: "What does the following snippet print to stdout (after trailing-whitespace normalization)?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Array Reversal and Rotation",
    Option1: "50 40 30 20 10",
    Option2: "10 20 30 40 50",
    Option3: "50 40 30 20 10 0",
    Option4: "10 20 30 40 50 0",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int arr[] = {10, 20, 30, 40, 50};
    for (int i = 4; i >= 0; i--) printf("%d ", arr[i]);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Prefix Sum Array Definition",
    description: "A prefix sum array prefix[i] (with prefix[0] = 0) stores:",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Array Input and Output",
    Option1: "The sum of arr[0..i-1]",
    Option2: "The sum of arr[0..i]",
    Option3: "The maximum of arr[0..i]",
    Option4: "The count of distinct elements in arr[0..i]",
    CorrectOption: 1,
  }),
  mcq({
    title: "Linear Search Worst Case Time",
    description: "What is the worst-case time complexity of linear search on an array of N elements?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Searching in Arrays",
    Option1: "O(N)",
    Option2: "O(log N)",
    Option3: "O(1)",
    Option4: "O(N log N)",
    CorrectOption: 1,
  }),
  mcq({
    title: "Weighted Index Sum Snippet",
    description: "What does the following snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Array Traversal",
    Option1: "100",
    Option2: "50",
    Option3: "30",
    Option4: "15",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int arr[] = {5, 10, 15, 20};
    int s = 0;
    for (int i = 0; i < 4; i++) s += arr[i] * i;
    printf("%d\\n", s);
    return 0;
}
`,
    snippetLang: "c",
  }),

  // ── HARD (4) ────────────────────────────────────────────────────────────────
  mcq({
    title: "Stock Max Profit Trace Snippet",
    description: "What does the following snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Aggregation Sum Min Max",
    Option1: "5",
    Option2: "4",
    Option3: "6",
    Option4: "7",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int prices[] = {7, 1, 5, 3, 6, 4};
    int minP = prices[0], maxProfit = 0;
    for (int i = 1; i < 6; i++) {
        if (prices[i] - minP > maxProfit) maxProfit = prices[i] - minP;
        if (prices[i] < minP) minP = prices[i];
    }
    printf("%d\\n", maxProfit);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Right Rotation Output Trace Snippet",
    description: "What does the following snippet print to stdout (after trailing-whitespace normalization)?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Array Reversal and Rotation",
    Option1: "4 5 1 2 3",
    Option2: "3 4 5 1 2",
    Option3: "5 1 2 3 4",
    Option4: "2 1 5 4 3",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int arr[] = {1, 2, 3, 4, 5};
    int n = 5, k = 2;
    int rotated[5];
    for (int i = 0; i < n; i++) rotated[(i + k) % n] = arr[i];
    for (int i = 0; i < n; i++) printf("%d ", rotated[i]);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Distinct Count Trace Snippet",
    description: "What does the following snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Array Traversal",
    Option1: "4",
    Option2: "3",
    Option3: "5",
    Option4: "6",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int arr[] = {1, 1, 2, 3, 3, 5};
    int distinct = 1;
    for (int i = 1; i < 6; i++) {
        if (arr[i] != arr[i - 1]) distinct++;
    }
    printf("%d\\n", distinct);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Prefix Sum Range Query Snippet",
    description: "What does the following snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Array Input and Output",
    Option1: "6",
    Option2: "9",
    Option3: "5",
    Option4: "3",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int arr[] = {3, 1, 4, 1, 5};
    int prefix[6];
    prefix[0] = 0;
    for (int i = 0; i < 5; i++) prefix[i + 1] = prefix[i] + arr[i];
    printf("%d\\n", prefix[4] - prefix[1]);
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
