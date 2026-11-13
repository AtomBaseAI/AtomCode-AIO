/**
 * Builder for Day 17 — "Command-Line Arguments".
 * Emits:
 *   /home/z/my-project/scripts/c-programming/data/day-17.code.json  (20 code questions)
 *   /home/z/my-project/scripts/c-programming/data/day-17.mcq.json   (20 MCQ questions)
 *
 * IMPORTANT: The judge Lambda runs the binary with NO command-line arguments
 * beyond the program name. We therefore read all "argv-like" tokens from stdin
 * (simulating argv[1..N]) and parse them with atoi/strtol/strcmp/strstr the way
 * real argv-parsing code would. The problem descriptions say so explicitly.
 */
import { writeFileSync } from "node:fs";

const DAY = 17;
const TOPIC = "Command-Line Arguments";
const SUBTOPICS = [
  "argc and argv",
  "Parsing Command-Line Arguments",
  "String to Number Conversion",
  "Flag Parsing",
  "Multiple Argument Handling",
  "Real-world Use Cases",
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
    title: "Simulated argc Token Counter",
    description:
      "A small CLI tool prints how many command-line arguments were passed to it. Since the judge runs the binary without forwarding argv tokens, we simulate them: read space-separated tokens from stdin (these represent argv[1..N]) and print the count. Print just the integer count.\n\nInput Format:\nOne line of space-separated tokens (may be empty line — count is 0).\n\nOutput Format:\nA single integer: the number of tokens.\n\nConstraints:\n0 to 100 tokens, each token up to 64 characters",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "argc and argv",
    sampleinput1: "hello world atom",
    sampleoutput1: "3",
    sampleinput2: "single",
    sampleoutput2: "1",
    input1: "a b c d e",
    output1: "5",
    input2: "one two three",
    output2: "3",
    input3: "x y",
    output3: "2",
    inputconstrains: "0 to 100 tokens, each up to 64 chars",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    char buf[128];
    int argc = 0;
    while (scanf("%127s", buf) == 1) {
        argc++;
    }
    printf("%d\\n", argc);
    return 0;
}
`,
  }),
  codeQ({
    title: "Echo Token List",
    description:
      "An echo-like utility prints its command-line arguments one per line. Simulate argv by reading space-separated tokens from stdin. Print each token on its own line.\n\nInput Format:\nOne line of space-separated tokens.\n\nOutput Format:\nEach token on its own line (in order).\n\nConstraints:\n1 to 50 tokens, each up to 64 characters",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "argc and argv",
    sampleinput1: "alpha beta gamma",
    sampleoutput1: "alpha\nbeta\ngamma",
    sampleinput2: "solo",
    sampleoutput2: "solo",
    input1: "1 2 3",
    output1: "1\n2\n3",
    input2: "atom code rocks",
    output2: "atom\ncode\nrocks",
    input3: "hello",
    output3: "hello",
    inputconstrains: "1 to 50 tokens, each up to 64 chars",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    char buf[128];
    while (scanf("%127s", buf) == 1) {
        printf("%s\\n", buf);
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Atoi Token Conversion",
    description:
      "A CLI tool reads a single numeric argument and prints its value doubled. Simulate argv[1] by reading one token from stdin and convert it to int using atoi. Print 2 * value. If the token is not a valid integer, atoi returns 0 and the output is 0.\n\nInput Format:\nA single token (a numeric string).\n\nOutput Format:\nA single integer: 2 * atoi(token).\n\nConstraints:\nToken represents a value in [-10^9, 10^9]",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "String to Number Conversion",
    sampleinput1: "21",
    sampleoutput1: "42",
    sampleinput2: "0",
    sampleoutput2: "0",
    input1: "100",
    output1: "200",
    input2: "-7",
    output2: "-14",
    input3: "1024",
    output3: "2048",
    inputconstrains: "Token value in [-10^9, 10^9]",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    char buf[64];
    if (scanf("%63s", buf) != 1) {
        return 1;
    }
    int v = atoi(buf);
    printf("%d\\n", 2 * v);
    return 0;
}
`,
  }),
  codeQ({
    title: "Strtol with Base Conversion",
    description:
      "A config tool reads a numeric argument as a string and converts it to long using strtol with base 10. Read one token, convert via strtol, print the resulting long plus 1.\n\nInput Format:\nA single token (a numeric string).\n\nOutput Format:\nA single long integer: strtol(token) + 1.\n\nConstraints:\nToken value fits in long",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "String to Number Conversion",
    sampleinput1: "41",
    sampleoutput1: "42",
    sampleinput2: "0",
    sampleoutput2: "1",
    input1: "999",
    output1: "1000",
    input2: "-100",
    output2: "-99",
    input3: "1234567",
    output3: "1234568",
    inputconstrains: "Token value fits in long",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    char buf[64];
    if (scanf("%63s", buf) != 1) {
        return 1;
    }
    long v = strtol(buf, NULL, 10);
    printf("%ld\\n", v + 1L);
    return 0;
}
`,
  }),
  codeQ({
    title: "Find Specific Token via strcmp",
    description:
      "A CLI reads a target word T followed by N candidate tokens and prints YES if T appears among the candidates (using strcmp), otherwise NO.\n\nInput Format:\nFirst token: the target word T. Remaining tokens: the candidates.\n\nOutput Format:\nYES or NO.\n\nConstraints:\n1 to 50 candidate tokens, each up to 32 chars",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Parsing Command-Line Arguments",
    sampleinput1: "atom code atom rocks",
    sampleoutput1: "YES",
    sampleinput2: "missing a b c",
    sampleoutput2: "NO",
    input1: "x x y z",
    output1: "YES",
    input2: "find no match here",
    output2: "NO",
    input3: "z a b z",
    output3: "YES",
    inputconstrains: "1 to 50 candidate tokens",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>
#include <string.h>

int main(void) {
    char target[64];
    if (scanf("%63s", target) != 1) {
        return 1;
    }
    char cand[64];
    int found = 0;
    while (scanf("%63s", cand) == 1) {
        if (strcmp(cand, target) == 0) {
            found = 1;
            break;
        }
    }
    printf("%s\\n", found ? "YES" : "NO");
    return 0;
}
`,
  }),
  codeQ({
    title: "Detect Verbose Flag",
    description:
      "A program supports the -v verbose flag. Read space-separated tokens (simulating argv). Print VERBOSE if -v appears among them, otherwise QUIET.\n\nInput Format:\nOne line of space-separated tokens (flags and arguments).\n\nOutput Format:\nVERBOSE or QUIET.\n\nConstraints:\n1 to 20 tokens, each up to 32 chars",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Flag Parsing",
    sampleinput1: "-v file.txt",
    sampleoutput1: "VERBOSE",
    sampleinput2: "file.txt",
    sampleoutput2: "QUIET",
    input1: "input.dat -v",
    output1: "VERBOSE",
    input2: "no flags here",
    output2: "QUIET",
    input3: "-v -v -v",
    output3: "VERBOSE",
    inputconstrains: "1 to 20 tokens",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>
#include <string.h>

int main(void) {
    char tok[64];
    int verbose = 0;
    while (scanf("%63s", tok) == 1) {
        if (strcmp(tok, "-v") == 0) {
            verbose = 1;
        }
    }
    printf("%s\\n", verbose ? "VERBOSE" : "QUIET");
    return 0;
}
`,
  }),

  /* ── EASY · 4 scenario ── */
  codeQ({
    title: "Sum Numeric Arguments",
    description:
      "A statistics utility sums all numeric arguments passed to it. Simulate argv by reading space-separated tokens from stdin. Tokens that are valid integers (atoi succeeds with non-zero, or are literally \"0\") are summed; non-numeric tokens are skipped. Print the sum.\n\nInput Format:\nOne line of space-separated tokens.\n\nOutput Format:\nA single integer: the sum of all numeric tokens.\n\nConstraints:\n1 to 50 tokens, sum fits in 32-bit int",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Real-world Use Cases",
    sampleinput1: "10 20 30",
    sampleoutput1: "60",
    sampleinput2: "5 apple 7 banana 3",
    sampleoutput2: "15",
    input1: "1 2 3 4 5",
    output1: "15",
    input2: "100 -50 50",
    output2: "100",
    input3: "0 0 0",
    output3: "0",
    inputconstrains: "1 to 50 tokens",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>

int main(void) {
    char buf[64];
    int sum = 0;
    while (scanf("%63s", buf) == 1) {
        int valid = 1;
        int i = 0;
        if (buf[0] == '-' || buf[0] == '+') {
            i = 1;
        }
        if (buf[i] == 0) {
            valid = 0;
        }
        for (; buf[i]; i++) {
            if (!isdigit((unsigned char)buf[i])) {
                valid = 0;
                break;
            }
        }
        if (valid) {
            sum += atoi(buf);
        }
    }
    printf("%d\\n", sum);
    return 0;
}
`,
  }),
  codeQ({
    title: "Max Numeric Argument Finder",
    description:
      "A utility reads numeric arguments and prints the maximum value. Simulate argv by reading space-separated integer tokens from stdin. Print the maximum integer. At least one valid integer is guaranteed.\n\nInput Format:\nOne line of space-separated integer tokens.\n\nOutput Format:\nA single integer: the maximum value.\n\nConstraints:\n1 to 100 tokens, each in [-10^9, 10^9]",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Real-world Use Cases",
    sampleinput1: "3 7 2 9 4",
    sampleoutput1: "9",
    sampleinput2: "-5 -1 -10",
    sampleoutput2: "-1",
    input1: "42",
    output1: "42",
    input2: "0 0 1 0",
    output2: "1",
    input3: "100 200 50 300 250",
    output3: "300",
    inputconstrains: "1 to 100 integer tokens",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    char buf[64];
    int first = 1;
    int maxv = 0;
    while (scanf("%63s", buf) == 1) {
        int v = atoi(buf);
        if (first || v > maxv) {
            maxv = v;
            first = 0;
        }
    }
    printf("%d\\n", maxv);
    return 0;
}
`,
  }),
  codeQ({
    title: "Concatenate String Arguments",
    description:
      "A small CLI concatenates all string arguments into one line. Simulate argv by reading space-separated tokens from stdin and printing them concatenated with no separator.\n\nInput Format:\nOne line of space-separated tokens.\n\nOutput Format:\nA single line: all tokens concatenated with no separator.\n\nConstraints:\n1 to 50 tokens, each up to 32 chars",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Multiple Argument Handling",
    sampleinput1: "atom code rocks",
    sampleoutput1: "atomcoderocks",
    sampleinput2: "hello world",
    sampleoutput2: "helloworld",
    input1: "a b c",
    output1: "abc",
    input2: "single_token",
    output2: "single_token",
    input3: "x y z",
    output3: "xyz",
    inputconstrains: "1 to 50 tokens",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    char buf[128];
    int first = 1;
    while (scanf("%127s", buf) == 1) {
        printf("%s", buf);
        first = 0;
    }
    printf("\\n");
    return 0;
}
`,
  }),
  codeQ({
    title: "Repeat Token N Times",
    description:
      "A CLI tool reads a word W and a count N, then prints W repeated N times space-separated. Simulate argv[1]=W and argv[2]=N by reading two tokens from stdin.\n\nInput Format:\nTwo space-separated tokens: word W and integer N.\n\nOutput Format:\nW repeated N times, space-separated, on one line. If N is 0, print an empty line.\n\nConstraints:\n1 <= strlen(W) <= 32, 0 <= N <= 100",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Flag Parsing",
    sampleinput1: "ha 3",
    sampleoutput1: "ha ha ha",
    sampleinput2: "x 1",
    sampleoutput2: "x",
    input1: "hello 5",
    output1: "hello hello hello hello hello",
    input2: "ok 4",
    output2: "ok ok ok ok",
    input3: "z 2",
    output3: "z z",
    inputconstrains: "1 <= strlen(W) <= 32, 0 <= N <= 100",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    char w[64];
    char nbuf[64];
    if (scanf("%63s", w) != 1) {
        return 1;
    }
    if (scanf("%63s", nbuf) != 1) {
        return 1;
    }
    int n = atoi(nbuf);
    for (int i = 0; i < n; i++) {
        if (i) {
            printf(" ");
        }
        printf("%s", w);
    }
    printf("\\n");
    return 0;
}
`,
  }),

  /* ── MEDIUM · 6 scenario (blacklist + whitelist) ── */
  codeQ({
    title: "Multi-Flag Configuration Parser",
    description:
      "A CLI tool accepts flags -v (verbose), -q (quiet) and -n NUM (count). Read space-separated tokens simulating argv. Track which of -v and -q were seen, and the last value of -n (default 0). Output three lines: VERBOSE or QUIET (whichever was the LAST among -v/-q seen, default QUIET), then the count value, then the total number of tokens parsed. Do not use strstr for flag detection — use strcmp.\n\nInput Format:\nOne line of space-separated tokens.\n\nOutput Format:\nLine 1: VERBOSE or QUIET. Line 2: the count value. Line 3: total token count.\n\nConstraints:\n1 to 50 tokens",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Flag Parsing",
    sampleinput1: "-v -n 5 file.txt",
    sampleoutput1: "VERBOSE\n5\n4",
    sampleinput2: "-q -n 10",
    sampleoutput2: "QUIET\n10\n3",
    input1: "-v -q",
    output1: "QUIET\n0\n2",
    input2: "-n 100 -v",
    output2: "VERBOSE\n100\n3",
    input3: "-q -v -n 7",
    output3: "VERBOSE\n7\n4",
    inputconstrains: "1 to 50 tokens",
    blacklist: "strstr",
    whitelist: "strcmp(, atoi(, while (",
    sourcecode: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void) {
    char tok[128];
    int verbose = 0;
    int count = 0;
    int total = 0;
    char lastMode[16] = "QUIET";
    while (scanf("%127s", tok) == 1) {
        total++;
        if (strcmp(tok, "-v") == 0) {
            verbose = 1;
            strcpy(lastMode, "VERBOSE");
        } else if (strcmp(tok, "-q") == 0) {
            verbose = 0;
            strcpy(lastMode, "QUIET");
        } else if (strcmp(tok, "-n") == 0) {
            if (scanf("%127s", tok) == 1) {
                count = atoi(tok);
                total++;
            }
        }
    }
    printf("%s\\n%d\\n%d\\n", lastMode, count, total);
    return 0;
}
`,
  }),
  codeQ({
    title: "Operator Args Mini Calculator",
    description:
      "A calculator CLI takes the operator as the first argument and applies it to all remaining numeric arguments. Read tokens: first is one of + - * (the operator). Remaining tokens are integers. Compute the result of applying the operator left-to-right (e.g. + means sum, - means first minus rest, * means product). For division-by-zero or no operands, print 0. Do not use pow or sprintf. Use atoi for conversion.\n\nInput Format:\nFirst token: operator (+, -, *). Remaining tokens: integers.\n\nOutput Format:\nA single integer: the computed result.\n\nConstraints:\n1 to 20 numeric operands, values fit in 32-bit int",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Multiple Argument Handling",
    sampleinput1: "+ 1 2 3 4",
    sampleoutput1: "10",
    sampleinput2: "* 2 3 4",
    sampleoutput2: "24",
    input1: "- 100 30 20",
    output1: "50",
    input2: "+ 5",
    output2: "5",
    input3: "* 1 2 3 4 5",
    output3: "120",
    inputconstrains: "1 to 20 numeric operands",
    blacklist: "pow, sprintf",
    whitelist: "atoi(, strcmp(, for (",
    sourcecode: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void) {
    char op[16];
    if (scanf("%15s", op) != 1) {
        return 1;
    }
    char buf[64];
    int nums[64];
    int n = 0;
    while (scanf("%63s", buf) == 1) {
        nums[n++] = atoi(buf);
    }
    int result;
    if (strcmp(op, "+") == 0) {
        result = 0;
        for (int i = 0; i < n; i++) {
            result += nums[i];
        }
    } else if (strcmp(op, "-") == 0) {
        result = (n > 0) ? nums[0] : 0;
        for (int i = 1; i < n; i++) {
            result -= nums[i];
        }
    } else if (strcmp(op, "*") == 0) {
        result = (n > 0) ? 1 : 0;
        for (int i = 0; i < n; i++) {
            result *= nums[i];
        }
    } else {
        result = 0;
    }
    printf("%d\\n", result);
    return 0;
}
`,
  }),
  codeQ({
    title: "Key=Value Argument Extractor",
    description:
      "A CLI accepts arguments of the form key=value (e.g. name=alice age=30). Read tokens; for each token in that form, store the value for that key (later occurrence overwrites earlier). Then read a final 'query' token and print the value associated with that key, or NOTFOUND if the key was never set. Use strtok to split each token on '='. Do not use strstr.\n\nInput Format:\nOne line of space-separated tokens: zero or more key=value pairs followed by exactly one query key.\n\nOutput Format:\nThe value string for the queried key, or NOTFOUND.\n\nConstraints:\n1 to 20 tokens, each token up to 64 chars",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Parsing Command-Line Arguments",
    sampleinput1: "name=alice age=30 name",
    sampleoutput1: "alice",
    sampleinput2: "name=alice age=30 city",
    sampleoutput2: "NOTFOUND",
    input1: "k=1 k=2 k=3 k",
    output1: "3",
    input2: "a=10 b=20 a",
    output2: "10",
    input3: "x=hello x",
    output3: "hello",
    inputconstrains: "1 to 20 tokens",
    blacklist: "strstr",
    whitelist: "strtok(, strcmp(, strcpy(",
    sourcecode: `#include <stdio.h>
#include <string.h>

int main(void) {
    char tokens[32][80];
    int n = 0;
    while (n < 32 && scanf("%79s", tokens[n]) == 1) {
        n++;
    }
    if (n == 0) {
        return 1;
    }
    char query[80];
    strcpy(query, tokens[n - 1]);
    int m = n - 1;
    char found[80] = "NOTFOUND";
    int got = 0;
    for (int i = 0; i < m; i++) {
        char tmp[80];
        strcpy(tmp, tokens[i]);
        char *k = strtok(tmp, "=");
        char *v = strtok(NULL, "=");
        if (k && v && strcmp(k, query) == 0) {
            strcpy(found, v);
            got = 1;
        }
    }
    printf("%s\\n", found);
    return 0;
}
`,
  }),
  codeQ({
    title: "Long Option Parser with Equals",
    description:
      "A CLI accepts long-form options --verbose, --quiet, and --count=N. Read tokens; track whether --verbose was last seen among verbose/quiet (default quiet), and the last value of --count (default 0). Print two lines: mode (VERBOSE or QUIET) and count. Use strstr to find the --count prefix. Do not use strtok.\n\nInput Format:\nOne line of space-separated tokens.\n\nOutput Format:\nLine 1: VERBOSE or QUIET. Line 2: count value.\n\nConstraints:\n1 to 30 tokens",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Flag Parsing",
    sampleinput1: "--verbose --count=10",
    sampleoutput1: "VERBOSE\n10",
    sampleinput2: "--quiet --count=5 --verbose",
    sampleoutput2: "VERBOSE\n5",
    input1: "--count=42",
    output1: "QUIET\n42",
    input2: "--verbose --verbose",
    output2: "VERBOSE\n0",
    input3: "--quiet --count=3 --quiet",
    output3: "QUIET\n3",
    inputconstrains: "1 to 30 tokens",
    blacklist: "strtok",
    whitelist: "strstr(, strcmp(, while (",
    sourcecode: `#include <stdio.h>
#include <string.h>

int main(void) {
    char tok[128];
    char mode[16] = "QUIET";
    int count = 0;
    while (scanf("%127s", tok) == 1) {
        if (strcmp(tok, "--verbose") == 0) {
            strcpy(mode, "VERBOSE");
        } else if (strcmp(tok, "--quiet") == 0) {
            strcpy(mode, "QUIET");
        } else if (strstr(tok, "--count=") == tok) {
            const char *p = tok + 8;
            int v = 0;
            int sign = 1;
            if (*p == '-') {
                sign = -1;
                p++;
            }
            while (*p >= '0' && *p <= '9') {
                v = v * 10 + (*p - '0');
                p++;
            }
            count = sign * v;
        }
    }
    printf("%s\\n%d\\n", mode, count);
    return 0;
}
`,
  }),
  codeQ({
    title: "Required vs Optional Flag Validator",
    description:
      "A program requires the -i INPUT flag and optionally accepts -o OUTPUT and -v. Read tokens; if -i is missing, print ERROR. Otherwise print OK followed by the input value on the next line and the output value (or NONE) on the third line. Use strcmp to detect flags; do not use strtok.\n\nInput Format:\nOne line of space-separated tokens.\n\nOutput Format:\nLine 1: OK or ERROR. If OK, line 2: input value, line 3: output value or NONE.\n\nConstraints:\n1 to 30 tokens",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Multiple Argument Handling",
    sampleinput1: "-i file.in",
    sampleoutput1: "OK\nfile.in\nNONE",
    sampleinput2: "-i a.in -o b.out -v",
    sampleoutput2: "OK\na.in\nb.out",
    input1: "-o b.out",
    output1: "ERROR",
    input2: "-i data.txt -o log.txt",
    output2: "OK\ndata.txt\nlog.txt",
    input3: "-v -i x",
    output3: "OK\nx\nNONE",
    inputconstrains: "1 to 30 tokens",
    blacklist: "strtok",
    whitelist: "strcmp(, for (, while (",
    sourcecode: `#include <stdio.h>
#include <string.h>

int main(void) {
    char toks[40][80];
    int n = 0;
    while (n < 40 && scanf("%79s", toks[n]) == 1) {
        n++;
    }
    char input[80] = "";
    char output[80] = "";
    int hasInput = 0;
    for (int i = 0; i < n; i++) {
        if (strcmp(toks[i], "-i") == 0 && i + 1 < n) {
            strcpy(input, toks[i + 1]);
            hasInput = 1;
            i++;
        } else if (strcmp(toks[i], "-o") == 0 && i + 1 < n) {
            strcpy(output, toks[i + 1]);
            i++;
        }
    }
    if (!hasInput) {
        printf("ERROR\\n");
    } else {
        printf("OK\\n%s\\n%s\\n", input, output[0] ? output : "NONE");
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Combined Short Flag Unpacker",
    description:
      "A CLI accepts combined short flags like -vq which is equivalent to -v -q. Read tokens; for each token starting with a single '-' (but NOT '--'), unpack each character after the '-' as a separate flag. Print each unpacked flag (-v, -q, -x, etc.) on its own line in the order encountered. Skip tokens that don't start with '-' (they are positional and ignored). Tokens starting with '--' are long options and also ignored. Use strcmp to detect the empty case (skip the leading '-').\n\nInput Format:\nOne line of space-separated tokens.\n\nOutput Format:\nEach unpacked flag (e.g. -v) on its own line, in order.\n\nConstraints:\n1 to 30 tokens",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Flag Parsing",
    sampleinput1: "-vq file.txt",
    sampleoutput1: "-v\n-q",
    sampleinput2: "-abc",
    sampleoutput2: "-a\n-b\n-c",
    input1: "-x --long -y",
    output1: "-x\n-y",
    input2: "-v -v -v",
    output2: "-v\n-v\n-v",
    input3: "-p12",
    output3: "-p\n-1\n-2",
    inputconstrains: "1 to 30 tokens",
    blacklist: "sprintf",
    whitelist: "strcmp(, for (, while (",
    sourcecode: `#include <stdio.h>
#include <string.h>

int main(void) {
    char tok[128];
    while (scanf("%127s", tok) == 1) {
        if (tok[0] != '-') {
            continue;
        }
        if (strcmp(tok, "-") == 0) {
            continue;
        }
        if (tok[1] == '-') {
            continue;
        }
        for (int i = 1; tok[i]; i++) {
            printf("-%c\\n", tok[i]);
        }
    }
    return 0;
}
`,
  }),

  /* ── HARD · 4 scenario (blacklist + whitelist) ── */
  codeQ({
    title: "Auto-Base Integer Argument Converter",
    description:
      "A CLI tool reads a single numeric token and converts it to a long using auto base detection: if the token starts with \"0x\" or \"0X\" parse as base 16; else if it starts with '0' (and has more digits) parse as base 8; else parse as base 10. Use strtol with base 0 if convenient, or implement the detection manually with strcmp/strstr. Print the resulting long. Do not use sscanf for the conversion.\n\nInput Format:\nA single token.\n\nOutput Format:\nA single long integer: the converted value.\n\nConstraints:\nToken length <= 32, value fits in long",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "String to Number Conversion",
    sampleinput1: "0x1A",
    sampleoutput1: "26",
    sampleinput2: "010",
    sampleoutput2: "8",
    input1: "42",
    output1: "42",
    input2: "0xFF",
    output2: "255",
    input3: "0777",
    output3: "511",
    inputconstrains: "Token length <= 32",
    blacklist: "sscanf",
    whitelist: "strtol(, strcmp(, if (",
    sourcecode: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void) {
    char buf[64];
    if (scanf("%63s", buf) != 1) {
        return 1;
    }
    int base = 10;
    int start = 0;
    if (buf[0] == '0' && (buf[1] == 'x' || buf[1] == 'X')) {
        base = 16;
        start = 2;
    } else if (buf[0] == '0' && buf[1] != 0) {
        base = 8;
        start = 1;
    }
    long v;
    if (strcmp(buf, "0") == 0) {
        v = 0;
    } else {
        v = strtol(buf + start, NULL, base);
    }
    printf("%ld\\n", v);
    return 0;
}
`,
  }),
  codeQ({
    title: "Getopt-Style Option and Positional Separator",
    description:
      "A CLI accepts short options -a, -b, -c, an option -n NUM, and a '--' separator that ends option parsing (everything after is positional). Read tokens; count how many times -a, -b, -c each appear (as separate flags or combined like -abc), track the last value of -n (default 0), and collect positional args (those before '--' that are not flags, plus everything after '--'). Print five lines: a-count, b-count, c-count, n-value, total positional count. Do not use strtok or strstr. Use strcmp and explicit loops.\n\nInput Format:\nOne line of space-separated tokens.\n\nOutput Format:\nFive lines: aCount, bCount, cCount, nValue, positionalCount.\n\nConstraints:\n1 to 40 tokens",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Flag Parsing",
    sampleinput1: "-abc -n 5 file1 file2",
    sampleoutput1: "1\n1\n1\n5\n2",
    sampleinput2: "-a -a file -- -n 7 -b",
    sampleoutput2: "2\n0\n0\n0\n4",
    input1: "-bc x y z",
    output1: "0\n1\n1\n0\n3",
    input2: "-n 10 -- abc def",
    output2: "0\n0\n0\n10\n2",
    input3: "-aa -bb -cc",
    output3: "2\n2\n2\n0\n0",
    inputconstrains: "1 to 40 tokens",
    blacklist: "strtok, strstr",
    whitelist: "strcmp(, for (, while (",
    sourcecode: `#include <stdio.h>
#include <string.h>

int main(void) {
    char toks[60][80];
    int n = 0;
    while (n < 60 && scanf("%79s", toks[n]) == 1) {
        n++;
    }
    int aCount = 0, bCount = 0, cCount = 0, nValue = 0, posCount = 0;
    int afterSep = 0;
    for (int i = 0; i < n; i++) {
        if (afterSep) {
            posCount++;
            continue;
        }
        if (strcmp(toks[i], "--") == 0) {
            afterSep = 1;
            continue;
        }
        if (toks[i][0] == '-' && toks[i][1] != 0 && toks[i][1] != '-') {
            int isN = 0;
            for (int j = 1; toks[i][j]; j++) {
                if (toks[i][j] == 'a') aCount++;
                else if (toks[i][j] == 'b') bCount++;
                else if (toks[i][j] == 'c') cCount++;
                else if (toks[i][j] == 'n') {
                    isN = 1;
                }
            }
            if (isN && i + 1 < n) {
                char *endp;
                long v = strtol(toks[i + 1], &endp, 10);
                if (*endp == 0) {
                    nValue = (int)v;
                    i++;
                }
            }
        } else {
            posCount++;
        }
    }
    printf("%d\\n%d\\n%d\\n%d\\n%d\\n", aCount, bCount, cCount, nValue, posCount);
    return 0;
}
`,
  }),
  codeQ({
    title: "Precedence Calculator from Tokens",
    description:
      "A CLI evaluates an infix expression given as space-separated tokens: integers and operators +, -, *. Standard precedence: * binds tighter than + and -. Left-associative. Read tokens (1 to 20 numeric operands with operators between) and print the integer result. Do not use sscanf or strtok. Use strcmp for operator detection and atoi for numeric conversion.\n\nInput Format:\nOne line of space-separated tokens forming a valid infix expression.\n\nOutput Format:\nA single integer: the evaluated result.\n\nConstraints:\n1 to 20 operands, all values fit in 32-bit int",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Multiple Argument Handling",
    sampleinput1: "2 + 3 * 4",
    sampleoutput1: "14",
    sampleinput2: "10 - 2 - 3",
    sampleoutput2: "5",
    input1: "5 * 6 + 7",
    output1: "37",
    input2: "1 + 2 + 3 + 4",
    output2: "10",
    input3: "100 * 2 + 50 * 3",
    output3: "350",
    inputconstrains: "1 to 20 operands",
    blacklist: "sscanf, strtok",
    whitelist: "atoi(, strcmp(, for (",
    sourcecode: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void) {
    char toks[64][32];
    int n = 0;
    while (n < 64 && scanf("%31s", toks[n]) == 1) {
        n++;
    }
    long vals[64];
    int vn = 0;
    char ops[64];
    int on = 0;
    for (int i = 0; i < n; i++) {
        if (strcmp(toks[i], "+") == 0 || strcmp(toks[i], "-") == 0) {
            ops[on++] = toks[i][0];
        } else if (strcmp(toks[i], "*") == 0) {
            if (i + 1 < n) {
                long left = vals[vn - 1];
                long right = (long)atoi(toks[i + 1]);
                vals[vn - 1] = left * right;
                i++;
            }
        } else {
            vals[vn++] = (long)atoi(toks[i]);
        }
    }
    long result = vn > 0 ? vals[0] : 0;
    for (int i = 0; i < on && i + 1 < vn; i++) {
        if (ops[i] == '+') {
            result += vals[i + 1];
        } else if (ops[i] == '-') {
            result -= vals[i + 1];
        }
    }
    printf("%ld\\n", result);
    return 0;
}
`,
  }),
  codeQ({
    title: "Subcommand and Option Router",
    description:
      "A CLI supports subcommands 'add', 'sub', and 'mul'. Each takes a -n NUM flag (count) and a list of values. add sums values, sub subtracts them from first, mul multiplies them. Read tokens: first is subcommand, then -n NUM, then values. Compute and print the result. If subcommand is unknown, print 0. Use strcmp for subcommand and flag detection; do not use strtok or strstr.\n\nInput Format:\nOne line of space-separated tokens: subcommand, -n NUM, then values.\n\nOutput Format:\nA single integer: the computed result.\n\nConstraints:\n1 to 30 tokens",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Real-world Use Cases",
    sampleinput1: "add -n 3 1 2 3",
    sampleoutput1: "6",
    sampleinput2: "mul -n 4 2 3 4 5",
    sampleoutput2: "120",
    input1: "sub -n 3 100 30 20",
    output1: "50",
    input2: "add -n 1 5",
    output2: "5",
    input3: "mul -n 2 7 8",
    output3: "56",
    inputconstrains: "1 to 30 tokens",
    blacklist: "strtok, strstr",
    whitelist: "atoi(, strcmp(, for (",
    sourcecode: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void) {
    char toks[40][80];
    int n = 0;
    while (n < 40 && scanf("%79s", toks[n]) == 1) {
        n++;
    }
    if (n == 0) {
        return 1;
    }
    char cmd[80];
    strcpy(cmd, toks[0]);
    int values[40];
    int vn = 0;
    int nValue = 0;
    for (int i = 1; i < n; i++) {
        if (strcmp(toks[i], "-n") == 0 && i + 1 < n) {
            nValue = atoi(toks[i + 1]);
            i++;
        } else {
            values[vn++] = atoi(toks[i]);
        }
    }
    long result;
    if (strcmp(cmd, "add") == 0) {
        result = 0;
        for (int i = 0; i < vn; i++) {
            result += values[i];
        }
    } else if (strcmp(cmd, "sub") == 0) {
        result = vn > 0 ? values[0] : 0;
        for (int i = 1; i < vn; i++) {
            result -= values[i];
        }
    } else if (strcmp(cmd, "mul") == 0) {
        result = vn > 0 ? 1 : 0;
        for (int i = 0; i < vn; i++) {
            result *= values[i];
        }
    } else {
        result = 0;
    }
    printf("%ld\\n", result);
    return 0;
}
`,
  }),
];

/* ────────────────────────────── MCQ QUESTIONS ────────────────────────────── */
const mcqs = [
  /* 10 easy */
  mcq({
    title: "argc Convention",
    description:
      "In a C program declared as `int main(int argc, char *argv[])`, what does argc represent?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "argc and argv",
    Option1: "The number of environment variables",
    Option2: "The total number of command-line arguments including the program name",
    Option3: "The number of command-line arguments excluding the program name",
    Option4: "The length of argv[0]",
    CorrectOption: 2,
  }),
  mcq({
    title: "argv[0] Convention",
    description:
      "By convention, what does argv[0] contain when a C program is launched?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "argc and argv",
    Option1: "The first user-supplied argument",
    Option2: "The program's exit code",
    Option3: "The program's name as it was invoked",
    Option4: "A null pointer",
    CorrectOption: 3,
  }),
  mcq({
    title: "atoi Behavior on Invalid Input",
    description:
      "What does `atoi(\"hello\")` return?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "String to Number Conversion",
    Option1: "0",
    Option2: "-1",
    Option3: "A random value",
    Option4: "It aborts the program",
    CorrectOption: 1,
  }),
  mcq({
    title: "strtol Returns What Type",
    description:
      "What is the return type of `strtol` in C?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "String to Number Conversion",
    Option1: "int",
    Option2: "long",
    Option3: "unsigned int",
    Option4: "double",
    CorrectOption: 2,
  }),
  mcq({
    title: "Detect Flag with strcmp",
    description:
      "To detect the flag \"-v\" in argv[i], the idiomatic C check is:",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Flag Parsing",
    Option1: "if (argv[i] == \"-v\")",
    Option2: "if (argv[i][0] == '-')",
    Option3: "if (strcmp(argv[i], \"-v\") == 0)",
    Option4: "if (argv[i].equals(\"-v\"))",
    CorrectOption: 3,
  }),
  mcq({
    title: "Parsing Numeric argv",
    description:
      "Which function is the LEAST recommended for parsing a numeric argv token, because it gives no error indication?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "String to Number Conversion",
    Option1: "strtol with endptr check",
    Option2: "sscanf with %ld and return-value check",
    Option3: "atoi",
    Option4: "strtoul with endptr check",
    CorrectOption: 3,
  }),
  mcq({
    title: "argv Type",
    description:
      "In `int main(int argc, char *argv[])`, what is the type of argv?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "argc and argv",
    Option1: "char **",
    Option2: "char [][]",
    Option3: "char *[]",
    Option4: "Both Option 1 and 3 are equivalent valid interpretations",
    CorrectOption: 4,
  }),
  mcq({
    title: "Out-of-Range argv Access",
    description:
      "What happens if a program accesses argv[argc]?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "argc and argv",
    Option1: "It returns the program name",
    Option2: "It returns NULL (the standard guarantees argv[argc] is NULL)",
    Option3: "It returns an empty string",
    Option4: "It returns garbage memory",
    CorrectOption: 2,
  }),
  mcq({
    title: "Common CLI Flag Convention",
    description:
      "Which convention is widely used for short single-character flags in C CLI tools?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Flag Parsing",
    Option1: "Flags are prefixed with a single dash, like -v",
    Option2: "Flags are prefixed with a plus sign, like +v",
    Option3: "Flags are surrounded by square brackets like [v]",
    Option4: "Flags have no prefix at all",
    CorrectOption: 1,
  }),
  mcq({
    title: "Long Option Convention",
    description:
      "Which convention is widely used for long multi-character options in C CLI tools?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Flag Parsing",
    Option1: "Single dash like -verbose",
    Option2: "Double dash like --verbose",
    Option3: "Forward slash like /verbose",
    Option4: "Tilde prefix like ~verbose",
    CorrectOption: 2,
  }),

  /* 6 medium — at least 4 snippets */
  mcq({
    title: "Strtol Endptr Snippet",
    description:
      "What does the following C snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "String to Number Conversion",
    Option1: "42 hello",
    Option2: "42",
    Option3: "0",
    Option4: "Compile error",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
#include <stdlib.h>
int main(void) {
    char *endp;
    long v = strtol("42hello", &endp, 10);
    printf("%ld %s\\n", v, endp);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Strcmp Flag Detection Snippet",
    description:
      "What does the following C snippet print when run with stdin 'a b'?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Flag Parsing",
    Option1: "YES",
    Option2: "NO",
    Option3: "1",
    Option4: "0",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
#include <string.h>
int main(void) {
    char buf[64];
    int found = 0;
    while (scanf("%63s", buf) == 1) {
        if (strcmp(buf, "a") == 0) found = 1;
    }
    printf("%s\\n", found ? "YES" : "NO");
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Atoi Doubling Snippet",
    description:
      "What does the following C snippet print when stdin is '21'?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "String to Number Conversion",
    Option1: "21",
    Option2: "42",
    Option3: "0",
    Option4: "2",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
#include <stdlib.h>
int main(void) {
    char buf[64];
    if (scanf("%63s", buf) != 1) return 1;
    int v = atoi(buf);
    printf("%d\\n", 2 * v);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Token Count Loop Snippet",
    description:
      "What does the following C snippet print when stdin is 'alpha beta gamma delta'?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "argc and argv",
    Option1: "3",
    Option2: "4",
    Option3: "5",
    Option4: "0",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    char buf[128];
    int c = 0;
    while (scanf("%127s", buf) == 1) c++;
    printf("%d\\n", c);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Strstr Substring Search Snippet",
    description:
      "What does the following C snippet print when stdin is '--count=7'?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Parsing Command-Line Arguments",
    Option1: "FOUND",
    Option2: "NOTFOUND",
    Option3: "0",
    Option4: "1",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
#include <string.h>
int main(void) {
    char tok[128];
    if (scanf("%127s", tok) != 1) return 1;
    if (strstr(tok, "--count=") == tok) {
        printf("FOUND\\n");
    } else {
        printf("NOTFOUND\\n");
    }
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Strtok Split Key=Value",
    description:
      "When parsing a token \"name=alice\" with `strtok(token, \"=\")` followed by `strtok(NULL, \"=\")`, what do the two calls return?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Parsing Command-Line Arguments",
    Option1: "First: \"name\", Second: \"alice\"",
    Option2: "First: \"alice\", Second: \"name\"",
    Option3: "First: \"name=alice\", Second: NULL",
    Option4: "Both return NULL",
    CorrectOption: 1,
  }),

  /* 4 hard — at least 2 snippets */
  mcq({
    title: "Base Auto-Detect strtol Snippet",
    description:
      "What does the following C snippet print when stdin is '0x1A'?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "String to Number Conversion",
    Option1: "16",
    Option2: "26",
    Option3: "0",
    Option4: "1",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
#include <stdlib.h>
int main(void) {
    char buf[64];
    if (scanf("%63s", buf) != 1) return 1;
    long v = strtol(buf, NULL, 0);
    printf("%ld\\n", v);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Combined Flag Unpacking Snippet",
    description:
      "What does the following C snippet print when stdin is '-vq'?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Flag Parsing",
    Option1: "-v",
    Option2: "-v\\n-q (two lines)",
    Option3: "vq",
    Option4: "Nothing",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
#include <string.h>
int main(void) {
    char tok[128];
    if (scanf("%127s", tok) != 1) return 1;
    if (tok[0] == '-' && tok[1] != '-' && tok[1] != 0) {
        for (int i = 1; tok[i]; i++) {
            printf("-%c\\n", tok[i]);
        }
    }
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Precedence in Tokenized Calculator",
    description:
      "When evaluating the tokenized infix expression `2 + 3 * 4` left-to-right WITHOUT precedence, what result do you get? (This is why precedence-aware parsing matters.)",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Multiple Argument Handling",
    Option1: "14 (correct, with precedence)",
    Option2: "20 (incorrect, naive left-to-right)",
    Option3: "24",
    Option4: "11",
    CorrectOption: 2,
  }),
  mcq({
    title: "Subcommand Router Pattern",
    description:
      "When implementing a CLI subcommand router (e.g. add/sub/mul) in C, which is the BEST first step after parsing all argv-like tokens?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Real-world Use Cases",
    Option1: "Dispatch on argv[1] using strcmp against known subcommand names",
    Option2: "Convert every token to int with atoi first",
    Option3: "Open a configuration file",
    Option4: "Print argv[0] and exit",
    CorrectOption: 1,
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
