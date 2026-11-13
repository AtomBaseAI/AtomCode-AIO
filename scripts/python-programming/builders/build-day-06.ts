/**
 * Builder for Day 6 — "Functions and Lambda" (topic: Functions and Lambda).
 * Writes data/day-06.code.json (20 code questions) and data/day-06.mcq.json (20 MCQs).
 * Run: bun scripts/python-programming/builders/build-day-06.ts
 *
 * NOTE: inside TS template literals escape sequences ARE processed, so a Python
 * "\n" string literal must be written as "\\n" here to survive into the JSON.
 */
import { writeFileSync } from "node:fs";

const OUT = "/home/z/my-project/scripts/python-programming/data";
const TOPIC_NAME = "Functions and Lambda";
const SUBTOPICS = [
  "Defining Functions",
  "Parameters and Arguments",
  "Default Arguments",
  "Keyword Arguments",
  "Return Values",
  "Anonymous Functions (lambda)",
];

const topics = [{ name: TOPIC_NAME, subtopics: [...SUBTOPICS] }];

const desc = (p: string, i: string, o: string, c: string) =>
  `${p}\n\nInput Format:\n${i}\n\nOutput Format:\n${o}\n\nConstraints:\n${c}`;

function q(over: Record<string, any>) {
  return {
    lang: "python",
    topic: TOPIC_NAME,
    maxscore: 10,
    blacklist: "",
    whitelist: "",
    ...over,
  };
}

function mcq(over: Record<string, any>) {
  return {
    topic: TOPIC_NAME,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
    ...over,
  };
}

/* ─────────────────────────  CODE QUESTIONS (20)  ───────────────────────── */

const questions = [
  q({
    title: "Welcome Greeter Function",
    description: desc(
      "Write a function greet(name) that prints a two-line welcome, then call it with the name read from input.",
      "One line containing the name (it may contain spaces).",
      "Line 1: 'Hello, <name>!'.\nLine 2: 'Welcome aboard!'.",
      "The name has 1 to 50 characters"
    ),
    difficulty: "easy",
    variant: "basic",
    subtopic: "Defining Functions",
    sampleinput1: "Asha",
    sampleoutput1: "Hello, Asha!\nWelcome aboard!",
    sampleinput2: "Ravi Kumar",
    sampleoutput2: "Hello, Ravi Kumar!\nWelcome aboard!",
    input1: "Bot", output1: "Hello, Bot!\nWelcome aboard!",
    input2: "Grace Hopper", output2: "Hello, Grace Hopper!\nWelcome aboard!",
    input3: "Z", output3: "Hello, Z!\nWelcome aboard!",
    inputconstrains: "the name has 1 to 50 characters",
    sourcecode: `def greet(name):
    print(f"Hello, {name}!")
    print("Welcome aboard!")

greet(input())`,
  }),

  q({
    title: "Rectangle Area Via Function",
    description: desc(
      "Define a function area_rect(a, b) that returns the area of a rectangle, read the two sides from input and print the returned value formatted to two decimals.",
      "One line with sides a and b (floats).",
      "One line with the area rounded to 2 decimal places.",
      "0 <= a, b <= 1000"
    ),
    difficulty: "easy",
    variant: "basic",
    subtopic: "Return Values",
    sampleinput1: "4 5",
    sampleoutput1: "20.00",
    sampleinput2: "2.5 4",
    sampleoutput2: "10.00",
    input1: "3.2 7.5", output1: "24.00",
    input2: "1.5 1.5", output2: "2.25",
    input3: "10 0.5", output3: "5.00",
    inputconstrains: "0 <= a, b <= 1000",
    sourcecode: `def area_rect(a, b):
    return a * b

a, b = map(float, input().split())
print(f"{area_rect(a, b):.2f}")`,
  }),

  q({
    title: "Even Verdict Function",
    description: desc(
      "Define a function is_even(n) that returns True when n is even and False otherwise, then print the verdict for the input number.",
      "One integer n.",
      "True or False.",
      "0 <= n <= 1000000000"
    ),
    difficulty: "easy",
    variant: "basic",
    subtopic: "Defining Functions",
    sampleinput1: "4",
    sampleoutput1: "True",
    sampleinput2: "7",
    sampleoutput2: "False",
    input1: "0", output1: "True",
    input2: "99", output2: "False",
    input3: "1000", output3: "True",
    inputconstrains: "0 <= n <= 1000000000",
    sourcecode: `def is_even(n):
    return n % 2 == 0

n = int(input())
print(is_even(n))`,
  }),

  q({
    title: "Discount With Default Percentage",
    description: desc(
      "A store applies a default discount of 10 percent. Define net_price(price, pct=10) that returns the price after the discount. The input line holds a price and an optional second token: when a percentage is present use it, otherwise rely on the default argument.",
      "One line: price, optionally followed by an integer percentage.",
      "One line with the net price rounded to 2 decimals.",
      "0 <= price <= 100000; 0 <= pct <= 90 (when present)"
    ),
    difficulty: "easy",
    variant: "basic",
    subtopic: "Default Arguments",
    sampleinput1: "200",
    sampleoutput1: "180.00",
    sampleinput2: "200 25",
    sampleoutput2: "150.00",
    input1: "59.5", output1: "53.55",
    input2: "1000 7", output2: "930.00",
    input3: "45", output3: "40.50",
    inputconstrains: "0 <= price <= 100000; 0 <= pct <= 90 (when present)",
    sourcecode: `def net_price(price, pct=10):
    return price * (100 - pct) / 100

parts = input().split()
price = float(parts[0])
if len(parts) == 2:
    print(f"{net_price(price, int(parts[1])):.2f}")
else:
    print(f"{net_price(price):.2f}")`,
  }),

  q({
    title: "Keyword Ticket Booking",
    description: desc(
      "Define ticket(passenger, seat, fare) that prints the booking details, then call it using keyword arguments supplied in a scrambled order to prove that names, not positions, drive the binding.",
      "One line: passenger seat fare (fare is an integer).",
      "'Passenger: <p>', 'Seat: <s>' and 'Fare: <f>' on three lines.",
      "passenger and seat are single words; 0 <= fare <= 100000"
    ),
    difficulty: "easy",
    variant: "basic",
    subtopic: "Keyword Arguments",
    sampleinput1: "Ravi 12A 850",
    sampleoutput1: "Passenger: Ravi\nSeat: 12A\nFare: 850",
    sampleinput2: "Priya 3C 1200",
    sampleoutput2: "Passenger: Priya\nSeat: 3C\nFare: 1200",
    input1: "Arjun 1A 2500", output1: "Passenger: Arjun\nSeat: 1A\nFare: 2500",
    input2: "Meera 7B 640", output2: "Passenger: Meera\nSeat: 7B\nFare: 640",
    input3: "Kabir 2D 999", output3: "Passenger: Kabir\nSeat: 2D\nFare: 999",
    inputconstrains: "passenger and seat are single words; 0 <= fare <= 100000",
    sourcecode: `def ticket(passenger, seat, fare):
    print(f"Passenger: {passenger}")
    print(f"Seat: {seat}")
    print(f"Fare: {fare}")

p, s, f = input().split()
ticket(seat=s, fare=int(f), passenger=p)`,
  }),

  q({
    title: "Lambda Square Machine",
    description: desc(
      "Store a lambda in a variable so it squares its argument, read an integer from input and print the lambda's result.",
      "One integer n.",
      "One line with n squared.",
      "0 <= n <= 100000"
    ),
    difficulty: "easy",
    variant: "basic",
    subtopic: "Anonymous Functions (lambda)",
    sampleinput1: "5",
    sampleoutput1: "25",
    sampleinput2: "0",
    sampleoutput2: "0",
    input1: "12", output1: "144",
    input2: "9", output2: "81",
    input3: "100000", output3: "10000000000",
    inputconstrains: "0 <= n <= 100000",
    sourcecode: `square = lambda x: x * x
n = int(input())
print(square(n))`,
  }),

  q({
    title: "Shipping Cost Calculator",
    description: desc(
      "A courier charges a base fee of 20 plus 5 per kilogram; express deliveries add a 50 surcharge. Define shipping_cost(weight, base=20, rate=5, surcharge=0) that returns the total, read the parcel weight and the mode, and call the function with the keyword argument surcharge=50 only for express parcels.",
      "Line 1: weight (float).\nLine 2: mode, either standard or express.",
      "One line with the total cost rounded to 2 decimals.",
      "0 <= weight <= 100; mode is standard or express"
    ),
    difficulty: "easy",
    variant: "scenario",
    subtopic: "Keyword Arguments",
    sampleinput1: "3\nstandard",
    sampleoutput1: "35.00",
    sampleinput2: "3\nexpress",
    sampleoutput2: "85.00",
    input1: "2.5\nstandard", output1: "32.50",
    input2: "0\nexpress", output2: "70.00",
    input3: "7.2\nstandard", output3: "56.00",
    inputconstrains: "0 <= weight <= 100; mode is standard or express",
    sourcecode: `def shipping_cost(weight, base=20, rate=5, surcharge=0):
    return base + weight * rate + surcharge

weight = float(input())
mode = input()
if mode == "express":
    total = shipping_cost(weight, surcharge=50)
else:
    total = shipping_cost(weight)
print(f"{total:.2f}")`,
  }),

  q({
    title: "Employee Bonus Calculator",
    description: desc(
      "A company pays a default bonus of 5 percent of salary, but managers get 12 percent and leads get 8 percent. Define bonus(salary, pct=5.0) returning the bonus amount, read the salary and role, and print the right bonus by passing the percentage only when the role demands it.",
      "Line 1: salary (float).\nLine 2: role (manager, lead, or any other word).",
      "One line with the bonus rounded to 2 decimals.",
      "0 <= salary <= 1000000; role is a single word"
    ),
    difficulty: "easy",
    variant: "scenario",
    subtopic: "Default Arguments",
    sampleinput1: "50000\nmanager",
    sampleoutput1: "6000.00",
    sampleinput2: "40000\nlead",
    sampleoutput2: "3200.00",
    input1: "30000\nstaff", output1: "1500.00",
    input2: "25000\nintern", output2: "1250.00",
    input3: "62500\nmanager", output3: "7500.00",
    inputconstrains: "0 <= salary <= 1000000; role is a single word",
    sourcecode: `def bonus(salary, pct=5.0):
    return salary * pct / 100

salary = float(input())
role = input()
if role == "manager":
    print(f"{bonus(salary, 12):.2f}")
elif role == "lead":
    print(f"{bonus(salary, 8):.2f}")
else:
    print(f"{bonus(salary):.2f}")`,
  }),

  q({
    title: "Invoice Line Totalizer",
    description: desc(
      "A billing script totals invoice lines. Define line_total(qty, price) that returns qty * price. Read n lines, each 'item qty price', print each line's total to 2 decimals and finish with the grand total.",
      "Line 1: n.\nLines 2 to n+1: item qty price (item is a single word, qty an integer, price a float).",
      "Per line: '<item>: <total>' with 2 decimals; last line 'Total: <grand>' with 2 decimals.",
      "1 <= n <= 20; 0 <= qty <= 1000; 0 <= price <= 100000"
    ),
    difficulty: "easy",
    variant: "scenario",
    subtopic: "Parameters and Arguments",
    sampleinput1: "2\npen 3 4.5\nbook 2 12.25",
    sampleoutput1: "pen: 13.50\nbook: 24.50\nTotal: 38.00",
    sampleinput2: "1\nbag 1 999.99",
    sampleoutput2: "bag: 999.99\nTotal: 999.99",
    input1: "3\npen 3 4.5\nink 10 2\npad 5 7.5", output1: "pen: 13.50\nink: 20.00\npad: 37.50\nTotal: 71.00",
    input2: "2\nclip 100 0.25\nfile 4 3.2", output2: "clip: 25.00\nfile: 12.80\nTotal: 37.80",
    input3: "2\nmug 2 350\ncoaster 6 45.5", output3: "mug: 700.00\ncoaster: 273.00\nTotal: 973.00",
    inputconstrains: "1 <= n <= 20; 0 <= qty <= 1000; 0 <= price <= 100000",
    sourcecode: `def line_total(qty, price):
    return qty * price

n = int(input())
grand = 0
for _ in range(n):
    parts = input().split()
    item = parts[0]
    qty = int(parts[1])
    price = float(parts[2])
    total = line_total(qty, price)
    grand += total
    print(f"{item}: {total:.2f}")
print(f"Total: {grand:.2f}")`,
  }),

  q({
    title: "Exam Result Composer",
    description: desc(
      "Define compose(m1, m2, m3) that returns a tuple (total, average, verdict) where the verdict is Pass when the average is at least 40, otherwise Fail. Read three marks, unpack the returned tuple at the call site and print the report.",
      "One line: three integer marks.",
      "'Total: <t>', 'Average: <a>' (2 decimals) and the verdict on three lines.",
      "0 <= each mark <= 100"
    ),
    difficulty: "easy",
    variant: "scenario",
    subtopic: "Return Values",
    sampleinput1: "60 70 80",
    sampleoutput1: "Total: 210\nAverage: 70.00\nPass",
    sampleinput2: "35 40 45",
    sampleoutput2: "Total: 120\nAverage: 40.00\nPass",
    input1: "30 35 39", output1: "Total: 104\nAverage: 34.67\nFail",
    input2: "100 100 100", output2: "Total: 300\nAverage: 100.00\nPass",
    input3: "0 0 1", output3: "Total: 1\nAverage: 0.33\nFail",
    inputconstrains: "0 <= each mark <= 100",
    sourcecode: `def compose(m1, m2, m3):
    total = m1 + m2 + m3
    avg = total / 3
    verdict = "Pass" if avg >= 40 else "Fail"
    return total, avg, verdict

m1, m2, m3 = map(int, input().split())
total, avg, verdict = compose(m1, m2, m3)
print(f"Total: {total}")
print(f"Average: {avg:.2f}")
print(verdict)`,
  }),

  q({
    title: "Slab Electricity Biller",
    description: desc(
      "A utility bills electricity in slabs: the first 100 units cost 3.50 per unit, the next 100 units cost 5.00 per unit and every unit beyond 200 costs 8.00. Define a function bill(units) that returns the amount and process n meter readings, printing each bill to 2 decimals.",
      "Line 1: n.\nLines 2 to n+1: one integer reading per line.",
      "One line per reading with the amount rounded to 2 decimals.",
      "1 <= n <= 20; 0 <= units <= 5000"
    ),
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Default Arguments",
    sampleinput1: "3\n100\n150\n250",
    sampleoutput1: "350.00\n600.00\n1250.00",
    sampleinput2: "1\n75",
    sampleoutput2: "262.50",
    input1: "2\n200\n201", output1: "850.00\n858.00",
    input2: "4\n0\n1\n99\n101", output2: "0.00\n3.50\n346.50\n355.00",
    input3: "5\n1\n50\n100\n300\n500", output3: "3.50\n175.00\n350.00\n1650.00\n3250.00",
    inputconstrains: "1 <= n <= 20; 0 <= units <= 5000",
    blacklist: "lambda",
    whitelist: "def , return",
    sourcecode: `def bill(units):
    if units <= 100:
        return units * 3.5
    if units <= 200:
        return 350 + (units - 100) * 5
    return 850 + (units - 200) * 8

n = int(input())
for _ in range(n):
    u = int(input())
    print(f"{bill(u):.2f}")`,
  }),

  q({
    title: "Product Price Sorter",
    description: desc(
      "A catalogue screen sorts products by price, cheapest first; equal prices are ordered by product name alphabetically. Read the products and sort them with sorted() and a lambda key — no function definitions anywhere in the program.",
      "Line 1: n.\nLines 2 to n+1: 'name price' (price is a float).",
      "One line per product: '<name> <price>' with the price to 2 decimals, in sorted order.",
      "1 <= n <= 100; 0 <= price <= 100000; names are single words"
    ),
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Anonymous Functions (lambda)",
    sampleinput1: "3\nmouse 12.5\ncable 8\ndrive 12.5",
    sampleoutput1: "cable 8.00\ndrive 12.50\nmouse 12.50",
    sampleinput2: "1\nstool 19.99",
    sampleoutput2: "stool 19.99",
    input1: "4\ndesk 90\nchair 45.5\nlamp 45.5\nrug 60", output1: "chair 45.50\nlamp 45.50\nrug 60.00\ndesk 90.00",
    input2: "5\npen 2\nera 2\nalt 2\nzip 2\nmid 2", output2: "alt 2.00\nera 2.00\nmid 2.00\npen 2.00\nzip 2.00",
    input3: "3\nboard 100\nclip 0.9\nink 45.05", output3: "clip 0.90\nink 45.05\nboard 100.00",
    inputconstrains: "1 <= n <= 100; 0 <= price <= 100000; names are single words",
    blacklist: "def ",
    whitelist: "lambda, sorted(",
    sourcecode: `n = int(input())
products = []
for _ in range(n):
    parts = input().split()
    products.append((parts[0], float(parts[1])))
ordered = sorted(products, key=lambda p: (p[1], p[0]))
for name, price in ordered:
    print(f"{name} {price:.2f}")`,
  }),

  q({
    title: "Sensor Reading Calibrator",
    description: desc(
      "A lab calibrates raw sensor voltages with the formula value * gain + offset. Process the readings entirely functionally: no for loops and no comprehensions anywhere — build the formatted results with map and print them.",
      "Line 1: n.\nLine 2: gain and offset (floats).\nLine 3: n readings (floats).",
      "One calibrated value per line, rounded to 2 decimals.",
      "1 <= n <= 100; -1000 <= gain, offset, readings <= 1000"
    ),
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Anonymous Functions (lambda)",
    sampleinput1: "3\n2 1\n1.5 2 0.5",
    sampleoutput1: "4.00\n5.00\n2.00",
    sampleinput2: "4\n0.5 -2\n10 20 30 40",
    sampleoutput2: "3.00\n8.00\n13.00\n18.00",
    input1: "2\n1.5 0.25\n2 4", output1: "3.25\n6.25",
    input2: "5\n3 0\n1 2 3 4 5", output2: "3.00\n6.00\n9.00\n12.00\n15.00",
    input3: "3\n0.1 5\n10 20 30", output3: "6.00\n7.00\n8.00",
    inputconstrains: "1 <= n <= 100; -1000 <= gain, offset, readings <= 1000",
    blacklist: "for ",
    whitelist: "map(",
    sourcecode: `n = int(input())
gain, offset = map(float, input().split())
readings = list(map(float, input().split()))
print("\\n".join(map(lambda v: f"{v * gain + offset:.2f}", readings)))`,
  }),

  q({
    title: "High Value Transaction Filter",
    description: desc(
      "A bank's alert screen lists only the transactions strictly above a threshold. Read the threshold and the amounts, then pick the flagged ones with filter and a lambda — no for loops anywhere. Print them to 2 decimals, or None when nothing qualifies.",
      "Line 1: threshold (float).\nLine 2: n.\nLine 3: n amounts (floats).",
      "Each flagged amount on its own line (2 decimals), in input order; a single line None when there are none.",
      "1 <= n <= 100; 0 <= threshold, amounts <= 1000000"
    ),
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Anonymous Functions (lambda)",
    sampleinput1: "100\n5\n50 120 99.9 200 100",
    sampleoutput1: "120.00\n200.00",
    sampleinput2: "1000\n4\n10 20 30 40",
    sampleoutput2: "None",
    input1: "0\n3\n5 10 15", output1: "5.00\n10.00\n15.00",
    input2: "49.5\n4\n50 49.5 51 49.4", output2: "50.00\n51.00",
    input3: "5\n1\n6", output3: "6.00",
    inputconstrains: "1 <= n <= 100; 0 <= threshold, amounts <= 1000000",
    blacklist: "for ",
    whitelist: "filter(",
    sourcecode: `threshold = float(input())
n = int(input())
amounts = list(map(float, input().split()))
big = list(filter(lambda a: a > threshold, amounts))
if big:
    print("\\n".join(map(lambda a: f"{a:.2f}", big)))
else:
    print("None")`,
  }),

  q({
    title: "Library Late Fee Slabs",
    description: desc(
      "A library charges late fees in slabs: the first 7 late days cost 0.50 per day, days 8 to 30 cost 1.00 per day, and every day beyond 30 costs 2.00 per day. Model the slabs with three small functions where each def hands the remaining days to the next one, then report the fee for n overdue books.",
      "Line 1: n.\nLines 2 to n+1: one integer (late days) per line.",
      "One fee per line, rounded to 2 decimals.",
      "1 <= n <= 20; 0 <= late days <= 365"
    ),
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Defining Functions",
    sampleinput1: "4\n7\n8\n30\n31",
    sampleoutput1: "3.50\n4.50\n26.50\n28.50",
    sampleinput2: "1\n40",
    sampleoutput2: "46.50",
    input1: "3\n0\n1\n3", output1: "0.00\n0.50\n1.50",
    input2: "2\n15\n45", output2: "11.50\n56.50",
    input3: "5\n7\n10\n20\n30\n60", output3: "3.50\n6.50\n16.50\n26.50\n86.50",
    inputconstrains: "1 <= n <= 20; 0 <= late days <= 365",
    blacklist: "lambda, max(",
    whitelist: "def , return",
    sourcecode: `def base_fee(days):
    if days <= 7:
        return days * 0.5
    return 3.5 + extra_fee(days)

def extra_fee(days):
    if days <= 30:
        return (days - 7) * 1.0
    return 23.0 + heavy_fee(days - 30)

def heavy_fee(d):
    return d * 2.0

n = int(input())
for _ in range(n):
    d = int(input())
    print(f"{base_fee(d):.2f}")`,
  }),

  q({
    title: "Pizza Order Builder",
    description: desc(
      "An ordering kiosk builds pizza descriptions from keyword extras. Define build_order(size, **extras) that receives every topping as a keyword argument, keeps them in the order given, and returns the description; call it by unpacking a dict with ** so the toppings flow in as keywords.",
      "Line 1: size (S, M or L).\nLine 2: number of toppings.\nFollowing lines: one topping name per line.",
      "'<size> pizza with <t1>, <t2>, ...' — or '<size> pizza (plain)' when there are no toppings.",
      "0 <= toppings <= 8; topping names are single words"
    ),
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Keyword Arguments",
    sampleinput1: "M\n3\ncheese\nolives\nbasil",
    sampleoutput1: "M pizza with cheese, olives, basil",
    sampleinput2: "L\n0",
    sampleoutput2: "L pizza (plain)",
    input1: "S\n2\npaneer\nchilli", output1: "S pizza with paneer, chilli",
    input2: "M\n1\ncorn", output2: "M pizza with corn",
    input3: "L\n4\ntomato\nonion\ncapsicum\njalapeno", output3: "L pizza with tomato, onion, capsicum, jalapeno",
    inputconstrains: "0 <= toppings <= 8; topping names are single words",
    blacklist: "lambda",
    whitelist: "def , **",
    sourcecode: `def build_order(size, **extras):
    names = []
    for t in extras:
        names.append(t)
    if names:
        return size + " pizza with " + ", ".join(names)
    return size + " pizza (plain)"

size = input()
count = int(input())
toppings = {}
for _ in range(count):
    toppings[input()] = True
print(build_order(size, **toppings))`,
  }),

  q({
    title: "Currency Normalizer Pipeline",
    description: desc(
      "A treasury service normalizes foreign prices into a base currency. Build a converter factory: make_converter(rate) returns a brand-new named function that multiplies its argument by the rate, and the main code fetches a fresh converter for every query. Rates come from a lookup table; an unknown currency code must be reported instead of converted.",
      "Line 1: m.\nLines 2 to m+1: 'code rate' (rate is a float).\nNext line: q.\nNext q lines: 'code amount' (amount is a float).",
      "One line per query: the converted amount to 2 decimals, or 'Unknown currency'.",
      "1 <= m, q <= 20; 0 < rate <= 1000; 0 <= amount <= 1000000; codes are single words"
    ),
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Defining Functions",
    sampleinput1: "2\nUSD 83.5\nEUR 91.2\n3\nUSD 100\nEUR 2.5\nJPY 50",
    sampleoutput1: "8350.00\n228.00\nUnknown currency",
    sampleinput2: "1\nINR 1.0\n2\nINR 99.99\nUSD 5",
    sampleoutput2: "99.99\nUnknown currency",
    input1: "3\nAED 22.65\nGBP 106.4\nSGD 62.3\n4\nAED 10\nGBP 0.5\nSGD 3\nXYZ 1", output1: "226.50\n53.20\n186.90\nUnknown currency",
    input2: "2\nUSD 83.5\nEUR 91.2\n2\nUSD 0\nEUR 0.01", output2: "0.00\n0.91",
    input3: "2\nCAD 61.7\nAUD 55.9\n3\nCAD 7.5\nAUD 2\nZWD 9", output3: "462.75\n111.80\nUnknown currency",
    inputconstrains: "1 <= m, q <= 20; 0 < rate <= 1000; 0 <= amount <= 1000000; codes are single words",
    blacklist: "lambda",
    whitelist: "def , return",
    sourcecode: `def make_converter(rate):
    def convert(amount):
        return amount * rate
    return convert

rates = {}
m = int(input())
for _ in range(m):
    parts = input().split()
    rates[parts[0]] = float(parts[1])

q = int(input())
for _ in range(q):
    parts = input().split()
    code = parts[0]
    amount = float(parts[1])
    if code in rates:
        converter = make_converter(rates[code])
        print(f"{converter(amount):.2f}")
    else:
        print("Unknown currency")`,
  }),

  q({
    title: "Bulk Order Discount Engine",
    description: desc(
      "A wholesaler prices bulk orders with a tier engine. Define order_total(*args) that aggregates any number of prices with a plain accumulation loop, and discount_rate(total) that maps the subtotal to a tier: 20 percent from 1000 up, 10 percent from 500 up to anything below 1000, otherwise none. Read the prices, call the aggregator by unpacking the list, and print the full quote.",
      "Line 1: n.\nLine 2: n prices (floats).",
      "'Subtotal: <s>' (2 decimals), 'Discount: <r>%' and 'Payable: <p>' (2 decimals).",
      "1 <= n <= 50; 0 <= price <= 100000"
    ),
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Parameters and Arguments",
    sampleinput1: "3\n250 300 500",
    sampleoutput1: "Subtotal: 1050.00\nDiscount: 20%\nPayable: 840.00",
    sampleinput2: "2\n100 200",
    sampleoutput2: "Subtotal: 300.00\nDiscount: 0%\nPayable: 300.00",
    input1: "2\n250 250", output1: "Subtotal: 500.00\nDiscount: 10%\nPayable: 450.00",
    input2: "4\n10.5 20.25 30 39.25", output2: "Subtotal: 100.00\nDiscount: 0%\nPayable: 100.00",
    input3: "5\n200 200 200 200 200", output3: "Subtotal: 1000.00\nDiscount: 20%\nPayable: 800.00",
    inputconstrains: "1 <= n <= 50; 0 <= price <= 100000",
    blacklist: "sum(",
    whitelist: "*args",
    sourcecode: `def order_total(*args):
    total = 0
    for p in args:
        total += p
    return total

def discount_rate(total):
    if total >= 1000:
        return 20
    if total >= 500:
        return 10
    return 0

n = int(input())
prices = list(map(float, input().split()))
subtotal = order_total(*prices)
rate = discount_rate(subtotal)
discount = subtotal * rate / 100
payable = subtotal - discount
print(f"Subtotal: {subtotal:.2f}")
print(f"Discount: {rate}%")
print(f"Payable: {payable:.2f}")`,
  }),

  q({
    title: "Playlist Duration Curator",
    description: desc(
      "A music app curates a long-play queue: keep only the tracks lasting 180 seconds or more, then order them longest first (alphabetical title breaks ties). The whole pipeline must be functional — no for loops and no comprehensions; use map to parse, filter to select and sorted with a lambda key.",
      "Line 1: n.\nLine 2: n tokens 'title:seconds' separated by spaces.",
      "Each selected title on its own line, in curated order; a single line None when no track qualifies.",
      "1 <= n <= 50; titles are single words without ':'; 1 <= seconds <= 10000"
    ),
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Anonymous Functions (lambda)",
    sampleinput1: "5\nrock:210 pop:95 opera:402 jazz:180 metal:175",
    sampleoutput1: "opera\nrock\njazz",
    sampleinput2: "3\na:100 b:200 c:50",
    sampleoutput2: "b",
    input1: "4\nx:180 y:180 z:300 w:60", output1: "z\nx\ny",
    input2: "2\np:10 q:20", output2: "None",
    input3: "6\nbass:190 drums:180 vocals:301 piano:179 chorus:180", output3: "vocals\nbass\nchorus\ndrums",
    inputconstrains: "1 <= n <= 50; titles are single words without ':'; 1 <= seconds <= 10000",
    blacklist: "for , sum(",
    whitelist: "map(, lambda, filter(, sorted(",
    sourcecode: `n = int(input())
tokens = input().split()
songs = list(map(lambda t: (t.split(":")[0], int(t.split(":")[1])), tokens))
picks = sorted(filter(lambda s: s[1] >= 180, songs), key=lambda s: (-s[1], s[0]))
if picks:
    print("\\n".join(map(lambda s: s[0], picks)))
else:
    print("None")`,
  }),

  q({
    title: "Grade Ledger Default Trap",
    description: desc(
      "A coaching tracker keeps one shared ledger. Define record(score, ledger=[]) that appends the score to its ledger argument, totals the ledger with a plain loop, and returns (count, total, average); define verdict(average) returning 'On track' when the average is at least 40, else 'Needs work'. Read m scores, calling record without a ledger argument each time, and print the running analytics after every call — watch how the default list remembers across calls.",
      "Line 1: m.\nLines 2 to m+1: one integer score per line.",
      "Per call: 'Call <c>: total <t> average <a> (<verdict>)' with the average to 2 decimals.",
      "1 <= m <= 20; 0 <= score <= 100"
    ),
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Default Arguments",
    sampleinput1: "4\n10\n60\n95\n20",
    sampleoutput1: "Call 1: total 10 average 10.00 (Needs work)\nCall 2: total 70 average 35.00 (Needs work)\nCall 3: total 165 average 55.00 (On track)\nCall 4: total 185 average 46.25 (On track)",
    sampleinput2: "1\n55",
    sampleoutput2: "Call 1: total 55 average 55.00 (On track)",
    input1: "3\n100\n50\n50", output1: "Call 1: total 100 average 100.00 (On track)\nCall 2: total 150 average 75.00 (On track)\nCall 3: total 200 average 66.67 (On track)",
    input2: "5\n39\n41\n40\n80\n0", output2: "Call 1: total 39 average 39.00 (Needs work)\nCall 2: total 80 average 40.00 (On track)\nCall 3: total 120 average 40.00 (On track)\nCall 4: total 200 average 50.00 (On track)\nCall 5: total 200 average 40.00 (On track)",
    input3: "2\n10\n10", output3: "Call 1: total 10 average 10.00 (Needs work)\nCall 2: total 20 average 10.00 (Needs work)",
    inputconstrains: "1 <= m <= 20; 0 <= score <= 100",
    blacklist: "sum(",
    whitelist: "def , return, .append(",
    sourcecode: `def record(score, ledger=[]):
    ledger.append(score)
    total = 0
    for s in ledger:
        total += s
    count = len(ledger)
    average = total / count
    return count, total, average

def verdict(average):
    if average < 40:
        return "Needs work"
    return "On track"

m = int(input())
for _ in range(m):
    score = int(input())
    count, total, average = record(score)
    print(f"Call {count}: total {total} average {average:.2f} ({verdict(average)})")`,
  }),
];

/* ─────────────────────────  MCQ QUESTIONS (20)  ───────────────────────── */

const mcqs = [
  mcq({
    title: "Keyword That Defines a Function",
    description: "Which keyword introduces a new function definition in Python?",
    difficulty: "easy",
    subtopic: "Defining Functions",
    Option1: "function",
    Option2: "define",
    Option3: "def",
    Option4: "lambda",
    CorrectOption: 3,
  }),
  mcq({
    title: "Implicit Return of a Function",
    description: "What does a function return when it finishes without executing a return statement?",
    difficulty: "easy",
    subtopic: "Return Values",
    Option1: "None",
    Option2: "0",
    Option3: "An empty string",
    Option4: "False",
    CorrectOption: 1,
  }),
  mcq({
    title: "Role of the return Statement",
    description: "What does return do inside a function?",
    difficulty: "easy",
    subtopic: "Return Values",
    Option1: "It prints the value to the console",
    Option2: "It sends a value back to the caller and ends the function",
    Option3: "It saves the value in a global variable",
    Option4: "It pauses the function until it is called again",
    CorrectOption: 2,
  }),
  mcq({
    title: "Default Argument Behaviour",
    description: "Given def plan(day, month, year=2024):, what is year in the call plan(5, 'Mar')?",
    difficulty: "easy",
    subtopic: "Default Arguments",
    Option1: "None",
    Option2: "'Mar'",
    Option3: "2024, the default value",
    Option4: "The call raises a TypeError",
    CorrectOption: 3,
  }),
  mcq({
    title: "Freedom of Keyword Arguments",
    description: "What advantage do keyword arguments offer at a call site?",
    difficulty: "easy",
    subtopic: "Keyword Arguments",
    Option1: "They let required parameters be skipped",
    Option2: "They let values be passed by parameter name in any order",
    Option3: "They rename the function for the call",
    Option4: "They make the function return multiple values",
    CorrectOption: 2,
  }),
  mcq({
    title: "Meaning of a lambda Expression",
    description: "What is lambda x: x * 2?",
    difficulty: "easy",
    subtopic: "Anonymous Functions (lambda)",
    Option1: "An anonymous function that returns x * 2",
    Option2: "A variable named x holding 2",
    Option3: "A statement that prints x * 2",
    Option4: "A loop that doubles x twice",
    CorrectOption: 1,
  }),
  mcq({
    title: "Simple Add Function Call",
    description: "What does this snippet print?",
    difficulty: "easy",
    subtopic: "Defining Functions",
    iscodesnippet: true,
    codesnippet: `def add(a, b):
    return a + b

print(add(2, 3))`,
    snippetLang: "python",
    Option1: "23",
    Option2: "5",
    Option3: "2 3",
    Option4: "None",
    CorrectOption: 2,
  }),
  mcq({
    title: "Composing Function Results",
    description: "What does this snippet print?",
    difficulty: "easy",
    subtopic: "Return Values",
    iscodesnippet: true,
    codesnippet: `def square(x):
    return x * x

print(square(4) + square(2))`,
    snippetLang: "python",
    Option1: "16",
    Option2: "24",
    Option3: "20",
    Option4: "64",
    CorrectOption: 3,
  }),
  mcq({
    title: "Counting Parameters in a Signature",
    description: "How many parameters does def report(title, body, tag='general'): have?",
    difficulty: "easy",
    subtopic: "Parameters and Arguments",
    Option1: "2, because tag is optional",
    Option2: "1",
    Option3: "3",
    Option4: "It depends on the call",
    CorrectOption: 3,
  }),
  mcq({
    title: "Illegal Positional After Keyword",
    description: "def f(name, age): — which call raises a SyntaxError?",
    difficulty: "easy",
    subtopic: "Keyword Arguments",
    Option1: "f('Sam', 5)",
    Option2: "f(name='Sam', age=5)",
    Option3: "f('Sam', age=5)",
    Option4: "f(age=5, 'Sam')",
    CorrectOption: 4,
  }),
  mcq({
    title: "Shared Mutable Default Revealed",
    description: "What does this snippet print?",
    difficulty: "medium",
    subtopic: "Default Arguments",
    iscodesnippet: true,
    codesnippet: `def add_item(item, basket=[]):
    basket.append(item)
    return basket

print(add_item("a"))
print(add_item("b"))`,
    snippetLang: "python",
    Option1: "['a'] then ['b']",
    Option2: "['a', 'b'] twice",
    Option3: "['a'] then ['a', 'b']",
    Option4: "['b'] then ['a', 'b']",
    CorrectOption: 3,
  }),
  mcq({
    title: "Keyword Order Does Not Matter",
    description: "What does this snippet print?",
    difficulty: "medium",
    subtopic: "Keyword Arguments",
    iscodesnippet: true,
    codesnippet: `def info(name, city):
    return name + " - " + city

print(info(city="Pune", name="Ravi"))`,
    snippetLang: "python",
    Option1: "Pune - Ravi",
    Option2: "Ravi - Pune",
    Option3: "name - city",
    Option4: "A TypeError is raised",
    CorrectOption: 2,
  }),
  mcq({
    title: "Mapping Squares with map",
    description: "What does this snippet print?",
    difficulty: "medium",
    subtopic: "Anonymous Functions (lambda)",
    iscodesnippet: true,
    codesnippet: `nums = [1, 2, 3, 4]
res = list(map(lambda x: x * x, nums))
print(res[2])`,
    snippetLang: "python",
    Option1: "4",
    Option2: "9",
    Option3: "16",
    Option4: "[1, 4, 9, 16]",
    CorrectOption: 2,
  }),
  mcq({
    title: "Local Shadow of a Global",
    description: "What does this snippet print?",
    difficulty: "medium",
    subtopic: "Defining Functions",
    iscodesnippet: true,
    codesnippet: `count = 10

def bump():
    count = 5

bump()
print(count)`,
    snippetLang: "python",
    Option1: "5",
    Option2: "15",
    Option3: "A NameError is raised",
    Option4: "10",
    CorrectOption: 4,
  }),
  mcq({
    title: "Sorting with a Lambda Key",
    description: "What does this snippet print?",
    difficulty: "medium",
    subtopic: "Anonymous Functions (lambda)",
    iscodesnippet: true,
    codesnippet: `data = [("b", 2), ("a", 3), ("c", 1)]
data.sort(key=lambda p: p[1])
print(data[0])`,
    snippetLang: "python",
    Option1: "('a', 3)",
    Option2: "('b', 2)",
    Option3: "('c', 1)",
    Option4: "('c', 1) and ('a', 3)",
    CorrectOption: 3,
  }),
  mcq({
    title: "What *args Collects",
    description: "Inside def f(*args):, what is args?",
    difficulty: "medium",
    subtopic: "Parameters and Arguments",
    Option1: "A list of the keyword arguments",
    Option2: "A tuple of all extra positional arguments",
    Option3: "A dict of the named parameters",
    Option4: "Only the first positional argument",
    CorrectOption: 2,
  }),
  mcq({
    title: "Shared Default Across Calls",
    description: "What does this snippet print?",
    difficulty: "hard",
    subtopic: "Default Arguments",
    iscodesnippet: true,
    codesnippet: `def track(x, log=[]):
    log.append(x)
    return len(log)

print(track(1) + track(2) + track(3))`,
    snippetLang: "python",
    Option1: "1",
    Option2: "3",
    Option3: "9",
    Option4: "6",
    CorrectOption: 4,
  }),
  mcq({
    title: "Missing Return Yields None",
    description: "What does this snippet print?",
    difficulty: "hard",
    subtopic: "Return Values",
    iscodesnippet: true,
    codesnippet: `def grade(m):
    if m >= 50:
        return "Pass"

print(grade(80), grade(30))`,
    snippetLang: "python",
    Option1: "Pass Fail",
    Option2: "None None",
    Option3: "Pass",
    Option4: "Pass None",
    CorrectOption: 4,
  }),
  mcq({
    title: "Closures from One Factory",
    description: "What does this snippet print?",
    difficulty: "hard",
    subtopic: "Anonymous Functions (lambda)",
    iscodesnippet: true,
    codesnippet: `def make(n):
    return lambda v: v + n

f = make(10)
g = make(20)
print(f(5) + g(5))`,
    snippetLang: "python",
    Option1: "10",
    Option2: "40",
    Option3: "30",
    Option4: "50",
    CorrectOption: 2,
  }),
  mcq({
    title: "Mixing Positional, *args and Keyword",
    description: "What does this snippet print?",
    difficulty: "hard",
    subtopic: "Parameters and Arguments",
    iscodesnippet: true,
    codesnippet: `def demo(a, *args, b=99):
    return a + sum(args) + b

print(demo(1, 2, 3, b=10))`,
    snippetLang: "python",
    Option1: "15",
    Option2: "115",
    Option3: "16",
    Option4: "6",
    CorrectOption: 3,
  }),
];

if (questions.length !== 20) throw new Error(`day 6 code: expected 20, got ${questions.length}`);
if (mcqs.length !== 20) throw new Error(`day 6 mcq: expected 20, got ${mcqs.length}`);

writeFileSync(`${OUT}/day-06.code.json`, JSON.stringify({ day: 6, topics, questions }, null, 2));
writeFileSync(`${OUT}/day-06.mcq.json`, JSON.stringify({ day: 6, questions: mcqs }, null, 2));
console.log(`wrote day 6: ${questions.length} code, ${mcqs.length} mcq`);
