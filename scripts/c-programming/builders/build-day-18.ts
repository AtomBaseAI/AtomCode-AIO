/**
 * Builder for Day 18 — "Error Handling".
 * Emits:
 *   /home/z/my-project/scripts/c-programming/data/day-18.code.json  (20 code questions)
 *   /home/z/my-project/scripts/c-programming/data/day-18.mcq.json   (20 MCQ questions)
 *
 * Design notes:
 *   - Programs always return 0 from main on success AND on simulated error paths
 *     (a non-zero exit would be reported as "RuntimeError" by the judge, failing
 *     the test case). Error conditions are communicated by printing deterministic
 *     labels to stdout (e.g. "ERROR 22") rather than via exit code.
 *   - errno/strerror/EXIT_FAILURE/EXIT_SUCCESS appear in source for whitelist
 *     satisfaction. strerror results may be logged to stderr (not captured by
 *     stdout comparison); the deterministic stdout output is what is expected.
 */
import { writeFileSync } from "node:fs";

const DAY = 18;
const TOPIC = "Error Handling";
const SUBTOPICS = [
  "Understanding Errors",
  "Standard I/O Errors",
  "errno and perror",
  "Exit Codes",
  "Error Return Values",
  "Debugging Techniques",
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
  /* ── EASY · 6 basic ── */
  codeQ({
    title: "Range Validation Error Checker",
    description:
      "Read an integer n. If 0 <= n <= 100 print OK, otherwise print ERROR. This models the most basic form of input validation.\n\nInput Format:\nA single integer n.\n\nOutput Format:\nA single line: OK or ERROR.\n\nConstraints:\n-1000 <= n <= 1000",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Understanding Errors",
    sampleinput1: "50",
    sampleoutput1: "OK",
    sampleinput2: "150",
    sampleoutput2: "ERROR",
    input1: "0",
    output1: "OK",
    input2: "100",
    output2: "OK",
    input3: "101",
    output3: "ERROR",
    inputconstrains: "-1000 <= n <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) {
        return 1;
    }
    if (n >= 0 && n <= 100) {
        printf("OK\\n");
    } else {
        printf("ERROR\\n");
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Scanf Return Value Inspector",
    description:
      "Read two integers using a single scanf call. Inspect scanf's return value to determine whether both reads succeeded. Print READ_OK a b if both succeeded, otherwise READ_FAIL r where r is scanf's return value (0 if first token was non-numeric, 1 if only the first parsed).\n\nInput Format:\nTwo space-separated tokens (may be non-numeric).\n\nOutput Format:\nA single line: READ_OK a b on success, or READ_FAIL r on failure.\n\nConstraints:\nTokens up to 32 chars",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Standard I/O Errors",
    sampleinput1: "5 10",
    sampleoutput1: "READ_OK 5 10",
    sampleinput2: "abc 5",
    sampleoutput2: "READ_FAIL 0",
    input1: "1 2",
    output1: "READ_OK 1 2",
    input2: "x y",
    output2: "READ_FAIL 0",
    input3: "100 200",
    output3: "READ_OK 100 200",
    inputconstrains: "Tokens up to 32 chars",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int a, b;
    int r = scanf("%d %d", &a, &b);
    if (r == 2) {
        printf("READ_OK %d %d\\n", a, b);
    } else {
        printf("READ_FAIL %d\\n", r);
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Errno Setter for Negative Input",
    description:
      "A library routine sets errno to 22 (EINVAL) when given a negative input. Read an integer n. If n < 0, set errno = 22; otherwise set errno = 0. Print the resulting errno value.\n\nInput Format:\nA single integer n.\n\nOutput Format:\nA single integer: the errno value (22 if n < 0, 0 otherwise).\n\nConstraints:\n-1000 <= n <= 1000",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "errno and perror",
    sampleinput1: "5",
    sampleoutput1: "0",
    sampleinput2: "-1",
    sampleoutput2: "22",
    input1: "0",
    output1: "0",
    input2: "-100",
    output2: "22",
    input3: "100",
    output3: "0",
    inputconstrains: "-1000 <= n <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>
#include <errno.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) {
        return 1;
    }
    if (n < 0) {
        errno = 22;
    } else {
        errno = 0;
    }
    printf("%d\\n", errno);
    return 0;
}
`,
  }),
  codeQ({
    title: "Exit Code Simulator",
    description:
      "A CLI tool returns 0 on success, 1 on failure, 2 on warning. Read an integer n: positive n maps to success (0), negative n to failure (1), zero to warning (2). Print the exit code.\n\nInput Format:\nA single integer n.\n\nOutput Format:\nA single integer: the exit code (0, 1, or 2).\n\nConstraints:\n-1000 <= n <= 1000",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Exit Codes",
    sampleinput1: "5",
    sampleoutput1: "0",
    sampleinput2: "-3",
    sampleoutput2: "1",
    input1: "0",
    output1: "2",
    input2: "100",
    output2: "0",
    input3: "-1",
    output3: "1",
    inputconstrains: "-1000 <= n <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) {
        return 1;
    }
    int code;
    if (n > 0) {
        code = 0;
    } else if (n < 0) {
        code = 1;
    } else {
        code = 2;
    }
    printf("%d\\n", code);
    return 0;
}
`,
  }),
  codeQ({
    title: "Helper Returns Minus One on Error",
    description:
      "A helper function returns -1 to signal an error. Read an integer n. If n < 0 the helper returns -1; otherwise it returns n*n. Print the helper's return value.\n\nInput Format:\nA single integer n.\n\nOutput Format:\nA single integer: n*n if n >= 0, otherwise -1.\n\nConstraints:\n-1000 <= n <= 1000",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Error Return Values",
    sampleinput1: "5",
    sampleoutput1: "25",
    sampleinput2: "-3",
    sampleoutput2: "-1",
    input1: "0",
    output1: "0",
    input2: "10",
    output2: "100",
    input3: "-1",
    output3: "-1",
    inputconstrains: "-1000 <= n <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int square_or_error(int n) {
    if (n < 0) {
        return -1;
    }
    return n * n;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) {
        return 1;
    }
    int result = square_or_error(n);
    printf("%d\\n", result);
    return 0;
}
`,
  }),
  codeQ({
    title: "Debug Range Assertion Printer",
    description:
      "A debug build prints a trace message based on whether an input is in range. Read an integer n. If n > 100 print DEBUG: out_of_range; otherwise print DEBUG: ok.\n\nInput Format:\nA single integer n.\n\nOutput Format:\nA single line: DEBUG: out_of_range or DEBUG: ok.\n\nConstraints:\n-1000 <= n <= 1000",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Debugging Techniques",
    sampleinput1: "50",
    sampleoutput1: "DEBUG: ok",
    sampleinput2: "150",
    sampleoutput2: "DEBUG: out_of_range",
    input1: "100",
    output1: "DEBUG: ok",
    input2: "101",
    output2: "DEBUG: out_of_range",
    input3: "0",
    output3: "DEBUG: ok",
    inputconstrains: "-1000 <= n <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) {
        return 1;
    }
    if (n > 100) {
        printf("DEBUG: out_of_range\\n");
    } else {
        printf("DEBUG: ok\\n");
    }
    return 0;
}
`,
  }),

  /* ── EASY · 4 scenario ── */
  codeQ({
    title: "ATM Withdrawal Validator",
    description:
      "An ATM dispenses cash only if the requested amount is positive and does not exceed the account balance. Read balance and amount. If amount <= 0 print INVALID_AMOUNT. Else if amount > balance print INSUFFICIENT_FUNDS. Otherwise print OK new_balance where new_balance = balance - amount.\n\nInput Format:\nTwo space-separated integers: balance and amount.\n\nOutput Format:\nA single line: INVALID_AMOUNT, INSUFFICIENT_FUNDS, or OK new_balance.\n\nConstraints:\n0 <= balance <= 100000, -1000 <= amount <= 100000",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Understanding Errors",
    sampleinput1: "1000 200",
    sampleoutput1: "OK 800",
    sampleinput2: "100 200",
    sampleoutput2: "INSUFFICIENT_FUNDS",
    input1: "1000 -50",
    output1: "INVALID_AMOUNT",
    input2: "1000 1000",
    output2: "OK 0",
    input3: "0 0",
    output3: "INVALID_AMOUNT",
    inputconstrains: "0 <= balance <= 100000, -1000 <= amount <= 100000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int balance, amount;
    if (scanf("%d %d", &balance, &amount) != 2) {
        return 1;
    }
    if (amount <= 0) {
        printf("INVALID_AMOUNT\\n");
    } else if (amount > balance) {
        printf("INSUFFICIENT_FUNDS\\n");
    } else {
        printf("OK %d\\n", balance - amount);
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Temperature Sensor Fault Detector",
    description:
      "An industrial temperature sensor reports values in Celsius. Readings below -50 or above 150 indicate a sensor fault. Read a temperature and print OK temp if in range, otherwise SENSOR_FAULT.\n\nInput Format:\nA single integer temperature.\n\nOutput Format:\nA single line: OK temp or SENSOR_FAULT.\n\nConstraints:\n-200 <= temp <= 200",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Standard I/O Errors",
    sampleinput1: "25",
    sampleoutput1: "OK 25",
    sampleinput2: "-100",
    sampleoutput2: "SENSOR_FAULT",
    input1: "200",
    output1: "SENSOR_FAULT",
    input2: "-50",
    output2: "OK -50",
    input3: "150",
    output3: "OK 150",
    inputconstrains: "-200 <= temp <= 200",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int temp;
    if (scanf("%d", &temp) != 1) {
        return 1;
    }
    if (temp < -50 || temp > 150) {
        printf("SENSOR_FAULT\\n");
    } else {
        printf("OK %d\\n", temp);
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Login Lockout After Attempts",
    description:
      "A login system locks the account after 3 failed attempts. Read the number of failed attempts n. If n >= 3 print LOCKED; otherwise print ALLOWED attempts_left where attempts_left = 3 - n.\n\nInput Format:\nA single integer n (failed attempts so far).\n\nOutput Format:\nA single line: LOCKED or ALLOWED attempts_left.\n\nConstraints:\n0 <= n <= 10",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Exit Codes",
    sampleinput1: "0",
    sampleoutput1: "ALLOWED 3",
    sampleinput2: "2",
    sampleoutput2: "ALLOWED 1",
    input1: "3",
    output1: "LOCKED",
    input2: "5",
    output2: "LOCKED",
    input3: "1",
    output3: "ALLOWED 2",
    inputconstrains: "0 <= n <= 10",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) {
        return 1;
    }
    if (n >= 3) {
        printf("LOCKED\\n");
    } else {
        printf("ALLOWED %d\\n", 3 - n);
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Database Lookup Not Found Indicator",
    description:
      "A database lookup returns a record id or signals NOT FOUND by setting errno to 2 (ENOENT). Read a record id. If the id is 0 the lookup fails: set errno = 2 and print the errno value. Otherwise print FOUND id.\n\nInput Format:\nA single integer id.\n\nOutput Format:\nA single line: FOUND id on success, or the errno value (2) on not-found.\n\nConstraints:\n-1000 <= id <= 1000",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "errno and perror",
    sampleinput1: "1",
    sampleoutput1: "FOUND 1",
    sampleinput2: "0",
    sampleoutput2: "2",
    input1: "42",
    output1: "FOUND 42",
    input2: "100",
    output2: "FOUND 100",
    input3: "-1",
    output3: "FOUND -1",
    inputconstrains: "-1000 <= id <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>
#include <errno.h>

int main(void) {
    int id;
    if (scanf("%d", &id) != 1) {
        return 1;
    }
    if (id == 0) {
        errno = 2;
        printf("%d\\n", errno);
    } else {
        printf("FOUND %d\\n", id);
    }
    return 0;
}
`,
  }),

  /* ── MEDIUM · 6 scenario (blacklist + whitelist) ── */
  codeQ({
    title: "Errno and Strerror Range Reporter",
    description:
      "A configuration tool reads a temperature setting and validates it against the operating range [-40, 85]. If out of range, set errno = EDOM (33), log the strerror message to stderr, and print ERROR_CODE errno_value to stdout. Otherwise print OK temp. Use strerror to format the stderr log; do not use perror or assert.\n\nInput Format:\nA single integer temperature.\n\nOutput Format:\nA single line: OK temp, or ERROR_CODE errno_value.\n\nConstraints:\n-200 <= temp <= 200",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "errno and perror",
    sampleinput1: "25",
    sampleoutput1: "OK 25",
    sampleinput2: "-50",
    sampleoutput2: "ERROR_CODE 33",
    input1: "100",
    output1: "ERROR_CODE 33",
    input2: "-40",
    output2: "OK -40",
    input3: "85",
    output3: "OK 85",
    inputconstrains: "-200 <= temp <= 200",
    blacklist: "assert, perror",
    whitelist: "errno, strerror(, EDOM",
    sourcecode: `#include <stdio.h>
#include <errno.h>
#include <string.h>

int main(void) {
    int temp;
    if (scanf("%d", &temp) != 1) {
        return 1;
    }
    if (temp < -40 || temp > 85) {
        errno = EDOM;
        char *msg = strerror(errno);
        fprintf(stderr, "range_error: %s\\n", msg);
        printf("ERROR_CODE %d\\n", errno);
    } else {
        printf("OK %d\\n", temp);
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Strerror Lookup Table",
    description:
      "A crash-log analyzer reads an errno code and prints the corresponding message using strerror. Read an errno code (a small non-negative integer) and print \"code: message\" where message is strerror(code). Do not use perror or switch-case for the mapping.\n\nInput Format:\nA single integer errno code.\n\nOutput Format:\nA single line: code: message.\n\nConstraints:\nerrno code in {0, 1, 2, 13, 22}",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "errno and perror",
    sampleinput1: "0",
    sampleoutput1: "0: Success",
    sampleinput2: "2",
    sampleoutput2: "2: No such file or directory",
    input1: "22",
    output1: "22: Invalid argument",
    input2: "13",
    output2: "13: Permission denied",
    input3: "1",
    output3: "1: Operation not permitted",
    inputconstrains: "errno code in {0, 1, 2, 13, 22}",
    blacklist: "perror, switch",
    whitelist: "strerror(, errno, printf(",
    sourcecode: `#include <stdio.h>
#include <string.h>
#include <errno.h>

int main(void) {
    int code;
    if (scanf("%d", &code) != 1) {
        return 1;
    }
    errno = code;
    char *msg = strerror(errno);
    printf("%d: %s\\n", code, msg);
    return 0;
}
`,
  }),
  codeQ({
    title: "Exit Code Constant Validator",
    description:
      "A validator function returns EXIT_SUCCESS (0) when input is in [0, 100] and EXIT_FAILURE (1) otherwise. Read n. Call the validator and print the returned code. Do not use goto or abort.\n\nInput Format:\nA single integer n.\n\nOutput Format:\nA single integer: 0 (success) or 1 (failure).\n\nConstraints:\n-1000 <= n <= 1000",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Exit Codes",
    sampleinput1: "50",
    sampleoutput1: "0",
    sampleinput2: "-1",
    sampleoutput2: "1",
    input1: "0",
    output1: "0",
    input2: "100",
    output2: "0",
    input3: "101",
    output3: "1",
    inputconstrains: "-1000 <= n <= 1000",
    blacklist: "goto, abort",
    whitelist: "EXIT_SUCCESS, EXIT_FAILURE, return",
    sourcecode: `#include <stdio.h>
#include <stdlib.h>

int validate(int n) {
    if (n < 0 || n > 100) {
        return EXIT_FAILURE;
    }
    return EXIT_SUCCESS;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) {
        return EXIT_FAILURE;
    }
    int code = validate(n);
    printf("%d\\n", code);
    return EXIT_SUCCESS;
}
`,
  }),
  codeQ({
    title: "Error Propagation Across Helpers",
    description:
      "A two-layer helper chain returns -1 to signal errors and sets errno. helper2 returns n*n if n >= 0 (else sets errno=EINVAL and returns -1). helper1 propagates the -1. Read n, call helper1, and print OK result on success or ERROR -1 on failure (errno is also set). Do not use goto or abort.\n\nInput Format:\nA single integer n.\n\nOutput Format:\nA single line: OK result, or ERROR -1.\n\nConstraints:\n-1000 <= n <= 1000",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Error Return Values",
    sampleinput1: "5",
    sampleoutput1: "OK 25",
    sampleinput2: "-3",
    sampleoutput2: "ERROR -1",
    input1: "0",
    output1: "OK 0",
    input2: "10",
    output2: "OK 100",
    input3: "-1",
    output3: "ERROR -1",
    inputconstrains: "-1000 <= n <= 1000",
    blacklist: "goto, abort",
    whitelist: "errno, EINVAL, return",
    sourcecode: `#include <stdio.h>
#include <errno.h>

int helper2(int n) {
    if (n < 0) {
        errno = EINVAL;
        return -1;
    }
    return n * n;
}

int helper1(int n) {
    int r = helper2(n);
    if (r < 0) {
        return -1;
    }
    return r;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) {
        return 1;
    }
    int result = helper1(n);
    if (result < 0) {
        printf("ERROR %d\\n", result);
    } else {
        printf("OK %d\\n", result);
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Multi-Field Validation with Errno",
    description:
      "A form validator checks three fields: age (0-120), score (0-100), grade (1-5). Read age score grade. If any field is out of range, set errno=EINVAL and print INVALID field_name errno_value for the FIRST failing field. Otherwise print ALL_OK. Do not use goto or abort.\n\nInput Format:\nThree space-separated integers: age, score, grade.\n\nOutput Format:\nA single line: ALL_OK, or INVALID field_name errno_value.\n\nConstraints:\n-100 <= age, score, grade <= 200",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Understanding Errors",
    sampleinput1: "20 90 3",
    sampleoutput1: "ALL_OK",
    sampleinput2: "200 90 3",
    sampleoutput2: "INVALID age 22",
    input1: "20 150 3",
    output1: "INVALID score 22",
    input2: "20 90 6",
    output2: "INVALID grade 22",
    input3: "0 0 1",
    output3: "ALL_OK",
    inputconstrains: "-100 <= age, score, grade <= 200",
    blacklist: "goto, abort",
    whitelist: "errno, EINVAL, if (",
    sourcecode: `#include <stdio.h>
#include <errno.h>

int main(void) {
    int age, score, grade;
    if (scanf("%d %d %d", &age, &score, &grade) != 3) {
        return 1;
    }
    if (age < 0 || age > 120) {
        errno = EINVAL;
        printf("INVALID age %d\\n", errno);
    } else if (score < 0 || score > 100) {
        errno = EINVAL;
        printf("INVALID score %d\\n", errno);
    } else if (grade < 1 || grade > 5) {
        errno = EINVAL;
        printf("INVALID grade %d\\n", errno);
    } else {
        printf("ALL_OK\\n");
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Simulated File Open with Strerror",
    description:
      "A file manager simulates opening a file. Read a filename. If the name starts with \"bad_\", the open fails: set errno = ENOENT, log strerror(errno) to stderr, and print OPEN_FAILED errno_value to stdout. Otherwise print OPEN_OK. Do NOT actually call fopen, and do not use assert.\n\nInput Format:\nA single filename token.\n\nOutput Format:\nA single line: OPEN_OK or OPEN_FAILED errno_value.\n\nConstraints:\nFilename length 1 to 64 chars",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Standard I/O Errors",
    sampleinput1: "good.txt",
    sampleoutput1: "OPEN_OK",
    sampleinput2: "bad_file.txt",
    sampleoutput2: "OPEN_FAILED 2",
    input1: "bad_data",
    output1: "OPEN_FAILED 2",
    input2: "test.txt",
    output2: "OPEN_OK",
    input3: "bad_",
    output3: "OPEN_FAILED 2",
    inputconstrains: "Filename length 1 to 64 chars",
    blacklist: "fopen, assert",
    whitelist: "errno, ENOENT, strerror(",
    sourcecode: `#include <stdio.h>
#include <errno.h>
#include <string.h>

int main(void) {
    char name[128];
    if (scanf("%127s", name) != 1) {
        return 1;
    }
    if (strncmp(name, "bad_", 4) == 0) {
        errno = ENOENT;
        char *msg = strerror(errno);
        fprintf(stderr, "open: %s\\n", msg);
        printf("OPEN_FAILED %d\\n", errno);
    } else {
        printf("OPEN_OK\\n");
    }
    return 0;
}
`,
  }),

  /* ── HARD · 4 scenario (blacklist + whitelist) ── */
  codeQ({
    title: "Three-Level Errno Propagation",
    description:
      "A 3-layer validation pipeline checks inputs a, b, c in order: layer 1 (a >= 0 → errno=EINVAL=22 on failure), layer 2 (b >= 0 → errno=ERANGE=34 on failure), layer 3 (c >= 0 → errno=EDOM=33 on failure). Read a b c. If any layer fails, print L<level>_ERROR errno_value for the first failing layer. Otherwise print SUCCESS sum where sum = a + b + c. Do not use goto or abort.\n\nInput Format:\nThree space-separated integers a, b, c.\n\nOutput Format:\nA single line: SUCCESS sum, or L<level>_ERROR errno_value.\n\nConstraints:\n-1000 <= a, b, c <= 1000",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "errno and perror",
    sampleinput1: "1 2 3",
    sampleoutput1: "SUCCESS 6",
    sampleinput2: "-1 2 3",
    sampleoutput2: "L1_ERROR 22",
    input1: "1 -2 3",
    output1: "L2_ERROR 34",
    input2: "1 2 -3",
    output2: "L3_ERROR 33",
    input3: "5 5 5",
    output3: "SUCCESS 15",
    inputconstrains: "-1000 <= a, b, c <= 1000",
    blacklist: "goto, abort",
    whitelist: "errno, EINVAL, ERANGE, EDOM",
    sourcecode: `#include <stdio.h>
#include <errno.h>

int main(void) {
    int a, b, c;
    if (scanf("%d %d %d", &a, &b, &c) != 3) {
        return 1;
    }
    int err_lvl = 0;
    if (a < 0) {
        err_lvl = 1;
        errno = EINVAL;
    } else if (b < 0) {
        err_lvl = 2;
        errno = ERANGE;
    } else if (c < 0) {
        err_lvl = 3;
        errno = EDOM;
    }
    if (err_lvl) {
        printf("L%d_ERROR %d\\n", err_lvl, errno);
    } else {
        printf("SUCCESS %d\\n", a + b + c);
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Opcode Validator with Range Errors",
    description:
      "A calculator CLI takes an opcode (1-5) and a value. Opcode 1 doubles, 2 triples, 3 squares, 4 negates, 5 zeroes. If the opcode is out of [1,5], set errno=EINVAL (22) and print OP_ERR errno_value. If the result exceeds [-1000, 1000], set errno=ERANGE (34) and print RANGE_ERR errno_value. Otherwise print OK result. Do not use goto or abort.\n\nInput Format:\nTwo space-separated integers: opcode and value.\n\nOutput Format:\nA single line: OK result, OP_ERR errno_value, or RANGE_ERR errno_value.\n\nConstraints:\n-1000 <= value <= 1000, opcode in [-1, 10]",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Exit Codes",
    sampleinput1: "1 5",
    sampleoutput1: "OK 10",
    sampleinput2: "3 30",
    sampleoutput2: "OK 900",
    input1: "6 5",
    output1: "OP_ERR 22",
    input2: "3 100",
    output2: "RANGE_ERR 34",
    input3: "4 7",
    output3: "OK -7",
    inputconstrains: "-1000 <= value <= 1000, opcode in [-1, 10]",
    blacklist: "goto, abort",
    whitelist: "errno, EINVAL, ERANGE, switch (",
    sourcecode: `#include <stdio.h>
#include <errno.h>

int main(void) {
    int op, val;
    if (scanf("%d %d", &op, &val) != 2) {
        return 1;
    }
    if (op < 1 || op > 5) {
        errno = EINVAL;
        printf("OP_ERR %d\\n", errno);
        return 0;
    }
    int result;
    switch (op) {
        case 1: result = 2 * val; break;
        case 2: result = 3 * val; break;
        case 3: result = val * val; break;
        case 4: result = -val; break;
        default: result = 0; break;
    }
    if (result > 1000 || result < -1000) {
        errno = ERANGE;
        printf("RANGE_ERR %d\\n", errno);
    } else {
        printf("OK %d\\n", result);
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Defensive Date Parser with Errno",
    description:
      "A date parser reads a date in YYYY-MM-DD format and validates: year in [1900, 2100], month in [1, 12], day in [1, 31]. If any field is invalid, set errno=EINVAL (22) and print INVALID field_index errno_value where field_index is 1 (year), 2 (month), or 3 (day) for the FIRST failing field. If sscanf fails to parse 3 integers, print INVALID 0 0. Otherwise print VALID. Do not use goto or abort.\n\nInput Format:\nA single line in YYYY-MM-DD format.\n\nOutput Format:\nA single line: VALID, INVALID 0 0, or INVALID field_index errno_value.\n\nConstraints:\nYear in [1000, 9999] (parsed as int)",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Standard I/O Errors",
    sampleinput1: "2023-05-15",
    sampleoutput1: "VALID",
    sampleinput2: "1800-05-15",
    sampleoutput2: "INVALID 1 22",
    input1: "2023-13-15",
    output1: "INVALID 2 22",
    input2: "2023-05-32",
    output2: "INVALID 3 22",
    input3: "2023-12-31",
    output3: "VALID",
    inputconstrains: "Year in [1000, 9999]",
    blacklist: "goto, abort",
    whitelist: "errno, EINVAL, sscanf(",
    sourcecode: `#include <stdio.h>
#include <errno.h>

int main(void) {
    char buf[64];
    if (fgets(buf, sizeof(buf), stdin) == 0) {
        return 1;
    }
    int y, m, d;
    int parsed = sscanf(buf, "%d-%d-%d", &y, &m, &d);
    if (parsed != 3) {
        printf("INVALID 0 0\\n");
        return 0;
    }
    if (y < 1900 || y > 2100) {
        errno = EINVAL;
        printf("INVALID 1 %d\\n", errno);
    } else if (m < 1 || m > 12) {
        errno = EINVAL;
        printf("INVALID 2 %d\\n", errno);
    } else if (d < 1 || d > 31) {
        errno = EINVAL;
        printf("INVALID 3 %d\\n", errno);
    } else {
        printf("VALID\\n");
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Retry Loop with EAGAIN Errno",
    description:
      "An I/O client retries a failing operation up to 3 times. The operation succeeds on try N where N = (op_id % 4). If op_id % 4 == 0, it never succeeds within 3 tries. Read op_id. Simulate the retries: print OK try_num if the operation succeeded on try try_num, or set errno=EAGAIN (11) and print FAILED errno_value if all 3 tries failed. Use a for loop for the retry. Do not use goto, while, or assert.\n\nInput Format:\nA single integer op_id.\n\nOutput Format:\nA single line: OK try_num, or FAILED errno_value.\n\nConstraints:\n1 <= op_id <= 100",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Debugging Techniques",
    sampleinput1: "1",
    sampleoutput1: "OK 1",
    sampleinput2: "2",
    sampleoutput2: "OK 2",
    input1: "3",
    output1: "OK 3",
    input2: "4",
    output2: "FAILED 11",
    input3: "8",
    output3: "FAILED 11",
    inputconstrains: "1 <= op_id <= 100",
    blacklist: "goto, while, assert",
    whitelist: "errno, EAGAIN, for (",
    sourcecode: `#include <stdio.h>
#include <errno.h>

int try_op(int op_id, int try_num) {
    int target = op_id % 4;
    if (target == 0) {
        return 0;
    }
    return (try_num >= target) ? 1 : 0;
}

int main(void) {
    int op;
    if (scanf("%d", &op) != 1) {
        return 1;
    }
    int succeeded = 0;
    int last_try = 0;
    for (int try_num = 1; try_num <= 3; try_num++) {
        last_try = try_num;
        if (try_op(op, try_num)) {
            succeeded = 1;
            break;
        }
    }
    if (succeeded) {
        printf("OK %d\\n", last_try);
    } else {
        errno = EAGAIN;
        printf("FAILED %d\\n", errno);
    }
    return 0;
}
`,
  }),
];

/* ────────────────────────────── MCQ QUESTIONS ────────────────────────────── */
const mcqs = [
  /* 10 easy */
  mcq({
    title: "Errno Header File",
    description:
      "Which header file must be included to use the errno variable in C?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "errno and perror",
    Option1: "<stdio.h>",
    Option2: "<stdlib.h>",
    Option3: "<errno.h>",
    Option4: "<string.h>",
    CorrectOption: 3,
  }),
  mcq({
    title: "Strerror Header File",
    description:
      "Which header provides the strerror function?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "errno and perror",
    Option1: "<string.h>",
    Option2: "<errno.h>",
    Option3: "<stdio.h>",
    Option4: "<math.h>",
    CorrectOption: 1,
  }),
  mcq({
    title: "Perror Output Stream",
    description:
      "The perror function writes its output to which stream?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "errno and perror",
    Option1: "stdout",
    Option2: "stderr",
    Option3: "A user-specified stream",
    Option4: "The system log only",
    CorrectOption: 2,
  }),
  mcq({
    title: "EXIT_SUCCESS Value",
    description:
      "The standard value of EXIT_SUCCESS is:",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Exit Codes",
    Option1: "0",
    Option2: "1",
    Option3: "-1",
    Option4: "Undefined",
    CorrectOption: 1,
  }),
  mcq({
    title: "Scanf Return on EOF",
    description:
      "What does scanf return when it encounters EOF before any conversion?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Standard I/O Errors",
    Option1: "0",
    Option2: "-1 (EOF)",
    Option3: "The number of expected conversions",
    Option4: "NULL",
    CorrectOption: 2,
  }),
  mcq({
    title: "Errno Initial Value",
    description:
      "What is the initial value of errno at program startup (per C standard)?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "errno and perror",
    Option1: "0",
    Option2: "-1",
    Option3: "Unspecified",
    Option4: "ENOENT (2)",
    CorrectOption: 1,
  }),
  mcq({
    title: "Common EINVAL Value",
    description:
      "On Linux, what is the numeric value of EINVAL?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "errno and perror",
    Option1: "1",
    Option2: "2",
    Option3: "22",
    Option4: "13",
    CorrectOption: 3,
  }),
  mcq({
    title: "Errno Persistence Across Calls",
    description:
      "After a successful library call, what is the value of errno?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "errno and perror",
    Option1: "It is reset to 0",
    Option2: "It is reset to ENOENT",
    Option3: "It is unchanged from the previous call (a successful call does NOT clear errno)",
    Option4: "It is set to EINVAL",
    CorrectOption: 3,
  }),
  mcq({
    title: "Idiomatic Error Return Sentinel",
    description:
      "Which sentinel value is MOST commonly used to indicate an error return from a C helper function that normally returns a non-negative integer?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Error Return Values",
    Option1: "0",
    Option2: "1",
    Option3: "-1",
    Option4: "NULL",
    CorrectOption: 3,
  }),
  mcq({
    title: "Assert Behavior on Failure",
    description:
      "When the assert macro's expression evaluates to false, what does it do (in a non-NDEBUG build)?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Debugging Techniques",
    Option1: "Returns -1 from the enclosing function",
    Option2: "Prints a diagnostic to stderr and calls abort()",
    Option3: "Sets errno and continues",
    Option4: "Throws an exception",
    CorrectOption: 2,
  }),

  /* 6 medium — at least 4 snippets */
  mcq({
    title: "Errno and Strerror Snippet",
    description:
      "What does the following C snippet print when stdin is '5'?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "errno and perror",
    Option1: "OK 5",
    Option2: "ERROR_CODE 22",
    Option3: "0",
    Option4: "5",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
#include <errno.h>
int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    if (n < 0) {
        errno = EINVAL;
        printf("ERROR_CODE %d\\n", errno);
    } else {
        printf("OK %d\\n", n);
    }
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Scanf Return Check Snippet",
    description:
      "What does the following C snippet print when stdin is 'abc 5'?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Standard I/O Errors",
    Option1: "READ_OK abc 5",
    Option2: "READ_FAIL 0",
    Option3: "READ_FAIL 1",
    Option4: "READ_FAIL 2",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    int a, b;
    int r = scanf("%d %d", &a, &b);
    if (r == 2) {
        printf("READ_OK %d %d\\n", a, b);
    } else {
        printf("READ_FAIL %d\\n", r);
    }
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Exit Failure Helper Snippet",
    description:
      "What does the following C snippet print when stdin is '200'?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Exit Codes",
    Option1: "0",
    Option2: "1",
    Option3: "200",
    Option4: "-1",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
#include <stdlib.h>
int validate(int n) {
    if (n < 0 || n > 100) return EXIT_FAILURE;
    return EXIT_SUCCESS;
}
int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    printf("%d\\n", validate(n));
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Error Propagation Snippet",
    description:
      "What does the following C snippet print when stdin is '-5'?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Error Return Values",
    Option1: "OK 25",
    Option2: "ERROR -1",
    Option3: "OK -5",
    Option4: "OK 0",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
#include <errno.h>
int helper2(int n) {
    if (n < 0) { errno = EINVAL; return -1; }
    return n * n;
}
int helper1(int n) {
    int r = helper2(n);
    if (r < 0) return -1;
    return r;
}
int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 1;
    int r = helper1(n);
    if (r < 0) printf("ERROR %d\\n", r);
    else printf("OK %d\\n", r);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Perror Format Snippet",
    description:
      "If errno is currently 2 (ENOENT) and the program calls perror(\"open\"), what is written to stderr?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "errno and perror",
    Option1: "open",
    Option2: "open: No such file or directory",
    Option3: "No such file or directory",
    Option4: "open: errno=2",
    CorrectOption: 2,
  }),
  mcq({
    title: "Strerror Mapping",
    description:
      "strerror(22) on a Linux glibc system returns a pointer to which string?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "errno and perror",
    Option1: "\"Success\"",
    Option2: "\"No such file or directory\"",
    Option3: "\"Invalid argument\"",
    Option4: "\"Permission denied\"",
    CorrectOption: 3,
  }),

  /* 4 hard — at least 2 snippets */
  mcq({
    title: "Three-Level Errno Snippet",
    description:
      "What does the following C snippet print when stdin is '1 2 -3'?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "errno and perror",
    Option1: "SUCCESS 0",
    Option2: "L1_ERROR 22",
    Option3: "L2_ERROR 34",
    Option4: "L3_ERROR 33",
    CorrectOption: 4,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
#include <errno.h>
int main(void) {
    int a, b, c;
    if (scanf("%d %d %d", &a, &b, &c) != 3) return 1;
    int lvl = 0;
    if (a < 0) { lvl = 1; errno = EINVAL; }
    else if (b < 0) { lvl = 2; errno = ERANGE; }
    else if (c < 0) { lvl = 3; errno = EDOM; }
    if (lvl) printf("L%d_ERROR %d\\n", lvl, errno);
    else printf("SUCCESS %d\\n", a + b + c);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Retry Loop EAGAIN Snippet",
    description:
      "What does the following C snippet print when stdin is '4'?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Debugging Techniques",
    Option1: "OK 1",
    Option2: "OK 2",
    Option3: "OK 3",
    Option4: "FAILED 11",
    CorrectOption: 4,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
#include <errno.h>
int try_op(int op, int t) {
    int target = op % 4;
    if (target == 0) return 0;
    return (t >= target) ? 1 : 0;
}
int main(void) {
    int op;
    if (scanf("%d", &op) != 1) return 1;
    int ok = 0, last = 0;
    for (int t = 1; t <= 3; t++) {
        last = t;
        if (try_op(op, t)) { ok = 1; break; }
    }
    if (ok) printf("OK %d\\n", last);
    else { errno = EAGAIN; printf("FAILED %d\\n", errno); }
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Date Parser Field Index Snippet",
    description:
      "What does the following C snippet print when stdin is '2023-13-15'?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Standard I/O Errors",
    Option1: "VALID",
    Option2: "INVALID 1 22",
    Option3: "INVALID 2 22",
    Option4: "INVALID 3 22",
    CorrectOption: 3,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
#include <errno.h>
int main(void) {
    char buf[64];
    if (fgets(buf, sizeof(buf), stdin) == 0) return 1;
    int y, m, d;
    if (sscanf(buf, "%d-%d-%d", &y, &m, &d) != 3) {
        printf("INVALID 0 0\\n");
        return 0;
    }
    if (y < 1900 || y > 2100) { errno = EINVAL; printf("INVALID 1 %d\\n", errno); }
    else if (m < 1 || m > 12) { errno = EINVAL; printf("INVALID 2 %d\\n", errno); }
    else if (d < 1 || d > 31) { errno = EINVAL; printf("INVALID 3 %d\\n", errno); }
    else printf("VALID\\n");
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Errno After Successful Call",
    description:
      "Why must a C program set errno to 0 BEFORE calling a library function whose failure it wants to detect via errno?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "errno and perror",
    Option1: "Because errno is undefined until explicitly initialized",
    Option2: "Because a successful library call does not reset errno, so a stale value from a previous failed call could be misread as a new error",
    Option3: "Because errno is thread-local and must be reset per-thread",
    Option4: "Because errno must always be 0 at function entry",
    CorrectOption: 2,
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
