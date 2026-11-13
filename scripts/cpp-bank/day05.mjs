/**
 * OOPS using CPP — Day 5: Functions and Modular Programming
 * 20 code questions (10 easy: 6 basics + 4 real-world, 6 medium, 4 hard)
 * 20 MCQs (10 easy, 6 medium, 4 hard)
 * All solutions are fresh C++ written for this course (no conversions).
 */
export const meta = {
  day: 5,
  topic: "Functions and Modular Programming",
};

export const code = [
  // ------------------------------------------------------------------ easy
  {
    title: "Add Two Numbers Function",
    description:
      "Modular programs start with tiny reusable units. Define a function int add(int a, int b) that receives two integers as parameters and returns their sum. Read the two integers in main and print the result by calling the function.\n\nInput Format:\nOne line with two integers a and b.\n\nOutput Format:\nSum: <a + b>\n\nConstraints:\n-1000 <= a, b <= 1000",
    difficulty: "easy",
    maxscore: 10,
    topic: "Functions and Modular Programming",
    subtopic: "Function Declaration and Definition",
    inputconstrains: "-1000 <= a, b <= 1000",
    sampleinput1: "10 32",
    sampleinput2: "-5 5",
    input1: "100 200",
    input2: "0 0",
    input3: "-999 -1",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int add(int a, int b) {
    return a + b;
}

int main() {
    int a, b;
    cin >> a >> b;
    cout << "Sum: " << add(a, b) << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Circle Area Function Drill",
    description:
      "A drafting office needs circle areas all day long. Define a function double areaOfCircle(double radius) that receives the radius as a parameter and returns the area computed with PI = 3.14159. Read the radius (a double) in main and print the radius and the area (two decimal places) returned by the function.\n\nInput Format:\nOne line with one double: radius.\n\nOutput Format:\nRadius: <radius>\nArea: <PI * r * r with 2 decimals>\n\nConstraints:\n0.1 <= radius <= 1000",
    difficulty: "easy",
    maxscore: 10,
    topic: "Functions and Modular Programming",
    subtopic: "Return Values",
    inputconstrains: "0.1 <= radius <= 1000",
    sampleinput1: "5",
    sampleinput2: "2.5",
    input1: "1",
    input2: "100",
    input3: "0.5",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
using namespace std;

double areaOfCircle(double radius) {
    const double PI = 3.14159;
    return PI * radius * radius;
}

int main() {
    double radius;
    cin >> radius;
    cout << "Radius: " << radius << endl;
    cout << fixed << setprecision(2);
    cout << "Area: " << areaOfCircle(radius) << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Even Checker Function",
    description:
      "A parity test is a classic one-line function. Define bool isEven(int n) that returns true when n is divisible by 2 and false otherwise. Read an integer in main and print the number together with the boolean result returned by the function.\n\nInput Format:\nOne line with one integer n.\n\nOutput Format:\nNumber: <n>\nEven: <true or false>\n\nConstraints:\n-100000 <= n <= 100000",
    difficulty: "easy",
    maxscore: 10,
    topic: "Functions and Modular Programming",
    subtopic: "Return Values",
    inputconstrains: "-100000 <= n <= 100000",
    sampleinput1: "8",
    sampleinput2: "7",
    input1: "0",
    input2: "-6",
    input3: "99999",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

bool isEven(int n) {
    return n % 2 == 0;
}

int main() {
    int n;
    cin >> n;
    cout << "Number: " << n << endl;
    cout << boolalpha << "Even: " << isEven(n) << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Grade From Marks Function",
    description:
      "An exam cell assigns letter grades through a small pure function. Define char gradeFrom(int marks) that returns 'A' for marks 90 or above, 'B' for 75 to 89, 'C' for 60 to 74, 'D' for 40 to 59 and 'F' below 40. Read the marks in main and print them with the grade returned by the function.\n\nInput Format:\nOne line with one integer: marks.\n\nOutput Format:\nMarks: <marks>\nGrade: <letter>\n\nConstraints:\n0 <= marks <= 100",
    difficulty: "easy",
    maxscore: 10,
    topic: "Functions and Modular Programming",
    subtopic: "Function Declaration and Definition",
    inputconstrains: "0 <= marks <= 100",
    sampleinput1: "92",
    sampleinput2: "68",
    input1: "75",
    input2: "40",
    input3: "39",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

char gradeFrom(int marks) {
    if (marks >= 90) {
        return 'A';
    }
    if (marks >= 75) {
        return 'B';
    }
    if (marks >= 60) {
        return 'C';
    }
    if (marks >= 40) {
        return 'D';
    }
    return 'F';
}

int main() {
    int marks;
    cin >> marks;
    cout << "Marks: " << marks << endl;
    cout << "Grade: " << gradeFrom(marks) << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Max of Three Function",
    description:
      "Finding the largest of three values is a natural fit for a function with three parameters. Define int maxOfThree(int a, int b, int c); the arguments are passed by value, so the function works on copies of the caller's data and returns the largest of them. Read three integers in main and print the maximum returned by the function.\n\nInput Format:\nOne line with three integers a, b and c.\n\nOutput Format:\nMax: <largest of the three>\n\nConstraints:\n-100000 <= each value <= 100000",
    difficulty: "easy",
    maxscore: 10,
    topic: "Functions and Modular Programming",
    subtopic: "Call by Value",
    inputconstrains: "-100000 <= each value <= 100000",
    sampleinput1: "4 9 2",
    sampleinput2: "-1 -7 -3",
    input1: "5 5 5",
    input2: "10 3 8",
    input3: "100 -100 50",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int maxOfThree(int a, int b, int c) {
    int biggest = a;
    if (b > biggest) {
        biggest = b;
    }
    if (c > biggest) {
        biggest = c;
    }
    return biggest;
}

int main() {
    int a, b, c;
    cin >> a >> b >> c;
    cout << "Max: " << maxOfThree(a, b, c) << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Line Printer Function",
    description:
      "Decorative separators are printed over and over, so they belong in a reusable void function. Define void printLine(int n) that prints n hyphen characters '-' on one line followed by a newline. It takes no result back, so its return type is void. Read n in main, call the function, then print the word END on the next line.\n\nInput Format:\nOne line with one integer n.\n\nOutput Format:\nA line containing exactly n hyphens, then a second line containing END.\n\nConstraints:\n1 <= n <= 30",
    difficulty: "easy",
    maxscore: 10,
    topic: "Functions and Modular Programming",
    subtopic: "Function Declaration and Definition",
    inputconstrains: "1 <= n <= 30",
    sampleinput1: "5",
    sampleinput2: "10",
    input1: "1",
    input2: "30",
    input3: "3",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

void printLine(int n) {
    for (int i = 0; i < n; i++) {
        cout << "-";
    }
    cout << endl;
}

int main() {
    int n;
    cin >> n;
    printLine(n);
    cout << "END" << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Photocopy Shop Bill Function",
    description:
      "A photocopy shop charges a fixed rate per page and wants the billing logic isolated in one function. Write int billFor(int copies, int ratePerPage) that receives both values as parameters and returns copies * ratePerPage. Read the number of copies and the rate in main and print the bill using the function's return value.\n\nInput Format:\nOne line with two integers: copies and rate per page.\n\nOutput Format:\nCopies: <copies>\nRate: <rate>\nBill: <copies * rate>\n\nConstraints:\n1 <= copies <= 500, 1 <= rate <= 50",
    difficulty: "easy",
    maxscore: 10,
    topic: "Functions and Modular Programming",
    subtopic: "Parameter Passing",
    inputconstrains: "1 <= copies <= 500, 1 <= rate <= 50",
    sampleinput1: "25 2",
    sampleinput2: "100 1",
    input1: "3 5",
    input2: "7 3",
    input3: "500 50",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int billFor(int copies, int ratePerPage) {
    return copies * ratePerPage;
}

int main() {
    int copies, rate;
    cin >> copies >> rate;
    cout << "Copies: " << copies << endl;
    cout << "Rate: " << rate << endl;
    cout << "Bill: " << billFor(copies, rate) << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Travel Time Function",
    description:
      "A logistics app estimates trip duration from distance and speed. Define double hoursFor(double distance, double speed) that returns distance / speed. Read the distance in km and the average speed in km/h in main, then print both values and the hours returned by the function with exactly two decimal places.\n\nInput Format:\nOne line with two doubles: distance and speed.\n\nOutput Format:\nDistance: <distance>\nSpeed: <speed>\nHours: <distance / speed with 2 decimals>\n\nConstraints:\n1 <= distance <= 5000, 0 < speed <= 300",
    difficulty: "easy",
    maxscore: 10,
    topic: "Functions and Modular Programming",
    subtopic: "Return Values",
    inputconstrains: "1 <= distance <= 5000, 0 < speed <= 300",
    sampleinput1: "150 50",
    sampleinput2: "120 45",
    input1: "300 80",
    input2: "60 40",
    input3: "10 3",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
using namespace std;

double hoursFor(double distance, double speed) {
    return distance / speed;
}

int main() {
    double distance, speed;
    cin >> distance >> speed;
    cout << "Distance: " << distance << endl;
    cout << "Speed: " << speed << endl;
    cout << fixed << setprecision(2);
    cout << "Hours: " << hoursFor(distance, speed) << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Password Strength Label Function",
    description:
      "A signup form labels every password the user types. Define string strengthLabel(string pw) that receives the password as a parameter and returns STRONG when its length is at least 12, MEDIUM when its length is at least 8, and WEAK otherwise. Read the password (a single word without spaces) in main and print it with the label returned by the function.\n\nInput Format:\nOne line with one word: the password (no spaces).\n\nOutput Format:\nPassword: <pw>\nStrength: <STRONG or MEDIUM or WEAK>\n\nConstraints:\n1 <= length of pw <= 30",
    difficulty: "easy",
    maxscore: 10,
    topic: "Functions and Modular Programming",
    subtopic: "Parameter Passing",
    inputconstrains: "1 <= length of pw <= 30",
    sampleinput1: "Sunshine2024",
    sampleinput2: "abc123",
    input1: "hello",
    input2: "passw0rd",
    input3: "MySecret#99",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

string strengthLabel(string pw) {
    if (pw.length() >= 12) {
        return "STRONG";
    }
    if (pw.length() >= 8) {
        return "MEDIUM";
    }
    return "WEAK";
}

int main() {
    string pw;
    cin >> pw;
    cout << "Password: " << pw << endl;
    cout << "Strength: " << strengthLabel(pw) << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Tip Splitter Function",
    description:
      "After a team lunch one person pays the tip and everyone shares it equally. Define double shareOf(double tipAmount, int friends) that returns tipAmount / friends. Read the tip amount (a double) and the number of friends (an integer) in main, then print the tip, the friend count and the per-friend share (two decimal places) using the function.\n\nInput Format:\nOne line with a double and an integer: tip amount and friend count.\n\nOutput Format:\nTip: <tip, 2 decimals>\nFriends: <friends>\nPer friend: <tip / friends, 2 decimals>\n\nConstraints:\n1 <= tip <= 100000, 1 <= friends <= 20",
    difficulty: "easy",
    maxscore: 10,
    topic: "Functions and Modular Programming",
    subtopic: "Return Values",
    inputconstrains: "1 <= tip <= 100000, 1 <= friends <= 20",
    sampleinput1: "300 4",
    sampleinput2: "100 3",
    input1: "250 5",
    input2: "99.9 2",
    input3: "1 7",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
using namespace std;

double shareOf(double tipAmount, int friends) {
    return tipAmount / friends;
}

int main() {
    double tipAmount;
    int friends;
    cin >> tipAmount >> friends;
    cout << fixed << setprecision(2);
    cout << "Tip: " << tipAmount << endl;
    cout << "Friends: " << friends << endl;
    cout << "Per friend: " << shareOf(tipAmount, friends) << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },

  // ----------------------------------------------------------------- medium
  {
    title: "Reference Swap Helper",
    description:
      "Call by reference gives a function real power over the caller's variables. Read two integers, print them, then call void swapVals(int& a, int& b) which exchanges the two integers through reference parameters. Print the values again after the call to show that the change survived outside the function.\n\nInput Format:\nOne line with two integers x and y.\n\nOutput Format:\nBefore: <x> <y>\nAfter: <y> <x>\n\nConstraints:\n-100000 <= x, y <= 100000",
    difficulty: "medium",
    maxscore: 20,
    topic: "Functions and Modular Programming",
    subtopic: "Call by Reference",
    inputconstrains: "-100000 <= x, y <= 100000",
    sampleinput1: "3 8",
    sampleinput2: "10 20",
    input1: "-5 5",
    input2: "100 1",
    input3: "7 7",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

void swapVals(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

int main() {
    int x, y;
    cin >> x >> y;
    cout << "Before: " << x << " " << y << endl;
    swapVals(x, y);
    cout << "After: " << x << " " << y << endl;
    return 0;
}`,
    blacklist: "printf, scanf",
    whitelist: "cin, cout, int, &",
  },
  {
    title: "Pointer Counter Bump",
    description:
      "A footfall counter at a door is incremented through its address. Define void bump(int* counter) that receives a pointer and adds 1 to the pointed-to value using *counter. Read the starting count in main and call bump three times with &count, printing the count after every call and the final value.\n\nInput Format:\nOne line with one integer: starting count.\n\nOutput Format:\nStart: <count>\nAfter bump 1: <count + 1>\nAfter bump 2: <count + 2>\nAfter bump 3: <count + 3>\nFinal: <count + 3>\n\nConstraints:\n-1000000 <= starting count <= 1000000",
    difficulty: "medium",
    maxscore: 20,
    topic: "Functions and Modular Programming",
    subtopic: "Call by Address",
    inputconstrains: "-1000000 <= starting count <= 1000000",
    sampleinput1: "10",
    sampleinput2: "0",
    input1: "97",
    input2: "-5",
    input3: "999999",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

void bump(int* counter) {
    *counter = *counter + 1;
}

int main() {
    int count;
    cin >> count;
    cout << "Start: " << count << endl;
    bump(&count);
    cout << "After bump 1: " << count << endl;
    bump(&count);
    cout << "After bump 2: " << count << endl;
    bump(&count);
    cout << "After bump 3: " << count << endl;
    cout << "Final: " << count << endl;
    return 0;
}`,
    blacklist: "printf, scanf",
    whitelist: "cin, cout, int, *",
  },
  {
    title: "Overloaded Temperature Convert Suite",
    description:
      "A weather service exposes one convert operation for two kinds of data, so the function is overloaded:\n- int convert(int celsius) computes Fahrenheit using whole-number arithmetic: (celsius * 9) / 5 + 32 with integer division\n- double convert(double celsius) computes celsius * 9.0 / 5.0 + 32.0 exactly\nRead one integer Celsius reading and one double Celsius reading, then print both conversions. The compiler picks the right overload automatically from the argument type.\n\nInput Format:\nOne line with two tokens: an integer Celsius value and a double Celsius value.\n\nOutput Format:\nRounded: <int convert result> F\nExact: <double convert result with 2 decimals> F\n\nConstraints:\n-100 <= each Celsius value <= 100",
    difficulty: "medium",
    maxscore: 20,
    topic: "Functions and Modular Programming",
    subtopic: "Function Overloading",
    inputconstrains: "-100 <= each Celsius value <= 100",
    sampleinput1: "100 36.6",
    sampleinput2: "0 0",
    input1: "-40 -40",
    input2: "37 0",
    input3: "25 -2.5",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
using namespace std;

int convert(int celsius) {
    return (celsius * 9) / 5 + 32;
}

double convert(double celsius) {
    return celsius * 9.0 / 5.0 + 32.0;
}

int main() {
    int c1;
    double c2;
    cin >> c1 >> c2;
    cout << "Rounded: " << convert(c1) << " F" << endl;
    cout << fixed << setprecision(2);
    cout << "Exact: " << convert(c2) << " F" << endl;
    return 0;
}`,
    blacklist: "printf, scanf",
    whitelist: "cin, cout, int, double",
  },
  {
    title: "Discount Engine Default Argument",
    description:
      "Festival season prices carry a standard 5 percent discount, but special sales pass their own percentage. Define double discountedPrice(double price, int percent = 5) with a default argument for the percent parameter. In main, read the price and one special percentage, then call the function twice: once with only the price (so the default 5 percent applies) and once with the special percentage.\n\nInput Format:\nOne line with a double and an integer: price and special discount percent.\n\nOutput Format:\nPrice: <price, 2 decimals>\nWith 5% discount: <price after default discount, 2 decimals>\nWith <p>% discount: <price after special discount, 2 decimals>\n\nConstraints:\n1 <= price <= 100000, 0 <= special percent <= 90",
    difficulty: "medium",
    maxscore: 20,
    topic: "Functions and Modular Programming",
    subtopic: "Default Arguments",
    inputconstrains: "1 <= price <= 100000, 0 <= special percent <= 90",
    sampleinput1: "200 10",
    sampleinput2: "59.60 25",
    input1: "1000 0",
    input2: "80 50",
    input3: "9.99 10",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
using namespace std;

double discountedPrice(double price, int percent = 5) {
    return price - price * percent / 100.0;
}

int main() {
    double price;
    int special;
    cin >> price >> special;
    cout << fixed << setprecision(2);
    cout << "Price: " << price << endl;
    cout << "With 5% discount: " << discountedPrice(price) << endl;
    cout << "With " << special << "% discount: " << discountedPrice(price, special) << endl;
    return 0;
}`,
    blacklist: "printf, scanf",
    whitelist: "cin, cout, double, int",
  },
  {
    title: "Min Max via Reference Out Params",
    description:
      "A statistics helper reports two results at once, so it fills them through reference out-parameters instead of return values. Define void findMinMax(int a, int b, int c, int& mn, int& mx) that stores the smallest of the three values in mn and the largest in mx. Read three integers in main, call the helper and print the results after the call.\n\nInput Format:\nOne line with three integers a, b and c.\n\nOutput Format:\nMin: <smallest>\nMax: <largest>\n\nConstraints:\n-100000 <= each value <= 100000",
    difficulty: "medium",
    maxscore: 20,
    topic: "Functions and Modular Programming",
    subtopic: "Call by Reference",
    inputconstrains: "-100000 <= each value <= 100000",
    sampleinput1: "4 9 2",
    sampleinput2: "-1 -7 -3",
    input1: "5 5 5",
    input2: "10 3 8",
    input3: "100 -100 50",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

void findMinMax(int a, int b, int c, int& mn, int& mx) {
    mn = a;
    if (b < mn) {
        mn = b;
    }
    if (c < mn) {
        mn = c;
    }
    mx = a;
    if (b > mx) {
        mx = b;
    }
    if (c > mx) {
        mx = c;
    }
}

int main() {
    int a, b, c;
    int mn, mx;
    cin >> a >> b >> c;
    findMinMax(a, b, c, mn, mx);
    cout << "Min: " << mn << endl;
    cout << "Max: " << mx << endl;
    return 0;
}`,
    blacklist: "printf, scanf",
    whitelist: "cin, cout, if, int, &",
  },
  {
    title: "Modular Billing Pipeline",
    description:
      "A stationery vendor's billing runs as a pipeline of small cooperating functions:\n- int subtotal(int rate, int quantity) returns rate * quantity\n- double withTax(double amount, int taxPercent) returns amount + amount * taxPercent / 100.0\nRead the unit rate, the quantity and the tax percent in main, then print the subtotal and the tax-inclusive grand total using the two functions.\n\nInput Format:\nOne line with three integers: unit rate, quantity and tax percent.\n\nOutput Format:\nSubtotal: <rate * quantity>\nTax: <tax amount, 2 decimals>\nGrand total: <subtotal + tax, 2 decimals>\n\nConstraints:\n1 <= rate <= 5000, 1 <= quantity <= 1000, 0 <= tax percent <= 40",
    difficulty: "medium",
    maxscore: 20,
    topic: "Functions and Modular Programming",
    subtopic: "Return Values",
    inputconstrains: "1 <= rate <= 5000, 1 <= quantity <= 1000, 0 <= tax percent <= 40",
    sampleinput1: "120 10 18",
    sampleinput2: "45 4 5",
    input1: "999 3 12",
    input2: "1 1 0",
    input3: "250 8 28",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
using namespace std;

int subtotal(int rate, int quantity) {
    return rate * quantity;
}

double withTax(double amount, int taxPercent) {
    return amount + amount * taxPercent / 100.0;
}

int main() {
    int rate, quantity, taxPercent;
    cin >> rate >> quantity >> taxPercent;
    int sub = subtotal(rate, quantity);
    double grand = withTax(sub, taxPercent);
    double tax = grand - sub;
    cout << "Subtotal: " << sub << endl;
    cout << fixed << setprecision(2);
    cout << "Tax: " << tax << endl;
    cout << "Grand total: " << grand << endl;
    return 0;
}`,
    blacklist: "printf, scanf",
    whitelist: "cin, cout, int, double",
  },

  // ------------------------------------------------------------------- hard
  {
    title: "Expense Report Engine",
    description:
      "An expense-report tool is built from cooperating functions:\n- void readExpense(string& label, double& amount) parses one expense through reference parameters\n- double totalOf(double a, double b) returns the sum of two amounts\n- void swapByRef(double& x, double& y) swaps through references\n- void swapByPtr(double* x, double* y) swaps through pointers\nRead two expenses (a single-word label and a double amount each). Print the report with the total, then swap the two amounts by reference and print, then swap them back by pointer and print.\n\nInput Format:\nOne line with four tokens: label1, amount1, label2, amount2.\n\nOutput Format:\n=== EXPENSE REPORT ===\n<label1>: <amount1, 2 decimals>\n<label2>: <amount2, 2 decimals>\nTotal: <sum, 2 decimals>\nAfter reference swap:\n<label1>: <amount2, 2 decimals>\n<label2>: <amount1, 2 decimals>\nAfter pointer swap:\n<label1>: <amount1, 2 decimals>\n<label2>: <amount2, 2 decimals>\n\nConstraints:\n0.01 <= each amount <= 1000000",
    difficulty: "hard",
    maxscore: 30,
    topic: "Functions and Modular Programming",
    subtopic: "Call by Reference",
    inputconstrains: "0.01 <= each amount <= 1000000",
    sampleinput1: "Travel 450.25 Food 120.75",
    sampleinput2: "Hotel 3000.50 Taxi 99.50",
    input1: "Books 1250 Stationery 349.80",
    input2: "Snacks 45.5 Juice 60.25",
    input3: "Fuel 999.99 Parking 0.01",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
#include <string>
using namespace std;

void readExpense(string& label, double& amount) {
    cin >> label >> amount;
}

double totalOf(double a, double b) {
    return a + b;
}

void swapByRef(double& x, double& y) {
    double temp = x;
    x = y;
    y = temp;
}

void swapByPtr(double* x, double* y) {
    double temp = *x;
    *x = *y;
    *y = temp;
}

int main() {
    string label1, label2;
    double amount1, amount2;
    readExpense(label1, amount1);
    readExpense(label2, amount2);
    cout << "=== EXPENSE REPORT ===" << endl;
    cout << fixed << setprecision(2);
    cout << label1 << ": " << amount1 << endl;
    cout << label2 << ": " << amount2 << endl;
    cout << "Total: " << totalOf(amount1, amount2) << endl;
    swapByRef(amount1, amount2);
    cout << "After reference swap:" << endl;
    cout << label1 << ": " << amount1 << endl;
    cout << label2 << ": " << amount2 << endl;
    swapByPtr(&amount1, &amount2);
    cout << "After pointer swap:" << endl;
    cout << label1 << ": " << amount1 << endl;
    cout << label2 << ": " << amount2 << endl;
    return 0;
}`,
    blacklist: "printf, scanf",
    whitelist: "cin, cout, string, double, &, *",
  },
  {
    title: "Cloud Storage Ladder Function",
    description:
      "A cloud storage plan prices data in a ladder, and the finance team needs each slab's cost separately, so the function fills its results through reference out-parameters. Define void computeLadder(int gb, double& slab1, double& slab2, double& slab3, double& total) where:\n- the first 50 GB cost 2.50 per GB\n- the next 100 GB (51 to 150) cost 4.00 per GB\n- every GB above 150 costs 6.00 per GB\nThe function fills slab1, slab2 and slab3 with each slab's cost and total with their sum. Read the data used (integer GB) and print the full ladder.\n\nInput Format:\nOne line with one integer: GB used.\n\nOutput Format:\nData: <gb> GB\nSlab 1 (first 50): <cost, 2 decimals>\nSlab 2 (next 100): <cost, 2 decimals>\nSlab 3 (above 150): <cost, 2 decimals>\nTotal: <total, 2 decimals>\n\nConstraints:\n0 <= gb <= 10000",
    difficulty: "hard",
    maxscore: 30,
    topic: "Functions and Modular Programming",
    subtopic: "Parameter Passing",
    inputconstrains: "0 <= gb <= 10000",
    sampleinput1: "120",
    sampleinput2: "30",
    input1: "150",
    input2: "200",
    input3: "151",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
using namespace std;

void computeLadder(int gb, double& slab1, double& slab2, double& slab3, double& total) {
    slab1 = 0.0;
    slab2 = 0.0;
    slab3 = 0.0;
    if (gb > 50) {
        slab1 = 50 * 2.50;
    } else {
        slab1 = gb * 2.50;
    }
    if (gb > 150) {
        slab2 = 100 * 4.00;
    } else if (gb > 50) {
        slab2 = (gb - 50) * 4.00;
    }
    if (gb > 150) {
        slab3 = (gb - 150) * 6.00;
    }
    total = slab1 + slab2 + slab3;
}

int main() {
    int gb;
    cin >> gb;
    double s1, s2, s3, total;
    computeLadder(gb, s1, s2, s3, total);
    cout << "Data: " << gb << " GB" << endl;
    cout << fixed << setprecision(2);
    cout << "Slab 1 (first 50): " << s1 << endl;
    cout << "Slab 2 (next 100): " << s2 << endl;
    cout << "Slab 3 (above 150): " << s3 << endl;
    cout << "Total: " << total << endl;
    return 0;
}`,
    blacklist: "printf, scanf, pow(",
    whitelist: "cin, cout, if, else, double, &",
  },
  {
    title: "Bank Transaction Classifier",
    description:
      "A bank teller terminal classifies each transaction and computes fees through one function. Define void classify(char type, double amount, string& label, double* fee) that sets label to Deposit for 'D' or Withdrawal for 'W' through the reference parameter, and stores the fee through the pointer: withdrawals of 10000.00 or more carry a fee of 0.5 percent of the amount, all other transactions are free. Read two transactions (type and amount each), classify both and print a receipt with the total fees.\n\nInput Format:\nOne line with four tokens: type1 (D or W), amount1, type2 (D or W), amount2.\n\nOutput Format:\nTXN 1: <label> of <amount, 2 decimals> (Fee: <fee, 2 decimals>)\nTXN 2: <label> of <amount, 2 decimals> (Fee: <fee, 2 decimals>)\nTotal fees: <sum of fees, 2 decimals>\n\nConstraints:\n1 <= each amount <= 1000000, type is D or W",
    difficulty: "hard",
    maxscore: 30,
    topic: "Functions and Modular Programming",
    subtopic: "Call by Address",
    inputconstrains: "1 <= each amount <= 1000000, type is D or W",
    sampleinput1: "D 5000 W 15000",
    sampleinput2: "W 9999 D 25000",
    input1: "W 10000 W 500",
    input2: "D 12345.5 D 1",
    input3: "W 25000.75 D 100",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
#include <string>
using namespace std;

void classify(char type, double amount, string& label, double* fee) {
    if (type == 'D') {
        label = "Deposit";
    } else {
        label = "Withdrawal";
    }
    if (type == 'W' && amount >= 10000.0) {
        *fee = amount * 0.005;
    } else {
        *fee = 0.0;
    }
}

int main() {
    char t1, t2;
    double a1, a2;
    string label1, label2;
    double fee1, fee2;
    cin >> t1 >> a1 >> t2 >> a2;
    classify(t1, a1, label1, &fee1);
    classify(t2, a2, label2, &fee2);
    cout << fixed << setprecision(2);
    cout << "TXN 1: " << label1 << " of " << a1 << " (Fee: " << fee1 << ")" << endl;
    cout << "TXN 2: " << label2 << " of " << a2 << " (Fee: " << fee2 << ")" << endl;
    cout << "Total fees: " << fee1 + fee2 << endl;
    return 0;
}`,
    blacklist: "printf, scanf",
    whitelist: "cin, cout, string, char, *, &",
  },
  {
    title: "Payroll Function Suite",
    description:
      "Month-end payroll runs as a suite of cooperating functions:\n- double grossSalary(double basic, double bonusPercent = 10) returns basic plus bonusPercent percent of basic (the default bonus is 10 percent)\n- double totalDeductions(double gross) returns 12 percent of gross\n- double netSalary(double gross, double deductions) returns gross minus deductions\n- void printSlip(string name, double net) prints one employee's slip\n- void printSlip(string name, double net, double bonusAmount) is an overloaded variant that also prints the bonus amount\nRead employee 1 (name and basic) and employee 2 (name, basic and an integer bonus percent). Process employee 1 with the default bonus using the two-parameter print overload; process employee 2 with the given bonus using the three-parameter print overload.\n\nInput Format:\nOne line with five tokens: name1 (single word), basic1 (double), name2 (single word), basic2 (double), bonus2 (integer percent).\n\nOutput Format:\nEmployee: <name1>\nNet pay: <net1, 2 decimals>\nEmployee: <name2>\nBonus: <bonus amount, 2 decimals>\nNet pay: <net2, 2 decimals>\n\nConstraints:\n1000 <= each basic <= 500000, 0 <= bonus2 <= 50",
    difficulty: "hard",
    maxscore: 30,
    topic: "Functions and Modular Programming",
    subtopic: "Function Overloading",
    inputconstrains: "1000 <= each basic <= 500000, 0 <= bonus2 <= 50",
    sampleinput1: "Asha 20000 Rohit 30000 20",
    sampleinput2: "Vijay 15000 Meera 25000 0",
    input1: "Sam 100000 Riya 48000 15",
    input2: "Om 9000 Guru 12000 5",
    input3: "Tara 12345.67 Arjun 54321 7",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
#include <string>
using namespace std;

double grossSalary(double basic, double bonusPercent = 10) {
    return basic + basic * bonusPercent / 100.0;
}

double totalDeductions(double gross) {
    return gross * 0.12;
}

double netSalary(double gross, double deductions) {
    return gross - deductions;
}

void printSlip(string name, double net) {
    cout << "Employee: " << name << endl;
    cout << "Net pay: " << net << endl;
}

void printSlip(string name, double net, double bonusAmount) {
    cout << "Employee: " << name << endl;
    cout << "Bonus: " << bonusAmount << endl;
    cout << "Net pay: " << net << endl;
}

int main() {
    string name1, name2;
    double basic1, basic2;
    int bonus2;
    cin >> name1 >> basic1 >> name2 >> basic2 >> bonus2;
    double gross1 = grossSalary(basic1);
    double net1 = netSalary(gross1, totalDeductions(gross1));
    double gross2 = grossSalary(basic2, bonus2);
    double net2 = netSalary(gross2, totalDeductions(gross2));
    cout << fixed << setprecision(2);
    printSlip(name1, net1);
    printSlip(name2, net2, basic2 * bonus2 / 100.0);
    return 0;
}`,
    blacklist: "printf, scanf, pow(",
    whitelist: "cin, cout, string, double, fixed",
  },
];

export const mcqs = [
  // ------------------------------------------------------------------ easy
  {
    title: "Function Prototype Purpose",
    description: "In C++, what does a function declaration (prototype) such as int add(int a, int b); tell the compiler?",
    difficulty: "easy",
    topic: "Functions and Modular Programming",
    subtopic: "Function Declaration and Definition",
    Option1: "The function's name, return type and parameter types, so the function can be called before its definition appears",
    Option2: "The complete body of the function",
    Option3: "The memory address where the function's local variables will be stored",
    Option4: "That the function cannot return any value",
    CorrectOption: 1,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Purpose of a Return Type",
    description: "What does the return type written before a function's name specify?",
    difficulty: "easy",
    topic: "Functions and Modular Programming",
    subtopic: "Return Values",
    Option1: "How many parameters the function accepts",
    Option2: "The name of the variable that receives the result",
    Option3: "The type of the value the function sends back to the caller",
    Option4: "Whether the function runs in a loop",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Meaning of void Return Type",
    description: "A function is declared as void printReport(). What does void indicate?",
    difficulty: "easy",
    topic: "Functions and Modular Programming",
    subtopic: "Return Values",
    Option1: "The function returns 0 by default",
    Option2: "The function returns no value to the caller",
    Option3: "The function has no parameters",
    Option4: "The function cannot be called from main",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Why Split Programs into Functions",
    description: "Which statement best explains how functions support modular programming?",
    difficulty: "easy",
    topic: "Functions and Modular Programming",
    subtopic: "Function Declaration and Definition",
    Option1: "They make the program compile slower but safer",
    Option2: "They force every variable to become global",
    Option3: "They remove the need for the main function",
    Option4: "They break a big task into smaller named units that can be written, tested and reused independently",
    CorrectOption: 4,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Scope of Variables Inside a Function",
    description: "A variable declared inside a function body (a local variable) is:",
    difficulty: "easy",
    topic: "Functions and Modular Programming",
    subtopic: "Function Declaration and Definition",
    Option1: "Visible to every function in the program",
    Option2: "Stored permanently between calls",
    Option3: "A global variable copy",
    Option4: "Local to that function and destroyed when the function ends",
    CorrectOption: 4,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Parameter vs Argument",
    description: "In the call int s = add(x, y); what are x and y called, and what are a and b in the definition int add(int a, int b)?",
    difficulty: "easy",
    topic: "Functions and Modular Programming",
    subtopic: "Parameter Passing",
    Option1: "x and y are parameters; a and b are arguments",
    Option2: "Both are called return values",
    Option3: "x and y are arguments in the call; a and b are parameters in the definition",
    Option4: "Both are global variables",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "What the return Statement Does",
    description: "What happens when a return statement executes inside a function?",
    difficulty: "easy",
    topic: "Functions and Modular Programming",
    subtopic: "Return Values",
    Option1: "The function restarts from its first line",
    Option2: "The whole program exits immediately in every case",
    Option3: "The function stops and sends the value back to the caller at the point of the call",
    Option4: "The value is printed on screen automatically",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Flow of a Function Call",
    description: "When main calls a function, what is the order of control flow?",
    difficulty: "easy",
    topic: "Functions and Modular Programming",
    subtopic: "Function Declaration and Definition",
    Option1: "The function body runs before main starts",
    Option2: "Control jumps to the function, its body runs, then control returns to the statement after the call",
    Option3: "Both main and the function run at the same time",
    Option4: "Control jumps to the function and never comes back",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Matching Arguments to Parameters",
    description: "A function is declared as int maxOfThree(int a, int b, int c). Which call supplies arguments that match the parameter list correctly?",
    difficulty: "easy",
    topic: "Functions and Modular Programming",
    subtopic: "Parameter Passing",
    Option1: "maxOfThree(4, 9);",
    Option2: "maxOfThree(4, 9, 2);",
    Option3: "maxOfThree();",
    Option4: "maxOfThree(4, 9, 2, 7);",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Return Type Must Match Usage",
    description: "double areaOfCircle(double r) returns a double. Which statement is true about the call double a = areaOfCircle(2.5);?",
    difficulty: "easy",
    topic: "Functions and Modular Programming",
    subtopic: "Return Values",
    Option1: "The call is illegal because functions cannot return doubles",
    Option2: "The value is returned only if cout is used inside the function",
    Option3: "a receives the address of the function",
    Option4: "The returned double value is stored in a",
    CorrectOption: 4,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },

  // ----------------------------------------------------------------- medium
  {
    title: "Call by Value Swap Prediction",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "Functions and Modular Programming",
    subtopic: "Call by Value",
    Option1: "8 3",
    Option2: "3 8",
    Option3: "8 8",
    Option4: "3 3",
    CorrectOption: 2,
    codesnippet: `#include <iostream>
using namespace std;
void trySwap(int a, int b) {
    int temp = a;
    a = b;
    b = temp;
}
int main() {
    int x = 3;
    int y = 8;
    trySwap(x, y);
    cout << x << " " << y;
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nvoid trySwap(int a, int b) {\n    int temp = a;\n    a = b;\n    b = temp;\n}\nint main() {\n    int x = 3;\n    int y = 8;\n    trySwap(x, y);\n    cout << x << " " << y;\n    return 0;\n}`,
      stdin: "",
      expected: "3 8",
    },
  },
  {
    title: "Pointer Parameter Changes Value",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "Functions and Modular Programming",
    subtopic: "Call by Address",
    Option1: "10",
    Option2: "5",
    Option3: "15",
    Option4: "Garbage value",
    CorrectOption: 3,
    codesnippet: `#include <iostream>
using namespace std;
void addFive(int* p) {
    *p = *p + 5;
}
int main() {
    int score = 10;
    addFive(&score);
    cout << score;
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nvoid addFive(int* p) {\n    *p = *p + 5;\n}\nint main() {\n    int score = 10;\n    addFive(&score);\n    cout << score;\n    return 0;\n}`,
      stdin: "",
      expected: "15",
    },
  },
  {
    title: "Default Argument Selection",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "Functions and Modular Programming",
    subtopic: "Default Arguments",
    Option1: "36 30",
    Option2: "30 30",
    Option3: "36 36",
    Option4: "36 12",
    CorrectOption: 1,
    codesnippet: `#include <iostream>
using namespace std;
double fare(double km, double ratePerKm = 12.0) {
    return km * ratePerKm;
}
int main() {
    cout << fare(3) << " " << fare(3, 10.0);
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\ndouble fare(double km, double ratePerKm = 12.0) {\n    return km * ratePerKm;\n}\nint main() {\n    cout << fare(3) << " " << fare(3, 10.0);\n    return 0;\n}`,
      stdin: "",
      expected: "36 30",
    },
  },
  {
    title: "Overload Picks by Parameter Type",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "Functions and Modular Programming",
    subtopic: "Function Overloading",
    Option1: "5 10",
    Option2: "10 5",
    Option3: "10 5.5",
    Option4: "10 10",
    CorrectOption: 2,
    codesnippet: `#include <iostream>
using namespace std;
int twice(int x) {
    return x * 2;
}
double twice(double x) {
    return x * 2;
}
int main() {
    int a = 5;
    double b = 2.5;
    cout << twice(a) << " " << twice(b);
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nint twice(int x) {\n    return x * 2;\n}\ndouble twice(double x) {\n    return x * 2;\n}\nint main() {\n    int a = 5;\n    double b = 2.5;\n    cout << twice(a) << " " << twice(b);\n    return 0;\n}`,
      stdin: "",
      expected: "10 5",
    },
  },
  {
    title: "Copies in Call by Value",
    description: "When a function receives an argument by value, what does it actually work with?",
    difficulty: "medium",
    topic: "Functions and Modular Programming",
    subtopic: "Call by Value",
    Option1: "A reference bound to the caller's variable",
    Option2: "The memory address of the caller's variable",
    Option3: "A separate copy of the argument's value, so changes inside the function never affect the caller",
    Option4: "The caller's variable itself under a new name",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Declare Before Use",
    description: "A helper function is defined below main in the same file and main calls it above the definition, with no prototype anywhere. What happens at compile time?",
    difficulty: "medium",
    topic: "Functions and Modular Programming",
    subtopic: "Function Declaration and Definition",
    Option1: "The compiler scans the whole file first, so it compiles without any declaration",
    Option2: "The function is automatically treated as returning void",
    Option3: "The call is skipped silently at runtime",
    Option4: "The compiler reports an error because the function is used before it is declared",
    CorrectOption: 4,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },

  // ------------------------------------------------------------------- hard
  {
    title: "Char Argument Meets Int and Double Overloads",
    description: "Passing a char into these two overloads follows well-defined promotion rules. What does this program print?",
    difficulty: "hard",
    topic: "Functions and Modular Programming",
    subtopic: "Function Overloading",
    Option1: "double A",
    Option2: "int 65",
    Option3: "double 65",
    Option4: "int A",
    CorrectOption: 2,
    codesnippet: `#include <iostream>
using namespace std;
void show(int x) {
    cout << "int " << x;
}
void show(double x) {
    cout << "double " << x;
}
int main() {
    char c = 'A';
    show(c);
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nvoid show(int x) {\n    cout << "int " << x;\n}\nvoid show(double x) {\n    cout << "double " << x;\n}\nint main() {\n    char c = 'A';\n    show(c);\n    return 0;\n}`,
      stdin: "",
      expected: "int 65",
    },
  },
  {
    title: "Reference Parameter Accumulates",
    description: "The same reference parameter is modified by two calls. What does this program print?",
    difficulty: "hard",
    topic: "Functions and Modular Programming",
    subtopic: "Call by Reference",
    Option1: "40",
    Option2: "50",
    Option3: "60",
    Option4: "10",
    CorrectOption: 3,
    codesnippet: `#include <iostream>
using namespace std;
void addBonus(int& score, int bonus) {
    score = score + bonus;
}
int main() {
    int score = 40;
    addBonus(score, 10);
    addBonus(score, 10);
    cout << score;
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nvoid addBonus(int& score, int bonus) {\n    score = score + bonus;\n}\nint main() {\n    int score = 40;\n    addBonus(score, 10);\n    addBonus(score, 10);\n    cout << score;\n    return 0;\n}`,
      stdin: "",
      expected: "60",
    },
  },
  {
    title: "Reference and Pointer Out-Params Together",
    description: "One function writes results through a reference parameter and a pointer parameter. What does this program print?",
    difficulty: "hard",
    topic: "Functions and Modular Programming",
    subtopic: "Parameter Passing",
    Option1: "14 6",
    Option2: "0 0",
    Option3: "-6 14",
    Option4: "14 -6",
    CorrectOption: 4,
    codesnippet: `#include <iostream>
using namespace std;
void analyze(int a, int b, int& sum, int* diff) {
    sum = a + b;
    *diff = a - b;
}
int main() {
    int s = 0;
    int d = 0;
    analyze(10, 4, s, &d);
    analyze(4, 10, s, &d);
    cout << s << " " << d;
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nvoid analyze(int a, int b, int& sum, int* diff) {\n    sum = a + b;\n    *diff = a - b;\n}\nint main() {\n    int s = 0;\n    int d = 0;\n    analyze(10, 4, s, &d);\n    analyze(4, 10, s, &d);\n    cout << s << " " << d;\n    return 0;\n}`,
      stdin: "",
      expected: "14 -6",
    },
  },
  {
    title: "Rightmost Rule for Default Arguments",
    description: "Which rule about default arguments in C++ is correct?",
    difficulty: "hard",
    topic: "Functions and Modular Programming",
    subtopic: "Default Arguments",
    Option1: "They may be given only to the rightmost parameters; once one parameter has a default, every parameter to its right must also have one",
    Option2: "They may be given to any single parameter, even the leftmost one alone",
    Option3: "They are permitted only inside void functions",
    Option4: "They change the function's return type to the type of the default value",
    CorrectOption: 1,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
];
