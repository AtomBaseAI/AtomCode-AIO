import { writeFileSync } from "node:fs";

const DAY = 5;
const TOPIC = "Loops and Iterators";
const SUBTOPICS = [
  "while Loop",
  "until Loop",
  "for in Loop",
  "times upto downto Iterators",
  "each Iterator",
  "break next and redo",
];

const questions = [
  // ── Easy basic (6) ──────────────────────────────────────────────────────
  {
    title: "Countdown From N With While Loop",
    description: `Print integers from n down to 1, each on its own line, using a while loop.

Input Format:
A single integer n.

Output Format:
n lines, each containing one integer from n down to 1.

Constraints:
1 <= n <= 1000`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "while Loop",
    sampleinput1: "5",
    sampleoutput1: "5\n4\n3\n2\n1",
    sampleinput2: "3",
    sampleoutput2: "3\n2\n1",
    input1: "1",
    output1: "1",
    input2: "10",
    output2: "10\n9\n8\n7\n6\n5\n4\n3\n2\n1",
    input3: "7",
    output3: "7\n6\n5\n4\n3\n2\n1",
    inputconstrains: "1 <= n <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = gets.to_i
i = n
while i >= 1
  puts i
  i -= 1
end
`,
  },
  {
    title: "Sum One To N Using Until",
    description: `Print the sum of integers from 1 to n (inclusive) using an until loop.

Input Format:
A single integer n.

Output Format:
A single integer, the sum 1 + 2 + ... + n.

Constraints:
1 <= n <= 10000`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "until Loop",
    sampleinput1: "5",
    sampleoutput1: "15",
    sampleinput2: "100",
    sampleoutput2: "5050",
    input1: "1",
    output1: "1",
    input2: "10",
    output2: "55",
    input3: "1000",
    output3: "500500",
    inputconstrains: "1 <= n <= 10000",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = gets.to_i
i = 1
sum = 0
until i > n
  sum += i
  i += 1
end
puts sum
`,
  },
  {
    title: "Squares From One To N With For In",
    description: `For each integer i from 1 to n (inclusive), print i squared, using a for in loop.

Input Format:
A single integer n.

Output Format:
n lines, each containing the square of i for i = 1..n.

Constraints:
1 <= n <= 1000`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "for in Loop",
    sampleinput1: "4",
    sampleoutput1: "1\n4\n9\n16",
    sampleinput2: "3",
    sampleoutput2: "1\n4\n9",
    input1: "1",
    output1: "1",
    input2: "5",
    output2: "1\n4\n9\n16\n25",
    input3: "10",
    output3: "1\n4\n9\n16\n25\n36\n49\n64\n81\n100",
    inputconstrains: "1 <= n <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = gets.to_i
for i in 1..n
  puts i * i
end
`,
  },
  {
    title: "Multiples Of Seven With Times",
    description: `Print the first n multiples of 7 (7, 14, 21, ..., 7*n), one per line, using the times iterator.

Input Format:
A single integer n.

Output Format:
n lines, each containing one multiple of 7.

Constraints:
1 <= n <= 1000`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "times upto downto Iterators",
    sampleinput1: "5",
    sampleoutput1: "7\n14\n21\n28\n35",
    sampleinput2: "3",
    sampleoutput2: "7\n14\n21",
    input1: "1",
    output1: "7",
    input2: "10",
    output2: "7\n14\n21\n28\n35\n42\n49\n56\n63\n70",
    input3: "7",
    output3: "7\n14\n21\n28\n35\n42\n49",
    inputconstrains: "1 <= n <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = gets.to_i
n.times do |i|
  puts 7 * (i + 1)
end
`,
  },
  {
    title: "Numbers Five To N With Upto",
    description: `Print integers from 5 up to n (inclusive), each on its own line, using the upto iterator.

Input Format:
A single integer n.

Output Format:
Lines containing integers from 5 to n (inclusive), one per line.

Constraints:
5 <= n <= 1000`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "times upto downto Iterators",
    sampleinput1: "10",
    sampleoutput1: "5\n6\n7\n8\n9\n10",
    sampleinput2: "5",
    sampleoutput2: "5",
    input1: "7",
    output1: "5\n6\n7",
    input2: "8",
    output2: "5\n6\n7\n8",
    input3: "12",
    output3: "5\n6\n7\n8\n9\n10\n11\n12",
    inputconstrains: "5 <= n <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = gets.to_i
5.upto(n) do |i|
  puts i
end
`,
  },
  {
    title: "List Array Elements With Each",
    description: `Read n followed by n space-separated integers. Print each integer on its own line using the each iterator.

Input Format:
First line: integer n.
Second line: n space-separated integers.

Output Format:
n lines, each containing one integer from the input list, in order.

Constraints:
1 <= n <= 1000; -10000 <= value <= 10000`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "each Iterator",
    sampleinput1: "4\n10 20 30 40",
    sampleoutput1: "10\n20\n30\n40",
    sampleinput2: "3\n5 6 7",
    sampleoutput2: "5\n6\n7",
    input1: "1\n99",
    output1: "99",
    input2: "5\n1 2 3 4 5",
    output2: "1\n2\n3\n4\n5",
    input3: "2\n-3 8",
    output3: "-3\n8",
    inputconstrains: "1 <= n <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = gets.to_i
arr = gets.split.map(&:to_i)
arr.each do |x|
  puts x
end
`,
  },

  // ── Easy scenario (4) ────────────────────────────────────────────────────
  {
    title: "Repeat Greeting K Times",
    description: `Mariko is building a bot that welcomes users. Read a single-line greeting g followed by an integer k. Print the greeting k times, each on its own line, using the times iterator.

Input Format:
First line: greeting g (may contain spaces).
Second line: integer k.

Output Format:
k lines, each containing the greeting g.

Constraints:
1 <= k <= 1000`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "times upto downto Iterators",
    sampleinput1: "Hello\n3",
    sampleoutput1: "Hello\nHello\nHello",
    sampleinput2: "Welcome\n2",
    sampleoutput2: "Welcome\nWelcome",
    input1: "Hi\n1",
    output1: "Hi",
    input2: "Good morning\n5",
    output2: "Good morning\nGood morning\nGood morning\nGood morning\nGood morning",
    input3: "Konichiwa\n4",
    output3: "Konichiwa\nKonichiwa\nKonichiwa\nKonichiwa",
    inputconstrains: "1 <= k <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `g = gets.chomp
k = gets.to_i
k.times do
  puts g
end
`,
  },
  {
    title: "Train Stops Announcement",
    description: `A train route has m stops. Read m, then m lines each containing a stop name. Print "Next stop: <name>" for each stop in order, using the each iterator over the collected names.

Input Format:
First line: integer m.
Next m lines: stop names (one per line, may contain spaces).

Output Format:
m lines, each of the form "Next stop: <name>".

Constraints:
1 <= m <= 100`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "each Iterator",
    sampleinput1: "3\nCentral\nPark\nRiverside",
    sampleoutput1: "Next stop: Central\nNext stop: Park\nNext stop: Riverside",
    sampleinput2: "2\nNorth\nSouth",
    sampleoutput2: "Next stop: North\nNext stop: South",
    input1: "1\nTerminal",
    output1: "Next stop: Terminal",
    input2: "4\nA\nB\nC\nD",
    output2: "Next stop: A\nNext stop: B\nNext stop: C\nNext stop: D",
    input3: "2\nKyoto\nOsaka",
    output3: "Next stop: Kyoto\nNext stop: Osaka",
    inputconstrains: "1 <= m <= 100",
    blacklist: "",
    whitelist: "",
    sourcecode: `m = gets.to_i
stops = []
m.times { stops << gets.chomp }
stops.each do |name|
  puts "Next stop: #{name}"
end
`,
  },
  {
    title: "Water Tank Fill Simulation",
    description: `A water tank has capacity C liters. It currently holds R liters. Each minute exactly L liters are added. Using an until loop, print how many minutes elapse until the tank contains at least C liters.

Input Format:
A single line with three space-separated integers C R L.

Output Format:
A single integer, the number of minutes elapsed.

Constraints:
1 <= C <= 100000; 0 <= R <= C; 1 <= L <= 1000`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "until Loop",
    sampleinput1: "100 30 10",
    sampleoutput1: "7",
    sampleinput2: "50 50 5",
    sampleoutput2: "0",
    input1: "10 0 3",
    output1: "4",
    input2: "1000 100 50",
    output2: "18",
    input3: "20 5 7",
    output3: "3",
    inputconstrains: "1 <= C <= 100000; 0 <= R <= C; 1 <= L <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `c, r, l = gets.split.map(&:to_i)
minutes = 0
until r >= c
  r += l
  minutes += 1
end
puts minutes
`,
  },
  {
    title: "Daily Savings Tracker",
    description: `Mei starts with $0 saved. Each day she saves exactly D dollars. Using a while loop, count how many days pass until her total reaches or exceeds her goal G.

Input Format:
A single line with two space-separated integers G D.

Output Format:
A single integer, the number of days needed.

Constraints:
1 <= G <= 1000000; 1 <= D <= 1000`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "while Loop",
    sampleinput1: "100 25",
    sampleoutput1: "4",
    sampleinput2: "50 7",
    sampleoutput2: "8",
    input1: "10 3",
    output1: "4",
    input2: "1000 100",
    output2: "10",
    input3: "1 1",
    output3: "1",
    inputconstrains: "1 <= G <= 1000000; 1 <= D <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `g, d = gets.split.map(&:to_i)
total = 0
days = 0
while total < g
  total += d
  days += 1
end
puts days
`,
  },

  // ── Medium scenario (6) ─────────────────────────────────────────────────
  {
    title: "Inventory Restock Until Threshold",
    description: `A warehouse currently has Q units of a product. The reorder threshold is T units. Each hour the supplier adds R units. Using an until loop (do not use a while loop), print how many hours elapse until the stock reaches or exceeds T.

Input Format:
A single line with three space-separated integers Q T R.

Output Format:
A single integer, the number of hours elapsed.

Constraints:
0 <= Q < T <= 1000000; 1 <= R <= 10000`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "until Loop",
    sampleinput1: "10 50 5",
    sampleoutput1: "8",
    sampleinput2: "0 100 20",
    sampleoutput2: "5",
    input1: "5 25 4",
    output1: "5",
    input2: "30 100 10",
    output2: "7",
    input3: "1 10 3",
    output3: "3",
    inputconstrains: "0 <= Q < T <= 1000000; 1 <= R <= 10000",
    blacklist: "while",
    whitelist: "until ",
    sourcecode: `q, t, r = gets.split.map(&:to_i)
hours = 0
until q >= t
  q += r
  hours += 1
end
puts hours
`,
  },
  {
    title: "FizzBuzz One To N With For In",
    description: `Print the FizzBuzz sequence from 1 to n using a for in loop. Multiples of 3 print "Fizz", of 5 print "Buzz", of both 15 print "FizzBuzz", otherwise print the number. Do not use each, map, times, or step.

Input Format:
A single integer n.

Output Format:
n lines, one entry per line, following FizzBuzz rules.

Constraints:
1 <= n <= 1000`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "for in Loop",
    sampleinput1: "15",
    sampleoutput1: "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz",
    sampleinput2: "5",
    sampleoutput2: "1\n2\nFizz\n4\nBuzz",
    input1: "3",
    output1: "1\n2\nFizz",
    input2: "10",
    output2: "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz",
    input3: "30",
    output3: "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\n16\n17\nFizz\n19\nBuzz\nFizz\n22\n23\nFizz\nBuzz\n26\nFizz\n28\n29\nFizzBuzz",
    inputconstrains: "1 <= n <= 1000",
    blacklist: "each, map, times, step",
    whitelist: "for ",
    sourcecode: `n = gets.to_i
for i in 1..n
  if i % 15 == 0
    puts "FizzBuzz"
  elsif i % 3 == 0
    puts "Fizz"
  elsif i % 5 == 0
    puts "Buzz"
  else
    puts i
  end
end
`,
  },
  {
    title: "Exam Pass Count With Each",
    description: `A teacher has recorded scores of n students. A score of 40 or higher is a pass. Using the each iterator on the scores array, print the count of passing scores. Do not use count, select, filter, or partition.

Input Format:
First line: integer n.
Second line: n space-separated integer scores.

Output Format:
A single integer, the number of passing scores.

Constraints:
1 <= n <= 1000; 0 <= score <= 100`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "each Iterator",
    sampleinput1: "5\n30 40 55 60 25",
    sampleoutput1: "3",
    sampleinput2: "3\n40 39 41",
    sampleoutput2: "2",
    input1: "1\n40",
    output1: "1",
    input2: "4\n10 20 30 39",
    output2: "0",
    input3: "6\n100 50 0 40 75 80",
    output3: "5",
    inputconstrains: "1 <= n <= 1000; 0 <= score <= 100",
    blacklist: "count, select, filter, partition",
    whitelist: "each",
    sourcecode: `n = gets.to_i
scores = gets.split.map(&:to_i)
passes = 0
scores.each do |s|
  passes += 1 if s >= 40
end
puts passes
`,
  },
  {
    title: "Even Numbers One To N With For And Next",
    description: `Print all even numbers from 1 to n (inclusive), one per line, using a for in loop with the next keyword to skip odd values. Do not use step, select, filter, or even?.

Input Format:
A single integer n.

Output Format:
Lines containing even integers from 2 up to n (or n-1 if n is odd), one per line.

Constraints:
2 <= n <= 10000`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "break next and redo",
    sampleinput1: "10",
    sampleoutput1: "2\n4\n6\n8\n10",
    sampleinput2: "7",
    sampleoutput2: "2\n4\n6",
    input1: "2",
    output1: "2",
    input2: "15",
    output2: "2\n4\n6\n8\n10\n12\n14",
    input3: "8",
    output3: "2\n4\n6\n8",
    inputconstrains: "2 <= n <= 10000",
    blacklist: "step, select, filter, even?",
    whitelist: "for , next",
    sourcecode: `n = gets.to_i
for i in 1..n
  next if i % 2 != 0
  puts i
end
`,
  },
  {
    title: "First Multiple Of Seven With Break",
    description: `Read n followed by n space-separated integers. Print the first value in the list that is a multiple of 7, or -1 if no such value exists. Use the each iterator and the break keyword to stop early. Do not use find, detect, select, or first.

Input Format:
First line: integer n.
Second line: n space-separated integers.

Output Format:
A single integer, the first multiple of 7 found, or -1.

Constraints:
1 <= n <= 1000; -10000 <= value <= 10000`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "break next and redo",
    sampleinput1: "5\n7 14 3 21 5",
    sampleoutput1: "7",
    sampleinput2: "4\n1 2 3 4",
    sampleoutput2: "-1",
    input1: "3\n14 21 28",
    output1: "14",
    input2: "5\n3 5 7 9 11",
    output2: "7",
    input3: "6\n10 20 30 40 50 60",
    output3: "-1",
    inputconstrains: "1 <= n <= 1000",
    blacklist: "find, detect, select, first",
    whitelist: "break",
    sourcecode: `n = gets.to_i
arr = gets.split.map(&:to_i)
result = -1
arr.each do |x|
  if x % 7 == 0
    result = x
    break
  end
end
puts result
`,
  },
  {
    title: "Reverse Countdown With Downto",
    description: `Print integers from n down to 1, each on its own line, using the downto iterator. Do not use while, reverse, upto, or step.

Input Format:
A single integer n.

Output Format:
n lines, each containing one integer from n down to 1.

Constraints:
1 <= n <= 1000`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "times upto downto Iterators",
    sampleinput1: "5",
    sampleoutput1: "5\n4\n3\n2\n1",
    sampleinput2: "3",
    sampleoutput2: "3\n2\n1",
    input1: "1",
    output1: "1",
    input2: "10",
    output2: "10\n9\n8\n7\n6\n5\n4\n3\n2\n1",
    input3: "7",
    output3: "7\n6\n5\n4\n3\n2\n1",
    inputconstrains: "1 <= n <= 1000",
    blacklist: "while, reverse, upto, step",
    whitelist: "downto",
    sourcecode: `n = gets.to_i
n.downto(1) do |i|
  puts i
end
`,
  },

  // ── Hard scenario (4) ──────────────────────────────────────────────────
  {
    title: "Prime Factorization With While Loop",
    description: `Read a positive integer n >= 2. Using a while loop, compute its prime factorization and print it on a single line as base^exponent pairs separated by spaces, in ascending order of primes. For example, 60 = 2^2 * 3 * 5 prints "2^2 3^1 5^1". Do not use the Prime library, prime_division, or require.

Input Format:
A single integer n.

Output Format:
A single line of base^exponent pairs separated by single spaces.

Constraints:
2 <= n <= 1000000`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "while Loop",
    sampleinput1: "60",
    sampleoutput1: "2^2 3^1 5^1",
    sampleinput2: "17",
    sampleoutput2: "17^1",
    input1: "2",
    output1: "2^1",
    input2: "100",
    output2: "2^2 5^2",
    input3: "360",
    output3: "2^3 3^2 5^1",
    inputconstrains: "2 <= n <= 1000000",
    blacklist: "Prime, prime_division, require, factor",
    whitelist: "while ",
    sourcecode: `n = gets.to_i
parts = []
d = 2
while d * d <= n
  cnt = 0
  while n % d == 0
    n /= d
    cnt += 1
  end
  if cnt > 0
    parts << "#{d}^#{cnt}"
  end
  d += 1
end
if n > 1
  parts << "#{n}^1"
end
puts parts.join(" ")
`,
  },
  {
    title: "Collatz Sequence Steps To One",
    description: `Read a positive integer n. Generate the Collatz sequence: while n is not 1, if n is even set n = n / 2, otherwise set n = 3 * n + 1. Count the number of steps taken. Print the step count. Do not use recursion, def, or lambda.

Input Format:
A single integer n.

Output Format:
A single integer, the number of steps until n becomes 1.

Constraints:
1 <= n <= 100000`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "while Loop",
    sampleinput1: "6",
    sampleoutput1: "8",
    sampleinput2: "27",
    sampleoutput2: "111",
    input1: "1",
    output1: "0",
    input2: "16",
    output2: "4",
    input3: "7",
    output3: "16",
    inputconstrains: "1 <= n <= 100000",
    blacklist: "recursion, def , lambda",
    whitelist: "while ",
    sourcecode: `n = gets.to_i
steps = 0
while n != 1
  if n.even?
    n = n / 2
  else
    n = 3 * n + 1
  end
  steps += 1
end
puts steps
`,
  },
  {
    title: "Sieve Of Eratosthenes Prime Count",
    description: `Read integer n. Count how many primes are <= n using a Sieve of Eratosthenes. Use the each iterator to count true entries in the sieve. Do not use the Prime library, require, or find.

Input Format:
A single integer n.

Output Format:
A single integer, the count of primes <= n.

Constraints:
2 <= n <= 100000`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "each Iterator",
    sampleinput1: "10",
    sampleoutput1: "4",
    sampleinput2: "20",
    sampleoutput2: "8",
    input1: "2",
    output1: "1",
    input2: "100",
    output2: "25",
    input3: "1000",
    output3: "168",
    inputconstrains: "2 <= n <= 100000",
    blacklist: "Prime, require, find",
    whitelist: "each",
    sourcecode: `n = gets.to_i
sieve = Array.new(n + 1, true)
sieve[0] = false
sieve[1] = false
2.upto(n) do |i|
  next unless sieve[i]
  break if i * i > n
  j = i * i
  while j <= n
    sieve[j] = false
    j += i
  end
end
count = 0
sieve.each do |flag|
  count += 1 if flag
end
puts count
`,
  },
  {
    title: "Number Diamond Pattern With While",
    description: `Read integer n. Print a number diamond of 2*n - 1 rows. Row i (1..n) prints the integers 1 through i separated by spaces. Rows n+1 through 2n-1 print the integers 1 through (2n - i) separated by spaces. Use while loops only. Do not use times, each, or map.

Input Format:
A single integer n.

Output Format:
2*n - 1 lines, each containing space-separated integers from 1 up to the row's maximum value.

Constraints:
1 <= n <= 20`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "while Loop",
    sampleinput1: "3",
    sampleoutput1: "1\n1 2\n1 2 3\n1 2\n1",
    sampleinput2: "1",
    sampleoutput2: "1",
    input1: "2",
    output1: "1\n1 2\n1",
    input2: "4",
    output2: "1\n1 2\n1 2 3\n1 2 3 4\n1 2 3\n1 2\n1",
    input3: "5",
    output3: "1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5\n1 2 3 4\n1 2 3\n1 2\n1",
    inputconstrains: "1 <= n <= 20",
    blacklist: "times, each, map",
    whitelist: "while ",
    sourcecode: `n = gets.to_i
row = 1
while row <= 2 * n - 1
  if row <= n
    k = row
  else
    k = 2 * n - row
  end
  line = []
  c = 1
  while c <= k
    line << c
    c += 1
  end
  puts line.join(" ")
  row += 1
end
`,
  },
];

const mcqs = [
  // Easy (10)
  {
    title: "While Loop Condition",
    description: "Which Ruby loop repeatedly executes its body while the condition is true?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "while Loop",
    Option1: "while",
    Option2: "until",
    Option3: "for",
    Option4: "case",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Times Iterator Output",
    description: "What does the following Ruby code print?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "times upto downto Iterators",
    Option1: "01234",
    Option2: "12345",
    Option3: "5",
    Option4: "0 1 2 3 4",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `5.times { |i| print i }`,
    snippetLang: "ruby",
  },
  {
    title: "Times Block Parameter Start",
    description: "What is the value of i on the first iteration of the block below?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "times upto downto Iterators",
    Option1: "0",
    Option2: "1",
    Option3: "5",
    Option4: "nil",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `5.times { |i| puts i }`,
    snippetLang: "ruby",
  },
  {
    title: "Upto Iterator Purpose",
    description: "Which Ruby iterator runs a block with values increasing from a lower bound to an upper bound (inclusive)?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "times upto downto Iterators",
    Option1: "upto",
    Option2: "downto",
    Option3: "step",
    Option4: "reverse",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Next Keyword Meaning",
    description: "What does the Ruby keyword `next` do inside a loop?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "break next and redo",
    Option1: "Skips the rest of the current iteration and moves to the next one",
    Option2: "Exits the loop entirely",
    Option3: "Restarts the current iteration from the top",
    Option4: "Pauses execution for one second",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Break Keyword Meaning",
    description: "What does the Ruby keyword `break` do inside a loop?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "break next and redo",
    Option1: "Exits the loop immediately",
    Option2: "Skips to the next iteration",
    Option3: "Restarts the loop from the beginning",
    Option4: "Raises an exception",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Each Iterator Output",
    description: "What does the following Ruby code print?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "each Iterator",
    Option1: "1\n2\n3",
    Option2: "123",
    Option3: "[1, 2, 3]",
    Option4: "1 2 3",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `[1, 2, 3].each { |x| puts x }`,
    snippetLang: "ruby",
  },
  {
    title: "Until Loop Condition",
    description: "Which Ruby loop repeatedly executes its body until the condition becomes true?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "until Loop",
    Option1: "until",
    Option2: "while",
    Option3: "for",
    Option4: "loop",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Upto Range Output",
    description: "What does the following Ruby code print?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "times upto downto Iterators",
    Option1: "345",
    Option2: "35",
    Option3: "012",
    Option4: "3 4 5",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `3.upto(5) { |i| print i }`,
    snippetLang: "ruby",
  },
  {
    title: "For In Loop Output",
    description: "What does the following Ruby code print?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "for in Loop",
    Option1: "1\n2\n3",
    Option2: "1\n2",
    Option3: "0\n1\n2\n3",
    Option4: "1 2 3",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `for x in 1..3 do
  puts x
end`,
    snippetLang: "ruby",
  },

  // Medium (6)
  {
    title: "Each With Conditional Sum",
    description: "What does the following Ruby code print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "each Iterator",
    Option1: "6",
    Option2: "10",
    Option3: "4",
    Option4: "0",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `sum = 0
[1, 2, 3, 4].each { |x| sum += x if x.even? }
puts sum`,
    snippetLang: "ruby",
  },
  {
    title: "Break On Condition",
    description: "What does the following Ruby code print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "break next and redo",
    Option1: "5",
    Option2: "10",
    Option3: "0",
    Option4: "4",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `i = 0
while i < 10
  break if i == 5
  i += 1
end
puts i`,
    snippetLang: "ruby",
  },
  {
    title: "Next Inside Times",
    description: "What does the following Ruby code print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "break next and redo",
    Option1: "0-12-",
    Option2: "012",
    Option3: "01-2-",
    Option4: "0-1-2-",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `3.times do |i|
  print i
  next if i == 1
  print "-"
end`,
    snippetLang: "ruby",
  },
  {
    title: "For In With Next Skip",
    description: "What does the following Ruby code print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "for in Loop",
    Option1: "24",
    Option2: "135",
    Option3: "12345",
    Option4: "2 4",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `for x in 1..5
  next if x.odd?
  print x
end`,
    snippetLang: "ruby",
  },
  {
    title: "Upto Building Array",
    description: "What is the value of arr after the following code runs?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "times upto downto Iterators",
    Option1: "[6, 8, 10]",
    Option2: "[2, 4, 6]",
    Option3: "[3, 4, 5]",
    Option4: "[6, 8, 10, 12]",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `arr = []
3.upto(5) { |i| arr << i * 2 }`,
    snippetLang: "ruby",
  },
  {
    title: "Until Loop Terminal Value",
    description: "What does the following Ruby code print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "until Loop",
    Option1: "3",
    Option2: "0",
    Option3: "2",
    Option4: "nil",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `n = 0
until n >= 3
  n += 1
end
puts n`,
    snippetLang: "ruby",
  },

  // Hard (4)
  {
    title: "First Match With Break",
    description: "What does the following Ruby code print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "break next and redo",
    Option1: "2",
    Option2: "4",
    Option3: "1",
    Option4: "nil",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `arr = [1, 2, 3, 4, 5]
result = nil
arr.each do |x|
  if x % 2 == 0
    result = x
    break
  end
end
puts result`,
    snippetLang: "ruby",
  },
  {
    title: "While Accumulator Total",
    description: "What is the value of total after the following code runs?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "while Loop",
    Option1: "10",
    Option2: "6",
    Option3: "4",
    Option4: "11",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `total = 0
i = 1
while i <= 4
  total += i
  i += 1
end`,
    snippetLang: "ruby",
  },
  {
    title: "Downto Builds Reversed List",
    description: "What does the following Ruby code print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "times upto downto Iterators",
    Option1: "3,2,1",
    Option2: "1,2,3",
    Option3: "321",
    Option4: "1,2,3,4",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `result = []
3.downto(1) do |i|
  result << i
end
puts result.join(",")`,
    snippetLang: "ruby",
  },
  {
    title: "Nested Times Break Count",
    description: "What does the following Ruby code print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "break next and redo",
    Option1: "10",
    Option2: "25",
    Option3: "15",
    Option4: "5",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `count = 0
5.times do |i|
  5.times do |j|
    break if j >= i
    count += 1
  end
end
puts count`,
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
