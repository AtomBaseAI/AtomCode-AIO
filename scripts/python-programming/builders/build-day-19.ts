/**
 * Builder for day 19 — "Multithreading and Concurrency" (20 code + 20 MCQ).
 * Run: bun scripts/python-programming/builders/build-day-19.ts
 *
 * Determinism contract: threads only compute into per-thread slots / lock-guarded
 * counters; the driver joins everything BEFORE printing. asyncio coroutines are
 * awaited in a fixed order. Nothing time-based, nothing random, no sets printed.
 */
import { mkdirSync, writeFileSync } from "node:fs";

const DIR = "/home/z/my-project/scripts/python-programming/data";
mkdirSync(DIR, { recursive: true });

const TOPIC_NAME = "Multithreading and Concurrency";
const SUBTOPICS = [
  "Creating Threads",
  "Thread Synchronization",
  "Thread Joining and Lifecycle",
  "async/await with asyncio",
  "Concurrency Concepts",
];
const SUB = {
  create: "Creating Threads",
  sync: "Thread Synchronization",
  join: "Thread Joining and Lifecycle",
  async: "async/await with asyncio",
  concepts: "Concurrency Concepts",
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
    title: "Threaded Square Slots",
    description: desc(
      "Drill: creating threads with result slots. Read two integers a and b. Start thread 1 which computes a*a and stores it into slot 0 of a shared results list, and thread 2 which computes b*b and stores it into slot 1. The threads print nothing; they only compute. Join both threads, then print slot 0 and slot 1.",
      "One line with two integers a and b separated by a space.",
      "Line 1: a*a\nLine 2: b*b",
      "0 <= a, b <= 1000"
    ),
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.create,
    si1: "3 4", so1: "9\n16",
    si2: "5 0", so2: "25\n0",
    i1: "12 9", o1: "144\n81",
    i2: "1 1", o2: "1\n1",
    i3: "7 10", o3: "49\n100",
    inputconstrains: "0 <= a, b <= 1000",
    sourcecode: String.raw`import threading

a, b = map(int, input().split())
results = [0, 0]

def worker(idx, base):
    results[idx] = base * base

t1 = threading.Thread(target=worker, args=(0, a))
t2 = threading.Thread(target=worker, args=(1, b))
t1.start()
t2.start()
t1.join()
t2.join()
print(results[0])
print(results[1])`,
  }),

  cq({
    title: "Lock-Guarded Click Counter",
    description: desc(
      "Drill: a shared counter incremented by two threads under a threading.Lock. Read two integers k1 and k2. Thread A increments a global counter k1 times and thread B increments it k2 times, every increment performed while holding the lock. Join both threads, then print the final counter value.",
      "One line with two integers k1 and k2 separated by a space.",
      "One line: the final counter value (k1 + k2).",
      "0 <= k1, k2 <= 200"
    ),
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.sync,
    si1: "5 7", so1: "12",
    si2: "0 0", so2: "0",
    i1: "100 200", o1: "300",
    i2: "3 4", o2: "7",
    i3: "50 49", o3: "99",
    inputconstrains: "0 <= k1, k2 <= 200",
    sourcecode: String.raw`import threading

k1, k2 = map(int, input().split())
count = 0
lock = threading.Lock()

def clicker(n):
    global count
    for _ in range(n):
        with lock:
            count += 1

t1 = threading.Thread(target=clicker, args=(k1,))
t2 = threading.Thread(target=clicker, args=(k2,))
t1.start()
t2.start()
t1.join()
t2.join()
print(count)`,
  }),

  cq({
    title: "Awaited Square Duo",
    description: desc(
      "Drill: asyncio coroutines. Read two integers a and b. Define an async function square(x) that returns x*x. In an async main, await square(a) then await square(b) and print the two results. Launch it with asyncio.run.",
      "One line with two integers a and b separated by a space.",
      "Line 1: a*a\nLine 2: b*b",
      "0 <= a, b <= 1000"
    ),
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.async,
    si1: "6 9", so1: "36\n81",
    si2: "0 5", so2: "0\n25",
    i1: "11 2", o1: "121\n4",
    i2: "13 13", o2: "169\n169",
    i3: "8 1", o3: "64\n1",
    inputconstrains: "0 <= a, b <= 1000",
    sourcecode: String.raw`import asyncio

a, b = map(int, input().split())

async def square(x):
    return x * x

async def main():
    r1 = await square(a)
    r2 = await square(b)
    print(r1)
    print(r2)

asyncio.run(main())`,
  }),

  cq({
    title: "Sequential Runtime Tally",
    description: desc(
      "Concept drill: sequential versus concurrent execution. A batch server runs its pipeline tasks strictly one after another with no overlap. Given the durations of the tasks in seconds, the total wall-clock time for a fully sequential run is simply the sum of all durations.",
      "One line with 1 to 5 integers (task durations in seconds) separated by spaces.",
      "One line: the total sequential time in seconds.",
      "1 to 5 durations, each 1 <= d <= 60"
    ),
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.concepts,
    si1: "2 3 4", so1: "9",
    si2: "10", so2: "10",
    i1: "5 5 5 5", o1: "20",
    i2: "60 60", o2: "120",
    i3: "1 2 3 4 5", o3: "15",
    inputconstrains: "1 to 5 durations, each 1 <= d <= 60",
    sourcecode: String.raw`durations = [int(x) for x in input().split()]
total = 0
for d in durations:
    total += d
print(total)`,
  }),

  cq({
    title: "Three Worker Slots",
    description: desc(
      "Drill: the thread lifecycle — start then join. Read three integers v1 v2 v3. Start three threads; thread i (for i = 0, 1, 2) computes its value times 10 and records it into slots[i]. Threads print nothing. Join all three threads, then print the three slots separated by spaces.",
      "One line with three integers v1 v2 v3 separated by spaces.",
      "One line: the three slot values separated by spaces, in slot order.",
      "3 values, each 0 <= v <= 100"
    ),
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.join,
    si1: "1 2 3", so1: "10 20 30",
    si2: "4 5 6", so2: "40 50 60",
    i1: "0 0 0", o1: "0 0 0",
    i2: "9 8 7", o2: "90 80 70",
    i3: "10 20 30", o3: "100 200 300",
    inputconstrains: "3 values, each 0 <= v <= 100",
    sourcecode: String.raw`import threading

values = [int(x) for x in input().split()]
slots = [0, 0, 0]

def record(idx, v):
    slots[idx] = v * 10

threads = []
for i in range(3):
    t = threading.Thread(target=record, args=(i, values[i]))
    threads.append(t)
    t.start()
for t in threads:
    t.join()
print(slots[0], slots[1], slots[2])`,
  }),

  cq({
    title: "Squares and Cubes Awaited",
    description: desc(
      "Drill: two different coroutines awaited in a fixed order. Read integers a and b. Define async square(x) returning x*x and async cube(x) returning x*x*x. In async main, await square(a) first, then await cube(b), printing each result on its own line.",
      "One line with two integers a and b separated by a space.",
      "Line 1: a*a\nLine 2: b*b*b",
      "0 <= a, b <= 1000"
    ),
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.async,
    si1: "3 2", so1: "9\n8",
    si2: "0 0", so2: "0\n0",
    i1: "5 3", o1: "25\n27",
    i2: "2 4", o2: "4\n64",
    i3: "10 1", o3: "100\n1",
    inputconstrains: "0 <= a, b <= 1000",
    sourcecode: String.raw`import asyncio

a, b = map(int, input().split())

async def square(x):
    return x * x

async def cube(x):
    return x * x * x

async def main():
    s = await square(a)
    c = await cube(b)
    print(s)
    print(c)

asyncio.run(main())`,
  }),

  // ---------------- easy / scenarios ----------------
  cq({
    title: "Sensor Fleet Pollers",
    description: desc(
      "A monitoring station polls two temperature sensors in parallel. Read sensor A's readings and sensor B's readings (two lines of integers). Start one thread per sensor; each thread scans only its own readings and records the peak value into its slot. Join both pollers, then print the peak of sensor A and the peak of sensor B.",
      "Line 1: sensor A readings, space-separated integers.\nLine 2: sensor B readings, space-separated integers.",
      "Line 1: peak of sensor A\nLine 2: peak of sensor B",
      "Each line has 1 to 20 integers, 0 <= r <= 1000"
    ),
    difficulty: "easy",
    variant: "scenario",
    subtopic: SUB.create,
    si1: "10 30 20\n15 25", so1: "30\n25",
    si2: "5\n5", so2: "5\n5",
    i1: "1 2 3 4\n9 8", o1: "4\n9",
    i2: "100\n7 3 99", o2: "100\n99",
    i3: "42 17\n88 12 3", o3: "42\n88",
    inputconstrains: "Each line has 1 to 20 integers, 0 <= r <= 1000",
    sourcecode: String.raw`import threading

line_a = [int(x) for x in input().split()]
line_b = [int(x) for x in input().split()]
peaks = [0, 0]

def poll(sensor_id, readings):
    best = readings[0]
    for r in readings:
        if r > best:
            best = r
    peaks[sensor_id] = best

t1 = threading.Thread(target=poll, args=(0, line_a))
t2 = threading.Thread(target=poll, args=(1, line_b))
t1.start()
t2.start()
t1.join()
t2.join()
print(peaks[0])
print(peaks[1])`,
  }),

  cq({
    title: "Teller Deposit Race",
    description: desc(
      "A bank branch has one shared balance and two teller threads depositing at the same time. Read the starting balance, the number of unit-deposits teller A makes, and the number teller B makes. Each teller thread performs its deposits one at a time, each guarded by a lock. Join both tellers and print the final balance.",
      "One line: balance d1 d2 (starting balance, deposits by teller A, deposits by teller B).",
      "One line: the final balance.",
      "0 <= balance <= 10000, 0 <= d1, d2 <= 200"
    ),
    difficulty: "easy",
    variant: "scenario",
    subtopic: SUB.sync,
    si1: "100 30 45", so1: "175",
    si2: "0 0 0", so2: "0",
    i1: "500 120 80", o1: "700",
    i2: "10 1 1", o2: "12",
    i3: "250 60 90", o3: "400",
    inputconstrains: "0 <= balance <= 10000, 0 <= d1, d2 <= 200",
    sourcecode: String.raw`import threading

balance, d1, d2 = map(int, input().split())
lock = threading.Lock()

def deposit(amount):
    global balance
    for _ in range(amount):
        with lock:
            balance += 1

t1 = threading.Thread(target=deposit, args=(d1,))
t2 = threading.Thread(target=deposit, args=(d2,))
t1.start()
t2.start()
t1.join()
t2.join()
print(balance)`,
  }),

  cq({
    title: "Async Health Checker",
    description: desc(
      "A microservice dashboard probes two services with async stub handlers. Read each service's name and its simulated latency in milliseconds. Define an async probe(name, ms) that returns the string name:NNms. In async main, await probe for service 1, then for service 2, printing each result line in input order.",
      "Line 1: service1_name ms1\nLine 2: service2_name ms2",
      "Line 1: name1:ms1ms\nLine 2: name2:ms2ms",
      "Names are single tokens; 1 <= ms <= 2000"
    ),
    difficulty: "easy",
    variant: "scenario",
    subtopic: SUB.async,
    si1: "auth 120\npay 80", so1: "auth:120ms\npay:80ms",
    si2: "db 5\ncache 900", so2: "db:5ms\ncache:900ms",
    i1: "web 42\nmail 7", o1: "web:42ms\nmail:7ms",
    i2: "api 1000\nlogs 1", o2: "api:1000ms\nlogs:1ms",
    i3: "search 63\nqueue 28", o3: "search:63ms\nqueue:28ms",
    inputconstrains: "Names are single tokens; 1 <= ms <= 2000",
    sourcecode: String.raw`import asyncio

name1, ms1 = input().split()
name2, ms2 = input().split()
ms1 = int(ms1)
ms2 = int(ms2)

async def probe(name, ms):
    return name + ":" + str(ms) + "ms"

async def main():
    r1 = await probe(name1, ms1)
    r2 = await probe(name2, ms2)
    print(r1)
    print(r2)

asyncio.run(main())`,
  }),

  cq({
    title: "Ticket Pool Sell-Off",
    description: desc(
      "A stadium kiosk runs two seller threads that both draw from one shared ticket pool, guarded by a lock. Read the total tickets, how many seller A sells, and how many seller B sells. Each seller decrements the shared remaining count one ticket at a time under the lock. Join both sellers and print how many tickets remain.",
      "One line: total sold_a sold_b",
      "One line: remaining tickets.",
      "0 <= sold_a + sold_b <= total <= 500"
    ),
    difficulty: "easy",
    variant: "scenario",
    subtopic: SUB.sync,
    si1: "50 18 23", so1: "9",
    si2: "10 0 0", so2: "10",
    i1: "100 100 0", o1: "0",
    i2: "30 11 12", o2: "7",
    i3: "75 40 35", o3: "0",
    inputconstrains: "0 <= sold_a + sold_b <= total <= 500",
    sourcecode: String.raw`import threading

total, sold_a, sold_b = map(int, input().split())
remaining = total
lock = threading.Lock()

def sell(count):
    global remaining
    for _ in range(count):
        with lock:
            remaining -= 1

t1 = threading.Thread(target=sell, args=(sold_a,))
t2 = threading.Thread(target=sell, args=(sold_b,))
t1.start()
t2.start()
t1.join()
t2.join()
print(remaining)`,
  }),

  // ---------------- medium ----------------
  cq({
    title: "Staged Pipeline Workers",
    description: desc(
      "A photo processing service runs a two-stage pipeline: stage 1 (resize) must finish completely before stage 2 (watermark) starts. Read a list of image sizes. Start one thread that squares every size (simulating resize) into a stage list, JOIN it, and only then start a second thread that adds 100 to every squared value (simulating watermark). Join the second thread, then print the final values on one line separated by spaces.",
      "One line: space-separated integers (image sizes).",
      "One line: final values space-separated, in input order.",
      "1 to 8 values, each 0 <= v <= 50"
    ),
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.join,
    si1: "1 2 3", so1: "101 104 109",
    si2: "0 0", so2: "100 100",
    i1: "5 6 7 8", o1: "125 136 149 164",
    i2: "10", o2: "200",
    i3: "2 9 4", o3: "104 181 116",
    inputconstrains: "1 to 8 values, each 0 <= v <= 50",
    blacklist: "concurrent.futures",
    whitelist: "threading.Thread,join(",
    sourcecode: String.raw`import threading

values = [int(x) for x in input().split()]
stage1 = [0] * len(values)

def resize_all():
    for i in range(len(values)):
        stage1[i] = values[i] * values[i]

t_resize = threading.Thread(target=resize_all)
t_resize.start()
t_resize.join()

final = [0] * len(values)

def watermark_all():
    for i in range(len(stage1)):
        final[i] = stage1[i] + 100

t_mark = threading.Thread(target=watermark_all)
t_mark.start()
t_mark.join()

print(" ".join(str(x) for x in final))`,
  }),

  cq({
    title: "Dual Teller Ledger",
    description: desc(
      "A branch ledger is shared by a deposit teller and a withdrawal teller, both updating one balance under a single lock. Read the starting balance, the number of unit-deposits, and the number of unit-withdrawals. Each teller thread applies its operations one at a time while holding the lock, and every lock acquisition counts as one operation. Join both tellers, then print the final balance and the total number of lock operations (deposits + withdrawals).",
      "One line: balance dep wdr",
      "Line 1: final balance\nLine 2: total lock operations",
      "0 <= balance <= 10000, 0 <= wdr <= dep <= 300"
    ),
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.sync,
    si1: "500 120 80", so1: "540\n200",
    si2: "0 0 0", so2: "0\n0",
    i1: "1000 300 250", o1: "1050\n550",
    i2: "50 60 10", o2: "100\n70",
    i3: "75 25 5", o3: "95\n30",
    inputconstrains: "0 <= balance <= 10000, 0 <= wdr <= dep <= 300",
    blacklist: "asyncio",
    whitelist: "Lock(",
    sourcecode: String.raw`import threading

balance, dep, wdr = map(int, input().split())
lock = threading.Lock()
ops = 0

def apply_deposits(n):
    global balance, ops
    for _ in range(n):
        with lock:
            balance += 1
            ops += 1

def apply_withdrawals(n):
    global balance, ops
    for _ in range(n):
        with lock:
            balance -= 1
            ops += 1

t1 = threading.Thread(target=apply_deposits, args=(dep,))
t2 = threading.Thread(target=apply_withdrawals, args=(wdr,))
t1.start()
t2.start()
t1.join()
t2.join()
print(balance)
print(ops)`,
  }),

  cq({
    title: "Order Chain Awaits",
    description: desc(
      "An order pipeline must run its stages sequentially: each stage consumes the previous stage's output. Read a starting integer x. Define three async stages: stage1 returns x+10, stage2 returns its input times 2, stage3 returns its input minus 5. In async main, await stage1 on the start value, then await stage2 on that result, then await stage3 on that result, printing each stage output on its own line in order.",
      "One line: the starting integer x.",
      "Three lines: stage1 result, stage2 result, stage3 result.",
      "-1000 <= x <= 1000"
    ),
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.async,
    si1: "7", so1: "17\n34\n29",
    si2: "0", so2: "10\n20\n15",
    i1: "100", o1: "110\n220\n215",
    i2: "-10", o2: "0\n0\n-5",
    i3: "3", o3: "13\n26\n21",
    inputconstrains: "-1000 <= x <= 1000",
    blacklist: "threading",
    whitelist: "async def,await ",
    sourcecode: String.raw`import asyncio

start = int(input())

async def stage1(x):
    return x + 10

async def stage2(x):
    return x * 2

async def stage3(x):
    return x - 5

async def main():
    r1 = await stage1(start)
    r2 = await stage2(r1)
    r3 = await stage3(r2)
    print(r1)
    print(r2)
    print(r3)

asyncio.run(main())`,
  }),

  cq({
    title: "Dock Loader Queue",
    description: desc(
      "A warehouse has two loading threads (north dock and south dock) that drop parcel weights onto one shared conveyor belt, modelled with queue.Queue. Read the north dock weights and the south dock weights. Start the two producer threads (each puts (dock, weight) tuples onto the belt), join them, then start one conveyor thread that pops EVERY item from the belt (until it is empty), tallying the total weight per dock and counting parcels. Join the conveyor and print the two totals and the parcel count.",
      "Line 1: north dock weights, space-separated integers.\nLine 2: south dock weights, space-separated integers.",
      "Line 1: north <total>\nLine 2: south <total>\nLine 3: parcels <count>",
      "Each dock has 1 to 10 weights, 1 <= w <= 100"
    ),
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.sync,
    si1: "3 4 5\n6 7", so1: "north 12\nsouth 13\nparcels 5",
    si2: "10\n20", so2: "north 10\nsouth 20\nparcels 2",
    i1: "1 1 1\n2 2", o1: "north 3\nsouth 4\nparcels 5",
    i2: "50\n50 50", o2: "north 50\nsouth 100\nparcels 3",
    i3: "9 8 7 6\n1", o3: "north 30\nsouth 1\nparcels 5",
    inputconstrains: "Each dock has 1 to 10 weights, 1 <= w <= 100",
    blacklist: "asyncio",
    whitelist: "queue.Queue",
    sourcecode: String.raw`import queue
import threading

north = [int(x) for x in input().split()]
south = [int(x) for x in input().split()]
belt = queue.Queue()

def load(weights, dock):
    for w in weights:
        belt.put((dock, w))

p1 = threading.Thread(target=load, args=(north, "north"))
p2 = threading.Thread(target=load, args=(south, "south"))
p1.start()
p2.start()
p1.join()
p2.join()

totals = {"north": 0, "south": 0}
parcels = 0

def convey():
    global parcels
    while not belt.empty():
        dock, w = belt.get()
        totals[dock] += w
        parcels += 1

c = threading.Thread(target=convey)
c.start()
c.join()

print("north", totals["north"])
print("south", totals["south"])
print("parcels", parcels)`,
  }),

  cq({
    title: "Shard Sum Reduce",
    description: desc(
      "A log pipeline splits a day's events into shards. Read the number of shards n, then n lines of integers (one shard per line). Start one worker thread per shard; each thread sums its own shard and stores the result in its slot. Join all workers, then reduce: print every shard sum on its own line in shard order, followed by the grand total.",
      "Line 1: n (number of shards)\nNext n lines: space-separated integers for that shard.",
      "n lines: each shard's sum in shard order, then one line with the grand total.",
      "2 <= n <= 4; each shard has 1 to 10 integers, 0 <= x <= 100"
    ),
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.concepts,
    si1: "2\n1 2 3\n4 5", so1: "6\n9\n15",
    si2: "3\n5\n10 15\n1 2 3 4", so2: "5\n25\n10\n40",
    i1: "2\n100\n100", o1: "100\n100\n200",
    i2: "4\n1\n2\n3\n4", o2: "1\n2\n3\n4\n10",
    i3: "2\n7 8 9\n1 1", o3: "24\n2\n26",
    inputconstrains: "2 <= n <= 4; each shard has 1 to 10 integers, 0 <= x <= 100",
    blacklist: "map(",
    whitelist: "threading.Thread",
    sourcecode: String.raw`import threading

n = int(input())
shards = []
for _ in range(n):
    shards.append([int(x) for x in input().split()])
sums = [0] * n

def reduce_shard(idx):
    total = 0
    for v in shards[idx]:
        total += v
    sums[idx] = total

threads = []
for i in range(n):
    t = threading.Thread(target=reduce_shard, args=(i,))
    threads.append(t)
    t.start()
for t in threads:
    t.join()

grand = 0
for s in sums:
    grand += s
    print(s)
print(grand)`,
  }),

  cq({
    title: "Courier Manifest Gather",
    description: desc(
      "A delivery firm dispatches two couriers with asyncio. Read courier A's package weights and courier B's package weights. Define an async deliver(weights) that returns a tuple (total weight, package count). In async main, run both deliveries at once with asyncio.gather, then print courier A's total, courier B's total, and the grand total on three lines.",
      "Line 1: courier A weights, space-separated integers.\nLine 2: courier B weights, space-separated integers.",
      "Line 1: courier A total weight\nLine 2: courier B total weight\nLine 3: grand total",
      "Each courier has 1 to 10 packages, 1 <= kg <= 200"
    ),
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.async,
    si1: "2 8 5\n10 20", so1: "15\n30\n45",
    si2: "7\n3 4", so2: "7\n7\n14",
    i1: "1 2 3 4 5\n6 7 8 9", o1: "15\n30\n45",
    i2: "100\n100", o2: "100\n100\n200",
    i3: "10 20\n30", o3: "30\n30\n60",
    inputconstrains: "Each courier has 1 to 10 packages, 1 <= kg <= 200",
    blacklist: "threading",
    whitelist: "asyncio.gather,async def",
    sourcecode: String.raw`import asyncio

weights_a = [int(x) for x in input().split()]
weights_b = [int(x) for x in input().split()]

async def deliver(weights):
    total = 0
    count = 0
    for w in weights:
        total += w
        count += 1
    return total, count

async def main():
    ra, rb = await asyncio.gather(deliver(weights_a), deliver(weights_b))
    print(ra[0])
    print(rb[0])
    print(ra[0] + rb[0])

asyncio.run(main())`,
  }),

  // ---------------- hard ----------------
  cq({
    title: "Async ETL Validation",
    description: desc(
      "An ETL job processes incoming records through two chained async stages. Read k records (an id and a raw value token each). Stage 1 (async validate): the record is VALID only if the value token parses as an integer AND 0 <= value <= 1000. Stage 2 (async transform): valid values are doubled. In async main, walk the records in order, awaiting validate and then transform, count valid and invalid records, collect the transformed values in input order, then print: line 1 the transformed values space-separated (or none if there are no valid records), line 2 valid=X invalid=Y.",
      "Line 1: k\nNext k lines: record_id value (space separated).",
      "Line 1: transformed values space-separated, or the word none\nLine 2: valid=X invalid=Y",
      "1 <= k <= 20; value is an integer token or a non-numeric token"
    ),
    difficulty: "hard",
    variant: "scenario",
    subtopic: SUB.async,
    si1: "4\nr1 5\nr2 -3\nr3 10\nr4 abc", so1: "10 20\nvalid=2 invalid=2",
    si2: "3\na 0\nb 1000\nc 7", so2: "0 2000 14\nvalid=3 invalid=0",
    i1: "2\nx 12\ny -1", o1: "24\nvalid=1 invalid=1",
    i2: "3\np qr\nq 5s\nr 42", o2: "84\nvalid=1 invalid=2",
    i3: "4\nw 2000\nz 3\nk -9\nm o", o3: "6\nvalid=1 invalid=3",
    inputconstrains: "1 <= k <= 20; value is an integer token or a non-numeric token",
    blacklist: "threading",
    whitelist: "async def,asyncio.run",
    sourcecode: String.raw`import asyncio

k = int(input())
records = []
for _ in range(k):
    parts = input().split()
    records.append((parts[0], parts[1]))

async def validate(raw):
    try:
        v = int(raw)
    except ValueError:
        return None
    if v < 0 or v > 1000:
        return None
    return v

async def transform(v):
    return v * 2

async def main():
    valid = 0
    invalid = 0
    out = []
    for rec_id, raw in records:
        v = await validate(raw)
        if v is None:
            invalid += 1
        else:
            t = await transform(v)
            out.append(str(t))
            valid += 1
    if out:
        print(" ".join(out))
    else:
        print("none")
    print("valid=" + str(valid) + " invalid=" + str(invalid))

asyncio.run(main())`,
  }),

  cq({
    title: "Multi-Counter Audit",
    description: desc(
      "A server farm keeps named event counters in one shared dictionary guarded by a single lock. Read n teller threads; each line names a counter key and how many times that thread bumps it. Each bump is one increment of that key performed while holding the lock. Join every thread, then print every counter key in sorted order as: key count, one per line, followed by a line: total N (sum of all counter values).",
      "Line 1: n\nNext n lines: key times (space separated).",
      "One line per key in sorted key order: key count\nFinal line: total N",
      "1 <= n <= 5; 0 <= times <= 50; keys are single tokens"
    ),
    difficulty: "hard",
    variant: "scenario",
    subtopic: SUB.sync,
    si1: "3\napples 4\nbananas 2\napples 3", so1: "apples 7\nbananas 2\ntotal 9",
    si2: "2\ncars 5\ncars 5", so2: "cars 10\ntotal 10",
    i1: "4\na 1\nb 2\nc 3\na 4", o1: "a 5\nb 2\nc 3\ntotal 10",
    i2: "2\ncore 0\nedge 0", o2: "core 0\nedge 0\ntotal 0",
    i3: "3\nput 10\nget 10\nput 10", o3: "get 10\nput 20\ntotal 30",
    inputconstrains: "1 <= n <= 5; 0 <= times <= 50; keys are single tokens",
    blacklist: "asyncio",
    whitelist: "Lock(",
    sourcecode: String.raw`import threading

n = int(input())
counters = {}
lock = threading.Lock()

def bump(key, times):
    with lock:
        if key not in counters:
            counters[key] = 0
    for _ in range(times):
        with lock:
            counters[key] = counters[key] + 1

threads = []
for _ in range(n):
    parts = input().split()
    key = parts[0]
    times = int(parts[1])
    t = threading.Thread(target=bump, args=(key, times))
    threads.append(t)
    t.start()
for t in threads:
    t.join()

total = 0
for key in sorted(counters.keys()):
    print(key, counters[key])
    total = total + counters[key]
print("total", total)`,
  }),

  cq({
    title: "Racing Standings Report",
    description: desc(
      "A racing team simulates lap timings per rider on its own thread (total time = laps * lap_time_ms, pure arithmetic). Read n riders: name, laps, and lap time in ms. Start one thread per rider which computes that rider's total into a slot. Join all riders. Then build the standings yourself WITHOUT any built-in sort: order riders by total time ascending (totals are guaranteed distinct) using your own comparison loop, and print rank lines: RANK. NAME TOTAL (rank starting at 1), followed by a line: winner NAME.",
      "Line 1: n\nNext n lines: name laps lap_ms (space separated).",
      "One line per rider, fastest first: RANK. NAME TOTAL\nFinal line: winner NAME",
      "2 <= n <= 5; 1 <= laps <= 10; 1 <= lap_ms <= 1000; totals are distinct; names are single tokens"
    ),
    difficulty: "hard",
    variant: "scenario",
    subtopic: SUB.join,
    si1: "3\nAlice 3 520\nBen 3 480\nCara 2 600", so1: "1. Cara 1200\n2. Ben 1440\n3. Alice 1560\nwinner Cara",
    si2: "2\nZoe 2 300\nMax 1 500", so2: "1. Max 500\n2. Zoe 600\nwinner Max",
    i1: "4\nAnn 2 250\nBob 2 251\nCy 1 900\nDee 3 100", o1: "1. Dee 300\n2. Ann 500\n3. Bob 502\n4. Cy 900\nwinner Dee",
    i2: "2\nIvy 5 100\nHan 4 126", o2: "1. Ivy 500\n2. Han 504\nwinner Ivy",
    i3: "3\nRex 1 1\nUri 9 9\nTed 3 3", o3: "1. Rex 1\n2. Ted 9\n3. Uri 81\nwinner Rex",
    inputconstrains: "2 <= n <= 5; 1 <= laps <= 10; 1 <= lap_ms <= 1000; totals are distinct",
    blacklist: "sorted(,.sort(",
    whitelist: "threading.Thread",
    sourcecode: String.raw`import threading

n = int(input())
names = []
laps = []
lap_ms = []
for _ in range(n):
    parts = input().split()
    names.append(parts[0])
    laps.append(int(parts[1]))
    lap_ms.append(int(parts[2]))

totals = [0] * n

def ride(i):
    totals[i] = laps[i] * lap_ms[i]

threads = []
for i in range(n):
    t = threading.Thread(target=ride, args=(i,))
    threads.append(t)
    t.start()
for t in threads:
    t.join()

order = []
for i in range(n):
    order.append(i)
for a in range(n):
    for b in range(a + 1, n):
        if totals[order[b]] < totals[order[a]]:
            order[a], order[b] = order[b], order[a]

for rank in range(n):
    i = order[rank]
    print(str(rank + 1) + ". " + names[i] + " " + str(totals[i]))
print("winner " + names[order[0]])`,
  }),

  cq({
    title: "Batch Retry Simulator",
    description: desc(
      "A notification gateway retries failed sends with asyncio. Read n jobs, each with an id and a flag: ok (succeeds on attempt 1), flaky (succeeds on attempt 2), or fail (never succeeds; abandoned after attempt 3). Define an async attempt(flag, try_no) that returns True or False per the rules. In async main, process jobs in input order; for each job await up to 3 attempts, counting every attempt beyond the first as a retry. Print: delivered=X (jobs that eventually succeeded), retries=Z (total retries), and failed followed by the failed job ids space-separated in input order (or the word none).",
      "Line 1: n\nNext n lines: job_id flag (space separated).",
      "Line 1: delivered=X\nLine 2: retries=Z\nLine 3: failed <ids or none>",
      "1 <= n <= 20; flag is one of ok, flaky, fail; ids are single tokens"
    ),
    difficulty: "hard",
    variant: "scenario",
    subtopic: SUB.async,
    si1: "5\np1 ok\np2 flaky\np3 fail\np4 ok\np5 flaky", so1: "delivered=4\nretries=4\nfailed p3",
    si2: "3\nx ok\ny ok\nz ok", so2: "delivered=3\nretries=0\nfailed none",
    i1: "2\na fail\nb fail", o1: "delivered=0\nretries=4\nfailed a b",
    i2: "4\nn1 flaky\nn2 fail\nn3 flaky\nn4 ok", o2: "delivered=3\nretries=4\nfailed n2",
    i3: "1\nsolo flaky", o3: "delivered=1\nretries=1\nfailed none",
    inputconstrains: "1 <= n <= 20; flag is one of ok, flaky, fail",
    blacklist: "threading,asyncio.gather",
    whitelist: "await ,async def",
    sourcecode: String.raw`import asyncio

n = int(input())
items = []
for _ in range(n):
    parts = input().split()
    items.append((parts[0], parts[1]))

async def attempt(flag, try_no):
    if flag == "ok":
        return True
    if flag == "flaky":
        return try_no >= 2
    return False

async def main():
    delivered = 0
    retries = 0
    failed_ids = []
    for item_id, flag in items:
        done = False
        for try_no in range(1, 4):
            if try_no > 1:
                retries += 1
            ok = await attempt(flag, try_no)
            if ok:
                done = True
                break
        if done:
            delivered += 1
        else:
            failed_ids.append(item_id)
    print("delivered=" + str(delivered))
    print("retries=" + str(retries))
    if failed_ids:
        print("failed " + " ".join(failed_ids))
    else:
        print("failed none")

asyncio.run(main())`,
  }),
];

/* ============================ MCQ QUESTIONS ============================ */

const mcqs = [
  mq({
    title: "Starting a Thread",
    description: "You created t = threading.Thread(target=work). Which call actually begins executing work in a NEW thread?",
    difficulty: "easy",
    subtopic: SUB.create,
    options: ["t.start()", "t.run()", "t.join()", "t.begin()"],
    correct: 1,
  }),
  mq({
    title: "Thread Constructor Target",
    description: "Which keyword argument of threading.Thread tells it which function the new thread should execute?",
    difficulty: "easy",
    subtopic: SUB.create,
    options: ["target=", "func=", "run=", "job="],
    correct: 1,
  }),
  mq({
    title: "Purpose of join()",
    description: "Calling t.join() from the main thread does what?",
    difficulty: "easy",
    subtopic: SUB.join,
    options: [
      "Blocks the calling thread until t has finished running",
      "Starts t if it has not started yet",
      "Forcefully terminates t immediately",
      "Marks t as a daemon thread",
    ],
    correct: 1,
  }),
  mq({
    title: "Meaning of the GIL",
    description: "In CPython, what does the Global Interpreter Lock (GIL) guarantee?",
    difficulty: "easy",
    subtopic: SUB.concepts,
    options: [
      "Only one thread executes Python bytecodes at a time",
      "Threads always run in parallel on all CPU cores",
      "Python programs cannot use more than one thread",
      "All variables are copied into each thread",
    ],
    correct: 1,
  }),
  mq({
    title: "Threads Shine on I/O",
    description: "Python threads give the biggest real-world speedup for which kind of workload?",
    difficulty: "easy",
    subtopic: SUB.concepts,
    options: [
      "I/O-bound work that waits on network or disk",
      "CPU-bound pure-Python arithmetic loops",
      "Compiling C extension modules",
      "Printing a single line to stdout",
    ],
    correct: 1,
  }),
  mq({
    title: "Role of asyncio.run",
    description: "What does asyncio.run(main()) do?",
    difficulty: "easy",
    subtopic: SUB.async,
    options: [
      "Creates an event loop, runs the given coroutine until it completes, then closes the loop",
      "Spawns one OS thread per await expression",
      "Imports the asyncio module lazily",
      "Converts main() into a generator object",
    ],
    correct: 1,
  }),
  mq({
    title: "Locked Counter Snippet",
    description: "What does this Python snippet print? (Both threads are joined before printing.)",
    difficulty: "easy",
    subtopic: SUB.sync,
    options: ["0", "3", "6", "It is unpredictable between runs"],
    correct: 3,
    snippet: String.raw`import threading

count = 0
lock = threading.Lock()

def work():
    global count
    for _ in range(3):
        with lock:
            count += 1

t1 = threading.Thread(target=work)
t2 = threading.Thread(target=work)
t1.start()
t2.start()
t1.join()
t2.join()
print(count)`,
  }),
  mq({
    title: "Daemon Thread Exit",
    description: "What is the key behaviour of a thread created with daemon=True?",
    difficulty: "easy",
    subtopic: SUB.join,
    options: [
      "It does not keep the program alive; it is cut off when the main program exits",
      "It blocks program exit until it finishes",
      "It always runs with higher priority than normal threads",
      "It is forbidden from acquiring locks",
    ],
    correct: 1,
  }),
  mq({
    title: "Thread-Safe Queue",
    description: "Which statement about queue.Queue is correct?",
    difficulty: "easy",
    subtopic: SUB.sync,
    options: [
      "It is thread-safe: many threads can put and get items safely, FIFO order preserved",
      "It can only be used by the thread that created it",
      "It is faster than a list but not thread-safe",
      "It replaces locks by storing nothing",
    ],
    correct: 1,
  }),
  mq({
    title: "await Placement Rule",
    description: "Where is the await keyword allowed to appear?",
    difficulty: "easy",
    subtopic: SUB.async,
    options: [
      "Only inside a coroutine defined with async def",
      "Inside any regular function",
      "Anywhere at module top level in every Python version",
      "Only inside threads",
    ],
    correct: 1,
  }),
  mq({
    title: "run() Versus start()",
    description: "What does this snippet print, and what does it reveal?",
    difficulty: "medium",
    subtopic: SUB.create,
    options: [
      "ran then done — job() executes in the main thread, no new thread is created",
      "ran then done — job() executes in a brand new thread",
      "Only done is printed",
      "RuntimeError: thread was never started",
    ],
    correct: 1,
    snippet: String.raw`import threading

def job():
    print("ran")

t = threading.Thread(target=job)
t.run()
print("done")`,
  }),
  mq({
    title: "Slot Filling Threads",
    description: "What does this Python snippet print? (Both threads are joined before the print.)",
    difficulty: "medium",
    subtopic: SUB.create,
    options: ["0", "24", "52", "Unpredictable between runs"],
    correct: 3,
    snippet: String.raw`import threading

results = [0, 0]

def fill(i, v):
    results[i] = v * v

t1 = threading.Thread(target=fill, args=(0, 4))
t2 = threading.Thread(target=fill, args=(1, 6))
t1.start()
t2.start()
t1.join()
t2.join()
print(results[0] + results[1])`,
  }),
  mq({
    title: "Unawaited Coroutine",
    description: "What does this Python snippet print? (Note: calling a coroutine function does NOT run its body.)",
    difficulty: "medium",
    subtopic: SUB.async,
    options: ["5", "coroutine", "function", "It raises TypeError immediately"],
    correct: 2,
    snippet: String.raw`import asyncio

async def add(a, b):
    return a + b

x = add(2, 3)
print(type(x).__name__)`,
  }),
  mq({
    title: "is_alive Before start",
    description: "What does this Python snippet print?",
    difficulty: "medium",
    subtopic: SUB.join,
    options: ["True", "False", "It raises RuntimeError", "None"],
    correct: 2,
    snippet: String.raw`import threading

def noop():
    pass

t = threading.Thread(target=noop)
print(t.is_alive())`,
  }),
  mq({
    title: "Shared Data Race Hazard",
    description: "Which sentence best describes a race condition?",
    difficulty: "medium",
    subtopic: SUB.concepts,
    options: [
      "Two threads update shared data without synchronization, so the result depends on timing",
      "A thread finishes faster than the other threads in its process",
      "The GIL switches the running thread every five milliseconds",
      "A thread object is created but start() is never called",
    ],
    correct: 1,
  }),
  mq({
    title: "Await Chain Output",
    description: "What does this Python snippet print?",
    difficulty: "medium",
    subtopic: SUB.async,
    options: ["15", "20", "35", "coroutine"],
    correct: 3,
    snippet: String.raw`import asyncio

async def step(x):
    return x + 5

async def main():
    a = await step(10)
    b = await step(a)
    print(a + b)

asyncio.run(main())`,
  }),
  mq({
    title: "Lock Reacquire Deadlock",
    description: "What happens when this snippet runs? (Think carefully about whether a plain Lock can be acquired twice by the same thread.)",
    difficulty: "hard",
    subtopic: SUB.sync,
    options: [
      "It prints inner then after",
      "It hangs forever — a plain Lock is not reentrant, so the second acquire blocks on a lock its own thread already holds",
      "It prints inner, then raises RuntimeError",
      "The with statement silently allows nested acquisition, so both lines print",
    ],
    correct: 2,
    snippet: String.raw`import threading

lock = threading.Lock()

def risky():
    with lock:
        with lock:
            print("inner")

risky()
print("after")`,
  }),
  mq({
    title: "gather Order and Sum",
    description: "What does this Python snippet print?",
    difficulty: "hard",
    subtopic: SUB.async,
    options: ["20 2", "32 2", "2 32", "32 20"],
    correct: 2,
    snippet: String.raw`import asyncio

async def val(x):
    return x * 2

async def main():
    r = await asyncio.gather(val(1), val(5), val(10))
    print(sum(r), r[0])

asyncio.run(main())`,
  }),
  mq({
    title: "Daemon Thread Lifetime",
    description: "What does this snippet do? (spin loops forever, but the thread is a daemon.)",
    difficulty: "hard",
    subtopic: SUB.join,
    options: [
      "It prints bye and the process exits, cutting off the still-running daemon loop",
      "It hangs forever inside spin()",
      "It prints bye, then the daemon raises SystemExit in the main thread",
      "start() refuses to launch a daemon thread that loops forever",
    ],
    correct: 1,
    snippet: String.raw`import threading

def spin():
    while True:
        pass

t = threading.Thread(target=spin, daemon=True)
t.start()
print("bye")`,
  }),
  mq({
    title: "Why the GIL Is Not Enough",
    description: "Why can the statement count += 1 executed by several threads still misbehave in CPython even though the GIL allows only one thread to run bytecodes at a time?",
    difficulty: "hard",
    subtopic: SUB.concepts,
    options: [
      "The statement compiles to several bytecodes (read, add, write) and a thread switch can happen between them",
      "The GIL blocks all shared memory access, causing lost updates",
      "count += 1 is fully atomic, so it can never misbehave",
      "The GIL only protects file objects, not integers",
    ],
    correct: 1,
  }),
];

/* ============================ WRITE FILES ============================ */

writeFileSync(
  DIR + "/day-19.code.json",
  JSON.stringify({ day: 19, topics: [{ name: TOPIC_NAME, subtopics: SUBTOPICS }], questions }, null, 2)
);
writeFileSync(
  DIR + "/day-19.mcq.json",
  JSON.stringify({ day: 19, questions: mcqs }, null, 2)
);
console.log("wrote day 19:", questions.length, "code,", mcqs.length, "mcq");
