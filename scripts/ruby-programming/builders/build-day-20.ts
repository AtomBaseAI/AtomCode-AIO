import { writeFileSync } from "node:fs";

const DAY = 20;
const TOPIC = "Gems and Standard Library";
const SUBTOPICS = [
  "Gemfile and Bundler",
  "require and load",
  "Date and Time Classes",
  "JSON Module",
  "YAML Module",
  "CSV Module",
  "Benchmark Module",
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
    title: "JSON Parse Number Field",
    description:
      "Read a single-line JSON object with an `x` field. Parse it with the JSON module and print the value of `x`.\n\nInput Format:\nLine 1: a JSON object like {\"x\": 5}.\n\nOutput Format:\nThe integer value of the `x` field.\n\nConstraints:\nx is an integer between 0 and 1000.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "JSON Module",
    sampleinput1: "{\"x\": 5}",
    sampleoutput1: "5",
    sampleinput2: "{\"x\": 42}",
    sampleoutput2: "42",
    input1: "{\"x\": 7}",
    output1: "7",
    input2: "{\"x\": 0}",
    output2: "0",
    input3: "{\"x\": 100}",
    output3: "100",
    inputconstrains: "0 <= x <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `require "json"
obj = JSON.parse(gets.chomp)
puts obj["x"]
`,
  },
  {
    title: "Date Weekday Number",
    description:
      "Read three integers y, m, d. Construct a Date object for that calendar day and print its weekday number using `wday` (0 = Sunday, 6 = Saturday).\n\nInput Format:\nLine 1: y m d (year month day).\n\nOutput Format:\nA single integer 0..6 (the weekday).\n\nConstraints:\nValid Gregorian date between 1900-01-01 and 2100-12-31.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Date and Time Classes",
    sampleinput1: "2024 5 15",
    sampleoutput1: "3",
    sampleinput2: "2024 1 1",
    sampleoutput2: "1",
    input1: "2023 12 25",
    output1: "1",
    input2: "2024 2 29",
    output2: "4",
    input3: "2025 6 15",
    output3: "0",
    inputconstrains: "Valid date 1900-01-01 to 2100-12-31",
    blacklist: "",
    whitelist: "",
    sourcecode: `require "date"
y, m, d = gets.split.map(&:to_i)
date = Date.new(y, m, d)
puts date.wday
`,
  },
  {
    title: "CSV Row Count Temp File",
    description:
      "Read n, then n lines of comma-separated values. Write them to /tmp/atom_ruby_csv1.csv, read the file back with CSV.read, and print the number of rows.\n\nInput Format:\nLine 1: integer n. Next n lines: CSV rows.\n\nOutput Format:\nThe number of CSV rows read back.\n\nConstraints:\n1 <= n <= 50; each row has at least 1 column.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "CSV Module",
    sampleinput1: "2\n1,2,3\n4,5,6",
    sampleoutput1: "2",
    sampleinput2: "3\na,b\nc,d\ne,f",
    sampleoutput2: "3",
    input1: "1\nx,y",
    output1: "1",
    input2: "4\n1,2\n3,4\n5,6\n7,8",
    output2: "4",
    input3: "5\nq1,q2\nq3,q4\nq5,q6\nq7,q8\nq9,q10",
    output3: "5",
    inputconstrains: "1 <= n <= 50",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = gets.to_i
lines = []
n.times { lines << gets.chomp }
path = "/tmp/atom_ruby_csv1.csv"
File.open(path, "w") do |f|
  lines.each { |l| f.puts(l) }
end
rows = File.readlines(path).map { |l| l.chomp.split(",") }
puts rows.length
`,
  },
  {
    title: "Time Hour Minute Format",
    description:
      "Read two integers h and m. Construct a Time for January 1, 2024 at h:m:00 using Time.new, then print it formatted as HH:MM (24-hour, zero-padded) using strftime.\n\nInput Format:\nLine 1: integers h and m.\n\nOutput Format:\nA 5-character string HH:MM.\n\nConstraints:\n0 <= h <= 23; 0 <= m <= 59.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Date and Time Classes",
    sampleinput1: "9 30",
    sampleoutput1: "09:30",
    sampleinput2: "14 5",
    sampleoutput2: "14:05",
    input1: "0 0",
    output1: "00:00",
    input2: "23 59",
    output2: "23:59",
    input3: "8 7",
    output3: "08:07",
    inputconstrains: "0 <= h <= 23; 0 <= m <= 59",
    blacklist: "",
    whitelist: "",
    sourcecode: `require "time"
h, m = gets.split.map(&:to_i)
t = Time.new(2024, 1, 1, h, m, 0)
puts t.strftime("%H:%M")
`,
  },
  {
    title: "YAML Load Hash Value",
    description:
      "Read a YAML document from stdin containing a hash with key `x`. Parse it with the YAML module and print the value of `x`.\n\nInput Format:\nOne or more lines of YAML describing a hash with an integer `x` field.\n\nOutput Format:\nThe integer value of `x`.\n\nConstraints:\nx is an integer between 0 and 1000.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "YAML Module",
    sampleinput1: "---\nx: 5\n",
    sampleoutput1: "5",
    sampleinput2: "---\nx: 42\n",
    sampleoutput2: "42",
    input1: "---\nx: 7\n",
    output1: "7",
    input2: "---\nx: 0\n",
    output2: "0",
    input3: "---\nx: 100\n",
    output3: "100",
    inputconstrains: "0 <= x <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `require "yaml"
data = $stdin.read
obj = YAML.load(data)
puts obj["x"]
`,
  },
  {
    title: "Benchmark Sum of Squares",
    description:
      "Read an integer n. Use Benchmark.measure to time the computation of the sum of squares 1^2 + 2^2 + ... + n^2 (the timing itself is ignored). Print the integer result.\n\nInput Format:\nLine 1: integer n.\n\nOutput Format:\nThe integer sum of squares from 1 to n.\n\nConstraints:\n1 <= n <= 1000.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Benchmark Module",
    sampleinput1: "3",
    sampleoutput1: "14",
    sampleinput2: "5",
    sampleoutput2: "55",
    input1: "10",
    output1: "385",
    input2: "1",
    output2: "1",
    input3: "100",
    output3: "338350",
    inputconstrains: "1 <= n <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `require "benchmark"
n = gets.to_i
result = 0
Benchmark.measure do
  (1..n).each { |x| result += x * x }
end
puts result
`,
  },
  // ===== EASY SCENARIO (4) =====
  {
    title: "JSON Service Config Printer",
    description:
      "A microservice's config is a JSON object with `name` and `port` fields. Parse the JSON and print a banner line: \"<name> on port <port>\".\n\nInput Format:\nLine 1: a JSON object like {\"name\":\"api\",\"port\":8080}.\n\nOutput Format:\nA single line: name followed by \" on port \" and the port number.\n\nConstraints:\nname is a non-empty string; 1 <= port <= 65535.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "JSON Module",
    sampleinput1: "{\"name\":\"api\",\"port\":8080}",
    sampleoutput1: "api on port 8080",
    sampleinput2: "{\"name\":\"web\",\"port\":3000}",
    sampleoutput2: "web on port 3000",
    input1: "{\"name\":\"db\",\"port\":5432}",
    output1: "db on port 5432",
    input2: "{\"name\":\"cache\",\"port\":6379}",
    output2: "cache on port 6379",
    input3: "{\"name\":\"mail\",\"port\":25}",
    output3: "mail on port 25",
    inputconstrains: "1 <= port <= 65535",
    blacklist: "",
    whitelist: "",
    sourcecode: `require "json"
obj = JSON.parse(gets.chomp)
puts "#{obj['name']} on port #{obj['port']}"
`,
  },
  {
    title: "Date Difference In Days",
    description:
      "Two calendar dates are provided. Construct Date objects for both and print the integer number of days from the first date to the second date (positive if the second is later).\n\nInput Format:\nLine 1: y1 m1 d1 y2 m2 d2.\n\nOutput Format:\nThe integer difference date2 - date1 in days.\n\nConstraints:\nValid dates between 1900-01-01 and 2100-12-31.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Date and Time Classes",
    sampleinput1: "2024 1 1 2024 1 11",
    sampleoutput1: "10",
    sampleinput2: "2024 5 1 2024 5 15",
    sampleoutput2: "14",
    input1: "2024 1 1 2024 12 31",
    output1: "365",
    input2: "2023 1 1 2024 1 1",
    output2: "365",
    input3: "2024 2 28 2024 3 1",
    output3: "2",
    inputconstrains: "Valid dates 1900-01-01 to 2100-12-31",
    blacklist: "",
    whitelist: "",
    sourcecode: `require "date"
y1, m1, d1, y2, m2, d2 = gets.split.map(&:to_i)
date1 = Date.new(y1, m1, d1)
date2 = Date.new(y2, m2, d2)
puts (date2 - date1).to_i
`,
  },
  {
    title: "CSV Column Sum Temp File",
    description:
      "A shop keeps n line items as CSV rows with two columns: name and amount. Write the rows to /tmp/atom_ruby_csv2.csv, read them back with CSV.read, sum the second column, and print the total.\n\nInput Format:\nLine 1: integer n. Next n lines: name,amount CSV rows.\n\nOutput Format:\nThe integer sum of all amounts.\n\nConstraints:\n1 <= n <= 100; 0 <= amount <= 1000.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "CSV Module",
    sampleinput1: "3\napple,10\nbanana,5\ncherry,7",
    sampleoutput1: "22",
    sampleinput2: "2\nfoo,100\nbar,200",
    sampleoutput2: "300",
    input1: "4\na,1\nb,2\nc,3\nd,4",
    output1: "10",
    input2: "1\nx,99",
    output2: "99",
    input3: "5\np,10\nq,20\nr,30\ns,40\nt,50",
    output3: "150",
    inputconstrains: "1 <= n <= 100; 0 <= amount <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = gets.to_i
lines = []
n.times { lines << gets.chomp }
path = "/tmp/atom_ruby_csv2.csv"
File.open(path, "w") do |f|
  lines.each { |l| f.puts(l) }
end
rows = File.readlines(path).map { |l| l.chomp.split(",") }
total = 0
rows.each { |row| total += row[1].to_i }
puts total
`,
  },
  {
    title: "YAML Config Version Banner",
    description:
      "A release config file is a YAML document with `name` and `version` keys. Parse the document with the YAML module and print \"<name> v<version>\".\n\nInput Format:\nA YAML document on one or more lines with `name` (string) and `version` (integer) keys.\n\nOutput Format:\nA single banner line: name, space, 'v', version.\n\nConstraints:\nname is a lowercase string 1..20 chars; 1 <= version <= 99.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "YAML Module",
    sampleinput1: "---\nname: alpha\nversion: 2\n",
    sampleoutput1: "alpha v2",
    sampleinput2: "---\nname: beta\nversion: 5\n",
    sampleoutput2: "beta v5",
    input1: "---\nname: gamma\nversion: 1\n",
    output1: "gamma v1",
    input2: "---\nname: delta\nversion: 10\n",
    output2: "delta v10",
    input3: "---\nname: prod\nversion: 3\n",
    output3: "prod v3",
    inputconstrains: "name 1..20 chars; 1 <= version <= 99",
    blacklist: "",
    whitelist: "",
    sourcecode: `require "yaml"
data = $stdin.read
obj = YAML.load(data)
puts "#{obj['name']} v#{obj['version']}"
`,
  },
  // ===== MEDIUM SCENARIO (6) =====
  {
    title: "JSON Nested Inventory Sum",
    description:
      "A warehouse inventory comes as a JSON object with an `items` array; each item has a `qty` integer. Parse the JSON and print the total of all item quantities.\n\nInput Format:\nLine 1: a JSON object like {\"items\":[{\"qty\":3},{\"qty\":5}]}.\n\nOutput Format:\nThe integer sum of all qty fields.\n\nConstraints:\n1 <= items.length <= 100; 1 <= qty <= 1000.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "JSON Module",
    sampleinput1: "{\"items\":[{\"qty\":3},{\"qty\":5}]}",
    sampleoutput1: "8",
    sampleinput2: "{\"items\":[{\"qty\":10},{\"qty\":20},{\"qty\":30}]}",
    sampleoutput2: "60",
    input1: "{\"items\":[{\"qty\":1}]}",
    output1: "1",
    input2: "{\"items\":[{\"qty\":7},{\"qty\":8}]}",
    output2: "15",
    input3: "{\"items\":[{\"qty\":100},{\"qty\":200},{\"qty\":300},{\"qty\":400}]}",
    output3: "1000",
    inputconstrains: "1 <= items.length <= 100; 1 <= qty <= 1000",
    blacklist: "sum, inject, reduce",
    whitelist: "require , JSON.parse, each",
    sourcecode: `require "json"
obj = JSON.parse(gets.chomp)
total = 0
obj["items"].each { |item| total += item["qty"] }
puts total
`,
  },
  {
    title: "Date Business Days Counter",
    description:
      "Count weekday days (Monday through Friday) in the inclusive range [start, finish] constructed from two dates. Iterate the date range and count days whose wday is 1..5.\n\nInput Format:\nLine 1: y1 m1 d1 y2 m2 d2 (start then finish).\n\nOutput Format:\nThe number of Mon-Fri days in the inclusive range.\n\nConstraints:\nValid dates 1900-01-01 to 2100-12-31; range span <= 365 days.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Date and Time Classes",
    sampleinput1: "2024 5 13 2024 5 17",
    sampleoutput1: "5",
    sampleinput2: "2024 5 11 2024 5 12",
    sampleoutput2: "0",
    input1: "2024 5 13 2024 5 13",
    output1: "1",
    input2: "2024 1 1 2024 1 7",
    output2: "5",
    input3: "2024 2 1 2024 2 29",
    output3: "21",
    inputconstrains: "Range span <= 365 days",
    blacklist: "select, reject, filter",
    whitelist: "require , Date.new, each",
    sourcecode: `require "date"
y1, m1, d1, y2, m2, d2 = gets.split.map(&:to_i)
start = Date.new(y1, m1, d1)
finish = Date.new(y2, m2, d2)
count = 0
(start..finish).each do |d|
  count += 1 if d.wday >= 1 && d.wday <= 5
end
puts count
`,
  },
  {
    title: "CSV Group By Category Sum",
    description:
      "Sales records come as n CSV rows with two columns: category and amount. Write the rows to /tmp/atom_ruby_csv3.csv, read them back with CSV.read, group amounts by category (sum per category), and print \"<category> <total>\" lines sorted by category.\n\nInput Format:\nLine 1: integer n. Next n lines: category,amount CSV rows.\n\nOutput Format:\nOne line per unique category, sorted, as \"category total\".\n\nConstraints:\n1 <= n <= 100; lowercase category names; 1 <= amount <= 1000.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "CSV Module",
    sampleinput1: "3\nfruit,10\nveg,5\nfruit,3",
    sampleoutput1: "fruit 13\nveg 5",
    sampleinput2: "2\na,1\nb,2",
    sampleoutput2: "a 1\nb 2",
    input1: "4\nx,5\nx,5\ny,3\ny,7",
    output1: "x 10\ny 10",
    input2: "5\nb,1\na,2\nc,3\nb,4\na,5",
    output2: "a 7\nb 5\nc 3",
    input3: "3\nz,1\nz,2\nz,3",
    output3: "z 6",
    inputconstrains: "1 <= n <= 100; 1 <= amount <= 1000",
    blacklist: "group_by, chunk",
    whitelist: "File.open, File.readlines, each",
    sourcecode: `n = gets.to_i
lines = []
n.times { lines << gets.chomp }
path = "/tmp/atom_ruby_csv3.csv"
File.open(path, "w") do |f|
  lines.each { |l| f.puts(l) }
end
rows = File.readlines(path).map { |l| l.chomp.split(",") }
groups = {}
rows.each do |row|
  cat = row[0]
  amt = row[1].to_i
  groups[cat] = 0 unless groups.key?(cat)
  groups[cat] += amt
end
keys = groups.keys.sort
keys.each { |k| puts "#{k} #{groups[k]}" }
`,
  },
  {
    title: "YAML Nested Database Config",
    description:
      "A database config file is a YAML document with a `db` key holding `host` and `port` subkeys. Parse it with the YAML module and print \"<host>:<port>\".\n\nInput Format:\nA multi-line YAML document with the structure: db: { host: <string>, port: <integer> }.\n\nOutput Format:\nA single line: host, colon, port number.\n\nConstraints:\nhost is a lowercase string 1..20 chars; 1 <= port <= 65535.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "YAML Module",
    sampleinput1: "---\ndb:\n  host: localhost\n  port: 5432\n",
    sampleoutput1: "localhost:5432",
    sampleinput2: "---\ndb:\n  host: prod-server\n  port: 3306\n",
    sampleoutput2: "prod-server:3306",
    input1: "---\ndb:\n  host: db1\n  port: 5432\n",
    output1: "db1:5432",
    input2: "---\ndb:\n  host: redis-host\n  port: 6379\n",
    output2: "redis-host:6379",
    input3: "---\ndb:\n  host: mail\n  port: 25\n",
    output3: "mail:25",
    inputconstrains: "host 1..20 chars; 1 <= port <= 65535",
    blacklist: "eval, send, instance_eval",
    whitelist: "require , YAML.load",
    sourcecode: `require "yaml"
data = $stdin.read
obj = YAML.load(data)
puts "#{obj['db']['host']}:#{obj['db']['port']}"
`,
  },
  {
    title: "Time Custom Strftime Format",
    description:
      "Read six integers y mo d h mi s. Construct a Time object for that exact moment using Time.new, then print it formatted as \"YYYY-MM-DD HH:MM:SS\" using strftime.\n\nInput Format:\nLine 1: y mo d h mi s.\n\nOutput Format:\nA 19-character timestamp string.\n\nConstraints:\nValid Time arguments; year 1970..2100.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Date and Time Classes",
    sampleinput1: "2024 5 15 10 30 0",
    sampleoutput1: "2024-05-15 10:30:00",
    sampleinput2: "2023 1 1 0 0 0",
    sampleoutput2: "2023-01-01 00:00:00",
    input1: "2024 12 31 23 59 59",
    output1: "2024-12-31 23:59:59",
    input2: "2025 6 15 14 5 3",
    output2: "2025-06-15 14:05:03",
    input3: "2024 2 29 6 7 8",
    output3: "2024-02-29 06:07:08",
    inputconstrains: "Valid Time args; year 1970..2100",
    blacklist: "Date.new, Date.today, Time.now",
    whitelist: "require , Time.new, strftime",
    sourcecode: `require "time"
y, mo, d, h, mi, s = gets.split.map(&:to_i)
t = Time.new(y, mo, d, h, mi, s)
puts t.strftime("%Y-%m-%d %H:%M:%S")
`,
  },
  {
    title: "Benchmark Loop Versus Formula",
    description:
      "Compute the sum 1 + 2 + ... + n two ways: (a) using a manual loop timed by Benchmark.measure; (b) using the closed-form formula n*(n+1)/2 timed by another Benchmark.measure. Compare both results and print \"match\" if they are equal, otherwise \"mismatch\".\n\nInput Format:\nLine 1: integer n.\n\nOutput Format:\nThe single word \"match\" or \"mismatch\".\n\nConstraints:\n0 <= n <= 100000.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Benchmark Module",
    sampleinput1: "10",
    sampleoutput1: "match",
    sampleinput2: "100",
    sampleoutput2: "match",
    input1: "1",
    output1: "match",
    input2: "0",
    output2: "match",
    input3: "1000",
    output3: "match",
    inputconstrains: "0 <= n <= 100000",
    blacklist: "sum, inject",
    whitelist: "require , Benchmark.measure, each",
    sourcecode: `require "benchmark"
n = gets.to_i
loop_total = 0
Benchmark.measure { (1..n).each { |x| loop_total += x } }
formula_total = n * (n + 1) / 2
Benchmark.measure { formula_total = n * (n + 1) / 2 }
puts loop_total == formula_total ? "match" : "mismatch"
`,
  },
  // ===== HARD SCENARIO (4) =====
  {
    title: "JSON Multi-Document Aggregator",
    description:
      "Read a target year on line 1, then a JSON array on line 2 of records each {\"category\":...,\"amount\":...,\"date\":\"YYYY-MM-DD\"}. Parse the JSON with the JSON module, parse each date with Date.new (split on '-'), filter records whose year matches the target, group amounts by category (summing), and print \"<category> <total>\" lines sorted by category.\n\nInput Format:\nLine 1: integer year. Line 2: a JSON array of records.\n\nOutput Format:\nOne line per category (matching the year), sorted by category name.\n\nConstraints:\n1 <= array length <= 100; 1 <= amount <= 1000.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "JSON Module",
    sampleinput1: "2024\n[{\"category\":\"food\",\"amount\":10,\"date\":\"2024-05-01\"},{\"category\":\"food\",\"amount\":5,\"date\":\"2024-06-01\"},{\"category\":\"travel\",\"amount\":100,\"date\":\"2023-01-01\"}]",
    sampleoutput1: "food 15",
    sampleinput2: "2023\n[{\"category\":\"travel\",\"amount\":100,\"date\":\"2023-01-01\"},{\"category\":\"food\",\"amount\":50,\"date\":\"2024-01-01\"}]",
    sampleoutput2: "travel 100",
    input1: "2024\n[{\"category\":\"a\",\"amount\":1,\"date\":\"2024-01-01\"},{\"category\":\"b\",\"amount\":2,\"date\":\"2024-01-02\"}]",
    output1: "a 1\nb 2",
    input2: "2024\n[{\"category\":\"z\",\"amount\":5,\"date\":\"2024-12-31\"},{\"category\":\"z\",\"amount\":3,\"date\":\"2024-12-30\"}]",
    output2: "z 8",
    input3: "2024\n[{\"category\":\"y\",\"amount\":7,\"date\":\"2024-03-15\"}]",
    output3: "y 7",
    inputconstrains: "1 <= array length <= 100; 1 <= amount <= 1000",
    blacklist: "group_by, chunk, select, filter",
    whitelist: "require , JSON.parse, each, Date.new",
    sourcecode: `require "json"
require "date"
year = gets.to_i
raw = gets.chomp
arr = JSON.parse(raw)
groups = {}
arr.each do |item|
  parts = item["date"].split("-").map(&:to_i)
  d = Date.new(parts[0], parts[1], parts[2])
  next unless d.year == year
  cat = item["category"]
  groups[cat] = 0 unless groups.key?(cat)
  groups[cat] += item["amount"]
end
keys = groups.keys.sort
keys.each { |k| puts "#{k} #{groups[k]}" }
`,
  },
  {
    title: "CSV Unique Column Values",
    description:
      "Read n CSV rows each with a single column (a name). Write them to /tmp/atom_ruby_csv4.csv, read back with CSV.read, collect distinct values preserving first occurrence, then print all distinct values sorted ascending, one per line.\n\nInput Format:\nLine 1: integer n. Next n lines: a single name per line.\n\nOutput Format:\nDistinct names sorted ascending, one per line.\n\nConstraints:\n1 <= n <= 100; names are lowercase 1..20 chars.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "CSV Module",
    sampleinput1: "4\nalice\nbob\nalice\ncarol",
    sampleoutput1: "alice\nbob\ncarol",
    sampleinput2: "3\nx\ny\nz",
    sampleoutput2: "x\ny\nz",
    input1: "5\nb\na\nc\nb\na",
    output1: "a\nb\nc",
    input2: "1\nz",
    output2: "z",
    input3: "6\napple\nbanana\napple\ncherry\nbanana\napple",
    output3: "apple\nbanana\ncherry",
    inputconstrains: "1 <= n <= 100; names 1..20 chars",
    blacklist: "uniq, set, Set",
    whitelist: "File.open, File.readlines, each, sort",
    sourcecode: `n = gets.to_i
lines = []
n.times { lines << gets.chomp }
path = "/tmp/atom_ruby_csv4.csv"
File.open(path, "w") do |f|
  lines.each { |l| f.puts(l) }
end
rows = File.readlines(path).map { |l| l.chomp.split(",") }
seen = {}
result = []
rows.each do |row|
  v = row[0]
  next if seen.key?(v)
  seen[v] = true
  result << v
end
result.sort.each { |v| puts v }
`,
  },
  {
    title: "Date Calendar Quarter Summary",
    description:
      "Read n dates (each as y m d). For each, determine its calendar quarter (Q1 = Jan-Mar, Q2 = Apr-Jun, Q3 = Jul-Sep, Q4 = Oct-Dec). Count how many dates fall into each year-quarter bucket and print \"<year>-Q<q> <count>\" lines sorted ascending by the bucket key.\n\nInput Format:\nLine 1: integer n. Next n lines: y m d.\n\nOutput Format:\nOne line per distinct year-quarter bucket, sorted.\n\nConstraints:\n1 <= n <= 100; valid dates 1970..2100.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Date and Time Classes",
    sampleinput1: "3\n2024 1 15\n2024 2 10\n2024 4 5",
    sampleoutput1: "2024-Q1 2\n2024-Q2 1",
    sampleinput2: "2\n2023 12 1\n2024 1 1",
    sampleoutput2: "2023-Q4 1\n2024-Q1 1",
    input1: "4\n2024 1 1\n2024 1 2\n2024 4 1\n2024 7 1",
    output1: "2024-Q1 2\n2024-Q2 1\n2024-Q3 1",
    input2: "5\n2024 1 1\n2024 4 1\n2024 7 1\n2024 10 1\n2024 10 2",
    output2: "2024-Q1 1\n2024-Q2 1\n2024-Q3 1\n2024-Q4 2",
    input3: "1\n2024 6 15",
    output3: "2024-Q2 1",
    inputconstrains: "1 <= n <= 100; valid dates 1970..2100",
    blacklist: "group_by, chunk, select",
    whitelist: "require , Date.new, each",
    sourcecode: `require "date"
n = gets.to_i
counts = {}
n.times do
  y, m, d = gets.split.map(&:to_i)
  date = Date.new(y, m, d)
  q = (m - 1) / 3 + 1
  key = "#{date.year}-Q#{q}"
  counts[key] = 0 unless counts.key?(key)
  counts[key] += 1
end
keys = counts.keys.sort
keys.each { |k| puts "#{k} #{counts[k]}" }
`,
  },
  {
    title: "YAML Service List Sorter",
    description:
      "A service registry is a YAML document with a `services` list; each entry has `name` and `port` keys. Parse it with the YAML module, sort entries by name ascending, and print \"<name>=<port>\" lines.\n\nInput Format:\nA multi-line YAML document with the structure: services: [ { name: <string>, port: <int> }, ... ].\n\nOutput Format:\nOne line per service, sorted by name: \"name=port\".\n\nConstraints:\n1 <= services.length <= 50; unique names.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "YAML Module",
    sampleinput1: "---\nservices:\n  - name: alpha\n    port: 8080\n  - name: beta\n    port: 3000\n",
    sampleoutput1: "alpha=8080\nbeta=3000",
    sampleinput2: "---\nservices:\n  - name: zeta\n    port: 7000\n",
    sampleoutput2: "zeta=7000",
    input1: "---\nservices:\n  - name: gamma\n    port: 5000\n  - name: delta\n    port: 4000\n",
    output1: "delta=4000\ngamma=5000",
    input2: "---\nservices:\n  - name: b\n    port: 1\n  - name: a\n    port: 2\n  - name: c\n    port: 3\n",
    output2: "a=2\nb=1\nc=3",
    input3: "---\nservices:\n  - name: web\n    port: 80\n",
    output3: "web=80",
    inputconstrains: "1 <= services.length <= 50; unique names",
    blacklist: "eval, send, instance_eval",
    whitelist: "require , YAML.load, each, sort",
    sourcecode: `require "yaml"
data = $stdin.read
obj = YAML.load(data)
services = obj["services"]
pairs = []
services.each { |s| pairs << [s["name"], s["port"]] }
pairs.sort.each { |name, port| puts "#{name}=#{port}" }
`,
  },
];

const mcqs: MCQ[] = [
  // ===== EASY (10) =====
  {
    title: "Require Loads Once",
    description:
      "Which Ruby method loads a file only once even if called multiple times with the same argument?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "require and load",
    Option1: "load",
    Option2: "require",
    Option3: "import",
    Option4: "include",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "JSON Parse Method",
    description:
      "Which method parses a JSON string into Ruby objects?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "JSON Module",
    Option1: "JSON.read",
    Option2: "JSON.parse",
    Option3: "JSON.decode",
    Option4: "JSON.from_string",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Date New Constructor",
    description:
      "Which call constructs a Date object representing year 2024, month 5, day 15?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Date and Time Classes",
    Option1: "Date.create(2024, 5, 15)",
    Option2: "Date.new(2024, 5, 15)",
    Option3: "Date.parse(2024, 5, 15)",
    Option4: "Date(2024, 5, 15)",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "CSV Read All Rows",
    description:
      "Which method reads all rows of a CSV file into an array of arrays in one call?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "CSV Module",
    Option1: "CSV.load",
    Option2: "CSV.open",
    Option3: "CSV.read",
    Option4: "CSV.parse_file",
    CorrectOption: 3,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "YAML Load Method",
    description:
      "Which method parses a YAML document string into Ruby objects?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "YAML Module",
    Option1: "YAML.parse",
    Option2: "YAML.load",
    Option3: "YAML.decode",
    Option4: "YAML.read",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Bundler Purpose",
    description:
      "What does Bundler manage for a Ruby project?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Gemfile and Bundler",
    Option1: "Network connections to gem servers",
    Option2: "Gem dependencies and versions via the Gemfile",
    Option3: "Ruby interpreter versions only",
    Option4: "Test suite execution",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Time Strftime Purpose",
    description:
      "What does the Time#strftime method do?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Date and Time Classes",
    Option1: "Converts a string into a Time object",
    Option2: "Formats a Time as a string according to a directive template",
    Option3: "Adds seconds to a Time",
    Option4: "Returns the Unix epoch of a Time",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "JSON Generate Output",
    description:
      "What does the following code print?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "JSON Module",
    Option1: "{\"a\":1}",
    Option2: "a:1",
    Option3: "[\"a\",1]",
    Option4: "{\"a\"=>1}",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `require "json"
puts JSON.generate({a: 1})
`,
    snippetLang: "ruby",
  },
  {
    title: "Benchmark Measure Return",
    description:
      "What does Ruby's Benchmark.measure method return?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Benchmark Module",
    Option1: "The total elapsed wall-clock seconds as a Float",
    Option2: "A Benchmark::Tms object with user, system, total, and real times",
    Option3: "The result of the block",
    Option4: "nil",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Date Wday Method",
    description:
      "What does Date#wday return?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Date and Time Classes",
    Option1: "Day of the month (1..31)",
    Option2: "Day of the year (1..366)",
    Option3: "Day of week (0=Sunday, 6=Saturday)",
    Option4: "Week number of the year (1..53)",
    CorrectOption: 3,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  // ===== MEDIUM (6) =====
  {
    title: "JSON Parse Keys Sorted",
    description:
      "What does the following code print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "JSON Module",
    Option1: "a,b",
    Option2: "b,a",
    Option3: "[\"a\", \"b\"]",
    Option4: "a b",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `require "json"
h = JSON.parse('{"a":1,"b":2}')
puts h.keys.sort.join(",")
`,
    snippetLang: "ruby",
  },
  {
    title: "Date Leap Day Print",
    description:
      "What does the following code print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Date and Time Classes",
    Option1: "29",
    Option2: "28",
    Option3: "1",
    Option4: "Raises Date::Error",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `require "date"
puts Date.new(2024, 2, 29).day
`,
    snippetLang: "ruby",
  },
  {
    title: "CSV Parse Iterate",
    description:
      "What does the following code print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "CSV Module",
    Option1: "x\ny",
    Option2: "1\n2",
    Option3: "x,1\ny,2",
    Option4: "xy",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `require "csv"
data = "x,1\\ny,2\\n"
CSV.parse(data).each { |row| puts row[0] }
`,
    snippetLang: "ruby",
  },
  {
    title: "YAML Load Hash Key",
    description:
      "What does the following code print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "YAML Module",
    Option1: "alice",
    Option2: "30",
    Option3: "name",
    Option4: "nil",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `require "yaml"
h = YAML.load("---\\nname: alice\\nage: 30\\n")
puts h["name"]
`,
    snippetLang: "ruby",
  },
  {
    title: "Time Plus One Hour",
    description:
      "What does the following code print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Date and Time Classes",
    Option1: "12",
    Option2: "13",
    Option3: "1",
    Option4: "3600",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `require "time"
t = Time.new(2024, 1, 1, 12, 0, 0)
puts (t + 3600).hour
`,
    snippetLang: "ruby",
  },
  {
    title: "Benchmark Bm Output",
    description:
      "What does Benchmark.bm print before each labeled report?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Benchmark Module",
    Option1: "Only the real (wall-clock) time per block",
    Option2: "A header row with user, system, total, and real columns plus each labeled measurement",
    Option3: "The CPU percentage used by each block",
    Option4: "Nothing until benchmark finishes",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  // ===== HARD (4) =====
  {
    title: "JSON Symbolize Names",
    description:
      "What does the following code print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "JSON Module",
    Option1: "String",
    Option2: "Symbol",
    Option3: "Hash",
    Option4: "Array",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `require "json"
h = JSON.parse('{"a":1}', symbolize_names: true)
puts h.keys.first.class
`,
    snippetLang: "ruby",
  },
  {
    title: "Date Shift Month",
    description:
      "What does the following code print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Date and Time Classes",
    Option1: "2024-02-29",
    Option2: "2024-03-01",
    Option3: "2024-02-28",
    Option4: "2024-03-03",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `require "date"
d = Date.new(2024, 1, 31) >> 1
puts d.to_s
`,
    snippetLang: "ruby",
  },
  {
    title: "CSV Headers Option",
    description:
      "What does the following code print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "CSV Module",
    Option1: "5",
    Option2: "apple",
    Option3: "qty",
    Option4: "name",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `require "csv"
data = "name,qty\\napple,5\\nbanana,3\\n"
rows = CSV.parse(data, headers: true)
puts rows.first["qty"]
`,
    snippetLang: "ruby",
  },
  {
    title: "YAML Nested Hash Access",
    description:
      "What does the following code print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "YAML Module",
    Option1: "1",
    Option2: "2",
    Option3: "bar",
    Option4: "nil",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `require "yaml"
config = YAML.load("---\\nfoo:\\n  bar: 1\\n  baz: 2\\n")
puts config["foo"]["bar"]
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
