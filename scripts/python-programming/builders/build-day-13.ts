/**
 * Builder for day 13 — "Object-Oriented Programming (OOP)" (20 code + 20 MCQ).
 * Run: bun scripts/python-programming/builders/build-day-13.ts
 */
import { mkdirSync, writeFileSync } from "node:fs";

const DIR = "/home/z/my-project/scripts/python-programming/data";
mkdirSync(DIR, { recursive: true });

const TOPIC_NAME = "Object-Oriented Programming (OOP)";
const SUBTOPICS = [
  "Classes and Objects",
  "Constructors (__init__)",
  "Instance Attributes and Methods",
  "Encapsulation",
  "Access Modifiers and Name Mangling",
];
const SUB = {
  classes: "Classes and Objects",
  init: "Constructors (__init__)",
  attrs: "Instance Attributes and Methods",
  encaps: "Encapsulation",
  access: "Access Modifiers and Name Mangling",
};

type Diff = "easy" | "medium" | "hard";

function cq(o: {
  title: string;
  description: string;
  difficulty: Diff;
  variant: "basic" | "scenario";
  subtopic: string;
  si1: string; so1: string;
  si2: string; so2: string;
  i1: string; o1: string;
  i2: string; o2: string;
  i3: string; o3: string;
  inputconstrains: string;
  blacklist?: string;
  whitelist?: string;
  sourcecode: string;
}) {
  const maxscore = o.difficulty === "easy" ? 10 : o.difficulty === "medium" ? 20 : 30;
  return {
    title: o.title,
    description: o.description,
    difficulty: o.difficulty,
    variant: o.variant,
    maxscore,
    lang: "python",
    topic: TOPIC_NAME,
    subtopic: o.subtopic,
    sampleinput1: o.si1,
    sampleoutput1: o.so1,
    sampleinput2: o.si2,
    sampleoutput2: o.so2,
    input1: o.i1,
    output1: o.o1,
    input2: o.i2,
    output2: o.o2,
    input3: o.i3,
    output3: o.o3,
    inputconstrains: o.inputconstrains,
    blacklist: o.blacklist ?? "",
    whitelist: o.whitelist ?? "",
    sourcecode: o.sourcecode,
  };
}

function mq(o: {
  title: string;
  description: string;
  difficulty: Diff;
  subtopic: string;
  options: [string, string, string, string];
  correct: 1 | 2 | 3 | 4;
  snippet?: string;
}) {
  return {
    title: o.title,
    description: o.description,
    difficulty: o.difficulty,
    topic: TOPIC_NAME,
    subtopic: o.subtopic,
    Option1: o.options[0],
    Option2: o.options[1],
    Option3: o.options[2],
    Option4: o.options[3],
    CorrectOption: o.correct,
    iscodesnippet: o.snippet !== undefined,
    codesnippet: o.snippet ?? null,
    snippetLang: o.snippet !== undefined ? "python" : null,
  };
}

/* ============================ CODE QUESTIONS ============================ */

const questions = [
  // ---------------- easy: basic drills ----------------
  cq({
    title: "Gadget Describe Method Drill",
    description:
      "A robotics shop tags every gadget it stocks with a name and a price.\n" +
      "Write a class Gadget whose constructor stores a name and a price, plus a method describe() that returns the sentence '<name> costs <price>' with the price shown to exactly two decimal places.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: the gadget name (may contain spaces)\n" +
      "Line 2: the price (a number)\n" +
      "\n" +
      "Output Format:\n" +
      "Print the sentence returned by describe().\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= len(name) <= 50 and 0 <= price <= 100000",
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.classes,
    si1: "Smart Watch\n1499.5", so1: "Smart Watch costs 1499.50",
    si2: "Bluetooth Speaker\n2450", so2: "Bluetooth Speaker costs 2450.00",
    i1: "USB Cable\n99.99", o1: "USB Cable costs 99.99",
    i2: "Webcam\n0", o2: "Webcam costs 0.00",
    i3: "HDMI Adapter\n1234.567", o3: "HDMI Adapter costs 1234.57",
    inputconstrains: "1 <= len(name) <= 50, 0 <= price <= 100000",
    sourcecode: String.raw`class Gadget:
    def __init__(self, name, price):
        self.name = name
        self.price = price

    def describe(self):
        return f"{self.name} costs {self.price:.2f}"

name = input()
price = float(input())
g = Gadget(name, price)
print(g.describe())`,
  }),
  cq({
    title: "Counter Increment Method Drill",
    description:
      "Drill: build a Counter class that keeps a numeric value and raises it one step at a time.\n" +
      "The constructor stores the starting value. The method increment() adds 1 to the stored value and returns the new value.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: starting value\n" +
      "Line 2: number of increments n\n" +
      "\n" +
      "Output Format:\n" +
      "Call increment() n times; after each call print the returned value on its own line.\n" +
      "\n" +
      "Constraints:\n" +
      "0 <= start <= 1000 and 1 <= n <= 100",
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.attrs,
    si1: "5\n3", so1: "6\n7\n8",
    si2: "0\n4", so2: "1\n2\n3\n4",
    i1: "10\n1", o1: "11",
    i2: "99\n2", o2: "100\n101",
    i3: "7\n5", o3: "8\n9\n10\n11\n12",
    inputconstrains: "0 <= start <= 1000, 1 <= n <= 100",
    sourcecode: String.raw`class Counter:
    def __init__(self, start):
        self.value = start

    def increment(self):
        self.value += 1
        return self.value

start = int(input())
n = int(input())
c = Counter(start)
for _ in range(n):
    print(c.increment())`,
  }),
  cq({
    title: "Box Volume Method Drill",
    description:
      "Drill: a packaging app needs the volume of a rectangular box.\n" +
      "Write a class Box whose constructor stores length, width and height, and a method volume() that returns length * width * height.\n" +
      "\n" +
      "Input Format:\n" +
      "One line with three space-separated integers: length width height\n" +
      "\n" +
      "Output Format:\n" +
      "Print the value returned by volume().\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= length, width, height <= 1000",
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.classes,
    si1: "2 3 4", so1: "24",
    si2: "5 5 2", so2: "50",
    i1: "1 1 1", o1: "1",
    i2: "10 2 3", o2: "60",
    i3: "7 6 5", o3: "210",
    inputconstrains: "1 <= l, w, h <= 1000",
    sourcecode: String.raw`class Box:
    def __init__(self, length, width, height):
        self.length = length
        self.width = width
        self.height = height

    def volume(self):
        return self.length * self.width * self.height

length, width, height = map(int, input().split())
b = Box(length, width, height)
print(b.volume())`,
  }),
  cq({
    title: "Student Average Marks Method",
    description:
      "Drill: a class register stores a student's marks in a list inside the object.\n" +
      "Write a class Student whose constructor stores the student's name and the list of marks, and a method average() that returns the mean of the marks.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: student name (may contain spaces)\n" +
      "Line 2: number of marks n\n" +
      "Line 3: n space-separated integers\n" +
      "\n" +
      "Output Format:\n" +
      "Print '<name>: <average>' with the average rounded to exactly two decimal places.\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= n <= 50 and 0 <= mark <= 100",
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.init,
    si1: "Asha\n3\n80 90 70", so1: "Asha: 80.00",
    si2: "Ravi\n4\n55 65 60 60", so2: "Ravi: 60.00",
    i1: "Neha\n2\n45 46", o1: "Neha: 45.50",
    i2: "Vikram\n1\n100", o2: "Vikram: 100.00",
    i3: "Iqbal\n5\n10 20 30 40 50", o3: "Iqbal: 30.00",
    inputconstrains: "1 <= n <= 50, 0 <= mark <= 100",
    sourcecode: String.raw`class Student:
    def __init__(self, name, marks):
        self.name = name
        self.marks = marks

    def average(self):
        total = 0
        for m in self.marks:
            total += m
        return total / len(self.marks)

name = input()
n = int(input())
marks = list(map(int, input().split()))
s = Student(name, marks)
print(f"{s.name}: {s.average():.2f}")`,
  }),
  cq({
    title: "Two Laptop Objects Printed",
    description:
      "Drill: create two separate objects from the same class and show that each keeps its own attribute values.\n" +
      "Write a class Laptop whose constructor stores a brand and a ram size. Create two Laptop objects from two input lines and print each object's stored data.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: brand ram of the first laptop (space separated)\n" +
      "Line 2: brand ram of the second laptop (space separated)\n" +
      "\n" +
      "Output Format:\n" +
      "Two lines, one per object in creation order: '<brand> - <ram>GB'\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= len(brand) <= 20 and 2 <= ram <= 512",
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.classes,
    si1: "Dell 16\nHP 8", so1: "Dell - 16GB\nHP - 8GB",
    si2: "Lenovo 32\nAcer 4", so2: "Lenovo - 32GB\nAcer - 4GB",
    i1: "Asus 64\nMSI 16", o1: "Asus - 64GB\nMSI - 16GB",
    i2: "Apple 8\nApple 24", o2: "Apple - 8GB\nApple - 24GB",
    i3: "Fujitsu 12\nSamsung 8", o3: "Fujitsu - 12GB\nSamsung - 8GB",
    inputconstrains: "1 <= len(brand) <= 20, 2 <= ram <= 512",
    sourcecode: String.raw`class Laptop:
    def __init__(self, brand, ram):
        self.brand = brand
        self.ram = ram

brand1, ram1 = input().split()
brand2, ram2 = input().split()
first = Laptop(brand1, int(ram1))
second = Laptop(brand2, int(ram2))
print(f"{first.brand} - {first.ram}GB")
print(f"{second.brand} - {second.ram}GB")`,
  }),
  cq({
    title: "Label Uppercase Brand Method",
    description:
      "Drill: a sticker printer needs brand names shouted in capitals.\n" +
      "Write a class Label whose constructor stores a brand string, and a method shout() that returns the brand converted to uppercase.\n" +
      "\n" +
      "Input Format:\n" +
      "One line: the brand (may contain spaces)\n" +
      "\n" +
      "Output Format:\n" +
      "Print the string returned by shout().\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= len(brand) <= 40",
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.attrs,
    si1: "zara", so1: "ZARA",
    si2: "Puma Sport", so2: "PUMA SPORT",
    i1: "nike", o1: "NIKE",
    i2: "le coq", o2: "LE COQ",
    i3: "abcXYZ", o3: "ABCXYZ",
    inputconstrains: "1 <= len(brand) <= 40",
    sourcecode: String.raw`class Label:
    def __init__(self, brand):
        self.brand = brand

    def shout(self):
        return self.brand.upper()

brand = input()
lab = Label(brand)
print(lab.shout())`,
  }),

  // ---------------- easy: scenarios ----------------
  cq({
    title: "Thermostat Warm Cool Verdict",
    description:
      "A smart-home hub polls the living-room thermostat and must decide what the unit should do next.\n" +
      "Write a class Thermostat whose constructor stores the current temperature and the target temperature, and a method verdict() that returns WARMING when the current temperature is below the target, COOLING when it is above the target, and HOLDING when they are equal.\n" +
      "\n" +
      "Input Format:\n" +
      "One line: current target (two space-separated integers)\n" +
      "\n" +
      "Output Format:\n" +
      "Print the word returned by verdict().\n" +
      "\n" +
      "Constraints:\n" +
      "-10 <= current, target <= 45",
    difficulty: "easy",
    variant: "scenario",
    subtopic: SUB.attrs,
    si1: "18 22", so1: "WARMING",
    si2: "26 21", so2: "COOLING",
    i1: "22 22", o1: "HOLDING",
    i2: "15 30", o2: "WARMING",
    i3: "31 30", o3: "COOLING",
    inputconstrains: "-10 <= current, target <= 45",
    sourcecode: String.raw`class Thermostat:
    def __init__(self, current, target):
        self.current = current
        self.target = target

    def verdict(self):
        if self.current < self.target:
            return "WARMING"
        if self.current > self.target:
            return "COOLING"
        return "HOLDING"

current, target = map(int, input().split())
t = Thermostat(current, target)
print(t.verdict())`,
  }),
  cq({
    title: "Bakery Batch Cost Tracker",
    description:
      "A bakery logs every batch it bakes with the item name, how many pieces were made and the price per piece.\n" +
      "Write a class Batch whose constructor stores the item name, the quantity and the unit price, and a method total_cost() that returns quantity * unit_price.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: item name (may contain spaces)\n" +
      "Line 2: quantity and unit price (space separated, unit price may be fractional)\n" +
      "\n" +
      "Output Format:\n" +
      "Print 'Batch <item>: <total>' with the total to exactly two decimal places.\n" +
      "\n" +
      "Constraints:\n" +
      "0 <= quantity <= 1000 and 0 <= unit_price <= 5000",
    difficulty: "easy",
    variant: "scenario",
    subtopic: SUB.init,
    si1: "Butter Croissant\n120 35.50", so1: "Batch Butter Croissant: 4260.00",
    si2: "Sourdough Loaf\n40 85", so2: "Batch Sourdough Loaf: 3400.00",
    i1: "Blueberry Muffin\n24 45.25", o1: "Batch Blueberry Muffin: 1086.00",
    i2: "Chocolate Eclair\n0 60", o2: "Batch Chocolate Eclair: 0.00",
    i3: "Cinnamon Roll\n15 52.99", o3: "Batch Cinnamon Roll: 794.85",
    inputconstrains: "0 <= quantity <= 1000, 0 <= unit_price <= 5000",
    sourcecode: String.raw`class Batch:
    def __init__(self, item, quantity, unit_price):
        self.item = item
        self.quantity = quantity
        self.unit_price = unit_price

    def total_cost(self):
        return self.quantity * self.unit_price

item = input()
quantity, unit_price = input().split()
b = Batch(item, int(quantity), float(unit_price))
print(f"Batch {b.item}: {b.total_cost():.2f}")`,
  }),
  cq({
    title: "Gym Member Visit Tier",
    description:
      "A fitness club awards a loyalty tier based on how many times a member has checked in this month: 10 or more visits is GOLD, 5 to 9 visits is SILVER, anything less is BRONZE.\n" +
      "Write a class Member whose constructor stores the member's name and starts the visit count at 0, a method check_in() that adds one visit, and a method tier() that returns the member's tier word.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: member name (may contain spaces)\n" +
      "Line 2: number of check-ins n\n" +
      "\n" +
      "Output Format:\n" +
      "Call check_in() n times, then print '<name>: <visits> visits <tier>'.\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= len(name) <= 30 and 0 <= n <= 1000",
    difficulty: "easy",
    variant: "scenario",
    subtopic: SUB.encaps,
    si1: "Kiran\n12", so1: "Kiran: 12 visits GOLD",
    si2: "Meera\n3", so2: "Meera: 3 visits BRONZE",
    i1: "Arjun\n5", o1: "Arjun: 5 visits SILVER",
    i2: "Divya\n10", o2: "Divya: 10 visits GOLD",
    i3: "Farhan\n7", o3: "Farhan: 7 visits SILVER",
    inputconstrains: "1 <= len(name) <= 30, 0 <= n <= 1000",
    sourcecode: String.raw`class Member:
    def __init__(self, name):
        self.name = name
        self.visits = 0

    def check_in(self):
        self.visits += 1

    def tier(self):
        if self.visits >= 10:
            return "GOLD"
        if self.visits >= 5:
            return "SILVER"
        return "BRONZE"

name = input()
n = int(input())
m = Member(name)
for _ in range(n):
    m.check_in()
print(f"{m.name}: {m.visits} visits {m.tier()}")`,
  }),
  cq({
    title: "Robot Move Command Tracker",
    description:
      "A floor-cleaning robot starts at a grid position and executes a list of movement commands: U (up), D (down), L (left), R (right), each followed by a number of steps.\n" +
      "Write a class Robot whose constructor stores the starting x and y, a method move(direction, steps) that updates the position, and a method report() that returns the final position as 'x y'.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: starting x and y (space separated)\n" +
      "Line 2: number of commands n\n" +
      "Next n lines: a command letter and a step count, space separated\n" +
      "\n" +
      "Output Format:\n" +
      "Print the string returned by report() after all commands.\n" +
      "\n" +
      "Constraints:\n" +
      "-100 <= x, y <= 100, 1 <= n <= 50, 1 <= steps <= 100 and every command letter is U, D, L or R",
    difficulty: "easy",
    variant: "scenario",
    subtopic: SUB.classes,
    si1: "0 0\n2\nU 3\nR 4", so1: "4 3",
    si2: "5 5\n1\nL 10", so2: "-5 5",
    i1: "2 -3\n3\nD 2\nL 1\nR 1", o1: "2 -5",
    i2: "0 0\n1\nD 7", o2: "0 -7",
    i3: "10 10\n4\nU 5\nU 5\nR 5\nL 15", o3: "0 20",
    inputconstrains: "-100 <= x, y <= 100, 1 <= n <= 50, 1 <= steps <= 100",
    sourcecode: String.raw`class Robot:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def move(self, direction, steps):
        if direction == "U":
            self.y += steps
        elif direction == "D":
            self.y -= steps
        elif direction == "L":
            self.x -= steps
        elif direction == "R":
            self.x += steps

    def report(self):
        return f"{self.x} {self.y}"

x, y = map(int, input().split())
n = int(input())
r = Robot(x, y)
for _ in range(n):
    parts = input().split()
    r.move(parts[0], int(parts[1]))
print(r.report())`,
  }),

  // ---------------- medium ----------------
  cq({
    title: "Bank Account Operation Ledger",
    description:
      "A bank teller terminal runs a list of operations on one account. Deposits only succeed for positive amounts; withdrawals only succeed when the amount is positive AND the balance covers it, otherwise the terminal prints Insufficient funds for that operation.\n" +
      "Write a class BankAccount whose constructor stores the owner and the starting balance, a method deposit(amount) that ignores non-positive amounts, and a method withdraw(amount) that returns True on success and False otherwise.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: owner and starting balance (space separated)\n" +
      "Line 2: number of operations n\n" +
      "Next n lines: DEPOSIT amount or WITHDRAW amount\n" +
      "\n" +
      "Output Format:\n" +
      "For every failed withdrawal print Insufficient funds (in input order). At the end print 'Final balance: <balance>' with two decimal places.\n" +
      "\n" +
      "Constraints:\n" +
      "owner is one word, 0 <= balance <= 100000, 1 <= n <= 20 and 0 <= amount <= 100000",
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.encaps,
    si1: "Rohit 1000\n3\nDEPOSIT 500\nWITHDRAW 300\nWITHDRAW 5000", so1: "Insufficient funds\nFinal balance: 1200.00",
    si2: "Sana 50\n2\nWITHDRAW 50\nWITHDRAW 1", so2: "Insufficient funds\nFinal balance: 0.00",
    i1: "Amit 200\n4\nDEPOSIT 100\nDEPOSIT 100\nWITHDRAW 400\nWITHDRAW 0", o1: "Insufficient funds\nFinal balance: 0.00",
    i2: "Zoya 0\n3\nDEPOSIT 0\nDEPOSIT 10\nWITHDRAW 10", o2: "Final balance: 0.00",
    i3: "Ibrahim 100\n2\nWITHDRAW 101\nDEPOSIT 999", o3: "Insufficient funds\nFinal balance: 1099.00",
    inputconstrains: "1 <= n <= 20, 0 <= balance, amount <= 100000",
    blacklist: "@property, dataclass",
    whitelist: "class , __init__, self.",
    sourcecode: String.raw`class BankAccount:
    def __init__(self, owner, balance):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        if amount > 0:
            self.balance += amount

    def withdraw(self, amount):
        if amount > 0 and amount <= self.balance:
            self.balance -= amount
            return True
        return False

owner, balance = input().split()
acc = BankAccount(owner, float(balance))
n = int(input())
for _ in range(n):
    op, amount = input().split()
    amount = float(amount)
    if op == "DEPOSIT":
        acc.deposit(amount)
    elif op == "WITHDRAW":
        if not acc.withdraw(amount):
            print("Insufficient funds")
print(f"Final balance: {acc.balance:.2f}")`,
  }),
  cq({
    title: "Employee Payroll Net Salary",
    description:
      "A payroll clerk computes the net salary of employees from a base salary and a performance rating. Rating A earns a 20 percent bonus, rating B earns 10 percent and rating C earns 5 percent.\n" +
      "Write a class Employee whose constructor stores the name, the base salary and the rating, and a method net_salary() that returns base plus the rating-based bonus.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: number of employees n\n" +
      "Next n lines: name base rating (space separated, rating is A, B or C)\n" +
      "\n" +
      "Output Format:\n" +
      "One line per employee in input order: '<name>: <net salary>' with two decimal places.\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= n <= 20, 0 <= base <= 100000, rating is A, B or C and name is one word",
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.encaps,
    si1: "2\nPriya 10000 A\nRahul 8000 B", so1: "Priya: 12000.00\nRahul: 8800.00",
    si2: "1\nSanjay 5000 C", so2: "Sanjay: 5250.00",
    i1: "3\nTara 12000 A\nUmesh 9000 C\nVera 6000 B", o1: "Tara: 14400.00\nUmesh: 9450.00\nVera: 6600.00",
    i2: "1\nWaseem 0 A", o2: "Waseem: 0.00",
    i3: "2\nXena 12345 B\nYash 7777 C", o3: "Xena: 13579.50\nYash: 8165.85",
    inputconstrains: "1 <= n <= 20, 0 <= base <= 100000",
    blacklist: "lambda, @property",
    whitelist: "__init__, def ",
    sourcecode: String.raw`class Employee:
    def __init__(self, name, base, rating):
        self.name = name
        self.base = base
        self.rating = rating

    def net_salary(self):
        bonus_rate = 0.20
        if self.rating == "B":
            bonus_rate = 0.10
        elif self.rating == "C":
            bonus_rate = 0.05
        return self.base + self.base * bonus_rate

n = int(input())
for _ in range(n):
    name, base, rating = input().split()
    e = Employee(name, float(base), rating)
    print(f"{e.name}: {e.net_salary():.2f}")`,
  }),
  cq({
    title: "Two Carts Per Instance Items",
    description:
      "A junior developer wrote a shopping-cart class whose item list was a class attribute, so every customer shared one giant list. Fix the design: each Cart object must create its own empty item list inside its constructor and grow it with append.\n" +
      "Write a class Cart whose constructor initialises a per-instance empty list, a method add_item(price) that appends the price to that list, and a method total() that walks the list with a loop and returns the sum of the prices.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: number of operations n\n" +
      "Next n lines: cart number (1 or 2) and a price, space separated\n" +
      "\n" +
      "Output Format:\n" +
      "Two lines: 'Cart1: <total>' and 'Cart2: <total>', each with two decimal places.\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= n <= 100 and 0 <= price <= 10000",
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.attrs,
    si1: "4\n1 100\n1 50\n2 75\n2 25", so1: "Cart1: 150.00\nCart2: 100.00",
    si2: "2\n1 10\n2 20", so2: "Cart1: 10.00\nCart2: 20.00",
    i1: "5\n2 5.5\n2 4.5\n1 3\n2 1\n1 2", o1: "Cart1: 5.00\nCart2: 11.00",
    i2: "3\n1 0\n2 0\n2 0", o2: "Cart1: 0.00\nCart2: 0.00",
    i3: "6\n1 12.34\n2 56.78\n1 1.11\n2 2.22\n1 100\n2 200", o3: "Cart1: 113.45\nCart2: 259.00",
    inputconstrains: "1 <= n <= 100, 0 <= price <= 10000",
    blacklist: "Counter(, sum(",
    whitelist: "class , .append(",
    sourcecode: String.raw`class Cart:
    def __init__(self):
        self.items = []

    def add_item(self, price):
        self.items.append(price)

    def total(self):
        t = 0.0
        for p in self.items:
            t += p
        return t

n = int(input())
cart1 = Cart()
cart2 = Cart()
for _ in range(n):
    which, price = input().split()
    price = float(price)
    if which == "1":
        cart1.add_item(price)
    else:
        cart2.add_item(price)
print(f"Cart1: {cart1.total():.2f}")
print(f"Cart2: {cart2.total():.2f}")`,
  }),
  cq({
    title: "Climate Unit Private Celsius",
    description:
      "An IoT climate controller keeps its celsius reading as a private attribute so no code can touch it directly. A telemetry exporter, however, is allowed to read the raw value through the mangled attribute name _ClimateUnit__celsius.\n" +
      "Write a class ClimateUnit whose constructor stores the reading in a private attribute, a method adjust(delta) that shifts the reading, and a method fahrenheit() that returns celsius * 9 / 5 + 32.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: initial celsius reading (may be fractional)\n" +
      "Line 2: number of adjustments n\n" +
      "Next n lines: one delta value each (may be negative or fractional)\n" +
      "\n" +
      "Output Format:\n" +
      "Line 1: 'Fahrenheit: <value>' with two decimal places.\n" +
      "Line 2: 'Internal celsius: <value>' read through the mangled name _ClimateUnit__celsius, with two decimal places.\n" +
      "\n" +
      "Constraints:\n" +
      "-50 <= celsius <= 150, 0 <= n <= 20 and -20 <= delta <= 20",
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.access,
    si1: "25\n1\n5", so1: "Fahrenheit: 86.00\nInternal celsius: 30.00",
    si2: "0\n2\n-5\n5", so2: "Fahrenheit: 32.00\nInternal celsius: 0.00",
    i1: "-40\n0", o1: "Fahrenheit: -40.00\nInternal celsius: -40.00",
    i2: "36.6\n1\n0.4", o2: "Fahrenheit: 98.60\nInternal celsius: 37.00",
    i3: "100\n2\n-10.5\n-9.5", o3: "Fahrenheit: 176.00\nInternal celsius: 80.00",
    inputconstrains: "-50 <= celsius <= 150, 0 <= n <= 20, -20 <= delta <= 20",
    blacklist: "@property, dataclass",
    whitelist: "class , __celsius",
    sourcecode: String.raw`class ClimateUnit:
    def __init__(self, celsius):
        self.__celsius = celsius

    def adjust(self, delta):
        self.__celsius += delta

    def fahrenheit(self):
        return self.__celsius * 9 / 5 + 32

celsius = float(input())
unit = ClimateUnit(celsius)
n = int(input())
for _ in range(n):
    unit.adjust(float(input()))
print(f"Fahrenheit: {unit.fahrenheit():.2f}")
print(f"Internal celsius: {unit._ClimateUnit__celsius:.2f}")`,
  }),
  cq({
    title: "Vehicle Fleet Wheel Overrides",
    description:
      "A fleet registry records vehicles. Every vehicle shares the class-wide default of 4 wheels, but models that differ (trucks, auto rickshaws) override the value on their own object. The class default itself must stay 4 for every vehicle.\n" +
      "Write a class Vehicle with a class attribute wheels set to 4 and a constructor that stores the vehicle name, plus a method customise(count) that sets an instance attribute overriding the wheel count for that object only.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: number of vehicles n\n" +
      "Next n lines: vehicle name and wheel count, space separated\n" +
      "\n" +
      "Output Format:\n" +
      "One line per vehicle in input order: '<name>: <wheels> wheels' — call customise() only when the given count is not 4.\n" +
      "Finally print 'Default wheels: <Vehicle.wheels>' to prove the class attribute is unchanged.\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= n <= 10, name is one word and 2 <= wheels <= 18",
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.classes,
    si1: "3\nSedan 4\nTruck 6\nAuto 3", so1: "Sedan: 4 wheels\nTruck: 6 wheels\nAuto: 3 wheels\nDefault wheels: 4",
    si2: "2\nBike 2\nJeep 4", so2: "Bike: 2 wheels\nJeep: 4 wheels\nDefault wheels: 4",
    i1: "1\nBus 4", o1: "Bus: 4 wheels\nDefault wheels: 4",
    i2: "4\nCar1 4\nCar2 4\nTruck2 8\nTrike 3", o2: "Car1: 4 wheels\nCar2: 4 wheels\nTruck2: 8 wheels\nTrike: 3 wheels\nDefault wheels: 4",
    i3: "2\nRickshaw 3\nTrailer 12", o3: "Rickshaw: 3 wheels\nTrailer: 12 wheels\nDefault wheels: 4",
    inputconstrains: "1 <= n <= 10, 2 <= wheels <= 18",
    blacklist: "@property, setattr(",
    whitelist: "class , Vehicle.wheels",
    sourcecode: String.raw`class Vehicle:
    wheels = 4

    def __init__(self, name):
        self.name = name

    def customise(self, count):
        self.wheels = count

n = int(input())
for _ in range(n):
    name, count = input().split()
    count = int(count)
    v = Vehicle(name)
    if count != Vehicle.wheels:
        v.customise(count)
    print(f"{v.name}: {v.wheels} wheels")
print(f"Default wheels: {Vehicle.wheels}")`,
  }),
  cq({
    title: "Parking Pass Hourly Fee Tiers",
    description:
      "A mall parking pass stores the number of hours a car stayed as a private attribute. The fee: a flat 40 rupees covers any stay of up to 2 hours (even a 0-hour cancelled booking pays the flat charge), each hour beyond 2 costs 25 more, and the fee never exceeds the 200 rupee daily cap.\n" +
      "Write a class ParkingPass whose constructor stores the hours privately, and a method fee() that returns the fee computed with plain arithmetic (no min or ceil helpers).\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: number of passes n\n" +
      "Next n lines: one integer hours value each\n" +
      "\n" +
      "Output Format:\n" +
      "One line per pass in input order: 'Fee for <hours>h: <fee>' with two decimal places.\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= n <= 20 and 0 <= hours <= 48",
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.access,
    si1: "4\n1\n3\n5\n9", so1: "Fee for 1h: 40.00\nFee for 3h: 65.00\nFee for 5h: 115.00\nFee for 9h: 200.00",
    si2: "1\n2", so2: "Fee for 2h: 40.00",
    i1: "2\n0\n25", o1: "Fee for 0h: 40.00\nFee for 25h: 200.00",
    i2: "1\n8", o2: "Fee for 8h: 190.00",
    i3: "4\n2\n3\n7\n6", o3: "Fee for 2h: 40.00\nFee for 3h: 65.00\nFee for 7h: 165.00\nFee for 6h: 140.00",
    inputconstrains: "1 <= n <= 20, 0 <= hours <= 48",
    blacklist: "min(, ceil(",
    whitelist: "class , __init__, __hours",
    sourcecode: String.raw`class ParkingPass:
    def __init__(self, hours):
        self.__hours = hours

    def fee(self):
        charge = 40.0
        if self.__hours > 2:
            charge = 40 + (self.__hours - 2) * 25
        if charge > 200:
            charge = 200
        return charge

n = int(input())
for _ in range(n):
    hours = int(input())
    p = ParkingPass(hours)
    print(f"Fee for {hours}h: {p.fee():.2f}")`,
  }),

  // ---------------- hard ----------------
  cq({
    title: "Warehouse Stock Value Report",
    description:
      "A warehouse keeps two kinds of stock records. A stable item is worth quantity * unit_price. A perishable item is worth quantity * unit_price discounted by 10 percent (multiply by 0.9) because of spoilage risk. The end-of-day report lists every record sorted by stock value from highest to lowest; records with equal value are listed alphabetically by name.\n" +
      "Write two separate classes. class Item stores name, qty and unit_price with methods value() (qty * unit_price) and tag() returning STABLE. class PerishableItem stores name, qty, unit_price and shelf_days with methods value() (qty * unit_price * 0.9) and tag() returning PERISHABLE.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: number of records n\n" +
      "Next n lines: either 'S name qty price' for a stable item or 'P name qty price shelf_days' for a perishable item (name is one word)\n" +
      "\n" +
      "Output Format:\n" +
      "One line per record, sorted as described: '<name> <value> <tag>' with the value to two decimal places.\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= n <= 100, 0 <= qty <= 10000, 0 <= price <= 100000 and 1 <= shelf_days <= 365",
    difficulty: "hard",
    variant: "scenario",
    subtopic: SUB.classes,
    si1: "3\nS Rice 100 40\nP Milk 50 30 5\nS Desk 2 1500", so1: "Rice 4000.00 STABLE\nDesk 3000.00 STABLE\nMilk 1350.00 PERISHABLE",
    si2: "2\nP Yogurt 10 12 3\nS Pen 100 5", so2: "Pen 500.00 STABLE\nYogurt 108.00 PERISHABLE",
    i1: "4\nP Paneer 8 90 10\nS Bolt 500 2\nP Juice 24 35 7\nS Chair 5 800", o1: "Chair 4000.00 STABLE\nBolt 1000.00 STABLE\nJuice 756.00 PERISHABLE\nPaneer 648.00 PERISHABLE",
    i2: "3\nS Chip 0 500\nP Cake 5 100 2\nS Rug 1 1200", o2: "Rug 1200.00 STABLE\nCake 450.00 PERISHABLE\nChip 0.00 STABLE",
    i3: "2\nP Icecream 3 250 5\nS Fan 3 900", o3: "Fan 2700.00 STABLE\nIcecream 675.00 PERISHABLE",
    inputconstrains: "1 <= n <= 100, 0 <= qty <= 10000, 0 <= price <= 100000",
    blacklist: "dataclass, @property",
    whitelist: "class , def ",
    sourcecode: String.raw`class Item:
    def __init__(self, name, qty, unit_price):
        self.name = name
        self.qty = qty
        self.unit_price = unit_price

    def value(self):
        return self.qty * self.unit_price

    def tag(self):
        return "STABLE"

class PerishableItem:
    def __init__(self, name, qty, unit_price, shelf_days):
        self.name = name
        self.qty = qty
        self.unit_price = unit_price
        self.shelf_days = shelf_days

    def value(self):
        return self.qty * self.unit_price * 0.9

    def tag(self):
        return "PERISHABLE"

n = int(input())
records = []
for _ in range(n):
    parts = input().split()
    kind = parts[0]
    if kind == "S":
        it = Item(parts[1], int(parts[2]), float(parts[3]))
    else:
        it = PerishableItem(parts[1], int(parts[2]), float(parts[3]), int(parts[4]))
    records.append(it)

records.sort(key=lambda r: (-r.value(), r.name))
for r in records:
    print(f"{r.name} {r.value():.2f} {r.tag()}")`,
  }),
  cq({
    title: "Library Card Pin Verify Audit",
    description:
      "A library kiosk issues cards whose 4-digit PIN is stored as a private attribute. Holders verify PIN attempts through a method, and the day-end audit tool reads the stored PIN through the mangled attribute name _LibraryCard__pin.\n" +
      "Write a class LibraryCard whose constructor stores the card id and the PIN in a private attribute, and a method verify(attempt) that returns True when the attempt equals the stored PIN.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: card id and PIN (space separated)\n" +
      "Line 2: number of attempts n\n" +
      "Next n lines: one PIN attempt each\n" +
      "\n" +
      "Output Format:\n" +
      "For each attempt print ACCESS GRANTED or ACCESS DENIED, in input order.\n" +
      "Finally print 'Stored PIN: <pin>' obtained through the mangled name _LibraryCard__pin.\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= n <= 50 and 1000 <= PIN, attempt <= 9999",
    difficulty: "hard",
    variant: "scenario",
    subtopic: SUB.access,
    si1: "C101 4321\n3\n1111\n4321\n9999", so1: "ACCESS DENIED\nACCESS GRANTED\nACCESS DENIED\nStored PIN: 4321",
    si2: "C202 1234\n2\n1234\n1235", so2: "ACCESS GRANTED\nACCESS DENIED\nStored PIN: 1234",
    i1: "C303 9876\n4\n9876\n9877\n9875\n9876", o1: "ACCESS GRANTED\nACCESS DENIED\nACCESS DENIED\nACCESS GRANTED\nStored PIN: 9876",
    i2: "C404 1111\n1\n1111", o2: "ACCESS GRANTED\nStored PIN: 1111",
    i3: "C505 2468\n3\n1357\n2468\n8642", o3: "ACCESS DENIED\nACCESS GRANTED\nACCESS DENIED\nStored PIN: 2468",
    inputconstrains: "1 <= n <= 50, 1000 <= pin <= 9999",
    blacklist: "@property, setattr(",
    whitelist: "class , _LibraryCard__pin",
    sourcecode: String.raw`class LibraryCard:
    def __init__(self, card_id, pin):
        self.card_id = card_id
        self.__pin = pin

    def verify(self, attempt):
        return attempt == self.__pin

card_id, pin = input().split()
card = LibraryCard(card_id, int(pin))
n = int(input())
for _ in range(n):
    attempt = int(input())
    if card.verify(attempt):
        print("ACCESS GRANTED")
    else:
        print("ACCESS DENIED")
print(f"Stored PIN: {card._LibraryCard__pin}")`,
  }),
  cq({
    title: "Drone Fleet Telemetry Aggregator",
    description:
      "A drone control station aggregates telemetry for a fleet. Each drone has an id, a battery level and a drain (percent consumed per kilometre). Flying a distance d leaves a drone with battery - d * drain, never below 0. The station reports every drone's remaining battery for a planned distance and flags the best drone — the one with the highest remaining battery; ties go to the drone that appears first in the input.\n" +
      "Write a class Drone whose constructor stores id, battery and drain, with a method estimate(distance) returning the clamped remaining battery. Write a class Fleet that keeps a list of drones (built with append), with a method best(distance) that scans the drones with a loop (no max or min helpers) and returns the best id.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: number of drones n\n" +
      "Next n lines: id battery drain (space separated)\n" +
      "Last line: planned distance d\n" +
      "\n" +
      "Output Format:\n" +
      "One line per drone in input order: '<id> <remaining>'.\n" +
      "Then 'BEST <id>'.\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= n <= 100, 0 <= battery <= 100, 1 <= drain <= 20 and 0 <= d <= 500",
    difficulty: "hard",
    variant: "scenario",
    subtopic: SUB.attrs,
    si1: "3\nD1 80 2\nD2 100 4\nD3 50 1\n10", so1: "D1 60\nD2 60\nD3 40\nBEST D1",
    si2: "2\nA9 100 10\nB7 90 3\n15", so2: "A9 0\nB7 45\nBEST B7",
    i1: "1\nX1 5 5\n1", o1: "X1 0\nBEST X1",
    i2: "4\nH1 60 3\nH2 60 3\nH3 60 4\nH4 70 5\n5", o2: "H1 45\nH2 45\nH3 40\nH4 45\nBEST H1",
    i3: "3\nP1 100 2\nP2 100 2\nP3 100 2\n50", o3: "P1 0\nP2 0\nP3 0\nBEST P1",
    inputconstrains: "1 <= n <= 100, 0 <= battery <= 100, 1 <= drain <= 20, 0 <= d <= 500",
    blacklist: "max(, min(, lambda",
    whitelist: "__init__, def ",
    sourcecode: String.raw`class Drone:
    def __init__(self, drone_id, battery, drain):
        self.drone_id = drone_id
        self.battery = battery
        self.drain = drain

    def estimate(self, distance):
        remaining = self.battery - distance * self.drain
        if remaining < 0:
            remaining = 0
        return remaining

class Fleet:
    def __init__(self):
        self.drones = []

    def add(self, drone):
        self.drones.append(drone)

    def best(self, distance):
        best_id = self.drones[0].drone_id
        best_val = self.drones[0].estimate(distance)
        for d in self.drones[1:]:
            val = d.estimate(distance)
            if val > best_val:
                best_val = val
                best_id = d.drone_id
        return best_id

n = int(input())
fleet = Fleet()
for _ in range(n):
    drone_id, battery, drain = input().split()
    fleet.add(Drone(drone_id, int(battery), int(drain)))
distance = int(input())
for d in fleet.drones:
    print(f"{d.drone_id} {d.estimate(distance)}")
print(f"BEST {fleet.best(distance)}")`,
  }),
  cq({
    title: "Hall Seat Counter Assignment",
    description:
      "An exam control room assigns hall seat numbers from one class-level counter, so every seat created anywhere shares a single sequence starting at 1. The hall has a capacity; applicants who arrive after the hall is full are rejected.\n" +
      "Write a class ExamSeat with a class attribute next_number set to 1. Its constructor stores the student name, takes the current counter value as the seat number, and then advances the shared counter by 1. Write a class Hall whose constructor stores the capacity and an empty seat list; its method seat(student) creates an ExamSeat while the hall is below capacity and returns '<student>: seat <number>', otherwise returns '<student>: HALL FULL'.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: capacity and number of applicants n (space separated)\n" +
      "Next n lines: one student name each\n" +
      "\n" +
      "Output Format:\n" +
      "One line per applicant in arrival order.\n" +
      "Then 'Assigned: <count>' and 'Next seat: <ExamSeat.next_number>'.\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= capacity <= 100, 1 <= n <= 200 and 1 <= len(name) <= 20",
    difficulty: "hard",
    variant: "scenario",
    subtopic: SUB.init,
    si1: "3 5\nAsha\nBala\nChetan\nDivya\nEsha", so1: "Asha: seat 1\nBala: seat 2\nChetan: seat 3\nDivya: HALL FULL\nEsha: HALL FULL\nAssigned: 3\nNext seat: 4",
    si2: "2 2\nRavi\nTeena", so2: "Ravi: seat 1\nTeena: seat 2\nAssigned: 2\nNext seat: 3",
    i1: "1 3\nOm\nRam\nShyam", o1: "Om: seat 1\nRam: HALL FULL\nShyam: HALL FULL\nAssigned: 1\nNext seat: 2",
    i2: "5 1\nGita", o2: "Gita: seat 1\nAssigned: 1\nNext seat: 2",
    i3: "4 6\nP1\nQ2\nR3\nS4\nT5\nU6", o3: "P1: seat 1\nQ2: seat 2\nR3: seat 3\nS4: seat 4\nT5: HALL FULL\nU6: HALL FULL\nAssigned: 4\nNext seat: 5",
    inputconstrains: "1 <= capacity <= 100, 1 <= n <= 200",
    blacklist: "enumerate(, lambda",
    whitelist: "class , __init__",
    sourcecode: String.raw`class ExamSeat:
    next_number = 1

    def __init__(self, student):
        self.student = student
        self.seat_no = ExamSeat.next_number
        ExamSeat.next_number += 1

class Hall:
    def __init__(self, capacity):
        self.capacity = capacity
        self.seats = []

    def seat(self, student):
        if len(self.seats) < self.capacity:
            s = ExamSeat(student)
            self.seats.append(s)
            return f"{student}: seat {s.seat_no}"
        return f"{student}: HALL FULL"

capacity, n = input().split()
hall = Hall(int(capacity))
n = int(n)
for _ in range(n):
    name = input()
    print(hall.seat(name))
print(f"Assigned: {len(hall.seats)}")
print(f"Next seat: {ExamSeat.next_number}")`,
  }),
];

/* ============================ MCQ QUESTIONS ============================ */

const mcqs = [
  mq({
    title: "What a Class Really Is",
    description: "In Python, what is a class?",
    difficulty: "easy",
    subtopic: SUB.classes,
    options: [
      "A blueprint that defines the attributes and methods shared by all its objects",
      "A container that can only store numbers",
      "A function that always returns a new object",
      "A special kind of import statement",
    ],
    correct: 1,
  }),
  mq({
    title: "When __init__ Executes",
    description: "When does a class's __init__ method run?",
    difficulty: "easy",
    subtopic: SUB.init,
    options: [
      "Automatically, once, immediately after an object is created",
      "Every time any method of the class is called",
      "Only when explicitly called at the bottom of the file",
      "When the module containing it is imported",
    ],
    correct: 1,
  }),
  mq({
    title: "What self Refers To",
    description: "Inside an instance method, what does the parameter self refer to?",
    difficulty: "easy",
    subtopic: SUB.attrs,
    options: [
      "The particular object the method was called on",
      "The class itself",
      "The parent class of the current class",
      "A reserved global variable holding all objects",
    ],
    correct: 1,
  }),
  mq({
    title: "Correct Object Creation Syntax",
    description: "Which statement correctly creates an object from a class named Gadget?",
    difficulty: "easy",
    subtopic: SUB.classes,
    options: [
      "g = Gadget()",
      "g = new Gadget()",
      "g = Gadget.object()",
      "g = construct Gadget",
    ],
    correct: 1,
  }),
  mq({
    title: "Instance Attribute Ownership",
    description: "Where do instance attributes created with self.name = value inside a method live, and who sees them?",
    difficulty: "easy",
    subtopic: SUB.attrs,
    options: [
      "On the individual object; each object has its own separate copy",
      "On the class; changing one object's copy changes them everywhere",
      "As global variables shared by the whole program",
      "Only inside the method that created them, vanishing when it returns",
    ],
    correct: 1,
  }),
  mq({
    title: "Calling an Instance Method",
    description: "Object g belongs to class Gadget which defines the method describe(self). Which call is correct?",
    difficulty: "easy",
    subtopic: SUB.attrs,
    options: [
      "g.describe()",
      "describe(g)",
      "Gadget.describe()",
      "g->describe()",
    ],
    correct: 1,
  }),
  mq({
    title: "Encapsulation Meaning",
    description: "What does encapsulation mean in object-oriented programming?",
    difficulty: "easy",
    subtopic: SUB.encaps,
    options: [
      "Bundling data with the methods that operate on it, while restricting direct access to internal state",
      "Putting all program code inside one file",
      "Inheriting methods from a parent class",
      "Converting every attribute to a string before printing",
    ],
    correct: 1,
  }),
  mq({
    title: "Single Underscore Convention",
    description: "An attribute written as self._balance with a single leading underscore means:",
    difficulty: "easy",
    subtopic: SUB.access,
    options: [
      "A convention hinting the attribute is internal; Python still allows access",
      "Python blocks every external access to it",
      "Python renames it to _ClassName_balance",
      "It automatically becomes a read-only property",
    ],
    correct: 1,
  }),
  mq({
    title: "First Parameter of Instance Methods",
    description: "By convention, what is the first parameter of every regular instance method?",
    difficulty: "easy",
    subtopic: SUB.attrs,
    options: ["self", "cls", "this", "object"],
    correct: 1,
  }),
  mq({
    title: "Separate Balances Per Object",
    description:
      "b1 = BankAccount(100) and b2 = BankAccount(500) create two accounts. After calling b1.deposit(50), what is b2.balance?",
    difficulty: "easy",
    subtopic: SUB.classes,
    options: [
      "500, because each instance keeps its own state",
      "550, because deposit() changes a balance shared by all accounts",
      "100, because b2 was created first",
      "None, because b2 is unaffected objects",
    ],
    correct: 1,
  }),
  mq({
    title: "Shared Squad List Output",
    description: "This snippet builds two Squad objects and adds one member to each. What does it print?",
    difficulty: "medium",
    subtopic: SUB.classes,
    options: [
      "['Riya', 'Om']\n['Riya', 'Om']",
      "['Riya']\n['Om']",
      "['Riya', 'Om']\n['Om']",
      "TypeError is raised",
    ],
    correct: 1,
    snippet: `class Squad:
    members = []

    def add(self, name):
        self.members.append(name)

a = Squad()
b = Squad()
a.add("Riya")
b.add("Om")
print(a.members)
print(b.members)`,
  }),
  mq({
    title: "__init__ Return Value Rule",
    description: "What happens when this snippet runs?",
    difficulty: "medium",
    subtopic: SUB.init,
    options: [
      "TypeError: __init__() should return None, not 'int'",
      "It prints 100",
      "It prints None",
      "NameError: name 'Bonus' is not defined",
    ],
    correct: 1,
    snippet: `class Bonus:
    def __init__(self, amount):
        self.amount = amount
        return amount

b = Bonus(100)
print(b.amount)`,
  }),
  mq({
    title: "Private Attribute Access Error",
    description: "A Card stores its PIN in the private attribute __pin. What is the result of line 5?",
    difficulty: "medium",
    subtopic: SUB.access,
    options: [
      "AttributeError: 'Card' object has no attribute '__pin'",
      "It prints 2468",
      "It prints None",
      "It prints _Card__pin",
    ],
    correct: 1,
    snippet: `class Card:
    def __init__(self):
        self.__pin = "2468"

c = Card()
print(c.__pin)`,
  }),
  mq({
    title: "Instance Shadow Class Attribute",
    description: "Two Drone objects share the class attribute battery. What does the snippet print?",
    difficulty: "medium",
    subtopic: SUB.classes,
    options: [
      "80\n100",
      "80\n80",
      "100\n100",
      "100\n80",
    ],
    correct: 1,
    snippet: `class Drone:
    battery = 100

d1 = Drone()
d2 = Drone()
d1.battery = 80
print(d1.battery)
print(d2.battery)`,
  }),
  mq({
    title: "Two Wallets Independent Output",
    description: "What does this snippet print?",
    difficulty: "medium",
    subtopic: SUB.attrs,
    options: [
      "60\n70",
      "70\n70",
      "60\n60",
      "50\n70",
    ],
    correct: 1,
    snippet: `class Wallet:
    def __init__(self, cash):
        self.cash = cash

w1 = Wallet(50)
w2 = Wallet(70)
w1.cash += 10
print(w1.cash)
print(w2.cash)`,
  }),
  mq({
    title: "Method Without Return Output",
    description: "The calc method computes a total but never returns or prints it. What does the snippet print?",
    difficulty: "medium",
    subtopic: SUB.attrs,
    options: [
      "None",
      "7",
      "0",
      "TypeError is raised",
    ],
    correct: 1,
    snippet: `class Account:
    def __init__(self, a, b):
        self.a = a
        self.b = b

    def calc(self):
        total = self.a + self.b

acc = Account(3, 4)
print(acc.calc())`,
  }),
  mq({
    title: "Shared Queue Across Instances",
    description: "Queue keeps items as a class attribute. Two Queue objects push values as shown. What does the snippet print?",
    difficulty: "hard",
    subtopic: SUB.classes,
    options: [
      "3\n3",
      "2\n3",
      "2\n1",
      "3\n1",
    ],
    correct: 1,
    snippet: `class Queue:
    items = []

    def __init__(self, label):
        self.label = label

    def push(self, x):
        self.items.append(x)

p = Queue("P")
q = Queue("Q")
p.push(1)
p.push(2)
q.push(3)
print(len(p.items))
print(q.items[-1])`,
  }),
  mq({
    title: "Mangled Code From Subclass",
    description: "A Safe inherits Vault but overrides reveal. What does the snippet print?",
    difficulty: "hard",
    subtopic: SUB.access,
    options: [
      "777\nlocked\n777",
      "777\nlocked\nlocked",
      "777\n777\n777",
      "AttributeError is raised",
    ],
    correct: 1,
    snippet: `class Vault:
    def __init__(self):
        self.__code = "777"

    def reveal(self):
        return self.__code

class Safe(Vault):
    def reveal(self):
        return "locked"

s = Safe()
v = Vault()
print(v.reveal())
print(s.reveal())
print(s._Vault__code)`,
  }),
  mq({
    title: "Class Attribute Rebinding Effect",
    description: "c1 gets an instance attribute, then the class attribute is rebound. What does the snippet print?",
    difficulty: "hard",
    subtopic: SUB.classes,
    options: [
      "night\neco",
      "night\nnight",
      "eco\neco",
      "day\neco",
    ],
    correct: 1,
    snippet: `class Config:
    mode = "day"

c1 = Config()
c2 = Config()
c1.mode = "night"
Config.mode = "eco"
print(c1.mode)
print(c2.mode)`,
  }),
  mq({
    title: "__str__ Print Output",
    description: "Point defines __str__. What does the snippet print?",
    difficulty: "hard",
    subtopic: SUB.classes,
    options: [
      "Point(2, 5)\nTrue",
      "Point(2, 5)\nFalse",
      "<__main__.Point object>\nTrue",
      "Point(2, 5)\nPoint(2, 5)",
    ],
    correct: 1,
    snippet: `class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        return f"Point({self.x}, {self.y})"

p = Point(2, 5)
print(p)
print(str(p) == "Point(2, 5)")`,
  }),
];

/* ================================ WRITE ================================ */

writeFileSync(
  `${DIR}/day-13.code.json`,
  JSON.stringify({ day: 13, topics: [{ name: TOPIC_NAME, subtopics: SUBTOPICS }], questions }, null, 2)
);
writeFileSync(
  `${DIR}/day-13.mcq.json`,
  JSON.stringify({ day: 13, questions: mcqs }, null, 2)
);
console.log("wrote day 13:", questions.length, "code,", mcqs.length, "mcq");
