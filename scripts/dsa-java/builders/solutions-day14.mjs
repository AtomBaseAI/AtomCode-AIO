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
  // [0] Org Chart Depth
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] slots = new int[n];
        for (int i = 0; i < n; i++) slots[i] = sc.nextInt();
        System.out.println(height(buildLevelOrder(slots)));
    }
${BUILDER}
    static int height(TNode root) {
        if (root == null) return 0;
        return 1 + Math.max(height(root.left), height(root.right));
    }
}`,

  // [1] Preorder Traversal
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] slots = new int[n];
        for (int i = 0; i < n; i++) slots[i] = sc.nextInt();
        ArrayList<Integer> out = new ArrayList<>();
        preorder(buildLevelOrder(slots), out);
        System.out.println(joinList(out));
    }
${BUILDER}
    static void preorder(TNode root, ArrayList<Integer> out) {
        if (root == null) return;
        out.add(root.val);
        preorder(root.left, out);
        preorder(root.right, out);
    }
}`,

  // [2] Inorder Traversal
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

  // [3] Postorder Traversal
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] slots = new int[n];
        for (int i = 0; i < n; i++) slots[i] = sc.nextInt();
        ArrayList<Integer> out = new ArrayList<>();
        postorder(buildLevelOrder(slots), out);
        System.out.println(joinList(out));
    }
${BUILDER}
    static void postorder(TNode root, ArrayList<Integer> out) {
        if (root == null) return;
        postorder(root.left, out);
        postorder(root.right, out);
        out.add(root.val);
    }
}`,

  // [4] Count Tree Nodes
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] slots = new int[n];
        for (int i = 0; i < n; i++) slots[i] = sc.nextInt();
        System.out.println(countNodes(buildLevelOrder(slots)));
    }
${BUILDER}
    static int countNodes(TNode root) {
        if (root == null) return 0;
        return 1 + countNodes(root.left) + countNodes(root.right);
    }
}`,

  // [5] Count Leaf Nodes
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] slots = new int[n];
        for (int i = 0; i < n; i++) slots[i] = sc.nextInt();
        System.out.println(countLeaves(buildLevelOrder(slots)));
    }
${BUILDER}
    static int countLeaves(TNode root) {
        if (root == null) return 0;
        if (root.left == null && root.right == null) return 1;
        return countLeaves(root.left) + countLeaves(root.right);
    }
}`,

  // [6] Height of the Tree
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] slots = new int[n];
        for (int i = 0; i < n; i++) slots[i] = sc.nextInt();
        System.out.println(height(buildLevelOrder(slots)));
    }
${BUILDER}
    static int height(TNode root) {
        if (root == null) return 0;
        return 1 + Math.max(height(root.left), height(root.right));
    }
}`,

  // [7] Company Directory Size
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] slots = new int[n];
        for (int i = 0; i < n; i++) slots[i] = sc.nextInt();
        System.out.println(countNodes(buildLevelOrder(slots)));
    }
${BUILDER}
    static int countNodes(TNode root) {
        if (root == null) return 0;
        return 1 + countNodes(root.left) + countNodes(root.right);
    }
}`,

  // [8] Empty Folder Count
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] slots = new int[n];
        for (int i = 0; i < n; i++) slots[i] = sc.nextInt();
        System.out.println(countLeaves(buildLevelOrder(slots)));
    }
${BUILDER}
    static int countLeaves(TNode root) {
        if (root == null) return 0;
        if (root.left == null && root.right == null) return 1;
        return countLeaves(root.left) + countLeaves(root.right);
    }
}`,

  // [9] Menu Preorder Walk
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] slots = new int[n];
        for (int i = 0; i < n; i++) slots[i] = sc.nextInt();
        ArrayList<Integer> out = new ArrayList<>();
        preorder(buildLevelOrder(slots), out);
        System.out.println(joinList(out));
    }
${BUILDER}
    static void preorder(TNode root, ArrayList<Integer> out) {
        if (root == null) return;
        out.add(root.val);
        preorder(root.left, out);
        preorder(root.right, out);
    }
}`,

  // [10] Peak Sensor Reading
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] slots = new int[n];
        for (int i = 0; i < n; i++) slots[i] = sc.nextInt();
        System.out.println(maxValue(buildLevelOrder(slots)));
    }
${BUILDER}
    static int maxValue(TNode root) {
        int best = root.val;
        if (root.left != null) best = Math.max(best, maxValue(root.left));
        if (root.right != null) best = Math.max(best, maxValue(root.right));
        return best;
    }
}`,

  // [11] Warehouse Stock Total
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] slots = new int[n];
        for (int i = 0; i < n; i++) slots[i] = sc.nextInt();
        System.out.println(sumNodes(buildLevelOrder(slots)));
    }
${BUILDER}
    static int sumNodes(TNode root) {
        if (root == null) return 0;
        return root.val + sumNodes(root.left) + sumNodes(root.right);
    }
}`,

  // [12] Managers with One Report
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] slots = new int[n];
        for (int i = 0; i < n; i++) slots[i] = sc.nextInt();
        System.out.println(oneChildNodes(buildLevelOrder(slots)));
    }
${BUILDER}
    static int oneChildNodes(TNode root) {
        if (root == null) return 0;
        boolean one = (root.left == null) != (root.right == null);
        int here = one ? 1 : 0;
        return here + oneChildNodes(root.left) + oneChildNodes(root.right);
    }
}`,

  // [13] Junctions with Two Pipes
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] slots = new int[n];
        for (int i = 0; i < n; i++) slots[i] = sc.nextInt();
        System.out.println(fullNodes(buildLevelOrder(slots)));
    }
${BUILDER}
    static int fullNodes(TNode root) {
        if (root == null) return 0;
        int here = (root.left != null && root.right != null) ? 1 : 0;
        return here + fullNodes(root.left) + fullNodes(root.right);
    }
}`,

  // [14] Leaf Endpoint Total
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] slots = new int[n];
        for (int i = 0; i < n; i++) slots[i] = sc.nextInt();
        System.out.println(sumLeaves(buildLevelOrder(slots)));
    }
${BUILDER}
    static int sumLeaves(TNode root) {
        if (root == null) return 0;
        if (root.left == null && root.right == null) return root.val;
        return sumLeaves(root.left) + sumLeaves(root.right);
    }
}`,

  // [15] Escalation Distance
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] slots = new int[n];
        for (int i = 0; i < n; i++) slots[i] = sc.nextInt();
        int target = sc.nextInt();
        System.out.println(depthOf(buildLevelOrder(slots), target));
    }
${BUILDER}
    static int depthOf(TNode root, int target) {
        if (root == null) return -1;
        if (root.val == target) return 0;
        int left = depthOf(root.left, target);
        if (left != -1) return left + 1;
        int right = depthOf(root.right, target);
        if (right != -1) return right + 1;
        return -1;
    }
}`,

  // [16] Aisle Scan Order
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] slots = new int[n];
        for (int i = 0; i < n; i++) slots[i] = sc.nextInt();
        ArrayList<Integer> out = new ArrayList<>();
        levelOrder(buildLevelOrder(slots), out);
        System.out.println(joinList(out));
    }
${BUILDER}
    static void levelOrder(TNode root, ArrayList<Integer> out) {
        if (root == null) return;
        ArrayDeque<TNode> queue = new ArrayDeque<>();
        queue.add(root);
        while (!queue.isEmpty()) {
            TNode node = queue.poll();
            out.add(node.val);
            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }
    }
}`,

  // [17] Snapshot Tree Equality
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n1 = sc.nextInt();
        int[] slots1 = new int[n1];
        for (int i = 0; i < n1; i++) slots1[i] = sc.nextInt();
        int n2 = sc.nextInt();
        int[] slots2 = new int[n2];
        for (int i = 0; i < n2; i++) slots2[i] = sc.nextInt();
        System.out.println(isSame(buildLevelOrder(slots1), buildLevelOrder(slots2)));
    }
${BUILDER}
    static boolean isSame(TNode a, TNode b) {
        if (a == null && b == null) return true;
        if (a == null || b == null) return false;
        return a.val == b.val && isSame(a.left, b.left) && isSame(a.right, b.right);
    }
}`,

  // [18] Mirror Symmetry Check
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n1 = sc.nextInt();
        int[] slots1 = new int[n1];
        for (int i = 0; i < n1; i++) slots1[i] = sc.nextInt();
        int n2 = sc.nextInt();
        int[] slots2 = new int[n2];
        for (int i = 0; i < n2; i++) slots2[i] = sc.nextInt();
        System.out.println(isMirror(buildLevelOrder(slots1), buildLevelOrder(slots2)));
    }
${BUILDER}
    static boolean isMirror(TNode a, TNode b) {
        if (a == null && b == null) return true;
        if (a == null || b == null) return false;
        return a.val == b.val && isMirror(a.left, b.right) && isMirror(a.right, b.left);
    }
}`,

  // [19] Backbone Path Length
  `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] slots = new int[n];
        for (int i = 0; i < n; i++) slots[i] = sc.nextInt();
        System.out.println(diameter(buildLevelOrder(slots)));
    }
${BUILDER}
    static int diameter(TNode root) {
        int[] res = measure(root);
        return res[1];
    }

    static int[] measure(TNode node) {
        if (node == null) return new int[]{0, 0};
        int[] left = measure(node.left);
        int[] right = measure(node.right);
        int h = 1 + Math.max(left[0], right[0]);
        int d = Math.max(left[0] + right[0], Math.max(left[1], right[1]));
        return new int[]{h, d};
    }
}`,
];
