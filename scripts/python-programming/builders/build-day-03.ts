/**
 * Builder for Day 3 — "Operators" (PYTHON Programming question group).
 * Writes day-03.code.json (20 code questions) and day-03.mcq.json (20 MCQs).
 * Run: bun scripts/python-programming/builders/build-day-03.ts
 */
import { writeFileSync } from "node:fs";

const TOPIC = "Operators";
const SUBTOPICS = [
  "Arithmetic Operators",
  "Relational (Comparison) Operators",
  "Logical Operators",
  "Bitwise Operators",
  "Assignment Operators",
  "Membership and Identity Operators",
  "Conditional (Ternary) Operator",
  "Operator Precedence and Associativity",
];

interface CodeQ {
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  variant: "basic" | "scenario";
  maxscore: number;
  lang: string;
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
  CorrectOption: number;
  iscodesnippet: boolean;
  codesnippet: string | null;
  snippetLang: string | null;
}

function cq(q: Partial<CodeQ> & Pick<CodeQ, "title" | "description" | "difficulty" | "variant" | "subtopic"> & Record<string, any>): CodeQ {
  return {
    maxscore: q.difficulty === "easy" ? 10 : q.difficulty === "medium" ? 20 : 30,
    lang: "python",
    topic: TOPIC,
    blacklist: "",
    whitelist: "",
    ...q,
  } as CodeQ;
}

function mq(m: Partial<McqQ> & Pick<McqQ, "title" | "description" | "difficulty" | "subtopic" | "Option1" | "Option2" | "Option3" | "Option4" | "CorrectOption"> & Record<string, any>): McqQ {
  return {
    topic: TOPIC,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
    ...m,
  } as McqQ;
}

/* ══════════════════════ CODE QUESTIONS (20) ══════════════════════ */

const questions: CodeQ[] = [
  /* ---- easy / basic (6) ---- */
  cq({
    title: "Arithmetic Operations Drill",
    description: `You are given two integers. Compute and print the results of all seven basic arithmetic operations on them, in a fixed order.

Input Format:
One line with two space-separated integers a and b.

Output Format:
Seven lines, in this exact order:
1. a + b
2. a - b
3. a * b
4. a / b (true division, printed with exactly 2 decimal places)
5. a // b (floor division)
6. a % b (remainder)
7. a ** b (a raised to the power b)

Constraints:
1 <= a <= 20, 1 <= b <= 6`,
    difficulty: "easy",
    variant: "basic",
    subtopic: "Arithmetic Operators",
    sampleinput1: "7 2",
    sampleoutput1: "9\n5\n14\n3.50\n3\n1\n49",
    sampleinput2: "10 4",
    sampleoutput2: "14\n6\n40\n2.50\n2\n2\n10000",
    input1: "5 3",
    output1: "8\n2\n15\n1.67\n1\n2\n125",
    input2: "12 5",
    output2: "17\n7\n60\n2.40\n2\n2\n248832",
    input3: "9 6",
    output3: "15\n3\n54\n1.50\n1\n3\n531441",
    inputconstrains: "1 <= a <= 20, 1 <= b <= 6",
    sourcecode: `a, b = map(int, input().split())
print(a + b)
print(a - b)
print(a * b)
print(f"{a / b:.2f}")
print(a // b)
print(a % b)
print(a ** b)`,
  }),

  cq({
    title: "Comparison Verdict Report",
    description: `A validation script reports how two integers compare. Given a and b, print the boolean verdicts of four relational comparisons, each on its own line. Python prints booleans as True and False (capitalized).

Input Format:
One line with two space-separated integers a and b.

Output Format:
Four lines, in this exact order:
1. a < b
2. a > b
3. a == b
4. a != b

Constraints:
-100 <= a <= 100, -100 <= b <= 100`,
    difficulty: "easy",
    variant: "basic",
    subtopic: "Relational (Comparison) Operators",
    sampleinput1: "4 9",
    sampleoutput1: "True\nFalse\nFalse\nTrue",
    sampleinput2: "6 6",
    sampleoutput2: "False\nFalse\nTrue\nFalse",
    input1: "10 3",
    output1: "False\nTrue\nFalse\nTrue",
    input2: "-2 5",
    output2: "True\nFalse\nFalse\nTrue",
    input3: "0 0",
    output3: "False\nFalse\nTrue\nFalse",
    inputconstrains: "-100 <= a <= 100, -100 <= b <= 100",
    sourcecode: `a, b = map(int, input().split())
print(a < b)
print(a > b)
print(a == b)
print(a != b)`,
  }),

  cq({
    title: "Logical Gates Check",
    description: `Four digital lines carry 0 (low) or 1 (high). Treat each value as a boolean (1 means True, 0 means False) and evaluate five logical expressions with and, or and not. Print each verdict as True or False.

Input Format:
One line with four space-separated values a b c d, each 0 or 1.

Output Format:
Five lines, in this exact order:
1. a and b
2. a or b
3. not a
4. (a and b) or (c and d)
5. not (a or b)

Constraints:
Each of a, b, c, d is 0 or 1.`,
    difficulty: "easy",
    variant: "basic",
    subtopic: "Logical Operators",
    sampleinput1: "1 1 0 1",
    sampleoutput1: "True\nTrue\nFalse\nTrue\nFalse",
    sampleinput2: "0 0 0 0",
    sampleoutput2: "False\nFalse\nTrue\nFalse\nTrue",
    input1: "1 0 1 0",
    output1: "False\nTrue\nFalse\nFalse\nFalse",
    input2: "0 1 1 1",
    output2: "False\nTrue\nTrue\nTrue\nFalse",
    input3: "1 1 1 0",
    output3: "True\nTrue\nFalse\nTrue\nFalse",
    inputconstrains: "each of a b c d is 0 or 1",
    sourcecode: `a, b, c, d = [v == "1" for v in input().split()]
print(a and b)
print(a or b)
print(not a)
print((a and b) or (c and d))
print(not (a or b))`,
  }),

  cq({
    title: "Bitwise Toolkit Drill",
    description: `Given two non-negative integers, apply the five core bitwise operators and print each result. Bitwise operators act on the binary representation of the numbers.

Input Format:
One line with two space-separated integers x and y.

Output Format:
Five lines, in this exact order:
1. x & y (bitwise AND)
2. x | y (bitwise OR)
3. x ^ y (bitwise XOR)
4. x << 2 (left shift by 2)
5. y >> 1 (right shift by 1)

Constraints:
0 <= x <= 200, 0 <= y <= 200`,
    difficulty: "easy",
    variant: "basic",
    subtopic: "Bitwise Operators",
    sampleinput1: "12 10",
    sampleoutput1: "8\n14\n6\n48\n5",
    sampleinput2: "5 3",
    sampleoutput2: "1\n7\n6\n20\n1",
    input1: "8 8",
    output1: "8\n8\n0\n32\n4",
    input2: "1 100",
    output2: "0\n101\n101\n4\n50",
    input3: "64 32",
    output3: "0\n96\n96\n256\n16",
    inputconstrains: "0 <= x <= 200, 0 <= y <= 200",
    sourcecode: `x, y = map(int, input().split())
print(x & y)
print(x | y)
print(x ^ y)
print(x << 2)
print(y >> 1)`,
  }),

  cq({
    title: "Augmented Assignment Trail",
    description: `Start with a value v and walk it through four augmented assignments, one after another, in this exact order: v += a, then v *= b, then v //= d, then v -= c. Print the final value after all four steps. Note that //= is integer (floor) division applied at that point in the trail.

Input Format:
One line with five space-separated integers v a b c d.

Output Format:
One line with the final value of v.

Constraints:
0 <= v <= 1000, 0 <= a <= 100, 1 <= b <= 10, 0 <= c <= 100, 1 <= d <= 10 (the //= step always happens while v is still non-negative)`,
    difficulty: "easy",
    variant: "basic",
    subtopic: "Assignment Operators",
    sampleinput1: "10 5 3 4 2",
    sampleoutput1: "18",
    sampleinput2: "6 2 5 7 4",
    sampleoutput2: "3",
    input1: "0 9 2 3 5",
    output1: "0",
    input2: "100 0 1 25 3",
    output2: "8",
    input3: "7 3 4 100 2",
    output3: "-80",
    inputconstrains: "0 <= v <= 1000, 0 <= a <= 100, 1 <= b <= 10, 0 <= c <= 100, 1 <= d <= 10",
    sourcecode: `v, a, b, c, d = map(int, input().split())
v += a
v *= b
v //= d
v -= c
print(v)`,
  }),

  cq({
    title: "Membership Probe",
    description: `A text-analysis mini tool checks how a word occurs inside a sentence. Given a sentence and a word, report three membership verdicts: whether the word appears anywhere as a substring, whether it fails to appear as a substring (not in), and whether it appears as one of the exact whitespace-separated tokens of the sentence. Python prints booleans as True and False.

Input Format:
Line 1: the sentence (may contain spaces).
Line 2: the word (a single token without spaces).

Output Format:
Three lines, in this exact order:
1. word in sentence (substring check)
2. word not in sentence
3. word in sentence.split() (exact token check)

Constraints:
1 <= length of sentence <= 100, 1 <= length of word <= 20, the word contains no spaces`,
    difficulty: "easy",
    variant: "basic",
    subtopic: "Membership and Identity Operators",
    sampleinput1: `the quick brown fox\nquick`,
    sampleoutput1: "True\nFalse\nTrue",
    sampleinput2: `the quick brown fox\nfoxhound`,
    sampleoutput2: "False\nTrue\nFalse",
    input1: `python programming language\ngram`,
    output1: "True\nFalse\nFalse",
    input2: `life is beautiful\nis`,
    output2: "True\nFalse\nTrue",
    input3: `Atom Code Platform\natom`,
    output3: "False\nTrue\nFalse",
    inputconstrains: "1 <= len(sentence) <= 100, 1 <= len(word) <= 20, word has no spaces",
    sourcecode: `s = input()
w = input()
print(w in s)
print(w not in s)
print(w in s.split())`,
  }),

  /* ---- easy / scenario (4) ---- */
  cq({
    title: "Parking Lot Fee Counter",
    description: `A shopping-mall parking lot charges a flat rate of 30 for up to 2 hours (inclusive). Every additional hour beyond 2 hours costs 15 more. Given the number of whole hours a car was parked, compute the total fee with a single conditional (ternary) expression.

Input Format:
One line with a single integer hours.

Output Format:
One line with the total parking fee (an integer).

Constraints:
1 <= hours <= 24`,
    difficulty: "easy",
    variant: "scenario",
    subtopic: "Conditional (Ternary) Operator",
    sampleinput1: "1",
    sampleoutput1: "30",
    sampleinput2: "5",
    sampleoutput2: "75",
    input1: "2",
    output1: "30",
    input2: "8",
    output2: "120",
    input3: "24",
    output3: "360",
    inputconstrains: "1 <= hours <= 24",
    sourcecode: `h = int(input())
fee = 30 if h <= 2 else 30 + (h - 2) * 15
print(fee)`,
  }),

  cq({
    title: "Exam Qualification Verdict",
    description: `A coaching institute screens students for a scholarship exam. A student qualifies only if every one of the three subject scores is at least 35 (no failed subject) AND the total of the three scores is at least 120. Print the verdict.

Input Format:
One line with three space-separated integers m1 m2 m3 (the subject scores).

Output Format:
One line: exactly "Qualified" or "Not Qualified".

Constraints:
0 <= each mark <= 100`,
    difficulty: "easy",
    variant: "scenario",
    subtopic: "Relational (Comparison) Operators",
    sampleinput1: "80 70 60",
    sampleoutput1: "Qualified",
    sampleinput2: "90 40 30",
    sampleoutput2: "Not Qualified",
    input1: "35 35 50",
    output1: "Qualified",
    input2: "34 80 80",
    output2: "Not Qualified",
    input3: "40 40 40",
    output3: "Qualified",
    inputconstrains: "0 <= each mark <= 100",
    sourcecode: `m1, m2, m3 = map(int, input().split())
total = m1 + m2 + m3
ok = m1 >= 35 and m2 >= 35 and m3 >= 35 and total >= 120
print("Qualified" if ok else "Not Qualified")`,
  }),

  cq({
    title: "Premium Discount Checker",
    description: `A retail store gives premium customers a 15% discount, but only when their bill exceeds 1000. Everyone else (including premium customers with smaller bills) gets a flat 5% discount. The premium status AND the bill amount must both be checked together. Print the final amount payable after the discount, to exactly 2 decimal places.

Input Format:
One line with the bill amount (integer) and the status, separated by a space. Status is "premium" or "regular".

Output Format:
One line with the payable amount, formatted with exactly 2 decimal places.

Constraints:
1 <= bill <= 100000; status is premium or regular`,
    difficulty: "easy",
    variant: "scenario",
    subtopic: "Logical Operators",
    sampleinput1: "1500 premium",
    sampleoutput1: "1275.00",
    sampleinput2: "800 regular",
    sampleoutput2: "760.00",
    input1: "1000 premium",
    output1: "950.00",
    input2: "2500 regular",
    output2: "2375.00",
    input3: "999 premium",
    output3: "949.05",
    inputconstrains: "1 <= bill <= 100000, status is premium or regular",
    sourcecode: `a, s = input().split()
a = int(a)
rate = 15 if s == "premium" and a > 1000 else 5
print(f"{a * (100 - rate) / 100:.2f}")`,
  }),

  cq({
    title: "Shipping Cost Estimator",
    description: `GreenDash Couriers computes a shipment cost with one fixed expression and no parentheses:

cost = 50 + 10 * weight - 15 * weight // 5

Python evaluates * and // (left to right) before + and -, so the subtracted term is (15 * weight) // 5, NOT 15 * (weight // 5). Reproduce the exact Python evaluation of this expression for a given weight and print the result.

Input Format:
One line with a single integer weight.

Output Format:
One line with the computed cost (an integer).

Constraints:
1 <= weight <= 40`,
    difficulty: "easy",
    variant: "scenario",
    subtopic: "Operator Precedence and Associativity",
    sampleinput1: "4",
    sampleoutput1: "78",
    sampleinput2: "10",
    sampleoutput2: "120",
    input1: "1",
    output1: "57",
    input2: "7",
    output2: "99",
    input3: "40",
    output3: "330",
    inputconstrains: "1 <= weight <= 40",
    sourcecode: `w = int(input())
cost = 50 + 10 * w - 15 * w // 5
print(cost)`,
  }),

  /* ---- medium (6, all scenario) ---- */
  cq({
    title: "Slab-Based Electricity Bill",
    description: `A state electricity board bills energy in slabs: the first 100 units cost 3.50 per unit, the next 100 units (101-200) cost 5.00 per unit, and every unit beyond 200 costs 8.00 per unit. A fixed meter rent of 90 is added to every bill. Compute the total bill for a given consumption and print it with exactly 2 decimal places. Do not use min() or max(); compute the slabs with if / elif / else.

Input Format:
One line with a single integer units.

Output Format:
One line with the total bill, formatted with exactly 2 decimal places.

Constraints:
1 <= units <= 5000`,
    difficulty: "medium",
    variant: "scenario",
    subtopic: "Arithmetic Operators",
    sampleinput1: "150",
    sampleoutput1: "690.00",
    sampleinput2: "80",
    sampleoutput2: "370.00",
    input1: "100",
    output1: "440.00",
    input2: "200",
    output2: "940.00",
    input3: "450",
    output3: "2940.00",
    inputconstrains: "1 <= units <= 5000",
    blacklist: "min(, max(",
    whitelist: "elif, if ",
    sourcecode: `u = int(input())
if u <= 100:
    energy = u * 3.5
elif u <= 200:
    energy = 350 + (u - 100) * 5
else:
    energy = 350 + 500 + (u - 200) * 8
print(f"{energy + 90:.2f}")`,
  }),

  cq({
    title: "Smart Home Feature Flags",
    description: `A smart-home panel stores the on/off state of 8 devices in one byte: bit i of the mask (counting from 0, least significant first) is 1 when device i is ON. Given the mask and a device index, report the device state, then the mask after toggling that device (XOR with its bit), the mask after forcing the device ON (OR with its bit), and the mask after forcing it OFF (AND with the inverted bit).

Input Format:
Line 1: the mask m (0 to 255).
Line 2: the device index i (0 to 7).

Output Format:
Four lines, in this exact order:
1. "ON" if device i is currently on, otherwise "OFF"
2. the mask after toggling device i
3. the mask after forcing device i ON
4. the mask after forcing device i OFF

Constraints:
0 <= m <= 255, 0 <= i <= 7`,
    difficulty: "medium",
    variant: "scenario",
    subtopic: "Bitwise Operators",
    sampleinput1: "202\n3",
    sampleoutput1: "ON\n194\n202\n194",
    sampleinput2: "5\n1",
    sampleoutput2: "OFF\n7\n7\n5",
    input1: "0\n0",
    output1: "OFF\n1\n1\n0",
    input2: "255\n7",
    output2: "ON\n127\n255\n127",
    input3: "170\n2",
    output3: "OFF\n174\n174\n170",
    inputconstrains: "0 <= m <= 255, 0 <= i <= 7",
    blacklist: "bin(, pow(",
    whitelist: "^, &, 1 <<",
    sourcecode: `m = int(input())
i = int(input())
print("ON" if (m >> i) & 1 else "OFF")
print(m ^ (1 << i))
print(m | (1 << i))
print(m & ~(1 << i))`,
  }),

  cq({
    title: "Food Delivery Fee and Coupon",
    description: `A food-delivery app computes the final payable amount for an order.

Delivery fee: free for members whose order amount is at least 400 (membership AND amount must both hold). Otherwise the fee is 25 for distances up to 3 km, plus 6 per extra km beyond 3 km.

Discount: 10% of the order amount if the customer is a member OR the amount exceeds 900; otherwise no discount.

Print the final amount = amount - discount + fee, with exactly 2 decimal places.

Input Format:
Line 1: amount and distance (km), space-separated integers.
Line 2: the customer status, "member" or "guest".

Output Format:
One line with the final payable amount, formatted with exactly 2 decimal places.

Constraints:
1 <= amount <= 5000, 1 <= distance <= 20, status is member or guest`,
    difficulty: "medium",
    variant: "scenario",
    subtopic: "Logical Operators",
    sampleinput1: `500 4\nmember`,
    sampleoutput1: "450.00",
    sampleinput2: `300 2\nguest`,
    sampleoutput2: "325.00",
    input1: `1000 5\nmember`,
    output1: "900.00",
    input2: `950 1\nguest`,
    output2: "880.00",
    input3: `150 8\nmember`,
    output3: "190.00",
    inputconstrains: "1 <= amount <= 5000, 1 <= distance <= 20, status is member or guest",
    blacklist: "min(, max(",
    whitelist: "and , or , else",
    sourcecode: `a, d = map(int, input().split())
status = input()
fee = 0 if status == "member" and a >= 400 else (25 if d <= 3 else 25 + (d - 3) * 6)
disc = a * 10 / 100 if status == "member" or a > 900 else 0
total = a - disc + fee
print(f"{total:.2f}")`,
  }),

  cq({
    title: "Blood Donation Eligibility",
    description: `A blood bank screens donors against four criteria: age between 18 and 65 (both inclusive), weight at least 50 kg, haemoglobin at least 12, and at least 90 days since the last donation. A donor is eligible only when ALL four criteria hold. Otherwise print how many criteria failed. Do not use elif; build the verdict with logical operators and a ternary.

Input Format:
One line with four space-separated integers: age weight haemoglobin days_since_last_donation.

Output Format:
One line: exactly "Eligible" if all criteria pass, otherwise "Not Eligible - k failed" where k is the number of failed criteria.

Constraints:
17 <= age <= 80, 30 <= weight <= 150, 5 <= haemoglobin <= 20, 1 <= days <= 999`,
    difficulty: "medium",
    variant: "scenario",
    subtopic: "Logical Operators",
    sampleinput1: "30 62 13 120",
    sampleoutput1: "Eligible",
    sampleinput2: "17 45 11 30",
    sampleoutput2: "Not Eligible - 4 failed",
    input1: "18 50 12 90",
    output1: "Eligible",
    input2: "70 80 14 100",
    output2: "Not Eligible - 1 failed",
    input3: "40 55 10 200",
    output3: "Not Eligible - 1 failed",
    inputconstrains: "17 <= age <= 80, 30 <= weight <= 150, 5 <= haemoglobin <= 20, 1 <= days <= 999",
    blacklist: "elif",
    whitelist: "and , else",
    sourcecode: `age, weight, hb, days = map(int, input().split())
ok = 18 <= age <= 65 and weight >= 50 and hb >= 12 and days >= 90
fails = 0
if age < 18 or age > 65:
    fails += 1
if weight < 50:
    fails += 1
if hb < 12:
    fails += 1
if days < 90:
    fails += 1
print("Eligible" if ok else f"Not Eligible - {fails} failed")`,
  }),

  cq({
    title: "Library Fine Ladder",
    description: `A city library charges overdue fines in steps: the first 7 overdue days cost 2 per day, days 8 to 15 cost 4 per day (for those days only), and every day beyond 15 costs 6 per day (for those days only). Reference-section books pay double the computed fine. Do not use elif; express the ladder as chained conditional (ternary) expressions.

Input Format:
Line 1: overdue days d (integer).
Line 2: the book category, "general" or "reference".

Output Format:
One line with the fine (an integer).

Constraints:
1 <= d <= 60, category is general or reference`,
    difficulty: "medium",
    variant: "scenario",
    subtopic: "Conditional (Ternary) Operator",
    sampleinput1: `10\ngeneral`,
    sampleoutput1: "26",
    sampleinput2: `5\nreference`,
    sampleoutput2: "20",
    input1: `7\ngeneral`,
    output1: "14",
    input2: `20\nreference`,
    output2: "152",
    input3: `1\ngeneral`,
    output3: "2",
    inputconstrains: "1 <= d <= 60, category is general or reference",
    blacklist: "elif",
    whitelist: "if , else",
    sourcecode: `d = int(input())
cat = input()
base = d * 2 if d <= 7 else 14 + (d - 7) * 4 if d <= 15 else 46 + (d - 15) * 6
fine = base * 2 if cat == "reference" else base
print(fine)`,
  }),

  cq({
    title: "Cab Surge Fare Estimator",
    description: `A ride-hailing app computes a fare from three parts.

Base flag-down charge: 40.
Distance charge: 12 per km, multiplied by 1.5 when demand is "high" (surge pricing); multiplied by 1 when demand is "normal".
Waiting charge: 2 per waiting minute, but only when the waiting time is strictly more than 5 minutes; otherwise 0.

Total fare = 40 + 12 * km * surge + waiting_charge. Print it with exactly 2 decimal places.

Input Format:
One line with three space-separated tokens: km (integer), demand ("high" or "normal"), wait_minutes (integer).

Output Format:
One line with the total fare, formatted with exactly 2 decimal places.

Constraints:
1 <= km <= 30, demand is high or normal, 0 <= wait <= 60`,
    difficulty: "medium",
    variant: "scenario",
    subtopic: "Conditional (Ternary) Operator",
    sampleinput1: "6 high 10",
    sampleoutput1: "168.00",
    sampleinput2: "3 normal 4",
    sampleoutput2: "76.00",
    input1: "8 high 5",
    output1: "184.00",
    input2: "12 normal 15",
    output2: "214.00",
    input3: "1 high 0",
    output3: "58.00",
    inputconstrains: "1 <= km <= 30, demand is high or normal, 0 <= wait <= 60",
    blacklist: "min(, max(",
    whitelist: "if , else",
    sourcecode: `d, demand, w = input().split()
d = int(d)
w = int(w)
total = 40 + 12 * d * (1.5 if demand == "high" else 1) + (2 * w if w > 5 else 0)
print(f"{total:.2f}")`,
  }),

  /* ---- hard (4) ---- */
  cq({
    title: "Precedence Puzzle Solver",
    description: `A maths worksheet generator evaluates the same four integers through three evaluation styles of one expression pattern, to teach operator precedence. Given a, b, c, d:

v1 = a + b * c ** 2 - d        (Python's real precedence: ** first, then *, then + and -)
v2 = ((a + b) * c) ** 2 - d    (strict left-to-right evaluation, ignoring precedence)
v3 = a + b * (c ** 2 - d)      (the c ** 2 - d part grouped first)

Print v1, v2 and v3, then the two differences v2 - v1 and v3 - v1. Do not use eval, max or min; compute each value explicitly with arithmetic operators.

Input Format:
One line with four space-separated integers a b c d.

Output Format:
Five lines, in this exact order: v1, v2, v3, v2 - v1, v3 - v1.

Constraints:
1 <= a, b, c, d <= 20`,
    difficulty: "hard",
    variant: "scenario",
    subtopic: "Operator Precedence and Associativity",
    sampleinput1: "2 3 4 5",
    sampleoutput1: "45\n395\n35\n350\n-10",
    sampleinput2: "1 1 1 1",
    sampleoutput2: "1\n3\n1\n2\n0",
    input1: "3 2 5 7",
    output1: "46\n618\n39\n572\n-7",
    input2: "10 1 3 2",
    output2: "17\n1087\n17\n1070\n0",
    input3: "5 4 2 9",
    output3: "12\n315\n-15\n303\n-27",
    inputconstrains: "1 <= a, b, c, d <= 20",
    blacklist: "max(, eval(",
    whitelist: "**",
    sourcecode: `a, b, c, d = map(int, input().split())
v1 = a + b * c ** 2 - d
v2 = ((a + b) * c) ** 2 - d
v3 = a + b * (c ** 2 - d)
print(v1)
print(v2)
print(v3)
print(v2 - v1)
print(v3 - v1)`,
  }),

  cq({
    title: "Sensor Byte Checksum Builder",
    description: `An IoT gateway validates a batch of sensor readings. Given n bytes (each 0-255), build:

checksum: the bitwise XOR of all n bytes (start from 0 and XOR them in order).
alarm bytes: how many bytes have bit 7 (value 128) set.
frame word: the 16-bit frame (checksum << 8) | alarm_count.
status: "ALARM" if at least one alarm byte was seen, otherwise "CLEAR".

Input Format:
Line 1: n, the number of bytes.
Line 2: n space-separated integers (each 0-255).

Output Format:
Four lines, in this exact order: checksum, alarm byte count, frame word, status.

Constraints:
1 <= n <= 50, each byte is between 0 and 255`,
    difficulty: "hard",
    variant: "scenario",
    subtopic: "Bitwise Operators",
    sampleinput1: `4\n12 200 34 200`,
    sampleoutput1: "46\n2\n11778\nALARM",
    sampleinput2: `3\n1 2 4`,
    sampleoutput2: "7\n0\n1792\nCLEAR",
    input1: `1\n255`,
    output1: "255\n1\n65281\nALARM",
    input2: `5\n0 0 0 0 0`,
    output2: "0\n0\n0\nCLEAR",
    input3: `6\n128 64 32 16 8 128`,
    output3: "120\n2\n30722\nALARM",
    inputconstrains: "1 <= n <= 50, each byte is between 0 and 255",
    blacklist: "bin(, pow(, sum(",
    whitelist: "^, &, for , <<",
    sourcecode: `def main():
    n = int(input())
    vals = list(map(int, input().split()))
    checksum = 0
    alarms = 0
    for b in vals:
        checksum ^= b
        if b & 128:
            alarms += 1
    frame = (checksum << 8) | alarms
    print(checksum)
    print(alarms)
    print(frame)
    print("ALARM" if alarms > 0 else "CLEAR")


main()`,
  }),

  cq({
    title: "Progressive Tax Engine",
    description: `A tax authority computes yearly tax from income I (whole rupees) in slabs:

- up to 250000: no tax
- 250001 to 500000: 5% of the amount above 250000
- 500001 to 1000000: 12500 plus 10% of the amount above 500000
- above 1000000: 62500 plus 20% of the amount above 1000000

A surcharge of 10% of the tax applies only when the income is strictly greater than 1200000. Print the net payable amount (tax + surcharge) and the effective rate (net payable / income * 100), both with exactly 2 decimal places. Do not use elif; express every branch as chained conditional (ternary) expressions.

Input Format:
One line with a single integer income.

Output Format:
Two lines: net payable (2 decimals), then the effective rate (2 decimals).

Constraints:
1 <= income <= 10000000`,
    difficulty: "hard",
    variant: "scenario",
    subtopic: "Conditional (Ternary) Operator",
    sampleinput1: "300000",
    sampleoutput1: "2500.00\n0.83",
    sampleinput2: "1500000",
    sampleoutput2: "178750.00\n11.92",
    input1: "200000",
    output1: "0.00\n0.00",
    input2: "750000",
    output2: "37500.00\n5.00",
    input3: "1200000",
    output3: "102500.00\n8.54",
    inputconstrains: "1 <= income <= 10000000",
    blacklist: "elif",
    whitelist: "if , else",
    sourcecode: `def main():
    i = int(input())
    tax = (
        0
        if i <= 250000
        else (i - 250000) * 0.05
        if i <= 500000
        else 12500 + (i - 500000) * 0.10
        if i <= 1000000
        else 62500 + (i - 1000000) * 0.20
    )
    sur = tax * 0.10 if i > 1200000 else 0
    net = tax + sur
    rate = net / i * 100
    print(f"{net:.2f}")
    print(f"{rate:.2f}")


main()`,
  }),

  cq({
    title: "Logic Gate Verdict Panel",
    description: `An industrial controller watches four safety sensors, each reporting 0 (triggered/false) or 1 (clear/true). From the sensor booleans a, b, c, d it evaluates three expressions exactly as Python does (not binds tighter than and, which binds tighter than or):

r1 = not a and b or not c and d        (read as ((not a) and b) or ((not c) and d))
r2 = not (a and b) or not (c and d)
r3 = (not a or b) and (not c or d)

Print r1, r2, r3, then how many of them are True, then "SAFE" if at least 2 are True else "INSPECT".

Input Format:
One line with four space-separated values a b c d, each 0 or 1.

Output Format:
Five lines: r1, r2, r3 (each True or False), the count of True results (0-3), then SAFE or INSPECT.

Constraints:
Each of a, b, c, d is 0 or 1.`,
    difficulty: "hard",
    variant: "scenario",
    subtopic: "Logical Operators",
    sampleinput1: "1 0 1 1",
    sampleoutput1: "False\nTrue\nFalse\n1\nINSPECT",
    sampleinput2: "0 1 1 1",
    sampleoutput2: "True\nTrue\nTrue\n3\nSAFE",
    input1: "1 1 0 0",
    output1: "False\nTrue\nTrue\n2\nSAFE",
    input2: "0 0 0 1",
    output2: "True\nTrue\nTrue\n3\nSAFE",
    input3: "1 1 1 1",
    output3: "False\nFalse\nTrue\n1\nINSPECT",
    inputconstrains: "each of a b c d is 0 or 1",
    blacklist: "elif",
    whitelist: "not , and , or ",
    sourcecode: `def main():
    a, b, c, d = [v == "1" for v in input().split()]
    r1 = (not a and b) or (not c and d)
    r2 = not (a and b) or not (c and d)
    r3 = (not a or b) and (not c or d)
    count = (1 if r1 else 0) + (1 if r2 else 0) + (1 if r3 else 0)
    print(r1)
    print(r2)
    print(r3)
    print(count)
    print("SAFE" if count >= 2 else "INSPECT")


main()`,
  }),
];

/* ══════════════════════ MCQ QUESTIONS (20) ══════════════════════ */

const mcqs: McqQ[] = [
  mq({
    title: "Floor Division Result",
    description: "In Python 3, the // operator performs floor division. What does the expression 7 // 2 evaluate to?",
    difficulty: "easy",
    subtopic: "Arithmetic Operators",
    Option1: "3",
    Option2: "3.5",
    Option3: "4",
    Option4: "2",
    CorrectOption: 1,
  }),
  mq({
    title: "Remainder of Ten by Three",
    description: "What does the expression 10 % 3 evaluate to in Python?",
    difficulty: "easy",
    subtopic: "Arithmetic Operators",
    Option1: "3",
    Option2: "0",
    Option3: "1",
    Option4: "3.33",
    CorrectOption: 3,
  }),
  mq({
    title: "Exponentiation Operator Symbol",
    description: "Which operator does Python use for exponentiation (raising a number to a power)?",
    difficulty: "easy",
    subtopic: "Arithmetic Operators",
    Option1: "^",
    Option2: "**",
    Option3: "*",
    Option4: "//",
    CorrectOption: 2,
  }),
  mq({
    title: "True Division Value",
    description: "In Python 3 the / operator always performs true division, even between integers. What does 5 / 2 evaluate to?",
    difficulty: "easy",
    subtopic: "Arithmetic Operators",
    Option1: "2.5",
    Option2: "2",
    Option3: "3",
    Option4: "4",
    CorrectOption: 1,
  }),
  mq({
    title: "Substring Membership Test",
    description: 'What does the expression "py" in "python" evaluate to?',
    difficulty: "easy",
    subtopic: "Membership and Identity Operators",
    Option1: "False",
    Option2: "True",
    Option3: '"py"',
    Option4: "TypeError",
    CorrectOption: 2,
  }),
  mq({
    title: "Left Shift Result",
    description: "What does the expression 1 << 3 evaluate to? (<< shifts the bits of 1 three places to the left.)",
    difficulty: "easy",
    subtopic: "Bitwise Operators",
    Option1: "3",
    Option2: "4",
    Option3: "8",
    Option4: "16",
    CorrectOption: 3,
  }),
  mq({
    title: "First Evaluated Operator",
    description: "In the expression 2 + 3 * 4, which operator is applied first under Python's precedence rules?",
    difficulty: "easy",
    subtopic: "Operator Precedence and Associativity",
    Option1: "+ (addition)",
    Option2: "* (multiplication)",
    Option3: "Both are applied strictly left to right",
    Option4: "The expression is a syntax error",
    CorrectOption: 2,
  }),
  mq({
    title: "Negation of True",
    description: "What does the expression not True evaluate to?",
    difficulty: "easy",
    subtopic: "Logical Operators",
    Option1: "False",
    Option2: "True",
    Option3: "0",
    Option4: "None",
    CorrectOption: 1,
  }),
  mq({
    title: "Augmented Assignment Operator",
    description: "Which of the following is an augmented (compound) assignment operator in Python?",
    difficulty: "easy",
    subtopic: "Assignment Operators",
    Option1: "+=",
    Option2: "==",
    Option3: "=>",
    Option4: "->",
    CorrectOption: 1,
  }),
  mq({
    title: "Greater or Equal Verdict",
    description: "What does the expression 17 >= 17 evaluate to?",
    difficulty: "easy",
    subtopic: "Relational (Comparison) Operators",
    Option1: "False",
    Option2: "True",
    Option3: "17",
    Option4: "None",
    CorrectOption: 2,
  }),

  mq({
    title: "Division Pair Output",
    description: "This one-line program runs two different divisions of 7 by 2 and prints both results on a single line. What is the exact output?",
    difficulty: "medium",
    subtopic: "Arithmetic Operators",
    Option1: "3.5 3",
    Option2: "3 3.5",
    Option3: "3.5 4",
    Option4: "4 3",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: "print(7 / 2, 7 // 2)",
    snippetLang: "python",
  }),
  mq({
    title: "Floor of Negative Half",
    description: "The program below prints one value. Floor division rounds toward negative infinity. What is the exact output?",
    difficulty: "medium",
    subtopic: "Arithmetic Operators",
    Option1: "-3.5",
    Option2: "-3",
    Option3: "-4",
    Option4: "4",
    CorrectOption: 3,
    iscodesnippet: true,
    codesnippet: "print(-7 // 2)",
    snippetLang: "python",
  }),
  mq({
    title: "Power Chain Associativity",
    description: "Exponentiation is right-associative in Python: a ** b ** c means a ** (b ** c). What does this program print?",
    difficulty: "medium",
    subtopic: "Operator Precedence and Associativity",
    Option1: "64",
    Option2: "512",
    Option3: "36",
    Option4: "256",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: "print(2 ** 3 ** 2)",
    snippetLang: "python",
  }),
  mq({
    title: "Compound Addition Result",
    description: "The program updates x with an augmented assignment whose right-hand side is itself an expression. What does it print?",
    difficulty: "medium",
    subtopic: "Assignment Operators",
    Option1: "16",
    Option2: "11",
    Option3: "13",
    Option4: "10",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: "x = 5\nx += 3 * 2\nprint(x)",
    snippetLang: "python",
  }),
  mq({
    title: "Short-Circuit Operand Pair",
    description: 'Python\'s and and or return one of their operands, not necessarily a boolean: 0 or "x" yields "x" and "a" and "b" yields "b". What does this program print?',
    difficulty: "medium",
    subtopic: "Logical Operators",
    Option1: "x b",
    Option2: "0 b",
    Option3: "x a",
    Option4: "b x",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: 'print(0 or "x", "a" and "b")',
    snippetLang: "python",
  }),
  mq({
    title: "Modulo Multiply Order",
    description: "The %, * and // operators share the same precedence level and associate left to right. What does this program print?",
    difficulty: "medium",
    subtopic: "Operator Precedence and Associativity",
    Option1: "5",
    Option2: "3",
    Option3: "7",
    Option4: "21",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: "a = 10\nb = 3\nprint(a % b * 2 + 1)",
    snippetLang: "python",
  }),

  mq({
    title: "Boolean Arithmetic and Operand",
    description: 'bool is a subclass of int (True + True is 2), and the and operator returns its second operand when the first is truthy. What does this program print?',
    difficulty: "hard",
    subtopic: "Logical Operators",
    Option1: "2 yes",
    Option2: "True yes",
    Option3: "2 True",
    Option4: "1 yes",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: 'print(True + True, True and "yes")',
    snippetLang: "python",
  }),
  mq({
    title: "Bitwise Quartet Output",
    description: "The program applies four bitwise operators to 6 (binary 110) and 3 (binary 011). What is the exact output?",
    difficulty: "hard",
    subtopic: "Bitwise Operators",
    Option1: "0 7 5 3",
    Option2: "2 7 5 3",
    Option3: "2 7 5 1",
    Option4: "2 5 7 3",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: "x = 6\ny = 3\nprint(x & y, x | y, x ^ y, x >> 1)",
    snippetLang: "python",
  }),
  mq({
    title: "Equality vs Identity on Lists",
    description: "Two separately created lists hold equal values. The == operator compares values while is compares object identity. What does this program print?",
    difficulty: "hard",
    subtopic: "Membership and Identity Operators",
    Option1: "False False",
    Option2: "False True",
    Option3: "True True",
    Option4: "True False",
    CorrectOption: 4,
    iscodesnippet: true,
    codesnippet: "a = [1, 2]\nb = [1, 2]\nprint(a == b, a is b)",
    snippetLang: "python",
  }),
  mq({
    title: "Ternary Branch Evaluation",
    description: "Consider this line: z = 5 if 3 > 2 else 1 / 0. What happens when the line runs?",
    difficulty: "hard",
    subtopic: "Conditional (Ternary) Operator",
    Option1: "ZeroDivisionError is raised immediately",
    Option2: "z becomes 5; the else branch is never evaluated, so no error occurs",
    Option3: "z becomes 0",
    Option4: "SyntaxError: conditional expressions cannot contain division",
    CorrectOption: 2,
  }),
];

/* ══════════════════════ WRITE FILES ══════════════════════ */

const codePath = "/home/z/my-project/scripts/python-programming/data/day-03.code.json";
const mcqPath = "/home/z/my-project/scripts/python-programming/data/day-03.mcq.json";

writeFileSync(codePath, JSON.stringify({ day: 3, topics: [{ name: TOPIC, subtopics: SUBTOPICS }], questions }, null, 2));
writeFileSync(mcqPath, JSON.stringify({ day: 3, questions: mcqs }, null, 2));

console.log(`wrote day 3: ${questions.length} code questions, ${mcqs.length} MCQs`);
