/**
 * Day 6 generator — "OOPS using JAVA" — Recursion
 * Writes the 4 part files consumed by merge-parts.ts.
 *
 * All solutions are RECURSIVE static methods. No backslashes anywhere in
 * Java code or snippets. Expected outputs verified by hand.
 */
import fs from "node:fs";
import path from "node:path";

const DIR = "/home/z/my-project/scripts/oops-java/data/parts";
fs.mkdirSync(DIR, { recursive: true });

const TOPIC = "Recursion";
const SUBTOPICS = [
  "Recursion Basics",
  "Base and Recursive Case",
  "Mathematical Recursion",
  "Recursion on Strings",
  "Recursion on Arrays",
  "Recursion vs Iteration",
];

/* ─────────────────────────────── CODE QUESTIONS ─────────────────────────────── */

const codeQuestions = [];

// 1 ── easy basic ── Mathematical Recursion
codeQuestions.push({
  title: "Factorial Using Recursion",
  description:
    "Write a recursive method factorial that takes an integer n and returns n! using recursion. The method must call itself with a smaller value and stop at the base case (0 or 1 returning 1). Read n in main, call the method, and print the returned value.\n\nInput Format:\nA single line containing one integer n.\n\nOutput Format:\nPrint one line: n! computed recursively.\n\nConstraints:\n0 <= n <= 20",
  difficulty: "easy",
  variant: "basic",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Mathematical Recursion",
  sampleinput1: "5",
  sampleoutput1: "120",
  sampleinput2: "1",
  sampleoutput2: "1",
  input1: "0",
  output1: "1",
  input2: "12",
  output2: "479001600",
  input3: "20",
  output3: "2432902008176640000",
  inputconstrains: "0 <= n <= 20",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    static long factorial(int n) {
        if(n <= 1) {
            return 1;
        }
        return n * factorial(n - 1);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(factorial(n));
    }
}`,
});

// 2 ── easy basic ── Mathematical Recursion
codeQuestions.push({
  title: "Sum of N Natural Numbers Recursively",
  description:
    "Write a recursive method sumNatural that returns the sum of the first n natural numbers (1 + 2 + ... + n) using recursion only, with no loops. The base case returns 0 for n = 0. Read n in main and print the returned sum.\n\nInput Format:\nA single line containing one integer n.\n\nOutput Format:\nPrint one line: the recursive sum 1 + 2 + ... + n.\n\nConstraints:\n1 <= n <= 1000",
  difficulty: "easy",
  variant: "basic",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Mathematical Recursion",
  sampleinput1: "10",
  sampleoutput1: "55",
  sampleinput2: "1",
  sampleoutput2: "1",
  input1: "100",
  output1: "5050",
  input2: "1000",
  output2: "500500",
  input3: "500",
  output3: "125250",
  inputconstrains: "1 <= n <= 1000",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    static long sumNatural(int n) {
        if(n == 0) {
            return 0;
        }
        return n + sumNatural(n - 1);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(sumNatural(n));
    }
}`,
});

// 3 ── easy basic ── Mathematical Recursion
codeQuestions.push({
  title: "Recursive Fibonacci Term",
  description:
    "Write a recursive method fib that returns the nth term of the Fibonacci sequence defined as fib(1) = 1, fib(2) = 1 and fib(n) = fib(n - 1) + fib(n - 2). Read n in main and print the nth term. Use plain recursion with the two base cases, no arrays and no loops.\n\nInput Format:\nA single line containing one integer n.\n\nOutput Format:\nPrint one line: the nth Fibonacci term.\n\nConstraints:\n1 <= n <= 25",
  difficulty: "easy",
  variant: "basic",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Mathematical Recursion",
  sampleinput1: "10",
  sampleoutput1: "55",
  sampleinput2: "1",
  sampleoutput2: "1",
  input1: "2",
  output1: "1",
  input2: "15",
  output2: "610",
  input3: "25",
  output3: "75025",
  inputconstrains: "1 <= n <= 25",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    static int fib(int n) {
        if(n <= 2) {
            return 1;
        }
        return fib(n - 1) + fib(n - 2);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(fib(n));
    }
}`,
});

// 4 ── easy basic ── Mathematical Recursion
codeQuestions.push({
  title: "Power of a Number Recursively",
  description:
    "Write a recursive method power that takes a base and an exponent and returns base raised to the exponent using repeated multiplication by recursion: power(base, exp) = base * power(base, exp - 1) with the base case power(base, 0) = 1. No Math.pow and no loops. Read base and exp in main and print the returned value.\n\nInput Format:\nA single line with two space-separated integers: base and exp.\n\nOutput Format:\nPrint one line: base to the power exp.\n\nConstraints:\n-10 <= base <= 10, 0 <= exp <= 15",
  difficulty: "easy",
  variant: "basic",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Mathematical Recursion",
  sampleinput1: "2 5",
  sampleoutput1: "32",
  sampleinput2: "3 3",
  sampleoutput2: "27",
  input1: "5 0",
  output1: "1",
  input2: "-2 4",
  output2: "16",
  input3: "10 15",
  output3: "1000000000000000",
  inputconstrains: "-10 <= base <= 10, 0 <= exp <= 15",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    static long power(int base, int exp) {
        if(exp == 0) {
            return 1;
        }
        return base * power(base, exp - 1);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int base = sc.nextInt();
        int exp = sc.nextInt();
        System.out.println(power(base, exp));
    }
}`,
});

// 5 ── easy basic ── Base and Recursive Case
codeQuestions.push({
  title: "Digit Sum Using Recursion",
  description:
    "Write a recursive method digitSum that returns the sum of the digits of a non-negative number using recursion: digitSum(n) = (n % 10) + digitSum(n / 10), with the base case returning n itself once n is a single digit. Read n in main and print the returned digit sum.\n\nInput Format:\nA single line containing one non-negative integer n.\n\nOutput Format:\nPrint one line: the sum of the digits of n.\n\nConstraints:\n0 <= n <= 1000000000000",
  difficulty: "easy",
  variant: "basic",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Base and Recursive Case",
  sampleinput1: "12345",
  sampleoutput1: "15",
  sampleinput2: "7",
  sampleoutput2: "7",
  input1: "0",
  output1: "0",
  input2: "999999999999",
  output2: "108",
  input3: "1000000000000",
  output3: "1",
  inputconstrains: "0 <= n <= 1000000000000",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    static int digitSum(long n) {
        if(n < 10) {
            return (int) n;
        }
        return (int)(n % 10) + digitSum(n / 10);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long n = sc.nextLong();
        System.out.println(digitSum(n));
    }
}`,
});

// 6 ── easy basic ── Recursion on Strings
codeQuestions.push({
  title: "Reverse a Word Using Recursion",
  description:
    "Write a recursive method reverse that returns the reverse of a word using recursion: reverse(s) equals reverse of s without its first character, followed by that first character. The base case is a word of length 0 or 1, which is already its own reverse. Read the word in main and print the reversed word. Do not use StringBuilder and do not use loops.\n\nInput Format:\nA single line containing one word without spaces.\n\nOutput Format:\nPrint one line: the reversed word.\n\nConstraints:\n1 <= word length <= 2000",
  difficulty: "easy",
  variant: "basic",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Recursion on Strings",
  sampleinput1: "recursion",
  sampleoutput1: "noisrucer",
  sampleinput2: "Java",
  sampleoutput2: "avaJ",
  input1: "a",
  output1: "a",
  input2: "abcde",
  output2: "edcba",
  input3: "RaceCar",
  output3: "raCecaR",
  inputconstrains: "1 <= word length <= 2000",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    static String reverse(String s) {
        if(s.length() <= 1) {
            return s;
        }
        return reverse(s.substring(1)) + s.charAt(0);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String word = sc.next();
        System.out.println(reverse(word));
    }
}`,
});

// 7 ── easy scenario ── Recursion Basics
codeQuestions.push({
  title: "Launch Countdown With Liftoff",
  description:
    "Mission control wants a launch countdown. Write a recursive method countdown(int n) that prints the numbers from n down to 1, one per line, and then prints Liftoff! as the final line. The method must call itself with n - 1, and the base case at 0 prints Liftoff! and stops. No loops allowed.\n\nInput Format:\nA single line containing one integer n, the countdown start.\n\nOutput Format:\nThe numbers n down to 1, each on its own line, then the line Liftoff!\n\nConstraints:\n1 <= n <= 100",
  difficulty: "easy",
  variant: "scenario",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Recursion Basics",
  sampleinput1: "3",
  sampleoutput1: "3\n2\n1\nLiftoff!",
  sampleinput2: "1",
  sampleoutput2: "1\nLiftoff!",
  input1: "5",
  output1: "5\n4\n3\n2\n1\nLiftoff!",
  input2: "10",
  output2: "10\n9\n8\n7\n6\n5\n4\n3\n2\n1\nLiftoff!",
  input3: "7",
  output3: "7\n6\n5\n4\n3\n2\n1\nLiftoff!",
  inputconstrains: "1 <= n <= 100",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    static void countdown(int n) {
        if(n == 0) {
            System.out.println("Liftoff!");
            return;
        }
        System.out.println(n);
        countdown(n - 1);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        countdown(n);
    }
}`,
});

// 8 ── easy scenario ── Recursion on Arrays
codeQuestions.push({
  title: "Calorie Total Across Days Recursively",
  description:
    "A health coach logs how many calories a camper burns each day. To practice recursion, the total must be computed by a recursive method that walks the array with an index and adds exactly one element per call: sumCalories(values, index) adds the element at index to the recursive sum of the rest, returning 0 when index reaches the array length. Read n, then the n calorie values, and print the recursive total.\n\nInput Format:\nA single line with n followed by n space-separated integers (calories burned each day).\n\nOutput Format:\nPrint one line: the total calories across the n days.\n\nConstraints:\n1 <= n <= 2000, 0 <= calorie <= 5000",
  difficulty: "easy",
  variant: "scenario",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Recursion on Arrays",
  sampleinput1: "3 200 350 450",
  sampleoutput1: "1000",
  sampleinput2: "1 5000",
  sampleoutput2: "5000",
  input1: "4 100 200 300 400",
  output1: "1000",
  input2: "5 0 0 0 0 0",
  output2: "0",
  input3: "6 2500 1000 750 1250 3000 1500",
  output3: "10000",
  inputconstrains: "1 <= n <= 2000, 0 <= calorie <= 5000",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    static long sumCalories(int[] values, int index) {
        if(index == values.length) {
            return 0;
        }
        return values[index] + sumCalories(values, index + 1);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] values = new int[n];
        for(int i = 0; i < n; i++) {
            values[i] = sc.nextInt();
        }
        System.out.println(sumCalories(values, 0));
    }
}`,
});

// 9 ── easy scenario ── Base and Recursive Case
codeQuestions.push({
  title: "Staircase Climbing Ways Recursively",
  description:
    "A hiker counts the ways to climb a staircase of n steps when each move is either 1 or 2 steps. Write a recursive method ways(n) where ways(n) = ways(n - 1) + ways(n - 2), with the base cases ways(0) = 1 and ways(1) = 1. Read n and print the number of distinct ways to reach the top.\n\nInput Format:\nA single line containing one integer n, the number of steps.\n\nOutput Format:\nPrint one line: the number of distinct ways to climb the staircase.\n\nConstraints:\n1 <= n <= 25",
  difficulty: "easy",
  variant: "scenario",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Base and Recursive Case",
  sampleinput1: "3",
  sampleoutput1: "3",
  sampleinput2: "4",
  sampleoutput2: "5",
  input1: "1",
  output1: "1",
  input2: "10",
  output2: "89",
  input3: "25",
  output3: "121393",
  inputconstrains: "1 <= n <= 25",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    static int ways(int n) {
        if(n == 0 || n == 1) {
            return 1;
        }
        return ways(n - 1) + ways(n - 2);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(ways(n));
    }
}`,
});

// 10 ── easy scenario ── Recursion Basics
codeQuestions.push({
  title: "Juice Bottle Song Verses Recursively",
  description:
    "At summer camp the evening song counts the juice bottles on the wall down to zero. Write a recursive method singVerse(int bottles) that, for each count k from n down to 1, prints one line: k bottles of juice on the wall, using the singular form 1 bottle of juice on the wall when k is 1. The method calls itself with bottles - 1 and stops at 0. No loops allowed.\n\nInput Format:\nA single line containing one integer n, the starting bottle count.\n\nOutput Format:\nOne line per count from n down to 1, with bottle singularized for the count 1.\n\nConstraints:\n1 <= n <= 99",
  difficulty: "easy",
  variant: "scenario",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Recursion Basics",
  sampleinput1: "3",
  sampleoutput1: "3 bottles of juice on the wall\n2 bottles of juice on the wall\n1 bottle of juice on the wall",
  sampleinput2: "1",
  sampleoutput2: "1 bottle of juice on the wall",
  input1: "2",
  output1: "2 bottles of juice on the wall\n1 bottle of juice on the wall",
  input2: "5",
  output2: "5 bottles of juice on the wall\n4 bottles of juice on the wall\n3 bottles of juice on the wall\n2 bottles of juice on the wall\n1 bottle of juice on the wall",
  input3: "10",
  output3: "10 bottles of juice on the wall\n9 bottles of juice on the wall\n8 bottles of juice on the wall\n7 bottles of juice on the wall\n6 bottles of juice on the wall\n5 bottles of juice on the wall\n4 bottles of juice on the wall\n3 bottles of juice on the wall\n2 bottles of juice on the wall\n1 bottle of juice on the wall",
  inputconstrains: "1 <= n <= 99",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    static void singVerse(int bottles) {
        if(bottles == 0) {
            return;
        }
        if(bottles == 1) {
            System.out.println("1 bottle of juice on the wall");
        } else {
            System.out.println(bottles + " bottles of juice on the wall");
        }
        singVerse(bottles - 1);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        singVerse(n);
    }
}`,
});

// 11 ── medium scenario ── Mathematical Recursion
codeQuestions.push({
  title: "GCD Using Euclid Recursion",
  description:
    "Two team leaders want to split a group of a members and b members into equal squads of the largest possible size. That size is the greatest common divisor. Implement it with Euclid's recursive rule: gcd(a, b) = gcd(b, a % b), stopping when b becomes 0. No loops allowed, the recursion must do all the work.\n\nInput Format:\nA single line with two space-separated integers a and b.\n\nOutput Format:\nPrint one line: the greatest common divisor of a and b.\n\nConstraints:\n1 <= a, b <= 1000000000",
  difficulty: "medium",
  variant: "scenario",
  maxscore: 20,
  lang: "java",
  topic: TOPIC,
  subtopic: "Mathematical Recursion",
  sampleinput1: "48 18",
  sampleoutput1: "6",
  sampleinput2: "100 75",
  sampleoutput2: "25",
  input1: "17 5",
  output1: "1",
  input2: "270 192",
  output2: "6",
  input3: "1000000000 999999999",
  output3: "1",
  inputconstrains: "1 <= a, b <= 1000000000",
  blacklist: "while(",
  whitelist: "static int",
  sourcecode: `import java.util.Scanner;

public class Main {
    static int gcd(int a, int b) {
        if(b == 0) {
            return a;
        }
        return gcd(b, a % b);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        System.out.println(gcd(a, b));
    }
}`,
});

// 12 ── medium scenario ── Base and Recursive Case
codeQuestions.push({
  title: "Binary Representation Using Recursion",
  description:
    "A satellite telemetry tool must show an equipment ID as a binary pattern. Write a recursive method printBinary(int n) that prints the binary form of n without leading zeros by recursing on n / 2 first and printing n % 2 after the call returns, so the most significant bit is printed first. No loops, and the built-in Integer.toBinaryString is banned.\n\nInput Format:\nA single line containing one integer n.\n\nOutput Format:\nPrint one line: the binary representation of n without leading zeros.\n\nConstraints:\n1 <= n <= 1000000000",
  difficulty: "medium",
  variant: "scenario",
  maxscore: 20,
  lang: "java",
  topic: TOPIC,
  subtopic: "Base and Recursive Case",
  sampleinput1: "5",
  sampleoutput1: "101",
  sampleinput2: "1",
  sampleoutput2: "1",
  input1: "255",
  output1: "11111111",
  input2: "1024",
  output2: "10000000000",
  input3: "1000000000",
  output3: "111011100110101100101000000000",
  inputconstrains: "1 <= n <= 1000000000",
  blacklist: "Integer.toBinaryString",
  whitelist: "static void",
  sourcecode: `import java.util.Scanner;

public class Main {
    static void printBinary(int n) {
        if(n > 1) {
            printBinary(n / 2);
        }
        System.out.print(n % 2);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        printBinary(n);
        System.out.println();
    }
}`,
});

// 13 ── medium scenario ── Recursion on Strings
codeQuestions.push({
  title: "Palindrome Check Using Recursion",
  description:
    "A word game app needs a palindrome detector for player words, ignoring upper and lower case. Write a recursive boolean method isPalindrome(word, left, right) that compares the characters at the two ends using Character.toLowerCase and recurses inward with left + 1 and right - 1. The base case is left >= right, which means the word checked out so far is a palindrome. Do not use StringBuilder and do not use loops.\n\nInput Format:\nA single line containing one word without spaces (letters only).\n\nOutput Format:\nPrint true if the word reads the same forwards and backwards ignoring case, otherwise print false.\n\nConstraints:\n1 <= word length <= 2000, letters only",
  difficulty: "medium",
  variant: "scenario",
  maxscore: 20,
  lang: "java",
  topic: TOPIC,
  subtopic: "Recursion on Strings",
  sampleinput1: "Level",
  sampleoutput1: "true",
  sampleinput2: "Java",
  sampleoutput2: "false",
  input1: "RaceCar",
  output1: "true",
  input2: "MadamImAdam",
  output2: "true",
  input3: "hello",
  output3: "false",
  inputconstrains: "1 <= word length <= 2000, letters only",
  blacklist: "StringBuilder",
  whitelist: "boolean",
  sourcecode: `import java.util.Scanner;

public class Main {
    static boolean isPalindrome(String word, int left, int right) {
        if(left >= right) {
            return true;
        }
        char a = Character.toLowerCase(word.charAt(left));
        char b = Character.toLowerCase(word.charAt(right));
        if(a != b) {
            return false;
        }
        return isPalindrome(word, left + 1, right - 1);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String word = sc.next();
        System.out.println(isPalindrome(word, 0, word.length() - 1));
    }
}`,
});

// 14 ── medium scenario ── Mathematical Recursion
codeQuestions.push({
  title: "Tower of Hanoi Move Count Recursively",
  description:
    "A puzzle shop ships the classic Tower of Hanoi and must print the exact minimum number of moves for n discs on the instruction sheet. Write a recursive method hanoiMoves(n) using the relation hanoiMoves(n) = 2 * hanoiMoves(n - 1) + 1 with the base case hanoiMoves(1) = 1. Math.pow is banned, build the count purely by recursion.\n\nInput Format:\nA single line containing one integer n, the number of discs.\n\nOutput Format:\nPrint one line: the minimum number of moves for n discs.\n\nConstraints:\n1 <= n <= 40",
  difficulty: "medium",
  variant: "scenario",
  maxscore: 20,
  lang: "java",
  topic: TOPIC,
  subtopic: "Mathematical Recursion",
  sampleinput1: "3",
  sampleoutput1: "7",
  sampleinput2: "1",
  sampleoutput2: "1",
  input1: "5",
  output1: "31",
  input2: "20",
  output2: "1048575",
  input3: "40",
  output3: "1099511627775",
  inputconstrains: "1 <= n <= 40",
  blacklist: "Math.pow",
  whitelist: "static long",
  sourcecode: `import java.util.Scanner;

public class Main {
    static long hanoiMoves(int discs) {
        if(discs == 1) {
            return 1;
        }
        return 2 * hanoiMoves(discs - 1) + 1;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(hanoiMoves(n));
    }
}`,
});

// 15 ── medium scenario ── Recursion on Arrays
codeQuestions.push({
  title: "Box Weight Total With Pure Recursion",
  description:
    "A donation drive receives n boxes whose weights must be totaled, and the volunteer code style guide bans every kind of loop for this exercise. Write a fully recursive program: a recursive method readAndSum(Scanner, remaining) reads one weight per call and returns that weight plus the recursive total of the rest, returning 0 when nothing remains. The entire program must contain no for and no while statements, so even reading the input is recursive.\n\nInput Format:\nA single line with n followed by n space-separated integers (box weights).\n\nOutput Format:\nPrint one line: the total weight of all boxes.\n\nConstraints:\n1 <= n <= 2000, 0 <= value <= 1000000",
  difficulty: "medium",
  variant: "scenario",
  maxscore: 20,
  lang: "java",
  topic: TOPIC,
  subtopic: "Recursion on Arrays",
  sampleinput1: "3 10 20 30",
  sampleoutput1: "60",
  sampleinput2: "1 999999",
  sampleoutput2: "999999",
  input1: "5 1 2 3 4 5",
  output1: "15",
  input2: "4 10 20 30 40",
  output2: "100",
  input3: "6 100 200 300 400 500 600",
  output3: "2100",
  inputconstrains: "1 <= n <= 2000, 0 <= value <= 1000000",
  blacklist: "for(, while(",
  whitelist: "static long",
  sourcecode: `import java.util.Scanner;

public class Main {
    static long readAndSum(Scanner sc, int remaining) {
        if(remaining == 0) {
            return 0;
        }
        return sc.nextLong() + readAndSum(sc, remaining - 1);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(readAndSum(sc, n));
    }
}`,
});

// 16 ── medium scenario ── Recursion on Arrays
codeQuestions.push({
  title: "Maximum Sensor Reading Recursively",
  description:
    "A storage scanner reports sensor readings one by one and the report must state the highest reading, found recursively. Write a method maxOf(values, index) that compares the element at index with the recursive maximum of the remaining elements and returns the larger one; the base case is the last index, which returns its own element. Read n, then the n readings into an array, and print the recursive maximum. Sorting helpers are banned.\n\nInput Format:\nA single line with n followed by n space-separated integers (sensor readings).\n\nOutput Format:\nPrint one line: the maximum reading.\n\nConstraints:\n1 <= n <= 2000, -1000000000 <= value <= 1000000000",
  difficulty: "medium",
  variant: "scenario",
  maxscore: 20,
  lang: "java",
  topic: TOPIC,
  subtopic: "Recursion on Arrays",
  sampleinput1: "5 3 9 1 7 4",
  sampleoutput1: "9",
  sampleinput2: "1 -5",
  sampleoutput2: "-5",
  input1: "6 -10 -3 -7 -1 -2 -8",
  output1: "-1",
  input2: "4 100 100 100 100",
  output2: "100",
  input3: "3 7 7 2",
  output3: "7",
  inputconstrains: "1 <= n <= 2000, -1000000000 <= value <= 1000000000",
  blacklist: "Arrays.sort",
  whitelist: "int[",
  sourcecode: `import java.util.Scanner;

public class Main {
    static int maxOf(int[] values, int index) {
        if(index == values.length - 1) {
            return values[index];
        }
        int restMax = maxOf(values, index + 1);
        if(values[index] > restMax) {
            return values[index];
        }
        return restMax;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] values = new int[n];
        for(int i = 0; i < n; i++) {
            values[i] = sc.nextInt();
        }
        System.out.println(maxOf(values, 0));
    }
}`,
});

// 17 ── hard scenario ── Recursion vs Iteration
codeQuestions.push({
  title: "Fast Exponentiation With Divide and Conquer",
  description:
    "A cryptography lab computes key values of the form base to the power exp, and auditors reject the naive loop that multiplies exp times because it is too slow to certify. Implement fast exponentiation with divide and conquer recursion: fastPower(base, exp) computes the half power fastPower(base, exp / 2), then squares it, multiplying once more by base when exp is odd. The base case is exp = 0 returning 1, and the method needs only about log2(exp) multiplications. Math.pow is banned.\n\nInput Format:\nA single line with two space-separated integers: base and exp.\n\nOutput Format:\nPrint one line: base to the power exp computed with the divide and conquer method.\n\nConstraints:\n-9 <= base <= 9, 0 <= exp <= 18",
  difficulty: "hard",
  variant: "scenario",
  maxscore: 30,
  lang: "java",
  topic: TOPIC,
  subtopic: "Recursion vs Iteration",
  sampleinput1: "2 10",
  sampleoutput1: "1024",
  sampleinput2: "3 5",
  sampleoutput2: "243",
  input1: "5 0",
  output1: "1",
  input2: "9 18",
  output2: "150094635296999121",
  input3: "-2 11",
  output3: "-2048",
  inputconstrains: "-9 <= base <= 9, 0 <= exp <= 18",
  blacklist: "Math.pow",
  whitelist: "static long",
  sourcecode: `import java.util.Scanner;

public class Main {
    static long fastPower(long base, int exp) {
        if(exp == 0) {
            return 1;
        }
        long half = fastPower(base, exp / 2);
        if(exp % 2 == 0) {
            return half * half;
        }
        return half * half * base;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long base = sc.nextLong();
        int exp = sc.nextInt();
        System.out.println(fastPower(base, exp));
    }
}`,
});

// 18 ── hard scenario ── Recursion on Arrays
codeQuestions.push({
  title: "Binary Search on a Shelf Using Recursion",
  description:
    "A library search terminal must locate a book code on a shelf whose codes are sorted in strictly increasing order. Implement binary search as pure recursion: a recursive readValues(Scanner, index, n) method fills the array one element per call, and a recursive binarySearch(low, high, key) halves the range each call, returning the 0-based index where the key was found or -1 when it is absent. The program must contain no for and no while statements, so reading the input is recursive too.\n\nInput Format:\nA single line with n followed by n strictly increasing sorted integers followed by the key to find.\n\nOutput Format:\nPrint one line: the 0-based index of the key, or -1 if it is not on the shelf.\n\nConstraints:\n1 <= n <= 1000, -1000000000 <= value <= 1000000000",
  difficulty: "hard",
  variant: "scenario",
  maxscore: 30,
  lang: "java",
  topic: TOPIC,
  subtopic: "Recursion on Arrays",
  sampleinput1: "5 10 20 30 40 50 30",
  sampleoutput1: "2",
  sampleinput2: "5 10 20 30 40 50 35",
  sampleoutput2: "-1",
  input1: "1 42 42",
  output1: "0",
  input2: "6 2 4 6 8 10 12 12",
  output2: "5",
  input3: "8 1 2 3 4 5 6 7 8 8",
  output3: "7",
  inputconstrains: "1 <= n <= 1000, -1000000000 <= value <= 1000000000",
  blacklist: "for(, while(",
  whitelist: "int[",
  sourcecode: `import java.util.Scanner;

public class Main {
    static int[] shelf = new int[1005];

    static void readValues(Scanner sc, int index, int n) {
        if(index == n) {
            return;
        }
        shelf[index] = sc.nextInt();
        readValues(sc, index + 1, n);
    }

    static int binarySearch(int low, int high, int key) {
        if(low > high) {
            return -1;
        }
        int mid = low + (high - low) / 2;
        if(shelf[mid] == key) {
            return mid;
        }
        if(shelf[mid] < key) {
            return binarySearch(mid + 1, high, key);
        }
        return binarySearch(low, mid - 1, key);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        readValues(sc, 0, n);
        int key = sc.nextInt();
        System.out.println(binarySearch(0, n - 1, key));
    }
}`,
});

// 19 ── hard scenario ── Recursion on Strings
codeQuestions.push({
  title: "Speak Digits Aloud Using Recursion",
  description:
    "A voice assistant reads account numbers aloud digit by digit. Write a recursive method speakDigits(long n) that prints the English word for each digit of n from the most significant digit to the least significant digit, separated by single spaces, using a String array holding zero to nine. The recursion divides n by 10 first, prints the leading digits, then prints the word for the last digit on the way back, which is exactly the call-stack unwinding order. For example 507 must be spoken as five zero seven, and 0 is spoken as zero. Maps are banned; recursion must drive the traversal.\n\nInput Format:\nA single line containing one non-negative integer n.\n\nOutput Format:\nPrint one line: the digit words of n joined by single spaces.\n\nConstraints:\n0 <= n <= 999999999999999",
  difficulty: "hard",
  variant: "scenario",
  maxscore: 30,
  lang: "java",
  topic: TOPIC,
  subtopic: "Recursion on Strings",
  sampleinput1: "507",
  sampleoutput1: "five zero seven",
  sampleinput2: "0",
  sampleoutput2: "zero",
  input1: "9",
  output1: "nine",
  input2: "12345",
  output2: "one two three four five",
  input3: "1000000",
  output3: "one zero zero zero zero zero zero",
  inputconstrains: "0 <= n <= 999999999999999",
  blacklist: "Map",
  whitelist: "String[",
  sourcecode: `import java.util.Scanner;

public class Main {
    static String[] digitWords = {"zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"};

    static void speakDigits(long n) {
        if(n >= 10) {
            speakDigits(n / 10);
            System.out.print(" " + digitWords[(int)(n % 10)]);
        } else {
            System.out.print(digitWords[(int) n]);
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long n = sc.nextLong();
        speakDigits(n);
        System.out.println();
    }
}`,
});

// 20 ── hard scenario ── Recursion vs Iteration
codeQuestions.push({
  title: "Grid Path Counting With Recursion",
  description:
    "A delivery robot starts in the top-left cell of an m by n grid and must reach the bottom-right cell, moving only one cell right or one cell down per step. Write a recursive method countPaths(rows, cols) that returns the number of distinct routes using countPaths(rows - 1, cols) + countPaths(rows, cols - 1) and returning 1 when only a single row or a single column remains, since there is then exactly one straight path. Built-in math helpers are banned; let the recursion do the counting.\n\nInput Format:\nA single line with two space-separated integers m and n, the grid rows and columns.\n\nOutput Format:\nPrint one line: the number of distinct right/down paths from the top-left to the bottom-right cell.\n\nConstraints:\n1 <= m, n <= 13, m + n <= 14",
  difficulty: "hard",
  variant: "scenario",
  maxscore: 30,
  lang: "java",
  topic: TOPIC,
  subtopic: "Recursion vs Iteration",
  sampleinput1: "2 2",
  sampleoutput1: "2",
  sampleinput2: "3 3",
  sampleoutput2: "6",
  input1: "1 5",
  output1: "1",
  input2: "4 4",
  output2: "20",
  input3: "7 7",
  output3: "924",
  inputconstrains: "1 <= m, n <= 13, m + n <= 14",
  blacklist: "Math",
  whitelist: "static long",
  sourcecode: `import java.util.Scanner;

public class Main {
    static long countPaths(int rows, int cols) {
        if(rows == 1 || cols == 1) {
            return 1;
        }
        return countPaths(rows - 1, cols) + countPaths(rows, cols - 1);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int m = sc.nextInt();
        int n = sc.nextInt();
        System.out.println(countPaths(m, n));
    }
}`,
});

/* ─────────────────────────────── MCQ QUESTIONS ─────────────────────────────── */

const mcqQuestions = [];

function mcq(q) {
  mcqQuestions.push({
    title: q.title,
    description: q.description,
    difficulty: q.difficulty,
    topic: TOPIC,
    subtopic: q.subtopic,
    Option1: q.Option1,
    Option2: q.Option2,
    Option3: q.Option3,
    Option4: q.Option4,
    CorrectOption: q.CorrectOption,
    iscodesnippet: q.iscodesnippet === true,
    codesnippet: q.codesnippet ?? null,
    snippetLang: q.iscodesnippet === true ? "java" : null,
  });
}

// E1 ── easy ── Recursion Basics
mcq({
  title: "Definition of Recursion",
  description: "In Java, a method is described as recursive when:",
  difficulty: "easy",
  subtopic: "Recursion Basics",
  Option1: "A method calls itself to solve a smaller version of the same problem",
  Option2: "A class extends another class and overrides its methods",
  Option3: "A loop repeats its body until a condition becomes false",
  Option4: "Two objects hold references to each other",
  CorrectOption: 1,
});

// E2 ── easy ── Base and Recursive Case
mcq({
  title: "Role of the Base Case",
  description: "In a recursive method, the base case is best described as:",
  difficulty: "easy",
  subtopic: "Base and Recursive Case",
  Option1: "The statement where the method calls itself with a smaller input",
  Option2: "The condition that stops the recursion and returns a value directly",
  Option3: "The variable that counts how many times the method has been called",
  Option4: "The return type chosen for the recursive method",
  CorrectOption: 2,
});

// E3 ── easy ── Recursion Basics
mcq({
  title: "Call Stack Behavior During Recursion",
  description: "Each time a recursive method calls itself in Java, what does the runtime do?",
  difficulty: "easy",
  subtopic: "Recursion Basics",
  Option1: "It overwrites the previous call's variables inside the same frame",
  Option2: "It stores all active calls in one shared memory location",
  Option3: "It pushes a new frame onto the call stack holding that call's own parameters and local variables",
  Option4: "It copies the method bytecode into a new class at runtime",
  CorrectOption: 3,
});

// E4 ── easy ── Recursion vs Iteration
mcq({
  title: "Rewriting Recursion as Iteration",
  description: "Which statement about recursion and iteration is TRUE?",
  difficulty: "easy",
  subtopic: "Recursion vs Iteration",
  Option1: "Any recursive solution can be rewritten with loops, though some cases then need an explicit stack for the pending work",
  Option2: "Recursion can solve problems that no loop-based program can ever solve in any form",
  Option3: "A loop can never reproduce the exact output of any recursive method",
  Option4: "Converting recursion to iteration always makes the program shorter and clearer",
  CorrectOption: 1,
});

// E5 ── easy ── Mathematical Recursion
mcq({
  title: "Factorial Base Case",
  description: "A recursive factorial uses fact(n) = n * fact(n - 1). Which base case makes the method correct?",
  difficulty: "easy",
  subtopic: "Mathematical Recursion",
  Option1: "When n is 0, return 0 and stop the recursion",
  Option2: "When n is 0 or 1, return 1 without calling fact again",
  Option3: "When n becomes negative, add 1 until it reaches zero again",
  Option4: "Factorial recursion needs no base case because n decreases by itself",
  CorrectOption: 2,
});

// E6 ── easy ── Mathematical Recursion
mcq({
  title: "Naming the Recursive Case",
  description: "In sum(n) = n + sum(n - 1) with sum(0) = 0, what is the part n + sum(n - 1) called?",
  difficulty: "easy",
  subtopic: "Mathematical Recursion",
  Option1: "The base case",
  Option2: "The terminal case",
  Option3: "The recursive case, which shrinks the problem toward the base case",
  Option4: "The constructor chain",
  CorrectOption: 3,
});

// E7 ── easy ── Recursion on Strings
mcq({
  title: "String Immutability During Recursive Calls",
  description: "A recursive method receives a String s and calls itself with s.substring(1). What happens to the original String object?",
  difficulty: "easy",
  subtopic: "Recursion on Strings",
  Option1: "Nothing changes in it, because Strings are immutable and substring returns a new String",
  Option2: "Its first character is permanently deleted from the original object",
  Option3: "The original String slowly becomes an empty string as calls proceed",
  Option4: "Java automatically converts the String into a char array to make room",
  CorrectOption: 1,
});

// E8 ── easy ── Recursion on Arrays
mcq({
  title: "Recursive Array Sum Design",
  description: "You must write a method that returns the sum of an int array recursively. Which design is the standard recursive approach?",
  difficulty: "easy",
  subtopic: "Recursion on Arrays",
  Option1: "Sort the array recursively first, then return its last element",
  Option2: "Pass the array plus an index, and combine the element at that index with the recursive sum of the remaining elements",
  Option3: "Convert the array to a String and add the character codes of its digits",
  Option4: "Create a new array half the size at every step until it is empty, never inspecting any element",
  CorrectOption: 2,
});

// E9 ── easy ── Base and Recursive Case
mcq({
  title: "Effect of a Missing Base Case",
  description: "A recursive method has no base case and calls itself for every input. What is the most likely runtime outcome?",
  difficulty: "easy",
  subtopic: "Base and Recursive Case",
  Option1: "The compiler rejects the program with a syntax error",
  Option2: "The method returns null after about one hundred calls",
  Option3: "The JVM detects the pattern and inserts a base case automatically",
  Option4: "The calls keep pushing stack frames until a StackOverflowError is thrown",
  CorrectOption: 4,
});

// E10 ── easy ── Recursion vs Iteration
mcq({
  title: "Memory Cost of Recursion Versus a Loop",
  description: "Compared to a simple loop that does the same work, recursion in Java usually:",
  difficulty: "easy",
  subtopic: "Recursion vs Iteration",
  Option1: "Runs faster because recursion avoids all loop bookkeeping",
  Option2: "Uses more memory because every call adds a new stack frame",
  Option3: "Avoids method call overhead completely",
  Option4: "Is silently converted into a loop by the compiler",
  CorrectOption: 2,
});

// M1 ── medium ── Base and Recursive Case ── snippet
mcq({
  title: "Trace Print Before and After the Recursive Call",
  description: "The method prints one value before the recursive call and another after it returns. What is the exact output of running main?",
  difficulty: "medium",
  subtopic: "Base and Recursive Case",
  iscodesnippet: true,
  codesnippet: `public class Main {
    static void fun(int n) {
        if(n == 0) {
            return;
        }
        System.out.print(n + " ");
        fun(n - 1);
        System.out.print(n + " ");
    }

    public static void main(String[] args) {
        fun(3);
    }
}`,
  Option1: "3 2 1 1 2 3",
  Option2: "3 2 1",
  Option3: "1 2 3 3 2 1",
  Option4: "3 2 1 3 2 1",
  CorrectOption: 1,
});

// M2 ── medium ── Base and Recursive Case ── snippet
mcq({
  title: "Missing Base Case Program Behavior",
  description: "Study the program below, which has no base case. What happens when it runs?",
  difficulty: "medium",
  subtopic: "Base and Recursive Case",
  iscodesnippet: true,
  codesnippet: `public class Main {
    static int mystery(int n) {
        return n + mystery(n - 1);
    }

    public static void main(String[] args) {
        System.out.println(mystery(5));
    }
}`,
  Option1: "It prints 15 and exits normally",
  Option2: "It fails to compile because a recursive method cannot return an int",
  Option3: "It compiles but throws StackOverflowError at runtime",
  Option4: "It prints 5 and exits normally",
  CorrectOption: 3,
});

// M3 ── medium ── Recursion vs Iteration
mcq({
  title: "Naive Recursive Fibonacci Complexity",
  description: "The naive recursive Fibonacci fib(n) = fib(n - 1) + fib(n - 2) recomputes the same subproblems over and over. What is its approximate time complexity?",
  difficulty: "medium",
  subtopic: "Recursion vs Iteration",
  Option1: "O(n log n)",
  Option2: "O(2^n), exponential, because the same subproblems are recomputed again and again",
  Option3: "O(n^2)",
  Option4: "O(log n)",
  CorrectOption: 2,
});

// M4 ── medium ── Recursion Basics ── snippet
mcq({
  title: "Mutual Recursion Parity Output",
  description: "The two methods below call each other (mutual recursion). What does the program print?",
  difficulty: "medium",
  subtopic: "Recursion Basics",
  iscodesnippet: true,
  codesnippet: `public class Main {
    static boolean isEven(int n) {
        if(n == 0) {
            return true;
        }
        return isOdd(n - 1);
    }

    static boolean isOdd(int n) {
        if(n == 0) {
            return false;
        }
        return isEven(n - 1);
    }

    public static void main(String[] args) {
        System.out.println(isEven(7));
        System.out.println(isOdd(4));
    }
}`,
  Option1: "true on the first line and false on the second line",
  Option2: "false on the first line and true on the second line",
  Option3: "true on the first line and true on the second line",
  Option4: "false on the first line and false on the second line",
  CorrectOption: 4,
});

// M5 ── medium ── Recursion on Strings ── snippet
mcq({
  title: "Recursive String Print Order",
  description: "The recursive method below walks to the end of the string first and prints each character only after the call returns. What does main print?",
  difficulty: "medium",
  subtopic: "Recursion on Strings",
  iscodesnippet: true,
  codesnippet: `public class Main {
    static void shout(String s) {
        if(s.length() == 0) {
            return;
        }
        shout(s.substring(1));
        System.out.print(s.charAt(0));
    }

    public static void main(String[] args) {
        shout("java");
    }
}`,
  Option1: "avaj",
  Option2: "java",
  Option3: "ajav",
  Option4: "jaav",
  CorrectOption: 1,
});

// M6 ── medium ── Recursion vs Iteration
mcq({
  title: "Tail Recursion Definition",
  description: "A recursive method is said to use tail recursion when:",
  difficulty: "medium",
  subtopic: "Recursion vs Iteration",
  Option1: "The method body contains at least two recursive calls",
  Option2: "The recursion is written inside a loop",
  Option3: "The recursive call is the very last operation, with no pending computation after it returns",
  Option4: "The base case is placed at the bottom of the method body",
  CorrectOption: 3,
});

// H1 ── hard ── Recursion vs Iteration ── snippet
mcq({
  title: "Unwinding With Return Values",
  description: "The method below accumulates a value on the way back up the call stack and prints during unwinding. What is the exact output of running main?",
  difficulty: "hard",
  subtopic: "Recursion vs Iteration",
  iscodesnippet: true,
  codesnippet: `public class Main {
    static int grow(int n) {
        if(n >= 3) {
            return n;
        }
        int r = grow(n + 1) + n;
        System.out.print(r + " ");
        return r;
    }

    public static void main(String[] args) {
        System.out.println(grow(1));
    }
}`,
  Option1: "6 6 5",
  Option2: "5 6 6",
  Option3: "2 5 6 6",
  Option4: "6 5 6",
  CorrectOption: 2,
});

// H2 ── hard ── Mathematical Recursion ── snippet
mcq({
  title: "Counting Leaves of a Recursive Call Tree",
  description: "Each call of split makes two recursive calls. How many * characters does main print in total?",
  difficulty: "hard",
  subtopic: "Mathematical Recursion",
  iscodesnippet: true,
  codesnippet: `public class Main {
    static void split(int n) {
        if(n == 0) {
            System.out.print("*");
            return;
        }
        split(n - 1);
        split(n - 1);
    }

    public static void main(String[] args) {
        split(3);
    }
}`,
  Option1: "8",
  Option2: "6",
  Option3: "9",
  Option4: "16",
  CorrectOption: 1,
});

// H3 ── hard ── Base and Recursive Case
mcq({
  title: "Cost of substring-Based String Recursion",
  description: "A student writes reverse(s) = reverse(s.substring(1)) + s.charAt(0) to reverse a string of length n recursively. Which statement about this design is correct?",
  difficulty: "hard",
  subtopic: "Base and Recursive Case",
  Option1: "It fails to compile because substring cannot be used inside a recursive call",
  Option2: "It modifies the original String in place, so it needs almost no extra memory",
  Option3: "It works, but every call builds a new String nearly as long as the original, so time and extra memory grow with the length",
  Option4: "It is always faster than any loop-based reversal regardless of the input size",
  CorrectOption: 3,
});

// H4 ── hard ── Recursion on Strings ── snippet
mcq({
  title: "Mirrored Recursive String Building",
  description: "The recursive method below duplicates the result of the smaller call on both sides of the current digit. What does main print?",
  difficulty: "hard",
  subtopic: "Recursion on Strings",
  iscodesnippet: true,
  codesnippet: `public class Main {
    static String build(int n) {
        if(n == 0) {
            return "";
        }
        String rest = build(n - 1);
        return rest + n + rest;
    }

    public static void main(String[] args) {
        System.out.println(build(3));
    }
}`,
  Option1: "12321",
  Option2: "1213121",
  Option3: "1122113",
  Option4: "123123",
  CorrectOption: 2,
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
  if (q.difficulty === "easy" && (q.blacklist || q.whitelist)) problems.push(`${q.title}: easy must have empty checks`);
  for (const kw of q.blacklist.split(",").map((s) => s.trim()).filter(Boolean)) {
    if (q.sourcecode.includes(kw)) problems.push(`${q.title}: blacklisted "${kw}" present`);
  }
  for (const kw of q.whitelist.split(",").map((s) => s.trim()).filter(Boolean)) {
    if (!q.sourcecode.includes(kw)) problems.push(`${q.title}: whitelisted "${kw}" missing`);
  }
  for (const f of ["sampleinput1", "sampleoutput1", "sampleinput2", "sampleoutput2", "input1", "output1", "input2", "output2", "input3", "output3"]) {
    if (typeof q[f] !== "string" || q[f].length === 0) problems.push(`${q.title}: empty field ${f}`);
  }
}
if (cd.easy !== 10 || cd.medium !== 6 || cd.hard !== 4) problems.push(`code difficulty ${JSON.stringify(cd)}`);
if (cv.basic !== 6 || cv.scenario !== 4) problems.push(`easy variant ${JSON.stringify(cv)}`);
for (const s of SUBTOPICS) {
  if (!subCount[s]) problems.push(`code subtopic never used: ${s}`);
}

const md = { easy: 0, medium: 0, hard: 0 };
let snippets = 0;
const mtitles = new Set();
const msub = {};
for (const q of mcqQuestions) {
  md[q.difficulty]++;
  if (mtitles.has(q.title)) problems.push(`dup mcq title ${q.title}`);
  mtitles.add(q.title);
  msub[q.subtopic] = (msub[q.subtopic] || 0) + 1;
  if (q.iscodesnippet) snippets++;
  const opts = [q.Option1, q.Option2, q.Option3, q.Option4];
  if (new Set(opts).size !== 4) problems.push(`${q.title}: options not distinct`);
  if (opts.some((o) => !o || o.length === 0)) problems.push(`${q.title}: empty option`);
  const lower = opts.map((o) => o.toLowerCase());
  if (lower.some((o) => o.includes("all of the above") || o.includes("none of the above"))) {
    problems.push(`${q.title}: all/none of the above`);
  }
  if (q.codesnippet && q.codesnippet.includes("\\")) problems.push(`${q.title}: backslash in snippet`);
  if (!q.iscodesnippet && q.codesnippet) problems.push(`${q.title}: codesnippet set but iscodesnippet false`);
  if (![1, 2, 3, 4].includes(q.CorrectOption)) problems.push(`${q.title}: bad CorrectOption`);
}
if (md.easy !== 10 || md.medium !== 6 || md.hard !== 4) problems.push(`mcq difficulty ${JSON.stringify(md)}`);
if (snippets < 6) problems.push(`only ${snippets} snippets`);
for (const s of SUBTOPICS) {
  if (!msub[s]) problems.push(`mcq subtopic never used: ${s}`);
}

if (problems.length) {
  console.error("SELF-CHECK FAILED:");
  for (const p of problems) console.error("  - " + p);
  process.exit(1);
}

/* ─────────────────────────────── WRITE PART FILES ─────────────────────────────── */

const codeP1 = { day: 6, topics: [{ name: TOPIC, subtopics: SUBTOPICS }], questions: codeQuestions.slice(0, 10) };
const codeP2 = { questions: codeQuestions.slice(10) };
const mcqP1 = { questions: mcqQuestions.slice(0, 10) };
const mcqP2 = { questions: mcqQuestions.slice(10) };

fs.writeFileSync(path.join(DIR, "day-06.code.p1.json"), JSON.stringify(codeP1, null, 2) + "\n");
fs.writeFileSync(path.join(DIR, "day-06.code.p2.json"), JSON.stringify(codeP2, null, 2) + "\n");
fs.writeFileSync(path.join(DIR, "day-06.mcq.p1.json"), JSON.stringify(mcqP1, null, 2) + "\n");
fs.writeFileSync(path.join(DIR, "day-06.mcq.p2.json"), JSON.stringify(mcqP2, null, 2) + "\n");

console.log("SELF-CHECK OK");
console.log(`code: easy=${cd.easy} (basic=${cv.basic}, scenario=${cv.scenario}) medium=${cd.medium} hard=${cd.hard}`);
console.log(`code subtopics: ${JSON.stringify(subCount)}`);
console.log(`mcq: easy=${md.easy} medium=${md.medium} hard=${md.hard} snippets=${snippets}`);
console.log(`mcq subtopics: ${JSON.stringify(msub)}`);
console.log("part files written to", DIR);
