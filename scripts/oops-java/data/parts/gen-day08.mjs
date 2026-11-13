/**
 * Day 8 generator — "OOPS using JAVA" — 2D Arrays
 * Writes the 4 part files consumed by merge-parts.ts.
 */
import fs from "node:fs";
import path from "node:path";

const DIR = "/home/z/my-project/scripts/oops-java/data/parts";
fs.mkdirSync(DIR, { recursive: true });

const TOPIC = "2D Arrays";
const SUBTOPICS = [
  "2D Array Declaration",
  "Matrix Input and Output",
  "Matrix Addition and Subtraction",
  "Matrix Multiplication",
  "Transpose and Diagonals",
  "Patterns Using Arrays",
];

const desc = (body, input, output, constraints) =>
  body + "\n\nInput Format:\n" + input + "\n\nOutput Format:\n" + output + "\n\nConstraints:\n" + constraints;

/* ─────────────────────────────── CODE QUESTIONS ─────────────────────────────── */

const codeQuestions = [];

// 1 ── easy basic ── Matrix Input and Output
codeQuestions.push({
  title: "Read and Print a Matrix",
  description: desc(
    "Write a program that reads a matrix and prints it back exactly. Read two integers r and c, then read r rows of c space-separated integers into a 2D array, and print the matrix row by row with values separated by single spaces.",
    "Line 1: two space-separated integers r and c.\nNext r lines: c space-separated integers each.",
    "r lines, each containing the c values of that row separated by single spaces.",
    "1 <= r, c <= 100, -1000 <= element <= 1000"
  ),
  difficulty: "easy",
  variant: "basic",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Matrix Input and Output",
  sampleinput1: "2 3\n1 2 3\n4 5 6",
  sampleoutput1: "1 2 3\n4 5 6",
  sampleinput2: "1 1\n7",
  sampleoutput2: "7",
  input1: "3 2\n10 20\n30 40\n50 60",
  output1: "10 20\n30 40\n50 60",
  input2: "2 2\n-1 -2\n-3 -4",
  output2: "-1 -2\n-3 -4",
  input3: "4 1\n5\n6\n7\n8",
  output3: "5\n6\n7\n8",
  inputconstrains: "1 <= r, c <= 100, -1000 <= element <= 1000",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int r = sc.nextInt();
        int c = sc.nextInt();
        int[][] a = new int[r][c];
        for(int i = 0; i < r; i++) {
            for(int j = 0; j < c; j++) {
                a[i][j] = sc.nextInt();
            }
        }
        for(int i = 0; i < r; i++) {
            for(int j = 0; j < c; j++) {
                if(j > 0) {
                    System.out.print(" ");
                }
                System.out.print(a[i][j]);
            }
            System.out.println();
        }
    }
}`,
});

// 2 ── easy basic ── Matrix Input and Output
codeQuestions.push({
  title: "Row Sums of a Matrix",
  description: desc(
    "Write a program that reads a matrix and prints the sum of each row. Read r and c, then the r x c matrix, and print one line per row containing that row's sum.",
    "Line 1: two space-separated integers r and c.\nNext r lines: c space-separated integers each.",
    "r lines, line i containing the sum of row i.",
    "1 <= r, c <= 100, -1000 <= element <= 1000"
  ),
  difficulty: "easy",
  variant: "basic",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Matrix Input and Output",
  sampleinput1: "2 3\n1 2 3\n4 5 6",
  sampleoutput1: "6\n15",
  sampleinput2: "1 2\n5 -5",
  sampleoutput2: "0",
  input1: "3 3\n1 1 1\n2 2 2\n3 3 3",
  output1: "3\n6\n9",
  input2: "2 2\n-10 10\n20 -20",
  output2: "0\n0",
  input3: "1 4\n100 200 300 400",
  output3: "1000",
  inputconstrains: "1 <= r, c <= 100, -1000 <= element <= 1000",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int r = sc.nextInt();
        int c = sc.nextInt();
        int[][] a = new int[r][c];
        for(int i = 0; i < r; i++) {
            for(int j = 0; j < c; j++) {
                a[i][j] = sc.nextInt();
            }
        }
        for(int i = 0; i < r; i++) {
            int sum = 0;
            for(int j = 0; j < c; j++) {
                sum = sum + a[i][j];
            }
            System.out.println(sum);
        }
    }
}`,
});

// 3 ── easy basic ── Matrix Input and Output
codeQuestions.push({
  title: "Column Sums of a Matrix",
  description: desc(
    "Write a program that reads a matrix and prints the sum of each column. Read r and c, then the r x c matrix, and print all c column sums on a single line separated by single spaces, starting with column 1.",
    "Line 1: two space-separated integers r and c.\nNext r lines: c space-separated integers each.",
    "One line containing c space-separated integers: the column sums in order from column 1 to column c.",
    "1 <= r, c <= 100, -1000 <= element <= 1000"
  ),
  difficulty: "easy",
  variant: "basic",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Matrix Input and Output",
  sampleinput1: "2 3\n1 2 3\n4 5 6",
  sampleoutput1: "5 7 9",
  sampleinput2: "3 2\n1 2\n3 4\n5 6",
  sampleoutput2: "9 12",
  input1: "2 2\n1 1\n1 1",
  output1: "2 2",
  input2: "1 3\n7 8 9",
  output2: "7 8 9",
  input3: "3 3\n-1 0 1\n-2 0 2\n-3 0 3",
  output3: "-6 0 6",
  inputconstrains: "1 <= r, c <= 100, -1000 <= element <= 1000",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int r = sc.nextInt();
        int c = sc.nextInt();
        int[][] a = new int[r][c];
        for(int i = 0; i < r; i++) {
            for(int j = 0; j < c; j++) {
                a[i][j] = sc.nextInt();
            }
        }
        long[] colSum = new long[c];
        for(int i = 0; i < r; i++) {
            for(int j = 0; j < c; j++) {
                colSum[j] = colSum[j] + a[i][j];
            }
        }
        for(int j = 0; j < c; j++) {
            if(j > 0) {
                System.out.print(" ");
            }
            System.out.print(colSum[j]);
        }
        System.out.println();
    }
}`,
});

// 4 ── easy basic ── Matrix Input and Output
codeQuestions.push({
  title: "Grand Total of Matrix Elements",
  description: desc(
    "Write a program that reads a matrix and prints the sum of all its elements. Read r and c, then the r x c matrix, and print one line with the grand total. Accumulate the total in a long so very large sums are handled safely.",
    "Line 1: two space-separated integers r and c.\nNext r lines: c space-separated integers each.",
    "One line: the sum of all r x c elements.",
    "1 <= r, c <= 100, -1000000000 <= element <= 1000000000"
  ),
  difficulty: "easy",
  variant: "basic",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Matrix Input and Output",
  sampleinput1: "2 3\n1000000 2000000 3000000\n4000000 5000000 6000000",
  sampleoutput1: "21000000",
  sampleinput2: "1 1\n-999",
  sampleoutput2: "-999",
  input1: "3 3\n1 2 3\n4 5 6\n7 8 9",
  output1: "45",
  input2: "2 2\n-1000000 -1000000\n-1000000 -1000000",
  output2: "-4000000",
  input3: "2 2\n1000000000 1000000000\n1000000000 1000000000",
  output3: "4000000000",
  inputconstrains: "1 <= r, c <= 100, -1000000000 <= element <= 1000000000",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int r = sc.nextInt();
        int c = sc.nextInt();
        int[][] a = new int[r][c];
        for(int i = 0; i < r; i++) {
            for(int j = 0; j < c; j++) {
                a[i][j] = sc.nextInt();
            }
        }
        long total = 0;
        for(int i = 0; i < r; i++) {
            for(int j = 0; j < c; j++) {
                total = total + a[i][j];
            }
        }
        System.out.println(total);
    }
}`,
});

// 5 ── easy basic ── Matrix Input and Output
codeQuestions.push({
  title: "Maximum Element with Its Position",
  description: desc(
    "Write a program that finds the largest element of a matrix and reports where it is. Read r and c, then the r x c matrix. Print the maximum value, then its row number, then its column number, each on its own line. Rows and columns are numbered starting from 1. If the maximum appears several times, report the first occurrence scanning rows from top to bottom and each row from left to right.",
    "Line 1: two space-separated integers r and c.\nNext r lines: c space-separated integers each.",
    "Line 1: the maximum value.\nLine 2: its 1-based row number.\nLine 3: its 1-based column number.",
    "1 <= r, c <= 100, -1000000000 <= element <= 1000000000"
  ),
  difficulty: "easy",
  variant: "basic",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Matrix Input and Output",
  sampleinput1: "2 3\n4 9 2\n3 8 1",
  sampleoutput1: "9\n1\n2",
  sampleinput2: "1 1\n42",
  sampleoutput2: "42\n1\n1",
  input1: "3 2\n-5 -2\n-9 -1\n-3 -8",
  output1: "-1\n2\n2",
  input2: "2 2\n7 7\n7 7",
  output2: "7\n1\n1",
  input3: "4 3\n5 6 7\n8 9 1\n2 3 4\n10 0 11",
  output3: "11\n4\n3",
  inputconstrains: "1 <= r, c <= 100, -1000000000 <= element <= 1000000000",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int r = sc.nextInt();
        int c = sc.nextInt();
        int[][] a = new int[r][c];
        for(int i = 0; i < r; i++) {
            for(int j = 0; j < c; j++) {
                a[i][j] = sc.nextInt();
            }
        }
        int maxVal = a[0][0];
        int maxRow = 1;
        int maxCol = 1;
        for(int i = 0; i < r; i++) {
            for(int j = 0; j < c; j++) {
                if(a[i][j] > maxVal) {
                    maxVal = a[i][j];
                    maxRow = i + 1;
                    maxCol = j + 1;
                }
            }
        }
        System.out.println(maxVal);
        System.out.println(maxRow);
        System.out.println(maxCol);
    }
}`,
});

// 6 ── easy basic ── Transpose and Diagonals
codeQuestions.push({
  title: "Main Diagonal of a Square Matrix",
  description: desc(
    "Write a program that prints the main diagonal of a square matrix. Read r and c (they are equal), then the r x c matrix, and print the diagonal elements a[0][0], a[1][1], ..., a[r-1][r-1] on one line separated by single spaces.",
    "Line 1: two space-separated integers r and c with r = c.\nNext r lines: c space-separated integers each.",
    "One line: the main diagonal elements in order, separated by single spaces.",
    "1 <= r = c <= 100, -1000 <= element <= 1000"
  ),
  difficulty: "easy",
  variant: "basic",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Transpose and Diagonals",
  sampleinput1: "3 3\n1 2 3\n4 5 6\n7 8 9",
  sampleoutput1: "1 5 9",
  sampleinput2: "1 1\n5",
  sampleoutput2: "5",
  input1: "2 2\n1 2\n3 4",
  output1: "1 4",
  input2: "4 4\n1 0 0 0\n0 2 0 0\n0 0 3 0\n0 0 0 4",
  output2: "1 2 3 4",
  input3: "3 3\n-1 -2 -3\n-4 -5 -6\n-7 -8 -9",
  output3: "-1 -5 -9",
  inputconstrains: "1 <= r = c <= 100, -1000 <= element <= 1000",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int r = sc.nextInt();
        int c = sc.nextInt();
        int[][] a = new int[r][c];
        for(int i = 0; i < r; i++) {
            for(int j = 0; j < c; j++) {
                a[i][j] = sc.nextInt();
            }
        }
        for(int i = 0; i < r; i++) {
            if(i > 0) {
                System.out.print(" ");
            }
            System.out.print(a[i][i]);
        }
        System.out.println();
    }
}`,
});

// 7 ── easy scenario ── 2D Array Declaration
codeQuestions.push({
  title: "Classroom Seating Chart Grid",
  description: desc(
    "A teacher stores the classroom seating chart as a grid: every seat holds a roll number. Read r and c, then r rows of c roll numbers into a 2D array of exactly that declared size, and print the chart row by row. Prefix each line with the row number in the form Row i: followed by the roll numbers of that row separated by single spaces.",
    "Line 1: two space-separated integers r and c.\nNext r lines: c space-separated integers each (the roll numbers).",
    "r lines. Line i starts with Row i: and then lists the c roll numbers of that row separated by single spaces.",
    "1 <= r, c <= 50, 1 <= roll number <= 999"
  ),
  difficulty: "easy",
  variant: "scenario",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "2D Array Declaration",
  sampleinput1: "2 3\n11 12 13\n21 22 23",
  sampleoutput1: "Row 1: 11 12 13\nRow 2: 21 22 23",
  sampleinput2: "1 2\n101 102",
  sampleoutput2: "Row 1: 101 102",
  input1: "3 2\n1 2\n3 4\n5 6",
  output1: "Row 1: 1 2\nRow 2: 3 4\nRow 3: 5 6",
  input2: "2 1\n7\n8",
  output2: "Row 1: 7\nRow 2: 8",
  input3: "4 4\n1 0 1 0\n0 1 0 1\n1 1 1 1\n0 0 0 0",
  output3: "Row 1: 1 0 1 0\nRow 2: 0 1 0 1\nRow 3: 1 1 1 1\nRow 4: 0 0 0 0",
  inputconstrains: "1 <= r, c <= 50, 1 <= roll number <= 999",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int r = sc.nextInt();
        int c = sc.nextInt();
        int[][] seats = new int[r][c];
        for(int i = 0; i < r; i++) {
            for(int j = 0; j < c; j++) {
                seats[i][j] = sc.nextInt();
            }
        }
        for(int i = 0; i < r; i++) {
            System.out.print("Row " + (i + 1) + ":");
            for(int j = 0; j < c; j++) {
                System.out.print(" " + seats[i][j]);
            }
            System.out.println();
        }
    }
}`,
});

// 8 ── easy scenario ── Matrix Input and Output
codeQuestions.push({
  title: "Weekly Temperature Day Averages",
  description: desc(
    "A weather station stores its readings in a grid: one row per week and one column per day. The first line contains two integers: n (the number of weeks) and d (the number of days per week, d = 7). Then follow n lines, each with d space-separated integers (line i holds the temperatures of week i, column j holds day j). Print d lines: line j is the average temperature of day j across all n weeks, printed with exactly 2 decimal places.",
    "Line 1: two space-separated integers n and d (d = 7).\nNext n lines: d space-separated integers each.",
    "d lines, each the average of one day column across all weeks with exactly 2 decimal places.",
    "1 <= n <= 20, d = 7, -50 <= temperature <= 50"
  ),
  difficulty: "easy",
  variant: "scenario",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Matrix Input and Output",
  sampleinput1: "2 7\n30 25 20 28 22 26 31\n32 27 24 30 26 28 33",
  sampleoutput1: "31.00\n26.00\n22.00\n29.00\n24.00\n27.00\n32.00",
  sampleinput2: "1 7\n10 20 30 40 50 60 70",
  sampleoutput2: "10.00\n20.00\n30.00\n40.00\n50.00\n60.00\n70.00",
  input1: "3 7\n10 15 20 30 18 25 12\n20 15 22 30 21 25 24\n30 15 24 30 24 25 36",
  output1: "20.00\n15.00\n22.00\n30.00\n21.00\n25.00\n24.00",
  input2: "4 7\n-5 0 -10 8 5 -1 9\n-5 0 2 8 6 -1 9\n-5 1 -10 8 7 -1 9\n-5 3 2 8 6 -1 9",
  output2: "-5.00\n1.00\n-4.00\n8.00\n6.00\n-1.00\n9.00",
  input3: "2 7\n33 30 28 26 25 24 31\n35 32 30 27 25 26 33",
  output3: "34.00\n31.00\n29.00\n26.50\n25.00\n25.00\n32.00",
  inputconstrains: "1 <= n <= 20, d = 7, -50 <= temperature <= 50",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int weeks = sc.nextInt();
        int days = sc.nextInt();
        int[][] t = new int[weeks][days];
        for(int i = 0; i < weeks; i++) {
            for(int j = 0; j < days; j++) {
                t[i][j] = sc.nextInt();
            }
        }
        for(int j = 0; j < days; j++) {
            long sum = 0;
            for(int i = 0; i < weeks; i++) {
                sum = sum + t[i][j];
            }
            System.out.printf("%.2f%n", (double) sum / weeks);
        }
    }
}`,
});

// 9 ── easy scenario ── Matrix Addition and Subtraction
codeQuestions.push({
  title: "Image Brightness Inverter",
  description: desc(
    "An image editor inverts the brightness of a grayscale photo: every pixel value p (0 to 255) becomes 255 - p, which is a subtraction applied to every element of the pixel matrix. Read r and c, then r rows of c pixel values into a 2D array, invert every value, and print the new image row by row with values separated by single spaces.",
    "Line 1: two space-separated integers r and c.\nNext r lines: c space-separated integers each (0 to 255).",
    "r lines, each with the c inverted values of that row separated by single spaces.",
    "1 <= r, c <= 100, 0 <= pixel <= 255"
  ),
  difficulty: "easy",
  variant: "scenario",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Matrix Addition and Subtraction",
  sampleinput1: "2 3\n0 128 255\n10 20 30",
  sampleoutput1: "255 127 0\n245 235 225",
  sampleinput2: "1 1\n255",
  sampleoutput2: "0",
  input1: "2 2\n255 0\n100 155",
  output1: "0 255\n155 100",
  input2: "3 1\n128\n64\n32",
  output2: "127\n191\n223",
  input3: "2 4\n1 2 3 4\n250 251 252 253",
  output3: "254 253 252 251\n5 4 3 2",
  inputconstrains: "1 <= r, c <= 100, 0 <= pixel <= 255",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int r = sc.nextInt();
        int c = sc.nextInt();
        int[][] img = new int[r][c];
        for(int i = 0; i < r; i++) {
            for(int j = 0; j < c; j++) {
                img[i][j] = sc.nextInt();
            }
        }
        for(int i = 0; i < r; i++) {
            for(int j = 0; j < c; j++) {
                if(j > 0) {
                    System.out.print(" ");
                }
                System.out.print(255 - img[i][j]);
            }
            System.out.println();
        }
    }
}`,
});

// 10 ── easy scenario ── Patterns Using Arrays
codeQuestions.push({
  title: "Tic-Tac-Toe Board Printer",
  description: desc(
    "A game app needs a pretty printer for tic-tac-toe boards. Read 3 lines, each containing exactly 3 characters (X, O or -) with no spaces, and store them in a 3 x 3 char array. Print the board as 3 rows with the characters of each row separated by single spaces.",
    "3 lines, each exactly 3 characters: X, O or -.",
    "3 lines. Line i contains the 3 characters of row i separated by single spaces.",
    "Exactly 3 lines of exactly 3 characters each; only characters X, O and -"
  ),
  difficulty: "easy",
  variant: "scenario",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Patterns Using Arrays",
  sampleinput1: "XOX\nOXO\nXOX",
  sampleoutput1: "X O X\nO X O\nX O X",
  sampleinput2: "---\nOXO\n-X-",
  sampleoutput2: "- - -\nO X O\n- X -",
  input1: "XXX\nOOO\n---",
  output1: "X X X\nO O O\n- - -",
  input2: "X--\n--X\nXO-",
  output2: "X - -\n- - X\nX O -",
  input3: "OOO\nXXX\nO-X",
  output3: "O O O\nX X X\nO - X",
  inputconstrains: "3 lines of exactly 3 characters each: X, O or -",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        char[][] board = new char[3][3];
        for(int i = 0; i < 3; i++) {
            String line = sc.nextLine().trim();
            for(int j = 0; j < 3; j++) {
                board[i][j] = line.charAt(j);
            }
        }
        for(int i = 0; i < 3; i++) {
            for(int j = 0; j < 3; j++) {
                if(j > 0) {
                    System.out.print(" ");
                }
                System.out.print(board[i][j]);
            }
            System.out.println();
        }
    }
}`,
});

// 11 ── medium scenario ── Matrix Addition and Subtraction
codeQuestions.push({
  title: "Matrix Add or Subtract Dispatcher",
  description: desc(
    "A math tool applies one of two operations to a pair of same-size matrices. Read an operation character (A for addition, S for subtraction), then r and c, then the first r x c matrix, then the second r x c matrix. If the operation is A print the elementwise sum; if it is S print the elementwise difference (first matrix minus second matrix). Print the result row by row with values separated by single spaces.",
    "Line 1: one character A or S.\nLine 2: two space-separated integers r and c.\nNext r lines: the first matrix, c integers per line.\nNext r lines: the second matrix, c integers per line.",
    "r lines, each with the c result values of that row separated by single spaces.",
    "1 <= r, c <= 100, -1000 <= element <= 1000, operation is A or S"
  ),
  difficulty: "medium",
  variant: "scenario",
  maxscore: 20,
  lang: "java",
  topic: TOPIC,
  subtopic: "Matrix Addition and Subtraction",
  sampleinput1: "A\n2 2\n1 2\n3 4\n5 6\n7 8",
  sampleoutput1: "6 8\n10 12",
  sampleinput2: "S\n2 2\n10 20\n30 40\n1 2\n3 4",
  sampleoutput2: "9 18\n27 36",
  input1: "A\n1 3\n1 2 3\n4 5 6",
  output1: "5 7 9",
  input2: "S\n3 2\n5 5\n10 10\n15 15\n1 2\n3 4\n5 6",
  output2: "4 3\n7 6\n10 9",
  input3: "A\n2 3\n-1 -2 -3\n0 0 0\n1 1 1\n2 2 2",
  output3: "0 -1 -2\n2 2 2",
  inputconstrains: "1 <= r, c <= 100, -1000 <= element <= 1000, operation is A or S",
  blacklist: "BigDecimal",
  whitelist: "int[",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        char op = sc.next().charAt(0);
        int r = sc.nextInt();
        int c = sc.nextInt();
        int[][] a = new int[r][c];
        int[][] b = new int[r][c];
        for(int i = 0; i < r; i++) {
            for(int j = 0; j < c; j++) {
                a[i][j] = sc.nextInt();
            }
        }
        for(int i = 0; i < r; i++) {
            for(int j = 0; j < c; j++) {
                b[i][j] = sc.nextInt();
            }
        }
        int[][] res = new int[r][c];
        for(int i = 0; i < r; i++) {
            for(int j = 0; j < c; j++) {
                if(op == 'A') {
                    res[i][j] = a[i][j] + b[i][j];
                } else {
                    res[i][j] = a[i][j] - b[i][j];
                }
            }
        }
        for(int i = 0; i < r; i++) {
            for(int j = 0; j < c; j++) {
                if(j > 0) {
                    System.out.print(" ");
                }
                System.out.print(res[i][j]);
            }
            System.out.println();
        }
    }
}`,
});

// 12 ── medium scenario ── Transpose and Diagonals
codeQuestions.push({
  title: "In-Place Transpose of a Square Matrix",
  description: desc(
    "A graphics library needs the transpose of a square matrix computed in place. Read r and c (r = c), then the matrix into a 2D array, swap a[i][j] with a[j][i] for every pair of positions above the main diagonal (no second array needed), and print the transposed matrix row by row with values separated by single spaces.",
    "Line 1: two space-separated integers r and c with r = c.\nNext r lines: c space-separated integers each.",
    "r lines, each with the c values of the transposed row separated by single spaces.",
    "1 <= r = c <= 100, -1000 <= element <= 1000"
  ),
  difficulty: "medium",
  variant: "scenario",
  maxscore: 20,
  lang: "java",
  topic: TOPIC,
  subtopic: "Transpose and Diagonals",
  sampleinput1: "2 2\n1 2\n3 4",
  sampleoutput1: "1 3\n2 4",
  sampleinput2: "3 3\n1 2 3\n4 5 6\n7 8 9",
  sampleoutput2: "1 4 7\n2 5 8\n3 6 9",
  input1: "1 1\n9",
  output1: "9",
  input2: "3 3\n1 0 0\n0 1 0\n0 0 1",
  output2: "1 0 0\n0 1 0\n0 0 1",
  input3: "4 4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16",
  output3: "1 5 9 13\n2 6 10 14\n3 7 11 15\n4 8 12 16",
  inputconstrains: "1 <= r = c <= 100, -1000 <= element <= 1000",
  blacklist: "Arrays.deepToString, Arrays.toString",
  whitelist: "for(",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int r = sc.nextInt();
        int c = sc.nextInt();
        int[][] a = new int[r][c];
        for(int i = 0; i < r; i++) {
            for(int j = 0; j < c; j++) {
                a[i][j] = sc.nextInt();
            }
        }
        for(int i = 0; i < r; i++) {
            for(int j = i + 1; j < c; j++) {
                int t = a[i][j];
                a[i][j] = a[j][i];
                a[j][i] = t;
            }
        }
        for(int i = 0; i < r; i++) {
            for(int j = 0; j < c; j++) {
                if(j > 0) {
                    System.out.print(" ");
                }
                System.out.print(a[i][j]);
            }
            System.out.println();
        }
    }
}`,
});

// 13 ── medium scenario ── Transpose and Diagonals
codeQuestions.push({
  title: "Diagonal Difference of a Square Matrix",
  description: desc(
    "A math helper computes the diagonal difference of a square matrix: the absolute value of (sum of the main diagonal) minus (sum of the anti-diagonal). The main diagonal runs top-left to bottom-right; the anti-diagonal runs top-right to bottom-left. Read r and c (r = c), then the matrix, accumulate both diagonal sums as long values, and print one line with the absolute difference. Compute the absolute value with a simple comparison, not Math.abs.",
    "Line 1: two space-separated integers r and c with r = c.\nNext r lines: c space-separated integers each.",
    "One line: the absolute difference between the two diagonal sums.",
    "1 <= r = c <= 100, -1000000000 <= element <= 1000000000"
  ),
  difficulty: "medium",
  variant: "scenario",
  maxscore: 20,
  lang: "java",
  topic: TOPIC,
  subtopic: "Transpose and Diagonals",
  sampleinput1: "3 3\n1 2 3\n4 5 6\n7 8 9",
  sampleoutput1: "0",
  sampleinput2: "2 2\n5 2\n3 8",
  sampleoutput2: "8",
  input1: "3 3\n11 2 4\n4 5 6\n10 8 -12",
  output1: "15",
  input2: "1 1\n-7",
  output2: "0",
  input3: "4 4\n1 0 0 0\n0 3 0 0\n0 0 5 0\n0 0 0 20",
  output3: "29",
  inputconstrains: "1 <= r = c <= 100, -1000000000 <= element <= 1000000000",
  blacklist: "Math.abs",
  whitelist: "long",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int r = sc.nextInt();
        int c = sc.nextInt();
        int[][] a = new int[r][c];
        for(int i = 0; i < r; i++) {
            for(int j = 0; j < c; j++) {
                a[i][j] = sc.nextInt();
            }
        }
        long primary = 0;
        long secondary = 0;
        for(int i = 0; i < r; i++) {
            primary = primary + a[i][i];
            secondary = secondary + a[i][c - 1 - i];
        }
        long diff = primary - secondary;
        if(diff < 0) {
            diff = 0 - diff;
        }
        System.out.println(diff);
    }
}`,
});

// 14 ── medium scenario ── Matrix Multiplication
codeQuestions.push({
  title: "Matrix Multiplication with Dimension Check",
  description: desc(
    "A linear algebra utility multiplies two matrices after checking their dimensions. Read r1 and c1, then the first matrix; then r2 and c2, then the second matrix. If c1 does not equal r2, print exactly Multiplication not possible. Otherwise print the product matrix row by row with values separated by single spaces, accumulating every entry in a long.",
    "Line 1: two space-separated integers r1 and c1.\nNext r1 lines: c1 integers each (first matrix).\nNext line: two space-separated integers r2 and c2.\nNext r2 lines: c2 integers each (second matrix).",
    "Either the single line Multiplication not possible, or r1 lines each with c2 product values separated by single spaces.",
    "1 <= r1, c1, r2, c2 <= 100, -1000 <= element <= 1000"
  ),
  difficulty: "medium",
  variant: "scenario",
  maxscore: 20,
  lang: "java",
  topic: TOPIC,
  subtopic: "Matrix Multiplication",
  sampleinput1: "2 3\n1 2 3\n4 5 6\n3 2\n7 8\n9 10\n11 12",
  sampleoutput1: "58 64\n139 154",
  sampleinput2: "2 2\n1 0\n0 1\n2 2\n5 6\n7 8",
  sampleoutput2: "5 6\n7 8",
  input1: "2 3\n1 2 3\n4 5 6\n2 2\n1 2\n3 4",
  output1: "Multiplication not possible",
  input2: "1 1\n5\n1 1\n-6",
  output2: "-30",
  input3: "3 2\n1 2\n3 4\n5 6\n2 1\n10\n20",
  output3: "50\n110\n170",
  inputconstrains: "1 <= r1, c1, r2, c2 <= 100, -1000 <= element <= 1000",
  blacklist: "IntStream",
  whitelist: "long",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int r1 = sc.nextInt();
        int c1 = sc.nextInt();
        int[][] a = new int[r1][c1];
        for(int i = 0; i < r1; i++) {
            for(int j = 0; j < c1; j++) {
                a[i][j] = sc.nextInt();
            }
        }
        int r2 = sc.nextInt();
        int c2 = sc.nextInt();
        int[][] b = new int[r2][c2];
        for(int i = 0; i < r2; i++) {
            for(int j = 0; j < c2; j++) {
                b[i][j] = sc.nextInt();
            }
        }
        if(c1 != r2) {
            System.out.println("Multiplication not possible");
        } else {
            long[][] prod = new long[r1][c2];
            for(int i = 0; i < r1; i++) {
                for(int j = 0; j < c2; j++) {
                    long sum = 0;
                    for(int k = 0; k < c1; k++) {
                        sum = sum + (long) a[i][k] * b[k][j];
                    }
                    prod[i][j] = sum;
                }
            }
            for(int i = 0; i < r1; i++) {
                for(int j = 0; j < c2; j++) {
                    if(j > 0) {
                        System.out.print(" ");
                    }
                    System.out.print(prod[i][j]);
                }
                System.out.println();
            }
        }
    }
}`,
});

// 15 ── medium scenario ── Patterns Using Arrays
codeQuestions.push({
  title: "Border Elements in Clockwise Order",
  description: desc(
    "A perimeter alarm system inspects only the border cells of a field grid, in clockwise order: first the entire top row left to right, then the right column top to bottom, then the bottom row right to left, then the left column bottom to top. Cells already printed are not repeated, so every border cell appears exactly once. Read r and c, then the r x c grid, and print all border values on one line separated by single spaces in that order.",
    "Line 1: two space-separated integers r and c.\nNext r lines: c space-separated integers each.",
    "One line: the border values in clockwise order separated by single spaces.",
    "1 <= r, c <= 100, -1000 <= element <= 1000"
  ),
  difficulty: "medium",
  variant: "scenario",
  maxscore: 20,
  lang: "java",
  topic: TOPIC,
  subtopic: "Patterns Using Arrays",
  sampleinput1: "3 4\n1 2 3 4\n5 6 7 8\n9 10 11 12",
  sampleoutput1: "1 2 3 4 8 12 11 10 9 5",
  sampleinput2: "2 2\n1 2\n3 4",
  sampleoutput2: "1 2 4 3",
  input1: "1 5\n1 2 3 4 5",
  output1: "1 2 3 4 5",
  input2: "4 1\n1\n2\n3\n4",
  output2: "1 2 3 4",
  input3: "5 3\n1 2 3\n4 5 6\n7 8 9\n10 11 12\n13 14 15",
  output3: "1 2 3 6 9 12 15 14 13 10 7 4",
  inputconstrains: "1 <= r, c <= 100, -1000 <= element <= 1000",
  blacklist: "ArrayList",
  whitelist: "for(",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int r = sc.nextInt();
        int c = sc.nextInt();
        int[][] a = new int[r][c];
        for(int i = 0; i < r; i++) {
            for(int j = 0; j < c; j++) {
                a[i][j] = sc.nextInt();
            }
        }
        StringBuilder sb = new StringBuilder();
        String sep = "";
        for(int j = 0; j < c; j++) {
            sb.append(sep).append(a[0][j]);
            sep = " ";
        }
        for(int i = 1; i < r; i++) {
            sb.append(sep).append(a[i][c - 1]);
            sep = " ";
        }
        if(r > 1) {
            for(int j = c - 2; j >= 0; j--) {
                sb.append(sep).append(a[r - 1][j]);
                sep = " ";
            }
        }
        if(c > 1 && r > 2) {
            for(int i = r - 2; i >= 1; i--) {
                sb.append(sep).append(a[i][0]);
                sep = " ";
            }
        }
        System.out.println(sb.toString());
    }
}`,
});

// 16 ── medium scenario ── Patterns Using Arrays
codeQuestions.push({
  title: "Column-Major Transformation Print",
  description: desc(
    "A data migration tool converts matrices stored row-major into column-major layout. Read r and c, then the r x c matrix filled row by row, and print it column by column: c output lines, where line j contains the j-th column values from top to bottom separated by single spaces.",
    "Line 1: two space-separated integers r and c.\nNext r lines: c space-separated integers each.",
    "c lines, each with the r values of one column separated by single spaces.",
    "1 <= r, c <= 100, -1000 <= element <= 1000"
  ),
  difficulty: "medium",
  variant: "scenario",
  maxscore: 20,
  lang: "java",
  topic: TOPIC,
  subtopic: "Patterns Using Arrays",
  sampleinput1: "2 3\n1 2 3\n4 5 6",
  sampleoutput1: "1 4\n2 5\n3 6",
  sampleinput2: "1 3\n7 8 9",
  sampleoutput2: "7\n8\n9",
  input1: "3 2\n1 2\n3 4\n5 6",
  output1: "1 3 5\n2 4 6",
  input2: "2 2\n9 8\n7 6",
  output2: "9 7\n8 6",
  input3: "4 3\n1 2 3\n4 5 6\n7 8 9\n10 11 12",
  output3: "1 4 7 10\n2 5 8 11\n3 6 9 12",
  inputconstrains: "1 <= r, c <= 100, -1000 <= element <= 1000",
  blacklist: "Arrays.fill",
  whitelist: "int[",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int r = sc.nextInt();
        int c = sc.nextInt();
        int[][] a = new int[r][c];
        for(int i = 0; i < r; i++) {
            for(int j = 0; j < c; j++) {
                a[i][j] = sc.nextInt();
            }
        }
        for(int j = 0; j < c; j++) {
            for(int i = 0; i < r; i++) {
                if(i > 0) {
                    System.out.print(" ");
                }
                System.out.print(a[i][j]);
            }
            System.out.println();
        }
    }
}`,
});

// 17 ── hard scenario ── Patterns Using Arrays
codeQuestions.push({
  title: "Spiral Traversal of a Matrix",
  description: desc(
    "A robot mower traverses a lawn grid in a clockwise spiral starting at the top-left corner: it moves right along the top row, down the right column, left along the bottom row, up the left column, and then spirals inward, visiting every cell exactly once. Read r and c, then the r x c grid, and print every visited value on one line separated by single spaces in spiral order.",
    "Line 1: two space-separated integers r and c.\nNext r lines: c space-separated integers each.",
    "One line: all r x c values in spiral order separated by single spaces.",
    "1 <= r, c <= 100, -1000 <= element <= 1000"
  ),
  difficulty: "hard",
  variant: "scenario",
  maxscore: 30,
  lang: "java",
  topic: TOPIC,
  subtopic: "Patterns Using Arrays",
  sampleinput1: "3 4\n1 2 3 4\n5 6 7 8\n9 10 11 12",
  sampleoutput1: "1 2 3 4 8 12 11 10 9 5 6 7",
  sampleinput2: "3 3\n1 2 3\n4 5 6\n7 8 9",
  sampleoutput2: "1 2 3 6 9 8 7 4 5",
  input1: "1 1\n42",
  output1: "42",
  input2: "4 1\n1\n2\n3\n4",
  output2: "1 2 3 4",
  input3: "2 3\n1 2 3\n4 5 6",
  output3: "1 2 3 6 5 4",
  inputconstrains: "1 <= r, c <= 100, -1000 <= element <= 1000",
  blacklist: "ArrayList",
  whitelist: "while(",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int r = sc.nextInt();
        int c = sc.nextInt();
        int[][] a = new int[r][c];
        for(int i = 0; i < r; i++) {
            for(int j = 0; j < c; j++) {
                a[i][j] = sc.nextInt();
            }
        }
        int top = 0;
        int bottom = r - 1;
        int left = 0;
        int right = c - 1;
        StringBuilder sb = new StringBuilder();
        String sep = "";
        while(top <= bottom && left <= right) {
            for(int j = left; j <= right; j++) {
                sb.append(sep).append(a[top][j]);
                sep = " ";
            }
            top++;
            for(int i = top; i <= bottom; i++) {
                sb.append(sep).append(a[i][right]);
                sep = " ";
            }
            right--;
            if(top <= bottom) {
                for(int j = right; j >= left; j--) {
                    sb.append(sep).append(a[bottom][j]);
                    sep = " ";
                }
                bottom--;
            }
            if(left <= right) {
                for(int i = top; i <= bottom; i++) {
                    sb.append(sep).append(a[i][left]);
                    sep = " ";
                }
                left++;
            }
        }
        System.out.println(sb.toString());
    }
}`,
});

// 18 ── hard scenario ── Matrix Input and Output
codeQuestions.push({
  title: "Saddle Point Search in a Grid",
  description: desc(
    "A quality inspector looks for a saddle point in a hardness grid: a value that is the minimum of its row and at the same time the maximum of its column. Read r and c, then the r x c grid. Print three space-separated numbers: the 1-based row, the 1-based column and the value of the first saddle point found scanning rows top to bottom and columns left to right. If no saddle point exists, print -1.",
    "Line 1: two space-separated integers r and c.\nNext r lines: c space-separated integers each.",
    "One line: row, column and value separated by single spaces, or -1 if there is no saddle point.",
    "1 <= r, c <= 100, -1000000 <= element <= 1000000"
  ),
  difficulty: "hard",
  variant: "scenario",
  maxscore: 30,
  lang: "java",
  topic: TOPIC,
  subtopic: "Matrix Input and Output",
  sampleinput1: "3 3\n1 2 3\n4 5 6\n7 8 9",
  sampleoutput1: "3 1 7",
  sampleinput2: "2 2\n1 2\n2 1",
  sampleoutput2: "-1",
  input1: "3 3\n4 4 4\n4 4 4\n4 4 4",
  output1: "1 1 4",
  input2: "2 3\n5 1 3\n4 2 6",
  output2: "2 2 2",
  input3: "3 4\n10 20 30 40\n15 25 35 45\n5 8 12 16",
  output3: "2 1 15",
  inputconstrains: "1 <= r, c <= 100, -1000000 <= element <= 1000000",
  blacklist: "Map",
  whitelist: "int[",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int r = sc.nextInt();
        int c = sc.nextInt();
        int[][] a = new int[r][c];
        for(int i = 0; i < r; i++) {
            for(int j = 0; j < c; j++) {
                a[i][j] = sc.nextInt();
            }
        }
        boolean found = false;
        outer:
        for(int i = 0; i < r; i++) {
            for(int j = 0; j < c; j++) {
                boolean isRowMin = true;
                boolean isColMax = true;
                for(int k = 0; k < c; k++) {
                    if(a[i][k] < a[i][j]) {
                        isRowMin = false;
                    }
                }
                for(int k = 0; k < r; k++) {
                    if(a[k][j] > a[i][j]) {
                        isColMax = false;
                    }
                }
                if(isRowMin && isColMax) {
                    System.out.println((i + 1) + " " + (j + 1) + " " + a[i][j]);
                    found = true;
                    break outer;
                }
            }
        }
        if(!found) {
            System.out.println(-1);
        }
    }
}`,
});

// 19 ── hard scenario ── Transpose and Diagonals
codeQuestions.push({
  title: "Rotate the Matrix 90 Degrees Clockwise",
  description: desc(
    "A photo rotation feature turns a square image 90 degrees clockwise: the last row of the original, read left to right, becomes the first column of the result; equivalently, the element at row i, column j moves to row j, column r-1-i. Read r and c (r = c), then the r x c pixel matrix into a 2D array, fill a second 2D array with the rotated values, and print the result row by row with values separated by single spaces.",
    "Line 1: two space-separated integers r and c with r = c.\nNext r lines: c space-separated integers each.",
    "r lines, each with the c values of the rotated matrix separated by single spaces.",
    "1 <= r = c <= 100, -1000 <= element <= 1000"
  ),
  difficulty: "hard",
  variant: "scenario",
  maxscore: 30,
  lang: "java",
  topic: TOPIC,
  subtopic: "Transpose and Diagonals",
  sampleinput1: "2 2\n1 2\n3 4",
  sampleoutput1: "3 1\n4 2",
  sampleinput2: "3 3\n1 2 3\n4 5 6\n7 8 9",
  sampleoutput2: "7 4 1\n8 5 2\n9 6 3",
  input1: "1 1\n5",
  output1: "5",
  input2: "4 4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n13 14 15 16",
  output2: "13 9 5 1\n14 10 6 2\n15 11 7 3\n16 12 8 4",
  input3: "3 3\n1 0 0\n0 1 0\n0 0 1",
  output3: "0 0 1\n0 1 0\n1 0 0",
  inputconstrains: "1 <= r = c <= 100, -1000 <= element <= 1000",
  blacklist: "Arrays.copyOf",
  whitelist: "int[",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int r = sc.nextInt();
        int c = sc.nextInt();
        int[][] a = new int[r][c];
        for(int i = 0; i < r; i++) {
            for(int j = 0; j < c; j++) {
                a[i][j] = sc.nextInt();
            }
        }
        int[][] b = new int[c][r];
        for(int i = 0; i < r; i++) {
            for(int j = 0; j < c; j++) {
                b[j][r - 1 - i] = a[i][j];
            }
        }
        for(int i = 0; i < c; i++) {
            for(int j = 0; j < r; j++) {
                if(j > 0) {
                    System.out.print(" ");
                }
                System.out.print(b[i][j]);
            }
            System.out.println();
        }
    }
}`,
});

// 20 ── hard scenario ── Patterns Using Arrays
codeQuestions.push({
  title: "Pascal Triangle in a 2D Array",
  description: desc(
    "A math worksheet generator prints Pascal's triangle stored in a 2D array. Read n, build an n x n long array where the entry at row i, column j is 1 on the edges and otherwise the sum of the two entries directly above it: p[i][j] = p[i-1][j-1] + p[i-1][j]. Print rows 1 through n of the triangle: row i contains i values separated by single spaces, one triangle row per output line.",
    "One line: a single integer n.",
    "n lines. Line i contains the i values of triangle row i separated by single spaces.",
    "1 <= n <= 60"
  ),
  difficulty: "hard",
  variant: "scenario",
  maxscore: 30,
  lang: "java",
  topic: TOPIC,
  subtopic: "Patterns Using Arrays",
  sampleinput1: "5",
  sampleoutput1: "1\n1 1\n1 2 1\n1 3 3 1\n1 4 6 4 1",
  sampleinput2: "1",
  sampleoutput2: "1",
  input1: "2",
  output1: "1\n1 1",
  input2: "7",
  output2: "1\n1 1\n1 2 1\n1 3 3 1\n1 4 6 4 1\n1 5 10 10 5 1\n1 6 15 20 15 6 1",
  input3: "10",
  output3: "1\n1 1\n1 2 1\n1 3 3 1\n1 4 6 4 1\n1 5 10 10 5 1\n1 6 15 20 15 6 1\n1 7 21 35 35 21 7 1\n1 8 28 56 70 56 28 8 1\n1 9 36 84 126 126 84 36 9 1",
  inputconstrains: "1 <= n <= 60",
  blacklist: "BigInteger, factorial",
  whitelist: "long[",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        long[][] p = new long[n][n];
        for(int i = 0; i < n; i++) {
            for(int j = 0; j <= i; j++) {
                if(j == 0 || j == i) {
                    p[i][j] = 1;
                } else {
                    p[i][j] = p[i - 1][j - 1] + p[i - 1][j];
                }
            }
        }
        for(int i = 0; i < n; i++) {
            for(int j = 0; j <= i; j++) {
                if(j > 0) {
                    System.out.print(" ");
                }
                System.out.print(p[i][j]);
            }
            System.out.println();
        }
    }
}`,
});

/* ─────────────────────────────── MCQ QUESTIONS ─────────────────────────────── */

const mcqQuestions = [];

const mcq = (title, description, difficulty, subtopic, options, correct, snippet, snippetLang) => ({
  title,
  description,
  difficulty,
  topic: TOPIC,
  subtopic,
  Option1: options[0],
  Option2: options[1],
  Option3: options[2],
  Option4: options[3],
  CorrectOption: correct,
  iscodesnippet: !!snippet,
  codesnippet: snippet || null,
  snippetLang: snippet ? snippetLang || "java" : null,
});

// 1 ── easy
mcqQuestions.push(
  mcq(
    "Two-Dimensional Indexing Order",
    "In Java, which expression accesses the element in the 3rd row and the 4th column of a 2D array named m declared as int[][] m?",
    "easy",
    "Matrix Input and Output",
    ["m[3][4]", "m[2][3]", "m[4][3]", "m[2][4]"],
    2
  )
);

// 2 ── easy
mcqQuestions.push(
  mcq(
    "Default Fill of a Created Matrix",
    "An array is created with the statement int[][] grid = new int[3][4]; and no values are assigned yet. What does grid[1][2] contain?",
    "easy",
    "2D Array Declaration",
    ["0", "null", "A random garbage value", "It throws an ArrayIndexOutOfBoundsException"],
    1
  )
);

// 3 ── easy
mcqQuestions.push(
  mcq(
    "Declaring a Rectangular Matrix",
    "Which single statement correctly declares and creates a 2D int array with 5 rows and 10 columns?",
    "easy",
    "2D Array Declaration",
    [
      "int table[5][10] = new int[][];",
      "int[][] table = new int[10][5];",
      "int[][] table = new int[5][10];",
      "int[][] table = new int[5];",
    ],
    3
  )
);

// 4 ── easy
mcqQuestions.push(
  mcq(
    "Rows Reported by matrix.length",
    "For a rectangular matrix created as int[][] m = new int[6][8], what does the expression m.length return?",
    "easy",
    "2D Array Declaration",
    ["6, the number of rows", "8, the number of columns", "48, the total number of elements", "0, because the array is empty"],
    1
  )
);

// 5 ── easy
mcqQuestions.push(
  mcq(
    "Transpose Swaps Dimensions",
    "A matrix M has 4 rows and 7 columns. What are the dimensions of its transpose?",
    "easy",
    "Transpose and Diagonals",
    ["4 x 7", "7 x 4", "7 x 7", "4 x 4"],
    2
  )
);

// 6 ── easy
mcqQuestions.push(
  mcq(
    "Condition for Matrix Addition",
    "Which condition must be true so that two matrices A and B can be added (A + B)?",
    "easy",
    "Matrix Addition and Subtraction",
    [
      "They must have the same number of rows and the same number of columns",
      "The number of columns of A must equal the number of rows of B",
      "They must both be square matrices",
      "They must contain the same total number of elements",
    ],
    1
  )
);

// 7 ── easy
mcqQuestions.push(
  mcq(
    "Dimensions of a Matrix Product",
    "Matrix A has 2 rows and 3 columns and matrix B has 3 rows and 4 columns. What are the dimensions of the product A x B?",
    "easy",
    "Matrix Multiplication",
    ["3 x 4", "2 x 3", "4 x 2", "2 x 4"],
    4
  )
);

// 8 ── easy
mcqQuestions.push(
  mcq(
    "Row-Major Storage Order",
    "In what order does Java store the elements of a two-dimensional array in memory?",
    "easy",
    "2D Array Declaration",
    [
      "Row-major order: all elements of row 0 first, then row 1, and so on",
      "Column-major order: all elements of column 0 first, then column 1, and so on",
      "The order changes with every Java version",
      "Diagonal order to compress the memory layout",
    ],
    1
  )
);

// 9 ── easy, snippet
mcqQuestions.push(
  mcq(
    "Sparse Assignment Snippet",
    "Study this Java snippet. What does it print?",
    "easy",
    "2D Array Declaration",
    ["0", "7", "12", "It throws an exception because a[1][2] is out of bounds"],
    3,
    `int[][] a = new int[2][3];
a[0][1] = 5;
a[1][2] = 7;
System.out.println(a[0][1] + a[1][2]);`
  )
);

// 10 ── easy, snippet
mcqQuestions.push(
  mcq(
    "Main Diagonal Accumulator Snippet",
    "This program walks one diagonal of the square matrix a. What does it print?",
    "easy",
    "Transpose and Diagonals",
    ["17 (sum of all elements)", "5", "12 (sum of the anti-diagonal)", "8"],
    2,
    `int[][] a = {{2, 5}, {7, 3}};
int s = 0;
for(int i = 0; i < 2; i++) {
    s = s + a[i][i];
}
System.out.println(s);`
  )
);

// 11 ── medium, snippet
mcqQuestions.push(
  mcq(
    "Nested Loop Print Order Snippet",
    "Read the nested loops carefully. Which output does this program produce?",
    "medium",
    "Matrix Input and Output",
    [
      "1 2 3 on the first line and 4 5 6 on the second line",
      "1 4 on the first line, 2 5 on the second line, 3 6 on the third line",
      "1 2 3 4 5 6 all on one line",
      "6 5 4 on the first line and 3 2 1 on the second line",
    ],
    1,
    `int[][] a = {{1, 2, 3}, {4, 5, 6}};
for(int i = 0; i < a.length; i++) {
    for(int j = 0; j < a[0].length; j++) {
        System.out.print(a[i][j] + " ");
    }
    System.out.println();
}`
  )
);

// 12 ── medium, snippet
mcqQuestions.push(
  mcq(
    "Jagged Array Lengths Snippet",
    "This code builds a jagged array whose rows have different lengths. What does it print?",
    "medium",
    "2D Array Declaration",
    ["4 3", "3 3", "2 4", "3 4"],
    4,
    `int[][] j = new int[3][];
j[0] = new int[2];
j[1] = new int[4];
j[2] = new int[1];
System.out.println(j.length + " " + j[1].length);`
  )
);

// 13 ── medium
mcqQuestions.push(
  mcq(
    "Column Count Expression",
    "For a rectangular 2D array m with 5 rows and 9 columns, which expression correctly gives the number of columns?",
    "medium",
    "Matrix Input and Output",
    ["m.length", "m[0].length", "m.length[0]", "m.size()"],
    2
  )
);

// 14 ── medium, snippet
mcqQuestions.push(
  mcq(
    "Row Reference Aliasing Snippet",
    "The variable row is assigned directly from a row of the 2D array. Remember how Java array references work. What does this program print?",
    "medium",
    "2D Array Declaration",
    [
      "9, because row and a[0] refer to the same array object",
      "0, because row is an independent copy of a[0]",
      "17, because both assignments land in row 0 of a",
      "8",
    ],
    1,
    `int[][] a = new int[2][2];
int[] row = a[0];
row[0] = 9;
a[0][1] = 8;
System.out.println(a[0][0] + a[1][0]);`
  )
);

// 15 ── medium
mcqQuestions.push(
  mcq(
    "Transpose Element Mapping",
    "Let T be the transpose of matrix M. Which statement is correct?",
    "medium",
    "Transpose and Diagonals",
    [
      "T[i][j] = M[i][j] and T has the same dimensions as M",
      "The transpose operation is defined only for square matrices",
      "T[j][i] = M[i][j], and if M is m x n then T is n x m",
      "T[i][j] = M[n-1-i][m-1-j] for every element",
    ],
    3
  )
);

// 16 ── medium, snippet
mcqQuestions.push(
  mcq(
    "Triple Loop Multiplication Snippet",
    "This program multiplies two matrices with triple nested loops. What does it print?",
    "medium",
    "Matrix Multiplication",
    ["11 18", "19 50", "5 12", "19 18"],
    2,
    `int[][] a = {{1, 2}, {3, 4}};
int[][] b = {{5, 6}, {7, 8}};
int[][] c = new int[2][2];
for(int i = 0; i < 2; i++) {
    for(int j = 0; j < 2; j++) {
        for(int k = 0; k < 2; k++) {
            c[i][j] = c[i][j] + a[i][k] * b[k][j];
        }
    }
}
System.out.println(c[0][0] + " " + c[1][1]);`
  )
);

// 17 ── hard, snippet
mcqQuestions.push(
  mcq(
    "Anti-Diagonal Walk Snippet",
    "This program walks one diagonal of the 3 x 3 matrix. What does it print?",
    "hard",
    "Transpose and Diagonals",
    ["15", "12", "10", "25"],
    1,
    `int[][] a = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
int s = 0;
for(int i = 0; i < 3; i++) {
    s = s + a[i][2 - i];
}
System.out.println(s);`
  )
);

// 18 ── hard, snippet
mcqQuestions.push(
  mcq(
    "Shared Row Object Snippet",
    "Careful: r and a[1] share the same underlying array object. What does this program print?",
    "hard",
    "2D Array Declaration",
    ["5", "7", "0", "12"],
    4,
    `int[][] a = new int[2][3];
int[] r = a[1];
a[1][0] = 5;
r[2] = 7;
System.out.println(a[1][0] + a[1][2] + a[0][0]);`
  )
);

// 19 ── hard, snippet
mcqQuestions.push(
  mcq(
    "In-Place Transpose Trace Snippet",
    "This code swaps every element above the diagonal with its mirror position below the diagonal. What does it print?",
    "hard",
    "Transpose and Diagonals",
    ["3 7 (the array is unchanged)", "7 3", "9 1", "1 9"],
    2,
    `int[][] a = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
for(int i = 0; i < 3; i++) {
    for(int j = i + 1; j < 3; j++) {
        int t = a[i][j];
        a[i][j] = a[j][i];
        a[j][i] = t;
    }
}
System.out.println(a[0][2] + " " + a[2][0]);`
  )
);

// 20 ── hard, snippet
mcqQuestions.push(
  mcq(
    "Triangular Pattern Fill Snippet",
    "This program fills a triangular pattern into a 2D array and then reads three cells. What does it print?",
    "hard",
    "Patterns Using Arrays",
    ["8", "9", "10", "12"],
    3,
    `int n = 4;
int[][] p = new int[n][n];
for(int i = 0; i < n; i++) {
    for(int j = 0; j <= i; j++) {
        p[i][j] = i + 1;
    }
}
System.out.println(p[3][0] + p[3][3] + p[1][1]);`
  )
);

/* ─────────────────────────────── WRITE PART FILES ─────────────────────────────── */

const part1Code = { day: 8, topics: [{ name: TOPIC, subtopics: SUBTOPICS }], questions: codeQuestions.slice(0, 10) };
const part2Code = { questions: codeQuestions.slice(10) };
const part1Mcq = { day: 8, questions: mcqQuestions.slice(0, 10) };
const part2Mcq = { questions: mcqQuestions.slice(10) };

fs.writeFileSync(path.join(DIR, "day-08.code.p1.json"), JSON.stringify(part1Code, null, 2) + "\n");
fs.writeFileSync(path.join(DIR, "day-08.code.p2.json"), JSON.stringify(part2Code, null, 2) + "\n");
fs.writeFileSync(path.join(DIR, "day-08.mcq.p1.json"), JSON.stringify(part1Mcq, null, 2) + "\n");
fs.writeFileSync(path.join(DIR, "day-08.mcq.p2.json"), JSON.stringify(part2Mcq, null, 2) + "\n");

console.log("wrote day-08 part files:", codeQuestions.length, "code +", mcqQuestions.length, "mcq questions");
