import { writeFileSync } from "node:fs";

const DAY = 6;
const TOPIC = "Methods";
const SUBTOPICS = [
  "Defining Methods",
  "Method Parameters",
  "Default Arguments",
  "Keyword Arguments",
  "Splat and Double Splat Arguments",
  "Return Values",
  "Variable Scope",
];

const questions = [
  // ── Easy basic (6) ──────────────────────────────────────────────────────
  {
    title: "Greet Method With Name",
    description: `Define a method greet(name) that prints "Hello, <name>!". Read a name from stdin and call greet with it.

Input Format:
A single line containing the name.

Output Format:
A single line "Hello, <name>!".

Constraints:
1 <= name length <= 50`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Defining Methods",
    sampleinput1: "Alice",
    sampleoutput1: "Hello, Alice!",
    sampleinput2: "Bob",
    sampleoutput2: "Hello, Bob!",
    input1: "Ruby",
    output1: "Hello, Ruby!",
    input2: "World",
    output2: "Hello, World!",
    input3: "Mariko",
    output3: "Hello, Mariko!",
    inputconstrains: "1 <= name length <= 50",
    blacklist: "",
    whitelist: "",
    sourcecode: `def greet(name)
  puts "Hello, #{name}!"
end
greet(gets.chomp)
`,
  },
  {
    title: "Add Two Numbers Method",
    description: `Define a method add(a, b) that returns a + b. Read two space-separated integers, call add, and print the result.

Input Format:
A single line with two space-separated integers a and b.

Output Format:
A single integer, a + b.

Constraints:
-10000 <= a, b <= 10000`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Method Parameters",
    sampleinput1: "3 5",
    sampleoutput1: "8",
    sampleinput2: "10 20",
    sampleoutput2: "30",
    input1: "0 0",
    output1: "0",
    input2: "-5 7",
    output2: "2",
    input3: "100 200",
    output3: "300",
    inputconstrains: "-10000 <= a, b <= 10000",
    blacklist: "",
    whitelist: "",
    sourcecode: `def add(a, b)
  a + b
end
a, b = gets.split.map(&:to_i)
puts add(a, b)
`,
  },
  {
    title: "Default Greeting Method",
    description: `Define a method greet(name = "Guest") that prints "Hi, <name>!". Read a string s. If s equals "default", call greet with no arguments (use the default); otherwise call greet(s).

Input Format:
A single line containing s.

Output Format:
A single line "Hi, <name>!" using either the default or the provided name.

Constraints:
1 <= s length <= 50`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Default Arguments",
    sampleinput1: "default",
    sampleoutput1: "Hi, Guest!",
    sampleinput2: "Alice",
    sampleoutput2: "Hi, Alice!",
    input1: "Bob",
    output1: "Hi, Bob!",
    input2: "default",
    output2: "Hi, Guest!",
    input3: "Mariko",
    output3: "Hi, Mariko!",
    inputconstrains: "1 <= s length <= 50",
    blacklist: "",
    whitelist: "",
    sourcecode: `def greet(name = "Guest")
  puts "Hi, #{name}!"
end
s = gets.chomp
if s == "default"
  greet
else
  greet(s)
end
`,
  },
  {
    title: "Order Item Method With Keywords",
    description: `Define a method order(item:, qty:) that prints "<qty> x <item>". Read a single line containing an item name and a quantity separated by a space, then call order with the corresponding keyword arguments.

Input Format:
A single line "item qty" where item is a single word and qty is an integer.

Output Format:
A single line "<qty> x <item>".

Constraints:
1 <= qty <= 1000; 1 <= item length <= 30`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Keyword Arguments",
    sampleinput1: "apple 3",
    sampleoutput1: "3 x apple",
    sampleinput2: "book 5",
    sampleoutput2: "5 x book",
    input1: "pen 10",
    output1: "10 x pen",
    input2: "laptop 1",
    output2: "1 x laptop",
    input3: "chair 2",
    output3: "2 x chair",
    inputconstrains: "1 <= qty <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `def order(item:, qty:)
  puts "#{qty} x #{item}"
end
parts = gets.split
item = parts[0]
qty = parts[1].to_i
order(item: item, qty: qty)
`,
  },
  {
    title: "Sum All Method With Splat",
    description: `Define a method sum_all(*nums) that returns the sum of all arguments passed. Read n then n space-separated integers, call sum_all with the splatted array, and print the result.

Input Format:
First line: integer n.
Second line: n space-separated integers.

Output Format:
A single integer, the sum of all n integers.

Constraints:
1 <= n <= 1000; -10000 <= value <= 10000`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Splat and Double Splat Arguments",
    sampleinput1: "3\n1 2 3",
    sampleoutput1: "6",
    sampleinput2: "5\n10 20 30 40 50",
    sampleoutput2: "150",
    input1: "1\n7",
    output1: "7",
    input2: "4\n1 1 1 1",
    output2: "4",
    input3: "2\n-5 5",
    output3: "0",
    inputconstrains: "1 <= n <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `def sum_all(*nums)
  total = 0
  nums.each { |n| total += n }
  total
end
n = gets.to_i
arr = gets.split.map(&:to_i)
puts sum_all(*arr)
`,
  },
  {
    title: "Square Method With Explicit Return",
    description: `Define a method square(n) that uses an explicit return statement to return n * n. Read an integer, call square, and print the result.

Input Format:
A single integer n.

Output Format:
A single integer, n squared.

Constraints:
0 <= n <= 1000`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Return Values",
    sampleinput1: "4",
    sampleoutput1: "16",
    sampleinput2: "7",
    sampleoutput2: "49",
    input1: "0",
    output1: "0",
    input2: "10",
    output2: "100",
    input3: "11",
    output3: "121",
    inputconstrains: "0 <= n <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `def square(n)
  return n * n
end
puts square(gets.to_i)
`,
  },

  // ── Easy scenario (4) ────────────────────────────────────────────────────
  {
    title: "Bank Deposit Method",
    description: `A bank teller needs a method deposit(balance, amount) that returns the new balance after adding the deposit amount. Read balance and amount, call deposit, and print the new balance.

Input Format:
A single line with two space-separated integers balance and amount.

Output Format:
A single integer, the new balance.

Constraints:
0 <= balance <= 1000000; 0 <= amount <= 1000000`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Defining Methods",
    sampleinput1: "1000 500",
    sampleoutput1: "1500",
    sampleinput2: "200 50",
    sampleoutput2: "250",
    input1: "0 100",
    output1: "100",
    input2: "5000 1000",
    output2: "6000",
    input3: "100 25",
    output3: "125",
    inputconstrains: "0 <= balance, amount <= 1000000",
    blacklist: "",
    whitelist: "",
    sourcecode: `def deposit(balance, amount)
  balance + amount
end
b, a = gets.split.map(&:to_i)
puts deposit(b, a)
`,
  },
  {
    title: "Pizza Order With Default Slices",
    description: `A pizzeria's serve_pizza(slices = 8) method returns the string "<slices> slices served". Read an integer s. If s is 0, call serve_pizza with no arguments (use the default 8); otherwise call serve_pizza(s). Print the returned string.

Input Format:
A single integer s.

Output Format:
A single line "<slices> slices served".

Constraints:
0 <= s <= 100`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Default Arguments",
    sampleinput1: "0",
    sampleoutput1: "8 slices served",
    sampleinput2: "4",
    sampleoutput2: "4 slices served",
    input1: "12",
    output1: "12 slices served",
    input2: "0",
    output2: "8 slices served",
    input3: "6",
    output3: "6 slices served",
    inputconstrains: "0 <= s <= 100",
    blacklist: "",
    whitelist: "",
    sourcecode: `def serve_pizza(slices = 8)
  "#{slices} slices served"
end
s = gets.to_i
if s == 0
  puts serve_pizza
else
  puts serve_pizza(s)
end
`,
  },
  {
    title: "Celsius To Fahrenheit Method",
    description: `A weather app uses a method to_fahrenheit(celsius:) that returns (celsius * 9) / 5 + 32. Read a Celsius integer, call to_fahrenheit with the keyword argument, and print the result.

Input Format:
A single integer celsius.

Output Format:
A single integer, the Fahrenheit equivalent.

Constraints:
-100 <= celsius <= 200`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Keyword Arguments",
    sampleinput1: "25",
    sampleoutput1: "77",
    sampleinput2: "0",
    sampleoutput2: "32",
    input1: "100",
    output1: "212",
    input2: "10",
    output2: "50",
    input3: "30",
    output3: "86",
    inputconstrains: "-100 <= celsius <= 200",
    blacklist: "",
    whitelist: "",
    sourcecode: `def to_fahrenheit(celsius:)
  (celsius * 9) / 5 + 32
end
c = gets.to_i
puts to_fahrenheit(celsius: c)
`,
  },
  {
    title: "Receipt Total Method With Splat",
    description: `A cashier needs a method receipt_total(*prices) that returns the sum of all prices. Read n then n integer prices, call receipt_total with the splatted array, and print the total.

Input Format:
First line: integer n.
Second line: n space-separated integer prices.

Output Format:
A single integer, the total of all prices.

Constraints:
1 <= n <= 1000; 0 <= price <= 10000`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Splat and Double Splat Arguments",
    sampleinput1: "3\n100 200 300",
    sampleoutput1: "600",
    sampleinput2: "4\n5 10 15 20",
    sampleoutput2: "50",
    input1: "1\n42",
    output1: "42",
    input2: "2\n10 20",
    output2: "30",
    input3: "5\n1 2 3 4 5",
    output3: "15",
    inputconstrains: "1 <= n <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `def receipt_total(*prices)
  total = 0
  prices.each { |p| total += p }
  total
end
n = gets.to_i
prices = gets.split.map(&:to_i)
puts receipt_total(*prices)
`,
  },

  // ── Medium scenario (6) ─────────────────────────────────────────────────
  {
    title: "Discount Calculator With Default Percentage",
    description: `Define a method discount(price, percent = 10) that returns the discounted price price * (100 - percent) / 100. Read price and percent. If percent is 0, call discount(price) to use the default 10 percent; otherwise call discount(price, percent). Print the result. Do not use case, when, or the ternary operator.

Input Format:
A single line with two space-separated integers price and percent.

Output Format:
A single integer, the discounted price.

Constraints:
1 <= price <= 100000; 0 <= percent <= 100`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Default Arguments",
    sampleinput1: "100 0",
    sampleoutput1: "90",
    sampleinput2: "200 25",
    sampleoutput2: "150",
    input1: "50 0",
    output1: "45",
    input2: "1000 50",
    output2: "500",
    input3: "300 10",
    output3: "270",
    inputconstrains: "1 <= price <= 100000; 0 <= percent <= 100",
    blacklist: "case, when, ?",
    whitelist: "def , = 10",
    sourcecode: `def discount(price, percent = 10)
  price * (100 - percent) / 100
end
p, pct = gets.split.map(&:to_i)
if pct == 0
  puts discount(p)
else
  puts discount(p, pct)
end
`,
  },
  {
    title: "Email Compose Method With Keywords",
    description: `Define a method compose(to:, subject:, body:) that returns a single string "To: <to> | Subject: <subject> | Body: <body>". Read three lines (to, subject, body). Call compose with keyword arguments and print the returned string. Do not use class or module.

Input Format:
Three lines: to, subject, then body.

Output Format:
A single line in the format "To: <to> | Subject: <subject> | Body: <body>".

Constraints:
1 <= each line length <= 100`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Keyword Arguments",
    sampleinput1: "alice@example.com\nHello\nHow are you?",
    sampleoutput1: "To: alice@example.com | Subject: Hello | Body: How are you?",
    sampleinput2: "bob@x.com\nTest\nHi",
    sampleoutput2: "To: bob@x.com | Subject: Test | Body: Hi",
    input1: "a@b.com\nSub\nMsg",
    output1: "To: a@b.com | Subject: Sub | Body: Msg",
    input2: "x@y.com\nA\nB",
    output2: "To: x@y.com | Subject: A | Body: B",
    input3: "p@q.com\nHello\nWorld",
    output3: "To: p@q.com | Subject: Hello | Body: World",
    inputconstrains: "1 <= each line length <= 100",
    blacklist: "class, module",
    whitelist: "def , subject:",
    sourcecode: `def compose(to:, subject:, body:)
  "To: #{to} | Subject: #{subject} | Body: #{body}"
end
to = gets.chomp
subject = gets.chomp
body = gets.chomp
puts compose(to: to, subject: subject, body: body)
`,
  },
  {
    title: "Largest Of Numbers With Splat Method",
    description: `Define a method largest_of(*nums) that uses a loop to find the largest value among the arguments and returns it. Read n then n integers, call largest_of with the splatted array, and print the result. Do not use the built-in .max method, sort, or max as a substring.

Input Format:
First line: integer n.
Second line: n space-separated integers.

Output Format:
A single integer, the largest value.

Constraints:
1 <= n <= 1000; -10000 <= value <= 10000`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Splat and Double Splat Arguments",
    sampleinput1: "5\n3 7 2 9 4",
    sampleoutput1: "9",
    sampleinput2: "3\n-1 -5 -3",
    sampleoutput2: "-1",
    input1: "1\n42",
    output1: "42",
    input2: "4\n10 20 5 30",
    output2: "30",
    input3: "6\n1 2 3 4 5 6",
    output3: "6",
    inputconstrains: "1 <= n <= 1000",
    blacklist: ".max, sort, max",
    whitelist: "def , *nums",
    sourcecode: `def largest_of(*nums)
  best = nums.first
  nums.each do |n|
    best = n if n > best
  end
  best
end
count = gets.to_i
arr = gets.split.map(&:to_i)
puts largest_of(*arr)
`,
  },
  {
    title: "Config Override With Double Splat",
    description: `Define a method invoice(amount, **taxes) that returns the amount plus the sum of all tax values. Read an amount, then n, then n key=value lines (value is an integer). Build a hash and call invoice with the double-splatted hash. Print the result. Do not use class or module.

Input Format:
First line: integer amount.
Second line: integer n.
Next n lines: each of the form "key=value".

Output Format:
A single integer, amount plus the sum of all tax values.

Constraints:
0 <= amount <= 1000000; 0 <= n <= 20; 0 <= value <= 10000`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Splat and Double Splat Arguments",
    sampleinput1: "100\n2\nsales=10\nvat=5",
    sampleoutput1: "115",
    sampleinput2: "50\n1\ntax=7",
    sampleoutput2: "57",
    input1: "1000\n0",
    output1: "1000",
    input2: "200\n3\na=5\nb=10\nc=15",
    output2: "230",
    input3: "10\n2\nx=3\ny=7",
    output3: "20",
    inputconstrains: "0 <= amount <= 1000000; 0 <= n <= 20",
    blacklist: "class, module",
    whitelist: "def , **taxes",
    sourcecode: `def invoice(amount, **taxes)
  total = amount
  taxes.each_value { |v| total += v }
  total
end
amount = gets.to_i
n = gets.to_i
opts = {}
n.times do
  k, v = gets.chomp.split("=")
  opts[k.to_sym] = v.to_i
end
puts invoice(amount, **opts)
`,
  },
  {
    title: "Counter Method With Local Scope",
    description: `Define a method bump(counter, delta) that uses an explicit return to return counter + delta. Maintain an outer variable total starting at 0. Read n then n delta values. After each delta, set total = bump(total, delta) and print the new total. Do not use global ($total) or instance (@total) variables.

Input Format:
First line: integer n.
Second line: n space-separated integer deltas.

Output Format:
n lines, each containing the running total after applying that delta.

Constraints:
1 <= n <= 1000; -10000 <= delta <= 10000`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Variable Scope",
    sampleinput1: "3\n5 10 15",
    sampleoutput1: "5\n15\n30",
    sampleinput2: "2\n3 7",
    sampleoutput2: "3\n10",
    input1: "1\n100",
    output1: "100",
    input2: "4\n1 1 1 1",
    output2: "1\n2\n3\n4",
    input3: "3\n-5 10 -3",
    output3: "-5\n5\n2",
    inputconstrains: "1 <= n <= 1000",
    blacklist: "$total, @total",
    whitelist: "def , return",
    sourcecode: `def bump(counter, delta)
  return counter + delta
end
total = 0
n = gets.to_i
deltas = gets.split.map(&:to_i)
deltas.each do |d|
  total = bump(total, d)
  puts total
end
`,
  },
  {
    title: "Eligibility Check Method With Early Return",
    description: `Define a method eligible?(age, score) that returns "yes" if age >= 18 AND score >= 60, otherwise "no". Use early return statements for the failure cases. Read age and score, call eligible?, and print the result. Do not use case or when.

Input Format:
A single line with two space-separated integers age and score.

Output Format:
A single line, either "yes" or "no".

Constraints:
0 <= age <= 120; 0 <= score <= 100`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Return Values",
    sampleinput1: "20 75",
    sampleoutput1: "yes",
    sampleinput2: "17 80",
    sampleoutput2: "no",
    input1: "18 60",
    output1: "yes",
    input2: "25 50",
    output2: "no",
    input3: "30 90",
    output3: "yes",
    inputconstrains: "0 <= age <= 120; 0 <= score <= 100",
    blacklist: "case, when",
    whitelist: "def , return",
    sourcecode: `def eligible?(age, score)
  return "no" if age < 18
  return "no" if score < 60
  "yes"
end
age, score = gets.split.map(&:to_i)
puts eligible?(age, score)
`,
  },

  // ── Hard scenario (4) ──────────────────────────────────────────────────
  {
    title: "Fibonacci Method With Memo Hash",
    description: `Define a method fib(n, memo = {}) that returns the n-th Fibonacci number where fib(1) = 1, fib(2) = 1, fib(3) = 2, and so on. Use early return for n <= 2, and memoize using the hash argument. Read n and print fib(n). Do not use while, until, or for.

Input Format:
A single integer n.

Output Format:
A single integer, the n-th Fibonacci number.

Constraints:
1 <= n <= 30`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Return Values",
    sampleinput1: "10",
    sampleoutput1: "55",
    sampleinput2: "1",
    sampleoutput2: "1",
    input1: "5",
    output1: "5",
    input2: "20",
    output2: "6765",
    input3: "30",
    output3: "832040",
    inputconstrains: "1 <= n <= 30",
    blacklist: "while, until, for",
    whitelist: "def , return",
    sourcecode: `def fib(n, memo = {})
  return 1 if n <= 2
  return memo[n] if memo.key?(n)
  memo[n] = fib(n - 1, memo) + fib(n - 2, memo)
end
n = gets.to_i
puts fib(n)
`,
  },
  {
    title: "Bank Account Transaction Method",
    description: `A bank account starts with balance B. Define methods deposit(balance, amount) which returns balance + amount, and withdraw(balance, amount) which returns balance - amount, or returns balance unchanged if amount exceeds the current balance (use an early return for that case). Read B, then n, then n transaction lines each "deposit X" or "withdraw X". Apply each transaction in order and print the final balance. Do not use class or instance variables.

Input Format:
First line: integer B.
Second line: integer n.
Next n lines: each "deposit X" or "withdraw X" with integer X.

Output Format:
A single integer, the final balance.

Constraints:
0 <= B <= 1000000; 1 <= n <= 100; 0 <= X <= 1000000`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Variable Scope",
    sampleinput1: "100\n2\ndeposit 50\nwithdraw 30",
    sampleoutput1: "120",
    sampleinput2: "50\n1\nwithdraw 100",
    sampleoutput2: "50",
    input1: "0\n1\ndeposit 100",
    output1: "100",
    input2: "1000\n3\nwithdraw 200\ndeposit 100\nwithdraw 500",
    output2: "400",
    input3: "200\n2\nwithdraw 100\nwithdraw 200",
    output3: "100",
    inputconstrains: "0 <= B <= 1000000; 1 <= n <= 100",
    blacklist: "class, @balance",
    whitelist: "def , return",
    sourcecode: `def deposit(balance, amount)
  return balance + amount
end
def withdraw(balance, amount)
  return balance if amount > balance
  balance - amount
end
balance = gets.to_i
n = gets.to_i
n.times do
  op, amt_str = gets.split
  amt = amt_str.to_i
  if op == "deposit"
    balance = deposit(balance, amt)
  else
    balance = withdraw(balance, amt)
  end
end
puts balance
`,
  },
  {
    title: "Tax Calculator With Double Splat Brackets",
    description: `Define a method tax(income, **rates) where rates is a hash mapping a bracket name to a percent integer. The tax owed is income * total_rate / 100 where total_rate is the sum of all rate values. Read income, then n, then n lines of "name=percent". Build a hash and call tax with the double-splatted hash. Print the result. Do not use class or case.

Input Format:
First line: integer income.
Second line: integer n.
Next n lines: each "name=percent" with integer percent.

Output Format:
A single integer, the tax owed.

Constraints:
0 <= income <= 10000000; 0 <= n <= 20; 0 <= percent <= 100`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Splat and Double Splat Arguments",
    sampleinput1: "1000\n2\nfederal=10\nstate=5",
    sampleoutput1: "150",
    sampleinput2: "5000\n1\nvat=20",
    sampleoutput2: "1000",
    input1: "100\n0",
    output1: "0",
    input2: "2000\n3\na=5\nb=5\nc=10",
    output2: "400",
    input3: "10000\n2\nx=7\ny=8",
    output3: "1500",
    inputconstrains: "0 <= income <= 10000000; 0 <= n <= 20",
    blacklist: "class, case",
    whitelist: "def , **rates",
    sourcecode: `def tax(income, **rates)
  total_rate = 0
  rates.each_value { |r| total_rate += r }
  income * total_rate / 100
end
income = gets.to_i
n = gets.to_i
opts = {}
n.times do
  k, v = gets.chomp.split("=")
  opts[k.to_sym] = v.to_i
end
puts tax(income, **opts)
`,
  },
  {
    title: "Text Processor With Multiple Methods",
    description: `Define three methods. count_words(text) returns the number of whitespace-separated words in text. count_vowels(text) returns the number of vowels (a, e, i, o, u, case-insensitive) using each_char to iterate. longest_word(text) returns the longest word in text, returning the first one in case of ties, using each to iterate over the words. Read a line of text, call all three methods, and print each result on its own line. Do not use .max, .min, sort, or scan.

Input Format:
A single line of text.

Output Format:
Three lines: word count, vowel count, longest word.

Constraints:
1 <= text length <= 1000`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Defining Methods",
    sampleinput1: "the quick brown fox",
    sampleoutput1: "4\n5\nquick",
    sampleinput2: "hello world",
    sampleoutput2: "2\n3\nhello",
    input1: "ruby",
    output1: "1\n1\nruby",
    input2: "a e i o u",
    output2: "5\n5\na",
    input3: "cat dog bird",
    output3: "3\n3\nbird",
    inputconstrains: "1 <= text length <= 1000",
    blacklist: ".max, .min, sort, scan",
    whitelist: "def , each",
    sourcecode: `def count_words(text)
  words = text.split
  words.size
end
def count_vowels(text)
  vowels = 0
  text.each_char do |c|
    if "aeiouAEIOU".include?(c)
      vowels += 1
    end
  end
  vowels
end
def longest_word(text)
  words = text.split
  best = words[0]
  words.each do |w|
    if w.length > best.length
      best = w
    end
  end
  best
end
text = gets.chomp
puts count_words(text)
puts count_vowels(text)
puts longest_word(text)
`,
  },
];

const mcqs = [
  // Easy (10)
  {
    title: "Method Definition Syntax",
    description: "Which keyword begins a method definition in Ruby?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Defining Methods",
    Option1: "def",
    Option2: "function",
    Option3: "method",
    Option4: "define",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "No-Arg Method Output",
    description: "What does the following Ruby code print?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Defining Methods",
    Option1: "Hi",
    Option2: "greet",
    Option3: "nil",
    Option4: "Hi greet",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `def greet
  puts "Hi"
end
greet`,
    snippetLang: "ruby",
  },
  {
    title: "Two Parameter Method Output",
    description: "What does the following Ruby code print?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Method Parameters",
    Option1: "7",
    Option2: "34",
    Option3: "3 4",
    Option4: "12",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `def add(a, b)
  a + b
end
puts add(3, 4)`,
    snippetLang: "ruby",
  },
  {
    title: "Default Argument Method Output",
    description: "What does the following Ruby code print?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Default Arguments",
    Option1: "10",
    Option2: "5",
    Option3: "0",
    Option4: "20",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `def f(x = 5)
  x * 2
end
puts f`,
    snippetLang: "ruby",
  },
  {
    title: "Method Return Value",
    description: "What value does the following expression evaluate to?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Return Values",
    Option1: "5",
    Option2: "6",
    Option3: "23",
    Option4: "nil",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `def m(a, b)
  a + b
end
m(2, 3)`,
    snippetLang: "ruby",
  },
  {
    title: "Keyword Argument Method Output",
    description: "What does the following Ruby code print?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Keyword Arguments",
    Option1: "Bob is 30",
    Option2: "name is age",
    Option3: "30 is Bob",
    Option4: "Bob 30",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `def info(name:, age:)
  "#{name} is #{age}"
end
puts info(name: "Bob", age: 30)`,
    snippetLang: "ruby",
  },
  {
    title: "Splat Method Sum Output",
    description: "What does the following Ruby code print?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Splat and Double Splat Arguments",
    Option1: "10",
    Option2: "1234",
    Option3: "4",
    Option4: "0",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `def total(*nums)
  sum = 0
  nums.each { |n| sum += n }
  sum
end
puts total(1, 2, 3, 4)`,
    snippetLang: "ruby",
  },
  {
    title: "Default Argument Syntax",
    description: "Which syntax correctly specifies a default value for an argument in a Ruby method?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Default Arguments",
    Option1: "def m(x = 5)",
    Option2: "def m(x := 5)",
    Option3: "def m(x default 5)",
    Option4: "def m(x: 5 default)",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Default Argument With No Call Args",
    description: "What does the following Ruby code return?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Default Arguments",
    Option1: "Hi, Guest",
    Option2: "Hi, ",
    Option3: "Hi, name",
    Option4: "nil",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `def greet(name = "Guest")
  "Hi, #{name}"
end
greet`,
    snippetLang: "ruby",
  },
  {
    title: "Return Keyword Behaviour",
    description: "What does the Ruby keyword `return` do inside a method body?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Return Values",
    Option1: "Exits the method immediately and returns the given value",
    Option2: "Loops back to the start of the method",
    Option3: "Continues to the next iteration",
    Option4: "Prints the value and continues",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },

  // Medium (6)
  {
    title: "Default Argument Mixed With Provided",
    description: "What does the following Ruby code print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Default Arguments",
    Option1: "15",
    Option2: "5",
    Option3: "10",
    Option4: "error",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `def m(a, b = 10)
  a + b
end
puts m(5)`,
    snippetLang: "ruby",
  },
  {
    title: "Keyword Default Argument",
    description: "What does the following Ruby code print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Keyword Arguments",
    Option1: "Al:user",
    Option2: "Al:",
    Option3: "Al",
    Option4: "error",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `def opt(name:, role: "user")
  "#{name}:#{role}"
end
puts opt(name: "Al")`,
    snippetLang: "ruby",
  },
  {
    title: "Early Return Branch",
    description: "What does the following expression evaluate to?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Return Values",
    Option1: "neg",
    Option2: "zero",
    Option3: "pos",
    Option4: "nil",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `def check(n)
  return "neg" if n < 0
  return "zero" if n == 0
  "pos"
end
check(-5)`,
    snippetLang: "ruby",
  },
  {
    title: "Splat With Reduce",
    description: "What does the following Ruby code print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Splat and Double Splat Arguments",
    Option1: "6",
    Option2: "123",
    Option3: "1",
    Option4: "0",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `def add(*nums)
  nums.reduce(0, :+)
end
puts add(1, 2, 3)`,
    snippetLang: "ruby",
  },
  {
    title: "Double Splat Hash Size",
    description: "What does the following Ruby code print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Splat and Double Splat Arguments",
    Option1: "3",
    Option2: "6",
    Option3: "0",
    Option4: "error",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `def f(**opts)
  opts.size
end
puts f(a: 1, b: 2, c: 3)`,
    snippetLang: "ruby",
  },
  {
    title: "Method Scope Shadowing",
    description: "What does the following Ruby code print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Variable Scope",
    Option1: "10\n10",
    Option2: "5\n10",
    Option3: "10\n5",
    Option4: "5\n5",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `x = 10
def m(x)
  x * 2
end
puts m(5)
puts x`,
    snippetLang: "ruby",
  },

  // Hard (4)
  {
    title: "Memoized Fibonacci Output",
    description: "What does the following Ruby code print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Return Values",
    Option1: "8",
    Option2: "13",
    Option3: "5",
    Option4: "21",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `def fib(n, memo = {})
  return 1 if n <= 2
  memo[n] ||= fib(n - 1, memo) + fib(n - 2, memo)
end
puts fib(6)`,
    snippetLang: "ruby",
  },
  {
    title: "Closure Captures Outer Local",
    description: "What does the following Ruby code print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Variable Scope",
    Option1: "7",
    Option2: "6",
    Option3: "1",
    Option4: "3",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `def outer
  x = 1
  [1, 2, 3].each do |i|
    x += i
  end
  x
end
puts outer`,
    snippetLang: "ruby",
  },
  {
    title: "Splat Captures Rest Args",
    description: "What does the following Ruby code print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Splat and Double Splat Arguments",
    Option1: "12",
    Option2: "15",
    Option3: "5",
    Option4: "0",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `def m(a, b, *rest)
  rest.sum
end
puts m(1, 2, 3, 4, 5)`,
    snippetLang: "ruby",
  },
  {
    title: "Double Splat Key Sorting",
    description: "What does the following Ruby code print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Keyword Arguments",
    Option1: "app:env,host,port",
    Option2: "app:host,port,env",
    Option3: "app:3000,x,prod",
    Option4: "app:",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `def config(name, **opts)
  "#{name}:#{opts.keys.sort.join(",")}"
end
puts config("app", port: 3000, host: "x", env: "prod")`,
    snippetLang: "ruby",
  },
];

const d = String(DAY).padStart(2, "0");
writeFileSync(
  `scripts/ruby-programming/data/day-${d}.code.json`,
  JSON.stringify(
    { day: DAY, topics: [{ name: TOPIC, subtopics: SUBTOPICS }], questions },
    null,
    2
  )
);
writeFileSync(
  `scripts/ruby-programming/data/day-${d}.mcq.json`,
  JSON.stringify({ day: DAY, questions: mcqs }, null, 2)
);
console.log("wrote day", DAY);
