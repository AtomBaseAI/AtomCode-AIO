/**
 * OOPS using CPP — Day 12: Introduction to Object-Oriented Programming (OOP)
 * 20 code questions (10 easy: 6 basics + 4 real-world, 6 medium, 4 hard)
 * 20 MCQs (10 easy, 6 medium, 4 hard)
 * All solutions are fresh C++ written for this course (no conversions).
 */
export const meta = {
  day: 12,
  topic: "Introduction to Object-Oriented Programming (OOP)",
};

export const code = [
  // ------------------------------------------------------------------ easy
  {
    title: "Student Mark Card",
    description:
      "Help a teacher log marks using classes. Define a class Student with a public name (string) and mark (int), read them from input, and call its display() member function to print the details.\n\nInput Format:\nOne line with two tokens: name (single word) and mark (integer).\n\nOutput Format:\nStudent: <name>\nMark: <mark>\n\nConstraints:\n0 <= mark <= 100",
    difficulty: "easy",
    maxscore: 10,
    topic: "Introduction to Object-Oriented Programming (OOP)",
    subtopic: "Classes and Objects",
    inputconstrains: "0 <= mark <= 100",
    sampleinput1: "Aarav 87",
    sampleinput2: "Diya 92",
    input1: "Kabir 45",
    input2: "Meera 100",
    input3: "Zoya 0",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

class Student {
public:
    string name;
    int mark;
    void display() {
        cout << "Student: " << name << endl;
        cout << "Mark: " << mark << endl;
    }
};

int main() {
    Student s;
    cin >> s.name >> s.mark;
    s.display();
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Rectangle Class Area",
    description:
      "A drafting tool stores shapes as objects. Define a class Rectangle with public width and height, read both from input, and let a member function print the dimensions and call the area() member function for the area.\n\nInput Format:\nOne line with two integers: width and height.\n\nOutput Format:\nRectangle <width>x<height>\nArea: <width * height>\n\nConstraints:\n1 <= width, height <= 1000",
    difficulty: "easy",
    maxscore: 10,
    topic: "Introduction to Object-Oriented Programming (OOP)",
    subtopic: "Member Functions",
    inputconstrains: "1 <= width, height <= 1000",
    sampleinput1: "5 4",
    sampleinput2: "12 9",
    input1: "1 1",
    input2: "7 3",
    input3: "100 250",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class Rectangle {
public:
    int width;
    int height;
    int area() {
        return width * height;
    }
    void print() {
        cout << "Rectangle " << width << "x" << height << endl;
        cout << "Area: " << area() << endl;
    }
};

int main() {
    Rectangle r;
    cin >> r.width >> r.height;
    r.print();
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Box Set and Show",
    description:
      "A packaging app models every parcel as a Box object. Define a class Box with a private side, a setSide() setter, a getSide() getter and a show() member function. Read the side, store it through the setter and call show().\n\nInput Format:\nOne line with one integer: side.\n\nOutput Format:\nBox side: <side>\nVolume: <side * side * side>\n\nConstraints:\n1 <= side <= 50",
    difficulty: "easy",
    maxscore: 10,
    topic: "Introduction to Object-Oriented Programming (OOP)",
    subtopic: "Getters and Setters",
    inputconstrains: "1 <= side <= 50",
    sampleinput1: "3",
    sampleinput2: "5",
    input1: "1",
    input2: "10",
    input3: "50",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class Box {
private:
    int side;
public:
    void setSide(int s) {
        side = s;
    }
    int getSide() {
        return side;
    }
    void show() {
        cout << "Box side: " << side << endl;
        cout << "Volume: " << side * side * side << endl;
    }
};

int main() {
    Box b;
    int s;
    cin >> s;
    b.setSide(s);
    b.show();
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Counter Increment Class",
    description:
      "A turnstile engineer simulates clicks with a class. Define a class Counter with a private count, a setStart() setter, an increment() member function that adds 1 and a print() member function. Read the start value and the number of increments n, then after every increment print the current count.\n\nInput Format:\nOne line with two integers: start value and n.\n\nOutput Format:\nStart: <start>\nThen n lines, one after each increment:\nCount: <current count>\n\nConstraints:\n0 <= start <= 99, 1 <= n <= 5",
    difficulty: "easy",
    maxscore: 10,
    topic: "Introduction to Object-Oriented Programming (OOP)",
    subtopic: "Member Functions",
    inputconstrains: "0 <= start <= 99, 1 <= n <= 5",
    sampleinput1: "10 3",
    sampleinput2: "0 2",
    input1: "95 5",
    input2: "40 1",
    input3: "7 4",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class Counter {
private:
    int count;
public:
    void setStart(int c) {
        count = c;
    }
    void increment() {
        count = count + 1;
    }
    void print() {
        cout << "Count: " << count << endl;
    }
};

int main() {
    Counter c;
    int start, n;
    cin >> start >> n;
    c.setStart(start);
    cout << "Start: " << start << endl;
    for (int i = 0; i < n; i++) {
        c.increment();
        c.print();
    }
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Point Coordinate Class",
    description:
      "A graphics utility stores positions as objects. Define a class Point with private x and y, a setXY() setter and a print() member function that outputs the coordinates in brackets.\n\nInput Format:\nOne line with two integers: x and y.\n\nOutput Format:\n(x, y)\n\nConstraints:\n-100 <= x, y <= 100",
    difficulty: "easy",
    maxscore: 10,
    topic: "Introduction to Object-Oriented Programming (OOP)",
    subtopic: "Classes and Objects",
    inputconstrains: "-100 <= x, y <= 100",
    sampleinput1: "3 4",
    sampleinput2: "-2 5",
    input1: "0 0",
    input2: "-7 -9",
    input3: "100 -100",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class Point {
private:
    int x;
    int y;
public:
    void setXY(int a, int b) {
        x = a;
        y = b;
    }
    void print() {
        cout << "(" << x << ", " << y << ")" << endl;
    }
};

int main() {
    Point p;
    int a, b;
    cin >> a >> b;
    p.setXY(a, b);
    p.print();
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Book Details Class",
    description:
      "A library catalogue lists every book as an object. Define a class Book with a public title (string) and pages (int), read them, and call its printDetails() member function.\n\nInput Format:\nOne line with two tokens: title (single word) and pages (integer).\n\nOutput Format:\nTitle: <title>\nPages: <pages>\n\nConstraints:\n1 <= pages <= 2000",
    difficulty: "easy",
    maxscore: 10,
    topic: "Introduction to Object-Oriented Programming (OOP)",
    subtopic: "Member Functions",
    inputconstrains: "1 <= pages <= 2000",
    sampleinput1: "CppBasics 120",
    sampleinput2: "DataStructures 450",
    input1: "Algorithms 900",
    input2: "OOPGuide 210",
    input3: "CppFAQ 75",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

class Book {
public:
    string title;
    int pages;
    void printDetails() {
        cout << "Title: " << title << endl;
        cout << "Pages: " << pages << endl;
    }
};

int main() {
    Book b;
    cin >> b.title >> b.pages;
    b.printDetails();
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Bank Account Statement Class",
    description:
      "A bank clerk opens an account object for a customer. Define a class BankAccount with a private owner and balance, setters setOwner() and setBalance(), a deposit() member function and a getBalance() getter. Read the owner, starting balance and a deposit amount, then print the mini statement.\n\nInput Format:\nOne line with three tokens: owner (single word), starting balance (integer) and deposit amount (integer).\n\nOutput Format:\nOwner: <owner>\nStart balance: <start>\nDeposit: <amount>\nFinal balance: <start + amount>\n\nConstraints:\n0 <= starting balance <= 100000, 0 <= deposit <= 100000",
    difficulty: "easy",
    maxscore: 10,
    topic: "Introduction to Object-Oriented Programming (OOP)",
    subtopic: "Access Modifiers",
    inputconstrains: "0 <= starting balance <= 100000, 0 <= deposit <= 100000",
    sampleinput1: "Arjun 1000 500",
    sampleinput2: "Nina 0 250",
    input1: "Ravi 5000 2000",
    input2: "Zoya 100 0",
    input3: "Sam 99999 1",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

class BankAccount {
private:
    string owner;
    long long balance;
public:
    void setOwner(string o) {
        owner = o;
    }
    void setBalance(long long b) {
        balance = b;
    }
    void deposit(long long amount) {
        balance = balance + amount;
    }
    long long getBalance() {
        return balance;
    }
    string getOwner() {
        return owner;
    }
};

int main() {
    BankAccount acc;
    string owner;
    long long init, amt;
    cin >> owner >> init >> amt;
    acc.setOwner(owner);
    acc.setBalance(init);
    cout << "Owner: " << acc.getOwner() << endl;
    cout << "Start balance: " << acc.getBalance() << endl;
    acc.deposit(amt);
    cout << "Deposit: " << amt << endl;
    cout << "Final balance: " << acc.getBalance() << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Car Showroom Info Class",
    description:
      "A showroom lists cars as objects. Define a class Car with a private brand (string) and speed (int), setters for both and a showInfo() member function. Read the brand and top speed, store them and call showInfo().\n\nInput Format:\nOne line with two tokens: brand (single word) and speed (integer).\n\nOutput Format:\nBrand: <brand>\nTop speed: <speed> km/h\n\nConstraints:\n40 <= speed <= 300",
    difficulty: "easy",
    maxscore: 10,
    topic: "Introduction to Object-Oriented Programming (OOP)",
    subtopic: "Class Design",
    inputconstrains: "40 <= speed <= 300",
    sampleinput1: "Swift 120",
    sampleinput2: "Bolt 90",
    input1: "Tesla 200",
    input2: "Nano 65",
    input3: "Verna 165",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

class Car {
private:
    string brand;
    int speed;
public:
    void setBrand(string b) {
        brand = b;
    }
    void setSpeed(int s) {
        speed = s;
    }
    void showInfo() {
        cout << "Brand: " << brand << endl;
        cout << "Top speed: " << speed << " km/h" << endl;
    }
};

int main() {
    Car c;
    string brand;
    int speed;
    cin >> brand >> speed;
    c.setBrand(brand);
    c.setSpeed(speed);
    c.showInfo();
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Product Bill Class",
    description:
      "A shopkeeper prints bills from Product objects. Define a class Product with private name, price and quantity, a setDetails() member function, a totalPrice() member function returning price * quantity and a printBill() member function. Read the details and print the bill.\n\nInput Format:\nOne line with three tokens: name (single word), price (integer) and quantity (integer).\n\nOutput Format:\nProduct: <name>\nPrice: <price>\nQuantity: <quantity>\nTotal: <price * quantity>\n\nConstraints:\n1 <= price <= 5000, 0 <= quantity <= 100",
    difficulty: "easy",
    maxscore: 10,
    topic: "Introduction to Object-Oriented Programming (OOP)",
    subtopic: "Member Functions",
    inputconstrains: "1 <= price <= 5000, 0 <= quantity <= 100",
    sampleinput1: "Pen 10 12",
    sampleinput2: "Notebook 45 3",
    input1: "Bag 800 2",
    input2: "Pencil 5 20",
    input3: "Eraser 7 0",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

class Product {
private:
    string name;
    int price;
    int qty;
public:
    void setDetails(string n, int p, int q) {
        name = n;
        price = p;
        qty = q;
    }
    int totalPrice() {
        return price * qty;
    }
    void printBill() {
        cout << "Product: " << name << endl;
        cout << "Price: " << price << endl;
        cout << "Quantity: " << qty << endl;
        cout << "Total: " << totalPrice() << endl;
    }
};

int main() {
    Product p;
    string name;
    int price, qty;
    cin >> name >> price >> qty;
    p.setDetails(name, price, qty);
    p.printBill();
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Temperature Class Reporter",
    description:
      "A weather widget keeps the current reading in a Temperature object. Define a class Temperature with a private celsius field, a setCelsius() setter, a getCelsius() getter and a toFahrenheit() member function returning celsius * 9.0 / 5.0 + 32.0. Read the Celsius value, store it through the setter and print both scales.\n\nInput Format:\nOne line with one integer: temperature in Celsius.\n\nOutput Format:\nCelsius: <c>\nFahrenheit: <F with exactly one decimal>\n\nConstraints:\n-100 <= celsius <= 100",
    difficulty: "easy",
    maxscore: 10,
    topic: "Introduction to Object-Oriented Programming (OOP)",
    subtopic: "Getters and Setters",
    inputconstrains: "-100 <= celsius <= 100",
    sampleinput1: "25",
    sampleinput2: "0",
    input1: "37",
    input2: "-40",
    input3: "100",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
using namespace std;

class Temperature {
private:
    double celsius;
public:
    void setCelsius(double c) {
        celsius = c;
    }
    double getCelsius() {
        return celsius;
    }
    double toFahrenheit() {
        return celsius * 9.0 / 5.0 + 32.0;
    }
};

int main() {
    Temperature t;
    double c;
    cin >> c;
    t.setCelsius(c);
    cout << "Celsius: " << t.getCelsius() << endl;
    cout << fixed << setprecision(1) << "Fahrenheit: " << t.toFahrenheit() << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },

  // ----------------------------------------------------------------- medium
  {
    title: "Account Deposit Validator",
    description:
      "A bank backend rejects negative deposits before they ever touch a balance. Define a class Account with private holder and balance, setHolder() and setBalance() setters, a deposit() member function that returns false and changes nothing when the amount is negative (accepted otherwise) and a getBalance() getter. Read the holder, the opening balance and three deposit attempts, then report each attempt and the final balance.\n\nInput Format:\nOne line with five tokens: holder (single word), opening balance (integer) and three deposit amounts (integers).\n\nOutput Format:\nHolder: <holder>\nDeposit <amount>: Accepted or Deposit <amount>: Rejected (three lines, in order)\nFinal balance: <balance after the accepted deposits>\n\nConstraints:\n0 <= opening balance <= 100000, -1000 <= each amount <= 100000",
    difficulty: "medium",
    maxscore: 20,
    topic: "Introduction to Object-Oriented Programming (OOP)",
    subtopic: "Getters and Setters",
    inputconstrains:
      "0 <= opening balance <= 100000, -1000 <= each amount <= 100000",
    sampleinput1: "Meera 500 200 -50 100",
    sampleinput2: "Vikram 0 -1 300 0",
    input1: "Arjun 1000 500 500 -1000",
    input2: "Sara 250 -250 0 750",
    input3: "Om 100 -5 -10 -15",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

class Account {
private:
    string holder;
    long long balance;
public:
    void setHolder(string h) {
        holder = h;
    }
    void setBalance(long long b) {
        balance = b;
    }
    bool deposit(long long amount) {
        if (amount < 0) {
            return false;
        }
        balance = balance + amount;
        return true;
    }
    long long getBalance() {
        return balance;
    }
    string getHolder() {
        return holder;
    }
};

int main() {
    Account acc;
    string holder;
    long long init, a1, a2, a3;
    cin >> holder >> init >> a1 >> a2 >> a3;
    acc.setHolder(holder);
    acc.setBalance(init);
    cout << "Holder: " << acc.getHolder() << endl;
    cout << "Deposit " << a1 << ": " << (acc.deposit(a1) ? "Accepted" : "Rejected") << endl;
    cout << "Deposit " << a2 << ": " << (acc.deposit(a2) ? "Accepted" : "Rejected") << endl;
    cout << "Deposit " << a3 << ": " << (acc.deposit(a3) ? "Accepted" : "Rejected") << endl;
    cout << "Final balance: " << acc.getBalance() << endl;
    return 0;
}`,
    blacklist: "printf",
    whitelist: "class, private, public, if",
  },
  {
    title: "Sensor Range Clamp Class",
    description:
      "A weather station keeps sensor readings inside a safe range stored in the object. Define a class Sensor with private low, high and value fields, a setRange() setter, a setReading() member function that clamps any reading below low up to low and any reading above high down to high, and a getReading() getter. Read the range and three raw readings, then report the stored value after each setReading() call.\n\nInput Format:\nOne line with five integers: low, high and three raw readings.\n\nOutput Format:\nReading 1: <stored value>\nReading 2: <stored value>\nReading 3: <stored value>\n\nConstraints:\n0 <= low <= high <= 1000, -100 <= each raw reading <= 2000",
    difficulty: "medium",
    maxscore: 20,
    topic: "Introduction to Object-Oriented Programming (OOP)",
    subtopic: "Access Modifiers",
    inputconstrains:
      "0 <= low <= high <= 1000, -100 <= each raw reading <= 2000",
    sampleinput1: "10 100 50 5 150",
    sampleinput2: "0 255 128 256 -1",
    input1: "5 9 7 9 5",
    input2: "100 200 -100 2000 150",
    input3: "0 0 0 0 0",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class Sensor {
private:
    int low;
    int high;
    int value;
public:
    void setRange(int lo, int hi) {
        low = lo;
        high = hi;
    }
    void setReading(int r) {
        if (r < low) {
            value = low;
        } else if (r > high) {
            value = high;
        } else {
            value = r;
        }
    }
    int getReading() {
        return value;
    }
};

int main() {
    Sensor s;
    int lo, hi, r1, r2, r3;
    cin >> lo >> hi >> r1 >> r2 >> r3;
    s.setRange(lo, hi);
    s.setReading(r1);
    cout << "Reading 1: " << s.getReading() << endl;
    s.setReading(r2);
    cout << "Reading 2: " << s.getReading() << endl;
    s.setReading(r3);
    cout << "Reading 3: " << s.getReading() << endl;
    return 0;
}`,
    blacklist: "printf",
    whitelist: "class, private, public, if, else",
  },
  {
    title: "Employee Salary Bonus Class",
    description:
      "An HR portal keeps salaries private and exposes them through members only. Define a class Employee with private name and salary, setName() and setSalary() setters, getName() and getSalary() getters and a bonus() member function returning 10 percent of the salary. Read the name and salary, then print the payroll summary with money values to two decimals.\n\nInput Format:\nOne line with two tokens: name (single word) and salary (integer).\n\nOutput Format:\nEmployee: <name>\nSalary: <salary>\nBonus: <10% of salary, 2 decimals>\nTotal with bonus: <salary + bonus, 2 decimals>\n\nConstraints:\n1000 <= salary <= 1000000",
    difficulty: "medium",
    maxscore: 20,
    topic: "Introduction to Object-Oriented Programming (OOP)",
    subtopic: "Getters and Setters",
    inputconstrains: "1000 <= salary <= 1000000",
    sampleinput1: "Anita 50000",
    sampleinput2: "Rahul 3333",
    input1: "Zoya 100000",
    input2: "Dev 1000",
    input3: "Kiran 123456",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
#include <string>
using namespace std;

class Employee {
private:
    string name;
    long long salary;
public:
    void setName(string n) {
        name = n;
    }
    void setSalary(long long s) {
        salary = s;
    }
    long long getSalary() {
        return salary;
    }
    string getName() {
        return name;
    }
    double bonus() {
        return salary * 0.10;
    }
};

int main() {
    Employee e;
    string name;
    long long salary;
    cin >> name >> salary;
    e.setName(name);
    e.setSalary(salary);
    cout << "Employee: " << e.getName() << endl;
    cout << "Salary: " << e.getSalary() << endl;
    cout << fixed << setprecision(2);
    cout << "Bonus: " << e.bonus() << endl;
    cout << "Total with bonus: " << e.getSalary() + e.bonus() << endl;
    return 0;
}`,
    blacklist: "printf",
    whitelist: "class, private, public, double",
  },
  {
    title: "Circle Radius Gate Class",
    description:
      "A geometry engine guards its Circle objects: only positive radii may be stored. Define a class Circle with a private radius and a private hasRadius flag, an init() member function that clears both, a setRadius() member function that returns false and stores nothing when the value is 0 or negative (accepted otherwise), an area() member function using 3.14159 and a ready() member function telling whether a valid radius was set. Read three candidate radii in order, report each attempt, then print the area of the last accepted radius.\n\nInput Format:\nOne line with three integers: three candidate radii.\n\nOutput Format:\nRadius <r>: Accepted or Radius <r>: Rejected (three lines, in order)\nThen either:\nArea: <3.14159 * radius * radius, 2 decimals>\nor, when every candidate was rejected:\nNo valid radius\n\nConstraints:\n-100 <= each radius <= 1000",
    difficulty: "medium",
    maxscore: 20,
    topic: "Introduction to Object-Oriented Programming (OOP)",
    subtopic: "Access Modifiers",
    inputconstrains: "-100 <= each radius <= 1000",
    sampleinput1: "3 0 5",
    sampleinput2: "-2 -5 2",
    input1: "1 1 1",
    input2: "0 0 10",
    input3: "-1 -2 -3",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
using namespace std;

class Circle {
private:
    double radius;
    bool hasRadius;
public:
    void init() {
        radius = 0;
        hasRadius = false;
    }
    bool setRadius(double r) {
        if (r <= 0) {
            return false;
        }
        radius = r;
        hasRadius = true;
        return true;
    }
    bool ready() {
        return hasRadius;
    }
    double area() {
        return 3.14159 * radius * radius;
    }
};

int main() {
    Circle c;
    c.init();
    double r1, r2, r3;
    cin >> r1 >> r2 >> r3;
    cout << "Radius " << r1 << ": " << (c.setRadius(r1) ? "Accepted" : "Rejected") << endl;
    cout << "Radius " << r2 << ": " << (c.setRadius(r2) ? "Accepted" : "Rejected") << endl;
    cout << "Radius " << r3 << ": " << (c.setRadius(r3) ? "Accepted" : "Rejected") << endl;
    if (c.ready()) {
        cout << fixed << setprecision(2) << "Area: " << c.area() << endl;
    } else {
        cout << "No valid radius" << endl;
    }
    return 0;
}`,
    blacklist: "printf",
    whitelist: "class, private, public, bool, if",
  },
  {
    title: "Library Member Books Class",
    description:
      "A library caps each member at 5 borrowed books. Define a class LibraryMember with a private name and a private borrowed count, a setName() setter, a reset() member function, a borrowBook() member function that fails when the count is already 5, a returnBook() member function that fails when the count is 0 and a getBorrowed() getter. Read the name, then process exactly 5 commands (B = borrow, R = return) and report after each.\n\nInput Format:\nOne line with six tokens: name (single word) and five commands, each B or R.\n\nOutput Format:\nMember: <name>\nFive lines, one per command:\nBorrow OK, now <n> or Borrow denied, now <n>\nReturn OK, now <n> or Return denied, now <n>\nFinal count: <n>\n\nConstraints:\nExactly 5 commands, each B or R",
    difficulty: "medium",
    maxscore: 20,
    topic: "Introduction to Object-Oriented Programming (OOP)",
    subtopic: "Class Design",
    inputconstrains: "Exactly 5 commands, each B or R",
    sampleinput1: "Asha B B R B B",
    sampleinput2: "Bhaskar B B B B B",
    input1: "Chitra B B B B R",
    input2: "Dev R R B B B",
    input3: "Esha B R B R B",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

class LibraryMember {
private:
    string name;
    int borrowed;
public:
    void setName(string n) {
        name = n;
    }
    void reset() {
        borrowed = 0;
    }
    bool borrowBook() {
        if (borrowed >= 5) {
            return false;
        }
        borrowed = borrowed + 1;
        return true;
    }
    bool returnBook() {
        if (borrowed <= 0) {
            return false;
        }
        borrowed = borrowed - 1;
        return true;
    }
    int getBorrowed() {
        return borrowed;
    }
    string getName() {
        return name;
    }
};

int main() {
    LibraryMember m;
    string name;
    cin >> name;
    m.setName(name);
    m.reset();
    cout << "Member: " << m.getName() << endl;
    for (int i = 0; i < 5; i++) {
        char cmd;
        cin >> cmd;
        if (cmd == 'B') {
            if (m.borrowBook()) {
                cout << "Borrow OK, now " << m.getBorrowed() << endl;
            } else {
                cout << "Borrow denied, now " << m.getBorrowed() << endl;
            }
        } else {
            if (m.returnBook()) {
                cout << "Return OK, now " << m.getBorrowed() << endl;
            } else {
                cout << "Return denied, now " << m.getBorrowed() << endl;
            }
        }
    }
    cout << "Final count: " << m.getBorrowed() << endl;
    return 0;
}`,
    blacklist: "printf",
    whitelist: "class, private, public, if, char",
  },
  {
    title: "Gradebook Marks Class",
    description:
      "A class mentor digitises mark sheets with a Gradebook object. Define a class Gradebook with a private int marks[3] array, a setMark() member function, getMark() and getHighest() getters, a getAverage() member function and an isPass() member function returning true when the average is at least 40. Read three marks, store them via setMark() and print the report.\n\nInput Format:\nOne line with three integers: mark1, mark2, mark3.\n\nOutput Format:\nMarks: <m1> <m2> <m3>\nAverage: <average with 2 decimals>\nHighest: <largest mark>\nResult: Pass or Fail\n\nConstraints:\n0 <= each mark <= 100",
    difficulty: "medium",
    maxscore: 20,
    topic: "Introduction to Object-Oriented Programming (OOP)",
    subtopic: "Class Design",
    inputconstrains: "0 <= each mark <= 100",
    sampleinput1: "80 90 70",
    sampleinput2: "30 40 35",
    input1: "99 40 55",
    input2: "0 0 0",
    input3: "40 40 40",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
using namespace std;

class Gradebook {
private:
    int marks[3];
public:
    void setMark(int index, int m) {
        marks[index] = m;
    }
    int getMark(int index) {
        return marks[index];
    }
    double getAverage() {
        return (marks[0] + marks[1] + marks[2]) / 3.0;
    }
    int getHighest() {
        int best = marks[0];
        if (marks[1] > best) {
            best = marks[1];
        }
        if (marks[2] > best) {
            best = marks[2];
        }
        return best;
    }
    bool isPass() {
        return getAverage() >= 40.0;
    }
};

int main() {
    Gradebook g;
    int m1, m2, m3;
    cin >> m1 >> m2 >> m3;
    g.setMark(0, m1);
    g.setMark(1, m2);
    g.setMark(2, m3);
    cout << "Marks: " << g.getMark(0) << " " << g.getMark(1) << " " << g.getMark(2) << endl;
    cout << fixed << setprecision(2) << "Average: " << g.getAverage() << endl;
    cout << "Highest: " << g.getHighest() << endl;
    cout << "Result: " << (g.isPass() ? "Pass" : "Fail") << endl;
    return 0;
}`,
    blacklist: "printf",
    whitelist: "class, private, public, double, if",
  },

  // ------------------------------------------------------------------- hard
  {
    title: "Vending Machine Class Simulator",
    description:
      "A campus canteen installs a coin-operated vending machine. Model it with a VendingMachine class holding private stock and private coins, an init() member function, insertCoin() and selectItem() member functions and getters for both fields. Every item costs exactly 2 coins.\nRead the starting stock and the number of commands N, then process N commands:\n- C <n>: insert n coins and print Coins: <total coins>\n- S: try to select an item. If stock is 0 print Error: Out of stock; else if fewer than 2 coins are inserted print Error: Need 2 coins; else take 2 coins, reduce stock by 1 and print Dispensed, coins <c>, stock <s>.\nFinish with a summary line.\n\nInput Format:\nOne line: starting stock (integer), N (integer), then N commands (C followed by an amount, or S).\n\nOutput Format:\nOne line per command as described above, then:\nLeft: coins <c>, stock <s>\n\nConstraints:\n0 <= starting stock <= 5, 1 <= N <= 10, each C adds 1 to 5 coins",
    difficulty: "hard",
    maxscore: 30,
    topic: "Introduction to Object-Oriented Programming (OOP)",
    subtopic: "Class Design",
    inputconstrains:
      "0 <= starting stock <= 5, 1 <= N <= 10, each C adds 1 to 5 coins",
    sampleinput1: "2 3 C 3 S S",
    sampleinput2: "1 4 S C 2 S S",
    input1: "0 3 C 5 S C 5",
    input2: "5 6 S C 1 S C 1 S S",
    input3: "3 3 C 2 S S",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

class VendingMachine {
private:
    int stock;
    int coins;
public:
    void init(int s) {
        stock = s;
        coins = 0;
    }
    void insertCoin(int c) {
        coins = coins + c;
    }
    int getCoins() {
        return coins;
    }
    int getStock() {
        return stock;
    }
    void selectItem() {
        if (stock <= 0) {
            cout << "Error: Out of stock" << endl;
            return;
        }
        if (coins < 2) {
            cout << "Error: Need 2 coins" << endl;
            return;
        }
        coins = coins - 2;
        stock = stock - 1;
        cout << "Dispensed, coins " << coins << ", stock " << stock << endl;
    }
};

int main() {
    VendingMachine vm;
    int stock, n;
    cin >> stock >> n;
    vm.init(stock);
    for (int i = 0; i < n; i++) {
        string cmd;
        cin >> cmd;
        if (cmd == "C") {
            int c;
            cin >> c;
            vm.insertCoin(c);
            cout << "Coins: " << vm.getCoins() << endl;
        } else {
            vm.selectItem();
        }
    }
    cout << "Left: coins " << vm.getCoins() << ", stock " << vm.getStock() << endl;
    return 0;
}`,
    blacklist: "printf",
    whitelist: "class, private, public, if, else, string",
  },
  {
    title: "ATM Light Command Terminal",
    description:
      "A mini ATM kiosk prints a receipt line after every operation. Model the kiosk with an ATMLight class that keeps the balance private and exposes init(), deposit() and withdraw() member functions plus a printReceipt() member function for the closing summary. A deposit always succeeds and prints Deposit <amt>, balance <b>. A withdrawal larger than the current balance is declined and prints Withdraw <amt> declined, balance <b>; otherwise it prints Withdraw <amt>, balance <b>.\nRead the starting balance and the number of commands N, then process N commands and finish with the receipt.\n\nInput Format:\nOne line: starting balance (integer), N (integer), then N commands, each D or W followed by an amount.\n\nOutput Format:\nOne line per command as described above, then:\nFinal balance: <balance>\n\nConstraints:\n0 <= starting balance <= 100000, 1 <= N <= 8, 0 <= each amount <= 100000",
    difficulty: "hard",
    maxscore: 30,
    topic: "Introduction to Object-Oriented Programming (OOP)",
    subtopic: "Class Design",
    inputconstrains:
      "0 <= starting balance <= 100000, 1 <= N <= 8, 0 <= each amount <= 100000",
    sampleinput1: "1000 4 D 500 W 300 W 2000 D 0",
    sampleinput2: "0 3 D 100 W 100 W 1",
    input1: "500 2 W 500 W 1",
    input2: "100 5 D 900 D 0 W 1000 W 999 D 99",
    input3: "7777 1 D 23",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

class ATMLight {
private:
    long long balance;
public:
    void init(long long b) {
        balance = b;
    }
    void deposit(long long amt) {
        balance = balance + amt;
        cout << "Deposit " << amt << ", balance " << balance << endl;
    }
    void withdraw(long long amt) {
        if (amt > balance) {
            cout << "Withdraw " << amt << " declined, balance " << balance << endl;
        } else {
            balance = balance - amt;
            cout << "Withdraw " << amt << ", balance " << balance << endl;
        }
    }
    void printReceipt() {
        cout << "Final balance: " << balance << endl;
    }
};

int main() {
    ATMLight atm;
    long long start;
    int n;
    cin >> start >> n;
    atm.init(start);
    for (int i = 0; i < n; i++) {
        string cmd;
        long long amt;
        cin >> cmd >> amt;
        if (cmd == "D") {
            atm.deposit(amt);
        } else {
            atm.withdraw(amt);
        }
    }
    atm.printReceipt();
    return 0;
}`,
    blacklist: "printf",
    whitelist: "class, private, public, if, else, string",
  },
  {
    title: "Parking Lot Slot Class",
    description:
      "A mall parking garage has N numbered slots. Model it with two ideas from this day: a Slot class with private occupied and car fields plus init(), park(), leave() and status() member functions, and an array of Slot objects managed in main.\nCommands:\n- E <slot> <car>: park; print Car <car> parked in slot <s>, or Slot <s> is occupied when the slot is taken.\n- L <slot>: vacate; print Slot <s> is free now, or Slot <s> is already empty.\n- S: print one line per slot: Slot <i>: <car name or empty>.\nRead N and the number of commands M, then process the M commands in order.\n\nInput Format:\nOne line: N (integer), M (integer), then M commands as described above.\n\nOutput Format:\nOne or more lines per command as described above.\n\nConstraints:\n1 <= N <= 10, 1 <= M <= 10, slot numbers are between 1 and N, car names are single words",
    difficulty: "hard",
    maxscore: 30,
    topic: "Introduction to Object-Oriented Programming (OOP)",
    subtopic: "Arrays of Objects",
    inputconstrains:
      "1 <= N <= 10, 1 <= M <= 10, slot numbers 1..N, car names are single words",
    sampleinput1: "3 5 E 1 Ravi E 2 Priya L 1 E 1 Sam S",
    sampleinput2: "2 4 E 1 Ana E 1 Bo L 2 S",
    input1: "1 3 E 1 Zoya L 1 S",
    input2: "4 3 S E 3 Kim E 3 Lee",
    input3: "2 6 E 1 A E 2 B L 1 L 2 L 1 S",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

class Slot {
private:
    bool occupied;
    string car;
public:
    void init() {
        occupied = false;
        car = "";
    }
    bool park(string name) {
        if (occupied) {
            return false;
        }
        car = name;
        occupied = true;
        return true;
    }
    bool leave() {
        if (!occupied) {
            return false;
        }
        car = "";
        occupied = false;
        return true;
    }
    string status() {
        if (occupied) {
            return car;
        }
        return "empty";
    }
};

int main() {
    Slot slots[10];
    int n, m;
    cin >> n >> m;
    for (int i = 0; i < 10; i++) {
        slots[i].init();
    }
    for (int i = 0; i < m; i++) {
        string cmd;
        cin >> cmd;
        if (cmd == "E") {
            int s;
            string car;
            cin >> s >> car;
            if (slots[s - 1].park(car)) {
                cout << "Car " << car << " parked in slot " << s << endl;
            } else {
                cout << "Slot " << s << " is occupied" << endl;
            }
        } else if (cmd == "L") {
            int s;
            cin >> s;
            if (slots[s - 1].leave()) {
                cout << "Slot " << s << " is free now" << endl;
            } else {
                cout << "Slot " << s << " is already empty" << endl;
            }
        } else {
            for (int k = 0; k < n; k++) {
                cout << "Slot " << (k + 1) << ": " << slots[k].status() << endl;
            }
        }
    }
    return 0;
}`,
    blacklist: "printf",
    whitelist: "class, private, public, string, bool, for",
  },
  {
    title: "Quiz Player Stats Class",
    description:
      "An online quiz app tracks each attempt inside a QuizPlayer object with private counters. The class exposes init(), answer(bool ok) and report() member functions. answer() bumps the answered count; a correct answer raises the correct count and the current streak (updating the best streak when beaten) and prints Correct!, while a wrong answer resets the streak and prints Wrong!. report() prints the final statistics; accuracy is the whole-number percent correct * 100 / answered.\nRead N and then N answers (1 = correct, 0 = wrong), feed each to answer() and finish with report().\n\nInput Format:\nOne line: N (integer) followed by N answers, each 0 or 1.\n\nOutput Format:\nOne line per answer (Correct! or Wrong!), then:\nAnswered: <n>\nCorrect: <c>\nAccuracy: <percent>%\nBest streak: <b>\n\nConstraints:\n1 <= N <= 20, each answer is 0 or 1",
    difficulty: "hard",
    maxscore: 30,
    topic: "Introduction to Object-Oriented Programming (OOP)",
    subtopic: "Class Design",
    inputconstrains: "1 <= N <= 20, each answer is 0 or 1",
    sampleinput1: "5 1 1 0 1 1",
    sampleinput2: "3 0 0 1",
    input1: "1 1",
    input2: "4 0 0 0 0",
    input3: "6 1 1 1 1 1 1",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class QuizPlayer {
private:
    int answered;
    int correct;
    int streak;
    int bestStreak;
public:
    void init() {
        answered = 0;
        correct = 0;
        streak = 0;
        bestStreak = 0;
    }
    void answer(bool ok) {
        answered = answered + 1;
        if (ok) {
            correct = correct + 1;
            streak = streak + 1;
            if (streak > bestStreak) {
                bestStreak = streak;
            }
            cout << "Correct!" << endl;
        } else {
            streak = 0;
            cout << "Wrong!" << endl;
        }
    }
    void report() {
        cout << "Answered: " << answered << endl;
        cout << "Correct: " << correct << endl;
        cout << "Accuracy: " << (correct * 100 / answered) << "%" << endl;
        cout << "Best streak: " << bestStreak << endl;
    }
};

int main() {
    QuizPlayer p;
    p.init();
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) {
        int a;
        cin >> a;
        p.answer(a == 1);
    }
    p.report();
    return 0;
}`,
    blacklist: "printf",
    whitelist: "class, private, public, if, bool",
  },
];

export const mcqs = [
  // ------------------------------------------------------------------ easy
  {
    title: "Blueprint Meaning of a Class",
    description: "In C++, a class is best described as:",
    difficulty: "easy",
    topic: "Introduction to Object-Oriented Programming (OOP)",
    subtopic: "Classes and Objects",
    Option1: "A blueprint that groups data and the functions that operate on it",
    Option2: "A single allocated variable in memory",
    Option3: "A header file that must be included",
    Option4: "A loop that repeats over data",
    CorrectOption: 1,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Object Versus Class",
    description: "Which statement about objects and classes is correct?",
    difficulty: "easy",
    topic: "Introduction to Object-Oriented Programming (OOP)",
    subtopic: "Classes and Objects",
    Option1: "A class is an instance of an object",
    Option2: "An object can only be created from a struct",
    Option3: "An object is a runtime instance created from a class",
    Option4: "A class and an object are unrelated concepts",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Purpose of the private Keyword",
    description: "Why do we mark data members of a class as private?",
    difficulty: "easy",
    topic: "Introduction to Object-Oriented Programming (OOP)",
    subtopic: "Access Modifiers",
    Option1: "To make them print automatically",
    Option2: "To hide them from direct outside access and protect the object's state",
    Option3: "To make them faster to read",
    Option4: "To allow other files to edit them freely",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Meaning of public Members",
    description: "Members declared under public in a class:",
    difficulty: "easy",
    topic: "Introduction to Object-Oriented Programming (OOP)",
    subtopic: "Access Modifiers",
    Option1: "Can be accessed only inside member functions",
    Option2: "Are deleted after main ends",
    Option3: "Cannot be called on objects",
    Option4: "Can be accessed from outside the class through an object",
    CorrectOption: 4,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "What a Member Function Is",
    description: "A member function is:",
    difficulty: "easy",
    topic: "Introduction to Object-Oriented Programming (OOP)",
    subtopic: "Member Functions",
    Option1: "A global function declared above main",
    Option2: "A function defined inside a class that works on the objects of that class",
    Option3: "A function that must return void",
    Option4: "A function that only reads files",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Default Access of Class Members",
    description:
      "If no access specifier is written, members of a C++ class are by default:",
    difficulty: "easy",
    topic: "Introduction to Object-Oriented Programming (OOP)",
    subtopic: "Access Modifiers",
    Option1: "private",
    Option2: "public",
    Option3: "protected",
    Option4: "Depends on the compiler",
    CorrectOption: 1,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Meaning of Encapsulation",
    description: "Encapsulation in OOP means:",
    difficulty: "easy",
    topic: "Introduction to Object-Oriented Programming (OOP)",
    subtopic: "Class Design",
    Option1: "Writing all code inside main",
    Option2: "Bundling data and member functions together while hiding the data behind controlled access",
    Option3: "Compiling several files at once",
    Option4: "Copying objects from one class to another",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Calling a Member Function",
    description:
      "Given an object s of class Student with a member function display(), how do you call it?",
    difficulty: "easy",
    topic: "Introduction to Object-Oriented Programming (OOP)",
    subtopic: "Classes and Objects",
    Option1: "display(s);",
    Option2: "s::display();",
    Option3: "s->display();",
    Option4: "s.display();",
    CorrectOption: 4,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Job of a Getter",
    description: "What does a getter member function typically do?",
    difficulty: "easy",
    topic: "Introduction to Object-Oriented Programming (OOP)",
    subtopic: "Getters and Setters",
    Option1: "Returns the current value of a private data member",
    Option2: "Deletes a data member",
    Option3: "Allocates the object on the heap",
    Option4: "Changes the class definition",
    CorrectOption: 1,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Job of a Setter",
    description: "What is the main job of a setter member function?",
    difficulty: "easy",
    topic: "Introduction to Object-Oriented Programming (OOP)",
    subtopic: "Getters and Setters",
    Option1: "To print all members at once",
    Option2: "To compare two objects",
    Option3: "To update a private data member, usually after validating the new value",
    Option4: "To free the memory used by the object",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },

  // ----------------------------------------------------------------- medium
  {
    title: "First Method Call Output",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "Introduction to Object-Oriented Programming (OOP)",
    subtopic: "Classes and Objects",
    Option1: "Hello from class",
    Option2: "Nothing, hello() is private",
    Option3: "Compile error",
    Option4: "Hello from object",
    CorrectOption: 4,
    codesnippet: `#include <iostream>
using namespace std;
class Greet {
public:
    void hello() {
        cout << "Hello from object";
    }
};
int main() {
    Greet g;
    g.hello();
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nclass Greet {\npublic:\n    void hello() {\n        cout << "Hello from object";\n    }\n};\nint main() {\n    Greet g;\n    g.hello();\n    return 0;\n}`,
      stdin: "",
      expected: "Hello from object",
    },
  },
  {
    title: "Setter Then Getter Output",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "Introduction to Object-Oriented Programming (OOP)",
    subtopic: "Getters and Setters",
    Option1: "500",
    Option2: "A garbage value",
    Option3: "Compile error, money is private",
    Option4: "0",
    CorrectOption: 1,
    codesnippet: `#include <iostream>
using namespace std;
class Wallet {
private:
    int money;
public:
    void setMoney(int m) {
        money = m;
    }
    int getMoney() {
        return money;
    }
};
int main() {
    Wallet w;
    w.setMoney(500);
    cout << w.getMoney();
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nclass Wallet {\nprivate:\n    int money;\npublic:\n    void setMoney(int m) {\n        money = m;\n    }\n    int getMoney() {\n        return money;\n    }\n};\nint main() {\n    Wallet w;\n    w.setMoney(500);\n    cout << w.getMoney();\n    return 0;\n}`,
      stdin: "",
      expected: "500",
    },
  },
  {
    title: "Objects Keep Separate State",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "Introduction to Object-Oriented Programming (OOP)",
    subtopic: "Classes and Objects",
    Option1: "99 99",
    Option2: "Compile error",
    Option3: "10 99",
    Option4: "10 10",
    CorrectOption: 3,
    codesnippet: `#include <iostream>
using namespace std;
class Player {
private:
    int score;
public:
    void set(int s) {
        score = s;
    }
    int get() {
        return score;
    }
};
int main() {
    Player a;
    Player b;
    a.set(10);
    b.set(99);
    cout << a.get() << " " << b.get();
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nclass Player {\nprivate:\n    int score;\npublic:\n    void set(int s) {\n        score = s;\n    }\n    int get() {\n        return score;\n    }\n};\nint main() {\n    Player a;\n    Player b;\n    a.set(10);\n    b.set(99);\n    cout << a.get() << " " << b.get();\n    return 0;\n}`,
      stdin: "",
      expected: "10 99",
    },
  },
  {
    title: "Product of Private Fields",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "Introduction to Object-Oriented Programming (OOP)",
    subtopic: "Member Functions",
    Option1: "67",
    Option2: "42",
    Option3: "0",
    Option4: "Compile error",
    CorrectOption: 2,
    codesnippet: `#include <iostream>
using namespace std;
class MathBox {
private:
    int a;
    int b;
public:
    void set(int x, int y) {
        a = x;
        b = y;
    }
    int product() {
        return a * b;
    }
};
int main() {
    MathBox m;
    m.set(6, 7);
    cout << m.product();
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nclass MathBox {\nprivate:\n    int a;\n    int b;\npublic:\n    void set(int x, int y) {\n        a = x;\n        b = y;\n    }\n    int product() {\n        return a * b;\n    }\n};\nint main() {\n    MathBox m;\n    m.set(6, 7);\n    cout << m.product();\n    return 0;\n}`,
      stdin: "",
      expected: "42",
    },
  },
  {
    title: "Why Wrap Private Data in Getters and Setters",
    description:
      "Why do well-designed classes keep data private and expose getters and setters instead of public fields?",
    difficulty: "medium",
    topic: "Introduction to Object-Oriented Programming (OOP)",
    subtopic: "Getters and Setters",
    Option1: "It makes the program compile faster",
    Option2: "Private data uses less memory",
    Option3: "Getters and setters are required by the C++ standard",
    Option4: "So the class can validate changes and keep its data in a valid state",
    CorrectOption: 4,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "struct Versus class Default Access",
    description:
      "In C++, what is the key default-access difference between struct and class?",
    difficulty: "medium",
    topic: "Introduction to Object-Oriented Programming (OOP)",
    subtopic: "Access Modifiers",
    Option1: "class members default to public, struct members to private",
    Option2: "struct members default to public, class members default to private",
    Option3: "Both default to protected",
    Option4: "Neither has a default; the compiler reports an error",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },

  // ------------------------------------------------------------------- hard
  {
    title: "Member Function Updates Two Fields",
    description: "What does this program print?",
    difficulty: "hard",
    topic: "Introduction to Object-Oriented Programming (OOP)",
    subtopic: "Member Functions",
    Option1: "27 2",
    Option2: "15 2",
    Option3: "12 1",
    Option4: "27 12",
    CorrectOption: 1,
    codesnippet: `#include <iostream>
using namespace std;
class Reward {
private:
    int points;
    int visits;
public:
    void reset() {
        points = 0;
        visits = 0;
    }
    void visit(int bonus) {
        visits = visits + 1;
        points = points + 10 + bonus;
    }
    int getPoints() {
        return points;
    }
    int getVisits() {
        return visits;
    }
};
int main() {
    Reward r;
    r.reset();
    r.visit(5);
    r.visit(2);
    cout << r.getPoints() << " " << r.getVisits();
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nclass Reward {\nprivate:\n    int points;\n    int visits;\npublic:\n    void reset() {\n        points = 0;\n        visits = 0;\n    }\n    void visit(int bonus) {\n        visits = visits + 1;\n        points = points + 10 + bonus;\n    }\n    int getPoints() {\n        return points;\n    }\n    int getVisits() {\n        return visits;\n    }\n};\nint main() {\n    Reward r;\n    r.reset();\n    r.visit(5);\n    r.visit(2);\n    cout << r.getPoints() << " " << r.getVisits();\n    return 0;\n}`,
      stdin: "",
      expected: "27 2",
    },
  },
  {
    title: "Object Array Traversal Output",
    description: "What does this program print?",
    difficulty: "hard",
    topic: "Introduction to Object-Oriented Programming (OOP)",
    subtopic: "Arrays of Objects",
    Option1: "M789 all on one line",
    Option2: "Compile error, value is not initialized",
    Option3: "M7, M8 and M9 each on its own line",
    Option4: "7 8 9",
    CorrectOption: 3,
    codesnippet: `#include <iostream>
using namespace std;
class Mark {
public:
    int value;
    void show() {
        cout << "M" << value << endl;
    }
};
int main() {
    Mark marks[3];
    marks[0].value = 7;
    marks[1].value = 8;
    marks[2].value = 9;
    for (int i = 0; i < 3; i++) {
        marks[i].show();
    }
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nclass Mark {\npublic:\n    int value;\n    void show() {\n        cout << "M" << value << endl;\n    }\n};\nint main() {\n    Mark marks[3];\n    marks[0].value = 7;\n    marks[1].value = 8;\n    marks[2].value = 9;\n    for (int i = 0; i < 3; i++) {\n        marks[i].show();\n    }\n    return 0;\n}`,
      stdin: "",
      expected: "M7\nM8\nM9",
    },
  },
  {
    title: "Chained Internal Calls Output",
    description: "What does this program print?",
    difficulty: "hard",
    topic: "Introduction to Object-Oriented Programming (OOP)",
    subtopic: "Class Design",
    Option1: "5",
    Option2: "11",
    Option3: "10",
    Option4: "6",
    CorrectOption: 2,
    codesnippet: `#include <iostream>
using namespace std;
class Robot {
private:
    int steps;
public:
    void reset() {
        steps = 0;
    }
    void walk(int n) {
        steps = steps + n;
    }
    void walkDouble(int n) {
        walk(n);
        walk(n);
    }
    int getSteps() {
        return steps;
    }
};
int main() {
    Robot r;
    r.reset();
    r.walkDouble(5);
    r.walk(1);
    cout << r.getSteps();
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nclass Robot {\nprivate:\n    int steps;\npublic:\n    void reset() {\n        steps = 0;\n    }\n    void walk(int n) {\n        steps = steps + n;\n    }\n    void walkDouble(int n) {\n        walk(n);\n        walk(n);\n    }\n    int getSteps() {\n        return steps;\n    }\n};\nint main() {\n    Robot r;\n    r.reset();\n    r.walkDouble(5);\n    r.walk(1);\n    cout << r.getSteps();\n    return 0;\n}`,
      stdin: "",
      expected: "11",
    },
  },
  {
    title: "Risk of Public Data Members",
    description:
      "What is the main design risk when all data members of a class are public?",
    difficulty: "hard",
    topic: "Introduction to Object-Oriented Programming (OOP)",
    subtopic: "Class Design",
    Option1: "The class becomes slower at runtime",
    Option2: "Objects cannot be created from the class",
    Option3: "Any outside code can modify the data directly, so the class cannot enforce valid states",
    Option4: "The program cannot use cout",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
];
