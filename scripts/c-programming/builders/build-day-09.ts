/**
 * Builder for Day 9 — "Strings".
 * Emits:
 *   /home/z/my-project/scripts/c-programming/data/day-09.code.json  (20 code questions)
 *   /home/z/my-project/scripts/c-programming/data/day-09.mcq.json   (20 MCQ questions)
 *
 * Subtopics (exact strings from taxonomy.ts):
 *   String Declaration and Initialization
 *   String Input and Output
 *   String Length and Traversal
 *   String Comparison
 *   String Library Functions
 *   Character Case Conversion
 *
 * Difficulty matrix:
 *   Code: 6 easy-basic + 4 easy-scenario + 6 medium-scenario + 4 hard-scenario = 20
 *   MCQ : 10 easy + 6 medium + 4 hard = 20  (>=6 snippets, all in medium/hard)
 */
import { writeFileSync } from "node:fs";

const DAY = 9;
const TOPIC = "Strings";
const SUBTOPICS = [
  "String Declaration and Initialization",
  "String Input and Output",
  "String Length and Traversal",
  "String Comparison",
  "String Library Functions",
  "Character Case Conversion",
];

function codeQ(o: Record<string, unknown>) {
  return Object.assign({ lang: "c", topic: TOPIC }, o);
}
function mcq(o: Record<string, unknown>) {
  return Object.assign(
    { iscodesnippet: false, codesnippet: null, snippetLang: null },
    o
  );
}

/* ────────────────────────────── CODE QUESTIONS ────────────────────────────── */
const questions = [
  /* ─────────── EASY BASIC (6) ─────────── */
  codeQ({
    title: "Fixed Brand Motto Printer",
    description:
      "Declare a string `motto` initialized to the literal \"AtomCode Rocks\" and print it as many times as the input integer n specifies, each on its own line.\n\nInput Format:\nA single line containing a positive integer n.\n\nOutput Format:\nThe motto printed n times, each on its own line.\n\nConstraints:\n1 <= n <= 100",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "String Declaration and Initialization",
    sampleinput1: "3",
    sampleoutput1: "AtomCode Rocks\nAtomCode Rocks\nAtomCode Rocks",
    sampleinput2: "1",
    sampleoutput2: "AtomCode Rocks",
    input1: "5",
    output1: "AtomCode Rocks\nAtomCode Rocks\nAtomCode Rocks\nAtomCode Rocks\nAtomCode Rocks",
    input2: "2",
    output2: "AtomCode Rocks\nAtomCode Rocks",
    input3: "4",
    output3: "AtomCode Rocks\nAtomCode Rocks\nAtomCode Rocks\nAtomCode Rocks",
    inputconstrains: "1 <= n <= 100",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    char motto[] = "AtomCode Rocks";
    int n;
    if (scanf("%d", &n) != 1) return 0;
    for (int i = 0; i < n; i++) {
        printf("%s\\n", motto);
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Single Word Echo Drill",
    description:
      "Read a single word (no spaces) from stdin using scanf and print it back exactly as read on its own line.\n\nInput Format:\nA single line containing one word (no spaces).\n\nOutput Format:\nThe same word on its own line.\n\nConstraints:\n1 <= word length <= 1000",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "String Input and Output",
    sampleinput1: "hello",
    sampleoutput1: "hello",
    sampleinput2: "atom",
    sampleoutput2: "atom",
    input1: "test",
    output1: "test",
    input2: "code",
    output2: "code",
    input3: "abc123",
    output3: "abc123",
    inputconstrains: "1 <= word length <= 1000, no spaces",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    char s[1024];
    if (scanf("%1023s", s) != 1) return 0;
    printf("%s\\n", s);
    return 0;
}
`,
  }),
  codeQ({
    title: "Manual String Length Counter",
    description:
      "Read a single word and count its length manually by traversing characters until the null terminator. Do NOT use strlen. Print the length as an integer.\n\nInput Format:\nA single line containing one word (no spaces).\n\nOutput Format:\nA single integer — the length of the word.\n\nConstraints:\n1 <= word length <= 1000",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "String Length and Traversal",
    sampleinput1: "hello",
    sampleoutput1: "5",
    sampleinput2: "atom",
    sampleoutput2: "4",
    input1: "x",
    output1: "1",
    input2: "code123",
    output2: "7",
    input3: "abcdefghij",
    output3: "10",
    inputconstrains: "1 <= word length <= 1000, no spaces",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    char s[1024];
    if (scanf("%1023s", s) != 1) return 0;
    int n = 0;
    while (s[n] != 0) n++;
    printf("%d\\n", n);
    return 0;
}
`,
  }),
  codeQ({
    title: "Manual String Equality Drill",
    description:
      "Read two words and determine whether they are equal by comparing them character-by-character. Do NOT use strcmp. Print \"Equal\" if they match exactly (same length and same characters), otherwise print \"NotEqual\".\n\nInput Format:\nA single line containing two space-separated words.\n\nOutput Format:\nThe word \"Equal\" or \"NotEqual\" on its own line.\n\nConstraints:\n1 <= length of each word <= 1000",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "String Comparison",
    sampleinput1: "hello hello",
    sampleoutput1: "Equal",
    sampleinput2: "hello world",
    sampleoutput2: "NotEqual",
    input1: "abc abcd",
    output1: "NotEqual",
    input2: "atom atom",
    output2: "Equal",
    input3: "abc abc",
    output3: "Equal",
    inputconstrains: "1 <= length of each word <= 1000, no spaces inside words",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    char a[1024], b[1024];
    if (scanf("%1023s %1023s", a, b) != 2) return 0;
    int equal = 1;
    int i = 0;
    while (a[i] != 0 || b[i] != 0) {
        if (a[i] != b[i]) { equal = 0; break; }
        i++;
    }
    printf("%s\\n", equal ? "Equal" : "NotEqual");
    return 0;
}
`,
  }),
  codeQ({
    title: "String Length via strlen",
    description:
      "Read a single word and print its length using the standard library strlen function from string.h.\n\nInput Format:\nA single line containing one word (no spaces).\n\nOutput Format:\nA single integer — the length of the word.\n\nConstraints:\n1 <= word length <= 1000",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "String Library Functions",
    sampleinput1: "hello",
    sampleoutput1: "5",
    sampleinput2: "atomcode",
    sampleoutput2: "8",
    input1: "x",
    output1: "1",
    input2: "ab",
    output2: "2",
    input3: "abcdefghij",
    output3: "10",
    inputconstrains: "1 <= word length <= 1000, no spaces",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>
#include <string.h>

int main(void) {
    char s[1024];
    if (scanf("%1023s", s) != 1) return 0;
    printf("%d\\n", (int)strlen(s));
    return 0;
}
`,
  }),
  codeQ({
    title: "Uppercase via toupper Drill",
    description:
      "Read a single word of lowercase English letters and convert each character to uppercase using the toupper function from ctype.h. Print the result.\n\nInput Format:\nA single line containing one lowercase word.\n\nOutput Format:\nThe uppercase version of the word on its own line.\n\nConstraints:\n1 <= word length <= 1000, lowercase letters only",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Character Case Conversion",
    sampleinput1: "hello",
    sampleoutput1: "HELLO",
    sampleinput2: "world",
    sampleoutput2: "WORLD",
    input1: "abc",
    output1: "ABC",
    input2: "atom",
    output2: "ATOM",
    input3: "z",
    output3: "Z",
    inputconstrains: "1 <= word length <= 1000, lowercase letters only",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>
#include <ctype.h>

int main(void) {
    char s[1024];
    if (scanf("%1023s", s) != 1) return 0;
    for (int i = 0; s[i] != 0; i++) {
        s[i] = (char)toupper((unsigned char)s[i]);
    }
    printf("%s\\n", s);
    return 0;
}
`,
  }),

  /* ─────────── EASY SCENARIO (4) ─────────── */
  codeQ({
    title: "Coffee Shop Brand Card Printer",
    description:
      "A coffee shop prints a branded receipt header. Declare two initialized strings: brand = \"Bean & Brew Cafe\" and tagline = \"Freshly Roasted Daily\". Read the number of coffees ordered and print the brand header, the tagline, and \"Orders: <n>\" on three separate lines.\n\nInput Format:\nA single line containing a positive integer n.\n\nOutput Format:\nThree lines:\nLine 1: the brand string\nLine 2: the tagline string\nLine 3: \"Orders: <n>\"\n\nConstraints:\n1 <= n <= 1000",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "String Declaration and Initialization",
    sampleinput1: "3",
    sampleoutput1: "Bean & Brew Cafe\nFreshly Roasted Daily\nOrders: 3",
    sampleinput2: "1",
    sampleoutput2: "Bean & Brew Cafe\nFreshly Roasted Daily\nOrders: 1",
    input1: "12",
    output1: "Bean & Brew Cafe\nFreshly Roasted Daily\nOrders: 12",
    input2: "100",
    output2: "Bean & Brew Cafe\nFreshly Roasted Daily\nOrders: 100",
    input3: "7",
    output3: "Bean & Brew Cafe\nFreshly Roasted Daily\nOrders: 7",
    inputconstrains: "1 <= n <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    char brand[] = "Bean & Brew Cafe";
    char tagline[] = "Freshly Roasted Daily";
    int n;
    if (scanf("%d", &n) != 1) return 0;
    printf("%s\\n%s\\nOrders: %d\\n", brand, tagline, n);
    return 0;
}
`,
  }),
  codeQ({
    title: "Boarding Pass Passenger Echo",
    description:
      "An airport kiosk reads a passenger's first name and a flight code (both single tokens) from stdin and prints a boarding pass header line.\n\nInput Format:\nA single line containing two space-separated tokens: the passenger's first name and the flight code.\n\nOutput Format:\nA single line in the form \"Passenger <name> Flight <flight>\".\n\nConstraints:\n1 <= length of each token <= 50",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "String Input and Output",
    sampleinput1: "Alice AI101",
    sampleoutput1: "Passenger Alice Flight AI101",
    sampleinput2: "Bob BA202",
    sampleoutput2: "Passenger Bob Flight BA202",
    input1: "Carol DL999",
    output1: "Passenger Carol Flight DL999",
    input2: "Dave UA456",
    output2: "Passenger Dave Flight UA456",
    input3: "Eve EK789",
    output3: "Passenger Eve Flight EK789",
    inputconstrains: "1 <= length of each token <= 50, no spaces inside tokens",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    char name[64], flight[64];
    if (scanf("%63s %63s", name, flight) != 2) return 0;
    printf("Passenger %s Flight %s\\n", name, flight);
    return 0;
}
`,
  }),
  codeQ({
    title: "Username Length Reporter",
    description:
      "A registration form reads a username (single word) and reports its length. Traverse the string manually to count characters (do NOT use strlen) and print \"Length: <n>\".\n\nInput Format:\nA single line containing one username word.\n\nOutput Format:\nA single line: \"Length: <n>\".\n\nConstraints:\n1 <= username length <= 1000",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "String Length and Traversal",
    sampleinput1: "alice",
    sampleoutput1: "Length: 5",
    sampleinput2: "bob",
    sampleoutput2: "Length: 3",
    input1: "user123",
    output1: "Length: 7",
    input2: "a",
    output2: "Length: 1",
    input3: "atomcoder",
    output3: "Length: 9",
    inputconstrains: "1 <= username length <= 1000, no spaces",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    char s[1024];
    if (scanf("%1023s", s) != 1) return 0;
    int n = 0;
    while (s[n] != 0) n++;
    printf("Length: %d\\n", n);
    return 0;
}
`,
  }),
  codeQ({
    title: "Username Lowercase Normalizer",
    description:
      "A login form normalizes usernames by converting all letters to lowercase using the tolower function from ctype.h. Read a username (single word, may contain mixed case) and print the normalized version.\n\nInput Format:\nA single line containing one username word.\n\nOutput Format:\nThe lowercase version of the username on its own line.\n\nConstraints:\n1 <= username length <= 1000",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Character Case Conversion",
    sampleinput1: "Alice",
    sampleoutput1: "alice",
    sampleinput2: "USERNAME",
    sampleoutput2: "username",
    input1: "User123",
    output1: "user123",
    input2: "ATOM",
    output2: "atom",
    input3: "aBcDe",
    output3: "abcde",
    inputconstrains: "1 <= username length <= 1000, no spaces",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>
#include <ctype.h>

int main(void) {
    char s[1024];
    if (scanf("%1023s", s) != 1) return 0;
    for (int i = 0; s[i] != 0; i++) {
        s[i] = (char)tolower((unsigned char)s[i]);
    }
    printf("%s\\n", s);
    return 0;
}
`,
  }),

  /* ─────────── MEDIUM SCENARIO (6) ─────────── */
  codeQ({
    title: "Passport Number Builder",
    description:
      "A passport office issues passport numbers in the format \"PAS-<country>-<serial>\" where country is a 3-letter code and serial is a 6-digit number. Declare a fixed prefix \"PAS-\" as an initialized string and use strcpy and strcat to assemble the final passport number. Do NOT use sprintf or snprintf.\n\nInput Format:\nA single line containing two space-separated tokens: the country code and the serial number.\n\nOutput Format:\nA single line: \"PAS-<country>-<serial>\".\n\nConstraints:\nCountry is exactly 3 uppercase letters; serial is exactly 6 digits.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "String Declaration and Initialization",
    sampleinput1: "USA 123456",
    sampleoutput1: "PAS-USA-123456",
    sampleinput2: "IND 987654",
    sampleoutput2: "PAS-IND-987654",
    input1: "GBR 111111",
    output1: "PAS-GBR-111111",
    input2: "CAN 555555",
    output2: "PAS-CAN-555555",
    input3: "AUS 246810",
    output3: "PAS-AUS-246810",
    inputconstrains: "Country is 3 uppercase letters; serial is 6 digits",
    blacklist: "sprintf, snprintf",
    whitelist: "strcpy(, strcat(",
    sourcecode: `#include <stdio.h>
#include <string.h>

int main(void) {
    char prefix[] = "PAS-";
    char country[16];
    char serial[32];
    char passport[64];
    if (scanf("%15s %31s", country, serial) != 2) return 0;
    strcpy(passport, prefix);
    strcat(passport, country);
    strcat(passport, "-");
    strcat(passport, serial);
    printf("%s\\n", passport);
    return 0;
}
`,
  }),
  codeQ({
    title: "License Plate Token Reader",
    description:
      "A parking lot kiosk reads a vehicle's license plate and a vehicle type from two separate lines using fgets (NOT scanf). Strip the trailing newline from each line manually and print a single summary line: \"<type>: <plate>\".\n\nInput Format:\nTwo lines:\nLine 1: the license plate (single token, no spaces)\nLine 2: the vehicle type (single token, no spaces)\n\nOutput Format:\nA single line: \"<type>: <plate>\".\n\nConstraints:\n1 <= length of each token <= 50",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "String Input and Output",
    sampleinput1: "DL3CAB\nCAR",
    sampleoutput1: "CAR: DL3CAB",
    sampleinput2: "MH12AB1234\nBIKE",
    sampleoutput2: "BIKE: MH12AB1234",
    input1: "KA01HG5678\nTRUCK",
    output1: "TRUCK: KA01HG5678",
    input2: "UP16T9090\nVAN",
    output2: "VAN: UP16T9090",
    input3: "TN07B1001\nBUS",
    output3: "BUS: TN07B1001",
    inputconstrains: "1 <= length of each token <= 50, no spaces inside tokens",
    blacklist: "scanf",
    whitelist: "fgets(",
    sourcecode: `#include <stdio.h>
#include <string.h>

int main(void) {
    char plate[64];
    char type[64];
    if (fgets(plate, sizeof(plate), stdin) == NULL) return 0;
    if (fgets(type, sizeof(type), stdin) == NULL) return 0;
    plate[strcspn(plate, "\\n")] = 0;
    type[strcspn(type, "\\n")] = 0;
    printf("%s: %s\\n", type, plate);
    return 0;
}
`,
  }),
  codeQ({
    title: "Tagline Length Cutoff Inspector",
    description:
      "A registration form allows a tagline up to 20 characters. Read the tagline (a single line, may contain spaces) using fgets. Traverse it manually (do NOT use strlen or strcspn) to count characters after stripping the trailing newline. If the length is at most 20, print \"ACCEPT <length>\"; otherwise print \"REJECT <length>\".\n\nInput Format:\nA single line containing the tagline (may contain spaces).\n\nOutput Format:\nA single line: either \"ACCEPT <length>\" or \"REJECT <length>\".\n\nConstraints:\n1 <= tagline length <= 1000",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "String Length and Traversal",
    sampleinput1: "Hello World",
    sampleoutput1: "ACCEPT 11",
    sampleinput2: "Short tagline here",
    sampleoutput2: "ACCEPT 18",
    input1: "This tagline is way too long for the cutoff",
    output1: "REJECT 43",
    input2: "abc",
    output2: "ACCEPT 3",
    input3: "a",
    output3: "ACCEPT 1",
    inputconstrains: "1 <= tagline length <= 1000",
    blacklist: "strlen, strcspn",
    whitelist: "for (",
    sourcecode: `#include <stdio.h>

int main(void) {
    char s[1024];
    if (fgets(s, sizeof(s), stdin) == NULL) return 0;
    int n = 0;
    for (int i = 0; s[i] != 0; i++) {
        if (s[i] == '\\n') { s[i] = 0; break; }
        n++;
    }
    if (n <= 20) printf("ACCEPT %d\\n", n);
    else printf("REJECT %d\\n", n);
    return 0;
}
`,
  }),
  codeQ({
    title: "SKU Equality Checker",
    description:
      "An inventory system checks whether two scanned SKU codes match exactly. Read two SKUs (single tokens) and compare them character-by-character without using strcmp or any of its variants. Print \"MATCH\" if they are identical (same length and same characters), otherwise \"NOMATCH\".\n\nInput Format:\nA single line containing two space-separated SKUs.\n\nOutput Format:\nA single line: \"MATCH\" or \"NOMATCH\".\n\nConstraints:\n1 <= length of each SKU <= 50",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "String Comparison",
    sampleinput1: "ABC123 ABC123",
    sampleoutput1: "MATCH",
    sampleinput2: "ABC123 ABC124",
    sampleoutput2: "NOMATCH",
    input1: "ABC ABCD",
    output1: "NOMATCH",
    input2: "atom atom",
    output2: "MATCH",
    input3: "SKU1 SKU2",
    output3: "NOMATCH",
    inputconstrains: "1 <= length of each SKU <= 50, no spaces inside SKUs",
    blacklist: "strcmp, strncmp, strcasecmp, memcmp",
    whitelist: "while (",
    sourcecode: `#include <stdio.h>

int main(void) {
    char a[64], b[64];
    if (scanf("%63s %63s", a, b) != 2) return 0;
    int equal = 1;
    int i = 0;
    while (a[i] != 0 || b[i] != 0) {
        if (a[i] != b[i]) { equal = 0; break; }
        i++;
    }
    printf("%s\\n", equal ? "MATCH" : "NOMATCH");
    return 0;
}
`,
  }),
  codeQ({
    title: "Product Code Assembler with strcat",
    description:
      "A warehouse assembles a product code from three tokens: category, brand, and model. Declare the fixed prefix \"PRODUCT-\" as an initialized string. Use strcpy and strcat (do NOT use sprintf or snprintf) to assemble the final code in the form \"PRODUCT-<category>-<brand>-<model>\".\n\nInput Format:\nA single line containing three space-separated tokens: category, brand, model.\n\nOutput Format:\nA single line: \"PRODUCT-<category>-<brand>-<model>\".\n\nConstraints:\n1 <= length of each token <= 30",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "String Library Functions",
    sampleinput1: "Electronics Sony WH1000",
    sampleoutput1: "PRODUCT-Electronics-Sony-WH1000",
    sampleinput2: "Books Penguin Classic",
    sampleoutput2: "PRODUCT-Books-Penguin-Classic",
    input1: "Toy Lego Bricks",
    output1: "PRODUCT-Toy-Lego-Bricks",
    input2: "Tool Bosch Drill",
    output2: "PRODUCT-Tool-Bosch-Drill",
    input3: "Food Nestle Bar",
    output3: "PRODUCT-Food-Nestle-Bar",
    inputconstrains: "1 <= length of each token <= 30, no spaces inside tokens",
    blacklist: "sprintf, snprintf",
    whitelist: "strcpy(, strcat(",
    sourcecode: `#include <stdio.h>
#include <string.h>

int main(void) {
    char cat[32], brand[32], model[32];
    char code[128];
    if (scanf("%31s %31s %31s", cat, brand, model) != 3) return 0;
    strcpy(code, "PRODUCT-");
    strcat(code, cat);
    strcat(code, "-");
    strcat(code, brand);
    strcat(code, "-");
    strcat(code, model);
    printf("%s\\n", code);
    return 0;
}
`,
  }),
  codeQ({
    title: "Swapcase Text Transformer",
    description:
      "A text formatter applies swapcase to a line of text — every uppercase letter becomes lowercase and every lowercase letter becomes uppercase, using toupper and tolower from ctype.h. Read a single line of text (may contain spaces) and print the swapcased version. Do NOT use 'A' or 'a' character literals for case detection — use isupper / islower.\n\nInput Format:\nA single line of text.\n\nOutput Format:\nThe swapcased line on its own line.\n\nConstraints:\n1 <= text length <= 1000",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Character Case Conversion",
    sampleinput1: "Hello World",
    sampleoutput1: "hELLO wORLD",
    sampleinput2: "AtomCode",
    sampleoutput2: "aTOMcODE",
    input1: "ABCdef",
    output1: "abcDEF",
    input2: "123",
    output2: "123",
    input3: "aBc",
    output3: "AbC",
    inputconstrains: "1 <= text length <= 1000",
    blacklist: "'A', 'a'",
    whitelist: "tolower(, toupper(",
    sourcecode: `#include <stdio.h>
#include <ctype.h>

int main(void) {
    char s[1024];
    if (fgets(s, sizeof(s), stdin) == NULL) return 0;
    for (int i = 0; s[i] != 0; i++) {
        if (s[i] == '\\n') { s[i] = 0; break; }
        if (isupper((unsigned char)s[i])) s[i] = (char)tolower((unsigned char)s[i]);
        else if (islower((unsigned char)s[i])) s[i] = (char)toupper((unsigned char)s[i]);
    }
    printf("%s\\n", s);
    return 0;
}
`,
  }),

  /* ─────────── HARD SCENARIO (4) ─────────── */
  codeQ({
    title: "Inventory SKU Family Generator",
    description:
      "A warehouse generates a family of 3 related SKUs from a 2-character category code and a serial number. Each SKU has the form \"SKU-<category>-<serial>-<tier>\" where tier is one of \"BASIC\", \"STD\", or \"PRO\". Declare the prefix \"SKU-\" as an initialized string and declare the three tier strings via a char-pointer array initialized with string literals. Use strcpy and strcat (do NOT use sprintf or snprintf) to assemble each SKU. Print each SKU on its own line, in the order BASIC, STD, PRO.\n\nInput Format:\nA single line containing two space-separated tokens: the 2-character category code and the serial number.\n\nOutput Format:\nThree lines, one per SKU tier, in the order BASIC, STD, PRO.\n\nConstraints:\nCategory is exactly 2 characters; 1 <= serial length <= 10",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "String Declaration and Initialization",
    sampleinput1: "EL 1024",
    sampleoutput1: "SKU-EL-1024-BASIC\nSKU-EL-1024-STD\nSKU-EL-1024-PRO",
    sampleinput2: "AB 99",
    sampleoutput2: "SKU-AB-99-BASIC\nSKU-AB-99-STD\nSKU-AB-99-PRO",
    input1: "Z9 0",
    output1: "SKU-Z9-0-BASIC\nSKU-Z9-0-STD\nSKU-Z9-0-PRO",
    input2: "PQ 555555",
    output2: "SKU-PQ-555555-BASIC\nSKU-PQ-555555-STD\nSKU-PQ-555555-PRO",
    input3: "MX 1",
    output3: "SKU-MX-1-BASIC\nSKU-MX-1-STD\nSKU-MX-1-PRO",
    inputconstrains: "Category is exactly 2 characters; 1 <= serial length <= 10",
    blacklist: "sprintf, snprintf",
    whitelist: "strcpy(, strcat(",
    sourcecode: `#include <stdio.h>
#include <string.h>

int main(void) {
    char cat[8];
    char serial[16];
    if (scanf("%7s %15s", cat, serial) != 2) return 0;
    char base[64];
    const char *tiers[3];
    tiers[0] = "BASIC";
    tiers[1] = "STD";
    tiers[2] = "PRO";
    for (int i = 0; i < 3; i++) {
        strcpy(base, "SKU-");
        strcat(base, cat);
        strcat(base, "-");
        strcat(base, serial);
        strcat(base, "-");
        strcat(base, tiers[i]);
        printf("%s\\n", base);
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "PAN Number Format Validator",
    description:
      "An Indian PAN (Permanent Account Number) is a 10-character code with a strict format: positions 1-5 are uppercase letters (A-Z), positions 6-9 are digits (0-9), and position 10 is an uppercase letter. Read a PAN string (single token) and validate this format by manual traversal. Do NOT use strlen or any of the is* functions (isalpha, isdigit, isalnum) — check character ranges with 'A'-'Z' and '0'-'9' comparisons and the logical AND operator. Print \"VALID\" or \"INVALID\".\n\nInput Format:\nA single line containing one PAN string.\n\nOutput Format:\nA single line: \"VALID\" or \"INVALID\".\n\nConstraints:\n1 <= PAN length <= 30",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "String Length and Traversal",
    sampleinput1: "ABCDE1234F",
    sampleoutput1: "VALID",
    sampleinput2: "abcde1234F",
    sampleoutput2: "INVALID",
    input1: "XYZAB9999Q",
    output1: "VALID",
    input2: "ABCDE1234",
    output2: "INVALID",
    input3: "ABCDE12345",
    output3: "INVALID",
    inputconstrains: "1 <= PAN length <= 30",
    blacklist: "strlen, isalpha, isdigit, isalnum",
    whitelist: "for (, &&",
    sourcecode: `#include <stdio.h>

int main(void) {
    char pan[32];
    if (scanf("%31s", pan) != 1) return 0;
    int n = 0;
    while (pan[n] != 0) n++;
    if (n != 10) { printf("INVALID\\n"); return 0; }
    for (int i = 0; i < 5; i++) {
        if (!(pan[i] >= 'A' && pan[i] <= 'Z')) { printf("INVALID\\n"); return 0; }
    }
    for (int i = 5; i < 9; i++) {
        if (!(pan[i] >= '0' && pan[i] <= '9')) { printf("INVALID\\n"); return 0; }
    }
    if (!(pan[9] >= 'A' && pan[9] <= 'Z')) { printf("INVALID\\n"); return 0; }
    printf("VALID\\n");
    return 0;
}
`,
  }),
  codeQ({
    title: "Lexicographic SKU Sorter",
    description:
      "An inventory sorter reads 3 SKUs and outputs them in ascending lexicographic (dictionary) order. Implement a manual character-by-character comparison helper (do NOT use strcmp, strncmp, strcasecmp, memcmp, or qsort) and use it to sort the three SKUs via pointer-swap. Print the sorted SKUs one per line.\n\nInput Format:\nA single line containing three space-separated SKUs.\n\nOutput Format:\nThree lines, the SKUs sorted in ascending lexicographic order.\n\nConstraints:\n1 <= length of each SKU <= 50",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "String Comparison",
    sampleinput1: "banana apple cherry",
    sampleoutput1: "apple\nbanana\ncherry",
    sampleinput2: "zebra mango apple",
    sampleoutput2: "apple\nmango\nzebra",
    input1: "c b a",
    output1: "a\nb\nc",
    input2: "x y z",
    output2: "x\ny\nz",
    input3: "atom code bank",
    output3: "atom\nbank\ncode",
    inputconstrains: "1 <= length of each SKU <= 50, no spaces inside SKUs",
    blacklist: "strcmp, strncmp, strcasecmp, memcmp, qsort",
    whitelist: "for (, char *",
    sourcecode: `#include <stdio.h>

static int cmp_str(const char *a, const char *b) {
    int i = 0;
    while (a[i] != 0 && b[i] != 0) {
        if (a[i] != b[i]) return a[i] - b[i];
        i++;
    }
    return a[i] - b[i];
}

int main(void) {
    char s1[64], s2[64], s3[64];
    if (scanf("%63s %63s %63s", s1, s2, s3) != 3) return 0;
    char *p[3] = {s1, s2, s3};
    for (int i = 0; i < 2; i++) {
        for (int j = i + 1; j < 3; j++) {
            if (cmp_str(p[i], p[j]) > 0) {
                char *t = p[i];
                p[i] = p[j];
                p[j] = t;
            }
        }
    }
    printf("%s\\n%s\\n%s\\n", p[0], p[1], p[2]);
    return 0;
}
`,
  }),
  codeQ({
    title: "Camel to Snake Identifier Formatter",
    description:
      "A code formatter converts a camelCase identifier (single word) to snake_case. For each uppercase letter encountered, output an underscore followed by the lowercase version (using tolower from ctype.h). Lowercase letters and other characters pass through unchanged. Use isupper from ctype.h to detect uppercase letters — do NOT use 'A' or 'a' character literals for case detection.\n\nInput Format:\nA single line containing one camelCase identifier.\n\nOutput Format:\nThe snake_case version of the identifier on its own line.\n\nConstraints:\n1 <= identifier length <= 100",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Character Case Conversion",
    sampleinput1: "helloWorld",
    sampleoutput1: "hello_world",
    sampleinput2: "myVar",
    sampleoutput2: "my_var",
    input1: "simple",
    output1: "simple",
    input2: "getHTTPResponse",
    output2: "get_h_t_t_p_response",
    input3: "a",
    output3: "a",
    inputconstrains: "1 <= identifier length <= 100, single token",
    blacklist: "'A', 'a'",
    whitelist: "tolower(, isupper(",
    sourcecode: `#include <stdio.h>
#include <ctype.h>

int main(void) {
    char s[128];
    if (scanf("%127s", s) != 1) return 0;
    for (int i = 0; s[i] != 0; i++) {
        if (isupper((unsigned char)s[i])) {
            putchar('_');
            putchar(tolower((unsigned char)s[i]));
        } else {
            putchar(s[i]);
        }
    }
    putchar('\\n');
    return 0;
}
`,
  }),
];

/* ────────────────────────────── MCQ QUESTIONS ────────────────────────────── */
const mcqs = [
  /* ─────────── EASY (10) ─────────── */
  mcq({
    title: "String Declaration Method",
    description:
      "Which of the following correctly declares and initializes a C string as a mutable char array?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "String Declaration and Initialization",
    Option1: "char s[] = \"hello\";",
    Option2: "string s = \"hello\";",
    Option3: "char s = \"hello\";",
    Option4: "str s = \"hello\";",
    CorrectOption: 1,
  }),
  mcq({
    title: "Reading a Single Word from stdin",
    description:
      "Which scanf format specifier reads a single whitespace-delimited word into a char array safely with a width limit?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "String Input and Output",
    Option1: "%63s (with a 64-byte buffer)",
    Option2: "%c",
    Option3: "%d",
    Option4: "%f",
    CorrectOption: 1,
  }),
  mcq({
    title: "strlen Return Value",
    description:
      "What does strlen(\"atom\") return (excluding the null terminator)?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "String Length and Traversal",
    Option1: "4",
    Option2: "5",
    Option3: "3",
    Option4: "0",
    CorrectOption: 1,
  }),
  mcq({
    title: "strcmp Equal Strings Return",
    description:
      "What value does strcmp(\"abc\", \"abc\") return when comparing two identical strings?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "String Comparison",
    Option1: "0",
    Option2: "1",
    Option3: "-1",
    Option4: "A pointer to the first character",
    CorrectOption: 1,
  }),
  mcq({
    title: "Header for strcpy",
    description:
      "Which standard header must be included to use the strcpy function?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "String Library Functions",
    Option1: "<string.h>",
    Option2: "<stdio.h>",
    Option3: "<ctype.h>",
    Option4: "<stdlib.h>",
    CorrectOption: 1,
  }),
  mcq({
    title: "Lowercase Conversion Function",
    description:
      "Which function from ctype.h converts an uppercase letter to its lowercase equivalent (returning non-letters unchanged)?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Character Case Conversion",
    Option1: "tolower",
    Option2: "toupper",
    Option3: "islower",
    Option4: "isupper",
    CorrectOption: 1,
  }),
  mcq({
    title: "Array Size with Null Terminator",
    description:
      "How many bytes does `char s[] = \"abc\";` occupy in memory (including the implicit null terminator)?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "String Declaration and Initialization",
    Option1: "4",
    Option2: "3",
    Option3: "2",
    Option4: "1",
    CorrectOption: 1,
  }),
  mcq({
    title: "Why gets Is Deprecated",
    description: "Why is the gets function considered unsafe and removed in C11?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "String Input and Output",
    Option1: "It performs no bounds checking and may overflow the destination buffer",
    Option2: "It returns void so the caller cannot detect errors",
    Option3: "It only reads digit characters",
    Option4: "It requires the string.h header",
    CorrectOption: 1,
  }),
  mcq({
    title: "strcat Behavior",
    description: "What does strcat(dest, src) do in C?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "String Library Functions",
    Option1: "Appends the src string to the end of dest, overwriting dest's null terminator",
    Option2: "Copies src into dest, overwriting dest entirely",
    Option3: "Compares src with dest lexicographically",
    Option4: "Returns the combined length of both strings",
    CorrectOption: 1,
  }),
  mcq({
    title: "Header for Case Functions",
    description:
      "Which standard header declares the toupper and tolower functions?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Character Case Conversion",
    Option1: "<ctype.h>",
    Option2: "<string.h>",
    Option3: "<stdio.h>",
    Option4: "<stdlib.h>",
    CorrectOption: 1,
  }),

  /* ─────────── MEDIUM (6) — all snippets ─────────── */
  mcq({
    title: "Manual Length Loop Output",
    description: "What does the following C snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "String Length and Traversal",
    Option1: "5",
    Option2: "6",
    Option3: "4",
    Option4: "0",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    char s[] = "hello";
    int n = 0;
    while (s[n]) n++;
    printf("%d\\n", n);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Character Comparison Output",
    description: "What does the following C snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "String Comparison",
    Option1: "-1",
    Option2: "0",
    Option3: "1",
    Option4: "99",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    char a[] = "abc";
    char b[] = "abd";
    int i = 0;
    while (a[i] && a[i] == b[i]) i++;
    printf("%d\\n", a[i] - b[i]);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "strcat Concatenation Output",
    description: "What does the following C snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "String Library Functions",
    Option1: "Hello World",
    Option2: "World",
    Option3: "Hello",
    Option4: "HelloWorld",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
#include <string.h>
int main(void) {
    char d[20] = "Hello";
    char s[] = " World";
    strcat(d, s);
    printf("%s\\n", d);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "tolower Loop Output",
    description: "What does the following C snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Character Case Conversion",
    Option1: "abc",
    Option2: "ABC",
    Option3: "AbC",
    Option4: "ABCabc",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
#include <ctype.h>
int main(void) {
    char s[] = "AbC";
    for (int i = 0; s[i]; i++) {
        s[i] = (char)tolower((unsigned char)s[i]);
    }
    printf("%s\\n", s);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "sizeof on Char Array",
    description: "What does the following C snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "String Declaration and Initialization",
    Option1: "5",
    Option2: "4",
    Option3: "6",
    Option4: "1",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    char s[] = "Atom";
    printf("%d\\n", (int)sizeof(s));
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "fgets and strcspn Output",
    description:
      "Suppose stdin contains the line \"hi\". What does the following C snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "String Input and Output",
    Option1: "hi 2",
    Option2: "hello 5",
    Option3: "hello 7",
    Option4: "hi 5",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
#include <string.h>
int main(void) {
    char s[16] = "hello";
    fgets(s, sizeof(s), stdin);
    s[strcspn(s, "\\n")] = 0;
    printf("%s %d\\n", s, (int)strlen(s));
    return 0;
}
`,
    snippetLang: "c",
  }),

  /* ─────────── HARD (4) — all snippets ─────────── */
  mcq({
    title: "Embedded Null in String Literal",
    description: "What does the following C snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "String Length and Traversal",
    Option1: "5 12",
    Option2: "5 11",
    Option3: "11 12",
    Option4: "5 5",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
#include <string.h>
int main(void) {
    char s[] = "Hello\\0World";
    printf("%d %d\\n", (int)strlen(s), (int)sizeof(s));
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "strcmp Sign Output",
    description: "What does the following C snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "String Comparison",
    Option1: "-1",
    Option2: "0",
    Option3: "1",
    Option4: "-20",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
#include <string.h>
int main(void) {
    char *a = "apple";
    char *b = "apply";
    int r = strcmp(a, b);
    printf("%d\\n", r < 0 ? -1 : (r > 0 ? 1 : 0));
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "strncat Bounded Append Output",
    description: "What does the following C snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "String Library Functions",
    Option1: "ABCD 4",
    Option2: "ABCDEF 6",
    Option3: "AB 2",
    Option4: "ABCD 2",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
#include <string.h>
int main(void) {
    char d[5] = "AB";
    char s[] = "CDEF";
    strncat(d, s, 2);
    printf("%s %d\\n", d, (int)strlen(d));
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Letter Case Counter Output",
    description: "What does the following C snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Character Case Conversion",
    Option1: "1 2",
    Option2: "2 1",
    Option3: "3 2",
    Option4: "5 5",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
#include <ctype.h>
int main(void) {
    char s[] = "a1B2c";
    int up = 0, low = 0;
    for (int i = 0; s[i]; i++) {
        if (isupper((unsigned char)s[i])) up++;
        else if (islower((unsigned char)s[i])) low++;
    }
    printf("%d %d\\n", up, low);
    return 0;
}
`,
    snippetLang: "c",
  }),
];

const d = String(DAY).padStart(2, "0");
writeFileSync(
  `scripts/c-programming/data/day-${d}.code.json`,
  JSON.stringify({ day: DAY, topics: [{ name: TOPIC, subtopics: SUBTOPICS }], questions }, null, 2)
);
writeFileSync(
  `scripts/c-programming/data/day-${d}.mcq.json`,
  JSON.stringify({ day: DAY, questions: mcqs }, null, 2)
);
console.log("wrote day", DAY);
