import { writeFileSync } from "node:fs";

const DAY = 16;
const TOPIC = "Metaprogramming Basics";
const SUBTOPICS = [
  "send Method",
  "define_method",
  "method_missing",
  "class_eval and instance_eval",
  "respond_to",
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
    title: "Dispatch Method With Send",
    description:
      "Define a Calculator class with add(a, b) and sub(a, b) methods. Read a method name string ('add' or 'sub') and two integers, then call the chosen method on a Calculator instance using send. Print the integer result.\n\nInput Format:\nLine 1: method name (add or sub). Line 2: two space-separated integers a b.\n\nOutput Format:\nThe integer result.\n\nConstraints:\nmethod in {add, sub}; -1000 <= a, b <= 1000.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "send Method",
    sampleinput1: "add\n3 4",
    sampleoutput1: "7",
    sampleinput2: "sub\n10 4",
    sampleoutput2: "6",
    input1: "add\n5 5",
    output1: "10",
    input2: "sub\n100 1",
    output2: "99",
    input3: "add\n0 0",
    output3: "0",
    inputconstrains: "method in {add, sub}; -1000 <= a, b <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `class Calculator
  def add(a, b); a + b; end
  def sub(a, b); a - b; end
end

m = gets.chomp
a, b = gets.split.map(&:to_i)
c = Calculator.new
puts c.send(m, a, b)
`,
  },
  {
    title: "Define Dynamic Multiplier Methods",
    description:
      "Use define_method to create methods double and triple on a Multiplier class. Read a method name ('double' or 'triple') and an integer n, then call the chosen method directly on a Multiplier instance and print the result.\n\nInput Format:\nLine 1: method name (double or triple). Line 2: integer n.\n\nOutput Format:\nThe integer result.\n\nConstraints:\nmethod in {double, triple}; -1000 <= n <= 1000.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "define_method",
    sampleinput1: "double\n5",
    sampleoutput1: "10",
    sampleinput2: "triple\n4",
    sampleoutput2: "12",
    input1: "double\n10",
    output1: "20",
    input2: "triple\n3",
    output2: "9",
    input3: "double\n0",
    output3: "0",
    inputconstrains: "method in {double, triple}; -1000 <= n <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `class Multiplier
  define_method(:double) { |x| x * 2 }
  define_method(:triple) { |x| x * 3 }
end

cmd = gets.chomp
n = gets.to_i
m = Multiplier.new
result = cmd == "double" ? m.double(n) : m.triple(n)
puts result
`,
  },
  {
    title: "Catch Unknown Method Calls",
    description:
      "Define a Tracker class that overrides method_missing to return 'Unknown: <name>' for any unknown method. Read a method name, then call it on a Tracker instance via send; print the returned string.\n\nInput Format:\nLine 1: method name (any single-word identifier).\n\nOutput Format:\n'Unknown: <name>'.\n\nConstraints:\n1 <= name length <= 20; only letters and underscores.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "method_missing",
    sampleinput1: "ping",
    sampleoutput1: "Unknown: ping",
    sampleinput2: "pong",
    sampleoutput2: "Unknown: pong",
    input1: "save",
    output1: "Unknown: save",
    input2: "foo",
    output2: "Unknown: foo",
    input3: "bar",
    output3: "Unknown: bar",
    inputconstrains: "1 <= name length <= 20; identifier chars only",
    blacklist: "",
    whitelist: "",
    sourcecode: `class Tracker
  def method_missing(name, *args)
    "Unknown: #{name}"
  end
end

cmd = gets.chomp
t = Tracker.new
puts t.send(cmd)
`,
  },
  {
    title: "Inject Method With Class Eval",
    description:
      "Define an empty Calculator class, then use class_eval outside the class to add an instance method double(x) that returns x * 2. Read an integer n, instantiate Calculator, call double, and print the result.\n\nInput Format:\nLine 1: integer n.\n\nOutput Format:\nThe integer n * 2.\n\nConstraints:\n-1000 <= n <= 1000.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "class_eval and instance_eval",
    sampleinput1: "5",
    sampleoutput1: "10",
    sampleinput2: "7",
    sampleoutput2: "14",
    input1: "100",
    output1: "200",
    input2: "0",
    output2: "0",
    input3: "3",
    output3: "6",
    inputconstrains: "-1000 <= n <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `class Calculator
end

Calculator.class_eval do
  def double(x); x * 2; end
end

n = gets.to_i
c = Calculator.new
puts c.double(n)
`,
  },
  {
    title: "Check Method With Respond To",
    description:
      "Define a Service class with a hello method that returns 'Hello'. Read a method name; if the service responds to that method, call it and print the result; otherwise print 'No such method'.\n\nInput Format:\nLine 1: method name string.\n\nOutput Format:\nEither the method's return value or 'No such method'.\n\nConstraints:\n1 <= name length <= 20; identifier chars only.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "respond_to",
    sampleinput1: "hello",
    sampleoutput1: "Hello",
    sampleinput2: "bye",
    sampleoutput2: "No such method",
    input1: "hello",
    output1: "Hello",
    input2: "missing",
    output2: "No such method",
    input3: "hello",
    output3: "Hello",
    inputconstrains: "1 <= name length <= 20; identifier chars only",
    blacklist: "",
    whitelist: "",
    sourcecode: `class Service
  def hello; "Hello"; end
end

cmd = gets.chomp
s = Service.new
if s.respond_to?(cmd.to_sym)
  puts s.send(cmd)
else
  puts "No such method"
end
`,
  },
  {
    title: "Send String Argument To Speaker",
    description:
      "Define a Speaker class with two methods: shout(msg) returning msg.upcase and whisper(msg) returning msg.downcase. Read a method name and a message string; invoke the method via send and print the result.\n\nInput Format:\nLine 1: method name (shout or whisper). Line 2: message string.\n\nOutput Format:\nThe transformed message.\n\nConstraints:\nmethod in {shout, whisper}; 1 <= msg length <= 30.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "send Method",
    sampleinput1: "shout\nhello",
    sampleoutput1: "HELLO",
    sampleinput2: "whisper\nWORLD",
    sampleoutput2: "world",
    input1: "shout\nruby",
    output1: "RUBY",
    input2: "whisper\nRUBY",
    output2: "ruby",
    input3: "shout\nCode",
    output3: "CODE",
    inputconstrains: "method in {shout, whisper}; 1 <= msg length <= 30",
    blacklist: "",
    whitelist: "",
    sourcecode: `class Speaker
  def shout(msg); msg.upcase; end
  def whisper(msg); msg.downcase; end
end

cmd = gets.chomp
msg = gets.chomp
s = Speaker.new
puts s.send(cmd, msg)
`,
  },

  // ===== EASY SCENARIO (4) =====
  {
    title: "Robot Command Dispatcher",
    description:
      "A robot exposes commands move, turn, and stop. Define a Robot class with move(d) returning 'Moved <d>m', turn(d) returning 'Turned <d>deg', and stop returning 'Stopped'. Read n then n command lines: each is either a single word 'stop' or 'op arg' (e.g. 'move 5'); dispatch each via send and print the result.\n\nInput Format:\nLine 1: integer n. Next n lines: a command (single word, or word + arg).\n\nOutput Format:\nOne result per line.\n\nConstraints:\n1 <= n <= 50; 0 <= arg <= 10000.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "send Method",
    sampleinput1: "2\nmove 5\nstop",
    sampleoutput1: "Moved 5m\nStopped",
    sampleinput2: "3\nmove 10\nturn 90\nstop",
    sampleoutput2: "Moved 10m\nTurned 90deg\nStopped",
    input1: "1\nstop",
    output1: "Stopped",
    input2: "2\nturn 45\nmove 1",
    output2: "Turned 45deg\nMoved 1m",
    input3: "1\nmove 100",
    output3: "Moved 100m",
    inputconstrains: "1 <= n <= 50; 0 <= arg <= 10000",
    blacklist: "",
    whitelist: "",
    sourcecode: `class Robot
  def move(d); "Moved #{d}m"; end
  def turn(d); "Turned #{d}deg"; end
  def stop; "Stopped"; end
end

n = gets.to_i
r = Robot.new
n.times do
  parts = gets.split
  puts r.send(*parts)
end
`,
  },
  {
    title: "Define Animal Sounds From Hash",
    description:
      "An animal soundboard builds methods from a hash. Define an Animal class that uses a SOUNDS hash to define_method for each kind, returning the corresponding sound. Read a kind ('dog', 'cat', or 'bird'); call the matching method on an Animal instance and print the sound.\n\nInput Format:\nLine 1: kind (dog, cat, or bird).\n\nOutput Format:\nThe sound string.\n\nConstraints:\nkind in {dog, cat, bird}.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "define_method",
    sampleinput1: "dog",
    sampleoutput1: "Woof",
    sampleinput2: "cat",
    sampleoutput2: "Meow",
    input1: "bird",
    output1: "Chirp",
    input2: "dog",
    output2: "Woof",
    input3: "cat",
    output3: "Meow",
    inputconstrains: "kind in {dog, cat, bird}",
    blacklist: "",
    whitelist: "",
    sourcecode: `class Animal
  SOUNDS = { dog: "Woof", cat: "Meow", bird: "Chirp" }.freeze
  SOUNDS.each do |k, v|
    define_method(k) { v }
  end
end

a = Animal.new
k = gets.chomp
puts case k
when "dog" then a.dog
when "cat" then a.cat
when "bird" then a.bird
end
`,
  },
  {
    title: "Api Endpoint Method Missing",
    description:
      "An API service exposes a real status method returning 'OK' and uses method_missing to handle unknown endpoints by returning 'Unknown endpoint: <name>'. Read an endpoint name, dispatch it via send, and print the response.\n\nInput Format:\nLine 1: endpoint name string.\n\nOutput Format:\n'OK' for known endpoint status; otherwise 'Unknown endpoint: <name>'.\n\nConstraints:\n1 <= name length <= 20; identifier chars only.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "method_missing",
    sampleinput1: "status",
    sampleoutput1: "OK",
    sampleinput2: "users",
    sampleoutput2: "Unknown endpoint: users",
    input1: "ping",
    output1: "Unknown endpoint: ping",
    input2: "status",
    output2: "OK",
    input3: "metrics",
    output3: "Unknown endpoint: metrics",
    inputconstrains: "1 <= name length <= 20; identifier chars only",
    blacklist: "",
    whitelist: "",
    sourcecode: `class Api
  def status; "OK"; end
  def method_missing(name, *args)
    "Unknown endpoint: #{name}"
  end
end

cmd = gets.chomp
api = Api.new
puts api.send(cmd)
`,
  },
  {
    title: "Device Capability Check With Respond To",
    description:
      "A device driver checks capabilities at runtime. Define a Device class with power_on returning 'Power on' and power_off returning 'Power off'. Read a command; if the device responds_to? the command, call it via send and print the result; otherwise print 'Unsupported'.\n\nInput Format:\nLine 1: command string.\n\nOutput Format:\nThe command result or 'Unsupported'.\n\nConstraints:\n1 <= name length <= 20; identifier chars only.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "respond_to",
    sampleinput1: "power_on",
    sampleoutput1: "Power on",
    sampleinput2: "reset",
    sampleoutput2: "Unsupported",
    input1: "power_off",
    output1: "Power off",
    input2: "calibrate",
    output2: "Unsupported",
    input3: "power_on",
    output3: "Power on",
    inputconstrains: "1 <= name length <= 20; identifier chars only",
    blacklist: "",
    whitelist: "",
    sourcecode: `class Device
  def power_on; "Power on"; end
  def power_off; "Power off"; end
end

cmd = gets.chomp
d = Device.new
if d.respond_to?(cmd.to_sym)
  puts d.send(cmd)
else
  puts "Unsupported"
end
`,
  },

  // ===== MEDIUM SCENARIO (6) =====
  {
    title: "Calculator Ops Dispatch With Send",
    description:
      "A calculator supports four operations. Define a Calculator class with add(a,b), sub(a,b), mul(a,b), and div(a,b) where div returns 'ERR' on division by zero. Read n then n lines 'op a b' (op in add, sub, mul, div); dispatch each operation via send and print the result.\n\nInput Format:\nLine 1: integer n. Next n lines: 'op a b' with integers a b.\n\nOutput Format:\nOne result per line.\n\nConstraints:\n1 <= n <= 50; -1000 <= a, b <= 1000.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "send Method",
    sampleinput1: "3\nadd 2 3\nmul 4 5\nsub 10 4",
    sampleoutput1: "5\n20\n6",
    sampleinput2: "2\ndiv 10 2\ndiv 5 0",
    sampleoutput2: "5\nERR",
    input1: "1\nadd 0 0",
    output1: "0",
    input2: "4\nmul 1 1\nmul 2 2\nsub 5 3\ndiv 9 3",
    output2: "1\n4\n2\n3",
    input3: "2\nadd 100 200\nsub 50 25",
    output3: "300\n25",
    inputconstrains: "1 <= n <= 50; -1000 <= a, b <= 1000",
    blacklist: "eval, instance_eval",
    whitelist: "send, class Calculator, def add",
    sourcecode: `class Calculator
  def add(a, b); a + b; end
  def sub(a, b); a - b; end
  def mul(a, b); a * b; end
  def div(a, b); b == 0 ? "ERR" : a / b; end
end

n = gets.to_i
calc = Calculator.new
n.times do
  op, a, b = gets.split
  puts calc.send(op, a.to_i, b.to_i)
end
`,
  },
  {
    title: "Dynamic Factor Methods Each With Index",
    description:
      "A scaling tool generates methods double, triple, and quad using define_method with each_with_index so the multiplier factor is the index plus 2. Read n then n lines 'op x' (op in double, triple, quad); dispatch via send and print each result.\n\nInput Format:\nLine 1: integer n. Next n lines: 'op x' with integer x.\n\nOutput Format:\nOne result per line.\n\nConstraints:\n1 <= n <= 50; 0 <= x <= 1000.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "define_method",
    sampleinput1: "3\ndouble 5\ntriple 4\nquad 3",
    sampleoutput1: "10\n12\n12",
    sampleinput2: "2\ndouble 10\nquad 5",
    sampleoutput2: "20\n20",
    input1: "1\ntriple 7",
    output1: "21",
    input2: "3\ndouble 1\ntriple 2\nquad 3",
    output2: "2\n6\n12",
    input3: "1\ndouble 100",
    output3: "200",
    inputconstrains: "1 <= n <= 50; 0 <= x <= 1000",
    blacklist: "eval, class_eval, instance_eval",
    whitelist: "define_method, each_with_index",
    sourcecode: `class Dynamic
  [:double, :triple, :quad].each_with_index do |name, i|
    factor = i + 2
    define_method(name) { |x| x * factor }
  end
end

n = gets.to_i
d = Dynamic.new
n.times do
  op, x = gets.split
  puts d.send(op, x.to_i)
end
`,
  },
  {
    title: "OpenStruct Like Bag Method Missing",
    description:
      "Implement a Bag class mimicking OpenStruct. method_missing handles setter calls (name ending in =) by storing the value in an internal hash, and getter calls by returning the stored value or 'missing' if absent. Read n then n lines that are either 'set key value' or 'get key'; dispatch set/get via send and print results for each get.\n\nInput Format:\nLine 1: integer n. Next n lines: 'set key value' or 'get key'.\n\nOutput Format:\nFor each get: the stored value or 'missing'.\n\nConstraints:\n1 <= n <= 100; 1 <= key, value length <= 20.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "method_missing",
    sampleinput1: "3\nset name Alice\nget name\nget age",
    sampleoutput1: "Alice\nmissing",
    sampleinput2: "4\nset a 1\nset b 2\nget a\nget b",
    sampleoutput2: "1\n2",
    input1: "2\nset x hi\nget x",
    output1: "hi",
    input2: "1\nget z",
    output2: "missing",
    input3: "4\nset score 10\nget q\nget score\nget z",
    output3: "missing\n10\nmissing",
    inputconstrains: "1 <= n <= 100; 1 <= key, value length <= 20",
    blacklist: "eval, class_eval, instance_eval",
    whitelist: "method_missing, send",
    sourcecode: `class Bag
  def initialize; @h = {}; end
  def method_missing(name, *args)
    n = name.to_s
    if n.end_with?("=")
      @h[n.chomp("=")] = args[0]
    else
      @h.key?(n) ? @h[n] : "missing"
    end
  end
end

b = Bag.new
n = gets.to_i
n.times do
  line = gets.chomp
  parts = line.split
  if parts[0] == "set"
    b.send("#{parts[1]}=", parts[2])
  else
    puts b.send(parts[1])
  end
end
`,
  },
  {
    title: "Inject Methods With Class Eval",
    description:
      "A plugin loader injects methods into an empty Calculator class via class_eval. After defining the class empty, use class_eval to add double(x) returning x * 2, then class_eval again to add triple(x) returning x * 3. Read n then n lines 'op x' (op in double, triple); dispatch via send and print each result.\n\nInput Format:\nLine 1: integer n. Next n lines: 'op x' with integer x.\n\nOutput Format:\nOne result per line.\n\nConstraints:\n1 <= n <= 50; 0 <= x <= 1000.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "class_eval and instance_eval",
    sampleinput1: "2\ndouble 5\ntriple 4",
    sampleoutput1: "10\n12",
    sampleinput2: "1\ndouble 100",
    sampleoutput2: "200",
    input1: "3\ndouble 1\ntriple 2\ndouble 3",
    output1: "2\n6\n6",
    input2: "1\ntriple 5",
    output2: "15",
    input3: "2\ndouble 10\ntriple 9",
    output3: "20\n27",
    inputconstrains: "1 <= n <= 50; 0 <= x <= 1000",
    blacklist: "Struct, OpenStruct",
    whitelist: "class_eval, def double",
    sourcecode: `class Calculator
end

Calculator.class_eval do
  def double(x); x * 2; end
end

Calculator.class_eval do
  def triple(x); x * 3; end
end

n = gets.to_i
c = Calculator.new
n.times do
  op, x = gets.split
  puts c.send(op, x.to_i)
end
`,
  },
  {
    title: "Service Feature Detection Respond To",
    description:
      "A service exposes health and status methods. Read n then n command strings; for each command, if the service responds_to? the command (as symbol), call it via send and print the result; otherwise print 'no method: <cmd>'.\n\nInput Format:\nLine 1: integer n. Next n lines: command name.\n\nOutput Format:\nOne result per line.\n\nConstraints:\n1 <= n <= 50; 1 <= name length <= 20.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "respond_to",
    sampleinput1: "3\nhealth\nstatus\nreboot",
    sampleoutput1: "Healthy\nRunning\nno method: reboot",
    sampleinput2: "2\nping\nhealth",
    sampleoutput2: "no method: ping\nHealthy",
    input1: "1\nstatus",
    output1: "Running",
    input2: "4\nhealth\nstatus\nhealth\nping",
    output2: "Healthy\nRunning\nHealthy\nno method: ping",
    input3: "2\nping\nreboot",
    output3: "no method: ping\nno method: reboot",
    inputconstrains: "1 <= n <= 50; 1 <= name length <= 20",
    blacklist: "eval, public_send, instance_eval",
    whitelist: "respond_to?, send",
    sourcecode: `class Service
  def health; "Healthy"; end
  def status; "Running"; end
end

n = gets.to_i
s = Service.new
n.times do
  cmd = gets.chomp
  if s.respond_to?(cmd.to_sym)
    puts s.send(cmd)
  else
    puts "no method: #{cmd}"
  end
end
`,
  },
  {
    title: "Dynamic Finder With Method Missing",
    description:
      "A record finder supports dynamic find_by_X-style lookups via method_missing. Records are stored in a frozen DATA constant. method_missing handles names starting with 'find_' by extracting the field after the prefix and returning the id of the first matching record or 'not found'. Read n then n lines 'field:value'; for each, dispatch 'find_<field>' via send and print the result.\n\nInput Format:\nLine 1: integer n. Next n lines: 'field:value'.\n\nOutput Format:\nOne result per line (id string or 'not found').\n\nConstraints:\n1 <= n <= 50; 1 <= field, value length <= 20.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "method_missing",
    sampleinput1: "2\nname:Alice\ncity:LA",
    sampleoutput1: "1\n2",
    sampleinput2: "2\nname:Bob\ncity:Chicago",
    sampleoutput2: "2\nnot found",
    input1: "1\nname:Carol",
    output1: "3",
    input2: "3\nname:Alice\ncity:NYC\nname:Zed",
    output2: "1\n1\nnot found",
    input3: "1\ncity:LA",
    output3: "2",
    inputconstrains: "1 <= n <= 50; 1 <= field, value length <= 20",
    blacklist: "eval, class_eval, instance_eval",
    whitelist: "method_missing, send",
    sourcecode: `class Finder
  DATA = [
    { "id" => "1", "name" => "Alice", "city" => "NYC" },
    { "id" => "2", "name" => "Bob", "city" => "LA" },
    { "id" => "3", "name" => "Carol", "city" => "NYC" }
  ].freeze
  def method_missing(name, *args)
    n = name.to_s
    if n.start_with?("find_")
      field = n[5..]
      row = DATA.find { |r| r[field] == args[0] }
      row ? row["id"] : "not found"
    else
      super
    end
  end
end

f = Finder.new
n = gets.to_i
n.times do
  line = gets.chomp
  field, value = line.split(":")
  puts f.send("find_#{field}", value)
end
`,
  },

  // ===== HARD SCENARIO (4) =====
  {
    title: "Record Find By With Respond To Override",
    description:
      "A record class supports dynamic find_by_<field> queries via method_missing, and overrides respond_to? to report true for any find_by_ name. The frozen DATA constant holds three records. method_missing returns the comma-joined ids of all matching records, or 'none' if no match. Read n then n lines 'field:value'; for each, dispatch 'find_by_<field>' via send and print the result.\n\nInput Format:\nLine 1: integer n. Next n lines: 'field:value'.\n\nOutput Format:\nOne result per line: comma-joined ids or 'none'.\n\nConstraints:\n1 <= n <= 50; 1 <= field, value length <= 20.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "method_missing",
    sampleinput1: "2\nname:Alice\nage:30",
    sampleoutput1: "1\n1,3",
    sampleinput2: "2\nid:2\nage:25",
    sampleoutput2: "2\n2",
    input1: "1\nname:Bob",
    output1: "2",
    input2: "3\nname:Alice\nname:Zed\nage:30",
    output2: "1\nnone\n1,3",
    input3: "1\nid:5",
    output3: "none",
    inputconstrains: "1 <= n <= 50; 1 <= field, value length <= 20",
    blacklist: "eval, class_eval, instance_eval",
    whitelist: "method_missing, respond_to?, send",
    sourcecode: `class Record
  DATA = [
    { "id" => "1", "name" => "Alice", "age" => "30" },
    { "id" => "2", "name" => "Bob", "age" => "25" },
    { "id" => "3", "name" => "Carol", "age" => "30" }
  ].freeze

  def respond_to?(name)
    n = name.to_s
    n.start_with?("find_by_") ? true : super
  end

  def method_missing(name, *args)
    n = name.to_s
    if n.start_with?("find_by_")
      field = n.sub("find_by_", "")
      matches = DATA.select { |r| r[field] == args[0] }
      matches.empty? ? "none" : matches.map { |r| r["id"] }.join(",")
    else
      super
    end
  end
end

r = Record.new
n = gets.to_i
n.times do
  line = gets.chomp
  field, value = line.split(":")
  puts r.send("find_by_#{field}", value)
end
`,
  },
  {
    title: "QueryBuilder Methods With Class Eval",
    description:
      "A query builder dynamically defines one method per operation name using class_eval and define_method. The OPS constant lists :select, :where, :order, :limit, :group. Each defined method returns '<op>(<arg>)'. Read n then n lines 'op arg' (op in select, where, order, limit, group); dispatch via send and print each result.\n\nInput Format:\nLine 1: integer n. Next n lines: 'op arg'.\n\nOutput Format:\nOne result per line: '<op>(<arg>)'.\n\nConstraints:\n1 <= n <= 50; 1 <= arg length <= 30.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "class_eval and instance_eval",
    sampleinput1: "2\nselect name\nwhere age=30",
    sampleoutput1: "select(name)\nwhere(age=30)",
    sampleinput2: "1\nlimit 10",
    sampleoutput2: "limit(10)",
    input1: "3\nselect id\nwhere id=1\norder name",
    output1: "select(id)\nwhere(id=1)\norder(name)",
    input2: "2\nlimit 5\ngroup city",
    output2: "limit(5)\ngroup(city)",
    input3: "1\nselect *",
    output3: "select(*)",
    inputconstrains: "1 <= n <= 50; 1 <= arg length <= 30",
    blacklist: "Struct, OpenStruct",
    whitelist: "class_eval, define_method",
    sourcecode: `class QueryBuilder
  OPS = [:select, :where, :order, :limit, :group].freeze
  class_eval do
    OPS.each do |op|
      define_method(op) { |arg| "#{op}(#{arg})" }
    end
  end
end

n = gets.to_i
q = QueryBuilder.new
n.times do
  op, arg = gets.split
  puts q.send(op, arg)
end
`,
  },
  {
    title: "String Transform Dispatcher Send",
    description:
      "A string tool exposes uppercase, lowercase, reverse, and capitalize methods. Read n then n lines 'op arg' (op in uppercase, lowercase, reverse, capitalize); dispatch each via send and print the result.\n\nInput Format:\nLine 1: integer n. Next n lines: 'op arg'.\n\nOutput Format:\nOne transformed string per line.\n\nConstraints:\n1 <= n <= 50; 1 <= arg length <= 30.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "send Method",
    sampleinput1: "3\nuppercase hello\nlowercase WORLD\nreverse abc",
    sampleoutput1: "HELLO\nworld\ncba",
    sampleinput2: "2\ncapitalize ruby\nreverse 12345",
    sampleoutput2: "Ruby\n54321",
    input1: "1\nuppercase abc",
    output1: "ABC",
    input2: "3\nlowercase XYZ\nreverse hello\ncapitalize foo",
    output2: "xyz\nolleh\nFoo",
    input3: "2\nuppercase a\nreverse abc",
    output3: "A\ncba",
    inputconstrains: "1 <= n <= 50; 1 <= arg length <= 30",
    blacklist: "eval, public_send, instance_eval",
    whitelist: "send, def uppercase, def lowercase",
    sourcecode: `class Handler
  def uppercase(s); s.upcase; end
  def lowercase(s); s.downcase; end
  def reverse(s); s.reverse; end
  def capitalize(s); s.capitalize; end
end

n = gets.to_i
h = Handler.new
n.times do
  op, arg = gets.split
  puts h.send(op, arg)
end
`,
  },
  {
    title: "Model Find By And Count By Missing",
    description:
      "A model supports both find_by_<field> (returns first match id or 'nil') and count_by_<field> (returns count of matches) via method_missing, with respond_to? returning true for both prefixes. Records are passed in via the constructor. Read n then n lines 'op field value' (op in find_by, count_by); dispatch '<op>_<field>' via send and print the result.\n\nInput Format:\nLine 1: integer n. Next n lines: 'op field value'.\n\nOutput Format:\nOne result per line.\n\nConstraints:\n1 <= n <= 50; 1 <= field, value length <= 20.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "respond_to",
    sampleinput1: "3\nfind_by dept Eng\ncount_by dept Eng\nfind_by role Rep",
    sampleoutput1: "1\n2\n3",
    sampleinput2: "2\ncount_by dept Sales\nfind_by role QA",
    sampleoutput2: "1\n2",
    input1: "1\nfind_by id 1",
    output1: "1",
    input2: "3\ncount_by dept Eng\ncount_by dept Sales\nfind_by dept Sales",
    output2: "2\n1\n3",
    input3: "2\nfind_by role Dev\ncount_by role Dev",
    output3: "1\n1",
    inputconstrains: "1 <= n <= 50; 1 <= field, value length <= 20",
    blacklist: "eval, class_eval, instance_eval",
    whitelist: "method_missing, respond_to?, send",
    sourcecode: `class Model
  def initialize(data); @data = data; end
  def method_missing(name, *args)
    n = name.to_s
    if n.start_with?("find_by_")
      field = n.sub("find_by_", "")
      row = @data.find { |r| r[field] == args[0] }
      row ? row["id"] : "nil"
    elsif n.start_with?("count_by_")
      field = n.sub("count_by_", "")
      @data.count { |r| r[field] == args[0] }
    else
      super
    end
  end
  def respond_to?(name)
    n = name.to_s
    n.start_with?("find_by_") || n.start_with?("count_by_") || super
  end
end

data = [
  { "id" => "1", "dept" => "Eng", "role" => "Dev" },
  { "id" => "2", "dept" => "Eng", "role" => "QA" },
  { "id" => "3", "dept" => "Sales", "role" => "Rep" }
]

m = Model.new(data)
n = gets.to_i
n.times do
  line = gets.chomp
  op, field, value = line.split
  puts m.send("#{op}_#{field}", value)
end
`,
  },
];

const mcqs: MCQ[] = [
  // ===== EASY MCQ (10) =====
  {
    title: "Send Method Purpose",
    description: "What does Ruby's `send` method do?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "send Method",
    Option1: "It sends an HTTP request to a remote URL",
    Option2: "It invokes a method on an object by name (string or symbol), passing arguments",
    Option3: "It sends an email message",
    Option4: "It returns the class of an object",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Define Method Purpose",
    description: "What does `define_method` do in Ruby?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "define_method",
    Option1: "It defines a new constant",
    Option2: "It dynamically creates an instance method on a class using a block as the method body",
    Option3: "It deletes an existing method",
    Option4: "It defines a class variable",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Method Missing Trigger",
    description: "When is `method_missing` invoked?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "method_missing",
    Option1: "Whenever any method is called on any object",
    Option2: "When a method that is not defined is called on an object",
    Option3: "When a class is being defined",
    Option4: "When a method returns nil",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Class Eval Context",
    description: "In what context does `class_eval` run its block?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "class_eval and instance_eval",
    Option1: "In the context of a class (self is the class)",
    Option2: "In the context of an instance of an object",
    Option3: "In the context of the top-level main object",
    Option4: "In the context of the Kernel module",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Respond To Return Value",
    description: "What does `obj.respond_to?(:foo)` return?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "respond_to",
    Option1: "The result of calling foo",
    Option2: "true if obj has a method foo, false otherwise",
    Option3: "The class of obj",
    Option4: "Always nil",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Instance Eval Context",
    description: "In what context does `instance_eval` run its block?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "class_eval and instance_eval",
    Option1: "In the context of a class",
    Option2: "In the context of a specific object instance (self is that instance)",
    Option3: "In the context of the Kernel module",
    Option4: "In the context of a thread",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Send Symbol Output",
    description: "What does this Ruby code print?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "send Method",
    Option1: "hello",
    Option2: ":m",
    Option3: "NoMethodError",
    Option4: "nil",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `class A
  def m; "hello"; end
end
puts A.new.send(:m)`,
    snippetLang: "ruby",
  },
  {
    title: "Define Method Then Call",
    description: "What does this Ruby code print?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "define_method",
    Option1: "Hi",
    Option2: "nil",
    Option3: "NoMethodError",
    Option4: "greet",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `class B
  define_method(:greet) { "Hi" }
end
puts B.new.greet`,
    snippetLang: "ruby",
  },
  {
    title: "Method Missing Handles Foo",
    description: "What does this Ruby code print?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "method_missing",
    Option1: "foo",
    Option2: "missing:foo",
    Option3: "nil",
    Option4: "NoMethodError",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `class C
  def method_missing(name, *args)
    "missing:#{name}"
  end
end
puts C.new.foo`,
    snippetLang: "ruby",
  },
  {
    title: "Respond To On Missing Method",
    description: "What does this Ruby code print?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "respond_to",
    Option1: "true",
    Option2: "false",
    Option3: "nil",
    Option4: "bar",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `class R
  def foo; end
end
r = R.new
puts r.respond_to?(:bar)`,
    snippetLang: "ruby",
  },

  // ===== MEDIUM MCQ (6) =====
  {
    title: "Send Bypasses Private Visibility",
    description: "What does this Ruby code print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "send Method",
    Option1: "NoMethodError: private method 'hidden' called",
    Option2: "priv",
    Option3: "pub",
    Option4: "nil",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `class S
  def visible; "pub"; end
  private
  def hidden; "priv"; end
end
s = S.new
puts s.send(:hidden)`,
    snippetLang: "ruby",
  },
  {
    title: "Define Method Closure Capture",
    description: "What does this Ruby code print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "define_method",
    Option1: "1\n1\n1",
    Option2: "3\n3\n3",
    Option3: "1\n2\n3",
    Option4: "0\n1\n2",
    CorrectOption: 3,
    iscodesnippet: true,
    codesnippet: `class D
  [:a, :b, :c].each_with_index do |m, i|
    define_method(m) { i + 1 }
  end
end
d = D.new
puts d.a, d.b, d.c`,
    snippetLang: "ruby",
  },
  {
    title: "Method Missing Returns Sum",
    description: "What does this Ruby code print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "method_missing",
    Option1: "0",
    Option2: "4",
    Option3: "10",
    Option4: "NoMethodError",
    CorrectOption: 3,
    iscodesnippet: true,
    codesnippet: `class M
  def method_missing(name, *args)
    args.sum
  end
end
puts M.new.calculate(1, 2, 3, 4)`,
    snippetLang: "ruby",
  },
  {
    title: "Class Eval Adds Method",
    description: "What does this Ruby code print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "class_eval and instance_eval",
    Option1: "hi",
    Option2: "nil",
    Option3: "NoMethodError",
    Option4: "E",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `class E; end
E.class_eval do
  def hi; "hi"; end
end
puts E.new.hi`,
    snippetLang: "ruby",
  },
  {
    title: "Respond To False For Undefined",
    description: "What does this Ruby code print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "respond_to",
    Option1: "true",
    Option2: "false",
    Option3: "bar",
    Option4: "nil",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `class R
  def foo; "foo"; end
end
r = R.new
puts r.respond_to?(:bar)`,
    snippetLang: "ruby",
  },
  {
    title: "Why Override Respond To With Missing",
    description: "Why should you override `respond_to?` when overriding `method_missing`?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "respond_to",
    Option1: "To make method_missing run faster",
    Option2: "To keep respond_to? consistent with the dynamic methods method_missing handles",
    Option3: "To prevent other classes from inheriting",
    Option4: "It is mandatory or Ruby raises an error",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },

  // ===== HARD MCQ (4) =====
  {
    title: "Send Calls Private Method",
    description: "What does this Ruby code print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "send Method",
    Option1: "42",
    Option2: "NoMethodError: private method 'secret' called",
    Option3: "nil",
    Option4: "0",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `class A
  private
  def secret; 42; end
end
puts A.new.send(:secret)`,
    snippetLang: "ruby",
  },
  {
    title: "Method Missing Super Fallback",
    description: "What does this Ruby code print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "method_missing",
    Option1: "handled:do_thing",
    Option2: "caught",
    Option3: "NoMethodError unhandled",
    Option4: "nil",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `class B
  def method_missing(name, *args)
    return "handled:#{name}" if name.to_s.start_with?("do_")
    super
  end
end
begin
  B.new.do_thing
  B.new.other
rescue NoMethodError
  puts "caught"
end`,
    snippetLang: "ruby",
  },
  {
    title: "Define Method Inside Class Eval",
    description: "What does this Ruby code print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "class_eval and instance_eval",
    Option1: "x\ny",
    Option2: "y\nx",
    Option3: ":x\n:y",
    Option4: "nil\nnil",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `class Q; end
[:x, :y].each do |m|
  Q.class_eval { define_method(m) { m.to_s } }
end
puts Q.new.x, Q.new.y`,
    snippetLang: "ruby",
  },
  {
    title: "Respond To And Missing Combined",
    description: "What does this Ruby code print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "respond_to",
    Option1: "true\ndynamic:dyn_a\nfalse",
    Option2: "false\ndynamic:dyn_a\ntrue",
    Option3: "true\nnil\nfalse",
    Option4: "true\ndynamic:dyn_a\ntrue",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `class O
  def respond_to?(name)
    name.to_s.start_with?("dyn_") ? true : super
  end
  def method_missing(name, *args)
    name.to_s.start_with?("dyn_") ? "dynamic:#{name}" : super
  end
end
o = O.new
puts o.respond_to?(:dyn_a)
puts o.dyn_a
puts o.respond_to?(:foo)`,
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
