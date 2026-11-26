import { writeFileSync } from "node:fs";

const DAY = 9;
const TOPIC = "Strings";
const SUBTOPICS = [
  "String Interpolation",
  "String Methods",
  "String Mutation and Immutability",
  "String Formatting",
  "String Encoding Basics",
];

/* ──────────────────────────────────────────────────────────────
   DAY 9 — Strings
   20 code questions: 6 easy-basic + 4 easy-scenario +
                       6 medium-scenario + 4 hard-scenario
   20 MCQs:           10 easy + 6 medium + 4 hard
   ────────────────────────────────────────────────────────────── */

const questions = [
  /* ── EASY BASIC (6) ─────────────────────────────────────────── */
  {
    title: "Greeting Interpolation Drill",
    description:
      'Read a name from stdin and print a greeting using Ruby string interpolation.\n\nInput Format:\nA single line containing a name (letters only).\n\nOutput Format:\nThe line "Hello, <name>!"\n\nConstraints:\n1 <= name length <= 50',
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "String Interpolation",
    sampleinput1: "Alice",
    sampleoutput1: "Hello, Alice!",
    sampleinput2: "Bob",
    sampleoutput2: "Hello, Bob!",
    input1: "Ruby",
    output1: "Hello, Ruby!",
    input2: "World",
    output2: "Hello, World!",
    input3: "Z",
    output3: "Hello, Z!",
    inputconstrains: "1 <= name length <= 50",
    blacklist: "",
    whitelist: "",
    sourcecode: `name = gets.chomp
puts "Hello, #{name}!"`,
  },
  {
    title: "Uppercase Word Conversion",
    description:
      "Read a word and print it in all uppercase.\n\nInput Format:\nA single line containing one word.\n\nOutput Format:\nThe uppercase form of the word.\n\nConstraints:\n1 <= word length <= 50",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "String Methods",
    sampleinput1: "hello",
    sampleoutput1: "HELLO",
    sampleinput2: "Ruby",
    sampleoutput2: "RUBY",
    input1: "abc",
    output1: "ABC",
    input2: "MixedCase",
    output2: "MIXEDCASE",
    input3: "z",
    output3: "Z",
    inputconstrains: "1 <= word length <= 50",
    blacklist: "",
    whitelist: "",
    sourcecode: `word = gets.chomp
puts word.upcase`,
  },
  {
    title: "Word Length Counter",
    description:
      "Read a word and print how many characters it contains.\n\nInput Format:\nA single line containing one word.\n\nOutput Format:\nAn integer — the number of characters in the word.\n\nConstraints:\n1 <= word length <= 100",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "String Methods",
    sampleinput1: "hello",
    sampleoutput1: "5",
    sampleinput2: "Ruby",
    sampleoutput2: "4",
    input1: "abc",
    output1: "3",
    input2: "x",
    output2: "1",
    input3: "abcdefghij",
    output3: "10",
    inputconstrains: "1 <= word length <= 100",
    blacklist: "",
    whitelist: "",
    sourcecode: `word = gets.chomp
puts word.length`,
  },
  {
    title: "Whitespace Trimmer",
    description:
      "Read a line that may have leading or trailing spaces and print it with surrounding whitespace removed.\n\nInput Format:\nA single line of text (may contain leading/trailing spaces).\n\nOutput Format:\nThe line with leading and trailing whitespace stripped.\n\nConstraints:\n1 <= line length <= 200",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "String Methods",
    sampleinput1: "  hello  ",
    sampleoutput1: "hello",
    sampleinput2: "Ruby",
    sampleoutput2: "Ruby",
    input1: "  hello  ",
    output1: "hello",
    input2: "ab",
    output2: "ab",
    input3: "  x  ",
    output3: "x",
    inputconstrains: "1 <= line length <= 200",
    blacklist: "",
    whitelist: "",
    sourcecode: `line = gets.chomp
puts line.strip`,
  },
  {
    title: "Reversed Word Printer",
    description:
      "Read a word and print its characters in reverse order.\n\nInput Format:\nA single line containing one word.\n\nOutput Format:\nThe reversed word.\n\nConstraints:\n1 <= word length <= 100",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "String Methods",
    sampleinput1: "abc",
    sampleoutput1: "cba",
    sampleinput2: "hello",
    sampleoutput2: "olleh",
    input1: "Ruby",
    output1: "ybuR",
    input2: "12345",
    output2: "54321",
    input3: "x",
    output3: "x",
    inputconstrains: "1 <= word length <= 100",
    blacklist: "",
    whitelist: "",
    sourcecode: `word = gets.chomp
puts word.reverse`,
  },
  {
    title: "Capitalized Word Formatter",
    description:
      "Read a word and print it with the first character in uppercase and the rest in lowercase.\n\nInput Format:\nA single line containing one word.\n\nOutput Format:\nThe word capitalized (first letter uppercase, rest lowercase).\n\nConstraints:\n1 <= word length <= 100",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "String Methods",
    sampleinput1: "hello",
    sampleoutput1: "Hello",
    sampleinput2: "ruby",
    sampleoutput2: "Ruby",
    input1: "WORLD",
    output1: "World",
    input2: "a",
    output2: "A",
    input3: "tEST",
    output3: "Test",
    inputconstrains: "1 <= word length <= 100",
    blacklist: "",
    whitelist: "",
    sourcecode: `word = gets.chomp
puts word.capitalize`,
  },

  /* ── EASY SCENARIO (4) ──────────────────────────────────────── */
  {
    title: "Username Normalizer for Signup",
    description:
      "A signup form accepts usernames that users sometimes type with leading/trailing spaces and mixed case. Normalize the input by stripping surrounding whitespace and converting all letters to lowercase before storing it.\n\nInput Format:\nA single line containing a username (may include leading/trailing spaces).\n\nOutput Format:\nThe normalized username (trimmed and lowercased).\n\nConstraints:\n1 <= username length <= 50",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "String Methods",
    sampleinput1: "  AliceDoe  ",
    sampleoutput1: "alicedoe",
    sampleinput2: "Bob",
    sampleoutput2: "bob",
    input1: "  X  ",
    output1: "x",
    input2: "Alice_Bob",
    output2: "alice_bob",
    input3: "  RubyProgrammer ",
    output3: "rubyprogrammer",
    inputconstrains: "1 <= username length <= 50",
    blacklist: "",
    whitelist: "",
    sourcecode: `username = gets.chomp
puts username.strip.downcase`,
  },
  {
    title: "Receipt Price Two Decimal",
    description:
      "A shop receipt printer must show prices with a dollar sign and exactly two decimal places. Read the price as a floating point number and print it formatted as currency.\n\nInput Format:\nA single line containing a numeric value (integer or decimal).\n\nOutput Format:\nThe price formatted as $X.XX (two decimals).\n\nConstraints:\n0 <= price <= 100000",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "String Formatting",
    sampleinput1: "12.5",
    sampleoutput1: "$12.50",
    sampleinput2: "0.5",
    sampleoutput2: "$0.50",
    input1: "100",
    output1: "$100.00",
    input2: "3.14159",
    output2: "$3.14",
    input3: "0",
    output3: "$0.00",
    inputconstrains: "0 <= price <= 100000",
    blacklist: "",
    whitelist: "",
    sourcecode: `price = gets.to_f
puts format("$%.2f", price)`,
  },
  {
    title: "Greeting Card Composer",
    description:
      "A greeting card generator composes a message addressed to a recipient from a sender. Read both names and print the message using string interpolation.\n\nInput Format:\nLine 1: recipient name.\nLine 2: sender name.\n\nOutput Format:\nThe line \"Dear <recipient>, from <sender>\"\n\nConstraints:\n1 <= name length <= 50",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "String Interpolation",
    sampleinput1: "Alice\nBob",
    sampleoutput1: "Dear Alice, from Bob",
    sampleinput2: "Mom\nDad",
    sampleoutput2: "Dear Mom, from Dad",
    input1: "Ruby\nTeacher",
    output1: "Dear Ruby, from Teacher",
    input2: "World\nMe",
    output2: "Dear World, from Me",
    input3: "a\nb",
    output3: "Dear a, from b",
    inputconstrains: "1 <= name length <= 50",
    blacklist: "",
    whitelist: "",
    sourcecode: `recipient = gets.chomp
sender = gets.chomp
puts "Dear #{recipient}, from #{sender}"`,
  },
  {
    title: "Vowel Counter Game",
    description:
      "A children's spelling game asks players to count vowels in a given word. Read the word and print the number of vowels (a, e, i, o, u) it contains, case-insensitively.\n\nInput Format:\nA single line containing one word.\n\nOutput Format:\nAn integer — the vowel count.\n\nConstraints:\n1 <= word length <= 100",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "String Methods",
    sampleinput1: "hello",
    sampleoutput1: "2",
    sampleinput2: "aeiou",
    sampleoutput2: "5",
    input1: "Ruby",
    output1: "1",
    input2: "xyz",
    output2: "0",
    input3: "Banana",
    output3: "3",
    inputconstrains: "1 <= word length <= 100",
    blacklist: "",
    whitelist: "",
    sourcecode: `word = gets.chomp
count = 0
word.downcase.each_char do |c|
  count += 1 if "aeiou".include?(c)
end
puts count`,
  },

  /* ── MEDIUM SCENARIO (6) ────────────────────────────────────── */
  {
    title: "Pig Latin Word Encoder",
    description:
      "A language toy converts each word of a sentence into Pig Latin by moving the first letter to the end and adding \"ay\". The output preserves lowercased words and word boundaries. Implement the converter character by character without using regex substitution methods.\n\nInput Format:\nA single line containing one or more words separated by single spaces.\n\nOutput Format:\nThe Pig Latin encoded line (each word's first letter moved to end and \"ay\" appended, all lowercased).\n\nConstraints:\n1 <= line length <= 200",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "String Mutation and Immutability",
    sampleinput1: "hello world",
    sampleoutput1: "ellohay orldway",
    sampleinput2: "ruby",
    sampleoutput2: "ubyray",
    input1: "apple",
    output1: "ppleaay",
    input2: "hi there",
    output2: "ihay heretay",
    input3: "a",
    output3: "aay",
    inputconstrains: "1 <= line length <= 200",
    blacklist: ".gsub,.tr,.sub",
    whitelist: "each_char,def ,downcase",
    sourcecode: `def pig(word)
  return word if word.length < 1
  w = word.downcase
  first = w[0]
  rest = w[1..]
  rest + first + "ay"
end

line = gets.chomp
words = []
cur = ""
line.each_char do |c|
  if c == " "
    words << pig(cur) unless cur.empty?
    cur = ""
  else
    cur += c
  end
end
words << pig(cur) unless cur.empty?
puts words.join(" ")`,
  },
  {
    title: "Palindrome Sentence Verifier",
    description:
      "A palindrome checker must decide whether a sentence reads the same forwards and backwards after ignoring spaces, punctuation and letter case. Implement the verifier by iterating characters manually rather than using regex substitution or reverse.\n\nInput Format:\nA single line containing a sentence (letters, digits, spaces, punctuation).\n\nOutput Format:\nThe string \"true\" if the cleaned sentence is a palindrome, otherwise \"false\".\n\nConstraints:\n1 <= sentence length <= 200",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "String Methods",
    sampleinput1: "race a car",
    sampleoutput1: "false",
    sampleinput2: "A man a plan a canal Panama",
    sampleoutput2: "true",
    input1: "hello",
    output1: "false",
    input2: "aba",
    output2: "true",
    input3: "12 21",
    output3: "true",
    inputconstrains: "1 <= sentence length <= 200",
    blacklist: ".reverse,.gsub,.scan",
    whitelist: "each_char,downcase,def ",
    sourcecode: `def cleaned(line)
  out = ""
  line.each_char do |c|
    if (c >= "a" && c <= "z") || (c >= "A" && c <= "Z") || (c >= "0" && c <= "9")
      out += c.downcase
    end
  end
  out
end

line = gets.chomp
s = cleaned(line)
n = s.length
ok = true
i = 0
while i < n / 2
  if s[i] != s[n - 1 - i]
    ok = false
    break
  end
  i += 1
end
puts ok ? "true" : "false"`,
  },
  {
    title: "CamelCase to snake_case Converter",
    description:
      "A code style tool rewrites CamelCase identifiers into snake_case. Each uppercase letter becomes lowercase and is prefixed with an underscore, except when it is the very first character. Implement the conversion character by character without regex substitution.\n\nInput Format:\nA single line containing a CamelCase identifier.\n\nOutput Format:\nThe snake_case form of the identifier.\n\nConstraints:\n1 <= identifier length <= 100",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "String Mutation and Immutability",
    sampleinput1: "helloWorld",
    sampleoutput1: "hello_world",
    sampleinput2: "RubyProgramming",
    sampleoutput2: "ruby_programming",
    input1: "HTML",
    output1: "h_t_m_l",
    input2: "snake_case",
    output2: "snake_case",
    input3: "a",
    output3: "a",
    inputconstrains: "1 <= identifier length <= 100",
    blacklist: ".gsub,.tr,.sub",
    whitelist: "each_char,downcase,def ",
    sourcecode: `def to_snake(s)
  out = ""
  s.each_char do |c|
    if c >= "A" && c <= "Z"
      out += "_"
      out += c.downcase
    else
      out += c
    end
  end
  out = out[1..] if out[0] == "_"
  out
end

line = gets.chomp
puts to_snake(line)`,
  },
  {
    title: "CSV Field Extractor",
    description:
      "A tiny CSV parser reads one row and a column index, then prints the value at that column. Implement the field splitting by iterating characters manually rather than using the built-in split method or the CSV library.\n\nInput Format:\nLine 1: a comma separated row of fields (no quoted fields).\nLine 2: a zero-based column index.\n\nOutput Format:\nThe value of the field at the requested column index.\n\nConstraints:\n1 <= row length <= 200; 0 <= index < number of fields",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "String Methods",
    sampleinput1: "alice,bob,carol\n2",
    sampleoutput1: "carol",
    sampleinput2: "apple,orange\n1",
    sampleoutput2: "orange",
    input1: "a,b,c\n0",
    output1: "a",
    input2: "1,2,3,4\n3",
    output2: "4",
    input3: "x\n0",
    output3: "x",
    inputconstrains: "1 <= row length <= 200; 0 <= index < number of fields",
    blacklist: ".split,CSV,parse",
    whitelist: "each_char,def ,index",
    sourcecode: `def field_at(line, index)
  fields = []
  cur = ""
  line.each_char do |c|
    if c == ","
      fields << cur
      cur = ""
    else
      cur += c
    end
  end
  fields << cur
  fields[index]
end

line = gets.chomp
index = gets.to_i
puts field_at(line, index)`,
  },
  {
    title: "Invoice Line Formatter",
    description:
      "An invoice printer formats item lines so the item name is left-padded to 15 characters and the price appears right-aligned in an 8 character wide field with two decimals. Read n rows of name+price pairs and print each formatted line using Kernel#format (do not use ljust/rjust).\n\nInput Format:\nLine 1: integer n.\nNext 2n lines: alternating name and price (price may be integer or decimal).\n\nOutput Format:\nN lines, each formatted as \"<name padded to 15>$<price right-aligned 8 with 2 decimals>\".\n\nConstraints:\n1 <= n <= 50; 1 <= name length <= 15; 0 <= price <= 100000",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "String Formatting",
    sampleinput1: "2\nCoffee\n3.5\nTea\n2.25",
    sampleoutput1: "Coffee          $    3.50\nTea             $    2.25",
    sampleinput2: "1\nBurger\n12.5",
    sampleoutput2: "Burger          $   12.50",
    input1: "1\nBook\n0.99",
    output1: "Book            $    0.99",
    input2: "1\nPen\n100",
    output2: "Pen             $  100.00",
    input3: "1\nWidget\n1234.5",
    output3: "Widget          $ 1234.50",
    inputconstrains: "1 <= n <= 50; 1 <= name length <= 15; 0 <= price <= 100000",
    blacklist: "ljust,rjust,center",
    whitelist: "format,def ,each",
    sourcecode: `def format_line(name, price)
  format("%-15s $%8.2f", name, price)
end

n = gets.to_i
rows = []
n.times { rows << [gets.chomp, gets.to_f] }
rows.each do |name, price|
  puts format_line(name, price)
end`,
  },
  {
    title: "ASCII Byte Average Calculator",
    description:
      "An encoding inspector computes the average ASCII code of the characters in a string. Read a line and print the integer average (rounded down via integer division) without using String#bytes or aggregation methods like sum/inject.\n\nInput Format:\nA single line of text.\n\nOutput Format:\nAn integer — the floor of the average ASCII code of the characters.\n\nConstraints:\n1 <= line length <= 1000",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "String Encoding Basics",
    sampleinput1: "abc",
    sampleoutput1: "98",
    sampleinput2: "ABC",
    sampleoutput2: "66",
    input1: "a",
    output1: "97",
    input2: "ab",
    output2: "97",
    input3: "xyz",
    output3: "121",
    inputconstrains: "1 <= line length <= 1000",
    blacklist: ".bytes,.sum,.inject",
    whitelist: "each_char,ord,def ",
    sourcecode: `def byte_average(line)
  total = 0
  count = 0
  line.each_char do |c|
    total += c.ord
    count += 1
  end
  count == 0 ? 0 : total / count
end

line = gets.chomp
puts byte_average(line)`,
  },

  /* ── HARD SCENARIO (4) ──────────────────────────────────────── */
  {
    title: "Caesar Cipher Encoder",
    description:
      "A Caesar cipher encoder shifts each letter by k positions (preserving case and wrapping around the alphabet) while leaving non-letter characters unchanged. Implement the shift using each_char with ord/chr arithmetic; do not use gsub, sub or tr.\n\nInput Format:\nLine 1: the text to encode.\nLine 2: a non-negative integer shift k.\n\nOutput Format:\nThe encoded text.\n\nConstraints:\n1 <= text length <= 200; 0 <= k <= 1000",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "String Mutation and Immutability",
    sampleinput1: "abc\n3",
    sampleoutput1: "def",
    sampleinput2: "Hello\n5",
    sampleoutput2: "Mjqqt",
    input1: "xyz\n3",
    output1: "abc",
    input2: "Ruby\n1",
    output2: "Svcz",
    input3: "Hello World\n1",
    output3: "Ifmmp Xpsme",
    inputconstrains: "1 <= text length <= 200; 0 <= k <= 1000",
    blacklist: ".tr,.gsub,.sub",
    whitelist: "each_char,ord,chr,def ",
    sourcecode: `def shift(c, k)
  if c >= "a" && c <= "z"
    base = "a".ord
    n = c.ord - base
    n = (n + k) % 26
    (base + n).chr
  elsif c >= "A" && c <= "Z"
    base = "A".ord
    n = c.ord - base
    n = (n + k) % 26
    (base + n).chr
  else
    c
  end
end

line = gets.chomp
k = gets.to_i
result = ""
line.each_char { |c| result += shift(c, k) }
puts result`,
  },
  {
    title: "Title Case Article Generator",
    description:
      "An article formatter converts a headline so the first letter of every word is uppercase and the remaining letters are lowercase, preserving the original spacing. Implement the conversion by iterating characters; do not use String#capitalize or gsub.\n\nInput Format:\nA single line containing a headline.\n\nOutput Format:\nThe title-cased headline.\n\nConstraints:\n1 <= headline length <= 200",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "String Methods",
    sampleinput1: "hello world",
    sampleoutput1: "Hello World",
    sampleinput2: "ruby programming",
    sampleoutput2: "Ruby Programming",
    input1: "the quick brown fox",
    output1: "The Quick Brown Fox",
    input2: "ALLCAPS WORD",
    output2: "Allcaps Word",
    input3: "a b c",
    output3: "A B C",
    inputconstrains: "1 <= headline length <= 200",
    blacklist: ".capitalize,.gsub,titlecase",
    whitelist: "each_char,def ,upcase,downcase",
    sourcecode: `def title_case(line)
  result = ""
  new_word = true
  line.each_char do |c|
    if c == " "
      result += c
      new_word = true
    elsif new_word
      result += c.upcase
      new_word = false
    else
      result += c.downcase
    end
  end
  result
end

line = gets.chomp
puts title_case(line)`,
  },
  {
    title: "Masked Email Printer",
    description:
      "A privacy tool masks the local part of an email address so only its first character is visible, followed by three asterisks and the domain. Implement the masking by scanning characters manually with a while loop; do not use regex substitution methods.\n\nInput Format:\nA single line containing an email address.\n\nOutput Format:\nThe masked email: first character + \"***\" + the part starting at the @ sign (including @).\n\nConstraints:\n1 <= email length <= 100; email always contains exactly one @ character",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "String Methods",
    sampleinput1: "john@example.com",
    sampleoutput1: "j***@example.com",
    sampleinput2: "alice@test.org",
    sampleoutput2: "a***@test.org",
    input1: "ruby@ruby.org",
    output1: "r***@ruby.org",
    input2: "user.name@domain.com",
    output2: "u***@domain.com",
    input3: "a@b",
    output3: "a***@b",
    inputconstrains: "1 <= email length <= 100; email contains exactly one @",
    blacklist: ".gsub,.sub,.scan",
    whitelist: "while ,def ,length",
    sourcecode: `def mask_email(email)
  at_pos = -1
  i = 0
  while i < email.length
    if email[i] == "@"
      at_pos = i
      break
    end
    i += 1
  end
  return email if at_pos == -1
  first = email[0]
  domain = email[at_pos..]
  first + "***" + domain
end

line = gets.chomp
puts mask_email(line)`,
  },
  {
    title: "Word Frequency Reporter",
    description:
      "A word analytics tool reads a sentence and prints each distinct word (lowercased) together with how many times it occurs, sorted by count descending then alphabetically ascending. Implement counting manually with a hash; do not use tally, group_by, count or inject.\n\nInput Format:\nA single line containing words separated by single spaces.\n\nOutput Format:\nOne line per distinct word in the form \"<word> <count>\", sorted as described.\n\nConstraints:\n1 <= line length <= 500",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "String Interpolation",
    sampleinput1: "the cat the dog the bird",
    sampleoutput1: "the 3\nbird 1\ncat 1\ndog 1",
    sampleinput2: "apple apple banana",
    sampleoutput2: "apple 2\nbanana 1",
    input1: "hello hello hello",
    output1: "hello 3",
    input2: "a b a b a",
    output2: "a 3\nb 2",
    input3: "x y z",
    output3: "x 1\ny 1\nz 1",
    inputconstrains: "1 <= line length <= 500",
    blacklist: "tally,group_by,.count,inject",
    whitelist: "each_char,def ,sort",
    sourcecode: `def gather_words(line)
  counts = {}
  word = ""
  line.each_char do |c|
    if c == " "
      unless word.empty?
        counts[word] = (counts[word] || 0) + 1
        word = ""
      end
    else
      word += c.downcase
    end
  end
  unless word.empty?
    counts[word] = (counts[word] || 0) + 1
  end
  counts
end

line = gets.chomp
counts = gather_words(line)
result = counts.map { |k, v| [k, v] }.sort do |a, b|
  if a[1] == b[1]
    a[0] <=> b[0]
  else
    b[1] <=> a[1]
  end
end
result.each do |w, n|
  puts "#{w} #{n}"
end`,
  },
];

/* ──────────────────────────────────────────────────────────────
   DAY 9 — MCQs (20): 10 easy + 6 medium + 4 hard
   At least 6 must be code snippets (snippetLang: "ruby").
   ────────────────────────────────────────────────────────────── */
const mcqs = [
  /* ── EASY (10) ─────────────────────────────────────────────── */
  {
    title: "String Interpolation Basic Behavior",
    description:
      'What does the Ruby expression "#{1+1}" evaluate to?',
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "String Interpolation",
    Option1: '"#{1+1}"',
    Option2: '"2"',
    Option3: '"1+1"',
    Option4: "2",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Uppercase Method Output",
    description: 'What does the Ruby expression "hello".upcase return?',
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "String Methods",
    Option1: '"Hello"',
    Option2: '"HELLO"',
    Option3: '"hello"',
    Option4: '"HELLO!"',
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "String Length Return Type",
    description: 'What does the Ruby expression "hello".length return?',
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "String Methods",
    Option1: '"5"',
    Option2: "5",
    Option3: "4",
    Option4: "nil",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Strip Method Behavior",
    description:
      'What does the Ruby expression "  hi  ".strip return?',
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "String Methods",
    Option1: '"  hi"',
    Option2: '"hi  "',
    Option3: '"hi"',
    Option4: '"  hi  "',
    CorrectOption: 3,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Reverse Method Output",
    description: 'What does the Ruby expression "abc".reverse return?',
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "String Methods",
    Option1: '"abc"',
    Option2: '"cba"',
    Option3: '"ABC"',
    Option4: '"ab"',
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Interpolation Syntax Identifier",
    description:
      "Which syntax is used for string interpolation inside a double-quoted Ruby string?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "String Interpolation",
    Option1: "%{expr}",
    Option2: "#{expr}",
    Option3: "${expr}",
    Option4: "$(expr)",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "In-Place Mutation Method",
    description:
      "Which operation creates a new String and does NOT modify the original receiver?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "String Mutation and Immutability",
    Option1: "+",
    Option2: "<<",
    Option3: "concat",
    Option4: "[]=",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Format Specifier d",
    description: 'What does the Ruby expression "%d" % 5 return?',
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "String Formatting",
    Option1: '"5.0"',
    Option2: '"5"',
    Option3: "5",
    Option4: '"%d"',
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Downcase Method Output",
    description: 'What does the Ruby expression "Hello".downcase return?',
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "String Methods",
    Option1: '"Hello"',
    Option2: '"HELLO"',
    Option3: '"hello"',
    Option4: '"hELLO"',
    CorrectOption: 3,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Default String Encoding",
    description:
      "In Ruby 3.x, what is the default encoding of string literals in source files?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "String Encoding Basics",
    Option1: "ASCII-8BIT",
    Option2: "UTF-8",
    Option3: "ISO-8859-1",
    Option4: "US-ASCII",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },

  /* ── MEDIUM (6) — at least some snippets ───────────────────── */
  {
    title: "Append Mutation Output",
    description: "What is the output of the following Ruby code?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "String Mutation and Immutability",
    Option1: "abc",
    Option2: "abcd",
    Option3: "abc d",
    Option4: "abcabc",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `s = "abc"
s << "d"
puts s`,
    snippetLang: "ruby",
  },
  {
    title: "Chars Class Identity",
    description: "What is the output of the following Ruby code?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "String Methods",
    Option1: "String",
    Option2: "Array",
    Option3: "Enumerator",
    Option4: "Hash",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `puts "abc".chars.class`,
    snippetLang: "ruby",
  },
  {
    title: "Gsub Substitution Output",
    description: "What is the output of the following Ruby code?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "String Methods",
    Option1: "Herro",
    Option2: "Helro",
    Option3: "Herlo",
    Option4: "Hello",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `puts "Hello".gsub(/l/, "r")`,
    snippetLang: "ruby",
  },
  {
    title: "Format String with Array",
    description: "What is the output of the following Ruby code?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "String Formatting",
    Option1: "Ruby is 30",
    Option2: "%s is %d",
    Option3: "Ruby is 30.0",
    Option4: '["Ruby", 30]',
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `puts "%s is %d" % ["Ruby", 30]`,
    snippetLang: "ruby",
  },
  {
    title: "Plus vs Append Semantics",
    description:
      "Which statement correctly distinguishes + and << for Ruby strings?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "String Mutation and Immutability",
    Option1: "Both create a new string",
    Option2:
      "+ creates a new string; << mutates the receiver in place",
    Option3: "Both mutate the receiver",
    Option4: "+ mutates the receiver; << creates a new string",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Freeze Method Effect",
    description:
      "What does calling String#freeze on a string object do?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "String Mutation and Immutability",
    Option1: "Converts the string to a Symbol",
    Option2: "Prevents further modification of that string object",
    Option3: "Returns a frozen duplicate of the string",
    Option4: "Encrypts the string in place",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },

  /* ── HARD (4) — snippets ───────────────────────────────────── */
  {
    title: "Frozen String Mutation",
    description:
      "What happens when the following Ruby code runs?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "String Mutation and Immutability",
    Option1: 's becomes "Ruby!"',
    Option2: "Raises FrozenError",
    Option3: 's remains "Ruby"',
    Option4: "Raises NoMethodError",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `s = "Ruby"
s.freeze
s << "!"`,
    snippetLang: "ruby",
  },
  {
    title: "Unicode String Length",
    description: "What is the output of the following Ruby code?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "String Encoding Basics",
    Option1: "4",
    Option2: "5",
    Option3: "3",
    Option4: "8",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `puts "café".length`,
    snippetLang: "ruby",
  },
  {
    title: "Dup Isolation Behavior",
    description: "What is the output of the following Ruby code?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "String Mutation and Immutability",
    Option1: "hello",
    Option2: "hello world",
    Option3: "world",
    Option4: "hello hello",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `a = "hello"
b = a.dup
a << " world"
puts b`,
    snippetLang: "ruby",
  },
  {
    title: "String Repetition Output",
    description: "What is the output of the following Ruby code?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "String Methods",
    Option1: "aaa",
    Option2: "a3",
    Option3: "a a a",
    Option4: "3a",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `puts "a" * 3`,
    snippetLang: "ruby",
  },
];

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
