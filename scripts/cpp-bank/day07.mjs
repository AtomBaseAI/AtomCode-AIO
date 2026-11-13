/**
 * OOPS using CPP — Day 7: 1D Arrays
 * 20 code questions (10 easy: 6 basics + 4 real-world, 6 medium, 4 hard)
 * 20 MCQs (10 easy, 6 medium, 4 hard)
 * All solutions are fresh C++ written for this course (no conversions).
 */
export const meta = {
  day: 7,
  topic: "1D Arrays",
};

export const code = [
  // ------------------------------------------------------------------ easy
  {
    title: "Echo the Array Elements",
    description:
      "A data entry clerk wants to confirm what was just typed into the terminal. Read N and then N integers, store them in an array and print them back separated by single spaces on one line.\n\nInput Format:\nOne line with N + 1 integers: N followed by the N array elements.\n\nOutput Format:\nThe N integers separated by single spaces on one line.\n\nConstraints:\n1 <= N <= 1000, -1000 <= element <= 1000",
    difficulty: "easy",
    maxscore: 10,
    topic: "1D Arrays",
    subtopic: "Array Input and Output",
    inputconstrains: "1 <= N <= 1000, -1000 <= element <= 1000",
    sampleinput1: "5 10 20 30 40 50",
    sampleinput2: "3 7 7 7",
    sampleoutput1: "",
    sampleoutput2: "",
    input1: "1 -999",
    input2: "6 0 0 0 0 0 0",
    input3: "4 -5 100 -5 3",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int arr[1000];
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    for (int i = 0; i < n; i++) {
        cout << arr[i];
        if (i < n - 1) {
            cout << " ";
        }
    }
    cout << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Index and Value Listing",
    description:
      "A lab technician labels every sample with its rack slot number. Read N and then N integers into an array, then walk the array and print each index (0-based) together with the value stored there.\n\nInput Format:\nOne line with N + 1 integers: N followed by the N array elements.\n\nOutput Format:\nFor every index i from 0 to N - 1, one line:\nIndex <i>: <value>\n\nConstraints:\n1 <= N <= 1000, -1000 <= element <= 1000",
    difficulty: "easy",
    maxscore: 10,
    topic: "1D Arrays",
    subtopic: "Array Traversal",
    inputconstrains: "1 <= N <= 1000, -1000 <= element <= 1000",
    sampleinput1: "4 8 16 24 32",
    sampleinput2: "2 5 9",
    sampleoutput1: "",
    sampleoutput2: "",
    input1: "1 42",
    input2: "3 0 0 0",
    input3: "5 -1 -2 -3 -4 -5",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int arr[1000];
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    for (int i = 0; i < n; i++) {
        cout << "Index " << i << ": " << arr[i] << endl;
    }
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Array Element Sum Drill",
    description:
      "A cashier totals the day's transactions stored in a list. Read N and then N integers into an array, add them up while traversing the array and print the total.\n\nInput Format:\nOne line with N + 1 integers: N followed by the N array elements.\n\nOutput Format:\nSum: <total>\n\nConstraints:\n1 <= N <= 1000, -10000 <= element <= 10000",
    difficulty: "easy",
    maxscore: 10,
    topic: "1D Arrays",
    subtopic: "Aggregation Sum Min Max",
    inputconstrains: "1 <= N <= 1000, -10000 <= element <= 10000",
    sampleinput1: "5 1 2 3 4 5",
    sampleinput2: "3 -10 20 -5",
    sampleoutput1: "",
    sampleoutput2: "",
    input1: "1 10000",
    input2: "4 0 0 0 0",
    input3: "6 1000 1000 1000 1000 1000 1000",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int arr[1000];
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    int total = 0;
    for (int i = 0; i < n; i++) {
        total += arr[i];
    }
    cout << "Sum: " << total << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Find the Maximum Element",
    description:
      "A crane operator wants to know the heaviest load lifted today. Read N and then N integers into an array, then scan the array to find the largest value.\n\nInput Format:\nOne line with N + 1 integers: N followed by the N array elements.\n\nOutput Format:\nMaximum: <largest value>\n\nConstraints:\n1 <= N <= 1000, -10000 <= element <= 10000",
    difficulty: "easy",
    maxscore: 10,
    topic: "1D Arrays",
    subtopic: "Aggregation Sum Min Max",
    inputconstrains: "1 <= N <= 1000, -10000 <= element <= 10000",
    sampleinput1: "6 3 9 1 9 2 8",
    sampleinput2: "1 7",
    sampleoutput1: "",
    sampleoutput2: "",
    input1: "4 -5 -2 -9 -1",
    input2: "5 4 4 4 4 4",
    input3: "8 1000 999 998 0 -1 2 3 501",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int arr[1000];
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    int maximum = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] > maximum) {
            maximum = arr[i];
        }
    }
    cout << "Maximum: " << maximum << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Count the Even Numbers",
    description:
      "A parking lot warden logs vehicle counts per hour and wants to know how many hours had an even number of vehicles. Read N and then N integers into an array, then count how many of them are even.\n\nInput Format:\nOne line with N + 1 integers: N followed by the N array elements.\n\nOutput Format:\nEven count: <number of even elements>\n\nConstraints:\n1 <= N <= 1000, -1000 <= element <= 1000",
    difficulty: "easy",
    maxscore: 10,
    topic: "1D Arrays",
    subtopic: "Array Traversal",
    inputconstrains: "1 <= N <= 1000, -1000 <= element <= 1000",
    sampleinput1: "6 1 2 3 4 5 6",
    sampleinput2: "4 7 9 11 13",
    sampleoutput1: "",
    sampleoutput2: "",
    input1: "1 8",
    input2: "5 -2 -4 0 3 5",
    input3: "3 2 2 2",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int arr[1000];
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    int evenCount = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] % 2 == 0) {
            evenCount++;
        }
    }
    cout << "Even count: " << evenCount << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Elements at Even Indexes",
    description:
      "A theatre lighting board activates only the fixtures sitting at even slot numbers. Read N and then N integers into an array, then print the elements that sit at indexes 0, 2, 4, ... (0-based even indexes) separated by single spaces on one line.\n\nInput Format:\nOne line with N + 1 integers: N followed by the N array elements.\n\nOutput Format:\nThe elements at even indexes separated by single spaces on one line.\n\nConstraints:\n1 <= N <= 1000, -1000 <= element <= 1000",
    difficulty: "easy",
    maxscore: 10,
    topic: "1D Arrays",
    subtopic: "Array Traversal",
    inputconstrains: "1 <= N <= 1000, -1000 <= element <= 1000",
    sampleinput1: "5 10 21 32 43 54",
    sampleinput2: "2 7 8",
    sampleoutput1: "",
    sampleoutput2: "",
    input1: "1 99",
    input2: "6 1 2 3 4 5 6",
    input3: "4 0 -1 0 -1",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int arr[1000];
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    for (int i = 0; i < n; i += 2) {
        cout << arr[i];
        if (i + 2 < n) {
            cout << " ";
        }
    }
    cout << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Sensor Readings Report",
    description:
      "A weather station logs N temperature readings for the day. Read N and then N integer readings into an array, then print the total of all readings and the average with exactly two decimal places.\n\nInput Format:\nOne line with N + 1 integers: N followed by the N readings.\n\nOutput Format:\nTotal: <sum>\nAverage: <average with 2 decimals>\n\nConstraints:\n1 <= N <= 1000, 0 <= reading <= 100",
    difficulty: "easy",
    maxscore: 10,
    topic: "1D Arrays",
    subtopic: "Array Input and Output",
    inputconstrains: "1 <= N <= 1000, 0 <= reading <= 100",
    sampleinput1: "4 10 20 30 40",
    sampleinput2: "3 21 22 23",
    sampleoutput1: "",
    sampleoutput2: "",
    input1: "1 37",
    input2: "5 0 0 0 0 1",
    input3: "6 100 100 100 100 100 99",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    int n;
    cin >> n;
    int arr[1000];
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    int total = 0;
    for (int i = 0; i < n; i++) {
        total += arr[i];
    }
    double average = total / (double)n;
    cout << "Total: " << total << endl;
    cout << fixed << setprecision(2) << "Average: " << average << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Shopping Cart Subtotal",
    description:
      "An online store totals the items in a shopper's cart. Read N and then N integer item prices into an array, then print the subtotal by adding every price.\n\nInput Format:\nOne line with N + 1 integers: N followed by the N item prices.\n\nOutput Format:\nSubtotal: <sum> rupees\n\nConstraints:\n1 <= N <= 1000, 1 <= price <= 5000",
    difficulty: "easy",
    maxscore: 10,
    topic: "1D Arrays",
    subtopic: "Aggregation Sum Min Max",
    inputconstrains: "1 <= N <= 1000, 1 <= price <= 5000",
    sampleinput1: "3 120 80 250",
    sampleinput2: "1 4999",
    sampleoutput1: "",
    sampleoutput2: "",
    input1: "5 10 20 30 40 50",
    input2: "2 5000 5000",
    input3: "4 1 2 3 4",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int arr[1000];
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    int subtotal = 0;
    for (int i = 0; i < n; i++) {
        subtotal += arr[i];
    }
    cout << "Subtotal: " << subtotal << " rupees" << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Attendance Register Count",
    description:
      "A class teacher marks the register as a list of 0s and 1s, one value per student (1 = present, 0 = absent). Read N and then N attendance values into an array, then count how many students are present and how many are absent.\n\nInput Format:\nOne line with N + 1 integers: N followed by the N attendance values (each 0 or 1).\n\nOutput Format:\nPresent: <count of 1s>\nAbsent: <count of 0s>\n\nConstraints:\n1 <= N <= 1000, each value is 0 or 1",
    difficulty: "easy",
    maxscore: 10,
    topic: "1D Arrays",
    subtopic: "Array Traversal",
    inputconstrains: "1 <= N <= 1000, each value is 0 or 1",
    sampleinput1: "6 1 1 0 1 0 1",
    sampleinput2: "3 0 0 0",
    sampleoutput1: "",
    sampleoutput2: "",
    input1: "1 1",
    input2: "5 1 1 1 1 1",
    input3: "4 0 1 0 1",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int arr[1000];
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    int present = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] == 1) {
            present++;
        }
    }
    int absent = n - present;
    cout << "Present: " << present << endl;
    cout << "Absent: " << absent << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Queue Token Min and Max",
    description:
      "A token dispenser issued N tokens today. Read N and then N token numbers into an array, then report the smallest and the largest token issued.\n\nInput Format:\nOne line with N + 1 integers: N followed by the N token numbers.\n\nOutput Format:\nSmallest token: <minimum>\nLargest token: <maximum>\n\nConstraints:\n1 <= N <= 1000, 1 <= token <= 9999",
    difficulty: "easy",
    maxscore: 10,
    topic: "1D Arrays",
    subtopic: "Aggregation Sum Min Max",
    inputconstrains: "1 <= N <= 1000, 1 <= token <= 9999",
    sampleinput1: "5 42 7 99 15 63",
    sampleinput2: "1 500",
    sampleoutput1: "",
    sampleoutput2: "",
    input1: "4 3 3 3 3",
    input2: "6 100 1 9999 50 77 2",
    input3: "3 888 777 999",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int arr[1000];
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    int smallest = arr[0];
    int largest = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] < smallest) {
            smallest = arr[i];
        }
        if (arr[i] > largest) {
            largest = arr[i];
        }
    }
    cout << "Smallest token: " << smallest << endl;
    cout << "Largest token: " << largest << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },

  // ----------------------------------------------------------------- medium
  {
    title: "Roll Number Finder",
    description:
      "During a surprise audit a teacher searches the roll list for a particular roll number. Read N, then N roll numbers into an array, then the target roll number. Search the array from the start; if the target appears, print the position of its first occurrence using 1-based numbering, otherwise print Not Found.\n\nInput Format:\nOne line with N + 2 integers: N, the N roll numbers, then the target roll number.\n\nOutput Format:\nFound at position <1-based position of the first occurrence>\nor\nNot Found\n\nConstraints:\n1 <= N <= 1000, 1 <= roll number <= 9999",
    difficulty: "medium",
    maxscore: 20,
    topic: "1D Arrays",
    subtopic: "Searching in Arrays",
    inputconstrains: "1 <= N <= 1000, 1 <= roll number <= 9999",
    sampleinput1: "6 12 34 56 34 78 90 34",
    sampleinput2: "5 10 20 30 40 50 45",
    sampleoutput1: "",
    sampleoutput2: "",
    input1: "1 7 7",
    input2: "5 9 9 9 9 9",
    input3: "3 100 200 300 300",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int arr[1000];
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    int key;
    cin >> key;
    int pos = -1;
    for (int i = 0; i < n && pos == -1; i++) {
        if (arr[i] == key) {
            pos = i + 1;
        }
    }
    if (pos == -1) {
        cout << "Not Found" << endl;
    } else {
        cout << "Found at position " << pos << endl;
    }
    return 0;
}`,
    blacklist: "sort(, find(",
    whitelist: "for, if, cin, cout",
  },
  {
    title: "Defect Occurrence Counter",
    description:
      "A quality inspector recorded an inspection code for every unit on the belt and now needs the failure count for one specific defect code. Read N, then N codes into an array, then the defect code to look up. Count how many array elements are equal to the defect code.\n\nInput Format:\nOne line with N + 2 integers: N, the N inspection codes, then the defect code.\n\nOutput Format:\nOccurrences: <count>\n\nConstraints:\n1 <= N <= 1000, 0 <= code <= 100",
    difficulty: "medium",
    maxscore: 20,
    topic: "1D Arrays",
    subtopic: "Searching in Arrays",
    inputconstrains: "1 <= N <= 1000, 0 <= code <= 100",
    sampleinput1: "7 3 5 3 7 3 8 3 3",
    sampleinput2: "4 1 2 3 4 9",
    sampleoutput1: "",
    sampleoutput2: "",
    input1: "1 6 6",
    input2: "5 8 8 8 8 8 8",
    input3: "6 0 1 0 2 0 3 0",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int arr[1000];
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    int key;
    cin >> key;
    int occurrences = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] == key) {
            occurrences++;
        }
    }
    cout << "Occurrences: " << occurrences << endl;
    return 0;
}`,
    blacklist: "count(, sort(",
    whitelist: "for, if, cin, cout",
  },
  {
    title: "Auction Runner-up Bid",
    description:
      "An auction house recorded N bids. The highest bid wins; the runner-up is the highest bid that is strictly lower than the winning bid. Read N and then N bids into an array, then report both values.\n\nInput Format:\nOne line with N + 1 integers: N followed by the N bids.\n\nOutput Format:\nHighest bid: <maximum>\nRunner-up bid: <second highest distinct value>\n\nConstraints:\n1 <= N <= 1000, 1 <= bid <= 100000, at least two distinct bid values exist",
    difficulty: "medium",
    maxscore: 20,
    topic: "1D Arrays",
    subtopic: "Aggregation Sum Min Max",
    inputconstrains: "1 <= N <= 1000, 1 <= bid <= 100000, at least two distinct bid values exist",
    sampleinput1: "6 100 450 300 450 200 50",
    sampleinput2: "3 999 1000 500",
    sampleoutput1: "",
    sampleoutput2: "",
    input1: "2 5 10",
    input2: "4 50 50 50 49",
    input3: "5 100000 99999 1 2 3",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int arr[1000];
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    int highest = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] > highest) {
            highest = arr[i];
        }
    }
    int runnerUp = -1;
    for (int i = 0; i < n; i++) {
        if (arr[i] < highest && arr[i] > runnerUp) {
            runnerUp = arr[i];
        }
    }
    cout << "Highest bid: " << highest << endl;
    cout << "Runner-up bid: " << runnerUp << endl;
    return 0;
}`,
    blacklist: "sort(",
    whitelist: "for, if, cin, cout",
  },
  {
    title: "Train Coach Reversal",
    description:
      "A yard engine shunts a train so that the last coach becomes the first. Read N and then N coach numbers into an array, reverse the array in place using two indexes and a temporary variable (no STL), then print the reversed array separated by single spaces on one line.\n\nInput Format:\nOne line with N + 1 integers: N followed by the N coach numbers.\n\nOutput Format:\nThe reversed array elements separated by single spaces on one line.\n\nConstraints:\n1 <= N <= 1000, 1 <= coach number <= 9999",
    difficulty: "medium",
    maxscore: 20,
    topic: "1D Arrays",
    subtopic: "Array Reversal and Rotation",
    inputconstrains: "1 <= N <= 1000, 1 <= coach number <= 9999",
    sampleinput1: "5 1 2 3 4 5",
    sampleinput2: "4 10 20 30 40",
    sampleoutput1: "",
    sampleoutput2: "",
    input1: "1 77",
    input2: "6 2 4 6 8 10 12",
    input3: "3 5 5 5",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int arr[1000];
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    for (int i = 0; i < n / 2; i++) {
        int temp = arr[i];
        arr[i] = arr[n - 1 - i];
        arr[n - 1 - i] = temp;
    }
    for (int i = 0; i < n; i++) {
        cout << arr[i];
        if (i < n - 1) {
            cout << " ";
        }
    }
    cout << endl;
    return 0;
}`,
    blacklist: "reverse(, sort(",
    whitelist: "for, if, cin, cout",
  },
  {
    title: "Conveyor Belt Rotation",
    description:
      "A packaging line shifts boxes left along the belt by K slots; boxes that fall off the front re-enter at the back. Read N, then N box codes into an array, then K. Rotate the array left by K positions manually (no STL) and print the result separated by single spaces on one line.\n\nInput Format:\nOne line with N + 2 integers: N, the N box codes, then K.\n\nOutput Format:\nThe rotated array elements separated by single spaces on one line.\n\nConstraints:\n1 <= N <= 1000, 1 <= K < N, 1 <= box code <= 9999",
    difficulty: "medium",
    maxscore: 20,
    topic: "1D Arrays",
    subtopic: "Array Reversal and Rotation",
    inputconstrains: "1 <= N <= 1000, 1 <= K < N, 1 <= box code <= 9999",
    sampleinput1: "5 10 20 30 40 50 2",
    sampleinput2: "4 1 2 3 4 1",
    sampleoutput1: "",
    sampleoutput2: "",
    input1: "3 7 8 9 2",
    input2: "6 5 10 15 20 25 30 3",
    input3: "2 100 200 1",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int arr[1000];
    int shifted[1000];
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    int k;
    cin >> k;
    for (int i = 0; i < n; i++) {
        shifted[i] = arr[(i + k) % n];
    }
    for (int i = 0; i < n; i++) {
        cout << shifted[i];
        if (i < n - 1) {
            cout << " ";
        }
    }
    cout << endl;
    return 0;
}`,
    blacklist: "rotate(, reverse(, sort(",
    whitelist: "for, if, cin, cout",
  },
  {
    title: "Ballot Frequency Report",
    description:
      "An electronic ballot box logged N votes as candidate IDs between 0 and 100. Read N and then N votes into an array, then produce the tally: print every distinct candidate ID in the order it was first seen, each with the number of votes it received.\n\nInput Format:\nOne line with N + 1 integers: N followed by the N candidate IDs.\n\nOutput Format:\nFor each distinct ID in first-seen order, one line:\nCandidate <id>: <votes>\n\nConstraints:\n1 <= N <= 1000, 0 <= candidate ID <= 100",
    difficulty: "medium",
    maxscore: 20,
    topic: "1D Arrays",
    subtopic: "Array Traversal",
    inputconstrains: "1 <= N <= 1000, 0 <= candidate ID <= 100",
    sampleinput1: "7 3 3 5 3 5 9 3",
    sampleinput2: "3 100 0 100",
    sampleoutput1: "",
    sampleoutput2: "",
    input1: "1 42",
    input2: "6 7 7 7 7 7 7",
    input3: "8 1 2 1 2 3 1 3 3",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int arr[1000];
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    for (int i = 0; i < n; i++) {
        bool seenBefore = false;
        for (int j = 0; j < i; j++) {
            if (arr[j] == arr[i]) {
                seenBefore = true;
                break;
            }
        }
        if (!seenBefore) {
            int votes = 0;
            for (int j = 0; j < n; j++) {
                if (arr[j] == arr[i]) {
                    votes++;
                }
            }
            cout << "Candidate " << arr[i] << ": " << votes << endl;
        }
    }
    return 0;
}`,
    blacklist: "map(, sort(",
    whitelist: "for, if, cin, cout",
  },

  // ------------------------------------------------------------------- hard
  {
    title: "Warehouse Aisle Picker",
    description:
      "A picker works in a straight warehouse aisle. The storage slots are at integer metre positions given in visiting order; the picker starts at the first listed position, walks to every position in order, and finally walks back to the first position. Read N and then N positions into an array, then print the round trip report: the total walking distance (sum of absolute differences between consecutive positions plus the distance back to the first position), the farthest position, the average position with two decimals, and how many positions are strictly above that average.\n\nInput Format:\nOne line with N + 1 integers: N followed by the N positions.\n\nOutput Format:\nTotal distance: <total metres walked>\nFarthest position: <maximum position>\nAverage position: <average with 2 decimals>\nAbove average: <count of positions strictly greater than the average>\n\nConstraints:\n1 <= N <= 1000, 0 <= position <= 10000",
    difficulty: "hard",
    maxscore: 30,
    topic: "1D Arrays",
    subtopic: "Aggregation Sum Min Max",
    inputconstrains: "1 <= N <= 1000, 0 <= position <= 10000",
    sampleinput1: "5 2 6 4 10 8",
    sampleinput2: "1 42",
    sampleoutput1: "",
    sampleoutput2: "",
    input1: "4 0 3 0 9",
    input2: "3 5 5 5",
    input3: "6 1000 2000 3000 4000 5000 6000",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    int n;
    cin >> n;
    int pos[1000];
    for (int i = 0; i < n; i++) {
        cin >> pos[i];
    }
    int distance = 0;
    for (int i = 1; i < n; i++) {
        int step = pos[i] - pos[i - 1];
        if (step < 0) {
            step = -step;
        }
        distance += step;
    }
    int back = pos[n - 1] - pos[0];
    if (back < 0) {
        back = -back;
    }
    distance += back;
    int farthest = pos[0];
    for (int i = 1; i < n; i++) {
        if (pos[i] > farthest) {
            farthest = pos[i];
        }
    }
    int sum = 0;
    for (int i = 0; i < n; i++) {
        sum += pos[i];
    }
    double average = sum / (double)n;
    int above = 0;
    for (int i = 0; i < n; i++) {
        if (pos[i] > average) {
            above++;
        }
    }
    cout << "Total distance: " << distance << endl;
    cout << "Farthest position: " << farthest << endl;
    cout << fixed << setprecision(2) << "Average position: " << average << endl;
    cout << "Above average: " << above << endl;
    return 0;
}`,
    blacklist: "sort(, abs(",
    whitelist: "for, if, cin, cout",
  },
  {
    title: "Stock Price Trade Analyzer",
    description:
      "A trading app studies the closing price of a stock over N days numbered from 0. One trade is allowed: buy on some day and sell on a strictly later day. Read N and then N prices into an array, then report the best trade: the earliest buy day and the earliest sell day that achieve the maximum possible profit (price difference between the sell day and the buy day). If no strictly later day gives a higher price, print No profitable trade.\n\nInput Format:\nOne line with N + 1 integers: N followed by the N prices.\n\nOutput Format:\nBuy day: <buy day index>\nSell day: <sell day index>\nProfit: <price difference>\nor the single line\nNo profitable trade\n\nConstraints:\n2 <= N <= 1000, 0 <= price <= 10000",
    difficulty: "hard",
    maxscore: 30,
    topic: "1D Arrays",
    subtopic: "Searching in Arrays",
    inputconstrains: "2 <= N <= 1000, 0 <= price <= 10000",
    sampleinput1: "6 100 180 260 40 535 490",
    sampleinput2: "5 9 8 7 6 5",
    sampleoutput1: "",
    sampleoutput2: "",
    input1: "2 10 20",
    input2: "4 5 5 5 5",
    input3: "7 3 1 4 1 5 9 2",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int price[1000];
    for (int i = 0; i < n; i++) {
        cin >> price[i];
    }
    int bestProfit = 0;
    int buyDay = -1;
    int sellDay = -1;
    int minPrice = price[0];
    int minDay = 0;
    for (int j = 1; j < n; j++) {
        int profit = price[j] - minPrice;
        if (profit > bestProfit) {
            bestProfit = profit;
            buyDay = minDay;
            sellDay = j;
        }
        if (price[j] < minPrice) {
            minPrice = price[j];
            minDay = j;
        }
    }
    if (buyDay == -1) {
        cout << "No profitable trade" << endl;
    } else {
        cout << "Buy day: " << buyDay << endl;
        cout << "Sell day: " << sellDay << endl;
        cout << "Profit: " << bestProfit << endl;
    }
    return 0;
}`,
    blacklist: "sort(",
    whitelist: "for, if, cin, cout",
  },
  {
    title: "Heatwave Streak Report",
    description:
      "A meteorological office tracks the maximum temperature for N days and flags a heatwave day when the temperature is strictly above a threshold. Read N, then N temperatures into an array, then the threshold. Find the longest run of consecutive heatwave days and report its length and its start day (the first reading is day 1). If several runs tie for the longest, report the earliest one.\n\nInput Format:\nOne line with N + 2 integers: N, the N temperatures, then the threshold.\n\nOutput Format:\nLongest streak: <length> day(s)\nStart day: <1-based start day of the longest streak>\n\nConstraints:\n1 <= N <= 1000, -50 <= temperature <= 60, at least one temperature is strictly above the threshold",
    difficulty: "hard",
    maxscore: 30,
    topic: "1D Arrays",
    subtopic: "Array Traversal",
    inputconstrains: "1 <= N <= 1000, -50 <= temperature <= 60, at least one temperature is strictly above the threshold",
    sampleinput1: "7 35 40 41 38 40 41 42 39",
    sampleinput2: "1 45 40",
    sampleoutput1: "",
    sampleoutput2: "",
    input1: "5 40 40 40 40 40 39",
    input2: "6 41 40 41 40 41 42 39",
    input3: "4 30 31 32 45 44",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int temp[1000];
    for (int i = 0; i < n; i++) {
        cin >> temp[i];
    }
    int threshold;
    cin >> threshold;
    int bestLen = 0;
    int bestStart = 0;
    int curLen = 0;
    int curStart = 0;
    for (int i = 0; i < n; i++) {
        if (temp[i] > threshold) {
            if (curLen == 0) {
                curStart = i;
            }
            curLen++;
            if (curLen > bestLen) {
                bestLen = curLen;
                bestStart = curStart;
            }
        } else {
            curLen = 0;
        }
    }
    cout << "Longest streak: " << bestLen << " day(s)" << endl;
    cout << "Start day: " << bestStart + 1 << endl;
    return 0;
}`,
    blacklist: "sort(",
    whitelist: "for, if, cin, cout",
  },
  {
    title: "Library Shelf Rearranger",
    description:
      "A librarian reorganises a shelf so that all even shelf codes come first and all odd shelf codes go to the back, while the relative order of the even codes among themselves and of the odd codes among themselves is preserved (a stable manual partition, no STL). Read N and then N shelf codes into an array, perform the rearrangement, then print the final arrangement and both counts.\n\nInput Format:\nOne line with N + 1 integers: N followed by the N shelf codes.\n\nOutput Format:\nThe rearranged codes separated by single spaces on one line, then:\nEven codes: <count of even codes>\nOdd codes: <count of odd codes>\n\nConstraints:\n1 <= N <= 1000, 0 <= shelf code <= 9999",
    difficulty: "hard",
    maxscore: 30,
    topic: "1D Arrays",
    subtopic: "Array Reversal and Rotation",
    inputconstrains: "1 <= N <= 1000, 0 <= shelf code <= 9999",
    sampleinput1: "6 3 8 5 2 9 4",
    sampleinput2: "4 1 3 5 7",
    sampleoutput1: "",
    sampleoutput2: "",
    input1: "1 6",
    input2: "5 0 1 2 3 4",
    input3: "7 2 2 3 3 4 4 5",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int arr[1000];
    int arranged[1000];
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    int k = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] % 2 == 0) {
            arranged[k++] = arr[i];
        }
    }
    for (int i = 0; i < n; i++) {
        if (arr[i] % 2 != 0) {
            arranged[k++] = arr[i];
        }
    }
    int evens = 0;
    int odds = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] % 2 == 0) {
            evens++;
        } else {
            odds++;
        }
    }
    for (int i = 0; i < n; i++) {
        cout << arranged[i];
        if (i < n - 1) {
            cout << " ";
        }
    }
    cout << endl;
    cout << "Even codes: " << evens << endl;
    cout << "Odd codes: " << odds << endl;
    return 0;
}`,
    blacklist: "stable_partition(, partition(, sort(",
    whitelist: "for, if, cin, cout",
  },
];

export const mcqs = [
  // ------------------------------------------------------------------ easy
  {
    title: "First Index of an Array",
    description:
      "An array is declared as int marks[10];. Which expression accesses its first element?",
    difficulty: "easy",
    topic: "1D Arrays",
    subtopic: "Array Declaration and Initialization",
    Option1: "marks[1]",
    Option2: "marks[0]",
    Option3: "marks[10]",
    Option4: "marks[first]",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Correct Array Declaration",
    description:
      "Which line correctly declares an array named scores that can hold 6 integers?",
    difficulty: "easy",
    topic: "1D Arrays",
    subtopic: "Array Declaration and Initialization",
    Option1: "int scores[6];",
    Option2: "int[6] scores;",
    Option3: "scores int[6];",
    Option4: "int scores(6);",
    CorrectOption: 1,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Array Size Cannot Change",
    description:
      "After the declaration int data[50];, what happens to the size of this C-style array while the program runs?",
    difficulty: "easy",
    topic: "1D Arrays",
    subtopic: "Array Declaration and Initialization",
    Option1: "It grows whenever a new element is added",
    Option2: "It shrinks whenever an element is removed",
    Option3: "It depends on how the compiler is configured",
    Option4: "It stays fixed at 50 until the program ends",
    CorrectOption: 4,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Contiguous Storage of Arrays",
    description: "How are the elements of a C-style array arranged in memory?",
    difficulty: "easy",
    topic: "1D Arrays",
    subtopic: "Array Declaration and Initialization",
    Option1: "Scattered anywhere the allocator finds free space",
    Option2: "In one contiguous block of consecutive addresses",
    Option3: "As a linked chain of nodes connected by pointers",
    Option4: "In reverse order of their indexes",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Uninitialized Local Array Values",
    description:
      "The statement int temp[5]; appears inside main() and no values are assigned yet. What is safe to say about the elements before any assignment?",
    difficulty: "easy",
    topic: "1D Arrays",
    subtopic: "Array Declaration and Initialization",
    Option1: "Every element is guaranteed to be 0",
    Option2: "Every element is guaranteed to be 1",
    Option3: "The elements hold indeterminate garbage values and must be set before use",
    Option4: "The compiler reports an error until values are assigned",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Legal Subscript Range for Arrays",
    description: "For the array int a[8];, which range of index values is legal to use?",
    difficulty: "easy",
    topic: "1D Arrays",
    subtopic: "Array Traversal",
    Option1: "0 through 8",
    Option2: "1 through 8",
    Option3: "0 through 7",
    Option4: "1 through 7",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Static Array vs Heap Array",
    description:
      "Which statement about the declaration int arr[5]; compared with int* p = new int[n]; (where n is read at runtime) is TRUE?",
    difficulty: "easy",
    topic: "1D Arrays",
    subtopic: "Array Declaration and Initialization",
    Option1: "Both sizes are fixed at compile time",
    Option2: "new int[n] allocates the array on the heap at runtime and must later be released with delete[]",
    Option3: "The size of arr can be changed later in the program",
    Option4: "new int[n] creates the array on the stack like arr",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Accessing the Last Element",
    description:
      "The array int a[6]; has been filled with six values. Which expression reads its last element?",
    difficulty: "easy",
    topic: "1D Arrays",
    subtopic: "Array Traversal",
    Option1: "a[5]",
    Option2: "a[6]",
    Option3: "a[1]",
    Option4: "a[last]",
    CorrectOption: 1,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "One Type per Array",
    description: "What must be true about the elements stored in one C++ array?",
    difficulty: "easy",
    topic: "1D Arrays",
    subtopic: "Array Declaration and Initialization",
    Option1: "They must all be prime numbers",
    Option2: "They must all be positive",
    Option3: "They may freely mix different data types",
    Option4: "They must all be the same data type",
    CorrectOption: 4,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Loop Bound for Full Traversal",
    description:
      "Which loop visits every element of the array int a[10]; exactly once?",
    difficulty: "easy",
    topic: "1D Arrays",
    subtopic: "Array Traversal",
    Option1: "for (int i = 1; i <= 10; i++)",
    Option2: "for (int i = 0; i <= 10; i++)",
    Option3: "for (int i = 0; i < 10; i++)",
    Option4: "for (int i = 0; i < 11; i++)",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },

  // ----------------------------------------------------------------- medium
  {
    title: "Traversal Printout Prediction",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "1D Arrays",
    subtopic: "Array Traversal",
    Option1: "0:10 1:20 2:30 3:40",
    Option2: "1:10 2:20 3:30 4:40",
    Option3: "0:10 1:20 2:30 3:40 4:0",
    Option4: "10 20 30 40",
    CorrectOption: 1,
    codesnippet: `#include <iostream>
using namespace std;
int main() {
    int a[4] = {10, 20, 30, 40};
    for (int i = 0; i < 4; i++) {
        cout << i << ":" << a[i] << " ";
    }
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nint main() {\n    int a[4] = {10, 20, 30, 40};\n    for (int i = 0; i < 4; i++) {\n        cout << i << ":" << a[i] << " ";\n    }\n    return 0;\n}`,
      stdin: "",
      expected: "0:10 1:20 2:30 3:40",
    },
  },
  {
    title: "Loop Bound Off By One",
    description:
      "The loop below stops one element early. What does this program print?",
    difficulty: "medium",
    topic: "1D Arrays",
    subtopic: "Array Traversal",
    Option1: "30",
    Option2: "20",
    Option3: "10",
    Option4: "24",
    CorrectOption: 2,
    codesnippet: `#include <iostream>
using namespace std;
int main() {
    int a[5] = {2, 4, 6, 8, 10};
    int sum = 0;
    for (int i = 0; i < 4; i++) {
        sum += a[i];
    }
    cout << sum;
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nint main() {\n    int a[5] = {2, 4, 6, 8, 10};\n    int sum = 0;\n    for (int i = 0; i < 4; i++) {\n        sum += a[i];\n    }\n    cout << sum;\n    return 0;\n}`,
      stdin: "",
      expected: "20",
    },
  },
  {
    title: "Array Sizeof in Main",
    description:
      "sizeof applied to the real array inside main() knows the full array size. What does this program print on a typical 64-bit compiler?",
    difficulty: "medium",
    topic: "1D Arrays",
    subtopic: "Array Declaration and Initialization",
    Option1: "20 3",
    Option2: "8 3",
    Option3: "5 3",
    Option4: "40 3",
    CorrectOption: 1,
    codesnippet: `#include <iostream>
using namespace std;
int headOf(int arr[]) {
    return arr[0];
}
int main() {
    int a[5] = {3, 6, 9, 12, 15};
    cout << sizeof(a) << " " << headOf(a);
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nint headOf(int arr[]) {\n    return arr[0];\n}\nint main() {\n    int a[5] = {3, 6, 9, 12, 15};\n    cout << sizeof(a) << " " << headOf(a);\n    return 0;\n}`,
      stdin: "",
      expected: "20 3",
    },
  },
  {
    title: "Partial Array Loop Sum",
    description:
      "Only the first three elements of the array are used. What does this program print?",
    difficulty: "medium",
    topic: "1D Arrays",
    subtopic: "Array Traversal",
    Option1: "105",
    Option2: "60",
    Option3: "30",
    Option4: "15",
    CorrectOption: 3,
    codesnippet: `#include <iostream>
using namespace std;
int main() {
    int a[6] = {5, 10, 15, 20, 25, 30};
    int picked = 0;
    for (int i = 0; i < 3; i++) {
        picked += a[i];
    }
    cout << picked;
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nint main() {\n    int a[6] = {5, 10, 15, 20, 25, 30};\n    int picked = 0;\n    for (int i = 0; i < 3; i++) {\n        picked += a[i];\n    }\n    cout << picked;\n    return 0;\n}`,
      stdin: "",
      expected: "30",
    },
  },
  {
    title: "Indexing as Pointer Addition",
    description:
      "In terms of pointer arithmetic, what does the expression arr[i] mean?",
    difficulty: "medium",
    topic: "1D Arrays",
    subtopic: "Array Declaration and Initialization",
    Option1: "*(arr + i)",
    Option2: "arr + i",
    Option3: "&arr[i]",
    Option4: "*arr + i",
    CorrectOption: 1,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "sizeof on an Array Parameter",
    description:
      "A function receives an array through its parameter written as int arr[]. What does sizeof(arr) return inside that function?",
    difficulty: "medium",
    topic: "1D Arrays",
    subtopic: "Array Declaration and Initialization",
    Option1: "The total number of bytes occupied by the whole array",
    Option2: "The number of elements in the array",
    Option3: "The size of one pointer to the first element (the array decays to a pointer)",
    Option4: "A compile-time error",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },

  // ------------------------------------------------------------------- hard
  {
    title: "Pointer Arithmetic on Array Name",
    description: "What does this program print?",
    difficulty: "hard",
    topic: "1D Arrays",
    subtopic: "Array Traversal",
    Option1: "486",
    Option2: "468",
    Option3: "864",
    Option4: "Compile error",
    CorrectOption: 1,
    codesnippet: `#include <iostream>
using namespace std;
int main() {
    int a[4] = {2, 4, 6, 8};
    int* p = a;
    cout << *(p + 1) << *(p + 3) << *(a + 2);
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nint main() {\n    int a[4] = {2, 4, 6, 8};\n    int* p = a;\n    cout << *(p + 1) << *(p + 3) << *(a + 2);\n    return 0;\n}`,
      stdin: "",
      expected: "486",
    },
  },
  {
    title: "Symmetric Index Notation",
    description:
      "C++ treats a[i] exactly as *(a + i). What does this program print?",
    difficulty: "hard",
    topic: "1D Arrays",
    subtopic: "Array Declaration and Initialization",
    Option1: "0",
    Option2: "1",
    Option3: "Compile error",
    Option4: "It prints the value 10",
    CorrectOption: 2,
    codesnippet: `#include <iostream>
using namespace std;
int main() {
    int a[3] = {5, 10, 15};
    cout << (a[1] == 1[a]);
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nint main() {\n    int a[3] = {5, 10, 15};\n    cout << (a[1] == 1[a]);\n    return 0;\n}`,
      stdin: "",
      expected: "1",
    },
  },
  {
    title: "Write Through a Pointer",
    description: "What does this program print?",
    difficulty: "hard",
    topic: "1D Arrays",
    subtopic: "Array Traversal",
    Option1: "123",
    Option2: "923",
    Option3: "927",
    Option4: "197",
    CorrectOption: 3,
    codesnippet: `#include <iostream>
using namespace std;
int main() {
    int a[3] = {1, 2, 3};
    int* p = a;
    *p = 9;
    p[2] = 7;
    cout << a[0] << a[1] << a[2];
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nint main() {\n    int a[3] = {1, 2, 3};\n    int* p = a;\n    *p = 9;\n    p[2] = 7;\n    cout << a[0] << a[1] << a[2];\n    return 0;\n}`,
      stdin: "",
      expected: "927",
    },
  },
  {
    title: "Why Arrays Decay in Calls",
    description:
      "When an array is passed to a function whose parameter is written int arr[], what actually travels into the function?",
    difficulty: "hard",
    topic: "1D Arrays",
    subtopic: "Array Declaration and Initialization",
    Option1: "A full copy of every element of the array",
    Option2: "The array together with its length hidden inside it",
    Option3: "A reference counted handle that manages the array",
    Option4: "Only the address of the first element, because the array name decays to a pointer",
    CorrectOption: 4,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
];
