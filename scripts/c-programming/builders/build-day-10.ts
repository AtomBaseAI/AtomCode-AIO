/**
 * Builder for Day 10 — "Array Patterns".
 * Emits:
 *   /home/z/my-project/scripts/c-programming/data/day-10.code.json  (20 code questions)
 *   /home/z/my-project/scripts/c-programming/data/day-10.mcq.json   (20 MCQ questions)
 *
 * Curriculum focus: pattern manipulation USING arrays — every solution
 * stores intermediate values (row cells, Pascal row cache, spiral matrix,
 * diamond ring values) in arrays.
 */
import { writeFileSync } from "node:fs";

const DAY = 10;
const TOPIC = "Array Patterns";
const SUBTOPICS = [
  "Number Patterns Using Arrays",
  "Star and Symbol Patterns",
  "Pyramid Patterns",
  "Hollow Patterns",
  "Floyd and Pascal Triangles",
  "Pattern Manipulation with Arrays",
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
  /* ── EASY BASIC (6) ─────────────────────────────────────────────────────── */
  codeQ({
    title: "Number Row Echo Drill",
    description: `Read a positive integer N and store the values 1, 2, ..., N into an integer array. Print the row on a single line with the numbers space-separated.

Input Format:
A single integer N.

Output Format:
A single line containing N space-separated integers from 1 to N.

Constraints:
1 <= N <= 100`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Number Patterns Using Arrays",
    sampleinput1: "5",
    sampleoutput1: "1 2 3 4 5",
    sampleinput2: "3",
    sampleoutput2: "1 2 3",
    input1: "1",
    output1: "1",
    input2: "7",
    output2: "1 2 3 4 5 6 7",
    input3: "10",
    output3: "1 2 3 4 5 6 7 8 9 10",
    inputconstrains: "1 <= N <= 100",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    int arr[100];
    for (int i = 0; i < n; i++) arr[i] = i + 1;
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
    title: "Number Triangle Echo",
    description: `Read a positive integer N and print N rows. Row i (1-indexed) contains the integers 1 through i stored in an array and printed space-separated.

Input Format:
A single integer N.

Output Format:
N lines. Line i contains i space-separated integers from 1 to i.

Constraints:
1 <= N <= 100`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Number Patterns Using Arrays",
    sampleinput1: "4",
    sampleoutput1: "1\n1 2\n1 2 3\n1 2 3 4",
    sampleinput2: "3",
    sampleoutput2: "1\n1 2\n1 2 3",
    input1: "1",
    output1: "1",
    input2: "5",
    output2: "1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5",
    input3: "2",
    output3: "1\n1 2",
    inputconstrains: "1 <= N <= 100",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    int arr[100];
    for (int i = 0; i < n; i++) arr[i] = i + 1;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j <= i; j++) {
            if (j > 0) printf(" ");
            printf("%d", arr[j]);
        }
        printf("\\n");
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Star Right Triangle Drill",
    description: `Read a positive integer N and print N rows. Row i (1-indexed) contains i star characters. Store the stars in a char array and print from the array.

Input Format:
A single integer N.

Output Format:
N lines. Line i contains i stars.

Constraints:
1 <= N <= 100`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Star and Symbol Patterns",
    sampleinput1: "4",
    sampleoutput1: "*\n**\n***\n****",
    sampleinput2: "2",
    sampleoutput2: "*\n**",
    input1: "1",
    output1: "*",
    input2: "5",
    output2: "*\n**\n***\n****\n*****",
    input3: "3",
    output3: "*\n**\n***",
    inputconstrains: "1 <= N <= 100",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    char row[100];
    for (int i = 0; i < n; i++) row[i] = '*';
    for (int i = 0; i < n; i++) {
        for (int j = 0; j <= i; j++) putchar(row[j]);
        putchar('\\n');
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Symbol Square Grid Drill",
    description: `Read an integer N and a single character symbol. Build a single row of N copies of that symbol in a char array, then print N rows of that stored row.

Input Format:
A single line containing an integer N and a character separated by a space.

Output Format:
N lines, each containing N copies of the symbol.

Constraints:
1 <= N <= 100, symbol is a printable non-space character`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Star and Symbol Patterns",
    sampleinput1: "3 #",
    sampleoutput1: "###\n###\n###",
    sampleinput2: "2 *",
    sampleoutput2: "**\n**",
    input1: "1 $",
    output1: "$",
    input2: "4 +",
    output2: "++++\n++++\n++++\n++++",
    input3: "5 @",
    output3: "@@@@@\n@@@@@\n@@@@@\n@@@@@\n@@@@@",
    inputconstrains: "1 <= N <= 100, symbol is a printable non-space character",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    char sym;
    scanf("%d %c", &n, &sym);
    char row[100];
    for (int i = 0; i < n; i++) row[i] = sym;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) putchar(row[j]);
        putchar('\\n');
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Full Star Pyramid Drill",
    description: `Read a positive integer N and print a full centered star pyramid with N rows. Row i (1-indexed) has 2*i-1 stars, centered with N-i leading spaces. Build each row in a char array.

Input Format:
A single integer N.

Output Format:
N lines, each containing the centered stars.

Constraints:
1 <= N <= 100`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Pyramid Patterns",
    sampleinput1: "4",
    sampleoutput1: "   *\n  ***\n *****\n*******",
    sampleinput2: "3",
    sampleoutput2: "  *\n ***\n*****",
    input1: "1",
    output1: "*",
    input2: "5",
    output2: "    *\n   ***\n  *****\n *******\n*********",
    input3: "2",
    output3: " *\n***",
    inputconstrains: "1 <= N <= 100",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    char row[300];
    for (int i = 0; i < n; i++) {
        int stars = 2 * i + 1;
        int lead = n - 1 - i;
        int k = 0;
        for (int s = 0; s < lead; s++) row[k++] = ' ';
        for (int s = 0; s < stars; s++) row[k++] = '*';
        row[k] = '\\0';
        puts(row);
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Floyd Triangle Drill",
    description: `Read a positive integer N and print N rows of Floyd's triangle. The numbers run consecutively from 1, with row i containing i numbers. Store the current row values in an array before printing.

Input Format:
A single integer N.

Output Format:
N lines of Floyd's triangle, numbers space-separated within each row.

Constraints:
1 <= N <= 100`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Floyd and Pascal Triangles",
    sampleinput1: "4",
    sampleoutput1: "1\n2 3\n4 5 6\n7 8 9 10",
    sampleinput2: "3",
    sampleoutput2: "1\n2 3\n4 5 6",
    input1: "1",
    output1: "1",
    input2: "5",
    output2: "1\n2 3\n4 5 6\n7 8 9 10\n11 12 13 14 15",
    input3: "2",
    output3: "1\n2 3",
    inputconstrains: "1 <= N <= 100",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    int arr[100];
    int v = 1;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j <= i; j++) arr[j] = v++;
        for (int j = 0; j <= i; j++) {
            if (j > 0) printf(" ");
            printf("%d", arr[j]);
        }
        printf("\\n");
    }
    return 0;
}
`,
  }),

  /* ── EASY SCENARIO (4) ─────────────────────────────────────────────────── */
  codeQ({
    title: "Stadium Seat Countdown Triangle",
    description: `A stadium seat row i (1-indexed) has seat labels i, i-1, ..., 1 because seat 1 is closest to the stage. Read the number of rows N and print the seat label triangle, building each row's labels in an array before printing.

Input Format:
A single integer N.

Output Format:
N lines. Line i contains the seat labels from i down to 1, space-separated.

Constraints:
1 <= N <= 100`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Number Patterns Using Arrays",
    sampleinput1: "3",
    sampleoutput1: "1\n2 1\n3 2 1",
    sampleinput2: "4",
    sampleoutput2: "1\n2 1\n3 2 1\n4 3 2 1",
    input1: "1",
    output1: "1",
    input2: "5",
    output2: "1\n2 1\n3 2 1\n4 3 2 1\n5 4 3 2 1",
    input3: "2",
    output3: "1\n2 1",
    inputconstrains: "1 <= N <= 100",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    int arr[100];
    for (int i = 0; i < n; i++) {
        for (int j = 0; j <= i; j++) arr[j] = i + 1 - j;
        for (int j = 0; j <= i; j++) {
            if (j > 0) printf(" ");
            printf("%d", arr[j]);
        }
        printf("\\n");
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Sports Field Star Row",
    description: `A sports field banner decorates each row with alternating star and hash symbols. Row i (1-indexed) has i cells starting with '*' and alternating: '*', '#', '*', '#', ... Store the alternating symbols in an array of size N, then print row i using the first i cells.

Input Format:
A single integer N.

Output Format:
N lines. Line i contains i alternating symbols starting with '*'.

Constraints:
1 <= N <= 100`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Star and Symbol Patterns",
    sampleinput1: "4",
    sampleoutput1: "*\n*#\n*#*\n*#*#",
    sampleinput2: "3",
    sampleoutput2: "*\n*#\n*#*",
    input1: "1",
    output1: "*",
    input2: "5",
    output2: "*\n*#\n*#*\n*#*#\n*#*#*",
    input3: "2",
    output3: "*\n*#",
    inputconstrains: "1 <= N <= 100",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    char arr[100];
    for (int i = 0; i < n; i++) arr[i] = (i % 2 == 0) ? '*' : '#';
    for (int i = 0; i < n; i++) {
        for (int j = 0; j <= i; j++) putchar(arr[j]);
        putchar('\\n');
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Inverted Star Pyramid Stage",
    description: `A stage backdrop has an inverted full star pyramid of N levels. Row i (1-indexed) has 2*(N-i+1)-1 stars centered with i-1 leading spaces. Build each row in a char array.

Input Format:
A single integer N.

Output Format:
N lines of the inverted pyramid, each centered.

Constraints:
1 <= N <= 100`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Pyramid Patterns",
    sampleinput1: "3",
    sampleoutput1: "*****\n ***\n  *",
    sampleinput2: "4",
    sampleoutput2: "*******\n *****\n  ***\n   *",
    input1: "1",
    output1: "*",
    input2: "5",
    output2: "*********\n *******\n  *****\n   ***\n    *",
    input3: "2",
    output3: "***\n *",
    inputconstrains: "1 <= N <= 100",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    char row[300];
    for (int i = 0; i < n; i++) {
        int stars = 2 * (n - i) - 1;
        int lead = i;
        int k = 0;
        for (int s = 0; s < lead; s++) row[k++] = ' ';
        for (int s = 0; s < stars; s++) row[k++] = '*';
        row[k] = '\\0';
        puts(row);
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Multiplication Table Triangle",
    description: `A classroom desk chart shows a multiplication triangle. Row i (1-indexed) contains i*1, i*2, ..., i*i, stored in an array and printed space-separated.

Input Format:
A single integer N.

Output Format:
N lines. Line i contains i multiples of i space-separated.

Constraints:
1 <= N <= 100`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Number Patterns Using Arrays",
    sampleinput1: "4",
    sampleoutput1: "1\n2 4\n3 6 9\n4 8 12 16",
    sampleinput2: "3",
    sampleoutput2: "1\n2 4\n3 6 9",
    input1: "1",
    output1: "1",
    input2: "5",
    output2: "1\n2 4\n3 6 9\n4 8 12 16\n5 10 15 20 25",
    input3: "2",
    output3: "1\n2 4",
    inputconstrains: "1 <= N <= 100",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    int arr[100];
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= i; j++) arr[j - 1] = i * j;
        for (int j = 0; j < i; j++) {
            if (j > 0) printf(" ");
            printf("%d", arr[j]);
        }
        printf("\\n");
    }
    return 0;
}
`,
  }),

  /* ── MEDIUM SCENARIO (6) ───────────────────────────────────────────────── */
  codeQ({
    title: "Hollow Square Frame Builder",
    description: `A garden fence is shaped as a hollow N x N square of stars: only the outer border is '*', the interior is a single space. Build each row in a char array (no memset / memcpy / strcpy allowed — fill cells with explicit loops).

Input Format:
A single integer N.

Output Format:
N lines, each N characters wide, forming a hollow square of stars.

Constraints:
1 <= N <= 100`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Hollow Patterns",
    sampleinput1: "5",
    sampleoutput1: "*****\n*   *\n*   *\n*   *\n*****",
    sampleinput2: "3",
    sampleoutput2: "***\n* *\n***",
    input1: "1",
    output1: "*",
    input2: "4",
    output2: "****\n*  *\n*  *\n****",
    input3: "6",
    output3: "******\n*    *\n*    *\n*    *\n*    *\n******",
    inputconstrains: "1 <= N <= 100",
    blacklist: "memset,memcpy,strcpy",
    whitelist: "for (,char row",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    char row[110];
    for (int i = 0; i < n; i++) {
        int k = 0;
        for (int j = 0; j < n; j++) {
            if (i == 0 || i == n - 1 || j == 0 || j == n - 1) row[k++] = '*';
            else row[k++] = ' ';
        }
        row[k] = '\\0';
        puts(row);
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Pascal Triangle Row Cache",
    description: `A mathematics exhibit prints Pascal's triangle using a single 1D array cache. Start with pascal[0] = 1 and all others 0. For each row i (0-indexed) update in place: for j from i down to 1, pascal[j] += pascal[j-1]. Print row i after each update. Do not use memcpy or any factorial-based formula.

Input Format:
A single integer N (number of rows).

Output Format:
N lines of Pascal's triangle, each row's values space-separated.

Constraints:
1 <= N <= 30`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Floyd and Pascal Triangles",
    sampleinput1: "5",
    sampleoutput1: "1\n1 1\n1 2 1\n1 3 3 1\n1 4 6 4 1",
    sampleinput2: "3",
    sampleoutput2: "1\n1 1\n1 2 1",
    input1: "1",
    output1: "1",
    input2: "6",
    output2: "1\n1 1\n1 2 1\n1 3 3 1\n1 4 6 4 1\n1 5 10 10 5 1",
    input3: "4",
    output3: "1\n1 1\n1 2 1\n1 3 3 1",
    inputconstrains: "1 <= N <= 30",
    blacklist: "memcpy,factorial",
    whitelist: "for (,int pascal",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    int pascal[100];
    for (int k = 0; k < 100; k++) pascal[k] = 0;
    pascal[0] = 1;
    for (int i = 0; i < n; i++) {
        for (int j = i; j >= 1; j--) {
            pascal[j] = pascal[j] + pascal[j - 1];
        }
        for (int j = 0; j <= i; j++) {
            if (j > 0) printf(" ");
            printf("%d", pascal[j]);
        }
        printf("\\n");
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Hollow Right Triangle Border",
    description: `A decorative wall stencil shows a hollow right triangle of size N. Row i (1-indexed) has i cells; the border (first column, last column of the row, first row, and the diagonal j == i-1) is '*', the interior is a space. Build each row in a char array (no memset/memcpy).

Input Format:
A single integer N.

Output Format:
N lines forming the hollow right triangle.

Constraints:
1 <= N <= 100`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Hollow Patterns",
    sampleinput1: "5",
    sampleoutput1: "*\n**\n* *\n*  *\n*****",
    sampleinput2: "4",
    sampleoutput2: "*\n**\n* *\n****",
    input1: "1",
    output1: "*",
    input2: "6",
    output2: "*\n**\n* *\n*  *\n*   *\n******",
    input3: "3",
    output3: "*\n**\n***",
    inputconstrains: "1 <= N <= 100",
    blacklist: "memset,memcpy",
    whitelist: "for (,char row",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    char row[110];
    for (int i = 0; i < n; i++) {
        int k = 0;
        for (int j = 0; j <= i; j++) {
            if (i == 0 || i == n - 1 || j == 0 || j == i) row[k++] = '*';
            else row[k++] = ' ';
        }
        row[k] = '\\0';
        puts(row);
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Mirrored Number Ladder",
    description: `A parking-lot floor numbering sign shows a mirrored number ladder. Row i (1-indexed) has 2*i-1 cells containing i, i-1, ..., 1, ..., i-1, i — i.e. descending from i to 1 then ascending back to i. Build the row in an integer array then print it (no memcpy/strcpy).

Input Format:
A single integer N.

Output Format:
N lines of mirrored numbers, space-separated within each row.

Constraints:
1 <= N <= 100`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Number Patterns Using Arrays",
    sampleinput1: "4",
    sampleoutput1: "1\n2 1 2\n3 2 1 2 3\n4 3 2 1 2 3 4",
    sampleinput2: "3",
    sampleoutput2: "1\n2 1 2\n3 2 1 2 3",
    input1: "1",
    output1: "1",
    input2: "5",
    output2: "1\n2 1 2\n3 2 1 2 3\n4 3 2 1 2 3 4\n5 4 3 2 1 2 3 4 5",
    input3: "2",
    output3: "1\n2 1 2",
    inputconstrains: "1 <= N <= 100",
    blacklist: "memcpy,strcpy",
    whitelist: "for (,int arr",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    int arr[210];
    for (int i = 1; i <= n; i++) {
        int len = 0;
        for (int v = i; v >= 1; v--) arr[len++] = v;
        for (int v = 2; v <= i; v++) arr[len++] = v;
        for (int k = 0; k < len; k++) {
            if (k > 0) printf(" ");
            printf("%d", arr[k]);
        }
        printf("\\n");
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Star Hourglass Builder",
    description: `A theater marquee shows a solid star hourglass 2*N-1 rows tall. Rows 0..N-1 form an inverted pyramid (decreasing stars), rows N..2N-2 mirror back up. Build each row in a char array (no memset).

Input Format:
A single integer N.

Output Format:
2*N-1 lines of the hourglass.

Constraints:
1 <= N <= 100`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Pyramid Patterns",
    sampleinput1: "3",
    sampleoutput1: "*****\n ***\n  *\n ***\n*****",
    sampleinput2: "2",
    sampleoutput2: "***\n *\n***",
    input1: "1",
    output1: "*",
    input2: "4",
    output2: "*******\n *****\n  ***\n   *\n  ***\n *****\n*******",
    input3: "5",
    output3: "*********\n *******\n  *****\n   ***\n    *\n   ***\n  *****\n *******\n*********",
    inputconstrains: "1 <= N <= 100",
    blacklist: "memset",
    whitelist: "for (,char row",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    char row[300];
    int total = 2 * n - 1;
    for (int i = 0; i < total; i++) {
        int stars, lead;
        if (i < n) {
            stars = 2 * (n - i) - 1;
            lead = i;
        } else {
            int k = i - n + 1;
            stars = 2 * k + 1;
            lead = total - 1 - i;
        }
        int idx = 0;
        for (int s = 0; s < lead; s++) row[idx++] = ' ';
        for (int s = 0; s < stars; s++) row[idx++] = '*';
        row[idx] = '\\0';
        puts(row);
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Triangular Number Staircase",
    description: `A staircase step chart shows cumulative triangular numbers. Build an array tri where tri[i-1] = 1 + 2 + ... + i. Row i of the staircase prints tri[0], tri[1], ..., tri[i-1] space-separated. Do not use memcpy/strcpy.

Input Format:
A single integer N.

Output Format:
N lines. Line i contains i cumulative triangular numbers.

Constraints:
1 <= N <= 100`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Pattern Manipulation with Arrays",
    sampleinput1: "4",
    sampleoutput1: "1\n1 3\n1 3 6\n1 3 6 10",
    sampleinput2: "3",
    sampleoutput2: "1\n1 3\n1 3 6",
    input1: "1",
    output1: "1",
    input2: "5",
    output2: "1\n1 3\n1 3 6\n1 3 6 10\n1 3 6 10 15",
    input3: "2",
    output3: "1\n1 3",
    inputconstrains: "1 <= N <= 100",
    blacklist: "memcpy,strcpy",
    whitelist: "for (,int tri",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    int tri[100];
    int sum = 0;
    for (int i = 1; i <= n; i++) {
        sum += i;
        tri[i - 1] = sum;
        for (int j = 0; j < i; j++) {
            if (j > 0) printf(" ");
            printf("%d", tri[j]);
        }
        printf("\\n");
    }
    return 0;
}
`,
  }),

  /* ── HARD SCENARIO (4) ────────────────────────────────────────────────── */
  codeQ({
    title: "Hollow Diamond Border",
    description: `A jewelry template prints a hollow diamond of stars with size N (the diamond has 2*N-1 rows, the middle row spans 2*N-1 columns wide). Only the leftmost and rightmost star of each row are printed; interior cells are spaces; trailing spaces on each line are removed. Build each row in a char array (no memset).

Input Format:
A single integer N.

Output Format:
2*N-1 lines forming the hollow diamond.

Constraints:
1 <= N <= 100`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Hollow Patterns",
    sampleinput1: "3",
    sampleoutput1: "  *\n * *\n*   *\n * *\n  *",
    sampleinput2: "2",
    sampleoutput2: " *\n* *\n *",
    input1: "1",
    output1: "*",
    input2: "4",
    output2: "   *\n  * *\n *   *\n*     *\n *   *\n  * *\n   *",
    input3: "5",
    output3: "    *\n   * *\n  *   *\n *     *\n*       *\n *     *\n  *   *\n   * *\n    *",
    inputconstrains: "1 <= N <= 100",
    blacklist: "memset,memcpy",
    whitelist: "for (,char row",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    char row[410];
    int mid = n - 1;
    int total = 2 * n - 1;
    for (int i = 0; i < total; i++) {
        int d = (i > mid) ? (i - mid) : (mid - i);
        int right = 2 * (n - 1) - d;
        int width = right + 1;
        for (int k = 0; k < width; k++) row[k] = ' ';
        row[d] = '*';
        row[right] = '*';
        row[width] = '\\0';
        puts(row);
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Pascal Triangle Sierpinski Mask",
    description: `A fractal art exhibit overlays Pascal's triangle with a Sierpinski mask. Compute each row of Pascal's triangle in a 1D array (in-place update, same approach as Pascal row cache). For each cell, if the value is odd print '*', otherwise print a space. The result is a left-aligned Sierpinski triangle of N rows. Do not use memcpy or factorial-based formulas.

Input Format:
A single integer N.

Output Format:
N lines of '*' and ' ' characters (no separators between cells).

Constraints:
1 <= N <= 30`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Floyd and Pascal Triangles",
    sampleinput1: "5",
    sampleoutput1: "*\n**\n* *\n****\n*   *",
    sampleinput2: "4",
    sampleoutput2: "*\n**\n* *\n****",
    input1: "1",
    output1: "*",
    input2: "8",
    output2: "*\n**\n* *\n****\n*   *\n**  **\n* * * *\n********",
    input3: "6",
    output3: "*\n**\n* *\n****\n*   *\n**  **",
    inputconstrains: "1 <= N <= 30",
    blacklist: "memcpy,factorial",
    whitelist: "for (,int row",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    int row[100];
    for (int k = 0; k < 100; k++) row[k] = 0;
    row[0] = 1;
    for (int i = 0; i < n; i++) {
        for (int j = i; j >= 1; j--) {
            row[j] = row[j] + row[j - 1];
        }
        for (int j = 0; j <= i; j++) {
            if (row[j] % 2 == 1) putchar('*');
            else putchar(' ');
        }
        putchar('\\n');
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Spiral Number Matrix",
    description: `A logistics warehouse floor uses an N x N grid with shelf numbers arranged in a clockwise inward spiral starting from 1 at the top-left. Build the matrix in a 2D array using four boundary pointers (top, bottom, left, right), then print the matrix. Do not use memset.

Input Format:
A single integer N.

Output Format:
N lines, each with N space-separated integers forming the spiral.

Constraints:
1 <= N <= 100`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Pattern Manipulation with Arrays",
    sampleinput1: "3",
    sampleoutput1: "1 2 3\n8 9 4\n7 6 5",
    sampleinput2: "4",
    sampleoutput2: "1 2 3 4\n12 13 14 5\n11 16 15 6\n10 9 8 7",
    input1: "1",
    output1: "1",
    input2: "5",
    output2: "1 2 3 4 5\n16 17 18 19 6\n15 24 25 20 7\n14 23 22 21 8\n13 12 11 10 9",
    input3: "2",
    output3: "1 2\n4 3",
    inputconstrains: "1 <= N <= 100",
    blacklist: "memset",
    whitelist: "for (,while (",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    int m[100][100];
    int val = 1;
    int top = 0, bottom = n - 1, left = 0, right = n - 1;
    while (top <= bottom && left <= right) {
        for (int j = left; j <= right; j++) m[top][j] = val++;
        top++;
        for (int i = top; i <= bottom; i++) m[i][right] = val++;
        right--;
        if (top <= bottom) {
            for (int j = right; j >= left; j--) m[bottom][j] = val++;
            bottom--;
        }
        if (left <= right) {
            for (int i = bottom; i >= top; i--) m[i][left] = val++;
            left++;
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
    title: "Concentric Diamond Number Frame",
    description: `A clock face plate has a concentric diamond number frame. Build a (2*N-1) by (2*N-1) char array where cell (i,j) inside the diamond (Manhattan distance from center <= N-1) is the digit '0' + (N - distance), and outside the diamond is a space. Print each row, stripping trailing spaces. Do not use memcpy/strcpy/memset.

Input Format:
A single integer N.

Output Format:
2*N-1 lines forming the concentric diamond of digits.

Constraints:
1 <= N <= 9`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Number Patterns Using Arrays",
    sampleinput1: "3",
    sampleoutput1: "  1\n 121\n12321\n 121\n  1",
    sampleinput2: "2",
    sampleoutput2: " 1\n121\n 1",
    input1: "1",
    output1: "1",
    input2: "4",
    output2: "   1\n  121\n 12321\n1234321\n 12321\n  121\n   1",
    input3: "5",
    output3: "    1\n   121\n  12321\n 1234321\n123454321\n 1234321\n  12321\n   121\n    1",
    inputconstrains: "1 <= N <= 9",
    blacklist: "memcpy,strcpy,memset",
    whitelist: "for (,char row",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    char row[410];
    int mid = n - 1;
    int width = 2 * n - 1;
    for (int i = 0; i < width; i++) {
        int k = 0;
        for (int j = 0; j < width; j++) {
            int di = (i > mid) ? (i - mid) : (mid - i);
            int dj = (j > mid) ? (j - mid) : (mid - j);
            int dist = di + dj;
            if (dist <= mid) {
                row[k++] = (char)('0' + (n - dist));
            } else {
                row[k++] = ' ';
            }
        }
        row[k] = '\\0';
        int end = k;
        while (end > 0 && row[end - 1] == ' ') end--;
        row[end] = '\\0';
        puts(row);
    }
    return 0;
}
`,
  }),
];

/* ────────────────────────────── MCQ QUESTIONS ────────────────────────────── */
const mcqs = [
  /* ── EASY (10) ─────────────────────────────────────────────────────────── */
  mcq({
    title: "Array Index Origin",
    description: "In C, the first element of an array arr is accessed using which index?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Number Patterns Using Arrays",
    Option1: "arr[0]",
    Option2: "arr[1]",
    Option3: "arr[first]",
    Option4: "arr(begin)",
    CorrectOption: 1,
  }),
  mcq({
    title: "Partial Array Init Zero Fill",
    description: "In C99, what does the declaration `int arr[5] = {0};` produce?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Number Patterns Using Arrays",
    Option1: "All 5 elements are set to 0",
    Option2: "Only arr[0] is 0; the other four are garbage",
    Option3: "All elements are set to 1",
    Option4: "It causes a compile error",
    CorrectOption: 1,
  }),
  mcq({
    title: "Pyramid Row Star Count",
    description: "In a full centered star pyramid of N rows, the i-th row (1-indexed) contains how many stars?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Pyramid Patterns",
    Option1: "2*i - 1",
    Option2: "i",
    Option3: "i + 1",
    Option4: "2*i",
    CorrectOption: 1,
  }),
  mcq({
    title: "Floyd Triangle Cell Count",
    description: "How many integer values are printed in a Floyd's triangle with N rows?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Floyd and Pascal Triangles",
    Option1: "N*(N+1)/2",
    Option2: "N*N",
    Option3: "N*(N-1)/2",
    Option4: "2*N - 1",
    CorrectOption: 1,
  }),
  mcq({
    title: "Nested Loop Grid Complexity",
    description: "Printing an N x N character grid using two nested for loops has what asymptotic time complexity?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Star and Symbol Patterns",
    Option1: "O(N^2)",
    Option2: "O(N)",
    Option3: "O(N log N)",
    Option4: "O(1)",
    CorrectOption: 1,
  }),
  mcq({
    title: "Char Format Specifier",
    description: "Which printf format specifier is correct for printing a single character in C?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Star and Symbol Patterns",
    Option1: "%c",
    Option2: "%s",
    Option3: "%d",
    Option4: "%ch",
    CorrectOption: 1,
  }),
  mcq({
    title: "Newline Escape Sequence",
    description: "Which escape sequence prints a newline character when used inside a C string literal?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Pyramid Patterns",
    Option1: "\\n",
    Option2: "\\t",
    Option3: "\\r",
    Option4: "/n",
    CorrectOption: 1,
  }),
  mcq({
    title: "Pyramid Leading Space Count",
    description: "In a full centered star pyramid with N rows, the i-th row (1-indexed) has how many leading spaces?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Pyramid Patterns",
    Option1: "N - i",
    Option2: "i - 1",
    Option3: "2*i - 1",
    Option4: "N - 1",
    CorrectOption: 1,
  }),
  mcq({
    title: "Pascal Triangle Row Count",
    description: "How many rows does a Pascal's triangle pattern contain when N is given as the row count?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Floyd and Pascal Triangles",
    Option1: "N",
    Option2: "N + 1",
    Option3: "2*N - 1",
    Option4: "N*(N+1)/2",
    CorrectOption: 1,
  }),
  mcq({
    title: "Triangle Outer Loop Iterations",
    description: "To print a number triangle of N rows using nested loops in C, the outer loop typically iterates how many times?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Number Patterns Using Arrays",
    Option1: "N times",
    Option2: "N - 1 times",
    Option3: "2*N times",
    Option4: "N + 1 times",
    CorrectOption: 1,
  }),

  /* ── MEDIUM (6) ────────────────────────────────────────────────────────── */
  mcq({
    title: "Pascal Row Update Snippet",
    description: "What does this C code print? It initializes a Pascal row cache and performs two in-place row updates.",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Floyd and Pascal Triangles",
    Option1: "1 2 1",
    Option2: "1 1 1",
    Option3: "1 2 3",
    Option4: "2 1 0",
    CorrectOption: 1,
    iscodesnippet: true,
    snippetLang: "c",
    codesnippet: `int p[4] = {0, 0, 0, 0};
p[0] = 1;
for (int j = 1; j >= 1; j--) p[j] += p[j-1];
for (int j = 2; j >= 1; j--) p[j] += p[j-1];
printf("%d %d %d\\n", p[0], p[1], p[2]);`,
  }),
  mcq({
    title: "Hollow Square Row Snippet",
    description: "What does this C code print? It builds a single row of a hollow 4x4 square of stars for the interior row i=1.",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Hollow Patterns",
    Option1: "*  *",
    Option2: "****",
    Option3: "* *",
    Option4: "***",
    CorrectOption: 1,
    iscodesnippet: true,
    snippetLang: "c",
    codesnippet: `char row[5];
int i = 1, n = 4;
for (int j = 0; j < n; j++) {
    if (i == 0 || i == n - 1 || j == 0 || j == n - 1) row[j] = '*';
    else row[j] = ' ';
}
row[n] = '\\0';
printf("%s\\n", row);`,
  }),
  mcq({
    title: "Array Filtered Print Snippet",
    description: "What does this C code print? It iterates an array and only prints elements at even indices.",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Number Patterns Using Arrays",
    Option1: "1 3 5",
    Option2: "1 2 3 4 5",
    Option3: "2 4",
    Option4: "1 3 5 4",
    CorrectOption: 1,
    iscodesnippet: true,
    snippetLang: "c",
    codesnippet: `int arr[5] = {1, 2, 3, 4, 5};
for (int i = 0; i < 5; i++) {
    if (i % 2 == 0) printf("%d ", arr[i]);
    else printf(" ");
}
printf("\\n");`,
  }),
  mcq({
    title: "Pascal Recurrence Rule",
    description: "When computing Pascal's triangle iteratively using a single 1D array p, what is the correct in-place update for an element p[j] in row i (0-indexed) when iterating j from i down to 1?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Floyd and Pascal Triangles",
    Option1: "p[j] = p[j] + p[j-1]",
    Option2: "p[j] = p[j-1] + p[j+1]",
    Option3: "p[j] = p[j] * p[j-1]",
    Option4: "p[j] = i * j",
    CorrectOption: 1,
  }),
  mcq({
    title: "Hollow Border Condition",
    description: "In a hollow N x N square pattern, which boolean condition correctly identifies a border cell at (i, j)?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Hollow Patterns",
    Option1: "i == 0 || i == N-1 || j == 0 || j == N-1",
    Option2: "i == j",
    Option3: "i + j == N - 1",
    Option4: "i < j",
    CorrectOption: 1,
  }),
  mcq({
    title: "Diamond Distance Snippet",
    description: "What does this C code print? It computes Manhattan distance from the centre of a diamond pattern of size n=3.",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Hollow Patterns",
    Option1: "1 0 1",
    Option2: "0 1 2",
    Option3: "0 1 0",
    Option4: "2 1 0",
    CorrectOption: 1,
    iscodesnippet: true,
    snippetLang: "c",
    codesnippet: `int n = 3, mid = 1;
for (int i = 0; i < 3; i++) {
    int d = (i > mid) ? (i - mid) : (mid - i);
    printf("%d ", d);
}
printf("\\n");`,
  }),

  /* ── HARD (4) ──────────────────────────────────────────────────────────── */
  mcq({
    title: "Pascal Parity Mask Snippet",
    description: "What does this C code print? It masks Pascal's row 4 with odd/even parity to '*' or ' '.",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Floyd and Pascal Triangles",
    Option1: "*   *",
    Option2: "*****",
    Option3: "* * *",
    Option4: "** **",
    CorrectOption: 1,
    iscodesnippet: true,
    snippetLang: "c",
    codesnippet: `int row[5] = {1, 4, 6, 4, 1};
for (int j = 0; j < 5; j++) {
    if (row[j] % 2 == 1) putchar('*');
    else putchar(' ');
}
putchar('\\n');`,
  }),
  mcq({
    title: "Spiral Matrix Corner Sum Snippet",
    description: "What does this C code print? It sums the four corner values of a 3x3 spiral matrix.",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Pattern Manipulation with Arrays",
    Option1: "16",
    Option2: "20",
    Option3: "12",
    Option4: "25",
    CorrectOption: 1,
    iscodesnippet: true,
    snippetLang: "c",
    codesnippet: `int m[3][3] = {{1, 2, 3}, {8, 9, 4}, {7, 6, 5}};
int s = m[0][0] + m[0][2] + m[2][0] + m[2][2];
printf("%d\\n", s);`,
  }),
  mcq({
    title: "Spiral Fill Order Rule",
    description: "When building an N x N clockwise inward spiral matrix using four boundary pointers (top, bottom, left, right), in what order are the four sides of each ring filled?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Pattern Manipulation with Arrays",
    Option1: "Top row left-to-right, right column top-to-bottom, bottom row right-to-left, left column bottom-to-top",
    Option2: "Left column first top-to-bottom, then top row, then right column, then bottom row",
    Option3: "Bottom row first left-to-right, then right column, then top row, then left column",
    Option4: "Top row left-to-right, right column bottom-to-top, bottom row left-to-right, left column top-to-bottom",
    CorrectOption: 1,
  }),
  mcq({
    title: "Concentric Diamond Ring Value Snippet",
    description: "What does this C code print? It computes the ring value at cell (i, j) of a concentric diamond of size n=3 with mid=2.",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Number Patterns Using Arrays",
    Option1: "2",
    Option2: "1",
    Option3: "3",
    Option4: "0",
    CorrectOption: 1,
    iscodesnippet: true,
    snippetLang: "c",
    codesnippet: `int mid = 2, n = 3;
int i = 1, j = 2;
int dist = (i > mid ? i - mid : mid - i) + (j > mid ? j - mid : mid - j);
printf("%d\\n", n - dist);`,
  }),
];

/* ────────────────────────────── EMIT ─────────────────────────────────────── */
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
