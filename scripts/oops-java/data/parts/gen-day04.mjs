/**
 * Generator for Day 4 ("Looping Statements") of the OOPS using JAVA question bank.
 * Writes 4 part files into scripts/oops-java/data/parts/:
 *   day-04.code.p1.json / day-04.code.p2.json
 *   day-04.mcq.p1.json  / day-04.mcq.p2.json
 * Expected outputs for algorithmic questions are COMPUTED here (JS mirrors the
 * Java logic) so hand-arithmetic slips are impossible. A structural assertion
 * pass runs before any file is written.
 */
import fs from "node:fs";

const TOPIC = "Looping Statements";
const SUBTOPICS = ["for Loop", "while Loop", "do-while Loop", "Enhanced For Loop", "Nested Loops"];
const topics = [{ name: TOPIC, subtopics: [...SUBTOPICS] }];

/* ── helpers that mirror the Java solutions exactly ── */
function multTable(n) {
  const out = [];
  for (let i = 1; i <= 10; i++) out.push(n + " x " + i + " = " + n * i);
  return out.join("\n");
}
function fibList(n) {
  const out = [];
  let a = 0, b = 1;
  for (let i = 1; i <= n; i++) { out.push(a); const t = a + b; a = b; b = t; }
  return out.join(" ");
}
function savings(initial, deposit, target) {
  let balance = initial, months = 0;
  while (balance < target) {
    balance = balance + deposit;
    balance = balance + Math.floor((balance * 2) / 100);
    months++;
  }
  return months + "\n" + balance;
}
function collatzSteps(n) {
  let steps = 0, v = n;
  while (v !== 1) { v = v % 2 === 0 ? v / 2 : 3 * v + 1; steps++; }
  return steps;
}
function collatzBest(a, b) {
  let bestN = a, bestS = 0;
  for (let n = a; n <= b; n++) {
    const s = collatzSteps(n);
    if (s > bestS) { bestS = s; bestN = n; }
  }
  return bestN + "\n" + bestS;
}
function digitFreq(nStr) {
  const counts = new Array(10).fill(0);
  for (const ch of nStr) counts[Number(ch)]++;
  const out = [];
  for (let d = 0; d <= 9; d++) if (counts[d] > 0) out.push("Digit " + d + ": " + counts[d]);
  return out.join("\n");
}
function countdown(n) {
  const out = [];
  for (let v = n; v >= 1; v--) out.push(String(v));
  out.push("Liftoff!");
  return out.join("\n");
}
function perfect(a, b) {
  const out = [];
  for (let n = a; n <= b; n++) {
    let s = 0;
    for (let d = 1; d <= Math.floor(n / 2); d++) if (n % d === 0) s += d;
    if (s === n) out.push(n);
  }
  return out.length ? out.join("\n") : "None";
}
function pyramid(n) {
  const out = [];
  for (let i = 1; i <= n; i++) {
    let line = " ".repeat(n - i);
    for (let up = 1; up <= i; up++) line += String(up);
    for (let down = i - 1; down >= 1; down--) line += String(down);
    out.push(line);
  }
  return out.join("\n");
}
function stars(rows, seats) {
  const out = [];
  for (let r = 1; r <= rows; r++) out.push("*".repeat(seats));
  return out.join("\n");
}
function starTriangle(n) {
  const out = [];
  for (let i = 1; i <= n; i++) out.push("*".repeat(i));
  return out.join("\n");
}

/* ── code questions ── */
const code = [];

code.push({
  title: "Sum of First N Natural Numbers",
  description: `Read an integer n and print the sum of all natural numbers from 1 to n using a for loop.

Input Format:
A single integer n.

Output Format:
One line containing the sum 1 + 2 + ... + n.

Constraints:
1 <= n <= 100000`,
  difficulty: "easy", variant: "basic", maxscore: 10, lang: "java",
  topic: TOPIC, subtopic: "for Loop",
  sampleinput1: "5", sampleoutput1: "15",
  sampleinput2: "10", sampleoutput2: "55",
  input1: "1", output1: "1",
  input2: "100", output2: "5050",
  input3: "100000", output3: "5000050000",
  inputconstrains: "1 <= n <= 100000",
  blacklist: "", whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        long sum = 0;
        for(int i = 1; i <= n; i++) {
            sum += i;
        }
        System.out.println(sum);
    }
}`,
});

code.push({
  title: "Multiplication Table",
  description: `Read an integer n and print its multiplication table from 1 to 10, one line per row.

Input Format:
A single integer n.

Output Format:
10 lines, each in the form: n x i = product (for i from 1 to 10).

Constraints:
1 <= n <= 20`,
  difficulty: "easy", variant: "basic", maxscore: 10, lang: "java",
  topic: TOPIC, subtopic: "for Loop",
  sampleinput1: "5", sampleoutput1: multTable(5),
  sampleinput2: "7", sampleoutput2: multTable(7),
  input1: "1", output1: multTable(1),
  input2: "9", output2: multTable(9),
  input3: "12", output3: multTable(12),
  inputconstrains: "1 <= n <= 20",
  blacklist: "", whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        for(int i = 1; i <= 10; i++) {
            System.out.println(n + " x " + i + " = " + (n * i));
        }
    }
}`,
});

code.push({
  title: "Canteen Daily Sales Report",
  description: `The college canteen recorded the order amount of every customer today. Given n customers and their order amounts, walk the amounts with a single for loop and produce the day's report: the total sales and the highest single order.

Input Format:
The first token is n. The next n tokens are the order amounts.

Output Format:
Line 1: Total: <sum of all amounts>
Line 2: Highest: <largest single amount>

Constraints:
1 <= n <= 1000, 1 <= amount <= 10000`,
  difficulty: "medium", variant: "scenario", maxscore: 20, lang: "java",
  topic: TOPIC, subtopic: "for Loop",
  sampleinput1: "5 120 80 150 60 70", sampleoutput1: "Total: 480\nHighest: 150",
  sampleinput2: "1 250", sampleoutput2: "Total: 250\nHighest: 250",
  input1: "4 9999 1 5000 9999", output1: "Total: 24999\nHighest: 9999",
  input2: "3 1 2 3", output2: "Total: 6\nHighest: 3",
  input3: "7 10 20 30 40 50 60 70", output3: "Total: 280\nHighest: 70",
  inputconstrains: "1 <= n <= 1000, 1 <= amount <= 10000",
  blacklist: "IntStream, Arrays.stream", whitelist: "for(",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        long total = 0;
        int highest = 0;
        for(int i = 0; i < n; i++) {
            int amount = sc.nextInt();
            total += amount;
            if(amount > highest) {
                highest = amount;
            }
        }
        System.out.println("Total: " + total);
        System.out.println("Highest: " + highest);
    }
}`,
});

code.push({
  title: "First N Fibonacci Numbers",
  description: `The math club wants a poster showing the first n Fibonacci numbers, starting from 0 and 1 (0 1 1 2 3 5 ...). Print them on one line separated by single spaces. Values grow quickly, so use long arithmetic.

Input Format:
A single integer n.

Output Format:
One line with the first n Fibonacci numbers separated by single spaces.

Constraints:
1 <= n <= 50`,
  difficulty: "medium", variant: "scenario", maxscore: 20, lang: "java",
  topic: TOPIC, subtopic: "for Loop",
  sampleinput1: "1", sampleoutput1: "0",
  sampleinput2: "10", sampleoutput2: "0 1 1 2 3 5 8 13 21 34",
  input1: "2", output1: "0 1",
  input2: "5", output2: "0 1 1 2 3",
  input3: "50", output3: fibList(50),
  inputconstrains: "1 <= n <= 50",
  blacklist: "ArrayList, Map", whitelist: "for(",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        long a = 0;
        long b = 1;
        for(int i = 1; i <= n; i++) {
            System.out.print(a);
            if(i < n) {
                System.out.print(" ");
            }
            long next = a + b;
            a = b;
            b = next;
        }
        System.out.println();
    }
}`,
});

code.push({
  title: "Factorial Using while",
  description: `Read an integer n and print n factorial (1 x 2 x ... x n) using a while loop. Note that 20! exceeds the range of int, so accumulate in a long.

Input Format:
A single integer n.

Output Format:
One line containing n!.

Constraints:
1 <= n <= 20`,
  difficulty: "easy", variant: "basic", maxscore: 10, lang: "java",
  topic: TOPIC, subtopic: "while Loop",
  sampleinput1: "5", sampleoutput1: "120",
  sampleinput2: "1", sampleoutput2: "1",
  input1: "10", output1: "3628800",
  input2: "15", output2: "1307674368000",
  input3: "20", output3: "2432902008176640000",
  inputconstrains: "1 <= n <= 20",
  blacklist: "", whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        long fact = 1;
        int i = 1;
        while(i <= n) {
            fact = fact * i;
            i++;
        }
        System.out.println(fact);
    }
}`,
});

code.push({
  title: "Count the Digits",
  description: `Read an integer n and count how many digits it has using a while loop that divides the number by 10 repeatedly until it becomes 0.

Input Format:
A single integer n.

Output Format:
One line with the number of digits.

Constraints:
1 <= n <= 2000000000`,
  difficulty: "easy", variant: "basic", maxscore: 10, lang: "java",
  topic: TOPIC, subtopic: "while Loop",
  sampleinput1: "4521", sampleoutput1: "4",
  sampleinput2: "7", sampleoutput2: "1",
  input1: "100", output1: "3",
  input2: "2000000000", output2: "10",
  input3: "99999", output3: "5",
  inputconstrains: "1 <= n <= 2000000000",
  blacklist: "", whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int count = 0;
        int temp = n;
        while(temp > 0) {
            temp = temp / 10;
            count++;
        }
        System.out.println(count);
    }
}`,
});

code.push({
  title: "Savings Goal with Monthly Interest",
  description: `Aarav opens a savings account with an initial balance and deposits a fixed amount at the start of every month. At the end of each month the bank adds 2 percent interest, computed with integer math as balance = balance + balance * 2 / 100. Simulate month by month with a while loop until the balance reaches or exceeds the target, then report the number of months needed and the final balance (if the initial balance already meets the target, 0 months pass).

Input Format:
One line with three integers: initial balance, monthly deposit, and target.

Output Format:
Line 1: the number of months needed.
Line 2: the final balance.

Constraints:
1 <= initial <= 10000, 1 <= deposit <= 1000, 1 <= target <= 1000000`,
  difficulty: "medium", variant: "scenario", maxscore: 20, lang: "java",
  topic: TOPIC, subtopic: "while Loop",
  sampleinput1: "100 50 300", sampleoutput1: savings(100, 50, 300),
  sampleinput2: "300 100 1000", sampleoutput2: savings(300, 100, 1000),
  input1: "500 10 520", output1: savings(500, 10, 520),
  input2: "1000 1 1000", output2: savings(1000, 1, 1000),
  input3: "1 100 250", output3: savings(1, 100, 250),
  inputconstrains: "1 <= initial <= 10000, 1 <= deposit <= 1000, 1 <= target <= 1000000",
  blacklist: "Math.pow", whitelist: "while(",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long balance = sc.nextLong();
        long deposit = sc.nextLong();
        long target = sc.nextLong();
        int months = 0;
        while(balance < target) {
            balance = balance + deposit;
            balance = balance + balance * 2 / 100;
            months++;
        }
        System.out.println(months);
        System.out.println(balance);
    }
}`,
});

code.push({
  title: "Collatz Longest Chain",
  description: `A math hobbyist studies the Collatz rule: for an even value the next value is value / 2, and for an odd value it is 3 * value + 1; every starting value eventually reaches 1. For every starting value from a to b (inclusive), count the number of steps needed to reach 1. Report the starting value with the longest chain and its step count. If several values tie, the smallest of them wins: scan from a upward and keep only strictly greater improvements.

Input Format:
One line with two integers a and b.

Output Format:
Line 1: the starting value with the most steps.
Line 2: that step count.

Constraints:
1 <= a <= b <= 10000`,
  difficulty: "hard", variant: "scenario", maxscore: 30, lang: "java",
  topic: TOPIC, subtopic: "while Loop",
  sampleinput1: "1 2", sampleoutput1: collatzBest(1, 2),
  sampleinput2: "3 3", sampleoutput2: collatzBest(3, 3),
  input1: "6 7", output1: collatzBest(6, 7),
  input2: "1 10", output2: collatzBest(1, 10),
  input3: "1 100", output3: collatzBest(1, 100),
  inputconstrains: "1 <= a <= b <= 10000",
  blacklist: "HashMap, Map", whitelist: "while(",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        int bestNumber = a;
        int bestSteps = 0;
        for(int n = a; n <= b; n++) {
            int steps = 0;
            long value = n;
            while(value != 1) {
                if(value % 2 == 0) {
                    value = value / 2;
                } else {
                    value = 3 * value + 1;
                }
                steps++;
            }
            if(steps > bestSteps) {
                bestSteps = steps;
                bestNumber = n;
            }
        }
        System.out.println(bestNumber);
        System.out.println(bestSteps);
    }
}`,
});

code.push({
  title: "Sum Until the Zero Sentinel",
  description: `A cashier terminal accepts integers one by one until the sentinel value 0 appears; the 0 ends the session and is not counted as a sale. Read the values with a do-while loop and print the sum of all values before the sentinel.

Input Format:
A sequence of integers terminated by 0 (the final 0 ends the input).

Output Format:
One line with the sum of all values before the sentinel.

Constraints:
1 to 1000 values before the sentinel 0, each between -10000 and 10000`,
  difficulty: "easy", variant: "basic", maxscore: 10, lang: "java",
  topic: TOPIC, subtopic: "do-while Loop",
  sampleinput1: "5 10 15 0", sampleoutput1: "30",
  sampleinput2: "7 0", sampleoutput2: "7",
  input1: "-5 5 12 0", output1: "12",
  input2: "1000 -1000 999 0", output2: "999",
  input3: "1 2 3 4 5 6 7 8 9 10 0", output3: "55",
  inputconstrains: "1 to 1000 values before the sentinel 0, each between -10000 and 10000",
  blacklist: "", whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long sum = 0;
        int value;
        do {
            value = sc.nextInt();
            sum += value;
        } while(value != 0);
        System.out.println(sum);
    }
}`,
});

code.push({
  title: "Launch Countdown Timer",
  description: `Mission control runs a launch countdown: starting from n, print one number per line down to 1, then print Liftoff!. Use a do-while loop so the countdown body always executes at least once.

Input Format:
A single integer n.

Output Format:
One line per countdown value from n down to 1, followed by the line Liftoff!.

Constraints:
1 <= n <= 100`,
  difficulty: "easy", variant: "scenario", maxscore: 10, lang: "java",
  topic: TOPIC, subtopic: "do-while Loop",
  sampleinput1: "3", sampleoutput1: countdown(3),
  sampleinput2: "5", sampleoutput2: countdown(5),
  input1: "1", output1: countdown(1),
  input2: "2", output2: countdown(2),
  input3: "7", output3: countdown(7),
  inputconstrains: "1 <= n <= 100",
  blacklist: "", whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        do {
            System.out.println(n);
            n--;
        } while(n >= 1);
        System.out.println("Liftoff!");
    }
}`,
});

code.push({
  title: "ATM PIN Retry",
  description: `An ATM asks for a PIN and keeps prompting until the correct one is entered. The first token of the input is the correct PIN, followed by the PINs the customer actually typed, in order; the last attempt always matches. Simulate the retries with a do-while loop (each attempt must be checked after it is read) and print which attempt number finally grants access.

Input Format:
The first token is the correct PIN. The remaining tokens are the entered PINs in order; the last of them equals the correct PIN.

Output Format:
One line: Access granted on attempt X, where X is the 1-based number of the matching attempt.

Constraints:
PIN strings of 1 to 8 digits, at most 5 attempts, the last attempt is correct`,
  difficulty: "easy", variant: "scenario", maxscore: 10, lang: "java",
  topic: TOPIC, subtopic: "do-while Loop",
  sampleinput1: "1234 1111 1234", sampleoutput1: "Access granted on attempt 2",
  sampleinput2: "9090 9090", sampleoutput2: "Access granted on attempt 1",
  input1: "0007 1234 5678 0007", output1: "Access granted on attempt 3",
  input2: "4321 9999 1111 2222 4321", output2: "Access granted on attempt 4",
  input3: "1212 1212 3456", output3: "Access granted on attempt 1",
  inputconstrains: "PIN strings of 1 to 8 digits, at most 5 attempts, the last attempt is correct",
  blacklist: "", whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String pin = sc.next();
        String attempt;
        int tries = 0;
        do {
            attempt = sc.next();
            tries++;
        } while(!attempt.equals(pin));
        System.out.println("Access granted on attempt " + tries);
    }
}`,
});

code.push({
  title: "Digit Frequency Report",
  description: `An auditor examines an account number and counts how many times each digit 0-9 occurs inside it. Extract the digits with a do-while loop (so the number 0 is also handled correctly), then print one line for every digit that occurs at least once, in ascending digit order.

Input Format:
A single integer n.

Output Format:
For each digit d that occurs in n, in ascending digit order: Digit d: count

Constraints:
0 <= n <= 1000000000000000`,
  difficulty: "medium", variant: "scenario", maxscore: 20, lang: "java",
  topic: TOPIC, subtopic: "do-while Loop",
  sampleinput1: "112233", sampleoutput1: digitFreq("112233"),
  sampleinput2: "0", sampleoutput2: digitFreq("0"),
  input1: "909090", output1: digitFreq("909090"),
  input2: "1234567890", output2: digitFreq("1234567890"),
  input3: "777777777777777", output3: digitFreq("777777777777777"),
  inputconstrains: "0 <= n <= 1000000000000000",
  blacklist: "HashMap, Map", whitelist: "do {",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long n = sc.nextLong();
        int[] counts = new int[10];
        do {
            int d = (int)(n % 10);
            counts[d]++;
            n = n / 10;
        } while(n > 0);
        for(int d = 0; d <= 9; d++) {
            if(counts[d] > 0) {
                System.out.println("Digit " + d + ": " + counts[d]);
            }
        }
    }
}`,
});

code.push({
  title: "Array Sum with Enhanced For",
  description: `Read n integers into an int array, then use an enhanced for loop (for(int v : array)) to compute and print their sum.

Input Format:
The first token is n. The next n tokens are the array elements.

Output Format:
One line with the sum of all elements.

Constraints:
1 <= n <= 1000, each element between -1000000 and 1000000`,
  difficulty: "easy", variant: "basic", maxscore: 10, lang: "java",
  topic: TOPIC, subtopic: "Enhanced For Loop",
  sampleinput1: "5 1 2 3 4 5", sampleoutput1: "15",
  sampleinput2: "3 10 20 30", sampleoutput2: "60",
  input1: "1 7", output1: "7",
  input2: "4 -1 -2 3 4", output2: "4",
  input3: "6 100000 100000 100000 100000 100000 100000", output3: "600000",
  inputconstrains: "1 <= n <= 1000, each element between -1000000 and 1000000",
  blacklist: "", whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] values = new int[n];
        for(int i = 0; i < n; i++) {
            values[i] = sc.nextInt();
        }
        long sum = 0;
        for(int v : values) {
            sum += v;
        }
        System.out.println(sum);
    }
}`,
});

code.push({
  title: "Shop Billing Total",
  description: `A shopkeeper bills n customers, one item each. Read the n prices into an array, then walk the array with an enhanced for loop and report the day's total sales and how many premium items (price strictly greater than 100) were sold.

Input Format:
The first token is n. The next n tokens are the prices.

Output Format:
Line 1: Total: <sum of all prices>
Line 2: Premium items: <count of prices greater than 100>

Constraints:
1 <= n <= 1000, 1 <= price <= 10000`,
  difficulty: "easy", variant: "scenario", maxscore: 10, lang: "java",
  topic: TOPIC, subtopic: "Enhanced For Loop",
  sampleinput1: "4 250 90 120 60", sampleoutput1: "Total: 520\nPremium items: 2",
  sampleinput2: "1 100", sampleoutput2: "Total: 100\nPremium items: 0",
  input1: "5 101 100 150 99 175", output1: "Total: 625\nPremium items: 3",
  input2: "3 45 55 65", output2: "Total: 165\nPremium items: 0",
  input3: "2 500 500", output3: "Total: 1000\nPremium items: 2",
  inputconstrains: "1 <= n <= 1000, 1 <= price <= 10000",
  blacklist: "", whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] prices = new int[n];
        for(int i = 0; i < n; i++) {
            prices[i] = sc.nextInt();
        }
        long total = 0;
        int premium = 0;
        for(int price : prices) {
            total += price;
            if(price > 100) {
                premium++;
            }
        }
        System.out.println("Total: " + total);
        System.out.println("Premium items: " + premium);
    }
}`,
});

code.push({
  title: "Temperature Min and Max in One Pass",
  description: `A weather station logged n temperature readings for the day. Using a single enhanced for loop pass (no sorting, no Math.max or Math.min), find the lowest and the highest reading.

Input Format:
The first token is n. The next n tokens are the readings.

Output Format:
Line 1: Min: <lowest reading>
Line 2: Max: <highest reading>

Constraints:
1 <= n <= 100000, each reading between -50 and 60`,
  difficulty: "medium", variant: "scenario", maxscore: 20, lang: "java",
  topic: TOPIC, subtopic: "Enhanced For Loop",
  sampleinput1: "5 12 -3 27 8 15", sampleoutput1: "Min: -3\nMax: 27",
  sampleinput2: "1 42", sampleoutput2: "Min: 42\nMax: 42",
  input1: "6 0 0 0 0 0 0", output1: "Min: 0\nMax: 0",
  input2: "7 -50 60 -49 59 0 60 -50", output2: "Min: -50\nMax: 60",
  input3: "10 5 4 3 2 1 9 8 7 6 10", output3: "Min: 1\nMax: 10",
  inputconstrains: "1 <= n <= 100000, each reading between -50 and 60",
  blacklist: "Arrays.sort, Math.max, Math.min", whitelist: "for(",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] readings = new int[n];
        for(int i = 0; i < n; i++) {
            readings[i] = sc.nextInt();
        }
        int min = readings[0];
        int max = readings[0];
        for(int t : readings) {
            if(t < min) {
                min = t;
            }
            if(t > max) {
                max = t;
            }
        }
        System.out.println("Min: " + min);
        System.out.println("Max: " + max);
    }
}`,
});

code.push({
  title: "Runner-Up Score Hunt",
  description: `A gaming leaderboard stores n scores. Without sorting the array, use enhanced for loops to find the champion score and then the best score that is strictly below it (the runner-up). If every score is identical, the runner-up does not exist.

Input Format:
The first token is n. The next n tokens are the scores.

Output Format:
One line with the runner-up score, or the single line No second place when all scores are equal.

Constraints:
1 <= n <= 100000, 0 <= score <= 1000000000`,
  difficulty: "hard", variant: "scenario", maxscore: 30, lang: "java",
  topic: TOPIC, subtopic: "Enhanced For Loop",
  sampleinput1: "5 70 90 85 90 60", sampleoutput1: "85",
  sampleinput2: "3 5 5 5", sampleoutput2: "No second place",
  input1: "1 7", output1: "No second place",
  input2: "4 1 2 3 4", output2: "3",
  input3: "6 10 10 9 9 8 2", output3: "9",
  inputconstrains: "1 <= n <= 100000, 0 <= score <= 1000000000",
  blacklist: "Arrays.sort", whitelist: "for(",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] scores = new int[n];
        for(int i = 0; i < n; i++) {
            scores[i] = sc.nextInt();
        }
        int best = scores[0];
        for(int s : scores) {
            if(s > best) {
                best = s;
            }
        }
        int second = 0;
        boolean found = false;
        for(int s : scores) {
            if(s < best) {
                if(!found || s > second) {
                    second = s;
                    found = true;
                }
            }
        }
        if(found) {
            System.out.println(second);
        } else {
            System.out.println("No second place");
        }
    }
}`,
});

code.push({
  title: "Cinema Seat Map",
  description: `A cinema's ticketing screen shows the seat map for a hall with n rows and m seats in each row, every seat drawn as a star. Print the map with nested loops: one line per row and m stars on each line.

Input Format:
One line with two integers: rows and seats per row.

Output Format:
n lines, each containing m star characters.

Constraints:
1 <= rows <= 20, 1 <= seats <= 20`,
  difficulty: "easy", variant: "scenario", maxscore: 10, lang: "java",
  topic: TOPIC, subtopic: "Nested Loops",
  sampleinput1: "3 4", sampleoutput1: stars(3, 4),
  sampleinput2: "1 1", sampleoutput2: stars(1, 1),
  input1: "2 5", output1: stars(2, 5),
  input2: "4 3", output2: stars(4, 3),
  input3: "5 5", output3: stars(5, 5),
  inputconstrains: "1 <= rows <= 20, 1 <= seats <= 20",
  blacklist: "", whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int rows = sc.nextInt();
        int seats = sc.nextInt();
        for(int r = 1; r <= rows; r++) {
            for(int s = 1; s <= seats; s++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}`,
});

code.push({
  title: "Right-Angled Star Triangle",
  description: `For the school's annual day banner, print a right-angled star triangle with n rows: row i (1-based) contains exactly i star characters. Build it with nested for loops, printing the stars of each row and then moving to the next line.

Input Format:
A single integer n.

Output Format:
n lines; line i contains i star characters.

Constraints:
1 <= n <= 50`,
  difficulty: "medium", variant: "scenario", maxscore: 20, lang: "java",
  topic: TOPIC, subtopic: "Nested Loops",
  sampleinput1: "4", sampleoutput1: starTriangle(4),
  sampleinput2: "1", sampleoutput2: starTriangle(1),
  input1: "3", output1: starTriangle(3),
  input2: "6", output2: starTriangle(6),
  input3: "5", output3: starTriangle(5),
  inputconstrains: "1 <= n <= 50",
  blacklist: "String.repeat, StringBuilder", whitelist: "for(",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        for(int row = 1; row <= n; row++) {
            for(int star = 1; star <= row; star++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}`,
});

code.push({
  title: "Perfect Numbers in a Range",
  description: `The math society hunts perfect numbers: a number is perfect when it equals the sum of its proper divisors (for example 6 = 1 + 2 + 3). Scan every number from a to b; for each one add up its divisors from 1 up to n / 2 with an inner loop, then compare the sum with the number itself. Print every perfect number found, one per line in ascending order; if the range contains none, print None.

Input Format:
One line with two integers a and b.

Output Format:
One line per perfect number in ascending order, or the single line None if there is no perfect number in the range.

Constraints:
1 <= a <= b <= 10000`,
  difficulty: "hard", variant: "scenario", maxscore: 30, lang: "java",
  topic: TOPIC, subtopic: "Nested Loops",
  sampleinput1: "1 30", sampleoutput1: perfect(1, 30),
  sampleinput2: "29 30", sampleoutput2: perfect(29, 30),
  input1: "2 10", output1: perfect(2, 10),
  input2: "100 900", output2: perfect(100, 900),
  input3: "8000 8200", output3: perfect(8000, 8200),
  inputconstrains: "1 <= a <= b <= 10000",
  blacklist: "Math.sqrt", whitelist: "for(",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        boolean foundAny = false;
        for(int n = a; n <= b; n++) {
            int divisorSum = 0;
            for(int d = 1; d <= n / 2; d++) {
                if(n % d == 0) {
                    divisorSum += d;
                }
            }
            if(divisorSum == n) {
                System.out.println(n);
                foundAny = true;
            }
        }
        if(!foundAny) {
            System.out.println("None");
        }
    }
}`,
});

code.push({
  title: "Digit Pyramid",
  description: `Print a centered digit pyramid with n rows. Row i starts with (n - i) leading spaces, then the digits 1 to i in ascending order, then the digits i - 1 down to 1. The leading spaces are part of the output and must be printed exactly.

Input Format:
A single integer n.

Output Format:
n lines forming the pyramid.

Constraints:
1 <= n <= 9`,
  difficulty: "hard", variant: "scenario", maxscore: 30, lang: "java",
  topic: TOPIC, subtopic: "Nested Loops",
  sampleinput1: "5", sampleoutput1: pyramid(5),
  sampleinput2: "1", sampleoutput2: pyramid(1),
  input1: "3", output1: pyramid(3),
  input2: "4", output2: pyramid(4),
  input3: "9", output3: pyramid(9),
  inputconstrains: "1 <= n <= 9",
  blacklist: "StringBuilder, String.repeat", whitelist: "for(",
  sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        for(int row = 1; row <= n; row++) {
            String line = "";
            for(int space = 1; space <= n - row; space++) {
                line = line + " ";
            }
            for(int up = 1; up <= row; up++) {
                line = line + up;
            }
            for(int down = row - 1; down >= 1; down--) {
                line = line + down;
            }
            System.out.println(line);
        }
    }
}`,
});

/* ── MCQ questions ── */
const mcq = [];

mcq.push({
  title: "for Loop Execution Order",
  description: "In a standard Java for loop, in what order do the header parts execute during one full iteration cycle?",
  difficulty: "easy", topic: TOPIC, subtopic: "for Loop",
  Option1: "Initialization, condition, body, update",
  Option2: "Initialization, body, condition, update",
  Option3: "Condition, initialization, body, update",
  Option4: "Initialization, update, condition, body",
  CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null,
});

mcq.push({
  title: "while Loop Zero Iterations",
  description: "What happens when the condition of a while loop evaluates to false before the very first iteration?",
  difficulty: "easy", topic: TOPIC, subtopic: "while Loop",
  Option1: "The loop body executes exactly once",
  Option2: "The loop body is skipped entirely and execution continues after the loop",
  Option3: "A compilation error occurs",
  Option4: "The loop runs forever",
  CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null,
});

mcq.push({
  title: "do-while Minimum Runs",
  description: "Regardless of its condition, how many times does the body of a Java do-while loop always execute?",
  difficulty: "easy", topic: TOPIC, subtopic: "do-while Loop",
  Option1: "Zero times",
  Option2: "It depends on the condition and the input",
  Option3: "At least one time",
  Option4: "Exactly two times",
  CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null,
});

mcq.push({
  title: "Enhanced For Loop Syntax",
  description: "Which of the following is the correct syntax for an enhanced for loop that iterates over an int array named arr?",
  difficulty: "easy", topic: TOPIC, subtopic: "Enhanced For Loop",
  Option1: "for(int x in arr)",
  Option2: "for(int x : arr)",
  Option3: "foreach(int x in arr)",
  Option4: "for(int x of arr)",
  CorrectOption: 2, iscodesnippet: false, codesnippet: null, snippetLang: null,
});

mcq.push({
  title: "Sum with a for Loop",
  description: "What does the following Java code print?",
  difficulty: "easy", topic: TOPIC, subtopic: "for Loop",
  Option1: "10",
  Option2: "4",
  Option3: "15",
  Option4: "6",
  CorrectOption: 1,
  iscodesnippet: true,
  codesnippet: `int sum = 0;
for(int i = 1; i <= 4; i++) {
    sum += i;
}
System.out.println(sum);`,
  snippetLang: "java",
});

mcq.push({
  title: "Countdown with while",
  description: "What does the following Java code print?",
  difficulty: "easy", topic: TOPIC, subtopic: "while Loop",
  Option1: "4, 3, 2, 1, 0 each on a separate line",
  Option2: "Nothing, because the condition is false at the start",
  Option3: "5, 4, 3, 2, 1, 0 each on a separate line",
  Option4: "5, 4, 3, 2, 1 each on a separate line",
  CorrectOption: 4,
  iscodesnippet: true,
  codesnippet: `int i = 5;
while(i > 0) {
    System.out.println(i);
    i--;
}`,
  snippetLang: "java",
});

mcq.push({
  title: "Nested Loop Iteration Count",
  description: "An outer loop runs 3 times and, on each of its passes, the inner loop runs 4 times. How many times does the innermost statement execute in total?",
  difficulty: "easy", topic: TOPIC, subtopic: "Nested Loops",
  Option1: "7",
  Option2: "4",
  Option3: "12",
  Option4: "34",
  CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null,
});

mcq.push({
  title: "do-while Runs Once",
  description: "What does the following Java code print?",
  difficulty: "easy", topic: TOPIC, subtopic: "do-while Loop",
  Option1: "It prints 10 once",
  Option2: "It prints nothing",
  Option3: "It prints 10 and then 20",
  Option4: "It loops forever printing 10",
  CorrectOption: 1,
  iscodesnippet: true,
  codesnippet: `int n = 10;
do {
    System.out.println(n);
    n = n + 10;
} while(n < 10);`,
  snippetLang: "java",
});

mcq.push({
  title: "Enhanced For Index Limitation",
  description: "While iterating an int array with an enhanced for loop (for(int x : arr)), which operation is NOT directly possible?",
  difficulty: "easy", topic: TOPIC, subtopic: "Enhanced For Loop",
  Option1: "Adding all elements into a total",
  Option2: "Printing each element",
  Option3: "Accessing the position (index) of the current element",
  Option4: "Comparing each element against a threshold",
  CorrectOption: 3, iscodesnippet: false, codesnippet: null, snippetLang: null,
});

mcq.push({
  title: "Omitting for Loop Parts",
  description: "Which parts of a Java for loop header can legally be left empty, as in for(;;)?",
  difficulty: "easy", topic: TOPIC, subtopic: "for Loop",
  Option1: "Only the update part can be omitted",
  Option2: "No part can ever be omitted",
  Option3: "Only the initialization can be omitted",
  Option4: "Any part can be omitted as long as the two semicolons remain",
  CorrectOption: 4, iscodesnippet: false, codesnippet: null, snippetLang: null,
});

mcq.push({
  title: "Off-By-One While Trace",
  description: "What does the following Java code print?",
  difficulty: "medium", topic: TOPIC, subtopic: "while Loop",
  Option1: "2 4 6 8 10",
  Option2: "1 2 3 4",
  Option3: "2 4 6 8",
  Option4: "2 4 6",
  CorrectOption: 3,
  iscodesnippet: true,
  codesnippet: `int i = 1;
while(i < 5) {
    System.out.print(i * 2 + " ");
    i++;
}`,
  snippetLang: "java",
});

mcq.push({
  title: "break Inside Nested Loops",
  description: "What does the following Java code print?",
  difficulty: "medium", topic: TOPIC, subtopic: "Nested Loops",
  Option1: "12",
  Option2: "6",
  Option3: "9",
  Option4: "3",
  CorrectOption: 2,
  iscodesnippet: true,
  codesnippet: `int count = 0;
for(int i = 0; i < 3; i++) {
    for(int j = 0; j < 4; j++) {
        if(j == 2) {
            break;
        }
        count++;
    }
}
System.out.println(count);`,
  snippetLang: "java",
});

mcq.push({
  title: "Loop Variable Scope",
  description: "What happens when this Java code is compiled and run?",
  difficulty: "medium", topic: TOPIC, subtopic: "for Loop",
  Option1: "It prints 0122",
  Option2: "It prints 0123",
  Option3: "Compilation fails because i is not visible after the loop",
  Option4: "It prints 0120",
  CorrectOption: 3,
  iscodesnippet: true,
  codesnippet: `for(int i = 0; i < 3; i++) {
    System.out.print(i);
}
System.out.println(i);`,
  snippetLang: "java",
});

mcq.push({
  title: "While Loop That Skips Zero",
  description: "Which statement best describes the behavior of this Java code?",
  difficulty: "medium", topic: TOPIC, subtopic: "while Loop",
  Option1: "It never terminates because x jumps from 1 to -1 and never equals 0",
  Option2: "It prints 5, 3, 1 and then stops",
  Option3: "It prints 5 and 3, then stops",
  Option4: "It prints nothing at all",
  CorrectOption: 1,
  iscodesnippet: true,
  codesnippet: `int x = 5;
while(x != 0) {
    System.out.println(x);
    x = x - 2;
}`,
  snippetLang: "java",
});

mcq.push({
  title: "Choosing do-while",
  description: "In which situation is a do-while loop the most appropriate choice over a while loop?",
  difficulty: "medium", topic: TOPIC, subtopic: "do-while Loop",
  Option1: "When the loop body must execute at least once before the condition is checked",
  Option2: "When the loop may need to execute zero times",
  Option3: "When you need to iterate over an array",
  Option4: "When you want to exit the loop early using break",
  CorrectOption: 1, iscodesnippet: false, codesnippet: null, snippetLang: null,
});

mcq.push({
  title: "Enhanced For Loop Variable Copy",
  description: "What does the following Java code print?",
  difficulty: "medium", topic: TOPIC, subtopic: "Enhanced For Loop",
  Option1: "20",
  Option2: "10",
  Option3: "30",
  Option4: "2",
  CorrectOption: 4,
  iscodesnippet: true,
  codesnippet: `int[] a = {1, 2, 3};
for(int v : a) {
    v = v * 10;
}
System.out.println(a[1]);`,
  snippetLang: "java",
});

mcq.push({
  title: "Triangular Nested Sum",
  description: "What does the following Java code print?",
  difficulty: "hard", topic: TOPIC, subtopic: "Nested Loops",
  Option1: "10",
  Option2: "24",
  Option3: "16",
  Option4: "20",
  CorrectOption: 4,
  iscodesnippet: true,
  codesnippet: `int total = 0;
for(int i = 1; i <= 4; i++) {
    for(int j = 1; j <= i; j++) {
        total += j;
    }
}
System.out.println(total);`,
  snippetLang: "java",
});

mcq.push({
  title: "continue Keeps the Update",
  description: "What does the following Java code print?",
  difficulty: "hard", topic: TOPIC, subtopic: "for Loop",
  Option1: "21",
  Option2: "9",
  Option3: "12",
  Option4: "6",
  CorrectOption: 2,
  iscodesnippet: true,
  codesnippet: `int sum = 0;
for(int i = 1; i <= 6; i++) {
    if(i % 2 == 0) {
        continue;
    }
    sum += i;
}
System.out.println(sum);`,
  snippetLang: "java",
});

mcq.push({
  title: "Two Variables in One for Header",
  description: "What does the following Java code print?",
  difficulty: "hard", topic: TOPIC, subtopic: "for Loop",
  Option1: "10",
  Option2: "6",
  Option3: "5",
  Option4: "4",
  CorrectOption: 3,
  iscodesnippet: true,
  codesnippet: `int a = 0;
for(int i = 0, j = 10; i < j; i++, j--) {
    a++;
}
System.out.println(a);`,
  snippetLang: "java",
});

mcq.push({
  title: "Collatz Step Count Trace",
  description: "What does the following Java code print?",
  difficulty: "hard", topic: TOPIC, subtopic: "while Loop",
  Option1: "24",
  Option2: "26",
  Option3: "27",
  Option4: "25",
  CorrectOption: 4,
  iscodesnippet: true,
  codesnippet: `int n = 100;
int steps = 0;
while(n > 1) {
    if(n % 2 == 0) {
        n = n / 2;
    } else {
        n = 3 * n + 1;
    }
    steps++;
}
System.out.println(steps);`,
  snippetLang: "java",
});

/* ── sanity checks mirroring the validator + hand-verified spot checks ── */
function assert(cond, msg) { if (!cond) throw new Error("ASSERTION FAILED: " + msg); }

assert(code.length === 20, "code count " + code.length);
assert(mcq.length === 20, "mcq count " + mcq.length);

const cd = { easy: 0, medium: 0, hard: 0 };
code.forEach((q) => cd[q.difficulty]++);
assert(cd.easy === 10 && cd.medium === 6 && cd.hard === 4, "code difficulty split " + JSON.stringify(cd));
const basics = code.filter((q) => q.difficulty === "easy" && q.variant === "basic").length;
const scenE = code.filter((q) => q.difficulty === "easy" && q.variant === "scenario").length;
assert(basics === 6 && scenE === 4, "easy split basic=" + basics + " scenario=" + scenE);
const md = { easy: 0, medium: 0, hard: 0 };
mcq.forEach((q) => md[q.difficulty]++);
assert(md.easy === 10 && md.medium === 6 && md.hard === 4, "mcq difficulty split " + JSON.stringify(md));

// subtopic coverage for code questions
for (const s of SUBTOPICS) {
  const c = code.filter((q) => q.subtopic === s).length;
  assert(c >= 1, "subtopic " + s + " coverage " + c);
}

// maxscores
code.forEach((q) => {
  const want = q.difficulty === "easy" ? 10 : q.difficulty === "medium" ? 20 : 30;
  assert(q.maxscore === want, "maxscore " + q.title);
});

// blacklist absent / whitelist present, no backslashes
for (const q of code) {
  for (const kw of q.blacklist.split(",").map((s) => s.trim()).filter(Boolean)) {
    assert(!q.sourcecode.includes(kw), "blacklist " + kw + " in " + q.title);
  }
  for (const kw of q.whitelist.split(",").map((s) => s.trim()).filter(Boolean)) {
    assert(q.sourcecode.includes(kw), "whitelist " + kw + " missing in " + q.title);
  }
  assert(!q.sourcecode.includes("\\"), "backslash in " + q.title);
  assert(q.sourcecode.includes("class Main"), "class Main in " + q.title);
}
for (const q of mcq) {
  assert(!q.description.includes("\\"), "backslash in mcq desc " + q.title);
  const opts = [q.Option1, q.Option2, q.Option3, q.Option4];
  assert(new Set(opts).size === 4, "distinct options " + q.title);
  if (q.iscodesnippet) {
    assert(q.codesnippet && q.snippetLang === "java", "snippet fields " + q.title);
    assert(!q.codesnippet.includes("\\"), "backslash in snippet " + q.title);
  } else {
    assert(q.codesnippet === null && q.snippetLang === null, "null snippet " + q.title);
  }
}
assert(mcq.filter((q) => q.iscodesnippet).length >= 6, "snippets >= 6");

// titles unique
assert(new Set(code.map((q) => q.title)).size === 20, "unique code titles");
assert(new Set(mcq.map((q) => q.title)).size === 20, "unique mcq titles");

// spot checks of computed helpers against hand-derived values
assert(fibList(10) === "0 1 1 2 3 5 8 13 21 34", "fib10");
assert(fibList(50).split(" ").length === 50, "fib50 count");
assert(savings(100, 50, 300) === "4\n318", "savings1");
assert(savings(300, 100, 1000) === "7\n1100", "savings2");
assert(collatzBest(1, 10) === "9\n19", "collatz 1-10");
assert(collatzBest(1, 100) === "97\n118", "collatz 1-100");
assert(collatzBest(3, 3) === "3\n7", "collatz 3");
assert(collatzBest(6, 7) === "7\n16", "collatz 6-7");
assert(collatzBest(1, 2) === "2\n1", "collatz 1-2");
assert(perfect(1, 30) === "6\n28", "perfect 1-30");
assert(perfect(100, 900) === "496", "perfect 100-900");
assert(perfect(8000, 8200) === "8128", "perfect 8000-8200");
assert(pyramid(5) === "    1\n   121\n  12321\n 1234321\n123454321", "pyramid5");
assert(pyramid(1) === "1", "pyramid1");
assert(countdown(1) === "1\nLiftoff!", "countdown1");
assert(digitFreq("0") === "Digit 0: 1", "digitFreq0");
assert(digitFreq("909090") === "Digit 0: 3\nDigit 9: 3", "digitFreq909090");
assert(multTable(5).split("\n").length === 10, "table rows");

/* ── write part files ── */
const dir = new URL("./", import.meta.url).pathname;
fs.writeFileSync(dir + "day-04.code.p1.json", JSON.stringify({ day: 4, topics, questions: code.slice(0, 10) }, null, 2) + "\n");
fs.writeFileSync(dir + "day-04.code.p2.json", JSON.stringify({ questions: code.slice(10) }, null, 2) + "\n");
fs.writeFileSync(dir + "day-04.mcq.p1.json", JSON.stringify({ day: 4, questions: mcq.slice(0, 10) }, null, 2) + "\n");
fs.writeFileSync(dir + "day-04.mcq.p2.json", JSON.stringify({ questions: mcq.slice(10) }, null, 2) + "\n");
console.log("wrote 4 part files: code " + code.length + " questions, mcq " + mcq.length + " questions");
console.log("easy basic=" + basics + " easy scenario=" + scenE + " medium=" + cd.medium + " hard=" + cd.hard);
console.log("snippets=" + mcq.filter((q) => q.iscodesnippet).length);
