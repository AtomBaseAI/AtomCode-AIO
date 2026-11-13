/**
 * AtomCode — Ruby Programming — Day 7 builder.
 * Topic: Arrays.
 *
 * Subtopics covered:
 *  - Array Creation and Initialization
 *  - Array Access and Indexing
 *  - Array Iteration
 *  - Array Methods
 *  - Array Transformation
 *  - Multidimensional Arrays
 *
 * Day 7 = array manipulation. Students learn [1,2,3] literals, arr[0]/arr[-1]
 * indexing, arr.first/arr.last, arr.each, arr.map, arr.select, arr.reduce and
 * multidim arrays. Medium/hard questions force students to implement these
 * transformations manually by blacklisting the convenience methods.
 */

import { writeFileSync } from "node:fs";

const DAY = 7;
const TOPIC = "Arrays";
const SUBTOPICS = [
  "Array Creation and Initialization",
  "Array Access and Indexing",
  "Array Iteration",
  "Array Methods",
  "Array Transformation",
  "Multidimensional Arrays",
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

/* ───────────────────────── DAY 7 CODE QUESTIONS ───────────────────────── */

const questions: CodeQuestion[] = [
  /* ───── EASY · BASIC (6) ───── */
  {
    title: "Sum of Array Elements",
    description:
      "Read a single line of space-separated integers and print their total sum.\n\nInput Format:\nOne line containing N space-separated integers.\n\nOutput Format:\nA single integer, the sum of the input integers.\n\nConstraints:\n1 <= N <= 1000, -10000 <= each value <= 10000.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Array Methods",
    sampleinput1: "5 10 15",
    sampleoutput1: "30",
    sampleinput2: "1 2 3 4",
    sampleoutput2: "10",
    input1: "10 20 30 40",
    output1: "100",
    input2: "1",
    output2: "1",
    input3: "100 200 300",
    output3: "600",
    inputconstrains: "1 <= N <= 1000, -10000 <= each value <= 10000",
    blacklist: "",
    whitelist: "",
    sourcecode: `arr = gets.split.map(&:to_i)
puts arr.sum\n`,
  },
  {
    title: "Reverse Array Print",
    description:
      "Read a single line of space-separated integers and print them in reverse order on one line.\n\nInput Format:\nOne line of N space-separated integers.\n\nOutput Format:\nN integers in reverse order, space-separated on a single line.\n\nConstraints:\n1 <= N <= 1000, -10000 <= each value <= 10000.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Array Transformation",
    sampleinput1: "1 2 3",
    sampleoutput1: "3 2 1",
    sampleinput2: "10 20 30 40",
    sampleoutput2: "40 30 20 10",
    input1: "5",
    output1: "5",
    input2: "7 8",
    output2: "8 7",
    input3: "1 2 3 4 5",
    output3: "5 4 3 2 1",
    inputconstrains: "1 <= N <= 1000, -10000 <= each value <= 10000",
    blacklist: "",
    whitelist: "",
    sourcecode: `arr = gets.split.map(&:to_i)
puts arr.reverse.join(" ")\n`,
  },
  {
    title: "First and Last Element",
    description:
      "Read a line of space-separated integers and print the first and last elements, separated by a space. If the array has one element, both values are that element.\n\nInput Format:\nOne line of N space-separated integers.\n\nOutput Format:\nTwo integers separated by a space: first and last.\n\nConstraints:\n1 <= N <= 1000, -10000 <= each value <= 10000.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Array Access and Indexing",
    sampleinput1: "5 10 15 20",
    sampleoutput1: "5 20",
    sampleinput2: "3",
    sampleoutput2: "3 3",
    input1: "1 2",
    output1: "1 2",
    input2: "100",
    output2: "100 100",
    input3: "7 8 9",
    output3: "7 9",
    inputconstrains: "1 <= N <= 1000, -10000 <= each value <= 10000",
    blacklist: "",
    whitelist: "",
    sourcecode: `arr = gets.split.map(&:to_i)
puts "#{arr.first} #{arr.last}"\n`,
  },
  {
    title: "Count Even Numbers",
    description:
      "Read a line of space-separated integers and print how many of them are even.\n\nInput Format:\nOne line of N space-separated integers.\n\nOutput Format:\nA single integer: the count of even values.\n\nConstraints:\n1 <= N <= 1000, -10000 <= each value <= 10000.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Array Methods",
    sampleinput1: "1 2 3 4 5 6",
    sampleoutput1: "3",
    sampleinput2: "1 3 5",
    sampleoutput2: "0",
    input1: "2 4 6 8",
    output1: "4",
    input2: "0",
    output2: "1",
    input3: "11 13 15 20 22",
    output3: "2",
    inputconstrains: "1 <= N <= 1000, -10000 <= each value <= 10000",
    blacklist: "",
    whitelist: "",
    sourcecode: `arr = gets.split.map(&:to_i)
puts arr.count(&:even?)\n`,
  },
  {
    title: "Print Array Elements Each Line",
    description:
      "Read a line of space-separated integers and print each integer on its own line.\n\nInput Format:\nOne line of N space-separated integers.\n\nOutput Format:\nN lines, each containing one integer.\n\nConstraints:\n1 <= N <= 1000, -10000 <= each value <= 10000.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Array Iteration",
    sampleinput1: "10 20 30",
    sampleoutput1: "10\n20\n30",
    sampleinput2: "5",
    sampleoutput2: "5",
    input1: "1 2 3",
    output1: "1\n2\n3",
    input2: "100",
    output2: "100",
    input3: "7 8 9 10",
    output3: "7\n8\n9\n10",
    inputconstrains: "1 <= N <= 1000, -10000 <= each value <= 10000",
    blacklist: "",
    whitelist: "",
    sourcecode: `arr = gets.split.map(&:to_i)
arr.each { |x| puts x }\n`,
  },
  {
    title: "Average of Array",
    description:
      "Read a line of space-separated integers and print their average rounded to exactly two decimal places.\n\nInput Format:\nOne line of N space-separated integers.\n\nOutput Format:\nA single number formatted to two decimal places.\n\nConstraints:\n1 <= N <= 1000, -10000 <= each value <= 10000.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Array Methods",
    sampleinput1: "2 4 6",
    sampleoutput1: "4.00",
    sampleinput2: "1 2 3 4",
    sampleoutput2: "2.50",
    input1: "10 20",
    output1: "15.00",
    input2: "5",
    output2: "5.00",
    input3: "1 1 1 1 1",
    output3: "1.00",
    inputconstrains: "1 <= N <= 1000, -10000 <= each value <= 10000",
    blacklist: "",
    whitelist: "",
    sourcecode: `arr = gets.split.map(&:to_i)
puts "%.2f" % (arr.sum.to_f / arr.length)\n`,
  },

  /* ───── EASY · SCENARIO (4) ───── */
  {
    title: "Passing Student Scores",
    description:
      "Teacher Maya wants to know how many of her students passed the math test. A score of 40 or above is considered passing. Read the count of students followed by their scores and print the number of passing scores.\n\nInput Format:\nLine 1: integer N (number of students).\nLine 2: N space-separated integer scores.\n\nOutput Format:\nA single integer: count of scores >= 40.\n\nConstraints:\n1 <= N <= 1000, 0 <= each score <= 100.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Array Methods",
    sampleinput1: "5\n30 45 50 39 80",
    sampleoutput1: "3",
    sampleinput2: "3\n10 20 30",
    sampleoutput2: "0",
    input1: "4\n40 50 60 70",
    output1: "4",
    input2: "1\n40",
    output2: "1",
    input3: "6\n39 40 41 39 40 41",
    output3: "4",
    inputconstrains: "1 <= N <= 1000, 0 <= each score <= 100",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = gets.to_i
scores = gets.split.map(&:to_i)
puts scores.count { |s| s >= 40 }\n`,
  },
  {
    title: "Double Discount Cart",
    description:
      "A shop doubles every discount value displayed on a tag. Read N followed by N discount values and print each value doubled, space-separated on one line.\n\nInput Format:\nLine 1: integer N.\nLine 2: N space-separated integers.\n\nOutput Format:\nOne line of N space-separated integers, each value doubled.\n\nConstraints:\n1 <= N <= 1000, 0 <= each value <= 10000.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Array Transformation",
    sampleinput1: "3\n10 20 30",
    sampleoutput1: "20 40 60",
    sampleinput2: "4\n5 5 5 5",
    sampleoutput2: "10 10 10 10",
    input1: "2\n100 200",
    output1: "200 400",
    input2: "1\n7",
    output2: "14",
    input3: "5\n1 2 3 4 5",
    output3: "2 4 6 8 10",
    inputconstrains: "1 <= N <= 1000, 0 <= each value <= 10000",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = gets.to_i
prices = gets.split.map(&:to_i)
puts prices.map { |p| p * 2 }.join(" ")\n`,
  },
  {
    title: "Search Element Position",
    description:
      "In a list of book IDs, find the 1-indexed position of a given search ID. Print -1 if the ID is not present.\n\nInput Format:\nLine 1: integer N.\nLine 2: N space-separated integer IDs.\nLine 3: integer search ID.\n\nOutput Format:\nA single integer: the 1-indexed position, or -1 if not found.\n\nConstraints:\n1 <= N <= 1000, 1 <= each ID <= 10^9, 1 <= search ID <= 10^9.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Array Access and Indexing",
    sampleinput1: "5\n10 20 30 40 50\n30",
    sampleoutput1: "3",
    sampleinput2: "4\n1 2 3 4\n9",
    sampleoutput2: "-1",
    input1: "3\n5 10 15\n10",
    output1: "2",
    input2: "1\n7\n7",
    output2: "1",
    input3: "5\n1 1 2 2 3\n2",
    output3: "3",
    inputconstrains: "1 <= N <= 1000, 1 <= each ID <= 10^9",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = gets.to_i
ids = gets.split.map(&:to_i)
target = gets.to_i
idx = ids.index(target)
puts idx.nil? ? -1 : idx + 1\n`,
  },
  {
    title: "Class Top Score",
    description:
      "Find the top score in the class. Read N followed by N integer scores and print the highest score.\n\nInput Format:\nLine 1: integer N.\nLine 2: N space-separated integer scores.\n\nOutput Format:\nA single integer: the highest score.\n\nConstraints:\n1 <= N <= 1000, 0 <= each score <= 100.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Array Methods",
    sampleinput1: "4\n78 92 65 88",
    sampleoutput1: "92",
    sampleinput2: "1\n55",
    sampleoutput2: "55",
    input1: "3\n10 30 20",
    output1: "30",
    input2: "5\n100 90 80 70 60",
    output2: "100",
    input3: "2\n50 50",
    output3: "50",
    inputconstrains: "1 <= N <= 1000, 0 <= each score <= 100",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = gets.to_i
scores = gets.split.map(&:to_i)
puts scores.max\n`,
  },

  /* ───── MEDIUM · SCENARIO (6) — blacklist+whitelist, maxscore 20 ───── */
  {
    title: "Library Book Inventory Total",
    description:
      "A small library branch keeps the per-shelf book count in an array. Compute the total number of books across all shelves by iterating the array with an each loop. The sum, reduce and inject methods are disabled.\n\nInput Format:\nLine 1: integer N (number of shelves).\nLine 2: N space-separated integer counts.\n\nOutput Format:\nA single integer: the total number of books.\n\nConstraints:\n1 <= N <= 1000, 0 <= each count <= 10000.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Array Iteration",
    sampleinput1: "4\n10 20 30 40",
    sampleoutput1: "100",
    sampleinput2: "3\n5 15 25",
    sampleoutput2: "45",
    input1: "5\n1 2 3 4 5",
    output1: "15",
    input2: "1\n100",
    output2: "100",
    input3: "6\n100 200 300 400 500 600",
    output3: "2100",
    inputconstrains: "1 <= N <= 1000, 0 <= each count <= 10000",
    blacklist: "sum, reduce, inject",
    whitelist: "def , each",
    sourcecode: `def total_books(counts)
  total = 0
  counts.each { |c| total += c }
  total
end

n = gets.to_i
counts = gets.split.map(&:to_i)
puts total_books(counts)\n`,
  },
  {
    title: "Marathon Peak Distance Finder",
    description:
      "A marathon organiser records the distance each runner covered in metres and wants the longest distance. Find the maximum value by iterating the array with each. The max, min and sort methods are disabled.\n\nInput Format:\nLine 1: integer N.\nLine 2: N space-separated integer distances.\n\nOutput Format:\nA single integer: the longest distance.\n\nConstraints:\n1 <= N <= 1000, 0 <= each distance <= 100000.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Array Methods",
    sampleinput1: "5\n10 25 15 30 20",
    sampleoutput1: "30",
    sampleinput2: "1\n42",
    sampleoutput2: "42",
    input1: "3\n5 9 7",
    output1: "9",
    input2: "4\n100 100 100 100",
    output2: "100",
    input3: "6\n3 1 4 1 5 9",
    output3: "9",
    inputconstrains: "1 <= N <= 1000, 0 <= each distance <= 100000",
    blacklist: "max, min, sort",
    whitelist: "def , each",
    sourcecode: `def find_peak(distances)
  best = distances[0]
  distances.each { |d| best = d if d > best }
  best
end

n = gets.to_i
distances = gets.split.map(&:to_i)
puts find_peak(distances)\n`,
  },
  {
    title: "Reverse Train Car Order",
    description:
      "A yardmaster needs the train cars printed in reverse order without using the reverse method. Build the reversed list using a while loop. The reverse and sort methods are disabled.\n\nInput Format:\nLine 1: integer N.\nLine 2: N space-separated integer car labels.\n\nOutput Format:\nN space-separated integers in reverse order on one line.\n\nConstraints:\n1 <= N <= 1000, 1 <= each label <= 100000.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Array Transformation",
    sampleinput1: "4\n101 202 303 404",
    sampleoutput1: "404 303 202 101",
    sampleinput2: "3\n7 8 9",
    sampleoutput2: "9 8 7",
    input1: "1\n55",
    output1: "55",
    input2: "2\n10 20",
    output2: "20 10",
    input3: "5\n1 2 3 4 5",
    output3: "5 4 3 2 1",
    inputconstrains: "1 <= N <= 1000, 1 <= each label <= 100000",
    blacklist: "reverse, sort",
    whitelist: "def , while",
    sourcecode: `def flip_cars(cars)
  result = []
  i = cars.length - 1
  while i >= 0
    result << cars[i]
    i -= 1
  end
  result
end

n = gets.to_i
cars = gets.split.map(&:to_i)
puts flip_cars(cars).join(" ")\n`,
  },
  {
    title: "Bubble Scoreboard Ordering",
    description:
      "A coach wants the scoreboard sorted in ascending order of scores. Implement bubble sort with a while loop. The sort, max and min methods are disabled.\n\nInput Format:\nLine 1: integer N.\nLine 2: N space-separated integer scores.\n\nOutput Format:\nN space-separated integers in ascending order on one line.\n\nConstraints:\n1 <= N <= 1000, 0 <= each score <= 100.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Array Transformation",
    sampleinput1: "5\n40 10 30 20 50",
    sampleoutput1: "10 20 30 40 50",
    sampleinput2: "3\n9 1 5",
    sampleoutput2: "1 5 9",
    input1: "1\n7",
    output1: "7",
    input2: "4\n3 3 1 2",
    output2: "1 2 3 3",
    input3: "6\n6 5 4 3 2 1",
    output3: "1 2 3 4 5 6",
    inputconstrains: "1 <= N <= 1000, 0 <= each score <= 100",
    blacklist: "sort, max, min",
    whitelist: "def , while",
    sourcecode: `def bubble_order(scores)
  arr = scores.dup
  n = arr.length
  swapped = true
  while swapped
    swapped = false
    (n - 1).times do |i|
      if arr[i] > arr[i + 1]
        arr[i], arr[i + 1] = arr[i + 1], arr[i]
        swapped = true
      end
    end
  end
  arr
end

n = gets.to_i
scores = gets.split.map(&:to_i)
puts bubble_order(scores).join(" ")\n`,
  },
  {
    title: "Squared Garden Areas",
    description:
      "A gardener records the side length of each square plot and wants the area of every plot. Build a new array with each side squared using an each loop. The map, collect and select methods are disabled.\n\nInput Format:\nLine 1: integer N.\nLine 2: N space-separated integer side lengths.\n\nOutput Format:\nN space-separated integers, each the square of the input side, on one line.\n\nConstraints:\n1 <= N <= 1000, 1 <= each side <= 1000.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Array Transformation",
    sampleinput1: "3\n2 3 4",
    sampleoutput1: "4 9 16",
    sampleinput2: "4\n1 5 10 6",
    sampleoutput2: "1 25 100 36",
    input1: "1\n7",
    output1: "49",
    input2: "2\n10 20",
    output2: "100 400",
    input3: "5\n1 2 3 4 5",
    output3: "1 4 9 16 25",
    inputconstrains: "1 <= N <= 1000, 1 <= each side <= 1000",
    blacklist: "map, collect, select",
    whitelist: "def , each",
    sourcecode: `def square_areas(sides)
  result = []
  sides.each { |s| result << s * s }
  result
end

n = gets.to_i
raw = gets.split
sides = []
raw.each { |x| sides << x.to_i }
puts square_areas(sides).join(" ")\n`,
  },
  {
    title: "Even Number Filter Basket",
    description:
      "A shopkeeper wants to keep only the even-valued items from a basket. Build a new array containing only even numbers using an each loop. The select, filter, reject and grep methods are disabled.\n\nInput Format:\nLine 1: integer N.\nLine 2: N space-separated integers.\n\nOutput Format:\nSpace-separated even numbers on one line. The output is guaranteed non-empty by the test cases.\n\nConstraints:\n1 <= N <= 1000, at least one even value in every input.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Array Transformation",
    sampleinput1: "5\n1 2 3 4 5",
    sampleoutput1: "2 4",
    sampleinput2: "4\n2 4 6 8",
    sampleoutput2: "2 4 6 8",
    input1: "6\n10 11 12 13 14 15",
    output1: "10 12 14",
    input2: "3\n1 2 3",
    output2: "2",
    input3: "7\n2 4 6 8 10 12 14",
    output3: "2 4 6 8 10 12 14",
    inputconstrains: "1 <= N <= 1000, at least one even value present",
    blacklist: "select, filter, reject, grep",
    whitelist: "def , each",
    sourcecode: `def keep_evens(nums)
  result = []
  nums.each { |x| result << x if x.even? }
  result
end

n = gets.to_i
raw = gets.split
nums = []
raw.each { |x| nums << x.to_i }
puts keep_evens(nums).join(" ")\n`,
  },

  /* ───── HARD · SCENARIO (4) — blacklist+whitelist, maxscore 30 ───── */
  {
    title: "Top K Marathon Finishers",
    description:
      "Given marathon finish times for N runners, print the top K fastest finishers. Each output line is the runner's original bib number (1-indexed) followed by their time. Implement sorting with a while loop. The sort, max, min, sort_by and group_by methods are disabled.\n\nInput Format:\nLine 1: integer N.\nLine 2: N space-separated integer finish times.\nLine 3: integer K (1 <= K <= N).\n\nOutput Format:\nK lines, each containing the bib number and time separated by a space, ordered by ascending time.\n\nConstraints:\n1 <= N <= 1000, 1 <= K <= N, 1 <= each time <= 10^9.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Array Methods",
    sampleinput1: "5\n300 250 400 200 350\n2",
    sampleoutput1: "4 200\n2 250",
    sampleinput2: "3\n100 50 75\n3",
    sampleoutput2: "2 50\n3 75\n1 100",
    input1: "1\n1000\n1",
    output1: "1 1000",
    input2: "4\n10 20 30 40\n4",
    output2: "1 10\n2 20\n3 30\n4 40",
    input3: "5\n500 100 300 200 400\n3",
    output3: "2 100\n4 200\n3 300",
    inputconstrains: "1 <= N <= 1000, 1 <= K <= N, 1 <= each time <= 10^9",
    blacklist: "sort, max, min, sort_by, group_by",
    whitelist: "def , while, each",
    sourcecode: `def top_k_finishers(times, k)
  pairs = []
  times.each_with_index { |t, i| pairs << [t, i] }
  n = pairs.length
  swapped = true
  while swapped
    swapped = false
    (n - 1).times do |j|
      if pairs[j][0] > pairs[j + 1][0]
        pairs[j], pairs[j + 1] = pairs[j + 1], pairs[j]
        swapped = true
      end
    end
  end
  k.times do |i|
    t, idx = pairs[i]
    puts "#{idx + 1} #{t}"
  end
end

n = gets.to_i
times = gets.split.map(&:to_i)
k = gets.to_i
top_k_finishers(times, k)\n`,
  },
  {
    title: "Stock Trading Profit Peaks",
    description:
      "Given an array of stock prices on consecutive days, find the maximum profit achievable by buying once and selling once on a later day. If no profit is possible, output 0. Iterate the prices with each_with_index. The max, min, sort, reduce, inject and select methods are disabled.\n\nInput Format:\nLine 1: integer N.\nLine 2: N space-separated integer prices.\n\nOutput Format:\nA single integer: the maximum profit (0 if no profit is possible).\n\nConstraints:\n1 <= N <= 1000, 1 <= each price <= 10000.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Array Iteration",
    sampleinput1: "6\n7 1 5 3 6 4",
    sampleoutput1: "5",
    sampleinput2: "5\n7 6 4 3 1",
    sampleoutput2: "0",
    input1: "1\n5",
    output1: "0",
    input2: "4\n1 2 3 4",
    output2: "3",
    input3: "5\n5 4 3 2 5",
    output3: "3",
    inputconstrains: "1 <= N <= 1000, 1 <= each price <= 10000",
    blacklist: "max, min, sort, reduce, inject, select",
    whitelist: "def , each",
    sourcecode: `def best_profit(prices)
  cheapest = prices[0]
  best = 0
  prices.each_with_index do |p, i|
    next if i == 0
    diff = p - cheapest
    best = diff if diff > best
    cheapest = p if p < cheapest
  end
  best
end

n = gets.to_i
prices = gets.split.map(&:to_i)
puts best_profit(prices)\n`,
  },
  {
    title: "Subarray Sum Counter",
    description:
      "Given an array of N integers and a threshold K, count the number of contiguous subarrays whose sum is less than or equal to K. Use nested iteration with each_with_index (outer) and a while loop (inner). The sum, reduce, inject, select and max methods are disabled.\n\nInput Format:\nLine 1: integer N.\nLine 2: N space-separated integers.\nLine 3: integer K.\n\nOutput Format:\nA single integer: the count of subarrays whose sum is <= K.\n\nConstraints:\n1 <= N <= 100, -1000 <= each value <= 1000, -10^6 <= K <= 10^6.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Array Iteration",
    sampleinput1: "3\n1 2 3\n4",
    sampleoutput1: "4",
    sampleinput2: "4\n2 3 1 4\n5",
    sampleoutput2: "7",
    input1: "1\n5\n10",
    output1: "1",
    input2: "3\n-1 -2 -3\n0",
    output2: "6",
    input3: "5\n1 1 1 1 1\n3",
    output3: "12",
    inputconstrains: "1 <= N <= 100, -1000 <= each value <= 1000",
    blacklist: "sum, reduce, inject, select, max",
    whitelist: "def , while, each",
    sourcecode: `def count_subarrays(arr, k)
  n = arr.length
  count = 0
  arr.each_with_index do |_, i|
    running = 0
    j = i
    while j < n
      running += arr[j]
      count += 1 if running <= k
      j += 1
    end
  end
  count
end

n = gets.to_i
arr = gets.split.map(&:to_i)
k = gets.to_i
puts count_subarrays(arr, k)\n`,
  },
  {
    title: "Rainwater Harvest Trap",
    description:
      "An array of non-negative integers represents the elevation map of a rainwater harvesting trench of width N. Compute how many units of water can be trapped after raining using the two-pointer technique with a while loop. The max, min, sort, reduce and select methods are disabled.\n\nInput Format:\nLine 1: integer N.\nLine 2: N space-separated non-negative integers (heights).\n\nOutput Format:\nA single integer: total units of trapped water.\n\nConstraints:\n1 <= N <= 1000, 0 <= each height <= 10000.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Array Methods",
    sampleinput1: "5\n3 0 2 0 4",
    sampleoutput1: "7",
    sampleinput2: "3\n1 2 3",
    sampleoutput2: "0",
    input1: "1\n5",
    output1: "0",
    input2: "5\n3 0 1 0 4",
    output2: "8",
    input3: "6\n4 2 0 3 2 5",
    output3: "9",
    inputconstrains: "1 <= N <= 1000, 0 <= each height <= 10000",
    blacklist: "max, min, sort, reduce, select",
    whitelist: "def , while",
    sourcecode: `def trap_water(heights)
  left = 0
  right = heights.length - 1
  left_bound = 0
  right_bound = 0
  total = 0
  while left <= right
    if heights[left] <= heights[right]
      if heights[left] >= left_bound
        left_bound = heights[left]
      else
        total += left_bound - heights[left]
      end
      left += 1
    else
      if heights[right] >= right_bound
        right_bound = heights[right]
      else
        total += right_bound - heights[right]
      end
      right -= 1
    end
  end
  total
end

n = gets.to_i
heights = gets.split.map(&:to_i)
puts trap_water(heights)\n`,
  },
];

/* ───────────────────────── DAY 7 MCQ QUESTIONS ───────────────────────── */

const mcqs: MCQ[] = [
  /* ───── EASY (10) ───── */
  {
    title: "Array Literal Syntax",
    description: "Which of the following creates the array [1, 2, 3] in Ruby?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Array Creation and Initialization",
    Option1: "arr = [1, 2, 3]",
    Option2: "arr = {1, 2, 3}",
    Option3: "arr = (1, 2, 3)",
    Option4: "arr = <1, 2, 3>",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Array Index Access",
    description: "What does arr = [10, 20, 30]; arr[1] return in Ruby?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Array Access and Indexing",
    Option1: "10",
    Option2: "20",
    Option3: "30",
    Option4: "nil",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Negative Array Index",
    description: "What does arr = [5, 10, 15]; arr[-1] return in Ruby?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Array Access and Indexing",
    Option1: "-1",
    Option2: "5",
    Option3: "15",
    Option4: "nil",
    CorrectOption: 3,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Array Size Method",
    description: "Which of these methods does NOT return the size of an array?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Array Methods",
    Option1: "arr.size",
    Option2: "arr.length",
    Option3: "arr.count",
    Option4: "arr.dimension",
    CorrectOption: 4,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Array.new with Default",
    description: "What does Array.new(3, 0) create in Ruby?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Array Creation and Initialization",
    Option1: "[3, 0]",
    Option2: "[0, 0, 0]",
    Option3: "[3, 3, 3]",
    Option4: "[0]",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Array First Method",
    description: "What does [1, 2, 3].first return in Ruby?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Array Methods",
    Option1: "1",
    Option2: "3",
    Option3: "[1]",
    Option4: "nil",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Array Last Method",
    description: "What does [1, 2, 3].last return in Ruby?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Array Methods",
    Option1: "1",
    Option2: "3",
    Option3: "[3]",
    Option4: "nil",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Array Each Iterator",
    description: "Which method calls a block once for each element of an array?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Array Iteration",
    Option1: "each",
    Option2: "loop",
    Option3: "iterate",
    Option4: "for_each",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Out of Bounds Access",
    description: "What does arr = [10, 20, 30]; arr[5] return in Ruby?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Array Access and Indexing",
    Option1: "30",
    Option2: "0",
    Option3: "nil",
    Option4: "Raises IndexError",
    CorrectOption: 3,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Shovel Operator on Array",
    description: "What does arr = []; arr << 5 produce for the value of arr?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Array Creation and Initialization",
    Option1: "[5]",
    Option2: "5",
    Option3: "[5, nil]",
    Option4: "Raises an error",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },

  /* ───── MEDIUM (6) — snippets ───── */
  {
    title: "Map Doubler Output",
    description: "What does the following Ruby snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Array Transformation",
    Option1: "[2, 4, 6, 8]",
    Option2: "[1, 2, 3, 4]",
    Option3: "[1, 4, 9, 16]",
    Option4: "2 4 6 8",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `arr = [1, 2, 3, 4]
result = arr.map { |x| x * 2 }
puts result.inspect`,
    snippetLang: "ruby",
  },
  {
    title: "Array Max Output",
    description: "What does the following Ruby snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Array Methods",
    Option1: "1",
    Option2: "5",
    Option3: "8",
    Option4: "Raises an error",
    CorrectOption: 3,
    iscodesnippet: true,
    codesnippet: `arr = [5, 3, 8, 1]
puts arr.max`,
    snippetLang: "ruby",
  },
  {
    title: "Select Evens Length",
    description: "What does the following Ruby snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Array Transformation",
    Option1: "2",
    Option2: "3",
    Option3: "5",
    Option4: "4",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `arr = [1, 2, 3, 4, 5]
evens = arr.select { |x| x.even? }
puts evens.length`,
    snippetLang: "ruby",
  },
  {
    title: "Each Loop Sum",
    description: "What does the following Ruby snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Array Iteration",
    Option1: "60",
    Option2: "10",
    Option3: "30",
    Option4: "0",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `arr = [10, 20, 30]
sum = 0
arr.each { |x| sum += x }
puts sum`,
    snippetLang: "ruby",
  },
  {
    title: "Array Reverse Return",
    description: "What does [1, 2, 3].reverse return in Ruby?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Array Methods",
    Option1: "[3, 2, 1]",
    Option2: "[1, 2, 3]",
    Option3: "nil",
    Option4: "It mutates the original array and returns nil",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Reduce Plus Output",
    description: "What does the following Ruby snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Array Transformation",
    Option1: "4",
    Option2: "10",
    Option3: "[1, 2, 3, 4]",
    Option4: "1",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `arr = [1, 2, 3, 4]
puts arr.reduce(:+)`,
    snippetLang: "ruby",
  },

  /* ───── HARD (4) — snippets ───── */
  {
    title: "Multidimensional Access",
    description: "What does the following Ruby snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Multidimensional Arrays",
    Option1: "1",
    Option2: "2",
    Option3: "3",
    Option4: "4",
    CorrectOption: 3,
    iscodesnippet: true,
    codesnippet: `matrix = [[1, 2], [3, 4]]
puts matrix[1][0]`,
    snippetLang: "ruby",
  },
  {
    title: "Block Form Array.new",
    description: "What does the following Ruby snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Multidimensional Arrays",
    Option1: "9",
    Option2: "0",
    Option3: "nil",
    Option4: "Raises an error",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `grid = Array.new(2) { Array.new(2, 0) }
grid[0][1] = 9
puts grid[1][1]`,
    snippetLang: "ruby",
  },
  {
    title: "Each With Index Output",
    description:
      "What is printed by the following Ruby snippet (three lines of output)?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Array Iteration",
    Option1: "0-10 then 1-20 then 2-30 (each on its own line)",
    Option2: "10-0 then 20-1 then 30-2 (each on its own line)",
    Option3: "1-10 then 2-20 then 3-30 (each on its own line)",
    Option4: "0-10 1-20 2-30 (all on a single line)",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `arr = [10, 20, 30]
arr.each_with_index { |v, i| puts "#{i}-#{v}" }`,
    snippetLang: "ruby",
  },
  {
    title: "Uniq Length Output",
    description: "What does the following Ruby snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Array Methods",
    Option1: "6",
    Option2: "3",
    Option3: "1",
    Option4: "Raises an error",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `arr = [1, 2, 2, 3, 3, 3]
puts arr.uniq.length`,
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
