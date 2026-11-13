/**
 * OOPS using CPP — Day 19: Operator Overloading
 * 20 code questions (10 easy: 6 basics + 4 real-world, 6 medium, 4 hard)
 * 20 MCQs (10 easy, 6 medium, 4 hard)
 * All solutions are fresh C++ written for this course (no conversions).
 */
export const meta = {
  day: 19,
  topic: "Operator Overloading",
};

export const code = [
  // ------------------------------------------------------------------ easy
  {
    title: "Complex Sum via Operator+",
    description:
      "Create a Complex class that stores a real part and an imaginary part and overloads the binary + operator so two complex numbers can be added with a simple + sign. Read two complex numbers, add them using the overloaded operator and print the result in standard a + bi form.\n\nInput Format:\nOne line with four integers: real1 imag1 real2 imag2.\n\nOutput Format:\nOne line with the sum printed as '<real> + <imag>i' when the imaginary part is zero or positive, and '<real> - <imag>i' (with the positive magnitude of the imaginary part) when the imaginary part is negative.\n\nConstraints:\n-100 <= each integer <= 100",
    difficulty: "easy",
    maxscore: 10,
    topic: "Operator Overloading",
    subtopic: "Overloading Arithmetic Operators",
    inputconstrains: "-100 <= each integer <= 100",
    sampleinput1: "3 4 1 2",
    sampleinput2: "5 -3 -2 -7",
    input1: "0 0 0 5",
    input2: "-4 6 4 -6",
    input3: "-7 -2 -3 -5",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class Complex {
public:
    int re, im;
    Complex(int r = 0, int i = 0) : re(r), im(i) {}
    Complex operator+(const Complex& other) const {
        return Complex(re + other.re, im + other.im);
    }
    void show() const {
        if (im < 0)
            cout << re << " - " << (-im) << "i" << endl;
        else
            cout << re << " + " << im << "i" << endl;
    }
};

int main() {
    int r1, i1, r2, i2;
    cin >> r1 >> i1 >> r2 >> i2;
    Complex a(r1, i1), b(r2, i2);
    Complex c = a + b;
    c.show();
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Wallet Balance with Operator+",
    description:
      "A digital wallet holds money as rupees and paise. Define a Money class and overload the + operator so two wallet balances can be added in one expression; a paise total of 100 or more must carry over into rupees. Print the combined balance.\n\nInput Format:\nOne line with four integers: rupees1 paise1 rupees2 paise2.\n\nOutput Format:\nOne line: 'Total balance: Rs. <rupees>.<paise>' where the paise part is always shown as exactly two digits (zero padded).\n\nConstraints:\n0 <= rupees <= 100000, 0 <= paise <= 99",
    difficulty: "easy",
    maxscore: 10,
    topic: "Operator Overloading",
    subtopic: "Overloading Arithmetic Operators",
    inputconstrains: "0 <= rupees <= 100000, 0 <= paise <= 99",
    sampleinput1: "120 50 80 75",
    sampleinput2: "500 99 1 99",
    input1: "0 0 0 0",
    input2: "10 1 20 2",
    input3: "999 99 1 1",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
using namespace std;

class Money {
public:
    int rupees, paise;
    Money(int r = 0, int p = 0) : rupees(r), paise(p) {}
    Money operator+(const Money& other) const {
        int totalPaise = paise + other.paise;
        int carry = totalPaise / 100;
        return Money(rupees + other.rupees + carry, totalPaise % 100);
    }
    void show() const {
        cout << "Total balance: Rs. " << rupees << "."
             << setw(2) << setfill('0') << paise << endl;
    }
};

int main() {
    int r1, p1, r2, p2;
    cin >> r1 >> p1 >> r2 >> p2;
    Money a(r1, p1), b(r2, p2);
    Money total = a + b;
    total.show();
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Vector Difference with Operator-",
    description:
      "Model a 2D displacement with a Vector2D class and overload the binary - operator so that a - b gives the difference vector (a minus b). Read two vectors and print the components of the difference.\n\nInput Format:\nOne line with four integers: x1 y1 x2 y2.\n\nOutput Format:\nOne line with two integers separated by a single space: dx and dy, where dx = x1 - x2 and dy = y1 - y2.\n\nConstraints:\n-1000 <= each integer <= 1000",
    difficulty: "easy",
    maxscore: 10,
    topic: "Operator Overloading",
    subtopic: "Overloading Arithmetic Operators",
    inputconstrains: "-1000 <= each integer <= 1000",
    sampleinput1: "10 7 4 3",
    sampleinput2: "5 5 9 2",
    input1: "0 0 0 0",
    input2: "-3 -2 -8 -9",
    input3: "7 -4 2 6",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class Vector2D {
public:
    int x, y;
    Vector2D(int x = 0, int y = 0) : x(x), y(y) {}
    Vector2D operator-(const Vector2D& other) const {
        return Vector2D(x - other.x, y - other.y);
    }
};

int main() {
    int x1, y1, x2, y2;
    cin >> x1 >> y1 >> x2 >> y2;
    Vector2D a(x1, y1), b(x2, y2);
    Vector2D diff = a - b;
    cout << diff.x << " " << diff.y << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Fraction Product with Operator*",
    description:
      "Define a Fraction class with a numerator and a denominator and overload the * operator so two fractions multiply naturally. Read two fractions and print their product as p/q (the product is not reduced).\n\nInput Format:\nOne line with four integers: num1 den1 num2 den2.\n\nOutput Format:\nOne line: '<p>/<q>' where p = num1 * num2 and q = den1 * den2.\n\nConstraints:\n-100 <= numerator <= 100, 1 <= denominator <= 100 (denominators are positive; the product is printed unreduced)",
    difficulty: "easy",
    maxscore: 10,
    topic: "Operator Overloading",
    subtopic: "Overloading Arithmetic Operators",
    inputconstrains: "-100 <= numerator <= 100, 1 <= denominator <= 100",
    sampleinput1: "1 2 3 4",
    sampleinput2: "2 5 4 3",
    input1: "-1 3 2 5",
    input2: "5 1 5 1",
    input3: "0 7 9 2",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class Fraction {
public:
    int num, den;
    Fraction(int n = 0, int d = 1) : num(n), den(d) {}
    Fraction operator*(const Fraction& other) const {
        return Fraction(num * other.num, den * other.den);
    }
};

int main() {
    int n1, d1, n2, d2;
    cin >> n1 >> d1 >> n2 >> d2;
    Fraction a(n1, d1), b(n2, d2);
    Fraction p = a * b;
    cout << p.num << "/" << p.den << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Equal Volume Boxes with Operator==",
    description:
      "A warehouse compares cartons by volume. Define a Box class with length, width and height, overload the == operator to compare two boxes by volume, then read two boxes and report whether their volumes are equal.\n\nInput Format:\nOne line with six integers: l1 w1 h1 l2 w2 h2.\n\nOutput Format:\nOne line: '1' if the two volumes are equal, '0' otherwise.\n\nConstraints:\n0 <= each dimension <= 100",
    difficulty: "easy",
    maxscore: 10,
    topic: "Operator Overloading",
    subtopic: "Overloading Relational Operators",
    inputconstrains: "0 <= each dimension <= 100",
    sampleinput1: "2 3 4 1 6 4",
    sampleinput2: "1 2 3 2 2 2",
    input1: "4 4 4 8 2 4",
    input2: "5 1 2 5 1 1",
    input3: "0 5 5 1 0 25",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class Box {
public:
    int l, w, h;
    Box(int l = 0, int w = 0, int h = 0) : l(l), w(w), h(h) {}
    int volume() const { return l * w * h; }
    bool operator==(const Box& other) const {
        return volume() == other.volume();
    }
};

int main() {
    int l1, w1, h1, l2, w2, h2;
    cin >> l1 >> w1 >> h1 >> l2 >> w2 >> h2;
    Box b1(l1, w1, h1), b2(l2, w2, h2);
    if (b1 == b2)
        cout << 1 << endl;
    else
        cout << 0 << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Closer Point with Operator<",
    description:
      "Two friends stand at different points on a grid. Define a Point class, overload the < operator so that p < q means p is strictly closer to the origin than q (compare squared distances), read two points and report which one is closer.\n\nInput Format:\nOne line with four integers: x1 y1 x2 y2.\n\nOutput Format:\nOne line: 'Point 1 is closer' if the first point has the strictly smaller squared distance from the origin, otherwise 'Point 2 is closer' (this includes the tie case).\n\nConstraints:\n-100 <= each coordinate <= 100",
    difficulty: "easy",
    maxscore: 10,
    topic: "Operator Overloading",
    subtopic: "Overloading Relational Operators",
    inputconstrains: "-100 <= each coordinate <= 100",
    sampleinput1: "3 4 1 1",
    sampleinput2: "1 1 3 4",
    input1: "0 0 5 0",
    input2: "5 5 5 5",
    input3: "-3 -4 0 0",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class Point {
public:
    int x, y;
    Point(int x = 0, int y = 0) : x(x), y(y) {}
    int distSq() const { return x * x + y * y; }
    bool operator<(const Point& other) const {
        return distSq() < other.distSq();
    }
};

int main() {
    int x1, y1, x2, y2;
    cin >> x1 >> y1 >> x2 >> y2;
    Point p(x1, y1), q(x2, y2);
    if (p < q)
        cout << "Point 1 is closer" << endl;
    else
        cout << "Point 2 is closer" << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Shift Clock via Operator+",
    description:
      "A shift scheduler adds two shift durations. Define a Time class with hours and minutes and overload the + operator to add two times with normalization: a minute total of 60 or more carries into hours. Print the combined duration as hh:mm.\n\nInput Format:\nOne line with four integers: h1 m1 h2 m2 (each minutes value is below 60).\n\nOutput Format:\nOne line: '<h>:<mm>' where the minutes are shown as exactly two digits (zero padded) and the hours are printed as-is (they may exceed 24).\n\nConstraints:\n0 <= hours <= 48, 0 <= minutes <= 59",
    difficulty: "easy",
    maxscore: 10,
    topic: "Operator Overloading",
    subtopic: "Overloading Arithmetic Operators",
    inputconstrains: "0 <= hours <= 48, 0 <= minutes <= 59",
    sampleinput1: "9 45 8 30",
    sampleinput2: "10 20 15 55",
    input1: "23 59 0 1",
    input2: "5 5 5 5",
    input3: "48 30 48 30",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
using namespace std;

class Time {
public:
    int h, m;
    Time(int hh = 0, int mm = 0) : h(hh), m(mm) {}
    Time operator+(const Time& other) const {
        int totalMin = (h + other.h) * 60 + (m + other.m);
        return Time(totalMin / 60, totalMin % 60);
    }
};

int main() {
    int h1, m1, h2, m2;
    cin >> h1 >> m1 >> h2 >> m2;
    Time a(h1, m1), b(h2, m2);
    Time shift = a + b;
    cout << shift.h << ":" << setw(2) << setfill('0') << shift.m << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Stock Merge via Operator+",
    description:
      "A store merges the stock of the same item arriving from two shelves. Define an Item class with a name and a quantity and overload the + operator so two Item objects merge into one whose quantity is the sum of both quantities. Print the merged stock.\n\nInput Format:\nOne line with a name (a single word) and a quantity, then another name (a single word) and a quantity.\n\nOutput Format:\nOne line: 'Merged stock: <name1> <total>' where <name1> is the first item's name and <total> is qty1 + qty2.\n\nConstraints:\n1 <= name length <= 20, 0 <= quantity <= 100000",
    difficulty: "easy",
    maxscore: 10,
    topic: "Operator Overloading",
    subtopic: "Overloading Arithmetic Operators",
    inputconstrains: "1 <= name length <= 20, 0 <= quantity <= 100000",
    sampleinput1: "Pen 120 Pen 80",
    sampleinput2: "Notebook 45 Notebook 55",
    input1: "Bolt 1000 Bolt 250",
    input2: "Clip 0 Clip 0",
    input3: "Eraser 1 Eraser 999",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

class Item {
public:
    string name;
    int qty;
    Item(string n = "", int q = 0) : name(n), qty(q) {}
    Item operator+(const Item& other) const {
        return Item(name, qty + other.qty);
    }
};

int main() {
    string n1, n2;
    int q1, q2;
    cin >> n1 >> q1 >> n2 >> q2;
    Item a(n1, q1), b(n2, q2);
    Item merged = a + b;
    cout << "Merged stock: " << merged.name << " " << merged.qty << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Distance Ledger with Operator+ and Operator-",
    description:
      "A carpenter measures lengths in metres and centimetres. Define a Distance class with metres and cm and overload both + and - with normalization (100 cm = 1 m). Read two distances and an operator character, then apply the requested operation.\n\nInput Format:\nOne line with four integers m1 c1 m2 c2 followed by a character '+' or '-'.\n\nOutput Format:\nOne line: 'Result: <m> m <c> cm' with 0 <= c <= 99 after normalization.\n\nConstraints:\n0 <= metres <= 1000, 0 <= cm <= 99; for '-' the first distance is never smaller than the second",
    difficulty: "easy",
    maxscore: 10,
    topic: "Operator Overloading",
    subtopic: "Overloading Arithmetic Operators",
    inputconstrains: "0 <= metres <= 1000, 0 <= cm <= 99",
    sampleinput1: "3 80 2 50 +",
    sampleinput2: "5 20 2 45 -",
    input1: "0 99 0 99 +",
    input2: "10 0 10 0 +",
    input3: "7 15 7 15 -",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class Distance {
public:
    int metres, cm;
    Distance(int m = 0, int c = 0) : metres(m), cm(c) {}
    Distance operator+(const Distance& other) const {
        int total = (metres + other.metres) * 100 + (cm + other.cm);
        return Distance(total / 100, total % 100);
    }
    Distance operator-(const Distance& other) const {
        int total = (metres * 100 + cm) - (other.metres * 100 + other.cm);
        return Distance(total / 100, total % 100);
    }
};

int main() {
    int m1, c1, m2, c2;
    char op;
    cin >> m1 >> c1 >> m2 >> c2 >> op;
    Distance a(m1, c1), b(m2, c2);
    Distance r;
    if (op == '+')
        r = a + b;
    else
        r = a - b;
    cout << "Result: " << r.metres << " m " << r.cm << " cm" << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Heavier Item with Operator>",
    description:
      "A courier sorts parcels by weight. Define a Weight class with kilograms and grams and overload the > operator to tell which parcel is heavier. Read two parcels and report the heavier one.\n\nInput Format:\nOne line with four integers: kg1 g1 kg2 g2.\n\nOutput Format:\nOne line: 'Item 1 is heavier' if the first weight is strictly greater than the second, otherwise 'Item 2 is heavier' (this includes the tie case).\n\nConstraints:\n0 <= kg <= 100, 0 <= g <= 999",
    difficulty: "easy",
    maxscore: 10,
    topic: "Operator Overloading",
    subtopic: "Overloading Relational Operators",
    inputconstrains: "0 <= kg <= 100, 0 <= g <= 999",
    sampleinput1: "2 500 1 900",
    sampleinput2: "3 0 3 500",
    input1: "1 999 2 0",
    input2: "5 0 5 0",
    input3: "0 1 0 0",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class Weight {
public:
    int kg, g;
    Weight(int k = 0, int gg = 0) : kg(k), g(gg) {}
    int totalGrams() const { return kg * 1000 + g; }
    bool operator>(const Weight& other) const {
        return totalGrams() > other.totalGrams();
    }
};

int main() {
    int k1, g1, k2, g2;
    cin >> k1 >> g1 >> k2 >> g2;
    Weight a(k1, g1), b(k2, g2);
    if (a > b)
        cout << "Item 1 is heavier" << endl;
    else
        cout << "Item 2 is heavier" << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },

  // ----------------------------------------------------------------- medium
  {
    title: "Complex Accumulator with Operator+=",
    description:
      "An accounting program keeps a running complex total. Define a Complex class and overload += as a member function (so += updates and returns the object itself) together with == for comparison. Start from a given complex value, accumulate N more values with +=, then compare the accumulated sum with an expected value using ==.\n\nInput Format:\nOne line with: r i (start complex), then N, then N pairs 'r i' (the values to accumulate), then r i (the expected complex value).\n\nOutput Format:\nLine 1: 'Sum: <real> + <imag>i' when the imaginary part is zero or positive, 'Sum: <real> - <imag>i' with the positive magnitude when it is negative.\nLine 2: 'Equal' if the accumulated sum equals the expected complex number, otherwise 'Not equal'.\n\nConstraints:\n-1000 <= each integer <= 1000, 0 <= N <= 10",
    difficulty: "medium",
    maxscore: 20,
    topic: "Operator Overloading",
    subtopic: "Overloading Arithmetic Operators",
    inputconstrains: "-1000 <= each integer <= 1000, 0 <= N <= 10",
    sampleinput1: "0 0 3 5 1 2 -3 4 2 7",
    sampleinput2: "1 1 2 10 20 5 5 16 26",
    input1: "0 0 2 -1 -5 3 8 -6 -4",
    input2: "100 -100 1 0 200 100 100",
    input3: "-5 -5 0 -5 -5",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class Complex {
public:
    int re, im;
    Complex(int r = 0, int i = 0) : re(r), im(i) {}
    Complex& operator+=(const Complex& other) {
        re += other.re;
        im += other.im;
        return *this;
    }
    bool operator==(const Complex& other) const {
        return re == other.re && im == other.im;
    }
    void show() const {
        if (im < 0)
            cout << re << " - " << (-im) << "i";
        else
            cout << re << " + " << im << "i";
    }
};

int main() {
    int r1, i1, n, r2, i2;
    cin >> r1 >> i1 >> n;
    Complex sum(r1, i1);
    for (int k = 0; k < n; k++) {
        int r, i;
        cin >> r >> i;
        sum += Complex(r, i);
    }
    cin >> r2 >> i2;
    Complex expected(r2, i2);
    cout << "Sum: ";
    sum.show();
    cout << endl;
    if (sum == expected)
        cout << "Equal" << endl;
    else
        cout << "Not equal" << endl;
    return 0;
}`,
    blacklist: "printf",
    whitelist: "operator+=, operator==, class",
  },
  {
    title: "Minute Hand with Pre-Increment",
    description:
      "A watchmaker tests a minute hand by nudging it forward one minute at a time. Define a Time class (hours, minutes) and overload the prefix ++ operator so it advances the time by exactly one minute; minutes carry into hours and hours wrap around modulo 24. Read a start time and the number of nudges, then print the time before and after applying ++ that many times.\n\nInput Format:\nOne line with three integers: h m n.\n\nOutput Format:\nLine 1: 'Before: hh:mm' (hours and minutes always shown as exactly two digits, zero padded).\nLine 2: 'After: hh:mm'.\n\nConstraints:\n0 <= h <= 23, 0 <= m <= 59, 1 <= n <= 300",
    difficulty: "medium",
    maxscore: 20,
    topic: "Operator Overloading",
    subtopic: "Overloading Increment and Decrement",
    inputconstrains: "0 <= h <= 23, 0 <= m <= 59, 1 <= n <= 300",
    sampleinput1: "9 59 3",
    sampleinput2: "0 0 1",
    input1: "23 59 2",
    input2: "10 0 120",
    input3: "22 10 500",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
using namespace std;

class Time {
public:
    int h, m;
    Time(int hh = 0, int mm = 0) : h(hh), m(mm) {}
    Time& operator++() {
        m++;
        if (m == 60) {
            m = 0;
            h = (h + 1) % 24;
        }
        return *this;
    }
    void show() const {
        cout << setw(2) << setfill('0') << h << ":"
             << setw(2) << m << endl;
    }
};

int main() {
    int h, m, n;
    cin >> h >> m >> n;
    Time t(h, m);
    cout << "Before: ";
    t.show();
    for (int k = 0; k < n; k++) {
        ++t;
    }
    cout << "After: ";
    t.show();
    return 0;
}`,
    blacklist: "printf",
    whitelist: "operator++, class, setfill",
  },
  {
    title: "Pretty Wallet with Stream Insertion",
    description:
      "A banking console wants balances printed in a fixed style. Define a Money class with rupees and paise, overload + to combine two balances (paise carry into rupees) and overload << as a friend function so that 'cout << amount' prints in the pretty 'Rs. r.pp' style. Read two wallets and print each one plus their combination.\n\nInput Format:\nOne line with four integers: rupees1 paise1 rupees2 paise2.\n\nOutput Format:\nLine 1: 'Wallet 1: Rs. <r>.<pp>' (paise as exactly two digits).\nLine 2: 'Wallet 2: Rs. <r>.<pp>'.\nLine 3: 'Combined: Rs. <r>.<pp>'.\n\nConstraints:\n0 <= rupees <= 100000, 0 <= paise <= 99",
    difficulty: "medium",
    maxscore: 20,
    topic: "Operator Overloading",
    subtopic: "Overloading Stream Operators",
    inputconstrains: "0 <= rupees <= 100000, 0 <= paise <= 99",
    sampleinput1: "120 5 80 95",
    sampleinput2: "0 1 0 1",
    input1: "999 99 1 1",
    input2: "50 50 50 50",
    input3: "0 0 100 99",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
using namespace std;

class Money {
public:
    int rupees, paise;
    Money(int r = 0, int p = 0) : rupees(r), paise(p) {}
    Money operator+(const Money& other) const {
        int tp = paise + other.paise;
        return Money(rupees + other.rupees + tp / 100, tp % 100);
    }
    friend ostream& operator<<(ostream& out, const Money& m) {
        out << "Rs. " << m.rupees << "."
            << setw(2) << setfill('0') << m.paise;
        return out;
    }
};

int main() {
    int r1, p1, r2, p2;
    cin >> r1 >> p1 >> r2 >> p2;
    Money w1(r1, p1), w2(r2, p2);
    Money total = w1 + w2;
    cout << "Wallet 1: " << w1 << endl;
    cout << "Wallet 2: " << w2 << endl;
    cout << "Combined: " << total << endl;
    return 0;
}`,
    blacklist: "printf",
    whitelist: "friend, operator<<, ostream, class",
  },
  {
    title: "Fraction IO Round Trip",
    description:
      "Build a Fraction class that knows how to read and print itself. Overload >> as a friend to read 'numerator denominator', << as a friend to print 'p/q', and + to add fractions; every printed fraction is reduced to lowest terms using gcd (the denominator stays positive, so the sign lives on the numerator).\n\nInput Format:\nOne line with four integers: num1 den1 num2 den2 (denominators are positive).\n\nOutput Format:\nLine 1: 'First: <p>/<q>' (f1 reduced).\nLine 2: 'Second: <p>/<q>' (f2 reduced).\nLine 3: 'Sum: <p>/<q>' (f1 + f2 reduced; a zero fraction prints as 0/1 and an integer value keeps its /1).\n\nConstraints:\n-100 <= numerator <= 100, 1 <= denominator <= 100",
    difficulty: "medium",
    maxscore: 20,
    topic: "Operator Overloading",
    subtopic: "Overloading Stream Operators",
    inputconstrains: "-100 <= numerator <= 100, 1 <= denominator <= 100",
    sampleinput1: "4 8 3 9",
    sampleinput2: "-2 4 2 4",
    input1: "6 3 7 2",
    input2: "0 5 0 7",
    input3: "-9 3 4 6",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int gcd(int a, int b) {
    while (b != 0) {
        int t = a % b;
        a = b;
        b = t;
    }
    return a;
}

class Fraction {
public:
    int num, den;
    Fraction(int n = 0, int d = 1) : num(n), den(d) {}
    Fraction operator+(const Fraction& o) const {
        return Fraction(num * o.den + o.num * den, den * o.den);
    }
    void reduce() {
        int g = gcd(num < 0 ? -num : num, den);
        num /= g;
        den /= g;
    }
    friend istream& operator>>(istream& in, Fraction& f) {
        in >> f.num >> f.den;
        return in;
    }
    friend ostream& operator<<(ostream& out, const Fraction& f) {
        out << f.num << "/" << f.den;
        return out;
    }
};

int main() {
    Fraction f1, f2;
    cin >> f1 >> f2;
    Fraction sum = f1 + f2;
    f1.reduce();
    f2.reduce();
    sum.reduce();
    cout << "First: " << f1 << endl;
    cout << "Second: " << f2 << endl;
    cout << "Sum: " << sum << endl;
    return 0;
}`,
    blacklist: "printf",
    whitelist: "friend, operator>>, operator<<, operator+, gcd",
  },
  {
    title: "Score Card with Subscript Operator",
    description:
      "A quiz platform stores five component marks for a contestant. Define a Score class that keeps the marks in an array and overloads the [] subscript operator so s[i] returns the i-th mark for 0 <= i <= 4, while any other index prints an out-of-range message. Read the five marks and a list of query indices, applying s[idx] for each query.\n\nInput Format:\nLine 1: five integers (the marks).\nLine 2: an integer K.\nLine 3: K query indices.\n\nOutput Format:\nFor each query, one line: 'Score <i>: <value>' for a valid index, or 'Score <i>: Invalid index' otherwise.\n\nConstraints:\n0 <= each mark <= 100, 1 <= K <= 10, -5 <= each query index <= 10",
    difficulty: "medium",
    maxscore: 20,
    topic: "Operator Overloading",
    subtopic: "Overloading Subscript and Function Call",
    inputconstrains: "0 <= each mark <= 100, 1 <= K <= 10, -5 <= query index <= 10",
    sampleinput1: "90 85 70 60 95\n3\n0 4 2",
    sampleinput2: "50 60 70 80 90\n3\n5 -1 1",
    input1: "100 100 100 100 100\n2\n0 0",
    input2: "10 20 30 40 50\n5\n4 3 2 1 0",
    input3: "11 22 33 44 55\n3\n2 5 -2",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class Score {
public:
    int marks[5];
    Score() {
        for (int i = 0; i < 5; i++) marks[i] = 0;
    }
    int operator[](int i) {
        if (i < 0 || i > 4) {
            cout << "Score " << i << ": Invalid index" << endl;
            return -1;
        }
        cout << "Score " << i << ": " << marks[i] << endl;
        return marks[i];
    }
};

int main() {
    Score s;
    for (int i = 0; i < 5; i++) cin >> s.marks[i];
    int k;
    cin >> k;
    for (int q = 0; q < k; q++) {
        int idx;
        cin >> idx;
        s[idx];
    }
    return 0;
}`,
    blacklist: "printf",
    whitelist: "operator[], class",
  },
  {
    title: "Currency Match with Equality Operators",
    description:
      "An FX desk compares money across currencies using fixed integer rates: 1 USD = 83 INR and 1 EUR = 90 INR. Define a Currency class with a code and an amount, overload == to compare the INR values and != as the negation of ==. Read two currencies and report both checks.\n\nInput Format:\nOne line with: code1 amount1 code2 amount2 (codes are INR, USD or EUR).\n\nOutput Format:\nLine 1: 'Currency 1: <code> <amount>'.\nLine 2: 'Currency 2: <code> <amount>'.\nLine 3: 'Equality check: Same value' if == is true, otherwise 'Equality check: Different value'.\nLine 4: 'Inequality check: Values differ' if != is true, otherwise 'Inequality check: Values match'.\n\nConstraints:\n0 <= amount <= 100000",
    difficulty: "medium",
    maxscore: 20,
    topic: "Operator Overloading",
    subtopic: "Overloading Relational Operators",
    inputconstrains: "0 <= amount <= 100000",
    sampleinput1: "USD 10 INR 830",
    sampleinput2: "EUR 5 USD 10",
    input1: "INR 1000 USD 12",
    input2: "USD 0 INR 0",
    input3: "EUR 2 EUR 2",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

class Currency {
public:
    string code;
    int amount;
    Currency(string c = "INR", int a = 0) : code(c), amount(a) {}
    int inrValue() const {
        if (code == "USD") return amount * 83;
        if (code == "EUR") return amount * 90;
        return amount;
    }
    bool operator==(const Currency& o) const {
        return inrValue() == o.inrValue();
    }
    bool operator!=(const Currency& o) const {
        return !(*this == o);
    }
};

int main() {
    string c1, c2;
    int a1, a2;
    cin >> c1 >> a1 >> c2 >> a2;
    Currency first(c1, a1), second(c2, a2);
    cout << "Currency 1: " << first.code << " " << first.amount << endl;
    cout << "Currency 2: " << second.code << " " << second.amount << endl;
    if (first == second)
        cout << "Equality check: Same value" << endl;
    else
        cout << "Equality check: Different value" << endl;
    if (first != second)
        cout << "Inequality check: Values differ" << endl;
    else
        cout << "Inequality check: Values match" << endl;
    return 0;
}`,
    blacklist: "printf",
    whitelist: "operator==, operator!=, class, string",
  },

  // ------------------------------------------------------------------- hard
  {
    title: "Polynomial Composer with Operators",
    description:
      "A symbolic math tool builds polynomials from coefficient lists. Define a Polynomial class (degree up to 10, integer coefficients stored from the constant term upward) and overload + to add two polynomials term by term and * with an integer scalar on the right to scale every coefficient. Read two polynomials and a scalar, then print their sum and the scaled first polynomial, skipping terms with zero coefficients (print 0 if nothing remains).\n\nInput Format:\nOne line with: degA followed by degA+1 coefficients (constant first), then degB followed by degB+1 coefficients, then an integer scalar.\n\nOutput Format:\nLine 1: 'Sum: <polynomial>'.\nLine 2: 'Scaled: <polynomial>'.\nPolynomial formatting: terms are printed from the highest power down; every nonzero term is '<coef>x^k' (k >= 2), '<coef>x' (k = 1) or '<coef>' (k = 0), joined by ' + ' or ' - ' with absolute coefficient values; a leading negative prints as '-'; a coefficient of 1 or -1 omits the number before x; zero terms are skipped; the all-zero polynomial prints as '0'.\n\nConstraints:\n0 <= degree <= 10, -50 <= coefficient <= 50, -10 <= scalar <= 10",
    difficulty: "hard",
    maxscore: 30,
    topic: "Operator Overloading",
    subtopic: "Overloading Arithmetic Operators",
    inputconstrains: "0 <= degree <= 10, -50 <= coefficient <= 50, -10 <= scalar <= 10",
    sampleinput1: "2 1 2 3 1 4 5 2",
    sampleinput2: "0 5 2 0 -1 0 -3",
    input1: "3 1 0 0 2 3 2 0 0 -2 1",
    input2: "1 0 0 0 -7 5",
    input3: "2 1 1 1 2 1 1 1 -1",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class Polynomial {
public:
    int deg;
    int coeff[11];
    Polynomial(int d = 0) : deg(d) {
        for (int i = 0; i <= 10; i++) coeff[i] = 0;
    }
    Polynomial operator+(const Polynomial& o) const {
        int md = deg > o.deg ? deg : o.deg;
        Polynomial r(md);
        for (int i = 0; i <= md; i++) {
            int a = (i <= deg) ? coeff[i] : 0;
            int b = (i <= o.deg) ? o.coeff[i] : 0;
            r.coeff[i] = a + b;
        }
        return r;
    }
    Polynomial operator*(int s) const {
        Polynomial r(deg);
        for (int i = 0; i <= deg; i++) r.coeff[i] = coeff[i] * s;
        return r;
    }
    void print() const {
        bool first = true;
        for (int k = deg; k >= 0; k--) {
            int c = coeff[k];
            if (c == 0) continue;
            if (!first)
                cout << (c > 0 ? " + " : " - ");
            else if (c < 0)
                cout << "-";
            int a = c < 0 ? -c : c;
            if (k == 0) {
                cout << a;
            } else {
                if (a != 1) cout << a;
                cout << "x";
                if (k > 1) cout << "^" << k;
            }
            first = false;
        }
        if (first) cout << "0";
        cout << endl;
    }
};

int main() {
    int degA;
    cin >> degA;
    Polynomial A(degA);
    for (int i = 0; i <= degA; i++) cin >> A.coeff[i];
    int degB;
    cin >> degB;
    Polynomial B(degB);
    for (int i = 0; i <= degB; i++) cin >> B.coeff[i];
    int s;
    cin >> s;
    Polynomial sum = A + B;
    Polynomial scaled = A * s;
    cout << "Sum: ";
    sum.print();
    cout << "Scaled: ";
    scaled.print();
    return 0;
}`,
    blacklist: "printf",
    whitelist: "operator+, operator*, class",
  },
  {
    title: "Matrix Studio with Operator Overloads",
    description:
      "A graphics course builds a tiny linear-algebra studio around a Matrix2x2 class. Overload + and - element-wise, * as true matrix multiplication, and << as a friend so that 'cout << m' prints both rows. Read two matrices and print their sum, difference and product.\n\nInput Format:\nOne line with eight integers: a b c d e f g h, where the first matrix is [[a b] [c d]] and the second is [[e f] [g h]].\n\nOutput Format:\n'Sum:' then the matrix (two lines, two integers per line separated by one space), then 'Difference:' with its matrix, then 'Product:' with its matrix.\n\nConstraints:\n-10 <= each element <= 10",
    difficulty: "hard",
    maxscore: 30,
    topic: "Operator Overloading",
    subtopic: "Overloading Arithmetic Operators",
    inputconstrains: "-10 <= each element <= 10",
    sampleinput1: "1 2 3 4 5 6 7 8",
    sampleinput2: "0 0 0 0 1 2 3 4",
    input1: "2 0 0 2 1 1 1 1",
    input2: "1 0 0 1 9 8 7 6",
    input3: "3 5 1 2 1 2 3 4",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

class Matrix2x2 {
public:
    int a, b, c, d;
    Matrix2x2(int a = 0, int b = 0, int c = 0, int d = 0)
        : a(a), b(b), c(c), d(d) {}
    Matrix2x2 operator+(const Matrix2x2& o) const {
        return Matrix2x2(a + o.a, b + o.b, c + o.c, d + o.d);
    }
    Matrix2x2 operator-(const Matrix2x2& o) const {
        return Matrix2x2(a - o.a, b - o.b, c - o.c, d - o.d);
    }
    Matrix2x2 operator*(const Matrix2x2& o) const {
        return Matrix2x2(a * o.a + b * o.c, a * o.b + b * o.d,
                         c * o.a + d * o.c, c * o.b + d * o.d);
    }
    friend ostream& operator<<(ostream& out, const Matrix2x2& m) {
        out << m.a << " " << m.b << endl << m.c << " " << m.d;
        return out;
    }
};

int main() {
    int a, b, c, d, e, f, g, h;
    cin >> a >> b >> c >> d >> e >> f >> g >> h;
    Matrix2x2 m1(a, b, c, d), m2(e, f, g, h);
    Matrix2x2 s = m1 + m2;
    Matrix2x2 df = m1 - m2;
    Matrix2x2 p = m1 * m2;
    cout << "Sum:" << endl << s << endl;
    cout << "Difference:" << endl << df << endl;
    cout << "Product:" << endl << p << endl;
    return 0;
}`,
    blacklist: "printf",
    whitelist: "operator+, operator-, operator*, operator<<, friend, ostream",
  },
  {
    title: "Big Integer Adder with Operator+",
    description:
      "Cryptography utilities often need arithmetic beyond 64-bit. Define a BigInt class that stores a non-negative decimal number as a string of digits (up to 40 digits) and overloads the + operator to perform school-book addition from the least significant digit with carries. Read two big integers, echo them and print the sum with no leading zeros.\n\nInput Format:\nOne line with two decimal strings a and b (no leading zeros, length 1 to 40 each).\n\nOutput Format:\nLine 1: 'A: <a>'.\nLine 2: 'B: <b>'.\nLine 3: 'Sum: <a + b>' with leading zeros removed (a sum of zero prints as 0).\n\nConstraints:\n1 <= length <= 40 digits, both values are non-negative",
    difficulty: "hard",
    maxscore: 30,
    topic: "Operator Overloading",
    subtopic: "Overloading Arithmetic Operators",
    inputconstrains: "1 <= length <= 40 digits, non-negative values",
    sampleinput1: "99999999999999999999 1",
    sampleinput2: "12345 67890",
    input1: "0 0",
    input2: "9999999999999999999999999999999999999999 2",
    input3: "500 500",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

class BigInt {
public:
    string digits;
    BigInt(string s = "0") {
        int i = 0;
        while (i < (int)s.size() - 1 && s[i] == '0') i++;
        digits = s.substr(i);
    }
    BigInt operator+(const BigInt& other) const {
        string a = digits, b = other.digits;
        string result = "";
        int i = (int)a.size() - 1, j = (int)b.size() - 1, carry = 0;
        while (i >= 0 || j >= 0 || carry > 0) {
            int sum = carry;
            if (i >= 0) { sum += a[i] - '0'; i--; }
            if (j >= 0) { sum += b[j] - '0'; j--; }
            carry = sum / 10;
            result += (char)('0' + sum % 10);
        }
        reverse(result.begin(), result.end());
        return BigInt(result);
    }
};

int main() {
    string sa, sb;
    cin >> sa >> sb;
    BigInt a(sa), b(sb);
    BigInt c = a + b;
    cout << "A: " << a.digits << endl;
    cout << "B: " << b.digits << endl;
    cout << "Sum: " << c.digits << endl;
    return 0;
}`,
    blacklist: "printf",
    whitelist: "operator+, class, string",
  },
  {
    title: "Calendar Advancer with Increment Operators",
    description:
      "A calendar service steps through dates one day at a time. Define a Date class and overload both ++ operators: prefix (++d) and postfix (d++) must each advance the date by one day, handling month lengths (30, 31, 28) and leap-year Februaries (years divisible by 4, except centuries not divisible by 400), rolling over months and years. Read a start date and N, then print the sequence of N+1 dates, advancing with prefix ++ on odd steps and postfix ++ on even steps.\n\nInput Format:\nOne line with four integers: dd mm yyyy n (the start date is a valid calendar date).\n\nOutput Format:\nN+1 lines, each 'dd-mm-yyyy' with dd and mm shown as exactly two digits (zero padded), starting with the given date and then every advanced date.\n\nConstraints:\n1900 <= yyyy <= 2100, 1 <= n <= 60",
    difficulty: "hard",
    maxscore: 30,
    topic: "Operator Overloading",
    subtopic: "Overloading Increment and Decrement",
    inputconstrains: "1900 <= yyyy <= 2100, 1 <= n <= 60",
    sampleinput1: "28 2 2024 3",
    sampleinput2: "31 12 2025 2",
    input1: "28 2 2023 2",
    input2: "28 2 2000 2",
    input3: "30 11 2026 2",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
using namespace std;

class Date {
public:
    int d, m, y;
    Date(int dd = 1, int mm = 1, int yy = 2000) : d(dd), m(mm), y(yy) {}
    static bool isLeap(int year) {
        return (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
    }
    static int monthDays(int month, int year) {
        if (month == 2) return isLeap(year) ? 29 : 28;
        if (month == 4 || month == 6 || month == 9 || month == 11) return 30;
        return 31;
    }
    void advance() {
        d++;
        if (d > monthDays(m, y)) {
            d = 1;
            m++;
            if (m > 12) {
                m = 1;
                y++;
            }
        }
    }
    Date& operator++() {
        advance();
        return *this;
    }
    Date operator++(int) {
        Date temp = *this;
        advance();
        return temp;
    }
    void print() const {
        cout << setw(2) << setfill('0') << d << "-"
             << setw(2) << m << "-" << y << endl;
    }
};

int main() {
    int d, m, y, n;
    cin >> d >> m >> y >> n;
    Date cur(d, m, y);
    cur.print();
    for (int k = 1; k <= n; k++) {
        if (k % 2 == 1)
            ++cur;
        else
            cur++;
        cur.print();
    }
    return 0;
}`,
    blacklist: "printf",
    whitelist: "operator++, class, isLeap, setfill",
  },
];

export const mcqs = [
  // ------------------------------------------------------------------ easy
  {
    title: "Meaning of Operator Overloading",
    description: "Operator overloading in C++ is best described as:",
    difficulty: "easy",
    topic: "Operator Overloading",
    subtopic: "Rules for Operator Overloading",
    Option1: "Giving standard C++ operators additional meanings for user-defined types",
    Option2: "Changing the behaviour of operators for built-in types like int",
    Option3: "Creating brand new operator symbols such as **",
    Option4: "Replacing functions with macros to make programs faster",
    CorrectOption: 1,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Operators That Cannot Be Overloaded",
    description: "Which group of C++ operators CANNOT be overloaded?",
    difficulty: "easy",
    topic: "Operator Overloading",
    subtopic: "Rules for Operator Overloading",
    Option1: "+, -, *",
    Option2: "==, !=, <",
    Option3: "?:, ::, ., .*",
    Option4: "<<, >>",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Return Value of operator+",
    description:
      "When you overload the binary + for a class like Complex, the overloaded operator+ should normally:",
    difficulty: "easy",
    topic: "Operator Overloading",
    subtopic: "Overloading Arithmetic Operators",
    Option1: "Modify the left operand and return void",
    Option2: "Return a new object holding the sum, leaving both operands unchanged",
    Option3: "Print the sum directly and return nothing",
    Option4: "Return a reference to one of its operands",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Name of the << Operator",
    description: "When used with cout to print an object, << is known as the:",
    difficulty: "easy",
    topic: "Operator Overloading",
    subtopic: "Overloading Stream Operators",
    Option1: "Extraction operator",
    Option2: "Shift-left operator that cannot print objects",
    Option3: "Stream insertion operator",
    Option4: "Stream extraction operator",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Purpose of operator==",
    description: "Overloading operator== for a class lets you:",
    difficulty: "easy",
    topic: "Operator Overloading",
    subtopic: "Overloading Relational Operators",
    Option1: "Assign one object to another",
    Option2: "Add two objects member by member",
    Option3: "Print the object with cout",
    Option4: "Compare two objects and get true or false",
    CorrectOption: 4,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "User-Defined Operand Requirement",
    description: "Which rule applies when overloading an operator in C++?",
    difficulty: "easy",
    topic: "Operator Overloading",
    subtopic: "Rules for Operator Overloading",
    Option1: "All operands must be built-in types",
    Option2: "At least one operand must be a user-defined type such as a class or enum",
    Option3: "Operators can only be overloaded for pointers",
    Option4: "Both operands must be objects of the same class",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Keyword for Operator Functions",
    description:
      "An overloaded operator in C++ is defined as a special function whose name is the keyword operator followed by:",
    difficulty: "easy",
    topic: "Operator Overloading",
    subtopic: "Rules for Operator Overloading",
    Option1: "The symbol of the operator being overloaded",
    Option2: "The return type of the operator",
    Option3: "The class name only",
    Option4: "The word overload",
    CorrectOption: 1,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Parameters of a Member operator+",
    description:
      "If operator+ is defined as a member function of class Complex to overload the binary +, how many explicit parameters does it take?",
    difficulty: "easy",
    topic: "Operator Overloading",
    subtopic: "Overloading Arithmetic Operators",
    Option1: "Two",
    Option2: "Zero",
    Option3: "One",
    Option4: "Three",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Overloading and Precedence",
    description:
      "If you overload the + operator for your class, its precedence and associativity:",
    difficulty: "easy",
    topic: "Operator Overloading",
    subtopic: "Rules for Operator Overloading",
    Option1: "Can be redefined inside the class",
    Option2: "Become undefined at runtime",
    Option3: "Depend on the return type",
    Option4: "Stay exactly the same as the built-in operator",
    CorrectOption: 4,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "friend and Operator Functions",
    description:
      "A non-member operator function that needs access to the private members of a class is usually declared as a:",
    difficulty: "easy",
    topic: "Operator Overloading",
    subtopic: "Overloading Stream Operators",
    Option1: "static function",
    Option2: "virtual function",
    Option3: "const member function",
    Option4: "friend function",
    CorrectOption: 4,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },

  // ----------------------------------------------------------------- medium
  {
    title: "Predict the Box Sum",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "Operator Overloading",
    subtopic: "Overloading Arithmetic Operators",
    Option1: "7",
    Option2: "34",
    Option3: "12",
    Option4: "Compile error",
    CorrectOption: 1,
    codesnippet: `#include <iostream>
using namespace std;
class Box {
public:
    int w;
    Box(int x = 0) : w(x) {}
    Box operator+(const Box& o) const { return Box(w + o.w); }
};
int main() {
    Box a(3), b(4);
    Box c = a + b;
    cout << c.w;
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nclass Box {\npublic:\n    int w;\n    Box(int x = 0) : w(x) {}\n    Box operator+(const Box& o) const { return Box(w + o.w); }\n};\nint main() {\n    Box a(3), b(4);\n    Box c = a + b;\n    cout << c.w;\n    return 0;\n}`,
      stdin: "",
      expected: "7",
    },
  },
  {
    title: "Counter Pre-Increment Output",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "Operator Overloading",
    subtopic: "Overloading Increment and Decrement",
    Option1: "5",
    Option2: "15",
    Option3: "25",
    Option4: "20",
    CorrectOption: 3,
    codesnippet: `#include <iostream>
using namespace std;
class Counter {
public:
    int v;
    Counter(int x = 0) : v(x) {}
    Counter& operator++() { v = v + 10; return *this; }
};
int main() {
    Counter c(5);
    ++c;
    ++c;
    cout << c.v;
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nclass Counter {\npublic:\n    int v;\n    Counter(int x = 0) : v(x) {}\n    Counter& operator++() { v = v + 10; return *this; }\n};\nint main() {\n    Counter c(5);\n    ++c;\n    ++c;\n    cout << c.v;\n    return 0;\n}`,
      stdin: "",
      expected: "25",
    },
  },
  {
    title: "Wallet Insertion Output",
    description: "What does this program print (exactly)?",
    difficulty: "medium",
    topic: "Operator Overloading",
    subtopic: "Overloading Stream Operators",
    Option1: "Rs.50",
    Option2: "50",
    Option3: "Rs. 50",
    Option4: "Compile error",
    CorrectOption: 1,
    codesnippet: `#include <iostream>
using namespace std;
class Wallet {
public:
    int rupees;
    Wallet(int r = 0) : rupees(r) {}
    friend ostream& operator<<(ostream& out, const Wallet& w) {
        out << "Rs." << w.rupees;
        return out;
    }
};
int main() {
    Wallet w(50);
    cout << w;
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nclass Wallet {\npublic:\n    int rupees;\n    Wallet(int r = 0) : rupees(r) {}\n    friend ostream& operator<<(ostream& out, const Wallet& w) {\n        out << "Rs." << w.rupees;\n        return out;\n    }\n};\nint main() {\n    Wallet w(50);\n    cout << w;\n    return 0;\n}`,
      stdin: "",
      expected: "Rs.50",
    },
  },
  {
    title: "Token Equality Output",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "Operator Overloading",
    subtopic: "Overloading Relational Operators",
    Option1: "01",
    Option2: "10",
    Option3: "11",
    Option4: "00",
    CorrectOption: 2,
    codesnippet: `#include <iostream>
using namespace std;
class Token {
public:
    int id;
    Token(int i = 0) : id(i) {}
    bool operator==(const Token& o) const { return id == o.id; }
};
int main() {
    Token a(7), b(7), c(9);
    cout << (a == b) << (a == c);
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nclass Token {\npublic:\n    int id;\n    Token(int i = 0) : id(i) {}\n    bool operator==(const Token& o) const { return id == o.id; }\n};\nint main() {\n    Token a(7), b(7), c(9);\n    cout << (a == b) << (a == c);\n    return 0;\n}`,
      stdin: "",
      expected: "10",
    },
  },
  {
    title: "Why << Is a Non-Member",
    description:
      "When overloading << so that 'cout << obj' works for your class, the operator function must be a non-member (often a friend) because:",
    difficulty: "medium",
    topic: "Operator Overloading",
    subtopic: "Overloading Stream Operators",
    Option1: "The left operand is an ostream object, not an object of our class",
    Option2: "Member functions cannot take reference parameters",
    Option3: "cout is declared const everywhere",
    Option4: "<< only works with built-in types",
    CorrectOption: 1,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Member Versus Non-Member Operators",
    description:
      "Which statement about member versus non-member operator functions is TRUE?",
    difficulty: "medium",
    topic: "Operator Overloading",
    subtopic: "Rules for Operator Overloading",
    Option1: "A member operator function can place any type on its left side",
    Option2: "A non-member operator must always be declared private",
    Option3: "For a member operator function, the left operand must be an object of that class",
    Option4: "Non-member operators cannot access public members",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },

  // ------------------------------------------------------------------- hard
  {
    title: "Pre and Post Together Output",
    description:
      "What does this program print? (prefix ++ adds 1; postfix ++ adds 10 but returns the OLD value.)",
    difficulty: "hard",
    topic: "Operator Overloading",
    subtopic: "Overloading Increment and Decrement",
    Option1: "1011",
    Option2: "111",
    Option3: "1111",
    Option4: "1110",
    CorrectOption: 3,
    codesnippet: `#include <iostream>
using namespace std;
class Step {
public:
    int n;
    Step(int x = 0) : n(x) {}
    Step& operator++() { n += 1; return *this; }
    Step operator++(int) { Step t = *this; n += 10; return t; }
};
int main() {
    Step s(0);
    Step a = ++s;
    Step b = s++;
    cout << a.n << b.n << s.n;
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nclass Step {\npublic:\n    int n;\n    Step(int x = 0) : n(x) {}\n    Step& operator++() { n += 1; return *this; }\n    Step operator++(int) { Step t = *this; n += 10; return t; }\n};\nint main() {\n    Step s(0);\n    Step a = ++s;\n    Step b = s++;\n    cout << a.n << b.n << s.n;\n    return 0;\n}`,
      stdin: "",
      expected: "1111",
    },
  },
  {
    title: "Chained Plus Associativity Output",
    description:
      "What does this program print? Remember how chains of + are grouped.",
    difficulty: "hard",
    topic: "Operator Overloading",
    subtopic: "Overloading Arithmetic Operators",
    Option1: "17",
    Option2: "11",
    Option3: "9",
    Option4: "6",
    CorrectOption: 2,
    codesnippet: `#include <iostream>
using namespace std;
class Acc {
public:
    int total;
    Acc(int t = 0) : total(t) {}
    Acc operator+(const Acc& o) const { return Acc(total + o.total * 2); }
};
int main() {
    Acc a(1), b(2), c(3);
    Acc r = a + b + c;
    cout << r.total;
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nclass Acc {\npublic:\n    int total;\n    Acc(int t = 0) : total(t) {}\n    Acc operator+(const Acc& o) const { return Acc(total + o.total * 2); }\n};\nint main() {\n    Acc a(1), b(2), c(3);\n    Acc r = a + b + c;\n    cout << r.total;\n    return 0;\n}`,
      stdin: "",
      expected: "11",
    },
  },
  {
    title: "Implicit Conversion in Operator+",
    description:
      "What does this program print? (Grams has a non-explicit one-argument constructor.)",
    difficulty: "hard",
    topic: "Operator Overloading",
    subtopic: "Rules for Operator Overloading",
    Option1: "Compile error",
    Option2: "150",
    Option3: "50",
    Option4: "100",
    CorrectOption: 2,
    codesnippet: `#include <iostream>
using namespace std;
class Grams {
public:
    int g;
    Grams(int x = 0) : g(x) {}
    Grams operator+(const Grams& o) const { return Grams(g + o.g); }
};
int main() {
    Grams a(100);
    Grams b = a + 50;
    cout << b.g;
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nclass Grams {\npublic:\n    int g;\n    Grams(int x = 0) : g(x) {}\n    Grams operator+(const Grams& o) const { return Grams(g + o.g); }\n};\nint main() {\n    Grams a(100);\n    Grams b = a + 50;\n    cout << b.g;\n    return 0;\n}`,
      stdin: "",
      expected: "150",
    },
  },
  {
    title: "What Overloading Cannot Change",
    description:
      "Which of the following CANNOT be changed by overloading an operator for a class?",
    difficulty: "hard",
    topic: "Operator Overloading",
    subtopic: "Rules for Operator Overloading",
    Option1: "Its precedence, associativity and number of operands",
    Option2: "The return type it produces for the class",
    Option3: "Which class types can be its operands",
    Option4: "The actual symbol sequence it uses, like + becoming ++",
    CorrectOption: 1,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
];
