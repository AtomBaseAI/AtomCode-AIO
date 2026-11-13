/**
 * Generator for Day 2 ("Operators") of the "OOPS using JAVA" question bank.
 * Writes ONLY part files into data/parts/ (merging + validation happen later).
 *
 * Run: bun scripts/oops-java/gen-day02.ts
 */
import fs from "node:fs";
import path from "node:path";

const PARTS_DIR = "/home/z/my-project/scripts/oops-java/data/parts";

const TOPICS = [
  {
    name: "Operators",
    subtopics: [
      "Arithmetic Operators",
      "Relational Operators",
      "Logical Operators",
      "Bitwise Operators",
      "Assignment Operators",
      "Increment and Decrement",
      "Ternary Operator",
      "Type Casting",
      "Operator Precedence",
      "Special Operators",
    ],
  },
];

interface CodeQ {
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  variant: "basic" | "scenario";
  maxscore: number;
  lang: string;
  topic: string;
  subtopic: string;
  sampleinput1: string;
  sampleoutput1: string;
  sampleinput2: string;
  sampleoutput2: string;
  input1: string;
  output1: string;
  input2: string;
  output2: string;
  input3: string;
  output3: string;
  inputconstrains: string;
  blacklist: string;
  whitelist: string;
  sourcecode: string;
}

interface Mcq {
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  topic: string;
  subtopic: string;
  Option1: string;
  Option2: string;
  Option3: string;
  Option4: string;
  CorrectOption: number;
  iscodesnippet: boolean;
  codesnippet: string | null;
  snippetLang: string | null;
}

const codeQs: CodeQ[] = [
  // ───────────────────────── EASY · BASIC (6) ─────────────────────────
  {
    title: "Two Integer Arithmetic Drill",
    description:
      "You are practicing the five basic arithmetic operations. Read two integers and apply all of them.\n\nInput Format:\nOne line with two space-separated integers a and b.\n\nOutput Format:\nPrint five lines, in order: the sum a + b, the difference a - b, the product a * b, the integer quotient a / b, and the remainder a % b.\n\nConstraints:\n1 <= a, b <= 10000; division is integer division, so the quotient is truncated.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "java",
    topic: "Operators",
    subtopic: "Arithmetic Operators",
    sampleinput1: "7 2",
    sampleoutput1: "9\n5\n14\n3\n1",
    sampleinput2: "10 3",
    sampleoutput2: "13\n7\n30\n3\n1",
    input1: "5 7",
    output1: "12\n-2\n35\n0\n5",
    input2: "1000 999",
    output2: "1999\n1\n999000\n1\n1",
    input3: "1 1",
    output3: "2\n0\n1\n1\n0",
    inputconstrains: "1 <= a, b <= 10000",
    blacklist: "",
    whitelist: "",
    sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        System.out.println(a + b);
        System.out.println(a - b);
        System.out.println(a * b);
        System.out.println(a / b);
        System.out.println(a % b);
    }
}`,
  },
  {
    title: "Compare Two Integers",
    description:
      "Practice every relational operator on a pair of integers. Note that Java prints booleans in lowercase.\n\nInput Format:\nOne line with two space-separated integers a and b.\n\nOutput Format:\nPrint six lines (lowercase true or false): the result of a < b, then a > b, a <= b, a >= b, a == b, and a != b.\n\nConstraints:\n0 <= a, b <= 100000.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "java",
    topic: "Operators",
    subtopic: "Relational Operators",
    sampleinput1: "4 9",
    sampleoutput1: "true\nfalse\ntrue\nfalse\nfalse\ntrue",
    sampleinput2: "9 4",
    sampleoutput2: "false\ntrue\nfalse\ntrue\nfalse\ntrue",
    input1: "5 5",
    output1: "false\nfalse\ntrue\ntrue\ntrue\nfalse",
    input2: "0 0",
    output2: "false\nfalse\ntrue\ntrue\ntrue\nfalse",
    input3: "123456 123455",
    output3: "false\ntrue\nfalse\ntrue\nfalse\ntrue",
    inputconstrains: "0 <= a, b <= 100000",
    blacklist: "",
    whitelist: "",
    sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        System.out.println(a < b);
        System.out.println(a > b);
        System.out.println(a <= b);
        System.out.println(a >= b);
        System.out.println(a == b);
        System.out.println(a != b);
    }
}`,
  },
  {
    title: "Compound Assignment Sequence",
    description:
      "Watch how compound assignment operators change a variable step by step. Start with n and apply the sequence below using m, printing n after every step.\n\nInput Format:\nOne line with two space-separated integers n and m.\n\nOutput Format:\nPrint five lines: n after n += m, then after n *= 2, then after n -= m, then after n /= 3, and finally after n %= 7.\n\nConstraints:\n1 <= n, m <= 1000; /= and %= are integer operations.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "java",
    topic: "Operators",
    subtopic: "Assignment Operators",
    sampleinput1: "10 4",
    sampleoutput1: "14\n28\n24\n8\n1",
    sampleinput2: "5 9",
    sampleoutput2: "14\n28\n19\n6\n6",
    input1: "100 7",
    output1: "107\n214\n207\n69\n6",
    input2: "6 6",
    output2: "12\n24\n18\n6\n6",
    input3: "1 1",
    output3: "2\n4\n3\n1\n1",
    inputconstrains: "1 <= n, m <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int m = sc.nextInt();
        n += m;
        System.out.println(n);
        n *= 2;
        System.out.println(n);
        n -= m;
        System.out.println(n);
        n /= 3;
        System.out.println(n);
        n %= 7;
        System.out.println(n);
    }
}`,
  },
  {
    title: "Bitwise Playground",
    description:
      "Explore the bitwise operators on two non-negative integers.\n\nInput Format:\nOne line with two space-separated integers a and b.\n\nOutput Format:\nPrint six lines: a & b, then a | b, then a ^ b, then ~a, then a << 1, and finally a >> 1.\n\nConstraints:\n0 <= a, b <= 100000.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "java",
    topic: "Operators",
    subtopic: "Bitwise Operators",
    sampleinput1: "5 3",
    sampleoutput1: "1\n7\n6\n-6\n10\n2",
    sampleinput2: "12 10",
    sampleoutput2: "8\n14\n6\n-13\n24\n6",
    input1: "0 7",
    output1: "0\n7\n7\n-1\n0\n0",
    input2: "1023 1",
    output2: "1\n1023\n1022\n-1024\n2046\n511",
    input3: "6 6",
    output3: "6\n6\n0\n-7\n12\n3",
    inputconstrains: "0 <= a, b <= 100000",
    blacklist: "",
    whitelist: "",
    sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        System.out.println(a & b);
        System.out.println(a | b);
        System.out.println(a ^ b);
        System.out.println(~a);
        System.out.println(a << 1);
        System.out.println(a >> 1);
    }
}`,
  },
  {
    title: "Increment Decrement Trace",
    description:
      "Trace pre-increment, post-increment, pre-decrement and post-decrement on two variables. The postfix forms yield the old value; the prefix forms yield the new value.\n\nInput Format:\nOne line with two space-separated integers a and b.\n\nOutput Format:\nLet x start as a and y start as b. Print five lines: the value of x++, then ++x, then y--, then --y, and finally x + y.\n\nConstraints:\n1 <= a, b <= 100.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "java",
    topic: "Operators",
    subtopic: "Increment and Decrement",
    sampleinput1: "5 8",
    sampleoutput1: "5\n7\n8\n6\n13",
    sampleinput2: "10 3",
    sampleoutput2: "10\n12\n3\n1\n13",
    input1: "1 1",
    output1: "1\n3\n1\n-1\n2",
    input2: "50 40",
    output2: "50\n52\n40\n38\n90",
    input3: "7 7",
    output3: "7\n9\n7\n5\n14",
    inputconstrains: "1 <= a, b <= 100",
    blacklist: "",
    whitelist: "",
    sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        int x = a;
        int y = b;
        System.out.println(x++);
        System.out.println(++x);
        System.out.println(y--);
        System.out.println(--y);
        System.out.println(x + y);
    }
}`,
  },
  {
    title: "Precedence Evaluation Drill",
    description:
      "Java evaluates *, / and % before + and -, and parentheses override everything. Check six precedence-heavy expressions on three integers.\n\nInput Format:\nOne line with three space-separated integers a, b and c.\n\nOutput Format:\nPrint six lines: a + b * c, then (a + b) * c, then a - b / c, then (a - b) / c, then a * b % c, and finally a + b % c, each evaluated with normal Java precedence.\n\nConstraints:\n1 <= a, b, c <= 100.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "java",
    topic: "Operators",
    subtopic: "Operator Precedence",
    sampleinput1: "2 3 4",
    sampleoutput1: "14\n20\n2\n0\n2\n5",
    sampleinput2: "10 4 3",
    sampleoutput2: "22\n42\n9\n2\n1\n11",
    input1: "5 5 5",
    output1: "30\n50\n4\n0\n0\n5",
    input2: "1 1 2",
    output2: "3\n4\n1\n0\n1\n2",
    input3: "7 2 4",
    output3: "15\n36\n7\n1\n2\n9",
    inputconstrains: "1 <= a, b, c <= 100",
    blacklist: "",
    whitelist: "",
    sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        int c = sc.nextInt();
        System.out.println(a + b * c);
        System.out.println((a + b) * c);
        System.out.println(a - b / c);
        System.out.println((a - b) / c);
        System.out.println(a * b % c);
        System.out.println(a + b % c);
    }
}`,
  },
  // ───────────────────────── EASY · SCENARIO (4) ─────────────────────────
  {
    title: "Trip Expense Splitter",
    description:
      "Four friends went on a trek and paid one total bill. They split the cost equally; whatever cannot be divided evenly stays as leftover rupees.\n\nInput Format:\nOne line with two space-separated integers: the total cost in rupees and the number of friends.\n\nOutput Format:\nPrint two lines: 'Each pays: X' where X is the integer share per friend, then 'Left over: Y' where Y is the remaining rupees.\n\nConstraints:\n1 <= cost <= 1000000 and 1 <= friends <= 100.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "java",
    topic: "Operators",
    subtopic: "Arithmetic Operators",
    sampleinput1: "5000 4",
    sampleoutput1: "Each pays: 1250\nLeft over: 0",
    sampleinput2: "5001 4",
    sampleoutput2: "Each pays: 1250\nLeft over: 1",
    input1: "1000 3",
    output1: "Each pays: 333\nLeft over: 1",
    input2: "999 7",
    output2: "Each pays: 142\nLeft over: 5",
    input3: "100 1",
    output3: "Each pays: 100\nLeft over: 0",
    inputconstrains: "1 <= cost <= 1000000, 1 <= friends <= 100",
    blacklist: "",
    whitelist: "",
    sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int cost = sc.nextInt();
        int friends = sc.nextInt();
        int share = cost / friends;
        int left = cost % friends;
        System.out.println("Each pays: " + share);
        System.out.println("Left over: " + left);
    }
}`,
  },
  {
    title: "Festival Discount Calculator",
    description:
      "During a festival sale a shop gives a flat percentage discount. Purchases of at least 5000 rupees get 20 percent off, everything else gets 10 percent off. The discount is computed with integer arithmetic and truncated.\n\nInput Format:\nOne line with a single integer amount.\n\nOutput Format:\nPrint one line: 'Final price: X' where X is amount minus the truncated discount, choosing the percentage with a ternary expression.\n\nConstraints:\n1 <= amount <= 100000.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "java",
    topic: "Operators",
    subtopic: "Ternary Operator",
    sampleinput1: "6000",
    sampleoutput1: "Final price: 4800",
    sampleinput2: "4999",
    sampleoutput2: "Final price: 4500",
    input1: "5000",
    output1: "Final price: 4000",
    input2: "1200",
    output2: "Final price: 1080",
    input3: "999",
    output3: "Final price: 900",
    inputconstrains: "1 <= amount <= 100000",
    blacklist: "",
    whitelist: "",
    sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int amount = sc.nextInt();
        int pct = (amount >= 5000) ? 20 : 10;
        int discount = amount * pct / 100;
        int price = amount - discount;
        System.out.println("Final price: " + price);
    }
}`,
  },
  {
    title: "Mystery Box Type Checker",
    description:
      "A warehouse scanner reads a tag and a value, then packs the value into an Object box. Depending on the tag, the value is stored as a String (a word), an Integer (a whole number) or a Double (a decimal number). Report what kind of object ended up in the box using instanceof.\n\nInput Format:\nOne line: a tag (text, count or price) followed by one value. For text the value is a single word without spaces; for count it is an integer; for price it is a decimal number.\n\nOutput Format:\nPrint three lines (lowercase true or false): box instanceof String, then box instanceof Integer, then box instanceof Double.\n\nConstraints:\ntag is exactly one of: text, count, price.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "java",
    topic: "Operators",
    subtopic: "Special Operators",
    sampleinput1: "text hello",
    sampleoutput1: "true\nfalse\nfalse",
    sampleinput2: "count 42",
    sampleoutput2: "false\ntrue\nfalse",
    input1: "price 19.5",
    output1: "false\nfalse\ntrue",
    input2: "text 7",
    output2: "true\nfalse\nfalse",
    input3: "price 0",
    output3: "false\nfalse\ntrue",
    inputconstrains: "tag is one of: text, count, price",
    blacklist: "",
    whitelist: "",
    sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String tag = sc.next();
        Object box;
        if (tag.equals("text")) {
            box = sc.next();
        } else if (tag.equals("count")) {
            box = sc.nextInt();
        } else {
            box = sc.nextDouble();
        }
        System.out.println(box instanceof String);
        System.out.println(box instanceof Integer);
        System.out.println(box instanceof Double);
    }
}`,
  },
  {
    title: "Celsius to Fahrenheit Converter",
    description:
      "A weather app converts Celsius to Fahrenheit. Besides the exact value it also shows the whole-degree mark obtained with an explicit (int) cast.\n\nInput Format:\nOne line with a single decimal number celsius.\n\nOutput Format:\nLine 1: 'Fahrenheit: X' with X printed to exactly 2 decimals, where F = C * 9 / 5 + 32. Line 2: 'Whole degrees: N' where N is (int) F.\n\nConstraints:\n-50.0 <= celsius <= 150.0.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "java",
    topic: "Operators",
    subtopic: "Type Casting",
    sampleinput1: "37",
    sampleoutput1: "Fahrenheit: 98.60\nWhole degrees: 98",
    sampleinput2: "0",
    sampleoutput2: "Fahrenheit: 32.00\nWhole degrees: 32",
    input1: "100",
    output1: "Fahrenheit: 212.00\nWhole degrees: 212",
    input2: "-40",
    output2: "Fahrenheit: -40.00\nWhole degrees: -40",
    input3: "36.6",
    output3: "Fahrenheit: 97.88\nWhole degrees: 97",
    inputconstrains: "-50.0 <= celsius <= 150.0",
    blacklist: "",
    whitelist: "",
    sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double c = sc.nextDouble();
        double f = c * 9 / 5 + 32;
        int whole = (int) f;
        System.out.printf("Fahrenheit: %.2f%n", f);
        System.out.println("Whole degrees: " + whole);
    }
}`,
  },
  // ───────────────────────── MEDIUM (6) ─────────────────────────
  {
    title: "Leap Year Checker",
    description:
      "Every February 29 the calendar team re-checks the leap year rule: a year is leap if it is divisible by 400, or divisible by 4 but not by 100. Decide using the logical operators || and &&.\n\nInput Format:\nOne line with a single integer year.\n\nOutput Format:\nPrint a single line, lowercase true or false.\n\nConstraints:\n1 <= year <= 3000.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "java",
    topic: "Operators",
    subtopic: "Logical Operators",
    sampleinput1: "2000",
    sampleoutput1: "true",
    sampleinput2: "1900",
    sampleoutput2: "false",
    input1: "2024",
    output1: "true",
    input2: "2023",
    output2: "false",
    input3: "1600",
    output3: "true",
    inputconstrains: "1 <= year <= 3000",
    blacklist: "java.time",
    whitelist: "&&",
    sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int year = sc.nextInt();
        boolean leap = (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
        System.out.println(leap);
    }
}`,
  },
  {
    title: "Permission Flags Checker",
    description:
      "A server stores user rights as an 8-bit permission mask. Given two users' masks, report the rights they share, the rights anyone holds, and the rights only the first user has. Use the bitwise operators & and | (with ~ for the complement).\n\nInput Format:\nOne line with two space-separated integers p1 and p2.\n\nOutput Format:\nPrint three lines: 'Shared: X' where X = p1 & p2, then 'Combined: Y' where Y = p1 | p2, then 'Only in first: Z' where Z = p1 & ~p2.\n\nConstraints:\n0 <= p1, p2 <= 255.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "java",
    topic: "Operators",
    subtopic: "Bitwise Operators",
    sampleinput1: "12 10",
    sampleoutput1: "Shared: 8\nCombined: 14\nOnly in first: 4",
    sampleinput2: "5 5",
    sampleoutput2: "Shared: 5\nCombined: 5\nOnly in first: 0",
    input1: "0 7",
    output1: "Shared: 0\nCombined: 7\nOnly in first: 0",
    input2: "200 56",
    output2: "Shared: 8\nCombined: 248\nOnly in first: 192",
    input3: "255 1",
    output3: "Shared: 1\nCombined: 255\nOnly in first: 254",
    inputconstrains: "0 <= p1, p2 <= 255",
    blacklist: "EnumSet",
    whitelist: "&",
    sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int first = sc.nextInt();
        int second = sc.nextInt();
        int shared = first & second;
        int combined = first | second;
        int onlyFirst = first & ~second;
        System.out.println("Shared: " + shared);
        System.out.println("Combined: " + combined);
        System.out.println("Only in first: " + onlyFirst);
    }
}`,
  },
  {
    title: "Grade From Marks Ternary Chain",
    description:
      "An exam portal maps marks to letter grades with a single nested ternary expression (if statements are forbidden): 90 or above is A, 75 to 89 is B, 60 to 74 is C, 40 to 59 is D, below 40 is F.\n\nInput Format:\nOne line with a single integer marks.\n\nOutput Format:\nPrint the single letter grade.\n\nConstraints:\n0 <= marks <= 100.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "java",
    topic: "Operators",
    subtopic: "Ternary Operator",
    sampleinput1: "95",
    sampleoutput1: "A",
    sampleinput2: "90",
    sampleoutput2: "A",
    input1: "74",
    output1: "C",
    input2: "59",
    output2: "D",
    input3: "39",
    output3: "F",
    inputconstrains: "0 <= marks <= 100",
    blacklist: "if",
    whitelist: "?",
    sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int m = sc.nextInt();
        String grade = (m >= 90) ? "A" : (m >= 75) ? "B" : (m >= 60) ? "C" : (m >= 40) ? "D" : "F";
        System.out.println(grade);
    }
}`,
  },
  {
    title: "Meter to Feet and Inches Converter",
    description:
      "A travel app converts metres for hikers. It reports the complete feet (truncated with an explicit (int) cast) plus the leftover inches, using 1 metre = 3.28084 feet.\n\nInput Format:\nOne line with a single decimal number meters.\n\nOutput Format:\nLine 1: 'Feet: N' where N is the integer part of meters * 3.28084 obtained by an (int) cast. Line 2: 'Inches: X' where X is the remaining (totalFeet - feet) * 12 printed to exactly 2 decimals.\n\nConstraints:\n0 <= meters <= 100.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "java",
    topic: "Operators",
    subtopic: "Type Casting",
    sampleinput1: "1",
    sampleoutput1: "Feet: 3\nInches: 3.37",
    sampleinput2: "2",
    sampleoutput2: "Feet: 6\nInches: 6.74",
    input1: "0.5",
    output1: "Feet: 1\nInches: 7.69",
    input2: "0",
    output2: "Feet: 0\nInches: 0.00",
    input3: "1.8",
    output3: "Feet: 5\nInches: 10.87",
    inputconstrains: "0 <= meters <= 100",
    blacklist: "Math.round",
    whitelist: "(int)",
    sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double meters = sc.nextDouble();
        double totalFeet = meters * 3.28084;
        int feet = (int) totalFeet;
        double inches = (totalFeet - feet) * 12;
        System.out.println("Feet: " + feet);
        System.out.printf("Inches: %.2f%n", inches);
    }
}`,
  },
  {
    title: "XOR Swap Without Extra Variable",
    description:
      "Old-school programmers swapped two variables without any extra variable using only the XOR operator. Demonstrate the trick: apply a ^= b, then b ^= a, then a ^= b.\n\nInput Format:\nOne line with two space-separated integers a and b.\n\nOutput Format:\nPrint two lines after the swap: 'First: X' holding the original b, then 'Second: Y' holding the original a.\n\nConstraints:\n0 <= a, b <= 100000.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "java",
    topic: "Operators",
    subtopic: "Assignment Operators",
    sampleinput1: "3 7",
    sampleoutput1: "First: 7\nSecond: 3",
    sampleinput2: "10 10",
    sampleoutput2: "First: 10\nSecond: 10",
    input1: "0 255",
    output1: "First: 255\nSecond: 0",
    input2: "12345 54321",
    output2: "First: 54321\nSecond: 12345",
    input3: "1 2",
    output3: "First: 2\nSecond: 1",
    inputconstrains: "0 <= a, b <= 100000",
    blacklist: "temp",
    whitelist: "^",
    sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        a ^= b;
        b ^= a;
        a ^= b;
        System.out.println("First: " + a);
        System.out.println("Second: " + b);
    }
}`,
  },
  {
    title: "Electricity Bill Slab Calculator",
    description:
      "A city bills electricity in slabs: the first 100 units cost 3.50 per unit, the next 100 units cost 5.00 per unit, and every unit above 200 costs 8.00 per unit. Accumulate the bill with compound assignment using relational comparisons.\n\nInput Format:\nOne line with a single integer units.\n\nOutput Format:\nPrint one line: the bill amount to exactly 2 decimals.\n\nConstraints:\n0 <= units <= 5000.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "java",
    topic: "Operators",
    subtopic: "Relational Operators",
    sampleinput1: "150",
    sampleoutput1: "600.00",
    sampleinput2: "250",
    sampleoutput2: "1250.00",
    input1: "50",
    output1: "175.00",
    input2: "100",
    output2: "350.00",
    input3: "0",
    output3: "0.00",
    inputconstrains: "0 <= units <= 5000",
    blacklist: "BigDecimal",
    whitelist: "+=",
    sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int units = sc.nextInt();
        double bill = 0;
        if (units > 200) {
            bill += (units - 200) * 8.0;
            units = 200;
        }
        if (units > 100) {
            bill += (units - 100) * 5.0;
            units = 100;
        }
        bill += units * 3.5;
        System.out.printf("%.2f%n", bill);
    }
}`,
  },
  // ───────────────────────── HARD (4) ─────────────────────────
  {
    title: "Set Bits and Highest Position",
    description:
      "A debugging toolbox inspects the bits of a number. For the given non-negative integer report how many bits are set, the position of the highest set bit (0-indexed; use -1 when the number is 0), and whether the number is an exact power of two. Use the unsigned right shift >>> to walk the bits.\n\nInput Format:\nOne line with a single integer n.\n\nOutput Format:\nThree lines: 'Set bits: X', then 'Highest position: Y', then 'Power of two: Z' where Z is lowercase true or false.\n\nConstraints:\n0 <= n <= 1000000000.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "java",
    topic: "Operators",
    subtopic: "Bitwise Operators",
    sampleinput1: "13",
    sampleoutput1: "Set bits: 3\nHighest position: 3\nPower of two: false",
    sampleinput2: "1",
    sampleoutput2: "Set bits: 1\nHighest position: 0\nPower of two: true",
    input1: "0",
    output1: "Set bits: 0\nHighest position: -1\nPower of two: false",
    input2: "1024",
    output2: "Set bits: 1\nHighest position: 10\nPower of two: true",
    input3: "999999999",
    output3: "Set bits: 21\nHighest position: 29\nPower of two: false",
    inputconstrains: "0 <= n <= 1000000000",
    blacklist: "Integer.bitCount",
    whitelist: ">>>",
    sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int work = n;
        int count = 0;
        while (work != 0) {
            count += work & 1;
            work >>>= 1;
        }
        int probe = n;
        int pos = -1;
        while (probe != 0) {
            probe >>>= 1;
            pos++;
        }
        boolean pow2 = n > 0 && (n & (n - 1)) == 0;
        System.out.println("Set bits: " + count);
        System.out.println("Highest position: " + pos);
        System.out.println("Power of two: " + pow2);
    }
}`,
  },
  {
    title: "Salary Bonus With Nested Ternaries",
    description:
      "A company pays an annual bonus decided by rating and service years, coded as one nested ternary expression (if statements are forbidden): rating 1 earns 20 percent for 5 or more years of service, otherwise 15 percent; rating 2 earns 12 percent for 5 or more years, otherwise 8 percent; rating 3 always earns 5 percent. Also report the truncated whole-rupee monthly hike.\n\nInput Format:\nOne line: salary (decimal number), years (integer) and rating (1 to 3), space separated.\n\nOutput Format:\nLine 1: 'Bonus: X' with X to exactly 2 decimals. Line 2: 'New salary: Y' with Y to exactly 2 decimals. Line 3: 'Monthly hike: N' where N is (int) (bonus / 12).\n\nConstraints:\n1000 <= salary <= 1000000; 0 <= years <= 40; rating is 1, 2 or 3.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "java",
    topic: "Operators",
    subtopic: "Ternary Operator",
    sampleinput1: "60000 7 1",
    sampleoutput1: "Bonus: 12000.00\nNew salary: 72000.00\nMonthly hike: 1000",
    sampleinput2: "60000 3 1",
    sampleoutput2: "Bonus: 9000.00\nNew salary: 69000.00\nMonthly hike: 750",
    input1: "50000 6 2",
    output1: "Bonus: 6000.00\nNew salary: 56000.00\nMonthly hike: 500",
    input2: "80000 2 2",
    output2: "Bonus: 6400.00\nNew salary: 86400.00\nMonthly hike: 533",
    input3: "45000 1 3",
    output3: "Bonus: 2250.00\nNew salary: 47250.00\nMonthly hike: 187",
    inputconstrains: "1000 <= salary <= 1000000, 0 <= years <= 40, rating in 1..3",
    blacklist: "if",
    whitelist: "?",
    sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double salary = sc.nextDouble();
        int years = sc.nextInt();
        int rating = sc.nextInt();
        int pct = (rating == 1) ? ((years >= 5) ? 20 : 15) : (rating == 2) ? ((years >= 5) ? 12 : 8) : 5;
        double bonus = salary * pct / 100.0;
        double total = salary + bonus;
        int monthly = (int) (bonus / 12);
        System.out.printf("Bonus: %.2f%n", bonus);
        System.out.printf("New salary: %.2f%n", total);
        System.out.println("Monthly hike: " + monthly);
    }
}`,
  },
  {
    title: "Decimal to Binary via Shifts",
    description:
      "A low-level tool shows a number in base 2 without using Integer.toBinaryString: it starts from a single 1-bit flag shifted left until it sits above the highest set bit, then walks the flag down while printing one bit at a time. It also previews two shift results.\n\nInput Format:\nOne line with a single integer n.\n\nOutput Format:\nLine 1: 'Binary: B' with no leading zeros (just 0 when n is 0). Line 2: 'Doubled: X' which is n << 1. Line 3: 'Halved: Y' which is n >> 1.\n\nConstraints:\n0 <= n <= 1000000000.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "java",
    topic: "Operators",
    subtopic: "Bitwise Operators",
    sampleinput1: "10",
    sampleoutput1: "Binary: 1010\nDoubled: 20\nHalved: 5",
    sampleinput2: "0",
    sampleoutput2: "Binary: 0\nDoubled: 0\nHalved: 0",
    input1: "1",
    output1: "Binary: 1\nDoubled: 2\nHalved: 0",
    input2: "5",
    output2: "Binary: 101\nDoubled: 10\nHalved: 2",
    input3: "1000000000",
    output3: "Binary: 111011100110101100101000000000\nDoubled: 2000000000\nHalved: 500000000",
    inputconstrains: "0 <= n <= 1000000000",
    blacklist: "Integer.toBinaryString",
    whitelist: "<<",
    sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        String binary = "";
        long p = 1L << 30;
        while (p > 0 && (n & p) == 0) {
            p >>= 1;
        }
        if (n == 0) {
            binary = "0";
        }
        while (p > 0) {
            binary += ((n & p) != 0) ? "1" : "0";
            p >>= 1;
        }
        System.out.println("Binary: " + binary);
        System.out.println("Doubled: " + (n << 1));
        System.out.println("Halved: " + (n >> 1));
    }
}`,
  },
  {
    title: "Fast Power Modulo Calculator",
    description:
      "Cryptographic routines raise huge powers but only need the remainder. Compute base raised to exponent modulo m using fast modular exponentiation (square-and-multiply) in a while loop. Remember that in Java the * operator binds tighter than %, so result * base % m means (result * base) % m.\n\nInput Format:\nOne line with three space-separated integers: base, exponent and modulus.\n\nOutput Format:\nPrint one line: base raised to exponent, modulo modulus.\n\nConstraints:\n1 <= base <= 2000000000; 0 <= exponent <= 1000000000; 1 <= modulus <= 2000000000.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "java",
    topic: "Operators",
    subtopic: "Operator Precedence",
    sampleinput1: "2 10 1000",
    sampleoutput1: "24",
    sampleinput2: "3 5 100",
    sampleoutput2: "43",
    input1: "10 0 7",
    output1: "1",
    input2: "5 3 1",
    output2: "0",
    input3: "7 13 100",
    output3: "7",
    inputconstrains: "1 <= base <= 2000000000, 0 <= exponent <= 1000000000, 1 <= modulus <= 2000000000",
    blacklist: "Math.pow",
    whitelist: "while(",
    sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long a = sc.nextLong();
        long b = sc.nextLong();
        long m = sc.nextLong();
        long result = 1 % m;
        long base = a % m;
        while(b > 0) {
            if ((b & 1) == 1) {
                result = result * base % m;
            }
            base = base * base % m;
            b >>= 1;
        }
        System.out.println(result);
    }
}`,
  },
];

const mcqQs: Mcq[] = [
  // ───────────────────────── EASY (10) ─────────────────────────
  {
    title: "Spot the Non Arithmetic Operator",
    description:
      "Java arithmetic operators are +, -, *, / and %. One of the options below belongs to a different operator family. Which of the following is NOT an arithmetic operator in Java?",
    difficulty: "easy",
    topic: "Operators",
    subtopic: "Arithmetic Operators",
    Option1: "+",
    Option2: "%",
    Option3: "&",
    Option4: "-",
    CorrectOption: 3,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Integer Division and Remainder",
    description:
      "Both operands are int, so / performs integer division and % gives the remainder. What are the values of the expressions 17 / 5 and 17 % 5 in Java?",
    difficulty: "easy",
    topic: "Operators",
    subtopic: "Arithmetic Operators",
    Option1: "3 and 2",
    Option2: "3.4 and 2",
    Option3: "2 and 3",
    Option4: "3 and 3",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Comparing int With double",
    description:
      "When one operand of == is int and the other is double, the int is promoted to double before the comparison. What does the expression 7 == 7.0 evaluate to in Java?",
    difficulty: "easy",
    topic: "Operators",
    subtopic: "Relational Operators",
    Option1: "false",
    Option2: "true",
    Option3: "7",
    Option4: "Compile error",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "When Logical AND Is True",
    description:
      "The logical AND operator combines two boolean operands. The && operator returns true only when which condition holds?",
    difficulty: "easy",
    topic: "Operators",
    subtopic: "Logical Operators",
    Option1: "At least one operand is true",
    Option2: "Both operands are true",
    Option3: "Exactly one operand is true",
    Option4: "The two operands are different",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Bitwise AND Result",
    description:
      "6 in binary is 110 and 3 is 011; the & operator combines the numbers bit by bit. What is the value of the expression 6 & 3?",
    difficulty: "easy",
    topic: "Operators",
    subtopic: "Bitwise Operators",
    Option1: "7",
    Option2: "2",
    Option3: "3",
    Option4: "1",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Compound Modulo Assignment",
    description:
      "Java offers a compound assignment form for every binary arithmetic operator. Which single statement is equivalent to x = x % 5;?",
    difficulty: "easy",
    topic: "Operators",
    subtopic: "Assignment Operators",
    Option1: "x %= 5;",
    Option2: "x =% 5;",
    Option3: "x =/ 5;",
    Option4: "x %%= 5;",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Postfix Increment Output",
    description:
      "The postfix increment operator yields the old value first and increments afterwards. The snippet below is compiled and run. What is printed?\n\nint x = 5;\nSystem.out.println(x++);",
    difficulty: "easy",
    topic: "Operators",
    subtopic: "Increment and Decrement",
    Option1: "6",
    Option2: "5",
    Option3: "4",
    Option4: "7",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `int x = 5;
System.out.println(x++);`,
    snippetLang: "java",
  },
  {
    title: "Ternary Operator Symbols",
    description:
      "It needs exactly two symbols and three operands. Which pair of symbols forms the conditional (ternary) operator in Java?",
    difficulty: "easy",
    topic: "Operators",
    subtopic: "Ternary Operator",
    Option1: "?<",
    Option2: "?:",
    Option3: "::",
    Option4: "->",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Casting double To int",
    description:
      "A cast from double to int never rounds; it truncates toward zero. What is the value of the expression (int) 7.9 in Java?",
    difficulty: "easy",
    topic: "Operators",
    subtopic: "Type Casting",
    Option1: "7.9",
    Option2: "8",
    Option3: "7",
    Option4: "0.9",
    CorrectOption: 3,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Purpose of instanceof",
    description:
      "It is a comparison operator that works on object references, not on primitives. The instanceof operator in Java is used to do what?",
    difficulty: "easy",
    topic: "Operators",
    subtopic: "Special Operators",
    Option1: "Check whether an object is an instance of a given type",
    Option2: "Compare two primitive values for equality",
    Option3: "Create a new object of a class",
    Option4: "Convert one primitive type into another",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  // ───────────────────────── MEDIUM (6) ─────────────────────────
  {
    title: "Mixed Increment Expression",
    description:
      "Both operands of + are evaluated left to right, and each increment applies immediately. The snippet below is compiled and run. What line does it print?",
    difficulty: "medium",
    topic: "Operators",
    subtopic: "Increment and Decrement",
    Option1: "6 11",
    Option2: "7 11",
    Option3: "7 12",
    Option4: "6 12",
    CorrectOption: 3,
    iscodesnippet: true,
    codesnippet: `int a = 5;
int b = a++ + ++a;
System.out.println(a + " " + b);`,
    snippetLang: "java",
  },
  {
    title: "Multiplication Modulo Precedence",
    description:
      "Java applies *, / and % (same precedence, left to right) before + and -. What does this program print?",
    difficulty: "medium",
    topic: "Operators",
    subtopic: "Operator Precedence",
    Option1: "12",
    Option2: "15",
    Option3: "10",
    Option4: "9",
    CorrectOption: 3,
    iscodesnippet: true,
    codesnippet: `int x = 10 + 3 * 2 % 5 - 1;
System.out.println(x);`,
    snippetLang: "java",
  },
  {
    title: "Short Circuit Side Effect",
    description:
      "The right operand of && is not evaluated at all when the left operand is already false. What does this program print?",
    difficulty: "medium",
    topic: "Operators",
    subtopic: "Logical Operators",
    Option1: "2",
    Option2: "1",
    Option3: "0",
    Option4: "3",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `int count = 0;
boolean r = (count++ > 0) && (count++ > 0);
System.out.println(count);`,
    snippetLang: "java",
  },
  {
    title: "Compound Assignment Implicit Cast",
    description:
      "A compound assignment like += contains a hidden cast back to the declared variable type. What does this program print?",
    difficulty: "medium",
    topic: "Operators",
    subtopic: "Assignment Operators",
    Option1: "Compile error",
    Option2: "10",
    Option3: "127",
    Option4: "11",
    CorrectOption: 4,
    iscodesnippet: true,
    codesnippet: `byte b = 10;
b += 1;
System.out.println(b);`,
    snippetLang: "java",
  },
  {
    title: "Modulo With Negative Operands",
    description:
      "Java truncates integer division toward zero, and the remainder takes the sign of the dividend. What are the values of -7 / 2 and -7 % 2?",
    difficulty: "medium",
    topic: "Operators",
    subtopic: "Arithmetic Operators",
    Option1: "-4 and 1",
    Option2: "-3 and -1",
    Option3: "-3 and 1",
    Option4: "-4 and -1",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "instanceof With null",
    description:
      "The instanceof operator never throws for a null reference; it simply returns a constant result. What does this program print?",
    difficulty: "medium",
    topic: "Operators",
    subtopic: "Special Operators",
    Option1: "true",
    Option2: "false",
    Option3: "NullPointerException at runtime",
    Option4: "Compile error",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `String s = null;
System.out.println(s instanceof String);`,
    snippetLang: "java",
  },
  // ───────────────────────── HARD (4) ─────────────────────────
  {
    title: "Unsigned Right Shift On Negative Number",
    description:
      "The >>> operator shifts zeros into the high-order bits regardless of the sign bit, treating the operand as an unsigned 32-bit pattern. What does this program print?",
    difficulty: "hard",
    topic: "Operators",
    subtopic: "Bitwise Operators",
    Option1: "-1",
    Option2: "1",
    Option3: "7",
    Option4: "0",
    CorrectOption: 3,
    iscodesnippet: true,
    codesnippet: `int n = -8;
System.out.println(n >>> 29);`,
    snippetLang: "java",
  },
  {
    title: "Ternary Numeric Promotion",
    description:
      "When the two result expressions of ?: have different numeric types, binary numeric promotion happens before any boxing. What does this program print?",
    difficulty: "hard",
    topic: "Operators",
    subtopic: "Type Casting",
    Option1: "java.lang.Integer",
    Option2: "java.lang.Double",
    Option3: "java.lang.Object",
    Option4: "Compile error",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `Object o = true ? 1 : 2.0;
System.out.println(o.getClass().getName());`,
    snippetLang: "java",
  },
  {
    title: "Increment Inside Larger Expression",
    description:
      "Left operands are evaluated before right ones, and every ++ or -- takes effect immediately. What does this program print?",
    difficulty: "hard",
    topic: "Operators",
    subtopic: "Increment and Decrement",
    Option1: "16",
    Option2: "14",
    Option3: "17",
    Option4: "15",
    CorrectOption: 4,
    iscodesnippet: true,
    codesnippet: `int x = 5;
int y = x++ * 2 + --x;
System.out.println(y);`,
    snippetLang: "java",
  },
  {
    title: "Integer Overflow Wrap",
    description:
      "int arithmetic neither throws nor widens on overflow; it simply wraps around. What does this program print?",
    difficulty: "hard",
    topic: "Operators",
    subtopic: "Arithmetic Operators",
    Option1: "2147483648",
    Option2: "-2147483648",
    Option3: "Compile error",
    Option4: "0",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `int x = 2147483647;
System.out.println(x + 1);`,
    snippetLang: "java",
  },
];

/* ── internal pre-checks before writing parts ── */
function fail(msg: string): never {
  throw new Error(msg);
}

if (codeQs.length !== 20) fail(`expected 20 code questions, got ${codeQs.length}`);
if (mcqQs.length !== 20) fail(`expected 20 MCQs, got ${mcqQs.length}`);

const codeCounts = { easy: 0, medium: 0, hard: 0, basic: 0, scenario: 0 };
for (const q of codeQs) {
  codeCounts[q.difficulty]++;
  codeCounts[q.variant]++;
  if (q.sourcecode.includes("\\")) fail(`backslash in sourcecode: ${q.title}`);
  if (!q.sourcecode.includes("class Main")) fail(`missing class Main: ${q.title}`);
  for (const kw of q.blacklist.split(",").map((s) => s.trim()).filter(Boolean)) {
    if (q.sourcecode.includes(kw)) fail(`blacklisted "${kw}" present in ${q.title}`);
  }
  for (const kw of q.whitelist.split(",").map((s) => s.trim()).filter(Boolean)) {
    if (!q.sourcecode.includes(kw)) fail(`whitelisted "${kw}" missing in ${q.title}`);
  }
  for (const f of [
    "sampleinput1", "sampleoutput1", "sampleinput2", "sampleoutput2",
    "input1", "output1", "input2", "output2", "input3", "output3",
  ] as const) {
    if (q[f].length === 0) fail(`empty ${f} in ${q.title}`);
  }
  if (q.difficulty === "easy" && (q.blacklist || q.whitelist)) fail(`easy has checks: ${q.title}`);
  if (q.difficulty === "easy" && q.maxscore !== 10) fail(`easy maxscore: ${q.title}`);
  if (q.difficulty === "medium" && (!q.blacklist || !q.whitelist || q.maxscore !== 20)) fail(`medium checks: ${q.title}`);
  if (q.difficulty === "hard" && (!q.blacklist || !q.whitelist || q.maxscore !== 30)) fail(`hard checks: ${q.title}`);
}
if (codeCounts.easy !== 10 || codeCounts.medium !== 6 || codeCounts.hard !== 4) {
  fail(`code difficulty split: ${JSON.stringify(codeCounts)}`);
}
const easyVariant = { basic: 0, scenario: 0 };
for (const q of codeQs) {
  if (q.difficulty === "easy") easyVariant[q.variant]++;
}
if (easyVariant.basic !== 6 || easyVariant.scenario !== 4) {
  fail(`easy variant split: basic=${easyVariant.basic} scenario=${easyVariant.scenario}`);
}

const covered = new Set(codeQs.map((q) => q.subtopic));
for (const st of TOPICS[0].subtopics) {
  if (!covered.has(st)) fail(`subtopic not covered by any code question: ${st}`);
}

const mcqCounts = { easy: 0, medium: 0, hard: 0 };
let snippets = 0;
const mcqTitles = new Set<string>();
const codeTitles = new Set<string>();
for (const q of codeQs) {
  if (codeTitles.has(q.title)) fail(`duplicate code title: ${q.title}`);
  codeTitles.add(q.title);
}
for (const q of mcqQs) {
  mcqCounts[q.difficulty]++;
  if (mcqTitles.has(q.title)) fail(`duplicate mcq title: ${q.title}`);
  mcqTitles.add(q.title);
  if (q.iscodesnippet) {
    snippets++;
    if (!q.codesnippet || q.codesnippet.includes("\\")) fail(`snippet problem: ${q.title}`);
    if (q.snippetLang !== "java") fail(`snippet lang: ${q.title}`);
  } else if (q.codesnippet) {
    fail(`codesnippet set but iscodesnippet false: ${q.title}`);
  }
  const opts = [q.Option1, q.Option2, q.Option3, q.Option4];
  if (new Set(opts).size !== 4) fail(`options not distinct: ${q.title}`);
  if (![1, 2, 3, 4].includes(q.CorrectOption)) fail(`bad CorrectOption: ${q.title}`);
  const lower = opts.map((o) => o.toLowerCase());
  if (lower.some((o) => o.includes("all of the above") || o.includes("none of the above"))) {
    fail(`forbidden option text: ${q.title}`);
  }
}
if (mcqCounts.easy !== 10 || mcqCounts.medium !== 6 || mcqCounts.hard !== 4) {
  fail(`mcq difficulty split: ${JSON.stringify(mcqCounts)}`);
}
if (snippets < 6) fail(`only ${snippets} snippet MCQs, need >= 6`);

/* ── write the four part files ── */
fs.mkdirSync(PARTS_DIR, { recursive: true });

function write(file: string, obj: unknown) {
  const fp = path.join(PARTS_DIR, file);
  fs.writeFileSync(fp, JSON.stringify(obj, null, 2) + "\n");
  console.log(`wrote ${fp}`);
}

write("day-02.code.p1.json", { day: 2, topics: TOPICS, questions: codeQs.slice(0, 10) });
write("day-02.code.p2.json", { questions: codeQs.slice(10) });
write("day-02.mcq.p1.json", { day: 2, questions: mcqQs.slice(0, 10) });
write("day-02.mcq.p2.json", { questions: mcqQs.slice(10) });

console.log(
  `OK: code easy=${codeCounts.easy} medium=${codeCounts.medium} hard=${codeCounts.hard} ` +
    `(basic=${codeCounts.basic} scenario=${codeCounts.scenario}); ` +
    `mcq easy=${mcqCounts.easy} medium=${mcqCounts.medium} hard=${mcqCounts.hard}; snippets=${snippets}`
);
console.log("Code titles:");
codeQs.forEach((q, i) => console.log(`  ${i + 1}. [${q.difficulty}/${q.variant}/${q.subtopic}] ${q.title}`));
