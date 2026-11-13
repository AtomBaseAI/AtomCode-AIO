/**
 * AtomCode — Ruby Programming — Day 2 builder.
 * Topic: Ruby Syntax and Data Types.
 *
 * Subtopics covered:
 *  - Variables and Assignment
 *  - Comments
 *  - Numeric Types Integer and Float
 *  - Strings
 *  - Booleans true and false
 *  - nil Value
 *  - Symbols
 *  - Type Conversion and Coercion
 *
 * Day 2 = data types & type conversion. Solutions exercise to_i / to_f / to_s,
 * .class, type coercion, nil handling, symbols, booleans. Medium/hard
 * questions constrain the construct set via blacklist/whitelist.
 */

import { writeFileSync } from "node:fs";

const DAY = 2;
const TOPIC = "Ruby Syntax and Data Types";
const SUBTOPICS = [
  "Variables and Assignment",
  "Comments",
  "Numeric Types Integer and Float",
  "Strings",
  "Booleans true and false",
  "nil Value",
  "Symbols",
  "Type Conversion and Coercion",
];

interface CodeQuestion {
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
}

interface MCQ {
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
}

/* ───────────────────────── DAY 2 CODE QUESTIONS ───────────────────────── */

const questions: CodeQuestion[] = [
  /* ───── EASY · BASIC (6) ───── */
  {
    title: "Integer-String Concatenator",
    description:
      "Practice type conversion: read an integer and print a sentence that interpolates it as a string.\n\nInput Format:\nA single integer n.\n\nOutput Format:\nOne line: The number is <n>\n\nConstraints:\n-1000 <= n <= 1000.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Type Conversion and Coercion",
    sampleinput1: "5",
    sampleoutput1: "The number is 5",
    sampleinput2: "-7",
    sampleoutput2: "The number is -7",
    input1: "42",
    output1: "The number is 42",
    input2: "0",
    output2: "The number is 0",
    input3: "999",
    output3: "The number is 999",
    inputconstrains: "-1000 <= n <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = gets.to_i
puts "The number is #{n}"\n`,
  },
  {
    title: "Float Truncator Drill",
    description:
      "Practice converting a float string to an integer: read a decimal number as a string and print its integer (truncated) value.\n\nInput Format:\nA single line containing a float string (e.g. 3.99).\n\nOutput Format:\nA single integer.\n\nConstraints:\nThe string represents a finite number between -1000 and 1000.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Numeric Types Integer and Float",
    sampleinput1: "3.99",
    sampleoutput1: "3",
    sampleinput2: "0.5",
    sampleoutput2: "0",
    input1: "12.75",
    output1: "12",
    input2: "-2.9",
    output2: "-2",
    input3: "100.0",
    output3: "100",
    inputconstrains: "value between -1000 and 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `s = gets.chomp
puts s.to_i\n`,
  },
  {
    title: "String Plus One Converter",
    description:
      "Read a string that represents an integer and print that integer plus one.\n\nInput Format:\nA single line containing a string of digits (with optional leading minus sign).\n\nOutput Format:\nA single integer: to_i(s) + 1.\n\nConstraints:\n-1000 <= parsed integer <= 1000.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Type Conversion and Coercion",
    sampleinput1: "10",
    sampleoutput1: "11",
    sampleinput2: "0",
    sampleoutput2: "1",
    input1: "99",
    output1: "100",
    input2: "-5",
    output2: "-4",
    input3: "42",
    output3: "43",
    inputconstrains: "-1000 <= parsed integer <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `s = gets.chomp
puts s.to_i + 1\n`,
  },
  {
    title: "String Class Reporter",
    description:
      "Use Ruby's .class method to identify the type of an object. Read a string and print the name of its class.\n\nInput Format:\nA single line containing a string (no spaces).\n\nOutput Format:\nOne line: the class name (e.g. String).\n\nConstraints:\n1 <= string length <= 50.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Strings",
    sampleinput1: "hello",
    sampleoutput1: "String",
    sampleinput2: "Ruby",
    sampleoutput2: "String",
    input1: "abc123",
    output1: "String",
    input2: "x",
    output2: "String",
    input3: "rails",
    output3: "String",
    inputconstrains: "1 <= string length <= 50",
    blacklist: "",
    whitelist: "",
    sourcecode: `s = gets.chomp
puts s.class\n`,
  },
  {
    title: "Integer Class Reporter",
    description:
      "Read an integer and print the name of its Ruby class.\n\nInput Format:\nA single integer on one line.\n\nOutput Format:\nOne line: the class name (e.g. Integer).\n\nConstraints:\n-10^9 <= n <= 10^9.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Numeric Types Integer and Float",
    sampleinput1: "42",
    sampleoutput1: "Integer",
    sampleinput2: "0",
    sampleoutput2: "Integer",
    input1: "-5",
    output1: "Integer",
    input2: "1000000",
    output2: "Integer",
    input3: "7",
    output3: "Integer",
    inputconstrains: "-10^9 <= n <= 10^9",
    blacklist: "",
    whitelist: "",
    sourcecode: `n = gets.to_i
puts n.class\n`,
  },
  {
    title: "Symbol Identity Check",
    description:
      "Read two strings and check whether their symbol conversions are equal. Print \"same\" or \"different\".\n\nInput Format:\nA single line with two space-separated strings a and b.\n\nOutput Format:\nOne line: same or different.\n\nConstraints:\n1 <= length of each string <= 30.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Symbols",
    sampleinput1: "ruby ruby",
    sampleoutput1: "same",
    sampleinput2: "Ruby ruby",
    sampleoutput2: "different",
    input1: "name name",
    output1: "same",
    input2: "foo bar",
    output2: "different",
    input3: "x x",
    output3: "same",
    inputconstrains: "1 <= string length <= 30",
    blacklist: "",
    whitelist: "",
    sourcecode: `a, b = gets.split
puts a.to_sym == b.to_sym ? "same" : "different"\n`,
  },

  /* ───── EASY · SCENARIO (4) ───── */
  {
    title: "Bill Split Calculator",
    description:
      "Three friends split a restaurant bill. Read total amount and number of people, then print each person's share to 2 decimals.\n\nInput Format:\nA single line with two space-separated integers: total rupees, number of people.\n\nOutput Format:\nOne line: per-person share to 2 decimals.\n\nConstraints:\n1 <= total <= 10^6, 1 <= people <= 1000.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Type Conversion and Coercion",
    sampleinput1: "1200 4",
    sampleoutput1: "300.00",
    sampleinput2: "100 3",
    sampleoutput2: "33.33",
    input1: "500 5",
    output1: "100.00",
    input2: "99 2",
    output2: "49.50",
    input3: "1000 8",
    output3: "125.00",
    inputconstrains: "1 <= total <= 10^6, 1 <= people <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `total, people = gets.split.map(&:to_i)
per_person = total.to_f / people
puts "%.2f" % per_person\n`,
  },
  {
    title: "Fahrenheit to Celsius Converter",
    description:
      "A weather app converts Fahrenheit (integer input) to Celsius using the formula C = (F - 32) * 5 / 9. Output the result to 2 decimals.\n\nInput Format:\nA single integer: temperature in Fahrenheit.\n\nOutput Format:\nOne line: Celsius value to 2 decimals.\n\nConstraints:\n-100 <= F <= 200.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Numeric Types Integer and Float",
    sampleinput1: "98",
    sampleoutput1: "36.67",
    sampleinput2: "32",
    sampleoutput2: "0.00",
    input1: "212",
    output1: "100.00",
    input2: "-40",
    output2: "-40.00",
    input3: "50",
    output3: "10.00",
    inputconstrains: "-100 <= F <= 200",
    blacklist: "",
    whitelist: "",
    sourcecode: `f = gets.to_i
c = (f - 32) * 5.0 / 9
puts "%.2f" % c\n`,
  },
  {
    title: "Score Percentage Reporter",
    description:
      "A teacher's grading tool reads obtained and total marks (both integers) and prints the percentage to 2 decimals.\n\nInput Format:\nA single line with two space-separated integers: obtained, total.\n\nOutput Format:\nOne line: percentage to 2 decimals.\n\nConstraints:\n0 <= obtained <= total <= 1000.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Type Conversion and Coercion",
    sampleinput1: "45 60",
    sampleoutput1: "75.00",
    sampleinput2: "90 100",
    sampleoutput2: "90.00",
    input1: "50 100",
    output1: "50.00",
    input2: "7 10",
    output2: "70.00",
    input3: "180 200",
    output3: "90.00",
    inputconstrains: "0 <= obtained <= total <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `obtained, total = gets.split.map(&:to_i)
pct = obtained.to_f / total * 100
puts "%.2f" % pct\n`,
  },
  {
    title: "Currency Rounder",
    description:
      "A payment gateway reads a raw float string (rupees) and prints the amount rounded to 2 decimal places.\n\nInput Format:\nA single line containing a float string.\n\nOutput Format:\nOne line: the value to 2 decimals.\n\nConstraints:\n0 <= value <= 10^9.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Numeric Types Integer and Float",
    sampleinput1: "12.567",
    sampleoutput1: "12.57",
    sampleinput2: "100",
    sampleoutput2: "100.00",
    input1: "3.14159",
    output1: "3.14",
    input2: "0.999",
    output2: "1.00",
    input3: "99.5",
    output3: "99.50",
    inputconstrains: "0 <= value <= 10^9",
    blacklist: "",
    whitelist: "",
    sourcecode: `x = gets.to_f
puts "%.2f" % x\n`,
  },

  /* ───── MEDIUM · SCENARIO (6) — blacklist+whitelist, maxscore 20 ───── */
  {
    title: "Sensor Reading Aggregator",
    description:
      "A weather station collects n float temperature readings. Compute the average using a while loop (the builtin iterators are disabled). Print the average to 2 decimals.\n\nInput Format:\nFirst line: integer n. Following n lines: one float per line.\n\nOutput Format:\nOne line: average temperature to 2 decimals.\n\nConstraints:\n1 <= n <= 1000, each reading between -100 and 200.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Numeric Types Integer and Float",
    sampleinput1: "3\n36.5\n37.0\n38.2",
    sampleoutput1: "37.23",
    sampleinput2: "2\n25.0\n25.0",
    sampleoutput2: "25.00",
    input1: "4\n10\n20\n30\n40",
    output1: "25.00",
    input2: "1\n42.5",
    output2: "42.50",
    input3: "5\n1\n2\n3\n4\n5",
    output3: "3.00",
    inputconstrains: "1 <= n <= 1000, -100 <= reading <= 200",
    blacklist: "each, inject, reduce, sum, map",
    whitelist: "while , to_f",
    sourcecode: `n = gets.to_i
total = 0.0
i = 0
while i < n
  total += gets.to_f
  i += 1
end
avg = total / n
puts "%.2f" % avg\n`,
  },
  {
    title: "Numeric Class Identifier",
    description:
      "A REPL tutor inspects a user-provided token and classifies it as Integer, Float, or String (without using the .class / is_a? family). Decide based on the token's characters.\n\nInput Format:\nA single line containing a token (no spaces).\n\nOutput Format:\nOne line: Integer, Float, or String.\n  Integer: token is all digits with optional leading minus.\n  Float: token contains a dot and digits around it (e.g. 3.14).\n  String: otherwise.\n\nConstraints:\n1 <= token length <= 50.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Type Conversion and Coercion",
    sampleinput1: "42",
    sampleoutput1: "Integer",
    sampleinput2: "3.14",
    sampleoutput2: "Float",
    input1: "hello",
    output1: "String",
    input2: "0",
    output2: "Integer",
    input3: "2.5",
    output3: "Float",
    inputconstrains: "1 <= token length <= 50",
    blacklist: "class, is_a?, kind_of?, instance_of?",
    whitelist: "include?, to_i",
    sourcecode: `s = gets.chomp
if s.include?(".")
  puts "Float"
elsif s.to_i.to_s == s
  puts "Integer"
else
  puts "String"
end\n`,
  },
  {
    title: "Comment Stripper",
    description:
      "A tiny Ruby preprocessor reads one line of Ruby source and removes any inline comment (the # character and everything after it). The slice/gsub/sub helpers are disabled; use split and include?.\n\nInput Format:\nA single line of Ruby source code (may or may not contain #).\n\nOutput Format:\nOne line: the source code with # and everything after removed (trailing whitespace is ignored by the judge).\n\nConstraints:\n1 <= line length <= 200.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Comments",
    sampleinput1: "n = gets.to_i # read n",
    sampleoutput1: "n = gets.to_i",
    sampleinput2: "x = 5",
    sampleoutput2: "x = 5",
    input1: "a = 1 + 2 # sum",
    output1: "a = 1 + 2",
    input2: "puts result",
    output2: "puts result",
    input3: "y = x * 2 # multiply",
    output3: "y = x * 2",
    inputconstrains: "1 <= line length <= 200",
    blacklist: "slice, slice!, gsub, sub",
    whitelist: "split, include?",
    sourcecode: `line = gets.chomp
if line.include?("#")
  puts line.split("#")[0]
else
  puts line
end\n`,
  },
  {
    title: "Guest Greeter with Empty Fallback",
    description:
      "A chatbot greets a user by name. If the name is empty (or whitespace-only), it falls back to \"Guest\". Use the empty? check — the || and if/unless constructs are disabled to force the empty? approach.\n\nInput Format:\nA single line containing the visitor's name (may be empty or whitespace).\n\nOutput Format:\nOne line: Hello, <name>! or Hello, Guest!\n\nConstraints:\n0 <= name length <= 30.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "nil Value",
    sampleinput1: "Alice",
    sampleoutput1: "Hello, Alice!",
    sampleinput2: "\n",
    sampleoutput2: "Hello, Guest!",
    input1: "Bob",
    output1: "Hello, Bob!",
    input2: "Carol",
    output2: "Hello, Carol!",
    input3: "   \n",
    output3: "Hello, Guest!",
    inputconstrains: "0 <= name length <= 30",
    blacklist: "||, if , unless",
    whitelist: "empty?",
    sourcecode: `name = gets.chomp.strip
name = name.empty? ? "Guest" : name
puts "Hello, #{name}!"\n`,
  },
  {
    title: "Stock Ticker Multi-Parser",
    description:
      "A fintech CLI tool reads a stock ticker record (symbol, integer share count, float price) and reports three values about it. The .class introspection methods are disabled.\n\nInput Format:\nA single line with 3 space-separated tokens: symbol shares price.\n\nOutput Format:\nThree lines: symbol character count, integer share count, total value (shares * price) to 2 decimals.\n\nConstraints:\n1 <= symbol length <= 10, 1 <= shares <= 10^6, 0 <= price <= 10^6.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Variables and Assignment",
    sampleinput1: "AAPL 10 150.25",
    sampleoutput1: "4\n10\n1502.50",
    sampleinput2: "GOOG 5 2800",
    sampleoutput2: "4\n5\n14000.00",
    input1: "T 100 38.5",
    output1: "1\n100\n3850.00",
    input2: "MSFT 8 399.99",
    output2: "4\n8\n3199.92",
    input3: "IBM 2 175.0",
    output3: "3\n2\n350.00",
    inputconstrains: "1 <= symbol length <= 10, 1 <= shares <= 10^6",
    blacklist: "class, is_a?, kind_of?, instance_of?",
    whitelist: "to_i, to_f, length",
    sourcecode: `symbol, shares, price = gets.split
sym_len = symbol.length
n = shares.to_i
p = price.to_f
total = n * p
puts sym_len
puts n
puts "%.2f" % total\n`,
  },
  {
    title: "Currency Exchange Reporter",
    description:
      "A traveler enters an amount and an exchange rate (both as strings that may be integer or float). The script computes the converted amount to 2 decimals using to_f and split. Higher-order iterators are disabled.\n\nInput Format:\nA single line with two space-separated strings: amount, rate.\n\nOutput Format:\nOne line: converted amount (amount * rate) to 2 decimals.\n\nConstraints:\n0 <= amount, rate <= 10^6.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Type Conversion and Coercion",
    sampleinput1: "100 1.5",
    sampleoutput1: "150.00",
    sampleinput2: "200 0.5",
    sampleoutput2: "100.00",
    input1: "50 2",
    output1: "100.00",
    input2: "75 1.25",
    output2: "93.75",
    input3: "10 3.5",
    output3: "35.00",
    inputconstrains: "0 <= amount, rate <= 10^6",
    blacklist: "each, inject, reduce, sum, map",
    whitelist: "to_f, split",
    sourcecode: `amount, rate = gets.split
a = amount.to_f
r = rate.to_f
result = a * r
puts "%.2f" % result\n`,
  },

  /* ───── HARD · SCENARIO (4) — blacklist+whitelist, maxscore 30 ───── */
  {
    title: "Account Ledger Transfer",
    description:
      "A bank ledger tool processes n transactions. Each transaction line is either \"deposit <amount>\" or \"withdraw <amount>\" where amount is a float string. Starting balance is 0.0. Print the final balance to 2 decimals using a while loop (iterators and sum are disabled).\n\nInput Format:\nFirst line: integer n. Following n lines: \"deposit X\" or \"withdraw X\".\n\nOutput Format:\nOne line: final balance to 2 decimals.\n\nConstraints:\n1 <= n <= 1000, 0 <= amount <= 10^6.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Numeric Types Integer and Float",
    sampleinput1: "3\ndeposit 100.50\nwithdraw 30.25\ndeposit 50.00",
    sampleoutput1: "120.25",
    sampleinput2: "2\ndeposit 500\nwithdraw 100",
    sampleoutput2: "400.00",
    input1: "4\ndeposit 50\ndeposit 50\nwithdraw 25\nwithdraw 25",
    output1: "50.00",
    input2: "1\ndeposit 1000",
    output2: "1000.00",
    input3: "5\nwithdraw 100\ndeposit 300\nwithdraw 50\ndeposit 100\nwithdraw 25",
    output3: "225.00",
    inputconstrains: "1 <= n <= 1000, 0 <= amount <= 10^6",
    blacklist: "each, inject, reduce, sum, map, select",
    whitelist: "while , to_f",
    sourcecode: `n = gets.to_i
balance = 0.0
i = 0
while i < n
  op, amt = gets.split
  amount = amt.to_f
  if op == "deposit"
    balance += amount
  else
    balance -= amount
  end
  i += 1
end
puts "%.2f" % balance\n`,
  },
  {
    title: "Inventory Value Calculator",
    description:
      "A warehouse tool reads n inventory items, each line: name qty price (qty integer, price float). Compute total inventory value (sum of qty * price) and the number of bulk items (qty > 10). Higher-order iterators are disabled.\n\nInput Format:\nFirst line: integer n. Following n lines: name qty price (space-separated).\n\nOutput Format:\nTwo lines: total value to 2 decimals, then the count of bulk items.\n\nConstraints:\n1 <= n <= 1000, 1 <= name length <= 20, 1 <= qty <= 10000, 0 <= price <= 10^6.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Type Conversion and Coercion",
    sampleinput1:
      "3\napple 5 1.50\nbanana 15 0.75\ncherry 8 3.25",
    sampleoutput1: "44.75\n1",
    sampleinput2: "2\nwidget 3 10.00\ngadget 20 5.00",
    sampleoutput2: "130.00\n1",
    input1: "4\na 5 2\nb 11 3\nc 8 4\nd 12 1",
    output1: "87.00\n2",
    input2: "1\nsolo 100 1.99",
    output2: "199.00\n1",
    input3: "3\nx 1 10\ny 2 5\nz 3 2",
    output3: "26.00\n0",
    inputconstrains: "1 <= n <= 1000, 1 <= qty <= 10000",
    blacklist: "each, inject, reduce, sum, map, select",
    whitelist: "while , to_f",
    sourcecode: `n = gets.to_i
total_value = 0.0
bulk_items = 0
i = 0
while i < n
  name, qty, price = gets.split
  q = qty.to_i
  p = price.to_f
  total_value += q * p
  if q > 10
    bulk_items += 1
  end
  i += 1
end
puts "%.2f" % total_value
puts bulk_items\n`,
  },
  {
    title: "Variable Type Inventory",
    description:
      "A data logger records n lines, each tagged with a type label (int, float, or str) followed by a value. Count how many of each type appear. The case/when statement and higher-order iterators are disabled; use if/elsif and a while loop.\n\nInput Format:\nFirst line: integer n. Following n lines: \"<type> <value>\" where value may contain spaces (split on the first space only).\n\nOutput Format:\nThree lines: count of int, count of float, count of str.\n\nConstraints:\n1 <= n <= 1000, type is one of int / float / str.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Variables and Assignment",
    sampleinput1:
      "5\nint 42\nfloat 3.14\nstr hello world\nint 7\nstr foo",
    sampleoutput1: "2\n1\n2",
    sampleinput2: "3\nint 1\nint 2\nint 3",
    sampleoutput2: "3\n0\n0",
    input1: "4\nfloat 1.5\nfloat 2.5\nstr bar baz\nint 9",
    output1: "1\n2\n1",
    input2: "2\nstr only one\nstr another",
    output2: "0\n0\n2",
    input3: "6\nint 1\nfloat 2.0\nstr x y z\nint 4\nfloat 5.5\nstr a b",
    output3: "2\n2\n2",
    inputconstrains: "1 <= n <= 1000, type is int / float / str",
    blacklist: "case, when, each, map",
    whitelist: "if , while ",
    sourcecode: `n = gets.to_i
int_count = 0
float_count = 0
str_count = 0
i = 0
while i < n
  parts = gets.split(" ", 2)
  type = parts[0]
  if type == "int"
    int_count += 1
  elsif type == "float"
    float_count += 1
  elsif type == "str"
    str_count += 1
  end
  i += 1
end
puts int_count
puts float_count
puts str_count\n`,
  },
  {
    title: "Multi-Category Field Aggregator",
    description:
      "A personal-finance tool reads n ledger entries, each line: \"<category> <amount>\" where category is income, expense, or tax and amount is a float string. Aggregate totals per category. The case/when statement and higher-order iterators are disabled.\n\nInput Format:\nFirst line: integer n. Following n lines: \"<category> <amount>\".\n\nOutput Format:\nThree lines: total income, total expense, total tax (each to 2 decimals).\n\nConstraints:\n1 <= n <= 1000, 0 <= amount <= 10^6.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Numeric Types Integer and Float",
    sampleinput1:
      "5\nincome 1000\nexpense 250.50\ntax 100\nincome 500\nexpense 75.25",
    sampleoutput1: "1500.00\n325.75\n100.00",
    sampleinput2: "3\nincome 100\nincome 200\nincome 300",
    sampleoutput2: "600.00\n0.00\n0.00",
    input1: "4\nincome 500\nexpense 100\ntax 50\nincome 200",
    output1: "700.00\n100.00\n50.00",
    input2: "2\nexpense 25.75\ntax 10.25",
    output2: "0.00\n25.75\n10.25",
    input3: "6\nincome 1\nincome 2\nexpense 1\nexpense 2\ntax 1\ntax 2",
    output3: "3.00\n3.00\n3.00",
    inputconstrains: "1 <= n <= 1000, 0 <= amount <= 10^6",
    blacklist: "case, when, each, inject, reduce, sum",
    whitelist: "if , while , to_f",
    sourcecode: `n = gets.to_i
income = 0.0
expense = 0.0
tax = 0.0
i = 0
while i < n
  cat, val = gets.split
  v = val.to_f
  if cat == "income"
    income += v
  elsif cat == "expense"
    expense += v
  elsif cat == "tax"
    tax += v
  end
  i += 1
end
puts "%.2f" % income
puts "%.2f" % expense
puts "%.2f" % tax\n`,
  },
];

/* ───────────────────────── DAY 2 MCQ QUESTIONS ───────────────────────── */

const mcqs: MCQ[] = [
  /* ───── EASY (10) ───── */
  {
    title: "String to Integer Method",
    description: "Which Ruby method converts the string \"42\" into the integer 42?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Type Conversion and Coercion",
    Option1: ".to_i",
    Option2: ".to_int",
    Option3: ".parse",
    Option4: ".int",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Division Quotient Output",
    description: "What is the result of the Ruby expression 5 / 2?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Numeric Types Integer and Float",
    Option1: "2.5",
    Option2: "2",
    Option3: "2.0",
    Option4: "3",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Introspection Method",
    description: "Which method returns the class of an object in Ruby (e.g. calling it on \"hi\" returns String)?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Type Conversion and Coercion",
    Option1: ".type",
    Option2: ".kind",
    Option3: ".class",
    Option4: ".typeof",
    CorrectOption: 3,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Class of a Float",
    description: "What is the class of the literal 3.14 in Ruby?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Numeric Types Integer and Float",
    Option1: "Number",
    Option2: "Float",
    Option3: "Double",
    Option4: "Decimal",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Single Line Comment Syntax",
    description: "Which character begins a single-line comment in Ruby?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Comments",
    Option1: "//",
    Option2: "--",
    Option3: "#",
    Option4: ";",
    CorrectOption: 3,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Meaning of nil",
    description: "Which statement best describes nil in Ruby?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "nil Value",
    Option1: "An empty string \"\"",
    Option2: "The integer zero 0",
    Option3: "The absence of a value, and is falsy",
    Option4: "A special kind of symbol",
    CorrectOption: 3,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Symbol Literal Syntax",
    description: "Which of these creates a Ruby symbol named name?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Symbols",
    Option1: ":name",
    Option2: "#name",
    Option3: "$name",
    Option4: "@name",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "to_i on String Digits",
    description: "What does the Ruby expression \"5\".to_i return?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Type Conversion and Coercion",
    Option1: "The string \"5\"",
    Option2: "The integer 5",
    Option3: "The symbol :5",
    Option4: "nil",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "nil to_i Behavior",
    description: "What does nil.to_i return in Ruby?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "nil Value",
    Option1: "0",
    Option2: "nil",
    Option3: "Raises NoMethodError",
    Option4: "An empty string",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Truthiness of Zero",
    description: "In Ruby, only nil and false are falsy. What is the truthiness of 0?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Booleans true and false",
    Option1: "falsy",
    Option2: "truthy",
    Option3: "neither — it raises",
    Option4: "depends on the type of 0",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },

  /* ───── MEDIUM (6) — at least some snippets ───── */
  {
    title: "String to Integer Plus Integer",
    description: "What does the following Ruby snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Type Conversion and Coercion",
    Option1: "8",
    Option2: "53",
    Option3: "\"5\"+3",
    Option4: "Raises TypeError",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `puts "5".to_i + 3`,
    snippetLang: "ruby",
  },
  {
    title: "Integer Divided by Float",
    description: "What does the following Ruby snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Numeric Types Integer and Float",
    Option1: "3",
    Option2: "3.0",
    Option3: "3.3333333333333335",
    Option4: "3.33",
    CorrectOption: 3,
    iscodesnippet: true,
    codesnippet: `puts 10 / 3.0`,
    snippetLang: "ruby",
  },
  {
    title: "Class of a String Variable",
    description: "What does the following Ruby snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Type Conversion and Coercion",
    Option1: "String",
    Option2: "Integer",
    Option3: "Text",
    Option4: "Object",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `x = "10"
puts x.class`,
    snippetLang: "ruby",
  },
  {
    title: "nil to_i Output",
    description: "What does the following Ruby snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "nil Value",
    Option1: "nil",
    Option2: "0",
    Option3: "Raises NoMethodError",
    Option4: "false",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `puts nil.to_i`,
    snippetLang: "ruby",
  },
  {
    title: "Integer to String Concatenation",
    description: "What does the following Ruby snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Type Conversion and Coercion",
    Option1: "10",
    Option2: "55",
    Option3: "\"5\"+5",
    Option4: "Raises TypeError",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `puts 5.to_s + "5"`,
    snippetLang: "ruby",
  },
  {
    title: "Class of nil",
    description: "What does the following Ruby snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "nil Value",
    Option1: "Nil",
    Option2: "Null",
    Option3: "NilClass",
    Option4: "Object",
    CorrectOption: 3,
    iscodesnippet: true,
    codesnippet: `x = nil
puts x.class`,
    snippetLang: "ruby",
  },

  /* ───── HARD (4) — snippets ───── */
  {
    title: "Float String Parsing Output",
    description: "What does the following Ruby snippet print? (Two lines of output.)",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Type Conversion and Coercion",
    Option1: "3 then 3.14",
    Option2: "3.14 then 3",
    Option3: "3 then 3",
    Option4: "Raises an error",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `x = "3.14"
puts x.to_i
puts x.to_f`,
    snippetLang: "ruby",
  },
  {
    title: "Division Result Classes",
    description: "What does the following Ruby snippet print? (Two lines of output.)",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Numeric Types Integer and Float",
    Option1: "Integer then Float",
    Option2: "Float then Float",
    Option3: "Integer then Integer",
    Option4: "Float then Integer",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `puts (5 / 2).class
puts (5.0 / 2).class`,
    snippetLang: "ruby",
  },
  {
    title: "Integer vs String Mutation",
    description: "What does the following Ruby snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Variables and Assignment",
    Option1: "5",
    Option2: "50",
    Option3: "Raises an error",
    Option4: "nil",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `a = "5"
b = a.to_i
a << "0"
puts b`,
    snippetLang: "ruby",
  },
  {
    title: "Integer Rebinding Behavior",
    description: "What does the following Ruby snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Variables and Assignment",
    Option1: "10",
    Option2: "20",
    Option3: "30",
    Option4: "Raises an error",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `x = 10
y = x
x = 20
puts y`,
    snippetLang: "ruby",
  },
];

/* ───────────────────────── EMIT JSON ───────────────────────── */

const d = String(DAY).padStart(2, "0");
writeFileSync(
  `scripts/ruby-programming/data/day-${d}.code.json`,
  JSON.stringify(
    { day: DAY, topics: [{ name: TOPIC, subtopics: SUBTOPICS }], questions },
    null,
    2,
  ),
);
writeFileSync(
  `scripts/ruby-programming/data/day-${d}.mcq.json`,
  JSON.stringify({ day: DAY, questions: mcqs }, null, 2),
);
console.log("wrote day", DAY);
