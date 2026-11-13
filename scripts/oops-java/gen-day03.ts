/**
 * Day 3 — "Control Statements" question bank generator (task 4-c).
 *
 * Writes the four part files under data/parts/:
 *   day-03.code.p1.json  → { day, topics, first 10 code questions }
 *   day-03.code.p2.json  → { last 10 code questions }
 *   day-03.mcq.p1.json   → { first 10 MCQs }
 *   day-03.mcq.p2.json   → { last 10 MCQs }
 *
 * Merge afterwards with:
 *   bun scripts/oops-java/merge-parts.ts 3 code p1 p2
 *   bun scripts/oops-java/merge-parts.ts 3 mcq p1 p2
 *
 * Difficulty matrix (CONVENTIONS.md):
 *   code: 10 easy (6 basic + 4 scenario, maxscore 10, empty black/whitelist),
 *         6 medium (scenario, maxscore 20, blacklist+whitelist),
 *         4 hard  (scenario, maxscore 30, blacklist+whitelist)
 *   mcq:  10 easy / 6 medium / 4 hard, >= 6 code snippets (java)
 *
 * All Java solutions/snippets are Java-8 classic syntax and contain
 * NO backslash characters anywhere.
 */

import fs from "node:fs";
import path from "node:path";

const dataDir = new URL("./data/", import.meta.url).pathname;
const partsDir = path.join(dataDir, "parts");
fs.mkdirSync(partsDir, { recursive: true });

const TOPIC = "Control Statements";
const SUBTOPICS = [
  "if and if-else",
  "else-if Ladder",
  "Nested if",
  "switch Statement",
  "break and continue",
];

const topics = [{ name: TOPIC, subtopics: [...SUBTOPICS] }];

/* description per CONVENTIONS.md: statement + Input Format + Output Format + Constraints */
function desc(
  statement: string,
  inputFormat: string,
  outputFormat: string,
  constraints: string
): string {
  return [
    statement,
    "",
    "Input Format:",
    inputFormat,
    "",
    "Output Format:",
    outputFormat,
    "",
    "Constraints:",
    constraints,
  ].join("\n");
}

/* ──────────────────────────── CODE QUESTIONS ──────────────────────────── */

const codeQuestions: any[] = [];

/* 1 ── easy / basic / if and if-else ───────────────────────────────────── */
codeQuestions.push({
  title: "Odd or Even Checker",
  description: desc(
    "Metro buses flash a small light next to each seat: even seat numbers glow blue and odd seat numbers glow amber. Read one integer and report whether it is odd or even.",
    "A single integer n.",
    "Print Odd if n is odd, otherwise print Even.",
    "-1000000 <= n <= 1000000"
  ),
  difficulty: "easy",
  variant: "basic",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "if and if-else",
  sampleinput1: "7",
  sampleoutput1: "Odd",
  sampleinput2: "12",
  sampleoutput2: "Even",
  input1: "0",
  output1: "Even",
  input2: "-5",
  output2: "Odd",
  input3: "999999",
  output3: "Odd",
  inputconstrains: "-1000000 <= n <= 1000000",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        if (n % 2 == 0) {
            System.out.println("Even");
        } else {
            System.out.println("Odd");
        }
    }
}`,
});

/* 2 ── easy / basic / else-if Ladder ───────────────────────────────────── */
codeQuestions.push({
  title: "Sign of a Number",
  description: desc(
    "A weather sensor reports temperature deltas that can be positive, negative or exactly zero. Read one integer and classify its sign using an else-if ladder.",
    "A single integer n.",
    "Print Positive if n is greater than 0, Negative if n is less than 0, otherwise print Zero.",
    "-1000000 <= n <= 1000000"
  ),
  difficulty: "easy",
  variant: "basic",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "else-if Ladder",
  sampleinput1: "42",
  sampleoutput1: "Positive",
  sampleinput2: "-17",
  sampleoutput2: "Negative",
  input1: "0",
  output1: "Zero",
  input2: "-1",
  output2: "Negative",
  input3: "1000000",
  output3: "Positive",
  inputconstrains: "-1000000 <= n <= 1000000",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        if (n > 0) {
            System.out.println("Positive");
        } else if (n < 0) {
            System.out.println("Negative");
        } else {
            System.out.println("Zero");
        }
    }
}`,
});

/* 3 ── easy / basic / if and if-else ───────────────────────────────────── */
codeQuestions.push({
  title: "Pass or Fail Checker",
  description: desc(
    "A school considers 35 out of 100 as the minimum passing marks. Read the marks of a student and print the verdict with a simple if-else.",
    "A single integer marks.",
    "Print Pass if marks is 35 or more, otherwise print Fail.",
    "0 <= marks <= 100"
  ),
  difficulty: "easy",
  variant: "basic",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "if and if-else",
  sampleinput1: "78",
  sampleoutput1: "Pass",
  sampleinput2: "34",
  sampleoutput2: "Fail",
  input1: "35",
  output1: "Pass",
  input2: "0",
  output2: "Fail",
  input3: "100",
  output3: "Pass",
  inputconstrains: "0 <= marks <= 100",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int marks = sc.nextInt();
        if (marks >= 35) {
            System.out.println("Pass");
        } else {
            System.out.println("Fail");
        }
    }
}`,
});

/* 4 ── easy / basic / if and if-else ───────────────────────────────────── */
codeQuestions.push({
  title: "Maximum of Two Numbers",
  description: desc(
    "Two friends submit their scores to an online judge and argue about who scored higher. Read two integers and print the larger one; if both are equal print Equal.",
    "One line with two space-separated integers a and b.",
    "Print the larger value, or the word Equal when a and b are the same.",
    "-1000000 <= a, b <= 1000000"
  ),
  difficulty: "easy",
  variant: "basic",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "if and if-else",
  sampleinput1: "4 9",
  sampleoutput1: "9",
  sampleinput2: "15 3",
  sampleoutput2: "15",
  input1: "7 7",
  output1: "Equal",
  input2: "-2 -9",
  output2: "-2",
  input3: "0 5",
  output3: "5",
  inputconstrains: "-1000000 <= a, b <= 1000000",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        if (a > b) {
            System.out.println(a);
        } else if (b > a) {
            System.out.println(b);
        } else {
            System.out.println("Equal");
        }
    }
}`,
});

/* 5 ── easy / basic / if and if-else ───────────────────────────────────── */
codeQuestions.push({
  title: "Vowel or Consonant Check",
  description: desc(
    "A phonics app listens to single letters spoken by children and reacts differently for vowels. Read one lowercase English letter and decide whether it is a vowel or a consonant.",
    "A single lowercase letter.",
    "Print Vowel for a, e, i, o or u; otherwise print Consonant.",
    "The input is exactly one lowercase letter from a to z"
  ),
  difficulty: "easy",
  variant: "basic",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "if and if-else",
  sampleinput1: "a",
  sampleoutput1: "Vowel",
  sampleinput2: "b",
  sampleoutput2: "Consonant",
  input1: "e",
  output1: "Vowel",
  input2: "z",
  output2: "Consonant",
  input3: "u",
  output3: "Vowel",
  inputconstrains: "The input is exactly one lowercase letter from a to z",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        char ch = sc.next().charAt(0);
        if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') {
            System.out.println("Vowel");
        } else {
            System.out.println("Consonant");
        }
    }
}`,
});

/* 6 ── easy / basic / switch Statement ─────────────────────────────────── */
codeQuestions.push({
  title: "Weekday Name Lookup",
  description: desc(
    "A scheduling tool converts a day number into a weekday name using a classic switch statement. Read a number and print the matching weekday.",
    "A single integer day.",
    "1 prints Monday, 2 Tuesday, 3 Wednesday, 4 Thursday, 5 Friday, 6 Saturday and 7 Sunday; any other value prints Invalid day.",
    "0 <= day <= 10"
  ),
  difficulty: "easy",
  variant: "basic",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "switch Statement",
  sampleinput1: "1",
  sampleoutput1: "Monday",
  sampleinput2: "3",
  sampleoutput2: "Wednesday",
  input1: "7",
  output1: "Sunday",
  input2: "8",
  output2: "Invalid day",
  input3: "0",
  output3: "Invalid day",
  inputconstrains: "0 <= day <= 10",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int day = sc.nextInt();
        switch (day) {
            case 1:
                System.out.println("Monday");
                break;
            case 2:
                System.out.println("Tuesday");
                break;
            case 3:
                System.out.println("Wednesday");
                break;
            case 4:
                System.out.println("Thursday");
                break;
            case 5:
                System.out.println("Friday");
                break;
            case 6:
                System.out.println("Saturday");
                break;
            case 7:
                System.out.println("Sunday");
                break;
            default:
                System.out.println("Invalid day");
        }
    }
}`,
});

/* 7 ── easy / scenario / else-if Ladder ────────────────────────────────── */
codeQuestions.push({
  title: "Movie Ticket Price by Age",
  description: desc(
    "A multiplex prices tickets by age bracket: children below 5 enter free, ages 5 to 12 pay 120, ages 13 to 59 pay 250 and seniors from 60 pay 150. Read the visitor age and print the ticket price using an else-if ladder.",
    "A single integer age.",
    "Print the ticket price as an integer (0 for free entry).",
    "0 <= age <= 120"
  ),
  difficulty: "easy",
  variant: "scenario",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "else-if Ladder",
  sampleinput1: "3",
  sampleoutput1: "0",
  sampleinput2: "8",
  sampleoutput2: "120",
  input1: "30",
  output1: "250",
  input2: "65",
  output2: "150",
  input3: "5",
  output3: "120",
  inputconstrains: "0 <= age <= 120",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int age = sc.nextInt();
        int price;
        if (age <= 4) {
            price = 0;
        } else if (age <= 12) {
            price = 120;
        } else if (age <= 59) {
            price = 250;
        } else {
            price = 150;
        }
        System.out.println(price);
    }
}`,
});

/* 8 ── easy / scenario / switch Statement ──────────────────────────────── */
codeQuestions.push({
  title: "Metro Fare by Zone",
  description: desc(
    "A metro app computes the fare from the zone number printed on the ticket: zone 1 costs 10, zone 2 costs 15, zone 3 costs 20 and zone 4 costs 30. Read the zone and print the fare with a switch statement.",
    "A single integer zone.",
    "Print the fare, or Invalid zone when the zone is not 1 to 4.",
    "0 <= zone <= 6"
  ),
  difficulty: "easy",
  variant: "scenario",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "switch Statement",
  sampleinput1: "1",
  sampleoutput1: "10",
  sampleinput2: "4",
  sampleoutput2: "30",
  input1: "2",
  output1: "15",
  input2: "5",
  output2: "Invalid zone",
  input3: "0",
  output3: "Invalid zone",
  inputconstrains: "0 <= zone <= 6",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int zone = sc.nextInt();
        switch (zone) {
            case 1:
                System.out.println(10);
                break;
            case 2:
                System.out.println(15);
                break;
            case 3:
                System.out.println(20);
                break;
            case 4:
                System.out.println(30);
                break;
            default:
                System.out.println("Invalid zone");
        }
    }
}`,
});

/* 9 ── easy / scenario / Nested if ─────────────────────────────────────── */
codeQuestions.push({
  title: "Portal Login Check",
  description: desc(
    "A coding portal verifies credentials in two steps: first the username, then the password. The expected username is admin and the expected password is admin123. Read both values and print the matching message using a nested if inside an outer if.",
    "One line with two space-separated tokens: username and password.",
    "Print Login successful when both match, Wrong password when only the username matches, otherwise print Unknown user.",
    "Each token has 1 to 20 characters with no spaces"
  ),
  difficulty: "easy",
  variant: "scenario",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Nested if",
  sampleinput1: "admin admin123",
  sampleoutput1: "Login successful",
  sampleinput2: "admin pass1",
  sampleoutput2: "Wrong password",
  input1: "root admin123",
  output1: "Unknown user",
  input2: "guest 1234",
  output2: "Unknown user",
  input3: "admin Admin123",
  output3: "Wrong password",
  inputconstrains: "Each token has 1 to 20 characters with no spaces",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String user = sc.next();
        String pass = sc.next();
        if (user.equals("admin")) {
            if (pass.equals("admin123")) {
                System.out.println("Login successful");
            } else {
                System.out.println("Wrong password");
            }
        } else {
            System.out.println("Unknown user");
        }
    }
}`,
});

/* 10 ── easy / scenario / Nested if ────────────────────────────────────── */
codeQuestions.push({
  title: "Electricity Surcharge Calculator",
  description: desc(
    "A state electricity board adds a surcharge that depends on both the units consumed and the connection type. For units above 500 the surcharge is 250 for a commercial connection and 150 for a domestic one; for units above 200 it is 100 for commercial and 50 for domestic; at 200 units or below there is no surcharge. Read the units and the connection type and print the surcharge using nested ifs.",
    "One line with an integer units and a token type (domestic or commercial).",
    "Print the surcharge as an integer.",
    "0 <= units <= 1000; type is domestic or commercial"
  ),
  difficulty: "easy",
  variant: "scenario",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Nested if",
  sampleinput1: "600 commercial",
  sampleoutput1: "250",
  sampleinput2: "300 domestic",
  sampleoutput2: "50",
  input1: "600 domestic",
  output1: "150",
  input2: "300 commercial",
  output2: "100",
  input3: "50 commercial",
  output3: "0",
  inputconstrains: "0 <= units <= 1000; type is domestic or commercial",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int units = sc.nextInt();
        String type = sc.next();
        int surcharge;
        if (units > 500) {
            if (type.equals("commercial")) {
                surcharge = 250;
            } else {
                surcharge = 150;
            }
        } else if (units > 200) {
            if (type.equals("commercial")) {
                surcharge = 100;
            } else {
                surcharge = 50;
            }
        } else {
            surcharge = 0;
        }
        System.out.println(surcharge);
    }
}`,
});

/* 11 ── medium / scenario / else-if Ladder ─────────────────────────────── */
codeQuestions.push({
  title: "Grade Calculator with Validation",
  description: desc(
    "A university grader first rejects impossible marks (below 0 or above 100) with a short-circuit logical check, and only then maps valid marks to grades with an else-if ladder: 90 or more is A, 80 or more is B, 70 or more is C, 60 or more is D and anything else is F. Read the marks and print the result.",
    "A single integer marks.",
    "Print Invalid marks when the value is out of range, otherwise print the letter grade A, B, C, D or F.",
    "-100 <= marks <= 200"
  ),
  difficulty: "medium",
  variant: "scenario",
  maxscore: 20,
  lang: "java",
  topic: TOPIC,
  subtopic: "else-if Ladder",
  sampleinput1: "95",
  sampleoutput1: "A",
  sampleinput2: "110",
  sampleoutput2: "Invalid marks",
  input1: "85",
  output1: "B",
  input2: "65",
  output2: "D",
  input3: "45",
  output3: "F",
  inputconstrains: "-100 <= marks <= 200",
  blacklist: "switch",
  whitelist: "else if(",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int marks = sc.nextInt();
        if(marks < 0 || marks > 100) {
            System.out.println("Invalid marks");
        } else if(marks >= 90) {
            System.out.println("A");
        } else if(marks >= 80) {
            System.out.println("B");
        } else if(marks >= 70) {
            System.out.println("C");
        } else if(marks >= 60) {
            System.out.println("D");
        } else {
            System.out.println("F");
        }
    }
}`,
});

/* 12 ── medium / scenario / Nested if ──────────────────────────────────── */
codeQuestions.push({
  title: "Triangle Validity and Type",
  description: desc(
    "A geometry tool first applies the triangle inequality: every pair of side lengths must sum to more than the third side, otherwise the sides cannot form a triangle. For a valid triangle it then classifies the shape: all three sides equal is Equilateral, exactly two sides equal is Isosceles and no sides equal is Scalene. Read three sides and print the verdict using nested ifs.",
    "One line with three space-separated integers a, b and c.",
    "Print Invalid triangle, Equilateral, Isosceles or Scalene.",
    "1 <= a, b, c <= 1000"
  ),
  difficulty: "medium",
  variant: "scenario",
  maxscore: 20,
  lang: "java",
  topic: TOPIC,
  subtopic: "Nested if",
  sampleinput1: "3 3 3",
  sampleoutput1: "Equilateral",
  sampleinput2: "5 5 8",
  sampleoutput2: "Isosceles",
  input1: "1 2 9",
  output1: "Invalid triangle",
  input2: "4 5 6",
  output2: "Scalene",
  input3: "2 2 5",
  output3: "Invalid triangle",
  inputconstrains: "1 <= a, b, c <= 1000",
  blacklist: "Math.",
  whitelist: "if(, else",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        int c = sc.nextInt();
        if(a + b > c && a + c > b && b + c > a) {
            if(a == b && b == c) {
                System.out.println("Equilateral");
            } else {
                if(a == b || b == c || a == c) {
                    System.out.println("Isosceles");
                } else {
                    System.out.println("Scalene");
                }
            }
        } else {
            System.out.println("Invalid triangle");
        }
    }
}`,
});

/* 13 ── medium / scenario / switch Statement ───────────────────────────── */
codeQuestions.push({
  title: "Fiscal Quarter Finder",
  description: desc(
    "A finance team maps calendar months to quarters: months 1 to 3 belong to Q1, months 4 to 6 to Q2, months 7 to 9 to Q3 and months 10 to 12 to Q4. Read a month number and use grouped case labels sharing one println per group in a switch statement to print the quarter.",
    "A single integer month.",
    "Print Q1, Q2, Q3 or Q4, or Invalid month when the value is not 1 to 12.",
    "0 <= month <= 15"
  ),
  difficulty: "medium",
  variant: "scenario",
  maxscore: 20,
  lang: "java",
  topic: TOPIC,
  subtopic: "switch Statement",
  sampleinput1: "2",
  sampleoutput1: "Q1",
  sampleinput2: "7",
  sampleoutput2: "Q3",
  input1: "12",
  output1: "Q4",
  input2: "13",
  output2: "Invalid month",
  input3: "0",
  output3: "Invalid month",
  inputconstrains: "0 <= month <= 15",
  blacklist: "Map",
  whitelist: "case",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int month = sc.nextInt();
        switch (month) {
            case 1:
            case 2:
            case 3:
                System.out.println("Q1");
                break;
            case 4:
            case 5:
            case 6:
                System.out.println("Q2");
                break;
            case 7:
            case 8:
            case 9:
                System.out.println("Q3");
                break;
            case 10:
            case 11:
            case 12:
                System.out.println("Q4");
                break;
            default:
                System.out.println("Invalid month");
        }
    }
}`,
});

/* 14 ── medium / scenario / break and continue ─────────────────────────── */
codeQuestions.push({
  title: "Days in Month with Grouped Cases",
  description: desc(
    "A calendar module prints the number of days in a month of a non-leap year using grouped case labels: months 1, 3, 5, 7, 8, 10 and 12 have 31 days; months 4, 6, 9 and 11 have 30; February has 28. Each group ends with break so control leaves the switch after exactly one print — omitting a break would let cases fall through and print wrong results. Read a month number and print its day count.",
    "A single integer month.",
    "Print 31, 30 or 28, or Invalid month when the value is not 1 to 12.",
    "0 <= month <= 15"
  ),
  difficulty: "medium",
  variant: "scenario",
  maxscore: 20,
  lang: "java",
  topic: TOPIC,
  subtopic: "break and continue",
  sampleinput1: "2",
  sampleoutput1: "28",
  sampleinput2: "8",
  sampleoutput2: "31",
  input1: "11",
  output1: "30",
  input2: "4",
  output2: "30",
  input3: "13",
  output3: "Invalid month",
  inputconstrains: "0 <= month <= 15",
  blacklist: "Map, java.time",
  whitelist: "case, break",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int month = sc.nextInt();
        switch (month) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                System.out.println(31);
                break;
            case 4:
            case 6:
            case 9:
            case 11:
                System.out.println(30);
                break;
            case 2:
                System.out.println(28);
                break;
            default:
                System.out.println("Invalid month");
        }
    }
}`,
});

/* 15 ── medium / scenario / break and continue ─────────────────────────── */
codeQuestions.push({
  title: "ATM Menu Simulator",
  description: desc(
    "An ATM simulator processes a list of menu selections. Option 1 prints Balance 5000, option 2 prints Deposit noted, option 3 prints Withdrawal noted, and option 4 prints Session ended and stops the session immediately, ignoring all remaining selections. Any other option prints Invalid option and is skipped without ending the session. Read the number of selections and each selection, and simulate the session using break and continue inside the option loop.",
    "First line: integer n, the number of scheduled selections. Next n lines: one integer option each.",
    "One line per processed selection as described above.",
    "1 <= n <= 50; 0 <= option <= 9"
  ),
  difficulty: "medium",
  variant: "scenario",
  maxscore: 20,
  lang: "java",
  topic: TOPIC,
  subtopic: "break and continue",
  sampleinput1: "5\n1\n2\n4\n1\n2",
  sampleoutput1: "Balance 5000\nDeposit noted\nSession ended",
  sampleinput2: "3\n7\n0\n1",
  sampleoutput2: "Invalid option\nInvalid option\nBalance 5000",
  input1: "4\n3\n9\n1\n2",
  output1: "Withdrawal noted\nInvalid option\nBalance 5000\nDeposit noted",
  input2: "2\n4\n1",
  output2: "Session ended",
  input3: "6\n1\n5\n2\n8\n3\n4",
  output3:
    "Balance 5000\nInvalid option\nDeposit noted\nInvalid option\nWithdrawal noted\nSession ended",
  inputconstrains: "1 <= n <= 50; 0 <= option <= 9",
  blacklist: "Map, System.exit",
  whitelist: "switch, break, continue",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        for (int i = 0; i < n; i++) {
            int op = sc.nextInt();
            if (op == 4) {
                System.out.println("Session ended");
                break;
            }
            if (op < 1 || op > 4) {
                System.out.println("Invalid option");
                continue;
            }
            switch (op) {
                case 1:
                    System.out.println("Balance 5000");
                    break;
                case 2:
                    System.out.println("Deposit noted");
                    break;
                case 3:
                    System.out.println("Withdrawal noted");
                    break;
            }
        }
    }
}`,
});

/* 16 ── medium / scenario / break and continue ─────────────────────────── */
codeQuestions.push({
  title: "Sum Until Zero Skipping Negatives",
  description: desc(
    "A data-entry clerk totals a batch of sensor readings. Positive values are added to a running sum and counted; negative readings are skipped with continue; a zero reading stops processing immediately with break and everything after it is ignored. Read n values and print the final sum and count of the positive values that were processed.",
    "First line: integer n. Second line: n space-separated integers.",
    "Line 1: the sum of the processed positive values. Line 2: the count of the processed positive values.",
    "1 <= n <= 1000; -1000 <= value <= 1000"
  ),
  difficulty: "medium",
  variant: "scenario",
  maxscore: 20,
  lang: "java",
  topic: TOPIC,
  subtopic: "break and continue",
  sampleinput1: "6\n5 -3 8 -1 0 7",
  sampleoutput1: "13\n2",
  sampleinput2: "4\n10 20 30 40",
  sampleoutput2: "100\n4",
  input1: "5\n-2 -5 0 9 1",
  output1: "0\n0",
  input2: "3\n7 0 -9",
  output2: "7\n1",
  input3: "8\n-1 -2 3 -4 5 -6 0 100",
  output3: "8\n2",
  inputconstrains: "1 <= n <= 1000; -1000 <= value <= 1000",
  blacklist: "return, System.exit",
  whitelist: "break, continue",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int sum = 0;
        int count = 0;
        for (int i = 0; i < n; i++) {
            int value = sc.nextInt();
            if (value == 0) {
                break;
            }
            if (value < 0) {
                continue;
            }
            sum += value;
            count++;
        }
        System.out.println(sum);
        System.out.println(count);
    }
}`,
});

/* 17 ── hard / scenario / Nested if ────────────────────────────────────── */
codeQuestions.push({
  title: "Shipping Cost Engine",
  description: desc(
    "A courier prices shipments from a base rate by zone with deeply nested checks. Zone 1 has a base of 50, zone 2 a base of 80 and zone 3 a base of 120; any other zone prints Invalid zone. Inside a valid zone, a package heavier than 40 kg is refused with Too heavy; otherwise the weight adds a surcharge on top of the base: up to 2 kg adds 0, up to 10 kg adds 25, up to 25 kg adds 60 and anything above adds 100. Express delivery (express flag 1) then adds a flat 40 to the total. Read the zone, weight and express flag and print the final cost.",
    "One line with three space-separated integers: zone, weight and express (0 or 1).",
    "Print the total cost, or Invalid zone, or Too heavy.",
    "1 <= zone <= 5; 0 <= weight <= 60; express is 0 or 1"
  ),
  difficulty: "hard",
  variant: "scenario",
  maxscore: 30,
  lang: "java",
  topic: TOPIC,
  subtopic: "Nested if",
  sampleinput1: "1 3 0",
  sampleoutput1: "75",
  sampleinput2: "2 12 1",
  sampleoutput2: "180",
  input1: "1 1 1",
  output1: "90",
  input2: "4 10 0",
  output2: "Invalid zone",
  input3: "3 45 0",
  output3: "Too heavy",
  inputconstrains: "1 <= zone <= 5; 0 <= weight <= 60; express is 0 or 1",
  blacklist: "Map, switch",
  whitelist: "if(",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int zone = sc.nextInt();
        int weight = sc.nextInt();
        int express = sc.nextInt();
        if(zone < 1 || zone > 3) {
            System.out.println("Invalid zone");
        } else {
            if(weight > 40) {
                System.out.println("Too heavy");
            } else {
                int cost;
                if(zone == 1) {
                    cost = 50;
                } else if(zone == 2) {
                    cost = 80;
                } else {
                    cost = 120;
                }
                if(weight <= 2) {
                    cost += 0;
                } else if(weight <= 10) {
                    cost += 25;
                } else if(weight <= 25) {
                    cost += 60;
                } else {
                    cost += 100;
                }
                if(express == 1) {
                    cost += 40;
                }
                System.out.println(cost);
            }
        }
    }
}`,
});

/* 18 ── hard / scenario / switch Statement ─────────────────────────────── */
codeQuestions.push({
  title: "Date Validator and Weekday Finder",
  description: desc(
    "A legacy calendar service validates a date and reports its weekday without using any date library. First the month must be 1 to 12, otherwise print Invalid month. Then the day must fit the month, where February has 29 days in a leap year (a year divisible by 4 and not by 100, or divisible by 400); otherwise print Invalid date. For a valid date compute the weekday with Zeller's congruence: shift January and February to months 13 and 14 of the previous year, let k be the adjusted year % 100 and j the adjusted year / 100, then h = (day + (13 * (m + 1)) / 5 + k + k / 4 + j / 4 + 5 * j) % 7 where h = 0 means Saturday, 1 Sunday, 2 Monday, 3 Tuesday, 4 Wednesday, 5 Thursday and 6 Friday. Print the weekday name using a switch.",
    "One line with three space-separated integers: year, month and day.",
    "Print the weekday name (Monday to Sunday), or Invalid month, or Invalid date.",
    "1900 <= year <= 2100; 0 <= month <= 13; 0 <= day <= 32"
  ),
  difficulty: "hard",
  variant: "scenario",
  maxscore: 30,
  lang: "java",
  topic: TOPIC,
  subtopic: "switch Statement",
  sampleinput1: "2024 2 29",
  sampleoutput1: "Thursday",
  sampleinput2: "2023 2 29",
  sampleoutput2: "Invalid date",
  input1: "2000 1 1",
  output1: "Saturday",
  input2: "2024 13 5",
  output2: "Invalid month",
  input3: "2023 7 4",
  output3: "Tuesday",
  inputconstrains: "1900 <= year <= 2100; 0 <= month <= 13; 0 <= day <= 32",
  blacklist: "java.time, Calendar",
  whitelist: "switch",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int year = sc.nextInt();
        int month = sc.nextInt();
        int day = sc.nextInt();
        boolean leap = (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
        int maxDay;
        switch (month) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                maxDay = 31;
                break;
            case 4:
            case 6:
            case 9:
            case 11:
                maxDay = 30;
                break;
            case 2:
                if (leap) {
                    maxDay = 29;
                } else {
                    maxDay = 28;
                }
                break;
            default:
                maxDay = 0;
        }
        if (maxDay == 0) {
            System.out.println("Invalid month");
        } else if (day < 1 || day > maxDay) {
            System.out.println("Invalid date");
        } else {
            int m = month;
            int y = year;
            if (m <= 2) {
                m += 12;
                y -= 1;
            }
            int k = y % 100;
            int j = y / 100;
            int h = (day + (13 * (m + 1)) / 5 + k + k / 4 + j / 4 + 5 * j) % 7;
            switch (h) {
                case 0:
                    System.out.println("Saturday");
                    break;
                case 1:
                    System.out.println("Sunday");
                    break;
                case 2:
                    System.out.println("Monday");
                    break;
                case 3:
                    System.out.println("Tuesday");
                    break;
                case 4:
                    System.out.println("Wednesday");
                    break;
                case 5:
                    System.out.println("Thursday");
                    break;
                default:
                    System.out.println("Friday");
            }
        }
    }
}`,
});

/* 19 ── hard / scenario / else-if Ladder ───────────────────────────────── */
codeQuestions.push({
  title: "Parking Fee by Vehicle and Duration",
  description: desc(
    "A mall parking system charges by vehicle type and hours parked. The first 4 hours are billed at the base rate per hour and every further hour at a reduced rate, with a daily cap. A bike is billed 10 per hour, then 6 beyond 4 hours, capped at 80. A car is billed 20 per hour, then 12 beyond 4 hours, capped at 150. A truck is billed 30 per hour, then 18 beyond 4 hours, capped at 220. An unknown vehicle type prints Invalid vehicle type. Read the vehicle type and hours, compute the fee with an else-if ladder over the vehicle type and nested checks for the hourly tiers, and print it.",
    "One line with a token vehicle type (bike, car or truck) and an integer hours.",
    "Print the parking fee as an integer, or Invalid vehicle type.",
    "1 <= hours <= 24; vehicle type is bike, car or truck"
  ),
  difficulty: "hard",
  variant: "scenario",
  maxscore: 30,
  lang: "java",
  topic: TOPIC,
  subtopic: "else-if Ladder",
  sampleinput1: "car 3",
  sampleoutput1: "60",
  sampleinput2: "car 10",
  sampleoutput2: "150",
  input1: "bike 2",
  output1: "20",
  input2: "truck 12",
  output2: "220",
  input3: "bus 5",
  output3: "Invalid vehicle type",
  inputconstrains: "1 <= hours <= 24; vehicle type is bike, car or truck",
  blacklist: "switch, Map",
  whitelist: "else if(",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String type = sc.next();
        int hours = sc.nextInt();
        if(type.equals("bike")) {
            int fee;
            if(hours <= 4) {
                fee = 10 * hours;
            } else {
                fee = 40 + 6 * (hours - 4);
            }
            if(fee > 80) {
                fee = 80;
            }
            System.out.println(fee);
        } else if(type.equals("car")) {
            int fee;
            if(hours <= 4) {
                fee = 20 * hours;
            } else {
                fee = 80 + 12 * (hours - 4);
            }
            if(fee > 150) {
                fee = 150;
            }
            System.out.println(fee);
        } else if(type.equals("truck")) {
            int fee;
            if(hours <= 4) {
                fee = 30 * hours;
            } else {
                fee = 120 + 18 * (hours - 4);
            }
            if(fee > 220) {
                fee = 220;
            }
            System.out.println(fee);
        } else {
            System.out.println("Invalid vehicle type");
        }
    }
}`,
});

/* 20 ── hard / scenario / break and continue ───────────────────────────── */
codeQuestions.push({
  title: "Rock Paper Scissors Match",
  description: desc(
    "Two players compete at rock paper scissors. Each round is given as a two-character token: the first character is player A's move and the second is player B's move, using uppercase R, P and S. Rock beats scissors, paper beats rock and scissors beat paper. For each round print A, B or Draw; a token that is not exactly two valid move characters prints Invalid round and is skipped without scoring. The match ends early the moment either player reaches 2 wins, ignoring any remaining rounds. Afterwards print the result line: A wins the match 2-x or B wins the match x-2 when someone reached 2 wins, otherwise Match drawn a-b with the final scores.",
    "First line: integer n, the number of scheduled rounds. Next n lines: one token per round.",
    "One line per processed round (A, B, Draw or Invalid round), then the final result line.",
    "1 <= n <= 20; each round token has 1 to 2 characters"
  ),
  difficulty: "hard",
  variant: "scenario",
  maxscore: 30,
  lang: "java",
  topic: TOPIC,
  subtopic: "break and continue",
  sampleinput1: "3\nRS\nSP\nPR",
  sampleoutput1: "A\nA\nA wins the match 2-0",
  sampleinput2: "4\nRR\nPS\nSS\nSR",
  sampleoutput2: "Draw\nB\nDraw\nB\nB wins the match 0-2",
  input1: "5\nRP\nXX\nRS\nrS\nSP",
  output1: "B\nInvalid round\nA\nInvalid round\nA\nA wins the match 2-1",
  input2: "3\nRR\nSS\nPP",
  output2: "Draw\nDraw\nDraw\nMatch drawn 0-0",
  input3: "2\nSR\nPS",
  output3: "B\nB\nB wins the match 0-2",
  inputconstrains: "1 <= n <= 20; each round token has 1 to 2 characters",
  blacklist: "Map",
  whitelist: "case",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int aWins = 0;
        int bWins = 0;
        for (int i = 0; i < n; i++) {
            String round = sc.next();
            if (round.length() != 2) {
                System.out.println("Invalid round");
                continue;
            }
            char c1 = round.charAt(0);
            char c2 = round.charAt(1);
            if ((c1 != 'R' && c1 != 'P' && c1 != 'S') || (c2 != 'R' && c2 != 'P' && c2 != 'S')) {
                System.out.println("Invalid round");
                continue;
            }
            switch (round) {
                case "RR":
                case "PP":
                case "SS":
                    System.out.println("Draw");
                    break;
                case "RS":
                case "PR":
                case "SP":
                    System.out.println("A");
                    aWins++;
                    break;
                case "RP":
                case "SR":
                case "PS":
                    System.out.println("B");
                    bWins++;
                    break;
            }
            if (aWins == 2 || bWins == 2) {
                break;
            }
        }
        if (aWins == 2) {
            System.out.println("A wins the match 2-" + bWins);
        } else if (bWins == 2) {
            System.out.println("B wins the match " + aWins + "-2");
        } else {
            System.out.println("Match drawn " + aWins + "-" + bWins);
        }
    }
}`,
});

/* ──────────────────────────── MCQ QUESTIONS ───────────────────────────── */

function mcq(
  title: string,
  description: string,
  difficulty: string,
  subtopic: string,
  options: [string, string, string, string],
  correct: number,
  snippet?: string
) {
  return {
    title,
    description,
    difficulty,
    topic: TOPIC,
    subtopic,
    Option1: options[0],
    Option2: options[1],
    Option3: options[2],
    Option4: options[3],
    CorrectOption: correct,
    iscodesnippet: snippet !== undefined,
    codesnippet: snippet !== undefined ? snippet : null,
    snippetLang: snippet !== undefined ? "java" : null,
  };
}

const mcqQuestions: any[] = [];

/* ── easy (10) ─────────────────────────────────────────────────────────── */

mcqQuestions.push(
  mcq(
    "Switch Expression Types",
    "In a classic Java 8 style switch statement, which of the following types can NOT be used directly as the switch expression?",
    "easy",
    "switch Statement",
    ["int", "char", "String", "long"],
    4
  )
);

mcqQuestions.push(
  mcq(
    "Role of break in a switch",
    "What happens when a break statement executes inside a switch case?",
    "easy",
    "break and continue",
    [
      "Control jumps to the next case below",
      "Control exits the switch statement and continues after it",
      "The whole program terminates",
      "The switch starts matching again from the first case",
    ],
    2
  )
);

mcqQuestions.push(
  mcq(
    "Role of continue in a loop",
    "In a Java loop, what does the continue statement do?",
    "easy",
    "break and continue",
    [
      "It terminates the loop completely",
      "It skips the remaining statements of the current iteration and proceeds with the next iteration",
      "It exits the current method",
      "It resets the loop variable and restarts the loop from the first iteration",
    ],
    2
  )
);

mcqQuestions.push(
  mcq(
    "Condition Type of if",
    "In Java, the condition written inside an if statement must be of which type?",
    "easy",
    "if and if-else",
    [
      "int, where 0 means false and any other value means true",
      "boolean only",
      "any numeric type, where nonzero means true",
      "String, where the text true means true",
    ],
    2
  )
);

mcqQuestions.push(
  mcq(
    "Placement of the default Label",
    "In a classic Java switch block, where may the default label appear?",
    "easy",
    "switch Statement",
    [
      "Only as the very last label of the switch block",
      "Only as the very first label of the switch block",
      "Anywhere among the cases, because case matching depends on labels, not on position",
      "Only immediately after the first case label",
    ],
    3
  )
);

mcqQuestions.push(
  mcq(
    "else-if Ladder Execution Rule",
    "In an else-if ladder, several conditions happen to be true at the same time. How many branches execute?",
    "easy",
    "else-if Ladder",
    [
      "All the true branches execute from top to bottom",
      "Only the first true branch executes and the rest of the ladder is skipped",
      "Only the last true branch executes",
      "The ladder re-evaluates every condition from bottom to top",
    ],
    2
  )
);

mcqQuestions.push(
  mcq(
    "Ternary to if-else Conversion",
    "The conditional operator can replace a simple if-else assignment. Which if-else block is equivalent to: int max = (a > b) ? a : b;",
    "easy",
    "if and if-else",
    [
      "int max; if (a > b) { max = a; } else { max = b; }",
      "int max; if (a > b) { max = b; } else { max = a; }",
      "int max = a; if (a > b) { max = b; }",
      "int max; if (a >= b) { max = b; } else { max = a; }",
    ],
    1
  )
);

mcqQuestions.push(
  mcq(
    "Switch With No Matching Case",
    "A switch statement has no default label and none of its case labels matches the switched value. What happens?",
    "easy",
    "switch Statement",
    [
      "A compile-time error occurs",
      "The whole switch is skipped and execution continues with the statement after it",
      "The first case executes as a fallback",
      "A runtime exception is thrown",
    ],
    2
  )
);

mcqQuestions.push(
  mcq(
    "Nested if Evaluation Order",
    "An if statement is nested inside the body of another if statement. When is the inner if condition evaluated?",
    "easy",
    "Nested if",
    [
      "Always, regardless of the outer condition",
      "Only when the outer condition is true",
      "Only when the outer condition is false",
      "Only if the inner condition was true during a previous run",
    ],
    2
  )
);

mcqQuestions.push(
  mcq(
    "break versus continue",
    "Which statement best distinguishes break from continue in Java?",
    "easy",
    "break and continue",
    [
      "break skips to the next iteration while continue exits the loop entirely",
      "break exits the enclosing loop or switch entirely, while continue only skips the remaining statements of the current iteration",
      "Both statements terminate the program immediately",
      "continue works only inside switch statements, while break works only inside loops",
    ],
    2
  )
);

/* ── medium (6) — all code snippets ────────────────────────────────────── */

mcqQuestions.push(
  mcq(
    "Fall-Through Without break",
    "The following Java fragment runs with the variable as initialized. What is printed to the console?",
    "medium",
    "switch Statement",
    [
      "Wed",
      "Wed followed by Thu on the next line",
      "Wed, Thu and then Other",
      "Tue followed by Wed on the next line",
    ],
    2,
    `int day = 3;
switch (day) {
    case 1:
        System.out.println("Mon");
    case 2:
        System.out.println("Tue");
        break;
    case 3:
        System.out.println("Wed");
    case 4:
        System.out.println("Thu");
        break;
    default:
        System.out.println("Other");
}`
  )
);

mcqQuestions.push(
  mcq(
    "default Label First",
    "In this fragment the default label is written first, before the case labels. What is printed when the code runs?",
    "medium",
    "switch Statement",
    [
      "None",
      "Five",
      "None followed by Five on the next line",
      "A compile-time error occurs",
    ],
    2,
    `int x = 5;
switch (x) {
    default:
        System.out.println("None");
        break;
    case 5:
        System.out.println("Five");
        break;
}`
  )
);

mcqQuestions.push(
  mcq(
    "Dangling else Binding",
    "The else looks like it belongs to the outer if because of the indentation, but the compiler applies its own rule: an else binds to the nearest unmatched if. What is the output of this fragment?",
    "medium",
    "if and if-else",
    [
      "X",
      "Y",
      "Nothing is printed",
      "A compile-time error occurs",
    ],
    1,
    `int a = 10;
int b = 20;
if (a > 5)
    if (b > 15)
        System.out.println("X");
else
    System.out.println("Y");`
  )
);

mcqQuestions.push(
  mcq(
    "continue Ahead of break",
    "Trace the loop below carefully, keeping in mind which statements the continue skips. What does it print?",
    "medium",
    "break and continue",
    ["9", "4", "6", "10"],
    1,
    `int sum = 0;
for (int i = 1; i <= 5; i++) {
    if (i % 2 == 0) {
        continue;
    }
    if (i == 4) {
        break;
    }
    sum += i;
}
System.out.println(sum);`
  )
);

mcqQuestions.push(
  mcq(
    "Unreachable Statement After break",
    "A student wrote the following switch statement. What happens when it is compiled?",
    "medium",
    "switch Statement",
    [
      "It prints A and then B",
      "It prints A and then C",
      "It fails to compile with an unreachable statement error",
      "It prints only A",
    ],
    3,
    `int n = 2;
switch (n) {
    case 2:
        System.out.println("A");
        break;
        System.out.println("B");
    default:
        System.out.println("C");
}`
  )
);

mcqQuestions.push(
  mcq(
    "Fall-Through Fee Accumulation",
    "A parking meter charges by code, but some case labels are missing their break statements. What is printed?",
    "medium",
    "switch Statement",
    ["20", "50", "60", "90"],
    2,
    `int code = 2;
int fee = 0;
switch (code) {
    case 1:
        fee += 10;
    case 2:
        fee += 20;
    case 3:
        fee += 30;
        break;
    case 4:
        fee += 40;
}
System.out.println(fee);`
  )
);

/* ── hard (4) — all code snippets ──────────────────────────────────────── */

mcqQuestions.push(
  mcq(
    "Short-Circuit Protects Division",
    "b holds 0, yet this code runs to completion without any exception. What is the output?",
    "hard",
    "if and if-else",
    [
      "High",
      "Safe",
      "An ArithmeticException is thrown at runtime",
      "A compile-time error occurs",
    ],
    2,
    `int a = 5;
int b = 0;
if (b != 0 && a / b > 2) {
    System.out.println("High");
} else {
    System.out.println("Safe");
}`
  )
);

mcqQuestions.push(
  mcq(
    "default Without break Falls On",
    "This switch block places default in the middle, without a break after it, and grade holds the character D. What is printed?",
    "hard",
    "switch Statement",
    [
      "80",
      "0",
      "0 followed by 80 on the next line",
      "0, then 80, then 70",
    ],
    3,
    `char grade = 'D';
switch (grade) {
    case 'A':
        System.out.println(90);
        break;
    default:
        System.out.println(0);
    case 'B':
        System.out.println(80);
        break;
    case 'C':
        System.out.println(70);
}`
  )
);

mcqQuestions.push(
  mcq(
    "while Loop with break and continue",
    "Trace the while loop below, remembering that the counter is incremented at the top of every iteration. What value is printed?",
    "hard",
    "break and continue",
    ["19", "22", "25", "28"],
    1,
    `int i = 0;
int total = 0;
while (i < 10) {
    i++;
    if (i % 3 == 0) {
        continue;
    }
    if (i > 7) {
        break;
    }
    total += i;
}
System.out.println(total);`
  )
);

mcqQuestions.push(
  mcq(
    "continue Inside a switch",
    "The word continue appears inside a switch that sits inside a for loop. What does the program print?",
    "hard",
    "break and continue",
    [
      "42",
      "43",
      "12",
      "A compile-time error occurs because continue cannot appear inside a switch",
    ],
    2,
    `int out = 0;
for (int i = 0; i < 4; i++) {
    switch (i) {
        case 1:
            out += 10;
            break;
        case 2:
            continue;
        case 3:
            out += 30;
    }
    out += 1;
}
System.out.println(out);`
  )
);

/* ─────────────────────────── AUDIT + WRITE PARTS ──────────────────────── */

let issues = 0;
for (const q of codeQuestions) {
  if (q.sourcecode.includes("\\")) {
    issues++;
    console.error("BACKSLASH in code solution: " + q.title);
  }
  for (const item of String(q.blacklist)
    .split(",")
    .map((s: string) => s.trim())
    .filter(Boolean)) {
    if (q.sourcecode.includes(item)) {
      issues++;
      console.error(`BLACKLIST VIOLATION "${q.title}": ${item}`);
    }
  }
  for (const item of String(q.whitelist)
    .split(",")
    .map((s: string) => s.trim())
    .filter(Boolean)) {
    if (!q.sourcecode.includes(item)) {
      issues++;
      console.error(`WHITELIST MISSING "${q.title}": ${item}`);
    }
  }
  if (!q.sourcecode.includes("class Main")) {
    issues++;
    console.error("MISSING class Main: " + q.title);
  }
}
for (const q of mcqQuestions) {
  if (q.codesnippet && String(q.codesnippet).includes("\\")) {
    issues++;
    console.error("BACKSLASH in MCQ snippet: " + q.title);
  }
}

const codeDiff: Record<string, number> = {};
const easyVariant: Record<string, number> = {};
const codeSub: Record<string, number> = {};
for (const q of codeQuestions) {
  codeDiff[q.difficulty] = (codeDiff[q.difficulty] || 0) + 1;
  codeSub[q.subtopic] = (codeSub[q.subtopic] || 0) + 1;
  if (q.difficulty === "easy") {
    easyVariant[q.variant] = (easyVariant[q.variant] || 0) + 1;
  }
}
const mcqDiff: Record<string, number> = {};
for (const q of mcqQuestions) {
  mcqDiff[q.difficulty] = (mcqDiff[q.difficulty] || 0) + 1;
}
const snippetCount = mcqQuestions.filter((q) => q.iscodesnippet).length;

console.log("code difficulty:", JSON.stringify(codeDiff));
console.log("easy variant split:", JSON.stringify(easyVariant));
console.log("code subtopics:", JSON.stringify(codeSub));
console.log("mcq difficulty:", JSON.stringify(mcqDiff));
console.log("mcq snippets:", snippetCount);
console.log("audit issues:", issues);
if (
  codeQuestions.length !== 20 ||
  mcqQuestions.length !== 20 ||
  issues > 0 ||
  codeDiff.easy !== 10 ||
  codeDiff.medium !== 6 ||
  codeDiff.hard !== 4 ||
  easyVariant.basic !== 6 ||
  easyVariant.scenario !== 4 ||
  mcqDiff.easy !== 10 ||
  mcqDiff.medium !== 6 ||
  mcqDiff.hard !== 4 ||
  snippetCount < 6
) {
  console.error("AUDIT FAILED — not writing parts");
  process.exit(1);
}

/* write part files */
fs.writeFileSync(
  path.join(partsDir, "day-03.code.p1.json"),
  JSON.stringify({ day: 3, topics, questions: codeQuestions.slice(0, 10) }, null, 2) + "\n"
);
fs.writeFileSync(
  path.join(partsDir, "day-03.code.p2.json"),
  JSON.stringify({ questions: codeQuestions.slice(10) }, null, 2) + "\n"
);
fs.writeFileSync(
  path.join(partsDir, "day-03.mcq.p1.json"),
  JSON.stringify({ questions: mcqQuestions.slice(0, 10) }, null, 2) + "\n"
);
fs.writeFileSync(
  path.join(partsDir, "day-03.mcq.p2.json"),
  JSON.stringify({ questions: mcqQuestions.slice(10) }, null, 2) + "\n"
);
console.log("wrote 4 part files to", partsDir);
