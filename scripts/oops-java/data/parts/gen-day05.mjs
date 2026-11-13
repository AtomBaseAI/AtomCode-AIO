/**
 * Day 5 generator — "OOPS using JAVA" — Functions and Modular Programming
 * Writes the 4 part files consumed by merge-parts.ts.
 */
import fs from "node:fs";
import path from "node:path";

const DIR = "/home/z/my-project/scripts/oops-java/data/parts";
fs.mkdirSync(DIR, { recursive: true });

const TOPIC = "Functions and Modular Programming";
const SUBTOPICS = [
  "Method Declaration and Definition",
  "Parameter Passing",
  "Call by Value Semantics",
  "Return Values",
  "Static Methods",
  "Modular Design",
];

/* ─────────────────────────────── CODE QUESTIONS ─────────────────────────────── */

const codeQuestions = [];

// 1 ── easy basic ── Return Values
codeQuestions.push({
  title: "Circle Area Using a Method",
  description:
    "Write a program that reads the radius of a circle and uses a static method to compute and return its area. The method must take the radius as a parameter and return the area as a double. Read the radius in main, call the method, and print the returned value.\n\nInput Format:\nA single line containing one number, the radius r.\n\nOutput Format:\nPrint the area rounded to exactly 2 decimal places.\n\nConstraints:\n0 < r <= 10000",
  difficulty: "easy",
  variant: "basic",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Return Values",
  sampleinput1: "2",
  sampleoutput1: "12.57",
  sampleinput2: "5",
  sampleoutput2: "78.54",
  input1: "0.5",
  output1: "0.79",
  input2: "10",
  output2: "314.16",
  input3: "7.5",
  output3: "176.71",
  inputconstrains: "0 < r <= 10000",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    static double circleArea(double radius) {
        return Math.PI * radius * radius;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double r = sc.nextDouble();
        double area = circleArea(r);
        System.out.printf("%.2f%n", area);
    }
}`,
});

// 2 ── easy basic ── Method Declaration and Definition
codeQuestions.push({
  title: "Maximum of Three Using a Method",
  description:
    "Write a program with a static method maxOfThree that receives three integers as parameters and returns the largest of them. Read the three integers in main, call the method, and print the returned value.\n\nInput Format:\nA single line with three space-separated integers a, b and c.\n\nOutput Format:\nPrint one line: the largest of the three values.\n\nConstraints:\n-100000 <= a, b, c <= 100000",
  difficulty: "easy",
  variant: "basic",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Method Declaration and Definition",
  sampleinput1: "3 7 5",
  sampleoutput1: "7",
  sampleinput2: "10 4 8",
  sampleoutput2: "10",
  input1: "-5 -2 -9",
  output1: "-2",
  input2: "1 1 1",
  output2: "1",
  input3: "100 200 150",
  output3: "200",
  inputconstrains: "-100000 <= a, b, c <= 100000",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    static int maxOfThree(int a, int b, int c) {
        int m = a;
        if(b > m) {
            m = b;
        }
        if(c > m) {
            m = c;
        }
        return m;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        int c = sc.nextInt();
        System.out.println(maxOfThree(a, b, c));
    }
}`,
});

// 3 ── easy basic ── Static Methods
codeQuestions.push({
  title: "Prime Check Using a Method",
  description:
    "Write a program with a static boolean method isPrime that takes an integer parameter and returns true when the number is prime and false otherwise. Read n in main, call the method, and print the returned boolean (lowercase true or false).\n\nInput Format:\nA single line containing one integer n.\n\nOutput Format:\nPrint true if n is prime, otherwise false.\n\nConstraints:\n0 <= n <= 1000000000",
  difficulty: "easy",
  variant: "basic",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Static Methods",
  sampleinput1: "7",
  sampleoutput1: "true",
  sampleinput2: "1",
  sampleoutput2: "false",
  input1: "25",
  output1: "false",
  input2: "97",
  output2: "true",
  input3: "999983",
  output3: "true",
  inputconstrains: "0 <= n <= 1000000000",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    static boolean isPrime(int n) {
        if(n < 2) {
            return false;
        }
        for(long i = 2; i * i <= n; i++) {
            if(n % i == 0) {
                return false;
            }
        }
        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(isPrime(n));
    }
}`,
});

// 4 ── easy basic ── Parameter Passing
codeQuestions.push({
  title: "Celsius to Fahrenheit Converter Method",
  description:
    "Write a program with a static method toFahrenheit that receives a temperature in Celsius as a parameter and returns the temperature in Fahrenheit using the formula F = C * 9.0 / 5.0 + 32.0. Read the Celsius value in main, pass it to the method, and print the returned value rounded to 2 decimal places.\n\nInput Format:\nA single line containing one number, the temperature in Celsius.\n\nOutput Format:\nPrint the Fahrenheit value rounded to exactly 2 decimal places.\n\nConstraints:\n-100 <= c <= 200",
  difficulty: "easy",
  variant: "basic",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Parameter Passing",
  sampleinput1: "0",
  sampleoutput1: "32.00",
  sampleinput2: "100",
  sampleoutput2: "212.00",
  input1: "37",
  output1: "98.60",
  input2: "-40",
  output2: "-40.00",
  input3: "36.6",
  output3: "97.88",
  inputconstrains: "-100 <= c <= 200",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    static double toFahrenheit(double celsius) {
        return celsius * 9.0 / 5.0 + 32.0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double c = sc.nextDouble();
        System.out.printf("%.2f%n", toFahrenheit(c));
    }
}`,
});

// 5 ── easy basic ── Parameter Passing
codeQuestions.push({
  title: "Count Vowels in a Word Using a Method",
  description:
    "Write a program with a static method countVowels that receives a word as a parameter and returns how many vowels (a, e, i, o, u in lower or upper case) the word contains. Read the word in main, call the method, and print the returned count.\n\nInput Format:\nA single line containing one word without spaces.\n\nOutput Format:\nPrint one line: the number of vowels in the word.\n\nConstraints:\n1 <= length of word <= 1000, letters only",
  difficulty: "easy",
  variant: "basic",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Parameter Passing",
  sampleinput1: "education",
  sampleoutput1: "5",
  sampleinput2: "Rhythm",
  sampleoutput2: "0",
  input1: "Java",
  output1: "2",
  input2: "PROGRAMMING",
  output2: "3",
  input3: "AEIOU",
  output3: "5",
  inputconstrains: "1 <= word length <= 1000, letters only",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    static int countVowels(String word) {
        int count = 0;
        for(int i = 0; i < word.length(); i++) {
            char ch = word.charAt(i);
            if(ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u'
                    || ch == 'A' || ch == 'E' || ch == 'I' || ch == 'O' || ch == 'U') {
                count++;
            }
        }
        return count;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String word = sc.next();
        System.out.println(countVowels(word));
    }
}`,
});

// 6 ── easy basic ── Call by Value Semantics
codeQuestions.push({
  title: "Swap Attempt and Call by Value",
  description:
    "Java always passes arguments by value. Write a program that demonstrates this: a static method attemptSwap receives two integers as parameters, swaps its local copies, and prints them in the form Inside method: X Y. After the call, main prints the original variables in the form Original values: A B. The originals must remain unchanged because the method only swapped copies.\n\nInput Format:\nA single line with two space-separated integers a and b.\n\nOutput Format:\nLine 1: Inside method: Y X (the swapped copies inside the method)\nLine 2: Original values: a b (the unchanged originals in main)\n\nConstraints:\n-1000000 <= a, b <= 1000000",
  difficulty: "easy",
  variant: "basic",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Call by Value Semantics",
  sampleinput1: "10 20",
  sampleoutput1: "Inside method: 20 10\nOriginal values: 10 20",
  sampleinput2: "5 5",
  sampleoutput2: "Inside method: 5 5\nOriginal values: 5 5",
  input1: "-3 8",
  output1: "Inside method: 8 -3\nOriginal values: -3 8",
  input2: "100 7",
  output2: "Inside method: 7 100\nOriginal values: 100 7",
  input3: "0 999",
  output3: "Inside method: 999 0\nOriginal values: 0 999",
  inputconstrains: "-1000000 <= a, b <= 1000000",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    static void attemptSwap(int x, int y) {
        int temp = x;
        x = y;
        y = temp;
        System.out.println("Inside method: " + x + " " + y);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        attemptSwap(a, b);
        System.out.println("Original values: " + a + " " + b);
    }
}`,
});

// 7 ── easy scenario ── Parameter Passing
codeQuestions.push({
  title: "Invoice Line Total Method",
  description:
    "A shopkeeper bills items using a small program. Write a static method lineTotal that receives the quantity, the unit price and a boolean discount flag as parameters and returns the line total as a double. The total is quantity times unit price; when the discount flag is true, reduce the total by 10 percent. Read the inputs in main, build the boolean flag, and print the returned total rounded to 2 decimal places.\n\nInput Format:\nA single line with three space-separated values: quantity (integer), unit price (number) and discount flag (1 for discount applied, 0 for no discount).\n\nOutput Format:\nPrint the line total rounded to exactly 2 decimal places.\n\nConstraints:\n1 <= quantity <= 10000, 0 < unit price <= 100000, flag is 0 or 1",
  difficulty: "easy",
  variant: "scenario",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Parameter Passing",
  sampleinput1: "4 25.00 0",
  sampleoutput1: "100.00",
  sampleinput2: "3 10.50 1",
  sampleoutput2: "28.35",
  input1: "10 99.99 1",
  output1: "899.91",
  input2: "1 0.99 0",
  output2: "0.99",
  input3: "6 12.50 1",
  output3: "67.50",
  inputconstrains: "1 <= quantity <= 10000, 0 < unit price <= 100000, flag is 0 or 1",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    static double lineTotal(int qty, double unitPrice, boolean discount) {
        double total = qty * unitPrice;
        if(discount) {
            total = total * 0.90;
        }
        return total;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int qty = sc.nextInt();
        double price = sc.nextDouble();
        int flag = sc.nextInt();
        boolean discount = (flag == 1);
        System.out.printf("%.2f%n", lineTotal(qty, price, discount));
    }
}`,
});

// 8 ── easy scenario ── Return Values
codeQuestions.push({
  title: "Grade Point Mapper Method",
  description:
    "A university converts marks into grade points with a static method gradePoint that receives the marks and returns an int using this ladder: 90 or more returns 10, 80 to 89 returns 9, 70 to 79 returns 8, 60 to 69 returns 7, 50 to 59 returns 6, and below 50 returns 0. Read the marks in main, call the method, and print the returned grade point.\n\nInput Format:\nA single line containing one integer marks.\n\nOutput Format:\nPrint one line: the grade point.\n\nConstraints:\n0 <= marks <= 100",
  difficulty: "easy",
  variant: "scenario",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Return Values",
  sampleinput1: "95",
  sampleoutput1: "10",
  sampleinput2: "84",
  sampleoutput2: "9",
  input1: "70",
  output1: "8",
  input2: "59",
  output2: "6",
  input3: "42",
  output3: "0",
  inputconstrains: "0 <= marks <= 100",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    static int gradePoint(int marks) {
        if(marks >= 90) {
            return 10;
        } else if(marks >= 80) {
            return 9;
        } else if(marks >= 70) {
            return 8;
        } else if(marks >= 60) {
            return 7;
        } else if(marks >= 50) {
            return 6;
        }
        return 0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int marks = sc.nextInt();
        System.out.println(gradePoint(marks));
    }
}`,
});

// 9 ── easy scenario ── Parameter Passing
codeQuestions.push({
  title: "Tip Calculator Method",
  description:
    "A restaurant app computes tips with a static method tipAmount that receives the bill amount and the tip rate as parameters and returns the tip as bill * rate / 100.0. In main, read the bill and the rate, call the method, and print two lines: first the tip, then the total (bill plus tip), both rounded to 2 decimal places.\n\nInput Format:\nA single line with two space-separated numbers: bill and rate (rate is a percentage, e.g. 10 means 10 percent).\n\nOutput Format:\nLine 1: the tip rounded to exactly 2 decimal places.\nLine 2: the total (bill plus tip) rounded to exactly 2 decimal places.\n\nConstraints:\n1 <= bill <= 100000, 0 <= rate <= 50",
  difficulty: "easy",
  variant: "scenario",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Parameter Passing",
  sampleinput1: "500 10",
  sampleoutput1: "50.00\n550.00",
  sampleinput2: "250 12",
  sampleoutput2: "30.00\n280.00",
  input1: "88 5",
  output1: "4.40\n92.40",
  input2: "60 8.5",
  output2: "5.10\n65.10",
  input3: "1000 7.5",
  output3: "75.00\n1075.00",
  inputconstrains: "1 <= bill <= 100000, 0 <= rate <= 50",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    static double tipAmount(double bill, double ratePercent) {
        return bill * ratePercent / 100.0;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double bill = sc.nextDouble();
        double rate = sc.nextDouble();
        double tip = tipAmount(bill, rate);
        System.out.printf("%.2f%n", tip);
        System.out.printf("%.2f%n", bill + tip);
    }
}`,
});

// 10 ── easy scenario ── Modular Design
codeQuestions.push({
  title: "Payroll Gross Salary Method",
  description:
    "A small company computes gross salary with modular methods. Write three static methods: hra(basic) returning 20 percent of basic, da(basic) returning 10 percent of basic, and grossSalary(basic) returning basic plus hra plus da by calling the other two methods. Read the basic salary in main and print the returned gross salary rounded to 2 decimal places.\n\nInput Format:\nA single line containing one number, the basic monthly salary.\n\nOutput Format:\nPrint the gross salary rounded to exactly 2 decimal places.\n\nConstraints:\n1 <= basic <= 1000000",
  difficulty: "easy",
  variant: "scenario",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Modular Design",
  sampleinput1: "20000",
  sampleoutput1: "26000.00",
  sampleinput2: "15500",
  sampleoutput2: "20150.00",
  input1: "12345.67",
  output1: "16049.37",
  input2: "9999.99",
  output2: "12999.99",
  input3: "25000.50",
  output3: "32500.65",
  inputconstrains: "1 <= basic <= 1000000",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    static double hra(double basic) {
        return basic * 0.20;
    }

    static double da(double basic) {
        return basic * 0.10;
    }

    static double grossSalary(double basic) {
        return basic + hra(basic) + da(basic);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double basic = sc.nextDouble();
        System.out.printf("%.2f%n", grossSalary(basic));
    }
}`,
});

// 11 ── medium ── Modular Design
codeQuestions.push({
  title: "EMI Calculator with Helper Methods",
  description:
    "A bank wants a small EMI calculator built with modular methods. Write a static method monthlyRate(annualPercent) that returns the annual rate divided by 12 and then by 100, and a static method emi(principal, annualPercent, months) that returns the monthly installment using the reducing-balance formula: EMI = P * r * (1 + r)^n / ((1 + r)^n - 1), where r is the monthly rate and n is the number of months. Use Math.pow for the power. Read principal, annual rate and months in main and print the returned EMI rounded to 2 decimal places.\n\nInput Format:\nA single line with three space-separated values: principal (number), annual rate in percent (number) and months (integer).\n\nOutput Format:\nPrint the EMI rounded to exactly 2 decimal places.\n\nConstraints:\n1 <= principal <= 10000000, 0.1 <= rate <= 60, 1 <= months <= 360",
  difficulty: "medium",
  variant: "scenario",
  maxscore: 20,
  lang: "java",
  topic: TOPIC,
  subtopic: "Modular Design",
  sampleinput1: "100000 12 12",
  sampleoutput1: "8884.88",
  sampleinput2: "80000 24 12",
  sampleoutput2: "7564.77",
  input1: "25000 12 12",
  output1: "2221.22",
  input2: "60000 12 6",
  output2: "10352.90",
  input3: "50000 12 24",
  output3: "2353.67",
  inputconstrains: "1 <= principal <= 10000000, 0.1 <= rate <= 60, 1 <= months <= 360",
  blacklist: "BigDecimal",
  whitelist: "static double",
  sourcecode: `import java.util.Scanner;

public class Main {
    static double monthlyRate(double annualPercent) {
        return annualPercent / 12.0 / 100.0;
    }

    static double emi(double principal, double annualPercent, int months) {
        double r = monthlyRate(annualPercent);
        double factor = Math.pow(1.0 + r, months);
        return principal * r * factor / (factor - 1.0);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double principal = sc.nextDouble();
        double annual = sc.nextDouble();
        int months = sc.nextInt();
        System.out.printf("%.2f%n", emi(principal, annual, months));
    }
}`,
});

// 12 ── medium ── Modular Design
codeQuestions.push({
  title: "Electricity Bill with Slab Methods",
  description:
    "A power company computes monthly bills with slab rates using modular methods. Write three static methods that each return a double: firstSlab(units) charging 3.50 per unit for the first 100 units, secondSlab(units) charging 4.60 per unit for units from 101 to 200, and thirdSlab(units) charging 6.50 per unit for units above 200. Write a fourth static method totalBill(units) that returns the sum of the three slab charges. Read the units consumed in main and print the returned total rounded to 2 decimal places.\n\nInput Format:\nA single line containing one integer: units consumed.\n\nOutput Format:\nPrint the total bill rounded to exactly 2 decimal places.\n\nConstraints:\n1 <= units <= 100000",
  difficulty: "medium",
  variant: "scenario",
  maxscore: 20,
  lang: "java",
  topic: TOPIC,
  subtopic: "Modular Design",
  sampleinput1: "150",
  sampleoutput1: "580.00",
  sampleinput2: "250",
  sampleoutput2: "1135.00",
  input1: "45",
  output1: "157.50",
  input2: "100",
  output2: "350.00",
  input3: "372",
  output3: "1928.00",
  inputconstrains: "1 <= units <= 100000",
  blacklist: "Map",
  whitelist: "static double",
  sourcecode: `import java.util.Scanner;

public class Main {
    static double firstSlab(int units) {
        int used = Math.min(units, 100);
        return used * 3.50;
    }

    static double secondSlab(int units) {
        int used = Math.max(0, Math.min(units - 100, 100));
        return used * 4.60;
    }

    static double thirdSlab(int units) {
        int used = Math.max(0, units - 200);
        return used * 6.50;
    }

    static double totalBill(int units) {
        return firstSlab(units) + secondSlab(units) + thirdSlab(units);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int units = sc.nextInt();
        System.out.printf("%.2f%n", totalBill(units));
    }
}`,
});

// 13 ── medium ── Static Methods
codeQuestions.push({
  title: "Unit Converter Suite",
  description:
    "Build a modular unit converter. Write four static methods that each receive a double and return a double: cmToInch(v) = v / 2.54, inchToCm(v) = v * 2.54, kgToLb(v) = v * 2.20462 and lbToKg(v) = v / 2.20462. In main, read a choice (1 to 4) and a value, use a switch statement as the dispatcher to call the matching method, and print the returned result rounded to 2 decimal places.\n\nInput Format:\nA single line with two space-separated values: choice (1 to 4) and value (number).\n\nOutput Format:\nPrint the converted value rounded to exactly 2 decimal places.\n\nConstraints:\n1 <= choice <= 4, 0 < value <= 100000",
  difficulty: "medium",
  variant: "scenario",
  maxscore: 20,
  lang: "java",
  topic: TOPIC,
  subtopic: "Static Methods",
  sampleinput1: "1 25.4",
  sampleoutput1: "10.00",
  sampleinput2: "3 50",
  sampleoutput2: "110.23",
  input1: "2 10",
  output1: "25.40",
  input2: "4 110.231",
  output2: "50.00",
  input3: "1 100",
  output3: "39.37",
  inputconstrains: "1 <= choice <= 4, 0 < value <= 100000",
  blacklist: "Map",
  whitelist: "switch",
  sourcecode: `import java.util.Scanner;

public class Main {
    static double cmToInch(double v) {
        return v / 2.54;
    }

    static double inchToCm(double v) {
        return v * 2.54;
    }

    static double kgToLb(double v) {
        return v * 2.20462;
    }

    static double lbToKg(double v) {
        return v / 2.20462;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int choice = sc.nextInt();
        double value = sc.nextDouble();
        double result;
        switch(choice) {
            case 1:
                result = cmToInch(value);
                break;
            case 2:
                result = inchToCm(value);
                break;
            case 3:
                result = kgToLb(value);
                break;
            case 4:
                result = lbToKg(value);
                break;
            default:
                result = 0.0;
                break;
        }
        System.out.printf("%.2f%n", result);
    }
}`,
});

// 14 ── medium ── Modular Design
codeQuestions.push({
  title: "Word Statistics Module",
  description:
    "A text tool reports word statistics through modular methods. Write three static methods that each receive the text and return an int: countWords(text) counting words separated by one or more spaces, countVowels(text) counting vowels (a, e, i, o, u in lower or upper case) and countUppercase(text) counting uppercase letters A to Z. Read one line of text in main and print the three results on three separate lines in this order.\n\nInput Format:\nA single line of text (may contain spaces).\n\nOutput Format:\nLine 1: number of words.\nLine 2: number of vowels.\nLine 3: number of uppercase letters.\n\nConstraints:\n1 <= length of text <= 2000",
  difficulty: "medium",
  variant: "scenario",
  maxscore: 20,
  lang: "java",
  topic: TOPIC,
  subtopic: "Modular Design",
  sampleinput1: "Java is Fun",
  sampleoutput1: "3\n4\n2",
  sampleinput2: "Modular Design Rocks",
  sampleoutput2: "3\n6\n3",
  input1: "a",
  output1: "1\n1\n0",
  input2: "HELLO WORLD FROM JAVA",
  output2: "4\n6\n18",
  input3: "keep it simple and clean",
  output3: "5\n8\n0",
  inputconstrains: "1 <= text length <= 2000",
  blacklist: "StringBuilder",
  whitelist: "static int",
  sourcecode: `import java.util.Scanner;

public class Main {
    static int countWords(String text) {
        int count = 0;
        boolean inWord = false;
        for(int i = 0; i < text.length(); i++) {
            char ch = text.charAt(i);
            if(ch != ' ') {
                if(!inWord) {
                    count++;
                    inWord = true;
                }
            } else {
                inWord = false;
            }
        }
        return count;
    }

    static int countVowels(String text) {
        int count = 0;
        for(int i = 0; i < text.length(); i++) {
            char ch = text.charAt(i);
            if(ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u'
                    || ch == 'A' || ch == 'E' || ch == 'I' || ch == 'O' || ch == 'U') {
                count++;
            }
        }
        return count;
    }

    static int countUppercase(String text) {
        int count = 0;
        for(int i = 0; i < text.length(); i++) {
            char ch = text.charAt(i);
            if(ch >= 'A' && ch <= 'Z') {
                count++;
            }
        }
        return count;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String text = sc.nextLine().trim();
        System.out.println(countWords(text));
        System.out.println(countVowels(text));
        System.out.println(countUppercase(text));
    }
}`,
});

// 15 ── medium ── Modular Design
codeQuestions.push({
  title: "Prime Numbers in a Range Using a Method",
  description:
    "A math helper prints all prime numbers in a range using a reusable method. Write a static boolean method isPrime(n) that returns true when n is prime. In main, read two integers a and b and, for every number from a to b, call isPrime and print each prime on its own line.\n\nInput Format:\nA single line with two space-separated integers a and b.\n\nOutput Format:\nEach prime in the range [a, b] on its own line, in increasing order.\n\nConstraints:\n1 <= a <= b <= 50000, and the range always contains at least one prime",
  difficulty: "medium",
  variant: "scenario",
  maxscore: 20,
  lang: "java",
  topic: TOPIC,
  subtopic: "Modular Design",
  sampleinput1: "10 30",
  sampleoutput1: "11\n13\n17\n19\n23\n29",
  sampleinput2: "1 10",
  sampleoutput2: "2\n3\n5\n7",
  input1: "90 100",
  output1: "97",
  input2: "440 450",
  output2: "443\n449",
  input3: "2 20",
  output3: "2\n3\n5\n7\n11\n13\n17\n19",
  inputconstrains: "1 <= a <= b <= 50000, range contains at least one prime",
  blacklist: "BigInteger",
  whitelist: "static boolean",
  sourcecode: `import java.util.Scanner;

public class Main {
    static boolean isPrime(int n) {
        if(n < 2) {
            return false;
        }
        for(int i = 2; i * i <= n; i++) {
            if(n % i == 0) {
                return false;
            }
        }
        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        for(int n = a; n <= b; n++) {
            if(isPrime(n)) {
                System.out.println(n);
            }
        }
    }
}`,
});

// 16 ── medium ── Method Declaration and Definition
codeQuestions.push({
  title: "GCD and LCM with Euclid Method",
  description:
    "A number theory tool needs two reusable methods. Write a static long method gcd(a, b) that uses a while loop with Euclid's algorithm (repeatedly replace the pair with (b, a mod b) until b becomes 0) and returns the greatest common divisor. Write a static long method lcm(a, b) that returns a divided by gcd times b. Read two integers in main and print the gcd, then the lcm, on separate lines.\n\nInput Format:\nA single line with two space-separated integers a and b.\n\nOutput Format:\nLine 1: the greatest common divisor.\nLine 2: the least common multiple.\n\nConstraints:\n1 <= a, b <= 1000000000",
  difficulty: "medium",
  variant: "scenario",
  maxscore: 20,
  lang: "java",
  topic: TOPIC,
  subtopic: "Method Declaration and Definition",
  sampleinput1: "12 18",
  sampleoutput1: "6\n36",
  sampleinput2: "1000000000 999999999",
  sampleoutput2: "1\n999999999000000000",
  input1: "7 7",
  output1: "7\n7",
  input2: "48 36",
  output2: "12\n144",
  input3: "17 5",
  output3: "1\n85",
  inputconstrains: "1 <= a, b <= 1000000000",
  blacklist: "BigInteger",
  whitelist: "while(",
  sourcecode: `import java.util.Scanner;

public class Main {
    static long gcd(long a, long b) {
        while(b != 0) {
            long t = b;
            b = a % b;
            a = t;
        }
        return a;
    }

    static long lcm(long a, long b) {
        return a / gcd(a, b) * b;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long a = sc.nextLong();
        long b = sc.nextLong();
        System.out.println(gcd(a, b));
        System.out.println(lcm(a, b));
    }
}`,
});

// 17 ── hard ── Modular Design
codeQuestions.push({
  title: "Payroll Engine with Slab Tax Methods",
  description:
    "A payroll engine computes a monthly salary slip with modular static methods. Given the basic monthly salary: hra is 20 percent of basic, da is 10 percent of basic, gross = basic + hra + da, and pf is 8 percent of basic. Annual gross is gross times 12. Annual tax uses slabs: up to 250000 pays nothing, up to 500000 pays 10 percent of the amount above 250000, up to 1000000 pays 12500 plus 20 percent of the amount above 500000, and above 1000000 pays 112500 plus 30 percent of the amount above 1000000. Monthly tax is annual tax divided by 12. Net = gross - pf - monthly tax. Read the basic salary and print four lines: gross, pf, monthly tax and net, each rounded to 2 decimal places.\n\nInput Format:\nA single line containing one number: the basic monthly salary.\n\nOutput Format:\nLine 1: gross salary.\nLine 2: pf.\nLine 3: monthly tax.\nLine 4: net salary.\nAll four rounded to exactly 2 decimal places.\n\nConstraints:\n1 <= basic <= 1000000",
  difficulty: "hard",
  variant: "scenario",
  maxscore: 30,
  lang: "java",
  topic: TOPIC,
  subtopic: "Modular Design",
  sampleinput1: "20000",
  sampleoutput1: "26000.00\n1600.00\n516.67\n23883.33",
  sampleinput2: "15000",
  sampleoutput2: "19500.00\n1200.00\n0.00\n18300.00",
  input1: "30000",
  output1: "39000.00\n2400.00\n1816.67\n34783.33",
  input2: "60000",
  output2: "78000.00\n4800.00\n8308.33\n64891.67",
  input3: "100000",
  output3: "130000.00\n8000.00\n23375.00\n98625.00",
  inputconstrains: "1 <= basic <= 1000000",
  blacklist: "BigDecimal",
  whitelist: "static double",
  sourcecode: `import java.util.Scanner;

public class Main {
    static double hraOf(double basic) {
        return basic * 0.20;
    }

    static double daOf(double basic) {
        return basic * 0.10;
    }

    static double grossOf(double basic) {
        return basic + hraOf(basic) + daOf(basic);
    }

    static double pfOf(double basic) {
        return basic * 0.08;
    }

    static double annualTax(double annualGross) {
        if(annualGross <= 250000.0) {
            return 0.0;
        } else if(annualGross <= 500000.0) {
            return (annualGross - 250000.0) * 0.10;
        } else if(annualGross <= 1000000.0) {
            return 12500.0 + (annualGross - 500000.0) * 0.20;
        }
        return 112500.0 + (annualGross - 1000000.0) * 0.30;
    }

    static double netOf(double basic) {
        double gross = grossOf(basic);
        double tax = annualTax(gross * 12.0) / 12.0;
        return gross - pfOf(basic) - tax;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double basic = sc.nextDouble();
        double gross = grossOf(basic);
        double pf = pfOf(basic);
        double tax = annualTax(gross * 12.0) / 12.0;
        System.out.printf("%.2f%n", gross);
        System.out.printf("%.2f%n", pf);
        System.out.printf("%.2f%n", tax);
        System.out.printf("%.2f%n", netOf(basic));
    }
}`,
});

// 18 ── hard ── Return Values
codeQuestions.push({
  title: "Compound Savings Projector",
  description:
    "A savings app projects compound growth without using Math.pow. Write a static double method power(base, exp) that computes base raised to a non-negative integer exponent with a plain for loop of repeated multiplication and returns the result. In main, read a principal, an annual interest rate in percent and the number of years; compute the final amount as principal times power(1 + rate / 100.0, years) and the interest earned as amount minus principal. Print the final amount, then the interest earned, each rounded to 2 decimal places.\n\nInput Format:\nA single line with three space-separated values: principal (number), annual rate in percent (number) and years (integer).\n\nOutput Format:\nLine 1: final amount after compounding, rounded to exactly 2 decimal places.\nLine 2: interest earned, rounded to exactly 2 decimal places.\n\nConstraints:\n1 <= principal <= 10000000, 0 < rate <= 50, 1 <= years <= 30",
  difficulty: "hard",
  variant: "scenario",
  maxscore: 30,
  lang: "java",
  topic: TOPIC,
  subtopic: "Return Values",
  sampleinput1: "10000 10 3",
  sampleoutput1: "13310.00\n3310.00",
  sampleinput2: "5000 8 5",
  sampleoutput2: "7346.64\n2346.64",
  input1: "12000 6.5 4",
  output1: "15437.60\n3437.60",
  input2: "100000 5 10",
  output2: "162889.46\n62889.46",
  input3: "25000 12 2",
  output3: "31360.00\n6360.00",
  inputconstrains: "1 <= principal <= 10000000, 0 < rate <= 50, 1 <= years <= 30",
  blacklist: "Math.pow",
  whitelist: "static double,for(",
  sourcecode: `import java.util.Scanner;

public class Main {
    static double power(double base, int exp) {
        double result = 1.0;
        for(int i = 0; i < exp; i++) {
            result = result * base;
        }
        return result;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double principal = sc.nextDouble();
        double rate = sc.nextDouble();
        int years = sc.nextInt();
        double amount = principal * power(1.0 + rate / 100.0, years);
        System.out.printf("%.2f%n", amount);
        System.out.printf("%.2f%n", amount - principal);
    }
}`,
});

// 19 ── hard ── Parameter Passing
codeQuestions.push({
  title: "Grade Analytics with Array Methods",
  description:
    "A teacher analyzes class results by passing the marks array to static methods. Write three static methods: average(marks) returning the mean as a double, highest(marks) returning the maximum mark as an int, and passCount(marks) returning how many marks are 40 or more as an int. Read n and then n marks in main, store them in an int array, pass that array to each method, and print three lines: the average rounded to 2 decimal places, the highest mark, and the pass count.\n\nInput Format:\nLine 1: n, the number of students.\nLine 2: n space-separated integers, the marks.\n\nOutput Format:\nLine 1: average rounded to exactly 2 decimal places.\nLine 2: highest mark.\nLine 3: number of students with marks >= 40.\n\nConstraints:\n1 <= n <= 1000, 0 <= marks <= 100",
  difficulty: "hard",
  variant: "scenario",
  maxscore: 30,
  lang: "java",
  topic: TOPIC,
  subtopic: "Parameter Passing",
  sampleinput1: "5\n80 90 75 60 45",
  sampleoutput1: "70.00\n90\n5",
  sampleinput2: "4\n35 55 70 88",
  sampleoutput2: "62.00\n88\n3",
  input1: "3\n33 47 51",
  output1: "43.67\n51\n2",
  input2: "6\n10 20 30 90 95 100",
  output2: "57.50\n100\n3",
  input3: "7\n40 40 40 40 40 40 39",
  output3: "39.86\n40\n6",
  inputconstrains: "1 <= n <= 1000, 0 <= marks <= 100",
  blacklist: "ArrayList",
  whitelist: "int[,static double",
  sourcecode: `import java.util.Scanner;

public class Main {
    static double average(int[] marks) {
        int sum = 0;
        for(int i = 0; i < marks.length; i++) {
            sum = sum + marks[i];
        }
        return (double) sum / marks.length;
    }

    static int highest(int[] marks) {
        int top = marks[0];
        for(int i = 1; i < marks.length; i++) {
            if(marks[i] > top) {
                top = marks[i];
            }
        }
        return top;
    }

    static int passCount(int[] marks) {
        int count = 0;
        for(int i = 0; i < marks.length; i++) {
            if(marks[i] >= 40) {
                count++;
            }
        }
        return count;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] marks = new int[n];
        for(int i = 0; i < n; i++) {
            marks[i] = sc.nextInt();
        }
        System.out.printf("%.2f%n", average(marks));
        System.out.println(highest(marks));
        System.out.println(passCount(marks));
    }
}`,
});

// 20 ── hard ── Parameter Passing
codeQuestions.push({
  title: "Caesar Shift Encoder Method",
  description:
    "A secret-note app encodes messages with a Caesar-style shift built around a single-character method. Write a static char method shiftChar(c, k) that receives one character and a shift k and returns the shifted character: lowercase letters wrap within a to z, uppercase letters wrap within A to Z, and any other character is returned unchanged. In main, read the shift k and then one line of text, build the encoded text by calling shiftChar for every character (store the results in a char array), and print the encoded line.\n\nInput Format:\nLine 1: the shift k (integer).\nLine 2: the text to encode (single line, may contain spaces and digits).\n\nOutput Format:\nPrint one line: the encoded text.\n\nConstraints:\n0 <= k <= 25, 1 <= text length <= 2000, text contains at least one letter and has no leading or trailing spaces",
  difficulty: "hard",
  variant: "scenario",
  maxscore: 30,
  lang: "java",
  topic: TOPIC,
  subtopic: "Parameter Passing",
  sampleinput1: "3\nHello World",
  sampleoutput1: "Khoor Zruog",
  sampleinput2: "1\nxyz XYZ",
  sampleoutput2: "yza YZA",
  input1: "25\nabc",
  output1: "zab",
  input2: "0\nSame Text 99",
  output2: "Same Text 99",
  input3: "13\nNoWay",
  output3: "AbJnl",
  inputconstrains: "0 <= k <= 25, 1 <= text length <= 2000, at least one letter, no leading or trailing spaces",
  blacklist: "StringBuilder",
  whitelist: "char",
  sourcecode: `import java.util.Scanner;

public class Main {
    static char shiftChar(char c, int k) {
        if(c >= 'a' && c <= 'z') {
            int pos = c - 'a';
            return (char) ('a' + (pos + k) % 26);
        }
        if(c >= 'A' && c <= 'Z') {
            int pos = c - 'A';
            return (char) ('A' + (pos + k) % 26);
        }
        return c;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int k = Integer.parseInt(sc.nextLine().trim());
        String text = sc.nextLine().trim();
        char[] out = new char[text.length()];
        for(int i = 0; i < text.length(); i++) {
            out[i] = shiftChar(text.charAt(i), k);
        }
        System.out.println(new String(out));
    }
}`,
});

/* ─────────────────────────────── MCQ QUESTIONS ─────────────────────────────── */

const mcqQuestions = [];
function mcq(o) {
  mcqQuestions.push({
    topic: TOPIC,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
    ...o,
  });
}

// E1
mcq({
  title: "Valid Method Declaration",
  description: "Which of the following is a syntactically valid method declaration in Java?",
  difficulty: "easy",
  subtopic: "Method Declaration and Definition",
  Option1: "public static int compute(int x)",
  Option2: "static compute(int x)",
  Option3: "public static int compute(int x;",
  Option4: "static int (int x) compute",
  CorrectOption: 1,
});

// E2
mcq({
  title: "Argument Passing Mechanism",
  description: "In Java, when you pass a variable to a method, what is actually transferred to the parameter?",
  difficulty: "easy",
  subtopic: "Call by Value Semantics",
  Option1: "A copy of the variable's value",
  Option2: "The memory address of the variable",
  Option3: "A pointer that stays linked to the caller's variable",
  Option4: "The variable's name so the method can rename it",
  CorrectOption: 1,
});

// E3
mcq({
  title: "Sending a Value Back",
  description: "Which keyword hands a value back from a method to the code that called it?",
  difficulty: "easy",
  subtopic: "Return Values",
  Option1: "send",
  Option2: "yield",
  Option3: "return",
  Option4: "output",
  CorrectOption: 3,
});

// E4
mcq({
  title: "Static Method Ownership",
  description: "A static method belongs to which of the following?",
  difficulty: "easy",
  subtopic: "Static Methods",
  Option1: "The class itself and can be called without creating an object",
  Option2: "Each object of the class individually",
  Option3: "Only the main method",
  Option4: "The package in which the class is declared",
  CorrectOption: 1,
});

// E5
mcq({
  title: "Meaning of void",
  description: "What does the return type void mean in a method declaration?",
  difficulty: "easy",
  subtopic: "Return Values",
  Option1: "The method returns no value to the caller",
  Option2: "The method returns null by default",
  Option3: "The method returns the value 0",
  Option4: "The method is not allowed to take parameters",
  CorrectOption: 1,
});

// E6
mcq({
  title: "Parameters versus Arguments",
  description: "What is the difference between a parameter and an argument?",
  difficulty: "easy",
  subtopic: "Parameter Passing",
  Option1: "A parameter is a variable in the method definition; an argument is the value passed at the call site",
  Option2: "A parameter is written at the call site; an argument is written in the definition",
  Option3: "Parameters and arguments are unrelated concepts",
  Option4: "Arguments must always be variables, parameters must always be literals",
  CorrectOption: 1,
});

// E7
mcq({
  title: "Where Methods Live",
  description: "In Java, where must every method be declared?",
  difficulty: "easy",
  subtopic: "Method Declaration and Definition",
  Option1: "Inside a class",
  Option2: "Outside all classes at the top level of a file",
  Option3: "Inside the main method",
  Option4: "Inside a package statement",
  CorrectOption: 1,
});

// E8
mcq({
  title: "Benefit of Modular Design",
  description: "Splitting a large program into small, focused methods mainly improves which of the following?",
  difficulty: "easy",
  subtopic: "Modular Design",
  Option1: "Readability, reusability and easier testing",
  Option2: "The download size of the JDK",
  Option3: "The speed of the operating system",
  Option4: "The number of language keywords needed",
  CorrectOption: 1,
});

// E9
mcq({
  title: "Values Returned per Call",
  description: "How many values can one return statement send back from a Java method?",
  difficulty: "easy",
  subtopic: "Return Values",
  Option1: "Exactly one value",
  Option2: "Exactly two values",
  Option3: "Any number of values separated by commas",
  Option4: "Zero, because return only ends the method",
  CorrectOption: 1,
});

// E10
mcq({
  title: "Calling a Static Method",
  description: "Class Demo contains the method public static double area(double r). From main in the same class, which call is correct?",
  difficulty: "easy",
  subtopic: "Static Methods",
  Option1: "double a = area(5.0);",
  Option2: "double a = static area(5.0);",
  Option3: "double a = new area(5.0);",
  Option4: "double a = area static(5.0);",
  CorrectOption: 1,
});

// M1 ── snippet
mcq({
  title: "Predict Output Call by Value Int",
  description: "What does the following program print?",
  difficulty: "medium",
  subtopic: "Call by Value Semantics",
  iscodesnippet: true,
  snippetLang: "java",
  codesnippet: `public class Main {
    static void boost(int score) {
        score = score + 50;
        System.out.println("Inside: " + score);
    }
    public static void main(String[] args) {
        int score = 10;
        boost(score);
        System.out.println("Outside: " + score);
    }
}`,
  Option1: "Inside: 60 on one line, then Outside: 60",
  Option2: "Inside: 60 on one line, then Outside: 10",
  Option3: "Inside: 10 on one line, then Outside: 10",
  Option4: "Inside: 10 on one line, then Outside: 60",
  CorrectOption: 2,
});

// M2 ── snippet
mcq({
  title: "Mutating Array via Parameter",
  description: "The parameter receives a copy of the array reference. What does the program print?",
  difficulty: "medium",
  subtopic: "Parameter Passing",
  iscodesnippet: true,
  snippetLang: "java",
  codesnippet: `public class Main {
    static void bump(int[] nums) {
        nums[0] = nums[0] + 100;
    }
    public static void main(String[] args) {
        int[] nums = {5, 6, 7};
        bump(nums);
        System.out.println(nums[0]);
    }
}`,
  Option1: "5",
  Option2: "6",
  Option3: "105",
  Option4: "Compilation error",
  CorrectOption: 3,
});

// M3 ── snippet
mcq({
  title: "Instance Method from Static Context",
  description: "What happens when you try to compile this program?",
  difficulty: "medium",
  subtopic: "Static Methods",
  iscodesnippet: true,
  snippetLang: "java",
  codesnippet: `public class Main {
    int count = 0;
    void show() {
        System.out.println(count);
    }
    public static void main(String[] args) {
        show();
    }
}`,
  Option1: "It compiles and prints 0",
  Option2: "It fails to compile because a non-static method cannot be called from a static context",
  Option3: "It compiles and prints null",
  Option4: "It compiles but throws NullPointerException at runtime",
  CorrectOption: 2,
});

// M4 ── snippet
mcq({
  title: "Return Type Mismatch",
  description: "What is the result of compiling and running this program?",
  difficulty: "medium",
  subtopic: "Return Values",
  iscodesnippet: true,
  snippetLang: "java",
  codesnippet: `public class Main {
    static int half(int n) {
        return n / 2.0;
    }
    public static void main(String[] args) {
        System.out.println(half(10));
    }
}`,
  Option1: "It prints 5",
  Option2: "It prints 5.0",
  Option3: "It fails to compile because a double result cannot be returned from an int method",
  Option4: "It prints 0",
  CorrectOption: 3,
});

// M5
mcq({
  title: "Return Type in Overload Signatures",
  description: "A class declares two methods with the same name and identical parameter lists but different return types (one int, one double). What does the Java compiler do?",
  difficulty: "medium",
  subtopic: "Method Declaration and Definition",
  Option1: "It reports a duplicate method error, because the return type alone cannot distinguish methods",
  Option2: "It accepts both and picks the int version for integer arguments",
  Option3: "It accepts both and the JVM chooses the better one at runtime",
  Option4: "It accepts both and the double version silently hides the int version",
  CorrectOption: 1,
});

// M6 ── snippet
mcq({
  title: "Void Method with Early Return",
  description: "What does the following program print?",
  difficulty: "medium",
  subtopic: "Return Values",
  iscodesnippet: true,
  snippetLang: "java",
  codesnippet: `public class Main {
    static void check(int n) {
        if (n < 0) {
            System.out.println("negative");
            return;
        }
        System.out.println("non-negative");
    }
    public static void main(String[] args) {
        check(-5);
        check(7);
    }
}`,
  Option1: "negative then non-negative, on two lines",
  Option2: "non-negative then negative, on two lines",
  Option3: "Only negative, because return stops the whole program",
  Option4: "Compile error, because void methods cannot contain return",
  CorrectOption: 1,
});

// H1 ── snippet
mcq({
  title: "Swap Attempt Output Prediction",
  description: "The swap works on the copies inside the method. What does the program print?",
  difficulty: "hard",
  subtopic: "Call by Value Semantics",
  iscodesnippet: true,
  snippetLang: "java",
  codesnippet: `public class Main {
    static void swap(int a, int b) {
        int t = a;
        a = b;
        b = t;
    }
    public static void main(String[] args) {
        int x = 1;
        int y = 9;
        swap(x, y);
        System.out.println(x + " " + y);
    }
}`,
  Option1: "1 9",
  Option2: "9 1",
  Option3: "9 9",
  Option4: "1 1",
  CorrectOption: 1,
});

// H2 ── snippet
mcq({
  title: "Reference Reassignment via Parameter",
  description: "Inside reset, the parameter arr is reassigned to a new array. What does the program print?",
  difficulty: "hard",
  subtopic: "Parameter Passing",
  iscodesnippet: true,
  snippetLang: "java",
  codesnippet: `public class Main {
    static void reset(int[] arr) {
        arr = new int[2];
        arr[0] = 999;
    }
    public static void main(String[] args) {
        int[] data = {1, 2, 3};
        reset(data);
        System.out.println(data[0]);
    }
}`,
  Option1: "999",
  Option2: "1",
  Option3: "0",
  Option4: "Compilation error",
  CorrectOption: 2,
});

// H3 ── snippet
mcq({
  title: "Static Method Accessing Instance Field",
  description: "What is the result of compiling this program?",
  difficulty: "hard",
  subtopic: "Static Methods",
  iscodesnippet: true,
  snippetLang: "java",
  codesnippet: `public class Main {
    static int total = 10;
    int bonus = 5;
    static int compute() {
        return total + bonus;
    }
    public static void main(String[] args) {
        System.out.println(compute());
    }
}`,
  Option1: "It compiles and prints 15",
  Option2: "It compiles and prints 10",
  Option3: "It fails to compile because the static method references the non-static field bonus",
  Option4: "It compiles but throws an exception at runtime",
  CorrectOption: 3,
});

// H4 ── snippet
mcq({
  title: "Parameter Shadows Static Field",
  description: "The method parameter shares its name with the static field. What does the program print?",
  difficulty: "hard",
  subtopic: "Parameter Passing",
  iscodesnippet: true,
  snippetLang: "java",
  codesnippet: `public class Main {
    static int rate = 10;
    static void apply(int rate) {
        rate = rate + 5;
        System.out.println(rate);
    }
    public static void main(String[] args) {
        apply(3);
        System.out.println(rate);
    }
}`,
  Option1: "8 on the first line and 10 on the second line",
  Option2: "8 on the first line and 8 on the second line",
  Option3: "15 on the first line and 10 on the second line",
  Option4: "8 on the first line and 15 on the second line",
  CorrectOption: 1,
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
  if (q.iscodesnippet) snippets++;
  const opts = [q.Option1, q.Option2, q.Option3, q.Option4];
  if (new Set(opts).size !== 4) problems.push(`${q.title}: options not distinct`);
  if (opts.some((o) => !o || o.length === 0)) problems.push(`${q.title}: empty option`);
  const lower = opts.map((o) => o.toLowerCase());
  if (lower.some((o) => o.includes("all of the above") || o.includes("none of the above"))) {
    problems.push(`${q.title}: all/none of the above`);
  }
  if (q.codesnippet && q.codesnippet.includes("\\")) problems.push(`${q.title}: backslash in snippet`);
}
if (md.easy !== 10 || md.medium !== 6 || md.hard !== 4) problems.push(`mcq difficulty ${JSON.stringify(md)}`);
if (snippets < 6) problems.push(`only ${snippets} snippets`);

if (problems.length) {
  console.error("SELF-CHECK FAILED:");
  for (const p of problems) console.error("  - " + p);
  process.exit(1);
}

/* ─────────────────────────────── WRITE PART FILES ─────────────────────────────── */

const codeP1 = { day: 5, topics: [{ name: TOPIC, subtopics: SUBTOPICS }], questions: codeQuestions.slice(0, 10) };
const codeP2 = { questions: codeQuestions.slice(10) };
const mcqP1 = { questions: mcqQuestions.slice(0, 10) };
const mcqP2 = { questions: mcqQuestions.slice(10) };

fs.writeFileSync(path.join(DIR, "day-05.code.p1.json"), JSON.stringify(codeP1, null, 2) + "\n");
fs.writeFileSync(path.join(DIR, "day-05.code.p2.json"), JSON.stringify(codeP2, null, 2) + "\n");
fs.writeFileSync(path.join(DIR, "day-05.mcq.p1.json"), JSON.stringify(mcqP1, null, 2) + "\n");
fs.writeFileSync(path.join(DIR, "day-05.mcq.p2.json"), JSON.stringify(mcqP2, null, 2) + "\n");

console.log("SELF-CHECK OK");
console.log(`code: easy=${cd.easy} (basic=${cv.basic}, scenario=${cv.scenario}) medium=${cd.medium} hard=${cd.hard}`);
console.log(`code subtopics: ${JSON.stringify(subCount)}`);
console.log(`mcq: easy=${md.easy} medium=${md.medium} hard=${md.hard} snippets=${snippets}`);
console.log("part files written to", DIR);
