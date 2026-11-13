/**
 * Builder for Day 3 — "Control Flow (if-else, switch)".
 * Emits:
 *   /home/z/my-project/scripts/c-programming/data/day-03.code.json  (20 code questions)
 *   /home/z/my-project/scripts/c-programming/data/day-03.mcq.json   (20 MCQ questions)
 */
import { writeFileSync } from "node:fs";

const DAY = 3;
const TOPIC = "Control Flow (if-else, switch)";
const SUBTOPICS = [
  "if and if-else Statements",
  "else-if Ladder",
  "Nested if Statements",
  "switch-case Statement",
  "break and continue",
  "Nested Control Structures",
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
    title: "Even Odd Classifier",
    description: `Read an integer and print "Even" if it is divisible by 2, otherwise "Odd". Use an if-else statement.

Input Format:
A single integer N.

Output Format:
Print "Even" or "Odd" on its own line.

Constraints:
-1000000 <= N <= 1000000`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "if and if-else Statements",
    sampleinput1: "4",
    sampleoutput1: "Even",
    sampleinput2: "7",
    sampleoutput2: "Odd",
    input1: "0",
    output1: "Even",
    input2: "-2",
    output2: "Even",
    input3: "-1",
    output3: "Odd",
    inputconstrains: "-1000000 <= N <= 1000000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    if (n % 2 == 0) {
        printf("Even\\n");
    } else {
        printf("Odd\\n");
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Sign Classifier",
    description: `Read an integer and print "Positive", "Negative", or "Zero" based on its sign using an if-else if-else ladder.

Input Format:
A single integer N.

Output Format:
Print "Positive" if N > 0, "Negative" if N < 0, else "Zero".

Constraints:
-1000000 <= N <= 1000000`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "else-if Ladder",
    sampleinput1: "5",
    sampleoutput1: "Positive",
    sampleinput2: "-3",
    sampleoutput2: "Negative",
    input1: "0",
    output1: "Zero",
    input2: "100",
    output2: "Positive",
    input3: "-99",
    output3: "Negative",
    inputconstrains: "-1000000 <= N <= 1000000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    if (n > 0) {
        printf("Positive\\n");
    } else if (n < 0) {
        printf("Negative\\n");
    } else {
        printf("Zero\\n");
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Larger of Two Integers Drill",
    description: `Read two integers and print the larger of the two using an if-else statement.

Input Format:
Two space-separated integers A and B.

Output Format:
Print the maximum of A and B.

Constraints:
-1000000 <= A, B <= 1000000`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "if and if-else Statements",
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

int main(void) {
    int a, b;
    scanf("%d %d", &a, &b);
    if (a > b) {
        printf("%d\\n", a);
    } else {
        printf("%d\\n", b);
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Vowel Consonant Checker",
    description: `Read a single character and print "Vowel" if it is a vowel (a, e, i, o, u in either case), otherwise "Consonant". Use a switch-case statement.

Input Format:
A single character C.

Output Format:
Print "Vowel" or "Consonant" on its own line.

Constraints:
C is an English alphabetic character.`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "switch-case Statement",
    sampleinput1: "a",
    sampleoutput1: "Vowel",
    sampleinput2: "b",
    sampleoutput2: "Consonant",
    input1: "E",
    output1: "Vowel",
    input2: "z",
    output2: "Consonant",
    input3: "I",
    output3: "Vowel",
    inputconstrains: "C is an English alphabetic character",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    char c;
    scanf(" %c", &c);
    switch (c) {
        case 'a': case 'e': case 'i': case 'o': case 'u':
        case 'A': case 'E': case 'I': case 'O': case 'U':
            printf("Vowel\\n");
            break;
        default:
            printf("Consonant\\n");
            break;
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Pass Fail Threshold",
    description: `Read a student's marks (out of 100) and print "Pass" if marks >= 40, otherwise "Fail".

Input Format:
A single integer MARKS.

Output Format:
Print "Pass" or "Fail".

Constraints:
0 <= MARKS <= 100`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "if and if-else Statements",
    sampleinput1: "85",
    sampleoutput1: "Pass",
    sampleinput2: "30",
    sampleoutput2: "Fail",
    input1: "40",
    output1: "Pass",
    input2: "39",
    output2: "Fail",
    input3: "100",
    output3: "Pass",
    inputconstrains: "0 <= MARKS <= 100",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int marks;
    scanf("%d", &marks);
    if (marks >= 40) {
        printf("Pass\\n");
    } else {
        printf("Fail\\n");
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Largest of Three Numbers",
    description: `Read three integers and print the largest using nested if statements.

Input Format:
Three space-separated integers A, B, C.

Output Format:
Print the maximum of the three values.

Constraints:
-1000000 <= A, B, C <= 1000000`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Nested if Statements",
    sampleinput1: "5 3 8",
    sampleoutput1: "8",
    sampleinput2: "10 20 30",
    sampleoutput2: "30",
    input1: "1 1 1",
    output1: "1",
    input2: "100 50 75",
    output2: "100",
    input3: "-1 -2 -3",
    output3: "-1",
    inputconstrains: "-1000000 <= A, B, C <= 1000000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int a, b, c;
    scanf("%d %d %d", &a, &b, &c);
    if (a >= b) {
        if (a >= c) {
            printf("%d\\n", a);
        } else {
            printf("%d\\n", c);
        }
    } else {
        if (b >= c) {
            printf("%d\\n", b);
        } else {
            printf("%d\\n", c);
        }
    }
    return 0;
}
`,
  }),

  // ── EASY SCENARIO (4) ───────────────────────────────────────────────────────
  codeQ({
    title: "ATM Withdrawal Approval",
    description: `An ATM checks whether a customer's requested withdrawal amount does not exceed the available balance. Read the balance and the requested amount and print "Approved" or "Declined".

Input Format:
Two space-separated floating-point values: BALANCE and AMOUNT.

Output Format:
Print "Approved" if AMOUNT <= BALANCE, otherwise "Declined".

Constraints:
0.0 <= BALANCE <= 1000000.0, 0.0 <= AMOUNT <= 1000000.0`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "if and if-else Statements",
    sampleinput1: "1000 500",
    sampleoutput1: "Approved",
    sampleinput2: "100 200",
    sampleoutput2: "Declined",
    input1: "0 0",
    output1: "Approved",
    input2: "100 100",
    output2: "Approved",
    input3: "50 51",
    output3: "Declined",
    inputconstrains: "0.0 <= BALANCE, AMOUNT <= 1000000.0",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    double balance, amount;
    scanf("%lf %lf", &balance, &amount);
    if (amount <= balance) {
        printf("Approved\\n");
    } else {
        printf("Declined\\n");
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Voting Eligibility Check",
    description: `An election officer reads a citizen's age and decides whether they are eligible to vote. Eligibility requires age >= 18.

Input Format:
A single integer AGE.

Output Format:
Print "Eligible" or "Not Eligible".

Constraints:
0 <= AGE <= 150`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "if and if-else Statements",
    sampleinput1: "20",
    sampleoutput1: "Eligible",
    sampleinput2: "15",
    sampleoutput2: "Not Eligible",
    input1: "18",
    output1: "Eligible",
    input2: "17",
    output2: "Not Eligible",
    input3: "65",
    output3: "Eligible",
    inputconstrains: "0 <= AGE <= 150",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int age;
    scanf("%d", &age);
    if (age >= 18) {
        printf("Eligible\\n");
    } else {
        printf("Not Eligible\\n");
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Day Name from Number",
    description: `A scheduling app reads a day number (1-7) and prints the corresponding weekday name using a switch-case statement.

Input Format:
A single integer DAY in [1, 7].

Output Format:
Print "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", or "Sunday" for inputs 1 through 7. Print "Invalid" for any other input.

Constraints:
DAY is an integer.`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "switch-case Statement",
    sampleinput1: "1",
    sampleoutput1: "Monday",
    sampleinput2: "7",
    sampleoutput2: "Sunday",
    input1: "3",
    output1: "Wednesday",
    input2: "5",
    output2: "Friday",
    input3: "8",
    output3: "Invalid",
    inputconstrains: "DAY is an integer",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int d;
    scanf("%d", &d);
    switch (d) {
        case 1: printf("Monday\\n"); break;
        case 2: printf("Tuesday\\n"); break;
        case 3: printf("Wednesday\\n"); break;
        case 4: printf("Thursday\\n"); break;
        case 5: printf("Friday\\n"); break;
        case 6: printf("Saturday\\n"); break;
        case 7: printf("Sunday\\n"); break;
        default: printf("Invalid\\n"); break;
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Season from Month",
    description: `A weather service reads a month number (1-12) and identifies the meteorological season using an else-if ladder:
Mar-May: Spring, Jun-Aug: Summer, Sep-Nov: Autumn, Dec, Jan, Feb: Winter.

Input Format:
A single integer MONTH.

Output Format:
Print "Spring", "Summer", "Autumn", "Winter", or "Invalid" if out of range.

Constraints:
MONTH is an integer.`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "else-if Ladder",
    sampleinput1: "4",
    sampleoutput1: "Spring",
    sampleinput2: "7",
    sampleoutput2: "Summer",
    input1: "10",
    output1: "Autumn",
    input2: "12",
    output2: "Winter",
    input3: "13",
    output3: "Invalid",
    inputconstrains: "MONTH is an integer",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int m;
    scanf("%d", &m);
    if (m >= 3 && m <= 5) {
        printf("Spring\\n");
    } else if (m >= 6 && m <= 8) {
        printf("Summer\\n");
    } else if (m >= 9 && m <= 11) {
        printf("Autumn\\n");
    } else if (m == 12 || m == 1 || m == 2) {
        printf("Winter\\n");
    } else {
        printf("Invalid\\n");
    }
    return 0;
}
`,
  }),

  // ── MEDIUM SCENARIO (6) ────────────────────────────────────────────────────
  codeQ({
    title: "Switch-Based Calculator",
    description: `A pocket calculator reads an operator character and two operands, then performs the corresponding arithmetic operation using a switch-case statement. For division by zero, output 0.00.

Input Format:
Three space-separated tokens: OP (one of +, -, *, /), then two floating-point operands A and B.

Output Format:
Print the result of A OP B to two decimals.

Constraints:
-1000000.0 <= A, B <= 1000000.0`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "switch-case Statement",
    sampleinput1: "+ 5 3",
    sampleoutput1: "8.00",
    sampleinput2: "/ 10 4",
    sampleoutput2: "2.50",
    input1: "* 3 4",
    output1: "12.00",
    input2: "- 10 7",
    output2: "3.00",
    input3: "/ 5 0",
    output3: "0.00",
    inputconstrains: "-1000000.0 <= A, B <= 1000000.0",
    blacklist: "pow",
    whitelist: "switch (, case, break;",
    sourcecode: `#include <stdio.h>

int main(void) {
    char op;
    double a, b;
    scanf(" %c %lf %lf", &op, &a, &b);
    double result = 0.0;
    switch (op) {
        case '+': result = a + b; break;
        case '-': result = a - b; break;
        case '*': result = a * b; break;
        case '/':
            if (b != 0.0) {
                result = a / b;
            } else {
                result = 0.0;
            }
            break;
        default: result = 0.0; break;
    }
    printf("%.2f\\n", result);
    return 0;
}
`,
  }),
  codeQ({
    title: "Cartesian Quadrant Finder",
    description: `A geometry tool reads the (x, y) coordinates of a point and identifies which quadrant it lies in using an if-else if ladder.

Input Format:
Two space-separated integers X and Y.

Output Format:
Print "Quadrant 1", "Quadrant 2", "Quadrant 3", "Quadrant 4", "Axis", or "Origin".

Constraints:
-10000 <= X, Y <= 10000`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "else-if Ladder",
    sampleinput1: "1 1",
    sampleoutput1: "Quadrant 1",
    sampleinput2: "-1 1",
    sampleoutput2: "Quadrant 2",
    input1: "0 0",
    output1: "Origin",
    input2: "0 5",
    output2: "Axis",
    input3: "-2 -3",
    output3: "Quadrant 3",
    inputconstrains: "-10000 <= X, Y <= 10000",
    blacklist: "switch",
    whitelist: "if (, else if",
    sourcecode: `#include <stdio.h>

int main(void) {
    int x, y;
    scanf("%d %d", &x, &y);
    if (x == 0 && y == 0) {
        printf("Origin\\n");
    } else if (x == 0 || y == 0) {
        printf("Axis\\n");
    } else if (x > 0 && y > 0) {
        printf("Quadrant 1\\n");
    } else if (x < 0 && y > 0) {
        printf("Quadrant 2\\n");
    } else if (x < 0 && y < 0) {
        printf("Quadrant 3\\n");
    } else {
        printf("Quadrant 4\\n");
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Triangle Type Classifier",
    description: `A geometry drill reads three side lengths and classifies the triangle as Equilateral, Isosceles, or Scalene. If the sides cannot form a valid triangle, print "Not Triangle" instead. Use nested if statements inside an outer validity check.

Input Format:
Three space-separated integers A, B, C representing the side lengths.

Output Format:
Print "Equilateral", "Isosceles", "Scalene", or "Not Triangle".

Constraints:
1 <= A, B, C <= 10000`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Nested if Statements",
    sampleinput1: "3 3 3",
    sampleoutput1: "Equilateral",
    sampleinput2: "3 3 4",
    sampleoutput2: "Isosceles",
    input1: "3 4 5",
    output1: "Scalene",
    input2: "1 1 5",
    output2: "Not Triangle",
    input3: "5 5 5",
    output3: "Equilateral",
    inputconstrains: "1 <= A, B, C <= 10000",
    blacklist: "switch",
    whitelist: "if (, else if",
    sourcecode: `#include <stdio.h>

int main(void) {
    int a, b, c;
    scanf("%d %d %d", &a, &b, &c);
    if (a + b > c && b + c > a && a + c > b) {
        if (a == b && b == c) {
            printf("Equilateral\\n");
        } else if (a == b || b == c || a == c) {
            printf("Isosceles\\n");
        } else {
            printf("Scalene\\n");
        }
    } else {
        printf("Not Triangle\\n");
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Month Days Printer",
    description: `A calendar utility reads a month number (1-12) and prints how many days that month has in a non-leap year. Use a switch statement that groups cases by fall-through.

Input Format:
A single integer MONTH in [1, 12].

Output Format:
Print the number of days (28, 30, or 31) for the month, or 0 if the month is out of range.

Constraints:
MONTH is an integer.`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "switch-case Statement",
    sampleinput1: "1",
    sampleoutput1: "31",
    sampleinput2: "2",
    sampleoutput2: "28",
    input1: "4",
    output1: "30",
    input2: "12",
    output2: "31",
    input3: "13",
    output3: "0",
    inputconstrains: "MONTH is an integer",
    blacklist: "pow",
    whitelist: "switch (, case",
    sourcecode: `#include <stdio.h>

int main(void) {
    int m;
    scanf("%d", &m);
    int days;
    switch (m) {
        case 1: case 3: case 5: case 7: case 8: case 10: case 12:
            days = 31;
            break;
        case 4: case 6: case 9: case 11:
            days = 30;
            break;
        case 2:
            days = 28;
            break;
        default:
            days = 0;
            break;
    }
    printf("%d\\n", days);
    return 0;
}
`,
  }),
  codeQ({
    title: "Speeding Fine Tier Calculator",
    description: `A traffic police system reads a vehicle's speed (in km/h) and computes the fine using a tiered else-if ladder:
- speed <= 60: fine 0
- 61 to 80: fine 500
- 81 to 100: fine 1000
- above 100: fine 2000

Input Format:
A single integer SPEED.

Output Format:
Print the fine amount as an integer.

Constraints:
0 <= SPEED <= 300`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "else-if Ladder",
    sampleinput1: "50",
    sampleoutput1: "0",
    sampleinput2: "70",
    sampleoutput2: "500",
    input1: "90",
    output1: "1000",
    input2: "120",
    output2: "2000",
    input3: "60",
    output3: "0",
    inputconstrains: "0 <= SPEED <= 300",
    blacklist: "switch",
    whitelist: "else if, if (",
    sourcecode: `#include <stdio.h>

int main(void) {
    int speed;
    scanf("%d", &speed);
    int fine;
    if (speed <= 60) {
        fine = 0;
    } else if (speed <= 80) {
        fine = 500;
    } else if (speed <= 100) {
        fine = 1000;
    } else {
        fine = 2000;
    }
    printf("%d\\n", fine);
    return 0;
}
`,
  }),
  codeQ({
    title: "Traffic Light Action Decoder",
    description: `A traffic light controller reads a single letter (R, Y, G, case-insensitive) and prints the action a driver must take. Use a switch statement with a default case for invalid input.

Input Format:
A single character C.

Output Format:
Print "Stop" for R/r, "Slow" for Y/y, "Go" for G/g, or "Invalid" for any other character.

Constraints:
C is a printable ASCII character.`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "switch-case Statement",
    sampleinput1: "R",
    sampleoutput1: "Stop",
    sampleinput2: "G",
    sampleoutput2: "Go",
    input1: "Y",
    output1: "Slow",
    input2: "r",
    output2: "Stop",
    input3: "X",
    output3: "Invalid",
    inputconstrains: "C is a printable ASCII character",
    blacklist: "pow",
    whitelist: "switch (, default:",
    sourcecode: `#include <stdio.h>

int main(void) {
    char c;
    scanf(" %c", &c);
    switch (c) {
        case 'R': case 'r':
            printf("Stop\\n");
            break;
        case 'Y': case 'y':
            printf("Slow\\n");
            break;
        case 'G': case 'g':
            printf("Go\\n");
            break;
        default:
            printf("Invalid\\n");
            break;
    }
    return 0;
}
`,
  }),

  // ── HARD SCENARIO (4) ──────────────────────────────────────────────────────
  codeQ({
    title: "BMI Health Category Reporter",
    description: `A health clinic records the weight (kg) and height (m) of N patients and computes each patient's BMI = weight / (height * height). It then classifies them:
- BMI < 18.5: Underweight
- 18.5 to 24.9: Normal
- 25 to 29.9: Overweight
- 30 or above: Obese

After processing all patients, print the four category counts.

Input Format:
Line 1: integer N.
Next N lines: two space-separated floating-point values WEIGHT and HEIGHT.

Output Format:
Print four lines:
"Underweight: <count>"
"Normal: <count>"
"Overweight: <count>"
"Obese: <count>"

Constraints:
1 <= N <= 1000, 1.0 <= WEIGHT <= 500.0, 0.5 <= HEIGHT <= 3.0`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Nested Control Structures",
    sampleinput1: "3\n60 1.7\n80 1.8\n100 1.7",
    sampleoutput1: "Underweight: 0\nNormal: 2\nOverweight: 0\nObese: 1",
    sampleinput2: "1\n50 1.6",
    sampleoutput2: "Underweight: 0\nNormal: 1\nOverweight: 0\nObese: 0",
    input1: "1\n45 1.7",
    output1: "Underweight: 1\nNormal: 0\nOverweight: 0\nObese: 0",
    input2: "1\n90 1.7",
    output2: "Underweight: 0\nNormal: 0\nOverweight: 0\nObese: 1",
    input3: "2\n75 1.7\n100 1.7",
    output3: "Underweight: 0\nNormal: 0\nOverweight: 1\nObese: 1",
    inputconstrains: "1 <= N <= 1000, 1.0 <= WEIGHT <= 500.0, 0.5 <= HEIGHT <= 3.0",
    blacklist: "switch, pow",
    whitelist: "if (, else if, for (",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n, i;
    int under = 0, normal = 0, over = 0, obese = 0;
    scanf("%d", &n);
    for (i = 0; i < n; i++) {
        double w, h;
        scanf("%lf %lf", &w, &h);
        double bmi = w / (h * h);
        if (bmi < 18.5) {
            under++;
        } else if (bmi < 25.0) {
            normal++;
        } else if (bmi < 30.0) {
            over++;
        } else {
            obese++;
        }
    }
    printf("Underweight: %d\\n", under);
    printf("Normal: %d\\n", normal);
    printf("Overweight: %d\\n", over);
    printf("Obese: %d\\n", obese);
    return 0;
}
`,
  }),
  codeQ({
    title: "Banking Transaction Processor",
    description: `A bank processes N transactions against an account starting with a balance of 0.0. Each transaction has a type letter and an amount:
- 'D' (deposit): add the amount to the balance.
- 'W' (withdraw): subtract the amount only if it does not exceed the balance; otherwise ignore.
- 'B' (balance check): no change to the balance.

Use a switch on the type, with a nested if for the withdrawal case. Print the final balance.

Input Format:
Line 1: integer N.
Next N lines: a character TYPE and a floating-point AMOUNT, space-separated.

Output Format:
Print the final balance to two decimals.

Constraints:
1 <= N <= 1000, 0.0 <= AMOUNT <= 1000000.0`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Nested Control Structures",
    sampleinput1: "3\nD 1000\nW 500\nW 600",
    sampleoutput1: "500.00",
    sampleinput2: "2\nD 100\nD 50",
    sampleoutput2: "150.00",
    input1: "1\nW 100",
    output1: "0.00",
    input2: "3\nD 500\nW 200\nD 100",
    output2: "400.00",
    input3: "1\nB 0",
    output3: "0.00",
    inputconstrains: "1 <= N <= 1000, 0.0 <= AMOUNT <= 1000000.0",
    blacklist: "pow, malloc",
    whitelist: "switch (, if (, for (",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n, i;
    double balance = 0.0;
    scanf("%d", &n);
    for (i = 0; i < n; i++) {
        char type;
        double amount;
        scanf(" %c %lf", &type, &amount);
        switch (type) {
            case 'D': case 'd':
                balance += amount;
                break;
            case 'W': case 'w':
                if (amount <= balance) {
                    balance -= amount;
                }
                break;
            case 'B': case 'b':
                /* balance check, no change */
                break;
            default:
                break;
        }
    }
    printf("%.2f\\n", balance);
    return 0;
}
`,
  }),
  codeQ({
    title: "Book Loan Status Decoder",
    description: `A library reads N book records. Each record contains a status code (1 = Available, 2 = Borrowed, 3 = Reserved, 4 = Lost) and a member type (0 = Guest, 1 = Member). Based on the status and member type, print one action per book:
- Available: "Available"
- Borrowed: "Return" if Member, "Denied" if Guest
- Reserved: "Pickup" if Member, "Denied" if Guest
- Lost: "Report"
- any other status: "Invalid"

Use a switch on the status with nested if statements for member-only cases.

Input Format:
Line 1: integer N.
Next N lines: two space-separated integers STATUS and MEMBER.

Output Format:
Print one action per line, in input order.

Constraints:
1 <= N <= 1000, STATUS is an integer, MEMBER is 0 or 1`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Nested Control Structures",
    sampleinput1: "3\n1 0\n2 1\n3 0",
    sampleoutput1: "Available\nReturn\nDenied",
    sampleinput2: "2\n4 0\n2 0",
    sampleoutput2: "Report\nDenied",
    input1: "1\n1 1",
    output1: "Available",
    input2: "2\n3 1\n4 1",
    output2: "Pickup\nReport",
    input3: "1\n5 0",
    output3: "Invalid",
    inputconstrains: "1 <= N <= 1000, STATUS is an integer, MEMBER is 0 or 1",
    blacklist: "pow",
    whitelist: "switch (, if (, case",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n, i;
    scanf("%d", &n);
    for (i = 0; i < n; i++) {
        int status, member;
        scanf("%d %d", &status, &member);
        switch (status) {
            case 1:
                printf("Available\\n");
                break;
            case 2:
                if (member == 1) {
                    printf("Return\\n");
                } else {
                    printf("Denied\\n");
                }
                break;
            case 3:
                if (member == 1) {
                    printf("Pickup\\n");
                } else {
                    printf("Denied\\n");
                }
                break;
            case 4:
                printf("Report\\n");
                break;
            default:
                printf("Invalid\\n");
                break;
        }
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Shipping Cost Tier Calculator",
    description: `A courier service computes the cost of shipping N packages. For each package the cost is the sum of a weight tier and a distance tier:
Weight tiers (kg):
- weight <= 1.0: 10.00
- weight <= 5.0: 20.00
- weight <= 10.0: 50.00
- otherwise: 100.00
Distance tiers (km):
- distance <= 100.0: 5.00
- distance <= 500.0: 15.00
- otherwise: 30.00

Print the total cost across all packages.

Input Format:
Line 1: integer N.
Next N lines: two space-separated floating-point values WEIGHT and DISTANCE.

Output Format:
Print the total cost to two decimals.

Constraints:
1 <= N <= 1000, 0.0 <= WEIGHT <= 1000.0, 0.0 <= DISTANCE <= 100000.0`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Nested Control Structures",
    sampleinput1: "1\n0.5 50",
    sampleoutput1: "15.00",
    sampleinput2: "2\n2 200\n10 600",
    sampleoutput2: "115.00",
    input1: "1\n15 1000",
    output1: "130.00",
    input2: "1\n1 100",
    output2: "15.00",
    input3: "3\n0.5 50\n2 200\n15 1000",
    output3: "180.00",
    inputconstrains: "1 <= N <= 1000, 0.0 <= WEIGHT <= 1000.0",
    blacklist: "switch, pow",
    whitelist: "if (, else if, for (",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n, i;
    double total = 0.0;
    scanf("%d", &n);
    for (i = 0; i < n; i++) {
        double weight, distance;
        scanf("%lf %lf", &weight, &distance);
        double cost = 0.0;
        if (weight <= 1.0) {
            cost += 10.0;
        } else if (weight <= 5.0) {
            cost += 20.0;
        } else if (weight <= 10.0) {
            cost += 50.0;
        } else {
            cost += 100.0;
        }
        if (distance <= 100.0) {
            cost += 5.0;
        } else if (distance <= 500.0) {
            cost += 15.0;
        } else {
            cost += 30.0;
        }
        total += cost;
    }
    printf("%.2f\\n", total);
    return 0;
}
`,
  }),
];

/* ────────────────────────────── MCQ QUESTIONS ────────────────────────────── */
const mcqs = [
  // ── EASY (10) ───────────────────────────────────────────────────────────────
  mcq({
    title: "if-else Statement Behavior",
    description: "Which of the following correctly describes the if-else statement in C?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "if and if-else Statements",
    Option1: "if executes its block when the condition is non-zero; otherwise the else block executes",
    Option2: "if requires a semicolon immediately after the condition",
    Option3: "else is mandatory in every if statement",
    Option4: "if statements cannot be nested inside another if",
    CorrectOption: 1,
  }),
  mcq({
    title: "Default Case Purpose",
    description: "What is the purpose of the default case in a switch statement?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "switch-case Statement",
    Option1: "It executes when no case label matches the switch expression",
    Option2: "It must always be the first case in the switch",
    Option3: "It is mandatory in every switch statement",
    Option4: "It executes before any other case, regardless of value",
    CorrectOption: 1,
  }),
  mcq({
    title: "Break Role in Switch",
    description: "Why is break commonly used inside a switch-case statement?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "switch-case Statement",
    Option1: "To exit the switch block and prevent fall-through to subsequent cases",
    Option2: "To skip the current case only without affecting others",
    Option3: "To restart the switch from the first case",
    Option4: "To terminate the entire program immediately",
    CorrectOption: 1,
  }),
  mcq({
    title: "else-if Ladder Evaluation",
    description: "How does an else-if ladder evaluate its conditions?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "else-if Ladder",
    Option1: "Conditions are tested in order; the first true one executes its block and the rest are skipped",
    Option2: "All conditions whose expressions are true will execute their blocks",
    Option3: "Only the last condition in the ladder is ever tested",
    Option4: "Conditions are evaluated in parallel and the earliest finishing wins",
    CorrectOption: 1,
  }),
  mcq({
    title: "Nested if Definition",
    description: "What is a nested if statement?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Nested if Statements",
    Option1: "An if statement placed inside another if or else block",
    Option2: "An if statement with multiple conditions joined by && and ||",
    Option3: "An if statement that has no else clause at all",
    Option4: "An if statement used exclusively inside a for loop",
    CorrectOption: 1,
  }),
  mcq({
    title: "Continue Statement Effect",
    description: "What does the continue statement do inside a loop in C?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "break and continue",
    Option1: "It skips the remaining statements in the current iteration and moves to the next iteration",
    Option2: "It exits the loop immediately",
    Option3: "It restarts the loop from its very first iteration",
    Option4: "It terminates the entire program",
    CorrectOption: 1,
  }),
  mcq({
    title: "Switch on Non-Integer Type",
    description: "Which of the following types CANNOT be the controlling expression of a switch statement in C?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "switch-case Statement",
    Option1: "float",
    Option2: "int",
    Option3: "char",
    Option4: "An enumeration constant",
    CorrectOption: 1,
  }),
  mcq({
    title: "Break Outside Loop or Switch",
    description: "What happens if a break statement appears outside any loop or switch in C?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "break and continue",
    Option1: "It is a compile-time error",
    Option2: "It exits the current function with a default return value",
    Option3: "It does nothing at runtime",
    Option4: "It terminates the entire program",
    CorrectOption: 1,
  }),
  mcq({
    title: "Switch Case Label Type",
    description: "Which of the following is allowed as a case label in a switch statement in C?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "switch-case Statement",
    Option1: "An integer constant expression",
    Option2: "A floating-point constant such as 1.5",
    Option3: "A string literal such as \"abc\"",
    Option4: "A non-const variable name",
    CorrectOption: 1,
  }),
  mcq({
    title: "Stacked Case Labels",
    description: "What is the effect of stacking multiple case labels before a single statement, e.g. case 1: case 2: printf(...); ?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "switch-case Statement",
    Option1: "The same statement executes for any of the listed case values",
    Option2: "Only the last case label triggers the statement",
    Option3: "It is a compile error",
    Option4: "Only the first case label triggers the statement",
    CorrectOption: 1,
  }),

  // ── MEDIUM (6) ─────────────────────────────────────────────────────────────
  mcq({
    title: "Switch Fall-Through Output",
    description: "What does the following program print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "switch-case Statement",
    Option1: "Two Three Default",
    Option2: "Two",
    Option3: "Two Three",
    Option4: "Default",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int n = 2;
    switch (n) {
        case 1: printf("One ");
        case 2: printf("Two ");
        case 3: printf("Three ");
        default: printf("Default");
    }
    printf("\\n");
    return 0;
}`,
    snippetLang: "c",
  }),
  mcq({
    title: "Nested if Outer Else",
    description: "What does the following program print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Nested if Statements",
    Option1: "C",
    Option2: "A",
    Option3: "B",
    Option4: "Nothing is printed",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int a = 5, b = 10, c = 15;
    if (a > b) {
        if (b > c) {
            printf("A\\n");
        } else {
            printf("B\\n");
        }
    } else {
        printf("C\\n");
    }
    return 0;
}`,
    snippetLang: "c",
  }),
  mcq({
    title: "else-if Ladder Output",
    description: "What does the following program print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "else-if Ladder",
    Option1: "Small",
    Option2: "Negative",
    Option3: "Zero",
    Option4: "Large",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int x = 5;
    if (x < 0) {
        printf("Negative\\n");
    } else if (x == 0) {
        printf("Zero\\n");
    } else if (x < 10) {
        printf("Small\\n");
    } else {
        printf("Large\\n");
    }
    return 0;
}`,
    snippetLang: "c",
  }),
  mcq({
    title: "If-Else Maximum Output",
    description: "What does the following program print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "if and if-else Statements",
    Option1: "7",
    Option2: "3",
    Option3: "10",
    Option4: "0",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int a = 7, b = 3;
    int max;
    if (a > b) {
        max = a;
    } else {
        max = b;
    }
    printf("%d\\n", max);
    return 0;
}`,
    snippetLang: "c",
  }),
  mcq({
    title: "Continue in Loop Output",
    description: "What does the following program print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "break and continue",
    Option1: "0 1 3 4",
    Option2: "0 1 2 3 4",
    Option3: "0 1 4",
    Option4: "2",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int i;
    for (i = 0; i < 5; i++) {
        if (i == 2) {
            continue;
        }
        printf("%d ", i);
    }
    printf("\\n");
    return 0;
}`,
    snippetLang: "c",
  }),
  mcq({
    title: "Switch Default Branch",
    description: "What does the following program print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "switch-case Statement",
    Option1: "Other",
    Option2: "A",
    Option3: "B",
    Option4: "Nothing is printed",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    char c = 'x';
    switch (c) {
        case 'a': printf("A\\n"); break;
        case 'b': printf("B\\n"); break;
        default: printf("Other\\n"); break;
    }
    return 0;
}`,
    snippetLang: "c",
  }),

  // ── HARD (4) ───────────────────────────────────────────────────────────────
  mcq({
    title: "Dangling Else Binding",
    description: "What does the following program print? (Recall that an else binds to the nearest unmatched if.)",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Nested if Statements",
    Option1: "Y",
    Option2: "X",
    Option3: "XY",
    Option4: "Nothing is printed",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int a = 1, b = 0;
    if (a == 1)
        if (b == 1)
            printf("X\\n");
    else
        printf("Y\\n");
    return 0;
}`,
    snippetLang: "c",
  }),
  mcq({
    title: "Break Inside Nested Loop",
    description: "What does the following program print? (Whitespace at end of the line is normalized by the judge.)",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Nested Control Structures",
    Option1: "0 1 1",
    Option2: "0 1 1 2",
    Option3: "0 1 2 1 2 2",
    Option4: "1 1",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int i, j;
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            if (i + j == 2) {
                break;
            }
            printf("%d ", i + j);
        }
    }
    printf("\\n");
    return 0;
}`,
    snippetLang: "c",
  }),
  mcq({
    title: "Nested Condition with Modulo",
    description: "What does the following program print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Nested if Statements",
    Option1: "A",
    Option2: "B",
    Option3: "C",
    Option4: "Nothing is printed",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int x = 10, y = 5;
    if (x > 5 && y < 10) {
        if (x % y == 0) {
            printf("A\\n");
        } else {
            printf("B\\n");
        }
    } else {
        printf("C\\n");
    }
    return 0;
}`,
    snippetLang: "c",
  }),
  mcq({
    title: "Stacked Case Labels Output",
    description: "What does the following program print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "switch-case Statement",
    Option1: "Even",
    Option2: "Odd",
    Option3: "Other",
    Option4: "Even Odd",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int n = 6;
    switch (n) {
        case 1: case 3: case 5:
            printf("Odd\\n");
            break;
        case 2: case 4: case 6:
            printf("Even\\n");
            break;
        default:
            printf("Other\\n");
    }
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
