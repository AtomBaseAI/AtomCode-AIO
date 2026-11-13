/**
 * Builder for day 12 — "Comprehensions" (20 code + 20 MCQ).
 * Run: bun scripts/python-programming/builders/build-day-12.ts
 */
import { mkdirSync, writeFileSync } from "node:fs";

const DIR = "/home/z/my-project/scripts/python-programming/data";
mkdirSync(DIR, { recursive: true });

const TOPIC_NAME = "Comprehensions";
const SUB = {
  lc: "List Comprehension",
  clc: "Conditional List Comprehension",
  sc: "Set Comprehension",
  dc: "Dictionary Comprehension",
  nc: "Nested Comprehensions",
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

/* ============================ CODE QUESTIONS ============================ */

const questions = [
  // ---------------- easy: basic drills ----------------
  cq({
    title: "Square List Comprehension Drill",
    description:
      `Pure construct drill: build the squares of the first n positive integers with a single list comprehension and print the resulting list.\n` +
      `\n` +
      `Input Format:\n` +
      `One line with the integer n.\n` +
      `\n` +
      `Output Format:\n` +
      `Print the list of squares from 1*1 to n*n, exactly as Python prints a list.\n` +
      `\n` +
      `Constraints:\n` +
      `1 <= n <= 20`,
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.lc,
    si1: "3", so1: "[1, 4, 9]",
    si2: "5", so2: "[1, 4, 9, 16, 25]",
    i1: "1", o1: "[1]",
    i2: "7", o2: "[1, 4, 9, 16, 25, 36, 49]",
    i3: "10", o3: "[1, 4, 9, 16, 25, 36, 49, 64, 81, 100]",
    inputconstrains: "1 <= n <= 20",
    sourcecode: String.raw`n = int(input())
print([i * i for i in range(1, n + 1)])`,
  }),

  cq({
    title: "Even Only Comprehension Drill",
    description:
      `Pure construct drill: read a list of integers and keep only the even ones using a conditional list comprehension (an if clause after the for clause).\n` +
      `\n` +
      `Input Format:\n` +
      `One line with integers separated by spaces.\n` +
      `\n` +
      `Output Format:\n` +
      `Print the list of even values in input order, exactly as Python prints a list.\n` +
      `\n` +
      `Constraints:\n` +
      `1 <= count <= 50, -1000 <= value <= 1000`,
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.clc,
    si1: "1 2 3 4 5 6", so1: "[2, 4, 6]",
    si2: "7 7 7", so2: "[]",
    i1: "10 11 12 13 14", o1: "[10, 12, 14]",
    i2: "-3 -2 0 8", o2: "[-2, 0, 8]",
    i3: "2", o3: "[2]",
    inputconstrains: "1 <= count <= 50, -1000 <= value <= 1000",
    sourcecode: String.raw`nums = [int(x) for x in input().split()]
print([x for x in nums if x % 2 == 0])`,
  }),

  cq({
    title: "Uppercase Words Comprehension Drill",
    description:
      `Pure construct drill: transform every word in the input to upper case using a list comprehension over the words.\n` +
      `\n` +
      `Input Format:\n` +
      `One line with words separated by spaces.\n` +
      `\n` +
      `Output Format:\n` +
      `Print the list of upper-cased words in input order, exactly as Python prints a list.\n` +
      `\n` +
      `Constraints:\n` +
      `1 <= words <= 20, each word has length 1 to 20`,
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.lc,
    si1: "alpha beta", so1: "['ALPHA', 'BETA']",
    si2: "ok", so2: "['OK']",
    i1: "Py ThOn 42", o1: "['PY', 'THON', '42']",
    i2: "a b c", o2: "['A', 'B', 'C']",
    i3: "spring", o3: "['SPRING']",
    inputconstrains: "1 <= words <= 20, word length 1..20",
    sourcecode: String.raw`words = input().split()
print([w.upper() for w in words])`,
  }),

  cq({
    title: "Word Length Dict Comprehension Drill",
    description:
      `Pure construct drill: build a dictionary mapping each word to its length with a dictionary comprehension and print it. Duplicate words collapse to one entry.\n` +
      `\n` +
      `Input Format:\n` +
      `One line with words separated by spaces.\n` +
      `\n` +
      `Output Format:\n` +
      `Print the dictionary exactly as Python prints it.\n` +
      `\n` +
      `Constraints:\n` +
      `1 <= words <= 15, each word has length 1 to 12`,
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.dc,
    si1: "cat house", so1: "{'cat': 3, 'house': 5}",
    si2: "hi", so2: "{'hi': 2}",
    i1: "a bb ccc", o1: "{'a': 1, 'bb': 2, 'ccc': 3}",
    i2: "bee bee", o2: "{'bee': 3}",
    i3: "x y z", o3: "{'x': 1, 'y': 1, 'z': 1}",
    inputconstrains: "1 <= words <= 15, word length 1..12",
    sourcecode: String.raw`words = input().split()
print({w: len(w) for w in words})`,
  }),

  cq({
    title: "First Letter Set Comprehension Drill",
    description:
      `Pure construct drill: collect the first letter of every word with a set comprehension, then print the letters sorted (a set itself must never be printed directly).\n` +
      `\n` +
      `Input Format:\n` +
      `One line with lowercase words separated by spaces.\n` +
      `\n` +
      `Output Format:\n` +
      `Print the sorted list of distinct first letters, exactly as Python prints a list.\n` +
      `\n` +
      `Constraints:\n` +
      `1 <= words <= 30, each word has length 1 to 15, lowercase letters only`,
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.sc,
    si1: "banana apple cherry", so1: "['a', 'b', 'c']",
    si2: "zz top", so2: "['t', 'z']",
    i1: "dog deer dove cat", o1: "['c', 'd']",
    i2: "x", o2: "['x']",
    i3: "aa ab b", o3: "['a', 'b']",
    inputconstrains: "1 <= words <= 30, lowercase, length 1..15",
    sourcecode: String.raw`words = input().split()
print(sorted({w[0] for w in words}))`,
  }),

  cq({
    title: "Matrix Flatten Comprehension Drill",
    description:
      `Pure construct drill: read a matrix and flatten it row by row with a single nested list comprehension (two for clauses in one comprehension).\n` +
      `\n` +
      `Input Format:\n` +
      `Line 1: r and c separated by a space.\n` +
      `Lines 2..r+1: each row with c integers separated by spaces.\n` +
      `\n` +
      `Output Format:\n` +
      `Print the flattened list in row-major order, exactly as Python prints a list.\n` +
      `\n` +
      `Constraints:\n` +
      `1 <= r, c <= 10, -100 <= value <= 100`,
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.nc,
    si1: "2 3\n1 2 3\n4 5 6", so1: "[1, 2, 3, 4, 5, 6]",
    si2: "1 1\n9", so2: "[9]",
    i1: "3 2\n1 2\n3 4\n5 6", o1: "[1, 2, 3, 4, 5, 6]",
    i2: "2 2\n0 0\n0 0", o2: "[0, 0, 0, 0]",
    i3: "2 1\n7\n8", o3: "[7, 8]",
    inputconstrains: "1 <= r, c <= 10, -100 <= value <= 100",
    sourcecode: String.raw`r, c = map(int, input().split())
grid = [[int(x) for x in input().split()] for _ in range(r)]
print([x for row in grid for x in row])`,
  }),

  // ---------------- easy: scenario ----------------
  cq({
    title: "GST Price List Comprehension",
    description:
      `A shop terminal recomputes its shelf prices with 18% GST in one sweep. Read the base prices and build the final prices with a single list comprehension multiplying each price by 1.18, then print them.\n` +
      `\n` +
      `Input Format:\n` +
      `One line with base prices separated by spaces.\n` +
      `\n` +
      `Output Format:\n` +
      `Print the prices after GST, each formatted to exactly 2 decimal places, space separated, in input order.\n` +
      `\n` +
      `Constraints:\n` +
      `1 <= count <= 20, 0 <= price <= 100000`,
    difficulty: "easy",
    variant: "scenario",
    subtopic: SUB.lc,
    si1: "100 250", so1: "118.00 295.00",
    si2: "0", so2: "0.00",
    i1: "10.5 20 99.99", o1: "12.39 23.60 117.99",
    i2: "5", o2: "5.90",
    i3: "1.11 2.22", o3: "1.31 2.62",
    inputconstrains: "1 <= count <= 20, 0 <= price <= 100000",
    sourcecode: String.raw`prices = [float(x) for x in input().split()]
with_gst = [p * 1.18 for p in prices]
print(" ".join(f"{p:.2f}" for p in with_gst))`,
  }),

  cq({
    title: "Passing Students Filter Comprehension",
    description:
      `A teacher posts results: build the list of students who scored at least 50 using one conditional list comprehension over the name/score pairs, then join the names for the notice board. If nobody passed, print None.\n` +
      `\n` +
      `Input Format:\n` +
      `Line 1: the student names separated by spaces.\n` +
      `Line 2: the scores separated by spaces, aligned with the names.\n` +
      `\n` +
      `Output Format:\n` +
      `Print the passing names in input order, joined with ", " (comma and space), or None when the list is empty.\n` +
      `\n` +
      `Constraints:\n` +
      `1 <= students <= 30, 0 <= score <= 100, names are distinct`,
    difficulty: "easy",
    variant: "scenario",
    subtopic: SUB.clc,
    si1: "Ana Boe Cal\n60 40 85", so1: "Ana, Cal",
    si2: "Dee\n49", so2: "None",
    i1: "Eli Fay\n50 49", o1: "Eli",
    i2: "Gus Hux Ivy\n100 0 75", o2: "Gus, Ivy",
    i3: "Jo\n51", o3: "Jo",
    inputconstrains: "1 <= students <= 30, 0 <= score <= 100",
    sourcecode: String.raw`names = input().split()
scores = [int(x) for x in input().split()]
passed = [name for name, score in zip(names, scores) if score >= 50]
print(", ".join(passed) if passed else "None")`,
  }),

  cq({
    title: "Tag Dedupe Set Comprehension",
    description:
      `A blog backend normalizes the tag cloud of an article: collect the distinct tags with a set comprehension and publish them in alphabetical order (sorted, since sets are unordered).\n` +
      `\n` +
      `Input Format:\n` +
      `One line with lowercase tags separated by spaces.\n` +
      `\n` +
      `Output Format:\n` +
      `Print the distinct tags in alphabetical order, space separated.\n` +
      `\n` +
      `Constraints:\n` +
      `1 <= tags <= 40, each tag has length 1 to 12, lowercase letters only`,
    difficulty: "easy",
    variant: "scenario",
    subtopic: SUB.sc,
    si1: "sale flash sale mega flash", so1: "flash mega sale",
    si2: "beta", so2: "beta",
    i1: "z a z a", o1: "a z",
    i2: "qa ui ux ui qa", o2: "qa ui ux",
    i3: "same same same", o3: "same",
    inputconstrains: "1 <= tags <= 40, lowercase, length 1..12",
    sourcecode: String.raw`tags = input().split()
print(" ".join(sorted({t for t in tags})))`,
  }),

  cq({
    title: "Seat Grid Reservation Flatten",
    description:
      `A theatre reservation sheet stores seats as a grid of seat codes. Flatten the grid into the single display row of codes using a nested comprehension over the rows and codes.\n` +
      `\n` +
      `Input Format:\n` +
      `Line 1: r and c separated by a space.\n` +
      `Lines 2..r+1: each row with c seat codes separated by spaces.\n` +
      `\n` +
      `Output Format:\n` +
      `Print all codes in row-major order, space separated.\n` +
      `\n` +
      `Constraints:\n` +
      `1 <= r, c <= 8, each code has length 1 to 3`,
    difficulty: "easy",
    variant: "scenario",
    subtopic: SUB.nc,
    si1: "2 3\nA1 A2 A3\nB1 B2 B3", so1: "A1 A2 A3 B1 B2 B3",
    si2: "1 2\nX1 X2", so2: "X1 X2",
    i1: "3 1\nP\nQ\nR", o1: "P Q R",
    i2: "2 2\nC4 C5\nD4 D5", o2: "C4 C5 D4 D5",
    i3: "1 1\nZ9", o3: "Z9",
    inputconstrains: "1 <= r, c <= 8, code length 1..3",
    sourcecode: String.raw`r, c = map(int, input().split())
grid = [input().split() for _ in range(r)]
print(" ".join(code for row in grid for code in row))`,
  }),

  // ---------------- medium ----------------
  cq({
    title: "Even Sensor Calibration Comp",
    description:
      `A sensor gateway calibrates its stream in one pass: every even reading is doubled and odd readings are dropped. Build the calibrated values with a single conditional list comprehension (no .append, no map, no filter).\n` +
      `\n` +
      `Input Format:\n` +
      `Line 1: the integer n.\n` +
      `Line 2: n integers separated by spaces.\n` +
      `\n` +
      `Output Format:\n` +
      `Print the doubled even values in input order, space separated; if no value survives, print None.\n` +
      `\n` +
      `Constraints:\n` +
      `1 <= n <= 100, -10000 <= value <= 10000`,
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.clc,
    si1: "4\n2 3 4 5", so1: "4 8",
    si2: "3\n1 3 7", so2: "None",
    i1: "5\n10 21 32 43 54", o1: "20 64 108",
    i2: "1\n8", o2: "16",
    i3: "2\n-4 6", o3: "-8 12",
    inputconstrains: "1 <= n <= 100, -10000 <= value <= 10000",
    blacklist: ".append(, map(, filter(",
    whitelist: "for ",
    sourcecode: String.raw`n = int(input())
values = [int(x) for x in input().split()]
calibrated = [v * 2 for v in values if v % 2 == 0]
print(" ".join(str(v) for v in calibrated) if calibrated else "None")`,
  }),

  cq({
    title: "Threshold Verdict Else Comprehension",
    description:
      `An exam scanner stamps every score with a verdict in one comprehension using an if/else expression (P when the score is at least the threshold, F otherwise), then reports the pass and fail totals.\n` +
      `\n` +
      `Input Format:\n` +
      `Line 1: the threshold t.\n` +
      `Line 2: the integer n.\n` +
      `Line 3: n scores separated by spaces.\n` +
      `\n` +
      `Output Format:\n` +
      `Line 1: the verdict letters in input order, space separated.\n` +
      `Line 2: pass X fail Y where X and Y are the two counts.\n` +
      `\n` +
      `Constraints:\n` +
      `0 <= t <= 200, 1 <= n <= 100, -100 <= score <= 200`,
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.clc,
    si1: "50\n4\n60 40 70 50", so1: "P F P P\npass 3 fail 1",
    si2: "10\n2\n9 10", so2: "F P\npass 1 fail 1",
    i1: "0\n3\n-1 0 5", o1: "F P P\npass 2 fail 1",
    i2: "100\n1\n100", o2: "P\npass 1 fail 0",
    i3: "60\n5\n59 60 61 58 62", o3: "F P P F P\npass 3 fail 2",
    inputconstrains: "0 <= t <= 200, 1 <= n <= 100, -100 <= score <= 200",
    blacklist: ".append(",
    whitelist: "if , else",
    sourcecode: String.raw`t = int(input())
n = int(input())
values = [int(x) for x in input().split()]
verdicts = ["P" if v >= t else "F" for v in values]
passes = len([v for v in values if v >= t])
print(" ".join(verdicts))
print(f"pass {passes} fail {n - passes}")`,
  }),

  cq({
    title: "Badge Roster Inversion Comp",
    description:
      `A badge system keeps staff as name -> badge number and needs the inverse lookup table badge -> name, built with a dictionary comprehension. When two people share a badge, the person processed later owns it - but the badge keeps the position of its first occurrence. Print the inverted table in that order.\n` +
      `\n` +
      `Input Format:\n` +
      `Line 1: the integer n.\n` +
      `Lines 2..n+1: one entry per line: name and badge number separated by a space.\n` +
      `\n` +
      `Output Format:\n` +
      `One line per distinct badge, in first-occurrence order: the badge number, a space, the owning name.\n` +
      `\n` +
      `Constraints:\n` +
      `1 <= n <= 50, name length 1 to 15, 1 <= badge <= 9999`,
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.dc,
    si1: "4\nAna 12\nBo 7\nCal 12\nDee 9", so1: "12 Cal\n7 Bo\n9 Dee",
    si2: "2\nX 100\nY 200", so2: "100 X\n200 Y",
    i1: "3\nA 5\nB 5\nC 6", o1: "5 B\n6 C",
    i2: "1\nSolo 42", o2: "42 Solo",
    i3: "5\nP 3\nQ 1\nR 3\nS 2\nT 1", o3: "3 R\n1 T\n2 S",
    inputconstrains: "1 <= n <= 50, name length 1..15, 1 <= badge <= 9999",
    blacklist: "dict(, .append(",
    whitelist: "for ",
    sourcecode: String.raw`n = int(input())
pairs = [input().split() for _ in range(n)]
owner = {int(badge): name for name, badge in pairs}
for badge, name in owner.items():
    print(badge, name)`,
  }),

  cq({
    title: "Remainder Bucket Set Comp",
    description:
      `A hash-sharding tool studies which buckets a batch of keys lands in. Collect the distinct remainders value mod k with a set comprehension (no .add, no set() constructor), then report them sorted together with the bucket count.\n` +
      `\n` +
      `Input Format:\n` +
      `Line 1: n and k separated by a space.\n` +
      `Line 2: n integers separated by spaces.\n` +
      `\n` +
      `Output Format:\n` +
      `Line 1: the distinct remainders in increasing order, space separated.\n` +
      `Line 2: how many distinct remainders there are.\n` +
      `\n` +
      `Constraints:\n` +
      `1 <= k <= 100, 1 <= n <= 200, -10000 <= value <= 10000`,
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.sc,
    si1: "5 3\n1 2 3 4 5", so1: "0 1 2\n3",
    si2: "3 10\n10 20 30", so2: "0\n1",
    i1: "4 7\n14 21 28 35", o1: "0\n1",
    i2: "6 5\n0 1 2 3 4 5", o2: "0 1 2 3 4\n5",
    i3: "5 4\n-1 -2 -3 -4 9", o3: "0 1 2 3\n4",
    inputconstrains: "1 <= k <= 100, 1 <= n <= 200, -10000 <= value <= 10000",
    blacklist: ".add(, set(",
    whitelist: "for ",
    sourcecode: String.raw`n, k = map(int, input().split())
values = [int(x) for x in input().split()]
remainders = {v % k for v in values}
print(" ".join(str(r) for r in sorted(remainders)))
print(len(remainders))`,
  }),

  cq({
    title: "Transpose Grid Nested Comp",
    description:
      `A spreadsheet exporter needs the transpose of a numeric grid. Build it with a nested list comprehension (no .append, no zip): the outer comprehension walks the column indices, the inner one gathers each column.\n` +
      `\n` +
      `Input Format:\n` +
      `Line 1: r and c separated by a space.\n` +
      `Lines 2..r+1: each row with c integers separated by spaces.\n` +
      `\n` +
      `Output Format:\n` +
      `Print c lines: row j of the transposed matrix, values space separated.\n` +
      `\n` +
      `Constraints:\n` +
      `1 <= r, c <= 10, -99 <= value <= 99`,
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.nc,
    si1: "2 3\n1 2 3\n4 5 6", so1: "1 4\n2 5\n3 6",
    si2: "1 1\n7", so2: "7",
    i1: "3 2\n1 2\n3 4\n5 6", o1: "1 3 5\n2 4 6",
    i2: "2 2\n9 8\n7 6", o2: "9 7\n8 6",
    i3: "1 3\n10 20 30", o3: "10\n20\n30",
    inputconstrains: "1 <= r, c <= 10, -99 <= value <= 99",
    blacklist: ".append(, zip(",
    whitelist: "for ",
    sourcecode: String.raw`r, c = map(int, input().split())
grid = [[int(x) for x in input().split()] for _ in range(r)]
transposed = [[grid[i][j] for i in range(r)] for j in range(c)]
for row in transposed:
    print(" ".join(str(v) for v in row))`,
  }),

  cq({
    title: "Freezer Restock Dict Comp",
    description:
      `A freezer kitchen flags everything below the restock threshold. Build the low-stock table with a dictionary comprehension over the name/qty pairs keeping only quantities strictly below the threshold, then print it in insertion order. If nothing is low, print All stocked.\n` +
      `\n` +
      `Input Format:\n` +
      `Line 1: the integer n.\n` +
      `Line 2: the threshold t.\n` +
      `Lines 3..n+2: one item per line: name and quantity separated by a space.\n` +
      `\n` +
      `Output Format:\n` +
      `One line per low item in input order: the name, a space, the quantity. Or the single line All stocked.\n` +
      `\n` +
      `Constraints:\n` +
      `1 <= n <= 50, item names are distinct, 0 <= qty <= 500, 1 <= t <= 500`,
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.dc,
    si1: "3\n10\nmilk 4\neggs 12\njuice 7", so1: "milk 4\njuice 7",
    si2: "2\n5\nbread 9\ncheese 5", so2: "All stocked",
    i1: "1\n3\nice 1", o1: "ice 1",
    i2: "4\n20\npeas 3\ncorn 19\nbeans 20\nrice 8", o2: "peas 3\ncorn 19\nrice 8",
    i3: "3\n1\na 5\nb 5\nc 5", o3: "All stocked",
    inputconstrains: "1 <= n <= 50, 0 <= qty <= 500, 1 <= t <= 500",
    blacklist: ".append(, dict(",
    whitelist: "for , if ",
    sourcecode: String.raw`n = int(input())
threshold = int(input())
pairs = [input().split() for _ in range(n)]
low = {name: int(q) for name, q in pairs if int(q) < threshold}
if low:
    for name, q in low.items():
        print(name, q)
else:
    print("All stocked")`,
  }),

  // ---------------- hard ----------------
  cq({
    title: "Analytics Grid Dashboard",
    description:
      `A metrics dashboard renders a numeric grid entirely with comprehensions: row totals, column totals and the grand total. Build every aggregate with comprehensions only - no .append, no map, no filter. Row totals come from one comprehension over the rows; column totals from a nested comprehension that walks each column index.\n` +
      `\n` +
      `Input Format:\n` +
      `Line 1: r and c separated by a space.\n` +
      `Lines 2..r+1: each row with c integers separated by spaces.\n` +
      `\n` +
      `Output Format:\n` +
      `Line 1: the r row totals, space separated.\n` +
      `Line 2: the c column totals, space separated.\n` +
      `Line 3: the grand total.\n` +
      `\n` +
      `Constraints:\n` +
      `1 <= r, c <= 10, -100 <= value <= 100`,
    difficulty: "hard",
    variant: "scenario",
    subtopic: SUB.nc,
    si1: "2 3\n1 2 3\n4 5 6", so1: "6 15\n5 7 9\n21",
    si2: "1 1\n5", so2: "5\n5\n5",
    i1: "3 2\n1 1\n2 2\n3 3", o1: "2 4 6\n6 6\n12",
    i2: "2 2\n-1 2\n3 -4", o2: "1 -1\n2 -2\n0",
    i3: "2 4\n10 0 0 0\n0 10 0 0", o3: "10 10\n10 10 0 0\n20",
    inputconstrains: "1 <= r, c <= 10, -100 <= value <= 100",
    blacklist: ".append(, map(, filter(",
    whitelist: "for ",
    sourcecode: String.raw`r, c = [int(x) for x in input().split()]
grid = [[int(x) for x in input().split()] for _ in range(r)]
row_sums = [sum(row) for row in grid]
col_sums = [sum(grid[i][j] for i in range(r)) for j in range(c)]
print(" ".join(str(s) for s in row_sums))
print(" ".join(str(s) for s in col_sums))
print(sum(row_sums))`,
  }),

  cq({
    title: "Run Length Compression Report",
    description:
      `A telemetry linker compresses repeated symbols before transmission. Given a string, produce its run-length report: every maximal run of equal characters becomes one line with the character and its count. Build the runs with comprehensions only (no .append, no itertools.groupby): first collect the indices where a new run starts, then pair each start with its run length in a second comprehension.\n` +
      `\n` +
      `Input Format:\n` +
      `One line with the string (lowercase letters only, no spaces).\n` +
      `\n` +
      `Output Format:\n` +
      `One line per run, in order: the character, a space, its count.\n` +
      `\n` +
      `Constraints:\n` +
      `1 <= len(s) <= 1000, lowercase letters only`,
    difficulty: "hard",
    variant: "scenario",
    subtopic: SUB.lc,
    si1: "aaabb", so1: "a 3\nb 2",
    si2: "z", so2: "z 1",
    i1: "aabbaa", o1: "a 2\nb 2\na 2",
    i2: "wwww", o2: "w 4",
    i3: "abab", o3: "a 1\nb 1\na 1\nb 1",
    inputconstrains: "1 <= len(s) <= 1000, lowercase letters only",
    blacklist: ".append(, groupby(",
    whitelist: "for ",
    sourcecode: String.raw`s = input().strip()
starts = [0] + [i for i in range(1, len(s)) if s[i] != s[i - 1]]
pairs = [[s[i], (starts[j + 1] if j + 1 < len(starts) else len(s)) - i] for j, i in enumerate(starts)]
for ch, cnt in pairs:
    print(ch, cnt)`,
  }),

  cq({
    title: "Warehouse Inventory Diff Report",
    description:
      `A retail chain compares its warehouse stock with a store's stock. Read both inventories into dicts built by dictionary comprehensions (no dict() constructor, no .append), then report: the items that exist only in the warehouse (alphabetical, comma separated, or None), the items present in both whose quantity changed (alphabetical, one per line as the item and its signed change store minus warehouse), and the net change across those common items.\n` +
      `\n` +
      `Input Format:\n` +
      `Line 1: the integer n.\n` +
      `Lines 2..n+1: warehouse entries: item and quantity separated by a space.\n` +
      `Line n+2: the integer m.\n` +
      `Lines n+3..n+m+2: store entries: item and quantity separated by a space.\n` +
      `\n` +
      `Output Format:\n` +
      `Line 1: warehouse-only items alphabetically joined with ", ", or None.\n` +
      `Then one line per changed common item, alphabetically: item delta (e.g. bolt -10).\n` +
      `Last line: net X where X is the sum of the deltas.\n` +
      `\n` +
      `Constraints:\n` +
      `1 <= n, m <= 40, item names are distinct within each list, name length 1 to 12, 0 <= qty <= 10000`,
    difficulty: "hard",
    variant: "scenario",
    subtopic: SUB.dc,
    si1: "3\nbolt 50\nnut 20\nwasher 5\n2\nbolt 40\nnut 20", so1: "washer\nbolt -10\nnet -10",
    si2: "1\nbolt 5\n1\nbolt 5", so2: "None\nnet 0",
    i1: "2\nscrew 100\nanchor 8\n2\nscrew 120\nclip 30", o1: "anchor\nscrew 20\nnet 20",
    i2: "3\na 1\nb 2\nc 3\n3\nc 10\nb 5\nd 9", o2: "a\nb 3\nc 7\nnet 10",
    i3: "2\nx 5\ny 6\n3\ny 2\nz 1\nx 9", o3: "None\nx 4\ny -4\nnet 0",
    inputconstrains: "1 <= n, m <= 40, names distinct per list, 0 <= qty <= 10000",
    blacklist: ".append(, dict(",
    whitelist: "for ",
    sourcecode: String.raw`n = int(input())
warehouse = {name: int(q) for name, q in (input().split() for _ in range(n))}
m = int(input())
store = {name: int(q) for name, q in (input().split() for _ in range(m))}

only_warehouse = sorted(name for name in warehouse if name not in store)
changed = {
    name: int(store[name]) - int(warehouse[name])
    for name in warehouse
    if name in store and store[name] != warehouse[name]
}

print(", ".join(only_warehouse) if only_warehouse else "None")
for name in sorted(changed):
    print(f"{name} {changed[name]}")
print(f"net {sum(changed.values())}")`,
  }),

  cq({
    title: "Defect Bucket Matrix Comp",
    description:
      `A factory quality line sorts defect scores into four buckets: Low 0-39, Medium 40-69, High 70-89 and Critical 90-100. Build a 4-row membership matrix with a nested comprehension that uses an if/else expression - row i has a 1 in column j exactly when score j belongs to bucket i - then print each row and each bucket's total. No .append and no map allowed.\n` +
      `\n` +
      `Input Format:\n` +
      `Line 1: the integer n.\n` +
      `Line 2: n defect scores separated by spaces.\n` +
      `\n` +
      `Output Format:\n` +
      `Four lines: the membership rows for Low, Medium, High, Critical, values space separated.\n` +
      `Then one line: L:x M:y H:z C:w with the four bucket totals.\n` +
      `\n` +
      `Constraints:\n` +
      `1 <= n <= 100, 0 <= score <= 100`,
    difficulty: "hard",
    variant: "scenario",
    subtopic: SUB.clc,
    si1: "5\n10 45 75 95 60", so1: "1 0 0 0 0\n0 1 0 0 1\n0 0 1 0 0\n0 0 0 1 0\nL:1 M:2 H:1 C:1",
    si2: "1\n39", so2: "1\n0\n0\n0\nL:1 M:0 H:0 C:0",
    i1: "4\n0 40 70 90", o1: "1 0 0 0\n0 1 0 0\n0 0 1 0\n0 0 0 1\nL:1 M:1 H:1 C:1",
    i2: "3\n100 100 39", o2: "0 0 1\n0 0 0\n0 0 0\n1 1 0\nL:1 M:0 H:0 C:2",
    i3: "6\n20 85 45 39 40 69", o3: "1 0 0 1 0 0\n0 0 1 0 1 1\n0 1 0 0 0 0\n0 0 0 0 0 0\nL:2 M:3 H:1 C:0",
    inputconstrains: "1 <= n <= 100, 0 <= score <= 100",
    blacklist: ".append(, map(",
    whitelist: "if , else",
    sourcecode: String.raw`n = int(input())
scores = [int(x) for x in input().split()]
bounds = [(0, 39), (40, 69), (70, 89), (90, 100)]
matrix = [[1 if lo <= s <= hi else 0 for s in scores] for lo, hi in bounds]
for row in matrix:
    print(" ".join(str(v) for v in row))
labels = ["L", "M", "H", "C"]
totals = [sum(row) for row in matrix]
print(" ".join(f"{lab}:{t}" for lab, t in zip(labels, totals)))`,
  }),
];

/* ============================== MCQ QUESTIONS ============================== */

const mcqs = [
  mq({
    title: "Bracket For A List Comp",
    description: "Which snippet correctly builds a list of the cubes of 1..3 with a comprehension?",
    difficulty: "easy",
    subtopic: SUB.lc,
    options: [
      "[x**3 for x in range(1, 4)]",
      "{x**3 for x in range(1, 4)}",
      "(x**3 for x in range(1, 4))",
      "[x**3 if x in range(1, 4)]",
    ],
    correct: 1,
  }),
  mq({
    title: "Comprehension Clause Order",
    description: "What is the correct structure of a list comprehension that also filters?",
    difficulty: "easy",
    subtopic: SUB.lc,
    options: [
      "[expression for variable in iterable if condition]",
      "[for variable in iterable if condition expression]",
      "[if condition for variable in iterable expression]",
      "[expression if condition for variable in iterable]",
    ],
    correct: 1,
  }),
  mq({
    title: "Equivalent Loop Pairing",
    description: "Which ordinary loop produces the same list as the comprehension [x * 2 for x in nums]?",
    difficulty: "easy",
    subtopic: SUB.lc,
    options: [
      "result = [] then: for x in nums: result.append(x * 2)",
      "for x in nums: result = x * 2",
      "result = [] then: for x in nums: if x * 2: result.append(x)",
      "for x in nums: print(x * 2)",
    ],
    correct: 1,
  }),
  mq({
    title: "Braces Build A Set Comp",
    description: "What does the expression {x % 3 for x in [4, 5, 6]} evaluate to?",
    difficulty: "easy",
    subtopic: SUB.sc,
    options: [
      "A set, such as {0, 1, 2}",
      "A dictionary with three keys",
      "A list [1, 2, 0]",
      "A tuple of remainders",
    ],
    correct: 1,
  }),
  mq({
    title: "Dict Comp Colon Role",
    description: "In a dictionary comprehension, what does the colon between two expressions define?",
    difficulty: "easy",
    subtopic: SUB.dc,
    options: [
      "The key: value pair produced for each item",
      "A type annotation",
      "Slice bounds",
      "A default argument",
    ],
    correct: 1,
  }),
  mq({
    title: "Filter Position In Comp",
    description: "In [w for w in words if len(w) > 3], which words reach the result?",
    difficulty: "easy",
    subtopic: SUB.clc,
    options: [
      "Only the words longer than 3 characters",
      "All words, truncated to 3 characters",
      "Only the first 3 words",
      "Nothing - this is invalid syntax",
    ],
    correct: 1,
  }),
  mq({
    title: "Range Comp List Output",
    description: "What does this snippet print?",
    difficulty: "easy",
    subtopic: SUB.lc,
    options: ["[1, 2, 3]", "[1, 2, 3, 4]", "[0, 1, 2, 3]", "[1, 4]"],
    correct: 1,
    snippet: String.raw`print([i for i in range(1, 4)])`,
  }),
  mq({
    title: "Empty Filter Comp Output",
    description: "What does this snippet print?",
    difficulty: "easy",
    subtopic: SUB.clc,
    options: ["[]", "[6]", "None", "[0, 1, 2]"],
    correct: 1,
    snippet: String.raw`print([x for x in range(3) if x > 5])`,
  }),
  mq({
    title: "Parentheses Make A Generator",
    description: "What does the expression (x * x for x in range(5)) create?",
    difficulty: "easy",
    subtopic: SUB.lc,
    options: [
      "A list of five squares",
      "A set of squares",
      "A generator that yields the squares lazily",
      "A tuple of squares",
    ],
    correct: 3,
  }),
  mq({
    title: "Comp Builds New List",
    description: "After running doubled = [x for x in nums], which statement is true?",
    difficulty: "easy",
    subtopic: SUB.lc,
    options: [
      "doubled and nums are the same list object",
      "doubled is a new list; changing it never changes nums",
      "doubled is a live view that updates when nums changes",
      "doubled is an immutable tuple copy",
    ],
    correct: 2,
  }),
  mq({
    title: "Odd Squares Comp Output",
    description: "What does this snippet print?",
    difficulty: "medium",
    subtopic: SUB.clc,
    options: ["[1, 9, 25]", "[1, 4, 9, 16, 25]", "[4, 16]", "[1, 3, 5]"],
    correct: 1,
    snippet: String.raw`print([x * x for x in range(1, 6) if x % 2 == 1])`,
  }),
  mq({
    title: "Duplicate Keys Dict Comp Output",
    description: "What does this snippet print?",
    difficulty: "medium",
    subtopic: SUB.dc,
    options: [
      "{'a': 3, 'b': 2}",
      "{'a': 1, 'b': 2}",
      "{'a': 3, 'b': 2, 'a': 1}",
      "{'a': 1, 'b': 2, 'a': 3}",
    ],
    correct: 1,
    snippet: String.raw`print({k: v for k, v in [("a", 1), ("b", 2), ("a", 3)]})`,
  }),
  mq({
    title: "Even Odd Verdict Comp Output",
    description: "What does this snippet print?",
    difficulty: "medium",
    subtopic: SUB.clc,
    options: [
      "['odd', 'even', 'odd']",
      "['even', 'odd']",
      "['odd', 'even']",
      "[1, 2, 3]",
    ],
    correct: 1,
    snippet: String.raw`print(["even" if n % 2 == 0 else "odd" for n in [1, 2, 3]])`,
  }),
  mq({
    title: "Flatten Pair Comp Output",
    description: "What does this snippet print?",
    difficulty: "medium",
    subtopic: SUB.nc,
    options: ["[1, 2, 3, 4]", "[[1, 2], [3, 4]]", "[1, 3]", "[(1, 2), (3, 4)]"],
    correct: 1,
    snippet: String.raw`print([x for row in [[1, 2], [3, 4]] for x in row])`,
  }),
  mq({
    title: "Set Comp Dedupe Purpose",
    description: "tags = [\"sale\", \"flash\", \"sale\"]. What is the most direct one-line comprehension to collect the distinct tags, and which property does that result lack?",
    difficulty: "medium",
    subtopic: SUB.sc,
    options: [
      "{t for t in tags}; the result is a set, so it has no defined order",
      "[t for t in tags]; it removes duplicates automatically",
      "{t: t for t in tags}; the result keeps the original tag order",
      "(t for t in tags); it materializes all unique tags at once",
    ],
    correct: 1,
  }),
  mq({
    title: "If Without Else Filters",
    description: "How does [x for x in data if x > 0] differ from [x if x > 0 else 0 for x in data]?",
    difficulty: "medium",
    subtopic: SUB.clc,
    options: [
      "The first keeps only the positive values; the second keeps every element, replacing negatives with 0",
      "They are equivalent",
      "The first replaces negatives with 0; the second drops them",
      "The first is invalid syntax",
    ],
    correct: 1,
  }),
  mq({
    title: "Transpose Comp Output",
    description: "What does this snippet print?",
    difficulty: "hard",
    subtopic: SUB.nc,
    options: [
      "[[1, 4], [2, 5], [3, 6]]",
      "[[1, 2, 3], [4, 5, 6]]",
      "[1, 2, 3, 4, 5, 6]",
      "[[1, 2], [3, 4], [5, 6]]",
    ],
    correct: 1,
    snippet: String.raw`m = [[1, 2, 3], [4, 5, 6]]
print([[row[j] for row in m] for j in range(3)])`,
  }),
  mq({
    title: "Stacked Ifs Comp Output",
    description: "A comprehension can carry several if clauses in a row. What does this snippet print?",
    difficulty: "hard",
    subtopic: SUB.clc,
    options: ["[0, 6, 12, 18]", "[0, 2, 6, 12, 18]", "[6, 12, 18]", "[0, 3, 6, 9, 12, 15, 18]"],
    correct: 1,
    snippet: String.raw`print([x for x in range(20) if x % 2 == 0 if x % 3 == 0])`,
  }),
  mq({
    title: "Exhausted Generator Sum",
    description: "What does this snippet print? (A generator expression can be consumed only once.)",
    difficulty: "hard",
    subtopic: SUB.lc,
    options: ["3", "6", "5", "0"],
    correct: 1,
    snippet: String.raw`g = (x for x in range(3))
print(sum(g) + sum(g))`,
  }),
  mq({
    title: "Row Shape Vs Flatten Comp",
    description: "matrix = [[1, 2], [3, 4]]. Which statement about the two expressions A: [[x for x in row] for row in matrix] and B: [x for row in matrix for x in row] is correct?",
    difficulty: "hard",
    subtopic: SUB.nc,
    options: [
      "A produces [[1, 2], [3, 4]]; B produces [1, 2, 3, 4]",
      "Both produce [1, 2, 3, 4]",
      "A produces [1, 2, 3, 4]; B produces [[1, 2], [3, 4]]",
      "Both produce [[1, 2], [3, 4]]",
    ],
    correct: 1,
  }),
];

/* ================================ WRITE OUT ================================ */

writeFileSync(`${DIR}/day-12.code.json`, JSON.stringify({ day: 12, topics: [{ name: TOPIC_NAME, subtopics: Object.values(SUB) }], questions }, null, 2));
writeFileSync(`${DIR}/day-12.mcq.json`, JSON.stringify({ day: 12, questions: mcqs }, null, 2));
console.log("wrote day 12:", questions.length, "code,", mcqs.length, "mcq");
