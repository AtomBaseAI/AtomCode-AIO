/**
 * OOPS using CPP — Day 1: Introduction to C++ / Basic Syntax and Data Types
 * 20 code questions (10 easy: 6 basics + 4 real-world, 6 medium, 4 hard)
 * 20 MCQs (10 easy, 6 medium, 4 hard)
 * All solutions are fresh C++ written for this course (no conversions).
 */
export const meta = {
  day: 1,
  topic: "Introduction to C++",
};

const B = "====================";

export const code = [
  // ------------------------------------------------------------------ easy
  {
    title: "My First C++ Greeting",
    description:
      "Every C++ journey starts with a structured program. Write a program that prints a three-line welcome banner exactly as shown.\n\nInput Format:\nNo input.\n\nOutput Format:\n====================\nHello from C++\nATOM CODE\n====================\n\nConstraints:\nNone.",
    difficulty: "easy",
    maxscore: 10,
    topic: "Introduction to C++",
    subtopic: "Structure of a C++ Program",
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

int main() {
    cout << "====================" << endl;
    cout << "Hello from C++" << endl;
    cout << "ATOM CODE" << endl;
    cout << "====================" << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Welcome Note Printer",
    description:
      "A workshop registration desk greets every participant with a printed note. Read the participant's name (a single word) and age (an integer), then print the note.\n\nInput Format:\nOne line with two tokens: name (single word) and age (integer).\n\nOutput Format:\nWelcome, <name>!\nAge group: <age>\n\nConstraints:\n1 <= age <= 100",
    difficulty: "easy",
    maxscore: 10,
    topic: "Introduction to C++",
    subtopic: "cin and cout",
    inputconstrains: "1 <= age <= 100",
    sampleinput1: "Arjun 21",
    sampleinput2: "Meera 18",
    input1: "Kiran 25",
    input2: "Zoya 19",
    input3: "Ravi 60",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string name;
    int age;
    cin >> name >> age;
    cout << "Welcome, " << name << "!" << endl;
    cout << "Age group: " << age << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Variable Value Mirror",
    description:
      "To understand how different data types are stored, read one integer, one double and one character, then print each with a label.\n\nInput Format:\nOne line with three tokens: an integer, a double and a single character separated by spaces.\n\nOutput Format:\nInteger: <int>\nDecimal: <double>\nSymbol: <char>\n\nConstraints:\n-1000 <= integer <= 1000, 0 <= double <= 9999",
    difficulty: "easy",
    maxscore: 10,
    topic: "Introduction to C++",
    subtopic: "Data Types",
    inputconstrains: "-1000 <= integer <= 1000, 0 <= double <= 9999",
    sampleinput1: "42 3.14 A",
    sampleinput2: "-7 0.5 z",
    input1: "100 99.99 K",
    input2: "0 123.456 #",
    input3: "-999 7.25 m",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int i;
    double d;
    char c;
    cin >> i >> d >> c;
    cout << "Integer: " << i << endl;
    cout << "Decimal: " << d << endl;
    cout << "Symbol: " << c << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Rectangle Area Calculator",
    description:
      "A civil drafting student measures a rectangular plot. Read the width and height in metres (integers) and print the area and the perimeter.\n\nInput Format:\nOne line with two integers: width and height.\n\nOutput Format:\nArea: <width * height>\nPerimeter: <2 * (width + height)>\n\nConstraints:\n1 <= width, height <= 10000",
    difficulty: "easy",
    maxscore: 10,
    topic: "Introduction to C++",
    subtopic: "Variables and Constants",
    inputconstrains: "1 <= width, height <= 10000",
    sampleinput1: "5 4",
    sampleinput2: "12 9",
    input1: "7 3",
    input2: "1 1",
    input3: "10000 10000",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int width, height;
    cin >> width >> height;
    cout << "Area: " << width * height << endl;
    cout << "Perimeter: " << 2 * (width + height) << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Circle Area with Constant PI",
    description:
      "Declare a constant PI = 3.14159 and use it to compute the area of a circle. Read the radius (an integer) and print the area rounded down to the nearest whole square unit.\n\nInput Format:\nOne line with one integer: radius.\n\nOutput Format:\nExact area: <PI * r * r>\nWhole area: <integer part of the area>\n\nConstraints:\n1 <= radius <= 1000",
    difficulty: "easy",
    maxscore: 10,
    topic: "Introduction to C++",
    subtopic: "Variables and Constants",
    inputconstrains: "1 <= radius <= 1000",
    sampleinput1: "5",
    sampleinput2: "1",
    input1: "10",
    input2: "7",
    input3: "100",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    const double PI = 3.14159;
    int radius;
    cin >> radius;
    double area = PI * radius * radius;
    cout << "Exact area: " << area << endl;
    cout << "Whole area: " << (int)area << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Character Echo Box",
    description:
      "Computers store characters as numbers. Read a single character and print it together with its integer (ASCII) code and the character that follows it in the ASCII table.\n\nInput Format:\nOne line with one character.\n\nOutput Format:\nChar: <c>\nCode: <ascii value>\nNext: <c + 1 as character>\n\nConstraints:\nInput character is a printable ASCII character (code 33 to 125).",
    difficulty: "easy",
    maxscore: 10,
    topic: "Introduction to C++",
    subtopic: "Data Types",
    inputconstrains: "33 <= ASCII code <= 125",
    sampleinput1: "A",
    sampleinput2: "k",
    input1: "7",
    input2: "!",
    input3: "~",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    char c;
    cin >> c;
    cout << "Char: " << c << endl;
    cout << "Code: " << (int)c << endl;
    cout << "Next: " << (char)(c + 1) << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Movie Ticket Total",
    description:
      "A cinema box office sells tickets at a fixed price each. Read the price of one ticket (integer rupees) and the number of tickets bought (integer), then print the amount payable.\n\nInput Format:\nOne line with two integers: ticket price and ticket count.\n\nOutput Format:\nTickets: <count>\nAmount payable: <price * count> rupees\n\nConstraints:\n1 <= ticket price <= 1000, 1 <= ticket count <= 50",
    difficulty: "easy",
    maxscore: 10,
    topic: "Introduction to C++",
    subtopic: "cin and cout",
    inputconstrains: "1 <= ticket price <= 1000, 1 <= ticket count <= 50",
    sampleinput1: "220 3",
    sampleinput2: "150 1",
    input1: "300 5",
    input2: "99 10",
    input3: "500 50",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int price, count;
    cin >> price >> count;
    cout << "Tickets: " << count << endl;
    cout << "Amount payable: " << price * count << " rupees" << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Cafeteria Bill",
    description:
      "The college cafeteria charges per plate. Read the price of one plate (integer rupees) and the number of plates ordered (integer). Print the bill with a 5 rupee packing charge added once.\n\nInput Format:\nOne line with two integers: plate price and plate count.\n\nOutput Format:\nFood total: <price * count>\nPacking: 5\nBill: <price * count + 5>\n\nConstraints:\n1 <= plate price <= 500, 1 <= plate count <= 100",
    difficulty: "easy",
    maxscore: 10,
    topic: "Introduction to C++",
    subtopic: "Variables and Constants",
    inputconstrains: "1 <= plate price <= 500, 1 <= plate count <= 100",
    sampleinput1: "60 2",
    sampleinput2: "45 10",
    input1: "80 3",
    input2: "25 4",
    input3: "500 1",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int price, count;
    cin >> price >> count;
    int food = price * count;
    cout << "Food total: " << food << endl;
    cout << "Packing: " << 5 << endl;
    cout << "Bill: " << food + 5 << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Temperature Converter",
    description:
      "A weather dashboard converts Celsius readings to Fahrenheit. Read the temperature in whole degrees Celsius and print the Fahrenheit value with one decimal place.\n\nInput Format:\nOne line with one integer: temperature in Celsius.\n\nOutput Format:\nCelsius: <c>\nFahrenheit: <F with exactly one decimal>\n\nConstraints:\n-100 <= Celsius <= 100",
    difficulty: "easy",
    maxscore: 10,
    topic: "Introduction to C++",
    subtopic: "Data Types",
    inputconstrains: "-100 <= Celsius <= 100",
    sampleinput1: "37",
    sampleinput2: "0",
    input1: "100",
    input2: "-40",
    input3: "25",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    int celsius;
    cin >> celsius;
    double f = celsius * 9.0 / 5.0 + 32.0;
    cout << "Celsius: " << celsius << endl;
    cout << fixed << setprecision(1) << "Fahrenheit: " << f << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Travel Cost Splitter",
    description:
      "Friends on a trip share the taxi fare equally. Read the total fare (integer rupees) and the number of friends (integer). Print the equal share each friend pays (integer division) and the remainder that the trip leader keeps.\n\nInput Format:\nOne line with two integers: total fare and friend count.\n\nOutput Format:\nEach pays: <fare / count>\nLeader keeps: <fare % count>\n\nConstraints:\n1 <= fare <= 100000, 1 <= count <= 20",
    difficulty: "easy",
    maxscore: 10,
    topic: "Introduction to C++",
    subtopic: "Variables and Constants",
    inputconstrains: "1 <= fare <= 100000, 1 <= count <= 20",
    sampleinput1: "1000 3",
    sampleinput2: "500 5",
    input1: "735 4",
    input2: "100 7",
    input3: "9999 2",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int fare, count;
    cin >> fare >> count;
    cout << "Each pays: " << fare / count << endl;
    cout << "Leader keeps: " << fare % count << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },

  // ----------------------------------------------------------------- medium
  {
    title: "Employee ID Card Formatter",
    description:
      "The HR system prints ID cards for new joiners. Read the employee name (single word), employee ID (integer) and department (single word), then print the card inside a border of '=' characters.\n\nInput Format:\nOne line with three tokens: name (single word), employee ID (integer), department (single word).\n\nOutput Format:\n====================\nEMPLOYEE CARD\nName: <name>\nID: <empId>\nDept: <dept>\n====================\n\nConstraints:\n1 <= employee ID <= 99999",
    difficulty: "medium",
    maxscore: 20,
    topic: "Introduction to C++",
    subtopic: "Structure of a C++ Program",
    inputconstrains: "1 <= employee ID <= 99999",
    sampleinput1: "Nila 4021 CSE",
    sampleinput2: "Vikram 107 ECE",
    input1: "Tara 55555 IT",
    input2: "Om 1 MECH",
    input3: "Dev 999 AIML",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string name, dept;
    int id;
    cin >> name >> id >> dept;
    cout << "====================" << endl;
    cout << "EMPLOYEE CARD" << endl;
    cout << "Name: " << name << endl;
    cout << "ID: " << id << endl;
    cout << "Dept: " << dept << endl;
    cout << "====================" << endl;
    return 0;
}`,
    blacklist: "printf",
    whitelist: "cin, cout, string",
  },
  {
    title: "Gym Membership Bill",
    description:
      "A fitness studio bills members for a plan. Read the number of months (integer), the monthly rate (integer rupees) and a one-time joining fee (integer rupees). Print the plan cost, the fee and the grand total.\n\nInput Format:\nOne line with three integers: months, monthly rate, joining fee.\n\nOutput Format:\nPlan cost: <months * rate>\nJoining fee: <fee>\nGrand total: <plan cost + fee>\n\nConstraints:\n1 <= months <= 36, 100 <= rate <= 20000, 0 <= fee <= 5000",
    difficulty: "medium",
    maxscore: 20,
    topic: "Introduction to C++",
    subtopic: "cin and cout",
    inputconstrains: "1 <= months <= 36, 100 <= rate <= 20000, 0 <= fee <= 5000",
    sampleinput1: "6 1200 500",
    sampleinput2: "12 900 0",
    input1: "1 2500 1000",
    input2: "36 100 5000",
    input3: "3 3333 777",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int months, rate, fee;
    cin >> months >> rate >> fee;
    int plan = months * rate;
    cout << "Plan cost: " << plan << endl;
    cout << "Joining fee: " << fee << endl;
    cout << "Grand total: " << plan + fee << endl;
    return 0;
}`,
    blacklist: "printf",
    whitelist: "cin, cout, int",
  },
  {
    title: "Petrol Pump Receipt",
    description:
      "A fuel station prints a receipt after refuelling. Read the litres delivered (a double) and the price per litre (a double). Print the litres, the rate and the amount payable, each with exactly two decimal places.\n\nInput Format:\nOne line with two doubles: litres and price per litre.\n\nOutput Format:\nLitres: <litres, 2 decimals>\nRate: <rate, 2 decimals>\nAmount: <litres * rate, 2 decimals>\n\nConstraints:\n0.5 <= litres <= 200, 50 <= rate <= 200",
    difficulty: "medium",
    maxscore: 20,
    topic: "Introduction to C++",
    subtopic: "Data Types",
    inputconstrains: "0.5 <= litres <= 200, 50 <= rate <= 200",
    sampleinput1: "12.5 108.5",
    sampleinput2: "3 94.2",
    input1: "40 105.75",
    input2: "0.5 200",
    input3: "123.45 99.99",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    double litres, rate;
    cin >> litres >> rate;
    cout << fixed << setprecision(2);
    cout << "Litres: " << litres << endl;
    cout << "Rate: " << rate << endl;
    cout << "Amount: " << litres * rate << endl;
    return 0;
}`,
    blacklist: "printf",
    whitelist: "cin, cout, fixed, setprecision",
  },
  {
    title: "Class Test Average",
    description:
      "A class mentor records three test scores for a student. Read the three integer scores and print the total, the exact average (double with two decimals) and the integer part of the average.\n\nInput Format:\nOne line with three integers: score1, score2, score3.\n\nOutput Format:\nTotal: <sum>\nAverage: <average with 2 decimals>\nRounded down: <integer part of average>\n\nConstraints:\n0 <= each score <= 100",
    difficulty: "medium",
    maxscore: 20,
    topic: "Introduction to C++",
    subtopic: "Variables and Constants",
    inputconstrains: "0 <= each score <= 100",
    sampleinput1: "80 90 85",
    sampleinput2: "0 100 50",
    input1: "99 99 100",
    input2: "10 20 30",
    input3: "0 0 0",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    int a, b, c;
    cin >> a >> b >> c;
    int total = a + b + c;
    double avg = total / 3.0;
    cout << "Total: " << total << endl;
    cout << fixed << setprecision(2) << "Average: " << avg << endl;
    cout << "Rounded down: " << (int)avg << endl;
    return 0;
}`,
    blacklist: "printf",
    whitelist: "cin, cout, double, static_cast",
  },
  {
    title: "Currency Note Split",
    description:
      "An ATM dispenses cash using the fewest notes of denominations 500, 100, 10 and 1. Read the withdrawal amount (an integer) and print how many notes of each denomination are handed over.\n\nInput Format:\nOne line with one integer: amount.\n\nOutput Format:\n500s: <count>\n100s: <count>\n10s: <count>\n1s: <count>\n\nConstraints:\n1 <= amount <= 100000",
    difficulty: "medium",
    maxscore: 20,
    topic: "Introduction to C++",
    subtopic: "Data Types",
    inputconstrains: "1 <= amount <= 100000",
    sampleinput1: "1732",
    sampleinput2: "500",
    input1: "9",
    input2: "99999",
    input3: "1234",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int amount;
    cin >> amount;
    int n500 = amount / 500;
    amount %= 500;
    int n100 = amount / 100;
    amount %= 100;
    int n10 = amount / 10;
    amount %= 10;
    int n1 = amount;
    cout << "500s: " << n500 << endl;
    cout << "100s: " << n100 << endl;
    cout << "10s: " << n10 << endl;
    cout << "1s: " << n1 << endl;
    return 0;
}`,
    blacklist: "printf, while, for",
    whitelist: "cin, cout, int",
  },
  {
    title: "Cafe Tip Calculator",
    description:
      "A cafe app adds a tip before settling the bill. Read the bill amount (double rupees) and the tip percentage (integer). Print the tip amount and the total, both with two decimal places, plus the whole-rupee total obtained by truncating the decimals.\n\nInput Format:\nOne line with a double and an integer: bill amount, tip percent.\n\nOutput Format:\nTip: <tip, 2 decimals>\nTotal: <bill + tip, 2 decimals>\nWhole rupees: <integer part of total>\n\nConstraints:\n1 <= bill <= 100000, 0 <= tip percent <= 50",
    difficulty: "medium",
    maxscore: 20,
    topic: "Introduction to C++",
    subtopic: "Variables and Constants",
    inputconstrains: "1 <= bill <= 100000, 0 <= tip percent <= 50",
    sampleinput1: "450.75 10",
    sampleinput2: "99.99 0",
    input1: "1200.50 15",
    input2: "1 50",
    input3: "875.25 5",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    double bill;
    int tipPercent;
    cin >> bill >> tipPercent;
    double tip = bill * tipPercent / 100.0;
    double total = bill + tip;
    cout << fixed << setprecision(2);
    cout << "Tip: " << tip << endl;
    cout << "Total: " << total << endl;
    cout << "Whole rupees: " << (int)total << endl;
    return 0;
}`,
    blacklist: "printf",
    whitelist: "cin, cout, static_cast, double",
  },

  // ------------------------------------------------------------------- hard
  {
    title: "Electricity Bill Engine",
    description:
      "A power distribution company charges domestic consumers by slab:\n- first 100 units at 3.50 rupees per unit\n- next 200 units (101 to 300) at 5.00 rupees per unit\n- units above 300 at 8.00 rupees per unit\nA fixed meter rent of 90 rupees is added, and an energy duty of 5 percent is charged on the energy charge (slab cost only).\nRead the units consumed (integer) and print the complete bill.\n\nInput Format:\nOne line with one integer: units consumed.\n\nOutput Format:\nUnits: <units>\nEnergy charge: <slab cost, 2 decimals>\nMeter rent: 90.00\nEnergy duty: <5% of energy charge, 2 decimals>\nTotal bill: <sum of all, 2 decimals>\n\nConstraints:\n0 <= units <= 10000",
    difficulty: "hard",
    maxscore: 30,
    topic: "Introduction to C++",
    subtopic: "Structure of a C++ Program",
    inputconstrains: "0 <= units <= 10000",
    sampleinput1: "150",
    sampleinput2: "0",
    input1: "100",
    input2: "450",
    input3: "10000",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    int units;
    cin >> units;
    double energy = 0.0;
    if (units <= 100) {
        energy = units * 3.50;
    } else if (units <= 300) {
        energy = 100 * 3.50 + (units - 100) * 5.00;
    } else {
        energy = 100 * 3.50 + 200 * 5.00 + (units - 300) * 8.00;
    }
    double rent = 90.0;
    double duty = energy * 0.05;
    double total = energy + rent + duty;
    cout << "Units: " << units << endl;
    cout << fixed << setprecision(2);
    cout << "Energy charge: " << energy << endl;
    cout << "Meter rent: " << rent << endl;
    cout << "Energy duty: " << duty << endl;
    cout << "Total bill: " << total << endl;
    return 0;
}`,
    blacklist: "printf, pow(",
    whitelist: "cin, cout, if, else, fixed",
  },
  {
    title: "Taxi Fare Meter",
    description:
      "A city taxi computes fares as follows:\n- base fare of 40 rupees covers the first 2 km\n- every additional km costs 15 rupees (fractional km in input means charge per complete km after the second, rounded down)\n- a night trip (flag 'Y') adds a 20 percent surcharge on the running fare (base + distance charge)\n- waiting time beyond 5 free minutes costs 2 rupees per minute\nRead the distance (double km), the night flag (a single character Y or N) and the waiting minutes (integer), then print the bill.\n\nInput Format:\nOne line with a double, a character and an integer separated by spaces: distance, night flag, waiting minutes.\n\nOutput Format:\nDistance km: <distance>\nBase fare: 40\nDistance charge: <charge>\nNight surcharge: <surcharge>\nWaiting charge: <charge>\nTotal: <grand total with 2 decimals>\n\nConstraints:\n0.0 <= distance <= 500, waiting minutes 0 to 120",
    difficulty: "hard",
    maxscore: 30,
    topic: "Introduction to C++",
    subtopic: "Compiling and Running",
    inputconstrains: "0.0 <= distance <= 500, 0 <= waiting <= 120",
    sampleinput1: "8.3 N 10",
    sampleinput2: "1.5 N 0",
    input1: "12.9 Y 25",
    input2: "2.0 Y 5",
    input3: "100.75 N 60",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    double distance;
    char night;
    int wait;
    cin >> distance >> night >> wait;
    double base = 40.0;
    double distanceCharge = 0.0;
    if (distance > 2.0) {
        int extraKm = (int)(distance - 2.0);
        distanceCharge = extraKm * 15.0;
    }
    double running = base + distanceCharge;
    double surcharge = 0.0;
    if (night == 'Y') {
        surcharge = running * 0.20;
    }
    double waitingCharge = 0.0;
    if (wait > 5) {
        waitingCharge = (wait - 5) * 2.0;
    }
    double total = running + surcharge + waitingCharge;
    cout << "Distance km: " << distance << endl;
    cout << "Base fare: 40" << endl;
    cout << "Distance charge: " << distanceCharge << endl;
    cout << "Night surcharge: " << surcharge << endl;
    cout << "Waiting charge: " << waitingCharge << endl;
    cout << fixed << setprecision(2) << "Total: " << total << endl;
    return 0;
}`,
    blacklist: "printf, pow(",
    whitelist: "cin, cout, if, else, char",
  },
  {
    title: "Payroll Slip Generator",
    description:
      "A startup payroll script produces a monthly slip. Read the employee name (single word) and basic salary (integer rupees). The components are:\n- HRA = 15% of basic\n- DA = 8% of basic\n- PF deduction = 12% of basic\n- gross = basic + HRA + DA\n- tax = 0 when basic is below 20000, otherwise 10% of (gross - PF)\n- net = gross - PF - tax\nPrint the full slip with every money component shown with two decimal places.\n\nInput Format:\nOne line with a name (single word) and an integer basic salary.\n\nOutput Format:\nPAYSLIP: <name>\nBasic: <basic, 2 decimals>\nHRA: <hra, 2 decimals>\nDA: <da, 2 decimals>\nGross: <gross, 2 decimals>\nPF: <pf, 2 decimals>\nTax: <tax, 2 decimals>\nNet pay: <net, 2 decimals>\n\nConstraints:\n1000 <= basic salary <= 500000",
    difficulty: "hard",
    maxscore: 30,
    topic: "Introduction to C++",
    subtopic: "Comments and Formatting",
    inputconstrains: "1000 <= basic salary <= 500000",
    sampleinput1: "Anita 25000",
    sampleinput2: "Rahul 15000",
    input1: "Zoya 500000",
    input2: "Vikas 20000",
    input3: "Meera 1000",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
#include <string>
using namespace std;

int main() {
    string name;
    int basic;
    cin >> name >> basic;
    double hra = basic * 0.15;
    double da = basic * 0.08;
    double pf = basic * 0.12;
    double gross = basic + hra + da;
    double taxBase = gross - pf;
    double tax = 0.0;
    if (basic >= 20000) {
        tax = taxBase * 0.10;
    }
    double net = gross - pf - tax;
    cout << "PAYSLIP: " << name << endl;
    cout << fixed << setprecision(2);
    cout << "Basic: " << (double)basic << endl;
    cout << "HRA: " << hra << endl;
    cout << "DA: " << da << endl;
    cout << "Gross: " << gross << endl;
    cout << "PF: " << pf << endl;
    cout << "Tax: " << tax << endl;
    cout << "Net pay: " << net << endl;
    return 0;
}`,
    blacklist: "printf, pow(",
    whitelist: "cin, cout, if, else, string, fixed",
  },
  {
    title: "Fuel Station Cashier",
    description:
      "A fuel pump cashier settles payment from a prepaid wallet. Read the fuel grade (single character P for petrol or D for diesel), the litres filled (double) and the wallet balance (double). Rates: petrol 108.50 per litre, diesel 94.20 per litre. Bulk discount: petrol gets 2 percent off the fuel value when at least 20 litres are filled; diesel gets 3 percent off when at least 30 litres are filled. The wallet pays the discounted amount; print the change that remains in the wallet.\n\nInput Format:\nOne line with a character, a double and a double: grade, litres, wallet balance.\n\nOutput Format:\nFuel: <P or D>\nRate: <rate, 2 decimals>\nFuel value: <value, 2 decimals>\nDiscount: <discount, 2 decimals>\nPayable: <value - discount, 2 decimals>\nWallet change: <balance - payable, 2 decimals>\n\nConstraints:\n0.5 <= litres <= 500, 0 <= wallet balance <= 1000000",
    difficulty: "hard",
    maxscore: 30,
    topic: "Introduction to C++",
    subtopic: "Data Types",
    inputconstrains: "0.5 <= litres <= 500, 0 <= wallet balance <= 1000000",
    sampleinput1: "P 25.5 5000",
    sampleinput2: "D 10 2000",
    input1: "D 40 10000",
    input2: "P 5 1000",
    input3: "D 30 4000.50",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    char grade;
    double litres, balance;
    cin >> grade >> litres >> balance;
    double rate;
    if (grade == 'P') {
        rate = 108.50;
    } else {
        rate = 94.20;
    }
    double value = litres * rate;
    double discount = 0.0;
    if (grade == 'P' && litres >= 20) {
        discount = value * 0.02;
    }
    if (grade == 'D' && litres >= 30) {
        discount = value * 0.03;
    }
    double payable = value - discount;
    double change = balance - payable;
    cout << "Fuel: " << grade << endl;
    cout << fixed << setprecision(2);
    cout << "Rate: " << rate << endl;
    cout << "Fuel value: " << value << endl;
    cout << "Discount: " << discount << endl;
    cout << "Payable: " << payable << endl;
    cout << "Wallet change: " << change << endl;
    return 0;
}`,
    blacklist: "printf, pow(",
    whitelist: "cin, cout, if, else, char, fixed",
  },
];

export const mcqs = [
  // ------------------------------------------------------------------ easy
  {
    title: "Creator of C++",
    description: "Who designed and first implemented the C++ language?",
    difficulty: "easy",
    topic: "Introduction to C++",
    subtopic: "History and Features",
    Option1: "Dennis Ritchie",
    Option2: "Bjarne Stroustrup",
    Option3: "James Gosling",
    Option4: "Guido van Rossum",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Original Name of C++",
    description: "Before it was named C++ in 1983, the language was originally called:",
    difficulty: "easy",
    topic: "Introduction to C++",
    subtopic: "History and Features",
    Option1: "Extended C",
    Option2: "C with Classes",
    Option3: "Object C",
    Option4: "Classical C",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Standard C++ Source File Extension",
    description: "Which file extension is conventionally used for C++ source files?",
    difficulty: "easy",
    topic: "Introduction to C++",
    subtopic: "Compiling and Running",
    Option1: ".c",
    Option2: ".cp",
    Option3: ".cpp",
    Option4: ".cxxs",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Statement Terminator in C++",
    description: "Which symbol terminates most C++ statements?",
    difficulty: "easy",
    topic: "Introduction to C++",
    subtopic: "Structure of a C++ Program",
    Option1: "Colon :",
    Option2: "Semicolon ;",
    Option3: "Period .",
    Option4: "Comma ,",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Purpose of iostream",
    description: "What does the header #include <iostream> provide?",
    difficulty: "easy",
    topic: "Introduction to C++",
    subtopic: "cin and cout",
    Option1: "Mathematical functions like sqrt",
    Option2: "File compression utilities",
    Option3: "Standard input and output streams",
    Option4: "String manipulation functions",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Role of cout",
    description: "In C++, cout is best described as:",
    difficulty: "easy",
    topic: "Introduction to C++",
    subtopic: "cin and cout",
    Option1: "An object that writes formatted data to the standard output stream",
    Option2: "A function that reads keyboard input",
    Option3: "A keyword that declares variables",
    Option4: "A directive that includes headers",
    CorrectOption: 1,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Valid Variable Declaration",
    description: "Which line correctly declares an integer variable named age with value 20?",
    difficulty: "easy",
    topic: "Introduction to C++",
    subtopic: "Variables and Constants",
    Option1: "int age = 20;",
    Option2: "age int = 20;",
    Option3: "integer age = 20;",
    Option4: "num age := 20;",
    CorrectOption: 1,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Not a C++ Data Type",
    description: "Which of the following is NOT a built-in C++ fundamental data type?",
    difficulty: "easy",
    topic: "Introduction to C++",
    subtopic: "Data Types",
    Option1: "int",
    Option2: "char",
    Option3: "real",
    Option4: "double",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "bool Type Values",
    description: "Which set of values can a bool variable hold in C++?",
    difficulty: "easy",
    topic: "Introduction to C++",
    subtopic: "Data Types",
    Option1: "0 to 255",
    Option2: "true and false",
    Option3: "'yes' and 'no'",
    Option4: "1 to 100",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Meaning of const",
    description: "What does the const keyword guarantee when used as in const double PI = 3.14159;?",
    difficulty: "easy",
    topic: "Introduction to C++",
    subtopic: "Variables and Constants",
    Option1: "The value cannot be modified after initialization",
    Option2: "The variable is stored on the heap",
    Option3: "The value is rounded to 2 decimals",
    Option4: "The variable becomes global",
    CorrectOption: 1,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },

  // ----------------------------------------------------------------- medium
  {
    title: "Integer Division Prediction",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "Introduction to C++",
    subtopic: "Data Types",
    Option1: "3",
    Option2: "3.5",
    Option3: "4",
    Option4: "2",
    CorrectOption: 1,
    codesnippet: `#include <iostream>
using namespace std;
int main() {
    cout << 7 / 2;
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nint main() {\n    cout << 7 / 2;\n    return 0;\n}`,
      stdin: "",
      expected: "3",
    },
  },
  {
    title: "Mixed Type Promotion",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "Introduction to C++",
    subtopic: "Data Types",
    Option1: "7",
    Option2: "7.5",
    Option3: "7.50",
    Option4: "Compile error",
    CorrectOption: 2,
    codesnippet: `#include <iostream>
using namespace std;
int main() {
    int a = 5;
    double b = 2.5;
    cout << a + b;
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nint main() {\n    int a = 5;\n    double b = 2.5;\n    cout << a + b;\n    return 0;\n}`,
      stdin: "",
      expected: "7.5",
    },
  },
  {
    title: "Character Code Arithmetic",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "Introduction to C++",
    subtopic: "Data Types",
    Option1: "B",
    Option2: "66",
    Option3: "65",
    Option4: "A1",
    CorrectOption: 2,
    codesnippet: `#include <iostream>
using namespace std;
int main() {
    char c = 'A';
    cout << c + 1;
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nint main() {\n    char c = 'A';\n    cout << c + 1;\n    return 0;\n}`,
      stdin: "",
      expected: "66",
    },
  },
  {
    title: "Escape Sequence Output",
    description: "What is the exact output of this program (spaces shown between tokens)?",
    difficulty: "medium",
    topic: "Introduction to C++",
    subtopic: "Comments and Formatting",
    Option1: "A B on one line, C on the next line",
    Option2: "A\\tB\\nC printed literally",
    Option3: "A B C all on one line",
    Option4: "Compile error",
    CorrectOption: 1,
    codesnippet: `#include <iostream>
using namespace std;
int main() {
    cout << "A\\tB\\nC";
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nint main() {\n    cout << "A\\tB\\nC";\n    return 0;\n}`,
      stdin: "",
      expected: "A\tB\nC",
    },
  },
  {
    title: "Modulo with Negative Operand",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "Introduction to C++",
    subtopic: "Data Types",
    Option1: "1",
    Option2: "-1",
    Option3: "2",
    Option4: "-2",
    CorrectOption: 2,
    codesnippet: `#include <iostream>
using namespace std;
int main() {
    cout << -7 % 3;
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nint main() {\n    cout << -7 % 3;\n    return 0;\n}`,
      stdin: "",
      expected: "-1",
    },
  },
  {
    title: "Extra Tokens Stay in Buffer",
    description: "The program below is run with the input line: 10 20 30\nWhat does it print?",
    difficulty: "medium",
    topic: "Introduction to C++",
    subtopic: "cin and cout",
    Option1: "60",
    Option2: "30",
    Option3: "50",
    Option4: "10",
    CorrectOption: 2,
    codesnippet: `#include <iostream>
using namespace std;
int main() {
    int a, b;
    cin >> a >> b;
    cout << a + b;
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nint main() {\n    int a, b;\n    cin >> a >> b;\n    cout << a + b;\n    return 0;\n}`,
      stdin: "10 20 30",
      expected: "30",
    },
  },

  // ------------------------------------------------------------------- hard
  {
    title: "Double to Int Truncation",
    description: "What does this program print?",
    difficulty: "hard",
    topic: "Introduction to C++",
    subtopic: "Data Types",
    Option1: "10",
    Option2: "9",
    Option3: "9.99",
    Option4: "Compile error",
    CorrectOption: 2,
    codesnippet: `#include <iostream>
using namespace std;
int main() {
    double x = 9.99;
    int y = x;
    cout << y;
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nint main() {\n    double x = 9.99;\n    int y = x;\n    cout << y;\n    return 0;\n}`,
      stdin: "",
      expected: "9",
    },
  },
  {
    title: "Unsigned Underflow Wrap",
    description: "What does this program print?",
    difficulty: "hard",
    topic: "Introduction to C++",
    subtopic: "Data Types",
    Option1: "-1",
    Option2: "0",
    Option3: "4294967295",
    Option4: "Compile error",
    CorrectOption: 3,
    codesnippet: `#include <iostream>
using namespace std;
int main() {
    unsigned int u = 0;
    u = u - 1;
    cout << u;
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nint main() {\n    unsigned int u = 0;\n    u = u - 1;\n    cout << u;\n    return 0;\n}`,
      stdin: "",
      expected: "4294967295",
    },
  },
  {
    title: "sizeof Float vs Double",
    description: "On a typical 64-bit compiler, what does this program print?",
    difficulty: "hard",
    topic: "Introduction to C++",
    subtopic: "Data Types",
    Option1: "88",
    Option2: "48",
    Option3: "84",
    Option4: "44",
    CorrectOption: 2,
    codesnippet: `#include <iostream>
using namespace std;
int main() {
    cout << sizeof(3.14f) << sizeof(3.14);
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nint main() {\n    cout << sizeof(3.14f) << sizeof(3.14);\n    return 0;\n}`,
      stdin: "",
      expected: "48",
    },
  },
  {
    title: "Signed vs Unsigned Comparison",
    description: "What does this program print? Think about how the signed value is converted during the comparison.",
    difficulty: "hard",
    topic: "Introduction to C++",
    subtopic: "Data Types",
    Option1: "1",
    Option2: "0",
    Option3: "-1",
    Option4: "Compile error",
    CorrectOption: 2,
    codesnippet: `#include <iostream>
using namespace std;
int main() {
    int x = -1;
    unsigned int y = 1;
    if (x < y)
        cout << 1;
    else
        cout << 0;
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nint main() {\n    int x = -1;\n    unsigned int y = 1;\n    if (x < y)\n        cout << 1;\n    else\n        cout << 0;\n    return 0;\n}`,
      stdin: "",
      expected: "0",
    },
  },
];
