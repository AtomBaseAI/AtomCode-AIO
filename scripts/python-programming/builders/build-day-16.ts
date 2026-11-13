/**
 * Builder for day 16 — "Decorators and Generators" (20 code + 20 MCQ).
 * Run: bun scripts/python-programming/builders/build-day-16.ts
 */
import { mkdirSync, writeFileSync } from "node:fs";

const DIR = "/home/z/my-project/scripts/python-programming/data";
mkdirSync(DIR, { recursive: true });

const TOPIC_NAME = "Decorators and Generators";
const SUB = {
  deco: "Creating Decorators",
  decoargs: "Decorators with Arguments",
  genfn: "Generator Functions",
  lazy: "yield Keyword and Lazy Evaluation",
  genexp: "Generator Expressions",
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
    title: "Logger Start End Decorator Drill",
    description:
      "Decorator drill: wrap a function so the word start prints before it runs and the word end prints after.\n" +
      "The logger decorator wraps greet, which itself prints Hello, <name>.\n" +
      "\n" +
      "Input Format:\n" +
      "One line: the name.\n" +
      "\n" +
      "Output Format:\n" +
      "Line 1: start\n" +
      "Line 2: Hello, <name>\n" +
      "Line 3: end\n" +
      "\n" +
      "Constraints:\n" +
      "The name is 1-80 characters",
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.deco,
    si1: "Ada", so1: "start\nHello, Ada\nend",
    si2: "Grace Hopper", so2: "start\nHello, Grace Hopper\nend",
    i1: "Bo", o1: "start\nHello, Bo\nend",
    i2: "Kim Soo", o2: "start\nHello, Kim Soo\nend",
    i3: "Z", o3: "start\nHello, Z\nend",
    inputconstrains: "the name is 1-80 characters",
    sourcecode: String.raw`
def logger(func):
    def wrapper(name):
        print("start")
        func(name)
        print("end")
    return wrapper


@logger
def greet(name):
    print(f"Hello, {name}")


who = input()
greet(who)
`,
  }),

  cq({
    title: "Uppercase Return Decorator Drill",
    description:
      "Decorator drill: transform the return value. The louden wrapper uppercases whatever the decorated shout function returns.\n" +
      "shout(msg) returns 'notice: ' + msg; the driver prints the decorated call's result.\n" +
      "\n" +
      "Input Format:\n" +
      "One line: the message.\n" +
      "\n" +
      "Output Format:\n" +
      "One line: NOTICE: <message uppercased>\n" +
      "\n" +
      "Constraints:\n" +
      "The message is 1-80 characters",
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.deco,
    si1: "server down", so1: "NOTICE: SERVER DOWN",
    si2: "ok", so2: "NOTICE: OK",
    i1: "deploy at noon", o1: "NOTICE: DEPLOY AT NOON",
    i2: "a", o2: "NOTICE: A",
    i3: "Mixed Case Text", o3: "NOTICE: MIXED CASE TEXT",
    inputconstrains: "the message is 1-80 characters",
    sourcecode: String.raw`
def louden(func):
    def wrapper(msg):
        return func(msg).upper()
    return wrapper


@louden
def shout(msg):
    return "notice: " + msg


msg = input()
print(shout(msg))
`,
  }),

  cq({
    title: "Count Up Generator Drill",
    description:
      "Generator drill: count_up(limit) yields the numbers 1..limit one at a time, and a for loop consumes them.\n" +
      "\n" +
      "Input Format:\n" +
      "One integer: n.\n" +
      "\n" +
      "Output Format:\n" +
      "The numbers 1..n, one per line.\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= n <= 50",
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.genfn,
    si1: "3", so1: "1\n2\n3",
    si2: "1", so2: "1",
    i1: "5", o1: "1\n2\n3\n4\n5",
    i2: "7", o2: "1\n2\n3\n4\n5\n6\n7",
    i3: "10", o3: "1\n2\n3\n4\n5\n6\n7\n8\n9\n10",
    inputconstrains: "1 <= n <= 50",
    sourcecode: String.raw`
def count_up(limit):
    value = 1
    while value <= limit:
        yield value
        value += 1


n = int(input())
for number in count_up(n):
    print(number)
`,
  }),

  cq({
    title: "Genexpr Next Twice Drill",
    description:
      "Generator expression drill: build (v * v for v in values) from the stdin values and pull exactly two values out with next().\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: n\n" +
      "Line 2: n integers.\n" +
      "\n" +
      "Output Format:\n" +
      "Line 1: square of the first value\n" +
      "Line 2: square of the second value\n" +
      "\n" +
      "Constraints:\n" +
      "2 <= n <= 50; 0 <= value <= 100",
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.genexp,
    si1: "4\n3 5 2 8", so1: "9\n25",
    si2: "3\n1 1 1", so2: "1\n1",
    i1: "5\n2 4 6 8 10", o1: "4\n16",
    i2: "2\n9 0", o2: "81\n0",
    i3: "6\n10 20 30 40 50 60", o3: "100\n400",
    inputconstrains: "2 <= n <= 50; 0 <= value <= 100",
    sourcecode: String.raw`
n = int(input())
values = [int(x) for x in input().split()]
squares = (v * v for v in values)
print(next(squares))
print(next(squares))
`,
  }),

  cq({
    title: "Evens Only Filter Generator Drill",
    description:
      "Lazy filter drill: evens_only(values) is a generator that yields only the even values, one per pass - nothing is collected up front.\n" +
      "The driver prints every yielded value.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: n\n" +
      "Line 2: n integers.\n" +
      "\n" +
      "Output Format:\n" +
      "The even values, one per line, in input order.\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= n <= 50; 0 <= value <= 1000; at least one value is even",
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.lazy,
    si1: "5\n1 2 3 4 5", so1: "2\n4",
    si2: "4\n10 11 12 13", so2: "10\n12",
    i1: "3\n2 4 6", o1: "2\n4\n6",
    i2: "4\n7 8 9 10", o2: "8\n10",
    i3: "6\n100 3 5 7 9 12", o3: "100\n12",
    inputconstrains: "1 <= n <= 50; 0 <= value <= 1000; at least one value is even",
    sourcecode: String.raw`
def evens_only(values):
    for v in values:
        if v % 2 == 0:
            yield v


n = int(input())
values = [int(x) for x in input().split()]
for even in evens_only(values):
    print(even)
`,
  }),

  cq({
    title: "Countdown Generator Drill",
    description:
      "Generator drill: countdown(start) yields start, start-1, ..., down to 1.\n" +
      "\n" +
      "Input Format:\n" +
      "One integer: n.\n" +
      "\n" +
      "Output Format:\n" +
      "The numbers n..1, one per line.\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= n <= 50",
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.genfn,
    si1: "3", so1: "3\n2\n1",
    si2: "1", so2: "1",
    i1: "5", o1: "5\n4\n3\n2\n1",
    i2: "8", o2: "8\n7\n6\n5\n4\n3\n2\n1",
    i3: "12", o3: "12\n11\n10\n9\n8\n7\n6\n5\n4\n3\n2\n1",
    inputconstrains: "1 <= n <= 50",
    sourcecode: String.raw`
def countdown(start):
    while start >= 1:
        yield start
        start -= 1


n = int(input())
for tick in countdown(n):
    print(tick)
`,
  }),

  // ---------------- easy: scenarios ----------------
  cq({
    title: "Step Counter Decorator Lab",
    description:
      "A build pipeline decorates each QA step with @step_counter, which remembers how many times it has run and prints call <k> before invoking the step; the step doubles its input and prints the result.\n" +
      "Read n values and run the step on each one.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: n\n" +
      "Line 2: n integers.\n" +
      "\n" +
      "Output Format:\n" +
      "For each value: a line call <k> followed by a line with the doubled value.\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= n <= 20; 0 <= value <= 1000",
    difficulty: "easy",
    variant: "scenario",
    subtopic: SUB.deco,
    si1: "3\n5 7 2", so1: "call 1\n10\ncall 2\n14\ncall 3\n4",
    si2: "2\n0 1", so2: "call 1\n0\ncall 2\n2",
    i1: "1\n9", o1: "call 1\n18",
    i2: "4\n10 10 10 10", o2: "call 1\n20\ncall 2\n20\ncall 3\n20\ncall 4\n20",
    i3: "5\n1 2 3 4 5", o3: "call 1\n2\ncall 2\n4\ncall 3\n6\ncall 4\n8\ncall 5\n10",
    inputconstrains: "1 <= n <= 20; 0 <= value <= 1000",
    sourcecode: String.raw`
def step_counter(func):
    calls = 0

    def wrapper(value):
        nonlocal calls
        calls += 1
        print(f"call {calls}")
        return func(value)

    return wrapper


@step_counter
def double(value):
    print(value * 2)


n = int(input())
values = [int(x) for x in input().split()]
for v in values:
    double(v)
`,
  }),

  cq({
    title: "Rate Limiter Stub Decorator",
    description:
      "An API gateway stub uses a decorator factory @rate_limiter(limit) to grant the first limit pings and block the rest.\n" +
      "The wrapper prints allowed and then calls ping (which returns pong <tag>), or prints blocked. The driver prints the returned greeting only for allowed calls.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: limit\n" +
      "Line 2: n\n" +
      "Next n lines: one tag each (single tokens).\n" +
      "\n" +
      "Output Format:\n" +
      "Per call: allowed then pong <tag>, or just blocked.\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= limit <= 10; 1 <= n <= 20; tags are single tokens of 1-10 characters",
    difficulty: "easy",
    variant: "scenario",
    subtopic: SUB.decoargs,
    si1: "2\n4\na\nb\nc\nd", so1: "allowed\npong a\nallowed\npong b\nblocked\nblocked",
    si2: "1\n2\nx\ny", so2: "allowed\npong x\nblocked",
    i1: "3\n3\nt1\nt2\nt3", o1: "allowed\npong t1\nallowed\npong t2\nallowed\npong t3",
    i2: "1\n3\np\nq\nr", o2: "allowed\npong p\nblocked\nblocked",
    i3: "2\n1\nonly", o3: "allowed\npong only",
    inputconstrains: "1 <= limit <= 10; 1 <= n <= 20; tags are single tokens of 1-10 characters",
    sourcecode: String.raw`
def rate_limiter(limit):
    def deco(func):
        granted = 0

        def wrapper(tag):
            nonlocal granted
            if granted < limit:
                granted += 1
                print("allowed")
                return func(tag)
            print("blocked")
            return None

        return wrapper

    return deco


limit = int(input())


@rate_limiter(limit)
def ping(tag):
    return f"pong {tag}"


n = int(input())
for _ in range(n):
    result = ping(input())
    if result is not None:
        print(result)
`,
  }),

  cq({
    title: "Sensor Batch Streamer",
    description:
      "A telemetry bus streams sensor readings, and a generator batches(values, size) yields groups of at most <size> readings as they arrive - the final partial batch is still yielded.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: n and k.\n" +
      "Line 2: n integers.\n" +
      "\n" +
      "Output Format:\n" +
      "One line per batch: the batch's values space-separated.\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= k <= n <= 100",
    difficulty: "easy",
    variant: "scenario",
    subtopic: SUB.genfn,
    si1: "5 2\n1 2 3 4 5", so1: "1 2\n3 4\n5",
    si2: "4 4\n9 8 7 6", so2: "9 8 7 6",
    i1: "6 3\n1 1 1 1 1 1", o1: "1 1 1\n1 1 1",
    i2: "3 5\n4 5 6", o2: "4 5 6",
    i3: "7 1\n5 4 3 2 1 0 9", o3: "5\n4\n3\n2\n1\n0\n9",
    inputconstrains: "1 <= k <= n <= 100",
    sourcecode: String.raw`
def batches(values, size):
    batch = []
    for v in values:
        batch.append(v)
        if len(batch) == size:
            yield batch
            batch = []
    if batch:
        yield batch


n, k = map(int, input().split())
values = [int(x) for x in input().split()]
for chunk in batches(values, k):
    print(*chunk)
`,
  }),

  cq({
    title: "Bee Colony Fibonacci Projector",
    description:
      "A nature documentary's bee-ancestry model projects colony counts with the Fibonacci sequence, produced lazily by a generator that yields one term at a time.\n" +
      "The sequence starts 1, 1, 2, 3, 5, 8, ...\n" +
      "\n" +
      "Input Format:\n" +
      "One integer: how many terms.\n" +
      "\n" +
      "Output Format:\n" +
      "The first n Fibonacci terms, one per line.\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= n <= 30",
    difficulty: "easy",
    variant: "scenario",
    subtopic: SUB.lazy,
    si1: "6", so1: "1\n1\n2\n3\n5\n8",
    si2: "1", so2: "1",
    i1: "3", o1: "1\n1\n2",
    i2: "8", o2: "1\n1\n2\n3\n5\n8\n13\n21",
    i3: "10", o3: "1\n1\n2\n3\n5\n8\n13\n21\n34\n55",
    inputconstrains: "1 <= n <= 30",
    sourcecode: String.raw`
def fibonacci(count):
    a, b = 1, 1
    for _ in range(count):
        yield a
        a, b = b, a + b


n = int(input())
for term in fibonacci(n):
    print(term)
`,
  }),

  // ---------------- medium ----------------
  cq({
    title: "Repeat Announcer Decorator",
    description:
      "A stadium PA repeats each announcement k times through a decorator factory: @repeat(k) runs the decorated announcer k times, printing its returned line on each run.\n" +
      "k is read from stdin before the decorated function is defined, so the factory receives the runtime value.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: k\n" +
      "Line 2: n\n" +
      "Next n lines: one message each.\n" +
      "\n" +
      "Output Format:\n" +
      "For each message: Announcing: <message> repeated k times.\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= k <= 5; 1 <= n <= 10; messages are 1-40 characters",
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.decoargs,
    si1: "2\n2\nLunch served\nGates open",
    so1: "Announcing: Lunch served\nAnnouncing: Lunch served\nAnnouncing: Gates open\nAnnouncing: Gates open",
    si2: "3\n1\nsoundcheck",
    so2: "Announcing: soundcheck\nAnnouncing: soundcheck\nAnnouncing: soundcheck",
    i1: "1\n3\na\nb\nc", o1: "Announcing: a\nAnnouncing: b\nAnnouncing: c",
    i2: "4\n1\nfinal call", o2: "Announcing: final call\nAnnouncing: final call\nAnnouncing: final call\nAnnouncing: final call",
    i3: "2\n3\nm1\nm2\nm3", o3: "Announcing: m1\nAnnouncing: m1\nAnnouncing: m2\nAnnouncing: m2\nAnnouncing: m3\nAnnouncing: m3",
    inputconstrains: "1 <= k <= 5; 1 <= n <= 10; messages are 1-40 characters",
    blacklist: "functools",
    whitelist: "@, def ",
    sourcecode: String.raw`
def repeat(times):
    def deco(func):
        def wrapper(msg):
            for _ in range(times):
                print(func(msg))
        return wrapper

    return deco


k = int(input())


@repeat(k)
def announce(msg):
    return f"Announcing: {msg}"


n = int(input())
for _ in range(n):
    announce(input())
`,
  }),

  cq({
    title: "Memoized Growth Forecaster",
    description:
      "A power-grid forecaster answers repeated growth queries; a hand-rolled memo decorator caches results in a dict kept in its closure (no functools, no lru_cache).\n" +
      "growth(1) = growth(2) = 1 and growth(k) = growth(k-1) + growth(k-2).\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: q\n" +
      "Next q lines: one k per line.\n" +
      "\n" +
      "Output Format:\n" +
      "One line per query: growth(k).\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= q <= 10; 1 <= k <= 25",
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.deco,
    si1: "3\n1\n5\n10", so1: "1\n5\n55",
    si2: "1\n2", so2: "1",
    i1: "2\n7\n8", o1: "13\n21",
    i2: "4\n1\n2\n3\n4", o2: "1\n1\n2\n3",
    i3: "2\n20\n15", o3: "6765\n610",
    inputconstrains: "1 <= q <= 10; 1 <= k <= 25",
    blacklist: "functools, lru_cache",
    whitelist: "@, def ",
    sourcecode: String.raw`
def memo(func):
    cache = {}

    def wrapper(k):
        if k not in cache:
            cache[k] = func(k)
        return cache[k]

    return wrapper


@memo
def growth(k):
    if k <= 2:
        return 1
    return growth(k - 1) + growth(k - 2)


q = int(input())
for _ in range(q):
    print(growth(int(input())))
`,
  }),

  cq({
    title: "Stock Tick Pipeline",
    description:
      "A market-data desk builds a lazy three-stage generator pipeline: read_ticks yields ticks straight from stdin, above(stream, threshold) passes on only ticks strictly greater than the threshold, and scale(stream, factor) multiplies each surviving tick by the factor. The driver consumes the pipeline with a single for loop - no lists, no appends.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: n, threshold, factor.\n" +
      "Next n lines: one tick each.\n" +
      "\n" +
      "Output Format:\n" +
      "One line per surviving tick: tick * factor.\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= n <= 1000; 0 <= threshold <= 1000000; 1 <= factor <= 100; 0 <= tick <= 1000000; at least one tick is above the threshold",
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.lazy,
    si1: "5 100 2\n50\n120\n80\n200\n99", so1: "240\n400",
    si2: "3 0 1\n1\n2\n3", so2: "1\n2\n3",
    i1: "4 10 3\n5\n11\n10\n12", o1: "33\n36",
    i2: "5 500 10\n600\n100\n700\n800\n50", o2: "6000\n7000\n8000",
    i3: "2 1 1\n2\n3", o3: "2\n3",
    inputconstrains: "1 <= n <= 1000; 0 <= threshold <= 1000000; 1 <= factor <= 100; 0 <= tick <= 1000000",
    blacklist: "list(, .append(",
    whitelist: "yield",
    sourcecode: String.raw`
def read_ticks(count):
    for _ in range(count):
        yield int(input())


def above(stream, threshold):
    for tick in stream:
        if tick > threshold:
            yield tick


def scale(stream, factor):
    for tick in stream:
        yield tick * factor


n, threshold, factor = map(int, input().split())
pipeline = scale(above(read_ticks(n), threshold), factor)
for value in pipeline:
    print(value)
`,
  }),

  cq({
    title: "Thermal Audit Sum of Squares",
    description:
      "A server-room audit scores thermal stress as the sum of squares of the abnormal readings - those that are even and positive - computed with a single generator expression feeding sum (no .append, no intermediate lists).\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: n\n" +
      "Line 2: n integers.\n" +
      "\n" +
      "Output Format:\n" +
      "One line: the sum of squares of the even positive values.\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= n <= 1000; -1000 <= value <= 1000",
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.genexp,
    si1: "5\n2 3 4 5 6", so1: "56",
    si2: "3\n-2 4 0", so2: "16",
    i1: "4\n1 2 3 8", o1: "68",
    i2: "2\n0 0", o2: "0",
    i3: "6\n10 20 30 1 3 5", o3: "1400",
    inputconstrains: "1 <= n <= 1000; -1000 <= value <= 1000",
    blacklist: ".append(",
    whitelist: "sum(, for ",
    sourcecode: String.raw`
n = int(input())
values = [int(x) for x in input().split()]
total = sum(v * v for v in values if v % 2 == 0 and v > 0)
print(total)
`,
  }),

  cq({
    title: "Audited Charge Decorator",
    description:
      "A payment gateway must leave an audit trail. The @audit wrapper lets charge(amount, rate) compute and return amount * rate, prints an AUDIT line with the call and the result, then passes the result through; the driver prints Total: <result>.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: n\n" +
      "Next n lines: amount rate.\n" +
      "\n" +
      "Output Format:\n" +
      "Per transaction: AUDIT charge(<amount>, <rate>) -> <product> then Total: <product>.\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= n <= 20; 0 <= amount <= 10000; 1 <= rate <= 100",
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.deco,
    si1: "2\n100 3\n250 4", so1: "AUDIT charge(100, 3) -> 300\nTotal: 300\nAUDIT charge(250, 4) -> 1000\nTotal: 1000",
    si2: "1\n5 5", so2: "AUDIT charge(5, 5) -> 25\nTotal: 25",
    i1: "3\n10 2\n20 3\n30 4", o1: "AUDIT charge(10, 2) -> 20\nTotal: 20\nAUDIT charge(20, 3) -> 60\nTotal: 60\nAUDIT charge(30, 4) -> 120\nTotal: 120",
    i2: "1\n0 9", o2: "AUDIT charge(0, 9) -> 0\nTotal: 0",
    i3: "2\n999 10\n123 7", o3: "AUDIT charge(999, 10) -> 9990\nTotal: 9990\nAUDIT charge(123, 7) -> 861\nTotal: 861",
    inputconstrains: "1 <= n <= 20; 0 <= amount <= 10000; 1 <= rate <= 100",
    blacklist: "functools",
    whitelist: "@, return ",
    sourcecode: String.raw`
def audit(func):
    def wrapper(amount, rate):
        result = func(amount, rate)
        print(f"AUDIT charge({amount}, {rate}) -> {result}")
        return result

    return wrapper


@audit
def charge(amount, rate):
    return amount * rate


n = int(input())
for _ in range(n):
    a, r = map(int, input().split())
    total = charge(a, r)
    print(f"Total: {total}")
`,
  }),

  cq({
    title: "Badge Scanner Sentinel Stop",
    description:
      "A conference badge scanner reads a whitespace-separated token stream and must stop at the sentinel token END. A generator yields badge tokens lazily and returns when it reaches the sentinel; the driver consumes the generator with next() inside try/except StopIteration.\n" +
      "\n" +
      "Input Format:\n" +
      "One line of tokens; the last token is END.\n" +
      "\n" +
      "Output Format:\n" +
      "Each badge token before END, one per line.\n" +
      "\n" +
      "Constraints:\n" +
      "1-20 tokens; the last token is END; at least one badge precedes END; badges are 1-12 characters",
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.lazy,
    si1: "B001 B002 END", so1: "B001\nB002",
    si2: "X9 END", so2: "X9",
    i1: "A C E END G", o1: "A\nC\nE",
    i2: "Z1 Z2 Z3 END", o2: "Z1\nZ2\nZ3",
    i3: "Solo END", o3: "Solo",
    inputconstrains: "1-20 tokens; last token is END; at least one badge before END",
    blacklist: ".index(",
    whitelist: "yield, try:",
    sourcecode: String.raw`
def scan(tokens, sentinel):
    for token in tokens:
        if token == sentinel:
            return
        yield token


parts = input().split()
reader = scan(parts, "END")
while True:
    try:
        badge = next(reader)
        print(badge)
    except StopIteration:
        break
`,
  }),

  // ---------------- hard ----------------
  cq({
    title: "Stacked Decorator Order Probe",
    description:
      "A billing service stacks two decorators on charge: @audit above @prefix. The BOTTOM decorator is applied first, so at call time audit's wrapper runs first, delegates to prefix's wrapper, which delegates to charge.\n" +
      "For each amount the prints come out in this exact order: audit-before <amount>, prefix-before, prefix-after, audit-after >> <2*amount>, and finally the driver prints FINAL >> <2*amount> (charge doubles the amount; prefix turns the result into '>> <result>').\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: n\n" +
      "Next n lines: one amount each.\n" +
      "\n" +
      "Output Format:\n" +
      "Five lines per amount, as described above.\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= n <= 10; 0 <= amount <= 10000",
    difficulty: "hard",
    variant: "scenario",
    subtopic: SUB.deco,
    si1: "1\n5", so1: "audit-before 5\nprefix-before\nprefix-after\naudit-after >> 10\nFINAL >> 10",
    si2: "2\n3\n7", so2: "audit-before 3\nprefix-before\nprefix-after\naudit-after >> 6\nFINAL >> 6\naudit-before 7\nprefix-before\nprefix-after\naudit-after >> 14\nFINAL >> 14",
    i1: "1\n0", o1: "audit-before 0\nprefix-before\nprefix-after\naudit-after >> 0\nFINAL >> 0",
    i2: "3\n1\n2\n10", o2: "audit-before 1\nprefix-before\nprefix-after\naudit-after >> 2\nFINAL >> 2\naudit-before 2\nprefix-before\nprefix-after\naudit-after >> 4\nFINAL >> 4\naudit-before 10\nprefix-before\nprefix-after\naudit-after >> 20\nFINAL >> 20",
    i3: "2\n25\n100", o3: "audit-before 25\nprefix-before\nprefix-after\naudit-after >> 50\nFINAL >> 50\naudit-before 100\nprefix-before\nprefix-after\naudit-after >> 200\nFINAL >> 200",
    inputconstrains: "1 <= n <= 10; 0 <= amount <= 10000",
    blacklist: "functools",
    whitelist: "@, def ",
    sourcecode: String.raw`
def audit(func):
    def wrapper(amount):
        print(f"audit-before {amount}")
        result = func(amount)
        print(f"audit-after {result}")
        return result

    return wrapper


def prefix(func):
    def wrapper(amount):
        print("prefix-before")
        result = func(amount)
        print("prefix-after")
        return ">> " + str(result)

    return wrapper


@audit
@prefix
def charge(amount):
    return amount * 2


n = int(input())
for _ in range(n):
    final = charge(int(input()))
    print(f"FINAL {final}")
`,
  }),

  cq({
    title: "Retry on Flaky Job Simulator",
    description:
      "A deployment simulator retries a flaky job through a decorator factory @retry(limit). Each attempt prints attempt <k>. The wrapped job consults a deterministic schedule read from stdin (token 1 = succeed, token 0 = raise FlakyError); the wrapper catches FlakyError and prints failed. On success the wrapper prints success on attempt <k> and stops; if every allowed attempt fails it prints job aborted. Attempts beyond the schedule's length always fail, and schedule entries beyond the limit are never reached.\n" +
      "After a success the driver prints job done.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: limit\n" +
      "Line 2: the schedule, space-separated 0/1 tokens.\n" +
      "\n" +
      "Output Format:\n" +
      "The attempt/failed/success trace as described, ending with job done or job aborted.\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= limit <= 10; 1 <= schedule length <= 10; tokens are 0 or 1",
    difficulty: "hard",
    variant: "scenario",
    subtopic: SUB.deco,
    si1: "3\n0 0 1", so1: "attempt 1\nfailed\nattempt 2\nfailed\nattempt 3\nsuccess on attempt 3\njob done",
    si2: "2\n0 0 1", so2: "attempt 1\nfailed\nattempt 2\nfailed\njob aborted",
    i1: "1\n1", o1: "attempt 1\nsuccess on attempt 1\njob done",
    i2: "4\n0 1 0 0", o2: "attempt 1\nfailed\nattempt 2\nsuccess on attempt 2\njob done",
    i3: "5\n0 0", o3: "attempt 1\nfailed\nattempt 2\nfailed\nattempt 3\nfailed\nattempt 4\nfailed\nattempt 5\nfailed\njob aborted",
    inputconstrains: "1 <= limit <= 10; 1 <= schedule length <= 10; tokens are 0 or 1",
    blacklist: "random, time.",
    whitelist: "@, try:",
    sourcecode: String.raw`
class FlakyError(Exception):
    pass


def retry(limit):
    def deco(func):
        def wrapper():
            for attempt in range(1, limit + 1):
                print(f"attempt {attempt}")
                try:
                    func(attempt)
                    print(f"success on attempt {attempt}")
                    return "OK"
                except FlakyError:
                    print("failed")
            print("job aborted")
            return None

        return wrapper

    return deco


limit = int(input())
schedule = input().split()


@retry(limit)
def run_job(attempt):
    ok = attempt <= len(schedule) and schedule[attempt - 1] == "1"
    if not ok:
        raise FlakyError("flaky")


outcome = run_job()
if outcome == "OK":
    print("job done")
`,
  }),

  cq({
    title: "ECG Running Stats Stream",
    description:
      "A streaming ECG monitor exposes a generator that yields the tuple (index, running total, running maximum) after each sample, tracking the aggregates by hand (no sum(), no max(), no itertools). Samples may be negative, so the running maximum must be initialized from the first sample, not from zero.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: n\n" +
      "Line 2: n integers.\n" +
      "\n" +
      "Output Format:\n" +
      "One line per sample: <index> <running total> <running max>.\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= n <= 1000; -10000 <= value <= 10000",
    difficulty: "hard",
    variant: "scenario",
    subtopic: SUB.lazy,
    si1: "5\n3 -1 4 -1 5", so1: "1 3 3\n2 2 3\n3 6 4\n4 5 4\n5 10 5",
    si2: "3\n-5 -2 -9", so2: "1 -5 -5\n2 -7 -2\n3 -16 -2",
    i1: "1\n7", o1: "1 7 7",
    i2: "4\n0 0 0 0", o2: "1 0 0\n2 0 0\n3 0 0\n4 0 0",
    i3: "6\n10 -10 20 -20 30 -30", o3: "1 10 10\n2 0 10\n3 20 20\n4 0 20\n5 30 30\n6 0 30",
    inputconstrains: "1 <= n <= 1000; -10000 <= value <= 10000",
    blacklist: "itertools, sum(, max(",
    whitelist: "yield, for ",
    sourcecode: String.raw`
def running_stats(values):
    total = 0
    peak = None
    index = 0
    for v in values:
        index += 1
        total += v
        if peak is None or v > peak:
            peak = v
        yield (index, total, peak)


n = int(input())
values = [int(x) for x in input().split()]
for i, total, peak in running_stats(values):
    print(f"{i} {total} {peak}")
`,
  }),

  cq({
    title: "Paged Export Streamer",
    description:
      "A DB export tool pages through a live record stream. record_stream(count) yields (sku, qty) tuples one at a time (reading stdin lazily inside the generator), paginate(source, size) groups the tuples into pages of at most <size>, and the driver prints a PAGE header per page followed by the page's records indented with two leading spaces. Everything stays generator-driven - no list() constructor anywhere.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: k and n.\n" +
      "Next n lines: sku qty (skus are single tokens).\n" +
      "\n" +
      "Output Format:\n" +
      "Per page: PAGE <p> (<m> records) - or (1 record) when the page holds a single record - then each record as two spaces, sku, space, qty.\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= k <= 100; 1 <= n <= 500; 0 <= qty <= 1000; skus are 1-8 characters",
    difficulty: "hard",
    variant: "scenario",
    subtopic: SUB.genfn,
    si1: "2 5\nA1 3\nB2 4\nC3 5\nD4 6\nE5 7",
    so1: "PAGE 1 (2 records)\n  A1 3\n  B2 4\nPAGE 2 (2 records)\n  C3 5\n  D4 6\nPAGE 3 (1 record)\n  E5 7",
    si2: "10 3\nX 1\nY 2\nZ 3", so2: "PAGE 1 (3 records)\n  X 1\n  Y 2\n  Z 3",
    i1: "1 4\na 9\nb 8\nc 7\nd 6", o1: "PAGE 1 (1 record)\n  a 9\nPAGE 2 (1 record)\n  b 8\nPAGE 3 (1 record)\n  c 7\nPAGE 4 (1 record)\n  d 6",
    i2: "3 3\np 1\nq 1\nr 1", o2: "PAGE 1 (3 records)\n  p 1\n  q 1\n  r 1",
    i3: "2 6\ns1 10\ns2 20\ns3 30\ns4 40\ns5 50\ns6 60", o3: "PAGE 1 (2 records)\n  s1 10\n  s2 20\nPAGE 2 (2 records)\n  s3 30\n  s4 40\nPAGE 3 (2 records)\n  s5 50\n  s6 60",
    inputconstrains: "1 <= k <= 100; 1 <= n <= 500; 0 <= qty <= 1000; skus are 1-8 characters",
    blacklist: "list(, itertools",
    whitelist: "yield",
    sourcecode: String.raw`
def record_stream(count):
    for _ in range(count):
        sku, qty = input().split()
        yield (sku, int(qty))


def paginate(source, size):
    page = []
    for rec in source:
        page.append(rec)
        if len(page) == size:
            yield page
            page = []
    if page:
        yield page


k, n = map(int, input().split())
for page_no, page in enumerate(paginate(record_stream(n), k), 1):
    noun = "record" if len(page) == 1 else "records"
    print(f"PAGE {page_no} ({len(page)} {noun})")
    for sku, qty in page:
        print(f"  {sku} {qty}")
`,
  }),
];

/* ============================ MCQ QUESTIONS ============================ */

const mcqs = [
  // ---------------- easy ----------------
  mq({
    title: "Decorator Syntax Sugar",
    description: "Writing @deco directly above def f(): ... is equivalent to which assignment?",
    difficulty: "easy",
    subtopic: SUB.deco,
    options: [
      "f = deco(f)",
      "f = f(deco)",
      "deco = f(deco)",
      "f = deco(f())",
    ],
    correct: 1,
  }),
  mq({
    title: "When Decorators Execute",
    description: "The decorator function itself (the one that takes the function) runs...",
    difficulty: "easy",
    subtopic: SUB.deco,
    options: [
      "each time the decorated function is called",
      "once, when the def statement with the @ line executes",
      "when the program exits",
      "only when the wrapper is first called",
    ],
    correct: 2,
  }),
  mq({
    title: "Wrapper Remembers the Function",
    description: "How does the wrapper inside a decorator reach the original function on every call?",
    difficulty: "easy",
    subtopic: SUB.deco,
    options: [
      "through the enclosing decorator's closure scope",
      "through a global function registry",
      "through class inheritance",
      "through the return statement of the wrapper",
    ],
    correct: 1,
  }),
  mq({
    title: "Calling a Generator Function",
    description: "Calling a function whose body contains yield...",
    difficulty: "easy",
    subtopic: SUB.genfn,
    options: [
      "runs the body and returns the first yielded value",
      "returns a generator object without executing the body",
      "returns a list of every value the body would yield",
      "raises StopIteration immediately",
    ],
    correct: 2,
  }),
  mq({
    title: "Yield Pauses Execution",
    description: "When a generator reaches a yield statement, what happens to its local variables?",
    difficulty: "easy",
    subtopic: SUB.lazy,
    options: [
      "They are destroyed immediately",
      "They are preserved and restored when execution resumes",
      "They reset to their defaults on the next resume",
      "They are copied into global scope",
    ],
    correct: 2,
  }),
  mq({
    title: "Next Past the End",
    description: "Calling next(g) once a generator is exhausted...",
    difficulty: "easy",
    subtopic: SUB.lazy,
    options: [
      "returns None",
      "raises StopIteration",
      "restarts generation from the beginning",
      "raises GeneratorExit",
    ],
    correct: 2,
  }),
  mq({
    title: "Generator Expression Syntax",
    description: "Which expression builds a lazy generator producing squares?",
    difficulty: "easy",
    subtopic: SUB.genexp,
    options: [
      "[x * x for x in nums]",
      "(x * x for x in nums)",
      "{x * x for x in nums}",
      "gen(x * x for x in nums)",
    ],
    correct: 2,
  }),
  mq({
    title: "For Loop Over a Generator",
    description: "When a for loop iterates a generator, it stops...",
    difficulty: "easy",
    subtopic: SUB.genfn,
    options: [
      "by catching the StopIteration the generator raises when exhausted",
      "by checking len(generator) on every pass",
      "only when you call break explicitly",
      "with an unhandled StopIteration traceback",
    ],
    correct: 1,
  }),
  mq({
    title: "What Makes a Generator Function",
    description: "A function becomes a generator function when...",
    difficulty: "easy",
    subtopic: SUB.genfn,
    options: [
      "it contains the yield keyword anywhere in its body",
      "it returns a tuple",
      "it is declared with def gen(...)",
      "it calls range() at least once",
    ],
    correct: 1,
  }),
  mq({
    title: "Decorator With Arguments Shape",
    description: "Placing @repeat(3) above a def requires which definition structure?",
    difficulty: "easy",
    subtopic: SUB.decoargs,
    options: [
      "a single def that returns a wrapper",
      "three nested defs: repeat(3) returns a decorator, which takes the function and returns the wrapper",
      "a class exposing __call__ only",
      "repeat defined with only a default parameter times=3",
    ],
    correct: 2,
  }),

  // ---------------- medium ----------------
  mq({
    title: "Logger Decorator Output Order",
    description: "process is decorated by logger. Which lines reach stdout, in order?",
    difficulty: "medium",
    subtopic: SUB.deco,
    options: [
      "enter\nbody 4\nexit\n5",
      "body 4\nenter\nexit\n5",
      "enter\nexit\nbody 4\n5",
      "enter\nbody 4\n5\nexit",
    ],
    correct: 1,
    snippet: String.raw`
def logger(func):
    def wrapper(x):
        print("enter")
        result = func(x)
        print("exit")
        return result
    return wrapper

@logger
def process(x):
    print("body", x)
    return x + 1

print(process(4))
`,
  }),
  mq({
    title: "Generator Body Runs Lazily",
    description: "gen prints a line before its first yield; g is created and next(g) is called once. What prints?",
    difficulty: "medium",
    subtopic: SUB.genfn,
    options: [
      "created\nfirst next\n1",
      "first next\ncreated\n1",
      "created\nfirst next\n1\nsecond next\n2",
      "first next\n1",
    ],
    correct: 1,
    snippet: String.raw`
def gen():
    print("first next")
    yield 1
    print("second next")
    yield 2

g = gen()
print("created")
print(next(g))
`,
  }),
  mq({
    title: "Genexp Stays Lazy",
    description: "A generator expression over nums is created, then nums.append(4) runs before sum consumes it. What prints?",
    difficulty: "medium",
    subtopic: SUB.genexp,
    options: [
      "14 - the genexp froze the original contents",
      "30 - the genexp sees the appended 4 at consumption time",
      "1 - only the first element is squared",
      "TypeError - lists cannot change during iteration",
    ],
    correct: 2,
    snippet: String.raw`
nums = [1, 2, 3]
squares = (n * n for n in nums)
nums.append(4)
print(sum(squares))
`,
  }),
  mq({
    title: "Repeat Decorator With Arg",
    description: "ping is decorated with @repeat(2). What does the call ping() print?",
    difficulty: "medium",
    subtopic: SUB.decoargs,
    options: [
      "ping",
      "ping\nping",
      "ping\nping\nping",
      "nothing - repeat(2) requires functools",
    ],
    correct: 2,
    snippet: String.raw`
def repeat(times):
    def deco(func):
        def wrapper():
            for _ in range(times):
                print(func())
        return wrapper
    return deco

@repeat(2)
def ping():
    return "ping"

ping()
`,
  }),
  mq({
    title: "Stacking Order Concept",
    description: "With @outer above @inner above def f(), when f() is called the first code to execute belongs to...",
    difficulty: "medium",
    subtopic: SUB.deco,
    options: [
      "inner's wrapper",
      "outer's wrapper",
      "f's body",
      "both wrappers in parallel",
    ],
    correct: 2,
  }),
  mq({
    title: "Memo Closure State",
    description: "In a hand-rolled memoization decorator, the results cache lives...",
    difficulty: "medium",
    subtopic: SUB.deco,
    options: [
      "in a dict created in the decorator and captured by the wrapper's closure, shared across all calls",
      "in the decorated function's default arguments",
      "in a fresh local dict rebuilt on every call",
      "in the module's __name__ attribute",
    ],
    correct: 1,
  }),

  // ---------------- hard ----------------
  mq({
    title: "Yield Resumes With State",
    description: "counter(start) increments n before each yield inside while True. What do the three next() calls print?",
    difficulty: "hard",
    subtopic: SUB.lazy,
    options: [
      "11\n12\n13",
      "11\n11\n11",
      "10\n11\n12",
      "a StopIteration traceback after the first value",
    ],
    correct: 1,
    snippet: String.raw`
def counter(start):
    n = start
    while True:
        n += 1
        yield n

c = counter(10)
print(next(c))
print(next(c))
print(next(c))
`,
  }),
  mq({
    title: "Stacked Decorator Execution Order",
    description: "doc has @bold above @italic. Which lines print, in order?",
    difficulty: "hard",
    subtopic: SUB.deco,
    options: [
      "bold-in\nitalic-in\nbody\nitalic-out\nbold-out",
      "italic-in\nbold-in\nbody\nbold-out\nitalic-out",
      "bold-in\nbody\nbold-out",
      "body\nbold-in\nitalic-in",
    ],
    correct: 1,
    snippet: String.raw`
def bold(func):
    def wrapper():
        print("bold-in")
        func()
        print("bold-out")
    return wrapper

def italic(func):
    def wrapper():
        print("italic-in")
        func()
        print("italic-out")
    return wrapper

@bold
@italic
def doc():
    print("body")

doc()
`,
  }),
  mq({
    title: "Genexp Exhausted After One Pass",
    description: "data is a generator over range(3); sum(data) runs twice. What prints?",
    difficulty: "hard",
    subtopic: SUB.genexp,
    options: [
      "3\n3",
      "3\n0",
      "0\n0",
      "a StopIteration traceback on the second sum",
    ],
    correct: 2,
    snippet: String.raw`
data = (x for x in range(3))
print(sum(data))
print(sum(data))
`,
  }),
  mq({
    title: "Next With Default",
    description: "two_step yields 'a' then 'b'; next is called three times with the default 'empty'. What prints?",
    difficulty: "hard",
    subtopic: SUB.lazy,
    options: [
      "a\nb\nempty",
      "a\nb\nStopIteration traceback",
      "a\nb\nNone",
      "empty\nempty\nempty",
    ],
    correct: 1,
    snippet: String.raw`
def two_step():
    yield "a"
    yield "b"

g = two_step()
print(next(g, "empty"))
print(next(g, "empty"))
print(next(g, "empty"))
`,
  }),
];

/* ============================ WRITE ============================ */

writeFileSync(
  DIR + "/day-16.code.json",
  JSON.stringify({ day: 16, topics: [{ name: TOPIC_NAME, subtopics: Object.values(SUB) }], questions }, null, 2)
);
writeFileSync(
  DIR + "/day-16.mcq.json",
  JSON.stringify({ day: 16, questions: mcqs }, null, 2)
);
console.log("wrote day 16:", questions.length, "code,", mcqs.length, "mcq");
