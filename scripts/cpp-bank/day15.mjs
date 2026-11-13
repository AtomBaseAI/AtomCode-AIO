/**
 * OOPS using CPP — Day 15: Polymorphism
 * 20 code questions (10 easy: 6 basics + 4 real-world, 6 medium, 4 hard)
 * 20 MCQs (10 easy, 6 medium, 4 hard)
 * Scope: Compile-Time & Run-Time Polymorphism, Virtual Functions, Function Overriding.
 * All solutions are fresh C++ written for this course (no conversions).
 */
export const meta = {
  day: 15,
  topic: "Polymorphism",
};

export const code = [
  // ------------------------------------------------------------------ easy
  {
    title: "Overloaded Area Switchboard",
    description:
      "A geometry tool exposes one function name area() that behaves differently for squares and circles. Class AreaTool overloads area(int side) for squares and area(double radius) for circles. Read the shape code and value, then let the overload pick the right formula.\n\nInput Format:\nOne line with a character and a number: 'S' with an integer side, or 'C' with a radius.\n\nOutput Format:\nSquare area: <side * side>\nor\nCircle area: <3.14 * radius * radius with 2 decimals>\n\nConstraints:\nCode is 'S' or 'C'; 1 <= value <= 100.",
    difficulty: "easy",
    maxscore: 10,
    topic: "Polymorphism",
    subtopic: "Compile-Time Polymorphism",
    inputconstrains: "Code is 'S' or 'C'; 1 <= value <= 100",
    sampleinput1: "S 5",
    sampleinput2: "C 2",
    input1: "C 1",
    input2: "S 12",
    input3: "C 10",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
using namespace std;

class AreaTool {
public:
    int area(int side) {              // overload for squares
        return side * side;
    }
    double area(double radius) {      // overload for circles
        return 3.14 * radius * radius;
    }
};

int main() {
    char kind;
    double value;
    cin >> kind >> value;
    AreaTool tool;
    cout << fixed << setprecision(2);
    if (kind == 'S') {
        cout << "Square area: " << tool.area((int)value) << endl;
    } else {
        cout << "Circle area: " << tool.area(value) << endl;
    }
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Shape vs Circle Describe Drill",
    description:
      "Practice plain method overriding. Base class Shape has describe() printing 'I am a shape'. Derived class Circle redefines describe() to print 'I am a circle'. Read the picker and an item number, create the matching object directly, and call describe() on it.\n\nInput Format:\nOne line with a character and an integer: the picker and the item number. 'C' creates a Circle; any other character creates a Shape.\n\nOutput Format:\nItem <id>:\nI am a circle   (when picker is C)\nor\nI am a shape    (otherwise)\n\nConstraints:\n1 <= item number <= 999.",
    difficulty: "easy",
    maxscore: 10,
    topic: "Polymorphism",
    subtopic: "Function Overriding",
    inputconstrains: "1 <= item number <= 999",
    sampleinput1: "C 1",
    sampleinput2: "B 2",
    input1: "B 3",
    input2: "C 4",
    input3: "X 5",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class Shape {
public:
    virtual ~Shape() {}
    void describe() { cout << "I am a shape" << endl; }
};

class Circle : public Shape {
public:
    void describe() { cout << "I am a circle" << endl; }
};

int main() {
    char pick;
    int id;
    cin >> pick >> id;
    cout << "Item " << id << ":" << endl;
    if (pick == 'C') {
        Circle c;
        c.describe();          // Circle version
    } else {
        Shape s;
        s.describe();          // base version
    }
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Virtual Speak Through Base Pointer",
    description:
      "A virtual function lets a base class pointer call the derived class version. Animal declares speak() as virtual; Dog overrides it to bark. Read the dog's name, build a Dog, point a base Animal pointer at it, and call speak() through the pointer.\n\nInput Format:\nOne line with a single word: the dog's name.\n\nOutput Format:\n<name> says Woof Woof\n\nConstraints:\nName is one word of at most 20 letters.",
    difficulty: "easy",
    maxscore: 10,
    topic: "Polymorphism",
    subtopic: "Base Pointers and Derived Objects",
    inputconstrains: "Name is one word of at most 20 letters",
    sampleinput1: "Bruno",
    sampleinput2: "Rio",
    input1: "Tommy",
    input2: "Simba",
    input3: "Zoe",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

class Animal {
public:
    virtual ~Animal() {}
    virtual void speak() { cout << "Some generic animal sound" << endl; }
};

class Dog : public Animal {
    string name;
public:
    Dog(string n) : name(n) {}
    void speak() { cout << name << " says Woof Woof" << endl; }
};

int main() {
    string name;
    cin >> name;
    Dog d(name);
    Animal* p = &d;    // base pointer to a derived object
    p->speak();        // virtual dispatch runs the Dog version
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Two Ways to Name a Max",
    description:
      "Compare overloading with distinct function names. Class Selector has one name bigger() overloaded for int and double, while free functions biggerInts() and biggerDoubles() use distinct names for the same job. Read two integers and two doubles, then print both approaches' answers.\n\nInput Format:\nOne line with four tokens: int1, int2, double1, double2.\n\nOutput Format:\nOverload int result: <max of int1, int2>\nNamed int result: <max of int1, int2>\nOverload double result: <max of double1, double2 with 1 decimal>\nNamed double result: <max of double1, double2 with 1 decimal>\n\nConstraints:\n-1000 <= integers <= 1000; -1000.0 <= doubles <= 1000.0 with at most 1 decimal digit.",
    difficulty: "easy",
    maxscore: 10,
    topic: "Polymorphism",
    subtopic: "Compile-Time Polymorphism",
    inputconstrains: "-1000 <= integers <= 1000; doubles have at most 1 decimal digit",
    sampleinput1: "3 9 2.5 7.5",
    sampleinput2: "10 10 3.3 2.2",
    input1: "1 2 0.5 0.5",
    input2: "-4 -9 -1.5 -8.5",
    input3: "0 0 0.0 0.0",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
using namespace std;

class Selector {
public:
    int bigger(int a, int b) { return a > b ? a : b; }
    double bigger(double a, double b) { return a > b ? a : b; }
};

int biggerInts(int a, int b) { return a > b ? a : b; }
double biggerDoubles(double a, double b) { return a > b ? a : b; }

int main() {
    int i1, i2;
    double d1, d2;
    cin >> i1 >> i2 >> d1 >> d2;
    Selector s;
    cout << "Overload int result: " << s.bigger(i1, i2) << endl;
    cout << "Named int result: " << biggerInts(i1, i2) << endl;
    cout << fixed << setprecision(1);
    cout << "Overload double result: " << s.bigger(d1, d2) << endl;
    cout << "Named double result: " << biggerDoubles(d1, d2) << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Base Reference, Derived Duty",
    description:
      "A base class reference can bind to a derived object and still reach the overridden virtual method. Staff declares virtual role(); Manager and Developer override it. Read a duty code and an employee name, create the matching derived object through a base pointer, bind a Staff reference to it, and call role().\n\nInput Format:\nOne line with a character and a word: 'M' for Manager, 'D' for Developer, and the employee name.\n\nOutput Format:\nBadge: <name>\nManager on duty      (code M)\nor\nDeveloper on duty    (code D)\n\nConstraints:\nCode is 'M' or 'D'; name is one word of at most 20 letters.",
    difficulty: "easy",
    maxscore: 10,
    topic: "Polymorphism",
    subtopic: "Base Pointers and Derived Objects",
    inputconstrains: "Code is 'M' or 'D'; name is one word of at most 20 letters",
    sampleinput1: "M Priya",
    sampleinput2: "D Arjun",
    input1: "D Ravi",
    input2: "M Tina",
    input3: "D Zoe",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

class Staff {
public:
    virtual ~Staff() {}
    virtual void role() { cout << "General staff member" << endl; }
};

class Manager : public Staff {
public:
    void role() { cout << "Manager on duty" << endl; }
};

class Developer : public Staff {
public:
    void role() { cout << "Developer on duty" << endl; }
};

int main() {
    char code;
    string name;
    cin >> code >> name;
    Staff* member = nullptr;
    if (code == 'M') member = new Manager();
    else member = new Developer();
    Staff& ref = *member;   // base reference to a derived object
    cout << "Badge: " << name << endl;
    ref.role();             // virtual dispatch via reference
    delete member;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Personalized Greeting Override",
    description:
      "A kiosk prints a generic greeting, but a personalized greeter overrides greet() to use the visitor's name. Read the visitor name, call the base Greeter version first, then call the overridden NamedGreeter version.\n\nInput Format:\nOne line with a single word: the visitor's name.\n\nOutput Format:\nHello, guest!\nHello, <name>!\n\nConstraints:\nName is one word of at most 20 letters.",
    difficulty: "easy",
    maxscore: 10,
    topic: "Polymorphism",
    subtopic: "Function Overriding",
    inputconstrains: "Name is one word of at most 20 letters",
    sampleinput1: "Asha",
    sampleinput2: "Vikram",
    input1: "Neha",
    input2: "Om",
    input3: "Zara",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

class Greeter {
public:
    virtual ~Greeter() {}
    virtual void greet() { cout << "Hello, guest!" << endl; }
};

class NamedGreeter : public Greeter {
    string name;
public:
    NamedGreeter(string n) : name(n) {}
    void greet() { cout << "Hello, " << name << "!" << endl; }
};

int main() {
    string name;
    cin >> name;
    Greeter base;
    base.greet();            // base version
    NamedGreeter custom(name);
    custom.greet();          // overridden personalized version
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Notification Dispatcher",
    description:
      "A monitoring app sends alerts through different channels. Base class Notifier declares virtual send(msg); EmailNotifier and SMSNotifier override it. Read the channel code and the message, build the right notifier polymorphically with new, send through the base pointer, and delete it.\n\nInput Format:\nOne line with a character and a word: 'E' for email, 'S' for SMS, plus the alert message.\n\nOutput Format:\nEmail dispatched: <message>\nor\nSMS dispatched: <message>\n\nConstraints:\nCode is 'E' or 'S'; message is one word of at most 20 letters.",
    difficulty: "easy",
    maxscore: 10,
    topic: "Polymorphism",
    subtopic: "Runtime Polymorphism",
    inputconstrains: "Code is 'E' or 'S'; message is one word of at most 20 letters",
    sampleinput1: "E examsoon",
    sampleinput2: "S serverdown",
    input1: "S alertnow",
    input2: "E hdfcpaid",
    input3: "S otpsent",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

class Notifier {
public:
    virtual ~Notifier() {}
    virtual void send(string msg) { cout << "Generic notification: " << msg << endl; }
};

class EmailNotifier : public Notifier {
public:
    void send(string msg) { cout << "Email dispatched: " << msg << endl; }
};

class SMSNotifier : public Notifier {
public:
    void send(string msg) { cout << "SMS dispatched: " << msg << endl; }
};

int main() {
    char code;
    string msg;
    cin >> code >> msg;
    Notifier* n = nullptr;
    if (code == 'E') n = new EmailNotifier();
    else n = new SMSNotifier();
    n->send(msg);      // virtual dispatch chooses the channel
    delete n;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Payment Mode Processor",
    description:
      "A billing terminal accepts two payment modes. Base class Pay declares virtual pay(amount); CardPay and UPIPay override it with their own two-line flow. Read the mode code and the amount, pick the processor polymorphically, pay, and clean up with delete.\n\nInput Format:\nOne line with a character and an integer: 'C' for card, 'U' for UPI, plus the amount in rupees.\n\nOutput Format:\nFor card:\nCard payment started\nCharged <amount> to card\nFor UPI:\nUPI payment started\nSent <amount> via UPI\n\nConstraints:\nCode is 'C' or 'U'; 1 <= amount <= 100000.",
    difficulty: "easy",
    maxscore: 10,
    topic: "Polymorphism",
    subtopic: "Runtime Polymorphism",
    inputconstrains: "Code is 'C' or 'U'; 1 <= amount <= 100000",
    sampleinput1: "C 499",
    sampleinput2: "U 1200",
    input1: "U 750",
    input2: "C 100000",
    input3: "U 1",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class Pay {
public:
    virtual ~Pay() {}
    virtual void pay(int amount) { cout << "Generic payment of " << amount << endl; }
};

class CardPay : public Pay {
public:
    void pay(int amount) {
        cout << "Card payment started" << endl;
        cout << "Charged " << amount << " to card" << endl;
    }
};

class UPIPay : public Pay {
public:
    void pay(int amount) {
        cout << "UPI payment started" << endl;
        cout << "Sent " << amount << " via UPI" << endl;
    }
};

int main() {
    char code;
    int amount;
    cin >> code >> amount;
    Pay* p = nullptr;
    if (code == 'C') p = new CardPay();
    else p = new UPIPay();
    p->pay(amount);    // virtual dispatch picks the mode
    delete p;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Media Player Selector",
    description:
      "A streaming console plays either an audio or a video track chosen by the user. Base class Player declares virtual play(title); AudioPlay and VideoPlay override it. Read the mode code and the track title, create the matching player polymorphically, play through the base pointer, and delete it.\n\nInput Format:\nOne line with a character and a word: 'A' for audio, 'V' for video, plus the track title.\n\nOutput Format:\nPlaying audio track: <title>\nor\nPlaying video track: <title>\n\nConstraints:\nCode is 'A' or 'V'; title is one word of at most 20 letters.",
    difficulty: "easy",
    maxscore: 10,
    topic: "Polymorphism",
    subtopic: "Runtime Polymorphism",
    inputconstrains: "Code is 'A' or 'V'; title is one word of at most 20 letters",
    sampleinput1: "A monsoonmix",
    sampleinput2: "V lecture01",
    input1: "V trailerx",
    input2: "A lofibeats",
    input3: "V movieclip",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

class Player {
public:
    virtual ~Player() {}
    virtual void play(string title) { cout << "Playing: " << title << endl; }
};

class AudioPlay : public Player {
public:
    void play(string title) { cout << "Playing audio track: " << title << endl; }
};

class VideoPlay : public Player {
public:
    void play(string title) { cout << "Playing video track: " << title << endl; }
};

int main() {
    char code;
    string title;
    cin >> code >> title;
    Player* p = nullptr;
    if (code == 'A') p = new AudioPlay();
    else p = new VideoPlay();
    p->play(title);    // virtual dispatch picks the track type
    delete p;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Shape Painter Console",
    description:
      "A classroom painter draws the same shape several times on demand. Base class Shape declares virtual draw(); SquareShape, TriangleShape and CircleShape override it. Read the shape code and a repeat count, create the shape polymorphically, and call draw() that many times through the base pointer.\n\nInput Format:\nOne line with a character and an integer: 'S' square, 'T' triangle, 'C' circle, plus the repeat count.\n\nOutput Format:\nThe chosen shape's draw() line repeated <count> times:\nDrawing a square with 4 sides\nor\nDrawing a triangle with 3 sides\nor\nDrawing a circle with 0 straight sides\n\nConstraints:\nCode is 'S', 'T' or 'C'; 1 <= count <= 5.",
    difficulty: "easy",
    maxscore: 10,
    topic: "Polymorphism",
    subtopic: "Runtime Polymorphism",
    inputconstrains: "Code is 'S', 'T' or 'C'; 1 <= count <= 5",
    sampleinput1: "S 2",
    sampleinput2: "T 1",
    input1: "C 3",
    input2: "S 1",
    input3: "T 4",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class Shape {
public:
    virtual ~Shape() {}
    virtual void draw() { cout << "Drawing a mystery shape" << endl; }
};

class SquareShape : public Shape {
public:
    void draw() { cout << "Drawing a square with 4 sides" << endl; }
};

class TriangleShape : public Shape {
public:
    void draw() { cout << "Drawing a triangle with 3 sides" << endl; }
};

class CircleShape : public Shape {
public:
    void draw() { cout << "Drawing a circle with 0 straight sides" << endl; }
};

int main() {
    char code;
    int times;
    cin >> code >> times;
    Shape* s = nullptr;
    if (code == 'S') s = new SquareShape();
    else if (code == 'T') s = new TriangleShape();
    else s = new CircleShape();
    for (int i = 0; i < times; i++) {
        s->draw();     // virtual dispatch every stroke
    }
    delete s;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },

  // ----------------------------------------------------------------- medium
  {
    title: "Polymorphic Shape Gallery",
    description:
      "An art gallery stores every exhibit in one array of base pointers. Read N shapes, each given as a type code and a size, keep them in an array of Shape pointers, then walk the gallery once calling draw() so each object reports itself polymorphically. Free every object through the base pointer using the virtual destructor.\n\nInput Format:\nFirst line: N. Next N lines: a character ('S' square, 'C' circle) and an integer size.\n\nOutput Format:\nFor each shape in input order:\nSquare with side <size>\nor\nCircle with radius <size>\n\nConstraints:\n1 <= N <= 100; 1 <= size <= 1000.",
    difficulty: "medium",
    maxscore: 20,
    topic: "Polymorphism",
    subtopic: "Polymorphic Collections",
    inputconstrains: "1 <= N <= 100; 1 <= size <= 1000",
    sampleinput1: "3\nS 5\nC 2\nS 1",
    sampleinput2: "2\nC 9\nS 4",
    input1: "1\nS 1000",
    input2: "5\nC 1\nS 2\nC 3\nS 4\nC 5",
    input3: "4\nS 7\nC 7\nS 7\nC 7",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class Shape {
public:
    virtual ~Shape() {}
    virtual void draw() { cout << "Unknown shape" << endl; }
};

class Square : public Shape {
    int side;
public:
    Square(int s) : side(s) {}
    void draw() { cout << "Square with side " << side << endl; }
};

class Circle : public Shape {
    int radius;
public:
    Circle(int r) : radius(r) {}
    void draw() { cout << "Circle with radius " << radius << endl; }
};

int main() {
    int n;
    cin >> n;
    Shape* gallery[100];
    for (int i = 0; i < n; i++) {
        char code;
        int size;
        cin >> code >> size;
        if (code == 'S') gallery[i] = new Square(size);
        else gallery[i] = new Circle(size);
    }
    for (int i = 0; i < n; i++) {
        gallery[i]->draw();   // polymorphic call
    }
    for (int i = 0; i < n; i++) {
        delete gallery[i];
    }
    return 0;
}`,
    blacklist: "printf",
    whitelist: "virtual, class, public, new, delete",
  },
  {
    title: "Default Argument Virtual Trap",
    description:
      "Default arguments are chosen by the static type, while the function body is chosen by the dynamic type. Printer declares virtual badge(int copies = 1); FastPrinter overrides badge(int) (its body prints the Fast printer line). Read an extra copy count and run three calls: p->badge() through a base pointer to a FastPrinter, f.badge(extra) directly on the FastPrinter, and b.badge() on a plain Printer.\n\nInput Format:\nOne line with one integer: extra copies.\n\nOutput Format:\nFast printer prints 1 page(s)\nFast printer prints <extra> page(s)\nBase printer prints 1 page(s)\n(The first line proves the derived body ran with the BASE default argument 1.)\n\nConstraints:\n1 <= extra <= 9.",
    difficulty: "medium",
    maxscore: 20,
    topic: "Polymorphism",
    subtopic: "Virtual Functions",
    inputconstrains: "1 <= extra <= 9",
    sampleinput1: "5",
    sampleinput2: "9",
    input1: "1",
    input2: "3",
    input3: "7",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class Printer {
public:
    virtual ~Printer() {}
    virtual void badge(int copies = 1) {
        cout << "Base printer prints " << copies << " page(s)" << endl;
    }
};

class FastPrinter : public Printer {
public:
    void badge(int copies) {
        cout << "Fast printer prints " << copies << " page(s)" << endl;
    }
};

int main() {
    int extra;
    cin >> extra;
    FastPrinter f;
    Printer* p = &f;
    p->badge();       // derived body runs with the BASE default argument 1
    f.badge(extra);   // direct derived call
    Printer b;
    b.badge();        // base body with its own default
    return 0;
}`,
    blacklist: "printf",
    whitelist: "virtual, class, public",
  },
  {
    title: "Extended Override with Base Call",
    description:
      "An overriding method can reuse the base version with Base::method() and then add extra behaviour. Bill prints the base amount; TaxedBill overrides print(amount), first calls Bill::print(amount), then adds a 10 percent tax (integer division) and the final total.\n\nInput Format:\nOne line with one integer: the bill amount.\n\nOutput Format:\nBase amount: <amount>\nTax added: <amount / 10>\nFinal total: <amount + amount / 10>\n\nConstraints:\n10 <= amount <= 1000000.",
    difficulty: "medium",
    maxscore: 20,
    topic: "Polymorphism",
    subtopic: "Function Overriding",
    inputconstrains: "10 <= amount <= 1000000",
    sampleinput1: "500",
    sampleinput2: "1200",
    input1: "10",
    input2: "9999",
    input3: "77",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class Bill {
public:
    virtual ~Bill() {}
    virtual void print(int amount) {
        cout << "Base amount: " << amount << endl;
    }
};

class TaxedBill : public Bill {
public:
    void print(int amount) {
        Bill::print(amount);              // reuse the base behaviour
        int tax = amount / 10;
        cout << "Tax added: " << tax << endl;
        cout << "Final total: " << amount + tax << endl;
    }
};

int main() {
    int amount;
    cin >> amount;
    TaxedBill t;
    Bill* b = &t;
    b->print(amount);   // virtual dispatch reaches the extended override
    return 0;
}`,
    blacklist: "printf",
    whitelist: "virtual, class, public",
  },
  {
    title: "Overload Resolution Gauntlet",
    description:
      "Overload resolution matches each call to the best-fitting signature without any switch statement. Class Router has five overloads of route(): route(int), route(double), route(int,int), route(double,double) and route(int,double). Read one integer i and one double d and make all five calls.\n\nInput Format:\nOne line with an integer and a double.\n\nOutput Format:\nInt lane: <i>\nDouble lane: <d, 1 decimal>\nInt pair lane: <i + i>\nDouble pair lane: <d + d, 1 decimal>\nMixed lane: <i + d, 1 decimal>\n\nConstraints:\n0 <= i <= 1000; 0.1 <= d <= 999.9 with at most 1 decimal digit.",
    difficulty: "medium",
    maxscore: 20,
    topic: "Polymorphism",
    subtopic: "Compile-Time Polymorphism",
    inputconstrains: "0 <= i <= 1000; 0.1 <= d <= 999.9 with at most 1 decimal digit",
    sampleinput1: "4 2.5",
    sampleinput2: "0 0.5",
    input1: "100 12.3",
    input2: "1 0.1",
    input3: "999 999.9",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
using namespace std;

class Router {
public:
    void route(int v) { cout << "Int lane: " << v << endl; }
    void route(double v) { cout << fixed << setprecision(1) << "Double lane: " << v << endl; }
    void route(int a, int b) { cout << "Int pair lane: " << a + b << endl; }
    void route(double a, double b) { cout << fixed << setprecision(1) << "Double pair lane: " << a + b << endl; }
    void route(int a, double b) { cout << fixed << setprecision(1) << "Mixed lane: " << a + b << endl; }
};

int main() {
    int i;
    double d;
    cin >> i >> d;
    Router r;
    r.route(i);
    r.route(d);
    r.route(i, i);
    r.route(d, d);
    r.route(i, d);
    return 0;
}`,
    blacklist: "printf, virtual",
    whitelist: "class, public, cout",
  },
  {
    title: "Runtime Type Code Switch",
    description:
      "A device dock asks every gadget for its runtime type code and switches on the answer. Base Device declares virtual typeCode() returning 0; Laptop, Phone and Tablet override it to return 1, 2 and 3 and store their charge hours. Read N devices, park them in an array of Device pointers, then loop, call typeCode() polymorphically, and switch on the returned code to print the device line.\n\nInput Format:\nFirst line: N. Next N lines: a character ('L' laptop, 'P' phone, 'T' tablet) and an integer hours.\n\nOutput Format:\nFor each device in input order, according to its runtime code:\nLaptop charged <hours> hours\nPhone charged <hours> hours\nTablet charged <hours> hours\n\nConstraints:\n1 <= N <= 50; 1 <= hours <= 24.",
    difficulty: "medium",
    maxscore: 20,
    topic: "Polymorphism",
    subtopic: "Runtime Polymorphism",
    inputconstrains: "1 <= N <= 50; 1 <= hours <= 24",
    sampleinput1: "2\nL 8\nP 2",
    sampleinput2: "3\nP 1\nT 5\nL 12",
    input1: "1\nT 24",
    input2: "4\nL 3\nP 3\nL 3\nP 3",
    input3: "3\nP 9\nP 9\nP 9",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class Device {
public:
    virtual ~Device() {}
    virtual int typeCode() { return 0; }
    virtual int battery() { return 0; }
};

class Laptop : public Device {
    int hours;
public:
    Laptop(int h) : hours(h) {}
    int typeCode() { return 1; }
    int battery() { return hours; }
};

class Phone : public Device {
    int hours;
public:
    Phone(int h) : hours(h) {}
    int typeCode() { return 2; }
    int battery() { return hours; }
};

class Tablet : public Device {
    int hours;
public:
    Tablet(int h) : hours(h) {}
    int typeCode() { return 3; }
    int battery() { return hours; }
};

int main() {
    int n;
    cin >> n;
    Device* dock[50];
    for (int i = 0; i < n; i++) {
        char code;
        int h;
        cin >> code >> h;
        if (code == 'L') dock[i] = new Laptop(h);
        else if (code == 'P') dock[i] = new Phone(h);
        else dock[i] = new Tablet(h);
    }
    for (int i = 0; i < n; i++) {
        switch (dock[i]->typeCode()) {   // code decided at runtime by the virtual call
            case 1: cout << "Laptop charged " << dock[i]->battery() << " hours" << endl; break;
            case 2: cout << "Phone charged " << dock[i]->battery() << " hours" << endl; break;
            case 3: cout << "Tablet charged " << dock[i]->battery() << " hours" << endl; break;
            default: cout << "Unknown device" << endl;
        }
    }
    for (int i = 0; i < n; i++) delete dock[i];
    return 0;
}`,
    blacklist: "printf",
    whitelist: "virtual, class, public, switch",
  },
  {
    title: "Virtual Destructor Teardown Log",
    description:
      "A control rack builds modules through base pointers and shuts them down in reverse order. Base Module has a virtual destructor printing 'Module shut down'; SensorModule and ClockModule print their own build and removal lines. Read N module codes, build each through new into a base pointer array, then delete from last to first and watch the virtual destructor dispatch.\n\nInput Format:\nFirst line: N. Next N lines: a character ('S' sensor, 'C' clock).\n\nOutput Format:\nOne build line per module in creation order:\nSensor module built\nClock module built\nThen teardown lines as each module is deleted, in reverse order, each followed by 'Module shut down' from the base destructor.\n\nConstraints:\n1 <= N <= 20.",
    difficulty: "medium",
    maxscore: 20,
    topic: "Polymorphism",
    subtopic: "Virtual Functions",
    inputconstrains: "1 <= N <= 20",
    sampleinput1: "2\nS\nC",
    sampleinput2: "3\nC\nS\nC",
    input1: "1\nS",
    input2: "4\nS\nS\nC\nC",
    input3: "2\nC\nC",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class Module {
public:
    virtual ~Module() {
        cout << "Module shut down" << endl;
    }
};

class SensorModule : public Module {
public:
    SensorModule() { cout << "Sensor module built" << endl; }
    ~SensorModule() { cout << "Sensor module removed" << endl; }
};

class ClockModule : public Module {
public:
    ClockModule() { cout << "Clock module built" << endl; }
    ~ClockModule() { cout << "Clock module removed" << endl; }
};

int main() {
    int n;
    cin >> n;
    Module* rack[20];
    for (int i = 0; i < n; i++) {
        char code;
        cin >> code;
        if (code == 'S') rack[i] = new SensorModule();
        else rack[i] = new ClockModule();
    }
    for (int i = n - 1; i >= 0; i--) {
        delete rack[i];   // virtual destructor dispatch, reverse order
    }
    return 0;
}`,
    blacklist: "printf",
    whitelist: "virtual, class, public, delete",
  },

  // ------------------------------------------------------------------- hard
  {
    title: "Zoo Feeding Simulator",
    description:
      "The zoo kitchen feeds every animal through one polymorphic call and then reports the day's tally. Base Animal declares virtual feed() with a generic body; Lion, Elephant and Monkey override feed() with two species-specific lines each. Read N animal codes, store every animal in an array of Animal pointers, feed them all in order, print the summary counts, and delete everything through the base pointer.\n\nInput Format:\nFirst line: N. Next N lines: a character ('L' lion, 'E' elephant, 'M' monkey).\n\nOutput Format:\nFor each animal in input order, its two feed lines:\nLion eats 5 kg of meat / Lion roars after eating\nElephant eats 20 kg of cane / Elephant trumpets happily\nMonkey eats 2 kg of banana / Monkey chatters away\nThen:\n---- Feeding summary ----\nLions fed: <count>\nElephants fed: <count>\nMonkeys fed: <count>\n\nConstraints:\n1 <= N <= 100.",
    difficulty: "hard",
    maxscore: 30,
    topic: "Polymorphism",
    subtopic: "Polymorphic Collections",
    inputconstrains: "1 <= N <= 100",
    sampleinput1: "3\nL\nE\nM",
    sampleinput2: "4\nM\nM\nL\nE",
    input1: "1\nE",
    input2: "5\nL\nL\nL\nL\nL",
    input3: "6\nM\nE\nM\nE\nL\nE",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class Animal {
public:
    virtual ~Animal() {}
    virtual void feed() {
        cout << "Unknown animal eats quietly" << endl;
    }
};

class Lion : public Animal {
public:
    void feed() {
        cout << "Lion eats 5 kg of meat" << endl;
        cout << "Lion roars after eating" << endl;
    }
};

class Elephant : public Animal {
public:
    void feed() {
        cout << "Elephant eats 20 kg of cane" << endl;
        cout << "Elephant trumpets happily" << endl;
    }
};

class Monkey : public Animal {
public:
    void feed() {
        cout << "Monkey eats 2 kg of banana" << endl;
        cout << "Monkey chatters away" << endl;
    }
};

int main() {
    int n;
    cin >> n;
    Animal* zoo[100];
    int lions = 0, elephants = 0, monkeys = 0;
    for (int i = 0; i < n; i++) {
        char code;
        cin >> code;
        if (code == 'L') { zoo[i] = new Lion(); lions++; }
        else if (code == 'E') { zoo[i] = new Elephant(); elephants++; }
        else { zoo[i] = new Monkey(); monkeys++; }
    }
    for (int i = 0; i < n; i++) {
        zoo[i]->feed();   // polymorphic feeding
    }
    cout << "---- Feeding summary ----" << endl;
    cout << "Lions fed: " << lions << endl;
    cout << "Elephants fed: " << elephants << endl;
    cout << "Monkeys fed: " << monkeys << endl;
    for (int i = 0; i < n; i++) delete zoo[i];
    return 0;
}`,
    blacklist: "printf",
    whitelist: "virtual, class, public, new, delete",
  },
  {
    title: "Invoice Discount Chain",
    description:
      "A billing engine applies a different discount policy to every invoice item. Base DiscountPolicy declares virtual apply(amount) and virtual name(); NoDiscount returns the amount unchanged, BulkDiscount takes 10 percent off in whole rupees (amount - amount/10), and LoyaltyDiscount subtracts a flat 50 rupees. Read N items, each with a policy code and a price, apply the selected policy polymorphically, print every item and the totals.\n\nInput Format:\nFirst line: N. Next N lines: a character ('N', 'B' or 'L') and an integer price.\n\nOutput Format:\nFor each item in input order:\nItem <i> (<PolicyName>): <price> -> <payable>\nThen:\nOriginal total: <sum of prices>\nPayable total: <sum of payable>\nSaved: <original - payable>\n\nConstraints:\n1 <= N <= 20; 100 <= price <= 100000; code is 'N', 'B' or 'L'.",
    difficulty: "hard",
    maxscore: 30,
    topic: "Polymorphism",
    subtopic: "Polymorphic Collections",
    inputconstrains: "1 <= N <= 20; 100 <= price <= 100000",
    sampleinput1: "2\nN 500\nB 1000",
    sampleinput2: "3\nL 200\nB 2500\nN 300",
    input1: "1\nN 100",
    input2: "4\nB 101\nB 101\nL 100\nL 100",
    input3: "3\nL 9999\nN 500\nB 999",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

class DiscountPolicy {
public:
    virtual ~DiscountPolicy() {}
    virtual int apply(int amount) { return amount; }
    virtual string name() { return "NoDiscount"; }
};

class NoDiscount : public DiscountPolicy {
public:
    int apply(int amount) { return amount; }
    string name() { return "NoDiscount"; }
};

class BulkDiscount : public DiscountPolicy {
public:
    int apply(int amount) { return amount - amount / 10; }   // 10% off in whole rupees
    string name() { return "BulkDiscount"; }
};

class LoyaltyDiscount : public DiscountPolicy {
public:
    int apply(int amount) { return amount - 50; }            // flat 50 off
    string name() { return "LoyaltyDiscount"; }
};

int main() {
    int n;
    cin >> n;
    DiscountPolicy* policies[3];
    policies[0] = new NoDiscount();
    policies[1] = new BulkDiscount();
    policies[2] = new LoyaltyDiscount();
    int totalOriginal = 0, totalPayable = 0;
    for (int i = 1; i <= n; i++) {
        char code;
        int price;
        cin >> code >> price;
        int idx = 0;
        if (code == 'B') idx = 1;
        else if (code == 'L') idx = 2;
        int payable = policies[idx]->apply(price);   // polymorphic discount
        cout << "Item " << i << " (" << policies[idx]->name() << "): "
             << price << " -> " << payable << endl;
        totalOriginal += price;
        totalPayable += payable;
    }
    cout << "Original total: " << totalOriginal << endl;
    cout << "Payable total: " << totalPayable << endl;
    cout << "Saved: " << totalOriginal - totalPayable << endl;
    for (int i = 0; i < 3; i++) delete policies[i];
    return 0;
}`,
    blacklist: "printf",
    whitelist: "virtual, class, public, new, delete",
  },
  {
    title: "Virtual Destructor Audit Trail",
    description:
      "A server attaches several loggers through base pointers and must prove every derived destructor really runs when shutting down. Base Logger has a virtual destructor printing 'Logger base cleanup done'; FileLogger and NetLogger print their own attach and detach lines with their id. Read N loggers, attach them in order, print an audit separator, then delete each through the base pointer in creation order so the full destructor chain is recorded.\n\nInput Format:\nFirst line: N. Next N lines: a character ('F' file, 'N' network) and an integer id.\n\nOutput Format:\nOne attach line per logger in input order:\nFileLogger <id> attached\nNetLogger <id> attached\nThen:\n---- Shutdown audit ----\nThen per logger, in creation order:\n<File|Net>Logger <id> detached\nLogger base cleanup done\n\nConstraints:\n1 <= N <= 50; 1 <= id <= 999.",
    difficulty: "hard",
    maxscore: 30,
    topic: "Polymorphism",
    subtopic: "Virtual Functions",
    inputconstrains: "1 <= N <= 50; 1 <= id <= 999",
    sampleinput1: "2\nF 1\nN 2",
    sampleinput2: "3\nN 10\nF 20\nN 30",
    input1: "1\nF 999",
    input2: "4\nF 1\nF 2\nN 3\nN 4",
    input3: "2\nN 5\nN 5",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class Logger {
public:
    virtual ~Logger() { cout << "Logger base cleanup done" << endl; }
};

class FileLogger : public Logger {
    int id;
public:
    FileLogger(int i) : id(i) { cout << "FileLogger " << id << " attached" << endl; }
    ~FileLogger() { cout << "FileLogger " << id << " detached" << endl; }
};

class NetLogger : public Logger {
    int id;
public:
    NetLogger(int i) : id(i) { cout << "NetLogger " << id << " attached" << endl; }
    ~NetLogger() { cout << "NetLogger " << id << " detached" << endl; }
};

int main() {
    int n;
    cin >> n;
    Logger* audit[50];
    for (int i = 0; i < n; i++) {
        char code;
        int id;
        cin >> code >> id;
        if (code == 'F') audit[i] = new FileLogger(id);
        else audit[i] = new NetLogger(id);
    }
    cout << "---- Shutdown audit ----" << endl;
    for (int i = 0; i < n; i++) {
        delete audit[i];   // virtual destructor: derived body, then base body
    }
    return 0;
}`,
    blacklist: "printf",
    whitelist: "virtual, class, public, delete",
  },
  {
    title: "Renderer Pipeline Jobs",
    description:
      "A report engine uses the template-method style: base ReportRenderer has a non-virtual render() with a fixed skeleton that calls the virtual steps header(), body() and footer(), and stores the report title. TextRenderer and HtmlRenderer override all three steps. Read N jobs, each with a format code and a title, queue them as base pointers, then render every job polymorphically.\n\nInput Format:\nFirst line: N. Next N lines: a character ('T' text, 'H' html) and a one-word report title.\n\nOutput Format:\nFor each job in input order:\n=== Report: <title> ===\nText job:\nTEXT header for <title>\nTEXT body lines\nTEXT footer signature\nHtml job:\n<h1><title></h1>\n<p>report body</p>\n<small>generated by atom</small>\nBoth end with:\n=== End of report ===\n\nConstraints:\n1 <= N <= 20; title is one word of at most 20 letters.",
    difficulty: "hard",
    maxscore: 30,
    topic: "Polymorphism",
    subtopic: "Runtime Polymorphism",
    inputconstrains: "1 <= N <= 20; title is one word of at most 20 letters",
    sampleinput1: "2\nT sales\nH demo",
    sampleinput2: "1\nH quarterly",
    input1: "1\nT summary",
    input2: "3\nH one\nT two\nH three",
    input3: "2\nT alpha\nT beta",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

class ReportRenderer {
protected:
    string title;
public:
    ReportRenderer(string t) : title(t) {}
    virtual ~ReportRenderer() {}
    // fixed skeleton with virtual steps (template method style)
    void render() {
        cout << "=== Report: " << title << " ===" << endl;
        header();
        body();
        footer();
        cout << "=== End of report ===" << endl;
    }
    virtual void header() { cout << "Plain header" << endl; }
    virtual void body() { cout << "Plain body" << endl; }
    virtual void footer() { cout << "Plain footer" << endl; }
};

class TextRenderer : public ReportRenderer {
public:
    TextRenderer(string t) : ReportRenderer(t) {}
    void header() { cout << "TEXT header for " << title << endl; }
    void body() { cout << "TEXT body lines" << endl; }
    void footer() { cout << "TEXT footer signature" << endl; }
};

class HtmlRenderer : public ReportRenderer {
public:
    HtmlRenderer(string t) : ReportRenderer(t) {}
    void header() { cout << "<h1>" << title << "</h1>" << endl; }
    void body() { cout << "<p>report body</p>" << endl; }
    void footer() { cout << "<small>generated by atom</small>" << endl; }
};

int main() {
    int n;
    cin >> n;
    ReportRenderer* jobs[20];
    for (int i = 0; i < n; i++) {
        char code;
        string title;
        cin >> code >> title;
        if (code == 'T') jobs[i] = new TextRenderer(title);
        else jobs[i] = new HtmlRenderer(title);
    }
    for (int i = 0; i < n; i++) {
        jobs[i]->render();   // skeleton fixed, steps polymorphic
    }
    for (int i = 0; i < n; i++) delete jobs[i];
    return 0;
}`,
    blacklist: "printf",
    whitelist: "virtual, class, public",
  },
];

export const mcqs = [
  // ------------------------------------------------------------------ easy
  {
    title: "Meaning of Polymorphism",
    description: "What does polymorphism mean in object-oriented programming?",
    difficulty: "easy",
    topic: "Polymorphism",
    subtopic: "Runtime Polymorphism",
    Option1: "Writing programs without any classes",
    Option2: "One name, many forms - the same interface behaving differently in different contexts",
    Option3: "Hiding data members inside a class",
    Option4: "Copying one object into another object",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Feature Behind Compile-Time Polymorphism",
    description: "Which C++ feature provides compile-time (static) polymorphism?",
    difficulty: "easy",
    topic: "Polymorphism",
    subtopic: "Compile-Time Polymorphism",
    Option1: "Virtual functions",
    Option2: "dynamic_cast",
    Option3: "Function overloading",
    Option4: "Runtime type information",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Keyword for Virtual Dispatch",
    description: "Which keyword, used in the base class declaration, enables runtime (dynamic) dispatch of a method?",
    difficulty: "easy",
    topic: "Polymorphism",
    subtopic: "Virtual Functions",
    Option1: "virtual",
    Option2: "static",
    Option3: "friend",
    Option4: "inline",
    CorrectOption: 1,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "What Function Overriding Means",
    description: "What is function overriding in C++?",
    difficulty: "easy",
    topic: "Polymorphism",
    subtopic: "Function Overriding",
    Option1: "Two functions with the same name but different parameter lists in one class",
    Option2: "Redefining a base class method in a derived class with the same signature",
    Option3: "Calling a function before it has been declared",
    Option4: "Passing a function as an argument to another function",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Overriding Versus Overloading",
    description: "Which statement correctly distinguishes overriding from overloading?",
    difficulty: "easy",
    topic: "Polymorphism",
    subtopic: "Compile-Time Polymorphism",
    Option1: "Overloading happens at runtime while overriding happens at compile time",
    Option2: "Overriding needs different parameter lists while overloading needs the same signature",
    Option3: "Overloading only works through base class pointers",
    Option4: "Overloading is the same name with different signatures in one scope; overriding is the same signature redefined in a derived class",
    CorrectOption: 4,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Purpose of a Virtual Function",
    description: "What is the main purpose of declaring a function virtual in the base class?",
    difficulty: "easy",
    topic: "Polymorphism",
    subtopic: "Virtual Functions",
    Option1: "To let a base pointer or reference pick the derived class version at runtime",
    Option2: "To make the function execute faster",
    Option3: "To allow the function to be called without any object",
    Option4: "To stop the function from being inherited",
    CorrectOption: 1,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Base Pointer Virtual Call Result",
    description: "A base class pointer stores the address of a derived object and calls a virtual method. Which version of the method runs?",
    difficulty: "easy",
    topic: "Polymorphism",
    subtopic: "Base Pointers and Derived Objects",
    Option1: "Always the base class version",
    Option2: "Neither version runs",
    Option3: "The derived class version",
    Option4: "It depends on the pointer's declared type",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "When Overloads Are Resolved",
    description: "When is the choice among overloaded functions (compile-time polymorphism) made?",
    difficulty: "easy",
    topic: "Polymorphism",
    subtopic: "Compile-Time Polymorphism",
    Option1: "While the program is running",
    Option2: "At compile time, based on the argument list",
    Option3: "When the object is deleted",
    Option4: "Only at link time",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "True Statement About Virtual Functions",
    description: "Which statement about virtual functions is true?",
    difficulty: "easy",
    topic: "Polymorphism",
    subtopic: "Virtual Functions",
    Option1: "A virtual function must be declared static",
    Option2: "A virtual function cannot be overridden in a derived class",
    Option3: "Virtual functions can only be called with objects, never pointers",
    Option4: "Once a function is virtual in the base class, its overrides in derived classes are virtual automatically",
    CorrectOption: 4,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Tools Behind Runtime Polymorphism",
    description: "Runtime polymorphism in C++ is achieved using:",
    difficulty: "easy",
    topic: "Polymorphism",
    subtopic: "Runtime Polymorphism",
    Option1: "Macros and #define directives",
    Option2: "Global variables",
    Option3: "Virtual functions together with base class pointers or references",
    Option4: "Static member functions",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },

  // ----------------------------------------------------------------- medium
  {
    title: "Why the Base Method Must Be Virtual",
    description: "Through a base pointer to a derived object, a NON-virtual base method is called. What happens and why?",
    difficulty: "medium",
    topic: "Polymorphism",
    subtopic: "Base Pointers and Derived Objects",
    Option1: "The derived version runs because the actual object is derived",
    Option2: "The base version runs because binding is static when the method is not virtual",
    Option3: "The program crashes at runtime",
    Option4: "The compiler chooses whichever function was defined first",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "What the override Keyword Guarantees",
    description: "In modern C++, what does marking a derived function with the override keyword guarantee?",
    difficulty: "medium",
    topic: "Polymorphism",
    subtopic: "Function Overriding",
    Option1: "The function becomes static",
    Option2: "The function can no longer be called through a pointer",
    Option3: "The compiler verifies the function really overrides a base class virtual method with a matching signature",
    Option4: "The function runs faster than an ordinary member function",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Pointer Picks the Derived Version",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "Polymorphism",
    subtopic: "Base Pointers and Derived Objects",
    Option1: "Square side 4",
    Option2: "Generic shape",
    Option3: "Compile error",
    Option4: "Nothing is printed",
    CorrectOption: 1,
    codesnippet: `#include <iostream>
using namespace std;
class Shape {
public:
    virtual void info() { cout << "Generic shape"; }
};
class Square : public Shape {
public:
    void info() { cout << "Square side 4"; }
};
int main() {
    Shape* p = new Square();
    p->info();
    delete p;
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nclass Shape {\npublic:\n    virtual void info() { cout << "Generic shape"; }\n};\nclass Square : public Shape {\npublic:\n    void info() { cout << "Square side 4"; }\n};\nint main() {\n    Shape* p = new Square();\n    p->info();\n    delete p;\n    return 0;\n}`,
      stdin: "",
      expected: "Square side 4",
    },
  },
  {
    title: "Overload Lane Prediction",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "Polymorphism",
    subtopic: "Compile-Time Polymorphism",
    Option1: "int lane 3 and int lane 4",
    Option2: "int lane 3 and double lane 4.5",
    Option3: "double lane 3.0 and double lane 4.5",
    Option4: "Compile error",
    CorrectOption: 2,
    codesnippet: `#include <iostream>
using namespace std;
void lane(int x) { cout << "int lane " << x; }
void lane(double x) { cout << "double lane " << x; }
int main() {
    lane(3);
    cout << " and ";
    lane(4.5);
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nvoid lane(int x) { cout << "int lane " << x; }\nvoid lane(double x) { cout << "double lane " << x; }\nint main() {\n    lane(3);\n    cout << " and ";\n    lane(4.5);\n    return 0;\n}`,
      stdin: "",
      expected: "int lane 3 and double lane 4.5",
    },
  },
  {
    title: "Friendly Greeter Output Prediction",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "Polymorphism",
    subtopic: "Function Overriding",
    Option1: "Hello from Greeter",
    Option2: "Compile error",
    Option3: "Both greetings printed on one line",
    Option4: "Hi from FriendlyGreeter",
    CorrectOption: 4,
    codesnippet: `#include <iostream>
using namespace std;
class Greeter {
public:
    virtual void hello() { cout << "Hello from Greeter"; }
};
class FriendlyGreeter : public Greeter {
public:
    void hello() { cout << "Hi from FriendlyGreeter"; }
};
int main() {
    FriendlyGreeter g;
    Greeter* p = &g;
    p->hello();
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nclass Greeter {\npublic:\n    virtual void hello() { cout << "Hello from Greeter"; }\n};\nclass FriendlyGreeter : public Greeter {\npublic:\n    void hello() { cout << "Hi from FriendlyGreeter"; }\n};\nint main() {\n    FriendlyGreeter g;\n    Greeter* p = &g;\n    p->hello();\n    return 0;\n}`,
      stdin: "",
      expected: "Hi from FriendlyGreeter",
    },
  },
  {
    title: "Farm Sound Loop Prediction",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "Polymorphism",
    subtopic: "Polymorphic Collections",
    Option1: "Meow Moo",
    Option2: "Moo Meow",
    Option3: "... ...",
    Option4: "MeowMeow",
    CorrectOption: 1,
    codesnippet: `#include <iostream>
using namespace std;
class Animal {
public:
    virtual void sound() { cout << "..."; }
};
class Cat : public Animal {
public:
    void sound() { cout << "Meow"; }
};
class Cow : public Animal {
public:
    void sound() { cout << "Moo"; }
};
int main() {
    Animal* farm[2];
    farm[0] = new Cat();
    farm[1] = new Cow();
    for (int i = 0; i < 2; i++) {
        if (i > 0) cout << " ";
        farm[i]->sound();
    }
    for (int i = 0; i < 2; i++) delete farm[i];
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nclass Animal {\npublic:\n    virtual void sound() { cout << "..."; }\n};\nclass Cat : public Animal {\npublic:\n    void sound() { cout << "Meow"; }\n};\nclass Cow : public Animal {\npublic:\n    void sound() { cout << "Moo"; }\n};\nint main() {\n    Animal* farm[2];\n    farm[0] = new Cat();\n    farm[1] = new Cow();\n    for (int i = 0; i < 2; i++) {\n        if (i > 0) cout << " ";\n        farm[i]->sound();\n    }\n    for (int i = 0; i < 2; i++) delete farm[i];\n    return 0;\n}`,
      stdin: "",
      expected: "Meow Moo",
    },
  },

  // ------------------------------------------------------------------- hard
  {
    title: "Virtual Call Inside Constructor",
    description: "What does this program print? Remember which version of a virtual function runs while the base constructor is still executing.",
    difficulty: "hard",
    topic: "Polymorphism",
    subtopic: "Virtual Functions",
    Option1: "Welcome from Derived",
    Option2: "Welcome from Base",
    Option3: "Both greetings printed",
    Option4: "Compile error",
    CorrectOption: 2,
    codesnippet: `#include <iostream>
using namespace std;
class Base {
public:
    Base() { welcome(); }
    virtual void welcome() { cout << "Welcome from Base"; }
};
class Derived : public Base {
public:
    void welcome() { cout << "Welcome from Derived"; }
};
int main() {
    Derived d;
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nclass Base {\npublic:\n    Base() { welcome(); }\n    virtual void welcome() { cout << "Welcome from Base"; }\n};\nclass Derived : public Base {\npublic:\n    void welcome() { cout << "Welcome from Derived"; }\n};\nint main() {\n    Derived d;\n    return 0;\n}`,
      stdin: "",
      expected: "Welcome from Base",
    },
  },
  {
    title: "Mixed Task List Dispatch",
    description: "What does this program print?",
    difficulty: "hard",
    topic: "Polymorphism",
    subtopic: "Polymorphic Collections",
    Option1: "build,test,build",
    Option2: "idle,idle,idle",
    Option3: "build,build,test",
    Option4: "test,build,test",
    CorrectOption: 1,
    codesnippet: `#include <iostream>
using namespace std;
class Task {
public:
    virtual void run() { cout << "idle"; }
};
class Build : public Task {
public:
    void run() { cout << "build"; }
};
class Test : public Task {
public:
    void run() { cout << "test"; }
};
int main() {
    Task* queue[3];
    queue[0] = new Build();
    queue[1] = new Test();
    queue[2] = new Build();
    for (int i = 0; i < 3; i++) {
        queue[i]->run();
        if (i < 2) cout << ",";
    }
    for (int i = 0; i < 3; i++) delete queue[i];
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nclass Task {\npublic:\n    virtual void run() { cout << "idle"; }\n};\nclass Build : public Task {\npublic:\n    void run() { cout << "build"; }\n};\nclass Test : public Task {\npublic:\n    void run() { cout << "test"; }\n};\nint main() {\n    Task* queue[3];\n    queue[0] = new Build();\n    queue[1] = new Test();\n    queue[2] = new Build();\n    for (int i = 0; i < 3; i++) {\n        queue[i]->run();\n        if (i < 2) cout << ",";\n    }\n    for (int i = 0; i < 3; i++) delete queue[i];\n    return 0;\n}`,
      stdin: "",
      expected: "build,test,build",
    },
  },
  {
    title: "Destructor Chain Trace",
    description: "What does this program print when the derived object is deleted through the base pointer?",
    difficulty: "hard",
    topic: "Polymorphism",
    subtopic: "Virtual Functions",
    Option1: "B",
    Option2: "BC",
    Option3: "CB",
    Option4: "Nothing is printed",
    CorrectOption: 3,
    codesnippet: `#include <iostream>
using namespace std;
class Box {
public:
    virtual ~Box() { cout << "B"; }
};
class Crate : public Box {
public:
    ~Crate() { cout << "C"; }
};
int main() {
    Box* p = new Crate();
    delete p;
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nclass Box {\npublic:\n    virtual ~Box() { cout << "B"; }\n};\nclass Crate : public Box {\npublic:\n    ~Crate() { cout << "C"; }\n};\nint main() {\n    Box* p = new Crate();\n    delete p;\n    return 0;\n}`,
      stdin: "",
      expected: "CB",
    },
  },
  {
    title: "What a vtable Is",
    description: "At a high level, what is a vtable (virtual function table) in C++?",
    difficulty: "hard",
    topic: "Polymorphism",
    subtopic: "Runtime Polymorphism",
    Option1: "A table that stores the data members of every object",
    Option2: "A per-class table of function pointers that the compiler builds so virtual calls can be resolved at runtime",
    Option3: "A list of header files included by a class",
    Option4: "A table of variable names maintained by the linker",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
];
