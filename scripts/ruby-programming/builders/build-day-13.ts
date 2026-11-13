import { writeFileSync } from "node:fs";

const DAY = 13;
const TOPIC = "Modules and Mixins";
const SUBTOPICS = [
  "Defining Modules",
  "Namespacing with Modules",
  "include Mixin",
  "extend Mixin",
  "prepend Mixin",
  "Comparable and Enumerable Mixins",
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
    title: "Module Constant Multiplier",
    description:
      "A geometry helper defines module `Area` with a constant `PI = 3`. Read a radius r and print `Area::PI * r * r`.\n\nInput Format:\nLine 1: integer r.\n\nOutput Format:\nThe integer product of the module constant and r squared.\n\nConstraints:\n1 <= r <= 1000.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Defining Modules",
    sampleinput1: "2",
    sampleoutput1: "12",
    sampleinput2: "3",
    sampleoutput2: "27",
    input1: "1",
    output1: "3",
    input2: "5",
    output2: "75",
    input3: "10",
    output3: "300",
    inputconstrains: "1 <= r <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `module Area
  PI = 3
end
r = gets.to_i
puts Area::PI * r * r
`,
  },
  {
    title: "Nested Namespace Constant Lookup",
    description:
      "Module `Geometry` contains module `Shapes` which holds constant `SQUARES = 4`. Read integer n and print `Geometry::Shapes::SQUARES * n`.\n\nInput Format:\nLine 1: integer n.\n\nOutput Format:\nThe integer product.\n\nConstraints:\n1 <= n <= 1000.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Namespacing with Modules",
    sampleinput1: "5",
    sampleoutput1: "20",
    sampleinput2: "3",
    sampleoutput2: "12",
    input1: "1",
    output1: "4",
    input2: "10",
    output2: "40",
    input3: "100",
    output3: "400",
    inputconstrains: "1 <= n <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `module Geometry
  module Shapes
    SQUARES = 4
  end
end
n = gets.to_i
puts Geometry::Shapes::SQUARES * n
`,
  },
  {
    title: "Include Mixin Greeting",
    description:
      "Module `Greetable` defines `hello(name)`. Class `User` includes `Greetable`. Read a name and print the result of `User.new.hello(name)`.\n\nInput Format:\nLine 1: a name string.\n\nOutput Format:\n`Hi, <name>!`\n\nConstraints:\nName length 1..50.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "include Mixin",
    sampleinput1: "Alice",
    sampleoutput1: "Hi, Alice!",
    sampleinput2: "Bob",
    sampleoutput2: "Hi, Bob!",
    input1: "ruby",
    output1: "Hi, ruby!",
    input2: "Z",
    output2: "Hi, Z!",
    input3: "Hello",
    output3: "Hi, Hello!",
    inputconstrains: "Name length 1..50",
    blacklist: "",
    whitelist: "",
    sourcecode: `module Greetable
  def hello(name)
    "Hi, #{name}!"
  end
end
class User
  include Greetable
end
name = gets.chomp
puts User.new.hello(name)
`,
  },
  {
    title: "Extend Mixin Class Method",
    description:
      "Module `Describable` defines `describe`. Class `Item` extends `Describable`. Read a tag, then print `Item.describe` followed by the tag.\n\nInput Format:\nLine 1: a tag string.\n\nOutput Format:\nTwo lines: `described` then the tag.\n\nConstraints:\nTag length 1..50.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "extend Mixin",
    sampleinput1: "box",
    sampleoutput1: "described\nbox",
    sampleinput2: "bottle",
    sampleoutput2: "described\nbottle",
    input1: "x",
    output1: "described\nx",
    input2: "ruby",
    output2: "described\nruby",
    input3: "tool",
    output3: "described\ntool",
    inputconstrains: "Tag length 1..50",
    blacklist: "",
    whitelist: "",
    sourcecode: `module Describable
  def describe
    "described"
  end
end
class Item
  extend Describable
end
tag = gets.chomp
puts Item.describe
puts tag
`,
  },
  {
    title: "Prepend Override Chain",
    description:
      "Module `Logged` is prepended into `Speaker`. `Speaker#speak(msg)` returns `\"said: #{msg}\"` and `Logged#speak(msg)` returns `\"LOG: \" + super`. Read a message and print `Speaker.new.speak(msg)`.\n\nInput Format:\nLine 1: a message string.\n\nOutput Format:\n`LOG: said: <msg>`\n\nConstraints:\nMessage length 1..50.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "prepend Mixin",
    sampleinput1: "hi",
    sampleoutput1: "LOG: said: hi",
    sampleinput2: "world",
    sampleoutput2: "LOG: said: world",
    input1: "ruby",
    output1: "LOG: said: ruby",
    input2: "a",
    output2: "LOG: said: a",
    input3: "hello there",
    output3: "LOG: said: hello there",
    inputconstrains: "Message length 1..50",
    blacklist: "",
    whitelist: "",
    sourcecode: `module Logged
  def speak(msg)
    "LOG: " + super
  end
end
class Speaker
  prepend Logged
  def speak(msg)
    "said: #{msg}"
  end
end
msg = gets.chomp
puts Speaker.new.speak(msg)
`,
  },
  {
    title: "Comparable Spaceship Sort Three",
    description:
      "Class `Box` includes `Comparable` and defines `<=>`. Read three integers on one line, build three `Box` instances, sort them ascending via `<=>`, and print their values space-separated.\n\nInput Format:\nLine 1: three integers separated by spaces.\n\nOutput Format:\nThree integers sorted ascending, space-separated on one line.\n\nConstraints:\n-1000 <= v <= 1000.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Comparable and Enumerable Mixins",
    sampleinput1: "3 1 2",
    sampleoutput1: "1 2 3",
    sampleinput2: "9 5 7",
    sampleoutput2: "5 7 9",
    input1: "4 4 1",
    output1: "1 4 4",
    input2: "8 2 5",
    output2: "2 5 8",
    input3: "1 2 3",
    output3: "1 2 3",
    inputconstrains: "Exactly 3 integers per line, -1000 <= v <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `class Box
  include Comparable
  attr_reader :v
  def initialize(v) @v = v end
  def <=>(other) @v <=> other.v end
end
arr = gets.split.map { |s| Box.new(s.to_i) }
sorted = arr.sort
puts sorted.map(&:v).join(" ")
`,
  },
  // ===== EASY SCENARIO (4) =====
  {
    title: "Library Book Namespace Catalog",
    description:
      "A library system stores books under the `Library` namespace. The `Library::Book` class accepts a title in its constructor and produces a catalog line. Read a book title and print `Library::Book.new(title).catalog`.\n\nInput Format:\nLine 1: a book title (may contain spaces).\n\nOutput Format:\n`Catalog: <title>`\n\nConstraints:\nTitle length 1..50.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Namespacing with Modules",
    sampleinput1: "Ruby",
    sampleoutput1: "Catalog: Ruby",
    sampleinput2: "Dune",
    sampleoutput2: "Catalog: Dune",
    input1: "Book A",
    output1: "Catalog: Book A",
    input2: "x",
    output2: "Catalog: x",
    input3: "hello world",
    output3: "Catalog: hello world",
    inputconstrains: "Title length 1..50",
    blacklist: "",
    whitelist: "",
    sourcecode: `module Library
  class Book
    attr_reader :title
    def initialize(title)
      @title = title
    end
    def catalog
      "Catalog: #{@title}"
    end
  end
end
title = gets.chomp
puts Library::Book.new(title).catalog
`,
  },
  {
    title: "Discount Cart Include Mixin",
    description:
      "An e-commerce cart mixes in `Discountable` (which gives 10 percent off via `discount(price)`). Read a price and print `Cart.new.discount(price)`.\n\nInput Format:\nLine 1: integer price.\n\nOutput Format:\nThe discounted price (integer).\n\nConstraints:\n0 <= price <= 100000.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "include Mixin",
    sampleinput1: "100",
    sampleoutput1: "90",
    sampleinput2: "200",
    sampleoutput2: "180",
    input1: "0",
    output1: "0",
    input2: "5",
    output2: "4",
    input3: "1000",
    output3: "900",
    inputconstrains: "0 <= price <= 100000",
    blacklist: "",
    whitelist: "",
    sourcecode: `module Discountable
  def discount(price)
    (price * 0.9).to_i
  end
end
class Cart
  include Discountable
end
price = gets.to_i
puts Cart.new.discount(price)
`,
  },
  {
    title: "Door Polite Extend Greeting",
    description:
      "A smart doorbell class `Door` extends the `Polite` module so that the class itself can greet visitors. Read a guest name and print `Door.greet(name)`.\n\nInput Format:\nLine 1: a guest name (may contain spaces).\n\nOutput Format:\n`Welcome, <name>!`\n\nConstraints:\nName length 1..50.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "extend Mixin",
    sampleinput1: "Alice",
    sampleoutput1: "Welcome, Alice!",
    sampleinput2: "Bob",
    sampleoutput2: "Welcome, Bob!",
    input1: "ruby",
    output1: "Welcome, ruby!",
    input2: "Z",
    output2: "Welcome, Z!",
    input3: "Guest 1",
    output3: "Welcome, Guest 1!",
    inputconstrains: "Name length 1..50",
    blacklist: "",
    whitelist: "",
    sourcecode: `module Polite
  def greet(name)
    "Welcome, #{name}!"
  end
end
class Door
  extend Polite
end
name = gets.chomp
puts Door.greet(name)
`,
  },
  {
    title: "Comparable Score Card Verdict",
    description:
      "Two players hold a `ScoreCard` that includes `Comparable`. Read two scores, one per line. Print `First wins` if the first card is greater, `Second wins` if the second is greater, otherwise `Tie`.\n\nInput Format:\nLine 1: integer score A. Line 2: integer score B.\n\nOutput Format:\nOne of `First wins`, `Second wins`, `Tie`.\n\nConstraints:\n-1000 <= score <= 1000.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Comparable and Enumerable Mixins",
    sampleinput1: "10\n5",
    sampleoutput1: "First wins",
    sampleinput2: "3\n7",
    sampleoutput2: "Second wins",
    input1: "5\n5",
    output1: "Tie",
    input2: "100\n1",
    output2: "First wins",
    input3: "0\n1",
    output3: "Second wins",
    inputconstrains: "-1000 <= score <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `class ScoreCard
  include Comparable
  attr_reader :score
  def initialize(s) @score = s end
  def <=>(other) @score <=> other.score end
end
a = ScoreCard.new(gets.to_i)
b = ScoreCard.new(gets.to_i)
puts a > b ? "First wins" : (b > a ? "Second wins" : "Tie")
`,
  },
  // ===== MEDIUM SCENARIO (6) =====
  {
    title: "Enumerable Reading Log Stats",
    description:
      "A sensor readings aggregator class `ReadingLog` mixes in `Enumerable` and exposes `each`. Read n then n integer readings. Compute the total, the highest reading, and the count manually by iterating with `each`. Print three lines: `Total: X`, `Top: Y`, `Count: Z`.\n\nInput Format:\nLine 1: integer n. Next n lines: one integer reading each.\n\nOutput Format:\nThree lines as described.\n\nConstraints:\n1 <= n <= 1000; -10000 <= reading <= 10000.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Comparable and Enumerable Mixins",
    sampleinput1: "3\n10\n20\n5",
    sampleoutput1: "Total: 35\nTop: 20\nCount: 3",
    sampleinput2: "4\n7\n7\n7\n7",
    sampleoutput2: "Total: 28\nTop: 7\nCount: 4",
    input1: "1\n100",
    output1: "Total: 100\nTop: 100\nCount: 1",
    input2: "5\n-3\n8\n-1\n4\n0",
    output2: "Total: 8\nTop: 8\nCount: 5",
    input3: "2\n5\n3",
    output3: "Total: 8\nTop: 5\nCount: 2",
    inputconstrains: "1 <= n <= 1000; -10000 <= reading <= 10000",
    blacklist: "sum, inject, reduce, max, min",
    whitelist: "include Enumerable, def each",
    sourcecode: `class ReadingLog
  include Enumerable
  def initialize(vals) @vals = vals end
  def each
    @vals.each { |v| yield v }
  end
end
n = gets.to_i
vals = n.times.map { gets.to_i }
log = ReadingLog.new(vals)
total = 0
top = vals.first
log.each do |v|
  total += v
  top = v if v > top
end
puts "Total: #{total}"
puts "Top: #{top}"
puts "Count: #{log.to_a.size}"
`,
  },
  {
    title: "Store Inventory Namespace Total",
    description:
      "A retail store models inventory under the `Store::Inventory` namespace with a `Tracker` class. Read n then n `name qty` pairs. Add each to the tracker and print the sum of all quantities.\n\nInput Format:\nLine 1: integer n. Next n lines: `name qty` separated by space.\n\nOutput Format:\nThe integer sum of quantities.\n\nConstraints:\n1 <= n <= 1000; 0 <= qty <= 10000; name length 1..20.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Namespacing with Modules",
    sampleinput1: "3\napple 5\nbanana 3\ncherry 2",
    sampleoutput1: "10",
    sampleinput2: "2\npen 10\nnotebook 4",
    sampleoutput2: "14",
    input1: "1\nx 100",
    output1: "100",
    input2: "4\na 1\nb 2\nc 3\nd 4",
    output2: "10",
    input3: "3\nA 0\nB 5\nC 0",
    output3: "5",
    inputconstrains: "1 <= n <= 1000; 0 <= qty <= 10000; name length 1..20",
    blacklist: "sum, inject, reduce",
    whitelist: "module Store, def total",
    sourcecode: `module Store
  module Inventory
    class Tracker
      def initialize
        @rows = []
      end
      def add(name, qty)
        @rows << [name, qty]
      end
      def total
        t = 0
        @rows.each { |r| t += r[1] }
        t
      end
    end
  end
end
n = gets.to_i
tracker = Store::Inventory::Tracker.new
n.times do
  name, qty = gets.split
  tracker.add(name, qty.to_i)
end
puts tracker.total
`,
  },
  {
    title: "Comparable Version Sort",
    description:
      "A software release tracker models versions as `major.minor` strings. Class `Version` includes `Comparable` and defines `<=>` based on `[major, minor]`. Read n then n versions. Print all versions sorted ascending, space-separated.\n\nInput Format:\nLine 1: integer n. Next n lines: a version string `major.minor`.\n\nOutput Format:\nAll versions sorted ascending, space-separated on one line.\n\nConstraints:\n1 <= n <= 1000; 0 <= major, minor <= 999.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Comparable and Enumerable Mixins",
    sampleinput1: "4\n1.2\n2.0\n1.10\n0.5",
    sampleoutput1: "0.5 1.2 1.10 2.0",
    sampleinput2: "3\n3.1\n3.0\n3.2",
    sampleoutput2: "3.0 3.1 3.2",
    input1: "2\n10.0\n9.9",
    output1: "9.9 10.0",
    input2: "5\n1.0\n1.0\n1.0\n2.0\n1.5",
    output2: "1.0 1.0 1.0 1.5 2.0",
    input3: "1\n5.7",
    output3: "5.7",
    inputconstrains: "1 <= n <= 1000; 0 <= major, minor <= 999",
    blacklist: "sort_by, partition, minmax",
    whitelist: "include Comparable, def <=>",
    sourcecode: `class Version
  include Comparable
  attr_reader :major, :minor
  def initialize(str)
    parts = str.split(".")
    @major = parts[0].to_i
    @minor = parts[1].to_i
  end
  def <=>(other)
    [major, minor] <=> [other.major, other.minor]
  end
  def to_s; "#{major}.#{minor}" end
end
n = gets.to_i
versions = n.times.map { Version.new(gets.chomp) }
sorted = versions.sort
puts sorted.map(&:to_s).join(" ")
`,
  },
  {
    title: "Prepend Audit Logging Transfer",
    description:
      "A banking service prepends an `Audited` module on `Banker`. When `transfer(amount)` runs, the audit module prints `[AUDIT] transfer <amount>` first, then calls `super` which prints `Transferred: <amount>`. Read an amount and execute `Banker.new.transfer(amount)`.\n\nInput Format:\nLine 1: integer amount.\n\nOutput Format:\nTwo lines: `[AUDIT] transfer <amount>` then `Transferred: <amount>`.\n\nConstraints:\n0 <= amount <= 1000000.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "prepend Mixin",
    sampleinput1: "100",
    sampleoutput1: "[AUDIT] transfer 100\nTransferred: 100",
    sampleinput2: "50",
    sampleoutput2: "[AUDIT] transfer 50\nTransferred: 50",
    input1: "1",
    output1: "[AUDIT] transfer 1\nTransferred: 1",
    input2: "999",
    output2: "[AUDIT] transfer 999\nTransferred: 999",
    input3: "0",
    output3: "[AUDIT] transfer 0\nTransferred: 0",
    inputconstrains: "0 <= amount <= 1000000",
    blacklist: "class_eval, alias_method, define_method",
    whitelist: "prepend Audited, super",
    sourcecode: `module Audited
  def transfer(amount)
    puts "[AUDIT] transfer #{amount}"
    super
  end
end
class Banker
  prepend Audited
  def transfer(amount)
    puts "Transferred: #{amount}"
  end
end
amount = gets.to_i
Banker.new.transfer(amount)
`,
  },
  {
    title: "Robot Skills Multi Include",
    description:
      "A robot controller mixes in two capability modules: `Walkable` (provides `walk`) and `Swimmable` (provides `swim`). Read a list of actions separated by spaces. For each action, print the matching capability result one per line.\n\nInput Format:\nLine 1: space-separated actions from {walk, swim}.\n\nOutput Format:\nOne line per action: `walking` or `swimming`.\n\nConstraints:\n1 <= #actions <= 100; each action in {walk, swim}.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "include Mixin",
    sampleinput1: "walk swim",
    sampleoutput1: "walking\nswimming",
    sampleinput2: "swim walk swim",
    sampleoutput2: "swimming\nwalking\nswimming",
    input1: "walk",
    output1: "walking",
    input2: "swim",
    output2: "swimming",
    input3: "walk walk",
    output3: "walking\nwalking",
    inputconstrains: "1 <= #actions <= 100; each action in {walk, swim}",
    blacklist: "extend, prepend",
    whitelist: "include Walkable, include Swimmable",
    sourcecode: `module Walkable
  def walk; "walking" end
end
module Swimmable
  def swim; "swimming" end
end
class Robot
  include Walkable
  include Swimmable
end
robot = Robot.new
actions = gets.split
actions.each do |a|
  case a
  when "walk" then puts robot.walk
  when "swim" then puts robot.swim
  end
end
`,
  },
  {
    title: "Enumerable Temperature Log Spread",
    description:
      "A weather station stores daily temperatures in `TempLog` which mixes in `Enumerable` with a custom `each`. Read n then n float readings. Compute the average and the spread (highest minus lowest) manually by iterating with `each`. Print two lines: `Avg: X.XX` and `Spread: Y.YY`.\n\nInput Format:\nLine 1: integer n. Next n lines: one float reading each.\n\nOutput Format:\nTwo lines with two-decimal floats.\n\nConstraints:\n1 <= n <= 1000; -1000.0 <= reading <= 1000.0.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Comparable and Enumerable Mixins",
    sampleinput1: "3\n36.5\n37.0\n36.0",
    sampleoutput1: "Avg: 36.50\nSpread: 1.00",
    sampleinput2: "4\n10.0\n20.0\n30.0\n40.0",
    sampleoutput2: "Avg: 25.00\nSpread: 30.00",
    input1: "2\n5.5\n5.5",
    output1: "Avg: 5.50\nSpread: 0.00",
    input2: "1\n100.25",
    output2: "Avg: 100.25\nSpread: 0.00",
    input3: "5\n0.0\n1.5\n3.0\n4.5\n6.0",
    output3: "Avg: 3.00\nSpread: 6.00",
    inputconstrains: "1 <= n <= 1000; -1000.0 <= reading <= 1000.0",
    blacklist: "sum, inject, reduce, max, min",
    whitelist: "include Enumerable, def each",
    sourcecode: `class TempLog
  include Enumerable
  def initialize(readings) @readings = readings end
  def each
    @readings.each { |r| yield r }
  end
end
n = gets.to_i
readings = n.times.map { gets.to_f }
log = TempLog.new(readings)
total = 0.0
lo = readings.first
hi = readings.first
log.each do |r|
  total += r
  lo = r if r < lo
  hi = r if r > hi
end
avg = total / n
puts "Avg: #{'%.2f' % avg}"
puts "Spread: #{'%.2f' % (hi - lo)}"
`,
  },
  // ===== HARD SCENARIO (4) =====
  {
    title: "Comparable Enumerable Leaderboard Top",
    description:
      "An online game ranks players by score (descending). Class `Player` includes `Comparable` with `<=>` reversed for descending order. Class `Leaderboard` includes `Enumerable` and yields players via `each`. Read n then n `name score` pairs. Sort the leaderboard and print the top three names space-separated.\n\nInput Format:\nLine 1: integer n. Next n lines: `name score` separated by space.\n\nOutput Format:\nThe top 3 names space-separated on one line.\n\nConstraints:\n3 <= n <= 1000; -1000 <= score <= 1000; name length 1..20.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Comparable and Enumerable Mixins",
    sampleinput1: "5\nAlice 50\nBob 80\nCarol 60\nDave 90\nEve 70",
    sampleoutput1: "Dave Bob Eve",
    sampleinput2: "3\nX 10\nY 20\nZ 30",
    sampleoutput2: "Z Y X",
    input1: "4\nP 5\nQ 9\nR 7\nS 3",
    output1: "Q R P",
    input2: "6\nN1 1\nN2 2\nN3 3\nN4 4\nN5 5\nN6 6",
    output2: "N6 N5 N4",
    input3: "3\nSolo 42\nDuo 100\nTrio 7",
    output3: "Duo Solo Trio",
    inputconstrains: "3 <= n <= 1000; -1000 <= score <= 1000; name length 1..20",
    blacklist: "sort_by, group_by, partition, max_by, min_by",
    whitelist: "include Comparable, include Enumerable, def <=>, def each",
    sourcecode: `class Player
  include Comparable
  attr_reader :name, :score
  def initialize(name, score)
    @name = name
    @score = score
  end
  def <=>(other)
    other.score <=> score
  end
  def to_s; name end
end
class Leaderboard
  include Enumerable
  def initialize(players) @players = players end
  def each
    @players.each { |p| yield p }
  end
end
n = gets.to_i
players = n.times.map do
  name, score = gets.split
  Player.new(name, score.to_i)
end
board = Leaderboard.new(players)
top3 = board.sort.first(3)
puts top3.map(&:to_s).join(" ")
`,
  },
  {
    title: "Prepend Timer Logger Audit Chain",
    description:
      "A transfer pipeline wraps an `Account` with two prepended modules. `Timer` prints `[T] start` before super and `[T] end` after. `Logger` prints `[L] <amount>` before super. Read an amount and call `Account.new.transfer(amount)`. The output reflects the full prepended call chain (Logger first, then Timer, then Account).\n\nInput Format:\nLine 1: integer amount.\n\nOutput Format:\nFour lines: `[L] <amount>`, `[T] start`, `Transferred: <amount>`, `[T] end`.\n\nConstraints:\n0 <= amount <= 1000000.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "prepend Mixin",
    sampleinput1: "100",
    sampleoutput1: "[L] 100\n[T] start\nTransferred: 100\n[T] end",
    sampleinput2: "25",
    sampleoutput2: "[L] 25\n[T] start\nTransferred: 25\n[T] end",
    input1: "1",
    output1: "[L] 1\n[T] start\nTransferred: 1\n[T] end",
    input2: "0",
    output2: "[L] 0\n[T] start\nTransferred: 0\n[T] end",
    input3: "9999",
    output3: "[L] 9999\n[T] start\nTransferred: 9999\n[T] end",
    inputconstrains: "0 <= amount <= 1000000",
    blacklist: "alias_method, define_method, module_eval",
    whitelist: "prepend Timer, prepend Logger, super",
    sourcecode: `module Timer
  def transfer(amount)
    puts "[T] start"
    result = super
    puts "[T] end"
    result
  end
end
module Logger
  def transfer(amount)
    puts "[L] #{amount}"
    super
  end
end
class Account
  prepend Timer
  prepend Logger
  def transfer(amount)
    puts "Transferred: #{amount}"
  end
end
amount = gets.to_i
Account.new.transfer(amount)
`,
  },
  {
    title: "Banking Namespace Taxable Audit",
    description:
      "A banking system nests modules: `Banking::Accounts` contains module `Taxable` (10 percent tax instance method `tax_amount`) and module `Auditable` (class method `audit(amount)`). The `Savings` class includes `Taxable` and extends `Auditable`. Read an initial balance, create `Banking::Accounts::Savings.new(balance)`, then print the total (balance plus tax) followed by `Banking::Accounts::Savings.audit(total)`.\n\nInput Format:\nLine 1: integer balance.\n\nOutput Format:\nTwo lines: the integer total, then `AUDIT: <total>`.\n\nConstraints:\n0 <= balance <= 1000000.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Namespacing with Modules",
    sampleinput1: "100",
    sampleoutput1: "110\nAUDIT: 110",
    sampleinput2: "200",
    sampleoutput2: "220\nAUDIT: 220",
    input1: "0",
    output1: "0\nAUDIT: 0",
    input2: "50",
    output2: "55\nAUDIT: 55",
    input3: "1000",
    output3: "1100\nAUDIT: 1100",
    inputconstrains: "0 <= balance <= 1000000",
    blacklist: "class_eval, instance_variable_get, send, define_method",
    whitelist: "module Banking, module Accounts, include Taxable, extend Auditable",
    sourcecode: `module Banking
  module Accounts
    module Taxable
      def tax_amount
        (@balance * 10) / 100
      end
    end
    module Auditable
      def audit(amount)
        "AUDIT: #{amount}"
      end
    end
    class Savings
      include Taxable
      extend Auditable
      def initialize(balance)
        @balance = balance
      end
      def total
        @balance + tax_amount
      end
    end
  end
end
balance = gets.to_i
acct = Banking::Accounts::Savings.new(balance)
puts acct.total
puts Banking::Accounts::Savings.audit(acct.total)
`,
  },
  {
    title: "Comparable Tournament Bracket",
    description:
      "A tournament ranks teams by score then by name ascending as a tiebreaker. Class `Team` includes `Comparable` and defines `<=>` using `[score, name]`. Class `Bracket` includes `Enumerable` with `each` yielding teams. Read n then n `name score` pairs. Print `Champion: <name>` and `Runner-up: <name>` (the top two after ascending sort).\n\nInput Format:\nLine 1: integer n. Next n lines: `name score` separated by space.\n\nOutput Format:\nTwo lines as described.\n\nConstraints:\n2 <= n <= 1000; -1000 <= score <= 1000; name length 1..20.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Comparable and Enumerable Mixins",
    sampleinput1: "4\nTigers 50\nLions 80\nWolves 60\nSharks 90",
    sampleoutput1: "Champion: Sharks\nRunner-up: Lions",
    sampleinput2: "3\nA 10\nB 20\nC 30",
    sampleoutput2: "Champion: C\nRunner-up: B",
    input1: "5\nP 5\nQ 9\nR 7\nS 3\nT 1",
    output1: "Champion: Q\nRunner-up: R",
    input2: "2\nX 100\nY 50",
    output2: "Champion: X\nRunner-up: Y",
    input3: "4\nAlpha 50\nBeta 50\nGamma 50\nDelta 50",
    output3: "Champion: Gamma\nRunner-up: Delta",
    inputconstrains: "2 <= n <= 1000; -1000 <= score <= 1000; name length 1..20",
    blacklist: "sort_by, group_by, max_by, min_by, partition",
    whitelist: "include Comparable, include Enumerable, def <=>, def each",
    sourcecode: `class Team
  include Comparable
  attr_reader :name, :score
  def initialize(name, score)
    @name = name
    @score = score
  end
  def <=>(other)
    [score, name] <=> [other.score, other.name]
  end
  def to_s; name end
end
class Bracket
  include Enumerable
  def initialize(teams) @teams = teams end
  def each
    @teams.each { |t| yield t }
  end
end
n = gets.to_i
teams = n.times.map do
  name, score = gets.split
  Team.new(name, score.to_i)
end
bracket = Bracket.new(teams)
sorted = bracket.sort
puts "Champion: #{sorted.last}"
puts "Runner-up: #{sorted[-2]}"
`,
  },
];

const mcqs: MCQ[] = [
  // ===== EASY MCQ (10) =====
  {
    title: "Module Definition Keyword",
    description: "Which Ruby keyword is used to declare a module?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Defining Modules",
    Option1: "module",
    Option2: "class",
    Option3: "def",
    Option4: "require",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Namespace Separator Operator",
    description: "Which operator accesses a constant or class nested inside a module namespace?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Namespacing with Modules",
    Option1: "::",
    Option2: ".",
    Option3: "->",
    Option4: "=>",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Include Mixin Effect",
    description: "When a class writes `include Mod`, the module's instance methods become what kind of methods on the class?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "include Mixin",
    Option1: "Instance methods of the class",
    Option2: "Class (singleton) methods",
    Option3: "Private methods only",
    Option4: "Local variables",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Extend Mixin Effect",
    description: "When a class writes `extend Mod`, the module's instance methods become what kind of methods on the class?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "extend Mixin",
    Option1: "Class (singleton) methods",
    Option2: "Instance methods",
    Option3: "Constants",
    Option4: "Block parameters",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Comparable Required Method",
    description: "Which method must a class define to use the Comparable mixin's operators like `<`, `>`, and `==`?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Comparable and Enumerable Mixins",
    Option1: "the spaceship operator <=>",
    Option2: "==",
    Option3: "compare",
    Option4: "cmp",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Enumerable Required Method",
    description: "Which method must a class define to use the Enumerable mixin's `map`, `select`, `sort` and friends?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Comparable and Enumerable Mixins",
    Option1: "each",
    Option2: "next",
    Option3: "iterate",
    Option4: "loop",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Enumerable Provided Method",
    description: "Once a class includes Enumerable and defines `each`, which of these methods does it gain for free?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Comparable and Enumerable Mixins",
    Option1: "map",
    Option2: "puts",
    Option3: "class",
    Option4: "attr_accessor",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Module Instantiation Behavior",
    description: "What happens when you call `SomeModule.new` in Ruby?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Defining Modules",
    Option1: "Raises an error: modules cannot be instantiated",
    Option2: "Creates a module instance",
    Option3: "Returns nil",
    Option4: "Calls initialize on the module",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Namespace Class Reference",
    description: "Given `module Geo; class Point; end; end`, how do you reference the Point class from outside the module?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Namespacing with Modules",
    Option1: "Geo::Point",
    Option2: "Geo.Point",
    Option3: "Geo->Point",
    Option4: "Geo#Point",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Include vs Extend Difference",
    description: "Which statement best captures the difference between `include` and `extend`?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "include Mixin",
    Option1: "include adds instance methods; extend adds class methods",
    Option2: "include adds class methods; extend adds instance methods",
    Option3: "include works on classes; extend works on modules only",
    Option4: "They are identical in behaviour",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  // ===== MEDIUM MCQ (6) =====
  {
    title: "Comparable Less Than Output",
    description: "What does the following snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Comparable and Enumerable Mixins",
    Option1: "true",
    Option2: "false",
    Option3: "nil",
    Option4: "-1",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `class Box
  include Comparable
  attr_reader :v
  def initialize(v) @v = v end
  def <=>(other) @v <=> other.v end
end
puts Box.new(3) < Box.new(5)
`,
    snippetLang: "ruby",
  },
  {
    title: "Extend Class Method Output",
    description: "What does the following snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "extend Mixin",
    Option1: "hi",
    Option2: "error: undefined method hi for Bot:Class",
    Option3: "nil",
    Option4: "Bot",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `module Greet
  def hi; "hi" end
end
class Bot
  extend Greet
end
puts Bot.hi
`,
    snippetLang: "ruby",
  },
  {
    title: "Prepend Super Output",
    description: "What does the following snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "prepend Mixin",
    Option1: "M-C",
    Option2: "C-M",
    Option3: "C",
    Option4: "M",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `module M
  def speak; "M-" + super end
end
class C
  prepend M
  def speak; "C" end
end
puts C.new.speak
`,
    snippetLang: "ruby",
  },
  {
    title: "Enumerable Map Output",
    description: "What does the following snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Comparable and Enumerable Mixins",
    Option1: "2,4,6",
    Option2: "1,2,3",
    Option3: "2,4,6,8",
    Option4: "1,4,9",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `class Bag
  include Enumerable
  def each
    yield 1
    yield 2
    yield 3
  end
end
puts Bag.new.map { |x| x * 2 }.join(",")
`,
    snippetLang: "ruby",
  },
  {
    title: "Namespace Constant Output",
    description: "What does the following snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Namespacing with Modules",
    Option1: "1.0",
    Option2: "error: undefined method VERSION",
    Option3: "VERSION",
    Option4: "App",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `module App
  VERSION = "1.0"
end
puts App::VERSION
`,
    snippetLang: "ruby",
  },
  {
    title: "Include Lookup Order",
    description: "In `class C; include A; include B; end`, if both A and B define method `m`, which `m` runs when calling `C.new.m`?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "include Mixin",
    Option1: "B's m (most recently included)",
    Option2: "A's m (first included)",
    Option3: "Neither — raises NoMethodError",
    Option4: "Both in undefined order",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  // ===== HARD MCQ (4) =====
  {
    title: "Multiple Prepend Order",
    description: "What does the following snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "prepend Mixin",
    Option1: "YXS",
    Option2: "XYS",
    Option3: "SYX",
    Option4: "SXY",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `module X
  def go; "X" + super end
end
module Y
  def go; "Y" + super end
end
class S
  prepend X
  prepend Y
  def go; "S" end
end
puts S.new.go
`,
    snippetLang: "ruby",
  },
  {
    title: "Comparable Descending Sort",
    description: "What does the following snippet print? The `<=>` is reversed on purpose.",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Comparable and Enumerable Mixins",
    Option1: "3,2,1",
    Option2: "1,2,3",
    Option3: "2,1,3",
    Option4: "1,3,2",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `class P
  include Comparable
  attr_reader :s
  def initialize(s) @s = s end
  def <=>(o) o.s <=> s end
end
arr = [P.new(3), P.new(1), P.new(2)]
puts arr.sort.map(&:s).join(",")
`,
    snippetLang: "ruby",
  },
  {
    title: "Prepend Ancestor Position",
    description: "With `class C; prepend M; end`, where does M sit in C's ancestor chain relative to C itself?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "prepend Mixin",
    Option1: "Before (above) C — M#method overrides C#method",
    Option2: "After (below) C — C#method runs first",
    Option3: "At the very end (above BasicObject only)",
    Option4: "M replaces C entirely",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Enumerable Without Block Enumerator",
    description: "What does the following snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Comparable and Enumerable Mixins",
    Option1: "Enumerator",
    Option2: "Array",
    Option3: "List",
    Option4: "nil",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `class List
  include Enumerable
  def each
    yield 10
    yield 20
  end
end
e = List.new.each
puts e.class
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
