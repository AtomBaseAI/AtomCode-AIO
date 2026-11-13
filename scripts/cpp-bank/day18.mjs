/**
 * OOPS using CPP — Day 18: Overview of Abstract Classes, Virtual Destructors, Pure Virtual Functions, Interfaces
 * 20 code questions (10 easy: 6 basics + 4 real-world, 6 medium, 4 hard)
 * 20 MCQs (10 easy, 6 medium, 4 hard)
 * All solutions are fresh C++ written for this course (no conversions).
 */
export const meta = {
  day: 18,
  topic: "Advanced OOP (Abstract Classes, Virtual Functions)",
};

export const code = [
  // ------------------------------------------------------------------ easy
  {
    title: "Shape Area Through Abstract Base",
    description:
      "Abstract classes define a contract without implementation. Shape declares a pure virtual area() = 0 and can never be created itself; Circle and Square inherit and each supply the real area formula. Read the shape code and its size, build the right object through a Shape pointer, and print the polymorphic area with two decimal places.\n\nInput Format:\nOne line with a character (C for circle, S for square) and one number: the radius for C or the side for S.\n\nOutput Format:\nArea: <value with exactly 2 decimals>\n\nConstraints:\nCode is C or S; 1 <= size <= 1000.",
    difficulty: "easy",
    maxscore: 10,
    topic: "Advanced OOP (Abstract Classes, Virtual Functions)",
    subtopic: "Pure Virtual Functions",
    inputconstrains: "Code is C or S; 1 <= size <= 1000",
    sampleinput1: "C 2",
    sampleinput2: "S 5",
    input1: "C 1",
    input2: "S 100",
    input3: "C 10",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
using namespace std;

class Shape {
public:
    virtual double area() = 0;   // pure virtual: Shape is abstract
    virtual ~Shape() {}
};

class Circle : public Shape {
    double radius;
public:
    Circle(double r) : radius(r) {}
    double area() { return 3.14159 * radius * radius; }
};

class Square : public Shape {
    double side;
public:
    Square(double s) : side(s) {}
    double area() { return side * side; }
};

int main() {
    char code;
    double size;
    cin >> code >> size;
    Shape* s = nullptr;
    if (code == 'C') s = new Circle(size);
    else s = new Square(size);
    cout << fixed << setprecision(2) << "Area: " << s->area() << endl;
    delete s;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Animal Sounds via Pure Virtual",
    description:
      "Every pet answers differently, yet the kennel desk treats them all as one type. Animal declares a pure virtual speak(); Dog and Cat each override it with their own sound. Read the pet code and name, create the matching animal through an Animal pointer, and make it speak polymorphically.\n\nInput Format:\nOne line with a character (D for dog, C for cat) and the pet's name (single word).\n\nOutput Format:\n<name> says <sound>   (Dog says Woof, Cat says Meow)\n\nConstraints:\nCode is D or C; 1 <= name length <= 20.",
    difficulty: "easy",
    maxscore: 10,
    topic: "Advanced OOP (Abstract Classes, Virtual Functions)",
    subtopic: "Pure Virtual Functions",
    inputconstrains: "Code is D or C; 1 <= name length <= 20",
    sampleinput1: "D Bruno",
    sampleinput2: "C Kitty",
    input1: "D Rex",
    input2: "C Mani",
    input3: "D Scooby",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

class Animal {
public:
    virtual void speak() = 0;   // pure virtual: Animal is abstract
    virtual ~Animal() {}
};

class Dog : public Animal {
public:
    void speak() { cout << "Woof" << endl; }
};

class Cat : public Animal {
public:
    void speak() { cout << "Meow" << endl; }
};

int main() {
    char code;
    string name;
    cin >> code >> name;
    Animal* a = nullptr;
    if (code == 'D') a = new Dog();
    else a = new Cat();
    cout << name << " says ";
    a->speak();
    delete a;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Abstract Machine Work Report",
    description:
      "An abstract class can mix ready-made behaviour with pure contracts. Machine provides the concrete method ready() that prints 'Machine ready', while work() stays pure virtual. Printer and Scanner complete the contract with their own work lines. Read the machine code and unit number, then print both the shared concrete step and the derived step.\n\nInput Format:\nOne line with a character (P for printer, S for scanner) and an integer unit number.\n\nOutput Format:\nMachine ready\n<work line> on unit <unit>   (Printing job for P, Scanning page for S)\n\nConstraints:\nCode is P or S; 1 <= unit <= 1000.",
    difficulty: "easy",
    maxscore: 10,
    topic: "Advanced OOP (Abstract Classes, Virtual Functions)",
    subtopic: "Abstract Classes",
    inputconstrains: "Code is P or S; 1 <= unit <= 1000",
    sampleinput1: "P 7",
    sampleinput2: "S 3",
    input1: "P 1",
    input2: "S 99",
    input3: "P 1000",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class Machine {
public:
    void ready() { cout << "Machine ready" << endl; }   // concrete method
    virtual void work() = 0;                            // pure virtual
    virtual ~Machine() {}
};

class Printer : public Machine {
public:
    void work() { cout << "Printing job on unit " << unit << endl; }
    Printer(int u) : unit(u) {}
private:
    int unit;
};

class Scanner : public Machine {
public:
    void work() { cout << "Scanning page on unit " << unit << endl; }
    Scanner(int u) : unit(u) {}
private:
    int unit;
};

int main() {
    char code;
    int unit;
    cin >> code >> unit;
    Machine* m = nullptr;
    if (code == 'P') m = new Printer(unit);
    else m = new Scanner(unit);
    m->ready();   // concrete method from the abstract base
    m->work();    // derived implementation
    delete m;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Abstract Employee Salary Desk",
    description:
      "A payroll desk treats every worker as an Employee but pays them differently. The abstract Employee class declares pure virtual salary(); a Manager adds a bonus to a fixed base, a Worker multiplies hourly rate by hours worked. Read the employee code, create the right object through an Employee pointer and print the computed salary.\n\nInput Format:\nOne line starting with a character: M followed by base and bonus, or W followed by rate and hours (all integers).\n\nOutput Format:\nSalary: <computed salary>\n\nConstraints:\n1 <= each value <= 1000000; code is M or W.",
    difficulty: "easy",
    maxscore: 10,
    topic: "Advanced OOP (Abstract Classes, Virtual Functions)",
    subtopic: "Abstract Class Design",
    inputconstrains: "1 <= each value <= 1000000; code is M or W",
    sampleinput1: "M 50000 8000",
    sampleinput2: "W 250 160",
    input1: "M 100000 0",
    input2: "W 100 1",
    input3: "W 500 80",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class Employee {
public:
    virtual int salary() = 0;   // pure virtual
    virtual ~Employee() {}
};

class Manager : public Employee {
    int base, bonus;
public:
    Manager(int b, int bo) : base(b), bonus(bo) {}
    int salary() { return base + bonus; }
};

class Worker : public Employee {
    int rate, hours;
public:
    Worker(int r, int h) : rate(r), hours(h) {}
    int salary() { return rate * hours; }
};

int main() {
    char code;
    cin >> code;
    Employee* e = nullptr;
    if (code == 'M') {
        int base, bonus;
        cin >> base >> bonus;
        e = new Manager(base, bonus);
    } else {
        int rate, hours;
        cin >> rate >> hours;
        e = new Worker(rate, hours);
    }
    cout << "Salary: " << e->salary() << endl;
    delete e;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Interface Encoder Pair",
    description:
      "An interface is a class made only of pure virtual functions — a pure contract with no data and no bodies. Encoder declares pure virtual encode(n) and nothing else; DoubleEncoder returns twice the number and SquareEncoder returns its square. Read the implementation code and the number, then print the encoded value through the interface pointer.\n\nInput Format:\nOne line with a character (D for double encoder, S for square encoder) and an integer n.\n\nOutput Format:\nEncoded: <result>\n\nConstraints:\n1 <= n <= 100000; code is D or S.",
    difficulty: "easy",
    maxscore: 10,
    topic: "Advanced OOP (Abstract Classes, Virtual Functions)",
    subtopic: "Interfaces in C++",
    inputconstrains: "1 <= n <= 100000; code is D or S",
    sampleinput1: "D 21",
    sampleinput2: "S 9",
    input1: "S 1",
    input2: "D 500",
    input3: "S 25",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

// Interface: only pure virtual functions
class Encoder {
public:
    virtual int encode(int n) = 0;
    virtual ~Encoder() {}
};

class DoubleEncoder : public Encoder {
public:
    int encode(int n) { return 2 * n; }
};

class SquareEncoder : public Encoder {
public:
    int encode(int n) { return n * n; }
};

int main() {
    char code;
    int n;
    cin >> code >> n;
    Encoder* enc = nullptr;
    if (code == 'D') enc = new DoubleEncoder();
    else enc = new SquareEncoder();
    cout << "Encoded: " << enc->encode(n) << endl;
    delete enc;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Vehicle Fleet Wheel Counter",
    description:
      "A fleet desk counts wheels without caring which vehicle parks where. The abstract Vehicle class declares pure virtual wheels() returning an int; Car has 4, Bike has 2 and Auto has 3. Read the vehicle code and the fleet size, then print the total wheel count using polymorphism.\n\nInput Format:\nOne line with a character (C for car, B for bike, A for auto) and an integer count of vehicles.\n\nOutput Format:\nTotal wheels: <wheels per vehicle * count>\n\nConstraints:\nCode is C, B or A; 1 <= count <= 1000.",
    difficulty: "easy",
    maxscore: 10,
    topic: "Advanced OOP (Abstract Classes, Virtual Functions)",
    subtopic: "Abstract Classes",
    inputconstrains: "Code is C, B or A; 1 <= count <= 1000",
    sampleinput1: "C 10",
    sampleinput2: "B 7",
    input1: "A 9",
    input2: "C 1",
    input3: "A 100",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class Vehicle {
public:
    virtual int wheels() = 0;   // pure virtual returning int
    virtual ~Vehicle() {}
};

class Car : public Vehicle {
public:
    int wheels() { return 4; }
};

class Bike : public Vehicle {
public:
    int wheels() { return 2; }
};

class Auto : public Vehicle {
public:
    int wheels() { return 3; }
};

int main() {
    char code;
    int count;
    cin >> code >> count;
    Vehicle* v = nullptr;
    if (code == 'C') v = new Car();
    else if (code == 'B') v = new Bike();
    else v = new Auto();
    cout << "Total wheels: " << v->wheels() * count << endl;
    delete v;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },

  // ------------------------------------------------- easy: real-world scenarios
  {
    title: "Checkout Payment Gateway Interface",
    description:
      "Online checkouts settle money through a payment interface. Pay is a pure interface with only pure virtual functions; charge(amount) returns what the customer actually pays. CardPay adds a 2 percent gateway fee (amount + amount/50) while UPIPay applies a 1 percent instant cashback (amount - amount/100). Read the mode code and the amount, then print the payable figure.\n\nInput Format:\nOne line with a character (C for card, U for UPI) and an integer amount.\n\nOutput Format:\nPayable: <amount returned by charge>\n\nConstraints:\n100 <= amount <= 1000000; code is C or U.",
    difficulty: "easy",
    maxscore: 10,
    topic: "Advanced OOP (Abstract Classes, Virtual Functions)",
    subtopic: "Interfaces in C++",
    inputconstrains: "100 <= amount <= 1000000; code is C or U",
    sampleinput1: "C 1000",
    sampleinput2: "U 1000",
    input1: "C 250",
    input2: "U 150",
    input3: "C 100",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

// Pure interface: only pure virtual functions
class Pay {
public:
    virtual int charge(int amount) = 0;
    virtual ~Pay() {}
};

class CardPay : public Pay {
public:
    int charge(int amount) { return amount + amount / 50; }   // +2% fee
};

class UPIPay : public Pay {
public:
    int charge(int amount) { return amount - amount / 100; }  // -1% cashback
};

int main() {
    char code;
    int amount;
    cin >> code >> amount;
    Pay* p = nullptr;
    if (code == 'C') p = new CardPay();
    else p = new UPIPay();
    cout << "Payable: " << p->charge(amount) << endl;
    delete p;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Alert Broadcast Interface",
    description:
      "A monitoring hub broadcasts alerts through a notification interface. Notifier declares pure virtual send(msg) and nothing else; EmailAlert prints an EMAIL line and SMSAlert prints an SMS line. Read the channel code, then the whole message line (it may contain spaces), and dispatch polymorphically through the interface pointer.\n\nInput Format:\nFirst a character (E for email, S for SMS), then after one space (or on the next line) the message text.\n\nOutput Format:\nEMAIL: <message>\nor\nSMS: <message>\n\nConstraints:\nCode is E or S; 1 <= message length <= 60.",
    difficulty: "easy",
    maxscore: 10,
    topic: "Advanced OOP (Abstract Classes, Virtual Functions)",
    subtopic: "Interfaces in C++",
    inputconstrains: "Code is E or S; 1 <= message length <= 60",
    sampleinput1: "E Server down now",
    sampleinput2: "S Class at 9 AM",
    input1: "S Bus route 42 changed",
    input2: "E Exam on Monday",
    input3: "S Meet at gate 5",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

// Pure interface
class Notifier {
public:
    virtual void send(const string& msg) = 0;
    virtual ~Notifier() {}
};

class EmailAlert : public Notifier {
public:
    void send(const string& msg) { cout << "EMAIL: " << msg << endl; }
};

class SMSAlert : public Notifier {
public:
    void send(const string& msg) { cout << "SMS: " << msg << endl; }
};

int main() {
    char code;
    string msg;
    cin >> code;
    cin.ignore();          // skip the single separating character
    getline(cin, msg);     // message may contain spaces
    Notifier* n = nullptr;
    if (code == 'E') n = new EmailAlert();
    else n = new SMSAlert();
    n->send(msg);
    delete n;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Storage Backend Interface Report",
    description:
      "A backup tool saves files either on a local drive or in the cloud behind one storage interface. Storage declares pure virtual save(mb) and nothing else; LocalDrive consumes exactly mb megabytes while CloudDrive compresses to half (mb / 2). Read the backend code and the file size, then report the space used.\n\nInput Format:\nOne line with a character (L for local, C for cloud) and an integer size in MB.\n\nOutput Format:\nUsed: <mb consumed by the chosen backend> MB\n\nConstraints:\n1 <= size <= 1000000; code is L or C.",
    difficulty: "easy",
    maxscore: 10,
    topic: "Advanced OOP (Abstract Classes, Virtual Functions)",
    subtopic: "Interfaces in C++",
    inputconstrains: "1 <= size <= 1000000; code is L or C",
    sampleinput1: "L 100",
    sampleinput2: "C 100",
    input1: "C 7",
    input2: "L 1",
    input3: "C 999",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

// Pure interface
class Storage {
public:
    virtual int save(int mb) = 0;
    virtual ~Storage() {}
};

class LocalDrive : public Storage {
public:
    int save(int mb) { return mb; }
};

class CloudDrive : public Storage {
public:
    int save(int mb) { return mb / 2; }   // compression halves the usage
};

int main() {
    char code;
    int mb;
    cin >> code >> mb;
    Storage* s = nullptr;
    if (code == 'L') s = new LocalDrive();
    else s = new CloudDrive();
    cout << "Used: " << s->save(mb) << " MB" << endl;
    delete s;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Commute Fare Interface Counter",
    description:
      "Daily commutes can be billed through a fare interface. Fare declares pure virtual fare(km); BusFare charges 5 rupees per kilometre flat, MetroFare charges a 10 rupee base plus 3 rupees per kilometre. Read the mode code and the distance, then print the fare through the interface pointer.\n\nInput Format:\nOne line with a character (B for bus, M for metro) and an integer distance in km.\n\nOutput Format:\nFare: <fare> rupees\n\nConstraints:\n1 <= km <= 1000; code is B or M.",
    difficulty: "easy",
    maxscore: 10,
    topic: "Advanced OOP (Abstract Classes, Virtual Functions)",
    subtopic: "Abstract Class Design",
    inputconstrains: "1 <= km <= 1000; code is B or M",
    sampleinput1: "B 8",
    sampleinput2: "M 8",
    input1: "M 1",
    input2: "B 1",
    input3: "M 100",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

// Pure interface
class Fare {
public:
    virtual int fare(int km) = 0;
    virtual ~Fare() {}
};

class BusFare : public Fare {
public:
    int fare(int km) { return 5 * km; }
};

class MetroFare : public Fare {
public:
    int fare(int km) { return 10 + 3 * km; }
};

int main() {
    char code;
    int km;
    cin >> code >> km;
    Fare* f = nullptr;
    if (code == 'B') f = new BusFare();
    else f = new MetroFare();
    cout << "Fare: " << f->fare(km) << " rupees" << endl;
    delete f;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },

  // ----------------------------------------------------------------- medium
  {
    title: "Protected Base Report Builder",
    description:
      "Abstract bases can do real work for their children. Invoice stores items and rate in protected members, exposes the concrete helper subtotal() = items * rate, and leaves total() pure virtual. GSTInvoice finishes the job by adding 18 percent tax (subtotal * 18 / 100); DiscountInvoice removes 10 percent (subtotal / 10). Read the invoice code and numbers, then print the base-computed subtotal and the derived-computed total.\n\nInput Format:\nOne line with a character (G for GST invoice, D for discount invoice), an integer item count and an integer rate per item.\n\nOutput Format:\nSubtotal: <items * rate>\nTotal: <total computed by the derived class>\n\nConstraints:\n1 <= items <= 10000; 1 <= rate <= 100000; code is G or D.",
    difficulty: "medium",
    maxscore: 20,
    topic: "Advanced OOP (Abstract Classes, Virtual Functions)",
    subtopic: "Abstract Class Design",
    inputconstrains: "1 <= items <= 10000; 1 <= rate <= 100000; code is G or D",
    sampleinput1: "G 10 50",
    sampleinput2: "D 10 50",
    input1: "G 3 99",
    input2: "D 1 1",
    input3: "G 7 1000",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class Invoice {
protected:
    int items;
    int rate;
public:
    Invoice(int i, int r) : items(i), rate(r) {}
    int subtotal() { return items * rate; }   // concrete, uses protected data
    virtual int total() = 0;                  // derived classes finish the work
    virtual ~Invoice() {}
};

class GSTInvoice : public Invoice {
public:
    GSTInvoice(int i, int r) : Invoice(i, r) {}
    int total() { return subtotal() + subtotal() * 18 / 100; }
};

class DiscountInvoice : public Invoice {
public:
    DiscountInvoice(int i, int r) : Invoice(i, r) {}
    int total() { return subtotal() - subtotal() / 10; }
};

int main() {
    char code;
    int items, rate;
    cin >> code >> items >> rate;
    Invoice* inv = nullptr;
    if (code == 'G') inv = new GSTInvoice(items, rate);
    else inv = new DiscountInvoice(items, rate);
    cout << "Subtotal: " << inv->subtotal() << endl;
    cout << "Total: " << inv->total() << endl;
    delete inv;
    return 0;
}`,
    blacklist: "printf",
    whitelist: "virtual, class, protected, public",
  },
  {
    title: "Deleting Through the Base Pointer",
    description:
      "A memory auditor deletes cache objects only through the abstract base pointer. Cache declares pure virtual size() and a virtual destructor that prints the base release line; RamCache and DiskCache print their own construction and teardown lines, and the derived destructor always runs before the base one when the destructor is virtual. Read the cache code, attach the cache, report its blocks and delete it through the base pointer to prove the virtual destructor chain.\n\nInput Format:\nOne line with a character (R for ram cache, D for disk cache).\n\nOutput Format:\nFor R: [+] ram cache attached / [i] blocks in use: 8 / Deleting through base pointer... / [-] ram cache flushed / [-] cache base released / Audit complete: no leaks\nFor D: same flow with disk cache attached, blocks 64 and disk cache synced\n\nConstraints:\nCode is R or D.",
    difficulty: "medium",
    maxscore: 20,
    topic: "Advanced OOP (Abstract Classes, Virtual Functions)",
    subtopic: "Virtual Destructors",
    inputconstrains: "Code is R or D",
    sampleinput1: "R",
    sampleinput2: "D",
    input1: "D",
    input2: "R",
    input3: "R",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class Cache {
public:
    virtual int size() = 0;   // pure virtual
    virtual ~Cache() { cout << "[-] cache base released" << endl; }
};

class RamCache : public Cache {
public:
    RamCache() { cout << "[+] ram cache attached" << endl; }
    int size() { return 8; }
    ~RamCache() { cout << "[-] ram cache flushed" << endl; }
};

class DiskCache : public Cache {
public:
    DiskCache() { cout << "[+] disk cache attached" << endl; }
    int size() { return 64; }
    ~DiskCache() { cout << "[-] disk cache synced" << endl; }
};

int main() {
    char code;
    cin >> code;
    Cache* c = nullptr;
    if (code == 'R') c = new RamCache();
    else c = new DiskCache();
    cout << "[i] blocks in use: " << c->size() << endl;
    cout << "Deleting through base pointer..." << endl;
    delete c;   // virtual destructor: derived body runs first
    cout << "Audit complete: no leaks" << endl;
    return 0;
}`,
    blacklist: "printf",
    whitelist: "virtual, class, public, delete, new",
  },
  {
    title: "Pure Virtual Default Recipe",
    description:
      "Pure virtual functions are allowed to have bodies. Brew keeps brew(cups) = 0 yet still defines Brew::brew(cups) with the shared 'Boiling water' step; derived classes override brew() and deliberately call the pure virtual body through the class-name syntax Brew::brew(cups) before adding their own ingredient line. Read the drink code and cup count, then print the shared step followed by the derived step.\n\nInput Format:\nOne line with a character (T for tea, C for coffee) and an integer number of cups.\n\nOutput Format:\nBoiling water for <cups> cup(s)\nAdding tea leaves for <cups> cup(s)   (or: Adding coffee powder for <cups> cup(s))\n\nConstraints:\n1 <= cups <= 100; code is T or C.",
    difficulty: "medium",
    maxscore: 20,
    topic: "Advanced OOP (Abstract Classes, Virtual Functions)",
    subtopic: "Pure Virtual Functions",
    inputconstrains: "1 <= cups <= 100; code is T or C",
    sampleinput1: "T 2",
    sampleinput2: "C 1",
    input1: "C 5",
    input2: "T 10",
    input3: "C 3",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class Brew {
public:
    virtual void brew(int cups) = 0;   // pure virtual ...
    virtual ~Brew() {}
};

// ... but it can still have a body
void Brew::brew(int cups) {
    cout << "Boiling water for " << cups << " cup(s)" << endl;
}

class TeaBrew : public Brew {
public:
    void brew(int cups) {
        Brew::brew(cups);   // reuse the pure virtual body explicitly
        cout << "Adding tea leaves for " << cups << " cup(s)" << endl;
    }
};

class CoffeeBrew : public Brew {
public:
    void brew(int cups) {
        Brew::brew(cups);
        cout << "Adding coffee powder for " << cups << " cup(s)" << endl;
    }
};

int main() {
    char code;
    int cups;
    cin >> code >> cups;
    Brew* b = nullptr;
    if (code == 'T') b = new TeaBrew();
    else b = new CoffeeBrew();
    b->brew(cups);
    delete b;
    return 0;
}`,
    blacklist: "printf",
    whitelist: "virtual, class, public",
  },
  {
    title: "Unit Converter Framework Desk",
    description:
      "Measurement tools share one conversion framework. UnitConverter is an abstract class with pure virtual convert(value); KmToMiles multiplies by 0.621371 and KgToPounds multiplies by 2.20462. Read the converter code and the value, build the right converter through the base pointer and print the result with two decimal places.\n\nInput Format:\nOne line with a character (K for km to miles, P for kg to pounds) and a number value.\n\nOutput Format:\nConverted: <value with exactly 2 decimals>\n\nConstraints:\n0.5 <= value <= 100000; code is K or P.",
    difficulty: "medium",
    maxscore: 20,
    topic: "Advanced OOP (Abstract Classes, Virtual Functions)",
    subtopic: "Interfaces in C++",
    inputconstrains: "0.5 <= value <= 100000; code is K or P",
    sampleinput1: "K 10",
    sampleinput2: "P 5",
    input1: "K 0.5",
    input2: "P 100",
    input3: "K 42.195",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
using namespace std;

class UnitConverter {
public:
    virtual double convert(double value) = 0;
    virtual ~UnitConverter() {}
};

class KmToMiles : public UnitConverter {
public:
    double convert(double value) { return value * 0.621371; }
};

class KgToPounds : public UnitConverter {
public:
    double convert(double value) { return value * 2.20462; }
};

int main() {
    char code;
    double value;
    cin >> code >> value;
    UnitConverter* u = nullptr;
    if (code == 'K') u = new KmToMiles();
    else u = new KgToPounds();
    cout << fixed << setprecision(2) << "Converted: " << u->convert(value) << endl;
    delete u;
    return 0;
}`,
    blacklist: "printf",
    whitelist: "virtual, class, public, fixed, setprecision",
  },
  {
    title: "Shape Composer Total Area",
    description:
      "A canvas composer assembles shapes from a build list and bills the whole canvas. Shape is abstract with pure virtual area() and name(); Circle and Square implement both. Read N shapes (C radius or S side), park them in an array of Shape pointers, then walk the list polymorphically printing each shape's name and area, and finish with the sum of all areas.\n\nInput Format:\nFirst line: N. Next N lines: a character (C or S) and a number (radius or side).\n\nOutput Format:\nFor each shape in input order: <Circle or Square> area: <value with 2 decimals>\nLast line: Total area: <sum with 2 decimals>\n\nConstraints:\n1 <= N <= 100; 1 <= size <= 1000.",
    difficulty: "medium",
    maxscore: 20,
    topic: "Advanced OOP (Abstract Classes, Virtual Functions)",
    subtopic: "Abstract Classes",
    inputconstrains: "1 <= N <= 100; 1 <= size <= 1000",
    sampleinput1: "3\nC 1\nS 2\nC 2",
    sampleinput2: "2\nS 5\nS 1",
    input1: "1\nS 1000",
    input2: "4\nC 1\nC 1\nC 1\nC 1",
    input3: "5\nS 2\nC 3\nS 2\nC 3\nS 2",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
#include <string>
using namespace std;

class Shape {
public:
    virtual double area() = 0;
    virtual string name() = 0;
    virtual ~Shape() {}
};

class Circle : public Shape {
    double radius;
public:
    Circle(double r) : radius(r) {}
    double area() { return 3.14159 * radius * radius; }
    string name() { return "Circle"; }
};

class Square : public Shape {
    double side;
public:
    Square(double s) : side(s) {}
    double area() { return side * side; }
    string name() { return "Square"; }
};

int main() {
    int n;
    cin >> n;
    Shape* shapes[100];
    for (int i = 0; i < n; i++) {
        char code;
        double size;
        cin >> code >> size;
        if (code == 'C') shapes[i] = new Circle(size);
        else shapes[i] = new Square(size);
    }
    double total = 0.0;
    for (int i = 0; i < n; i++) {
        cout << fixed << setprecision(2)
             << shapes[i]->name() << " area: " << shapes[i]->area() << endl;
        total += shapes[i]->area();
    }
    cout << "Total area: " << total << endl;
    for (int i = 0; i < n; i++) delete shapes[i];
    return 0;
}`,
    blacklist: "printf",
    whitelist: "virtual, class, public, new, delete, fixed",
  },
  {
    title: "Printable Scannable Office Copier",
    description:
      "Interface segregation keeps contracts small and focused. Printable declares pure virtual print(doc, pages) and Scannable declares pure virtual scan(doc, pages). A single Copier class implements BOTH interfaces, and main talks to it through two different interface pointers, exercising one capability each. Read the document name and page count, then print both capability lines.\n\nInput Format:\nOne line with a document name (single word) and an integer page count.\n\nOutput Format:\nPrinting <doc> (pages: <pages>)\nScanning <doc> (pages: <pages>)\n\nConstraints:\n1 <= pages <= 500; 1 <= name length <= 20.",
    difficulty: "medium",
    maxscore: 20,
    topic: "Advanced OOP (Abstract Classes, Virtual Functions)",
    subtopic: "Interfaces in C++",
    inputconstrains: "1 <= pages <= 500; 1 <= name length <= 20",
    sampleinput1: "report.doc 3",
    sampleinput2: "invoice 2",
    input1: "notes 10",
    input2: "poster 1",
    input3: "menu 5",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

class Printable {
public:
    virtual void print(const string& doc, int pages) = 0;
    virtual ~Printable() {}
};

class Scannable {
public:
    virtual void scan(const string& doc, int pages) = 0;
    virtual ~Scannable() {}
};

// One class, two interface contracts
class Copier : public Printable, public Scannable {
public:
    void print(const string& doc, int pages) {
        cout << "Printing " << doc << " (pages: " << pages << ")" << endl;
    }
    void scan(const string& doc, int pages) {
        cout << "Scanning " << doc << " (pages: " << pages << ")" << endl;
    }
};

int main() {
    string doc;
    int pages;
    cin >> doc >> pages;
    Copier machine;
    Printable* pr = &machine;
    Scannable* sc = &machine;
    pr->print(doc, pages);
    sc->scan(doc, pages);
    return 0;
}`,
    blacklist: "printf",
    whitelist: "virtual, class, public, string",
  },

  // ------------------------------------------------------------------- hard
  {
    title: "Device Lifecycle Template Runner",
    description:
      "A data centre controller boots and stops many kinds of equipment through one template method. The abstract Device class provides the concrete run() skeleton which calls the pure virtual steps boot() and shutdown() in a fixed order; ConsoleDevice and NetworkDevice supply their own lifecycle lines carrying their device id. Read N commands, build each requested device polymorphically, run its cycle, free it, then print the handling summary.\n\nInput Format:\nFirst line: N. Next N lines: a device kind (console or network) and an integer device id.\n\nOutput Format:\nPer device:\n[boot] <kind>-<id> up\n[run] cycle complete\n[shutdown] <kind>-<id> down\nFinal line: All devices handled: <N>\n\nConstraints:\n1 <= N <= 100; 1 <= id <= 100000.",
    difficulty: "hard",
    maxscore: 30,
    topic: "Advanced OOP (Abstract Classes, Virtual Functions)",
    subtopic: "Abstract Class Design",
    inputconstrains: "1 <= N <= 100; 1 <= id <= 100000",
    sampleinput1: "2\nconsole 1\nnetwork 2",
    sampleinput2: "1\nnetwork 10",
    input1: "3\nconsole 5\nconsole 6\nnetwork 7",
    input2: "1\nconsole 999",
    input3: "4\nnetwork 1\nconsole 1\nnetwork 2\nconsole 2",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

class Device {
public:
    // Template method: fixed skeleton, variable steps
    void run() {
        boot();
        cout << "[run] cycle complete" << endl;
        shutdown();
    }
    virtual void boot() = 0;
    virtual void shutdown() = 0;
    virtual ~Device() {}
};

class ConsoleDevice : public Device {
    int id;
public:
    ConsoleDevice(int i) : id(i) {}
    void boot() { cout << "[boot] console-" << id << " up" << endl; }
    void shutdown() { cout << "[shutdown] console-" << id << " down" << endl; }
};

class NetworkDevice : public Device {
    int id;
public:
    NetworkDevice(int i) : id(i) {}
    void boot() { cout << "[boot] network-" << id << " up" << endl; }
    void shutdown() { cout << "[shutdown] network-" << id << " down" << endl; }
};

int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) {
        string kind;
        int id;
        cin >> kind >> id;
        Device* d = nullptr;
        if (kind == "console") d = new ConsoleDevice(id);
        else d = new NetworkDevice(id);
        d->run();     // template method drives the pure virtual steps
        delete d;
    }
    cout << "All devices handled: " << n << endl;
    return 0;
}`,
    blacklist: "printf",
    whitelist: "virtual, class, public, new, delete",
  },
  {
    title: "Payroll Compensation Policy Engine",
    description:
      "A startup payroll engine pays every employee through one abstract Compensation contract. compute() stays pure virtual and each policy completes it its own way: MonthlyPay returns a fixed salary, HourlyPay multiplies rate by hours, CommissionPay adds sales * percent / 100 to a base. The shared report() in the base class calls compute() polymorphically to print one line per employee, and the engine closes with the payroll total.\n\nInput Format:\nFirst line: N. Next N lines: policy code (M, H or C), a name (single word), then the policy numbers — M: salary; H: rate hours; C: base sales percent.\n\nOutput Format:\nPer employee: <name> earns <amount>\nFinal line: Payroll total: <sum of all amounts>\n\nConstraints:\n1 <= N <= 50; 1 <= every number <= 10000000; code is M, H or C.",
    difficulty: "hard",
    maxscore: 30,
    topic: "Advanced OOP (Abstract Classes, Virtual Functions)",
    subtopic: "Abstract Class Design",
    inputconstrains: "1 <= N <= 50; 1 <= every number <= 10000000; code is M, H or C",
    sampleinput1: "3\nM Aisha 60000\nH Bilal 300 80\nC Chen 20000 50000 10",
    sampleinput2: "2\nH Dev 500 2\nM Era 100000",
    input1: "1\nC Zoe 0 0 25",
    input2: "4\nM K1 1000\nH K2 1 1\nC K3 100 1 100\nM K4 999999",
    input3: "2\nC Mia 50000 12345 33\nH Raj 125 160",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

class Compensation {
protected:
    string name;
public:
    Compensation(const string& n) : name(n) {}
    virtual int compute() = 0;   // each policy completes this contract
    void report() { cout << name << " earns " << compute() << endl; }
    virtual ~Compensation() {}
};

class MonthlyPay : public Compensation {
    int salary;
public:
    MonthlyPay(const string& n, int s) : Compensation(n), salary(s) {}
    int compute() { return salary; }
};

class HourlyPay : public Compensation {
    int rate, hours;
public:
    HourlyPay(const string& n, int r, int h) : Compensation(n), rate(r), hours(h) {}
    int compute() { return rate * hours; }
};

class CommissionPay : public Compensation {
    int basePay, sales, percent;
public:
    CommissionPay(const string& n, int b, int s, int p)
        : Compensation(n), basePay(b), sales(s), percent(p) {}
    int compute() { return basePay + sales * percent / 100; }
};

int main() {
    int n;
    cin >> n;
    Compensation* staff[50];
    for (int i = 0; i < n; i++) {
        string code, name;
        cin >> code >> name;
        if (code == "M") {
            int salary;
            cin >> salary;
            staff[i] = new MonthlyPay(name, salary);
        } else if (code == "H") {
            int rate, hours;
            cin >> rate >> hours;
            staff[i] = new HourlyPay(name, rate, hours);
        } else {
            int base, sales, percent;
            cin >> base >> sales >> percent;
            staff[i] = new CommissionPay(name, base, sales, percent);
        }
    }
    long long total = 0;
    for (int i = 0; i < n; i++) {
        staff[i]->report();          // shared base report, polymorphic compute
        total += staff[i]->compute();
    }
    cout << "Payroll total: " << total << endl;
    for (int i = 0; i < n; i++) delete staff[i];
    return 0;
}`,
    blacklist: "printf",
    whitelist: "virtual, class, public, protected, new, delete",
  },
  {
    title: "Polymorphic Cleanup Manifest",
    description:
      "A hosting platform must release every asset cleanly through the abstract base pointer. Asset tracks a static alive counter, keeps tag() pure virtual and owns the virtual destructor that decrements the counter; LandAsset, SeaAsset and AirAsset print their own creation and releasing lines. Read N assets, watch them register, then delete them newest-first through Asset pointers and print the audit summary proving the virtual destructor chain ran for every object.\n\nInput Format:\nFirst line: N. Next N lines: a type code (L, S or A) and an integer id.\n\nOutput Format:\nPer asset: [created] <land|sea|air>-<id>\nThen: [cleanup start] <N> assets\nThen, newest first: [releasing] <land|sea|air>-<id>\nFinally: [audit] remaining: 0 and [audit] released: <N>\n\nConstraints:\n1 <= N <= 100; 1 <= id <= 100000; code is L, S or A.",
    difficulty: "hard",
    maxscore: 30,
    topic: "Advanced OOP (Abstract Classes, Virtual Functions)",
    subtopic: "Virtual Destructors",
    inputconstrains: "1 <= N <= 100; 1 <= id <= 100000; code is L, S or A",
    sampleinput1: "3\nL 1\nS 2\nA 3",
    sampleinput2: "1\nA 100",
    input1: "4\nA 9\nL 9\nS 9\nA 9",
    input2: "2\nL 500\nS 500",
    input3: "5\nS 1\nA 2\nL 3\nS 4\nA 5",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

class Asset {
    static int alive;
public:
    Asset() { alive++; }
    virtual string tag() = 0;
    virtual ~Asset() { alive--; }
    static int remaining() { return alive; }
};

int Asset::alive = 0;

class LandAsset : public Asset {
    int id;
public:
    LandAsset(int i) : id(i) { cout << "[created] land-" << i << endl; }
    string tag() { return "land-" + to_string(id); }
    ~LandAsset() { cout << "[releasing] " << tag() << endl; }
};

class SeaAsset : public Asset {
    int id;
public:
    SeaAsset(int i) : id(i) { cout << "[created] sea-" << i << endl; }
    string tag() { return "sea-" + to_string(id); }
    ~SeaAsset() { cout << "[releasing] " << tag() << endl; }
};

class AirAsset : public Asset {
    int id;
public:
    AirAsset(int i) : id(i) { cout << "[created] air-" << i << endl; }
    string tag() { return "air-" + to_string(id); }
    ~AirAsset() { cout << "[releasing] " << tag() << endl; }
};

int main() {
    int n;
    cin >> n;
    Asset* assets[100];
    for (int i = 0; i < n; i++) {
        char code;
        int id;
        cin >> code >> id;
        if (code == 'L') assets[i] = new LandAsset(id);
        else if (code == 'S') assets[i] = new SeaAsset(id);
        else assets[i] = new AirAsset(id);
    }
    cout << "[cleanup start] " << Asset::remaining() << " assets" << endl;
    int released = 0;
    for (int i = n - 1; i >= 0; i--) {
        delete assets[i];   // virtual destructor chain: derived body first
        released++;
    }
    cout << "[audit] remaining: " << Asset::remaining() << endl;
    cout << "[audit] released: " << released << endl;
    return 0;
}`,
    blacklist: "printf",
    whitelist: "virtual, class, public, static, new, delete",
  },
  {
    title: "Plugin Registry Pipeline Report",
    description:
      "A text pipeline loads two plugins behind one registry interface. Plugin declares pure virtual name() and execute(data) and nothing else; SumPlugin totals the data while MaxPlugin reports the largest value. The registry walks every plugin polymorphically, prints name and result, records the executed names in order, and finally frees each plugin through the interface pointer.\n\nInput Format:\nFirst line: N (data count). Second line: N integers (may be negative).\n\nOutput Format:\nPlugin <name> -> <result>   (once per plugin: sum then max)\nExecuted: <comma-joined names in registry order>\n\nConstraints:\n1 <= N <= 1000; -1000000 <= each value <= 1000000.",
    difficulty: "hard",
    maxscore: 30,
    topic: "Advanced OOP (Abstract Classes, Virtual Functions)",
    subtopic: "Interfaces in C++",
    inputconstrains: "1 <= N <= 1000; -1000000 <= each value <= 1000000",
    sampleinput1: "5\n3 1 4 1 5",
    sampleinput2: "3\n-2 -7 -1",
    input1: "1\n42",
    input2: "4\n10 10 10 10",
    input3: "6\n1000000 -500000 999999 1 500000 -250000",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

// Pure interface
class Plugin {
public:
    virtual string name() = 0;
    virtual int execute(const vector<int>& data) = 0;
    virtual ~Plugin() {}
};

class SumPlugin : public Plugin {
public:
    string name() { return "sum"; }
    int execute(const vector<int>& data) {
        int total = 0;
        for (int x : data) total += x;
        return total;
    }
};

class MaxPlugin : public Plugin {
public:
    string name() { return "max"; }
    int execute(const vector<int>& data) {
        int best = data[0];
        for (int x : data) if (x > best) best = x;
        return best;
    }
};

int main() {
    int n;
    cin >> n;
    vector<int> data(n);
    for (int i = 0; i < n; i++) cin >> data[i];

    vector<Plugin*> registry;
    registry.push_back(new SumPlugin());
    registry.push_back(new MaxPlugin());

    string executed = "";
    for (Plugin* p : registry) {
        cout << "Plugin " << p->name() << " -> " << p->execute(data) << endl;
        if (!executed.empty()) executed += ",";
        executed += p->name();
    }
    cout << "Executed: " << executed << endl;

    for (Plugin* p : registry) delete p;
    return 0;
}`,
    blacklist: "printf",
    whitelist: "virtual, class, public, vector, new, delete",
  },
];

export const mcqs = [
  // ------------------------------------------------------------------ easy
  {
    title: "Definition of an Abstract Class",
    description: "What exactly makes a class abstract in C++?",
    difficulty: "easy",
    topic: "Advanced OOP (Abstract Classes, Virtual Functions)",
    subtopic: "Abstract Classes",
    Option1: "A class that has no member functions",
    Option2: "A class that contains at least one pure virtual function and cannot be instantiated directly",
    Option3: "Any class declared with the struct keyword",
    Option4: "A class whose members are all private",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Pure Virtual Function Syntax",
    description: "Which line declares a pure virtual function inside a class?",
    difficulty: "easy",
    topic: "Advanced OOP (Abstract Classes, Virtual Functions)",
    subtopic: "Pure Virtual Functions",
    Option1: "virtual void draw() = 0;",
    Option2: "pure virtual void draw();",
    Option3: "virtual void draw() pure;",
    Option4: "abstract void draw();",
    CorrectOption: 1,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Instantiating Abstract Classes",
    description: "Shape has a pure virtual function. What happens when the compiler sees Shape s;?",
    difficulty: "easy",
    topic: "Advanced OOP (Abstract Classes, Virtual Functions)",
    subtopic: "Abstract Classes",
    Option1: "It creates a Shape object with default values",
    Option2: "It compiles but fails at runtime",
    Option3: "It is a compile error: a class with a pure virtual function cannot be instantiated",
    Option4: "It creates a Shape that must be completed later",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Meaning of an Interface in C++",
    description: "In C++, the word interface usually describes:",
    difficulty: "easy",
    topic: "Advanced OOP (Abstract Classes, Virtual Functions)",
    subtopic: "Interfaces in C++",
    Option1: "A class that contains only pure virtual functions (and typically no data members)",
    Option2: "The command line arguments of main",
    Option3: "A header file that other files include",
    Option4: "Any class with a constructor",
    CorrectOption: 1,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Why Virtual Destructors Matter",
    description: "A program deletes derived objects through a base class pointer. Why must the base destructor be virtual?",
    difficulty: "easy",
    topic: "Advanced OOP (Abstract Classes, Virtual Functions)",
    subtopic: "Virtual Destructors",
    Option1: "So memory is freed twice as fast",
    Option2: "So the derived destructor runs and the whole object is destroyed correctly through the base pointer",
    Option3: "Because destructors cannot be inherited",
    Option4: "So the compiler removes the need for delete",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "One Pure Virtual Makes It Abstract",
    description: "A class has ordinary data members, three implemented functions and exactly one pure virtual function. The class is:",
    difficulty: "easy",
    topic: "Advanced OOP (Abstract Classes, Virtual Functions)",
    subtopic: "Pure Virtual Functions",
    Option1: "A normal concrete class",
    Option2: "An interface",
    Option3: "Illegal in C++",
    Option4: "Abstract — even one pure virtual function makes a class non-instantiable",
    CorrectOption: 4,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Derived Class Completion Duty",
    description: "A class inherits from an abstract base and implements only some of the pure virtual functions. What is true about the derived class?",
    difficulty: "easy",
    topic: "Advanced OOP (Abstract Classes, Virtual Functions)",
    subtopic: "Pure Virtual Functions",
    Option1: "It is fully concrete",
    Option2: "It also stays abstract and cannot be instantiated until every pure virtual is overridden",
    Option3: "The compiler writes the missing overrides automatically",
    Option4: "It can be instantiated but the missing calls crash",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Members Allowed in Abstract Classes",
    description: "Which statement about an abstract class is TRUE?",
    difficulty: "easy",
    topic: "Advanced OOP (Abstract Classes, Virtual Functions)",
    subtopic: "Abstract Classes",
    Option1: "It cannot have constructors",
    Option2: "It cannot have data members",
    Option3: "It can have data members, constructors and implemented functions alongside its pure virtual functions",
    Option4: "It can only contain static members",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Meaning of the Zero Initializer",
    description: "In the declaration virtual int area() = 0; the = 0 means:",
    difficulty: "easy",
    topic: "Advanced OOP (Abstract Classes, Virtual Functions)",
    subtopic: "Pure Virtual Functions",
    Option1: "The function returns zero",
    Option2: "The function can be called at most once",
    Option3: "The function has no body here and must be implemented by a derived class",
    Option4: "The function is marked deprecated",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Virtual Destructor Syntax",
    description: "Which line correctly declares a virtual destructor in a class named Robot?",
    difficulty: "easy",
    topic: "Advanced OOP (Abstract Classes, Virtual Functions)",
    subtopic: "Virtual Destructors",
    Option1: "virtual ~Robot();",
    Option2: "~virtual Robot();",
    Option3: "virtual destructor Robot();",
    Option4: "Robot virtual ~();",
    CorrectOption: 1,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },

  // ----------------------------------------------------------------- medium
  {
    title: "Pure Virtual Dispatch Prediction",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "Advanced OOP (Abstract Classes, Virtual Functions)",
    subtopic: "Pure Virtual Functions",
    Option1: "0",
    Option2: "36",
    Option3: "6",
    Option4: "Compile error",
    CorrectOption: 2,
    codesnippet: `#include <iostream>
using namespace std;
class Shape {
public:
    virtual double area() = 0;
    virtual ~Shape() {}
};
class Square : public Shape {
    double side;
public:
    Square(double s) : side(s) {}
    double area() { return side * side; }
};
int main() {
    Shape* p = new Square(6);
    cout << p->area();
    delete p;
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nclass Shape {\npublic:\n    virtual double area() = 0;\n    virtual ~Shape() {}\n};\nclass Square : public Shape {\n    double side;\npublic:\n    Square(double s) : side(s) {}\n    double area() { return side * side; }\n};\nint main() {\n    Shape* p = new Square(6);\n    cout << p->area();\n    delete p;\n    return 0;\n}`,
      stdin: "",
      expected: "36",
    },
  },
  {
    title: "Abstract Class Concrete Method Output",
    description: "What does this program print? The abstract class also carries a fully implemented method.",
    difficulty: "medium",
    topic: "Advanced OOP (Abstract Classes, Virtual Functions)",
    subtopic: "Abstract Classes",
    Option1: "Machine ready",
    Option2: "Printing",
    Option3: "Machine ready Printing",
    Option4: "Compile error: Machine is abstract",
    CorrectOption: 3,
    codesnippet: `#include <iostream>
using namespace std;
class Machine {
public:
    void ready() { cout << "Machine ready "; }
    virtual void work() = 0;
    virtual ~Machine() {}
};
class Printer : public Machine {
public:
    void work() { cout << "Printing"; }
};
int main() {
    Printer p;
    p.ready();
    p.work();
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nclass Machine {\npublic:\n    void ready() { cout << "Machine ready "; }\n    virtual void work() = 0;\n    virtual ~Machine() {}\n};\nclass Printer : public Machine {\npublic:\n    void work() { cout << "Printing"; }\n};\nint main() {\n    Printer p;\n    p.ready();\n    p.work();\n    return 0;\n}`,
      stdin: "",
      expected: "Machine ready Printing",
    },
  },
  {
    title: "Base Delete Destructor Order",
    description: "What does this program print? The object is deleted through a base class pointer.",
    difficulty: "medium",
    topic: "Advanced OOP (Abstract Classes, Virtual Functions)",
    subtopic: "Virtual Destructors",
    Option1: "Base dtor",
    Option2: "Derived dtor Base dtor",
    Option3: "Derived dtor",
    Option4: "Base dtor Derived dtor",
    CorrectOption: 2,
    codesnippet: `#include <iostream>
using namespace std;
class Base {
public:
    virtual ~Base() { cout << "Base dtor "; }
};
class Derived : public Base {
public:
    ~Derived() { cout << "Derived dtor "; }
};
int main() {
    Base* p = new Derived();
    delete p;
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nclass Base {\npublic:\n    virtual ~Base() { cout << "Base dtor "; }\n};\nclass Derived : public Base {\npublic:\n    ~Derived() { cout << "Derived dtor "; }\n};\nint main() {\n    Base* p = new Derived();\n    delete p;\n    return 0;\n}`,
      stdin: "",
      expected: "Derived dtor Base dtor",
    },
  },
  {
    title: "Interface Selection by Code",
    description: "The program below is run with the input line: S\nWhat does it print?",
    difficulty: "medium",
    topic: "Advanced OOP (Abstract Classes, Virtual Functions)",
    subtopic: "Interfaces in C++",
    Option1: "hello",
    Option2: "HELLO",
    Option3: "Nothing is printed",
    Option4: "Compile error",
    CorrectOption: 1,
    codesnippet: `#include <iostream>
using namespace std;
class Greeter {
public:
    virtual void greet() = 0;
    virtual ~Greeter() {}
};
class Loud : public Greeter {
public:
    void greet() { cout << "HELLO"; }
};
class Soft : public Greeter {
public:
    void greet() { cout << "hello"; }
};
int main() {
    char code;
    cin >> code;
    Greeter* g = nullptr;
    if (code == 'L') g = new Loud();
    else g = new Soft();
    g->greet();
    delete g;
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nclass Greeter {\npublic:\n    virtual void greet() = 0;\n    virtual ~Greeter() {}\n};\nclass Loud : public Greeter {\npublic:\n    void greet() { cout << "HELLO"; }\n};\nclass Soft : public Greeter {\npublic:\n    void greet() { cout << "hello"; }\n};\nint main() {\n    char code;\n    cin >> code;\n    Greeter* g = nullptr;\n    if (code == 'L') g = new Loud();\n    else g = new Soft();\n    g->greet();\n    delete g;\n    return 0;\n}`,
      stdin: "S",
      expected: "hello",
    },
  },
  {
    title: "Partial Override Still Abstract",
    description: "A class inherits an abstract base with three pure virtual functions but overrides only two of them. What is the status of this derived class?",
    difficulty: "medium",
    topic: "Advanced OOP (Abstract Classes, Virtual Functions)",
    subtopic: "Pure Virtual Functions",
    Option1: "It is concrete because most functions are implemented",
    Option2: "It can be instantiated with a warning",
    Option3: "The compiler supplies empty bodies for the missing one",
    Option4: "It is still abstract and cannot be instantiated until the third is overridden",
    CorrectOption: 4,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Abstract Classes Can Carry State",
    description: "Which statement about C++ abstract classes is TRUE?",
    difficulty: "medium",
    topic: "Advanced OOP (Abstract Classes, Virtual Functions)",
    subtopic: "Abstract Class Design",
    Option1: "They may not have constructors since they cannot be instantiated",
    Option2: "They may not have any data members",
    Option3: "They can have constructors, data members and implemented functions; only instantiation is forbidden",
    Option4: "They can hold data only as static members",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },

  // ------------------------------------------------------------------- hard
  {
    title: "Intermediate Abstract Completion Trace",
    description: "What does this program print? Powered is a middle layer that completes only one of the two pure virtual functions.",
    difficulty: "hard",
    topic: "Advanced OOP (Abstract Classes, Virtual Functions)",
    subtopic: "Abstract Class Design",
    Option1: "Compile error: Powered is abstract",
    Option2: "powered 4",
    Option3: "4 powered",
    Option4: "powered 0",
    CorrectOption: 2,
    codesnippet: `#include <iostream>
#include <string>
using namespace std;
class Vehicle {
public:
    virtual string kind() = 0;
    virtual int wheels() = 0;
    virtual ~Vehicle() {}
};
class Powered : public Vehicle {
public:
    string kind() { return "powered"; }
};
class Car : public Powered {
public:
    int wheels() { return 4; }
};
int main() {
    Vehicle* v = new Car();
    cout << v->kind() << " " << v->wheels();
    delete v;
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\n#include <string>\nusing namespace std;\nclass Vehicle {\npublic:\n    virtual string kind() = 0;\n    virtual int wheels() = 0;\n    virtual ~Vehicle() {}\n};\nclass Powered : public Vehicle {\npublic:\n    string kind() { return "powered"; }\n};\nclass Car : public Powered {\npublic:\n    int wheels() { return 4; }\n};\nint main() {\n    Vehicle* v = new Car();\n    cout << v->kind() << " " << v->wheels();\n    delete v;\n    return 0;\n}`,
      stdin: "",
      expected: "powered 4",
    },
  },
  {
    title: "Three Level Virtual Destructor Order",
    description: "What does this program print? Think about which destructor runs first when a most-derived object is deleted through the topmost base pointer.",
    difficulty: "hard",
    topic: "Advanced OOP (Abstract Classes, Virtual Functions)",
    subtopic: "Virtual Destructors",
    Option1: "A B C",
    Option2: "C",
    Option3: "C B A",
    Option4: "A",
    CorrectOption: 3,
    codesnippet: `#include <iostream>
using namespace std;
class A {
public:
    virtual ~A() { cout << "A "; }
};
class B : public A {
public:
    ~B() { cout << "B "; }
};
class C : public B {
public:
    ~C() { cout << "C "; }
};
int main() {
    A* p = new C();
    delete p;
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nclass A {\npublic:\n    virtual ~A() { cout << "A "; }\n};\nclass B : public A {\npublic:\n    ~B() { cout << "B "; }\n};\nclass C : public B {\npublic:\n    ~C() { cout << "C "; }\n};\nint main() {\n    A* p = new C();\n    delete p;\n    return 0;\n}`,
      stdin: "",
      expected: "C B A",
    },
  },
  {
    title: "Calling the Pure Virtual Body",
    description: "What does this program print? A pure virtual function may still be given a body, which the derived override can call explicitly.",
    difficulty: "hard",
    topic: "Advanced OOP (Abstract Classes, Virtual Functions)",
    subtopic: "Pure Virtual Functions",
    Option1: "Sales rows",
    Option2: "Common header then Sales rows on two separate lines",
    Option3: "Compile error: a pure virtual function cannot have a body",
    Option4: "The program crashes at runtime",
    CorrectOption: 2,
    codesnippet: `#include <iostream>
using namespace std;
class Report {
public:
    virtual void start() = 0;
    virtual ~Report() {}
};
void Report::start() {
    cout << "Common header" << endl;
}
class SalesReport : public Report {
public:
    void start() {
        Report::start();
        cout << "Sales rows" << endl;
    }
};
int main() {
    SalesReport s;
    s.start();
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nclass Report {\npublic:\n    virtual void start() = 0;\n    virtual ~Report() {}\n};\nvoid Report::start() {\n    cout << "Common header" << endl;\n}\nclass SalesReport : public Report {\npublic:\n    void start() {\n        Report::start();\n        cout << "Sales rows" << endl;\n    }\n};\nint main() {\n    SalesReport s;\n    s.start();\n    return 0;\n}`,
      stdin: "",
      expected: "Common header\nSales rows",
    },
  },
  {
    title: "Pure Virtual Call Fault Reasoning",
    description: "During construction of a derived object, the abstract base constructor calls a pure virtual function that has NO implementation anywhere in the program. What happens?",
    difficulty: "hard",
    topic: "Advanced OOP (Abstract Classes, Virtual Functions)",
    subtopic: "Pure Virtual Functions",
    Option1: "The derived override runs because the real object is a derived one",
    Option2: "The call is skipped silently and the program continues",
    Option3: "The compiler replaces the call with an empty statement",
    Option4: "During base construction the vtable still points at the pure entry, so no override is available and the program fails with a pure virtual function call error",
    CorrectOption: 4,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
];
