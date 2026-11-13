/**
 * OOPS using CPP — Day 14: Inheritance (Single, Multiple, Hierarchical, Virtual Base Classes)
 * 20 code questions (10 easy: 6 basics + 4 real-world, 6 medium, 4 hard)
 * 20 MCQs (10 easy, 6 medium, 4 hard)
 * All solutions are fresh C++ written for this course (no conversions).
 */
export const meta = {
  day: 14,
  topic: "Inheritance",
};

export const code = [
  // ------------------------------------------------------------------ easy
  {
    title: "Animal Eat Bark Drill",
    description:
      "A pet simulator uses single inheritance: class Dog derives from class Animal and gains everything Animal has. Animal offers eat() and Dog adds bark(). Write the program so main creates a Dog object and prints both inherited and new behaviour.\n\nInput Format:\nNo input.\n\nOutput Format:\nAnimal eats food\nDog barks loudly\n\nConstraints:\nNone.",
    difficulty: "easy",
    maxscore: 10,
    topic: "Inheritance",
    subtopic: "Single Inheritance",
    inputconstrains: "None",
    sampleinput1: "",
    sampleinput2: "",
    input1: "",
    input2: "",
    input3: "",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class Animal {
public:
    void eat() {
        cout << "Animal eats food" << endl;
    }
};

class Dog : public Animal {
public:
    void bark() {
        cout << "Dog barks loudly" << endl;
    }
};

int main() {
    Dog d;
    d.eat();
    d.bark();
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Student Learns From Person Base",
    description:
      "A campus portal models people with a base class Person that greets by name, and a derived class Student that adds the ability to study. Read the student's name, build the Student object and print both behaviours.\n\nInput Format:\nOne line with one token: name (single word).\n\nOutput Format:\nHello, I am <name>\nStudying inheritance today\n\nConstraints:\n1 <= length of name <= 20",
    difficulty: "easy",
    maxscore: 10,
    topic: "Inheritance",
    subtopic: "Single Inheritance",
    inputconstrains: "1 <= length of name <= 20",
    sampleinput1: "Asha",
    sampleinput2: "Vikram",
    input1: "Zoya",
    input2: "Om",
    input3: "Anita",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

class Person {
    string name;
public:
    Person(string n) {
        name = n;
    }
    void greet() {
        cout << "Hello, I am " << name << endl;
    }
};

class Student : public Person {
public:
    Student(string n) : Person(n) {
    }
    void study() {
        cout << "Studying inheritance today" << endl;
    }
};

int main() {
    string name;
    cin >> name;
    Student s(name);
    s.greet();
    s.study();
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Device to Laptop Method Chain",
    description:
      "Gadget classes form a multilevel chain: Device -> Computer -> Laptop, where each level adds one new method. Write the program so main creates a Laptop and calls all three methods, top level first.\n\nInput Format:\nNo input.\n\nOutput Format:\nDevice powers on\nComputer boots system\nLaptop folds screen\n\nConstraints:\nNone.",
    difficulty: "easy",
    maxscore: 10,
    topic: "Inheritance",
    subtopic: "Multilevel Inheritance",
    inputconstrains: "None",
    sampleinput1: "",
    sampleinput2: "",
    input1: "",
    input2: "",
    input3: "",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class Device {
public:
    void powerOn() {
        cout << "Device powers on" << endl;
    }
};

class Computer : public Device {
public:
    void boot() {
        cout << "Computer boots system" << endl;
    }
};

class Laptop : public Computer {
public:
    void fold() {
        cout << "Laptop folds screen" << endl;
    }
};

int main() {
    Laptop lp;
    lp.powerOn();
    lp.boot();
    lp.fold();
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Shape Heirs Circle and Square",
    description:
      "A geometry kit has one base class Shape and two independent children, Circle and Square (hierarchical inheritance). Read a radius and a side, then print the family tag and the area of each shape.\n\nInput Format:\nOne line with two integers: radius and side.\n\nOutput Format:\nShape family report\nCircle area: <3.14 * radius * radius, 2 decimals>\nShape family report\nSquare area: <side * side>\n\nConstraints:\n1 <= radius, side <= 1000",
    difficulty: "easy",
    maxscore: 10,
    topic: "Inheritance",
    subtopic: "Hierarchical Inheritance",
    inputconstrains: "1 <= radius, side <= 1000",
    sampleinput1: "5 4",
    sampleinput2: "10 7",
    input1: "1 1",
    input2: "100 25",
    input3: "999 1000",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
using namespace std;

class Shape {
public:
    void family() {
        cout << "Shape family report" << endl;
    }
};

class Circle : public Shape {
public:
    void area(int r) {
        cout << "Circle area: " << fixed << setprecision(2) << 3.14 * r * r << endl;
    }
};

class Square : public Shape {
public:
    void area(int s) {
        cout << "Square area: " << s * s << endl;
    }
};

int main() {
    int r, s;
    cin >> r >> s;
    Circle c;
    Square sq;
    c.family();
    c.area(r);
    sq.family();
    sq.area(s);
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Two Level Price Constructor",
    description:
      "A billing module uses two-level inheritance where the derived constructor takes an extra parameter. Base class Item receives the price; derived class TaxedItem receives the price and a tax percent, prints its own construction line, then computes the final price.\n\nInput Format:\nOne line with two integers: price and tax percent.\n\nOutput Format:\nItem created with price <price>\nTaxedItem created with tax <tax>\nFinal price: <price + price * tax / 100>\n\nConstraints:\n1 <= price <= 100000, 0 <= tax <= 100",
    difficulty: "easy",
    maxscore: 10,
    topic: "Inheritance",
    subtopic: "Single Inheritance",
    inputconstrains: "1 <= price <= 100000, 0 <= tax <= 100",
    sampleinput1: "200 10",
    sampleinput2: "500 0",
    input1: "1 100",
    input2: "999 8",
    input3: "1000 12",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class Item {
    int price;
public:
    Item(int p) {
        price = p;
        cout << "Item created with price " << price << endl;
    }
    int getPrice() {
        return price;
    }
};

class TaxedItem : public Item {
    int tax;
public:
    TaxedItem(int p, int t) : Item(p) {
        tax = t;
        cout << "TaxedItem created with tax " << tax << endl;
    }
    void finalPrice() {
        cout << "Final price: " << getPrice() + getPrice() * tax / 100 << endl;
    }
};

int main() {
    int price, tax;
    cin >> price >> tax;
    TaxedItem t(price, tax);
    t.finalPrice();
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Protected Vault Through Derived",
    description:
      "A base class Safe stores its code as a protected member. Only the derived class Agent may read it directly, demonstrating protected access inside a child class. Read the code and let the agent reveal it together with its doubled value.\n\nInput Format:\nOne line with one integer: code.\n\nOutput Format:\nAgent reads protected code: <code>\nDoubled code: <code * 2>\n\nConstraints:\n0 <= code <= 100000",
    difficulty: "easy",
    maxscore: 10,
    topic: "Inheritance",
    subtopic: "Access Specifiers in Inheritance",
    inputconstrains: "0 <= code <= 100000",
    sampleinput1: "47",
    sampleinput2: "100",
    input1: "0",
    input2: "9",
    input3: "12345",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class Safe {
protected:
    int code;
public:
    Safe(int c) {
        code = c;
    }
};

class Agent : public Safe {
public:
    Agent(int c) : Safe(c) {
    }
    void reveal() {
        cout << "Agent reads protected code: " << code << endl;
        cout << "Doubled code: " << code * 2 << endl;
    }
};

int main() {
    int c;
    cin >> c;
    Agent a(c);
    a.reveal();
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Car Mileage Inherited Report",
    description:
      "A garage app reports how far a car goes per litre. Base class Vehicle provides the engine start; derived class Car collects the fuel and the distance driven and prints the full mileage report using integer division.\n\nInput Format:\nOne line with two integers: fuel litres and distance km.\n\nOutput Format:\nVehicle engine started\nFuel used: <fuel> litres\nDistance: <distance> km\nMileage: <distance / fuel> km per litre\n\nConstraints:\n1 <= fuel <= 200, 1 <= distance <= 100000",
    difficulty: "easy",
    maxscore: 10,
    topic: "Inheritance",
    subtopic: "Single Inheritance",
    inputconstrains: "1 <= fuel <= 200, 1 <= distance <= 100000",
    sampleinput1: "10 250",
    sampleinput2: "8 100",
    input1: "1 5",
    input2: "20 999",
    input3: "5 40",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class Vehicle {
public:
    void start() {
        cout << "Vehicle engine started" << endl;
    }
};

class Car : public Vehicle {
    int fuel;
    int distance;
public:
    Car(int f, int d) {
        fuel = f;
        distance = d;
    }
    void report() {
        start();
        cout << "Fuel used: " << fuel << " litres" << endl;
        cout << "Distance: " << distance << " km" << endl;
        cout << "Mileage: " << distance / fuel << " km per litre" << endl;
    }
};

int main() {
    int f, d;
    cin >> f >> d;
    Car c(f, d);
    c.report();
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Manager Team Size Report",
    description:
      "The HR console derives Manager from Employee. The inherited check-in is printed first, then the manager's own report: name, salary, team size and the team bonus (1000 rupees per team member).\n\nInput Format:\nOne line with a name (single word) and two integers: salary and team size.\n\nOutput Format:\nEmployee checked in\nManager: <name>\nSalary: <salary>\nTeam size: <team>\nTeam bonus: <team * 1000>\n\nConstraints:\n1 <= salary <= 1000000, 1 <= team size <= 100",
    difficulty: "easy",
    maxscore: 10,
    topic: "Inheritance",
    subtopic: "Single Inheritance",
    inputconstrains: "1 <= salary <= 1000000, 1 <= team size <= 100",
    sampleinput1: "Priya 50000 8",
    sampleinput2: "Arjun 60000 3",
    input1: "Zoya 45000 1",
    input2: "Om 70000 20",
    input3: "Dev 30000 5",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

class Employee {
public:
    void checkIn() {
        cout << "Employee checked in" << endl;
    }
};

class Manager : public Employee {
    string name;
    int salary;
    int teamSize;
public:
    Manager(string n, int s, int t) {
        name = n;
        salary = s;
        teamSize = t;
    }
    void report() {
        checkIn();
        cout << "Manager: " << name << endl;
        cout << "Salary: " << salary << endl;
        cout << "Team size: " << teamSize << endl;
        cout << "Team bonus: " << teamSize * 1000 << endl;
    }
};

int main() {
    string name;
    int salary, team;
    cin >> name >> salary >> team;
    Manager m(name, salary, team);
    m.report();
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Washer Cycle Time Report",
    description:
      "A smart-home panel derives WashingMachine from Appliance. The inherited plug-in line comes first, followed by the washer's cycle report: number of cycles, minutes per cycle and the total wash time.\n\nInput Format:\nOne line with two integers: cycles and minutes per cycle.\n\nOutput Format:\nAppliance plugged in\nCycles: <cycles>\nMinutes per cycle: <minutes>\nTotal wash time: <cycles * minutes> minutes\n\nConstraints:\n1 <= cycles <= 20, 1 <= minutes <= 240",
    difficulty: "easy",
    maxscore: 10,
    topic: "Inheritance",
    subtopic: "Single Inheritance",
    inputconstrains: "1 <= cycles <= 20, 1 <= minutes <= 240",
    sampleinput1: "3 45",
    sampleinput2: "5 30",
    input1: "1 60",
    input2: "10 15",
    input3: "8 42",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class Appliance {
public:
    void plugIn() {
        cout << "Appliance plugged in" << endl;
    }
};

class WashingMachine : public Appliance {
    int cycles;
    int minutes;
public:
    WashingMachine(int c, int m) {
        cycles = c;
        minutes = m;
    }
    void cycleReport() {
        plugIn();
        cout << "Cycles: " << cycles << endl;
        cout << "Minutes per cycle: " << minutes << endl;
        cout << "Total wash time: " << cycles * minutes << " minutes" << endl;
    }
};

int main() {
    int cycles, minutes;
    cin >> cycles >> minutes;
    WashingMachine w(cycles, minutes);
    w.cycleReport();
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Book Borrow Inheritance Report",
    description:
      "A library system derives Book from LibraryItem. The inherited registration line is printed, then the book's borrow report: title, total copies, borrowed count and the copies still available.\n\nInput Format:\nOne line with a title (single word) and two integers: total copies and borrowed count.\n\nOutput Format:\nItem registered in library\nBook: <title>\nTotal copies: <copies>\nBorrowed: <borrowed>\nAvailable: <copies - borrowed>\n\nConstraints:\n1 <= copies <= 500, 0 <= borrowed <= copies",
    difficulty: "easy",
    maxscore: 10,
    topic: "Inheritance",
    subtopic: "Single Inheritance",
    inputconstrains: "1 <= copies <= 500, 0 <= borrowed <= copies",
    sampleinput1: "CppBasics 10 4",
    sampleinput2: "Algorithms 5 0",
    input1: "PythonPro 8 8",
    input2: "DataStructs 12 7",
    input3: "Networks 3 1",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

class LibraryItem {
public:
    void registerItem() {
        cout << "Item registered in library" << endl;
    }
};

class Book : public LibraryItem {
    string title;
    int copies;
    int borrowed;
public:
    Book(string t, int c, int b) {
        title = t;
        copies = c;
        borrowed = b;
    }
    void borrowReport() {
        registerItem();
        cout << "Book: " << title << endl;
        cout << "Total copies: " << copies << endl;
        cout << "Borrowed: " << borrowed << endl;
        cout << "Available: " << copies - borrowed << endl;
    }
};

int main() {
    string title;
    int copies, borrowed;
    cin >> title >> copies >> borrowed;
    Book b(title, copies, borrowed);
    b.borrowReport();
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },

  // ----------------------------------------------------------------- medium
  {
    title: "Copier Twin Base Combo",
    description:
      "An office station combines two devices with multiple inheritance: class Copier derives from both Printer and Scanner. Read the printed pages and the scanned pages; the copier invokes both inherited features and then prints the combined total.\n\nInput Format:\nOne line with two integers: printed pages and scanned pages.\n\nOutput Format:\nPrinted pages: <printed>\nScanned pages: <scanned>\nTotal pages handled: <printed + scanned>\n\nConstraints:\n0 <= printed, scanned <= 10000",
    difficulty: "medium",
    maxscore: 20,
    topic: "Inheritance",
    subtopic: "Multiple Inheritance",
    inputconstrains: "0 <= printed, scanned <= 10000",
    sampleinput1: "12 7",
    sampleinput2: "0 9",
    input1: "5 5",
    input2: "100 1",
    input3: "3 0",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class Printer {
public:
    void printDoc(int pages) {
        cout << "Printed pages: " << pages << endl;
    }
};

class Scanner {
public:
    void scanDoc(int pages) {
        cout << "Scanned pages: " << pages << endl;
    }
};

class Copier : public Printer, public Scanner {
public:
    void report(int printed, int scanned) {
        printDoc(printed);
        scanDoc(scanned);
        cout << "Total pages handled: " << printed + scanned << endl;
    }
};

int main() {
    int printed, scanned;
    cin >> printed >> scanned;
    Copier c;
    c.report(printed, scanned);
    return 0;
}`,
    blacklist: "printf",
    whitelist: "class, public, cin, cout",
  },
  {
    title: "Turbo Build Chain Reporter",
    description:
      "A factory tracks the construction order of a three-level chain: Core -> Engine -> TurboCar. Each constructor receives its data through constructor chaining and prints one build line, and finally the car prints its spec with total horsepower (engine power + turbo boost).\n\nInput Format:\nOne line with three integers: core id, engine power, turbo boost.\n\nOutput Format:\nCore <id> constructed\nEngine <power> hp constructed\nTurbo +<boost> installed\nCar spec: core <id>, <power + boost> hp total\n\nConstraints:\n1 <= core id <= 9999, 1 <= power <= 2000, 0 <= boost <= 500",
    difficulty: "medium",
    maxscore: 20,
    topic: "Inheritance",
    subtopic: "Multilevel Inheritance",
    inputconstrains: "1 <= core id <= 9999, 1 <= power <= 2000, 0 <= boost <= 500",
    sampleinput1: "101 120 30",
    sampleinput2: "202 90 10",
    input1: "1 5 5",
    input2: "777 200 100",
    input3: "55 80 0",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class Core {
    int coreId;
public:
    Core(int id) {
        coreId = id;
        cout << "Core " << coreId << " constructed" << endl;
    }
    int getCore() {
        return coreId;
    }
};

class Engine : public Core {
    int power;
public:
    Engine(int id, int p) : Core(id) {
        power = p;
        cout << "Engine " << power << " hp constructed" << endl;
    }
    int getPower() {
        return power;
    }
};

class TurboCar : public Engine {
    int boost;
public:
    TurboCar(int id, int p, int b) : Engine(id, p) {
        boost = b;
        cout << "Turbo +" << boost << " installed" << endl;
    }
    void spec() {
        cout << "Car spec: core " << getCore() << ", " << getPower() + boost << " hp total" << endl;
    }
};

int main() {
    int id, power, boost;
    cin >> id >> power >> boost;
    TurboCar t(id, power, boost);
    t.spec();
    return 0;
}`,
    blacklist: "printf",
    whitelist: "class, public, int",
  },
  {
    title: "Private Ledger Public Bridge",
    description:
      "A bank keeps its balance private inside class Account. Derived class Savings cannot touch the field directly, so every read goes through the public getter. Read the balance and a withdrawal amount and print the report produced through this public bridge.\n\nInput Format:\nOne line with two integers: balance and withdrawal amount.\n\nOutput Format:\nBalance via getter: <balance>\nAfter withdrawal: <balance - amount>\n\nConstraints:\n1 <= balance <= 1000000, 0 <= amount <= balance",
    difficulty: "medium",
    maxscore: 20,
    topic: "Inheritance",
    subtopic: "Access Specifiers in Inheritance",
    inputconstrains: "1 <= balance <= 1000000, 0 <= amount <= balance",
    sampleinput1: "5000 1200",
    sampleinput2: "8000 8000",
    input1: "1000 999",
    input2: "2500 2500",
    input3: "10000 3500",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class Account {
private:
    int balance;
public:
    Account(int b) {
        balance = b;
    }
    int getBalance() {
        return balance;
    }
};

class Savings : public Account {
public:
    Savings(int b) : Account(b) {
    }
    void withdraw(int amount) {
        cout << "Balance via getter: " << getBalance() << endl;
        cout << "After withdrawal: " << getBalance() - amount << endl;
    }
};

int main() {
    int balance, amount;
    cin >> balance >> amount;
    Savings s(balance);
    s.withdraw(amount);
    return 0;
}`,
    blacklist: "printf",
    whitelist: "class, public, private",
  },
  {
    title: "Hidden Method Scope Rescue",
    description:
      "A gadget firmware upgrade adds SmartGadget with its own status() that hides the base Gadget version. The derived method reports a boosted figure first and then rescues the hidden base method with the scope resolution operator.\n\nInput Format:\nOne line with one integer: battery percent.\n\nOutput Format:\nSmart mode: <battery + 10> percent boosted\nBattery status: <battery> percent\n\nConstraints:\n0 <= battery <= 100",
    difficulty: "medium",
    maxscore: 20,
    topic: "Inheritance",
    subtopic: "Single Inheritance",
    inputconstrains: "0 <= battery <= 100",
    sampleinput1: "60",
    sampleinput2: "0",
    input1: "100",
    input2: "15",
    input3: "99",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class Gadget {
public:
    void status(int battery) {
        cout << "Battery status: " << battery << " percent" << endl;
    }
};

class SmartGadget : public Gadget {
public:
    void status(int battery) {
        cout << "Smart mode: " << battery + 10 << " percent boosted" << endl;
        Gadget::status(battery);
    }
};

int main() {
    int battery;
    cin >> battery;
    SmartGadget sg;
    sg.status(battery);
    return 0;
}`,
    blacklist: "printf",
    whitelist: "class, public, Gadget::",
  },
  {
    title: "Graduate Pipeline Level Report",
    description:
      "A university pipeline stacks three levels: Person holds the name, Student adds the roll number and Graduate adds a research score, all passed down through chained constructors using protected members. Print the final graduate report; the verdict is Funded when the research score is at least 50, otherwise Pending.\n\nInput Format:\nOne line with a name (single word) and two integers: roll and research score.\n\nOutput Format:\nGraduate: <name>\nRoll: <roll>\nResearch score: <score>\nVerdict: <Funded or Pending>\n\nConstraints:\n1 <= roll <= 999, 0 <= score <= 100",
    difficulty: "medium",
    maxscore: 20,
    topic: "Inheritance",
    subtopic: "Multilevel Inheritance",
    inputconstrains: "1 <= roll <= 999, 0 <= score <= 100",
    sampleinput1: "Meera 21 78",
    sampleinput2: "Iqbal 34 45",
    input1: "Ravi 12 50",
    input2: "Zoya 99 49",
    input3: "Om 7 100",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

class Person {
protected:
    string name;
public:
    Person(string n) {
        name = n;
    }
};

class Student : public Person {
protected:
    int roll;
public:
    Student(string n, int r) : Person(n) {
        roll = r;
    }
};

class Graduate : public Student {
    int score;
public:
    Graduate(string n, int r, int s) : Student(n, r) {
        score = s;
    }
    void report() {
        cout << "Graduate: " << name << endl;
        cout << "Roll: " << roll << endl;
        cout << "Research score: " << score << endl;
        if (score >= 50) {
            cout << "Verdict: Funded" << endl;
        } else {
            cout << "Verdict: Pending" << endl;
        }
    }
};

int main() {
    string name;
    int roll, score;
    cin >> name >> roll >> score;
    Graduate g(name, roll, score);
    g.report();
    return 0;
}`,
    blacklist: "printf",
    whitelist: "class, public, string",
  },
  {
    title: "Staff Tree Bonus Split",
    description:
      "One base class Staff feeds a hierarchical employee tree with two children that calculate bonuses differently: a Manager gets one fifth of the salary and an Engineer gets one tenth of the salary plus 500 rupees. Read the shared name and salary, build both children and print both bonus lines.\n\nInput Format:\nOne line with a name (single word) and one integer: salary.\n\nOutput Format:\nManager <name> bonus: <salary / 5>\nEngineer <name> bonus: <salary / 10 + 500>\n\nConstraints:\n100 <= salary <= 1000000",
    difficulty: "medium",
    maxscore: 20,
    topic: "Inheritance",
    subtopic: "Hierarchical Inheritance",
    inputconstrains: "100 <= salary <= 1000000",
    sampleinput1: "Ravi 60000",
    sampleinput2: "Nila 25000",
    input1: "Om 100000",
    input2: "Dev 1000",
    input3: "Tara 50000",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

class Staff {
protected:
    string name;
    int salary;
public:
    Staff(string n, int s) {
        name = n;
        salary = s;
    }
};

class Manager : public Staff {
public:
    Manager(string n, int s) : Staff(n, s) {
    }
    void bonus() {
        cout << "Manager " << name << " bonus: " << salary / 5 << endl;
    }
};

class Engineer : public Staff {
public:
    Engineer(string n, int s) : Staff(n, s) {
    }
    void bonus() {
        cout << "Engineer " << name << " bonus: " << salary / 10 + 500 << endl;
    }
};

int main() {
    string name;
    int salary;
    cin >> name >> salary;
    Manager m(name, salary);
    Engineer e(name, salary);
    m.bonus();
    e.bonus();
    return 0;
}`,
    blacklist: "printf",
    whitelist: "class, public, protected",
  },

  // ------------------------------------------------------------------- hard
  {
    title: "Smart Phone Virtual Diamond",
    description:
      "A phone platform has the classic diamond: Device is inherited virtually by Phone and by Camera, and SmartPhone inherits from both. The virtual base must be constructed exactly once, so the Device line prints a single time before the two modules report ready. Read the battery percent and the camera megapixels, then print the feature report.\n\nInput Format:\nOne line with two integers: battery percent and megapixels.\n\nOutput Format:\nDevice core online, battery <battery>\nPhone module ready\nCamera module ready\nSmartPhone feature report\nCalling with battery <battery>\nShot taken at <megapixels> MP\nBattery check: <battery>\n\nConstraints:\n1 <= battery <= 100, 0 <= megapixels <= 200",
    difficulty: "hard",
    maxscore: 30,
    topic: "Inheritance",
    subtopic: "Virtual Base Classes",
    inputconstrains: "1 <= battery <= 100, 0 <= megapixels <= 200",
    sampleinput1: "85 48",
    sampleinput2: "100 12",
    input1: "1 108",
    input2: "50 0",
    input3: "99 64",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class Device {
protected:
    int battery;
public:
    Device(int b) {
        battery = b;
        cout << "Device core online, battery " << battery << endl;
    }
    int getBattery() {
        return battery;
    }
};

class Phone : virtual public Device {
public:
    Phone(int b) : Device(b) {
        cout << "Phone module ready" << endl;
    }
    void call() {
        cout << "Calling with battery " << getBattery() << endl;
    }
};

class Camera : virtual public Device {
public:
    Camera(int b) : Device(b) {
        cout << "Camera module ready" << endl;
    }
    void shoot(int mp) {
        cout << "Shot taken at " << mp << " MP" << endl;
    }
};

class SmartPhone : public Phone, public Camera {
    int megapixels;
public:
    SmartPhone(int b, int mp) : Device(b), Phone(b), Camera(b) {
        megapixels = mp;
    }
    void featureReport() {
        cout << "SmartPhone feature report" << endl;
        call();
        shoot(megapixels);
        cout << "Battery check: " << getBattery() << endl;
    }
};

int main() {
    int b, mp;
    cin >> b >> mp;
    SmartPhone s(b, mp);
    s.featureReport();
    return 0;
}`,
    blacklist: "printf",
    whitelist: "class, public, virtual",
  },
  {
    title: "Fleet Pricing Level Engine",
    description:
      "A logistics firm prices an electric truck through a multilevel chain Vehicle -> Truck -> ElectricTruck, where every level contributes part of the price: the base level computes the running cost (rate * distance / 10), the truck level adds a cargo fee (tons * 50), and the electric level applies a green discount of one tenth of the subtotal. Read the rate, the distance and the cargo tons, then print the invoice.\n\nInput Format:\nOne line with three integers: rate, distance, cargo tons.\n\nOutput Format:\nBase running cost: <rate * distance / 10>\nCargo handling fee: <tons * 50>\nSubtotal: <base + fee>\nGreen discount: <subtotal / 10>\nPayable: <subtotal - discount>\n\nConstraints:\n1 <= rate <= 100, 0 <= distance <= 100000, 0 <= tons <= 100",
    difficulty: "hard",
    maxscore: 30,
    topic: "Inheritance",
    subtopic: "Multilevel Inheritance",
    inputconstrains: "1 <= rate <= 100, 0 <= distance <= 100000, 0 <= tons <= 100",
    sampleinput1: "40 120 5",
    sampleinput2: "50 0 0",
    input1: "10 1000 8",
    input2: "25 45 1",
    input3: "80 300 20",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class Vehicle {
protected:
    int rate;
    int distance;
public:
    Vehicle(int r, int d) {
        rate = r;
        distance = d;
    }
    int baseCost() {
        return rate * distance / 10;
    }
};

class Truck : public Vehicle {
protected:
    int tons;
public:
    Truck(int r, int d, int t) : Vehicle(r, d) {
        tons = t;
    }
    int cargoFee() {
        return tons * 50;
    }
};

class ElectricTruck : public Truck {
public:
    ElectricTruck(int r, int d, int t) : Truck(r, d, t) {
    }
    void invoice() {
        int base = baseCost();
        int fee = cargoFee();
        int total = base + fee;
        int green = total / 10;
        cout << "Base running cost: " << base << endl;
        cout << "Cargo handling fee: " << fee << endl;
        cout << "Subtotal: " << total << endl;
        cout << "Green discount: " << green << endl;
        cout << "Payable: " << total - green << endl;
    }
};

int main() {
    int rate, distance, tons;
    cin >> rate >> distance >> tons;
    ElectricTruck e(rate, distance, tons);
    e.invoice();
    return 0;
}`,
    blacklist: "printf",
    whitelist: "class, public, protected",
  },
  {
    title: "Campus Registry Console",
    description:
      "A university registry runs on hierarchical inheritance: Person branches into Student and Professor. The console reads a count and then that many commands; each command starts with the word student or professor, followed by a name and a value (marks for students, publication count for professors). Students print a grade (PASS at 40 marks or more, otherwise FAIL) and professors print a status (ACTIVE at 5 publications or more, otherwise RISING).\n\nInput Format:\nFirst line: integer n.\nNext n lines: <kind> <name> <value> where kind is student or professor.\n\nOutput Format:\nFor each entry in input order:\nSTUDENT <name> marks <value> grade <PASS or FAIL>\nPROFESSOR <name> publications <value> status <ACTIVE or RISING>\n\nConstraints:\n1 <= n <= 20, 0 <= marks, publications <= 100",
    difficulty: "hard",
    maxscore: 30,
    topic: "Inheritance",
    subtopic: "Hierarchical Inheritance",
    inputconstrains: "1 <= n <= 20, 0 <= marks, publications <= 100",
    sampleinput1: "3\nstudent Asha 82\nprofessor Rao 7\nstudent Iqbal 33",
    sampleinput2: "2\nprofessor Sen 2\nstudent Bo 40",
    input1: "1\nstudent Zoya 100",
    input2: "4\nprofessor Iyer 5\nstudent Om 0\nprofessor Das 12\nstudent Dev 39",
    input3: "2\nstudent Kiran 41\nprofessor Menon 4",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

class Person {
protected:
    string name;
public:
    Person(string n) {
        name = n;
    }
};

class Student : public Person {
    int marks;
public:
    Student(string n, int m) : Person(n) {
        marks = m;
    }
    void show() {
        cout << "STUDENT " << name << " marks " << marks;
        if (marks >= 40) {
            cout << " grade PASS" << endl;
        } else {
            cout << " grade FAIL" << endl;
        }
    }
};

class Professor : public Person {
    int papers;
public:
    Professor(string n, int p) : Person(n) {
        papers = p;
    }
    void show() {
        cout << "PROFESSOR " << name << " publications " << papers;
        if (papers >= 5) {
            cout << " status ACTIVE" << endl;
        } else {
            cout << " status RISING" << endl;
        }
    }
};

int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) {
        string kind, name;
        int value;
        cin >> kind >> name >> value;
        if (kind == "student") {
            Student s(name, value);
            s.show();
        } else {
            Professor p(name, value);
            p.show();
        }
    }
    return 0;
}`,
    blacklist: "printf",
    whitelist: "class, public, if",
  },
  {
    title: "Media Library Twin Traits",
    description:
      "A media platform models a library with multiple inheritance: MediaLibrary gains play tracking from Playable and size tracking from Downloadable. Read a count and then that many items (song or video, duration in seconds, size in MB); each item prints a queued line and feeds both traits, and the end prints the combined stats.\n\nInput Format:\nFirst line: integer n.\nNext n lines: <kind> <seconds> <mb> where kind is song or video.\n\nOutput Format:\nFor each item in input order:\n<kind> queued: <seconds> sec, <mb> MB\nThen at the end:\nTotal play time: <sum of seconds> seconds\nTotal download size: <sum of mb> MB\n\nConstraints:\n1 <= n <= 20, 0 <= seconds <= 3600, 0 <= mb <= 5000",
    difficulty: "hard",
    maxscore: 30,
    topic: "Inheritance",
    subtopic: "Multiple Inheritance",
    inputconstrains: "1 <= n <= 20, 0 <= seconds <= 3600, 0 <= mb <= 5000",
    sampleinput1: "2\nsong 180 8\nvideo 240 350",
    sampleinput2: "1\nsong 120 5",
    input1: "3\nsong 45 3\nvideo 90 200\nsong 60 2",
    input2: "1\nvideo 0 0",
    input3: "4\nsong 30 1\nvideo 45 90\nsong 15 1\nvideo 120 250",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

class Playable {
protected:
    int totalSeconds;
public:
    Playable() {
        totalSeconds = 0;
    }
    void addPlay(int seconds) {
        totalSeconds += seconds;
    }
    int playTime() {
        return totalSeconds;
    }
};

class Downloadable {
protected:
    int totalMb;
public:
    Downloadable() {
        totalMb = 0;
    }
    void addDownload(int mb) {
        totalMb += mb;
    }
    int dataSize() {
        return totalMb;
    }
};

class MediaLibrary : public Playable, public Downloadable {
public:
    void addItem(string kind, int seconds, int mb) {
        cout << kind << " queued: " << seconds << " sec, " << mb << " MB" << endl;
        addPlay(seconds);
        addDownload(mb);
    }
    void stats() {
        cout << "Total play time: " << playTime() << " seconds" << endl;
        cout << "Total download size: " << dataSize() << " MB" << endl;
    }
};

int main() {
    int n;
    cin >> n;
    MediaLibrary lib;
    for (int i = 0; i < n; i++) {
        string kind;
        int seconds, mb;
        cin >> kind >> seconds >> mb;
        lib.addItem(kind, seconds, mb);
    }
    lib.stats();
    return 0;
}`,
    blacklist: "printf",
    whitelist: "class, public, for",
  },
];

export const mcqs = [
  // ------------------------------------------------------------------ easy
  {
    title: "Meaning of Inheritance",
    description: "In object oriented programming, what does inheritance allow one class to do?",
    difficulty: "easy",
    topic: "Inheritance",
    subtopic: "Single Inheritance",
    Option1: "Redefine operators for built-in types",
    Option2: "Acquire the members of an existing class and extend it",
    Option3: "Split a program into multiple files",
    Option4: "Convert a global function into a member function",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Base and Derived Terminology",
    description: "When class B is declared as class B : public A, what is class A called?",
    difficulty: "easy",
    topic: "Inheritance",
    subtopic: "Single Inheritance",
    Option1: "The base class (parent)",
    Option2: "The derived class",
    Option3: "The friend class",
    Option4: "The sibling class",
    CorrectOption: 1,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Members Not Inherited by a Derived Class",
    description: "Which of the following is normally NOT inherited by a derived class?",
    difficulty: "easy",
    topic: "Inheritance",
    subtopic: "Single Inheritance",
    Option1: "Public member functions",
    Option2: "Protected data members",
    Option3: "Constructors and destructors",
    Option4: "Public data members",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Public Inheritance Access Rule",
    description: "Under public inheritance (class D : public B), the public members of B become ______ in D.",
    difficulty: "easy",
    topic: "Inheritance",
    subtopic: "Access Specifiers in Inheritance",
    Option1: "Private",
    Option2: "Protected",
    Option3: "Invisible",
    Option4: "Public",
    CorrectOption: 4,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Single Versus Multiple Inheritance",
    description: "What is the key difference between single and multiple inheritance?",
    difficulty: "easy",
    topic: "Inheritance",
    subtopic: "Multiple Inheritance",
    Option1: "Single inheritance uses one base class, multiple inheritance uses two or more base classes",
    Option2: "Single inheritance allows only one object of the class",
    Option3: "Multiple inheritance requires virtual functions to compile",
    Option4: "Single inheritance hides base members, multiple inheritance exposes them",
    CorrectOption: 1,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Primary Benefit of Inheritance",
    description: "Which benefit does inheritance mainly provide?",
    difficulty: "easy",
    topic: "Inheritance",
    subtopic: "Single Inheritance",
    Option1: "Faster arithmetic operations",
    Option2: "Code reuse by building new classes on top of existing ones",
    Option3: "Automatic garbage collection",
    Option4: "Compile-time encryption of source code",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "What a Derived Class Can Do",
    description: "An object of a derived class can:",
    difficulty: "easy",
    topic: "Inheritance",
    subtopic: "Hierarchical Inheritance",
    Option1: "Use only the members it declares itself",
    Option2: "Never call base class functions",
    Option3: "Use inherited members and also add its own new members",
    Option4: "Access the private members of the base directly",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Colon Syntax for Inheritance",
    description: "Which declaration correctly makes class Car inherit publicly from class Vehicle?",
    difficulty: "easy",
    topic: "Inheritance",
    subtopic: "Single Inheritance",
    Option1: "class Vehicle : public Car",
    Option2: "class Car inherits Vehicle",
    Option3: "class Car > Vehicle",
    Option4: "class Car : public Vehicle",
    CorrectOption: 4,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Is-a Relationship Model",
    description: "A Dog class derived publicly from an Animal class models which relationship?",
    difficulty: "easy",
    topic: "Inheritance",
    subtopic: "Single Inheritance",
    Option1: "Dog is-an Animal",
    Option2: "Animal is-a Dog",
    Option3: "Dog has-an Animal",
    Option4: "Dog equals Animal",
    CorrectOption: 1,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Protected Members Inside a Derived Class",
    description: "Under public inheritance, where can a protected member of the base class be used?",
    difficulty: "easy",
    topic: "Inheritance",
    subtopic: "Access Specifiers in Inheritance",
    Option1: "Anywhere in the program",
    Option2: "Inside the derived class and its further derived classes",
    Option3: "Only inside main()",
    Option4: "Nowhere at all",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },

  // ----------------------------------------------------------------- medium
  {
    title: "Base Constructor Runs Before Derived",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "Inheritance",
    subtopic: "Single Inheritance",
    Option1: "Derived up Base up",
    Option2: "Base up",
    Option3: "Base up Derived up",
    Option4: "Derived up",
    CorrectOption: 3,
    codesnippet: `#include <iostream>
using namespace std;
class Base {
public:
    Base() { cout << "Base up"; }
};
class Derived : public Base {
public:
    Derived() { cout << " Derived up"; }
};
int main() {
    Derived d;
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nclass Base {\npublic:\n    Base() { cout << "Base up"; }\n};\nclass Derived : public Base {\npublic:\n    Derived() { cout << " Derived up"; }\n};\nint main() {\n    Derived d;\n    return 0;\n}`,
      stdin: "",
      expected: "Base up Derived up",
    },
  },
  {
    title: "Three Methods Through the Chain",
    description: "A SportsCar object inherits through two levels. What does this program print?",
    difficulty: "medium",
    topic: "Inheritance",
    subtopic: "Multilevel Inheritance",
    Option1: "Engine starts Car drives Turbo boosts",
    Option2: "Turbo boosts Car drives Engine starts",
    Option3: "Engine starts",
    Option4: "Compile error: start is not accessible",
    CorrectOption: 1,
    codesnippet: `#include <iostream>
using namespace std;
class Engine {
public:
    void start() { cout << "Engine starts"; }
};
class Car : public Engine {
public:
    void drive() { cout << " Car drives"; }
};
class SportsCar : public Car {
public:
    void boost() { cout << " Turbo boosts"; }
};
int main() {
    SportsCar s;
    s.start();
    s.drive();
    s.boost();
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nclass Engine {\npublic:\n    void start() { cout << "Engine starts"; }\n};\nclass Car : public Engine {\npublic:\n    void drive() { cout << " Car drives"; }\n};\nclass SportsCar : public Car {\npublic:\n    void boost() { cout << " Turbo boosts"; }\n};\nint main() {\n    SportsCar s;\n    s.start();\n    s.drive();\n    s.boost();\n    return 0;\n}`,
      stdin: "",
      expected: "Engine starts Car drives Turbo boosts",
    },
  },
  {
    title: "Protected Pin Via Derived Peek",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "Inheritance",
    subtopic: "Access Specifiers in Inheritance",
    Option1: "Compile error: pin is private",
    Option2: "Pin is 0",
    Option3: "Pin is 420",
    Option4: "Pin is 42",
    CorrectOption: 4,
    codesnippet: `#include <iostream>
using namespace std;
class Vault {
protected:
    int pin;
public:
    Vault() { pin = 42; }
};
class Manager : public Vault {
public:
    void peek() { cout << "Pin is " << pin; }
};
int main() {
    Manager m;
    m.peek();
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nclass Vault {\nprotected:\n    int pin;\npublic:\n    Vault() { pin = 42; }\n};\nclass Manager : public Vault {\npublic:\n    void peek() { cout << "Pin is " << pin; }\n};\nint main() {\n    Manager m;\n    m.peek();\n    return 0;\n}`,
      stdin: "",
      expected: "Pin is 42",
    },
  },
  {
    title: "Scope Resolution Calls Hidden Base",
    description: "The derived intro() hides the base version. What does this program print?",
    difficulty: "medium",
    topic: "Inheritance",
    subtopic: "Single Inheritance",
    Option1: "Archer ready then Player ready",
    Option2: "Player ready then Archer ready",
    Option3: "Archer ready then Archer ready",
    Option4: "Player ready",
    CorrectOption: 2,
    codesnippet: `#include <iostream>
using namespace std;
class Player {
public:
    void intro() { cout << "Player ready"; }
};
class Archer : public Player {
public:
    void intro() { cout << "Archer ready"; }
    void allIntro() {
        Player::intro();
        cout << " then ";
        intro();
    }
};
int main() {
    Archer a;
    a.allIntro();
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nclass Player {\npublic:\n    void intro() { cout << "Player ready"; }\n};\nclass Archer : public Player {\npublic:\n    void intro() { cout << "Archer ready"; }\n    void allIntro() {\n        Player::intro();\n        cout << " then ";\n        intro();\n    }\n};\nint main() {\n    Archer a;\n    a.allIntro();\n    return 0;\n}`,
      stdin: "",
      expected: "Player ready then Archer ready",
    },
  },
  {
    title: "Private Members Stay Locked",
    description: "Under public inheritance, which members of the base class can NOT be accessed directly inside the derived class?",
    difficulty: "medium",
    topic: "Inheritance",
    subtopic: "Access Specifiers in Inheritance",
    Option1: "Protected data members",
    Option2: "Public member functions",
    Option3: "Private data members",
    Option4: "Public data members",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Purpose of Virtual Base Classes",
    description: "Classes B and C both inherit from A, and class D inherits from both B and C. Why would A be declared as a virtual base class?",
    difficulty: "medium",
    topic: "Inheritance",
    subtopic: "Virtual Base Classes",
    Option1: "To stop D from calling B's functions",
    Option2: "To make A's constructor run twice for safety",
    Option3: "So that only one shared A subobject exists inside D, avoiding duplication",
    Option4: "To convert all members of A to public",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },

  // ------------------------------------------------------------------- hard
  {
    title: "Three Level Construction Destruction Trace",
    description: "What does this program print? Track the constructor and destructor order carefully.",
    difficulty: "hard",
    topic: "Inheritance",
    subtopic: "Multilevel Inheritance",
    Option1: "C+ B+ A+ A- B- C-",
    Option2: "A+ B+ C+ C- B- A-",
    Option3: "A+ B+ C+ A- B- C-",
    Option4: "C+ B+ A+ C- B- A-",
    CorrectOption: 2,
    codesnippet: `#include <iostream>
using namespace std;
class A {
public:
    A() { cout << "A+ "; }
    ~A() { cout << "A- "; }
};
class B : public A {
public:
    B() { cout << "B+ "; }
    ~B() { cout << "B- "; }
};
class C : public B {
public:
    C() { cout << "C+ "; }
    ~C() { cout << "C- "; }
};
int main() {
    C obj;
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nclass A {\npublic:\n    A() { cout << "A+ "; }\n    ~A() { cout << "A- "; }\n};\nclass B : public A {\npublic:\n    B() { cout << "B+ "; }\n    ~B() { cout << "B- "; }\n};\nclass C : public B {\npublic:\n    C() { cout << "C+ "; }\n    ~C() { cout << "C- "; }\n};\nint main() {\n    C obj;\n    return 0;\n}`,
      stdin: "",
      expected: "A+ B+ C+ C- B- A-",
    },
  },
  {
    title: "Virtual Base Constructed Once First",
    description: "Radio and Screen share the virtual base Power, and Phone inherits from both. What does this program print?",
    difficulty: "hard",
    topic: "Inheritance",
    subtopic: "Virtual Base Classes",
    Option1: "R S P F",
    Option2: "P S R F",
    Option3: "P R S F",
    Option4: "R S F P",
    CorrectOption: 3,
    codesnippet: `#include <iostream>
using namespace std;
class Power {
public:
    Power() { cout << "P "; }
};
class Radio : virtual public Power {
public:
    Radio() { cout << "R "; }
};
class Screen : virtual public Power {
public:
    Screen() { cout << "S "; }
};
class Phone : public Radio, public Screen {
public:
    Phone() { cout << "F"; }
};
int main() {
    Phone p;
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nclass Power {\npublic:\n    Power() { cout << "P "; }\n};\nclass Radio : virtual public Power {\npublic:\n    Radio() { cout << "R "; }\n};\nclass Screen : virtual public Power {\npublic:\n    Screen() { cout << "S "; }\n};\nclass Phone : public Radio, public Screen {\npublic:\n    Phone() { cout << "F"; }\n};\nint main() {\n    Phone p;\n    return 0;\n}`,
      stdin: "",
      expected: "P R S F",
    },
  },
  {
    title: "Base Pointer Non-Virtual Call",
    description: "There is no virtual keyword anywhere. What does this program print?",
    difficulty: "hard",
    topic: "Inheritance",
    subtopic: "Single Inheritance",
    Option1: "Round circle",
    Option2: "Generic shape",
    Option3: "Generic shapeRound circle",
    Option4: "Compile error: ambiguous call",
    CorrectOption: 2,
    codesnippet: `#include <iostream>
using namespace std;
class Shape {
public:
    void info() { cout << "Generic shape"; }
};
class Circle : public Shape {
public:
    void info() { cout << "Round circle"; }
};
int main() {
    Circle c;
    Shape* ptr = &c;
    ptr->info();
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nclass Shape {\npublic:\n    void info() { cout << "Generic shape"; }\n};\nclass Circle : public Shape {\npublic:\n    void info() { cout << "Round circle"; }\n};\nint main() {\n    Circle c;\n    Shape* ptr = &c;\n    ptr->info();\n    return 0;\n}`,
      stdin: "",
      expected: "Generic shape",
    },
  },
  {
    title: "Diamond Problem Trigger",
    description: "When does the classic diamond problem appear in C++ multiple inheritance?",
    difficulty: "hard",
    topic: "Inheritance",
    subtopic: "Multiple Inheritance",
    Option1: "When a class inherits the same base class along two paths, duplicating that base's members",
    Option2: "When a destructor is called before the constructor",
    Option3: "When a derived class declares no constructors of its own",
    Option4: "When two base classes use different access specifiers",
    CorrectOption: 1,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
];
