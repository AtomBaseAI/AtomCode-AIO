import { writeFileSync } from "node:fs";

const DAY = 19;
const TOPIC = "Threads and Concurrency";
const SUBTOPICS = [
  "Creating Threads",
  "Thread Joining and Lifecycle",
  "Mutex and Synchronization",
  "Queue for Thread Communication",
  "Fibers",
];

type CodeQ = {
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  variant: "basic" | "scenario";
  maxscore: number;
  lang: "ruby";
  topic: string;
  subtopic: string;
  sampleinput1: string;
  sampleoutput1: string;
  sampleinput2: string;
  sampleoutput2: string;
  input1: string;
  output1: string;
  input2: string;
  output2: string;
  input3: string;
  output3: string;
  inputconstrains: string;
  blacklist: string;
  whitelist: string;
  sourcecode: string;
};

type MCQ = {
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  topic: string;
  subtopic: string;
  Option1: string;
  Option2: string;
  Option3: string;
  Option4: string;
  CorrectOption: 1 | 2 | 3 | 4;
  iscodesnippet: boolean;
  codesnippet: string | null;
  snippetLang: string | null;
};

const questions: CodeQ[] = [
  // ===== EASY BASIC (6) =====
  {
    title: "Thread Sum of Squares Split",
    description:
      "Read an integer n. Create two threads that split the range 1..n into two halves. Each thread computes the sum of squares of its half, then both threads return their partial results. Print the total.\n\nInput Format:\nLine 1: integer n.\n\nOutput Format:\nThe integer sum of squares from 1 to n.\n\nConstraints:\n1 <= n <= 1000.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Creating Threads",
    sampleinput1: "4",
    sampleoutput1: "30",
    sampleinput2: "10",
    sampleoutput2: "385",
    input1: "6",
    output1: "91",
    input2: "3",
    output2: "14",
    input3: "5",
    output3: "55",
    inputconstrains: "1 <= n <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = gets.to_i
half = (n + 1) / 2
t1 = Thread.new do
  s = 0
  (1..half).each { |x| s += x * x }
  s
end
t2 = Thread.new do
  s = 0
  ((half + 1)..n).each { |x| s += x * x }
  s
end
puts t1.value + t2.value
`,
  },
  {
    title: "Thread Value Join Return",
    description:
      "Read two integers a and b. Spawn a single thread that computes a + b and returns it. Wait for the thread to finish, then print the value returned by the thread block.\n\nInput Format:\nLine 1: integer a. Line 2: integer b.\n\nOutput Format:\nThe integer sum a + b.\n\nConstraints:\n-1000 <= a, b <= 1000.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Thread Joining and Lifecycle",
    sampleinput1: "3\n4",
    sampleoutput1: "7",
    sampleinput2: "10\n20",
    sampleoutput2: "30",
    input1: "0\n0",
    output1: "0",
    input2: "-5\n5",
    output2: "0",
    input3: "100\n200",
    output3: "300",
    inputconstrains: "-1000 <= a, b <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `a = gets.to_i
b = gets.to_i
t = Thread.new { a + b }
t.join
puts t.value
`,
  },
  {
    title: "Mutex Shared Counter Increment",
    description:
      "Read an integer n. Create n threads; each thread increments a shared counter by 1 exactly once under a mutex. Join all threads, then print the final counter value.\n\nInput Format:\nLine 1: integer n (number of threads).\n\nOutput Format:\nThe final counter value (equals n).\n\nConstraints:\n0 <= n <= 1000.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Mutex and Synchronization",
    sampleinput1: "5",
    sampleoutput1: "5",
    sampleinput2: "3",
    sampleoutput2: "3",
    input1: "10",
    output1: "10",
    input2: "0",
    output2: "0",
    input3: "1",
    output3: "1",
    inputconstrains: "0 <= n <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = gets.to_i
m = Mutex.new
c = 0
threads = n.times.map do
  Thread.new do
    m.synchronize { c += 1 }
  end
end
threads.each(&:join)
puts c
`,
  },
  {
    title: "Queue Producer Consumer Sum",
    description:
      "Read an integer n. Spawn a producer thread that pushes the numbers 1 through n into a Queue, then pushes nil as a sentinel. Spawn a consumer thread that pops items, summing them until nil. Join both threads, then print the sum.\n\nInput Format:\nLine 1: integer n.\n\nOutput Format:\nThe sum 1 + 2 + ... + n.\n\nConstraints:\n1 <= n <= 1000.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Queue for Thread Communication",
    sampleinput1: "5",
    sampleoutput1: "15",
    sampleinput2: "10",
    sampleoutput2: "55",
    input1: "1",
    output1: "1",
    input2: "3",
    output2: "6",
    input3: "8",
    output3: "36",
    inputconstrains: "1 <= n <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = gets.to_i
q = Queue.new
total = 0
mutex = Mutex.new
producer = Thread.new do
  (1..n).each { |i| q.push(i) }
  q.push(nil)
end
consumer = Thread.new do
  loop do
    v = q.pop
    break if v.nil?
    mutex.synchronize { total += v }
  end
end
producer.join
consumer.join
puts total
`,
  },
  {
    title: "Fiber Number Generator",
    description:
      "Read an integer n. Use a Fiber that yields the integers 1, 2, ..., n one at a time. Resume the fiber repeatedly and print each yielded value on its own line.\n\nInput Format:\nLine 1: integer n.\n\nOutput Format:\nn lines, each containing one integer from 1 to n.\n\nConstraints:\n1 <= n <= 1000.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Fibers",
    sampleinput1: "3",
    sampleoutput1: "1\n2\n3",
    sampleinput2: "5",
    sampleoutput2: "1\n2\n3\n4\n5",
    input1: "1",
    output1: "1",
    input2: "2",
    output2: "1\n2",
    input3: "4",
    output3: "1\n2\n3\n4",
    inputconstrains: "1 <= n <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = gets.to_i
f = Fiber.new do
  i = 1
  while i <= n
    Fiber.yield i
    i += 1
  end
end
loop do
  v = f.resume
  break if v.nil?
  puts v
end
`,
  },
  {
    title: "Thread Lifecycle Three Returns",
    description:
      "Read three integers a, b, c. Spawn three threads, each returning the square of its input. Join all three threads, then print their returned values, one per line in the original order.\n\nInput Format:\nLine 1: three space-separated integers a b c.\n\nOutput Format:\nThree lines: a*a, b*b, c*c.\n\nConstraints:\n1 <= a, b, c <= 100.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Thread Joining and Lifecycle",
    sampleinput1: "2 3 4",
    sampleoutput1: "4\n9\n16",
    sampleinput2: "1 5 10",
    sampleoutput2: "1\n25\n100",
    input1: "0 0 0",
    output1: "0\n0\n0",
    input2: "7 8 9",
    output2: "49\n64\n81",
    input3: "3 1 2",
    output3: "9\n1\n4",
    inputconstrains: "0 <= a, b, c <= 100",
    blacklist: "",
    whitelist: "",
    sourcecode: `a, b, c = gets.split.map(&:to_i)
t1 = Thread.new { a * a }
t2 = Thread.new { b * b }
t3 = Thread.new { c * c }
t1.join
t2.join
t3.join
puts t1.value
puts t2.value
puts t3.value
`,
  },
  // ===== EASY SCENARIO (4) =====
  {
    title: "Warehouse Pallet Counter",
    description:
      "A warehouse has two workers tallying pallet IDs. Worker A handles pallets 1..k and worker B handles pallets k+1..n, where k = (n+1)/2. Each worker sums their assigned pallet IDs and adds the result to a shared total under a mutex. Join both workers, then print the total pallet count.\n\nInput Format:\nLine 1: integer n (total pallets).\n\nOutput Format:\nThe sum 1 + 2 + ... + n.\n\nConstraints:\n1 <= n <= 1000.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Creating Threads",
    sampleinput1: "4",
    sampleoutput1: "10",
    sampleinput2: "6",
    sampleoutput2: "21",
    input1: "10",
    output1: "55",
    input2: "2",
    output2: "3",
    input3: "8",
    output3: "36",
    inputconstrains: "1 <= n <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = gets.to_i
half = (n + 1) / 2
total = 0
mutex = Mutex.new
t1 = Thread.new do
  s = 0
  (1..half).each { |x| s += x }
  mutex.synchronize { total += s }
end
t2 = Thread.new do
  s = 0
  ((half + 1)..n).each { |x| s += x }
  mutex.synchronize { total += s }
end
t1.join
t2.join
puts total
`,
  },
  {
    title: "Bank Account Mutex Deposit",
    description:
      "A bank account starts with balance 0. Read deposit amount d and teller count t. Spawn t threads; each teller deposits d into the shared balance under a mutex. Join all tellers, then print the final balance.\n\nInput Format:\nLine 1: integers d and t.\n\nOutput Format:\nThe final balance d * t.\n\nConstraints:\n1 <= d <= 1000; 1 <= t <= 100.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Mutex and Synchronization",
    sampleinput1: "100 3",
    sampleoutput1: "300",
    sampleinput2: "50 5",
    sampleoutput2: "250",
    input1: "10 4",
    output1: "40",
    input2: "7 1",
    output2: "7",
    input3: "25 8",
    output3: "200",
    inputconstrains: "1 <= d <= 1000; 1 <= t <= 100",
    blacklist: "",
    whitelist: "",
    sourcecode: `d, t = gets.split.map(&:to_i)
balance = 0
mutex = Mutex.new
threads = t.times.map do
  Thread.new do
    mutex.synchronize { balance += d }
  end
end
threads.each(&:join)
puts balance
`,
  },
  {
    title: "Order Queue Consumer",
    description:
      "An order fulfillment pipeline receives n order amounts. A producer thread pushes each amount into a Queue, then a sentinel nil. A consumer thread pops amounts and sums them. Join both threads, then print the total order amount.\n\nInput Format:\nLine 1: integer n. Next n lines: one integer amount each.\n\nOutput Format:\nThe sum of the n amounts.\n\nConstraints:\n1 <= n <= 100; -1000 <= amount <= 1000.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Queue for Thread Communication",
    sampleinput1: "3\n10\n20\n30",
    sampleoutput1: "60",
    sampleinput2: "4\n5\n5\n5\n5",
    sampleoutput2: "20",
    input1: "1\n100",
    output1: "100",
    input2: "2\n7\n8",
    output2: "15",
    input3: "5\n1\n2\n3\n4\n5",
    output3: "15",
    inputconstrains: "1 <= n <= 100; -1000 <= amount <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = gets.to_i
values = []
n.times { values << gets.to_i }
q = Queue.new
total = 0
mutex = Mutex.new
producer = Thread.new do
  values.each { |v| q.push(v) }
  q.push(nil)
end
consumer = Thread.new do
  loop do
    v = q.pop
    break if v.nil?
    mutex.synchronize { total += v }
  end
end
producer.join
consumer.join
puts total
`,
  },
  {
    title: "Fiber Even Number Stream",
    description:
      "A monitoring dashboard streams even numbers from 2 up to n. Use a Fiber that yields each even value (2, 4, 6, ...) up to and including n. Resume repeatedly and print each yielded value on its own line.\n\nInput Format:\nLine 1: integer n (even, >= 2).\n\nOutput Format:\nOne even number per line from 2 up to n.\n\nConstraints:\n2 <= n <= 1000; n is even.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Fibers",
    sampleinput1: "6",
    sampleoutput1: "2\n4\n6",
    sampleinput2: "10",
    sampleoutput2: "2\n4\n6\n8\n10",
    input1: "2",
    output1: "2",
    input2: "4",
    output2: "2\n4",
    input3: "8",
    output3: "2\n4\n6\n8",
    inputconstrains: "2 <= n <= 1000; n is even",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = gets.to_i
f = Fiber.new do
  i = 2
  while i <= n
    Fiber.yield i
    i += 2
  end
end
loop do
  v = f.resume
  break if v.nil?
  puts v
end
`,
  },
  // ===== MEDIUM SCENARIO (6) =====
  {
    title: "Parallel Image Pixel Sum",
    description:
      "An image is a matrix of r rows and c columns of pixel intensities. Split the rows in half: thread A handles rows 0..k-1, thread B handles rows k..r-1, where k = (r+1)/2. Each thread sums all pixels in its rows and adds the partial sum to a shared total under a mutex. Join both threads, then print the total pixel sum.\n\nInput Format:\nLine 1: r and c. Next r lines: c space-separated integers each.\n\nOutput Format:\nThe sum of all pixel values.\n\nConstraints:\n1 <= r, c <= 100; 0 <= pixel <= 1000.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Creating Threads",
    sampleinput1: "2 3\n1 2 3\n4 5 6",
    sampleoutput1: "21",
    sampleinput2: "3 2\n1 1\n2 2\n3 3",
    sampleoutput2: "12",
    input1: "1 1\n5",
    output1: "5",
    input2: "4 2\n1 2\n3 4\n5 6\n7 8",
    output2: "36",
    input3: "2 2\n10 20\n30 40",
    output3: "100",
    inputconstrains: "1 <= r, c <= 100; 0 <= pixel <= 1000",
    blacklist: "sum, inject, reduce",
    whitelist: "Thread.new, .join, each",
    sourcecode: `r, c = gets.split.map(&:to_i)
matrix = []
r.times { matrix << gets.split.map(&:to_i) }
half = (r + 1) / 2
total = 0
mutex = Mutex.new
t1 = Thread.new do
  s = 0
  (0...half).each do |i|
    matrix[i].each { |v| s += v }
  end
  mutex.synchronize { total += s }
end
t2 = Thread.new do
  s = 0
  (half...r).each do |i|
    matrix[i].each { |v| s += v }
  end
  mutex.synchronize { total += s }
end
t1.join
t2.join
puts total
`,
  },
  {
    title: "Concurrent Inventory Hash Merge",
    description:
      "An inventory snapshot lists n items as 'name qty' pairs. Two clerks split the list in half; each builds a partial hash of name to qty, then merges their hash into a shared result hash under a mutex. Names are unique. Join both clerks, then print 'name qty' lines sorted by name.\n\nInput Format:\nLine 1: integer n. Next n lines: name and qty space-separated.\n\nOutput Format:\nn lines sorted by name, each 'name qty'.\n\nConstraints:\n1 <= n <= 100; names are unique lowercase strings; 1 <= qty <= 1000.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Mutex and Synchronization",
    sampleinput1: "3\napple 5\nbanana 3\ncherry 7",
    sampleoutput1: "apple 5\nbanana 3\ncherry 7",
    sampleinput2: "4\ndelta 1\nalpha 2\ncharlie 3\nbravo 4",
    sampleoutput2: "alpha 2\nbravo 4\ncharlie 3\ndelta 1",
    input1: "2\nzebra 10\napple 5",
    output1: "apple 5\nzebra 10",
    input2: "1\nonly 99",
    output2: "only 99",
    input3: "5\nb 2\na 1\nd 4\nc 3\ne 5",
    output3: "a 1\nb 2\nc 3\nd 4\ne 5",
    inputconstrains: "1 <= n <= 100; names unique; 1 <= qty <= 1000",
    blacklist: "sum, inject",
    whitelist: "Thread.new, Mutex.new, .synchronize",
    sourcecode: `n = gets.to_i
items = []
n.times do
  name, qty = gets.split
  items << [name, qty.to_i]
end
half = (n + 1) / 2
result = {}
mutex = Mutex.new
t1 = Thread.new do
  partial = {}
  (0...half).each do |i|
    name, qty = items[i]
    partial[name] = qty
  end
  mutex.synchronize { partial.each { |k, v| result[k] = v } }
end
t2 = Thread.new do
  partial = {}
  (half...n).each do |i|
    name, qty = items[i]
    partial[name] = qty
  end
  mutex.synchronize { partial.each { |k, v| result[k] = v } }
end
t1.join
t2.join
keys = result.keys.sort
keys.each { |k| puts "#{k} #{result[k]}" }
`,
  },
  {
    title: "Producer Consumer Even Sum Queue",
    description:
      "A sensor pipeline reads n integer readings. A producer thread pushes each reading into a Queue, then a sentinel nil. A consumer thread pops readings and adds only the even ones to a shared total under a mutex. Join both threads, then print the total of even readings.\n\nInput Format:\nLine 1: integer n. Next n lines: one integer reading each.\n\nOutput Format:\nThe sum of even-valued readings.\n\nConstraints:\n1 <= n <= 100; -1000 <= reading <= 1000.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Queue for Thread Communication",
    sampleinput1: "5\n1\n2\n3\n4\n5",
    sampleoutput1: "6",
    sampleinput2: "4\n2\n4\n6\n8",
    sampleoutput2: "20",
    input1: "3\n1\n3\n5",
    output1: "0",
    input2: "2\n10\n20",
    output2: "30",
    input3: "6\n1\n2\n3\n4\n5\n6",
    output3: "12",
    inputconstrains: "1 <= n <= 100; -1000 <= reading <= 1000",
    blacklist: "select, reject, filter",
    whitelist: "Queue.new, .push, .pop, Thread.new",
    sourcecode: `n = gets.to_i
values = []
n.times { values << gets.to_i }
q = Queue.new
total = 0
mutex = Mutex.new
producer = Thread.new do
  values.each { |v| q.push(v) }
  q.push(nil)
end
consumer = Thread.new do
  loop do
    v = q.pop
    break if v.nil?
    if v % 2 == 0
      mutex.synchronize { total += v }
    end
  end
end
producer.join
consumer.join
puts total
`,
  },
  {
    title: "Fiber Fibonacci Stream",
    description:
      "A trading feed generates the first n Fibonacci numbers (1, 1, 2, 3, 5, ...). Use a Fiber that yields each Fibonacci number until n have been yielded. Resume the fiber n times and print each value on its own line.\n\nInput Format:\nLine 1: integer n.\n\nOutput Format:\nn lines, each containing one Fibonacci number starting from 1.\n\nConstraints:\n1 <= n <= 50.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Fibers",
    sampleinput1: "5",
    sampleoutput1: "1\n1\n2\n3\n5",
    sampleinput2: "8",
    sampleoutput2: "1\n1\n2\n3\n5\n8\n13\n21",
    input1: "1",
    output1: "1",
    input2: "2",
    output2: "1\n1",
    input3: "6",
    output3: "1\n1\n2\n3\n5\n8",
    inputconstrains: "1 <= n <= 50",
    blacklist: "inject, reduce",
    whitelist: "Fiber.new, Fiber.yield, .resume",
    sourcecode: `n = gets.to_i
f = Fiber.new do
  a, b = 1, 1
  count = 0
  while count < n
    Fiber.yield a
    a, b = b, a + b
    count += 1
  end
end
loop do
  v = f.resume
  break if v.nil?
  puts v
end
`,
  },
  {
    title: "Parallel Matrix Row Maximums",
    description:
      "A grid of sensor readings has r rows and c columns. Split rows in half: thread A scans rows 0..k-1, thread B scans rows k..r-1, where k = (r+1)/2. Each thread tracks the largest value in its rows and updates the global max under a mutex. Join both threads, then print the overall maximum.\n\nInput Format:\nLine 1: r and c. Next r lines: c space-separated integers each.\n\nOutput Format:\nThe maximum value in the grid.\n\nConstraints:\n1 <= r, c <= 100; 0 <= value <= 1000.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Thread Joining and Lifecycle",
    sampleinput1: "2 3\n1 5 3\n7 2 9",
    sampleoutput1: "9",
    sampleinput2: "3 2\n3 4\n8 1\n5 6",
    sampleoutput2: "8",
    input1: "1 1\n5",
    output1: "5",
    input2: "2 2\n0 0\n0 0",
    output2: "0",
    input3: "4 2\n9 8\n7 6\n5 4\n3 2",
    output3: "9",
    inputconstrains: "1 <= r, c <= 100; 0 <= value <= 1000",
    blacklist: ".max, .min, max(, min(",
    whitelist: "Thread.new, .join, each",
    sourcecode: `r, c = gets.split.map(&:to_i)
matrix = []
r.times { matrix << gets.split.map(&:to_i) }
half = (r + 1) / 2
max_val = -1
mutex = Mutex.new
t1 = Thread.new do
  m = -1
  (0...half).each do |i|
    matrix[i].each { |v| m = v if v > m }
  end
  mutex.synchronize { max_val = m if m > max_val }
end
t2 = Thread.new do
  m = -1
  (half...r).each do |i|
    matrix[i].each { |v| m = v if v > m }
  end
  mutex.synchronize { max_val = m if m > max_val }
end
t1.join
t2.join
puts max_val
`,
  },
  {
    title: "Thread Pool Word Counter",
    description:
      "A document archive contains n lines of text. Two indexer threads split the lines in half; each counts space-separated words in its slice and adds the count to a shared total under a mutex. Join both threads, then print the total word count.\n\nInput Format:\nLine 1: integer n. Next n lines: arbitrary text (no leading/trailing spaces).\n\nOutput Format:\nThe total number of space-separated words across all lines.\n\nConstraints:\n1 <= n <= 100; each line has length 1..200.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Mutex and Synchronization",
    sampleinput1: "3\nhello world\nfoo bar\nbaz",
    sampleoutput1: "5",
    sampleinput2: "2\none two three\nfour five",
    sampleoutput2: "5",
    input1: "1\nsingle",
    output1: "1",
    input2: "4\nalpha beta\ngamma\ndelta epsilon zeta\neta",
    output2: "7",
    input3: "2\nword\nanother",
    output3: "2",
    inputconstrains: "1 <= n <= 100; line length 1..200",
    blacklist: "inject, sum, count",
    whitelist: "Thread.new, Mutex.new, .synchronize",
    sourcecode: `n = gets.to_i
lines = []
n.times { lines << gets.chomp }
half = (n + 1) / 2
total = 0
mutex = Mutex.new
t1 = Thread.new do
  cnt = 0
  (0...half).each do |i|
    parts = lines[i].split
    parts.each { cnt += 1 }
  end
  mutex.synchronize { total += cnt }
end
t2 = Thread.new do
  cnt = 0
  (half...n).each do |i|
    parts = lines[i].split
    parts.each { cnt += 1 }
  end
  mutex.synchronize { total += cnt }
end
t1.join
t2.join
puts total
`,
  },
  // ===== HARD SCENARIO (4) =====
  {
    title: "Multi-Producer Multi-Consumer Pipeline",
    description:
      "A batch processor receives n task values. Spawn two producer threads that each push half of the values into a shared Queue, followed by a nil sentinel each. Spawn two consumer threads that pop values, square them, and add to a shared total under a mutex. Join all four threads, then print the total of squared values.\n\nInput Format:\nLine 1: integer n. Next n lines: one integer value each.\n\nOutput Format:\nThe sum of squares of the n values.\n\nConstraints:\n1 <= n <= 100; -1000 <= value <= 1000.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Queue for Thread Communication",
    sampleinput1: "4\n1\n2\n3\n4",
    sampleoutput1: "30",
    sampleinput2: "3\n2\n3\n4",
    sampleoutput2: "29",
    input1: "2\n5\n5",
    output1: "50",
    input2: "5\n1\n2\n3\n4\n5",
    output2: "55",
    input3: "6\n0\n1\n2\n3\n4\n5",
    output3: "55",
    inputconstrains: "1 <= n <= 100; -1000 <= value <= 1000",
    blacklist: "sum, inject, reduce, each_with_object",
    whitelist: "Queue.new, Thread.new, Mutex.new, .synchronize",
    sourcecode: `n = gets.to_i
values = []
n.times { values << gets.to_i }
half = (n + 1) / 2
q = Queue.new
total = 0
mutex = Mutex.new
p1 = Thread.new do
  (0...half).each { |i| q.push(values[i]) }
  q.push(nil)
end
p2 = Thread.new do
  (half...n).each { |i| q.push(values[i]) }
  q.push(nil)
end
c1 = Thread.new do
  loop do
    v = q.pop
    break if v.nil?
    mutex.synchronize { total += v * v }
  end
end
c2 = Thread.new do
  loop do
    v = q.pop
    break if v.nil?
    mutex.synchronize { total += v * v }
  end
end
p1.join
p2.join
c1.join
c2.join
puts total
`,
  },
  {
    title: "Parallel Prime Range Counter",
    description:
      "Count the prime numbers in the inclusive range [lo, hi]. Split the range in half at mid = (lo+hi)/2. Thread A checks lo..mid, thread B checks mid+1..hi. Each thread counts primes in its slice using trial division and adds to a shared total under a mutex. Join both threads, then print the total prime count.\n\nInput Format:\nLine 1: integers lo and hi.\n\nOutput Format:\nThe number of primes in [lo, hi].\n\nConstraints:\n1 <= lo <= hi <= 10000.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Creating Threads",
    sampleinput1: "2 10",
    sampleoutput1: "4",
    sampleinput2: "10 20",
    sampleoutput2: "4",
    input1: "2 30",
    output1: "10",
    input2: "1 10",
    output2: "4",
    input3: "20 30",
    output3: "2",
    inputconstrains: "1 <= lo <= hi <= 10000",
    blacklist: "Prime, require, select, filter",
    whitelist: "Thread.new, .join, each",
    sourcecode: `lo, hi = gets.split.map(&:to_i)
mid = (lo + hi) / 2
total = 0
mutex = Mutex.new
is_prime = ->(x) {
  return false if x < 2
  i = 2
  while i * i <= x
    return false if x % i == 0
    i += 1
  end
  true
}
t1 = Thread.new do
  cnt = 0
  (lo..mid).each { |x| cnt += 1 if is_prime.call(x) }
  mutex.synchronize { total += cnt }
end
t2 = Thread.new do
  cnt = 0
  ((mid + 1)..hi).each { |x| cnt += 1 if is_prime.call(x) }
  mutex.synchronize { total += cnt }
end
t1.join
t2.join
puts total
`,
  },
  {
    title: "Fiber Collatz Sequence Generator",
    description:
      "Read a positive integer n. Use a Fiber that yields successive values of the Collatz sequence starting from n: if x is even, next is x/2; if odd (and > 1), next is 3*x+1; stops at 1. Resume the fiber repeatedly and print each yielded value on its own line.\n\nInput Format:\nLine 1: integer n.\n\nOutput Format:\nOne value per line, the full Collatz sequence from n down to 1.\n\nConstraints:\n1 <= n <= 10000.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Fibers",
    sampleinput1: "6",
    sampleoutput1: "6\n3\n10\n5\n16\n8\n4\n2\n1",
    sampleinput2: "1",
    sampleoutput2: "1",
    input1: "10",
    output1: "10\n5\n16\n8\n4\n2\n1",
    input2: "3",
    output2: "3\n10\n5\n16\n8\n4\n2\n1",
    input3: "7",
    output3: "7\n22\n11\n34\n17\n52\n26\n13\n40\n20\n10\n5\n16\n8\n4\n2\n1",
    inputconstrains: "1 <= n <= 10000",
    blacklist: "Enumerator, lazy, to_a",
    whitelist: "Fiber.new, Fiber.yield, .resume",
    sourcecode: `n = gets.to_i
f = Fiber.new do
  x = n
  loop do
    Fiber.yield x
    break if x == 1
    x = x.even? ? x / 2 : 3 * x + 1
  end
end
loop do
  v = f.resume
  break if v.nil?
  puts v
end
`,
  },
  {
    title: "Concurrent Bank Account Ledger",
    description:
      "A bank account starts with balance 100. Read n transactions, each 'deposit X' or 'withdraw X'. Two teller threads split the transaction list in half; each computes its net change (deposits positive, withdrawals negative) and applies it to the shared balance under a mutex. Join both threads, then print the final balance.\n\nInput Format:\nLine 1: integer n. Next n lines: 'deposit X' or 'withdraw X'.\n\nOutput Format:\nThe final balance after all transactions.\n\nConstraints:\n1 <= n <= 100; 1 <= X <= 1000.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Mutex and Synchronization",
    sampleinput1: "3\ndeposit 50\nwithdraw 30\ndeposit 20",
    sampleoutput1: "140",
    sampleinput2: "4\nwithdraw 10\ndeposit 50\nwithdraw 5\ndeposit 100",
    sampleoutput2: "235",
    input1: "2\nwithdraw 50\ndeposit 50",
    output1: "100",
    input2: "1\ndeposit 25",
    output2: "125",
    input3: "5\ndeposit 100\nwithdraw 50\ndeposit 100\nwithdraw 25\ndeposit 50",
    output3: "275",
    inputconstrains: "1 <= n <= 100; 1 <= X <= 1000",
    blacklist: "eval, send, instance_eval",
    whitelist: "Thread.new, Mutex.new, .synchronize",
    sourcecode: `n = gets.to_i
txns = []
n.times { txns << gets.chomp.split }
balance = 100
mutex = Mutex.new
half = (n + 1) / 2
t1 = Thread.new do
  bal = 0
  (0...half).each do |i|
    op, amt = txns[i][0], txns[i][1].to_i
    bal += amt if op == "deposit"
    bal -= amt if op == "withdraw"
  end
  mutex.synchronize { balance += bal }
end
t2 = Thread.new do
  bal = 0
  (half...n).each do |i|
    op, amt = txns[i][0], txns[i][1].to_i
    bal += amt if op == "deposit"
    bal -= amt if op == "withdraw"
  end
  mutex.synchronize { balance += bal }
end
t1.join
t2.join
puts balance
`,
  },
];

const mcqs: MCQ[] = [
  // ===== EASY (10) =====
  {
    title: "Thread.new Constructor",
    description:
      "Which Ruby method creates and starts a new thread of execution?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Creating Threads",
    Option1: "Thread.start",
    Option2: "Thread.new",
    Option3: "Thread.create",
    Option4: "Thread.spawn",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Thread.join Behavior",
    description:
      "What does calling `thread.join` on a Ruby Thread do?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Thread Joining and Lifecycle",
    Option1: "Pauses the thread forever",
    Option2: "Kills the thread immediately",
    Option3: "Blocks the caller until the thread completes",
    Option4: "Restarts the thread from the top",
    CorrectOption: 3,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Thread.current Identifier",
    description:
      "Which expression returns the currently executing Thread object in Ruby?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Thread Joining and Lifecycle",
    Option1: "Thread.this",
    Option2: "Thread.self",
    Option3: "Thread.active",
    Option4: "Thread.current",
    CorrectOption: 4,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Mutex Purpose",
    description:
      "What problem does a Mutex solve in multithreaded Ruby code?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Mutex and Synchronization",
    Option1: "It serializes method calls between objects",
    Option2: "It enforces mutual exclusion to protect shared state from races",
    Option3: "It speeds up sequential code by caching values",
    Option4: "It cancels long-running threads automatically",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Queue Pop Blocking",
    description:
      "What does Ruby's `Queue#pop` do when called on an empty queue (default non-blocking mode)?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Queue for Thread Communication",
    Option1: "Returns nil immediately",
    Option2: "Returns an empty array",
    Option3: "Blocks the calling thread until an item is available",
    Option4: "Raises IndexError",
    CorrectOption: 3,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Fiber Resume Method",
    description:
      "Which method resumes (or starts) a paused Ruby Fiber?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Fibers",
    Option1: "fiber.start",
    Option2: "fiber.run",
    Option3: "fiber.resume",
    Option4: "fiber.next",
    CorrectOption: 3,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Thread Value Print",
    description:
      "What does the following code print?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Thread Joining and Lifecycle",
    Option1: "3",
    Option2: "nil",
    Option3: "5",
    Option4: "1",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `t = Thread.new { 1 + 2 }
puts t.value
`,
    snippetLang: "ruby",
  },
  {
    title: "Main Thread Access",
    description:
      "How do you obtain a reference to the main thread in Ruby?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Thread Joining and Lifecycle",
    Option1: "Thread.root",
    Option2: "Thread.main",
    Option3: "Thread.parent",
    Option4: "Thread.primary",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Mutex Synchronize Output",
    description:
      "What does the following code print?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Mutex and Synchronization",
    Option1: "locked",
    Option2: "unlocked",
    Option3: "true",
    Option4: "Raises ThreadError",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `m = Mutex.new
m.synchronize { puts "locked" }
`,
    snippetLang: "ruby",
  },
  {
    title: "Unjoined Thread Exception",
    description:
      "By default in Ruby, what happens if a thread raises an unhandled exception and is never joined?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Thread Joining and Lifecycle",
    Option1: "The exception is silently swallowed",
    Option2: "The exception is propagated when the thread is joined or via Thread.report_on_exception",
    Option3: "The main thread dies immediately",
    Option4: "The thread restarts automatically",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  // ===== MEDIUM (6) =====
  {
    title: "Thread Value After Join",
    description:
      "What does the following code print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Thread Joining and Lifecycle",
    Option1: "nil",
    Option2: "10",
    Option3: "5",
    Option4: "2",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `t = Thread.new { 5 * 2 }
t.join
puts t.value
`,
    snippetLang: "ruby",
  },
  {
    title: "Mutex Counter Result",
    description:
      "What does the following code print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Mutex and Synchronization",
    Option1: "3",
    Option2: "1",
    Option3: "0",
    Option4: "Race condition error",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `m = Mutex.new
c = 0
ts = 3.times.map do
  Thread.new do
    m.synchronize { c += 1 }
  end
end
ts.each(&:join)
puts c
`,
    snippetLang: "ruby",
  },
  {
    title: "Queue Producer Consumer Sum",
    description:
      "What does the following code print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Queue for Thread Communication",
    Option1: "0",
    Option2: "3",
    Option3: "6",
    Option4: "123",
    CorrectOption: 3,
    iscodesnippet: true,
    codesnippet: `q = Queue.new
prod = Thread.new { [1, 2, 3].each { |x| q.push(x) }; q.push(nil) }
cons = Thread.new do
  s = 0
  while (v = q.pop); s += v; end
  s
end
prod.join
puts cons.value
`,
    snippetLang: "ruby",
  },
  {
    title: "Fiber Yield Three Values",
    description:
      "What does the following code print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Fibers",
    Option1: "1\n2\n3",
    Option2: "3\n2\n1",
    Option3: "1\n2",
    Option4: "1",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `f = Fiber.new do
  Fiber.yield 1
  Fiber.yield 2
  3
end
puts f.resume
puts f.resume
puts f.resume
`,
    snippetLang: "ruby",
  },
  {
    title: "Thread Status After Join",
    description:
      "What does the following code print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Thread Joining and Lifecycle",
    Option1: "run",
    Option2: "sleep",
    Option3: "false",
    Option4: "true",
    CorrectOption: 3,
    iscodesnippet: true,
    codesnippet: `t = Thread.new { sleep 0.01 }
t.join
puts t.status
`,
    snippetLang: "ruby",
  },
  {
    title: "Fiber Cooperative Scheduling",
    description:
      "Which statement correctly contrasts Ruby Fibers with Threads?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Fibers",
    Option1: "Fibers are scheduled preemptively by the runtime; threads are cooperative",
    Option2: "Fibers are cooperative (must explicitly yield/resume); threads are scheduled by the Ruby runtime",
    Option3: "Fibers and threads are identical in scheduling behavior",
    Option4: "Threads cannot share memory but fibers can",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  // ===== HARD (4) =====
  {
    title: "Fiber Final Return Value",
    description:
      "What does the following code print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Fibers",
    Option1: "1,2,3,3",
    Option2: "1,2,3,nil",
    Option3: "1,2,3",
    Option4: "Raises FiberError on the fourth resume",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `f = Fiber.new do
  x = 0
  3.times { x += 1; Fiber.yield x }
  x
end
a = []
a << f.resume
a << f.resume
a << f.resume
a << f.resume
puts a.join(",")
`,
    snippetLang: "ruby",
  },
  {
    title: "Thread Raise Exception",
    description:
      "What does the following code print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Thread Joining and Lifecycle",
    Option1: "sleep",
    Option2: "boom",
    Option3: "nil",
    Option4: "RuntimeError",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `t = Thread.new { sleep 1 }
t.raise("boom")
begin
  t.join
rescue => e
  puts e.message
end
`,
    snippetLang: "ruby",
  },
  {
    title: "Queue Nonblocking Pop Empty",
    description:
      "What does the following code print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Queue for Thread Communication",
    Option1: "empty",
    Option2: "nil",
    Option3: "0",
    Option4: "Raises uncaught ThreadError",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `q = Queue.new
begin
  q.pop(true)
rescue ThreadError
  puts "empty"
end
`,
    snippetLang: "ruby",
  },
  {
    title: "Fiber Fibonacci Stream",
    description:
      "What does the following code print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Fibers",
    Option1: "1,1,2,3,5",
    Option2: "1,2,3,5,8",
    Option3: "1,1,2,3,5,8",
    Option4: "0,1,1,2,3",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `fib = Fiber.new do
  a, b = 1, 1
  loop do
    Fiber.yield a
    a, b = b, a + b
  end
end
puts (1..5).map { fib.resume }.join(",")
`,
    snippetLang: "ruby",
  },
];

const d = String(DAY).padStart(2, "0");
writeFileSync(
  `scripts/ruby-programming/data/day-${d}.code.json`,
  JSON.stringify({ day: DAY, topics: [{ name: TOPIC, subtopics: SUBTOPICS }], questions }, null, 2),
);
writeFileSync(
  `scripts/ruby-programming/data/day-${d}.mcq.json`,
  JSON.stringify({ day: DAY, questions: mcqs }, null, 2),
);
console.log("wrote day", DAY);
