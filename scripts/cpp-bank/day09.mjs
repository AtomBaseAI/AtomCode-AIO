/**
 * OOPS using CPP — Day 9: Strings
 * 20 code questions (10 easy: 6 basics + 4 real-world, 6 medium, 4 hard)
 * 20 MCQs (10 easy, 6 medium, 4 hard)
 * All solutions are fresh C++ written for this course (no conversions).
 */
export const meta = {
  day: 9,
  topic: "Strings",
};

export const code = [
  // ------------------------------------------------------------------ easy
  {
    title: "Word Length Reporter",
    description:
      "A text tool reports statistics about a single word. Read one word (a single token with no spaces) and print the word together with its length.\n\nInput Format:\nOne line with one word.\n\nOutput Format:\nWord: <word>\nLength: <number of characters>\n\nConstraints:\n1 <= word length <= 100",
    difficulty: "easy",
    maxscore: 10,
    topic: "Strings",
    subtopic: "String Methods",
    inputconstrains: "1 <= word length <= 100",
    sampleinput1: "atom",
    sampleinput2: "compiler",
    input1: "a",
    input2: "streams",
    input3: "programming",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string word;
    cin >> word;
    cout << "Word: " << word << endl;
    cout << "Length: " << word.length() << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Shout It in Capitals",
    description:
      "A notification banner must be loud. Read one word and print it converted to all uppercase letters. Lowercase letters become uppercase; other characters stay unchanged.\n\nInput Format:\nOne line with one word.\n\nOutput Format:\nLoud: <uppercase word>\n\nConstraints:\n1 <= word length <= 100, word contains letters and digits only",
    difficulty: "easy",
    maxscore: 10,
    topic: "Strings",
    subtopic: "String Modification",
    inputconstrains: "1 <= word length <= 100, letters and digits only",
    sampleinput1: "atom",
    sampleinput2: "cppRocks",
    input1: "hello",
    input2: "Zebra42",
    input3: "mIxEd",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
#include <cctype>
using namespace std;

int main() {
    string word;
    cin >> word;
    for (int i = 0; i < (int)word.length(); i++) {
        word[i] = toupper(word[i]);
    }
    cout << "Loud: " << word << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Vowel Counter Drill",
    description:
      "A spelling coach counts vowels. Read one word and print how many vowels it contains. Both lowercase and uppercase vowels count (a, e, i, o, u).\n\nInput Format:\nOne line with one word.\n\nOutput Format:\nVowels: <count>\n\nConstraints:\n1 <= word length <= 100, word contains English letters only",
    difficulty: "easy",
    maxscore: 10,
    topic: "Strings",
    subtopic: "Character Analysis",
    inputconstrains: "1 <= word length <= 100, English letters only",
    sampleinput1: "education",
    sampleinput2: "rhythm",
    input1: "AEIOU",
    input2: "string",
    input3: "banana",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string word;
    cin >> word;
    int count = 0;
    for (int i = 0; i < (int)word.length(); i++) {
        char c = word[i];
        if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u' ||
            c == 'A' || c == 'E' || c == 'I' || c == 'O' || c == 'U') {
            count++;
        }
    }
    cout << "Vowels: " << count << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Word Reverse Drill",
    description:
      "A palindrome training app first shows a word backwards. Read one word and print it reversed (last character first).\n\nInput Format:\nOne line with one word.\n\nOutput Format:\nReversed: <reversed word>\n\nConstraints:\n1 <= word length <= 100",
    difficulty: "easy",
    maxscore: 10,
    topic: "Strings",
    subtopic: "String Modification",
    inputconstrains: "1 <= word length <= 100",
    sampleinput1: "atom",
    sampleinput2: "abc",
    input1: "x",
    input2: "level",
    input3: "Cipher",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string word;
    cin >> word;
    string rev = "";
    for (int i = (int)word.length() - 1; i >= 0; i--) {
        rev += word[i];
    }
    cout << "Reversed: " << rev << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Name Badge Character Count",
    description:
      "A badge printer reads the visitor's full name, which may contain spaces. Read the whole line with getline and print the total number of characters (spaces included) and the first character.\n\nInput Format:\nOne line containing the full name (may contain spaces, at least one character).\n\nOutput Format:\nName: <name>\nCharacters: <length including spaces>\nFirst letter: <first character>\n\nConstraints:\n1 <= name length <= 50",
    difficulty: "easy",
    maxscore: 10,
    topic: "Strings",
    subtopic: "C-Style Strings and the string Class",
    inputconstrains: "1 <= name length <= 50",
    sampleinput1: "Ada Lovelace",
    sampleinput2: "Grace Hopper",
    input1: "Linus",
    input2: "Alan Turing",
    input3: "M",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string name;
    getline(cin, name);
    cout << "Name: " << name << endl;
    cout << "Characters: " << name.length() << endl;
    cout << "First letter: " << name[0] << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Two Words in Dictionary Order",
    description:
      "A sorting drill teaches dictionary (lexicographic) order, where comparison follows character codes, so capitals come before lowercase. Read two different words and print the one that comes first in dictionary order, then the other one.\n\nInput Format:\nOne line with two different words separated by a space.\n\nOutput Format:\nFirst line: the word that comes earlier in dictionary order\nSecond line: the other word\n\nConstraints:\n1 <= each word length <= 20, the two words are different",
    difficulty: "easy",
    maxscore: 10,
    topic: "Strings",
    subtopic: "String Comparison",
    inputconstrains: "1 <= each word length <= 20, words are different",
    sampleinput1: "banana apple",
    sampleinput2: "Zebra ant",
    input1: "cat car",
    input2: "pear Pear",
    input3: "moon sun",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string a, b;
    cin >> a >> b;
    if (a < b) {
        cout << a << endl;
        cout << b << endl;
    } else {
        cout << b << endl;
        cout << a << endl;
    }
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Username Validator Lite",
    description:
      "A signup screen performs a quick username check before calling the server. Read the username (a single word) and validate it in this order: if its length is less than 5 it is rejected as too short; else if its length is greater than 15 it is rejected as too long; else if it does not start with an English letter it is rejected; otherwise it is accepted.\n\nInput Format:\nOne line with one word: the username.\n\nOutput Format:\nExactly one line:\nValid username\nor\nInvalid: too short\nor\nInvalid: too long\nor\nInvalid: must start with a letter\n\nConstraints:\n1 <= username length <= 50, username contains letters, digits and underscores",
    difficulty: "easy",
    maxscore: 10,
    topic: "Strings",
    subtopic: "String Methods",
    inputconstrains: "1 <= username length <= 50",
    sampleinput1: "arjun_dev",
    sampleinput2: "ab",
    input1: "abcdefghijklmnop",
    input2: "9lives",
    input3: "Ravi_2025",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string user;
    cin >> user;
    if (user.length() < 5) {
        cout << "Invalid: too short" << endl;
    } else if (user.length() > 15) {
        cout << "Invalid: too long" << endl;
    } else {
        char c = user[0];
        bool letter = (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z');
        if (letter) {
            cout << "Valid username" << endl;
        } else {
            cout << "Invalid: must start with a letter" << endl;
        }
    }
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "SKU Code Formatter",
    description:
      "A catalogue system formats product codes by attaching the code length. Read the product code (a single word) and print it followed by a dash and its length.\n\nInput Format:\nOne line with one word: the product code.\n\nOutput Format:\nCode: <code>-<length>\n\nConstraints:\n1 <= code length <= 30",
    difficulty: "easy",
    maxscore: 10,
    topic: "Strings",
    subtopic: "String Methods",
    inputconstrains: "1 <= code length <= 30",
    sampleinput1: "PEN",
    sampleinput2: "NOTEBOOK12",
    input1: "SKU9",
    input2: "a",
    input3: "GadgetX",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string code;
    cin >> code;
    cout << "Code: " << code << "-" << code.length() << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Greeting Composer",
    description:
      "A mail-merge tool composes greetings. Read a person's first name and last name (two words) and print a greeting plus the initials built from the first character of each name.\n\nInput Format:\nOne line with two words: first name and last name.\n\nOutput Format:\nHello, <first> <last>!\nInitials: <F>.<L>.\n\nConstraints:\n1 <= each name length <= 20",
    difficulty: "easy",
    maxscore: 10,
    topic: "Strings",
    subtopic: "C-Style Strings and the string Class",
    inputconstrains: "1 <= each name length <= 20",
    sampleinput1: "Ada Lovelace",
    sampleinput2: "Grace Hopper",
    input1: "Alan Turing",
    input2: "Edsger Dijkstra",
    input3: "Kim Lee",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string first, last;
    cin >> first >> last;
    cout << "Hello, " << first << " " << last << "!" << endl;
    cout << "Initials: " << first[0] << "." << last[0] << "." << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "PIN Strength Label",
    description:
      "A banking app labels PIN strength by length only. Read the PIN as a digit string and print its length and the label: WEAK when the length is less than 4, MEDIUM when the length is 4 to 6, STRONG when the length is greater than 6.\n\nInput Format:\nOne line with one digit string (characters '0' to '9' only).\n\nOutput Format:\nPIN length: <length>\nStrength: <WEAK or MEDIUM or STRONG>\n\nConstraints:\n1 <= PIN length <= 20",
    difficulty: "easy",
    maxscore: 10,
    topic: "Strings",
    subtopic: "String Methods",
    inputconstrains: "1 <= PIN length <= 20",
    sampleinput1: "123",
    sampleinput2: "492013",
    input1: "0000",
    input2: "987654321",
    input3: "77",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string pin;
    cin >> pin;
    string label;
    if (pin.length() < 4) {
        label = "WEAK";
    } else if (pin.length() <= 6) {
        label = "MEDIUM";
    } else {
        label = "STRONG";
    }
    cout << "PIN length: " << pin.length() << endl;
    cout << "Strength: " << label << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },

  // ----------------------------------------------------------------- medium
  {
    title: "Case-Blind Palindrome Checker",
    description:
      "A quality team checks product tags that must read the same forwards and backwards, ignoring letter case. Read one word, compare it with its reverse case-insensitively, and print the verdict.\n\nInput Format:\nOne line with one word (English letters only).\n\nOutput Format:\nPalindrome\nor\nNot a palindrome\n\nConstraints:\n1 <= word length <= 100",
    difficulty: "medium",
    maxscore: 20,
    topic: "Strings",
    subtopic: "Palindrome and Anagrams",
    inputconstrains: "1 <= word length <= 100, English letters only",
    sampleinput1: "Level",
    sampleinput2: "Circuit",
    input1: "Noon",
    input2: "Atom",
    input3: "RaceCar",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string tag;
    cin >> tag;
    string low = "";
    for (int i = 0; i < (int)tag.length(); i++) {
        char c = tag[i];
        if (c >= 'A' && c <= 'Z') {
            c = c - 'A' + 'a';
        }
        low += c;
    }
    bool ok = true;
    int n = low.length();
    for (int i = 0; i < n / 2; i++) {
        if (low[i] != low[n - 1 - i]) {
            ok = false;
        }
    }
    if (ok) {
        cout << "Palindrome" << endl;
    } else {
        cout << "Not a palindrome" << endl;
    }
    return 0;
}`,
    blacklist: "reverse(",
    whitelist: "string, for, if",
  },
  {
    title: "Anagram Pair Checker",
    description:
      "A puzzle app checks whether two words use exactly the same letters with the same counts, ignoring case. Read two words and print whether they are anagrams.\n\nInput Format:\nOne line with two words separated by a space (English letters only).\n\nOutput Format:\nAnagrams\nor\nNot anagrams\n\nConstraints:\n1 <= each word length <= 100",
    difficulty: "medium",
    maxscore: 20,
    topic: "Strings",
    subtopic: "Palindrome and Anagrams",
    inputconstrains: "1 <= each word length <= 100, English letters only",
    sampleinput1: "listen silent",
    sampleinput2: "hello world",
    input1: "Triangle Integral",
    input2: "atom mole",
    input3: "Dormitory DirtyRoom",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string a, b;
    cin >> a >> b;
    int ca[26] = {0};
    int cb[26] = {0};
    for (int i = 0; i < (int)a.length(); i++) {
        char c = a[i];
        if (c >= 'A' && c <= 'Z') {
            c = c - 'A' + 'a';
        }
        ca[c - 'a']++;
    }
    for (int i = 0; i < (int)b.length(); i++) {
        char c = b[i];
        if (c >= 'A' && c <= 'Z') {
            c = c - 'A' + 'a';
        }
        cb[c - 'a']++;
    }
    bool same = true;
    for (int i = 0; i < 26; i++) {
        if (ca[i] != cb[i]) {
            same = false;
        }
    }
    if (same) {
        cout << "Anagrams" << endl;
    } else {
        cout << "Not anagrams" << endl;
    }
    return 0;
}`,
    blacklist: "sort(",
    whitelist: "string, for, if",
  },
  {
    title: "Word Frequency Counter",
    description:
      "A content moderator counts how many times a given word appears in a comment line, matching case-insensitively and only as a whole word. Read the target word, then read the whole comment line with getline, and print how many whole-word matches exist.\n\nInput Format:\nLine 1: the target word (single token).\nLine 2: the comment sentence (words separated by single spaces).\n\nOutput Format:\nCount: <number of case-insensitive whole-word matches>\n\nConstraints:\n1 <= target word length <= 20, 1 <= sentence length <= 200, sentence words contain letters only",
    difficulty: "medium",
    maxscore: 20,
    topic: "Strings",
    subtopic: "Word Processing",
    inputconstrains: "1 <= target word length <= 20, 1 <= sentence length <= 200",
    sampleinput1: "cat\nThe cat sat on the mat with another CAT",
    sampleinput2: "code\nCoding is fun because code makes CODE work",
    input1: "a\na A a banana a",
    input2: "data\nBig data needs clean data and DATA",
    input3: "no\nnothing nowhere no no",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string target;
    cin >> target;
    // lowercase the target word
    for (int i = 0; i < (int)target.length(); i++) {
        char c = target[i];
        if (c >= 'A' && c <= 'Z') {
            c = c - 'A' + 'a';
        }
        target[i] = c;
    }
    cin.ignore(); // skip the newline left after reading the word
    string line;
    getline(cin, line);

    int count = 0;
    string word = "";
    for (int i = 0; i <= (int)line.length(); i++) {
        if (i == (int)line.length() || line[i] == ' ') {
            if (word.length() > 0) {
                // lowercase the scanned word, then compare
                for (int j = 0; j < (int)word.length(); j++) {
                    char c = word[j];
                    if (c >= 'A' && c <= 'Z') {
                        c = c - 'A' + 'a';
                    }
                    word[j] = c;
                }
                if (word == target) {
                    count++;
                }
                word = "";
            }
        } else {
            word += line[i];
        }
    }
    cout << "Count: " << count << endl;
    return 0;
}`,
    blacklist: "stringstream, istringstream",
    whitelist: "getline, for, if",
  },
  {
    title: "Run-Length Text Compressor",
    description:
      "A log shipper shrinks text by replacing each run of repeated letters with the letter followed by the run length. Read one lowercase word and print its compressed form. Example: aaabb becomes a3b2 and a single letter becomes a1.\n\nInput Format:\nOne line with one word of lowercase letters.\n\nOutput Format:\nCompressed: <compressed form>\n\nConstraints:\n1 <= word length <= 60",
    difficulty: "medium",
    maxscore: 20,
    topic: "Strings",
    subtopic: "String Modification",
    inputconstrains: "1 <= word length <= 60, lowercase letters only",
    sampleinput1: "aaabb",
    sampleinput2: "abcd",
    input1: "aaaaaaaaaa",
    input2: "zzz",
    input3: "aabbbcccccc",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;
    string out = "";
    for (int i = 0; i < (int)s.length(); i++) {
        char c = s[i];
        int run = 1;
        for (int j = i + 1; j < (int)s.length() && s[j] == c; j++) {
            run++;
        }
        out += c;
        if (run >= 10) {
            out += (char)('0' + run / 10);
        }
        out += (char)('0' + run % 10);
        i = i + run - 1; // jump past this run (for-loop adds 1 more)
    }
    cout << "Compressed: " << out << endl;
    return 0;
}`,
    blacklist: "reverse(",
    whitelist: "string, for, if",
  },
  {
    title: "Case Toggle Transformer",
    description:
      "A chat app has a playful toggle mode that flips the case of every letter: lowercase becomes uppercase and uppercase becomes lowercase. Read one word and print the flipped version. Non-letter characters stay unchanged.\n\nInput Format:\nOne line with one word (letters and digits).\n\nOutput Format:\nToggled: <flipped word>\n\nConstraints:\n1 <= word length <= 100",
    difficulty: "medium",
    maxscore: 20,
    topic: "Strings",
    subtopic: "String Modification",
    inputconstrains: "1 <= word length <= 100, letters and digits only",
    sampleinput1: "Hello",
    sampleinput2: "CPP",
    input1: "aBcD",
    input2: "Atom9",
    input3: "zZ",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string word;
    cin >> word;
    for (int i = 0; i < (int)word.length(); i++) {
        char c = word[i];
        if (c >= 'a' && c <= 'z') {
            word[i] = c - 'a' + 'A';
        } else if (c >= 'A' && c <= 'Z') {
            word[i] = c - 'A' + 'a';
        }
    }
    cout << "Toggled: " << word << endl;
    return 0;
}`,
    blacklist: "toupper(",
    whitelist: "string, for, if",
  },
  {
    title: "Digit Digger Sum Report",
    description:
      "A warehouse scanner reads messy storage labels that mix letters and digits. Read the label as one word, print the sequence of all digit characters in order, and print their sum. If the label has no digits, print none for the digit sequence.\n\nInput Format:\nOne line with one word (letters and digits only).\n\nOutput Format:\nDigits: <digits in order, or none>\nSum: <sum of the digit values>\n\nConstraints:\n1 <= label length <= 100",
    difficulty: "medium",
    maxscore: 20,
    topic: "Strings",
    subtopic: "Character Analysis",
    inputconstrains: "1 <= label length <= 100, letters and digits only",
    sampleinput1: "A12b3",
    sampleinput2: "NoDigits",
    input1: "9x9x9",
    input2: "room402floor3",
    input3: "777",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string label;
    cin >> label;
    string digits = "";
    int sum = 0;
    for (int i = 0; i < (int)label.length(); i++) {
        char c = label[i];
        if (c >= '0' && c <= '9') {
            digits += c;
            sum += c - '0';
        }
    }
    if (digits.length() == 0) {
        cout << "Digits: none" << endl;
    } else {
        cout << "Digits: " << digits << endl;
    }
    cout << "Sum: " << sum << endl;
    return 0;
}`,
    blacklist: "isdigit(",
    whitelist: "string, for, if",
  },

  // ------------------------------------------------------------------- hard
  {
    title: "License Plate Rule Engine",
    description:
      "A regional transport office validates license plate codes with five rules, checked on the plate string:\n- Rule 1: length must be between 6 and 10 characters inclusive\n- Rule 2: every character must be an English letter or a digit (no symbols like - or _)\n- Rule 3: the plate must contain at least one digit\n- Rule 4: the plate must contain at least one letter\n- Rule 5: the sum of all digit characters must be divisible by 7\nPrint each rule as PASS or FAIL, then the overall verdict: VALID only when every rule passes.\n\nInput Format:\nOne line with one plate code (a single token).\n\nOutput Format:\nRule 1 (length 6-10): PASS or FAIL\nRule 2 (letters and digits only): PASS or FAIL\nRule 3 (has a digit): PASS or FAIL\nRule 4 (has a letter): PASS or FAIL\nRule 5 (digit sum divisible by 7): PASS or FAIL\nVerdict: VALID or INVALID\n\nConstraints:\n1 <= plate length <= 20",
    difficulty: "hard",
    maxscore: 30,
    topic: "Strings",
    subtopic: "Character Analysis",
    inputconstrains: "1 <= plate length <= 20",
    sampleinput1: "KA28XY04",
    sampleinput2: "ab-12",
    input1: "1234567",
    input2: "PLATE99",
    input3: "XY777W",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string plate;
    cin >> plate;
    int n = plate.length();

    bool allowed = true;
    bool hasDigit = false;
    bool hasLetter = false;
    int digitSum = 0;
    for (int i = 0; i < n; i++) {
        char c = plate[i];
        bool letter = (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z');
        bool digit = (c >= '0' && c <= '9');
        if (!letter && !digit) {
            allowed = false;
        }
        if (digit) {
            hasDigit = true;
            digitSum += c - '0';
        }
        if (letter) {
            hasLetter = true;
        }
    }

    string r1 = "FAIL", r2 = "FAIL", r3 = "FAIL", r4 = "FAIL", r5 = "FAIL";
    if (n >= 6 && n <= 10) {
        r1 = "PASS";
    }
    if (allowed) {
        r2 = "PASS";
    }
    if (hasDigit) {
        r3 = "PASS";
    }
    if (hasLetter) {
        r4 = "PASS";
    }
    if (digitSum % 7 == 0) {
        r5 = "PASS";
    }

    cout << "Rule 1 (length 6-10): " << r1 << endl;
    cout << "Rule 2 (letters and digits only): " << r2 << endl;
    cout << "Rule 3 (has a digit): " << r3 << endl;
    cout << "Rule 4 (has a letter): " << r4 << endl;
    cout << "Rule 5 (digit sum divisible by 7): " << r5 << endl;
    if (r1 == "PASS" && r2 == "PASS" && r3 == "PASS" && r4 == "PASS" && r5 == "PASS") {
        cout << "Verdict: VALID" << endl;
    } else {
        cout << "Verdict: INVALID" << endl;
    }
    return 0;
}`,
    blacklist: "isalnum(",
    whitelist: "string, for, if",
  },
  {
    title: "Sentence Statistician",
    description:
      "An editor plugin analyzes a sentence and reports word statistics. Read the whole line with getline. Words are separated by one or more spaces. Print the number of words, the longest word, the shortest word and the average word length with exactly two decimals. If several words tie for longest or shortest, report the earliest one.\n\nInput Format:\nOne line containing a sentence with at least one word.\n\nOutput Format:\nWords: <count>\nLongest: <longest word>\nShortest: <shortest word>\nAverage: <average word length with 2 decimals>\n\nConstraints:\n1 <= sentence length <= 300, words are separated by one or more spaces",
    difficulty: "hard",
    maxscore: 30,
    topic: "Strings",
    subtopic: "Word Processing",
    inputconstrains: "1 <= sentence length <= 300",
    sampleinput1: "The quick brown fox jumps",
    sampleinput2: "C++ is powerful",
    input1: "a",
    input2: "code every single day",
    input3: "to be or not to be",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
#include <iomanip>
using namespace std;

int main() {
    string line;
    getline(cin, line);

    int count = 0;
    int totalLen = 0;
    string longest = "";
    string shortest = "";
    string word = "";
    for (int i = 0; i <= (int)line.length(); i++) {
        if (i == (int)line.length() || line[i] == ' ') {
            if (word.length() > 0) {
                count++;
                totalLen += word.length();
                if (count == 1) {
                    longest = word;
                    shortest = word;
                } else {
                    if ((int)word.length() > (int)longest.length()) {
                        longest = word;
                    }
                    if ((int)word.length() < (int)shortest.length()) {
                        shortest = word;
                    }
                }
                word = "";
            }
        } else {
            word += line[i];
        }
    }

    double avg = (double)totalLen / count;
    cout << "Words: " << count << endl;
    cout << "Longest: " << longest << endl;
    cout << "Shortest: " << shortest << endl;
    cout << fixed << setprecision(2) << "Average: " << avg << endl;
    return 0;
}`,
    blacklist: "sort(",
    whitelist: "getline, for, if, fixed",
  },
  {
    title: "CSV Record Formatter",
    description:
      "A legacy HR export stores one record per line as name,department,score with exactly two commas. Read the whole line with getline, split it manually on the commas (no split libraries), and print the three parsed fields, followed by a padded table row: the name padded with trailing spaces to width 10, the department padded to width 12, and the score right-aligned in width 5, all between | characters.\n\nInput Format:\nOne line: name,department,score (name and department contain no commas; score is an integer).\n\nOutput Format:\nName: <name>\nDepartment: <dept>\nScore: <score>\nRow: |<name width 10>|<dept width 12>|<score width 5 right-aligned>|\n\nConstraints:\n1 <= name length <= 10, 1 <= department length <= 12, 0 <= score <= 100",
    difficulty: "hard",
    maxscore: 30,
    topic: "Strings",
    subtopic: "C-Style Strings and the string Class",
    inputconstrains: "1 <= name length <= 10, 1 <= department length <= 12, 0 <= score <= 100",
    sampleinput1: "Anitha,CSE,91",
    sampleinput2: "Vikram,ECE,45",
    input1: "Zoya,AIML,100",
    input2: "Om,IT,7",
    input3: "Devika,MECH,63",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string line;
    getline(cin, line);

    // manual split: locate the two commas by scanning
    int c1 = -1, c2 = -1;
    for (int i = 0; i < (int)line.length(); i++) {
        if (line[i] == ',') {
            if (c1 == -1) {
                c1 = i;
            } else if (c2 == -1) {
                c2 = i;
            }
        }
    }
    string name = line.substr(0, c1);
    string dept = line.substr(c1 + 1, c2 - c1 - 1);
    string score = line.substr(c2 + 1);

    cout << "Name: " << name << endl;
    cout << "Department: " << dept << endl;
    cout << "Score: " << score << endl;

    // padded table row built by hand
    string paddedName = name;
    for (int i = (int)name.length(); i < 10; i++) {
        paddedName += ' ';
    }
    string paddedDept = dept;
    for (int i = (int)dept.length(); i < 12; i++) {
        paddedDept += ' ';
    }
    string paddedScore = "";
    for (int i = (int)score.length(); i < 5; i++) {
        paddedScore += ' ';
    }
    paddedScore += score;

    cout << "Row: |" << paddedName << "|" << paddedDept << "|" << paddedScore << "|" << endl;
    return 0;
}`,
    blacklist: "stringstream, istringstream, split(",
    whitelist: "getline, for, if, string",
  },
  {
    title: "Caesar Cipher Engine",
    description:
      "A secret club encodes messages with a Caesar cipher. Read a word and a shift K. Shift every letter forward by K positions in the alphabet, wrapping around from z to a (and Z to A) while preserving case. Print the plain word, the cipher text, and the cipher text reversed.\n\nInput Format:\nOne line with a word (English letters only) and an integer K separated by a space.\n\nOutput Format:\nPlain: <word>\nCipher: <shifted word>\nBackwards: <reversed cipher>\n\nConstraints:\n1 <= word length <= 50, 0 <= K <= 25",
    difficulty: "hard",
    maxscore: 30,
    topic: "Strings",
    subtopic: "String Modification",
    inputconstrains: "1 <= word length <= 50, 0 <= K <= 25",
    sampleinput1: "attack 3",
    sampleinput2: "Zebra 1",
    input1: "wrap 10",
    input2: "XYZ 5",
    input3: "cipher 25",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string word;
    int k;
    cin >> word >> k;

    string cipher = "";
    for (int i = 0; i < (int)word.length(); i++) {
        char c = word[i];
        if (c >= 'a' && c <= 'z') {
            c = (char)('a' + (c - 'a' + k) % 26);
        } else if (c >= 'A' && c <= 'Z') {
            c = (char)('A' + (c - 'A' + k) % 26);
        }
        cipher += c;
    }

    // reverse the cipher text by hand
    string back = "";
    for (int i = (int)cipher.length() - 1; i >= 0; i--) {
        back += cipher[i];
    }

    cout << "Plain: " << word << endl;
    cout << "Cipher: " << cipher << endl;
    cout << "Backwards: " << back << endl;
    return 0;
}`,
    blacklist: "reverse(",
    whitelist: "string, for, if",
  },
];

export const mcqs = [
  // ------------------------------------------------------------------ easy
  {
    title: "string Class Versus Char Array",
    description: "Which statement about the C++ std::string class is TRUE?",
    difficulty: "easy",
    topic: "Strings",
    subtopic: "C-Style Strings and the string Class",
    Option1: "std::string requires manual memory management whenever it grows",
    Option2: "std::string grows and shrinks automatically and knows its own length",
    Option3: "std::string objects cannot be compared with == or <",
    Option4: "std::string must always end with a '\\0' that the programmer maintains",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "C-String Terminator Symbol",
    description: "Which character marks the end of a C-style string stored in a char array?",
    difficulty: "easy",
    topic: "Strings",
    subtopic: "C-Style Strings and the string Class",
    Option1: "'\\n'",
    Option2: "' '",
    Option3: "'\\0'",
    Option4: "'$'",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Reading a Line That Contains Spaces",
    description: "You must read a full line like 'Ada Lovelace' (including the space) into one std::string object s. Which call does this?",
    difficulty: "easy",
    topic: "Strings",
    subtopic: "C-Style Strings and the string Class",
    Option1: "cin >> s;",
    Option2: "getline(cin, s);",
    Option3: "cin.get(s);",
    Option4: "cin << s;",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "string Length Method",
    description: "Which expression gives the number of characters currently stored in a std::string named s?",
    difficulty: "easy",
    topic: "Strings",
    subtopic: "String Methods",
    Option1: "s.length()",
    Option2: "length(s)",
    Option3: "sizeof(s)",
    Option4: "s.size(s)",
    CorrectOption: 1,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Joining Strings with Plus",
    description: "Given string a = \"data\"; and string b = \"base\"; which expression produces the string \"database\"?",
    difficulty: "easy",
    topic: "Strings",
    subtopic: "String Methods",
    Option1: "a.append b",
    Option2: "a.b",
    Option3: "a + b",
    Option4: "concat(a, b)",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Accessing One Character",
    description: "For string s = \"atom\"; which expression gives the character 't'?",
    difficulty: "easy",
    topic: "Strings",
    subtopic: "String Methods",
    Option1: "s(1)",
    Option2: "s[2]",
    Option3: "s.first()",
    Option4: "s{2}",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Comparing Two string Objects",
    description: "For two std::string objects a and b, what does the expression a == b test?",
    difficulty: "easy",
    topic: "Strings",
    subtopic: "String Comparison",
    Option1: "Whether both strings start at the same memory address",
    Option2: "Whether the first characters are equal",
    Option3: "Whether the shorter string is a prefix of the longer one",
    Option4: "Whether the two strings contain exactly the same characters in the same order",
    CorrectOption: 4,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Index of the First Character",
    description: "In C++, what is the index of the first character of a std::string s?",
    difficulty: "easy",
    topic: "Strings",
    subtopic: "String Methods",
    Option1: "0",
    Option2: "1",
    Option3: "-1",
    Option4: "It depends on the string's length",
    CorrectOption: 1,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Length of an Empty string",
    description: "What does s.length() return for a freshly declared empty string (string s;)?",
    difficulty: "easy",
    topic: "Strings",
    subtopic: "String Methods",
    Option1: "1",
    Option2: "It is undefined",
    Option3: "0",
    Option4: "-1",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Case Matters in Equality",
    description: "What is the result of the comparison \"Hello\" == \"hello\" for std::string objects?",
    difficulty: "easy",
    topic: "Strings",
    subtopic: "String Comparison",
    Option1: "true, because == ignores letter case",
    Option2: "true, because both strings have the same length",
    Option3: "It causes a compile error",
    Option4: "false, because the character codes of 'H' and 'h' differ",
    CorrectOption: 4,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },

  // ----------------------------------------------------------------- medium
  {
    title: "length Versus strlen",
    description: "For a std::string object s, which statement correctly compares the member s.length() with the C function strlen()?",
    difficulty: "medium",
    topic: "Strings",
    subtopic: "C-Style Strings and the string Class",
    Option1: "strlen() can be called directly on a std::string object",
    Option2: "s.length() works by scanning characters until it reaches a null terminator",
    Option3: "s.length() returns the size the string object already stores, while strlen() scans the char array until it reaches '\\0'",
    Option4: "s.length() includes the null terminator while strlen() does not",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Effect of push_back",
    description: "What does the call s.push_back('!') do when s is a std::string?",
    difficulty: "medium",
    topic: "Strings",
    subtopic: "String Modification",
    Option1: "Replaces the last character of s with '!'",
    Option2: "Appends the single character '!' to the end of s",
    Option3: "Inserts '!' at the front of s",
    Option4: "Removes the last character of s",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Char Shift Inside a string",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "Strings",
    subtopic: "Character Analysis",
    Option1: "dat",
    Option2: "cat",
    Option3: "dbt",
    Option4: "Compile error",
    CorrectOption: 1,
    codesnippet: `#include <iostream>
#include <string>
using namespace std;
int main() {
    string s = "cat";
    s[0] = s[0] + 1;
    cout << s;
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    string s = "cat";\n    s[0] = s[0] + 1;\n    cout << s;\n    return 0;\n}`,
      stdin: "",
      expected: "dat",
    },
  },
  {
    title: "substr Slice Prediction",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "Strings",
    subtopic: "String Methods",
    Option1: "ompi",
    Option2: "comp",
    Option3: "piler",
    Option4: "pile",
    CorrectOption: 4,
    codesnippet: `#include <iostream>
#include <string>
using namespace std;
int main() {
    string s = "compiler";
    cout << s.substr(3, 4);
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    string s = "compiler";\n    cout << s.substr(3, 4);\n    return 0;\n}`,
      stdin: "",
      expected: "pile",
    },
  },
  {
    title: "find Position Printed",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "Strings",
    subtopic: "String Methods",
    Option1: "3",
    Option2: "4",
    Option3: "5",
    Option4: "apple",
    CorrectOption: 2,
    codesnippet: `#include <iostream>
#include <string>
using namespace std;
int main() {
    string s = "pineapple";
    cout << s.find("apple");
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    string s = "pineapple";\n    cout << s.find("apple");\n    return 0;\n}`,
      stdin: "",
      expected: "4",
    },
  },
  {
    title: "size After Modifications",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "Strings",
    subtopic: "String Modification",
    Option1: "4",
    Option2: "5",
    Option3: "7",
    Option4: "6",
    CorrectOption: 3,
    codesnippet: `#include <iostream>
#include <string>
using namespace std;
int main() {
    string s = "data";
    s.push_back('!');
    s += "ok";
    cout << s.size();
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    string s = "data";\n    s.push_back('!');\n    s += "ok";\n    cout << s.size();\n    return 0;\n}`,
      stdin: "",
      expected: "7",
    },
  },

  // ------------------------------------------------------------------- hard
  {
    title: "substr Past the End Clamps",
    description: "What does this program print? Remember how substr behaves when the requested count goes past the end of the string.",
    difficulty: "hard",
    topic: "Strings",
    subtopic: "String Methods",
    Option1: "orbit",
    Option2: "it",
    Option3: "bit",
    Option4: "Runtime crash",
    CorrectOption: 3,
    codesnippet: `#include <iostream>
#include <string>
using namespace std;
int main() {
    string s = "orbit";
    cout << s.substr(2, 10);
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    string s = "orbit";\n    cout << s.substr(2, 10);\n    return 0;\n}`,
      stdin: "",
      expected: "bit",
    },
  },
  {
    title: "find Miss Detected by npos",
    description: "What does this program print?",
    difficulty: "hard",
    topic: "Strings",
    subtopic: "String Methods",
    Option1: "missing",
    Option2: "found",
    Option3: "0",
    Option4: "Compile error",
    CorrectOption: 1,
    codesnippet: `#include <iostream>
#include <string>
using namespace std;
int main() {
    string s = "banana";
    if (s.find("z") == string::npos)
        cout << "missing";
    else
        cout << "found";
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    string s = "banana";\n    if (s.find("z") == string::npos)\n        cout << "missing";\n    else\n        cout << "found";\n    return 0;\n}`,
      stdin: "",
      expected: "missing",
    },
  },
  {
    title: "Erase Then Insert Prediction",
    description: "What does this program print?",
    difficulty: "hard",
    topic: "Strings",
    subtopic: "String Modification",
    Option1: "aXYdef",
    Option2: "adXYef",
    Option3: "adbcef",
    Option4: "adefXY",
    CorrectOption: 2,
    codesnippet: `#include <iostream>
#include <string>
using namespace std;
int main() {
    string s = "abcdef";
    s.erase(1, 2);
    s.insert(2, "XY");
    cout << s;
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    string s = "abcdef";\n    s.erase(1, 2);\n    s.insert(2, "XY");\n    cout << s;\n    return 0;\n}`,
      stdin: "",
      expected: "adXYef",
    },
  },
  {
    title: "Why C-Strings Need a Terminator",
    description: "Why must a C-style string stored in a char array end with the '\\0' terminator?",
    difficulty: "hard",
    topic: "Strings",
    subtopic: "C-Style Strings and the string Class",
    Option1: "The compiler refuses to compile the program otherwise",
    Option2: "It marks the string as read-only memory",
    Option3: "It pads the array so its length is always a multiple of eight",
    Option4: "Library functions like strlen and printf walk the array until they hit '\\0' to know where the text ends",
    CorrectOption: 4,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
];
