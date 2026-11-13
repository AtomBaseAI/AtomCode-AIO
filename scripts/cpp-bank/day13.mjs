/**
 * OOPS using CPP — Day 13: Constructors and Destructors
 * 20 code questions (10 easy: 6 basics + 4 real-world, 6 medium, 4 hard)
 * 20 MCQs (10 easy, 6 medium, 4 hard)
 * All solutions are fresh C++ written for this course (no conversions).
 */
export const meta = {
  day: 13,
  topic: "Constructors and Destructors",
};

export const code = [
  // ------------------------------------------------------------------ easy
  {
    title: "Gadget Constructor Alarm",
    description:
      "An electronics lab logs every gadget that is powered on. Define a class Gadget with a default constructor that prints 'Gadget created' every time an object is built. Read N, build N Gadget objects one by one (for example inside a loop), and after all objects have been created print a final ready line.\n\nInput Format:\nOne line with one integer: N, the number of gadget objects to create.\n\nOutput Format:\n<Gadget created printed N times, one per line>\nLab ready\n\nConstraints:\n1 <= N <= 5",
    difficulty: "easy",
    maxscore: 10,
    topic: "Constructors and Destructors",
    subtopic: "Default Constructor",
    inputconstrains: "1 <= N <= 5",
    sampleinput1: "2",
    sampleinput2: "4",
    input1: "1",
    input2: "5",
    input3: "3",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class Gadget {
public:
    Gadget() {
        cout << "Gadget created" << endl;
    }
};

int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) {
        Gadget g;
    }
    cout << "Lab ready" << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Parameterized Rectangle Build",
    description:
      "A drafting app stores a rectangle inside a class. Define a class Rect with a parameterized constructor that takes the width and height and stores them in members, and a display() member function that prints the dimensions and the area. Read width and height, construct the object with them, then call display().\n\nInput Format:\nOne line with two integers: width and height.\n\nOutput Format:\nRect: <width> x <height>\nArea: <width * height>\n\nConstraints:\n1 <= width, height <= 1000",
    difficulty: "easy",
    maxscore: 10,
    topic: "Constructors and Destructors",
    subtopic: "Parameterized Constructor",
    inputconstrains: "1 <= width, height <= 1000",
    sampleinput1: "5 4",
    sampleinput2: "12 9",
    input1: "1 1",
    input2: "7 3",
    input3: "100 25",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class Rect {
    int width;
    int height;
public:
    Rect(int w, int h) {
        width = w;
        height = h;
    }
    void display() {
        cout << "Rect: " << width << " x " << height << endl;
        cout << "Area: " << width * height << endl;
    }
};

int main() {
    int w, h;
    cin >> w >> h;
    Rect r(w, h);
    r.display();
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Object Destroyed Trace",
    description:
      "A lab tracker watches exactly when an object stops living. Define a class Visitor whose parameterized constructor prints 'Object <id> created' and whose destructor prints 'Object <id> destroyed'. In main, read the id, create the Visitor object inside an inner block, print 'Scope active' while it is alive, and print 'Scope ended' after the block closes so the destructor timing is visible.\n\nInput Format:\nOne line with one integer: id.\n\nOutput Format:\nObject <id> created\nScope active\nObject <id> destroyed\nScope ended\n\nConstraints:\n1 <= id <= 999",
    difficulty: "easy",
    maxscore: 10,
    topic: "Constructors and Destructors",
    subtopic: "Destructor",
    inputconstrains: "1 <= id <= 999",
    sampleinput1: "7",
    sampleinput2: "42",
    input1: "1",
    input2: "99",
    input3: "100",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class Visitor {
    int id;
public:
    Visitor(int i) {
        id = i;
        cout << "Object " << id << " created" << endl;
    }
    ~Visitor() {
        cout << "Object " << id << " destroyed" << endl;
    }
};

int main() {
    int id;
    cin >> id;
    {
        Visitor v(id);
        cout << "Scope active" << endl;
    }
    cout << "Scope ended" << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Student Constructor Report",
    description:
      "An exam cell builds a Student object from raw data the moment it arrives. Define a class Student with a parameterized constructor that takes a name (single word) and a mark (integer) and stores them, and a display() function that prints the student, the mark and the result (Pass when the mark is at least 50, otherwise Fail).\n\nInput Format:\nOne line with two tokens: name (single word) and mark (integer).\n\nOutput Format:\nStudent: <name>\nMark: <mark>\nResult: <Pass or Fail>\n\nConstraints:\n0 <= mark <= 100",
    difficulty: "easy",
    maxscore: 10,
    topic: "Constructors and Destructors",
    subtopic: "Parameterized Constructor",
    inputconstrains: "0 <= mark <= 100",
    sampleinput1: "Anita 82",
    sampleinput2: "Vikram 38",
    input1: "Meera 50",
    input2: "Om 0",
    input3: "Zoya 99",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

class Student {
    string name;
    int mark;
public:
    Student(string n, int m) {
        name = n;
        mark = m;
    }
    void display() {
        cout << "Student: " << name << endl;
        cout << "Mark: " << mark << endl;
        if (mark >= 50) {
            cout << "Result: Pass" << endl;
        } else {
            cout << "Result: Fail" << endl;
        }
    }
};

int main() {
    string name;
    int mark;
    cin >> name >> mark;
    Student s(name, mark);
    s.display();
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Two Objects Teardown Order",
    description:
      "A stage manager builds two scene objects and then watches the cleanup order at the end of the act. Define a class Step whose constructor prints 'Construct <tag>' and whose destructor prints 'Destruct <tag>'. Read two tags (single words), create the first object, then the second, print 'Both objects alive', and let main end so both destructors run automatically.\n\nInput Format:\nOne line with two words separated by a space: tag1 and tag2.\n\nOutput Format:\nConstruct <tag1>\nConstruct <tag2>\nBoth objects alive\nDestruct <tag2>\nDestruct <tag1>\n\nConstraints:\nEach tag is a single word of at most 10 characters.",
    difficulty: "easy",
    maxscore: 10,
    topic: "Constructors and Destructors",
    subtopic: "Destructor",
    inputconstrains: "Each tag is a single word of at most 10 characters",
    sampleinput1: "open close",
    sampleinput2: "alpha beta",
    input1: "sun moon",
    input2: "p q",
    input3: "one two",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

class Step {
    string tag;
public:
    Step(string t) {
        tag = t;
        cout << "Construct " << tag << endl;
    }
    ~Step() {
        cout << "Destruct " << tag << endl;
    }
};

int main() {
    string t1, t2;
    cin >> t1 >> t2;
    Step a(t1);
    Step b(t2);
    cout << "Both objects alive" << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Initialization List Config",
    description:
      "A service loads its configuration through a constructor initialization list. Define a class Config with members id (int) and tag (string) and a constructor written as Config(int i, string t) : id(i), tag(t) that prints 'Config ready'. Add a show() function that prints both fields. Read the id and tag, build the object and call show().\n\nInput Format:\nOne line with two tokens: id (integer) and tag (single word).\n\nOutput Format:\nConfig ready\nID: <id>\nTag: <tag>\n\nConstraints:\n1 <= id <= 1000",
    difficulty: "easy",
    maxscore: 10,
    topic: "Constructors and Destructors",
    subtopic: "Initialization Lists",
    inputconstrains: "1 <= id <= 1000",
    sampleinput1: "7 fast",
    sampleinput2: "12 beta",
    input1: "1 alpha",
    input2: "100 z9",
    input3: "42 core",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

class Config {
    int id;
    string tag;
public:
    Config(int i, string t) : id(i), tag(t) {
        cout << "Config ready" << endl;
    }
    void show() {
        cout << "ID: " << id << endl;
        cout << "Tag: " << tag << endl;
    }
};

int main() {
    int id;
    string tag;
    cin >> id >> tag;
    Config c(id, tag);
    c.show();
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Smart Lamp Lifecycle",
    description:
      "A building checker walks through rooms switching lamps on and off. Define a class Lamp whose default constructor prints 'Lamp on' and whose destructor prints 'Lamp off'. Read N, and for each room i from 1 to N create one Lamp object inside the loop body, print 'Room <i> visited', and let the object expire at the end of that iteration. After all rooms print 'All rooms checked'.\n\nInput Format:\nOne line with one integer: N.\n\nOutput Format:\nFor each room i: Lamp on, then Room <i> visited, then Lamp off on three lines. After the last room: All rooms checked\n\nConstraints:\n1 <= N <= 5",
    difficulty: "easy",
    maxscore: 10,
    topic: "Constructors and Destructors",
    subtopic: "Default Constructor",
    inputconstrains: "1 <= N <= 5",
    sampleinput1: "1",
    sampleinput2: "3",
    input1: "2",
    input2: "5",
    input3: "4",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class Lamp {
public:
    Lamp() {
        cout << "Lamp on" << endl;
    }
    ~Lamp() {
        cout << "Lamp off" << endl;
    }
};

int main() {
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        Lamp lamp;
        cout << "Room " << i << " visited" << endl;
    }
    cout << "All rooms checked" << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Concert Ticket Booking",
    description:
      "A booking desk issues tickets as objects. Define a class Ticket with a parameterized constructor taking the event name (single word) and seat number (integer); the constructor prints 'Ticket booked for seat <seat>' as soon as the object exists. Add a print() function that outputs the full ticket. Read the event and seat, build the ticket, then call print().\n\nInput Format:\nOne line with two tokens: event (single word) and seat (integer).\n\nOutput Format:\nTicket booked for seat <seat>\nEvent: <event>\nSeat: <seat>\nStatus: CONFIRMED\n\nConstraints:\n1 <= seat <= 500",
    difficulty: "easy",
    maxscore: 10,
    topic: "Constructors and Destructors",
    subtopic: "Parameterized Constructor",
    inputconstrains: "1 <= seat <= 500",
    sampleinput1: "RockShow 14",
    sampleinput2: "DanceNight 101",
    input1: "Play 1",
    input2: "Concert 500",
    input3: "Opera 42",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

class Ticket {
    string event;
    int seat;
public:
    Ticket(string e, int s) {
        event = e;
        seat = s;
        cout << "Ticket booked for seat " << seat << endl;
    }
    void print() {
        cout << "Event: " << event << endl;
        cout << "Seat: " << seat << endl;
        cout << "Status: CONFIRMED" << endl;
    }
};

int main() {
    string event;
    int seat;
    cin >> event >> seat;
    Ticket t(event, seat);
    t.print();
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Stopwatch Session Trace",
    description:
      "A productivity app starts a stopwatch object and stops it automatically when the object dies at the end of the block. Define a class Timer whose parameterized constructor takes the duration in minutes and prints 'Timer started for <m> minutes', and whose destructor prints 'Timer stopped'. Read the minutes, create the Timer object, print 'Task running', and end the program so the destructor runs.\n\nInput Format:\nOne line with one integer: minutes.\n\nOutput Format:\nTimer started for <minutes> minutes\nTask running\nTimer stopped\n\nConstraints:\n1 <= minutes <= 120",
    difficulty: "easy",
    maxscore: 10,
    topic: "Constructors and Destructors",
    subtopic: "Destructor",
    inputconstrains: "1 <= minutes <= 120",
    sampleinput1: "25",
    sampleinput2: "5",
    input1: "1",
    input2: "60",
    input3: "45",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class Timer {
    int minutes;
public:
    Timer(int m) {
        minutes = m;
        cout << "Timer started for " << minutes << " minutes" << endl;
    }
    ~Timer() {
        cout << "Timer stopped" << endl;
    }
};

int main() {
    int m;
    cin >> m;
    Timer t(m);
    cout << "Task running" << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Bank Account Opening",
    description:
      "A bank console opens an account as an object built from customer data. Define a class BankAccount with a parameterized constructor that takes the holder name (single word) and the opening balance (a double) and stores them, plus a display() function that prints the account details with the balance shown to exactly two decimal places.\n\nInput Format:\nOne line with two tokens: holder name (single word) and balance (a double).\n\nOutput Format:\nAccount opened\nHolder: <holder>\nBalance: <balance with 2 decimals>\n\nConstraints:\n0 <= balance <= 1000000",
    difficulty: "easy",
    maxscore: 10,
    topic: "Constructors and Destructors",
    subtopic: "Parameterized Constructor",
    inputconstrains: "0 <= balance <= 1000000",
    sampleinput1: "Ravi 5000",
    sampleinput2: "Sana 1500.5",
    input1: "Asha 0",
    input2: "Kabir 99999.99",
    input3: "Nina 250.25",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
#include <iomanip>
using namespace std;

class BankAccount {
    string holder;
    double balance;
public:
    BankAccount(string h, double b) {
        holder = h;
        balance = b;
    }
    void display() {
        cout << "Account opened" << endl;
        cout << "Holder: " << holder << endl;
        cout << fixed << setprecision(2) << "Balance: " << balance << endl;
    }
};

int main() {
    string holder;
    double balance;
    cin >> holder >> balance;
    BankAccount acc(holder, balance);
    acc.display();
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },

  // ----------------------------------------------------------------- medium
  {
    title: "Box Constructor Selector",
    description:
      "A packaging unit builds boxes with three overloaded constructors: a default constructor for a 1 x 1 x 1 box, a one-argument constructor for a cube, and a two-argument constructor for a flat box whose height is fixed at 1. Each constructor prints a line announcing which one was used. Read a mode k and the matching dimensions, construct exactly one Box object, then print its volume.\n\nInput Format:\nThe first integer k is the constructor mode: 0, 1 or 2. If k is 1, one more integer s (side) follows. If k is 2, two more integers l and w follow. If k is 0, nothing follows.\n\nOutput Format:\nFor k=0: Default constructor: 1 x 1 x 1 then Volume: 1\nFor k=1: Cube constructor: <s> x <s> x <s> then Volume: <s*s*s>\nFor k=2: Box constructor: <l> x <w> x 1 then Volume: <l*w>\n\nConstraints:\nk is 0, 1 or 2; 1 <= s, l, w <= 100",
    difficulty: "medium",
    maxscore: 20,
    topic: "Constructors and Destructors",
    subtopic: "Constructor Overloading",
    inputconstrains: "k is 0, 1 or 2; 1 <= s, l, w <= 100",
    sampleinput1: "2 3 4",
    sampleinput2: "1 5",
    input1: "0",
    input2: "1 7",
    input3: "2 10 20",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class Box {
    int a, b, c;
public:
    Box() : a(1), b(1), c(1) {
        cout << "Default constructor: 1 x 1 x 1" << endl;
    }
    Box(int s) : a(s), b(s), c(s) {
        cout << "Cube constructor: " << s << " x " << s << " x " << s << endl;
    }
    Box(int l, int w) : a(l), b(w), c(1) {
        cout << "Box constructor: " << l << " x " << w << " x 1" << endl;
    }
    void volume() {
        cout << "Volume: " << a * b * c << endl;
    }
};

int main() {
    int k;
    cin >> k;
    if (k == 0) {
        Box b;
        b.volume();
    } else if (k == 1) {
        int s;
        cin >> s;
        Box b(s);
        b.volume();
    } else {
        int l, w;
        cin >> l >> w;
        Box b(l, w);
        b.volume();
    }
    return 0;
}`,
    blacklist: "printf",
    whitelist: "class, public, if",
  },
  {
    title: "By-Value Argument Copy Trace",
    description:
      "A telemetry service passes a Counter object to a function by value, and every copy made must be traced. Define a class Counter with a parameterized constructor printing 'Created counter <v>', a copy constructor printing 'Copied counter <v>', a destructor printing 'Destroyed counter <v>', and a show() function printing 'Value: <v>'. Read v, build the Counter, then call a function that takes the Counter by value twice, and finally print 'Done'.\n\nInput Format:\nOne line with one integer: v.\n\nOutput Format:\nCreated counter <v>\nCopied counter <v>\nValue: <v>\nDestroyed counter <v>\nCopied counter <v>\nValue: <v>\nDestroyed counter <v>\nDone\nDestroyed counter <v>\n\nConstraints:\n1 <= v <= 100",
    difficulty: "medium",
    maxscore: 20,
    topic: "Constructors and Destructors",
    subtopic: "Copy Constructor",
    inputconstrains: "1 <= v <= 100",
    sampleinput1: "5",
    sampleinput2: "42",
    input1: "1",
    input2: "100",
    input3: "7",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class Counter {
    int value;
public:
    Counter(int v) {
        value = v;
        cout << "Created counter " << value << endl;
    }
    Counter(const Counter &other) {
        value = other.value;
        cout << "Copied counter " << value << endl;
    }
    ~Counter() {
        cout << "Destroyed counter " << value << endl;
    }
    void show() {
        cout << "Value: " << value << endl;
    }
};

void inspect(Counter c) {
    c.show();
}

int main() {
    int v;
    cin >> v;
    Counter a(v);
    inspect(a);
    inspect(a);
    cout << "Done" << endl;
    return 0;
}`,
    blacklist: "printf",
    whitelist: "class, public, void",
  },
  {
    title: "Nested Scope Teardown",
    description:
      "A mission runs through three nested zones and every zone entry and exit is logged by objects. Define a class Scope whose constructor prints 'Enter <tag>' and whose destructor prints 'Exit <tag>'. Read three tags. Create the outer object, inside it the middle object, and inside that the inner object. Print 'Inner work done' in the innermost block, 'Middle work done' after the inner block closes, and 'Outer work done' after the middle block closes.\n\nInput Format:\nOne line with three words separated by spaces: tag1 tag2 tag3 (outer, middle, inner).\n\nOutput Format:\nEnter <tag1>\nEnter <tag2>\nEnter <tag3>\nInner work done\nExit <tag3>\nMiddle work done\nExit <tag2>\nOuter work done\nExit <tag1>\n\nConstraints:\nEach tag is a single word of at most 8 characters.",
    difficulty: "medium",
    maxscore: 20,
    topic: "Constructors and Destructors",
    subtopic: "Destructor",
    inputconstrains: "Each tag is a single word of at most 8 characters",
    sampleinput1: "alpha beta gamma",
    sampleinput2: "open read close",
    input1: "one two three",
    input2: "a b c",
    input3: "x y z",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

class Scope {
    string tag;
public:
    Scope(string t) {
        tag = t;
        cout << "Enter " << tag << endl;
    }
    ~Scope() {
        cout << "Exit " << tag << endl;
    }
};

int main() {
    string t1, t2, t3;
    cin >> t1 >> t2 >> t3;
    {
        Scope outer(t1);
        {
            Scope middle(t2);
            {
                Scope inner(t3);
                cout << "Inner work done" << endl;
            }
            cout << "Middle work done" << endl;
        }
        cout << "Outer work done" << endl;
    }
    return 0;
}`,
    blacklist: "printf",
    whitelist: "class, public, string",
  },
  {
    title: "File Guard Autosave",
    description:
      "A logging tool guards a data file: the file must open exactly when the guard object is created and close automatically when the guard dies. Define a class FileGuard whose constructor prints 'Opening file <name>' and whose destructor prints 'Closing file <name>'. Read the file name (a single word, it may contain a dot) and a record count. Inside a block create the guard and write the records; after the block closes print 'File saved safely'.\n\nInput Format:\nOne line with two tokens: file name (single word) and record count (integer).\n\nOutput Format:\nOpening file <name>\nWrite record 1\n...\nWrite record <records>\nClosing file <name>\nFile saved safely\n\nConstraints:\n1 <= records <= 5",
    difficulty: "medium",
    maxscore: 20,
    topic: "Constructors and Destructors",
    subtopic: "Destructor",
    inputconstrains: "1 <= records <= 5",
    sampleinput1: "report.txt 2",
    sampleinput2: "data.log 3",
    input1: "notes.txt 1",
    input2: "backup.db 4",
    input3: "temp.txt 5",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

class FileGuard {
    string name;
public:
    FileGuard(string n) {
        name = n;
        cout << "Opening file " << name << endl;
    }
    ~FileGuard() {
        cout << "Closing file " << name << endl;
    }
};

int main() {
    string fname;
    int records;
    cin >> fname >> records;
    {
        FileGuard file(fname);
        for (int i = 1; i <= records; i++) {
            cout << "Write record " << i << endl;
        }
    }
    cout << "File saved safely" << endl;
    return 0;
}`,
    blacklist: "printf",
    whitelist: "class, public, for",
  },
  {
    title: "Member Init Order Machine",
    description:
      "A factory robot assembles a Machine from two parts, and the assembly log proves the member initialization order rule. Define two small classes PartA and PartB whose constructors print 'PartA built with <v>' and 'PartB built with <v>'. Define class Machine with members declared in the order PartA a; PartB b; and a constructor written as Machine(int x, int y) : b(y), a(x) that then prints 'Machine assembled'. Although the initialization list mentions b first, members are always built in declaration order. Read x and y, build one Machine and print the log.\n\nInput Format:\nOne line with two integers: x and y.\n\nOutput Format:\nPartA built with <x>\nPartB built with <y>\nMachine assembled\n\nConstraints:\n1 <= x, y <= 100",
    difficulty: "medium",
    maxscore: 20,
    topic: "Constructors and Destructors",
    subtopic: "Initialization Lists",
    inputconstrains: "1 <= x, y <= 100",
    sampleinput1: "10 20",
    sampleinput2: "5 9",
    input1: "1 1",
    input2: "100 3",
    input3: "7 42",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class PartA {
public:
    PartA(int v) {
        cout << "PartA built with " << v << endl;
    }
};

class PartB {
public:
    PartB(int v) {
        cout << "PartB built with " << v << endl;
    }
};

class Machine {
    PartA a;
    PartB b;
public:
    Machine(int x, int y) : b(y), a(x) {
        cout << "Machine assembled" << endl;
    }
};

int main() {
    int x, y;
    cin >> x >> y;
    Machine m(x, y);
    return 0;
}`,
    blacklist: "printf",
    whitelist: "class, public, endl",
  },
  {
    title: "Supermarket Cart Audit",
    description:
      "A self-checkout kiosk opens a Cart object with a fixed number of items and closes it out in the destructor. Define a class Cart whose parameterized constructor prints 'Cart opened with <n> items' and stores the item count. Provide a scan(i) function that prints 'Scanned item <i>'. The destructor performs the audit and decreases the count: it first prints 'Checkout: billing <n> items', then sets the item count to 0, then prints 'Cart closed with 0 items'. Read n, open the cart, scan all n items in order, and end the program so the destructor runs.\n\nInput Format:\nOne line with one integer: n.\n\nOutput Format:\nCart opened with <n> items\nScanned item 1\n...\nScanned item <n>\nCheckout: billing <n> items\nCart closed with 0 items\n\nConstraints:\n1 <= n <= 5",
    difficulty: "medium",
    maxscore: 20,
    topic: "Constructors and Destructors",
    subtopic: "Destructor",
    inputconstrains: "1 <= n <= 5",
    sampleinput1: "3",
    sampleinput2: "1",
    input1: "2",
    input2: "4",
    input3: "5",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class Cart {
    int items;
public:
    Cart(int n) {
        items = n;
        cout << "Cart opened with " << items << " items" << endl;
    }
    void scan(int i) {
        cout << "Scanned item " << i << endl;
    }
    ~Cart() {
        cout << "Checkout: billing " << items << " items" << endl;
        items = 0;
        cout << "Cart closed with " << items << " items" << endl;
    }
};

int main() {
    int n;
    cin >> n;
    Cart cart(n);
    for (int i = 1; i <= n; i++) {
        cart.scan(i);
    }
    return 0;
}`,
    blacklist: "printf",
    whitelist: "class, public, for",
  },

  // ------------------------------------------------------------------- hard
  {
    title: "Session Alive Counter",
    description:
      "A cloud platform tracks overlapping user sessions with a live counter. Keep a plain global int alive initialized to 0. Define a class Session whose constructor increases alive by 1 and prints 'Session <name> started, alive: <alive>', and whose destructor decreases alive by 1 and prints 'Session <name> ended, alive: <alive>'. Read N and then N session tags. First create a long-running Session named main, then for each tag create a short-lived Session inside a block, print 'Working in <tag>' while it lives, and let it expire at the end of the block. After all sessions print 'All sessions closed, alive: 0'.\n\nInput Format:\nTokens separated by spaces: N followed by N session tags (single words).\n\nOutput Format:\nSession main started, alive: 1\nFor each session: Session <tag> started, alive: 2 / Working in <tag> / Session <tag> ended, alive: 1\nAll sessions closed, alive: 0\n\nConstraints:\n1 <= N <= 4; each tag is a single word of at most 10 characters",
    difficulty: "hard",
    maxscore: 30,
    topic: "Constructors and Destructors",
    subtopic: "Destructor",
    inputconstrains: "1 <= N <= 4; each tag is a single word of at most 10 characters",
    sampleinput1: "2 alpha beta",
    sampleinput2: "1 solo",
    input1: "3 a b c",
    input2: "2 x y",
    input3: "1 edge",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

int alive = 0;

class Session {
    string name;
public:
    Session(string n) {
        name = n;
        alive++;
        cout << "Session " << name << " started, alive: " << alive << endl;
    }
    ~Session() {
        alive--;
        cout << "Session " << name << " ended, alive: " << alive << endl;
    }
};

int main() {
    int n;
    cin >> n;
    Session outer("main");
    for (int i = 0; i < n; i++) {
        string tag;
        cin >> tag;
        {
            Session s(tag);
            cout << "Working in " << tag << endl;
        }
    }
    cout << "All sessions closed, alive: " << alive << endl;
    return 0;
}`,
    blacklist: "printf",
    whitelist: "class, public, int",
  },
  {
    title: "Const Discount Order",
    description:
      "An online store prices orders with a discount that must never change after creation, so it is stored as a const member initialized in the constructor's initialization list. Define class Order with a const int discount member and an int amount member. Give it two overloaded constructors: a one-argument constructor that sets the discount to 0 and prints 'Flat constructor used', and a two-argument constructor taking amount and discount that prints 'Discount constructor used'. A bill() function prints the amount, the discount percentage and the payable value computed as amount - amount * discount / 100. Read a mode k: if k is 1 read only the amount, if k is 2 read the amount and the discount, then print the bill.\n\nInput Format:\nThe first integer k is 1 or 2. If k is 1, one more integer a (amount) follows. If k is 2, two more integers a and d follow.\n\nOutput Format:\n<constructor used line>\nOrder amount: <a>\nDiscount: <d>%\nPayable: <a - a*d/100>\n\nConstraints:\nk is 1 or 2; 1 <= amount <= 10000; 0 <= discount <= 90",
    difficulty: "hard",
    maxscore: 30,
    topic: "Constructors and Destructors",
    subtopic: "Initialization Lists",
    inputconstrains: "k is 1 or 2; 1 <= amount <= 10000; 0 <= discount <= 90",
    sampleinput1: "2 500 20",
    sampleinput2: "1 500",
    input1: "1 999",
    input2: "2 200 50",
    input3: "1 100",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class Order {
    const int discount;
    int amount;
public:
    Order(int a) : discount(0), amount(a) {
        cout << "Flat constructor used" << endl;
    }
    Order(int a, int d) : discount(d), amount(a) {
        cout << "Discount constructor used" << endl;
    }
    void bill() {
        cout << "Order amount: " << amount << endl;
        cout << "Discount: " << discount << "%" << endl;
        cout << "Payable: " << amount - amount * discount / 100 << endl;
    }
};

int main() {
    int k;
    cin >> k;
    if (k == 1) {
        int a;
        cin >> a;
        Order o(a);
        o.bill();
    } else {
        int a, d;
        cin >> a >> d;
        Order o(a, d);
        o.bill();
    }
    return 0;
}`,
    blacklist: "printf",
    whitelist: "class, const, if",
  },
  {
    title: "Deep Copy Buffer Lab",
    description:
      "A graphics tool stores pixel rows in a Buffer class that manages its own heap array. Define class Buffer holding an int size and an int pointer data. The parameterized constructor allocates a new int array of the given size, fills slot i with i + 1 and prints 'Buffer created with <n> slots'. The copy constructor performs a DEEP copy (allocate a fresh array and copy every element) and prints 'Deep copy of <n> slots performed'. The destructor deletes the array and prints 'Buffer freed'. Provide set(idx, val) to overwrite one slot and a print(label) function that prints '<label>:' followed by the elements separated by single spaces. Read n, create the original, make a copy with Buffer b = a, print both, change the FIRST slot of the copy to 100, and print both again to prove the mutation independence.\n\nInput Format:\nOne line with one integer: n.\n\nOutput Format:\nBuffer created with <n> slots\nDeep copy of <n> slots performed\nOriginal: 1 2 ... <n>\nCopy: 1 2 ... <n>\nCopy after edit: 100 2 ... <n>\nOriginal after edit: 1 2 ... <n>\nBuffer freed\nBuffer freed\n\nConstraints:\n1 <= n <= 5",
    difficulty: "hard",
    maxscore: 30,
    topic: "Constructors and Destructors",
    subtopic: "Copy Constructor",
    inputconstrains: "1 <= n <= 5",
    sampleinput1: "3",
    sampleinput2: "1",
    input1: "2",
    input2: "5",
    input3: "4",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class Buffer {
    int size;
    int *data;
public:
    Buffer(int n) {
        size = n;
        data = new int[size];
        for (int i = 0; i < size; i++) {
            data[i] = i + 1;
        }
        cout << "Buffer created with " << size << " slots" << endl;
    }
    Buffer(const Buffer &other) {
        size = other.size;
        data = new int[size];
        for (int i = 0; i < size; i++) {
            data[i] = other.data[i];
        }
        cout << "Deep copy of " << size << " slots performed" << endl;
    }
    ~Buffer() {
        delete[] data;
        cout << "Buffer freed" << endl;
    }
    void set(int idx, int val) {
        data[idx] = val;
    }
    void print(const char *label) {
        cout << label << ":";
        for (int i = 0; i < size; i++) {
            cout << " " << data[i];
        }
        cout << endl;
    }
};

int main() {
    int n;
    cin >> n;
    Buffer a(n);
    Buffer b = a;
    a.print("Original");
    b.print("Copy");
    b.set(0, 100);
    b.print("Copy after edit");
    a.print("Original after edit");
    return 0;
}`,
    blacklist: "printf",
    whitelist: "class, new, delete",
  },
  {
    title: "RAII Stack Simulator",
    description:
      "A controller class demonstrates RAII-style resource management: the constructor grabs a heap array and the destructor gives it back. Define class IntStack with an int pointer data, a capacity cap and a top index. The parameterized constructor allocates the array with new and prints 'Stack allocated with capacity <cap>'. push(v) prints 'Pushed <v>', or 'Stack overflow' when the stack is already full; pop() prints 'Popped <v>' where v is the most recently pushed value, or 'Stack underflow' when the stack is empty. The destructor releases the array with delete[] and prints 'Stack memory released'. Read the capacity and the number of operations k, then process k operations in order, each being the word push followed by an integer v, or the word pop.\n\nInput Format:\nFirst two integers: capacity and k. Then k operations separated by spaces: push v or pop.\n\nOutput Format:\nOne line per event in order, starting with 'Stack allocated with capacity <cap>' and ending with 'Stack memory released'.\n\nConstraints:\n1 <= cap <= 10; 1 <= k <= 20; 0 <= v <= 1000",
    difficulty: "hard",
    maxscore: 30,
    topic: "Constructors and Destructors",
    subtopic: "Destructor",
    inputconstrains: "1 <= cap <= 10; 1 <= k <= 20; 0 <= v <= 1000",
    sampleinput1: "2 4 push 5 push 7 pop push 9",
    sampleinput2: "1 2 push 3 pop",
    input1: "2 5 push 1 push 2 push 3 pop pop",
    input2: "1 2 push 4 push 5",
    input3: "3 2 pop pop",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

class IntStack {
    int *data;
    int cap;
    int top;
public:
    IntStack(int c) {
        cap = c;
        top = 0;
        data = new int[cap];
        cout << "Stack allocated with capacity " << cap << endl;
    }
    ~IntStack() {
        delete[] data;
        cout << "Stack memory released" << endl;
    }
    void push(int v) {
        if (top == cap) {
            cout << "Stack overflow" << endl;
            return;
        }
        data[top] = v;
        top++;
        cout << "Pushed " << v << endl;
    }
    void pop() {
        if (top == 0) {
            cout << "Stack underflow" << endl;
            return;
        }
        top--;
        cout << "Popped " << data[top] << endl;
    }
};

int main() {
    int cap, k;
    cin >> cap >> k;
    IntStack s(cap);
    for (int i = 0; i < k; i++) {
        string op;
        cin >> op;
        if (op == "push") {
            int v;
            cin >> v;
            s.push(v);
        } else {
            s.pop();
        }
    }
    return 0;
}`,
    blacklist: "printf",
    whitelist: "class, new, delete",
  },
];

export const mcqs = [
  // ------------------------------------------------------------------ easy
  {
    title: "What a Constructor Does",
    description: "In C++, a constructor is best described as:",
    difficulty: "easy",
    topic: "Constructors and Destructors",
    subtopic: "Default Constructor",
    Option1: "A member function that must be called manually after creating an object",
    Option2: "A special member function that is invoked automatically when an object is created",
    Option3: "A function that destroys an object at the end of the program",
    Option4: "A keyword used to declare a class",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Constructor Name and Return Rule",
    description: "Which rule about a constructor's name and return type is correct?",
    difficulty: "easy",
    topic: "Constructors and Destructors",
    subtopic: "Constructor Overloading",
    Option1: "It must have the same name as the class and may return int",
    Option2: "It can have any name but must return void",
    Option3: "It must have the same name as the class and has no return type, not even void",
    Option4: "It must be named init and return the object",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Default Constructor Purpose",
    description: "The default constructor is the constructor that:",
    difficulty: "easy",
    topic: "Constructors and Destructors",
    subtopic: "Default Constructor",
    Option1: "Can be called with no arguments and gives the object its initial state",
    Option2: "Takes exactly one argument",
    Option3: "Copies one object into another",
    Option4: "Runs only when the program ends",
    CorrectOption: 1,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Destructor Symbol and Syntax",
    description: "Which is the correct way to declare the destructor of class Demo?",
    difficulty: "easy",
    topic: "Constructors and Destructors",
    subtopic: "Destructor",
    Option1: "void ~Demo();",
    Option2: "~Demo();",
    Option3: "Demo~();",
    Option4: "Destructor Demo();",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "When Destructors Run",
    description: "For a local (automatic) object, the destructor runs:",
    difficulty: "easy",
    topic: "Constructors and Destructors",
    subtopic: "Destructor",
    Option1: "Automatically when the object goes out of scope",
    Option2: "Only when the programmer writes an explicit destructor call by hand",
    Option3: "At the moment the object is created",
    Option4: "Never, local objects are not destroyed",
    CorrectOption: 1,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "One Destructor per Class",
    description: "Which statement about destructors in a class is TRUE?",
    difficulty: "easy",
    topic: "Constructors and Destructors",
    subtopic: "Destructor",
    Option1: "A class can have many destructors with different parameter lists",
    Option2: "A class can have exactly two destructors",
    Option3: "Destructors can be overloaded like constructors",
    Option4: "A class can have at most one destructor, and it takes no arguments",
    CorrectOption: 4,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "When Constructors Execute",
    description: "A constructor executes:",
    difficulty: "easy",
    topic: "Constructors and Destructors",
    subtopic: "Default Constructor",
    Option1: "when the object's destructor runs",
    Option2: "only once for the whole program, no matter how many objects exist",
    Option3: "automatically each time an object of the class is created",
    Option4: "only when the class is compiled",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Constructor Calls per Object",
    description:
      "If a program creates 5 objects of a class that has a normal constructor, how many times does that constructor run?",
    difficulty: "easy",
    topic: "Constructors and Destructors",
    subtopic: "Default Constructor",
    Option1: "Once in total, shared by all five objects",
    Option2: "Five times only if the objects are stored in an array",
    Option3: "Five times, once for each object created",
    Option4: "Zero times, constructors run only for pointers",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Destructor Arguments Rule",
    description: "Which statement about a destructor's parameters is correct?",
    difficulty: "easy",
    topic: "Constructors and Destructors",
    subtopic: "Destructor",
    Option1: "A destructor takes no parameters and cannot be overloaded",
    Option2: "A destructor takes one integer parameter for the object id",
    Option3: "A destructor can take any number of string parameters",
    Option4: "A destructor must receive a copy of the object",
    CorrectOption: 1,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Implicit Default Constructor",
    description: "What happens if a class is written without any constructor?",
    difficulty: "easy",
    topic: "Constructors and Destructors",
    subtopic: "Default Constructor",
    Option1: "The program fails to compile whenever an object is created",
    Option2: "The compiler generates a default constructor that creates the object without initializing its members",
    Option3: "The compiler generates a destructor instead",
    Option4: "Objects of the class can never be created",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },

  // ----------------------------------------------------------------- medium
  {
    title: "Local Object Lifecycle Output",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "Constructors and Destructors",
    subtopic: "Destructor",
    Option1: "constructed running destroyed on one line",
    Option2: "constructed\nrunning\ndestroyed",
    Option3: "running\nconstructed\ndestroyed",
    Option4: "constructed\ndestroyed\nrunning",
    CorrectOption: 2,
    codesnippet: `#include <iostream>
using namespace std;
class Demo {
public:
    Demo()  { cout << "constructed" << endl; }
    ~Demo() { cout << "destroyed" << endl; }
};
int main() {
    Demo d;
    cout << "running" << endl;
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nclass Demo {\npublic:\n    Demo()  { cout << "constructed" << endl; }\n    ~Demo() { cout << "destroyed" << endl; }\n};\nint main() {\n    Demo d;\n    cout << "running" << endl;\n    return 0;\n}`,
      stdin: "",
      expected: "constructed\nrunning\ndestroyed",
    },
  },
  {
    title: "Copy Constructor by Value Call",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "Constructors and Destructors",
    subtopic: "Copy Constructor",
    Option1: "made\nheld\nfreed",
    Option2: "made\ncopied\nheld\nfreed",
    Option3: "made\ncopied\nheld\nfreed\nfreed",
    Option4: "made\ncopied\nfreed\nheld\nfreed",
    CorrectOption: 3,
    codesnippet: `#include <iostream>
using namespace std;
class Widget {
public:
    Widget()  { cout << "made" << endl; }
    Widget(const Widget &) { cout << "copied" << endl; }
    ~Widget() { cout << "freed" << endl; }
};
void hold(Widget w) {
    cout << "held" << endl;
}
int main() {
    Widget a;
    hold(a);
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nclass Widget {\npublic:\n    Widget()  { cout << "made" << endl; }\n    Widget(const Widget &) { cout << "copied" << endl; }\n    ~Widget() { cout << "freed" << endl; }\n};\nvoid hold(Widget w) {\n    cout << "held" << endl;\n}\nint main() {\n    Widget a;\n    hold(a);\n    return 0;\n}`,
      stdin: "",
      expected: "made\ncopied\nheld\nfreed\nfreed",
    },
  },
  {
    title: "Reverse Destruction Order",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "Constructors and Destructors",
    subtopic: "Destructor",
    Option1: "build P\nbuild Q\ndrop Q\ndrop P",
    Option2: "build P\nbuild Q\ndrop P\ndrop Q",
    Option3: "build P\ndrop P\nbuild Q\ndrop Q",
    Option4: "build Q\nbuild P\ndrop P\ndrop Q",
    CorrectOption: 1,
    codesnippet: `#include <iostream>
#include <string>
using namespace std;
class Node {
    string tag;
public:
    Node(string t) : tag(t) { cout << "build " << tag << endl; }
    ~Node() { cout << "drop " << tag << endl; }
};
int main() {
    Node p("P");
    Node q("Q");
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\n#include <string>\nusing namespace std;\nclass Node {\n    string tag;\npublic:\n    Node(string t) : tag(t) { cout << "build " << tag << endl; }\n    ~Node() { cout << "drop " << tag << endl; }\n};\nint main() {\n    Node p("P");\n    Node q("Q");\n    return 0;\n}`,
      stdin: "",
      expected: "build P\nbuild Q\ndrop Q\ndrop P",
    },
  },
  {
    title: "Parameterized Constructor Trace",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "Constructors and Destructors",
    subtopic: "Parameterized Constructor",
    Option1: "price 50\nItem at 50",
    Option2: "Item at 50",
    Option3: "Item at 0\nprice 50",
    Option4: "Item at 50\nprice 50",
    CorrectOption: 4,
    codesnippet: `#include <iostream>
using namespace std;
class Item {
    int price;
public:
    Item(int p) : price(p) {
        cout << "Item at " << price << endl;
    }
    void show() {
        cout << "price " << price << endl;
    }
};
int main() {
    Item x(50);
    x.show();
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nclass Item {\n    int price;\npublic:\n    Item(int p) : price(p) {\n        cout << "Item at " << price << endl;\n    }\n    void show() {\n        cout << "price " << price << endl;\n    }\n};\nint main() {\n    Item x(50);\n    x.show();\n    return 0;\n}`,
      stdin: "",
      expected: "Item at 50\nprice 50",
    },
  },
  {
    title: "Copy Constructor Declaration Form",
    description: "Which is the correct signature for the copy constructor of class Photo?",
    difficulty: "medium",
    topic: "Constructors and Destructors",
    subtopic: "Copy Constructor",
    Option1: "Photo(Photo obj)",
    Option2: "Photo(const Photo &obj)",
    Option3: "Photo(Photo obj, int count)",
    Option4: "void Photo(Photo &obj)",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Constructors Are Not Normal Functions",
    description: "Which statement about calling constructors is TRUE?",
    difficulty: "medium",
    topic: "Constructors and Destructors",
    subtopic: "Constructor Overloading",
    Option1: "obj.Student(); re-runs the constructor on an existing object to reset it",
    Option2: "A constructor can be invoked like a normal member function any number of times",
    Option3: "A constructor runs automatically when the object is created; it cannot be dot-called on an existing object like an ordinary member function",
    Option4: "Constructors must be called explicitly using the scope resolution operator",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },

  // ------------------------------------------------------------------- hard
  {
    title: "Member Order Beats List Order",
    description: "What does this program print?",
    difficulty: "hard",
    topic: "Constructors and Destructors",
    subtopic: "Initialization Lists",
    Option1: "BAO",
    Option2: "ABO",
    Option3: "AOB",
    Option4: "OAB",
    CorrectOption: 2,
    codesnippet: `#include <iostream>
using namespace std;
class A {
public:
    A() { cout << "A"; }
};
class B {
public:
    B() { cout << "B"; }
};
class Owner {
    A a;
    B b;
public:
    Owner() : b(), a() {
        cout << "O";
    }
};
int main() {
    Owner o;
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nclass A {\npublic:\n    A() { cout << "A"; }\n};\nclass B {\npublic:\n    B() { cout << "B"; }\n};\nclass Owner {\n    A a;\n    B b;\npublic:\n    Owner() : b(), a() {\n        cout << "O";\n    }\n};\nint main() {\n    Owner o;\n    return 0;\n}`,
      stdin: "",
      expected: "ABO",
    },
  },
  {
    title: "Temporary Object Lifetime",
    description: "What does this program print?",
    difficulty: "hard",
    topic: "Constructors and Destructors",
    subtopic: "Destructor",
    Option1: "sCeD",
    Option2: "sDeC",
    Option3: "sCe",
    Option4: "sCDe",
    CorrectOption: 4,
    codesnippet: `#include <iostream>
using namespace std;
class Tracer {
public:
    Tracer()  { cout << "C"; }
    ~Tracer() { cout << "D"; }
};
int main() {
    cout << "s";
    Tracer();
    cout << "e";
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nclass Tracer {\npublic:\n    Tracer()  { cout << "C"; }\n    ~Tracer() { cout << "D"; }\n};\nint main() {\n    cout << "s";\n    Tracer();\n    cout << "e";\n    return 0;\n}`,
      stdin: "",
      expected: "sCDe",
    },
  },
  {
    title: "Copy Constructor versus Assignment",
    description: "What does this program print?",
    difficulty: "hard",
    topic: "Constructors and Destructors",
    subtopic: "Copy Constructor",
    Option1: "default copy default assign",
    Option2: "default copy default copy",
    Option3: "default assign default copy",
    Option4: "default default copy assign",
    CorrectOption: 1,
    codesnippet: `#include <iostream>
using namespace std;
class Box {
public:
    Box() { cout << "default "; }
    Box(const Box &) { cout << "copy "; }
    Box& operator=(const Box &) {
        cout << "assign ";
        return *this;
    }
};
int main() {
    Box a;
    Box b = a;
    Box c;
    c = a;
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nclass Box {\npublic:\n    Box() { cout << "default "; }\n    Box(const Box &) { cout << "copy "; }\n    Box& operator=(const Box &) {\n        cout << "assign ";\n        return *this;\n    }\n};\nint main() {\n    Box a;\n    Box b = a;\n    Box c;\n    c = a;\n    return 0;\n}`,
      stdin: "",
      expected: "default copy default assign",
    },
  },
  {
    title: "Why Destruction Runs in Reverse",
    description: "Why does C++ destroy objects in the reverse order of their construction?",
    difficulty: "hard",
    topic: "Constructors and Destructors",
    subtopic: "Destructor",
    Option1: "The compiler reverses the order to save memory",
    Option2: "Destructors must run in alphabetical order of class names",
    Option3: "An object created later may depend on an earlier one, so reverse unwinding destroys dependents before the resources they rely on",
    Option4: "Reverse order applies only to objects created with new",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
];
