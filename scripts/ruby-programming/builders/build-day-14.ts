import { writeFileSync } from "node:fs";

const DAY = 14;
const TOPIC = "Object-Oriented Programming Basics";
const SUBTOPICS = [
  "Defining Classes",
  "Instance Variables",
  "Instance Methods",
  "attr_accessor Family",
  "Constructor (initialize)",
  "self Keyword",
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
    title: "Counter Constructor Storage",
    description:
      "Define a class `Counter` whose constructor stores an integer in `@value` and exposes it via an accessor method `value`. Read n and print `Counter.new(n).value`.\n\nInput Format:\nLine 1: integer n.\n\nOutput Format:\nThe same integer n.\n\nConstraints:\n-1000 <= n <= 1000.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Defining Classes",
    sampleinput1: "5",
    sampleoutput1: "5",
    sampleinput2: "42",
    sampleoutput2: "42",
    input1: "0",
    output1: "0",
    input2: "-9",
    output2: "-9",
    input3: "100",
    output3: "100",
    inputconstrains: "-1000 <= n <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `class Counter
  def initialize(n)
    @value = n
  end
  def value; @value end
end
n = gets.to_i
puts Counter.new(n).value
`,
  },
  {
    title: "Box Instance Variable Holder",
    description:
      "Define a class `Box` whose constructor stores a string in `@item` and exposes it via a method `item`. Read a string and print `Box.new(s).item`.\n\nInput Format:\nLine 1: a string s.\n\nOutput Format:\nThe same string s.\n\nConstraints:\nString length 1..50.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Instance Variables",
    sampleinput1: "apple",
    sampleoutput1: "apple",
    sampleinput2: "notebook",
    sampleoutput2: "notebook",
    input1: "x",
    output1: "x",
    input2: "hello",
    output2: "hello",
    input3: "ruby",
    output3: "ruby",
    inputconstrains: "String length 1..50",
    blacklist: "",
    whitelist: "",
    sourcecode: `class Box
  def initialize(item)
    @item = item
  end
  def item; @item end
end
s = gets.chomp
puts Box.new(s).item
`,
  },
  {
    title: "Greeter Instance Method",
    description:
      "Define a class `Greeter` with an instance method `greet(name)` that returns `Hello, <name>!`. Read a name and print `Greeter.new.greet(name)`.\n\nInput Format:\nLine 1: a name string.\n\nOutput Format:\n`Hello, <name>!`\n\nConstraints:\nName length 1..50.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Instance Methods",
    sampleinput1: "Alice",
    sampleoutput1: "Hello, Alice!",
    sampleinput2: "Bob",
    sampleoutput2: "Hello, Bob!",
    input1: "ruby",
    output1: "Hello, ruby!",
    input2: "Z",
    output2: "Hello, Z!",
    input3: "Hello",
    output3: "Hello, Hello!",
    inputconstrains: "Name length 1..50",
    blacklist: "",
    whitelist: "",
    sourcecode: `class Greeter
  def greet(name)
    "Hello, #{name}!"
  end
end
name = gets.chomp
puts Greeter.new.greet(name)
`,
  },
  {
    title: "Person attr_reader Name",
    description:
      "Define a class `Person` using `attr_reader :name` and a constructor that sets `@name`. Read a name and print `Person.new(name).name`.\n\nInput Format:\nLine 1: a name string.\n\nOutput Format:\nThe same name string.\n\nConstraints:\nName length 1..50.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "attr_accessor Family",
    sampleinput1: "Alice",
    sampleoutput1: "Alice",
    sampleinput2: "Bob",
    sampleoutput2: "Bob",
    input1: "ruby",
    output1: "ruby",
    input2: "Z",
    output2: "Z",
    input3: "Carol",
    output3: "Carol",
    inputconstrains: "Name length 1..50",
    blacklist: "",
    whitelist: "",
    sourcecode: `class Person
  attr_reader :name
  def initialize(name)
    @name = name
  end
end
n = gets.chomp
puts Person.new(n).name
`,
  },
  {
    title: "Item Constructor Price",
    description:
      "Define a class `Item` whose constructor stores an integer `@price` and exposes it via a method `price`. Read an integer and print `Item.new(p).price`.\n\nInput Format:\nLine 1: integer price.\n\nOutput Format:\nThe same integer price.\n\nConstraints:\n0 <= price <= 10000.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Constructor (initialize)",
    sampleinput1: "100",
    sampleoutput1: "100",
    sampleinput2: "5",
    sampleoutput2: "5",
    input1: "0",
    output1: "0",
    input2: "9999",
    output2: "9999",
    input3: "42",
    output3: "42",
    inputconstrains: "0 <= price <= 10000",
    blacklist: "",
    whitelist: "",
    sourcecode: `class Item
  def initialize(price)
    @price = price
  end
  def price; @price end
end
p = gets.to_i
puts Item.new(p).price
`,
  },
  {
    title: "Car self Class Reporter",
    description:
      "Define a class `Car` whose instance method `describe` returns `Make: <make> (<self.class>)`. Read a make and print `Car.new(make).describe`.\n\nInput Format:\nLine 1: a make string.\n\nOutput Format:\n`Make: <make> (Car)`\n\nConstraints:\nMake length 1..30.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "self Keyword",
    sampleinput1: "Tesla",
    sampleoutput1: "Make: Tesla (Car)",
    sampleinput2: "Honda",
    sampleoutput2: "Make: Honda (Car)",
    input1: "x",
    output1: "Make: x (Car)",
    input2: "Toyota",
    output2: "Make: Toyota (Car)",
    input3: "Ford",
    output3: "Make: Ford (Car)",
    inputconstrains: "Make length 1..30",
    blacklist: "",
    whitelist: "",
    sourcecode: `class Car
  def initialize(make)
    @make = make
  end
  def describe
    "Make: #{@make} (#{self.class})"
  end
end
m = gets.chomp
puts Car.new(m).describe
`,
  },
  // ===== EASY SCENARIO (4) =====
  {
    title: "Bank Account Deposit Scenario",
    description:
      "A new bank account starts with balance 0. The `BankAccount` class has a `deposit(amount)` instance method that increases `@balance`. Read a deposit amount and print the resulting balance.\n\nInput Format:\nLine 1: integer deposit amount.\n\nOutput Format:\nThe account balance after deposit.\n\nConstraints:\n0 <= amount <= 1000000.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Defining Classes",
    sampleinput1: "100",
    sampleoutput1: "100",
    sampleinput2: "250",
    sampleoutput2: "250",
    input1: "0",
    output1: "0",
    input2: "9999",
    output2: "9999",
    input3: "1",
    output3: "1",
    inputconstrains: "0 <= amount <= 1000000",
    blacklist: "",
    whitelist: "",
    sourcecode: `class BankAccount
  def initialize
    @balance = 0
  end
  def deposit(amount)
    @balance += amount
  end
  def balance; @balance end
end
amt = gets.to_i
acct = BankAccount.new
acct.deposit(amt)
puts acct.balance
`,
  },
  {
    title: "Student Grade Report Card",
    description:
      "A `Student` class stores `@name` and `@grade` set in the constructor and exposes them via the `report` instance method. Read a name and a grade (single tokens) and print the report.\n\nInput Format:\nLine 1: name and grade separated by space.\n\nOutput Format:\n`<name>: <grade>`\n\nConstraints:\nName and grade are single tokens, each length 1..20.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Instance Variables",
    sampleinput1: "Alice A",
    sampleoutput1: "Alice: A",
    sampleinput2: "Bob B",
    sampleoutput2: "Bob: B",
    input1: "Carol A",
    output1: "Carol: A",
    input2: "Dave C",
    output2: "Dave: C",
    input3: "Eve A",
    output3: "Eve: A",
    inputconstrains: "Name and grade are single tokens, each length 1..20",
    blacklist: "",
    whitelist: "",
    sourcecode: `class Student
  def initialize(name, grade)
    @name = name
    @grade = grade
  end
  def report
    "#{@name}: #{@grade}"
  end
end
name, grade = gets.split
puts Student.new(name, grade).report
`,
  },
  {
    title: "Book Title attr_accessor",
    description:
      "A `Book` class uses `attr_accessor :title` (no constructor). Read a title, set it via the accessor, and print it back.\n\nInput Format:\nLine 1: a title string.\n\nOutput Format:\nThe same title string.\n\nConstraints:\nTitle length 1..50.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "attr_accessor Family",
    sampleinput1: "Ruby",
    sampleoutput1: "Ruby",
    sampleinput2: "Dune",
    sampleoutput2: "Dune",
    input1: "x",
    output1: "x",
    input2: "Hello World",
    output2: "Hello World",
    input3: "1984",
    output3: "1984",
    inputconstrains: "Title length 1..50",
    blacklist: "",
    whitelist: "",
    sourcecode: `class Book
  attr_accessor :title
end
title = gets.chomp
b = Book.new
b.title = title
puts b.title
`,
  },
  {
    title: "Logger self Factory Method",
    description:
      "A `Logger` class provides a class method `self.create(msg)` that returns a new instance wrapping the message. The instance method `output` returns `[LOG] <msg>`. Read a message and print `Logger.create(msg).output`.\n\nInput Format:\nLine 1: a message string.\n\nOutput Format:\n`[LOG] <msg>`\n\nConstraints:\nMessage length 1..50.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "self Keyword",
    sampleinput1: "hello",
    sampleoutput1: "[LOG] hello",
    sampleinput2: "world",
    sampleoutput2: "[LOG] world",
    input1: "ruby",
    output1: "[LOG] ruby",
    input2: "x",
    output2: "[LOG] x",
    input3: "boot complete",
    output3: "[LOG] boot complete",
    inputconstrains: "Message length 1..50",
    blacklist: "",
    whitelist: "",
    sourcecode: `class Logger
  def initialize(msg)
    @msg = msg
  end
  def self.create(msg)
    new(msg)
  end
  def output; "[LOG] #{@msg}" end
end
m = gets.chomp
puts Logger.create(m).output
`,
  },
  // ===== MEDIUM SCENARIO (6) =====
  {
    title: "Rectangle Area Perimeter Methods",
    description:
      "A `Rectangle` class stores width `@w` and height `@h` set in the constructor and exposes instance methods `area` and `perimeter`. Read width and height on one line, then print area on the first line and perimeter on the second.\n\nInput Format:\nLine 1: integers w and h separated by space.\n\nOutput Format:\nLine 1: integer area. Line 2: integer perimeter.\n\nConstraints:\n1 <= w, h <= 1000.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Instance Methods",
    sampleinput1: "3 4",
    sampleoutput1: "12\n14",
    sampleinput2: "5 5",
    sampleoutput2: "25\n20",
    input1: "1 1",
    output1: "1\n4",
    input2: "10 20",
    output2: "200\n60",
    input3: "7 3",
    output3: "21\n20",
    inputconstrains: "1 <= w, h <= 1000",
    blacklist: "eval, send, instance_variable_get, define_method",
    whitelist: "def initialize, def area, def perimeter",
    sourcecode: `class Rectangle
  def initialize(w, h)
    @w = w
    @h = h
  end
  def area; @w * @h end
  def perimeter; 2 * (@w + @h) end
end
w, h = gets.split.map(&:to_i)
r = Rectangle.new(w, h)
puts r.area
puts r.perimeter
`,
  },
  {
    title: "Account attr_accessor Balance",
    description:
      "An `Account` class uses `attr_accessor :balance` and a constructor that sets the initial balance. Instance methods `deposit(amount)` and `withdraw(amount)` adjust the balance through the accessor. Read initial balance, deposit amount, and withdrawal amount on one line; print the final balance.\n\nInput Format:\nLine 1: integers balance, deposit, withdrawal separated by spaces.\n\nOutput Format:\nThe integer final balance.\n\nConstraints:\n0 <= balance, deposit, withdrawal <= 1000000.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "attr_accessor Family",
    sampleinput1: "100 50 30",
    sampleoutput1: "120",
    sampleinput2: "1000 0 250",
    sampleoutput2: "750",
    input1: "0 100 0",
    output1: "100",
    input2: "500 200 700",
    output2: "0",
    input3: "1 1 1",
    output3: "1",
    inputconstrains: "0 <= balance, deposit, withdrawal <= 1000000",
    blacklist: "eval, send, instance_variable_get, define_method",
    whitelist: "attr_accessor :balance, def deposit, def withdraw",
    sourcecode: `class Account
  attr_accessor :balance
  def initialize(balance)
    @balance = balance
  end
  def deposit(amount)
    self.balance = balance + amount
  end
  def withdraw(amount)
    self.balance = balance - amount
  end
end
bal, dep, wd = gets.split.map(&:to_i)
acct = Account.new(bal)
acct.deposit(dep)
acct.withdraw(wd)
puts acct.balance
`,
  },
  {
    title: "Cart Item Constructor Total",
    description:
      "A `CartItem` class stores `@name`, `@price`, and `@qty` set in the constructor and exposes a `total` instance method returning `@price * @qty`. Read name, price, and qty on one line; print the total.\n\nInput Format:\nLine 1: name, price, qty separated by spaces.\n\nOutput Format:\nThe integer total.\n\nConstraints:\nName length 1..20; 0 <= price, qty <= 1000.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Constructor (initialize)",
    sampleinput1: "apple 5 3",
    sampleoutput1: "15",
    sampleinput2: "book 10 2",
    sampleoutput2: "20",
    input1: "pen 1 100",
    output1: "100",
    input2: "x 7 7",
    output2: "49",
    input3: "y 0 5",
    output3: "0",
    inputconstrains: "Name length 1..20; 0 <= price, qty <= 1000",
    blacklist: "eval, send, instance_variable_get, define_method",
    whitelist: "def initialize, def total",
    sourcecode: `class CartItem
  def initialize(name, price, qty)
    @name = name
    @price = price
    @qty = qty
  end
  def total
    @price * @qty
  end
end
name, price, qty = gets.split
item = CartItem.new(name, price.to_i, qty.to_i)
puts item.total
`,
  },
  {
    title: "Temperature self Fahrenheit",
    description:
      "A `Temperature` class stores `@celsius` set in the constructor and defines a class method `self.to_fahrenheit(c)` that returns `(c * 9.0 / 5.0) + 32.0`. The instance method `in_fahrenheit` calls `self.class.to_fahrenheit(@celsius)`. Read a celsius float and print the fahrenheit value formatted to two decimals.\n\nInput Format:\nLine 1: float celsius.\n\nOutput Format:\n`X.XX` fahrenheit value to two decimals.\n\nConstraints:\n-1000.0 <= c <= 1000.0.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "self Keyword",
    sampleinput1: "0",
    sampleoutput1: "32.00",
    sampleinput2: "100",
    sampleoutput2: "212.00",
    input1: "25",
    output1: "77.00",
    input2: "-40",
    output2: "-40.00",
    input3: "37",
    output3: "98.60",
    inputconstrains: "-1000.0 <= c <= 1000.0",
    blacklist: "eval, send, instance_variable_get, define_method, lambda",
    whitelist: "def self.to_fahrenheit, self.class",
    sourcecode: `class Temperature
  def initialize(celsius)
    @celsius = celsius
  end
  def self.to_fahrenheit(c)
    (c * 9.0 / 5.0) + 32.0
  end
  def in_fahrenheit
    self.class.to_fahrenheit(@celsius)
  end
end
c = gets.to_f
puts "%.2f" % Temperature.new(c).in_fahrenheit
`,
  },
  {
    title: "Point Manhattan Distance",
    description:
      "A `Point` class stores `@x`, `@y` set in the constructor with read methods `x` and `y`. The instance method `distance_to(other)` returns the Manhattan distance `|x1-x2| + |y1-y2|`. Read four integers x1 y1 x2 y2 and print the distance.\n\nInput Format:\nLine 1: four integers separated by spaces.\n\nOutput Format:\nThe integer Manhattan distance.\n\nConstraints:\n-1000 <= x, y <= 1000.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Instance Variables",
    sampleinput1: "0 0 3 4",
    sampleoutput1: "7",
    sampleinput2: "1 1 4 5",
    sampleoutput2: "7",
    input1: "5 5 5 5",
    output1: "0",
    input2: "0 0 0 0",
    output2: "0",
    input3: "10 0 0 10",
    output3: "20",
    inputconstrains: "-1000 <= x, y <= 1000",
    blacklist: "Math.sqrt, **, eval, send, define_method",
    whitelist: "def initialize, def distance_to",
    sourcecode: `class Point
  def initialize(x, y)
    @x = x
    @y = y
  end
  def distance_to(other)
    (@x - other.x).abs + (@y - other.y).abs
  end
  def x; @x end
  def y; @y end
end
x1, y1, x2, y2 = gets.split.map(&:to_i)
p1 = Point.new(x1, y1)
p2 = Point.new(x2, y2)
puts p1.distance_to(p2)
`,
  },
  {
    title: "Book attr_reader attr_writer",
    description:
      "A `Book` class uses `attr_reader :title, :author` and `attr_writer :rating` (but NOT attr_accessor). The constructor sets title and author; rating is set later via the writer. The `to_s` instance method returns `Book{title=<title>, author=<author>, rating=<rating>}`. Read title, author, and rating on one line; print the book string.\n\nInput Format:\nLine 1: title, author, rating separated by spaces.\n\nOutput Format:\n`Book{title=<title>, author=<author>, rating=<rating>}`\n\nConstraints:\nName lengths 1..20; 0 <= rating <= 10.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "attr_accessor Family",
    sampleinput1: "RubyStr Pick 5",
    sampleoutput1: "Book{title=RubyStr, author=Pick, rating=5}",
    sampleinput2: "Dune Herbert 4",
    sampleoutput2: "Book{title=Dune, author=Herbert, rating=4}",
    input1: "X Y 3",
    output1: "Book{title=X, author=Y, rating=3}",
    input2: "A B 0",
    output2: "Book{title=A, author=B, rating=0}",
    input3: "Title Auth 10",
    output3: "Book{title=Title, author=Auth, rating=10}",
    inputconstrains: "Name lengths 1..20; 0 <= rating <= 10",
    blacklist: "attr_accessor, eval, send, define_method",
    whitelist: "attr_reader :title, attr_writer :rating",
    sourcecode: `class Book
  attr_reader :title, :author
  attr_writer :rating
  def initialize(title, author)
    @title = title
    @author = author
  end
  def rating; @rating end
  def to_s
    "Book{title=#{title}, author=#{author}, rating=#{rating}}"
  end
end
title, author, rating = gets.split
b = Book.new(title, author)
b.rating = rating.to_i
puts b
`,
  },
  // ===== HARD SCENARIO (4) =====
  {
    title: "Stack Push Pop Operations",
    description:
      "Implement a `Stack` class backed by an instance variable array `@items` set in `initialize`. Provide instance methods `push(x)`, `pop`, `peek`, `size`, and `empty?`. Read n then n commands (`push X`, `pop`, `peek`, `size`, or `empty`). For each command print the corresponding result line.\n\nInput Format:\nLine 1: integer n. Next n lines: a command (and integer arg for push).\n\nOutput Format:\nOne output line per command.\n\nConstraints:\n1 <= n <= 100; -1000 <= X <= 1000.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Instance Methods",
    sampleinput1: "5\npush 10\npush 20\npeek\nsize\npop",
    sampleoutput1: "pushed 10\npushed 20\ntop 20\n2\npopped 20",
    sampleinput2: "3\nempty\npush 5\nempty",
    sampleoutput2: "true\npushed 5\nfalse",
    input1: "4\npop\npeek\npush 1\nsize",
    output1: "empty\nempty\npushed 1\n1",
    input2: "6\npush 1\npush 2\npush 3\npop\npop\nsize",
    output2: "pushed 1\npushed 2\npushed 3\npopped 3\npopped 2\n1",
    input3: "2\npush 99\npeek",
    output3: "pushed 99\ntop 99",
    inputconstrains: "1 <= n <= 100; -1000 <= X <= 1000",
    blacklist: "eval, send, define_method, instance_variable_get",
    whitelist: "def push, def pop, def initialize",
    sourcecode: `class Stack
  def initialize
    @items = []
  end
  def push(x)
    @items.push(x)
  end
  def pop
    @items.pop
  end
  def peek
    @items.last
  end
  def size
    @items.length
  end
  def empty?
    @items.empty?
  end
end
n = gets.to_i
stack = Stack.new
n.times do
  cmd = gets.split
  case cmd[0]
  when "push"
    stack.push(cmd[1].to_i)
    puts "pushed #{cmd[1]}"
  when "pop"
    val = stack.pop
    puts val.nil? ? "empty" : "popped #{val}"
  when "peek"
    val = stack.peek
    puts val.nil? ? "empty" : "top #{val}"
  when "size"
    puts stack.size
  when "empty"
    puts stack.empty?
  end
end
`,
  },
  {
    title: "Bank Account Multi Operation Statement",
    description:
      "An `Account` class stores `@balance` and a `@transactions` array (both set in `initialize`). Instance methods `deposit(amount)` and `withdraw(amount)` mutate both. The `statement` method prints `Balance: <bal>`, `Transactions: <count>`, and the comma-joined transaction labels (only if any). Read initial balance, then n, then n `deposit X` or `withdraw X` commands.\n\nInput Format:\nLine 1: integer balance. Line 2: integer n. Next n lines: `deposit X` or `withdraw X`.\n\nOutput Format:\nTwo or three lines from `statement`.\n\nConstraints:\n0 <= balance, amounts <= 1000000; 0 <= n <= 100.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Constructor (initialize)",
    sampleinput1: "100\n3\ndeposit 50\nwithdraw 30\ndeposit 10",
    sampleoutput1: "Balance: 130\nTransactions: 3\n+50,-30,+10",
    sampleinput2: "0\n2\ndeposit 100\nwithdraw 25",
    sampleoutput2: "Balance: 75\nTransactions: 2\n+100,-25",
    input1: "0\n0",
    output1: "Balance: 0\nTransactions: 0",
    input2: "500\n2\nwithdraw 100\nwithdraw 50",
    output2: "Balance: 350\nTransactions: 2\n-100,-50",
    input3: "1000\n3\ndeposit 1\ndeposit 2\ndeposit 3",
    output3: "Balance: 1006\nTransactions: 3\n+1,+2,+3",
    inputconstrains: "0 <= balance, amounts <= 1000000; 0 <= n <= 100",
    blacklist: "eval, send, instance_variable_get, define_method, lambda",
    whitelist: "def initialize, def deposit, def withdraw, def statement",
    sourcecode: `class Account
  def initialize(balance)
    @balance = balance
    @transactions = []
  end
  def deposit(amount)
    @balance += amount
    @transactions << "+#{amount}"
  end
  def withdraw(amount)
    @balance -= amount
    @transactions << "-#{amount}"
  end
  def statement
    puts "Balance: #{@balance}"
    puts "Transactions: #{@transactions.length}"
    puts @transactions.join(",") if @transactions.any?
  end
end
bal = gets.to_i
acct = Account.new(bal)
n = gets.to_i
n.times do
  op, amt = gets.split
  if op == "deposit"
    acct.deposit(amt.to_i)
  elsif op == "withdraw"
    acct.withdraw(amt.to_i)
  end
end
acct.statement
`,
  },
  {
    title: "Inventory self Empty Factory",
    description:
      "An `Inventory` class stores `@items` (hash) set in `initialize`. The class method `self.empty` returns a new instance. The instance method `add(name, qty)` accumulates quantities; `total` returns the sum. Read n then n `name qty` pairs. Use `Inventory.empty` to construct, then print the total quantity.\n\nInput Format:\nLine 1: integer n. Next n lines: `name qty` separated by space.\n\nOutput Format:\nThe integer total quantity.\n\nConstraints:\n1 <= n <= 1000; 0 <= qty <= 10000; name length 1..20.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "self Keyword",
    sampleinput1: "3\napple 5\nbanana 3\napple 2",
    sampleoutput1: "10",
    sampleinput2: "2\npen 10\nnotebook 4",
    sampleoutput2: "14",
    input1: "1\nx 100",
    output1: "100",
    input2: "4\na 1\nb 2\nc 3\nd 4",
    output2: "10",
    input3: "3\nA 0\nB 5\nA 0",
    output3: "5",
    inputconstrains: "1 <= n <= 1000; 0 <= qty <= 10000; name length 1..20",
    blacklist: "eval, send, instance_variable_get, define_method, lambda",
    whitelist: "def self.empty, def add, def total",
    sourcecode: `class Inventory
  def initialize
    @items = {}
  end
  def self.empty
    new
  end
  def add(name, qty)
    @items[name] = (@items[name] || 0) + qty
  end
  def total
    t = 0
    @items.each { |name, qty| t += qty }
    t
  end
end
n = gets.to_i
inv = Inventory.empty
n.times do
  name, qty = gets.split
  inv.add(name, qty.to_i)
end
puts inv.total
`,
  },
  {
    title: "Employee Salary Raise Bonus",
    description:
      "An `Employee` class uses `attr_reader :name, :salary, :department` and a constructor setting all three. The instance method `raise_salary(pct)` updates `@salary` to `(@salary * (100 + pct)) / 100` (integer). The `bonus` instance method returns `@salary / 10`. Read name, salary, department, and raise percentage on one line; apply the raise and print the new salary and the bonus.\n\nInput Format:\nLine 1: name, salary, department, pct separated by spaces.\n\nOutput Format:\nLine 1: integer new salary. Line 2: integer bonus.\n\nConstraints:\nName length 1..20; 1 <= salary <= 100000; department length 1..10; 0 <= pct <= 100.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Defining Classes",
    sampleinput1: "Alice 100 Eng 10",
    sampleoutput1: "110\n11",
    sampleinput2: "Bob 200 Sales 5",
    sampleoutput2: "210\n21",
    input1: "Carol 1000 IT 0",
    output1: "1000\n100",
    input2: "Dave 50 HR 100",
    output2: "100\n10",
    input3: "Eve 7 X 50",
    output3: "10\n1",
    inputconstrains: "Name length 1..20; 1 <= salary <= 100000; department length 1..10; 0 <= pct <= 100",
    blacklist: "eval, send, instance_variable_get, define_method, lambda",
    whitelist: "def initialize, def raise_salary, def bonus, attr_reader",
    sourcecode: `class Employee
  attr_reader :name, :salary, :department
  def initialize(name, salary, department)
    @name = name
    @salary = salary
    @department = department
  end
  def raise_salary(pct)
    @salary = (@salary * (100 + pct)) / 100
  end
  def bonus
    @salary / 10
  end
end
name, salary, dept, pct = gets.split
emp = Employee.new(name, salary.to_i, dept)
emp.raise_salary(pct.to_i)
puts emp.salary
puts emp.bonus
`,
  },
];

const mcqs: MCQ[] = [
  // ===== EASY MCQ (10) =====
  {
    title: "Class Definition Keyword",
    description: "Which Ruby keyword declares a class?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Defining Classes",
    Option1: "class",
    Option2: "module",
    Option3: "def",
    Option4: "type",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Constructor Method Name",
    description: "What is the name of Ruby's constructor method invoked when an object is created with `new`?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Constructor (initialize)",
    Option1: "initialize",
    Option2: "constructor",
    Option3: "init",
    Option4: "new",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Instance Variable Sigil",
    description: "Which character prefix denotes an instance variable in Ruby?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Instance Variables",
    Option1: "@",
    Option2: "$",
    Option3: "@@",
    Option4: "%",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Class Variable Sigil",
    description: "Which prefix denotes a class variable (shared across all instances of a class)?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Instance Variables",
    Option1: "@@",
    Option2: "@",
    Option3: "$",
    Option4: "&",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "attr_reader Purpose",
    description: "What does `attr_reader :name` generate on a class?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "attr_accessor Family",
    Option1: "A getter method only",
    Option2: "A setter method only",
    Option3: "Both getter and setter",
    Option4: "An instance variable",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "attr_writer Purpose",
    description: "What does `attr_writer :name` generate on a class?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "attr_accessor Family",
    Option1: "A setter method only",
    Option2: "A getter method only",
    Option3: "Both getter and setter",
    Option4: "A constant",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "attr_accessor Purpose",
    description: "What does `attr_accessor :name` generate on a class?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "attr_accessor Family",
    Option1: "Both getter and setter",
    Option2: "Getter only",
    Option3: "Setter only",
    Option4: "A class method",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "self Inside Instance Method",
    description: "Inside an instance method, what does `self` refer to?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "self Keyword",
    Option1: "The current instance (the receiver of the method call)",
    Option2: "The class itself",
    Option3: "nil",
    Option4: "The method name as a symbol",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "self In Class Body",
    description: "Inside the class body (not inside an instance method), `self` refers to what?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "self Keyword",
    Option1: "The class itself",
    Option2: "An instance of the class",
    Option3: "nil",
    Option4: "The superclass",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Object Creation Method",
    description: "Which method creates a new instance of a class in Ruby?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Constructor (initialize)",
    Option1: "new",
    Option2: "create",
    Option3: "make",
    Option4: "init",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  // ===== MEDIUM MCQ (6) =====
  {
    title: "Instance Variable Default Value",
    description: "What does the following snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Instance Variables",
    Option1: "nil",
    Option2: "0",
    Option3: "error: undefined method y",
    Option4: "5",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `class C
  def initialize
    @x = 5
  end
  def y; @y end
end
puts C.new.y
`,
    snippetLang: "ruby",
  },
  {
    title: "attr_accessor Output Trace",
    description: "What does the following snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "attr_accessor Family",
    Option1: "B",
    Option2: "A",
    Option3: "nil",
    Option4: "error: undefined method name=",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `class P
  attr_accessor :name
  def initialize(n) @name = n end
end
p = P.new("A")
p.name = "B"
puts p.name
`,
    snippetLang: "ruby",
  },
  {
    title: "self Class Method Output",
    description: "What does the following snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "self Keyword",
    Option1: "class",
    Option2: "instance",
    Option3: "error: undefined method foo for M:Class",
    Option4: "nil",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `class M
  def self.foo; "class" end
  def foo; "instance" end
end
puts M.foo
`,
    snippetLang: "ruby",
  },
  {
    title: "Instance Variable Scope Per Object",
    description: "What does the following snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Instance Variables",
    Option1: "3",
    Option2: "1",
    Option3: "2",
    Option4: "0",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `class Counter
  def initialize; @count = 0 end
  def inc; @count += 1 end
  def count; @count end
end
a = Counter.new
b = Counter.new
a.inc
a.inc
b.inc
puts a.count + b.count
`,
    snippetLang: "ruby",
  },
  {
    title: "Class Variable Sharing Count",
    description: "What does the following snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Instance Variables",
    Option1: "3",
    Option2: "1",
    Option3: "0",
    Option4: "error: undefined class variable",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `class T
  @@count = 0
  def initialize; @@count += 1 end
  def self.count; @@count end
end
T.new; T.new; T.new
puts T.count
`,
    snippetLang: "ruby",
  },
  {
    title: "Instance Variable Privacy",
    description: "Are Ruby instance variables `@x` accessible directly from outside the class?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Instance Variables",
    Option1: "No — they are private and require accessor methods",
    Option2: "Yes — they are public by default",
    Option3: "Only if prefixed with $",
    Option4: "Only within the same source file",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  // ===== HARD MCQ (4) =====
  {
    title: "self Receiver Method Call",
    description: "What does the following snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "self Keyword",
    Option1: "10",
    Option2: "5",
    Option3: "0",
    Option4: "error: undefined method add",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `class Calc
  def initialize(v) @v = v end
  def double; self.add(@v) end
  def add(x); @v + x end
end
puts Calc.new(5).double
`,
    snippetLang: "ruby",
  },
  {
    title: "Initialize Default Argument",
    description: "What does the following snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Constructor (initialize)",
    Option1: "X then Y",
    Option2: "Y then X",
    Option3: "X then X",
    Option4: "error then Y",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `class G
  def initialize(name = "X")
    @name = name
  end
  def name; @name end
end
puts G.new.name
puts G.new("Y").name
`,
    snippetLang: "ruby",
  },
  {
    title: "Attr Accessor Override Output",
    description: "What does the following snippet print? The class defines attr_accessor :v and then overrides the getter method v.",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "attr_accessor Family",
    Option1: "10",
    Option2: "5",
    Option3: "6",
    Option4: "3",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `class A
  attr_accessor :v
  def initialize(v) @v = v end
  def v; @v * 2 end
end
a = A.new(3)
a.v = 5
puts a.v
`,
    snippetLang: "ruby",
  },
  {
    title: "Class Method self Factory",
    description: "What does the following snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "self Keyword",
    Option1: "42",
    Option2: "error: undefined method x",
    Option3: "nil",
    Option4: "K",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `class K
  def self.create
    new
  end
  def initialize
    @x = 42
  end
  def x; @x end
end
puts K.create.x
`,
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
