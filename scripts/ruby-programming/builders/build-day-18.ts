import { writeFileSync } from "node:fs";

const DAY = 18;
const TOPIC = "Regular Expressions";
const SUBTOPICS = [
  "Regexp Literals",
  "match Method",
  "scan Method",
  "gsub and sub Methods",
  "Capture Groups",
  "Anchors and Quantifiers",
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
    title: "Match Digit at Start",
    description:
      "Determine if a string begins with a digit.\n\nInput Format:\nLine 1: a string.\n\nOutput Format:\n`YES` if the string starts with a digit, else `NO`.\n\nConstraints:\nString length 1..100, printable ASCII.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Anchors and Quantifiers",
    sampleinput1: "5 apples",
    sampleoutput1: "YES",
    sampleinput2: "apples 5",
    sampleoutput2: "NO",
    input1: "1st place",
    output1: "YES",
    input2: "no digits here",
    output2: "NO",
    input3: "9 lives",
    output3: "YES",
    inputconstrains: "String length 1..100, printable ASCII",
    blacklist: "",
    whitelist: "",
    sourcecode: `s = gets.chomp
puts s =~ /^\\d/ ? "YES" : "NO"
`,
  },
  {
    title: "Count Vowels via Scan",
    description:
      "Count the number of vowels (a, e, i, o, u, case-insensitive) in a string using `scan`.\n\nInput Format:\nLine 1: a string.\n\nOutput Format:\nThe integer count of vowels.\n\nConstraints:\nString length 1..200, printable ASCII.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "scan Method",
    sampleinput1: "Hello World",
    sampleoutput1: "3",
    sampleinput2: "Ruby Programming",
    sampleoutput2: "4",
    input1: "aeiou",
    output1: "5",
    input2: "xyz",
    output2: "0",
    input3: "The quick brown fox",
    output3: "5",
    inputconstrains: "String length 1..200, printable ASCII",
    blacklist: "",
    whitelist: "",
    sourcecode: `s = gets.chomp
puts s.scan(/[aeiou]/i).size
`,
  },
  {
    title: "Replace Digits with X",
    description:
      "Replace every digit in a string with the character `X` using `gsub`.\n\nInput Format:\nLine 1: a string.\n\nOutput Format:\nThe string with all digits replaced by `X`.\n\nConstraints:\nString length 1..200, printable ASCII.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "gsub and sub Methods",
    sampleinput1: "abc123def45",
    sampleoutput1: "abcXXXdefXX",
    sampleinput2: "no digits",
    sampleoutput2: "no digits",
    input1: "phone 555-1234",
    output1: "phone XXX-XXXX",
    input2: "100 percent",
    output2: "XXX percent",
    input3: "a1b2c3",
    output3: "aXbXcX",
    inputconstrains: "String length 1..200, printable ASCII",
    blacklist: "",
    whitelist: "",
    sourcecode: `s = gets.chomp
puts s.gsub(/\\d/, "X")
`,
  },
  {
    title: "Extract First Number",
    description:
      "Extract the first sequence of digits from a string using `match`. If no digits exist, print `NONE`.\n\nInput Format:\nLine 1: a string.\n\nOutput Format:\nThe first digit sequence, or `NONE`.\n\nConstraints:\nString length 1..200, printable ASCII.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "match Method",
    sampleinput1: "Order 42 shipped on day 7",
    sampleoutput1: "42",
    sampleinput2: "No digits at all",
    sampleoutput2: "NONE",
    input1: "abc 999 xyz",
    output1: "999",
    input2: "phone 555-1234",
    output2: "555",
    input3: "nope",
    output3: "NONE",
    inputconstrains: "String length 1..200, printable ASCII",
    blacklist: "",
    whitelist: "",
    sourcecode: `s = gets.chomp
m = s.match(/\\d+/)
puts m ? m[0] : "NONE"
`,
  },
  {
    title: "Has Letter Anchor",
    description:
      "Determine if a string contains at least one letter (a-z, case-insensitive).\n\nInput Format:\nLine 1: a string.\n\nOutput Format:\n`YES` if at least one letter exists, else `NO`.\n\nConstraints:\nString length 1..200, printable ASCII.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Regexp Literals",
    sampleinput1: "12345",
    sampleoutput1: "NO",
    sampleinput2: "123a45",
    sampleoutput2: "YES",
    input1: "abc",
    output1: "YES",
    input2: "1!2@3#",
    output2: "NO",
    input3: "Hello",
    output3: "YES",
    inputconstrains: "String length 1..200, printable ASCII",
    blacklist: "",
    whitelist: "",
    sourcecode: `s = gets.chomp
puts /[a-z]/i =~ s ? "YES" : "NO"
`,
  },
  {
    title: "Replace Whitespace With Underscore",
    description:
      "Replace every whitespace character (space or tab) in a string with `_` using `gsub`.\n\nInput Format:\nLine 1: a string.\n\nOutput Format:\nThe string with each whitespace char replaced by `_`.\n\nConstraints:\nString length 1..200, printable ASCII.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "gsub and sub Methods",
    sampleinput1: "hello world",
    sampleoutput1: "hello_world",
    sampleinput2: "a b c",
    sampleoutput2: "a_b_c",
    input1: "no spaces",
    output1: "no_spaces",
    input2: "single",
    output2: "single",
    input3: "one two three",
    output3: "one_two_three",
    inputconstrains: "String length 1..200, printable ASCII",
    blacklist: "",
    whitelist: "",
    sourcecode: `s = gets.chomp
puts s.gsub(/\\s/, "_")
`,
  },

  // ===== EASY SCENARIO (4) =====
  {
    title: "Email Masker",
    description:
      "A privacy tool masks the local part of an email address: keep the first and last character, replace the middle with `***`. Read an email, capture the local and domain parts, print the masked email. If the input is not a valid email (no single `@`), print `INVALID`.\n\nInput Format:\nLine 1: an email address.\n\nOutput Format:\n`<first>***<last>@<domain>` or `INVALID`.\n\nConstraints:\nInput length 1..100, printable ASCII.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Capture Groups",
    sampleinput1: "alice@example.com",
    sampleoutput1: "a***e@example.com",
    sampleinput2: "bob@site.org",
    sampleoutput2: "b***b@site.org",
    input1: "charlie@school.edu",
    output1: "c***e@school.edu",
    input2: "not an email",
    output2: "INVALID",
    input3: "x@y.io",
    output3: "x***x@y.io",
    inputconstrains: "Input length 1..100, printable ASCII",
    blacklist: "",
    whitelist: "",
    sourcecode: `email = gets.chomp
if email =~ /^([^@]+)@([^@]+)$/
  local = $1
  domain = $2
  masked = local[0] + "***" + local[-1] + "@" + domain
  puts masked
else
  puts "INVALID"
end
`,
  },
  {
    title: "Phone Number Validator",
    description:
      "Validate a US-style phone number against the pattern `NNN-NNN-NNNN` (three digits, dash, three digits, dash, four digits).\n\nInput Format:\nLine 1: a phone number string.\n\nOutput Format:\n`VALID` if it matches exactly, else `INVALID`.\n\nConstraints:\nInput length 1..50, printable ASCII.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Anchors and Quantifiers",
    sampleinput1: "123-456-7890",
    sampleoutput1: "VALID",
    sampleinput2: "12-345-67890",
    sampleoutput2: "INVALID",
    input1: "000-000-0000",
    output1: "VALID",
    input2: "555-123-4567 extra",
    output2: "INVALID",
    input3: "987-654-3210",
    output3: "VALID",
    inputconstrains: "Input length 1..50, printable ASCII",
    blacklist: "",
    whitelist: "",
    sourcecode: `s = gets.chomp
puts s =~ /^\\d{3}-\\d{3}-\\d{4}$/ ? "VALID" : "INVALID"
`,
  },
  {
    title: "Hashtag Extractor",
    description:
      "A social-media tool extracts hashtags (a `#` followed by word characters) from a tweet. Print each hashtag on its own line in order of appearance. If none, print `(none)`.\n\nInput Format:\nLine 1: a tweet string.\n\nOutput Format:\nOne hashtag per line, or `(none)`.\n\nConstraints:\nString length 1..200, printable ASCII.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "scan Method",
    sampleinput1: "loving #ruby and #coding today",
    sampleoutput1: "#ruby\n#coding",
    sampleinput2: "no tags here",
    sampleoutput2: "(none)",
    input1: "#a #b #c",
    output1: "#a\n#b\n#c",
    input2: "hello #world",
    output2: "#world",
    input3: "plain text only",
    output3: "(none)",
    inputconstrains: "String length 1..200, printable ASCII",
    blacklist: "",
    whitelist: "",
    sourcecode: `s = gets.chomp
tags = s.scan(/#\\w+/)
if tags.empty?
  puts "(none)"
else
  tags.each { |t| puts t }
end
`,
  },
  {
    title: "Snake to Camel Converter",
    description:
      "A code formatter converts `snake_case` identifiers to `camelCase`. Replace each `_<letter>` with the uppercase form of the letter.\n\nInput Format:\nLine 1: a snake_case identifier (lowercase letters and underscores).\n\nOutput Format:\nThe camelCase version.\n\nConstraints:\nLength 1..50, lowercase letters and underscores only.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "gsub and sub Methods",
    sampleinput1: "hello_world",
    sampleoutput1: "helloWorld",
    sampleinput2: "user_id_token",
    sampleoutput2: "userIdToken",
    input1: "single",
    output1: "single",
    input2: "a_b_c",
    output2: "aBC",
    input3: "max_retries",
    output3: "maxRetries",
    inputconstrains: "Length 1..50, lowercase letters and underscores only",
    blacklist: "",
    whitelist: "",
    sourcecode: `s = gets.chomp
result = s.gsub(/_([a-z])/) { $1.upcase }
puts result
`,
  },

  // ===== MEDIUM SCENARIO (6) =====
  {
    title: "Extract All Numbers Sum",
    description:
      "A log parser extracts all integers (including negative) from a free-text line and prints their sum using `scan`.\n\nInput Format:\nLine 1: a string that may contain integers.\n\nOutput Format:\nThe integer sum of all integers found.\n\nConstraints:\nString length 1..200; integers in range -100000..100000; at least one integer present.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "scan Method",
    sampleinput1: "abc 10 def 20 ghi -5",
    sampleoutput1: "25",
    sampleinput2: "lost -100 gained 50",
    sampleoutput2: "-50",
    input1: "values 1 2 3 4 5",
    output1: "15",
    input2: "balance is -42 today",
    output2: "-42",
    input3: "items 100 200 300",
    output3: "600",
    inputconstrains: "String length 1..200; integers in range -100000..100000; at least one integer present",
    blacklist: "match, gsub, sub",
    whitelist: "scan",
    sourcecode: `s = gets.chomp
nums = s.scan(/-?\\d+/).map(&:to_i)
puts nums.sum
`,
  },
  {
    title: "First Match Capture Report",
    description:
      "A configuration line has the format `name=NAME age=AGE`. Use `match` to capture NAME and AGE, and print `Name: NAME, Age: AGE`. If the input does not match, print `No match`.\n\nInput Format:\nLine 1: a configuration string.\n\nOutput Format:\n`Name: NAME, Age: AGE` or `No match`.\n\nConstraints:\nString length 1..100; NAME is letters only; AGE is digits only.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "match Method",
    sampleinput1: "name=alice age=30",
    sampleoutput1: "Name: alice, Age: 30",
    sampleinput2: "name=bob age=25",
    sampleoutput2: "Name: bob, Age: 25",
    input1: "name=charlie age=42",
    output1: "Name: charlie, Age: 42",
    input2: "nothing useful here",
    output2: "No match",
    input3: "name=dana age=18",
    output3: "Name: dana, Age: 18",
    inputconstrains: "String length 1..100; NAME is letters only; AGE is digits only",
    blacklist: "scan, gsub, sub",
    whitelist: "match",
    sourcecode: `s = gets.chomp
m = s.match(/name=(\\w+) age=(\\d+)/)
if m
  puts "Name: #{m[1]}, Age: #{m[2]}"
else
  puts "No match"
end
`,
  },
  {
    title: "Redact Email Pattern",
    description:
      "A redaction tool replaces email-like substrings with `[REDACTED]`. Use `gsub` to replace any pattern of `word.word@word.word` form (where word is `[\\w.]+`).\n\nInput Format:\nLine 1: a string.\n\nOutput Format:\nThe string with emails replaced by `[REDACTED]`.\n\nConstraints:\nString length 1..200, printable ASCII.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "gsub and sub Methods",
    sampleinput1: "Contact: alice@example.com or bob@site.org",
    sampleoutput1: "Contact: [REDACTED] or [REDACTED]",
    sampleinput2: "no emails here",
    sampleoutput2: "no emails here",
    input1: "Email: admin@shop.io end",
    output1: "Email: [REDACTED] end",
    input2: "single x@y.io ok",
    output2: "single [REDACTED] ok",
    input3: "a@b.io c@d.io e@f.io",
    output3: "[REDACTED] [REDACTED] [REDACTED]",
    inputconstrains: "String length 1..200, printable ASCII",
    blacklist: "scan, match, .sub",
    whitelist: "gsub",
    sourcecode: `puts gets.chomp.gsub(/[\\w.]+@[\\w.]+/, "[REDACTED]")
`,
  },
  {
    title: "Domain Extractor From URL",
    description:
      "A web crawler extracts the domain from a URL. Read a URL of the form `http(s)://domain/path...` and print only the domain (the host). If the URL is invalid (does not start with `http://` or `https://`), print `INVALID`. Use `=~` with capture groups.\n\nInput Format:\nLine 1: a URL string.\n\nOutput Format:\nThe domain, or `INVALID`.\n\nConstraints:\nString length 1..200, printable ASCII.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Capture Groups",
    sampleinput1: "https://example.com/path",
    sampleoutput1: "example.com",
    sampleinput2: "http://test.org",
    sampleoutput2: "test.org",
    input1: "https://shop.io/items/1",
    output1: "shop.io",
    input2: "ftp://not-http.com",
    output2: "INVALID",
    input3: "https://api.site.com/v1",
    output3: "api.site.com",
    inputconstrains: "String length 1..200, printable ASCII",
    blacklist: "scan, gsub, split",
    whitelist: "=~, $1",
    sourcecode: `url = gets.chomp
if url =~ %r{https?://([^/]+)}
  puts $1
else
  puts "INVALID"
end
`,
  },
  {
    title: "Count Words Starting With Letter A",
    description:
      "A text analyzer counts how many whole words start with the letter `a` (case-insensitive) using a word-boundary anchor. Words consist of word characters only.\n\nInput Format:\nLine 1: a sentence string.\n\nOutput Format:\nThe integer count of words starting with `a`.\n\nConstraints:\nString length 1..200, printable ASCII.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Anchors and Quantifiers",
    sampleinput1: "An apple a day keeps a doctor away",
    sampleoutput1: "5",
    sampleinput2: "no matches here",
    sampleoutput2: "0",
    input1: "Ants and aphids",
    output1: "3",
    input2: "bananas only",
    output2: "0",
    input3: "Aardvark ate avocado",
    output3: "3",
    inputconstrains: "String length 1..200, printable ASCII",
    blacklist: "match, gsub, .sub, split",
    whitelist: "scan, \\b",
    sourcecode: `s = gets.chomp
words = s.scan(/\\ba\\w*/i)
puts words.size
`,
  },
  {
    title: "Capitalize First Letter Regex",
    description:
      "A formatter capitalizes only the first letter of a sentence (if it is lowercase a-z). Use `sub` with a regex anchored at the start. Non-lowercase first characters should be left unchanged.\n\nInput Format:\nLine 1: a sentence string.\n\nOutput Format:\nThe sentence with the first lowercase letter (if any) uppercased.\n\nConstraints:\nString length 1..200, printable ASCII.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Regexp Literals",
    sampleinput1: "hello world",
    sampleoutput1: "Hello world",
    sampleinput2: "ruby is fun",
    sampleoutput2: "Ruby is fun",
    input1: "Already Capital",
    output1: "Already Capital",
    input2: "1 starts with digit",
    output2: "1 starts with digit",
    input3: "no change needed?",
    output3: "No change needed?",
    inputconstrains: "String length 1..200, printable ASCII",
    blacklist: "scan, match, gsub",
    whitelist: "sub, ^",
    sourcecode: `s = gets.chomp
puts s.sub(/^[a-z]/) { |c| c.upcase }
`,
  },

  // ===== HARD SCENARIO (4) =====
  {
    title: "Log Pattern Extractor Multi-Capture",
    description:
      "A log line has the format `[timestamp] LEVEL message`. Read n log lines. For each, capture LEVEL and message using `=~` with two capture groups. Print `LEVEL: message`. Lines that do not match the pattern print `INVALID`.\n\nInput Format:\nLine 1: integer n. Lines 2..n+1: log lines.\n\nOutput Format:\nn lines, each `LEVEL: message` or `INVALID`.\n\nConstraints:\n1 <= n <= 50; LEVEL is uppercase letters only; message length 1..100.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Capture Groups",
    sampleinput1: "2\n[2024-01-01] INFO Server started\n[2024-01-01] ERROR Disk full",
    sampleoutput1: "INFO: Server started\nERROR: Disk full",
    sampleinput2: "1\n[2024-02-02] WARN Slow response",
    sampleoutput2: "WARN: Slow response",
    input1: "3\n[t1] A alpha\n[t2] B beta\n[t3] C gamma",
    output1: "A: alpha\nB: beta\nC: gamma",
    input2: "1\ninvalid log line",
    output2: "INVALID",
    input3: "2\n[t] DEBUG tracing call\n[t] INFO ok",
    output3: "DEBUG: tracing call\nINFO: ok",
    inputconstrains: "1 <= n <= 50; LEVEL is uppercase letters only; message length 1..100",
    blacklist: "scan, gsub, sub",
    whitelist: "=~, $1, $2",
    sourcecode: `n = gets.to_i
n.times do
  line = gets.chomp
  if line =~ /^\\[[^\\]]+\\] (\\w+) (.+)$/
    puts "#{$1}: #{$2}"
  else
    puts "INVALID"
  end
end
`,
  },
  {
    title: "Replace Repeated Words",
    description:
      "A text cleaner collapses consecutive duplicate words (e.g., `the the cat sat sat`) into a single occurrence (e.g., `the cat sat`). Use `gsub` with a backreference. Match whole-word duplicates separated by whitespace.\n\nInput Format:\nLine 1: a sentence string.\n\nOutput Format:\nThe sentence with consecutive duplicate words collapsed.\n\nConstraints:\nString length 1..200, printable ASCII.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "gsub and sub Methods",
    sampleinput1: "the the cat sat sat on mat",
    sampleoutput1: "the cat sat on mat",
    sampleinput2: "hello world world",
    sampleoutput2: "hello world",
    input1: "no no duplicates",
    output1: "no duplicates",
    input2: "foo foo foo bar",
    output2: "foo foo bar",
    input3: "a a b b c c",
    output3: "a b c",
    inputconstrains: "String length 1..200, printable ASCII",
    blacklist: "scan, match, split",
    whitelist: "gsub, \\1",
    sourcecode: `puts gets.chomp.gsub(/\\b(\\w+)\\s+\\1\\b/, '\\1')
`,
  },
  {
    title: "Hex Color Codes Extractor",
    description:
      "A CSS preprocessor extracts hex color codes of the form `#RGB` (3 hex digits) or `#RRGGBB` (6 hex digits) from a style string. Use `scan`. Print each match on its own line; if none, print `(none)`.\n\nInput Format:\nLine 1: a CSS-like string.\n\nOutput Format:\nOne color per line, or `(none)`.\n\nConstraints:\nString length 1..200, printable ASCII.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "scan Method",
    sampleinput1: "colors: #fff and #a1b2c3 end",
    sampleoutput1: "#fff\n#a1b2c3",
    sampleinput2: "no colors here",
    sampleoutput2: "(none)",
    input1: "btn { color: #abc; bg: #112233; }",
    output1: "#abc\n#112233",
    input2: "border #000 dashed",
    output2: "#000",
    input3: "just text",
    output3: "(none)",
    inputconstrains: "String length 1..200, printable ASCII",
    blacklist: "match, gsub, .sub, split",
    whitelist: "scan, [0-9a-fA-F]",
    sourcecode: `s = gets.chomp
hexes = s.scan(/#[0-9a-fA-F]{3,6}\\b/)
if hexes.empty?
  puts "(none)"
else
  hexes.each { |h| puts h }
end
`,
  },
  {
    title: "Password Strength Validator",
    description:
      "A password policy requires: length at least 8; at least one letter; at least one digit; at least one special character from `@#$%`. Use `=~` checks (no scan/match/gsub/sub) to validate. Print `STRONG` if all four conditions are met, else `WEAK`.\n\nInput Format:\nLine 1: a password string.\n\nOutput Format:\n`STRONG` or `WEAK`.\n\nConstraints:\nPassword length 1..50, printable ASCII.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "ruby",
    topic: TOPIC,
    subtopic: "Anchors and Quantifiers",
    sampleinput1: "abc1234@",
    sampleoutput1: "STRONG",
    sampleinput2: "short1",
    sampleoutput2: "WEAK",
    input1: "P@ssw0rd",
    output1: "STRONG",
    input2: "allletters",
    output2: "WEAK",
    input3: "12345678",
    output3: "WEAK",
    inputconstrains: "Password length 1..50, printable ASCII",
    blacklist: "scan, gsub, .sub, match",
    whitelist: "=~, $",
    sourcecode: `pw = gets.chomp
has_letter = pw =~ /[A-Za-z]/
has_digit = pw =~ /\\d/
has_special = pw =~ /[@#$%]/
has_length = pw =~ /^.{8,}$/
if has_letter && has_digit && has_special && has_length
  puts "STRONG"
else
  puts "WEAK"
end
`,
  },
];

const mcqs: MCQ[] = [
  // ===== EASY (10) =====
  {
    title: "Regexp Literal Syntax",
    description: "Which of these is a valid Ruby regexp literal?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Regexp Literals",
    Option1: "/pattern/",
    Option2: '"pattern".regex',
    Option3: "re(pattern)",
    Option4: 'Regexp("pattern") only (no literal form)',
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Match Method Returns MatchData",
    description:
      "When a `Regexp#match` call succeeds, what type of object does it return?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "match Method",
    Option1: "A MatchData object",
    Option2: "An Integer position",
    Option3: "A String",
    Option4: "true",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Scan Returns Array",
    description: "What does the following snippet print?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "scan Method",
    Option1: '["1", "2", "3"]',
    Option2: '"123"',
    Option3: "3",
    Option4: "nil",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `puts "a1 b2 c3".scan(/\\d/).inspect
`,
    snippetLang: "ruby",
  },
  {
    title: "Gsub Replaces All",
    description: "What does the following snippet print?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "gsub and sub Methods",
    Option1: "a+b+c",
    Option2: "a+b-c",
    Option3: "a-b-c",
    Option4: "a+b+c-",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `puts "a-b-c".gsub(/-/, "+")
`,
    snippetLang: "ruby",
  },
  {
    title: "Sub Replaces First Only",
    description: "What does the following snippet print?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "gsub and sub Methods",
    Option1: "a+b-c",
    Option2: "a+b+c",
    Option3: "a-b-c",
    Option4: "+b-c",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `puts "a-b-c".sub(/-/, "+")
`,
    snippetLang: "ruby",
  },
  {
    title: "Capture Group Dollar One",
    description: 'After `"hello" =~ /l(l)/`, what does `$1` contain?',
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Capture Groups",
    Option1: 'The captured letter "l" (contents of group 1)',
    Option2: 'The whole match "ll"',
    Option3: "nil",
    Option4: "The match position 2",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Anchor Caret Start of Line",
    description:
      "In a Ruby regexp, the `^` anchor matches...",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Anchors and Quantifiers",
    Option1: "The start of a line",
    Option2: "The start of the string only (never a line)",
    Option3: "The end of the string",
    Option4: "Negation of the next character",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Quantifier Plus Meaning",
    description:
      "In a Ruby regexp, what does the `+` quantifier mean?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Anchors and Quantifiers",
    Option1: "One or more occurrences of the preceding pattern",
    Option2: "Zero or more occurrences",
    Option3: "Zero or one occurrence",
    Option4: "Exactly one occurrence",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Anchor Dollar End Match",
    description: "What does the following snippet print?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Anchors and Quantifiers",
    Option1: "yes",
    Option2: "no",
    Option3: "true",
    Option4: "Error",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `puts "hello" =~ /o$/ ? "yes" : "no"
`,
    snippetLang: "ruby",
  },
  {
    title: "Digit Class Shorthand",
    description: "Which regexp matches a single decimal digit?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Regexp Literals",
    Option1: "/\\d/",
    Option2: "/\\D/",
    Option3: "/\\s/",
    Option4: "/\\w/",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },

  // ===== MEDIUM (6) =====
  {
    title: "Named Capture Syntax",
    description: "Which regexp uses a NAMED capture group?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Capture Groups",
    Option1: "/(?<name>\\w+)/",
    Option2: "/(\\w+:name)/",
    Option3: "/\\w+ > name/",
    Option4: "/:name(\\w+)/",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Gsub Block With Match",
    description: "What does the following snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "gsub and sub Methods",
    Option1: "abc246",
    Option2: "abc123",
    Option3: "abc123123",
    Option4: "abc264",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `puts "abc123".gsub(/\\d/) { |d| d.to_i * 2 }
`,
    snippetLang: "ruby",
  },
  {
    title: "MatchData Index Access",
    description: "What does the following snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "match Method",
    Option1: "01",
    Option2: "2024",
    Option3: "15",
    Option4: "2024-01-15",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `m = "2024-01-15".match(/(\\d+)-(\\d+)-(\\d+)/)
puts m[2]
`,
    snippetLang: "ruby",
  },
  {
    title: "Quantifier Range Match",
    description: "What does the following snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Anchors and Quantifiers",
    Option1: "1",
    Option2: "2",
    Option3: "4",
    Option4: "0",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `puts "aaaa".scan(/a{2,3}/).size
`,
    snippetLang: "ruby",
  },
  {
    title: "Word Boundary Match Count",
    description: "What does the following snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Anchors and Quantifiers",
    Option1: "1",
    Option2: "2",
    Option3: "3",
    Option4: "0",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `puts "cat catalog catch".scan(/\\bcat\\b/).size
`,
    snippetLang: "ruby",
  },
  {
    title: "Sub Returns New String",
    description: "What does the following snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "gsub and sub Methods",
    Option1: "hello\\nheLlo",
    Option2: "heLlo\\nheLlo",
    Option3: "hello\\nhello",
    Option4: "HeLlo\\nHeLlo",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `s = "hello"
t = s.sub(/l/, "L")
puts s
puts t
`,
    snippetLang: "ruby",
  },

  // ===== HARD (4) =====
  {
    title: "Backreference in Gsub",
    description: "What does the following snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "gsub and sub Methods",
    Option1: "the cat",
    Option2: "the the cat",
    Option3: "cat",
    Option4: "the the",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `puts "the the cat".gsub(/\\b(\\w+)\\s+\\1\\b/, '\\1')
`,
    snippetLang: "ruby",
  },
  {
    title: "Scan With Capture Groups",
    description: "What does the following snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "scan Method",
    Option1: '[["a", "1"], ["b", "2"], ["c", "3"]]',
    Option2: '["a=1", "b=2", "c=3"]',
    Option3: '[["a", "1", "b", "2", "c", "3"]]',
    Option4: '["a", "b", "c"]',
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `puts "a=1 b=2 c=3".scan(/(\\w)=(\\d)/).inspect
`,
    snippetLang: "ruby",
  },
  {
    title: "Match Tilde Returns Position",
    description: "What does the following snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "match Method",
    Option1: "6",
    Option2: "0",
    Option3: "world",
    Option4: "true",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `puts "hello world" =~ /world/
`,
    snippetLang: "ruby",
  },
  {
    title: "Named Capture Local Variable",
    description: "What does the following snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Capture Groups",
    Option1: "2024",
    Option2: "01",
    Option3: "15",
    Option4: "Error",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `"2024-01-15" =~ /(?<year>\\d+)-(?<month>\\d+)-(?<day>\\d+)/
puts year
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
