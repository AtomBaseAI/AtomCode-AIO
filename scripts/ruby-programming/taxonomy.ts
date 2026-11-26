/**
 * AtomCode — "Ruby Programming" question group topic taxonomy.
 *
 * Authored from scratch following a standard beginner-to-intermediate Ruby
 * curriculum (20 days, ONE topic per day). Day 1 consolidates intro material
 * (history, install, IRB, running scripts) into a single "Introduction to
 * Ruby" topic.
 *
 * Subtopic lists are the EXACT strings that every question's `subtopic` field
 * must use — do not rename or invent.
 *
 * Day | Topic                                | Curriculum coverage
 * ----+--------------------------------------+---------------------------------------
 *  1  | Introduction to Ruby                 | History, Features, Applications, IRB, Running Ruby Scripts, Ruby vs Other Languages
 *  2  | Ruby Syntax and Data Types          | Variables, Comments, Numbers, Strings, Booleans, Symbols, nil, Type Conversion
 *  3  | Operators                            | Arithmetic, Comparison, Logical, Bitwise, Assignment, Ternary, Range, Spaceship, Precedence
 *  4  | Control Flow                         | if elsif else, unless, case when, Modifier Forms, Ternary
 *  5  | Loops and Iterators                  | while, until, for in, times, upto downto, each, break next redo retry
 *  6  | Methods                              | def, Parameters, Default Arguments, Keyword Arguments, Splat, Return Values, Variable Scope
 *  7  | Arrays                               | Creation, Access, Iteration, Methods, Transformation, Multidimensional Arrays
 *  8  | Hashes                               | Creation, Access, Iteration, Methods, Default Values, Nested Hashes
 *  9  | Strings                              | Interpolation, Methods, Mutation, Formatting, Encoding Basics
 * 10  | Symbols and Ranges                   | Symbols, Ranges Inclusive Exclusive, Iteration on Ranges, Use Cases
 * 11  | Blocks Procs and Lambdas             | yield, block_given, proc vs lambda, ampersand block parameter, Closures
 * 12  | Exception Handling                   | begin rescue else ensure, raise, Custom Exceptions, retry
 * 13  | Modules and Mixins                   | module, Namespacing, include, extend, prepend, Comparable Enumerable
 * 14  | Object-Oriented Programming Basics    | class, instance variables, instance methods, attr_accessor family, initialize, self
 * 15  | Inheritance and Class Design         | Subclassing, super, Method Overriding, Access Modifiers public private protected
 * 16  | Metaprogramming Basics               | send, define_method, method_missing, class_eval, respond_to
 * 17  | File Handling                        | File open, read, write, Modes, foreach, Paths, Dir
 * 18  | Regular Expressions                  | Regexp Literals, match, scan, gsub, Capture Groups, Anchors
 * 19  | Threads and Concurrency              | Thread new, join, Mutex, Queue, Fiber
 * 20  | Gems and Standard Library            | Gemfile, require, Date Time, JSON, YAML, CSV, Benchmark
 */

export interface TopicDef {
  name: string;
  subtopics: string[];
}

export const TOPIC_TAXONOMY: Record<number, TopicDef[]> = {
  1: [
    {
      name: "Introduction to Ruby",
      subtopics: [
        "History and Features of Ruby",
        "Applications of Ruby",
        "Ruby versus Other Languages",
        "Installing and Running Ruby",
        "Interactive Ruby (IRB)",
        "Running Ruby Scripts",
      ],
    },
  ],
  2: [
    {
      name: "Ruby Syntax and Data Types",
      subtopics: [
        "Variables and Assignment",
        "Comments",
        "Numeric Types Integer and Float",
        "Strings",
        "Booleans true and false",
        "nil Value",
        "Symbols",
        "Type Conversion and Coercion",
      ],
    },
  ],
  3: [
    {
      name: "Operators",
      subtopics: [
        "Arithmetic Operators",
        "Comparison Operators",
        "Logical Operators",
        "Bitwise Operators",
        "Assignment Operators",
        "Conditional (Ternary) Operator",
        "Range Operators",
        "Spaceship Operator",
        "Operator Precedence and Associativity",
      ],
    },
  ],
  4: [
    {
      name: "Control Flow",
      subtopics: [
        "if elsif else Statements",
        "unless Statement",
        "case when Statement",
        "Modifier Forms of if and unless",
        "Nested Control Structures",
      ],
    },
  ],
  5: [
    {
      name: "Loops and Iterators",
      subtopics: [
        "while Loop",
        "until Loop",
        "for in Loop",
        "times upto downto Iterators",
        "each Iterator",
        "break next and redo",
      ],
    },
  ],
  6: [
    {
      name: "Methods",
      subtopics: [
        "Defining Methods",
        "Method Parameters",
        "Default Arguments",
        "Keyword Arguments",
        "Splat and Double Splat Arguments",
        "Return Values",
        "Variable Scope",
      ],
    },
  ],
  7: [
    {
      name: "Arrays",
      subtopics: [
        "Array Creation and Initialization",
        "Array Access and Indexing",
        "Array Iteration",
        "Array Methods",
        "Array Transformation",
        "Multidimensional Arrays",
      ],
    },
  ],
  8: [
    {
      name: "Hashes",
      subtopics: [
        "Hash Creation and Initialization",
        "Hash Access",
        "Hash Iteration",
        "Hash Methods",
        "Default Values and Blocks",
        "Nested Hashes",
      ],
    },
  ],
  9: [
    {
      name: "Strings",
      subtopics: [
        "String Interpolation",
        "String Methods",
        "String Mutation and Immutability",
        "String Formatting",
        "String Encoding Basics",
      ],
    },
  ],
  10: [
    {
      name: "Symbols and Ranges",
      subtopics: [
        "Symbols vs Strings",
        "Symbol Use Cases",
        "Inclusive Ranges (..)",
        "Exclusive Ranges (...)",
        "Iteration on Ranges",
        "Range Methods",
      ],
    },
  ],
  11: [
    {
      name: "Blocks Procs and Lambdas",
      subtopics: [
        "Block Syntax do end and Braces",
        "yield and block_given",
        "Procs",
        "Lambdas",
        "Ampersand Block Parameter",
        "Closures and Variable Capture",
      ],
    },
  ],
  12: [
    {
      name: "Exception Handling",
      subtopics: [
        "begin rescue end",
        "else and ensure Clauses",
        "raise and re-raise",
        "Custom Exception Classes",
        "retry",
      ],
    },
  ],
  13: [
    {
      name: "Modules and Mixins",
      subtopics: [
        "Defining Modules",
        "Namespacing with Modules",
        "include Mixin",
        "extend Mixin",
        "prepend Mixin",
        "Comparable and Enumerable Mixins",
      ],
    },
  ],
  14: [
    {
      name: "Object-Oriented Programming Basics",
      subtopics: [
        "Defining Classes",
        "Instance Variables",
        "Instance Methods",
        "attr_accessor Family",
        "Constructor (initialize)",
        "self Keyword",
      ],
    },
  ],
  15: [
    {
      name: "Inheritance and Class Design",
      subtopics: [
        "Single Inheritance",
        "Subclassing with Less-Than",
        "super Keyword",
        "Method Overriding",
        "Access Modifiers public private protected",
        "Class Variables and Class Methods",
      ],
    },
  ],
  16: [
    {
      name: "Metaprogramming Basics",
      subtopics: [
        "send Method",
        "define_method",
        "method_missing",
        "class_eval and instance_eval",
        "respond_to",
      ],
    },
  ],
  17: [
    {
      name: "File Handling",
      subtopics: [
        "File.open and File.new",
        "Reading from Files",
        "Writing to Files",
        "File Modes r w a",
        "File.foreach and File.readlines",
        "Directory Operations with Dir",
      ],
    },
  ],
  18: [
    {
      name: "Regular Expressions",
      subtopics: [
        "Regexp Literals",
        "match Method",
        "scan Method",
        "gsub and sub Methods",
        "Capture Groups",
        "Anchors and Quantifiers",
      ],
    },
  ],
  19: [
    {
      name: "Threads and Concurrency",
      subtopics: [
        "Creating Threads",
        "Thread Joining and Lifecycle",
        "Mutex and Synchronization",
        "Queue for Thread Communication",
        "Fibers",
      ],
    },
  ],
  20: [
    {
      name: "Gems and Standard Library",
      subtopics: [
        "Gemfile and Bundler",
        "require and load",
        "Date and Time Classes",
        "JSON Module",
        "YAML Module",
        "CSV Module",
        "Benchmark Module",
      ],
    },
  ],
};

export const GROUP_TITLE = "Ruby Programming";

/**
 * Ruby-language judge URL — the core AtomCode Lambda (shared with Python, JS,
 * TS, SQL). Falls back to env vars if set.
 */
export const RUBY_JUDGE_URL =
  process.env.RUBY_LAMBDA_URL ||
  (process.env.LAMBDA_JUDGE_URLS
    ? JSON.parse(process.env.LAMBDA_JUDGE_URLS)["ruby"]
    : undefined) ||
  "https://yqcl2o7hrmikctiifbd2pzplky0cxglk.lambda-url.ap-south-1.on.aws/";
