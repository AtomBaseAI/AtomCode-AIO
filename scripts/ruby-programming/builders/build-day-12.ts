import { writeFileSync } from "node:fs";

const DAY = 12;
const TOPIC = "Exception Handling";
const SUBTOPICS = [
  "begin rescue end",
  "else and ensure Clauses",
  "raise and re-raise",
  "Custom Exception Classes",
  "retry",
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
    title: "Rescue Division By Zero",
    description:
      "Read two integers a and b, then print a/b. If b is 0, print `Error: Division by zero` instead.\n\nInput Format:\nLine 1: integer a. Line 2: integer b.\n\nOutput Format:\nEither the integer quotient or `Error: Division by zero`.\n\nConstraints:\n-1000 <= a, b <= 1000.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "begin rescue end",
    sampleinput1: "10\n2",
    sampleoutput1: "5",
    sampleinput2: "5\n0",
    sampleoutput2: "Error: Division by zero",
    input1: "100\n5",
    output1: "20",
    input2: "0\n5",
    output2: "0",
    input3: "7\n0",
    output3: "Error: Division by zero",
    inputconstrains: "-1000 <= a, b <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `a = gets.to_i
b = gets.to_i
begin
  puts a / b
rescue ZeroDivisionError
  puts "Error: Division by zero"
end
`,
  },
  {
    title: "Ensure Cleanup Message",
    description:
      "Read an integer n. If n is negative, raise `Negative input`. In all cases, the `ensure` clause must print `Finalized` after the main logic.\n\nInput Format:\nLine 1: integer n.\n\nOutput Format:\nEither `Processed: N` then `Finalized`, or `Error: Negative input` then `Finalized`.\n\nConstraints:\n-1000 <= n <= 1000.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "else and ensure Clauses",
    sampleinput1: "5",
    sampleoutput1: "Processed: 5\nFinalized",
    sampleinput2: "-1",
    sampleoutput2: "Error: Negative input\nFinalized",
    input1: "100",
    output1: "Processed: 100\nFinalized",
    input2: "-99",
    output2: "Error: Negative input\nFinalized",
    input3: "0",
    output3: "Processed: 0\nFinalized",
    inputconstrains: "-1000 <= n <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = gets.to_i
begin
  raise "Negative input" if n < 0
  puts "Processed: #{n}"
rescue => e
  puts "Error: #{e.message}"
ensure
  puts "Finalized"
end
`,
  },
  {
    title: "Else Clause Demo",
    description:
      "Read a line of input and try to parse it as an integer with `Integer(input)`. If parsing succeeds (no exception), the `else` clause prints `No error`. If parsing fails, print `Not a number`.\n\nInput Format:\nLine 1: a token (integer or non-numeric string).\n\nOutput Format:\n`Parsed: N` followed by `No error` on success; otherwise `Not a number`.\n\nConstraints:\nToken length 1..20.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "else and ensure Clauses",
    sampleinput1: "5",
    sampleoutput1: "Parsed: 5\nNo error",
    sampleinput2: "abc",
    sampleoutput2: "Not a number",
    input1: "42",
    output1: "Parsed: 42\nNo error",
    input2: "hello",
    output2: "Not a number",
    input3: "0",
    output3: "Parsed: 0\nNo error",
    inputconstrains: "Token length 1..20",
    blacklist: "",
    whitelist: "",
    sourcecode: `input = gets.chomp
begin
  n = Integer(input)
  puts "Parsed: #{n}"
rescue ArgumentError
  puts "Not a number"
else
  puts "No error"
end
`,
  },
  {
    title: "Raise On Invalid Age",
    description:
      "Read an integer age. If age is negative or greater than 150, raise a RuntimeError with message `Invalid age`. Otherwise print `Age: N`.\n\nInput Format:\nLine 1: integer age.\n\nOutput Format:\nEither `Age: N` or `Invalid age`.\n\nConstraints:\n-1000 <= age <= 1000.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "raise and re-raise",
    sampleinput1: "25",
    sampleoutput1: "Age: 25",
    sampleinput2: "200",
    sampleoutput2: "Invalid age",
    input1: "0",
    output1: "Age: 0",
    input2: "-5",
    output2: "Invalid age",
    input3: "120",
    output3: "Age: 120",
    inputconstrains: "-1000 <= age <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `age = gets.to_i
begin
  raise "Invalid age" if age < 0 || age > 150
  puts "Age: #{age}"
rescue => e
  puts e.message
end
`,
  },
  {
    title: "Custom Exception Class",
    description:
      "Define a custom exception `InvalidCodeError` (subclass of `StandardError`). Validate that an input code has length between 4 and 12 inclusive. Print `Valid` if so, otherwise the raised error message.\n\nInput Format:\nLine 1: a code string.\n\nOutput Format:\n`Valid` or one of `Code too short` / `Code too long`.\n\nConstraints:\nCode length 1..30.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Custom Exception Classes",
    sampleinput1: "ABC123",
    sampleoutput1: "Valid",
    sampleinput2: "AB",
    sampleoutput2: "Code too short",
    input1: "abcdefghijk",
    output1: "Valid",
    input2: "abcdefghijklmno",
    output2: "Code too long",
    input3: "1234",
    output3: "Valid",
    inputconstrains: "Code length 1..30",
    blacklist: "",
    whitelist: "",
    sourcecode: `class InvalidCodeError < StandardError; end

def validate(code)
  raise InvalidCodeError, "Code too short" if code.length < 4
  raise InvalidCodeError, "Code too long" if code.length > 12
  "Valid"
end

code = gets.chomp
begin
  puts validate(code)
rescue InvalidCodeError => e
  puts e.message
end
`,
  },
  {
    title: "Retry On Failed Read",
    description:
      "Read an integer n. Simulate a flaky first attempt: the first time the begin block runs it raises an error, on the second attempt it succeeds. Use `retry` to make a second attempt.\n\nInput Format:\nLine 1: integer n.\n\nOutput Format:\n`Got N after 2 tries`.\n\nConstraints:\n-1000 <= n <= 1000.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "retry",
    sampleinput1: "42",
    sampleoutput1: "Got 42 after 2 tries",
    sampleinput2: "7",
    sampleoutput2: "Got 7 after 2 tries",
    input1: "0",
    output1: "Got 0 after 2 tries",
    input2: "100",
    output2: "Got 100 after 2 tries",
    input3: "-5",
    output3: "Got -5 after 2 tries",
    inputconstrains: "-1000 <= n <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `attempts = 0
n = gets.to_i
begin
  attempts += 1
  raise "simulate failure" if attempts < 2
  puts "Got #{n} after #{attempts} tries"
rescue
  retry if attempts < 3
  puts "Failed"
end
`,
  },

  // ===== EASY SCENARIO (4) =====
  {
    title: "ATM Withdrawal Rescue",
    description:
      "An ATM dispenses cash only if the amount does not exceed the balance. Define a custom `InsufficientFundsError` and rescue it.\n\nInput Format:\nLine 1: float balance. Line 2: float amount.\n\nOutput Format:\nEither the new balance (2 decimals) or `Insufficient funds`.\n\nConstraints:\n0.0 <= balance, amount <= 100000.0.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Custom Exception Classes",
    sampleinput1: "1000.00\n200.00",
    sampleoutput1: "800.00",
    sampleinput2: "100.00\n500.00",
    sampleoutput2: "Insufficient funds",
    input1: "500.00\n500.00",
    output1: "0.00",
    input2: "10.00\n1.00",
    output2: "9.00",
    input3: "50.00\n60.00",
    output3: "Insufficient funds",
    inputconstrains: "0.0 <= balance, amount <= 100000.0",
    blacklist: "",
    whitelist: "",
    sourcecode: `class InsufficientFundsError < StandardError; end

balance = gets.to_f
amount = gets.to_f
begin
  raise InsufficientFundsError if amount > balance
  balance -= amount
  puts "%.2f" % balance
rescue InsufficientFundsError
  puts "Insufficient funds"
end
`,
  },
  {
    title: "Config Parse Ensure Finish",
    description:
      "A configuration line is comma-separated. Split it, and ensure the loader prints `Config load finished` regardless of outcome. Reject configs with fewer than 2 fields.\n\nInput Format:\nLine 1: comma-separated tokens.\n\nOutput Format:\nEither the joined tokens (with ` | `) followed by `Config load finished`, or `Parse error: Missing values` followed by `Config load finished`.\n\nConstraints:\nLine length 1..200.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "else and ensure Clauses",
    sampleinput1: "a, b, c",
    sampleoutput1: "a | b | c\nConfig load finished",
    sampleinput2: "single",
    sampleoutput2: "Parse error: Missing values\nConfig load finished",
    input1: "x, y",
    output1: "x | y\nConfig load finished",
    input2: "one,two,three,four",
    output2: "one | two | three | four\nConfig load finished",
    input3: "alpha",
    output3: "Parse error: Missing values\nConfig load finished",
    inputconstrains: "Line length 1..200",
    blacklist: "",
    whitelist: "",
    sourcecode: `raw = gets.chomp
begin
  parts = raw.split(",")
  raise "Missing values" if parts.size < 2
  puts parts.map(&:strip).join(" | ")
rescue => e
  puts "Parse error: #{e.message}"
ensure
  puts "Config load finished"
end
`,
  },
  {
    title: "Number Parser With Else",
    description:
      "Given a line of whitespace-separated tokens, count how many parse as integers and how many fail. Use a `begin/rescue/else` block per token.\n\nInput Format:\nLine 1: space-separated tokens.\n\nOutput Format:\nLine 1: `Valid: V`. Line 2: `Invalid: I`.\n\nConstraints:\n1 <= token count <= 100.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "else and ensure Clauses",
    sampleinput1: "1 2 abc 4 xyz",
    sampleoutput1: "Valid: 3\nInvalid: 2",
    sampleinput2: "10 20 30",
    sampleoutput2: "Valid: 3\nInvalid: 0",
    input1: "hello world",
    output1: "Valid: 0\nInvalid: 2",
    input2: "5",
    output2: "Valid: 1\nInvalid: 0",
    input3: "a 1 b 2 c 3",
    output3: "Valid: 3\nInvalid: 3",
    inputconstrains: "1 <= token count <= 100",
    blacklist: "",
    whitelist: "",
    sourcecode: `tokens = gets.split
valid = 0
invalid = 0
tokens.each do |t|
  begin
    n = Integer(t)
  rescue ArgumentError
    invalid += 1
  else
    valid += 1
  end
end
puts "Valid: #{valid}"
puts "Invalid: #{invalid}"
`,
  },
  {
    title: "Profit Share Division Rescue",
    description:
      "Partners in a startup share a quarterly profit equally. If the partner count is zero, print `No partners to share with`.\n\nInput Format:\nLine 1: float profit. Line 2: integer partners.\n\nOutput Format:\nEither `Each gets X.XX` or `No partners to share with`.\n\nConstraints:\n0.0 <= profit <= 1000000.0; 0 <= partners <= 1000.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "begin rescue end",
    sampleinput1: "1000.00\n4",
    sampleoutput1: "Each gets 250.00",
    sampleinput2: "500.00\n0",
    sampleoutput2: "No partners to share with",
    input1: "100.00\n5",
    output1: "Each gets 20.00",
    input2: "0.00\n3",
    output2: "Each gets 0.00",
    input3: "999.99\n0",
    output3: "No partners to share with",
    inputconstrains: "0.0 <= profit <= 1000000.0; 0 <= partners <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `profit = gets.to_f
partners = gets.to_i
begin
  raise ZeroDivisionError if partners.zero?
  share = profit / partners
  puts "Each gets %.2f" % share
rescue ZeroDivisionError
  puts "No partners to share with"
end
`,
  },

  // ===== MEDIUM SCENARIO (6) =====
  {
    title: "Inventory Validation Raise",
    description:
      "A warehouse log records items as `name qty`. Validate each entry: qty must be 0..1000. Use custom exception classes; rescue and aggregate the valid/invalid lists.\n\nInput Format:\nLine 1: integer n. Next n lines: `name qty` separated by space.\n\nOutput Format:\nLine 1: comma-separated `name:qty` of valid items. Line 2: comma-separated error messages for invalid items.\n\nConstraints:\n1 <= n <= 100; -1000 <= qty <= 10000; name length 1..20.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Custom Exception Classes",
    sampleinput1: "3\napple 50\nbad -5\ncherry 999",
    sampleoutput1: "apple:50, cherry:999\nBad qty: -5",
    sampleinput2: "2\nx 5\ny 1500",
    sampleoutput2: "x:5\nBad qty: 1500",
    input1: "1\nz 0",
    output1: "z:0\n",
    input2: "2\nok 100\nbad -1",
    output2: "ok:100\nBad qty: -1",
    input3: "3\nA 5\nB 6\nC 7",
    output3: "A:5, B:6, C:7\n",
    inputconstrains: "1 <= n <= 100; -1000 <= qty <= 10000",
    blacklist: "retry, else",
    whitelist: "raise, rescue",
    sourcecode: `class InvalidQuantityError < StandardError; end
class InvalidNameError < StandardError; end

n = gets.to_i
valid = []
invalid = []
n.times do
  line = gets.chomp
  parts = line.split
  name = parts[0]
  qty = parts[1].to_i
  begin
    raise InvalidNameError, "Bad name: #{name}" if name.nil? || name.empty?
    raise InvalidQuantityError, "Bad qty: #{qty}" if qty < 0 || qty > 1000
    valid << "#{name}:#{qty}"
  rescue InvalidNameError, InvalidQuantityError => e
    invalid << e.message
  end
end
puts valid.join(", ")
puts invalid.join(", ")
`,
  },
  {
    title: "Connection Retry With Limit",
    description:
      "A flaky network call must succeed on a target attempt number. Retry the begin block until the target is reached or the max attempts (3) is exhausted.\n\nInput Format:\nLine 1: integer target (the attempt number on which the call succeeds).\n\nOutput Format:\nEither `Connected on attempt K` or `Failed after 3 attempts`.\n\nConstraints:\n1 <= target <= 10.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "retry",
    sampleinput1: "1",
    sampleoutput1: "Connected on attempt 1",
    sampleinput2: "3",
    sampleoutput2: "Connected on attempt 3",
    input1: "2",
    output1: "Connected on attempt 2",
    input2: "4",
    output2: "Failed after 3 attempts",
    input3: "10",
    output3: "Failed after 3 attempts",
    inputconstrains: "1 <= target <= 10",
    blacklist: "while, until, for",
    whitelist: "retry, begin, rescue",
    sourcecode: `max_attempts = 3
attempts = 0
target = gets.to_i
begin
  attempts += 1
  raise "Connection failed" unless attempts >= target
  puts "Connected on attempt #{attempts}"
rescue => e
  if attempts < max_attempts
    retry
  else
    puts "Failed after #{attempts} attempts"
  end
end
`,
  },
  {
    title: "Parse Integers With Custom Exception",
    description:
      "Parse a list of tokens as integers. For each non-integer token, raise a custom `ParseError` carrying the bad token, then rescue it and skip.\n\nInput Format:\nLine 1: space-separated tokens.\n\nOutput Format:\nLine 1: `Sum: S`. Line 2: `Parsed: P` (count of successfully parsed integers).\n\nConstraints:\n1 <= token count <= 100; token length 1..20.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Custom Exception Classes",
    sampleinput1: "10 abc 20 xyz 5",
    sampleoutput1: "Skipped: abc\nSkipped: xyz\nSum: 35\nParsed: 3",
    sampleinput2: "1 2 3",
    sampleoutput2: "Sum: 6\nParsed: 3",
    input1: "a b c",
    output1: "Skipped: a\nSkipped: b\nSkipped: c\nSum: 0\nParsed: 0",
    input2: "5 5 5",
    output2: "Sum: 15\nParsed: 3",
    input3: "1 hello 2 world 3",
    output3: "Skipped: hello\nSkipped: world\nSum: 6\nParsed: 3",
    inputconstrains: "1 <= token count <= 100",
    blacklist: "retry, ensure",
    whitelist: "raise, rescue, class ",
    sourcecode: `class ParseError < StandardError
  attr_reader :token
  def initialize(token)
    @token = token
    super("Cannot parse: #{token}")
  end
end

def parse_token(t)
  Integer(t)
rescue ArgumentError
  raise ParseError, t
end

tokens = gets.split
total = 0
parsed = 0
tokens.each do |t|
  begin
    n = parse_token(t)
    total += n
    parsed += 1
  rescue ParseError => e
    puts "Skipped: #{e.token}"
  end
end
puts "Sum: #{total}"
puts "Parsed: #{parsed}"
`,
  },
  {
    title: "Bank Account Ensure Logging",
    description:
      "A bank splits (balance + bonus) equally among partners. If partners is 0, rescue the ZeroDivisionError. The `ensure` clause always prints `Transaction closed`.\n\nInput Format:\nLine 1: integer balance. Line 2: integer partners. Line 3: integer bonus.\n\nOutput Format:\nLine 1: `Each gets X` (integer share) or `No partners to share with`. Line 2: `Transaction closed`.\n\nConstraints:\n0 <= balance, bonus, partners <= 100000.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "else and ensure Clauses",
    sampleinput1: "1000\n4\n200",
    sampleoutput1: "Each gets 300\nTransaction closed",
    sampleinput2: "100\n0\n50",
    sampleoutput2: "No partners to share with\nTransaction closed",
    input1: "500\n5\n0",
    output1: "Each gets 100\nTransaction closed",
    input2: "0\n0\n0",
    output2: "No partners to share with\nTransaction closed",
    input3: "99\n3\n1",
    output3: "Each gets 33\nTransaction closed",
    inputconstrains: "0 <= balance, bonus, partners <= 100000",
    blacklist: "retry, raise",
    whitelist: "begin, rescue, ensure",
    sourcecode: `balance = gets.to_i
partners = gets.to_i
bonus = gets.to_i
begin
  share = (balance + bonus) / partners
  puts "Each gets #{share}"
rescue ZeroDivisionError
  puts "No partners to share with"
ensure
  puts "Transaction closed"
end
`,
  },
  {
    title: "Re-raise After Logging",
    description:
      "An inner `compute(a, b)` method divides a by b. On ZeroDivisionError it logs the error class and re-raises. The outer caller catches the re-raised exception.\n\nInput Format:\nLine 1: integer a. Line 2: integer b.\n\nOutput Format:\nEither `Computed: Q` (the quotient), or two lines: `Logging: ZeroDivisionError` then `Caught at top level`.\n\nConstraints:\n-1000 <= a, b <= 1000.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "raise and re-raise",
    sampleinput1: "10\n2",
    sampleoutput1: "Computed: 5",
    sampleinput2: "10\n0",
    sampleoutput2: "Logging: ZeroDivisionError\nCaught at top level",
    input1: "100\n5",
    output1: "Computed: 20",
    input2: "7\n0",
    output2: "Logging: ZeroDivisionError\nCaught at top level",
    input3: "0\n5",
    output3: "Computed: 0",
    inputconstrains: "-1000 <= a, b <= 1000",
    blacklist: "retry, ensure",
    whitelist: "raise, rescue, begin",
    sourcecode: `def compute(a, b)
  result = a / b
  puts "Computed: #{result}"
rescue ZeroDivisionError => e
  puts "Logging: #{e.class}"
  raise
end

a = gets.to_i
b = gets.to_i
begin
  compute(a, b)
rescue ZeroDivisionError
  puts "Caught at top level"
end
`,
  },
  {
    title: "Custom Exception Hierarchy",
    description:
      "Define a hierarchy of custom exceptions: `AppError` (base), `NetworkError`, `AuthError`. The `perform(action)` method raises the appropriate one. Rescue each separately and print a tailored message.\n\nInput Format:\nLine 1: action (`network`, `auth`, or `other`).\n\nOutput Format:\n`Network issue: ...` / `Auth issue: ...` / `App issue: ...`.\n\nConstraints:\nAction is one of {network, auth, other}.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Custom Exception Classes",
    sampleinput1: "network",
    sampleoutput1: "Network issue: Network unreachable",
    sampleinput2: "auth",
    sampleoutput2: "Auth issue: Bad credentials",
    input1: "other",
    output1: "App issue: Unknown error",
    input2: "network",
    output2: "Network issue: Network unreachable",
    input3: "auth",
    output3: "Auth issue: Bad credentials",
    inputconstrains: "Action is one of {network, auth, other}",
    blacklist: "retry, ensure",
    whitelist: "raise, rescue, class ",
    sourcecode: `class AppError < StandardError; end
class NetworkError < AppError; end
class AuthError < AppError; end

def perform(action)
  case action
  when "network" then raise NetworkError, "Network unreachable"
  when "auth" then raise AuthError, "Bad credentials"
  else raise AppError, "Unknown error"
  end
end

action = gets.chomp
begin
  perform(action)
  puts "Action succeeded"
rescue NetworkError => e
  puts "Network issue: #{e.message}"
rescue AuthError => e
  puts "Auth issue: #{e.message}"
rescue AppError => e
  puts "App issue: #{e.message}"
end
`,
  },

  // ===== HARD SCENARIO (4) =====
  {
    title: "Retry With Exponential Backoff",
    description:
      "A retry loop attempts to connect. The call succeeds once `attempts >= target`. On each failure the total backoff grows by `2**(attempt-1)`. Stop retrying after `max_attempts` tries.\n\nInput Format:\nLine 1: integer max_attempts (1..5). Line 2: integer target (1..10).\n\nOutput Format:\nEither `Connected after K attempt(s), total backoff B` or `Gave up after K attempt(s), total backoff B`.\n\nConstraints:\n1 <= max_attempts <= 5; 1 <= target <= 10.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "retry",
    sampleinput1: "3\n1",
    sampleoutput1: "Connected after 1 attempt(s), total backoff 0",
    sampleinput2: "5\n3",
    sampleoutput2: "Connected after 3 attempt(s), total backoff 3",
    input1: "2\n5",
    output1: "Gave up after 2 attempt(s), total backoff 1",
    input2: "5\n1",
    output2: "Connected after 1 attempt(s), total backoff 0",
    input3: "4\n4",
    output3: "Connected after 4 attempt(s), total backoff 7",
    inputconstrains: "1 <= max_attempts <= 5; 1 <= target <= 10",
    blacklist: "while, until, for",
    whitelist: "retry, begin, rescue, raise",
    sourcecode: `max_attempts = gets.to_i
target = gets.to_i
attempts = 0
backoff = 0
begin
  attempts += 1
  raise "Not yet" unless attempts >= target
  puts "Connected after #{attempts} attempt(s), total backoff #{backoff}"
rescue => e
  if attempts < max_attempts
    backoff += 2 ** (attempts - 1)
    retry
  else
    puts "Gave up after #{attempts} attempt(s), total backoff #{backoff}"
  end
end
`,
  },
  {
    title: "Multi-Step Pipeline With Exception Aggregation",
    description:
      "A pipeline applies three steps to each input integer: double it (raise if input negative), add one (raise if doubled result exceeds 1000), then stringify (raise if value is 0). Aggregate successes and failures across all inputs.\n\nInput Format:\nLine 1: space-separated integers.\n\nOutput Format:\nLine 1: semicolon-separated `Result: X` strings of successful runs. Line 2: semicolon-separated failure messages.\n\nConstraints:\n1 <= n <= 100; -1000 <= v <= 10000.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Custom Exception Classes",
    sampleinput1: "5 10 15",
    sampleoutput1: "Result: 11; Result: 21; Result: 31\n",
    sampleinput2: "-1 5 1001",
    sampleoutput2: "Result: 11\nStep double failed on -1: negative; Step add_one failed on 2002: overflow",
    input1: "0 1 2",
    output1: "Result: 1; Result: 3; Result: 5",
    input2: "100 200 300",
    output2: "Result: 201; Result: 401; Result: 601\n",
    input3: "5 5 5",
    output3: "Result: 11; Result: 11; Result: 11\n",
    inputconstrains: "1 <= n <= 100; -1000 <= v <= 10000",
    blacklist: "retry, ensure",
    whitelist: "raise, rescue, begin, class ",
    sourcecode: `class StepError < StandardError
  attr_reader :step, :input
  def initialize(step, input, msg)
    @step = step
    @input = input
    super("Step #{step} failed on #{input}: #{msg}")
  end
end

def step_double(x)
  raise StepError.new("double", x, "negative") if x < 0
  x * 2
end

def step_add_one(x)
  raise StepError.new("add_one", x, "overflow") if x > 1000
  x + 1
end

def step_to_s(x)
  raise StepError.new("to_s", x, "zero") if x == 0
  "Result: #{x}"
end

nums = gets.split.map(&:to_i)
results = []
errors = []
nums.each do |x|
  begin
    r = step_double(x)
    r = step_add_one(r)
    r = step_to_s(r)
    results << r
  rescue StepError => e
    errors << e.message
  end
end
puts results.join("; ")
puts errors.join("; ")
`,
  },
  {
    title: "Transaction Rollback With Ensure",
    description:
      "A ledger transaction debits then credits the balance. If debit exceeds balance, raise `Overdraft` and restore the original balance via the rescue clause. The `ensure` clause always prints the final balance.\n\nInput Format:\nLine 1: float balance. Line 2: float debit. Line 3: float credit.\n\nOutput Format:\nEither `New balance: X.XX` followed by `Final balance: X.XX`, or `Rolled back: Overdraft` followed by `Final balance: X.XX`.\n\nConstraints:\n0.0 <= balance <= 100000.0; 0.0 <= debit, credit <= 100000.0.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "else and ensure Clauses",
    sampleinput1: "1000.00\n200.00\n50.00",
    sampleoutput1: "New balance: 850.00\nFinal balance: 850.00",
    sampleinput2: "100.00\n200.00\n50.00",
    sampleoutput2: "Rolled back: Overdraft\nFinal balance: 100.00",
    input1: "500.00\n100.00\n50.00",
    output1: "New balance: 450.00\nFinal balance: 450.00",
    input2: "0.00\n0.00\n10.00",
    output2: "New balance: 10.00\nFinal balance: 10.00",
    input3: "50.00\n60.00\n10.00",
    output3: "Rolled back: Overdraft\nFinal balance: 50.00",
    inputconstrains: "0.0 <= balance, debit, credit <= 100000.0",
    blacklist: "retry, while, until",
    whitelist: "raise, rescue, ensure, begin",
    sourcecode: `balance = gets.to_f
debit = gets.to_f
credit = gets.to_f
original_balance = balance
begin
  raise "Overdraft" if debit > balance
  balance -= debit
  balance += credit
  puts "New balance: #{"%.2f" % balance}"
rescue => e
  balance = original_balance
  puts "Rolled back: #{e.message}"
ensure
  puts "Final balance: #{"%.2f" % balance}"
end
`,
  },
  {
    title: "Chained Custom Exceptions With Cause",
    description:
      "A two-stage validation parses raw CSV input via `load_data` (raises `DataLoadError`) and `validate` (raises `ValidationError`). Rescue each separately and print a tailored message.\n\nInput Format:\nLine 1: comma-separated tokens (single token if no comma).\n\nOutput Format:\n`Valid: T1, T2, ...` or `Load failed: ...` or `Validation failed: ...`.\n\nConstraints:\nLine length 1..200.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Custom Exception Classes",
    sampleinput1: "a, b, c",
    sampleoutput1: "Valid: a, b, c",
    sampleinput2: "single",
    sampleoutput2: "Validation failed: Need at least 2 items",
    input1: "x, y",
    output1: "Valid: x, y",
    input2: "  ",
    output2: "Load failed: Empty input",
    input3: "abcdefghijklm, nop",
    output3: "Validation failed: Item too long",
    inputconstrains: "Line length 1..200",
    blacklist: "retry, while, until",
    whitelist: "raise, rescue, begin, class ",
    sourcecode: `class DataLoadError < StandardError; end
class ValidationError < StandardError; end

def load_data(raw)
  raise DataLoadError, "Empty input" if raw.strip.empty?
  raw.split(",").map(&:strip)
end

def validate(items)
  raise ValidationError, "Need at least 2 items" if items.size < 2
  raise ValidationError, "Item too long" if items.any? { |i| i.length > 10 }
  items
end

raw = gets.chomp
begin
  items = load_data(raw)
  validated = validate(items)
  puts "Valid: #{validated.join(", ")}"
rescue DataLoadError => e
  puts "Load failed: #{e.message}"
rescue ValidationError => e
  puts "Validation failed: #{e.message}"
end
`,
  },
];

const mcqs: MCQ[] = [
  // ===== EASY (10) =====
  {
    title: "Begin Rescue Block",
    description:
      "Which Ruby keywords form the basic exception handling block?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "begin rescue end",
    Option1: "try/catch",
    Option2: "begin/rescue/end",
    Option3: "try/except",
    Option4: "do/rescue/end",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Standard Exception Class",
    description:
      "Most application-level Ruby exceptions inherit from which class?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Custom Exception Classes",
    Option1: "Exception",
    Option2: "StandardError",
    Option3: "Error",
    Option4: "RuntimeError",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Raise Without Argument",
    description:
      "Calling `raise` inside a `rescue` block with no arguments does what?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "raise and re-raise",
    Option1: "Raises a fresh RuntimeError",
    Option2: "Re-raises the current exception",
    Option3: "Returns nil silently",
    Option4: "Raises NoMethodError",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Ensure Clause Runs",
    description:
      "When does the `ensure` clause of a begin/rescue block execute?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "else and ensure Clauses",
    Option1: "Only when an exception is raised",
    Option2: "Only when no exception is raised",
    Option3: "Always, regardless of exceptions",
    Option4: "Only on successful return",
    CorrectOption: 3,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Else Clause Runs",
    description:
      "When does the `else` clause of a begin/rescue block execute?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "else and ensure Clauses",
    Option1: "Only when an exception is raised",
    Option2: "Only when no exception occurs in the begin block",
    Option3: "Always, regardless of exceptions",
    Option4: "Only inside a rescue clause",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Retry Keyword",
    description:
      "What does the `retry` keyword do inside a rescue clause?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "retry",
    Option1: "Skips to the ensure clause",
    Option2: "Restarts the begin block from the top",
    Option3: "Re-raises the current exception",
    Option4: "Ends the enclosing method immediately",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Custom Exception Subclass",
    description:
      "To create a custom application exception, you typically subclass which class?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Custom Exception Classes",
    Option1: "Object",
    Option2: "StandardError",
    Option3: "Exception directly (recommended)",
    Option4: "RuntimeError only",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Rescue Default Class",
    description:
      "When you write `rescue => e` without an explicit class, which exceptions are caught?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "begin rescue end",
    Option1: "All Exception subclasses",
    Option2: "StandardError subclasses",
    Option3: "Only RuntimeError instances",
    Option4: "Only custom errors",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Zero Division Error",
    description:
      "Which exception is raised by integer division `10 / 0` in Ruby?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "begin rescue end",
    Option1: "ArgumentError",
    Option2: "ZeroDivisionError",
    Option3: "RuntimeError",
    Option4: "NoMethodError",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Raise With Message",
    description:
      "Which syntax raises a RuntimeError with a custom message?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "raise and re-raise",
    Option1: 'raise "msg"',
    Option2: 'throw "msg"',
    Option3: 'error "msg"',
    Option4: 'panic "msg"',
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },

  // ===== MEDIUM (6) =====
  {
    title: "Rescue Order",
    description: "What does the following code print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "begin rescue end",
    Option1: "S",
    Option2: "Z",
    Option3: "S\\nZ",
    Option4: "LocalJumpError",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `begin
  raise ZeroDivisionError
rescue StandardError
  puts "S"
rescue ZeroDivisionError
  puts "Z"
end
`,
    snippetLang: "ruby",
  },
  {
    title: "Ensure Execution",
    description: "What does the following code print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "else and ensure Clauses",
    Option1: "1",
    Option2: "ran",
    Option3: "ran\\n1",
    Option4: "(nothing)",
    CorrectOption: 3,
    iscodesnippet: true,
    codesnippet: `def m
  begin
    return 1
  ensure
    puts "ran"
  end
end
puts m
`,
    snippetLang: "ruby",
  },
  {
    title: "Else After No Exception",
    description: "What does the following code print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "else and ensure Clauses",
    Option1: "else ran\\nensured",
    Option2: "rescued\\nensured",
    Option3: "ensured",
    Option4: "else ran",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `begin
  x = 5
rescue => e
  puts "rescued"
else
  puts "else ran"
ensure
  puts "ensured"
end
`,
    snippetLang: "ruby",
  },
  {
    title: "Re-raise Behavior",
    description: "What does the following code print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "raise and re-raise",
    Option1: "inner caught",
    Option2: "outer caught",
    Option3: "inner caught\\nouter caught",
    Option4: "LocalJumpError",
    CorrectOption: 3,
    iscodesnippet: true,
    codesnippet: `def outer
  inner
rescue ZeroDivisionError
  puts "outer caught"
end
def inner
  begin
    1 / 0
  rescue ZeroDivisionError
    puts "inner caught"
    raise
  end
end
outer
`,
    snippetLang: "ruby",
  },
  {
    title: "Custom Exception Match",
    description: "What does the following code print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Custom Exception Classes",
    Option1: "AE",
    Option2: "ME: boom",
    Option3: "AE\\nME: boom",
    Option4: "Uncaught exception",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `class MyError < StandardError; end
begin
  raise MyError, "boom"
rescue ArgumentError
  puts "AE"
rescue MyError => e
  puts "ME: #{e.message}"
end
`,
    snippetLang: "ruby",
  },
  {
    title: "Ensure with Return",
    description:
      "If a `return` is executed inside a `begin` block, does `ensure` still run?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "else and ensure Clauses",
    Option1: "No, return exits immediately",
    Option2: "Yes, ensure always runs",
    Option3: "Only if begin is nested in a method",
    Option4: "Only if no exception occurred",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },

  // ===== HARD (4) =====
  {
    title: "Retry Counter",
    description: "What does the following code print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "retry",
    Option1: "succeeded on 1",
    Option2: "succeeded on 2",
    Option3: "gave up",
    Option4: "Infinite loop",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `attempts = 0
begin
  attempts += 1
  raise "fail" if attempts < 2
  puts "succeeded on #{attempts}"
rescue => e
  retry if attempts < 3
  puts "gave up"
end
`,
    snippetLang: "ruby",
  },
  {
    title: "Nested Rescue With Ensure",
    description: "What does the following code print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "else and ensure Clauses",
    Option1: "inner rescue\\nouter rescue: outer\\nouter ensure",
    Option2: "inner rescue",
    Option3: "outer rescue: outer",
    Option4: "outer ensure",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `def m
  begin
    begin
      raise "inner"
    rescue
      puts "inner rescue"
      raise "outer"
    end
  rescue => e
    puts "outer rescue: #{e.message}"
  ensure
    puts "outer ensure"
  end
end
m
`,
    snippetLang: "ruby",
  },
  {
    title: "Exception Hierarchy Catch Order",
    description: "What does the following code print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Custom Exception Classes",
    Option1: "AppError caught",
    Option2: "SubError caught",
    Option3: "AppError caught\\nSubError caught",
    Option4: "Uncaught exception",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `class AppError < StandardError; end
class SubError < AppError; end
begin
  raise SubError
rescue AppError
  puts "AppError caught"
rescue SubError
  puts "SubError caught"
end
`,
    snippetLang: "ruby",
  },
  {
    title: "Rescue Returns Value",
    description: "What does the following code print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "begin rescue end",
    Option1: "recovered",
    Option2: "oops",
    Option3: "nil",
    Option4: "Uncaught exception",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `result = begin
  raise "oops"
rescue => e
  "recovered"
end
puts result
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
