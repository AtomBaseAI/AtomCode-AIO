import { writeFileSync } from "node:fs";

const DAY = 3;
const TOPIC = "Operators";
const SUBTOPICS = [
  "Arithmetic Operators",
  "Comparison Operators",
  "Logical Operators",
  "Bitwise Operators",
  "Assignment Operators",
  "Conditional (Ternary) Operator",
  "Range Operators",
  "Spaceship Operator",
  "Operator Precedence and Associativity",
];

interface CodeQ {
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

interface McqQ {
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

const questions: CodeQ[] = [
  // ───────────────────────── EASY-BASIC (6) ─────────────────────────
  {
    title: "Two-Integer Arithmetic Drill",
    description:
      "Read two positive integers from stdin and print five arithmetic results, one per line: sum, difference (first minus second), product, integer quotient, and remainder.\n\nInput Format:\nTwo space-separated integers a and b on one line.\n\nOutput Format:\nFive lines: a+b, a-b, a*b, a/b (integer), a%b.\n\nConstraints:\n1 <= a, b <= 1000",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Arithmetic Operators",
    sampleinput1: "12 5",
    sampleoutput1: "17\n7\n60\n2\n2",
    sampleinput2: "20 4",
    sampleoutput2: "24\n16\n80\n5\n0",
    input1: "8 3",
    output1: "11\n5\n24\n2\n2",
    input2: "100 7",
    output2: "107\n93\n700\n14\n2",
    input3: "50 10",
    output3: "60\n40\n500\n5\n0",
    inputconstrains: "1 <= a, b <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `a, b = gets.split.map(&:to_i)
puts a + b
puts a - b
puts a * b
puts a / b
puts a % b
`,
  },
  {
    title: "Maximum of Two Integers",
    description:
      "Read two integers and print the larger one using a comparison operator.\n\nInput Format:\nTwo space-separated integers a and b.\n\nOutput Format:\nSingle line: the larger integer.\n\nConstraints:\n-1000 <= a, b <= 1000",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Comparison Operators",
    sampleinput1: "12 5",
    sampleoutput1: "12",
    sampleinput2: "3 8",
    sampleoutput2: "8",
    input1: "-5 -10",
    output1: "-5",
    input2: "0 0",
    output2: "0",
    input3: "999 1000",
    output3: "1000",
    inputconstrains: "-1000 <= a, b <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `a, b = gets.split.map(&:to_i)
puts a > b ? a : b
`,
  },
  {
    title: "Three-Flag Logical Check",
    description:
      "Read three integer flags (0 or 1) and convert each to a boolean. Print the AND of all three and the OR of all three on separate lines.\n\nInput Format:\nThree space-separated integers (0 or 1).\n\nOutput Format:\nTwo lines: \"AND: <bool>\" and \"OR: <bool>\".\n\nConstraints:\nEach input is 0 or 1.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Logical Operators",
    sampleinput1: "1 1 0",
    sampleoutput1: "AND: false\nOR: true",
    sampleinput2: "0 0 0",
    sampleoutput2: "AND: false\nOR: false",
    input1: "1 1 1",
    output1: "AND: true\nOR: true",
    input2: "0 1 0",
    output2: "AND: false\nOR: true",
    input3: "1 0 1",
    output3: "AND: false\nOR: true",
    inputconstrains: "Each input is 0 or 1",
    blacklist: "",
    whitelist: "",
    sourcecode: `a, b, c = gets.split.map { |x| x == "1" }
puts "AND: #{a && b && c}"
puts "OR: #{a || b || c}"
`,
  },
  {
    title: "Bitwise Drill on Two Bytes",
    description:
      "Read two integers and print four bitwise results, one per line: a&b, a|b, a^b, and a shifted left by 2.\n\nInput Format:\nTwo space-separated integers a and b.\n\nOutput Format:\nFour lines: a&b, a|b, a^b, a<<2.\n\nConstraints:\n0 <= a, b <= 1000",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Bitwise Operators",
    sampleinput1: "12 10",
    sampleoutput1: "8\n14\n6\n48",
    sampleinput2: "5 3",
    sampleoutput2: "1\n7\n6\n20",
    input1: "7 7",
    output1: "7\n7\n0\n28",
    input2: "15 8",
    output2: "8\n15\n7\n60",
    input3: "0 9",
    output3: "0\n9\n9\n0",
    inputconstrains: "0 <= a, b <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `a, b = gets.split.map(&:to_i)
puts a & b
puts a | b
puts a ^ b
puts a << 2
`,
  },
  {
    title: "Compound Assignment Cascade",
    description:
      "Read a single integer n and apply compound assignment operators in sequence, printing the result after each step. Operations: += 5, -= 3, *= 2, /= 4, %= 7.\n\nInput Format:\nOne integer n on a line.\n\nOutput Format:\nFive lines, the value of n after each compound assignment.\n\nConstraints:\n1 <= n <= 1000",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Assignment Operators",
    sampleinput1: "20",
    sampleoutput1: "25\n22\n44\n11\n4",
    sampleinput2: "10",
    sampleoutput2: "15\n12\n24\n6\n6",
    input1: "8",
    output1: "13\n10\n20\n5\n5",
    input2: "100",
    output2: "105\n102\n204\n51\n2",
    input3: "1",
    output3: "6\n3\n6\n1\n1",
    inputconstrains: "1 <= n <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = gets.to_i
n += 5
puts n
n -= 3
puts n
n *= 2
puts n
n /= 4
puts n
n %= 7
puts n
`,
  },
  {
    title: "Range Bounds Checker",
    description:
      "Read three integers lo, hi, x and print \"inside\" if x falls within the inclusive range lo..hi, otherwise \"outside\". Use the range operator and case-equality.\n\nInput Format:\nThree space-separated integers lo hi x.\n\nOutput Format:\nSingle line: \"inside\" or \"outside\".\n\nConstraints:\n0 <= lo <= hi <= 1000, 0 <= x <= 1000",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Range Operators",
    sampleinput1: "1 10 5",
    sampleoutput1: "inside",
    sampleinput2: "1 10 15",
    sampleoutput2: "outside",
    input1: "0 0 0",
    output1: "inside",
    input2: "50 100 75",
    output2: "inside",
    input3: "50 100 200",
    output3: "outside",
    inputconstrains: "0 <= lo <= hi <= 1000, 0 <= x <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `lo, hi, x = gets.split.map(&:to_i)
puts (lo..hi) === x ? "inside" : "outside"
`,
  },

  // ───────────────────────── EASY-SCENARIO (4) ─────────────────────────
  {
    title: "Bakery Bill with Sales Tax",
    description:
      "A bakery charges `price` dollars per loaf. A customer buys `qty` loaves, and the city applies `tax` percent sales tax. Compute the grand total.\n\nInput Format:\nThree space-separated values: price (float), qty (int), tax (int percent).\n\nOutput Format:\nSingle line: grand total formatted to two decimals.\n\nConstraints:\n0 < price <= 1000, 1 <= qty <= 1000, 0 <= tax <= 30",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Arithmetic Operators",
    sampleinput1: "4.50 3 8",
    sampleoutput1: "14.58",
    sampleinput2: "2.00 5 5",
    sampleoutput2: "10.50",
    input1: "1.99 2 10",
    output1: "4.38",
    input2: "10.00 7 0",
    output2: "70.00",
    input3: "3.25 4 12",
    output3: "14.56",
    inputconstrains: "0 < price <= 1000, 1 <= qty <= 1000, 0 <= tax <= 30",
    blacklist: "",
    whitelist: "",
    sourcecode: `price, qty, tax = gets.split
price = price.to_f
qty = qty.to_i
tax = tax.to_f
total = price * qty
grand = total * (1 + tax / 100.0)
puts "%.2f" % grand
`,
  },
  {
    title: "Library Late Fee Capped",
    description:
      "A library charges 0.50 per day overdue plus a flat 2.00 processing fee, but the total fine is capped at 20.00. Read days_overdue and print the fine.\n\nInput Format:\nOne integer days_overdue.\n\nOutput Format:\nSingle line: fine formatted to two decimals.\n\nConstraints:\n0 <= days_overdue <= 365",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Comparison Operators",
    sampleinput1: "5",
    sampleoutput1: "4.50",
    sampleinput2: "100",
    sampleoutput2: "20.00",
    input1: "0",
    output1: "2.00",
    input2: "10",
    output2: "7.00",
    input3: "36",
    output3: "20.00",
    inputconstrains: "0 <= days_overdue <= 365",
    blacklist: "",
    whitelist: "",
    sourcecode: `days = gets.to_i
fee = days * 0.50 + 2.0
fee = fee > 20.0 ? 20.0 : fee
puts "%.2f" % fee
`,
  },
  {
    title: "Permission Flag Checker",
    description:
      "A file system uses bitmask permissions where read=4, write=2, execute=1. Read a permission mask and a required permission, then print \"granted\" if the mask has every bit in required set, else \"denied\".\n\nInput Format:\nTwo space-separated integers mask and required.\n\nOutput Format:\nSingle line: \"granted\" or \"denied\".\n\nConstraints:\n0 <= mask, required <= 7",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Bitwise Operators",
    sampleinput1: "7 4",
    sampleoutput1: "granted",
    sampleinput2: "5 2",
    sampleoutput2: "denied",
    input1: "7 3",
    output1: "granted",
    input2: "6 1",
    output2: "denied",
    input3: "15 8",
    output3: "granted",
    inputconstrains: "0 <= mask, required <= 7",
    blacklist: "",
    whitelist: "",
    sourcecode: `mask, req = gets.split.map(&:to_i)
puts (mask & req) == req ? "granted" : "denied"
`,
  },
  {
    title: "Score-to-Grade Mapper",
    description:
      "Map a numeric score to a letter grade using the range operator and ternary chains: 90..100 = A, 80..89 = B, 70..79 = C, 60..69 = D, otherwise F.\n\nInput Format:\nOne integer score.\n\nOutput Format:\nSingle line: the grade letter.\n\nConstraints:\n0 <= score <= 100",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Conditional (Ternary) Operator",
    sampleinput1: "95",
    sampleoutput1: "A",
    sampleinput2: "73",
    sampleoutput2: "C",
    input1: "88",
    output1: "B",
    input2: "65",
    output2: "D",
    input3: "50",
    output3: "F",
    inputconstrains: "0 <= score <= 100",
    blacklist: "",
    whitelist: "",
    sourcecode: `score = gets.to_i
grade = (90..100) === score ? "A" :
        (80..89) === score ? "B" :
        (70..79) === score ? "C" :
        (60..69) === score ? "D" : "F"
puts grade
`,
  },

  // ───────────────────────── MEDIUM-SCENARIO (6) ─────────────────────────
  {
    title: "Pizza Party Slicer",
    description:
      "A pizza party has `pizzas` pizzas, each with `slices_per` slices, shared by `people` guests. Compute how many whole slices each guest receives (integer division) and how many slices are left over.\n\nInput Format:\nThree space-separated integers pizzas slices_per people.\n\nOutput Format:\nSingle line: two integers separated by a space: slices_per_guest and leftover.\n\nConstraints:\n1 <= pizzas, slices_per, people <= 1000",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Arithmetic Operators",
    sampleinput1: "3 8 5",
    sampleoutput1: "4 4",
    sampleinput2: "2 6 4",
    sampleoutput2: "3 0",
    input1: "5 10 7",
    output1: "7 1",
    input2: "1 12 5",
    output2: "2 2",
    input3: "10 6 13",
    output3: "4 8",
    inputconstrains: "1 <= pizzas, slices_per, people <= 1000",
    blacklist: "divmod, .div, fdiv",
    whitelist: "/ people, % people",
    sourcecode: `pizzas, slices_per, people = gets.split.map(&:to_i)
total = pizzas * slices_per
per_person = total / people
left = total % people
puts "#{per_person} #{left}"
`,
  },
  {
    title: "Three-Number Sort by Spaceship",
    description:
      "Read three integers and print them in ascending order, one per line, using the spaceship operator <=> for comparisons and arithmetic to recover the middle value.\n\nInput Format:\nThree space-separated integers.\n\nOutput Format:\nThree lines: smallest, middle, largest.\n\nConstraints:\n-1000 <= each <= 1000",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Spaceship Operator",
    sampleinput1: "5 9 3",
    sampleoutput1: "3\n5\n9",
    sampleinput2: "10 20 15",
    sampleoutput2: "10\n15\n20",
    input1: "8 1 4",
    output1: "1\n4\n8",
    input2: "100 50 75",
    output2: "50\n75\n100",
    input3: "7 7 7",
    output3: "7\n7\n7",
    inputconstrains: "-1000 <= each <= 1000",
    blacklist: "sort, .max, .min, min, max",
    whitelist: "<=>, &&",
    sourcecode: `a, b, c = gets.split.map(&:to_i)
small = (a <=> b) <= 0 && (a <=> c) <= 0 ? a : ((b <=> c) <= 0 ? b : c)
large = (a <=> b) >= 0 && (a <=> c) >= 0 ? a : ((b <=> c) >= 0 ? b : c)
mid = a + b + c - small - large
puts small
puts mid
puts large
`,
  },
  {
    title: "Subnet Mask Equality",
    description:
      "Two hosts are on the same subnet if their IP octets AND'd with a mask produce equal network portions. Read octet_a, octet_b, and mask, then print \"yes\" if the hosts share a subnet, otherwise \"no\".\n\nInput Format:\nThree space-separated integers a b mask.\n\nOutput Format:\nSingle line: \"yes\" or \"no\".\n\nConstraints:\n0 <= a, b, mask <= 255",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Bitwise Operators",
    sampleinput1: "192 200 240",
    sampleoutput1: "yes",
    sampleinput2: "192 168 248",
    sampleoutput2: "no",
    input1: "10 11 248",
    output1: "yes",
    input2: "127 64 255",
    output2: "no",
    input3: "127 127 255",
    output3: "yes",
    inputconstrains: "0 <= a, b, mask <= 255",
    blacklist: "to_s, ip, class, case, when, if",
    whitelist: "a & m, == nb",
    sourcecode: `a, b, m = gets.split.map(&:to_i)
na = a & m
nb = b & m
puts na == nb ? "yes" : "no"
`,
  },
  {
    title: "Toll Plaza Discount Multiplier",
    description:
      "A toll plaza applies discounts multiplicatively: carpoolers pay 50%, electric vehicles pay 70%, and peak hours add a 25% surcharge. Read carpool_flag, electric_flag, peak_flag, and base_toll, then print the final toll.\n\nInput Format:\nFour space-separated integers: cp ev pk base (each flag is 0 or 1; base is the toll).\n\nOutput Format:\nSingle line: final toll formatted to two decimals.\n\nConstraints:\nbase in 1..1000, each flag is 0 or 1",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Logical Operators",
    sampleinput1: "0 0 0 100",
    sampleoutput1: "100.00",
    sampleinput2: "1 1 1 100",
    sampleoutput2: "43.75",
    input1: "1 0 0 20",
    output1: "10.00",
    input2: "0 1 1 8",
    output2: "7.00",
    input3: "1 1 1 50",
    output3: "21.88",
    inputconstrains: "1 <= base <= 1000, each flag is 0 or 1",
    blacklist: "if, unless, case, when, while, until",
    whitelist: "factor *=, cp == 1",
    sourcecode: `cp, ev, pk, base = gets.split.map(&:to_i)
factor = 1.0
factor *= cp == 1 ? 0.5 : 1.0
factor *= ev == 1 ? 0.7 : 1.0
factor *= pk == 1 ? 1.25 : 1.0
puts "%.2f" % (base * factor)
`,
  },
  {
    title: "Pagination Range Builder",
    description:
      "A paginated list shows `size` items per page. Given the total item count, page size, and 1-indexed page number, compute the inclusive range string (e.g., \"1..10\") of indices displayed on that page, clamped at the total.\n\nInput Format:\nThree space-separated integers total size page.\n\nOutput Format:\nSingle line: \"start..end\".\n\nConstraints:\n1 <= total, size <= 10000, 1 <= page <= ceil(total / size)",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Range Operators",
    sampleinput1: "55 25 3",
    sampleoutput1: "51..55",
    sampleinput2: "100 10 5",
    sampleoutput2: "41..50",
    input1: "100 10 1",
    output1: "1..10",
    input2: "55 25 2",
    output2: "26..50",
    input3: "100 10 10",
    output3: "91..100",
    inputconstrains: "1 <= total, size <= 10000, valid page index",
    blacklist: "each, times, .min, .max, sort, inject, reduce",
    whitelist: ".., ? total :",
    sourcecode: `total, size, page = gets.split.map(&:to_i)
start_idx = (page - 1) * size + 1
end_idx = start_idx + size - 1
end_idx = end_idx > total ? total : end_idx
puts "#{start_idx}..#{end_idx}"
`,
  },
  {
    title: "Compound Expression Precedence",
    description:
      "Read four integers a, b, c, d and evaluate the boolean expression (a + b) * c < d && a != b || c == d using Ruby's native operator precedence. Print the result.\n\nInput Format:\nFour space-separated integers a b c d.\n\nOutput Format:\nSingle line: \"true\" or \"false\".\n\nConstraints:\n-1000 <= a, b, c, d <= 1000",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Operator Precedence and Associativity",
    sampleinput1: "1 2 3 20",
    sampleoutput1: "true",
    sampleinput2: "5 5 1 2",
    sampleoutput2: "false",
    input1: "10 1 2 30",
    output1: "true",
    input2: "3 3 5 20",
    output2: "false",
    input3: "1 1 1 1",
    output3: "true",
    inputconstrains: "-1000 <= a, b, c, d <= 1000",
    blacklist: "eval, send, define_method, if, unless, case, when",
    whitelist: "&&, ||",
    sourcecode: `a, b, c, d = gets.split.map(&:to_i)
result = (a + b) * c < d && a != b || c == d
puts result
`,
  },

  // ───────────────────────── HARD-SCENARIO (4) ─────────────────────────
  {
    title: "RGB Color Blender with Clamping",
    description:
      "Blend two RGB colors using alpha (0..100) as a percentage of the second color. Each blended channel is clamped to the legal range 0..255. Print all three channels formatted to two decimals, space-separated.\n\nInput Format:\nSeven space-separated integers: r1 g1 b1 r2 g2 b2 alpha.\n\nOutput Format:\nSingle line: \"r g b\" each formatted to two decimals.\n\nConstraints:\n0 <= each color <= 255, 0 <= alpha <= 100",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Bitwise Operators",
    sampleinput1: "100 50 25 200 100 50 50",
    sampleoutput1: "150.00 75.00 37.50",
    sampleinput2: "0 0 0 255 255 255 25",
    sampleoutput2: "63.75 63.75 63.75",
    input1: "10 20 30 100 200 50 100",
    output1: "100.00 200.00 50.00",
    input2: "128 128 128 64 64 64 75",
    output2: "80.00 80.00 80.00",
    input3: "255 0 0 0 255 0 50",
    output3: "127.50 127.50 0.00",
    inputconstrains: "0 <= each color <= 255, 0 <= alpha <= 100",
    blacklist: "clamp, min, max, each, class, lambda, proc",
    whitelist: "< 0 ?, > 255 ?",
    sourcecode: `r1, g1, b1, r2, g2, b2, alpha = gets.split.map(&:to_i)
a = alpha / 100.0
nr = (1 - a) * r1 + a * r2
ng = (1 - a) * g1 + a * g2
nb = (1 - a) * b1 + a * b2
nr = nr < 0 ? 0 : (nr > 255 ? 255 : nr)
ng = ng < 0 ? 0 : (ng > 255 ? 255 : ng)
nb = nb < 0 ? 0 : (nb > 255 ? 255 : nb)
puts "%.2f %.2f %.2f" % [nr, ng, nb]
`,
  },
  {
    title: "Tiebreaker Leaderboard",
    description:
      "Three players each submit a (id, score) entry. The winner is the player with the highest score; ties are broken by the smallest id. Determine the winner using the spaceship operator and logical operators only.\n\nInput Format:\nThree lines, each with two space-separated integers: id and score.\n\nOutput Format:\nSingle line: the winning player id.\n\nConstraints:\n1 <= id <= 1000, 0 <= score <= 1000",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Spaceship Operator",
    sampleinput1: "1 50\n2 70\n3 70",
    sampleoutput1: "2",
    sampleinput2: "10 80\n20 80\n30 70",
    sampleoutput2: "10",
    input1: "5 90\n3 90\n4 80",
    output1: "3",
    input2: "7 60\n8 75\n9 75",
    output2: "8",
    input3: "1 100\n2 100\n3 100",
    output3: "1",
    inputconstrains: "1 <= id <= 1000, 0 <= score <= 1000",
    blacklist: "sort, .max, .min, each, times, while, until, for, if, unless, case, when",
    whitelist: "<=>, &&",
    sourcecode: `a = gets.split.map(&:to_i)
b = gets.split.map(&:to_i)
c = gets.split.map(&:to_i)
winner = (b[1] <=> a[1]) > 0 ? b : ((b[1] <=> a[1]) == 0 && b[0] < a[0] ? b : a)
winner = (c[1] <=> winner[1]) > 0 ? c : ((c[1] <=> winner[1]) == 0 && c[0] < winner[0] ? c : winner)
puts winner[0]
`,
  },
  {
    title: "Fiscal Calendar Quarter and Peak",
    description:
      "Given a month (1..12) and day, compute the calendar quarter (1..4), fiscal half (\"H1\" for months 1..6, \"H2\" otherwise), and whether the month is in peak season (months 6..8 or month 12). Use the range operator and case-equality only.\n\nInput Format:\nTwo space-separated integers month day.\n\nOutput Format:\nSingle line: \"Qx Hx peak|off\".\n\nConstraints:\n1 <= month <= 12, 1 <= day <= 31",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Range Operators",
    sampleinput1: "3 15",
    sampleoutput1: "Q1 H1 off",
    sampleinput2: "8 20",
    sampleoutput2: "Q3 H2 peak",
    input1: "6 1",
    output1: "Q2 H1 peak",
    input2: "11 4",
    output2: "Q4 H2 off",
    input3: "12 25",
    output3: "Q4 H2 peak",
    inputconstrains: "1 <= month <= 12, 1 <= day <= 31",
    blacklist: "case, when, if, elsif, else, unless, between?, cover?",
    whitelist: ".., ===",
    sourcecode: `month, day = gets.split.map(&:to_i)
quarter = (1..3) === month ? 1 :
           (4..6) === month ? 2 :
           (7..9) === month ? 3 : 4
half = (1..6) === month ? "H1" : "H2"
peak = ((6..8) === month || month == 12) ? "peak" : "off"
puts "Q#{quarter} #{half} #{peak}"
`,
  },
  {
    title: "Compound Interest with Premium Fee",
    description:
      "A bank computes compound interest annually: final = principal * (1 + rate/100) ** years. A fee of fee_pct percent of the final amount is charged; premium customers pay half the fee. Print the net amount.\n\nInput Format:\nFive space-separated integers: principal rate years fee_pct premium (premium is 0 or 1).\n\nOutput Format:\nSingle line: net amount formatted to two decimals.\n\nConstraints:\n1 <= principal <= 1000000, 1 <= rate <= 30, 1 <= years <= 30, 0 <= fee_pct <= 10, premium in {0, 1}",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Operator Precedence and Associativity",
    sampleinput1: "1000 10 2 1 0",
    sampleoutput1: "1197.90",
    sampleinput2: "2000 10 3 2 1",
    sampleoutput2: "2635.38",
    input1: "500 8 1 1 0",
    output1: "534.60",
    input2: "1500 4 5 2 1",
    output2: "1806.73",
    input3: "100 6 4 0 0",
    output3: "126.25",
    inputconstrains: "1 <= principal <= 1000000, 1 <= rate <= 30, 1 <= years <= 30, 0 <= fee_pct <= 10, premium in {0,1}",
    blacklist: "eval, class, Math, pow, if, case, when, each, times",
    whitelist: "**, premium == 1 ?",
    sourcecode: `principal, rate, years, fee_pct, premium = gets.split.map(&:to_i)
final = principal * (1 + rate / 100.0) ** years
fee = final * fee_pct / 100.0
fee = premium == 1 ? fee / 2.0 : fee
net = final - fee
puts "%.2f" % net
`,
  },
];

const mcqs: McqQ[] = [
  // ───────────── EASY (10) ─────────────
  {
    title: "Ruby Integer Quotient",
    description: "In Ruby, what is the result of `7 / 2` when both operands are integers?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Arithmetic Operators",
    Option1: "3",
    Option2: "3.5",
    Option3: "4",
    Option4: "Raises ZeroDivisionError",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Remainder Operator Output",
    description: "What does the modulo operator `%` return for `10 % 3`?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Arithmetic Operators",
    Option1: "1",
    Option2: "3",
    Option3: "0",
    Option4: "10",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Exponent Operator Result",
    description: "What is the value of `2 ** 5` in Ruby?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Arithmetic Operators",
    Option1: "10",
    Option2: "25",
    Option3: "32",
    Option4: "7",
    CorrectOption: 3,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Spaceship Operator Result",
    description: "What does the spaceship operator `5 <=> 10` return?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Spaceship Operator",
    Option1: "-1",
    Option2: "0",
    Option3: "1",
    Option4: "true",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Logical AND Evaluation",
    description: "What does `true && false` evaluate to in Ruby?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Logical Operators",
    Option1: "true",
    Option2: "false",
    Option3: "nil",
    Option4: "Raises an error",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Logical OR with nil",
    description: "What does `nil || \"default\"` return?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Logical Operators",
    Option1: "nil",
    Option2: "\"default\"",
    Option3: "true",
    Option4: "Raises NoMethodError",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Bitwise AND Output",
    description: "What is the result of `5 & 3` (bitwise AND)?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Bitwise Operators",
    Option1: "1",
    Option2: "8",
    Option3: "15",
    Option4: "2",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Bitwise OR Result",
    description: "What is the result of `5 | 2` (bitwise OR)?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Bitwise Operators",
    Option1: "7",
    Option2: "0",
    Option3: "3",
    Option4: "5",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Ternary Returns String",
    description: "What does `5 > 3 ? \"yes\" : \"no\"` return?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Conditional (Ternary) Operator",
    Option1: "\"yes\"",
    Option2: "\"no\"",
    Option3: "true",
    Option4: "5",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Inclusive Range Length",
    description: "How many integer elements does the range `(1..5)` include?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Range Operators",
    Option1: "4",
    Option2: "5",
    Option3: "6",
    Option4: "1",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },

  // ───────────── MEDIUM (6) ─────────────
  {
    title: "Division Then Multiplication",
    description: "What does the following Ruby snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Operator Precedence and Associativity",
    Option1: "10",
    Option2: "9",
    Option3: "9.99",
    Option4: "9.0",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `puts 10 / 3 * 3`,
    snippetLang: "ruby",
  },
  {
    title: "Ternary With Modulo And Division",
    description: "What does the following Ruby snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Conditional (Ternary) Operator",
    Option1: "\"A\"",
    Option2: "\"B\"",
    Option3: "true",
    Option4: "false",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `puts (7 % 4 == 3) && (5 / 2 == 2) ? "A" : "B"`,
    snippetLang: "ruby",
  },
  {
    title: "Bit Shift Left Output",
    description: "What does the following Ruby snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Bitwise Operators",
    Option1: "4",
    Option2: "16",
    Option3: "9",
    Option4: "64",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `x = 8
puts x << 1`,
    snippetLang: "ruby",
  },
  {
    title: "Range Include Check",
    description: "What does the following Ruby snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Range Operators",
    Option1: "\"Y\"",
    Option2: "\"N\"",
    Option3: "true",
    Option4: "4",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `puts (3..5).include?(4) ? "Y" : "N"`,
    snippetLang: "ruby",
  },
  {
    title: "Ternary Branch Selection",
    description: "What does the following Ruby snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Conditional (Ternary) Operator",
    Option1: "6",
    Option2: "10",
    Option3: "5",
    Option4: "3",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `a = 3
b = 5
puts a > b ? a * 2 : b * 2`,
    snippetLang: "ruby",
  },
  {
    title: "Spaceship Equality",
    description: "What does the following Ruby snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Spaceship Operator",
    Option1: "0",
    Option2: "1",
    Option3: "-1",
    Option4: "true",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `puts 5 <=> 5`,
    snippetLang: "ruby",
  },

  // ───────────── HARD (4) ─────────────
  {
    title: "Exponent Precedence Chain",
    description: "What does the following Ruby snippet print? (Note the operator precedence.)",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Operator Precedence and Associativity",
    Option1: "50",
    Option2: "36",
    Option3: "100",
    Option4: "32",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `puts 2 + 3 * 4 ** 2`,
    snippetLang: "ruby",
  },
  {
    title: "Multi-Argument Puts",
    description: "What does the following Ruby snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Arithmetic Operators",
    Option1: "3, 1, and 1000 on three separate lines",
    Option2: "3 1 1000 on a single line",
    Option3: "1000",
    Option4: "311000",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `a = 10
b = 3
puts a / b, a % b, a ** b`,
    snippetLang: "ruby",
  },
  {
    title: "Bitwise Combined Expression",
    description: "What does the following Ruby snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Bitwise Operators",
    Option1: "6",
    Option2: "2",
    Option3: "4",
    Option4: "0",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `x = 6
y = 4
puts (x & y) | (x ^ y)`,
    snippetLang: "ruby",
  },
  {
    title: "Short-Circuit OR Chain",
    description: "What does the following Ruby snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Logical Operators",
    Option1: "default",
    Option2: "true",
    Option3: "false",
    Option4: "(prints an empty line)",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `a = true
b = false
c = nil
puts (a && b) || c || "default"`,
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
