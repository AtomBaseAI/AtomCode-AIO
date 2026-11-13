/**
 * AtomCode — "PYTHON Programming" question group topic taxonomy.
 *
 * Derived from the uploaded curriculum PDF (PYTHON Programming.pdf, ATOM CODE):
 * 20 days, ONE topic per day. Subtopic lists are the EXACT strings that every
 * question's `subtopic` field must use — do not rename or invent.
 *
 * Day | Topic                          | PDF Practical Exercise covered
 * ----+--------------------------------+---------------------------------------
 *  1  | Introduction to Python         | History and Use Cases, Versions, Python 2 vs Python 3
 *  2  | Python Syntax and Data Types   | Scripts, Indentation, Comments, int/float/str/bool, Type Casting
 *  3  | Operators                      | Arithmetic, Relational, Logical, Bitwise, Assignment, Membership, Identity, Ternary, Precedence
 *  4  | Control Flow (if-else)         | if-else Statements, Nested Control Structures
 *  5  | Loops                          | for and while Loops
 *  6  | Functions and Lambda           | Defining Functions, Default/Keyword Arguments, lambda
 *  7  | Lists and Tuples               | Creating and Manipulating Lists, List Methods, Tuples and Immutability
 *  8  | Dictionaries and Sets          | Creating Dictionaries, Key-Value Pairs, Set Operations
 *  9  | String Manipulation            | f-strings, format, String Methods and Slicing
 *  10 | Error Handling and Exceptions  | try-except, finally, Raising Exceptions, Custom Exceptions
 *  11 | Modules and Packages           | Creating and Importing Modules, __name__ == '__main__'
 *  12 | Comprehensions                 | List, Set, Dictionary Comprehension
 *  13 | Object-Oriented Programming    | Classes, Objects, Constructors, Encapsulation, Access Modifiers
 *  14 | Inheritance                    | Inheritance Types
 *  15 | Polymorphism                   | Method Overriding, super()
 *  16 | Decorators and Generators      | Decorators, Generators
 *  17 | Working with Dates and Times   | datetime Module, Formatting Dates and Times
 *  18 | Regular Expressions            | re Module for Pattern Matching, Extracting Data with Regex
 *  19 | Multithreading and Concurrency | Creating Threads, Synchronizing Threads, async/await
 *  20 | File Handling                  | Reading/Writing Files, File Modes and Errors
 */

export interface TopicDef {
  name: string;
  subtopics: string[];
}

export const TOPIC_TAXONOMY: Record<number, TopicDef[]> = {
  1: [
    {
      name: "Introduction to Python",
      subtopics: [
        "History and Use Cases of Python",
        "Python Versions",
        "Python 2 vs Python 3",
        "Setting Up and Running Python",
      ],
    },
  ],
  2: [
    {
      name: "Python Syntax and Data Types",
      subtopics: [
        "Writing and Running Python Scripts",
        "Indentation Rules",
        "Comments",
        "Variables and Assignment",
        "Numeric Types int and float",
        "Strings and Booleans",
        "Type Casting",
      ],
    },
  ],
  3: [
    {
      name: "Operators",
      subtopics: [
        "Arithmetic Operators",
        "Relational (Comparison) Operators",
        "Logical Operators",
        "Bitwise Operators",
        "Assignment Operators",
        "Membership and Identity Operators",
        "Conditional (Ternary) Operator",
        "Operator Precedence and Associativity",
      ],
    },
  ],
  4: [
    {
      name: "Control Flow (if-else)",
      subtopics: [
        "if Statement",
        "if-else Statement",
        "elif Ladder",
        "Nested Control Structures",
      ],
    },
  ],
  5: [
    {
      name: "Loops",
      subtopics: [
        "for Loop",
        "while Loop",
        "range Function",
        "break and continue",
        "Nested Loops",
        "else Clause with Loops",
      ],
    },
  ],
  6: [
    {
      name: "Functions and Lambda",
      subtopics: [
        "Defining Functions",
        "Parameters and Arguments",
        "Default Arguments",
        "Keyword Arguments",
        "Return Values",
        "Anonymous Functions (lambda)",
      ],
    },
  ],
  7: [
    {
      name: "Lists and Tuples",
      subtopics: [
        "Creating and Manipulating Lists",
        "List Methods",
        "List Slicing",
        "Creating and Using Tuples",
        "Tuple Immutability",
        "Packing and Unpacking",
      ],
    },
  ],
  8: [
    {
      name: "Dictionaries and Sets",
      subtopics: [
        "Creating Dictionaries",
        "Dictionary Methods",
        "Working with Key-Value Pairs",
        "Creating Sets",
        "Set Operations",
      ],
    },
  ],
  9: [
    {
      name: "String Manipulation",
      subtopics: [
        "f-string Formatting",
        "str.format Method",
        "String Methods",
        "String Slicing",
        "String Immutability and Iteration",
      ],
    },
  ],
  10: [
    {
      name: "Error Handling and Exceptions",
      subtopics: [
        "try-except Blocks",
        "Multiple and Specific except Clauses",
        "finally Clause",
        "Raising Exceptions",
        "Custom Exceptions",
      ],
    },
  ],
  11: [
    {
      name: "Modules and Packages",
      subtopics: [
        "Creating and Importing Modules",
        "Standard Library Modules",
        "The __name__ Variable",
        "Packages and Module Search Path",
      ],
    },
  ],
  12: [
    {
      name: "Comprehensions",
      subtopics: [
        "List Comprehension",
        "Conditional List Comprehension",
        "Set Comprehension",
        "Dictionary Comprehension",
        "Nested Comprehensions",
      ],
    },
  ],
  13: [
    {
      name: "Object-Oriented Programming (OOP)",
      subtopics: [
        "Classes and Objects",
        "Constructors (__init__)",
        "Instance Attributes and Methods",
        "Encapsulation",
        "Access Modifiers and Name Mangling",
      ],
    },
  ],
  14: [
    {
      name: "Inheritance",
      subtopics: [
        "Single Inheritance",
        "Multilevel Inheritance",
        "Multiple Inheritance",
        "Hierarchical Inheritance",
        "Method Resolution Order (MRO)",
      ],
    },
  ],
  15: [
    {
      name: "Polymorphism",
      subtopics: [
        "Method Overriding",
        "super() Function",
        "Duck Typing",
        "Operator Overloading (Magic Methods)",
      ],
    },
  ],
  16: [
    {
      name: "Decorators and Generators",
      subtopics: [
        "Creating Decorators",
        "Decorators with Arguments",
        "Generator Functions",
        "yield Keyword and Lazy Evaluation",
        "Generator Expressions",
      ],
    },
  ],
  17: [
    {
      name: "Working with Dates and Times",
      subtopics: [
        "datetime Module Basics",
        "date and time Objects",
        "Formatting with strftime",
        "Parsing with strptime",
        "timedelta Arithmetic",
      ],
    },
  ],
  18: [
    {
      name: "Regular Expressions",
      subtopics: [
        "re Module Basics",
        "Pattern Matching with search and match",
        "findall and finditer",
        "Character Classes and Quantifiers",
        "Grouping and Extraction",
        "Substitution with re.sub",
      ],
    },
  ],
  19: [
    {
      name: "Multithreading and Concurrency",
      subtopics: [
        "Creating Threads",
        "Thread Synchronization",
        "Thread Joining and Lifecycle",
        "async/await with asyncio",
        "Concurrency Concepts",
      ],
    },
  ],
  20: [
    {
      name: "File Handling",
      subtopics: [
        "Opening and Closing Files",
        "File Modes",
        "Reading Files",
        "Writing Files",
        "The with Statement",
        "File Errors and Exceptions",
      ],
    },
  ],
};

export const GROUP_TITLE = "PYTHON Programming";
export const PY_JUDGE_URL =
  process.env.PY_JUDGE_URL ||
  "https://yqcl2o7hrmikctiifbd2pzplky0cxglk.lambda-url.ap-south-1.on.aws/";
