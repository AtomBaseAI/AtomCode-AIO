/**
 * Builder for Day 18 — "Regular Expressions".
 * Emits:
 *   /home/z/my-project/scripts/python-programming/data/day-18.code.json  (20 code questions)
 *   /home/z/my-project/scripts/python-programming/data/day-18.mcq.json   (20 MCQ questions)
 *
 * ESCAPE SAFETY: every Python code string (sourcecode, codesnippet) and every
 * description containing regex backslashes is written with String.raw`...`
 * so backslashes reach the JSON verbatim (Python sees r"\d", \1, \b, etc.).
 */
import { writeFileSync } from "node:fs";

const DAY = 18;
const TOPIC = "Regular Expressions";
const SUBTOPICS = [
  "re Module Basics",
  "Pattern Matching with search and match",
  "findall and finditer",
  "Character Classes and Quantifiers",
  "Grouping and Extraction",
  "Substitution with re.sub",
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
    title: "First Digit Finder",
    description: String.raw`A validation drill scans a string for the first digit character anywhere in it using re.search and reports the exact character matched via .group().\n\nInput Format:\nOne line: a string of 1 to 60 printable characters (may contain letters, digits, spaces, symbols).\n\nOutput Format:\nIf the string contains at least one digit: Found: <digit>\nOtherwise: No digit\n\nConstraints:\nThe line is non-empty and contains no tab characters.`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Pattern Matching with search and match",
    sampleinput1: "Room 42 booked",
    sampleoutput1: "Found: 4",
    sampleinput2: "no numbers here",
    sampleoutput2: "No digit",
    input1: "flat 7b",
    output1: "Found: 7",
    input2: "abcxyz",
    output2: "No digit",
    input3: "2024 report",
    output3: "Found: 2",
    inputconstrains: "1 <= len(line) <= 60, no tabs",
    blacklist: "",
    whitelist: "",
    sourcecode: String.raw`import re

s = input()
m = re.search(r"\d", s)
if m:
    print(f"Found: {m.group()}")
else:
    print("No digit")
`,
  }),

  codeQ({
    title: "Starts With A Word",
    description: String.raw`An index builder checks whether a line begins with letters. re.match anchors at the very start, so a leading run of letters is captured; a leading digit, space or symbol fails the match.\n\nInput Format:\nOne line: a string of 1 to 60 printable characters.\n\nOutput Format:\nIf the line starts with one or more letters: Starts with: <the leading letters>\nOtherwise: No leading word\n\nConstraints:\nThe line is non-empty.`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Pattern Matching with search and match",
    sampleinput1: "Hello world",
    sampleoutput1: "Starts with: Hello",
    sampleinput2: "42 apples",
    sampleoutput2: "No leading word",
    input1: "ticket-2024",
    output1: "Starts with: ticket",
    input2: "  spaced",
    output2: "No leading word",
    input3: "Zebra9",
    output3: "Starts with: Zebra",
    inputconstrains: "1 <= len(line) <= 60",
    blacklist: "",
    whitelist: "",
    sourcecode: String.raw`import re

s = input()
m = re.match(r"[A-Za-z]+", s)
if m:
    print(f"Starts with: {m.group()}")
else:
    print("No leading word")
`,
  }),

  codeQ({
    title: "All Numbers In A Line",
    description: String.raw`A warehouse ticker pulls every integer run out of a line with re.findall(r"\d+", ...) and shows them space-joined on a single line.\n\nInput Format:\nOne line of 1 to 100 characters containing at least one run of digits (digits may be embedded in words).\n\nOutput Format:\nOne line: every integer found, space-separated, in order of appearance.\n\nConstraints:\nThe line is non-empty.`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "findall and finditer",
    sampleinput1: "Room 12 has 3 lamps and 145 bulbs",
    sampleoutput1: "12 3 145",
    sampleinput2: "flight ai202 departs gate 9",
    sampleoutput2: "202 9",
    input1: "2 plus 2 equals 4",
    output1: "2 2 4",
    input2: "order 9001 shipped on 2024",
    output2: "9001 2024",
    input3: "v1 b2 c33",
    output3: "1 2 33",
    inputconstrains: "1 <= len(line) <= 100",
    blacklist: "",
    whitelist: "",
    sourcecode: String.raw`import re

s = input()
nums = re.findall(r"\d+", s)
print(" ".join(nums))
`,
  }),

  codeQ({
    title: "Count Vowels With A Class",
    description: String.raw`A phonetics lab counts vowels with one regex character class: every a, e, i, o or u in either case matches the class [aeiouAEIOU]. Count the matches.\n\nInput Format:\nOne line: text of 1 to 100 characters.\n\nOutput Format:\nOne line: the number of vowel characters in the text.\n\nConstraints:\nThe line is non-empty.`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Character Classes and Quantifiers",
    sampleinput1: "Regular Expressions are Powerful",
    sampleoutput1: "12",
    sampleinput2: "bcdfg",
    sampleoutput2: "0",
    input1: "AtomCode",
    output1: "4",
    input2: "AEIOU aeiou",
    output2: "10",
    input3: "Python 3.12",
    output3: "1",
    inputconstrains: "1 <= len(line) <= 100",
    blacklist: "",
    whitelist: "",
    sourcecode: String.raw`import re

s = input()
print(len(re.findall(r"[aeiouAEIOU]", s)))
`,
  }),

  codeQ({
    title: "Hash Out The Digits",
    description: String.raw`A redaction drill replaces every single digit character with a hash mark using re.sub.\n\nInput Format:\nOne line: text of 1 to 80 characters.\n\nOutput Format:\nOne line: the text with every digit replaced by #.\n\nConstraints:\nThe line is non-empty.`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Substitution with re.sub",
    sampleinput1: "Room 12 has 3 lamps",
    sampleoutput1: "Room ## has # lamps",
    sampleinput2: "no digits",
    sampleoutput2: "no digits",
    input1: "v2.5 build 100",
    output1: "v#.# build ###",
    input2: "a1b2c3",
    output2: "a#b#c#",
    input3: "2024-05-15",
    output3: "####-##-##",
    inputconstrains: "1 <= len(line) <= 80",
    blacklist: "",
    whitelist: "",
    sourcecode: String.raw`import re

s = input()
print(re.sub(r"\d", "#", s))
`,
  }),

  codeQ({
    title: "Extract Every Word",
    description: String.raw`A tokenizer splits messy text into word tokens: every maximal run of letters, digits or underscores (\w+) is one token, printed on its own line in order.\n\nInput Format:\nOne line: text of 1 to 100 characters containing at least one word character.\n\nOutput Format:\nOne line per word token, in order of appearance.\n\nConstraints:\nThe line is non-empty.`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "re Module Basics",
    sampleinput1: "Hello, world! It's 2024.",
    sampleoutput1: "Hello\nworld\nIt\ns\n2024",
    sampleinput2: "single",
    sampleoutput2: "single",
    input1: "a-b_c d.e",
    output1: "a\nb_c\nd\ne",
    input2: "user@mail: pass123",
    output2: "user\nmail\npass123",
    input3: "one two  three",
    output3: "one\ntwo\nthree",
    inputconstrains: "1 <= len(line) <= 100, at least one word character",
    blacklist: "",
    whitelist: "",
    sourcecode: String.raw`import re

s = input()
for w in re.findall(r"\w+", s):
    print(w)
`,
  }),

  codeQ({
    title: "Log Level Spotter",
    description: String.raw`A monitoring dashboard scans a log line and surfaces the severity tokens WARN and ERROR in the order they appear, using one alternation pattern with re.findall.\n\nInput Format:\nOne line: a log line of 1 to 120 characters containing WARN or ERROR at least once.\n\nOutput Format:\nOne level token per line (ERROR or WARN), in order of appearance.\n\nConstraints:\nThe line contains WARN or ERROR at least once; no level word is embedded inside a longer token in the tests.`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "findall and finditer",
    sampleinput1: "INFO boot ok WARN disk high ERROR net down WARN cache",
    sampleoutput1: "WARN\nERROR\nWARN",
    sampleinput2: "ERROR disk full",
    sampleoutput2: "ERROR",
    input1: "WARN low memory only",
    output1: "WARN",
    input2: "ERROR a ERROR b WARN c",
    output2: "ERROR\nERROR\nWARN",
    input3: "INFO all clean WARN late",
    output3: "WARN",
    inputconstrains: "1 <= len(line) <= 120, contains WARN or ERROR",
    blacklist: "",
    whitelist: "",
    sourcecode: String.raw`import re

line = input()
for lvl in re.findall(r"ERROR|WARN", line):
    print(lvl)
`,
  }),

  codeQ({
    title: "Mobile Number Verdict",
    description: String.raw`A telecom signup form accepts Indian mobile numbers: exactly 10 digits starting with 6, 7, 8 or 9. Validate the whole string with the anchored pattern [6-9]\d{9} and print the boolean verdict.\n\nInput Format:\nOne line: the candidate number, 1 to 12 digit characters.\n\nOutput Format:\nOne line: True or False\n\nConstraints:\nThe line is non-empty and contains only digits.`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Pattern Matching with search and match",
    sampleinput1: "9876543210",
    sampleoutput1: "True",
    sampleinput2: "5876543210",
    sampleoutput2: "False",
    input1: "6000000000",
    output1: "True",
    input2: "92345678901",
    output2: "False",
    input3: "923456789a",
    output3: "False",
    inputconstrains: "1 <= len(line) <= 12, digits only",
    blacklist: "",
    whitelist: "",
    sourcecode: String.raw`import re

s = input()
print(bool(re.fullmatch(r"[6-9]\d{9}", s)))
`,
  }),

  codeQ({
    title: "Contact Email Harvester",
    description: String.raw`A CRM import tool harvests contact emails from a note with one pragmatic pattern: [A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,} written as a raw string.\n\nInput Format:\nOne line: text of 1 to 120 characters containing at least one email address.\n\nOutput Format:\nOne harvested email per line, in order of appearance.\n\nConstraints:\nThe line is non-empty.`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Character Classes and Quantifiers",
    sampleinput1: "mail a.b@x.com and y@sub.org",
    sampleoutput1: "a.b@x.com\ny@sub.org",
    sampleinput2: "contact: hello.world99@example.com",
    sampleoutput2: "hello.world99@example.com",
    input1: "x@y.in and z@w.co",
    output1: "x@y.in\nz@w.co",
    input2: "team@atomcode.io rocks",
    output2: "team@atomcode.io",
    input3: "a@b.com, c@d.org!",
    output3: "a@b.com\nc@d.org",
    inputconstrains: "1 <= len(line) <= 120",
    blacklist: "",
    whitelist: "",
    sourcecode: String.raw`import re

line = input()
for email in re.findall(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}", line):
    print(email)
`,
  }),

  codeQ({
    title: "Order Code Cleaner",
    description: String.raw`A warehouse normalizes order codes by stripping every non-alphanumeric character (spaces, dashes, slashes, punctuation) with one re.sub call using the class [^A-Za-z0-9].\n\nInput Format:\nOne line: a raw order code of 1 to 60 characters.\n\nOutput Format:\nOne line: the code with every character that is not a letter or digit removed.\n\nConstraints:\nThe line is non-empty.`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Substitution with re.sub",
    sampleinput1: "ORD-2024/AX!",
    sampleoutput1: "ORD2024AX",
    sampleinput2: "inv #45 (paid)",
    sampleoutput2: "inv45paid",
    input1: "a b-c_d/e",
    output1: "abcde",
    input2: "SKU:99.88",
    output2: "SKU9988",
    input3: "(none)",
    output3: "none",
    inputconstrains: "1 <= len(line) <= 60",
    blacklist: "",
    whitelist: "",
    sourcecode: String.raw`import re

s = input()
print(re.sub(r"[^A-Za-z0-9]", "", s))
`,
  }),

  codeQ({
    title: "Password Strength Classifier",
    description: String.raw`A security dashboard grades passwords by counting four checks: (1) length at least 8, (2) contains a digit via \d, (3) contains an uppercase letter via [A-Z], (4) contains a special character - any non-alphanumeric character via [^A-Za-z0-9]. All four pass means Strong, two or three pass means Medium, otherwise Weak.\n\nInput Format:\nOne line: the password, 1 to 40 characters with no spaces.\n\nOutput Format:\nOne line: Strong, Medium, or Weak\n\nConstraints:\nThe password is non-empty.`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Pattern Matching with search and match",
    sampleinput1: "Abcdef1!",
    sampleoutput1: "Strong",
    sampleinput2: "abc",
    sampleoutput2: "Weak",
    input1: "abcdefgh1",
    output1: "Medium",
    input2: "Ab1!",
    output2: "Medium",
    input3: "longpassword",
    output3: "Weak",
    inputconstrains: "1 <= len(password) <= 40, no spaces",
    blacklist: "any(",
    whitelist: "re.search",
    sourcecode: String.raw`import re

pw = input()
score = 0
if len(pw) >= 8:
    score += 1
if re.search(r"\d", pw):
    score += 1
if re.search(r"[A-Z]", pw):
    score += 1
if re.search(r"[^A-Za-z0-9]", pw):
    score += 1
if score == 4:
    print("Strong")
elif score >= 2:
    print("Medium")
else:
    print("Weak")
`,
  }),

  codeQ({
    title: "Due Date Extractor",
    description: String.raw`A contract scanner pulls every DD-MM-YYYY date out of free text. Dates are zero-padded and appear literally in the text; re.findall with the pattern \d{2}-\d{2}-\d{4} collects them in order.\n\nInput Format:\nOne line: text of 1 to 150 characters containing at least one zero-padded DD-MM-YYYY date.\n\nOutput Format:\nOne date per line, in order of appearance.\n\nConstraints:\nDates in the text use exactly two digits for day and month and four digits for the year.`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "findall and finditer",
    sampleinput1: "Renew by 15-05-2024 or 20-06-2024",
    sampleoutput1: "15-05-2024\n20-06-2024",
    sampleinput2: "audit on 01-01-2025",
    sampleoutput2: "01-01-2025",
    input1: "between 10-10-2024 and 12-12-2024",
    output1: "10-10-2024\n12-12-2024",
    input2: "29-02-2024 leap day filing",
    output2: "29-02-2024",
    input3: "deadline 31-12-2024 final",
    output3: "31-12-2024",
    inputconstrains: "1 <= len(line) <= 150, at least one DD-MM-YYYY date present",
    blacklist: "split(",
    whitelist: "re.findall",
    sourcecode: String.raw`import re

text = input()
for d in re.findall(r"\d{2}-\d{2}-\d{4}", text):
    print(d)
`,
  }),

  codeQ({
    title: "Masked Account Logger",
    description: String.raw`A support tool masks numbers in transcripts: within every run of digits, all but the last four digits become X. One substitution does it - replace every digit that is followed by at least four more digits (lookahead \d(?=\d{4})).\n\nInput Format:\nOne line: text of 1 to 100 characters.\n\nOutput Format:\nOne line: the text with each digit run masked down to its last four digits.\n\nConstraints:\nThe line is non-empty.`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Substitution with re.sub",
    sampleinput1: "Call 9876543210 now",
    sampleoutput1: "Call XXXXXX3210 now",
    sampleinput2: "ref 12345 and 123",
    sampleoutput2: "ref X2345 and 123",
    input1: "card 4012888888881881 ends ok",
    output1: "card XXXXXXXXXXXX1881 ends ok",
    input2: "no long runs 123",
    output2: "no long runs 123",
    input3: "9876543210 55555 4444",
    output3: "XXXXXX3210 X5555 4444",
    inputconstrains: "1 <= len(line) <= 100",
    blacklist: "for , while ",
    whitelist: "re.sub",
    sourcecode: String.raw`import re

s = input()
print(re.sub(r"\d(?=\d{4})", "X", s))
`,
  }),

  codeQ({
    title: "Duplicate Word Collapser",
    description: String.raw`An editor macro collapses accidentally doubled words in one pass: a word, whitespace, and the very same word again (case-sensitive, whole words only) is replaced by a single copy through the backreference \1 in the pattern \b(\w+)\s+\1\b.\n\nInput Format:\nOne line: text of 1 to 120 characters.\n\nOutput Format:\nOne line: the text with immediate duplicate word pairs collapsed.\n\nConstraints:\nThe line is non-empty; no word is tripled or more in the tests.`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Grouping and Extraction",
    sampleinput1: "this is is a test test line",
    sampleoutput1: "this is a test line",
    sampleinput2: "no duplicates here at all",
    sampleoutput2: "no duplicates here at all",
    input1: "say hello hello world",
    output1: "say hello world",
    input2: "2024 2024 was a year",
    output2: "2024 was a year",
    input3: "Case Case match works",
    output3: "Case match works",
    inputconstrains: "1 <= len(line) <= 120",
    blacklist: "split(",
    whitelist: "re.sub",
    sourcecode: String.raw`import re

s = input()
print(re.sub(r"\b(\w+)\s+\1\b", r"\1", s))
`,
  }),

  codeQ({
    title: "Config Pair Parser",
    description: String.raw`A deployment tool parses settings from a line: every token of the form word=word is extracted in order with re.finditer over the grouped pattern (\w+)=(\w+) and printed as key: value using captured groups.\n\nInput Format:\nOne line: text of 1 to 120 characters containing at least one word=word token.\n\nOutput Format:\nOne line per pair: <key>: <value> in order of appearance.\n\nConstraints:\nKeys and values are runs of letters, digits or underscores.`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Grouping and Extraction",
    sampleinput1: "host=db port=5432 user=app",
    sampleoutput1: "host: db\nport: 5432\nuser: app",
    sampleinput2: "mode=fast",
    sampleoutput2: "mode: fast",
    input1: "a=1 b=2",
    output1: "a: 1\nb: 2",
    input2: "level=high noise=low",
    output2: "level: high\nnoise: low",
    input3: "x=y ignored =bad key=val9",
    output3: "x: y\nkey: val9",
    inputconstrains: "1 <= len(line) <= 120",
    blacklist: "split(",
    whitelist: "re.finditer, group(",
    sourcecode: String.raw`import re

line = input()
for m in re.finditer(r"(\w+)=(\w+)", line):
    print(f"{m.group(1)}: {m.group(2)}")
`,
  }),

  codeQ({
    title: "Exact Word Counter",
    description: String.raw`A search quality tool counts whole-word occurrences only: the pattern \bcat\b matches cat but not catalog or concat. Build the boundary pattern from the query word and count the matches from re.findall.\n\nInput Format:\nLine 1: the text, 1 to 120 characters\nLine 2: the query word, letters only, 1 to 20 characters\n\nOutput Format:\nOne line: the number of whole-word, case-sensitive occurrences.\n\nConstraints:\nThe text is non-empty; the query word contains only letters.`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Character Classes and Quantifiers",
    sampleinput1: "cat catalog concat cat\ncat",
    sampleoutput1: "2",
    sampleinput2: "dog dog dog\ndog",
    sampleoutput2: "3",
    input1: "issue issues issued issue\nissue",
    output1: "2",
    input2: "AtomCode makes code fun\ncode",
    output2: "1",
    input3: "run runner running run\nrun",
    output3: "2",
    inputconstrains: "1 <= len(text) <= 120, 1 <= len(word) <= 20, letters only",
    blacklist: ".count(",
    whitelist: "re.findall",
    sourcecode: String.raw`import re

text = input()
word = input()
pattern = r"\b" + word + r"\b"
print(len(re.findall(pattern, text)))
`,
  }),

  codeQ({
    title: "Access Log IP Tally",
    description: String.raw`A security analyst mines a mini access log. Each line starts with an IPv4-style address; extract the address with a regex (no splitting), tally hits per address in a dictionary, then print every address with its count, sorted lexicographically by the address string.\n\nInput Format:\nLine 1: an integer n, the number of log lines\nLines 2 to n+1: each line starts with an IPv4-style address like 10.0.0.5 followed by request details; no other dotted quad appears in any line\n\nOutput Format:\nOne line per distinct address, sorted lexicographically as strings: <address> <count>\n\nConstraints:\n1 <= n <= 12; each address has four dot-separated groups of 1 to 3 digits.`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Grouping and Extraction",
    sampleinput1: "4\n10.0.0.5 - - [10/May/2024] GET /home 200\n10.0.0.5 - - [10/May/2024] GET /api 200\n172.16.0.9 - - [10/May/2024] POST /login 401\n10.0.0.5 - - [10/May/2024] GET /home 200",
    sampleoutput1: "10.0.0.5 3\n172.16.0.9 1",
    sampleinput2: "2\n8.8.8.8 - - [11/May/2024] GET / 200\n8.8.4.4 - - [11/May/2024] GET / 200",
    sampleoutput2: "8.8.4.4 1\n8.8.8.8 1",
    input1: "3\n192.168.1.10 GET /a\n9.9.9.9 GET /b\n192.168.1.2 GET /c",
    output1: "192.168.1.10 1\n192.168.1.2 1\n9.9.9.9 1",
    input2: "1\n203.0.113.7 POST /submit 201",
    output2: "203.0.113.7 1",
    input3: "5\n10.1.1.1 GET /x\n10.1.1.1 GET /y\n66.66.66.66 GET /z\n10.1.1.1 PUT /w\n66.66.66.66 GET /v",
    output3: "10.1.1.1 3\n66.66.66.66 2",
    inputconstrains: "1 <= n <= 12, IPv4-style addresses with four groups of 1-3 digits",
    blacklist: ".split(",
    whitelist: "re.search, group(",
    sourcecode: String.raw`import re

def main():
    n = int(input())
    counts = {}
    for _ in range(n):
        line = input()
        m = re.search(r"(\d{1,3}(?:\.\d{1,3}){3})", line)
        ip = m.group(1)
        counts[ip] = counts.get(ip, 0) + 1
    for ip in sorted(counts):
        print(f"{ip} {counts[ip]}")

main()
`,
  }),

  codeQ({
    title: "Contact Field Normalizer",
    description: String.raw`A data-entry pipeline cleans one messy contact line in stages, each with re.sub: first remove every double-quote character, then squash every run of two or more whitespace characters into a single space, finally trim leading and trailing spaces.\n\nInput Format:\nOne line: the messy line, 1 to 120 characters, possibly with quotes and repeated spaces.\n\nOutput Format:\nOne line: the cleaned line.\n\nConstraints:\nThe line is non-empty.`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Substitution with re.sub",
    sampleinput1: "Name:   \"Ada   Lovelace\"    Age:  36",
    sampleoutput1: "Name: Ada Lovelace Age: 36",
    sampleinput2: "\"quiet\"   line",
    sampleoutput2: "quiet line",
    input1: "a    b c",
    output1: "a b c",
    input2: "  \"x\"  \"y\" ",
    output2: "x y",
    input3: "nochanges here",
    output3: "nochanges here",
    inputconstrains: "1 <= len(line) <= 120",
    blacklist: "split(, replace(",
    whitelist: "re.sub",
    sourcecode: String.raw`import re

def main():
    raw = input()
    step1 = re.sub(r'"', "", raw)
    step2 = re.sub(r"\s{2,}", " ", step1)
    print(step2.strip())

main()
`,
  }),

  codeQ({
    title: "Expression Tokenizer",
    description: String.raw`A calculator front-end tokenizes arithmetic expressions: numbers become integer tokens and each operator or parenthesis is its own token. One alternation pattern - digits first (\d+), then the operator class [+\-*/()] - pulls every token with re.findall in order.\n\nInput Format:\nOne line: an expression of 1 to 80 characters containing only digits and the characters + - * / ( ).\n\nOutput Format:\nOne token per line, in order of appearance.\n\nConstraints:\nThe expression is non-empty; multi-digit numbers must stay as one token.`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Character Classes and Quantifiers",
    sampleinput1: "12+3*(45-6)/7",
    sampleoutput1: "12\n+\n3\n*\n(\n45\n-\n6\n)\n/\n7",
    sampleinput2: "100-25",
    sampleoutput2: "100\n-\n25",
    input1: "2*(3+4)",
    output1: "2\n*\n(\n3\n+\n4\n)",
    input2: "7",
    output2: "7",
    input3: "9/3-2*1",
    output3: "9\n/\n3\n-\n2\n*\n1",
    inputconstrains: "1 <= len(expr) <= 80, digits and + - * / ( ) only",
    blacklist: ".split(",
    whitelist: "re.findall",
    sourcecode: String.raw`import re

def main():
    expr = input()
    for tok in re.findall(r"\d+|[+\-*/()]", expr):
        print(tok)

main()
`,
  }),

  codeQ({
    title: "Triple Rule Validator",
    description: String.raw`A signup gateway validates three record kinds by code. EMAIL values must be a full address like name@host.tld; PHONE values must be exactly 10 digits starting with 6-9; PLATE values must be two uppercase letters followed by four digits. Each value must match its rule ENTIRELY; print the boolean verdict per record.\n\nInput Format:\nLine 1: an integer n, the number of records\nLines 2 to n+1: a rule word (EMAIL, PHONE or PLATE), one space, then the value\n\nOutput Format:\nn lines: True or False for each record, in order.\n\nConstraints:\n1 <= n <= 10; values are 1 to 40 characters with no spaces.`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Pattern Matching with search and match",
    sampleinput1: "3\nEMAIL a.b@x.com\nPHONE 9876543210\nPLATE AB1234",
    sampleoutput1: "True\nTrue\nTrue",
    sampleinput2: "3\nEMAIL bad@@x.com\nPHONE 5876543210\nPLATE ab1234",
    sampleoutput2: "False\nFalse\nFalse",
    input1: "3\nEMAIL y@sub.org\nPHONE 6000000000\nPLATE XY9090",
    output1: "True\nTrue\nTrue",
    input2: "3\nEMAIL a@b\nPHONE 92345678901\nPLATE A12345",
    output2: "False\nFalse\nFalse",
    input3: "3\nPLATE ZZ0000\nEMAIL user.name+tag@host.io\nPHONE 1234567890",
    output3: "True\nTrue\nFalse",
    inputconstrains: "1 <= n <= 10, values 1-40 characters, no spaces in values",
    blacklist: "startswith(, endswith(",
    whitelist: "re.fullmatch",
    sourcecode: String.raw`import re

def main():
    n = int(input())
    for _ in range(n):
        line = input()
        rule, value = line.split(" ", 1)
        if rule == "EMAIL":
            ok = re.fullmatch(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}", value)
        elif rule == "PHONE":
            ok = re.fullmatch(r"[6-9]\d{9}", value)
        else:
            ok = re.fullmatch(r"[A-Z]{2}[0-9]{4}", value)
        print(bool(ok))

main()
`,
  }),
];

/* ─────────────────────────────── MCQ QUESTIONS ─────────────────────────────── */

const mcqs = [
  mcq({
    title: "Match Versus Search",
    description:
      "Which statement about re.match and re.search is TRUE?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Pattern Matching with search and match",
    Option1:
      "re.match only succeeds when the pattern matches at the very beginning of the string, while re.search finds the pattern anywhere in it",
    Option2: "re.search only succeeds at the beginning of the string",
    Option3: "re.match scans the whole string exactly like re.search",
    Option4: "Both require the pattern to match the entire string",
    CorrectOption: 1,
  }),
  mcq({
    title: "Digit Shorthand Meaning",
    description: String.raw`In a Python regular expression, what does \d match?`,
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Character Classes and Quantifiers",
    Option1: "Any single digit from 0 to 9",
    Option2: "Any letter or digit",
    Option3: "The literal letter d",
    Option4: "One or more digits",
    CorrectOption: 1,
  }),
  mcq({
    title: "Word Character Shorthand",
    description: String.raw`Which characters does the shorthand class \w match?`,
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Character Classes and Quantifiers",
    Option1: "Letters, digits and the underscore",
    Option2: "Only lowercase and uppercase letters",
    Option3: "Letters, digits and whitespace",
    Option4: "Any printable character",
    CorrectOption: 1,
  }),
  mcq({
    title: "Character Class Alternation",
    description:
      "What does the pattern [abc] match?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Character Classes and Quantifiers",
    Option1: "Exactly one character that is a, b or c",
    Option2: "The whole three-letter string abc",
    Option3: "A sequence ab followed by c",
    Option4: "Any character except a, b or c",
    CorrectOption: 1,
  }),
  mcq({
    title: "Function Returning All Matches",
    description:
      "Which re function returns ALL non-overlapping matches of a pattern in a string as a list?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "findall and finditer",
    Option1: "re.findall",
    Option2: "re.search",
    Option3: "re.match",
    Option4: "re.sub",
    CorrectOption: 1,
  }),
  mcq({
    title: "Substitute All Digits",
    description: String.raw`What does re.sub(r"\d", "#", "a1b2") return?`,
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Substitution with re.sub",
    Option1: "a#b#",
    Option2: "a1b2",
    Option3: "ab",
    Option4: "####",
    CorrectOption: 1,
  }),
  mcq({
    title: "Plus Quantifier",
    description:
      "In regex, what does the + quantifier mean?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Character Classes and Quantifiers",
    Option1: "One or more repetitions of the preceding item",
    Option2: "Zero or more repetitions of the preceding item",
    Option3: "Exactly one repetition of the preceding item",
    Option4: "Zero or one repetition of the preceding item",
    CorrectOption: 1,
  }),
  mcq({
    title: "Star Quantifier",
    description:
      "In regex, what does the * quantifier mean?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Character Classes and Quantifiers",
    Option1: "Zero or more repetitions of the preceding item",
    Option2: "One or more repetitions of the preceding item",
    Option3: "Exactly two repetitions of the preceding item",
    Option4: "One optional repetition of the preceding item",
    CorrectOption: 1,
  }),
  mcq({
    title: "Dot Meaning",
    description:
      "By default, what does the . metacharacter match in a Python regex?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Character Classes and Quantifiers",
    Option1: "Any single character except a newline",
    Option2: "Any single character including the newline",
    Option3: "Only the literal dot character",
    Option4: "A run of any characters",
    CorrectOption: 1,
  }),
  mcq({
    title: "Raw String Benefit",
    description: String.raw`Why do Python programmers usually write regex patterns as raw strings like r"\d+"?`,
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "re Module Basics",
    Option1: String.raw`Backslashes stay literal, so \d reaches the regex engine instead of being processed by Python first`,
    Option2: "Raw strings make the pattern case-insensitive",
    Option3: "Raw strings make matching measurably faster",
    Option4: "re functions refuse pattern strings that are not raw",
    CorrectOption: 1,
  }),
  mcq({
    title: "Findall Group Tuples",
    description:
      "What does this snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "findall and finditer",
    Option1:
      "[('a', '1'), ('b', '22'), ('c', '3')] — when the pattern has two groups, findall returns tuples of the group values",
    Option2: "['a=1', 'b=22', 'c=3'] — findall returns the full matches",
    Option3: "['a', '1', 'b', '22', 'c', '3'] — groups come back flattened into one list",
    Option4: "[('a=1',), ('b=22',), ('c=3',)] — each match is a one-element tuple",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: String.raw`import re
print(re.findall(r"(\w+)=(\d+)", "a=1 b=22 c=3"))`,
    snippetLang: "python",
  }),
  mcq({
    title: "Greedy Versus Lazy",
    description:
      "What does this snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Character Classes and Quantifiers",
    Option1:
      "['<a><b>'] on the first line and ['<a>', '<b>'] on the second — greedy * takes everything up to the last >, lazy *? stops at the first",
    Option2:
      "['<a>', '<b>'] on the first line and ['<a><b>'] on the second",
    Option3: "Both lines print ['<a>', '<b>']",
    Option4: "Both lines print ['<a><b>']",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: String.raw`import re
s = "<a><b>"
print(re.findall(r"<.*>", s))
print(re.findall(r"<.*?>", s))`,
    snippetLang: "python",
  }),
  mcq({
    title: "Anchored Match Failure",
    description:
      "What does this snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Pattern Matching with search and match",
    Option1:
      "None on the first line and 404 on the second — match anchors at the start where no digit sits, search finds the first run anywhere",
    Option2: "404 on the first line and 404 on the second",
    Option3: "None on the first line and None on the second",
    Option4: "404 on the first line and 9 on the second",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: String.raw`import re
s = "error 404 at line 9"
print(re.match(r"\d+", s))
print(re.search(r"\d+", s).group())`,
    snippetLang: "python",
  }),
  mcq({
    title: "Backreference Swap",
    description:
      "What does this snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Grouping and Extraction",
    Option1: String.raw`3456-12 - the replacement \2-\1 emits group 2 first, then group 1`,
    Option2: "12-3456 — re.sub ignores backreferences in the replacement",
    Option3: "3456-12-12-3456 — both groups are emitted twice",
    Option4: "ValueError — re.sub cannot use backreferences",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: String.raw`import re
print(re.sub(r"(\d{2})-(\d{4})", r"\2-\1", "12-3456"))`,
    snippetLang: "python",
  }),
  mcq({
    title: "Quantifier Range Meaning",
    description: String.raw`What does the quantifier {2,4} mean in a regex?`,
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Character Classes and Quantifiers",
    Option1:
      "Repeat the preceding item at least 2 and at most 4 times, taking as many as possible",
    Option2: "Repeat the preceding item exactly 2 times or exactly 4 times",
    Option3: "Repeat the preceding item at least 4 times and at most 2 more",
    Option4: "Match the 2nd through 4th occurrence in the string",
    CorrectOption: 1,
  }),
  mcq({
    title: "Case Insensitive Flag",
    description:
      "What does this snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "re Module Basics",
    Option1:
      "['Cat', 'CAT', 'cat'] — the re.I flag makes the match case-insensitive",
    Option2: "['cat'] — only the lowercase occurrence matches",
    Option3: "['Cat'] — only the first occurrence matches",
    Option4: "[] — the pattern cannot match mixed-case text",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: String.raw`import re
print(re.findall(r"cat", "Cat CAT cat", re.I))`,
    snippetLang: "python",
  }),
  mcq({
    title: "Word Boundary Count",
    description:
      "What does this snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Character Classes and Quantifiers",
    Option1: String.raw`2 - \b requires word boundaries, so catalog and concat do not count`,
    Option2: "4 — every cat substring counts",
    Option3: "1 — only the last standalone cat counts",
    Option4: String.raw`0 - \b cannot match inside a sentence`,
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: String.raw`import re
s = "cat catalog concat cat"
print(len(re.findall(r"\bcat\b", s)))`,
    snippetLang: "python",
  }),
  mcq({
    title: "Nested Group Numbering",
    description:
      "What does this snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Grouping and Extraction",
    Option1:
      "12-345 on the first line and 345 on the second — group 1 is the outer pair, group 3 is the last inner group",
    Option2: "12-345 on the first line and 12 on the second",
    Option3: "12 on the first line and 345 on the second",
    Option4: "345 on the first line and 12-345 on the second",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: String.raw`import re
m = re.search(r"((\d+)-(\d+))", "id 12-345")
print(m.group(1))
print(m.group(3))`,
    snippetLang: "python",
  }),
  mcq({
    title: "Bounded Quantifier Greed",
    description:
      "What does this snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "findall and finditer",
    Option1:
      "['aaaa', 'aa'] — each match grabs up to 4 a's, then scanning resumes after it",
    Option2: "['aaaaaa'] — one match spans the whole run",
    Option3: "['aa', 'aa', 'aa'] — the range always stops at its minimum",
    Option4: "['aaaa', 'aaaa'] — findall allows overlapping matches",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: String.raw`import re
print(re.findall(r"a{2,4}", "aaaaaa"))`,
    snippetLang: "python",
  }),
  mcq({
    title: "Named Group Extraction",
    description:
      "What does this snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Grouping and Extraction",
    Option1:
      "bob site — named groups (?P<name>...) can be fetched by label via .group('name')",
    Option2: "mail site — the host group eats the rest of the string",
    Option3: "user host — the group names themselves are printed",
    Option4: "bob@site site — the user group includes the @",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: String.raw`import re
m = re.search(r"(?P<user>\w+)@(?P<host>\w+)", "mail bob@site")
print(m.group("user"), m.group("host"))`,
    snippetLang: "python",
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
