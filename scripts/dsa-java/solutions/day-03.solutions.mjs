/**
 * Day 03 — Arrays and ArrayList — complete reference programs.
 * main() is always the FIRST member of class Main (judge detectMainClass quirk).
 */

const JOIN = `        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < arr.length; i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(arr[i]);
        }
`;

const READ_ARR = `        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }
`;

const solutions = [];

/* Q1 — Rotate Array by K (blacklist: System.out.print, whitelist: %) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        java.io.PrintStream so = System.out;
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }
        int k = sc.nextInt();
        rotate(arr, k);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < arr.length; i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(arr[i]);
        }
        so.println(sb);
    }

    static void rotate(int[] arr, int k) {
        int n = arr.length;
        k %= n;
        int[] tmp = new int[n];
        for (int i = 0; i < n; i++) {
            tmp[(i + k) % n] = arr[i];
        }
        for (int i = 0; i < n; i++) {
            arr[i] = tmp[i];
        }
    }
}
`);

/* Q2 — Array Minimum */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
${READ_ARR}
        System.out.println(arrayMin(arr));
    }

    static int arrayMin(int[] arr) {
        int min = arr[0];
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] < min) {
                min = arr[i];
            }
        }
        return min;
    }
}
`);

/* Q3 — Array Maximum */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
${READ_ARR}
        System.out.println(arrayMax(arr));
    }

    static int arrayMax(int[] arr) {
        int max = arr[0];
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                max = arr[i];
            }
        }
        return max;
    }
}
`);

/* Q4 — Array Sum and Average */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
${READ_ARR}
        int sum = arraySum(arr);
        System.out.println(sum);
        System.out.printf(java.util.Locale.ROOT, "%.2f%n", sum / (double) arr.length);
    }

    static int arraySum(int[] arr) {
        int sum = 0;
        for (int i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
        return sum;
    }
}
`);

/* Q5 — Reverse an Array In Place */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
${READ_ARR}
        reverseInPlace(arr);
${JOIN}
        System.out.println(sb);
    }

    static void reverseInPlace(int[] arr) {
        int i = 0;
        int j = arr.length - 1;
        while (i < j) {
            int tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
            i++;
            j--;
        }
    }
}
`);

/* Q6 — Swap First and Last */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
${READ_ARR}
        swapEnds(arr);
${JOIN}
        System.out.println(sb);
    }

    static void swapEnds(int[] arr) {
        int tmp = arr[0];
        arr[0] = arr[arr.length - 1];
        arr[arr.length - 1] = tmp;
    }
}
`);

/* Q7 — ArrayList Middle Element */
solutions.push(`import java.util.ArrayList;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        ArrayList<Integer> list = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            list.add(sc.nextInt());
        }
        System.out.println(middleElement(list));
    }

    static int middleElement(ArrayList<Integer> list) {
        return list.get(list.size() / 2);
    }
}
`);

/* Q8 — Above Average Scores */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
${READ_ARR}
        System.out.println(aboveAverage(arr));
    }

    static int aboveAverage(int[] scores) {
        long total = 0;
        for (int s : scores) {
            total += s;
        }
        double avg = total / (double) scores.length;
        int count = 0;
        for (int s : scores) {
            if (s > avg) {
                count++;
            }
        }
        return count;
    }
}
`);

/* Q9 — VIP Queue Insert */
solutions.push(`import java.util.ArrayList;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        ArrayList<Integer> list = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            list.add(sc.nextInt());
        }
        int pos = sc.nextInt();
        int val = sc.nextInt();
        insertAtPosition(list, pos, val);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < list.size(); i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(list.get(i));
        }
        System.out.println(sb);
    }

    static void insertAtPosition(ArrayList<Integer> list, int pos, int val) {
        list.add(pos, val);
    }
}
`);

/* Q10 — Temperature Range */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
${READ_ARR}
        System.out.println(temperatureRange(arr));
    }

    static int temperatureRange(int[] temps) {
        int min = temps[0];
        int max = temps[0];
        for (int i = 1; i < temps.length; i++) {
            if (temps[i] < min) {
                min = temps[i];
            }
            if (temps[i] > max) {
                max = temps[i];
            }
        }
        return max - min;
    }
}
`);

/* Q11 — Discounted Cart Total */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
${READ_ARR}
        int d = sc.nextInt();
        System.out.println(totalAfterDiscount(arr, d));
    }

    static int totalAfterDiscount(int[] prices, int discountPercent) {
        int total = 0;
        for (int p : prices) {
            total += p;
        }
        return total - total * discountPercent / 100;
    }
}
`);

/* Q12 — Remove Duplicates from Sorted Array (blacklist: System.out.print) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        java.io.PrintStream so = System.out;
${READ_ARR}
        int k = removeDuplicates(arr);
        so.println(k);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < k; i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(arr[i]);
        }
        so.println(sb);
    }

    static int removeDuplicates(int[] arr) {
        int k = 1;
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] != arr[k - 1]) {
                arr[k] = arr[i];
                k++;
            }
        }
        return k;
    }
}
`);

/* Q13 — Second Largest Element (blacklist: Arrays.sort) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
${READ_ARR}
        System.out.println(secondLargest(arr));
    }

    static int secondLargest(int[] arr) {
        int first = Integer.MIN_VALUE;
        int second = Integer.MIN_VALUE;
        for (int v : arr) {
            if (v > first) {
                second = first;
                first = v;
            } else if (v > second && v < first) {
                second = v;
            }
        }
        return second;
    }
}
`);

/* Q14 — Clear Out the Minimum Stock (blacklist: System.out.print, whitelist: remove) */
solutions.push(`import java.util.ArrayList;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        java.io.PrintStream so = System.out;
        int n = sc.nextInt();
        ArrayList<Integer> list = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            list.add(sc.nextInt());
        }
        int removed = removeMin(list);
        so.println(removed);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < list.size(); i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(list.get(i));
        }
        so.println(sb);
    }

    static int removeMin(ArrayList<Integer> list) {
        int min = list.get(0);
        for (int v : list) {
            if (v < min) {
                min = v;
            }
        }
        int removed = 0;
        for (int i = list.size() - 1; i >= 0; i--) {
            if (list.get(i) == min) {
                list.remove(i);
                removed++;
            }
        }
        return removed;
    }
}
`);

/* Q15 — Update Then Delete Slot (blacklist: System.out.print) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        java.io.PrintStream so = System.out;
${READ_ARR}
        int p = sc.nextInt();
        int v = sc.nextInt();
        int q = sc.nextInt();
        int[] out = updateThenDelete(arr, p, v, q);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < out.length; i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(out[i]);
        }
        so.println(sb);
    }

    static int[] updateThenDelete(int[] arr, int p, int v, int q) {
        arr[p] = v;
        int[] out = new int[arr.length - 1];
        int idx = 0;
        for (int i = 0; i < arr.length; i++) {
            if (i != q) {
                out[idx] = arr[i];
                idx++;
            }
        }
        return out;
    }
}
`);

/* Q16 — Prefix Maximum Array (blacklist: System.out.print) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        java.io.PrintStream so = System.out;
${READ_ARR}
        int[] out = prefixMax(arr);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < out.length; i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(out[i]);
        }
        so.println(sb);
    }

    static int[] prefixMax(int[] arr) {
        int[] out = new int[arr.length];
        int run = arr[0];
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] > run) {
                run = arr[i];
            }
            out[i] = run;
        }
        return out;
    }
}
`);

/* Q17 — Merge Two Sorted Arrays (blacklist: Arrays.sort) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int m = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) {
            a[i] = sc.nextInt();
        }
        int[] b = new int[m];
        for (int i = 0; i < m; i++) {
            b[i] = sc.nextInt();
        }
        int[] out = mergeSorted(a, b);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < out.length; i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(out[i]);
        }
        System.out.println(sb);
    }

    static int[] mergeSorted(int[] a, int[] b) {
        int[] out = new int[a.length + b.length];
        int i = 0;
        int j = 0;
        int k = 0;
        while (i < a.length && j < b.length) {
            if (a[i] <= b[j]) {
                out[k] = a[i];
                i++;
            } else {
                out[k] = b[j];
                j++;
            }
            k++;
        }
        while (i < a.length) {
            out[k] = a[i];
            i++;
            k++;
        }
        while (j < b.length) {
            out[k] = b[j];
            j++;
            k++;
        }
        return out;
    }
}
`);

/* Q18 — Longest Increasing Run (blacklist: Arrays.sort) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
${READ_ARR}
        System.out.println(longestIncreasingRun(arr));
    }

    static int longestIncreasingRun(int[] arr) {
        int best = 1;
        int run = 1;
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > arr[i - 1]) {
                run++;
                if (run > best) {
                    best = run;
                }
            } else {
                run = 1;
            }
        }
        return best;
    }
}
`);

/* Q19 — Product Array Without Division (blacklist: /, whitelist: long) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }
        long[] out = productExceptSelf(arr);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(out[i]);
        }
        System.out.println(sb);
    }

    static long[] productExceptSelf(int[] arr) {
        int n = arr.length;
        long[] pre = new long[n];
        long[] suf = new long[n];
        pre[0] = 1;
        for (int i = 1; i < n; i++) {
            pre[i] = pre[i - 1] * arr[i - 1];
        }
        suf[n - 1] = 1;
        for (int i = n - 2; i >= 0; i--) {
            suf[i] = suf[i + 1] * arr[i + 1];
        }
        long[] out = new long[n];
        for (int i = 0; i < n; i++) {
            out[i] = pre[i] * suf[i];
        }
        return out;
    }
}
`);

/* Q20 — Maximum Subarray Sum (blacklist: Arrays.sort, whitelist: long) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
${READ_ARR}
        System.out.println(maxSubarraySum(arr));
    }

    static long maxSubarraySum(int[] arr) {
        long best = arr[0];
        long cur = arr[0];
        for (int i = 1; i < arr.length; i++) {
            cur = Math.max(arr[i], cur + arr[i]);
            best = Math.max(best, cur);
        }
        return best;
    }
}
`);

export { solutions };
