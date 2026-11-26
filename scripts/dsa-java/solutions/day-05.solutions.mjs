/**
 * Day 05 — Searching Algorithms — complete reference programs.
 * main() is always the FIRST member of class Main (judge detectMainClass quirk).
 */

const READ_ARR = `        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }
`;

const READ_ARR_TARGET = `        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }
        int target = sc.nextInt();
`;

const solutions = [];

/* Q1 — Count in a Sorted Array (blacklist: System.out.print) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        java.io.PrintStream so = System.out;
${READ_ARR_TARGET}
        so.println(countInSorted(arr, target));
    }

    static int countInSorted(int[] arr, int target) {
        int lo = 0;
        int hi = arr.length - 1;
        while (lo <= hi) {
            int mid = (lo + hi) / 2;
            if (arr[mid] >= target) {
                hi = mid - 1;
            } else {
                lo = mid + 1;
            }
        }
        int first = lo;
        if (first >= arr.length || arr[first] != target) {
            return 0;
        }
        lo = first;
        hi = arr.length - 1;
        while (lo <= hi) {
            int mid = (lo + hi) / 2;
            if (arr[mid] <= target) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return lo - first;
    }
}
`);

/* Q2 — Closest Element (blacklist: System.out.print) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        java.io.PrintStream so = System.out;
${READ_ARR_TARGET}
        so.println(closestElement(arr, target));
    }

    static int closestElement(int[] arr, int target) {
        int lo = 0;
        int hi = arr.length - 1;
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (arr[mid] < target) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        if (lo >= arr.length) {
            return arr[arr.length - 1];
        }
        if (arr[lo] == target) {
            return arr[lo];
        }
        int after = arr[lo];
        if (lo == 0) {
            return after;
        }
        int before = arr[lo - 1];
        if (Math.abs(before - target) <= Math.abs(after - target)) {
            return before;
        }
        return after;
    }
}
`);

/* Q3 — Linear Search Index */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
${READ_ARR_TARGET}
        System.out.println(linearSearch(arr, target));
    }

    static int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                return i;
            }
        }
        return -1;
    }
}
`);

/* Q4 — Binary Search Index */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
${READ_ARR_TARGET}
        System.out.println(binarySearch(arr, target));
    }

    static int binarySearch(int[] arr, int target) {
        int lo = 0;
        int hi = arr.length - 1;
        while (lo <= hi) {
            int mid = (lo + hi) / 2;
            if (arr[mid] == target) {
                return mid;
            }
            if (arr[mid] < target) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return -1;
    }
}
`);

/* Q5 — Count Occurrences (Unsorted) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
${READ_ARR_TARGET}
        System.out.println(countOccurrences(arr, target));
    }

    static int countOccurrences(int[] arr, int target) {
        int count = 0;
        for (int v : arr) {
            if (v == target) {
                count++;
            }
        }
        return count;
    }
}
`);

/* Q6 — Index of the Maximum */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
${READ_ARR}
        System.out.println(maxIndex(arr));
    }

    static int maxIndex(int[] arr) {
        int best = 0;
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > arr[best]) {
                best = i;
            }
        }
        return best;
    }
}
`);

/* Q7 — First Occurrence (Sorted) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
${READ_ARR_TARGET}
        System.out.println(firstOccurrence(arr, target));
    }

    static int firstOccurrence(int[] arr, int target) {
        int lo = 0;
        int hi = arr.length - 1;
        int ans = -1;
        while (lo <= hi) {
            int mid = (lo + hi) / 2;
            if (arr[mid] == target) {
                ans = mid;
                hi = mid - 1;
            } else if (arr[mid] < target) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return ans;
    }
}
`);

/* Q8 — Last Occurrence (Sorted) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
${READ_ARR_TARGET}
        System.out.println(lastOccurrence(arr, target));
    }

    static int lastOccurrence(int[] arr, int target) {
        int lo = 0;
        int hi = arr.length - 1;
        int ans = -1;
        while (lo <= hi) {
            int mid = (lo + hi) / 2;
            if (arr[mid] == target) {
                ans = mid;
                lo = mid + 1;
            } else if (arr[mid] < target) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return ans;
    }
}
`);

/* Q9 — Library Book Lookup */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
${READ_ARR_TARGET}
        System.out.println(findBook(arr, target));
    }

    static int findBook(int[] ids, int target) {
        for (int i = 0; i < ids.length; i++) {
            if (ids[i] == target) {
                return i;
            }
        }
        return -1;
    }
}
`);

/* Q10 — Exam Roll Number Finder */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
${READ_ARR_TARGET}
        System.out.println(findRoll(arr, target));
    }

    static int findRoll(int[] rolls, int target) {
        int lo = 0;
        int hi = rolls.length - 1;
        while (lo <= hi) {
            int mid = (lo + hi) / 2;
            if (rolls[mid] == target) {
                return mid;
            }
            if (rolls[mid] < target) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return -1;
    }
}
`);

/* Q11 — Sorted or Not */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
${READ_ARR}
        System.out.println(isSorted(arr));
    }

    static int isSorted(int[] arr) {
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] < arr[i - 1]) {
                return 0;
            }
        }
        return 1;
    }
}
`);

/* Q12 — First Price Above Budget */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
${READ_ARR_TARGET}
        System.out.println(firstAbove(arr, target));
    }

    static int firstAbove(int[] prices, int budget) {
        for (int i = 0; i < prices.length; i++) {
            if (prices[i] > budget) {
                return i;
            }
        }
        return -1;
    }
}
`);

/* Q13 — Search Insert Position (blacklist: System.out.print) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        java.io.PrintStream so = System.out;
${READ_ARR_TARGET}
        so.println(searchInsert(arr, target));
    }

    static int searchInsert(int[] arr, int target) {
        int lo = 0;
        int hi = arr.length;
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (arr[mid] < target) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    }
}
`);

/* Q14 — Upper Bound Index (blacklist: System.out.print) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        java.io.PrintStream so = System.out;
${READ_ARR_TARGET}
        so.println(upperBound(arr, target));
    }

    static int upperBound(int[] arr, int target) {
        int lo = 0;
        int hi = arr.length;
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (arr[mid] <= target) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    }
}
`);

/* Q15 — Integer Square Root by Search (blacklist: System.out.print, whitelist: while) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        java.io.PrintStream so = System.out;
        long n = sc.nextLong();
        so.println(intSqrt(n));
    }

    static long intSqrt(long n) {
        long lo = 0;
        long hi = 2000000000;
        while (lo < hi) {
            long mid = (lo + hi + 1) / 2;
            if (mid <= n / mid) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        return lo;
    }
}
`);

/* Q16 — Minimum in a Rotated List (blacklist: System.out.print) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        java.io.PrintStream so = System.out;
${READ_ARR}
        so.println(findMin(arr));
    }

    static int findMin(int[] arr) {
        int lo = 0;
        int hi = arr.length - 1;
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (arr[mid] > arr[hi]) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return arr[lo];
    }
}
`);

/* Q17 — Missing Roll Number (blacklist: System.out.print) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        java.io.PrintStream so = System.out;
${READ_ARR}
        so.println(missingNumber(arr));
    }

    static int missingNumber(int[] arr) {
        int lo = 0;
        int hi = arr.length - 1;
        int ans = arr.length;
        while (lo <= hi) {
            int mid = (lo + hi) / 2;
            if (arr[mid] > mid) {
                ans = mid;
                hi = mid - 1;
            } else {
                lo = mid + 1;
            }
        }
        return ans;
    }
}
`);

/* Q18 — Bitonic Peak Finder (blacklist: System.out.print) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        java.io.PrintStream so = System.out;
${READ_ARR}
        so.println(findPeak(arr));
    }

    static int findPeak(int[] arr) {
        int lo = 0;
        int hi = arr.length - 1;
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (arr[mid] < arr[mid + 1]) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    }
}
`);

/* Q19 — Search a Rotated Array (blacklist: System.out.print) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        java.io.PrintStream so = System.out;
${READ_ARR_TARGET}
        so.println(rotatedSearch(arr, target));
    }

    static int rotatedSearch(int[] arr, int target) {
        int lo = 0;
        int hi = arr.length - 1;
        while (lo <= hi) {
            int mid = (lo + hi) / 2;
            if (arr[mid] == target) {
                return mid;
            }
            if (arr[lo] <= arr[mid]) {
                if (target >= arr[lo] && target < arr[mid]) {
                    hi = mid - 1;
                } else {
                    lo = mid + 1;
                }
            } else {
                if (target > arr[mid] && target <= arr[hi]) {
                    lo = mid + 1;
                } else {
                    hi = mid - 1;
                }
            }
        }
        return -1;
    }
}
`);

/* Q20 — Kth Smallest Across Two Lists (blacklist: System.out.print) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        java.io.PrintStream so = System.out;
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
        int k = sc.nextInt();
        so.println(kthSmallest(a, b, k));
    }

    static int kthSmallest(int[] a, int[] b, int k) {
        int i = 0;
        int j = 0;
        int value = 0;
        for (int picked = 0; picked < k; picked++) {
            if (i < a.length && (j >= b.length || a[i] <= b[j])) {
                value = a[i];
                i++;
            } else {
                value = b[j];
                j++;
            }
        }
        return value;
    }
}
`);

export { solutions };
