/**
 * Builder for Day 20 — "File Handling in C".
 * Emits:
 *   /home/z/my-project/scripts/c-programming/data/day-20.code.json  (20 code questions)
 *   /home/z/my-project/scripts/c-programming/data/day-20.mcq.json   (20 MCQ questions)
 *
 * Design notes:
 *   - Each test case uses mode "w" (truncate) on its /tmp path so that the
 *     file's state is deterministic for each run of the program (the file
 *     persists across test cases within a single Lambda invocation but each
 *     test case truncates before writing its own data).
 *   - Every fopen call is checked against NULL (returns are inspected), and
 *     every fopen that succeeds is paired with an fclose.
 *   - For binary questions we use natural-alignment structs (int+int,
 *     int+int+double) so there is no padding ambiguity across compilers.
 *   - All paths live under /tmp/atom_day20_*.txt or .bin which is unique per
 *     question so concurrent validator runs do not collide on shared files.
 *   - Escape sequences in C source use \\n / \\\\ etc. (TS template literal
 *     preserves them verbatim into the JSON string).
 */
import { writeFileSync } from "node:fs";

const DAY = 20;
const TOPIC = "File Handling in C";
const SUBTOPICS = [
  "Opening and Closing Files",
  "File Modes r w a",
  "Reading from Files",
  "Writing to Files",
  "Binary File Operations",
  "Error Handling in File Operations",
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
    title: "Integer File Echo Drill",
    description:
      "Read an integer n from stdin. Open the file /tmp/atom_day20_int.txt in write mode, write n to it, then close the file. Reopen the file in read mode, read the integer back, and print GOT <value>.\n\nInput Format:\nA single integer n.\n\nOutput Format:\nA single line: GOT <n>.\n\nConstraints:\n-100000 <= n <= 100000",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Opening and Closing Files",
    sampleinput1: "42",
    sampleoutput1: "GOT 42",
    sampleinput2: "100",
    sampleoutput2: "GOT 100",
    input1: "0",
    output1: "GOT 0",
    input2: "-7",
    output2: "GOT -7",
    input3: "99999",
    output3: "GOT 99999",
    inputconstrains: "-100000 <= n <= 100000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) {
        return 1;
    }
    FILE *fp = fopen("/tmp/atom_day20_int.txt", "w");
    if (fp == NULL) {
        printf("OPEN_FAIL\\n");
        return 0;
    }
    fprintf(fp, "%d\\n", n);
    fclose(fp);
    fp = fopen("/tmp/atom_day20_int.txt", "r");
    if (fp == NULL) {
        printf("OPEN_FAIL\\n");
        return 0;
    }
    int m;
    if (fscanf(fp, "%d", &m) != 1) {
        fclose(fp);
        return 1;
    }
    fclose(fp);
    printf("GOT %d\\n", m);
    return 0;
}
`,
  }),
  codeQ({
    title: "File Modes r w a Drill",
    description:
      "Read an integer n from stdin. Using the file /tmp/atom_day20_mode.txt demonstrate all three text modes: first open in \"w\" mode and write n, then close; reopen in \"a\" mode and write n+1, then close; reopen in \"r\" mode and read both integers, then close. Print VALUES <n> <n+1>.\n\nInput Format:\nA single integer n.\n\nOutput Format:\nA single line: VALUES <n> <n+1>.\n\nConstraints:\n-100000 <= n <= 100000",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "File Modes r w a",
    sampleinput1: "5",
    sampleoutput1: "VALUES 5 6",
    sampleinput2: "10",
    sampleoutput2: "VALUES 10 11",
    input1: "0",
    output1: "VALUES 0 1",
    input2: "-3",
    output2: "VALUES -3 -2",
    input3: "99",
    output3: "VALUES 99 100",
    inputconstrains: "-100000 <= n <= 100000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) {
        return 1;
    }
    FILE *fp = fopen("/tmp/atom_day20_mode.txt", "w");
    if (fp == NULL) {
        printf("OPEN_FAIL\\n");
        return 0;
    }
    fprintf(fp, "%d\\n", n);
    fclose(fp);
    fp = fopen("/tmp/atom_day20_mode.txt", "a");
    if (fp == NULL) {
        printf("OPEN_FAIL\\n");
        return 0;
    }
    fprintf(fp, "%d\\n", n + 1);
    fclose(fp);
    fp = fopen("/tmp/atom_day20_mode.txt", "r");
    if (fp == NULL) {
        printf("OPEN_FAIL\\n");
        return 0;
    }
    int a, b;
    if (fscanf(fp, "%d %d", &a, &b) != 2) {
        fclose(fp);
        return 1;
    }
    fclose(fp);
    printf("VALUES %d %d\\n", a, b);
    return 0;
}
`,
  }),
  codeQ({
    title: "Read Line from File Drill",
    description:
      "Read a single line of text (up to 255 characters) from stdin. Write that line to /tmp/atom_day20_line.txt in write mode, then close. Reopen the file in read mode, use fgets to read the line back into a buffer, strip the trailing newline if present, then close the file and print the line.\n\nInput Format:\nA single line of text (no leading/trailing spaces, may contain interior spaces).\n\nOutput Format:\nA single line containing the text that was written.\n\nConstraints:\nLine length 1..255",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Reading from Files",
    sampleinput1: "hello world",
    sampleoutput1: "hello world",
    sampleinput2: "atomcode",
    sampleoutput2: "atomcode",
    input1: "C programming",
    output1: "C programming",
    input2: "file_io",
    output2: "file_io",
    input3: "open close read write",
    output3: "open close read write",
    inputconstrains: "Line length 1..255",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>
#include <string.h>

int main(void) {
    char buf[256];
    if (fgets(buf, sizeof(buf), stdin) == NULL) {
        return 1;
    }
    buf[strcspn(buf, "\\n")] = 0;
    FILE *fp = fopen("/tmp/atom_day20_line.txt", "w");
    if (fp == NULL) {
        printf("OPEN_FAIL\\n");
        return 0;
    }
    fprintf(fp, "%s\\n", buf);
    fclose(fp);
    fp = fopen("/tmp/atom_day20_line.txt", "r");
    if (fp == NULL) {
        printf("OPEN_FAIL\\n");
        return 0;
    }
    char rb[256];
    if (fgets(rb, sizeof(rb), fp) == NULL) {
        fclose(fp);
        return 1;
    }
    rb[strcspn(rb, "\\n")] = 0;
    fclose(fp);
    printf("%s\\n", rb);
    return 0;
}
`,
  }),
  codeQ({
    title: "Write Numbers File Drill",
    description:
      "Read an integer N followed by N integers from stdin. Write each integer on its own line to /tmp/atom_day20_nums.txt in write mode, then close. Reopen the file in read mode and count how many integers can be read back (using fscanf in a loop), then close. Print COUNT <k>.\n\nInput Format:\nLine 1: integer N. Line 2: N space-separated integers.\n\nOutput Format:\nA single line: COUNT <k> where k is the number of integers read back.\n\nConstraints:\n1 <= N <= 1000, -10000 <= each integer <= 10000",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Writing to Files",
    sampleinput1: "3\n10 20 30",
    sampleoutput1: "COUNT 3",
    sampleinput2: "5\n1 2 3 4 5",
    sampleoutput2: "COUNT 5",
    input1: "1\n42",
    output1: "COUNT 1",
    input2: "4\n-1 0 1 2",
    output2: "COUNT 4",
    input3: "2\n100 200",
    output3: "COUNT 2",
    inputconstrains: "1 <= N <= 1000, -10000 <= each integer <= 10000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) {
        return 1;
    }
    int arr[1000];
    for (int i = 0; i < n; i++) {
        if (scanf("%d", &arr[i]) != 1) {
            return 1;
        }
    }
    FILE *fp = fopen("/tmp/atom_day20_nums.txt", "w");
    if (fp == NULL) {
        printf("OPEN_FAIL\\n");
        return 0;
    }
    for (int i = 0; i < n; i++) {
        fprintf(fp, "%d\\n", arr[i]);
    }
    fclose(fp);
    fp = fopen("/tmp/atom_day20_nums.txt", "r");
    if (fp == NULL) {
        printf("OPEN_FAIL\\n");
        return 0;
    }
    int count = 0;
    int v;
    while (fscanf(fp, "%d", &v) == 1) {
        count++;
    }
    fclose(fp);
    printf("COUNT %d\\n", count);
    return 0;
}
`,
  }),
  codeQ({
    title: "Binary Int Archive Drill",
    description:
      "Read an integer n from stdin. Open /tmp/atom_day20_binint.bin in binary write mode (\"wb\") and write the integer using fwrite, then close. Reopen the file in binary read mode (\"rb\"), use fread to read the integer back, then close. Print BIN <value>.\n\nInput Format:\nA single integer n.\n\nOutput Format:\nA single line: BIN <n>.\n\nConstraints:\n-100000 <= n <= 100000",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Binary File Operations",
    sampleinput1: "77",
    sampleoutput1: "BIN 77",
    sampleinput2: "256",
    sampleoutput2: "BIN 256",
    input1: "0",
    output1: "BIN 0",
    input2: "-15",
    output2: "BIN -15",
    input3: "12345",
    output3: "BIN 12345",
    inputconstrains: "-100000 <= n <= 100000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) {
        return 1;
    }
    FILE *fp = fopen("/tmp/atom_day20_binint.bin", "wb");
    if (fp == NULL) {
        printf("OPEN_FAIL\\n");
        return 0;
    }
    fwrite(&n, sizeof(int), 1, fp);
    fclose(fp);
    fp = fopen("/tmp/atom_day20_binint.bin", "rb");
    if (fp == NULL) {
        printf("OPEN_FAIL\\n");
        return 0;
    }
    int m;
    if (fread(&m, sizeof(int), 1, fp) != 1) {
        fclose(fp);
        return 1;
    }
    fclose(fp);
    printf("BIN %d\\n", m);
    return 0;
}
`,
  }),
  codeQ({
    title: "File Open NULL Guard Drill",
    description:
      "Read an integer n from stdin. Open /tmp/atom_day20_guard.txt in write mode; if fopen returns NULL, print FAIL and stop. Otherwise write n to the file, close, then reopen in read mode (also checking for NULL and printing FAIL on failure), read the integer back, close, and print OK <value>.\n\nInput Format:\nA single integer n.\n\nOutput Format:\nA single line: OK <n> on success, or FAIL if any fopen returns NULL.\n\nConstraints:\n-100000 <= n <= 100000",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Error Handling in File Operations",
    sampleinput1: "55",
    sampleoutput1: "OK 55",
    sampleinput2: "300",
    sampleoutput2: "OK 300",
    input1: "0",
    output1: "OK 0",
    input2: "-9",
    output2: "OK -9",
    input3: "8888",
    output3: "OK 8888",
    inputconstrains: "-100000 <= n <= 100000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) {
        return 1;
    }
    FILE *fp = fopen("/tmp/atom_day20_guard.txt", "w");
    if (fp == NULL) {
        printf("FAIL\\n");
        return 0;
    }
    fprintf(fp, "%d\\n", n);
    fclose(fp);
    fp = fopen("/tmp/atom_day20_guard.txt", "r");
    if (fp == NULL) {
        printf("FAIL\\n");
        return 0;
    }
    int m;
    if (fscanf(fp, "%d", &m) != 1) {
        fclose(fp);
        return 1;
    }
    fclose(fp);
    printf("OK %d\\n", m);
    return 0;
}
`,
  }),

  /* ── EASY · 4 scenario ── */
  codeQ({
    title: "Inventory Quantity Ledger Writer",
    description:
      "A warehouse clerk records a single quantity q (the number of units received in a shipment). Write q to /tmp/atom_day20_inv.txt as text in write mode, then close. Reopen the file in read mode, read the integer back, close, and print STORED <q> to confirm the persistence round-trip.\n\nInput Format:\nA single integer q.\n\nOutput Format:\nA single line: STORED <q>.\n\nConstraints:\n0 <= q <= 100000",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Writing to Files",
    sampleinput1: "250",
    sampleoutput1: "STORED 250",
    sampleinput2: "1000",
    sampleoutput2: "STORED 1000",
    input1: "0",
    output1: "STORED 0",
    input2: "47",
    output2: "STORED 47",
    input3: "9999",
    output3: "STORED 9999",
    inputconstrains: "0 <= q <= 100000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int q;
    if (scanf("%d", &q) != 1) {
        return 1;
    }
    FILE *fp = fopen("/tmp/atom_day20_inv.txt", "w");
    if (fp == NULL) {
        printf("OPEN_FAIL\\n");
        return 0;
    }
    fprintf(fp, "%d\\n", q);
    fclose(fp);
    fp = fopen("/tmp/atom_day20_inv.txt", "r");
    if (fp == NULL) {
        printf("OPEN_FAIL\\n");
        return 0;
    }
    int v;
    if (fscanf(fp, "%d", &v) != 1) {
        fclose(fp);
        return 1;
    }
    fclose(fp);
    printf("STORED %d\\n", v);
    return 0;
}
`,
  }),
  codeQ({
    title: "Student Score Card Recorder",
    description:
      "A teacher records a single student's exam score s on a card persisted at /tmp/atom_day20_score.txt. Write s to the file in write mode, close, reopen in read mode, read the score back, close, and print SCORE <s> <grade> where grade is A when s >= 80, B when 60 <= s < 80, otherwise F.\n\nInput Format:\nA single integer s.\n\nOutput Format:\nA single line: SCORE <s> <grade>.\n\nConstraints:\n0 <= s <= 100",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Reading from Files",
    sampleinput1: "85",
    sampleoutput1: "SCORE 85 A",
    sampleinput2: "50",
    sampleoutput2: "SCORE 50 F",
    input1: "65",
    output1: "SCORE 65 B",
    input2: "100",
    output2: "SCORE 100 A",
    input3: "60",
    output3: "SCORE 60 B",
    inputconstrains: "0 <= s <= 100",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int s;
    if (scanf("%d", &s) != 1) {
        return 1;
    }
    FILE *fp = fopen("/tmp/atom_day20_score.txt", "w");
    if (fp == NULL) {
        printf("OPEN_FAIL\\n");
        return 0;
    }
    fprintf(fp, "%d\\n", s);
    fclose(fp);
    fp = fopen("/tmp/atom_day20_score.txt", "r");
    if (fp == NULL) {
        printf("OPEN_FAIL\\n");
        return 0;
    }
    int v;
    if (fscanf(fp, "%d", &v) != 1) {
        fclose(fp);
        return 1;
    }
    fclose(fp);
    char grade;
    if (v >= 80) {
        grade = 'A';
    } else if (v >= 60) {
        grade = 'B';
    } else {
        grade = 'F';
    }
    printf("SCORE %d %c\\n", v, grade);
    return 0;
}
`,
  }),
  codeQ({
    title: "Sensor Log Append Drill",
    description:
      "An environmental sensor logs a temperature reading t (in degrees Celsius). First write t to /tmp/atom_day20_sensor.txt in write mode, then close. Then reopen the file in append mode (\"a\") and write t+1 (a calibration-adjusted reading), then close. Finally reopen the file in read mode, read both integers back, then close and print LOG <t> <t+1>.\n\nInput Format:\nA single integer t.\n\nOutput Format:\nA single line: LOG <t> <t+1>.\n\nConstraints:\n-50 <= t <= 100",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "File Modes r w a",
    sampleinput1: "20",
    sampleoutput1: "LOG 20 21",
    sampleinput2: "35",
    sampleoutput2: "LOG 35 36",
    input1: "0",
    output1: "LOG 0 1",
    input2: "-10",
    output2: "LOG -10 -9",
    input3: "100",
    output3: "LOG 100 101",
    inputconstrains: "-50 <= t <= 100",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int t;
    if (scanf("%d", &t) != 1) {
        return 1;
    }
    FILE *fp = fopen("/tmp/atom_day20_sensor.txt", "w");
    if (fp == NULL) {
        printf("OPEN_FAIL\\n");
        return 0;
    }
    fprintf(fp, "%d\\n", t);
    fclose(fp);
    fp = fopen("/tmp/atom_day20_sensor.txt", "a");
    if (fp == NULL) {
        printf("OPEN_FAIL\\n");
        return 0;
    }
    fprintf(fp, "%d\\n", t + 1);
    fclose(fp);
    fp = fopen("/tmp/atom_day20_sensor.txt", "r");
    if (fp == NULL) {
        printf("OPEN_FAIL\\n");
        return 0;
    }
    int a, b;
    if (fscanf(fp, "%d %d", &a, &b) != 2) {
        fclose(fp);
        return 1;
    }
    fclose(fp);
    printf("LOG %d %d\\n", a, b);
    return 0;
}
`,
  }),
  codeQ({
    title: "Config File Read-back Reporter",
    description:
      "A daemon writes a port-number config line of the form PORT=<p> to /tmp/atom_day20_cfg.txt. Read the port p from stdin, write the config line in write mode, then close. Reopen the file in read mode, read its entire content character-by-character using fgetc and echo each byte to stdout, then close.\n\nInput Format:\nA single integer p (the port number).\n\nOutput Format:\nThe exact file content, which is the line PORT=<p> followed by a newline.\n\nConstraints:\n0 <= p <= 65535",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Opening and Closing Files",
    sampleinput1: "8080",
    sampleoutput1: "PORT=8080",
    sampleinput2: "443",
    sampleoutput2: "PORT=443",
    input1: "22",
    output1: "PORT=22",
    input2: "3000",
    output2: "PORT=3000",
    input3: "65535",
    output3: "PORT=65535",
    inputconstrains: "0 <= p <= 65535",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>

int main(void) {
    int p;
    if (scanf("%d", &p) != 1) {
        return 1;
    }
    FILE *fp = fopen("/tmp/atom_day20_cfg.txt", "w");
    if (fp == NULL) {
        printf("OPEN_FAIL\\n");
        return 0;
    }
    fprintf(fp, "PORT=%d\\n", p);
    fclose(fp);
    fp = fopen("/tmp/atom_day20_cfg.txt", "r");
    if (fp == NULL) {
        printf("OPEN_FAIL\\n");
        return 0;
    }
    int c;
    while ((c = fgetc(fp)) != EOF) {
        putchar(c);
    }
    fclose(fp);
    return 0;
}
`,
  }),

  /* ── MEDIUM · 6 scenario ── */
  codeQ({
    title: "Classroom Marks File Aggregator",
    description:
      "A teacher wants to compute the total of a class's marks but the school's grading tool only exposes file I/O primitives — no fscanf/fgets for reading back the marks file. Read N then N integers from stdin, write each on its own line to /tmp/atom_day20_marks.txt in write mode, then close. Reopen the file in read mode, parse the integers manually using fgetc (digit by digit, respecting a leading minus sign), compute the sum, then close and print SUM <s>.\n\nInput Format:\nLine 1: integer N. Line 2: N space-separated integers.\n\nOutput Format:\nA single line: SUM <s>.\n\nConstraints:\n1 <= N <= 1000, -10000 <= each mark <= 10000",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Reading from Files",
    sampleinput1: "3\n80 90 70",
    sampleoutput1: "SUM 240",
    sampleinput2: "4\n10 20 30 40",
    sampleoutput2: "SUM 100",
    input1: "1\n55",
    output1: "SUM 55",
    input2: "5\n-10 5 -3 8 0",
    output2: "SUM 0",
    input3: "2\n100 200",
    output3: "SUM 300",
    inputconstrains: "1 <= N <= 1000, -10000 <= each mark <= 10000",
    blacklist: "fscanf(, fgets(, fread(",
    whitelist: "fopen(, fclose(, fgetc(, printf(",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) {
        return 1;
    }
    int arr[1000];
    for (int i = 0; i < n; i++) {
        if (scanf("%d", &arr[i]) != 1) {
            return 1;
        }
    }
    FILE *fp = fopen("/tmp/atom_day20_marks.txt", "w");
    if (fp == NULL) {
        printf("OPEN_FAIL\\n");
        return 0;
    }
    for (int i = 0; i < n; i++) {
        fprintf(fp, "%d\\n", arr[i]);
    }
    fclose(fp);
    fp = fopen("/tmp/atom_day20_marks.txt", "r");
    if (fp == NULL) {
        printf("OPEN_FAIL\\n");
        return 0;
    }
    int sum = 0;
    int c;
    int sign = 1;
    int in_num = 0;
    int cur = 0;
    while ((c = fgetc(fp)) != EOF) {
        if (c == '-') {
            sign = -1;
        } else if (c >= '0' && c <= '9') {
            cur = cur * 10 + (c - '0');
            in_num = 1;
        } else {
            if (in_num) {
                sum += sign * cur;
                cur = 0;
                sign = 1;
                in_num = 0;
            }
        }
    }
    if (in_num) {
        sum += sign * cur;
    }
    fclose(fp);
    printf("SUM %d\\n", sum);
    return 0;
}
`,
  }),
  codeQ({
    title: "Warehouse Stock Append Log",
    description:
      "A warehouse records N stock movements (signed integers: positive means inbound, negative means outbound). Open /tmp/atom_day20_stock.txt in write mode and write the first movement, then close. Reopen in append mode and write the remaining movements, then close. Reopen in read mode, parse all integers manually with fgetc (no fscanf/fgets/fread allowed), compute the net stock movement, then close and print NET <x>.\n\nInput Format:\nLine 1: integer N. Line 2: N space-separated signed integers.\n\nOutput Format:\nA single line: NET <x>.\n\nConstraints:\n1 <= N <= 1000, -10000 <= each movement <= 10000",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "File Modes r w a",
    sampleinput1: "3\n10 -5 3",
    sampleoutput1: "NET 8",
    sampleinput2: "4\n100 50 -30 20",
    sampleoutput2: "NET 140",
    input1: "1\n42",
    output1: "NET 42",
    input2: "5\n-1 -2 -3 -4 -5",
    output2: "NET -15",
    input3: "2\n7 -7",
    output3: "NET 0",
    inputconstrains: "1 <= N <= 1000, -10000 <= each movement <= 10000",
    blacklist: "fscanf(, fgets(, fread(",
    whitelist: "fopen(, fclose(, fprintf(, fgetc(",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) {
        return 1;
    }
    int arr[1000];
    for (int i = 0; i < n; i++) {
        if (scanf("%d", &arr[i]) != 1) {
            return 1;
        }
    }
    FILE *fp = fopen("/tmp/atom_day20_stock.txt", "w");
    if (fp == NULL) {
        printf("OPEN_FAIL\\n");
        return 0;
    }
    fprintf(fp, "%d\\n", arr[0]);
    fclose(fp);
    fp = fopen("/tmp/atom_day20_stock.txt", "a");
    if (fp == NULL) {
        printf("OPEN_FAIL\\n");
        return 0;
    }
    for (int i = 1; i < n; i++) {
        fprintf(fp, "%d\\n", arr[i]);
    }
    fclose(fp);
    fp = fopen("/tmp/atom_day20_stock.txt", "r");
    if (fp == NULL) {
        printf("OPEN_FAIL\\n");
        return 0;
    }
    int net = 0;
    int c;
    int sign = 1;
    int in_num = 0;
    int cur = 0;
    while ((c = fgetc(fp)) != EOF) {
        if (c == '-') {
            sign = -1;
        } else if (c >= '0' && c <= '9') {
            cur = cur * 10 + (c - '0');
            in_num = 1;
        } else {
            if (in_num) {
                net += sign * cur;
                cur = 0;
                sign = 1;
                in_num = 0;
            }
        }
    }
    if (in_num) {
        net += sign * cur;
    }
    fclose(fp);
    printf("NET %d\\n", net);
    return 0;
}
`,
  }),
  codeQ({
    title: "Binary Student Record Archive",
    description:
      "A school persists student records (roll number and marks) as a binary file for compact storage. Read N then N pairs (roll, marks) from stdin. Define a struct with two int members (roll and marks). Open /tmp/atom_day20_studrec.bin in binary write mode, write all N records with a single fwrite call, then close. Reopen in binary read mode, read the records back with a single fread call into a local array, then close. Print TOTAL <total_marks> COUNT <n_read>.\n\nInput Format:\nLine 1: integer N. Next N lines: <roll> <marks> per line.\n\nOutput Format:\nA single line: TOTAL <sum_of_marks> COUNT <n_read>.\n\nConstraints:\n1 <= N <= 1000, 1 <= roll <= 99999, 0 <= marks <= 100",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Binary File Operations",
    sampleinput1: "2\n1 80\n2 90",
    sampleoutput1: "TOTAL 170 COUNT 2",
    sampleinput2: "3\n10 50\n11 60\n12 70",
    sampleoutput2: "TOTAL 180 COUNT 3",
    input1: "1\n7 100",
    output1: "TOTAL 100 COUNT 1",
    input2: "4\n1 25\n2 25\n3 25\n4 25",
    output2: "TOTAL 100 COUNT 4",
    input3: "2\n99 0\n100 50",
    output3: "TOTAL 50 COUNT 2",
    inputconstrains: "1 <= N <= 1000, 1 <= roll <= 99999, 0 <= marks <= 100",
    blacklist: "fprintf(, fscanf(, fgets(",
    whitelist: "fopen(, fclose(, fwrite(, fread(",
    sourcecode: `#include <stdio.h>

typedef struct {
    int roll;
    int marks;
} Student;

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) {
        return 1;
    }
    Student arr[1000];
    for (int i = 0; i < n; i++) {
        if (scanf("%d %d", &arr[i].roll, &arr[i].marks) != 2) {
            return 1;
        }
    }
    FILE *fp = fopen("/tmp/atom_day20_studrec.bin", "wb");
    if (fp == NULL) {
        printf("OPEN_FAIL\\n");
        return 0;
    }
    fwrite(arr, sizeof(Student), n, fp);
    fclose(fp);
    fp = fopen("/tmp/atom_day20_studrec.bin", "rb");
    if (fp == NULL) {
        printf("OPEN_FAIL\\n");
        return 0;
    }
    Student rb[1000];
    size_t got = fread(rb, sizeof(Student), n, fp);
    fclose(fp);
    int total = 0;
    for (size_t i = 0; i < got; i++) {
        total += rb[i].marks;
    }
    printf("TOTAL %d COUNT %d\\n", total, (int)got);
    return 0;
}
`,
  }),
  codeQ({
    title: "Log File Character Frequency Reporter",
    description:
      "A log scanner must classify characters in a one-line log message. Read the line from stdin using a getchar loop (stopping at newline or EOF, no fgets allowed). Open /tmp/atom_day20_log.txt in write mode, write the line followed by a newline using fprintf, then close. Reopen the file in read mode, scan every character with fgetc, count digit characters and alphabetic characters (manually, not via ctype.h helpers), then close and print DIGITS <d> ALPHA <a>.\n\nInput Format:\nA single line of text (may contain interior spaces).\n\nOutput Format:\nA single line: DIGITS <d> ALPHA <a>.\n\nConstraints:\nLine length 1..1023",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Reading from Files",
    sampleinput1: "Hello World 123",
    sampleoutput1: "DIGITS 3 ALPHA 10",
    sampleinput2: "abcXYZ999",
    sampleoutput2: "DIGITS 3 ALPHA 6",
    input1: "atomcode 2024",
    output1: "DIGITS 4 ALPHA 8",
    input2: "no digits here",
    output2: "DIGITS 0 ALPHA 12",
    input3: "12345",
    output3: "DIGITS 5 ALPHA 0",
    inputconstrains: "Line length 1..1023",
    blacklist: "fscanf(, fgets(, fread(",
    whitelist: "fopen(, fclose(, fprintf(, fgetc(",
    sourcecode: `#include <stdio.h>

int main(void) {
    char buf[1024];
    int len = 0;
    int ch;
    while ((ch = getchar()) != EOF && ch != '\\n' && len < 1023) {
        buf[len++] = (char)ch;
    }
    buf[len] = 0;
    FILE *fp = fopen("/tmp/atom_day20_log.txt", "w");
    if (fp == NULL) {
        printf("OPEN_FAIL\\n");
        return 0;
    }
    fprintf(fp, "%s\\n", buf);
    fclose(fp);
    fp = fopen("/tmp/atom_day20_log.txt", "r");
    if (fp == NULL) {
        printf("OPEN_FAIL\\n");
        return 0;
    }
    int digits = 0;
    int alpha = 0;
    int c;
    while ((c = fgetc(fp)) != EOF) {
        if (c >= '0' && c <= '9') {
            digits++;
        } else if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')) {
            alpha++;
        }
    }
    fclose(fp);
    printf("DIGITS %d ALPHA %d\\n", digits, alpha);
    return 0;
}
`,
  }),
  codeQ({
    title: "Append-only Audit Trail Builder",
    description:
      "An audit service records N event identifiers (integers) to /tmp/atom_day20_audit.txt with the prefix EVT: per line. First open the file in write mode and write a single header line containing just # (to truncate any prior content), then close. Then reopen in append mode and append EVT:<id> for each event, then close. Finally reopen in read mode, scan the file byte-by-byte with fgetc (no fscanf/fgets/fread), and count how many EVT: lines exist, then close and print EVENTS <k>.\n\nInput Format:\nLine 1: integer N. Line 2: N space-separated integers.\n\nOutput Format:\nA single line: EVENTS <k>.\n\nConstraints:\n1 <= N <= 1000, -10000 <= id <= 10000",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "File Modes r w a",
    sampleinput1: "3\n100 200 300",
    sampleoutput1: "EVENTS 3",
    sampleinput2: "2\n7 8",
    sampleoutput2: "EVENTS 2",
    input1: "1\n42",
    output1: "EVENTS 1",
    input2: "5\n1 2 3 4 5",
    output2: "EVENTS 5",
    input3: "4\n-1 0 1 2",
    output3: "EVENTS 4",
    inputconstrains: "1 <= N <= 1000, -10000 <= id <= 10000",
    blacklist: "fscanf(, fgets(, fread(",
    whitelist: "fopen(, fclose(, fprintf(, fgetc(",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) {
        return 1;
    }
    int arr[1000];
    for (int i = 0; i < n; i++) {
        if (scanf("%d", &arr[i]) != 1) {
            return 1;
        }
    }
    FILE *fp = fopen("/tmp/atom_day20_audit.txt", "w");
    if (fp == NULL) {
        printf("OPEN_FAIL\\n");
        return 0;
    }
    fprintf(fp, "#\\n");
    fclose(fp);
    fp = fopen("/tmp/atom_day20_audit.txt", "a");
    if (fp == NULL) {
        printf("OPEN_FAIL\\n");
        return 0;
    }
    for (int i = 0; i < n; i++) {
        fprintf(fp, "EVT:%d\\n", arr[i]);
    }
    fclose(fp);
    fp = fopen("/tmp/atom_day20_audit.txt", "r");
    if (fp == NULL) {
        printf("OPEN_FAIL\\n");
        return 0;
    }
    int events = 0;
    int c;
    int prev = '\\n';
    while ((c = fgetc(fp)) != EOF) {
        if (prev == '\\n' && c == 'E') {
            events++;
        }
        prev = c;
    }
    fclose(fp);
    printf("EVENTS %d\\n", events);
    return 0;
}
`,
  }),
  codeQ({
    title: "Temperature Series Binary File",
    description:
      "A weather station stores a series of N temperature readings as a binary file of doubles for compactness. Read N then N integers (each representing a temperature in degrees Celsius) from stdin. Convert each to a double. Open /tmp/atom_day20_temps.bin in binary write mode, write the array of doubles with a single fwrite, then close. Reopen in binary read mode, read them back with a single fread, then close. Compute the average temperature and print AVG <x.xx> with two decimal places.\n\nInput Format:\nLine 1: integer N. Line 2: N space-separated integers.\n\nOutput Format:\nA single line: AVG <avg> with exactly two decimal places.\n\nConstraints:\n1 <= N <= 1000, -100 <= each temperature <= 100",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Binary File Operations",
    sampleinput1: "3\n20 25 30",
    sampleoutput1: "AVG 25.00",
    sampleinput2: "4\n10 20 30 40",
    sampleoutput2: "AVG 25.00",
    input1: "1\n7",
    output1: "AVG 7.00",
    input2: "2\n-10 30",
    output2: "AVG 10.00",
    input3: "5\n0 0 0 0 0",
    output3: "AVG 0.00",
    inputconstrains: "1 <= N <= 1000, -100 <= each temperature <= 100",
    blacklist: "fprintf(, fscanf(, fgets(, fgetc(",
    whitelist: "fopen(, fclose(, fwrite(, fread(",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) {
        return 1;
    }
    double arr[1000];
    for (int i = 0; i < n; i++) {
        int t;
        if (scanf("%d", &t) != 1) {
            return 1;
        }
        arr[i] = (double)t;
    }
    FILE *fp = fopen("/tmp/atom_day20_temps.bin", "wb");
    if (fp == NULL) {
        printf("OPEN_FAIL\\n");
        return 0;
    }
    fwrite(arr, sizeof(double), n, fp);
    fclose(fp);
    fp = fopen("/tmp/atom_day20_temps.bin", "rb");
    if (fp == NULL) {
        printf("OPEN_FAIL\\n");
        return 0;
    }
    double rb[1000];
    size_t got = fread(rb, sizeof(double), n, fp);
    fclose(fp);
    double sum = 0.0;
    for (size_t i = 0; i < got; i++) {
        sum += rb[i];
    }
    double avg = (got > 0) ? sum / (double)got : 0.0;
    printf("AVG %.2f\\n", avg);
    return 0;
}
`,
  }),

  /* ── HARD · 4 scenario ── */
  codeQ({
    title: "Binary Inventory Database Query",
    description:
      "A store maintains an inventory database persisted as a binary file of structs. Read N then N records (id, qty, price as a double) from stdin. Define a struct with int id, int qty, double price. Open /tmp/atom_day20_invent.bin in binary write mode and write all records with one fwrite, then close. Reopen in binary read mode, read the records back with one fread, then close. Compute the total inventory value (sum of qty * price over all records) and find the id of the record whose qty*price is the largest (use a manual loop, no qsort). Print VALUE <v.xx> TOP_ID <id>.\n\nInput Format:\nLine 1: integer N. Next N lines: <id> <qty> <price> per line (price is a floating-point number).\n\nOutput Format:\nA single line: VALUE <v.xx> TOP_ID <id> with two decimals for the value.\n\nConstraints:\n1 <= N <= 1000, 1 <= id <= 99999, 0 <= qty <= 10000, 0.00 <= price <= 10000.00",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Binary File Operations",
    sampleinput1: "2\n1 5 10.0\n2 3 50.0",
    sampleoutput1: "VALUE 200.00 TOP_ID 2",
    sampleinput2: "3\n1 2 5.0\n2 4 5.0\n3 1 5.0",
    sampleoutput2: "VALUE 35.00 TOP_ID 2",
    input1: "1\n10 3 25.0",
    output1: "VALUE 75.00 TOP_ID 10",
    input2: "2\n1 0 5.0\n2 1 5.0",
    output2: "VALUE 5.00 TOP_ID 2",
    input3: "3\n1 1 100.0\n2 1 50.0\n3 1 25.0",
    output3: "VALUE 175.00 TOP_ID 1",
    inputconstrains:
      "1 <= N <= 1000, 1 <= id <= 99999, 0 <= qty <= 10000, 0.00 <= price <= 10000.00",
    blacklist: "fprintf(, fscanf(, fgets(, fgetc(, qsort",
    whitelist: "fopen(, fclose(, fwrite(, fread(, struct ",
    sourcecode: `#include <stdio.h>

typedef struct {
    int id;
    int qty;
    double price;
} InvItem;

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) {
        return 1;
    }
    InvItem arr[1000];
    for (int i = 0; i < n; i++) {
        if (scanf("%d %d %lf", &arr[i].id, &arr[i].qty, &arr[i].price) != 3) {
            return 1;
        }
    }
    FILE *fp = fopen("/tmp/atom_day20_invent.bin", "wb");
    if (fp == NULL) {
        printf("OPEN_FAIL\\n");
        return 0;
    }
    fwrite(arr, sizeof(InvItem), n, fp);
    fclose(fp);
    fp = fopen("/tmp/atom_day20_invent.bin", "rb");
    if (fp == NULL) {
        printf("OPEN_FAIL\\n");
        return 0;
    }
    InvItem rb[1000];
    size_t got = fread(rb, sizeof(InvItem), n, fp);
    fclose(fp);
    double total = 0.0;
    int top_id = -1;
    double top_val = -1.0;
    for (size_t i = 0; i < got; i++) {
        double v = (double)rb[i].qty * rb[i].price;
        total += v;
        if (v > top_val) {
            top_val = v;
            top_id = rb[i].id;
        }
    }
    printf("VALUE %.2f TOP_ID %d\\n", total, top_id);
    return 0;
}
`,
  }),
  codeQ({
    title: "Transaction Ledger Append and Reconcile",
    description:
      "A banking ledger grows in two phases: initial postings (N transactions) followed by end-of-day adjustments (M transactions). All transactions are signed integers (positive = credit, negative = debit). Open /tmp/atom_day20_ledger.txt in write mode, write the first N transactions one per line, then close. Reopen in append mode, write the next M transactions one per line, then close. Reopen in read mode, parse every integer manually with fgetc (no fscanf/fgets/fread), summing them as the final balance. Close and print BALANCE <b>.\n\nInput Format:\nLine 1: two integers N and M. Next N+M lines each contain one signed integer (or all on subsequent lines space/newline separated).\n\nOutput Format:\nA single line: BALANCE <b>.\n\nConstraints:\n1 <= N, M <= 500, N+M <= 1000, -10000 <= each transaction <= 10000",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "File Modes r w a",
    sampleinput1: "2 1\n100 -30 50",
    sampleoutput1: "BALANCE 120",
    sampleinput2: "3 2\n10 20 30 -5 -5",
    sampleoutput2: "BALANCE 50",
    input1: "1 1\n50 50",
    output1: "BALANCE 100",
    input2: "2 2\n-100 200 -50 50",
    output2: "BALANCE 100",
    input3: "1 2\n0 0 0",
    output3: "BALANCE 0",
    inputconstrains:
      "1 <= N, M <= 500, N+M <= 1000, -10000 <= each transaction <= 10000",
    blacklist: "fscanf(, fgets(, fread(",
    whitelist: "fopen(, fclose(, fprintf(, fgetc(",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) {
        return 1;
    }
    int total = n + m;
    int arr[2000];
    for (int i = 0; i < total; i++) {
        if (scanf("%d", &arr[i]) != 1) {
            return 1;
        }
    }
    FILE *fp = fopen("/tmp/atom_day20_ledger.txt", "w");
    if (fp == NULL) {
        printf("OPEN_FAIL\\n");
        return 0;
    }
    for (int i = 0; i < n; i++) {
        fprintf(fp, "%d\\n", arr[i]);
    }
    fclose(fp);
    fp = fopen("/tmp/atom_day20_ledger.txt", "a");
    if (fp == NULL) {
        printf("OPEN_FAIL\\n");
        return 0;
    }
    for (int i = n; i < total; i++) {
        fprintf(fp, "%d\\n", arr[i]);
    }
    fclose(fp);
    fp = fopen("/tmp/atom_day20_ledger.txt", "r");
    if (fp == NULL) {
        printf("OPEN_FAIL\\n");
        return 0;
    }
    int balance = 0;
    int c;
    int sign = 1;
    int in_num = 0;
    int cur = 0;
    while ((c = fgetc(fp)) != EOF) {
        if (c == '-') {
            sign = -1;
        } else if (c >= '0' && c <= '9') {
            cur = cur * 10 + (c - '0');
            in_num = 1;
        } else {
            if (in_num) {
                balance += sign * cur;
                cur = 0;
                sign = 1;
                in_num = 0;
            }
        }
    }
    if (in_num) {
        balance += sign * cur;
    }
    fclose(fp);
    printf("BALANCE %d\\n", balance);
    return 0;
}
`,
  }),
  codeQ({
    title: "Employee Records Binary File Index Search",
    description:
      "An HR system stores N employee records (id and salary) as a binary file of structs. Read N then N records (id, salary) from stdin. Define a struct with two int members. Open /tmp/atom_day20_emp.bin in binary write mode and write the records with one fwrite, then close. Then read a query id Q from stdin. Reopen the file in binary read mode. Use fseek to position the stream at the i-th record (offset = i * sizeof(struct)) and fread one record at a time, searching for the one whose id equals Q. Close the file. If found, print SALARY <salary>; otherwise print NOT_FOUND.\n\nInput Format:\nLine 1: integer N. Next N lines: <id> <salary> per line. Final line: integer Q (the query id).\n\nOutput Format:\nA single line: SALARY <salary> on match, else NOT_FOUND.\n\nConstraints:\n1 <= N <= 1000, 1 <= id <= 999999, 0 <= salary <= 1000000",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Binary File Operations",
    sampleinput1: "3\n1 50000\n2 60000\n3 55000\n2",
    sampleoutput1: "SALARY 60000",
    sampleinput2: "2\n10 100\n20 200\n10",
    sampleoutput2: "SALARY 100",
    input1: "1\n7 75000\n7",
    output1: "SALARY 75000",
    input2: "3\n1 100\n2 200\n3 300\n9",
    output2: "NOT_FOUND",
    input3: "4\n5 0\n6 50\n7 100\n8 200\n7",
    output3: "SALARY 100",
    inputconstrains: "1 <= N <= 1000, 1 <= id <= 999999, 0 <= salary <= 1000000",
    blacklist: "fprintf(, fscanf(, fgets(, fgetc(",
    whitelist: "fopen(, fclose(, fwrite(, fread(, fseek(",
    sourcecode: `#include <stdio.h>

typedef struct {
    int id;
    int salary;
} Emp;

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) {
        return 1;
    }
    Emp arr[1000];
    for (int i = 0; i < n; i++) {
        if (scanf("%d %d", &arr[i].id, &arr[i].salary) != 2) {
            return 1;
        }
    }
    int q;
    if (scanf("%d", &q) != 1) {
        return 1;
    }
    FILE *fp = fopen("/tmp/atom_day20_emp.bin", "wb");
    if (fp == NULL) {
        printf("OPEN_FAIL\\n");
        return 0;
    }
    fwrite(arr, sizeof(Emp), n, fp);
    fclose(fp);
    fp = fopen("/tmp/atom_day20_emp.bin", "rb");
    if (fp == NULL) {
        printf("OPEN_FAIL\\n");
        return 0;
    }
    int found = 0;
    int salary = 0;
    for (int i = 0; i < n; i++) {
        if (fseek(fp, (long)i * (long)sizeof(Emp), SEEK_SET) != 0) {
            break;
        }
        Emp e;
        if (fread(&e, sizeof(Emp), 1, fp) != 1) {
            break;
        }
        if (e.id == q) {
            found = 1;
            salary = e.salary;
            break;
        }
    }
    fclose(fp);
    if (found) {
        printf("SALARY %d\\n", salary);
    } else {
        printf("NOT_FOUND\\n");
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Multi-Mode File Error Resilience",
    description:
      "A resilient file manager tests both its success path and its failure path. Read two integers n and c from stdin. When c == 0, attempt to open the (never-created) file /tmp/atom_day20_no_such_file.txt in read mode; if fopen returns NULL (as it should) print OPEN_FAILED and stop; otherwise close the file and print UNEXPECTED. When c == 1, open /tmp/atom_day20_resilient.txt in write mode (checking for NULL), write n via fprintf, close, reopen in read mode (checking for NULL), parse the integer back manually with fgetc (digit by digit, respecting a leading minus sign), close, and print FINAL <value>.\n\nInput Format:\nA single line with two space-separated integers: n and c.\n\nOutput Format:\nA single line: OPEN_FAILED (when c == 0) or FINAL <n> (when c == 1).\n\nConstraints:\n-100000 <= n <= 100000, c in {0, 1}",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Error Handling in File Operations",
    sampleinput1: "42 1",
    sampleoutput1: "FINAL 42",
    sampleinput2: "0 0",
    sampleoutput2: "OPEN_FAILED",
    input1: "-7 1",
    output1: "FINAL -7",
    input2: "100 0",
    output2: "OPEN_FAILED",
    input3: "99999 1",
    output3: "FINAL 99999",
    inputconstrains: "-100000 <= n <= 100000, c in {0, 1}",
    blacklist: "fscanf(, fgets(, fread(",
    whitelist: "fopen(, fclose(, fprintf(, fgetc(, if (",
    sourcecode: `#include <stdio.h>

int main(void) {
    int n, c;
    if (scanf("%d %d", &n, &c) != 2) {
        return 1;
    }
    if (c == 0) {
        FILE *fp = fopen("/tmp/atom_day20_no_such_file.txt", "r");
        if (fp == NULL) {
            printf("OPEN_FAILED\\n");
            return 0;
        }
        fclose(fp);
        printf("UNEXPECTED\\n");
        return 0;
    } else {
        FILE *fp = fopen("/tmp/atom_day20_resilient.txt", "w");
        if (fp == NULL) {
            printf("OPEN_FAILED\\n");
            return 0;
        }
        fprintf(fp, "%d\\n", n);
        fclose(fp);
        fp = fopen("/tmp/atom_day20_resilient.txt", "r");
        if (fp == NULL) {
            printf("OPEN_FAILED\\n");
            return 0;
        }
        int parsed = 0;
        int sign = 1;
        int started = 0;
        int ch;
        while ((ch = fgetc(fp)) != EOF) {
            if (ch == '-') {
                sign = -1;
            } else if (ch >= '0' && ch <= '9') {
                parsed = parsed * 10 + (ch - '0');
                started = 1;
            } else if (started) {
                break;
            }
        }
        parsed = sign * parsed;
        fclose(fp);
        printf("FINAL %d\\n", parsed);
        return 0;
    }
}
`,
  }),
];

/* ────────────────────────────── MCQ QUESTIONS ────────────────────────────── */
const mcqs = [
  /* ── EASY · 10 ── */
  mcq({
    title: "fopen Return Type",
    description:
      "In C, what type does fopen return on success?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Opening and Closing Files",
    Option1: "FILE *",
    Option2: "FILE",
    Option3: "int",
    Option4: "char *",
    CorrectOption: 1,
  }),
  mcq({
    title: "File Mode for Writing and Truncating",
    description:
      "Which mode string opens a text file for writing, truncating it to zero length if it already exists?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "File Modes r w a",
    Option1: '"w"',
    Option2: '"r"',
    Option3: '"a"',
    Option4: '"rw"',
    CorrectOption: 1,
  }),
  mcq({
    title: "Header for FILE Type",
    description:
      "Which standard header declares the FILE type and the file I/O functions fopen, fclose, fprintf, fscanf?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Opening and Closing Files",
    Option1: "<stdio.h>",
    Option2: "<stdlib.h>",
    Option3: "<string.h>",
    Option4: "<errno.h>",
    CorrectOption: 1,
  }),
  mcq({
    title: "File Close Function",
    description: "Which function closes an open file stream in C?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Opening and Closing Files",
    Option1: "fclose",
    Option2: "close",
    Option3: "fileclose",
    Option4: "fclosefile",
    CorrectOption: 1,
  }),
  mcq({
    title: "Append Mode Without Truncating",
    description:
      'Which mode string opens a text file for appending so that writes are added at the end without truncating existing content?',
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "File Modes r w a",
    Option1: '"a"',
    Option2: '"w"',
    Option3: '"r"',
    Option4: '"rw"',
    CorrectOption: 1,
  }),
  mcq({
    title: "Read String from File Function",
    description:
      "Which function reads a line of text from a file stream into a character buffer?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Reading from Files",
    Option1: "fgets",
    Option2: "fgetstr",
    Option3: "freadstr",
    Option4: "getstr",
    CorrectOption: 1,
  }),
  mcq({
    title: "feof Non-zero Condition",
    description:
      "The feof function returns a non-zero value when which condition is true?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Error Handling in File Operations",
    Option1: "The end-of-file indicator is set on the stream",
    Option2: "The file has been closed",
    Option3: "The file is empty (zero bytes on disk)",
    Option4: "A read error occurred on the stream",
    CorrectOption: 1,
  }),
  mcq({
    title: "fread Return Value",
    description:
      "What does fread return on success for a call fread(ptr, size, nmemb, stream)?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Binary File Operations",
    Option1: "The number of items (each of size bytes) successfully read",
    Option2: "The total number of bytes read",
    Option3: "The number of characters in the file",
    Option4: "Always nmemb regardless of how many were read",
    CorrectOption: 1,
  }),
  mcq({
    title: "Formatted File Write Function",
    description:
      "Which function writes formatted data to a file stream using a format specifier string?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Writing to Files",
    Option1: "fprintf",
    Option2: "fprint",
    Option3: "fwritef",
    Option4: "fputf",
    CorrectOption: 1,
  }),
  mcq({
    title: "Binary Read Mode String",
    description:
      'Which mode string opens an existing binary file for reading only?',
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "File Modes r w a",
    Option1: '"rb"',
    Option2: '"wb"',
    Option3: '"ab"',
    Option4: '"r+w"',
    CorrectOption: 1,
  }),

  /* ── MEDIUM · 6 ── */
  mcq({
    title: "Write-then-Read Integer Snippet",
    description:
      "What does the following program print to stdout?\n\n#include <stdio.h>\nint main(void) {\n    FILE *fp = fopen(\"/tmp/mcq11.txt\", \"w\");\n    fprintf(fp, \"5\");\n    fclose(fp);\n    fp = fopen(\"/tmp/mcq11.txt\", \"r\");\n    int x;\n    fscanf(fp, \"%d\", &x);\n    fclose(fp);\n    printf(\"%d\\n\", x);\n    return 0;\n}",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Reading from Files",
    Option1: "5",
    Option2: "0",
    Option3: "-1",
    Option4: "Undefined value (uninitialized x)",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet:
      '#include <stdio.h>\nint main(void) {\n    FILE *fp = fopen("/tmp/mcq11.txt", "w");\n    fprintf(fp, "5");\n    fclose(fp);\n    fp = fopen("/tmp/mcq11.txt", "r");\n    int x;\n    fscanf(fp, "%d", &x);\n    fclose(fp);\n    printf("%d\\n", x);\n    return 0;\n}',
    snippetLang: "c",
  }),
  mcq({
    title: "Append Mode Concatenation Snippet",
    description:
      "What does the following program print to stdout?\n\n#include <stdio.h>\nint main(void) {\n    FILE *fp = fopen(\"/tmp/mcq12.txt\", \"w\");\n    fprintf(fp, \"AB\");\n    fclose(fp);\n    fp = fopen(\"/tmp/mcq12.txt\", \"a\");\n    fprintf(fp, \"CD\");\n    fclose(fp);\n    fp = fopen(\"/tmp/mcq12.txt\", \"r\");\n    char buf[32];\n    fgets(buf, sizeof(buf), fp);\n    fclose(fp);\n    printf(\"%s\\n\", buf);\n    return 0;\n}",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "File Modes r w a",
    Option1: "ABCD",
    Option2: "AB",
    Option3: "CD",
    Option4: "AB CD",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet:
      '#include <stdio.h>\nint main(void) {\n    FILE *fp = fopen("/tmp/mcq12.txt", "w");\n    fprintf(fp, "AB");\n    fclose(fp);\n    fp = fopen("/tmp/mcq12.txt", "a");\n    fprintf(fp, "CD");\n    fclose(fp);\n    fp = fopen("/tmp/mcq12.txt", "r");\n    char buf[32];\n    fgets(buf, sizeof(buf), fp);\n    fclose(fp);\n    printf("%s\\n", buf);\n    return 0;\n}',
    snippetLang: "c",
  }),
  mcq({
    title: "Binary Int Round Trip Snippet",
    description:
      "What does the following program print to stdout?\n\n#include <stdio.h>\nint main(void) {\n    int v = 65;\n    FILE *fp = fopen(\"/tmp/mcq13.bin\", \"wb\");\n    fwrite(&v, sizeof(int), 1, fp);\n    fclose(fp);\n    fp = fopen(\"/tmp/mcq13.bin\", \"rb\");\n    int r;\n    fread(&r, sizeof(int), 1, fp);\n    fclose(fp);\n    printf(\"%d\\n\", r);\n    return 0;\n}",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Binary File Operations",
    Option1: "65",
    Option2: "0",
    Option3: "1",
    Option4: "An undefined value (binary layout is unspecified)",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet:
      '#include <stdio.h>\nint main(void) {\n    int v = 65;\n    FILE *fp = fopen("/tmp/mcq13.bin", "wb");\n    fwrite(&v, sizeof(int), 1, fp);\n    fclose(fp);\n    fp = fopen("/tmp/mcq13.bin", "rb");\n    int r;\n    fread(&r, sizeof(int), 1, fp);\n    fclose(fp);\n    printf("%d\\n", r);\n    return 0;\n}',
    snippetLang: "c",
  }),
  mcq({
    title: "fopen NULL on Missing File Snippet",
    description:
      "What does the following program print to stdout, assuming /tmp/this_does_not_exist.txt does not exist?\n\n#include <stdio.h>\nint main(void) {\n    FILE *fp = fopen(\"/tmp/this_does_not_exist.txt\", \"r\");\n    if (fp == NULL) {\n        printf(\"NULL\\n\");\n    } else {\n        printf(\"OK\\n\");\n        fclose(fp);\n    }\n    return 0;\n}",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Error Handling in File Operations",
    Option1: "NULL",
    Option2: "OK",
    Option3: "Segmentation fault",
    Option4: "(prints nothing)",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet:
      '#include <stdio.h>\nint main(void) {\n    FILE *fp = fopen("/tmp/this_does_not_exist.txt", "r");\n    if (fp == NULL) {\n        printf("NULL\\n");\n    } else {\n        printf("OK\\n");\n        fclose(fp);\n    }\n    return 0;\n}',
    snippetLang: "c",
  }),
  mcq({
    title: "Double w Mode Truncation Snippet",
    description:
      "What does the following program print to stdout?\n\n#include <stdio.h>\nint main(void) {\n    FILE *fp = fopen(\"/tmp/mcq15.txt\", \"w\");\n    fprintf(fp, \"FIRST\");\n    fclose(fp);\n    fp = fopen(\"/tmp/mcq15.txt\", \"w\");\n    fprintf(fp, \"SECOND\");\n    fclose(fp);\n    fp = fopen(\"/tmp/mcq15.txt\", \"r\");\n    char buf[32];\n    fgets(buf, sizeof(buf), fp);\n    fclose(fp);\n    printf(\"%s\\n\", buf);\n    return 0;\n}",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "File Modes r w a",
    Option1: "SECOND",
    Option2: "FIRST",
    Option3: "FIRSTSECOND",
    Option4: "SECONDFIRST",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet:
      '#include <stdio.h>\nint main(void) {\n    FILE *fp = fopen("/tmp/mcq15.txt", "w");\n    fprintf(fp, "FIRST");\n    fclose(fp);\n    fp = fopen("/tmp/mcq15.txt", "w");\n    fprintf(fp, "SECOND");\n    fclose(fp);\n    fp = fopen("/tmp/mcq15.txt", "r");\n    char buf[32];\n    fgets(buf, sizeof(buf), fp);\n    fclose(fp);\n    printf("%s\\n", buf);\n    return 0;\n}',
    snippetLang: "c",
  }),
  mcq({
    title: "fflush Behavior on Output Stream",
    description:
      "What does fflush(fp) do when fp is an output stream with buffered data?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Writing to Files",
    Option1: "Forces any buffered data to be written to the underlying file",
    Option2: "Closes the file stream",
    Option3: "Discards any buffered data without writing it",
    Option4: "Resets the file position indicator to the start of the file",
    CorrectOption: 1,
  }),

  /* ── HARD · 4 ── */
  mcq({
    title: "fseek Binary Index Read Snippet",
    description:
      "What does the following program print to stdout? Assume sizeof(int) is 4.\n\n#include <stdio.h>\nint main(void) {\n    FILE *fp = fopen(\"/tmp/mcq17.bin\", \"wb\");\n    int arr[3] = {10, 20, 30};\n    fwrite(arr, sizeof(int), 3, fp);\n    fclose(fp);\n    fp = fopen(\"/tmp/mcq17.bin\", \"rb\");\n    int x;\n    fseek(fp, sizeof(int) * 1, SEEK_SET);\n    fread(&x, sizeof(int), 1, fp);\n    fclose(fp);\n    printf(\"%d\\n\", x);\n    return 0;\n}",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Binary File Operations",
    Option1: "20",
    Option2: "10",
    Option3: "30",
    Option4: "0",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet:
      '#include <stdio.h>\nint main(void) {\n    FILE *fp = fopen("/tmp/mcq17.bin", "wb");\n    int arr[3] = {10, 20, 30};\n    fwrite(arr, sizeof(int), 3, fp);\n    fclose(fp);\n    fp = fopen("/tmp/mcq17.bin", "rb");\n    int x;\n    fseek(fp, sizeof(int) * 1, SEEK_SET);\n    fread(&x, sizeof(int), 1, fp);\n    fclose(fp);\n    printf("%d\\n", x);\n    return 0;\n}',
    snippetLang: "c",
  }),
  mcq({
    title: "fgetc Character Count Snippet",
    description:
      "What does the following program print to stdout?\n\n#include <stdio.h>\nint main(void) {\n    FILE *fp = fopen(\"/tmp/mcq18.txt\", \"w\");\n    fprintf(fp, \"Hello\");\n    fclose(fp);\n    fp = fopen(\"/tmp/mcq18.txt\", \"r\");\n    int c;\n    int count = 0;\n    while ((c = fgetc(fp)) != EOF) {\n        count++;\n    }\n    fclose(fp);\n    printf(\"%d\\n\", count);\n    return 0;\n}",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Reading from Files",
    Option1: "5",
    Option2: "4",
    Option3: "6",
    Option4: "0",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet:
      '#include <stdio.h>\nint main(void) {\n    FILE *fp = fopen("/tmp/mcq18.txt", "w");\n    fprintf(fp, "Hello");\n    fclose(fp);\n    fp = fopen("/tmp/mcq18.txt", "r");\n    int c;\n    int count = 0;\n    while ((c = fgetc(fp)) != EOF) {\n        count++;\n    }\n    fclose(fp);\n    printf("%d\\n", count);\n    return 0;\n}',
    snippetLang: "c",
  }),
  mcq({
    title: "fread Partial Read Count Snippet",
    description:
      "What does the following program print to stdout? Assume sizeof(int) is 4.\n\n#include <stdio.h>\nint main(void) {\n    FILE *fp = fopen(\"/tmp/mcq19.bin\", \"wb\");\n    int arr[3] = {7, 8, 9};\n    fwrite(arr, sizeof(int), 3, fp);\n    fclose(fp);\n    fp = fopen(\"/tmp/mcq19.bin\", \"rb\");\n    int x[5];\n    size_t got = fread(x, sizeof(int), 5, fp);\n    fclose(fp);\n    printf(\"%d\\n\", (int)got);\n    return 0;\n}",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Binary File Operations",
    Option1: "3",
    Option2: "5",
    Option3: "0",
    Option4: "4",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet:
      '#include <stdio.h>\nint main(void) {\n    FILE *fp = fopen("/tmp/mcq19.bin", "wb");\n    int arr[3] = {7, 8, 9};\n    fwrite(arr, sizeof(int), 3, fp);\n    fclose(fp);\n    fp = fopen("/tmp/mcq19.bin", "rb");\n    int x[5];\n    size_t got = fread(x, sizeof(int), 5, fp);\n    fclose(fp);\n    printf("%d\\n", (int)got);\n    return 0;\n}',
    snippetLang: "c",
  }),
  mcq({
    title: "r+ Mode on Missing File Behavior",
    description:
      'If the file /tmp/atom_quiz.txt does not exist, what does fopen("/tmp/atom_quiz.txt", "r+") return?',
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "File Modes r w a",
    Option1: "NULL (the file must already exist for r+ mode)",
    Option2: "A valid FILE * and the file is created empty",
    Option3: "A valid FILE * and the file is created with random content",
    Option4: "A valid FILE * and the existing file is truncated to zero length",
    CorrectOption: 1,
  }),
];

/* ────────────────────────────── EMIT ────────────────────────────── */
const d = String(DAY).padStart(2, "0");
writeFileSync(
  `scripts/c-programming/data/day-${d}.code.json`,
  JSON.stringify(
    { day: DAY, topics: [{ name: TOPIC, subtopics: SUBTOPICS }], questions },
    null,
    2
  )
);
writeFileSync(
  `scripts/c-programming/data/day-${d}.mcq.json`,
  JSON.stringify({ day: DAY, questions: mcqs }, null, 2)
);
console.log("wrote day", DAY);
