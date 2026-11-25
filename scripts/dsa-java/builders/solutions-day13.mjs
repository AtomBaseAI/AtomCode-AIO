export default [
  // [0] Subarray Sums Equal to K
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int k = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        System.out.println(countSubarrays(a, k));
    }

    static long countSubarrays(int[] a, int k) {
        HashMap<Long, Integer> prefixCounts = new HashMap<>();
        prefixCounts.put(0L, 1);
        long sum = 0;
        long count = 0;
        for (int v : a) {
            sum += v;
            count += prefixCounts.getOrDefault(sum - k, 0);
            prefixCounts.merge(sum, 1, Integer::sum);
        }
        return count;
    }
}`,

  // [1] Isomorphic Label Pair
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.next();
        String t = sc.next();
        System.out.println(isIsomorphic(s, t));
    }

    static int isIsomorphic(String s, String t) {
        HashMap<Character, Character> st = new HashMap<>();
        HashMap<Character, Character> ts = new HashMap<>();
        for (int i = 0; i < s.length(); i++) {
            char c1 = s.charAt(i);
            char c2 = t.charAt(i);
            Character mapped = st.putIfAbsent(c1, c2);
            if (mapped != null && mapped != c2) return 0;
            Character reverse = ts.putIfAbsent(c2, c1);
            if (reverse != null && reverse != c1) return 0;
        }
        return 1;
    }
}`,

  // [2] Frequency of a Target
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int target = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        System.out.println(countTarget(a, target));
    }

    static int countTarget(int[] a, int target) {
        HashMap<Integer, Integer> freq = new HashMap<>();
        for (int v : a) freq.merge(v, 1, Integer::sum);
        return freq.getOrDefault(target, 0);
    }
}`,

  // [3] First Duplicate Value
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        System.out.println(firstDuplicate(a));
    }

    static int firstDuplicate(int[] a) {
        HashSet<Integer> seen = new HashSet<>();
        for (int v : a) {
            if (!seen.add(v)) return v;
        }
        return -1;
    }
}`,

  // [4] Count of Distinct Values
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        System.out.println(distinctCount(a));
    }

    static int distinctCount(int[] a) {
        HashSet<Integer> set = new HashSet<>();
        for (int v : a) set.add(v);
        return set.size();
    }
}`,

  // [5] Key Value Lookups
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int q = sc.nextInt();
        int[] keys = new int[n];
        for (int i = 0; i < n; i++) keys[i] = sc.nextInt();
        int[] values = new int[n];
        for (int i = 0; i < n; i++) values[i] = sc.nextInt();
        int[] queries = new int[q];
        for (int i = 0; i < q; i++) queries[i] = sc.nextInt();
        System.out.println(join(lookupValues(keys, values, queries)));
    }

    static String join(int[] a) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < a.length; i++) {
            if (i > 0) sb.append(' ');
            sb.append(a[i]);
        }
        return sb.toString();
    }

    static int[] lookupValues(int[] keys, int[] values, int[] queries) {
        HashMap<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < keys.length; i++) map.put(keys[i], values[i]);
        int[] out = new int[queries.length];
        for (int i = 0; i < queries.length; i++) {
            out[i] = map.getOrDefault(queries[i], -1);
        }
        return out;
    }
}`,

  // [6] Longest Consecutive Run
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        System.out.println(longestConsecutive(a));
    }

    static int longestConsecutive(int[] a) {
        HashSet<Integer> set = new HashSet<>();
        for (int v : a) set.add(v);
        int best = 0;
        for (int v : set) {
            if (!set.contains(v - 1)) {
                int len = 1;
                while (set.contains(v + len)) len++;
                best = Math.max(best, len);
            }
        }
        return best;
    }
}`,

  // [7] Hash Bucket Occupancy
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int m = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        System.out.println(join(bucketCounts(a, m)));
    }

    static String join(int[] a) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < a.length; i++) {
            if (i > 0) sb.append(' ');
            sb.append(a[i]);
        }
        return sb.toString();
    }

    static int[] bucketCounts(int[] a, int m) {
        int[] buckets = new int[m];
        for (int v : a) buckets[v % m]++;
        return buckets;
    }
}`,

  // [8] Most Frequent Character
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.next();
        System.out.println(mostFrequent(s));
    }

    static char mostFrequent(String s) {
        HashMap<Character, Integer> freq = new HashMap<>();
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            freq.merge(c, 1, Integer::sum);
        }
        char best = 'z';
        int bestCount = 0;
        for (char c = 'a'; c <= 'z'; c++) {
            int cnt = freq.getOrDefault(c, 0);
            if (cnt > bestCount) {
                bestCount = cnt;
                best = c;
            }
        }
        return best;
    }
}`,

  // [9] Duplicate Username Alert
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        String[] users = new String[n];
        for (int i = 0; i < n; i++) users[i] = sc.next();
        System.out.println(seenBefore(users));
    }

    static int seenBefore(String[] users) {
        HashSet<String> seen = new HashSet<>();
        for (String u : users) {
            if (!seen.add(u)) return 1;
        }
        return 0;
    }
}`,

  // [10] Candidate Vote Tally
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        String target = sc.next();
        String[] votes = new String[n];
        for (int i = 0; i < n; i++) votes[i] = sc.next();
        System.out.println(tallyVotes(votes, target));
    }

    static int tallyVotes(String[] votes, String target) {
        HashMap<String, Integer> tally = new HashMap<>();
        for (String v : votes) tally.merge(v, 1, Integer::sum);
        return tally.getOrDefault(target, 0);
    }
}`,

  // [11] Students in Both Sections
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int m = sc.nextInt();
        String[] a = new String[n];
        for (int i = 0; i < n; i++) a[i] = sc.next();
        String[] b = new String[m];
        for (int i = 0; i < m; i++) b[i] = sc.next();
        System.out.println(commonNames(a, b));
    }

    static int commonNames(String[] a, String[] b) {
        HashSet<String> setA = new HashSet<>();
        for (String s : a) setA.add(s);
        HashSet<String> setB = new HashSet<>();
        for (String s : b) setB.add(s);
        int common = 0;
        for (String s : setA) {
            if (setB.contains(s)) common++;
        }
        return common;
    }
}`,

  // [12] Coupon Code Validation
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int q = sc.nextInt();
        String[] redeemed = new String[n];
        for (int i = 0; i < n; i++) redeemed[i] = sc.next();
        String[] queries = new String[q];
        for (int i = 0; i < q; i++) queries[i] = sc.next();
        System.out.println(validRedemptions(redeemed, queries));
    }

    static int validRedemptions(String[] redeemed, String[] queries) {
        HashSet<String> codes = new HashSet<>();
        for (String c : redeemed) codes.add(c);
        int valid = 0;
        for (String c : queries) {
            if (codes.contains(c)) valid++;
        }
        return valid;
    }
}`,

  // [13] Count Pairs With Given Sum
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int target = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        System.out.println(countPairs(a, target));
    }

    static long countPairs(int[] a, int target) {
        HashMap<Integer, Integer> seen = new HashMap<>();
        long pairs = 0;
        for (int v : a) {
            pairs += seen.getOrDefault(target - v, 0);
            seen.merge(v, 1, Integer::sum);
        }
        return pairs;
    }
}`,

  // [14] Ordered Keys of a Registry
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int m = sc.nextInt();
        String[] ops = new String[m];
        for (int i = 0; i < m; i++) ops[i] = sc.next();
        int[] vals = new int[m];
        for (int i = 0; i < m; i++) vals[i] = sc.nextInt();
        ArrayList<Integer> keys = finalKeys(ops, vals);
        if (keys.isEmpty()) {
            System.out.println("EMPTY");
        } else {
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < keys.size(); i++) {
                if (i > 0) sb.append(' ');
                sb.append(keys.get(i));
            }
            System.out.println(sb.toString());
        }
    }

    static ArrayList<Integer> finalKeys(String[] ops, int[] vals) {
        TreeMap<Integer, Integer> registry = new TreeMap<>();
        for (int i = 0; i < ops.length; i++) {
            if (ops[i].equals("p")) registry.put(vals[i], 1);
            else registry.remove(vals[i]);
        }
        return new ArrayList<>(registry.keySet());
    }
}`,

  // [15] Sort by Frequency
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        System.out.println(join(frequencySort(a)));
    }

    static String join(int[] a) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < a.length; i++) {
            if (i > 0) sb.append(' ');
            sb.append(a[i]);
        }
        return sb.toString();
    }

    static int[] frequencySort(int[] a) {
        HashMap<Integer, Integer> freq = new HashMap<>();
        for (int v : a) freq.merge(v, 1, Integer::sum);
        ArrayList<Integer> values = new ArrayList<>(freq.keySet());
        values.sort((x, y) -> {
            int byCount = freq.get(y) - freq.get(x);
            return byCount != 0 ? byCount : Integer.compare(x, y);
        });
        int[] out = new int[values.size()];
        for (int i = 0; i < out.length; i++) out[i] = values.get(i);
        return out;
    }
}`,

  // [16] Two-Sum Positions
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int target = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        System.out.println(join(twoSumIndices(a, target)));
    }

    static String join(int[] a) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < a.length; i++) {
            if (i > 0) sb.append(' ');
            sb.append(a[i]);
        }
        return sb.toString();
    }

    static int[] twoSumIndices(int[] a, int target) {
        HashMap<Integer, Integer> firstIndex = new HashMap<>();
        for (int j = 0; j < a.length; j++) {
            int need = target - a[j];
            Integer partner = firstIndex.get(need);
            if (partner != null) return new int[]{partner, j};
            if (!firstIndex.containsKey(a[j])) firstIndex.put(a[j], j);
        }
        return new int[]{-1, -1};
    }
}`,

  // [17] Union and Intersection Sizes
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int m = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        int[] b = new int[m];
        for (int i = 0; i < m; i++) b[i] = sc.nextInt();
        System.out.println(join(unionIntersection(a, b)));
    }

    static String join(int[] a) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < a.length; i++) {
            if (i > 0) sb.append(' ');
            sb.append(a[i]);
        }
        return sb.toString();
    }

    static int[] unionIntersection(int[] a, int[] b) {
        HashSet<Integer> setA = new HashSet<>();
        for (int v : a) setA.add(v);
        HashSet<Integer> setB = new HashSet<>();
        for (int v : b) setB.add(v);
        int inter = 0;
        for (int v : setA) {
            if (setB.contains(v)) inter++;
        }
        return new int[]{setA.size() + setB.size() - inter, inter};
    }
}`,

  // [18] Longest Run Without Repeats
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.next();
        System.out.println(longestUnique(s));
    }

    static int longestUnique(String s) {
        HashSet<Character> window = new HashSet<>();
        int best = 0;
        int left = 0;
        for (int right = 0; right < s.length(); right++) {
            while (window.contains(s.charAt(right))) {
                window.remove(s.charAt(left));
                left++;
            }
            window.add(s.charAt(right));
            best = Math.max(best, right - left + 1);
        }
        return best;
    }
}`,

  // [19] Longest Substring With K Distinct
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.next();
        int k = sc.nextInt();
        System.out.println(longestKDistinct(s, k));
    }

    static int longestKDistinct(String s, int k) {
        HashMap<Character, Integer> counts = new HashMap<>();
        int best = 0;
        int left = 0;
        for (int right = 0; right < s.length(); right++) {
            counts.merge(s.charAt(right), 1, Integer::sum);
            while (counts.size() > k) {
                char c = s.charAt(left);
                if (counts.merge(c, -1, Integer::sum) == 0) counts.remove(c);
                left++;
            }
            best = Math.max(best, right - left + 1);
        }
        return best;
    }
}`,
];
