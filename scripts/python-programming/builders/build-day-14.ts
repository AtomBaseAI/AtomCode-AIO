/**
 * Builder for day 14 — "Inheritance" (20 code + 20 MCQ).
 * Run: bun scripts/python-programming/builders/build-day-14.ts
 */
import { mkdirSync, writeFileSync } from "node:fs";

const DIR = "/home/z/my-project/scripts/python-programming/data";
mkdirSync(DIR, { recursive: true });

const TOPIC_NAME = "Inheritance";
const SUBTOPICS = [
  "Single Inheritance",
  "Multilevel Inheritance",
  "Multiple Inheritance",
  "Hierarchical Inheritance",
  "Method Resolution Order (MRO)",
];
const SUB = {
  single: "Single Inheritance",
  multi: "Multilevel Inheritance",
  multiple: "Multiple Inheritance",
  hier: "Hierarchical Inheritance",
  mro: "Method Resolution Order (MRO)",
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
    title: "Animal Dog Speak Override",
    description:
      "Drill: single inheritance with an overridden method.\n" +
      "Write class Animal with a method speak() that returns 'Some generic sound'. Write class Dog(Animal) whose constructor stores a sound word and whose speak() method returns that word, overriding the parent version.\n" +
      "\n" +
      "Input Format:\n" +
      "One line: the dog's sound (may contain spaces)\n" +
      "\n" +
      "Output Format:\n" +
      "Line 1: result of Animal().speak()\n" +
      "Line 2: result of Dog(sound).speak()\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= len(sound) <= 20",
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.single,
    si1: "Woof", so1: "Some generic sound\nWoof",
    si2: "Bhow Bhow", so2: "Some generic sound\nBhow Bhow",
    i1: "Bark", o1: "Some generic sound\nBark",
    i2: "Bow Wow", o2: "Some generic sound\nBow Wow",
    i3: "Woof Woof", o3: "Some generic sound\nWoof Woof",
    inputconstrains: "1 <= len(sound) <= 20",
    sourcecode: String.raw`class Animal:
    def speak(self):
        return "Some generic sound"

class Dog(Animal):
    def __init__(self, sound):
        self.sound = sound

    def speak(self):
        return self.sound

sound = input()
a = Animal()
d = Dog(sound)
print(a.speak())
print(d.speak())`,
  }),
  cq({
    title: "Phone Inherits Device Brand",
    description:
      "Drill: a child object inherits attributes initialised by the parent constructor.\n" +
      "Write class Device whose constructor stores a brand. Write class Phone(Device) whose constructor receives brand and model, passes brand up to the parent constructor, and stores model itself.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: brand (may contain spaces)\n" +
      "Line 2: model (may contain spaces)\n" +
      "\n" +
      "Output Format:\n" +
      "Line 1: 'Brand: <brand>' (attribute inherited from Device)\n" +
      "Line 2: 'Model: <model>' (attribute owned by Phone)\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= len(brand), len(model) <= 30",
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.single,
    si1: "NovaTech\nX12 Pro", so1: "Brand: NovaTech\nModel: X12 Pro",
    si2: "PixelWorks\nA50", so2: "Brand: PixelWorks\nModel: A50",
    i1: "Orbit\nSlim 5", o1: "Brand: Orbit\nModel: Slim 5",
    i2: "Zenith\nMax Ultra", o2: "Brand: Zenith\nModel: Max Ultra",
    i3: "Bluefin\nMini", o3: "Brand: Bluefin\nModel: Mini",
    inputconstrains: "1 <= len(brand), len(model) <= 30",
    sourcecode: String.raw`class Device:
    def __init__(self, brand):
        self.brand = brand

class Phone(Device):
    def __init__(self, brand, model):
        super().__init__(brand)
        self.model = model

brand = input()
model = input()
p = Phone(brand, model)
print(f"Brand: {p.brand}")
print(f"Model: {p.model}")`,
  }),
  cq({
    title: "Team Banner Grandparent Method",
    description:
      "Drill: multilevel inheritance chain Organization -> Department -> Team. The Team object calls a method defined on its grandparent class, using an attribute set two levels up.\n" +
      "class Organization stores a name. class Department(Organization) adds nothing. class Team(Department) defines banner() returning 'Team belongs to <name>'.\n" +
      "\n" +
      "Input Format:\n" +
      "One line: the organization name (may contain spaces)\n" +
      "\n" +
      "Output Format:\n" +
      "Print the string returned by Team(name).banner().\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= len(name) <= 40",
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.multi,
    si1: "Apollo Labs", so1: "Team belongs to Apollo Labs",
    si2: "Zen Corp", so2: "Team belongs to Zen Corp",
    i1: "Nimbus Group", o1: "Team belongs to Nimbus Group",
    i2: "Vertex", o2: "Team belongs to Vertex",
    i3: "Blue Orbit", o3: "Team belongs to Blue Orbit",
    inputconstrains: "1 <= len(name) <= 40",
    sourcecode: String.raw`class Organization:
    def __init__(self, name):
        self.name = name

class Department(Organization):
    pass

class Team(Department):
    def banner(self):
        return f"Team belongs to {self.name}"

name = input()
t = Team(name)
print(t.banner())`,
  }),
  cq({
    title: "Parrot Penguin Same Parent",
    description:
      "Drill: hierarchical inheritance — two child classes of one parent, each with its own method.\n" +
      "class Bird stores a name. class Parrot(Bird) defines move() returning '<name> flies high'. class Penguin(Bird) defines move() returning '<name> swims deep'.\n" +
      "\n" +
      "Input Format:\n" +
      "One line: the bird's name (may contain spaces)\n" +
      "\n" +
      "Output Format:\n" +
      "Line 1: Parrot(name).move()\n" +
      "Line 2: Penguin(name).move()\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= len(name) <= 20",
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.hier,
    si1: "Rio", so1: "Rio flies high\nRio swims deep",
    si2: "Pip", so2: "Pip flies high\nPip swims deep",
    i1: "Sky", o1: "Sky flies high\nSky swims deep",
    i2: "Waddle", o2: "Waddle flies high\nWaddle swims deep",
    i3: "Kiwi", o3: "Kiwi flies high\nKiwi swims deep",
    inputconstrains: "1 <= len(name) <= 20",
    sourcecode: String.raw`class Bird:
    def __init__(self, name):
        self.name = name

class Parrot(Bird):
    def move(self):
        return f"{self.name} flies high"

class Penguin(Bird):
    def move(self):
        return f"{self.name} swims deep"

name = input()
p = Parrot(name)
g = Penguin(name)
print(p.move())
print(g.move())`,
  }),
  cq({
    title: "Savings Account Extra Rate",
    description:
      "Drill: a child constructor that extends the parent constructor with one extra attribute.\n" +
      "class Account stores owner and balance. class SavingsAccount(Account) also stores an interest rate, calling the parent constructor first with super().__init__(owner, balance).\n" +
      "\n" +
      "Input Format:\n" +
      "One line: owner balance rate (space separated; owner is one word, balance and rate are integers)\n" +
      "\n" +
      "Output Format:\n" +
      "Print '<owner> has <balance> at <rate>% interest' using the object's three attributes.\n" +
      "\n" +
      "Constraints:\n" +
      "0 <= balance <= 1000000 and 1 <= rate <= 12",
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.single,
    si1: "Asha 5000 6", so1: "Asha has 5000 at 6% interest",
    si2: "Vikram 12000 4", so2: "Vikram has 12000 at 4% interest",
    i1: "Neha 750 3", o1: "Neha has 750 at 3% interest",
    i2: "Omar 99999 7", o2: "Omar has 99999 at 7% interest",
    i3: "Leena 100 1", o3: "Leena has 100 at 1% interest",
    inputconstrains: "0 <= balance <= 1000000, 1 <= rate <= 12",
    sourcecode: String.raw`class Account:
    def __init__(self, owner, balance):
        self.owner = owner
        self.balance = balance

class SavingsAccount(Account):
    def __init__(self, owner, balance, rate):
        super().__init__(owner, balance)
        self.rate = rate

owner, balance, rate = input().split()
s = SavingsAccount(owner, int(balance), int(rate))
print(f"{s.owner} has {s.balance} at {s.rate}% interest")`,
  }),
  cq({
    title: "Textbook Inherited Shelf Method",
    description:
      "Drill: a child object calls a method it never defined — it is inherited, and the method reads an attribute the child added.\n" +
      "class Book stores a title and defines shelf() returning '<title> on shelf'. class Textbook(Book) additionally stores a subject and does NOT redefine shelf().\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: title (may contain spaces)\n" +
      "Line 2: subject (may contain spaces)\n" +
      "\n" +
      "Output Format:\n" +
      "Line 1: result of calling the inherited shelf() on a Textbook object\n" +
      "Line 2: the subject attribute\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= len(title), len(subject) <= 30",
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.single,
    si1: "Algebra\nMathematics", so1: "Algebra on shelf\nMathematics",
    si2: "World Atlas\nGeography", so2: "World Atlas on shelf\nGeography",
    i1: "Intro to Python\nComputer Science", o1: "Intro to Python on shelf\nComputer Science",
    i2: "Plant Biology\nBiology", o2: "Plant Biology on shelf\nBiology",
    i3: "Stoichiometry\nChemistry", o3: "Stoichiometry on shelf\nChemistry",
    inputconstrains: "1 <= len(title), len(subject) <= 30",
    sourcecode: String.raw`class Book:
    def __init__(self, title):
        self.title = title

    def shelf(self):
        return f"{self.title} on shelf"

class Textbook(Book):
    def __init__(self, title, subject):
        super().__init__(title)
        self.subject = subject

title = input()
subject = input()
t = Textbook(title, subject)
print(t.shelf())
print(t.subject)`,
  }),

  // ---------------- easy: scenarios ----------------
  cq({
    title: "School Role Based Intros",
    description:
      "A school intranet prints a one-line introduction for each staff member, and the wording depends on the role.\n" +
      "Write class Staff whose constructor stores the name. Write class Teacher(Staff) that also stores a subject with intro() returning 'Teacher <name> teaches <subject>'. Write class Principal(Staff) that also stores years of service with intro() returning 'Principal <name> with <years> years of service'.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: role, exactly TEACHER or PRINCIPAL\n" +
      "Line 2: name (may contain spaces)\n" +
      "Line 3: subject for a teacher, or years of service (integer) for a principal\n" +
      "\n" +
      "Output Format:\n" +
      "Print the intro() string of the matching child object.\n" +
      "\n" +
      "Constraints:\n" +
      "role is TEACHER or PRINCIPAL, 1 <= len(name), len(subject) <= 30 and 1 <= years <= 40",
    difficulty: "easy",
    variant: "scenario",
    subtopic: SUB.hier,
    si1: "TEACHER\nAnita\nPhysics", so1: "Teacher Anita teaches Physics",
    si2: "PRINCIPAL\nMr. Rao\n15", so2: "Principal Mr. Rao with 15 years of service",
    i1: "TEACHER\nFarid\nHistory", o1: "Teacher Farid teaches History",
    i2: "PRINCIPAL\nMs. Iyer\n22", o2: "Principal Ms. Iyer with 22 years of service",
    i3: "TEACHER\nGrace\nBotany", o3: "Teacher Grace teaches Botany",
    inputconstrains: "role is TEACHER or PRINCIPAL, 1 <= years <= 40",
    sourcecode: String.raw`class Staff:
    def __init__(self, name):
        self.name = name

class Teacher(Staff):
    def __init__(self, name, subject):
        super().__init__(name)
        self.subject = subject

    def intro(self):
        return f"Teacher {self.name} teaches {self.subject}"

class Principal(Staff):
    def __init__(self, name, years):
        super().__init__(name)
        self.years = years

    def intro(self):
        return f"Principal {self.name} with {self.years} years of service"

role = input()
name = input()
extra = input()
if role == "TEACHER":
    person = Teacher(name, extra)
else:
    person = Principal(name, int(extra))
print(person.intro())`,
  }),
  cq({
    title: "Bike Car Rent Factors",
    description:
      "A rental shop prices vehicles from a per-day rate and a class-wide pricing factor: bikes get a 10 percent discount (factor 0.9) and cars carry a 15 percent surge (factor 1.15). The rent formula itself lives once on the parent class and reads the factor from the current object.\n" +
      "Write class Vehicle with a class attribute factor = 1.0, a constructor storing rate, and a method rent(days) returning rate * days * self.factor. Write class Bike(Vehicle) with factor = 0.9 and class Car(Vehicle) with factor = 1.15.\n" +
      "\n" +
      "Input Format:\n" +
      "One line: kind rate days (space separated; kind is BIKE or CAR, rate and days are integers)\n" +
      "\n" +
      "Output Format:\n" +
      "Print the rent with exactly two decimal places.\n" +
      "\n" +
      "Constraints:\n" +
      "kind is BIKE or CAR, 1 <= rate <= 5000 and 1 <= days <= 30",
    difficulty: "easy",
    variant: "scenario",
    subtopic: SUB.hier,
    si1: "BIKE 300 3", so1: "810.00",
    si2: "CAR 1200 2", so2: "2760.00",
    i1: "CAR 500 4", o1: "2300.00",
    i2: "BIKE 150 7", o2: "945.00",
    i3: "BIKE 99 1", o3: "89.10",
    inputconstrains: "kind is BIKE or CAR, 1 <= rate <= 5000, 1 <= days <= 30",
    sourcecode: String.raw`class Vehicle:
    factor = 1.0

    def __init__(self, rate):
        self.rate = rate

    def rent(self, days):
        return self.rate * days * self.factor

class Bike(Vehicle):
    factor = 0.9

class Car(Vehicle):
    factor = 1.15

kind, rate, days = input().split()
if kind == "BIKE":
    v = Bike(int(rate))
else:
    v = Car(int(rate))
print(f"{v.rent(int(days)):.2f}")`,
  }),
  cq({
    title: "Smart Fridge Three Level Status",
    description:
      "A kitchen appliance app models a smart fridge with a three-level chain: Appliance -> Fridge -> SmartFridge.\n" +
      "class Appliance stores the brand. class Fridge(Appliance) also stores the capacity in litres. class SmartFridge(Fridge) also stores the target temperature and defines status() returning '<brand> fridge <capacity>L cooling to <temp>C'.\n" +
      "\n" +
      "Input Format:\n" +
      "One line: brand capacity temp (space separated; brand is one word, capacity and temp are integers)\n" +
      "\n" +
      "Output Format:\n" +
      "Print the status() string of the SmartFridge object.\n" +
      "\n" +
      "Constraints:\n" +
      "50 <= capacity <= 800 and 1 <= temp <= 9",
    difficulty: "easy",
    variant: "scenario",
    subtopic: SUB.multi,
    si1: "CoolKing 300 4", so1: "CoolKing fridge 300L cooling to 4C",
    si2: "FrostLine 250 6", so2: "FrostLine fridge 250L cooling to 6C",
    i1: "EverCold 180 3", o1: "EverCold fridge 180L cooling to 3C",
    i2: "NorthStar 420 5", o2: "NorthStar fridge 420L cooling to 5C",
    i3: "IceOra 150 7", o3: "IceOra fridge 150L cooling to 7C",
    inputconstrains: "50 <= capacity <= 800, 1 <= temp <= 9",
    sourcecode: String.raw`class Appliance:
    def __init__(self, brand):
        self.brand = brand

class Fridge(Appliance):
    def __init__(self, brand, capacity):
        super().__init__(brand)
        self.capacity = capacity

class SmartFridge(Fridge):
    def __init__(self, brand, capacity, temp):
        super().__init__(brand, capacity)
        self.temp = temp

    def status(self):
        return f"{self.brand} fridge {self.capacity}L cooling to {self.temp}C"

brand, capacity, temp = input().split()
f = SmartFridge(brand, int(capacity), int(temp))
print(f.status())`,
  }),
  cq({
    title: "Square Cube Chain Metrics",
    description:
      "A geometry app models solids with a multilevel chain: Shape -> Square -> Cube.\n" +
      "class Shape stores the side length. class Square(Shape) defines area() returning side * side. class Cube(Square) defines volume() returning side raised to the power 3.\n" +
      "\n" +
      "Input Format:\n" +
      "One line: the side length (integer)\n" +
      "\n" +
      "Output Format:\n" +
      "Line 1: 'Area: <area>' computed by the Square method\n" +
      "Line 2: 'Volume: <volume>' computed by the Cube method\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= side <= 1000",
    difficulty: "easy",
    variant: "scenario",
    subtopic: SUB.multi,
    si1: "3", so1: "Area: 9\nVolume: 27",
    si2: "5", so2: "Area: 25\nVolume: 125",
    i1: "1", o1: "Area: 1\nVolume: 1",
    i2: "10", o2: "Area: 100\nVolume: 1000",
    i3: "7", o3: "Area: 49\nVolume: 343",
    inputconstrains: "1 <= side <= 1000",
    sourcecode: String.raw`class Shape:
    def __init__(self, side):
        self.side = side

class Square(Shape):
    def area(self):
        return self.side * self.side

class Cube(Square):
    def volume(self):
        return self.side ** 3

side = int(input())
c = Cube(side)
print(f"Area: {c.area()}")
print(f"Volume: {c.volume()}")`,
  }),

  // ---------------- medium ----------------
  cq({
    title: "Manager Pay Accumulation Chain",
    description:
      "A company models managers with a three-level chain Person -> Employee -> Manager, where each level initialises one more attribute through super() calls.\n" +
      "class Person stores the name. class Employee(Person) also stores the base salary. class Manager(Employee) also stores the bonus and defines total() returning base + bonus.\n" +
      "\n" +
      "Input Format:\n" +
      "One line: name base bonus (space separated; name is one word, base and bonus are integers)\n" +
      "\n" +
      "Output Format:\n" +
      "Line 1: 'Name: <name>' (set by Person)\n" +
      "Line 2: 'Base: <base>' (set by Employee)\n" +
      "Line 3: 'Total: <total>' (computed by Manager)\n" +
      "\n" +
      "Constraints:\n" +
      "0 <= base, bonus <= 200000 and name is one word",
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.multi,
    si1: "Priya 50000 15000", so1: "Name: Priya\nBase: 50000\nTotal: 65000",
    si2: "Ravi 40000 0", so2: "Name: Ravi\nBase: 40000\nTotal: 40000",
    i1: "Sana 60000 5000", o1: "Name: Sana\nBase: 60000\nTotal: 65000",
    i2: "Omar 25000 7500", o2: "Name: Omar\nBase: 25000\nTotal: 32500",
    i3: "Leena 99000 99000", o3: "Name: Leena\nBase: 99000\nTotal: 198000",
    inputconstrains: "0 <= base, bonus <= 200000",
    blacklist: "@property, dataclass",
    whitelist: "class , (Person)",
    sourcecode: String.raw`class Person:
    def __init__(self, name):
        self.name = name

class Employee(Person):
    def __init__(self, name, base):
        super().__init__(name)
        self.base = base

class Manager(Employee):
    def __init__(self, name, base, bonus):
        super().__init__(name, base)
        self.bonus = bonus

    def total(self):
        return self.base + self.bonus

name, base, bonus = input().split()
m = Manager(name, int(base), int(bonus))
print(f"Name: {m.name}")
print(f"Base: {m.base}")
print(f"Total: {m.total()}")`,
  }),
  cq({
    title: "Copier Mixin Behaviour",
    description:
      "An office machine combines two behaviours through multiple inheritance: Printer knows how to print a document and Scanner knows how to scan one, while Copier inherits from both and adds a copy method.\n" +
      "class Printer defines print_doc(doc) returning 'Printing <doc>'. class Scanner defines scan_doc(doc) returning 'Scanning <doc>'. class Copier(Printer, Scanner) defines copy(doc) returning 'Copy of <doc> ready'.\n" +
      "\n" +
      "Input Format:\n" +
      "One line: doc mode (space separated; doc is one word, mode is PRINT, SCAN or COPY)\n" +
      "\n" +
      "Output Format:\n" +
      "PRINT: print_doc(doc) only.\n" +
      "SCAN: scan_doc(doc) only.\n" +
      "COPY: print_doc(doc), then scan_doc(doc), then copy(doc) — three lines in that order.\n" +
      "\n" +
      "Constraints:\n" +
      "mode is PRINT, SCAN or COPY and 1 <= len(doc) <= 40",
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.multiple,
    si1: "report.pdf COPY", so1: "Printing report.pdf\nScanning report.pdf\nCopy of report.pdf ready",
    si2: "invoice.doc PRINT", so2: "Printing invoice.doc",
    i1: "notes.txt SCAN", o1: "Scanning notes.txt",
    i2: "photo.png COPY", o2: "Printing photo.png\nScanning photo.png\nCopy of photo.png ready",
    i3: "contract.pdf SCAN", o3: "Scanning contract.pdf",
    inputconstrains: "mode is PRINT, SCAN or COPY, 1 <= len(doc) <= 40",
    blacklist: "ABC, @abstractmethod",
    whitelist: "class , Copier(Printer",
    sourcecode: String.raw`class Printer:
    def print_doc(self, doc):
        return f"Printing {doc}"

class Scanner:
    def scan_doc(self, doc):
        return f"Scanning {doc}"

class Copier(Printer, Scanner):
    def copy(self, doc):
        return f"Copy of {doc} ready"

doc, mode = input().split()
c = Copier()
if mode == "PRINT":
    print(c.print_doc(doc))
elif mode == "SCAN":
    print(c.scan_doc(doc))
else:
    print(c.print_doc(doc))
    print(c.scan_doc(doc))
    print(c.copy(doc))`,
  }),
  cq({
    title: "Diamond Label Resolution Pick",
    description:
      "Three classes define the same method info(), and a fourth class inherits from two of them. Which info() runs is decided by the method resolution order.\n" +
      "class A defines info() returning self.lab. class B(A) and class C(A) each override info() the same way (returning self.lab), and class D(B, C) defines nothing extra. Each class has a class attribute lab, and the driver assigns the three input labels to A.lab, B.lab and C.lab before instantiating.\n" +
      "\n" +
      "Input Format:\n" +
      "One line: three space-separated labels for A, B and C\n" +
      "\n" +
      "Output Format:\n" +
      "Line 1: D().info()\n" +
      "Line 2: C().info()\n" +
      "Line 3: A().info()\n" +
      "\n" +
      "Constraints:\n" +
      "3 labels, each 1 <= len <= 15",
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.mro,
    si1: "Alpha Beta Gamma", so1: "Beta\nGamma\nAlpha",
    si2: "Base Left Right", so2: "Left\nRight\nBase",
    i1: "Root Mid Leaf", o1: "Mid\nLeaf\nRoot",
    i2: "P Q R", o2: "Q\nR\nP",
    i3: "X Y Z", o3: "Y\nZ\nX",
    inputconstrains: "3 space-separated labels, 1 <= len <= 15",
    blacklist: "super(, mro(",
    whitelist: "class , def ",
    sourcecode: String.raw`class A:
    lab = ""

    def info(self):
        return self.lab

class B(A):
    lab = ""

    def info(self):
        return self.lab

class C(A):
    lab = ""

    def info(self):
        return self.lab

class D(B, C):
    pass

a_lab, b_lab, c_lab = input().split()
A.lab = a_lab
B.lab = b_lab
C.lab = c_lab
print(D().info())
print(C().info())
print(A().info())`,
  }),
  cq({
    title: "Notification Channel Dispatch",
    description:
      "An alert console dispatches events over two channels built on one base class: EmailNotification and SMSNotification both extend Notification and each formats its message differently.\n" +
      "class Notification stores the message. class EmailNotification(Notification) defines send() returning 'EMAIL: <message>'. class SMSNotification(Notification) defines send() returning 'SMS: <message>'.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: number of events n\n" +
      "Next n lines: channel and message (channel is EMAIL or SMS; the message may contain spaces and runs to the end of the line)\n" +
      "\n" +
      "Output Format:\n" +
      "One line per event in input order: the string returned by the matching child's send().\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= n <= 50, channel is EMAIL or SMS and 1 <= len(message) <= 80",
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.hier,
    si1: "3\nEMAIL Server down\nSMS OTP 4482\nEMAIL Weekly digest", so1: "EMAIL: Server down\nSMS: OTP 4482\nEMAIL: Weekly digest",
    si2: "1\nSMS Hi there", so2: "SMS: Hi there",
    i1: "2\nEMAIL Invoice attached\nSMS Balance low", o1: "EMAIL: Invoice attached\nSMS: Balance low",
    i2: "4\nSMS A\nEMAIL B\nSMS C\nEMAIL D", o2: "SMS: A\nEMAIL: B\nSMS: C\nEMAIL: D",
    i3: "2\nEMAIL Meeting at 5\nSMS Call me", o3: "EMAIL: Meeting at 5\nSMS: Call me",
    inputconstrains: "1 <= n <= 50, channel is EMAIL or SMS",
    blacklist: "dict(, match(",
    whitelist: "class , (Notification)",
    sourcecode: String.raw`class Notification:
    def __init__(self, message):
        self.message = message

class EmailNotification(Notification):
    def send(self):
        return f"EMAIL: {self.message}"

class SMSNotification(Notification):
    def send(self):
        return f"SMS: {self.message}"

n = int(input())
for _ in range(n):
    parts = input().split(maxsplit=1)
    kind = parts[0]
    message = parts[1]
    if kind == "EMAIL":
        note = EmailNotification(message)
    elif kind == "SMS":
        note = SMSNotification(message)
    else:
        note = Notification("UNKNOWN")
    print(note.send())`,
  }),
  cq({
    title: "Science Student Practical Totals",
    description:
      "A school computes a science student's grand total as theory marks plus practical marks. Regular students have only theory marks, so the base class totals the theory list; the science subclass extends the total with the practical list on top of the parent's result.\n" +
      "class Student stores name and a theory list with a method total() that loops over the theory marks. class ScienceStudent(Student) additionally stores a practical list and overrides total() to return super().total() plus the sum of the practical marks accumulated in a loop.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: name (may contain spaces)\n" +
      "Line 2: theory marks (space-separated integers)\n" +
      "Line 3: practical marks (space-separated integers)\n" +
      "\n" +
      "Output Format:\n" +
      "Print '<name>: <grand total>'.\n" +
      "\n" +
      "Constraints:\n" +
      "at least 1 mark per line and 0 <= mark <= 100",
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.single,
    si1: "Asha\n80 90 70\n9 8", so1: "Asha: 257",
    si2: "Ravi\n55 65\n10 10 10", so2: "Ravi: 150",
    i1: "Neha\n100\n5 5 5 5", o1: "Neha: 120",
    i2: "Omar\n0 0\n0 0", o2: "Omar: 0",
    i3: "Leena\n40 41 42\n1 2 3 4 5", o3: "Leena: 138",
    inputconstrains: "0 <= mark <= 100, at least 1 mark per line",
    blacklist: "sum(, lambda",
    whitelist: "class , super(",
    sourcecode: String.raw`class Student:
    def __init__(self, name, theory):
        self.name = name
        self.theory = theory

    def total(self):
        t = 0
        for m in self.theory:
            t += m
        return t

class ScienceStudent(Student):
    def __init__(self, name, theory, practical):
        super().__init__(name, theory)
        self.practical = practical

    def total(self):
        t = super().total()
        for p in self.practical:
            t += p
        return t

name = input()
theory = list(map(int, input().split()))
practical = list(map(int, input().split()))
s = ScienceStudent(name, theory, practical)
print(f"{s.name}: {s.total()}")`,
  }),
  cq({
    title: "Member Tier Point Multipliers",
    description:
      "A loyalty programme multiplies earned points by membership tier: GOLD members earn double points (factor 2) and SILVER members earn 1.5 times their points.\n" +
      "class Member stores the name and points with a method earn() returning the points unchanged. class GoldMember(Member) overrides earn() returning points * 2. class SilverMember(Member) overrides earn() returning points * 1.5.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: number of members n\n" +
      "Next n lines: tier name points (space separated; tier is GOLD or SILVER, points is an integer)\n" +
      "\n" +
      "Output Format:\n" +
      "One line per member in input order: '<name> earns <points earned>' with two decimal places.\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= n <= 50, tier is GOLD or SILVER and 0 <= points <= 100000",
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.hier,
    si1: "3\nGOLD Asha 100\nSILVER Bala 80\nGOLD Chetan 50", so1: "Asha earns 200.00\nBala earns 120.00\nChetan earns 100.00",
    si2: "1\nSILVER Divya 9", so2: "Divya earns 13.50",
    i1: "2\nGOLD Esha 0\nSILVER Farid 1", o1: "Esha earns 0.00\nFarid earns 1.50",
    i2: "3\nSILVER Gita 6\nGOLD Hari 25\nGOLD Iman 12", o2: "Gita earns 9.00\nHari earns 50.00\nIman earns 24.00",
    i3: "2\nGOLD Jaya 333\nSILVER Kunal 77", o3: "Jaya earns 666.00\nKunal earns 115.50",
    inputconstrains: "1 <= n <= 50, 0 <= points <= 100000",
    blacklist: "dataclass, @property",
    whitelist: "class , (Member)",
    sourcecode: String.raw`class Member:
    def __init__(self, name, points):
        self.name = name
        self.points = points

    def earn(self):
        return self.points

class GoldMember(Member):
    def earn(self):
        return self.points * 2

class SilverMember(Member):
    def earn(self):
        return self.points * 1.5

n = int(input())
for _ in range(n):
    tier, name, points = input().split()
    points = int(points)
    if tier == "GOLD":
        m = GoldMember(name, points)
    else:
        m = SilverMember(name, points)
    print(f"{m.name} earns {m.earn():.2f}")`,
  }),

  // ---------------- hard ----------------
  cq({
    title: "Diamond MRO Value Engine",
    description:
      "A value-resolution engine demonstrates a diamond: class Base stores a value v. class Left(Base) overrides describe() returning 'Left <v + 10>' and initialises v through an explicit Base.__init__(self, v) call. class Right(Base) overrides describe() returning 'Right <v * 2>'. class Child(Left, Right) adds nothing. Python resolves Child's describe through the MRO, which the engine prints as a class-name chain.\n" +
      "\n" +
      "Input Format:\n" +
      "One line: the integer value v\n" +
      "\n" +
      "Output Format:\n" +
      "Line 1: Child(v).describe()\n" +
      "Line 2: Right(v + 1).describe()\n" +
      "Line 3: the MRO of Child as class names joined with ' -> '\n" +
      "\n" +
      "Constraints:\n" +
      "-100 <= v <= 100",
    difficulty: "hard",
    variant: "scenario",
    subtopic: SUB.mro,
    si1: "5", so1: "Left 15\nRight 12\nChild -> Left -> Right -> Base -> object",
    si2: "0", so2: "Left 10\nRight 2\nChild -> Left -> Right -> Base -> object",
    i1: "-3", o1: "Left 7\nRight -4\nChild -> Left -> Right -> Base -> object",
    i2: "100", o2: "Left 110\nRight 202\nChild -> Left -> Right -> Base -> object",
    i3: "50", o3: "Left 60\nRight 102\nChild -> Left -> Right -> Base -> object",
    inputconstrains: "-100 <= v <= 100",
    blacklist: "super(, lambda",
    whitelist: "class , mro(",
    sourcecode: String.raw`class Base:
    def __init__(self, v):
        self.v = v

    def describe(self):
        return f"Base {self.v}"

class Left(Base):
    def __init__(self, v):
        Base.__init__(self, v)

    def describe(self):
        return f"Left {self.v + 10}"

class Right(Base):
    def describe(self):
        return f"Right {self.v * 2}"

class Child(Left, Right):
    pass

v = int(input())
child = Child(v)
direct = Right(v + 1)
print(child.describe())
print(direct.describe())
chain = []
for c in Child.mro():
    chain.append(c.__name__)
print(" -> ".join(chain))`,
  }),
  cq({
    title: "Multilevel Bill Tax Stacking",
    description:
      "A billing engine stacks charges through a three-level chain: Bill -> TaxedBill -> FinalBill. The grandparent totals the plain amount, the parent adds 18 percent tax by overriding total(), and the child adds a delivery fee on top of the parent's total using an explicit TaxedBill.total(self) call (no super()).\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: number of bills n and the delivery fee (space separated; fee may be fractional)\n" +
      "Next n lines: one bill amount each (may be fractional)\n" +
      "\n" +
      "Output Format:\n" +
      "For each bill, two lines in order: 'Taxed: <amount * 1.18>' and 'Final: <taxed + fee>', each with two decimal places.\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= n <= 20, 0 <= fee <= 1000 and 0 <= amount <= 100000",
    difficulty: "hard",
    variant: "scenario",
    subtopic: SUB.multi,
    si1: "2 50\n1000\n2000", so1: "Taxed: 1180.00\nFinal: 1230.00\nTaxed: 2360.00\nFinal: 2410.00",
    si2: "1 0\n500", so2: "Taxed: 590.00\nFinal: 590.00",
    i1: "3 20\n100\n0\n999", o1: "Taxed: 118.00\nFinal: 138.00\nTaxed: 0.00\nFinal: 20.00\nTaxed: 1178.82\nFinal: 1198.82",
    i2: "1 7.5\n450", o2: "Taxed: 531.00\nFinal: 538.50",
    i3: "2 100\n12345\n1", o3: "Taxed: 14567.10\nFinal: 14667.10\nTaxed: 1.18\nFinal: 101.18",
    inputconstrains: "1 <= n <= 20, 0 <= fee <= 1000, 0 <= amount <= 100000",
    blacklist: "super(, lambda",
    whitelist: "class , TaxedBill.total(",
    sourcecode: String.raw`class Bill:
    def __init__(self, amount):
        self.amount = amount

    def total(self):
        return self.amount

class TaxedBill(Bill):
    def total(self):
        return self.amount * 1.18

class FinalBill(TaxedBill):
    def __init__(self, amount, fee):
        TaxedBill.__init__(self, amount)
        self.fee = fee

    def total(self):
        return TaxedBill.total(self) + self.fee

first = input().split()
n = int(first[0])
fee = float(first[1])
for _ in range(n):
    amount = float(input())
    taxed = TaxedBill(amount)
    final = FinalBill(amount, fee)
    print(f"Taxed: {taxed.total():.2f}")
    print(f"Final: {final.total():.2f}")`,
  }),
  cq({
    title: "Hospital Staff Salary Gates",
    description:
      "A hospital payroll gate computes pay per role from a base salary: doctors earn base * 3 + 500, nurses earn base * 1.5 + 100 and receptionists earn base + 200. Any other role string is not on the payroll gate.\n" +
      "Write class Staff storing name and base. Write three child classes Doctor, Nurse and Receptionist, each with a pay() method applying its role formula. Read staff records in a loop, instantiate the correct child (with an if/elif chain, no dictionary dispatch), and handle unknown roles.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: number of staff records n\n" +
      "Next n lines: role name base (space separated; base is an integer, name is one word)\n" +
      "\n" +
      "Output Format:\n" +
      "One line per record in input order: '<name>: <pay>' with two decimal places, or '<name>: UNKNOWN ROLE' when the role is not DOCTOR, NURSE or RECEPTIONIST.\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= n <= 50, 0 <= base <= 100000 and name is one word",
    difficulty: "hard",
    variant: "scenario",
    subtopic: SUB.hier,
    si1: "3\nDOCTOR Rao 1000\nNURSE Sneha 800\nRECEPTIONIST Sam 500", so1: "Rao: 3500.00\nSneha: 1300.00\nSam: 700.00",
    si2: "1\nDOCTOR Aditi 0", so2: "Aditi: 500.00",
    i1: "4\nNURSE B1 0\nDOCTOR C1 2000\nRECEPTIONIST D1 0\nVOLUNTEER E1 100", o1: "B1: 100.00\nC1: 6500.00\nD1: 200.00\nE1: UNKNOWN ROLE",
    i2: "2\nRECEPTIONIST F1 1234\nNURSE G1 4321", o2: "F1: 1434.00\nG1: 6581.50",
    i3: "3\nDOCTOR H1 3333\nNURSE I1 2222\nCHAPLAIN J1 100", o3: "H1: 10499.00\nI1: 3433.00\nJ1: UNKNOWN ROLE",
    inputconstrains: "1 <= n <= 50, 0 <= base <= 100000",
    blacklist: "dict(, match(",
    whitelist: "class , elif",
    sourcecode: String.raw`class Staff:
    def __init__(self, name, base):
        self.name = name
        self.base = base

class Doctor(Staff):
    def pay(self):
        return self.base * 3 + 500

class Nurse(Staff):
    def pay(self):
        return self.base * 1.5 + 100

class Receptionist(Staff):
    def pay(self):
        return self.base + 200

n = int(input())
for _ in range(n):
    role, name, base = input().split()
    base = int(base)
    if role == "DOCTOR":
        person = Doctor(name, base)
        print(f"{person.name}: {person.pay():.2f}")
    elif role == "NURSE":
        person = Nurse(name, base)
        print(f"{person.name}: {person.pay():.2f}")
    elif role == "RECEPTIONIST":
        person = Receptionist(name, base)
        print(f"{person.name}: {person.pay():.2f}")
    else:
        print(f"{name}: UNKNOWN ROLE")`,
  }),
  cq({
    title: "Mage Upgrade Attack Stacking",
    description:
      "A strategy game stacks attack power through a multilevel upgrade chain: Unit -> Mage -> Archmage. A unit attacks with its raw power; a mage adds twice the spell power; an archmage adds the staff bonus on top of the mage formula, calling Mage.attack(self) explicitly (no super()).\n" +
      "\n" +
      "Input Format:\n" +
      "One line: name power spell staff (space separated; name is one word, the rest are integers)\n" +
      "\n" +
      "Output Format:\n" +
      "Build Unit(name, power), Mage(name, power, spell) and Archmage(name, power, spell, staff), then print:\n" +
      "Line 1: 'Unit <unit attack>'\n" +
      "Line 2: 'Mage <mage attack>'\n" +
      "Line 3: 'Archmage <archmage attack>'\n" +
      "\n" +
      "Constraints:\n" +
      "0 <= power, spell, staff <= 1000 and 1 <= len(name) <= 20",
    difficulty: "hard",
    variant: "scenario",
    subtopic: SUB.multi,
    si1: "Gandalf 10 5 3", so1: "Unit 10\nMage 20\nArchmage 23",
    si2: "Zara 0 0 0", so2: "Unit 0\nMage 0\nArchmage 0",
    i1: "Elric 7 3 9", o1: "Unit 7\nMage 13\nArchmage 22",
    i2: "Mira 100 0 5", o2: "Unit 100\nMage 100\nArchmage 105",
    i3: "Oz 1 50 2", o3: "Unit 1\nMage 101\nArchmage 103",
    inputconstrains: "0 <= power, spell, staff <= 1000",
    blacklist: "super(, lambda",
    whitelist: "class , def ",
    sourcecode: String.raw`class Unit:
    def __init__(self, name, power):
        self.name = name
        self.power = power

    def attack(self):
        return self.power

class Mage(Unit):
    def __init__(self, name, power, spell):
        Unit.__init__(self, name, power)
        self.spell = spell

    def attack(self):
        return self.power + 2 * self.spell

class Archmage(Mage):
    def __init__(self, name, power, spell, staff):
        Mage.__init__(self, name, power, spell)
        self.staff = staff

    def attack(self):
        return Mage.attack(self) + self.staff

name, power, spell, staff = input().split()
power = int(power)
spell = int(spell)
staff = int(staff)
u = Unit(name, power)
m = Mage(name, power, spell)
a = Archmage(name, power, spell, staff)
print(f"Unit {u.attack()}")
print(f"Mage {m.attack()}")
print(f"Archmage {a.attack()}")`,
  }),
];

/* ============================ MCQ QUESTIONS ============================ */

const mcqs = [
  mq({
    title: "Inheritance Declaration Syntax",
    description: "Which class header declares that Manager inherits from Employee?",
    difficulty: "easy",
    subtopic: SUB.single,
    options: [
      "class Manager(Employee):",
      "class Employee(Manager):",
      "class Manager inherits Employee:",
      "Manager extends Employee:",
    ],
    correct: 1,
  }),
  mq({
    title: "Why Inheritance Helps",
    description: "What is the main benefit of inheritance in Python?",
    difficulty: "easy",
    subtopic: SUB.single,
    options: [
      "Reuse and extend an existing class without rewriting its code",
      "It makes the program run faster on all hardware",
      "It hides variables from the garbage collector",
      "It converts functions into methods automatically",
    ],
    correct: 1,
  }),
  mq({
    title: "Child Without __init__ Behaviour",
    description: "Child inherits from Parent but defines no __init__ of its own. What happens when Child(arguments) is called?",
    difficulty: "easy",
    subtopic: SUB.single,
    options: [
      "The parent's __init__ runs and initialises the object",
      "Python creates the object with no attributes at all",
      "A TypeError is raised because __init__ is missing",
      "The child class is silently redefined",
    ],
    correct: 1,
  }),
  mq({
    title: "Method Overriding Definition",
    description: "What does method overriding mean?",
    difficulty: "easy",
    subtopic: SUB.hier,
    options: [
      "A child class defines a method with the same name as a parent method, and child objects use the child's version",
      "Defining two methods with the same name in one class but different parameter lists",
      "Renaming a method after importing its module",
      "Calling a parent method through an object of a sibling class",
    ],
    correct: 1,
  }),
  mq({
    title: "Two Parent Class Syntax",
    description: "Which header makes Copier inherit from both Printer and Scanner?",
    difficulty: "easy",
    subtopic: SUB.multiple,
    options: [
      "class Copier(Printer, Scanner):",
      "class Copier(Printer + Scanner):",
      "class Copier from Printer, Scanner:",
      "class Copier(Printer & Scanner):",
    ],
    correct: 1,
  }),
  mq({
    title: "issubclass Truth Check",
    description: "Given 'class Dog(Animal): pass', what does issubclass(Dog, Animal) return?",
    difficulty: "easy",
    subtopic: SUB.mro,
    options: [
      "True",
      "False",
      "None",
      "It raises TypeError",
    ],
    correct: 1,
  }),
  mq({
    title: "Ultimate Base Class",
    description: "In Python 3, every class ultimately inherits from which class?",
    difficulty: "easy",
    subtopic: SUB.mro,
    options: ["object", "type", "class", "Base"],
    correct: 1,
  }),
  mq({
    title: "Hierarchical Inheritance Shape",
    description: "Which arrangement describes hierarchical inheritance?",
    difficulty: "easy",
    subtopic: SUB.hier,
    options: [
      "One parent class with several child classes",
      "A chain A -> B -> C -> D",
      "One child class with several parents",
      "Two unrelated classes that share a method name",
    ],
    correct: 1,
  }),
  mq({
    title: "Multilevel Inheritance Shape",
    description: "Which arrangement describes multilevel inheritance?",
    difficulty: "easy",
    subtopic: SUB.multi,
    options: [
      "A chain where C inherits from B and B inherits from A",
      "One parent class with many children",
      "One child class with many parents",
      "A class that contains instances of other classes",
    ],
    correct: 1,
  }),
  mq({
    title: "What Children Inherit",
    description: "What does a child class receive automatically from its parent?",
    difficulty: "easy",
    subtopic: SUB.single,
    options: [
      "The parent's methods and attributes",
      "Only the parent's private attributes",
      "Only the parent's docstring",
      "Nothing, unless every method call goes through super()",
    ],
    correct: 1,
  }),
  mq({
    title: "Override Output Pair",
    description: "What does this snippet print?",
    difficulty: "medium",
    subtopic: SUB.hier,
    options: [
      "Beep\nHonk Honk",
      "Beep\nBeep",
      "Honk Honk\nHonk Honk",
      "Honk Honk\nBeep",
    ],
    correct: 1,
    snippet: `class Vehicle:
    def horn(self):
        return "Beep"

class Car(Vehicle):
    def horn(self):
        return "Honk Honk"

v = Vehicle()
c = Car()
print(v.horn())
print(c.horn())`,
  }),
  mq({
    title: "Inherited Constructor In Action",
    description: "Camera defines no __init__ of its own. What does this snippet print?",
    difficulty: "medium",
    subtopic: SUB.single,
    options: [
      "ZoomX",
      "None",
      "It raises AttributeError",
      "The object's memory address string",
    ],
    correct: 1,
    snippet: `class Gadget:
    def __init__(self, name):
        self.name = name

class Camera(Gadget):
    pass

c = Camera("ZoomX")
print(c.name)`,
  }),
  mq({
    title: "First Parent Wins Greeting",
    description: "Both parents define greet(). C inherits from A, B in that order. What does this snippet print?",
    difficulty: "medium",
    subtopic: SUB.mro,
    options: [
      "Hello from A",
      "Hello from B",
      "Hello from A\nHello from B",
      "A TypeError about an ambiguous method is raised",
    ],
    correct: 1,
    snippet: `class A:
    def greet(self):
        return "Hello from A"

class B:
    def greet(self):
        return "Hello from B"

class C(A, B):
    pass

print(C().greet())`,
  }),
  mq({
    title: "super Chain Print Order",
    description: "Each class's __init__ calls super().__init__() first, then prints its own line. What does this snippet print?",
    difficulty: "medium",
    subtopic: SUB.multi,
    options: [
      "A init\nB init\nC init",
      "C init\nB init\nA init",
      "B init\nC init",
      "A init\nC init",
    ],
    correct: 1,
    snippet: `class A:
    def __init__(self):
        print("A init")

class B(A):
    def __init__(self):
        super().__init__()
        print("B init")

class C(B):
    def __init__(self):
        super().__init__()
        print("C init")

C()`,
  }),
  mq({
    title: "isinstance issubclass Trio Output",
    description: "What does this snippet print?",
    difficulty: "medium",
    subtopic: SUB.mro,
    options: [
      "True\nTrue\nFalse",
      "True\nTrue\nTrue",
      "False\nTrue\nFalse",
      "True\nFalse\nFalse",
    ],
    correct: 1,
    snippet: `class Animal:
    pass

class Dog(Animal):
    pass

d = Dog()
print(isinstance(d, Animal))
print(issubclass(Dog, Animal))
print(issubclass(Animal, Dog))`,
  }),
  mq({
    title: "Override Without super Call",
    description:
      "class Parent defines describe() returning 'Parent'. class Child(Parent) overrides describe() returning 'Child' and never calls super(). What does Child().describe() return?",
    difficulty: "medium",
    subtopic: SUB.hier,
    options: [
      "'Child' — the parent version is fully replaced for child objects",
      "'ChildParent' because both versions run in order",
      "'Parent' because the parent method has priority",
      "'Child' and then 'Parent' on two separate lines",
    ],
    correct: 1,
  }),
  mq({
    title: "Diamond MRO Prediction",
    description: "D inherits from B and C, which both override who() from A. What does this snippet print?",
    difficulty: "hard",
    subtopic: SUB.mro,
    options: [
      "B\n['D', 'B', 'C', 'A', 'object']",
      "C\n['D', 'C', 'B', 'A', 'object']",
      "B\n['D', 'C', 'B', 'A', 'object']",
      "A\n['D', 'B', 'C', 'A', 'object']",
    ],
    correct: 1,
    snippet: `class A:
    def who(self):
        return "A"

class B(A):
    def who(self):
        return "B"

class C(A):
    def who(self):
        return "C"

class D(B, C):
    pass

print(D().who())
print([c.__name__ for c in D.mro()])`,
  }),
  mq({
    title: "Cooperative super Diamond Order",
    description: "Every __init__ in this diamond calls super().__init__() before printing its own line. Remember that super() follows the MRO, not just the direct parent. What does this snippet print?",
    difficulty: "hard",
    subtopic: SUB.mro,
    options: [
      "A\nC\nB\nD",
      "D\nC\nB\nA",
      "A\nB\nC\nD",
      "D\nB\nC\nA",
    ],
    correct: 1,
    snippet: `class A:
    def __init__(self):
        print("A")

class B(A):
    def __init__(self):
        super().__init__()
        print("B")

class C(A):
    def __init__(self):
        super().__init__()
        print("C")

class D(B, C):
    def __init__(self):
        super().__init__()
        print("D")

D()`,
  }),
  mq({
    title: "Instance Attribute Shadows Class",
    description: "w gets an instance attribute kind that shadows the class attribute. What does this snippet print?",
    difficulty: "hard",
    subtopic: SUB.single,
    options: [
      "custom\ngeneric",
      "generic\ngeneric",
      "custom\ncustom",
      "generic\ncustom",
    ],
    correct: 1,
    snippet: `class Widget:
    kind = "generic"

    def show(self):
        return self.kind

w = Widget()
w.kind = "custom"
print(w.show())
print(Widget.kind)`,
  }),
  mq({
    title: "Explicit Base Method Call Result",
    description: "The child method calls the parent implementation through the class name. What does this snippet print?",
    difficulty: "hard",
    subtopic: SUB.multi,
    options: [
      "Child+Base",
      "Base",
      "Child+Child",
      "Base+Child",
    ],
    correct: 1,
    snippet: `class Base:
    def tag(self):
        return "Base"

class Child(Base):
    def tag(self):
        return "Child+" + Base.tag(self)

print(Child().tag())`,
  }),
];

/* ================================ WRITE ================================ */

writeFileSync(
  `${DIR}/day-14.code.json`,
  JSON.stringify({ day: 14, topics: [{ name: TOPIC_NAME, subtopics: SUBTOPICS }], questions }, null, 2)
);
writeFileSync(
  `${DIR}/day-14.mcq.json`,
  JSON.stringify({ day: 14, questions: mcqs }, null, 2)
);
console.log("wrote day 14:", questions.length, "code,", mcqs.length, "mcq");
