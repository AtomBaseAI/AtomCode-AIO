/**
 * Day 04 (Strings and Character Processing) — complete standalone programs.
 * Note '\\0' in the JS template below emits the C++ literal '\0'.
 */
import { readFileSync, writeFileSync } from "node:fs";

const SRC = "/home/z/tmp/dsa-export/dsa-cpp/day-04.code.json";
const OUT = "/home/z/my-project/scripts/dsa-cpp/data/day-04.code.json";

const programs = [
  /* Q1 Count the Vowels */
  `#include <iostream>
#include <string>

int count_vowels(const std::string &s) {
    int count = 0;
    for (char c : s) {
        if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') count++;
        if (c == 'A' || c == 'E' || c == 'I' || c == 'O' || c == 'U') count++;
    }
    return count;
}

int main() {
    std::string s;
    std::cin >> s;
    std::cout << count_vowels(s) << std::endl;
    return 0;
}
`,
  /* Q2 Count a Target Character */
  `#include <iostream>
#include <string>

int count_char(const std::string &s, char target) {
    int count = 0;
    for (char c : s)
        if (c == target) count++;
    return count;
}

int main() {
    std::string s;
    char target;
    std::cin >> s >> target;
    std::cout << count_char(s, target) << std::endl;
    return 0;
}
`,
  /* Q3 Toggle the Case */
  `#include <iostream>
#include <string>

std::string toggle_case(const std::string &s) {
    std::string out;
    for (char c : s) {
        if (c >= 'a' && c <= 'z') out += (char)(c - 'a' + 'A');
        else if (c >= 'A' && c <= 'Z') out += (char)(c - 'A' + 'a');
        else out += c;
    }
    return out;
}

int main() {
    std::string s;
    std::cin >> s;
    std::cout << toggle_case(s) << std::endl;
    return 0;
}
`,
  /* Q4 Reverse by Indexing */
  `#include <iostream>
#include <string>

std::string reverse_string(const std::string &s) {
    std::string out;
    for (int i = (int)s.size() - 1; i >= 0; i--) out += s[i];
    return out;
}

int main() {
    std::string s;
    std::cin >> s;
    std::cout << reverse_string(s) << std::endl;
    return 0;
}
`,
  /* Q5 Anagram Detector — blacklist "std::sort,sort(" */
  `#include <iostream>
#include <string>

bool are_anagrams(const std::string &a, const std::string &b) {
    if (a.size() != b.size()) return false;
    int seen[26] = {0};
    for (char c : a) seen[c - 'a']++;
    for (char c : b) seen[c - 'a']--;
    for (int i = 0; i < 26; i++)
        if (seen[i] != 0) return false;
    return true;
}

int main() {
    std::string a, b;
    std::cin >> a >> b;
    std::cout << are_anagrams(a, b) << std::endl;
    return 0;
}
`,
  /* Q6 Username Validator */
  `#include <iostream>
#include <string>

bool valid_username(const std::string &u) {
    if (u.size() < 5 || u.size() > 12) return false;
    bool firstIsLetter =
        (u[0] >= 'a' && u[0] <= 'z') || (u[0] >= 'A' && u[0] <= 'Z');
    return firstIsLetter;
}

int main() {
    std::string u;
    std::cin >> u;
    std::cout << valid_username(u) << std::endl;
    return 0;
}
`,
  /* Q7 License Plate Audit */
  `#include <iostream>
#include <string>

int count_digits(const std::string &s) {
    int count = 0;
    for (char c : s)
        if (c >= '0' && c <= '9') count++;
    return count;
}

int main() {
    std::string s;
    std::cin >> s;
    std::cout << count_digits(s) << std::endl;
    return 0;
}
`,
  /* Q8 Manual String Length */
  `#include <iostream>
#include <string>

int string_length(const std::string &s) {
    int count = 0;
    while (s[count] != '\\0') count++;
    return count;
}

int main() {
    std::string s;
    std::cin >> s;
    std::cout << string_length(s) << std::endl;
    return 0;
}
`,
  /* Q9 Palindrome Check */
  `#include <iostream>
#include <string>

bool is_palindrome(const std::string &s) {
    int i = 0, j = (int)s.size() - 1;
    while (i < j) {
        if (s[i] != s[j]) return false;
        i++;
        j--;
    }
    return true;
}

int main() {
    std::string s;
    std::cin >> s;
    std::cout << is_palindrome(s) << std::endl;
    return 0;
}
`,
  /* Q10 Badge Code Symmetry */
  `#include <iostream>
#include <string>

bool badge_symmetric(const std::string &code) {
    int i = 0, j = (int)code.size() - 1;
    while (i < j) {
        char a = code[i], b = code[j];
        if (a >= 'A' && a <= 'Z') a = (char)(a - 'A' + 'a');
        if (b >= 'A' && b <= 'Z') b = (char)(b - 'A' + 'a');
        if (a != b) return false;
        i++;
        j--;
    }
    return true;
}

int main() {
    std::string code;
    std::cin >> code;
    std::cout << badge_symmetric(code) << std::endl;
    return 0;
}
`,
  /* Q11 Serial Number Score */
  `#include <iostream>
#include <string>

int serial_score(const std::string &s) {
    int total = 0;
    for (char c : s)
        if (c >= '0' && c <= '9') total += c - '0';
    return total;
}

int main() {
    std::string s;
    std::cin >> s;
    std::cout << serial_score(s) << std::endl;
    return 0;
}
`,
  /* Q12 Character Report — blacklist "std::find,find(" */
  `#include <iostream>
#include <string>

void char_report(const std::string &s, char t, int &count, int &firstIdx) {
    count = 0;
    firstIdx = -1;
    for (int i = 0; i < (int)s.size(); i++) {
        if (s[i] == t) {
            count++;
            if (firstIdx == -1) firstIdx = i;
        }
    }
}

int main() {
    std::string s;
    char t;
    std::cin >> s >> t;
    int count = 0, firstIdx = -1;
    char_report(s, t, count, firstIdx);
    std::cout << count << " " << firstIdx << std::endl;
    return 0;
}
`,
  /* Q13 Case-Insensitive Compare — blacklist "std::transform,strcmp" */
  `#include <iostream>
#include <string>

int case_cmp(const std::string &a, const std::string &b) {
    std::string la, lb;
    for (char c : a) {
        if (c >= 'A' && c <= 'Z') c = (char)(c - 'A' + 'a');
        la += c;
    }
    for (char c : b) {
        if (c >= 'A' && c <= 'Z') c = (char)(c - 'A' + 'a');
        lb += c;
    }
    if (la < lb) return -1;
    if (lb < la) return 1;
    return 0;
}

int main() {
    std::string a, b;
    std::cin >> a >> b;
    std::cout << case_cmp(a, b) << std::endl;
    return 0;
}
`,
  /* Q14 Split Letters — blacklist "std::copy,copy_if" */
  `#include <iostream>
#include <string>

void split_letters(const std::string &s, std::string &vowels, std::string &consonants) {
    vowels = "";
    consonants = "";
    for (char c : s) {
        char low = c;
        if (low >= 'A' && low <= 'Z') low = (char)(low - 'A' + 'a');
        bool isVowel =
            low == 'a' || low == 'e' || low == 'i' || low == 'o' || low == 'u';
        bool isLetter = (low >= 'a' && low <= 'z');
        if (!isLetter) continue;
        if (isVowel) vowels += c;
        else consonants += c;
    }
}

int main() {
    std::string s;
    std::cin >> s;
    std::string vowels, consonants;
    split_letters(s, vowels, consonants);
    std::cout << vowels << std::endl;
    std::cout << consonants << std::endl;
    return 0;
}
`,
  /* Q15 Nearly a Palindrome — blacklist "std::reverse", whitelist "while" */
  `#include <iostream>
#include <string>

static bool range_pal(const std::string &s, int i, int j) {
    while (i < j) {
        if (s[i] != s[j]) return false;
        i++;
        j--;
    }
    return true;
}

bool near_palindrome(const std::string &s) {
    int i = 0, j = (int)s.size() - 1;
    while (i < j) {
        if (s[i] != s[j]) {
            return range_pal(s, i + 1, j) || range_pal(s, i, j - 1);
        }
        i++;
        j--;
    }
    return true;
}

int main() {
    std::string s;
    std::cin >> s;
    std::cout << near_palindrome(s) << std::endl;
    return 0;
}
`,
  /* Q16 Caesar Cipher Shift — blacklist "std::transform", whitelist "%" */
  `#include <iostream>
#include <string>

std::string caesar_shift(const std::string &s, int k) {
    k %= 26;
    std::string out;
    for (char c : s) {
        if (c >= 'a' && c <= 'z') out += (char)('a' + (c - 'a' + k) % 26);
        else if (c >= 'A' && c <= 'Z') out += (char)('A' + (c - 'A' + k) % 26);
        else out += c;
    }
    return out;
}

int main() {
    std::string s;
    int k;
    std::cin >> s >> k;
    std::cout << caesar_shift(s, k) << std::endl;
    return 0;
}
`,
  /* Q17 Overlapping Substring Census — blacklist "find,rfind,substr(" */
  `#include <iostream>
#include <string>

int count_substring(const std::string &text, const std::string &pat) {
    int count = 0;
    for (int start = 0; start + (int)pat.size() <= (int)text.size(); start++) {
        bool match = true;
        for (int i = 0; i < (int)pat.size(); i++) {
            if (text[start + i] != pat[i]) {
                match = false;
                break;
            }
        }
        if (match) count++;
    }
    return count;
}

int main() {
    std::string text, pat;
    std::cin >> text >> pat;
    std::cout << count_substring(text, pat) << std::endl;
    return 0;
}
`,
  /* Q18 Title Case Converter — blacklist "std::transform,stringstream" */
  `#include <iostream>
#include <string>

std::string title_case(const std::string &s) {
    std::string out;
    bool newWord = true;
    for (char c : s) {
        if (c == ' ') {
            out += ' ';
            newWord = true;
        } else {
            if (newWord && c >= 'a' && c <= 'z') out += (char)(c - 'a' + 'A');
            else if (!newWord && c >= 'A' && c <= 'Z') out += (char)(c - 'A' + 'a');
            else out += c;
            newWord = false;
        }
    }
    return out;
}

int main() {
    std::string line;
    std::getline(std::cin, line);
    std::cout << title_case(line) << std::endl;
    return 0;
}
`,
  /* Q19 Longest Palindromic Substring — blacklist "std::reverse" */
  `#include <iostream>
#include <string>

std::string longest_palindrome(const std::string &s) {
    int bestStart = 0, bestLen = 1;
    for (int center = 0; center < (int)s.size(); center++) {
        for (int parity = 0; parity < 2; parity++) {
            int l = center, r = center + parity;
            while (l >= 0 && r < (int)s.size() && s[l] == s[r]) {
                l--;
                r++;
            }
            int len = r - l - 1;
            if (len > bestLen) {
                bestLen = len;
                bestStart = l + 1;
            }
        }
    }
    std::string out;
    for (int i = bestStart; i < bestStart + bestLen; i++) out += s[i];
    return out;
}

int main() {
    std::string s;
    std::cin >> s;
    std::cout << longest_palindrome(s) << std::endl;
    return 0;
}
`,
  /* Q20 Run-Length Report — blacklist "stringstream", whitelist "while" */
  `#include <iostream>
#include <string>

std::string compress_runs(const std::string &s) {
    std::string out;
    int i = 0;
    while (i < (int)s.size()) {
        int j = i;
        while (j < (int)s.size() && s[j] == s[i]) j++;
        int runLen = j - i;
        out += s[i];
        if (runLen > 1) out += std::to_string(runLen);
        i = j;
    }
    return out;
}

int main() {
    std::string s;
    std::cin >> s;
    std::cout << compress_runs(s) << std::endl;
    return 0;
}
`,
];

const data = JSON.parse(readFileSync(SRC, "utf8"));
if (data.questions.length !== programs.length)
  throw new Error(`expected ${data.questions.length} programs, got ${programs.length}`);
data.questions.forEach((q, i) => {
  q.sourcecode = programs[i];
});
writeFileSync(OUT, JSON.stringify(data, null, 2));
console.log(`day-04.code.json written: ${data.questions.length} programs`);
