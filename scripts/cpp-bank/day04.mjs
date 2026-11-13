/**
 * OOPS using CPP — Day 4: Looping Statements (for, while, do-while)
 * 20 code questions (10 easy: 6 basics + 4 real-world, 6 medium, 4 hard)
 * 20 MCQs (10 easy, 6 medium, 4 hard)
 * All solutions are fresh C++ written for this course (no conversions).
 */
export const meta = {
  day: 4,
  topic: "Looping Statements",
};

export const code = [
  // ------------------------------------------------------------------ easy
  {
    title: "Print Numbers from 1 to N",
    description:
      "A gallery exhibit features a number column that lights up from 1 to N. Read N and print every integer from 1 to N, one per line.\n\nInput Format:\nOne line with one integer: N.\n\nOutput Format:\nN lines, containing the numbers 1, 2, 3, ..., N in order, one number per line.\n\nConstraints:\n1 <= N <= 1000",
    difficulty: "easy",
    maxscore: 10,
    topic: "Looping Statements",
    subtopic: "for Loop",
    inputconstrains: "1 <= N <= 1000",
    sampleinput1: "5",
    sampleinput2: "1",
    input1: "3",
    input2: "10",
    input3: "7",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        cout << i << endl;
    }
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Natural Number Sum with for Loop",
    description:
      "A warehouse robot stacks crates: level 1 holds 1 crate, level 2 holds 2 crates, and so on up to level N. Read N and print the total number of crates in the stack (1 + 2 + ... + N), computed with a loop.\n\nInput Format:\nOne line with one integer: N.\n\nOutput Format:\nSum of 1 to <N>: <total>\n\nConstraints:\n1 <= N <= 10000",
    difficulty: "easy",
    maxscore: 10,
    topic: "Looping Statements",
    subtopic: "for Loop",
    inputconstrains: "1 <= N <= 10000",
    sampleinput1: "5",
    sampleinput2: "10",
    input1: "1",
    input2: "100",
    input3: "9999",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    long long sum = 0;
    for (int i = 1; i <= n; i++) {
        sum += i;
    }
    cout << "Sum of 1 to " << n << ": " << sum << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Multiplication Table of N",
    description:
      "A math tutor app draws the multiplication table of a number. Read N and print its table from N x 1 up to N x 10, one line per product.\n\nInput Format:\nOne line with one integer: N.\n\nOutput Format:\n10 lines of the form <N> x <i> = <product> for i from 1 to 10.\n\nConstraints:\n1 <= N <= 20",
    difficulty: "easy",
    maxscore: 10,
    topic: "Looping Statements",
    subtopic: "for Loop",
    inputconstrains: "1 <= N <= 20",
    sampleinput1: "7",
    sampleinput2: "1",
    input1: "12",
    input2: "20",
    input3: "9",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    for (int i = 1; i <= 10; i++) {
        cout << n << " x " << i << " = " << n * i << endl;
    }
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Sum of Even Numbers up to N",
    description:
      "A stadium LED ribbon flashes every even seat number before a match. Read N and print the sum of all even numbers from 1 up to N (2 + 4 + 6 + ...), computed with a while loop.\n\nInput Format:\nOne line with one integer: N.\n\nOutput Format:\nEven sum up to <N>: <sum>\n\nConstraints:\n1 <= N <= 10000",
    difficulty: "easy",
    maxscore: 10,
    topic: "Looping Statements",
    subtopic: "while Loop",
    inputconstrains: "1 <= N <= 10000",
    sampleinput1: "10",
    sampleinput2: "7",
    input1: "1",
    input2: "100",
    input3: "9",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    long long sum = 0;
    int i = 2;
    while (i <= n) {
        sum += i;
        i += 2;
    }
    cout << "Even sum up to " << n << ": " << sum << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Count Digits of a Number",
    description:
      "A bank teller verifies account numbers by counting their digits. Read a non-negative integer and print how many digits it has. Use a do-while loop so that 0 is correctly counted as 1 digit.\n\nInput Format:\nOne line with one non-negative integer.\n\nOutput Format:\nDigits: <count>\n\nConstraints:\n0 <= number <= 2000000000",
    difficulty: "easy",
    maxscore: 10,
    topic: "Looping Statements",
    subtopic: "do-while Loop",
    inputconstrains: "0 <= number <= 2000000000",
    sampleinput1: "45721",
    sampleinput2: "0",
    input1: "7",
    input2: "100000",
    input3: "999999999",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    long long n;
    cin >> n;
    int digits = 0;
    do {
        digits++;
        n /= 10;
    } while (n > 0);
    cout << "Digits: " << digits << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Reverse the Digits of a Number",
    description:
      "A mirror-lock app unlocks when the user types the reverse of a code number. Read a non-negative integer and print its digits reversed as a number (reversing 1200 gives 21 because leading zeros disappear).\n\nInput Format:\nOne line with one non-negative integer.\n\nOutput Format:\nReversed: <reversed number>\n\nConstraints:\n0 <= number <= 2000000000",
    difficulty: "easy",
    maxscore: 10,
    topic: "Looping Statements",
    subtopic: "while Loop",
    inputconstrains: "0 <= number <= 2000000000",
    sampleinput1: "1234",
    sampleinput2: "1200",
    input1: "0",
    input2: "5",
    input3: "1000000000",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    long long n;
    cin >> n;
    long long reversed = 0;
    while (n > 0) {
        reversed = reversed * 10 + n % 10;
        n /= 10;
    }
    cout << "Reversed: " << reversed << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Daily Calorie Target Tracker",
    description:
      "A fitness app tracks calories against a daily target. Read the number of days N and the calorie target T, then the calories eaten on each day. Print the cumulative total after every day, then the total consumed and whether the target was reached.\n\nInput Format:\nFirst token: N (number of days). Second token: the target T. Then N integers: calories consumed each day.\n\nOutput Format:\nDay <i>: <cumulative total> (one line per day)\nTotal consumed: <sum>\nTarget: <T>\nStatus: Target met (when the total is at least T) or Status: Below target\n\nConstraints:\n1 <= N <= 31, 0 <= each calorie value <= 5000, 0 <= T <= 200000",
    difficulty: "easy",
    maxscore: 10,
    topic: "Looping Statements",
    subtopic: "Loop Design and Counting",
    inputconstrains:
      "1 <= N <= 31, 0 <= calories <= 5000, 0 <= target <= 200000",
    sampleinput1: "3 2000 1500 800 400",
    sampleinput2: "2 3000 1200 1000",
    input1: "1 100 100",
    input2: "5 5000 1000 1000 1000 1000 1000",
    input3: "4 1500 300 300 300 300",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int n, target;
    cin >> n >> target;
    long long total = 0;
    for (int i = 1; i <= n; i++) {
        int calories;
        cin >> calories;
        total += calories;
        cout << "Day " << i << ": " << total << endl;
    }
    cout << "Total consumed: " << total << endl;
    cout << "Target: " << target << endl;
    if (total >= target) {
        cout << "Status: Target met" << endl;
    } else {
        cout << "Status: Below target" << endl;
    }
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Step Counter Weekly Report",
    description:
      "A pedometer app reviews a training block of N days. Read N and then N step counts. Print each day's steps together with the running total, then the block total and the best day (highest count; the earliest day wins a tie).\n\nInput Format:\nFirst token: N. Then N integers: steps walked each day.\n\nOutput Format:\nDay <i>: <steps> (total <running total>) (one line per day)\nTotal steps: <total>\nBest day: <day> (<best count> steps)\n\nConstraints:\n1 <= N <= 100, 0 <= steps <= 100000",
    difficulty: "easy",
    maxscore: 10,
    topic: "Looping Statements",
    subtopic: "Loop Design and Counting",
    inputconstrains: "1 <= N <= 100, 0 <= steps <= 100000",
    sampleinput1: "3 5000 7000 6000",
    sampleinput2: "1 250",
    input1: "4 100 100 100 100",
    input2: "5 9000 0 10000 3000 10000",
    input3: "2 0 0",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    long long total = 0;
    int bestDay = 1;
    int bestVal = -1;
    for (int i = 1; i <= n; i++) {
        int steps;
        cin >> steps;
        total += steps;
        cout << "Day " << i << ": " << steps << " (total " << total << ")" << endl;
        if (steps > bestVal) {
            bestVal = steps;
            bestDay = i;
        }
    }
    cout << "Total steps: " << total << endl;
    cout << "Best day: " << bestDay << " (" << bestVal << " steps)" << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Weekly Savings Growth",
    description:
      "A student drops a fixed amount into a savings jar every week. Read the number of weeks N and the weekly deposit D, then print the jar balance after every week and the final savings.\n\nInput Format:\nFirst token: N (number of weeks). Second token: D (weekly deposit).\n\nOutput Format:\nWeek <i>: balance <balance> (one line per week)\nFinal savings: <final balance>\n\nConstraints:\n1 <= N <= 52, 1 <= D <= 5000",
    difficulty: "easy",
    maxscore: 10,
    topic: "Looping Statements",
    subtopic: "for Loop",
    inputconstrains: "1 <= weeks <= 52, 1 <= deposit <= 5000",
    sampleinput1: "4 100",
    sampleinput2: "1 250",
    input1: "52 10",
    input2: "3 500",
    input3: "6 25",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int weeks, deposit;
    cin >> weeks >> deposit;
    long long balance = 0;
    for (int i = 1; i <= weeks; i++) {
        balance += deposit;
        cout << "Week " << i << ": balance " << balance << endl;
    }
    cout << "Final savings: " << balance << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Queue Token Printer",
    description:
      "A bank token dispenser prints queue tokens for waiting customers. Read N and print tokens TOK-1 up to TOK-N using a do-while loop, then report how many tokens were printed.\n\nInput Format:\nOne line with one integer: N.\n\nOutput Format:\nOne line per token: TOK-1, TOK-2, ..., TOK-N\nTokens printed: <N>\n\nConstraints:\n1 <= N <= 200",
    difficulty: "easy",
    maxscore: 10,
    topic: "Looping Statements",
    subtopic: "do-while Loop",
    inputconstrains: "1 <= N <= 200",
    sampleinput1: "3",
    sampleinput2: "1",
    input1: "5",
    input2: "10",
    input3: "12",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int i = 1;
    do {
        cout << "TOK-" << i << endl;
        i++;
    } while (i <= n);
    cout << "Tokens printed: " << n << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },

  // ----------------------------------------------------------------- medium
  {
    title: "Factorial and Trailing Zeros",
    description:
      "A puzzle factory stamps gift boxes with every distinct arrangement of N items, which is N factorial. The quality team also records how many trailing zeros appear on the printed label. Read N, compute N! with a loop, then count its trailing zeros by repeatedly dividing by 10 while the last digit is 0.\n\nInput Format:\nOne line with one integer: N.\n\nOutput Format:\nFactorial: <N factorial>\nTrailing zeros: <count>\n\nConstraints:\n0 <= N <= 12 (0! is 1 and has no trailing zeros)",
    difficulty: "medium",
    maxscore: 20,
    topic: "Looping Statements",
    subtopic: "for Loop",
    inputconstrains: "0 <= N <= 12",
    sampleinput1: "5",
    sampleinput2: "10",
    input1: "0",
    input2: "12",
    input3: "7",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    long long factorial = 1;
    for (int i = 2; i <= n; i++) {
        factorial *= i;
    }
    int zeros = 0;
    long long temp = factorial;
    while (temp > 0 && temp % 10 == 0) {
        zeros++;
        temp /= 10;
    }
    cout << "Factorial: " << factorial << endl;
    cout << "Trailing zeros: " << zeros << endl;
    return 0;
}`,
    blacklist: "printf, pow(",
    whitelist: "for, while, cin, cout",
  },
  {
    title: "Prime Keys in a Range",
    description:
      "A cybersecurity trainer generates prime demo keys. Read a range A to B inclusive and print every prime in it in ascending order on one line, then the count. Each number is tested by trying divisors d while d * d is at most the number.\n\nInput Format:\nOne line with two integers: A and B.\n\nOutput Format:\nPrimes: <p1> <p2> ... <pk> (print none when the range has no primes)\nCount: <k>\n\nConstraints:\n1 <= A <= B <= 500",
    difficulty: "medium",
    maxscore: 20,
    topic: "Looping Statements",
    subtopic: "while Loop",
    inputconstrains: "1 <= A <= B <= 500",
    sampleinput1: "10 20",
    sampleinput2: "1 10",
    input1: "1 1",
    input2: "2 2",
    input3: "90 100",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    int count = 0;
    cout << "Primes:";
    for (int n = a; n <= b; n++) {
        if (n < 2) {
            continue;
        }
        bool isPrime = true;
        int d = 2;
        while (d * d <= n) {
            if (n % d == 0) {
                isPrime = false;
                break;
            }
            d++;
        }
        if (isPrime) {
            cout << " " << n;
            count++;
        }
    }
    if (count == 0) {
        cout << " none";
    }
    cout << endl;
    cout << "Count: " << count << endl;
    return 0;
}`,
    blacklist: "printf, pow(",
    whitelist: "for, while, if, cin, cout",
  },
  {
    title: "Digit Sum and Product Machine",
    description:
      "A bank card validator inspects account numbers. Read a non-negative integer and compute the sum of its digits and the product of its digits with a do-while loop, so the number 0 is processed as the single digit 0 (sum 0 and product 0).\n\nInput Format:\nOne line with one non-negative integer.\n\nOutput Format:\nDigit sum: <sum>\nDigit product: <product>\n\nConstraints:\n0 <= number <= 2000000000",
    difficulty: "medium",
    maxscore: 20,
    topic: "Looping Statements",
    subtopic: "do-while Loop",
    inputconstrains: "0 <= number <= 2000000000",
    sampleinput1: "4321",
    sampleinput2: "105",
    input1: "0",
    input2: "99999",
    input3: "7777",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    long long n;
    cin >> n;
    int sum = 0;
    long long product = 1;
    do {
        int digit = (int)(n % 10);
        sum += digit;
        product *= digit;
        n /= 10;
    } while (n > 0);
    cout << "Digit sum: " << sum << endl;
    cout << "Digit product: " << product << endl;
    return 0;
}`,
    blacklist: "printf, pow(",
    whitelist: "while, cin, cout, long long",
  },
  {
    title: "ATM Transaction Session",
    description:
      "An ATM processes a session of withdrawal requests. The log starts with N (the number of records) and a starting balance B, followed by N record amounts processed in order with a do-while loop. An amount within the current balance is approved and deducted; anything larger is declined. A record equal to -1 means the session was cancelled: print the cancellation line and stop processing immediately, ignoring any remaining records.\n\nInput Format:\nFirst token: N. Second token: starting balance B. Then N integers, each an amount between 0 and 100000 or the cancel marker -1.\n\nOutput Format:\nOne line per processed record: TXN <i>: Approved, balance <new balance> or TXN <i>: Declined\nWhen cancelled: Cancelled at record <i>\nProcessed: <number of records actually processed>\nFinal balance: <balance>\n\nConstraints:\n1 <= N <= 50, 0 <= B <= 100000",
    difficulty: "medium",
    maxscore: 20,
    topic: "Looping Statements",
    subtopic: "do-while Loop",
    inputconstrains:
      "1 <= N <= 50, 0 <= balance <= 100000, 0 <= amount <= 100000 or -1",
    sampleinput1: "4 1000 300 500 400 200",
    sampleinput2: "3 500 600 -1 999",
    input1: "1 100 100",
    input2: "2 0 0 0",
    input3: "3 250 -1 -1 -1",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int n;
    long long balance;
    cin >> n >> balance;
    int processed = 0;
    int record = 1;
    do {
        long long amount;
        cin >> amount;
        if (amount == -1) {
            cout << "Cancelled at record " << record << endl;
            break;
        }
        if (amount <= balance) {
            balance -= amount;
            cout << "TXN " << record << ": Approved, balance " << balance << endl;
        } else {
            cout << "TXN " << record << ": Declined" << endl;
        }
        processed++;
        record++;
    } while (record <= n);
    cout << "Processed: " << processed << endl;
    cout << "Final balance: " << balance << endl;
    return 0;
}`,
    blacklist: "printf, pow(",
    whitelist: "while, break, cin, cout",
  },
  {
    title: "Fibonacci Series Printer",
    description:
      "A beekeeper models colony growth with the Fibonacci sequence 0, 1, 1, 2, 3, 5, ... where every term is the sum of the two before it. Read K and print the first K terms on one line separated by single spaces, then how many terms were printed.\n\nInput Format:\nOne line with one integer: K.\n\nOutput Format:\nThe first K Fibonacci terms separated by single spaces\nTerms: <K>\n\nConstraints:\n1 <= K <= 30",
    difficulty: "medium",
    maxscore: 20,
    topic: "Looping Statements",
    subtopic: "for Loop",
    inputconstrains: "1 <= K <= 30",
    sampleinput1: "6",
    sampleinput2: "1",
    input1: "2",
    input2: "10",
    input3: "30",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int k;
    cin >> k;
    long long a = 0;
    long long b = 1;
    for (int i = 1; i <= k; i++) {
        if (i > 1) {
            cout << " ";
        }
        cout << a;
        long long next = a + b;
        a = b;
        b = next;
    }
    cout << endl;
    cout << "Terms: " << k << endl;
    return 0;
}`,
    blacklist: "printf, pow(",
    whitelist: "for, if, cin, cout",
  },
  {
    title: "Battery Drain Cycle Counter",
    description:
      "A drone battery simulator drains charge in fixed steps. The battery starts at P percent and loses R percent every cycle, never going below 0, and each cycle prints the remaining charge. Draining stops once the remaining charge is no longer above the cutoff threshold T. Simulate the drain with a do-while loop and report the cycles used.\n\nInput Format:\nOne line with three integers: P (start percent), R (drain per cycle) and T (cutoff threshold).\n\nOutput Format:\nOne line per cycle: Cycle <i>: <remaining>%\nCycles used: <count>\nFinal charge: <remaining>%\n\nConstraints:\n0 <= T < P <= 100, 1 <= R <= 100",
    difficulty: "medium",
    maxscore: 20,
    topic: "Looping Statements",
    subtopic: "do-while Loop",
    inputconstrains: "0 <= T < P <= 100, 1 <= R <= 100",
    sampleinput1: "100 25 20",
    sampleinput2: "60 10 25",
    input1: "50 50 10",
    input2: "80 3 74",
    input3: "99 1 0",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int percent, drain, cutoff;
    cin >> percent >> drain >> cutoff;
    int cycles = 0;
    do {
        percent -= drain;
        if (percent < 0) {
            percent = 0;
        }
        cycles++;
        cout << "Cycle " << cycles << ": " << percent << "%" << endl;
    } while (percent > cutoff);
    cout << "Cycles used: " << cycles << endl;
    cout << "Final charge: " << percent << "%" << endl;
    return 0;
}`,
    blacklist: "printf, pow(",
    whitelist: "while, if, cin, cout",
  },

  // ------------------------------------------------------------------- hard
  {
    title: "Vending Machine Change Dispenser",
    description:
      "A vending machine dispenses change using the denominations 500, 100, 50, 10, 5 and 1, always taking as many of the largest denomination as possible before moving to the next one. The day log starts with N (the maximum number of customers) followed by one refund amount per customer, and the very last token of the log is -1. For every customer the machine prints its denomination breakdown, and at the end of the day it prints the accumulated totals per denomination. Processing stops after N customers or at the -1 marker, whichever comes first.\n\nInput Format:\nFirst token: N. Then the refund amounts (one per customer), with the final token -1 marking the end of the log.\n\nOutput Format:\nFor each customer:\nCustomer <i>: <amount>\n  500 x <a>, 100 x <b>, 50 x <c>, 10 x <d>, 5 x <e>, 1 x <f>\nAfter all customers:\nDenomination totals:\n500: <total>\n100: <total>\n50: <total>\n10: <total>\n5: <total>\n1: <total>\nCustomers served: <count>\n\nConstraints:\n1 <= N <= 20, 1 <= amount <= 5000, the log always ends with -1",
    difficulty: "hard",
    maxscore: 30,
    topic: "Looping Statements",
    subtopic: "Nested Loops",
    inputconstrains:
      "1 <= N <= 20, 1 <= amount <= 5000, log ends with -1",
    sampleinput1: "3 123 45 678 -1",
    sampleinput2: "2 1000 -1",
    input1: "1 1 -1",
    input2: "4 999 1 2500 77 -1",
    input3: "5 5000 3 100 10 -1",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int denoms[6] = {500, 100, 50, 10, 5, 1};
    long long totals[6] = {0, 0, 0, 0, 0, 0};
    int served = 0;
    int customer = 1;
    while (customer <= n) {
        long long amount;
        cin >> amount;
        if (amount == -1) {
            break;
        }
        long long remaining = amount;
        long long counts[6] = {0, 0, 0, 0, 0, 0};
        for (int d = 0; d < 6; d++) {
            counts[d] = remaining / denoms[d];
            remaining %= denoms[d];
            totals[d] += counts[d];
        }
        cout << "Customer " << customer << ": " << amount << endl;
        cout << "  500 x " << counts[0]
             << ", 100 x " << counts[1]
             << ", 50 x " << counts[2]
             << ", 10 x " << counts[3]
             << ", 5 x " << counts[4]
             << ", 1 x " << counts[5] << endl;
        served++;
        customer++;
    }
    cout << "Denomination totals:" << endl;
    for (int d = 0; d < 6; d++) {
        cout << denoms[d] << ": " << totals[d] << endl;
    }
    cout << "Customers served: " << served << endl;
    return 0;
}`,
    blacklist: "printf, pow(",
    whitelist: "while, for, break, cin, cout",
  },
  {
    title: "Delivery Route Analyzer",
    description:
      "A courier company reviews its delivery routes. The input gives D (days) and S (stops per day), then D groups of S integers: kilometres covered at each stop. For each day print the day total and its longest stop (earliest stop wins a tie). After all days print the grand total, the average per day with two decimals, and the busiest day (largest day total; earliest day wins a tie).\n\nInput Format:\nOne line with two integers: D and S. Then D x S integers: stop distances in km, day by day.\n\nOutput Format:\nDay <i>: total <T> km, longest stop <j> (<max> km) (one line per day)\nTotal distance: <grand total> km\nAverage per day: <average with 2 decimals> km\nBusiest day: <day> (<max total> km)\n\nConstraints:\n1 <= D <= 10, 1 <= S <= 20, 0 <= each stop <= 500",
    difficulty: "hard",
    maxscore: 30,
    topic: "Looping Statements",
    subtopic: "Nested Loops",
    inputconstrains: "1 <= D <= 10, 1 <= S <= 20, 0 <= stop km <= 500",
    sampleinput1: "3 4 10 20 5 8 30 5 5 2 12 12 0 1",
    sampleinput2: "1 1 42",
    input1: "2 3 0 0 0 100 0 0",
    input2: "3 2 7 7 7 7 7 7",
    input3: "4 1 5 3 9 2",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    int days, stops;
    cin >> days >> stops;
    long long grand = 0;
    int busiestDay = 1;
    long long bestTotal = -1;
    for (int day = 1; day <= days; day++) {
        long long dayTotal = 0;
        int longestStop = 1;
        int longestVal = -1;
        for (int stop = 1; stop <= stops; stop++) {
            int km;
            cin >> km;
            dayTotal += km;
            if (km > longestVal) {
                longestVal = km;
                longestStop = stop;
            }
        }
        grand += dayTotal;
        cout << "Day " << day << ": total " << dayTotal
             << " km, longest stop " << longestStop
             << " (" << longestVal << " km)" << endl;
        if (dayTotal > bestTotal) {
            bestTotal = dayTotal;
            busiestDay = day;
        }
    }
    double average = (double)grand / days;
    cout << "Total distance: " << grand << " km" << endl;
    cout << fixed << setprecision(2) << "Average per day: " << average << " km" << endl;
    cout << "Busiest day: " << busiestDay << " (" << bestTotal << " km)" << endl;
    return 0;
}`,
    blacklist: "printf, pow(",
    whitelist: "for, if, cin, cout, fixed, setprecision",
  },
  {
    title: "Esports Scoreboard Aggregator",
    description:
      "A tournament desk types player scores into a scoreboard and finishes the list by typing the sentinel -1 (real scores are between 0 and 100, so -1 can never be a score). After the sentinel is read, print how many players were recorded, the highest score, the lowest score, the average with two decimals, and how many players scored strictly above the average.\n\nInput Format:\nA sequence of integers (0 to 100 each) terminated by -1. At least one score appears before the sentinel.\n\nOutput Format:\nPlayers: <count>\nHighest: <max>\nLowest: <min>\nAverage: <average with 2 decimals>\nAbove average: <count>\n\nConstraints:\n1 <= number of scores <= 1000, 0 <= score <= 100, the input always ends with -1",
    difficulty: "hard",
    maxscore: 30,
    topic: "Looping Statements",
    subtopic: "Loop Design and Counting",
    inputconstrains:
      "1 <= scores <= 1000, 0 <= score <= 100, input ends with -1",
    sampleinput1: "70 90 85 -1",
    sampleinput2: "50 50 50 -1",
    input1: "100 -1",
    input2: "10 20 30 40 100 -1",
    input3: "0 0 100 100 50 -1",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    int scores[2000];
    int count = 0;
    long long sum = 0;
    int s;
    cin >> s;
    while (s != -1) {
        scores[count] = s;
        count++;
        sum += s;
        cin >> s;
    }
    int highest = scores[0];
    int lowest = scores[0];
    for (int i = 1; i < count; i++) {
        if (scores[i] > highest) {
            highest = scores[i];
        }
        if (scores[i] < lowest) {
            lowest = scores[i];
        }
    }
    double average = (double)sum / count;
    int above = 0;
    for (int i = 0; i < count; i++) {
        if (scores[i] > average) {
            above++;
        }
    }
    cout << "Players: " << count << endl;
    cout << "Highest: " << highest << endl;
    cout << "Lowest: " << lowest << endl;
    cout << fixed << setprecision(2) << "Average: " << average << endl;
    cout << "Above average: " << above << endl;
    return 0;
}`,
    blacklist: "printf, pow(",
    whitelist: "while, for, if, cin, cout, fixed",
  },
  {
    title: "Keypad Letter Combinations Counter",
    description:
      "An old keypad phone maps digits to letters: 2 to ABC, 3 to DEF, 4 to GHI, 5 to JKL, 6 to MNO and 8 to TUV (3 letters each), 7 to PQRS and 9 to WXYZ (4 letters each), while 0 and 1 map to no letters at all. A locker app converts a numeric passcode: for every digit, read left to right, it prints how many letters that digit can produce, and the total number of possible letter combinations is the product of all per-digit counts (any 0 or 1 digit makes the total 0).\n\nInput Format:\nOne token: the passcode as a string of 1 to 10 digits (characters 0 to 9).\n\nOutput Format:\nOne line per digit: Digit <d>: <letters> letters (for 0 and 1: Digit <d>: no letters)\nTotal letter combinations: <product>\n\nConstraints:\n1 <= length of passcode <= 10, every character is a digit 0 to 9",
    difficulty: "hard",
    maxscore: 30,
    topic: "Looping Statements",
    subtopic: "Loop Design and Counting",
    inputconstrains: "1 <= length <= 10, digits 0-9",
    sampleinput1: "724",
    sampleinput2: "915",
    input1: "2",
    input2: "000",
    input3: "9999999999",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string code;
    cin >> code;
    long long combinations = 1;
    for (int i = 0; i < (int)code.length(); i++) {
        int digit = code[i] - '0';
        int letters;
        if (digit == 7 || digit == 9) {
            letters = 4;
        } else if (digit == 0 || digit == 1) {
            letters = 0;
        } else {
            letters = 3;
        }
        if (letters == 0) {
            cout << "Digit " << digit << ": no letters" << endl;
        } else {
            cout << "Digit " << digit << ": " << letters << " letters" << endl;
        }
        combinations *= letters;
    }
    cout << "Total letter combinations: " << combinations << endl;
    return 0;
}`,
    blacklist: "printf, pow(",
    whitelist: "for, if, cin, cout, string",
  },
];

export const mcqs = [
  // ------------------------------------------------------------------ easy
  {
    title: "Loop That Always Executes Once",
    description:
      "Which loop construct guarantees that its body executes at least once, even when the condition is false from the start?",
    difficulty: "easy",
    topic: "Looping Statements",
    subtopic: "do-while Loop",
    Option1: "for loop",
    Option2: "while loop",
    Option3: "do-while loop",
    Option4: "goto statement",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "for Loop Update Part",
    description:
      "In the header for (initialization; condition; update), when does the update expression run?",
    difficulty: "easy",
    topic: "Looping Statements",
    subtopic: "for Loop",
    Option1: "Before the first iteration",
    Option2: "After each execution of the body, just before the condition is re-checked",
    Option3: "Only when the loop finishes",
    Option4: "It never runs automatically",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Spot the Infinite Loop",
    description: "Which of these for statements never stops on its own?",
    difficulty: "easy",
    topic: "Looping Statements",
    subtopic: "for Loop",
    Option1: "for (int i = 0; i < 10; i++)",
    Option2: "for (int i = 10; i > 0; i--)",
    Option3: "for (int i = 0; i < 10; i--)",
    Option4: "for (int i = 0; i < 5; i++)",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Effect of continue",
    description: "What does continue do when executed inside a loop body?",
    difficulty: "easy",
    topic: "Looping Statements",
    subtopic: "Loop Control with break and continue",
    Option1: "Terminates the loop entirely",
    Option2: "Skips the rest of the current iteration and moves on to the next iteration",
    Option3: "Restarts the loop from its initialization step",
    Option4: "Exits the whole program",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Effect of break",
    description: "What does break do when executed inside a loop body?",
    difficulty: "easy",
    topic: "Looping Statements",
    subtopic: "Loop Control with break and continue",
    Option1: "Skips only the current iteration",
    Option2: "Restarts the loop from the beginning",
    Option3: "Pauses the loop until new input arrives",
    Option4: "Terminates the loop immediately",
    CorrectOption: 4,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "while Condition Timing",
    description: "In a while loop, when is the condition evaluated?",
    difficulty: "easy",
    topic: "Looping Statements",
    subtopic: "while Loop",
    Option1: "Once, before the loop begins",
    Option2: "Before every iteration, including the first",
    Option3: "After every iteration, but not before the first",
    Option4: "Only when break or continue is used",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Scope of the Loop Variable",
    description:
      "Where can a variable declared in the header of a for loop, as in for (int i = 0; i < n; i++), be used?",
    difficulty: "easy",
    topic: "Looping Statements",
    subtopic: "for Loop",
    Option1: "Anywhere in the program",
    Option2: "Only inside the for statement, meaning its header and body",
    Option3: "Everywhere in main, after the loop too",
    Option4: "Only inside other loops",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "do-while Statement Terminator",
    description: "How must the condition part of a do-while loop be written?",
    difficulty: "easy",
    topic: "Looping Statements",
    subtopic: "do-while Loop",
    Option1: "while (condition); with a trailing semicolon",
    Option2: "while (condition) without any punctuation",
    Option3: "end while;",
    Option4: "while: condition",
    CorrectOption: 1,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Iteration Count of a Counted Loop",
    description:
      "How many times does the body of for (int i = 0; i < 5; i++) execute?",
    difficulty: "easy",
    topic: "Looping Statements",
    subtopic: "for Loop",
    Option1: "4",
    Option2: "6",
    Option3: "It depends on the compiler",
    Option4: "5",
    CorrectOption: 4,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Best Loop for Known Repetitions",
    description:
      "A program must repeat a block exactly N times, where N is known before the loop starts. Which loop is the most natural choice?",
    difficulty: "easy",
    topic: "Looping Statements",
    subtopic: "Loop Design and Counting",
    Option1: "while with a manually updated counter",
    Option2: "do-while",
    Option3: "A chain of if-else statements",
    Option4: "for",
    CorrectOption: 4,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },

  // ----------------------------------------------------------------- medium
  {
    title: "Loop Counter After the Loop",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "Looping Statements",
    subtopic: "for Loop",
    Option1: "4",
    Option2: "5",
    Option3: "1",
    Option4: "Compile error",
    CorrectOption: 2,
    codesnippet: `#include <iostream>
using namespace std;
int main() {
    int i;
    for (i = 1; i <= 4; i++) {
    }
    cout << i;
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nint main() {\n    int i;\n    for (i = 1; i <= 4; i++) {\n    }\n    cout << i;\n    return 0;\n}`,
      stdin: "",
      expected: "5",
    },
  },
  {
    title: "break in Nested Loops",
    description:
      "What does this program print? Remember that break exits only the loop it appears in.",
    difficulty: "medium",
    topic: "Looping Statements",
    subtopic: "Loop Control with break and continue",
    Option1: "112131",
    Option2: "112233",
    Option3: "111213",
    Option4: "11213131",
    CorrectOption: 1,
    codesnippet: `#include <iostream>
using namespace std;
int main() {
    for (int i = 1; i <= 3; i++) {
        for (int j = 1; j <= 3; j++) {
            if (j == 2) break;
            cout << i << j;
        }
    }
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nint main() {\n    for (int i = 1; i <= 3; i++) {\n        for (int j = 1; j <= 3; j++) {\n            if (j == 2) break;\n            cout << i << j;\n        }\n    }\n    return 0;\n}`,
      stdin: "",
      expected: "112131",
    },
  },
  {
    title: "Decrementing Loop with continue",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "Looping Statements",
    subtopic: "Loop Control with break and continue",
    Option1: "852",
    Option2: "8",
    Option3: "82",
    Option4: "825",
    CorrectOption: 3,
    codesnippet: `#include <iostream>
using namespace std;
int main() {
    for (int i = 8; i >= 1; i -= 3) {
        if (i == 5) continue;
        cout << i;
    }
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nint main() {\n    for (int i = 8; i >= 1; i -= 3) {\n        if (i == 5) continue;\n        cout << i;\n    }\n    return 0;\n}`,
      stdin: "",
      expected: "82",
    },
  },
  {
    title: "do-while with False Condition",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "Looping Statements",
    subtopic: "do-while Loop",
    Option1: "10",
    Option2: "1011",
    Option3: "11",
    Option4: "It prints nothing",
    CorrectOption: 1,
    codesnippet: `#include <iostream>
using namespace std;
int main() {
    int x = 10;
    do {
        cout << x;
        x++;
    } while (x < 10);
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nint main() {\n    int x = 10;\n    do {\n        cout << x;\n        x++;\n    } while (x < 10);\n    return 0;\n}`,
      stdin: "",
      expected: "10",
    },
  },
  {
    title: "Inclusive Loop Bound Condition",
    description:
      "A loop starts at i = 1 and must process every number from 1 through n inclusive. Which condition is correct?",
    difficulty: "medium",
    topic: "Looping Statements",
    subtopic: "for Loop",
    Option1: "i < n",
    Option2: "i <= n",
    Option3: "i < n - 1",
    Option4: "i > n",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Comma Operator in for Update",
    description:
      "In the header for (int i = 0, j = 10; i < j; i++, j--), what happens in the update section of each iteration?",
    difficulty: "medium",
    topic: "Looping Statements",
    subtopic: "for Loop",
    Option1: "Only i++ runs; j-- is ignored",
    Option2: "Only j-- runs; i++ is ignored",
    Option3: "Both run: i increases by 1 and j decreases by 1",
    Option4: "Compile error: an update section cannot contain two expressions",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },

  // ------------------------------------------------------------------- hard
  {
    title: "Nested Loop Total Ticks",
    description: "What does this program print?",
    difficulty: "hard",
    topic: "Looping Statements",
    subtopic: "Nested Loops",
    Option1: "16",
    Option2: "10",
    Option3: "6",
    Option4: "4",
    CorrectOption: 2,
    codesnippet: `#include <iostream>
using namespace std;
int main() {
    int count = 0;
    for (int i = 1; i <= 4; i++) {
        for (int j = i; j <= 4; j++) {
            count++;
        }
    }
    cout << count;
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nint main() {\n    int count = 0;\n    for (int i = 1; i <= 4; i++) {\n        for (int j = i; j <= 4; j++) {\n            count++;\n        }\n    }\n    cout << count;\n    return 0;\n}`,
      stdin: "",
      expected: "10",
    },
  },
  {
    title: "Break Path in Nested While",
    description: "What does this program print?",
    difficulty: "hard",
    topic: "Looping Statements",
    subtopic: "Loop Control with break and continue",
    Option1: "122",
    Option2: "123236",
    Option3: "123456",
    Option4: "129",
    CorrectOption: 1,
    codesnippet: `#include <iostream>
using namespace std;
int main() {
    int i = 1;
    while (i <= 3) {
        int j = 1;
        while (j <= 3) {
            if (i * j > 2) break;
            cout << i * j;
            j++;
        }
        i++;
    }
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nint main() {\n    int i = 1;\n    while (i <= 3) {\n        int j = 1;\n        while (j <= 3) {\n            if (i * j > 2) break;\n            cout << i * j;\n            j++;\n        }\n        i++;\n    }\n    return 0;\n}`,
      stdin: "",
      expected: "122",
    },
  },
  {
    title: "Skip Multiples of Three",
    description: "What does this program print?",
    difficulty: "hard",
    topic: "Looping Statements",
    subtopic: "Loop Control with break and continue",
    Option1: "36",
    Option2: "30",
    Option3: "27",
    Option4: "33",
    CorrectOption: 3,
    codesnippet: `#include <iostream>
using namespace std;
int main() {
    int sum = 0;
    for (int i = 1; i <= 8; i++) {
        if (i % 3 == 0) continue;
        sum += i;
    }
    cout << sum;
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nint main() {\n    int sum = 0;\n    for (int i = 1; i <= 8; i++) {\n        if (i % 3 == 0) continue;\n        sum += i;\n    }\n    cout << sum;\n    return 0;\n}`,
      stdin: "",
      expected: "27",
    },
  },
  {
    title: "Re-declaring the Loop Variable",
    description:
      "A main function contains two loops written one after the other, and both headers declare for (int i = 0; ...). What does standard C++ say about this?",
    difficulty: "hard",
    topic: "Looping Statements",
    subtopic: "for Loop",
    Option1: "It is legal: each for loop creates its own scope, so both can declare their own i",
    Option2: "It is illegal: the second loop redefines i",
    Option3: "It is legal only if the first loop body is empty",
    Option4: "It compiles, but the second loop keeps the value i had when the first loop ended",
    CorrectOption: 1,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
];
