/**
 * Builder for Day 14 — "Preprocessor Directives".
 * Emits:
 *   /home/z/my-project/scripts/c-programming/data/day-14.code.json  (20 code questions)
 *   /home/z/my-project/scripts/c-programming/data/day-14.mcq.json   (20 MCQ questions)
 *
 * Subtopics (exact strings from taxonomy.ts):
 *   Macros with define, Include Directive, Conditional Compilation ifdef ifndef,
 *   Macro Functions, Predefined Macros, Pragma Directives
 */
import { writeFileSync } from "node:fs";

const DAY = 14;
const TOPIC = "Preprocessor Directives";
const SUBTOPICS = [
  "Macros with define",
  "Include Directive",
  "Conditional Compilation ifdef ifndef",
  "Macro Functions",
  "Predefined Macros",
  "Pragma Directives",
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
    title: "Circle Area via Pi Macro",
    description:
      "Use #define to declare PI as the integer 3. Read an integer radius r, then compute and print the integer area as PI * r * r.\n\nInput Format:\nA single line containing one integer r.\n\nOutput Format:\nThe integer area PI * r * r.\n\nConstraints:\n1 <= r <= 1000",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Macros with define",
    sampleinput1: "5",
    sampleoutput1: "75",
    sampleinput2: "1",
    sampleoutput2: "3",
    input1: "10",
    output1: "300",
    input2: "0",
    output2: "0",
    input3: "100",
    output3: "30000",
    inputconstrains: "1 <= r <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>
#define PI 3

int main(void) {
    int r;
    if (scanf("%d", &r) != 1) return 0;
    printf("%d\\n", PI * r * r);
    return 0;
}
`,
  }),
  codeQ({
    title: "Hello via stdio Include",
    description:
      "Use #include <stdio.h> to bring in printf. Read a single integer n and print \"Hello <n>\".\n\nInput Format:\nA single line containing one integer n.\n\nOutput Format:\nThe string \"Hello <n>\".\n\nConstraints:\n-10^9 <= n <= 10^9",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Include Directive",
    sampleinput1: "5",
    sampleoutput1: "Hello 5",
    sampleinput2: "0",
    sampleoutput2: "Hello 0",
    input1: "-3",
    output1: "Hello -3",
    input2: "100",
    output2: "Hello 100",
    input3: "42",
    output3: "Hello 42",
    inputconstrains: "-10^9 <= n <= 10^9",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    printf("Hello %d\\n", n);
    return 0;
}
`,
  }),
  codeQ({
    title: "Greeting via Ifdef Selection",
    description:
      "Use #ifdef and #if to choose a greeting macro. With MODE defined as 2, the greeting is \"Hi\". Read an integer n, then print \"<greeting> <n>\".\n\nInput Format:\nA single line containing one integer n.\n\nOutput Format:\nThe string \"Hi <n>\".\n\nConstraints:\n-10^9 <= n <= 10^9",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Conditional Compilation ifdef ifndef",
    sampleinput1: "5",
    sampleoutput1: "Hi 5",
    sampleinput2: "0",
    sampleoutput2: "Hi 0",
    input1: "-3",
    output1: "Hi -3",
    input2: "100",
    output2: "Hi 100",
    input3: "42",
    output3: "Hi 42",
    inputconstrains: "-10^9 <= n <= 10^9",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>
#define MODE 2

#ifdef MODE
#if MODE == 1
#define GREETING "Hello"
#elif MODE == 2
#define GREETING "Hi"
#else
#define GREETING "Hey"
#endif
#else
#define GREETING "Welcome"
#endif

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    printf("%s %d\\n", GREETING, n);
    return 0;
}
`,
  }),
  codeQ({
    title: "Square via Macro Function",
    description:
      "Define a macro function SQUARE(x) that computes ((x) * (x)). Read an integer n, then print SQUARE(n).\n\nInput Format:\nA single line containing one integer n.\n\nOutput Format:\nThe square of n.\n\nConstraints:\n-1000 <= n <= 1000",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Macro Functions",
    sampleinput1: "5",
    sampleoutput1: "25",
    sampleinput2: "0",
    sampleoutput2: "0",
    input1: "-3",
    output1: "9",
    input2: "10",
    output2: "100",
    input3: "1",
    output3: "1",
    inputconstrains: "-1000 <= n <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>
#define SQUARE(x) ((x) * (x))

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    printf("%d\\n", SQUARE(n));
    return 0;
}
`,
  }),
  codeQ({
    title: "Print Source Line Number",
    description:
      "Use the predefined macro __LINE__ to print the source line number where it appears. Read an integer n (ignored in the output), then print the line number on its own line. (The line number is fixed by the source layout.)\n\nInput Format:\nA single line containing one integer n.\n\nOutput Format:\nThe line number where __LINE__ is used.\n\nConstraints:\n-10^9 <= n <= 10^9",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Predefined Macros",
    sampleinput1: "1",
    sampleoutput1: "5",
    sampleinput2: "2",
    sampleoutput2: "5",
    input1: "10",
    output1: "5",
    input2: "-5",
    output2: "5",
    input3: "0",
    output3: "5",
    inputconstrains: "-10^9 <= n <= 10^9",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>
int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int line = __LINE__;
    printf("%d\\n", line);
    return 0;
}
`,
  }),
  codeQ({
    title: "Echo Input with Pragma Once",
    description:
      "Use #pragma once at the top of the source file. Read an integer n and print it back unchanged.\n\nInput Format:\nA single line containing one integer n.\n\nOutput Format:\nThe same integer n.\n\nConstraints:\n-10^9 <= n <= 10^9",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Pragma Directives",
    sampleinput1: "5",
    sampleoutput1: "5",
    sampleinput2: "0",
    sampleoutput2: "0",
    input1: "-3",
    output1: "-3",
    input2: "100",
    output2: "100",
    input3: "42",
    output3: "42",
    inputconstrains: "-10^9 <= n <= 10^9",
    blacklist: "",
    whitelist: "",
    sourcecode: `#pragma once
#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    printf("%d\\n", n);
    return 0;
}
`,
  }),

  /* ─────────── EASY SCENARIO (4) ─────────── */
  codeQ({
    title: "Bank Interest via Rate Macro",
    description:
      "A bank defines INTEREST_RATE as 5 (percent). Read a principal P (integer), compute the integer interest as P * INTEREST_RATE / 100, and print it.\n\nInput Format:\nA single line containing one integer P.\n\nOutput Format:\nThe integer interest.\n\nConstraints:\n1 <= P <= 10^6",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Macros with define",
    sampleinput1: "1000",
    sampleoutput1: "50",
    sampleinput2: "200",
    sampleoutput2: "10",
    input1: "0",
    output1: "0",
    input2: "500",
    output2: "25",
    input3: "100",
    output3: "5",
    inputconstrains: "1 <= P <= 10^6",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>
#define INTEREST_RATE 5

int main(void) {
    int p;
    if (scanf("%d", &p) != 1) return 0;
    int interest = p * INTEREST_RATE / 100;
    printf("%d\\n", interest);
    return 0;
}
`,
  }),
  codeQ({
    title: "Greet User via stdio",
    description:
      "A program uses #include <stdio.h> to greet the user. Read a single-word name (no spaces) and print \"Hello, <name>!\".\n\nInput Format:\nA single line containing one word (the name).\n\nOutput Format:\nThe string \"Hello, <name>!\".\n\nConstraints:\n1 <= name length <= 99, alphabetic characters only",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Include Directive",
    sampleinput1: "Alice",
    sampleoutput1: "Hello, Alice!",
    sampleinput2: "Bob",
    sampleoutput2: "Hello, Bob!",
    input1: "Z",
    output1: "Hello, Z!",
    input2: "World",
    output2: "Hello, World!",
    input3: "Atom",
    output3: "Hello, Atom!",
    inputconstrains: "1 <= name length <= 99, alphabetic characters only",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    char name[100];
    if (scanf("%99s", name) != 1) return 0;
    printf("Hello, %s!\\n", name);
    return 0;
}
`,
  }),
  codeQ({
    title: "Build Mode Banner via Ifdef",
    description:
      "A build system uses #ifdef EXTERNAL_API to switch the build banner. In this build EXTERNAL_API is NOT defined, so the banner is \"BUILTIN <n>\". Read an integer n, then print the banner.\n\nInput Format:\nA single line containing one integer n.\n\nOutput Format:\nThe string \"BUILTIN <n>\".\n\nConstraints:\n-10^9 <= n <= 10^9",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Conditional Compilation ifdef ifndef",
    sampleinput1: "5",
    sampleoutput1: "BUILTIN 5",
    sampleinput2: "0",
    sampleoutput2: "BUILTIN 0",
    input1: "-3",
    output1: "BUILTIN -3",
    input2: "100",
    output2: "BUILTIN 100",
    input3: "42",
    output3: "BUILTIN 42",
    inputconstrains: "-10^9 <= n <= 10^9",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>
#ifdef EXTERNAL_API
#define MODE_STR "EXTERNAL"
#else
#define MODE_STR "BUILTIN"
#endif

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    printf("%s %d\\n", MODE_STR, n);
    return 0;
}
`,
  }),
  codeQ({
    title: "Max of Two via Macro Function",
    description:
      "A math utility defines a macro MAX(a, b). Read two integers a and b, then print the maximum using MAX(a, b).\n\nInput Format:\nA single line with two space-separated integers.\n\nOutput Format:\nThe maximum of a and b.\n\nConstraints:\n-10^9 <= a, b <= 10^9",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Macro Functions",
    sampleinput1: "3 5",
    sampleoutput1: "5",
    sampleinput2: "10 2",
    sampleoutput2: "10",
    input1: "-1 -5",
    output1: "-1",
    input2: "0 0",
    output2: "0",
    input3: "100 200",
    output3: "200",
    inputconstrains: "-10^9 <= a, b <= 10^9",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>
#define MAX(a, b) ((a) > (b) ? (a) : (b))

int main(void) {
    int a, b;
    if (scanf("%d %d", &a, &b) != 2) return 0;
    printf("%d\\n", MAX(a, b));
    return 0;
}
`,
  }),

  /* ─────────── MEDIUM SCENARIO (6) ─────────── */
  codeQ({
    title: "Temperature State via Macros",
    description:
      "A weather tool uses #define FREEZING_POINT 0 and #define BOILING_POINT 100. Read an integer temperature t. Print \"FREEZING\" if t < FREEZING_POINT, \"BOILING\" if t > BOILING_POINT, else \"NORMAL\".\n\nInput Format:\nA single line containing one integer t.\n\nOutput Format:\nOne of \"FREEZING\", \"BOILING\", or \"NORMAL\".\n\nConstraints:\n-1000 <= t <= 1000",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Macros with define",
    sampleinput1: "25",
    sampleoutput1: "NORMAL",
    sampleinput2: "-5",
    sampleoutput2: "FREEZING",
    input1: "150",
    output1: "BOILING",
    input2: "0",
    output2: "NORMAL",
    input3: "100",
    output3: "NORMAL",
    inputconstrains: "-1000 <= t <= 1000",
    blacklist: "const",
    whitelist: "#define, if (",
    sourcecode: `#include <stdio.h>
#define FREEZING_POINT 0
#define BOILING_POINT 100

int main(void) {
    int t;
    if (scanf("%d", &t) != 1) return 0;
    if (t < FREEZING_POINT) {
        printf("FREEZING\\n");
    } else if (t > BOILING_POINT) {
        printf("BOILING\\n");
    } else {
        printf("NORMAL\\n");
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Alpha Check via ctype Include",
    description:
      "A program includes both <stdio.h> and <ctype.h>. Read a single character, then print 'Y' if it is alphabetic, 'N' otherwise.\n\nInput Format:\nA single line containing one character (may be preceded by whitespace).\n\nOutput Format:\nA single character 'Y' or 'N' on its own line.\n\nConstraints:\nThe input is a single ASCII character.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Include Directive",
    sampleinput1: "a",
    sampleoutput1: "Y",
    sampleinput2: "5",
    sampleoutput2: "N",
    input1: "Z",
    output1: "Y",
    input2: "!",
    output2: "N",
    input3: "m",
    output3: "Y",
    inputconstrains: "Input is a single ASCII character",
    blacklist: "const",
    whitelist: "#include, if (",
    sourcecode: `#include <stdio.h>
#include <ctype.h>

int main(void) {
    char c;
    if (scanf(" %c", &c) != 1) return 0;
    if (isalpha((unsigned char)c)) {
        putchar('Y');
    } else {
        putchar('N');
    }
    putchar('\\n');
    return 0;
}
`,
  }),
  codeQ({
    title: "Version Banner via Ifdef Ladder",
    description:
      "A library uses an #ifdef/#else ladder with nested #ifdef to pick a version banner. With VERSION defined as 3, the banner is \"Stable\". Read an integer n, then print \"<banner> <n>\".\n\nInput Format:\nA single line containing one integer n.\n\nOutput Format:\nThe string \"Stable <n>\".\n\nConstraints:\n-10^9 <= n <= 10^9",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Conditional Compilation ifdef ifndef",
    sampleinput1: "5",
    sampleoutput1: "Stable 5",
    sampleinput2: "0",
    sampleoutput2: "Stable 0",
    input1: "-3",
    output1: "Stable -3",
    input2: "100",
    output2: "Stable 100",
    input3: "42",
    output3: "Stable 42",
    inputconstrains: "-10^9 <= n <= 10^9",
    blacklist: "const",
    whitelist: "#ifdef, #define",
    sourcecode: `#include <stdio.h>
#define VERSION 3

#ifdef VERSION
#if VERSION == 1
#define BANNER "Alpha"
#elif VERSION == 2
#define BANNER "Beta"
#elif VERSION == 3
#define BANNER "Stable"
#else
#define BANNER "Unknown"
#endif
#else
#define BANNER "Unversioned"
#endif

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    printf("%s %d\\n", BANNER, n);
    return 0;
}
`,
  }),
  codeQ({
    title: "Absolute Value via ABS Macro",
    description:
      "A math library defines a macro ABS(x) that returns the absolute value. Read an integer n, then print ABS(n).\n\nInput Format:\nA single line containing one integer n.\n\nOutput Format:\nThe absolute value of n.\n\nConstraints:\n-10^9 <= n <= 10^9",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Macro Functions",
    sampleinput1: "-5",
    sampleoutput1: "5",
    sampleinput2: "0",
    sampleoutput2: "0",
    input1: "7",
    output1: "7",
    input2: "-100",
    output2: "100",
    input3: "42",
    output3: "42",
    inputconstrains: "-10^9 <= n <= 10^9",
    blacklist: "abs, fabs",
    whitelist: "#define, ABS(",
    sourcecode: `#include <stdio.h>
#define ABS(x) ((x) < 0 ? -(x) : (x))

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    printf("%d\\n", ABS(n));
    return 0;
}
`,
  }),
  codeQ({
    title: "Debug Line Tag via Predefined Macro",
    description:
      "A debugging tool tags output with the current source line number (via __LINE__). Read an integer n, then print \"Line <line> Value <n>\". The line number is determined by the source layout.\n\nInput Format:\nA single line containing one integer n.\n\nOutput Format:\nThe string \"Line <line> Value <n>\" where <line> is the line number where __LINE__ is used.\n\nConstraints:\n-10^9 <= n <= 10^9",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Predefined Macros",
    sampleinput1: "5",
    sampleoutput1: "Line 5 Value 5",
    sampleinput2: "0",
    sampleoutput2: "Line 5 Value 0",
    input1: "100",
    output1: "Line 5 Value 100",
    input2: "-3",
    output2: "Line 5 Value -3",
    input3: "42",
    output3: "Line 5 Value 42",
    inputconstrains: "-10^9 <= n <= 10^9",
    blacklist: "const",
    whitelist: "__LINE__, if (",
    sourcecode: `#include <stdio.h>
int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int line = __LINE__;
    printf("Line %d Value %d\\n", line, n);
    return 0;
}
`,
  }),
  codeQ({
    title: "Packed Struct Size via Pragma",
    description:
      "A library uses #pragma pack(push, 1) to control struct alignment. Define a struct Packed with a char and an int. Read an integer n, then print \"<n> <sizeof>\" where <sizeof> is the byte size of the packed struct.\n\nInput Format:\nA single line containing one integer n.\n\nOutput Format:\nThe string \"<n> <sizeof>\" (sizeof is the byte size of struct Packed).\n\nConstraints:\n-10^9 <= n <= 10^9",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Pragma Directives",
    sampleinput1: "5",
    sampleoutput1: "5 5",
    sampleinput2: "0",
    sampleoutput2: "0 5",
    input1: "100",
    output1: "100 5",
    input2: "-3",
    output2: "-3 5",
    input3: "42",
    output3: "42 5",
    inputconstrains: "-10^9 <= n <= 10^9",
    blacklist: "const",
    whitelist: "#pragma, struct , if (",
    sourcecode: `#include <stdio.h>
#pragma pack(push, 1)
struct Packed {
    char c;
    int i;
};
#pragma pack(pop)

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    printf("%d %d\\n", n, (int)sizeof(struct Packed));
    return 0;
}
`,
  }),

  /* ─────────── HARD SCENARIO (4) ─────────── */
  codeQ({
    title: "Weight via Gravity Macro",
    description:
      "A physics simulation uses #define GRAVITY 981 (representing 9.81 m/s^2 scaled by 100 for integer math). Read a mass m (kg), then compute weight = m * GRAVITY / 100 (integer division).\n\nInput Format:\nA single line containing one integer m (mass in kg).\n\nOutput Format:\nThe integer weight.\n\nConstraints:\n1 <= m <= 10^6",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Macros with define",
    sampleinput1: "10",
    sampleoutput1: "98",
    sampleinput2: "5",
    sampleoutput2: "49",
    input1: "100",
    output1: "981",
    input2: "0",
    output2: "0",
    input3: "1",
    output3: "9",
    inputconstrains: "1 <= m <= 10^6",
    blacklist: "const, enum",
    whitelist: "#define, GRAVITY",
    sourcecode: `#include <stdio.h>
#define GRAVITY 981

int main(void) {
    int m;
    if (scanf("%d", &m) != 1) return 0;
    int weight = m * GRAVITY / 100;
    printf("%d\\n", weight);
    return 0;
}
`,
  }),
  codeQ({
    title: "Letter Count via Includes",
    description:
      "A text analysis tool includes <stdio.h>, <string.h>, and <ctype.h>. Read a single-line string and count the number of alphabetic characters using isalpha.\n\nInput Format:\nA single line containing the input string.\n\nOutput Format:\nThe count of alphabetic characters.\n\nConstraints:\n1 <= |s| <= 1000",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Include Directive",
    sampleinput1: "Hello World",
    sampleoutput1: "10",
    sampleinput2: "abc123",
    sampleoutput2: "3",
    input1: "!!! ???",
    output1: "0",
    input2: "MixedCase",
    output2: "9",
    input3: "AtomCode 2024",
    output3: "8",
    inputconstrains: "1 <= |s| <= 1000",
    blacklist: "const, sscanf",
    whitelist: "#include, isalpha, if (",
    sourcecode: `#include <stdio.h>
#include <string.h>
#include <ctype.h>

int main(void) {
    char s[1024];
    if (fgets(s, sizeof(s), stdin) == NULL) return 0;
    s[strcspn(s, "\\n")] = 0;
    int count = 0;
    for (int i = 0; s[i]; i++) {
        if (isalpha((unsigned char)s[i])) count++;
    }
    printf("%d\\n", count);
    return 0;
}
`,
  }),
  codeQ({
    title: "Bonus Tier via Nested Ifdef",
    description:
      "A feature-flag system uses nested #ifdef/#else to pick a bonus tier. PRO_FEATURE is NOT defined; BASIC_FEATURE IS defined; the bonus is 10. Read an integer n, then print n + BONUS.\n\nInput Format:\nA single line containing one integer n.\n\nOutput Format:\nThe value n + 10.\n\nConstraints:\n-10^9 <= n <= 10^9",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Conditional Compilation ifdef ifndef",
    sampleinput1: "5",
    sampleoutput1: "15",
    sampleinput2: "0",
    sampleoutput2: "10",
    input1: "-5",
    output1: "5",
    input2: "100",
    output2: "110",
    input3: "1",
    output3: "11",
    inputconstrains: "-10^9 <= n <= 10^9",
    blacklist: "#elif, const",
    whitelist: "#ifdef, #define, BONUS",
    sourcecode: `#include <stdio.h>
#define BASIC_FEATURE 1

#ifdef PRO_FEATURE
#define BONUS 100
#else
#ifdef BASIC_FEATURE
#define BONUS 10
#else
#define BONUS 0
#endif
#endif

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    printf("%d\\n", n + BONUS);
    return 0;
}
`,
  }),
  codeQ({
    title: "Shape Area via Macro Functions",
    description:
      "A geometry library defines macros AREA_RECT(w, h) and AREA_CIRCLE(r) (using PI scaled to 314, then divided by 100 for integer math). Read a shape code (1 = rectangle, 2 = circle) followed by its dimensions, then print the area.\n\nInput Format:\nLine 1: integer shape (1 or 2).\nLine 2: if shape is 1, two integers w and h; if shape is 2, one integer r.\n\nOutput Format:\nThe area as an integer.\n\nConstraints:\nshape in {1, 2}, 1 <= w, h, r <= 1000",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Macro Functions",
    sampleinput1: "1\n3 4",
    sampleoutput1: "12",
    sampleinput2: "2\n5",
    sampleoutput2: "78",
    input1: "1\n5 5",
    output1: "25",
    input2: "2\n1",
    output2: "3",
    input3: "1\n10 20",
    output3: "200",
    inputconstrains: "shape in {1, 2}, 1 <= w, h, r <= 1000",
    blacklist: "const",
    whitelist: "#define, AREA_RECT, AREA_CIRCLE",
    sourcecode: `#include <stdio.h>
#define PI 314
#define AREA_RECT(w, h) ((w) * (h))
#define AREA_CIRCLE(r) ((PI) * (r) * (r) / 100)

int main(void) {
    int shape;
    if (scanf("%d", &shape) != 1) return 0;
    if (shape == 1) {
        int w, h;
        if (scanf("%d %d", &w, &h) != 2) return 0;
        printf("%d\\n", AREA_RECT(w, h));
    } else {
        int r;
        if (scanf("%d", &r) != 1) return 0;
        printf("%d\\n", AREA_CIRCLE(r));
    }
    return 0;
}
`,
  }),
];

/* ────────────────────────────── MCQ QUESTIONS ────────────────────────────── */
const mcqs = [
  /* ─────────── EASY (10) ─────────── */
  mcq({
    title: "Define Macro Purpose",
    description:
      "What does the directive #define PI 3.14 do in a C program?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Macros with define",
    Option1: "Defines PI as a symbolic constant whose occurrences are replaced by 3.14",
    Option2: "Declares a typed variable PI of type double initialized to 3.14",
    Option3: "Allocates 3.14 bytes of memory at the symbol PI",
    Option4: "Imports the constant PI from a math library",
    CorrectOption: 1,
  }),
  mcq({
    title: "Include Directive Action",
    description:
      "What does #include <stdio.h> do at preprocessing time?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Include Directive",
    Option1: "Replaces the directive with the contents of the standard stdio.h header file",
    Option2: "Declares a function named stdio",
    Option3: "Links the standard library at runtime",
    Option4: "Has no effect at all",
    CorrectOption: 1,
  }),
  mcq({
    title: "Ifdef Check Meaning",
    description:
      "What does the directive #ifdef DEBUG check during preprocessing?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Conditional Compilation ifdef ifndef",
    Option1: "Whether DEBUG is defined as a macro (regardless of its value)",
    Option2: "Whether DEBUG is a typed integer variable",
    Option3: "Whether DEBUG equals 1",
    Option4: "Whether DEBUG was declared in a header file",
    CorrectOption: 1,
  }),
  mcq({
    title: "Macro Function Definition Syntax",
    description:
      "Which directive correctly defines a macro function SQUARE(x) that computes the square of x?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Macro Functions",
    Option1: "#define SQUARE(x) ((x) * (x))",
    Option2: "#define SQUARE(x) = (x * x)",
    Option3: "macro SQUARE(x) { return x * x; }",
    Option4: "function SQUARE(x): return x * x;",
    CorrectOption: 1,
  }),
  mcq({
    title: "Line Number Macro",
    description:
      "Which predefined macro expands to the current source line number (an integer) at the point of use?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Predefined Macros",
    Option1: "__LINE__",
    Option2: "__FILE__",
    Option3: "__DATE__",
    Option4: "__FUNC__",
    CorrectOption: 1,
  }),
  mcq({
    title: "Pragma Directive Nature",
    description:
      "What is the role of the #pragma directive in C?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Pragma Directives",
    Option1:
      "It provides implementation-specific directives to the compiler (e.g. controlling alignment or warnings)",
    Option2:
      "It defines a new preprocessor macro",
    Option3: "It includes a header file",
    Option4: "It is required at the start of every C file",
    CorrectOption: 1,
  }),
  mcq({
    title: "Macro vs Const Variable",
    description:
      "What is a key difference between #define PI 3.14 and const double PI = 3.14;?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Macros with define",
    Option1:
      "Macros are pure text substitutions performed by the preprocessor; const variables are typed and have an address in memory",
    Option2:
      "const variables cannot be used in expressions; macros cannot",
    Option3:
      "Macros take priority over const variables at link time",
    Option4:
      "There is no difference between them",
    CorrectOption: 1,
  }),
  mcq({
    title: "Angle Brackets vs Quotes",
    description:
      "What is the difference between #include <header.h> and #include \"header.h\"?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Include Directive",
    Option1:
      "<> searches the system include paths; \"\" searches the current source directory first, then falls back to system paths",
    Option2:
      "\"\" searches only the system paths; <> searches the local directory",
    Option3:
      "Both forms are exactly identical in behavior",
    Option4:
      "<> is for C++ only; \"\" is for C only",
    CorrectOption: 1,
  }),
  mcq({
    title: "Ifndef Inverse Check",
    description:
      "What does the directive #ifndef HEADER_GUARD test?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Conditional Compilation ifdef ifndef",
    Option1: "Whether HEADER_GUARD is NOT currently defined as a macro",
    Option2: "Whether HEADER_GUARD is defined as a macro",
    Option3: "Whether HEADER_GUARD equals 0",
    Option4: "Whether HEADER_GUARD is a function",
    CorrectOption: 1,
  }),
  mcq({
    title: "File Name Macro",
    description:
      "Which predefined macro expands to a string literal containing the current source file name?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Predefined Macros",
    Option1: "__FILE__",
    Option2: "__LINE__",
    Option3: "__TIMESTAMP__",
    Option4: "__STDC__",
    CorrectOption: 1,
  }),

  /* ─────────── MEDIUM (6) — all snippets ─────────── */
  mcq({
    title: "Macro Constant Expansion Output",
    description: "What does the following C snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Macros with define",
    Option1: "12",
    Option2: "9",
    Option3: "6",
    Option4: "Compilation error",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
#define PI 3
int main(void) {
    int r = 2;
    printf("%d\\n", PI * r * r);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Ifdef Selection Output",
    description: "What does the following C snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Conditional Compilation ifdef ifndef",
    Option1: "Hello",
    Option2: "World",
    Option3: "HelloWorld",
    Option4: "Compilation error",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
#define MODE 1
#if MODE == 1
#define MSG "Hello"
#else
#define MSG "World"
#endif
int main(void) {
    printf("%s\\n", MSG);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Macro Function Argument Expansion",
    description:
      "Consider the macro #define SQ(x) ((x) * (x)). What does SQ(3 + 1) expand to and what does it print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Macro Functions",
    Option1: "16",
    Option2: "7",
    Option3: "10",
    Option4: "Compilation error",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
#define SQ(x) ((x) * (x))
int main(void) {
    printf("%d\\n", SQ(3 + 1));
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Line Macro Value",
    description:
      "What does the following C snippet print? (Assume the source layout is exactly as shown.)",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Predefined Macros",
    Option1: "3",
    Option2: "1",
    Option3: "5",
    Option4: "Compilation error",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    printf("%d\\n", __LINE__);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Max Macro Output",
    description: "What does the following C snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Macro Functions",
    Option1: "9",
    Option2: "5",
    Option3: "14",
    Option4: "Compilation error",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
#define MAX(a, b) ((a) > (b) ? (a) : (b))
int main(void) {
    printf("%d\\n", MAX(5, 9));
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Ifdef Defined Macro Output",
    description: "What does the following C snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Conditional Compilation ifdef ifndef",
    Option1: "10",
    Option2: "0",
    Option3: "1",
    Option4: "Compilation error",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
#define VAL 10
#ifdef VAL
int x = VAL;
#else
int x = 0;
#endif
int main(void) {
    printf("%d\\n", x);
    return 0;
}
`,
    snippetLang: "c",
  }),

  /* ─────────── HARD (4) — all snippets ─────────── */
  mcq({
    title: "Macro Double Evaluation Output",
    description:
      "The macro DOUBLE(x) is defined as ((x) + (x)). What does the snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Macro Functions",
    Option1: "100",
    Option2: "20",
    Option3: "50",
    Option4: "Compilation error",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
#define DOUBLE(x) ((x) + (x))
int main(void) {
    int a = 5;
    printf("%d\\n", DOUBLE(a) * DOUBLE(a));
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Version Ladder via Ifdef",
    description:
      "What does the following C snippet print, given VERSION is defined as 2?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Conditional Compilation ifdef ifndef",
    Option1: "v2",
    Option2: "v3+",
    Option3: "v1",
    Option4: "Compilation error",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
#define VERSION 2
#if VERSION >= 3
#define OUT "v3+"
#elif VERSION == 2
#define OUT "v2"
#else
#define OUT "v1"
#endif
int main(void) {
    printf("%s\\n", OUT);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Ifdef Mutates Variable Output",
    description:
      "What does the following C snippet print, given DEBUG is defined?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Conditional Compilation ifdef ifndef",
    Option1: "14",
    Option2: "7",
    Option3: "0",
    Option4: "Compilation error",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
#define DEBUG 1
int main(void) {
    int n = 7;
#ifdef DEBUG
    n = n * 2;
#endif
    printf("%d\\n", n);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "ABS Macro Multiple Calls",
    description: "What does the following C snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Macro Functions",
    Option1: "5 3",
    Option2: "-5 3",
    Option3: "5 -3",
    Option4: "-5 -3",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
#define ABS(x) ((x) < 0 ? -(x) : (x))
int main(void) {
    int a = ABS(-5);
    int b = ABS(3);
    printf("%d %d\\n", a, b);
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
