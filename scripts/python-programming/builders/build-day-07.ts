/**
 * Builder for Day 07 — "Lists and Tuples" (PYTHON Programming).
 * 20 code questions + 20 MCQs, authored from scratch for AtomCode.
 *
 * Run: bun scripts/python-programming/builders/build-day-07.ts
 */

import { writeFileSync } from "node:fs";

const TOPIC = "Lists and Tuples";
const SUBTOPICS = [
  "Creating and Manipulating Lists",
  "List Methods",
  "List Slicing",
  "Creating and Using Tuples",
  "Tuple Immutability",
  "Packing and Unpacking",
];

const topics = [{ name: TOPIC, subtopics: [...SUBTOPICS] }];

/* ───────────────────────────── code questions ───────────────────────────── */

const codeQuestions = [
  {
    title: "Build and Print a Color Palette",
    description:
      "You are helping a design tool store its color palette. Read n color names, build a list by appending each name in order, then show the finished palette.\n\nInput Format:\nFirst line: integer n. Next n lines: one color name per line (a single word).\n\nOutput Format:\nLine 1: the list exactly as Python prints it. Line 2: the number of colors in the list.\n\nConstraints:\n1 <= n <= 20; color names are single words of up to 15 letters.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "python",
    topic: TOPIC,
    subtopic: "Creating and Manipulating Lists",
    sampleinput1: "3\nred\nblue\ngreen",
    sampleoutput1: "['red', 'blue', 'green']\n3",
    sampleinput2: "1\nteal",
    sampleoutput2: "['teal']\n1",
    input1: "4\namber\njade\nrust\npink",
    output1: "['amber', 'jade', 'rust', 'pink']\n4",
    input2: "2\ncoral\nnavy",
    output2: "['coral', 'navy']\n2",
    input3: "5\ngold\nsilver\nbronze\nivory\nonyx",
    output3: "['gold', 'silver', 'bronze', 'ivory', 'onyx']\n5",
    inputconstrains: "1 <= n <= 20, one color word per line",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = int(input())
colors = []
for _ in range(n):
    colors.append(input())
print(colors)
print(len(colors))
`,
  },
  {
    title: "Insert Append Remove Drill",
    description:
      "A warm-up drill on the core list methods. Start with four integers, then apply three operations in order: insert a value at a position, append a value, and remove the first occurrence of a value.\n\nInput Format:\nLine 1: four integers separated by spaces. Line 2: x and pos — insert integer x at 0-based position pos. Line 3: integer y to append. Line 4: integer z, guaranteed to be present in the list at that moment; remove its first occurrence.\n\nOutput Format:\nThe final list, exactly as Python prints it.\n\nConstraints:\nList values are integers in -1000..1000; 0 <= pos <= current list length; z is always present when its removal runs.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "python",
    topic: TOPIC,
    subtopic: "List Methods",
    sampleinput1: "10 20 30 40\n5 1\n99\n20",
    sampleoutput1: "[10, 5, 30, 40, 99]",
    sampleinput2: "1 2 3 4\n7 4\n8\n3",
    sampleoutput2: "[1, 2, 4, 7, 8]",
    input1: "5 5 5 5\n6 0\n7\n5",
    output1: "[6, 5, 5, 5, 7]",
    input2: "-1 -2 -3 -4\n-5 0\n-6\n-3",
    output2: "[-5, -1, -2, -4, -6]",
    input3: "100 200 300 400\n250 2\n50\n400",
    output3: "[100, 200, 250, 300, 50]",
    inputconstrains: "four initial integers, then x pos, then y, then z; values in -1000..1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `nums = list(map(int, input().split()))
x, pos = map(int, input().split())
y = int(input())
z = int(input())
nums.insert(pos, x)
nums.append(y)
nums.remove(z)
print(nums)
`,
  },
  {
    title: "Score Index and Count",
    description:
      "Six quiz scores are recorded in a list. Report where a target score first appears and how many times it appears overall, using the list methods index and count.\n\nInput Format:\nLine 1: six integers separated by spaces. Line 2: the target integer, guaranteed to be present in the list.\n\nOutput Format:\nLine 1: the index of the first occurrence of the target. Line 2: the number of occurrences of the target.\n\nConstraints:\nExactly 6 integers per list, each in -100..100; the target is guaranteed to appear at least once.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "python",
    topic: TOPIC,
    subtopic: "List Methods",
    sampleinput1: "4 8 15 8 16 8\n8",
    sampleoutput1: "1\n3",
    sampleinput2: "10 20 30 40 50 60\n60",
    sampleoutput2: "5\n1",
    input1: "7 7 7 7 7 7\n7",
    output1: "0\n6",
    input2: "3 9 3 9 3 9\n9",
    output2: "1\n3",
    input3: "-2 5 -2 5 -2 5\n-2",
    output3: "0\n3",
    inputconstrains: "exactly 6 integers in -100..100; target guaranteed present",
    blacklist: "",
    whitelist: "",
    sourcecode: `scores = list(map(int, input().split()))
target = int(input())
print(scores.index(target))
print(scores.count(target))
`,
  },
  {
    title: "Slice Three Ways",
    description:
      "Take one list of integers and practice three kinds of slicing: the first three elements, the last three elements, and every second element starting at index 0.\n\nInput Format:\nLine 1: integer n (at least 6). Line 2: n integers separated by spaces.\n\nOutput Format:\nLine 1: the first three elements as a list. Line 2: the last three elements as a list. Line 3: every second element (step 2) as a list. All three lines use Python's list printing format.\n\nConstraints:\n6 <= n <= 100; values in -1000..1000.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "python",
    topic: TOPIC,
    subtopic: "List Slicing",
    sampleinput1: "8\n1 2 3 4 5 6 7 8",
    sampleoutput1: "[1, 2, 3]\n[6, 7, 8]\n[1, 3, 5, 7]",
    sampleinput2: "6\n9 8 7 6 5 4",
    sampleoutput2: "[9, 8, 7]\n[6, 5, 4]\n[9, 7, 5]",
    input1: "7\n10 20 30 40 50 60 70",
    output1: "[10, 20, 30]\n[50, 60, 70]\n[10, 30, 50, 70]",
    input2: "6\n-1 -2 -3 -4 -5 -6",
    output2: "[-1, -2, -3]\n[-4, -5, -6]\n[-1, -3, -5]",
    input3: "9\n2 4 6 8 10 12 14 16 18",
    output3: "[2, 4, 6]\n[14, 16, 18]\n[2, 6, 10, 14, 18]",
    inputconstrains: "6 <= n <= 100, values in -1000..1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = int(input())
vals = list(map(int, input().split()))
print(vals[:3])
print(vals[-3:])
print(vals[::2])
`,
  },
  {
    title: "Swap Two Values with Tuple Unpacking",
    description:
      "Python lets two variables exchange values in one statement thanks to tuple packing and unpacking. Read two integers, swap them using the statement a, b = b, a, and print the result.\n\nInput Format:\nOne line with two integers separated by a space.\n\nOutput Format:\nOne line with the two integers after the swap, separated by a space (first the swapped a, then the swapped b).\n\nConstraints:\nBoth integers are in -1000000..1000000.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "python",
    topic: TOPIC,
    subtopic: "Packing and Unpacking",
    sampleinput1: "7 12",
    sampleoutput1: "12 7",
    sampleinput2: "1 2",
    sampleoutput2: "2 1",
    input1: "-5 5",
    output1: "5 -5",
    input2: "100 99",
    output2: "99 100",
    input3: "0 0",
    output3: "0 0",
    inputconstrains: "two integers in -1000000..1000000",
    blacklist: "",
    whitelist: "",
    sourcecode: `a, b = map(int, input().split())
a, b = b, a
print(a, b)
`,
  },
  {
    title: "Tuple Snapshot Basics",
    description:
      "Capture a set of words as an immutable tuple, then inspect it: the whole tuple, its first element, its last element, and its length.\n\nInput Format:\nLine 1: integer n. Next n lines: one word per line.\n\nOutput Format:\nLine 1: the tuple exactly as Python prints it. Line 2: the first element. Line 3: the last element. Line 4: the number of elements in the tuple.\n\nConstraints:\n1 <= n <= 20; words are single tokens of up to 15 characters.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "python",
    topic: TOPIC,
    subtopic: "Creating and Using Tuples",
    sampleinput1: "3\nalpha\nbeta\ngamma",
    sampleoutput1: "('alpha', 'beta', 'gamma')\nalpha\ngamma\n3",
    sampleinput2: "1\nsolo",
    sampleoutput2: "('solo',)\nsolo\nsolo\n1",
    input1: "4\nnorth\neast\nsouth\nwest",
    output1: "('north', 'east', 'south', 'west')\nnorth\nwest\n4",
    input2: "2\ncoffee\nchai",
    output2: "('coffee', 'chai')\ncoffee\nchai\n2",
    input3: "5\nmon\ntue\nwed\nthu\nfri",
    output3: "('mon', 'tue', 'wed', 'thu', 'fri')\nmon\nfri\n5",
    inputconstrains: "1 <= n <= 20, one word per line",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = int(input())
words = []
for _ in range(n):
    words.append(input())
record = tuple(words)
print(record)
print(record[0])
print(record[-1])
print(len(record))
`,
  },
  {
    title: "Checkout Cart Total",
    description:
      "A cashier scans items at a grocery register, recording each price into the cart list. After all items are scanned, the register reports how many items were bought and the total amount due.\n\nInput Format:\nLine 1: integer n, the number of scanned items. Next n lines: one price per line, a decimal amount with at most 2 decimal places.\n\nOutput Format:\nLine 1: the number of items in the cart. Line 2: the total of all prices, formatted to exactly 2 decimal places.\n\nConstraints:\n1 <= n <= 50; each price satisfies 0 <= price <= 1000 and has at most 2 decimal places.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "python",
    topic: TOPIC,
    subtopic: "Creating and Manipulating Lists",
    sampleinput1: "3\n19.99\n5.50\n3.20",
    sampleoutput1: "3\n28.69",
    sampleinput2: "1\n10.00",
    sampleoutput2: "1\n10.00",
    input1: "4\n2.25\n2.25\n2.25\n2.25",
    output1: "4\n9.00",
    input2: "2\n0.05\n0.05",
    output2: "2\n0.10",
    input3: "5\n1.11\n2.22\n3.33\n4.44\n5.55",
    output3: "5\n16.65",
    inputconstrains: "1 <= n <= 50, 0 <= price <= 1000 with at most 2 decimals",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = int(input())
cart = []
for _ in range(n):
    cart.append(float(input()))
total = 0.0
for price in cart:
    total += price
print(len(cart))
print(f"{total:.2f}")
`,
  },
  {
    title: "Road Trip Playlist Manager",
    description:
      "Before a long drive you curate a road-trip playlist. Start with n songs, then insert one new song at a given position, then drop one song you are tired of by name. Show the final playlist.\n\nInput Format:\nLine 1: integer n. Next n lines: one song name per line (a single word). Next line: pos and song — insert song at 0-based position pos. Last line: a song name that is guaranteed to be in the playlist; remove it.\n\nOutput Format:\nThe final playlist, one song per line, in order.\n\nConstraints:\n2 <= n <= 20; song names are single words of up to 20 characters; pos is a valid position.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "python",
    topic: TOPIC,
    subtopic: "List Methods",
    sampleinput1: "3\nanthem\nblaze\ncloud\n1 delta\nanthem",
    sampleoutput1: "delta\nblaze\ncloud",
    sampleinput2: "2\nsolstice\nharbor\n0 eclipse\nsolstice",
    sampleoutput2: "eclipse\nharbor",
    input1: "4\naria\nbolt\nchime\ndrift\n2 echo\nbolt",
    output1: "aria\necho\nchime\ndrift",
    input2: "3\nember\nfable\ngrove\n3 haze\nember",
    output2: "fable\ngrove\nhaze",
    input3: "2\niris\njewel\n0 kite\njewel",
    output3: "kite\niris",
    inputconstrains: "2 <= n <= 20; pos valid; removed song guaranteed present",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = int(input())
playlist = []
for _ in range(n):
    playlist.append(input())
pos, song = input().split()
playlist.insert(int(pos), song)
gone = input()
playlist.remove(gone)
for track in playlist:
    print(track)
`,
  },
  {
    title: "Greenhouse Temperature Log",
    description:
      "A greenhouse logs one temperature reading per day for a week (7 readings). The keeper wants to review the start of the week, the end of the week, and the average of the final three days.\n\nInput Format:\nOne line with exactly 7 integers separated by spaces (the daily readings).\n\nOutput Format:\nLine 1: the first three readings as a list. Line 2: the last three readings as a list. Line 3: the average of the last three readings, formatted to exactly 2 decimal places.\n\nConstraints:\nExactly 7 integers, each in -50..60.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "python",
    topic: TOPIC,
    subtopic: "List Slicing",
    sampleinput1: "21 24 19 25 23 26 20",
    sampleoutput1: "[21, 24, 19]\n[23, 26, 20]\n23.00",
    sampleinput2: "10 12 14 16 18 20 22",
    sampleoutput2: "[10, 12, 14]\n[18, 20, 22]\n20.00",
    input1: "30 31 32 33 34 35 36",
    output1: "[30, 31, 32]\n[34, 35, 36]\n35.00",
    input2: "-5 0 5 -10 0 10 15",
    output2: "[-5, 0, 5]\n[0, 10, 15]\n8.33",
    input3: "18 21 24 27 30 27 24",
    output3: "[18, 21, 24]\n[30, 27, 24]\n27.00",
    inputconstrains: "exactly 7 integers in -50..60",
    blacklist: "",
    whitelist: "",
    sourcecode: `readings = list(map(int, input().split()))
print(readings[:3])
tail = readings[-3:]
print(tail)
avg = (tail[0] + tail[1] + tail[2]) / 3
print(f"{avg:.2f}")
`,
  },
  {
    title: "Server Log Tail",
    description:
      "An on-call engineer inspects a server log, but only the most recent lines matter. Read n log lines, then a number k, and show the last k lines of the log in their original order.\n\nInput Format:\nLine 1: integer n. Next n lines: the log lines (they may contain spaces). Last line: integer k.\n\nOutput Format:\nThe last k log lines, one per line, in original order.\n\nConstraints:\n1 <= k <= n <= 100; each log line is non-empty and up to 60 characters.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "python",
    topic: TOPIC,
    subtopic: "Creating and Manipulating Lists",
    sampleinput1: "4\nboot ok\ndisk warn\nnet fail\ndisk ok\n2",
    sampleoutput1: "net fail\ndisk ok",
    sampleinput2: "3\nservice started\nservice stopped\nservice restarted\n3",
    sampleoutput2: "service started\nservice stopped\nservice restarted",
    input1: "5\na1\nb2\nc3\nd4\ne5\n1",
    output1: "e5",
    input2: "4\nheartbeats sent\nqueue drained\nheartbeats sent\ncache warm\n3",
    output2: "queue drained\nheartbeats sent\ncache warm",
    input3: "2\nonly line one\nonly line two\n2",
    output3: "only line one\nonly line two",
    inputconstrains: "1 <= k <= n <= 100; non-empty log lines up to 60 chars",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = int(input())
lines = []
for _ in range(n):
    lines.append(input())
k = int(input())
for line in lines[-k:]:
    print(line)
`,
  },

  /* ── medium (all scenario, blacklist + whitelist, maxscore 20) ── */

  {
    title: "Grocery Checkout with Corrections",
    description:
      "A grocery cart holds item prices (whole dollars) in scan order. Before payment the cashier applies corrections: POP pos removes the item at 0-based position pos; RM value removes the first occurrence of that exact price. After all corrections, compute the amount due.\n\nInput Format:\nLine 1: integer n. Line 2: n integer prices separated by spaces. Line 3: integer m, the number of corrections. Next m lines: one correction each, either \"POP pos\" or \"RM value\".\n\nOutput Format:\nOne integer: the total of the remaining prices.\n\nConstraints:\n1 <= n <= 100; 0 <= m <= n; prices in 1..500; every correction is valid (pos in range, value present when RM runs). Do not use the built-in sum() — practice a manual accumulation loop, and use pop/remove for the corrections.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "python",
    topic: TOPIC,
    subtopic: "List Methods",
    sampleinput1: "5\n10 4 25 4 7\n2\nPOP 1\nRM 4",
    sampleoutput1: "42",
    sampleinput2: "3\n9 9 9\n1\nPOP 2",
    sampleoutput2: "18",
    input1: "4\n100 200 300 400\n2\nRM 200\nPOP 0",
    output1: "700",
    input2: "6\n5 10 15 20 25 30\n3\nPOP 5\nPOP 0\nRM 15",
    output2: "55",
    input3: "1\n42\n0",
    output3: "42",
    inputconstrains: "1 <= n <= 100, 0 <= m <= n, prices in 1..500, corrections always valid",
    blacklist: "sum(",
    whitelist: ".pop(, .remove(",
    sourcecode: `n = int(input())
cart = list(map(int, input().split()))
m = int(input())
for _ in range(m):
    parts = input().split()
    if parts[0] == "POP":
        cart.pop(int(parts[1]))
    else:
        cart.remove(int(parts[1]))
total = 0
for price in cart:
    total += price
print(total)
`,
  },
  {
    title: "Rotate the Duty Roster",
    description:
      "A team lead rotates the weekly duty roster to the right by k positions: everyone shifts k places forward and the last k people wrap around to the front. Achieve the rotation with list slicing only — no loops that move elements one by one, no reversal helpers.\n\nInput Format:\nLine 1: integer n. Next n lines: one name per line (a single word). Last line: integer k.\n\nOutput Format:\nOne line with the rotated names separated by single spaces.\n\nConstraints:\n2 <= n <= 100; 1 <= k < n; names are single words of up to 20 characters.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "python",
    topic: TOPIC,
    subtopic: "List Slicing",
    sampleinput1: "5\nana\nben\ncal\ndee\neli\n2",
    sampleoutput1: "dee eli ana ben cal",
    sampleinput2: "4\ndawn\nnoon\ndusk\nnight\n1",
    sampleoutput2: "night dawn noon dusk",
    input1: "3\nx\ny\nz\n2",
    output1: "y z x",
    input2: "6\np1\np2\np3\np4\np5\np6\n3",
    output2: "p4 p5 p6 p1 p2 p3",
    input3: "2\nalpha\nbeta\n1",
    output3: "beta alpha",
    inputconstrains: "2 <= n <= 100, 1 <= k < n",
    blacklist: "reversed(, deque, [::-1], .append(",
    whitelist: "lst[-k:]",
    sourcecode: `n = int(input())
lst = [input() for _ in range(n)]
k = int(input())
rotated = lst[-k:] + lst[:-k]
print(" ".join(rotated))
`,
  },
  {
    title: "Sort Stall Prices by Hand",
    description:
      "A market stall keeper wants their price board sorted from cheapest to most expensive, but the cash terminal is broken — no built-in sorting allowed. Implement selection sort by hand: repeatedly find the smallest remaining price and swap it into place, sorting the list in place.\n\nInput Format:\nLine 1: integer n. Line 2: n integer prices separated by spaces.\n\nOutput Format:\nOne line with the prices in ascending order, separated by single spaces.\n\nConstraints:\n1 <= n <= 100; prices in 1..1000.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "python",
    topic: TOPIC,
    subtopic: "Creating and Manipulating Lists",
    sampleinput1: "6\n31 12 45 12 8 23",
    sampleoutput1: "8 12 12 23 31 45",
    sampleinput2: "1\n7",
    sampleoutput2: "7",
    input1: "5\n9 8 7 6 5",
    output1: "5 6 7 8 9",
    input2: "4\n100 3 100 3",
    output2: "3 3 100 100",
    input3: "7\n50 20 50 10 20 10 5",
    output3: "5 10 10 20 20 50 50",
    inputconstrains: "1 <= n <= 100, prices in 1..1000",
    blacklist: "sorted(, .sort(",
    whitelist: "for i in range(",
    sourcecode: `n = int(input())
prices = list(map(int, input().split()))
for i in range(n):
    smallest = i
    for j in range(i + 1, n):
        if prices[j] < prices[smallest]:
            smallest = j
    prices[i], prices[smallest] = prices[smallest], prices[i]
print(" ".join(map(str, prices)))
`,
  },
  {
    title: "Sliding Window Peak Load",
    description:
      "A data center records one load sample per minute. Given the samples and a window width w, slide a window of size w across the samples from left to right and report the peak (highest value) inside each window. Find each peak with a manual scan — no max() or min().\n\nInput Format:\nLine 1: integer n. Line 2: n integer readings separated by spaces. Line 3: integer w.\n\nOutput Format:\nOne line with the n - w + 1 window peaks separated by single spaces.\n\nConstraints:\n1 <= w <= n <= 500; readings in 0..1000.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "python",
    topic: TOPIC,
    subtopic: "List Slicing",
    sampleinput1: "6\n3 1 4 1 5 9\n3",
    sampleoutput1: "4 4 5 9",
    sampleinput2: "4\n2 2 2 2\n2",
    sampleoutput2: "2 2 2",
    input1: "5\n1 3 2 5 4\n1",
    output1: "1 3 2 5 4",
    input2: "7\n10 20 30 25 15 35 5\n4",
    output2: "30 30 35 35",
    input3: "6\n9 1 9 1 9 1\n6",
    output3: "9",
    inputconstrains: "1 <= w <= n <= 500, readings in 0..1000",
    blacklist: "max(, min(",
    whitelist: "range(",
    sourcecode: `n = int(input())
readings = list(map(int, input().split()))
w = int(input())
peaks = []
for i in range(n - w + 1):
    best = readings[i]
    for j in range(i, i + w):
        if readings[j] > best:
            best = readings[j]
    peaks.append(best)
print(" ".join(map(str, peaks)))
`,
  },
  {
    title: "Workshop Badge Records",
    description:
      "A workshop checks in attendees and packs each record as an immutable tuple: (name, score, status), where status is pass when the score is at least 50 and fail otherwise. After all records are packed, unpack each tuple in a loop to print the badge sheet.\n\nInput Format:\nLine 1: integer n. Next n lines: name and score separated by a space (score is an integer).\n\nOutput Format:\nOne line per attendee: name, score, and status separated by single spaces, in input order.\n\nConstraints:\n1 <= n <= 50; names are single words; scores in 0..100.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "python",
    topic: TOPIC,
    subtopic: "Packing and Unpacking",
    sampleinput1: "3\nana 82\nbob 41\ncal 50",
    sampleoutput1: "ana 82 pass\nbob 41 fail\ncal 50 pass",
    sampleinput2: "1\ndee 0",
    sampleoutput2: "dee 0 fail",
    input1: "2\neli 100\nfay 49",
    output1: "eli 100 pass\nfay 49 fail",
    input2: "4\ngus 60\nhana 59\nivan 58\njuno 57",
    output2: "gus 60 pass\nhana 59 pass\nivan 58 pass\njuno 57 pass",
    input3: "3\nkim 50\nlee 50\nmara 51",
    output3: "kim 50 pass\nlee 50 pass\nmara 51 pass",
    inputconstrains: "1 <= n <= 50, scores in 0..100",
    blacklist: "dict(",
    whitelist: "tuple(, .append(",
    sourcecode: `n = int(input())
records = []
for _ in range(n):
    name, score = input().split()
    score = int(score)
    status = "pass" if score >= 50 else "fail"
    records.append(tuple([name, score, status]))
for name, score, status in records:
    print(name, score, status)
`,
  },
  {
    title: "Immutable Audit Trail",
    description:
      "A security appliance appends events to an audit trail that must stay immutable, so the trail is modeled as a tuple that grows only by concatenation — never by list mutation methods. Read the events, build the tuple trail, then report its size and the most recent event.\n\nInput Format:\nLine 1: integer n. Next n lines: an event per line, formatted as code followed by a message (the message may contain spaces).\n\nOutput Format:\nLine 1: the number of events in the trail. Line 2: the most recent event as \"code message\".\n\nConstraints:\n1 <= n <= 50; each line is at most 80 characters; the code is a single token and the message is non-empty.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "python",
    topic: TOPIC,
    subtopic: "Tuple Immutability",
    sampleinput1: "3\nE100 system boot\nE205 disk retry\nE310 backup done",
    sampleoutput1: "3\nE310 backup done",
    sampleinput2: "1\nE001 startup",
    sampleoutput2: "1\nE001 startup",
    input1: "2\nW010 low memory\nW020 high latency",
    output1: "2\nW020 high latency",
    input2: "4\nA1 one\nA2 two words\nA3 three word line\nA4 end",
    output2: "4\nA4 end",
    input3: "2\nX9 final event here\nY8 newer",
    output3: "2\nY8 newer",
    inputconstrains: "1 <= n <= 50, event lines up to 80 chars",
    blacklist: ".append(, .extend(, .insert(",
    whitelist: "+ (",
    sourcecode: `n = int(input())
log = ()
for _ in range(n):
    code, message = input().split(" ", 1)
    log = log + ((code, message),)
print(len(log))
last_code, last_message = log[-1]
print(last_code, last_message)
`,
  },

  /* ── hard (extreme scenario, blacklist + whitelist, maxscore 30) ── */

  {
    title: "Warehouse Pallet Allocation",
    description:
      "A warehouse loads arriving pallets onto trucks using a first-fit rule. Each truck has a capacity; pallets arrive in a fixed order. Every pallet is placed onto the FIRST truck (in input order) whose remaining capacity can hold it; if no truck can take it, the pallet stays on the dock. Trucks keep pallets in the order they were loaded.\n\nInput Format:\nLine 1: integer t, the number of trucks. Line 2: t integer capacities separated by spaces. Line 3: integer n, the number of pallets. Line 4: n integer weights separated by spaces (arrival order).\n\nOutput Format:\nOne line per truck, in input order: \"Truck i: w1 w2 ... | left: r\" where the w's are the pallet weights loaded on that truck in loading order and r is the remaining capacity. If a truck loaded nothing, print \"Truck i: | left: r\". Final line: \"Dock: w1 w2 ...\" with the unloaded pallets in arrival order, or \"Dock:\" if the dock is empty.\n\nConstraints:\n1 <= t <= 10; 1 <= n <= 100; capacities and weights in 1..1000. No sorting is needed or allowed — process everything in input order and accumulate totals manually (no sum()).",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "python",
    topic: TOPIC,
    subtopic: "Creating and Manipulating Lists",
    sampleinput1: "2\n30 25\n5\n12 9 11 20 5",
    sampleoutput1: "Truck 1: 12 9 5 | left: 4\nTruck 2: 11 | left: 14\nDock: 20",
    sampleinput2: "1\n10\n3\n3 3 3",
    sampleoutput2: "Truck 1: 3 3 3 | left: 1\nDock:",
    input1: "2\n10 10\n4\n5 5 5 5",
    output1: "Truck 1: 5 5 | left: 0\nTruck 2: 5 5 | left: 0\nDock:",
    input2: "3\n5 5 5\n2\n6 7",
    output2: "Truck 1: | left: 5\nTruck 2: | left: 5\nTruck 3: | left: 5\nDock: 6 7",
    input3: "2\n8 3\n6\n2 2 2 3 1 1",
    output3: "Truck 1: 2 2 2 1 1 | left: 0\nTruck 2: 3 | left: 0\nDock:",
    inputconstrains: "1 <= t <= 10, 1 <= n <= 100, capacities and weights in 1..1000",
    blacklist: "sorted(, sum(",
    whitelist: ".append(",
    sourcecode: `t = int(input())
caps = list(map(int, input().split()))
n = int(input())
weights = list(map(int, input().split()))
loads = []
left = []
for cap in caps:
    loads.append([])
    left.append(cap)
dock = []
for w in weights:
    placed = False
    for i in range(t):
        if left[i] >= w:
            loads[i].append(w)
            left[i] -= w
            placed = True
            break
    if not placed:
        dock.append(w)
for i in range(t):
    joined = " ".join(map(str, loads[i]))
    if joined:
        print(f"Truck {i + 1}: {joined} | left: {left[i]}")
    else:
        print(f"Truck {i + 1}: | left: {left[i]}")
if dock:
    print("Dock: " + " ".join(map(str, dock)))
else:
    print("Dock:")
`,
  },
  {
    title: "Exam Seat Reallocation",
    description:
      "An exam hall keeps its seating chart as an ordered list of student names. The invigilator applies a batch of reallocation operations: JOIN pos name seats a student at 0-based position pos; LEAVE pos removes whoever sits at position pos; MOVE a b removes the student at position a and re-seats them at position b of the list that results from that removal; SWAP p q exchanges the students at positions p and q. Names may repeat, so every operation works on positions, not names.\n\nInput Format:\nLine 1: integer n. Next n lines: the initial seating, one name per line. Line n+2: integer m, the number of operations. Next m lines: one operation each (JOIN pos name / LEAVE pos / MOVE a b / SWAP p q).\n\nOutput Format:\nThe final seating chart, one name per line.\n\nConstraints:\n1 <= n <= 50; 0 <= m <= 50; names are single words of up to 20 characters; all positions are guaranteed valid (JOIN pos satisfies 0 <= pos <= current length; for MOVE, b is valid in the list after the removal). Use pop/insert based list surgery; do not use remove(), del, or any sorting.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "python",
    topic: TOPIC,
    subtopic: "List Methods",
    sampleinput1: "4\nann\nben\ncal\ndan\n3\nMOVE 0 2\nJOIN 1 zoe\nSWAP 3 0",
    sampleoutput1: "ann\nzoe\ncal\nben\ndan",
    sampleinput2: "2\npia\nria\n2\nLEAVE 0\nJOIN 0 tia",
    sampleoutput2: "tia\nria",
    input1: "3\nom\nri\nsam\n3\nSWAP 0 2\nLEAVE 1\nJOIN 2 kim",
    output1: "sam\nom\nkim",
    input2: "5\na\nb\nc\nd\ne\n2\nMOVE 4 0\nMOVE 0 4",
    output2: "a\nb\nc\nd\ne",
    input3: "3\ndup\ndup\nval\n2\nLEAVE 0\nSWAP 0 1",
    output3: "val\ndup",
    inputconstrains: "1 <= n <= 50, 0 <= m <= 50, all positions valid",
    blacklist: ".remove(, sorted(, del ",
    whitelist: ".pop(, .insert(",
    sourcecode: `n = int(input())
seats = [input() for _ in range(n)]
m = int(input())
for _ in range(m):
    parts = input().split()
    op = parts[0]
    if op == "JOIN":
        seats.insert(int(parts[1]), parts[2])
    elif op == "LEAVE":
        seats.pop(int(parts[1]))
    elif op == "MOVE":
        a, b = int(parts[1]), int(parts[2])
        student = seats.pop(a)
        seats.insert(b, student)
    else:
        p, q = int(parts[1]), int(parts[2])
        seats[p], seats[q] = seats[q], seats[p]
for name in seats:
    print(name)
`,
  },
  {
    title: "Tuple Ledger Reconciliation",
    description:
      "A tiny accounting app stores ledgers as immutable tuples of (key, value) pairs. Ledger A and ledger B must be reconciled into ONE tuple ledger: start from A's entries in order, then process B's entries in order — if a key is already present, that entry's value is replaced in place; otherwise the new entry is appended at the end. Because tuples are immutable, every replacement and append must rebuild the tuple via concatenation (no dicts, no lists of records, no mutation).\n\nInput Format:\nLine 1: integer n. Next n lines: key and integer value separated by a space (ledger A, keys unique within A). Next line: integer m. Next m lines: key and integer value (ledger B, keys unique within B).\n\nOutput Format:\nThe reconciled ledger, one \"key value\" pair per line, in merged order.\n\nConstraints:\n1 <= n, m <= 50; keys are single tokens of up to 15 characters; values in 0..1000; keys are unique within each ledger (they may overlap between ledgers).",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "python",
    topic: TOPIC,
    subtopic: "Creating and Using Tuples",
    sampleinput1: "3\napple 5\nkiwi 3\nfig 9\n2\nkiwi 7\ndate 4",
    sampleoutput1: "apple 5\nkiwi 7\nfig 9\ndate 4",
    sampleinput2: "1\nsolo 1\n1\nsolo 2",
    sampleoutput2: "solo 2",
    input1: "2\na 1\nb 2\n3\nb 9\nc 3\nd 4",
    output1: "a 1\nb 9\nc 3\nd 4",
    input2: "2\nx 10\ny 20\n0",
    output2: "x 10\ny 20",
    input3: "3\np 1\nq 2\nr 3\n2\nr 30\np 10",
    output3: "p 10\nq 2\nr 30",
    inputconstrains: "1 <= n, m <= 50, values in 0..1000, keys unique per ledger",
    blacklist: "dict(, {, .append(",
    whitelist: "+ (, .index(",
    sourcecode: `n = int(input())
ledger = ()
keys = ()
for _ in range(n):
    k, v = input().split()
    ledger = ledger + ((k, int(v)),)
    keys = keys + (k,)
m = int(input())
for _ in range(m):
    k, v = input().split()
    v = int(v)
    if k in keys:
        i = keys.index(k)
        ledger = ledger[:i] + ((k, v),) + ledger[i + 1:]
    else:
        ledger = ledger + ((k, v),)
        keys = keys + (k,)
for k, v in ledger:
    print(k, v)
`,
  },
  {
    title: "Round Robin Tournament Scheduler",
    description:
      "A chess club schedules a round-robin tournament for an even number of players using the circle method: the player at index 0 stays fixed, and in every round each player is paired against the player mirroring them in the list (position i versus position n-1-i). After each round, everyone except the fixed player rotates one step: the list becomes [first] + [last] + everything between them. Print all n-1 rounds.\n\nInput Format:\nLine 1: integer n (even). Next n lines: one player name per line (unique, single words).\n\nOutput Format:\nAll pairings, one per line as \"a vs b\", in round order and within each round from the ends toward the middle.\n\nConstraints:\n2 <= n <= 10 with n even; names are single words of up to 20 characters. Pure slicing rotation — no itertools, no deque, no reversal helpers.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "python",
    topic: TOPIC,
    subtopic: "List Slicing",
    sampleinput1: "4\nana\nben\ncal\ndee",
    sampleoutput1: "ana vs dee\nben vs cal\nana vs cal\ndee vs ben\nana vs ben\ncal vs dee",
    sampleinput2: "2\nsol\nluna",
    sampleoutput2: "sol vs luna",
    input1: "6\np1\np2\np3\np4\np5\np6",
    output1: "p1 vs p6\np2 vs p5\np3 vs p4\np1 vs p5\np6 vs p4\np2 vs p3\np1 vs p4\np5 vs p3\np6 vs p2\np1 vs p3\np4 vs p2\np5 vs p6\np1 vs p2\np3 vs p6\np4 vs p5",
    input2: "4\nx\ny\nz\nw",
    output2: "x vs w\ny vs z\nx vs z\nw vs y\nx vs y\nz vs w",
    input3: "2\na\nb",
    output3: "a vs b",
    inputconstrains: "2 <= n <= 10, n even, unique single-word names",
    blacklist: "reversed(, deque, itertools",
    whitelist: "[1:-1]",
    sourcecode: `n = int(input())
roster = [input() for _ in range(n)]
for _ in range(n - 1):
    for i in range(n // 2):
        print(roster[i], "vs", roster[n - 1 - i])
    roster = [roster[0]] + [roster[-1]] + roster[1:-1]
`,
  },
];

/* ───────────────────────────── MCQ questions ───────────────────────────── */

const mcqQuestions = [
  {
    title: "List Aliasing Basics",
    description:
      "In Python, assigning a list to a new variable copies the reference, not the elements. Given: a = [1, 2], then b = a, then b.append(9). What is len(a) afterwards?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Creating and Manipulating Lists",
    Option1: "2",
    Option2: "3",
    Option3: "4",
    Option4: "It raises TypeError",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "List Repetition Operator",
    description: "What does the expression [3] * 3 evaluate to in Python 3?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Creating and Manipulating Lists",
    Option1: "[3, 3, 3]",
    Option2: "[9]",
    Option3: "[[3], [3], [3]]",
    Option4: "It raises TypeError",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Slice Length Rule",
    description:
      "For vals = [10, 20, 30, 40, 50], what is len(vals[1:3])?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "List Slicing",
    Option1: "1",
    Option2: "2",
    Option3: "3",
    Option4: "4",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Default pop Behavior",
    description:
      "Calling lst.pop() with no argument on a non-empty list does what?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "List Methods",
    Option1: "Removes and returns the last element",
    Option2: "Removes and returns the first element",
    Option3: "Removes a random element",
    Option4: "Raises IndexError",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Single-Element Tuple Comma",
    description: "What is type((5)) in Python 3?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Creating and Using Tuples",
    Option1: "tuple",
    Option2: "int",
    Option3: "str",
    Option4: "NameError",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "In-Place Append Choice",
    description:
      "Which call adds a single element to the end of a list in place, changing the original list object?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "List Methods",
    Option1: "lst + [x]",
    Option2: "lst.append(x)",
    Option3: "[x] + lst",
    Option4: "lst.push(x)",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Insert Shifts Elements Right",
    description:
      "Starting with lst = [1, 2, 3], the call lst.insert(1, 9) runs. What is lst now?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "List Methods",
    Option1: "[1, 9, 2, 3]",
    Option2: "[9, 1, 2, 3]",
    Option3: "[1, 2, 9, 3]",
    Option4: "[1, 9, 3]",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "index Method Missing Value",
    description:
      "What happens when you call lst.index(99) and 99 is not an element of lst?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "List Methods",
    Option1: "It raises ValueError",
    Option2: "It raises KeyError",
    Option3: "It returns -1",
    Option4: "It returns None",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Slicing Returns a New List",
    description: "Which statement about the expression lst[2:5] is TRUE?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "List Slicing",
    Option1: "It returns a new list containing the elements at indices 2, 3 and 4",
    Option2: "It returns a view that updates automatically when lst changes",
    Option3: "It removes those elements from lst",
    Option4: "It returns a tuple of those elements",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Choosing Tuples Over Lists",
    description:
      "In which situation is a tuple the better choice over a list?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Creating and Using Tuples",
    Option1: "Storing a fixed-shape record like (name, age) that must not change",
    Option2: "Collecting search results that grow item by item in a loop",
    Option3: "Maintaining a to-do list that users edit during the session",
    Option4: "Building a stack with push and pop operations",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Negative Slice Outputs",
    description:
      "The snippet prints two lines. What are they?\n\nvals = [10, 20, 30, 40, 50]\nprint(vals[-2:])\nprint(vals[1:-1])",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "List Slicing",
    Option1: "[40, 50] then [20, 30]",
    Option2: "[50, 40] then [20, 30, 40]",
    Option3: "[40, 50] then [20, 30, 40]",
    Option4: "[30, 40, 50] then [40, 30, 20]",
    CorrectOption: 3,
    iscodesnippet: true,
    codesnippet: `vals = [10, 20, 30, 40, 50]
print(vals[-2:])
print(vals[1:-1])
`,
    snippetLang: "python",
  },
  {
    title: "Enumerate with Start",
    description:
      "The snippet prints three lines. What are they?\n\nfruits = [\"kiwi\", \"fig\", \"plum\"]\nfor i, fruit in enumerate(fruits, start=1):\n    print(i, fruit)",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "List Methods",
    Option1: "0 kiwi, then 1 fig, then 2 plum",
    Option2: "1 kiwi, then 2 fig, then 3 plum",
    Option3: "1 (0, 'kiwi'), then 2 (1, 'fig')",
    Option4: "kiwi 1, then fig 2, then plum 3",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `fruits = ["kiwi", "fig", "plum"]
for i, fruit in enumerate(fruits, start=1):
    print(i, fruit)
`,
    snippetLang: "python",
  },
  {
    title: "Zip Pair Printing",
    description:
      "The snippet prints two lines. What are they?\n\nnames = [\"ana\", \"bob\"]\nscores = [80, 90]\nfor name, score in zip(names, scores):\n    print(name, score)",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Packing and Unpacking",
    Option1: "ana 80, then bob 90",
    Option2: "ana bob 80 90",
    Option3: "(0, 'ana', 80), then (1, 'bob', 90)",
    Option4: "ana 80, then bob 90, then ana 90, then bob 80",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `names = ["ana", "bob"]
scores = [80, 90]
for name, score in zip(names, scores):
    print(name, score)
`,
    snippetLang: "python",
  },
  {
    title: "remove versus pop",
    description:
      "The snippet prints one line. What is it?\n\nnums = [4, 6, 4, 8]\nnums.remove(4)\nlast = nums.pop()\nprint(nums, last)",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "List Methods",
    Option1: "[4, 6] 8",
    Option2: "[6, 4] 8",
    Option3: "[6, 4, 8] 4",
    Option4: "[6, 8] 4",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `nums = [4, 6, 4, 8]
nums.remove(4)
last = nums.pop()
print(nums, last)
`,
    snippetLang: "python",
  },
  {
    title: "Star Unpacking Rest",
    description:
      "The snippet prints two lines. What are they?\n\nfirst, *rest = [1, 2, 3, 4]\nprint(first)\nprint(rest)",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Packing and Unpacking",
    Option1: "1, then (2, 3, 4)",
    Option2: "1, then [2, 3, 4]",
    Option3: "[1], then [2, 3, 4]",
    Option4: "1, then [1, 2, 3]",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `first, *rest = [1, 2, 3, 4]
print(first)
print(rest)
`,
    snippetLang: "python",
  },
  {
    title: "Tuple Item Assignment Error",
    description:
      "Given t = (1, 2, 3), what does the statement t[0] = 9 do?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Tuple Immutability",
    Option1: "Raises TypeError",
    Option2: "Raises ValueError",
    Option3: "Changes t to (9, 2, 3)",
    Option4: "Silently does nothing",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Function Mutates Caller List",
    description:
      "The snippet prints two lines. What are they?\n\ndef add_tag(items):\n    items.append(\"x\")\n    return items\n\na = [1, 2]\nb = add_tag(a)\nprint(a)\nprint(b is a)",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Creating and Manipulating Lists",
    Option1: "[1, 2] then True",
    Option2: "[1, 2, 'x'] then False",
    Option3: "[1, 2, 'x'] then True",
    Option4: "[1, 2] then False",
    CorrectOption: 3,
    iscodesnippet: true,
    codesnippet: `def add_tag(items):
    items.append("x")
    return items

a = [1, 2]
b = add_tag(a)
print(a)
print(b is a)
`,
    snippetLang: "python",
  },
  {
    title: "Tuple Holding a Mutable List",
    description:
      "The tuple itself is immutable, but elements it holds may still be mutable. The snippet prints two lines. What are they?\n\nt = (1, [2, 3])\nt[1].append(4)\nprint(t)\nprint(len(t))",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Tuple Immutability",
    Option1: "A TypeError is raised before anything prints",
    Option2: "(1, [2, 3, 4]) then 2",
    Option3: "(1, [2, 3]) then 2",
    Option4: "(1, [2, 3, 4]) then 3",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `t = (1, [2, 3])
t[1].append(4)
print(t)
print(len(t))
`,
    snippetLang: "python",
  },
  {
    title: "Slice Assignment Resizes",
    description:
      "Slice assignment can change a list's length. The snippet prints two lines. What are they?\n\nnums = [1, 2, 3, 4, 5]\nnums[1:3] = [20, 30, 40]\nprint(nums)\nprint(len(nums))",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "List Slicing",
    Option1: "[1, 20, 30, 4, 5] then 5",
    Option2: "[1, 20, 30, 40, 4, 5] then 6",
    Option3: "[20, 30, 40] then 3",
    Option4: "[1, 20, 40, 4, 5] then 5",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `nums = [1, 2, 3, 4, 5]
nums[1:3] = [20, 30, 40]
print(nums)
print(len(nums))
`,
    snippetLang: "python",
  },
  {
    title: "Swap and Star Printing",
    description:
      "The snippet prints two lines. What are they?\n\na, b = 3, 7\na, b = b, a\nprint(a, b)\nprint(*[10, 20, 30], sep=\"-\")",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Packing and Unpacking",
    Option1: "3 7 then 10-20-30",
    Option2: "7 3 then 10 20 30",
    Option3: "7 3 then 10-20-30",
    Option4: "3 7 then 102030",
    CorrectOption: 3,
    iscodesnippet: true,
    codesnippet: `a, b = 3, 7
a, b = b, a
print(a, b)
print(*[10, 20, 30], sep="-")
`,
    snippetLang: "python",
  },
];

/* ───────────────────────── self-checks before writing ───────────────────── */

function fail(msg: string): never {
  throw new Error("BUILDER SELF-CHECK: " + msg);
}

if (codeQuestions.length !== 20) fail(`code questions = ${codeQuestions.length}, want 20`);
if (mcqQuestions.length !== 20) fail(`mcq questions = ${mcqQuestions.length}, want 20`);

const diffCount = { easy: 0, medium: 0, hard: 0 };
let basic = 0;
let scenarioEasy = 0;
for (const q of codeQuestions) {
  diffCount[q.difficulty] = (diffCount[q.difficulty] || 0) + 1;
  if (q.difficulty === "easy") {
    if (q.variant === "basic") basic++;
    if (q.variant === "scenario") scenarioEasy++;
  }
  if (q.difficulty !== "easy") {
    for (const kw of q.blacklist.split(",").map((s) => s.trim()).filter(Boolean)) {
      if (q.sourcecode.includes(kw)) fail(`"${q.title}" blacklisted token "${kw}" present in source`);
    }
    for (const kw of q.whitelist.split(",").map((s) => s.trim()).filter(Boolean)) {
      if (!q.sourcecode.includes(kw)) fail(`"${q.title}" whitelisted token "${kw}" missing from source`);
    }
  }
  for (const f of ["sampleinput1", "sampleinput2", "input1", "input2", "input3"]) {
    if (!q[f] || q[f].length === 0) fail(`"${q.title}" field ${f} empty`);
  }
}
if (diffCount.easy !== 10 || diffCount.medium !== 6 || diffCount.hard !== 4)
  fail(`difficulty split ${JSON.stringify(diffCount)}`);
if (basic !== 6 || scenarioEasy !== 4) fail(`easy split basic=${basic} scenario=${scenarioEasy}`);

const allTitles = new Set();
for (const q of [...codeQuestions, ...mcqQuestions]) {
  if (allTitles.has(q.title)) fail(`duplicate title "${q.title}"`);
  allTitles.add(q.title);
}

const snippets = mcqQuestions.filter((q) => q.iscodesnippet).length;
if (snippets < 6) fail(`only ${snippets} snippet MCQs, need >= 6`);

/* ───────────────────────────── write files ──────────────────────────────── */

const outDir = "/home/z/my-project/scripts/python-programming/data";
writeFileSync(`${outDir}/day-07.code.json`, JSON.stringify({ day: 7, topics, questions: codeQuestions }, null, 2));
writeFileSync(`${outDir}/day-07.mcq.json`, JSON.stringify({ day: 7, questions: mcqQuestions }, null, 2));
console.log(`wrote day 07: ${codeQuestions.length} code + ${mcqQuestions.length} mcq (${snippets} snippets)`);
