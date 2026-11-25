export default [
  // [0] Popped Order of a Stack
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] values = new int[n];
        for (int i = 0; i < n; i++) values[i] = sc.nextInt();
        System.out.println(join(poppedOrder(values)));
    }

    static String join(int[] a) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < a.length; i++) {
            if (i > 0) sb.append(' ');
            sb.append(a[i]);
        }
        return sb.toString();
    }

    static int[] poppedOrder(int[] values) {
        ArrayDeque<Integer> st = new ArrayDeque<>();
        for (int v : values) st.push(v);
        int[] out = new int[values.length];
        for (int i = 0; i < out.length; i++) out[i] = st.pop();
        return out;
    }
}`,

  // [1] Balanced Parentheses
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.next();
        System.out.println(isBalanced(s));
    }

    static int isBalanced(String s) {
        ArrayDeque<Character> st = new ArrayDeque<>();
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c == '(' || c == '[' || c == '{') {
                st.push(c);
            } else {
                if (st.isEmpty()) return 0;
                char open = st.pop();
                if (c == ')' && open != '(') return 0;
                if (c == ']' && open != '[') return 0;
                if (c == '}' && open != '{') return 0;
            }
        }
        return st.isEmpty() ? 1 : 0;
    }
}`,

  // [2] Top After Pushes and Pops
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int pops = sc.nextInt();
        int[] pushes = new int[n];
        for (int i = 0; i < n; i++) pushes[i] = sc.nextInt();
        System.out.println(topAfterPops(pushes, pops));
    }

    static int topAfterPops(int[] pushes, int pops) {
        ArrayDeque<Integer> st = new ArrayDeque<>();
        for (int v : pushes) st.push(v);
        for (int i = 0; i < pops; i++) st.pop();
        return st.peek();
    }
}`,

  // [3] Next Greater Element
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        System.out.println(join(nextGreater(a)));
    }

    static String join(int[] a) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < a.length; i++) {
            if (i > 0) sb.append(' ');
            sb.append(a[i]);
        }
        return sb.toString();
    }

    static int[] nextGreater(int[] a) {
        int[] out = new int[a.length];
        ArrayDeque<Integer> st = new ArrayDeque<>();
        for (int i = a.length - 1; i >= 0; i--) {
            while (!st.isEmpty() && st.peek() <= a[i]) st.pop();
            out[i] = st.isEmpty() ? -1 : st.peek();
            st.push(a[i]);
        }
        return out;
    }
}`,

  // [4] Sum of Popped Values
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int pops = sc.nextInt();
        int[] values = new int[n];
        for (int i = 0; i < n; i++) values[i] = sc.nextInt();
        System.out.println(sumPopped(values, pops));
    }

    static long sumPopped(int[] values, int pops) {
        ArrayDeque<Integer> st = new ArrayDeque<>();
        for (int v : values) st.push(v);
        long sum = 0;
        for (int i = 0; i < pops; i++) sum += st.pop();
        return sum;
    }
}`,

  // [5] Apply Backspace Characters
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.next();
        System.out.println(applyBackspaces(s));
    }

    static String applyBackspaces(String s) {
        char[] out = new char[s.length()];
        int idx = 0;
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c == '#') {
                if (idx > 0) idx--;
            } else {
                out[idx++] = c;
            }
        }
        return new String(out, 0, idx);
    }
}`,

  // [6] Browser Back Button
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int backs = sc.nextInt();
        int[] visits = new int[n];
        for (int i = 0; i < n; i++) visits[i] = sc.nextInt();
        System.out.println(currentPage(visits, backs));
    }

    static int currentPage(int[] visits, int backs) {
        ArrayDeque<Integer> st = new ArrayDeque<>();
        for (int v : visits) st.push(v);
        for (int i = 0; i < backs && !st.isEmpty(); i++) st.pop();
        return st.isEmpty() ? -1 : st.peek();
    }
}`,

  // [7] Bracket Checker for Config Files
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.next();
        System.out.println(validConfig(s));
    }

    static int validConfig(String s) {
        ArrayDeque<Character> st = new ArrayDeque<>();
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c == '(' || c == '[' || c == '{') {
                st.push(c);
            } else if (c == ')' || c == ']' || c == '}') {
                if (st.isEmpty()) return 0;
                char open = st.pop();
                if (c == ')' && open != '(') return 0;
                if (c == ']' && open != '[') return 0;
                if (c == '}' && open != '{') return 0;
            }
        }
        return st.isEmpty() ? 1 : 0;
    }
}`,

  // [8] Warehouse Crate Stack
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int removed = sc.nextInt();
        int[] crates = new int[n];
        for (int i = 0; i < n; i++) crates[i] = sc.nextInt();
        System.out.println(topCrate(crates, removed));
    }

    static int topCrate(int[] crates, int removed) {
        ArrayDeque<Integer> st = new ArrayDeque<>();
        for (int v : crates) st.push(v);
        for (int i = 0; i < removed && !st.isEmpty(); i++) st.pop();
        return st.isEmpty() ? -1 : st.peek();
    }
}`,

  // [9] Warmer Days Ahead
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] temps = new int[n];
        for (int i = 0; i < n; i++) temps[i] = sc.nextInt();
        System.out.println(join(warmerDays(temps)));
    }

    static String join(int[] a) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < a.length; i++) {
            if (i > 0) sb.append(' ');
            sb.append(a[i]);
        }
        return sb.toString();
    }

    static int[] warmerDays(int[] temps) {
        int[] out = new int[temps.length];
        ArrayDeque<Integer> st = new ArrayDeque<>();
        for (int i = temps.length - 1; i >= 0; i--) {
            while (!st.isEmpty() && temps[st.peek()] <= temps[i]) st.pop();
            out[i] = st.isEmpty() ? 0 : st.peek() - i;
            st.push(i);
        }
        return out;
    }
}`,

  // [10] Reverse a String Using an Explicit Stack
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.next();
        System.out.println(reverseWithStack(s));
    }

    static String reverseWithStack(String s) {
        ArrayDeque<Character> st = new ArrayDeque<>();
        for (int i = 0; i < s.length(); i++) st.push(s.charAt(i));
        char[] out = new char[s.length()];
        for (int i = 0; i < out.length; i++) out[i] = st.pop();
        return new String(out);
    }
}`,

  // [11] Min Stack After Operations
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int pops = sc.nextInt();
        int[] pushes = new int[n];
        for (int i = 0; i < n; i++) pushes[i] = sc.nextInt();
        System.out.println(minAfterOps(pushes, pops));
    }

    static int minAfterOps(int[] pushes, int pops) {
        ArrayDeque<Integer> st = new ArrayDeque<>();
        ArrayDeque<Integer> mins = new ArrayDeque<>();
        for (int v : pushes) {
            st.push(v);
            mins.push(mins.isEmpty() ? v : Math.min(mins.peek(), v));
        }
        for (int i = 0; i < pops; i++) {
            st.pop();
            mins.pop();
        }
        return mins.peek();
    }
}`,

  // [12] Valid Stack Sequence
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] pushed = new int[n];
        for (int i = 0; i < n; i++) pushed[i] = sc.nextInt();
        int[] popped = new int[n];
        for (int i = 0; i < n; i++) popped[i] = sc.nextInt();
        System.out.println(validSequence(pushed, popped));
    }

    static int validSequence(int[] pushed, int[] popped) {
        ArrayDeque<Integer> st = new ArrayDeque<>();
        int j = 0;
        for (int v : pushed) {
            st.push(v);
            while (!st.isEmpty() && j < popped.length && st.peek() == popped[j]) {
                st.pop();
                j++;
            }
        }
        return j == popped.length ? 1 : 0;
    }
}`,

  // [13] Sort a Stack with Another Stack
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        System.out.println(join(sortStack(a)));
    }

    static String join(int[] a) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < a.length; i++) {
            if (i > 0) sb.append(' ');
            sb.append(a[i]);
        }
        return sb.toString();
    }

    static int[] sortStack(int[] a) {
        ArrayDeque<Integer> st = new ArrayDeque<>();
        for (int v : a) {
            ArrayDeque<Integer> tmp = new ArrayDeque<>();
            while (!st.isEmpty() && st.peek() < v) tmp.push(st.pop());
            st.push(v);
            while (!tmp.isEmpty()) st.push(tmp.pop());
        }
        int[] out = new int[a.length];
        for (int i = 0; i < out.length; i++) out[i] = st.pop();
        return out;
    }
}`,

  // [14] Redundant Brackets in Expressions
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String expr = sc.next();
        System.out.println(hasRedundant(expr));
    }

    static int hasRedundant(String expr) {
        ArrayDeque<Character> st = new ArrayDeque<>();
        for (int i = 0; i < expr.length(); i++) {
            char c = expr.charAt(i);
            if (c == ')') {
                boolean operator = false;
                while (st.peek() != '(') {
                    char top = st.pop();
                    if (top == '+' || top == '-' || top == '*' || top == '/') operator = true;
                }
                st.pop();
                if (!operator) return 1;
            } else {
                st.push(c);
            }
        }
        return 0;
    }
}`,

  // [15] Celebrity at the Party
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[][] know = new int[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) know[i][j] = sc.nextInt();
        }
        System.out.println(findCelebrity(know));
    }

    static int findCelebrity(int[][] know) {
        int n = know.length;
        ArrayDeque<Integer> st = new ArrayDeque<>();
        for (int i = 0; i < n; i++) st.push(i);
        while (st.size() > 1) {
            int x = st.pop();
            int y = st.pop();
            if (know[x][y] == 1) st.push(y);
            else st.push(x);
        }
        int cand = st.pop();
        for (int i = 0; i < n; i++) {
            if (i == cand) continue;
            if (know[cand][i] == 1 || know[i][cand] == 0) return -1;
        }
        return cand;
    }
}`,

  // [16] Evaluate Postfix Expression
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        java.util.List<String> list = new java.util.ArrayList<>();
        while (sc.hasNext()) list.add(sc.next());
        System.out.println(evalPostfix(list.toArray(new String[0])));
    }

    static long evalPostfix(String[] tokens) {
        ArrayDeque<Long> st = new ArrayDeque<>();
        for (String t : tokens) {
            if (t.equals("+") || t.equals("-") || t.equals("*") || t.equals("/")) {
                long b = st.pop();
                long a = st.pop();
                long r;
                if (t.equals("+")) r = a + b;
                else if (t.equals("-")) r = a - b;
                else if (t.equals("*")) r = a * b;
                else r = a / b;
                st.push(r);
            } else {
                st.push(Long.parseLong(t));
            }
        }
        return st.pop();
    }
}`,

  // [17] Stock Span Problem
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] prices = new int[n];
        for (int i = 0; i < n; i++) prices[i] = sc.nextInt();
        System.out.println(join(stockSpan(prices)));
    }

    static String join(int[] a) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < a.length; i++) {
            if (i > 0) sb.append(' ');
            sb.append(a[i]);
        }
        return sb.toString();
    }

    static int[] stockSpan(int[] prices) {
        int[] out = new int[prices.length];
        ArrayDeque<Integer> st = new ArrayDeque<>();
        for (int i = 0; i < prices.length; i++) {
            while (!st.isEmpty() && prices[st.peek()] <= prices[i]) st.pop();
            out[i] = st.isEmpty() ? i + 1 : i - st.peek();
            st.push(i);
        }
        return out;
    }
}`,

  // [18] Largest Rectangle in a Histogram
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] h = new int[n];
        for (int i = 0; i < n; i++) h[i] = sc.nextInt();
        System.out.println(largestRectangle(h));
    }

    static long largestRectangle(int[] h) {
        ArrayDeque<Integer> st = new ArrayDeque<>();
        long best = 0;
        for (int i = 0; i <= h.length; i++) {
            int cur = i == h.length ? 0 : h[i];
            while (!st.isEmpty() && h[st.peek()] >= cur) {
                long height = h[st.pop()];
                long width = st.isEmpty() ? i : i - st.peek() - 1;
                best = Math.max(best, height * width);
            }
            st.push(i);
        }
        return best;
    }
}`,

  // [19] Colliding Asteroids
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        System.out.println(join(survivingAsteroids(a)));
    }

    static String join(int[] a) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < a.length; i++) {
            if (i > 0) sb.append(' ');
            sb.append(a[i]);
        }
        return sb.toString();
    }

    static int[] survivingAsteroids(int[] a) {
        ArrayDeque<Integer> st = new ArrayDeque<>();
        for (int v : a) {
            boolean alive = true;
            while (alive && v < 0 && !st.isEmpty() && st.peek() > 0) {
                if (st.peek() < -v) {
                    st.pop();
                } else if (st.peek() == -v) {
                    st.pop();
                    alive = false;
                } else {
                    alive = false;
                }
            }
            if (alive) st.push(v);
        }
        int[] out = new int[st.size()];
        for (int i = out.length - 1; i >= 0; i--) out[i] = st.pop();
        return out;
    }
}`,
];
