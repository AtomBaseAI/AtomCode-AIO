/**
 * Builder for Day 19 — "Advanced Topics (Enumerations, Typedef)".
 * Emits:
 *   /home/z/my-project/scripts/c-programming/data/day-19.code.json  (20 code questions)
 *   /home/z/my-project/scripts/c-programming/data/day-19.mcq.json   (20 MCQ questions)
 */
import { writeFileSync } from "node:fs";

const DAY = 19;
const TOPIC = "Advanced Topics (Enumerations, Typedef)";
const SUBTOPICS = [
  "Enumeration Types",
  "enum with Values",
  "typedef Basics",
  "typedef with Structures",
  "typedef with Pointers",
  "Best Practices for Large-Scale Programs",
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
  /* ── EASY · 6 basic ── */
  codeQ({
    title: "Day of Week Enumeration",
    description:
      "Define an enum Day { SUNDAY, MONDAY, ..., SATURDAY }. Read an integer n in [0, 6] and print the three-letter abbreviation for that day (SUN, MON, TUE, WED, THU, FRI, SAT). For out-of-range input print INVALID.\n\nInput Format:\nA single integer n.\n\nOutput Format:\nA single line: the day abbreviation or INVALID.\n\nConstraints:\n-1 <= n <= 10",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Enumeration Types",
    sampleinput1: "0",
    sampleoutput1: "SUN",
    sampleinput2: "3",
    sampleoutput2: "WED",
    input1: "1",
    output1: "MON",
    input2: "6",
    output2: "SAT",
    input3: "7",
    output3: "INVALID",
    inputconstrains: "-1 <= n <= 10",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

typedef enum {
    SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY
} Day;

const char *day_name(Day d) {
    switch (d) {
        case SUNDAY: return "SUN";
        case MONDAY: return "MON";
        case TUESDAY: return "TUE";
        case WEDNESDAY: return "WED";
        case THURSDAY: return "THU";
        case FRIDAY: return "FRI";
        case SATURDAY: return "SAT";
        default: return "INVALID";
    }
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) {
        return 1;
    }
    if (n < 0 || n > 6) {
        printf("INVALID\\n");
    } else {
        printf("%s\\n", day_name((Day)n));
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Explicit Priority Enum Values",
    description:
      "Define an enum Priority with explicit values: LOW=100, MEDIUM=200, HIGH=300, CRITICAL=400. Read an integer in [1, 4] mapping to LOW/MEDIUM/HIGH/CRITICAL respectively. Print the numeric value of the chosen priority. For out-of-range input default to LOW.\n\nInput Format:\nA single integer choice (1-4).\n\nOutput Format:\nA single integer: the priority value.\n\nConstraints:\n0 <= choice <= 10",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "enum with Values",
    sampleinput1: "1",
    sampleoutput1: "100",
    sampleinput2: "3",
    sampleoutput2: "300",
    input1: "2",
    output1: "200",
    input2: "4",
    output2: "400",
    input3: "9",
    output3: "100",
    inputconstrains: "0 <= choice <= 10",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

typedef enum {
    LOW = 100,
    MEDIUM = 200,
    HIGH = 300,
    CRITICAL = 400
} Priority;

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) {
        return 1;
    }
    Priority p;
    switch (n) {
        case 1: p = LOW; break;
        case 2: p = MEDIUM; break;
        case 3: p = HIGH; break;
        case 4: p = CRITICAL; break;
        default: p = LOW; break;
    }
    printf("%d\\n", (int)p);
    return 0;
}
`,
  }),
  codeQ({
    title: "Typedef for Distance Units",
    description:
      "Use typedef to define Kilometers and Meters as aliases for int. Read a distance in kilometers and print the equivalent in meters (1 km = 1000 m).\n\nInput Format:\nA single integer km.\n\nOutput Format:\nA single integer: the distance in meters.\n\nConstraints:\n0 <= km <= 1000",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "typedef Basics",
    sampleinput1: "1",
    sampleoutput1: "1000",
    sampleinput2: "5",
    sampleoutput2: "5000",
    input1: "0",
    output1: "0",
    input2: "10",
    output2: "10000",
    input3: "100",
    output3: "100000",
    inputconstrains: "0 <= km <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

typedef int Kilometers;
typedef int Meters;

int main(void) {
    Kilometers km;
    if (scanf("%d", &km) != 1) {
        return 1;
    }
    Meters m = km * 1000;
    printf("%d\\n", m);
    return 0;
}
`,
  }),
  codeQ({
    title: "Point Struct Manhattan Distance",
    description:
      "Define a typedef struct Point with fields x, y. Read a single point and print its Manhattan distance from the origin (|x| + |y|).\n\nInput Format:\nTwo space-separated integers x and y.\n\nOutput Format:\nA single integer: |x| + |y|.\n\nConstraints:\n-1000 <= x, y <= 1000",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "typedef with Structures",
    sampleinput1: "3 4",
    sampleoutput1: "7",
    sampleinput2: "0 0",
    sampleoutput2: "0",
    input1: "-1 -2",
    output1: "3",
    input2: "5 0",
    output2: "5",
    input3: "-3 3",
    output3: "6",
    inputconstrains: "-1000 <= x, y <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

typedef struct {
    int x;
    int y;
} Point;

int manhattan_from_origin(Point p) {
    int ax = p.x < 0 ? -p.x : p.x;
    int ay = p.y < 0 ? -p.y : p.y;
    return ax + ay;
}

int main(void) {
    Point p;
    if (scanf("%d %d", &p.x, &p.y) != 2) {
        return 1;
    }
    printf("%d\\n", manhattan_from_origin(p));
    return 0;
}
`,
  }),
  codeQ({
    title: "Status Enum Switch",
    description:
      "Define an enum Status { STATUS_OK, STATUS_WARN, STATUS_ERROR }. Read an integer and print the corresponding label: OK, WARN, ERROR. For any other value print UNKNOWN.\n\nInput Format:\nA single integer n.\n\nOutput Format:\nA single line: OK, WARN, ERROR, or UNKNOWN.\n\nConstraints:\n-1 <= n <= 10",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Enumeration Types",
    sampleinput1: "0",
    sampleoutput1: "OK",
    sampleinput2: "2",
    sampleoutput2: "ERROR",
    input1: "1",
    output1: "WARN",
    input2: "3",
    output2: "UNKNOWN",
    input3: "-1",
    output3: "UNKNOWN",
    inputconstrains: "-1 <= n <= 10",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

typedef enum {
    STATUS_OK,
    STATUS_WARN,
    STATUS_ERROR
} Status;

const char *status_label(Status s) {
    switch (s) {
        case STATUS_OK: return "OK";
        case STATUS_WARN: return "WARN";
        case STATUS_ERROR: return "ERROR";
        default: return "UNKNOWN";
    }
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) {
        return 1;
    }
    printf("%s\\n", status_label((Status)n));
    return 0;
}
`,
  }),
  codeQ({
    title: "IntPtr Typedef Dereference",
    description:
      "Define typedef int* IntPtr. Read an integer v, take its address via an IntPtr, and print the value dereferenced from the pointer plus 1.\n\nInput Format:\nA single integer v.\n\nOutput Format:\nA single integer: v + 1.\n\nConstraints:\n-1000 <= v <= 1000",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "typedef with Pointers",
    sampleinput1: "5",
    sampleoutput1: "6",
    sampleinput2: "10",
    sampleoutput2: "11",
    input1: "0",
    output1: "1",
    input2: "-1",
    output2: "0",
    input3: "100",
    output3: "101",
    inputconstrains: "-1000 <= v <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

typedef int *IntPtr;

int main(void) {
    int v;
    if (scanf("%d", &v) != 1) {
        return 1;
    }
    IntPtr p = &v;
    printf("%d\\n", *p + 1);
    return 0;
}
`,
  }),

  /* ── EASY · 4 scenario ── */
  codeQ({
    title: "Traffic Light State Transition",
    description:
      "A traffic light cycles RED -> GREEN -> YELLOW -> RED. Define an enum Light { RED, YELLOW, GREEN }. Read the current state (0=RED, 1=YELLOW, 2=GREEN) and print the next state's integer value.\n\nInput Format:\nA single integer current state.\n\nOutput Format:\nA single integer: the next state (0, 1, or 2).\n\nConstraints:\n-1 <= state <= 5",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Enumeration Types",
    sampleinput1: "0",
    sampleoutput1: "2",
    sampleinput2: "1",
    sampleoutput2: "0",
    input1: "2",
    output1: "1",
    input2: "3",
    output2: "0",
    input3: "-1",
    output3: "0",
    inputconstrains: "-1 <= state <= 5",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

typedef enum {
    RED, YELLOW, GREEN
} Light;

Light next_light(Light current) {
    switch (current) {
        case RED: return GREEN;
        case YELLOW: return RED;
        case GREEN: return YELLOW;
        default: return RED;
    }
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) {
        return 1;
    }
    Light next = next_light((Light)n);
    printf("%d\\n", (int)next);
    return 0;
}
`,
  }),
  codeQ({
    title: "Playing Card Suit Lookup",
    description:
      "A card game uses an enum Suit { HEARTS, DIAMONDS, CLUBS, SPADES }. Read a suit index (0-3) and print its single-letter code (H, D, C, S). For out-of-range input print ?.\n\nInput Format:\nA single integer suit index.\n\nOutput Format:\nA single character code followed by a newline.\n\nConstraints:\n-1 <= suit <= 10",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Enumeration Types",
    sampleinput1: "0",
    sampleoutput1: "H",
    sampleinput2: "1",
    sampleoutput2: "D",
    input1: "2",
    output1: "C",
    input2: "3",
    output2: "S",
    input3: "4",
    output3: "?",
    inputconstrains: "-1 <= suit <= 10",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

typedef enum {
    HEARTS, DIAMONDS, CLUBS, SPADES
} Suit;

char suit_code(Suit s) {
    switch (s) {
        case HEARTS: return 'H';
        case DIAMONDS: return 'D';
        case CLUBS: return 'C';
        case SPADES: return 'S';
        default: return '?';
    }
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) {
        return 1;
    }
    if (n < 0 || n > 3) {
        printf("?\\n");
    } else {
        printf("%c\\n", suit_code((Suit)n));
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Quarterly Bonus Payout Reporter",
    description:
      "A payroll system stores employees using typedef struct Employee { int id; int salary; }. Read id and salary, compute a 10% bonus, and print id and total (salary + bonus) on one line.\n\nInput Format:\nTwo space-separated integers: id and salary.\n\nOutput Format:\nA single line: id total.\n\nConstraints:\n1 <= id <= 10000, 0 <= salary <= 100000",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "typedef with Structures",
    sampleinput1: "1 1000",
    sampleoutput1: "1 1100",
    sampleinput2: "2 500",
    sampleoutput2: "2 550",
    input1: "3 0",
    output1: "3 0",
    input2: "4 10000",
    output2: "4 11000",
    input3: "5 50",
    output3: "5 55",
    inputconstrains: "1 <= id <= 10000, 0 <= salary <= 100000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

typedef struct {
    int id;
    int salary;
} Employee;

int total_with_bonus(Employee e) {
    int bonus = e.salary / 10;
    return e.salary + bonus;
}

int main(void) {
    Employee e;
    if (scanf("%d %d", &e.id, &e.salary) != 2) {
        return 1;
    }
    printf("%d %d\\n", e.id, total_with_bonus(e));
    return 0;
}
`,
  }),
  codeQ({
    title: "HTTP Status Code Lookup",
    description:
      "An HTTP server uses an enum HttpStatus with explicit values HTTP_OK=200, HTTP_NOT_FOUND=404, HTTP_SERVER_ERROR=500. Read a numeric status code and print \"code LABEL\" if known (OK, NOT_FOUND, SERVER_ERROR), else print \"0 UNKNOWN\".\n\nInput Format:\nA single integer HTTP status code.\n\nOutput Format:\nA single line: code LABEL, or 0 UNKNOWN.\n\nConstraints:\n0 <= code <= 600",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "enum with Values",
    sampleinput1: "200",
    sampleoutput1: "200 OK",
    sampleinput2: "404",
    sampleoutput2: "404 NOT_FOUND",
    input1: "500",
    output1: "500 SERVER_ERROR",
    input2: "403",
    output2: "0 UNKNOWN",
    input3: "301",
    output3: "0 UNKNOWN",
    inputconstrains: "0 <= code <= 600",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

typedef enum {
    HTTP_OK = 200,
    HTTP_NOT_FOUND = 404,
    HTTP_SERVER_ERROR = 500
} HttpStatus;

const char *http_label(HttpStatus s) {
    switch (s) {
        case HTTP_OK: return "OK";
        case HTTP_NOT_FOUND: return "NOT_FOUND";
        case HTTP_SERVER_ERROR: return "SERVER_ERROR";
        default: return "UNKNOWN";
    }
}

int main(void) {
    int code;
    if (scanf("%d", &code) != 1) {
        return 1;
    }
    if (code == HTTP_OK) {
        printf("%d %s\\n", HTTP_OK, http_label(HTTP_OK));
    } else if (code == HTTP_NOT_FOUND) {
        printf("%d %s\\n", HTTP_NOT_FOUND, http_label(HTTP_NOT_FOUND));
    } else if (code == HTTP_SERVER_ERROR) {
        printf("%d %s\\n", HTTP_SERVER_ERROR, http_label(HTTP_SERVER_ERROR));
    } else {
        printf("0 UNKNOWN\\n");
    }
    return 0;
}
`,
  }),

  /* ── MEDIUM · 6 scenario (blacklist + whitelist) ── */
  codeQ({
    title: "Color Brightness via Enum Switch",
    description:
      "A graphics module defines enum Color { COLOR_RED=1, COLOR_GREEN=2, COLOR_BLUE=3, COLOR_BLACK=10 }. Read a color code and look up its brightness via a switch on the Color enum (RED=50, GREEN=100, BLUE=75, BLACK=0, default 0). Print the brightness value. Do not use pow or goto.\n\nInput Format:\nA single integer color code.\n\nOutput Format:\nA single integer: brightness.\n\nConstraints:\n0 <= code <= 99",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "enum with Values",
    sampleinput1: "1",
    sampleoutput1: "50",
    sampleinput2: "2",
    sampleoutput2: "100",
    input1: "3",
    output1: "75",
    input2: "10",
    output2: "0",
    input3: "99",
    output3: "0",
    inputconstrains: "0 <= code <= 99",
    blacklist: "pow, goto",
    whitelist: "enum , Color, switch (",
    sourcecode: `#include <stdio.h>

typedef enum {
    COLOR_RED = 1,
    COLOR_GREEN = 2,
    COLOR_BLUE = 3,
    COLOR_BLACK = 10
} Color;

int brightness_of(Color c) {
    switch (c) {
        case COLOR_RED: return 50;
        case COLOR_GREEN: return 100;
        case COLOR_BLUE: return 75;
        case COLOR_BLACK: return 0;
        default: return 0;
    }
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) {
        return 1;
    }
    Color c;
    switch (n) {
        case COLOR_RED: c = COLOR_RED; break;
        case COLOR_GREEN: c = COLOR_GREEN; break;
        case COLOR_BLUE: c = COLOR_BLUE; break;
        case COLOR_BLACK: c = COLOR_BLACK; break;
        default: c = COLOR_BLACK; break;
    }
    printf("%d\\n", brightness_of(c));
    return 0;
}
`,
  }),
  codeQ({
    title: "Point Distance with Typedef Struct",
    description:
      "Define typedef struct Point { int x, y; }. Read two points (p1 and p2, each on its own line) and print their Manhattan distance (|p1.x-p2.x| + |p1.y-p2.y|). Do not use pow or sqrt.\n\nInput Format:\nLine 1: x1 y1. Line 2: x2 y2.\n\nOutput Format:\nA single integer: the Manhattan distance.\n\nConstraints:\n-1000 <= coordinates <= 1000",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "typedef with Structures",
    sampleinput1: "0 0\n3 4",
    sampleoutput1: "7",
    sampleinput2: "1 1\n1 1",
    sampleoutput2: "0",
    input1: "0 0\n0 5",
    output1: "5",
    input2: "-1 -1\n2 3",
    output2: "7",
    input3: "10 10\n0 0",
    output3: "20",
    inputconstrains: "-1000 <= coordinates <= 1000",
    blacklist: "pow, sqrt",
    whitelist: "typedef struct, Point, return",
    sourcecode: `#include <stdio.h>

typedef struct {
    int x;
    int y;
} Point;

int manhattan(Point a, Point b) {
    int dx = a.x - b.x;
    int dy = a.y - b.y;
    if (dx < 0) dx = -dx;
    if (dy < 0) dy = -dy;
    return dx + dy;
}

int main(void) {
    Point p1, p2;
    if (scanf("%d %d", &p1.x, &p1.y) != 2) {
        return 1;
    }
    if (scanf("%d %d", &p2.x, &p2.y) != 2) {
        return 1;
    }
    printf("%d\\n", manhattan(p1, p2));
    return 0;
}
`,
  }),
  codeQ({
    title: "Function Pointer BinOp Dispatch",
    description:
      "Define typedef int (*BinOp)(int, int) and three functions add, sub, mul. Read op (1=add, 2=sub, 3=mul) and two integers a, b. Dispatch via a BinOp variable and print the result. Default op (any other value) acts as add. Do not use pow or goto.\n\nInput Format:\nThree space-separated integers: op a b.\n\nOutput Format:\nA single integer: the result.\n\nConstraints:\n-1000 <= a, b <= 1000",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "typedef with Pointers",
    sampleinput1: "1 3 4",
    sampleoutput1: "7",
    sampleinput2: "2 10 4",
    sampleoutput2: "6",
    input1: "3 5 6",
    output1: "30",
    input2: "1 -1 1",
    output2: "0",
    input3: "3 7 8",
    output3: "56",
    inputconstrains: "-1000 <= a, b <= 1000",
    blacklist: "pow, goto",
    whitelist: "typedef, (*BinOp), switch (",
    sourcecode: `#include <stdio.h>

typedef int (*BinOp)(int, int);

static int add(int a, int b) { return a + b; }
static int sub(int a, int b) { return a - b; }
static int mul(int a, int b) { return a * b; }

int main(void) {
    int op, a, b;
    if (scanf("%d %d %d", &op, &a, &b) != 3) {
        return 1;
    }
    BinOp fn;
    switch (op) {
        case 1: fn = add; break;
        case 2: fn = sub; break;
        case 3: fn = mul; break;
        default: fn = add; break;
    }
    printf("%d\\n", fn(a, b));
    return 0;
}
`,
  }),
  codeQ({
    title: "Permission Flag Enumeration",
    description:
      "A file system uses enum Flag { FLAG_A=1<<0, FLAG_B=1<<1, FLAG_C=1<<2, FLAG_D=1<<3 }. Read an integer bitmask n. Build a Flag value by OR'ing in each flag whose bit is set in n. Print the count of flags actually set in the resulting Flag value. Do not use pow or goto.\n\nInput Format:\nA single integer n in [0, 15].\n\nOutput Format:\nA single integer: count of set flags.\n\nConstraints:\n0 <= n <= 15",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "enum with Values",
    sampleinput1: "1",
    sampleoutput1: "1",
    sampleinput2: "3",
    sampleoutput2: "2",
    input1: "7",
    output1: "3",
    input2: "15",
    output2: "4",
    input3: "0",
    output3: "0",
    inputconstrains: "0 <= n <= 15",
    blacklist: "pow, goto",
    whitelist: "enum , Flag, |=",
    sourcecode: `#include <stdio.h>

typedef enum {
    FLAG_A = 1 << 0,
    FLAG_B = 1 << 1,
    FLAG_C = 1 << 2,
    FLAG_D = 1 << 3
} Flag;

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) {
        return 1;
    }
    Flag mask = (Flag)0;
    if (n & 1) mask |= FLAG_A;
    if (n & 2) mask |= FLAG_B;
    if (n & 4) mask |= FLAG_C;
    if (n & 8) mask |= FLAG_D;
    int count = 0;
    if (mask & FLAG_A) count++;
    if (mask & FLAG_B) count++;
    if (mask & FLAG_C) count++;
    if (mask & FLAG_D) count++;
    printf("%d\\n", count);
    return 0;
}
`,
  }),
  codeQ({
    title: "Matrix Trace via Typedef",
    description:
      "Define typedef int Matrix[3][3]. Read 9 integers row-by-row, compute the trace (sum of diagonal m[0][0] + m[1][1] + m[2][2]) and print it. Do not use pow or goto.\n\nInput Format:\nThree lines of three space-separated integers each.\n\nOutput Format:\nA single integer: the trace.\n\nConstraints:\n-1000 <= matrix values <= 1000",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "typedef Basics",
    sampleinput1: "1 0 0\n0 1 0\n0 0 1",
    sampleoutput1: "3",
    sampleinput2: "2 0 0\n0 3 0\n0 0 4",
    sampleoutput2: "9",
    input1: "0 0 0\n0 0 0\n0 0 0",
    output1: "0",
    input2: "5 5 5\n5 5 5\n5 5 5",
    output2: "15",
    input3: "-1 -2 -3\n-4 -5 -6\n-7 -8 -9",
    output3: "-15",
    inputconstrains: "-1000 <= matrix values <= 1000",
    blacklist: "pow, goto",
    whitelist: "typedef, Matrix, for (",
    sourcecode: `#include <stdio.h>

typedef int Matrix[3][3];

int trace(Matrix m) {
    int t = 0;
    for (int i = 0; i < 3; i++) {
        t += m[i][i];
    }
    return t;
}

int main(void) {
    Matrix m;
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            if (scanf("%d", &m[i][j]) != 1) {
                return 1;
            }
        }
    }
    printf("%d\\n", trace(m));
    return 0;
}
`,
  }),
  codeQ({
    title: "Order Status Transition Machine",
    description:
      "An e-commerce backend uses enum OrderStatus { ORDER_PENDING, ORDER_PROCESSING, ORDER_SHIPPED, ORDER_DELIVERED, ORDER_CANCELLED }. Read a current status (0-4) and print the next status according to the rules: PENDING->PROCESSING, PROCESSING->SHIPPED, SHIPPED->DELIVERED, DELIVERED->DELIVERED (terminal), CANCELLED->CANCELLED (terminal). Do not use pow or goto.\n\nInput Format:\nA single integer current status (0-4).\n\nOutput Format:\nA single integer: the next status.\n\nConstraints:\n0 <= status <= 4",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Enumeration Types",
    sampleinput1: "0",
    sampleoutput1: "1",
    sampleinput2: "1",
    sampleoutput2: "2",
    input1: "2",
    output1: "3",
    input2: "3",
    output2: "3",
    input3: "4",
    output3: "4",
    inputconstrains: "0 <= status <= 4",
    blacklist: "pow, goto",
    whitelist: "enum , OrderStatus, return",
    sourcecode: `#include <stdio.h>

typedef enum {
    ORDER_PENDING,
    ORDER_PROCESSING,
    ORDER_SHIPPED,
    ORDER_DELIVERED,
    ORDER_CANCELLED
} OrderStatus;

OrderStatus next_status(OrderStatus current) {
    switch (current) {
        case ORDER_PENDING: return ORDER_PROCESSING;
        case ORDER_PROCESSING: return ORDER_SHIPPED;
        case ORDER_SHIPPED: return ORDER_DELIVERED;
        case ORDER_DELIVERED: return ORDER_DELIVERED;
        case ORDER_CANCELLED: return ORDER_CANCELLED;
        default: return ORDER_PENDING;
    }
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) {
        return 1;
    }
    OrderStatus next = next_status((OrderStatus)n);
    printf("%d\\n", (int)next);
    return 0;
}
`,
  }),

  /* ── HARD · 4 scenario (blacklist + whitelist) ── */
  codeQ({
    title: "Function Pointer Table Calculator",
    description:
      "Implement a calculator using a typedef'd function pointer BinOp and a lookup table ops[5] indexed by opcode (1=add, 2=sub, 3=mul, 4=div with zero-divisor returning 0). Read op a b. For op out of [1,4], print 0. Dispatch via the table and print the result. Do not use pow or goto.\n\nInput Format:\nThree space-separated integers: op a b.\n\nOutput Format:\nA single integer: the computed result.\n\nConstraints:\n-1000 <= a, b <= 1000, op in [-1, 10]",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Best Practices for Large-Scale Programs",
    sampleinput1: "1 5 3",
    sampleoutput1: "8",
    sampleinput2: "2 10 4",
    sampleoutput2: "6",
    input1: "3 7 8",
    output1: "56",
    input2: "4 100 5",
    output2: "20",
    input3: "4 10 0",
    output3: "0",
    inputconstrains: "-1000 <= a, b <= 1000, op in [-1, 10]",
    blacklist: "pow, goto",
    whitelist: "typedef, (*BinOp), [5]",
    sourcecode: `#include <stdio.h>

typedef int (*BinOp)(int, int);

static int op_add(int a, int b) { return a + b; }
static int op_sub(int a, int b) { return a - b; }
static int op_mul(int a, int b) { return a * b; }
static int op_div(int a, int b) { return (b == 0) ? 0 : a / b; }

static BinOp ops[5] = { 0, op_add, op_sub, op_mul, op_div };

int main(void) {
    int op, a, b;
    if (scanf("%d %d %d", &op, &a, &b) != 3) {
        return 1;
    }
    if (op < 1 || op > 4) {
        printf("0\\n");
        return 0;
    }
    BinOp fn = ops[op];
    printf("%d\\n", fn(a, b));
    return 0;
}
`,
  }),
  codeQ({
    title: "Inventory Value with Typedef Struct",
    description:
      "An inventory system uses enum Category { CAT_ELECTRONICS, CAT_CLOTHING, CAT_FOOD, CAT_BOOKS } and typedef struct Product { int id; int quantity; int unit_price; Category cat; }. Read id, quantity, unit_price, category (0-3). Compute the total value (quantity * unit_price) and print \"id value\". Do not use pow or goto.\n\nInput Format:\nFour space-separated integers: id, quantity, unit_price, category.\n\nOutput Format:\nA single line: id value.\n\nConstraints:\n1 <= id <= 10000, 0 <= quantity <= 1000, 0 <= unit_price <= 10000, 0 <= category <= 3",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "typedef with Structures",
    sampleinput1: "1 5 10 0",
    sampleoutput1: "1 50",
    sampleinput2: "2 3 100 1",
    sampleoutput2: "2 300",
    input1: "3 0 50 2",
    output1: "3 0",
    input2: "4 7 25 3",
    output2: "4 175",
    input3: "5 1 1000 0",
    output3: "5 1000",
    inputconstrains: "1 <= id <= 10000, 0 <= quantity, unit_price <= 10000",
    blacklist: "pow, goto",
    whitelist: "enum , typedef struct, Category, Product",
    sourcecode: `#include <stdio.h>

typedef enum {
    CAT_ELECTRONICS,
    CAT_CLOTHING,
    CAT_FOOD,
    CAT_BOOKS
} Category;

typedef struct {
    int id;
    int quantity;
    int unit_price;
    Category cat;
} Product;

int total_value(Product p) {
    return p.quantity * p.unit_price;
}

int main(void) {
    Product p;
    int cat;
    if (scanf("%d %d %d %d", &p.id, &p.quantity, &p.unit_price, &cat) != 4) {
        return 1;
    }
    p.cat = (Category)cat;
    printf("%d %d\\n", p.id, total_value(p));
    return 0;
}
`,
  }),
  codeQ({
    title: "Process State Machine via Enum",
    description:
      "A process scheduler uses enum State { STATE_IDLE, STATE_ACTIVE, STATE_PAUSED, STATE_STOPPED } and enum Event { EVENT_START, EVENT_PAUSE, EVENT_STOP, EVENT_RESUME }. Read current state s (0-3) and event e (0-3). Compute the next state via transition rules: IDLE+START->ACTIVE; ACTIVE+PAUSE->PAUSED; ACTIVE+STOP->STOPPED; PAUSED+RESUME->ACTIVE; PAUSED+STOP->STOPPED; STOPPED is terminal. Print the next state integer. Do not use pow or goto.\n\nInput Format:\nTwo space-separated integers: s e.\n\nOutput Format:\nA single integer: the next state.\n\nConstraints:\n0 <= s, e <= 3",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Enumeration Types",
    sampleinput1: "0 0",
    sampleoutput1: "1",
    sampleinput2: "1 1",
    sampleoutput2: "2",
    input1: "2 3",
    output1: "1",
    input2: "1 2",
    output2: "3",
    input3: "3 0",
    output3: "3",
    inputconstrains: "0 <= s, e <= 3",
    blacklist: "pow, goto",
    whitelist: "enum , State, Event, switch (",
    sourcecode: `#include <stdio.h>

typedef enum {
    STATE_IDLE,
    STATE_ACTIVE,
    STATE_PAUSED,
    STATE_STOPPED
} State;

typedef enum {
    EVENT_START,
    EVENT_PAUSE,
    EVENT_STOP,
    EVENT_RESUME
} Event;

State transition(State current, Event e) {
    switch (current) {
        case STATE_IDLE:
            if (e == EVENT_START) return STATE_ACTIVE;
            return STATE_IDLE;
        case STATE_ACTIVE:
            if (e == EVENT_PAUSE) return STATE_PAUSED;
            if (e == EVENT_STOP) return STATE_STOPPED;
            return STATE_ACTIVE;
        case STATE_PAUSED:
            if (e == EVENT_RESUME) return STATE_ACTIVE;
            if (e == EVENT_STOP) return STATE_STOPPED;
            return STATE_PAUSED;
        case STATE_STOPPED:
            return STATE_STOPPED;
        default:
            return STATE_IDLE;
    }
}

int main(void) {
    int s, e;
    if (scanf("%d %d", &s, &e) != 2) {
        return 1;
    }
    State next = transition((State)s, (Event)e);
    printf("%d\\n", (int)next);
    return 0;
}
`,
  }),
  codeQ({
    title: "Callback Handler Dispatch",
    description:
      "A GUI framework declares typedef void (*Handler)(int, int*). Define handlers handler_add (adds v to *out), handler_mul (multiplies *out by v), handler_sub (subtracts v from *out). Read op (1=add, 2=mul, 3=sub), accumulator, and value. Dispatch via a Handler and print the final accumulator value. Default op acts as add. Do not use pow or goto.\n\nInput Format:\nThree space-separated integers: op accumulator value.\n\nOutput Format:\nA single integer: the new accumulator value.\n\nConstraints:\n-1000 <= accumulator, value <= 1000",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "typedef with Pointers",
    sampleinput1: "1 10 5",
    sampleoutput1: "15",
    sampleinput2: "2 3 4",
    sampleoutput2: "12",
    input1: "3 10 3",
    output1: "7",
    input2: "1 -1 1",
    output2: "0",
    input3: "3 0 5",
    output3: "-5",
    inputconstrains: "-1000 <= accumulator, value <= 1000",
    blacklist: "pow, goto",
    whitelist: "typedef, (*Handler), switch (",
    sourcecode: `#include <stdio.h>

typedef void (*Handler)(int, int *);

static void handler_add(int v, int *out) { *out = *out + v; }
static void handler_mul(int v, int *out) { *out = *out * v; }
static void handler_sub(int v, int *out) { *out = *out - v; }

int main(void) {
    int op, accumulator, value;
    if (scanf("%d %d %d", &op, &accumulator, &value) != 3) {
        return 1;
    }
    Handler h;
    switch (op) {
        case 1: h = handler_add; break;
        case 2: h = handler_mul; break;
        case 3: h = handler_sub; break;
        default: h = handler_add; break;
    }
    int result = accumulator;
    h(value, &result);
    printf("%d\\n", result);
    return 0;
}
`,
  }),
];

/* ────────────────────────────── MCQ QUESTIONS ────────────────────────────── */
const mcqs = [
  /* 10 easy */
  mcq({
    title: "Enum Default First Value",
    description:
      "If an enum is declared as `enum Color { RED, GREEN, BLUE };` (no explicit values), what is the value of RED?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Enumeration Types",
    Option1: "0",
    Option2: "1",
    Option3: "-1",
    Option4: "Implementation-defined",
    CorrectOption: 1,
  }),
  mcq({
    title: "Enum Auto-Increment",
    description:
      "In `enum E { A = 10, B, C };` what are the values of B and C?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "enum with Values",
    Option1: "B = 0, C = 1",
    Option2: "B = 11, C = 12",
    Option3: "B = 1, C = 2",
    Option4: "B = 10, C = 10",
    CorrectOption: 2,
  }),
  mcq({
    title: "Typedef Basic Syntax",
    description:
      "Which line correctly defines Meter as an alias for int?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "typedef Basics",
    Option1: "typedef int Meter;",
    Option2: "typedef Meter int;",
    Option3: "typedef int as Meter;",
    Option4: "alias Meter = int;",
    CorrectOption: 1,
  }),
  mcq({
    title: "Typedef Struct Syntax",
    description:
      "Which snippet correctly defines a struct Point with fields x, y accessible as a type named Point?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "typedef with Structures",
    Option1: "struct Point { int x, y; };",
    Option2: "typedef struct { int x, y; } Point;",
    Option3: "typedef Point struct { int x, y; };",
    Option4: "struct typedef Point { int x, y; };",
    CorrectOption: 2,
  }),
  mcq({
    title: "Enum Underlying Type",
    description:
      "In C, the values of an enum are of which type?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Enumeration Types",
    Option1: "An opaque user-defined type that cannot be cast to int",
    Option2: "int (an enum constant is an int, and enum variables may be int or a compatible type)",
    Option3: "char",
    Option4: "Always unsigned",
    CorrectOption: 2,
  }),
  mcq({
    title: "Typedef Pointer Syntax",
    description:
      "Which line correctly defines IntPtr as an alias for the type `int *`?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "typedef with Pointers",
    Option1: "typedef int * IntPtr;",
    Option2: "typedef *int IntPtr;",
    Option3: "typedef IntPtr int *;",
    Option4: "typedef int IntPtr *;",
    CorrectOption: 1,
  }),
  mcq({
    title: "Enum vs Define",
    description:
      "Which is an ADVANTAGE of using enum over #define for related integer constants?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Enumeration Types",
    Option1: "enum values can be floating-point",
    Option2: "enum values can be any string",
    Option3: "enum values are visible to a debugger as symbolic names and form a self-documenting group",
    Option4: "enum constants consume runtime memory",
    CorrectOption: 3,
  }),
  mcq({
    title: "Enum Explicit Value Syntax",
    description:
      "Which declaration sets HTTP_NOT_FOUND to 404?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "enum with Values",
    Option1: "enum HttpStatus { HTTP_NOT_FOUND := 404 };",
    Option2: "enum HttpStatus { HTTP_NOT_FOUND = 404 };",
    Option3: "enum HttpStatus { HTTP_NOT_FOUND: 404 };",
    Option4: "enum HttpStatus { HTTP_NOT_FOUND -> 404 };",
    CorrectOption: 2,
  }),
  mcq({
    title: "Typedef Function Pointer",
    description:
      "Which line defines BinOp as a pointer to a function taking two ints and returning int?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "typedef with Pointers",
    Option1: "typedef int BinOp(int, int);",
    Option2: "typedef int (*BinOp)(int, int);",
    Option3: "typedef int *BinOp(int, int);",
    Option4: "typedef (int, int) -> int BinOp;",
    CorrectOption: 2,
  }),
  mcq({
    title: "Typedef Readability Benefit",
    description:
      "What is the PRIMARY benefit of using typedef in large-scale C programs?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Best Practices for Large-Scale Programs",
    Option1: "It makes code run faster",
    Option2: "It reduces the program's binary size",
    Option3: "It improves code readability and makes complex types (structs, function pointers) easier to maintain and rename",
    Option4: "It enables operator overloading",
    CorrectOption: 3,
  }),

  /* 6 medium — at least 4 snippets */
  mcq({
    title: "Enum Switch Snippet",
    description:
      "What does the following C snippet print when stdin is '0'?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Enumeration Types",
    Option1: "OK",
    Option2: "WARN",
    Option3: "ERROR",
    Option4: "UNKNOWN",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
typedef enum { STATUS_OK, STATUS_WARN, STATUS_ERROR } Status;
const char *label(Status s) {
    switch (s) {
        case STATUS_OK: return "OK";
        case STATUS_WARN: return "WARN";
        case STATUS_ERROR: return "ERROR";
        default: return "UNKNOWN";
    }
}
int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    printf("%s\\n", label((Status)n));
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Typedef Struct Field Snippet",
    description:
      "What does the following C snippet print when stdin is '3 4'?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "typedef with Structures",
    Option1: "3",
    Option2: "4",
    Option3: "7",
    Option4: "12",
    CorrectOption: 3,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
typedef struct { int x, y; } Point;
int main(void) {
    Point p;
    if (scanf("%d %d", &p.x, &p.y) != 2) return 1;
    int ax = p.x < 0 ? -p.x : p.x;
    int ay = p.y < 0 ? -p.y : p.y;
    printf("%d\\n", ax + ay);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Enum Explicit Values Snippet",
    description:
      "What does the following C snippet print when stdin is '3'?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "enum with Values",
    Option1: "100",
    Option2: "200",
    Option3: "300",
    Option4: "400",
    CorrectOption: 3,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
typedef enum { LOW = 100, MEDIUM = 200, HIGH = 300, CRITICAL = 400 } Priority;
int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    Priority p;
    switch (n) {
        case 1: p = LOW; break;
        case 2: p = MEDIUM; break;
        case 3: p = HIGH; break;
        case 4: p = CRITICAL; break;
        default: p = LOW; break;
    }
    printf("%d\\n", (int)p);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Typedef Function Pointer Snippet",
    description:
      "What does the following C snippet print when stdin is '2 10 4'?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "typedef with Pointers",
    Option1: "14",
    Option2: "6",
    Option3: "40",
    Option4: "0",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
typedef int (*BinOp)(int, int);
static int add(int a, int b) { return a + b; }
static int sub(int a, int b) { return a - b; }
static int mul(int a, int b) { return a * b; }
int main(void) {
    int op, a, b;
    if (scanf("%d %d %d", &op, &a, &b) != 3) return 1;
    BinOp fn;
    switch (op) {
        case 1: fn = add; break;
        case 2: fn = sub; break;
        case 3: fn = mul; break;
        default: fn = add; break;
    }
    printf("%d\\n", fn(a, b));
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Enum Bit Flag Counting",
    description:
      "Given `enum Flag { FLAG_A = 1<<0, FLAG_B = 1<<1, FLAG_C = 1<<2, FLAG_D = 1<<3 };` what is the integer value of FLAG_C?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "enum with Values",
    Option1: "2",
    Option2: "3",
    Option3: "4",
    Option4: "8",
    CorrectOption: 3,
  }),
  mcq({
    title: "Enum State Transition",
    description:
      "In an enum TrafficLight { RED, YELLOW, GREEN } (default values 0, 1, 2), the cycle RED -> GREEN -> YELLOW -> RED corresponds to which transition function for input state = GREEN (value 2)?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Enumeration Types",
    Option1: "RED (0)",
    Option2: "YELLOW (1)",
    Option3: "GREEN (2)",
    Option4: "No transition",
    CorrectOption: 2,
  }),

  /* 4 hard — at least 2 snippets */
  mcq({
    title: "Function Pointer Table Snippet",
    description:
      "What does the following C snippet print when stdin is '4 100 5'?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Best Practices for Large-Scale Programs",
    Option1: "105",
    Option2: "95",
    Option3: "500",
    Option4: "20",
    CorrectOption: 4,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
typedef int (*BinOp)(int, int);
static int add(int a, int b) { return a + b; }
static int sub(int a, int b) { return a - b; }
static int mul(int a, int b) { return a * b; }
static int op_div(int a, int b) { return (b == 0) ? 0 : a / b; }
static BinOp ops[5] = { 0, add, sub, mul, op_div };
int main(void) {
    int op, a, b;
    if (scanf("%d %d %d", &op, &a, &b) != 3) return 1;
    if (op < 1 || op > 4) { printf("0\\n"); return 0; }
    printf("%d\\n", ops[op](a, b));
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "FSM Transition Snippet",
    description:
      "What does the following C snippet print when stdin is '1 1' (state ACTIVE, event PAUSE)?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Enumeration Types",
    Option1: "0",
    Option2: "1",
    Option3: "2",
    Option4: "3",
    CorrectOption: 3,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
typedef enum { STATE_IDLE, STATE_ACTIVE, STATE_PAUSED, STATE_STOPPED } State;
typedef enum { EVENT_START, EVENT_PAUSE, EVENT_STOP, EVENT_RESUME } Event;
State transition(State s, Event e) {
    switch (s) {
        case STATE_IDLE:
            if (e == EVENT_START) return STATE_ACTIVE;
            return STATE_IDLE;
        case STATE_ACTIVE:
            if (e == EVENT_PAUSE) return STATE_PAUSED;
            if (e == EVENT_STOP) return STATE_STOPPED;
            return STATE_ACTIVE;
        case STATE_PAUSED:
            if (e == EVENT_RESUME) return STATE_ACTIVE;
            if (e == EVENT_STOP) return STATE_STOPPED;
            return STATE_PAUSED;
        case STATE_STOPPED:
            return STATE_STOPPED;
        default: return STATE_IDLE;
    }
}
int main(void) {
    int s, e;
    if (scanf("%d %d", &s, &e) != 2) return 1;
    printf("%d\\n", (int)transition((State)s, (Event)e));
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Callback Handler Dispatch",
    description:
      "Given `typedef void (*Handler)(int, int*);` and handlers add, mul, sub that modify *out, if op=2 (mul), accumulator=5, value=4, what is the final accumulator after the handler runs?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "typedef with Pointers",
    Option1: "9",
    Option2: "20",
    Option3: "1",
    Option4: "0",
    CorrectOption: 2,
  }),
  mcq({
    title: "Typedef for Maintainability",
    description:
      "Why is `typedef struct { int x, y; } Point;` preferred over `struct Point { int x, y; };` in large-scale C codebases that prefer the bare `Point` name?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Best Practices for Large-Scale Programs",
    Option1: "Because the struct keyword is deprecated in C99",
    Option2: "Because typedef removes the need to write `struct Point` at every use site, reducing visual noise and enabling easy renaming",
    Option3: "Because typedef makes the struct allocated on the heap",
    Option4: "Because only typedef'd structs can have function pointers as members",
    CorrectOption: 2,
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
