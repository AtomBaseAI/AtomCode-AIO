/**
 * Builder for Day 11 — "String Manipulation".
 * Emits:
 *   /home/z/my-project/scripts/c-programming/data/day-11.code.json  (20 code questions)
 *   /home/z/my-project/scripts/c-programming/data/day-11.mcq.json   (20 MCQ questions)
 *
 * Subtopics (exact strings from taxonomy.ts):
 *   String Reversal, Palindrome Check, Anagram Check, Character Frequency,
 *   String Transformation, Pattern Manipulation with Strings
 */
import { writeFileSync } from "node:fs";

const DAY = 11;
const TOPIC = "String Manipulation";
const SUBTOPICS = [
  "String Reversal",
  "Palindrome Check",
  "Anagram Check",
  "Character Frequency",
  "String Transformation",
  "Pattern Manipulation with Strings",
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
    title: "Reverse Word Characters Drill",
    description:
      "Given a single non-empty word consisting only of lowercase English letters, print the word with its characters reversed.\n\nInput Format:\nA single line containing one word (lowercase letters only).\n\nOutput Format:\nThe reversed word on a single line.\n\nConstraints:\n1 <= word length <= 1000",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "String Reversal",
    sampleinput1: "hello",
    sampleoutput1: "olleh",
    sampleinput2: "racecar",
    sampleoutput2: "racecar",
    input1: "abcdef",
    output1: "fedcba",
    input2: "atom",
    output2: "mota",
    input3: "z",
    output3: "z",
    inputconstrains: "1 <= word length <= 1000, lowercase letters only",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>
#include <string.h>

int main(void) {
    char s[1024];
    if (fgets(s, sizeof(s), stdin) == NULL) return 0;
    s[strcspn(s, "\\n")] = 0;
    int n = (int)strlen(s);
    for (int i = n - 1; i >= 0; i--) putchar(s[i]);
    putchar('\\n');
    return 0;
}
`,
  }),
  codeQ({
    title: "Palindrome Word Check Drill",
    description:
      "Given a single non-empty word of lowercase English letters, determine whether it is a palindrome (reads the same forward and backward).\n\nInput Format:\nA single line containing one word (lowercase letters only).\n\nOutput Format:\nPrint \"Yes\" if the word is a palindrome, otherwise print \"No\".\n\nConstraints:\n1 <= word length <= 1000",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Palindrome Check",
    sampleinput1: "racecar",
    sampleoutput1: "Yes",
    sampleinput2: "hello",
    sampleoutput2: "No",
    input1: "abcba",
    output1: "Yes",
    input2: "abca",
    output2: "No",
    input3: "a",
    output3: "Yes",
    inputconstrains: "1 <= word length <= 1000, lowercase letters only",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>
#include <string.h>

int main(void) {
    char s[1024];
    if (fgets(s, sizeof(s), stdin) == NULL) return 0;
    s[strcspn(s, "\\n")] = 0;
    int n = (int)strlen(s);
    int is_pal = 1;
    for (int i = 0, j = n - 1; i < j; i++, j--) {
        if (s[i] != s[j]) { is_pal = 0; break; }
    }
    printf("%s\\n", is_pal ? "Yes" : "No");
    return 0;
}
`,
  }),
  codeQ({
    title: "Anagram Pair Check Drill",
    description:
      "Given two lowercase words of equal length, determine whether they are anagrams (contain the same multiset of letters).\n\nInput Format:\nTwo lines, each containing one lowercase word.\n\nOutput Format:\nPrint \"Yes\" if they are anagrams, otherwise print \"No\".\n\nConstraints:\n1 <= length of each word <= 1000",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Anagram Check",
    sampleinput1: "listen\nsilent",
    sampleoutput1: "Yes",
    sampleinput2: "hello\nworld",
    sampleoutput2: "No",
    input1: "triangle\nintegral",
    output1: "Yes",
    input2: "abc\nabd",
    output2: "No",
    input3: "atom\ntoma",
    output3: "Yes",
    inputconstrains: "1 <= length of each word <= 1000, lowercase letters only",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>
#include <string.h>

int main(void) {
    char a[1024], b[1024];
    if (fgets(a, sizeof(a), stdin) == NULL) return 0;
    if (fgets(b, sizeof(b), stdin) == NULL) return 0;
    a[strcspn(a, "\\n")] = 0;
    b[strcspn(b, "\\n")] = 0;
    int ca[26] = {0}, cb[26] = {0};
    for (int i = 0; a[i]; i++) ca[a[i] - 'a']++;
    for (int i = 0; b[i]; i++) cb[b[i] - 'a']++;
    int ok = 1;
    for (int i = 0; i < 26; i++) {
        if (ca[i] != cb[i]) { ok = 0; break; }
    }
    printf("%s\\n", ok ? "Yes" : "No");
    return 0;
}
`,
  }),
  codeQ({
    title: "Count Character Occurrences Drill",
    description:
      "Given a string s and a character c, count how many times c occurs in s.\n\nInput Format:\nLine 1: the string s.\nLine 2: a single character c.\n\nOutput Format:\nA single integer — the number of occurrences.\n\nConstraints:\n1 <= |s| <= 1000",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Character Frequency",
    sampleinput1: "mississippi\ns",
    sampleoutput1: "4",
    sampleinput2: "hello\nl",
    sampleoutput2: "2",
    input1: "abcdef\nz",
    output1: "0",
    input2: "aaaaa\na",
    output2: "5",
    input3: "atomcode\no",
    output3: "2",
    inputconstrains: "1 <= |s| <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>
#include <string.h>

int main(void) {
    char s[1024];
    char c;
    if (fgets(s, sizeof(s), stdin) == NULL) return 0;
    s[strcspn(s, "\\n")] = 0;
    if (scanf(" %c", &c) != 1) return 0;
    int count = 0;
    for (int i = 0; s[i]; i++) {
        if (s[i] == c) count++;
    }
    printf("%d\\n", count);
    return 0;
}
`,
  }),
  codeQ({
    title: "Uppercase to Lowercase Conversion",
    description:
      "Given a string containing letters, spaces and punctuation, convert every uppercase letter A-Z to its lowercase equivalent and leave all other characters unchanged.\n\nInput Format:\nA single line containing the input string.\n\nOutput Format:\nThe transformed string on a single line.\n\nConstraints:\n1 <= |s| <= 1000",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "String Transformation",
    sampleinput1: "HELLO",
    sampleoutput1: "hello",
    sampleinput2: "Hello World",
    sampleoutput2: "hello world",
    input1: "ATOMCODE",
    output1: "atomcode",
    input2: "123 ABC",
    output2: "123 abc",
    input3: "aBcDe",
    output3: "abcde",
    inputconstrains: "1 <= |s| <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>
#include <string.h>

int main(void) {
    char s[1024];
    if (fgets(s, sizeof(s), stdin) == NULL) return 0;
    s[strcspn(s, "\\n")] = 0;
    for (int i = 0; s[i]; i++) {
        if (s[i] >= 'A' && s[i] <= 'Z') {
            s[i] = (char)(s[i] - 'A' + 'a');
        }
    }
    printf("%s\\n", s);
    return 0;
}
`,
  }),
  codeQ({
    title: "Replace Vowels with Asterisk",
    description:
      "Given a string, replace every vowel (a, e, i, o, u in either case) with the character '*' and leave all other characters unchanged.\n\nInput Format:\nA single line containing the input string.\n\nOutput Format:\nThe transformed string on a single line.\n\nConstraints:\n1 <= |s| <= 1000",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Pattern Manipulation with Strings",
    sampleinput1: "hello",
    sampleoutput1: "h*ll*",
    sampleinput2: "ATOMCODE",
    sampleoutput2: "*T*MC*D*",
    input1: "aeiou",
    output1: "*****",
    input2: "rhythm",
    output2: "rhythm",
    input3: "AbE",
    output3: "*b*",
    inputconstrains: "1 <= |s| <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>
#include <string.h>

int main(void) {
    char s[1024];
    if (fgets(s, sizeof(s), stdin) == NULL) return 0;
    s[strcspn(s, "\\n")] = 0;
    for (int i = 0; s[i]; i++) {
        char c = s[i];
        if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u' ||
            c == 'A' || c == 'E' || c == 'I' || c == 'O' || c == 'U') {
            s[i] = '*';
        }
    }
    printf("%s\\n", s);
    return 0;
}
`,
  }),

  /* ─────────── EASY SCENARIO (4) ─────────── */
  codeQ({
    title: "Domain Name Reversal Inspector",
    description:
      "A network engineer inspects a hostname by reading it character-by-character from right to left to verify the top-level suffix. Given a single hostname token (letters and dots only), print the hostname reversed.\n\nInput Format:\nA single line containing one hostname token (no spaces).\n\nOutput Format:\nThe reversed hostname on a single line.\n\nConstraints:\n1 <= hostname length <= 1000",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "String Reversal",
    sampleinput1: "google.com",
    sampleoutput1: "moc.elgoog",
    sampleinput2: "atomcode.in",
    sampleoutput2: "ni.edocmota",
    input1: "openai.ai",
    output1: "ia.ianepo",
    input2: "example.org",
    output2: "gro.elpmaxe",
    input3: "abc",
    output3: "cba",
    inputconstrains: "1 <= hostname length <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>
#include <string.h>

int main(void) {
    char s[1024];
    if (fgets(s, sizeof(s), stdin) == NULL) return 0;
    s[strcspn(s, "\\n")] = 0;
    int n = (int)strlen(s);
    for (int i = n - 1; i >= 0; i--) putchar(s[i]);
    putchar('\\n');
    return 0;
}
`,
  }),
  codeQ({
    title: "Coupon Code Palindrome Validator",
    description:
      "An e-commerce store issues promotional coupon codes that are guaranteed to be palindromes (so the code reads the same forwards and backwards). Given a coupon code (alphanumeric, no spaces), validate it.\n\nInput Format:\nA single line containing the coupon code.\n\nOutput Format:\nPrint \"Valid\" if it is a palindrome, otherwise \"Invalid\".\n\nConstraints:\n1 <= code length <= 1000",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Palindrome Check",
    sampleinput1: "aba121aba",
    sampleoutput1: "Valid",
    sampleinput2: "abc123",
    sampleoutput2: "Invalid",
    input1: "levelup",
    output1: "Invalid",
    input2: "12321",
    output2: "Valid",
    input3: "1",
    output3: "Valid",
    inputconstrains: "1 <= code length <= 1000, alphanumeric only",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>
#include <string.h>

int main(void) {
    char s[1024];
    if (fgets(s, sizeof(s), stdin) == NULL) return 0;
    s[strcspn(s, "\\n")] = 0;
    int n = (int)strlen(s);
    int is_pal = 1;
    for (int i = 0, j = n - 1; i < j; i++, j--) {
        if (s[i] != s[j]) { is_pal = 0; break; }
    }
    printf("%s\\n", is_pal ? "Valid" : "Invalid");
    return 0;
}
`,
  }),
  codeQ({
    title: "Scrabble Tile Anagram Verifier",
    description:
      "Two Scrabble players each lay down their tile racks. Determine whether their two racks contain exactly the same multiset of letters (only lowercase letters are compared).\n\nInput Format:\nTwo lines, each containing one player's rack as a single string of lowercase letters.\n\nOutput Format:\nPrint \"Match\" if the racks are anagrams, otherwise \"NoMatch\".\n\nConstraints:\n1 <= length of each rack <= 1000",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Anagram Check",
    sampleinput1: "listen\nsilent",
    sampleoutput1: "Match",
    sampleinput2: "hello\nworld",
    sampleoutput2: "NoMatch",
    input1: "triangle\nintegral",
    output1: "Match",
    input2: "atom\ncar",
    output2: "NoMatch",
    input3: "aab\naba",
    output3: "Match",
    inputconstrains: "1 <= length of each rack <= 1000, lowercase letters only",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>
#include <string.h>

int main(void) {
    char a[1024], b[1024];
    if (fgets(a, sizeof(a), stdin) == NULL) return 0;
    if (fgets(b, sizeof(b), stdin) == NULL) return 0;
    a[strcspn(a, "\\n")] = 0;
    b[strcspn(b, "\\n")] = 0;
    int ca[26] = {0}, cb[26] = {0};
    for (int i = 0; a[i]; i++) {
        if (a[i] >= 'a' && a[i] <= 'z') ca[a[i] - 'a']++;
    }
    for (int i = 0; b[i]; i++) {
        if (b[i] >= 'a' && b[i] <= 'z') cb[b[i] - 'a']++;
    }
    int ok = 1;
    for (int i = 0; i < 26; i++) {
        if (ca[i] != cb[i]) { ok = 0; break; }
    }
    printf("%s\\n", ok ? "Match" : "NoMatch");
    return 0;
}
`,
  }),
  codeQ({
    title: "Chat Exclamation Mark Counter",
    description:
      "A moderation tool flags chat messages containing many exclamation marks as potential shouting. Given a single-line chat message, count how many '!' characters appear.\n\nInput Format:\nA single line containing the chat message.\n\nOutput Format:\nA single integer — the number of '!' characters.\n\nConstraints:\n1 <= message length <= 1000",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "Character Frequency",
    sampleinput1: "Hey!!! Hello world!!!",
    sampleoutput1: "6",
    sampleinput2: "Calm message here",
    sampleoutput2: "0",
    input1: "Wow!",
    output1: "1",
    input2: "!!!!!",
    output2: "5",
    input3: "no exclamation here",
    output3: "0",
    inputconstrains: "1 <= message length <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `#include <stdio.h>
#include <string.h>

int main(void) {
    char s[1024];
    if (fgets(s, sizeof(s), stdin) == NULL) return 0;
    s[strcspn(s, "\\n")] = 0;
    int count = 0;
    for (int i = 0; s[i]; i++) {
        if (s[i] == '!') count++;
    }
    printf("%d\\n", count);
    return 0;
}
`,
  }),

  /* ─────────── MEDIUM SCENARIO (6) ─────────── */
  codeQ({
    title: "DNA Strand Reverse Complement",
    description:
      "A bioinformatics tool computes the reverse complement of a DNA strand. Given a strand consisting only of the characters A, C, G, T (uppercase), reverse the strand and then complement each base: A<->T and C<->G. Print the result.\n\nInput Format:\nA single line containing the DNA strand.\n\nOutput Format:\nThe reverse complement strand on a single line.\n\nConstraints:\n1 <= strand length <= 1000, characters in {A, C, G, T}",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "String Reversal",
    sampleinput1: "AAAA",
    sampleoutput1: "TTTT",
    sampleinput2: "ATGC",
    sampleoutput2: "GCAT",
    input1: "ACGTACGT",
    output1: "ACGTACGT",
    input2: "GATTACA",
    output2: "TGTAATC",
    input3: "C",
    output3: "G",
    inputconstrains: "1 <= strand length <= 1000",
    blacklist: "strrev, strcasecmp",
    whitelist: "char *, for (",
    sourcecode: `#include <stdio.h>
#include <string.h>

int main(void) {
    char s[1024];
    if (fgets(s, sizeof(s), stdin) == NULL) return 0;
    s[strcspn(s, "\\n")] = 0;
    int n = (int)strlen(s);
    char out[1024];
    char *src = s;
    char *dst = out;
    for (int i = 0; i < n; i++) {
        char c = src[n - 1 - i];
        char comp;
        if (c == 'A') comp = 'T';
        else if (c == 'T') comp = 'A';
        else if (c == 'C') comp = 'G';
        else if (c == 'G') comp = 'C';
        else comp = c;
        dst[i] = comp;
    }
    dst[n] = 0;
    printf("%s\\n", out);
    return 0;
}
`,
  }),
  codeQ({
    title: "Sentence Palindrome Moderator",
    description:
      "A moderation tool flags reviews whose letter pattern is a palindrome when spaces, punctuation and letter case are ignored. Given a single-line sentence, decide whether it is a palindrome considering only letters (case-insensitive).\n\nInput Format:\nA single line containing the sentence.\n\nOutput Format:\nPrint \"Yes\" if it is a palindrome, otherwise \"No\".\n\nConstraints:\n1 <= sentence length <= 2000",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Palindrome Check",
    sampleinput1: "A man, a plan, a canal: Panama",
    sampleoutput1: "Yes",
    sampleinput2: "race a car",
    sampleoutput2: "No",
    input1: "Was it a car or a cat I saw",
    output1: "Yes",
    input2: "hello world",
    output2: "No",
    input3: "No lemon, no melon",
    output3: "Yes",
    inputconstrains: "1 <= sentence length <= 2000",
    blacklist: "strrev, strcasecmp",
    whitelist: "for (",
    sourcecode: `#include <stdio.h>
#include <string.h>
#include <ctype.h>

int main(void) {
    char s[2048];
    if (fgets(s, sizeof(s), stdin) == NULL) return 0;
    s[strcspn(s, "\\n")] = 0;
    char filtered[2048];
    int m = 0;
    for (int i = 0; s[i]; i++) {
        if (isalpha((unsigned char)s[i])) {
            filtered[m++] = (char)tolower((unsigned char)s[i]);
        }
    }
    filtered[m] = 0;
    int is_pal = 1;
    for (int i = 0, j = m - 1; i < j; i++, j--) {
        if (filtered[i] != filtered[j]) { is_pal = 0; break; }
    }
    printf("%s\\n", is_pal ? "Yes" : "No");
    return 0;
}
`,
  }),
  codeQ({
    title: "Slogan Anagram Comparator",
    description:
      "Two marketing slogans are considered equivalent if they contain the same multiset of letters (ignoring spaces and letter case). Given two single-line slogans, decide whether they are letter-anagrams.\n\nInput Format:\nTwo lines, each containing one slogan.\n\nOutput Format:\nPrint \"Yes\" if they are letter-anagrams, otherwise \"No\".\n\nConstraints:\n1 <= length of each slogan <= 2000",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Anagram Check",
    sampleinput1: "debit card\nbad credit",
    sampleoutput1: "Yes",
    sampleinput2: "hello world\nworld helloo",
    sampleoutput2: "No",
    input1: "the morse code\nhere come dots",
    output1: "Yes",
    input2: "atom code\ncode atom",
    output2: "Yes",
    input3: "abc\nabd",
    output3: "No",
    inputconstrains: "1 <= length of each slogan <= 2000",
    blacklist: "qsort, bsearch",
    whitelist: "for (",
    sourcecode: `#include <stdio.h>
#include <string.h>
#include <ctype.h>

int main(void) {
    char a[2048], b[2048];
    if (fgets(a, sizeof(a), stdin) == NULL) return 0;
    if (fgets(b, sizeof(b), stdin) == NULL) return 0;
    a[strcspn(a, "\\n")] = 0;
    b[strcspn(b, "\\n")] = 0;
    int ca[26] = {0}, cb[26] = {0};
    for (int i = 0; a[i]; i++) {
        if (isalpha((unsigned char)a[i])) ca[tolower((unsigned char)a[i]) - 'a']++;
    }
    for (int i = 0; b[i]; i++) {
        if (isalpha((unsigned char)b[i])) cb[tolower((unsigned char)b[i]) - 'a']++;
    }
    int ok = 1;
    for (int i = 0; i < 26; i++) {
        if (ca[i] != cb[i]) { ok = 0; break; }
    }
    printf("%s\\n", ok ? "Yes" : "No");
    return 0;
}
`,
  }),
  codeQ({
    title: "Ciphertext Frequency Analyst",
    description:
      "A cryptanalyst performs frequency analysis on a ciphertext. Given a string of lowercase letters only, find the most frequent letter. If there is a tie, output the alphabetically smallest letter.\n\nInput Format:\nA single line containing the ciphertext (lowercase letters only).\n\nOutput Format:\nThe most frequent letter (a single character on its own line).\n\nConstraints:\n1 <= |s| <= 1000",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Character Frequency",
    sampleinput1: "mississippi",
    sampleoutput1: "i",
    sampleinput2: "aabbbcccc",
    sampleoutput2: "c",
    input1: "abcdef",
    output1: "a",
    input2: "helloworld",
    output2: "l",
    input3: "zzzaa",
    output3: "z",
    inputconstrains: "1 <= |s| <= 1000, lowercase letters only",
    blacklist: "qsort, bsearch",
    whitelist: "if (, for (",
    sourcecode: `#include <stdio.h>
#include <string.h>

int main(void) {
    char s[1024];
    if (fgets(s, sizeof(s), stdin) == NULL) return 0;
    s[strcspn(s, "\\n")] = 0;
    int freq[26] = {0};
    for (int i = 0; s[i]; i++) {
        if (s[i] >= 'a' && s[i] <= 'z') freq[s[i] - 'a']++;
    }
    int max_count = -1;
    char max_char = 'a';
    for (int i = 0; i < 26; i++) {
        if (freq[i] > max_count) {
            max_count = freq[i];
            max_char = (char)('a' + i);
        }
    }
    printf("%c\\n", max_char);
    return 0;
}
`,
  }),
  codeQ({
    title: "ROT13 Message Encoder",
    description:
      "A forum obfuscates spoilers by applying the ROT13 cipher: each letter is shifted by 13 positions in the alphabet, wrapping around. Non-letter characters are unchanged, and letter case is preserved. Given a message, output its ROT13 encoding.\n\nInput Format:\nA single line containing the message.\n\nOutput Format:\nThe ROT13-encoded message on a single line.\n\nConstraints:\n1 <= |message| <= 1000",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "String Transformation",
    sampleinput1: "Hello",
    sampleoutput1: "Uryyb",
    sampleinput2: "abcXYZ",
    sampleoutput2: "nopKLM",
    input1: "Test123",
    output1: "Grfg123",
    input2: "ATOMCODE",
    output2: "NGBZPBQR",
    input3: "a",
    output3: "n",
    inputconstrains: "1 <= |message| <= 1000",
    blacklist: "tolower, toupper",
    whitelist: "for (, char *",
    sourcecode: `#include <stdio.h>
#include <string.h>

int main(void) {
    char s[1024];
    if (fgets(s, sizeof(s), stdin) == NULL) return 0;
    s[strcspn(s, "\\n")] = 0;
    int n = (int)strlen(s);
    char *p = s;
    for (int i = 0; i < n; i++) {
        char c = p[i];
        if (c >= 'A' && c <= 'Z') {
            p[i] = (char)('A' + (c - 'A' + 13) % 26);
        } else if (c >= 'a' && c <= 'z') {
            p[i] = (char)('a' + (c - 'a' + 13) % 26);
        }
    }
    printf("%s\\n", s);
    return 0;
}
`,
  }),
  codeQ({
    title: "Kebab to Snake Case Converter",
    description:
      "A front-end tool converts CSS class names written in kebab-case (lowercase letters and hyphens) into snake_case identifiers (lowercase letters and underscores). Given a kebab-case string, replace every hyphen '-' with an underscore '_'.\n\nInput Format:\nA single line containing the kebab-case string.\n\nOutput Format:\nThe snake_case string on a single line.\n\nConstraints:\n1 <= |s| <= 1000",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Pattern Manipulation with Strings",
    sampleinput1: "btn-primary",
    sampleoutput1: "btn_primary",
    sampleinput2: "container-fluid-lg",
    sampleoutput2: "container_fluid_lg",
    input1: "atom",
    output1: "atom",
    input2: "a-b-c",
    output2: "a_b_c",
    input3: "nohyphen",
    output3: "nohyphen",
    inputconstrains: "1 <= |s| <= 1000",
    blacklist: "strstr, strchr",
    whitelist: "char *, for (",
    sourcecode: `#include <stdio.h>
#include <string.h>

int main(void) {
    char s[1024];
    if (fgets(s, sizeof(s), stdin) == NULL) return 0;
    s[strcspn(s, "\\n")] = 0;
    int n = (int)strlen(s);
    char *p = s;
    for (int i = 0; i < n; i++) {
        if (p[i] == '-') p[i] = '_';
    }
    printf("%s\\n", s);
    return 0;
}
`,
  }),

  /* ─────────── HARD SCENARIO (4) ─────────── */
  codeQ({
    title: "Sentence Word Order Reverser",
    description:
      "A language translator must reverse the order of words in a sentence while preserving each word's characters. Words are separated by single spaces. There is no leading or trailing whitespace. Given a sentence, print the words in reverse order separated by single spaces.\n\nInput Format:\nA single line containing the sentence (words separated by single spaces).\n\nOutput Format:\nThe sentence with words in reverse order.\n\nConstraints:\n1 <= sentence length <= 2000",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "String Reversal",
    sampleinput1: "the quick brown fox",
    sampleoutput1: "fox brown quick the",
    sampleinput2: "Hello World",
    sampleoutput2: "World Hello",
    input1: "one",
    output1: "one",
    input2: "alpha beta gamma delta",
    output2: "delta gamma beta alpha",
    input3: "a b",
    output3: "b a",
    inputconstrains: "1 <= sentence length <= 2000, single-space separated",
    blacklist: "strtok, strrev",
    whitelist: "char *, for (",
    sourcecode: `#include <stdio.h>
#include <string.h>

int main(void) {
    char s[2048];
    if (fgets(s, sizeof(s), stdin) == NULL) return 0;
    s[strcspn(s, "\\n")] = 0;
    int n = (int)strlen(s);
    int end = n;
    int first = 1;
    for (int i = n - 1; i >= -1; i--) {
        if (i == -1 || s[i] == ' ') {
            int start = i + 1;
            if (start < end) {
                if (!first) putchar(' ');
                char *p = s + start;
                for (int k = 0; k < end - start; k++) putchar(p[k]);
                first = 0;
            }
            end = i;
        }
    }
    putchar('\\n');
    return 0;
}
`,
  }),
  codeQ({
    title: "Anagram Group Counter",
    description:
      "A linguist receives a list of n lowercase words (no spaces, length 1 to 100). Two words are anagrams if they share the same multiset of letters. Count the number of distinct anagram classes (each word belongs to exactly one class).\n\nInput Format:\nLine 1: an integer n.\nNext n lines: one lowercase word per line.\n\nOutput Format:\nA single integer — the number of distinct anagram classes.\n\nConstraints:\n1 <= n <= 100, 1 <= word length <= 100",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Anagram Check",
    sampleinput1: "5\nlisten\nsilent\nenlist\ngoogle\nelgoog",
    sampleoutput1: "2",
    sampleinput2: "3\ncat\ntac\nact",
    sampleoutput2: "1",
    input1: "4\nabc\ndef\nghi\njkl",
    output1: "4",
    input2: "6\nabc\nbca\ncab\nabd\ndba\nbad",
    output2: "2",
    input3: "1\nhello",
    output3: "1",
    inputconstrains: "1 <= n <= 100, 1 <= word length <= 100, lowercase only",
    blacklist: "qsort, strcmp",
    whitelist: "for (, if (",
    sourcecode: `#include <stdio.h>
#include <string.h>

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    static char words[100][101];
    static int sig[100][26];
    int used[100];
    for (int i = 0; i < 100; i++) used[i] = 0;
    for (int i = 0; i < n; i++) {
        if (scanf("%100s", words[i]) != 1) return 0;
        for (int k = 0; k < 26; k++) sig[i][k] = 0;
        for (int k = 0; words[i][k]; k++) sig[i][words[i][k] - 'a']++;
    }
    int groups = 0;
    for (int i = 0; i < n; i++) {
        if (used[i]) continue;
        groups++;
        used[i] = 1;
        for (int j = i + 1; j < n; j++) {
            if (used[j]) continue;
            int same = 1;
            for (int k = 0; k < 26; k++) {
                if (sig[i][k] != sig[j][k]) { same = 0; break; }
            }
            if (same) used[j] = 1;
        }
    }
    printf("%d\\n", groups);
    return 0;
}
`,
  }),
  codeQ({
    title: "Run Length Encoding Compressor",
    description:
      "Compress a string of lowercase letters using run-length encoding: each maximal run of the same character is replaced by the character followed by the run length (when the run length is greater than 1). Single occurrences of a character are emitted as just the character (no count).\n\nInput Format:\nA single line containing the input string (lowercase letters only).\n\nOutput Format:\nThe RLE-compressed string on a single line.\n\nConstraints:\n1 <= |s| <= 1000",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "Character Frequency",
    sampleinput1: "aaabbc",
    sampleoutput1: "a3b2c",
    sampleinput2: "xyz",
    sampleoutput2: "xyz",
    input1: "aabbbcccc",
    output1: "a2b3c4",
    input2: "aaaaaaaaaa",
    output2: "a10",
    input3: "ababab",
    output3: "ababab",
    inputconstrains: "1 <= |s| <= 1000, lowercase letters only",
    blacklist: "sprintf, snprintf",
    whitelist: "char *, for (",
    sourcecode: `#include <stdio.h>
#include <string.h>

int main(void) {
    char s[1024];
    if (fgets(s, sizeof(s), stdin) == NULL) return 0;
    s[strcspn(s, "\\n")] = 0;
    int n = (int)strlen(s);
    char *p = s;
    for (int i = 0; i < n; ) {
        char c = p[i];
        int j;
        for (j = i; j < n && p[j] == c; j++) { }
        int run = j - i;
        putchar(c);
        if (run > 1) {
            char buf[12];
            int k = 0;
            int x = run;
            while (x > 0) { buf[k++] = (char)('0' + (x % 10)); x /= 10; }
            while (k > 0) putchar(buf[--k]);
        }
        i = j;
    }
    putchar('\\n');
    return 0;
}
`,
  }),
  codeQ({
    title: "Title Case Normalizer for CMS",
    description:
      "A blog CMS converts user-entered titles to Title Case, normalizing any run of whitespace (spaces or tabs) into a single space, trimming leading and trailing whitespace. The first letter of each word is uppercased, the remaining letters are lowercased, and non-letter characters are preserved.\n\nInput Format:\nA single line containing the raw title (may contain leading/trailing/internal whitespace and mixed case).\n\nOutput Format:\nThe normalized Title Case title on a single line.\n\nConstraints:\n1 <= |title| <= 2000",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "String Transformation",
    sampleinput1: "  hello   WORLD  ",
    sampleoutput1: "Hello World",
    sampleinput2: "the QUICK brown fox",
    sampleoutput2: "The Quick Brown Fox",
    input1: "ATOMCODE  learning",
    output1: "Atomcode Learning",
    input2: "  multiple\ttabs   here  ",
    output2: "Multiple Tabs Here",
    input3: "a",
    output3: "A",
    inputconstrains: "1 <= |title| <= 2000",
    blacklist: "sscanf, strtok",
    whitelist: "char *, while (",
    sourcecode: `#include <stdio.h>
#include <string.h>

int main(void) {
    char s[2048];
    if (fgets(s, sizeof(s), stdin) == NULL) return 0;
    s[strcspn(s, "\\n")] = 0;
    int n = (int)strlen(s);
    char out[2048];
    char *src = s;
    char *dst = out;
    int out_idx = 0;
    int i = 0;
    int in_word = 0;
    int new_word = 1;
    while (i < n) {
        char c = src[i];
        if (c == ' ' || c == '\\t') {
            in_word = 0;
        } else {
            if (!in_word) {
                if (out_idx > 0) dst[out_idx++] = ' ';
                in_word = 1;
                new_word = 1;
            }
            if (c >= 'a' && c <= 'z' && new_word) {
                dst[out_idx++] = (char)(c - 'a' + 'A');
            } else if (c >= 'A' && c <= 'Z' && !new_word) {
                dst[out_idx++] = (char)(c - 'A' + 'a');
            } else {
                dst[out_idx++] = c;
            }
            new_word = 0;
        }
        i++;
    }
    dst[out_idx] = 0;
    printf("%s\\n", out);
    return 0;
}
`,
  }),
];

/* ────────────────────────────── MCQ QUESTIONS ────────────────────────────── */
const mcqs = [
  /* ─────────── EASY (10) ─────────── */
  mcq({
    title: "Standard String Length Function",
    description:
      "Which function from the standard C library returns the number of characters in a null-terminated string, excluding the null terminator?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "String Reversal",
    Option1: "strlen",
    Option2: "strcpy",
    Option3: "strcmp",
    Option4: "strcat",
    CorrectOption: 1,
  }),
  mcq({
    title: "Compare Equal Strings Return Value",
    description:
      "What value does strcmp return when comparing two identical strings such as strcmp(\"abc\", \"abc\")?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Palindrome Check",
    Option1: "0",
    Option2: "1",
    Option3: "-1",
    Option4: "A pointer to the first character",
    CorrectOption: 1,
  }),
  mcq({
    title: "Required Header for strlen",
    description: "Which standard header must be included to use the strlen function?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Character Frequency",
    Option1: "<string.h>",
    Option2: "<stdio.h>",
    Option3: "<stdlib.h>",
    Option4: "<ctype.h>",
    CorrectOption: 1,
  }),
  mcq({
    title: "Effect of strcat",
    description: "What does strcat(dest, src) do in C?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "String Transformation",
    Option1: "Appends the src string to the end of dest",
    Option2: "Copies src into dest, overwriting dest",
    Option3: "Compares src with dest lexicographically",
    Option4: "Returns the combined length of both strings",
    CorrectOption: 1,
  }),
  mcq({
    title: "Null Character Escape Sequence",
    description: "Which escape sequence represents the null character that terminates C strings?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "String Reversal",
    Option1: "'\\0'",
    Option2: "'\\n'",
    Option3: "'\\t'",
    Option4: "'\\\\'",
    CorrectOption: 1,
  }),
  mcq({
    title: "Internal Representation of C Strings",
    description: "In C, a string literal is stored as which of the following?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "String Transformation",
    Option1: "An array of characters terminated by a null character",
    Option2: "A dedicated string struct with length and capacity",
    Option3: "A linked list of character nodes",
    Option4: "A union of char and int",
    CorrectOption: 1,
  }),
  mcq({
    title: "Safe Bounded String Copy Function",
    description:
      "Which standard library function copies at most n characters from source to destination to avoid buffer overflow?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Pattern Manipulation with Strings",
    Option1: "strncpy",
    Option2: "strrev",
    Option3: "strlen",
    Option4: "strcmp",
    CorrectOption: 1,
  }),
  mcq({
    title: "Idiomatic In-place String Reversal",
    description:
      "Which technique is most idiomatic in C to reverse a null-terminated string in place without using a non-standard function?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "String Reversal",
    Option1: "Swap characters from both ends using two indices until they meet",
    Option2: "Use the qsort function on each character",
    Option3: "Use strcpy to copy the string backwards",
    Option4: "Use strncpy with the reversed source",
    CorrectOption: 1,
  }),
  mcq({
    title: "Indexing vs Pointer Traversal",
    description:
      "In C, what is the relationship between s[i] and the pointer expression *(s + i) for an array or pointer s?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Character Frequency",
    Option1: "They are equivalent and access the same element",
    Option2: "s[i] uses arithmetic while *(s+i) uses indexing",
    Option3: "s[i] reads from the stack and *(s+i) reads from the heap",
    Option4: "They are never equivalent",
    CorrectOption: 1,
  }),
  mcq({
    title: "Anagram Detection Approach",
    description:
      "Which approach is both simple and efficient for deciding whether two lowercase strings are anagrams of each other?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Anagram Check",
    Option1: "Count letter frequencies for both strings and compare the counts",
    Option2: "Reverse one string and check equality with the other",
    Option3: "Sort both strings with qsort and compare pointers",
    Option4: "Use strlen to compare their lengths only",
    CorrectOption: 1,
  }),

  /* ─────────── MEDIUM (6) — at least 4 snippets here ─────────── */
  mcq({
    title: "Manual Length Computation Output",
    description: "What does the following C snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "String Reversal",
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
    title: "Reverse Copy Into Buffer Output",
    description: "What does the following C snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "String Reversal",
    Option1: "dcba",
    Option2: "abcd",
    Option3: "abc",
    Option4: "dcba\\0",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    char s[] = "abcd";
    char t[5];
    int i;
    for (i = 0; i < 4; i++) t[i] = s[3 - i];
    t[4] = 0;
    printf("%s\\n", t);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Palindrome Verification Output",
    description: "What does the following C snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Palindrome Check",
    Option1: "1",
    Option2: "0",
    Option3: "7",
    Option4: "6",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    char s[] = "racecar";
    int pal = 1;
    for (int i = 0; i < 3; i++) {
        if (s[i] != s[6 - i]) pal = 0;
    }
    printf("%d\\n", pal);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Vowel Count Output",
    description: "What does the following C snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Character Frequency",
    Option1: "2",
    Option2: "3",
    Option3: "1",
    Option4: "0",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    char s[] = "Hello";
    int v = 0;
    for (int i = 0; s[i]; i++) {
        char c = s[i];
        if (c=='a'||c=='e'||c=='i'||c=='o'||c=='u'||c=='A'||c=='E'||c=='I'||c=='O'||c=='U') v++;
    }
    printf("%d\\n", v);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Anagram Comparison Output",
    description: "What does the following C snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Anagram Check",
    Option1: "1",
    Option2: "0",
    Option3: "6",
    Option4: "26",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    char a[] = "listen";
    char b[] = "silent";
    int ca[26] = {0}, cb[26] = {0};
    for (int i = 0; a[i]; i++) ca[a[i]-'a']++;
    for (int i = 0; b[i]; i++) cb[b[i]-'a']++;
    int same = 1;
    for (int i = 0; i < 26; i++) if (ca[i] != cb[i]) same = 0;
    printf("%d\\n", same);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Caesar Shift by One Output",
    description: "What does the following C snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "String Transformation",
    Option1: "bcd",
    Option2: "abc",
    Option3: "abd",
    Option4: "bce",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    char s[] = "abc";
    char t[10];
    int i;
    for (i = 0; s[i]; i++) t[i] = (char)(s[i] + 1);
    t[i] = 0;
    printf("%s\\n", t);
    return 0;
}
`,
    snippetLang: "c",
  }),

  /* ─────────── HARD (4) — all snippets ─────────── */
  mcq({
    title: "Letter Count In Sentence",
    description:
      "The following snippet counts letters (alphabetic characters) in a sentence. What does it print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Character Frequency",
    Option1: "21",
    Option2: "20",
    Option3: "22",
    Option4: "26",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    char s[] = "A man a plan a canal Panama";
    int cnt = 0;
    for (int i = 0; s[i]; i++) {
        if (s[i] >= 'a' && s[i] <= 'z') cnt++;
        else if (s[i] >= 'A' && s[i] <= 'Z') cnt++;
    }
    printf("%d\\n", cnt);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Most Frequent Character Output",
    description:
      "The following snippet finds the most frequent letter in a string. What does it print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Character Frequency",
    Option1: "l 3",
    Option2: "l 2",
    Option3: "o 2",
    Option4: "h 1",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    char s[] = "helloworld";
    int freq[26] = {0};
    for (int i = 0; s[i]; i++) freq[s[i]-'a']++;
    int max = 0; char mc = 'a';
    for (int i = 0; i < 26; i++) {
        if (freq[i] > max) { max = freq[i]; mc = (char)('a' + i); }
    }
    printf("%c %d\\n", mc, max);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "ROT13 of Lowercase Letters",
    description:
      "The following snippet applies ROT13 to a lowercase string. What does it print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "String Transformation",
    Option1: "nop",
    Option2: "abc",
    Option3: "bcd",
    Option4: "XYZ",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    char s[] = "abc";
    for (int i = 0; s[i]; i++) {
        if (s[i] >= 'a' && s[i] <= 'z') {
            s[i] = (char)('a' + (s[i] - 'a' + 13) % 26);
        }
    }
    printf("%s\\n", s);
    return 0;
}
`,
    snippetLang: "c",
  }),
  mcq({
    title: "Run Length Encoding Output",
    description:
      "The following snippet compresses a string with run-length encoding (count printed only when the run exceeds 1). What does it print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Pattern Manipulation with Strings",
    Option1: "a3b2",
    Option2: "aaabb",
    Option3: "a3b2\\n",
    Option4: "5",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `#include <stdio.h>
int main(void) {
    char s[] = "aaabb";
    int i = 0;
    while (s[i]) {
        char c = s[i];
        int j = i;
        while (s[j] == c) j++;
        putchar(c);
        if (j - i > 1) printf("%d", j - i);
        i = j;
    }
    printf("\\n");
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
