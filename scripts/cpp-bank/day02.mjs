/**
 * OOPS using CPP — Day 2: Operators
 * 20 code questions (10 easy: 6 basics + 4 real-world, 6 medium, 4 hard)
 * 20 MCQs (10 easy, 6 medium, 4 hard)
 * All solutions are fresh C++ written for this course (no conversions).
 */
export const meta = {
  day: 2,
  topic: "Operators",
};

export const code = [
  // ------------------------------------------------------------------ easy
  {
    title: "Sum, Difference and Product Drill",
    description:
      "A maths lab warm-up applies the basic arithmetic operators. Read two integers a and b, then print their sum, their difference (a - b) and their product.\n\nInput Format:\nOne line with two integers a and b.\n\nOutput Format:\nSum: <a + b>\nDifference: <a - b>\nProduct: <a * b>\n\nConstraints:\n0 <= a, b <= 1000",
    difficulty: "easy",
    maxscore: 10,
    topic: "Operators",
    subtopic: "Arithmetic Operators",
    inputconstrains: "0 <= a, b <= 1000",
    sampleinput1: "12 5",
    sampleinput2: "100 45",
    input1: "0 0",
    input2: "999 1",
    input3: "250 750",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    cout << "Sum: " << a + b << endl;
    cout << "Difference: " << a - b << endl;
    cout << "Product: " << a * b << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Compound Assignment Ladder",
    description:
      "Compound assignment operators update a variable in place. Read two integers a and b, then apply the ladder of compound assignments shown below, printing the value of a after every step.\n\nInput Format:\nOne line with two integers a and b.\n\nOutput Format:\nAfter += : <a after a += b>\nAfter -= : <a after a -= b>\nAfter *= : <a after a *= b>\nAfter %= : <a after a %= b>\n\nConstraints:\n0 <= a <= 1000, 1 <= b <= 9",
    difficulty: "easy",
    maxscore: 10,
    topic: "Operators",
    subtopic: "Assignment Operators",
    inputconstrains: "0 <= a <= 1000, 1 <= b <= 9",
    sampleinput1: "10 3",
    sampleinput2: "7 5",
    input1: "0 4",
    input2: "50 7",
    input3: "100 9",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    a += b;
    cout << "After += : " << a << endl;
    a -= b;
    cout << "After -= : " << a << endl;
    a *= b;
    cout << "After *= : " << a << endl;
    a %= b;
    cout << "After %= : " << a << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Relational Signal Board",
    description:
      "A robot controller converts sensor comparisons into signal bits. Read two integers a and b and print the results of four relational comparisons, each displayed as 1 for true or 0 for false.\n\nInput Format:\nOne line with two integers a and b.\n\nOutput Format:\nA > B: <1 or 0>\nA < B: <1 or 0>\nA == B: <1 or 0>\nA != B: <1 or 0>\n\nConstraints:\n0 <= a, b <= 100",
    difficulty: "easy",
    maxscore: 10,
    topic: "Operators",
    subtopic: "Relational Operators",
    inputconstrains: "0 <= a, b <= 100",
    sampleinput1: "7 7",
    sampleinput2: "10 3",
    input1: "3 10",
    input2: "0 0",
    input3: "55 12",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    cout << "A > B: " << (a > b) << endl;
    cout << "A < B: " << (a < b) << endl;
    cout << "A == B: " << (a == b) << endl;
    cout << "A != B: " << (a != b) << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Bitwise Trio Probe",
    description:
      "Bitwise operators work on the individual bits of two integers. Read two non-negative integers a and b (each below 16) and print the results of bitwise AND, bitwise OR and bitwise XOR.\n\nInput Format:\nOne line with two integers a and b.\n\nOutput Format:\nAND: <a & b>\nOR: <a | b>\nXOR: <a ^ b>\n\nConstraints:\n0 <= a, b <= 15",
    difficulty: "easy",
    maxscore: 10,
    topic: "Operators",
    subtopic: "Bitwise Operators",
    inputconstrains: "0 <= a, b <= 15",
    sampleinput1: "12 10",
    sampleinput2: "5 3",
    input1: "0 0",
    input2: "15 15",
    input3: "9 6",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    cout << "AND: " << (a & b) << endl;
    cout << "OR: " << (a | b) << endl;
    cout << "XOR: " << (a ^ b) << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Counter Click Effects",
    description:
      "A counter chip responds to increment and decrement pulses. Read an integer n and apply the pulse sequence n++, ++n, n--, --n, each as a separate statement, printing the counter value after every pulse.\n\nInput Format:\nOne line with one integer n.\n\nOutput Format:\nStart: <n>\nAfter n++: <value>\nAfter ++n: <value>\nAfter n--: <value>\nAfter --n: <value>\n\nConstraints:\n0 <= n <= 100000",
    difficulty: "easy",
    maxscore: 10,
    topic: "Operators",
    subtopic: "Increment and Decrement",
    inputconstrains: "0 <= n <= 100000",
    sampleinput1: "10",
    sampleinput2: "0",
    input1: "99",
    input2: "1",
    input3: "100000",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    cout << "Start: " << n << endl;
    n++;
    cout << "After n++: " << n << endl;
    ++n;
    cout << "After ++n: " << n << endl;
    n--;
    cout << "After n--: " << n << endl;
    --n;
    cout << "After --n: " << n << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "sizeof Type Probe",
    description:
      "The sizeof operator reports how many bytes a type occupies. Write a program that prints the sizes of four fundamental types on a standard 64-bit compiler.\n\nInput Format:\nNo input.\n\nOutput Format:\nint: <sizeof(int)>\ndouble: <sizeof(double)>\nchar: <sizeof(char)>\nbool: <sizeof(bool)>\n\nConstraints:\nNone.",
    difficulty: "easy",
    maxscore: 10,
    topic: "Operators",
    subtopic: "sizeof Operator",
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
    cout << "int: " << sizeof(int) << endl;
    cout << "double: " << sizeof(double) << endl;
    cout << "char: " << sizeof(char) << endl;
    cout << "bool: " << sizeof(bool) << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Festival Sweet Box Packing",
    description:
      "During a temple festival, volunteers pack laddoos into gift boxes that hold exactly 6 laddoos each. Read the total number of laddoos prepared and report how many full boxes can be sealed and how many laddoos remain unpacked.\n\nInput Format:\nOne line with one integer: total laddoos.\n\nOutput Format:\nLaddoos: <total>\nFull boxes: <total / 6>\nLeftover laddoos: <total % 6>\n\nConstraints:\n0 <= total laddoos <= 10000",
    difficulty: "easy",
    maxscore: 10,
    topic: "Operators",
    subtopic: "Arithmetic Operators",
    inputconstrains: "0 <= total laddoos <= 10000",
    sampleinput1: "25",
    sampleinput2: "6",
    input1: "0",
    input2: "10000",
    input3: "7",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int total;
    cin >> total;
    cout << "Laddoos: " << total << endl;
    cout << "Full boxes: " << total / 6 << endl;
    cout << "Leftover laddoos: " << total % 6 << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Hostel Mess Bill Split",
    description:
      "Hostel roommates settle a weekly mess bill. The total (integer rupees) is divided equally among all roommates; the remainder that cannot be split is added to the organiser's share. Read the total bill and the number of roommates, then print the equal share and the organiser's share.\n\nInput Format:\nOne line with two integers: total bill and number of roommates.\n\nOutput Format:\nTotal bill: <total>\nEach pays: <total / roommates>\nOrganiser pays: <total / roommates + total % roommates>\n\nConstraints:\n0 <= total <= 100000, 1 <= roommates <= 20",
    difficulty: "easy",
    maxscore: 10,
    topic: "Operators",
    subtopic: "Arithmetic Operators",
    inputconstrains: "0 <= total <= 100000, 1 <= roommates <= 20",
    sampleinput1: "1000 3",
    sampleinput2: "500 5",
    input1: "1 4",
    input2: "9999 2",
    input3: "0 7",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int total, roommates;
    cin >> total >> roommates;
    cout << "Total bill: " << total << endl;
    cout << "Each pays: " << total / roommates << endl;
    cout << "Organiser pays: " << total / roommates + total % roommates << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Scholarship Eligibility Check",
    description:
      "The scholarship cell applies one combined rule: a student is eligible only when marks are at least 80 AND attendance is at least 75 percent. Read the marks and the attendance percent and print each condition separately plus the combined decision, every result shown as 1 or 0.\n\nInput Format:\nOne line with two integers: marks and attendance percent.\n\nOutput Format:\nMarks OK: <marks >= 80 as 1 or 0>\nAttendance OK: <attendance >= 75 as 1 or 0>\nEligible: <marks >= 80 && attendance >= 75 as 1 or 0>\n\nConstraints:\n0 <= marks <= 100, 0 <= attendance <= 100",
    difficulty: "easy",
    maxscore: 10,
    topic: "Operators",
    subtopic: "Logical Operators",
    inputconstrains: "0 <= marks <= 100, 0 <= attendance <= 100",
    sampleinput1: "85 80",
    sampleinput2: "90 60",
    input1: "79 75",
    input2: "80 74",
    input3: "100 100",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int marks, attendance;
    cin >> marks >> attendance;
    cout << "Marks OK: " << (marks >= 80) << endl;
    cout << "Attendance OK: " << (attendance >= 75) << endl;
    cout << "Eligible: " << (marks >= 80 && attendance >= 75) << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Device Toggle with XOR",
    description:
      "A smart bulb changes state every time it is toggled. XOR-ing the state bit with 1 flips it, and doing that an even number of times brings it back to the start. Read the initial state (0 or 1) and the number of toggles, then report the final state using bitwise XOR.\n\nInput Format:\nOne line with two integers: initial state (0 or 1) and number of toggles.\n\nOutput Format:\nBefore: <state>\nToggles: <k>\nAfter: <state ^ (k % 2)>\n\nConstraints:\n0 <= state <= 1, 0 <= k <= 100",
    difficulty: "easy",
    maxscore: 10,
    topic: "Operators",
    subtopic: "Bitwise Operators",
    inputconstrains: "0 <= state <= 1, 0 <= k <= 100",
    sampleinput1: "0 3",
    sampleinput2: "1 2",
    input1: "0 4",
    input2: "1 7",
    input3: "0 100",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int state, k;
    cin >> state >> k;
    cout << "Before: " << state << endl;
    cout << "Toggles: " << k << endl;
    cout << "After: " << (state ^ (k % 2)) << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },

  // ----------------------------------------------------------------- medium
  {
    title: "Cycling Speed Tracker",
    description:
      "A cycling app logs a ride and computes speed. Read the distance in metres (integer) and the duration in seconds (integer). Speed in m/s is distance divided by time computed as a double, and speed in km/h is the m/s value multiplied by 3.6. Print both speeds with exactly two decimal places.\n\nInput Format:\nOne line with two integers: distance in metres and time in seconds.\n\nOutput Format:\nDistance m: <distance>\nTime s: <time>\nSpeed m/s: <distance / time as double, 2 decimals>\nSpeed km/h: <m/s value * 3.6, 2 decimals>\n\nConstraints:\n100 <= distance <= 100000, 10 <= time <= 36000",
    difficulty: "medium",
    maxscore: 20,
    topic: "Operators",
    subtopic: "Arithmetic Operators",
    inputconstrains: "100 <= distance <= 100000, 10 <= time <= 36000",
    sampleinput1: "1000 60",
    sampleinput2: "5000 1200",
    input1: "42195 7200",
    input2: "100 10",
    input3: "12345 3599",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    int distance, secs;
    cin >> distance >> secs;
    double ms = (double)distance / secs;
    double kmh = ms * 3.6;
    cout << "Distance m: " << distance << endl;
    cout << "Time s: " << secs << endl;
    cout << fixed << setprecision(2);
    cout << "Speed m/s: " << ms << endl;
    cout << "Speed km/h: " << kmh << endl;
    return 0;
}`,
    blacklist: "printf",
    whitelist: "cin, cout, double, fixed, setprecision",
  },
  {
    title: "Feet and Inches Height Split",
    description:
      "A sports scientist stores height in centimetres but reports it in feet and inches. Read the height in centimetres (a double). Total inches = cm / 2.54. Whole feet = the integer part of total inches divided by 12, obtained with an explicit cast to int. Extra inches = total inches minus the whole feet converted back to inches. Print the values with two decimal places where marked.\n\nInput Format:\nOne line with one double: height in centimetres.\n\nOutput Format:\nHeight cm: <cm, 2 decimals>\nTotal inches: <cm / 2.54, 2 decimals>\nFeet: <(int)(total inches / 12)>\nExtra inches: <total inches - feet * 12, 2 decimals>\n\nConstraints:\n30 <= height <= 250",
    difficulty: "medium",
    maxscore: 20,
    topic: "Operators",
    subtopic: "Type Casting",
    inputconstrains: "30 <= height <= 250",
    sampleinput1: "170",
    sampleinput2: "60",
    input1: "180",
    input2: "100",
    input3: "249.5",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    double cm;
    cin >> cm;
    double totalInches = cm / 2.54;
    int feet = (int)(totalInches / 12);
    double extra = totalInches - feet * 12;
    cout << fixed << setprecision(2);
    cout << "Height cm: " << cm << endl;
    cout << "Total inches: " << totalInches << endl;
    cout << "Feet: " << feet << endl;
    cout << "Extra inches: " << extra << endl;
    return 0;
}`,
    blacklist: "printf, round(",
    whitelist: "cin, cout, double, int, fixed, setprecision",
  },
  {
    title: "Water Tank Alert System",
    description:
      "An apartment water tank has a level sensor. Read the current level (integer litres) and the tank capacity (integer litres). Compute the fill percent using integer arithmetic: level * 100 / capacity. Use the conditional (ternary) operator to choose the alert text: REFILL NOW when the percent is below 20, otherwise LEVEL OK. Also compute the litres needed to fill the tank and the pump minutes, where the pump moves 50 litres per minute and a part-minute counts as a full minute (use the ternary operator for that rounding too).\n\nInput Format:\nOne line with two integers: current level and capacity.\n\nOutput Format:\nLevel: <level>\nCapacity: <capacity>\nPercent: <level * 100 / capacity>\nStatus: <REFILL NOW or LEVEL OK>\nLitres to fill: <capacity - level>\nPump minutes: <needed / 50, plus 1 more when needed % 50 is not 0>\n\nConstraints:\n0 <= level <= capacity <= 10000",
    difficulty: "medium",
    maxscore: 20,
    topic: "Operators",
    subtopic: "Ternary Operator",
    inputconstrains: "0 <= level <= capacity <= 10000",
    sampleinput1: "500 2000",
    sampleinput2: "100 1000",
    input1: "0 500",
    input2: "5000 5000",
    input3: "199 1000",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int level, capacity;
    cin >> level >> capacity;
    int percent = level * 100 / capacity;
    int needed = capacity - level;
    int minutes = needed / 50 + (needed % 50 != 0 ? 1 : 0);
    cout << "Level: " << level << endl;
    cout << "Capacity: " << capacity << endl;
    cout << "Percent: " << percent << endl;
    cout << "Status: " << (percent < 20 ? "REFILL NOW" : "LEVEL OK") << endl;
    cout << "Litres to fill: " << needed << endl;
    cout << "Pump minutes: " << minutes << endl;
    return 0;
}`,
    blacklist: "printf, if, else",
    whitelist: "cin, cout, int",
  },
  {
    title: "Turnstile Visitor Counter",
    description:
      "An expo entrance logs every gate event on a turnstile counter. Read the visitor count at opening time, then replay the day's events in order: a group of 45 arrives, then one visitor walks in, then a VIP walks in, then one visitor leaves, then another visitor leaves. Apply each event with the arithmetic or increment/decrement operator shown and print the counter after every event.\n\nInput Format:\nOne line with one integer: visitors at opening.\n\nOutput Format:\nDoors open: <n>\nGroup arrived: <n + 45>\nOne more entered: <after count++>\nAnother entered: <after ++count>\nOne left: <after count-->\nAnother left: <after --count>\n\nConstraints:\n0 <= visitors at opening <= 50000",
    difficulty: "medium",
    maxscore: 20,
    topic: "Operators",
    subtopic: "Increment and Decrement",
    inputconstrains: "0 <= visitors at opening <= 50000",
    sampleinput1: "100",
    sampleinput2: "0",
    input1: "250",
    input2: "1",
    input3: "49999",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int count;
    cin >> count;
    cout << "Doors open: " << count << endl;
    count = count + 45;
    cout << "Group arrived: " << count << endl;
    count++;
    cout << "One more entered: " << count << endl;
    ++count;
    cout << "Another entered: " << count << endl;
    count--;
    cout << "One left: " << count << endl;
    --count;
    cout << "Another left: " << count << endl;
    return 0;
}`,
    blacklist: "printf",
    whitelist: "cin, cout, int",
  },
  {
    title: "Marathon Gate Eligibility",
    description:
      "A city marathon applies logical rules at the bib collection gate. Read the runner's age (integer), whether the registration is complete (1 or 0) and whether a medical certificate was uploaded (1 or 0). Full marathon requires age at least 18 AND registration complete AND medical uploaded. Half marathon requires age at least 14 AND registration complete. Print each result as 1 or 0, and print 1 when the runner is denied both races (NOT half-marathon-eligible).\n\nInput Format:\nOne line with three integers: age, registration flag, medical flag.\n\nOutput Format:\nAge: <age>\nRegistered: <flag>\nMedical: <flag>\nFull marathon: <1 or 0>\nHalf marathon: <1 or 0>\nDenied both: <1 or 0>\n\nConstraints:\n10 <= age <= 90, flags are 0 or 1",
    difficulty: "medium",
    maxscore: 20,
    topic: "Operators",
    subtopic: "Logical Operators",
    inputconstrains: "10 <= age <= 90, flags are 0 or 1",
    sampleinput1: "20 1 1",
    sampleinput2: "16 1 0",
    input1: "12 0 0",
    input2: "18 1 0",
    input3: "45 1 1",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int age, reg, med;
    cin >> age >> reg >> med;
    bool full = (age >= 18) && (reg == 1) && (med == 1);
    bool half = (age >= 14) && (reg == 1);
    bool denied = !half;
    cout << "Age: " << age << endl;
    cout << "Registered: " << reg << endl;
    cout << "Medical: " << med << endl;
    cout << "Full marathon: " << full << endl;
    cout << "Half marathon: " << half << endl;
    cout << "Denied both: " << denied << endl;
    return 0;
}`,
    blacklist: "printf",
    whitelist: "cin, cout, bool",
  },
  {
    title: "Smart Switch Bit Panel",
    description:
      "A smart panel packs four light switches into the bits of one byte: bit 0 drives light 0, bit 1 drives light 1, bit 2 drives light 2 and bit 3 drives light 3. Read the panel value p (0 to 15). Print each light state by shifting and masking, then print the panel value after these operations: turn all lights on (OR with 15), force light 2 on (OR with 4), toggle light 1 (XOR with 2) and turn light 0 off (AND with 14).\n\nInput Format:\nOne line with one integer p.\n\nOutput Format:\nPanel: <p>\nLight 0: <(p >> 0) & 1>\nLight 1: <(p >> 1) & 1>\nLight 2: <(p >> 2) & 1>\nLight 3: <(p >> 3) & 1>\nTurn all on: <p | 15>\nTurn light 2 on: <p | 4>\nToggle light 1: <p ^ 2>\nTurn light 0 off: <p & 14>\n\nConstraints:\n0 <= p <= 15",
    difficulty: "medium",
    maxscore: 20,
    topic: "Operators",
    subtopic: "Bitwise Operators",
    inputconstrains: "0 <= p <= 15",
    sampleinput1: "5",
    sampleinput2: "10",
    input1: "0",
    input2: "15",
    input3: "7",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int p;
    cin >> p;
    cout << "Panel: " << p << endl;
    cout << "Light 0: " << ((p >> 0) & 1) << endl;
    cout << "Light 1: " << ((p >> 1) & 1) << endl;
    cout << "Light 2: " << ((p >> 2) & 1) << endl;
    cout << "Light 3: " << ((p >> 3) & 1) << endl;
    cout << "Turn all on: " << (p | 15) << endl;
    cout << "Turn light 2 on: " << (p | 4) << endl;
    cout << "Toggle light 1: " << (p ^ 2) << endl;
    cout << "Turn light 0 off: " << (p & 14) << endl;
    return 0;
}`,
    blacklist: "printf",
    whitelist: "cin, cout, int",
  },

  // ------------------------------------------------------------------- hard
  {
    title: "Warehouse Carton Billing Engine",
    description:
      "A hardware distributor ships memory cards in three package tiers: cartons of 100 units, boxes of 10 units and single packets. Prices: a carton costs 850 rupees, a box costs 90 rupees and a single packet costs 12 rupees. Read the number of units ordered. Break the order into cartons, boxes and singles using / and %, compute the base bill, grant a 5 percent discount on the base bill when the order reaches 500 units or more, then add 18 percent GST on the amount after discount. Print the full bill with money values shown to two decimals.\n\nInput Format:\nOne line with one integer: units ordered.\n\nOutput Format:\nUnits: <units>\nCartons: <count of cartons>\nBoxes: <count of boxes>\nSingles: <count of singles>\nBase bill: <base, 2 decimals>\nDiscount: <discount, 2 decimals>\nGST 18%: <gst, 2 decimals>\nTotal payable: <total, 2 decimals>\n\nConstraints:\n1 <= units <= 100000",
    difficulty: "hard",
    maxscore: 30,
    topic: "Operators",
    subtopic: "Arithmetic Operators",
    inputconstrains: "1 <= units <= 100000",
    sampleinput1: "425",
    sampleinput2: "750",
    input1: "1",
    input2: "500",
    input3: "100000",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    int units;
    cin >> units;
    int rem = units;
    int cartons = rem / 100;
    rem %= 100;
    int boxes = rem / 10;
    int singles = rem % 10;
    double base = cartons * 850.0 + boxes * 90.0 + singles * 12.0;
    double discount = 0.0;
    if (units >= 500) {
        discount = base * 0.05;
    }
    double afterDiscount = base - discount;
    double gst = afterDiscount * 0.18;
    double total = afterDiscount + gst;
    cout << "Units: " << units << endl;
    cout << "Cartons: " << cartons << endl;
    cout << "Boxes: " << boxes << endl;
    cout << "Singles: " << singles << endl;
    cout << fixed << setprecision(2);
    cout << "Base bill: " << base << endl;
    cout << "Discount: " << discount << endl;
    cout << "GST 18%: " << gst << endl;
    cout << "Total payable: " << total << endl;
    return 0;
}`,
    blacklist: "printf, pow(",
    whitelist: "cin, cout, if, else, fixed, setprecision",
  },
  {
    title: "File Permission Bitmask Calculator",
    description:
      "Unix-style file permissions for a config file are stored in one octal digit: read is worth 4, write is worth 2 and execute is worth 1. Read the permission code p (0 to 7). Extract each permission bit with shift and mask, print Yes or No for the actions view, edit and run, then print the new permission code for three operations: grant write (p | 2), revoke read (p & ~4) and grant execute (p | 1). Finally classify the code: FULL CONTROL when p is 7, LOCKED when p is 0, otherwise PARTIAL.\n\nInput Format:\nOne line with one integer p.\n\nOutput Format:\nPermission code: <p>\nRead bit: <(p >> 2) & 1>\nWrite bit: <(p >> 1) & 1>\nExecute bit: <p & 1>\nCan view: <Yes or No>\nCan edit: <Yes or No>\nCan run: <Yes or No>\nGrant write: <p | 2>\nRevoke read: <p & ~4>\nGrant execute: <p | 1>\nClass: <FULL CONTROL, LOCKED or PARTIAL>\n\nConstraints:\n0 <= p <= 7",
    difficulty: "hard",
    maxscore: 30,
    topic: "Operators",
    subtopic: "Bitwise Operators",
    inputconstrains: "0 <= p <= 7",
    sampleinput1: "6",
    sampleinput2: "0",
    input1: "7",
    input2: "4",
    input3: "1",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int p;
    cin >> p;
    cout << "Permission code: " << p << endl;
    cout << "Read bit: " << ((p >> 2) & 1) << endl;
    cout << "Write bit: " << ((p >> 1) & 1) << endl;
    cout << "Execute bit: " << (p & 1) << endl;
    cout << "Can view: " << ((p & 4) != 0 ? "Yes" : "No") << endl;
    cout << "Can edit: " << ((p & 2) != 0 ? "Yes" : "No") << endl;
    cout << "Can run: " << ((p & 1) != 0 ? "Yes" : "No") << endl;
    cout << "Grant write: " << (p | 2) << endl;
    cout << "Revoke read: " << (p & ~4) << endl;
    cout << "Grant execute: " << (p | 1) << endl;
    if (p == 7) {
        cout << "Class: FULL CONTROL" << endl;
    } else if (p == 0) {
        cout << "Class: LOCKED" << endl;
    } else {
        cout << "Class: PARTIAL" << endl;
    }
    return 0;
}`,
    blacklist: "printf, pow(",
    whitelist: "cin, cout, if, else",
  },
  {
    title: "Unit Converter Chain",
    description:
      "A trekking logger converts one distance reading through a whole unit chain. Read the distance in metres (a double). Use these exact formulas: kilometres = metres / 1000, miles = metres / 1609.344, feet = metres * 3.28084, inches = feet * 12. Whole feet = the integer part of feet obtained with an explicit cast to int, and leftover inches = (feet - whole feet) * 12. Print every line with two decimal places except the whole feet line, which is a plain integer.\n\nInput Format:\nOne line with one double: metres.\n\nOutput Format:\nMetres: <m, 2 decimals>\nKilometres: <m / 1000, 2 decimals>\nMiles: <m / 1609.344, 2 decimals>\nFeet: <m * 3.28084, 2 decimals>\nInches: <feet * 12, 2 decimals>\nWhole feet: <(int)feet>\nLeftover inches: <(feet - whole feet) * 12, 2 decimals>\n\nConstraints:\n1 <= metres <= 100000",
    difficulty: "hard",
    maxscore: 30,
    topic: "Operators",
    subtopic: "Type Casting",
    inputconstrains: "1 <= metres <= 100000",
    sampleinput1: "400",
    sampleinput2: "1",
    input1: "42195",
    input2: "1000",
    input3: "2.5",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    double metres;
    cin >> metres;
    double km = metres / 1000.0;
    double miles = metres / 1609.344;
    double feet = metres * 3.28084;
    double inches = feet * 12.0;
    int wholeFeet = (int)feet;
    double leftover = (feet - wholeFeet) * 12.0;
    cout << fixed << setprecision(2);
    cout << "Metres: " << metres << endl;
    cout << "Kilometres: " << km << endl;
    cout << "Miles: " << miles << endl;
    cout << "Feet: " << feet << endl;
    cout << "Inches: " << inches << endl;
    cout << "Whole feet: " << wholeFeet << endl;
    cout << "Leftover inches: " << leftover << endl;
    return 0;
}`,
    blacklist: "printf, round(",
    whitelist: "cin, cout, double, int, fixed, setprecision",
  },
  {
    title: "Rocket Altitude Precedence Trace",
    description:
      "A rocketry club validates the classic height formula h = v0 * t - g / 2 * t * t with g = 10 before trusting its flight computer. Because C++ evaluates * and / before - and resolves same-precedence operators left to right, the expression g / 2 * t * t means ((g / 2) * t) * t. Read the launch speed v0 and the flight time t (integers), print every intermediate step exactly as computed, then classify the flight and print the theoretical apex height v0 * v0 / 20 as a double with two decimals.\n\nInput Format:\nOne line with two integers: v0 and t.\n\nOutput Format:\nv0: <v0>\nt: <t>\nStep 1 (v0 * t): <product>\nStep 2 (t * t): <square>\nStep 3 (g / 2 * t * t): <10 / 2 * t * t>\nStep 4 (height): <step1 - step3>\nStatus: <AIRBORNE when height > 0, LAUNCH POINT when height == 0, LANDED when height < 0>\nApex height: <v0 * v0 / 20.0, 2 decimals>\n\nConstraints:\n0 <= v0 <= 500, 0 <= t <= 60",
    difficulty: "hard",
    maxscore: 30,
    topic: "Operators",
    subtopic: "Operator Precedence",
    inputconstrains: "0 <= v0 <= 500, 0 <= t <= 60",
    sampleinput1: "50 3",
    sampleinput2: "10 2",
    input1: "0 5",
    input2: "100 12",
    input3: "5 1",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    int v0, t;
    cin >> v0 >> t;
    int step1 = v0 * t;
    int step2 = t * t;
    int step3 = 10 / 2 * t * t;
    int height = step1 - step3;
    cout << "v0: " << v0 << endl;
    cout << "t: " << t << endl;
    cout << "Step 1 (v0 * t): " << step1 << endl;
    cout << "Step 2 (t * t): " << step2 << endl;
    cout << "Step 3 (g / 2 * t * t): " << step3 << endl;
    cout << "Step 4 (height): " << height << endl;
    if (height > 0) {
        cout << "Status: AIRBORNE" << endl;
    } else if (height == 0) {
        cout << "Status: LAUNCH POINT" << endl;
    } else {
        cout << "Status: LANDED" << endl;
    }
    double apex = v0 * v0 / 20.0;
    cout << fixed << setprecision(2);
    cout << "Apex height: " << apex << endl;
    return 0;
}`,
    blacklist: "printf, pow(",
    whitelist: "cin, cout, if, else, fixed, setprecision",
  },
];

export const mcqs = [
  // ------------------------------------------------------------------ easy
  {
    title: "Modulo Operator Meaning",
    description: "What does the % (modulo) operator compute when used between two integers?",
    difficulty: "easy",
    topic: "Operators",
    subtopic: "Arithmetic Operators",
    Option1: "The quotient after dividing the left value by the right value",
    Option2: "The left value raised to the power of the right value",
    Option3: "The remainder after dividing the left value by the right value",
    Option4: "The percentage of the left value relative to the right value",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Integer Division Truncation Rule",
    description: "If a and b are int variables holding 9 and 2, what is the value of a / b in C++?",
    difficulty: "easy",
    topic: "Operators",
    subtopic: "Arithmetic Operators",
    Option1: "4.5",
    Option2: "5",
    Option3: "1",
    Option4: "4",
    CorrectOption: 4,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Star Before Plus Precedence",
    description: "What is the value of the expression 2 + 3 * 4 in C++?",
    difficulty: "easy",
    topic: "Operators",
    subtopic: "Operator Precedence",
    Option1: "20",
    Option2: "14",
    Option3: "10",
    Option4: "24",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Printing a Boolean Comparison",
    description: "What does the statement cout << (5 > 3); display on the console?",
    difficulty: "easy",
    topic: "Operators",
    subtopic: "Relational Operators",
    Option1: "false",
    Option2: "0",
    Option3: "5 > 3",
    Option4: "1",
    CorrectOption: 4,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Preincrement Versus Postincrement",
    description: "Which statement correctly describes ++i compared with i++?",
    difficulty: "easy",
    topic: "Operators",
    subtopic: "Increment and Decrement",
    Option1: "++i increments after the current value has been used",
    Option2: "Both always behave identically in every context",
    Option3: "++i increments first and yields the new value, while i++ yields the old value before incrementing",
    Option4: "i++ cannot appear inside a larger expression",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Logical AND Result Check",
    description: "What is the value of the expression true && false?",
    difficulty: "easy",
    topic: "Operators",
    subtopic: "Logical Operators",
    Option1: "true",
    Option2: "1",
    Option3: "Compile error",
    Option4: "false",
    CorrectOption: 4,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Bitwise AND of Twelve and Ten",
    description: "What is the result of the bitwise expression 12 & 10? (12 is 1100 and 10 is 1010 in binary.)",
    difficulty: "easy",
    topic: "Operators",
    subtopic: "Bitwise Operators",
    Option1: "14",
    Option2: "6",
    Option3: "8",
    Option4: "0",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Assignment Versus Equality",
    description: "Which option states the correct roles of = and == in C++?",
    difficulty: "easy",
    topic: "Operators",
    subtopic: "Assignment Operators",
    Option1: "= compares two values while == stores a value",
    Option2: "== copies the right side into the left side",
    Option3: "= stores the right side into the left variable, while == tests whether two values are equal",
    Option4: "Both operators are interchangeable",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "sizeof Operator Meaning",
    description: "What does the sizeof operator return?",
    difficulty: "easy",
    topic: "Operators",
    subtopic: "sizeof Operator",
    Option1: "The size of a type or expression in bytes",
    Option2: "The size of a type in bits",
    Option3: "The number of elements in an array",
    Option4: "The largest value a type can store",
    CorrectOption: 1,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Ternary Operator Syntax",
    description: "Which option shows the correct general form of the conditional (ternary) operator in C++?",
    difficulty: "easy",
    topic: "Operators",
    subtopic: "Ternary Operator",
    Option1: "condition ? valueIfTrue : valueIfFalse",
    Option2: "condition : valueIfTrue ? valueIfFalse",
    Option3: "condition ? valueIfFalse : valueIfTrue",
    Option4: "condition -> valueIfTrue else valueIfFalse",
    CorrectOption: 1,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },

  // ----------------------------------------------------------------- medium
  {
    title: "Division and Remainder Together",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "Operators",
    subtopic: "Arithmetic Operators",
    Option1: "3 2",
    Option2: "3.4 2",
    Option3: "2 3",
    Option4: "3 3",
    CorrectOption: 1,
    codesnippet: `#include <iostream>
using namespace std;
int main() {
    cout << 17 / 5 << " " << 17 % 5;
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: "#include <iostream>\nusing namespace std;\nint main() {\n    cout << 17 / 5 << \" \" << 17 % 5;\n    return 0;\n}",
      stdin: "",
      expected: "3 2",
    },
  },
  {
    title: "Increment Mix Prediction",
    description: "What does this program print? Each increment sits in its own statement.",
    difficulty: "medium",
    topic: "Operators",
    subtopic: "Increment and Decrement",
    Option1: "6 7 7",
    Option2: "5 7 7",
    Option3: "5 6 7",
    Option4: "6 6 7",
    CorrectOption: 2,
    codesnippet: `#include <iostream>
using namespace std;
int main() {
    int i = 5;
    int a = i++;
    int b = ++i;
    cout << a << " " << b << " " << i;
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: "#include <iostream>\nusing namespace std;\nint main() {\n    int i = 5;\n    int a = i++;\n    int b = ++i;\n    cout << a << \" \" << b << \" \" << i;\n    return 0;\n}",
      stdin: "",
      expected: "5 7 7",
    },
  },
  {
    title: "Ternary Even Odd Output",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "Operators",
    subtopic: "Ternary Operator",
    Option1: "20",
    Option2: "24",
    Option3: "Compile error",
    Option4: "10",
    CorrectOption: 4,
    codesnippet: `#include <iostream>
using namespace std;
int main() {
    int n = 4;
    cout << (n % 2 == 0 ? 10 : 20);
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: "#include <iostream>\nusing namespace std;\nint main() {\n    int n = 4;\n    cout << (n % 2 == 0 ? 10 : 20);\n    return 0;\n}",
      stdin: "",
      expected: "10",
    },
  },
  {
    title: "Short Circuit Saves Counter",
    description: "What does this program print? Remember how && evaluates its right side.",
    difficulty: "medium",
    topic: "Operators",
    subtopic: "Logical Operators",
    Option1: "0 0",
    Option2: "1 1",
    Option3: "0 1",
    Option4: "1 0",
    CorrectOption: 1,
    codesnippet: `#include <iostream>
using namespace std;
int main() {
    int x = 0;
    bool r = (x != 0) && (++x > 0);
    cout << r << " " << x;
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: "#include <iostream>\nusing namespace std;\nint main() {\n    int x = 0;\n    bool r = (x != 0) && (++x > 0);\n    cout << r << \" \" << x;\n    return 0;\n}",
      stdin: "",
      expected: "0 0",
    },
  },
  {
    title: "And Or Precedence Order",
    description: "Which option describes the relative precedence of the logical operators && and || in C++?",
    difficulty: "medium",
    topic: "Operators",
    subtopic: "Operator Precedence",
    Option1: "They share the same precedence and group left to right",
    Option2: "|| binds tighter than &&",
    Option3: "&& binds tighter than ||, so a || b && c means a || (b && c)",
    Option4: "Their precedence changes with compiler settings",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Boolean Arithmetic Sum",
    description: "Relational operators in C++ produce int values 1 (true) or 0 (false). What is the value of (5 > 3) + (2 > 7)?",
    difficulty: "medium",
    topic: "Operators",
    subtopic: "Relational Operators",
    Option1: "2",
    Option2: "1",
    Option3: "0",
    Option4: "12",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },

  // ------------------------------------------------------------------- hard
  {
    title: "Unsigned Borrow Wraparound",
    description: "What does this program print? Keep in mind that unsigned arithmetic is modular.",
    difficulty: "hard",
    topic: "Operators",
    subtopic: "Arithmetic Operators",
    Option1: "-5",
    Option2: "4294967291",
    Option3: "0",
    Option4: "Compile error",
    CorrectOption: 2,
    codesnippet: `#include <iostream>
using namespace std;
int main() {
    unsigned int a = 5;
    unsigned int b = 10;
    cout << a - b;
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: "#include <iostream>\nusing namespace std;\nint main() {\n    unsigned int a = 5;\n    unsigned int b = 10;\n    cout << a - b;\n    return 0;\n}",
      stdin: "",
      expected: "4294967291",
    },
  },
  {
    title: "Character Literal sizeof Trap",
    description: "What does this program print on a typical 64-bit compiler? Note the difference between a character literal and a string literal.",
    difficulty: "hard",
    topic: "Operators",
    subtopic: "sizeof Operator",
    Option1: "1 2",
    Option2: "2 1",
    Option3: "1 1",
    Option4: "4 8",
    CorrectOption: 1,
    codesnippet: `#include <iostream>
using namespace std;
int main() {
    cout << sizeof('A') << " " << sizeof("A");
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: "#include <iostream>\nusing namespace std;\nint main() {\n    cout << sizeof('A') << \" \" << sizeof(\"A\");\n    return 0;\n}",
      stdin: "",
      expected: "1 2",
    },
  },
  {
    title: "Chained Relational Trap",
    description: "What does this program print? Relational operators compare left to right and each comparison yields 1 or 0.",
    difficulty: "hard",
    topic: "Operators",
    subtopic: "Relational Operators",
    Option1: "0 1",
    Option2: "1 0",
    Option3: "1 1",
    Option4: "0 0",
    CorrectOption: 2,
    codesnippet: `#include <iostream>
using namespace std;
int main() {
    cout << (3 < 5 < 2) << " " << (5 > 4 > 1);
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: "#include <iostream>\nusing namespace std;\nint main() {\n    cout << (3 < 5 < 2) << \" \" << (5 > 4 > 1);\n    return 0;\n}",
      stdin: "",
      expected: "1 0",
    },
  },
  {
    title: "Double Modification Undefined Behaviour",
    description: "Consider the statement i = i++ + ++i; where i is a plain int. According to the C++ standard, what is the result?",
    difficulty: "hard",
    topic: "Operators",
    subtopic: "Increment and Decrement",
    Option1: "The compiler always rejects it with a compile-time error",
    Option2: "The result is guaranteed to be the original i plus 1",
    Option3: "The behaviour is undefined, because i is modified twice by evaluations that are unsequenced relative to each other",
    Option4: "The result is always the original i plus 2",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
];
