/**
 * OOPS using CPP — Day 3: Control Statements (if-else, switch, break, continue)
 * 20 code questions (10 easy: 6 basics + 4 real-world, 6 medium, 4 hard)
 * 20 MCQs (10 easy, 6 medium, 4 hard)
 * All solutions are fresh C++ written for this course (no conversions).
 */
export const meta = {
  day: 3,
  topic: "Control Statements",
};

export const code = [
  // ------------------------------------------------------------------ easy
  {
    title: "Positive, Negative or Zero",
    description:
      "A reception desk program must classify any integer amount typed by the clerk. Read one integer and report whether it is positive, negative or exactly zero.\n\nInput Format:\nOne line with one integer N.\n\nOutput Format:\nPrint Positive when N > 0.\nPrint Negative when N < 0.\nOtherwise print Zero.\n\nConstraints:\n-1000000 <= N <= 1000000",
    difficulty: "easy",
    maxscore: 10,
    topic: "Control Statements",
    subtopic: "if and if-else",
    inputconstrains: "-1000000 <= N <= 1000000",
    sampleinput1: "45",
    sampleinput2: "-17",
    input1: "0",
    input2: "1000000",
    input3: "-1",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    if (n > 0) {
        cout << "Positive" << endl;
    } else if (n < 0) {
        cout << "Negative" << endl;
    } else {
        cout << "Zero" << endl;
    }
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Larger Integer with if-else",
    description:
      "A teacher compares two quiz scores to find the better one. Read two integers and print the larger value. If both are equal, print only the word Equal instead.\n\nInput Format:\nOne line with two integers A and B.\n\nOutput Format:\nLarger: <greater of A and B>\nIf A and B are equal, print only the single line Equal.\n\nConstraints:\n-1000000 <= A, B <= 1000000",
    difficulty: "easy",
    maxscore: 10,
    topic: "Control Statements",
    subtopic: "if and if-else",
    inputconstrains: "-1000000 <= A, B <= 1000000",
    sampleinput1: "12 45",
    sampleinput2: "99 7",
    input1: "5 5",
    input2: "-8 -3",
    input3: "1000000 999999",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    if (a > b) {
        cout << "Larger: " << a << endl;
    } else if (b > a) {
        cout << "Larger: " << b << endl;
    } else {
        cout << "Equal" << endl;
    }
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Pass or Fail Verdict",
    description:
      "An online exam portal publishes results instantly. Read the marks of a student (integer out of 100) and print Pass when the marks are 40 or more, otherwise print Fail.\n\nInput Format:\nOne line with one integer M.\n\nOutput Format:\nMark: <M>\nResult: Pass (when M >= 40) or Result: Fail (when M < 40)\n\nConstraints:\n0 <= M <= 100",
    difficulty: "easy",
    maxscore: 10,
    topic: "Control Statements",
    subtopic: "if and if-else",
    inputconstrains: "0 <= M <= 100",
    sampleinput1: "78",
    sampleinput2: "33",
    input1: "40",
    input2: "39",
    input3: "100",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int m;
    cin >> m;
    cout << "Mark: " << m << endl;
    if (m >= 40) {
        cout << "Result: Pass" << endl;
    } else {
        cout << "Result: Fail" << endl;
    }
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Vowel or Consonant Test",
    description:
      "A phonics app listens to single letters typed by children. Read one lowercase letter and print whether it is a vowel or a consonant. The vowels are a, e, i, o, u; every other lowercase letter is a consonant.\n\nInput Format:\nOne line with one lowercase character C.\n\nOutput Format:\nLetter: <C>\nType: Vowel (for a e i o u) or Type: Consonant\n\nConstraints:\nC is a lowercase letter from a to z.",
    difficulty: "easy",
    maxscore: 10,
    topic: "Control Statements",
    subtopic: "if and if-else",
    inputconstrains: "C is a lowercase letter from a to z",
    sampleinput1: "e",
    sampleinput2: "k",
    input1: "a",
    input2: "z",
    input3: "u",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    char c;
    cin >> c;
    cout << "Letter: " << c << endl;
    if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u') {
        cout << "Type: Vowel" << endl;
    } else {
        cout << "Type: Consonant" << endl;
    }
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Age Group Classifier",
    description:
      "A vaccination drive sorts visitors into age groups. Read the age (integer) and print the group using an else-if ladder: below 13 Child, 13 to 19 Teen, 20 to 59 Adult, 60 and above Senior.\n\nInput Format:\nOne line with one integer A.\n\nOutput Format:\nAge: <A>\nGroup: Child (A < 13), Teen (13 to 19), Adult (20 to 59), Senior (60 and above)\n\nConstraints:\n1 <= A <= 120",
    difficulty: "easy",
    maxscore: 10,
    topic: "Control Statements",
    subtopic: "else-if Ladder",
    inputconstrains: "1 <= A <= 120",
    sampleinput1: "10",
    sampleinput2: "15",
    input1: "13",
    input2: "20",
    input3: "60",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int a;
    cin >> a;
    cout << "Age: " << a << endl;
    if (a < 13) {
        cout << "Group: Child" << endl;
    } else if (a <= 19) {
        cout << "Group: Teen" << endl;
    } else if (a <= 59) {
        cout << "Group: Adult" << endl;
    } else {
        cout << "Group: Senior" << endl;
    }
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Even or Odd Check",
    description:
      "A number game asks players to classify numbers. Read one integer and print Even when it is divisible by 2, otherwise print Odd. Remember that negative numbers and zero follow the same rule.\n\nInput Format:\nOne line with one integer N.\n\nOutput Format:\nNumber: <N>\nEven (when N % 2 == 0) or Odd\n\nConstraints:\n-1000000 <= N <= 1000000",
    difficulty: "easy",
    maxscore: 10,
    topic: "Control Statements",
    subtopic: "if and if-else",
    inputconstrains: "-1000000 <= N <= 1000000",
    sampleinput1: "24",
    sampleinput2: "37",
    input1: "0",
    input2: "-6",
    input3: "999999",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    cout << "Number: " << n << endl;
    if (n % 2 == 0) {
        cout << "Even" << endl;
    } else {
        cout << "Odd" << endl;
    }
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Parking Fee Zone",
    description:
      "A mall parking gate charges a flat entry fee of 50 rupees that covers the first 2 hours. Every extra hour beyond 2 hours costs 20 rupees more (hours are always given as a whole number). Read the hours parked and print the fee.\n\nInput Format:\nOne line with one integer H (hours parked).\n\nOutput Format:\nHours: <H>\nFee: <50 when H <= 2, otherwise 50 + (H - 2) * 20>\n\nConstraints:\n0 <= H <= 24",
    difficulty: "easy",
    maxscore: 10,
    topic: "Control Statements",
    subtopic: "if and if-else",
    inputconstrains: "0 <= H <= 24",
    sampleinput1: "1",
    sampleinput2: "5",
    input1: "2",
    input2: "3",
    input3: "10",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int h;
    cin >> h;
    int fee;
    if (h <= 2) {
        fee = 50;
    } else {
        fee = 50 + (h - 2) * 20;
    }
    cout << "Hours: " << h << endl;
    cout << "Fee: " << fee << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Library Late Return Category",
    description:
      "A college library sorts returned books into handling categories. Read the number of days a book was returned late (0 means on time) and print the category: 0 days On time; 1 to 7 days Grace period; 8 to 30 days Late; more than 30 days Defaulted.\n\nInput Format:\nOne line with one integer D (days late).\n\nOutput Format:\nDays late: <D>\nCategory: On time | Grace period | Late | Defaulted\n\nConstraints:\n0 <= D <= 365",
    difficulty: "easy",
    maxscore: 10,
    topic: "Control Statements",
    subtopic: "else-if Ladder",
    inputconstrains: "0 <= D <= 365",
    sampleinput1: "0",
    sampleinput2: "12",
    input1: "7",
    input2: "8",
    input3: "31",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int d;
    cin >> d;
    cout << "Days late: " << d << endl;
    if (d == 0) {
        cout << "Category: On time" << endl;
    } else if (d <= 7) {
        cout << "Category: Grace period" << endl;
    } else if (d <= 30) {
        cout << "Category: Late" << endl;
    } else {
        cout << "Category: Defaulted" << endl;
    }
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Parcel Shipping Class",
    description:
      "A courier counter stamps every parcel with a handling class based on its weight in kilograms. Read the weight (integer kg) and print the class: up to 1 kg Light; 2 to 5 kg Medium; 6 to 20 kg Heavy; above 20 kg Freight.\n\nInput Format:\nOne line with one integer W (weight in kg).\n\nOutput Format:\nWeight: <W> kg\nClass: Light | Medium | Heavy | Freight\n\nConstraints:\n1 <= W <= 50",
    difficulty: "easy",
    maxscore: 10,
    topic: "Control Statements",
    subtopic: "else-if Ladder",
    inputconstrains: "1 <= W <= 50",
    sampleinput1: "3",
    sampleinput2: "15",
    input1: "1",
    input2: "5",
    input3: "21",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int w;
    cin >> w;
    cout << "Weight: " << w << " kg" << endl;
    if (w <= 1) {
        cout << "Class: Light" << endl;
    } else if (w <= 5) {
        cout << "Class: Medium" << endl;
    } else if (w <= 20) {
        cout << "Class: Heavy" << endl;
    } else {
        cout << "Class: Freight" << endl;
    }
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Temperature Band Classifier",
    description:
      "A weather station labels each reading with a comfort band. Read the temperature in whole degrees Celsius and print the band using an else-if ladder: below 0 Freezing; 0 to 15 Cold; 16 to 30 Pleasant; 31 to 40 Hot; above 40 Extreme.\n\nInput Format:\nOne line with one integer T (Celsius).\n\nOutput Format:\nCelsius: <T>\nBand: Freezing | Cold | Pleasant | Hot | Extreme\n\nConstraints:\n-50 <= T <= 55",
    difficulty: "easy",
    maxscore: 10,
    topic: "Control Statements",
    subtopic: "else-if Ladder",
    inputconstrains: "-50 <= T <= 55",
    sampleinput1: "25",
    sampleinput2: "-5",
    input1: "0",
    input2: "31",
    input3: "41",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int t;
    cin >> t;
    cout << "Celsius: " << t << endl;
    if (t < 0) {
        cout << "Band: Freezing" << endl;
    } else if (t <= 15) {
        cout << "Band: Cold" << endl;
    } else if (t <= 30) {
        cout << "Band: Pleasant" << endl;
    } else if (t <= 40) {
        cout << "Band: Hot" << endl;
    } else {
        cout << "Band: Extreme" << endl;
    }
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },

  // ----------------------------------------------------------------- medium
  {
    title: "Mobile Plan Selector",
    description:
      "A telecom shop sells four prepaid plans chosen by a numeric plan code. Read the code and use a switch statement with break in every case to print the plan name and monthly rent: code 1 Basic 199; code 2 Value 299; code 3 Max 399; code 4 Ultra 599. Any other code must print the plan name Invalid with rent 0 (handled by the default case).\n\nInput Format:\nOne line with one integer C (plan code).\n\nOutput Format:\nPlan: <Basic | Value | Max | Ultra | Invalid>\nMonthly rent: <199 | 299 | 399 | 599 | 0>\n\nConstraints:\n1 <= C <= 99",
    difficulty: "medium",
    maxscore: 20,
    topic: "Control Statements",
    subtopic: "switch Statement",
    inputconstrains: "1 <= C <= 99",
    sampleinput1: "2",
    sampleinput2: "9",
    input1: "1",
    input2: "4",
    input3: "3",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    int c;
    cin >> c;
    string name = "Invalid";
    int rent = 0;
    switch (c) {
        case 1:
            name = "Basic";
            rent = 199;
            break;
        case 2:
            name = "Value";
            rent = 299;
            break;
        case 3:
            name = "Max";
            rent = 399;
            break;
        case 4:
            name = "Ultra";
            rent = 599;
            break;
        default:
            name = "Invalid";
            rent = 0;
            break;
    }
    cout << "Plan: " << name << endl;
    cout << "Monthly rent: " << rent << endl;
    return 0;
}`,
    blacklist: "printf, ternary",
    whitelist: "switch, case, break, default",
  },
  {
    title: "Grade Ladder with Modifiers",
    description:
      "A university examiner converts marks into a letter grade with plus and minus modifiers. First pick the base grade with an else-if ladder: 90 or more A; 80 to 89 B; 70 to 79 C; 60 to 69 D; below 60 F. Then, for every base grade except F, add a modifier from the last digit of the marks: digit 7, 8 or 9 appends +; digit 0, 1 or 2 appends -; any other digit leaves the grade unchanged. A perfect score of 100 always stays plain A.\n\nInput Format:\nOne line with one integer M (marks).\n\nOutput Format:\nMarks: <M>\nGrade: <base grade with optional + or - modifier>\n\nConstraints:\n0 <= M <= 100",
    difficulty: "medium",
    maxscore: 20,
    topic: "Control Statements",
    subtopic: "else-if Ladder",
    inputconstrains: "0 <= M <= 100",
    sampleinput1: "88",
    sampleinput2: "93",
    input1: "100",
    input2: "59",
    input3: "92",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    int marks;
    cin >> marks;
    string base;
    if (marks >= 90) {
        base = "A";
    } else if (marks >= 80) {
        base = "B";
    } else if (marks >= 70) {
        base = "C";
    } else if (marks >= 60) {
        base = "D";
    } else {
        base = "F";
    }
    string grade = base;
    if (base != "F" && marks != 100) {
        int d = marks % 10;
        if (d >= 7) {
            grade = base + "+";
        } else if (d <= 2) {
            grade = base + "-";
        }
    }
    cout << "Marks: " << marks << endl;
    cout << "Grade: " << grade << endl;
    return 0;
}`,
    blacklist: "printf, switch, ternary",
    whitelist: "if, else if, else",
  },
  {
    title: "Blood Donation Eligibility Desk",
    description:
      "A blood bank kiosk screens walk-in donors with three gates applied in order: age first, then weight, then gap since the last donation. Read the age, the weight in kg and the number of days since the last donation. A donor is eligible only when age is between 18 and 65 (inclusive), weight is at least 50 kg and the last donation was 90 or more days ago. Use nested if statements so the first failed gate decides the rejection reason: under age, over age, under weight or recent donation.\n\nInput Format:\nOne line with three integers: age, weight, days since last donation.\n\nOutput Format:\nAge: <age>\nWeight: <weight>\nLast donation: <days> days ago\nStatus: Eligible (all gates pass) or Status: Rejected - under age | over age | under weight | recent donation\n\nConstraints:\n1 <= age <= 100, 1 <= weight <= 200, 0 <= days <= 2000",
    difficulty: "medium",
    maxscore: 20,
    topic: "Control Statements",
    subtopic: "Nested if",
    inputconstrains: "1 <= age <= 100, 1 <= weight <= 200, 0 <= days <= 2000",
    sampleinput1: "25 62 120",
    sampleinput2: "16 55 200",
    input1: "70 60 100",
    input2: "30 45 89",
    input3: "45 70 89",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int age, weight, days;
    cin >> age >> weight >> days;
    cout << "Age: " << age << endl;
    cout << "Weight: " << weight << endl;
    cout << "Last donation: " << days << " days ago" << endl;
    if (age < 18) {
        cout << "Status: Rejected - under age" << endl;
    } else if (age > 65) {
        cout << "Status: Rejected - over age" << endl;
    } else {
        if (weight < 50) {
            cout << "Status: Rejected - under weight" << endl;
        } else {
            if (days < 90) {
                cout << "Status: Rejected - recent donation" << endl;
            } else {
                cout << "Status: Eligible" << endl;
            }
        }
    }
    return 0;
}`,
    blacklist: "printf, ternary",
    whitelist: "if, else",
  },
  {
    title: "Customer Tier Discount Counter",
    description:
      "A retail counter applies discounts by loyalty tier. Read the tier code (a single character: S Silver, G Gold, P Platinum, D Diamond) and the bill amount (a double). Discount percentage: Silver 5, Gold 10, Platinum 15, Diamond 20. Use a switch on the tier character with break in every case; any other character is Unknown with 0 discount. Print the tier name, the amount, the discount and the payable amount, with every money value shown at two decimals.\n\nInput Format:\nOne line with a character T and a double A separated by a space: tier code and bill amount.\n\nOutput Format:\nTier: <Silver | Gold | Platinum | Diamond | Unknown>\nAmount: <A with 2 decimals>\nDiscount: <discount with 2 decimals>\nPayable: <amount - discount with 2 decimals>\n\nConstraints:\n0 <= amount <= 1000000",
    difficulty: "medium",
    maxscore: 20,
    topic: "Control Statements",
    subtopic: "switch Statement",
    inputconstrains: "0 <= amount <= 1000000",
    sampleinput1: "G 4500",
    sampleinput2: "X 2500",
    input1: "S 1000",
    input2: "D 999.5",
    input3: "P 250",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
#include <string>
using namespace std;

int main() {
    char t;
    double amount;
    cin >> t >> amount;
    string name;
    int pct;
    switch (t) {
        case 'S':
            name = "Silver";
            pct = 5;
            break;
        case 'G':
            name = "Gold";
            pct = 10;
            break;
        case 'P':
            name = "Platinum";
            pct = 15;
            break;
        case 'D':
            name = "Diamond";
            pct = 20;
            break;
        default:
            name = "Unknown";
            pct = 0;
            break;
    }
    double discount = amount * pct / 100.0;
    cout << "Tier: " << name << endl;
    cout << fixed << setprecision(2);
    cout << "Amount: " << amount << endl;
    cout << "Discount: " << discount << endl;
    cout << "Payable: " << amount - discount << endl;
    return 0;
}`,
    blacklist: "printf, ternary",
    whitelist: "switch, case, break, default",
  },
  {
    title: "Courier Cost by Weight and Zone",
    description:
      "A courier desk prices a parcel from its weight bracket and delivery zone. Read the weight (integer kg) and the zone code (1, 2 or 3). Base charge: up to 2 kg 80 rupees; 3 to 5 kg 150 rupees; above 5 kg 300 rupees. Zone surcharge added to the base: zone 1 adds 0, zone 2 adds 50, zone 3 adds 120. If the zone code is not 1, 2 or 3, print only the line Invalid zone. Use nested if statements: pick the weight bracket first, then decide the zone surcharge inside it.\n\nInput Format:\nOne line with two integers: weight in kg and zone code.\n\nOutput Format:\nWeight: <W>\nBase charge: <base>\nZone surcharge: <surcharge>\nTotal: <base + surcharge>\nWhen the zone code is invalid, print only: Invalid zone\n\nConstraints:\n1 <= weight <= 50, 1 <= zone <= 9",
    difficulty: "medium",
    maxscore: 20,
    topic: "Control Statements",
    subtopic: "Nested if",
    inputconstrains: "1 <= weight <= 50, 1 <= zone <= 9",
    sampleinput1: "3 2",
    sampleinput2: "10 3",
    input1: "2 1",
    input2: "3 3",
    input3: "6 9",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int weight, zone;
    cin >> weight >> zone;
    if (zone < 1 || zone > 3) {
        cout << "Invalid zone" << endl;
        return 0;
    }
    int base = 0;
    int surcharge = 0;
    if (weight <= 2) {
        base = 80;
        if (zone == 1) {
            surcharge = 0;
        } else if (zone == 2) {
            surcharge = 50;
        } else {
            surcharge = 120;
        }
    } else if (weight <= 5) {
        base = 150;
        if (zone == 1) {
            surcharge = 0;
        } else if (zone == 2) {
            surcharge = 50;
        } else {
            surcharge = 120;
        }
    } else {
        base = 300;
        if (zone == 1) {
            surcharge = 0;
        } else if (zone == 2) {
            surcharge = 50;
        } else {
            surcharge = 120;
        }
    }
    cout << "Weight: " << weight << endl;
    cout << "Base charge: " << base << endl;
    cout << "Zone surcharge: " << surcharge << endl;
    cout << "Total: " << base + surcharge << endl;
    return 0;
}`,
    blacklist: "printf, switch, ternary",
    whitelist: "if, else",
  },
  {
    title: "Menu Driven Calculator",
    description:
      "A classroom calculator app reads two numbers and an operator character and performs the chosen operation through a switch statement. Read two doubles A and B and an operator character op (+, -, *, /). Each case must end with break: + prints A + B, - prints A - B, * prints A * B, and / prints A / B, all results with two decimals. When op is / and B is exactly 0, print Error: division by zero instead of a result. Any other operator character prints Invalid operator.\n\nInput Format:\nOne line with two doubles and a character separated by spaces: A, B, op.\n\nOutput Format:\nResult: <value with 2 decimals>\nWhen dividing by zero, print only: Error: division by zero\nFor an unknown operator, print only: Invalid operator\n\nConstraints:\n-1000000 <= A, B <= 1000000, op is a single character",
    difficulty: "medium",
    maxscore: 20,
    topic: "Control Statements",
    subtopic: "break and continue",
    inputconstrains: "-1000000 <= A, B <= 1000000, op is a single character",
    sampleinput1: "12 4 +",
    sampleinput2: "9 0 /",
    input1: "10 4 /",
    input2: "7 2 *",
    input3: "5 3 %",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    double a, b;
    char op;
    cin >> a >> b >> op;
    switch (op) {
        case '+':
            cout << "Result: " << fixed << setprecision(2) << a + b << endl;
            break;
        case '-':
            cout << "Result: " << fixed << setprecision(2) << a - b << endl;
            break;
        case '*':
            cout << "Result: " << fixed << setprecision(2) << a * b << endl;
            break;
        case '/':
            if (b == 0) {
                cout << "Error: division by zero" << endl;
            } else {
                cout << "Result: " << fixed << setprecision(2) << a / b << endl;
            }
            break;
        default:
            cout << "Invalid operator" << endl;
            break;
    }
    return 0;
}`,
    blacklist: "printf, ternary",
    whitelist: "switch, case, break, default, if",
  },

  // ------------------------------------------------------------------- hard
  {
    title: "Insurance Premium Calculator",
    description:
      "An insurer quotes a yearly vehicle premium from three facts: the driver age, the zone code and the no-claim years. The base premium is 5000 rupees.\n- Age factor: below 25 multiplies by 1.50; 25 to 60 (inclusive) multiplies by 1.00; above 60 multiplies by 1.30.\n- Zone load: zone 1 adds 0 percent, zone 2 adds 10 percent, zone 3 adds 25 percent on the age-adjusted premium. Any other zone code must print only the line Invalid zone.\n- No-claim discount: 5 or more years cuts 15 percent; 3 to 4 years cuts 10 percent; 1 to 2 years cuts 5 percent; 0 years cuts nothing.\nCompute the age-adjusted premium, apply the zone load, then apply the discount, and print the full breakdown with money and factor values at two decimals.\n\nInput Format:\nOne line with three integers: age, zone code, no-claim years.\n\nOutput Format:\nBase premium: 5000.00\nAge factor: <1.50 | 1.00 | 1.30>\nZone load: <0 | 10 | 25>%\nPremium after zone: <value with 2 decimals>\nNo claim discount: <0 | 5 | 10 | 15>%\nFinal premium: <value with 2 decimals>\nWhen the zone code is invalid, print only: Invalid zone\n\nConstraints:\n18 <= age <= 90, 1 <= zone <= 9, 0 <= no-claim years <= 20",
    difficulty: "hard",
    maxscore: 30,
    topic: "Control Statements",
    subtopic: "Nested if",
    inputconstrains: "18 <= age <= 90, 1 <= zone <= 9, 0 <= no-claim years <= 20",
    sampleinput1: "30 2 4",
    sampleinput2: "22 1 0",
    input1: "65 3 6",
    input2: "24 2 5",
    input3: "45 9 2",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    const double BASE = 5000.0;
    int age, zone, noClaim;
    cin >> age >> zone >> noClaim;
    if (zone < 1 || zone > 3) {
        cout << "Invalid zone" << endl;
        return 0;
    }
    double ageFactor;
    if (age < 25) {
        ageFactor = 1.5;
    } else if (age <= 60) {
        ageFactor = 1.0;
    } else {
        ageFactor = 1.3;
    }
    int zonePct;
    if (zone == 1) {
        zonePct = 0;
    } else if (zone == 2) {
        zonePct = 10;
    } else {
        zonePct = 25;
    }
    double afterZone = BASE * ageFactor * (1 + zonePct / 100.0);
    int discPct;
    if (noClaim >= 5) {
        discPct = 15;
    } else if (noClaim >= 3) {
        discPct = 10;
    } else if (noClaim >= 1) {
        discPct = 5;
    } else {
        discPct = 0;
    }
    double finalPremium = afterZone * (1 - discPct / 100.0);
    cout << fixed << setprecision(2);
    cout << "Base premium: " << BASE << endl;
    cout << "Age factor: " << ageFactor << endl;
    cout << "Zone load: " << zonePct << "%" << endl;
    cout << "Premium after zone: " << afterZone << endl;
    cout << "No claim discount: " << discPct << "%" << endl;
    cout << "Final premium: " << finalPremium << endl;
    return 0;
}`,
    blacklist: "printf, ternary, pow(",
    whitelist: "if, else if, else",
  },
  {
    title: "Traffic Fine Engine",
    description:
      "A traffic police console computes a speeding fine from four facts: the recorded speed, the speed limit, the vehicle class (C car, B bike, T truck) and a repeat-offender flag (Y or N). Let over = speed - limit.\n- Base fine ladder on over: 1 to 10 kmh over 300; 11 to 25 over 800; 26 to 50 over 1500; more than 50 over 2500. When over is 0 or less there is no fine (base 0) and the multiplier stays 1.00.\n- Vehicle multiplier applied to the base fine: car 1.00, bike 1.20, truck 1.50.\n- A repeat offender (Y) pays 50 percent extra on the multiplied fine.\n- The licence is suspended when over is more than 50, or when the driver is a repeat offender and over is more than 25.\nPrint the complete breakdown; money values with two decimals.\n\nInput Format:\nOne line with two integers and two characters separated by spaces: speed, limit, vehicle class, repeat flag.\n\nOutput Format:\nSpeed: <speed>\nLimit: <limit>\nOver by: <over>\nBase fine: <base with 2 decimals>\nClass multiplier: <1.00 | 1.20 | 1.50>\nRepeat offender: <Y or N>\nTotal fine: <total with 2 decimals>\nLicense suspended: <yes or no>\n\nConstraints:\n0 <= speed <= 300, 40 <= limit <= 120, class is C, B or T, flag is Y or N",
    difficulty: "hard",
    maxscore: 30,
    topic: "Control Statements",
    subtopic: "Conditional Logic Design",
    inputconstrains: "0 <= speed <= 300, 40 <= limit <= 120, class is C, B or T, flag is Y or N",
    sampleinput1: "95 80 C Y",
    sampleinput2: "70 70 B N",
    input1: "140 80 T N",
    input2: "110 80 C Y",
    input3: "60 60 T N",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
#include <string>
using namespace std;

int main() {
    int speed, limit;
    char vclass, repeat;
    cin >> speed >> limit >> vclass >> repeat;
    int over = speed - limit;
    double base = 0.0;
    double mult = 1.0;
    double total = 0.0;
    if (over > 0) {
        if (over <= 10) {
            base = 300;
        } else if (over <= 25) {
            base = 800;
        } else if (over <= 50) {
            base = 1500;
        } else {
            base = 2500;
        }
        if (vclass == 'C') {
            mult = 1.0;
        } else if (vclass == 'B') {
            mult = 1.2;
        } else {
            mult = 1.5;
        }
        total = base * mult;
        if (repeat == 'Y') {
            total = total * 1.5;
        }
    }
    string suspended = "no";
    if (over > 50 || (repeat == 'Y' && over > 25)) {
        suspended = "yes";
    }
    cout << "Speed: " << speed << endl;
    cout << "Limit: " << limit << endl;
    cout << "Over by: " << over << endl;
    cout << fixed << setprecision(2);
    cout << "Base fine: " << base << endl;
    cout << "Class multiplier: " << mult << endl;
    cout << "Repeat offender: " << repeat << endl;
    cout << "Total fine: " << total << endl;
    cout << "License suspended: " << suspended << endl;
    return 0;
}`,
    blacklist: "printf, switch, ternary, pow(",
    whitelist: "if, else if, else",
  },
  {
    title: "University Admission Scorer",
    description:
      "An admission portal filters entrance scores per department. Read the department code (1 CSE, 2 ECE, 3 MECH, 4 CIVIL) and the entrance marks (0 to 200). Use a switch on the department code with break in every case to pick the cutoff: CSE 150, ECE 130, MECH 110, CIVIL 95. An unknown code prints only the line Invalid department. Then classify the marks: marks at or above the cutoff are Admitted; marks in the 10-mark band just below the cutoff (cutoff - 10 up to cutoff - 1) are Waitlist; anything lower is Rejected.\n\nInput Format:\nOne line with two integers: department code and entrance marks.\n\nOutput Format:\nDepartment: <CSE | ECE | MECH | CIVIL>\nCutoff: <cutoff>\nMarks: <marks>\nResult: Admitted | Waitlist | Rejected\nWhen the department code is unknown, print only: Invalid department\n\nConstraints:\n1 <= department code <= 9, 0 <= marks <= 200",
    difficulty: "hard",
    maxscore: 30,
    topic: "Control Statements",
    subtopic: "switch Statement",
    inputconstrains: "1 <= department code <= 9, 0 <= marks <= 200",
    sampleinput1: "1 155",
    sampleinput2: "2 128",
    input1: "1 150",
    input2: "3 95",
    input3: "9 180",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
#include <string>
using namespace std;

int main() {
    int dept, marks;
    cin >> dept >> marks;
    string name = "";
    int cutoff = 0;
    switch (dept) {
        case 1:
            name = "CSE";
            cutoff = 150;
            break;
        case 2:
            name = "ECE";
            cutoff = 130;
            break;
        case 3:
            name = "MECH";
            cutoff = 110;
            break;
        case 4:
            name = "CIVIL";
            cutoff = 95;
            break;
        default:
            cout << "Invalid department" << endl;
            return 0;
    }
    string result;
    if (marks >= cutoff) {
        result = "Admitted";
    } else if (marks >= cutoff - 10) {
        result = "Waitlist";
    } else {
        result = "Rejected";
    }
    cout << "Department: " << name << endl;
    cout << "Cutoff: " << cutoff << endl;
    cout << "Marks: " << marks << endl;
    cout << "Result: " << result << endl;
    return 0;
}`,
    blacklist: "printf, ternary",
    whitelist: "switch, case, break, default, if",
  },
  {
    title: "Payroll Overtime Classifier",
    description:
      "A payroll batch job prices overtime from the day type, the hours worked and the employee grade. Read the day code (1 weekday, 2 weekend, 3 holiday), the hours worked and the grade (A, B or C).\n- An unknown day code prints only the line Invalid day code; an unknown grade prints only the line Invalid grade (the day code is checked first).\n- Overtime hours: hours beyond 8 count as overtime (hours - 8 when hours > 8, otherwise 0).\n- Holiday rule: when at least one hour is worked on a holiday, overtime hours are credited with a minimum of 4 (use hours - 8 when that value exceeds 4).\n- Weekday hourly overtime rates: grade A 300, grade B 250, grade C 200. Weekend pays 1.5 times the weekday rate; holiday pays 2 times.\nPrint the breakdown with rate and pay at two decimals.\n\nInput Format:\nOne line with two integers and a character separated by spaces: day code, hours worked, grade.\n\nOutput Format:\nDay type: Weekday | Weekend | Holiday\nHours worked: <hours>\nOvertime hours: <overtime hours>\nRate per hour: <rate with 2 decimals>\nOvertime pay: <overtime hours * rate with 2 decimals>\nFor an unknown day code print only: Invalid day code\nFor an unknown grade print only: Invalid grade\n\nConstraints:\n1 <= day code <= 9, 0 <= hours <= 16, grade is a single character",
    difficulty: "hard",
    maxscore: 30,
    topic: "Control Statements",
    subtopic: "Conditional Logic Design",
    inputconstrains: "1 <= day code <= 9, 0 <= hours <= 16, grade is a single character",
    sampleinput1: "1 10 A",
    sampleinput2: "3 6 B",
    input1: "2 12 C",
    input2: "1 8 C",
    input3: "5 10 A",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
#include <string>
using namespace std;

int main() {
    int dayCode, hours;
    char grade;
    cin >> dayCode >> hours >> grade;
    if (dayCode < 1 || dayCode > 3) {
        cout << "Invalid day code" << endl;
        return 0;
    }
    if (grade != 'A' && grade != 'B' && grade != 'C') {
        cout << "Invalid grade" << endl;
        return 0;
    }
    string dayName;
    double mult;
    if (dayCode == 1) {
        dayName = "Weekday";
        mult = 1.0;
    } else if (dayCode == 2) {
        dayName = "Weekend";
        mult = 1.5;
    } else {
        dayName = "Holiday";
        mult = 2.0;
    }
    double baseRate;
    if (grade == 'A') {
        baseRate = 300;
    } else if (grade == 'B') {
        baseRate = 250;
    } else {
        baseRate = 200;
    }
    int ot = 0;
    if (hours > 8) {
        ot = hours - 8;
    }
    if (dayCode == 3 && hours > 0 && ot < 4) {
        ot = 4;
    }
    double rate = baseRate * mult;
    double pay = ot * rate;
    cout << "Day type: " << dayName << endl;
    cout << "Hours worked: " << hours << endl;
    cout << "Overtime hours: " << ot << endl;
    cout << fixed << setprecision(2);
    cout << "Rate per hour: " << rate << endl;
    cout << "Overtime pay: " << pay << endl;
    return 0;
}`,
    blacklist: "printf, ternary, pow(",
    whitelist: "if, else if, else",
  },
];

export const mcqs = [
  // ------------------------------------------------------------------ easy
  {
    title: "If-Else Purpose",
    description: "Which control statement lets a program choose between two blocks: one when a condition is true and another when it is false?",
    difficulty: "easy",
    topic: "Control Statements",
    subtopic: "if and if-else",
    Option1: "The if statement alone",
    Option2: "The if-else statement",
    Option3: "The switch statement",
    Option4: "The goto statement",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "When Switch Beats the Ladder",
    description: "A switch statement is usually preferred over a long else-if ladder when:",
    difficulty: "easy",
    topic: "Control Statements",
    subtopic: "switch Statement",
    Option1: "the condition involves ranges like marks >= 80",
    Option2: "several different variables must be tested together",
    Option3: "one single integral or character variable is compared against many constant values",
    Option4: "a block of code must be repeated many times",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Effect of break in switch",
    description: "Inside a switch statement, what does break do?",
    difficulty: "easy",
    topic: "Control Statements",
    subtopic: "break and continue",
    Option1: "It exits the switch immediately and prevents fallthrough into the next case",
    Option2: "It skips only the current case and continues with the next case",
    Option3: "It terminates the whole program",
    Option4: "It restarts the switch from the first case",
    CorrectOption: 1,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "else-if Ladder Rule",
    description: "In an else-if ladder with several conditions, how many branches can execute for one input?",
    difficulty: "easy",
    topic: "Control Statements",
    subtopic: "else-if Ladder",
    Option1: "All conditions that are true",
    Option2: "At least two branches",
    Option3: "None, a ladder only compiles",
    Option4: "Exactly one: the first true condition, or the final else when nothing matches",
    CorrectOption: 4,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Dangling else Pairing Rule",
    description: "When an else appears after two nested if statements, which if does it belong to?",
    difficulty: "easy",
    topic: "Control Statements",
    subtopic: "Nested if",
    Option1: "The outer if, always",
    Option2: "The nearest preceding if that is not already paired with an else",
    Option3: "It is a compile error",
    Option4: "Both if statements at once",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Non-zero Integer Truthiness",
    description: "In C++, the condition if (n) is true for:",
    difficulty: "easy",
    topic: "Control Statements",
    subtopic: "if and if-else",
    Option1: "only positive values of n",
    Option2: "only when n equals 1",
    Option3: "any non-zero value of n, including negative numbers",
    Option4: "only when n equals 0",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "What Nested if Means",
    description: "A nested if is best described as:",
    difficulty: "easy",
    topic: "Control Statements",
    subtopic: "Nested if",
    Option1: "an if statement written inside another if or else block",
    Option2: "two if statements joined with the && operator",
    Option3: "an if statement that has no else",
    Option4: "an if statement that appears only inside a loop",
    CorrectOption: 1,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Role of default in switch",
    description: "What is the purpose of the default case in a switch statement?",
    difficulty: "easy",
    topic: "Control Statements",
    subtopic: "switch Statement",
    Option1: "It is mandatory in every switch",
    Option2: "It always runs before all other cases",
    Option3: "It converts characters to integers",
    Option4: "It runs when no other case label matches the controlling value",
    CorrectOption: 4,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "continue Inside a Loop",
    description: "What does the continue statement do when executed inside a loop body?",
    difficulty: "easy",
    topic: "Control Statements",
    subtopic: "break and continue",
    Option1: "It terminates the entire loop",
    Option2: "It skips the remaining statements of the current iteration and jumps to the next iteration",
    Option3: "It exits the program",
    Option4: "It repeats the current iteration again with the same values",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Equality Operator in Conditions",
    description: "Which operator correctly tests equality inside an if condition?",
    difficulty: "easy",
    topic: "Control Statements",
    subtopic: "if and if-else",
    Option1: "=",
    Option2: "!=",
    Option3: "==",
    Option4: "===",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },

  // ----------------------------------------------------------------- medium
  {
    title: "Switch Fallthrough Without Break",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "Control Statements",
    subtopic: "switch Statement",
    Option1: "Two Three End",
    Option2: "Two End",
    Option3: "Two",
    Option4: "Two Three Four End",
    CorrectOption: 1,
    codesnippet: `#include <iostream>
using namespace std;
int main() {
    int code = 2;
    switch (code) {
        case 1:
            cout << "One ";
        case 2:
            cout << "Two ";
        case 3:
            cout << "Three ";
            break;
        case 4:
            cout << "Four ";
    }
    cout << "End";
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nint main() {\n    int code = 2;\n    switch (code) {\n        case 1:\n            cout << "One ";\n        case 2:\n            cout << "Two ";\n        case 3:\n            cout << "Three ";\n            break;\n        case 4:\n            cout << "Four ";\n    }\n    cout << "End";\n    return 0;\n}`,
      stdin: "",
      expected: "Two Three End",
    },
  },
  {
    title: "Misleading Indentation Trap",
    description: "The indentation below is misleading. What does this program actually print?",
    difficulty: "medium",
    topic: "Control Statements",
    subtopic: "Nested if",
    Option1: "A",
    Option2: "B",
    Option3: "Nothing is printed",
    Option4: "AB",
    CorrectOption: 3,
    codesnippet: `#include <iostream>
using namespace std;
int main() {
    int x = 5;
    int y = 12;
    if (x > 10)
        if (y > 10)
            cout << "A";
    else
        cout << "B";
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nint main() {\n    int x = 5;\n    int y = 12;\n    if (x > 10)\n        if (y > 10)\n            cout << "A";\n    else\n        cout << "B";\n    return 0;\n}`,
      stdin: "",
      expected: "",
    },
  },
  {
    title: "Negative Number Truthiness",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "Control Statements",
    subtopic: "if and if-else",
    Option1: "Zero",
    Option2: "Nonzero",
    Option3: "Compile error",
    Option4: "-3",
    CorrectOption: 2,
    codesnippet: `#include <iostream>
using namespace std;
int main() {
    int n = -3;
    if (n)
        cout << "Nonzero";
    else
        cout << "Zero";
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nint main() {\n    int n = -3;\n    if (n)\n        cout << "Nonzero";\n    else\n        cout << "Zero";\n    return 0;\n}`,
      stdin: "",
      expected: "Nonzero",
    },
  },
  {
    title: "Ternary Matches if-else",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "Control Statements",
    subtopic: "Conditional Logic Design",
    Option1: "Minor",
    Option2: "Compile error",
    Option3: "20",
    Option4: "Adult",
    CorrectOption: 4,
    codesnippet: `#include <iostream>
#include <string>
using namespace std;
int main() {
    int age = 20;
    string tag = (age >= 18) ? "Adult" : "Minor";
    cout << tag;
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    int age = 20;\n    string tag = (age >= 18) ? "Adult" : "Minor";\n    cout << tag;\n    return 0;\n}`,
      stdin: "",
      expected: "Adult",
    },
  },
  {
    title: "Why Every Case Needs break",
    description: "In a typical multi-case switch used inside a menu, why should each case body end with a break statement?",
    difficulty: "medium",
    topic: "Control Statements",
    subtopic: "break and continue",
    Option1: "To stop execution from falling through into the statements of the next case",
    Option2: "To skip the default case",
    Option3: "To restart the switch from the first case",
    Option4: "break has no effect inside a switch",
    CorrectOption: 1,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "No Match and No default",
    description: "A switch statement has no default case and its controlling value does not match any case label. What happens?",
    difficulty: "medium",
    topic: "Control Statements",
    subtopic: "switch Statement",
    Option1: "The program crashes at runtime",
    Option2: "The compiler reports a syntax error",
    Option3: "No case body executes and control continues with the first statement after the switch",
    Option4: "The first case body executes as a fallback",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },

  // ------------------------------------------------------------------- hard
  {
    title: "Fallthrough Modifies Across Cases",
    description: "What does this program print? Careful: after a case body finishes, execution continues into the next case body even when the label value does not match.",
    difficulty: "hard",
    topic: "Control Statements",
    subtopic: "switch Statement",
    Option1: "11",
    Option2: "111",
    Option3: "101",
    Option4: "Compile error",
    CorrectOption: 2,
    codesnippet: `#include <iostream>
using namespace std;
int main() {
    int x = 1;
    switch (x) {
        case 1:
            x = x + 10;
        case 11:
            x = x + 100;
            break;
        case 2:
            x = x + 1000;
    }
    cout << x;
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nint main() {\n    int x = 1;\n    switch (x) {\n        case 1:\n            x = x + 10;\n        case 11:\n            x = x + 100;\n            break;\n        case 2:\n            x = x + 1000;\n    }\n    cout << x;\n    return 0;\n}`,
      stdin: "",
      expected: "111",
    },
  },
  {
    title: "Assignment Inside Condition",
    description: "What does this program print?",
    difficulty: "hard",
    topic: "Control Statements",
    subtopic: "if and if-else",
    Option1: "Not five x=5",
    Option2: "Five x=0",
    Option3: "Five x=5",
    Option4: "Compile error",
    CorrectOption: 3,
    codesnippet: `#include <iostream>
using namespace std;
int main() {
    int x = 0;
    if (x = 5)
        cout << "Five";
    else
        cout << "Not five";
    cout << " x=" << x;
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nint main() {\n    int x = 0;\n    if (x = 5)\n        cout << "Five";\n    else\n        cout << "Not five";\n    cout << " x=" << x;\n    return 0;\n}`,
      stdin: "",
      expected: "Five x=5",
    },
  },
  {
    title: "Short-Circuit Skips Work",
    description: "What does this program print? Remember how && and || skip their right side when the left side already decides the result.",
    difficulty: "hard",
    topic: "Control Statements",
    subtopic: "Conditional Logic Design",
    Option1: "0155",
    Option2: "1100",
    Option3: "0011",
    Option4: "0100",
    CorrectOption: 4,
    codesnippet: `#include <iostream>
using namespace std;
int main() {
    int a = 0;
    int b = 0;
    bool r = false && (a = 5);
    bool s = true || (b = 5);
    cout << r << s << a << b;
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nint main() {\n    int a = 0;\n    int b = 0;\n    bool r = false && (a = 5);\n    bool s = true || (b = 5);\n    cout << r << s << a << b;\n    return 0;\n}`,
      stdin: "",
      expected: "0100",
    },
  },
  {
    title: "default Case Placement Trap",
    description: "A switch on the value 1 contains, in source order: case 1 printing One, then default printing Def, then case 2 printing Two, and there is no break anywhere. What is printed?",
    difficulty: "hard",
    topic: "Control Statements",
    subtopic: "switch Statement",
    Option1: "OneDefTwo",
    Option2: "One",
    Option3: "OneTwoDef",
    Option4: "DefTwoOne",
    CorrectOption: 1,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
];
