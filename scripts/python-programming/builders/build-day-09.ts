/**
 * Builder for day 09 — "String Manipulation" (20 code + 20 MCQ).
 * Run: bun scripts/python-programming/builders/build-day-09.ts
 */
import { mkdirSync, writeFileSync } from "node:fs";

const DIR = "/home/z/my-project/scripts/python-programming/data";
mkdirSync(DIR, { recursive: true });

const TOPIC_NAME = "String Manipulation";
const SUBTOPICS = [
  "f-string Formatting",
  "str.format Method",
  "String Methods",
  "String Slicing",
  "String Immutability and Iteration",
];
const SUB = {
  fstr: "f-string Formatting",
  fmt: "str.format Method",
  methods: "String Methods",
  slice: "String Slicing",
  iter: "String Immutability and Iteration",
};

type Diff = "easy" | "medium" | "hard";

function cq(o: {
  title: string;
  description: string;
  difficulty: Diff;
  variant: "basic" | "scenario";
  subtopic: string;
  si1: string; so1: string;
  si2: string; so2: string;
  i1: string; o1: string;
  i2: string; o2: string;
  i3: string; o3: string;
  inputconstrains: string;
  blacklist?: string;
  whitelist?: string;
  sourcecode: string;
}) {
  const maxscore = o.difficulty === "easy" ? 10 : o.difficulty === "medium" ? 20 : 30;
  return {
    title: o.title,
    description: o.description,
    difficulty: o.difficulty,
    variant: o.variant,
    maxscore,
    lang: "python",
    topic: TOPIC_NAME,
    subtopic: o.subtopic,
    sampleinput1: o.si1,
    sampleoutput1: o.so1,
    sampleinput2: o.si2,
    sampleoutput2: o.so2,
    input1: o.i1,
    output1: o.o1,
    input2: o.i2,
    output2: o.o2,
    input3: o.i3,
    output3: o.o3,
    inputconstrains: o.inputconstrains,
    blacklist: o.blacklist ?? "",
    whitelist: o.whitelist ?? "",
    sourcecode: o.sourcecode,
  };
}

function mq(o: {
  title: string;
  description: string;
  difficulty: Diff;
  subtopic: string;
  options: [string, string, string, string];
  correct: 1 | 2 | 3 | 4;
  snippet?: string;
}) {
  return {
    title: o.title,
    description: o.description,
    difficulty: o.difficulty,
    topic: TOPIC_NAME,
    subtopic: o.subtopic,
    Option1: o.options[0],
    Option2: o.options[1],
    Option3: o.options[2],
    Option4: o.options[3],
    CorrectOption: o.correct,
    iscodesnippet: o.snippet !== undefined,
    codesnippet: o.snippet ?? null,
    snippetLang: o.snippet !== undefined ? "python" : null,
  };
}

/* ---- exact-output helpers (parity with Python float/format semantics) ---- */
const money = (x: number) => x.toFixed(2);
const invoiceTotal = (items: Array<[string, number]>) =>
  "Total: " + money(items.reduce((s, it) => s + it[1], 0));
const gRow = (name: string, reading: string) =>
  name.padEnd(10, " ") + Number(reading).toFixed(2).padStart(6, " ");
const rRow = (name: string, dept: string, score: string) =>
  name.padEnd(10, " ") + dept.padEnd(12, " ") + score.padStart(3, " ");

/* ============================ CODE QUESTIONS ============================ */

const questions = [
  cq({
    title: "F-string Birthday Card",
    description:
      "A community radio station prints a birthday greeting card for its listeners.\n" +
      "Read the listener's name and age, then build the greeting line with an f-string.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: the listener's name (letters and spaces)\n" +
      "Line 2: the listener's age, an integer\n" +
      "\n" +
      "Output Format:\n" +
      "Print exactly: Hello <name>, you are <age> years old.\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= len(name) <= 50, 1 <= age <= 120",
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.fstr,
    si1: "Ada\n36", so1: "Hello Ada, you are 36 years old.",
    si2: "Grace Hopper\n85", so2: "Hello Grace Hopper, you are 85 years old.",
    i1: "Linus\n25", o1: "Hello Linus, you are 25 years old.",
    i2: "Margaret\n40", o2: "Hello Margaret, you are 40 years old.",
    i3: "Raj\n12", o3: "Hello Raj, you are 12 years old.",
    inputconstrains: "1 <= len(name) <= 50, 1 <= age <= 120",
    sourcecode:
`name = input()
age = int(input())
print(f"Hello {name}, you are {age} years old.")`,
  }),

  cq({
    title: "Price Tag Two Decimals",
    description:
      "A shop's price tag printer always shows money with exactly two decimal places.\n" +
      "Read one price value and print it formatted to exactly 2 decimals with an f-string.\n" +
      "\n" +
      "Input Format:\n" +
      "One line: the price (a number, possibly with decimals)\n" +
      "\n" +
      "Output Format:\n" +
      "The price printed with exactly two decimal places.\n" +
      "\n" +
      "Constraints:\n" +
      "0 <= price <= 100000",
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.fstr,
    si1: "3.5", so1: "3.50",
    si2: "7", so2: "7.00",
    i1: "12.346", o1: "12.35",
    i2: "0.129", o2: "0.13",
    i3: "99.999", o3: "100.00",
    inputconstrains: "0 <= price <= 100000",
    sourcecode:
`price = float(input())
print(f"{price:.2f}")`,
  }),

  cq({
    title: "Case Shift Trio Drill",
    description:
      "A text-tooling lab asks you to demonstrate the three classic case methods on one word.\n" +
      "Read a word and print its uppercase, lowercase and swapcase forms, one per line.\n" +
      "\n" +
      "Input Format:\n" +
      "One line: a single word (letters and digits only)\n" +
      "\n" +
      "Output Format:\n" +
      "Three lines: upper, lower, swapcase - in that order.\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= len(word) <= 60, letters and digits only",
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.methods,
    si1: "PyThOn", so1: "PYTHON\npython\npYtHoN",
    si2: "HeLLo World", so2: "HELLO WORLD\nhello world\nhEllO wORLD",
    i1: "abc", o1: "ABC\nabc\nABC",
    i2: "XYZ", o2: "XYZ\nxyz\nxyz",
    i3: "a1B2", o3: "A1B2\na1b2\nA1b2",
    inputconstrains: "1 <= len(word) <= 60, letters and digits only",
    sourcecode:
`word = input()
print(word.upper())
print(word.lower())
print(word.swapcase())`,
  }),

  cq({
    title: "Comma Tag Splitter",
    description:
      "An article editor stores topic tags in one comma-separated string.\n" +
      "Split the string on commas and print each tag on its own line.\n" +
      "\n" +
      "Input Format:\n" +
      "One line: comma-separated tags with no spaces\n" +
      "\n" +
      "Output Format:\n" +
      "One tag per line, in order.\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= tags <= 10, each tag 1..20 chars, no spaces",
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.methods,
    si1: "red,green,blue", so1: "red\ngreen\nblue",
    si2: "solo", so2: "solo",
    i1: "a,b,c,d,e", o1: "a\nb\nc\nd\ne",
    i2: "alpha,beta", o2: "alpha\nbeta",
    i3: "x,y,z", o3: "x\ny\nz",
    inputconstrains: "1 <= tags <= 10, each tag 1..20 chars, no spaces",
    sourcecode:
`line = input()
tags = line.split(",")
for t in tags:
    print(t)`,
  }),

  cq({
    title: "Label Half Splitter",
    description:
      "A factory label printer splits product codes in half to stamp them on two sides.\n" +
      "Read a word of even length, print its first half, then its second half.\n" +
      "\n" +
      "Input Format:\n" +
      "One line: a word of even length (lowercase letters)\n" +
      "\n" +
      "Output Format:\n" +
      "Line 1: first half. Line 2: second half.\n" +
      "\n" +
      "Constraints:\n" +
      "2 <= len(word) <= 100, even length, lowercase letters",
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.slice,
    si1: "python", so1: "pyt\nhon",
    si2: "abcabc", so2: "abc\nabc",
    i1: "ab", o1: "a\nb",
    i2: "abcd", o2: "ab\ncd",
    i3: "moonbeam", o3: "moon\nbeam",
    inputconstrains: "2 <= len(word) <= 100, even length, lowercase letters",
    sourcecode:
`word = input()
n = len(word) // 2
print(word[:n])
print(word[n:])`,
  }),

  cq({
    title: "Marquee Letters One Per Line",
    description:
      "A theatre marquee controller receives words as character streams.\n" +
      "Read a word and print each character on its own line, in order, by iterating over the string.\n" +
      "\n" +
      "Input Format:\n" +
      "One line: a word\n" +
      "\n" +
      "Output Format:\n" +
      "One character per line.\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= len(word) <= 40",
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.iter,
    si1: "hi", so1: "h\ni",
    si2: "abc", so2: "a\nb\nc",
    i1: "z", o1: "z",
    i2: "loop", o2: "l\no\no\np",
    i3: "stage", o3: "s\nt\na\ng\ne",
    inputconstrains: "1 <= len(word) <= 40",
    sourcecode:
`word = input()
for ch in word:
    print(ch)`,
  }),

  cq({
    title: "Cinema Snack Receipt Line",
    description:
      "A cinema kiosk prints one receipt line per snack order.\n" +
      "Read the snack name and its price, then print the receipt line with the money value formatted to exactly 2 decimals using an f-string.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: the snack name (letters and spaces)\n" +
      "Line 2: the price (a number)\n" +
      "\n" +
      "Output Format:\n" +
      "Print exactly: <name> costs <price with 2 decimals> INR\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= len(name) <= 30, 0 <= price <= 100000",
    difficulty: "easy",
    variant: "scenario",
    subtopic: SUB.fstr,
    si1: "Popcorn\n249.5", so1: "Popcorn costs 249.50 INR",
    si2: "Cold Coffee\n120", so2: "Cold Coffee costs 120.00 INR",
    i1: "Nachos\n99.999", o1: "Nachos costs 100.00 INR",
    i2: "Samosa\n45.25", o2: "Samosa costs 45.25 INR",
    i3: "Candy Floss\n75.126", o3: "Candy Floss costs 75.13 INR",
    inputconstrains: "1 <= len(name) <= 30, 0 <= price <= 100000",
    sourcecode:
`item = input()
price = float(input())
print(f"{item} costs {price:.2f} INR")`,
  }),

  cq({
    title: "Airline Code Normalizer",
    description:
      "At an airline check-in desk, passengers scribble airport codes with stray spaces and random capitalization.\n" +
      "Read the raw code, strip the surrounding whitespace, and print it in uppercase.\n" +
      "\n" +
      "Input Format:\n" +
      "One line: the raw airport code, possibly padded with spaces, any case\n" +
      "\n" +
      "Output Format:\n" +
      "The normalized code: trimmed and fully uppercase.\n" +
      "\n" +
      "Constraints:\n" +
      "The code has exactly 3 letters, possibly padded with spaces on either side",
    difficulty: "easy",
    variant: "scenario",
    subtopic: SUB.methods,
    si1: " blr ", so1: "BLR",
    si2: " delHi ", so2: "DELHI",
    i1: "  maa  ", o1: "MAA",
    i2: "hyd", o2: "HYD",
    i3: " BOM ", o3: "BOM",
    inputconstrains: "code has exactly 3 letters, may be padded with spaces",
    sourcecode:
`raw = input()
print(raw.strip().upper())`,
  }),

  cq({
    title: "Club Username Generator",
    description:
      "A gaming club auto-generates usernames: the first 3 letters of the member's display name joined with the last 2 digits of their phone number.\n" +
      "Build the username using slicing and concatenation.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: display name (letters, length 3..20)\n" +
      "Line 2: phone number (exactly 10 digits)\n" +
      "\n" +
      "Output Format:\n" +
      "The generated username.\n" +
      "\n" +
      "Constraints:\n" +
      "3 <= len(name) <= 20, phone has exactly 10 digits",
    difficulty: "easy",
    variant: "scenario",
    subtopic: SUB.slice,
    si1: "Priya\n9876543210", so1: "Pri10",
    si2: "Amit\n9999912345", so2: "Ami45",
    i1: "Rohan\n8888867890", o1: "Roh90",
    i2: "Sana\n7777700001", o2: "San01",
    i3: "Devika\n9090912345", o3: "Dev45",
    inputconstrains: "3 <= len(name) <= 20, phone has exactly 10 digits",
    sourcecode:
`name = input()
phone = input()
print(name[:3] + phone[-2:])`,
  }),

  cq({
    title: "Masked Card Number",
    description:
      "A payment page masks saved cards: it shows the first 4 digits and the last 4 digits, and replaces the middle 8 digits with '*' characters.\n" +
      "Rebuild the masked number using slicing and concatenation.\n" +
      "\n" +
      "Input Format:\n" +
      "One line: the 16-digit card number\n" +
      "\n" +
      "Output Format:\n" +
      "The masked card: first 4 digits, then one '*' per masked digit, then the last 4 digits.\n" +
      "\n" +
      "Constraints:\n" +
      "Exactly 16 digits",
    difficulty: "easy",
    variant: "scenario",
    subtopic: SUB.slice,
    si1: "4532123412343456", so1: "4532********3456",
    si2: "6011111111111117", so2: "6011********1117",
    i1: "1234567812345678", o1: "1234********5678",
    i2: "4111111111111111", o2: "4111********1111",
    i3: "9876543210987654", o3: "9876********7654",
    inputconstrains: "exactly 16 digits",
    sourcecode:
`card = input()
print(card[:4] + "*" * (len(card) - 8) + card[-4:])`,
  }),

  // ---------------- medium ----------------
  cq({
    title: "E-Invoice Grand Total",
    description:
      "A billing clerk totals an e-invoice by hand because the fancy printer module is down.\n" +
      "Read n items (name and price each), add up the prices, and print the total amount formatted to exactly 2 decimals using str.format ONLY - f-strings are not allowed on this terminal.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: n, the number of items\n" +
      "Next n lines: item_name price (the name is a single word)\n" +
      "\n" +
      "Output Format:\n" +
      "Print exactly: Total: <sum with exactly 2 decimals>\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= n <= 100, 0 <= price <= 10000, item names have no spaces",
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.fmt,
    si1: "3\nChips 45.25\nSoda 30\nChocolate 120.75",
    so1: invoiceTotal([["Chips", 45.25], ["Soda", 30], ["Chocolate", 120.75]]),
    si2: "2\nPen 10.5\nNotebook 65",
    so2: invoiceTotal([["Pen", 10.5], ["Notebook", 65]]),
    i1: "1\nStapler 199.99",
    o1: invoiceTotal([["Stapler", 199.99]]),
    i2: "4\nA 0.1\nB 0.2\nC 0.3\nD 0.4",
    o2: invoiceTotal([["A", 0.1], ["B", 0.2], ["C", 0.3], ["D", 0.4]]),
    i3: "2\nTape 40\nGlue 35.55",
    o3: invoiceTotal([["Tape", 40], ["Glue", 35.55]]),
    inputconstrains: "1 <= n <= 100, 0 <= price <= 10000, names have no spaces",
    blacklist: 'f"',
    whitelist: ".format(",
    sourcecode:
`n = int(input())
total = 0.0
for _ in range(n):
    parts = input().split()
    total += float(parts[1])
print('Total: ' + '{:.2f}'.format(total))`,
  }),

  cq({
    title: "Teleprompter Word Reversal",
    description:
      "A radio jockey's teleprompter stores lines word-by-word backwards for a tongue-twister segment.\n" +
      "Read the sentence and print it with the word order reversed, keeping single spaces between words. Reverse the word order with a manual loop - no slicing tricks.\n" +
      "\n" +
      "Input Format:\n" +
      "One line: words separated by single spaces (lowercase letters)\n" +
      "\n" +
      "Output Format:\n" +
      "The same words in reverse order, separated by single spaces.\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= words <= 50, each word 1..20 lowercase letters",
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.methods,
    si1: "the quick brown fox", so1: "fox brown quick the",
    si2: "radio rocks today", so2: "today rocks radio",
    i1: "one", o1: "one",
    i2: "a b c d e f", o2: "f e d c b a",
    i3: "late night show", o3: "show night late",
    inputconstrains: "1 <= words <= 50, each word 1..20 lowercase letters",
    blacklist: "[::-1]",
    whitelist: ".split(, .join(",
    sourcecode:
`line = input()
words = line.split()
out = []
for i in range(len(words) - 1, -1, -1):
    out.append(words[i])
print(" ".join(out))`,
  }),

  cq({
    title: "Vault Codeword Palindrome",
    description:
      "A security vault only opens when the day's codeword reads the same forwards and backwards.\n" +
      "Check the codeword manually with a two-pointer loop (compare the first and last characters while moving inward) - no slicing shortcuts.\n" +
      "\n" +
      "Input Format:\n" +
      "One line: the codeword (lowercase letters)\n" +
      "\n" +
      "Output Format:\n" +
      "Print \"Palindrome\" if it reads the same both ways, otherwise \"Not Palindrome\".\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= len(word) <= 100, lowercase letters only",
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.iter,
    si1: "level", so1: "Palindrome",
    si2: "quiz", so2: "Not Palindrome",
    i1: "racecar", o1: "Palindrome",
    i2: "a", o2: "Palindrome",
    i3: "noon", o3: "Palindrome",
    inputconstrains: "1 <= len(word) <= 100, lowercase letters only",
    blacklist: "[::-1], reversed(",
    whitelist: "while ",
    sourcecode:
`word = input()
left = 0
right = len(word) - 1
is_pal = True
while left < right:
    if word[left] != word[right]:
        is_pal = False
        break
    left += 1
    right -= 1
if is_pal:
    print("Palindrome")
else:
    print("Not Palindrome")`,
  }),

  cq({
    title: "Chat Censor Filter",
    description:
      "A chat moderation bot masks banned words instead of deleting them: every standalone occurrence of the banned word is replaced by asterisks of the same length.\n" +
      "Words are separated by single spaces and contain no punctuation. A word is masked only when it exactly equals the banned word (so \"robot\" survives when the banned word is \"bot\").\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: the banned word (lowercase letters)\n" +
      "Line 2: the message (lowercase words separated by single spaces)\n" +
      "\n" +
      "Output Format:\n" +
      "The censored message with each banned word replaced by '*' repeated for its length.\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= len(banned) <= 15, 1 <= words <= 30, lowercase letters only",
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.methods,
    si1: "spam\nthis spam message is spam", so1: "this **** message is ****",
    si2: "bot\nbot spotted a robot", so2: "*** spotted a robot",
    i1: "spam\nclean talk only", o1: "clean talk only",
    i2: "abc\nabc abc abc", o2: "*** *** ***",
    i3: "x\nx y x", o3: "* y *",
    inputconstrains: "1 <= len(banned) <= 15, 1 <= words <= 30, lowercase letters only",
    blacklist: ".replace(",
    whitelist: ".split(, .join(",
    sourcecode:
`banned = input()
message = input()
words = message.split()
out = []
for w in words:
    if w == banned:
        out.append("*" * len(banned))
    else:
        out.append(w)
print(" ".join(out))`,
  }),

  cq({
    title: "Triage Name Tag Formatter",
    description:
      "A hospital triage desk prints name tags where every word of the patient's name starts with a capital letter and the rest is lowercase.\n" +
      "The label printer firmware blocks .title() and .capitalize(), so build each word manually: uppercase the first character and lowercase the rest.\n" +
      "\n" +
      "Input Format:\n" +
      "One line: the full name, words separated by single spaces (letters only, any case)\n" +
      "\n" +
      "Output Format:\n" +
      "The normalized name on one line.\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= words <= 8, each word 1..20 letters",
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.methods,
    si1: "mArY jANE", so1: "Mary Jane",
    si2: "JOHN", so2: "John",
    i1: "aNNa bELL lee", o1: "Anna Bell Lee",
    i2: "x", o2: "X",
    i3: "oHARA kATE", o3: "Ohara Kate",
    inputconstrains: "1 <= words <= 8, each word 1..20 letters",
    blacklist: ".title(, .capitalize(",
    whitelist: ".upper(, .lower(",
    sourcecode:
`line = input()
words = line.split()
out = []
for w in words:
    out.append(w[0].upper() + w[1:].lower())
print(" ".join(out))`,
  }),

  cq({
    title: "Greenhouse Sensor Board",
    description:
      "A greenhouse dashboard prints sensor readings in fixed-width columns: the sensor name left-aligned in a width-10 column, the reading right-aligned in a width-6 column with exactly 2 decimals.\n" +
      "Use f-string format specifiers for the alignment.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: n, the number of sensors\n" +
      "Next n lines: sensor_name reading (the name is a single word; the reading is a number)\n" +
      "\n" +
      "Output Format:\n" +
      "n lines, each: the name left-aligned in width 10, then the reading right-aligned in width 6 with 2 decimals.\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= n <= 20, 1 <= len(name) <= 10, 0 <= reading <= 1000",
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.fstr,
    si1: "3\nauth 87.5\ncache 9.75\ngateway 100",
    so1: [gRow("auth", "87.5"), gRow("cache", "9.75"), gRow("gateway", "100")].join("\n"),
    si2: "2\nweb 45.25\ndns 7.5",
    so2: [gRow("web", "45.25"), gRow("dns", "7.5")].join("\n"),
    i1: "1\ndb 0.5",
    o1: gRow("db", "0.5"),
    i2: "3\napi 5\ndb 100\nweb 12.25",
    o2: [gRow("api", "5"), gRow("db", "100"), gRow("web", "12.25")].join("\n"),
    i3: "2\ncache 99.99\nauth 100",
    o3: [gRow("cache", "99.99"), gRow("auth", "100")].join("\n"),
    inputconstrains: "1 <= n <= 20, 1 <= len(name) <= 10, 0 <= reading <= 1000",
    blacklist: ".format(",
    whitelist: ":<10, :>6.2f",
    sourcecode:
`n = int(input())
for _ in range(n):
    parts = input().split()
    name = parts[0]
    reading = float(parts[1])
    print(f"{name:<10}{reading:>6.2f}")`,
  }),

  // ---------------- hard ----------------
  cq({
    title: "Staff Roster Beautifier",
    description:
      "An HR intern pastes raw comma-separated staff records into a report tool that formats valid rows into aligned columns and rejects broken rows.\n" +
      "Each record line is name,dept,score. A record is valid only when it splits into exactly 3 fields, name and dept are non-empty, and score is a digit string whose value is at most 100. Valid records print as aligned rows; anything else prints INVALID.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: n, the number of records\n" +
      "Next n lines: name,dept,score (fields contain no spaces)\n" +
      "\n" +
      "Output Format:\n" +
      "For each valid record print: name left-aligned in width 10, dept left-aligned in width 12, score right-aligned in width 3.\n" +
      "For each invalid record print: INVALID\n" +
      "Finally print: Valid records: <count>\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= n <= 50, fields 0..15 chars without spaces, score is a digit string",
    difficulty: "hard",
    variant: "scenario",
    subtopic: SUB.fstr,
    si1: "3\nramesh,sales,88\n,hr,70\npriya,eng,95",
    so1: [rRow("ramesh", "sales", "88"), "INVALID", rRow("priya", "eng", "95"), "Valid records: 2"].join("\n"),
    si2: "2\nalex,eng,abc\nsam,fin,105",
    so2: ["INVALID", "INVALID", "Valid records: 0"].join("\n"),
    i1: "1\ndeepa,marketing,100",
    o1: [rRow("deepa", "marketing", "100"), "Valid records: 1"].join("\n"),
    i2: "4\nvikram,it,77\nraj,,55\nana,ops,7\nom,fin,",
    o2: [rRow("vikram", "it", "77"), "INVALID", rRow("ana", "ops", "7"), "INVALID", "Valid records: 2"].join("\n"),
    i3: "2\na,b,c,d\nx,y,5z",
    o3: ["INVALID", "INVALID", "Valid records: 0"].join("\n"),
    inputconstrains: "1 <= n <= 50, fields 0..15 chars without spaces, score is a digit string",
    blacklist: ".format(",
    whitelist: ".split(, :<10",
    sourcecode:
`n = int(input())
valid_count = 0
for _ in range(n):
    parts = input().split(",")
    ok = False
    name = ""
    dept = ""
    score = ""
    if len(parts) == 3:
        name, dept, score = parts
        if name != "" and dept != "" and score.isdigit() and int(score) <= 100:
            ok = True
    if ok:
        valid_count += 1
        print(f"{name:<10}{dept:<12}{score:>3}")
    else:
        print("INVALID")
print(f"Valid records: {valid_count}")`,
  }),

  cq({
    title: "Conference Feedback Word Board",
    description:
      "After a conference, organizers build a word-frequency board from the feedback wall: count how often each word appears and rank words by count (descending), breaking ties alphabetically.\n" +
      "Count the words manually with a dictionary - Counter is not available on the kiosk.\n" +
      "\n" +
      "Input Format:\n" +
      "One line: lowercase words separated by single spaces\n" +
      "\n" +
      "Output Format:\n" +
      "One line per distinct word: <word> <count>, ordered by count descending, then word ascending.\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= words <= 200, lowercase letters only",
    difficulty: "hard",
    variant: "scenario",
    subtopic: SUB.methods,
    si1: "bug fix bug test fix bug", so1: "bug 3\nfix 2\ntest 1",
    si2: "alpha beta alpha beta alpha", so2: "alpha 3\nbeta 2",
    i1: "solo", o1: "solo 1",
    i2: "b a c a b c a", o2: "a 3\nb 2\nc 2",
    i3: "x y x y z z z", o3: "z 3\nx 2\ny 2",
    inputconstrains: "1 <= words <= 200, lowercase letters only",
    blacklist: "Counter(",
    whitelist: ".split(, lambda",
    sourcecode:
`line = input()
words = line.split()
freq = {}
for w in words:
    if w in freq:
        freq[w] += 1
    else:
        freq[w] = 1
items = sorted(freq.items(), key=lambda kv: (-kv[1], kv[0]))
for word, cnt in items:
    print(word, cnt)`,
  }),

  cq({
    title: "Certificate Template Engine",
    description:
      "An academy's certificate generator fills placeholder tokens written as {key} inside a template line.\n" +
      "The string-method toolbox on the print server is broken, so fill the template by scanning it character by character: when a { starts a token, read until } and substitute the mapped value.\n" +
      "Every token in the template has a mapping.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: the template line (may contain {key} placeholders)\n" +
      "Line 2: n, the number of mappings\n" +
      "Next n lines: key value (the value is a single token without spaces)\n" +
      "\n" +
      "Output Format:\n" +
      "The filled template line.\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= len(template) <= 300, 1 <= n <= 10, tokens are well-formed {key} with no nesting",
    difficulty: "hard",
    variant: "scenario",
    subtopic: SUB.iter,
    si1: "Dear {student}, welcome to {course}. Grade: {grade}.\n3\nstudent Meera\ncourse PyBasics\ngrade A",
    so1: "Dear Meera, welcome to PyBasics. Grade: A.",
    si2: "No tokens here\n1\nx y",
    so2: "No tokens here",
    i1: "{greet} {greet} dear {name}\n2\ngreet Hello\nname Raj",
    o1: "Hello Hello dear Raj",
    i2: "Order {id} total {amount} INR\n2\nid A-1029\namount 4500",
    o2: "Order A-1029 total 4500 INR",
    i3: "Hi {name}!\n1\nname Bo",
    o3: "Hi Bo!",
    inputconstrains: "1 <= len(template) <= 300, 1 <= n <= 10, values have no spaces",
    blacklist: ".replace(, .format(",
    whitelist: ".join(",
    sourcecode:
`template = input()
n = int(input())
values = {}
for _ in range(n):
    parts = input().split()
    values[parts[0]] = parts[1]
out = []
i = 0
while i < len(template):
    ch = template[i]
    if ch == "{":
        j = template.find("}", i)
        key = template[i + 1:j]
        out.append(values[key])
        i = j + 1
    else:
        out.append(ch)
        i += 1
print("".join(out))`,
  }),

  cq({
    title: "Container Code Run Analyzer",
    description:
      "A warehouse scanner reads container codes that mix letters and digits.\n" +
      "The audit tool reports every maximal run of letters and every maximal run of digits in the order they appear, scanning the code manually with an index loop.\n" +
      "\n" +
      "Input Format:\n" +
      "One line: the container code (letters and digits only)\n" +
      "\n" +
      "Output Format:\n" +
      "For each run, one line: ALPHA <text> <length> for letter runs, DIGIT <text> <length> for digit runs.\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= len(code) <= 200, letters and digits only",
    difficulty: "hard",
    variant: "scenario",
    subtopic: SUB.iter,
    si1: "AB12cd3", so1: "ALPHA AB 2\nDIGIT 12 2\nALPHA cd 2\nDIGIT 3 1",
    si2: "99bottles", so2: "DIGIT 99 2\nALPHA bottles 7",
    i1: "a", o1: "ALPHA a 1",
    i2: "R2D2C3PO", o2: "ALPHA R 1\nDIGIT 2 1\nALPHA D 1\nDIGIT 2 1\nALPHA C 1\nDIGIT 3 1\nALPHA PO 2",
    i3: "777", o3: "DIGIT 777 3",
    inputconstrains: "1 <= len(code) <= 200, letters and digits only",
    blacklist: "re.",
    whitelist: "while ",
    sourcecode:
`code = input()
i = 0
while i < len(code):
    ch = code[i]
    if ch.isdigit():
        kind = "DIGIT"
    else:
        kind = "ALPHA"
    start = i
    while i < len(code):
        if kind == "DIGIT" and code[i].isdigit():
            i += 1
        elif kind == "ALPHA" and code[i].isalpha():
            i += 1
        else:
            break
    run = code[start:i]
    print(kind, run, len(run))`,
  }),
];

/* ============================== MCQs ============================== */

const mcqs = [
  mq({
    title: "String Item Assignment Error",
    description:
      "A string is assigned with s = 'cat'. What happens when the statement s[0] = 'b' executes? (Strings are immutable in Python.)",
    difficulty: "easy",
    subtopic: SUB.iter,
    options: ["The string becomes 'bat'", "ValueError is raised", "TypeError is raised", "Python silently ignores the assignment"],
    correct: 3,
  }),
  mq({
    title: "String Repeat Expression",
    description: "What is the value of the Python expression 'py' * 3?",
    difficulty: "easy",
    subtopic: SUB.iter,
    options: ["py py py", "pypypy", "pypypypy", "3py"],
    correct: 2,
  }),
  mq({
    title: "Slice Middle Three",
    description: "What does this Python snippet print?",
    difficulty: "easy",
    subtopic: SUB.slice,
    options: ["yth", "Pyt", "tho", "ytho"],
    correct: 1,
    snippet:
`s = "Python"
print(s[1:4])`,
  }),
  mq({
    title: "Uppercase Method Pick",
    description: "Which string method call converts 'hello world' into 'HELLO WORLD'?",
    difficulty: "easy",
    subtopic: SUB.methods,
    options: ["s.capitalize()", "s.title()", "s.swapcase()", "s.upper()"],
    correct: 4,
  }),
  mq({
    title: "Comma Split List",
    description: "What does this Python snippet print?",
    difficulty: "easy",
    subtopic: SUB.methods,
    options: ["['a', 'b', 'c']", "'a,b,c'", "['a b c']", "('a', 'b', 'c')"],
    correct: 1,
    snippet:
`print("a,b,c".split(","))`,
  }),
  mq({
    title: "Strip Default Behavior",
    description: "What does s.strip() remove when it is called with no arguments?",
    difficulty: "easy",
    subtopic: SUB.methods,
    options: ["Every whitespace character anywhere in the string", "Leading and trailing whitespace only", "Only leading whitespace", "Trailing punctuation as well as whitespace"],
    correct: 2,
  }),
  mq({
    title: "Two Decimal F-string Value",
    description: "What does the f-string expression f'{3.14159:.2f}' evaluate to?",
    difficulty: "easy",
    subtopic: SUB.fstr,
    options: ["3.1", "3.15", "3.14", "3.1416"],
    correct: 3,
  }),
  mq({
    title: "Find First L",
    description: "What does the call 'hello'.find('l') return?",
    difficulty: "easy",
    subtopic: SUB.methods,
    options: ["3", "2", "-1", "1"],
    correct: 2,
  }),
  mq({
    title: "Case-Sensitive Ordering",
    description: "Which of these comparisons evaluates to True in Python? (Remember that ASCII orders all uppercase letters before lowercase letters.)",
    difficulty: "easy",
    subtopic: SUB.methods,
    options: ["'Z' < 'a'", "'apple' == 'Apple'", "'b' < 'B'", "'A' > 'a'"],
    correct: 1,
  }),
  mq({
    title: "Print End Parameter",
    description: "What does this Python snippet print?",
    difficulty: "easy",
    subtopic: SUB.fstr,
    options: ["Hi and ! on separate lines", "Hi !", "!iH", "Hi!"],
    correct: 4,
    snippet:
`print("Hi", end="")
print("!")`,
  }),
  mq({
    title: "Find Missing Return",
    description: "What does this Python snippet print?",
    difficulty: "medium",
    subtopic: SUB.methods,
    options: ["0", "6", "-1", "It raises ValueError"],
    correct: 3,
    snippet:
`print("banana".find("z"))`,
  }),
  mq({
    title: "Split Default Whitespace",
    description: "What does this Python snippet print? (s.split() with no arguments splits on runs of whitespace.)",
    difficulty: "medium",
    subtopic: SUB.methods,
    options: ["['a', 'b']", "['', 'a', 'b', '']", "['  a  b  ']", "['a', '', 'b']"],
    correct: 1,
    snippet:
`s = "  a  b  "
print(s.split())`,
  }),
  mq({
    title: "Join With Dash",
    description: "What does this Python snippet print? (The separator goes BETWEEN items.)",
    difficulty: "medium",
    subtopic: SUB.methods,
    options: ["abc", "a-b-c", "['a-b-c']", "a-,b-,c"],
    correct: 2,
    snippet:
`print("-".join("abc"))`,
  }),
  mq({
    title: "Format Positional Swap",
    description: "What does this Python snippet print?",
    difficulty: "medium",
    subtopic: SUB.fmt,
    options: ["x y", "{1} {0}", "1 0", "y x"],
    correct: 4,
    snippet:
`print("{1} {0}".format("x", "y"))`,
  }),
  mq({
    title: "Last Three Slice",
    description: "What does this Python snippet print?",
    difficulty: "medium",
    subtopic: SUB.slice,
    options: ["tho", "Pyt", "hon", "on"],
    correct: 3,
    snippet:
`s = "Python"
print(s[-3:])`,
  }),
  mq({
    title: "Strip Lower Chain",
    description: "What does this Python snippet print?",
    difficulty: "medium",
    subtopic: SUB.methods,
    options: ["hello world", "HELLO WORLD", "Hello World", "hello  world"],
    correct: 1,
    snippet:
`print(" Hello World ".strip().lower())`,
  }),
  mq({
    title: "Right Align Width Spec",
    description: "What does this Python snippet print? (Careful with the spaces produced by the width specifier.)",
    difficulty: "hard",
    subtopic: SUB.fstr,
    options: ["7    |", "    7|", "00007|", "  7  |"],
    correct: 2,
    snippet:
`print(f"{7:>5}|")`,
  }),
  mq({
    title: "Prepend Loop Reversal",
    description: "What does this Python snippet print? (Strings are immutable; each iteration builds a new string.)",
    difficulty: "hard",
    subtopic: SUB.iter,
    options: ["cba", "abc", "aabbcc", "cbaabc"],
    correct: 1,
    snippet:
`s = "abc"
t = ""
for ch in s:
    t = ch + t
print(t)`,
  }),
  mq({
    title: "Char Code Arithmetic",
    description: "What does this Python snippet print?",
    difficulty: "hard",
    subtopic: SUB.methods,
    options: ["B", "67", "c", "C"],
    correct: 4,
    snippet:
`print(chr(ord("A") + 2))`,
  }),
  mq({
    title: "F-string Mixed Spec",
    description: "What does this Python snippet print? (Combine the expression result and the width specifier carefully.)",
    difficulty: "hard",
    subtopic: SUB.fstr,
    options: ["10=5!", "10= 5!", "10=  5!", "x * 2=x!"],
    correct: 3,
    snippet:
`x = 5
print(f"{x * 2}={x:>3}!")`,
  }),
];

writeFileSync(
  DIR + "/day-09.code.json",
  JSON.stringify({ day: 9, topics: [{ name: TOPIC_NAME, subtopics: SUBTOPICS }], questions }, null, 2)
);
writeFileSync(
  DIR + "/day-09.mcq.json",
  JSON.stringify({ day: 9, questions: mcqs }, null, 2)
);
console.log("wrote day 09:", questions.length, "code,", mcqs.length, "mcq");
