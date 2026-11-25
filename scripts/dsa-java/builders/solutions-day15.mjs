const BUILDER = `
    static TNode buildLevelOrder(int[] slots) {
        if (slots.length == 0 || slots[0] == -1) return null;
        TNode root = new TNode(slots[0]);
        ArrayDeque<TNode> queue = new ArrayDeque<>();
        queue.add(root);
        int i = 1;
        while (!queue.isEmpty() && i < slots.length) {
            TNode parent = queue.poll();
            if (i < slots.length) {
                if (slots[i] != -1) {
                    parent.left = new TNode(slots[i]);
                    queue.add(parent.left);
                }
                i++;
            }
            if (i < slots.length) {
                if (slots[i] != -1) {
                    parent.right = new TNode(slots[i]);
                    queue.add(parent.right);
                }
                i++;
            }
        }
        return root;
    }

    static String joinList(ArrayList<Integer> out) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < out.size(); i++) {
            if (i > 0) sb.append(' ');
            sb.append(out.get(i));
        }
        return sb.toString();
    }

    static final class TNode {
        int val;
        TNode left;
        TNode right;
        TNode(int val) { this.val = val; }
    }
`;

export default [
  // [0] Triage Code Lookup
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] slots = new int[n];
        for (int i = 0; i < n; i++) slots[i] = sc.nextInt();
        int v = sc.nextInt();
        System.out.println(bstSearch(buildLevelOrder(slots), v));
    }
${BUILDER}
    static boolean bstSearch(TNode root, int v) {
        while (root != null) {
            if (v == root.val) return true;
            root = (v < root.val) ? root.left : root.right;
        }
        return false;
    }
}`,

  // [1] Price Range Census
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] slots = new int[n];
        for (int i = 0; i < n; i++) slots[i] = sc.nextInt();
        int lo = sc.nextInt();
        int hi = sc.nextInt();
        System.out.println(rangeCount(buildLevelOrder(slots), lo, hi));
    }
${BUILDER}
    static int rangeCount(TNode root, int lo, int hi) {
        if (root == null) return 0;
        int here = (root.val >= lo && root.val <= hi) ? 1 : 0;
        return here + rangeCount(root.left, lo, hi) + rangeCount(root.right, lo, hi);
    }
}`,

  // [2] Insert into the BST
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] slots = new int[n];
        for (int i = 0; i < n; i++) slots[i] = sc.nextInt();
        int v = sc.nextInt();
        TNode root = buildLevelOrder(slots);
        ArrayList<Integer> out = new ArrayList<>();
        inorder(bstInsert(root, v), out);
        System.out.println(joinList(out));
    }
${BUILDER}
    static void inorder(TNode root, ArrayList<Integer> out) {
        if (root == null) return;
        inorder(root.left, out);
        out.add(root.val);
        inorder(root.right, out);
    }

    static TNode bstInsert(TNode root, int v) {
        if (root == null) return new TNode(v);
        if (v < root.val) root.left = bstInsert(root.left, v);
        else root.right = bstInsert(root.right, v);
        return root;
    }
}`,

  // [3] Search in the BST
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] slots = new int[n];
        for (int i = 0; i < n; i++) slots[i] = sc.nextInt();
        int v = sc.nextInt();
        System.out.println(bstSearch(buildLevelOrder(slots), v));
    }
${BUILDER}
    static boolean bstSearch(TNode root, int v) {
        while (root != null) {
            if (v == root.val) return true;
            root = (v < root.val) ? root.left : root.right;
        }
        return false;
    }
}`,

  // [4] Smallest Value in the BST
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] slots = new int[n];
        for (int i = 0; i < n; i++) slots[i] = sc.nextInt();
        System.out.println(bstMin(buildLevelOrder(slots)));
    }
${BUILDER}
    static int bstMin(TNode root) {
        while (root.left != null) root = root.left;
        return root.val;
    }
}`,

  // [5] Largest Value in the BST
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] slots = new int[n];
        for (int i = 0; i < n; i++) slots[i] = sc.nextInt();
        System.out.println(bstMax(buildLevelOrder(slots)));
    }
${BUILDER}
    static int bstMax(TNode root) {
        while (root.right != null) root = root.right;
        return root.val;
    }
}`,

  // [6] Sorted Order from the BST
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] slots = new int[n];
        for (int i = 0; i < n; i++) slots[i] = sc.nextInt();
        ArrayList<Integer> out = new ArrayList<>();
        inorder(buildLevelOrder(slots), out);
        System.out.println(joinList(out));
    }
${BUILDER}
    static void inorder(TNode root, ArrayList<Integer> out) {
        if (root == null) return;
        inorder(root.left, out);
        out.add(root.val);
        inorder(root.right, out);
    }
}`,

  // [7] Parent in the Heap Array
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] heap = new int[n];
        for (int i = 0; i < n; i++) heap[i] = sc.nextInt();
        int i = sc.nextInt();
        System.out.println(heapParent(heap, i));
    }

    static int heapParent(int[] heap, int i) {
        return heap[(i - 1) / 2];
    }
}`,

  // [8] Catalog Registration
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] slots = new int[n];
        for (int i = 0; i < n; i++) slots[i] = sc.nextInt();
        int v = sc.nextInt();
        TNode root = buildLevelOrder(slots);
        ArrayList<Integer> out = new ArrayList<>();
        inorder(bstInsert(root, v), out);
        System.out.println(joinList(out));
    }
${BUILDER}
    static void inorder(TNode root, ArrayList<Integer> out) {
        if (root == null) return;
        inorder(root.left, out);
        out.add(root.val);
        inorder(root.right, out);
    }

    static TNode bstInsert(TNode root, int v) {
        if (root == null) return new TNode(v);
        if (v < root.val) root.left = bstInsert(root.left, v);
        else root.right = bstInsert(root.right, v);
        return root;
    }
}`,

  // [9] Peak Load Query
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] slots = new int[n];
        for (int i = 0; i < n; i++) slots[i] = sc.nextInt();
        System.out.println(bstMax(buildLevelOrder(slots)));
    }
${BUILDER}
    static int bstMax(TNode root) {
        while (root.right != null) root = root.right;
        return root.val;
    }
}`,

  // [10] Next Emergency Dispatch
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] heap = new int[n];
        for (int i = 0; i < n; i++) heap[i] = sc.nextInt();
        System.out.println(heapPeek(heap));
    }

    static int heapPeek(int[] heap) {
        return heap[0];
    }
}`,

  // [11] Kth Smallest in the BST
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] slots = new int[n];
        for (int i = 0; i < n; i++) slots[i] = sc.nextInt();
        int k = sc.nextInt();
        System.out.println(kthSmallest(buildLevelOrder(slots), k));
    }
${BUILDER}
    static int countNodes(TNode node) {
        if (node == null) return 0;
        return 1 + countNodes(node.left) + countNodes(node.right);
    }

    static int kthSmallest(TNode root, int k) {
        int leftCount = countNodes(root.left);
        if (k == leftCount + 1) return root.val;
        if (k <= leftCount) return kthSmallest(root.left, k);
        return kthSmallest(root.right, k - leftCount - 1);
    }
}`,

  // [12] Queue Drain Simulation
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] values = new int[n];
        for (int i = 0; i < n; i++) values[i] = sc.nextInt();
        int polls = sc.nextInt();
        System.out.println(joinList(heapPolls(values, polls)));
    }

    static String joinList(ArrayList<Integer> out) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < out.size(); i++) {
            if (i > 0) sb.append(' ');
            sb.append(out.get(i));
        }
        return sb.toString();
    }

    static ArrayList<Integer> heapPolls(int[] values, int polls) {
        PriorityQueue<Integer> heap = new PriorityQueue<>();
        for (int v : values) heap.add(v);
        ArrayList<Integer> out = new ArrayList<>();
        for (int i = 0; i < polls; i++) out.add(heap.poll());
        return out;
    }
}`,

  // [13] Heapify the Array
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        buildMinHeap(a);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < a.length; i++) {
            if (i > 0) sb.append(' ');
            sb.append(a[i]);
        }
        System.out.println(sb.toString());
    }

    static void buildMinHeap(int[] a) {
        int n = a.length;
        for (int i = n / 2 - 1; i >= 0; i--) siftDown(a, i, n);
    }

    static void siftDown(int[] a, int i, int n) {
        while (true) {
            int smallest = i;
            int l = 2 * i + 1;
            int r = 2 * i + 2;
            if (l < n && a[l] < a[smallest]) smallest = l;
            if (r < n && a[r] < a[smallest]) smallest = r;
            if (smallest == i) return;
            int tmp = a[i];
            a[i] = a[smallest];
            a[smallest] = tmp;
            i = smallest;
        }
    }
}`,

  // [14] Next Appointment Slot
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] slots = new int[n];
        for (int i = 0; i < n; i++) slots[i] = sc.nextInt();
        int v = sc.nextInt();
        System.out.println(successor(buildLevelOrder(slots), v));
    }
${BUILDER}
    static int successor(TNode root, int v) {
        int best = Integer.MAX_VALUE;
        TNode cur = root;
        while (cur != null) {
            if (cur.val > v) {
                best = cur.val;
                cur = cur.left;
            } else {
                cur = cur.right;
            }
        }
        return best;
    }
}`,

  // [15] Heap Property Audit
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] a = new int[n];
        for (int i = 0; i < n; i++) a[i] = sc.nextInt();
        System.out.println(isMinHeap(a));
    }

    static boolean isMinHeap(int[] a) {
        int n = a.length;
        for (int i = 0; i < n; i++) {
            int l = 2 * i + 1;
            int r = 2 * i + 2;
            if (l < n && a[l] < a[i]) return false;
            if (r < n && a[r] < a[i]) return false;
        }
        return true;
    }
}`,

  // [16] Validate the BST
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] slots = new int[n];
        for (int i = 0; i < n; i++) slots[i] = sc.nextInt();
        System.out.println(isBst(buildLevelOrder(slots), Long.MIN_VALUE, Long.MAX_VALUE));
    }
${BUILDER}
    static boolean isBst(TNode root, long lo, long hi) {
        if (root == null) return true;
        if (root.val <= lo || root.val >= hi) return false;
        return isBst(root.left, lo, root.val) && isBst(root.right, root.val, hi);
    }
}`,

  // [17] Kth Largest Element
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();
        int k = sc.nextInt();
        System.out.println(kthLargest(arr, k));
    }

    static int kthLargest(int[] arr, int k) {
        PriorityQueue<Integer> heap = new PriorityQueue<>();
        for (int v : arr) {
            if (heap.size() < k) {
                heap.add(v);
            } else if (v > heap.peek()) {
                heap.poll();
                heap.add(v);
            }
        }
        return heap.peek();
    }
}`,

  // [18] Remove from the BST
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] slots = new int[n];
        for (int i = 0; i < n; i++) slots[i] = sc.nextInt();
        int v = sc.nextInt();
        TNode root = buildLevelOrder(slots);
        ArrayList<Integer> out = new ArrayList<>();
        inorder(bstDelete(root, v), out);
        System.out.println(joinList(out));
    }
${BUILDER}
    static void inorder(TNode root, ArrayList<Integer> out) {
        if (root == null) return;
        inorder(root.left, out);
        out.add(root.val);
        inorder(root.right, out);
    }

    static TNode bstDelete(TNode root, int v) {
        if (root == null) return null;
        if (v < root.val) {
            root.left = bstDelete(root.left, v);
        } else if (v > root.val) {
            root.right = bstDelete(root.right, v);
        } else {
            if (root.left == null) return root.right;
            if (root.right == null) return root.left;
            TNode succ = root.right;
            while (succ.left != null) succ = succ.left;
            root.val = succ.val;
            root.right = bstDelete(root.right, succ.val);
        }
        return root;
    }
}`,

  // [19] Drain in Ascending Order
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] values = new int[n];
        for (int i = 0; i < n; i++) values[i] = sc.nextInt();
        System.out.println(joinList(heapSort(values)));
    }

    static String joinList(ArrayList<Integer> out) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < out.size(); i++) {
            if (i > 0) sb.append(' ');
            sb.append(out.get(i));
        }
        return sb.toString();
    }

    static ArrayList<Integer> heapSort(int[] values) {
        PriorityQueue<Integer> heap = new PriorityQueue<>();
        for (int v : values) heap.add(v);
        ArrayList<Integer> out = new ArrayList<>();
        while (!heap.isEmpty()) out.add(heap.poll());
        return out;
    }
}`,
];
