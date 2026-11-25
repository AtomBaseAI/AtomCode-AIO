export default [
  // [0] Queue Reversal Via a Stack
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        System.out.println(join(reversedQueue(a)));
    }

    static String join(int[] a) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < a.length; i++) {
            if (i > 0) sb.append(' ');
            sb.append(a[i]);
        }
        return sb.toString();
    }

    static int[] reversedQueue(int[] a) {
        ArrayDeque<Integer> queue = new ArrayDeque<>();
        for (int v : a) queue.add(v);
        ArrayDeque<Integer> st = new ArrayDeque<>();
        while (!queue.isEmpty()) st.push(queue.poll());
        int[] out = new int[a.length];
        for (int i = 0; i < out.length; i++) out[i] = st.pop();
        return out;
    }
}`,

  // [1] FIFO Serving Order
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        System.out.println(join(servedOrder(a)));
    }

    static String join(int[] a) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < a.length; i++) {
            if (i > 0) sb.append(' ');
            sb.append(a[i]);
        }
        return sb.toString();
    }

    static int[] servedOrder(int[] a) {
        ArrayDeque<Integer> queue = new ArrayDeque<>();
        for (int v : a) queue.add(v);
        int[] out = new int[a.length];
        for (int i = 0; i < out.length; i++) out[i] = queue.poll();
        return out;
    }
}`,

  // [2] Sum of First K Dequeued
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int k = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        System.out.println(sumDequeued(a, k));
    }

    static long sumDequeued(int[] a, int k) {
        ArrayDeque<Integer> queue = new ArrayDeque<>();
        for (int v : a) queue.add(v);
        long sum = 0;
        for (int i = 0; i < k; i++) sum += queue.poll();
        return sum;
    }
}`,

  // [3] Deque Shuffle
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        System.out.println(join(dequeShuffle(a)));
    }

    static String join(int[] a) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < a.length; i++) {
            if (i > 0) sb.append(' ');
            sb.append(a[i]);
        }
        return sb.toString();
    }

    static int[] dequeShuffle(int[] a) {
        ArrayDeque<Integer> dq = new ArrayDeque<>();
        for (int i = 0; i < a.length; i++) {
            if (i % 2 == 0) dq.addLast(a[i]);
            else dq.addFirst(a[i]);
        }
        int[] out = new int[dq.size()];
        for (int i = 0; i < out.length; i++) out[i] = dq.pollFirst();
        return out;
    }
}`,

  // [4] Sliding Window Sums
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int k = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        long[] sums = windowSums(a, k);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < sums.length; i++) {
            if (i > 0) sb.append(' ');
            sb.append(sums[i]);
        }
        System.out.println(sb.toString());
    }

    static long[] windowSums(int[] a, int k) {
        long[] out = new long[a.length - k + 1];
        long sum = 0;
        for (int i = 0; i < a.length; i++) {
            sum += a[i];
            if (i >= k) sum -= a[i - k];
            if (i >= k - 1) out[i - k + 1] = sum;
        }
        return out;
    }
}`,

  // [5] Rotate a Queue
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int k = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        System.out.println(join(rotatedQueue(a, k)));
    }

    static String join(int[] a) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < a.length; i++) {
            if (i > 0) sb.append(' ');
            sb.append(a[i]);
        }
        return sb.toString();
    }

    static int[] rotatedQueue(int[] a, int k) {
        ArrayDeque<Integer> dq = new ArrayDeque<>();
        for (int v : a) dq.add(v);
        for (int i = 0; i < k; i++) dq.addLast(dq.pollFirst());
        int[] out = new int[dq.size()];
        for (int i = 0; i < out.length; i++) out[i] = dq.pollFirst();
        return out;
    }
}`,

  // [6] Printer Job Queue
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int budget = sc.nextInt();
        int[] pages = new int[n];
        for (int i = 0; i < n; i++) pages[i] = sc.nextInt();
        System.out.println(printedJobs(pages, budget));
    }

    static int printedJobs(int[] pages, int budget) {
        ArrayDeque<Integer> queue = new ArrayDeque<>();
        for (int p : pages) queue.add(p);
        int left = budget;
        int printed = 0;
        while (!queue.isEmpty()) {
            int job = queue.poll();
            if (job <= left) {
                left -= job;
                printed++;
            }
        }
        return printed;
    }
}`,

  // [7] Supermarket Express Lane
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] items = new int[n];
        for (int i = 0; i < n; i++) items[i] = sc.nextInt();
        System.out.println(join(laneSplit(items)));
    }

    static String join(int[] a) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < a.length; i++) {
            if (i > 0) sb.append(' ');
            sb.append(a[i]);
        }
        return sb.toString();
    }

    static int[] laneSplit(int[] items) {
        ArrayDeque<Integer> express = new ArrayDeque<>();
        ArrayDeque<Integer> normal = new ArrayDeque<>();
        for (int v : items) {
            if (v <= 5) express.add(v);
            else normal.add(v);
        }
        int[] out = new int[items.length];
        int idx = 0;
        while (!express.isEmpty()) out[idx++] = express.poll();
        while (!normal.isEmpty()) out[idx++] = normal.poll();
        return out;
    }
}`,

  // [8] Musical Chairs Elimination
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int k = sc.nextInt();
        int[] people = new int[n];
        for (int i = 0; i < n; i++) people[i] = sc.nextInt();
        System.out.println(join(eliminationOrder(people, k)));
    }

    static String join(int[] a) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < a.length; i++) {
            if (i > 0) sb.append(' ');
            sb.append(a[i]);
        }
        return sb.toString();
    }

    static int[] eliminationOrder(int[] people, int k) {
        ArrayDeque<Integer> circle = new ArrayDeque<>();
        for (int v : people) circle.add(v);
        int[] out = new int[people.length];
        int idx = 0;
        while (!circle.isEmpty()) {
            for (int i = 1; i < k; i++) circle.addLast(circle.pollFirst());
            out[idx++] = circle.pollFirst();
        }
        return out;
    }
}`,

  // [9] First Unique Support Ticket
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        System.out.println(firstUniqueTicket(a));
    }

    static int firstUniqueTicket(int[] a) {
        ArrayDeque<Integer> queue = new ArrayDeque<>();
        int[] count = new int[101];
        for (int v : a) {
            count[v]++;
            queue.add(v);
        }
        while (!queue.isEmpty()) {
            int v = queue.poll();
            if (count[v] == 1) return v;
        }
        return -1;
    }
}`,

  // [10] Circular Queue Ring Buffer
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int capacity = sc.nextInt();
        int m = sc.nextInt();
        initQueue(capacity);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < m; i++) {
            String op = sc.next();
            if (op.equals("e")) {
                int x = sc.nextInt();
                sb.append(enqueue(x));
            } else {
                sb.append(dequeue());
            }
            sb.append('\\n');
        }
        System.out.print(sb.toString());
    }

    static int[] store;
    static int head, tail, count, cap;

    static void initQueue(int capacity) {
        store = new int[capacity];
        cap = capacity;
        head = 0;
        tail = 0;
        count = 0;
    }

    static int enqueue(int v) {
        if (count == cap) return 0;
        store[tail] = v;
        tail = (tail + 1) % cap;
        count++;
        return 1;
    }

    static int dequeue() {
        if (count == 0) return -1;
        int v = store[head];
        head = (head + 1) % cap;
        count--;
        return v;
    }
}`,

  // [11] Reverse First K of a Queue
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int k = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        System.out.println(join(reverseFirstK(a, k)));
    }

    static String join(int[] a) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < a.length; i++) {
            if (i > 0) sb.append(' ');
            sb.append(a[i]);
        }
        return sb.toString();
    }

    static int[] reverseFirstK(int[] a, int k) {
        ArrayDeque<Integer> queue = new ArrayDeque<>();
        for (int v : a) queue.add(v);
        ArrayDeque<Integer> st = new ArrayDeque<>();
        for (int i = 0; i < k; i++) st.push(queue.poll());
        while (!st.isEmpty()) queue.add(st.pop());
        for (int i = 0; i < a.length - k; i++) queue.add(queue.poll());
        int[] out = new int[a.length];
        for (int i = 0; i < out.length; i++) out[i] = queue.poll();
        return out;
    }
}`,

  // [12] Binary Numbers via a Queue
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        String[] nums = binaryNumbers(n);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < nums.length; i++) {
            if (i > 0) sb.append(' ');
            sb.append(nums[i]);
        }
        System.out.println(sb.toString());
    }

    static String[] binaryNumbers(int n) {
        ArrayDeque<String> queue = new ArrayDeque<>();
        queue.add("1");
        String[] out = new String[n];
        for (int i = 0; i < n; i++) {
            String cur = queue.poll();
            out[i] = cur;
            queue.add(cur + "0");
            queue.add(cur + "1");
        }
        return out;
    }
}`,

  // [13] Interleave Queue Halves
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        System.out.println(join(interleaveHalves(a)));
    }

    static String join(int[] a) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < a.length; i++) {
            if (i > 0) sb.append(' ');
            sb.append(a[i]);
        }
        return sb.toString();
    }

    static int[] interleaveHalves(int[] a) {
        int half = a.length / 2;
        ArrayDeque<Integer> front = new ArrayDeque<>();
        ArrayDeque<Integer> back = new ArrayDeque<>();
        for (int i = 0; i < a.length; i++) {
            if (i < half) front.add(a[i]);
            else back.add(a[i]);
        }
        int[] out = new int[a.length];
        for (int i = 0; i < half; i++) {
            out[2 * i] = front.poll();
            out[2 * i + 1] = back.poll();
        }
        return out;
    }
}`,

  // [14] Moving Average Window
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int k = sc.nextInt();
        int[] samples = new int[n];
        for (int i = 0; i < n; i++) samples[i] = sc.nextInt();
        System.out.println(join(movingAverages(samples, k)));
    }

    static String join(int[] a) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < a.length; i++) {
            if (i > 0) sb.append(' ');
            sb.append(a[i]);
        }
        return sb.toString();
    }

    static int[] movingAverages(int[] samples, int k) {
        ArrayDeque<Integer> window = new ArrayDeque<>();
        long sum = 0;
        int[] out = new int[samples.length - k + 1];
        for (int i = 0; i < samples.length; i++) {
            window.addLast(samples[i]);
            sum += samples[i];
            if (window.size() > k) sum -= window.pollFirst();
            if (i >= k - 1) out[i - k + 1] = (int)(sum / k);
        }
        return out;
    }
}`,

  // [15] Palindrome via Deque
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.next();
        System.out.println(isPalindromeDeque(s));
    }

    static int isPalindromeDeque(String s) {
        ArrayDeque<Character> dq = new ArrayDeque<>();
        for (int i = 0; i < s.length(); i++) dq.addLast(s.charAt(i));
        while (dq.size() > 1) {
            if (dq.pollFirst() != dq.pollLast()) return 0;
        }
        return 1;
    }
}`,

  // [16] Sliding Window Maximum
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int k = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        System.out.println(join(slidingMax(a, k)));
    }

    static String join(int[] a) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < a.length; i++) {
            if (i > 0) sb.append(' ');
            sb.append(a[i]);
        }
        return sb.toString();
    }

    static int[] slidingMax(int[] a, int k) {
        ArrayDeque<Integer> dq = new ArrayDeque<>();
        int[] out = new int[a.length - k + 1];
        for (int i = 0; i < a.length; i++) {
            while (!dq.isEmpty() && a[dq.peekLast()] <= a[i]) dq.pollLast();
            dq.addLast(i);
            if (dq.peekFirst() <= i - k) dq.pollFirst();
            if (i >= k - 1) out[i - k + 1] = a[dq.peekFirst()];
        }
        return out;
    }
}`,

  // [17] First Non-Repeating in a Stream
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.next();
        System.out.println(firstUniqueStream(s));
    }

    static String firstUniqueStream(String s) {
        int[] count = new int[26];
        ArrayDeque<Character> candidates = new ArrayDeque<>();
        char[] out = new char[s.length()];
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            count[c - 'a']++;
            if (count[c - 'a'] == 1) candidates.addLast(c);
            while (!candidates.isEmpty() && count[candidates.peekFirst() - 'a'] > 1) {
                candidates.pollFirst();
            }
            out[i] = candidates.isEmpty() ? '-' : candidates.peekFirst();
        }
        return new String(out);
    }
}`,

  // [18] Sliding Window Minimum
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int k = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        System.out.println(join(slidingMin(a, k)));
    }

    static String join(int[] a) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < a.length; i++) {
            if (i > 0) sb.append(' ');
            sb.append(a[i]);
        }
        return sb.toString();
    }

    static int[] slidingMin(int[] a, int k) {
        ArrayDeque<Integer> dq = new ArrayDeque<>();
        int[] out = new int[a.length - k + 1];
        for (int i = 0; i < a.length; i++) {
            while (!dq.isEmpty() && a[dq.peekLast()] >= a[i]) dq.pollLast();
            dq.addLast(i);
            if (dq.peekFirst() <= i - k) dq.pollFirst();
            if (i >= k - 1) out[i - k + 1] = a[dq.peekFirst()];
        }
        return out;
    }
}`,

  // [19] Minimum K-Consecutive Bit Flips
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int k = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        System.out.println(minBitFlips(a, k));
    }

    static int minBitFlips(int[] a, int k) {
        ArrayDeque<Integer> active = new ArrayDeque<>();
        int flipped = 0;
        int moves = 0;
        for (int i = 0; i < a.length; i++) {
            if (!active.isEmpty() && active.peekFirst() == i - k) {
                active.pollFirst();
                flipped ^= 1;
            }
            if ((a[i] ^ flipped) == 0) {
                if (i + k > a.length) return -1;
                active.addLast(i);
                flipped ^= 1;
                moves++;
            }
        }
        return moves;
    }
}`,
];
