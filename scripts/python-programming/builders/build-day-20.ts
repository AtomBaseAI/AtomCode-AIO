/**
 * Builder for day 20 — "File Handling" (20 code + 20 MCQ).
 * Run: bun scripts/python-programming/builders/build-day-20.ts
 *
 * Every code question is SELF-CONTAINED: it writes the file(s) it needs into /tmp
 * with unique atom_* filenames, then reads/processes them. Deterministic output only.
 */
import { mkdirSync, writeFileSync } from "node:fs";

const DIR = "/home/z/my-project/scripts/python-programming/data";
mkdirSync(DIR, { recursive: true });

const TOPIC_NAME = "File Handling";
const SUBTOPICS = [
  "Opening and Closing Files",
  "File Modes",
  "Reading Files",
  "Writing Files",
  "The with Statement",
  "File Errors and Exceptions",
];
const SUB = {
  open: "Opening and Closing Files",
  modes: "File Modes",
  read: "Reading Files",
  write: "Writing Files",
  with: "The with Statement",
  errors: "File Errors and Exceptions",
};

type Diff = "easy" | "medium" | "hard";

function desc(story: string, inputFormat: string, outputFormat: string, constraints: string) {
  return (
    story +
    "\n\nInput Format:\n" + inputFormat +
    "\n\nOutput Format:\n" + outputFormat +
    "\n\nConstraints:\n" + constraints
  );
}

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
  // ---------------- easy / basic drills ----------------
  cq({
    title: "Note Write and Read Back",
    description: desc(
      "Drill: the full write-then-read round trip. Read one line of text, write it into /tmp/atom_note.txt using open in write mode, then open the same file again, read its content back and print it.",
      "One line of text (may contain spaces).",
      "Exactly the line that was written to the file.",
      "Line length 1 <= L <= 200"
    ),
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.write,
    si1: "hello file", so1: "hello file",
    si2: "buy milk tomorrow", so2: "buy milk tomorrow",
    i1: "atom codes 42", o1: "atom codes 42",
    i2: "x", o2: "x",
    i3: "meeting at nine", o3: "meeting at nine",
    inputconstrains: "Line length 1 <= L <= 200",
    sourcecode: String.raw`line = input()
with open("/tmp/atom_note.txt", "w") as f:
    f.write(line)
with open("/tmp/atom_note.txt", "r") as f:
    print(f.read())`,
  }),

  cq({
    title: "N Lines Round Trip",
    description: desc(
      "Drill: writing n lines then reading the whole file back with .read(). Read n, then n lines. Write every line to /tmp/atom_round.txt (one per line), then open the file, read the entire content with a single .read() call and print it verbatim.",
      "Line 1: n\nNext n lines: the text lines.",
      "Exactly the n lines that were written, in order.",
      "1 <= n <= 10; each line 1 <= L <= 100"
    ),
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.read,
    si1: "3\nalpha\nbeta\ngamma", so1: "alpha\nbeta\ngamma",
    si2: "1\nsolo line", so2: "solo line",
    i1: "2\nred 1\nblue 2", o1: "red 1\nblue 2",
    i2: "4\na\nb\nc\nd", o2: "a\nb\nc\nd",
    i3: "2\nhello world\nbye", o3: "hello world\nbye",
    inputconstrains: "1 <= n <= 10; each line 1 <= L <= 100",
    sourcecode: String.raw`n = int(input())
lines = []
for _ in range(n):
    lines.append(input())
with open("/tmp/atom_round.txt", "w") as f:
    for line in lines:
        f.write(line + "\n")
with open("/tmp/atom_round.txt", "r") as f:
    print(f.read(), end="")`,
  }),

  cq({
    title: "Append Drill Two Opens",
    description: desc(
      "Drill: write mode versus append mode with explicit open/close. Read two lines. Open /tmp/atom_pairs.txt with mode w and write the first line. Then open the SAME file with mode a and append the second line. Finally open it with mode r, read everything and print it. Use explicit close() on every file handle.",
      "Line 1: first line\nLine 2: second line",
      "Both lines, in order (first, then second).",
      "Each line 1 <= L <= 100"
    ),
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.open,
    si1: "first\nsecond", so1: "first\nsecond",
    si2: "alpha\nbeta", so2: "alpha\nbeta",
    i1: "row one\nrow two", o1: "row one\nrow two",
    i2: "x\ny", o2: "x\ny",
    i3: "start\nfinish", o3: "start\nfinish",
    inputconstrains: "Each line 1 <= L <= 100",
    sourcecode: String.raw`first = input()
second = input()

w = open("/tmp/atom_pairs.txt", "w")
w.write(first + "\n")
w.close()

a = open("/tmp/atom_pairs.txt", "a")
a.write(second + "\n")
a.close()

r = open("/tmp/atom_pairs.txt", "r")
print(r.read(), end="")
r.close()`,
  }),

  cq({
    title: "First Line Readline",
    description: desc(
      "Drill: readline() reads exactly one line. Read n, then n lines. Write all of them to /tmp/atom_events.txt, then open the file, call readline() ONCE and print only that first line.",
      "Line 1: n\nNext n lines: text lines.",
      "Only the first line of the file.",
      "1 <= n <= 10; each line 1 <= L <= 60"
    ),
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.read,
    si1: "2\nred 1\nblue 2", so1: "red 1",
    si2: "3\none\ntwo\nthree", so2: "one",
    i1: "1\nonly line", o1: "only line",
    i2: "4\nalpha\nbeta\ngamma\ndelta", o2: "alpha",
    i3: "2\nheader row\ndata row", o3: "header row",
    inputconstrains: "1 <= n <= 10; each line 1 <= L <= 60",
    sourcecode: String.raw`n = int(input())
lines = []
for _ in range(n):
    lines.append(input())
with open("/tmp/atom_events.txt", "w") as f:
    for line in lines:
        f.write(line + "\n")
with open("/tmp/atom_events.txt", "r") as f:
    print(f.readline().rstrip("\n"))`,
  }),

  cq({
    title: "Readlines Count and Close",
    description: desc(
      "Drill: readlines() returns the list of all lines, and open files must be closed. Read n, then n lines. Write them all to /tmp/atom_rows.txt. Then open the file with mode r, call readlines(), store the result, and close() the handle explicitly. Print how many lines readlines() returned.",
      "Line 1: n\nNext n lines: text lines.",
      "One line: the number of lines in the file.",
      "1 <= n <= 10; each line 1 <= L <= 60"
    ),
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.open,
    si1: "4\na\nb\nc\nd", so1: "4",
    si2: "1\njust one", so2: "1",
    i1: "3\nx\ny\nz", o1: "3",
    i2: "6\n1\n2\n3\n4\n5\n6", o2: "6",
    i3: "2\ntop\nbottom", o3: "2",
    inputconstrains: "1 <= n <= 10; each line 1 <= L <= 60",
    sourcecode: String.raw`n = int(input())
lines = []
for _ in range(n):
    lines.append(input())
w = open("/tmp/atom_rows.txt", "w")
for line in lines:
    w.write(line + "\n")
w.close()
r = open("/tmp/atom_rows.txt", "r")
all_lines = r.readlines()
r.close()
print(len(all_lines))`,
  }),

  cq({
    title: "File Mode Lookup Table",
    description: desc(
      "Drill: the standard file mode letters. Read one mode letter and print what that mode does, using this mapping in your code: r -> read existing file, w -> write and truncate, a -> append to end, x -> create new, fail if exists.",
      "One line: a single mode letter (one of r, w, a, x).",
      "One line: the meaning string exactly as mapped above.",
      "The mode letter is one of r, w, a, x"
    ),
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.modes,
    si1: "a", so1: "append to end",
    si2: "r", so2: "read existing file",
    i1: "w", o1: "write and truncate",
    i2: "x", o2: "create new, fail if exists",
    i3: "r", o3: "read existing file",
    inputconstrains: "The mode letter is one of r, w, a, x",
    sourcecode: String.raw`mode = input().strip()
meanings = {
    "r": "read existing file",
    "w": "write and truncate",
    "a": "append to end",
    "x": "create new, fail if exists",
}
print(meanings[mode])`,
  }),

  // ---------------- easy / scenarios ----------------
  cq({
    title: "Daily Sales Log Total",
    description: desc(
      "A corner shop appends each sale to a daily log file. Read n sale records (item name and integer amount), write every record as its own line into /tmp/atom_sales.txt, then read the log back line by line, extract the amount from each line and print the total of all sales.",
      "Line 1: n\nNext n lines: item amount (space separated).",
      "One line: the total of all amounts.",
      "1 <= n <= 10; 0 <= amount <= 1000; item is a single token"
    ),
    difficulty: "easy",
    variant: "scenario",
    subtopic: SUB.write,
    si1: "3\npen 12\nbook 45\nbag 30", so1: "87",
    si2: "1\nmug 100", so2: "100",
    i1: "2\nlamp 250\nshade 75", o1: "325",
    i2: "4\na 1\nb 2\nc 3\nd 4", o2: "10",
    i3: "2\nbig 999\nsmall 1", o3: "1000",
    inputconstrains: "1 <= n <= 10; 0 <= amount <= 1000",
    sourcecode: String.raw`n = int(input())
entries = []
for _ in range(n):
    entries.append(input())
with open("/tmp/atom_sales.txt", "w") as f:
    for e in entries:
        f.write(e + "\n")
total = 0
with open("/tmp/atom_sales.txt", "r") as f:
    for line in f:
        amount = int(line.split()[1])
        total += amount
print(total)`,
  }),

  cq({
    title: "Guestbook Appender",
    description: desc(
      "A guestbook web app writes the first visitor with write mode, then records every further visitor by APPENDING to the same file. Read n visitor names. Write visitor 1 into /tmp/atom_guestbook.txt with mode w, then append visitors 2..n one at a time with mode a, then read the whole guestbook and print every line in order.",
      "Line 1: n\nNext n lines: one visitor name per line.",
      "All n visitor names, one per line, in order.",
      "1 <= n <= 6; names 1 <= L <= 30"
    ),
    difficulty: "easy",
    variant: "scenario",
    subtopic: SUB.modes,
    si1: "3\nAda\nGrace\nLinus", so1: "Ada\nGrace\nLinus",
    si2: "2\nBo\nEd", so2: "Bo\nEd",
    i1: "4\nkim\nlee\npat\nsam", o1: "kim\nlee\npat\nsam",
    i2: "1\nonlyguest", o2: "onlyguest",
    i3: "3\nana\nbob\ncid", o3: "ana\nbob\ncid",
    inputconstrains: "1 <= n <= 6; names 1 <= L <= 30",
    sourcecode: String.raw`n = int(input())
visitors = []
for _ in range(n):
    visitors.append(input())

w = open("/tmp/atom_guestbook.txt", "w")
w.write(visitors[0] + "\n")
w.close()

for v in visitors[1:]:
    g = open("/tmp/atom_guestbook.txt", "a")
    g.write(v + "\n")
    g.close()

r = open("/tmp/atom_guestbook.txt", "r")
print(r.read(), end="")
r.close()`,
  }),

  cq({
    title: "Config Key Loader",
    description: desc(
      "A service stores its settings in a simple key=value file. Read k settings lines and a query key. Write the settings into /tmp/atom_config.txt (one key=value per line), then read the file back, parse each line on the first = into a dictionary, and print the value of the query key.",
      "Line 1: k\nNext k lines: key=value\nLast line: the query key (it is guaranteed to exist).",
      "One line: the value stored for the query key.",
      "1 <= k <= 10; keys and values are non-empty and contain no = sign"
    ),
    difficulty: "easy",
    variant: "scenario",
    subtopic: SUB.read,
    si1: "3\nhost=localhost\nport=8080\nmode=fast\nport", so1: "8080",
    si2: "2\nuser=admin\ntheme=dark\ntheme", so2: "dark",
    i1: "2\nretries=5\ntimeout=30\ntimeout", o1: "30",
    i2: "1\nkey=value123\nkey", o2: "value123",
    i3: "3\na=1\nb=2\nc=3\nb", o3: "2",
    inputconstrains: "1 <= k <= 10; keys/values non-empty, no = inside",
    sourcecode: String.raw`k = int(input())
pairs = []
for _ in range(k):
    pairs.append(input())
query = input()
with open("/tmp/atom_config.txt", "w") as f:
    for p in pairs:
        f.write(p + "\n")
config = {}
with open("/tmp/atom_config.txt", "r") as f:
    for line in f:
        key, value = line.rstrip("\n").split("=", 1)
        config[key] = value
print(config[query])`,
  }),

  cq({
    title: "Backup Copier Count",
    description: desc(
      "A tiny backup tool copies one file to another using two with-open handles in a single statement. Read n lines, write them into /tmp/atom_source.txt, then open BOTH /tmp/atom_source.txt (read) and /tmp/atom_backup.txt (write) with one with statement and copy the content line by line. Print how many lines were copied.",
      "Line 1: n\nNext n lines: the source text lines.",
      "One line: the number of copied lines.",
      "1 <= n <= 10; each line 1 <= L <= 60"
    ),
    difficulty: "easy",
    variant: "scenario",
    subtopic: SUB.with,
    si1: "3\nalpha\nbeta\ngamma", so1: "3",
    si2: "1\nsingle entry", so2: "1",
    i1: "2\nrow one\nrow two", o1: "2",
    i2: "5\np\nq\nr\ns\nt", o2: "5",
    i3: "4\nnote a\nnote b\nnote c\nnote d", o3: "4",
    inputconstrains: "1 <= n <= 10; each line 1 <= L <= 60",
    sourcecode: String.raw`n = int(input())
lines = []
for _ in range(n):
    lines.append(input())
with open("/tmp/atom_source.txt", "w") as f:
    for line in lines:
        f.write(line + "\n")
copied = 0
with open("/tmp/atom_source.txt", "r") as src, open("/tmp/atom_backup.txt", "w") as dst:
    for line in src:
        dst.write(line)
        copied += 1
print(copied)`,
  }),

  // ---------------- medium ----------------
  cq({
    title: "Missing Report Fallback",
    description: desc(
      "A space-station dashboard shows a daily report for each probe. The report file /tmp/atom_missing_927.txt is supposed to exist but was never generated, so opening it for reading MUST raise FileNotFoundError. Read a probe label, attempt to open and read that report file inside a try block, and if the file is missing print the exact fallback line: No report: LABEL. Do NOT check for the file's existence beforehand — handle the exception.",
      "One line: the probe label (single token).",
      "The fallback line: No report: LABEL (the report file never exists).",
      "Label length 1 <= L <= 40"
    ),
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.errors,
    si1: "mars", so1: "No report: mars",
    si2: "venus", so2: "No report: venus",
    i1: "station9", o1: "No report: station9",
    i2: "deep_space", o2: "No report: deep_space",
    i3: "moon", o3: "No report: moon",
    inputconstrains: "Label length 1 <= L <= 40",
    blacklist: "os.path.exists",
    whitelist: "except FileNotFoundError",
    sourcecode: String.raw`label = input().strip()
try:
    with open("/tmp/atom_missing_927.txt", "r") as f:
        content = f.read()
    print(content)
except FileNotFoundError:
    print("No report: " + label)`,
  }),

  cq({
    title: "Numbered Log Scanner",
    description: desc(
      "A monitoring daemon scans a log file and prefixes every line with its line number. Read k log lines, write them into /tmp/atom_scan.txt, then open the file and iterate over the FILE OBJECT directly (no readlines), printing each line as N: text where N starts at 1.",
      "Line 1: k\nNext k lines: log lines.",
      "k lines: N: original text (N = 1, 2, 3, ...).",
      "1 <= k <= 10; each line 1 <= L <= 60"
    ),
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.read,
    si1: "3\ndisk ok\nnet slow\ndisk warn", so1: "1: disk ok\n2: net slow\n3: disk warn",
    si2: "1\nonly event", so2: "1: only event",
    i1: "2\nboot fine\ncron ran", o1: "1: boot fine\n2: cron ran",
    i2: "4\ncpu high\nmem ok\nio wait\nnet ok", o2: "1: cpu high\n2: mem ok\n3: io wait\n4: net ok",
    i3: "2\nfirst\nlast", o3: "1: first\n2: last",
    inputconstrains: "1 <= k <= 10; each line 1 <= L <= 60",
    blacklist: "readlines(",
    whitelist: "with open(",
    sourcecode: String.raw`k = int(input())
logs = []
for _ in range(k):
    logs.append(input())
with open("/tmp/atom_scan.txt", "w") as f:
    for line in logs:
        f.write(line + "\n")
with open("/tmp/atom_scan.txt", "r") as f:
    num = 0
    for line in f:
        num += 1
        print(str(num) + ": " + line.rstrip("\n"))`,
  }),

  cq({
    title: "Audit Chain Appends",
    description: desc(
      "A compliance tool builds an audit trail: a header line is written once, then events are appended across two separate append sessions. Read n events. Open /tmp/atom_audit.txt with mode w and write the header audit start. Then append the first half of the events (one open/append/close session per event), and afterwards append the second half in a second session. Finally read the whole file and print every line in order.",
      "Line 1: n\nNext n lines: event text.",
      "The full audit chain: audit start, then all n events in order.",
      "1 <= n <= 8; each line 1 <= L <= 40"
    ),
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.modes,
    si1: "3\nship v1\ntest v1\nrelease v1", so1: "audit start\nship v1\ntest v1\nrelease v1",
    si2: "2\ne one\ne two", so2: "audit start\ne one\ne two",
    i1: "1\nsingle entry", o1: "audit start\nsingle entry",
    i2: "4\na1\nb2\nc3\nd4", o2: "audit start\na1\nb2\nc3\nd4",
    i3: "2\nlogin ok\nlogout ok", o3: "audit start\nlogin ok\nlogout ok",
    inputconstrains: "1 <= n <= 8; each line 1 <= L <= 40",
    blacklist: "w+",
    whitelist: "open(,\"a\"",
    sourcecode: String.raw`n = int(input())
events = []
for _ in range(n):
    events.append(input())
half = (n + 1) // 2

w = open("/tmp/atom_audit.txt", "w")
w.write("audit start\n")
w.close()

for e in events[:half]:
    a = open("/tmp/atom_audit.txt", "a")
    a.write(e + "\n")
    a.close()

for e in events[half:]:
    a = open("/tmp/atom_audit.txt", "a")
    a.write(e + "\n")
    a.close()

r = open("/tmp/atom_audit.txt", "r")
print(r.read(), end="")
r.close()`,
  }),

  cq({
    title: "Fixed Width Exporter",
    description: desc(
      "A legacy terminal exporter writes a token to a file, reads it back and prints it in fixed-width columns. Read a single word W and a column width k. Write W into /tmp/atom_export.txt with .write(), read it back, then print it in chunks of exactly k characters (the last chunk may be shorter), one chunk per line.",
      "Line 1: the word W (one token, no spaces)\nLine 2: the width k",
      "The word split into chunks of k characters, one chunk per line.",
      "1 <= len(W) <= 100; 1 <= k <= len(W); W is letters/digits only"
    ),
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.write,
    si1: "abcdefghij\n4", so1: "abcd\nefgh\nij",
    si2: "abc\n3", so2: "abc",
    i1: "abcdef\n2", o1: "ab\ncd\nef",
    i2: "xyzwv\n5", o2: "xyzwv",
    i3: "aabbcc\n2", o3: "aa\nbb\ncc",
    inputconstrains: "1 <= len(W) <= 100; 1 <= k <= len(W)",
    blacklist: "textwrap",
    whitelist: ".write(",
    sourcecode: String.raw`word = input().strip()
width = int(input())
with open("/tmp/atom_export.txt", "w") as f:
    f.write(word)
with open("/tmp/atom_export.txt", "r") as f:
    text = f.read()
start = 0
while start < len(text):
    print(text[start:start + width])
    start += width`,
  }),

  cq({
    title: "File Stats Reporter",
    description: desc(
      "A documentation tool reports statistics about a text file it just saved. Read n lines, write them into /tmp/atom_stats.txt, then read the file back line by line and compute WITHOUT any counting built-ins: the number of lines, the total number of words (space-separated tokens), and the total number of characters (excluding line breaks). Print the three numbers on separate lines.",
      "Line 1: n\nNext n lines: text lines.",
      "Line 1: number of lines\nLine 2: number of words\nLine 3: number of characters (no line breaks)",
      "1 <= n <= 10; each line 1 <= L <= 60"
    ),
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.read,
    si1: "2\nhello world\nbye all", so1: "2\n4\n18",
    si2: "1\none", so2: "1\n1\n3",
    i1: "3\na bb ccc\ndddd ee\nf", o1: "3\n6\n16",
    i2: "2\natomcode\nrocks solid", o2: "2\n3\n19",
    i3: "1\nthe quick brown fox", o3: "1\n4\n19",
    inputconstrains: "1 <= n <= 10; each line 1 <= L <= 60",
    blacklist: ".count(",
    whitelist: "with open(",
    sourcecode: String.raw`n = int(input())
lines = []
for _ in range(n):
    lines.append(input())
with open("/tmp/atom_stats.txt", "w") as f:
    for line in lines:
        f.write(line + "\n")
line_count = 0
word_count = 0
char_count = 0
with open("/tmp/atom_stats.txt", "r") as f:
    for line in f:
        clean = line.rstrip("\n")
        line_count += 1
        char_count += len(clean)
        word_count += len(clean.split())
print(line_count)
print(word_count)
print(char_count)`,
  }),

  cq({
    title: "Temperature Archive Report",
    description: desc(
      "A weather station archives its readings into a file with two decimal places, then reports the extremes. Read n readings (decimals), write each one into /tmp/atom_temps.txt on its own line formatted with exactly 2 decimal places, then read the file back and find the lowest and highest values with plain comparison loops (no built-in max/min). Print min X.XX and max Y.YY.",
      "Line 1: n\nNext n lines: one reading per line (decimal number).",
      "Line 1: min X.XX\nLine 2: max Y.YX (both with exactly 2 decimals)",
      "1 <= n <= 20; each reading between -50.00 and 60.00 with at most 2 decimals"
    ),
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.read,
    si1: "4\n21.5\n19.75\n23.1\n20.4", so1: "min 19.75\nmax 23.10",
    si2: "1\n18", so2: "min 18.00\nmax 18.00",
    i1: "3\n5.5\n5.5\n5.5", o1: "min 5.50\nmax 5.50",
    i2: "2\n-3.25\n4.5", o2: "min -3.25\nmax 4.50",
    i3: "5\n10.05\n9.99\n10.01\n9.5\n10", o3: "min 9.50\nmax 10.05",
    inputconstrains: "1 <= n <= 20; readings in -50.00..60.00 with <= 2 decimals",
    blacklist: "max(,min(",
    whitelist: "with open(",
    sourcecode: String.raw`n = int(input())
readings = []
for _ in range(n):
    readings.append(float(input()))
with open("/tmp/atom_temps.txt", "w") as f:
    for t in readings:
        f.write(f"{t:.2f}\n")
lowest = None
highest = None
with open("/tmp/atom_temps.txt", "r") as f:
    for line in f:
        v = float(line.strip())
        if lowest is None or v < lowest:
            lowest = v
        if highest is None or v > highest:
            highest = v
print(f"min {lowest:.2f}")
print(f"max {highest:.2f}")`,
  }),

  // ---------------- hard ----------------
  cq({
    title: "Mini Key-Value Store",
    description: desc(
      "Build a mini key-value store backed by a file. Read c commands: SET key value, GET key, or DEL key. Apply them IN MEMORY in order (GET prints the value immediately, or NULL if the key is missing; DEL of a missing key does nothing). After all commands, persist the final store to /tmp/atom_store.txt as one 'key value' line per entry, read the file back, and print the final state sorted by key as key=value lines.",
      "Line 1: c\nNext c lines: one command each (SET key value / GET key / DEL key).",
      "GET results first, in command order (value or NULL)\nThen the final state: key=value lines sorted by key.",
      "1 <= c <= 20; keys/values are single tokens without spaces; at least one SET is present"
    ),
    difficulty: "hard",
    variant: "scenario",
    subtopic: SUB.write,
    si1: "5\nSET a 1\nSET b 2\nGET a\nDEL a\nSET c 3", so1: "1\nb=2\nc=3",
    si2: "3\nSET x 10\nGET x\nGET y", so2: "10\nNULL\nx=10",
    i1: "4\nSET k1 v1\nSET k2 v2\nDEL k1\nGET k1", o1: "NULL\nk2=v2",
    i2: "6\nSET p 5\nSET q 6\nGET p\nSET p 15\nGET p\nDEL q", o2: "5\n15\np=15",
    i3: "2\nSET only one\nGET only", o3: "one\nonly=one",
    inputconstrains: "1 <= c <= 20; keys/values single tokens; at least one SET",
    blacklist: "json.",
    whitelist: "with open(",
    sourcecode: String.raw`c = int(input())
store = {}
gets = []
for _ in range(c):
    parts = input().split()
    cmd = parts[0]
    if cmd == "SET":
        store[parts[1]] = parts[2]
    elif cmd == "GET":
        if parts[1] in store:
            gets.append(store[parts[1]])
        else:
            gets.append("NULL")
    elif cmd == "DEL":
        if parts[1] in store:
            del store[parts[1]]
with open("/tmp/atom_store.txt", "w") as f:
    for key in store:
        f.write(key + " " + store[key] + "\n")
disk = {}
with open("/tmp/atom_store.txt", "r") as f:
    for line in f:
        tokens = line.rstrip("\n").split(" ", 1)
        disk[tokens[0]] = tokens[1]
for g in gets:
    print(g)
for key in sorted(disk.keys()):
    print(key + "=" + disk[key])`,
  }),

  cq({
    title: "Grade Importer Bad Lines",
    description: desc(
      "A school imports grades from a raw text file that may contain malformed rows. Read n raw lines and write them unchanged into /tmp/atom_grades.txt. Then read the file back line by line: a row is VALID only if it has exactly two tokens and the second token is an integer from 0 to 100 (parse it inside try/except ValueError). Print: avg=A.AA (the average of valid scores with exactly 2 decimals, or avg=NA if there are no valid rows), then bad=B (number of bad rows), then lines= followed by the 1-based line numbers of the bad rows space-separated (or the word none).",
      "Line 1: n\nNext n lines: raw rows, e.g. amy 90 or bob abc or just cara.",
      "Line 1: avg=A.AA or avg=NA\nLine 2: bad=B\nLine 3: lines=<numbers or none>",
      "1 <= n <= 20; names are single tokens; valid scores are integers 0..100"
    ),
    difficulty: "hard",
    variant: "scenario",
    subtopic: SUB.errors,
    si1: "4\namy 90\nbob abc\ncara\ndan 75", so1: "avg=82.50\nbad=2\nlines=2 3",
    si2: "3\ngood 100\nfine 0\nneat 50", so2: "avg=50.00\nbad=0\nlines=none",
    i1: "2\nx 101\ny -5", o1: "avg=NA\nbad=2\nlines=1 2",
    i2: "5\nann 80\nben 90 90\ncal 70\ndee 65\nev 60", o2: "avg=68.75\nbad=1\nlines=2",
    i3: "3\nsid 45\nrob twelve\njoe", o3: "avg=45.00\nbad=2\nlines=2 3",
    inputconstrains: "1 <= n <= 20; names single tokens; valid scores 0..100",
    blacklist: "csv.",
    whitelist: "try:",
    sourcecode: String.raw`n = int(input())
rows = []
for _ in range(n):
    rows.append(input())
with open("/tmp/atom_grades.txt", "w") as f:
    for row in rows:
        f.write(row + "\n")

total = 0
valid = 0
bad_lines = []
line_no = 0
with open("/tmp/atom_grades.txt", "r") as f:
    for line in f:
        line_no += 1
        clean = line.rstrip("\n")
        parts = clean.split()
        ok = False
        try:
            if len(parts) == 2:
                score = int(parts[1])
                if 0 <= score <= 100:
                    ok = True
        except ValueError:
            ok = False
        if ok:
            total += score
            valid += 1
        else:
            bad_lines.append(line_no)

if valid > 0:
    print(f"avg={total / valid:.2f}")
else:
    print("avg=NA")
print("bad=" + str(len(bad_lines)))
if bad_lines:
    print("lines=" + " ".join(str(x) for x in bad_lines))
else:
    print("lines=none")`,
  }),

  cq({
    title: "Log Rotation Archiver",
    description: desc(
      "A syslog-style service rotates its log: only the newest k lines stay in the main file, everything older moves to an archive file. Read n log lines and k. Write all lines to /tmp/atom_main_log.txt, read the file back by iterating the file object (no readlines), then rewrite the main file with only the LAST k lines and write the moved lines into /tmp/atom_archive.txt. Print: archived=A (lines moved), kept=K (lines remaining in the main file, counted by reading it back), then the archive content, one line per line (nothing extra if the archive is empty).",
      "Line 1: n\nNext n lines: log lines.\nLast line: k (1 <= k <= n).",
      "Line 1: archived=A\nLine 2: kept=K\nThen the archived lines in order (if any).",
      "1 <= n <= 12; 1 <= k <= n; each line 1 <= L <= 20"
    ),
    difficulty: "hard",
    variant: "scenario",
    subtopic: SUB.write,
    si1: "5\nL1\nL2\nL3\nL4\nL5\n2", so1: "archived=3\nkept=2\nL1\nL2\nL3",
    si2: "3\na\nb\nc\n3", so2: "archived=0\nkept=3",
    i1: "4\ne1\ne2\ne3\ne4\n1", o1: "archived=3\nkept=1\ne1\ne2\ne3",
    i2: "2\nx9\ny9\n1", o2: "archived=1\nkept=1\nx9",
    i3: "6\nr1\nr2\nr3\nr4\nr5\nr6\n4", o3: "archived=2\nkept=4\nr1\nr2",
    inputconstrains: "1 <= n <= 12; 1 <= k <= n; lines 1..20 chars",
    blacklist: "readlines(",
    whitelist: ".write(",
    sourcecode: String.raw`n = int(input())
logs = []
for _ in range(n):
    logs.append(input())
k = int(input())

with open("/tmp/atom_main_log.txt", "w") as f:
    for line in logs:
        f.write(line + "\n")

all_lines = []
with open("/tmp/atom_main_log.txt", "r") as f:
    for line in f:
        all_lines.append(line.rstrip("\n"))

if k < len(all_lines):
    archive_lines = all_lines[:len(all_lines) - k]
    keep_lines = all_lines[len(all_lines) - k:]
else:
    archive_lines = []
    keep_lines = all_lines

with open("/tmp/atom_main_log.txt", "w") as f:
    for line in keep_lines:
        f.write(line + "\n")
with open("/tmp/atom_archive.txt", "w") as f:
    for line in archive_lines:
        f.write(line + "\n")

kept = 0
with open("/tmp/atom_main_log.txt", "r") as f:
    for line in f:
        kept += 1
print("archived=" + str(len(archive_lines)))
print("kept=" + str(kept))
with open("/tmp/atom_archive.txt", "r") as f:
    for line in f:
        print(line.rstrip("\n"))`,
  }),

  cq({
    title: "Transactional Journal Undo",
    description: desc(
      "A tiny journal supports full undo. The program starts each run with an empty journal file. Read m journal lines. Each line is either a transaction (any other text) or the marker ROLLBACK. Process lines in order: a transaction is APPENDED to /tmp/atom_journal.txt (append mode) and kept in memory; ROLLBACK performs a FULL undo — the in-memory list is cleared and the file is REWRITTEN from scratch (mode w) with the surviving content, which after a full undo is nothing. When all lines are processed, read the file back and print every surviving line in order.",
      "Line 1: m\nNext m lines: transaction text or the exact marker ROLLBACK.",
      "The final journal content, one line per surviving transaction.",
      "1 <= m <= 12; entries 1..30 chars; at least one transaction survives the last ROLLBACK"
    ),
    difficulty: "hard",
    variant: "scenario",
    subtopic: SUB.with,
    si1: "5\nT1 pay\nT2 refund\nROLLBACK\nT3 ship\nT4 track", so1: "T3 ship\nT4 track",
    si2: "3\nA alpha\nB beta\nC gamma", so2: "A alpha\nB beta\nC gamma",
    i1: "3\nX first\nROLLBACK\nY second", o1: "Y second",
    i2: "5\nT one\nROLLBACK\nU two\nROLLBACK\nV three", o2: "V three",
    i3: "6\nJ1\nJ2\nJ3\nROLLBACK\nJ4\nJ5", o3: "J4\nJ5",
    inputconstrains: "1 <= m <= 12; entries 1..30 chars; one TX survives",
    blacklist: "seek(",
    whitelist: "with open(",
    sourcecode: String.raw`m = int(input())
entries = []
for _ in range(m):
    entries.append(input())

path = "/tmp/atom_journal.txt"
live = []
with open(path, "w") as f:
    f.write("")
for entry in entries:
    if entry == "ROLLBACK":
        live = []
        with open(path, "w") as f:
            for e in live:
                f.write(e + "\n")
    else:
        live.append(entry)
        with open(path, "a") as f:
            f.write(entry + "\n")

with open(path, "r") as f:
    for line in f:
        print(line.rstrip("\n"))`,
  }),
];

/* ============================ MCQ QUESTIONS ============================ */

const mcqs = [
  mq({
    title: "What open() Returns",
    description: "What does the expression open(\"data.txt\", \"r\") evaluate to?",
    difficulty: "easy",
    subtopic: SUB.open,
    options: [
      "A file object that you can read from and should close afterwards",
      "The file's entire text content as one string",
      "A list of the file's lines",
      "The file's size in bytes",
    ],
    correct: 1,
  }),
  mq({
    title: "Write Mode Truncates",
    description: "What happens to an existing file's content when you open it with mode \"w\"?",
    difficulty: "easy",
    subtopic: SUB.modes,
    options: [
      "The existing content is wiped (the file is truncated) immediately",
      "New writes are appended after the existing content",
      "Opening fails if the file already exists",
      "The file is opened read-only",
    ],
    correct: 1,
  }),
  mq({
    title: "Append Mode Behavior",
    description: "Which statement about opening a file with mode \"a\" is true?",
    difficulty: "easy",
    subtopic: SUB.modes,
    options: [
      "Every write goes to the end of the file and existing content is kept",
      "The file is truncated before the first write",
      "It reads the file from the last line backwards",
      "It creates a timestamped copy of the file",
    ],
    correct: 1,
  }),
  mq({
    title: "with Statement Auto-Close",
    description: "What does the with statement guarantee about a file opened in its header?",
    difficulty: "easy",
    subtopic: SUB.with,
    options: [
      "It is closed automatically when the block exits, even if an exception occurs",
      "It stays open until the whole program exits",
      "It is flushed to disk after every single write call",
      "It becomes read-only for the duration of the block",
    ],
    correct: 1,
  }),
  mq({
    title: "Second Read After EOF",
    description: "What does this Python snippet print?",
    difficulty: "easy",
    subtopic: SUB.read,
    options: ["5 0", "5 5", "0 0", "It raises an error"],
    correct: 1,
    snippet: String.raw`with open("/tmp/mcq20_eof.txt", "w") as f:
    f.write("hello")
with open("/tmp/mcq20_eof.txt") as f:
    a = f.read()
    b = f.read()
print(len(a), len(b))`,
  }),
  mq({
    title: "Exclusive Create Mode",
    description: "What does opening a file with mode \"x\" do?",
    difficulty: "easy",
    subtopic: SUB.modes,
    options: [
      "Creates a new file for writing but fails with FileExistsError if it already exists",
      "Truncates any existing file and opens it for writing",
      "Opens the file for appending only",
      "Opens a directory for listing",
    ],
    correct: 1,
  }),
  mq({
    title: "Read One Line at a Time",
    description: "Which call returns just the NEXT line (including its trailing newline) from an open text file?",
    difficulty: "easy",
    subtopic: SUB.read,
    options: ["f.readline()", "f.readlines()", "f.read()", "f.next_line()"],
    correct: 1,
  }),
  mq({
    title: "Why Close Files",
    description: "What is the main reason to close files (or use the with statement)?",
    difficulty: "easy",
    subtopic: SUB.open,
    options: [
      "It frees the OS file handle and makes sure buffered data is actually written out",
      "It converts the file to binary format",
      "It deletes the file from disk",
      "It compresses the file for faster reads",
    ],
    correct: 1,
  }),
  mq({
    title: "Missing File Exception",
    description: "What exception does open(\"/tmp/no_such_file.txt\") for READING raise when the file does not exist?",
    difficulty: "easy",
    subtopic: SUB.errors,
    options: ["FileNotFoundError", "KeyError", "ValueError", "PermissionError"],
    correct: 1,
  }),
  mq({
    title: "Default Mode of open()",
    description: "Calling open(\"notes.txt\") with NO mode argument opens the file in which mode?",
    difficulty: "easy",
    subtopic: SUB.modes,
    options: ["Read text mode (r)", "Write mode (w)", "Append mode (a)", "Binary read mode (rb)"],
    correct: 1,
  }),
  mq({
    title: "Truncate on Rewrite",
    description: "What does this Python snippet print?",
    difficulty: "medium",
    subtopic: SUB.modes,
    options: ["new", "old data", "old datanew", "new data"],
    correct: 1,
    snippet: String.raw`with open("/tmp/mcq20_trunc.txt", "w") as f:
    f.write("old data")
with open("/tmp/mcq20_trunc.txt", "w") as f:
    f.write("new")
with open("/tmp/mcq20_trunc.txt") as f:
    print(f.read())`,
  }),
  mq({
    title: "Line Length Tally",
    description: "What does this Python snippet print? (Remember: iterating a file yields lines WITH their newline characters.)",
    difficulty: "medium",
    subtopic: SUB.read,
    options: ["3", "5", "6", "0"],
    correct: 2,
    snippet: String.raw`with open("/tmp/mcq20_iter.txt", "w") as f:
    f.write("a\nb\nc")
with open("/tmp/mcq20_iter.txt") as f:
    total = 0
    for line in f:
        total += len(line)
print(total)`,
  }),
  mq({
    title: "Append After Write",
    description: "What does this Python snippet print?",
    difficulty: "medium",
    subtopic: SUB.modes,
    options: ["AB", "B", "A", "BA"],
    correct: 1,
    snippet: String.raw`with open("/tmp/mcq20_app.txt", "w") as f:
    f.write("A")
with open("/tmp/mcq20_app.txt", "a") as f:
    f.write("B")
with open("/tmp/mcq20_app.txt") as f:
    print(f.read())`,
  }),
  mq({
    title: "Readline Progression",
    description: "What does this Python snippet print? (readline() advances the file cursor.)",
    difficulty: "medium",
    subtopic: SUB.read,
    options: [
      "one then two, on two separate lines",
      "one twice, on two separate lines",
      "one, two and three, on three lines",
      "three, the last line",
    ],
    correct: 1,
    snippet: String.raw`with open("/tmp/mcq20_rl.txt", "w") as f:
    f.write("one\ntwo\nthree")
with open("/tmp/mcq20_rl.txt") as f:
    print(f.readline().strip())
    print(f.readline().strip())`,
  }),
  mq({
    title: "Read on Write Mode Handle",
    description: "What happens if a file is opened with mode \"w\" and you then call f.read() on that handle?",
    difficulty: "medium",
    subtopic: SUB.errors,
    options: [
      "io.UnsupportedOperation: not readable is raised",
      "It returns an empty string",
      "It returns the file's existing contents",
      "The file is truncated to zero bytes",
    ],
    correct: 1,
  }),
  mq({
    title: "write() Return Value",
    description: "What does this Python snippet print?",
    difficulty: "medium",
    subtopic: SUB.write,
    options: ["8", "0", "None", "atomcode"],
    correct: 1,
    snippet: String.raw`with open("/tmp/mcq20_wcount.txt", "w") as f:
    n = f.write("atomcode")
print(n)`,
  }),
  mq({
    title: "closed After with Block",
    description: "What does this Python snippet print?",
    difficulty: "hard",
    subtopic: SUB.with,
    options: ["True", "False", "It raises ValueError", "None"],
    correct: 1,
    snippet: String.raw`with open("/tmp/mcq20_closed.txt", "w") as f:
    f.write("x")
print(f.closed)`,
  }),
  mq({
    title: "readlines Shape",
    description: "What does this Python snippet print?",
    difficulty: "hard",
    subtopic: SUB.read,
    options: ["3 r", "2 r", "3 q", "1 r"],
    correct: 1,
    snippet: String.raw`with open("/tmp/mcq20_rall.txt", "w") as f:
    f.write("p\nq\nr")
with open("/tmp/mcq20_rall.txt") as f:
    lines = f.readlines()
print(len(lines), lines[-1])`,
  }),
  mq({
    title: "seek and tell Walk",
    description: "What does this Python snippet print (three lines)?",
    difficulty: "hard",
    subtopic: SUB.read,
    options: [
      "0, then 2, then abc — on three lines",
      "0, then 2, then def — on three lines",
      "2, then 4, then abc — on three lines",
      "0, then 0, then abc — on three lines",
    ],
    correct: 1,
    snippet: String.raw`with open("/tmp/mcq20_seek.txt", "w") as f:
    f.write("abcdef")
with open("/tmp/mcq20_seek.txt") as f:
    print(f.tell())
    f.read(2)
    print(f.tell())
    f.seek(0)
    print(f.read(3))`,
  }),
  mq({
    title: "Meaning of r+ Mode",
    description: "What does opening an existing file with mode \"r+\" do?",
    difficulty: "hard",
    subtopic: SUB.modes,
    options: [
      "Opens it for reading AND writing without truncating; the file must already exist",
      "Reads the whole file, then truncates it to zero length",
      "Opens a binary file for reading only",
      "Creates a new file exclusively for reading and writing",
    ],
    correct: 1,
  }),
];

/* ============================ WRITE FILES ============================ */

writeFileSync(
  DIR + "/day-20.code.json",
  JSON.stringify({ day: 20, topics: [{ name: TOPIC_NAME, subtopics: SUBTOPICS }], questions }, null, 2)
);
writeFileSync(
  DIR + "/day-20.mcq.json",
  JSON.stringify({ day: 20, questions: mcqs }, null, 2)
);
console.log("wrote day 20:", questions.length, "code,", mcqs.length, "mcq");
