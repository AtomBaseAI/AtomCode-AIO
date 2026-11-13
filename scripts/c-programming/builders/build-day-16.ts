/**
 * Builder for Day 16 — "Bitwise Operations".
 * Emits:
 *   /home/z/my-project/scripts/c-programming/data/day-16.code.json  (20 code questions)
 *   /home/z/my-project/scripts/c-programming/data/day-16.mcq.json   (20 MCQ questions)
 */
import { writeFileSync } from "node:fs";

const DAY = 16;
const TOPIC = "Bitwise Operations";
const SUBTOPICS = [
  "Bitwise AND OR XOR",
  "Bitwise NOT",
  "Left and Right Shift",
  "Bit Masking",
  "Bit Setting and Clearing",
  "Bit Counting",
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
    title: "Bitwise AND of Two Unsigned Integers",
    description:
      "Read two unsigned 32-bit integers and print their bitwise AND.\n\nInput Format:\nTwo space-separated unsigned 32-bit integers a and b.\n\nOutput Format:\nA single integer: a & b.\n\nConstraints:\n0 <= a, b <= 4294967295",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Bitwise AND OR XOR",
    sampleinput1: "12 10",
    sampleoutput1: "8",
    sampleinput2: "255 15",
    sampleoutput2: "15",
    input1: "7 3",
    output1: "3",
    input2: "1024 512",
    output2: "0",
    input3: "4294967295 0",
    output3: "0",
    inputconstrains: "0 <= a, b <= 4294967295",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    uint32_t a, b;
    if (scanf("%u %u", &a, &b) != 2) {
        return 1;
    }
    printf("%u\\n", a & b);
    return 0;
}
`,
  }),
  codeQ({
    title: "Bitwise OR of Two Unsigned Integers",
    description:
      "Read two unsigned 32-bit integers and print their bitwise OR.\n\nInput Format:\nTwo space-separated unsigned 32-bit integers a and b.\n\nOutput Format:\nA single integer: a | b.\n\nConstraints:\n0 <= a, b <= 4294967295",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Bitwise AND OR XOR",
    sampleinput1: "12 10",
    sampleoutput1: "14",
    sampleinput2: "240 15",
    sampleoutput2: "255",
    input1: "1 2",
    output1: "3",
    input2: "0 0",
    output2: "0",
    input3: "4294967295 0",
    output3: "4294967295",
    inputconstrains: "0 <= a, b <= 4294967295",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    uint32_t a, b;
    if (scanf("%u %u", &a, &b) != 2) {
        return 1;
    }
    printf("%u\\n", a | b);
    return 0;
}
`,
  }),
  codeQ({
    title: "Bitwise XOR of Two Unsigned Integers",
    description:
      "Read two unsigned 32-bit integers and print their bitwise XOR.\n\nInput Format:\nTwo space-separated unsigned 32-bit integers a and b.\n\nOutput Format:\nA single integer: a ^ b.\n\nConstraints:\n0 <= a, b <= 4294967295",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Bitwise AND OR XOR",
    sampleinput1: "12 10",
    sampleoutput1: "6",
    sampleinput2: "255 255",
    sampleoutput2: "0",
    input1: "7 3",
    output1: "4",
    input2: "1024 1024",
    output2: "0",
    input3: "1 2",
    output3: "3",
    inputconstrains: "0 <= a, b <= 4294967295",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    uint32_t a, b;
    if (scanf("%u %u", &a, &b) != 2) {
        return 1;
    }
    printf("%u\\n", a ^ b);
    return 0;
}
`,
  }),
  codeQ({
    title: "Bitwise NOT of an Unsigned Integer",
    description:
      "Read one unsigned 32-bit integer and print its bitwise complement (one's complement).\n\nInput Format:\nA single unsigned 32-bit integer n.\n\nOutput Format:\nA single integer: ~n.\n\nConstraints:\n0 <= n <= 4294967295",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Bitwise NOT",
    sampleinput1: "0",
    sampleoutput1: "4294967295",
    sampleinput2: "5",
    sampleoutput2: "4294967290",
    input1: "1",
    output1: "4294967294",
    input2: "4294967295",
    output2: "0",
    input3: "255",
    output3: "4294967040",
    inputconstrains: "0 <= n <= 4294967295",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    uint32_t n;
    if (scanf("%u", &n) != 1) {
        return 1;
    }
    printf("%u\\n", ~n);
    return 0;
}
`,
  }),
  codeQ({
    title: "Left Shift by K Bits",
    description:
      "Read an unsigned 32-bit integer n and a non-negative integer k. Print n left-shifted by k bits.\n\nInput Format:\nTwo space-separated integers n and k.\n\nOutput Format:\nA single integer: n << k (mod 2^32, as a uint32_t).\n\nConstraints:\n0 <= n <= 4294967295, 0 <= k <= 31",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Left and Right Shift",
    sampleinput1: "1 4",
    sampleoutput1: "16",
    sampleinput2: "3 3",
    sampleoutput2: "24",
    input1: "5 2",
    output1: "20",
    input2: "0 10",
    output2: "0",
    input3: "1 31",
    output3: "2147483648",
    inputconstrains: "0 <= n <= 4294967295, 0 <= k <= 31",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    uint32_t n;
    unsigned int k;
    if (scanf("%u %u", &n, &k) != 2) {
        return 1;
    }
    printf("%u\\n", n << k);
    return 0;
}
`,
  }),
  codeQ({
    title: "Right Shift by K Bits",
    description:
      "Read an unsigned 32-bit integer n and a non-negative integer k. Print n right-shifted by k bits (logical shift).\n\nInput Format:\nTwo space-separated integers n and k.\n\nOutput Format:\nA single integer: n >> k.\n\nConstraints:\n0 <= n <= 4294967295, 0 <= k <= 31",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Left and Right Shift",
    sampleinput1: "16 4",
    sampleoutput1: "1",
    sampleinput2: "100 3",
    sampleoutput2: "12",
    input1: "255 8",
    output1: "0",
    input2: "1024 2",
    output2: "256",
    input3: "4294967295 31",
    output3: "1",
    inputconstrains: "0 <= n <= 4294967295, 0 <= k <= 31",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    uint32_t n;
    unsigned int k;
    if (scanf("%u %u", &n, &k) != 2) {
        return 1;
    }
    printf("%u\\n", n >> k);
    return 0;
}
`,
  }),

  /* ── EASY · 4 scenario ── */
  codeQ({
    title: "Sensor Status Bit Check",
    description:
      "A microcontroller stores the status of 32 sensors in a single 32-bit register. Read the register value and a sensor index k (0-based). Print 1 if sensor k is active (k-th bit set), otherwise 0.\n\nInput Format:\nTwo space-separated integers: register value r and sensor index k.\n\nOutput Format:\nA single integer: 1 if bit k of r is set, else 0.\n\nConstraints:\n0 <= r <= 4294967295, 0 <= k <= 31",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Bit Masking",
    sampleinput1: "12 2",
    sampleoutput1: "1",
    sampleinput2: "12 1",
    sampleoutput2: "0",
    input1: "1 0",
    output1: "1",
    input2: "8 3",
    output2: "1",
    input3: "7 31",
    output3: "0",
    inputconstrains: "0 <= r <= 4294967295, 0 <= k <= 31",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    uint32_t r;
    unsigned int k;
    if (scanf("%u %u", &r, &k) != 2) {
        return 1;
    }
    uint32_t mask = (uint32_t)1 << k;
    if (r & mask) {
        printf("1\\n");
    } else {
        printf("0\\n");
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Alarm Flag Set Operation",
    description:
      "An alarm subsystem uses bit positions in a 32-bit register to denote which alarms are armed. Read the current register r and an alarm index k. Print the new register value after arming alarm k (setting bit k to 1).\n\nInput Format:\nTwo space-separated integers: register value r and alarm index k.\n\nOutput Format:\nA single integer: r with bit k set.\n\nConstraints:\n0 <= r <= 4294967295, 0 <= k <= 31",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Bit Setting and Clearing",
    sampleinput1: "0 3",
    sampleoutput1: "8",
    sampleinput2: "1 1",
    sampleoutput2: "3",
    input1: "12 0",
    output1: "13",
    input2: "255 5",
    output2: "255",
    input3: "0 31",
    output3: "2147483648",
    inputconstrains: "0 <= r <= 4294967295, 0 <= k <= 31",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    uint32_t r;
    unsigned int k;
    if (scanf("%u %u", &r, &k) != 2) {
        return 1;
    }
    uint32_t mask = (uint32_t)1 << k;
    printf("%u\\n", r | mask);
    return 0;
}
`,
  }),
  codeQ({
    title: "Clear Alarm Flag Operation",
    description:
      "Read a 32-bit alarm register r and an alarm index k. Print the new register value after disarming alarm k (clearing bit k to 0).\n\nInput Format:\nTwo space-separated integers: register value r and alarm index k.\n\nOutput Format:\nA single integer: r with bit k cleared.\n\nConstraints:\n0 <= r <= 4294967295, 0 <= k <= 31",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Bit Setting and Clearing",
    sampleinput1: "15 2",
    sampleoutput1: "11",
    sampleinput2: "8 3",
    sampleoutput2: "0",
    input1: "255 0",
    output1: "254",
    input2: "13 0",
    output2: "12",
    input3: "7 1",
    output3: "5",
    inputconstrains: "0 <= r <= 4294967295, 0 <= k <= 31",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    uint32_t r;
    unsigned int k;
    if (scanf("%u %u", &r, &k) != 2) {
        return 1;
    }
    uint32_t mask = (uint32_t)1 << k;
    printf("%u\\n", r & ~mask);
    return 0;
}
`,
  }),
  codeQ({
    title: "Hardware Population Count",
    description:
      "A digital input module captures 32 input lines packed into a single unsigned integer. Read this integer and print the number of input lines that are currently high (number of set bits).\n\nInput Format:\nA single unsigned 32-bit integer.\n\nOutput Format:\nA single integer: the count of set bits.\n\nConstraints:\n0 <= n <= 4294967295",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Bit Counting",
    sampleinput1: "15",
    sampleoutput1: "4",
    sampleinput2: "0",
    sampleoutput2: "0",
    input1: "255",
    output1: "8",
    input2: "1023",
    output2: "10",
    input3: "4294967295",
    output3: "32",
    inputconstrains: "0 <= n <= 4294967295",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    uint32_t n;
    if (scanf("%u", &n) != 1) {
        return 1;
    }
    unsigned int count = 0;
    while (n) {
        n &= n - 1;
        count++;
    }
    printf("%u\\n", count);
    return 0;
}
`,
  }),

  /* ── MEDIUM · 6 scenario (blacklist + whitelist) ── */
  codeQ({
    title: "Toggle Sensor Bit in Register",
    description:
      "A configuration tool toggles (flips) the state of a single sensor bit in a 32-bit register. Read the current register value r and a sensor index k. Print the new register value after flipping bit k (1 becomes 0, 0 becomes 1). Use the XOR-mask idiom.\n\nInput Format:\nTwo space-separated integers: register value r and sensor index k.\n\nOutput Format:\nA single integer: r with bit k flipped.\n\nConstraints:\n0 <= r <= 4294967295, 0 <= k <= 31",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Bit Setting and Clearing",
    sampleinput1: "12 2",
    sampleoutput1: "8",
    sampleinput2: "12 1",
    sampleoutput2: "14",
    input1: "0 0",
    output1: "1",
    input2: "255 0",
    output2: "254",
    input3: "1 31",
    output3: "2147483649",
    inputconstrains: "0 <= r <= 4294967295, 0 <= k <= 31",
    blacklist: "if",
    whitelist: "^=, uint32_t, <<",
    sourcecode: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    uint32_t r;
    unsigned int k;
    while (scanf("%u %u", &r, &k) == 2) {
        r ^= (uint32_t)1 << k;
        printf("%u\\n", r);
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Extract Register Bit Field",
    description:
      "A network protocol packs a 16-bit header field into a 32-bit word at bit positions [lo..hi] inclusive. Read a 32-bit word w, then lo and hi (0 <= lo <= hi <= 31). Extract the field bits at positions lo..hi and print the field's integer value (right-shifted so bit lo becomes bit 0). Use the AND-mask + right-shift idiom.\n\nInput Format:\nThree space-separated integers: w, lo, hi.\n\nOutput Format:\nA single integer: the extracted field value.\n\nConstraints:\n0 <= w <= 4294967295, 0 <= lo <= hi <= 31",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Bit Masking",
    sampleinput1: "255 0 3",
    sampleoutput1: "15",
    sampleinput2: "240 4 7",
    sampleoutput2: "15",
    input1: "4294967295 0 0",
    output1: "1",
    input2: "4294967295 8 15",
    output2: "255",
    input3: "0 4 7",
    output3: "0",
    inputconstrains: "0 <= w <= 4294967295, 0 <= lo <= hi <= 31",
    blacklist: "pow",
    whitelist: "uint32_t, <<, &, >>",
    sourcecode: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    uint32_t w;
    unsigned int lo, hi;
    while (scanf("%u %u %u", &w, &lo, &hi) == 3) {
        uint32_t width = hi - lo + 1;
        uint32_t mask = (((uint32_t)1 << width) - 1u);
        uint32_t field = (w >> lo) & mask;
        printf("%u\\n", field);
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Parity of Byte Stream",
    description:
      "A communication channel transmits bytes and a parity bit is computed as the XOR of all bits in each byte (odd parity = 1 if odd number of bits set). Read n bytes (as unsigned 32-bit values, only low 8 bits used) and print 1 if the total number of set bits across all bytes is odd, 0 if even. Use the XOR reduction idiom.\n\nInput Format:\nFirst line: n. Second line: n space-separated integers.\n\nOutput Format:\nA single integer: 1 for odd parity, 0 for even.\n\nConstraints:\n1 <= n <= 1000, each value in [0, 255]",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Bit Counting",
    sampleinput1: "3\n1 2 3",
    sampleoutput1: "0",
    sampleinput2: "2\n255 1",
    sampleoutput2: "1",
    input1: "1\n0",
    output1: "0",
    input2: "1\n255",
    output2: "0",
    input3: "4\n1 1 1 1",
    output3: "0",
    inputconstrains: "1 <= n <= 1000, 0 <= value <= 255",
    blacklist: "__builtin_",
    whitelist: "^, uint32_t, >>",
    sourcecode: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    int n;
    while (scanf("%d", &n) == 1) {
        uint32_t parity = 0;
        for (int i = 0; i < n; i++) {
            uint32_t v;
            scanf("%u", &v);
            for (int b = 0; b < 8; b++) {
                parity ^= (v >> b) & 1u;
            }
        }
        printf("%u\\n", parity);
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Round Up to Next Power of Two",
    description:
      "A memory allocator rounds up a requested block size to the next power of two (1, 2, 4, 8, ...). Read a positive 32-bit unsigned integer n and print the smallest power of two >= n. Use bit-shift operations only. For n already a power of two, output n itself. For n = 0, output 1.\n\nInput Format:\nA single unsigned 32-bit integer n.\n\nOutput Format:\nA single integer: the next power of two >= n.\n\nConstraints:\n0 <= n <= 2147483647",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Left and Right Shift",
    sampleinput1: "5",
    sampleoutput1: "8",
    sampleinput2: "16",
    sampleoutput2: "16",
    input1: "1",
    output1: "1",
    input2: "100",
    output2: "128",
    input3: "1023",
    output3: "1024",
    inputconstrains: "0 <= n <= 2147483647",
    blacklist: "pow",
    whitelist: "uint32_t, <<",
    sourcecode: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    uint32_t n;
    while (scanf("%u", &n) == 1) {
        uint32_t p = 1;
        while (p < n) {
            p <<= 1;
        }
        printf("%u\\n", p);
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "XOR Cipher Encode and Decode",
    description:
      "A simple symmetric cipher XORs each character of a message with a single-byte key. Read a string (no whitespace, max length 100) and a key byte k. Print the encoded (and equivalently decoded) byte values as decimal integers separated by spaces. Use XOR per character.\n\nInput Format:\nLine 1: the string s. Line 2: the key k.\n\nOutput Format:\nSpace-separated decimal integers (one per character).\n\nConstraints:\n1 <= strlen(s) <= 100, 0 <= k <= 255",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Bitwise AND OR XOR",
    sampleinput1: "hello\n42",
    sampleoutput1: "66 79 70 70 69",
    sampleinput2: "ABC\n0",
    sampleoutput2: "65 66 67",
    input1: "a\n1",
    output1: "96",
    input2: "test\n255",
    output2: "139 154 140 139",
    input3: "x\n0",
    output3: "120",
    inputconstrains: "1 <= strlen(s) <= 100, 0 <= k <= 255",
    blacklist: "sprintf",
    whitelist: "^, char *, unsigned char",
    sourcecode: `#include <stdio.h>
#include <string.h>

int main(void) {
    char s[128];
    if (fgets(s, sizeof(s), stdin) == 0) {
        return 1;
    }
    s[strcspn(s, "\\n")] = 0;
    unsigned int k;
    if (scanf("%u", &k) != 1) {
        return 1;
    }
    int n = (int)strlen(s);
    for (int i = 0; i < n; i++) {
        char *p = &s[i];
        unsigned char enc = (unsigned char)((*p) ^ (unsigned char)k);
        if (i) {
            printf(" ");
        }
        printf("%u", (unsigned int)enc);
    }
    printf("\\n");
    return 0;
}
`,
  }),
  codeQ({
    title: "Reverse Bits in a Byte",
    description:
      "A graphics library reverses the bit order of each byte (bit 0 <-> bit 7, bit 1 <-> bit 6, ...). Read a single byte value v (0-255) and print the byte with its bits reversed. Use only bit shifts and masks.\n\nInput Format:\nA single integer v.\n\nOutput Format:\nA single integer: the byte-reversed value.\n\nConstraints:\n0 <= v <= 255",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Left and Right Shift",
    sampleinput1: "1",
    sampleoutput1: "128",
    sampleinput2: "128",
    sampleoutput2: "1",
    input1: "0",
    output1: "0",
    input2: "255",
    output2: "255",
    input3: "170",
    output3: "85",
    inputconstrains: "0 <= v <= 255",
    blacklist: "sprintf",
    whitelist: "uint32_t, <<, >>, &",
    sourcecode: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    uint32_t v;
    while (scanf("%u", &v) == 1) {
        uint32_t r = 0;
        for (int i = 0; i < 8; i++) {
            r <<= 1;
            r |= (v >> i) & 1u;
        }
        printf("%u\\n", r);
    }
    return 0;
}
`,
  }),

  /* ── HARD · 4 scenario (blacklist + whitelist) ── */
  codeQ({
    title: "Russian Peasant Bitwise Multiplication",
    description:
      "An embedded firmware cannot use the hardware multiplier for a specific hot loop. Implement unsigned integer multiplication using only bit shifts and additions (Russian peasant method). Read two unsigned 32-bit integers a and b and print a * b. The product fits in 64 bits.\n\nInput Format:\nTwo space-separated unsigned 32-bit integers.\n\nOutput Format:\nA single integer: the product a * b.\n\nConstraints:\n0 <= a, b <= 4294967295",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Left and Right Shift",
    sampleinput1: "6 7",
    sampleoutput1: "42",
    sampleinput2: "1000 1000",
    sampleoutput2: "1000000",
    input1: "0 5",
    output1: "0",
    input2: "1 4294967295",
    output2: "4294967295",
    input3: "4294967295 2",
    output3: "8589934590",
    inputconstrains: "0 <= a, b <= 4294967295",
    blacklist: "pow, *",
    whitelist: "uint64_t, <<, >>, &",
    sourcecode: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    uint32_t a, b;
    while (scanf("%u %u", &a, &b) == 2) {
        uint64_t x = a;
        uint64_t y = b;
        uint64_t result = 0;
        while (y > 0) {
            if (y & 1u) {
                result += x;
            }
            x <<= 1;
            y >>= 1;
        }
        printf("%llu\\n", (unsigned long long)result);
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Bitwise Unsigned Division Algorithm",
    description:
      "Implement unsigned 32-bit integer division using bit shifts and subtractions (the restoring division algorithm). Read dividend a and divisor b. Print the quotient a / b. Handle b = 0 by printing -1. Do not use the /, %, or * operators; use shifts and comparisons.\n\nInput Format:\nTwo space-separated unsigned 32-bit integers a and b.\n\nOutput Format:\nA single integer: the quotient, or -1 if b is 0.\n\nConstraints:\n0 <= a, b <= 4294967295",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Left and Right Shift",
    sampleinput1: "20 4",
    sampleoutput1: "5",
    sampleinput2: "100 3",
    sampleoutput2: "33",
    input1: "0 5",
    output1: "0",
    input2: "7 0",
    output2: "-1",
    input3: "4294967295 1",
    output3: "4294967295",
    inputconstrains: "0 <= a, b <= 4294967295",
    blacklist: "/, *",
    whitelist: "uint32_t, <<, >>, &",
    sourcecode: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    uint32_t a, b;
    while (scanf("%u %u", &a, &b) == 2) {
        if (b == 0) {
            printf("-1\\n");
            continue;
        }
        uint32_t quotient = 0;
        uint32_t remainder = 0;
        for (int i = 31; i >= 0; i--) {
            remainder <<= 1;
            remainder |= (a >> i) & 1u;
            if (remainder >= b) {
                remainder -= b;
                quotient |= ((uint32_t)1 << i);
            }
        }
        printf("%u\\n", quotient);
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Find Lowest Set Bit Position",
    description:
      "A scheduler needs to find the lowest-indexed ready task in a 32-bit ready-mask. Read a 32-bit unsigned integer r (non-zero). Print the position (0-based) of the lowest set bit. Implement using the Kernighan trick n & (n-1) to isolate the lowest set bit. Do not use __builtin_ctz.\n\nInput Format:\nA single unsigned 32-bit integer r (non-zero).\n\nOutput Format:\nA single integer: the 0-based index of the lowest set bit.\n\nConstraints:\n1 <= r <= 4294967295",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Bit Masking",
    sampleinput1: "12",
    sampleoutput1: "2",
    sampleinput2: "1",
    sampleoutput2: "0",
    input1: "8",
    output1: "3",
    input2: "1024",
    output2: "10",
    input3: "4294967295",
    output3: "0",
    inputconstrains: "1 <= r <= 4294967295",
    blacklist: "__builtin_",
    whitelist: "uint32_t, &=, ^",
    sourcecode: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    uint32_t r;
    while (scanf("%u", &r) == 1) {
        uint32_t prev = r;
        prev &= r - 1u;
        uint32_t isolated = r ^ prev;
        unsigned int pos = 0;
        while (isolated > 1u) {
            isolated >>= 1;
            pos++;
        }
        printf("%u\\n", pos);
    }
    return 0;
}
`,
  }),
  codeQ({
    title: "Hamming Distance Between Codewords",
    description:
      "A forward error correction module computes the Hamming distance between two 32-bit codewords (the number of bit positions in which they differ). Read two unsigned 32-bit integers and print their Hamming distance. Use XOR followed by Kernighan popcount.\n\nInput Format:\nTwo space-separated unsigned 32-bit integers.\n\nOutput Format:\nA single integer: the Hamming distance.\n\nConstraints:\n0 <= a, b <= 4294967295",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Bit Counting",
    sampleinput1: "1 2",
    sampleoutput1: "2",
    sampleinput2: "0 0",
    sampleoutput2: "0",
    input1: "255 0",
    output1: "8",
    input2: "4294967295 0",
    output2: "32",
    input3: "12 12",
    output3: "0",
    inputconstrains: "0 <= a, b <= 4294967295",
    blacklist: "__builtin_",
    whitelist: "uint32_t, ^=, &=",
    sourcecode: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    uint32_t a, b;
    while (scanf("%u %u", &a, &b) == 2) {
        uint32_t diff = a;
        diff ^= b;
        unsigned int count = 0;
        while (diff) {
            diff &= diff - 1u;
            count++;
        }
        printf("%u\\n", count);
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
    title: "Bitwise AND Truth Table",
    description:
      "What is the value of 0b1100 & 0b1010 in C (using uint32_t operands)?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Bitwise AND OR XOR",
    Option1: "0b1000 (decimal 8)",
    Option2: "0b1110 (decimal 14)",
    Option3: "0b0010 (decimal 2)",
    Option4: "0b1111 (decimal 15)",
    CorrectOption: 1,
  }),
  mcq({
    title: "Bitwise OR Truth Table",
    description:
      "What is the value of 0b1100 | 0b1010 in C?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Bitwise AND OR XOR",
    Option1: "0b1000 (decimal 8)",
    Option2: "0b1110 (decimal 14)",
    Option3: "0b0110 (decimal 6)",
    Option4: "0b1111 (decimal 15)",
    CorrectOption: 2,
  }),
  mcq({
    title: "Bitwise XOR of Identical Operands",
    description:
      "For any unsigned integer x, what is x ^ x?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Bitwise AND OR XOR",
    Option1: "x",
    Option2: "0",
    Option3: "all ones (~0u)",
    Option4: "1",
    CorrectOption: 2,
  }),
  mcq({
    title: "Bitwise NOT of Zero",
    description:
      "What is ~0u (bitwise NOT of 0u, treated as a 32-bit unsigned int)?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Bitwise NOT",
    Option1: "0",
    Option2: "1",
    Option3: "4294967295 (all 32 bits set)",
    Option4: "-1",
    CorrectOption: 3,
  }),
  mcq({
    title: "Left Shift by 1 Equivalent",
    description:
      "For a non-negative unsigned integer n, what does n << 1 compute?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Left and Right Shift",
    Option1: "n divided by 2",
    Option2: "n multiplied by 2 (mod 2^32)",
    Option3: "n plus 2",
    Option4: "n modulo 2",
    CorrectOption: 2,
  }),
  mcq({
    title: "Right Shift of Unsigned Value",
    description:
      "For an unsigned 32-bit integer x, what does x >> 3 compute?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Left and Right Shift",
    Option1: "Integer floor division by 8",
    Option2: "x modulo 8",
    Option3: "x multiplied by 8",
    Option4: "x with the top 3 bits cleared",
    CorrectOption: 1,
  }),
  mcq({
    title: "Mask to Isolate Lowest 4 Bits",
    description:
      "Which mask extracts only the lowest 4 bits of an unsigned int x using x & mask?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Bit Masking",
    Option1: "0xF (15)",
    Option2: "0xFF (255)",
    Option3: "0xF0 (240)",
    Option4: "0x10 (16)",
    CorrectOption: 1,
  }),
  mcq({
    title: "Set k-th Bit Idiom",
    description:
      "Which expression sets bit k of an unsigned int r to 1 (without disturbing other bits)?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Bit Setting and Clearing",
    Option1: "r & (1u << k)",
    Option2: "r | (1u << k)",
    Option3: "r ^ (1u << k)",
    Option4: "r & ~(1u << k)",
    CorrectOption: 2,
  }),
  mcq({
    title: "Clear k-th Bit Idiom",
    description:
      "Which expression clears bit k of an unsigned int r to 0 (without disturbing other bits)?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Bit Setting and Clearing",
    Option1: "r | (1u << k)",
    Option2: "r & (1u << k)",
    Option3: "r & ~(1u << k)",
    Option4: "r ^ (1u << k)",
    CorrectOption: 3,
  }),
  mcq({
    title: "Kernighan Popcount Loop",
    description:
      "The loop `while (n) { n &= n - 1; count++; }` counts the number of set bits in n. How many iterations does it run for n = 0b10000 (16)?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Bit Counting",
    Option1: "32",
    Option2: "16",
    Option3: "1",
    Option4: "5",
    CorrectOption: 3,
  }),

  /* 6 medium — at least 4 code snippets */
  mcq({
    title: "Output of XOR Mask Snippet",
    description:
      "What does the following C snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Bitwise AND OR XOR",
    Option1: "5",
    Option2: "0",
    Option3: "15",
    Option4: "10",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
#include <stdint.h>
int main(void) {
    uint32_t a = 0b1100;
    uint32_t b = 0b0011;
    uint32_t r = (a ^ b) & (a ^ b);
    printf("%u\\n", r ^ r);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Bit Mask Extract Field Snippet",
    description:
      "What does the following C snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Bit Masking",
    Option1: "11",
    Option2: "15",
    Option3: "14",
    Option4: "12",
    CorrectOption: 4,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
#include <stdint.h>
int main(void) {
    uint32_t w = 0xABC;
    uint32_t field = (w >> 4) & 0xFu;
    printf("%u\\n", field);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Set and Clear Combined Snippet",
    description:
      "What does the following C snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Bit Setting and Clearing",
    Option1: "11",
    Option2: "9",
    Option3: "13",
    Option4: "5",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
#include <stdint.h>
int main(void) {
    uint32_t r = 0;
    r |= (1u << 3);
    r |= (1u << 1);
    r &= ~(1u << 3);
    printf("%u\\n", r);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Left Shift Overflow Snippet",
    description:
      "What does the following C snippet print? (Assume uint32_t is 32 bits.)",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Left and Right Shift",
    Option1: "2147483648",
    Option2: "0",
    Option3: "1",
    Option4: "4294967295",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
#include <stdint.h>
int main(void) {
    uint32_t x = 1u;
    x = x << 31;
    printf("%u\\n", x);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Kernighan Count Idiom Snippet",
    description:
      "What does the following C snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Bit Counting",
    Option1: "0",
    Option2: "3",
    Option3: "7",
    Option4: "8",
    CorrectOption: 3,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
#include <stdint.h>
int main(void) {
    uint32_t n = 0b10101110;
    unsigned int c = 0;
    while (n) {
        n &= n - 1;
        c++;
    }
    printf("%u\\n", c);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Toggle with XOR Idiom",
    description:
      "When you compute `r ^= (1u << k)`, what happens to bit k of r?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Bit Setting and Clearing",
    Option1: "It is set to 1 unconditionally",
    Option2: "It is cleared to 0 unconditionally",
    Option3: "It is flipped (0 becomes 1, 1 becomes 0)",
    Option4: "It is unchanged",
    CorrectOption: 3,
  }),

  /* 4 hard — at least 2 code snippets */
  mcq({
    title: "Hamming Distance via XOR Popcount",
    description:
      "To compute the Hamming distance between two unsigned ints a and b, the most idiomatic approach is to compute popcount of which expression?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Bit Counting",
    Option1: "a & b",
    Option2: "a | b",
    Option3: "a ^ b",
    Option4: "a + b",
    CorrectOption: 3,
  }),
  mcq({
    title: "Round Up Power of Two Snippet",
    description:
      "What does the following C snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Left and Right Shift",
    Option1: "32",
    Option2: "64",
    Option3: "31",
    Option4: "16",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
#include <stdint.h>
int main(void) {
    uint32_t n = 33;
    uint32_t p = 1;
    while (p < n) {
        p <<= 1;
    }
    printf("%u\\n", p);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Isolate Lowest Set Bit Snippet",
    description:
      "What does the following C snippet print? (The expression r & (-(int)r) or r & (~r + 1) isolates the lowest set bit.)",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Bit Masking",
    Option1: "1",
    Option2: "2",
    Option3: "8",
    Option4: "12",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
#include <stdint.h>
int main(void) {
    uint32_t r = 12;
    uint32_t low = r & (~r + 1u);
    printf("%u\\n", low);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Russian Peasant Multiplication Snippet",
    description:
      "What does the following C snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Left and Right Shift",
    Option1: "12",
    Option2: "35",
    Option3: "7",
    Option4: "0",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
#include <stdint.h>
int main(void) {
    uint32_t a = 7, b = 5;
    uint64_t result = 0;
    uint64_t x = a, y = b;
    while (y) {
        if (y & 1u) result += x;
        x <<= 1;
        y >>= 1;
    }
    printf("%llu\\n", (unsigned long long)result);
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
