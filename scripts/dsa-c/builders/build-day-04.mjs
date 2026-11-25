// Day 04 — Strings: complete standalone C programs.
import { readFileSync, writeFileSync } from "node:fs";

const SRC = [
// q00 Manual String Length
String.raw`#include <stdio.h>

int my_strlen(const char *s) {
    int len = 0;
    while (s[len] != '\0') len++;
    return len;
}

int main(void) {
    char s[1005];
    if (scanf("%1004s", s) != 1) return 0;
    printf("%d\n", my_strlen(s));
    return 0;
}`,
// q01 Palindrome Check
String.raw`#include <stdio.h>

int is_palindrome(const char *s) {
    int lo = 0, hi = 0;
    while (s[hi] != '\0') hi++;
    hi--;
    while (lo < hi) {
        if (s[lo] != s[hi]) return 0;
        lo++;
        hi--;
    }
    return 1;
}

int main(void) {
    char s[1005];
    if (scanf("%1004s", s) != 1) return 0;
    printf("%d\n", is_palindrome(s));
    return 0;
}`,
// q02 Count Vowels
String.raw`#include <stdio.h>

int count_vowels(const char *s) {
    int count = 0;
    for (int i = 0; s[i] != '\0'; i++) {
        char c = s[i];
        if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u' ||
            c == 'A' || c == 'E' || c == 'I' || c == 'O' || c == 'U') {
            count++;
        }
    }
    return count;
}

int main(void) {
    char s[1005];
    if (scanf("%1004s", s) != 1) return 0;
    printf("%d\n", count_vowels(s));
    return 0;
}`,
// q03 Count Character Occurrences
String.raw`#include <stdio.h>

int char_count(const char *s, char c) {
    int count = 0;
    for (int i = 0; s[i] != '\0'; i++) {
        if (s[i] == c) count++;
    }
    return count;
}

int main(void) {
    char s[1005], c;
    if (scanf("%1004s", s) != 1) return 0;
    scanf(" %c", &c);
    printf("%d\n", char_count(s, c));
    return 0;
}`,
// q04 Uppercase Conversion
String.raw`#include <stdio.h>

void to_upper(char *s) {
    for (int i = 0; s[i] != '\0'; i++) {
        if (s[i] >= 'a' && s[i] <= 'z') {
            s[i] = (char)(s[i] - 'a' + 'A');
        }
    }
}

int main(void) {
    char s[1005];
    if (scanf("%1004s", s) != 1) return 0;
    to_upper(s);
    puts(s);
    return 0;
}`,
// q05 Reverse a String In Place
String.raw`#include <stdio.h>

void reverse_string(char *s) {
    int len = 0;
    while (s[len] != '\0') len++;
    int lo = 0, hi = len - 1;
    while (lo < hi) {
        char t = s[lo];
        s[lo] = s[hi];
        s[hi] = t;
        lo++;
        hi--;
    }
}

int main(void) {
    char s[1005];
    if (scanf("%1004s", s) != 1) return 0;
    reverse_string(s);
    puts(s);
    return 0;
}`,
// q06 Roll Number Digit Audit
String.raw`#include <stdio.h>

int count_digits(const char *s) {
    int count = 0;
    for (int i = 0; s[i] != '\0'; i++) {
        if (s[i] >= '0' && s[i] <= '9') count++;
    }
    return count;
}

int main(void) {
    char s[1005];
    if (scanf("%1004s", s) != 1) return 0;
    printf("%d\n", count_digits(s));
    return 0;
}`,
// q07 Product Code Palindrome Audit
String.raw`#include <stdio.h>

int is_palindrome_ci(const char *s) {
    int lo = 0, hi = 0;
    while (s[hi] != '\0') hi++;
    hi--;
    while (lo < hi) {
        char a = s[lo], b = s[hi];
        if (a >= 'A' && a <= 'Z') a = (char)(a - 'A' + 'a');
        if (b >= 'A' && b <= 'Z') b = (char)(b - 'A' + 'a');
        if (a != b) return 0;
        lo++;
        hi--;
    }
    return 1;
}

int main(void) {
    char s[1005];
    if (scanf("%1004s", s) != 1) return 0;
    printf("%d\n", is_palindrome_ci(s));
    return 0;
}`,
// q08 WiFi SSID Sanity Check
String.raw`#include <stdio.h>

int ssid_valid(const char *s) {
    int len = 0;
    while (s[len] != '\0') len++;
    if (len < 3 || len > 15) return 0;
    for (int i = 0; s[i] != '\0'; i++) {
        if (s[i] >= '0' && s[i] <= '9') return 1;
    }
    return 0;
}

int main(void) {
    char s[1005];
    if (scanf("%1004s", s) != 1) return 0;
    printf("%d\n", ssid_valid(s));
    return 0;
}`,
// q09 Word Ordering Check
String.raw`#include <stdio.h>

int comes_first(const char *a, const char *b) {
    int i = 0;
    while (a[i] != '\0' && a[i] == b[i]) i++;
    return a[i] < b[i];
}

int main(void) {
    char a[1005], b[1005];
    if (scanf("%1004s", a) != 1) return 0;
    scanf("%1004s", b);
    printf("%d\n", comes_first(a, b));
    return 0;
}`,
// q10 Anagram Validation (blacklist: qsort / whitelist: for)
String.raw`#include <stdio.h>

int is_anagram(const char *a, const char *b) {
    int freq[26];
    for (int i = 0; i < 26; i++) freq[i] = 0;
    for (int i = 0; a[i] != '\0'; i++) freq[a[i] - 'a']++;
    for (int i = 0; b[i] != '\0'; i++) freq[b[i] - 'a']--;
    for (int i = 0; i < 26; i++) {
        if (freq[i] != 0) return 0;
    }
    return 1;
}

int main(void) {
    char a[1005], b[1005];
    if (scanf("%1004s", a) != 1) return 0;
    scanf("%1004s", b);
    printf("%d\n", is_anagram(a, b));
    return 0;
}`,
// q11 Most Frequent Character (blacklist: qsort / whitelist: for)
String.raw`#include <stdio.h>

char most_frequent(const char *s) {
    int cnt[256];
    for (int i = 0; i < 256; i++) cnt[i] = 0;
    for (int i = 0; s[i] != '\0'; i++) cnt[(unsigned char)s[i]]++;
    int best = 0;
    for (int c = 1; c < 256; c++) {
        if (cnt[c] > cnt[best]) best = c;
    }
    return (char)best;
}

int main(void) {
    char s[1005];
    if (scanf("%1004s", s) != 1) return 0;
    putchar(most_frequent(s));
    putchar('\n');
    return 0;
}`,
// q12 Longest Identical Run (blacklist: strlen / whitelist: while)
String.raw`#include <stdio.h>

int max_run(const char *s) {
    int best = 1, i = 0;
    while (s[i] != '\0') {
        int run = 1;
        while (s[i + 1] != '\0' && s[i + 1] == s[i]) {
            run++;
            i++;
        }
        if (run > best) best = run;
        i++;
    }
    return best;
}

int main(void) {
    char s[1005];
    if (scanf("%1004s", s) != 1) return 0;
    printf("%d\n", max_run(s));
    return 0;
}`,
// q13 Character Class Census (blacklist: isdigit / whitelist: if)
String.raw`#include <stdio.h>

void census(const char *s, int *vowels, int *consonants, int *digits) {
    int v = 0, con = 0, d = 0;
    for (int i = 0; s[i] != '\0'; i++) {
        char c = s[i];
        if (c >= 'A' && c <= 'Z') c = (char)(c - 'A' + 'a');
        if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') {
            v++;
        } else if (c >= 'a' && c <= 'z') {
            con++;
        } else if (s[i] >= '0' && s[i] <= '9') {
            d++;
        }
    }
    *vowels = v;
    *consonants = con;
    *digits = d;
}

int main(void) {
    char s[1005];
    if (scanf("%1004s", s) != 1) return 0;
    int v, con, d;
    census(s, &v, &con, &d);
    printf("%d %d %d\n", v, con, d);
    return 0;
}`,
// q14 Overlapping Pattern Count (blacklist: strstr / whitelist: while)
String.raw`#include <stdio.h>

int count_pattern(const char *s, const char *t) {
    int count = 0;
    int i = 0;
    while (s[i] != '\0') {
        int j = 0, ok = 1;
        while (t[j] != '\0') {
            if (s[i + j] != t[j]) {
                ok = 0;
                break;
            }
            j++;
        }
        if (ok && j > 0) count++;
        i++;
    }
    return count;
}

int main(void) {
    char s[1005], t[1005];
    if (scanf("%1004s", s) != 1) return 0;
    scanf("%1004s", t);
    printf("%d\n", count_pattern(s, t));
    return 0;
}`,
// q15 Caesar Cipher Shift (blacklist: ctype / whitelist: for)
String.raw`#include <stdio.h>

void caesar_shift(char *s, int k) {
    k %= 26;
    if (k < 0) k += 26;
    for (int i = 0; s[i] != '\0'; i++) {
        char c = s[i];
        if (c >= 'a' && c <= 'z') {
            s[i] = (char)('a' + (c - 'a' + k) % 26);
        } else if (c >= 'A' && c <= 'Z') {
            s[i] = (char)('A' + (c - 'A' + k) % 26);
        }
    }
}

int main(void) {
    char s[1005];
    int k;
    if (scanf("%1004s", s) != 1) return 0;
    scanf("%d", &k);
    caesar_shift(s, k);
    puts(s);
    return 0;
}`,
// q16 Longest Palindromic Run (blacklist: qsort / whitelist: while)
String.raw`#include <stdio.h>

static int expand(const char *s, int n, int lo, int hi) {
    while (lo >= 0 && hi < n && s[lo] == s[hi]) {
        lo--;
        hi++;
    }
    return hi - lo - 1;
}

int longest_palindrome_length(const char *s) {
    int n = 0;
    while (s[n] != '\0') n++;
    int best = 1;
    for (int i = 0; i < n; i++) {
        int odd = expand(s, n, i, i);
        int even = expand(s, n, i, i + 1);
        if (odd > best) best = odd;
        if (even > best) best = even;
    }
    return best;
}

int main(void) {
    char s[1005];
    if (scanf("%1004s", s) != 1) return 0;
    printf("%d\n", longest_palindrome_length(s));
    return 0;
}`,
// q17 Run-Length Encode (blacklist: sprintf / whitelist: while)
String.raw`#include <stdio.h>

int rle_encode(const char *s, char *out) {
    int k = 0, i = 0;
    while (s[i] != '\0') {
        int run = 1;
        while (s[i + 1] != '\0' && s[i + 1] == s[i]) {
            run++;
            i++;
        }
        out[k++] = s[i];
        char digs[12];
        int d = 0;
        while (run > 0) {
            digs[d++] = (char)('0' + run % 10);
            run /= 10;
        }
        while (d > 0) {
            out[k++] = digs[--d];
        }
        i++;
    }
    out[k] = '\0';
    return k;
}

int main(void) {
    char s[1005], out[4005];
    if (scanf("%1004s", s) != 1) return 0;
    rle_encode(s, out);
    puts(out);
    return 0;
}`,
// q18 Rotation Detection (blacklist: strcat,strcpy / whitelist: for)
String.raw`#include <stdio.h>

int is_rotation(const char *a, const char *b) {
    int la = 0, lb = 0;
    for (la = 0; a[la] != '\0'; la++) {}
    for (lb = 0; b[lb] != '\0'; lb++) {}
    if (la != lb) return 0;
    for (int shift = 0; shift < la; shift++) {
        int ok = 1;
        for (int i = 0; i < la; i++) {
            if (a[(shift + i) % la] != b[i]) {
                ok = 0;
                break;
            }
        }
        if (ok) return 1;
    }
    return 0;
}

int main(void) {
    char a[1005], b[1005];
    if (scanf("%1004s", a) != 1) return 0;
    scanf("%1004s", b);
    printf("%d\n", is_rotation(a, b));
    return 0;
}`,
// q19 Rearrange Into Palindrome (blacklist: qsort / whitelist: if)
String.raw`#include <stdio.h>

int can_form_palindrome(const char *s) {
    int freq[128];
    for (int i = 0; i < 128; i++) freq[i] = 0;
    for (int i = 0; s[i] != '\0'; i++) freq[(unsigned char)s[i]]++;
    int odd = 0;
    for (int i = 0; i < 128; i++) {
        if (freq[i] % 2 != 0) odd++;
    }
    if (odd <= 1) return 1;
    return 0;
}

int main(void) {
    char s[1005];
    if (scanf("%1004s", s) != 1) return 0;
    printf("%d\n", can_form_palindrome(s));
    return 0;
}`,
];

const bank = JSON.parse(readFileSync("/home/z/tmp/dsa-export/dsa-c/day-04.code.json", "utf8"));
if (bank.questions.length !== SRC.length) throw new Error(`count mismatch day04`);
bank.questions.forEach((q, i) => { q.sourcecode = SRC[i]; });
writeFileSync("/home/z/my-project/scripts/dsa-c/data/day-04.code.json", JSON.stringify(bank, null, 2) + "\n");

const mcq = JSON.parse(readFileSync("/home/z/tmp/dsa-export/dsa-c/day-04.mcq.json", "utf8"));
writeFileSync("/home/z/my-project/scripts/dsa-c/data/day-04.mcq.json",
  JSON.stringify({ day: mcq.day, questions: mcq.questions.map(({ _id, ...rest }) => rest) }, null, 2) + "\n");
console.log("day-04 written:", bank.questions.length, "code,", mcq.questions.length, "mcq");
