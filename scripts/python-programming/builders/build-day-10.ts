/**
 * Builder for day 10 — "Error Handling and Exceptions" (20 code + 20 MCQ).
 * Run: bun scripts/python-programming/builders/build-day-10.ts
 */
import { mkdirSync, writeFileSync } from "node:fs";

const DIR = "/home/z/my-project/scripts/python-programming/data";
mkdirSync(DIR, { recursive: true });

const TOPIC_NAME = "Error Handling and Exceptions";
const SUBTOPICS = [
  "try-except Blocks",
  "Multiple and Specific except Clauses",
  "finally Clause",
  "Raising Exceptions",
  "Custom Exceptions",
];
const SUB = {
  tryx: "try-except Blocks",
  multi: "Multiple and Specific except Clauses",
  fin: "finally Clause",
  raise: "Raising Exceptions",
  custom: "Custom Exceptions",
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
    title: "Safe Quotient Guard",
    description:
      "A math worksheet generator divides numbers that students type, and a zero denominator must not crash it.\n" +
      "Read two integers, print their integer quotient, and guard the division with try/except ZeroDivisionError.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: integer a\n" +
      "Line 2: integer b\n" +
      "\n" +
      "Output Format:\n" +
      "Print a // b, or the exact line: Cannot divide by zero\n" +
      "\n" +
      "Constraints:\n" +
      "0 <= a <= 1000, 0 <= b <= 1000",
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.tryx,
    si1: "10\n2", so1: "5",
    si2: "7\n0", so2: "Cannot divide by zero",
    i1: "9\n3", o1: "3",
    i2: "100\n7", o2: "14",
    i3: "0\n5", o3: "0",
    inputconstrains: "0 <= a <= 1000, 0 <= b <= 1000",
    sourcecode:
`a = int(input())
b = int(input())
try:
    print(a // b)
except ZeroDivisionError:
    print("Cannot divide by zero")`,
  }),

  cq({
    title: "Cast Rescue Integer",
    description:
      "A data-entry tool converts typed values to integers, but operators sometimes mistype.\n" +
      "Read one line, convert it with int() inside try/except ValueError, and report either the number or the failure.\n" +
      "\n" +
      "Input Format:\n" +
      "One line: the raw value\n" +
      "\n" +
      "Output Format:\n" +
      "The integer if the conversion succeeds, otherwise exactly: Not a number\n" +
      "\n" +
      "Constraints:\n" +
      "Line length 1..20",
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.tryx,
    si1: "42", so1: "42",
    si2: "abc", so2: "Not a number",
    i1: "3.14", o1: "Not a number",
    i2: "  7 ", o2: "7",
    i3: "-5", o3: "-5",
    inputconstrains: "line length 1..20",
    sourcecode:
`line = input()
try:
    print(int(line))
except ValueError:
    print("Not a number")`,
  }),

  cq({
    title: "Index Rescue Lookup",
    description:
      "A lookup tool prints the item at a requested position of a number list, guarding against bad positions.\n" +
      "Read the list, then the index, and print the item - catching IndexError for out-of-range positions.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: space-separated integers\n" +
      "Line 2: the index k\n" +
      "\n" +
      "Output Format:\n" +
      "The number at index k, or exactly: Index out of range\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= len(nums) <= 20, 0 <= k <= 10",
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.multi,
    si1: "1 2 3\n1", so1: "2",
    si2: "1 2 3\n5", so2: "Index out of range",
    i1: "10 20\n0", o1: "10",
    i2: "4 5 6 7\n3", o2: "7",
    i3: "8\n1", o3: "Index out of range",
    inputconstrains: "1 <= len(nums) <= 20, 0 <= k <= 10",
    sourcecode:
`nums = list(map(int, input().split()))
k = int(input())
try:
    print(nums[k])
except IndexError:
    print("Index out of range")`,
  }),

  cq({
    title: "Missing Key Patrol",
    description:
      "A stockroom service maps item codes to shelf labels and must respond politely to unknown codes.\n" +
      "Read n key-value pairs, then a query key; print its value, catching KeyError for missing keys.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: n\n" +
      "Next n lines: key value (single words)\n" +
      "Last line: the query key\n" +
      "\n" +
      "Output Format:\n" +
      "The stored value, or exactly: Key not found\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= n <= 10, keys and values are single words",
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.tryx,
    si1: "2\nsku1 boxA\nsku2 boxB\nsku2", so1: "boxB",
    si2: "2\nsku1 boxA\nsku2 boxB\nsku9", so2: "Key not found",
    i1: "1\npen blue\npen", o1: "blue",
    i2: "1\npen blue\neraser", o2: "Key not found",
    i3: "3\na 1\nb 2\nc 3\na", o3: "1",
    inputconstrains: "1 <= n <= 10, keys and values are single words",
    sourcecode:
`n = int(input())
stock = {}
for _ in range(n):
    key, value = input().split()
    stock[key] = value
query = input()
try:
    print(stock[query])
except KeyError:
    print("Key not found")`,
  }),

  cq({
    title: "Audit Trail Order Demo",
    description:
      "A billing script demonstrates that a finally block runs after the main work, whatever happens.\n" +
      "Read an integer n, print n * 2 inside a try block, and print the audit line from a finally clause.\n" +
      "\n" +
      "Input Format:\n" +
      "One line: integer n\n" +
      "\n" +
      "Output Format:\n" +
      "Line 1: n * 2\n" +
      "Line 2: Audit done\n" +
      "\n" +
      "Constraints:\n" +
      "0 <= n <= 1000",
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.fin,
    si1: "5", so1: "10\nAudit done",
    si2: "0", so2: "0\nAudit done",
    i1: "12", o1: "24\nAudit done",
    i2: "9", o2: "18\nAudit done",
    i3: "3", o3: "6\nAudit done",
    inputconstrains: "0 <= n <= 1000",
    sourcecode:
`n = int(input())
try:
    print(n * 2)
finally:
    print("Audit done")`,
  }),

  cq({
    title: "Negative Amount Rejector",
    description:
      "A ledger clerk rejects negative amounts by raising a ValueError with a message and catching it to print the message.\n" +
      "Read an integer amount; if it is negative, raise ValueError(\"Negative amount\") and catch it to print the message; otherwise confirm acceptance.\n" +
      "\n" +
      "Input Format:\n" +
      "One line: integer amount\n" +
      "\n" +
      "Output Format:\n" +
      "Either exactly: Negative amount\n" +
      "Or: Accepted <amount>\n" +
      "\n" +
      "Constraints:\n" +
      "-1000 <= amount <= 1000",
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.raise,
    si1: "500", so1: "Accepted 500",
    si2: "-3", so2: "Negative amount",
    i1: "0", o1: "Accepted 0",
    i2: "-100", o2: "Negative amount",
    i3: "42", o3: "Accepted 42",
    inputconstrains: "-1000 <= amount <= 1000",
    sourcecode:
`amount = int(input())
try:
    if amount < 0:
        raise ValueError("Negative amount")
    print("Accepted", amount)
except ValueError as e:
    print(e)`,
  }),

  // ---------------- easy: scenarios ----------------
  cq({
    title: "Cab Fare Split Desk",
    description:
      "Friends split a weekend cab fare equally, and the desk app must survive a buggy entry of zero heads.\n" +
      "Read the fare and the number of heads; print each share using integer division inside try/except ZeroDivisionError with the exact error line.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: fare (integer)\n" +
      "Line 2: heads (integer)\n" +
      "\n" +
      "Output Format:\n" +
      "Either: Each pays: <fare // heads>\n" +
      "Or exactly: Heads cannot be zero\n" +
      "\n" +
      "Constraints:\n" +
      "0 <= fare <= 100000, 0 <= heads <= 50",
    difficulty: "easy",
    variant: "scenario",
    subtopic: SUB.tryx,
    si1: "1200\n4", so1: "Each pays: 300",
    si2: "1200\n0", so2: "Heads cannot be zero",
    i1: "999\n3", o1: "Each pays: 333",
    i2: "500\n7", o2: "Each pays: 71",
    i3: "250\n1", o3: "Each pays: 250",
    inputconstrains: "0 <= fare <= 100000, 0 <= heads <= 50",
    sourcecode:
`fare = int(input())
heads = int(input())
try:
    print(f"Each pays: {fare // heads}")
except ZeroDivisionError:
    print("Heads cannot be zero")`,
  }),

  cq({
    title: "Quiz Answer Validator",
    description:
      "A quiz host tablet looks up the official answer for a question id typed by the host.\n" +
      "Read n id-answer pairs, then a query id; print the answer, catching KeyError for unknown ids.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: n\n" +
      "Next n lines: qid answer (single words)\n" +
      "Last line: the query qid\n" +
      "\n" +
      "Output Format:\n" +
      "Either: Answer: <answer>\n" +
      "Or exactly: Unknown question\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= n <= 10, ids and answers are single words",
    difficulty: "easy",
    variant: "scenario",
    subtopic: SUB.multi,
    si1: "2\nq1 Paris\nq2 Delhi\nq1", so1: "Answer: Paris",
    si2: "2\nq1 Paris\nq2 Delhi\nq3", so2: "Unknown question",
    i1: "1\na10 42\na10", o1: "Answer: 42",
    i2: "3\nw1 Oslo\nw2 Lima\nw3 Cairo\nw3", o2: "Answer: Cairo",
    i3: "1\na10 42\nzz", o3: "Unknown question",
    inputconstrains: "1 <= n <= 10, ids and answers are single words",
    sourcecode:
`n = int(input())
answers = {}
for _ in range(n):
    qid, ans = input().split()
    answers[qid] = ans
query = input()
try:
    print("Answer:", answers[query])
except KeyError:
    print("Unknown question")`,
  }),

  cq({
    title: "ATM Cashout Safety Gate",
    description:
      "An ATM refuses withdrawals larger than the balance by raising ValueError(\"Insufficient funds\") and catching it to print the message.\n" +
      "Read the balance and the requested amount.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: balance (integer)\n" +
      "Line 2: amount (integer)\n" +
      "\n" +
      "Output Format:\n" +
      "Either: Dispensed <amount>\n" +
      "Or exactly: Insufficient funds\n" +
      "\n" +
      "Constraints:\n" +
      "0 <= balance <= 100000, 0 <= amount <= 100000",
    difficulty: "easy",
    variant: "scenario",
    subtopic: SUB.raise,
    si1: "5000\n2000", so1: "Dispensed 2000",
    si2: "500\n900", so2: "Insufficient funds",
    i1: "1000\n1000", o1: "Dispensed 1000",
    i2: "0\n1", o2: "Insufficient funds",
    i3: "750\n0", o3: "Dispensed 0",
    inputconstrains: "0 <= balance <= 100000, 0 <= amount <= 100000",
    sourcecode:
`balance = int(input())
amount = int(input())
try:
    if amount > balance:
        raise ValueError("Insufficient funds")
    print("Dispensed", amount)
except ValueError as e:
    print(e)`,
  }),

  cq({
    title: "Robust Age Parser",
    description:
      "A hospital kiosk asks visitors to type their age; sometimes the screen gets junk.\n" +
      "Read the typed line, convert it with int() inside try/except ValueError, and answer politely.\n" +
      "\n" +
      "Input Format:\n" +
      "One line: the typed age value\n" +
      "\n" +
      "Output Format:\n" +
      "Either: Age: <value>\n" +
      "Or exactly: Invalid age\n" +
      "\n" +
      "Constraints:\n" +
      "Line length 1..10",
    difficulty: "easy",
    variant: "scenario",
    subtopic: SUB.tryx,
    si1: "30", so1: "Age: 30",
    si2: "thirty", so2: "Invalid age",
    i1: "12", o1: "Age: 12",
    i2: "9.5", o2: "Invalid age",
    i3: " 65 ", o3: "Age: 65",
    inputconstrains: "line length 1..10",
    sourcecode:
`line = input()
try:
    age = int(line)
    print("Age:", age)
except ValueError:
    print("Invalid age")`,
  }),

  // ---------------- medium ----------------
  cq({
    title: "Attendance Batch Parser",
    description:
      "A school office scans register entries one per line; smudged lines are not numbers.\n" +
      "Parse each line in its own try/except ValueError, collect the line numbers that failed, and report them numbered, followed by the counts.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: n, the number of entries\n" +
      "Next n lines: each entry (a valid integer or garbage)\n" +
      "\n" +
      "Output Format:\n" +
      "First, one line per bad entry, in order: Line <i>: invalid entry\n" +
      "Then: Valid entries: <count>\n" +
      "Then: Invalid entries: <count>\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= n <= 50, each line length 1..20",
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.tryx,
    si1: "5\n101\nabc\n102\nxyz\n103",
    so1: "Line 2: invalid entry\nLine 4: invalid entry\nValid entries: 3\nInvalid entries: 2",
    si2: "3\n7\n8\n9",
    so2: "Valid entries: 3\nInvalid entries: 0",
    i1: "4\n12a\n34\n5x\n56",
    o1: "Line 1: invalid entry\nLine 3: invalid entry\nValid entries: 2\nInvalid entries: 2",
    i2: "1\nzero",
    o2: "Line 1: invalid entry\nValid entries: 0\nInvalid entries: 1",
    i3: "6\n1\n2\n3\n4\n5\n6",
    o3: "Valid entries: 6\nInvalid entries: 0",
    inputconstrains: "1 <= n <= 50, each line length 1..20",
    blacklist: "raise",
    whitelist: "except ValueError",
    sourcecode:
`n = int(input())
errors = []
valid = 0
for i in range(1, n + 1):
    line = input()
    try:
        int(line)
        valid += 1
    except ValueError:
        errors.append(i)
for i in errors:
    print(f"Line {i}: invalid entry")
print(f"Valid entries: {valid}")
print(f"Invalid entries: {len(errors)}")`,
  }),

  cq({
    title: "Data Repair Bench",
    description:
      "A data-repair macro replays saved operations; some crash, and the bench must print a verdict per operation. ValueError and ZeroDivisionError are caught by their own specific clauses, and everything else falls through to the generic handler that names the exception type.\n" +
      "Operations (tokens separated by single spaces):\n" +
      "- SUM a b: print int(a) + int(b)\n" +
      "- DIV a b: print int(a) // int(b)\n" +
      "- PICK i: print boxes[int(i)] where boxes = [\"crate\", \"pallet\", \"bin\"]\n" +
      "- LOOK key: print rates[key] where rates = {\"bolt\": 5, \"nut\": 2}\n" +
      "Verdicts: a ValueError prints BAD NUMBER; a ZeroDivisionError prints DIV BY ZERO; the generic except Exception handler prints GENERIC <TypeName> using type(e).__name__.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: n\n" +
      "Next n lines: one operation each\n" +
      "\n" +
      "Output Format:\n" +
      "One verdict line per operation, in order.\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= n <= 20, PICK index 0..10, SUM/DIV arguments are integer strings or garbage",
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.multi,
    si1: "4\nSUM 2 3\nDIV 9 0\nPICK 5\nLOOK bolt",
    so1: "5\nDIV BY ZERO\nGENERIC IndexError\n5",
    si2: "3\nSUM 10 20\nDIV 7 2\nLOOK nut",
    so2: "30\n3\n2",
    i1: "4\nSUM x 1\nDIV 8 2\nPICK 0\nLOOK washer",
    o1: "BAD NUMBER\n4\ncrate\nGENERIC KeyError",
    i2: "2\nSUM 1.5 2\nPICK 2",
    o2: "BAD NUMBER\nbin",
    i3: "3\nDIV 5 0\nPICK 1\nLOOK nut",
    o3: "DIV BY ZERO\npallet\n2",
    inputconstrains: "1 <= n <= 20, PICK index 0..10, SUM/DIV args are integer strings or garbage",
    blacklist: "IndexError, KeyError",
    whitelist: "except Exception",
    sourcecode:
`n = int(input())
boxes = ["crate", "pallet", "bin"]
rates = {"bolt": 5, "nut": 2}
for _ in range(n):
    parts = input().split()
    op = parts[0]
    try:
        if op == "SUM":
            print(int(parts[1]) + int(parts[2]))
        elif op == "DIV":
            print(int(parts[1]) // int(parts[2]))
        elif op == "PICK":
            print(boxes[int(parts[1])])
        else:
            print(rates[parts[1]])
    except ValueError:
        print("BAD NUMBER")
    except ZeroDivisionError:
        print("DIV BY ZERO")
    except Exception as e:
        print("GENERIC", type(e).__name__)`,
  }),

  cq({
    title: "Grade Sheet Commit",
    description:
      "A university upload tool commits a bonus-marks update only when the new total stays within the 100-mark cap; otherwise it rolls back.\n" +
      "Either way, the finally clause prints the audit line last.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: current total (integer)\n" +
      "Line 2: bonus marks (integer)\n" +
      "\n" +
      "Output Format:\n" +
      "If total + bonus <= 100: COMMIT <bonus> then AUDIT total=<new total>\n" +
      "Otherwise: ROLLBACK <bonus> then AUDIT total=<unchanged total>\n" +
      "\n" +
      "Constraints:\n" +
      "0 <= total <= 100, 0 <= bonus <= 100",
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.fin,
    si1: "85\n10", so1: "COMMIT 10\nAUDIT total=95",
    si2: "95\n10", so2: "ROLLBACK 10\nAUDIT total=95",
    i1: "90\n10", o1: "COMMIT 10\nAUDIT total=100",
    i2: "100\n1", o2: "ROLLBACK 1\nAUDIT total=100",
    i3: "0\n45", o3: "COMMIT 45\nAUDIT total=45",
    inputconstrains: "0 <= total <= 100, 0 <= bonus <= 100",
    blacklist: "sys., os.",
    whitelist: "finally:",
    sourcecode:
`total = int(input())
bonus = int(input())
new_total = total
try:
    if total + bonus > 100:
        raise ValueError("over cap")
    new_total = total + bonus
    print("COMMIT", bonus)
except ValueError:
    print("ROLLBACK", bonus)
finally:
    print(f"AUDIT total={new_total}")`,
  }),

  cq({
    title: "Cart Limit Custom Error",
    description:
      "A shopping cart caps the total item count at 10.\n" +
      "Define a custom exception class CartLimitError(Exception) and raise it when an add operation would overflow the cart; catch it and print its message; operations after the overflow are ignored.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: n, the number of add operations\n" +
      "Next n lines: item qty (item is a single word, qty an integer)\n" +
      "\n" +
      "Output Format:\n" +
      "Per successful add: Added <item> x<qty>\n" +
      "On the first overflow: Cart is full\n" +
      "Finally: Items in cart: <count>\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= n <= 20, 1 <= qty <= 20, items are single words",
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.custom,
    si1: "3\nnotebook 2\npen 5\neraser 4",
    so1: "Added notebook x2\nAdded pen x5\nCart is full\nItems in cart: 7",
    si2: "2\napple 3\nmango 4",
    so2: "Added apple x3\nAdded mango x4\nItems in cart: 7",
    i1: "1\nlamp 11",
    o1: "Cart is full\nItems in cart: 0",
    i2: "3\na 10\nb 1\nc 1",
    o2: "Added a x10\nCart is full\nItems in cart: 10",
    i3: "2\nx 5\ny 5",
    o3: "Added x x5\nAdded y x5\nItems in cart: 10",
    inputconstrains: "1 <= n <= 20, 1 <= qty <= 20, items are single words",
    blacklist: "exit(, sys.",
    whitelist: "class , raise ",
    sourcecode:
`class CartLimitError(Exception):
    pass

n = int(input())
count = 0
try:
    for _ in range(n):
        parts = input().split()
        item = parts[0]
        qty = int(parts[1])
        if count + qty > 10:
            raise CartLimitError("Cart is full")
        count += qty
        print("Added", item, "x" + str(qty))
except CartLimitError as e:
    print(e)
print("Items in cart:", count)`,
  }),

  cq({
    title: "Ticket Escalation Chain",
    description:
      "A helpdesk routes critical tickets upward: the routing step logs the ticket and then re-raises the alert so the outer handler prints the escalation line.\n" +
      "For each ticket: if the severity is critical, print LOG <id> from the inner handler, re-raise with a bare raise, and let the outer handler print ESCALATED: <message> where the message is: Ticket <id> needs a human. Non-critical tickets print OK <id>.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: n\n" +
      "Next n lines: ticket_id severity (severity is one of: low, major, minor, critical)\n" +
      "\n" +
      "Output Format:\n" +
      "One or two lines per ticket, in order: OK <id>, or LOG <id> followed by ESCALATED: Ticket <id> needs a human\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= n <= 20, ids 1..10 chars, severity in low, major, minor, critical",
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.raise,
    si1: "3\nT1 low\nT2 critical\nT3 low",
    so1: "OK T1\nLOG T2\nESCALATED: Ticket T2 needs a human\nOK T3",
    si2: "2\nA9 minor\nB7 major",
    so2: "OK A9\nOK B7",
    i1: "1\nZ1 critical",
    o1: "LOG Z1\nESCALATED: Ticket Z1 needs a human",
    i2: "4\nC1 critical\nC2 critical\nC3 low\nC4 critical",
    o2: "LOG C1\nESCALATED: Ticket C1 needs a human\nLOG C2\nESCALATED: Ticket C2 needs a human\nOK C3\nLOG C4\nESCALATED: Ticket C4 needs a human",
    i3: "2\nR5 low\nR6 major",
    o3: "OK R5\nOK R6",
    inputconstrains: "1 <= n <= 20, ids 1..10 chars, severity in low, major, minor, critical",
    blacklist: "traceback, exit(",
    whitelist: "raise, except RuntimeError",
    sourcecode:
`n = int(input())

def process(tid, severity):
    try:
        if severity == "critical":
            raise RuntimeError("Ticket " + tid + " needs a human")
    except RuntimeError:
        print("LOG", tid)
        raise
    print("OK", tid)

for _ in range(n):
    tid, severity = input().split()
    try:
        process(tid, severity)
    except RuntimeError as e:
        print("ESCALATED:", e)`,
  }),

  cq({
    title: "Server Config Probe",
    description:
      "An ops dashboard probes configuration keys one query at a time; missing keys must be handled with try/except KeyError (dict.get is banned on this dashboard).\n" +
      "Read n key-value pairs, then m queries; per query print the value or the missing notice.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: n\n" +
      "Next n lines: key value (single words)\n" +
      "Line n+2: m\n" +
      "Last m lines: one query key per line\n" +
      "\n" +
      "Output Format:\n" +
      "Per query: the stored value, or exactly: MISSING: <key>\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= n <= 10, 1 <= m <= 10, keys and values are single words",
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.multi,
    si1: "3\nhost server1\nport 8080\nmode prod\n3\nport\ntz\nhost",
    so1: "8080\nMISSING: tz\nserver1",
    si2: "1\nlang py\n1\nlang",
    so2: "py",
    i1: "2\na 1\nb 2\n2\nb\nc",
    o1: "2\nMISSING: c",
    i2: "3\nx 10\ny 20\nz 30\n4\nx\ny\nz\nw",
    o2: "10\n20\n30\nMISSING: w",
    i3: "1\ndb mysql\n2\ndb\ncache",
    o3: "mysql\nMISSING: cache",
    inputconstrains: "1 <= n <= 10, 1 <= m <= 10, keys and values are single words",
    blacklist: ".get(",
    whitelist: "except KeyError",
    sourcecode:
`n = int(input())
config = {}
for _ in range(n):
    key, value = input().split()
    config[key] = value
m = int(input())
for _ in range(m):
    key = input()
    try:
        print(config[key])
    except KeyError:
        print("MISSING: " + key)`,
  }),

  // ---------------- hard ----------------
  cq({
    title: "Form Validator Three Errors",
    description:
      "A signup pipeline validates every field of every applicant and never stops at the first problem.\n" +
      "Define three custom exception classes: BlankFieldError, BadFormatError and OutOfRangeError (all subclass Exception), raise them from a validator function, and catch each with its own except clause.\n" +
      "Rules per field: a field submitted as a single hyphen - is blank (BlankFieldError). The email field must contain both @ and . (otherwise BadFormatError). The age field must be a digit string (otherwise BadFormatError) whose value is between 1 and 120 inclusive (otherwise OutOfRangeError). The name field has no extra rule beyond blankness.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: n, the number of applicants\n" +
      "Per applicant, 3 lines: name, email, age\n" +
      "\n" +
      "Output Format:\n" +
      "Per field, in order: <field>: OK or <field>: <ExceptionName>\n" +
      "Per applicant: Valid fields: <good>/3\n" +
      "Finally: Applicants fully valid: <count>\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= n <= 5, each field line 1..40 chars, a lone hyphen marks blank",
    difficulty: "hard",
    variant: "scenario",
    subtopic: SUB.custom,
    si1: "1\nravi\nravi@ex.com\n30",
    so1: "name: OK\nemail: OK\nage: OK\nValid fields: 3/3\nApplicants fully valid: 1",
    si2: "1\n-\nno-at-sign\n200",
    so2: "name: BlankFieldError\nemail: BadFormatError\nage: OutOfRangeError\nValid fields: 0/3\nApplicants fully valid: 0",
    i1: "2\nasha\nasha@mail.co\n28\nvik\nvik-at-mail\nabc",
    o1: "name: OK\nemail: OK\nage: OK\nValid fields: 3/3\nname: OK\nemail: BadFormatError\nage: BadFormatError\nValid fields: 1/3\nApplicants fully valid: 1",
    i2: "1\nsam\n-\n-5",
    o2: "name: OK\nemail: BlankFieldError\nage: BadFormatError\nValid fields: 1/3\nApplicants fully valid: 0",
    i3: "2\nlee\nlee@x.y\n0\nmo\nmo@a.b\n120",
    o3: "name: OK\nemail: OK\nage: OutOfRangeError\nValid fields: 2/3\nname: OK\nemail: OK\nage: OK\nValid fields: 3/3\nApplicants fully valid: 1",
    inputconstrains: "1 <= n <= 5, each field line 1..40 chars, lone hyphen marks blank",
    blacklist: "exit(, sys.",
    whitelist: "class , raise ",
    sourcecode:
`class BlankFieldError(Exception):
    pass

class BadFormatError(Exception):
    pass

class OutOfRangeError(Exception):
    pass

def validate(kind, raw):
    if raw == "-":
        raise BlankFieldError()
    if kind == "email":
        if "@" not in raw or "." not in raw:
            raise BadFormatError()
    elif kind == "age":
        if not raw.isdigit():
            raise BadFormatError()
        if not (1 <= int(raw) <= 120):
            raise OutOfRangeError()

n = int(input())
fully_valid = 0
for _ in range(n):
    name = input()
    email = input()
    age = input()
    rows = []
    good = 0
    for kind, raw in (("name", name), ("email", email), ("age", age)):
        try:
            validate(kind, raw)
            rows.append(kind + ": OK")
            good += 1
        except BlankFieldError:
            rows.append(kind + ": BlankFieldError")
        except BadFormatError:
            rows.append(kind + ": BadFormatError")
        except OutOfRangeError:
            rows.append(kind + ": OutOfRangeError")
    for r in rows:
        print(r)
    print(f"Valid fields: {good}/3")
    if good == 3:
        fully_valid += 1
print(f"Applicants fully valid: {fully_valid}")`,
  }),

  cq({
    title: "Reactor Shutdown Sequence",
    description:
      "A reactor console runs a comma-separated step list inside a nested try/finally: every step has a cleanup guarantee, a failure aborts the rest, and the reactor is always released.\n" +
      "Steps BOOT, SCAN and VENT print run <step> then cleanup <step>; FAIL raises RuntimeError(\"step FAIL exploded\"). The inner finally prints cleanup <step> even for a failing step. The outer handler prints abort: <message> and skips the remaining steps, and the outer finally prints release reactor. When every step succeeds the console prints all steps complete before releasing.\n" +
      "\n" +
      "Input Format:\n" +
      "One line: comma-separated steps from BOOT, SCAN, VENT, FAIL\n" +
      "\n" +
      "Output Format:\n" +
      "The deterministic console transcript, one line per event.\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= steps <= 10, steps from BOOT, SCAN, VENT, FAIL",
    difficulty: "hard",
    variant: "scenario",
    subtopic: SUB.fin,
    si1: "BOOT,SCAN,VENT",
    so1: "acquire reactor\nrun BOOT\ncleanup BOOT\nrun SCAN\ncleanup SCAN\nrun VENT\ncleanup VENT\nall steps complete\nrelease reactor",
    si2: "BOOT,FAIL,VENT",
    so2: "acquire reactor\nrun BOOT\ncleanup BOOT\ncleanup FAIL\nabort: step FAIL exploded\nrelease reactor",
    i1: "FAIL",
    o1: "acquire reactor\ncleanup FAIL\nabort: step FAIL exploded\nrelease reactor",
    i2: "SCAN,SCAN,VENT,BOOT",
    o2: "acquire reactor\nrun SCAN\ncleanup SCAN\nrun SCAN\ncleanup SCAN\nrun VENT\ncleanup VENT\nrun BOOT\ncleanup BOOT\nall steps complete\nrelease reactor",
    i3: "VENT,FAIL",
    o3: "acquire reactor\nrun VENT\ncleanup VENT\ncleanup FAIL\nabort: step FAIL exploded\nrelease reactor",
    inputconstrains: "1 <= steps <= 10, steps from BOOT, SCAN, VENT, FAIL",
    blacklist: "exit(, os.",
    whitelist: "finally:, except ",
    sourcecode:
`steps = input().split(",")
print("acquire reactor")
try:
    for step in steps:
        try:
            if step == "FAIL":
                raise RuntimeError("step FAIL exploded")
            print("run " + step)
        finally:
            print("cleanup " + step)
    print("all steps complete")
except RuntimeError as e:
    print("abort: " + str(e))
finally:
    print("release reactor")`,
  }),

  cq({
    title: "Batch Settlement Engine",
    description:
      "A payment switch replays a batch of stored operations; each operation is dispatched to a guarded runner and failures are collected instead of crashing the batch.\n" +
      "The switch catches everything with except Exception as e and records the exception's class name via type(e).__name__.\n" +
      "Operations: DIV a b (integer division int(a) // int(b)), PARSE s (int(s)), GET key (rate_table[key] with rate_table = {\"plan1\": 199, \"plan2\": 499}).\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: n\n" +
      "Next n lines: one operation each\n" +
      "\n" +
      "Output Format:\n" +
      "Per successful operation, immediately: OK <line number> <value>\n" +
      "After all operations: Failed: <count>\n" +
      "Then one line per failure, in order: <line number> <ExceptionTypeName>\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= n <= 20, GET key may be plan1, plan2 or unknown, DIV/PARSE args are integer strings or garbage",
    difficulty: "hard",
    variant: "scenario",
    subtopic: SUB.multi,
    si1: "4\nDIV 100 2\nDIV 9 0\nPARSE 55\nGET plan9",
    so1: "OK 1 50\nOK 3 55\nFailed: 2\n2 ZeroDivisionError\n4 KeyError",
    si2: "3\nPARSE 12\nGET plan1\nDIV 8 4",
    so2: "OK 1 12\nOK 2 199\nOK 3 2\nFailed: 0",
    i1: "3\nPARSE abc\nDIV 5 x\nGET plan2",
    o1: "OK 3 499\nFailed: 2\n1 ValueError\n2 ValueError",
    i2: "2\nGET plan1\nGET plan2",
    o2: "OK 1 199\nOK 2 499\nFailed: 0",
    i3: "3\nPARSE 7.5\nDIV 1 0\nGET plan1",
    o3: "OK 3 199\nFailed: 2\n1 ValueError\n2 ZeroDivisionError",
    inputconstrains: "1 <= n <= 20, DIV/PARSE args are integer strings or garbage, GET key any single word",
    blacklist: "except ValueError, except KeyError, except ZeroDivisionError",
    whitelist: "except Exception as e",
    sourcecode:
`rate_table = {"plan1": 199, "plan2": 499}

def run(op, args):
    if op == "DIV":
        return int(args[0]) // int(args[1])
    if op == "PARSE":
        return int(args[0])
    return rate_table[args[0]]

n = int(input())
failures = []
for i in range(1, n + 1):
    parts = input().split()
    try:
        value = run(parts[0], parts[1:])
        print("OK", i, value)
    except Exception as e:
        failures.append((i, type(e).__name__))
print("Failed:", len(failures))
for i, name in failures:
    print(i, name)`,
  }),

  cq({
    title: "Gateway Charge Chainer",
    description:
      "A payment gateway parses each transaction amount.\n" +
      "When the amount text is not an integer, the parser catches ValueError and raises a custom GatewayError chained with from, carrying the message DECLINED: bad amount <raw>. The outer loop catches only GatewayError and prints its message; valid amounts print CHARGED <amount>.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: n\n" +
      "Next n lines: one amount text per line (digit string or garbage)\n" +
      "\n" +
      "Output Format:\n" +
      "Per transaction, in order: CHARGED <amount> or DECLINED: bad amount <raw>\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= n <= 20, each line length 1..9",
    difficulty: "hard",
    variant: "scenario",
    subtopic: SUB.raise,
    si1: "3\n500\n12x\n77",
    so1: "CHARGED 500\nDECLINED: bad amount 12x\nCHARGED 77",
    si2: "2\nabc\n0",
    so2: "DECLINED: bad amount abc\nCHARGED 0",
    i1: "4\n1\n2\nxy\n3",
    o1: "CHARGED 1\nCHARGED 2\nDECLINED: bad amount xy\nCHARGED 3",
    i2: "2\n9z8\n42",
    o2: "DECLINED: bad amount 9z8\nCHARGED 42",
    i3: "1\n1000",
    o3: "CHARGED 1000",
    inputconstrains: "1 <= n <= 20, each line length 1..9",
    blacklist: "traceback, sys.",
    whitelist: "class , raise ",
    sourcecode:
`class GatewayError(Exception):
    pass

def charge(raw):
    try:
        amount = int(raw)
    except ValueError as err:
        raise GatewayError("DECLINED: bad amount " + raw) from err
    print("CHARGED", amount)

n = int(input())
for _ in range(n):
    raw = input()
    try:
        charge(raw)
    except GatewayError as e:
        print(e)`,
  }),
];

/* ============================== MCQs ============================== */

const mcqs = [
  mq({
    title: "Divide By Zero Exception",
    description: "What exception does the expression 10 / 0 raise in Python 3?",
    difficulty: "easy",
    subtopic: SUB.tryx,
    options: ["ZeroDivisionError", "ValueError", "TypeError", "KeyError"],
    correct: 1,
  }),
  mq({
    title: "Int Cast Failure Type",
    description: "What exception does the call int('abc') raise?",
    difficulty: "easy",
    subtopic: SUB.tryx,
    options: ["TypeError", "ValueError", "KeyError", "SyntaxError"],
    correct: 2,
  }),
  mq({
    title: "Try Flow With Division",
    description: "What does this Python snippet print?",
    difficulty: "easy",
    subtopic: SUB.tryx,
    options: ["A, B and C, each on its own line", "Only A", "A and C, each on its own line", "A and B, each on its own line"],
    correct: 3,
    snippet:
`try:
    print("A")
    x = 1 / 0
    print("B")
except ZeroDivisionError:
    print("C")`,
  }),
  mq({
    title: "Missing Dict Key Exception",
    description: "Accessing a dictionary key that does not exist, for example d['ghost'], raises which exception?",
    difficulty: "easy",
    subtopic: SUB.tryx,
    options: ["KeyError", "IndexError", "ValueError", "AttributeError"],
    correct: 1,
  }),
  mq({
    title: "Finally Always Runs",
    description: "When does the finally block of a try statement execute?",
    difficulty: "easy",
    subtopic: SUB.fin,
    options: ["Only when no exception occurred", "Always, whether or not an exception occurred", "Only when an exception occurred", "Only when the try block returns a value"],
    correct: 2,
  }),
  mq({
    title: "List Index Guard Output",
    description: "What does this Python snippet print?",
    difficulty: "easy",
    subtopic: SUB.tryx,
    options: ["3", "5", "Out of range", "The program crashes with an unhandled IndexError"],
    correct: 3,
    snippet:
`nums = [1, 2, 3]
try:
    print(nums[5])
except IndexError:
    print("Out of range")`,
  }),
  mq({
    title: "Manual Raise Keyword",
    description: "Which keyword raises an exception manually in Python?",
    difficulty: "easy",
    subtopic: SUB.raise,
    options: ["throw", "exception", "raise", "err"],
    correct: 3,
  }),
  mq({
    title: "Finally After Try Output",
    description: "What does this Python snippet print?",
    difficulty: "easy",
    subtopic: SUB.fin,
    options: ["X then Y, each on its own line", "Y then X, each on its own line", "Only X", "Only Y"],
    correct: 1,
    snippet:
`try:
    print("X")
finally:
    print("Y")`,
  }),
  mq({
    title: "Except Matching Rule",
    description: "A try statement has several except clauses. How does Python decide which clause handles a raised exception?",
    difficulty: "easy",
    subtopic: SUB.multi,
    options: ["It always prefers the most generic clause", "It runs every matching clause", "It runs the last matching clause", "It checks the clauses top to bottom and runs the first matching one"],
    correct: 4,
  }),
  mq({
    title: "Missing Key Guard Output",
    description: "What does this Python snippet print?",
    difficulty: "easy",
    subtopic: SUB.tryx,
    options: ["1", "missing", "The program crashes with an unhandled KeyError", "k"],
    correct: 2,
    snippet:
`d = {"k": 1}
try:
    print(d["m"])
except KeyError:
    print("missing")`,
  }),
  mq({
    title: "Specific Before Generic",
    description: "What does this Python snippet print?",
    difficulty: "medium",
    subtopic: SUB.multi,
    options: ["specific", "generic", "specific then generic, each on its own line", "ValueError: v"],
    correct: 1,
    snippet:
`try:
    raise ValueError("v")
except ValueError:
    print("specific")
except Exception:
    print("generic")`,
  }),
  mq({
    title: "Generic Exception Catch",
    description: "What does this Python snippet print?",
    difficulty: "medium",
    subtopic: SUB.multi,
    options: ["'k'", "The program crashes with an unhandled KeyError", "caught", "k"],
    correct: 3,
    snippet:
`try:
    d = {}
    print(d["k"])
except Exception:
    print("caught")`,
  }),
  mq({
    title: "Finally With Return",
    description: "What does this Python snippet print? (Think about when the finally block runs relative to the return.)",
    difficulty: "medium",
    subtopic: SUB.fin,
    options: ["try then finally, each on its own line", "finally then try, each on its own line", "Only try", "Only finally"],
    correct: 2,
    snippet:
`def f():
    try:
        return "try"
    finally:
        print("finally")
print(f())`,
  }),
  mq({
    title: "Re-Raise Propagation",
    description: "What does this Python snippet print? (A bare raise inside except re-raises the same exception.)",
    difficulty: "medium",
    subtopic: SUB.raise,
    options: ["None", "boom", "The program crashes with an unhandled ValueError", "ValueError"],
    correct: 2,
    snippet:
`def f():
    try:
        raise ValueError("boom")
    except ValueError:
        raise
try:
    f()
except ValueError as e:
    print(e)`,
  }),
  mq({
    title: "Else Clause On Try",
    description: "What does this Python snippet print? (The else clause runs only when no exception was raised.)",
    difficulty: "medium",
    subtopic: SUB.tryx,
    options: ["E", "OK then E, each on its own line", "4", "OK"],
    correct: 4,
    snippet:
`try:
    x = 2 + 2
except ValueError:
    print("E")
else:
    print("OK")`,
  }),
  mq({
    title: "Exception Args Attribute",
    description: "For the exception object e = ValueError('bad input'), what is e.args?",
    difficulty: "medium",
    subtopic: SUB.raise,
    options: ["('bad input',)", "'bad input'", "['bad input']", "bad input"],
    correct: 1,
  }),
  mq({
    title: "Nested Try Inner Catch",
    description: "What does this Python snippet print?",
    difficulty: "hard",
    subtopic: SUB.tryx,
    options: ["caught inner then outer, each on its own line", "caught inner then after inner, each on its own line", "Only outer", "Only caught inner"],
    correct: 2,
    snippet:
`try:
    try:
        raise ValueError("inner")
    except ValueError:
        print("caught inner")
    print("after inner")
except ValueError:
    print("outer")`,
  }),
  mq({
    title: "Custom Error Type Name",
    description: "What does this Python snippet print? (type(e).__name__ gives the class name.)",
    difficulty: "hard",
    subtopic: SUB.custom,
    options: ["Exception fail", "fail", "AppError", "AppError fail"],
    correct: 4,
    snippet:
`class AppError(Exception):
    pass
try:
    raise AppError("fail")
except Exception as e:
    print(type(e).__name__, e)`,
  }),
  mq({
    title: "KeyError Print Quoting",
    description: "What does this Python snippet print? (Careful: str(KeyError('k')) shows the key with repr-style quotes, and finally runs before propagation.)",
    difficulty: "hard",
    subtopic: SUB.fin,
    options: ["F then k without quotes, each on its own line", "k then F, each on its own line", "F then 'k' with quotes, each on its own line", "Only F"],
    correct: 3,
    snippet:
`def f():
    try:
        raise KeyError("k")
    finally:
        print("F")
try:
    f()
except KeyError as e:
    print(e)`,
  }),
  mq({
    title: "Finally Return Order",
    description: "What does this Python snippet print? (The finally block runs before the function actually returns.)",
    difficulty: "hard",
    subtopic: SUB.fin,
    options: ["F then E, each on its own line", "E then F, each on its own line", "ok, F then E, each on its own line", "Only E"],
    correct: 1,
    snippet:
`def f(n):
    try:
        if n == 0:
            raise ValueError()
        print("ok")
    except ValueError:
        return "E"
    finally:
        print("F")
print(f(0))`,
  }),
];

writeFileSync(
  DIR + "/day-10.code.json",
  JSON.stringify({ day: 10, topics: [{ name: TOPIC_NAME, subtopics: SUBTOPICS }], questions }, null, 2)
);
writeFileSync(
  DIR + "/day-10.mcq.json",
  JSON.stringify({ day: 10, questions: mcqs }, null, 2)
);
console.log("wrote day 10:", questions.length, "code,", mcqs.length, "mcq");
