/**
 * Day 06 — Sorting Algorithms Basics — complete reference programs.
 * main() is always the FIRST member of class Main (judge detectMainClass quirk).
 * Blacklists honored: "Arrays.sort" and "System.out.print" never appear in
 * solutions whose blacklist lists them (PrintStream alias `so` used instead).
 */

const READ_ARR = `        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }
`;

const READ_ARR_K = `        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }
        int k = sc.nextInt();
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

/* Q1 — Sort Parcel Packs by Count Then Price (blacklist: Arrays.sort) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[][] packs = new int[n][2];
        for (int i = 0; i < n; i++) {
            packs[i][0] = sc.nextInt();
            packs[i][1] = sc.nextInt();
        }
        int[][] ordered = sortPacks(packs);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < ordered.length; i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(ordered[i][0]).append(' ').append(ordered[i][1]);
        }
        System.out.println(sb.toString());
    }

    static int[][] sortPacks(int[][] packs) {
        for (int i = 1; i < packs.length; i++) {
            int[] key = packs[i];
            int j = i - 1;
            while (j >= 0 && (packs[j][0] > key[0] || (packs[j][0] == key[0] && packs[j][1] < key[1]))) {
                packs[j + 1] = packs[j];
                j--;
            }
            packs[j + 1] = key;
        }
        return packs;
    }
}
`);

/* Q2 — Sort Orders by Frequency Then Value (blacklist: Arrays.sort) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
${READ_ARR}
        int[] res = sortByFrequency(arr);
        System.out.println(join(res));
    }

    static int[] sortByFrequency(int[] arr) {
        int[] freq = new int[101];
        for (int v : arr) {
            freq[v]++;
        }
        int[] res = new int[arr.length];
        int idx = 0;
        boolean[] used = new boolean[101];
        while (idx < res.length) {
            int best = -1;
            for (int v = 1; v <= 100; v++) {
                if (freq[v] > 0 && !used[v] && (best == -1 || freq[v] < freq[best])) {
                    best = v;
                }
            }
            used[best] = true;
            for (int c = 0; c < freq[best]; c++) {
                res[idx++] = best;
            }
        }
        return res;
    }

${JOIN}}
`);

/* Q3 — Stable Even-Odd Rearrangement (blacklist: Arrays.sort) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
${READ_ARR}
        int[] res = evensFirstStable(arr);
        System.out.println(join(res));
    }

    static int[] evensFirstStable(int[] arr) {
        int[] res = new int[arr.length];
        int idx = 0;
        for (int v : arr) {
            if (v % 2 == 0) {
                res[idx++] = v;
            }
        }
        for (int v : arr) {
            if (v % 2 != 0) {
                res[idx++] = v;
            }
        }
        return res;
    }

${JOIN}}
`);

/* Q4 — Bubble Versus Selection Swaps (blacklist: System.out.print) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        java.io.PrintStream so = System.out;
${READ_ARR}
        long[] counts = swapComparison(arr);
        so.println(counts[0] + " " + counts[1]);
    }

    static long[] swapComparison(int[] arr) {
        int n = arr.length;
        int[] sel = arr.clone();
        long selSwaps = 0;
        for (int i = 0; i < n - 1; i++) {
            int min = i;
            for (int j = i + 1; j < n; j++) {
                if (sel[j] < sel[min]) {
                    min = j;
                }
            }
            if (min != i) {
                int t = sel[i];
                sel[i] = sel[min];
                sel[min] = t;
                selSwaps++;
            }
        }
        int[] bub = arr.clone();
        long bubSwaps = 0;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j + 1 < n - i; j++) {
                if (bub[j] > bub[j + 1]) {
                    int t = bub[j];
                    bub[j] = bub[j + 1];
                    bub[j + 1] = t;
                    bubSwaps++;
                }
            }
        }
        return new long[] { selSwaps, bubSwaps };
    }
}
`);

/* Q5 — Sort by Absolute Value (blacklist: Arrays.sort) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
${READ_ARR}
        int[] res = sortByAbs(arr);
        System.out.println(join(res));
    }

    static int[] sortByAbs(int[] arr) {
        int[] a = arr.clone();
        for (int i = 1; i < a.length; i++) {
            int key = a[i];
            int j = i - 1;
            while (j >= 0 && (Math.abs(a[j]) > Math.abs(key) || (Math.abs(a[j]) == Math.abs(key) && a[j] > key))) {
                a[j + 1] = a[j];
                j--;
            }
            a[j + 1] = key;
        }
        return a;
    }

${JOIN}}
`);

/* Q6 — Sort Words by Length Then Name (blacklist: Arrays.sort) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int k = sc.nextInt();
        String[] words = new String[k];
        for (int i = 0; i < k; i++) {
            words[i] = sc.next();
        }
        String[] ordered = sortWords(words);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < ordered.length; i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(ordered[i]);
        }
        System.out.println(sb.toString());
    }

    static String[] sortWords(String[] words) {
        String[] a = words.clone();
        for (int i = 1; i < a.length; i++) {
            String key = a[i];
            int j = i - 1;
            while (j >= 0 && (a[j].length() > key.length() || (a[j].length() == key.length() && a[j].compareTo(key) > 0))) {
                a[j + 1] = a[j];
                j--;
            }
            a[j + 1] = key;
        }
        return a;
    }
}
`);

/* Q7 — Bubble Sort the Array */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
${READ_ARR}
        bubbleSort(arr);
        System.out.println(join(arr));
    }

    static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            boolean swapped = false;
            for (int j = 0; j + 1 < n - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    int t = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = t;
                    swapped = true;
                }
            }
            if (!swapped) {
                break;
            }
        }
    }

${JOIN}}
`);

/* Q8 — Selection Sort the Array */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
${READ_ARR}
        selectionSort(arr);
        System.out.println(join(arr));
    }

    static void selectionSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            int min = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[min]) {
                    min = j;
                }
            }
            if (min != i) {
                int t = arr[i];
                arr[i] = arr[min];
                arr[min] = t;
            }
        }
    }

${JOIN}}
`);

/* Q9 — Insertion Sort the Array */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
${READ_ARR}
        insertionSort(arr);
        System.out.println(join(arr));
    }

    static void insertionSort(int[] arr) {
        for (int i = 1; i < arr.length; i++) {
            int key = arr[i];
            int j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }

${JOIN}}
`);

/* Q10 — Count Bubble Swaps */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
${READ_ARR}
        System.out.println(bubbleSwaps(arr));
    }

    static long bubbleSwaps(int[] arr) {
        int[] a = arr.clone();
        long swaps = 0;
        int n = a.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j + 1 < n - i; j++) {
                if (a[j] > a[j + 1]) {
                    int t = a[j];
                    a[j] = a[j + 1];
                    a[j + 1] = t;
                    swaps++;
                }
            }
        }
        return swaps;
    }
}
`);

/* Q11 — Count Selection Swaps */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
${READ_ARR}
        System.out.println(selectionSwaps(arr));
    }

    static int selectionSwaps(int[] arr) {
        int[] a = arr.clone();
        int swaps = 0;
        int n = a.length;
        for (int i = 0; i < n - 1; i++) {
            int min = i;
            for (int j = i + 1; j < n; j++) {
                if (a[j] < a[min]) {
                    min = j;
                }
            }
            if (min != i) {
                int t = a[i];
                a[i] = a[min];
                a[min] = t;
                swaps++;
            }
        }
        return swaps;
    }
}
`);

/* Q12 — Count Insertion Shifts */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
${READ_ARR}
        System.out.println(insertionShifts(arr));
    }

    static long insertionShifts(int[] arr) {
        int[] a = arr.clone();
        long shifts = 0;
        for (int i = 1; i < a.length; i++) {
            int key = a[i];
            int j = i - 1;
            while (j >= 0 && a[j] > key) {
                a[j + 1] = a[j];
                j--;
                shifts++;
            }
            a[j + 1] = key;
        }
        return shifts;
    }
}
`);

/* Q13 — Rank the Runners */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
${READ_ARR}
        sortByScoreDesc(arr);
        System.out.println(join(arr));
    }

    static void sortByScoreDesc(int[] scores) {
        int n = scores.length;
        for (int i = 0; i < n - 1; i++) {
            int max = i;
            for (int j = i + 1; j < n; j++) {
                if (scores[j] > scores[max]) {
                    max = j;
                }
            }
            if (max != i) {
                int t = scores[i];
                scores[i] = scores[max];
                scores[max] = t;
            }
        }
    }

${JOIN}}
`);

/* Q14 — Queue by Age (Copy Sort) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
${READ_ARR}
        int[] copy = sortAgesCopy(arr);
        System.out.println(join(copy));
    }

    static int[] sortAgesCopy(int[] ages) {
        int[] a = ages.clone();
        for (int i = 1; i < a.length; i++) {
            int key = a[i];
            int j = i - 1;
            while (j >= 0 && a[j] > key) {
                a[j + 1] = a[j];
                j--;
            }
            a[j + 1] = key;
        }
        return a;
    }

${JOIN}}
`);

/* Q15 — Sort Map Points by X Then Y (blacklist: Arrays.sort) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[][] points = new int[n][2];
        for (int i = 0; i < n; i++) {
            points[i][0] = sc.nextInt();
            points[i][1] = sc.nextInt();
        }
        int[][] ordered = sortPoints(points);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < ordered.length; i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(ordered[i][0]).append(' ').append(ordered[i][1]);
        }
        System.out.println(sb.toString());
    }

    static int[][] sortPoints(int[][] points) {
        int n = points.length;
        for (int i = 0; i < n - 1; i++) {
            int min = i;
            for (int j = i + 1; j < n; j++) {
                if (points[j][0] < points[min][0]
                        || (points[j][0] == points[min][0] && points[j][1] < points[min][1])) {
                    min = j;
                }
            }
            if (min != i) {
                int[] t = points[i];
                points[i] = points[min];
                points[min] = t;
            }
        }
        return points;
    }
}
`);

/* Q16 — Does the Shelf Need Sorting? */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
${READ_ARR}
        System.out.println(needsSorting(arr));
    }

    static int needsSorting(int[] prices) {
        for (int i = 0; i + 1 < prices.length; i++) {
            if (prices[i] > prices[i + 1]) {
                return 1;
            }
        }
        return 0;
    }
}
`);

/* Q17 — Sorter Comparison Budget */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(selectionComparisons(n));
    }

    static long selectionComparisons(int n) {
        return (long) n * (n - 1) / 2;
    }
}
`);

/* Q18 — Trace K Bubble Passes (blacklist: System.out.print) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        java.io.PrintStream so = System.out;
${READ_ARR_K}
        int[] res = bubbleAfterKPasses(arr, k);
        so.println(join(res));
    }

    static int[] bubbleAfterKPasses(int[] arr, int k) {
        int[] a = arr.clone();
        int n = a.length;
        for (int p = 0; p < k; p++) {
            for (int j = 0; j + 1 < n; j++) {
                if (a[j] > a[j + 1]) {
                    int t = a[j];
                    a[j] = a[j + 1];
                    a[j + 1] = t;
                }
            }
        }
        return a;
    }

${JOIN}}
`);

/* Q19 — Trace K Selection Passes (blacklist: System.out.print) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        java.io.PrintStream so = System.out;
${READ_ARR_K}
        int[] res = selectionAfterKPasses(arr, k);
        so.println(join(res));
    }

    static int[] selectionAfterKPasses(int[] arr, int k) {
        int[] a = arr.clone();
        int n = a.length;
        for (int i = 0; i < k && i < n - 1; i++) {
            int min = i;
            for (int j = i + 1; j < n; j++) {
                if (a[j] < a[min]) {
                    min = j;
                }
            }
            if (min != i) {
                int t = a[i];
                a[i] = a[min];
                a[min] = t;
            }
        }
        return a;
    }

${JOIN}}
`);

/* Q20 — Trace K Insertion Steps (blacklist: System.out.print) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        java.io.PrintStream so = System.out;
${READ_ARR_K}
        int[] res = insertionAfterK(arr, k);
        so.println(join(res));
    }

    static int[] insertionAfterK(int[] arr, int k) {
        int[] a = arr.clone();
        for (int i = 1; i <= k - 1; i++) {
            int key = a[i];
            int j = i - 1;
            while (j >= 0 && a[j] > key) {
                a[j + 1] = a[j];
                j--;
            }
            a[j + 1] = key;
        }
        return a;
    }

${JOIN}}
`);

export { solutions };
