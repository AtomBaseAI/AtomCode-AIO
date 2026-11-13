/**
 * OOPS using CPP — Day 17: Exception Handling, Multithreading
 * 20 code questions (10 easy: 6 basics + 4 real-world, 6 medium, 4 hard)
 * 20 MCQs (10 easy, 6 medium, 4 hard)
 * All solutions are fresh C++ written for this course (no conversions).
 */
export const meta = {
  day: 17,
  topic: "Exception Handling, Multithreading",
};

export const code = [
  // ------------------------------------------------------------------ easy
  {
    title: "Safe Divider Drill",
    description:
      "A math lab drills guarded division. Read two integers a and b. Inside a try block, print the quotient and the remainder when b is not zero; when b is zero, throw an exception so the catch handler prints the error line.\n\nInput Format:\nOne line with two integers: a and b.\n\nOutput Format:\nQuotient: <a / b>\nRemainder: <a % b>\nor, when b is zero:\nCannot divide by zero\n\nConstraints:\n-1000 <= a <= 1000, -100 <= b <= 100",
    difficulty: "easy",
    maxscore: 10,
    topic: "Exception Handling, Multithreading",
    subtopic: "try-catch Basics",
    inputconstrains: "-1000 <= a <= 1000, -100 <= b <= 100",
    sampleinput1: "20 4",
    sampleinput2: "7 0",
    input1: "99 10",
    input2: "-17 5",
    input3: "0 0",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    try {
        if (b == 0) {
            throw 0;
        }
        cout << "Quotient: " << a / b << endl;
        cout << "Remainder: " << a % b << endl;
    } catch (int) {
        cout << "Cannot divide by zero" << endl;
    }
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Error Code Thrower",
    description:
      "A status reader converts error codes into messages using exceptions. Read one integer code. When the code is 0, print the OK line; any other code is thrown as an int, and the catch handler reports it.\n\nInput Format:\nOne line with one integer: code.\n\nOutput Format:\nStatus: OK\nor, for a nonzero code:\nStatus: Error <code>\n\nConstraints:\n-1000 <= code <= 1000",
    difficulty: "easy",
    maxscore: 10,
    topic: "Exception Handling, Multithreading",
    subtopic: "Throwing Exceptions",
    inputconstrains: "-1000 <= code <= 1000",
    sampleinput1: "0",
    sampleinput2: "404",
    input1: "1",
    input2: "-9",
    input3: "500",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int code;
    cin >> code;
    try {
        if (code == 0) {
            cout << "Status: OK" << endl;
        } else {
            throw code;
        }
    } catch (int e) {
        cout << "Status: Error " << e << endl;
    }
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Unknown Trouble Catcher",
    description:
      "A sensor monitor demonstrates the catch-all handler. Read one integer mode. When mode is 0, print the normal line; otherwise throw a double value that no typed handler matches, so only the catch (...) handler can respond.\n\nInput Format:\nOne line with one integer: mode.\n\nOutput Format:\nSystem normal\nor, for a nonzero mode:\nUnknown exception caught\n\nConstraints:\n-100 <= mode <= 100",
    difficulty: "easy",
    maxscore: 10,
    topic: "Exception Handling, Multithreading",
    subtopic: "try-catch Basics",
    inputconstrains: "-100 <= mode <= 100",
    sampleinput1: "0",
    sampleinput2: "7",
    input1: "1",
    input2: "25",
    input3: "-5",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int mode;
    cin >> mode;
    try {
        if (mode == 0) {
            cout << "System normal" << endl;
        } else {
            throw mode / 10.0;
        }
    } catch (...) {
        cout << "Unknown exception caught" << endl;
    }
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Passphrase Door Guard",
    description:
      "A door lock rejects wrong passphrases by throwing a C-style string message. Read one word. When the word is exactly ATOM, print the unlocked line; otherwise throw the const char* message Wrong passphrase and let the catch(const char*) handler print it.\n\nInput Format:\nOne line with one word: the passphrase.\n\nOutput Format:\nDoor unlocked\nor:\nWrong passphrase\n\nConstraints:\n1 <= passphrase length <= 20",
    difficulty: "easy",
    maxscore: 10,
    topic: "Exception Handling, Multithreading",
    subtopic: "Throwing Exceptions",
    inputconstrains: "1 <= passphrase length <= 20",
    sampleinput1: "ATOM",
    sampleinput2: "HELLO",
    input1: "atom",
    input2: "CODE123",
    input3: "A",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string word;
    cin >> word;
    try {
        if (word == "ATOM") {
            cout << "Door unlocked" << endl;
        } else {
            throw "Wrong passphrase";
        }
    } catch (const char* msg) {
        cout << msg << endl;
    }
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Guarded Letter Lookup",
    description:
      "A text tool reads characters safely using string::at, which throws std::out_of_range for bad indexes. Read one word and one index. Inside a try block, print the character at that index using s.at(index); the catch handler for out_of_range prints the message carried by the caught exception using what().\n\nInput Format:\nOne line with a word (single word) and an integer index.\n\nOutput Format:\nLetter: <character at the index>\nor, when the index is outside the word:\nOut of range: <message from what()>\n\nConstraints:\n1 <= word length <= 20, 0 <= index <= 30",
    difficulty: "easy",
    maxscore: 10,
    topic: "Exception Handling, Multithreading",
    subtopic: "try-catch Basics",
    inputconstrains: "1 <= word length <= 20, 0 <= index <= 30",
    sampleinput1: "CODE 2",
    sampleinput2: "CODE 9",
    input1: "HELLO 0",
    input2: "AB 1",
    input3: "XYZ 3",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
#include <stdexcept>
using namespace std;

int main() {
    string s;
    int idx;
    cin >> s >> idx;
    try {
        char c = s.at(idx);
        cout << "Letter: " << c << endl;
    } catch (const out_of_range& e) {
        cout << "Out of range: " << e.what() << endl;
    }
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Motor Temperature Guard",
    description:
      "A plant monitor watches a motor's temperature with exceptions. Read one integer temperature. If it reaches 80 or more, throw runtime_error with the message Motor overheated; the catch handler prints Error: followed by the message from what(). Otherwise the motor is running fine.\n\nInput Format:\nOne line with one integer: temperature.\n\nOutput Format:\nMotor running at <temp> degrees\nor:\nError: Motor overheated\n\nConstraints:\n-100 <= temperature <= 200",
    difficulty: "easy",
    maxscore: 10,
    topic: "Exception Handling, Multithreading",
    subtopic: "Throwing Exceptions",
    inputconstrains: "-100 <= temperature <= 200",
    sampleinput1: "65",
    sampleinput2: "95",
    input1: "80",
    input2: "0",
    input3: "79",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <stdexcept>
using namespace std;

int main() {
    int temp;
    cin >> temp;
    try {
        if (temp >= 80) {
            throw runtime_error("Motor overheated");
        }
        cout << "Motor running at " << temp << " degrees" << endl;
    } catch (const runtime_error& e) {
        cout << "Error: " << e.what() << endl;
    }
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Cash Machine Withdrawal Guard",
    description:
      "An ATM processes a withdrawal inside a try block. Read the account balance and the withdrawal amount. If the amount exceeds the balance, throw runtime_error with the message Insufficient balance, and the catch handler prints the failure line. Otherwise the withdrawal succeeds and the remaining balance is shown.\n\nInput Format:\nOne line with two integers: balance and amount.\n\nOutput Format:\nWithdrawal successful\nRemaining balance: <balance - amount>\nor:\nWithdrawal failed: Insufficient balance\n\nConstraints:\n0 <= balance <= 1000000, 0 <= amount <= 1000000",
    difficulty: "easy",
    maxscore: 10,
    topic: "Exception Handling, Multithreading",
    subtopic: "try-catch Basics",
    inputconstrains: "0 <= balance <= 1000000, 0 <= amount <= 1000000",
    sampleinput1: "5000 2000",
    sampleinput2: "1000 2500",
    input1: "100 100",
    input2: "0 1",
    input3: "99999 50000",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <stdexcept>
using namespace std;

int main() {
    int balance, amount;
    cin >> balance >> amount;
    try {
        if (amount > balance) {
            throw runtime_error("Insufficient balance");
        }
        cout << "Withdrawal successful" << endl;
        cout << "Remaining balance: " << balance - amount << endl;
    } catch (const runtime_error& e) {
        cout << "Withdrawal failed: " << e.what() << endl;
    }
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Voting Age Validator",
    description:
      "A polling booth checks voter eligibility using exceptions. Read the age. If the age is below 18, throw the age value itself as an int; the catch(int) handler prints the rejection line showing the age. Otherwise the person is eligible to vote.\n\nInput Format:\nOne line with one integer: age.\n\nOutput Format:\nEligible to vote\nor:\nRejected: age <age> is below 18\n\nConstraints:\n0 <= age <= 120",
    difficulty: "easy",
    maxscore: 10,
    topic: "Exception Handling, Multithreading",
    subtopic: "Throwing Exceptions",
    inputconstrains: "0 <= age <= 120",
    sampleinput1: "19",
    sampleinput2: "15",
    input1: "18",
    input2: "0",
    input3: "65",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int age;
    cin >> age;
    try {
        if (age < 18) {
            throw age;
        }
        cout << "Eligible to vote" << endl;
    } catch (int a) {
        cout << "Rejected: age " << a << " is below 18" << endl;
    }
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Exam Marks Validator",
    description:
      "An exam cell rejects negative marks by throwing a string message. Read the marks. If the marks are negative, throw the string Negative marks not allowed and let the catch(const string&) handler print it. Otherwise the marks are recorded.\n\nInput Format:\nOne line with one integer: marks.\n\nOutput Format:\nMarks recorded: <marks>\nor:\nNegative marks not allowed\n\nConstraints:\n-100 <= marks <= 100",
    difficulty: "easy",
    maxscore: 10,
    topic: "Exception Handling, Multithreading",
    subtopic: "Throwing Exceptions",
    inputconstrains: "-100 <= marks <= 100",
    sampleinput1: "85",
    sampleinput2: "-4",
    input1: "0",
    input2: "100",
    input3: "-1",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    int marks;
    cin >> marks;
    try {
        if (marks < 0) {
            throw string("Negative marks not allowed");
        }
        cout << "Marks recorded: " << marks << endl;
    } catch (const string& e) {
        cout << e << endl;
    }
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Show Seat Booking Guard",
    description:
      "A theatre box office guards seat booking with try-catch. Read the seats available and the seats requested. If the requested count exceeds the available seats, throw the requested count as an int; the catch(int) handler prints the failure line. Otherwise the booking is confirmed.\n\nInput Format:\nOne line with two integers: available and requested.\n\nOutput Format:\nBooking confirmed: <requested> seats\nor:\nBooking failed: requested <requested> seats\n\nConstraints:\n0 <= available <= 500, 0 <= requested <= 500",
    difficulty: "easy",
    maxscore: 10,
    topic: "Exception Handling, Multithreading",
    subtopic: "try-catch Basics",
    inputconstrains: "0 <= available <= 500, 0 <= requested <= 500",
    sampleinput1: "10 4",
    sampleinput2: "2 5",
    input1: "5 5",
    input2: "0 1",
    input3: "100 100",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int available, requested;
    cin >> available >> requested;
    try {
        if (requested > available) {
            throw requested;
        }
        cout << "Booking confirmed: " << requested << " seats" << endl;
    } catch (int r) {
        cout << "Booking failed: requested " << r << " seats" << endl;
    }
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },

  // ----------------------------------------------------------------- medium
  {
    title: "Signal Fault Router",
    description:
      "A device monitor routes numeric signal codes to typed fault handlers. Read a signal code. Inside one try block: code 1 throws the integer 100; code 2 throws the text disk failure; code 3 throws an unnamed double fault; any other code is healthy. Use three catch handlers written in order — catch(int), catch(const char*) and catch(...) — each printing its own line.\n\nInput Format:\nOne line with one integer: signal code.\n\nOutput Format:\nOne line, depending on the code:\nInteger fault: 100 (code 1)\nText fault: disk failure (code 2)\nUnknown fault (code 3)\nSignal <code>: all clear (any other code)\n\nConstraints:\n0 <= code <= 9",
    difficulty: "medium",
    maxscore: 20,
    topic: "Exception Handling, Multithreading",
    subtopic: "Multiple Catch Blocks",
    inputconstrains: "0 <= code <= 9",
    sampleinput1: "1",
    sampleinput2: "3",
    input1: "2",
    input2: "7",
    input3: "0",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int code;
    cin >> code;
    try {
        if (code == 1) {
            throw 100;
        } else if (code == 2) {
            throw "disk failure";
        } else if (code == 3) {
            throw 9.9;
        } else {
            cout << "Signal " << code << ": all clear" << endl;
        }
    } catch (int e) {
        cout << "Integer fault: " << e << endl;
    } catch (const char* msg) {
        cout << "Text fault: " << msg << endl;
    } catch (...) {
        cout << "Unknown fault" << endl;
    }
    return 0;
}`,
    blacklist: "printf",
    whitelist: "try, catch, throw, cin, cout",
  },
  {
    title: "SalaryGuard Custom Exception",
    description:
      "The payroll service validates salaries with its own exception type. Define a class SalaryError that derives publicly from std::exception, stores a message and overrides what() to return it. Read one integer salary. Inside a try block: a salary of zero or less throws SalaryError with the message Salary must be positive; a salary above 1000000 throws SalaryError with the message Salary exceeds maximum; otherwise print the acceptance line. The catch(const SalaryError&) handler prints SalaryError: followed by what().\n\nInput Format:\nOne line with one integer: salary.\n\nOutput Format:\nSalary accepted: <salary>\nor:\nSalaryError: <message from what()>\n\nConstraints:\n-100000 <= salary <= 2000000",
    difficulty: "medium",
    maxscore: 20,
    topic: "Exception Handling, Multithreading",
    subtopic: "Custom Exceptions",
    inputconstrains: "-100000 <= salary <= 2000000",
    sampleinput1: "45000",
    sampleinput2: "-500",
    input1: "0",
    input2: "2000000",
    input3: "1000000",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <exception>
using namespace std;

class SalaryError : public exception {
private:
    const char* msg;
public:
    SalaryError(const char* m) : msg(m) {}
    const char* what() const noexcept override {
        return msg;
    }
};

int main() {
    int salary;
    cin >> salary;
    try {
        if (salary <= 0) {
            throw SalaryError("Salary must be positive");
        } else if (salary > 1000000) {
            throw SalaryError("Salary exceeds maximum");
        }
        cout << "Salary accepted: " << salary << endl;
    } catch (const SalaryError& e) {
        cout << "SalaryError: " << e.what() << endl;
    }
    return 0;
}`,
    blacklist: "printf",
    whitelist: "class, exception, what, throw, catch",
  },
  {
    title: "Payment Rethrow Logger",
    description:
      "A payment gateway logs failures at a low level and decides at a high level. Write a function processPayment(int amount): inside its own try block it prints Processed: <amount> when the amount is at most 10000, and otherwise throws runtime_error with the message limit exceeded. The function's catch (...) handler prints Log: payment failure recorded and then rethrows the very same exception using a bare throw;. In main, read the amount, call processPayment inside another try block, and its catch(const exception&) handler prints Final status: followed by what().\n\nInput Format:\nOne line with one integer: amount.\n\nOutput Format:\nProcessed: <amount>\nor, on failure, in this order:\nLog: payment failure recorded\nFinal status: limit exceeded\n\nConstraints:\n0 <= amount <= 1000000",
    difficulty: "medium",
    maxscore: 20,
    topic: "Exception Handling, Multithreading",
    subtopic: "Throwing Exceptions",
    inputconstrains: "0 <= amount <= 1000000",
    sampleinput1: "5000",
    sampleinput2: "25000",
    input1: "10000",
    input2: "10001",
    input3: "0",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <stdexcept>
using namespace std;

void processPayment(int amount) {
    try {
        if (amount > 10000) {
            throw runtime_error("limit exceeded");
        }
        cout << "Processed: " << amount << endl;
    } catch (...) {
        cout << "Log: payment failure recorded" << endl;
        throw;
    }
}

int main() {
    int amount;
    cin >> amount;
    try {
        processPayment(amount);
    } catch (const exception& e) {
        cout << "Final status: " << e.what() << endl;
    }
    return 0;
}`,
    blacklist: "printf",
    whitelist: "try, catch, throw, runtime_error, exception",
  },
  {
    title: "Nested Guard Converter",
    description:
      "A robot controller nests its guards. Read a mode number and print Mode: <mode> first. Then run an inner try inside an outer try: the inner block prints Steady state when mode is 0, and otherwise throws the mode value. The inner block has only a catch (...) handler, which prints Inner guard: unknown disturbance and converts the trouble by throwing the fixed integer code 9. The outer catch(int) handler then prints Outer handler took code 9.\n\nInput Format:\nOne line with one integer: mode.\n\nOutput Format:\nMode: <mode>\nthen either:\nSteady state\nor:\nInner guard: unknown disturbance\nOuter handler took code 9\n\nConstraints:\n-100 <= mode <= 100",
    difficulty: "medium",
    maxscore: 20,
    topic: "Exception Handling, Multithreading",
    subtopic: "try-catch Basics",
    inputconstrains: "-100 <= mode <= 100",
    sampleinput1: "0",
    sampleinput2: "5",
    input1: "1",
    input2: "100",
    input3: "-7",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int mode;
    cin >> mode;
    cout << "Mode: " << mode << endl;
    try {
        try {
            if (mode == 0) {
                cout << "Steady state" << endl;
            } else {
                throw mode;
            }
        } catch (...) {
            cout << "Inner guard: unknown disturbance" << endl;
            throw 9;
        }
    } catch (int code) {
        cout << "Outer handler took code " << code << endl;
    }
    return 0;
}`,
    blacklist: "printf",
    whitelist: "try, catch, throw, cin, cout",
  },
  {
    title: "Mini Command Processor",
    description:
      "A coding playground runs mini calculator commands. Read N, then process N commands one after another. Each command is a word followed by its numbers:\n- div a b: integer division a / b; when b is 0 the command throws runtime_error with the message divide by zero\n- sqrt x: the integer square root of x (the largest whole number r with r * r <= x); when x is negative the command throws runtime_error with the message negative input\n- any other command word throws runtime_error with the message unknown command\nWrap the processing of each command in its own try-catch so one failure never stops the rest. Print one line per command.\n\nInput Format:\nLine 1: integer N, the number of commands.\nNext N lines: one command per line. Invalid command words appear alone, with no numbers after them.\n\nOutput Format:\nN lines, each either:\nResult: <value>\nor:\nError: <message from what()>\n\nConstraints:\n1 <= N <= 20; div: 0 <= a <= 1000000, 0 <= b <= 1000; sqrt: -1000 <= x <= 100000",
    difficulty: "medium",
    maxscore: 20,
    topic: "Exception Handling, Multithreading",
    subtopic: "Throwing Exceptions",
    inputconstrains: "1 <= N <= 20; div: 0 <= a <= 1000000, 0 <= b <= 1000; sqrt: -1000 <= x <= 100000",
    sampleinput1: "3\ndiv 10 2\nsqrt 17\ndiv 5 0",
    sampleinput2: "4\nsqrt 0\ndiv 7 3\nmod\nsqrt -4",
    input1: "2\nsqrt 81\ndiv 100 9",
    input2: "3\ndiv 0 5\nsqrt 15\ndiv 12 0",
    input3: "2\npower\nsqrt -1",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
#include <stdexcept>
using namespace std;

int isqrt(int x) {
    int r = 0;
    while ((r + 1) * (r + 1) <= x) {
        r++;
    }
    return r;
}

int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) {
        string op;
        cin >> op;
        try {
            if (op == "div") {
                int a, b;
                cin >> a >> b;
                if (b == 0) {
                    throw runtime_error("divide by zero");
                }
                cout << "Result: " << a / b << endl;
            } else if (op == "sqrt") {
                int x;
                cin >> x;
                if (x < 0) {
                    throw runtime_error("negative input");
                }
                cout << "Result: " << isqrt(x) << endl;
            } else {
                throw runtime_error("unknown command");
            }
        } catch (const runtime_error& e) {
            cout << "Error: " << e.what() << endl;
        }
    }
    return 0;
}`,
    blacklist: "printf",
    whitelist: "try, catch, throw, runtime_error, string, cin, cout",
  },
  {
    title: "Bank Transfer Validator",
    description:
      "A banking backend validates transfers with two custom exception classes, both deriving from std::exception and overriding what(): InvalidAccount (message Invalid account number) and InsufficientFunds (message Insufficient funds). Read the balance, the account number and the amount. Inside a try block: an account outside 100000 to 999999 throws InvalidAccount; an amount greater than the balance throws InsufficientFunds; otherwise print the success line. Catch each exception type in its own handler, each printing Transfer failed: followed by what().\n\nInput Format:\nOne line with three integers: balance, account, amount.\n\nOutput Format:\nTransfer of <amount> to account <account> completed\nor:\nTransfer failed: Invalid account number\nor:\nTransfer failed: Insufficient funds\n\nConstraints:\n0 <= balance <= 1000000, 0 <= account <= 2000000, 0 <= amount <= 1000000",
    difficulty: "medium",
    maxscore: 20,
    topic: "Exception Handling, Multithreading",
    subtopic: "Custom Exceptions",
    inputconstrains: "0 <= balance <= 1000000, 0 <= account <= 2000000, 0 <= amount <= 1000000",
    sampleinput1: "5000 123456 1500",
    sampleinput2: "5000 1234 100",
    input1: "100 654321 200",
    input2: "10000 999999 10000",
    input3: "0 100000 0",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <exception>
using namespace std;

class InsufficientFunds : public exception {
public:
    const char* what() const noexcept override {
        return "Insufficient funds";
    }
};

class InvalidAccount : public exception {
public:
    const char* what() const noexcept override {
        return "Invalid account number";
    }
};

int main() {
    int balance, account, amount;
    cin >> balance >> account >> amount;
    try {
        if (account < 100000 || account > 999999) {
            throw InvalidAccount();
        } else if (amount > balance) {
            throw InsufficientFunds();
        }
        cout << "Transfer of " << amount << " to account " << account
             << " completed" << endl;
    } catch (const InvalidAccount& e) {
        cout << "Transfer failed: " << e.what() << endl;
    } catch (const InsufficientFunds& e) {
        cout << "Transfer failed: " << e.what() << endl;
    }
    return 0;
}`,
    blacklist: "printf",
    whitelist: "class, exception, what, try, catch, throw",
  },

  // ------------------------------------------------------------------- hard
  {
    title: "Mutex Range Summer",
    description:
      "A performance lab builds a shared counter protected by a mutex. Read three limits a, b and c. Launch three threads: thread 1 adds the numbers 1 to a, thread 2 adds 1 to b and thread 3 adds 1 to c. Every thread first computes its own partial sum into its own slot, then adds that partial sum to the shared total while holding a mutex with lock_guard. Join all three threads, and only after joining print each partial sum and the shared total.\n\nInput Format:\nOne line with three integers: a, b and c.\n\nOutput Format:\nThread 1 sum: <1 + 2 + ... + a>\nThread 2 sum: <1 + 2 + ... + b>\nThread 3 sum: <1 + 2 + ... + c>\nTotal: <sum of the three partial sums>\n\nConstraints:\n0 <= a, b, c <= 1000",
    difficulty: "hard",
    maxscore: 30,
    topic: "Exception Handling, Multithreading",
    subtopic: "Thread Synchronization",
    inputconstrains: "0 <= a, b, c <= 1000",
    sampleinput1: "3 4 5",
    sampleinput2: "10 20 30",
    input1: "1 1 1",
    input2: "1000 1000 1000",
    input3: "0 7 100",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <thread>
#include <mutex>
using namespace std;

long long sharedTotal = 0;
long long partialSum[3];
mutex totalMutex;

void addRange(int slot, int limit) {
    long long local = 0;
    for (int v = 1; v <= limit; v++) {
        local += v;
    }
    partialSum[slot] = local;
    lock_guard<mutex> lock(totalMutex);
    sharedTotal += local;
}

int main() {
    int a, b, c;
    cin >> a >> b >> c;
    thread t1(addRange, 0, a);
    thread t2(addRange, 1, b);
    thread t3(addRange, 2, c);
    t1.join();
    t2.join();
    t3.join();
    cout << "Thread 1 sum: " << partialSum[0] << endl;
    cout << "Thread 2 sum: " << partialSum[1] << endl;
    cout << "Thread 3 sum: " << partialSum[2] << endl;
    cout << "Total: " << sharedTotal << endl;
    return 0;
}`,
    blacklist: "printf, sleep",
    whitelist: "thread, mutex, lock_guard, join",
  },
  {
    title: "Parallel Array Sum Split",
    description:
      "A big array is split between two worker threads. Read N and then N integers. Thread A sums the first half (indices 0 to N/2 - 1) and thread B sums the second half (indices N/2 to N-1); each writes its result into its own slot. Join both threads, and only after joining print the two partial sums and the grand total.\n\nInput Format:\nLine 1: integer N.\nLine 2: N integers separated by spaces.\n\nOutput Format:\nFirst half: <sum of the first half>\nSecond half: <sum of the second half>\nTotal: <sum of all elements>\n\nConstraints:\n1 <= N <= 1000, -100000 <= element <= 100000",
    difficulty: "hard",
    maxscore: 30,
    topic: "Exception Handling, Multithreading",
    subtopic: "Creating Threads",
    inputconstrains: "1 <= N <= 1000, -100000 <= element <= 100000",
    sampleinput1: "4 10 20 30 40",
    sampleinput2: "5 1 2 3 4 5",
    input1: "1 999",
    input2: "6 -5 5 -10 10 0 0",
    input3: "3 100000 100000 100000",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <thread>
#include <vector>
using namespace std;

vector<int> values;
long long partialSum[2];

void sumRange(int slot, int lo, int hi) {
    long long s = 0;
    for (int i = lo; i < hi; i++) {
        s += values[i];
    }
    partialSum[slot] = s;
}

int main() {
    int n;
    cin >> n;
    values.resize(n);
    for (int i = 0; i < n; i++) {
        cin >> values[i];
    }
    int mid = n / 2;
    thread first(sumRange, 0, 0, mid);
    thread second(sumRange, 1, mid, n);
    first.join();
    second.join();
    cout << "First half: " << partialSum[0] << endl;
    cout << "Second half: " << partialSum[1] << endl;
    cout << "Total: " << partialSum[0] + partialSum[1] << endl;
    return 0;
}`,
    blacklist: "printf, async",
    whitelist: "thread, join, vector, cin, cout",
  },
  {
    title: "Transaction Hub Error Hierarchy",
    description:
      "A transaction hub routes operations through one processor function that throws typed errors. Build an exception hierarchy: a base class AppError deriving from std::exception that stores a message and overrides what(); class PaymentError deriving from AppError; class NetworkError deriving from AppError. The processor handles one integer code per transaction:\n- code 0 returns the text OK\n- code 1 throws PaymentError with the message payment declined\n- code 2 throws NetworkError with the message network timeout\n- any other code throws AppError with the message unknown code\nRead N and then N codes. For every transaction print one status line, catching the derived types before the base type.\n\nInput Format:\nLine 1: integer N.\nLine 2: N integer codes separated by spaces.\n\nOutput Format:\nN lines, each either:\nOp<i> OK\nor:\nOp<i> PAYMENT-FAIL payment declined\nor:\nOp<i> NETWORK-FAIL network timeout\nor:\nOp<i> APP-FAIL unknown code\nwhere i is the 1-based transaction number.\n\nConstraints:\n1 <= N <= 20, -100 <= code <= 100",
    difficulty: "hard",
    maxscore: 30,
    topic: "Exception Handling, Multithreading",
    subtopic: "Custom Exceptions",
    inputconstrains: "1 <= N <= 20, -100 <= code <= 100",
    sampleinput1: "4\n0 1 2 7",
    sampleinput2: "2\n0 0",
    input1: "3\n1 1 1",
    input2: "5\n2 0 9 1 2",
    input3: "1\n3",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <exception>
#include <string>
using namespace std;

class AppError : public exception {
private:
    string msg;
public:
    AppError(const string& m) : msg(m) {}
    const char* what() const noexcept override {
        return msg.c_str();
    }
};

class PaymentError : public AppError {
public:
    PaymentError(const string& m) : AppError(m) {}
};

class NetworkError : public AppError {
public:
    NetworkError(const string& m) : AppError(m) {}
};

string runTransaction(int code) {
    if (code == 0) {
        return "OK";
    } else if (code == 1) {
        throw PaymentError("payment declined");
    } else if (code == 2) {
        throw NetworkError("network timeout");
    } else {
        throw AppError("unknown code");
    }
}

int main() {
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        int code;
        cin >> code;
        try {
            string result = runTransaction(code);
            cout << "Op" << i << " " << result << endl;
        } catch (const PaymentError& e) {
            cout << "Op" << i << " PAYMENT-FAIL " << e.what() << endl;
        } catch (const NetworkError& e) {
            cout << "Op" << i << " NETWORK-FAIL " << e.what() << endl;
        } catch (const AppError& e) {
            cout << "Op" << i << " APP-FAIL " << e.what() << endl;
        }
    }
    return 0;
}`,
    blacklist: "printf",
    whitelist: "class, exception, what, try, catch, throw",
  },
  {
    title: "Synchronized Ticket Sellers",
    description:
      "A cinema box office runs three seller threads against one shared stock. Read the opening stock S and the share each seller must sell: s1, s2 and s3 (their sum never exceeds S). Each seller thread sells exactly its share one ticket at a time, locking a mutex with lock_guard for every single decrement of the shared stock, and counts its own sales into its own slot. Join all three threads, and only after joining print the per-seller sales and the remaining stock.\n\nInput Format:\nOne line with four integers: S, s1, s2 and s3.\n\nOutput Format:\nSeller 1 sold: <s1>\nSeller 2 sold: <s2>\nSeller 3 sold: <s3>\nRemaining stock: <S - s1 - s2 - s3>\n\nConstraints:\n3 <= S <= 100000, 1 <= s1, s2, s3 <= 1000, s1 + s2 + s3 <= S",
    difficulty: "hard",
    maxscore: 30,
    topic: "Exception Handling, Multithreading",
    subtopic: "Thread Synchronization",
    inputconstrains: "3 <= S <= 100000, 1 <= s1, s2, s3 <= 1000, s1 + s2 + s3 <= S",
    sampleinput1: "100 30 20 10",
    sampleinput2: "60 20 20 20",
    input1: "10 1 2 3",
    input2: "1000 500 400 100",
    input3: "100000 1000 1000 1000",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <thread>
#include <mutex>
using namespace std;

mutex stockMutex;
int stock = 0;
int soldCount[3];

void sellTickets(int slot, int share) {
    for (int i = 0; i < share; i++) {
        lock_guard<mutex> lock(stockMutex);
        if (stock > 0) {
            stock--;
            soldCount[slot]++;
        }
    }
}

int main() {
    int total, s1, s2, s3;
    cin >> total >> s1 >> s2 >> s3;
    stock = total;
    thread seller1(sellTickets, 0, s1);
    thread seller2(sellTickets, 1, s2);
    thread seller3(sellTickets, 2, s3);
    seller1.join();
    seller2.join();
    seller3.join();
    cout << "Seller 1 sold: " << soldCount[0] << endl;
    cout << "Seller 2 sold: " << soldCount[1] << endl;
    cout << "Seller 3 sold: " << soldCount[2] << endl;
    cout << "Remaining stock: " << stock << endl;
    return 0;
}`,
    blacklist: "printf, sleep",
    whitelist: "thread, mutex, lock_guard, join",
  },
];

export const mcqs = [
  // ------------------------------------------------------------------ easy
  {
    title: "Role of the try Block",
    description: "In a C++ try-catch arrangement, what is the role of the try block?",
    difficulty: "easy",
    topic: "Exception Handling, Multithreading",
    subtopic: "try-catch Basics",
    Option1: "It silently ignores every error inside it",
    Option2: "It encloses code whose exceptions can be handled by the catch handlers that follow it",
    Option3: "It declares new exception types",
    Option4: "It stops the program at the first statement",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Job of the throw Statement",
    description: "What does the throw statement do in C++?",
    difficulty: "easy",
    topic: "Exception Handling, Multithreading",
    subtopic: "Throwing Exceptions",
    Option1: "It catches an exception raised earlier",
    Option2: "It prints an error message and ends the program gracefully",
    Option3: "It signals an exception, transferring control to the nearest matching catch handler",
    Option4: "It converts an exception into a return code",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Meaning of catch(...)",
    description: "What does the catch (...) handler with an ellipsis do?",
    difficulty: "easy",
    topic: "Exception Handling, Multithreading",
    subtopic: "Multiple Catch Blocks",
    Option1: "It catches only integer exceptions",
    Option2: "It catches exceptions thrown only from main()",
    Option3: "It prevents exceptions from ever being thrown",
    Option4: "It catches an exception of any type",
    CorrectOption: 4,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Purpose of what()",
    description: "The what() member function of std::exception is used to:",
    difficulty: "easy",
    topic: "Exception Handling, Multithreading",
    subtopic: "Custom Exceptions",
    Option1: "Get a C-style string that describes the exception",
    Option2: "Get the line number where the error happened",
    Option3: "Get the runtime type of the exception",
    Option4: "Clear the exception state of the program",
    CorrectOption: 1,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "What Is a Thread",
    description: "Which statement best describes a thread in C++?",
    difficulty: "easy",
    topic: "Exception Handling, Multithreading",
    subtopic: "Creating Threads",
    Option1: "A separate process with its own address space",
    Option2: "The smallest unit of execution that runs concurrently inside a process and shares the process address space",
    Option3: "A compiled library loaded at runtime",
    Option4: "A special kind of loop that repeats itself",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "What thread join() Does",
    description: "What happens when the main thread calls t1.join() on a std::thread object t1?",
    difficulty: "easy",
    topic: "Exception Handling, Multithreading",
    subtopic: "Creating Threads",
    Option1: "Thread t1 is destroyed immediately",
    Option2: "The results of t1 are copied back to the caller",
    Option3: "The calling thread blocks until t1 finishes its execution",
    Option4: "Thread t1 is paused for one second",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Purpose of a Mutex",
    description: "Why is a mutex used in multithreaded C++ programs?",
    difficulty: "easy",
    topic: "Exception Handling, Multithreading",
    subtopic: "Thread Synchronization",
    Option1: "To make every thread run faster",
    Option2: "To ensure only one thread at a time can access the shared resource it protects",
    Option3: "To create worker threads automatically",
    Option4: "To print messages from many threads safely",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Uncaught Exception Outcome",
    description: "If an exception is thrown but no catch handler anywhere accepts it, what happens?",
    difficulty: "easy",
    topic: "Exception Handling, Multithreading",
    subtopic: "try-catch Basics",
    Option1: "The program ignores the exception and continues",
    Option2: "The exception is printed and execution resumes normally",
    Option3: "The runtime calls std::terminate and the program aborts",
    Option4: "The exception is converted into a compiler warning",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Header Needed for std::thread",
    description: "Which header must be included to create threads with std::thread?",
    difficulty: "easy",
    topic: "Exception Handling, Multithreading",
    subtopic: "Creating Threads",
    Option1: "<process>",
    Option2: "<mutex>",
    Option3: "<threading>",
    Option4: "<thread>",
    CorrectOption: 4,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Base Class of Standard Exceptions",
    description: "All standard C++ exception classes (such as std::runtime_error and std::out_of_range) inherit from which class?",
    difficulty: "easy",
    topic: "Exception Handling, Multithreading",
    subtopic: "Custom Exceptions",
    Option1: "std::exception",
    Option2: "std::error",
    Option3: "std::failure",
    Option4: "std::throwable",
    CorrectOption: 1,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },

  // ----------------------------------------------------------------- medium
  {
    title: "Int Handler Beats Catch-All",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "Exception Handling, Multithreading",
    subtopic: "Multiple Catch Blocks",
    Option1: "catch-all handler",
    Option2: "int handler catch-all handler",
    Option3: "int handler 7",
    Option4: "Compile error",
    CorrectOption: 3,
    codesnippet: `#include <iostream>
using namespace std;
int main() {
    try {
        throw 7;
    } catch (int e) {
        cout << "int handler " << e;
    } catch (...) {
        cout << "catch-all handler";
    }
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nint main() {\n    try {\n        throw 7;\n    } catch (int e) {\n        cout << "int handler " << e;\n    } catch (...) {\n        cout << "catch-all handler";\n    }\n    return 0;\n}`,
      stdin: "",
      expected: "int handler 7",
    },
  },
  {
    title: "Custom Exception Message via what()",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "Exception Handling, Multithreading",
    subtopic: "Custom Exceptions",
    Option1: "Denied: balance too low",
    Option2: "Denied: LowBalance",
    Option3: "balance too low",
    Option4: "Compile error",
    CorrectOption: 1,
    codesnippet: `#include <iostream>
#include <exception>
using namespace std;
class LowBalance : public exception {
public:
    const char* what() const noexcept override {
        return "balance too low";
    }
};
int main() {
    try {
        throw LowBalance();
    } catch (const exception& e) {
        cout << "Denied: " << e.what();
    }
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\n#include <exception>\nusing namespace std;\nclass LowBalance : public exception {\npublic:\n    const char* what() const noexcept override {\n        return "balance too low";\n    }\n};\nint main() {\n    try {\n        throw LowBalance();\n    } catch (const exception& e) {\n        cout << "Denied: " << e.what();\n    }\n    return 0;\n}`,
      stdin: "",
      expected: "Denied: balance too low",
    },
  },
  {
    title: "No Double to Int Handler Match",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "Exception Handling, Multithreading",
    subtopic: "Multiple Catch Blocks",
    Option1: "int 2",
    Option2: "generic handler",
    Option3: "int 2.5",
    Option4: "No output",
    CorrectOption: 2,
    codesnippet: `#include <iostream>
using namespace std;
int main() {
    try {
        throw 2.5;
    } catch (int e) {
        cout << "int " << e;
    } catch (...) {
        cout << "generic handler";
    }
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nint main() {\n    try {\n        throw 2.5;\n    } catch (int e) {\n        cout << "int " << e;\n    } catch (...) {\n        cout << "generic handler";\n    }\n    return 0;\n}`,
      stdin: "",
      expected: "generic handler",
    },
  },
  {
    title: "Inner Catch Converts for Outer",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "Exception Handling, Multithreading",
    subtopic: "try-catch Basics",
    Option1: "outer got converted",
    Option2: "inner caught converted",
    Option3: "inner caught outer got converted",
    Option4: "Compile error",
    CorrectOption: 3,
    codesnippet: `#include <iostream>
#include <string>
using namespace std;
int main() {
    try {
        try {
            throw 3.14;
        } catch (...) {
            cout << "inner caught ";
            throw string("converted");
        }
    } catch (const string& s) {
        cout << "outer got " << s;
    }
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    try {\n        try {\n            throw 3.14;\n        } catch (...) {\n            cout << "inner caught ";\n            throw string("converted");\n        }\n    } catch (const string& s) {\n        cout << "outer got " << s;\n    }\n    return 0;\n}`,
      stdin: "",
      expected: "inner caught outer got converted",
    },
  },
  {
    title: "Stack Unwinding Meaning",
    description: "In C++, what does stack unwinding refer to when an exception is thrown?",
    difficulty: "medium",
    topic: "Exception Handling, Multithreading",
    subtopic: "Throwing Exceptions",
    Option1: "The program restarts execution from the first line of main",
    Option2: "Every function on the call stack is called again in reverse order",
    Option3: "As the call stack is searched for a matching handler, local objects in each exited scope are destroyed in reverse order",
    Option4: "The stack memory is released without calling any destructors",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Why Catch by const Reference",
    description: "Why is catching exceptions by const reference, as in catch (const MyError& e), the recommended style?",
    difficulty: "medium",
    topic: "Exception Handling, Multithreading",
    subtopic: "Custom Exceptions",
    Option1: "It is the only syntax the standard allows for user-defined exceptions",
    Option2: "It makes the exception travel faster through the stack",
    Option3: "References never bind to temporaries, so bad throws are rejected at compile time",
    Option4: "It avoids object slicing and unnecessary copies while preserving polymorphic behaviour",
    CorrectOption: 4,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },

  // ------------------------------------------------------------------- hard
  {
    title: "Base Handler Catches Derived Object",
    description: "What does this program print? Look carefully at the order of the two handlers.",
    difficulty: "hard",
    topic: "Exception Handling, Multithreading",
    subtopic: "Multiple Catch Blocks",
    Option1: "derived handler",
    Option2: "base handler",
    Option3: "base handler derived handler",
    Option4: "Compile error",
    CorrectOption: 2,
    codesnippet: `#include <iostream>
using namespace std;
class AppError { };
class NetworkError : public AppError { };
int main() {
    try {
        throw NetworkError();
    } catch (AppError&) {
        cout << "base handler";
    } catch (NetworkError&) {
        cout << "derived handler";
    }
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nclass AppError { };\nclass NetworkError : public AppError { };\nint main() {\n    try {\n        throw NetworkError();\n    } catch (AppError&) {\n        cout << "base handler";\n    } catch (NetworkError&) {\n        cout << "derived handler";\n    }\n    return 0;\n}`,
      stdin: "",
      expected: "base handler",
    },
  },
  {
    title: "Throw Inside Catch Escapes Outer",
    description: "What does this program print?",
    difficulty: "hard",
    topic: "Exception Handling, Multithreading",
    subtopic: "try-catch Basics",
    Option1: "caught inner boom",
    Option2: "caught inner boom outer caught inner boom",
    Option3: "outer caught outer boom",
    Option4: "caught inner boom outer caught outer boom",
    CorrectOption: 4,
    codesnippet: `#include <iostream>
#include <stdexcept>
using namespace std;
int main() {
    try {
        try {
            throw runtime_error("inner boom");
        } catch (const exception& e) {
            cout << "caught " << e.what() << " ";
            throw runtime_error("outer boom");
        }
    } catch (const exception& e) {
        cout << "outer caught " << e.what();
    }
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\n#include <stdexcept>\nusing namespace std;\nint main() {\n    try {\n        try {\n            throw runtime_error("inner boom");\n        } catch (const exception& e) {\n            cout << "caught " << e.what() << " ";\n            throw runtime_error("outer boom");\n        }\n    } catch (const exception& e) {\n        cout << "outer caught " << e.what();\n    }\n    return 0;\n}`,
      stdin: "",
      expected: "caught inner boom outer caught outer boom",
    },
  },
  {
    title: "Bare Rethrow Keeps Original",
    description: "What does this program print?",
    difficulty: "hard",
    topic: "Exception Handling, Multithreading",
    subtopic: "Throwing Exceptions",
    Option1: "logged bad code",
    Option2: "logged",
    Option3: "bad code logged",
    Option4: "logged bad code bad code",
    CorrectOption: 1,
    codesnippet: `#include <iostream>
#include <stdexcept>
using namespace std;
int main() {
    try {
        try {
            throw invalid_argument("bad code");
        } catch (...) {
            cout << "logged ";
            throw;
        }
    } catch (const exception& e) {
        cout << e.what();
    }
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\n#include <stdexcept>\nusing namespace std;\nint main() {\n    try {\n        try {\n            throw invalid_argument("bad code");\n        } catch (...) {\n            cout << "logged ";\n            throw;\n        }\n    } catch (const exception& e) {\n        cout << e.what();\n    }\n    return 0;\n}`,
      stdin: "",
      expected: "logged bad code",
    },
  },
  {
    title: "What Is a Data Race",
    description: "What is a data race in a multithreaded C++ program?",
    difficulty: "hard",
    topic: "Exception Handling, Multithreading",
    subtopic: "Thread Synchronization",
    Option1: "Two threads finishing their work at different speeds",
    Option2: "Two threads using two different mutexes for the same data",
    Option3: "Two threads accessing the same memory location concurrently without synchronization, at least one of them writing, which makes the result undefined",
    Option4: "A thread that finishes before join() is called on it",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
];
