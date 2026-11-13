/**
 * Builder for day 11 — "Modules and Packages" (20 code + 20 MCQ).
 * Run: bun scripts/python-programming/builders/build-day-11.ts
 */
import { mkdirSync, writeFileSync } from "node:fs";

const DIR = "/home/z/my-project/scripts/python-programming/data";
mkdirSync(DIR, { recursive: true });

const TOPIC_NAME = "Modules and Packages";
const SUB = {
  cim: "Creating and Importing Modules",
  slm: "Standard Library Modules",
  nv: "The __name__ Variable",
  psp: "Packages and Module Search Path",
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
    title: "Hypotenuse With Math Import",
    description:
      `Your geometry app needs roof-slope lengths. Import the standard-library math module and use math.hypot to compute the hypotenuse of a right triangle from its two perpendicular side lengths.\n` +
      `\n` +
      `Input Format:\n` +
      `One line with two floats a and b separated by a space (the two legs).\n` +
      `\n` +
      `Output Format:\n` +
      `Print math.hypot(a, b) formatted to exactly 2 decimal places.\n` +
      `\n` +
      `Constraints:\n` +
      `0 <= a, b <= 1000`,
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.slm,
    si1: "3 4", so1: "5.00",
    si2: "1 1", so2: "1.41",
    i1: "8 15", o1: "17.00",
    i2: "0.5 0.5", o2: "0.71",
    i3: "0 7", o3: "7.00",
    inputconstrains: "0 <= a, b <= 1000",
    sourcecode: String.raw`import math

a, b = map(float, input().split())
print(f"{math.hypot(a, b):.2f}")`,
  }),

  cq({
    title: "Greatest Common Divisor Drill",
    description:
      `Practice calling into an imported module. Read two integers and print their greatest common divisor using math.gcd from the math module.\n` +
      `\n` +
      `Input Format:\n` +
      `One line with two integers a and b separated by a space.\n` +
      `\n` +
      `Output Format:\n` +
      `Print math.gcd(a, b).\n` +
      `\n` +
      `Constraints:\n` +
      `0 <= a, b <= 1000000 and a + b > 0`,
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.slm,
    si1: "12 18", so1: "6",
    si2: "7 13", so2: "1",
    i1: "100 75", o1: "25",
    i2: "0 5", o2: "5",
    i3: "36 60", o3: "12",
    inputconstrains: "0 <= a, b <= 1000000, a + b > 0",
    sourcecode: String.raw`import math

a, b = map(int, input().split())
print(math.gcd(a, b))`,
  }),

  cq({
    title: "Factorial From Math Module",
    description:
      `A quiz generator needs factorials. Import the math module and print math.factorial(n) for the given n. Note that math.factorial(0) returns 1.\n` +
      `\n` +
      `Input Format:\n` +
      `One line with the integer n.\n` +
      `\n` +
      `Output Format:\n` +
      `Print math.factorial(n).\n` +
      `\n` +
      `Constraints:\n` +
      `0 <= n <= 15`,
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.cim,
    si1: "5", so1: "120",
    si2: "0", so2: "1",
    i1: "1", o1: "1",
    i2: "8", o2: "40320",
    i3: "10", o3: "3628800",
    inputconstrains: "0 <= n <= 15",
    sourcecode: String.raw`import math

n = int(input())
print(math.factorial(n))`,
  }),

  cq({
    title: "Seeded Coin Flip Sequence",
    description:
      `A board-game simulator needs reproducible coin tosses, so it seeds Python's random module with a fixed seed before flipping. Read a seed and a count, call random.seed(seed), then generate k values with random.randint(1, 2) (1 means heads, 2 means tails).\n` +
      `\n` +
      `Input Format:\n` +
      `One line with two integers: seed and k.\n` +
      `\n` +
      `Output Format:\n` +
      `Print k letters H or T (one per flip) separated by single spaces, in generation order.\n` +
      `\n` +
      `Constraints:\n` +
      `0 <= seed <= 10000, 1 <= k <= 50`,
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.cim,
    si1: "7 8", so1: "T H T H H H T H",
    si2: "42 5", so2: "H H T H H",
    i1: "0 6", o1: "T T H T T T",
    i2: "1 7", o2: "H H T H T T T",
    i3: "2024 9", o3: "T H T H T T H T T",
    inputconstrains: "0 <= seed <= 10000, 1 <= k <= 50",
    sourcecode: String.raw`import random

seed, k = map(int, input().split())
random.seed(seed)
flips = []
for _ in range(k):
    r = random.randint(1, 2)
    flips.append("H" if r == 1 else "T")
print(" ".join(flips))`,
  }),

  cq({
    title: "Circle Area With Math Pi",
    description:
      `A laser-cutter planner estimates disc areas. Import math and compute the area of a circle of radius r using math.pi, printing the result with 2 decimal places.\n` +
      `\n` +
      `Input Format:\n` +
      `One line with the float r.\n` +
      `\n` +
      `Output Format:\n` +
      `Print math.pi * r * r formatted to exactly 2 decimal places.\n` +
      `\n` +
      `Constraints:\n` +
      `0 <= r <= 1000`,
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.slm,
    si1: "2", so1: "12.57",
    si2: "1", so2: "3.14",
    i1: "0.5", o1: "0.79",
    i2: "10", o2: "314.16",
    i3: "3.5", o3: "38.48",
    inputconstrains: "0 <= r <= 1000",
    sourcecode: String.raw`import math

r = float(input())
print(f"{math.pi * r * r:.2f}")`,
  }),

  cq({
    title: "Main Guard Greeter Drill",
    description:
      `Emulate a tiny greeting module. Define a function greet(name) that returns the text Hello, <name>! and place the actual work under the standard if __name__ == "__main__": guard so the file behaves like a proper script. The name arrives on stdin.\n` +
      `\n` +
      `Input Format:\n` +
      `One line with the name (no spaces).\n` +
      `\n` +
      `Output Format:\n` +
      `Print greet(name) exactly, e.g. Hello, Ada!\n` +
      `\n` +
      `Constraints:\n` +
      `1 <= len(name) <= 50, name has no spaces`,
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.nv,
    si1: "Ada", so1: "Hello, Ada!",
    si2: "Grace", so2: "Hello, Grace!",
    i1: "Linus", o1: "Hello, Linus!",
    i2: "Atom", o2: "Hello, Atom!",
    i3: "Py", o3: "Hello, Py!",
    inputconstrains: "1 <= len(name) <= 50, no spaces",
    sourcecode: String.raw`def greet(name):
    return f"Hello, {name}!"


if __name__ == "__main__":
    print(greet(input()))`,
  }),

  // ---------------- easy: scenario ----------------
  cq({
    title: "Sensor Batch Mean Check",
    description:
      `A greenhouse controller batches temperature readings and asks the statistics module for the batch mean. Read n and then n values, and report statistics.mean of the batch.\n` +
      `\n` +
      `Input Format:\n` +
      `Line 1: the integer n.\n` +
      `Line 2: n space-separated floats.\n` +
      `\n` +
      `Output Format:\n` +
      `Print the mean formatted to exactly 2 decimal places.\n` +
      `\n` +
      `Constraints:\n` +
      `1 <= n <= 100, 0 <= value <= 10000`,
    difficulty: "easy",
    variant: "scenario",
    subtopic: SUB.slm,
    si1: "4\n10.0 20.0 30.0 40.0", so1: "25.00",
    si2: "3\n1.5 2.5 2.0", so2: "2.00",
    i1: "5\n1 2 3 4 5", o1: "3.00",
    i2: "2\n0.1 0.2", o2: "0.15",
    i3: "1\n7.25", o3: "7.25",
    inputconstrains: "1 <= n <= 100, 0 <= value <= 10000",
    sourcecode: String.raw`import statistics

n = int(input())
values = [float(x) for x in input().split()]
print(f"{statistics.mean(values):.2f}")`,
  }),

  cq({
    title: "Friday The Thirteenth Finder",
    description:
      `An event planner avoids scheduling launches on spooky dates. Using the calendar module, decide whether the given month contains a Friday the 13th. calendar.weekday(year, month, day) returns 0 for Monday through 6 for Sunday, so Friday is weekday 4.\n` +
      `\n` +
      `Input Format:\n` +
      `One line with two integers: year and month.\n` +
      `\n` +
      `Output Format:\n` +
      `Print Yes if the 13th of that month falls on a Friday, otherwise print No.\n` +
      `\n` +
      `Constraints:\n` +
      `2000 <= year <= 2100, 1 <= month <= 12`,
    difficulty: "easy",
    variant: "scenario",
    subtopic: SUB.slm,
    si1: "2024 9", so1: "Yes",
    si2: "2024 8", so2: "No",
    i1: "2025 6", o1: "Yes",
    i2: "2023 1", o2: "Yes",
    i3: "2020 2", o3: "No",
    inputconstrains: "2000 <= year <= 2100, 1 <= month <= 12",
    sourcecode: String.raw`import calendar

year, month = map(int, input().split())
weekday = calendar.weekday(year, month, 13)
print("Yes" if weekday == 4 else "No")`,
  }),

  cq({
    title: "Asset Path Assembler",
    description:
      `A game build pipeline stores every asset under a base folder. Assemble the full asset location with os.path.join instead of gluing strings together by hand: read a base folder, a subfolder and a filename on three lines, and print the joined path.\n` +
      `\n` +
      `Input Format:\n` +
      `Line 1: base folder.\n` +
      `Line 2: subfolder.\n` +
      `Line 3: filename.\n` +
      `\n` +
      `Output Format:\n` +
      `Print os.path.join(base, subfolder, filename).\n` +
      `\n` +
      `Constraints:\n` +
      `each line has length 1 to 60 and contains no leading slash`,
    difficulty: "easy",
    variant: "scenario",
    subtopic: SUB.psp,
    si1: "assets\nsprites\nhero.png", so1: "assets/sprites/hero.png",
    si2: "var/log\napp\ncore.txt", so2: "var/log/app/core.txt",
    i1: "/srv/www\nicons\nlogo.svg", o1: "/srv/www/icons/logo.svg",
    i2: "build\ncss\nmain.css", o2: "build/css/main.css",
    i3: "opt\ndata\ndb.sqlite3", o3: "opt/data/db.sqlite3",
    inputconstrains: "line length 1..60, no leading slash",
    sourcecode: String.raw`import os

base = input()
folder = input()
filename = input()
print(os.path.join(base, folder, filename))`,
  }),

  cq({
    title: "Median Clinic Wait Report",
    description:
      `A clinic reviews yesterday's waiting times and wants the median, which is less skewed by one extreme patient. Read n and the n waiting times, and report statistics.median of the list.\n` +
      `\n` +
      `Input Format:\n` +
      `Line 1: the integer n.\n` +
      `Line 2: n space-separated integers (minutes).\n` +
      `\n` +
      `Output Format:\n` +
      `Print the median formatted to exactly 2 decimal places.\n` +
      `\n` +
      `Constraints:\n` +
      `1 <= n <= 100, 1 <= minute <= 10000`,
    difficulty: "easy",
    variant: "scenario",
    subtopic: SUB.slm,
    si1: "5\n12 7 9 20 15", so1: "12.00",
    si2: "4\n10 20 30 40", so2: "25.00",
    i1: "3\n5 1 9", o1: "5.00",
    i2: "6\n3 3 4 9 8 2", o2: "3.50",
    i3: "1\n42", o3: "42.00",
    inputconstrains: "1 <= n <= 100, 1 <= minute <= 10000",
    sourcecode: String.raw`import statistics

n = int(input())
minutes = [int(x) for x in input().split()]
print(f"{statistics.median(minutes):.2f}")`,
  }),

  // ---------------- medium ----------------
  cq({
    title: "Lucky Draw Session Audit",
    description:
      `Your game studio runs a deterministic lucky-draw simulator to balance loot tables. It seeds Python's random module with a fixed seed, draws k integers in the range 1..100 with random.randint, then audits the session.\n` +
      `\n` +
      `Input Format:\n` +
      `One line with three integers: seed k threshold.\n` +
      `\n` +
      `Output Format:\n` +
      `Line 1: the k drawn numbers in generation order, space separated.\n` +
      `Line 2: how many draws were greater than or equal to threshold.\n` +
      `Line 3: the highest drawn number.\n` +
      `Line 4: how many distinct values were drawn.\n` +
      `\n` +
      `Constraints:\n` +
      `0 <= seed <= 10000, 3 <= k <= 60, 1 <= threshold <= 100`,
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.cim,
    si1: "42 12 80", so1: "82 15 4 95 36 32 29 18 95 14 87 95\n5\n95\n10",
    si2: "7 10 90", so2: "42 20 51 84 7 10 69 13 47 75\n0\n84\n10",
    i1: "0 15 95", o1: "50 98 54 6 34 66 63 52 39 62 46 75 28 65 18\n1\n98\n15",
    i2: "99 8 50", o2: "52 49 26 77 23 30 32 18\n2\n77\n8",
    i3: "5 6 70", o3: "80 33 95 46 89 95\n4\n95\n5",
    inputconstrains: "0 <= seed <= 10000, 3 <= k <= 60, 1 <= threshold <= 100",
    blacklist: "max(, Counter(",
    whitelist: "import random, random.seed",
    sourcecode: String.raw`import random

seed, k, threshold = map(int, input().split())
random.seed(seed)
draws = []
for _ in range(k):
    draws.append(random.randint(1, 100))

top = draws[0]
jackpots = 0
for d in draws:
    if d > top:
        top = d
    if d >= threshold:
        jackpots += 1

distinct = []
for d in draws:
    if d not in distinct:
        distinct.append(d)

print(" ".join(str(d) for d in draws))
print(jackpots)
print(top)
print(len(distinct))`,
  }),

  cq({
    title: "Statistics Bureau Report",
    description:
      `The city statistics bureau summarizes survey batches. Use the statistics module (not hand-written formulas) to report the mean, median and sample standard deviation of a batch of measurements.\n` +
      `\n` +
      `Input Format:\n` +
      `Line 1: the integer n.\n` +
      `Line 2: n space-separated floats.\n` +
      `\n` +
      `Output Format:\n` +
      `Line 1: statistics.mean formatted to 2 decimal places.\n` +
      `Line 2: statistics.median formatted to 2 decimal places.\n` +
      `Line 3: statistics.stdev formatted to 2 decimal places.\n` +
      `\n` +
      `Constraints:\n` +
      `2 <= n <= 100, 0 <= value <= 100000`,
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.slm,
    si1: "4\n2 4 4 4", so1: "3.50\n4.00\n1.00",
    si2: "5\n10 20 30 40 50", so2: "30.00\n30.00\n15.81",
    i1: "2\n1 2", o1: "1.50\n1.50\n0.71",
    i2: "6\n8 8 8 8 8 8", o2: "8.00\n8.00\n0.00",
    i3: "3\n1.5 2.5 3.5", o3: "2.50\n2.50\n1.00",
    inputconstrains: "2 <= n <= 100, 0 <= value <= 100000",
    blacklist: "def mean, def stdev",
    whitelist: "statistics.mean, statistics.stdev",
    sourcecode: String.raw`import statistics

n = int(input())
values = [float(x) for x in input().split()]
print(f"{statistics.mean(values):.2f}")
print(f"{statistics.median(values):.2f}")
print(f"{statistics.stdev(values):.2f}")`,
  }),

  cq({
    title: "Guarded Converter Command Deck",
    description:
      `A weather dashboard ships a temperature module. Emulate it in a single file: define the conversion functions celsius_to_fahrenheit, fahrenheit_to_celsius and celsius_to_kelvin at module level, register them in a dict, and run the whole command handling under if __name__ == "__main__": so importing the file would only expose the functions.\n` +
      `\n` +
      `Input Format:\n` +
      `Line 1: the command, one of c2f, f2c, c2k.\n` +
      `Line 2: the value as a float.\n` +
      `\n` +
      `Output Format:\n` +
      `Print the converted value formatted to exactly 2 decimal places. c2f: c*9/5+32; f2c: (f-32)*5/9; c2k: c+273.15.\n` +
      `\n` +
      `Constraints:\n` +
      `command is one of c2f, f2c, c2k; -1000 <= value <= 1000`,
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.nv,
    si1: "c2f\n100", so1: "212.00",
    si2: "f2c\n32", so2: "0.00",
    i1: "c2k\n25", o1: "298.15",
    i2: "f2c\n212", o2: "100.00",
    i3: "c2f\n-40", o3: "-40.00",
    inputconstrains: "command in c2f/f2c/c2k, -1000 <= value <= 1000",
    blacklist: "argv, eval(, exec(",
    whitelist: "__name__, __main__",
    sourcecode: String.raw`def celsius_to_fahrenheit(c):
    return c * 9 / 5 + 32


def fahrenheit_to_celsius(f):
    return (f - 32) * 5 / 9


def celsius_to_kelvin(c):
    return c + 273.15


CONVERTERS = {
    "c2f": celsius_to_fahrenheit,
    "f2c": fahrenheit_to_celsius,
    "c2k": celsius_to_kelvin,
}

if __name__ == "__main__":
    command = input().strip()
    value = float(input())
    print(f"{CONVERTERS[command](value):.2f}")`,
  }),

  cq({
    title: "Splitext Asset Probe",
    description:
      `An asset pipeline reads path fragments and inspects the assembled file. Assemble the path with os.path.join from the given parts, then report the file name (os.path.basename) and its extension (os.path.splitext, printed without the leading dot, or none when there is no extension).\n` +
      `\n` +
      `Input Format:\n` +
      `Line 1: the integer n (number of path parts).\n` +
      `Lines 2..n+1: one path part per line, in order.\n` +
      `\n` +
      `Output Format:\n` +
      `Line 1: the full joined path.\n` +
      `Line 2: the base name of the file.\n` +
      `Line 3: the extension without a dot, or none.\n` +
      `\n` +
      `Constraints:\n` +
      `1 <= n <= 5, each part has length 1 to 40`,
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.psp,
    si1: "3\nassets\nimg\nlogo.png", so1: "assets/img/logo.png\nlogo.png\npng",
    si2: "2\narchive\ndump", so2: "archive/dump\ndump\nnone",
    i1: "1\nreadme.md", o1: "readme.md\nreadme.md\nmd",
    i2: "4\na\nb\nc\nd.tar.gz", o2: "a/b/c/d.tar.gz\nd.tar.gz\ngz",
    i3: "3\n/srv/app\nconfig\napp.yaml", o3: "/srv/app/config/app.yaml\napp.yaml\nyaml",
    inputconstrains: "1 <= n <= 5, part length 1..40",
    blacklist: "rsplit(, .rfind(",
    whitelist: "os.path.join, os.path.splitext",
    sourcecode: String.raw`import os

n = int(input())
parts = [input() for _ in range(n)]
full = os.path.join(*parts)
print(full)
print(os.path.basename(full))
ext = os.path.splitext(full)[1]
print(ext[1:] if ext else "none")`,
  }),

  cq({
    title: "Monthrange First Day Report",
    description:
      `A scheduling tool needs each month's length and the weekday of its first day. Use calendar.monthrange(year, month) for the number of days and calendar.weekday(year, month, 1) for the first day (0 is Monday). No datetime objects allowed in this drill.\n` +
      `\n` +
      `Input Format:\n` +
      `One line with two integers: year and month.\n` +
      `\n` +
      `Output Format:\n` +
      `Line 1: the number of days in the month.\n` +
      `Line 2: the English weekday name of the 1st: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday or Sunday.\n` +
      `\n` +
      `Constraints:\n` +
      `2000 <= year <= 2100, 1 <= month <= 12`,
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.slm,
    si1: "2024 2", so1: "29\nThursday",
    si2: "2023 1", so2: "31\nSunday",
    i1: "2024 1", o1: "31\nMonday",
    i2: "2000 2", o2: "29\nTuesday",
    i3: "2100 2", o3: "28\nMonday",
    inputconstrains: "2000 <= year <= 2100, 1 <= month <= 12",
    blacklist: "datetime",
    whitelist: "calendar.monthrange",
    sourcecode: String.raw`import calendar

year, month = map(int, input().split())
days = calendar.monthrange(year, month)[1]
names = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
first = calendar.weekday(year, month, 1)
print(days)
print(names[first])`,
  }),

  cq({
    title: "Stdin Log Line Digest",
    description:
      `A build tool swallows an entire pasted build log from standard input before producing one digest. Read every line with sys.stdin (do not use input()), then report the number of log entries, the total number of characters excluding newlines, and the length of the longest line.\n` +
      `\n` +
      `Input Format:\n` +
      `One or more lines of log text on stdin.\n` +
      `\n` +
      `Output Format:\n` +
      `Line 1: number of lines.\n` +
      `Line 2: total characters across all lines, excluding newline characters.\n` +
      `Line 3: length of the longest line.\n` +
      `\n` +
      `Constraints:\n` +
      `1 <= lines <= 50, each line has length 1 to 80`,
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.slm,
    si1: "build ok", so1: "1\n8\n8",
    si2: "step 1 done\nstep 2 failed", so2: "2\n24\n13",
    i1: "a\nbb\nccc", o1: "3\n6\n3",
    i2: "single", o2: "1\n6\n6",
    i3: "deploy\ntest\nlint\nship", o3: "4\n18\n6",
    inputconstrains: "1 <= lines <= 50, line length 1..80",
    blacklist: "input(, open(",
    whitelist: "sys.stdin",
    sourcecode: String.raw`import sys

lines = sys.stdin.read().splitlines()
total = 0
longest = 0
for line in lines:
    total += len(line)
    if len(line) > longest:
        longest = len(line)
print(len(lines))
print(total)
print(longest)`,
  }),

  // ---------------- hard ----------------
  cq({
    title: "Seeded Dice Streak Ledger",
    description:
      `A casino hardware lab stress-tests dice with a deterministic thrower. Seed Python's random module with the given seed, roll a six-sided die k times using random.randint(1, 6), then produce a full audit of the session.\n` +
      `\n` +
      `Input Format:\n` +
      `One line with two integers: seed and k.\n` +
      `\n` +
      `Output Format:\n` +
      `Line 1: six counts space separated, one per face from 1 to 6.\n` +
      `Line 2: the length of the longest run of identical consecutive rolls.\n` +
      `Line 3: the most frequent face; if several faces tie, print the smallest face.\n` +
      `Line 4: how many adjacent pairs of rolls were equal.\n` +
      `\n` +
      `Constraints:\n` +
      `0 <= seed <= 10000, 5 <= k <= 500`,
    difficulty: "hard",
    variant: "scenario",
    subtopic: SUB.cim,
    si1: "7 12", so1: "4 1 2 1 3 1\n2\n1\n1",
    si2: "42 10", so2: "3 3 1 0 0 3\n3\n1\n3",
    i1: "0 15", o1: "1 2 4 5 3 0\n2\n4\n2",
    i2: "99 8", o2: "0 5 0 2 1 0\n4\n2\n4",
    i3: "2024 20", o3: "0 3 3 4 4 6\n2\n6\n1",
    inputconstrains: "0 <= seed <= 10000, 5 <= k <= 500",
    blacklist: "Counter(, .most_common(, max(",
    whitelist: "random.seed",
    sourcecode: String.raw`import random

seed, k = map(int, input().split())
random.seed(seed)

rolls = []
for _ in range(k):
    rolls.append(random.randint(1, 6))

counts = [0] * 7
for face in rolls:
    counts[face] += 1

streak = 1
best_streak = 1
for i in range(1, k):
    if rolls[i] == rolls[i - 1]:
        streak += 1
        if streak > best_streak:
            best_streak = streak
    else:
        streak = 1

pairs = 0
for i in range(1, k):
    if rolls[i] == rolls[i - 1]:
        pairs += 1

best_face, best_count = 0, -1
for face in range(1, 7):
    if counts[face] > best_count:
        best_face, best_count = face, counts[face]

print(" ".join(str(c) for c in counts[1:]))
print(best_streak)
print(best_face)
print(pairs)`,
  }),

  cq({
    title: "Geometry Toolbox Suite",
    description:
      `A CAD plug-in exposes a geometry toolbox of module-level functions. Implement circle_area(r) as math.pi * r * r, triangle_area(a, b, c) with Heron's formula via math.sqrt, and distance(x1, y1, x2, y2) with math.hypot, then process the incoming commands under an if __name__ == "__main__": guard. A triangle whose sides are non-positive or violate the triangle inequality must report Invalid triangle instead of a number.\n` +
      `\n` +
      `Input Format:\n` +
      `Line 1: the integer n (number of commands).\n` +
      `Lines 2..n+1: one command per line, either circle r, tri a b c or dist x1 y1 x2 y2 (all numbers are floats).\n` +
      `\n` +
      `Output Format:\n` +
      `One line per command, in order: the result formatted to exactly 2 decimal places, or the exact text Invalid triangle.\n` +
      `\n` +
      `Constraints:\n` +
      `1 <= n <= 20; 0 <= r <= 100; 0 <= side <= 100; -100 <= coordinate <= 100`,
    difficulty: "hard",
    variant: "scenario",
    subtopic: SUB.slm,
    si1: "3\ncircle 2\ntri 3 4 5\ndist 0 0 3 4", so1: "12.57\n6.00\n5.00",
    si2: "2\ntri 1 2 8\ncircle 1", so2: "Invalid triangle\n3.14",
    i1: "4\ndist 1 1 1 1\ncircle 0\ntri 5 5 5\ndist -1 -1 1 1", o1: "0.00\n0.00\n10.83\n2.83",
    i2: "3\ntri 2 2 4\ntri 2 2 5\ncircle 3.5", o2: "Invalid triangle\nInvalid triangle\n38.48",
    i3: "5\ncircle 10\ntri 6 8 10\ndist 0 0 0 9\ntri 1 1 1\ncircle 0.1", o3: "314.16\n24.00\n9.00\n0.43\n0.03",
    inputconstrains: "1 <= n <= 20, values within stated ranges",
    blacklist: "eval(, exec(",
    whitelist: "math.sqrt",
    sourcecode: String.raw`import math


def circle_area(r):
    return math.pi * r * r


def triangle_area(a, b, c):
    if a <= 0 or b <= 0 or c <= 0:
        return None
    if a + b <= c or a + c <= b or b + c <= a:
        return None
    s = (a + b + c) / 2
    return math.sqrt(s * (s - a) * (s - b) * (s - c))


def distance(x1, y1, x2, y2):
    return math.hypot(x2 - x1, y2 - y1)


if __name__ == "__main__":
    n = int(input())
    for _ in range(n):
        parts = input().split()
        cmd = parts[0]
        args = [float(x) for x in parts[1:]]
        if cmd == "circle":
            print(f"{circle_area(args[0]):.2f}")
        elif cmd == "tri":
            area = triangle_area(args[0], args[1], args[2])
            if area is None:
                print("Invalid triangle")
            else:
                print(f"{area:.2f}")
        elif cmd == "dist":
            print(f"{distance(*args):.2f}")`,
  }),

  cq({
    title: "Guarded Text Toolkit CLI",
    description:
      `A text-processing package is emulated in one file. Define the functions shout (upper case), whisper (lower case), mirror (reverse the text) and repeat (text repeated k times) at module level, wire them into a command table, and run the command loop under if __name__ == "__main__":. Commands arrive as lines; a command word not in the table prints Unknown command. Only shout, whisper and mirror take the remainder of the line as their text; repeat takes a word and an integer count separated by a space.\n` +
      `\n` +
      `Input Format:\n` +
      `Line 1: the integer n (number of commands).\n` +
      `Lines 2..n+1: one command per line, e.g. shout hello world or repeat ab 3.\n` +
      `\n` +
      `Output Format:\n` +
      `One line per command with its result, or Unknown command. After all commands print ok X bad Y where X counts successful commands and Y counts unknown ones.\n` +
      `\n` +
      `Constraints:\n` +
      `1 <= n <= 20; text length 1 to 60; repeat count 0 <= k <= 9`,
    difficulty: "hard",
    variant: "scenario",
    subtopic: SUB.nv,
    si1: "4\nshout hello world\nmirror racecar\nrepeat ab 3\njump x", so1: "HELLO WORLD\nracecar\nababab\nUnknown command\nok 3 bad 1",
    si2: "2\nshout solo\nbogus", so2: "SOLO\nUnknown command\nok 1 bad 1",
    i1: "3\nwhisper AAA BBB\nmirror a\nrepeat x 0", o1: "aaa bbb\na\n\nok 3 bad 0",
    i2: "3\nrepeat ab 2\nmirror level\nshout Py ThOn", o2: "abab\nlevel\nPY THON\nok 3 bad 0",
    i3: "1\nfly 9", o3: "Unknown command\nok 0 bad 1",
    inputconstrains: "1 <= n <= 20, text length 1..60, repeat k 0..9",
    blacklist: "argv, eval(, exec(",
    whitelist: "__name__, __main__",
    sourcecode: String.raw`def shout(text):
    return text.upper()


def whisper(text):
    return text.lower()


def mirror(text):
    return text[::-1]


def repeat(text, times):
    return text * times


COMMANDS = {"shout": shout, "whisper": whisper, "mirror": mirror, "repeat": repeat}

if __name__ == "__main__":
    n = int(input())
    good = 0
    bad = 0
    for _ in range(n):
        line = input()
        name, _, rest = line.partition(" ")
        if name in COMMANDS:
            good += 1
            if name == "repeat":
                word, times = rest.rsplit(" ", 1)
                print(COMMANDS[name](word, int(times)))
            else:
                print(COMMANDS[name](rest))
        else:
            bad += 1
            print("Unknown command")
    print(f"ok {good} bad {bad}")`,
  }),

  cq({
    title: "Asset Pipeline Manifest Audit",
    description:
      `A release pipeline audits its manifest. Read the base folder and then n asset names. For each asset, join it onto the base with os.path.join and classify it by extension using os.path.splitext: extensions py, js, ts are code; json, csv, yaml, xml are data; md, txt are doc; anything else (or no extension) is other. The extension is printed without its leading dot, or as none. Note that splitext treats a leading dot (as in .hidden) as part of the name, so such files have no extension. A name may itself contain slashes (e.g. img/logo.png) - basename still applies to the final path.\n` +
      `\n` +
      `Input Format:\n` +
      `Line 1: the base folder.\n` +
      `Line 2: the integer n.\n` +
      `Lines 3..n+2: one asset name per line.\n` +
      `\n` +
      `Output Format:\n` +
      `One line per asset: basename extension class (e.g. app.py py code). Then a summary line: code a data b doc c other d with the four class counts.\n` +
      `\n` +
      `Constraints:\n` +
      `1 <= n <= 20; base and names have length 1 to 40`,
    difficulty: "hard",
    variant: "scenario",
    subtopic: SUB.psp,
    si1: "assets\n3\napp.py\nnotes.md\nreadme", so1: "app.py py code\nnotes.md md doc\nreadme none other\ncode 1 data 0 doc 1 other 1",
    si2: "store\n2\n.hidden\nblob", so2: ".hidden none other\nblob none other\ncode 0 data 0 doc 0 other 2",
    i1: "release\n1\narchive.tar.gz", o1: "archive.tar.gz gz other\ncode 0 data 0 doc 0 other 1",
    i2: "web\n4\nrun.js\ndata.json\nschema.yaml\nsong.mp3", o2: "run.js js code\ndata.json json data\nschema.yaml yaml data\nsong.mp3 mp3 other\ncode 1 data 2 doc 0 other 1",
    i3: "portal\n3\nnotes.md\nimg/logo.png\nmain.ts", o3: "notes.md md doc\nlogo.png png other\nmain.ts ts code\ncode 1 data 0 doc 1 other 1",
    inputconstrains: "1 <= n <= 20, base/name length 1..40",
    blacklist: "rsplit(, .rfind(",
    whitelist: "os.path.join, os.path.splitext",
    sourcecode: String.raw`import os

CODE_EXT = {"py", "js", "ts"}
DATA_EXT = {"json", "csv", "yaml", "xml"}
DOC_EXT = {"md", "txt"}

base = input()
n = int(input())
counts = {"code": 0, "data": 0, "doc": 0, "other": 0}
for _ in range(n):
    name = input()
    full = os.path.join(base, name)
    ext = os.path.splitext(full)[1]
    leaf = os.path.basename(full)
    if ext == "":
        kind = "other"
        shown = "none"
    else:
        shown = ext[1:]
        if shown in CODE_EXT:
            kind = "code"
        elif shown in DATA_EXT:
            kind = "data"
        elif shown in DOC_EXT:
            kind = "doc"
        else:
            kind = "other"
    counts[kind] += 1
    print(f"{leaf} {shown} {kind}")
print(f"code {counts['code']} data {counts['data']} doc {counts['doc']} other {counts['other']}")`,
  }),
];

/* ============================== MCQ QUESTIONS ============================== */

const mcqs = [
  mq({
    title: "Keyword To Import A Module",
    description: "Which keyword brings a module's code into your script so its names become usable?",
    difficulty: "easy",
    subtopic: SUB.cim,
    options: ["import", "include", "require", "load"],
    correct: 1,
  }),
  mq({
    title: "From Import Grants What",
    description: "What does the statement `from math import sqrt` do?",
    difficulty: "easy",
    subtopic: SUB.cim,
    options: [
      "It imports the whole math module, so sqrt must be called as math.sqrt(...)",
      "It binds the name sqrt directly in the current namespace, callable without the module prefix",
      "It imports every function of every standard-library module at once",
      "It creates an alias named math for the sqrt function",
    ],
    correct: 2,
  }),
  mq({
    title: "Main Guard Condition",
    description: "When a Python file is executed directly (for example `python app.py`), what is the value of __name__ inside that file?",
    difficulty: "easy",
    subtopic: SUB.nv,
    options: ["app.py", "main", "__main__", "module"],
    correct: 3,
  }),
  mq({
    title: "What Is A Python Module",
    description: "In Python, what exactly is a module?",
    difficulty: "easy",
    subtopic: SUB.cim,
    options: [
      "Any folder that contains code files",
      "A file with the .py extension containing definitions and statements",
      "A compiled bytecode cache file",
      "A built-in container data type",
    ],
    correct: 2,
  }),
  mq({
    title: "File That Marks A Package",
    description: "Which file turns an ordinary directory into an importable Python package?",
    difficulty: "easy",
    subtopic: SUB.psp,
    options: ["package.json", "__main__.py", "__init__.py", "setup.cfg"],
    correct: 3,
  }),
  mq({
    title: "Import Alias Keyword",
    description: "Which keyword assigns a shorter alias while importing, as in `import statistics as st`?",
    difficulty: "easy",
    subtopic: SUB.cim,
    options: ["alias", "as", "like", "named"],
    correct: 2,
  }),
  mq({
    title: "Accessing Pi After Import",
    description: "After executing `import math`, which expression gives the value of pi?",
    difficulty: "easy",
    subtopic: SUB.slm,
    options: ["pi", "math.pi", "math->pi", "math[\"pi\"]"],
    correct: 2,
  }),
  mq({
    title: "Why Write A Main Guard",
    description: "Why do Python scripts wrap their entry-point code in `if __name__ == \"__main__\":`?",
    difficulty: "easy",
    subtopic: SUB.nv,
    options: [
      "It makes the guarded code run noticeably faster",
      "It ensures that code runs only when the file is executed directly, not when the file is imported as a module",
      "It is required syntax around every function definition",
      "It converts the file into an installable package",
    ],
    correct: 2,
  }),
  mq({
    title: "sys.path Holds What",
    description: "What does the list sys.path contain?",
    difficulty: "easy",
    subtopic: SUB.psp,
    options: [
      "The names of all programs installed on the machine",
      "The directory locations that are searched, in order, when importing modules",
      "The contents of the currently executing module",
      "The URLs pip uses to download packages",
    ],
    correct: 2,
  }),
  mq({
    title: "Tool That Installs Packages",
    description: "Which command-line tool installs third-party packages into site-packages?",
    difficulty: "easy",
    subtopic: SUB.psp,
    options: ["pyinstall", "pip", "pkgtool", "import"],
    correct: 2,
  }),
  mq({
    title: "Payroll Import Simulation Output",
    description: "The file payroll.py shown below is executed directly with `python payroll.py`. What does it print?",
    difficulty: "medium",
    subtopic: SUB.nv,
    options: [
      "loading payroll, then 400.0 (two lines)",
      "400.0 only",
      "loading payroll only",
      "loading payroll, then 40000",
    ],
    correct: 1,
    snippet: String.raw`def bonus(salary):
    return salary / 10

print("loading payroll")

if __name__ == "__main__":
    print(bonus(4000))`,
  }),
  mq({
    title: "Floor And Ceil Combo Output",
    description: "What does this script print?",
    difficulty: "medium",
    subtopic: SUB.slm,
    options: ["3 -2", "4 -1", "3 -1", "4 -2"],
    correct: 1,
    snippet: String.raw`from math import floor, ceil
print(floor(3.7), ceil(-2.1))`,
  }),
  mq({
    title: "Aliased Factorial Sum Output",
    description: "What does this script print?",
    difficulty: "medium",
    subtopic: SUB.cim,
    options: ["30", "24", "64", "720"],
    correct: 1,
    snippet: String.raw`from math import factorial as fact
print(fact(3) + fact(4))`,
  }),
  mq({
    title: "Circular Import Consequence",
    description: "Two modules, app.py and stats.py, each contain `import <the other one>` at the top of the file. What is the typical consequence when app.py is run?",
    difficulty: "medium",
    subtopic: SUB.cim,
    options: [
      "Python silently skips the second import and continues",
      "An ImportError or AttributeError can occur because one module is still partially initialized during the cycle",
      "Both modules execute twice from start to finish",
      "Nothing can fail, because imports are always cached and complete",
    ],
    correct: 2,
  }),
  mq({
    title: "Name Variable When Imported",
    description: "A module named utils.py is imported by another script. Inside utils.py, what is the value of __name__ during that import?",
    difficulty: "medium",
    subtopic: SUB.nv,
    options: ["__main__", "utils", "utils.py", "import"],
    correct: 2,
  }),
  mq({
    title: "Seeded Random Pair Sum Output",
    description: "What does this script print? (random.seed(3) makes the sequence fully deterministic.)",
    difficulty: "medium",
    subtopic: SUB.slm,
    options: ["14", "10", "6", "40"],
    correct: 1,
    snippet: String.raw`import random
random.seed(3)
a = random.randint(1, 10)
b = random.randint(1, 10)
print(a + b)`,
  }),
  mq({
    title: "Two File Import Output",
    description: "utils.py and app.py sit in the same folder. What appears on screen when app.py runs?",
    difficulty: "hard",
    subtopic: SUB.cim,
    options: [
      "utils loaded, then 12.56",
      "12.56 only",
      "utils loaded, then 6.28",
      "Nothing, because utils.py only defines a library",
    ],
    correct: 1,
    snippet: String.raw`# file: utils.py
PI = 3.14

def area(r):
    return PI * r ** 2

print("utils loaded")

# file: app.py
import utils
print(utils.area(2))`,
  }),
  mq({
    title: "Search Path Append Check",
    description: "What does this script print?",
    difficulty: "hard",
    subtopic: SUB.psp,
    options: [
      "app start, then True",
      "app start, then False",
      "True only",
      "app start, then /opt/plugins",
    ],
    correct: 1,
    snippet: String.raw`import sys

print("app start")
sys.path.append("/opt/plugins")
print("/opt/plugins" in sys.path)`,
  }),
  mq({
    title: "Name Print In Two Files",
    description: "tools.py and app.py sit in the same folder. What is printed when `python app.py` runs?",
    difficulty: "hard",
    subtopic: SUB.nv,
    options: [
      "tools, then __main__",
      "__main__, then tools",
      "__main__ twice",
      "tools twice",
    ],
    correct: 1,
    snippet: String.raw`# file: tools.py
print(__name__)

# file: app.py
import tools
print(__name__)`,
  }),
  mq({
    title: "Local Math Shadow Hazard",
    description: "A beginner saves their own helper file as math.py in the project folder and writes `import math` in a script inside that same folder. What most likely happens?",
    difficulty: "hard",
    subtopic: SUB.psp,
    options: [
      "The standard-library math module wins because built-ins always take priority",
      "The script's directory is searched first on sys.path, so the local math.py shadows the standard-library module",
      "Python refuses to run and reports a syntax error about the duplicate name",
      "Both files are imported and their names are merged into one namespace",
    ],
    correct: 2,
  }),
];

/* ================================ WRITE OUT ================================ */

writeFileSync(`${DIR}/day-11.code.json`, JSON.stringify({ day: 11, topics: [{ name: TOPIC_NAME, subtopics: Object.values(SUB) }], questions }, null, 2));
writeFileSync(`${DIR}/day-11.mcq.json`, JSON.stringify({ day: 11, questions: mcqs }, null, 2));
console.log("wrote day 11:", questions.length, "code,", mcqs.length, "mcq");
