/**
 * AtomCode — Ruby Programming — Day 8 builder.
 * Topic: Hashes.
 *
 * Subtopics covered:
 *  - Hash Creation and Initialization
 *  - Hash Access
 *  - Hash Iteration
 *  - Hash Methods
 *  - Default Values and Blocks
 *  - Nested Hashes
 *
 * Day 8 = hash manipulation. Students learn {a: 1, b: 2} literals, h[:a]
 * access, h.each iteration, keys/values/merge methods, Hash.new(0) default
 * values, and nested hashes. Medium/hard questions force students to
 * implement these transformations manually by blacklisting the convenience
 * methods.
 */

import { writeFileSync } from "node:fs";

const DAY = 8;
const TOPIC = "Hashes";
const SUBTOPICS = [
  "Hash Creation and Initialization",
  "Hash Access",
  "Hash Iteration",
  "Hash Methods",
  "Default Values and Blocks",
  "Nested Hashes",
];

interface CodeQuestion {
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
}

interface MCQ {
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
}

/* ───────────────────────── DAY 8 CODE QUESTIONS ───────────────────────── */

const questions: CodeQuestion[] = [
  /* ───── EASY · BASIC (6) ───── */
  {
    title: "Create Hash From Pairs",
    description:
      "Read N key-value pairs (one pair per line, separated by a space) into a hash and print all the keys separated by single spaces in insertion order.\n\nInput Format:\nLine 1: integer N.\nNext N lines: a key and a value separated by a space.\n\nOutput Format:\nOne line of N space-separated keys.\n\nConstraints:\n1 <= N <= 1000, 1 <= key length <= 20, 1 <= value length <= 20.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Hash Creation and Initialization",
    sampleinput1: "3\napple 5\nbanana 3\ncherry 7",
    sampleoutput1: "apple banana cherry",
    sampleinput2: "2\nx 10\ny 20",
    sampleoutput2: "x y",
    input1: "1\nred 1",
    output1: "red",
    input2: "4\na 1\nb 2\nc 3\nd 4",
    output2: "a b c d",
    input3: "2\nfoo bar\nbaz qux",
    output3: "foo baz",
    inputconstrains: "1 <= N <= 1000, 1 <= key length <= 20",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = gets.to_i
h = {}
n.times do
  k, v = gets.split
  h[k] = v
end
puts h.keys.join(" ")\n`,
  },
  {
    title: "Hash Value Lookup",
    description:
      "Read N key-value pairs into a hash, then read a query key. Print the corresponding value, or 'Not Found' if the key is absent.\n\nInput Format:\nLine 1: integer N.\nNext N lines: a key and a value separated by a space.\nLast line: the query key.\n\nOutput Format:\nA single line: the value, or 'Not Found'.\n\nConstraints:\n1 <= N <= 1000, 1 <= key length <= 20.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Hash Access",
    sampleinput1: "3\napple red\nbanana yellow\ncherry red\nbanana",
    sampleoutput1: "yellow",
    sampleinput2: "2\nx 1\ny 2\nz",
    sampleoutput2: "Not Found",
    input1: "1\nred apple\nred",
    output1: "apple",
    input2: "3\nfoo 10\nbar 20\nbaz 30\nfoo",
    output2: "10",
    input3: "2\nx 1\ny 2\nx",
    output3: "1",
    inputconstrains: "1 <= N <= 1000, 1 <= key length <= 20",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = gets.to_i
h = {}
n.times do
  k, v = gets.split
  h[k] = v
end
key = gets.chomp
puts h[key] || "Not Found"\n`,
  },
  {
    title: "Hash Values Listing",
    description:
      "Read N key-value pairs into a hash and print all the values separated by single spaces in insertion order.\n\nInput Format:\nLine 1: integer N.\nNext N lines: a key and a value separated by a space.\n\nOutput Format:\nOne line of N space-separated values.\n\nConstraints:\n1 <= N <= 1000, 1 <= key length <= 20.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Hash Methods",
    sampleinput1: "3\napple 5\nbanana 3\ncherry 7",
    sampleoutput1: "5 3 7",
    sampleinput2: "2\nx 10\ny 20",
    sampleoutput2: "10 20",
    input1: "1\nred 1",
    output1: "1",
    input2: "4\na 1\nb 2\nc 3\nd 4",
    output2: "1 2 3 4",
    input3: "3\nfoo bar\nbaz qux\nalpha beta",
    output3: "bar qux beta",
    inputconstrains: "1 <= N <= 1000, 1 <= key length <= 20",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = gets.to_i
h = {}
n.times do
  k, v = gets.split
  h[k] = v
end
puts h.values.join(" ")\n`,
  },
  {
    title: "Hash Size Counter",
    description:
      "Read N key-value pairs into a hash and print the number of entries in the hash.\n\nInput Format:\nLine 1: integer N.\nNext N lines: a key and a value separated by a space.\n\nOutput Format:\nA single integer: the hash size.\n\nConstraints:\n1 <= N <= 1000, 1 <= key length <= 20.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Hash Methods",
    sampleinput1: "3\na 1\nb 2\nc 3",
    sampleoutput1: "3",
    sampleinput2: "2\nx 10\ny 20",
    sampleoutput2: "2",
    input1: "1\nred 1",
    output1: "1",
    input2: "5\na 1\nb 2\nc 3\nd 4\ne 5",
    output2: "5",
    input3: "4\nfoo 10\nbar 20\nbaz 30\nqux 40",
    output3: "4",
    inputconstrains: "1 <= N <= 1000, 1 <= key length <= 20",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = gets.to_i
h = {}
n.times do
  k, v = gets.split
  h[k] = v
end
puts h.size\n`,
  },
  {
    title: "Hash Pair Count Above Threshold",
    description:
      "Read N key-value pairs (values are integers) and a threshold X. Print how many pairs have value strictly greater than X.\n\nInput Format:\nLine 1: integer N.\nNext N lines: a key and an integer value separated by a space.\nLast line: integer X.\n\nOutput Format:\nA single integer: the count of pairs with value > X.\n\nConstraints:\n1 <= N <= 1000, 1 <= key length <= 20, -10000 <= value <= 10000.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Hash Iteration",
    sampleinput1: "3\napple 5\nbanana 3\ncherry 7\n4",
    sampleoutput1: "2",
    sampleinput2: "2\nx 10\ny 20\n15",
    sampleoutput2: "1",
    input1: "1\nred 1\n0",
    output1: "1",
    input2: "4\na 1\nb 2\nc 3\nd 4\n2",
    output2: "2",
    input3: "3\nfoo 100\nbar 200\nbaz 300\n150",
    output3: "2",
    inputconstrains: "1 <= N <= 1000, 1 <= key length <= 20",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = gets.to_i
h = {}
n.times do
  k, v = gets.split
  h[k] = v.to_i
end
x = gets.to_i
puts h.values.count { |v| v > x }\n`,
  },
  {
    title: "Hash Has Key Check",
    description:
      "Read N key-value pairs into a hash, then read a query key. Print 'Yes' if the hash contains the key, otherwise 'No'.\n\nInput Format:\nLine 1: integer N.\nNext N lines: a key and a value separated by a space.\nLast line: the query key.\n\nOutput Format:\nA single line: 'Yes' or 'No'.\n\nConstraints:\n1 <= N <= 1000, 1 <= key length <= 20.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Hash Access",
    sampleinput1: "3\na 1\nb 2\nc 3\nb",
    sampleoutput1: "Yes",
    sampleinput2: "3\na 1\nb 2\nc 3\nz",
    sampleoutput2: "No",
    input1: "1\nred 1\nred",
    output1: "Yes",
    input2: "4\nfoo 10\nbar 20\nbaz 30\nqux 40\nmissing",
    output2: "No",
    input3: "2\nx 1\ny 2\ny",
    output3: "Yes",
    inputconstrains: "1 <= N <= 1000, 1 <= key length <= 20",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = gets.to_i
h = {}
n.times do
  k, v = gets.split
  h[k] = v
end
key = gets.chomp
puts h.key?(key) ? "Yes" : "No"\n`,
  },

  /* ───── EASY · SCENARIO (4) ───── */
  {
    title: "Student Grades Lookup",
    description:
      "Teacher Maya keeps student grades in a hash. Read N entries (name and integer score on each line). Read a student name and print their score, or 'Absent' if the student is not in the class.\n\nInput Format:\nLine 1: integer N.\nNext N lines: a student name and an integer score separated by a space.\nLast line: the student name to look up.\n\nOutput Format:\nA single line: the integer score, or 'Absent'.\n\nConstraints:\n1 <= N <= 1000, 1 <= name length <= 20, 0 <= score <= 100.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Hash Access",
    sampleinput1: "3\nalice 85\nbob 72\ncarol 90\nbob",
    sampleoutput1: "72",
    sampleinput2: "3\nalice 85\nbob 72\ncarol 90\ndave",
    sampleoutput2: "Absent",
    input1: "1\nzoe 100\nzoe",
    output1: "100",
    input2: "4\nalex 50\nben 60\ncat 70\ndan 80\ncat",
    output2: "70",
    input3: "3\np1 0\np2 1\np3 2\np1",
    output3: "0",
    inputconstrains: "1 <= N <= 1000, 1 <= name length <= 20, 0 <= score <= 100",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = gets.to_i
grades = {}
n.times do
  name, score = gets.split
  grades[name] = score.to_i
end
target = gets.chomp
puts grades[target] || "Absent"\n`,
  },
  {
    title: "Inventory Stock Query",
    description:
      "A warehouse tracks item quantities in a hash. Read N entries (item name and integer quantity on each line). Read a query item and print its quantity, or 0 if the item is not stocked.\n\nInput Format:\nLine 1: integer N.\nNext N lines: an item name and an integer quantity separated by a space.\nLast line: the query item.\n\nOutput Format:\nA single integer: the quantity, or 0 if the item is not stocked.\n\nConstraints:\n1 <= N <= 1000, 1 <= item length <= 20, 0 <= quantity <= 10000.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Hash Access",
    sampleinput1: "3\npen 50\npencil 30\neraser 20\npencil",
    sampleoutput1: "30",
    sampleinput2: "3\npen 50\npencil 30\neraser 20\nruler",
    sampleoutput2: "0",
    input1: "1\nbox 0\nbox",
    output1: "0",
    input2: "4\napple 100\nbanana 200\ncherry 300\ndate 400\napple",
    output2: "100",
    input3: "2\nx 5\ny 10\nx",
    output3: "5",
    inputconstrains: "1 <= N <= 1000, 1 <= item length <= 20, 0 <= quantity <= 10000",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = gets.to_i
stock = {}
n.times do
  item, qty = gets.split
  stock[item] = qty.to_i
end
query = gets.chomp
puts stock.fetch(query, 0)\n`,
  },
  {
    title: "Word Frequency Builder",
    description:
      "Read a sentence as N space-separated words. Build a frequency hash using Hash.new(0). Read a query word and print how many times it appears (0 if absent).\n\nInput Format:\nLine 1: integer N.\nLine 2: N space-separated words.\nLine 3: the query word.\n\nOutput Format:\nA single integer: the frequency of the query word.\n\nConstraints:\n1 <= N <= 1000, 1 <= each word length <= 20.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Default Values and Blocks",
    sampleinput1: "6\napple banana apple cherry banana apple\napple",
    sampleoutput1: "3",
    sampleinput2: "3\nx y z\nw",
    sampleoutput2: "0",
    input1: "1\nhello\nhello",
    output1: "1",
    input2: "5\nred red red red red\nred",
    output2: "5",
    input3: "4\nfoo bar foo bar\nfoo",
    output3: "2",
    inputconstrains: "1 <= N <= 1000, 1 <= each word length <= 20",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = gets.to_i
words = gets.split
freq = Hash.new(0)
words.each { |w| freq[w] += 1 }
query = gets.chomp
puts freq[query]\n`,
  },
  {
    title: "Employee Department Lookup",
    description:
      "An HR system maps employee IDs to department names. Read N entries (emp_id and department on each line). Read a query emp_id and print their department, or 'Unknown' if the ID is not in the system.\n\nInput Format:\nLine 1: integer N.\nNext N lines: an emp_id and a department name separated by a space.\nLast line: the query emp_id.\n\nOutput Format:\nA single line: the department, or 'Unknown'.\n\nConstraints:\n1 <= N <= 1000, 1 <= emp_id length <= 20, 1 <= department length <= 20.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Hash Access",
    sampleinput1: "3\n101 Sales\n102 Engineering\n103 HR\n102",
    sampleoutput1: "Engineering",
    sampleinput2: "3\n101 Sales\n102 Engineering\n103 HR\n999",
    sampleoutput2: "Unknown",
    input1: "1\n001 IT\n001",
    output1: "IT",
    input2: "4\n1 A\n2 B\n3 C\n4 D\n3",
    output2: "C",
    input3: "2\nemp1 dev\nemp2 ops\nemp2",
    output3: "ops",
    inputconstrains: "1 <= N <= 1000, 1 <= emp_id length <= 20",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = gets.to_i
emps = {}
n.times do
  id, dept = gets.split
  emps[id] = dept
end
query = gets.chomp
puts emps[query] || "Unknown"\n`,
  },

  /* ───── MEDIUM · SCENARIO (6) — blacklist+whitelist, maxscore 20 ───── */
  {
    title: "Merge Inventory Counts",
    description:
      "Two branch stores report stock counts per product. Combine them by summing quantities for matching products and keeping products only present in one store as-is. Print the combined totals sorted alphabetically by product. Implement the combination manually with each; the merge, merge! and update methods are disabled.\n\nInput Format:\nLine 1: integer N1 (number of products in store 1).\nNext N1 lines: product name and integer quantity.\nNext line: integer N2 (number of products in store 2).\nNext N2 lines: product name and integer quantity.\n\nOutput Format:\nOne line per unique product (sorted alphabetically): '<product> <total_qty>'.\n\nConstraints:\n1 <= N1, N2 <= 100, 1 <= product length <= 20, 0 <= quantity <= 10000.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Hash Methods",
    sampleinput1: "3\napple 5\nbanana 2\ncherry 7\n2\napple 3\nbanana 4",
    sampleoutput1: "apple 8\nbanana 6\ncherry 7",
    sampleinput2: "2\nx 1\ny 3\n2\nx 2\ny 4",
    sampleoutput2: "x 3\ny 7",
    input1: "1\napple 10\n3\napple 5\nbanana 3\ncherry 2",
    output1: "apple 15\nbanana 3\ncherry 2",
    input2: "2\napple 5\nbanana 3\n2\ncherry 7\ndate 2",
    output2: "apple 5\nbanana 3\ncherry 7\ndate 2",
    input3: "2\napple 5\nbanana 3\n3\napple 1\nbanana 2\ncherry 4",
    output3: "apple 6\nbanana 5\ncherry 4",
    inputconstrains: "1 <= N1, N2 <= 100, 1 <= product length <= 20",
    blacklist: "merge, merge!, update",
    whitelist: "def , each",
    sourcecode: `def combine_stores(store1, store2)
  totals = {}
  store1.each { |product, qty| totals[product] = qty }
  store2.each do |product, qty|
    if totals.key?(product)
      totals[product] += qty
    else
      totals[product] = qty
    end
  end
  totals
end

n1 = gets.to_i
store1 = {}
n1.times do
  p, q = gets.split
  store1[p] = q.to_i
end

n2 = gets.to_i
store2 = {}
n2.times do
  p, q = gets.split
  store2[p] = q.to_i
end

combined = combine_stores(store1, store2)
combined.keys.sort.each do |p|
  puts "#{p} #{combined[p]}"
end\n`,
  },
  {
    title: "Sort Hash by Value Descending",
    description:
      "Given a hash of products and sales counts, print them sorted by sales count descending, breaking ties by product name ascending. Implement sorting with a while loop (bubble sort). The sort, sort_by, max and min methods are disabled.\n\nInput Format:\nLine 1: integer N.\nNext N lines: product name and integer sales count separated by a space.\n\nOutput Format:\nN lines, each '<product> <sales>' ordered by sales descending (ties by product ascending).\n\nConstraints:\n1 <= N <= 100, 1 <= product length <= 20, 0 <= sales <= 10000.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Hash Methods",
    sampleinput1: "3\napple 5\nbanana 5\ncherry 8",
    sampleoutput1: "cherry 8\napple 5\nbanana 5",
    sampleinput2: "4\nx 10\ny 20\nz 10\nw 30",
    sampleoutput2: "w 30\ny 20\nx 10\nz 10",
    input1: "1\napple 100",
    output1: "apple 100",
    input2: "3\nx 1\ny 2\nz 3",
    output2: "z 3\ny 2\nx 1",
    input3: "4\napple 5\nbanana 3\napple2 5\ncherry 1",
    output3: "apple 5\napple2 5\nbanana 3\ncherry 1",
    inputconstrains: "1 <= N <= 100, 1 <= product length <= 20",
    blacklist: "sort, sort_by, max, min",
    whitelist: "def , while",
    sourcecode: `def rank_by_value(pairs)
  n = pairs.length
  swapped = true
  while swapped
    swapped = false
    (n - 1).times do |i|
      a, b = pairs[i], pairs[i + 1]
      should_swap = false
      if a[1] < b[1]
        should_swap = true
      elsif a[1] == b[1] && a[0] > b[0]
        should_swap = true
      end
      if should_swap
        pairs[i], pairs[i + 1] = pairs[i + 1], pairs[i]
        swapped = true
      end
    end
  end
  pairs
end

n = gets.to_i
pairs = []
n.times do
  p, v = gets.split
  pairs << [p, v.to_i]
end

ranked = rank_by_value(pairs)
ranked.each do |p, v|
  puts "#{p} #{v}"
end\n`,
  },
  {
    title: "Invert Hash Pairs",
    description:
      "Given a hash where every value is unique, swap keys and values so each value becomes the new key. Print the inverted pairs sorted by new key. Implement inversion manually with each; the invert and transform_values methods are disabled.\n\nInput Format:\nLine 1: integer N.\nNext N lines: a key and a value separated by a space (all values are distinct).\n\nOutput Format:\nN lines, each '<value> <key>' sorted by value ascending.\n\nConstraints:\n1 <= N <= 1000, 1 <= key length <= 20, 1 <= value length <= 20, all values distinct.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Hash Methods",
    sampleinput1: "3\na 1\nb 2\nc 3",
    sampleoutput1: "1 a\n2 b\n3 c",
    sampleinput2: "3\nx 100\ny 200\nz 300",
    sampleoutput2: "100 x\n200 y\n300 z",
    input1: "1\nred apple",
    output1: "apple red",
    input2: "4\nk1 v1\nk2 v2\nk3 v3\nk4 v4",
    output2: "v1 k1\nv2 k2\nv3 k3\nv4 k4",
    input3: "2\nname alice\nage 30",
    output3: "30 age\nalice name",
    inputconstrains: "1 <= N <= 1000, all values distinct",
    blacklist: "invert, transform_values",
    whitelist: "def , each",
    sourcecode: `def flip_pairs(pairs)
  result = {}
  pairs.each do |k, v|
    result[v] = k
  end
  result
end

n = gets.to_i
pairs = []
n.times do
  k, v = gets.split
  pairs << [k, v]
end

flipped = flip_pairs(pairs)
flipped.keys.sort.each do |k|
  puts "#{k} #{flipped[k]}"
end\n`,
  },
  {
    title: "Filter Hash Above Threshold",
    description:
      "Given a hash of items with integer quantities, keep only entries whose quantity is strictly greater than a threshold. Print remaining entries sorted by key. Implement filtering manually with each; the select, filter, reject and keep_if methods are disabled.\n\nInput Format:\nLine 1: integer N.\nNext N lines: item name and integer quantity separated by a space.\nLast line: integer threshold.\n\nOutput Format:\nOne line per remaining item (sorted alphabetically): '<item> <qty>'.\n\nConstraints:\n1 <= N <= 1000, 1 <= item length <= 20, 0 <= quantity <= 10000.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Hash Methods",
    sampleinput1: "3\napple 5\nbanana 3\ncherry 7\n4",
    sampleoutput1: "apple 5\ncherry 7",
    sampleinput2: "2\nx 10\ny 5\n8",
    sampleoutput2: "x 10",
    input1: "4\na 10\nb 5\nc 15\nd 3\n6",
    output1: "a 10\nc 15",
    input2: "3\nx 1\ny 2\nz 3\n0",
    output2: "x 1\ny 2\nz 3",
    input3: "5\nm 100\nn 50\no 75\np 60\nq 90\n55",
    output3: "m 100\no 75\np 60\nq 90",
    inputconstrains: "1 <= N <= 1000, 1 <= item length <= 20",
    blacklist: "select, filter, reject, keep_if",
    whitelist: "def , each",
    sourcecode: `def keep_above(pairs, threshold)
  result = {}
  pairs.each do |k, v|
    result[k] = v if v > threshold
  end
  result
end

n = gets.to_i
pairs = []
n.times do
  k, v = gets.split
  pairs << [k, v.to_i]
end
threshold = gets.to_i

kept = keep_above(pairs, threshold)
kept.keys.sort.each do |k|
  puts "#{k} #{kept[k]}"
end\n`,
  },
  {
    title: "Count Values Occurrences",
    description:
      "Given N items each tagged with a category, count how many items belong to each category. Print category counts sorted alphabetically by category, using Hash.new(0) for tallying. The group_by, tally and count methods are disabled.\n\nInput Format:\nLine 1: integer N.\nNext N lines: an item name and a category separated by a space.\n\nOutput Format:\nOne line per unique category (sorted alphabetically): '<category> <count>'.\n\nConstraints:\n1 <= N <= 1000, 1 <= item length <= 20, 1 <= category length <= 20.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Default Values and Blocks",
    sampleinput1: "5\napple fruit\ncarrot veg\nbanana fruit\nspinach veg\norange fruit",
    sampleoutput1: "fruit 3\nveg 2",
    sampleinput2: "3\nx A\ny B\nz A",
    sampleoutput2: "A 2\nB 1",
    input1: "1\napple fruit",
    output1: "fruit 1",
    input2: "4\na X\nb X\nc Y\nd X",
    output2: "X 3\nY 1",
    input3: "6\npen stationery\npencil stationery\nruler stationery\napple fruit\nbanana fruit\ncherry fruit",
    output3: "fruit 3\nstationery 3",
    inputconstrains: "1 <= N <= 1000, 1 <= item length <= 20",
    blacklist: "group_by, tally, count",
    whitelist: "def , each",
    sourcecode: `def bucket_categories(pairs)
  buckets = Hash.new(0)
  pairs.each do |_, cat|
    buckets[cat] += 1
  end
  buckets
end

n = gets.to_i
pairs = []
n.times do
  item, cat = gets.split
  pairs << [item, cat]
end

summary = bucket_categories(pairs)
summary.keys.sort.each do |cat|
  puts "#{cat} #{summary[cat]}"
end\n`,
  },
  {
    title: "Sum Hash Values Manual",
    description:
      "Given a hash of items with integer values, compute the total of all values by iterating with each. Print the total. The sum, reduce and inject methods are disabled.\n\nInput Format:\nLine 1: integer N.\nNext N lines: a key and an integer value separated by a space.\n\nOutput Format:\nA single integer: the sum of all values.\n\nConstraints:\n1 <= N <= 1000, 1 <= key length <= 20, -10000 <= value <= 10000.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Hash Methods",
    sampleinput1: "3\na 10\nb 20\nc 30",
    sampleoutput1: "60",
    sampleinput2: "2\nx 5\ny 7",
    sampleoutput2: "12",
    input1: "1\nz 100",
    output1: "100",
    input2: "4\na -1\nb -2\nc -3\nd -4",
    output2: "-10",
    input3: "5\nx 1\ny 2\nz 3\nw 4\nv 5",
    output3: "15",
    inputconstrains: "1 <= N <= 1000, 1 <= key length <= 20",
    blacklist: "sum, reduce, inject",
    whitelist: "def , each",
    sourcecode: `def total_values(pairs)
  total = 0
  pairs.each do |_, v|
    total += v
  end
  total
end

n = gets.to_i
pairs = []
n.times do
  k, v = gets.split
  pairs << [k, v.to_i]
end
puts total_values(pairs)\n`,
  },

  /* ───── HARD · SCENARIO (4) — blacklist+whitelist, maxscore 30 ───── */
  {
    title: "Nested Hash Student Average",
    description:
      "Each of N students has M subject scores stored as a nested hash {student => {subject => score}}. Compute each student's average score across all M subjects and print 'student average' (2 decimal places) sorted by student name. Compute totals with each; the sum, reduce, inject, average and mean helpers are disabled.\n\nInput Format:\nLine 1: two integers N (number of students) and M (subjects per student).\nFor each student:\n  Line 1: student name.\n  Next M lines: subject name and integer score separated by a space.\n\nOutput Format:\nN lines, each '<student> <avg>' (avg to 2 decimal places), sorted alphabetically by student name.\n\nConstraints:\n1 <= N <= 100, 1 <= M <= 10, 0 <= score <= 100, 1 <= name length <= 20.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Nested Hashes",
    sampleinput1: "2 2\nalice\nmath 80\nscience 90\nbob\nmath 70\nscience 80",
    sampleoutput1: "alice 85.00\nbob 75.00",
    sampleinput2: "1 3\nx\na 60\nb 70\nc 80",
    sampleoutput2: "x 70.00",
    input1: "1 2\nz\nx 50\ny 100",
    output1: "z 75.00",
    input2: "2 3\nbob\na 90\nb 80\nc 70\nalice\na 60\nb 70\nc 80",
    output2: "alice 70.00\nbob 80.00",
    input3: "3 1\ncharlie\nmath 95\nalice\nmath 85\nbob\nmath 75",
    output3: "alice 85.00\nbob 75.00\ncharlie 95.00",
    inputconstrains: "1 <= N <= 100, 1 <= M <= 10, 0 <= score <= 100",
    blacklist: "sum, reduce, inject, average, mean",
    whitelist: "def , each",
    sourcecode: `def student_score_rollups(records, m)
  result = {}
  records.each do |student, scores|
    total = 0
    scores.each do |_, score|
      total += score
    end
    result[student] = total.to_f / m
  end
  result
end

n, m = gets.split.map(&:to_i)
records = {}
n.times do
  student = gets.chomp
  scores = {}
  m.times do
    subj, sc = gets.split
    scores[subj] = sc.to_i
  end
  records[student] = scores
end

rollups = student_score_rollups(records, m)
rollups.keys.sort.each do |s|
  puts "#{s} #{'%.2f' % rollups[s]}"
end\n`,
  },
  {
    title: "Cart Subtotal Calculator",
    description:
      "A shop has a price list (item name -> unit price). A cart contains items with quantities. Compute the subtotal by multiplying each cart item's quantity by its unit price (skipping any cart item not present in the price list). Iterate the cart with each. The sum, reduce, inject, select and merge methods are disabled.\n\nInput Format:\nLine 1: integer P (number of priced items).\nNext P lines: item name and integer unit price separated by a space.\nNext line: integer C (number of cart items).\nNext C lines: item name and integer quantity separated by a space.\n\nOutput Format:\nA single integer: the subtotal (price * qty summed across matched cart items).\n\nConstraints:\n1 <= P, C <= 1000, 1 <= item length <= 20, 1 <= price <= 10000, 1 <= quantity <= 100.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Hash Iteration",
    sampleinput1: "3\napple 5\nbanana 3\ncherry 7\n2\napple 2\ncherry 3",
    sampleoutput1: "31",
    sampleinput2: "2\nx 10\ny 20\n1\ny 5",
    sampleoutput2: "100",
    input1: "2\napple 10\nbanana 5\n2\napple 4\nbanana 2",
    output1: "50",
    input2: "3\nx 1\ny 2\nz 3\n2\nx 5\nz 10",
    output2: "35",
    input3: "4\npen 5\npencil 10\neraser 3\nbook 7\n3\npen 2\nbook 1\neraser 4",
    output3: "29",
    inputconstrains: "1 <= P, C <= 1000, 1 <= price <= 10000",
    blacklist: "sum, reduce, inject, select, merge",
    whitelist: "def , each",
    sourcecode: `def compute_subtotal(prices, cart)
  total = 0
  cart.each do |item, qty|
    if prices.key?(item)
      total += prices[item] * qty
    end
  end
  total
end

p_count = gets.to_i
prices = {}
p_count.times do
  item, pr = gets.split
  prices[item] = pr.to_i
end

c_count = gets.to_i
cart = {}
c_count.times do
  item, qty = gets.split
  cart[item] = qty.to_i
end

puts compute_subtotal(prices, cart)\n`,
  },
  {
    title: "Default Value Counter",
    description:
      "Read N space-separated words. Use Hash.new(0) to count occurrences of each word, then print each unique word with its count sorted alphabetically by word. Sorting must be implemented manually with a while loop. The group_by, tally, count and sort methods are disabled.\n\nInput Format:\nLine 1: integer N.\nLine 2: N space-separated words.\n\nOutput Format:\nOne line per unique word (sorted alphabetically): '<word> <count>'.\n\nConstraints:\n1 <= N <= 1000, 1 <= each word length <= 20.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Default Values and Blocks",
    sampleinput1: "6\napple banana apple cherry banana apple",
    sampleoutput1: "apple 3\nbanana 2\ncherry 1",
    sampleinput2: "3\nx y z",
    sampleoutput2: "x 1\ny 1\nz 1",
    input1: "1\nhello",
    output1: "hello 1",
    input2: "4\nred red blue blue",
    output2: "blue 2\nred 2",
    input3: "5\nb a c b a",
    output3: "a 2\nb 2\nc 1",
    inputconstrains: "1 <= N <= 1000, 1 <= each word length <= 20",
    blacklist: "group_by, tally, count, sort",
    whitelist: "def , while, each",
    sourcecode: `def build_freq(words)
  freq = Hash.new(0)
  words.each { |w| freq[w] += 1 }
  freq
end

n = gets.to_i
words = gets.split
freq = build_freq(words)
keys = freq.keys.to_a
len = keys.length
swapped = true
while swapped
  swapped = false
  (len - 1).times do |i|
    if keys[i] > keys[i + 1]
      keys[i], keys[i + 1] = keys[i + 1], keys[i]
      swapped = true
    end
  end
end
keys.each do |k|
  puts "#{k} #{freq[k]}"
end\n`,
  },
  {
    title: "Inventory Value Report",
    description:
      "Read N categories, each containing M items with quantities. The data is stored as a nested hash {category => {item => qty}}. For each category, compute the total quantity across its items using each, and print 'category total' sorted by category name. The sum, reduce, inject, group_by and select methods are disabled.\n\nInput Format:\nLine 1: two integers N (number of categories) and M (items per category).\nFor each category:\n  Line 1: category name.\n  Next M lines: item name and integer quantity separated by a space.\n\nOutput Format:\nN lines, each '<category> <total>' sorted alphabetically by category name.\n\nConstraints:\n1 <= N <= 100, 1 <= M <= 100, 1 <= name length <= 20, 0 <= quantity <= 10000.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Nested Hashes",
    sampleinput1: "2 2\nfruits\napple 10\nbanana 5\nvegs\ncarrot 8\nspinach 3",
    sampleoutput1: "fruits 15\nvegs 11",
    sampleinput2: "1 3\nbakery\nbread 4\ncake 6\ncookie 2",
    sampleoutput2: "bakery 12",
    input1: "1 2\ntools\nhammer 3\nsaw 4",
    output1: "tools 7",
    input2: "3 1\ncat_a\nx 5\ncat_c\ny 10\ncat_b\nz 7",
    output2: "cat_a 5\ncat_b 7\ncat_c 10",
    input3: "2 3\nfruits\napple 1\nbanana 2\ncherry 3\ndairy\nmilk 4\ncheese 5\nyogurt 6",
    output3: "dairy 15\nfruits 6",
    inputconstrains: "1 <= N <= 100, 1 <= M <= 100, 0 <= quantity <= 10000",
    blacklist: "sum, reduce, inject, group_by, select",
    whitelist: "def , each",
    sourcecode: `def category_totals(records)
  result = {}
  records.each do |cat, items|
    total = 0
    items.each do |_, qty|
      total += qty
    end
    result[cat] = total
  end
  result
end

n, m = gets.split.map(&:to_i)
records = {}
n.times do
  cat = gets.chomp
  items = {}
  m.times do
    name, qty = gets.split
    items[name] = qty.to_i
  end
  records[cat] = items
end

totals = category_totals(records)
totals.keys.sort.each do |c|
  puts "#{c} #{totals[c]}"
end\n`,
  },
];

/* ───────────────────────── DAY 8 MCQ QUESTIONS ───────────────────────── */

const mcqs: MCQ[] = [
  /* ───── EASY (10) ───── */
  {
    title: "Hash Literal Syntax",
    description: "Which of the following creates the hash {a: 1, b: 2} in Ruby?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Hash Creation and Initialization",
    Option1: "h = {a: 1, b: 2}",
    Option2: "h = [a: 1, b: 2]",
    Option3: "h = (a: 1, b: 2)",
    Option4: "h = <a: 1, b: 2>",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Hash Symbol Access",
    description: "What does h = {a: 1, b: 2}; h[:b] return in Ruby?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Hash Access",
    Option1: "1",
    Option2: "2",
    Option3: ":b",
    Option4: "nil",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Missing Key Access",
    description: "What does h = {x: 10}; h[:y] return in Ruby?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Hash Access",
    Option1: "10",
    Option2: "0",
    Option3: "nil",
    Option4: "Raises KeyError",
    CorrectOption: 3,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Hash Keys Method",
    description: "Which method returns all keys of a hash as an array?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Hash Methods",
    Option1: "h.keys",
    Option2: "h.kvs",
    Option3: "h.indices",
    Option4: "h.labels",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Hash Values Method",
    description: "Which method returns all values of a hash as an array?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Hash Methods",
    Option1: "h.values",
    Option2: "h.vals",
    Option3: "h.data",
    Option4: "h.items",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Hash Each Iterator",
    description: "Which method iterates each key-value pair of a hash?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Hash Iteration",
    Option1: "each",
    Option2: "loop",
    Option3: "walk",
    Option4: "iterate",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Hash.new with Default",
    description: "What does Hash.new(0) create in Ruby?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Default Values and Blocks",
    Option1: "An empty hash that returns 0 for any missing key",
    Option2: "A hash with a single key 0 mapped to nil",
    Option3: "A hash that only stores integer keys",
    Option4: "A frozen hash that cannot be modified",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Hash Size Method",
    description: "What does {a: 1, b: 2}.size return in Ruby?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Hash Methods",
    Option1: "1",
    Option2: "2",
    Option3: "3",
    Option4: "nil",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Hash String Value Access",
    description: "What does h = {name: 'Alice'}; h[:name] return in Ruby?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Hash Access",
    Option1: "Alice",
    Option2: ":name",
    Option3: "nil",
    Option4: "Raises an error",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Hash Each Block Parameters",
    description:
      "In h.each { |k, v| puts v }, what do k and v represent for each iteration?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Hash Iteration",
    Option1: "k is the key, v is the value",
    Option2: "k is the value, v is the key",
    Option3: "k is the hash itself, v is the index",
    Option4: "k is the index, v is the value",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },

  /* ───── MEDIUM (6) — snippets ───── */
  {
    title: "Hash Key Predicate",
    description: "What does the following Ruby snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Hash Methods",
    Option1: "true",
    Option2: "false",
    Option3: "2",
    Option4: ":b",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `h = {a: 1, b: 2, c: 3}
puts h.key?(:b)`,
    snippetLang: "ruby",
  },
  {
    title: "Hash Fetch Default",
    description: "What does the following Ruby snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Hash Methods",
    Option1: "nil",
    Option2: "99",
    Option3: "1",
    Option4: "Raises KeyError",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `h = {a: 1, b: 2}
puts h.fetch(:c, 99)`,
    snippetLang: "ruby",
  },
  {
    title: "Default Value Increment",
    description: "What does the following Ruby snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Default Values and Blocks",
    Option1: "0",
    Option2: "1",
    Option3: "2",
    Option4: "3",
    CorrectOption: 3,
    iscodesnippet: true,
    codesnippet: `h = Hash.new(0)
h[:apple] += 1
h[:banana] += 1
h[:apple] += 1
puts h[:apple]`,
    snippetLang: "ruby",
  },
  {
    title: "Hash Each Print Output",
    description: "What does the following Ruby snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Hash Iteration",
    Option1: "x=1 y=2 z=3 ",
    Option2: "1=x 2=y 3=z ",
    Option3: "x=1,y=2,z=3",
    Option4: "1 2 3",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `h = {x: 1, y: 2, z: 3}
h.each { |k, v| print "#{k}=#{v} " }`,
    snippetLang: "ruby",
  },
  {
    title: "Hash Merge Keys Count",
    description: "What does the following Ruby snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Hash Methods",
    Option1: "1",
    Option2: "2",
    Option3: "3",
    Option4: "0",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `a = {x: 1}
b = {y: 2}
c = a.merge(b)
puts c.keys.length`,
    snippetLang: "ruby",
  },
  {
    title: "Nested Hash Single Access",
    description: "What does the following Ruby snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Nested Hashes",
    Option1: "Bob",
    Option2: "30",
    Option3: "{:age => 30}",
    Option4: "nil",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `h = {user: {name: "Bob", age: 30}}
puts h[:user][:age]`,
    snippetLang: "ruby",
  },

  /* ───── HARD (4) — snippets ───── */
  {
    title: "Nested Hash Subject Lookup",
    description: "What does the following Ruby snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Nested Hashes",
    Option1: "70",
    Option2: "80",
    Option3: "85",
    Option4: "90",
    CorrectOption: 3,
    iscodesnippet: true,
    codesnippet: `data = {
  alice: {math: 90, sci: 80},
  bob:   {math: 70, sci: 85}
}
puts data[:bob][:sci]`,
    snippetLang: "ruby",
  },
  {
    title: "Hash Block Default Array",
    description: "What does the following Ruby snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Default Values and Blocks",
    Option1: "0",
    Option2: "1",
    Option3: "2",
    Option4: "3",
    CorrectOption: 3,
    iscodesnippet: true,
    codesnippet: `h = Hash.new { |hash, key| hash[key] = [] }
h[:a] << 1
h[:a] << 2
h[:b] << 3
puts h[:a].length`,
    snippetLang: "ruby",
  },
  {
    title: "Hash Map Returns Array",
    description: "What does the following Ruby snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Hash Iteration",
    Option1: "[10, 20, 30]",
    Option2: "{:a=>10, :b=>20, :c=>30}",
    Option3: "[1, 2, 3]",
    Option4: "60",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `h = {a: 1, b: 2, c: 3}
result = h.map { |k, v| v * 10 }
puts result.inspect`,
    snippetLang: "ruby",
  },
  {
    title: "Hash Select Keys Length",
    description: "What does the following Ruby snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Hash Methods",
    Option1: "1",
    Option2: "2",
    Option3: "3",
    Option4: "0",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `h = {a: 1, b: 2, c: 3}
puts h.select { |k, v| v > 1 }.keys.length`,
    snippetLang: "ruby",
  },
];

/* ───────────────────────── EMIT JSON ───────────────────────── */

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
