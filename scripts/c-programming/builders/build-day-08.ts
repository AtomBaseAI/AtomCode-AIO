/**
 * Builder for Day 8 — "2D Arrays".
 * Emits:
 *   /home/z/my-project/scripts/c-programming/data/day-08.code.json  (20 code questions)
 *   /home/z/my-project/scripts/c-programming/data/day-08.mcq.json   (20 MCQ questions)
 */
import { writeFileSync } from "node:fs";

const DAY = 8;
const TOPIC = "2D Arrays";
const SUBTOPICS = [
  "2D Array Declaration",
  "Matrix Input and Output",
  "Matrix Addition and Subtraction",
  "Matrix Multiplication",
  "Transpose and Diagonals",
  "Patterns Using Arrays",
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
    title: "Matrix Echo Drill",
    description: `Read a matrix of R rows and C columns and print it back exactly, with rows on separate lines and space-separated values.

Input Format:
First line: integers R and C. Next R lines: C space-separated integers each.

Output Format:
R lines, each with C space-separated integers.

Constraints:
1 <= R, C <= 100, -1000 <= value <= 1000`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "2D Array Declaration",
    sampleinput1: "2 3\n1 2 3\n4 5 6",
    sampleoutput1: "1 2 3\n4 5 6",
    sampleinput2: "1 1\n7",
    sampleoutput2: "7",
    input1: "3 2\n10 20\n30 40\n50 60",
    output1: "10 20\n30 40\n50 60",
    input2: "2 2\n-1 0\n0 -1",
    output2: "-1 0\n0 -1",
    input3: "1 4\n1 2 3 4",
    output3: "1 2 3 4",
    inputconstrains: "1 <= R, C <= 100, -1000 <= value <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int r, c;
    scanf("%d %d", &r, &c);
    int m[100][100];
    for (int i = 0; i < r; i++)
        for (int j = 0; j < c; j++)
            scanf("%d", &m[i][j]);
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            if (j > 0) printf(" ");
            printf("%d", m[i][j]);
        }
        printf("\\n");
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Matrix Row Sum Drill",
    description: `Read an R x C matrix and print the sum of each row, one sum per line.

Input Format:
First line: integers R and C. Next R lines: C space-separated integers each.

Output Format:
R lines, each containing the sum of the corresponding row.

Constraints:
1 <= R, C <= 100, -1000 <= value <= 1000`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Matrix Input and Output",
    sampleinput1: "2 3\n1 2 3\n4 5 6",
    sampleoutput1: "6\n15",
    sampleinput2: "1 1\n7",
    sampleoutput2: "7",
    input1: "3 2\n10 20\n30 40\n50 60",
    output1: "30\n70\n110",
    input2: "2 2\n-1 0\n0 -1",
    output2: "-1\n-1",
    input3: "1 4\n1 2 3 4",
    output3: "10",
    inputconstrains: "1 <= R, C <= 100, -1000 <= value <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int r, c;
    scanf("%d %d", &r, &c);
    int m[100][100];
    for (int i = 0; i < r; i++)
        for (int j = 0; j < c; j++)
            scanf("%d", &m[i][j]);
    for (int i = 0; i < r; i++) {
        long long s = 0;
        for (int j = 0; j < c; j++) s += m[i][j];
        printf("%lld\\n", s);
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Matrix Total Sum Drill",
    description: `Read an R x C matrix and print the sum of all its elements on a single line.

Input Format:
First line: integers R and C. Next R lines: C space-separated integers each.

Output Format:
A single integer: the total sum.

Constraints:
1 <= R, C <= 100, -1000 <= value <= 1000`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Matrix Input and Output",
    sampleinput1: "2 3\n1 2 3\n4 5 6",
    sampleoutput1: "21",
    sampleinput2: "1 1\n7",
    sampleoutput2: "7",
    input1: "3 2\n10 20\n30 40\n50 60",
    output1: "210",
    input2: "2 2\n-1 0\n0 -1",
    output2: "-2",
    input3: "1 4\n1 2 3 4",
    output3: "10",
    inputconstrains: "1 <= R, C <= 100, -1000 <= value <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int r, c;
    scanf("%d %d", &r, &c);
    int m[100][100];
    long long total = 0;
    for (int i = 0; i < r; i++)
        for (int j = 0; j < c; j++) {
            scanf("%d", &m[i][j]);
            total += m[i][j];
        }
    printf("%lld\\n", total);
    return 0;
}
`,
  }),
  codeQ({
    title: "Matrix Addition Drill",
    description: `Read two R x C matrices A and B and print their sum (A + B) in the same R x C layout.

Input Format:
First line: integers R and C. Next R lines: matrix A. Then R lines: matrix B.

Output Format:
R lines, each with C space-separated integers.

Constraints:
1 <= R, C <= 100, -1000 <= value <= 1000`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Matrix Addition and Subtraction",
    sampleinput1: "2 2\n1 2\n3 4\n5 6\n7 8",
    sampleoutput1: "6 8\n10 12",
    sampleinput2: "1 1\n10\n20",
    sampleoutput2: "30",
    input1: "2 3\n1 2 3\n4 5 6\n-1 -2 -3\n-4 -5 -6",
    output1: "0 0 0\n0 0 0",
    input2: "1 2\n0 0\n5 7",
    output2: "5 7",
    input3: "3 1\n1\n2\n3\n10\n20\n30",
    output3: "11\n22\n33",
    inputconstrains: "1 <= R, C <= 100, -1000 <= value <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int r, c;
    scanf("%d %d", &r, &c);
    int a[100][100], b[100][100];
    for (int i = 0; i < r; i++)
        for (int j = 0; j < c; j++)
            scanf("%d", &a[i][j]);
    for (int i = 0; i < r; i++)
        for (int j = 0; j < c; j++)
            scanf("%d", &b[i][j]);
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            if (j > 0) printf(" ");
            printf("%d", a[i][j] + b[i][j]);
        }
        printf("\\n");
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Matrix Main Diagonal Printer Drill",
    description: `Read a square N x N matrix and print its main diagonal elements on one line, space-separated.

Input Format:
First line: integer N. Next N lines: N space-separated integers each.

Output Format:
A single line with N space-separated integers (the main diagonal).

Constraints:
1 <= N <= 100, -1000 <= value <= 1000`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Transpose and Diagonals",
    sampleinput1: "3\n1 2 3\n4 5 6\n7 8 9",
    sampleoutput1: "1 5 9",
    sampleinput2: "1\n7",
    sampleoutput2: "7",
    input1: "2\n10 20\n30 40",
    output1: "10 40",
    input2: "4\n1 0 0 0\n0 2 0 0\n0 0 3 0\n0 0 0 4",
    output2: "1 2 3 4",
    input3: "3\n-1 -2 -3\n-4 -5 -6\n-7 -8 -9",
    output3: "-1 -5 -9",
    inputconstrains: "1 <= N <= 100, -1000 <= value <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    int m[100][100];
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            scanf("%d", &m[i][j]);
    for (int i = 0; i < n; i++) {
        if (i > 0) printf(" ");
        printf("%d", m[i][i]);
    }
    printf("\\n");
    return 0;
}
`,
  }),
  codeQ({
    title: "Matrix Column Maximum Drill",
    description: `Read an R x C matrix and print the maximum value of each column, one per line.

Input Format:
First line: integers R and C. Next R lines: C space-separated integers each.

Output Format:
C lines, each containing the maximum of the corresponding column.

Constraints:
1 <= R, C <= 100, -1000 <= value <= 1000`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Matrix Input and Output",
    sampleinput1: "2 3\n1 5 3\n7 2 9",
    sampleoutput1: "7\n5\n9",
    sampleinput2: "1 1\n7",
    sampleoutput2: "7",
    input1: "3 2\n10 20\n30 40\n50 60",
    output1: "50\n60",
    input2: "2 2\n-1 0\n0 -1",
    output2: "0\n0",
    input3: "1 4\n1 2 3 4",
    output3: "1\n2\n3\n4",
    inputconstrains: "1 <= R, C <= 100, -1000 <= value <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int r, c;
    scanf("%d %d", &r, &c);
    int m[100][100];
    for (int i = 0; i < r; i++)
        for (int j = 0; j < c; j++)
            scanf("%d", &m[i][j]);
    for (int j = 0; j < c; j++) {
        int mx = m[0][j];
        for (int i = 1; i < r; i++) {
            if (m[i][j] > mx) mx = m[i][j];
        }
        printf("%d\\n", mx);
    }
    return 0;
}
`,
  }),

  // ── EASY SCENARIO (4) ──────────────────────────────────────────────────────
  codeQ({
    title: "Classroom Marks Grid Reporter",
    description: `A classroom has R students and C subjects. The teacher enters marks into an R x C grid and wants it printed back as a formatted table for verification.

Input Format:
First line: integers R and C. Next R lines: C space-separated integer marks.

Output Format:
R lines, each with C space-separated marks (echo of the input grid).

Constraints:
1 <= R, C <= 50, 0 <= mark <= 100`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "2D Array Declaration",
    sampleinput1: "2 3\n80 75 90\n65 88 70",
    sampleoutput1: "80 75 90\n65 88 70",
    sampleinput2: "1 1\n100",
    sampleoutput2: "100",
    input1: "3 2\n50 60\n70 80\n90 100",
    output1: "50 60\n70 80\n90 100",
    input2: "2 2\n0 0\n0 0",
    output2: "0 0\n0 0",
    input3: "1 4\n10 20 30 40",
    output3: "10 20 30 40",
    inputconstrains: "1 <= R, C <= 50, 0 <= mark <= 100",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int r, c;
    scanf("%d %d", &r, &c);
    int marks[50][50];
    for (int i = 0; i < r; i++)
        for (int j = 0; j < c; j++)
            scanf("%d", &marks[i][j]);
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            if (j > 0) printf(" ");
            printf("%d", marks[i][j]);
        }
        printf("\\n");
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Inventory Grid Stock Display",
    description: `A warehouse has R shelves, each with C bins. The stock count for each bin is provided as an R x C grid. Print the grid as-is for the manager to inspect.

Input Format:
First line: integers R and C. Next R lines: C space-separated integer stock counts.

Output Format:
R lines, each with C space-separated integers.

Constraints:
1 <= R, C <= 50, 0 <= count <= 10000`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Matrix Input and Output",
    sampleinput1: "2 3\n10 20 30\n40 50 60",
    sampleoutput1: "10 20 30\n40 50 60",
    sampleinput2: "1 1\n7",
    sampleoutput2: "7",
    input1: "3 2\n0 0\n0 0\n0 0",
    output1: "0 0\n0 0\n0 0",
    input2: "2 2\n100 200\n300 400",
    output2: "100 200\n300 400",
    input3: "1 4\n1 2 3 4",
    output3: "1 2 3 4",
    inputconstrains: "1 <= R, C <= 50, 0 <= count <= 10000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int r, c;
    scanf("%d %d", &r, &c);
    int stock[50][50];
    for (int i = 0; i < r; i++)
        for (int j = 0; j < c; j++)
            scanf("%d", &stock[i][j]);
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            if (j > 0) printf(" ");
            printf("%d", stock[i][j]);
        }
        printf("\\n");
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Two City Temperature Difference",
    description: `Two cities record C daily temperature readings each. Compute the difference (City A minus City B) for each day and print the result on one line space-separated.

Input Format:
First line: integer C. Second line: C space-separated integers (City A). Third line: C space-separated integers (City B).

Output Format:
A single line with C space-separated integer differences (A - B).

Constraints:
1 <= C <= 100, -1000 <= temp <= 1000`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Matrix Addition and Subtraction",
    sampleinput1: "3\n30 32 28\n25 27 30",
    sampleoutput1: "5 5 -2",
    sampleinput2: "1\n20\n10",
    sampleoutput2: "10",
    input1: "2\n10 20\n5 15",
    output1: "5 5",
    input2: "4\n0 0 0 0\n1 2 3 4",
    output2: "-1 -2 -3 -4",
    input3: "3\n-5 -10 -3\n-1 -2 -3",
    output3: "-4 -8 0",
    inputconstrains: "1 <= C <= 100, -1000 <= temp <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int c;
    scanf("%d", &c);
    int a[100], b[100];
    for (int i = 0; i < c; i++) scanf("%d", &a[i]);
    for (int i = 0; i < c; i++) scanf("%d", &b[i]);
    for (int i = 0; i < c; i++) {
        if (i > 0) printf(" ");
        printf("%d", a[i] - b[i]);
    }
    printf("\\n");
    return 0;
}
`,
  }),
  codeQ({
    title: "Seating Chart Diagonal Names ID",
    description: `A theater seating chart is an N x N grid of seat numbers. The manager wants the seat numbers along the main diagonal (top-left to bottom-right) printed space-separated on a single line.

Input Format:
First line: integer N. Next N lines: N space-separated integers.

Output Format:
A single line with N space-separated integers (the main diagonal).

Constraints:
1 <= N <= 50, 1 <= seat <= 1000000`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Transpose and Diagonals",
    sampleinput1: "3\n101 102 103\n104 105 106\n107 108 109",
    sampleoutput1: "101 105 109",
    sampleinput2: "1\n7",
    sampleoutput2: "7",
    input1: "2\n10 20\n30 40",
    output1: "10 40",
    input2: "4\n1 0 0 0\n0 2 0 0\n0 0 3 0\n0 0 0 4",
    output2: "1 2 3 4",
    input3: "3\n1 2 3\n4 5 6\n7 8 9",
    output3: "1 5 9",
    inputconstrains: "1 <= N <= 50, 1 <= seat <= 1000000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    int m[50][50];
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            scanf("%d", &m[i][j]);
    for (int i = 0; i < n; i++) {
        if (i > 0) printf(" ");
        printf("%d", m[i][i]);
    }
    printf("\\n");
    return 0;
}
`,
  }),

  // ── MEDIUM (6) ─────────────────────────────────────────────────────────────
  codeQ({
    title: "Matrix Subtraction Reporter",
    description: `A finance tool subtracts matrix B (expenses) from matrix A (revenues) for each cell of an R x C budget grid. Print the resulting matrix A - B. Do not use memcpy or memmove.

Input Format:
First line: integers R and C. Next R lines: matrix A. Then R lines: matrix B.

Output Format:
R lines, each with C space-separated integers.

Constraints:
1 <= R, C <= 100, -10000 <= value <= 10000`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Matrix Addition and Subtraction",
    sampleinput1: "2 2\n100 200\n300 400\n30 50\n70 90",
    sampleoutput1: "70 150\n230 310",
    sampleinput2: "1 1\n10\n3",
    sampleoutput2: "7",
    input1: "2 3\n1 2 3\n4 5 6\n1 1 1\n1 1 1",
    output1: "0 1 2\n3 4 5",
    input2: "2 2\n0 0\n0 0\n5 5\n5 5",
    output2: "-5 -5\n-5 -5",
    input3: "3 1\n10\n20\n30\n1\n2\n3",
    output3: "9\n18\n27",
    inputconstrains: "1 <= R, C <= 100, -10000 <= value <= 10000",
    blacklist: "memcpy, memmove",
    whitelist: "for (",
    sourcecode: `#include <stdio.h>

int main(void) {
    int r, c;
    scanf("%d %d", &r, &c);
    int a[100][100], b[100][100];
    for (int i = 0; i < r; i++)
        for (int j = 0; j < c; j++)
            scanf("%d", &a[i][j]);
    for (int i = 0; i < r; i++)
        for (int j = 0; j < c; j++)
            scanf("%d", &b[i][j]);
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            if (j > 0) printf(" ");
            printf("%d", a[i][j] - b[i][j]);
        }
        printf("\\n");
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Square Matrix Transpose In-Place",
    description: `A data scientist transposes an N x N matrix in-place (without using a second matrix). Print the transposed matrix. Do not use memcpy or memmove.

Input Format:
First line: integer N. Next N lines: N space-separated integers.

Output Format:
N lines, each with N space-separated integers (the transpose).

Constraints:
1 <= N <= 100, -1000 <= value <= 1000`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Transpose and Diagonals",
    sampleinput1: "3\n1 2 3\n4 5 6\n7 8 9",
    sampleoutput1: "1 4 7\n2 5 8\n3 6 9",
    sampleinput2: "1\n7",
    sampleoutput2: "7",
    input1: "2\n10 20\n30 40",
    output1: "10 30\n20 40",
    input2: "3\n1 0 0\n0 1 0\n0 0 1",
    output2: "1 0 0\n0 1 0\n0 0 1",
    input3: "2\n1 2\n3 4",
    output3: "1 3\n2 4",
    inputconstrains: "1 <= N <= 100, -1000 <= value <= 1000",
    blacklist: "memcpy, memmove",
    whitelist: "for (",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    int m[100][100];
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            scanf("%d", &m[i][j]);
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            int tmp = m[i][j];
            m[i][j] = m[j][i];
            m[j][i] = tmp;
        }
    }
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (j > 0) printf(" ");
            printf("%d", m[i][j]);
        }
        printf("\\n");
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Matrix Trace Calculator",
    description: `A linear algebra class computes the trace of a square matrix (sum of main diagonal elements). Read the matrix and print its trace. Do not use qsort.

Input Format:
First line: integer N. Next N lines: N space-separated integers.

Output Format:
A single integer: the trace.

Constraints:
1 <= N <= 100, -1000 <= value <= 1000`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Transpose and Diagonals",
    sampleinput1: "3\n1 2 3\n4 5 6\n7 8 9",
    sampleoutput1: "15",
    sampleinput2: "1\n7",
    sampleoutput2: "7",
    input1: "2\n10 20\n30 40",
    output1: "50",
    input2: "4\n1 0 0 0\n0 2 0 0\n0 0 3 0\n0 0 0 4",
    output2: "10",
    input3: "3\n-1 -2 -3\n-4 -5 -6\n-7 -8 -9",
    output3: "-15",
    inputconstrains: "1 <= N <= 100, -1000 <= value <= 1000",
    blacklist: "qsort",
    whitelist: "for (",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    int m[100][100];
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            scanf("%d", &m[i][j]);
    long long trace = 0;
    for (int i = 0; i < n; i++) trace += m[i][i];
    printf("%lld\\n", trace);
    return 0;
}
`,
  }),
  codeQ({
    title: "Matrix Column Sums Reporter",
    description: `A meteorologist has an R x C grid of rainfall readings. Compute the sum of each column and print them space-separated on one line. Do not use memcpy.

Input Format:
First line: integers R and C. Next R lines: C space-separated integers.

Output Format:
A single line with C space-separated column sums.

Constraints:
1 <= R, C <= 100, 0 <= value <= 10000`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Matrix Input and Output",
    sampleinput1: "2 3\n10 20 30\n5 5 5",
    sampleoutput1: "15 25 35",
    sampleinput2: "1 1\n7",
    sampleoutput2: "7",
    input1: "3 2\n1 2\n3 4\n5 6",
    output1: "9 12",
    input2: "2 2\n0 0\n0 0",
    output2: "0 0",
    input3: "2 4\n1 2 3 4\n5 6 7 8",
    output3: "6 8 10 12",
    inputconstrains: "1 <= R, C <= 100, 0 <= value <= 10000",
    blacklist: "memcpy",
    whitelist: "for (",
    sourcecode: `#include <stdio.h>

int main(void) {
    int r, c;
    scanf("%d %d", &r, &c);
    int m[100][100];
    long long col[100] = {0};
    for (int i = 0; i < r; i++)
        for (int j = 0; j < c; j++) {
            scanf("%d", &m[i][j]);
            col[j] += m[i][j];
        }
    for (int j = 0; j < c; j++) {
        if (j > 0) printf(" ");
        printf("%lld", col[j]);
    }
    printf("\\n");
    return 0;
}
`,
  }),
  codeQ({
    title: "Anti-Diagonal Sum Calculator",
    description: `An image processing tool computes the sum of the anti-diagonal (top-right to bottom-left) of an N x N matrix. Print the sum. Do not use qsort.

Input Format:
First line: integer N. Next N lines: N space-separated integers.

Output Format:
A single integer: the anti-diagonal sum.

Constraints:
1 <= N <= 100, -1000 <= value <= 1000`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Transpose and Diagonals",
    sampleinput1: "3\n1 2 3\n4 5 6\n7 8 9",
    sampleoutput1: "15",
    sampleinput2: "1\n7",
    sampleoutput2: "7",
    input1: "2\n10 20\n30 40",
    output1: "50",
    input2: "3\n1 0 0\n0 1 0\n0 0 1",
    output2: "1",
    input3: "4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16",
    output3: "34",
    inputconstrains: "1 <= N <= 100, -1000 <= value <= 1000",
    blacklist: "qsort",
    whitelist: "for (",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    int m[100][100];
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            scanf("%d", &m[i][j]);
    long long s = 0;
    for (int i = 0; i < n; i++) s += m[i][n - 1 - i];
    printf("%lld\\n", s);
    return 0;
}
`,
  }),
  codeQ({
    title: "Checkerboard Pattern Generator",
    description: `A graphic designer generates an N x N checkerboard pattern stored in a 2D array. Cell (i, j) is 1 if (i + j) is even, 0 otherwise. Print the grid row by row. Do not use memcpy.

Input Format:
A single integer N.

Output Format:
N lines, each with N space-separated integers (0 or 1).

Constraints:
1 <= N <= 50`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Patterns Using Arrays",
    sampleinput1: "3",
    sampleoutput1: "1 0 1\n0 1 0\n1 0 1",
    sampleinput2: "1",
    sampleoutput2: "1",
    input1: "2",
    output1: "1 0\n0 1",
    input2: "4",
    output2: "1 0 1 0\n0 1 0 1\n1 0 1 0\n0 1 0 1",
    input3: "5",
    output3: "1 0 1 0 1\n0 1 0 1 0\n1 0 1 0 1\n0 1 0 1 0\n1 0 1 0 1",
    inputconstrains: "1 <= N <= 50",
    blacklist: "memcpy",
    whitelist: "for (",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    int grid[50][50];
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            grid[i][j] = ((i + j) % 2 == 0) ? 1 : 0;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (j > 0) printf(" ");
            printf("%d", grid[i][j]);
        }
        printf("\\n");
    }
    return 0;
}
`,
  }),

  // ── HARD (4) ───────────────────────────────────────────────────────────────
  codeQ({
    title: "Matrix Multiplication Calculator",
    description: `A scientific computing tool multiplies an M x N matrix A by an N x P matrix B and prints the resulting M x P matrix. Do not use memcpy. Use a triple-nested loop.

Input Format:
First line: three integers M N P. Next M lines: N space-separated integers (matrix A). Next N lines: P space-separated integers (matrix B).

Output Format:
M lines, each with P space-separated integers (the product matrix).

Constraints:
1 <= M, N, P <= 50, -1000 <= value <= 1000, each product element fits in a 64-bit signed integer`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Matrix Multiplication",
    sampleinput1: "2 3 2\n1 2 3\n4 5 6\n7 8\n9 10\n11 12",
    sampleoutput1: "58 64\n139 154",
    sampleinput2: "1 1 1\n3\n4",
    sampleoutput2: "12",
    input1: "2 2 2\n1 0\n0 1\n5 6\n7 8",
    output1: "5 6\n7 8",
    input2: "1 2 2\n1 2\n3 4\n5 6",
    output2: "13 16",
    input3: "2 2 1\n1 2\n3 4\n5\n6",
    output3: "17\n39",
    inputconstrains: "1 <= M, N, P <= 50, -1000 <= value <= 1000",
    blacklist: "memcpy",
    whitelist: "for (",
    sourcecode: `#include <stdio.h>

int main(void) {
    int m, n, p;
    scanf("%d %d %d", &m, &n, &p);
    int a[50][50], b[50][50];
    long long c[50][50];
    for (int i = 0; i < m; i++)
        for (int j = 0; j < n; j++)
            scanf("%d", &a[i][j]);
    for (int i = 0; i < n; i++)
        for (int j = 0; j < p; j++)
            scanf("%d", &b[i][j]);
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < p; j++) {
            long long s = 0;
            for (int k = 0; k < n; k++) s += (long long)a[i][k] * b[k][j];
            c[i][j] = s;
        }
    }
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < p; j++) {
            if (j > 0) printf(" ");
            printf("%lld", c[i][j]);
        }
        printf("\\n");
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Matrix 90 Degree Clockwise Rotation",
    description: `An image rotation tool rotates an N x N matrix 90 degrees clockwise by first transposing it in-place, then reversing each row. Print the rotated matrix. Do not use memcpy or memmove.

Input Format:
First line: integer N. Next N lines: N space-separated integers.

Output Format:
N lines, each with N space-separated integers (rotated matrix).

Constraints:
1 <= N <= 100, -1000 <= value <= 1000`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Patterns Using Arrays",
    sampleinput1: "3\n1 2 3\n4 5 6\n7 8 9",
    sampleoutput1: "7 4 1\n8 5 2\n9 6 3",
    sampleinput2: "1\n7",
    sampleoutput2: "7",
    input1: "2\n10 20\n30 40",
    output1: "30 10\n40 20",
    input2: "4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16",
    output2: "13 9 5 1\n14 10 6 2\n15 11 7 3\n16 12 8 4",
    input3: "2\n1 0\n0 1",
    output3: "0 1\n1 0",
    inputconstrains: "1 <= N <= 100, -1000 <= value <= 1000",
    blacklist: "memcpy, memmove",
    whitelist: "for (, while (",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    int a[100][100];
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            scanf("%d", &a[i][j]);
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            int tmp = a[i][j];
            a[i][j] = a[j][i];
            a[j][i] = tmp;
        }
    }
    for (int i = 0; i < n; i++) {
        int lo = 0, hi = n - 1;
        while (lo < hi) {
            int tmp = a[i][lo];
            a[i][lo] = a[i][hi];
            a[i][hi] = tmp;
            lo++;
            hi--;
        }
    }
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (j > 0) printf(" ");
            printf("%d", a[i][j]);
        }
        printf("\\n");
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Spiral Order Matrix Traversal",
    description: `A scanner reads an R x C matrix in spiral order starting from the top-left, going right, down, left, up, and repeating. Print the elements space-separated on one line. Do not use memcpy.

Input Format:
First line: integers R and C. Next R lines: C space-separated integers each.

Output Format:
A single line with all elements in spiral order, space-separated.

Constraints:
1 <= R, C <= 50, -1000 <= value <= 1000`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Matrix Input and Output",
    sampleinput1: "3 3\n1 2 3\n4 5 6\n7 8 9",
    sampleoutput1: "1 2 3 6 9 8 7 4 5",
    sampleinput2: "2 2\n1 2\n3 4",
    sampleoutput2: "1 2 4 3",
    input1: "1 1\n7",
    output1: "7",
    input2: "2 3\n1 2 3\n4 5 6",
    output2: "1 2 3 6 5 4",
    input3: "3 2\n1 2\n3 4\n5 6",
    output3: "1 2 4 6 5 3",
    inputconstrains: "1 <= R, C <= 50, -1000 <= value <= 1000",
    blacklist: "memcpy",
    whitelist: "for (, while (",
    sourcecode: `#include <stdio.h>

int main(void) {
    int r, c;
    scanf("%d %d", &r, &c);
    int a[50][50];
    for (int i = 0; i < r; i++)
        for (int j = 0; j < c; j++)
            scanf("%d", &a[i][j]);
    int top = 0, bottom = r - 1, left = 0, right = c - 1;
    int first = 1;
    while (top <= bottom && left <= right) {
        for (int j = left; j <= right; j++) {
            if (!first) printf(" ");
            printf("%d", a[top][j]);
            first = 0;
        }
        top++;
        for (int i = top; i <= bottom; i++) {
            if (!first) printf(" ");
            printf("%d", a[i][right]);
            first = 0;
        }
        right--;
        if (top <= bottom) {
            for (int j = right; j >= left; j--) {
                if (!first) printf(" ");
                printf("%d", a[bottom][j]);
                first = 0;
            }
            bottom--;
        }
        if (left <= right) {
            for (int i = bottom; i >= top; i--) {
                if (!first) printf(" ");
                printf("%d", a[i][left]);
                first = 0;
            }
            left++;
        }
    }
    printf("\\n");
    return 0;
}
`,
  }),
  codeQ({
    title: "Symmetric Matrix Validator",
    description: `A linear algebra tool checks whether an N x N matrix is symmetric (i.e., m[i][j] == m[j][i] for all i, j). Print 1 if symmetric, 0 otherwise. Do not use qsort.

Input Format:
First line: integer N. Next N lines: N space-separated integers.

Output Format:
A single integer: 1 if symmetric, 0 otherwise.

Constraints:
1 <= N <= 100, -1000 <= value <= 1000`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Transpose and Diagonals",
    sampleinput1: "3\n1 2 3\n2 5 6\n3 6 9",
    sampleoutput1: "1",
    sampleinput2: "3\n1 2 3\n4 5 6\n7 8 9",
    sampleoutput2: "0",
    input1: "1\n7",
    output1: "1",
    input2: "2\n1 0\n0 1",
    output2: "1",
    input3: "2\n1 2\n3 4",
    output3: "0",
    inputconstrains: "1 <= N <= 100, -1000 <= value <= 1000",
    blacklist: "qsort",
    whitelist: "for (",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    int m[100][100];
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            scanf("%d", &m[i][j]);
    int sym = 1;
    for (int i = 0; i < n && sym; i++) {
        for (int j = i + 1; j < n; j++) {
            if (m[i][j] != m[j][i]) { sym = 0; break; }
        }
    }
    printf("%d\\n", sym);
    return 0;
}
`,
  }),
];

/* ────────────────────────────── MCQ QUESTIONS ─────────────────────────────── */
const mcqs = [
  // ── EASY (10) ──────────────────────────────────────────────────────────────
  mcq({
    title: "2D Array Declaration Syntax in C",
    description: "Which line correctly declares a 3x4 matrix of integers in C?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "2D Array Declaration",
    Option1: "int m[3][4];",
    Option2: "int m[3,4];",
    Option3: "int m(3,4);",
    Option4: "matrix m[3][4];",
    CorrectOption: 1,
  }),
  mcq({
    title: "Accessing Matrix Element",
    description: "To access the element in row 2, column 3 of matrix m, you write:",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Matrix Input and Output",
    Option1: "m[2][3]",
    Option2: "m[3][2]",
    Option3: "m(2,3)",
    Option4: "m[2,3]",
    CorrectOption: 1,
  }),
  mcq({
    title: "Matrix Addition Dimension Requirement",
    description: "Two matrices can be added only if:",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Matrix Addition and Subtraction",
    Option1: "They have the same number of rows and the same number of columns",
    Option2: "They have the same number of rows only",
    Option3: "They have the same number of columns only",
    Option4: "One of them is square",
    CorrectOption: 1,
  }),
  mcq({
    title: "Matrix Multiplication Dimension Rule",
    description: "For matrix multiplication A x B to be defined, the dimensions must satisfy:",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Matrix Multiplication",
    Option1: "columns of A equals rows of B",
    Option2: "rows of A equals columns of B",
    Option3: "rows of A equals rows of B",
    Option4: "columns of A equals columns of B",
    CorrectOption: 1,
  }),
  mcq({
    title: "Main Diagonal Element Access",
    description: "For a square matrix m of size N, the main diagonal elements are:",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Transpose and Diagonals",
    Option1: "m[i][i] for i from 0 to N-1",
    Option2: "m[i][0] for i from 0 to N-1",
    Option3: "m[0][i] for i from 0 to N-1",
    Option4: "m[i][N-1-i] for i from 0 to N-1",
    CorrectOption: 1,
  }),
  mcq({
    title: "Nested Loop Matrix Input Pattern",
    description: "To read an R x C matrix, the typical pattern is:",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Matrix Input and Output",
    Option1: "Nested for loops with i over rows and j over columns",
    Option2: "A single for loop over all elements",
    Option3: "A while loop with pointer arithmetic",
    Option4: "A do-while loop reading columns first",
    CorrectOption: 1,
  }),
  mcq({
    title: "Matrix Transpose Definition",
    description: "The transpose of a matrix A is a matrix where:",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Transpose and Diagonals",
    Option1: "Element at (i, j) becomes element at (j, i)",
    Option2: "Element at (i, j) becomes element at (i, N-1-j)",
    Option3: "Element at (i, j) becomes element at (N-1-i, j)",
    Option4: "Element at (i, j) is negated",
    CorrectOption: 1,
  }),
  mcq({
    title: "Checkerboard Pattern Storage",
    description: "To store a checkerboard pattern in a 2D array, you typically:",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Patterns Using Arrays",
    Option1: "Use nested loops and assign based on (i + j) % 2",
    Option2: "Use a single loop",
    Option3: "Use recursion only",
    Option4: "Sort the array first",
    CorrectOption: 1,
  }),
  mcq({
    title: "Row Major Memory Layout in C",
    description: "In C, a 2D array int m[3][4] is stored in memory in:",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "2D Array Declaration",
    Option1: "Row-major order (row 0 first, then row 1, etc.)",
    Option2: "Column-major order (column 0 first, then column 1, etc.)",
    Option3: "Random order",
    Option4: "Diagonal order",
    CorrectOption: 1,
  }),
  mcq({
    title: "Sum of All Matrix Elements Approach",
    description: "To compute the sum of all elements in an R x C matrix, you:",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Matrix Input and Output",
    Option1: "Use nested loops summing each element",
    Option2: "Sum only the diagonal",
    Option3: "Multiply rows by columns",
    Option4: "Subtract rows from columns",
    CorrectOption: 1,
  }),

  // ── MEDIUM (6) ─────────────────────────────────────────────────────────────
  mcq({
    title: "Matrix Addition Result Element Snippet",
    description: "What does the following snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Matrix Addition and Subtraction",
    Option1: "12",
    Option2: "8",
    Option3: "4",
    Option4: "6",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int a[2][2] = {{1, 2}, {3, 4}};
    int b[2][2] = {{5, 6}, {7, 8}};
    int c[2][2];
    for (int i = 0; i < 2; i++)
        for (int j = 0; j < 2; j++)
            c[i][j] = a[i][j] + b[i][j];
    printf("%d\\n", c[1][1]);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Matrix Trace Snippet",
    description: "What does the following snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Transpose and Diagonals",
    Option1: "15",
    Option2: "9",
    Option3: "6",
    Option4: "25",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int m[3][3] = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
    int trace = 0;
    for (int i = 0; i < 3; i++) trace += m[i][i];
    printf("%d\\n", trace);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Matrix Transpose Output Snippet",
    description: "What does the following snippet print to stdout (after trailing-whitespace normalization)?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Transpose and Diagonals",
    Option1: "1 4\n2 5\n3 6",
    Option2: "1 2 3\n4 5 6",
    Option3: "1 2\n3 4\n5 6",
    Option4: "6 5\n4 3\n2 1",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int m[2][3] = {{1, 2, 3}, {4, 5, 6}};
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 2; j++) {
            if (j > 0) printf(" ");
            printf("%d", m[j][i]);
        }
        printf("\\n");
    }
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Matrix Multiplication Element Snippet",
    description: "What does the following snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Matrix Multiplication",
    Option1: "19",
    Option2: "23",
    Option3: "5",
    Option4: "14",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int a[2][2] = {{1, 2}, {3, 4}};
    int b[2][2] = {{5, 6}, {7, 8}};
    int c[2][2] = {{0, 0}, {0, 0}};
    for (int i = 0; i < 2; i++)
        for (int j = 0; j < 2; j++)
            for (int k = 0; k < 2; k++)
                c[i][j] += a[i][k] * b[k][j];
    printf("%d\\n", c[0][0]);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Matrix Multiplication Time Complexity",
    description: "What is the time complexity of the standard triple-loop matrix multiplication for two N x N matrices?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Matrix Multiplication",
    Option1: "O(N^3)",
    Option2: "O(N^2)",
    Option3: "O(N log N)",
    Option4: "O(N)",
    CorrectOption: 1,
  }),
  mcq({
    title: "Checkerboard Pattern Output Snippet",
    description: "What does the following snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Patterns Using Arrays",
    Option1: "1 0 0 1",
    Option2: "0 1 1 0",
    Option3: "1 1 0 0",
    Option4: "0 0 1 1",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int n = 4;
    int grid[4][4];
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            grid[i][j] = ((i + j) % 2 == 0) ? 1 : 0;
    printf("%d %d %d %d\\n", grid[0][0], grid[0][1], grid[1][0], grid[1][1]);
    return 0;
}
`,
    snippetLang: "c",
  }),

  // ── HARD (4) ────────────────────────────────────────────────────────────────
  mcq({
    title: "Matrix 90 Degree Rotation Snippet",
    description: "What does the following snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Patterns Using Arrays",
    Option1: "7 4 1",
    Option2: "1 4 7",
    Option3: "3 6 9",
    Option4: "9 6 3",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int m[3][3] = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
    int r[3][3];
    for (int i = 0; i < 3; i++)
        for (int j = 0; j < 3; j++)
            r[i][j] = m[2 - j][i];
    printf("%d %d %d\\n", r[0][0], r[0][1], r[0][2]);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Spiral Traversal Output Snippet",
    description: "What does the following snippet print to stdout (after trailing-whitespace normalization)?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Matrix Input and Output",
    Option1: "1 2 3 6 9 8 7 4 5",
    Option2: "1 2 3 4 5 6 7 8 9",
    Option3: "9 8 7 4 5 6 1 2 3",
    Option4: "1 4 7 8 9 6 3 2 5",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int m[3][3] = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
    int top = 0, bottom = 2, left = 0, right = 2;
    while (top <= bottom && left <= right) {
        for (int j = left; j <= right; j++) printf("%d ", m[top][j]);
        top++;
        for (int i = top; i <= bottom; i++) printf("%d ", m[i][right]);
        right--;
        for (int j = right; j >= left; j--) printf("%d ", m[bottom][j]);
        bottom--;
        for (int i = bottom; i >= top; i--) printf("%d ", m[i][left]);
        left++;
    }
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Matrix Multiplication Trace Snippet",
    description: "What does the following snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Matrix Multiplication",
    Option1: "58 154",
    Option2: "154 58",
    Option3: "58 154 0",
    Option4: "1 2 3",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int a[2][3] = {{1, 2, 3}, {4, 5, 6}};
    int b[3][2] = {{7, 8}, {9, 10}, {11, 12}};
    int c[2][2] = {{0, 0}, {0, 0}};
    for (int i = 0; i < 2; i++)
        for (int j = 0; j < 2; j++)
            for (int k = 0; k < 3; k++)
                c[i][j] += a[i][k] * b[k][j];
    printf("%d %d\\n", c[0][0], c[1][1]);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Symmetric Matrix Check Snippet",
    description: "What does the following snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Transpose and Diagonals",
    Option1: "1",
    Option2: "0",
    Option3: "9",
    Option4: "6",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int m[3][3] = {{1, 2, 3}, {2, 5, 6}, {3, 6, 9}};
    int sym = 1;
    for (int i = 0; i < 3 && sym; i++) {
        for (int j = i + 1; j < 3; j++) {
            if (m[i][j] != m[j][i]) { sym = 0; break; }
        }
    }
    printf("%d\\n", sym);
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
