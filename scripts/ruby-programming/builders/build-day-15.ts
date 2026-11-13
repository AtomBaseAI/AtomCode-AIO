import { writeFileSync } from "node:fs";

const DAY = 15;
const TOPIC = "Inheritance and Class Design";
const SUBTOPICS = [
  "Single Inheritance",
  "Subclassing with Less-Than",
  "super Keyword",
  "Method Overriding",
  "Access Modifiers public private protected",
  "Class Variables and Class Methods",
];

type CodeQ = {
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
};

type MCQ = {
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
};

const questions: CodeQ[] = [
  // ===== EASY BASIC (6) =====
  {
    title: "Square Inherits Rectangle Area",
    description:
      "Define a Rectangle class with width/height and an area method. Define Square as a subclass of Rectangle that overrides initialize to set both dimensions equal. Read one integer side, compute and print the square's area.\n\nInput Format:\nLine 1: integer side.\n\nOutput Format:\nThe integer area (side * side).\n\nConstraints:\n1 <= side <= 1000.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Single Inheritance",
    sampleinput1: "5",
    sampleoutput1: "25",
    sampleinput2: "7",
    sampleoutput2: "49",
    input1: "1",
    output1: "1",
    input2: "10",
    output2: "100",
    input3: "100",
    output3: "10000",
    inputconstrains: "1 <= side <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `class Rectangle
  def initialize(w, h); @w = w; @h = h; end
  def area; @w * @h; end
end

class Square < Rectangle
  def initialize(s); super(s, s); end
end

s = gets.to_i
sq = Square.new(s)
puts sq.area
`,
  },
  {
    title: "Animal Subclass Sounds",
    description:
      "Create a base Animal class with a name and a sound method returning 'Generic sound'. Define subclasses Cat and Dog that override sound. Read a kind ('cat' or 'dog') and a name, then print the appropriate sound string.\n\nInput Format:\nLine 1: kind (cat or dog). Line 2: name.\n\nOutput Format:\n'<name> meows' or '<name> barks'.\n\nConstraints:\nkind is one of cat, dog; name length 1..30.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Subclassing with Less-Than",
    sampleinput1: "dog\nRex",
    sampleoutput1: "Rex barks",
    sampleinput2: "cat\nMimi",
    sampleoutput2: "Mimi meows",
    input1: "dog\nBuddy",
    output1: "Buddy barks",
    input2: "cat\nWhiskers",
    output2: "Whiskers meows",
    input3: "dog\nMax",
    output3: "Max barks",
    inputconstrains: "kind in {cat, dog}; 1 <= name length <= 30",
    blacklist: "",
    whitelist: "",
    sourcecode: `class Animal
  def initialize(name); @name = name; end
  def sound; "Generic sound"; end
end

class Cat < Animal
  def sound; "#{@name} meows"; end
end

class Dog < Animal
  def sound; "#{@name} barks"; end
end

kind = gets.chomp
name = gets.chomp
obj = kind == "dog" ? Dog.new(name) : Cat.new(name)
puts obj.sound
`,
  },
  {
    title: "Manager Extends Employee Info",
    description:
      "Define an Employee class storing name and a method info returning 'Employee: <name>'. Define a Manager subclass that adds a department field via super in initialize, and overrides info to call super and append ' - <dept>'. Read name and dept; print the manager's info.\n\nInput Format:\nLine 1: name. Line 2: department.\n\nOutput Format:\n'Employee: <name> - <dept>'.\n\nConstraints:\n1 <= name, dept length <= 30.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "super Keyword",
    sampleinput1: "Alice\nSales",
    sampleoutput1: "Employee: Alice - Sales",
    sampleinput2: "Bob\nIT",
    sampleoutput2: "Employee: Bob - IT",
    input1: "Carol\nHR",
    output1: "Employee: Carol - HR",
    input2: "Dave\nFinance",
    output2: "Employee: Dave - Finance",
    input3: "Eve\nOps",
    output3: "Employee: Eve - Ops",
    inputconstrains: "1 <= name, dept length <= 30",
    blacklist: "",
    whitelist: "",
    sourcecode: `class Employee
  def initialize(name); @name = name; end
  def info; "Employee: #{@name}"; end
end

class Manager < Employee
  def initialize(name, dept); super(name); @dept = dept; end
  def info; super + " - " + @dept; end
end

n = gets.chomp
d = gets.chomp
m = Manager.new(n, d)
puts m.info
`,
  },
  {
    title: "Polite Greeter Override Message",
    description:
      "Define a Greeter class with a message method returning 'Hello'. Define PoliteGreeter as a subclass that overrides message to return 'Good day'. Read an integer n; if n is 1 instantiate Greeter, otherwise PoliteGreeter. Print the message of the resulting object.\n\nInput Format:\nLine 1: integer n (1 or 2).\n\nOutput Format:\n'Hello' or 'Good day'.\n\nConstraints:\nn is 1 or 2.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Method Overriding",
    sampleinput1: "1",
    sampleoutput1: "Hello",
    sampleinput2: "2",
    sampleoutput2: "Good day",
    input1: "2",
    output1: "Good day",
    input2: "1",
    output2: "Hello",
    input3: "2",
    output3: "Good day",
    inputconstrains: "n is 1 or 2",
    blacklist: "",
    whitelist: "",
    sourcecode: `class Greeter
  def message; "Hello"; end
end

class PoliteGreeter < Greeter
  def message; "Good day"; end
end

n = gets.to_i
g = n == 1 ? Greeter.new : PoliteGreeter.new
puts g.message
`,
  },
  {
    title: "Private Footer In Report Class",
    description:
      "Define a Report class with a public display method that returns '<title>: <footer>'. The footer value comes from a private method format_footer that returns 'Confidential'. Read a title and print the display string.\n\nInput Format:\nLine 1: title string.\n\nOutput Format:\n'<title>: Confidential'.\n\nConstraints:\n1 <= title length <= 50.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Access Modifiers public private protected",
    sampleinput1: "Sales",
    sampleoutput1: "Sales: Confidential",
    sampleinput2: "HR",
    sampleoutput2: "HR: Confidential",
    input1: "Annual Report",
    output1: "Annual Report: Confidential",
    input2: "Q1",
    output2: "Q1: Confidential",
    input3: "Finance",
    output3: "Finance: Confidential",
    inputconstrains: "1 <= title length <= 50",
    blacklist: "",
    whitelist: "",
    sourcecode: `class Report
  def initialize(title); @title = title; end
  def display; "#{@title}: #{format_footer}"; end
  private
  def format_footer; "Confidential"; end
end

t = gets.chomp
r = Report.new(t)
puts r.display
`,
  },
  {
    title: "Counter Class Method Instance Tally",
    description:
      "Define a Counter class with a class variable @@count starting at 0. The constructor increments @@count. Define a class method self.count that returns @@count. Read an integer n, instantiate Counter n times, then print the count.\n\nInput Format:\nLine 1: integer n.\n\nOutput Format:\nThe integer count.\n\nConstraints:\n0 <= n <= 1000.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Class Variables and Class Methods",
    sampleinput1: "3",
    sampleoutput1: "3",
    sampleinput2: "5",
    sampleoutput2: "5",
    input1: "1",
    output1: "1",
    input2: "10",
    output2: "10",
    input3: "0",
    output3: "0",
    inputconstrains: "0 <= n <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `class Counter
  @@count = 0
  def initialize; @@count += 1; end
  def self.count; @@count; end
end

n = gets.to_i
n.times { Counter.new }
puts Counter.count
`,
  },

  // ===== EASY SCENARIO (4) =====
  {
    title: "WashingMachine Inherits Appliance Summary",
    description:
      "An appliance shop records appliances by name and wattage. Define an Appliance base class with a summary method returning '<name> draws <watts>W'. Define WashingMachine as a subclass that inherits the summary behavior unchanged. Read a brand and watts, then print the washing machine summary.\n\nInput Format:\nLine 1: brand name. Line 2: integer watts.\n\nOutput Format:\n'<brand> draws <watts>W'.\n\nConstraints:\n1 <= brand length <= 30; 1 <= watts <= 5000.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Single Inheritance",
    sampleinput1: "Bosch\n500",
    sampleoutput1: "Bosch draws 500W",
    sampleinput2: "LG\n800",
    sampleoutput2: "LG draws 800W",
    input1: "Samsung\n650",
    output1: "Samsung draws 650W",
    input2: "Whirlpool\n1200",
    output2: "Whirlpool draws 1200W",
    input3: "Haier\n400",
    output3: "Haier draws 400W",
    inputconstrains: "1 <= brand length <= 30; 1 <= watts <= 5000",
    blacklist: "",
    whitelist: "",
    sourcecode: `class Appliance
  def initialize(name, watts); @name = name; @watts = watts; end
  def summary; "#{@name} draws #{@watts}W"; end
end

class WashingMachine < Appliance
end

n = gets.chomp
w = gets.to_i
m = WashingMachine.new(n, w)
puts m.summary
`,
  },
  {
    title: "Savings Account Calls Super Init",
    description:
      "A bank stores accounts. Define a BankAccount base class with owner and balance and an info method returning '<owner>: $<balance>'. Define SavingsAccount subclass that calls super in initialize to set owner/balance, then stores a rate, and overrides info to append ' (rate <rate>%)'. Read owner, balance, rate; print the savings account info.\n\nInput Format:\nLine 1: owner. Line 2: integer balance. Line 3: integer rate (percent).\n\nOutput Format:\n'<owner>: $<balance> (rate <rate>%)'.\n\nConstraints:\n1 <= owner length <= 30; 0 <= balance <= 1000000; 0 <= rate <= 20.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "super Keyword",
    sampleinput1: "Alice\n1000\n5",
    sampleoutput1: "Alice: $1000 (rate 5%)",
    sampleinput2: "Bob\n5000\n3",
    sampleoutput2: "Bob: $5000 (rate 3%)",
    input1: "Carol\n250\n7",
    output1: "Carol: $250 (rate 7%)",
    input2: "Dan\n0\n0",
    output2: "Dan: $0 (rate 0%)",
    input3: "Eve\n999999\n10",
    output3: "Eve: $999999 (rate 10%)",
    inputconstrains: "1 <= owner length <= 30; 0 <= balance <= 1000000; 0 <= rate <= 20",
    blacklist: "",
    whitelist: "",
    sourcecode: `class BankAccount
  def initialize(owner, balance); @owner = owner; @balance = balance; end
  def info; "#{@owner}: $#{@balance}"; end
end

class SavingsAccount < BankAccount
  def initialize(owner, balance, rate); super(owner, balance); @rate = rate; end
  def info; super + " (rate #{@rate}%)"; end
end

o = gets.chomp
b = gets.to_i
r = gets.to_i
s = SavingsAccount.new(o, b, r)
puts s.info
`,
  },
  {
    title: "Rectangle Overrides Shape Area",
    description:
      "Define a Shape base class whose area method returns 0. Define Rectangle as a subclass that overrides area to return width * height. Read two integers width and height, then print the rectangle's area.\n\nInput Format:\nLine 1: two space-separated integers w h.\n\nOutput Format:\nThe integer area w * h.\n\nConstraints:\n1 <= w, h <= 1000.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Method Overriding",
    sampleinput1: "3 4",
    sampleoutput1: "12",
    sampleinput2: "5 6",
    sampleoutput2: "30",
    input1: "1 1",
    output1: "1",
    input2: "10 10",
    output2: "100",
    input3: "7 8",
    output3: "56",
    inputconstrains: "1 <= w, h <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `class Shape
  def area; 0; end
end

class Rectangle < Shape
  def initialize(w, h); @w = w; @h = h; end
  def area; @w * @h; end
end

w, h = gets.split.map(&:to_i)
r = Rectangle.new(w, h)
puts r.area
`,
  },
  {
    title: "Restaurant Orders Class Counter",
    description:
      "A restaurant logs each new order. Define a Restaurant class with a class variable @@orders starting at 0. The constructor takes a dish name and increments @@orders. Define a class method self.orders that returns @@orders. Read n then n dish names; instantiate Restaurant once per dish; finally print the total order count.\n\nInput Format:\nLine 1: integer n. Next n lines: dish name.\n\nOutput Format:\nThe integer order count.\n\nConstraints:\n0 <= n <= 100; 1 <= dish length <= 30.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Class Variables and Class Methods",
    sampleinput1: "3\nPizza\nBurger\nPasta",
    sampleoutput1: "3",
    sampleinput2: "2\nSushi\nRamen",
    sampleoutput2: "2",
    input1: "1\nSalad",
    output1: "1",
    input2: "4\nA\nB\nC\nD",
    output2: "4",
    input3: "0",
    output3: "0",
    inputconstrains: "0 <= n <= 100; 1 <= dish length <= 30",
    blacklist: "",
    whitelist: "",
    sourcecode: `class Restaurant
  @@orders = 0
  def initialize(dish); @dish = dish; @@orders += 1; end
  def self.orders; @@orders; end
end

n = gets.to_i
n.times do
  dish = gets.chomp
  Restaurant.new(dish)
end
puts Restaurant.orders
`,
  },

  // ===== MEDIUM SCENARIO (6) =====
  {
    title: "Zoo Animal Hierarchy Sounds",
    description:
      "A zoo app models animals. Define a base Animal class with name and a sound method. Define subclasses Lion, Tiger, and Elephant, each overriding sound to return '<name> roars', '<name> growls', '<name> trumpets' respectively. Read n then n lines each containing a kind and a name; print the sound of each animal on its own line.\n\nInput Format:\nLine 1: integer n. Next n lines: 'kind name' (kind is lion, tiger, or elephant).\n\nOutput Format:\nOne sound per line.\n\nConstraints:\n1 <= n <= 50; 1 <= name length <= 30.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Subclassing with Less-Than",
    sampleinput1: "3\nlion Leo\ntiger Tony\nelephant Dumbo",
    sampleoutput1: "Leo roars\nTony growls\nDumbo trumpets",
    sampleinput2: "2\ntiger Tigo\nlion Lea",
    sampleoutput2: "Tigo growls\nLea roars",
    input1: "1\nlion Alex",
    output1: "Alex roars",
    input2: "4\ntiger a\nlion b\ntiger c\nelephant d",
    output2: "a growls\nb roars\nc growls\nd trumpets",
    input3: "2\nelephant Ela\nlion Mufasa",
    output3: "Ela trumpets\nMufasa roars",
    inputconstrains: "1 <= n <= 50; 1 <= name length <= 30",
    blacklist: "Struct, OpenStruct",
    whitelist: "class Lion, class Tiger, class Elephant",
    sourcecode: `class Animal
  def initialize(name); @name = name; end
  def sound; "#{@name} makes a sound"; end
end

class Lion < Animal
  def sound; "#{@name} roars"; end
end

class Tiger < Animal
  def sound; "#{@name} growls"; end
end

class Elephant < Animal
  def sound; "#{@name} trumpets"; end
end

n = gets.to_i
n.times do
  kind, name = gets.split
  obj = case kind
  when "lion" then Lion.new(name)
  when "tiger" then Tiger.new(name)
  when "elephant" then Elephant.new(name)
  end
  puts obj.sound
end
`,
  },
  {
    title: "Manager Bonus Doubled With Super",
    description:
      "A company tracks employees and managers. Define an Employee class with name, salary, a bonus method returning salary/10, and a report method returning '<name>:<bonus>'. Define a Manager subclass that calls super in initialize to set name/salary, then stores team size; it overrides bonus to return super * 2 and overrides report to call super and append ':<team>'. Read n then for each manager read name, salary, team; print each report on its own line.\n\nInput Format:\nLine 1: integer n. Next n groups of 3 lines: name, salary, team.\n\nOutput Format:\nOne report per line: '<name>:<bonus>:<team>'.\n\nConstraints:\n1 <= n <= 50; 0 <= salary <= 100000; 0 <= team <= 1000.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "super Keyword",
    sampleinput1: "1\nAlice\n1000\n3",
    sampleoutput1: "Alice:200:3",
    sampleinput2: "2\nBob\n500\n2\nCarol\n2000\n5",
    sampleoutput2: "Bob:100:2\nCarol:400:5",
    input1: "1\nDan\n800\n4",
    output1: "Dan:160:4",
    input2: "2\nEve\n1000\n1\nFrank\n3000\n6",
    output2: "Eve:200:1\nFrank:600:6",
    input3: "1\nGrace\n50\n0",
    output3: "Grace:10:0",
    inputconstrains: "1 <= n <= 50; 0 <= salary <= 100000; 0 <= team <= 1000",
    blacklist: "Struct, OpenStruct",
    whitelist: "super, class Employee, class Manager",
    sourcecode: `class Employee
  def initialize(name, salary); @name = name; @salary = salary; end
  def bonus; @salary / 10; end
  def report; "#{@name}:#{bonus}"; end
end

class Manager < Employee
  def initialize(name, salary, team); super(name, salary); @team = team; end
  def bonus; super * 2; end
  def report; super + ":#{@team}"; end
end

n = gets.to_i
n.times do
  name = gets.chomp
  salary = gets.to_i
  team = gets.to_i
  m = Manager.new(name, salary, team)
  puts m.report
end
`,
  },
  {
    title: "Payment Processor Fee Override",
    description:
      "A checkout system supports multiple payment types. Define a Payment base class with amount, a fee method returning amount/10, and a total method returning amount + fee. Define CashPayment that overrides fee to return 0. Define CardPayment that overrides fee to return amount/20. Read n then n lines 'kind amount' (kind is cash or card); print each total on its own line.\n\nInput Format:\nLine 1: integer n. Next n lines: 'kind amount' (kind in cash, card).\n\nOutput Format:\nOne total per line.\n\nConstraints:\n1 <= n <= 50; 1 <= amount <= 100000.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Method Overriding",
    sampleinput1: "2\ncash 100\ncard 100",
    sampleoutput1: "100\n105",
    sampleinput2: "3\ncard 200\ncash 50\ncard 1000",
    sampleoutput2: "210\n50\n1050",
    input1: "1\ncash 1000",
    output1: "1000",
    input2: "2\ncard 200\ncard 40",
    output2: "210\n42",
    input3: "3\ncash 10\ncard 20\ncash 30",
    output3: "10\n21\n30",
    inputconstrains: "1 <= n <= 50; 1 <= amount <= 100000",
    blacklist: "Struct, send, public_send",
    whitelist: "class CashPayment, class CardPayment, def fee",
    sourcecode: `class Payment
  def initialize(amount); @amount = amount; end
  def fee; @amount / 10; end
  def total; @amount + fee; end
end

class CashPayment < Payment
  def fee; 0; end
end

class CardPayment < Payment
  def fee; @amount / 20; end
end

n = gets.to_i
n.times do
  parts = gets.split
  kind = parts[0]
  amt = parts[1].to_i
  p = case kind
  when "cash" then CashPayment.new(amt)
  when "card" then CardPayment.new(amt)
  end
  puts p.total
end
`,
  },
  {
    title: "Private Pin Verification Account",
    description:
      "A bank's account keeps its PIN private. Define an Account class storing owner and pin. The public verify method compares the entered PIN against the value returned by a private method hidden_pin and returns 'Access granted for <owner>' or 'Access denied for <owner>'. Read owner, pin, and entered pin; print the verification result.\n\nInput Format:\nLine 1: owner. Line 2: integer correct pin. Line 3: integer entered pin.\n\nOutput Format:\n'Access granted for <owner>' or 'Access denied for <owner>'.\n\nConstraints:\n1 <= owner length <= 30; 0 <= pin <= 9999.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Access Modifiers public private protected",
    sampleinput1: "Alice\n1234\n1234",
    sampleoutput1: "Access granted for Alice",
    sampleinput2: "Bob\n9999\n0",
    sampleoutput2: "Access denied for Bob",
    input1: "Carol\n0\n0",
    output1: "Access granted for Carol",
    input2: "Dave\n4242\n1111",
    output2: "Access denied for Dave",
    input3: "Eve\n1357\n1357",
    output3: "Access granted for Eve",
    inputconstrains: "1 <= owner length <= 30; 0 <= pin <= 9999",
    blacklist: "instance_variable_get, instance_variable_set, send",
    whitelist: "private, def hidden_pin, def verify",
    sourcecode: `class Account
  def initialize(owner, pin); @owner = owner; @pin = pin; end
  def verify(input)
    if input == hidden_pin
      "Access granted for #{@owner}"
    else
      "Access denied for #{@owner}"
    end
  end
  private
  def hidden_pin; @pin; end
end

owner = gets.chomp
pin = gets.to_i
input = gets.to_i
a = Account.new(owner, pin)
puts a.verify(input)
`,
  },
  {
    title: "Factory Production Weight Counter",
    description:
      "A factory tracks total items produced and their combined weight via class variables. Define a Factory class with @@produced and @@total_weight starting at 0. The constructor takes name and weight and increments both. Define a class method self.summary returning 'Items: <produced>, Weight: <total>'. Read n then n lines 'name weight'; instantiate Factory per line; finally print the summary.\n\nInput Format:\nLine 1: integer n. Next n lines: 'name weight' (integer weight).\n\nOutput Format:\n'Items: <produced>, Weight: <total>'.\n\nConstraints:\n0 <= n <= 100; 0 <= weight <= 100000.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Class Variables and Class Methods",
    sampleinput1: "3\nA 10\nB 20\nC 30",
    sampleoutput1: "Items: 3, Weight: 60",
    sampleinput2: "2\nX 5\nY 15",
    sampleoutput2: "Items: 2, Weight: 20",
    input1: "1\nZ 100",
    output1: "Items: 1, Weight: 100",
    input2: "4\na 1\nb 2\nc 3\nd 4",
    output2: "Items: 4, Weight: 10",
    input3: "2\nM 0\nN 7",
    output3: "Items: 2, Weight: 7",
    inputconstrains: "0 <= n <= 100; 0 <= weight <= 100000",
    blacklist: "Struct, instance_variable_get",
    whitelist: "@@produced, def self.summary",
    sourcecode: `class Factory
  @@produced = 0
  @@total_weight = 0
  def initialize(name, weight); @name = name; @weight = weight; @@produced += 1; @@total_weight += weight; end
  def self.summary; "Items: #{@@produced}, Weight: #{@@total_weight}"; end
end

n = gets.to_i
n.times do
  parts = gets.split
  Factory.new(parts[0], parts[1].to_i)
end
puts Factory.summary
`,
  },
  {
    title: "Library Item Multi Type Inheritance",
    description:
      "A library catalog has items. Define an Item base class with title and a label method returning 'Item: <title>'. Define Book and DVD subclasses that override label to call super and append ' [Book]' or ' [DVD]' respectively. Read n then n lines 'kind title' (kind is book or dvd); print each label on its own line.\n\nInput Format:\nLine 1: integer n. Next n lines: 'kind title' (title may contain spaces).\n\nOutput Format:\nOne label per line.\n\nConstraints:\n1 <= n <= 50; 1 <= title length <= 50.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Single Inheritance",
    sampleinput1: "2\nbook Ruby Guide\ndvd Inception",
    sampleoutput1: "Item: Ruby Guide [Book]\nItem: Inception [DVD]",
    sampleinput2: "3\ndvd Avatar\nbook Clean Code\ndvd Matrix",
    sampleoutput2: "Item: Avatar [DVD]\nItem: Clean Code [Book]\nItem: Matrix [DVD]",
    input1: "1\nbook Foo Bar",
    output1: "Item: Foo Bar [Book]",
    input2: "2\ndvd A\nbook B",
    output2: "Item: A [DVD]\nItem: B [Book]",
    input3: "1\ndvd Z",
    output3: "Item: Z [DVD]",
    inputconstrains: "1 <= n <= 50; 1 <= title length <= 50",
    blacklist: "Struct, send",
    whitelist: "class Book, class DVD, < Item",
    sourcecode: `class Item
  def initialize(title); @title = title; end
  def label; "Item: #{@title}"; end
end

class Book < Item
  def label; super + " [Book]"; end
end

class DVD < Item
  def label; super + " [DVD]"; end
end

n = gets.to_i
n.times do
  parts = gets.split
  kind = parts[0]
  title = parts[1..].join(" ")
  obj = kind == "book" ? Book.new(title) : DVD.new(title)
  puts obj.label
end
`,
  },

  // ===== HARD SCENARIO (4) =====
  {
    title: "Shape Area Override Chain Aggregator",
    description:
      "A geometry tool models shapes. Define a Shape base class whose area method returns 0. Define Circle (area = 3 * r * r using 3 for pi), Rectangle (area = w * h), and Square as a subclass of Rectangle that calls super(s, s) in initialize. Read n then n lines describing a shape ('circle r', 'rect w h', or 'square s'); compute and print the sum of all areas as an integer.\n\nInput Format:\nLine 1: integer n. Next n lines: shape descriptor with dimensions.\n\nOutput Format:\nInteger total area.\n\nConstraints:\n1 <= n <= 50; 1 <= r, w, h, s <= 100.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Method Overriding",
    sampleinput1: "3\ncircle 5\nrect 3 4\nsquare 6",
    sampleoutput1: "123",
    sampleinput2: "2\ncircle 2\nrect 5 5",
    sampleoutput2: "37",
    input1: "1\ncircle 1",
    output1: "3",
    input2: "4\nsquare 3\nsquare 4\nsquare 5\nsquare 1",
    output2: "51",
    input3: "3\ncircle 10\nrect 3 7\nsquare 2",
    output3: "325",
    inputconstrains: "1 <= n <= 50; 1 <= r, w, h, s <= 100",
    blacklist: "Struct, send, eval",
    whitelist: "class Circle, class Rectangle, class Square, def area",
    sourcecode: `class Shape
  def area; 0; end
end

class Circle < Shape
  def initialize(r); @r = r; end
  def area; 3 * @r * @r; end
end

class Rectangle < Shape
  def initialize(w, h); @w = w; @h = h; end
  def area; @w * @h; end
end

class Square < Rectangle
  def initialize(s); super(s, s); end
end

n = gets.to_i
total = 0
n.times do
  parts = gets.split
  kind = parts[0]
  shape = case kind
  when "circle" then Circle.new(parts[1].to_i)
  when "rect" then Rectangle.new(parts[1].to_i, parts[2].to_i)
  when "square" then Square.new(parts[1].to_i)
  end
  total += shape.area
end
puts total
`,
  },
  {
    title: "Bank Branch Counter With Subclasses",
    description:
      "A bank tracks accounts across account types. Define a Bank base class with @@accounts and @@total_balance starting at 0. The constructor takes a balance and increments both class variables. Define class methods self.accounts, self.total_balance, and self.average (returns 0 when @@accounts is 0, otherwise integer division). Define Savings and Checking subclasses whose constructors call super(balance). Read n then n lines 'type balance' (type is S for savings, C for checking); print three lines: 'Accounts: <n>', 'Total: <total>', 'Avg: <avg>'.\n\nInput Format:\nLine 1: integer n. Next n lines: 'type balance' (type in S, C).\n\nOutput Format:\nThree lines as described.\n\nConstraints:\n0 <= n <= 100; 0 <= balance <= 1000000.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Class Variables and Class Methods",
    sampleinput1: "3\nS 100\nC 200\nS 300",
    sampleoutput1: "Accounts: 3\nTotal: 600\nAvg: 200",
    sampleinput2: "2\nC 50\nS 150",
    sampleoutput2: "Accounts: 2\nTotal: 200\nAvg: 100",
    input1: "1\nS 1000",
    output1: "Accounts: 1\nTotal: 1000\nAvg: 1000",
    input2: "4\nS 10\nS 20\nC 30\nC 40",
    output2: "Accounts: 4\nTotal: 100\nAvg: 25",
    input3: "0",
    output3: "Accounts: 0\nTotal: 0\nAvg: 0",
    inputconstrains: "0 <= n <= 100; 0 <= balance <= 1000000",
    blacklist: "Struct, instance_variable_get",
    whitelist: "@@accounts, def self.average, def initialize",
    sourcecode: `class Bank
  @@accounts = 0
  @@total_balance = 0
  def initialize(balance); @balance = balance; @@accounts += 1; @@total_balance += balance; end
  def self.accounts; @@accounts; end
  def self.total_balance; @@total_balance; end
  def self.average; @@accounts.zero? ? 0 : @@total_balance / @@accounts; end
end

class Savings < Bank
  def initialize(balance); super(balance); end
  def type; "Savings"; end
end

class Checking < Bank
  def initialize(balance); super(balance); end
  def type; "Checking"; end
end

n = gets.to_i
n.times do
  parts = gets.split
  kind = parts[0]
  bal = parts[1].to_i
  if kind == "S"
    Savings.new(bal)
  else
    Checking.new(bal)
  end
end
puts "Accounts: #{Bank.accounts}"
puts "Total: #{Bank.total_balance}"
puts "Avg: #{Bank.average}"
`,
  },
  {
    title: "Protected Balance Cross Instance Compare",
    description:
      "A leaderboard compares balances between two accounts using a protected method. Define an Account class with owner and balance. Define a public richer_than?(other) that returns balance > other.balance where balance is a protected method returning @balance. Define a public report(other) that returns '<owner> richer' if richer_than?(other) is true, else '<owner> not richer'. Read owner_a, balance_a, owner_b, balance_b; instantiate two Account objects and print a.report(b).\n\nInput Format:\nLine 1: owner_a. Line 2: integer balance_a. Line 3: owner_b. Line 4: integer balance_b.\n\nOutput Format:\n'<owner_a> richer' or '<owner_a> not richer'.\n\nConstraints:\n1 <= owner length <= 30; 0 <= balance <= 1000000.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Access Modifiers public private protected",
    sampleinput1: "Alice\n1000\nBob\n500",
    sampleoutput1: "Alice richer",
    sampleinput2: "Carol\n100\nDave\n5000",
    sampleoutput2: "Carol not richer",
    input1: "Eve\n0\nFrank\n0",
    output1: "Eve not richer",
    input2: "Greg\n1000\nHelen\n1000",
    output2: "Greg not richer",
    input3: "Ian\n1\nJoy\n0",
    output3: "Ian richer",
    inputconstrains: "1 <= owner length <= 30; 0 <= balance <= 1000000",
    blacklist: "instance_variable_get, public_send, attr_accessor",
    whitelist: "protected, def balance, def richer_than?",
    sourcecode: `class Account
  def initialize(owner, balance); @owner = owner; @balance = balance; end
  def richer_than?(other); balance > other.balance; end
  def report(other); richer_than?(other) ? "#{@owner} richer" : "#{@owner} not richer"; end
  protected
  def balance; @balance; end
end

a_name = gets.chomp
a_bal = gets.to_i
b_name = gets.chomp
b_bal = gets.to_i
a = Account.new(a_name, a_bal)
b = Account.new(b_name, b_bal)
puts a.report(b)
`,
  },
  {
    title: "Premium Tier Super Chain Describe",
    description:
      "A bank has a multi-tier Premium account. Define a base Account class with owner and a describe method returning 'Account[<owner>]'. Define Savings subclass that calls super(owner) in initialize, stores rate, and overrides describe to call super and append ' Savings[<rate>%]'. Define Premium subclass of Savings that calls super(owner, rate) in initialize, stores tier, and overrides describe to call super and append ' Premium[<tier>]'. Read n then n lines 'owner rate tier'; print each Premium account's describe on its own line.\n\nInput Format:\nLine 1: integer n. Next n lines: 'owner rate tier' (rate integer, tier single word).\n\nOutput Format:\nOne describe per line.\n\nConstraints:\n1 <= n <= 50; 1 <= owner length <= 30; 0 <= rate <= 20; 1 <= tier length <= 20.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "super Keyword",
    sampleinput1: "2\nAlice 5 Gold\nBob 3 Silver",
    sampleoutput1: "Account[Alice] Savings[5%] Premium[Gold]\nAccount[Bob] Savings[3%] Premium[Silver]",
    sampleinput2: "1\nCarol 10 Platinum",
    sampleoutput2: "Account[Carol] Savings[10%] Premium[Platinum]",
    input1: "1\nDan 1 Bronze",
    output1: "Account[Dan] Savings[1%] Premium[Bronze]",
    input2: "3\nA 2 X\nB 3 Y\nC 4 Z",
    output2: "Account[A] Savings[2%] Premium[X]\nAccount[B] Savings[3%] Premium[Y]\nAccount[C] Savings[4%] Premium[Z]",
    input3: "1\nZed 9 Top",
    output3: "Account[Zed] Savings[9%] Premium[Top]",
    inputconstrains: "1 <= n <= 50; 1 <= owner length <= 30; 0 <= rate <= 20; 1 <= tier length <= 20",
    blacklist: "Struct, OpenStruct",
    whitelist: "super, class Premium, class Savings",
    sourcecode: `class Account
  def initialize(owner); @owner = owner; end
  def describe; "Account[#{@owner}]"; end
end

class Savings < Account
  def initialize(owner, rate); super(owner); @rate = rate; end
  def describe; super + " Savings[#{@rate}%]"; end
end

class Premium < Savings
  def initialize(owner, rate, tier); super(owner, rate); @tier = tier; end
  def describe; super + " Premium[#{@tier}]"; end
end

n = gets.to_i
n.times do
  parts = gets.split
  p = Premium.new(parts[0], parts[1].to_i, parts[2])
  puts p.describe
end
`,
  },
];

const mcqs: MCQ[] = [
  // ===== EASY MCQ (10) =====
  {
    title: "Subclass Operator In Ruby",
    description: "Which operator is used to declare a subclass in Ruby?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Subclassing with Less-Than",
    Option1: "->",
    Option2: "<",
    Option3: ":",
    Option4: "extends",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Class Variable Prefix",
    description: "What prefix is used for class variables in Ruby?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Class Variables and Class Methods",
    Option1: "@",
    Option2: "$",
    Option3: "@@",
    Option4: "#",
    CorrectOption: 3,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Class Method Definition",
    description: "Which syntax correctly defines a class method named count on a Counter class?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Class Variables and Class Methods",
    Option1: "def count:",
    Option2: "def Counter.count; end",
    Option3: "def self.count; end",
    Option4: "static def count; end",
    CorrectOption: 3,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Super No Parens Behavior",
    description: "What does `super` (without parentheses) do inside an overridden method?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "super Keyword",
    Option1: "Calls the parent class version of the same method, forwarding the current method's arguments",
    Option2: "Skips the parent method and returns nil",
    Option3: "Calls Object#initialize",
    Option4: "Raises NoMethodError always",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Private Method Accessibility",
    description: "From where can a private instance method be called in Ruby?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Access Modifiers public private protected",
    Option1: "From anywhere with an explicit receiver",
    Option2: "Only from within the same class instance, without an explicit receiver",
    Option3: "Only from subclasses",
    Option4: "Only from class methods",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Single Inheritance Definition",
    description: "What does 'single inheritance' mean in Ruby?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Single Inheritance",
    Option1: "A class can have multiple parent classes",
    Option2: "A class can have exactly one direct superclass",
    Option3: "Only one method can be overridden per class",
    Option4: "Only one instance can exist at a time",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Super Empty Parens Behavior",
    description: "What does `super()` (with empty parentheses) do?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "super Keyword",
    Option1: "Calls the parent method passing no arguments",
    Option2: "Calls the parent method passing all current arguments",
    Option3: "Skips calling the parent method",
    Option4: "Raises ArgumentError",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Override Prints Subclass Message",
    description: "What does this Ruby code print?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Method Overriding",
    Option1: "Hello from A",
    Option2: "Hello from B",
    Option3: "Hello from AHello from B",
    Option4: "nil",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `class A
  def greet; "Hello from A"; end
end
class B < A
  def greet; "Hello from B"; end
end
puts B.new.greet`,
    snippetLang: "ruby",
  },
  {
    title: "Super Multiplies Value",
    description: "What does this Ruby code print?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "super Keyword",
    Option1: "10",
    Option2: "20",
    Option3: "5",
    Option4: "0",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `class A
  def initialize; @x = 10; end
  def x; @x; end
end
class B < A
  def x; super * 2; end
end
puts B.new.x`,
    snippetLang: "ruby",
  },
  {
    title: "Counter Class Method Output",
    description: "What does this Ruby code print?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Class Variables and Class Methods",
    Option1: "0",
    Option2: "1",
    Option3: "3",
    Option4: "nil",
    CorrectOption: 3,
    iscodesnippet: true,
    codesnippet: `class Counter
  @@n = 0
  def initialize; @@n += 1; end
  def self.n; @@n; end
end
Counter.new
Counter.new
Counter.new
puts Counter.n`,
    snippetLang: "ruby",
  },

  // ===== MEDIUM MCQ (6) =====
  {
    title: "Super Passing Argument",
    description: "What does this Ruby code print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "super Keyword",
    Option1: "A5 B5",
    Option2: "A:5 B:5",
    Option3: "A:5B:5",
    Option4: "A5B5",
    CorrectOption: 3,
    iscodesnippet: true,
    codesnippet: `class A
  def m(x); "A:#{x}"; end
end
class B < A
  def m(x); super(x) + " B:#{x}"; end
end
puts B.new.m(5)`,
    snippetLang: "ruby",
  },
  {
    title: "Private Method Called Internally",
    description: "What does this Ruby code print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Access Modifiers public private protected",
    Option1: "hidden",
    Option2: "NoMethodError: private method 'secret' called",
    Option3: "nil",
    Option4: "pub",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `class C
  def call_me; secret; end
  private
  def secret; "hidden"; end
end
puts C.new.call_me`,
    snippetLang: "ruby",
  },
  {
    title: "Protected Cross Instance Compare",
    description: "What does this Ruby code print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Access Modifiers public private protected",
    Option1: "true",
    Option2: "false",
    Option3: "NoMethodError",
    Option4: "nil",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `class Box
  def initialize(v); @v = v; end
  def bigger?(other); v > other.v; end
  protected
  def v; @v; end
end
a = Box.new(5)
b = Box.new(3)
puts a.bigger?(b)`,
    snippetLang: "ruby",
  },
  {
    title: "Private Vs Protected Difference",
    description: "What is the key difference between private and protected methods in Ruby?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Access Modifiers public private protected",
    Option1: "Private methods are inherited, protected are not",
    Option2: "Private methods can only be called without an explicit receiver; protected methods can be called on other instances of the same class",
    Option3: "Protected methods run faster than private methods",
    Option4: "There is no difference",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Class Variable Shared With Subclass",
    description: "What does this Ruby code print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Class Variables and Class Methods",
    Option1: "1",
    Option2: "2",
    Option3: "3",
    Option4: "0",
    CorrectOption: 3,
    iscodesnippet: true,
    codesnippet: `class Base
  @@count = 0
  def initialize; @@count += 1; end
  def self.count; @@count; end
end
class Derived < Base
  def initialize; super; end
end
Base.new
Derived.new
Derived.new
puts Base.count`,
    snippetLang: "ruby",
  },
  {
    title: "Method Resolution With Super",
    description: "What does this Ruby code print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Method Overriding",
    Option1: "P",
    Option2: "Q",
    Option3: "Q-P",
    Option4: "P-Q",
    CorrectOption: 3,
    iscodesnippet: true,
    codesnippet: `class P
  def who; "P"; end
end
class Q < P
  def who; "Q-#{super}"; end
end
puts Q.new.who`,
    snippetLang: "ruby",
  },

  // ===== HARD MCQ (4) =====
  {
    title: "Super Forwards Argument Value",
    description: "What does this Ruby code print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "super Keyword",
    Option1: "A1B1",
    Option2: "A1B7",
    Option3: "A7B7",
    Option4: "A7B1",
    CorrectOption: 3,
    iscodesnippet: true,
    codesnippet: `class A
  def m(x = 1); "A#{x}"; end
end
class B < A
  def m(x = 1); super + "B#{x}"; end
end
puts B.new.m(7)`,
    snippetLang: "ruby",
  },
  {
    title: "Method Visibility Chained Call",
    description: "What does this Ruby code print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Access Modifiers public private protected",
    Option1: "b",
    Option2: "bc",
    Option3: "bcd",
    Option4: "NoMethodError",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `class T
  def a; "a"; end
  def b; "b" + c; end
  private
  def c; "c"; end
  protected
  def d; "d"; end
end
t = T.new
puts t.b`,
    snippetLang: "ruby",
  },
  {
    title: "Class Variable Sharing Hierarchy",
    description: "What does this Ruby code print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Class Variables and Class Methods",
    Option1: "1",
    Option2: "2",
    Option3: "3",
    Option4: "0",
    CorrectOption: 3,
    iscodesnippet: true,
    codesnippet: `class Counter
  @@n = 0
  def self.inc; @@n += 1; end
  def self.n; @@n; end
end
class Sub < Counter; end
Sub.inc
Counter.inc
Sub.inc
puts Sub.n`,
    snippetLang: "ruby",
  },
  {
    title: "Super Forwards Splat Args",
    description: "What does this Ruby code print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "super Keyword",
    Option1: "10",
    Option2: "4",
    Option3: "0",
    Option4: "NoMethodError",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `class A
  def m(*args); args.sum; end
end
class B < A
  def m(*args); super; end
end
puts B.new.m(1, 2, 3, 4)`,
    snippetLang: "ruby",
  },
];

const d = String(DAY).padStart(2, "0");
writeFileSync(
  `scripts/ruby-programming/data/day-${d}.code.json`,
  JSON.stringify({ day: DAY, topics: [{ name: TOPIC, subtopics: SUBTOPICS }], questions }, null, 2),
);
writeFileSync(
  `scripts/ruby-programming/data/day-${d}.mcq.json`,
  JSON.stringify({ day: DAY, questions: mcqs }, null, 2),
);
console.log("wrote day", DAY);
