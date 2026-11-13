/**
 * Day 18 generator — "OOPS using JAVA" — Multithreading and Concurrency
 * Writes the 4 part files consumed by merge-parts.ts:
 *   day-18.code.p1.json (day + topics + first 10 code)
 *   day-18.code.p2.json (last 10 code)
 *   day-18.mcq.p1.json  (first 10 mcq)
 *   day-18.mcq.p2.json  (last 10 mcq)
 *
 * Determinism policy (thread scheduling is unpredictable):
 *  - threads compute privately or mutate a synchronized counter;
 *  - main() joins ALL threads before printing anything aggregated;
 *  - thread counts <= 8, per-thread work is pure compute, no sleeps in output logic.
 */
import fs from "node:fs";
import path from "node:path";

const DIR = "/home/z/my-project/scripts/oops-java/data/parts";
fs.mkdirSync(DIR, { recursive: true });

const TOPIC = "Multithreading and Concurrency";
const SUBTOPICS = [
  "Creating Threads",
  "Runnable Interface",
  "Thread Lifecycle",
  "Synchronization",
  "Thread Methods",
];

const desc = (body, input, output, constraints) =>
  body + "\n\nInput Format:\n" + input + "\n\nOutput Format:\n" + output + "\n\nConstraints:\n" + constraints;

/* ─────────────────────────────── CODE QUESTIONS ─────────────────────────────── */

const codeQuestions = [];

// 1 ── easy basic ── Creating Threads
codeQuestions.push({
  title: "Square in a Thread",
  description: desc(
    "Extending Thread is the most direct way to create a thread in Java. Read one integer n, hand it to a thread that extends Thread, and let the thread's run() method compute the square into a shared result field. The main thread must start the thread, join() it, and only then print the result — join guarantees the worker finished before main reads the value.",
    "A single line with one integer n.",
    "One line: 'Square: x' where x is n squared.",
    "-1000 <= n <= 1000"
  ),
  difficulty: "easy",
  variant: "basic",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Creating Threads",
  sampleinput1: "5",
  sampleoutput1: "Square: 25",
  sampleinput2: "7",
  sampleoutput2: "Square: 49",
  input1: "12",
  output1: "Square: 144",
  input2: "0",
  output2: "Square: 0",
  input3: "-6",
  output3: "Square: 36",
  inputconstrains: "-1000 <= n <= 1000",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    static int number;
    static long result;

    static class SquareThread extends Thread {
        public void run() {
            result = (long) number * number;
        }
    }

    public static void main(String[] args) throws InterruptedException {
        Scanner sc = new Scanner(System.in);
        number = sc.nextInt();
        SquareThread worker = new SquareThread();
        worker.start();
        worker.join();
        System.out.println("Square: " + result);
    }
}`,
});

// 2 ── easy basic ── Runnable Interface
codeQuestions.push({
  title: "Sum of First N in a Runnable",
  description: desc(
    "A Runnable describes the work; a Thread executes it. Read one integer n, create an anonymous class implementing Runnable whose run() method computes the sum 1 + 2 + ... + n into a shared field, wrap it in a Thread, start it, and join() it before printing. join() guarantees the computation finished.",
    "A single line with one integer n.",
    "One line: 'Sum: s' where s = 1 + 2 + ... + n.",
    "1 <= n <= 1000"
  ),
  difficulty: "easy",
  variant: "basic",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Runnable Interface",
  sampleinput1: "10",
  sampleoutput1: "Sum: 55",
  sampleinput2: "1",
  sampleoutput2: "Sum: 1",
  input1: "100",
  output1: "Sum: 5050",
  input2: "7",
  output2: "Sum: 28",
  input3: "1000",
  output3: "Sum: 500500",
  inputconstrains: "1 <= n <= 1000",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    static int limit;
    static long total;

    public static void main(String[] args) throws InterruptedException {
        Scanner sc = new Scanner(System.in);
        limit = sc.nextInt();
        Runnable task = new Runnable() {
            public void run() {
                long s = 0;
                for (int i = 1; i <= limit; i++) {
                    s = s + i;
                }
                total = s;
            }
        };
        Thread worker = new Thread(task);
        worker.start();
        worker.join();
        System.out.println("Sum: " + total);
    }
}`,
});

// 3 ── easy basic ── Creating Threads
codeQuestions.push({
  title: "Three Cube Workers",
  description: desc(
    "A 3D printer farm runs three jobs in parallel. Read three integers a, b and c, create one thread per number that computes the cube of its own number into its own slot of a shared array, start all three, then join them in order 1, 2, 3 and print each result right after its join.",
    "A single line with three space-separated integers a, b and c.",
    "Three lines: 'Cube1: x', 'Cube2: y', 'Cube3: z' — the cubes of a, b and c.",
    "-100 <= a, b, c <= 100"
  ),
  difficulty: "easy",
  variant: "basic",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Creating Threads",
  sampleinput1: "2 3 4",
  sampleoutput1: "Cube1: 8\nCube2: 27\nCube3: 64",
  sampleinput2: "5 1 0",
  sampleoutput2: "Cube1: 125\nCube2: 1\nCube3: 0",
  input1: "-2 3 10",
  output1: "Cube1: -8\nCube2: 27\nCube3: 1000",
  input2: "7 7 7",
  output2: "Cube1: 343\nCube2: 343\nCube3: 343",
  input3: "100 9 12",
  output3: "Cube1: 1000000\nCube2: 729\nCube3: 1728",
  inputconstrains: "-100 <= a, b, c <= 100",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    static int[] numbers = new int[3];
    static long[] cubes = new long[3];

    static class CubeThread extends Thread {
        private int index;

        CubeThread(int index) {
            this.index = index;
        }

        public void run() {
            long v = numbers[index];
            cubes[index] = v * v * v;
        }
    }

    public static void main(String[] args) throws InterruptedException {
        Scanner sc = new Scanner(System.in);
        numbers[0] = sc.nextInt();
        numbers[1] = sc.nextInt();
        numbers[2] = sc.nextInt();
        CubeThread t1 = new CubeThread(0);
        CubeThread t2 = new CubeThread(1);
        CubeThread t3 = new CubeThread(2);
        t1.start();
        t2.start();
        t3.start();
        t1.join();
        System.out.println("Cube1: " + cubes[0]);
        t2.join();
        System.out.println("Cube2: " + cubes[1]);
        t3.join();
        System.out.println("Cube3: " + cubes[2]);
    }
}`,
});

// 4 ── easy basic ── Thread Lifecycle
codeQuestions.push({
  title: "Thread Lifecycle Audit",
  description: desc(
    "A fresh thread object sits in the NEW state until start() is called, and once its run() method has finished and join() has returned it is TERMINATED. Read one integer n, create a worker thread that computes 2 * n, print its state before starting it, start it, join it, print its state again, then print the doubled value.",
    "A single line with one integer n.",
    "Three lines: 'State before start: NEW', 'State after join: TERMINATED' and 'Double: d' where d = 2 * n.",
    "-1000 <= n <= 1000"
  ),
  difficulty: "easy",
  variant: "basic",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Thread Lifecycle",
  sampleinput1: "4",
  sampleoutput1: "State before start: NEW\nState after join: TERMINATED\nDouble: 8",
  sampleinput2: "21",
  sampleoutput2: "State before start: NEW\nState after join: TERMINATED\nDouble: 42",
  input1: "0",
  output1: "State before start: NEW\nState after join: TERMINATED\nDouble: 0",
  input2: "-5",
  output2: "State before start: NEW\nState after join: TERMINATED\nDouble: -10",
  input3: "999",
  output3: "State before start: NEW\nState after join: TERMINATED\nDouble: 1998",
  inputconstrains: "-1000 <= n <= 1000",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    static int input;
    static int doubled;

    static class Worker extends Thread {
        public void run() {
            doubled = input * 2;
        }
    }

    public static void main(String[] args) throws InterruptedException {
        Scanner sc = new Scanner(System.in);
        input = sc.nextInt();
        Worker w = new Worker();
        System.out.println("State before start: " + w.getState());
        w.start();
        w.join();
        System.out.println("State after join: " + w.getState());
        System.out.println("Double: " + doubled);
    }
}`,
});

// 5 ── easy basic ── Synchronization
codeQuestions.push({
  title: "Synchronized Hit Counter",
  description: desc(
    "A website counts hits arriving from several visitors at once. Without synchronization the shared counter loses updates. Read m (visitor threads) and n (hits per visitor); each thread increments one shared counter n times through a static synchronized method. Start all threads, join them all, then print the final count, which must be exactly m * n.",
    "A single line with two space-separated integers m and n.",
    "One line: 'Final count: c' where c = m * n.",
    "1 <= m <= 5, 1 <= n <= 1000"
  ),
  difficulty: "easy",
  variant: "basic",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Synchronization",
  sampleinput1: "3 100",
  sampleoutput1: "Final count: 300",
  sampleinput2: "1 1",
  sampleoutput2: "Final count: 1",
  input1: "4 250",
  output1: "Final count: 1000",
  input2: "2 999",
  output2: "Final count: 1998",
  input3: "5 40",
  output3: "Final count: 200",
  inputconstrains: "1 <= m <= 5, 1 <= n <= 1000",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    static int counter = 0;
    static int increments;

    static synchronized void bump() {
        counter = counter + 1;
    }

    static class CounterThread extends Thread {
        public void run() {
            for (int i = 0; i < increments; i++) {
                bump();
            }
        }
    }

    public static void main(String[] args) throws InterruptedException {
        Scanner sc = new Scanner(System.in);
        int m = sc.nextInt();
        increments = sc.nextInt();
        CounterThread[] threads = new CounterThread[m];
        for (int i = 0; i < m; i++) {
            threads[i] = new CounterThread();
            threads[i].start();
        }
        for (int i = 0; i < m; i++) {
            threads[i].join();
        }
        System.out.println("Final count: " + counter);
    }
}`,
});

// 6 ── easy basic ── Thread Methods
codeQuestions.push({
  title: "Named Worker Report",
  description: desc(
    "Threads can be given meaningful names through the Thread constructor, and getName() and isAlive() let you inspect them. Read a worker name (a single token) and a number n. Run a thread with that name that computes the sum 1..n, join it, then print its name, the sum, and whether it is still alive.",
    "A single line with a name token and one integer n, space separated.",
    "Three lines: 'Worker name: <name>', 'Sum: s' and 'Alive after join: false' (a joined thread is never alive).",
    "1 <= n <= 1000; the name is one token of 1-15 letters or digits"
  ),
  difficulty: "easy",
  variant: "basic",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Thread Methods",
  sampleinput1: "alpha 5",
  sampleoutput1: "Worker name: alpha\nSum: 15\nAlive after join: false",
  sampleinput2: "zeta 1",
  sampleoutput2: "Worker name: zeta\nSum: 1\nAlive after join: false",
  input1: "builder 100",
  output1: "Worker name: builder\nSum: 5050\nAlive after join: false",
  input2: "t9 3",
  output2: "Worker name: t9\nSum: 6\nAlive after join: false",
  input3: "runner9 12",
  output3: "Worker name: runner9\nSum: 78\nAlive after join: false",
  inputconstrains: "1 <= n <= 1000; name token 1-15 chars",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    static int limit;
    static long total;

    static class NamedWorker extends Thread {
        NamedWorker(String name) {
            super(name);
        }

        public void run() {
            long s = 0;
            for (int i = 1; i <= limit; i++) {
                s = s + i;
            }
            total = s;
        }
    }

    public static void main(String[] args) throws InterruptedException {
        Scanner sc = new Scanner(System.in);
        String name = sc.next();
        limit = sc.nextInt();
        NamedWorker worker = new NamedWorker(name);
        worker.start();
        worker.join();
        System.out.println("Worker name: " + worker.getName());
        System.out.println("Sum: " + total);
        System.out.println("Alive after join: " + worker.isAlive());
    }
}`,
});

// 7 ── easy scenario ── Creating Threads
codeQuestions.push({
  title: "Parallel Ticket Counters",
  description: desc(
    "A ticket office opens k counters in parallel. Counter i sells batch i and must total the ticket numbers it handed out: tickets are numbered 1..size_i, so its total is 1 + 2 + ... + size_i. Read k and the k batch sizes, run one thread per counter computing its batch sum into its own array slot, join every thread, then print all totals in counter order.",
    "First line: k. Second line: k space-separated batch sizes.",
    "k lines: 'Counter i: total' for i = 1..k, in counter order.",
    "1 <= k <= 5, 1 <= size <= 1000"
  ),
  difficulty: "easy",
  variant: "scenario",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Creating Threads",
  sampleinput1: "3\n5 2 4",
  sampleoutput1: "Counter 1: 15\nCounter 2: 3\nCounter 3: 10",
  sampleinput2: "1\n10",
  sampleoutput2: "Counter 1: 55",
  input1: "2\n1000 1",
  output1: "Counter 1: 500500\nCounter 2: 1",
  input2: "4\n3 3 3 3",
  output2: "Counter 1: 6\nCounter 2: 6\nCounter 3: 6\nCounter 4: 6",
  input3: "5\n10 20 30 40 50",
  output3: "Counter 1: 55\nCounter 2: 210\nCounter 3: 465\nCounter 4: 820\nCounter 5: 1275",
  inputconstrains: "1 <= k <= 5, 1 <= size <= 1000",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    static int[] sizes;
    static long[] totals;

    static class TicketThread extends Thread {
        private int index;

        TicketThread(int index) {
            this.index = index;
        }

        public void run() {
            long s = 0;
            for (int t = 1; t <= sizes[index]; t++) {
                s = s + t;
            }
            totals[index] = s;
        }
    }

    public static void main(String[] args) throws InterruptedException {
        Scanner sc = new Scanner(System.in);
        int k = sc.nextInt();
        sizes = new int[k];
        totals = new long[k];
        for (int i = 0; i < k; i++) {
            sizes[i] = sc.nextInt();
        }
        TicketThread[] counters = new TicketThread[k];
        for (int i = 0; i < k; i++) {
            counters[i] = new TicketThread(i);
            counters[i].start();
        }
        for (int i = 0; i < k; i++) {
            counters[i].join();
        }
        for (int i = 0; i < k; i++) {
            System.out.println("Counter " + (i + 1) + ": " + totals[i]);
        }
    }
}`,
});

// 8 ── easy scenario ── Runnable Interface
codeQuestions.push({
  title: "Kitchen Prep Crew",
  description: desc(
    "Two chefs prep one order each at the same time. Prepping an order of u units is simulated by summing 1 + 2 + ... + u (pure computation, no waiting). Read the two order sizes, give each chef an anonymous class implementing Runnable, run both on threads, join them both, then print each order's prep total and the combined total.",
    "A single line with two space-separated integers u1 and u2.",
    "Three lines: 'Order 1 ready: s1', 'Order 2 ready: s2' and 'Total units: t' where t = s1 + s2.",
    "1 <= u1, u2 <= 1000"
  ),
  difficulty: "easy",
  variant: "scenario",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Runnable Interface",
  sampleinput1: "5 3",
  sampleoutput1: "Order 1 ready: 15\nOrder 2 ready: 6\nTotal units: 21",
  sampleinput2: "1 1",
  sampleoutput2: "Order 1 ready: 1\nOrder 2 ready: 1\nTotal units: 2",
  input1: "100 100",
  output1: "Order 1 ready: 5050\nOrder 2 ready: 5050\nTotal units: 10100",
  input2: "10 2",
  output2: "Order 1 ready: 55\nOrder 2 ready: 3\nTotal units: 58",
  input3: "999 1",
  output3: "Order 1 ready: 499500\nOrder 2 ready: 1\nTotal units: 499501",
  inputconstrains: "1 <= u1, u2 <= 1000",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    static int units1;
    static int units2;
    static long prep1;
    static long prep2;

    public static void main(String[] args) throws InterruptedException {
        Scanner sc = new Scanner(System.in);
        units1 = sc.nextInt();
        units2 = sc.nextInt();

        Runnable chef1 = new Runnable() {
            public void run() {
                long s = 0;
                for (int i = 1; i <= units1; i++) {
                    s = s + i;
                }
                prep1 = s;
            }
        };
        Runnable chef2 = new Runnable() {
            public void run() {
                long s = 0;
                for (int i = 1; i <= units2; i++) {
                    s = s + i;
                }
                prep2 = s;
            }
        };

        Thread t1 = new Thread(chef1);
        Thread t2 = new Thread(chef2);
        t1.start();
        t2.start();
        t1.join();
        t2.join();

        System.out.println("Order 1 ready: " + prep1);
        System.out.println("Order 2 ready: " + prep2);
        System.out.println("Total units: " + (prep1 + prep2));
    }
}`,
});

// 9 ── easy scenario ── Synchronization
codeQuestions.push({
  title: "Parallel Bank Deposits",
  description: desc(
    "A bank branch processes deposits from m clerks in parallel on one shared account. Every unsynchronized deposit would corrupt the balance, so deposits go through a static synchronized method. Read the starting balance, m (clerks), n (deposits per clerk) and d (amount per deposit). Each clerk thread deposits d exactly n times; join all clerks and print the final balance.",
    "A single line with four space-separated integers: balance, m, n, d.",
    "One line: 'Final balance: b' where b = balance + m * n * d.",
    "0 <= balance <= 100000, 1 <= m <= 5, 1 <= n <= 100, 1 <= d <= 100"
  ),
  difficulty: "easy",
  variant: "scenario",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Synchronization",
  sampleinput1: "100 3 10 2",
  sampleoutput1: "Final balance: 160",
  sampleinput2: "0 1 1 5",
  sampleoutput2: "Final balance: 5",
  input1: "5000 4 25 10",
  output1: "Final balance: 6000",
  input2: "10 2 100 1",
  output2: "Final balance: 210",
  input3: "999 5 40 3",
  output3: "Final balance: 1599",
  inputconstrains: "0 <= balance <= 100000, 1 <= m <= 5, 1 <= n <= 100, 1 <= d <= 100",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    static int balance;
    static int amount;
    static int deposits;

    static synchronized void deposit() {
        balance = balance + amount;
    }

    static class Depositor extends Thread {
        public void run() {
            for (int i = 0; i < deposits; i++) {
                deposit();
            }
        }
    }

    public static void main(String[] args) throws InterruptedException {
        Scanner sc = new Scanner(System.in);
        balance = sc.nextInt();
        int m = sc.nextInt();
        deposits = sc.nextInt();
        amount = sc.nextInt();
        Depositor[] clerks = new Depositor[m];
        for (int i = 0; i < m; i++) {
            clerks[i] = new Depositor();
            clerks[i].start();
        }
        for (int i = 0; i < m; i++) {
            clerks[i].join();
        }
        System.out.println("Final balance: " + balance);
    }
}`,
});

// 10 ── easy scenario ── Thread Methods
codeQuestions.push({
  title: "Marathon Rank Board",
  description: desc(
    "Race sensors track up to five runners; each runner's distance is processed by its own named thread. Read r and the r distances, start one thread per runner named Runner-1, Runner-2 and so on, join them all, then print the ranking: distances from highest to lowest, ties broken by the smaller runner number. Use each thread's getName() when printing.",
    "First line: r. Second line: r space-separated distances.",
    "r lines: 'Rank i: <thread name> distance <d>', from rank 1 (largest distance) down to rank r.",
    "1 <= r <= 5, 1 <= d <= 1000"
  ),
  difficulty: "easy",
  variant: "scenario",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Thread Methods",
  sampleinput1: "3\n700 900 100",
  sampleoutput1: "Rank 1: Runner-2 distance 900\nRank 2: Runner-1 distance 700\nRank 3: Runner-3 distance 100",
  sampleinput2: "2\n50 50",
  sampleoutput2: "Rank 1: Runner-1 distance 50\nRank 2: Runner-2 distance 50",
  input1: "1\n42",
  output1: "Rank 1: Runner-1 distance 42",
  input2: "4\n10 30 20 40",
  output2: "Rank 1: Runner-4 distance 40\nRank 2: Runner-2 distance 30\nRank 3: Runner-3 distance 20\nRank 4: Runner-1 distance 10",
  input3: "3\n25 25 25",
  output3: "Rank 1: Runner-1 distance 25\nRank 2: Runner-2 distance 25\nRank 3: Runner-3 distance 25",
  inputconstrains: "1 <= r <= 5, 1 <= d <= 1000",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {
    static int[] distances;
    static long[] efforts;

    static class Runner extends Thread {
        private int index;

        Runner(int index) {
            super("Runner-" + (index + 1));
            this.index = index;
        }

        public void run() {
            long s = 0;
            for (int step = 1; step <= distances[index]; step++) {
                s = s + step;
            }
            efforts[index] = s;
        }
    }

    public static void main(String[] args) throws InterruptedException {
        Scanner sc = new Scanner(System.in);
        int r = sc.nextInt();
        distances = new int[r];
        efforts = new long[r];
        for (int i = 0; i < r; i++) {
            distances[i] = sc.nextInt();
        }
        Runner[] runners = new Runner[r];
        for (int i = 0; i < r; i++) {
            runners[i] = new Runner(i);
            runners[i].start();
        }
        for (int i = 0; i < r; i++) {
            runners[i].join();
        }
        int[] order = new int[r];
        for (int i = 0; i < r; i++) {
            order[i] = i;
        }
        for (int i = 0; i < r; i++) {
            for (int j = i + 1; j < r; j++) {
                if (distances[order[j]] > distances[order[i]]) {
                    int tmp = order[i];
                    order[i] = order[j];
                    order[j] = tmp;
                }
            }
        }
        for (int i = 0; i < r; i++) {
            System.out.println("Rank " + (i + 1) + ": " + runners[order[i]].getName() + " distance " + distances[order[i]]);
        }
    }
}`,
});

// 11 ── medium ── Synchronization
codeQuestions.push({
  title: "Warehouse Loader Crew",
  description: desc(
    "A warehouse totalises incoming weight from m loaders working simultaneously. Every add must go through one static synchronized method or the shared total drifts under concurrent updates. Read m and n (rounds per loader), then m loader weights; loader i adds its weight to the shared total n times and records its own carried amount. Join all loaders, print each loader's carried weight in loader order, then the total.",
    "First line: m and n. Second line: m space-separated weights.",
    "m lines 'Loader i carried: w' in loader order, then 'Total weight: t'.",
    "1 <= m <= 5, 1 <= n <= 100, 1 <= weight <= 100"
  ),
  difficulty: "medium",
  variant: "scenario",
  maxscore: 20,
  lang: "java",
  topic: TOPIC,
  subtopic: "Synchronization",
  sampleinput1: "3 10\n4 5 6",
  sampleoutput1: "Loader 1 carried: 40\nLoader 2 carried: 50\nLoader 3 carried: 60\nTotal weight: 150",
  sampleinput2: "1 5\n7",
  sampleoutput2: "Loader 1 carried: 35\nTotal weight: 35",
  input1: "2 100\n3 4",
  output1: "Loader 1 carried: 300\nLoader 2 carried: 400\nTotal weight: 700",
  input2: "4 25\n1 2 3 4",
  output2: "Loader 1 carried: 25\nLoader 2 carried: 50\nLoader 3 carried: 75\nLoader 4 carried: 100\nTotal weight: 250",
  input3: "5 8\n10 20 30 40 50",
  output3: "Loader 1 carried: 80\nLoader 2 carried: 160\nLoader 3 carried: 240\nLoader 4 carried: 320\nLoader 5 carried: 400\nTotal weight: 1200",
  inputconstrains: "1 <= m <= 5, 1 <= n <= 100, 1 <= weight <= 100",
  blacklist: "AtomicInteger, ReentrantLock, synchronizedList",
  whitelist: "synchronized, join(",
  sourcecode: `import java.util.Scanner;

public class Main {
    static int[] weights;
    static long[] carried;
    static int rounds;
    static long total = 0;

    static synchronized void addWeight(int index) {
        total = total + weights[index];
        carried[index] = carried[index] + weights[index];
    }

    static class Loader extends Thread {
        private int index;

        Loader(int index) {
            this.index = index;
        }

        public void run() {
            for (int r = 0; r < rounds; r++) {
                addWeight(index);
            }
        }
    }

    public static void main(String[] args) throws InterruptedException {
        Scanner sc = new Scanner(System.in);
        int m = sc.nextInt();
        rounds = sc.nextInt();
        weights = new int[m];
        carried = new long[m];
        for (int i = 0; i < m; i++) {
            weights[i] = sc.nextInt();
        }
        Loader[] loaders = new Loader[m];
        for (int i = 0; i < m; i++) {
            loaders[i] = new Loader(i);
            loaders[i].start();
        }
        for (int i = 0; i < m; i++) {
            loaders[i].join();
        }
        for (int i = 0; i < m; i++) {
            System.out.println("Loader " + (i + 1) + " carried: " + carried[i]);
        }
        System.out.println("Total weight: " + total);
    }
}`,
});

// 12 ── medium ── Synchronization
codeQuestions.push({
  title: "Toll Gate Revenue Lock",
  description: desc(
    "A toll gate uses an explicit ReentrantLock instead of the synchronized keyword so reviewers can see exactly where the gate is locked and unlocked. Read m (cars), n (trips per car) and f (fee per trip). Every trip passes through the locked section once: revenue grows by f and the vehicle counter grows by 1. Join all car threads, then print total revenue and vehicles served.",
    "A single line with three space-separated integers m, n and f.",
    "Two lines: 'Total revenue: r' where r = m * n * f, and 'Vehicles served: p' where p = m * n.",
    "1 <= m <= 5, 1 <= n <= 100, 1 <= f <= 100"
  ),
  difficulty: "medium",
  variant: "scenario",
  maxscore: 20,
  lang: "java",
  topic: TOPIC,
  subtopic: "Synchronization",
  sampleinput1: "3 10 5",
  sampleoutput1: "Total revenue: 150\nVehicles served: 30",
  sampleinput2: "1 1 2",
  sampleoutput2: "Total revenue: 2\nVehicles served: 1",
  input1: "4 25 3",
  output1: "Total revenue: 300\nVehicles served: 100",
  input2: "2 100 1",
  output2: "Total revenue: 200\nVehicles served: 200",
  input3: "5 8 10",
  output3: "Total revenue: 400\nVehicles served: 40",
  inputconstrains: "1 <= m <= 5, 1 <= n <= 100, 1 <= f <= 100",
  blacklist: "synchronized, AtomicInteger",
  whitelist: "ReentrantLock, lock()",
  sourcecode: `import java.util.Scanner;
import java.util.concurrent.locks.ReentrantLock;

public class Main {
    static int revenue = 0;
    static int passes = 0;
    static int fee;
    static int trips;
    static ReentrantLock gate = new ReentrantLock();

    static void collect() {
        gate.lock();
        try {
            revenue = revenue + fee;
            passes = passes + 1;
        } finally {
            gate.unlock();
        }
    }

    static class Car extends Thread {
        public void run() {
            for (int i = 0; i < trips; i++) {
                collect();
            }
        }
    }

    public static void main(String[] args) throws InterruptedException {
        Scanner sc = new Scanner(System.in);
        int m = sc.nextInt();
        trips = sc.nextInt();
        fee = sc.nextInt();
        Car[] cars = new Car[m];
        for (int i = 0; i < m; i++) {
            cars[i] = new Car();
            cars[i].start();
        }
        for (int i = 0; i < m; i++) {
            cars[i].join();
        }
        System.out.println("Total revenue: " + revenue);
        System.out.println("Vehicles served: " + passes);
    }
}`,
});

// 13 ── medium ── Runnable Interface
codeQuestions.push({
  title: "Sequential Build Pipeline",
  description: desc(
    "A build server must run its k stages strictly one after another, and each stage is an object implementing Runnable kept in a Runnable array. Stage i processes a load of q_i units, simulated by summing 1..q_i. Read k and the k loads; for each stage in order, start a thread with its task, join it, and print the stage result before moving on to the next stage.",
    "First line: k. Second line: k space-separated loads.",
    "k lines: 'Stage i done: s' for i = 1..k.",
    "1 <= k <= 5, 1 <= load <= 1000"
  ),
  difficulty: "medium",
  variant: "scenario",
  maxscore: 20,
  lang: "java",
  topic: TOPIC,
  subtopic: "Runnable Interface",
  sampleinput1: "3\n5 2 4",
  sampleoutput1: "Stage 1 done: 15\nStage 2 done: 3\nStage 3 done: 10",
  sampleinput2: "1\n100",
  sampleoutput2: "Stage 1 done: 5050",
  input1: "4\n1 2 3 4",
  output1: "Stage 1 done: 1\nStage 2 done: 3\nStage 3 done: 6\nStage 4 done: 10",
  input2: "2\n1000 999",
  output2: "Stage 1 done: 500500\nStage 2 done: 499500",
  input3: "5\n10 10 10 10 10",
  output3: "Stage 1 done: 55\nStage 2 done: 55\nStage 3 done: 55\nStage 4 done: 55\nStage 5 done: 55",
  inputconstrains: "1 <= k <= 5, 1 <= load <= 1000",
  blacklist: "extends Thread, ExecutorService",
  whitelist: "implements Runnable",
  sourcecode: `import java.util.Scanner;

public class Main {
    static int items;
    static long processed;

    static class StageTask implements Runnable {
        public void run() {
            long s = 0;
            for (int i = 1; i <= items; i++) {
                s = s + i;
            }
            processed = s;
        }
    }

    public static void main(String[] args) throws InterruptedException {
        Scanner sc = new Scanner(System.in);
        int k = sc.nextInt();
        int[] loads = new int[k];
        for (int i = 0; i < k; i++) {
            loads[i] = sc.nextInt();
        }
        Runnable[] pipeline = new Runnable[k];
        for (int i = 0; i < k; i++) {
            items = loads[i];
            pipeline[i] = new StageTask();
            Thread worker = new Thread(pipeline[i]);
            worker.start();
            worker.join();
            System.out.println("Stage " + (i + 1) + " done: " + processed);
        }
    }
}`,
});

// 14 ── medium ── Thread Methods
codeQuestions.push({
  title: "Machine Shop Partial Products",
  description: desc(
    "A workshop runs k machines in parallel; machine i receives the pair (a_i, b_i) and produces the product a_i * b_i. Read k and the k pairs, start one thread per machine, then join every machine in order and print each partial product right after its join, finally printing the grand product of all partial results.",
    "First line: k. Then k lines, each with two space-separated integers a and b.",
    "k lines 'Machine i: p', then 'Grand product: g' where g is the product of all k partial results.",
    "1 <= k <= 5, 0 <= a, b <= 12"
  ),
  difficulty: "medium",
  variant: "scenario",
  maxscore: 20,
  lang: "java",
  topic: TOPIC,
  subtopic: "Thread Methods",
  sampleinput1: "3\n2 3\n4 5\n6 7",
  sampleoutput1: "Machine 1: 6\nMachine 2: 20\nMachine 3: 42\nGrand product: 5040",
  sampleinput2: "1\n9 9",
  sampleoutput2: "Machine 1: 81\nGrand product: 81",
  input1: "2\n0 5\n3 3",
  output1: "Machine 1: 0\nMachine 2: 9\nGrand product: 0",
  input2: "4\n1 2\n3 4\n5 6\n7 8",
  output2: "Machine 1: 2\nMachine 2: 12\nMachine 3: 30\nMachine 4: 56\nGrand product: 40320",
  input3: "5\n2 2\n2 2\n2 2\n2 2\n2 2",
  output3: "Machine 1: 4\nMachine 2: 4\nMachine 3: 4\nMachine 4: 4\nMachine 5: 4\nGrand product: 1024",
  inputconstrains: "1 <= k <= 5, 0 <= a, b <= 12",
  blacklist: "ExecutorService, CompletableFuture",
  whitelist: "join(",
  sourcecode: `import java.util.Scanner;

public class Main {
    static int[][] jobs;
    static long[] results;

    static class Machine extends Thread {
        private int index;

        Machine(int index) {
            this.index = index;
        }

        public void run() {
            long p = 1;
            for (int c = 0; c < jobs[index].length; c++) {
                p = p * jobs[index][c];
            }
            results[index] = p;
        }
    }

    public static void main(String[] args) throws InterruptedException {
        Scanner sc = new Scanner(System.in);
        int k = sc.nextInt();
        jobs = new int[k][2];
        results = new long[k];
        for (int i = 0; i < k; i++) {
            jobs[i][0] = sc.nextInt();
            jobs[i][1] = sc.nextInt();
        }
        Machine[] machines = new Machine[k];
        for (int i = 0; i < k; i++) {
            machines[i] = new Machine(i);
            machines[i].start();
        }
        long grand = 1;
        for (int i = 0; i < k; i++) {
            machines[i].join();
            grand = grand * results[i];
            System.out.println("Machine " + (i + 1) + ": " + results[i]);
        }
        System.out.println("Grand product: " + grand);
    }
}`,
});

// 15 ── medium ── Thread Methods
codeQuestions.push({
  title: "Cancelled Download Job",
  description: desc(
    "A download manager receives a job, but the user cancels it immediately. The manager records the cancel request by calling interrupt() on the worker thread BEFORE starting it, so the interrupt flag is already pending when run() begins. The worker still attempts Thread.sleep(20); because the interrupt flag is set, sleep fails at once with an InterruptedException, which the worker catches and turns into the cancellation outcome. Read the job name and print the resulting report.",
    "A single line with one token: the job name.",
    "Two lines: 'Job: <name>' and 'Outcome: Download cancelled'.",
    "the name is one token of 1-20 printable characters without spaces"
  ),
  difficulty: "medium",
  variant: "scenario",
  maxscore: 20,
  lang: "java",
  topic: TOPIC,
  subtopic: "Thread Methods",
  sampleinput1: "report.pdf",
  sampleoutput1: "Job: report.pdf\nOutcome: Download cancelled",
  sampleinput2: "data.zip",
  sampleoutput2: "Job: data.zip\nOutcome: Download cancelled",
  input1: "song.mp3",
  output1: "Job: song.mp3\nOutcome: Download cancelled",
  input2: "backup",
  output2: "Job: backup\nOutcome: Download cancelled",
  input3: "photo1",
  output3: "Job: photo1\nOutcome: Download cancelled",
  inputconstrains: "name token 1-20 chars, no spaces",
  blacklist: "volatile, AtomicBoolean",
  whitelist: "InterruptedException",
  sourcecode: `import java.util.Scanner;

public class Main {
    static String outcome;

    static class Downloader extends Thread {
        public void run() {
            try {
                Thread.sleep(20);
                outcome = "Download completed";
            } catch (InterruptedException e) {
                outcome = "Download cancelled";
            }
        }
    }

    public static void main(String[] args) throws InterruptedException {
        Scanner sc = new Scanner(System.in);
        String job = sc.next();
        Downloader worker = new Downloader();
        worker.setName(job);
        worker.interrupt();
        worker.start();
        worker.join();
        System.out.println("Job: " + worker.getName());
        System.out.println("Outcome: " + outcome);
    }
}`,
});

// 16 ── medium ── Thread Lifecycle
codeQuestions.push({
  title: "Worker State Trail",
  description: desc(
    "A QA script audits a worker thread's lifecycle states while it processes a small batch: main observes the fresh object before start(), the worker reports its own state before and after a short sleep, and main reports the state after join(). Read one integer n (the batch size, whose processing is the sum 1..n) and print the full state trail plus the computed sum.",
    "A single line with one integer n.",
    "Five lines: 'Main sees before start: NEW', 'Worker sees before sleep: RUNNABLE', 'Worker sees after sleep: RUNNABLE', 'Main sees after join: TERMINATED' and 'Sum: s' where s = 1 + 2 + ... + n.",
    "1 <= n <= 1000"
  ),
  difficulty: "medium",
  variant: "scenario",
  maxscore: 20,
  lang: "java",
  topic: TOPIC,
  subtopic: "Thread Lifecycle",
  sampleinput1: "4",
  sampleoutput1: "Main sees before start: NEW\nWorker sees before sleep: RUNNABLE\nWorker sees after sleep: RUNNABLE\nMain sees after join: TERMINATED\nSum: 10",
  sampleinput2: "1",
  sampleoutput2: "Main sees before start: NEW\nWorker sees before sleep: RUNNABLE\nWorker sees after sleep: RUNNABLE\nMain sees after join: TERMINATED\nSum: 1",
  input1: "100",
  output1: "Main sees before start: NEW\nWorker sees before sleep: RUNNABLE\nWorker sees after sleep: RUNNABLE\nMain sees after join: TERMINATED\nSum: 5050",
  input2: "3",
  output2: "Main sees before start: NEW\nWorker sees before sleep: RUNNABLE\nWorker sees after sleep: RUNNABLE\nMain sees after join: TERMINATED\nSum: 6",
  input3: "1000",
  output3: "Main sees before start: NEW\nWorker sees before sleep: RUNNABLE\nWorker sees after sleep: RUNNABLE\nMain sees after join: TERMINATED\nSum: 500500",
  inputconstrains: "1 <= n <= 1000",
  blacklist: "wait(, notify(",
  whitelist: "getState(, join(",
  sourcecode: `import java.util.Scanner;

public class Main {
    static int jobs;
    static long total;

    static class StateWorker extends Thread {
        public void run() {
            System.out.println("Worker sees before sleep: " + Thread.currentThread().getState());
            try {
                Thread.sleep(15);
            } catch (InterruptedException e) {
                // nobody interrupts this worker
            }
            System.out.println("Worker sees after sleep: " + Thread.currentThread().getState());
            long s = 0;
            for (int i = 1; i <= jobs; i++) {
                s = s + i;
            }
            total = s;
        }
    }

    public static void main(String[] args) throws InterruptedException {
        Scanner sc = new Scanner(System.in);
        jobs = sc.nextInt();
        StateWorker worker = new StateWorker();
        System.out.println("Main sees before start: " + worker.getState());
        worker.start();
        worker.join();
        System.out.println("Main sees after join: " + worker.getState());
        System.out.println("Sum: " + total);
    }
}`,
});

// 17 ── hard ── Creating Threads
codeQuestions.push({
  title: "Multi-Account Transfer Engine",
  description: desc(
    "A bank core executes t money transfers concurrently between n accounts. Every transfer runs on its own thread and calls one static synchronized bank method, so no two transfers ever interleave inside the ledger. Read the n starting balances, then t transfers 'from to amount' with accounts numbered from 1. Because each transfer is atomic and all threads are joined before reporting, the final balances are fully predictable regardless of thread order.",
    "First line: n. Second line: n space-separated starting balances. Third line: t. Then t lines, each with three integers: from, to, amount (from is different from to).",
    "n lines: 'Account i: balance' in account order (balances may go below zero in this simulation).",
    "1 <= n <= 5, 0 <= balance <= 10000, 1 <= t <= 8, 1 <= amount <= 5000, from != to"
  ),
  difficulty: "hard",
  variant: "scenario",
  maxscore: 30,
  lang: "java",
  topic: TOPIC,
  subtopic: "Creating Threads",
  sampleinput1: "2\n100 50\n2\n1 2 30\n2 1 10",
  sampleoutput1: "Account 1: 80\nAccount 2: 70",
  sampleinput2: "3\n10 20 30\n1\n3 1 5",
  sampleoutput2: "Account 1: 15\nAccount 2: 20\nAccount 3: 25",
  input1: "2\n0 100\n3\n1 2 10\n1 2 5\n2 1 3",
  output1: "Account 1: -12\nAccount 2: 112",
  input2: "4\n1000 2000 3000 4000\n4\n1 2 500\n2 3 250\n3 4 125\n4 1 60",
  output2: "Account 1: 560\nAccount 2: 2250\nAccount 3: 3125\nAccount 4: 4065",
  input3: "2\n5 5\n2\n1 2 5\n2 1 5",
  output3: "Account 1: 5\nAccount 2: 5",
  inputconstrains: "1 <= n <= 5, 0 <= balance <= 10000, 1 <= t <= 8, 1 <= amount <= 5000, from != to",
  blacklist: "ReentrantLock, AtomicInteger, ConcurrentLinkedQueue",
  whitelist: "synchronized",
  sourcecode: `import java.util.Scanner;

public class Main {
    static int[] balances;
    static int[] fromIds;
    static int[] toIds;
    static int[] amounts;

    static synchronized void doTransfer(int from, int to, int amount) {
        balances[from] = balances[from] - amount;
        balances[to] = balances[to] + amount;
    }

    static class TransferThread extends Thread {
        private int index;

        TransferThread(int index) {
            this.index = index;
        }

        public void run() {
            doTransfer(fromIds[index] - 1, toIds[index] - 1, amounts[index]);
        }
    }

    public static void main(String[] args) throws InterruptedException {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        balances = new int[n];
        for (int i = 0; i < n; i++) {
            balances[i] = sc.nextInt();
        }
        int t = sc.nextInt();
        fromIds = new int[t];
        toIds = new int[t];
        amounts = new int[t];
        for (int i = 0; i < t; i++) {
            fromIds[i] = sc.nextInt();
            toIds[i] = sc.nextInt();
            amounts[i] = sc.nextInt();
        }
        TransferThread[] threads = new TransferThread[t];
        for (int i = 0; i < t; i++) {
            threads[i] = new TransferThread(i);
            threads[i].start();
        }
        for (int i = 0; i < t; i++) {
            threads[i].join();
        }
        for (int i = 0; i < n; i++) {
            System.out.println("Account " + (i + 1) + ": " + balances[i]);
        }
    }
}`,
});

// 18 ── hard ── Thread Lifecycle
codeQuestions.push({
  title: "Bounded Buffer Order Fulfiller",
  description: desc(
    "A fulfilment center connects one producer thread and one consumer thread through a bounded buffer of capacity cap, guarded by synchronized methods using wait() and notifyAll(): the producer waits while the buffer is full, the consumer waits while it is empty. wait() parks a thread in the WAITING state and notifyAll() returns it to the runnable set — the lifecycle machinery behind producer-consumer cooperation. Read cap, the number of items k and the k item codes; the producer puts them in order, the consumer takes them, and main joins both threads before printing the consumption log.",
    "First line: cap and k. Second line: k space-separated item codes.",
    "k lines 'Consumed: x' in consumption order, then 'Total consumed: k'.",
    "1 <= cap <= 3, 1 <= k <= 6, 1 <= item <= 100"
  ),
  difficulty: "hard",
  variant: "scenario",
  maxscore: 30,
  lang: "java",
  topic: TOPIC,
  subtopic: "Thread Lifecycle",
  sampleinput1: "2 4\n10 20 30 40",
  sampleoutput1: "Consumed: 10\nConsumed: 20\nConsumed: 30\nConsumed: 40\nTotal consumed: 4",
  sampleinput2: "1 3\n7 7 7",
  sampleoutput2: "Consumed: 7\nConsumed: 7\nConsumed: 7\nTotal consumed: 3",
  input1: "1 2\n100 200",
  output1: "Consumed: 100\nConsumed: 200\nTotal consumed: 2",
  input2: "3 6\n1 2 3 4 5 6",
  output2: "Consumed: 1\nConsumed: 2\nConsumed: 3\nConsumed: 4\nConsumed: 5\nConsumed: 6\nTotal consumed: 6",
  input3: "2 1\n55",
  output3: "Consumed: 55\nTotal consumed: 1",
  inputconstrains: "1 <= cap <= 3, 1 <= k <= 6, 1 <= item <= 100",
  blacklist: "BlockingQueue, ArrayBlockingQueue, ExecutorService",
  whitelist: "wait(, notifyAll",
  sourcecode: `import java.util.Scanner;

public class Main {
    static int[] consumed;
    static int consumedCount = 0;

    static class Buffer {
        private int[] slots;
        private int count = 0;
        private int head = 0;
        private int tail = 0;

        Buffer(int cap) {
            slots = new int[cap];
        }

        synchronized void put(int item) {
            while (count == slots.length) {
                try {
                    wait();
                } catch (InterruptedException e) {
                    // stay in the loop and re-check the buffer
                }
            }
            slots[tail] = item;
            tail = (tail + 1) % slots.length;
            count = count + 1;
            notifyAll();
        }

        synchronized int take() {
            while (count == 0) {
                try {
                    wait();
                } catch (InterruptedException e) {
                    // stay in the loop and re-check the buffer
                }
            }
            int item = slots[head];
            head = (head + 1) % slots.length;
            count = count - 1;
            consumed[consumedCount] = item;
            consumedCount = consumedCount + 1;
            notifyAll();
            return item;
        }
    }

    static class Producer extends Thread {
        private Buffer buffer;
        private int[] items;

        Producer(Buffer buffer, int[] items) {
            this.buffer = buffer;
            this.items = items;
        }

        public void run() {
            for (int i = 0; i < items.length; i++) {
                buffer.put(items[i]);
            }
        }
    }

    static class Consumer extends Thread {
        private Buffer buffer;
        private int total;

        Consumer(Buffer buffer, int total) {
            this.buffer = buffer;
            this.total = total;
        }

        public void run() {
            for (int i = 0; i < total; i++) {
                buffer.take();
            }
        }
    }

    public static void main(String[] args) throws InterruptedException {
        Scanner sc = new Scanner(System.in);
        int cap = sc.nextInt();
        int k = sc.nextInt();
        int[] items = new int[k];
        for (int i = 0; i < k; i++) {
            items[i] = sc.nextInt();
        }
        consumed = new int[k];
        Buffer buffer = new Buffer(cap);
        Consumer c = new Consumer(buffer, k);
        Producer p = new Producer(buffer, items);
        c.start();
        p.start();
        p.join();
        c.join();
        for (int i = 0; i < k; i++) {
            System.out.println("Consumed: " + consumed[i]);
        }
        System.out.println("Total consumed: " + consumedCount);
    }
}`,
});

// 19 ── hard ── Runnable Interface
codeQuestions.push({
  title: "Batch Sum Reducer",
  description: desc(
    "A reporting engine splits a dataset of k chunks of m values each across k worker tasks; every task is an object implementing Runnable that sums its chunk into its own slot and then reports it through one synchronized merge method that also grows the grand total. Read k, m and the k * m values, start all workers, join them all, then print every chunk sum and the grand total.",
    "First line: k and m. Second line: k * m space-separated values.",
    "k lines 'Chunk i: sum' in chunk order, then 'Grand total: g'.",
    "1 <= k <= 6, 1 <= m <= 20, -1000 <= value <= 1000"
  ),
  difficulty: "hard",
  variant: "scenario",
  maxscore: 30,
  lang: "java",
  topic: TOPIC,
  subtopic: "Runnable Interface",
  sampleinput1: "2 3\n1 2 3 4 5 6",
  sampleoutput1: "Chunk 1: 6\nChunk 2: 15\nGrand total: 21",
  sampleinput2: "1 1\n5",
  sampleoutput2: "Chunk 1: 5\nGrand total: 5",
  input1: "3 2\n10 -10 20 -20 30 -30",
  output1: "Chunk 1: 0\nChunk 2: 0\nChunk 3: 0\nGrand total: 0",
  input2: "2 4\n1 1 1 1 2 2 2 2",
  output2: "Chunk 1: 4\nChunk 2: 8\nGrand total: 12",
  input3: "4 3\n5 5 5 1 1 1 9 9 9 0 0 0",
  output3: "Chunk 1: 15\nChunk 2: 3\nChunk 3: 27\nChunk 4: 0\nGrand total: 45",
  inputconstrains: "1 <= k <= 6, 1 <= m <= 20, -1000 <= value <= 1000",
  blacklist: "Streams, parallel(",
  whitelist: "synchronized, implements Runnable",
  sourcecode: `import java.util.Scanner;

public class Main {
    static int[] data;
    static int chunkSize;
    static long[] chunkSums;
    static long grandTotal = 0;

    static synchronized void merge(int index, long sum) {
        chunkSums[index] = sum;
        grandTotal = grandTotal + sum;
    }

    static class BatchTask implements Runnable {
        private int index;

        BatchTask(int index) {
            this.index = index;
        }

        public void run() {
            long s = 0;
            int start = index * chunkSize;
            for (int j = 0; j < chunkSize; j++) {
                s = s + data[start + j];
            }
            merge(index, s);
        }
    }

    public static void main(String[] args) throws InterruptedException {
        Scanner sc = new Scanner(System.in);
        int k = sc.nextInt();
        chunkSize = sc.nextInt();
        int n = k * chunkSize;
        data = new int[n];
        for (int i = 0; i < n; i++) {
            data[i] = sc.nextInt();
        }
        chunkSums = new long[k];
        Thread[] workers = new Thread[k];
        for (int i = 0; i < k; i++) {
            workers[i] = new Thread(new BatchTask(i));
            workers[i].start();
        }
        for (int i = 0; i < k; i++) {
            workers[i].join();
        }
        for (int i = 0; i < k; i++) {
            System.out.println("Chunk " + (i + 1) + ": " + chunkSums[i]);
        }
        System.out.println("Grand total: " + grandTotal);
    }
}`,
});

// 20 ── hard ── Thread Lifecycle
codeQuestions.push({
  title: "Chunk Min Max Aggregator",
  description: desc(
    "A statistics service aggregates min and max over a stream using k workers, one per chunk, each extending Thread and keeping its results strictly chunk-private — with private state there is nothing to synchronize. Before starting each worker, main logs its lifecycle state (fresh objects are NEW); after joining every worker, main logs the TERMINATED state, prints each worker's range, then merges the global extremes. Read k, m and the k * m values.",
    "First line: k and m. Second line: k * m space-separated values.",
    "k lines 'Worker i state before start: NEW'; then for each worker in order two lines 'Worker i state after join: TERMINATED' and 'Worker i range: min <lo> max <hi>'; then 'Global min: g' and 'Global max: G'.",
    "1 <= k <= 4, 1 <= m <= 20, -1000 <= value <= 1000"
  ),
  difficulty: "hard",
  variant: "scenario",
  maxscore: 30,
  lang: "java",
  topic: TOPIC,
  subtopic: "Thread Lifecycle",
  sampleinput1: "2 3\n9 1 5 6 12 4",
  sampleoutput1: "Worker 1 state before start: NEW\nWorker 2 state before start: NEW\nWorker 1 state after join: TERMINATED\nWorker 1 range: min 1 max 9\nWorker 2 state after join: TERMINATED\nWorker 2 range: min 4 max 12\nGlobal min: 1\nGlobal max: 12",
  sampleinput2: "1 1\n7",
  sampleoutput2: "Worker 1 state before start: NEW\nWorker 1 state after join: TERMINATED\nWorker 1 range: min 7 max 7\nGlobal min: 7\nGlobal max: 7",
  input1: "2 2\n-5 5 0 0",
  output1: "Worker 1 state before start: NEW\nWorker 2 state before start: NEW\nWorker 1 state after join: TERMINATED\nWorker 1 range: min -5 max 5\nWorker 2 state after join: TERMINATED\nWorker 2 range: min 0 max 0\nGlobal min: -5\nGlobal max: 5",
  input2: "3 1\n8 8 8",
  output2: "Worker 1 state before start: NEW\nWorker 2 state before start: NEW\nWorker 3 state before start: NEW\nWorker 1 state after join: TERMINATED\nWorker 1 range: min 8 max 8\nWorker 2 state after join: TERMINATED\nWorker 2 range: min 8 max 8\nWorker 3 state after join: TERMINATED\nWorker 3 range: min 8 max 8\nGlobal min: 8\nGlobal max: 8",
  input3: "3 2\n1 2 3 4 5 6",
  output3: "Worker 1 state before start: NEW\nWorker 2 state before start: NEW\nWorker 3 state before start: NEW\nWorker 1 state after join: TERMINATED\nWorker 1 range: min 1 max 2\nWorker 2 state after join: TERMINATED\nWorker 2 range: min 3 max 4\nWorker 3 state after join: TERMINATED\nWorker 3 range: min 5 max 6\nGlobal min: 1\nGlobal max: 6",
  inputconstrains: "1 <= k <= 4, 1 <= m <= 20, -1000 <= value <= 1000",
  blacklist: "synchronized, ReentrantLock",
  whitelist: "extends Thread, getState(",
  sourcecode: `import java.util.Scanner;

public class Main {
    static int[] data;
    static int chunkSize;
    static int[] mins;
    static int[] maxs;

    static class MinMaxWorker extends Thread {
        private int index;

        MinMaxWorker(int index) {
            this.index = index;
        }

        public void run() {
            int start = index * chunkSize;
            int lo = data[start];
            int hi = data[start];
            for (int j = 1; j < chunkSize; j++) {
                int v = data[start + j];
                if (v < lo) {
                    lo = v;
                }
                if (v > hi) {
                    hi = v;
                }
            }
            mins[index] = lo;
            maxs[index] = hi;
        }
    }

    public static void main(String[] args) throws InterruptedException {
        Scanner sc = new Scanner(System.in);
        int k = sc.nextInt();
        chunkSize = sc.nextInt();
        int n = k * chunkSize;
        data = new int[n];
        for (int i = 0; i < n; i++) {
            data[i] = sc.nextInt();
        }
        mins = new int[k];
        maxs = new int[k];
        MinMaxWorker[] workers = new MinMaxWorker[k];
        for (int i = 0; i < k; i++) {
            workers[i] = new MinMaxWorker(i);
            System.out.println("Worker " + (i + 1) + " state before start: " + workers[i].getState());
            workers[i].start();
        }
        for (int i = 0; i < k; i++) {
            workers[i].join();
        }
        int gmin = mins[0];
        int gmax = maxs[0];
        for (int i = 0; i < k; i++) {
            System.out.println("Worker " + (i + 1) + " state after join: " + workers[i].getState());
            System.out.println("Worker " + (i + 1) + " range: min " + mins[i] + " max " + maxs[i]);
            if (mins[i] < gmin) {
                gmin = mins[i];
            }
            if (maxs[i] > gmax) {
                gmax = maxs[i];
            }
        }
        System.out.println("Global min: " + gmin);
        System.out.println("Global max: " + gmax);
    }
}`,
});

/* ─────────────────────────────── MCQ QUESTIONS ─────────────────────────────── */

const mcqQuestions = [];

// 1 ── easy ── Creating Threads
mcqQuestions.push({
  title: "Creating a Thread by Extension",
  description: "In Java, which class do you extend so that instances can run as threads?",
  difficulty: "easy",
  topic: TOPIC,
  subtopic: "Creating Threads",
  Option1: "Thread",
  Option2: "Runnable",
  Option3: "ExecutorService",
  Option4: "Object",
  CorrectOption: 1,
  iscodesnippet: false,
  codesnippet: null,
  snippetLang: null,
});

// 2 ── easy ── Runnable Interface
mcqQuestions.push({
  title: "Runnable Contract Method",
  description: "When a class implements the Runnable interface, which method must it provide?",
  difficulty: "easy",
  topic: TOPIC,
  subtopic: "Runnable Interface",
  Option1: "start()",
  Option2: "run()",
  Option3: "init()",
  Option4: "execute()",
  CorrectOption: 2,
  iscodesnippet: false,
  codesnippet: null,
  snippetLang: null,
});

// 3 ── easy ── Creating Threads
mcqQuestions.push({
  title: "start versus run Purpose",
  description: "Which Thread method asks the JVM to start a new call stack that eventually executes run()?",
  difficulty: "easy",
  topic: TOPIC,
  subtopic: "Creating Threads",
  Option1: "run()",
  Option2: "init()",
  Option3: "start()",
  Option4: "join()",
  CorrectOption: 3,
  iscodesnippet: false,
  codesnippet: null,
  snippetLang: null,
});

// 4 ── easy ── Thread Lifecycle
mcqQuestions.push({
  title: "Fresh Thread State",
  description: "A Thread object was created with new Thread(task) but start() has never been called. What does getState() return?",
  difficulty: "easy",
  topic: TOPIC,
  subtopic: "Thread Lifecycle",
  Option1: "RUNNABLE",
  Option2: "WAITING",
  Option3: "TERMINATED",
  Option4: "NEW",
  CorrectOption: 4,
  iscodesnippet: false,
  codesnippet: null,
  snippetLang: null,
});

// 5 ── easy ── Thread Methods
mcqQuestions.push({
  title: "Purpose of join",
  description: "What does t.join() do when the main thread calls it on a worker thread t?",
  difficulty: "easy",
  topic: TOPIC,
  subtopic: "Thread Methods",
  Option1: "It starts t and returns immediately",
  Option2: "It pauses the calling thread until t has finished",
  Option3: "It stops t immediately",
  Option4: "It renames t to the caller's name",
  CorrectOption: 2,
  iscodesnippet: false,
  codesnippet: null,
  snippetLang: null,
});

// 6 ── easy ── Synchronization
mcqQuestions.push({
  title: "synchronized Keyword Effect",
  description: "What does marking an instance method synchronized guarantee?",
  difficulty: "easy",
  topic: TOPIC,
  subtopic: "Synchronization",
  Option1: "It runs faster on multi-core CPUs",
  Option2: "It cannot throw exceptions",
  Option3: "Only one thread at a time can execute it on the same object's lock",
  Option4: "It always runs on the main thread",
  CorrectOption: 3,
  iscodesnippet: false,
  codesnippet: null,
  snippetLang: null,
});

// 7 ── easy ── Thread Methods
mcqQuestions.push({
  title: "Daemon Thread Trait",
  description: "Which statement about daemon threads is TRUE?",
  difficulty: "easy",
  topic: TOPIC,
  subtopic: "Thread Methods",
  Option1: "They prevent the JVM from exiting until they finish",
  Option2: "They cannot enter the blocked state",
  Option3: "The JVM can exit while daemon threads are still running",
  Option4: "They always receive the highest priority",
  CorrectOption: 3,
  iscodesnippet: false,
  codesnippet: null,
  snippetLang: null,
});

// 8 ── easy ── Synchronization
mcqQuestions.push({
  title: "Race Condition Definition",
  description: "What is a race condition?",
  difficulty: "easy",
  topic: TOPIC,
  subtopic: "Synchronization",
  Option1: "Two threads running with different priorities",
  Option2: "A situation where the result depends on the timing or interleaving of thread execution",
  Option3: "A thread finishing before main() ends",
  Option4: "Two threads accidentally sharing the same name",
  CorrectOption: 2,
  iscodesnippet: false,
  codesnippet: null,
  snippetLang: null,
});

// 9 ── easy ── Thread Methods
mcqQuestions.push({
  title: "Default Thread Name",
  description: "What is the default name of the first thread you create without giving it a name?",
  difficulty: "easy",
  topic: TOPIC,
  subtopic: "Thread Methods",
  Option1: "main",
  Option2: "Thread-0",
  Option3: "Thread-1",
  Option4: "worker",
  CorrectOption: 2,
  iscodesnippet: false,
  codesnippet: null,
  snippetLang: null,
});

// 10 ── easy ── Runnable Interface
mcqQuestions.push({
  title: "Why Implement Runnable",
  description: "Why is implementing Runnable usually preferred over extending Thread?",
  difficulty: "easy",
  topic: TOPIC,
  subtopic: "Runnable Interface",
  Option1: "Runnable tasks get a higher priority",
  Option2: "Java forbids extending Thread",
  Option3: "It leaves the class free to extend another class and separates the task from the thread",
  Option4: "Runnable automatically synchronizes run()",
  CorrectOption: 3,
  iscodesnippet: false,
  codesnippet: null,
  snippetLang: null,
});

// 11 ── medium ── Creating Threads (snippet: run() directly executes on main)
mcqQuestions.push({
  title: "run() Trap Output",
  description: "The program below compiles and runs. It calls t.run() directly instead of t.start(). What does it print?",
  difficulty: "medium",
  topic: TOPIC,
  subtopic: "Creating Threads",
  Option1: "main",
  Option2: "Thread-0",
  Option3: "It prints nothing",
  Option4: "It throws IllegalThreadStateException",
  CorrectOption: 1,
  iscodesnippet: true,
  codesnippet: `public class Main {
    public static void main(String[] args) {
        Thread t = new Thread() {
            public void run() {
                System.out.println(Thread.currentThread().getName());
            }
        };
        t.run();
    }
}`,
  snippetLang: "java",
});

// 12 ── medium ── Thread Lifecycle (snippet: NEW / working / TERMINATED)
mcqQuestions.push({
  title: "Lifecycle Trail Output",
  description: "The program below compiles and runs. Which sequence of lines does it print?",
  difficulty: "medium",
  topic: TOPIC,
  subtopic: "Thread Lifecycle",
  Option1: "RUNNABLE, working, TERMINATED",
  Option2: "NEW, working, TERMINATED",
  Option3: "NEW, TERMINATED, working",
  Option4: "NEW, working, RUNNABLE",
  CorrectOption: 2,
  iscodesnippet: true,
  codesnippet: `public class Main {
    public static void main(String[] args) throws InterruptedException {
        Thread t = new Thread(new Runnable() {
            public void run() {
                System.out.println("working");
            }
        });
        System.out.println(t.getState());
        t.start();
        t.join();
        System.out.println(t.getState());
    }
}`,
  snippetLang: "java",
});

// 13 ── medium ── Synchronization (snippet: synchronized counter = 2000)
mcqQuestions.push({
  title: "Synchronized Counter Output",
  description: "Two threads each increment one shared counter 1000 times through a static synchronized method, and main joins both. What does the program print?",
  difficulty: "medium",
  topic: TOPIC,
  subtopic: "Synchronization",
  Option1: "A value that changes from run to run",
  Option2: "1000",
  Option3: "2000",
  Option4: "The program does not compile",
  CorrectOption: 3,
  iscodesnippet: true,
  codesnippet: `public class Main {
    static int count = 0;

    static synchronized void bump() {
        count = count + 1;
    }

    public static void main(String[] args) throws InterruptedException {
        Thread a = new Thread() {
            public void run() {
                for (int i = 0; i < 1000; i++) {
                    bump();
                }
            }
        };
        Thread b = new Thread() {
            public void run() {
                for (int i = 0; i < 1000; i++) {
                    bump();
                }
            }
        };
        a.start();
        b.start();
        a.join();
        b.join();
        System.out.println(count);
    }
}`,
  snippetLang: "java",
});

// 14 ── medium ── Thread Methods (snippet: join ordering)
mcqQuestions.push({
  title: "join Ordering Output",
  description: "What does this program print when it is compiled and run?",
  difficulty: "medium",
  topic: TOPIC,
  subtopic: "Thread Methods",
  Option1: "A, then C, then B",
  Option2: "B, then A, then C",
  Option3: "A, then B and C in an unpredictable order",
  Option4: "A, then B, then C — always in this order",
  CorrectOption: 4,
  iscodesnippet: true,
  codesnippet: `public class Main {
    public static void main(String[] args) throws InterruptedException {
        System.out.println("A");
        Thread t = new Thread() {
            public void run() {
                System.out.println("B");
            }
        };
        t.start();
        t.join();
        System.out.println("C");
    }
}`,
  snippetLang: "java",
});

// 15 ── medium ── Thread Methods (snippet: unhandled sleep = compile error)
mcqQuestions.push({
  title: "Unhandled sleep Result",
  description: "A developer writes the worker below; run() calls Thread.sleep with no try-catch and no throws clause. What happens when this program is compiled and run?",
  difficulty: "medium",
  topic: TOPIC,
  subtopic: "Thread Methods",
  Option1: "It prints done after about 100 milliseconds",
  Option2: "Compilation error — sleep throws the checked InterruptedException, which run() neither catches nor declares",
  Option3: "It compiles and throws InterruptedException at runtime",
  Option4: "The sleep call is skipped and done prints immediately",
  CorrectOption: 2,
  iscodesnippet: true,
  codesnippet: `public class Main {
    public static void main(String[] args) {
        Thread t = new Thread() {
            public void run() {
                Thread.sleep(100);
                System.out.println("done");
            }
        };
        t.start();
    }
}`,
  snippetLang: "java",
});

// 16 ── medium ── Synchronization (wait vs sleep lock behavior)
mcqQuestions.push({
  title: "wait versus sleep Lock",
  description: "Which statement about Object.wait() and Thread.sleep() is TRUE?",
  difficulty: "medium",
  topic: TOPIC,
  subtopic: "Synchronization",
  Option1: "wait() releases the object's monitor lock while waiting; sleep() keeps holding all its locks",
  Option2: "sleep() releases the lock; wait() keeps holding it",
  Option3: "Both release every lock they hold",
  Option4: "Neither releases any lock",
  CorrectOption: 1,
  iscodesnippet: false,
  codesnippet: null,
  snippetLang: null,
});

// 17 ── hard ── Synchronization (snippet: unsynchronized counter varies)
mcqQuestions.push({
  title: "Unsynchronized Counter Output",
  description: "The counter below has no synchronization at all. Both threads run to completion and are joined before printing. Which statement about the printed value is correct?",
  difficulty: "hard",
  topic: TOPIC,
  subtopic: "Synchronization",
  Option1: "It is exactly 2000 on every run",
  Option2: "It is exactly 1000 on every run",
  Option3: "It is a value up to 2000 that can differ between runs, because increments can be lost",
  Option4: "The program does not compile",
  CorrectOption: 3,
  iscodesnippet: true,
  codesnippet: `public class Main {
    static int count = 0;

    static void bump() {
        count = count + 1;
    }

    public static void main(String[] args) throws InterruptedException {
        Thread a = new Thread() {
            public void run() {
                for (int i = 0; i < 1000; i++) {
                    bump();
                }
            }
        };
        Thread b = new Thread() {
            public void run() {
                for (int i = 0; i < 1000; i++) {
                    bump();
                }
            }
        };
        a.start();
        b.start();
        a.join();
        b.join();
        System.out.println(count);
    }
}`,
  snippetLang: "java",
});

// 18 ── hard ── Thread Methods (snippet: interrupt during sleep)
mcqQuestions.push({
  title: "Interrupt During Sleep Output",
  description: "The worker below sleeps for 10 seconds; main interrupts it right after starting it, joins it, and prints isAlive(). What does the program print?",
  difficulty: "hard",
  topic: TOPIC,
  subtopic: "Thread Methods",
  Option1: "awake, then false",
  Option2: "caught, then true",
  Option3: "caught, then false",
  Option4: "The program hangs forever",
  CorrectOption: 3,
  iscodesnippet: true,
  codesnippet: `public class Main {
    public static void main(String[] args) throws InterruptedException {
        Thread t = new Thread() {
            public void run() {
                try {
                    Thread.sleep(10000);
                    System.out.println("awake");
                } catch (InterruptedException e) {
                    System.out.println("caught");
                }
            }
        };
        t.start();
        t.interrupt();
        t.join();
        System.out.println(t.isAlive());
    }
}`,
  snippetLang: "java",
});

// 19 ── hard ── Synchronization (snippet: AtomicInteger = 2000)
mcqQuestions.push({
  title: "AtomicInteger Counter Output",
  description: "The counter is a java.util.concurrent.atomic.AtomicInteger; both threads call incrementAndGet() 1000 times and main joins them. What does the program print?",
  difficulty: "hard",
  topic: TOPIC,
  subtopic: "Synchronization",
  Option1: "2000",
  Option2: "A value that changes from run to run",
  Option3: "1000",
  Option4: "The program does not compile",
  CorrectOption: 1,
  iscodesnippet: true,
  codesnippet: `import java.util.concurrent.atomic.AtomicInteger;

public class Main {
    static AtomicInteger count = new AtomicInteger(0);

    public static void main(String[] args) throws InterruptedException {
        Thread a = new Thread() {
            public void run() {
                for (int i = 0; i < 1000; i++) {
                    count.incrementAndGet();
                }
            }
        };
        Thread b = new Thread() {
            public void run() {
                for (int i = 0; i < 1000; i++) {
                    count.incrementAndGet();
                }
            }
        };
        a.start();
        b.start();
        a.join();
        b.join();
        System.out.println(count.get());
    }
}`,
  snippetLang: "java",
});

// 20 ── hard ── Synchronization (volatile is not atomicity)
mcqQuestions.push({
  title: "volatile Does Not Fix count Increment",
  description: "A field is declared volatile int count = 0; and several threads execute count++. Why is this still not thread-safe?",
  difficulty: "hard",
  topic: TOPIC,
  subtopic: "Synchronization",
  Option1: "volatile makes the field immutable, so the increments fail",
  Option2: "volatile guarantees visibility of writes, but the read-increment-write sequence is still non-atomic",
  Option3: "volatile only works on object references, not on primitives",
  Option4: "volatile disables CPU caches, so half of the writes are lost",
  CorrectOption: 2,
  iscodesnippet: false,
  codesnippet: null,
  snippetLang: null,
});

/* ─────────────────────────────── SELF-CHECKS ─────────────────────────────── */

const assert = (cond, msg) => {
  if (!cond) throw new Error("SELF-CHECK FAILED: " + msg);
};

assert(codeQuestions.length === 20, "expected 20 code questions, got " + codeQuestions.length);
assert(mcqQuestions.length === 20, "expected 20 mcq questions, got " + mcqQuestions.length);

const seenCodeTitles = new Set();
const subCount = Object.fromEntries(SUBTOPICS.map((s) => [s, 0]));
const diffCount = { easy: 0, medium: 0, hard: 0 };
const easyVariants = { basic: 0, scenario: 0 };

for (const q of codeQuestions) {
  assert(!seenCodeTitles.has(q.title), "duplicate code title: " + q.title);
  seenCodeTitles.add(q.title);
  assert(SUBTOPICS.includes(q.subtopic), "bad subtopic on " + q.title);
  assert(q.topic === TOPIC, "bad topic on " + q.title);
  assert(!q.sourcecode.includes("\\"), "backslash in source of " + q.title);
  assert(q.sourcecode.includes("class Main"), "missing class Main in " + q.title);
  if (q.sourcecode.includes("static class")) {
    assert(q.sourcecode.indexOf("public class Main") < q.sourcecode.indexOf("static class"), "public class Main must be first in " + q.title);
  }
  for (const f of ["sampleinput1", "sampleinput2", "input1", "input2", "input3"]) {
    assert(typeof q[f] === "string" && q[f].length > 0, "empty " + f + " on " + q.title);
  }
  for (const kw of String(q.blacklist).split(",").map((s) => s.trim()).filter(Boolean)) {
    assert(!q.sourcecode.includes(kw), `blacklisted "${kw}" present in ${q.title}`);
  }
  for (const kw of String(q.whitelist).split(",").map((s) => s.trim()).filter(Boolean)) {
    assert(q.sourcecode.includes(kw), `whitelisted "${kw}" missing from ${q.title}`);
  }
  diffCount[q.difficulty]++;
  if (q.difficulty === "easy") {
    easyVariants[q.variant]++;
    assert(q.maxscore === 10 && q.blacklist === "" && q.whitelist === "", "easy shape wrong on " + q.title);
  } else if (q.difficulty === "medium") {
    assert(q.maxscore === 20 && q.blacklist && q.whitelist, "medium shape wrong on " + q.title);
  } else if (q.difficulty === "hard") {
    assert(q.maxscore === 30 && q.blacklist && q.whitelist, "hard shape wrong on " + q.title);
  }
  subCount[q.subtopic]++;
}
assert(diffCount.easy === 10 && diffCount.medium === 6 && diffCount.hard === 4, "code difficulty matrix off: " + JSON.stringify(diffCount));
assert(easyVariants.basic === 6 && easyVariants.scenario === 4, "easy variant split off: " + JSON.stringify(easyVariants));
for (const s of SUBTOPICS) {
  assert(subCount[s] === 4, `subtopic "${s}" used ${subCount[s]} times, expected 4`);
}

const seenMcqTitles = new Set();
let snippets = 0;
const mcqDiff = { easy: 0, medium: 0, hard: 0 };
const mcqSubs = new Set();
for (const q of mcqQuestions) {
  assert(!seenMcqTitles.has(q.title), "duplicate mcq title: " + q.title);
  seenMcqTitles.add(q.title);
  assert(SUBTOPICS.includes(q.subtopic), "bad mcq subtopic on " + q.title);
  const opts = [q.Option1, q.Option2, q.Option3, q.Option4];
  assert(new Set(opts).size === 4, "mcq options not distinct: " + q.title);
  assert(opts.every((o) => o.trim().length > 0), "empty mcq option: " + q.title);
  assert([1, 2, 3, 4].includes(q.CorrectOption), "bad CorrectOption: " + q.title);
  mcqDiff[q.difficulty]++;
  mcqSubs.add(q.subtopic);
  if (q.iscodesnippet) {
    snippets++;
    assert(q.codesnippet && q.snippetLang === "java", "snippet shape wrong on " + q.title);
    assert(!q.codesnippet.includes("\\"), "backslash in snippet " + q.title);
  } else {
    assert(!q.codesnippet, "codesnippet set but iscodesnippet false: " + q.title);
  }
}
assert(mcqDiff.easy === 10 && mcqDiff.medium === 6 && mcqDiff.hard === 4, "mcq difficulty matrix off: " + JSON.stringify(mcqDiff));
assert(snippets >= 6, "need at least 6 snippet mcqs, got " + snippets);
assert(mcqSubs.size === 5, "mcq subtopics must all be covered, got " + mcqSubs.size);

/* ─────────────────────────────── WRITE PART FILES ─────────────────────────────── */

fs.writeFileSync(
  path.join(DIR, "day-18.code.p1.json"),
  JSON.stringify({ day: 18, topics: [{ name: TOPIC, subtopics: SUBTOPICS }], questions: codeQuestions.slice(0, 10) }, null, 2) + "\n"
);
fs.writeFileSync(
  path.join(DIR, "day-18.code.p2.json"),
  JSON.stringify({ questions: codeQuestions.slice(10) }, null, 2) + "\n"
);
fs.writeFileSync(
  path.join(DIR, "day-18.mcq.p1.json"),
  JSON.stringify({ questions: mcqQuestions.slice(0, 10) }, null, 2) + "\n"
);
fs.writeFileSync(
  path.join(DIR, "day-18.mcq.p2.json"),
  JSON.stringify({ questions: mcqQuestions.slice(10) }, null, 2) + "\n"
);

console.log("self-checks passed — code per subtopic:", JSON.stringify(subCount), "| snippets:", snippets);
console.log("wrote day-18 part files:", codeQuestions.length, "code,", mcqQuestions.length, "mcq");
