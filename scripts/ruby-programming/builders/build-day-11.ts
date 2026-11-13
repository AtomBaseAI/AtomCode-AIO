import { writeFileSync } from "node:fs";

const DAY = 11;
const TOPIC = "Blocks Procs and Lambdas";
const SUBTOPICS = [
  "Block Syntax do end and Braces",
  "yield and block_given",
  "Procs",
  "Lambdas",
  "Ampersand Block Parameter",
  "Closures and Variable Capture",
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
    title: "Block Doubler With Yield",
    description:
      "Write a method `double_each` that takes an array of integers and uses `yield` to emit each doubled value.\n\nInput Format:\nA single line of space-separated integers.\n\nOutput Format:\nOne line of space-separated doubled integers.\n\nConstraints:\n1 <= n <= 1000, each integer between -1000 and 1000.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "yield and block_given",
    sampleinput1: "1 2 3 4",
    sampleoutput1: "2 4 6 8",
    sampleinput2: "10 20 30",
    sampleoutput2: "20 40 60",
    input1: "5 5 5",
    output1: "10 10 10",
    input2: "0 -1 -2",
    output2: "0 -2 -4",
    input3: "100",
    output3: "200",
    inputconstrains: "1 <= n <= 1000; -1000 <= v <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `def double_each(arr)
  i = 0
  while i < arr.size
    yield arr[i] * 2
    i += 1
  end
end

arr = gets.split.map(&:to_i)
result = []
double_each(arr) { |x| result << x }
puts result.join(" ")
`,
  },
  {
    title: "ForEach Block Printer do-end",
    description:
      "Read a line of space-separated names and greet each using a `do...end` block on `each`.\n\nInput Format:\nOne line of space-separated names.\n\nOutput Format:\nOne line per name in the form `Hello, NAME`.\n\nConstraints:\n1 <= number of names <= 50; each name length between 1 and 20.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Block Syntax do end and Braces",
    sampleinput1: "Ada Bob Cy",
    sampleoutput1: "Hello, Ada\nHello, Bob\nHello, Cy",
    sampleinput2: "Mira Tia",
    sampleoutput2: "Hello, Mira\nHello, Tia",
    input1: "Zoe",
    output1: "Hello, Zoe",
    input2: "Al Bo Cy Di",
    output2: "Hello, Al\nHello, Bo\nHello, Cy\nHello, Di",
    input3: "x y",
    output3: "Hello, x\nHello, y",
    inputconstrains: "1 <= number of names <= 50",
    blacklist: "",
    whitelist: "",
    sourcecode: `names = gets.chomp.split
names.each do |name|
  puts "Hello, #{name}"
end
`,
  },
  {
    title: "Greet If Block Given",
    description:
      "Define a method `greet(name)` that checks `block_given?`. If a block is supplied, yield the name to it; otherwise print `Hi there`.\n\nInput Format:\nLine 1: a name. Line 2: a flag (1 = use block, 0 = no block).\n\nOutput Format:\nEither `Hi NAME` or `Hi there`.\n\nConstraints:\nName length 1..30; flag is 0 or 1.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "yield and block_given",
    sampleinput1: "Alice\n1",
    sampleoutput1: "Hi Alice",
    sampleinput2: "Bob\n0",
    sampleoutput2: "Hi there",
    input1: "Cy\n1",
    output1: "Hi Cy",
    input2: "Nobody\n0",
    output2: "Hi there",
    input3: "Dora\n1",
    output3: "Hi Dora",
    inputconstrains: "Flag is 0 or 1; name length 1..30",
    blacklist: "",
    whitelist: "",
    sourcecode: `def greet(name)
  if block_given?
    yield name
  else
    puts "Hi there"
  end
end

name = gets.chomp
flag = gets.to_i
if flag == 1
  greet(name) { |n| puts "Hi #{n}" }
else
  greet(name)
end
`,
  },
  {
    title: "Proc Square Mapper",
    description:
      "Create a `Proc` that squares its argument, then apply it to each integer read from stdin.\n\nInput Format:\nOne line of space-separated integers.\n\nOutput Format:\nOne line of space-separated squared integers.\n\nConstraints:\n1 <= n <= 1000; -50 <= v <= 50.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Procs",
    sampleinput1: "1 2 3 4",
    sampleoutput1: "1 4 9 16",
    sampleinput2: "5 6",
    sampleoutput2: "25 36",
    input1: "10",
    output1: "100",
    input2: "-3 -2",
    output2: "9 4",
    input3: "0 7 1",
    output3: "0 49 1",
    inputconstrains: "1 <= n <= 1000; -50 <= v <= 50",
    blacklist: "",
    whitelist: "",
    sourcecode: `squarer = Proc.new { |x| x * x }
arr = gets.split.map(&:to_i)
result = arr.map(&squarer)
puts result.join(" ")
`,
  },
  {
    title: "Lambda Incrementer",
    description:
      "Define a lambda `inc` that adds 1 to its argument. Apply it to each integer read.\n\nInput Format:\nOne line of space-separated integers.\n\nOutput Format:\nOne line of space-separated incremented integers.\n\nConstraints:\n1 <= n <= 1000; -1000 <= v <= 1000.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Lambdas",
    sampleinput1: "1 2 3",
    sampleoutput1: "2 3 4",
    sampleinput2: "10 20",
    sampleoutput2: "11 21",
    input1: "0",
    output1: "1",
    input2: "-5 -1",
    output2: "-4 0",
    input3: "99 100 101",
    output3: "100 101 102",
    inputconstrains: "1 <= n <= 1000; -1000 <= v <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `inc = ->(x) { x + 1 }
arr = gets.split.map(&:to_i)
puts arr.map(&inc).join(" ")
`,
  },
  {
    title: "Ampersand Block Sum",
    description:
      "Write a method `accumulate(arr, &block)` that sums `block.call(x)` for each element. Pass an identity block to compute the array sum.\n\nInput Format:\nOne line of space-separated integers.\n\nOutput Format:\nA single integer: the sum.\n\nConstraints:\n1 <= n <= 1000; -10000 <= v <= 10000.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Ampersand Block Parameter",
    sampleinput1: "1 2 3 4 5",
    sampleoutput1: "15",
    sampleinput2: "10 20 30",
    sampleoutput2: "60",
    input1: "5 5 5",
    output1: "15",
    input2: "100",
    output2: "100",
    input3: "-1 1 0",
    output3: "0",
    inputconstrains: "1 <= n <= 1000; -10000 <= v <= 10000",
    blacklist: "",
    whitelist: "",
    sourcecode: `def accumulate(arr, &block)
  total = 0
  arr.each { |x| total += block.call(x) }
  total
end

arr = gets.split.map(&:to_i)
puts accumulate(arr) { |x| x }
`,
  },

  // ===== EASY SCENARIO (4) =====
  {
    title: "Store Tax Calculator Yield",
    description:
      "A corner store applies an 8% sales tax to every listed price. Use a method that yields each taxed price to a block that formats it.\n\nInput Format:\nOne line of space-separated float prices.\n\nOutput Format:\nOne line of space-separated taxed prices formatted to 2 decimals.\n\nConstraints:\n1 <= n <= 100; 0.0 <= price <= 10000.0.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "yield and block_given",
    sampleinput1: "100.00 50.00 25.00",
    sampleoutput1: "108.00 54.00 27.00",
    sampleinput2: "200.00",
    sampleoutput2: "216.00",
    input1: "1.00 2.00",
    output1: "1.08 2.16",
    input2: "9.99",
    output2: "10.79",
    input3: "10 20 30 40",
    output3: "10.80 21.60 32.40 43.20",
    inputconstrains: "1 <= n <= 100; 0.0 <= price <= 10000.0",
    blacklist: "",
    whitelist: "",
    sourcecode: `def apply_tax(prices, rate)
  prices.map { |p| yield p, rate }
end

prices = gets.split.map(&:to_f)
rate = 0.08
result = apply_tax(prices, rate) { |p, r| p * (1 + r) }
puts result.map { |v| "%.2f" % v }.join(" ")
`,
  },
  {
    title: "Inventory Tag With Do End Block",
    description:
      "A warehouse receives a list of new inventory items. Print each item with an incrementing tag id using a `do...end` block.\n\nInput Format:\nLine 1: integer n. Next n lines: item name.\n\nOutput Format:\nN lines, each `INDEX NAME` (1-based index).\n\nConstraints:\n1 <= n <= 100; name length 1..30.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Block Syntax do end and Braces",
    sampleinput1: "3\napple\nbanana\ncherry",
    sampleoutput1: "1 apple\n2 banana\n3 cherry",
    sampleinput2: "1\nwidget",
    sampleoutput2: "1 widget",
    input1: "2\nhammer\nscrew",
    output1: "1 hammer\n2 screw",
    input2: "4\na\nb\nc\nd",
    output2: "1 a\n2 b\n3 c\n4 d",
    input3: "1\nbox",
    output3: "1 box",
    inputconstrains: "1 <= n <= 100; name length 1..30",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = gets.to_i
items = []
n.times { items << gets.chomp }
items.each_with_index do |item, idx|
  puts "#{idx + 1} #{item}"
end
`,
  },
  {
    title: "Discount Proc Application",
    description:
      "A boutique runs a flash sale. Build a `Proc` that captures the discount percentage, then apply it to each listed price.\n\nInput Format:\nLine 1: space-separated float prices. Line 2: integer discount percent (0..100).\n\nOutput Format:\nOne line of space-separated discounted prices (2 decimals).\n\nConstraints:\n1 <= n <= 100; 0.0 <= price <= 10000.0; 0 <= pct <= 100.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Procs",
    sampleinput1: "100.00 50.00 25.00\n10",
    sampleoutput1: "90.00 45.00 22.50",
    sampleinput2: "200.00\n20",
    sampleoutput2: "160.00",
    input1: "20.00 10.00\n25",
    output1: "15.00 7.50",
    input2: "1000.00\n0",
    output2: "1000.00",
    input3: "1.00 2.00 3.00\n25",
    output3: "0.75 1.50 2.25",
    inputconstrains: "1 <= n <= 100; 0 <= pct <= 100",
    blacklist: "",
    whitelist: "",
    sourcecode: `prices = gets.split.map(&:to_f)
pct = gets.to_f
discount = Proc.new { |p| p * (1 - pct / 100.0) }
result = prices.map(&discount)
puts result.map { |v| "%.2f" % v }.join(" ")
`,
  },
  {
    title: "Greeting Lambda Closure",
    description:
      "A reception kiosk greets visitors by name N times. Build a `lambda` closure that captures the visitor's name and returns a numbered greeting per call.\n\nInput Format:\nLine 1: visitor name. Line 2: integer n.\n\nOutput Format:\nN lines of `Hello NAME i` where i goes 1..n.\n\nConstraints:\n1 <= n <= 100; name length 1..20.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Lambdas",
    sampleinput1: "Ada\n3",
    sampleoutput1: "Hello Ada 1\nHello Ada 2\nHello Ada 3",
    sampleinput2: "Cy\n1",
    sampleoutput2: "Hello Cy 1",
    input1: "Mira\n2",
    output1: "Hello Mira 1\nHello Mira 2",
    input2: "Zoe\n4",
    output2: "Hello Zoe 1\nHello Zoe 2\nHello Zoe 3\nHello Zoe 4",
    input3: "Bo\n1",
    output3: "Hello Bo 1",
    inputconstrains: "1 <= n <= 100; name length 1..20",
    blacklist: "",
    whitelist: "",
    sourcecode: `name = gets.chomp
n = gets.to_i
greeter = lambda { |i| "Hello #{name} #{i}" }
(1..n).each do |i|
  puts greeter.call(i)
end
`,
  },

  // ===== MEDIUM SCENARIO (6) =====
  {
    title: "Library Late Fee Yield",
    description:
      "A library charges a fixed daily late fee per overdue book. Implement `compute_fees(records, rate)` that yields each `(book_id, fee)` pair when a block is given, otherwise accumulates. The caller block prints and totals.\n\nInput Format:\nLine 1: integer n. Next n lines: `book_id days` separated by space. Daily rate is 0.50.\n\nOutput Format:\nN lines `BOOK_ID FEE` (2 decimals), then a final line with the total fee (2 decimals).\n\nConstraints:\n1 <= n <= 100; 0 <= days <= 365.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "yield and block_given",
    sampleinput1: "3\nA1 3\nA2 5\nA3 0",
    sampleoutput1: "A1 1.50\nA2 2.50\nA3 0.00\n4.00",
    sampleinput2: "1\nB7 10",
    sampleoutput2: "B7 5.00\n5.00",
    input1: "2\nX 4\nY 6",
    output1: "X 2.00\nY 3.00\n5.00",
    input2: "1\nZ 0",
    output2: "Z 0.00\n0.00",
    input3: "3\nP 1\nQ 2\nR 3",
    output3: "P 0.50\nQ 1.00\nR 1.50\n3.00",
    inputconstrains: "1 <= n <= 100; 0 <= days <= 365",
    blacklist: "lambda, ->",
    whitelist: "yield, block_given",
    sourcecode: `def compute_fees(records, rate)
  results = []
  records.each do |(id, days)|
    fee = days * rate
    if block_given?
      yield id, fee
    else
      results << [id, fee]
    end
  end
  results
end

n = gets.to_i
records = []
n.times do
  parts = gets.split
  records << [parts[0], parts[1].to_i]
end
rate = 0.50
total = 0.0
compute_fees(records, rate) do |id, fee|
  puts "#{id} %.2f" % fee
  total += fee
end
puts "%.2f" % total
`,
  },
  {
    title: "Bank Withdrawal Ampersand Block",
    description:
      "An ATM withdrawal method takes a balance, an amount, and an `&block` authorizer. If the block returns true and amount <= balance, deduct and report OK; if amount exceeds balance, report INSUFFICIENT; if the block returns false, report DENIED.\n\nInput Format:\nLine 1: float balance. Line 2: float amount. Line 3: PIN string.\n\nOutput Format:\nLine 1: status (`OK`, `INSUFFICIENT`, or `DENIED`). Line 2: resulting balance (2 decimals).\n\nConstraints:\n0.0 <= balance <= 100000.0; 0.0 <= amount <= 100000.0; PIN length 4.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Ampersand Block Parameter",
    sampleinput1: "1000.00\n200.00\n1234",
    sampleoutput1: "OK\n800.00",
    sampleinput2: "500.00\n600.00\n1234",
    sampleoutput2: "INSUFFICIENT\n500.00",
    input1: "1000.00\n200.00\n9999",
    output1: "DENIED\n1000.00",
    input2: "50.00\n50.00\n1234",
    output2: "OK\n0.00",
    input3: "300.00\n100.00\n0000",
    output3: "DENIED\n300.00",
    inputconstrains: "0.0 <= balance, amount <= 100000.0",
    blacklist: "yield, ->, lambda",
    whitelist: "&block, call",
    sourcecode: `def withdraw(balance, amount, &block)
  if block.call
    if amount <= balance
      [balance - amount, "OK"]
    else
      [balance, "INSUFFICIENT"]
    end
  else
    [balance, "DENIED"]
  end
end

balance = gets.to_f
amount = gets.to_f
auth_pin = gets.chomp
stored_pin = "1234"
new_bal, msg = withdraw(balance, amount) { auth_pin == stored_pin }
puts msg
puts "%.2f" % new_bal
`,
  },
  {
    title: "Order Total With Proc Closure",
    description:
      "An e-commerce checkout builds a tax applier as a `Proc` closure capturing the tax rate, then sums taxed amounts for each line item.\n\nInput Format:\nLine 1: integer n. Line 2: float tax rate (e.g. 0.08). Next n lines: float line amount.\n\nOutput Format:\nA single line with the total (2 decimals).\n\nConstraints:\n1 <= n <= 100; 0.0 <= rate <= 0.5; 0.0 <= amount <= 10000.0.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Procs",
    sampleinput1: "3\n0.08\n100.00\n50.00\n25.00",
    sampleoutput1: "189.00",
    sampleinput2: "1\n0.05\n200.00",
    sampleoutput2: "210.00",
    input1: "2\n0.10\n10.00\n20.00",
    output1: "33.00",
    input2: "1\n0.00\n500.00",
    output2: "500.00",
    input3: "4\n0.07\n1.00\n2.00\n3.00\n4.00",
    output3: "10.70",
    inputconstrains: "1 <= n <= 100; 0.0 <= rate <= 0.5",
    blacklist: "lambda, ->",
    whitelist: "Proc.new, call",
    sourcecode: `def make_taxer(rate)
  Proc.new { |amt| amt * (1 + rate) }
end

n = gets.to_i
rate = gets.to_f
taxer = make_taxer(rate)
total = 0.0
n.times do
  amt = gets.to_f
  total += taxer.call(amt)
end
puts "%.2f" % total
`,
  },
  {
    title: "Filter Lambda Strict Arity",
    description:
      "A sensor log filter keeps readings above a threshold. Use a `lambda` (which strictly checks arity) as the selector.\n\nInput Format:\nLine 1: integer n. Next n lines: integer readings. Last line: integer threshold.\n\nOutput Format:\nOne line of space-separated readings strictly greater than the threshold.\n\nConstraints:\n1 <= n <= 1000; -10000 <= reading <= 10000.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Lambdas",
    sampleinput1: "5\n1\n3\n5\n7\n9\n4",
    sampleoutput1: "5 7 9",
    sampleinput2: "3\n10\n20\n30\n15",
    sampleoutput2: "20 30",
    input1: "1\n5\n0",
    output1: "5",
    input2: "3\n-1\n0\n1\n0",
    output2: "1",
    input3: "4\n100\n200\n300\n400\n250",
    output3: "300 400",
    inputconstrains: "1 <= n <= 1000; -10000 <= v <= 10000",
    blacklist: "Proc.new, proc",
    whitelist: "lambda",
    sourcecode: `n = gets.to_i
nums = []
n.times { nums << gets.to_i }
threshold = gets.to_i
keep = lambda { |x| x > threshold }
result = nums.select(&keep)
puts result.join(" ")
`,
  },
  {
    title: "Pipeline Compose Lambdas",
    description:
      "A data pipeline composes two transformation lambdas (add-one then double) and applies the composed pipeline to a list of integers.\n\nInput Format:\nLine 1: integer n. Line 2: space-separated integers.\n\nOutput Format:\nOne line of space-separated transformed integers, each `(x+1)*2`.\n\nConstraints:\n1 <= n <= 1000; -1000 <= v <= 1000.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Lambdas",
    sampleinput1: "5\n1 2 3 4 5",
    sampleoutput1: "4 6 8 10 12",
    sampleinput2: "3\n0 10 100",
    sampleoutput2: "2 22 202",
    input1: "1\n7",
    output1: "16",
    input2: "2\n-1 0",
    output2: "0 2",
    input3: "4\n100 200 300 400",
    output3: "202 402 602 802",
    inputconstrains: "1 <= n <= 1000; -1000 <= v <= 1000",
    blacklist: "Proc.new, proc, yield",
    whitelist: "lambda, ->",
    sourcecode: `double = lambda { |x| x * 2 }
add_one = ->(x) { x + 1 }
compose = ->(f, g) { ->(x) { f.call(g.call(x)) } }
pipeline = compose.call(double, add_one)

n = gets.to_i
nums = gets.split.map(&:to_i)
puts nums.map { |x| pipeline.call(x) }.join(" ")
`,
  },
  {
    title: "Counter Closure With Proc",
    description:
      "A turnstile counter is implemented as a closure: `make_counter` returns a `Proc` that captures a local count and increments it on each call.\n\nInput Format:\nA single integer n: how many times to call the counter.\n\nOutput Format:\nOne line of n space-separated counter outputs (1, 2, ..., n).\n\nConstraints:\n1 <= n <= 1000.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Closures and Variable Capture",
    sampleinput1: "5",
    sampleoutput1: "1 2 3 4 5",
    sampleinput2: "3",
    sampleoutput2: "1 2 3",
    input1: "1",
    output1: "1",
    input2: "10",
    output2: "1 2 3 4 5 6 7 8 9 10",
    input3: "2",
    output3: "1 2",
    inputconstrains: "1 <= n <= 1000",
    blacklist: "lambda, ->",
    whitelist: "Proc.new, call",
    sourcecode: `def make_counter
  count = 0
  Proc.new do
    count += 1
    count
  end
end

counter = make_counter
n = gets.to_i
results = []
n.times { results << counter.call }
puts results.join(" ")
`,
  },

  // ===== HARD SCENARIO (4) =====
  {
    title: "Iterator Builder With Ampersand Block",
    description:
      "Build a custom iterator `iterate_all(arr, &block)` that walks the array using a `while` loop and invokes the block via `block.call` for each element. Use it to produce squares of the input integers.\n\nInput Format:\nOne line of space-separated integers.\n\nOutput Format:\nOne line of space-separated squared integers.\n\nConstraints:\n1 <= n <= 1000; -1000 <= v <= 1000.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Ampersand Block Parameter",
    sampleinput1: "1 2 3 4 5",
    sampleoutput1: "1 4 9 16 25",
    sampleinput2: "10 20",
    sampleoutput2: "100 400",
    input1: "0",
    output1: "0",
    input2: "-1 -2 -3",
    output2: "1 4 9",
    input3: "7 8 9 10",
    output3: "49 64 81 100",
    inputconstrains: "1 <= n <= 1000; -1000 <= v <= 1000",
    blacklist: "each, map, yield",
    whitelist: "&block, call, while ",
    sourcecode: `def iterate_all(arr, &block)
  i = 0
  while i < arr.size
    block.call(arr[i])
    i += 1
  end
  arr
end

raw = gets.split
arr = []
i = 0
while i < raw.size
  arr << raw[i].to_i
  i += 1
end
squared = []
iterate_all(arr) { |x| squared << x * x }
puts squared.join(" ")
`,
  },
  {
    title: "Recursive Memoizer Via Lambda Closure",
    description:
      "Implement a memoized factorial using a recursive `lambda` closure that stores computed results in a captured hash, plus a `->` printer lambda that formats the output.\n\nInput Format:\nOne line of space-separated integers (each 0..12).\n\nOutput Format:\nOne line of space-separated factorials.\n\nConstraints:\n1 <= n <= 50; 0 <= v <= 12.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Closures and Variable Capture",
    sampleinput1: "1 2 3 4 5",
    sampleoutput1: "1 2 6 24 120",
    sampleinput2: "0 6",
    sampleoutput2: "1 720",
    input1: "0 1 2",
    output1: "1 1 2",
    input2: "10 10",
    output2: "3628800 3628800",
    input3: "4 5 6",
    output3: "24 120 720",
    inputconstrains: "1 <= n <= 50; 0 <= v <= 12",
    blacklist: "Proc.new, reduce, inject",
    whitelist: "lambda, ->, ||=",
    sourcecode: `memo = {}
fact = lambda do |n|
  if n <= 1
    1
  else
    memo[n] ||= n * fact.call(n - 1)
  end
end

nums = gets.split.map(&:to_i)
printer = ->(arr) { puts arr.join(" ") }
printer.call(nums.map { |x| fact.call(x) })
`,
  },
  {
    title: "Strategy Pattern With Lambdas",
    description:
      "A text formatter selects among three strategies (UPPER, lower, title-case) using a hash of `lambda`/`->` objects. Apply the chosen strategy to the input text.\n\nInput Format:\nLine 1: text (single word or words separated by spaces). Line 2: mode (UPPER, lower, or title).\n\nOutput Format:\nThe transformed text.\n\nConstraints:\nText length 1..100; mode in {UPPER, lower, title}.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Lambdas",
    sampleinput1: "hello world\nUPPER",
    sampleoutput1: "HELLO WORLD",
    sampleinput2: "Hello World\nlower",
    sampleoutput2: "hello world",
    input1: "the quick fox\ntitle",
    output1: "The Quick Fox",
    input2: "ALREADY\ntitle",
    output2: "Already",
    input3: "Mixed CASE\nUPPER",
    output3: "MIXED CASE",
    inputconstrains: "text length 1..100; mode in {UPPER, lower, title}",
    blacklist: "proc, Proc.new, yield",
    whitelist: "lambda, ->",
    sourcecode: `strategies = {
  "UPPER" => lambda { |s| s.upcase },
  "lower" => lambda { |s| s.downcase },
  "title" => ->(s) { s.split.map { |w| w.capitalize }.join(" ") }
}

text = gets.chomp
mode = gets.chomp
result = strategies[mode].call(text)
puts result
`,
  },
  {
    title: "Braces Block Closure Accumulator",
    description:
      "Build a closure factory `counter = lambda { |start| ->(n) { start += n } }` that returns an accumulator lambda. Feed each input integer through it and print the running total at the end.\n\nInput Format:\nOne line of space-separated integers.\n\nOutput Format:\nA single integer: the final accumulator value (sum of all inputs).\n\nConstraints:\n1 <= n <= 1000; -10000 <= v <= 10000.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Closures and Variable Capture",
    sampleinput1: "1 2 3 4 5",
    sampleoutput1: "15",
    sampleinput2: "10 20 30",
    sampleoutput2: "60",
    input1: "5",
    output1: "5",
    input2: "-1 1 0",
    output2: "0",
    input3: "100 200 300 400",
    output3: "1000",
    inputconstrains: "1 <= n <= 1000; -10000 <= v <= 10000",
    blacklist: "yield, Proc.new, proc",
    whitelist: "lambda, ->",
    sourcecode: `counter = lambda { |start| ->(n) { start += n } }
c = counter.call(0)

nums = gets.split.map(&:to_i)
sum = 0
nums.each { |x| sum = c.call(x) }
puts sum
`,
  },
];

const mcqs: MCQ[] = [
  // ===== EASY (10) =====
  {
    title: "Yield Mechanism",
    description: "Which Ruby keyword invokes a block passed to a method?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "yield and block_given",
    Option1: "call",
    Option2: "yield",
    Option3: "invoke",
    Option4: "block",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "block_given? Returns",
    description:
      "What does `block_given?` return when a method is called without a block?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "yield and block_given",
    Option1: "nil",
    Option2: "false",
    Option3: "true",
    Option4: "It raises an ArgumentError",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Block With Braces",
    description: "Which syntax is conventionally preferred for single-line blocks?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Block Syntax do end and Braces",
    Option1: "do ... end",
    Option2: "{ }",
    Option3: "begin ... end",
    Option4: "def ... end",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Proc vs Lambda Arity",
    description:
      "Which one strictly checks the number of arguments passed to it?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Procs",
    Option1: "Proc",
    Option2: "lambda",
    Option3: "Method object",
    Option4: "Block",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Convert Block To Proc",
    description:
      "What prefix converts a block argument into a Proc object inside the method signature?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Ampersand Block Parameter",
    Option1: "*block",
    Option2: "&block",
    Option3: "@block",
    Option4: "$block",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Lambda Literal Syntax",
    description: "Which is a valid Ruby lambda literal?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Lambdas",
    Option1: "->(x) { x }",
    Option2: "lambda x { x }",
    Option3: "fn x => x",
    Option4: "(x) -> x",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Proc Return Behavior",
    description:
      "A `return` inside a Proc object (called via `proc.call`) returns from where?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Procs",
    Option1: "Only the Proc itself",
    Option2: "The enclosing method",
    Option3: "The current block only",
    Option4: "It always raises LocalJumpError",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Lambda Return Behavior",
    description:
      "A `return` inside a lambda (called via `lambda.call`) returns from where?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Lambdas",
    Option1: "The enclosing method",
    Option2: "The lambda itself only",
    Option3: "Nowhere",
    Option4: "It always raises LocalJumpError",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Closure Definition",
    description:
      "A closure in Ruby retains access to what?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Closures and Variable Capture",
    Option1: "Only its own parameters",
    Option2: "Variables in its defining scope",
    Option3: "Class instance variables only",
    Option4: "Global variables only",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Method Object Conversion",
    description:
      "What does prefixing a method name with `&` (as in `[1,2].map(&:to_s)`) do?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Ampersand Block Parameter",
    Option1: "Calls the method immediately",
    Option2: "Converts the method to a Proc",
    Option3: "Defines a new method",
    Option4: "Makes the method private",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },

  // ===== MEDIUM (6) =====
  {
    title: "Block Return Value",
    description: "What does the following code print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "yield and block_given",
    Option1: "hi",
    Option2: "done",
    Option3: "hi\\ndone",
    Option4: "(empty line)",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `def run
  yield
  yield
  "done"
end
puts run { "hi" }
`,
    snippetLang: "ruby",
  },
  {
    title: "Proc Arity",
    description: "What does the following code print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Procs",
    Option1: "3",
    Option2: "6",
    Option3: "It raises ArgumentError",
    Option4: "nil",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `p = Proc.new { |a, b| a + b }
puts p.call(1, 2, 3)
`,
    snippetLang: "ruby",
  },
  {
    title: "Lambda Arity",
    description: "What does the following code print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Lambdas",
    Option1: "1",
    Option2: "err",
    Option3: "2",
    Option4: "ArgumentError",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `l = lambda { |a, b| a + b }
begin
  puts l.call(1)
rescue ArgumentError
  puts "err"
end
`,
    snippetLang: "ruby",
  },
  {
    title: "Closure Variable Capture",
    description: "What does the following code print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Closures and Variable Capture",
    Option1: "10",
    Option2: "13",
    Option3: "3",
    Option4: "12",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `x = 10
[1, 2].each { |i| x += i }
puts x
`,
    snippetLang: "ruby",
  },
  {
    title: "Proc Return From Method",
    description: "What does the following code print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Procs",
    Option1: "5",
    Option2: "10",
    Option3: "nil",
    Option4: "LocalJumpError",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `def m
  p = Proc.new { return 5 }
  p.call
  10
end
puts m
`,
    snippetLang: "ruby",
  },
  {
    title: "Block To Method Symbol Shorthand",
    description: "What does `[1, 2, 3].map(&:to_s)` produce?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Ampersand Block Parameter",
    Option1: '["1", "2", "3"]',
    Option2: "[1, 2, 3]",
    Option3: '"123"',
    Option4: "It raises NoMethodError",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },

  // ===== HARD (4) =====
  {
    title: "Lambda vs Proc Return",
    description: "What does the following code print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Lambdas",
    Option1: "10\\n5",
    Option2: "5\\n10",
    Option3: "10\\n10",
    Option4: "5\\n5",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `def with_lambda
  l = -> { return 5 }
  l.call
  10
end
def with_proc
  p = Proc.new { return 5 }
  p.call
  10
end
puts with_lambda
puts with_proc
`,
    snippetLang: "ruby",
  },
  {
    title: "Ampersand Block Method Conversion",
    description: "What does the following code print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Ampersand Block Parameter",
    Option1: "hello",
    Option2: "(empty line)",
    Option3: "nil",
    Option4: "It raises NoMethodError",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `def m(&blk)
  blk
end
greeting = m { "hello" }
puts greeting.call
`,
    snippetLang: "ruby",
  },
  {
    title: "Yield Without Block",
    description: "What does the following code print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "yield and block_given",
    Option1: "ok",
    Option2: "LocalJumpError",
    Option3: "nil",
    Option4: "(empty line)",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `def m
  yield if block_given?
  "ok"
end
puts m
`,
    snippetLang: "ruby",
  },
  {
    title: "Closure Counter",
    description: "What does the following code print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Closures and Variable Capture",
    Option1: "3",
    Option2: "1",
    Option3: "0",
    Option4: "nil",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `counter = 0
inc = Proc.new { counter += 1 }
inc.call
inc.call
inc.call
puts counter
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
