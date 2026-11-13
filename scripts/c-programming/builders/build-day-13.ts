/**
 * Builder for Day 13 — "Structures and Unions".
 * Emits:
 *   /home/z/my-project/scripts/c-programming/data/day-13.code.json  (20 code questions)
 *   /home/z/my-project/scripts/c-programming/data/day-13.mcq.json   (20 MCQ questions)
 *
 * Subtopics (exact strings from taxonomy.ts):
 *   Defining Structures, Accessing Structure Members, Nested Structures,
 *   Arrays of Structures, Structures and Pointers, Defining Unions,
 *   Passing Structures to Functions
 */
import { writeFileSync } from "node:fs";

const DAY = 13;
const TOPIC = "Structures and Unions";
const SUBTOPICS = [
  "Defining Structures",
  "Accessing Structure Members",
  "Nested Structures",
  "Arrays of Structures",
  "Structures and Pointers",
  "Defining Unions",
  "Passing Structures to Functions",
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
    title: "Print Struct Point Members",
    description:
      "Define a struct Point with members x and y. Read two integers x and y, store them in a struct Point variable, then print them space-separated.\n\nInput Format:\nA single line with two space-separated integers x and y.\n\nOutput Format:\nThe two integers space-separated.\n\nConstraints:\n-10^9 <= x, y <= 10^9",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Defining Structures",
    sampleinput1: "3 4",
    sampleoutput1: "3 4",
    sampleinput2: "0 0",
    sampleoutput2: "0 0",
    input1: "-1 1",
    output1: "-1 1",
    input2: "10 20",
    output2: "10 20",
    input3: "100 200",
    output3: "100 200",
    inputconstrains: "-10^9 <= x, y <= 10^9",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

struct Point {
    int x;
    int y;
};

int main(void) {
    struct Point p;
    if (scanf("%d %d", &p.x, &p.y) != 2) return 0;
    printf("%d %d\\n", p.x, p.y);
    return 0;
}
`,
  }),
  codeQ({
    title: "Access Student Record Fields",
    description:
      "Define a struct Student with members id and age. Read the id and age, then print them in the format \"ID=<id> Age=<age>\".\n\nInput Format:\nA single line with two space-separated integers id and age.\n\nOutput Format:\nThe string \"ID=<id> Age=<age>\".\n\nConstraints:\n1 <= id <= 10^9, 1 <= age <= 150",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Accessing Structure Members",
    sampleinput1: "1001 20",
    sampleoutput1: "ID=1001 Age=20",
    sampleinput2: "5 18",
    sampleoutput2: "ID=5 Age=18",
    input1: "0 0",
    output1: "ID=0 Age=0",
    input2: "999 99",
    output2: "ID=999 Age=99",
    input3: "42 25",
    output3: "ID=42 Age=25",
    inputconstrains: "1 <= id <= 10^9, 1 <= age <= 150",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

struct Student {
    int id;
    int age;
};

int main(void) {
    struct Student s;
    if (scanf("%d %d", &s.id, &s.age) != 2) return 0;
    printf("ID=%d Age=%d\\n", s.id, s.age);
    return 0;
}
`,
  }),
  codeQ({
    title: "Nested Date in Event",
    description:
      "Define a struct Date with members day, month, year. Define a struct Event that contains a Date as a nested member. Read the day, month, and year, then print them in day/month/year format.\n\nInput Format:\nA single line with three space-separated integers: day month year.\n\nOutput Format:\nThe string \"<day>/<month>/<year>\".\n\nConstraints:\n1 <= day <= 31, 1 <= month <= 12, 1900 <= year <= 2100",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Nested Structures",
    sampleinput1: "1 6 2023",
    sampleoutput1: "1/6/2023",
    sampleinput2: "25 12 2024",
    sampleoutput2: "25/12/2024",
    input1: "31 1 1999",
    output1: "31/1/1999",
    input2: "15 8 1947",
    output2: "15/8/1947",
    input3: "29 2 2000",
    output3: "29/2/2000",
    inputconstrains: "1 <= day <= 31, 1 <= month <= 12, 1900 <= year <= 2100",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

struct Date {
    int day;
    int month;
    int year;
};

struct Event {
    int id;
    struct Date date;
};

int main(void) {
    struct Event e;
    if (scanf("%d %d %d", &e.date.day, &e.date.month, &e.date.year) != 3) return 0;
    printf("%d/%d/%d\\n", e.date.day, e.date.month, e.date.year);
    return 0;
}
`,
  }),
  codeQ({
    title: "Array of Student Records",
    description:
      "Define a struct Student with members id and age. Read n, then n pairs of (id, age). Print each pair on its own line in the format \"<id> <age>\".\n\nInput Format:\nLine 1: integer n.\nNext n lines: each line has two space-separated integers (id and age).\n\nOutput Format:\nn lines, each containing \"<id> <age>\".\n\nConstraints:\n1 <= n <= 100, 1 <= id <= 10^9, 1 <= age <= 150",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Arrays of Structures",
    sampleinput1: "2\n1 20\n2 21",
    sampleoutput1: "1 20\n2 21",
    sampleinput2: "1\n5 18",
    sampleoutput2: "5 18",
    input1: "3\n10 30\n20 40\n30 50",
    output1: "10 30\n20 40\n30 50",
    input2: "1\n0 0",
    output2: "0 0",
    input3: "2\n1 1\n2 2",
    output3: "1 1\n2 2",
    inputconstrains: "1 <= n <= 100, 1 <= id <= 10^9, 1 <= age <= 150",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

struct Student {
    int id;
    int age;
};

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    struct Student s[100];
    for (int i = 0; i < n; i++) {
        if (scanf("%d %d", &s[i].id, &s[i].age) != 2) return 0;
    }
    for (int i = 0; i < n; i++) {
        printf("%d %d\\n", s[i].id, s[i].age);
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Pointer to Struct Access",
    description:
      "Define a struct Point with members x and y. Create a struct Point variable and a pointer to it. Read x and y into the struct via the pointer (using ->), then print the values via the pointer.\n\nInput Format:\nA single line with two space-separated integers x and y.\n\nOutput Format:\nThe two integers space-separated.\n\nConstraints:\n-10^9 <= x, y <= 10^9",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Structures and Pointers",
    sampleinput1: "5 10",
    sampleoutput1: "5 10",
    sampleinput2: "0 0",
    sampleoutput2: "0 0",
    input1: "-3 7",
    output1: "-3 7",
    input2: "1 2",
    output2: "1 2",
    input3: "100 200",
    output3: "100 200",
    inputconstrains: "-10^9 <= x, y <= 10^9",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

struct Point {
    int x;
    int y;
};

int main(void) {
    struct Point p;
    struct Point *ptr = &p;
    if (scanf("%d %d", &ptr->x, &ptr->y) != 2) return 0;
    printf("%d %d\\n", ptr->x, ptr->y);
    return 0;
}
`,
  }),
  codeQ({
    title: "Union Data Storage",
    description:
      "Define a union Data with an int member i and a float member f. Read an integer v, store it in the union's int member, then print the int member's value.\n\nInput Format:\nA single line containing one integer v.\n\nOutput Format:\nThe integer v.\n\nConstraints:\n-10^9 <= v <= 10^9",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Defining Unions",
    sampleinput1: "42",
    sampleoutput1: "42",
    sampleinput2: "0",
    sampleoutput2: "0",
    input1: "-5",
    output1: "-5",
    input2: "1000",
    output2: "1000",
    input3: "7",
    output3: "7",
    inputconstrains: "-10^9 <= v <= 10^9",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

union Data {
    int i;
    float f;
};

int main(void) {
    int v;
    if (scanf("%d", &v) != 1) return 0;
    union Data d;
    d.i = v;
    printf("%d\\n", d.i);
    return 0;
}
`,
  }),

  /* ─────────── EASY SCENARIO (4) ─────────── */
  codeQ({
    title: "Manhattan Distance from Origin",
    description:
      "A navigation tool computes the Manhattan distance from the origin to a point. Define a struct Point with members x and y. Pass the struct by value to a helper function that returns |x| + |y|.\n\nInput Format:\nA single line with two space-separated integers x and y.\n\nOutput Format:\nThe Manhattan distance as a single integer.\n\nConstraints:\n-10^9 <= x, y <= 10^9",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Passing Structures to Functions",
    sampleinput1: "3 4",
    sampleoutput1: "7",
    sampleinput2: "0 0",
    sampleoutput2: "0",
    input1: "-1 1",
    output1: "2",
    input2: "5 0",
    output2: "5",
    input3: "-3 -4",
    output3: "7",
    inputconstrains: "-10^9 <= x, y <= 10^9",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

struct Point {
    int x;
    int y;
};

static int manhattan(struct Point p) {
    int ax = p.x < 0 ? -p.x : p.x;
    int ay = p.y < 0 ? -p.y : p.y;
    return ax + ay;
}

int main(void) {
    struct Point p;
    if (scanf("%d %d", &p.x, &p.y) != 2) return 0;
    printf("%d\\n", manhattan(p));
    return 0;
}
`,
  }),
  codeQ({
    title: "Rectangle Area via Struct",
    description:
      "A graphics utility computes the area of a rectangle. Define a struct Rectangle with members width and height. Read width and height, then compute and print width * height.\n\nInput Format:\nA single line with two space-separated integers width and height.\n\nOutput Format:\nThe area as a single integer.\n\nConstraints:\n1 <= width, height <= 10^4",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Defining Structures",
    sampleinput1: "3 4",
    sampleoutput1: "12",
    sampleinput2: "5 5",
    sampleoutput2: "25",
    input1: "1 1",
    output1: "1",
    input2: "10 20",
    output2: "200",
    input3: "7 8",
    output3: "56",
    inputconstrains: "1 <= width, height <= 10^4",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

struct Rectangle {
    int width;
    int height;
};

int main(void) {
    struct Rectangle r;
    if (scanf("%d %d", &r.width, &r.height) != 2) return 0;
    printf("%d\\n", r.width * r.height);
    return 0;
}
`,
  }),
  codeQ({
    title: "Inventory Total Quantity",
    description:
      "A store inventory lists n items, each with an integer id and a quantity. Read n, then n (id, quantity) pairs. Compute the total quantity of all items.\n\nInput Format:\nLine 1: integer n.\nNext n lines: each line has two space-separated integers (id and quantity).\n\nOutput Format:\nThe total quantity as a single integer.\n\nConstraints:\n1 <= n <= 100, 1 <= id <= 10^6, 1 <= quantity <= 10^4",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Arrays of Structures",
    sampleinput1: "3\n1 10\n2 20\n3 30",
    sampleoutput1: "60",
    sampleinput2: "1\n5 100",
    sampleoutput2: "100",
    input1: "2\n1 7\n2 8",
    output1: "15",
    input2: "4\n10 5\n20 5\n30 5\n40 5",
    output2: "20",
    input3: "1\n1 1",
    output3: "1",
    inputconstrains: "1 <= n <= 100, 1 <= id <= 10^6, 1 <= quantity <= 10^4",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

struct Item {
    int id;
    int qty;
};

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    struct Item items[100];
    for (int i = 0; i < n; i++) {
        if (scanf("%d %d", &items[i].id, &items[i].qty) != 2) return 0;
    }
    int total = 0;
    for (int i = 0; i < n; i++) total += items[i].qty;
    printf("%d\\n", total);
    return 0;
}
`,
  }),
  codeQ({
    title: "Person with Nested Address",
    description:
      "A person record contains a nested Address struct (street_num and city_code). Read id, street_num, and city_code into a Person, then print in the format \"ID=<id> Street=<street> City=<city>\".\n\nInput Format:\nA single line with three space-separated integers: id street_num city_code.\n\nOutput Format:\nThe string \"ID=<id> Street=<street> City=<city>\".\n\nConstraints:\n1 <= id <= 10^6, 1 <= street_num <= 10^4, 1 <= city_code <= 999",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Nested Structures",
    sampleinput1: "1 100 5",
    sampleoutput1: "ID=1 Street=100 City=5",
    sampleinput2: "7 0 0",
    sampleoutput2: "ID=7 Street=0 City=0",
    input1: "5 42 999",
    output1: "ID=5 Street=42 City=999",
    input2: "100 1 1",
    output2: "ID=100 Street=1 City=1",
    input3: "999 500 100",
    output3: "ID=999 Street=500 City=100",
    inputconstrains: "1 <= id <= 10^6, 1 <= street_num <= 10^4, 1 <= city_code <= 999",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

struct Address {
    int street_num;
    int city_code;
};

struct Person {
    int id;
    struct Address addr;
};

int main(void) {
    struct Person p;
    if (scanf("%d %d %d", &p.id, &p.addr.street_num, &p.addr.city_code) != 3) return 0;
    printf("ID=%d Street=%d City=%d\\n", p.id, p.addr.street_num, p.addr.city_code);
    return 0;
}
`,
  }),

  /* ─────────── MEDIUM SCENARIO (6) ─────────── */
  codeQ({
    title: "Bank Account Withdrawal Check",
    description:
      "A bank account has an account number and an integer balance. Read the account number, the current balance, and a withdrawal amount. If the balance is sufficient, deduct the withdrawal and print the new balance; otherwise print \"INSUFFICIENT\".\n\nInput Format:\nA single line with three space-separated integers: account_no balance withdrawal.\n\nOutput Format:\nThe new balance, or \"INSUFFICIENT\".\n\nConstraints:\n1 <= account_no <= 10^9, 0 <= balance <= 10^9, 0 <= withdrawal <= 10^9",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Defining Structures",
    sampleinput1: "1001 1000 200",
    sampleoutput1: "800",
    sampleinput2: "1001 100 200",
    sampleoutput2: "INSUFFICIENT",
    input1: "5 0 0",
    output1: "0",
    input2: "5 500 500",
    output2: "0",
    input3: "9 1000 1000",
    output3: "0",
    inputconstrains: "1 <= account_no <= 10^9, 0 <= balance <= 10^9, 0 <= withdrawal <= 10^9",
    blacklist: "qsort, bsearch",
    whitelist: "struct , if (, &",
    sourcecode: `#include <stdio.h>

struct Account {
    int acc_no;
    int balance;
};

int main(void) {
    struct Account a;
    int w;
    if (scanf("%d %d %d", &a.acc_no, &a.balance, &w) != 3) return 0;
    if (w <= a.balance) {
        a.balance -= w;
        printf("%d\\n", a.balance);
    } else {
        printf("INSUFFICIENT\\n");
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Student Average Marks Calculator",
    description:
      "A student record contains an id and marks in 3 subjects. Read id and three marks. Compute and print the integer average (total / 3 using integer division).\n\nInput Format:\nA single line with four space-separated integers: id m1 m2 m3.\n\nOutput Format:\nThe integer average of the three marks.\n\nConstraints:\n1 <= id <= 10^9, 0 <= m1, m2, m3 <= 100",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Accessing Structure Members",
    sampleinput1: "1 90 80 70",
    sampleoutput1: "80",
    sampleinput2: "2 60 60 60",
    sampleoutput2: "60",
    input1: "3 100 50 25",
    output1: "58",
    input2: "4 0 0 0",
    output2: "0",
    input3: "5 99 99 99",
    output3: "99",
    inputconstrains: "1 <= id <= 10^9, 0 <= m1, m2, m3 <= 100",
    blacklist: "qsort, bsearch",
    whitelist: "struct , ., &",
    sourcecode: `#include <stdio.h>

struct Student {
    int id;
    int m1, m2, m3;
};

int main(void) {
    struct Student s;
    if (scanf("%d %d %d %d", &s.id, &s.m1, &s.m2, &s.m3) != 4) return 0;
    int total = s.m1 + s.m2 + s.m3;
    int avg = total / 3;
    printf("%d\\n", avg);
    return 0;
}
`,
  }),
  codeQ({
    title: "Top Scorer Finder Manual",
    description:
      "A school has n students (id and 3 marks). Find the id of the student with the highest total marks. Ties are broken by the earliest position in input (smallest index). Manual traversal (no qsort).\n\nInput Format:\nLine 1: integer n.\nNext n lines: each line has four space-separated integers (id m1 m2 m3).\n\nOutput Format:\nThe id of the top-scoring student.\n\nConstraints:\n1 <= n <= 100, 1 <= id <= 10^9, 0 <= m1, m2, m3 <= 100",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Arrays of Structures",
    sampleinput1: "3\n1 50 60 70\n2 80 90 100\n3 10 20 30",
    sampleoutput1: "2",
    sampleinput2: "1\n5 100 100 100",
    sampleoutput2: "5",
    input1: "2\n1 50 50 50\n2 50 50 51",
    output1: "2",
    input2: "2\n10 0 0 0\n20 0 0 0",
    output2: "10",
    input3: "3\n1 30 30 30\n2 40 40 40\n3 35 35 35",
    output3: "2",
    inputconstrains: "1 <= n <= 100, 1 <= id <= 10^9, 0 <= marks <= 100",
    blacklist: "qsort, bsearch, memcpy",
    whitelist: "struct , ., for (",
    sourcecode: `#include <stdio.h>

struct Student {
    int id;
    int m1, m2, m3;
};

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    struct Student s[100];
    for (int i = 0; i < n; i++) {
        if (scanf("%d %d %d %d", &s[i].id, &s[i].m1, &s[i].m2, &s[i].m3) != 4) return 0;
    }
    int best_idx = 0;
    int best_total = s[0].m1 + s[0].m2 + s[0].m3;
    for (int i = 1; i < n; i++) {
        int total = s[i].m1 + s[i].m2 + s[i].m3;
        if (total > best_total) {
            best_total = total;
            best_idx = i;
        }
    }
    printf("%d\\n", s[best_idx].id);
    return 0;
}
`,
  }),
  codeQ({
    title: "Move Point via Struct Pointer",
    description:
      "A graphics engine moves a Point by (dx, dy) using a helper that takes a struct Point pointer. Read x, y, dx, dy, then print the new coordinates.\n\nInput Format:\nA single line with four space-separated integers: x y dx dy.\n\nOutput Format:\nThe new x and y space-separated.\n\nConstraints:\n-10^9 <= x, y, dx, dy <= 10^9",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Structures and Pointers",
    sampleinput1: "1 2 3 4",
    sampleoutput1: "4 6",
    sampleinput2: "0 0 0 0",
    sampleoutput2: "0 0",
    input1: "-1 -1 1 1",
    output1: "0 0",
    input2: "10 10 -5 -3",
    output2: "5 7",
    input3: "5 5 0 0",
    output3: "5 5",
    inputconstrains: "-10^9 <= x, y, dx, dy <= 10^9",
    blacklist: "qsort, bsearch, memcpy",
    whitelist: "struct , ->, &",
    sourcecode: `#include <stdio.h>

struct Point {
    int x;
    int y;
};

static void move(struct Point *p, int dx, int dy) {
    p->x += dx;
    p->y += dy;
}

int main(void) {
    struct Point p;
    int dx, dy;
    if (scanf("%d %d %d %d", &p.x, &p.y, &dx, &dy) != 4) return 0;
    move(&p, dx, dy);
    printf("%d %d\\n", p.x, p.y);
    return 0;
}
`,
  }),
  codeQ({
    title: "Tagged Union Value Storage",
    description:
      "A tagged union stores either an int or a float selected by a tag. Read tag (0 for int, 1 for float). If tag is 0, read an int and print it; if tag is 1, read a float and print it with 2 decimal places.\n\nInput Format:\nLine 1: an integer tag (0 or 1).\nLine 2: if tag is 0, an integer; if tag is 1, a floating-point number.\n\nOutput Format:\nThe value (integer for tag 0; float with 2 decimals for tag 1).\n\nConstraints:\ntag in {0, 1}; for tag 0, -10^9 <= v <= 10^9; for tag 1, -10^9 <= v <= 10^9",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Defining Unions",
    sampleinput1: "0\n42",
    sampleoutput1: "42",
    sampleinput2: "1\n3.14",
    sampleoutput2: "3.14",
    input1: "0\n-5",
    output1: "-5",
    input2: "1\n0.5",
    output2: "0.50",
    input3: "1\n2.5",
    output3: "2.50",
    inputconstrains: "tag in {0, 1}; -10^9 <= v <= 10^9",
    blacklist: "qsort, bsearch",
    whitelist: "union , struct , if (",
    sourcecode: `#include <stdio.h>

struct Tagged {
    int tag;
    union {
        int i;
        float f;
    } v;
};

int main(void) {
    struct Tagged t;
    int tag;
    if (scanf("%d", &tag) != 1) return 0;
    t.tag = tag;
    if (tag == 0) {
        if (scanf("%d", &t.v.i) != 1) return 0;
        printf("%d\\n", t.v.i);
    } else {
        if (scanf("%f", &t.v.f) != 1) return 0;
        printf("%.2f\\n", t.v.f);
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Rectangle Area Function",
    description:
      "A geometry library computes rectangle area via a function that takes a Rectangle struct by value. Read width and height, then print the area computed by the helper.\n\nInput Format:\nA single line with two space-separated integers width and height.\n\nOutput Format:\nThe area width * height.\n\nConstraints:\n1 <= width, height <= 10^4",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Passing Structures to Functions",
    sampleinput1: "3 4",
    sampleoutput1: "12",
    sampleinput2: "5 5",
    sampleoutput2: "25",
    input1: "10 20",
    output1: "200",
    input2: "1 1",
    output2: "1",
    input3: "7 8",
    output3: "56",
    inputconstrains: "1 <= width, height <= 10^4",
    blacklist: "qsort, bsearch",
    whitelist: "struct , ., &",
    sourcecode: `#include <stdio.h>

struct Rectangle {
    int width;
    int height;
};

static int area(struct Rectangle r) {
    return r.width * r.height;
}

int main(void) {
    struct Rectangle r;
    if (scanf("%d %d", &r.width, &r.height) != 2) return 0;
    printf("%d\\n", area(r));
    return 0;
}
`,
  }),

  /* ─────────── HARD SCENARIO (4) ─────────── */
  codeQ({
    title: "Student Age and Average Computation",
    description:
      "A student record contains an id, a nested birth Date (day, month, year), and marks in 3 subjects. Compute the student's age as 2024 minus birth year, and the integer average of the three marks. Print \"<age> <avg>\".\n\nInput Format:\nA single line with seven space-separated integers: id day month year m1 m2 m3.\n\nOutput Format:\nThe age and the average, space-separated.\n\nConstraints:\n1 <= id <= 10^9, 1900 <= year <= 2024, 0 <= m1, m2, m3 <= 100",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Nested Structures",
    sampleinput1: "1 15 6 2000 90 80 70",
    sampleoutput1: "24 80",
    sampleinput2: "2 1 1 2010 60 60 60",
    sampleoutput2: "14 60",
    input1: "5 31 12 1999 100 100 100",
    output1: "25 100",
    input2: "3 1 1 2024 0 0 0",
    output2: "0 0",
    input3: "9 15 8 2005 30 60 90",
    output3: "19 60",
    inputconstrains: "1 <= id <= 10^9, 1900 <= year <= 2024, 0 <= marks <= 100",
    blacklist: "qsort, bsearch",
    whitelist: "struct , ., &",
    sourcecode: `#include <stdio.h>

struct Date {
    int day;
    int month;
    int year;
};

struct Student {
    int id;
    struct Date birth;
    int m1, m2, m3;
};

int main(void) {
    struct Student s;
    if (scanf("%d %d %d %d %d %d %d",
              &s.id, &s.birth.day, &s.birth.month, &s.birth.year,
              &s.m1, &s.m2, &s.m3) != 7) return 0;
    int age = 2024 - s.birth.year;
    int avg = (s.m1 + s.m2 + s.m3) / 3;
    printf("%d %d\\n", age, avg);
    return 0;
}
`,
  }),
  codeQ({
    title: "Student Sort by Marks Manual",
    description:
      "A teacher has n students (id and marks). Sort the students in ascending order of marks using a manual sort (no qsort). Print the sorted ids separated by single spaces. Ties preserve the original input order.\n\nInput Format:\nLine 1: integer n.\nNext n lines: each line has two space-separated integers (id and marks).\n\nOutput Format:\nThe sorted ids, space-separated on a single line.\n\nConstraints:\n1 <= n <= 100, 1 <= id <= 10^9, 0 <= marks <= 100",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Arrays of Structures",
    sampleinput1: "3\n1 90\n2 70\n3 80",
    sampleoutput1: "2 3 1",
    sampleinput2: "1\n5 100",
    sampleoutput2: "5",
    input1: "4\n1 50\n2 50\n3 50\n4 50",
    output1: "1 2 3 4",
    input2: "2\n10 30\n20 10",
    output2: "20 10",
    input3: "4\n4 90\n3 80\n2 70\n1 60",
    output3: "1 2 3 4",
    inputconstrains: "1 <= n <= 100, 1 <= id <= 10^9, 0 <= marks <= 100",
    blacklist: "qsort, bsearch, memcpy",
    whitelist: "struct , ., for (",
    sourcecode: `#include <stdio.h>

struct Student {
    int id;
    int marks;
};

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    struct Student s[100];
    for (int i = 0; i < n; i++) {
        if (scanf("%d %d", &s[i].id, &s[i].marks) != 2) return 0;
    }
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (s[j].marks > s[j + 1].marks) {
                struct Student tmp = s[j];
                s[j] = s[j + 1];
                s[j + 1] = tmp;
            }
        }
    }
    for (int i = 0; i < n; i++) {
        if (i) putchar(' ');
        printf("%d", s[i].id);
    }
    putchar('\\n');
    return 0;
}
`,
  }),
  codeQ({
    title: "Sum of X via Struct Pointer Array",
    description:
      "A geometry analyzer has n points (x, y). Build an array of struct Point pointers (each ptrs[i] points to pts[i]) and use the pointer array (with ->) to compute the sum of all x-coordinates.\n\nInput Format:\nLine 1: integer n.\nNext n lines: each line has two space-separated integers (x and y).\n\nOutput Format:\nThe sum of all x-coordinates.\n\nConstraints:\n1 <= n <= 100, -10^4 <= x, y <= 10^4",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Structures and Pointers",
    sampleinput1: "3\n1 2\n3 4\n5 6",
    sampleoutput1: "9",
    sampleinput2: "1\n7 0",
    sampleoutput2: "7",
    input1: "2\n-1 0\n1 0",
    output1: "0",
    input2: "4\n10 10\n20 20\n30 30\n40 40",
    output2: "100",
    input3: "2\n5 5\n5 5",
    output3: "10",
    inputconstrains: "1 <= n <= 100, -10^4 <= x, y <= 10^4",
    blacklist: "qsort, bsearch, memcpy",
    whitelist: "struct , ->, &",
    sourcecode: `#include <stdio.h>

struct Point {
    int x;
    int y;
};

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    static struct Point pts[100];
    static struct Point *ptrs[100];
    for (int i = 0; i < n; i++) {
        if (scanf("%d %d", &pts[i].x, &pts[i].y) != 2) return 0;
        ptrs[i] = &pts[i];
    }
    int sum_x = 0;
    for (int i = 0; i < n; i++) {
        sum_x += ptrs[i]->x;
    }
    printf("%d\\n", sum_x);
    return 0;
}
`,
  }),
  codeQ({
    title: "Count Passed Students Function",
    description:
      "An exam grader counts how many students passed (marks >= 40). Write a function that takes an array of Student structs and the count n, and returns the number of passed students. Read n, then n (id, marks) pairs, then print the count.\n\nInput Format:\nLine 1: integer n.\nNext n lines: each line has two space-separated integers (id and marks).\n\nOutput Format:\nThe number of students who passed.\n\nConstraints:\n1 <= n <= 100, 1 <= id <= 10^9, 0 <= marks <= 100",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Passing Structures to Functions",
    sampleinput1: "3\n1 90\n2 30\n3 40",
    sampleoutput1: "2",
    sampleinput2: "1\n5 100",
    sampleoutput2: "1",
    input1: "2\n1 0\n2 39",
    output1: "0",
    input2: "4\n1 40\n2 50\n3 60\n4 70",
    output2: "4",
    input3: "3\n1 100\n2 39\n3 41",
    output3: "2",
    inputconstrains: "1 <= n <= 100, 1 <= id <= 10^9, 0 <= marks <= 100",
    blacklist: "qsort, bsearch, memcpy",
    whitelist: "struct , ., for (",
    sourcecode: `#include <stdio.h>

struct Student {
    int id;
    int marks;
};

static int count_passed(struct Student arr[], int n) {
    int count = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i].marks >= 40) count++;
    }
    return count;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    struct Student s[100];
    for (int i = 0; i < n; i++) {
        if (scanf("%d %d", &s[i].id, &s[i].marks) != 2) return 0;
    }
    printf("%d\\n", count_passed(s, n));
    return 0;
}
`,
  }),
];

/* ────────────────────────────── MCQ QUESTIONS ────────────────────────────── */
const mcqs = [
  /* ─────────── EASY (10) ─────────── */
  mcq({
    title: "Struct Declaration Syntax",
    description:
      "Which declaration correctly defines a struct named Point with two int members x and y?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Defining Structures",
    Option1: "struct Point { int x; int y; };",
    Option2: "struct Point = (x, y);",
    Option3: "Point struct { int x; int y; };",
    Option4: "struct Point (int x, int y);",
    CorrectOption: 1,
  }),
  mcq({
    title: "Dot Operator Usage",
    description:
      "Given struct Point p; where struct Point has member x, how do you access the member x of p?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Accessing Structure Members",
    Option1: "p.x",
    Option2: "p->x",
    Option3: "p::x",
    Option4: "p[x]",
    CorrectOption: 1,
  }),
  mcq({
    title: "Nested Struct Member Access",
    description:
      "Given struct Outer o; where struct Outer contains struct Inner b; and struct Inner has member m, how do you access m through o?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Nested Structures",
    Option1: "o.b.m",
    Option2: "o->b->m",
    Option3: "o.m.b",
    Option4: "o::b::m",
    CorrectOption: 1,
  }),
  mcq({
    title: "Array of Struct Declaration",
    description:
      "Which declaration creates an array of 10 Student structs named arr?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Arrays of Structures",
    Option1: "struct Student arr[10];",
    Option2: "Student arr[10];",
    Option3: "struct Student[10] arr;",
    Option4: "array struct Student arr[10];",
    CorrectOption: 1,
  }),
  mcq({
    title: "Arrow Operator Purpose",
    description: "The arrow operator -> is used in C to:",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Structures and Pointers",
    Option1: "Access a struct member through a pointer to the struct",
    Option2: "Access a struct member through a direct struct value",
    Option3: "Define a new struct type",
    Option4: "Compare two structs for equality",
    CorrectOption: 1,
  }),
  mcq({
    title: "Struct vs Union Memory",
    description:
      "What is the key memory layout difference between a struct and a union in C?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Defining Unions",
    Option1:
      "A union's members share the same memory location; a struct's members each occupy their own storage",
    Option2:
      "A struct's members share the same memory; a union's members each occupy their own storage",
    Option3: "A union cannot contain int members",
    Option4: "A struct can only contain pointer members",
    CorrectOption: 1,
  }),
  mcq({
    title: "Pass Struct by Value Semantics",
    description:
      "When you pass a struct to a function by value in C, what happens to modifications made inside the function?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Passing Structures to Functions",
    Option1:
      "The struct is copied; modifications do not affect the caller's original",
    Option2:
      "The struct is passed by reference; modifications affect the caller's original",
    Option3: "A pointer is implicitly passed alongside the struct",
    Option4: "It is undefined behavior in C",
    CorrectOption: 1,
  }),
  mcq({
    title: "Sizeof Struct Result",
    description:
      "What does sizeof(struct Point) return for a struct with two int members (assuming int is 4 bytes)?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Defining Structures",
    Option1: "The total bytes used by the struct, possibly including padding",
    Option2: "Always exactly 4 bytes regardless of members",
    Option3: "Always exactly 2 bytes",
    Option4: "0, since structs have no size",
    CorrectOption: 1,
  }),
  mcq({
    title: "Direct Member Access Operator",
    description:
      "Which operator is used to access a member of a struct when you have a direct (non-pointer) struct variable?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Accessing Structure Members",
    Option1: "The dot operator .",
    Option2: "The arrow operator ->",
    Option3: "The scope operator ::",
    Option4: "The address operator &",
    CorrectOption: 1,
  }),
  mcq({
    title: "Dot vs Arrow Distinction",
    description:
      "What is the difference between the . and -> operators in C?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Structures and Pointers",
    Option1:
      ". is used with direct struct values; -> is used with pointers to structs",
    Option2:
      "-> is used with direct struct values; . is used with pointers to structs",
    Option3: "There is no difference; they are interchangeable",
    Option4: ". is for unions and -> is for structs",
    CorrectOption: 1,
  }),

  /* ─────────── MEDIUM (6) — all snippets ─────────── */
  mcq({
    title: "Struct Member Sum Output",
    description: "What does the following C snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Accessing Structure Members",
    Option1: "7",
    Option2: "34",
    Option3: "12",
    Option4: "Compilation error",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
struct Point { int x; int y; };
int main(void) {
    struct Point p = {3, 4};
    printf("%d\\n", p.x + p.y);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Struct Pointer Arithmetic Output",
    description: "What does the following C snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Structures and Pointers",
    Option1: "50",
    Option2: "15",
    Option3: "5",
    Option4: "Compilation error",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
struct Point { int x; int y; };
int main(void) {
    struct Point p;
    struct Point *ptr = &p;
    ptr->x = 5;
    ptr->y = 10;
    printf("%d\\n", ptr->x * ptr->y);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Nested Struct Access Output",
    description: "What does the following C snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Nested Structures",
    Option1: "42",
    Option2: "0",
    Option3: "5",
    Option4: "Compilation error",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
struct Inner { int m; };
struct Outer { struct Inner b; };
int main(void) {
    struct Outer o;
    o.b.m = 42;
    printf("%d\\n", o.b.m);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Union Member Read Back Output",
    description: "What does the following C snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Defining Unions",
    Option1: "65",
    Option2: "A",
    Option3: "0",
    Option4: "Compilation error",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
union Data {
    int i;
    char c;
};
int main(void) {
    union Data d;
    d.i = 65;
    printf("%d\\n", d.i);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Pass by Value No Effect Output",
    description:
      "The function inc takes a struct Counter by value. What does the snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Passing Structures to Functions",
    Option1: "0",
    Option2: "1",
    Option3: "2",
    Option4: "Compilation error",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
struct Counter {
    int count;
};
static void inc(struct Counter c) {
    c.count++;
}
int main(void) {
    struct Counter c = {0};
    inc(c);
    printf("%d\\n", c.count);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Struct Array Summation Output",
    description: "What does the following C snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Arrays of Structures",
    Option1: "240",
    Option2: "80",
    Option3: "100",
    Option4: "Compilation error",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
struct Student { int id; int marks; };
int main(void) {
    struct Student s[3] = {{1, 80}, {2, 90}, {3, 70}};
    int total = 0;
    for (int i = 0; i < 3; i++) total += s[i].marks;
    printf("%d\\n", total);
    return 0;
}
`,
    snippetLang: "c",
  }),

  /* ─────────── HARD (4) — all snippets ─────────── */
  mcq({
    title: "Pointer Mutate Struct Output",
    description:
      "The function move takes a struct pointer and modifies the struct. What does the snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Structures and Pointers",
    Option1: "4 6",
    Option2: "1 2",
    Option3: "3 4",
    Option4: "Compilation error",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
struct Point { int x; int y; };
static void move(struct Point *p, int dx, int dy) {
    p->x += dx;
    p->y += dy;
}
int main(void) {
    struct Point p = {1, 2};
    move(&p, 3, 4);
    printf("%d %d\\n", p.x, p.y);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Union Float Member Output",
    description: "What does the following C snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Defining Unions",
    Option1: "1.00",
    Option2: "1",
    Option3: "0.00",
    Option4: "Undefined garbage value",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
union Data {
    int i;
    float f;
};
int main(void) {
    union Data d;
    d.f = 1.0f;
    printf("%.2f\\n", d.f);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Struct Array Max Index Output",
    description: "What does the following C snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Arrays of Structures",
    Option1: "2",
    Option2: "1",
    Option3: "3",
    Option4: "90",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
struct Student { int id; int marks; };
int main(void) {
    struct Student s[3] = {{1, 70}, {2, 90}, {3, 80}};
    int best = 0;
    for (int i = 1; i < 3; i++) {
        if (s[i].marks > s[best].marks) best = i;
    }
    printf("%d\\n", s[best].id);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Nested Struct Field Sum Output",
    description: "What does the following C snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Nested Structures",
    Option1: "15",
    Option2: "5",
    Option3: "10",
    Option4: "Compilation error",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
struct Inner { int m; };
struct Outer { struct Inner b; int n; };
int main(void) {
    struct Outer o = { {5}, 10 };
    printf("%d\\n", o.b.m + o.n);
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
