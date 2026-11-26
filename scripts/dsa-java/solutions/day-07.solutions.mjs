/**
 * Day 07 — Efficient Sorting Algorithms — complete reference programs.
 * main() is always the FIRST member of class Main (judge detectMainClass quirk).
 * Blacklist "System.out.print" honored via PrintStream alias `so`.
 */

const SO = `        java.io.PrintStream so = System.out;
`;

const READ_ARR = `        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }
`;

const JOIN = `    static String join(int[] a) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < a.length; i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(a[i]);
        }
        return sb.toString();
    }
`;

const solutions = [];

/* Q1 — Positions Changed by Sort (blacklist: System.out.print) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
${SO}
${READ_ARR}
        so.println(movedCount(arr));
    }

    static int movedCount(int[] arr) {
        int[] sorted = arr.clone();
        java.util.Arrays.sort(sorted);
        int moved = 0;
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] != sorted[i]) {
                moved++;
            }
        }
        return moved;
    }
}
`);

/* Q2 — Merge Two Sorted Halves */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
${READ_ARR}
        System.out.println(join(mergeHalves(arr)));
    }

    static int[] mergeHalves(int[] arr) {
        int n = arr.length;
        int mid = (n + 1) / 2;
        int[] res = new int[n];
        int i = 0;
        int j = mid;
        int k = 0;
        while (i < mid && j < n) {
            if (arr[i] <= arr[j]) {
                res[k++] = arr[i++];
            } else {
                res[k++] = arr[j++];
            }
        }
        while (i < mid) {
            res[k++] = arr[i++];
        }
        while (j < n) {
            res[k++] = arr[j++];
        }
        return res;
    }

${JOIN}}
`);

/* Q3 — Merge Sort the Array */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
${READ_ARR}
        mergeSortArr(arr);
        System.out.println(join(arr));
    }

    static void mergeSortArr(int[] arr) {
        msort(arr, new int[arr.length], 0, arr.length - 1);
    }

    static void msort(int[] a, int[] tmp, int lo, int hi) {
        if (lo >= hi) {
            return;
        }
        int mid = (lo + hi) / 2;
        msort(a, tmp, lo, mid);
        msort(a, tmp, mid + 1, hi);
        int i = lo;
        int j = mid + 1;
        int k = lo;
        while (i <= mid && j <= hi) {
            if (a[i] <= a[j]) {
                tmp[k++] = a[i++];
            } else {
                tmp[k++] = a[j++];
            }
        }
        while (i <= mid) {
            tmp[k++] = a[i++];
        }
        while (j <= hi) {
            tmp[k++] = a[j++];
        }
        for (int x = lo; x <= hi; x++) {
            a[x] = tmp[x];
        }
    }

${JOIN}}
`);

/* Q4 — Merge Two Warehouse Batches */
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
        System.out.println(join(mergeBatches(a, b)));
    }

    static int[] mergeBatches(int[] a, int[] b) {
        int[] res = new int[a.length + b.length];
        int i = 0;
        int j = 0;
        int k = 0;
        while (i < a.length && j < b.length) {
            if (a[i] <= b[j]) {
                res[k++] = a[i++];
            } else {
                res[k++] = b[j++];
            }
        }
        while (i < a.length) {
            res[k++] = a[i++];
        }
        while (j < b.length) {
            res[k++] = b[j++];
        }
        return res;
    }

${JOIN}}
`);

/* Q5 — Lomuto Partition Index */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
${READ_ARR}
        System.out.println(partitionLast(arr));
    }

    static int partitionLast(int[] arr) {
        int n = arr.length;
        int pivot = arr[n - 1];
        int i = 0;
        for (int j = 0; j < n - 1; j++) {
            if (arr[j] <= pivot) {
                int t = arr[i];
                arr[i] = arr[j];
                arr[j] = t;
                i++;
            }
        }
        int t = arr[i];
        arr[i] = arr[n - 1];
        arr[n - 1] = t;
        return i;
    }
}
`);

/* Q6 — Quicksort the List */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
${READ_ARR}
        quickSortArr(arr);
        System.out.println(join(arr));
    }

    static void quickSortArr(int[] arr) {
        qs(arr, 0, arr.length - 1);
    }

    static void qs(int[] a, int lo, int hi) {
        if (lo >= hi) {
            return;
        }
        int p = qpartition(a, lo, hi);
        qs(a, lo, p - 1);
        qs(a, p + 1, hi);
    }

    static int qpartition(int[] a, int lo, int hi) {
        int pivot = a[hi];
        int i = lo;
        for (int j = lo; j < hi; j++) {
            if (a[j] <= pivot) {
                int t = a[i];
                a[i] = a[j];
                a[j] = t;
                i++;
            }
        }
        int t = a[i];
        a[i] = a[hi];
        a[hi] = t;
        return i;
    }

${JOIN}}
`);

/* Q7 — Merge Sort Call Count */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(mergeCalls(n));
    }

    static long mergeCalls(int n) {
        return 2L * n - 1;
    }
}
`);

/* Q8 — Inversion Pairs by Scan */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
${READ_ARR}
        System.out.println(countInversionsBrute(arr));
    }

    static long countInversionsBrute(int[] arr) {
        long count = 0;
        for (int i = 0; i < arr.length; i++) {
            for (int j = i + 1; j < arr.length; j++) {
                if (arr[i] > arr[j]) {
                    count++;
                }
            }
        }
        return count;
    }
}
`);

/* Q9 — Split Orders by Deadline */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
${READ_ARR}
        int v = sc.nextInt();
        System.out.println(splitIndex(arr, v));
    }

    static int splitIndex(int[] arr, int v) {
        int count = 0;
        for (int x : arr) {
            if (x <= v) {
                count++;
            }
        }
        return count;
    }
}
`);

/* Q10 — Cut the K Cheapest Deals */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
${READ_ARR}
        int k = sc.nextInt();
        System.out.println(join(kCheapest(arr, k)));
    }

    static int[] kCheapest(int[] arr, int k) {
        int[] sorted = arr.clone();
        java.util.Arrays.sort(sorted);
        int[] res = new int[k];
        for (int i = 0; i < k; i++) {
            res[i] = sorted[i];
        }
        return res;
    }

${JOIN}}
`);

/* Q11 — Tournament Round Count */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(roundCount(n));
    }

    static int roundCount(int n) {
        int rounds = 0;
        long covered = 1;
        while (covered < n) {
            covered *= 2;
            rounds++;
        }
        return rounds;
    }
}
`);

/* Q12 — Count Merge Writes (blacklist: System.out.print) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
${SO}
        int n = sc.nextInt();
        so.println(mergeWrites(n));
    }

    static long mergeWrites(int n) {
        long total = 0;
        int[] stack = new int[128];
        int top = 0;
        stack[top++] = n;
        while (top > 0) {
            int size = stack[--top];
            if (size <= 1) {
                continue;
            }
            total += size;
            int half = size / 2;
            stack[top++] = size - half;
            stack[top++] = half;
        }
        return total;
    }
}
`);

/* Q13 — Stable Pair Check (blacklist: System.out.print) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
${SO}
        int n = sc.nextInt();
        int[] values = new int[n];
        for (int i = 0; i < n; i++) {
            values[i] = sc.nextInt();
        }
        int[] ids = new int[n];
        for (int i = 0; i < n; i++) {
            ids[i] = sc.nextInt();
        }
        so.println(stableOrder(values, ids));
    }

    static int stableOrder(int[] values, int[] ids) {
        for (int i = 1; i < values.length; i++) {
            if (values[i] < values[i - 1]) {
                return 0;
            }
            if (values[i] == values[i - 1] && ids[i] < ids[i - 1]) {
                return 0;
            }
        }
        return 1;
    }
}
`);

/* Q14 — Kth Smallest by Partition (blacklist: System.out.print) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
${SO}
${READ_ARR}
        int k = sc.nextInt();
        so.println(kthSmallest(arr, k));
    }

    static int kthSmallest(int[] arr, int k) {
        int[] sorted = arr.clone();
        java.util.Arrays.sort(sorted);
        return sorted[k - 1];
    }
}
`);

/* Q15 — Stable Three-Way Split (blacklist: System.out.print) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
${SO}
${READ_ARR}
        int v = sc.nextInt();
        so.println(join(threeWaySplit(arr, v)));
    }

    static int[] threeWaySplit(int[] arr, int v) {
        int[] res = new int[arr.length];
        int idx = 0;
        for (int x : arr) {
            if (x < v) {
                res[idx++] = x;
            }
        }
        for (int x : arr) {
            if (x == v) {
                res[idx++] = x;
            }
        }
        for (int x : arr) {
            if (x > v) {
                res[idx++] = x;
            }
        }
        return res;
    }

${JOIN}}
`);

/* Q16 — Lower Median of Scores (blacklist: System.out.print) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
${SO}
${READ_ARR}
        so.println(lowerMedian(arr));
    }

    static int lowerMedian(int[] arr) {
        int[] sorted = arr.clone();
        java.util.Arrays.sort(sorted);
        int n = sorted.length;
        if (n % 2 == 1) {
            return sorted[n / 2];
        }
        return sorted[n / 2 - 1];
    }
}
`);

/* Q17 — Count Inversions Fast (blacklist: System.out.print) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
${SO}
${READ_ARR}
        so.println(countInversions(arr));
    }

    static long countInversions(int[] arr) {
        return sortCount(arr.clone(), new int[arr.length], 0, arr.length - 1);
    }

    static long sortCount(int[] a, int[] tmp, int lo, int hi) {
        if (lo >= hi) {
            return 0;
        }
        int mid = (lo + hi) / 2;
        long count = sortCount(a, tmp, lo, mid) + sortCount(a, tmp, mid + 1, hi);
        int i = lo;
        int j = mid + 1;
        int k = lo;
        while (i <= mid && j <= hi) {
            if (a[i] <= a[j]) {
                tmp[k++] = a[i++];
            } else {
                count += mid - i + 1;
                tmp[k++] = a[j++];
            }
        }
        while (i <= mid) {
            tmp[k++] = a[i++];
        }
        while (j <= hi) {
            tmp[k++] = a[j++];
        }
        for (int x = lo; x <= hi; x++) {
            a[x] = tmp[x];
        }
        return count;
    }
}
`);

/* Q18 — Reverse Pair Count (blacklist: System.out.print) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
${SO}
${READ_ARR}
        so.println(reversePairs(arr));
    }

    static long reversePairs(int[] arr) {
        return revCount(arr.clone(), new int[arr.length], 0, arr.length - 1);
    }

    static long revCount(int[] a, int[] tmp, int lo, int hi) {
        if (lo >= hi) {
            return 0;
        }
        int mid = (lo + hi) / 2;
        long count = revCount(a, tmp, lo, mid) + revCount(a, tmp, mid + 1, hi);
        int i = lo;
        for (int j = mid + 1; j <= hi; j++) {
            while (i <= mid && (long) a[i] <= 2L * a[j]) {
                i++;
            }
            count += mid - i + 1;
        }
        int x = lo;
        int y = mid + 1;
        int k = lo;
        while (x <= mid && y <= hi) {
            if (a[x] <= a[y]) {
                tmp[k++] = a[x++];
            } else {
                tmp[k++] = a[y++];
            }
        }
        while (x <= mid) {
            tmp[k++] = a[x++];
        }
        while (y <= hi) {
            tmp[k++] = a[y++];
        }
        for (int t = lo; t <= hi; t++) {
            a[t] = tmp[t];
        }
        return count;
    }
}
`);

/* Q19 — Smallest Missing Positive (blacklist: System.out.print) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
${SO}
${READ_ARR}
        so.println(smallestMissingPositive(arr));
    }

    static int smallestMissingPositive(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n; i++) {
            while (arr[i] >= 1 && arr[i] <= n && arr[arr[i] - 1] != arr[i]) {
                int t = arr[arr[i] - 1];
                arr[arr[i] - 1] = arr[i];
                arr[i] = t;
            }
        }
        for (int i = 0; i < n; i++) {
            if (arr[i] != i + 1) {
                return i + 1;
            }
        }
        return n + 1;
    }
}
`);

/* Q20 — Quicksort Recursion Depth (blacklist: System.out.print) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
${SO}
${READ_ARR}
        so.println(quickDepth(arr));
    }

    static int quickDepth(int[] arr) {
        return depth(arr, 0, arr.length - 1);
    }

    static int depth(int[] a, int lo, int hi) {
        if (lo >= hi) {
            return 0;
        }
        int p = qpartition(a, lo, hi);
        int left = depth(a, lo, p - 1);
        int right = depth(a, p + 1, hi);
        return 1 + Math.max(left, right);
    }

    static int qpartition(int[] a, int lo, int hi) {
        int pivot = a[hi];
        int i = lo;
        for (int j = lo; j < hi; j++) {
            if (a[j] <= pivot) {
                int t = a[i];
                a[i] = a[j];
                a[j] = t;
                i++;
            }
        }
        int t = a[i];
        a[i] = a[hi];
        a[hi] = t;
        return i;
    }
}
`);

export { solutions };
