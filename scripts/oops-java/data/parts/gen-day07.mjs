/**
 * Day 7 generator — "OOPS using JAVA" — 1D Arrays
 * Writes the 4 part files consumed by merge-parts.ts.
 */
import fs from "node:fs";
import path from "node:path";

const DIR = "/home/z/my-project/scripts/oops-java/data/parts";
fs.mkdirSync(DIR, { recursive: true });

const TOPIC = "1D Arrays";
const SUBTOPICS = [
  "Array Declaration and Initialization",
  "Array Traversal",
  "Array Input and Output",
  "Aggregation Sum Min Max",
  "Searching in Arrays",
  "Array Reversal and Rotation",
];

/* ─────────────────────────────── CODE QUESTIONS ─────────────────────────────── */

const codeQuestions = [];

// 1 ── easy basic ── Array Declaration and Initialization
codeQuestions.push({
  title: "Initialize and Print an Array",
  description:
    "Create an array from user input and display it. Read n, then read n integers into an int array, and print all elements of the array on one line, separated by single spaces.\n\nInput Format:\nLine 1: n, the number of elements.\nLine 2: n space-separated integers.\n\nOutput Format:\nOne line with the n array elements separated by single spaces.\n\nConstraints:\n1 <= n <= 1000, -1000000 <= element <= 1000000",
  difficulty: "easy",
  variant: "basic",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Array Declaration and Initialization",
  sampleinput1: "5\n10 20 30 40 50",
  sampleoutput1: "10 20 30 40 50",
  sampleinput2: "3\n7 8 9",
  sampleoutput2: "7 8 9",
  input1: "1\n42",
  output1: "42",
  input2: "4\n-1 -2 -3 -4",
  output2: "-1 -2 -3 -4",
  input3: "6\n5 10 15 20 25 30",
  output3: "5 10 15 20 25 30",
  inputconstrains: "1 <= n <= 1000, -1000000 <= element <= 1000000",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        for(int i = 0; i < n; i++) {
            a[i] = sc.nextInt();
        }
        StringBuilder sb = new StringBuilder();
        for(int i = 0; i < n; i++) {
            if(i > 0) {
                sb.append(' ');
            }
            sb.append(a[i]);
        }
        System.out.println(sb.toString());
    }
}`,
});

// 2 ── easy basic ── Aggregation Sum Min Max
codeQuestions.push({
  title: "Sum and Average of Array Elements",
  description:
    "Read n integers into an array, then compute the total of all elements and their average. Print the total on the first line and the average rounded to exactly 2 decimal places on the second line.\n\nInput Format:\nLine 1: n, the number of elements.\nLine 2: n space-separated integers.\n\nOutput Format:\nLine 1: the sum of all elements.\nLine 2: the average rounded to exactly 2 decimal places.\n\nConstraints:\n1 <= n <= 1000, -1000000 <= element <= 1000000",
  difficulty: "easy",
  variant: "basic",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Aggregation Sum Min Max",
  sampleinput1: "5\n1 2 3 4 5",
  sampleoutput1: "15\n3.00",
  sampleinput2: "4\n10 20 30 40",
  sampleoutput2: "100\n25.00",
  input1: "3\n7 8 9",
  output1: "24\n8.00",
  input2: "1\n100",
  output2: "100\n100.00",
  input3: "6\n2 4 6 8 10 12",
  output3: "42\n7.00",
  inputconstrains: "1 <= n <= 1000, -1000000 <= element <= 1000000",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        long sum = 0;
        for(int i = 0; i < n; i++) {
            a[i] = sc.nextInt();
            sum = sum + a[i];
        }
        System.out.println(sum);
        System.out.printf("%.2f%n", (double) sum / n);
    }
}`,
});

// 3 ── easy basic ── Aggregation Sum Min Max
codeQuestions.push({
  title: "Smallest and Largest with Positions",
  description:
    "Read n integers into an array and report where the smallest and largest values sit. Positions are 1-based and, when a value repeats, use the first position where it appears. Print two lines, one for the minimum and one for the maximum.\n\nInput Format:\nLine 1: n, the number of elements.\nLine 2: n space-separated integers.\n\nOutput Format:\nLine 1: Min <value> at position <p>\nLine 2: Max <value> at position <q>\nwhere p and q are the 1-based positions of the first occurrence of the minimum and maximum.\n\nConstraints:\n1 <= n <= 1000, -1000000 <= element <= 1000000",
  difficulty: "easy",
  variant: "basic",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Aggregation Sum Min Max",
  sampleinput1: "5\n12 5 8 5 30",
  sampleoutput1: "Min 5 at position 2\nMax 30 at position 5",
  sampleinput2: "4\n3 3 3 3",
  sampleoutput2: "Min 3 at position 1\nMax 3 at position 1",
  input1: "6\n-2 -7 0 -7 4 4",
  output1: "Min -7 at position 2\nMax 4 at position 5",
  input2: "1\n99",
  output2: "Min 99 at position 1\nMax 99 at position 1",
  input3: "7\n10 -1 3 22 22 -1 7",
  output3: "Min -1 at position 2\nMax 22 at position 4",
  inputconstrains: "1 <= n <= 1000, -1000000 <= element <= 1000000",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        for(int i = 0; i < n; i++) {
            a[i] = sc.nextInt();
        }
        int minIdx = 0;
        int maxIdx = 0;
        for(int i = 1; i < n; i++) {
            if(a[i] < a[minIdx]) {
                minIdx = i;
            }
            if(a[i] > a[maxIdx]) {
                maxIdx = i;
            }
        }
        System.out.println("Min " + a[minIdx] + " at position " + (minIdx + 1));
        System.out.println("Max " + a[maxIdx] + " at position " + (maxIdx + 1));
    }
}`,
});

// 4 ── easy basic ── Array Traversal
codeQuestions.push({
  title: "Enhanced For Loop Sum",
  description:
    "Read n integers into an array, then compute the total of all elements using an ENHANCED for loop (for(int x : a)). The enhanced for loop visits every element of the array by value. Print the total.\n\nInput Format:\nLine 1: n, the number of elements.\nLine 2: n space-separated integers.\n\nOutput Format:\nOne line: the sum of all array elements.\n\nConstraints:\n1 <= n <= 1000, -1000000 <= element <= 1000000",
  difficulty: "easy",
  variant: "basic",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Array Traversal",
  sampleinput1: "5\n1 2 3 4 5",
  sampleoutput1: "15",
  sampleinput2: "3\n10 20 30",
  sampleoutput2: "60",
  input1: "4\n-5 5 -5 5",
  output1: "0",
  input2: "1\n0",
  output2: "0",
  input3: "8\n100 200 300 400 500 600 700 800",
  output3: "3600",
  inputconstrains: "1 <= n <= 1000, -1000000 <= element <= 1000000",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        for(int i = 0; i < n; i++) {
            a[i] = sc.nextInt();
        }
        int sum = 0;
        for(int x : a) {
            sum = sum + x;
        }
        System.out.println(sum);
    }
}`,
});

// 5 ── easy basic ── Array Reversal and Rotation
codeQuestions.push({
  title: "Print Array in Reverse",
  description:
    "Read n integers into an array and print them in reverse order (last element first) on one line, separated by single spaces. Do not modify the array; simply traverse it from the last index down to index 0.\n\nInput Format:\nLine 1: n, the number of elements.\nLine 2: n space-separated integers.\n\nOutput Format:\nOne line with the n elements in reverse order, separated by single spaces.\n\nConstraints:\n1 <= n <= 1000, -1000000 <= element <= 1000000",
  difficulty: "easy",
  variant: "basic",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Array Reversal and Rotation",
  sampleinput1: "5\n1 2 3 4 5",
  sampleoutput1: "5 4 3 2 1",
  sampleinput2: "4\n10 20 30 40",
  sampleoutput2: "40 30 20 10",
  input1: "1\n7",
  output1: "7",
  input2: "3\n5 5 5",
  output2: "5 5 5",
  input3: "6\n9 8 7 6 5 4",
  output3: "4 5 6 7 8 9",
  inputconstrains: "1 <= n <= 1000, -1000000 <= element <= 1000000",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        for(int i = 0; i < n; i++) {
            a[i] = sc.nextInt();
        }
        StringBuilder sb = new StringBuilder();
        for(int i = n - 1; i >= 0; i--) {
            sb.append(a[i]);
            if(i > 0) {
                sb.append(' ');
            }
        }
        System.out.println(sb.toString());
    }
}`,
});

// 6 ── easy basic ── Array Declaration and Initialization
codeQuestions.push({
  title: "Copy Array and Print",
  description:
    "Read n integers into a source array. Then create a second array of the same length and copy every element of the source into it with a loop (element by element, not by assigning references). Print both arrays on separate lines.\n\nInput Format:\nLine 1: n, the number of elements.\nLine 2: n space-separated integers.\n\nOutput Format:\nLine 1: Original: followed by the source elements separated by single spaces.\nLine 2: Copy: followed by the copied elements separated by single spaces.\n\nConstraints:\n1 <= n <= 1000, -1000000 <= element <= 1000000",
  difficulty: "easy",
  variant: "basic",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Array Declaration and Initialization",
  sampleinput1: "4\n3 6 9 12",
  sampleoutput1: "Original: 3 6 9 12\nCopy: 3 6 9 12",
  sampleinput2: "2\n100 200",
  sampleoutput2: "Original: 100 200\nCopy: 100 200",
  input1: "1\n55",
  output1: "Original: 55\nCopy: 55",
  input2: "5\n1 2 3 4 5",
  output2: "Original: 1 2 3 4 5\nCopy: 1 2 3 4 5",
  input3: "3\n-7 0 7",
  output3: "Original: -7 0 7\nCopy: -7 0 7",
  inputconstrains: "1 <= n <= 1000, -1000000 <= element <= 1000000",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    static String join(int[] a) {
        StringBuilder sb = new StringBuilder();
        for(int i = 0; i < a.length; i++) {
            if(i > 0) {
                sb.append(' ');
            }
            sb.append(a[i]);
        }
        return sb.toString();
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] source = new int[n];
        for(int i = 0; i < n; i++) {
            source[i] = sc.nextInt();
        }
        int[] copy = new int[n];
        for(int i = 0; i < n; i++) {
            copy[i] = source[i];
        }
        System.out.println("Original: " + join(source));
        System.out.println("Copy: " + join(copy));
    }
}`,
});

// 7 ── easy scenario ── Aggregation Sum Min Max
codeQuestions.push({
  title: "Daily Temperature Log Statistics",
  description:
    "A weather station logged the temperature of n consecutive days as integers. Analyze the log: print the hottest temperature, the coldest temperature, and the average temperature rounded to 2 decimal places.\n\nInput Format:\nLine 1: n, the number of days.\nLine 2: n space-separated integers, the temperatures.\n\nOutput Format:\nLine 1: Hottest: <value>\nLine 2: Coldest: <value>\nLine 3: Average: <value rounded to exactly 2 decimal places>\n\nConstraints:\n1 <= n <= 1000, -1000000 <= temperature <= 1000000",
  difficulty: "easy",
  variant: "scenario",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Aggregation Sum Min Max",
  sampleinput1: "5\n30 32 29 35 31",
  sampleoutput1: "Hottest: 35\nColdest: 29\nAverage: 31.40",
  sampleinput2: "4\n20 25 15 30",
  sampleoutput2: "Hottest: 30\nColdest: 15\nAverage: 22.50",
  input1: "3\n-5 0 5",
  output1: "Hottest: 5\nColdest: -5\nAverage: 0.00",
  input2: "1\n18",
  output2: "Hottest: 18\nColdest: 18\nAverage: 18.00",
  input3: "6\n10 20 30 40 50 60",
  output3: "Hottest: 60\nColdest: 10\nAverage: 35.00",
  inputconstrains: "1 <= n <= 1000, -1000000 <= temperature <= 1000000",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] temp = new int[n];
        for(int i = 0; i < n; i++) {
            temp[i] = sc.nextInt();
        }
        int hottest = temp[0];
        int coldest = temp[0];
        long sum = 0;
        for(int t : temp) {
            if(t > hottest) {
                hottest = t;
            }
            if(t < coldest) {
                coldest = t;
            }
            sum = sum + t;
        }
        System.out.println("Hottest: " + hottest);
        System.out.println("Coldest: " + coldest);
        System.out.printf("Average: %.2f%n", (double) sum / n);
    }
}`,
});

// 8 ── easy scenario ── Array Input and Output
codeQuestions.push({
  title: "Shopping Cart Item Totals",
  description:
    "A billing counter scans the price of each item (an integer number of rupees) into an array. After storing all prices, the receipt is printed: one line per item showing its position and price, then a final line with the grand total.\n\nInput Format:\nLine 1: n, the number of items.\nLine 2: n space-separated integers, the item prices.\n\nOutput Format:\nOne line per item: Item <i>: <price> (i starts from 1, in input order)\nFinal line: Total: <sum of all prices>\n\nConstraints:\n1 <= n <= 1000, 0 <= price <= 100000",
  difficulty: "easy",
  variant: "scenario",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Array Input and Output",
  sampleinput1: "3\n120 80 250",
  sampleoutput1: "Item 1: 120\nItem 2: 80\nItem 3: 250\nTotal: 450",
  sampleinput2: "2\n500 500",
  sampleoutput2: "Item 1: 500\nItem 2: 500\nTotal: 1000",
  input1: "1\n999",
  output1: "Item 1: 999\nTotal: 999",
  input2: "4\n10 20 30 40",
  output2: "Item 1: 10\nItem 2: 20\nItem 3: 30\nItem 4: 40\nTotal: 100",
  input3: "5\n0 15 0 25 10",
  output3: "Item 1: 0\nItem 2: 15\nItem 3: 0\nItem 4: 25\nItem 5: 10\nTotal: 50",
  inputconstrains: "1 <= n <= 1000, 0 <= price <= 100000",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] price = new int[n];
        long total = 0;
        for(int i = 0; i < n; i++) {
            price[i] = sc.nextInt();
            total = total + price[i];
        }
        for(int i = 0; i < n; i++) {
            System.out.println("Item " + (i + 1) + ": " + price[i]);
        }
        System.out.println("Total: " + total);
    }
}`,
});

// 9 ── easy scenario ── Array Traversal
codeQuestions.push({
  title: "Attendance Eligibility Count",
  description:
    "A college allows students to sit for the exam only if their attendance is 75 percent or more. The office stored the attendance percentage of each student in an array. Count how many students are eligible (attendance >= 75) and how many are not.\n\nInput Format:\nLine 1: n, the number of students.\nLine 2: n space-separated integers, the attendance percentages.\n\nOutput Format:\nLine 1: Eligible: <count of students with attendance >= 75>\nLine 2: Not eligible: <count of students with attendance < 75>\n\nConstraints:\n1 <= n <= 1000, 0 <= attendance <= 100",
  difficulty: "easy",
  variant: "scenario",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Array Traversal",
  sampleinput1: "5\n80 60 90 75 40",
  sampleoutput1: "Eligible: 3\nNot eligible: 2",
  sampleinput2: "4\n100 100 100 74",
  sampleoutput2: "Eligible: 3\nNot eligible: 1",
  input1: "3\n0 0 0",
  output1: "Eligible: 0\nNot eligible: 3",
  input2: "2\n75 75",
  output2: "Eligible: 2\nNot eligible: 0",
  input3: "6\n50 51 74 75 76 100",
  output3: "Eligible: 3\nNot eligible: 3",
  inputconstrains: "1 <= n <= 1000, 0 <= attendance <= 100",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] att = new int[n];
        for(int i = 0; i < n; i++) {
            att[i] = sc.nextInt();
        }
        int eligible = 0;
        for(int a : att) {
            if(a >= 75) {
                eligible++;
            }
        }
        System.out.println("Eligible: " + eligible);
        System.out.println("Not eligible: " + (n - eligible));
    }
}`,
});

// 10 ── easy scenario ── Array Reversal and Rotation
codeQuestions.push({
  title: "Token Queue in Reverse Order",
  description:
    "A clinic issues token numbers to patients in arrival order and stores them in an array. The display board above the door shows the latest token first, so the receptionist needs the token list printed in reverse order (last issued first). Print the tokens on one line, separated by single spaces.\n\nInput Format:\nLine 1: n, the number of tokens issued.\nLine 2: n space-separated integers, the token numbers in issue order.\n\nOutput Format:\nOne line with the token numbers in reverse order, separated by single spaces.\n\nConstraints:\n1 <= n <= 1000, 1 <= token <= 999999",
  difficulty: "easy",
  variant: "scenario",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Array Reversal and Rotation",
  sampleinput1: "5\n101 102 103 104 105",
  sampleoutput1: "105 104 103 102 101",
  sampleinput2: "3\n7 8 9",
  sampleoutput2: "9 8 7",
  input1: "1\n500",
  output1: "500",
  input2: "4\n2 4 6 8",
  output2: "8 6 4 2",
  input3: "6\n11 22 33 44 55 66",
  output3: "66 55 44 33 22 11",
  inputconstrains: "1 <= n <= 1000, 1 <= token <= 999999",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] token = new int[n];
        for(int i = 0; i < n; i++) {
            token[i] = sc.nextInt();
        }
        StringBuilder sb = new StringBuilder();
        for(int i = n - 1; i >= 0; i--) {
            sb.append(token[i]);
            if(i > 0) {
                sb.append(' ');
            }
        }
        System.out.println(sb.toString());
    }
}`,
});

// 11 ── medium scenario ── Searching in Arrays
codeQuestions.push({
  title: "Linear Search First Occurrence",
  description:
    "A library server keeps shelf IDs in an array. When a librarian searches for a key, the system must report the FIRST position (0-based index) where the key appears, scanning from the start with a plain linear scan. If the key is not present, print -1.\n\nInput Format:\nLine 1: n, the number of shelf IDs.\nLine 2: n space-separated integers, the shelf IDs.\nLine 3: key, the value to search.\n\nOutput Format:\nOne line: the 0-based index of the first occurrence of key, or -1 if it does not occur.\n\nConstraints:\n1 <= n <= 100000, -1000000000 <= shelf id <= 1000000000, -1000000000 <= key <= 1000000000",
  difficulty: "medium",
  variant: "scenario",
  maxscore: 20,
  lang: "java",
  topic: TOPIC,
  subtopic: "Searching in Arrays",
  sampleinput1: "5\n10 20 30 20 40\n20",
  sampleoutput1: "1",
  sampleinput2: "4\n5 6 7 8\n9",
  sampleoutput2: "-1",
  input1: "1\n42\n42",
  output1: "0",
  input2: "6\n3 1 4 1 5 9\n1",
  output2: "1",
  input3: "7\n100 200 300 400 500 600 700\n700",
  output3: "6",
  inputconstrains: "1 <= n <= 100000, -1000000000 <= value <= 1000000000",
  blacklist: "Arrays.binarySearch, binarySearch",
  whitelist: "int[",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] shelf = new int[n];
        for(int i = 0; i < n; i++) {
            shelf[i] = sc.nextInt();
        }
        int key = sc.nextInt();
        int idx = -1;
        for(int i = 0; i < n; i++) {
            if(shelf[i] == key) {
                idx = i;
                break;
            }
        }
        System.out.println(idx);
    }
}`,
});

// 12 ── medium scenario ── Array Reversal and Rotation
codeQuestions.push({
  title: "Left Rotate by K via Reversal",
  description:
    "A conveyor belt carries n boxes in a row and must be shifted LEFT by k positions: every box moves k places earlier, and the first k boxes wrap around to the end. Perform the rotation with the three-reversal technique: reverse the first k elements, reverse the remaining n-k elements, then reverse the whole array. Print the rotated row on one line, separated by single spaces. Note that k may equal n, which leaves the order unchanged.\n\nInput Format:\nLine 1: n and k, space separated.\nLine 2: n space-separated integers, the box order.\n\nOutput Format:\nOne line with the array after rotating left by k, separated by single spaces.\n\nConstraints:\n1 <= n <= 100000, 0 <= k <= n, -1000000000 <= element <= 1000000000",
  difficulty: "medium",
  variant: "scenario",
  maxscore: 20,
  lang: "java",
  topic: TOPIC,
  subtopic: "Array Reversal and Rotation",
  sampleinput1: "5 2\n1 2 3 4 5",
  sampleoutput1: "3 4 5 1 2",
  sampleinput2: "4 4\n10 20 30 40",
  sampleoutput2: "10 20 30 40",
  input1: "3 0\n7 8 9",
  output1: "7 8 9",
  input2: "6 1\n1 2 3 4 5 6",
  output2: "2 3 4 5 6 1",
  input3: "7 5\n2 4 6 8 10 12 14",
  output3: "12 14 2 4 6 8 10",
  inputconstrains: "1 <= n <= 100000, 0 <= k <= n, -1000000000 <= element <= 1000000000",
  blacklist: "System.arraycopy, Arrays.copyOf",
  whitelist: "while(",
  sourcecode: `import java.util.Scanner;

public class Main {
    static void reverse(int[] a, int left, int right) {
        while(left < right) {
            int t = a[left];
            a[left] = a[right];
            a[right] = t;
            left++;
            right--;
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int k = sc.nextInt();
        int[] a = new int[n];
        for(int i = 0; i < n; i++) {
            a[i] = sc.nextInt();
        }
        k = k % n;
        reverse(a, 0, k - 1);
        reverse(a, k, n - 1);
        reverse(a, 0, n - 1);
        StringBuilder sb = new StringBuilder();
        for(int i = 0; i < n; i++) {
            if(i > 0) {
                sb.append(' ');
            }
            sb.append(a[i]);
        }
        System.out.println(sb.toString());
    }
}`,
});

// 13 ── medium scenario ── Aggregation Sum Min Max
codeQuestions.push({
  title: "Second Largest in One Pass",
  description:
    "A leaderboard stores n scores. Find the second largest DISTINCT score in a single pass over the array, without sorting it. Duplicates do not count twice: for example, in 40 40 30 the second largest distinct score is 30. The array is guaranteed to contain at least two distinct values. Print that second largest distinct value.\n\nInput Format:\nLine 1: n, the number of scores.\nLine 2: n space-separated integers, the scores.\n\nOutput Format:\nOne line: the second largest distinct score.\n\nConstraints:\n2 <= n <= 100000, -1000000000 <= score <= 1000000000, at least two distinct values are present",
  difficulty: "medium",
  variant: "scenario",
  maxscore: 20,
  lang: "java",
  topic: TOPIC,
  subtopic: "Aggregation Sum Min Max",
  sampleinput1: "5\n10 40 30 40 20",
  sampleoutput1: "30",
  sampleinput2: "3\n5 5 8",
  sampleoutput2: "5",
  input1: "4\n-1 -2 -3 -4",
  output1: "-2",
  input2: "2\n9 3",
  output2: "3",
  input3: "6\n100 100 100 100 100 99",
  output3: "99",
  inputconstrains: "2 <= n <= 100000, -1000000000 <= score <= 1000000000",
  blacklist: "Arrays.sort",
  whitelist: "for(",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        for(int i = 0; i < n; i++) {
            a[i] = sc.nextInt();
        }
        int first = Integer.MIN_VALUE;
        int second = Integer.MIN_VALUE;
        for(int i = 0; i < n; i++) {
            if(a[i] > first) {
                second = first;
                first = a[i];
            } else if(a[i] < first && a[i] > second) {
                second = a[i];
            }
        }
        System.out.println(second);
    }
}`,
});

// 14 ── medium scenario ── Array Traversal
codeQuestions.push({
  title: "Remove Duplicates from Sorted Array",
  description:
    "A warehouse stores product IDs in non-decreasing (sorted) order. Compact the array in place with the two-pointer technique so each ID appears exactly once while keeping the sorted order; do not use any collection classes. Print the new length L on the first line, and the first L elements of the compacted array on the second line, separated by single spaces.\n\nInput Format:\nLine 1: n, the number of IDs.\nLine 2: n space-separated integers in non-decreasing order.\n\nOutput Format:\nLine 1: L, the number of distinct IDs.\nLine 2: the first L elements after compaction, separated by single spaces.\n\nConstraints:\n1 <= n <= 100000, -1000000000 <= id <= 1000000000, the input array is non-decreasing",
  difficulty: "medium",
  variant: "scenario",
  maxscore: 20,
  lang: "java",
  topic: TOPIC,
  subtopic: "Array Traversal",
  sampleinput1: "6\n1 1 2 2 3 4",
  sampleoutput1: "4\n1 2 3 4",
  sampleinput2: "1\n5",
  sampleoutput2: "1\n5",
  input1: "5\n7 7 7 7 7",
  output1: "1\n7",
  input2: "8\n-3 -3 0 0 0 2 2 9",
  output2: "4\n-3 0 2 9",
  input3: "4\n1 2 3 4",
  output3: "4\n1 2 3 4",
  inputconstrains: "1 <= n <= 100000, -1000000000 <= id <= 1000000000, array non-decreasing",
  blacklist: "HashSet",
  whitelist: "int[",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        for(int i = 0; i < n; i++) {
            a[i] = sc.nextInt();
        }
        int len = 1;
        for(int i = 1; i < n; i++) {
            if(a[i] != a[len - 1]) {
                a[len] = a[i];
                len++;
            }
        }
        System.out.println(len);
        StringBuilder sb = new StringBuilder();
        for(int i = 0; i < len; i++) {
            if(i > 0) {
                sb.append(' ');
            }
            sb.append(a[i]);
        }
        System.out.println(sb.toString());
    }
}`,
});

// 15 ── medium scenario ── Array Traversal
codeQuestions.push({
  title: "Check Array Sorted Ascending",
  description:
    "A factory quality checker expects the day's temperature readings to be stored in non-decreasing order (each value greater than or equal to the previous one). Read n readings and print true when the array is non-decreasing, otherwise print false (lowercase).\n\nInput Format:\nLine 1: n, the number of readings.\nLine 2: n space-separated integers.\n\nOutput Format:\nOne line: true if every element is >= the previous element, otherwise false.\n\nConstraints:\n1 <= n <= 100000, -1000000000 <= reading <= 1000000000",
  difficulty: "medium",
  variant: "scenario",
  maxscore: 20,
  lang: "java",
  topic: TOPIC,
  subtopic: "Array Traversal",
  sampleinput1: "5\n1 2 2 3 10",
  sampleoutput1: "true",
  sampleinput2: "4\n3 1 2 4",
  sampleoutput2: "false",
  input1: "1\n100",
  output1: "true",
  input2: "5\n-5 -1 0 0 7",
  output2: "true",
  input3: "6\n1 2 3 2 5 6",
  output3: "false",
  inputconstrains: "1 <= n <= 100000, -1000000000 <= reading <= 1000000000",
  blacklist: "Arrays.sort",
  whitelist: "for(",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        for(int i = 0; i < n; i++) {
            a[i] = sc.nextInt();
        }
        boolean sorted = true;
        for(int i = 1; i < n; i++) {
            if(a[i - 1] > a[i]) {
                sorted = false;
            }
        }
        System.out.println(sorted);
    }
}`,
});

// 16 ── medium scenario ── Array Input and Output
codeQuestions.push({
  title: "Prefix Sums of Sensor Readings",
  description:
    "An energy monitor records n hourly readings that may be negative. The dashboard needs the running totals: the i-th prefix sum is the total of the first i readings. Compute all n prefix sums and print them on one line, separated by single spaces. Use a long array, because the totals can exceed the int range.\n\nInput Format:\nLine 1: n, the number of readings.\nLine 2: n space-separated integers.\n\nOutput Format:\nOne line with n prefix sums separated by single spaces.\n\nConstraints:\n1 <= n <= 100000, -1000000000 <= reading <= 1000000000",
  difficulty: "medium",
  variant: "scenario",
  maxscore: 20,
  lang: "java",
  topic: TOPIC,
  subtopic: "Array Input and Output",
  sampleinput1: "5\n1 2 3 4 5",
  sampleoutput1: "1 3 6 10 15",
  sampleinput2: "4\n10 -5 20 0",
  sampleoutput2: "10 5 25 25",
  input1: "3\n7 7 7",
  output1: "7 14 21",
  input2: "1\n1000000",
  output2: "1000000",
  input3: "6\n2 4 6 8 10 12",
  output3: "2 6 12 20 30 42",
  inputconstrains: "1 <= n <= 100000, -1000000000 <= reading <= 1000000000",
  blacklist: "IntStream",
  whitelist: "long[",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] read = new int[n];
        for(int i = 0; i < n; i++) {
            read[i] = sc.nextInt();
        }
        long[] prefix = new long[n];
        long run = 0;
        for(int i = 0; i < n; i++) {
            run = run + read[i];
            prefix[i] = run;
        }
        StringBuilder sb = new StringBuilder();
        for(int i = 0; i < n; i++) {
            if(i > 0) {
                sb.append(' ');
            }
            sb.append(prefix[i]);
        }
        System.out.println(sb.toString());
    }
}`,
});

// 17 ── hard scenario ── Aggregation Sum Min Max
codeQuestions.push({
  title: "Maximum Subarray Sum with Kadane",
  description:
    "A power grid logs a net load delta every minute; deltas may be negative. The control room must find the non-empty contiguous window of minutes whose deltas add up to the maximum, and print that maximum sum. Solve it with Kadane's algorithm in O(n), using long arithmetic, since the array can hold 100000 values.\n\nInput Format:\nLine 1: n, the number of readings.\nLine 2: n space-separated integers, which may be negative.\n\nOutput Format:\nOne line: the maximum possible sum of a non-empty contiguous subarray.\n\nConstraints:\n1 <= n <= 100000, -1000000000 <= value <= 1000000000",
  difficulty: "hard",
  variant: "scenario",
  maxscore: 30,
  lang: "java",
  topic: TOPIC,
  subtopic: "Aggregation Sum Min Max",
  sampleinput1: "9\n-2 1 -3 4 -1 2 1 -5 4",
  sampleoutput1: "6",
  sampleinput2: "4\n5 5 5 5",
  sampleoutput2: "20",
  input1: "5\n-1 -2 -3 -4 -5",
  output1: "-1",
  input2: "1\n42",
  output2: "42",
  input3: "8\n1 2 3 4 5 -20 10 10",
  output3: "20",
  inputconstrains: "1 <= n <= 100000, -1000000000 <= value <= 1000000000",
  blacklist: "IntStream",
  whitelist: "long[",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        long[] a = new long[n];
        for(int i = 0; i < n; i++) {
            a[i] = sc.nextLong();
        }
        long best = a[0];
        long cur = a[0];
        for(int i = 1; i < n; i++) {
            if(cur < 0) {
                cur = a[i];
            } else {
                cur = cur + a[i];
            }
            if(cur > best) {
                best = cur;
            }
        }
        System.out.println(best);
    }
}`,
});

// 18 ── hard scenario ── Searching in Arrays
codeQuestions.push({
  title: "Majority Element in the Batch",
  description:
    "A quality control station labels each product in a batch with an integer defect code. A batch is dominated when one single code appears strictly more than n/2 times. Find the dominating code and print it; if no code appears more than n/2 times, print -1. Work directly on the array with plain nested scans (n is at most 1000) and do not use any map or set collections.\n\nInput Format:\nLine 1: n, the number of products.\nLine 2: n space-separated integers, the defect codes.\n\nOutput Format:\nOne line: the code that occurs strictly more than n/2 times, or -1 if none does.\n\nConstraints:\n1 <= n <= 1000, 0 <= code <= 1000000000",
  difficulty: "hard",
  variant: "scenario",
  maxscore: 30,
  lang: "java",
  topic: TOPIC,
  subtopic: "Searching in Arrays",
  sampleinput1: "7\n2 2 1 2 3 2 2",
  sampleoutput1: "2",
  sampleinput2: "4\n1 2 3 4",
  sampleoutput2: "-1",
  input1: "1\n7",
  output1: "7",
  input2: "6\n5 5 5 1 1 1",
  output2: "-1",
  input3: "5\n9 9 9 9 1",
  output3: "9",
  inputconstrains: "1 <= n <= 1000, 0 <= code <= 1000000000",
  blacklist: "HashMap",
  whitelist: "int[",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] code = new int[n];
        for(int i = 0; i < n; i++) {
            code[i] = sc.nextInt();
        }
        int answer = -1;
        for(int i = 0; i < n && answer == -1; i++) {
            int count = 0;
            for(int j = 0; j < n; j++) {
                if(code[j] == code[i]) {
                    count++;
                }
            }
            if(count > n / 2) {
                answer = code[i];
            }
        }
        System.out.println(answer);
    }
}`,
});

// 19 ── hard scenario ── Array Reversal and Rotation
codeQuestions.push({
  title: "Mega Queue Rotation with Huge K",
  description:
    "An airport re-queues n boarding groups by rotating the whole queue LEFT by k positions, but k can be astronomically large (up to 1000000000) and far bigger than the queue length, so reduce it with k modulo n first. Then rotate in O(n) with the three-reversal technique. Print the rotated queue on one line, separated by single spaces.\n\nInput Format:\nLine 1: n and k, space separated.\nLine 2: n space-separated integers, the group order.\n\nOutput Format:\nOne line with the queue after rotating left by k positions, separated by single spaces.\n\nConstraints:\n1 <= n <= 100000, 0 <= k <= 1000000000, -1000000000 <= group id <= 1000000000",
  difficulty: "hard",
  variant: "scenario",
  maxscore: 30,
  lang: "java",
  topic: TOPIC,
  subtopic: "Array Reversal and Rotation",
  sampleinput1: "5 12\n1 2 3 4 5",
  sampleoutput1: "3 4 5 1 2",
  sampleinput2: "3 1000000000\n10 20 30",
  sampleoutput2: "20 30 10",
  input1: "4 0\n5 6 7 8",
  output1: "5 6 7 8",
  input2: "6 3\n1 2 3 4 5 6",
  output2: "4 5 6 1 2 3",
  input3: "2 999999999\n100 200",
  output3: "200 100",
  inputconstrains: "1 <= n <= 100000, 0 <= k <= 1000000000, -1000000000 <= group id <= 1000000000",
  blacklist: "System.arraycopy, Arrays.copyOf, Arrays.fill",
  whitelist: "while(",
  sourcecode: `import java.util.Scanner;

public class Main {
    static void reverse(long[] a, int left, int right) {
        while(left < right) {
            long t = a[left];
            a[left] = a[right];
            a[right] = t;
            left++;
            right--;
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        long k = sc.nextLong();
        long[] a = new long[n];
        for(int i = 0; i < n; i++) {
            a[i] = sc.nextLong();
        }
        int kk = (int) (k % n);
        reverse(a, 0, kk - 1);
        reverse(a, kk, n - 1);
        reverse(a, 0, n - 1);
        StringBuilder sb = new StringBuilder();
        for(int i = 0; i < n; i++) {
            if(i > 0) {
                sb.append(' ');
            }
            sb.append(a[i]);
        }
        System.out.println(sb.toString());
    }
}`,
});

// 20 ── hard scenario ── Searching in Arrays
codeQuestions.push({
  title: "Missing Number in Zero to N",
  description:
    "An attendance device assigns IDs from 0 to n for the day, but exactly one ID never appears in the log. Read n and the n logged IDs (all distinct, each between 0 and n). Find the missing ID with the arithmetic sum formula (or XOR) instead of any map or set: the sum of 0 to n is n*(n+1)/2, so the missing value is that total minus the sum of the logged IDs. Print the missing ID.\n\nInput Format:\nLine 1: n.\nLine 2: n space-separated distinct integers, each between 0 and n inclusive.\n\nOutput Format:\nOne line: the missing ID.\n\nConstraints:\n1 <= n <= 100000, all logged values are distinct and lie in 0..n with exactly one value missing",
  difficulty: "hard",
  variant: "scenario",
  maxscore: 30,
  lang: "java",
  topic: TOPIC,
  subtopic: "Searching in Arrays",
  sampleinput1: "4\n0 1 2 4",
  sampleoutput1: "3",
  sampleinput2: "3\n3 2 1",
  sampleoutput2: "0",
  input1: "1\n0",
  output1: "1",
  input2: "5\n5 4 3 2 0",
  output2: "1",
  input3: "10\n0 1 2 3 4 5 6 7 8 10",
  output3: "9",
  inputconstrains: "1 <= n <= 100000, values distinct in 0..n with exactly one missing",
  blacklist: "HashMap, HashSet",
  whitelist: "long",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        long actual = 0;
        for(int i = 0; i < n; i++) {
            a[i] = sc.nextInt();
            actual = actual + a[i];
        }
        long expected = (long) (n + 1) * n / 2;
        System.out.println(expected - actual);
    }
}`,
});

/* ─────────────────────────────── MCQ QUESTIONS ─────────────────────────────── */

const mcqQuestions = [];

// E1 ── easy ── Array Declaration and Initialization
mcqQuestions.push({
  topic: TOPIC,
  iscodesnippet: false,
  codesnippet: null,
  snippetLang: null,
  title: "Default Values in a Fresh Array",
  description:
    "Consider the statement int[] marks = new int[5];. What value does marks[2] hold immediately after the array is created?",
  difficulty: "easy",
  subtopic: "Array Declaration and Initialization",
  Option1: "0",
  Option2: "null",
  Option3: "A random garbage value",
  Option4: "Compilation error, because the element was never assigned",
  CorrectOption: 1,
});

// E2 ── easy ── Array Traversal
mcqQuestions.push({
  topic: TOPIC,
  iscodesnippet: false,
  codesnippet: null,
  snippetLang: null,
  title: "Accessing the Array Length",
  description:
    "Given int[] a = new int[10]; which expression correctly gives the number of elements stored in a?",
  difficulty: "easy",
  subtopic: "Array Traversal",
  Option1: "a.length()",
  Option2: "a.length",
  Option3: "a.size()",
  Option4: "a.count",
  CorrectOption: 2,
});

// E3 ── easy ── Array Traversal
mcqQuestions.push({
  topic: TOPIC,
  iscodesnippet: false,
  codesnippet: null,
  snippetLang: null,
  title: "Valid Index Range",
  description:
    "Given int[] a = new int[10]; which of these expressions accesses the LAST element of the array?",
  difficulty: "easy",
  subtopic: "Array Traversal",
  Option1: "a[10]",
  Option2: "a[a.length]",
  Option3: "a[9]",
  Option4: "a[-1]",
  CorrectOption: 3,
});

// E4 ── easy ── Array Declaration and Initialization
mcqQuestions.push({
  topic: TOPIC,
  iscodesnippet: false,
  codesnippet: null,
  snippetLang: null,
  title: "Creating an Array of Eight Integers",
  description: "Which single statement correctly creates an array that can hold 8 int values?",
  difficulty: "easy",
  subtopic: "Array Declaration and Initialization",
  Option1: "int[] a = new int[8];",
  Option2: "int[8] a = new int[];",
  Option3: "int a = new int[8];",
  Option4: "int[] a = new int(8);",
  CorrectOption: 1,
});

// E5 ── easy ── Array Declaration and Initialization
mcqQuestions.push({
  topic: TOPIC,
  iscodesnippet: false,
  codesnippet: null,
  snippetLang: null,
  title: "Anonymous Array Initialization",
  description:
    "Which line declares AND initializes an array in one statement using the anonymous array form (without repeating the type on the right side twice with a size)?",
  difficulty: "easy",
  subtopic: "Array Declaration and Initialization",
  Option1: "int[] b = new int[3]{1, 2, 3};",
  Option2: "int[] b = {1; 2; 3};",
  Option3: "int[] b = new {1, 2, 3};",
  Option4: "int[] b = new int[]{1, 2, 3};",
  CorrectOption: 4,
});

// E6 ── easy ── Array Input and Output
mcqQuestions.push({
  topic: TOPIC,
  iscodesnippet: false,
  codesnippet: null,
  snippetLang: null,
  title: "Purpose of Arrays.toString",
  description:
    "For int[] a = {3, 1, 2}; what does System.out.println(Arrays.toString(a)); display?",
  difficulty: "easy",
  subtopic: "Array Input and Output",
  Option1: "Something like [I@1b6d3586, the internal reference form",
  Option2: "[3, 1, 2]",
  Option3: "3 1 2 without any brackets",
  Option4: "The number of elements, 3",
  CorrectOption: 2,
});

// E7 ── easy ── Array Traversal
mcqQuestions.push({
  topic: TOPIC,
  iscodesnippet: false,
  codesnippet: null,
  snippetLang: null,
  title: "Enhanced For Loop Basics",
  description:
    "In the statement for(int x : arr) { ... } where arr is an int array, what does x hold during each iteration?",
  difficulty: "easy",
  subtopic: "Array Traversal",
  Option1: "The value of the current element, visiting them from first to last",
  Option2: "The index of the current element",
  Option3: "The memory address of the current element",
  Option4: "The last element on every iteration",
  CorrectOption: 1,
});

// E8 ── easy snippet ── Array Traversal
mcqQuestions.push({
  topic: TOPIC,
  iscodesnippet: true,
  codesnippet: `public class Main {
    static void bump(int[] a) {
        a[0] = a[0] + 5;
    }
    public static void main(String[] args) {
        int[] v = {1, 2};
        bump(v);
        System.out.println(v[0]);
    }
}`,
  snippetLang: "java",
  title: "Passing an Array to a Method",
  description:
    "The array reference is passed by value, but the copy still points to the same array object, so element changes made inside the method are visible to the caller. What does this program print?",
  difficulty: "easy",
  subtopic: "Array Traversal",
  Option1: "1",
  Option2: "6",
  Option3: "0",
  Option4: "Compilation error",
  CorrectOption: 2,
});

// E9 ── easy ── Aggregation Sum Min Max
mcqQuestions.push({
  topic: TOPIC,
  iscodesnippet: false,
  codesnippet: null,
  snippetLang: null,
  title: "Choosing the Sum Variable Type",
  description:
    "A program sums up to 100000 sensor readings, each as large as 1000000000. Which data type for the running sum avoids overflow?",
  difficulty: "easy",
  subtopic: "Aggregation Sum Min Max",
  Option1: "int",
  Option2: "short",
  Option3: "long",
  Option4: "byte",
  CorrectOption: 3,
});

// E10 ── easy ── Array Reversal and Rotation
mcqQuestions.push({
  topic: TOPIC,
  iscodesnippet: false,
  codesnippet: null,
  snippetLang: null,
  title: "Loop Header for Reverse Traversal",
  description:
    "You want to visit every element of an array named a starting from the last index and ending at index 0. Which loop header does that correctly?",
  difficulty: "easy",
  subtopic: "Array Reversal and Rotation",
  Option1: "for(int i = 0; i <= a.length; i--)",
  Option2: "for(int i = a.length; i > 0; i++)",
  Option3: "for(int i = a.length - 1; i > 0; i++)",
  Option4: "for(int i = a.length - 1; i >= 0; i--)",
  CorrectOption: 4,
});

// M1 ── medium snippet ── Array Traversal
mcqQuestions.push({
  topic: TOPIC,
  iscodesnippet: true,
  codesnippet: `public class Main {
    public static void main(String[] args) {
        int[] a = new int[3];
        a[0] = 5;
        a[3] = 7;
        System.out.println("done");
    }
}`,
  snippetLang: "java",
  title: "Out of Bounds Write Behavior",
  description: "What happens when this program is compiled and run?",
  difficulty: "medium",
  subtopic: "Array Traversal",
  Option1: "It prints done because arrays grow automatically when needed",
  Option2: "It prints 7",
  Option3: "It compiles but throws ArrayIndexOutOfBoundsException at runtime",
  Option4: "It fails to compile because a[3] is out of range",
  CorrectOption: 3,
});

// M2 ── medium snippet ── Array Declaration and Initialization
mcqQuestions.push({
  topic: TOPIC,
  iscodesnippet: true,
  codesnippet: `public class Main {
    public static void main(String[] args) {
        String[] words = {"cat", "dog"};
        String[] copy = words;
        copy[0] = "bird";
        System.out.println(words[0]);
    }
}`,
  snippetLang: "java",
  title: "Array of Strings Reference Behavior",
  description:
    "Assigning one array variable to another copies the reference, not the elements, so both variables point to the same array object. What does this program print?",
  difficulty: "medium",
  subtopic: "Array Declaration and Initialization",
  Option1: "bird",
  Option2: "cat",
  Option3: "null",
  Option4: "Compilation error",
  CorrectOption: 1,
});

// M3 ── medium snippet ── Array Traversal
mcqQuestions.push({
  topic: TOPIC,
  iscodesnippet: true,
  codesnippet: `public class Main {
    public static void main(String[] args) {
        int[] a = {1, 2, 3};
        for(int x : a) {
            x = x * 10;
        }
        System.out.println(a[0] + " " + a[1] + " " + a[2]);
    }
}`,
  snippetLang: "java",
  title: "Enhanced For Cannot Modify Elements",
  description:
    "In an enhanced for loop over primitives, x is a copy of each element, so assigning to it never changes the array. What does this program print?",
  difficulty: "medium",
  subtopic: "Array Traversal",
  Option1: "10 20 30",
  Option2: "1 2 3",
  Option3: "0 0 0",
  Option4: "Compilation error",
  CorrectOption: 2,
});

// M4 ── medium snippet ── Array Traversal
mcqQuestions.push({
  topic: TOPIC,
  iscodesnippet: true,
  codesnippet: `public class Main {
    public static void main(String[] args) {
        int[] a = {4, 5, 6};
        System.out.println(a.length);
    }
}`,
  snippetLang: "java",
  title: "Length Field versus Method",
  description: "Which statement is TRUE about this program?",
  difficulty: "medium",
  subtopic: "Array Traversal",
  Option1: "It prints 3; arrays expose length as a public final field",
  Option2: "It prints 3; length is a method that every array inherits",
  Option3: "It fails to compile; arrays require the call a.length()",
  Option4: "It compiles but always prints 0 for empty-looking arrays",
  CorrectOption: 1,
});

// M6 ── medium ── Searching in Arrays
mcqQuestions.push({
  topic: TOPIC,
  iscodesnippet: false,
  codesnippet: null,
  snippetLang: null,
  title: "Binary Search Needs Sorted Data",
  description:
    "A student applies Arrays.binarySearch directly to an UNSORTED int array to find a key. What is the most accurate description of the outcome?",
  difficulty: "medium",
  subtopic: "Searching in Arrays",
  Option1: "The method sorts the array first, so the result is always correct",
  Option2: "The compiler rejects the call because the array is unsorted",
  Option3: "The method silently performs a linear scan, so the result is always correct",
  Option4: "The result is unreliable; the key may be reported as missing or at a wrong index",
  CorrectOption: 4,
});

// M7 ── medium snippet ── Array Declaration and Initialization
mcqQuestions.push({
  topic: TOPIC,
  iscodesnippet: true,
  codesnippet: `public class Main {
    public static void main(String[] args) {
        int[][] grid = new int[3][4];
        System.out.println(grid.length + " " + grid[0].length);
    }
}`,
  snippetLang: "java",
  title: "Rows and Columns of a 2D Array",
  description:
    "For a 2D array, grid.length is the number of rows (each row is itself a 1D array) and grid[0].length is the number of columns in the first row. What does this program print?",
  difficulty: "medium",
  subtopic: "Array Declaration and Initialization",
  Option1: "4 3",
  Option2: "12 1",
  Option3: "3 4",
  Option4: "3 12",
  CorrectOption: 3,
});

// H1 ── hard snippet ── Aggregation Sum Min Max
mcqQuestions.push({
  topic: TOPIC,
  iscodesnippet: true,
  codesnippet: `public class Main {
    public static void main(String[] args) {
        int[] a = {2, -1, 3, -5, 4};
        int best = a[0];
        int cur = a[0];
        for(int i = 1; i < a.length; i++) {
            if(cur < 0) {
                cur = a[i];
            } else {
                cur = cur + a[i];
            }
            if(cur > best) {
                best = cur;
            }
        }
        System.out.println(best);
    }
}`,
  snippetLang: "java",
  title: "Kadane Window Trace",
  description:
    "This is Kadane's algorithm for the maximum subarray sum: cur restarts at the current element whenever the running sum goes negative. Trace it carefully. What does the program print?",
  difficulty: "hard",
  subtopic: "Aggregation Sum Min Max",
  Option1: "3",
  Option2: "4",
  Option3: "6",
  Option4: "-1",
  CorrectOption: 2,
});

// H2 ── hard snippet ── Array Reversal and Rotation
mcqQuestions.push({
  topic: TOPIC,
  iscodesnippet: true,
  codesnippet: `public class Main {
    static int[] twist(int[] a) {
        int[] b = new int[a.length];
        for(int i = 0; i < a.length; i++) {
            b[i] = a[a.length - 1 - i];
        }
        return b;
    }
    public static void main(String[] args) {
        int[] src = {1, 2, 3, 4, 5};
        int[] dst = twist(src);
        dst[0] = 100;
        System.out.println(src[0] + " " + dst[0] + " " + dst[4]);
    }
}`,
  snippetLang: "java",
  title: "Copy versus Alias After Reversal",
  description:
    "twist builds a brand new array holding the reversed contents, so src and dst are separate objects. What does this program print?",
  difficulty: "hard",
  subtopic: "Array Reversal and Rotation",
  Option1: "1 100 1",
  Option2: "100 100 1",
  Option3: "1 100 5",
  Option4: "100 1 1",
  CorrectOption: 1,
});

// H3 ── hard snippet ── Array Traversal
mcqQuestions.push({
  topic: TOPIC,
  iscodesnippet: true,
  codesnippet: `public class Main {
    public static void main(String[] args) {
        int[] a = new int[5];
        for(int i = 0; i <= a.length; i++) {
            a[i] = i * 2;
        }
        System.out.println(a[4]);
    }
}`,
  snippetLang: "java",
  title: "Off By One Write Crash",
  description:
    "The loop condition i <= a.length lets the counter reach index 5 in an array of length 5. What happens when the program runs?",
  difficulty: "hard",
  subtopic: "Array Traversal",
  Option1: "It prints 8, because the last valid element was written before the loop ended",
  Option2: "It prints 10, because the loop writes index 5 safely",
  Option3: "It throws ArrayIndexOutOfBoundsException before anything is printed",
  Option4: "It prints 0",
  CorrectOption: 3,
});

// H5 ── hard snippet ── Array Reversal and Rotation
mcqQuestions.push({
  topic: TOPIC,
  iscodesnippet: true,
  codesnippet: `public class Main {
    public static void main(String[] args) {
        int[] a = {4, 5, 6, 7};
        int first = a[0];
        for(int i = 0; i < a.length - 1; i++) {
            a[i] = a[i + 1];
        }
        a[a.length - 1] = first;
        System.out.println(a[0] + " " + a[1] + " " + a[2] + " " + a[3]);
    }
}`,
  snippetLang: "java",
  title: "Manual Left Rotation Trace",
  description:
    "The code saves the first element, shifts every remaining element one position left, and places the saved element at the end. What does the program print?",
  difficulty: "hard",
  subtopic: "Array Reversal and Rotation",
  Option1: "4 5 6 7",
  Option2: "7 4 5 6",
  Option3: "5 6 7 7",
  Option4: "5 6 7 4",
  CorrectOption: 4,
});

/* ─────────────────────────────── SELF-CHECKS ─────────────────────────────── */

const problems = [];

if (codeQuestions.length !== 20) problems.push(`code count ${codeQuestions.length} != 20`);
if (mcqQuestions.length !== 20) problems.push(`mcq count ${mcqQuestions.length} != 20`);

const cd = { easy: 0, medium: 0, hard: 0 };
const cv = { basic: 0, scenario: 0 };
const subCount = {};
const titles = new Set();
for (const q of codeQuestions) {
  cd[q.difficulty]++;
  if (q.difficulty === "easy") cv[q.variant]++;
  subCount[q.subtopic] = (subCount[q.subtopic] || 0) + 1;
  if (titles.has(q.title)) problems.push(`dup code title ${q.title}`);
  titles.add(q.title);
  if (!q.sourcecode.includes("class Main")) problems.push(`${q.title}: missing class Main`);
  if (q.sourcecode.includes("\\")) problems.push(`${q.title}: backslash in sourcecode`);
  for (const kw of q.blacklist.split(",").map((s) => s.trim()).filter(Boolean)) {
    if (q.sourcecode.includes(kw)) problems.push(`${q.title}: blacklisted "${kw}" present`);
  }
  for (const kw of q.whitelist.split(",").map((s) => s.trim()).filter(Boolean)) {
    if (!q.sourcecode.includes(kw)) problems.push(`${q.title}: whitelisted "${kw}" missing`);
  }
  for (const f of ["sampleinput1", "sampleoutput1", "sampleinput2", "sampleoutput2", "input1", "output1", "input2", "output2", "input3", "output3"]) {
    if (typeof q[f] !== "string" || q[f].length === 0) problems.push(`${q.title}: empty field ${f}`);
  }
  if (q.difficulty === "easy" && (q.blacklist || q.whitelist)) problems.push(`${q.title}: easy must have empty blacklist/whitelist`);
  if (q.difficulty !== "easy" && (!q.blacklist || !q.whitelist)) problems.push(`${q.title}: medium/hard need blacklist+whitelist`);
  if (q.difficulty === "easy" && q.maxscore !== 10) problems.push(`${q.title}: easy maxscore != 10`);
  if (q.difficulty === "medium" && q.maxscore !== 20) problems.push(`${q.title}: medium maxscore != 20`);
  if (q.difficulty === "hard" && q.maxscore !== 30) problems.push(`${q.title}: hard maxscore != 30`);
}
if (cd.easy !== 10 || cd.medium !== 6 || cd.hard !== 4) problems.push(`code difficulty ${JSON.stringify(cd)}`);
if (cv.basic !== 6 || cv.scenario !== 4) problems.push(`easy variant ${JSON.stringify(cv)}`);
for (const s of SUBTOPICS) {
  if (!subCount[s]) problems.push(`subtopic never used: ${s}`);
}

const md = { easy: 0, medium: 0, hard: 0 };
let snippets = 0;
const mtitles = new Set();
for (const q of mcqQuestions) {
  md[q.difficulty]++;
  if (mtitles.has(q.title)) problems.push(`dup mcq title ${q.title}`);
  mtitles.add(q.title);
  if (q.iscodesnippet) {
    snippets++;
    if (q.codesnippet && q.codesnippet.includes("\\")) problems.push(`${q.title}: backslash in snippet`);
  }
  const opts = [q.Option1, q.Option2, q.Option3, q.Option4];
  if (new Set(opts).size !== 4) problems.push(`${q.title}: options not distinct`);
  if (opts.some((o) => !o || o.length === 0)) problems.push(`${q.title}: empty option`);
  const lower = opts.map((o) => o.toLowerCase());
  if (lower.some((o) => o.includes("all of the above") || o.includes("none of the above"))) {
    problems.push(`${q.title}: all/none of the above`);
  }
}
if (md.easy !== 10 || md.medium !== 6 || md.hard !== 4) problems.push(`mcq difficulty ${JSON.stringify(md)}`);
if (snippets < 6) problems.push(`only ${snippets} snippets`);

if (problems.length) {
  console.error("SELF-CHECK FAILED:");
  for (const p of problems) console.error("  - " + p);
  process.exit(1);
}

/* ─────────────────────────────── WRITE PART FILES ─────────────────────────────── */

const codeP1 = { day: 7, topics: [{ name: TOPIC, subtopics: SUBTOPICS }], questions: codeQuestions.slice(0, 10) };
const codeP2 = { questions: codeQuestions.slice(10) };
const mcqP1 = { questions: mcqQuestions.slice(0, 10) };
const mcqP2 = { questions: mcqQuestions.slice(10) };

fs.writeFileSync(path.join(DIR, "day-07.code.p1.json"), JSON.stringify(codeP1, null, 2) + "\n");
fs.writeFileSync(path.join(DIR, "day-07.code.p2.json"), JSON.stringify(codeP2, null, 2) + "\n");
fs.writeFileSync(path.join(DIR, "day-07.mcq.p1.json"), JSON.stringify(mcqP1, null, 2) + "\n");
fs.writeFileSync(path.join(DIR, "day-07.mcq.p2.json"), JSON.stringify(mcqP2, null, 2) + "\n");

console.log("SELF-CHECK OK");
console.log(`code: easy=${cd.easy} (basic=${cv.basic}, scenario=${cv.scenario}) medium=${cd.medium} hard=${cd.hard}`);
console.log(`code subtopics: ${JSON.stringify(subCount)}`);
console.log(`mcq: easy=${md.easy} medium=${md.medium} hard=${md.hard} snippets=${snippets}`);
console.log("part files written to", DIR);
