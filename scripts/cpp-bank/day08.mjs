/**
 * OOPS using CPP — Day 8: 2D Arrays
 * 20 code questions (10 easy: 6 basics + 4 real-world, 6 medium, 4 hard)
 * 20 MCQs (10 easy, 6 medium, 4 hard)
 * All solutions are fresh C++ written for this course (no conversions).
 */
export const meta = {
  day: 8,
  topic: "2D Arrays",
};

export const code = [
  // ------------------------------------------------------------------ easy
  {
    title: "Matrix Reader and Printer",
    description:
      "A teacher types a class marks grid into a grading tool. Read the number of rows R and columns C, then R*C integers that fill the matrix row by row. Print the matrix exactly as given, one row per line with values separated by single spaces.\n\nInput Format:\nFirst line: R and C.\nThen: R*C integers in row-major order (all of row 1, then row 2, and so on).\n\nOutput Format:\nR lines, each containing the C integers of that row separated by single spaces.\n\nConstraints:\n1 <= R, C <= 50, -1000 <= element <= 1000",
    difficulty: "easy",
    maxscore: 10,
    topic: "2D Arrays",
    subtopic: "Matrix Input and Output",
    inputconstrains: "1 <= R, C <= 50, -1000 <= element <= 1000",
    sampleinput1: "2 3\n1 2 3\n4 5 6",
    sampleinput2: "1 4\n9 8 7 6",
    sampleoutput1: "",
    sampleoutput2: "",
    input1: "3 3\n5 0 -2\n1 1 1\n9 9 9",
    input2: "1 1\n42",
    input3: "2 2\n-1 -2\n-3 -4",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int r, c;
    cin >> r >> c;
    int a[50][50];
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            cin >> a[i][j];
        }
    }
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            cout << a[i][j];
            if (j < c - 1) cout << " ";
        }
        cout << endl;
    }
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Matrix Row Sum Reporter",
    description:
      "A fitness coach logs the reps each athlete completes on several stations in a grid. Read R and C, then the R*C log values in row-major order. Print the matrix, then a summary line with the sum of every row.\n\nInput Format:\nFirst line: R and C.\nThen: R*C integers in row-major order.\n\nOutput Format:\nR lines with the matrix rows (values separated by single spaces), then one line:\nRow sums: <sum of row 1> <sum of row 2> ... <sum of row R>\n\nConstraints:\n1 <= R, C <= 50, 0 <= element <= 100",
    difficulty: "easy",
    maxscore: 10,
    topic: "2D Arrays",
    subtopic: "Matrix Input and Output",
    inputconstrains: "1 <= R, C <= 50, 0 <= element <= 100",
    sampleinput1: "2 3\n1 2 3\n4 5 6",
    sampleinput2: "1 2\n10 20",
    sampleoutput1: "",
    sampleoutput2: "",
    input1: "3 2\n5 5\n0 0\n7 8",
    input2: "1 1\n9",
    input3: "2 2\n1 2\n3 4",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int r, c;
    cin >> r >> c;
    int a[50][50];
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            cin >> a[i][j];
        }
    }
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            cout << a[i][j];
            if (j < c - 1) cout << " ";
        }
        cout << endl;
    }
    cout << "Row sums: ";
    for (int i = 0; i < r; i++) {
        int s = 0;
        for (int j = 0; j < c; j++) {
            s += a[i][j];
        }
        cout << s;
        if (i < r - 1) cout << " ";
    }
    cout << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Matrix Column Sum Reporter",
    description:
      "A canteen manager tracks how many plates of each dish were sold at every counter, stored as a grid. Read R and C, then the R*C sales values in row-major order. Print the matrix, then a summary line with the sum of every column.\n\nInput Format:\nFirst line: R and C.\nThen: R*C integers in row-major order.\n\nOutput Format:\nR lines with the matrix rows (values separated by single spaces), then one line:\nColumn sums: <sum of column 1> <sum of column 2> ... <sum of column C>\n\nConstraints:\n1 <= R, C <= 50, 0 <= element <= 100",
    difficulty: "easy",
    maxscore: 10,
    topic: "2D Arrays",
    subtopic: "Matrix Input and Output",
    inputconstrains: "1 <= R, C <= 50, 0 <= element <= 100",
    sampleinput1: "2 2\n1 2\n3 4",
    sampleinput2: "3 1\n2\n3\n4",
    sampleoutput1: "",
    sampleoutput2: "",
    input1: "2 3\n1 2 3\n4 5 6",
    input2: "1 3\n5 6 7",
    input3: "2 3\n0 0 0\n0 0 0",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int r, c;
    cin >> r >> c;
    int a[50][50];
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            cin >> a[i][j];
        }
    }
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            cout << a[i][j];
            if (j < c - 1) cout << " ";
        }
        cout << endl;
    }
    cout << "Column sums: ";
    for (int j = 0; j < c; j++) {
        int s = 0;
        for (int i = 0; i < r; i++) {
            s += a[i][j];
        }
        cout << s;
        if (j < c - 1) cout << " ";
    }
    cout << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Largest Element Locator",
    description:
      "A quality team scans a defect score grid and must know where the worst defect is. Read R and C, then the R*C scores in row-major order. Print the largest score and its position (1-based row and column). If the largest value appears several times, report the first occurrence when scanning rows from top to bottom and each row left to right.\n\nInput Format:\nFirst line: R and C.\nThen: R*C integers in row-major order.\n\nOutput Format:\nLargest: <value>\nRow: <row number, 1-based>\nColumn: <column number, 1-based>\n\nConstraints:\n1 <= R, C <= 50, -1000 <= element <= 1000",
    difficulty: "easy",
    maxscore: 10,
    topic: "2D Arrays",
    subtopic: "2D Array Declaration",
    inputconstrains: "1 <= R, C <= 50, -1000 <= element <= 1000",
    sampleinput1: "2 3\n4 9 2\n8 3 5",
    sampleinput2: "1 1\n7",
    sampleoutput1: "",
    sampleoutput2: "",
    input1: "3 3\n1 2 3\n9 8 7\n6 5 4",
    input2: "2 2\n-5 -1\n-9 -3",
    input3: "2 4\n5 5 5 5\n5 5 5 5",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int r, c;
    cin >> r >> c;
    int a[50][50];
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            cin >> a[i][j];
        }
    }
    int best = a[0][0];
    int bi = 0, bj = 0;
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            if (a[i][j] > best) {
                best = a[i][j];
                bi = i;
                bj = j;
            }
        }
    }
    cout << "Largest: " << best << endl;
    cout << "Row: " << bi + 1 << endl;
    cout << "Column: " << bj + 1 << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Matrix Total Sum",
    description:
      "A battery pack arranges its cells in a grid and the controller reports the total capacity. Read R and C, then the R*C cell values in row-major order, and print the sum of every element.\n\nInput Format:\nFirst line: R and C.\nThen: R*C integers in row-major order.\n\nOutput Format:\nTotal sum: <sum of all R*C elements>\n\nConstraints:\n1 <= R, C <= 50, -1000 <= element <= 1000",
    difficulty: "easy",
    maxscore: 10,
    topic: "2D Arrays",
    subtopic: "2D Array Declaration",
    inputconstrains: "1 <= R, C <= 50, -1000 <= element <= 1000",
    sampleinput1: "2 2\n1 2\n3 4",
    sampleinput2: "1 3\n5 5 5",
    sampleoutput1: "",
    sampleoutput2: "",
    input1: "2 3\n1 -1 2\n-2 3 0",
    input2: "1 1\n-7",
    input3: "3 3\n1 1 1\n1 1 1\n1 1 1",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int r, c;
    cin >> r >> c;
    int a[50][50];
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            cin >> a[i][j];
        }
    }
    int total = 0;
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            total += a[i][j];
        }
    }
    cout << "Total sum: " << total << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Zero Cell Counter",
    description:
      "A sensor grid reports 0 when a sensor is offline and any other value when it is active. Read R and C, then the R*C readings in row-major order, and count how many cells are exactly 0.\n\nInput Format:\nFirst line: R and C.\nThen: R*C integers in row-major order.\n\nOutput Format:\nZero count: <number of cells equal to 0>\n\nConstraints:\n1 <= R, C <= 50, -1000 <= element <= 1000",
    difficulty: "easy",
    maxscore: 10,
    topic: "2D Arrays",
    subtopic: "2D Array Declaration",
    inputconstrains: "1 <= R, C <= 50, -1000 <= element <= 1000",
    sampleinput1: "2 3\n0 1 0\n2 0 3",
    sampleinput2: "1 2\n5 6",
    sampleoutput1: "",
    sampleoutput2: "",
    input1: "2 2\n0 0\n0 0",
    input2: "3 1\n0\n7\n0",
    input3: "2 2\n0 1\n1 0",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int r, c;
    cin >> r >> c;
    int a[50][50];
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            cin >> a[i][j];
        }
    }
    int zeros = 0;
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            if (a[i][j] == 0) {
                zeros++;
            }
        }
    }
    cout << "Zero count: " << zeros << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Seat Booking Map",
    description:
      "An auditorium seats visitors in a grid; each cell is 0 for available or 1 for booked. Read R and C, then the R*C seat states in row-major order. Print the seat map where every 0 becomes 'A' (available) and every 1 becomes 'B' (booked), one row per line with no spaces, then print how many seats are booked.\n\nInput Format:\nFirst line: R and C.\nThen: R*C values, each 0 or 1, in row-major order.\n\nOutput Format:\nR lines of A/B characters (C characters per line, no spaces), then:\nBooked: <number of 1s>\n\nConstraints:\n1 <= R, C <= 50, each value is 0 or 1",
    difficulty: "easy",
    maxscore: 10,
    topic: "2D Arrays",
    subtopic: "Patterns Using Arrays",
    inputconstrains: "1 <= R, C <= 50, each value is 0 or 1",
    sampleinput1: "2 4\n0 1 0 0\n1 1 0 0",
    sampleinput2: "1 3\n0 0 0",
    sampleoutput1: "",
    sampleoutput2: "",
    input1: "3 3\n1 0 1\n0 1 0\n1 0 1",
    input2: "1 1\n1",
    input3: "2 2\n0 0\n0 1",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int r, c;
    cin >> r >> c;
    int a[50][50];
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            cin >> a[i][j];
        }
    }
    int booked = 0;
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            if (a[i][j] == 1) {
                cout << 'B';
                booked++;
            } else {
                cout << 'A';
            }
        }
        cout << endl;
    }
    cout << "Booked: " << booked << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Temperature Grid Report",
    description:
      "A weather bureau arranges its stations in a grid and needs the peak reading of every belt (row). Read R and C, then the R*C readings in row-major order, then print the maximum reading of each row.\n\nInput Format:\nFirst line: R and C.\nThen: R*C integers in row-major order.\n\nOutput Format:\nR lines, one per row:\nRow <i> max: <largest value in row i>\n(rows are numbered from 1)\n\nConstraints:\n1 <= R, C <= 50, -50 <= element <= 60",
    difficulty: "easy",
    maxscore: 10,
    topic: "2D Arrays",
    subtopic: "Matrix Input and Output",
    inputconstrains: "1 <= R, C <= 50, -50 <= element <= 60",
    sampleinput1: "2 3\n30 35 28\n20 25 40",
    sampleinput2: "1 2\n-5 -40",
    sampleoutput1: "",
    sampleoutput2: "",
    input1: "3 2\n10 20\n30 5\n0 15",
    input2: "1 1\n50",
    input3: "2 4\n-10 -20 -30 -40\n60 0 -5 10",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int r, c;
    cin >> r >> c;
    int a[50][50];
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            cin >> a[i][j];
        }
    }
    for (int i = 0; i < r; i++) {
        int mx = a[i][0];
        for (int j = 1; j < c; j++) {
            if (a[i][j] > mx) {
                mx = a[i][j];
            }
        }
        cout << "Row " << i + 1 << " max: " << mx << endl;
    }
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Pixel Brightness Grid",
    description:
      "A phone camera reduces an image to a tiny grid of brightness values from 0 to 255. Read R and C, then the R*C pixel values in row-major order, and print the average brightness with exactly two decimal places.\n\nInput Format:\nFirst line: R and C.\nThen: R*C integers in row-major order.\n\nOutput Format:\nAverage brightness: <average of all pixels with exactly 2 decimals>\n\nConstraints:\n1 <= R, C <= 50, 0 <= element <= 255",
    difficulty: "easy",
    maxscore: 10,
    topic: "2D Arrays",
    subtopic: "Matrix Input and Output",
    inputconstrains: "1 <= R, C <= 50, 0 <= element <= 255",
    sampleinput1: "2 2\n10 20\n30 40",
    sampleinput2: "1 3\n255 255 255",
    sampleoutput1: "",
    sampleoutput2: "",
    input1: "2 3\n0 0 0\n255 255 255",
    input2: "1 1\n7",
    input3: "2 2\n1 2\n3 4",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    int r, c;
    cin >> r >> c;
    int a[50][50];
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            cin >> a[i][j];
        }
    }
    int total = 0;
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            total += a[i][j];
        }
    }
    double avg = (double)total / (r * c);
    cout << fixed << setprecision(2) << "Average brightness: " << avg << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },
  {
    title: "Warehouse Rack Loads",
    description:
      "A warehouse has R racks and every rack holds C shelves; each shelf stores one weight in kg. Read R and C, then the R*C weights in row-major order. Print the total load of every rack and name the heaviest rack; if several racks tie, pick the one with the smallest rack number.\n\nInput Format:\nFirst line: R and C.\nThen: R*C integers in row-major order.\n\nOutput Format:\nR lines, one per rack:\nRack <i> load: <sum of row i>\nThen:\nHeaviest rack: <rack number> (load <that load>)\n\nConstraints:\n1 <= R, C <= 50, 0 <= element <= 500",
    difficulty: "easy",
    maxscore: 10,
    topic: "2D Arrays",
    subtopic: "Matrix Input and Output",
    inputconstrains: "1 <= R, C <= 50, 0 <= element <= 500",
    sampleinput1: "2 3\n10 20 30\n5 5 5",
    sampleinput2: "1 2\n40 60",
    sampleoutput1: "",
    sampleoutput2: "",
    input1: "3 2\n1 2\n9 9\n3 3",
    input2: "2 1\n5\n5",
    input3: "2 2\n0 0\n0 0",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int r, c;
    cin >> r >> c;
    int a[50][50];
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            cin >> a[i][j];
        }
    }
    int heaviestIdx = 0;
    int heaviestLoad = -1;
    for (int i = 0; i < r; i++) {
        int load = 0;
        for (int j = 0; j < c; j++) {
            load += a[i][j];
        }
        cout << "Rack " << i + 1 << " load: " << load << endl;
        if (load > heaviestLoad) {
            heaviestLoad = load;
            heaviestIdx = i;
        }
    }
    cout << "Heaviest rack: " << heaviestIdx + 1 << " (load " << heaviestLoad << ")" << endl;
    return 0;
}`,
    blacklist: "",
    whitelist: "",
  },

  // ----------------------------------------------------------------- medium
  {
    title: "Section Score Merger",
    description:
      "Two sections of a course wrote the same test and the coordinator stores both score grids with the same shape. Read R and C, then the R*C scores of section A, then the R*C scores of section B. Print the combined grid obtained by adding the two matrices cell by cell.\n\nInput Format:\nFirst line: R and C.\nThen: R*C integers (matrix A) in row-major order.\nThen: R*C integers (matrix B) in row-major order.\n\nOutput Format:\nR lines with the sum matrix, values separated by single spaces.\n\nConstraints:\n1 <= R, C <= 50, -100 <= element <= 100",
    difficulty: "medium",
    maxscore: 20,
    topic: "2D Arrays",
    subtopic: "Matrix Addition and Subtraction",
    inputconstrains: "1 <= R, C <= 50, -100 <= element <= 100",
    sampleinput1: "2 2\n1 2\n3 4\n5 6\n7 8",
    sampleinput2: "1 3\n1 1 1\n2 2 2",
    sampleoutput1: "",
    sampleoutput2: "",
    input1: "2 3\n1 2 3\n4 5 6\n-1 -1 -1\n0 0 0",
    input2: "1 1\n100\n-100",
    input3: "3 1\n1\n2\n3\n4\n5\n6",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int r, c;
    cin >> r >> c;
    int a[50][50], b[50][50];
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            cin >> a[i][j];
        }
    }
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            cin >> b[i][j];
        }
    }
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            cout << a[i][j] + b[i][j];
            if (j < c - 1) cout << " ";
        }
        cout << endl;
    }
    return 0;
}`,
    blacklist: "printf",
    whitelist: "for, cin, cout",
  },
  {
    title: "Warehouse Stock Comparison",
    description:
      "A warehouse chain compares stock counts of the same products in two depots. Read R and C, then depot 1 counts, then depot 2 counts (same shape). Print the difference matrix depot1 - depot2 cell by cell; a negative value means depot 2 holds more of that product.\n\nInput Format:\nFirst line: R and C.\nThen: R*C integers (depot 1) in row-major order.\nThen: R*C integers (depot 2) in row-major order.\n\nOutput Format:\nR lines with the difference matrix (depot1 - depot2), values separated by single spaces.\n\nConstraints:\n1 <= R, C <= 50, -100 <= element <= 100",
    difficulty: "medium",
    maxscore: 20,
    topic: "2D Arrays",
    subtopic: "Matrix Addition and Subtraction",
    inputconstrains: "1 <= R, C <= 50, -100 <= element <= 100",
    sampleinput1: "2 2\n10 20\n30 40\n1 2\n3 4",
    sampleinput2: "1 2\n5 5\n5 5",
    sampleoutput1: "",
    sampleoutput2: "",
    input1: "2 3\n1 2 3\n4 5 6\n3 2 1\n0 0 0",
    input2: "1 1\n0\n-9",
    input3: "2 1\n100\n50\n60\n60",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int r, c;
    cin >> r >> c;
    int a[50][50], b[50][50];
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            cin >> a[i][j];
        }
    }
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            cin >> b[i][j];
        }
    }
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            cout << a[i][j] - b[i][j];
            if (j < c - 1) cout << " ";
        }
        cout << endl;
    }
    return 0;
}`,
    blacklist: "printf",
    whitelist: "for, cin, cout",
  },
  {
    title: "Seating Chart Flip",
    description:
      "An event coordinator stores a seating chart as a grid and the display software needs it flipped: rows must become columns. Read R and C, then the R*C chart values in row-major order, and print the transpose of the matrix.\n\nInput Format:\nFirst line: R and C.\nThen: R*C integers in row-major order.\n\nOutput Format:\nC lines; line j contains the values of column j of the original matrix separated by single spaces (the transpose has C rows and R columns).\n\nConstraints:\n1 <= R, C <= 50, -100 <= element <= 100",
    difficulty: "medium",
    maxscore: 20,
    topic: "2D Arrays",
    subtopic: "Transpose and Diagonals",
    inputconstrains: "1 <= R, C <= 50, -100 <= element <= 100",
    sampleinput1: "2 3\n1 2 3\n4 5 6",
    sampleinput2: "1 2\n7 8",
    sampleoutput1: "",
    sampleoutput2: "",
    input1: "3 3\n1 2 3\n4 5 6\n7 8 9",
    input2: "1 1\n5",
    input3: "2 2\n1 2\n3 4",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int r, c;
    cin >> r >> c;
    int a[50][50];
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            cin >> a[i][j];
        }
    }
    for (int j = 0; j < c; j++) {
        for (int i = 0; i < r; i++) {
            cout << a[i][j];
            if (i < r - 1) cout << " ";
        }
        cout << endl;
    }
    return 0;
}`,
    blacklist: "printf",
    whitelist: "for, cin, cout",
  },
  {
    title: "Game Board Diagonal Scan",
    description:
      "A treasure board game uses a square grid; the two diagonal paths score separately. Read the board size (R and C on the first line, both equal to N), then the N*N board values in row-major order. Print the sum of the main diagonal (top-left to bottom-right) and the sum of the anti-diagonal (top-right to bottom-left).\n\nInput Format:\nFirst line: R and C with R = C = N.\nThen: N*N integers in row-major order.\n\nOutput Format:\nMain diagonal sum: <sum of a[i][i]>\nAnti-diagonal sum: <sum of a[i][N-1-i]>\n\nConstraints:\n1 <= N <= 50, -100 <= element <= 100, R = C guaranteed",
    difficulty: "medium",
    maxscore: 20,
    topic: "2D Arrays",
    subtopic: "Transpose and Diagonals",
    inputconstrains: "1 <= N <= 50, -100 <= element <= 100, R = C guaranteed",
    sampleinput1: "3 3\n1 2 3\n4 5 6\n7 8 9",
    sampleinput2: "1 1\n4",
    sampleoutput1: "",
    sampleoutput2: "",
    input1: "2 2\n1 2\n3 4",
    input2: "3 3\n2 0 0\n0 2 0\n0 0 2",
    input3: "4 4\n1 0 0 1\n0 1 1 0\n0 1 1 0\n1 0 0 1",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    int a[50][50];
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            cin >> a[i][j];
        }
    }
    int mainSum = 0, antiSum = 0;
    for (int i = 0; i < n; i++) {
        mainSum += a[i][i];
        antiSum += a[i][n - 1 - i];
    }
    cout << "Main diagonal sum: " << mainSum << endl;
    cout << "Anti-diagonal sum: " << antiSum << endl;
    return 0;
}`,
    blacklist: "printf",
    whitelist: "for, cin, cout",
  },
  {
    title: "Festival Light Fence Survey",
    description:
      "A festival ground is decorated with lights on a grid; only the border cells (first and last row, first and last column) glow. Read R and C, then the R*C light values in row-major order, and print the sum of all border cells. A single-row or single-column grid has every cell on the border, and each cell is counted only once.\n\nInput Format:\nFirst line: R and C.\nThen: R*C integers in row-major order.\n\nOutput Format:\nBorder sum: <sum of all perimeter cells>\n\nConstraints:\n1 <= R, C <= 50, 0 <= element <= 100",
    difficulty: "medium",
    maxscore: 20,
    topic: "2D Arrays",
    subtopic: "Patterns Using Arrays",
    inputconstrains: "1 <= R, C <= 50, 0 <= element <= 100",
    sampleinput1: "3 3\n1 2 3\n4 5 6\n7 8 9",
    sampleinput2: "1 4\n1 2 3 4",
    sampleoutput1: "",
    sampleoutput2: "",
    input1: "2 2\n1 2\n3 4",
    input2: "3 3\n5 5 5\n5 5 5\n5 5 5",
    input3: "4 1\n1\n2\n3\n4",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int r, c;
    cin >> r >> c;
    int a[50][50];
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            cin >> a[i][j];
        }
    }
    int border = 0;
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            if (i == 0 || i == r - 1 || j == 0 || j == c - 1) {
                border += a[i][j];
            }
        }
    }
    cout << "Border sum: " << border << endl;
    return 0;
}`,
    blacklist: "printf",
    whitelist: "for, if, cin, cout",
  },
  {
    title: "Poster Brightness Scaler",
    description:
      "A design tool scales every level of a poster grid by a whole-number factor. Read R and C, then the R*C levels in row-major order, then the multiplier k on the last line. Print the scaled grid (every element multiplied by k).\n\nInput Format:\nFirst line: R and C.\nThen: R*C integers in row-major order.\nLast line: the integer multiplier k.\n\nOutput Format:\nR lines with the scaled matrix, values separated by single spaces.\n\nConstraints:\n1 <= R, C <= 50, 0 <= element <= 1000, 0 <= k <= 10",
    difficulty: "medium",
    maxscore: 20,
    topic: "2D Arrays",
    subtopic: "Matrix Multiplication",
    inputconstrains: "1 <= R, C <= 50, 0 <= element <= 1000, 0 <= k <= 10",
    sampleinput1: "2 2\n1 2\n3 4\n3",
    sampleinput2: "1 3\n5 0 7\n2",
    sampleoutput1: "",
    sampleoutput2: "",
    input1: "2 2\n10 20\n30 40\n0",
    input2: "1 1\n9\n9",
    input3: "2 3\n1 2 3\n4 5 6\n1",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int r, c;
    cin >> r >> c;
    int a[50][50];
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            cin >> a[i][j];
        }
    }
    int k;
    cin >> k;
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            cout << a[i][j] * k;
            if (j < c - 1) cout << " ";
        }
        cout << endl;
    }
    return 0;
}`,
    blacklist: "printf",
    whitelist: "for, cin, cout",
  },

  // ------------------------------------------------------------------- hard
  {
    title: "Assembly Line Grid Multiplier",
    description:
      "An assembly plant tracks items moving through stages; the stage-count grid (R1 x C1) is multiplied by the routing-weight grid (R2 x C2) to compute line totals. The two matrices are always compatible for multiplication (C1 = R2 guaranteed). Read the dimensions and both grids, echo the dimensions, then print the product matrix.\n\nInput Format:\nFirst line: R1 and C1.\nSecond line: R2 and C2 (C1 = R2 guaranteed).\nThen: R1*C1 integers (matrix A) in row-major order.\nThen: R2*C2 integers (matrix B) in row-major order.\n\nOutput Format:\nA size: <R1>x<C1>\nB size: <R2>x<C2>\nResult size: <R1>x<C2>\nThen R1 lines with the product matrix, values separated by single spaces.\n\nConstraints:\n1 <= R1, C1, R2, C2 <= 50, C1 = R2, -1000 <= element <= 1000",
    difficulty: "hard",
    maxscore: 30,
    topic: "2D Arrays",
    subtopic: "Matrix Multiplication",
    inputconstrains: "1 <= R1, C1, R2, C2 <= 50, C1 = R2, -1000 <= element <= 1000",
    sampleinput1: "2 2\n2 2\n1 2\n3 4\n5 6\n7 8",
    sampleinput2: "1 2\n2 1\n1 2\n3\n4",
    sampleoutput1: "",
    sampleoutput2: "",
    input1: "2 3\n3 2\n1 2 3\n4 5 6\n7 8\n9 10\n11 12",
    input2: "1 1\n1 1\n5\n7",
    input3: "2 2\n2 3\n1 0\n0 1\n9 8 7\n6 5 4",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int r1, c1, r2, c2;
    cin >> r1 >> c1 >> r2 >> c2;
    int a[50][50], b[50][50];
    for (int i = 0; i < r1; i++) {
        for (int j = 0; j < c1; j++) {
            cin >> a[i][j];
        }
    }
    for (int i = 0; i < r2; i++) {
        for (int j = 0; j < c2; j++) {
            cin >> b[i][j];
        }
    }
    cout << "A size: " << r1 << "x" << c1 << endl;
    cout << "B size: " << r2 << "x" << c2 << endl;
    cout << "Result size: " << r1 << "x" << c2 << endl;
    for (int i = 0; i < r1; i++) {
        for (int j = 0; j < c2; j++) {
            int s = 0;
            for (int k = 0; k < c1; k++) {
                s += a[i][k] * b[k][j];
            }
            cout << s;
            if (j < c2 - 1) cout << " ";
        }
        cout << endl;
    }
    return 0;
}`,
    blacklist: "printf, pow(",
    whitelist: "for, cin, cout",
  },
  {
    title: "Signboard Spiral Scan",
    description:
      "A stadium signboard stores a grid of numbers and the controller scans them in spiral order: start at the top-left corner, move right across the top row, then down the rightmost column, then left across the bottom row, then up the leftmost column, and repeat inward until every cell has been visited. Read R and C, then the R*C values in row-major order, and print the spiral scan.\n\nInput Format:\nFirst line: R and C.\nThen: R*C integers in row-major order.\n\nOutput Format:\nR*C lines, one visited element per line in spiral order.\n\nConstraints:\n1 <= R, C <= 50, -1000 <= element <= 1000",
    difficulty: "hard",
    maxscore: 30,
    topic: "2D Arrays",
    subtopic: "Patterns Using Arrays",
    inputconstrains: "1 <= R, C <= 50, -1000 <= element <= 1000",
    sampleinput1: "3 3\n1 2 3\n4 5 6\n7 8 9",
    sampleinput2: "1 4\n1 2 3 4",
    sampleoutput1: "",
    sampleoutput2: "",
    input1: "2 2\n1 2\n3 4",
    input2: "3 4\n1 2 3 4\n5 6 7 8\n9 10 11 12",
    input3: "4 1\n1\n2\n3\n4",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int r, c;
    cin >> r >> c;
    int a[50][50];
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            cin >> a[i][j];
        }
    }
    int top = 0, bottom = r - 1, left = 0, right = c - 1;
    while (top <= bottom && left <= right) {
        for (int j = left; j <= right; j++) {
            cout << a[top][j] << endl;
        }
        top++;
        for (int i = top; i <= bottom; i++) {
            cout << a[i][right] << endl;
        }
        right--;
        if (top <= bottom) {
            for (int j = right; j >= left; j--) {
                cout << a[bottom][j] << endl;
            }
            bottom--;
        }
        if (left <= right) {
            for (int i = bottom; i >= top; i--) {
                cout << a[i][left] << endl;
            }
            left++;
        }
    }
    return 0;
}`,
    blacklist: "printf",
    whitelist: "while, for, if, cin, cout",
  },
  {
    title: "Exam Hall Heatmap Analyzer",
    description:
      "An exam hall monitoring system stores an activity level (0 to 100) for every seat and produces a row-by-row heatmap report. Read R and C, then the R*C levels in row-major order. Print the average level of every row with exactly two decimals, then the row with the highest average; if several rows tie, report the smallest row number.\n\nInput Format:\nFirst line: R and C.\nThen: R*C integers in row-major order.\n\nOutput Format:\nR lines:\nRow <i> average: <average of row i, 2 decimals>\nThen:\nHighest average row: <row number> (<its average, 2 decimals>)\n\nConstraints:\n1 <= R, C <= 50, 0 <= element <= 100",
    difficulty: "hard",
    maxscore: 30,
    topic: "2D Arrays",
    subtopic: "Matrix Input and Output",
    inputconstrains: "1 <= R, C <= 50, 0 <= element <= 100",
    sampleinput1: "2 3\n10 20 30\n5 5 5",
    sampleinput2: "1 2\n7 8",
    sampleoutput1: "",
    sampleoutput2: "",
    input1: "3 2\n50 50\n60 70\n0 0",
    input2: "2 2\n1 2\n3 4",
    input3: "2 3\n5 5 5\n5 5 5",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    int r, c;
    cin >> r >> c;
    int a[50][50];
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            cin >> a[i][j];
        }
    }
    double bestAvg = -1.0;
    int bestRow = 0;
    for (int i = 0; i < r; i++) {
        int sum = 0;
        for (int j = 0; j < c; j++) {
            sum += a[i][j];
        }
        double avg = (double)sum / c;
        cout << fixed << setprecision(2);
        cout << "Row " << i + 1 << " average: " << avg << endl;
        if (avg > bestAvg) {
            bestAvg = avg;
            bestRow = i;
        }
    }
    cout << "Highest average row: " << bestRow + 1 << " (" << bestAvg << ")" << endl;
    return 0;
}`,
    blacklist: "printf",
    whitelist: "for, if, cin, cout, fixed, setprecision",
  },
  {
    title: "Radar Signal Cluster Scanner",
    description:
      "A harbour radar paints a grid where 1 marks a radar echo and 0 marks clear water. Operators count signals in two passes: along each row, a group is a maximal run of consecutive 1s; the same rule applies vertically along each column. Read R and C, then the R*C echoes in row-major order, and print the total number of row groups and column groups.\n\nInput Format:\nFirst line: R and C.\nThen: R*C values, each 0 or 1, in row-major order.\n\nOutput Format:\nRow groups: <total horizontal runs of consecutive 1s over all rows>\nColumn groups: <total vertical runs of consecutive 1s over all columns>\n\nConstraints:\n1 <= R, C <= 50, each value is 0 or 1",
    difficulty: "hard",
    maxscore: 30,
    topic: "2D Arrays",
    subtopic: "Patterns Using Arrays",
    inputconstrains: "1 <= R, C <= 50, each value is 0 or 1",
    sampleinput1: "3 4\n1 1 0 1\n0 1 0 0\n1 0 1 1",
    sampleinput2: "1 1\n0",
    sampleoutput1: "",
    sampleoutput2: "",
    input1: "2 2\n1 1\n1 1",
    input2: "3 3\n1 0 1\n0 1 0\n1 0 1",
    input3: "2 3\n1 1 1\n0 0 0",
    output1: "",
    output2: "",
    output3: "",
    sourcecode: `#include <iostream>
using namespace std;

int main() {
    int r, c;
    cin >> r >> c;
    int a[50][50];
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            cin >> a[i][j];
        }
    }
    int rowGroups = 0;
    for (int i = 0; i < r; i++) {
        for (int j = 0; j < c; j++) {
            if (a[i][j] == 1 && (j == 0 || a[i][j - 1] == 0)) {
                rowGroups++;
            }
        }
    }
    int colGroups = 0;
    for (int j = 0; j < c; j++) {
        for (int i = 0; i < r; i++) {
            if (a[i][j] == 1 && (i == 0 || a[i - 1][j] == 0)) {
                colGroups++;
            }
        }
    }
    cout << "Row groups: " << rowGroups << endl;
    cout << "Column groups: " << colGroups << endl;
    return 0;
}`,
    blacklist: "printf",
    whitelist: "for, if, cin, cout",
  },
];

export const mcqs = [
  // ------------------------------------------------------------------ easy
  {
    title: "Row-Major Layout Rule",
    description: "In C++, the elements of a 2D array are laid out in memory:",
    difficulty: "easy",
    topic: "2D Arrays",
    subtopic: "2D Array Declaration",
    Option1: "Row by row: all of row 0, then all of row 1, and so on",
    Option2: "Column by column: all of column 0, then column 1, and so on",
    Option3: "In a random order decided by the compiler",
    Option4: "Only the diagonal elements are stored contiguously",
    CorrectOption: 1,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Declaring a 3 by 4 Matrix",
    description: "Which statement correctly declares a 2D array named grid with 3 rows and 4 columns of integers?",
    difficulty: "easy",
    topic: "2D Arrays",
    subtopic: "2D Array Declaration",
    Option1: "int grid[4][3];",
    Option2: "int grid[3][4];",
    Option3: "matrix grid[3][4];",
    Option4: "int[3][4] grid;",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Meaning of a[2][1]",
    description: "For a 2D array a, what does the element a[2][1] represent?",
    difficulty: "easy",
    topic: "2D Arrays",
    subtopic: "2D Array Declaration",
    Option1: "Row 1, column 2",
    Option2: "Column 2, row 1 — the first index is always the column",
    Option3: "Row 2, column 1 — the first index is the row, the second is the column",
    Option4: "The 21st element of the array",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Loops to Visit Every Cell",
    description: "What is the minimum number of loops needed to read all R*C elements of a 2D array?",
    difficulty: "easy",
    topic: "2D Arrays",
    subtopic: "Matrix Input and Output",
    Option1: "One loop is enough",
    Option2: "Two nested loops — one for rows, one for columns",
    Option3: "Three nested loops",
    Option4: "No loop; the compiler reads the whole matrix at once",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Total Elements in a 5x6 Array",
    description: "A 2D array is declared as int a[5][6]. How many elements does it hold in total?",
    difficulty: "easy",
    topic: "2D Arrays",
    subtopic: "2D Array Declaration",
    Option1: "11",
    Option2: "56",
    Option3: "25",
    Option4: "30",
    CorrectOption: 4,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Symmetric Matrix Meaning",
    description: "A square matrix A is called symmetric when:",
    difficulty: "easy",
    topic: "2D Arrays",
    subtopic: "Transpose and Diagonals",
    Option1: "All of its elements are positive",
    Option2: "Its diagonal elements are all zero",
    Option3: "It equals its transpose: a[i][j] = a[j][i] for every i and j",
    Option4: "Each row sums to the same value",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Transpose Size",
    description: "The transpose of a 2x3 matrix is a matrix of size:",
    difficulty: "easy",
    topic: "2D Arrays",
    subtopic: "Transpose and Diagonals",
    Option1: "2x3",
    Option2: "3x2",
    Option3: "6x6",
    Option4: "3x3",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Input Fill Order of a Matrix",
    description: "A program reads R and C, then R*C integers into a matrix. In what order are the values filled?",
    difficulty: "easy",
    topic: "2D Arrays",
    subtopic: "Matrix Input and Output",
    Option1: "Column by column, top to bottom",
    Option2: "Diagonal by diagonal",
    Option3: "In reverse order, starting from the last cell",
    Option4: "Row by row, left to right",
    CorrectOption: 4,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Main Diagonal of a Square Matrix",
    description: "In a square matrix of size N x N, the main diagonal consists of:",
    difficulty: "easy",
    topic: "2D Arrays",
    subtopic: "Transpose and Diagonals",
    Option1: "All elements a[i][N-1-i]",
    Option2: "The first row and the first column",
    Option3: "All elements a[i][i] for i from 0 to N-1",
    Option4: "The four corner elements",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Array of Arrays Truth",
    description: "Which statement about int a[3][4] is TRUE?",
    difficulty: "easy",
    topic: "2D Arrays",
    subtopic: "2D Array Declaration",
    Option1: "It is an array of 3 elements, where each element is itself a 1D array of 4 ints",
    Option2: "It is an array of 4 elements, where each element is a 1D array of 3 ints",
    Option3: "It is one flat block of exactly 7 ints",
    Option4: "It stores heap pointers to separately allocated rows",
    CorrectOption: 1,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },

  // ----------------------------------------------------------------- medium
  {
    title: "Nested Loop Print Order",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "2D Arrays",
    subtopic: "Matrix Input and Output",
    Option1: "123 on the first line and 456 on the second line",
    Option2: "142536 on a single line",
    Option3: "456 on the first line and 123 on the second line",
    Option4: "123456 on a single line",
    CorrectOption: 1,
    codesnippet: `#include <iostream>
using namespace std;
int main() {
    int a[2][3] = { {1, 2, 3}, {4, 5, 6} };
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 3; j++) {
            cout << a[i][j];
        }
        cout << endl;
    }
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nint main() {\n    int a[2][3] = { {1, 2, 3}, {4, 5, 6} };\n    for (int i = 0; i < 2; i++) {\n        for (int j = 0; j < 3; j++) {\n            cout << a[i][j];\n        }\n        cout << endl;\n    }\n    return 0;\n}`,
      stdin: "",
      expected: "123\n456\n",
    },
  },
  {
    title: "Column-Outer Traversal Effect",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "2D Arrays",
    subtopic: "Matrix Input and Output",
    Option1: "1234",
    Option2: "4321",
    Option3: "1324",
    Option4: "2413",
    CorrectOption: 3,
    codesnippet: `#include <iostream>
using namespace std;
int main() {
    int a[2][2] = { {1, 2}, {3, 4} };
    for (int j = 0; j < 2; j++) {
        for (int i = 0; i < 2; i++) {
            cout << a[i][j];
        }
    }
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nint main() {\n    int a[2][2] = { {1, 2}, {3, 4} };\n    for (int j = 0; j < 2; j++) {\n        for (int i = 0; i < 2; i++) {\n            cout << a[i][j];\n        }\n    }\n    return 0;\n}`,
      stdin: "",
      expected: "1324",
    },
  },
  {
    title: "Row Sums of a Small Matrix",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "2D Arrays",
    subtopic: "Matrix Input and Output",
    Option1: "6 then 14 on the next line",
    Option2: "8 then 10 on the next line",
    Option3: "614 on a single line",
    Option4: "20 on a single line",
    CorrectOption: 1,
    codesnippet: `#include <iostream>
using namespace std;
int main() {
    int a[2][2] = { {2, 4}, {6, 8} };
    for (int i = 0; i < 2; i++) {
        int s = 0;
        for (int j = 0; j < 2; j++) {
            s += a[i][j];
        }
        cout << s << endl;
    }
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nint main() {\n    int a[2][2] = { {2, 4}, {6, 8} };\n    for (int i = 0; i < 2; i++) {\n        int s = 0;\n        for (int j = 0; j < 2; j++) {\n            s += a[i][j];\n        }\n        cout << s << endl;\n    }\n    return 0;\n}`,
      stdin: "",
      expected: "6\n14\n",
    },
  },
  {
    title: "Diagonal Element Selection",
    description: "What does this program print?",
    difficulty: "medium",
    topic: "2D Arrays",
    subtopic: "Transpose and Diagonals",
    Option1: "753",
    Option2: "159",
    Option3: "123",
    Option4: "147",
    CorrectOption: 2,
    codesnippet: `#include <iostream>
using namespace std;
int main() {
    int a[3][3] = { {1, 2, 3}, {4, 5, 6}, {7, 8, 9} };
    for (int i = 0; i < 3; i++) {
        cout << a[i][i];
    }
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nint main() {\n    int a[3][3] = { {1, 2, 3}, {4, 5, 6}, {7, 8, 9} };\n    for (int i = 0; i < 3; i++) {\n        cout << a[i][i];\n    }\n    return 0;\n}`,
      stdin: "",
      expected: "159",
    },
  },
  {
    title: "Row-Major Flat Index Math",
    description: "A 2D array has 4 columns and is stored row-major with 0-based indexing. At which flat position (counting from 0) is the element a[2][1] stored?",
    difficulty: "medium",
    topic: "2D Arrays",
    subtopic: "2D Array Declaration",
    Option1: "7",
    Option2: "8",
    Option3: "9",
    Option4: "12",
    CorrectOption: 3,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
  {
    title: "Outer Loop Rows for Sequential Access",
    description: "When traversing a row-major 2D array element by element, which loop arrangement accesses memory in sequential (fastest) order?",
    difficulty: "medium",
    topic: "2D Arrays",
    subtopic: "2D Array Declaration",
    Option1: "Outer loop over columns, inner loop over rows",
    Option2: "Outer loop over rows, inner loop over columns",
    Option3: "Both loops over rows",
    Option4: "It makes no difference to memory access order",
    CorrectOption: 2,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },

  // ------------------------------------------------------------------- hard
  {
    title: "In-Place Transpose Swap",
    description: "What does this program print?",
    difficulty: "hard",
    topic: "2D Arrays",
    subtopic: "Transpose and Diagonals",
    Option1: "12 then 34 on the next line (unchanged)",
    Option2: "13 then 24 on the next line",
    Option3: "31 then 42 on the next line",
    Option4: "14 then 23 on the next line",
    CorrectOption: 2,
    codesnippet: `#include <iostream>
using namespace std;
int main() {
    int a[2][2] = { {1, 2}, {3, 4} };
    for (int i = 0; i < 2; i++) {
        for (int j = i + 1; j < 2; j++) {
            int t = a[i][j];
            a[i][j] = a[j][i];
            a[j][i] = t;
        }
    }
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 2; j++) {
            cout << a[i][j];
        }
        cout << endl;
    }
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nint main() {\n    int a[2][2] = { {1, 2}, {3, 4} };\n    for (int i = 0; i < 2; i++) {\n        for (int j = i + 1; j < 2; j++) {\n            int t = a[i][j];\n            a[i][j] = a[j][i];\n            a[j][i] = t;\n        }\n    }\n    for (int i = 0; i < 2; i++) {\n        for (int j = 0; j < 2; j++) {\n            cout << a[i][j];\n        }\n        cout << endl;\n    }\n    return 0;\n}`,
      stdin: "",
      expected: "13\n24\n",
    },
  },
  {
    title: "Checkerboard Index Pattern",
    description: "What does this program print?",
    difficulty: "hard",
    topic: "2D Arrays",
    subtopic: "Patterns Using Arrays",
    Option1: "010 on the first line and 101 on the second",
    Option2: "101 on the first line and 010 on the second",
    Option3: "00 on the first line and 11 on the second",
    Option4: "0110 on a single line",
    CorrectOption: 1,
    codesnippet: `#include <iostream>
using namespace std;
int main() {
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 3; j++) {
            cout << (i + j) % 2;
        }
        cout << endl;
    }
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nint main() {\n    for (int i = 0; i < 2; i++) {\n        for (int j = 0; j < 3; j++) {\n            cout << (i + j) % 2;\n        }\n        cout << endl;\n    }\n    return 0;\n}`,
      stdin: "",
      expected: "010\n101\n",
    },
  },
  {
    title: "Pointer to a Matrix Row",
    description: "What does this program print?",
    difficulty: "hard",
    topic: "2D Arrays",
    subtopic: "2D Array Declaration",
    Option1: "43",
    Option2: "91",
    Option3: "63",
    Option4: "93",
    CorrectOption: 4,
    codesnippet: `#include <iostream>
using namespace std;
int main() {
    int a[2][3] = { {1, 2, 3}, {4, 5, 6} };
    int (*p)[3] = a;
    p[1][0] += 5;
    cout << a[1][0] << a[0][2];
    return 0;
}`,
    snippetLang: "cpp",
    iscodesnippet: true,
    verify: {
      code: `#include <iostream>\nusing namespace std;\nint main() {\n    int a[2][3] = { {1, 2, 3}, {4, 5, 6} };\n    int (*p)[3] = a;\n    p[1][0] += 5;\n    cout << a[1][0] << a[0][2];\n    return 0;\n}`,
      stdin: "",
      expected: "93",
    },
  },
  {
    title: "Contiguous Memory and Address Math",
    description: "A 2D array int a[5][4] is stored contiguously starting at address base. Why does the element a[i][j] sit at base + (i*4 + j) * sizeof(int)?",
    difficulty: "hard",
    topic: "2D Arrays",
    subtopic: "2D Array Declaration",
    Option1: "Each row holds 4 ints, so i complete rows (i*4 ints) are skipped before row i starts",
    Option2: "The array is stored column by column, so j rows are skipped first",
    Option3: "The compiler multiplies the two indexes with each other",
    Option4: "a[i][j] first dereferences a pointer stored in row i",
    CorrectOption: 1,
    codesnippet: null,
    snippetLang: null,
    iscodesnippet: false,
  },
];
