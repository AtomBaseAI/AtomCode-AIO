import { writeFileSync } from "node:fs";

const DAY = 4;
const TOPIC = "Control Flow";
const SUBTOPICS = [
  "if elsif else Statements",
  "unless Statement",
  "case when Statement",
  "Modifier Forms of if and unless",
  "Nested Control Structures",
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
    title: "Integer Sign Classifier",
    description:
      "Read an integer and classify it as positive, negative, or zero using an if/elsif/else statement.\n\nInput Format:\nOne integer n.\n\nOutput Format:\nSingle line: \"positive\", \"negative\", or \"zero\".\n\nConstraints:\n-1000000 <= n <= 1000000",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "if elsif else Statements",
    sampleinput1: "5",
    sampleoutput1: "positive",
    sampleinput2: "-3",
    sampleoutput2: "negative",
    input1: "0",
    output1: "zero",
    input2: "100",
    output2: "positive",
    input3: "-50",
    output3: "negative",
    inputconstrains: "-1000000 <= n <= 1000000",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = gets.to_i
if n > 0
  puts "positive"
elsif n < 0
  puts "negative"
else
  puts "zero"
end
`,
  },
  {
    title: "Adult or Minor with Unless",
    description:
      "Read an age and print \"adult\" if the person is 18 or older, otherwise \"minor\", using an unless statement.\n\nInput Format:\nOne integer age.\n\nOutput Format:\nSingle line: \"adult\" or \"minor\".\n\nConstraints:\n0 <= age <= 120",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "unless Statement",
    sampleinput1: "20",
    sampleoutput1: "adult",
    sampleinput2: "15",
    sampleoutput2: "minor",
    input1: "18",
    output1: "adult",
    input2: "0",
    output2: "minor",
    input3: "65",
    output3: "adult",
    inputconstrains: "0 <= age <= 120",
    blacklist: "",
    whitelist: "",
    sourcecode: `age = gets.to_i
unless age >= 18
  puts "minor"
else
  puts "adult"
end
`,
  },
  {
    title: "Day of Week from Number",
    description:
      "Read an integer 1..7 and print the corresponding weekday abbreviation (Mon, Tue, Wed, Thu, Fri, Sat, Sun) using a case/when statement.\n\nInput Format:\nOne integer n (1..7).\n\nOutput Format:\nSingle line: the weekday abbreviation.\n\nConstraints:\n1 <= n <= 7",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "case when Statement",
    sampleinput1: "1",
    sampleoutput1: "Mon",
    sampleinput2: "7",
    sampleoutput2: "Sun",
    input1: "3",
    output1: "Wed",
    input2: "5",
    output2: "Fri",
    input3: "2",
    output3: "Tue",
    inputconstrains: "1 <= n <= 7",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = gets.to_i
day = case n
when 1 then "Mon"
when 2 then "Tue"
when 3 then "Wed"
when 4 then "Thu"
when 5 then "Fri"
when 6 then "Sat"
when 7 then "Sun"
end
puts day
`,
  },
  {
    title: "Square If Positive",
    description:
      "Read an integer n. If n is positive, print its square; otherwise print \"skip\". Use modifier forms of if and unless.\n\nInput Format:\nOne integer n.\n\nOutput Format:\nSingle line: the square (integer) or \"skip\".\n\nConstraints:\n-1000 <= n <= 1000",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Modifier Forms of if and unless",
    sampleinput1: "5",
    sampleoutput1: "25",
    sampleinput2: "-2",
    sampleoutput2: "skip",
    input1: "0",
    output1: "skip",
    input2: "10",
    output2: "100",
    input3: "-5",
    output3: "skip",
    inputconstrains: "-1000 <= n <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = gets.to_i
puts n * n if n > 0
puts "skip" unless n > 0
`,
  },
  {
    title: "Maximum of Three Nested",
    description:
      "Read three integers and print the largest one using nested if statements.\n\nInput Format:\nThree space-separated integers a b c.\n\nOutput Format:\nSingle line: the largest integer.\n\nConstraints:\n-1000 <= a, b, c <= 1000",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Nested Control Structures",
    sampleinput1: "5 9 3",
    sampleoutput1: "9",
    sampleinput2: "10 3 7",
    sampleoutput2: "10",
    input1: "8 8 8",
    output1: "8",
    input2: "1 5 3",
    output2: "5",
    input3: "100 50 75",
    output3: "100",
    inputconstrains: "-1000 <= a, b, c <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `a, b, c = gets.split.map(&:to_i)
if a >= b
  if a >= c
    puts a
  else
    puts c
  end
else
  if b >= c
    puts b
  else
    puts c
  end
end
`,
  },
  {
    title: "Grade Letter from Score",
    description:
      "Read a numeric score (0..100) and print the letter grade: A (>=90), B (>=80), C (>=70), D (>=60), F (otherwise) using if/elsif/else.\n\nInput Format:\nOne integer score.\n\nOutput Format:\nSingle line: the grade letter.\n\nConstraints:\n0 <= score <= 100",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "if elsif else Statements",
    sampleinput1: "95",
    sampleoutput1: "A",
    sampleinput2: "73",
    sampleoutput2: "C",
    input1: "85",
    output1: "B",
    input2: "65",
    output2: "D",
    input3: "50",
    output3: "F",
    inputconstrains: "0 <= score <= 100",
    blacklist: "",
    whitelist: "",
    sourcecode: `score = gets.to_i
if score >= 90
  puts "A"
elsif score >= 80
  puts "B"
elsif score >= 70
  puts "C"
elsif score >= 60
  puts "D"
else
  puts "F"
end
`,
  },

  // ───────────────────────── EASY-SCENARIO (4) ─────────────────────────
  {
    title: "ATM Withdrawal Fee Tiers",
    description:
      "An ATM charges a withdrawal fee based on the amount tiered as follows: amounts below 100 incur 0 fee, 100..499 incur 2, 500..999 incur 5, and 1000 or more incur 10. Read the amount and print the fee.\n\nInput Format:\nOne integer amount.\n\nOutput Format:\nSingle line: the fee (integer).\n\nConstraints:\n0 <= amount <= 100000",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "if elsif else Statements",
    sampleinput1: "100",
    sampleoutput1: "2",
    sampleinput2: "1500",
    sampleoutput2: "10",
    input1: "50",
    output1: "0",
    input2: "700",
    output2: "5",
    input3: "2000",
    output3: "10",
    inputconstrains: "0 <= amount <= 100000",
    blacklist: "",
    whitelist: "",
    sourcecode: `amount = gets.to_i
if amount < 100
  fee = 0
elsif amount < 500
  fee = 2
elsif amount < 1000
  fee = 5
else
  fee = 10
end
puts fee
`,
  },
  {
    title: "Simple Calculator Operation",
    description:
      "Read a binary expression as three space-separated tokens: a op b where op is one of + - * / %. Compute and print the integer result using a case/when statement.\n\nInput Format:\nThree space-separated tokens: integer, operator, integer.\n\nOutput Format:\nSingle line: integer result.\n\nConstraints:\noperator in {+,-,*,/,%}; 1 <= operands <= 1000; b != 0 for / and %",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "case when Statement",
    sampleinput1: "12 + 5",
    sampleoutput1: "17",
    sampleinput2: "20 / 4",
    sampleoutput2: "5",
    input1: "8 - 3",
    output1: "5",
    input2: "6 * 7",
    output2: "42",
    input3: "17 % 5",
    output3: "2",
    inputconstrains: "1 <= operands <= 1000, b != 0",
    blacklist: "",
    whitelist: "",
    sourcecode: `a, op, b = gets.split
a = a.to_i
b = b.to_i
result = case op
when "+" then a + b
when "-" then a - b
when "*" then a * b
when "/" then a / b
when "%" then a % b
else 0
end
puts result
`,
  },
  {
    title: "Ticket Expiry Check Unless",
    description:
      "A transit ticket is valid when days_until_expiry is 0 or more. Read the days and print \"valid\" or \"expired\" using an unless statement.\n\nInput Format:\nOne integer days_until_expiry (may be negative).\n\nOutput Format:\nSingle line: \"valid\" or \"expired\".\n\nConstraints:\n-365 <= days_until_expiry <= 365",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "unless Statement",
    sampleinput1: "5",
    sampleoutput1: "valid",
    sampleinput2: "-1",
    sampleoutput2: "expired",
    input1: "0",
    output1: "valid",
    input2: "30",
    output2: "valid",
    input3: "-7",
    output3: "expired",
    inputconstrains: "-365 <= days_until_expiry <= 365",
    blacklist: "",
    whitelist: "",
    sourcecode: `days = gets.to_i
unless days >= 0
  puts "expired"
else
  puts "valid"
end
`,
  },
  {
    title: "Triangle Sides Category Finder",
    description:
      "Read three side lengths. First check the triangle inequality (each pair of sides must sum to more than the third). Then classify the triangle as equilateral, isosceles, or scalene using nested control structures. If invalid, print \"invalid\".\n\nInput Format:\nThree space-separated positive integers a b c.\n\nOutput Format:\nSingle line: \"equilateral\", \"isosceles\", \"scalene\", or \"invalid\".\n\nConstraints:\n1 <= a, b, c <= 1000",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Nested Control Structures",
    sampleinput1: "3 3 3",
    sampleoutput1: "equilateral",
    sampleinput2: "3 3 4",
    sampleoutput2: "isosceles",
    input1: "3 4 5",
    output1: "scalene",
    input2: "1 1 2",
    output2: "invalid",
    input3: "5 5 5",
    output3: "equilateral",
    inputconstrains: "1 <= a, b, c <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `a, b, c = gets.split.map(&:to_i)
if a + b > c && a + c > b && b + c > a
  if a == b && b == c
    puts "equilateral"
  elsif a == b || b == c || a == c
    puts "isosceles"
  else
    puts "scalene"
  end
else
  puts "invalid"
end
`,
  },

  // ───────────────────────── MEDIUM-SCENARIO (6) ─────────────────────────
  {
    title: "Income Tax Bracket Calculator",
    description:
      "Compute income tax using progressive brackets: 0% on the first 10000, 10% on the slice 10001..50000, 20% on the slice 50001..100000, 30% above 100000. Read income and print the tax formatted to two decimals using if/elsif/else.\n\nInput Format:\nOne integer income.\n\nOutput Format:\nSingle line: tax formatted to two decimals.\n\nConstraints:\n0 <= income <= 10000000",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "if elsif else Statements",
    sampleinput1: "8000",
    sampleoutput1: "0.00",
    sampleinput2: "30000",
    sampleoutput2: "2000.00",
    input1: "60000",
    output1: "6000.00",
    input2: "150000",
    output2: "29000.00",
    input3: "5000",
    output3: "0.00",
    inputconstrains: "0 <= income <= 10000000",
    blacklist: "case, when, between?, cover?",
    whitelist: "if , elsif ",
    sourcecode: `income = gets.to_i
if income <= 10000
  tax = 0.0
elsif income <= 50000
  tax = (income - 10000) * 0.10
elsif income <= 100000
  tax = 4000 + (income - 50000) * 0.20
else
  tax = 14000 + (income - 100000) * 0.30
end
puts "%.2f" % tax
`,
  },
  {
    title: "Shipping Cost by Zone",
    description:
      "A courier service charges a base fee plus a per-kilogram rate depending on the destination zone: Zone A = $5 base + $0.50/kg, Zone B = $8 base + $0.75/kg, Zone C = $12 base + $1.00/kg. Read zone letter and weight, compute total using case/when.\n\nInput Format:\nTwo space-separated tokens: zone letter (A, B, or C) and integer weight.\n\nOutput Format:\nSingle line: total formatted to two decimals.\n\nConstraints:\nzone in {A,B,C}, 0 <= weight <= 1000",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "case when Statement",
    sampleinput1: "A 4",
    sampleoutput1: "7.00",
    sampleinput2: "C 10",
    sampleoutput2: "22.00",
    input1: "B 4",
    output1: "11.00",
    input2: "A 0",
    output2: "5.00",
    input3: "C 25",
    output3: "37.00",
    inputconstrains: "zone in {A,B,C}, 0 <= weight <= 1000",
    blacklist: "if , elsif, unless, while, until, for",
    whitelist: "case, when ",
    sourcecode: `zone, weight = gets.split
weight = weight.to_i
base, per_kg = case zone
when "A" then [5, 0.50]
when "B" then [8, 0.75]
when "C" then [12, 1.00]
else [0, 0.0]
end
total = base + per_kg * weight
puts "%.2f" % total
`,
  },
  {
    title: "Toll Booth with Carpool Flag",
    description:
      "A toll booth gives a 50% discount to carpools and adds a 25% peak-hour surcharge. Read carpool flag, peak flag, and base toll, then compute the final toll using modifier forms of if and unless.\n\nInput Format:\nThree space-separated integers: cp pk base (each flag is 0 or 1).\n\nOutput Format:\nSingle line: final toll formatted to two decimals.\n\nConstraints:\n1 <= base <= 1000, each flag is 0 or 1",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Modifier Forms of if and unless",
    sampleinput1: "0 0 10",
    sampleoutput1: "10.00",
    sampleinput2: "1 1 10",
    sampleoutput2: "6.25",
    input1: "1 0 20",
    output1: "10.00",
    input2: "0 1 8",
    output2: "10.00",
    input3: "1 1 100",
    output3: "62.50",
    inputconstrains: "1 <= base <= 1000, each flag is 0 or 1",
    blacklist: "case, when, while, until, for, each, times",
    whitelist: "if cp, unless pk",
    sourcecode: `cp, pk, base = gets.split.map(&:to_i)
toll = base.to_f
toll *= 0.5 if cp == 1
toll *= 1.25 unless pk == 0
puts "%.2f" % toll
`,
  },
  {
    title: "Days in Month with Leap Year",
    description:
      "Read a year and month (1..12) and print the number of days in that month. February has 29 days in leap years (divisible by 4, but not by 100 unless also by 400). Use nested control structures.\n\nInput Format:\nTwo space-separated integers: year month.\n\nOutput Format:\nSingle line: the number of days in that month.\n\nConstraints:\n1 <= year <= 9999, 1 <= month <= 12",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Nested Control Structures",
    sampleinput1: "2024 2",
    sampleoutput1: "29",
    sampleinput2: "2023 2",
    sampleoutput2: "28",
    input1: "2000 2",
    output1: "29",
    input2: "1900 2",
    output2: "28",
    input3: "2024 4",
    output3: "30",
    inputconstrains: "1 <= year <= 9999, 1 <= month <= 12",
    blacklist: "case, when, Date, Time, require",
    whitelist: "if , elsif , else",
    sourcecode: `year, month = gets.split.map(&:to_i)
leap = (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)
days = if month == 2
  if leap
    29
  else
    28
  end
elsif [4, 6, 9, 11].include?(month)
  30
else
  31
end
puts days
`,
  },
  {
    title: "RPG Damage Type Chart",
    description:
      "An RPG applies a 2x damage multiplier for type advantages: fire>grass, water>fire, grass>water. All other matchups deal 1x. Read attacker_type, defender_type, and base_damage; compute final damage using case/when.\n\nInput Format:\nThree space-separated tokens: attacker_type defender_type base_damage.\n\nOutput Format:\nSingle line: integer final damage.\n\nConstraints:\ntypes in {fire,water,grass}, 1 <= base_damage <= 1000",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "case when Statement",
    sampleinput1: "fire grass 50",
    sampleoutput1: "100",
    sampleinput2: "water water 30",
    sampleoutput2: "30",
    input1: "water fire 20",
    output1: "40",
    input2: "grass water 10",
    output2: "20",
    input3: "fire water 25",
    output3: "25",
    inputconstrains: "types in {fire,water,grass}, 1 <= base_damage <= 1000",
    blacklist: "if , elsif, unless, while, until, for",
    whitelist: "case, when ",
    sourcecode: `att, dfn, dmg = gets.split
dmg = dmg.to_i
multiplier = case [att, dfn]
when ["fire", "grass"] then 2
when ["water", "fire"] then 2
when ["grass", "water"] then 2
else 1
end
puts dmg * multiplier
`,
  },
  {
    title: "Parking Garage Tiered Pricing",
    description:
      "A parking garage charges $5 for the first hour, $3 per hour for hours 2 through 4, and $2 per hour for hours 5 and beyond. Members (flag = 1) get a 20% discount. Read hours parked and member flag, then print the total using if/elsif/else and a modifier if.\n\nInput Format:\nTwo space-separated integers: hours member.\n\nOutput Format:\nSingle line: total formatted to two decimals.\n\nConstraints:\n0 <= hours <= 1000, member in {0, 1}",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Nested Control Structures",
    sampleinput1: "3 0",
    sampleoutput1: "11.00",
    sampleinput2: "5 1",
    sampleoutput2: "12.80",
    input1: "1 0",
    output1: "5.00",
    input2: "10 1",
    output2: "20.80",
    input3: "4 0",
    output3: "14.00",
    inputconstrains: "0 <= hours <= 1000, member in {0,1}",
    blacklist: "case, when, between?, cover?",
    whitelist: "if , elsif , else",
    sourcecode: `hours, member = gets.split.map(&:to_i)
if hours <= 0
  cost = 0.0
elsif hours == 1
  cost = 5.0
elsif hours <= 4
  cost = 5.0 + (hours - 1) * 3.0
else
  cost = 5.0 + 3 * 3.0 + (hours - 4) * 2.0
end
cost *= 0.8 if member == 1
puts "%.2f" % cost
`,
  },

  // ───────────────────────── HARD-SCENARIO (4) ─────────────────────────
  {
    title: "Grade with Honors Classification",
    description:
      "Given a numeric score and attendance percentage, determine the final classification. If attendance is below 75%, the student fails. Otherwise grade by score: 90..100 = A (but A+ if attendance >= 95), 80..89 = B, 70..79 = C, otherwise F. Use nested control structures combining if/elsif and case/when.\n\nInput Format:\nTwo space-separated integers: score attendance.\n\nOutput Format:\nSingle line: \"fail\", \"A+\", \"A\", \"B\", \"C\", or \"F\".\n\nConstraints:\n0 <= score <= 100, 0 <= attendance <= 100",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Nested Control Structures",
    sampleinput1: "95 90",
    sampleoutput1: "A",
    sampleinput2: "95 98",
    sampleoutput2: "A+",
    input1: "85 80",
    output1: "B",
    input2: "50 60",
    output2: "fail",
    input3: "100 100",
    output3: "A+",
    inputconstrains: "0 <= score <= 100, 0 <= attendance <= 100",
    blacklist: "between?, cover?, Math, eval",
    whitelist: "case, when , if ",
    sourcecode: `score, att = gets.split.map(&:to_i)
if att < 75
  puts "fail"
else
  grade = case score
  when 90..100
    if att >= 95
      "A+"
    else
      "A"
    end
  when 80..89
    "B"
  when 70..79
    "C"
  else
    "F"
  end
  puts grade
end
`,
  },
  {
    title: "Banking Fee Waiver Matrix",
    description:
      "A bank charges a monthly fee based on account type and balance. Basic accounts: $5 if balance < 1000 else $0. Premium: $0 if balance >= 5000, $2 if balance >= 1000, else $5. VIP: $0. Additionally, every transaction beyond 50 incurs $1 each, waived for VIP accounts. Read balance, transaction count, and account type, then print the total fee.\n\nInput Format:\nThree space-separated tokens: balance txn_count account_type.\n\nOutput Format:\nSingle line: total fee formatted to two decimals.\n\nConstraints:\n0 <= balance <= 10000000, 0 <= txn_count <= 10000, account_type in {basic, premium, vip}",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "if elsif else Statements",
    sampleinput1: "500 10 basic",
    sampleoutput1: "5.00",
    sampleinput2: "10000 60 premium",
    sampleoutput2: "10.00",
    input1: "1500 30 basic",
    output1: "0.00",
    input2: "600 100 premium",
    output2: "55.00",
    input3: "100 200 vip",
    output3: "0.00",
    inputconstrains: "0 <= balance <= 10000000, 0 <= txn_count <= 10000, account_type in {basic, premium, vip}",
    blacklist: "between?, cover?, Math",
    whitelist: "case, when , if , elsif ",
    sourcecode: `bal, txn, type = gets.split
bal = bal.to_i
txn = txn.to_i
base_fee = case type
when "basic"
  if bal < 1000
    5
  else
    0
  end
when "premium"
  if bal >= 5000
    0
  elsif bal >= 1000
    2
  else
    5
  end
when "vip"
  0
else
  10
end
extra = if type == "vip"
  0
elsif txn > 50
  txn - 50
else
  0
end
total = base_fee + extra
puts "%.2f" % total
`,
  },
  {
    title: "Calendar Meeting Conflict Detector",
    description:
      "Two meetings are described by start and end times in 24-hour format. A meeting overlaps another if it starts before the other ends and ends after the other starts. Read two meetings (each as start_h start_m end_h end_m) and print \"conflict\" or \"free\" using if/elsif/else.\n\nInput Format:\nTwo lines, each containing four space-separated integers: start_h start_m end_h end_m.\n\nOutput Format:\nSingle line: \"conflict\" or \"free\".\n\nConstraints:\n0 <= hour <= 23, 0 <= minute <= 59",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Nested Control Structures",
    sampleinput1: "9 0 10 0\n9 30 11 0",
    sampleoutput1: "conflict",
    sampleinput2: "9 0 10 0\n10 0 11 0",
    sampleoutput2: "free",
    input1: "9 0 12 0\n8 0 9 0",
    output1: "free",
    input2: "14 0 15 0\n15 0 16 0",
    output2: "free",
    input3: "10 0 12 0\n11 0 13 0",
    output3: "conflict",
    inputconstrains: "0 <= hour <= 23, 0 <= minute <= 59",
    blacklist: "between?, cover?, Date, Time, require, eval",
    whitelist: "if , elsif , else",
    sourcecode: `e_sh, e_sm, e_eh, e_em = gets.split.map(&:to_i)
n_sh, n_sm, n_eh, n_em = gets.split.map(&:to_i)
existing_start = e_sh * 60 + e_sm
existing_end = e_eh * 60 + e_em
new_start = n_sh * 60 + n_sm
new_end = n_eh * 60 + n_em
if new_end <= existing_start
  puts "free"
elsif new_start >= existing_end
  puts "free"
else
  puts "conflict"
end
`,
  },
  {
    title: "Library Loan Eligibility Matrix",
    description:
      "A library checks loan requests using a matrix. Patrons have a type (student, faculty, guest), a current checked-out count, an overdue flag, and a requested loan duration. Overdue patrons are denied. Otherwise each patron type has a max-books and max-days limit: student (5, 14), faculty (20, 90), guest (2, 7). Deny if current count >= max or requested days > max, otherwise approve. Use modifier if/unless and case/when.\n\nInput Format:\nLine 1: patron_type books_checked_out. Line 2: is_overdue requested_days.\n\nOutput Format:\nSingle line: \"approved\" or \"denied\".\n\nConstraints:\npatron_type in {student, faculty, guest}, 0 <= books_checked_out <= 1000, is_overdue in {0,1}, 1 <= requested_days <= 365",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Modifier Forms of if and unless",
    sampleinput1: "student 3\n0 7",
    sampleoutput1: "approved",
    sampleinput2: "student 5\n0 7",
    sampleoutput2: "denied",
    input1: "faculty 10\n0 30",
    output1: "approved",
    input2: "guest 2\n0 5",
    output2: "denied",
    input3: "student 0\n1 1",
    output3: "denied",
    inputconstrains: "patron_type in {student, faculty, guest}, 0 <= books_checked_out <= 1000, is_overdue in {0,1}, 1 <= requested_days <= 365",
    blacklist: "between?, cover?, Math, eval, class",
    whitelist: "case, when , if , unless ",
    sourcecode: `type, books = gets.split
books = books.to_i
overdue, days = gets.split.map(&:to_i)
max_books, max_days = case type
when "student" then [5, 14]
when "faculty" then [20, 90]
when "guest" then [2, 7]
else [0, 0]
end
status = "denied" if overdue == 1
status = "denied" if !status && books >= max_books
status = "denied" if !status && days > max_days
status = "approved" unless status
puts status
`,
  },
];

const mcqs: McqQ[] = [
  // ───────────── EASY (10) ─────────────
  {
    title: "Conditional Block Keyword",
    description: "Which Ruby keyword begins a basic conditional block?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "if elsif else Statements",
    Option1: "if",
    Option2: "when",
    Option3: "case",
    Option4: "then",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Unless Semantics",
    description: "What does the `unless` keyword mean in Ruby?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "unless Statement",
    Option1: "if not",
    Option2: "if and only if",
    Option3: "otherwise",
    Option4: "while",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Additional Branch Keyword",
    description: "Which keyword chains additional conditions after an `if`?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "if elsif else Statements",
    Option1: "elsif",
    Option2: "else if",
    Option3: "elif",
    Option4: "elseif",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Case When Matching Method",
    description: "What method does `case/when` use to match values against conditions?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "case when Statement",
    Option1: "===",
    Option2: "==",
    Option3: "equal?",
    Option4: "<=>",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Modifier If Form",
    description: "What is the modifier form of `if x then puts x end`?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Modifier Forms of if and unless",
    Option1: "puts x if x",
    Option2: "if x: puts x",
    Option3: "x puts if",
    Option4: "puts if x then x",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Else Clause Purpose",
    description: "What is the `else` clause used for in an if statement?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "if elsif else Statements",
    Option1: "The default branch when no conditions match",
    Option2: "Another condition to check",
    Option3: "To end the if block",
    Option4: "To repeat the if block",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Nil Truthiness",
    description: "In Ruby, what does `nil` evaluate to in a boolean context?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "if elsif else Statements",
    Option1: "false",
    Option2: "true",
    Option3: "0",
    Option4: "Raises an error",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Truthy Zero",
    description: "Which of the following values is NOT falsy in Ruby?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "if elsif else Statements",
    Option1: "0",
    Option2: "nil",
    Option3: "false",
    Option4: "(none, all four are falsy)",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Then Keyword Purpose",
    description: "What is the purpose of the `then` keyword in Ruby conditionals?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "if elsif else Statements",
    Option1: "Separates the condition from the body in single-line form",
    Option2: "Starts a new conditional",
    Option3: "Ends an if block",
    Option4: "Repeats a block",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Multi-Branch Construct",
    description: "Which Ruby construct is best suited for matching a value against many constants?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "case when Statement",
    Option1: "case/when",
    Option2: "if/elsif chain",
    Option3: "while loop",
    Option4: "begin/rescue",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },

  // ───────────── MEDIUM (6) ─────────────
  {
    title: "If Elsif Branch Output",
    description: "What does the following Ruby snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "if elsif else Statements",
    Option1: "A",
    Option2: "B",
    Option3: "C",
    Option4: "(nothing)",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `x = 5
if x > 3
  puts "A"
elsif x > 1
  puts "B"
else
  puts "C"
end`,
    snippetLang: "ruby",
  },
  {
    title: "Unless Modifier Output",
    description: "What does the following Ruby snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "unless Statement",
    Option1: "yes",
    Option2: "(nothing)",
    Option3: "nil",
    Option4: "false",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `y = 3
puts "yes" unless y > 5`,
    snippetLang: "ruby",
  },
  {
    title: "Case When Match",
    description: "What does the following Ruby snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "case when Statement",
    Option1: "two",
    Option2: "one",
    Option3: "other",
    Option4: "(nothing)",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `n = 2
case n
when 1 then puts "one"
when 2 then puts "two"
else puts "other"
end`,
    snippetLang: "ruby",
  },
  {
    title: "Zero Truthiness",
    description: "What does the following Ruby snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "if elsif else Statements",
    Option1: "truthy",
    Option2: "falsy",
    Option3: "0",
    Option4: "(nothing)",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `a = 0
puts a ? "truthy" : "falsy"`,
    snippetLang: "ruby",
  },
  {
    title: "Nil Default",
    description: "What does the following Ruby snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "if elsif else Statements",
    Option1: "default",
    Option2: "(empty line)",
    Option3: "nil",
    Option4: "true",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `x = nil
puts x || "default"`,
    snippetLang: "ruby",
  },
  {
    title: "Case Without Target",
    description: "What does the following Ruby snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "case when Statement",
    Option1: "pos",
    Option2: "neg",
    Option3: "zero",
    Option4: "(nothing)",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `v = 5
case
when v < 0 then puts "neg"
when v == 0 then puts "zero"
when v > 0 then puts "pos"
end`,
    snippetLang: "ruby",
  },

  // ───────────── HARD (4) ─────────────
  {
    title: "Nested If Branch",
    description: "What does the following Ruby snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Nested Control Structures",
    Option1: "small",
    Option2: "big",
    Option3: "less",
    Option4: "(nothing)",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `a = 7
b = 3
if a > b
  if a > 10
    puts "big"
  else
    puts "small"
  end
else
  puts "less"
end`,
    snippetLang: "ruby",
  },
  {
    title: "Case With Range Match",
    description: "What does the following Ruby snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "case when Statement",
    Option1: "mid",
    Option2: "low",
    Option3: "high",
    Option4: "(nothing)",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `x = 4
result = case x
when 1..3 then "low"
when 4..6 then "mid"
else "high"
end
puts result`,
    snippetLang: "ruby",
  },
  {
    title: "FizzBuzz Branch",
    description: "What does the following Ruby snippet print when n = 15?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "if elsif else Statements",
    Option1: "fizzbuzz",
    Option2: "fizz",
    Option3: "buzz",
    Option4: "15",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `n = 15
if n % 3 == 0 && n % 5 == 0
  puts "fizzbuzz"
elsif n % 3 == 0
  puts "fizz"
elsif n % 5 == 0
  puts "buzz"
else
  puts n
end`,
    snippetLang: "ruby",
  },
  {
    title: "Overdue Short Circuit",
    description: "What does the following Ruby snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Nested Control Structures",
    Option1: "denied",
    Option2: "2 books",
    Option3: "5 books",
    Option4: "20 books",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `code = "guest"
overdue = true
if overdue
  puts "denied"
else
  case code
  when "student" then puts "5 books"
  when "faculty" then puts "20 books"
  else puts "2 books"
  end
end`,
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
