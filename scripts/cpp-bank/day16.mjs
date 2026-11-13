/**
 * OOPS using CPP — Day 16: Introduction to STL, Using Vectors, Sets, Maps, Function/Class Templates
 * 20 code questions (10 easy: 6 basics + 4 real-world, 6 medium, 4 hard)
 * 20 MCQs (10 easy, 6 medium, 4 hard)
 * All solutions are fresh C++ written for this course (no conversions).
 */
export const meta = {
  day: 16,
  topic: "Templates and STL",
};

export const code = [
  // ------------------------------------------------------------------ easy
  {
    title: "Max Value Template Drill",
    description:
      "Your first function template: one maxValue function that works for both int and double. Write a function template maxValue<T> that returns the larger of its two arguments, then use it once with integers and once with doubles.\n\nInput Format:\nLine 1: two integers a and b.\nLine 2: two doubles x and y.\n\nOutput Format:\nMax int: <larger of a and b>\nMax double: <larger of x and y, 2 decimals>\n\nConstraints:\n-1000 <= a, b <= 1000, -1000.0 <= x, y <= 1000.0",
    difficulty: "easy",
    maxscore: 10,
    topic: "Templates and STL",
    subtopic: "Function Templates",
    inputconstrains: "-1000 <= a, b <= 1000, -1000.0 <= x, y <= 1000.0",
    sampleinput1: "3 9\n4.5 2.25",
    sampleinput2: "-7 -2\n-1.5 -3.5",
    input1: "10 10\n5.05 5.05",
    input2: "0 100\n0.1 -0.1",
    input3: "999 -999\n1000.0 -1000.0",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
using namespace std;

template <class T>
T maxValue(T a, T b) {
    return (a > b) ? a : b;
}

int main() {
    int i1, i2;
    double d1, d2;
    cin >> i1 >> i2 >> d1 >> d2;
    cout << "Max int: " << maxValue(i1, i2) << endl;
    cout << fixed << setprecision(2);
    cout << "Max double: " << maxValue(d1, d2) << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Vector Fill and Echo",
    description:
      "A courier app keeps parcel weights in a growing list. Read N integers into a vector using push_back, then echo them in order and report the vector's size.\n\nInput Format:\nLine 1: integer N.\nLine 2: N integers separated by spaces.\n\nOutput Format:\nValues: <elements in order, space separated>\nSize: <number of elements>\n\nConstraints:\n1 <= N <= 1000, -100000 <= element <= 100000",
    difficulty: "easy",
    maxscore: 10,
    topic: "Templates and STL",
    subtopic: "Vector",
    inputconstrains: "1 <= N <= 1000, -100000 <= element <= 100000",
    sampleinput1: "3\n10 20 30",
    sampleinput2: "1\n42",
    input1: "5\n1 2 3 4 5",
    input2: "4\n-1 -2 -3 -4",
    input3: "2\n7 7",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        v.push_back(x);
    }
    cout << "Values:";
    for (int i = 0; i < (int)v.size(); i++) {
        cout << " " << v[i];
    }
    cout << endl;
    cout << "Size: " << v.size() << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Vector Sum and Average",
    description:
      "A fitness band stores the day's step readings in a vector. Read N integers into a vector, then compute their sum and average using the stored elements.\n\nInput Format:\nLine 1: integer N.\nLine 2: N integers.\n\nOutput Format:\nSum: <total>\nAverage: <average with 2 decimals>\n\nConstraints:\n1 <= N <= 1000, -100000 <= element <= 100000",
    difficulty: "easy",
    maxscore: 10,
    topic: "Templates and STL",
    subtopic: "Vector",
    inputconstrains: "1 <= N <= 1000, -100000 <= element <= 100000",
    sampleinput1: "4\n10 20 30 40",
    sampleinput2: "3\n1 2 4",
    input1: "1\n-5",
    input2: "5\n2 4 6 8 10",
    input3: "3\n100000 100000 100000",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <vector>
#include <iomanip>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        v.push_back(x);
    }
    long long sum = 0;
    for (int i = 0; i < (int)v.size(); i++) {
        sum += v[i];
    }
    double avg = (double)sum / v.size();
    cout << "Sum: " << sum << endl;
    cout << fixed << setprecision(2);
    cout << "Average: " << avg << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Set Sorted Unique Collector",
    description:
      "A hashtag tracker only cares about distinct tags. Read N integers into a set, then report how many unique values it holds and list them in ascending order — the set sorts and de-duplicates for you.\n\nInput Format:\nLine 1: integer N.\nLine 2: N integers (duplicates possible).\n\nOutput Format:\nUnique: <number of distinct values>\nThen each distinct value in ascending order, one per line.\n\nConstraints:\n1 <= N <= 1000, -100000 <= value <= 100000",
    difficulty: "easy",
    maxscore: 10,
    topic: "Templates and STL",
    subtopic: "Set",
    inputconstrains: "1 <= N <= 1000, -100000 <= value <= 100000",
    sampleinput1: "5\n4 2 4 1 2",
    sampleinput2: "3\n7 7 7",
    input1: "6\n5 -3 5 0 -3 9",
    input2: "1\n100",
    input3: "8\n10 20 30 40 10 20 30 40",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <set>
using namespace std;

int main() {
    int n;
    cin >> n;
    set<int> s;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        s.insert(x);
    }
    cout << "Unique: " << s.size() << endl;
    for (int x : s) {
        cout << x << endl;
    }
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Map Prints in Key Order",
    description:
      "A roll-number register pairs each roll number with a name. Read N (key, word) pairs into a map<int, string> and print them in ascending key order — no sorting code needed, the map keeps keys sorted.\n\nInput Format:\nLine 1: integer N.\nNext N lines: an integer key and a single word.\n\nOutput Format:\nFor every entry in ascending key order: <key> <word>\n\nConstraints:\n1 <= N <= 1000, -100000 <= key <= 100000, keys are distinct, word has at most 20 letters",
    difficulty: "easy",
    maxscore: 10,
    topic: "Templates and STL",
    subtopic: "Map",
    inputconstrains: "1 <= N <= 1000, -100000 <= key <= 100000, keys are distinct, word has at most 20 letters",
    sampleinput1: "3\n20 mango\n10 apple\n30 cherry",
    sampleinput2: "4\n5 one\n3 two\n4 one\n1 three",
    input1: "2\n100000 zero\n-5 minus",
    input2: "1\n7 solo",
    input3: "5\n2 b\n1 a\n3 c\n5 e\n4 d",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <map>
#include <string>
using namespace std;

int main() {
    int n;
    cin >> n;
    map<int, string> m;
    for (int i = 0; i < n; i++) {
        int key;
        string word;
        cin >> key >> word;
        m[key] = word;
    }
    for (pair<const int, string> p : m) {
        cout << p.first << " " << p.second << endl;
    }
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Box Template Holds a Value",
    description:
      "A class template Box<T> stores exactly one value of any type. Define the template with a constructor and a get() method, then instantiate it twice: Box<int> from an integer input and Box<double> from a double input.\n\nInput Format:\nLine 1: one integer.\nLine 2: one double.\n\nOutput Format:\nInt box holds: <the integer>\nDouble box holds: <the double, 2 decimals>\n\nConstraints:\n-100000 <= integer <= 100000, -100000.0 <= double <= 100000.0",
    difficulty: "easy",
    maxscore: 10,
    topic: "Templates and STL",
    subtopic: "Class Templates",
    inputconstrains: "-100000 <= integer <= 100000, -100000.0 <= double <= 100000.0",
    sampleinput1: "7\n2.5",
    sampleinput2: "-3\n0.05",
    input1: "100\n99.99",
    input2: "0\n-12.75",
    input3: "42\n1000.0",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
using namespace std;

template <class T>
class Box {
    T value;
public:
    Box(T v) {
        value = v;
    }
    T get() {
        return value;
    }
};

int main() {
    int a;
    double b;
    cin >> a >> b;
    Box<int> ib(a);
    Box<double> db(b);
    cout << "Int box holds: " << ib.get() << endl;
    cout << fixed << setprecision(2);
    cout << "Double box holds: " << db.get() << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Store Shelf Stock Counter",
    description:
      "A small store counts units on its shelf. Read N item names (single words). Using a map<string, int>, tally how many units of each item were recorded, then print every item with its count in alphabetical order of the item name.\n\nInput Format:\nLine 1: integer N.\nLine 2: N item names separated by spaces.\n\nOutput Format:\nFor every distinct item in alphabetical order: <item> <count>\n\nConstraints:\n1 <= N <= 1000, item names are single words of at most 20 lowercase letters",
    difficulty: "easy",
    maxscore: 10,
    topic: "Templates and STL",
    subtopic: "Map",
    inputconstrains: "1 <= N <= 1000, item names are single words of at most 20 lowercase letters",
    sampleinput1: "5\npen pencil pen eraser pen",
    sampleinput2: "3\napple banana apple",
    input1: "4\nmilk milk milk milk",
    input2: "1\nnotebook",
    input3: "6\nzip zip bag bag zip bag",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <map>
#include <string>
using namespace std;

int main() {
    int n;
    cin >> n;
    map<string, int> stock;
    for (int i = 0; i < n; i++) {
        string item;
        cin >> item;
        stock[item]++;
    }
    for (pair<const string, int> p : stock) {
        cout << p.first << " " << p.second << endl;
    }
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Event Check-in Unique Names",
    description:
      "A seminar front desk logs every arriving visitor, but the report only needs distinct names. Read N names into a set<string>, then print how many unique visitors attended followed by their names in alphabetical order.\n\nInput Format:\nLine 1: integer N.\nLine 2: N names separated by spaces (duplicates possible).\n\nOutput Format:\nUnique visitors: <count>\nThen each distinct name in alphabetical order, one per line.\n\nConstraints:\n1 <= N <= 1000, each name is a single word of at most 20 letters",
    difficulty: "easy",
    maxscore: 10,
    topic: "Templates and STL",
    subtopic: "Set",
    inputconstrains: "1 <= N <= 1000, each name is a single word of at most 20 letters",
    sampleinput1: "5\nRiya Om Riya Dev Om",
    sampleinput2: "2\nAsha Asha",
    input1: "4\nZoya Amit Zoya Amit",
    input2: "1\nKiran",
    input3: "6\nraj ajay raj sim ajay sim",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <set>
#include <string>
using namespace std;

int main() {
    int n;
    cin >> n;
    set<string> visitors;
    for (int i = 0; i < n; i++) {
        string name;
        cin >> name;
        visitors.insert(name);
    }
    cout << "Unique visitors: " << visitors.size() << endl;
    for (string name : visitors) {
        cout << name << endl;
    }
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Task Planner Reverse View",
    description:
      "An evening planner app stores tasks as they are typed and then shows an undo-style review: newest first. Read N task lines (they may contain spaces) into a vector<string>, then print them in reverse order of entry, each prefixed by its original one-based position.\n\nInput Format:\nLine 1: integer N.\nNext N lines: one task per line.\n\nOutput Format:\nN lines in reverse entry order: <original position>. <task>\n\nConstraints:\n1 <= N <= 1000, each task line has at most 100 characters with no leading or trailing spaces",
    difficulty: "easy",
    maxscore: 10,
    topic: "Templates and STL",
    subtopic: "Vector",
    inputconstrains: "1 <= N <= 1000, each task line has at most 100 characters with no leading or trailing spaces",
    sampleinput1: "3\nBuy milk\nFinish report\nCall dentist",
    sampleinput2: "1\nWater the plants",
    input1: "2\nSubmit assignment\nRevise notes",
    input2: "4\nbuy milk\ncall bank\npost letter\nread book",
    input3: "5\none\ntwo\nthree\nfour\nfive",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

int main() {
    int n;
    cin >> n;
    cin.ignore();
    vector<string> tasks;
    for (int i = 0; i < n; i++) {
        string task;
        getline(cin, task);
        tasks.push_back(task);
    }
    for (int i = n - 1; i >= 0; i--) {
        cout << (i + 1) << ". " << tasks[i] << endl;
    }
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Weather Log Median Check",
    description:
      "A weather station logs N temperature readings and needs a quick median. Read the readings into a vector, sort it with the STL sort function, then print the middle element. If N is even, print the average of the two middle values with exactly 1 decimal.\n\nInput Format:\nLine 1: integer N.\nLine 2: N integer readings.\n\nOutput Format:\nMedian: <middle element if N is odd, else the two middle values' average with 1 decimal>\n\nConstraints:\n1 <= N <= 1000, -100000 <= reading <= 100000",
    difficulty: "easy",
    maxscore: 10,
    topic: "Templates and STL",
    subtopic: "STL Algorithms",
    inputconstrains: "1 <= N <= 1000, -100000 <= reading <= 100000",
    sampleinput1: "5\n9 1 8 2 7",
    sampleinput2: "4\n10 2 8 4",
    input1: "1\n5",
    input2: "6\n3 3 3 3 3 3",
    input3: "2\n-5 5",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <vector>
#include <algorithm>
#include <iomanip>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        v.push_back(x);
    }
    sort(v.begin(), v.end());
    cout << fixed << setprecision(1);
    if (n % 2 == 1) {
        cout << "Median: " << v[n / 2] << endl;
    } else {
        double m = (v[n / 2 - 1] + v[n / 2]) / 2.0;
        cout << "Median: " << m << endl;
    }
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },

  // ----------------------------------------------------------------- medium
  {
    title: "Chat Word Frequency Report",
    description:
      "A chat analytics dashboard counts how often each word appears in a message batch. Read N words and tally them in a map<string, int>. Print every word with its count in alphabetical order of the word.\n\nInput Format:\nLine 1: integer N.\nLine 2: N words separated by spaces.\n\nOutput Format:\nFor every distinct word in alphabetical order: <word> <count>\n\nConstraints:\n1 <= N <= 1000, each word has at most 20 letters, comparison is case sensitive (ok and OK differ)",
    difficulty: "medium",
    maxscore: 20,
    topic: "Templates and STL",
    subtopic: "Map",
    inputconstrains: "1 <= N <= 1000, each word has at most 20 letters, comparison is case sensitive",
    sampleinput1: "6\nhi hello hi bye hello hi",
    sampleinput2: "3\nyes no maybe",
    input1: "4\nok OK ok OK",
    input2: "1\nlonely",
    input3: "7\na b a c b a d",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <map>
#include <string>
using namespace std;

int main() {
    int n;
    cin >> n;
    map<string, int> freq;
    for (int i = 0; i < n; i++) {
        string w;
        cin >> w;
        freq[w]++;
    }
    for (pair<const string, int> p : freq) {
        cout << p.first << " " << p.second << endl;
    }
    return 0;
}`,
    blacklist: "struct, printf, unordered_map",
    whitelist: "map, string",
  },
  {
    title: "Playlist Purge Number",
    description:
      "A music app removes every copy of a disliked track number from the playlist. Read N track numbers into a vector, then read a target number and erase all its occurrences from the vector. Report how many tracks remain and list them in order.\n\nInput Format:\nLine 1: integer N.\nLine 2: N track numbers.\nLine 3: the target track number to remove.\n\nOutput Format:\nCount: <tracks left>\nLeft: <remaining tracks in order, space separated>\n\nConstraints:\n1 <= N <= 1000, -1000 <= track number <= 1000, the target may not exist in the list",
    difficulty: "medium",
    maxscore: 20,
    topic: "Templates and STL",
    subtopic: "Vector",
    inputconstrains: "1 <= N <= 1000, -1000 <= track number <= 1000, the target may not exist in the list",
    sampleinput1: "6\n3 7 3 9 3 5\n3",
    sampleinput2: "4\n1 2 3 4\n5",
    input1: "3\n8 8 8\n8",
    input2: "5\n10 20 30 20 10\n20",
    input3: "1\n7\n7",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        v.push_back(x);
    }
    int target;
    cin >> target;
    v.erase(remove(v.begin(), v.end(), target), v.end());
    cout << "Count: " << v.size() << endl;
    cout << "Left:";
    for (int i = 0; i < (int)v.size(); i++) {
        cout << " " << v[i];
    }
    cout << endl;
    return 0;
}`,
    blacklist: "printf, struct",
    whitelist: "vector, erase, remove",
  },
  {
    title: "Daily Sales Extremes Locator",
    description:
      "A shop owner studies a series of daily sales figures stored in a vector. Using max_element and min_element, locate the best and worst days. Print each extreme value together with the index of its first occurrence (0-based).\n\nInput Format:\nLine 1: integer N.\nLine 2: N integers (daily sales).\n\nOutput Format:\nMax sales: <value> at index <first index of the maximum>\nMin sales: <value> at index <first index of the minimum>\n\nConstraints:\n1 <= N <= 1000, -100000 <= value <= 100000",
    difficulty: "medium",
    maxscore: 20,
    topic: "Templates and STL",
    subtopic: "STL Algorithms",
    inputconstrains: "1 <= N <= 1000, -100000 <= value <= 100000",
    sampleinput1: "5\n120 340 90 340 150",
    sampleinput2: "4\n50 60 70 80",
    input1: "3\n42 42 42",
    input2: "6\n-5 0 -5 10 3 10",
    input3: "1\n99",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        v.push_back(x);
    }
    int maxIdx = max_element(v.begin(), v.end()) - v.begin();
    int minIdx = min_element(v.begin(), v.end()) - v.begin();
    cout << "Max sales: " << v[maxIdx] << " at index " << maxIdx << endl;
    cout << "Min sales: " << v[minIdx] << " at index " << minIdx << endl;
    return 0;
}`,
    blacklist: "printf, struct",
    whitelist: "vector, max_element, min_element",
  },
  {
    title: "Product Pair Template",
    description:
      "A catalog entry pairs a product id with its price, and the store wants one reusable template for any type combination. Define a class template Pair<T, U> that stores two values of different types with getFirst() and getSecond() methods, then instantiate Pair<int, double> from the input.\n\nInput Format:\nOne line: an integer id and a double price.\n\nOutput Format:\nPair first: <id>\nPair second: <price, 2 decimals>\n\nConstraints:\n-10000 <= id <= 10000, 0 <= price <= 100000",
    difficulty: "medium",
    maxscore: 20,
    topic: "Templates and STL",
    subtopic: "Class Templates",
    inputconstrains: "-10000 <= id <= 10000, 0 <= price <= 100000",
    sampleinput1: "7 199.5",
    sampleinput2: "1001 0.99",
    input1: "-5 250",
    input2: "0 0.01",
    input3: "42 1234.56",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
using namespace std;

template <class T, class U>
class Pair {
    T first;
    U second;
public:
    Pair(T a, U b) {
        first = a;
        second = b;
    }
    T getFirst() {
        return first;
    }
    U getSecond() {
        return second;
    }
};

int main() {
    int id;
    double price;
    cin >> id >> price;
    Pair<int, double> product(id, price);
    cout << "Pair first: " << product.getFirst() << endl;
    cout << fixed << setprecision(2);
    cout << "Pair second: " << product.getSecond() << endl;
    return 0;
}`,
    blacklist: "struct, printf",
    whitelist: "template, class",
  },
  {
    title: "Swap Values Template Demo",
    description:
      "A test bench needs to exchange two values of various types. Write a function template swapValues<T> that swaps its two reference parameters, then use it to swap a pair of integers and a pair of doubles read from input.\n\nInput Format:\nLine 1: two integers a and b.\nLine 2: two doubles x and y.\n\nOutput Format:\nInts after swap: <b> <a>\nDoubles after swap: <y> <x> with 1 decimal each\n\nConstraints:\n-10000 <= integers <= 10000, -10000.0 <= doubles <= 10000.0",
    difficulty: "medium",
    maxscore: 20,
    topic: "Templates and STL",
    subtopic: "Function Templates",
    inputconstrains: "-10000 <= integers <= 10000, -10000.0 <= doubles <= 10000.0",
    sampleinput1: "3 9\n1.5 2.5",
    sampleinput2: "-1 -2\n-0.5 -1.5",
    input1: "10 10\n3.3 3.3",
    input2: "0 100\n0.1 100.1",
    input3: "7 -7\n7.7 -7.7",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
using namespace std;

template <class T>
void swapValues(T &a, T &b) {
    T temp = a;
    a = b;
    b = temp;
}

int main() {
    int i1, i2;
    double d1, d2;
    cin >> i1 >> i2 >> d1 >> d2;
    swapValues(i1, i2);
    swapValues(d1, d2);
    cout << "Ints after swap: " << i1 << " " << i2 << endl;
    cout << fixed << setprecision(1);
    cout << "Doubles after swap: " << d1 << " " << d2 << endl;
    return 0;
}`,
    blacklist: "struct, printf",
    whitelist: "template, swapValues",
  },
  {
    title: "Office Phone Directory Lookup",
    description:
      "An office reception keeps a phone directory in a map<string, long long>. Read N name-number pairs, report how many contacts were loaded, then answer Q lookup queries: print the number if the name exists, otherwise print Not found.\n\nInput Format:\nLine 1: integer N.\nNext N lines: a name (single word) and a phone number (integer).\nNext line: integer Q.\nNext Q lines: one name per line to look up.\n\nOutput Format:\nFirst line: Contacts loaded: <N>\nFor each query in order: the phone number, or Not found if the name is absent.\n\nConstraints:\n1 <= N <= 500, 0 <= Q <= 200, names are distinct single words of at most 20 letters, numbers fit in a long long",
    difficulty: "medium",
    maxscore: 20,
    topic: "Templates and STL",
    subtopic: "Map",
    inputconstrains: "1 <= N <= 500, 0 <= Q <= 200, names are distinct single words of at most 20 letters, numbers fit in a long long",
    sampleinput1: "3\nriya 9876543210\narjun 9123456780\nsam 9090909090\n2\nriya\nzoya",
    sampleinput2: "2\namy 1112223333\nbob 4445556666\n1\nbob",
    input1: "2\namy 1112223333\nbob 4445556666\n0",
    input2: "4\nravi 1000000000\npriya 9999999999\nvijay 123456789\nlena 987654321\n3\npriya\nlena\nramesh",
    input3: "1\nonly 55555\n2\nonly\nonly",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <map>
#include <string>
using namespace std;

int main() {
    int n;
    cin >> n;
    map<string, long long> directory;
    for (int i = 0; i < n; i++) {
        string name;
        long long number;
        cin >> name >> number;
        directory[name] = number;
    }
    cout << "Contacts loaded: " << n << endl;
    int q;
    cin >> q;
    for (int i = 0; i < q; i++) {
        string name;
        cin >> name;
        map<string, long long>::iterator it = directory.find(name);
        if (it != directory.end()) {
            cout << it->second << endl;
        } else {
            cout << "Not found" << endl;
        }
    }
    return 0;
}`,
    blacklist: "printf, struct, unordered_map",
    whitelist: "map, find, string",
  },

  // ------------------------------------------------------------------- hard
  {
    title: "Gradebook Average Analyzer",
    description:
      "A teacher maintains a gradebook keyed by student name. Read N (name, mark) pairs, collecting each student's marks into a vector<int> inside a map<string, vector<int>>. Then print every student's name in alphabetical order followed by the average of that student's marks with exactly 2 decimals.\n\nInput Format:\nLine 1: integer N.\nNext N lines: a name (single word) and an integer mark.\n\nOutput Format:\nFor every distinct name in alphabetical order: <name>: <average with 2 decimals>\n\nConstraints:\n1 <= N <= 1000, 0 <= mark <= 100, names are single words of at most 20 letters, every name has at least one mark",
    difficulty: "hard",
    maxscore: 30,
    topic: "Templates and STL",
    subtopic: "Map",
    inputconstrains: "1 <= N <= 1000, 0 <= mark <= 100, names are single words of at most 20 letters",
    sampleinput1: "5\nriya 80\narjun 90\nriya 70\narjun 95\nsam 60",
    sampleinput2: "2\nom 100\nom 50",
    input1: "3\nb 10\na 10\nc 10",
    input2: "4\nz 0\nz 100\nz 50\nz 50",
    input3: "6\nx 40\ny 60\nx 80\ny 20\nx 60\ny 40",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <map>
#include <vector>
#include <string>
#include <iomanip>
using namespace std;

int main() {
    int n;
    cin >> n;
    map<string, vector<int> > gradebook;
    for (int i = 0; i < n; i++) {
        string name;
        int mark;
        cin >> name >> mark;
        gradebook[name].push_back(mark);
    }
    cout << fixed << setprecision(2);
    for (const pair<const string, vector<int> > &entry : gradebook) {
        const vector<int> &marks = entry.second;
        long long total = 0;
        for (int i = 0; i < (int)marks.size(); i++) {
            total += marks[i];
        }
        double avg = (double)total / marks.size();
        cout << entry.first << ": " << avg << endl;
    }
    return 0;
}`,
    blacklist: "printf, struct, unordered_map",
    whitelist: "map, vector, fixed",
  },
  {
    title: "Exam Score Leaderboard Stats",
    description:
      "An exam portal stores every player's score and builds statistics from a frequency map. Read N scores into a map<int, int> mapping each score to how many players achieved it. Print the total number of players, the full score table in ascending score order (score then count), and the most common score — if several scores tie on count, choose the smaller score.\n\nInput Format:\nLine 1: integer N.\nLine 2: N integer scores.\n\nOutput Format:\nTotal players: <N>\nScores in order:\n<score> <count> for each distinct score in ascending order\nMost common score: <score with the highest count, smallest score on ties>\n\nConstraints:\n1 <= N <= 1000, 0 <= score <= 100",
    difficulty: "hard",
    maxscore: 30,
    topic: "Templates and STL",
    subtopic: "Map",
    inputconstrains: "1 <= N <= 1000, 0 <= score <= 100",
    sampleinput1: "6\n85 90 85 70 90 85",
    sampleinput2: "5\n50 60 50 60 70",
    input1: "1\n99",
    input2: "4\n10 20 30 40",
    input3: "8\n77 77 77 77 88 88 99 88",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <map>
using namespace std;

int main() {
    int n;
    cin >> n;
    map<int, int> freq;
    for (int i = 0; i < n; i++) {
        int s;
        cin >> s;
        freq[s]++;
    }
    cout << "Total players: " << n << endl;
    cout << "Scores in order:" << endl;
    int bestScore = -1;
    int bestCount = 0;
    for (pair<const int, int> p : freq) {
        cout << p.first << " " << p.second << endl;
        if (p.second > bestCount) {
            bestCount = p.second;
            bestScore = p.first;
        }
    }
    cout << "Most common score: " << bestScore << endl;
    return 0;
}`,
    blacklist: "printf, struct, unordered_map",
    whitelist: "map, cout",
  },
  {
    title: "Lab Stats Template Reporter",
    description:
      "A calibration lab feeds the same batch size to two instruments: one reports integers, the other reports doubles. Write a class template Stats<T> that stores values in a vector<T> and can report the minimum, maximum and mean. Read N integers followed by N doubles, feed them to Stats<int> and Stats<double>, and print both reports.\n\nInput Format:\nLine 1: integer N.\nLine 2: N integers.\nLine 3: N doubles.\n\nOutput Format:\nInt stats:\nMin: <minimum>\nMax: <maximum>\nMean: <mean with 2 decimals>\nDouble stats:\nMin: <minimum, 2 decimals>\nMax: <maximum, 2 decimals>\nMean: <mean with 2 decimals>\n\nConstraints:\n1 <= N <= 1000, integers in [-100000, 100000], doubles with at most 2 decimal places in [-100000.0, 100000.0]",
    difficulty: "hard",
    maxscore: 30,
    topic: "Templates and STL",
    subtopic: "Class Templates",
    inputconstrains: "1 <= N <= 1000, integers in [-100000, 100000], doubles with at most 2 decimal places in [-100000.0, 100000.0]",
    sampleinput1: "3\n1 5 3\n1.5 2.5 3.5",
    sampleinput2: "2\n-4 4\n-2.25 2.25",
    input1: "1\n7\n7.7",
    input2: "4\n10 10 10 10\n0.1 0.2 0.3 0.4",
    input3: "5\n9 1 8 2 5\n9.9 1.1 8.8 2.2 5.5",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <vector>
#include <iomanip>
using namespace std;

template <class T>
class Stats {
    vector<T> data;
public:
    void add(T v) {
        data.push_back(v);
    }
    T getMin() {
        T m = data[0];
        for (int i = 1; i < (int)data.size(); i++) {
            if (data[i] < m) m = data[i];
        }
        return m;
    }
    T getMax() {
        T m = data[0];
        for (int i = 1; i < (int)data.size(); i++) {
            if (data[i] > m) m = data[i];
        }
        return m;
    }
    double getMean() {
        double sum = 0;
        for (int i = 0; i < (int)data.size(); i++) {
            sum += data[i];
        }
        return sum / data.size();
    }
};

int main() {
    int n;
    cin >> n;
    Stats<int> si;
    Stats<double> sd;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        si.add(x);
    }
    for (int i = 0; i < n; i++) {
        double x;
        cin >> x;
        sd.add(x);
    }
    cout << "Int stats:" << endl;
    cout << "Min: " << si.getMin() << endl;
    cout << "Max: " << si.getMax() << endl;
    cout << fixed << setprecision(2);
    cout << "Mean: " << si.getMean() << endl;
    cout << "Double stats:" << endl;
    cout << "Min: " << sd.getMin() << endl;
    cout << "Max: " << sd.getMax() << endl;
    cout << "Mean: " << sd.getMean() << endl;
    return 0;
}`,
    blacklist: "printf, struct",
    whitelist: "template, vector, fixed",
  },
  {
    title: "Card Number Query Pipeline",
    description:
      "A library issues card numbers, sometimes with re-issues that create duplicates. Read N card numbers, build a sorted list of distinct numbers using sort followed by unique (with erase), and answer Q queries. For each query value, use lower_bound: print Position <i> (0-based index in the distinct list) if the value exists, otherwise print absent.\n\nInput Format:\nLine 1: integer N.\nLine 2: N integers (card numbers, duplicates possible).\nLine 3: integer Q.\nLine 4: Q query values.\n\nOutput Format:\nFirst line: Unique cards: <number of distinct values>\nFor each query in order: Position <0-based index> or absent\n\nConstraints:\n1 <= N <= 1000, 0 <= Q <= 500, -100000 <= value <= 100000",
    difficulty: "hard",
    maxscore: 30,
    topic: "Templates and STL",
    subtopic: "STL Algorithms",
    inputconstrains: "1 <= N <= 1000, 0 <= Q <= 500, -100000 <= value <= 100000",
    sampleinput1: "6\n40 10 40 20 10 30\n3\n10\n30\n50",
    sampleinput2: "4\n5 5 5 5\n2\n5\n6",
    input1: "5\n100 3 100 3 7\n4\n3\n7\n100\n101",
    input2: "3\n9 1 5\n0",
    input3: "7\n-2 -2 0 -2 4 4 8\n3\n-2\n4\n-3",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> v;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        v.push_back(x);
    }
    sort(v.begin(), v.end());
    v.erase(unique(v.begin(), v.end()), v.end());
    cout << "Unique cards: " << v.size() << endl;
    int q;
    cin >> q;
    for (int i = 0; i < q; i++) {
        int query;
        cin >> query;
        vector<int>::iterator it = lower_bound(v.begin(), v.end(), query);
        if (it != v.end() && *it == query) {
            cout << "Position " << (it - v.begin()) << endl;
        } else {
            cout << "absent" << endl;
        }
    }
    return 0;
}`,
    blacklist: "printf, struct, unordered_map",
    whitelist: "vector, sort(, unique(, lower_bound(",
  },
];

export const mcqs = [
  // ------------------------------------------------------------------ easy
  {
    title: "What a Template Is",
    description: "In C++, what exactly is a template?",
    difficulty: "easy",
    topic: "Templates and STL",
    subtopic: "Function Templates",
    Option1: "A blueprint the compiler uses to generate functions or classes for many types",
    Option2: "A data structure that stores values in sorted order",
    Option3: "A header file with prewritten functions",
    Option4: "A variable that can change its type at runtime",
    CorrectOption: 1,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Meaning of template <class T>",
    description: "In the line template <class T> written before a function, what does T stand for?",
    difficulty: "easy",
    topic: "Templates and STL",
    subtopic: "Function Templates",
    Option1: "The total number of parameters the function takes",
    Option2: "A placeholder type that is filled in when the template is used",
    Option3: "The template's return value",
    Option4: "A fixed type named T defined in the standard library",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Vector Versus Array Sizing",
    description: "Which statement about std::vector compared to a plain array is true?",
    difficulty: "easy",
    topic: "Templates and STL",
    subtopic: "Vector",
    Option1: "A vector's size is fixed at creation just like an array",
    Option2: "A vector can grow and shrink at runtime while an array's size is fixed",
    Option3: "A vector stores its elements as a linked list of nodes",
    Option4: "Arrays can be resized but vectors cannot",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "What push_back Does",
    description: "What does v.push_back(10) do to a vector<int> named v?",
    difficulty: "easy",
    topic: "Templates and STL",
    subtopic: "Vector",
    Option1: "Inserts 10 at the front and shifts all elements",
    Option2: "Replaces the last element with 10",
    Option3: "Appends 10 at the end and increases the size by one",
    Option4: "Removes the element with value 10",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Set Storage Rule",
    description: "Which statement best describes std::set<int>?",
    difficulty: "easy",
    topic: "Templates and STL",
    subtopic: "Set",
    Option1: "It stores duplicates in insertion order",
    Option2: "It stores unique elements sorted in ascending order automatically",
    Option3: "It stores key-value pairs with fast lookup by key",
    Option4: "It stores elements in last-in-first-out order",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Map Key Value Pairing",
    description: "How is data organised inside a std::map<K, V>?",
    difficulty: "easy",
    topic: "Templates and STL",
    subtopic: "Map",
    Option1: "Each value can be reached from many unsorted keys",
    Option2: "Elements are stored as a plain unsorted list of pairs",
    Option3: "Each key maps to one value and keys stay sorted ascending",
    Option4: "Keys and values are merged into one string per entry",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Header That Provides sort",
    description: "Which header must be included to use std::sort?",
    difficulty: "easy",
    topic: "Templates and STL",
    subtopic: "STL Algorithms",
    Option1: "<vector>",
    Option2: "<iostream>",
    Option3: "<string>",
    Option4: "<algorithm>",
    CorrectOption: 4,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Header That Provides vector",
    description: "Which header must be included to use std::vector?",
    difficulty: "easy",
    topic: "Templates and STL",
    subtopic: "Vector",
    Option1: "<vector>",
    Option2: "<algorithm>",
    Option3: "<set>",
    Option4: "<cstdio>",
    CorrectOption: 1,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Class Template Meaning",
    description: "Box<int> and Box<double> are created from one class template Box<T>. What does this mean?",
    difficulty: "easy",
    topic: "Templates and STL",
    subtopic: "Class Templates",
    Option1: "The compiler generates two separate classes, one holding int and one holding double",
    Option2: "Box<int> automatically converts all stored values to double",
    Option3: "Box must be rewritten by hand for every new type",
    Option4: "Box<int> and Box<double> are the same class because T is just a name",
    CorrectOption: 1,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Container size Method",
    description: "For v a vector, s a set and m a map, what does calling size() return?",
    difficulty: "easy",
    topic: "Templates and STL",
    subtopic: "Set",
    Option1: "The memory used in bytes",
    Option2: "The number of elements currently stored",
    Option3: "The maximum capacity allowed",
    Option4: "The number of duplicate elements rejected so far",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },

  // ----------------------------------------------------------------- medium
  {
    title: "Vector push_back and back Output",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "Templates and STL",
    subtopic: "Vector",
    Option1: "3 2",
    Option2: "2 2",
    Option3: "3 9",
    Option4: "2 9",
    CorrectOption: 1,
    codesnippet: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<int> v;
    v.push_back(5);
    v.push_back(9);
    v.push_back(2);
    cout << v.size() << " " << v.back();
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    vector<int> v;\n    v.push_back(5);\n    v.push_back(9);\n    v.push_back(2);\n    cout << v.size() << " " << v.back();\n    return 0;\n}`,
      stdin: "",
      expected: "3 2",
    },
  },
  {
    title: "Set Dedupe Size and Smallest",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "Templates and STL",
    subtopic: "Set",
    Option1: "4 1",
    Option2: "3 3",
    Option3: "4 3",
    Option4: "3 1",
    CorrectOption: 4,
    codesnippet: `#include <iostream>
#include <set>
using namespace std;
int main() {
    set<int> s;
    s.insert(3);
    s.insert(1);
    s.insert(3);
    s.insert(2);
    cout << s.size() << " " << *s.begin();
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\n#include <set>\nusing namespace std;\nint main() {\n    set<int> s;\n    s.insert(3);\n    s.insert(1);\n    s.insert(3);\n    s.insert(2);\n    cout << s.size() << " " << *s.begin();\n    return 0;\n}`,
      stdin: "",
      expected: "3 1",
    },
  },
  {
    title: "Map Size After Reassign",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "Templates and STL",
    subtopic: "Map",
    Option1: "3 7",
    Option2: "2 3",
    Option3: "2 7",
    Option4: "3 10",
    CorrectOption: 3,
    codesnippet: `#include <iostream>
#include <map>
#include <string>
using namespace std;
int main() {
    map<string, int> m;
    m["apple"] = 3;
    m["banana"] = 5;
    m["apple"] = 7;
    cout << m.size() << " " << m["apple"];
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\n#include <map>\n#include <string>\nusing namespace std;\nint main() {\n    map<string, int> m;\n    m["apple"] = 3;\n    m["banana"] = 5;\n    m["apple"] = 7;\n    cout << m.size() << " " << m["apple"];\n    return 0;\n}`,
      stdin: "",
      expected: "2 7",
    },
  },
  {
    title: "Template twice Call Output",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "Templates and STL",
    subtopic: "Function Templates",
    Option1: "8 3",
    Option2: "8 3.0",
    Option3: "16 3",
    Option4: "8 15",
    CorrectOption: 1,
    codesnippet: `#include <iostream>
using namespace std;
template <class T>
T twice(T x) {
    return x + x;
}
int main() {
    cout << twice(4) << " " << twice(1.5);
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\ntemplate <class T>\nT twice(T x) {\n    return x + x;\n}\nint main() {\n    cout << twice(4) << " " << twice(1.5);\n    return 0;\n}`,
      stdin: "",
      expected: "8 3",
    },
  },
  {
    title: "Template Instantiation Explained",
    description: "maxValue is a function template. In one program it is called once with two ints and once with two doubles. What happens at compile time?",
    difficulty: "medium",
    topic: "Templates and STL",
    subtopic: "Function Templates",
    Option1: "One function is generated that converts every argument to double",
    Option2: "The compiler generates two separate functions, one for int and one for double",
    Option3: "The program fails to link because T is unknown at compile time",
    Option4: "Both calls share one function that checks types at runtime",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Container Choice for Word Counts",
    description: "A program must count how many times each word appears in a chat log and later print every word alphabetically with its count. Which STL container fits best?",
    difficulty: "medium",
    topic: "Templates and STL",
    subtopic: "Map",
    Option1: "vector<string>",
    Option2: "set<string>",
    Option3: "map<string, int>",
    Option4: "stack<string>",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },

  // ------------------------------------------------------------------- hard
  {
    title: "Map Bracket Creates Entry",
    description: "What does this program print? Remember what map's operator[] does when the key is missing.",
    difficulty: "hard",
    topic: "Templates and STL",
    subtopic: "Map",
    Option1: "0 0 0",
    Option2: "0 0 1",
    Option3: "1 0 1",
    Option4: "0 7 1",
    CorrectOption: 2,
    codesnippet: `#include <iostream>
#include <map>
using namespace std;
int main() {
    map<int, int> m;
    int before = m.size();
    int x = m[7];
    int after = m.size();
    cout << before << " " << x << " " << after;
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\n#include <map>\nusing namespace std;\nint main() {\n    map<int, int> m;\n    int before = m.size();\n    int x = m[7];\n    int after = m.size();\n    cout << before << " " << x << " " << after;\n    return 0;\n}`,
      stdin: "",
      expected: "0 0 1",
    },
  },
  {
    title: "Set Repeated Inserts Result",
    description: "What does this program print?",
    difficulty: "hard",
    topic: "Templates and STL",
    subtopic: "Set",
    Option1: "4 4 5",
    Option2: "2 5 4",
    Option3: "2 4 5",
    Option4: "1 4 4",
    CorrectOption: 3,
    codesnippet: `#include <iostream>
#include <set>
using namespace std;
int main() {
    set<int> s;
    s.insert(4);
    s.insert(4);
    s.insert(4);
    s.insert(5);
    cout << s.size() << " " << *s.begin() << " " << *s.rbegin();
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\n#include <set>\nusing namespace std;\nint main() {\n    set<int> s;\n    s.insert(4);\n    s.insert(4);\n    s.insert(4);\n    s.insert(5);\n    cout << s.size() << " " << *s.begin() << " " << *s.rbegin();\n    return 0;\n}`,
      stdin: "",
      expected: "2 4 5",
    },
  },
  {
    title: "Remove Erase Idiom Output",
    description: "What does this program print? remove shifts kept elements forward and returns the new logical end; erase then cuts the tail off.",
    difficulty: "hard",
    topic: "Templates and STL",
    subtopic: "Vector",
    Option1: "3 142",
    Option2: "2 14",
    Option3: "2 12",
    Option4: "4 1424",
    CorrectOption: 3,
    codesnippet: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int main() {
    vector<int> v;
    v.push_back(1);
    v.push_back(4);
    v.push_back(2);
    v.push_back(4);
    v.erase(remove(v.begin(), v.end(), 4), v.end());
    cout << v.size() << " " << v[0] << v[1];
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    vector<int> v;\n    v.push_back(1);\n    v.push_back(4);\n    v.push_back(2);\n    v.push_back(4);\n    v.erase(remove(v.begin(), v.end(), 4), v.end());\n    cout << v.size() << " " << v[0] << v[1];\n    return 0;\n}`,
      stdin: "",
      expected: "2 12",
    },
  },
  {
    title: "Why Vector Growth Breaks Iterators",
    description: "A program keeps an iterator into a vector, then a push_back triggers a reallocation. Why is the old iterator now unsafe to use?",
    difficulty: "hard",
    topic: "Templates and STL",
    subtopic: "Vector",
    Option1: "Iterators are deleted objects after any push_back call",
    Option2: "Reallocation may move all elements to a new memory block, so the old iterator points into freed memory",
    Option3: "The iterator's index value is reset to zero by push_back",
    Option4: "Vectors reverse the order of their elements whenever they grow",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
];
