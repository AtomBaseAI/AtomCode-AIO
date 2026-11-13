/**
 * Builder for Day 5 — "Loops" (topic: Loops).
 * Writes data/day-05.code.json (20 code questions) and data/day-05.mcq.json (20 MCQs).
 * Run: bun scripts/python-programming/builders/build-day-05.ts
 */
import { writeFileSync } from "node:fs";

const OUT = "/home/z/my-project/scripts/python-programming/data";
const TOPIC_NAME = "Loops";
const SUBTOPICS = [
  "for Loop",
  "while Loop",
  "range Function",
  "break and continue",
  "Nested Loops",
  "else Clause with Loops",
];

const topics = [{ name: TOPIC_NAME, subtopics: [...SUBTOPICS] }];

const desc = (p: string, i: string, o: string, c: string) =>
  `${p}\n\nInput Format:\n${i}\n\nOutput Format:\n${o}\n\nConstraints:\n${c}`;

function q(over: Record<string, any>) {
  return {
    lang: "python",
    topic: TOPIC_NAME,
    maxscore: 10,
    blacklist: "",
    whitelist: "",
    ...over,
  };
}

function mcq(over: Record<string, any>) {
  return {
    topic: TOPIC_NAME,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
    ...over,
  };
}

/* ─────────────────────────  CODE QUESTIONS (20)  ───────────────────────── */

const questions = [
  q({
    title: "Sum of First N Naturals with For",
    description: desc(
      "Read an integer n and print the sum 1 + 2 + ... + n using a for loop over range.",
      "One integer n.",
      "One line containing the sum.",
      "1 <= n <= 1000"
    ),
    difficulty: "easy",
    variant: "basic",
    subtopic: "for Loop",
    sampleinput1: "5",
    sampleoutput1: "15",
    sampleinput2: "1",
    sampleoutput2: "1",
    input1: "100", output1: "5050",
    input2: "7", output2: "28",
    input3: "10", output3: "55",
    inputconstrains: "1 <= n <= 1000",
    sourcecode: `n = int(input())
total = 0
for i in range(1, n + 1):
    total += i
print(total)`,
  }),

  q({
    title: "Countdown with a While Loop",
    description: desc(
      "Read an integer n and print a countdown from n down to 1 using a while loop, one number per line, followed by the word Go!.",
      "One integer n.",
      "The numbers n, n-1, ..., 1 on separate lines, then Go! on the last line.",
      "1 <= n <= 100"
    ),
    difficulty: "easy",
    variant: "basic",
    subtopic: "while Loop",
    sampleinput1: "3",
    sampleoutput1: "3\n2\n1\nGo!",
    sampleinput2: "1",
    sampleoutput2: "1\nGo!",
    input1: "5", output1: "5\n4\n3\n2\n1\nGo!",
    input2: "2", output2: "2\n1\nGo!",
    input3: "10", output3: "10\n9\n8\n7\n6\n5\n4\n3\n2\n1\nGo!",
    inputconstrains: "1 <= n <= 100",
    sourcecode: `n = int(input())
while n >= 1:
    print(n)
    n -= 1
print("Go!")`,
  }),

  q({
    title: "Even Numbers Between Two Values",
    description: desc(
      "Read two integers a and b and print every even number from a to b (inclusive), one per line, stepping through the range with a for loop.",
      "One line with a and b separated by a space.",
      "Each even number in the range on its own line, in increasing order.",
      "1 <= a <= b <= 100"
    ),
    difficulty: "easy",
    variant: "basic",
    subtopic: "range Function",
    sampleinput1: "1 10",
    sampleoutput1: "2\n4\n6\n8\n10",
    sampleinput2: "4 4",
    sampleoutput2: "4",
    input1: "7 16", output1: "8\n10\n12\n14\n16",
    input2: "20 27", output2: "20\n22\n24\n26",
    input3: "5 6", output3: "6",
    inputconstrains: "1 <= a <= b <= 100",
    sourcecode: `a, b = map(int, input().split())
for x in range(a, b + 1):
    if x % 2 == 0:
        print(x)`,
  }),

  q({
    title: "Multiplication Table Rows",
    description: desc(
      "Read an integer n and print its multiplication table from n x 1 to n x 10 using a for loop.",
      "One integer n.",
      "Ten lines, each in the exact form 'n x i = product'.",
      "1 <= n <= 20"
    ),
    difficulty: "easy",
    variant: "basic",
    subtopic: "range Function",
    sampleinput1: "3",
    sampleoutput1: "3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15\n3 x 6 = 18\n3 x 7 = 21\n3 x 8 = 24\n3 x 9 = 27\n3 x 10 = 30",
    sampleinput2: "1",
    sampleoutput2: "1 x 1 = 1\n1 x 2 = 2\n1 x 3 = 3\n1 x 4 = 4\n1 x 5 = 5\n1 x 6 = 6\n1 x 7 = 7\n1 x 8 = 8\n1 x 9 = 9\n1 x 10 = 10",
    input1: "7", output1: "7 x 1 = 7\n7 x 2 = 14\n7 x 3 = 21\n7 x 4 = 28\n7 x 5 = 35\n7 x 6 = 42\n7 x 7 = 49\n7 x 8 = 56\n7 x 9 = 63\n7 x 10 = 70",
    input2: "9", output2: "9 x 1 = 9\n9 x 2 = 18\n9 x 3 = 27\n9 x 4 = 36\n9 x 5 = 45\n9 x 6 = 54\n9 x 7 = 63\n9 x 8 = 72\n9 x 9 = 81\n9 x 10 = 90",
    input3: "12", output3: "12 x 1 = 12\n12 x 2 = 24\n12 x 3 = 36\n12 x 4 = 48\n12 x 5 = 60\n12 x 6 = 72\n12 x 7 = 84\n12 x 8 = 96\n12 x 9 = 108\n12 x 10 = 120",
    inputconstrains: "1 <= n <= 20",
    sourcecode: `n = int(input())
for i in range(1, 11):
    print(f"{n} x {i} = {n * i}")`,
  }),

  q({
    title: "Factorial with a For Loop",
    description: desc(
      "Read a non-negative integer n and print n! (n factorial) computed with a for loop.",
      "One integer n.",
      "One line with n!.",
      "0 <= n <= 12"
    ),
    difficulty: "easy",
    variant: "basic",
    subtopic: "for Loop",
    sampleinput1: "5",
    sampleoutput1: "120",
    sampleinput2: "1",
    sampleoutput2: "1",
    input1: "0", output1: "1",
    input2: "8", output2: "40320",
    input3: "12", output3: "479001600",
    inputconstrains: "0 <= n <= 12",
    sourcecode: `n = int(input())
fact = 1
for i in range(2, n + 1):
    fact *= i
print(fact)`,
  }),

  q({
    title: "Natural Sum with a While Loop",
    description: desc(
      "Read an integer n and print the sum of the first n natural numbers using a while loop only (no for loop, no range).",
      "One integer n.",
      "One line with the sum.",
      "1 <= n <= 1000"
    ),
    difficulty: "easy",
    variant: "basic",
    subtopic: "while Loop",
    sampleinput1: "4",
    sampleoutput1: "10",
    sampleinput2: "1",
    sampleoutput2: "1",
    input1: "50", output1: "1275",
    input2: "9", output2: "45",
    input3: "100", output3: "5050",
    inputconstrains: "1 <= n <= 1000",
    sourcecode: `n = int(input())
total = 0
i = 1
while i <= n:
    total += i
    i += 1
print(total)`,
  }),

  q({
    title: "Fuel Tank Fill Simulator",
    description: desc(
      "An attendant refuels a bike whose tank has a fixed capacity. The nozzle dispenses a list of pre-set amounts one after another; filling stops the moment the tank is full, and any excess in the last event is discarded.",
      "Line 1: capacity C.\nLine 2: space-separated nozzle amounts.",
      "Line 1: 'Filled: X' where X is the total litres pumped.\nLine 2: 'Left: Y' where Y is the unfilled space.",
      "1 <= capacity <= 1000; 1 <= number of amounts <= 100; 1 <= each amount <= 500"
    ),
    difficulty: "easy",
    variant: "scenario",
    subtopic: "break and continue",
    sampleinput1: "50\n10 20 30",
    sampleoutput1: "Filled: 50\nLeft: 0",
    sampleinput2: "40\n5 5 5",
    sampleoutput2: "Filled: 15\nLeft: 25",
    input1: "10\n3 4 5", output1: "Filled: 10\nLeft: 0",
    input2: "100\n60", output2: "Filled: 60\nLeft: 40",
    input3: "20\n1 2 3 4 5 6 9", output3: "Filled: 20\nLeft: 0",
    inputconstrains: "1 <= capacity <= 1000; 1 <= number of amounts <= 100; 1 <= each amount <= 500",
    sourcecode: `cap = int(input())
events = list(map(int, input().split()))
filled = 0
for amt in events:
    if filled == cap:
        break
    if filled + amt > cap:
        filled = cap
    else:
        filled += amt
print(f"Filled: {filled}")
print(f"Left: {cap - filled}")`,
  }),

  q({
    title: "Canteen Queue Skips Sold Out",
    description: desc(
      "The college canteen serves a queue of students one by one. Each queue entry is a single-word item; the special entry SoldOut means that item has run out and the student is skipped. Serve everyone else with continue.",
      "Line 1: integer n, the queue length.\nLines 2 to n+1: one item name per line, or the word SoldOut.",
      "For every served item print 'Serving: <item>' on its own line, in queue order.",
      "1 <= n <= 50; item names are single words"
    ),
    difficulty: "easy",
    variant: "scenario",
    subtopic: "break and continue",
    sampleinput1: "4\nDosa\nSoldOut\nIdli\nVada",
    sampleoutput1: "Serving: Dosa\nServing: Idli\nServing: Vada",
    sampleinput2: "3\nTea\nCoffee\nJuice",
    sampleoutput2: "Serving: Tea\nServing: Coffee\nServing: Juice",
    input1: "5\nPoha\nSoldOut\nSoup\nSoldOut\nPasta", output1: "Serving: Poha\nServing: Soup\nServing: Pasta",
    input2: "1\nPancake", output2: "Serving: Pancake",
    input3: "3\nSoldOut\nSoldOut\nTea", output3: "Serving: Tea",
    inputconstrains: "1 <= n <= 50; item names are single words",
    sourcecode: `n = int(input())
for _ in range(n):
    item = input()
    if item == "SoldOut":
        continue
    print(f"Serving: {item}")`,
  }),

  q({
    title: "Drone Battery Drain Monitor",
    description: desc(
      "A delivery drone starts a mission with B percent battery and every flight cycle drains exactly D percent. The drone may fly only while its battery is at least T percent. Track the battery level before each cycle and report where it stopped.",
      "One line with B, D and T separated by spaces.",
      "For each allowed cycle print 'Battery: <level>' (the level before draining), then one final line 'Stopped: <level>' with the level after the last drain.",
      "1 <= T <= B <= 100; 1 <= D <= 100"
    ),
    difficulty: "easy",
    variant: "scenario",
    subtopic: "while Loop",
    sampleinput1: "100 15 40",
    sampleoutput1: "Battery: 100\nBattery: 85\nBattery: 70\nBattery: 55\nBattery: 40\nStopped: 25",
    sampleinput2: "50 10 50",
    sampleoutput2: "Battery: 50\nStopped: 40",
    input1: "30 5 10", output1: "Battery: 30\nBattery: 25\nBattery: 20\nBattery: 15\nBattery: 10\nStopped: 5",
    input2: "20 30 5", output2: "Battery: 20\nStopped: 0",
    input3: "60 20 10", output3: "Battery: 60\nBattery: 40\nBattery: 20\nStopped: 0",
    inputconstrains: "1 <= T <= B <= 100; 1 <= D <= 100",
    sourcecode: `b, d, t = map(int, input().split())
while b >= t:
    print(f"Battery: {b}")
    if b >= d:
        b -= d
    else:
        b = 0
print(f"Stopped: {b}")`,
  }),

  q({
    title: "Staircase of Stars",
    description: desc(
      "Print a left-aligned staircase of stars with n steps using nested loops: step i (counting from 1) is a row of exactly i stars.",
      "One integer n.",
      "n lines; line i contains i '*' characters with no spaces.",
      "1 <= n <= 20"
    ),
    difficulty: "easy",
    variant: "scenario",
    subtopic: "Nested Loops",
    sampleinput1: "3",
    sampleoutput1: "*\n**\n***",
    sampleinput2: "1",
    sampleoutput2: "*",
    input1: "5", output1: "*\n**\n***\n****\n*****",
    input2: "2", output2: "*\n**",
    input3: "7", output3: "*\n**\n***\n****\n*****\n******\n*******",
    inputconstrains: "1 <= n <= 20",
    sourcecode: `n = int(input())
for i in range(1, n + 1):
    row = ""
    for j in range(i):
        row += "*"
    print(row)`,
  }),

  q({
    title: "Sentinel Transaction Logger",
    description: desc(
      "A cashier logs transactions into a till that opens with a balance B. Each following input line is one entry: a positive amount is deposited and the running balance is printed after it; a negative entry is a mistyped amount and must be skipped; the entry 0 closes the till and stops the log.",
      "Line 1: opening balance B.\nFollowing lines: one integer per line, ending with 0.",
      "After each valid deposit print the running balance on its own line; after the sentinel print 'Final: <balance>'.",
      "0 <= B <= 100000; -1000 <= entry <= 1000; the entry list always ends with 0"
    ),
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "break and continue",
    sampleinput1: "100\n50\n-20\n30\n0",
    sampleoutput1: "150\n180\nFinal: 180",
    sampleinput2: "0\n10\n5\n0",
    sampleoutput2: "10\n15\nFinal: 15",
    input1: "200\n-5\n-9\n25\n0", output1: "225\nFinal: 225",
    input2: "500\n0", output2: "Final: 500",
    input3: "75\n25\n-1\n100\n-2\n0", output3: "100\n200\nFinal: 200",
    inputconstrains: "0 <= B <= 100000; -1000 <= entry <= 1000; the entry list always ends with 0",
    blacklist: "sum(",
    whitelist: "while, break, continue",
    sourcecode: `balance = int(input())
while True:
    entry = int(input())
    if entry == 0:
        break
    if entry < 0:
        continue
    balance += entry
    print(balance)
print(f"Final: {balance}")`,
  }),

  q({
    title: "Attendance Scanner Tally",
    description: desc(
      "A class scanner reads n attendance marks, one per line: P for present, A for absent and N for an unmarked card which is skipped. Tally the clear verdicts using a for loop with continue.",
      "Line 1: integer n.\nLines 2 to n+1: one mark per line (P, A or N).",
      "Line 1: 'Present: <p>'.\nLine 2: 'Absent: <a>'.",
      "1 <= n <= 100; every mark is P, A or N"
    ),
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "for Loop",
    sampleinput1: "6\nP\nA\nN\nP\nA\nP",
    sampleoutput1: "Present: 3\nAbsent: 2",
    sampleinput2: "1\nP",
    sampleoutput2: "Present: 1\nAbsent: 0",
    input1: "4\nN\nN\nN\nA", output1: "Present: 0\nAbsent: 1",
    input2: "5\nP\nP\nP\nP\nP", output2: "Present: 5\nAbsent: 0",
    input3: "3\nA\nA\nN", output3: "Present: 0\nAbsent: 2",
    inputconstrains: "1 <= n <= 100; every mark is P, A or N",
    blacklist: ".count(, sum(",
    whitelist: "for , continue",
    sourcecode: `n = int(input())
present = 0
absent = 0
for _ in range(n):
    mark = input()
    if mark == "N":
        continue
    if mark == "P":
        present += 1
    else:
        absent += 1
print(f"Present: {present}")
print(f"Absent: {absent}")`,
  }),

  q({
    title: "Digit Sum and Product Probe",
    description: desc(
      "A quality probe inspects a batch code n by examining its digits. Using only arithmetic (no string conversion), walk through the digits of n with a while loop and report their sum and their product.",
      "One integer n.",
      "Line 1: 'Sum: <s>'.\nLine 2: 'Product: <p>'.",
      "1 <= n <= 1000000000"
    ),
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "while Loop",
    sampleinput1: "234",
    sampleoutput1: "Sum: 9\nProduct: 24",
    sampleinput2: "105",
    sampleoutput2: "Sum: 6\nProduct: 0",
    input1: "9999", output1: "Sum: 36\nProduct: 6561",
    input2: "7", output2: "Sum: 7\nProduct: 7",
    input3: "1230", output3: "Sum: 6\nProduct: 0",
    inputconstrains: "1 <= n <= 1000000000",
    blacklist: "str(, sum(",
    whitelist: "while",
    sourcecode: `n = int(input())
dsum = 0
dprod = 1
while n > 0:
    d = n % 10
    dsum += d
    dprod *= d
    n //= 10
print(f"Sum: {dsum}")
print(f"Product: {dprod}")`,
  }),

  q({
    title: "Reverse the Digits",
    description: desc(
      "A scoreboard display reverses locker numbers digit by digit. Read a positive integer and rebuild it with its digits in reverse order using a while loop with % 10 and // 10 — no strings, no slicing.",
      "One integer n.",
      "One line with the reversed number (leading zeros disappear).",
      "1 <= n <= 1000000000"
    ),
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "while Loop",
    sampleinput1: "1200",
    sampleoutput1: "21",
    sampleinput2: "5",
    sampleoutput2: "5",
    input1: "12345", output1: "54321",
    input2: "100", output2: "1",
    input3: "9070", output3: "709",
    inputconstrains: "1 <= n <= 1000000000",
    blacklist: "[::-1], reversed(, str(",
    whitelist: "while",
    sourcecode: `n = int(input())
rev = 0
while n > 0:
    rev = rev * 10 + n % 10
    n //= 10
print(rev)`,
  }),

  q({
    title: "Vault Code Primality Check",
    description: desc(
      "A safe opens only when its numeric code is a prime number. Read the code n and decide with a trial-division while loop that uses i * i <= n as its limit, together with the loop-else clause to announce the verdict.",
      "One integer n.",
      "'Prime' or 'Not Prime'.",
      "1 <= n <= 1000000"
    ),
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "else Clause with Loops",
    sampleinput1: "2",
    sampleoutput1: "Prime",
    sampleinput2: "15",
    sampleoutput2: "Not Prime",
    input1: "97", output1: "Prime",
    input2: "1", output2: "Not Prime",
    input3: "561", output3: "Not Prime",
    inputconstrains: "1 <= n <= 1000000",
    blacklist: "sqrt(, sympy",
    whitelist: "while, else:, break",
    sourcecode: `n = int(input())
if n < 2:
    print("Not Prime")
else:
    i = 2
    while i * i <= n:
        if n % i == 0:
            print("Not Prime")
            break
        i += 1
    else:
        print("Prime")`,
  }),

  q({
    title: "Cheer Card Alternating Triangle",
    description: desc(
      "Fans in section n hold up cards for a wave pattern: row i has i cards and the card values alternate 0 and 1. The value of the card in row i, position j (both counted from 1) is (i + j + 1) % 2. Print the triangle with nested loops.",
      "One integer n.",
      "n lines; line i has i values (0/1) separated by single spaces.",
      "1 <= n <= 20"
    ),
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Nested Loops",
    sampleinput1: "1",
    sampleoutput1: "1",
    sampleinput2: "3",
    sampleoutput2: "1\n0 1\n1 0 1",
    input1: "5", output1: "1\n0 1\n1 0 1\n0 1 0 1\n1 0 1 0 1",
    input2: "2", output2: "1\n0 1",
    input3: "7", output3: "1\n0 1\n1 0 1\n0 1 0 1\n1 0 1 0 1\n0 1 0 1 0 1\n1 0 1 0 1 0 1",
    inputconstrains: "1 <= n <= 20",
    blacklist: "cycle(",
    whitelist: "for , range(",
    sourcecode: `n = int(input())
for i in range(1, n + 1):
    row = []
    for j in range(1, i + 1):
        row.append((i + j + 1) % 2)
    print(" ".join(str(v) for v in row))`,
  }),

  q({
    title: "Water Tank Refill Optimizer",
    description: desc(
      "A rooftop tank of capacity C holds L litres. Every morning the building consumes K litres (if less remains, the tank empties completely). Every evening, if the level is strictly below threshold T, a tanker adds R litres; water above capacity C overflows and is wasted. Simulate day by day: if the tank is empty after a morning consumption, declare a crisis and stop immediately (no evening refill that day). If all N days complete without a crisis, report the total wasted water.",
      "One line: C L K T R N separated by spaces.",
      "For every simulated day print 'Day <i>: <level>' (level at end of day). If a crisis occurs print 'Crisis' after that day's line and simulate nothing further. Otherwise finish with 'Wasted: <w>'.",
      "1 <= K <= C <= 10000; 0 <= L <= C; 0 <= T <= C; 1 <= R <= 10000; 1 <= N <= 1000"
    ),
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "else Clause with Loops",
    sampleinput1: "100 50 20 30 45 4",
    sampleoutput1: "Day 1: 30\nDay 2: 55\nDay 3: 35\nDay 4: 60\nWasted: 0",
    sampleinput2: "100 25 30 40 50 5",
    sampleoutput2: "Day 1: 0\nCrisis",
    input1: "50 40 15 30 30 2", output1: "Day 1: 50\nDay 2: 35\nWasted: 5",
    input2: "80 10 5 15 25 3", output2: "Day 1: 30\nDay 2: 25\nDay 3: 20\nWasted: 0",
    input3: "60 20 20 10 30 4", output3: "Day 1: 0\nCrisis",
    inputconstrains: "1 <= K <= C <= 10000; 0 <= L <= C; 0 <= T <= C; 1 <= R <= 10000; 1 <= N <= 1000",
    blacklist: "min(, max(",
    whitelist: "while, else:, break",
    sourcecode: `c, level, k, t, r, n = map(int, input().split())
wasted = 0
day = 1
while day <= n:
    if level < k:
        level = 0
    else:
        level -= k
    if level == 0:
        print(f"Day {day}: 0")
        print("Crisis")
        break
    if level < t:
        level += r
        if level > c:
            wasted += level - c
            level = c
    print(f"Day {day}: {level}")
    day += 1
else:
    print(f"Wasted: {wasted}")`,
  }),

  q({
    title: "Matrix Diagonal Sum Traverse",
    description: desc(
      "An image sensor reports an r x c grid of readings. Sum every cell that lies on one of the two diagonals: the main diagonal (row index equals column index) and the anti-diagonal (row and column indexes add up to c - 1). A cell qualifying for both diagonals must still be counted only once. Traverse the grid with nested loops — the grid may be non-square.",
      "Line 1: r and c.\nLines 2 to r+1: c integers each (the grid rows).",
      "Line 1: the diagonal sum.\nLine 2: 'Cells: <k>' where k is the number of distinct diagonal cells counted.",
      "1 <= r, c <= 50; -100 <= cell value <= 100"
    ),
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Nested Loops",
    sampleinput1: "3 3\n1 2 3\n4 5 6\n7 8 9",
    sampleoutput1: "25\nCells: 5",
    sampleinput2: "1 1\n7",
    sampleoutput2: "7\nCells: 1",
    input1: "2 3\n1 2 3\n4 5 6", output1: "9\nCells: 3",
    input2: "4 4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16", output2: "68\nCells: 8",
    input3: "2 2\n1 2\n3 4", output3: "10\nCells: 4",
    inputconstrains: "1 <= r, c <= 50; -100 <= cell value <= 100",
    blacklist: "sum(",
    whitelist: "for , range(",
    sourcecode: `r, c = map(int, input().split())
total = 0
count = 0
for i in range(r):
    values = list(map(int, input().split()))
    for j in range(c):
        if i == j or i + j == c - 1:
            total += values[j]
            count += 1
print(total)
print(f"Cells: {count}")`,
  }),

  q({
    title: "Candy Dispenser Rounds",
    description: desc(
      "A vending candy dispenser has n slots. Slots holding -1 are locked and never dispense; every unlocked slot with candy releases exactly one candy per round. Simulate up to R rounds. After each round print how many candies were dispensed that round; if after a round every unlocked slot is empty, the machine halts (stop even if rounds remain). If all R rounds finish while the machine never halted, print the completion message instead.",
      "Line 1: n and R.\nLine 2: n slot values (-1 for locked, otherwise 0 to 100).",
      "Per round: 'Round <r>: <given>'. On halt: 'Dispenser empty after round <r>'. If no halt occurs: 'Rounds complete, dispensed <total>'.",
      "1 <= n <= 10; 1 <= R <= 20; each slot value is -1 or between 0 and 100"
    ),
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "else Clause with Loops",
    sampleinput1: "3 5\n2 -1 3",
    sampleoutput1: "Round 1: 2\nRound 2: 2\nRound 3: 1\nDispenser empty after round 3",
    sampleinput2: "2 2\n5 4",
    sampleoutput2: "Round 1: 2\nRound 2: 2\nRounds complete, dispensed 4",
    input1: "2 3\n-1 -1", output1: "Round 1: 0\nDispenser empty after round 1",
    input2: "1 1\n1", output2: "Round 1: 1\nDispenser empty after round 1",
    input3: "4 3\n1 0 2 -1", output3: "Round 1: 2\nRound 2: 1\nDispenser empty after round 2",
    inputconstrains: "1 <= n <= 10; 1 <= R <= 20; each slot value is -1 or between 0 and 100",
    blacklist: "sum(",
    whitelist: "for , continue, else:, break",
    sourcecode: `n, rounds = map(int, input().split())
slots = list(map(int, input().split()))
dispensed = 0
for r in range(1, rounds + 1):
    given = 0
    for i in range(n):
        if slots[i] < 0:
            continue
        if slots[i] > 0:
            slots[i] -= 1
            dispensed += 1
            given += 1
    print(f"Round {r}: {given}")
    empty = True
    for i in range(n):
        if slots[i] > 0:
            empty = False
    if empty:
        print(f"Dispenser empty after round {r}")
        break
else:
    print(f"Rounds complete, dispensed {dispensed}")`,
  }),

  q({
    title: "Collatz Steps and Verdict",
    description: desc(
      "The collatz transformation sends an even value to its half and an odd value v to 3v + 1. For each of m starting values, count how many transformations are needed to reach 1, but give up after 50 steps and mark the value Diverged. Among the values that converged, report the one with the largest step count (the earliest input wins ties).",
      "Line 1: m.\nLine 2: m starting values separated by spaces.",
      "One line per value: '<v> -> <steps>' or '<v> -> Diverged'. Then a final line 'Max steps: <s> for <v>' — or 'None converged' if every value diverged.",
      "1 <= m <= 20; 1 <= value <= 1000"
    ),
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "while Loop",
    sampleinput1: "3\n1 6 27",
    sampleoutput1: "1 -> 0\n6 -> 8\n27 -> Diverged\nMax steps: 8 for 6",
    sampleinput2: "2\n7 8",
    sampleoutput2: "7 -> 16\n8 -> 3\nMax steps: 16 for 7",
    input1: "4\n2 3 4 5", output1: "2 -> 1\n3 -> 7\n4 -> 2\n5 -> 5\nMax steps: 7 for 3",
    input2: "2\n27 31", output2: "27 -> Diverged\n31 -> Diverged\nNone converged",
    input3: "5\n9 10 11 12 13", output3: "9 -> 19\n10 -> 6\n11 -> 14\n12 -> 9\n13 -> 9\nMax steps: 19 for 9",
    inputconstrains: "1 <= m <= 20; 1 <= value <= 1000",
    blacklist: "max(",
    whitelist: "while, for , else:",
    sourcecode: `m = int(input())
values = list(map(int, input().split()))
best_steps = -1
best_val = -1
for v in values:
    x = v
    steps = 0
    while x != 1 and steps < 50:
        if x % 2 == 0:
            x //= 2
        else:
            x = 3 * x + 1
        steps += 1
    if x == 1:
        print(f"{v} -> {steps}")
        if steps > best_steps:
            best_steps = steps
            best_val = v
    else:
        print(f"{v} -> Diverged")
if best_steps == -1:
    print("None converged")
else:
    print(f"Max steps: {best_steps} for {best_val}")`,
  }),
];

/* ─────────────────────────  MCQ QUESTIONS (20)  ───────────────────────── */

const mcqs = [
  mcq({
    title: "Values Produced by range(5)",
    description: "What values does the expression range(5) produce in a for loop?",
    difficulty: "easy",
    subtopic: "range Function",
    Option1: "0, 1, 2, 3, 4",
    Option2: "1, 2, 3, 4, 5",
    Option3: "0, 1, 2, 3, 4, 5",
    Option4: "1, 2, 3, 4",
    CorrectOption: 1,
  }),
  mcq({
    title: "Iteration Count of range(1, 5)",
    description: "How many times does the body of 'for i in range(1, 5):' execute?",
    difficulty: "easy",
    subtopic: "range Function",
    Option1: "4 times",
    Option2: "5 times",
    Option3: "3 times",
    Option4: "6 times",
    CorrectOption: 1,
  }),
  mcq({
    title: "Effect of the continue Statement",
    description: "What does continue do when executed inside a loop body?",
    difficulty: "easy",
    subtopic: "break and continue",
    Option1: "It exits the loop entirely",
    Option2: "It skips the rest of the current iteration and starts the next one",
    Option3: "It restarts the loop from the very first iteration",
    Option4: "It pauses the loop until the user presses a key",
    CorrectOption: 2,
  }),
  mcq({
    title: "While Condition That Never Turns False",
    description: "What happens when the condition of a while loop never becomes false and the body contains no break?",
    difficulty: "easy",
    subtopic: "while Loop",
    Option1: "The loop runs forever, freezing the program",
    Option2: "The loop body runs exactly once",
    Option3: "The loop body is skipped and the program continues",
    Option4: "Python raises a LoopError after 100 iterations",
    CorrectOption: 1,
  }),
  mcq({
    title: "Loop Variable After the Loop",
    description: "What does this snippet print?",
    difficulty: "easy",
    subtopic: "for Loop",
    iscodesnippet: true,
    codesnippet: `for i in range(3):
    print(i)
print(i)`,
    snippetLang: "python",
    Option1: "0, 1, 2 and then 3",
    Option2: "0, 1, 2 and then 2 again",
    Option3: "0, 1, 2 followed by a NameError",
    Option4: "2, 2, 2, 2",
    CorrectOption: 2,
  }),
  mcq({
    title: "Accumulator Pattern Result",
    description: "What does this snippet print?",
    difficulty: "easy",
    subtopic: "for Loop",
    iscodesnippet: true,
    codesnippet: `total = 0
for x in [2, 4, 6]:
    total += x
print(total)`,
    snippetLang: "python",
    Option1: "10",
    Option2: "6",
    Option3: "12",
    Option4: "24",
    CorrectOption: 3,
  }),
  mcq({
    title: "Step Values in range(1, 10, 2)",
    description: "Which sequence does range(1, 10, 2) produce?",
    difficulty: "easy",
    subtopic: "range Function",
    Option1: "1, 2, 3, 4, 5, 6, 7, 8, 9",
    Option2: "1, 3, 5, 7, 9",
    Option3: "1, 3, 5, 7, 9, 10",
    Option4: "2, 4, 6, 8, 10",
    CorrectOption: 2,
  }),
  mcq({
    title: "Statement That Exits a Loop",
    description: "Which statement immediately terminates the entire loop it is inside?",
    difficulty: "easy",
    subtopic: "break and continue",
    Option1: "continue",
    Option2: "pass",
    Option3: "break",
    Option4: "exit",
    CorrectOption: 3,
  }),
  mcq({
    title: "Iterating Characters of a String",
    description: "What does this snippet print?",
    difficulty: "easy",
    subtopic: "for Loop",
    iscodesnippet: true,
    codesnippet: `for ch in "abc":
    print(ch)`,
    snippetLang: "python",
    Option1: "abc on a single line",
    Option2: "0 a, 1 b, 2 c on three lines",
    Option3: "a, b and c on three separate lines",
    Option4: "a b c with spaces on one line",
    CorrectOption: 3,
  }),
  mcq({
    title: "What Makes a While Loop Stop",
    description: "For a while loop to eventually stop, what must happen?",
    difficulty: "easy",
    subtopic: "while Loop",
    Option1: "Its condition must become false, or a break must execute",
    Option2: "It must call range() at least once",
    Option3: "It must include an else clause",
    Option4: "Its loop variable must be named i",
    CorrectOption: 1,
  }),
  mcq({
    title: "While-else Skipped by break",
    description: "What does this snippet print?",
    difficulty: "medium",
    subtopic: "else Clause with Loops",
    iscodesnippet: true,
    codesnippet: `n = 3
while n > 0:
    if n == 2:
        break
    print(n)
    n -= 1
else:
    print("Done")`,
    snippetLang: "python",
    Option1: "3 followed by Done",
    Option2: "Only 3",
    Option3: "3, 2 followed by Done",
    Option4: "3, 2, 1 followed by Done",
    CorrectOption: 2,
  }),
  mcq({
    title: "For-else Runs Without break",
    description: "What does this snippet print?",
    difficulty: "medium",
    subtopic: "else Clause with Loops",
    iscodesnippet: true,
    codesnippet: `total = 0
for i in range(3):
    total += i
else:
    total += 10
print(total)`,
    snippetLang: "python",
    Option1: "3",
    Option2: "10",
    Option3: "15",
    Option4: "13",
    CorrectOption: 4,
  }),
  mcq({
    title: "Break Exits Only the Inner Loop",
    description: "What does this snippet print?",
    difficulty: "medium",
    subtopic: "Nested Loops",
    iscodesnippet: true,
    codesnippet: `for i in range(2):
    for j in range(3):
        if j == 1:
            break
        print(i, j)`,
    snippetLang: "python",
    Option1: "0 0 only",
    Option2: "0 0, 0 1, 1 0",
    Option3: "0 0 and 1 0",
    Option4: "0 0, 1 0, 2 0",
    CorrectOption: 3,
  }),
  mcq({
    title: "Continue Skips Even Numbers",
    description: "What does this snippet print?",
    difficulty: "medium",
    subtopic: "break and continue",
    iscodesnippet: true,
    codesnippet: `for i in range(1, 6):
    if i % 2 == 0:
        continue
    print(i)`,
    snippetLang: "python",
    Option1: "1, 2, 3, 4, 5",
    Option2: "2 and 4",
    Option3: "1, 3, 5 and 6",
    Option4: "1, 3 and 5",
    CorrectOption: 4,
  }),
  mcq({
    title: "Countdown with a Negative Step",
    description: "Which range call produces the sequence 5, 4, 3, 2, 1?",
    difficulty: "medium",
    subtopic: "range Function",
    Option1: "range(5, 0, -1)",
    Option2: "range(5, 1, -1)",
    Option3: "range(0, 5, -1)",
    Option4: "range(1, 5, -1)",
    CorrectOption: 1,
  }),
  mcq({
    title: "Counting Numbers in range(2, 12, 3)",
    description: "How many numbers does range(2, 12, 3) produce, and what are they?",
    difficulty: "medium",
    subtopic: "range Function",
    Option1: "3 numbers: 2, 5, 8",
    Option2: "4 numbers: 2, 5, 8, 11",
    Option3: "5 numbers: 2, 5, 8, 11, 14",
    Option4: "4 numbers: 2, 5, 8, 12",
    CorrectOption: 2,
  }),
  mcq({
    title: "Leaked Loop Variable and Accumulator",
    description: "What does this snippet print?",
    difficulty: "hard",
    subtopic: "for Loop",
    iscodesnippet: true,
    codesnippet: `x = 0
for i in range(4):
    x += i
print(i, x)`,
    snippetLang: "python",
    Option1: "4 10",
    Option2: "3 6",
    Option3: "4 6",
    Option4: "3 10",
    CorrectOption: 2,
  }),
  mcq({
    title: "Nested While-else Accumulation",
    description: "What does this snippet print?",
    difficulty: "hard",
    subtopic: "else Clause with Loops",
    iscodesnippet: true,
    codesnippet: `count = 0
for i in range(1, 4):
    j = i
    while j > 0:
        if j % 2 == 0:
            count += 1
        j -= 1
    else:
        count += 100
print(count)`,
    snippetLang: "python",
    Option1: "2",
    Option2: "300",
    Option3: "303",
    Option4: "302",
    CorrectOption: 4,
  }),
  mcq({
    title: "For-else Search Verdict",
    description: "What does this snippet print?",
    difficulty: "hard",
    subtopic: "else Clause with Loops",
    iscodesnippet: true,
    codesnippet: `nums = [4, 7, 2, 9, 5]
found = None
for n in nums:
    if n % 2 == 1:
        found = n
        break
else:
    found = -1
print(found)`,
    snippetLang: "python",
    Option1: "None",
    Option2: "-1",
    Option3: "7",
    Option4: "9",
    CorrectOption: 3,
  }),
  mcq({
    title: "Continue with Careful State Updates",
    description: "What does this snippet print?",
    difficulty: "hard",
    subtopic: "while Loop",
    iscodesnippet: true,
    codesnippet: `i = 5
while i > 0:
    if i == 2:
        i -= 2
        continue
    print(i)
    i -= 1
print("End", i)`,
    snippetLang: "python",
    Option1: "5, 4, 3, then End 2",
    Option2: "5, 4, 3, 2, then End 0",
    Option3: "5, 4, 3, then End 0",
    Option4: "5, 4, 3, 1, then End 0",
    CorrectOption: 3,
  }),
];

if (questions.length !== 20) throw new Error(`day 5 code: expected 20, got ${questions.length}`);
if (mcqs.length !== 20) throw new Error(`day 5 mcq: expected 20, got ${mcqs.length}`);

writeFileSync(`${OUT}/day-05.code.json`, JSON.stringify({ day: 5, topics, questions }, null, 2));
writeFileSync(`${OUT}/day-05.mcq.json`, JSON.stringify({ day: 5, questions: mcqs }, null, 2));
console.log(`wrote day 5: ${questions.length} code, ${mcqs.length} mcq`);
