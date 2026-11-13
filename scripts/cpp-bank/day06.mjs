/**
 * OOPS using CPP — Day 6: Recursion (Understand and Implement Recursion, Inline Functions)
 * 20 code questions (10 easy: 6 basics + 4 real-world, 6 medium, 4 hard)
 * 20 MCQs (10 easy, 6 medium, 4 hard)
 * All solutions are fresh C++ written for this course (no conversions).
 */
export const meta = {
  day: 6,
  topic: "Recursion",
};

export const code = [
  // ------------------------------------------------------------------ easy
  {
    title: "Recursive Sum to N",
    description:
      "A maths mentor app builds a warm-up drill where the running total of all points from 1 to N is produced by a function that calls itself with N-1 until it reaches 0. Read N and print the recursive total. The core logic must use recursion, not loops.\n\nInput Format:\nOne line with one integer: N.\n\nOutput Format:\nSum 1..N is <total>\n\nConstraints:\n0 <= N <= 1000",
    difficulty: "easy",
    maxscore: 10,
    topic: "Recursion",
    subtopic: "Recursion Basics",
    inputconstrains: "0 <= N <= 1000",
    sampleinput1: "10",
    sampleinput2: "1",
    input1: "0",
    input2: "7",
    input3: "100",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

// recursion adds each number down to the base case 0
long long sumTo(int n) {
    if (n == 0) {
        return 0;
    }
    return n + sumTo(n - 1);
}

int main() {
    int n;
    cin >> n;
    cout << "Sum 1..N is " << sumTo(n) << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Recursive Factorial Finder",
    description:
      "A chemistry lab counts possible arrangements of sample trays and needs factorials computed by recursion: N! = N * (N-1)!, stopping at 0! = 1. Read N and print N! using a function that calls itself.\n\nInput Format:\nOne line with one integer: N.\n\nOutput Format:\nFactorial of <N> is <result>\n\nConstraints:\n0 <= N <= 15",
    difficulty: "easy",
    maxscore: 10,
    topic: "Recursion",
    subtopic: "Mathematical Recursion",
    inputconstrains: "0 <= N <= 15",
    sampleinput1: "5",
    sampleinput2: "0",
    input1: "1",
    input2: "10",
    input3: "12",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

// recursion multiplies down to the base case 0! = 1
long long factorial(int n) {
    if (n == 0) {
        return 1;
    }
    return n * factorial(n - 1);
}

int main() {
    int n;
    cin >> n;
    cout << "Factorial of " << n << " is " << factorial(n) << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Recursive Descending List",
    description:
      "A launchpad test bench prints its test indices in reverse order as a recursion warm-up. Read N and print the numbers from N down to 1 on a single line separated by single spaces, using a recursive function.\n\nInput Format:\nOne line with one integer: N.\n\nOutput Format:\nOne line with N, N-1, ..., 1 separated by single spaces.\n\nConstraints:\n1 <= N <= 1000",
    difficulty: "easy",
    maxscore: 10,
    topic: "Recursion",
    subtopic: "Recursion Basics",
    inputconstrains: "1 <= N <= 1000",
    sampleinput1: "5",
    sampleinput2: "8",
    input1: "1",
    input2: "10",
    input3: "1000",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

// recursion prints the current number then dives to the next smaller one
void printDescending(int n) {
    if (n == 1) {
        cout << 1 << endl;
        return;
    }
    cout << n << " ";
    printDescending(n - 1);
}

int main() {
    int n;
    cin >> n;
    printDescending(n);
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Rocket Countdown Liftoff",
    description:
      "A college space club simulator fires a rocket with a recursive countdown: each call prints its own count and then calls itself with one less, until the base case prints the launch call. Read the starting count N and print the countdown.\n\nInput Format:\nOne line with one integer: N.\n\nOutput Format:\nOne number per line from N down to 1, then the line Liftoff!\n\nConstraints:\n1 <= N <= 30",
    difficulty: "easy",
    maxscore: 10,
    topic: "Recursion",
    subtopic: "Base and Recursive Case",
    inputconstrains: "1 <= N <= 30",
    sampleinput1: "3",
    sampleinput2: "5",
    input1: "1",
    input2: "12",
    input3: "30",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

// recursion counts down; the base case fires the rocket
void countdown(int n) {
    if (n == 0) {
        cout << "Liftoff!" << endl;
        return;
    }
    cout << n << endl;
    countdown(n - 1);
}

int main() {
    int n;
    cin >> n;
    countdown(n);
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Recursive Power of X",
    description:
      "An embedded systems lab computes sensor scaling factors x^n with a recursive power function that multiplies the base n times and returns 1 when the exponent hits 0. Read the base and the exponent.\n\nInput Format:\nOne line with two integers: base x and exponent n.\n\nOutput Format:\nPower result: <x^n>\n\nConstraints:\n1 <= x <= 9, 0 <= n <= 15",
    difficulty: "easy",
    maxscore: 10,
    topic: "Recursion",
    subtopic: "Mathematical Recursion",
    inputconstrains: "1 <= x <= 9, 0 <= n <= 15",
    sampleinput1: "2 10",
    sampleinput2: "3 4",
    input1: "5 0",
    input2: "7 3",
    input3: "9 12",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

// recursion multiplies the base until the exponent reaches 0
long long power(long long base, int exponent) {
    if (exponent == 0) {
        return 1;
    }
    return base * power(base, exponent - 1);
}

int main() {
    long long base;
    int exponent;
    cin >> base >> exponent;
    cout << "Power result: " << power(base, exponent) << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Recursive Digit Counter",
    description:
      "A water meter portal counts how many digits a reading contains using recursion: each call strips the last digit and adds 1, and any single-digit number (including 0) counts as 1 digit. Read N and print the count.\n\nInput Format:\nOne line with one integer: N.\n\nOutput Format:\nDigit count: <c>\n\nConstraints:\n0 <= N <= 1000000",
    difficulty: "easy",
    maxscore: 10,
    topic: "Recursion",
    subtopic: "Recursion Basics",
    inputconstrains: "0 <= N <= 1000000",
    sampleinput1: "4567",
    sampleinput2: "7",
    input1: "0",
    input2: "999999",
    input3: "100000",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

// recursion removes one digit per call until a single digit remains
int countDigits(long long n) {
    if (n < 10) {
        return 1;
    }
    return 1 + countDigits(n / 10);
}

int main() {
    long long n;
    cin >> n;
    cout << "Digit count: " << countDigits(n) << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Backup Folder Size Sum",
    description:
      "A backup tool inspects a folder holding N files and totals their sizes recursively: every call reads one size into the running total and then recurses on the rest. Read N and then N sizes, and print the folder report.\n\nInput Format:\nFirst line: N. Second line: N integers (sizes in MB).\n\nOutput Format:\nFiles: <N>\nTotal size: <total> MB\n\nConstraints:\n0 <= N <= 1000, 0 <= each size <= 5000",
    difficulty: "easy",
    maxscore: 10,
    topic: "Recursion",
    subtopic: "Recursion on Arrays",
    inputconstrains: "0 <= N <= 1000, 0 <= each size <= 5000",
    sampleinput1: "3\n5 7 2",
    sampleinput2: "1\n100",
    input1: "0",
    input2: "4\n10 20 30 40",
    input3: "5\n1 2 3 4 5",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

// recursion reads one size per call and accumulates through a reference
void readSizes(long long &total, int remaining) {
    if (remaining == 0) {
        return;
    }
    long long size;
    cin >> size;
    total += size;
    readSizes(total, remaining - 1);
}

int main() {
    int n;
    cin >> n;
    long long total = 0;
    readSizes(total, n);
    cout << "Files: " << n << endl;
    cout << "Total size: " << total << " MB" << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Committee Approval Chain",
    description:
      "A student committee passes a budget request upward through N approval levels: the recursive call dives to level 0 first, and each level then records its approval as the stack unwinds, so the approvals appear from level 1 up to level N. Read N and simulate the chain.\n\nInput Format:\nOne line with one integer: N.\n\nOutput Format:\nApproval chain started\nLevel 1 approved\nLevel 2 approved\n...\nLevel <N> approved\nFinal decision recorded\n\nConstraints:\n1 <= N <= 10",
    difficulty: "easy",
    maxscore: 10,
    topic: "Recursion",
    subtopic: "Base and Recursive Case",
    inputconstrains: "1 <= N <= 10",
    sampleinput1: "3",
    sampleinput2: "1",
    input1: "2",
    input2: "4",
    input3: "10",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

// recursion dives to the top of the chain first, approvals print on the way back
void approve(int level) {
    if (level == 0) {
        return;
    }
    approve(level - 1);
    cout << "Level " << level << " approved" << endl;
}

int main() {
    int n;
    cin >> n;
    cout << "Approval chain started" << endl;
    approve(n);
    cout << "Final decision recorded" << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Task Dependency Chain",
    description:
      "A build server runs a dependency chain: subtask N needs subtask N-1 finished first, and subtask 1 has no dependency. A recursive function prints Subtask k started before diving into k-1 and prints Subtask k done after that call returns, then the parent line closes the trace. Read N and print the full trace.\n\nInput Format:\nOne line with one integer: N.\n\nOutput Format:\nSubtask <N> started down to Subtask 1 started, then Subtask 1 done up to Subtask <N> done, then the line Main task complete (one started line and one done line per subtask).\n\nConstraints:\n1 <= N <= 30",
    difficulty: "easy",
    maxscore: 10,
    topic: "Recursion",
    subtopic: "Base and Recursive Case",
    inputconstrains: "1 <= N <= 30",
    sampleinput1: "3",
    sampleinput2: "1",
    input1: "2",
    input2: "4",
    input3: "8",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

// recursion shows the started line before diving and the done line after returning
void runTask(int k) {
    if (k == 0) {
        return;
    }
    cout << "Subtask " << k << " started" << endl;
    runTask(k - 1);
    cout << "Subtask " << k << " done" << endl;
}

int main() {
    int n;
    cin >> n;
    runTask(n);
    cout << "Main task complete" << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Recursive Kitchen Timer",
    description:
      "A smart kitchen timer ticks second by second with recursion, showing the remaining time in minutes:seconds form (seconds always shown as two digits) until it reaches zero. Read the total seconds S and print the full tick trace.\n\nInput Format:\nOne line with one integer: S.\n\nOutput Format:\nTimer set\nTime left: <m>:<ss>   (one line per remaining second, from S down to 1)\nTime up: 00:00\n\nConstraints:\n0 <= S <= 300",
    difficulty: "easy",
    maxscore: 10,
    topic: "Recursion",
    subtopic: "Recursion Basics",
    inputconstrains: "0 <= S <= 300",
    sampleinput1: "2",
    sampleinput2: "5",
    input1: "0",
    input2: "62",
    input3: "125",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

// recursion ticks one second per call and formats minutes and seconds
void tick(int secondsLeft) {
    if (secondsLeft == 0) {
        cout << "Time up: 00:00" << endl;
        return;
    }
    int m = secondsLeft / 60;
    int s = secondsLeft % 60;
    cout << "Time left: " << m << ":" << (s < 10 ? "0" : "") << s << endl;
    tick(secondsLeft - 1);
}

int main() {
    int total;
    cin >> total;
    cout << "Timer set" << endl;
    tick(total);
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },

  // ----------------------------------------------------------------- medium
  {
    title: "Fibonacci Worksheet Generator",
    description:
      "A maths tutor app builds a practice worksheet with the first K Fibonacci numbers (starting 0, 1, 1, 2, 3, ...). Every term must come from a recursive fib function and the series must be printed by a recursive printer, so no loops are allowed anywhere.\n\nInput Format:\nOne line with one integer: K.\n\nOutput Format:\nFibonacci series: <first K terms separated by single spaces>\nTerms printed: <K>\n\nConstraints:\n1 <= K <= 25",
    difficulty: "medium",
    maxscore: 20,
    topic: "Recursion",
    subtopic: "Mathematical Recursion",
    inputconstrains: "1 <= K <= 25",
    sampleinput1: "7",
    sampleinput2: "1",
    input1: "10",
    input2: "2",
    input3: "25",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

// recursion computes each term from the two terms preceding it
long long fib(int n) {
    if (n < 2) {
        return n;
    }
    return fib(n - 1) + fib(n - 2);
}

// recursion prints term by term with a single space between terms
void printSeries(int i, int last) {
    if (i > last) {
        return;
    }
    cout << fib(i);
    if (i < last) {
        cout << " ";
    }
    printSeries(i + 1, last);
}

int main() {
    int k;
    cin >> k;
    cout << "Fibonacci series: ";
    printSeries(0, k - 1);
    cout << endl;
    cout << "Terms printed: " << k << endl;
    return 0;
}`,
    blacklist: "while, for",
    whitelist: "if, return, recursion",
  },
  {
    title: "Plank Cutting GCD",
    description:
      "A carpentry workshop cuts two plank lengths into the largest identical tiles with zero waste: that tile size is the greatest common divisor of the two lengths, found with the recursive Euclid method gcd(a, b) = gcd(b, a mod b) until b becomes 0. Read the two lengths and print the tile size.\n\nInput Format:\nOne line with two integers: length A and length B.\n\nOutput Format:\nTile size: <gcd> cm\n\nConstraints:\n1 <= A, B <= 100000",
    difficulty: "medium",
    maxscore: 20,
    topic: "Recursion",
    subtopic: "Mathematical Recursion",
    inputconstrains: "1 <= A, B <= 100000",
    sampleinput1: "48 18",
    sampleinput2: "100 75",
    input1: "17 5",
    input2: "12 12",
    input3: "100000 75000",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

// recursion applies the Euclid identity until the second length hits 0
long long gcd(long long a, long long b) {
    if (b == 0) {
        return a;
    }
    return gcd(b, a % b);
}

int main() {
    long long a, b;
    cin >> a >> b;
    cout << "Tile size: " << gcd(a, b) << " cm" << endl;
    return 0;
}`,
    blacklist: "printf, __gcd",
    whitelist: "cin, cout, if, return",
  },
  {
    title: "Vanity Number Analyzer",
    description:
      "A car showroom's vanity number desk analyses a customer's favourite number with two recursive functions: one sums the digits (peeling one digit per call) and one builds the mirror form of the number. Read N and print both results.\n\nInput Format:\nOne line with one integer: N.\n\nOutput Format:\nDigit sum: <sum>\nMirror number: <reversed digits as an integer>\n\nConstraints:\n1 <= N <= 999999. The mirror is built as an integer, so trailing zeros of N disappear (e.g. 120 mirrors to 21).",
    difficulty: "medium",
    maxscore: 20,
    topic: "Recursion",
    subtopic: "Recursion Basics",
    inputconstrains: "1 <= N <= 999999",
    sampleinput1: "472",
    sampleinput2: "9",
    input1: "100",
    input2: "120",
    input3: "999999",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

// recursion peels one digit per call to build the digit sum
long long digitSum(long long n) {
    if (n < 10) {
        return n;
    }
    return n % 10 + digitSum(n / 10);
}

// recursion appends the last digit to the accumulated mirror
long long mirror(long long n, long long acc) {
    if (n == 0) {
        return acc;
    }
    return mirror(n / 10, acc * 10 + n % 10);
}

int main() {
    long long n;
    cin >> n;
    cout << "Digit sum: " << digitSum(n) << endl;
    cout << "Mirror number: " << mirror(n, 0) << endl;
    return 0;
}`,
    blacklist: "while, for",
    whitelist: "if, return, recursion, cout",
  },
  {
    title: "Palindrome Plate Checker",
    description:
      "A regional transport office checks whether a proposed registration plate reads the same in both directions. A recursive checker compares the outermost characters and moves both ends inward until they cross. Read the plate (a single word) and report the verdict.\n\nInput Format:\nOne line with one word: the plate text.\n\nOutput Format:\nPalindrome: Yes\nor\nPalindrome: No\n\nConstraints:\n1 <= plate length <= 100. The comparison is case sensitive, so Anna is not a palindrome.",
    difficulty: "medium",
    maxscore: 20,
    topic: "Recursion",
    subtopic: "Recursion on Strings",
    inputconstrains: "1 <= plate length <= 100, comparison is case sensitive",
    sampleinput1: "level",
    sampleinput2: "plate",
    input1: "a",
    input2: "racecar",
    input3: "Anna",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

// recursion compares the outer pair and moves both ends inward
bool isPalindrome(const string &text, int left, int right) {
    if (left >= right) {
        return true;
    }
    if (text[left] != text[right]) {
        return false;
    }
    return isPalindrome(text, left + 1, right - 1);
}

int main() {
    string plate;
    cin >> plate;
    if (isPalindrome(plate, 0, (int)plate.size() - 1)) {
        cout << "Palindrome: Yes" << endl;
    } else {
        cout << "Palindrome: No" << endl;
    }
    return 0;
}`,
    blacklist: "while, for",
    whitelist: "string, if, return, recursion",
  },
  {
    title: "Parcel Weight Totaler",
    description:
      "A courier drone scans N parcels and builds its load report with recursion: one recursive pass reads the weights into an array, one computes the total weight, and one carries the heaviest weight up the call stack. Read N and the weights, then print the report.\n\nInput Format:\nFirst line: N. Second line: N integers (weights in kg).\n\nOutput Format:\nParcels: <N>\nTotal weight: <sum> kg\nHeaviest parcel: <max> kg\n\nConstraints:\n0 <= N <= 500, 0 <= each weight <= 500. With N = 0 both the total and the heaviest value are 0.",
    difficulty: "medium",
    maxscore: 20,
    topic: "Recursion",
    subtopic: "Recursion on Arrays",
    inputconstrains: "0 <= N <= 500, 0 <= each weight <= 500",
    sampleinput1: "4\n3 7 2 5",
    sampleinput2: "1\n100",
    input1: "0",
    input2: "3\n500 0 250",
    input3: "5\n10 20 30 40 50",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int weights[500];

// recursion reads one weight per call
void readWeights(int i, int n) {
    if (i == n) {
        return;
    }
    cin >> weights[i];
    readWeights(i + 1, n);
}

// recursion adds the last parcel to the sum of the rest
long long totalWeight(int n) {
    if (n == 0) {
        return 0;
    }
    return weights[n - 1] + totalWeight(n - 1);
}

// recursion carries the larger value up the call stack
int heaviest(int n) {
    if (n == 1) {
        return weights[0];
    }
    int rest = heaviest(n - 1);
    if (weights[n - 1] > rest) {
        return weights[n - 1];
    }
    return rest;
}

int main() {
    int n;
    cin >> n;
    readWeights(0, n);
    cout << "Parcels: " << n << endl;
    cout << "Total weight: " << totalWeight(n) << " kg" << endl;
    int top = 0;
    if (n > 0) {
        top = heaviest(n);
    }
    cout << "Heaviest parcel: " << top << " kg" << endl;
    return 0;
}`,
    blacklist: "while, for, printf",
    whitelist: "cin, cout, if, return, recursion",
  },
  {
    title: "Inline Square Tile Report",
    description:
      "A tile showroom prints an area report using an inline helper: inline long long square(long long side) returns side * side, and the report calls it twice, once per tile and once inside the grand total. Read the tile side S and the number of tiles T, then print the report.\n\nInput Format:\nOne line with two integers: tile side S and tiles ordered T.\n\nOutput Format:\nTile side: <S> cm\nTile area: <S*S> sq cm\nTiles ordered: <T>\nTotal area: <S*S*T> sq cm\n\nConstraints:\n1 <= S <= 100, 1 <= T <= 1000",
    difficulty: "medium",
    maxscore: 20,
    topic: "Recursion",
    subtopic: "Inline Functions",
    inputconstrains: "1 <= S <= 100, 1 <= T <= 1000",
    sampleinput1: "25 4",
    sampleinput2: "10 3",
    input1: "1 1",
    input2: "100 1000",
    input3: "7 12",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

// inline helper: the compiler may expand this body at each call site
inline long long square(long long side) {
    return side * side;
}

int main() {
    long long side;
    long long tiles;
    cin >> side >> tiles;
    cout << "Tile side: " << side << " cm" << endl;
    cout << "Tile area: " << square(side) << " sq cm" << endl;
    cout << "Tiles ordered: " << tiles << endl;
    cout << "Total area: " << tiles * square(side) << " sq cm" << endl;
    return 0;
}`,
    blacklist: "printf, #define",
    whitelist: "cin, cout, inline, return",
  },

  // ------------------------------------------------------------------- hard
  {
    title: "Robot Arm Tower of Hanoi",
    description:
      "A museum robot arm rearranges a tower of N disks on three pegs A, B and C, moving the whole stack from A to C under the classic rules: one disk per move and never a bigger disk on a smaller one. The move plan comes from recursive calls and the move count from a recursive counter (2^N - 1). Read N and print the complete plan.\n\nInput Format:\nOne line with one integer: N.\n\nOutput Format:\nDisk count: <N>\nMinimum moves: <2^N - 1>\nMove disk <k> from <peg> to <peg>   (one line per move, in order)\nAll disks stacked on peg C\n\nConstraints:\n0 <= N <= 4. With N = 0 there are no moves and only the opening lines and the final line print.",
    difficulty: "hard",
    maxscore: 30,
    topic: "Recursion",
    subtopic: "Mathematical Recursion",
    inputconstrains: "0 <= N <= 4",
    sampleinput1: "3",
    sampleinput2: "2",
    input1: "1",
    input2: "4",
    input3: "0",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

// recursion counts the moves: 2^N - 1
long long moveCount(int n) {
    if (n == 0) {
        return 0;
    }
    return 2 * moveCount(n - 1) + 1;
}

// recursion plans the tower transfer
void hanoi(int n, char fromPeg, char toPeg, char sparePeg) {
    if (n == 0) {
        return;
    }
    hanoi(n - 1, fromPeg, sparePeg, toPeg);
    cout << "Move disk " << n << " from " << fromPeg << " to " << toPeg << endl;
    hanoi(n - 1, sparePeg, toPeg, fromPeg);
}

int main() {
    int n;
    cin >> n;
    cout << "Disk count: " << n << endl;
    cout << "Minimum moves: " << moveCount(n) << endl;
    hanoi(n, 'A', 'C', 'B');
    cout << "All disks stacked on peg C" << endl;
    return 0;
}`,
    blacklist: "while, for, pow(",
    whitelist: "if, return, recursion, cout",
  },
  {
    title: "Staircase Routes Counter",
    description:
      "A fitness studio designs staircase workouts: the climber takes either a single step or a double step stride, and the coach wants the route count at every height of the warm-up ladder from 1 up to N plus the grand total, all coming from one recursive function with routes(0) = 1 and routes(1) = 1. Read N and print the ladder.\n\nInput Format:\nOne line with one integer: N.\n\nOutput Format:\nStaircase height: <N>\nHeight 1: <routes>\nHeight 2: <routes>\n...\nHeight <N>: <routes>\nTotal routes: <routes(N)>\n\nConstraints:\n1 <= N <= 20",
    difficulty: "hard",
    maxscore: 30,
    topic: "Recursion",
    subtopic: "Mathematical Recursion",
    inputconstrains: "1 <= N <= 20",
    sampleinput1: "4",
    sampleinput2: "5",
    input1: "1",
    input2: "12",
    input3: "20",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

// recursion combines the last single stride and the last double stride
long long routes(int n) {
    if (n <= 1) {
        return 1;
    }
    return routes(n - 1) + routes(n - 2);
}

// recursion prints the warm-up ladder one height at a time
void printLadder(int k, int n) {
    if (k > n) {
        return;
    }
    cout << "Height " << k << ": " << routes(k) << endl;
    printLadder(k + 1, n);
}

int main() {
    int n;
    cin >> n;
    cout << "Staircase height: " << n << endl;
    printLadder(1, n);
    cout << "Total routes: " << routes(n) << endl;
    return 0;
}`,
    blacklist: "while, for",
    whitelist: "if, return, recursion, cout",
  },
  {
    title: "Referral Bonus Waterfall",
    description:
      "A startup runs a referral bonus waterfall along a management chain: level 1 is the bottom employee and level N is the top. Level 1 receives its own bonus; every higher level k receives its own bonus plus double the payout of the level below: payout(k) = bonus(k) + 2 * payout(k-1). Read N and the N bonuses (level 1 first) with recursion, then print every level's payout and the top payout, all computed recursively.\n\nInput Format:\nFirst line: N. Second line: N integers (bonuses from level 1 to level N).\n\nOutput Format:\nChain length: <N>\nLevel 1 payout: <p>\nLevel 2 payout: <p>\n...\nLevel <N> payout: <p>\nTop payout: <p>\n\nConstraints:\n1 <= N <= 10, 0 <= each bonus <= 9",
    difficulty: "hard",
    maxscore: 30,
    topic: "Recursion",
    subtopic: "Recursion on Arrays",
    inputconstrains: "1 <= N <= 10, 0 <= each bonus <= 9",
    sampleinput1: "3\n2 3 4",
    sampleinput2: "4\n1 1 1 1",
    input1: "1\n9",
    input2: "5\n0 1 0 1 2",
    input3: "2\n5 5",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

long long bonus[15];

// recursion reads one bonus per level from the bottom up
void readBonuses(int level, int n) {
    if (level > n) {
        return;
    }
    cin >> bonus[level];
    readBonuses(level + 1, n);
}

// recursion doubles everything collected below and adds this level's bonus
long long payout(int level) {
    if (level == 1) {
        return bonus[1];
    }
    return bonus[level] + 2 * payout(level - 1);
}

// recursion prints the payout ladder from the bottom to the top
void showPayouts(int level, int n) {
    if (level > n) {
        return;
    }
    cout << "Level " << level << " payout: " << payout(level) << endl;
    showPayouts(level + 1, n);
}

int main() {
    int n;
    cin >> n;
    readBonuses(1, n);
    cout << "Chain length: " << n << endl;
    showPayouts(1, n);
    cout << "Top payout: " << payout(n) << endl;
    return 0;
}`,
    blacklist: "while, for, printf",
    whitelist: "cin, cout, if, return, recursion",
  },
  {
    title: "Keypad Code Digit Merge",
    description:
      "A security keypad merges two access codes by interleaving their digits alternately from the left: one digit from code A, then one from code B, repeating; when one code runs out, the remaining digits of the other code are appended in order. The merge is built recursively on the code strings and the merged digit sum is computed recursively too. Read the two codes and print the report.\n\nInput Format:\nOne line with two integers: code A and code B.\n\nOutput Format:\nCode A: <A>\nCode B: <B>\nMerged code: <merged digits>\nMerged length: <len>\nMerged digit sum: <sum>\n\nConstraints:\n1 <= A, B <= 99999999",
    difficulty: "hard",
    maxscore: 30,
    topic: "Recursion",
    subtopic: "Recursion on Strings",
    inputconstrains: "1 <= A, B <= 99999999",
    sampleinput1: "123 4567",
    sampleinput2: "77 77",
    input1: "5 8",
    input2: "1000 9",
    input3: "12345678 87",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <string>
using namespace std;

// recursion takes one digit from each code per step, then appends the leftovers
string mergeCodes(const string &first, const string &second, int i) {
    if (i >= (int)first.size() && i >= (int)second.size()) {
        return "";
    }
    string merged = "";
    if (i < (int)first.size()) {
        merged += first[i];
    }
    if (i < (int)second.size()) {
        merged += second[i];
    }
    return merged + mergeCodes(first, second, i + 1);
}

// recursion walks the merged code and adds digit values
int digitSum(const string &text, int i) {
    if (i == (int)text.size()) {
        return 0;
    }
    return (text[i] - '0') + digitSum(text, i + 1);
}

int main() {
    long long a, b;
    cin >> a >> b;
    string first = to_string(a);
    string second = to_string(b);
    string merged = mergeCodes(first, second, 0);
    cout << "Code A: " << first << endl;
    cout << "Code B: " << second << endl;
    cout << "Merged code: " << merged << endl;
    cout << "Merged length: " << merged.size() << endl;
    cout << "Merged digit sum: " << digitSum(merged, 0) << endl;
    return 0;
}`,
    blacklist: "while, for",
    whitelist: "string, if, return, recursion",
  },
];

export const mcqs = [
  // ------------------------------------------------------------------ easy
  {
    title: "Recursion Defined Correctly",
    description: "In C++, a recursive function is best described as:",
    difficulty: "easy",
    topic: "Recursion",
    subtopic: "Recursion Basics",
    Option1: "A function that is called only once by main",
    Option2: "A function that calls itself, either directly or through another function",
    Option3: "A function declared with the static keyword",
    Option4: "A function that never returns a value",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Purpose of the Base Case",
    description: "What is the main job of the base case in a recursive function?",
    difficulty: "easy",
    topic: "Recursion",
    subtopic: "Base and Recursive Case",
    Option1: "It speeds up input and output",
    Option2: "It makes the function run at least twice",
    Option3: "It provides the stopping condition that ends the chain of recursive calls",
    Option4: "It allocates memory on the heap",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Cause of Infinite Recursion",
    description: "A recursive function never reaches its base case. What happens at run time?",
    difficulty: "easy",
    topic: "Recursion",
    subtopic: "Base and Recursive Case",
    Option1: "The calls repeat until the call stack runs out of memory and the program crashes",
    Option2: "The function returns zero immediately",
    Option3: "The compiler refuses to build the program",
    Option4: "The function converts itself into a loop automatically",
    CorrectOption: 1,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Stack Frame per Call",
    description: "What does every single recursive call receive on the call stack?",
    difficulty: "easy",
    topic: "Recursion",
    subtopic: "Recursion Basics",
    Option1: "A shared single copy of all parameters",
    Option2: "Its own frame with its own copy of the parameters and local variables",
    Option3: "A new global variable block",
    Option4: "A fresh copy of the whole program",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Indirect Recursion Meaning",
    description: "Function A calls function B, and function B calls function A. This pattern is called:",
    difficulty: "easy",
    topic: "Recursion",
    subtopic: "Recursion Basics",
    Option1: "Tail recursion",
    Option2: "Direct recursion",
    Option3: "Indirect (mutual) recursion",
    Option4: "Nested iteration",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Tail Recursion at a Glance",
    description: "A recursive call qualifies as tail recursion when:",
    difficulty: "easy",
    topic: "Recursion",
    subtopic: "Recursion Basics",
    Option1: "It is the very last operation of the function, with nothing pending afterwards",
    Option2: "It happens inside a nested if block",
    Option3: "It passes more than one argument",
    Option4: "It calls at least two different functions",
    CorrectOption: 1,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Role of the Recursive Case",
    description: "The recursive case of a recursive function is the part that:",
    difficulty: "easy",
    topic: "Recursion",
    subtopic: "Base and Recursive Case",
    Option1: "Handles the smallest input directly",
    Option2: "Prints the final answer",
    Option3: "Is written only in main",
    Option4: "Calls the same function again with a smaller or simpler input",
    CorrectOption: 4,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "How Recursion Makes Progress",
    description: "For the recursion to terminate, every recursive call must:",
    difficulty: "easy",
    topic: "Recursion",
    subtopic: "Base and Recursive Case",
    Option1: "Work on a smaller or simpler input that moves towards the base case",
    Option2: "Use a bigger input than the previous call",
    Option3: "Declare a new global variable",
    Option4: "Return the same value it received",
    CorrectOption: 1,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Stack Overflow Warning Sign",
    description: "Which situation most strongly signals that a stack overflow may be approaching?",
    difficulty: "easy",
    topic: "Recursion",
    subtopic: "Recursion Basics",
    Option1: "The function uses long long instead of int",
    Option2: "The recursion depth keeps growing without a reachable base case",
    Option3: "The function is declared inline",
    Option4: "The program prints many lines of output",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Unwinding Phase of Recursion",
    description: "After the base case returns, the pending work of earlier calls runs as frames pop off the stack. This phase is called:",
    difficulty: "easy",
    topic: "Recursion",
    subtopic: "Base and Recursive Case",
    Option1: "The compiling phase",
    Option2: "The linking phase",
    Option3: "The unwinding phase, running from the most recent call back to the first",
    Option4: "The winding phase, running from the first call to the last",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },

  // ----------------------------------------------------------------- medium
  {
    title: "Countdown Before the Call",
    description: "The function prints each number before making its recursive call. What does this program print?",
    difficulty: "medium",
    topic: "Recursion",
    subtopic: "Base and Recursive Case",
    Option1: "3 2 1 Go",
    Option2: "Go 3 2 1",
    Option3: "3 2 1",
    Option4: "1 2 3 Go",
    CorrectOption: 1,
    codesnippet: `#include <iostream>
using namespace std;
void countDown(int n) {
    if (n == 0) {
        return;
    }
    cout << n << " ";
    countDown(n - 1);
}
int main() {
    countDown(3);
    cout << "Go";
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: "#include <iostream>\nusing namespace std;\nvoid countDown(int n) {\n    if (n == 0) {\n        return;\n    }\n    cout << n << \" \";\n    countDown(n - 1);\n}\nint main() {\n    countDown(3);\n    cout << \"Go\";\n    return 0;\n}",
      stdin: "",
      expected: "3 2 1 Go",
    },
  },
  {
    title: "Sum Returned Through Frames",
    description: "The total is built while the call stack unwinds. What does this program print?",
    difficulty: "medium",
    topic: "Recursion",
    subtopic: "Recursion Basics",
    Option1: "Sum: 4",
    Option2: "Sum: 24",
    Option3: "Sum: 10",
    Option4: "Sum: 0",
    CorrectOption: 3,
    codesnippet: `#include <iostream>
using namespace std;
int total(int n) {
    if (n == 0) {
        return 0;
    }
    return n + total(n - 1);
}
int main() {
    cout << "Sum: " << total(4);
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: "#include <iostream>\nusing namespace std;\nint total(int n) {\n    if (n == 0) {\n        return 0;\n    }\n    return n + total(n - 1);\n}\nint main() {\n    cout << \"Sum: \" << total(4);\n    return 0;\n}",
      stdin: "",
      expected: "Sum: 10",
    },
  },
  {
    title: "Print Before and After the Call",
    description: "The function prints one line before diving and one line after returning. What is the exact output (one token per line, in order)?",
    difficulty: "medium",
    topic: "Recursion",
    subtopic: "Base and Recursive Case",
    Option1: "In2, In1, Dive, Out2, Out1 (in that order)",
    Option2: "In2, In1, Dive, Out1, Out2 (in that order)",
    Option3: "Dive, In2, In1, Out1, Out2 (in that order)",
    Option4: "In1, In2, Dive, Out1, Out2 (in that order)",
    CorrectOption: 2,
    codesnippet: `#include <iostream>
using namespace std;
void wave(int n) {
    if (n == 0) {
        cout << "Dive" << endl;
        return;
    }
    cout << "In" << n << endl;
    wave(n - 1);
    cout << "Out" << n << endl;
}
int main() {
    wave(2);
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: "#include <iostream>\nusing namespace std;\nvoid wave(int n) {\n    if (n == 0) {\n        cout << \"Dive\" << endl;\n        return;\n    }\n    cout << \"In\" << n << endl;\n    wave(n - 1);\n    cout << \"Out\" << n << endl;\n}\nint main() {\n    wave(2);\n    return 0;\n}",
      stdin: "",
      expected: "In2\nIn1\nDive\nOut1\nOut2",
    },
  },
  {
    title: "Fibonacci Function Value",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "Recursion",
    subtopic: "Mathematical Recursion",
    Option1: "5",
    Option2: "13",
    Option3: "6",
    Option4: "8",
    CorrectOption: 4,
    codesnippet: `#include <iostream>
using namespace std;
long long fib(int n) {
    if (n < 2) {
        return n;
    }
    return fib(n - 1) + fib(n - 2);
}
int main() {
    cout << fib(6);
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: "#include <iostream>\nusing namespace std;\nlong long fib(int n) {\n    if (n < 2) {\n        return n;\n    }\n    return fib(n - 1) + fib(n - 2);\n}\nint main() {\n    cout << fib(6);\n    return 0;\n}",
      stdin: "",
      expected: "8",
    },
  },
  {
    title: "Missing Base Case Result",
    description: "A recursive factorial function forgets its base case entirely (the body only makes the recursive call). What happens at run time?",
    difficulty: "medium",
    topic: "Recursion",
    subtopic: "Base and Recursive Case",
    Option1: "The function returns 1 immediately",
    Option2: "The compiler inserts an implicit base case",
    Option3: "The calls keep stacking until the stack memory is exhausted and the program crashes",
    Option4: "The function silently returns an uninitialized value and the program continues normally",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Call Growth in Naive Fibonacci",
    description: "In the classic naive recursive fibonacci (fib(n) = fib(n-1) + fib(n-2)), how does the total number of function calls behave as n grows?",
    difficulty: "medium",
    topic: "Recursion",
    subtopic: "Mathematical Recursion",
    Option1: "It grows linearly with n",
    Option2: "It stays constant after n = 10",
    Option3: "It decreases as n grows",
    Option4: "It grows roughly exponentially, because each call branches into two more calls that recompute the same subproblems",
    CorrectOption: 4,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },

  // ------------------------------------------------------------------- hard
  {
    title: "Enter and Leave Trace",
    description: "The function logs entering each level and leaving each level. What is the exact output (one line per token, in order)?",
    difficulty: "hard",
    topic: "Recursion",
    subtopic: "Base and Recursive Case",
    Option1: "enter 2, enter 1, base, leave 2, leave 1 (in that order)",
    Option2: "enter 1, enter 2, base, leave 1, leave 2 (in that order)",
    Option3: "enter 2, enter 1, base, leave 1, leave 2 (in that order)",
    Option4: "base, enter 2, enter 1, leave 2, leave 1 (in that order)",
    CorrectOption: 3,
    codesnippet: `#include <iostream>
using namespace std;
void trace(int n) {
    if (n == 0) {
        cout << "base" << endl;
        return;
    }
    cout << "enter " << n << endl;
    trace(n - 1);
    cout << "leave " << n << endl;
}
int main() {
    trace(2);
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: "#include <iostream>\nusing namespace std;\nvoid trace(int n) {\n    if (n == 0) {\n        cout << \"base\" << endl;\n        return;\n    }\n    cout << \"enter \" << n << endl;\n    trace(n - 1);\n    cout << \"leave \" << n << endl;\n}\nint main() {\n    trace(2);\n    return 0;\n}",
      stdin: "",
      expected: "enter 2\nenter 1\nbase\nleave 1\nleave 2",
    },
  },
  {
    title: "Reference Accumulator Result",
    description: "The accumulator is passed by reference, so every frame adds to the same variable. What does this program print?",
    difficulty: "hard",
    topic: "Recursion",
    subtopic: "Recursion Basics",
    Option1: "10",
    Option2: "4",
    Option3: "24",
    Option4: "0",
    CorrectOption: 1,
    codesnippet: `#include <iostream>
using namespace std;
void collect(int n, int &acc) {
    if (n == 0) {
        return;
    }
    acc += n;
    collect(n - 1, acc);
}
int main() {
    int acc = 0;
    collect(4, acc);
    cout << acc;
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: "#include <iostream>\nusing namespace std;\nvoid collect(int n, int &acc) {\n    if (n == 0) {\n        return;\n    }\n    acc += n;\n    collect(n - 1, acc);\n}\nint main() {\n    int acc = 0;\n    collect(4, acc);\n    cout << acc;\n    return 0;\n}",
      stdin: "",
      expected: "10",
    },
  },
  {
    title: "Nested Recursive Return Chain",
    description: "f calls itself and also calls the recursive helper g. What does this program print?",
    difficulty: "hard",
    topic: "Recursion",
    subtopic: "Mathematical Recursion",
    Option1: "8",
    Option2: "6",
    Option3: "24",
    Option4: "14",
    CorrectOption: 4,
    codesnippet: `#include <iostream>
using namespace std;
int g(int x) {
    if (x == 0) {
        return 1;
    }
    return 2 * g(x - 1);
}
int f(int x) {
    if (x == 0) {
        return 0;
    }
    return f(x - 1) + g(x);
}
int main() {
    cout << f(3);
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: "#include <iostream>\nusing namespace std;\nint g(int x) {\n    if (x == 0) {\n        return 1;\n    }\n    return 2 * g(x - 1);\n}\nint f(int x) {\n    if (x == 0) {\n        return 0;\n    }\n    return f(x - 1) + g(x);\n}\nint main() {\n    cout << f(3);\n    return 0;\n}",
      stdin: "",
      expected: "14",
    },
  },
  {
    title: "Truth About Inline Functions",
    description: "Which statement about inline functions in C++ is correct?",
    difficulty: "hard",
    topic: "Recursion",
    subtopic: "Inline Functions",
    Option1: "The inline keyword forces the compiler to expand every call, no matter how large the function body is",
    Option2: "Inline functions are pasted by the preprocessor like macros and skip type checking",
    Option3: "A recursive function must always be declared inline, otherwise it will not compile",
    Option4: "inline suggests expanding the body at the call site to save call overhead, but the compiler may ignore it, e.g. when the body is large or recursive",
    CorrectOption: 4,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
];
