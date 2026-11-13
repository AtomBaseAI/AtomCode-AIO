/**
 * OOPS using CPP — Day 20: File Handling
 * 20 code questions (10 easy: 6 basics + 4 real-world, 6 medium, 4 hard)
 * 20 MCQs (10 easy, 6 medium, 4 hard)
 * All solutions are fresh C++ written for this course (no conversions).
 * Every program creates its own data files, writes stdin-derived data,
 * closes, reopens and reads back — all inside a single judge run.
 */
export const meta = {
  day: 20,
  topic: "File Handling",
};

export const code = [
  // ------------------------------------------------------------------ easy
  {
    title: "Note File Writer",
    description:
      "A simple journal app saves each note into a text file before showing it on screen. Read two lines of text and store them in the file note20.txt, one per line. Then reopen the file, read both lines back and print them.\n\nInput Format:\nTwo lines of text; each line may contain spaces.\n\nOutput Format:\nFile contains:\n<line 1>\n<line 2>\n\nConstraints:\nEach line is 1 to 50 characters.",
    difficulty: "easy",
    maxscore: 10,
    topic: "File Handling",
    subtopic: "Writing to Files",
    inputconstrains: "Each line is 1 to 50 characters",
    sampleinput1: "Hello file\nSecond line",
    sampleinput2: "C++ streams rock\nFiles store data",
    input1: "Data line one\nData line two",
    input2: "top\nbottom",
    input3: "x\ny",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main() {
    string line1, line2;
    getline(cin, line1);
    getline(cin, line2);

    ofstream out("note20.txt");
    out << line1 << endl;
    out << line2 << endl;
    out.close();

    ifstream in("note20.txt");
    string first, second;
    getline(in, first);
    getline(in, second);
    in.close();

    cout << "File contains:" << endl;
    cout << first << endl;
    cout << second << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Numbers File Sum Reader",
    description:
      "A mini calculator stores a list of numbers in a file and totals it by reading the file back. Read N and then N integers, write all of them into nums20.txt separated by spaces, then reopen the file and compute how many numbers are stored and their sum.\n\nInput Format:\nFirst line: N. Second line: N integers separated by spaces.\n\nOutput Format:\nCount: <count read from file>\nSum: <sum read from file>\n\nConstraints:\n1 <= N <= 100, -1000 <= each integer <= 1000",
    difficulty: "easy",
    maxscore: 10,
    topic: "File Handling",
    subtopic: "Writing to Files",
    inputconstrains: "1 <= N <= 100, -1000 <= each integer <= 1000",
    sampleinput1: "5\n10 20 30 40 50",
    sampleinput2: "3\n7 14 21",
    input1: "1\n99",
    input2: "4\n-10 5 -5 10",
    input3: "6\n1000 -1000 999 -999 1 0",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <fstream>
using namespace std;

int main() {
    int n;
    cin >> n;
    ofstream out("nums20.txt");
    for (int i = 0; i < n; i++) {
        int v;
        cin >> v;
        out << v << " ";
    }
    out.close();

    ifstream in("nums20.txt");
    int count = 0, sum = 0, v;
    while (in >> v) {
        count++;
        sum += v;
    }
    in.close();

    cout << "Count: " << count << endl;
    cout << "Sum: " << sum << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Sentence Length from File",
    description:
      "A typing trainer stores a practice sentence in a file and reports its length by reading the file back. Read one sentence (a single line) and write it to sent20.txt. Then reopen the file, read the sentence back and print it together with its length.\n\nInput Format:\nOne line of text (may contain spaces).\n\nOutput Format:\nStored: <sentence read from file>\nLength: <length of the stored sentence>\n\nConstraints:\n1 <= sentence length <= 100",
    difficulty: "easy",
    maxscore: 10,
    topic: "File Handling",
    subtopic: "Reading from Files",
    inputconstrains: "1 <= sentence length <= 100",
    sampleinput1: "Files hold text",
    sampleinput2: "C++17 rocks",
    input1: "a",
    input2: "The quick brown fox jumps",
    input3: "Words with spaces inside",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main() {
    string sentence;
    getline(cin, sentence);

    ofstream out("sent20.txt");
    out << sentence << endl;
    out.close();

    ifstream in("sent20.txt");
    string stored;
    getline(in, stored);
    in.close();

    cout << "Stored: " << stored << endl;
    cout << "Length: " << stored.length() << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Append Note Builder",
    description:
      "A sticky-notes tool keeps one note per line in app20.txt. The program always starts the file with the base line 'Notes started' and then appends the note typed by the user using append mode. Finally it prints every line of the finished file.\n\nInput Format:\nOne line of text (the user note; may contain spaces).\n\nOutput Format:\nEvery line of app20.txt after the append, in order (the base line first, then the user note).\n\nConstraints:\n1 <= note length <= 60",
    difficulty: "easy",
    maxscore: 10,
    topic: "File Handling",
    subtopic: "Appending to Files",
    inputconstrains: "1 <= note length <= 60",
    sampleinput1: "buy milk",
    sampleinput2: "revise streams",
    input1: "call mentor",
    input2: "Notes started",
    input3: "last note of the day",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main() {
    // create the base file
    ofstream base("app20.txt");
    base << "Notes started" << endl;
    base.close();

    // read the user note and append it
    string note;
    getline(cin, note);
    ofstream app("app20.txt", ios::app);
    app << note << endl;
    app.close();

    // print the whole file
    ifstream in("app20.txt");
    string line;
    while (getline(in, line)) {
        cout << line << endl;
    }
    in.close();
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Student Mark File Record",
    description:
      "A teacher assistant stores a mark in a file before printing it. Read a student name (single word) and a mark (integer), write 'name mark' into stud20.txt, then reopen the file, read the record back and print it in the required format.\n\nInput Format:\nOne line with two tokens: name (single word) and mark (integer).\n\nOutput Format:\nStudent: <name>\nMark: <mark>\n\nConstraints:\n0 <= mark <= 100",
    difficulty: "easy",
    maxscore: 10,
    topic: "File Handling",
    subtopic: "Writing to Files",
    inputconstrains: "0 <= mark <= 100",
    sampleinput1: "Arjun 92",
    sampleinput2: "Meera 78",
    input1: "Zoya 100",
    input2: "Om 0",
    input3: "Ravi 59",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main() {
    string name;
    int mark;
    cin >> name >> mark;

    ofstream out("stud20.txt");
    out << name << " " << mark << endl;
    out.close();

    ifstream in("stud20.txt");
    string rname;
    int rmark;
    in >> rname >> rmark;
    in.close();

    cout << "Student: " << rname << endl;
    cout << "Mark: " << rmark << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Missing File Open Check",
    description:
      "A safe reader always checks whether a file opened successfully. First try to open missing20.txt for reading (it does not exist yet) and print whether it is open. Then read a message from input, create missing20.txt, store the message in it, reopen the file for reading and print the new open state plus the message.\n\nInput Format:\nOne line of text (may contain spaces).\n\nOutput Format:\nFirst open: <1 if open, else 0>\nSecond open: <1 if open, else 0>\nFile says: <message read back from the file>\n\nConstraints:\n1 <= message length <= 60",
    difficulty: "easy",
    maxscore: 10,
    topic: "File Handling",
    subtopic: "File Error Handling",
    inputconstrains: "1 <= message length <= 60",
    sampleinput1: "recovered message",
    sampleinput2: "error handled",
    input1: "first run text",
    input2: "single",
    input3: "text with several words here",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main() {
    ifstream first("missing20.txt");
    cout << "First open: " << (first.is_open() ? 1 : 0) << endl;
    first.close();

    string msg;
    getline(cin, msg);

    ofstream out("missing20.txt");
    out << msg << endl;
    out.close();

    ifstream second("missing20.txt");
    cout << "Second open: " << (second.is_open() ? 1 : 0) << endl;
    string line;
    getline(second, line);
    second.close();

    cout << "File says: " << line << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Shop Receipt File Writer",
    description:
      "A shop counter writes each purchased item into bill20.txt before totalling the bill. Read N and then N item-price pairs (item is a single word, price an integer). Store each pair on its own line, then reopen the file, print every line and the total of all prices.\n\nInput Format:\nFirst line: N. Then N lines, each with an item (single word) and an integer price.\n\nOutput Format:\nOne line per item: <item> : <price>\nThen: Total: <sum of prices>\n\nConstraints:\n1 <= N <= 10, 1 <= price <= 10000",
    difficulty: "easy",
    maxscore: 10,
    topic: "File Handling",
    subtopic: "Writing to Files",
    inputconstrains: "1 <= N <= 10, 1 <= price <= 10000",
    sampleinput1: "3\npen 10\nbook 45\nbag 500",
    sampleinput2: "2\nink 90\nclip 15",
    input1: "1\nstapler 120",
    input2: "4\nbox 5\ntape 25\nrule 30\nmark 10",
    input3: "3\nalpha 1\nbeta 2\ngamma 3",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main() {
    int n;
    cin >> n;
    ofstream out("bill20.txt");
    for (int i = 0; i < n; i++) {
        string item;
        int price;
        cin >> item >> price;
        out << item << " " << price << endl;
    }
    out.close();

    ifstream in("bill20.txt");
    string item;
    int price, total = 0;
    while (in >> item >> price) {
        cout << item << " : " << price << endl;
        total += price;
    }
    in.close();

    cout << "Total: " << total << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Visitor Log Append Mode",
    description:
      "A gate keeps a visitor log in vis20.txt. The first two visitors of the day are written into a fresh file, and a late visitor is added using append mode. Print the complete log exactly as stored in the file.\n\nInput Format:\nOne line with three visitor names (single words) separated by spaces.\n\nOutput Format:\nVisit: <first>\nVisit: <second>\nVisit: <third>\n\nConstraints:\nEach name is 1 to 20 characters.",
    difficulty: "easy",
    maxscore: 10,
    topic: "File Handling",
    subtopic: "Appending to Files",
    inputconstrains: "Each name is 1 to 20 characters",
    sampleinput1: "Aditi Ravi Sam",
    sampleinput2: "Neha Om Dev",
    input1: "Tara Vikas Zoya",
    input2: "x y z",
    input3: "Kim Lee Cho",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main() {
    string v1, v2, v3;
    cin >> v1 >> v2 >> v3;

    ofstream first("vis20.txt");
    first << "Visit: " << v1 << endl;
    first << "Visit: " << v2 << endl;
    first.close();

    ofstream app("vis20.txt", ios::app);
    app << "Visit: " << v3 << endl;
    app.close();

    ifstream in("vis20.txt");
    string line;
    while (getline(in, line)) {
        cout << line << endl;
    }
    in.close();
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Temperature Log Extremes",
    description:
      "A weather station stores every reading in temp20.txt and then reports the extremes by reading the file. Read N and then N integer readings, store each on its own line, then reopen the file and report how many readings were stored plus the maximum and the minimum.\n\nInput Format:\nFirst line: N. Second line: N integers separated by spaces.\n\nOutput Format:\nReadings: <count read from file>\nMax: <maximum reading>\nMin: <minimum reading>\n\nConstraints:\n1 <= N <= 50, -100 <= each reading <= 100",
    difficulty: "easy",
    maxscore: 10,
    topic: "File Handling",
    subtopic: "Reading from Files",
    inputconstrains: "1 <= N <= 50, -100 <= each reading <= 100",
    sampleinput1: "4\n31 28 35 30",
    sampleinput2: "3\n40 40 40",
    input1: "1\n23",
    input2: "5\n-5 0 5 -10 3",
    input3: "2\n99 -99",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <fstream>
using namespace std;

int main() {
    int n;
    cin >> n;
    ofstream out("temp20.txt");
    for (int i = 0; i < n; i++) {
        int t;
        cin >> t;
        out << t << endl;
    }
    out.close();

    ifstream in("temp20.txt");
    int t, count = 0, mx = -1000000, mn = 1000000;
    while (in >> t) {
        count++;
        if (t > mx) mx = t;
        if (t < mn) mn = t;
    }
    in.close();

    cout << "Readings: " << count << endl;
    cout << "Max: " << mx << endl;
    cout << "Min: " << mn << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Config File Echo",
    description:
      "A settings loader keeps preferences in conf20.txt as key=value lines. Read N and then N key/value pairs, store each as key=value, then reopen the file, read it line by line, split every line at the '=' character and print the key and value.\n\nInput Format:\nFirst line: N. Then N lines, each with a key (single word) and a value (single word).\n\nOutput Format:\nOne line per setting: Key: <key> Value: <value>\n\nConstraints:\n1 <= N <= 8; keys and values contain no '=' and no spaces.",
    difficulty: "easy",
    maxscore: 10,
    topic: "File Handling",
    subtopic: "Reading from Files",
    inputconstrains: "1 <= N <= 8; keys and values contain no '=' and no spaces",
    sampleinput1: "3\nhost localhost\nport 8080\nmode debug",
    sampleinput2: "2\nuser admin\ntoken xyz123",
    input1: "1\ntheme dark",
    input2: "4\na 1\nb 2\nc 3\nd 4",
    input3: "2\nkey1 value1\nkey2 value2",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main() {
    int n;
    cin >> n;
    ofstream out("conf20.txt");
    for (int i = 0; i < n; i++) {
        string key, value;
        cin >> key >> value;
        out << key << "=" << value << endl;
    }
    out.close();

    ifstream in("conf20.txt");
    string line;
    while (getline(in, line)) {
        int pos = line.find('=');
        string key = line.substr(0, pos);
        string value = line.substr(pos + 1);
        cout << "Key: " << key << " Value: " << value << endl;
    }
    in.close();
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },

  // ----------------------------------------------------------------- medium
  {
    title: "Stock CSV Quantity Tally",
    description:
      "A small warehouse keeps its stock in stock20.csv using item,qty lines. Read N and then N item/quantity pairs (item is a single word, quantity an integer), store each as item,qty, then reopen the file, read it line by line, split each line at the comma manually and print the stock table plus the total quantity.\n\nInput Format:\nFirst line: N. Then N lines, each with an item (single word) and an integer quantity separated by a space.\n\nOutput Format:\nOne line per record: <item> -> <qty>\nThen: Total qty: <sum of all quantities>\n\nConstraints:\n1 <= N <= 10, 0 <= qty <= 500",
    difficulty: "medium",
    maxscore: 20,
    topic: "File Handling",
    subtopic: "Line by Line Processing",
    inputconstrains: "1 <= N <= 10, 0 <= qty <= 500",
    sampleinput1: "3\npen 12\nbook 5\nbag 2",
    sampleinput2: "2\nink 30\nclip 45",
    input1: "1\nbolt 100",
    input2: "4\na 1\nb 2\nc 3\nd 4",
    input3: "3\nx 0\ny 0\nz 7",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main() {
    int n;
    cin >> n;
    ofstream out("stock20.csv");
    for (int i = 0; i < n; i++) {
        string item;
        int qty;
        cin >> item >> qty;
        out << item << "," << qty << endl;
    }
    out.close();

    ifstream in("stock20.csv");
    string line;
    int total = 0;
    while (getline(in, line)) {
        int pos = line.find(',');
        string item = line.substr(0, pos);
        int qty = stoi(line.substr(pos + 1));
        total += qty;
        cout << item << " -> " << qty << endl;
    }
    in.close();

    cout << "Total qty: " << total << endl;
    return 0;
}`,
    blacklist: "printf, stringstream",
    whitelist: "ofstream, ifstream, getline, stoi, string",
  },
  {
    title: "Append Versus Overwrite Demo",
    description:
      "A mode tester shows what out mode and append mode do to the same file. It first plants old content in mode20.txt, then reopens the file in plain out mode with the first input word (erasing what was there), appends the second word, and finally appends the third word. After every step the whole file is read back and printed, so the mode effects are visible.\n\nInput Format:\nOne line with three words separated by spaces.\n\nOutput Format:\nAfter overwrite: <file content after the out-mode write>\nAfter append: <content after appending the second word>\nFinal content: <content after appending the third word>\n\nConstraints:\nEach word is 1 to 12 characters.",
    difficulty: "medium",
    maxscore: 20,
    topic: "File Handling",
    subtopic: "File Open Modes",
    inputconstrains: "Each word is 1 to 12 characters",
    sampleinput1: "Sun Moon Star",
    sampleinput2: "one two three",
    input1: "go stop wait",
    input2: "a b c",
    input3: "Hi bye maybe",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <fstream>
#include <string>
using namespace std;

string readWhole() {
    ifstream in("mode20.txt");
    string content, line;
    while (getline(in, line)) {
        content += line;
    }
    in.close();
    return content;
}

int main() {
    ofstream seed("mode20.txt");
    seed << "Old content";
    seed.close();

    string w1, w2, w3;
    cin >> w1 >> w2 >> w3;

    ofstream out("mode20.txt");
    out << w1;
    out.close();
    cout << "After overwrite: " << readWhole() << endl;

    ofstream app1("mode20.txt", ios::app);
    app1 << w2;
    app1.close();
    cout << "After append: " << readWhole() << endl;

    ofstream app2("mode20.txt", ios::app);
    app2 << w3;
    app2.close();
    cout << "Final content: " << readWhole() << endl;
    return 0;
}`,
    blacklist: "printf, freopen",
    whitelist: "ofstream, ifstream, ios::app, getline, string",
  },
  {
    title: "Failed Open Recovery Drill",
    description:
      "A recovery tool verifies a file is really missing before creating it. First attempt to open nope20.txt for reading and report the open state. Then read N lines from input, create nope20.txt with them, reopen the file, report the new state and print every stored line numbered.\n\nInput Format:\nFirst line: N. Then N lines of text.\n\nOutput Format:\nFirst attempt: <1 if open, else 0>\nReopened: <1 if open, else 0>\nThen one line per stored line: <i>: <line>\n\nConstraints:\n1 <= N <= 5, each line 1 to 40 characters",
    difficulty: "medium",
    maxscore: 20,
    topic: "File Handling",
    subtopic: "File Error Handling",
    inputconstrains: "1 <= N <= 5, each line 1 to 40 characters",
    sampleinput1: "2\napple pie\ncode daily",
    sampleinput2: "1\nsingle line only",
    input1: "3\nalpha\nbeta\ngamma",
    input2: "1\none",
    input3: "2\nx y\na b",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main() {
    ifstream probe("nope20.txt");
    cout << "First attempt: " << (probe.is_open() ? 1 : 0) << endl;
    probe.clear();
    probe.close();

    int n;
    cin >> n;
    cin.ignore();
    ofstream out("nope20.txt");
    for (int i = 0; i < n; i++) {
        string s;
        getline(cin, s);
        out << s << endl;
    }
    out.close();

    ifstream back("nope20.txt");
    cout << "Reopened: " << (back.is_open() ? 1 : 0) << endl;
    string line;
    int idx = 1;
    while (getline(back, line)) {
        cout << idx << ": " << line << endl;
        idx++;
    }
    back.close();
    return 0;
}`,
    blacklist: "printf, freopen",
    whitelist: "ifstream, ofstream, getline, is_open, string",
  },
  {
    title: "Word Count Per Line",
    description:
      "A reading coach counts the words of every sentence it stores. Read N and then N sentences, store them in lines20.txt, then reopen the file and read it line by line, printing how many words each line holds. Words are separated by one or more spaces.\n\nInput Format:\nFirst line: N. Then N lines of text (sentences).\n\nOutput Format:\nOne line per sentence: Line <i>: <word count> words\n\nConstraints:\n1 <= N <= 5, 1 <= words per line <= 10",
    difficulty: "medium",
    maxscore: 20,
    topic: "File Handling",
    subtopic: "Line by Line Processing",
    inputconstrains: "1 <= N <= 5, 1 <= words per line <= 10",
    sampleinput1: "2\nlearn file handling\nwrite and read",
    sampleinput2: "1\njust one sentence here",
    input1: "3\nalpha beta\ngamma\ndelta epsilon zeta",
    input2: "1\nsingle",
    input3: "2\none two three four\nfive six",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int countWords(const string& s) {
    int words = 0;
    bool inWord = false;
    for (char c : s) {
        if (c == ' ') {
            inWord = false;
        } else {
            if (!inWord) words++;
            inWord = true;
        }
    }
    return words;
}

int main() {
    int n;
    cin >> n;
    cin.ignore();
    ofstream out("lines20.txt");
    for (int i = 0; i < n; i++) {
        string s;
        getline(cin, s);
        out << s << endl;
    }
    out.close();

    ifstream in("lines20.txt");
    string line;
    int idx = 1;
    while (getline(in, line)) {
        cout << "Line " << idx << ": " << countWords(line) << " words" << endl;
        idx++;
    }
    in.close();
    return 0;
}`,
    blacklist: "printf, stringstream",
    whitelist: "ofstream, ifstream, getline, string",
  },
  {
    title: "File Copy via getline",
    description:
      "A backup helper copies one text file to another. Read N and then N lines into src20.txt, then copy the whole content line by line into dst20.txt using a getline loop, and finally print the contents of the copy.\n\nInput Format:\nFirst line: N. Then N lines of text.\n\nOutput Format:\nThe lines of dst20.txt in order.\n\nConstraints:\n1 <= N <= 5, each line 1 to 40 characters",
    difficulty: "medium",
    maxscore: 20,
    topic: "File Handling",
    subtopic: "Line by Line Processing",
    inputconstrains: "1 <= N <= 5, each line 1 to 40 characters",
    sampleinput1: "2\ncopy me please\nline number two",
    sampleinput2: "3\nfirst\nsecond\nthird",
    input1: "1\nonly line",
    input2: "2\nupper LOWER case\n123 456",
    input3: "2\nmix of words and numbers\nfinal backup row",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main() {
    int n;
    cin >> n;
    cin.ignore();
    ofstream src("src20.txt");
    for (int i = 0; i < n; i++) {
        string s;
        getline(cin, s);
        src << s << endl;
    }
    src.close();

    ifstream in("src20.txt");
    ofstream dst("dst20.txt");
    string line;
    while (getline(in, line)) {
        dst << line << endl;
    }
    in.close();
    dst.close();

    ifstream back("dst20.txt");
    while (getline(back, line)) {
        cout << line << endl;
    }
    back.close();
    return 0;
}`,
    blacklist: "printf, copy, fseek",
    whitelist: "ifstream, ofstream, getline, string",
  },
  {
    title: "Word Tally from File",
    description:
      "A word-game scorer stores a sentence in tally20.txt and then counts words by reading tokens from the file. Read the sentence and a query word, store the sentence, reopen the file and count the total number of tokens and how many of them equal the query word.\n\nInput Format:\nLine 1: a sentence (may contain spaces). Line 2: the query word (single word).\n\nOutput Format:\nTotal words: <token count>\n<query> count: <matches>\n\nConstraints:\nThe sentence has 1 to 20 words; the query word is a single word with no spaces",
    difficulty: "medium",
    maxscore: 20,
    topic: "File Handling",
    subtopic: "Reading from Files",
    inputconstrains: "The sentence has 1 to 20 words; the query word is a single word",
    sampleinput1: "the cat saw the dog and the cat ran\ncat",
    sampleinput2: "files store words in plain text\nwords",
    input1: "a a a a\na",
    input2: "red green blue\npink",
    input3: "code every day code all night\ncode",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main() {
    string sentence;
    getline(cin, sentence);
    string query;
    getline(cin, query);

    ofstream out("tally20.txt");
    out << sentence << endl;
    out.close();

    ifstream in("tally20.txt");
    string word;
    int total = 0, hits = 0;
    while (in >> word) {
        total++;
        if (word == query) hits++;
    }
    in.close();

    cout << "Total words: " << total << endl;
    cout << query << " count: " << hits << endl;
    return 0;
}`,
    blacklist: "printf, map",
    whitelist: "ofstream, ifstream, string, while",
  },

  // ------------------------------------------------------------------- hard
  {
    title: "Bank Ledger Statement Builder",
    description:
      "A mini banking app records every transaction in ledger20.txt with the running balance. Read N and then N transactions (a character D for deposit or W for withdrawal, followed by an integer amount). The balance starts at 0. For each transaction write a line 'type amount Balance: <new balance>' to the file. Then reopen the file, read it line by line, parse every line to recover the amount and the running balance, print the full statement, and finally report the final balance and the largest single transaction amount, both computed from the file.\n\nInput Format:\nFirst line: N. Then N lines, each with a character (D or W) and an integer amount.\n\nOutput Format:\nOne statement line per transaction exactly as stored.\nThen: Final balance: <balance parsed from the last line>\nLargest transaction: <largest amount parsed from the file>\n\nConstraints:\n1 <= N <= 20, 1 <= amount <= 10000; the balance may go negative",
    difficulty: "hard",
    maxscore: 30,
    topic: "File Handling",
    subtopic: "Writing to Files",
    inputconstrains: "1 <= N <= 20, 1 <= amount <= 10000",
    sampleinput1: "4\nD 500\nW 200\nD 300\nW 100",
    sampleinput2: "3\nD 1000\nD 250\nW 750",
    input1: "1\nD 42",
    input2: "3\nW 50\nD 20\nW 30",
    input3: "2\nD 10000\nW 10000",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main() {
    int n;
    cin >> n;
    ofstream out("ledger20.txt");
    int balance = 0;
    for (int i = 0; i < n; i++) {
        char type;
        int amt;
        cin >> type >> amt;
        if (type == 'D') balance += amt;
        else balance -= amt;
        out << type << " " << amt << " Balance: " << balance << endl;
    }
    out.close();

    ifstream in("ledger20.txt");
    string line;
    int finalBal = 0, largest = 0;
    while (getline(in, line)) {
        cout << line << endl;
        int sp1 = line.find(' ');
        int sp2 = line.find(' ', sp1 + 1);
        int amt = stoi(line.substr(sp1 + 1, sp2 - sp1 - 1));
        if (amt > largest) largest = amt;
        int c = line.find("Balance: ");
        finalBal = stoi(line.substr(c + 9));
    }
    in.close();

    cout << "Final balance: " << finalBal << endl;
    cout << "Largest transaction: " << largest << endl;
    return 0;
}`,
    blacklist: "printf, sort, fopen",
    whitelist: "ofstream, ifstream, getline, stoi, string",
  },
  {
    title: "Two File Merge Reader",
    description:
      "A statistics tool stores even numbers and odd numbers in two separate files and then merges them. Read E and then E sorted even integers (store them in even20.txt, one per line), then O and then O sorted odd integers (store them in odd20.txt, one per line). Reopen both files and merge-read them like a merge sort: always print the smaller unread value first, then continue until both files are exhausted.\n\nInput Format:\nLine 1: E. Line 2: E sorted even integers. Line 3: O. Line 4: O sorted odd integers.\n\nOutput Format:\nThe merged ascending sequence, one number per line.\n\nConstraints:\n1 <= E, O <= 20; numbers within each file are sorted ascending; 0 <= value <= 1000",
    difficulty: "hard",
    maxscore: 30,
    topic: "File Handling",
    subtopic: "Reading from Files",
    inputconstrains: "1 <= E, O <= 20; each file sorted ascending; 0 <= value <= 1000",
    sampleinput1: "3\n2 8 14\n3\n1 5 9",
    sampleinput2: "2\n4 6\n2\n3 11",
    input1: "1\n2\n1\n1",
    input2: "2\n10 20\n2\n1 3",
    input3: "3\n0 4 8\n3\n7 9 15",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <fstream>
using namespace std;

int main() {
    int e;
    cin >> e;
    ofstream evenOut("even20.txt");
    for (int i = 0; i < e; i++) {
        int x;
        cin >> x;
        evenOut << x << endl;
    }
    evenOut.close();

    int o;
    cin >> o;
    ofstream oddOut("odd20.txt");
    for (int i = 0; i < o; i++) {
        int x;
        cin >> x;
        oddOut << x << endl;
    }
    oddOut.close();

    ifstream ein("even20.txt");
    ifstream oin("odd20.txt");
    int ev = 0, ov = 0;
    bool hasE = static_cast<bool>(ein >> ev);
    bool hasO = static_cast<bool>(oin >> ov);
    while (hasE || hasO) {
        if (hasE && (!hasO || ev <= ov)) {
            cout << ev << endl;
            hasE = static_cast<bool>(ein >> ev);
        } else {
            cout << ov << endl;
            hasO = static_cast<bool>(oin >> ov);
        }
    }
    ein.close();
    oin.close();
    return 0;
}`,
    blacklist: "sort, printf, array merge",
    whitelist: "ifstream, ofstream, while, bool",
  },
  {
    title: "Student Registry Query from File",
    description:
      "A registrar stores student records in reg20.txt as 'name mark' lines and then answers lookups by re-reading the file. Read N records and store them. Then read Q and Q query names; for every query reopen the file, scan the stored records and print the mark or 'Not found'.\n\nInput Format:\nFirst line: N. Then N lines, each with a name (single word) and an integer mark. Then a line with Q. Then Q lines, each with one query name.\n\nOutput Format:\nFirst: Records stored: <N>\nThen one line per query: <query>: <mark> or <query>: Not found\n\nConstraints:\n1 <= N <= 10, 0 <= mark <= 100, 0 <= Q <= 5; query names may repeat or miss",
    difficulty: "hard",
    maxscore: 30,
    topic: "File Handling",
    subtopic: "Reading from Files",
    inputconstrains: "1 <= N <= 10, 0 <= mark <= 100, 0 <= Q <= 5",
    sampleinput1: "3\nArjun 92\nMeera 78\nRavi 59\n2\nMeera\nOm",
    sampleinput2: "2\nZoya 100\nOm 0\n2\nOm\nZoya",
    input1: "1\nSolo 50\n1\nSolo",
    input2: "3\na 1\nb 2\nc 3\n0",
    input3: "2\nx 10\ny 20\n3\nx\ny\nz",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main() {
    int n;
    cin >> n;
    ofstream out("reg20.txt");
    for (int i = 0; i < n; i++) {
        string name;
        int mark;
        cin >> name >> mark;
        out << name << " " << mark << endl;
    }
    out.close();

    cout << "Records stored: " << n << endl;

    int q;
    cin >> q;
    for (int i = 0; i < q; i++) {
        string query;
        cin >> query;
        ifstream in("reg20.txt");
        string name;
        int mark = 0;
        bool found = false;
        while (in >> name >> mark) {
            if (name == query) {
                found = true;
                break;
            }
        }
        in.close();
        if (found) cout << query << ": " << mark << endl;
        else cout << query << ": Not found" << endl;
    }
    return 0;
}`,
    blacklist: "printf, map, unordered_map",
    whitelist: "ifstream, ofstream, cin, cout, string, bool",
  },
  {
    title: "Audit Trail Session Logger",
    description:
      "A security tool writes one audit file across three sessions. For session 1 it opens audit20.txt in plain out mode (fresh start); sessions 2 and 3 open the same file in append mode. Each session writes the header 'Session k' followed by k entry words, one per line. Read the three sessions from input, write them, then reopen the file and print the complete audit trail with line numbers and the total line count.\n\nInput Format:\nOne line with three session descriptions: k1 entry... k2 entry... k3 entry... (each session starts with its entry count followed by that many single-word entries).\n\nOutput Format:\nOne numbered line per file line: <i>: <line>\nThen: Total lines: <count>\n\nConstraints:\n0 <= entries per session <= 3; each entry is a single word of 1 to 12 characters",
    difficulty: "hard",
    maxscore: 30,
    topic: "File Handling",
    subtopic: "Appending to Files",
    inputconstrains: "0 <= entries per session <= 3; entries are single words",
    sampleinput1: "2 login start 1 payment 3 backup sync done",
    sampleinput2: "0 2 open close 1 save",
    input1: "1 boot 0 1 exit",
    input2: "3 a b c 0 0",
    input3: "1 e1 1 e2 1 e3",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <fstream>
#include <string>
using namespace std;

int main() {
    for (int s = 1; s <= 3; s++) {
        int k;
        cin >> k;
        ofstream log;
        if (s == 1) {
            log.open("audit20.txt");
        } else {
            log.open("audit20.txt", ios::app);
        }
        log << "Session " << s << endl;
        for (int i = 0; i < k; i++) {
            string entry;
            cin >> entry;
            log << entry << endl;
        }
        log.close();
    }

    ifstream in("audit20.txt");
    string line;
    int total = 0;
    while (getline(in, line)) {
        total++;
        cout << total << ": " << line << endl;
    }
    in.close();
    cout << "Total lines: " << total << endl;
    return 0;
}`,
    blacklist: "printf, fprintf, freopen",
    whitelist: "ofstream, ifstream, ios::app, getline, string",
  },
];

export const mcqs = [
  // ------------------------------------------------------------------ easy
  {
    title: "Purpose of ofstream",
    description: "What is ofstream used for in C++?",
    difficulty: "easy",
    topic: "File Handling",
    subtopic: "Writing to Files",
    Option1: "An input stream that reads data from files",
    Option2: "An output stream that writes data to files",
    Option3: "A function that deletes files from disk",
    Option4: "A keyword that renames files",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Header Providing File Streams",
    description: "Which header must be included to use ofstream, ifstream and fstream?",
    difficulty: "easy",
    topic: "File Handling",
    subtopic: "File Open Modes",
    Option1: "<fstream>",
    Option2: "<filestream>",
    Option3: "<iostream>",
    Option4: "<stdio>",
    CorrectOption: 1,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Default ofstream Open Behavior",
    description: 'What happens to the contents of an existing file when ofstream out("data.txt"); is executed?',
    difficulty: "easy",
    topic: "File Handling",
    subtopic: "File Open Modes",
    Option1: "The contents are kept and new data is added at the end",
    Option2: "The open fails if the file already exists",
    Option3: "The file is truncated: previous contents are erased",
    Option4: "The file becomes read-only",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Meaning of ios::app",
    description: "When a file is opened with the ios::app flag, what does every write do?",
    difficulty: "easy",
    topic: "File Handling",
    subtopic: "Appending to Files",
    Option1: "It replaces the first line of the file",
    Option2: "It opens the file in read-only mode",
    Option3: "It fails if the file already exists",
    Option4: "It is positioned at the end of the file, preserving existing content",
    CorrectOption: 4,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "What is_open Confirms",
    description: "For an ifstream, what does is_open() returning true confirm?",
    difficulty: "easy",
    topic: "File Handling",
    subtopic: "File Error Handling",
    Option1: "The file is empty",
    Option2: "The file was successfully opened and is ready for reading",
    Option3: "The file has reached its end",
    Option4: "The program has write permission",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Reading a Full Line from a File",
    description: "Which call reads one whole line (including spaces) from an ifstream named fin into a string named line?",
    difficulty: "easy",
    topic: "File Handling",
    subtopic: "Reading from Files",
    Option1: "getline(fin, line)",
    Option2: "fin >> line",
    Option3: "fin.getline() with no arguments",
    Option4: "fin.read(line)",
    CorrectOption: 1,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Stream Class That Reads Files",
    description: "Which stream class is specifically designed for reading data from files?",
    difficulty: "easy",
    topic: "File Handling",
    subtopic: "Reading from Files",
    Option1: "ofstream",
    Option2: "ostream",
    Option3: "ifstream",
    Option4: "iostream",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Effect of close on ofstream",
    description: "What does calling close() on an ofstream do?",
    difficulty: "easy",
    topic: "File Handling",
    subtopic: "Writing to Files",
    Option1: "It deletes the file from disk",
    Option2: "It flushes any buffered data to the file and disconnects the stream",
    Option3: "It converts the stream into an ifstream",
    Option4: "It moves the write pointer back to the start",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Stream Class for Both Read and Write",
    description: "Which stream class can open a file for both reading and writing?",
    difficulty: "easy",
    topic: "File Handling",
    subtopic: "File Open Modes",
    Option1: "ofstream",
    Option2: "ifstream",
    Option3: "ostream",
    Option4: "fstream",
    CorrectOption: 4,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Opening a Nonexistent File with ofstream",
    description: "What happens when an ofstream opens a file name that does not exist on disk?",
    difficulty: "easy",
    topic: "File Handling",
    subtopic: "Writing to Files",
    Option1: "A new empty file with that name is created",
    Option2: "The stream enters an error state and nothing is created",
    Option3: "The program terminates immediately",
    Option4: "The file is created only after the program ends",
    CorrectOption: 1,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },

  // ----------------------------------------------------------------- medium
  {
    title: "File Write Then Read Sum",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "File Handling",
    subtopic: "Writing to Files",
    Option1: "42",
    Option2: "7 35",
    Option3: "735",
    Option4: "0",
    CorrectOption: 1,
    codesnippet: `#include <fstream>
#include <iostream>
using namespace std;
int main() {
    ofstream out("mcqa.txt");
    out << 7 << " " << 35;
    out.close();
    ifstream in("mcqa.txt");
    int a, b;
    in >> a >> b;
    in.close();
    cout << a + b;
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <fstream>\n#include <iostream>\nusing namespace std;\nint main() {\n    ofstream out("mcqa.txt");\n    out << 7 << " " << 35;\n    out.close();\n    ifstream in("mcqa.txt");\n    int a, b;\n    in >> a >> b;\n    in.close();\n    cout << a + b;\n    return 0;\n}`,
      stdin: "",
      expected: "42",
    },
  },
  {
    title: "Append Mode Grows File",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "File Handling",
    subtopic: "Appending to Files",
    Option1: "cd",
    Option2: "abcd",
    Option3: "ab",
    Option4: "ab cd",
    CorrectOption: 2,
    codesnippet: `#include <fstream>
#include <iostream>
#include <string>
using namespace std;
int main() {
    ofstream first("mcqb.txt");
    first << "ab";
    first.close();
    ofstream second("mcqb.txt", ios::app);
    second << "cd";
    second.close();
    ifstream in("mcqb.txt");
    string s;
    getline(in, s);
    in.close();
    cout << s;
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <fstream>\n#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    ofstream first("mcqb.txt");\n    first << "ab";\n    first.close();\n    ofstream second("mcqb.txt", ios::app);\n    second << "cd";\n    second.close();\n    ifstream in("mcqb.txt");\n    string s;\n    getline(in, s);\n    in.close();\n    cout << s;\n    return 0;\n}`,
      stdin: "",
      expected: "abcd",
    },
  },
  {
    title: "Detecting a Failed Open",
    description: "The file mcqc_missing.txt does not exist on disk. What does this program print?",
    difficulty: "medium",
    topic: "File Handling",
    subtopic: "File Error Handling",
    Option1: "open",
    Option2: "error",
    Option3: "missing",
    Option4: "0",
    CorrectOption: 3,
    codesnippet: `#include <fstream>
#include <iostream>
using namespace std;
int main() {
    ifstream in("mcqc_missing.txt");
    if (in.is_open())
        cout << "open";
    else
        cout << "missing";
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <fstream>\n#include <iostream>\nusing namespace std;\nint main() {\n    ifstream in("mcqc_missing.txt");\n    if (in.is_open())\n        cout << "open";\n    else\n        cout << "missing";\n    return 0;\n}`,
      stdin: "",
      expected: "missing",
    },
  },
  {
    title: "Counting File Lines with getline",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "File Handling",
    subtopic: "Line by Line Processing",
    Option1: "1",
    Option2: "12",
    Option3: "0",
    Option4: "2",
    CorrectOption: 4,
    codesnippet: `#include <fstream>
#include <iostream>
#include <string>
using namespace std;
int main() {
    ofstream out("mcqd.txt");
    out << "alpha" << endl;
    out << "beta" << endl;
    out.close();
    ifstream in("mcqd.txt");
    string line;
    int count = 0;
    while (getline(in, line))
        count++;
    in.close();
    cout << count;
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <fstream>\n#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    ofstream out("mcqd.txt");\n    out << "alpha" << endl;\n    out << "beta" << endl;\n    out.close();\n    ifstream in("mcqd.txt");\n    string line;\n    int count = 0;\n    while (getline(in, line))\n        count++;\n    in.close();\n    cout << count;\n    return 0;\n}`,
      stdin: "",
      expected: "2",
    },
  },
  {
    title: "trunc Versus app",
    description: "Which statement correctly describes the difference between ios::trunc and ios::app?",
    difficulty: "medium",
    topic: "File Handling",
    subtopic: "File Open Modes",
    Option1: "ios::trunc keeps old content, ios::app erases it",
    Option2: "ios::trunc erases existing content on open, ios::app preserves it and writes at the end",
    Option3: "Both behave identically on existing files",
    Option4: "ios::app erases content when the file already exists",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Reading Past the End of a File",
    description: "What happens when a read operation on an ifstream finds the file already exhausted?",
    difficulty: "medium",
    topic: "File Handling",
    subtopic: "Reading from Files",
    Option1: "The program crashes immediately",
    Option2: "The read returns the last value again",
    Option3: "The stream enters a fail state and further reads yield nothing until the state is cleared",
    Option4: "The file is closed automatically",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },

  // ------------------------------------------------------------------- hard
  {
    title: "Overwrite Erases the Appends",
    description: "What does this program print?",
    difficulty: "hard",
    topic: "File Handling",
    subtopic: "File Open Modes",
    Option1: "onetwothree",
    Option2: "onetwo",
    Option3: "threethree",
    Option4: "three",
    CorrectOption: 4,
    codesnippet: `#include <fstream>
#include <iostream>
#include <string>
using namespace std;
int main() {
    ofstream a("mcqe.txt");
    a << "one";
    a.close();
    ofstream b("mcqe.txt", ios::app);
    b << "two";
    b.close();
    ofstream c("mcqe.txt");
    c << "three";
    c.close();
    ifstream in("mcqe.txt");
    string s;
    getline(in, s);
    in.close();
    cout << s;
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <fstream>\n#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    ofstream a("mcqe.txt");\n    a << "one";\n    a.close();\n    ofstream b("mcqe.txt", ios::app);\n    b << "two";\n    b.close();\n    ofstream c("mcqe.txt");\n    c << "three";\n    c.close();\n    ifstream in("mcqe.txt");\n    string s;\n    getline(in, s);\n    in.close();\n    cout << s;\n    return 0;\n}`,
      stdin: "",
      expected: "three",
    },
  },
  {
    title: "tellp and tellg Positions",
    description: "What does this program print? (Each position is printed as its number, with no separator.)",
    difficulty: "hard",
    topic: "File Handling",
    subtopic: "Reading from Files",
    Option1: "4",
    Option2: "40",
    Option3: "44",
    Option4: "04",
    CorrectOption: 3,
    codesnippet: `#include <fstream>
#include <iostream>
using namespace std;
int main() {
    ofstream out("mcqf.txt");
    out << "abcd";
    cout << out.tellp();
    out.close();
    ifstream in("mcqf.txt");
    in.seekg(0, ios::end);
    cout << in.tellg();
    in.close();
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <fstream>\n#include <iostream>\nusing namespace std;\nint main() {\n    ofstream out("mcqf.txt");\n    out << "abcd";\n    cout << out.tellp();\n    out.close();\n    ifstream in("mcqf.txt");\n    in.seekg(0, ios::end);\n    cout << in.tellg();\n    in.close();\n    return 0;\n}`,
      stdin: "",
      expected: "44",
    },
  },
  {
    title: "Reopening with trunc Clears",
    description: "What does this program print?",
    difficulty: "hard",
    topic: "File Handling",
    subtopic: "Writing to Files",
    Option1: "old data",
    Option2: "new",
    Option3: "old datanew",
    Option4: "newold data",
    CorrectOption: 2,
    codesnippet: `#include <fstream>
#include <iostream>
#include <string>
using namespace std;
int main() {
    ofstream w1("mcqg.txt");
    w1 << "old data";
    w1.close();
    ofstream w2("mcqg.txt", ios::trunc);
    w2 << "new";
    w2.close();
    ifstream in("mcqg.txt");
    string s;
    getline(in, s);
    in.close();
    cout << s;
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <fstream>\n#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    ofstream w1("mcqg.txt");\n    w1 << "old data";\n    w1.close();\n    ofstream w2("mcqg.txt", ios::trunc);\n    w2 << "new";\n    w2.close();\n    ifstream in("mcqg.txt");\n    string s;\n    getline(in, s);\n    in.close();\n    cout << s;\n    return 0;\n}`,
      stdin: "",
      expected: "new",
    },
  },
  {
    title: "Why Close Before Reopening",
    description: "Why should an ofstream be closed (or flushed) before the same file is reopened for reading?",
    difficulty: "hard",
    topic: "File Handling",
    subtopic: "File Error Handling",
    Option1: "close() renames the file so the reader can find it",
    Option2: "Reopening a file while any stream exists is illegal in C++",
    Option3: "close() compresses the file to make reading faster",
    Option4: "Output may still sit in the stream's memory buffer; close (or flush) writes it to the file so a reopened reader sees all the data",
    CorrectOption: 4,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
];
