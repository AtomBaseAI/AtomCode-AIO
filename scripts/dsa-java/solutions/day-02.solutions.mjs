/**
 * Day 02 — Algorithm Analysis and Complexity — complete reference programs.
 * main() is always the FIRST member of class Main (judge detectMainClass quirk).
 */

const solutions = [];

/* Q1 — Counting Sort Work Estimate (blacklist: System.out.print, whitelist: return) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        java.io.PrintStream so = System.out;
        int n = sc.nextInt();
        int k = sc.nextInt();
        so.println(countingSortOps(n, k));
    }

    static long countingSortOps(int n, int k) {
        return 2L * n + k;
    }
}
`);

/* Q2 — Growth Gap Between Algorithms (blacklist: System.out.print, whitelist: long) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        java.io.PrintStream so = System.out;
        long n = sc.nextLong();
        so.println(growthGap(n));
    }

    static long growthGap(long n) {
        long log = 0;
        long v = n;
        while (v > 1) {
            v /= 2;
            log++;
        }
        return n * n - (n * log + n);
    }
}
`);

/* Q3 — Pizza Cutting Pieces (blacklist: System.out.print, whitelist: long) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        java.io.PrintStream so = System.out;
        int n = sc.nextInt();
        so.println(pizzaPieces(n));
    }

    static long pizzaPieces(int n) {
        long v = n;
        return (v * v + v + 2) / 2;
    }
}
`);

/* Q4 — Count Nested Loop Iterations */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(nestedCount(n));
    }

    static long nestedCount(int n) {
        return (long) n * (n - 1) / 2;
    }
}
`);

/* Q5 — Count Halving Steps */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(halvingCount(n));
    }

    static int halvingCount(int n) {
        int count = 0;
        while (n > 1) {
            n /= 2;
            count++;
        }
        return count;
    }
}
`);

/* Q6 — Count Strided Loop Iterations */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(stridedCount(n));
    }

    static int stridedCount(int n) {
        return (n + 1) / 2;
    }
}
`);

/* Q7 — Binary Search Probe Estimate */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(binarySteps(n));
    }

    static int binarySteps(int n) {
        int steps = 0;
        while (n > 1) {
            n /= 2;
            steps++;
        }
        return steps + 1;
    }
}
`);

/* Q8 — Sensor Pair Monitor */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(adjacentComparisons(n));
    }

    static long adjacentComparisons(int n) {
        return n - 1;
    }
}
`);

/* Q9 — Triple Loop Work Count (blacklist: System.out.print, whitelist: return) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        java.io.PrintStream so = System.out;
        int n = sc.nextInt();
        so.println(tripleCount(n));
    }

    static long tripleCount(int n) {
        return (long) n * (n - 1) * (n - 2) / 6;
    }
}
`);

/* Q10 — Halving Work Total (blacklist: System.out.print, whitelist: long) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        java.io.PrintStream so = System.out;
        long n = sc.nextLong();
        so.println(halvingWork(n));
    }

    static long halvingWork(long n) {
        long total = 0;
        while (n > 0) {
            total += n;
            n /= 2;
        }
        return total;
    }
}
`);

/* Q11 — Count Single Loop Iterations */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(loopCount(n));
    }

    static int loopCount(int n) {
        return n;
    }
}
`);

/* Q12 — Two Sequential Loops */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(sequentialCount(n));
    }

    static long sequentialCount(int n) {
        return 2L * n;
    }
}
`);

/* Q13 — Slower Algorithm Detector */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        long n = sc.nextLong();
        System.out.println(slowerAlgorithm(n));
    }

    static int slowerAlgorithm(long n) {
        return n * n > 100 * n ? 1 : 0;
    }
}
`);

/* Q14 — Image Filter Operations */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(pixelOperations(n));
    }

    static long pixelOperations(int n) {
        return 2L * n * n;
    }
}
`);

/* Q15 — Handshake Counter */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(handshakes(n));
    }

    static long handshakes(int n) {
        return (long) n * (n - 1) / 2;
    }
}
`);

/* Q16 — Doubling Steps to Exceed Limit (blacklist: System.out.print, whitelist: while) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        java.io.PrintStream so = System.out;
        long n = sc.nextLong();
        long limit = sc.nextLong();
        so.println(doublingSteps(n, limit));
    }

    static int doublingSteps(long n, long limit) {
        int steps = 0;
        while (n <= limit) {
            n *= 2;
            steps++;
        }
        return steps;
    }
}
`);

/* Q17 — Sum of Squares Work Count (blacklist: System.out.print, whitelist: long) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        java.io.PrintStream so = System.out;
        int n = sc.nextInt();
        so.println(sumOfSquaresOps(n));
    }

    static long sumOfSquaresOps(int n) {
        long v = n;
        return v * (v + 1) * (2 * v + 1) / 6;
    }
}
`);

/* Q18 — Slowdown Threshold (blacklist: System.out.print, whitelist: long) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        java.io.PrintStream so = System.out;
        long opsPerSecond = sc.nextLong();
        so.println(slowThreshold(opsPerSecond));
    }

    static long slowThreshold(long opsPerSecond) {
        long n = 1;
        while (n * n <= opsPerSecond) {
            n++;
        }
        return n;
    }
}
`);

/* Q19 — Merge Sort Recursion Depth (blacklist: System.out.print, whitelist: return) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        java.io.PrintStream so = System.out;
        int n = sc.nextInt();
        so.println(mergeSortDepth(n));
    }

    static int mergeSortDepth(int n) {
        if (n <= 1) {
            return 0;
        }
        int left = mergeSortDepth(n / 2);
        int right = mergeSortDepth(n - n / 2);
        return 1 + Math.max(left, right);
    }
}
`);

/* Q20 — Collatz Step Counter (blacklist: System.out.print, whitelist: long) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        java.io.PrintStream so = System.out;
        long n = sc.nextLong();
        so.println(collatzSteps(n));
    }

    static long collatzSteps(long n) {
        long steps = 0;
        while (n != 1) {
            if (n % 2 == 0) {
                n /= 2;
            } else {
                n = 3 * n + 1;
            }
            steps++;
        }
        return steps;
    }
}
`);

export { solutions };
