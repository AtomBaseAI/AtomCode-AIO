/**
 * Builder for Day 1 — "Introduction to Python".
 * Emits:
 *   /home/z/my-project/scripts/python-programming/data/day-01.code.json  (20 code questions)
 *   /home/z/my-project/scripts/python-programming/data/day-01.mcq.json   (20 MCQ questions)
 */
import { writeFileSync } from "node:fs";

const DAY = 1;
const TOPIC = "Introduction to Python";
const SUBTOPICS = [
  "History and Use Cases of Python",
  "Python Versions",
  "Python 2 vs Python 3",
  "Setting Up and Running Python",
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
    title: "Personal Greeting Line",
    description:
      "Your first Python script greets a user by name, just like the classic program every beginner runs after installing the interpreter.\n\nInput Format:\nOne line containing a person's name.\n\nOutput Format:\nPrint exactly: Hello, <name>! Welcome to Python.\n\nConstraints:\nThe name has 1 to 50 characters and may contain letters and spaces.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Setting Up and Running Python",
    sampleinput1: "Guido",
    sampleoutput1: "Hello, Guido! Welcome to Python.",
    sampleinput2: "Ada Lovelace",
    sampleoutput2: "Hello, Ada Lovelace! Welcome to Python.",
    input1: "Linus",
    output1: "Hello, Linus! Welcome to Python.",
    input2: "Grace Hopper",
    output2: "Hello, Grace Hopper! Welcome to Python.",
    input3: "Ravi",
    output3: "Hello, Ravi! Welcome to Python.",
    inputconstrains: "1 <= len(name) <= 50, letters and spaces only",
    blacklist: "",
    whitelist: "",
    sourcecode: `name = input()
print(f"Hello, {name}! Welcome to Python.")
`,
  }),

  codeQ({
    title: "Separator Drill Print",
    description:
      "A small formatting drill for the print function's sep parameter: read two words and a separator character, then print the words glued together by that character.\n\nInput Format:\nLine 1: first word.\nLine 2: second word.\nLine 3: a single separator character.\n\nOutput Format:\nOne line: word1 and word2 joined by the separator character.\n\nConstraints:\nEach word has 1 to 20 characters; the separator is one non-space character.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Setting Up and Running Python",
    sampleinput1: "Python\n3.12\n*",
    sampleoutput1: "Python*3.12",
    sampleinput2: "data\nscience\n-",
    sampleoutput2: "data-science",
    input1: "hello\nworld\n!",
    output1: "hello!world",
    input2: "py\ncode\n@",
    output2: "py@code",
    input3: "a\nb\n+",
    output3: "a+b",
    inputconstrains: "1 <= len(word) <= 20, separator is one non-space character",
    blacklist: "",
    whitelist: "",
    sourcecode: `a = input()
b = input()
sep = input()
print(a, b, sep=sep)
`,
  }),

  codeQ({
    title: "Age Next Year",
    description:
      "A school registration script reports how old a student will be next year.\n\nInput Format:\nOne line: a single-word name and an integer age separated by a space.\n\nOutput Format:\nPrint exactly: <name> will turn <age + 1> next year.\n\nConstraints:\n1 <= age <= 120; the name is one word.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Setting Up and Running Python",
    sampleinput1: "Riya 20",
    sampleoutput1: "Riya will turn 21 next year.",
    sampleinput2: "Arjun 35",
    sampleoutput2: "Arjun will turn 36 next year.",
    input1: "Meera 1",
    output1: "Meera will turn 2 next year.",
    input2: "Kabir 99",
    output2: "Kabir will turn 100 next year.",
    input3: "Zoya 12",
    output3: "Zoya will turn 13 next year.",
    inputconstrains: "1 <= age <= 120",
    blacklist: "",
    whitelist: "",
    sourcecode: `name, age = input().split()
age = int(age)
print(f"{name} will turn {age + 1} next year.")
`,
  }),

  codeQ({
    title: "Two Number Math Lines",
    description:
      "A tiny calculator drill prints the sum, difference and product of two integers, one result per line.\n\nInput Format:\nOne line: two integers a and b separated by a space.\n\nOutput Format:\nThree lines: a + b, then a - b, then a * b.\n\nConstraints:\n-1000 <= a, b <= 1000.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Setting Up and Running Python",
    sampleinput1: "7 3",
    sampleoutput1: "10\n4\n21",
    sampleinput2: "12 5",
    sampleoutput2: "17\n7\n60",
    input1: "0 9",
    output1: "9\n-9\n0",
    input2: "-4 6",
    output2: "2\n-10\n-24",
    input3: "100 100",
    output3: "200\n0\n10000",
    inputconstrains: "-1000 <= a, b <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `a, b = map(int, input().split())
print(a + b)
print(a - b)
print(a * b)
`,
  }),

  codeQ({
    title: "Version String Builder",
    description:
      "A version-reporting drill builds a full Python version string from its three numeric parts, the way python3 --version reports it.\n\nInput Format:\nOne line: three integers major, minor and patch separated by spaces.\n\nOutput Format:\nLine 1: Python <major>.<minor>.<patch>\nLine 2: Checking interpreter: python<major>\n\nConstraints:\n0 <= major <= 9; 0 <= minor <= 99; 0 <= patch <= 99.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Python Versions",
    sampleinput1: "3 12 1",
    sampleoutput1: "Python 3.12.1\nChecking interpreter: python3",
    sampleinput2: "2 7 18",
    sampleoutput2: "Python 2.7.18\nChecking interpreter: python2",
    input1: "3 8 0",
    output1: "Python 3.8.0\nChecking interpreter: python3",
    input2: "3 11 9",
    output2: "Python 3.11.9\nChecking interpreter: python3",
    input3: "2 0 1",
    output3: "Python 2.0.1\nChecking interpreter: python2",
    inputconstrains: "0 <= major <= 9, 0 <= minor <= 99, 0 <= patch <= 99",
    blacklist: "",
    whitelist: "",
    sourcecode: `major, minor, patch = map(int, input().split())
print(f"Python {major}.{minor}.{patch}")
print(f"Checking interpreter: python{major}")
`,
  }),

  codeQ({
    title: "Two Decimal Price Printer",
    description:
      "Money values must always be shown with exactly two decimal places. This drill reads a price and prints it in that fixed format using an f-string.\n\nInput Format:\nOne line: a price value (it may have any number of decimal digits, or none).\n\nOutput Format:\nThe price formatted to exactly 2 decimal places.\n\nConstraints:\n0 <= price <= 100000.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Setting Up and Running Python",
    sampleinput1: "12.5",
    sampleoutput1: "12.50",
    sampleinput2: "7",
    sampleoutput2: "7.00",
    input1: "3.14159",
    output1: "3.14",
    input2: "0.5",
    output2: "0.50",
    input3: "1234.567",
    output3: "1234.57",
    inputconstrains: "0 <= price <= 100000",
    blacklist: "",
    whitelist: "",
    sourcecode: `price = float(input())
print(f"{price:.2f}")
`,
  }),

  codeQ({
    title: "Cinema Ticket Booking Slip",
    description:
      "A cinema counter runs a small Python script that prints a booking slip line whenever a customer reserves a seat for a movie.\n\nInput Format:\nLine 1: customer name.\nLine 2: movie title (may contain spaces).\n\nOutput Format:\nPrint exactly: <name> booked a ticket for <movie>.\n\nConstraints:\nThe name and the title have 1 to 40 characters each.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "History and Use Cases of Python",
    sampleinput1: "Maya\nDune Part Two",
    sampleoutput1: "Maya booked a ticket for Dune Part Two.",
    sampleinput2: "Dev\nInception",
    sampleoutput2: "Dev booked a ticket for Inception.",
    input1: "Aisha\nInterstellar",
    output1: "Aisha booked a ticket for Interstellar.",
    input2: "Rohan\n3 Idiots",
    output2: "Rohan booked a ticket for 3 Idiots.",
    input3: "Nina\nTenet",
    output3: "Nina booked a ticket for Tenet.",
    inputconstrains: "1 <= len(name), len(movie) <= 40",
    blacklist: "",
    whitelist: "",
    sourcecode: `name = input()
movie = input()
print(f"{name} booked a ticket for {movie}.")
`,
  }),

  codeQ({
    title: "Food Delivery Order Confirmation",
    description:
      "A food delivery app confirms an order with one formatted line showing the dish and its price.\n\nInput Format:\nLine 1: dish name (may contain spaces).\nLine 2: price as a decimal number.\n\nOutput Format:\nPrint exactly: Order confirmed: <dish> for Rs. <price> where <price> has exactly 2 decimal places.\n\nConstraints:\n0 <= price <= 10000.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "History and Use Cases of Python",
    sampleinput1: "Paneer Butter Masala\n8.5",
    sampleoutput1: "Order confirmed: Paneer Butter Masala for Rs. 8.50",
    sampleinput2: "Veg Fried Rice\n12",
    sampleoutput2: "Order confirmed: Veg Fried Rice for Rs. 12.00",
    input1: "Margherita Pizza\n9.99",
    output1: "Order confirmed: Margherita Pizza for Rs. 9.99",
    input2: "Masala Dosa\n4.75",
    output2: "Order confirmed: Masala Dosa for Rs. 4.75",
    input3: "Chocolate Cake\n15.5",
    output3: "Order confirmed: Chocolate Cake for Rs. 15.50",
    inputconstrains: "0 <= price <= 10000",
    blacklist: "",
    whitelist: "",
    sourcecode: `dish = input()
price = float(input())
print(f"Order confirmed: {dish} for Rs. {price:.2f}")
`,
  }),

  codeQ({
    title: "City Weather Report Line",
    description:
      "A weather widget prints one report line per city from its latest temperature reading.\n\nInput Format:\nLine 1: city name.\nLine 2: temperature as an integer in degrees Celsius.\n\nOutput Format:\nPrint exactly: Weather in <city>: <temp>C\n\nConstraints:\n-50 <= temp <= 60.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "History and Use Cases of Python",
    sampleinput1: "Mumbai\n31",
    sampleoutput1: "Weather in Mumbai: 31C",
    sampleinput2: "Oslo\n-8",
    sampleoutput2: "Weather in Oslo: -8C",
    input1: "Delhi\n42",
    output1: "Weather in Delhi: 42C",
    input2: "Singapore\n0",
    output2: "Weather in Singapore: 0C",
    input3: "Tokyo\n15",
    output3: "Weather in Tokyo: 15C",
    inputconstrains: "-50 <= temp <= 60",
    blacklist: "",
    whitelist: "",
    sourcecode: `city = input()
temp = int(input())
print(f"Weather in {city}: {temp}C")
`,
  }),

  codeQ({
    title: "Library Shelf Update",
    description:
      "A librarian's helper script logs every donation of books to the shelves.\n\nInput Format:\nLine 1: book title (may contain spaces).\nLine 2: number of copies as an integer.\n\nOutput Format:\nPrint exactly: Added <copies> copies of <title> to the library.\n\nConstraints:\n1 <= copies <= 100.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "History and Use Cases of Python",
    sampleinput1: "Clean Code\n3",
    sampleoutput1: "Added 3 copies of Clean Code to the library.",
    sampleinput2: "Automate the Boring Stuff\n5",
    sampleoutput2: "Added 5 copies of Automate the Boring Stuff to the library.",
    input1: "Fluent Python\n2",
    output1: "Added 2 copies of Fluent Python to the library.",
    input2: "Atomic Habits\n10",
    output2: "Added 10 copies of Atomic Habits to the library.",
    input3: "The Pragmatic Programmer\n1",
    output3: "Added 1 copies of The Pragmatic Programmer to the library.",
    inputconstrains: "1 <= copies <= 100",
    blacklist: "",
    whitelist: "",
    sourcecode: `title = input()
copies = int(input())
print(f"Added {copies} copies of {title} to the library.")
`,
  }),

  codeQ({
    title: "Py2 vs Py3 Division Report",
    description:
      "A compatibility teaching tool shows how the same division behaves differently across Python versions. Given a and b, print the Python 3 true-division value and the value Python 2 would give for dividing the integers a and b, which rounds toward negative infinity (the floor of the true quotient).\n\nInput Format:\nOne line: two integers a and b separated by a space (b is never 0).\n\nOutput Format:\nLine 1: py3: <a / b formatted to exactly 2 decimals>\nLine 2: py2: <floor of a divided by b, printed as an integer>\n\nConstraints:\n-1000 <= a, b <= 1000; b != 0.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Python 2 vs Python 3",
    sampleinput1: "7 2",
    sampleoutput1: "py3: 3.50\npy2: 3",
    sampleinput2: "-7 2",
    sampleoutput2: "py3: -3.50\npy2: -4",
    input1: "10 -4",
    output1: "py3: -2.50\npy2: -3",
    input2: "9 3",
    output2: "py3: 3.00\npy2: 3",
    input3: "5 4",
    output3: "py3: 1.25\npy2: 1",
    inputconstrains: "-1000 <= a, b <= 1000, b != 0",
    blacklist: "divmod(",
    whitelist: "//, :.2f",
    sourcecode: `a, b = map(int, input().split())
print(f"py3: {a / b:.2f}")
print(f"py2: {a // b}")
`,
  }),

  codeQ({
    title: "Command Line Rebuilder",
    description:
      "A launcher utility stores a command as its name plus argument tokens and rebuilds the exact command line for its audit log.\n\nInput Format:\nLine 1: the command name (one word).\nLine 2: the number of arguments n.\nLine 3: n argument tokens separated by single spaces.\n\nOutput Format:\nLine 1: the full command line: the name followed by the arguments, separated by single spaces.\nLine 2: Args: <n>\n\nConstraints:\n1 <= n <= 10; each token has 1 to 20 characters.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Setting Up and Running Python",
    sampleinput1: "python3\n3\nhello.py --fast 42",
    sampleoutput1: "python3 hello.py --fast 42\nArgs: 3",
    sampleinput2: "pip\n2\ninstall numpy",
    sampleoutput2: "pip install numpy\nArgs: 2",
    input1: "git\n2\nstatus --short",
    output1: "git status --short\nArgs: 2",
    input2: "python3\n1\n-V",
    output2: "python3 -V\nArgs: 1",
    input3: "ls\n3\n-l -a -t",
    output3: "ls -l -a -t\nArgs: 3",
    inputconstrains: "1 <= n <= 10, 1 <= len(token) <= 20",
    blacklist: "join(",
    whitelist: "for ",
    sourcecode: `cmd = input()
n = int(input())
line = cmd
for token in input().split():
    line = line + " " + token
print(line)
print(f"Args: {n}")
`,
  }),

  codeQ({
    title: "Tiny Variable Simulator",
    description:
      "A teacher replays a beginner's first REPL session. The session manipulates a single variable named x and prints it on request.\n\nInput Format:\nLine 1: n, the number of session lines. Then n lines, each one of:\n- x = <int>  (assign x)\n- x = x + <int>  (increase x)\n- x = x * <int>  (multiply x)\n- print  (output the current value of x)\n\nOutput Format:\nOne line per print statement showing the current value of x.\n\nConstraints:\n1 <= n <= 20; all values are integers with absolute value at most 100; x is assigned before any arithmetic; at least one print appears.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Setting Up and Running Python",
    sampleinput1: "4\nx = 7\nx = x + 3\nprint\nx = x * 2",
    sampleoutput1: "10",
    sampleinput2: "3\nx = 5\nx = x + 5\nprint",
    sampleoutput2: "10",
    input1: "5\nx = 2\nx = x * 6\nprint\nx = x + 1\nprint",
    output1: "12\n13",
    input2: "2\nx = -3\nprint",
    output2: "-3",
    input3: "6\nx = 1\nx = x + 2\nx = x * 3\nx = x + 4\nx = x * 5\nprint",
    output3: "65",
    inputconstrains: "1 <= n <= 20, values in [-100, 100]",
    blacklist: "eval(",
    whitelist: "for , startswith(, elif ",
    sourcecode: `n = int(input())
x = 0
for i in range(n):
    line = input()
    if line == "print":
        print(x)
    elif line.startswith("x = x + "):
        x = x + int(line[8:])
    elif line.startswith("x = x * "):
        x = x * int(line[8:])
    else:
        x = int(line[4:])
`,
  }),

  codeQ({
    title: "Code Point Explorer",
    description:
      "Python 3 strings are Unicode, unlike the byte-oriented ASCII str of Python 2. A teacher script proves it by printing every character's Unicode code point.\n\nInput Format:\nOne line: a word made of letters only.\n\nOutput Format:\nOne line per character: <char> -> <code point>\nThen a final line: Total: <sum of all the code points>\n\nConstraints:\n1 <= len(word) <= 15; letters only.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Python 2 vs Python 3",
    sampleinput1: "Hi",
    sampleoutput1: "H -> 72\ni -> 105\nTotal: 177",
    sampleinput2: "Py",
    sampleoutput2: "P -> 80\ny -> 121\nTotal: 201",
    input1: "A",
    output1: "A -> 65\nTotal: 65",
    input2: "abc",
    output2: "a -> 97\nb -> 98\nc -> 99\nTotal: 294",
    input3: "Zz",
    output3: "Z -> 90\nz -> 122\nTotal: 212",
    inputconstrains: "1 <= len(word) <= 15, letters only",
    blacklist: "sum(",
    whitelist: "for , ord(",
    sourcecode: `word = input()
total = 0
for ch in word:
    print(f"{ch} -> {ord(ch)}")
    total = total + ord(ch)
print(f"Total: {total}")
`,
  }),

  codeQ({
    title: "Release Era Ladder",
    description:
      "A history quiz app asks which major Python version line was current in a given year. Use these ranges: 1991-1993 -> 0.9, 1994-1999 -> 1.0, 2000-2007 -> 2.0, 2008 and later -> 3.0.\n\nInput Format:\nOne line: a year Y.\n\nOutput Format:\nPrint exactly: Year <Y>: Python <version>\n\nConstraints:\n1991 <= Y <= 2020.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Python Versions",
    sampleinput1: "2005",
    sampleoutput1: "Year 2005: Python 2.0",
    sampleinput2: "1992",
    sampleoutput2: "Year 1992: Python 0.9",
    input1: "2015",
    output1: "Year 2015: Python 3.0",
    input2: "1996",
    output2: "Year 1996: Python 1.0",
    input3: "2008",
    output3: "Year 2008: Python 3.0",
    inputconstrains: "1991 <= Y <= 2020",
    blacklist: "dict(",
    whitelist: "elif , if ",
    sourcecode: `y = int(input())
if y <= 1993:
    ver = "0.9"
elif y <= 1999:
    ver = "1.0"
elif y <= 2007:
    ver = "2.0"
else:
    ver = "3.0"
print(f"Year {y}: Python {ver}")
`,
  }),

  codeQ({
    title: "Print Statement Translator",
    description:
      "A migration helper rewrites Python 2 print statements into Python 3 calls. Remember: a trailing comma in Python 2 suppressed the newline and printed a trailing space, which becomes end=\" \" in Python 3.\n\nInput Format:\nLine 1: n. Then n lines, each a Python 2 statement of the form print ARG where ARG is a double-quoted string, a bare identifier or an integer, optionally followed by a trailing comma.\n\nOutput Format:\nFor each statement print its Python 3 equivalent: print(ARG) normally, or print(ARG, end=\" \") when the original had a trailing comma.\n\nConstraints:\n1 <= n <= 10; each ARG has 1 to 20 characters.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Python 2 vs Python 3",
    sampleinput1: "3\nprint \"hello\"\nprint count\nprint 42,",
    sampleoutput1: "print(\"hello\")\nprint(count)\nprint(42, end=\" \")",
    sampleinput2: "2\nprint total\nprint \"Done\",",
    sampleoutput2: "print(total)\nprint(\"Done\", end=\" \")",
    input1: "2\nprint 7\nprint \"Warn\",",
    output1: "print(7)\nprint(\"Warn\", end=\" \")",
    input2: "1\nprint x",
    output2: "print(x)",
    input3: "3\nprint \"a\"\nprint 99,\nprint result",
    output3: "print(\"a\")\nprint(99, end=\" \")\nprint(result)",
    inputconstrains: "1 <= n <= 10, 1 <= len(ARG) <= 20",
    blacklist: "exec(",
    whitelist: "for , endswith(",
    sourcecode: `n = int(input())
for i in range(n):
    line = input()
    body = line[6:]
    if body.endswith(","):
        print(f'print({body[:-1]}, end=" ")')
    else:
        print(f"print({body})")
`,
  }),

  codeQ({
    title: "Variable Store Simulator",
    description:
      "Simulate a beginner's variable store: named boxes that hold integers, supporting assignments, updates, lookups and deletion.\n\nInput Format:\nLine 1: n, the number of commands. Then n commands, one per line:\n- set NAME V  (store V under NAME)\n- add NAME V  (add V to NAME; if NAME does not exist yet, create it with value V)\n- show NAME  (print NAME = value)\n- show all  (print all stored names sorted alphabetically, space separated, or EMPTY if none)\n- delete NAME  (remove NAME; NAME is guaranteed to exist)\n\nOutput Format:\nOne line per show command as described above.\n\nConstraints:\n1 <= n <= 30; names are single lowercase words; -1000 <= V <= 1000.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Setting Up and Running Python",
    sampleinput1: "7\nset count 5\nset total 12\nadd count 3\nshow count\nshow all\ndelete total\nshow all",
    sampleoutput1: "count = 8\ncount total\ncount",
    sampleinput2: "5\nset a 1\nset b 2\nshow all\ndelete a\nshow all",
    sampleoutput2: "a b\nb",
    input1: "4\nset score 10\nadd score 90\nshow score\nshow all",
    output1: "score = 100\nscore",
    input2: "3\nadd bonus 7\nshow bonus\nshow all",
    output2: "bonus = 7\nbonus",
    input3: "4\nset m 4\ndelete m\nshow all\nset m -2",
    output3: "EMPTY",
    inputconstrains: "1 <= n <= 30, -1000 <= V <= 1000, names are lowercase words",
    blacklist: "eval(, exec(",
    whitelist: "for , elif , sorted(",
    sourcecode: `def main():
    n = int(input())
    store = {}
    for i in range(n):
        parts = input().split()
        cmd = parts[0]
        if cmd == "set":
            store[parts[1]] = int(parts[2])
        elif cmd == "add":
            name = parts[1]
            if name in store:
                store[name] = store[name] + int(parts[2])
            else:
                store[name] = int(parts[2])
        elif cmd == "show":
            if parts[1] == "all":
                if len(store) == 0:
                    print("EMPTY")
                else:
                    print(" ".join(sorted(store)))
            else:
                print(f"{parts[1]} = {store[parts[1]]}")
        elif cmd == "delete":
            del store[parts[1]]

main()
`,
  }),

  codeQ({
    title: "Migration Compatibility Checker",
    description:
      "A migration scanner reads the lines of a small script and flags every Python 2-only print statement. A line needs migration exactly when it is 'print' alone or starts with 'print ' (the word print followed by a space). Lines like print(x) or print(\"hi\") are already Python 3 compatible.\n\nInput Format:\nLine 1: n. Then n non-empty lines of a script (each at most 60 characters).\n\nOutput Format:\nFor each line, print '<line number>: MIGRATE' or '<line number>: OK' (line numbers start at 1). Then print '<migrated> of <n> lines need migration'.\n\nConstraints:\n1 <= n <= 15; each line is 1 to 60 characters.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Python 2 vs Python 3",
    sampleinput1: "4\nprint \"hi\"\nprint(x)\nx = 5\nprint",
    sampleoutput1: "1: MIGRATE\n2: OK\n3: OK\n4: MIGRATE\n2 of 4 lines need migration",
    sampleinput2: "3\ntotal = 0\nprint(total)\nprint(\"done\")",
    sampleoutput2: "1: OK\n2: OK\n3: OK\n0 of 3 lines need migration",
    input1: "3\nprint \"a\",\nprint (\"b\")\nprint( \"c\" )",
    output1: "1: MIGRATE\n2: MIGRATE\n3: OK\n2 of 3 lines need migration",
    input2: "2\nprinter = 2\nprint",
    output2: "1: OK\n2: MIGRATE\n1 of 2 lines need migration",
    input3: "5\nprint(1)\nprint \"x\"\nprint(x, y)\nprint  result\nprint",
    output3: "1: OK\n2: MIGRATE\n3: OK\n4: MIGRATE\n5: MIGRATE\n3 of 5 lines need migration",
    inputconstrains: "1 <= n <= 15, 1 <= len(line) <= 60",
    blacklist: "eval(, exec(",
    whitelist: "for , startswith(, def ",
    sourcecode: `def needs_migration(line):
    if line == "print":
        return True
    if line.startswith("print "):
        return True
    return False

def main():
    n = int(input())
    migrated = 0
    for i in range(1, n + 1):
        line = input()
        if needs_migration(line):
            print(f"{i}: MIGRATE")
            migrated = migrated + 1
        else:
            print(f"{i}: OK")
    print(f"{migrated} of {n} lines need migration")

main()
`,
  }),

  codeQ({
    title: "Script Run Log Analyzer",
    description:
      "A CI runner logs executions of Python practice scripts and needs a summary report.\n\nInput Format:\nLine 1: n. Then n lines: STATUS NAME TIME where STATUS is OK or FAIL, NAME is a single-token script name and TIME is the run duration in seconds (a decimal number).\n\nOutput Format:\nLine 1: Total runs: <n>\nLine 2: Passed: <count of OK runs>\nLine 3: Failed: <count of FAIL runs>\nLine 4: Slowest: <name> (<time with 2 decimals>s) for the run with the largest TIME; if several runs tie, use the earliest one in the log.\n\nConstraints:\n1 <= n <= 20; 0.1 <= TIME <= 99.9.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Setting Up and Running Python",
    sampleinput1: "4\nOK etl.py 1.5\nFAIL scraper.py 3.2\nOK quiz.py 0.8\nOK etl.py 2.0",
    sampleoutput1: "Total runs: 4\nPassed: 3\nFailed: 1\nSlowest: scraper.py (3.20s)",
    sampleinput2: "3\nOK a.py 2.5\nFAIL b.py 2.5\nOK c.py 1.0",
    sampleoutput2: "Total runs: 3\nPassed: 2\nFailed: 1\nSlowest: a.py (2.50s)",
    input1: "2\nOK x1 0.1\nFAIL y2 0.2",
    output1: "Total runs: 2\nPassed: 1\nFailed: 1\nSlowest: y2 (0.20s)",
    input2: "1\nOK solo.py 9.99",
    output2: "Total runs: 1\nPassed: 1\nFailed: 0\nSlowest: solo.py (9.99s)",
    input3: "5\nFAIL f1 10.05\nOK f2 10.04\nOK f3 10.05\nFAIL f4 9.5\nOK f5 1.0",
    output3: "Total runs: 5\nPassed: 3\nFailed: 2\nSlowest: f1 (10.05s)",
    inputconstrains: "1 <= n <= 20, 0.1 <= TIME <= 99.9",
    blacklist: "max(, sum(",
    whitelist: "for , if , :.2f",
    sourcecode: `def main():
    n = int(input())
    passed = 0
    failed = 0
    best_time = -1.0
    best_name = ""
    for i in range(n):
        parts = input().split()
        status = parts[0]
        name = parts[1]
        t = float(parts[2])
        if status == "OK":
            passed = passed + 1
        else:
            failed = failed + 1
        if t > best_time:
            best_time = t
            best_name = name
    print(f"Total runs: {n}")
    print(f"Passed: {passed}")
    print(f"Failed: {failed}")
    print(f"Slowest: {best_name} ({best_time:.2f}s)")

main()
`,
  }),

  codeQ({
    title: "Feature Availability Advisor",
    description:
      "A feature advisor tells learners which modern Python features their interpreter supports. The fixed table: fstring exists since 3.6, walrus since 3.8, match since 3.10, typehints since 3.5, pathlib since 3.4. A feature is available only on Python 3 when the minor version is at least the required one; Python 2 supports none of them. An unknown feature name must be reported as unknown.\n\nInput Format:\nLine 1: two integers M and m, the interpreter's major and minor version (M is 2 or 3; 0 <= m <= 12). Line 2: n, the number of feature queries. Then n lines, each a feature name from the table (an unknown name may also appear).\n\nOutput Format:\nFor each query print '<feature>: available', '<feature>: missing' or '<feature>: unknown'. Finally print: Checked <n> features on Python <M>.<m>\n\nConstraints:\n1 <= n <= 8; M is 2 or 3; 0 <= m <= 12.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Python Versions",
    sampleinput1: "3 7\n3\nfstring\nwalrus\nmatch",
    sampleoutput1: "fstring: available\nwalrus: missing\nmatch: missing\nChecked 3 features on Python 3.7",
    sampleinput2: "2 7\n2\nfstring\ntypehints",
    sampleoutput2: "fstring: missing\ntypehints: missing\nChecked 2 features on Python 2.7",
    input1: "3 10\n3\nmatch\npathlib\nwalrus",
    output1: "match: available\npathlib: available\nwalrus: available\nChecked 3 features on Python 3.10",
    input2: "3 12\n2\ndecorator\ntypehints",
    output2: "decorator: unknown\ntypehints: available\nChecked 2 features on Python 3.12",
    input3: "3 4\n4\npathlib\nfstring\ntypehints\nwalrus",
    output3: "pathlib: available\nfstring: missing\ntypehints: missing\nwalrus: missing\nChecked 4 features on Python 3.4",
    inputconstrains: "1 <= n <= 8, M in {2, 3}, 0 <= m <= 12",
    blacklist: "dict(",
    whitelist: "elif , for , def ",
    sourcecode: `def since(feature):
    if feature == "fstring":
        return 6
    elif feature == "walrus":
        return 8
    elif feature == "match":
        return 10
    elif feature == "typehints":
        return 5
    elif feature == "pathlib":
        return 4
    else:
        return -1

def main():
    line = input().split()
    major = int(line[0])
    minor = int(line[1])
    n = int(input())
    for i in range(n):
        feature = input()
        need = since(feature)
        if need == -1:
            print(f"{feature}: unknown")
        elif major >= 3 and minor >= need:
            print(f"{feature}: available")
        else:
            print(f"{feature}: missing")
    print(f"Checked {n} features on Python {major}.{minor}")

main()
`,
  }),
];

/* ─────────────────────────────── MCQ QUESTIONS ────────────────────────────── */

const mcqs = [
  mcq({
    title: "Creator of Python",
    description:
      "Python was designed and first implemented by which person, who released the first version in 1991 and is affectionately titled Python's 'Benevolent Dictator For Life'?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "History and Use Cases of Python",
    Option1: "Guido van Rossum",
    Option2: "James Gosling",
    Option3: "Dennis Ritchie",
    Option4: "Bjarne Stroustrup",
    CorrectOption: 1,
  }),
  mcq({
    title: "Python First Release Year",
    description:
      "In which year was Python first released to the public?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "History and Use Cases of Python",
    Option1: "1989",
    Option2: "1991",
    Option3: "1995",
    Option4: "2000",
    CorrectOption: 2,
  }),
  mcq({
    title: "What Is CPython",
    description:
      "When people say a program 'runs on CPython', what exactly is CPython?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Python Versions",
    Option1: "A compiler that converts Python directly into machine code for Windows",
    Option2: "The reference implementation of Python, written in C",
    Option3: "A C library for writing Python-like games",
    Option4: "A tool that encrypts Python source files",
    CorrectOption: 2,
  }),
  mcq({
    title: "Python Source File Extension",
    description:
      "Which file extension does a standard Python source file use?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Setting Up and Running Python",
    Option1: ".pyt",
    Option2: ".py",
    Option3: ".p",
    Option4: ".pn",
    CorrectOption: 2,
  }),
  mcq({
    title: "Zen of Python Readability",
    description:
      "Typing 'import this' in a Python session prints The Zen of Python, the language's design philosophy. Which line belongs to it?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "History and Use Cases of Python",
    Option1: "Readability counts.",
    Option2: "Fast execution is everything.",
    Option3: "Semicolons are required.",
    Option4: "Verbose code is best code.",
    CorrectOption: 1,
  }),
  mcq({
    title: "Starting the Python 3 REPL",
    description:
      "Which command starts the Python 3 interactive shell (REPL) from a terminal on most Linux and macOS systems?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Setting Up and Running Python",
    Option1: "python3",
    Option2: "python-m",
    Option3: "py3shell",
    Option4: "startpy",
    CorrectOption: 1,
  }),
  mcq({
    title: "Python 2 vs 3 Print Change",
    description:
      "Which change happened to print when moving from Python 2 to Python 3?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Python 2 vs Python 3",
    Option1: "print became a built-in function that requires parentheses around its arguments",
    Option2: "print was removed from the language entirely",
    Option3: "print now requires a semicolon after each call",
    Option4: "print only works with numbers now",
    CorrectOption: 1,
  }),
  mcq({
    title: "Py3 True Division Output",
    description:
      "The following line runs under Python 3. What exactly does it print?\n\nprint(7 / 2)",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Python 2 vs Python 3",
    Option1: "3.5",
    Option2: "3",
    Option3: "3.0",
    Option4: "It raises TypeError",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `print(7 / 2)`,
    snippetLang: "python",
  }),
  mcq({
    title: "Python 2 End of Life Date",
    description:
      "Python 2 reached its official end of life (no further fixes, even security ones) on which date?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Python Versions",
    Option1: "January 1, 2020",
    Option2: "December 31, 2019",
    Option3: "July 1, 2021",
    Option4: "January 1, 2015",
    CorrectOption: 1,
  }),
  mcq({
    title: "Not a Common Python Use Case",
    description:
      "Python is used across many industries. Which of these is NOT a common, typical use of Python?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "History and Use Cases of Python",
    Option1: "Writing an operating system kernel",
    Option2: "Automating file backups and report generation",
    Option3: "Data analysis and machine learning",
    Option4: "Building web applications",
    CorrectOption: 1,
  }),
  mcq({
    title: "Print Sep Parameter Output",
    description:
      "What does this Python 3 snippet print?\n\nprint(\"2024\", \"12\", \"25\", sep=\"-\")",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Setting Up and Running Python",
    Option1: "2024-12-25",
    Option2: "2024 12 25",
    Option3: "2024,12,25",
    Option4: "20241225",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `print("2024", "12", "25", sep="-")`,
    snippetLang: "python",
  }),
  mcq({
    title: "Py2 Integer Division Output",
    description:
      "This code is executed with a Python 2 interpreter, where / between two integers performs integer division. What does it print?\n\nprint(17 / 5)",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Python 2 vs Python 3",
    Option1: "3",
    Option2: "3.4",
    Option3: "3.5",
    Option4: "4",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `# executed under Python 2
print(17 / 5)`,
    snippetLang: "python",
  }),
  mcq({
    title: "Print End Parameter Output",
    description:
      "What is the complete output of this Python 3 snippet?\n\nprint(\"A\", end=\" \")\nprint(\"B\", end=\" \")\nprint(\"C\")",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Setting Up and Running Python",
    Option1: "A B C on a single line",
    Option2: "A, B and C each on its own line",
    Option3: "A B B C",
    Option4: "ABC with no spaces",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `print("A", end=" ")
print("B", end=" ")
print("C")`,
    snippetLang: "python",
  }),
  mcq({
    title: "REPL Full Form",
    description:
      "What does REPL stand for when describing the Python interactive shell?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Setting Up and Running Python",
    Option1: "Read-Eval-Print Loop",
    Option2: "Run-Execute-Program-Language",
    Option3: "Remote-Execution-Protocol-Layer",
    Option4: "Repeat-Enter-Print-Load",
    CorrectOption: 1,
  }),
  mcq({
    title: "Default str Encoding Change",
    description:
      "How did the default string type change from Python 2 to Python 3?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Python 2 vs Python 3",
    Option1: "Python 2's str held raw bytes (usually ASCII) while Python 3's str holds Unicode text",
    Option2: "Python 2's str held Unicode while Python 3's str holds raw bytes",
    Option3: "Both versions store strings as ASCII only",
    Option4: "Python 3 removed the str type completely",
    CorrectOption: 1,
  }),
  mcq({
    title: "F-strings Introduced In",
    description:
      "Formatted string literals, better known as f-strings (like f\"total: {x}\"), were introduced in which Python version?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Python Versions",
    Option1: "3.6",
    Option2: "2.7",
    Option3: "3.0",
    Option4: "3.10",
    CorrectOption: 1,
  }),
  mcq({
    title: "Print Sep and End Combined",
    description:
      "Taking both keyword parameters into account, what exactly does this snippet print?\n\nprint(\"1\", \"2\", sep=\"\", end=\"->\")\nprint(\"3\")",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Setting Up and Running Python",
    Option1: "12->3",
    Option2: "1 2 -> 3",
    Option3: "12-> and 3 on two separate lines",
    Option4: "1,2->3",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `print("1", "2", sep="", end="->")
print("3")`,
    snippetLang: "python",
  }),
  mcq({
    title: "String Repetition With Star",
    description:
      "What does this Python 3 snippet print?\n\nword = \"5\"\nprint(word * 3)",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Setting Up and Running Python",
    Option1: "555",
    Option2: "15",
    Option3: "5 5 5",
    Option4: "It raises TypeError",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `word = "5"
print(word * 3)`,
    snippetLang: "python",
  }),
  mcq({
    title: "Python Implementations Truth",
    description:
      "Python has several implementations. Which statement about them is TRUE?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "History and Use Cases of Python",
    Option1: "CPython is the reference implementation and is written in C",
    Option2: "IronPython compiles Python code to JVM bytecode",
    Option3: "PyPy is the interpreter officially bundled with Windows",
    Option4: "MicroPython can only run inside web browsers",
    CorrectOption: 1,
  }),
  mcq({
    title: "Division Operators Under Py3",
    description:
      "Running under Python 3, what output does this snippet produce?\n\nprint(9 / 2)\nprint(9 // 2)",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Python 2 vs Python 3",
    Option1: "4.5 on the first line and 4 on the second",
    Option2: "4 on the first line and 4.5 on the second",
    Option3: "4.5 on both lines",
    Option4: "4 on both lines",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `print(9 / 2)
print(9 // 2)`,
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
