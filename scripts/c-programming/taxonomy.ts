/**
 * AtomCode — "C Programming" question group topic taxonomy.
 *
 * Derived from the uploaded curriculum PDF (C Programming.pdf, ATOM CODE):
 * 20 days, ONE topic per day (Day 1 consolidates the PDF's intro/syntax/types
 * rows into a single "Introduction to C Programming" topic, with subtopics
 * spanning history, syntax, data types, scope, and lifetime).
 *
 * Subtopic lists are the EXACT strings that every question's `subtopic` field
 * must use — do not rename or invent.
 *
 * Day | Topic                                   | PDF Practical Exercise covered
 * ----+-----------------------------------------+---------------------------------------
 *  1  | Introduction to C Programming           | History, Features, Applications, Main Function, Header Files, printf/scanf, Comments, Data Types, Variables, Constants, Scope, Lifetime
 *  2  | Operators                               | Arithmetic, Relational, Logical, Bitwise, Assignment, Increment/Decrement, Ternary, sizeof, Pointer Operators, Special, Precedence
 *  3  | Control Flow (if-else, switch)          | if-else, switch-case, continue, break, Nested Control Structures
 *  4  | Looping Statements                      | for, while, do-while, Nested Control Structures
 *  5  | Functions and Modular Programming       | Function Declaration/Definition, Passing Parameters
 *  6  | Recursion and Inline Functions          | Recursion, Inline Functions
 *  7  | 1D Arrays                               | Declare, define, traverse arrays
 *  8  | 2D Arrays                               | 2D Arrays, Matrix manipulation
 *  9  | Strings                                 | String functions and manipulation
 * 10  | Array Patterns                          | Pattern manipulation using arrays
 * 11  | String Manipulation                     | Pattern manipulation using strings
 * 12  | Pointers and Memory Management          | Pointers, pointer arithmetic, arrays with pointers, null pointers
 * 13  | Structures and Unions                   | Defining structures/unions, nested structures, passing to functions
 * 14  | Preprocessor Directives                | Macros, #define, #include, conditional compilation (#ifdef, #ifndef)
 * 15  | Dynamic Memory Allocation              | malloc, calloc, realloc, free, memory leaks, large data structures
 * 16  | Bitwise Operations                      | Bit manipulation, AND/OR/XOR, shifting
 * 17  | Command-Line Arguments                 | argc, argv, parsing, real-world use cases
 * 18  | Error Handling                          | Errors, standard I/O errors, exit codes, debugging
 * 19  | Advanced Topics (Enumerations, Typedef) | Enums, typedefs, best practices for large-scale programs
 * 20  | File Handling in C                      | Reading/writing files, modes (r, w, a), file error handling
 */

export interface TopicDef {
  name: string;
  subtopics: string[];
}

export const TOPIC_TAXONOMY: Record<number, TopicDef[]> = {
  1: [
    {
      name: "Introduction to C Programming",
      subtopics: [
        "History Features and Applications of C",
        "Role of C in System Programming",
        "Compiling and Running C Programs",
        "Main Function and Header Files",
        "printf and scanf Basics",
        "Comments and Code Formatting",
        "Primitive Data Types",
        "Variables and Constants",
        "Scope and Lifetime of Variables",
      ],
    },
  ],
  2: [
    {
      name: "Operators",
      subtopics: [
        "Arithmetic Operators",
        "Relational Operators",
        "Logical Operators",
        "Bitwise Operators",
        "Assignment Operators",
        "Increment and Decrement Operators",
        "Conditional (Ternary) Operator",
        "Sizeof Operator",
        "Pointer Operators",
        "Special Operators",
        "Precedence and Associativity",
      ],
    },
  ],
  3: [
    {
      name: "Control Flow (if-else, switch)",
      subtopics: [
        "if and if-else Statements",
        "else-if Ladder",
        "Nested if Statements",
        "switch-case Statement",
        "break and continue",
        "Nested Control Structures",
      ],
    },
  ],
  4: [
    {
      name: "Looping Statements",
      subtopics: [
        "for Loop",
        "while Loop",
        "do-while Loop",
        "Nested Loops",
        "break and continue in Loops",
      ],
    },
  ],
  5: [
    {
      name: "Functions and Modular Programming",
      subtopics: [
        "Function Declaration and Definition",
        "Function Parameters",
        "Return Values",
        "Call by Value",
        "Function Prototypes",
        "Modular Design",
      ],
    },
  ],
  6: [
    {
      name: "Recursion and Inline Functions",
      subtopics: [
        "Recursion Basics",
        "Base and Recursive Case",
        "Mathematical Recursion",
        "Recursion on Strings",
        "Recursion on Arrays",
        "Recursion vs Iteration",
        "Inline Functions",
      ],
    },
  ],
  7: [
    {
      name: "1D Arrays",
      subtopics: [
        "Array Declaration and Initialization",
        "Array Traversal",
        "Array Input and Output",
        "Aggregation Sum Min Max",
        "Searching in Arrays",
        "Array Reversal and Rotation",
      ],
    },
  ],
  8: [
    {
      name: "2D Arrays",
      subtopics: [
        "2D Array Declaration",
        "Matrix Input and Output",
        "Matrix Addition and Subtraction",
        "Matrix Multiplication",
        "Transpose and Diagonals",
        "Patterns Using Arrays",
      ],
    },
  ],
  9: [
    {
      name: "Strings",
      subtopics: [
        "String Declaration and Initialization",
        "String Input and Output",
        "String Length and Traversal",
        "String Comparison",
        "String Library Functions",
        "Character Case Conversion",
      ],
    },
  ],
  10: [
    {
      name: "Array Patterns",
      subtopics: [
        "Number Patterns Using Arrays",
        "Star and Symbol Patterns",
        "Pyramid Patterns",
        "Hollow Patterns",
        "Floyd and Pascal Triangles",
        "Pattern Manipulation with Arrays",
      ],
    },
  ],
  11: [
    {
      name: "String Manipulation",
      subtopics: [
        "String Reversal",
        "Palindrome Check",
        "Anagram Check",
        "Character Frequency",
        "String Transformation",
        "Pattern Manipulation with Strings",
      ],
    },
  ],
  12: [
    {
      name: "Pointers and Memory Management",
      subtopics: [
        "Introduction to Pointers",
        "Pointer Arithmetic",
        "Pointers and Arrays",
        "Null Pointers",
        "Pointer to Pointer",
        "Function Pointers",
      ],
    },
  ],
  13: [
    {
      name: "Structures and Unions",
      subtopics: [
        "Defining Structures",
        "Accessing Structure Members",
        "Nested Structures",
        "Arrays of Structures",
        "Structures and Pointers",
        "Defining Unions",
        "Passing Structures to Functions",
      ],
    },
  ],
  14: [
    {
      name: "Preprocessor Directives",
      subtopics: [
        "Macros with define",
        "Include Directive",
        "Conditional Compilation ifdef ifndef",
        "Macro Functions",
        "Predefined Macros",
        "Pragma Directives",
      ],
    },
  ],
  15: [
    {
      name: "Dynamic Memory Allocation",
      subtopics: [
        "malloc Function",
        "calloc Function",
        "realloc Function",
        "free Function",
        "Memory Leaks",
        "Handling Large Data Structures",
      ],
    },
  ],
  16: [
    {
      name: "Bitwise Operations",
      subtopics: [
        "Bitwise AND OR XOR",
        "Bitwise NOT",
        "Left and Right Shift",
        "Bit Masking",
        "Bit Setting and Clearing",
        "Bit Counting",
      ],
    },
  ],
  17: [
    {
      name: "Command-Line Arguments",
      subtopics: [
        "argc and argv",
        "Parsing Command-Line Arguments",
        "String to Number Conversion",
        "Flag Parsing",
        "Multiple Argument Handling",
        "Real-world Use Cases",
      ],
    },
  ],
  18: [
    {
      name: "Error Handling",
      subtopics: [
        "Understanding Errors",
        "Standard I/O Errors",
        "errno and perror",
        "Exit Codes",
        "Error Return Values",
        "Debugging Techniques",
      ],
    },
  ],
  19: [
    {
      name: "Advanced Topics (Enumerations, Typedef)",
      subtopics: [
        "Enumeration Types",
        "enum with Values",
        "typedef Basics",
        "typedef with Structures",
        "typedef with Pointers",
        "Best Practices for Large-Scale Programs",
      ],
    },
  ],
  20: [
    {
      name: "File Handling in C",
      subtopics: [
        "Opening and Closing Files",
        "File Modes r w a",
        "Reading from Files",
        "Writing to Files",
        "Binary File Operations",
        "Error Handling in File Operations",
      ],
    },
  ],
};

export const GROUP_TITLE = "C Programming";

/**
 * C-language judge URL — the same GCC Lambda that handles cpp also accepts
 * `language: "c"` (verified by preflight). Falls back to env vars if set.
 */
export const C_JUDGE_URL =
  process.env.C_LAMBDA_URL ||
  (process.env.LAMBDA_JUDGE_URLS
    ? JSON.parse(process.env.LAMBDA_JUDGE_URLS)["c"]
    : undefined) ||
  "https://k3vo2ahf7pgosox6wqjny54l5u0rxsvx.lambda-url.ap-south-1.on.aws/";
