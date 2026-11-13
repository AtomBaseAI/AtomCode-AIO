/**
 * Builder for Day 08 — "Dictionaries and Sets" (PYTHON Programming).
 * 20 code questions + 20 MCQs, authored from scratch for AtomCode.
 *
 * Run: bun scripts/python-programming/builders/build-day-08.ts
 */

import { writeFileSync } from "node:fs";

const TOPIC = "Dictionaries and Sets";
const SUBTOPICS = [
  "Creating Dictionaries",
  "Dictionary Methods",
  "Working with Key-Value Pairs",
  "Creating Sets",
  "Set Operations",
];

const topics = [{ name: TOPIC, subtopics: [...SUBTOPICS] }];

/* ───────────────────────────── code questions ───────────────────────────── */

const codeQuestions = [
  {
    title: "Build a Snack Price Map",
    description:
      "A kiosk keeps snack prices in a dictionary. Read the snack list, build the price map, then display it and its size.\n\nInput Format:\nLine 1: integer n. Next n lines: item and integer price separated by a space (items are distinct single words).\n\nOutput Format:\nOne line per item in insertion order: the item, a space, and its price. Last line: the number of items in the dictionary.\n\nConstraints:\n1 <= n <= 20; item names are single words of up to 15 characters; prices in 1..1000.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "python",
    topic: TOPIC,
    subtopic: "Creating Dictionaries",
    sampleinput1: "3\nchips 20\nsoda 35\ncookies 45",
    sampleoutput1: "chips 20\nsoda 35\ncookies 45\n3",
    sampleinput2: "1\nwater 10",
    sampleoutput2: "water 10\n1",
    input1: "2\ntea 15\ncoffee 40",
    output1: "tea 15\ncoffee 40\n2",
    input2: "4\nbagel 25\nmuffin 35\nscone 20\nwrap 45",
    output2: "bagel 25\nmuffin 35\nscone 20\nwrap 45\n4",
    input3: "5\napple 12\nbanana 8\ncherry 30\ndates 18\nelder 22",
    output3: "apple 12\nbanana 8\ncherry 30\ndates 18\nelder 22\n5",
    inputconstrains: "1 <= n <= 20, prices in 1..1000, distinct item names",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = int(input())
prices = {}
for _ in range(n):
    item, price = input().split()
    prices[item] = int(price)
for item, price in prices.items():
    print(item, price)
print(len(prices))
`,
  },
  {
    title: "Update the Locker Codes",
    description:
      "A gym stores locker codes in a dictionary. After the initial entries, one brand-new locker is registered and one existing locker gets its code overwritten. Remember: assigning to an existing key updates it in place (it keeps its original position), while a new key is added at the end.\n\nInput Format:\nLine 1: integer n. Next n lines: locker and integer code separated by a space. Next line: a locker name that is NOT among the first n, with its code. Last line: a locker name that IS among the first n, with its new code.\n\nOutput Format:\nThe final locker map, one \"locker code\" pair per line in insertion order (updated keys stay where they first appeared; the new key appears last).\n\nConstraints:\n2 <= n <= 20; locker names are single tokens; codes in 1000..9999.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "python",
    topic: TOPIC,
    subtopic: "Dictionary Methods",
    sampleinput1: "2\nA101 4321\nA102 5555\nA103 7777\nA101 9999",
    sampleoutput1: "A101 9999\nA102 5555\nA103 7777",
    sampleinput2: "2\nB01 1000\nB02 2000\nB03 3000\nB01 1111",
    sampleoutput2: "B01 1111\nB02 2000\nB03 3000",
    input1: "3\nL10 1234\nL20 2345\nL30 3456\nL40 4567\nL20 9999",
    output1: "L10 1234\nL20 9999\nL30 3456\nL40 4567",
    input2: "2\nX1 11\nX2 22\nX3 33\nX2 22",
    output2: "X1 11\nX2 22\nX3 33",
    input3: "3\nP7 700\nP8 800\nP9 900\nP10 1000\nP7 707",
    output3: "P7 707\nP8 800\nP9 900\nP10 1000",
    inputconstrains: "2 <= n <= 20, codes in 1000..9999",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = int(input())
lockers = {}
for _ in range(n):
    locker, code = input().split()
    lockers[locker] = int(code)
new_locker, new_code = input().split()
lockers[new_locker] = int(new_code)
old_locker, old_code = input().split()
lockers[old_locker] = int(old_code)
for locker, code in lockers.items():
    print(locker, code)
`,
  },
  {
    title: "Pop a Key from the Pantry Map",
    description:
      "A pantry tracker stores item quantities in a dictionary. One item is used up and must be removed with the pop method, which also returns the removed value.\n\nInput Format:\nLine 1: integer n. Next n lines: item and integer quantity separated by a space. Last line: the item to remove, guaranteed to be an existing key.\n\nOutput Format:\nLine 1: the value that pop returned. Then one line per remaining item in insertion order: the item, a space, and its quantity.\n\nConstraints:\n2 <= n <= 20; item names are single words; quantities in 0..100; the removed key always exists.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "python",
    topic: TOPIC,
    subtopic: "Dictionary Methods",
    sampleinput1: "3\nflour 5\nsugar 3\nrice 10\nsugar",
    sampleoutput1: "3\nflour 5\nrice 10",
    sampleinput2: "2\nsalt 1\npepper 2\nsalt",
    sampleoutput2: "1\npepper 2",
    input1: "4\nbeans 7\ncorn 9\noats 4\nhoney 2\ncorn",
    output1: "9\nbeans 7\noats 4\nhoney 2",
    input2: "2\njam 12\nbread 3\nbread",
    output2: "3\njam 12",
    input3: "3\npasta 6\nsauce 8\ncheese 4\npasta",
    output3: "6\nsauce 8\ncheese 4",
    inputconstrains: "2 <= n <= 20, quantities in 0..100, removed key exists",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = int(input())
pantry = {}
for _ in range(n):
    item, qty = input().split()
    pantry[item] = int(qty)
key = input()
removed = pantry.pop(key)
print(removed)
for item, qty in pantry.items():
    print(item, qty)
`,
  },
  {
    title: "Keys Values Items Tour",
    description:
      "Practice the three dictionary views. Read n pairs, then walk through the keys view, the values view, and the items view.\n\nInput Format:\nLine 1: integer n. Next n lines: key and integer value separated by a space (keys are distinct single words).\n\nOutput Format:\nLine 1: all keys separated by single spaces. Line 2: all values separated by single spaces. Then n lines, one per pair, formatted as key=value.\n\nConstraints:\n1 <= n <= 20; keys are single words of up to 15 characters; values in 0..100.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "python",
    topic: TOPIC,
    subtopic: "Working with Key-Value Pairs",
    sampleinput1: "3\nred 1\ngreen 2\nblue 3",
    sampleoutput1: "red green blue\n1 2 3\nred=1\ngreen=2\nblue=3",
    sampleinput2: "1\nsolo 9",
    sampleoutput2: "solo\n9\nsolo=9",
    input1: "2\nsun 5\nmoon 6",
    output1: "sun moon\n5 6\nsun=5\nmoon=6",
    input2: "4\na 10\nb 20\nc 30\nd 40",
    output2: "a b c d\n10 20 30 40\na=10\nb=20\nc=30\nd=40",
    input3: "3\nkit 3\nnet 4\npen 5",
    output3: "kit net pen\n3 4 5\nkit=3\nnet=4\npen=5",
    inputconstrains: "1 <= n <= 20, values in 0..100, distinct keys",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = int(input())
pairs = {}
for _ in range(n):
    k, v = input().split()
    pairs[k] = int(v)
print(" ".join(pairs.keys()))
print(" ".join(map(str, pairs.values())))
for k, v in pairs.items():
    print(f"{k}={v}")
`,
  },
  {
    title: "Club Membership Set",
    description:
      "A book club keeps its member list as a set, so duplicates vanish automatically. Read the sign-up names (duplicates possible), add one late sign-up with the add method, then report the membership.\n\nInput Format:\nLine 1: integer n. Next n lines: one name per line (single words, duplicates allowed). Last line: the late sign-up name, added to the set even if already present.\n\nOutput Format:\nLine 1: the number of unique members. Line 2: the member names in alphabetical order, separated by single spaces.\n\nConstraints:\n1 <= n <= 30; names are lowercase single words of up to 15 characters.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "python",
    topic: TOPIC,
    subtopic: "Creating Sets",
    sampleinput1: "4\nana\nbob\nana\ncal\ndee",
    sampleoutput1: "4\nana bob cal dee",
    sampleinput2: "3\nx\ny\nx\ny",
    sampleoutput2: "2\nx y",
    input1: "2\nrose\nlotus\nrose",
    output1: "2\nlotus rose",
    input2: "1\nsolo\nsolo",
    output2: "1\nsolo",
    input3: "5\nfin\nfin\nfan\nfun\nfon\nsun",
    output3: "5\nfan fin fon fun sun",
    inputconstrains: "1 <= n <= 30, lowercase single-word names",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = int(input())
members = set()
for _ in range(n):
    members.add(input())
extra = input()
members.add(extra)
print(len(members))
print(" ".join(sorted(members)))
`,
  },
  {
    title: "Union and Intersection Drill",
    description:
      "Build two integer sets from raw input and compute their union and intersection with the set methods union and intersection.\n\nInput Format:\nLine 1: integers for set A separated by spaces. Line 2: integers for set B separated by spaces.\n\nOutput Format:\nLine 1: the union in ascending order, space-separated. Line 2: the intersection in ascending order, space-separated (this line is empty if the sets share nothing).\n\nConstraints:\nEach set has 1..20 integers in 0..100.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "python",
    topic: TOPIC,
    subtopic: "Set Operations",
    sampleinput1: "1 2 3 4\n3 4 5",
    sampleoutput1: "1 2 3 4 5\n3 4",
    sampleinput2: "10 20\n20 30",
    sampleoutput2: "10 20 30\n20",
    input1: "2 4 6 8\n4 8 12",
    output1: "2 4 6 8 12\n4 8",
    input2: "5 5 5\n5",
    output2: "5\n5",
    input3: "1 2 3\n1 2 3",
    output3: "1 2 3\n1 2 3",
    inputconstrains: "1..20 integers per line, each in 0..100",
    blacklist: "",
    whitelist: "",
    sourcecode: `a = set(map(int, input().split()))
b = set(map(int, input().split()))
union = a.union(b)
inter = a.intersection(b)
print(" ".join(map(str, sorted(union))))
print(" ".join(map(str, sorted(inter))))
`,
  },

  /* ── easy scenarios ── */

  {
    title: "Phone Directory Lookup",
    description:
      "A small office keeps phone numbers in a dictionary. Read the contacts, then answer one lookup query. Use the get method with the fallback \"Not found\" so a missing contact never crashes the program.\n\nInput Format:\nLine 1: integer n. Next n lines: name and phone number separated by a space (phone is a digit string, read it as text). Last line: the queried name.\n\nOutput Format:\nThe stored phone number if the name is a key, otherwise exactly: Not found\n\nConstraints:\n1 <= n <= 50; names are single words; phone numbers are digit strings of 1..8 digits.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "python",
    topic: TOPIC,
    subtopic: "Dictionary Methods",
    sampleinput1: "3\namy 5551\nraj 5552\nkim 5553\nraj",
    sampleoutput1: "5552",
    sampleinput2: "2\nlee 1111\nmax 2222\nzoe",
    sampleoutput2: "Not found",
    input1: "4\nida 4010\njon 4020\nkai 4030\nlux 4040\nlux",
    output1: "4040",
    input2: "3\npat 9001\nqas 9002\nravi 9003\nsam",
    output2: "Not found",
    input3: "1\nabe 0001\nabe",
    output3: "0001",
    inputconstrains: "1 <= n <= 50, digit-string phone numbers, single query",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = int(input())
directory = {}
for _ in range(n):
    name, phone = input().split()
    directory[name] = phone
query = input()
print(directory.get(query, "Not found"))
`,
  },
  {
    title: "Warehouse Stock Updater",
    description:
      "A warehouse tracks part quantities in a dictionary. A batch of adjustment records arrives: each gives an item and a signed delta (positive restock, negative consumption). Items not yet in the dictionary start from zero. Apply every adjustment and print the final stock.\n\nInput Format:\nLine 1: integer n. Next n lines: item and integer quantity separated by a space. Line n+2: integer m. Next m lines: item and signed integer delta separated by a space.\n\nOutput Format:\nOne line per item in insertion order: item, a space, quantity. Existing items keep their original position; items first mentioned in the adjustments appear at the end in the order they first appeared.\n\nConstraints:\n1 <= n, m <= 30; item names are single words; quantities and deltas keep every final stock >= 0.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "python",
    topic: TOPIC,
    subtopic: "Working with Key-Value Pairs",
    sampleinput1: "3\nbolt 50\nnut 30\nwasher 12\n2\nbolt -10\nscrew 8",
    sampleoutput1: "bolt 40\nnut 30\nwasher 12\nscrew 8",
    sampleinput2: "1\nnail 5\n1\nnail -5",
    sampleoutput2: "nail 0",
    input1: "2\npeg 4\ndowel 9\n2\ndowel 1\npeg -4",
    output1: "peg 0\ndowel 10",
    input2: "3\nink 10\nton 3\ndrum 1\n2\ntoner 5\nink -2",
    output2: "ink 8\nton 3\ndrum 1\ntoner 5",
    input3: "2\nclip 7\npin 2\n1\nclip 0",
    output3: "clip 7\npin 2",
    inputconstrains: "1 <= n, m <= 30, final stock always >= 0",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = int(input())
stock = {}
for _ in range(n):
    item, qty = input().split()
    stock[item] = int(qty)
m = int(input())
for _ in range(m):
    item, delta = input().split()
    stock[item] = stock.get(item, 0) + int(delta)
for item, qty in stock.items():
    print(item, qty)
`,
  },
  {
    title: "Class Monitor Vote Count",
    description:
      "A class votes for a monitor by writing one name per ballot. Count the votes with a plain dictionary (no built-in counting helpers): each name maps to its tally. Report every candidate in the order their first vote arrived, then announce the winner — a single candidate with the strict highest tally is guaranteed.\n\nInput Format:\nLine 1: integer n, the number of ballots. Next n lines: one candidate name per line.\n\nOutput Format:\nOne line per candidate in first-mention order: name, a space, tally. Last line: Winner: name\n\nConstraints:\n1 <= n <= 100; names are single words; exactly one candidate has the strict maximum tally.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "python",
    topic: TOPIC,
    subtopic: "Working with Key-Value Pairs",
    sampleinput1: "4\nines\ncarl\nines\nmia",
    sampleoutput1: "ines 2\ncarl 1\nmia 1\nWinner: ines",
    sampleinput2: "2\nzara\nzara",
    sampleoutput2: "zara 2\nWinner: zara",
    input1: "5\ntom\ntim\ntam\ntom\ntom",
    output1: "tom 3\ntim 1\ntam 1\nWinner: tom",
    input2: "3\nada\nada\nben",
    output2: "ada 2\nben 1\nWinner: ada",
    input3: "6\nqi\nwu\nqi\nwu\nqi\nzhou",
    output3: "qi 3\nwu 2\nzhou 1\nWinner: qi",
    inputconstrains: "1 <= n <= 100, unique strict maximum guaranteed",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = int(input())
counts = {}
for _ in range(n):
    name = input()
    if name in counts:
        counts[name] = counts[name] + 1
    else:
        counts[name] = 1
for name, count in counts.items():
    print(name, count)
winner = ""
best = 0
for name, count in counts.items():
    if count > best:
        best = count
        winner = name
print("Winner:", winner)
`,
  },
  {
    title: "Museum Unique Visitor Log",
    description:
      "A museum entrance logs one check-in per visitor name; visitors may return during the day. Count how many unique visitors came and how many check-ins were repeat visits.\n\nInput Format:\nLine 1: integer n, the number of check-ins. Next n lines: one visitor name per line.\n\nOutput Format:\nLine 1: the number of unique visitors. Line 2: the number of repeat check-ins (check-ins for names already seen).\n\nConstraints:\n1 <= n <= 100; names are single words of up to 20 characters.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "python",
    topic: TOPIC,
    subtopic: "Creating Sets",
    sampleinput1: "6\nliam\nnoor\nliam\neve\nnoor\nzara",
    sampleoutput1: "4\n2",
    sampleinput2: "3\nom\nom\nom",
    sampleoutput2: "1\n2",
    input1: "4\nada\nben\nada\ncal",
    output1: "3\n1",
    input2: "5\nki\nki\nko\nku\nki",
    output2: "3\n2",
    input3: "2\namber\namber",
    output3: "1\n1",
    inputconstrains: "1 <= n <= 100, single-word names",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = int(input())
visitors = set()
repeats = 0
for _ in range(n):
    name = input()
    if name in visitors:
        repeats += 1
    else:
        visitors.add(name)
print(len(visitors))
print(repeats)
`,
  },

  /* ── medium (all scenario, blacklist + whitelist, maxscore 20) ── */

  {
    title: "Recipe Word Frequency",
    description:
      "A cooking assistant reads a step description as a sequence of lowercase words and builds a frequency map with the dictionary get method (no Counter, no collections module). It then reports every distinct word in first-occurrence order and finally highlights the most frequent word — a single word with the strict highest count is guaranteed.\n\nInput Format:\nLine 1: integer n, the number of words. Line 2: n lowercase words separated by spaces.\n\nOutput Format:\nOne line per distinct word in first-occurrence order: word, a space, count. Last line: Top: word count\n\nConstraints:\n1 <= n <= 200; words are lowercase letters, up to 15 characters; exactly one word has the strict maximum count.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "python",
    topic: TOPIC,
    subtopic: "Working with Key-Value Pairs",
    sampleinput1: "6\nmix bake mix taste bake mix",
    sampleoutput1: "mix 3\nbake 2\ntaste 1\nTop: mix 3",
    sampleinput2: "3\nchop chop chop",
    sampleoutput2: "chop 3\nTop: chop 3",
    input1: "5\nstir fry stir boil stir",
    output1: "stir 3\nfry 1\nboil 1\nTop: stir 3",
    input2: "5\nwhisk blend whisk blend whisk",
    output2: "whisk 3\nblend 2\nTop: whisk 3",
    input3: "2\nzest zest",
    output3: "zest 2\nTop: zest 2",
    inputconstrains: "1 <= n <= 200, lowercase words, unique strict maximum",
    blacklist: "Counter(, collections, max(",
    whitelist: ".get(",
    sourcecode: `n = int(input())
words = input().split()
counts = {}
for word in words:
    counts[word] = counts.get(word, 0) + 1
for word, count in counts.items():
    print(word, count)
top_word = ""
top_count = 0
for word, count in counts.items():
    if count > top_count:
        top_count = count
        top_word = word
print("Top:", top_word, top_count)
`,
  },
  {
    title: "Inverted Roll-Call Index",
    description:
      "A school admin script reads attendance rows of the form \"subject student\" and builds an inverted index: a dictionary mapping each subject to the list of students seen for it, in arrival order. Print the index sorted by subject.\n\nInput Format:\nLine 1: integer n. Next n lines: subject and student separated by a space.\n\nOutput Format:\nOne line per subject in alphabetical order: subject, a colon and space, then the students in arrival order separated by single spaces.\n\nConstraints:\n1 <= n <= 100; subject and student are single lowercase words of up to 15 characters.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "python",
    topic: TOPIC,
    subtopic: "Working with Key-Value Pairs",
    sampleinput1: "4\nmath ana\ncs bob\nmath zoe\ncs ria",
    sampleoutput1: "cs: bob ria\nmath: ana zoe",
    sampleinput2: "2\nart lil\nart max",
    sampleoutput2: "art: lil max",
    input1: "5\nbio om\nchem ri\nbio sam\nchem tia\nbio um",
    output1: "bio: om sam um\nchem: ri tia",
    input2: "3\nzen kit\nart len\nzen mai",
    output2: "art: len\nzen: kit mai",
    input3: "1\nhistory pat",
    output3: "history: pat",
    inputconstrains: "1 <= n <= 100, single lowercase words",
    blacklist: "defaultdict(, collections, setdefault(",
    whitelist: ".items(, .append(",
    sourcecode: `n = int(input())
index = {}
for _ in range(n):
    subject, student = input().split()
    if subject not in index:
        index[subject] = []
    index[subject].append(student)
for subject, students in sorted(index.items()):
    print(subject + ":", " ".join(students))
`,
  },
  {
    title: "Ticket Fraud Audit",
    description:
      "An event issued ticket codes and later scanned redemptions. Find every ticket that was issued but NEVER redeemed, using the set difference method.\n\nInput Format:\nLine 1: integer n. Line 2: n issued ticket codes separated by spaces. Line 3: integer m. Line 4: m redeemed ticket codes separated by spaces.\n\nOutput Format:\nLine 1: the number of unredeemed issued tickets. Line 2: those codes in ascending order, space-separated (this line is empty if there are none).\n\nConstraints:\n1 <= n, m <= 100; codes are single tokens of up to 10 characters.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "python",
    topic: TOPIC,
    subtopic: "Set Operations",
    sampleinput1: "5\nT01 T02 T03 T04 T05\n3\nT02 T04 T09",
    sampleoutput1: "3\nT01 T03 T05",
    sampleinput2: "3\nA1 A2 A3\n3\nA1 A2 A3",
    sampleoutput2: "0\n",
    input1: "4\nX10 X20 X30 X40\n2\nX20 X40",
    output1: "2\nX10 X30",
    input2: "2\nB9 B8\n1\nB7",
    output2: "2\nB8 B9",
    input3: "1\nOnly1\n1\nOnly1",
    output3: "0\n",
    inputconstrains: "1 <= n, m <= 100, codes up to 10 characters",
    blacklist: ".union(, ^",
    whitelist: ".difference(",
    sourcecode: `n = int(input())
issued = set(input().split())
m = int(input())
redeemed = set(input().split())
missing = issued.difference(redeemed)
print(len(missing))
print(" ".join(sorted(missing)))
`,
  },
  {
    title: "Summit Attendee Reconciliation",
    description:
      "A summit records day-1 registrations and day-2 check-ins. Organizers need the list of people who appear in EXACTLY one of the two lists — the symmetric difference of the two sets.\n\nInput Format:\nLine 1: integer n. Line 2: n names separated by spaces. Line 3: integer m. Line 4: m names separated by spaces.\n\nOutput Format:\nLine 1: the number of people appearing in exactly one list. Line 2: those names in alphabetical order, space-separated (this line is empty if there are none).\n\nConstraints:\n1 <= n, m <= 100; names are single lowercase words of up to 15 characters.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "python",
    topic: TOPIC,
    subtopic: "Set Operations",
    sampleinput1: "4\nana ben cal dee\n3\ncal dee eli",
    sampleoutput1: "3\nana ben eli",
    sampleinput2: "3\np q r\n2\np q",
    sampleoutput2: "1\nr",
    input1: "4\ns1 s2 s3 s4\n4\ns3 s4 s5 s6",
    output1: "4\ns1 s2 s5 s6",
    input2: "2\nm1 m2\n2\nm1 m2",
    output2: "0\n",
    input3: "3\nx y z\n1\nw",
    output3: "4\nw x y z",
    inputconstrains: "1 <= n, m <= 100, single-word names",
    blacklist: "^, .difference(",
    whitelist: "symmetric_difference(",
    sourcecode: `n = int(input())
day1 = set(input().split())
m = int(input())
day2 = set(input().split())
only_one = day1.symmetric_difference(day2)
print(len(only_one))
print(" ".join(sorted(only_one)))
`,
  },
  {
    title: "Merging Feature Flags",
    description:
      "An app merges a base feature-flag configuration with an override configuration using the update method — when a flag appears in both, the override value wins, and update also appends brand-new flags at the end of the key order.\n\nInput Format:\nLine 1: integer n. Next n lines: flag and integer value (0 or 1) separated by a space (base config, distinct flags). Next line: integer m. Next m lines: flag and value (override config, distinct flags).\n\nOutput Format:\nOne line per flag in the merged dictionary's insertion order: flag, a space, value. Flags from the base config keep their original positions; flags only in the override config appear at the end in the order first given.\n\nConstraints:\n1 <= n, m <= 20; flags are single words; values are 0 or 1.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "python",
    topic: TOPIC,
    subtopic: "Dictionary Methods",
    sampleinput1: "3\ndark 1\nwifi 1\nlte 0\n2\nwifi 0\ngps 1",
    sampleoutput1: "dark 1\nwifi 0\nlte 0\ngps 1",
    sampleinput2: "1\nmode 0\n1\nmode 1",
    sampleoutput2: "mode 1",
    input1: "2\nbeta 1\nalpha 0\n2\nalpha 1\ngamma 1",
    output1: "beta 1\nalpha 1\ngamma 1",
    input2: "3\nv1 0\nv2 1\nv3 0\n0",
    output2: "v1 0\nv2 1\nv3 0",
    input3: "2\nred 1\nblue 0\n2\ngreen 1\nblue 1",
    output3: "red 1\nblue 1\ngreen 1",
    inputconstrains: "1 <= n, m <= 20, values 0 or 1, distinct flags per config",
    blacklist: "dict(",
    whitelist: ".update(",
    sourcecode: `n = int(input())
base = {}
for _ in range(n):
    flag, value = input().split()
    base[flag] = int(value)
m = int(input())
override = {}
for _ in range(m):
    flag, value = input().split()
    override[flag] = int(value)
base.update(override)
for flag, value in base.items():
    print(flag, value)
`,
  },
  {
    title: "Pantry Reorder Alerts",
    description:
      "A kitchen app scans a pantry dictionary and flags anything whose quantity is strictly below the reorder threshold. Walk the dictionary with the items view, keep a manual count of the alerts, and finish with the alert total.\n\nInput Format:\nLine 1: integer n. Next n lines: item and integer quantity separated by a space (distinct items). Last line: integer threshold.\n\nOutput Format:\nOne line per item in insertion order: item, a space, then REORDER if quantity < threshold, otherwise OK. Last line: Reorder count: k\n\nConstraints:\n1 <= n <= 30; quantities in 0..100; threshold in 1..100; item names are single words.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "python",
    topic: TOPIC,
    subtopic: "Working with Key-Value Pairs",
    sampleinput1: "4\nrice 9\nflour 2\noil 5\nsalt 1\n5",
    sampleoutput1: "rice OK\nflour REORDER\noil OK\nsalt REORDER\nReorder count: 2",
    sampleinput2: "2\nhoney 10\njam 3\n3",
    sampleoutput2: "honey OK\njam OK\nReorder count: 0",
    input1: "3\nsugar 4\nsalt 4\npepper 4\n4",
    output1: "sugar OK\nsalt OK\npepper OK\nReorder count: 0",
    input2: "2\nflour 0\nyeast 1\n1",
    output2: "flour REORDER\nyeast OK\nReorder count: 1",
    input3: "3\noil 2\nvine 3\nbrine 1\n3",
    output3: "oil REORDER\nvine OK\nbrine REORDER\nReorder count: 2",
    inputconstrains: "1 <= n <= 30, quantities 0..100, threshold 1..100",
    blacklist: "sum(",
    whitelist: ".items(",
    sourcecode: `n = int(input())
pantry = {}
for _ in range(n):
    item, qty = input().split()
    pantry[item] = int(qty)
threshold = int(input())
reorders = 0
for item, qty in pantry.items():
    if qty < threshold:
        print(item, "REORDER")
        reorders += 1
    else:
        print(item, "OK")
print("Reorder count:", reorders)
`,
  },

  /* ── hard (extreme scenario, blacklist + whitelist, maxscore 30) ── */

  {
    title: "Grade-Book Analytics",
    description:
      "A teacher's grade book is a nested dictionary: student maps to subject, which maps to a mark. Build it from raw rows, then produce two analytics views computed entirely with manual loops (no sum(), max() or min()): each student's total marks and each subject's average mark.\n\nInput Format:\nLine 1: integer n. Next n lines: student, subject, and integer mark separated by spaces. Each (student, subject) combination appears at most once.\n\nOutput Format:\nFirst, one line per student in first-appearance order: student, a space, total of their marks. Then, one line per subject in first-appearance order: subject, a space, average mark formatted to exactly 2 decimal places.\n\nConstraints:\n1 <= n <= 200; names are single tokens; marks in 0..100.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "python",
    topic: TOPIC,
    subtopic: "Working with Key-Value Pairs",
    sampleinput1: "5\nana math 80\nbob cs 70\nana cs 90\nana bio 75\nbob math 55",
    sampleoutput1: "ana 245\nbob 125\nmath 67.50\ncs 80.00\nbio 75.00",
    sampleinput2: "1\nzoe art 88",
    sampleoutput2: "zoe 88\nart 88.00",
    input1: "3\ntim math 40\ntim cs 60\ntim art 50",
    output1: "tim 150\nmath 40.00\ncs 60.00\nart 50.00",
    input2: "4\nam math 100\nbi math 90\nam cs 80\nbi cs 70",
    output2: "am 180\nbi 160\nmath 95.00\ncs 75.00",
    input3: "6\nc1 phy 10\nc2 phy 20\nc3 chem 30\nc1 chem 40\nc2 bio 50\nc3 bio 60",
    output3: "c1 50\nc2 70\nc3 90\nphy 15.00\nchem 35.00\nbio 55.00",
    inputconstrains: "1 <= n <= 200, marks in 0..100, unique student-subject pairs",
    blacklist: "sum(, max(, min(",
    whitelist: ".items(",
    sourcecode: `n = int(input())
grades = {}
for _ in range(n):
    student, subject, marks = input().split()
    if student not in grades:
        grades[student] = {}
    grades[student][subject] = int(marks)
for student, subjects in grades.items():
    total = 0
    for subject, marks in subjects.items():
        total += marks
    print(student, total)
subject_totals = {}
subject_counts = {}
for student, subjects in grades.items():
    for subject, marks in subjects.items():
        if subject not in subject_totals:
            subject_totals[subject] = 0
            subject_counts[subject] = 0
        subject_totals[subject] += marks
        subject_counts[subject] += 1
for subject, total in subject_totals.items():
    average = total / subject_counts[subject]
    print(subject, f"{average:.2f}")
`,
  },
  {
    title: "Allergy-Safe Kiosk",
    description:
      "A food kiosk checks every dish on its menu against a customer's allergy set. A dish is safe only when it shares NO ingredient with the allergies — decide this with the set intersection method and print the safe menu.\n\nInput Format:\nLine 1: integer n. Next n lines: dish name, then integer k, then k ingredient names — all separated by spaces. Next line: integer m. Last line: m allergy names separated by spaces.\n\nOutput Format:\nOne line per safe dish, in menu order. Last line: Total safe: k\n\nConstraints:\n1 <= n <= 30; each dish has 1..6 ingredients; 1..8 allergies; all names are lowercase single words of up to 15 characters.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "python",
    topic: TOPIC,
    subtopic: "Set Operations",
    sampleinput1: "3\nsalad 3 lettuce tomato oil\ncake 3 flour egg milk\nsoup 2 onion carrot\n2\negg milk",
    sampleoutput1: "salad\nsoup\nTotal safe: 2",
    sampleinput2: "2\nmilkshake 2 milk cream\ncheesecake 2 milk egg\n1\nmilk",
    sampleoutput2: "Total safe: 0",
    input1: "3\nbowl 2 rice bean\nwrap 3 tortilla bean cheese\nstew 3 lentil kale salt\n1\nbean",
    output1: "stew\nTotal safe: 1",
    input2: "2\nsmoothie 3 banana yogurt honey\nsalad 2 apple kale\n2\nbanana honey",
    output2: "salad\nTotal safe: 1",
    input3: "1\npurejuice 1 apple\n1\napple",
    output3: "Total safe: 0",
    inputconstrains: "1 <= n <= 30, 1..6 ingredients per dish, 1..8 allergies",
    blacklist: "&, isdisjoint(",
    whitelist: "intersection(",
    sourcecode: `n = int(input())
dishes = []
for _ in range(n):
    parts = input().split()
    name = parts[0]
    ingredients = set(parts[2:])
    dishes.append((name, ingredients))
m = int(input())
allergies = set(input().split())
safe_count = 0
for name, ingredients in dishes:
    if len(ingredients.intersection(allergies)) == 0:
        print(name)
        safe_count += 1
print("Total safe:", safe_count)
`,
  },
  {
    title: "Cache Eviction Simulator",
    description:
      "Simulate a least-recently-used style cache using nothing but a plain dictionary, whose insertion order stands for recency (oldest first). Operations: put k v — if k already exists, remove it and re-insert it at the end with the new value; otherwise, if the cache is full, evict the oldest (first) key first, then insert. get k — if k exists, refresh it (remove and re-insert at the end) and record a hit with its value; otherwise record a miss.\n\nInput Format:\nLine 1: integer c, the capacity. Line 2: integer m, the number of operations. Next m lines: either \"put k v\" or \"get k\" (v is an integer).\n\nOutput Format:\nOne line per get operation, in order: \"HIT v\" or exactly MISS. Final line: \"Cache: k1 k2 ... kn\" listing the keys oldest to newest (empty after the colon if the cache is empty).\n\nConstraints:\n1 <= c <= 5; 1 <= m <= 20; keys are single tokens; values in 0..999. No OrderedDict, no move_to_end — plain dict insertion order only.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "python",
    topic: TOPIC,
    subtopic: "Dictionary Methods",
    sampleinput1: "2\n7\nput a 1\nput b 2\nget a\nput c 3\nget b\nput a 9\nget a",
    sampleoutput1: "HIT 1\nMISS\nHIT 9\nCache: c a",
    sampleinput2: "1\n3\nput x 5\nget x\nput y 6",
    sampleoutput2: "HIT 5\nCache: y",
    input1: "2\n4\nput p 1\nput q 2\nput r 3\nget p",
    output1: "MISS\nCache: q r",
    input2: "3\n5\nput a 1\nput b 2\nput c 3\nget b\nget a",
    output2: "HIT 2\nHIT 1\nCache: c b a",
    input3: "2\n6\nput a 1\nput b 2\nput a 10\nput c 3\nget c\nget a",
    output3: "HIT 3\nHIT 10\nCache: c a",
    inputconstrains: "1 <= c <= 5, 1 <= m <= 20, values in 0..999",
    blacklist: "OrderedDict, move_to_end, functools",
    whitelist: ".pop(, .keys(",
    sourcecode: `c = int(input())
m = int(input())
cache = {}
results = []
for _ in range(m):
    parts = input().split()
    op = parts[0]
    key = parts[1]
    if op == "put":
        value = int(parts[2])
        if key in cache:
            cache.pop(key)
        elif len(cache) == c:
            oldest = next(iter(cache.keys()))
            cache.pop(oldest)
        cache[key] = value
    else:
        if key in cache:
            value = cache.pop(key)
            cache[key] = value
            results.append("HIT " + str(value))
        else:
            results.append("MISS")
for line in results:
    print(line)
print("Cache: " + " ".join(cache.keys()))
`,
  },
  {
    title: "Two-Database Sync Audit",
    description:
      "A syncing tool compares a primary database snapshot A with a replica snapshot B, both dictionaries of key to integer value. Using set operations on their key views, produce an audit: keys added (in B only), keys removed (in A only), and keys updated (present in both with different values).\n\nInput Format:\nLine 1: integer n. Next n lines: key and integer value separated by a space (snapshot A, distinct keys). Next line: integer m. Next m lines: key and integer value (snapshot B, distinct keys).\n\nOutput Format:\nThree lines in this exact order, each starting with the label and a colon, then the keys in alphabetical order separated by single spaces (a line's key list may be empty):\nAdded: ...\nRemoved: ...\nUpdated: ...\n\nConstraints:\n1 <= n, m <= 100; keys are single tokens of up to 15 characters; values in 0..9999; keys unique within each snapshot.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "python",
    topic: TOPIC,
    subtopic: "Set Operations",
    sampleinput1: "3\nhost 1\nport 80\nuser 5\n3\nhost 1\nport 8080\nssl 9",
    sampleoutput1: "Added: ssl\nRemoved: user\nUpdated: port",
    sampleinput2: "2\nk1 1\nk2 2\n2\nk1 1\nk2 2",
    sampleoutput2: "Added:\nRemoved:\nUpdated:",
    input1: "2\napp 1\nweb 2\n3\napp 5\ndb 3\ncache 4",
    output1: "Added: cache db\nRemoved: web\nUpdated: app",
    input2: "1\nsame 7\n1\nsame 7",
    output2: "Added:\nRemoved:\nUpdated:",
    input3: "3\nalpha 1\nbeta 2\ngamma 3\n2\nbeta 5\ndelta 4",
    output3: "Added: delta\nRemoved: alpha gamma\nUpdated: beta",
    inputconstrains: "1 <= n, m <= 100, values in 0..9999, keys unique per snapshot",
    blacklist: "&, ^, symmetric_difference",
    whitelist: ".keys(, .difference(",
    sourcecode: `n = int(input())
a = {}
for _ in range(n):
    key, value = input().split()
    a[key] = int(value)
m = int(input())
b = {}
for _ in range(m):
    key, value = input().split()
    b[key] = int(value)
added = set(b.keys()).difference(a.keys())
removed = set(a.keys()).difference(b.keys())
updated = []
for key in a.keys():
    if key in b and a[key] != b[key]:
        updated.append(key)
print("Added:", " ".join(sorted(added)))
print("Removed:", " ".join(sorted(removed)))
print("Updated:", " ".join(sorted(updated)))
`,
  },
];

/* ───────────────────────────── MCQ questions ───────────────────────────── */

const mcqQuestions = [
  {
    title: "Unhashable Dictionary Key",
    description: "Which of these types CANNOT be used as a dictionary key?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Creating Dictionaries",
    Option1: "int",
    Option2: "str",
    Option3: "list",
    Option4: "tuple",
    CorrectOption: 3,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Duplicate Keys Collapse",
    description:
      "Given d = {'x': 1, 'y': 2, 'x': 3}, what does d['x'] return and why?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Creating Dictionaries",
    Option1: "1, because the first entry wins",
    Option2: "3, because the last assignment wins",
    Option3: "2, because keys get renumbered",
    Option4: "A KeyError is raised",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "get Returns a Default",
    description:
      "The dictionary d has no key 'k'. What does d.get('k') return?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Dictionary Methods",
    Option1: "None",
    Option2: "It raises KeyError",
    Option3: "0",
    Option4: "The empty string",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Set Deduplicates",
    description: "What does len(set([1, 2, 2, 3, 3, 3])) evaluate to?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Creating Sets",
    Option1: "6",
    Option2: "3",
    Option3: "1",
    Option4: "0",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Sets Cannot Be Indexed",
    description: "Given s = {1, 2, 3}, what does the expression s[0] do?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Creating Sets",
    Option1: "Returns 1",
    Option2: "Raises TypeError",
    Option3: "Returns a random element",
    Option4: "Returns None",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "add versus update",
    description: "Which call adds ONE new element to a set s?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Creating Sets",
    Option1: "s.add(4)",
    Option2: "s.update(4)",
    Option3: "s.append(4)",
    Option4: "s.insert(4)",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "in Checks Dictionary Keys",
    description:
      "Given d = {'k': 'val'}, what does the expression 'val' in d evaluate to?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Working with Key-Value Pairs",
    Option1: "True",
    Option2: "False",
    Option3: "It raises KeyError",
    Option4: "It returns 'val'",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Elements in Both Sets",
    description:
      "Which expression evaluates to the elements present in BOTH sets a and b?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Set Operations",
    Option1: "a & b",
    Option2: "a.union(b)",
    Option3: "a - b",
    Option4: "a + b",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "items Yields Pairs",
    description: "What does d.items() yield when you loop over it?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Working with Key-Value Pairs",
    Option1: "One (key, value) tuple per entry",
    Option2: "Only the keys",
    Option3: "Only the values",
    Option4: "A list of two parallel lists",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Dictionary Insertion Order",
    description:
      "Since Python 3.7, in what order does iterating over a dictionary yield its keys?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Creating Dictionaries",
    Option1: "The order they were first inserted",
    Option2: "Alphabetical order",
    Option3: "Reverse insertion order",
    Option4: "An arbitrary order that changes between runs",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Duplicate Key and len",
    description:
      "The snippet prints two lines. What are they?\n\nd = {\"a\": 1, \"b\": 2, \"a\": 9}\nprint(len(d))\nprint(d[\"a\"])",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Creating Dictionaries",
    Option1: "3 then 1",
    Option2: "2 then 9",
    Option3: "2 then 1",
    Option4: "3 then 9",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `d = {"a": 1, "b": 2, "a": 9}
print(len(d))
print(d["a"])
`,
    snippetLang: "python",
  },
  {
    title: "get With Default Value",
    description:
      "The snippet prints two lines. What are they?\n\nstock = {\"pen\": 4}\nprint(stock.get(\"pen\", 0))\nprint(stock.get(\"ink\", 0))",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Dictionary Methods",
    Option1: "4 then 0",
    Option2: "4 then a KeyError traceback",
    Option3: "4 then None",
    Option4: "0 then 0",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `stock = {"pen": 4}
print(stock.get("pen", 0))
print(stock.get("ink", 0))
`,
    snippetLang: "python",
  },
  {
    title: "Set add Keeps Uniqueness",
    description:
      "The snippet prints one line. What is it?\n\ns = {1, 2, 3}\ns.add(3)\ns.add(4)\nprint(len(s))",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Creating Sets",
    Option1: "5",
    Option2: "3",
    Option3: "4",
    Option4: "2",
    CorrectOption: 3,
    iscodesnippet: true,
    codesnippet: `s = {1, 2, 3}
s.add(3)
s.add(4)
print(len(s))
`,
    snippetLang: "python",
  },
  {
    title: "Membership Tests Keys Only",
    description:
      "The snippet prints two lines. What are they?\n\nd = {\"k1\": \"v1\"}\nprint(\"k1\" in d)\nprint(\"v1\" in d)",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Working with Key-Value Pairs",
    Option1: "True then True",
    Option2: "True then False",
    Option3: "False then True",
    Option4: "False then False",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `d = {"k1": "v1"}
print("k1" in d)
print("v1" in d)
`,
    snippetLang: "python",
  },
  {
    title: "Looping Over items",
    description:
      "The snippet prints two lines. What are they?\n\nd = {\"x\": 1, \"y\": 2}\nfor k, v in d.items():\n    print(k, v * 2)",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Working with Key-Value Pairs",
    Option1: "x 1 then y 2",
    Option2: "x 2 then y 4",
    Option3: "('x', 2) then ('y', 4)",
    Option4: "x 4 then y 8",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `d = {"x": 1, "y": 2}
for k, v in d.items():
    print(k, v * 2)
`,
    snippetLang: "python",
  },
  {
    title: "Deduplicating a List",
    description:
      "You have a list of tags containing duplicates. Which built-in call produces just the unique elements (in no guaranteed order)?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Creating Sets",
    Option1: "set(tags)",
    Option2: "tags.unique()",
    Option3: "dict(tags)",
    Option4: "tags.dedupe()",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Set Operator Results",
    description:
      "The snippet prints two lines. What are they?\n\na = {1, 2, 3}\nb = {3, 4}\nprint(len(a & b))\nprint(len(a - b))",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Set Operations",
    Option1: "1 then 2",
    Option2: "2 then 1",
    Option3: "1 then 1",
    Option4: "2 then 2",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `a = {1, 2, 3}
b = {3, 4}
print(len(a & b))
print(len(a - b))
`,
    snippetLang: "python",
  },
  {
    title: "Shared Mutable Value in Dicts",
    description:
      "The snippet prints one line. What is it?\n\nd1 = {\"tags\": [\"a\"]}\nd2 = {\"tags\": d1[\"tags\"]}\nd2[\"tags\"].append(\"b\")\nprint(d1[\"tags\"])",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Working with Key-Value Pairs",
    Option1: "['a']",
    Option2: "['a', 'b']",
    Option3: "['b']",
    Option4: "A TypeError is raised",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `d1 = {"tags": ["a"]}
d2 = {"tags": d1["tags"]}
d2["tags"].append("b")
print(d1["tags"])
`,
    snippetLang: "python",
  },
  {
    title: "update Wins and Appends",
    description:
      "The snippet prints two lines. What are they?\n\nd = {\"a\": 1, \"b\": 2}\nd.update({\"b\": 9, \"c\": 3})\nprint(d[\"b\"])\nprint(list(d.keys()))",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Dictionary Methods",
    Option1: "2 then ['a', 'b', 'c']",
    Option2: "9 then ['a', 'b', 'c']",
    Option3: "9 then ['b', 'c', 'a']",
    Option4: "9 then ['a', 'b']",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `d = {"a": 1, "b": 2}
d.update({"b": 9, "c": 3})
print(d["b"])
print(list(d.keys()))
`,
    snippetLang: "python",
  },
  {
    title: "Symmetric Difference Size",
    description:
      "The snippet prints one line. What is it?\n\na = {1, 2, 3}\nb = {3, 4}\nprint(len(a ^ b))",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Set Operations",
    Option1: "3",
    Option2: "1",
    Option3: "2",
    Option4: "4",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `a = {1, 2, 3}
b = {3, 4}
print(len(a ^ b))
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
writeFileSync(`${outDir}/day-08.code.json`, JSON.stringify({ day: 8, topics, questions: codeQuestions }, null, 2));
writeFileSync(`${outDir}/day-08.mcq.json`, JSON.stringify({ day: 8, questions: mcqQuestions }, null, 2));
console.log(`wrote day 08: ${codeQuestions.length} code + ${mcqQuestions.length} mcq (${snippets} snippets)`);
