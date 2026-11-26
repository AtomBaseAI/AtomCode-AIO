import { writeFileSync } from "node:fs";

const DAY = 10;
const TOPIC = "Symbols and Ranges";
const SUBTOPICS = [
  "Symbols vs Strings",
  "Symbol Use Cases",
  "Inclusive Ranges (..)",
  "Exclusive Ranges (...)",
  "Iteration on Ranges",
  "Range Methods",
];

/* ──────────────────────────────────────────────────────────────
   DAY 10 — Symbols and Ranges
   20 code questions: 6 easy-basic + 4 easy-scenario +
                       6 medium-scenario + 4 hard-scenario
   20 MCQs:           10 easy + 6 medium + 4 hard
   ────────────────────────────────────────────────────────────── */

const questions = [
  /* ── EASY BASIC (6) ─────────────────────────────────────────── */
  {
    title: "Symbol String Cast",
    description:
      "Read a symbol name from stdin, build a Symbol object from it, then print its String representation.\n\nInput Format:\nA single line containing a symbol name (lowercase letters only).\n\nOutput Format:\nThe string form of the symbol (no leading colon).\n\nConstraints:\n1 <= name length <= 30",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Symbols vs Strings",
    sampleinput1: "hello",
    sampleoutput1: "hello",
    sampleinput2: "ruby",
    sampleoutput2: "ruby",
    input1: "abc",
    output1: "abc",
    input2: "active",
    output2: "active",
    input3: "x",
    output3: "x",
    inputconstrains: "1 <= name length <= 30",
    blacklist: "",
    whitelist: "",
    sourcecode: `name = gets.chomp
sym = name.to_sym
puts sym.to_s`,
  },
  {
    title: "String to Symbol Cast",
    description:
      "Read a string from stdin and print its Symbol form so the leading colon is visible.\n\nInput Format:\nA single line containing one word (lowercase letters only).\n\nOutput Format:\nThe Symbol form including a leading colon, e.g. \":hello\".\n\nConstraints:\n1 <= word length <= 30",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Symbols vs Strings",
    sampleinput1: "hello",
    sampleoutput1: ":hello",
    sampleinput2: "ruby",
    sampleoutput2: ":ruby",
    input1: "abc",
    output1: ":abc",
    input2: "active",
    output2: ":active",
    input3: "x",
    output3: ":x",
    inputconstrains: "1 <= word length <= 30",
    blacklist: "",
    whitelist: "",
    sourcecode: `name = gets.chomp
puts name.to_sym.inspect`,
  },
  {
    title: "Inclusive Range Printer",
    description:
      "Read two integers a and b and print every integer in the inclusive range a..b, one per line.\n\nInput Format:\nA single line containing two space-separated integers a and b.\n\nOutput Format:\nEach integer from a to b (inclusive) on its own line.\n\nConstraints:\n-1000 <= a <= b <= 1000",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Inclusive Ranges (..)",
    sampleinput1: "1 5",
    sampleoutput1: "1\n2\n3\n4\n5",
    sampleinput2: "3 5",
    sampleoutput2: "3\n4\n5",
    input1: "0 2",
    output1: "0\n1\n2",
    input2: "10 12",
    output2: "10\n11\n12",
    input3: "5 7",
    output3: "5\n6\n7",
    inputconstrains: "-1000 <= a <= b <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `a, b = gets.split.map(&:to_i)
(a..b).each { |n| puts n }`,
  },
  {
    title: "Exclusive Range Printer",
    description:
      "Read two integers a and b and print every integer in the exclusive range a...b (b is excluded), one per line.\n\nInput Format:\nA single line containing two space-separated integers a and b.\n\nOutput Format:\nEach integer from a up to but not including b, on its own line.\n\nConstraints:\n-1000 <= a < b <= 1000",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Exclusive Ranges (...)",
    sampleinput1: "1 5",
    sampleoutput1: "1\n2\n3\n4",
    sampleinput2: "3 5",
    sampleoutput2: "3\n4",
    input1: "0 3",
    output1: "0\n1\n2",
    input2: "10 13",
    output2: "10\n11\n12",
    input3: "5 6",
    output3: "5",
    inputconstrains: "-1000 <= a < b <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `a, b = gets.split.map(&:to_i)
(a...b).each { |n| puts n }`,
  },
  {
    title: "Range Size Calculator",
    description:
      "Read two integers a and b and print how many integers the inclusive range a..b contains.\n\nInput Format:\nA single line containing two space-separated integers a and b.\n\nOutput Format:\nAn integer — the size of the range.\n\nConstraints:\n-1000 <= a <= b <= 1000",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Range Methods",
    sampleinput1: "1 5",
    sampleoutput1: "5",
    sampleinput2: "0 0",
    sampleoutput2: "1",
    input1: "10 12",
    output1: "3",
    input2: "1 100",
    output2: "100",
    input3: "5 9",
    output3: "5",
    inputconstrains: "-1000 <= a <= b <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `a, b = gets.split.map(&:to_i)
puts (a..b).size`,
  },
  {
    title: "Range Maximum Finder",
    description:
      "Read two integers a and b and print the maximum value of the inclusive range a..b using a Range method.\n\nInput Format:\nA single line containing two space-separated integers a and b.\n\nOutput Format:\nAn integer — the maximum value in the range a..b.\n\nConstraints:\n-1000 <= a <= b <= 1000",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Range Methods",
    sampleinput1: "1 5",
    sampleoutput1: "5",
    sampleinput2: "10 20",
    sampleoutput2: "20",
    input1: "0 0",
    output1: "0",
    input2: "5 9",
    output2: "9",
    input3: "-3 -1",
    output3: "-1",
    inputconstrains: "-1000 <= a <= b <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `a, b = gets.split.map(&:to_i)
puts (a..b).max`,
  },

  /* ── EASY SCENARIO (4) ──────────────────────────────────────── */
  {
    title: "Status Code Symbol Printer",
    description:
      "A traffic light controller maps numeric codes to status symbols. Read an integer code (1, 2 or 3) and print the matching status string (\"active\", \"paused\" or \"stopped\"). Use a case/when that yields symbols internally.\n\nInput Format:\nA single line containing an integer code.\n\nOutput Format:\nThe status string corresponding to the code.\n\nConstraints:\ncode is one of 1, 2 or 3",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Symbol Use Cases",
    sampleinput1: "1",
    sampleoutput1: "active",
    sampleinput2: "2",
    sampleoutput2: "paused",
    input1: "3",
    output1: "stopped",
    input2: "1",
    output2: "active",
    input3: "2",
    output3: "paused",
    inputconstrains: "code in {1, 2, 3}",
    blacklist: "",
    whitelist: "",
    sourcecode: `code = gets.to_i
status = case code
when 1 then :active
when 2 then :paused
when 3 then :stopped
else :unknown
end
puts status.to_s`,
  },
  {
    title: "Page Range Sum",
    description:
      "A paginator totals the page numbers in a chapter. Read two integers a and b and print the sum of all integers in the inclusive range a..b.\n\nInput Format:\nA single line containing two space-separated integers a and b.\n\nOutput Format:\nAn integer — the sum a + (a+1) + ... + b.\n\nConstraints:\n-1000 <= a <= b <= 1000",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Inclusive Ranges (..)",
    sampleinput1: "1 5",
    sampleoutput1: "15",
    sampleinput2: "1 100",
    sampleoutput2: "5050",
    input1: "0 5",
    output1: "15",
    input2: "10 10",
    output2: "10",
    input3: "1 10",
    output3: "55",
    inputconstrains: "-1000 <= a <= b <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `a, b = gets.split.map(&:to_i)
total = 0
(a..b).each { |n| total += n }
puts total`,
  },
  {
    title: "Skip Last Index Iterator",
    description:
      "A loop utility prints every index from 1 up to but not including n. Read n and print the integers 1...n, one per line.\n\nInput Format:\nA single line containing an integer n.\n\nOutput Format:\nEach integer from 1 to n-1 (inclusive) on its own line.\n\nConstraints:\n2 <= n <= 1000",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Exclusive Ranges (...)",
    sampleinput1: "5",
    sampleoutput1: "1\n2\n3\n4",
    sampleinput2: "3",
    sampleoutput2: "1\n2",
    input1: "2",
    output1: "1",
    input2: "10",
    output2: "1\n2\n3\n4\n5\n6\n7\n8\n9",
    input3: "4",
    output3: "1\n2\n3",
    inputconstrains: "2 <= n <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = gets.to_i
(1...n).each { |i| puts i }`,
  },
  {
    title: "Symbol Lookup in List",
    description:
      "A small palette tool checks whether a color symbol is registered. Read a color name, convert it to a Symbol, then print \"yes\" if it is in the palette [:red, :green, :blue] and \"no\" otherwise.\n\nInput Format:\nA single line containing a color name (lowercase letters only).\n\nOutput Format:\nThe string \"yes\" or \"no\".\n\nConstraints:\n1 <= name length <= 30",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Symbol Use Cases",
    sampleinput1: "red",
    sampleoutput1: "yes",
    sampleinput2: "yellow",
    sampleoutput2: "no",
    input1: "green",
    output1: "yes",
    input2: "blue",
    output2: "yes",
    input3: "purple",
    output3: "no",
    inputconstrains: "1 <= name length <= 30",
    blacklist: "",
    whitelist: "",
    sourcecode: `name = gets.chomp
target = name.to_sym
colors = [:red, :green, :blue]
puts colors.include?(target) ? "yes" : "no"`,
  },

  /* ── MEDIUM SCENARIO (6) ────────────────────────────────────── */
  {
    title: "Page Range Even Sum",
    description:
      "A report generator sums the even page numbers in a chapter. Read two integers a and b, iterate the inclusive range a..b with each, and print the sum of even numbers in that range. Do not use step, select, reject or sum.\n\nInput Format:\nA single line containing two space-separated integers a and b.\n\nOutput Format:\nAn integer — the sum of even numbers in a..b.\n\nConstraints:\n-1000 <= a <= b <= 1000",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Inclusive Ranges (..)",
    sampleinput1: "1 5",
    sampleoutput1: "6",
    sampleinput2: "2 8",
    sampleoutput2: "20",
    input1: "1 10",
    output1: "30",
    input2: "3 3",
    output2: "0",
    input3: "4 4",
    output3: "4",
    inputconstrains: "-1000 <= a <= b <= 1000",
    blacklist: ".step,.select,.reject,.sum",
    whitelist: "each,def ,to_i",
    sourcecode: `def even_sum(a, b)
  total = 0
  (a..b).each do |x|
    if x % 2 == 0
      total += x
    end
  end
  total
end

a, b = gets.split.map(&:to_i)
puts even_sum(a, b)`,
  },
  {
    title: "Exclusive Range Skip Last",
    description:
      "A book club lists the books they will read this month — every ID from a up to but not including b. Build the list manually with each and join it as a comma-separated string. Do not use step, first, drop or last.\n\nInput Format:\nA single line containing two space-separated integers a and b.\n\nOutput Format:\nA comma-separated list of the integers in a...b.\n\nConstraints:\n-1000 <= a < b <= 1000",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Exclusive Ranges (...)",
    sampleinput1: "1 5",
    sampleoutput1: "1,2,3,4",
    sampleinput2: "3 6",
    sampleoutput2: "3,4,5",
    input1: "0 3",
    output1: "0,1,2",
    input2: "10 13",
    output2: "10,11,12",
    input3: "5 6",
    output3: "5",
    inputconstrains: "-1000 <= a < b <= 1000",
    blacklist: ".step,.first,.drop,.last",
    whitelist: "each,def ,...",
    sourcecode: `def exclusive_range(a, b)
  result = []
  (a...b).each { |x| result << x }
  result
end

a, b = gets.split.map(&:to_i)
puts exclusive_range(a, b).join(",")`,
  },
  {
    title: "Symbol Status Lookup",
    description:
      "A status registry exposes the symbols :active, :paused and :stopped. Read a status name (string), convert it to a Symbol, then search the registry manually with each (do not use include?, index or member?) and print \"found\" or \"not found\".\n\nInput Format:\nA single line containing a status name.\n\nOutput Format:\nThe string \"found\" if the symbol exists in the registry, otherwise \"not found\".\n\nConstraints:\n1 <= name length <= 30",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Symbol Use Cases",
    sampleinput1: "active",
    sampleoutput1: "found",
    sampleinput2: "running",
    sampleoutput2: "not found",
    input1: "paused",
    output1: "found",
    input2: "stopped",
    output2: "found",
    input3: "idle",
    output3: "not found",
    inputconstrains: "1 <= name length <= 30",
    blacklist: ".include?,.index,.member?",
    whitelist: "each,def ,to_sym",
    sourcecode: `def status_lookup(name)
  target = name.to_sym
  list = [:active, :paused, :stopped]
  found = false
  list.each do |s|
    if s == target
      found = true
      break
    end
  end
  found ? "found" : "not found"
end

name = gets.chomp
puts status_lookup(name)`,
  },
  {
    title: "Range Min Max Finder",
    description:
      "A statistics helper computes both ends of an inclusive range using Range methods. Read two integers a and b and print the minimum and maximum values of the range a..b separated by a space. Do not use sort, first or last.\n\nInput Format:\nA single line containing two space-separated integers a and b.\n\nOutput Format:\nTwo integers separated by a single space — the min and the max.\n\nConstraints:\n-1000 <= a <= b <= 1000",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Range Methods",
    sampleinput1: "1 5",
    sampleoutput1: "1 5",
    sampleinput2: "10 20",
    sampleoutput2: "10 20",
    input1: "0 0",
    output1: "0 0",
    input2: "5 9",
    output2: "5 9",
    input3: "-3 -1",
    output3: "-3 -1",
    inputconstrains: "-1000 <= a <= b <= 1000",
    blacklist: ".sort,.first,.last",
    whitelist: ".min,.max,def ,puts",
    sourcecode: `def range_stats(a, b)
  r = (a..b)
  "#{r.min} #{r.max}"
end

a, b = gets.split.map(&:to_i)
puts range_stats(a, b)`,
  },
  {
    title: "Step Range Printer",
    description:
      "A metronome ticks at a fixed step within a beat range. Read three integers a, b and s and print every s-th integer in the inclusive range a..b, space-separated. Use Range#step; do not use select, reject or map.\n\nInput Format:\nA single line containing three space-separated integers a, b and s.\n\nOutput Format:\nSpace-separated integers that the step iteration yields.\n\nConstraints:\n-1000 <= a <= b <= 1000; 1 <= s <= 1000",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Iteration on Ranges",
    sampleinput1: "1 10 2",
    sampleoutput1: "1 3 5 7 9",
    sampleinput2: "0 10 5",
    sampleoutput2: "0 5 10",
    input1: "1 9 3",
    output1: "1 4 7",
    input2: "2 10 4",
    output2: "2 6 10",
    input3: "5 5 1",
    output3: "5",
    inputconstrains: "-1000 <= a <= b <= 1000; 1 <= s <= 1000",
    blacklist: ".select,.reject,.map",
    whitelist: ".step,def ,join",
    sourcecode: `def step_range(a, b, s)
  result = []
  (a..b).step(s) { |x| result << x }
  result
end

a, b, s = gets.split
puts step_range(a.to_i, b.to_i, s.to_i).join(" ")`,
  },
  {
    title: "Symbol Hash Key Lookup",
    description:
      "A login table maps username symbols to user ids. Read a username string, convert it to a Symbol and search the hash manually with each (do not use include?, fetch, dig or Hash.new with default). Print the user id when found, otherwise \"missing\".\n\nInput Format:\nA single line containing a username (lowercase letters only).\n\nOutput Format:\nThe user id (integer) for the username, or \"missing\".\n\nConstraints:\n1 <= username length <= 30",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Symbol Use Cases",
    sampleinput1: "alice",
    sampleoutput1: "1",
    sampleinput2: "bob",
    sampleoutput2: "2",
    input1: "carol",
    output1: "3",
    input2: "dave",
    output2: "missing",
    input3: "ALICE",
    output3: "missing",
    inputconstrains: "1 <= username length <= 30",
    blacklist: "Hash.new,.fetch,.dig",
    whitelist: "to_sym,each,def ",
    sourcecode: `def lookup(name)
  table = { alice: 1, bob: 2, carol: 3 }
  target = name.to_sym
  result = "missing"
  table.each do |k, v|
    if k == target
      result = v
      break
    end
  end
  result
end

name = gets.chomp
puts lookup(name)`,
  },

  /* ── HARD SCENARIO (4) ──────────────────────────────────────── */
  {
    title: "Range Palindrome Prime Counter",
    description:
      "A number theorist counts integers in a range that are both prime and palindromic (read the same forwards and backwards). Read two integers a and b and iterate the inclusive range with each. Implement primality and palindrome checks manually with while loops; do not use Prime, prime?, select or count.\n\nInput Format:\nA single line containing two space-separated integers a and b.\n\nOutput Format:\nAn integer — the number of palindrome primes in a..b.\n\nConstraints:\n1 <= a <= b <= 10000",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Range Methods",
    sampleinput1: "1 20",
    sampleoutput1: "5",
    sampleinput2: "10 50",
    sampleoutput2: "1",
    input1: "1 10",
    output1: "4",
    input2: "1 11",
    output2: "5",
    input3: "50 100",
    output3: "0",
    inputconstrains: "1 <= a <= b <= 10000",
    blacklist: "Prime,prime?,.select,.count",
    whitelist: "each,def ,while ",
    sourcecode: `def is_prime(n)
  return false if n < 2
  i = 2
  while i * i <= n
    return false if n % i == 0
    i += 1
  end
  true
end

def is_palindrome(n)
  s = n.to_s
  i = 0
  while i < s.length / 2
    if s[i] != s[s.length - 1 - i]
      return false
    end
    i += 1
  end
  true
end

def count_palindrome_primes(a, b)
  count = 0
  (a..b).each do |n|
    if is_prime(n) && is_palindrome(n)
      count += 1
    end
  end
  count
end

a, b = gets.split.map(&:to_i)
puts count_palindrome_primes(a, b)`,
  },
  {
    title: "Symbol Frequency Tally",
    description:
      "A tag analyzer reads a line of words, converts each to a Symbol, and prints each distinct symbol with its frequency sorted alphabetically by the symbol's string form. Implement counting manually with each_char; do not use tally, group_by, count or inject.\n\nInput Format:\nA single line containing words separated by single spaces.\n\nOutput Format:\nOne line per distinct symbol: \"<symbol> <count>\" sorted alphabetically by the symbol's string form.\n\nConstraints:\n1 <= line length <= 500",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Symbol Use Cases",
    sampleinput1: "apple apple banana",
    sampleoutput1: "apple 2\nbanana 1",
    sampleinput2: "red green red blue red",
    sampleoutput2: "blue 1\ngreen 1\nred 3",
    input1: "a b a",
    output1: "a 2\nb 1",
    input2: "x y z x y x",
    output2: "x 3\ny 2\nz 1",
    input3: "cat cat cat",
    output3: "cat 3",
    inputconstrains: "1 <= line length <= 500",
    blacklist: "tally,group_by,.count,inject",
    whitelist: "to_sym,each,def ,sort",
    sourcecode: `def gather_symbols(line)
  counts = {}
  word = ""
  line.each_char do |c|
    if c == " "
      unless word.empty?
        sym = word.to_sym
        counts[sym] = (counts[sym] || 0) + 1
        word = ""
      end
    else
      word += c
    end
  end
  unless word.empty?
    sym = word.to_sym
    counts[sym] = (counts[sym] || 0) + 1
  end
  counts
end

line = gets.chomp
counts = gather_symbols(line)
result = counts.map { |k, v| [k, v] }.sort { |a, b| a[0].to_s <=> b[0].to_s }
result.each do |sym, n|
  puts "#{sym} #{n}"
end`,
  },
  {
    title: "Range Sum of Squares Filter",
    description:
      "An energy calculator sums the squares of integers in a range that are divisible by a given factor. Read three integers a, b and k and print the sum of squares (n*n) of integers n in a..b where n is divisible by k. Iterate with each on the inclusive range; do not use select, reject, sum, Math methods or the ** operator.\n\nInput Format:\nA single line containing three space-separated integers a, b and k.\n\nOutput Format:\nAn integer — the filtered sum of squares.\n\nConstraints:\n-1000 <= a <= b <= 1000; 1 <= k <= 1000",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Inclusive Ranges (..)",
    sampleinput1: "1 5 1",
    sampleoutput1: "55",
    sampleinput2: "1 10 2",
    sampleoutput2: "220",
    input1: "1 5 2",
    output1: "20",
    input2: "3 9 3",
    output2: "126",
    input3: "1 1 1",
    output3: "1",
    inputconstrains: "-1000 <= a <= b <= 1000; 1 <= k <= 1000",
    blacklist: ".select,.reject,.sum,Math.,**",
    whitelist: "each,def ,(a..b)",
    sourcecode: `def sum_of_squares(a, b, k)
  total = 0
  (a..b).each do |n|
    if n % k == 0
      total += n * n
    end
  end
  total
end

a, b, k = gets.split.map(&:to_i)
puts sum_of_squares(a, b, k)`,
  },
  {
    title: "Exclusive Range Interval Intersector",
    description:
      "A scheduler computes the overlap of two time windows represented as exclusive integer ranges (a...b) and (c...d). Read four integers and print the integers that fall in both ranges, space-separated, in ascending order. Iterate the first range with each and test membership in the second range using include?; do not use Set, intersection, & or union.\n\nInput Format:\nA single line containing four space-separated integers a, b, c and d.\n\nOutput Format:\nSpace-separated integers in the intersection (ascending). If the intersection is empty, print nothing (the test cases always have a non-empty intersection).\n\nConstraints:\n-1000 <= a < b <= 1000; -1000 <= c < d <= 1000",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Exclusive Ranges (...)",
    sampleinput1: "1 5 3 7",
    sampleoutput1: "3 4",
    sampleinput2: "1 10 5 15",
    sampleoutput2: "5 6 7 8 9",
    input1: "0 5 0 3",
    output1: "0 1 2",
    input2: "1 8 5 12",
    output2: "5 6 7",
    input3: "10 20 15 25",
    output3: "15 16 17 18 19",
    inputconstrains: "-1000 <= a < b <= 1000; -1000 <= c < d <= 1000",
    blacklist: "Set,.intersection,.&,.union",
    whitelist: "each,def ,include?,...",
    sourcecode: `def intersect(a, b, c, d)
  result = []
  (a...b).each do |x|
    if (c...d).include?(x)
      result << x
    end
  end
  result
end

a, b, c, d = gets.split.map(&:to_i)
puts intersect(a, b, c, d).join(" ")`,
  },
];

/* ──────────────────────────────────────────────────────────────
   DAY 10 — MCQs (20): 10 easy + 6 medium + 4 hard
   At least 6 must be code snippets (snippetLang: "ruby").
   ────────────────────────────────────────────────────────────── */
const mcqs = [
  /* ── EASY (10) ─────────────────────────────────────────────── */
  {
    title: "Symbol Immutability Property",
    description: "Which of the following is TRUE about symbols in Ruby?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Symbols vs Strings",
    Option1: "Symbols are mutable and can be modified in place",
    Option2: "Symbols are immutable and have a fixed value",
    Option3: "Symbols can be modified with the << operator",
    Option4:
      "Symbols are always slower than strings when used as hash keys",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Inclusive Range Endpoint",
    description:
      "Which Ruby range expression includes both endpoints 1 and 5?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Inclusive Ranges (..)",
    Option1: "(1...5)",
    Option2: "(1..5)",
    Option3: "(1...5).step(1)",
    Option4: "Range.new(1, 5, true)",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Exclusive Range Endpoint",
    description: "What does the Ruby expression (1...5).to_a return?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Exclusive Ranges (...)",
    Option1: "[1, 2, 3, 4, 5]",
    Option2: "[1, 2, 3, 4]",
    Option3: "[2, 3, 4]",
    Option4: "[0, 1, 2, 3, 4]",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Symbol to String Conversion",
    description:
      "What does the Ruby expression :hello.to_s return?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Symbols vs Strings",
    Option1: ":hello",
    Option2: '"hello"',
    Option3: "hello",
    Option4: '":hello"',
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Symbol Common Usage",
    description:
      "What is a common use case for symbols in Ruby?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Symbol Use Cases",
    Option1: "Storing arbitrary user input text",
    Option2: "As hash keys and method names",
    Option3: "For string concatenation",
    Option4: "For floating-point arithmetic",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Range Iteration Method",
    description:
      "Which method iterates over each element of a range in Ruby?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Iteration on Ranges",
    Option1: ".loop",
    Option2: ".each",
    Option3: ".iterate",
    Option4: ".for",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Range Max Method",
    description: "What does the Ruby expression (1..5).max return?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Range Methods",
    Option1: "1",
    Option2: "5",
    Option3: "6",
    Option4: "[1, 2, 3, 4, 5]",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Range Min Method",
    description: "What does the Ruby expression (1..5).min return?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Range Methods",
    Option1: "5",
    Option2: "0",
    Option3: "1",
    Option4: "[1]",
    CorrectOption: 3,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Range Each Output Format",
    description:
      "What does (1..3).each { |n| puts n } print to standard output?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Iteration on Ranges",
    Option1: "1 2 3 on a single line",
    Option2: "1, 2 and 3 each on its own line",
    Option3: "1, 2, 3, 4 each on its own line",
    Option4: "123 with no separators",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "String vs Symbol Mutability",
    description:
      "Which statement correctly compares Ruby strings and symbols?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Symbols vs Strings",
    Option1: "Both strings and symbols are mutable",
    Option2:
      "Strings are mutable while symbols are immutable",
    Option3: "Symbols are mutable while strings are immutable",
    Option4: "Both strings and symbols are immutable",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },

  /* ── MEDIUM (6) — at least some snippets ───────────────────── */
  {
    title: "Range Sum Calculation",
    description: "What is the output of the following Ruby code?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Range Methods",
    Option1: "15",
    Option2: "5",
    Option3: "[1, 2, 3, 4, 5]",
    Option4: "1+2+3+4+5",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `puts (1..5).to_a.sum`,
    snippetLang: "ruby",
  },
  {
    title: "Symbol Equality Check",
    description: "What is the output of the following Ruby code?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Symbols vs Strings",
    Option1: "true",
    Option2: "false",
    Option3: "1",
    Option4: "Error",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `puts (:foo == :foo)`,
    snippetLang: "ruby",
  },
  {
    title: "Exclusive Range Length",
    description: "What is the output of the following Ruby code?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Exclusive Ranges (...)",
    Option1: "5",
    Option2: "4",
    Option3: "6",
    Option4: "3",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `puts (1...5).to_a.length`,
    snippetLang: "ruby",
  },
  {
    title: "Symbol Append Behavior",
    description: "What happens when the following Ruby code runs?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Symbol Use Cases",
    Option1: "s becomes :helloworld",
    Option2: 's becomes "hello world"',
    Option3: "Raises NoMethodError",
    Option4: "Raises TypeError",
    CorrectOption: 3,
    iscodesnippet: true,
    codesnippet: `s = :hello
s << :world`,
    snippetLang: "ruby",
  },
  {
    title: "Symbol Hash Key Benefit",
    description:
      "Why are symbols often preferred over strings as hash keys in Ruby?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Symbol Use Cases",
    Option1:
      "Symbols are mutable so they can be updated after insertion",
    Option2:
      "Symbols are immutable and reused, making lookups efficient",
    Option3: "Symbols automatically convert themselves to integers",
    Option4: "Symbols support regex matching directly",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Range Step Iteration",
    description: "What is the output of the following Ruby code?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Iteration on Ranges",
    Option1: "1,2,3,4,5,6,7,8,9,10",
    Option2: "1,3,5,7,9",
    Option3: "2,4,6,8,10",
    Option4: "1,3,5,7,9,10",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `puts (1..10).step(2).to_a.join(",")`,
    snippetLang: "ruby",
  },

  /* ── HARD (4) — snippets ───────────────────────────────────── */
  {
    title: "Inclusive Range Include Check",
    description: "What is the output of the following Ruby code?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Inclusive Ranges (..)",
    Option1: "true",
    Option2: "false",
    Option3: "3",
    Option4: "1",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `puts (1..5).include?(3)`,
    snippetLang: "ruby",
  },
  {
    title: "Exclusive Range Include Check",
    description: "What is the output of the following Ruby code?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Exclusive Ranges (...)",
    Option1: "true",
    Option2: "false",
    Option3: "5",
    Option4: "nil",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `puts (1...5).include?(5)`,
    snippetLang: "ruby",
  },
  {
    title: "Symbol Hash Key Update",
    description: "What is the output of the following Ruby code?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Symbol Use Cases",
    Option1: "1",
    Option2: "10",
    Option3: ":a",
    Option4: "nil",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `h = {a: 1, b: 2}
h[:a] = 10
puts h[:a]`,
    snippetLang: "ruby",
  },
  {
    title: "Letter Range Length",
    description: "What is the output of the following Ruby code?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Inclusive Ranges (..)",
    Option1: "4",
    Option2: "5",
    Option3: "6",
    Option4: "26",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `puts ('a'..'e').to_a.length`,
    snippetLang: "ruby",
  },
];

const d = String(DAY).padStart(2, "0");
writeFileSync(
  `scripts/ruby-programming/data/day-${d}.code.json`,
  JSON.stringify(
    { day: DAY, topics: [{ name: TOPIC, subtopics: SUBTOPICS }], questions },
    null,
    2,
  ),
);
writeFileSync(
  `scripts/ruby-programming/data/day-${d}.mcq.json`,
  JSON.stringify({ day: DAY, questions: mcqs }, null, 2),
);
console.log("wrote day", DAY);
