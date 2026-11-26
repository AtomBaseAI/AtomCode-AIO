import { writeFileSync } from "node:fs";

const DAY = 17;
const TOPIC = "File Handling";
const SUBTOPICS = [
  "File.open and File.new",
  "Reading from Files",
  "Writing to Files",
  "File Modes r w a",
  "File.foreach and File.readlines",
  "Directory Operations with Dir",
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
    title: "Write Greeting File Then Read",
    description:
      "Read a name from stdin, write a greeting to a file, then read the file back and print its contents.\n\nInput Format:\nLine 1: a name (string).\n\nOutput Format:\nThe exact greeting line written to the file.\n\nConstraints:\nName length 1..30, alphabetic only.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Writing to Files",
    sampleinput1: "Alice",
    sampleoutput1: "Hello, Alice!",
    sampleinput2: "Bob",
    sampleoutput2: "Hello, Bob!",
    input1: "Charlie",
    output1: "Hello, Charlie!",
    input2: "Dana",
    output2: "Hello, Dana!",
    input3: "Eve",
    output3: "Hello, Eve!",
    inputconstrains: "Name length 1..30, alphabetic only",
    blacklist: "",
    whitelist: "",
    sourcecode: `name = gets.chomp
path = "/tmp/atom_ruby_greet.txt"
File.open(path, "w") { |f| f.puts "Hello, #{name}!" }
puts File.read(path).chomp
`,
  },
  {
    title: "Read First Line of File",
    description:
      "Read three lines of text, write them to a file, then read back only the first line and print it.\n\nInput Format:\nLines 1-3: any non-empty text lines.\n\nOutput Format:\nThe first line written to the file.\n\nConstraints:\nEach line length 1..50.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Reading from Files",
    sampleinput1: "alpha\nbeta\ngamma",
    sampleoutput1: "alpha",
    sampleinput2: "one\ntwo\nthree",
    sampleoutput2: "one",
    input1: "red\ngreen\nblue",
    output1: "red",
    input2: "first\nsecond\nthird",
    output2: "first",
    input3: "sun\nmoon\nstar",
    output3: "sun",
    inputconstrains: "Each line length 1..50",
    blacklist: "",
    whitelist: "",
    sourcecode: `lines = 3.times.map { gets.chomp }
path = "/tmp/atom_ruby_first_line.txt"
File.open(path, "w") { |f| lines.each { |l| f.puts l } }
first = File.open(path, "r") { |f| f.gets }
puts first.chomp
`,
  },
  {
    title: "Append Line to File",
    description:
      "Read a line, truncate a target file (mode w), append the line (mode a), then read the file back and print its contents.\n\nInput Format:\nLine 1: any non-empty text.\n\nOutput Format:\nThe appended line.\n\nConstraints:\nLine length 1..100.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "File Modes r w a",
    sampleinput1: "hello world",
    sampleoutput1: "hello world",
    sampleinput2: "ruby files",
    sampleoutput2: "ruby files",
    input1: "appended text",
    output1: "appended text",
    input2: "test line",
    output2: "test line",
    input3: "final entry",
    output3: "final entry",
    inputconstrains: "Line length 1..100",
    blacklist: "",
    whitelist: "",
    sourcecode: `line = gets.chomp
path = "/tmp/atom_ruby_append.txt"
File.open(path, "w") { |f| }
File.open(path, "a") { |f| f.puts line }
puts File.read(path).chomp
`,
  },
  {
    title: "Write Numbers Read Sum",
    description:
      "Read an integer n followed by n integers, write each integer on its own line to a file, then read the file back and print the sum of the integers.\n\nInput Format:\nLine 1: integer n. Lines 2..n+1: integer values.\n\nOutput Format:\nThe integer sum.\n\nConstraints:\n1 <= n <= 100; -1000 <= value <= 1000.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "File.open and File.new",
    sampleinput1: "3\n5\n10\n15",
    sampleoutput1: "30",
    sampleinput2: "2\n-3\n7",
    sampleoutput2: "4",
    input1: "4\n1\n2\n3\n4",
    output1: "10",
    input2: "1\n42",
    output2: "42",
    input3: "5\n-1\n-2\n-3\n-4\n-5",
    output3: "-15",
    inputconstrains: "1 <= n <= 100; -1000 <= value <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = gets.to_i
nums = n.times.map { gets.to_i }
path = "/tmp/atom_ruby_nums.txt"
File.open(path, "w") { |f| nums.each { |x| f.puts x } }
sum = 0
File.open(path, "r") { |f| f.each_line { |l| sum += l.to_i } }
puts sum
`,
  },
  {
    title: "Readlines Count Lines",
    description:
      "Read an integer n followed by n lines of text, write them to a file, then read back with `File.readlines` and print the number of lines stored.\n\nInput Format:\nLine 1: integer n. Lines 2..n+1: any non-empty text.\n\nOutput Format:\nThe integer count of lines (equal to n).\n\nConstraints:\n1 <= n <= 50; each line length 1..80.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "File.foreach and File.readlines",
    sampleinput1: "3\napple\nbanana\ncherry",
    sampleoutput1: "3",
    sampleinput2: "2\nfoo\nbar",
    sampleoutput2: "2",
    input1: "1\nonly one",
    output1: "1",
    input2: "4\na\nb\nc\nd",
    output2: "4",
    input3: "5\nred\norange\nyellow\ngreen\nblue",
    output3: "5",
    inputconstrains: "1 <= n <= 50; each line length 1..80",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = gets.to_i
lines = n.times.map { gets.chomp }
path = "/tmp/atom_ruby_count.txt"
File.open(path, "w") { |f| lines.each { |l| f.puts l } }
arr = File.readlines(path)
puts arr.size
`,
  },
  {
    title: "Create Dir and Glob Files",
    description:
      "Read two file basenames (no extension), create a directory if needed, write a single-line .txt file for each name, then count the .txt files inside the directory using `Dir.glob`.\n\nInput Format:\nLine 1: two space-separated basenames (alphabetic only).\n\nOutput Format:\nThe integer 2.\n\nConstraints:\nEach basename length 1..20, lowercase letters only.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Directory Operations with Dir",
    sampleinput1: "alpha beta",
    sampleoutput1: "2",
    sampleinput2: "foo bar",
    sampleoutput2: "2",
    input1: "red blue",
    output1: "2",
    input2: "cat dog",
    output2: "2",
    input3: "sun moon",
    output3: "2",
    inputconstrains: "Each basename length 1..20, lowercase letters only",
    blacklist: "",
    whitelist: "",
    sourcecode: `names = gets.split
dir = "/tmp/atom_ruby_basic_dir"
Dir.mkdir(dir) unless Dir.exist?(dir)
Dir.glob("#{dir}/*.txt").each { |p| File.delete(p) }
names.each do |name|
  File.open("#{dir}/#{name}.txt", "w") { |f| f.puts "x" }
end
puts Dir.glob("#{dir}/*.txt").size
`,
  },

  // ===== EASY SCENARIO (4) =====
  {
    title: "Library Log Appender",
    description:
      "A library checkout system appends each book title to a daily log file. Read a book title, write `LOG START` to the file (mode w), then append the title (mode a), and finally read the file back and print the last line.\n\nInput Format:\nLine 1: a book title.\n\nOutput Format:\nThe book title line.\n\nConstraints:\nTitle length 1..100.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "File Modes r w a",
    sampleinput1: "The Ruby Way",
    sampleoutput1: "The Ruby Way",
    sampleinput2: "Eloquent Ruby",
    sampleoutput2: "Eloquent Ruby",
    input1: "Design Patterns",
    output1: "Design Patterns",
    input2: "Clean Code",
    output2: "Clean Code",
    input3: "Refactoring",
    output3: "Refactoring",
    inputconstrains: "Title length 1..100",
    blacklist: "",
    whitelist: "",
    sourcecode: `line = gets.chomp
path = "/tmp/atom_ruby_library.log"
File.open(path, "w") { |f| f.puts "LOG START" }
File.open(path, "a") { |f| f.puts line }
all = File.readlines(path)
puts all.last.chomp
`,
  },
  {
    title: "Coupon Code Tally",
    description:
      "A cashier enters coupon codes; valid promotional coupons start with the prefix `SAVE`. Read n coupon codes, write each to a file, then use `File.foreach` to count those starting with `SAVE`.\n\nInput Format:\nLine 1: integer n. Lines 2..n+1: coupon codes (uppercase letters and digits only).\n\nOutput Format:\nThe count of SAVE-prefixed coupons.\n\nConstraints:\n1 <= n <= 50; each code length 1..20.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "File.foreach and File.readlines",
    sampleinput1: "4\nSAVE10\nSAVE20\nDISC5\nSAVE30",
    sampleoutput1: "3",
    sampleinput2: "3\nHELLO\nSAVE5\nWORLD",
    sampleoutput2: "1",
    input1: "2\nSAVE1\nSAVE2",
    output1: "2",
    input2: "3\nABC\nDEF\nGHI",
    output2: "0",
    input3: "5\nSAVE\nDISC\nSAVE\nPROMO\nSAVE",
    output3: "3",
    inputconstrains: "1 <= n <= 50; each code length 1..20",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = gets.to_i
codes = n.times.map { gets.chomp }
path = "/tmp/atom_ruby_coupons.txt"
File.open(path, "w") { |f| codes.each { |c| f.puts c } }
count = 0
File.foreach(path) { |l| count += 1 if l.start_with?("SAVE") }
puts count
`,
  },
  {
    title: "Inventory Snapshot Writer",
    description:
      "An inventory clerk records three items (name, quantity, unit price) and saves a formatted receipt file. Read the three items, write each as `name xQTY @ PRICE`, then read the file back and print its full contents.\n\nInput Format:\nLines 1-3: each `name qty price` (whitespace-separated, price has 2 decimals).\n\nOutput Format:\nThree lines mirroring the file contents.\n\nConstraints:\nName length 1..20; 1 <= qty <= 100; 0.01 <= price <= 1000.00.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Writing to Files",
    sampleinput1: "apple 5 2.00\nbanana 3 1.50\ncherry 2 4.00",
    sampleoutput1: "apple x5 @ 2.00\nbanana x3 @ 1.50\ncherry x2 @ 4.00",
    sampleinput2: "pen 10 1.25\nbook 2 8.99\nlamp 1 15.50",
    sampleoutput2: "pen x10 @ 1.25\nbook x2 @ 8.99\nlamp x1 @ 15.50",
    input1: "mug 4 3.50\ntoy 7 6.00\nbag 1 12.75",
    output1: "mug x4 @ 3.50\ntoy x7 @ 6.00\nbag x1 @ 12.75",
    input2: "x 1 0.50\ny 2 1.00\nz 3 1.50",
    output2: "x x1 @ 0.50\ny x2 @ 1.00\nz x3 @ 1.50",
    input3: "chair 1 25.00\ndesk 2 50.00\nmat 3 5.00",
    output3: "chair x1 @ 25.00\ndesk x2 @ 50.00\nmat x3 @ 5.00",
    inputconstrains: "Name length 1..20; 1 <= qty <= 100; 0.01 <= price <= 1000.00",
    blacklist: "",
    whitelist: "",
    sourcecode: `items = 3.times.map { gets.split }
path = "/tmp/atom_ruby_receipt.txt"
File.open(path, "w") do |f|
  items.each do |row|
    name, qty, price = row
    f.puts "#{name} x#{qty} @ #{price}"
  end
end
puts File.read(path).chomp
`,
  },
  {
    title: "Directory Listing Report",
    description:
      "A sysadmin wants a listing of the latest log files in a working directory. Read an integer k, create the directory if needed, write `file1.log` through `filek.log` (each containing its index), then list them sorted by name (basename only).\n\nInput Format:\nLine 1: integer k.\n\nOutput Format:\nk lines, each the basename of one log file in sorted order.\n\nConstraints:\n1 <= k <= 10.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Directory Operations with Dir",
    sampleinput1: "3",
    sampleoutput1: "file1.log\nfile2.log\nfile3.log",
    sampleinput2: "2",
    sampleoutput2: "file1.log\nfile2.log",
    input1: "1",
    output1: "file1.log",
    input2: "4",
    output2: "file1.log\nfile2.log\nfile3.log\nfile4.log",
    input3: "5",
    output3: "file1.log\nfile2.log\nfile3.log\nfile4.log\nfile5.log",
    inputconstrains: "1 <= k <= 10",
    blacklist: "",
    whitelist: "",
    sourcecode: `k = gets.to_i
dir = "/tmp/atom_ruby_listing"
Dir.mkdir(dir) unless Dir.exist?(dir)
Dir.glob("#{dir}/*.log").each { |p| File.delete(p) }
1.upto(k) do |i|
  File.open("#{dir}/file#{i}.log", "w") { |f| f.puts "log #{i}" }
end
files = Dir.glob("#{dir}/*.log").sort
files.each { |p| puts File.basename(p) }
`,
  },

  // ===== MEDIUM SCENARIO (6) =====
  {
    title: "Sales Transaction Ledger Reader",
    description:
      "A store records daily transactions to a flat file. Read n transactions (each: `product qty price`), write them to a ledger file, then use `File.foreach` to compute total revenue and print `TOTAL: X.XX`.\n\nInput Format:\nLine 1: integer n. Lines 2..n+1: `product qty price` whitespace-separated.\n\nOutput Format:\n`TOTAL: X.XX` with 2 decimal places.\n\nConstraints:\n1 <= n <= 100; 1 <= qty <= 100; 0.01 <= price <= 1000.00.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "File.foreach and File.readlines",
    sampleinput1: "3\napple 5 2.00\nbanana 3 1.50\ncherry 2 4.00",
    sampleoutput1: "TOTAL: 22.50",
    sampleinput2: "2\npen 10 1.25\nbook 2 8.99",
    sampleoutput2: "TOTAL: 30.48",
    input1: "1\nlamp 1 15.50",
    output1: "TOTAL: 15.50",
    input2: "4\nx 1 0.50\ny 2 1.00\nz 3 1.50\nw 4 2.00",
    output2: "TOTAL: 15.00",
    input3: "2\nbag 1 12.75\ntoy 7 6.00",
    output3: "TOTAL: 54.75",
    inputconstrains: "1 <= n <= 100; 1 <= qty <= 100; 0.01 <= price <= 1000.00",
    blacklist: "File.readlines, File.read, readlines",
    whitelist: "File.foreach, File.open",
    sourcecode: `n = gets.to_i
txns = n.times.map { gets.split }
path = "/tmp/atom_ruby_ledger.txt"
File.open(path, "w") do |f|
  txns.each do |row|
    product, qty, price = row
    f.puts "#{product} #{qty} #{price}"
  end
end
total = 0.0
File.foreach(path) do |line|
  parts = line.split
  total += parts[1].to_i * parts[2].to_f
end
puts "TOTAL: #{"%.2f" % total}"
`,
  },
  {
    title: "Reverse Lines to Mirror File",
    description:
      "A log archiver wants to keep a reversed copy of a log file. Read n lines, write them to a source file, read them back with `File.readlines`, reverse the order, and write the reversed lines to a mirror file. Print the mirror file contents.\n\nInput Format:\nLine 1: integer n. Lines 2..n+1: any non-empty text.\n\nOutput Format:\nn lines, the input lines reversed in order.\n\nConstraints:\n1 <= n <= 100; each line length 1..80.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Reading from Files",
    sampleinput1: "3\nalpha\nbeta\ngamma",
    sampleoutput1: "gamma\nbeta\nalpha",
    sampleinput2: "2\nfirst\nsecond",
    sampleoutput2: "second\nfirst",
    input1: "1\nonly",
    output1: "only",
    input2: "4\na\nb\nc\nd",
    output2: "d\nc\nb\na",
    input3: "3\nred\ngreen\nblue",
    output3: "blue\ngreen\nred",
    inputconstrains: "1 <= n <= 100; each line length 1..80",
    blacklist: "File.foreach, foreach",
    whitelist: "File.readlines, File.open",
    sourcecode: `n = gets.to_i
lines = n.times.map { gets.chomp }
src = "/tmp/atom_ruby_src.txt"
mirror = "/tmp/atom_ruby_mirror.txt"
File.open(src, "w") { |f| lines.each { |l| f.puts l } }
arr = File.readlines(src)
File.open(mirror, "w") { |f| arr.reverse.each { |l| f.puts l.chomp } }
puts File.read(mirror).chomp
`,
  },
  {
    title: "Append Marker Line Counter",
    description:
      "A data pipeline writes n records to a file (mode w), then appends an `END` marker line (mode a). Read the file back (mode r) and print the total number of lines stored.\n\nInput Format:\nLine 1: integer n. Lines 2..n+1: any non-empty text records.\n\nOutput Format:\nThe integer n+1.\n\nConstraints:\n1 <= n <= 100; each record length 1..80.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "File Modes r w a",
    sampleinput1: "3\nfoo\nbar\nbaz",
    sampleoutput1: "4",
    sampleinput2: "2\nalpha\nbeta",
    sampleoutput2: "3",
    input1: "1\nsingle",
    output1: "2",
    input2: "4\na\nb\nc\nd",
    output2: "5",
    input3: "5\nx\ny\nz\nw\nv",
    output3: "6",
    inputconstrains: "1 <= n <= 100; each record length 1..80",
    blacklist: "File.read, File.write",
    whitelist: "File.open, \"a\"",
    sourcecode: `n = gets.to_i
words = n.times.map { gets.chomp }
path = "/tmp/atom_ruby_marker.txt"
File.open(path, "w") { |f| words.each { |w| f.puts w } }
File.open(path, "a") { |f| f.puts "END" }
count = 0
File.open(path, "r") { |f| f.each_line { count += 1 } }
puts count
`,
  },
  {
    title: "Directory Snapshot Sorted Listing",
    description:
      "A release engineer needs a sorted listing of all asset files in a snapshot directory. Read n asset names, create the directory (clearing old .txt files first), write one .txt file per asset (containing its own name), then list basenames sorted alphabetically.\n\nInput Format:\nLine 1: integer n. Lines 2..n+1: asset basenames (lowercase letters only).\n\nOutput Format:\nn basenames sorted alphabetically, one per line.\n\nConstraints:\n1 <= n <= 50; each basename length 1..20, lowercase letters only.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Directory Operations with Dir",
    sampleinput1: "3\nzebra\napple\nmango",
    sampleoutput1: "apple\nmango\nzebra",
    sampleinput2: "2\nbeta\nalpha",
    sampleoutput2: "alpha\nbeta",
    input1: "1\nonly",
    output1: "only",
    input2: "4\ndog\ncat\nant\nbee",
    output2: "ant\nbee\ncat\ndog",
    input3: "3\nred\nblue\ngreen",
    output3: "blue\ngreen\nred",
    inputconstrains: "1 <= n <= 50; each basename length 1..20, lowercase letters only",
    blacklist: "Dir.entries, Dir.foreach, Dir.children",
    whitelist: "Dir.glob, Dir.mkdir",
    sourcecode: `n = gets.to_i
names = n.times.map { gets.chomp }
dir = "/tmp/atom_ruby_snapshot"
Dir.mkdir(dir) unless Dir.exist?(dir)
Dir.glob("#{dir}/*.txt").each { |p| File.delete(p) }
names.each do |name|
  File.open("#{dir}/#{name}.txt", "w") { |f| f.puts name }
end
files = Dir.glob("#{dir}/*.txt").sort
files.each { |p| puts File.basename(p, ".txt") }
`,
  },
  {
    title: "File Line and Char Tally",
    description:
      "A text-mining tool needs the number of lines and total characters (excluding newlines) in a document. Read n lines, write them to a file, then use `File.foreach` to count lines and characters, printing `LINES: X CHARS: Y`.\n\nInput Format:\nLine 1: integer n. Lines 2..n+1: any non-empty text.\n\nOutput Format:\n`LINES: X CHARS: Y` with X=n and Y=total non-newline chars.\n\nConstraints:\n1 <= n <= 100; each line length 1..80.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "File.foreach and File.readlines",
    sampleinput1: "3\nhello\nworld\nruby",
    sampleoutput1: "LINES: 3 CHARS: 14",
    sampleinput2: "2\nfoo\nbar",
    sampleoutput2: "LINES: 2 CHARS: 6",
    input1: "1\nsingle",
    output1: "LINES: 1 CHARS: 6",
    input2: "4\na\nbb\nccc\ndddd",
    output2: "LINES: 4 CHARS: 10",
    input3: "3\nab\ncd\nef",
    output3: "LINES: 3 CHARS: 6",
    inputconstrains: "1 <= n <= 100; each line length 1..80",
    blacklist: "File.readlines, File.read",
    whitelist: "File.foreach, File.open",
    sourcecode: `n = gets.to_i
lines = n.times.map { gets.chomp }
path = "/tmp/atom_ruby_tally.txt"
File.open(path, "w") { |f| lines.each { |l| f.puts l } }
line_count = 0
char_count = 0
File.foreach(path) do |l|
  line_count += 1
  char_count += l.chomp.length
end
puts "LINES: #{line_count} CHARS: #{char_count}"
`,
  },
  {
    title: "Receipt Append Total Line",
    description:
      "A POS system writes itemized receipts then appends a TOTAL line. Read 3 items (each: `name price qty`), write the items to a file (mode w), append `TOTAL X.XX` (mode a), then read back and print all lines.\n\nInput Format:\nLines 1-3: each `name price qty` (whitespace-separated, price has 2 decimals).\n\nOutput Format:\nFour lines: the three item lines followed by `TOTAL X.XX`.\n\nConstraints:\nName length 1..20; 0.01 <= price <= 1000.00; 1 <= qty <= 100.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "File Modes r w a",
    sampleinput1: "apple 2.00 5\nbanana 1.50 3\ncherry 4.00 2",
    sampleoutput1: "apple 2.00 5\nbanana 1.50 3\ncherry 4.00 2\nTOTAL 22.50",
    sampleinput2: "pen 1.25 10\nbook 8.99 2\nlamp 15.50 1",
    sampleoutput2: "pen 1.25 10\nbook 8.99 2\nlamp 15.50 1\nTOTAL 45.98",
    input1: "x 0.50 1\ny 1.00 2\nz 1.50 3",
    output1: "x 0.50 1\ny 1.00 2\nz 1.50 3\nTOTAL 7.00",
    input2: "mug 3.50 4\ntoy 6.00 7\nbag 12.75 1",
    output2: "mug 3.50 4\ntoy 6.00 7\nbag 12.75 1\nTOTAL 68.75",
    input3: "a 1.00 1\nb 2.00 2\nc 3.00 3",
    output3: "a 1.00 1\nb 2.00 2\nc 3.00 3\nTOTAL 14.00",
    inputconstrains: "Name length 1..20; 0.01 <= price <= 1000.00; 1 <= qty <= 100",
    blacklist: "File.write",
    whitelist: "File.open, \"a\"",
    sourcecode: `items = 3.times.map { gets.split }
path = "/tmp/atom_ruby_receipt2.txt"
total = 0.0
File.open(path, "w") do |f|
  items.each do |row|
    name, price, qty = row
    f.puts "#{name} #{price} #{qty}"
    total += price.to_f * qty.to_i
  end
end
formatted = "%.2f" % total
File.open(path, "a") { |f| f.puts "TOTAL #{formatted}" }
content = ""
File.open(path, "r") { |f| content = f.read }
puts content.chomp
`,
  },

  // ===== HARD SCENARIO (4) =====
  {
    title: "Audit Log Level Summary",
    description:
      "An SRE ingests audit log entries and produces a level summary report. Read n log lines (each: `LEVEL message`), write them to a log file, use `File.foreach` to count ERROR/WARN/INFO occurrences, write a summary file (`LEVEL: COUNT` per line), then read the summary back and print it.\n\nInput Format:\nLine 1: integer n. Lines 2..n+1: `LEVEL message` (LEVEL is one of ERROR, WARN, INFO).\n\nOutput Format:\nThree lines: `ERROR: X`, `WARN: Y`, `INFO: Z` (in that fixed order).\n\nConstraints:\n1 <= n <= 100; LEVEL is ERROR, WARN, or INFO; message length 1..80.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "File.foreach and File.readlines",
    sampleinput1: "5\nERROR db down\nWARN slow query\nINFO started\nERROR timeout\nINFO done",
    sampleoutput1: "ERROR: 2\nWARN: 1\nINFO: 2",
    sampleinput2: "4\nINFO boot\nINFO ready\nWARN low mem\nERROR crash",
    sampleoutput2: "ERROR: 1\nWARN: 1\nINFO: 2",
    input1: "3\nERROR a\nERROR b\nERROR c",
    output1: "ERROR: 3\nWARN: 0\nINFO: 0",
    input2: "2\nWARN x\nWARN y",
    output2: "ERROR: 0\nWARN: 2\nINFO: 0",
    input3: "5\nINFO a\nWARN b\nERROR c\nINFO d\nWARN e",
    output3: "ERROR: 1\nWARN: 2\nINFO: 2",
    inputconstrains: "1 <= n <= 100; LEVEL is ERROR, WARN, or INFO; message length 1..80",
    blacklist: "File.readlines, File.read, readlines",
    whitelist: "File.foreach, File.open, \"w\"",
    sourcecode: `n = gets.to_i
entries = n.times.map { gets.chomp }
log_path = "/tmp/atom_ruby_audit.log"
File.open(log_path, "w") { |f| entries.each { |e| f.puts e } }
counts = { "ERROR" => 0, "WARN" => 0, "INFO" => 0 }
File.foreach(log_path) do |line|
  level = line.split.first
  counts[level] += 1 if counts.key?(level)
end
summary_path = "/tmp/atom_ruby_audit_summary.txt"
File.open(summary_path, "w") do |f|
  counts.each { |lvl, c| f.puts "#{lvl}: #{c}" }
end
output = ""
File.open(summary_path, "r") { |f| output = f.read }
puts output.chomp
`,
  },
  {
    title: "Recursive Glob File Counter",
    description:
      "A build tool counts note files across nested project directories. Read an integer k, create k subdirectories (sub1..subk) under a k-named root, place one `note.txt` in each subdir, then count all `.txt` files recursively using `Dir.glob` with the `**` pattern.\n\nInput Format:\nLine 1: integer k.\n\nOutput Format:\nThe integer k.\n\nConstraints:\n1 <= k <= 10.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Directory Operations with Dir",
    sampleinput1: "2",
    sampleoutput1: "2",
    sampleinput2: "4",
    sampleoutput2: "4",
    input1: "3",
    output1: "3",
    input2: "5",
    output2: "5",
    input3: "1",
    output3: "1",
    inputconstrains: "1 <= k <= 10",
    blacklist: "Dir.entries, Dir.foreach, Find.find",
    whitelist: "Dir.glob, Dir.mkdir, **",
    sourcecode: `k = gets.to_i
root = "/tmp/atom_ruby_tree_k#{k}"
Dir.mkdir(root) unless Dir.exist?(root)
1.upto(k) do |i|
  subdir = "#{root}/sub#{i}"
  Dir.mkdir(subdir) unless Dir.exist?(subdir)
  File.open("#{subdir}/note.txt", "w") { |f| f.puts "file #{i}" }
end
files = Dir.glob("#{root}/**/*.txt")
puts files.size
`,
  },
  {
    title: "Running Balance Append Ledger",
    description:
      "A bank teller appends deposit amounts to a ledger file and tracks the running balance. Read n amounts, append each amount to the ledger (mode a, after truncating first), then use `File.foreach` over the ledger to compute running balances and append each to a balances file. Print the final running balance with 2 decimals.\n\nInput Format:\nLine 1: integer n. Lines 2..n+1: positive float amounts.\n\nOutput Format:\nThe final running balance formatted to 2 decimals.\n\nConstraints:\n1 <= n <= 100; 0.01 <= amount <= 10000.00.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "File Modes r w a",
    sampleinput1: "3\n10.50\n5.25\n4.25",
    sampleoutput1: "20.00",
    sampleinput2: "2\n100.00\n25.50",
    sampleoutput2: "125.50",
    input1: "1\n7.77",
    output1: "7.77",
    input2: "4\n1.00\n2.00\n3.00\n4.00",
    output2: "10.00",
    input3: "3\n0.50\n0.50\n0.50",
    output3: "1.50",
    inputconstrains: "1 <= n <= 100; 0.01 <= amount <= 10000.00",
    blacklist: "File.readlines, File.read, readlines",
    whitelist: "File.foreach, File.open, \"a\"",
    sourcecode: `n = gets.to_i
amounts = n.times.map { gets.to_f }
ledger = "/tmp/atom_ruby_recon_ledger.txt"
balances = "/tmp/atom_ruby_recon_balances.txt"
File.open(ledger, "w") { |f| }
File.open(balances, "w") { |f| }
amounts.each do |a|
  File.open(ledger, "a") { |f| f.puts a }
end
running = 0.0
File.foreach(ledger) do |line|
  running += line.to_f
  File.open(balances, "a") { |f| f.puts "%.2f" % running }
end
final = 0.0
File.foreach(balances) do |line|
  final = line.to_f
end
puts "%.2f" % final
`,
  },
  {
    title: "Catalog CSV to Summary File",
    description:
      "A shop exports its catalog as a CSV-like file and wants a summary report. Read n rows (each: `sku,name,price`), write each to a catalog file, read back with `File.readlines` (parsing CSV manually by splitting on commas — do NOT use the CSV library), compute the count and total price, write `COUNT n` and `TOTAL X.XX` lines to a summary file, append an `END` marker, then read back and print the summary.\n\nInput Format:\nLine 1: integer n. Lines 2..n+1: `sku,name,price` (price has 2 decimals).\n\nOutput Format:\nThree lines: `COUNT n`, `TOTAL X.XX`, `END`.\n\nConstraints:\n1 <= n <= 100; sku length 1..10; name length 1..20; 0.01 <= price <= 1000.00.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "File Modes r w a",
    sampleinput1: "3\nA1,apple,1.50\nB2,banana,0.75\nC3,cherry,2.25",
    sampleoutput1: "COUNT 3\nTOTAL 4.50\nEND",
    sampleinput2: "2\nX1,pen,1.25\nY2,book,8.99",
    sampleoutput2: "COUNT 2\nTOTAL 10.24\nEND",
    input1: "1\nZ9,lamp,15.50",
    output1: "COUNT 1\nTOTAL 15.50\nEND",
    input2: "4\nP1,mug,3.50\nP2,toy,6.00\nP3,bag,12.75\nP4,hat,9.25",
    output2: "COUNT 4\nTOTAL 31.50\nEND",
    input3: "3\nM1,a,0.50\nM2,b,1.00\nM3,c,1.50",
    output3: "COUNT 3\nTOTAL 3.00\nEND",
    inputconstrains: "1 <= n <= 100; sku length 1..10; name length 1..20; 0.01 <= price <= 1000.00",
    blacklist: "CSV, require, File.foreach",
    whitelist: "File.readlines, File.open",
    sourcecode: `n = gets.to_i
rows = n.times.map { gets.chomp }
catalog_path = "/tmp/atom_ruby_catalog.txt"
File.open(catalog_path, "w") { |f| rows.each { |r| f.puts r } }
total = 0.0
count = 0
File.readlines(catalog_path).each do |line|
  parts = line.chomp.split(",")
  total += parts[2].to_f
  count += 1
end
summary_path = "/tmp/atom_ruby_catalog_summary.txt"
File.open(summary_path, "w") do |f|
  f.puts "COUNT #{count}"
  f.puts "TOTAL #{"%.2f" % total}"
end
File.open(summary_path, "a") { |f| f.puts "END" }
content = ""
File.open(summary_path, "r") { |f| content = f.read }
puts content.chomp
`,
  },
];

const mcqs: MCQ[] = [
  // ===== EASY (10) =====
  {
    title: "File Open Block Closes",
    description:
      "When you call `File.open(path, \"w\") { |f| f.puts \"x\" }`, what happens to the file after the block ends?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "File.open and File.new",
    Option1: "It is automatically closed",
    Option2: "It remains open until program exit",
    Option3: "It is automatically deleted",
    Option4: "It is flushed but not closed",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "File Read Returns String",
    description: "What does `File.read(path)` return?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Reading from Files",
    Option1: "An array of lines",
    Option2: "The entire file contents as a single String",
    Option3: "An IO object",
    Option4: "The number of bytes read",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "File Mode a Appends",
    description: "Opening an existing file with mode `\"a\"` (append) means subsequent writes will...",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "File Modes r w a",
    Option1: "Truncate the file then write from the start",
    Option2: "Fail because the file already exists",
    Option3: "Be appended to the end of the file",
    Option4: "Overwrite only the first line",
    CorrectOption: 3,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "File Foreach Streams Lines",
    description: "Which best describes `File.foreach(path) { |line| ... }`?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "File.foreach and File.readlines",
    Option1: "Reads the entire file into memory then iterates",
    Option2: "Yields each line one at a time without loading the whole file",
    Option3: "Returns an Array of lines",
    Option4: "Skips blank lines automatically",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "File Foreach Output",
    description: "What does the following snippet print?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "File.foreach and File.readlines",
    Option1: "a\\nb",
    Option2: "ab",
    Option3: "[\"a\", \"b\"]",
    Option4: "(nothing)",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `File.write("/tmp/atom_ruby_mcq5.txt", "a\nb\n")
File.foreach("/tmp/atom_ruby_mcq5.txt") { |l| puts l.chomp }
`,
    snippetLang: "ruby",
  },
  {
    title: "Dir Glob Returns Array",
    description: "What does `Dir.glob(\"*.txt\")` return?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Directory Operations with Dir",
    Option1: "An Array of matching file paths",
    Option2: "A single String of paths joined by spaces",
    Option3: "An Enumerator",
    Option4: "nil if no matches are found",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "File Write Method Usage",
    description: "Which method writes a string to a file in a single call (creating or truncating the file)?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Writing to Files",
    Option1: "File.write(path, content)",
    Option2: "File.save(path, content)",
    Option3: "File.export(path, content)",
    Option4: "File.dump(path, content)",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "File Mode w Truncates",
    description: "What does the following snippet print?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "File Modes r w a",
    Option1: "new",
    Option2: "old data",
    Option3: "old data\\nnew",
    Option4: "(error)",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `File.write("/tmp/atom_ruby_mcq8.txt", "old data")
File.open("/tmp/atom_ruby_mcq8.txt", "w") { |f| f.puts "new" }
puts File.read("/tmp/atom_ruby_mcq8.txt")
`,
    snippetLang: "ruby",
  },
  {
    title: "File Readlines Array Size",
    description: "What does the following snippet print?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "File.foreach and File.readlines",
    Option1: "3",
    Option2: "1",
    Option3: "0",
    Option4: "[\"x\", \"y\", \"z\"]",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `File.write("/tmp/atom_ruby_mcq9.txt", "x\ny\nz\n")
puts File.readlines("/tmp/atom_ruby_mcq9.txt").size
`,
    snippetLang: "ruby",
  },
  {
    title: "File Exist Predicate",
    description: "Which method checks whether a file exists without opening it?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "File.open and File.new",
    Option1: "File.exist?(path)",
    Option2: "File.has?(path)",
    Option3: "File.find(path)",
    Option4: "File.locate(path)",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },

  // ===== MEDIUM (6) =====
  {
    title: "File Open Without Block Leaks",
    description: "What does the following snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "File.open and File.new",
    Option1: "false",
    Option2: "true",
    Option3: "nil",
    Option4: "Error",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `f = File.open("/tmp/atom_ruby_mcqm1.txt", "w")
f.puts "hi"
puts f.closed?
`,
    snippetLang: "ruby",
  },
  {
    title: "File Mode r+ Behavior",
    description: "Opening an existing file in mode `\"r+\"` allows which of the following?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "File Modes r w a",
    Option1: "Read and write without truncating the file",
    Option2: "Only append writes at the end",
    Option3: "Only read, no writes",
    Option4: "Truncate the file then read and write",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Dir Glob Return Type",
    description: "What does the following snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Directory Operations with Dir",
    Option1: "Array",
    Option2: "NilClass",
    Option3: "String",
    Option4: "Enumerator",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `files = Dir.glob("/tmp/nonexistent_*.xyz")
puts files.class
`,
    snippetLang: "ruby",
  },
  {
    title: "Foreach vs Readlines Memory",
    description:
      "For processing a very large file line by line, which approach uses the LEAST memory?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "File.foreach and File.readlines",
    Option1: "File.foreach(path) { |line| process(line) }",
    Option2: "File.readlines(path).each { |line| process(line) }",
    Option3: "File.read(path).each_line { |line| process(line) }",
    Option4: "All three use the same memory",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "File New Requires Close",
    description: "What does the following snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "File.open and File.new",
    Option1: "true\\ntrue",
    Option2: "true\\nfalse",
    Option3: "false\\ntrue",
    Option4: "Error",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `f = File.new("/tmp/atom_ruby_mcqm5.txt", "w")
puts f.is_a?(File)
f.close
puts f.closed?
`,
    snippetLang: "ruby",
  },
  {
    title: "File Write Returns Bytes",
    description: "What does the following snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Writing to Files",
    Option1: "5",
    Option2: "0",
    Option3: "nil",
    Option4: "hello",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `n = File.write("/tmp/atom_ruby_mcqm6.txt", "hello")
puts n
`,
    snippetLang: "ruby",
  },

  // ===== HARD (4) =====
  {
    title: "File Open Block Return Value",
    description: "What does the following snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "File.open and File.new",
    Option1: "nil",
    Option2: "\"hi\"",
    Option3: "#<File:...>",
    Option4: "0",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `result = File.open("/tmp/atom_ruby_mcqh1.txt", "w") { |f| f.puts "hi" }
puts result.inspect
`,
    snippetLang: "ruby",
  },
  {
    title: "Dir Glob Recursive Match",
    description: "Assume the directory `/tmp/atom_ruby_tree` contains exactly the files: `a.txt`, `sub/b.txt`, `sub/c.log`. What does the snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Directory Operations with Dir",
    Option1: "2",
    Option2: "1",
    Option3: "3",
    Option4: "0",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `puts Dir.glob("/tmp/atom_ruby_tree/**/*.txt").size
`,
    snippetLang: "ruby",
  },
  {
    title: "File Open Multiple Modes",
    description: "What does the following snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "File Modes r w a",
    Option1: "1\\n2\\n3",
    Option2: "123",
    Option3: "1 2 3",
    Option4: "3",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `path = "/tmp/atom_ruby_mcqh3.txt"
File.write(path, "1\n2\n")
File.open(path, "a") { |f| f.puts "3" }
puts File.read(path).chomp
`,
    snippetLang: "ruby",
  },
  {
    title: "File Readlines Chomp Map",
    description: "What does the following snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "File.foreach and File.readlines",
    Option1: "x-y-z",
    Option2: "x\\ny\\nz\\n",
    Option3: "xyz",
    Option4: "x- y- z-",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `File.write("/tmp/atom_ruby_mcqh4.txt", "x\ny\nz\n")
puts File.readlines("/tmp/atom_ruby_mcqh4.txt").map(&:chomp).join("-")
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
