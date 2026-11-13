/**
 * Builder for Day 2 — "Python Syntax and Data Types".
 * Emits:
 *   /home/z/my-project/scripts/python-programming/data/day-02.code.json  (20 code questions)
 *   /home/z/my-project/scripts/python-programming/data/day-02.mcq.json   (20 MCQ questions)
 */
import { writeFileSync } from "node:fs";

const DAY = 2;
const TOPIC = "Python Syntax and Data Types";
const SUBTOPICS = [
  "Writing and Running Python Scripts",
  "Indentation Rules",
  "Comments",
  "Variables and Assignment",
  "Numeric Types int and float",
  "Strings and Booleans",
  "Type Casting",
];

function codeQ(o: Record<string, unknown>) {
  return Object.assign({ lang: "python", topic: TOPIC }, o);
}

function mcq(o: Record<string, unknown>) {
  return Object.assign(
    { iscodesnippet: false, codesnippet: null, snippetLang: null },
    o
  );
}

/* ────────────────────────────── CODE QUESTIONS ────────────────────────────── */

const questions = [
  codeQ({
    title: "Type Reporter Trio",
    description:
      "A type-inspection drill parses three values that arrive as text and reports the result of casting each one.\n\nInput Format:\nOne line: three space-separated tokens — an integer string, a decimal string, and a word.\n\nOutput Format:\nLine 1: int: <the first token cast to int>\nLine 2: float: <the second token cast to float, shown with exactly 2 decimals>\nLine 3: str: <the third token exactly as it is>\n\nConstraints:\nThe integer string fits in [-1000000000, 1000000000]; the decimal string has 1 to 5 decimal places; the word has 1 to 15 characters.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Type Casting",
    sampleinput1: "42 3.14 code",
    sampleoutput1: "int: 42\nfloat: 3.14\nstr: code",
    sampleinput2: "-7 0.5 hello",
    sampleoutput2: "int: -7\nfloat: 0.50\nstr: hello",
    input1: "100 2.5 world",
    output1: "int: 100\nfloat: 2.50\nstr: world",
    input2: "0 0.05 x",
    output2: "int: 0\nfloat: 0.05\nstr: x",
    input3: "999 7.126 z",
    output3: "int: 999\nfloat: 7.13\nstr: z",
    inputconstrains: "-1000000000 <= int token <= 1000000000, 1 <= len(word) <= 15",
    blacklist: "",
    whitelist: "",
    sourcecode: `a, b, c = input().split()
print(f"int: {int(a)}")
print(f"float: {float(b):.2f}")
print(f"str: {c}")
`,
  }),

  codeQ({
    title: "Counting With Nested Blocks",
    description:
      "A beginner trace exercise: print the numbers from 1 to n, then finish with a summary line that only prints when the loop reaches its last value — the whole job hinges on correctly indented nested blocks.\n\nInput Format:\nOne line: an integer n.\n\nOutput Format:\nThe numbers 1 through n, one per line, then the line: Total numbers printed: <n>\n\nConstraints:\n1 <= n <= 12.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Indentation Rules",
    sampleinput1: "3",
    sampleoutput1: "1\n2\n3\nTotal numbers printed: 3",
    sampleinput2: "1",
    sampleoutput2: "1\nTotal numbers printed: 1",
    input1: "5",
    output1: "1\n2\n3\n4\n5\nTotal numbers printed: 5",
    input2: "12",
    output2: "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\nTotal numbers printed: 12",
    input3: "2",
    output3: "1\n2\nTotal numbers printed: 2",
    inputconstrains: "1 <= n <= 12",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = int(input())
for i in range(1, n + 1):
    print(i)
    if i == n:
        print(f"Total numbers printed: {n}")
`,
  }),

  codeQ({
    title: "Swap Two Stored Values",
    description:
      "The classic variable exercise: read two words into two variables, swap their values with tuple unpacking, and print them after the swap.\n\nInput Format:\nOne line: two words separated by a space.\n\nOutput Format:\nOne line: the two words in swapped order, separated by a space.\n\nConstraints:\nEach word has 1 to 15 characters.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Variables and Assignment",
    sampleinput1: "alpha beta",
    sampleoutput1: "beta alpha",
    sampleinput2: "one two",
    sampleoutput2: "two one",
    input1: "x y",
    output1: "y x",
    input2: "red blue",
    output2: "blue red",
    input3: "up down",
    output3: "down up",
    inputconstrains: "1 <= len(word) <= 15",
    blacklist: "",
    whitelist: "",
    sourcecode: `a, b = input().split()
a, b = b, a
print(a, b)
`,
  }),

  codeQ({
    title: "Truthiness of a Number",
    description:
      "A truthiness drill: integers act as booleans inside conditions, and Python prints its boolean verdicts capitalized.\n\nInput Format:\nOne line: an integer v.\n\nOutput Format:\nPrint bool(v): either True or False.\n\nConstraints:\n-1000 <= v <= 1000.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Strings and Booleans",
    sampleinput1: "0",
    sampleoutput1: "False",
    sampleinput2: "5",
    sampleoutput2: "True",
    input1: "-2",
    output1: "True",
    input2: "999",
    output2: "True",
    input3: "0",
    output3: "False",
    inputconstrains: "-1000 <= v <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `v = int(input())
print(bool(v))
`,
  }),

  codeQ({
    title: "Mixed Type Arithmetic",
    description:
      "A drill on mixed int/float arithmetic: an integer amount meets a decimal rate, and both the total and the product are reported with fixed 2-decimal formatting.\n\nInput Format:\nOne line: an integer a and a decimal number b separated by a space.\n\nOutput Format:\nLine 1: sum: <a + b with exactly 2 decimals>\nLine 2: product: <a * b with exactly 2 decimals>\n\nConstraints:\n-100 <= a <= 100; 0 <= b <= 100 with up to 3 decimal places.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Numeric Types int and float",
    sampleinput1: "3 2.5",
    sampleoutput1: "sum: 5.50\nproduct: 7.50",
    sampleinput2: "10 0.25",
    sampleoutput2: "sum: 10.25\nproduct: 2.50",
    input1: "0 1.5",
    output1: "sum: 1.50\nproduct: 0.00",
    input2: "-2 3.5",
    output2: "sum: 1.50\nproduct: -7.00",
    input3: "7 1.2",
    output3: "sum: 8.20\nproduct: 8.40",
    inputconstrains: "-100 <= a <= 100, 0 <= b <= 100",
    blacklist: "",
    whitelist: "",
    sourcecode: `a, b = input().split()
x = int(a)
y = float(b)
print(f"sum: {x + y:.2f}")
print(f"product: {x * y:.2f}")
`,
  }),

  codeQ({
    title: "Truncate Versus Round Print",
    description:
      "A casting drill showing two different ways to drop decimals: int() truncates toward zero, while f-string formatting rounds to exactly 2 decimal places.\n\nInput Format:\nOne line: a decimal value p with at least 2 decimal places.\n\nOutput Format:\nLine 1: int part: <int(p), truncated toward zero>\nLine 2: price: <p formatted to exactly 2 decimals>\n\nConstraints:\n-1000 <= p <= 1000.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Type Casting",
    sampleinput1: "7.856",
    sampleoutput1: "int part: 7\nprice: 7.86",
    sampleinput2: "12.3",
    sampleoutput2: "int part: 12\nprice: 12.30",
    input1: "0.999",
    output1: "int part: 0\nprice: 1.00",
    input2: "45.004",
    output2: "int part: 45\nprice: 45.00",
    input3: "-2.75",
    output3: "int part: -2\nprice: -2.75",
    inputconstrains: "-1000 <= p <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `p = float(input())
print(f"int part: {int(p)}")
print(f"price: {p:.2f}")
`,
  }),

  codeQ({
    title: "Single Item Grocery Slip",
    description:
      "A corner grocery store prints a slip line for every single-item sale: the item, the quantity, the unit price and the line total, all computed from text input.\n\nInput Format:\nLine 1: item name (may contain spaces).\nLine 2: unit price as a decimal number.\nLine 3: quantity as an integer.\n\nOutput Format:\nPrint exactly: <item>: <qty> x <price with 2 decimals> = <price * qty with 2 decimals>\n\nConstraints:\n1 <= qty <= 100; 0 <= price <= 1000.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Type Casting",
    sampleinput1: "Milk\n1.8\n3",
    sampleoutput1: "Milk: 3 x 1.80 = 5.40",
    sampleinput2: "Brown Bread\n2.25\n2",
    sampleoutput2: "Brown Bread: 2 x 2.25 = 4.50",
    input1: "Eggs\n0.85\n12",
    output1: "Eggs: 12 x 0.85 = 10.20",
    input2: "Basmati Rice\n5.5\n4",
    output2: "Basmati Rice: 4 x 5.50 = 22.00",
    input3: "Olive Oil\n7.99\n1",
    output3: "Olive Oil: 1 x 7.99 = 7.99",
    inputconstrains: "1 <= qty <= 100, 0 <= price <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `item = input()
price = float(input())
qty = int(input())
print(f"{item}: {qty} x {price:.2f} = {price * qty:.2f}")
`,
  }),

  codeQ({
    title: "Gym BMI Checker",
    description:
      "A gym's health station computes a member's Body Mass Index from weight and height and shows it rounded to exactly 2 decimals.\n\nInput Format:\nLine 1: weight in kilograms (decimal).\nLine 2: height in metres (decimal).\n\nOutput Format:\nPrint exactly: BMI: <weight divided by height squared, with 2 decimals>\n\nConstraints:\n20 <= weight <= 200; 1.0 <= height <= 2.5.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Numeric Types int and float",
    sampleinput1: "70\n1.75",
    sampleoutput1: "BMI: 22.86",
    sampleinput2: "50\n1.6",
    sampleoutput2: "BMI: 19.53",
    input1: "80\n1.8",
    output1: "BMI: 24.69",
    input2: "45.5\n1.5",
    output2: "BMI: 20.22",
    input3: "92.4\n1.72",
    output3: "BMI: 31.23",
    inputconstrains: "20 <= weight <= 200, 1.0 <= height <= 2.5",
    blacklist: "",
    whitelist: "",
    sourcecode: `w = float(input())
h = float(input())
print(f"BMI: {w / (h * h):.2f}")
`,
  }),

  codeQ({
    title: "Bank Deposit Update",
    description:
      "A bank's teller script shows the balance before and after a deposit is credited.\n\nInput Format:\nLine 1: current balance (decimal).\nLine 2: deposit amount (decimal).\n\nOutput Format:\nLine 1: Old balance: <balance with 2 decimals>\nLine 2: New balance: <balance + deposit with 2 decimals>\n\nConstraints:\n0 <= balance, deposit <= 1000000.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Type Casting",
    sampleinput1: "1200.5\n300.25",
    sampleoutput1: "Old balance: 1200.50\nNew balance: 1500.75",
    sampleinput2: "0\n10.05",
    sampleoutput2: "Old balance: 0.00\nNew balance: 10.05",
    input1: "99.99\n0.01",
    output1: "Old balance: 99.99\nNew balance: 100.00",
    input2: "500\n250.75",
    output2: "Old balance: 500.00\nNew balance: 750.75",
    input3: "1000000.5\n0.5",
    output3: "Old balance: 1000000.50\nNew balance: 1000001.00",
    inputconstrains: "0 <= balance, deposit <= 1000000",
    blacklist: "",
    whitelist: "",
    sourcecode: `b = float(input())
d = float(input())
print(f"Old balance: {b:.2f}")
print(f"New balance: {b + d:.2f}")
`,
  }),

  codeQ({
    title: "Travel Distance Board",
    description:
      "A travel agency's departure board script announces the distance to each destination from its booking file.\n\nInput Format:\nLine 1: destination name (may contain spaces).\nLine 2: distance in kilometres (decimal).\n\nOutput Format:\nPrint exactly: <name> is <distance with 2 decimals> km away\n\nConstraints:\n0 <= distance <= 5000.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Writing and Running Python Scripts",
    sampleinput1: "Jaipur\n245.5",
    sampleoutput1: "Jaipur is 245.50 km away",
    sampleinput2: "Goa\n18",
    sampleoutput2: "Goa is 18.00 km away",
    input1: "Manali\n528.75",
    output1: "Manali is 528.75 km away",
    input2: "Leh\n1234.5",
    output2: "Leh is 1234.50 km away",
    input3: "Surat\n0.05",
    output3: "Surat is 0.05 km away",
    inputconstrains: "0 <= distance <= 5000",
    blacklist: "",
    whitelist: "",
    sourcecode: `city = input()
dist = float(input())
print(f"{city} is {dist:.2f} km away")
`,
  }),

  codeQ({
    title: "Fuel Purchase Report",
    description:
      "A fuel station's end-of-day script prices every purchase and totals the till.\n\nInput Format:\nLine 1: n, the number of purchases. Then n lines: liters price_per_liter (two decimal numbers separated by a space).\n\nOutput Format:\nFor each purchase: <liters with 2 decimals> L -> <liters * price with 2 decimals>\nThen the final line: Grand total: <sum of all costs with 2 decimals>\n\nConstraints:\n1 <= n <= 10; 0 < liters <= 500; 0 < price <= 300.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Type Casting",
    sampleinput1: "2\n10 94.5\n8.5 96.2",
    sampleoutput1: "10.00 L -> 945.00\n8.50 L -> 817.70\nGrand total: 1762.70",
    sampleinput2: "3\n5 100\n2.5 80\n7.25 40",
    sampleoutput2: "5.00 L -> 500.00\n2.50 L -> 200.00\n7.25 L -> 290.00\nGrand total: 990.00",
    input1: "1\n12.3 55.56",
    output1: "12.30 L -> 683.39\nGrand total: 683.39",
    input2: "2\n3 2.5\n4 2.5",
    output2: "3.00 L -> 7.50\n4.00 L -> 10.00\nGrand total: 17.50",
    input3: "4\n1 1\n2 2\n3 3\n4 4",
    output3: "1.00 L -> 1.00\n2.00 L -> 4.00\n3.00 L -> 9.00\n4.00 L -> 16.00\nGrand total: 30.00",
    inputconstrains: "1 <= n <= 10, 0 < liters <= 500, 0 < price <= 300",
    blacklist: "sum(",
    whitelist: "for , :.2f",
    sourcecode: `def main():
    n = int(input())
    total = 0.0
    for i in range(n):
        parts = input().split()
        liters = float(parts[0])
        price = float(parts[1])
        cost = liters * price
        total = total + cost
        print(f"{liters:.2f} L -> {cost:.2f}")
    print(f"Grand total: {total:.2f}")

main()
`,
  }),

  codeQ({
    title: "Form Field Type Detector",
    description:
      "A web form's server-side validator receives one raw field value and reports how it should be typed in the database: integer, decimal or plain text.\n\nInput Format:\nOne line: a single token with no spaces — an integer string (optional leading -), a decimal string (optional leading -, exactly one dot), or a word made of letters only.\n\nOutput Format:\nExactly one line: 'int: <value as int>' for integer strings, 'float: <value as float with 2 decimals>' for decimals, or 'str: <the token unchanged>' for words.\n\nConstraints:\n1 <= len(value) <= 20.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Type Casting",
    sampleinput1: "42",
    sampleoutput1: "int: 42",
    sampleinput2: "-2.50",
    sampleoutput2: "float: -2.50",
    input1: "007",
    output1: "int: 7",
    input2: "hello",
    output2: "str: hello",
    input3: "3.14159",
    output3: "float: 3.14",
    inputconstrains: "1 <= len(value) <= 20",
    blacklist: "try:, except",
    whitelist: "def , elif ",
    sourcecode: `def classify(v):
    core = v
    if v[0] == "-":
        core = v[1:]
    if core.isdigit():
        return "int"
    if "." in core and core.replace(".", "").isdigit():
        return "float"
    return "str"

v = input()
kind = classify(v)
if kind == "int":
    print(f"int: {int(v)}")
elif kind == "float":
    print(f"float: {float(v):.2f}")
else:
    print(f"str: {v}")
`,
  }),

  codeQ({
    title: "Scholarship Score Card",
    description:
      "A school's scholarship committee scores applicants: academics count 50%, attendance 30% and the project 20%. The script prints each contribution, the total and the eligibility verdict (75 or more qualifies).\n\nInput Format:\nOne line: three integers academics, attendance and project, each from 0 to 100.\n\nOutput Format:\nLine 1: Academics contribution: <academics * 0.5 with 2 decimals>\nLine 2: Attendance contribution: <attendance * 0.3 with 2 decimals>\nLine 3: Project contribution: <project * 0.2 with 2 decimals>\nLine 4: Total score: <weighted total with 2 decimals>\nLine 5: Status: Eligible or Status: Not eligible\n\nConstraints:\n0 <= each mark <= 100; eligible exactly when the weighted total is >= 75.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Numeric Types int and float",
    sampleinput1: "80 90 70",
    sampleoutput1: "Academics contribution: 40.00\nAttendance contribution: 27.00\nProject contribution: 14.00\nTotal score: 81.00\nStatus: Eligible",
    sampleinput2: "60 50 55",
    sampleoutput2: "Academics contribution: 30.00\nAttendance contribution: 15.00\nProject contribution: 11.00\nTotal score: 56.00\nStatus: Not eligible",
    input1: "73 61 88",
    output1: "Academics contribution: 36.50\nAttendance contribution: 18.30\nProject contribution: 17.60\nTotal score: 72.40\nStatus: Not eligible",
    input2: "90 100 100",
    output2: "Academics contribution: 45.00\nAttendance contribution: 30.00\nProject contribution: 20.00\nTotal score: 95.00\nStatus: Eligible",
    input3: "75 75 75",
    output3: "Academics contribution: 37.50\nAttendance contribution: 22.50\nProject contribution: 15.00\nTotal score: 75.00\nStatus: Eligible",
    inputconstrains: "0 <= each mark <= 100",
    blacklist: "round(, format(",
    whitelist: ":.2f, if ",
    sourcecode: `a1, a2, a3 = map(int, input().split())
print(f"Academics contribution: {a1 * 50 / 100:.2f}")
print(f"Attendance contribution: {a2 * 30 / 100:.2f}")
print(f"Project contribution: {a3 * 20 / 100:.2f}")
score100 = a1 * 50 + a2 * 30 + a3 * 20
print(f"Total score: {score100 / 100:.2f}")
if score100 >= 7500:
    print("Status: Eligible")
else:
    print("Status: Not eligible")
`,
  }),

  codeQ({
    title: "Streaming Subscription Split",
    description:
      "Flatmates share a streaming plan and want the maths done properly: what each person pays in total and per month.\n\nInput Format:\nLine 1: plan cost (decimal).\nLine 2: number of members (integer).\nLine 3: months covered (integer).\n\nOutput Format:\nLine 1: Per person total: <cost / members with 2 decimals>\nLine 2: Per person per month: <cost / (members * months) with 2 decimals>\n\nConstraints:\n0 <= cost <= 100000; 1 <= members <= 12; 1 <= months <= 24.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Numeric Types int and float",
    sampleinput1: "1199.6\n4\n12",
    sampleoutput1: "Per person total: 299.90\nPer person per month: 24.99",
    sampleinput2: "480\n3\n6",
    sampleoutput2: "Per person total: 160.00\nPer person per month: 26.67",
    input1: "250.5\n2\n1",
    output1: "Per person total: 125.25\nPer person per month: 125.25",
    input2: "999\n9\n3",
    output2: "Per person total: 111.00\nPer person per month: 37.00",
    input3: "1567.25\n5\n7",
    output3: "Per person total: 313.45\nPer person per month: 44.78",
    inputconstrains: "0 <= cost <= 100000, 1 <= members <= 12, 1 <= months <= 24",
    blacklist: "round(, format(",
    whitelist: ":.2f, int(",
    sourcecode: `cost = float(input())
members = int(input())
months = int(input())
print(f"Per person total: {cost / members:.2f}")
print(f"Per person per month: {cost / (members * months):.2f}")
`,
  }),

  codeQ({
    title: "Password Letter Audit",
    description:
      "A security trainer audits password candidates: how many uppercase letters, lowercase letters and digits they contain, and whether the mix is 'strong' (at least one of each).\n\nInput Format:\nOne line: a password candidate made of letters and digits only (no spaces).\n\nOutput Format:\nLine 1: Uppercase: <count>\nLine 2: Lowercase: <count>\nLine 3: Digits: <count>\nLine 4: Strong: True or False (True exactly when all three counts are at least 1)\n\nConstraints:\n1 <= len(candidate) <= 20; letters and digits only.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Strings and Booleans",
    sampleinput1: "Sun7rise",
    sampleoutput1: "Uppercase: 1\nLowercase: 6\nDigits: 1\nStrong: True",
    sampleinput2: "abc123",
    sampleoutput2: "Uppercase: 0\nLowercase: 3\nDigits: 3\nStrong: False",
    input1: "Q",
    output1: "Uppercase: 1\nLowercase: 0\nDigits: 0\nStrong: False",
    input2: "A1b2C3",
    output2: "Uppercase: 2\nLowercase: 1\nDigits: 3\nStrong: True",
    input3: "hello",
    output3: "Uppercase: 0\nLowercase: 5\nDigits: 0\nStrong: False",
    inputconstrains: "1 <= len(candidate) <= 20, letters and digits only",
    blacklist: "sum(, .count(",
    whitelist: "for , if , elif ",
    sourcecode: `s = input()
upper = 0
lower = 0
digits = 0
for ch in s:
    if ch.isupper():
        upper = upper + 1
    elif ch.islower():
        lower = lower + 1
    elif ch.isdigit():
        digits = digits + 1
strong = upper >= 1 and lower >= 1 and digits >= 1
print(f"Uppercase: {upper}")
print(f"Lowercase: {lower}")
print(f"Digits: {digits}")
print(f"Strong: {strong}")
`,
  }),

  codeQ({
    title: "Expression Evaluator Drill",
    description:
      "An expression evaluator drill: read 'a op b' and print the result — as a plain integer when both operands are integers and the operator is not '/', otherwise with exactly 2 decimals.\n\nInput Format:\nOne line: a op b with single spaces, where op is one of + - * / and a, b are integer or decimal strings (b is never 0 when op is /).\n\nOutput Format:\nThe computed result: a plain integer if both operands are integers and op is not '/', otherwise formatted to exactly 2 decimals.\n\nConstraints:\n-1000 <= each operand <= 1000; decimals have 1 to 3 decimal places; op is one of + - * /.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Numeric Types int and float",
    sampleinput1: "6 * 7",
    sampleoutput1: "42",
    sampleinput2: "5 / 2",
    sampleoutput2: "2.50",
    input1: "3 + 2.5",
    output1: "5.50",
    input2: "10 - 4",
    output2: "6",
    input3: "-3 / 4",
    output3: "-0.75",
    inputconstrains: "-1000 <= operand <= 1000, op in {+,-,*,/}",
    blacklist: "eval(",
    whitelist: "if , elif , def ",
    sourcecode: `def to_number(s):
    if s.lstrip("-").isdigit():
        return int(s)
    return float(s)

parts = input().split()
x = to_number(parts[0])
op = parts[1]
y = to_number(parts[2])
if op == "+":
    r = x + y
elif op == "-":
    r = x - y
elif op == "*":
    r = x * y
else:
    r = x / y
if isinstance(r, int):
    print(r)
else:
    print(f"{r:.2f}")
`,
  }),

  codeQ({
    title: "Pharmacy Receipt Builder",
    description:
      "A pharmacy's billing terminal prints a full receipt: one line per medicine, the subtotal, a tiered discount (15% when the subtotal exceeds 800, 10% when it exceeds 500, none otherwise) and the final total.\n\nInput Format:\nLine 1: n, the number of items. Then n lines: name price qty where name is one word, price is a decimal number and qty is an integer.\n\nOutput Format:\nPer item: <name> x<qty>: <price * qty with 2 decimals>\nThen: Subtotal: <subtotal with 2 decimals>\nIf a discount applies: Discount: <discount with 2 decimals> and Final total: <subtotal - discount with 2 decimals>\nOtherwise: Final total: <subtotal with 2 decimals>\n\nConstraints:\n1 <= n <= 10; 0 < price <= 1000; 1 <= qty <= 100; a discount applies only when subtotal > 500 (exactly 500 means no discount).",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Type Casting",
    sampleinput1: "3\nParacetamol 1.5 4\nCoughSyrup 8.25 2\nBandages 3 5",
    sampleoutput1: "Paracetamol x4: 6.00\nCoughSyrup x2: 16.50\nBandages x5: 15.00\nSubtotal: 37.50\nFinal total: 37.50",
    sampleinput2: "2\nInsulin 45.75 6\nAntibiotic 40.4 12",
    sampleoutput2: "Insulin x6: 274.50\nAntibiotic x12: 484.80\nSubtotal: 759.30\nDiscount: 75.93\nFinal total: 683.37",
    input1: "2\nPainBalm 2.5 100\nThermometer 250 1",
    output1: "PainBalm x100: 250.00\nThermometer x1: 250.00\nSubtotal: 500.00\nFinal total: 500.00",
    input2: "3\nInsulin 45.75 3\nAntibiotic 63.45 14\nCream 12.4 2",
    output2: "Insulin x3: 137.25\nAntibiotic x14: 888.30\nCream x2: 24.80\nSubtotal: 1050.35\nDiscount: 157.55\nFinal total: 892.80",
    input3: "1\nEyeDrops 6.66 15",
    output3: "EyeDrops x15: 99.90\nSubtotal: 99.90\nFinal total: 99.90",
    inputconstrains: "1 <= n <= 10, 0 < price <= 1000, 1 <= qty <= 100",
    blacklist: "sum(, round(",
    whitelist: "for , if , elif , :.2f",
    sourcecode: `def main():
    n = int(input())
    subtotal = 0.0
    for i in range(n):
        parts = input().split()
        name = parts[0]
        price = float(parts[1])
        qty = int(parts[2])
        cost = price * qty
        subtotal = subtotal + cost
        print(f"{name} x{qty}: {cost:.2f}")
    print(f"Subtotal: {subtotal:.2f}")
    if subtotal > 800:
        rate = 0.15
    elif subtotal > 500:
        rate = 0.1
    else:
        rate = 0.0
    if rate > 0:
        discount = subtotal * rate
        print(f"Discount: {discount:.2f}")
        print(f"Final total: {subtotal - discount:.2f}")
    else:
        print(f"Final total: {subtotal:.2f}")

main()
`,
  }),

  codeQ({
    title: "Legacy Data Migration Report",
    description:
      "A database migration tool reads legacy values stored as text and converts each one to a proper Python type, then summarizes the column.\n\nInput Format:\nLine 1: n. Then n lines, each a single token (no spaces) that is one of: 'true' or 'false' in any letter case (a boolean), an integer string with optional leading - (an int), a decimal string with optional leading - and exactly one dot (a float), or any other token (a string).\n\nOutput Format:\nPer value: 'bool: True' or 'bool: False' (normalized), 'int: <parsed int>', 'float: <parsed value with 2 decimals>', or 'str: <token unchanged>'\nFinally: Report: int=<count> float=<count> bool=<count> str=<count>\n\nConstraints:\n1 <= n <= 15; each token has 1 to 20 characters.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Type Casting",
    sampleinput1: "4\n007\nTRUE\n-2.50\nguest",
    sampleoutput1: "int: 7\nbool: True\nfloat: -2.50\nstr: guest\nReport: int=1 float=1 bool=1 str=1",
    sampleinput2: "3\nFalse\n3.0\n42",
    sampleoutput2: "bool: False\nfloat: 3.00\nint: 42\nReport: int=1 float=1 bool=1 str=0",
    input1: "5\nFalse\n0\n0.05\nadmin\nTrue",
    output1: "bool: False\nint: 0\nfloat: 0.05\nstr: admin\nbool: True\nReport: int=1 float=1 bool=2 str=1",
    input2: "4\n-7\nx9\n9x\nTRUE",
    output2: "int: -7\nstr: x9\nstr: 9x\nbool: True\nReport: int=1 float=0 bool=1 str=2",
    input3: "3\n12.346\n-0.5\ntRuE",
    output3: "float: 12.35\nfloat: -0.50\nbool: True\nReport: int=0 float=2 bool=1 str=0",
    inputconstrains: "1 <= n <= 15, 1 <= len(token) <= 20",
    blacklist: "try:, except, sum(",
    whitelist: "def , for , elif ",
    sourcecode: `def classify(v):
    low = v.lower()
    if low == "true":
        return "bool", True
    if low == "false":
        return "bool", False
    core = v
    if v[0] == "-":
        core = v[1:]
    if core.isdigit():
        return "int", int(v)
    if "." in core and core.replace(".", "").isdigit():
        return "float", float(v)
    return "str", v

def main():
    n = int(input())
    ci = 0
    cf = 0
    cb = 0
    cs = 0
    for i in range(n):
        v = input()
        kind, val = classify(v)
        if kind == "bool":
            cb = cb + 1
            print(f"bool: {val}")
        elif kind == "int":
            ci = ci + 1
            print(f"int: {val}")
        elif kind == "float":
            cf = cf + 1
            print(f"float: {val:.2f}")
        else:
            cs = cs + 1
            print(f"str: {val}")
    print(f"Report: int={ci} float={cf} bool={cb} str={cs}")

main()
`,
  }),

  codeQ({
    title: "Fleet Efficiency Tracker",
    description:
      "A logistics company tracks fleet efficiency: for every truck trip it computes kilometres per litre, names the most efficient truck (ties go to the earliest trip in the list), and reports the fleet average and the totals.\n\nInput Format:\nLine 1: n. Then n lines: truck distance fuel where truck is a single token, distance is kilometres (decimal) and fuel is litres (decimal).\n\nOutput Format:\nPer truck: <truck>: <distance / fuel with 2 decimals> km/L\nThen: Best: <truck> (<best efficiency with 2 decimals> km/L)\nThen: Avg: <mean of the per-truck efficiencies with 2 decimals> km/L\nThen: Fleet distance: <sum of distances with 2 decimals> km\nThen: Fleet fuel used: <sum of fuel with 2 decimals> L\n\nConstraints:\n1 <= n <= 12; 1 <= distance <= 5000; 1 <= fuel <= 500.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Numeric Types int and float",
    sampleinput1: "3\nT1 240 20\nT2 300 25\nT3 180 12",
    sampleoutput1: "T1: 12.00 km/L\nT2: 12.00 km/L\nT3: 15.00 km/L\nBest: T3 (15.00 km/L)\nAvg: 13.00 km/L\nFleet distance: 720.00 km\nFleet fuel used: 57.00 L",
    sampleinput2: "2\nA1 100 10\nB2 250 25",
    sampleoutput2: "A1: 10.00 km/L\nB2: 10.00 km/L\nBest: A1 (10.00 km/L)\nAvg: 10.00 km/L\nFleet distance: 350.00 km\nFleet fuel used: 35.00 L",
    input1: "2\nX9 100.4 2\nY7 300 4",
    output1: "X9: 50.20 km/L\nY7: 75.00 km/L\nBest: Y7 (75.00 km/L)\nAvg: 62.60 km/L\nFleet distance: 400.40 km\nFleet fuel used: 6.00 L",
    input2: "4\nR1 45 9\nR2 90 10\nR3 12.6 5\nR4 76 4",
    output2: "R1: 5.00 km/L\nR2: 9.00 km/L\nR3: 2.52 km/L\nR4: 19.00 km/L\nBest: R4 (19.00 km/L)\nAvg: 8.88 km/L\nFleet distance: 223.60 km\nFleet fuel used: 28.00 L",
    input3: "1\nSolo 62.5 5",
    output3: "Solo: 12.50 km/L\nBest: Solo (12.50 km/L)\nAvg: 12.50 km/L\nFleet distance: 62.50 km\nFleet fuel used: 5.00 L",
    inputconstrains: "1 <= n <= 12, 1 <= distance <= 5000, 1 <= fuel <= 500",
    blacklist: "max(, sum(, min(",
    whitelist: "for , if , :.2f",
    sourcecode: `def main():
    n = int(input())
    best_eff = -1.0
    best_name = ""
    eff_total = 0.0
    dist_total = 0.0
    fuel_total = 0.0
    for i in range(n):
        parts = input().split()
        name = parts[0]
        dist = float(parts[1])
        fuel = float(parts[2])
        eff = dist / fuel
        eff_total = eff_total + eff
        dist_total = dist_total + dist
        fuel_total = fuel_total + fuel
        print(f"{name}: {eff:.2f} km/L")
        if eff > best_eff:
            best_eff = eff
            best_name = name
    print(f"Best: {best_name} ({best_eff:.2f} km/L)")
    print(f"Avg: {eff_total / n:.2f} km/L")
    print(f"Fleet distance: {dist_total:.2f} km")
    print(f"Fleet fuel used: {fuel_total:.2f} L")

main()
`,
  }),

  codeQ({
    title: "Avatar Name Validator",
    description:
      "A game's account system validates avatar names. Rules, checked in this order: the length must be 3 to 12 (else too_short / too_long); the first character must be a letter or underscore (else bad_start); every character must be a letter, digit or underscore (else bad_char).\n\nInput Format:\nLine 1: n. Then n lines, each a candidate name (1 to 16 characters, no spaces).\n\nOutput Format:\nPer name: '<name>: VALID' or '<name>: INVALID (<reason>)' where reason is one of too_short, too_long, bad_start, bad_char\nFinally: <valid count> of <n> names are valid\n\nConstraints:\n1 <= n <= 10; 1 <= len(name) <= 16.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Strings and Booleans",
    sampleinput1: "4\nShadowFox\nab\n9Lives\nSpark*99",
    sampleoutput1: "ShadowFox: VALID\nab: INVALID (too_short)\n9Lives: INVALID (bad_start)\nSpark*99: INVALID (bad_char)\n1 of 4 names are valid",
    sampleinput2: "3\nDragon_Slayer_99\nOk\nPlayer1",
    sampleoutput2: "Dragon_Slayer_99: INVALID (too_long)\nOk: INVALID (too_short)\nPlayer1: VALID\n1 of 3 names are valid",
    input1: "3\n_x9\na-b\nExactlyTwelve",
    output1: "_x9: VALID\na-b: INVALID (bad_char)\nExactlyTwelve: INVALID (too_long)\n1 of 3 names are valid",
    input2: "2\n!!!\nabc",
    output2: "!!!: INVALID (bad_start)\nabc: VALID\n1 of 2 names are valid",
    input3: "3\nTwelveCharss\nabc\nAb1_",
    output3: "TwelveCharss: VALID\nabc: VALID\nAb1_: VALID\n3 of 3 names are valid",
    inputconstrains: "1 <= n <= 10, 1 <= len(name) <= 16",
    blacklist: "isalnum(, isidentifier(",
    whitelist: "for , if , def ",
    sourcecode: `def check(name):
    if len(name) < 3:
        return "too_short"
    if len(name) > 12:
        return "too_long"
    first = name[0]
    if not (first.isalpha() or first == "_"):
        return "bad_start"
    for ch in name:
        if not (ch.isalpha() or ch.isdigit() or ch == "_"):
            return "bad_char"
    return "valid"

def main():
    n = int(input())
    valid_count = 0
    for i in range(n):
        name = input()
        verdict = check(name)
        if verdict == "valid":
            valid_count = valid_count + 1
            print(f"{name}: VALID")
        else:
            print(f"{name}: INVALID ({verdict})")
    print(f"{valid_count} of {n} names are valid")

main()
`,
  }),
];

/* ─────────────────────────────── MCQ QUESTIONS ────────────────────────────── */

const mcqs = [
  mcq({
    title: "Defining Python Code Blocks",
    description:
      "What defines a block of code (such as the body of a function) in Python?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Indentation Rules",
    Option1: "Consistent indentation of the statements in the block",
    Option2: "Curly braces { } around the block",
    Option3: "The begin and end keywords",
    Option4: "A semicolon after each statement",
    CorrectOption: 1,
  }),
  mcq({
    title: "Single Line Comment Symbol",
    description:
      "Which symbol starts a single-line comment in Python?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Comments",
    Option1: "//",
    Option2: "#",
    Option3: "--",
    Option4: "/*",
    CorrectOption: 2,
  }),
  mcq({
    title: "Valid Variable Name",
    description:
      "Which of these is a VALID Python variable name?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Variables and Assignment",
    Option1: "2fast",
    Option2: "my-var",
    Option3: "my_var",
    Option4: "class",
    CorrectOption: 3,
  }),
  mcq({
    title: "Type of 3.14",
    description:
      "What is the type of the literal 3.14 in Python?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Numeric Types int and float",
    Option1: "int",
    Option2: "float",
    Option3: "str",
    Option4: "decimal",
    CorrectOption: 2,
  }),
  mcq({
    title: "Quoted True Type",
    description:
      "Consider the value written in code as \"True\" — with the quotes included. What is its type?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Strings and Booleans",
    Option1: "bool",
    Option2: "str",
    Option3: "int",
    Option4: "boolean",
    CorrectOption: 2,
  }),
  mcq({
    title: "int Cast of Numeric String",
    description:
      "What does int(\"42\") return in Python?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Type Casting",
    Option1: "The integer 42",
    Option2: "The string '42'",
    Option3: "The float 42.0",
    Option4: "It raises ValueError",
    CorrectOption: 1,
  }),
  mcq({
    title: "Type of 5.0 Output",
    description:
      "What does this snippet print?\n\nx = 5.0\nprint(type(x))",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Numeric Types int and float",
    Option1: "<class 'float'>",
    Option2: "<class 'int'>",
    Option3: "<class 'str'>",
    Option4: "float",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `x = 5.0
print(type(x))`,
    snippetLang: "python",
  }),
  mcq({
    title: "bool of Space String",
    description:
      "What does bool(\" \") return, where the string contains a single space character?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Strings and Booleans",
    Option1: "True — any non-empty string is truthy",
    Option2: "False — whitespace counts as empty",
    Option3: "0",
    Option4: "It raises an error",
    CorrectOption: 1,
  }),
  mcq({
    title: "Not a Python Keyword",
    description:
      "Variable names must not collide with Python keywords. Which of these is NOT a Python keyword?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Variables and Assignment",
    Option1: "if",
    Option2: "def",
    Option3: "while",
    Option4: "value",
    CorrectOption: 4,
  }),
  mcq({
    title: "What Is a Python Script",
    description:
      "What exactly is a Python script?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Writing and Running Python Scripts",
    Option1: "A plain-text .py file whose Python statements run from top to bottom",
    Option2: "A compiled Windows executable",
    Option3: "A special binary format only CPython can read",
    Option4: "A file that can only ever be imported, never run directly",
    CorrectOption: 1,
  }),
  mcq({
    title: "Casting Sum Output",
    description:
      "What does this snippet print?\n\nprint(int(\"7\") + float(\"2.5\"))",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Type Casting",
    Option1: "9.5",
    Option2: "9",
    Option3: "'9.5'",
    Option4: "It raises TypeError",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `print(int("7") + float("2.5"))`,
    snippetLang: "python",
  }),
  mcq({
    title: "bool of 0 vs 0 String",
    description:
      "What output does this snippet produce?\n\nprint(bool(0))\nprint(bool(\"0\"))",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Strings and Booleans",
    Option1: "False on the first line, True on the second",
    Option2: "False on both lines",
    Option3: "True on both lines",
    Option4: "True on the first line, False on the second",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `print(bool(0))
print(bool("0"))`,
    snippetLang: "python",
  }),
  mcq({
    title: "Tuple Swap Result",
    description:
      "What does this snippet print?\n\na, b = 3, 8\na, b = b, a\nprint(a, b)",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Variables and Assignment",
    Option1: "8 3",
    Option2: "3 8",
    Option3: "8, 3",
    Option4: "3 3",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `a, b = 3, 8
a, b = b, a
print(a, b)`,
    snippetLang: "python",
  }),
  mcq({
    title: "Dynamic Typing Rebind",
    description:
      "A program runs x = 5 and later x = \"five\". What happens and why?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Variables and Assignment",
    Option1: "It works: Python is dynamically typed, so a name can rebind to a value of any type",
    Option2: "It raises TypeError on the second line",
    Option3: "x silently keeps its integer value",
    Option4: "It works only if the second line uses an explicit cast",
    CorrectOption: 1,
  }),
  mcq({
    title: "Int Times Float Output",
    description:
      "What does this snippet print?\n\nprint(3 * 2.0)",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Numeric Types int and float",
    Option1: "6.0",
    Option2: "6",
    Option3: "6.00",
    Option4: "It raises TypeError",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `print(3 * 2.0)`,
    snippetLang: "python",
  }),
  mcq({
    title: "Invalid Assignment Form",
    description:
      "Which of these assignment statements is INVALID in Python?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Variables and Assignment",
    Option1: "x = 5",
    Option2: "_temp = 1",
    Option3: "5 = x",
    Option4: "x_y = 2",
    CorrectOption: 3,
  }),
  mcq({
    title: "Float Precision Equality",
    description:
      "What does this snippet print, and what causes it?\n\nprint(0.1 + 0.2 == 0.3)",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Numeric Types int and float",
    Option1: "False — binary floating-point stores 0.1 + 0.2 as a value slightly above 0.3",
    Option2: "True — Python rounds the comparison automatically",
    Option3: "0.3 — the expression evaluates to the literal",
    Option4: "0.30000000000000004 — the comparison prints the computed value",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `print(0.1 + 0.2 == 0.3)`,
    snippetLang: "python",
  }),
  mcq({
    title: "bool Is Subclass of int",
    description:
      "What output does this snippet produce?\n\nprint(True + True)\nprint(int(True))",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Strings and Booleans",
    Option1: "2 on the first line, 1 on the second",
    Option2: "True on the first line, 1 on the second",
    Option3: "2 on the first line, True on the second",
    Option4: "1 on both lines",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `print(True + True)
print(int(True))`,
    snippetLang: "python",
  }),
  mcq({
    title: "Chained Cast Truncation",
    description:
      "What does this snippet print?\n\nx = \"3.5\"\ny = float(x)\nprint(int(y))",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Type Casting",
    Option1: "3 — int() truncates the fractional part",
    Option2: "3.5 — the cast keeps the decimals",
    Option3: "4 — int() rounds to the nearest integer",
    Option4: "It raises ValueError",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `x = "3.5"
y = float(x)
print(int(y))`,
    snippetLang: "python",
  }),
  mcq({
    title: "Inconsistent Indentation Result",
    description:
      "A script has a block where one line is indented 4 spaces and the next line at the same level is indented 2 spaces. What happens when you run it?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Indentation Rules",
    Option1: "Python raises IndentationError because lines in the same block must be indented consistently",
    Option2: "It runs fine — indentation is purely cosmetic",
    Option3: "The line with 2 spaces is silently ignored",
    Option4: "Python automatically treats the 2-space line as a deeper nested block",
    CorrectOption: 1,
  }),
];

/* ─────────────────────────────────── WRITE ─────────────────────────────────── */

const d = String(DAY).padStart(2, "0");
writeFileSync(
  `/home/z/my-project/scripts/python-programming/data/day-${d}.code.json`,
  JSON.stringify({ day: DAY, topics: [{ name: TOPIC, subtopics: SUBTOPICS }], questions }, null, 2)
);
writeFileSync(
  `/home/z/my-project/scripts/python-programming/data/day-${d}.mcq.json`,
  JSON.stringify({ day: DAY, questions: mcqs }, null, 2)
);
console.log(
  `wrote day ${DAY}: ${questions.length} code questions, ${mcqs.length} mcq questions`
);
