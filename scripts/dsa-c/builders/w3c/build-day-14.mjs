import { readFileSync, writeFileSync } from "node:fs";

const SRC = "/home/z/tmp/dsa-export/dsa-c/day-14.code.json";
const DST = "/home/z/my-project/scripts/dsa-c/data/day-14.code.json";

const data = JSON.parse(readFileSync(SRC, "utf8"));
const codes = [];

// Shared harness pieces (TNode + level-order build with -1 = missing child)
const HARNESS = String.raw`#include <stdio.h>
#include <stdlib.h>

typedef struct TNode { int val; struct TNode *left, *right; } TNode;

static TNode *tnew(int v) {
    TNode *t = (TNode *)malloc(sizeof(TNode));
    t->val = v;
    t->left = t->right = NULL;
    return t;
}

static TNode *build_tree(void) {
    int n;
    if (scanf("%d", &n) != 1) return NULL;
    int vals[1005];
    for (int i = 0; i < n; i++) scanf("%d", &vals[i]);
    if (n <= 0 || vals[0] == -1) return NULL;
    TNode *queue[1005];
    int qh = 0, qt = 0, i = 1;
    TNode *root = tnew(vals[0]);
    queue[qt++] = root;
    while (qh < qt && i < n) {
        TNode *cur = queue[qh++];
        if (i < n) {
            if (vals[i] != -1) { TNode *c = tnew(vals[i]); cur->left = c; queue[qt++] = c; }
            i++;
        }
        if (i < n) {
            if (vals[i] != -1) { TNode *c = tnew(vals[i]); cur->right = c; queue[qt++] = c; }
            i++;
        }
    }
    return root;
}

static void print_arr(const int *a, int n) {
    for (int i = 0; i < n; i++) printf("%d%c", a[i], (i + 1 < n) ? ' ' : '\n');
}
`;

const Q = (body) => HARNESS + "\n" + body;

// Q0 Preorder Traversal
codes.push(Q(String.raw`void preorder_fill(TNode *root, int out[], int *outn) {
    if (root == NULL) return;
    out[(*outn)++] = root->val;
    preorder_fill(root->left, out, outn);
    preorder_fill(root->right, out, outn);
}

int main(void) {
    TNode *root = build_tree();
    int out[1005], outn = 0;
    preorder_fill(root, out, &outn);
    print_arr(out, outn);
    return 0;
}`));

// Q1 Inorder Traversal
codes.push(Q(String.raw`void inorder_fill(TNode *root, int out[], int *outn) {
    if (root == NULL) return;
    inorder_fill(root->left, out, outn);
    out[(*outn)++] = root->val;
    inorder_fill(root->right, out, outn);
}

int main(void) {
    TNode *root = build_tree();
    int out[1005], outn = 0;
    inorder_fill(root, out, &outn);
    print_arr(out, outn);
    return 0;
}`));

// Q2 Postorder Traversal
codes.push(Q(String.raw`void postorder_fill(TNode *root, int out[], int *outn) {
    if (root == NULL) return;
    postorder_fill(root->left, out, outn);
    postorder_fill(root->right, out, outn);
    out[(*outn)++] = root->val;
}

int main(void) {
    TNode *root = build_tree();
    int out[1005], outn = 0;
    postorder_fill(root, out, &outn);
    print_arr(out, outn);
    return 0;
}`));

// Q3 Tree Height
codes.push(Q(String.raw`int tree_height(TNode *root) {
    if (root == NULL) return 0;
    int l = tree_height(root->left);
    int r = tree_height(root->right);
    return 1 + (l > r ? l : r);
}

int main(void) {
    TNode *root = build_tree();
    printf("%d\n", tree_height(root));
    return 0;
}`));

// Q4 Leaf Count
codes.push(Q(String.raw`int count_leaves(TNode *root) {
    if (root == NULL) return 0;
    if (root->left == NULL && root->right == NULL) return 1;
    return count_leaves(root->left) + count_leaves(root->right);
}

int main(void) {
    TNode *root = build_tree();
    printf("%d\n", count_leaves(root));
    return 0;
}`));

// Q5 Total Node Count
codes.push(Q(String.raw`int count_nodes(TNode *root) {
    if (root == NULL) return 0;
    return 1 + count_nodes(root->left) + count_nodes(root->right);
}

int main(void) {
    TNode *root = build_tree();
    printf("%d\n", count_nodes(root));
    return 0;
}`));

// Q6 Dependency Manifest Preorder
codes.push(Q(String.raw`void preorder_fill(TNode *root, int out[], int *outn) {
    if (root == NULL) return;
    out[(*outn)++] = root->val;
    preorder_fill(root->left, out, outn);
    preorder_fill(root->right, out, outn);
}

int main(void) {
    TNode *root = build_tree();
    int out[1005], outn = 0;
    preorder_fill(root, out, &outn);
    print_arr(out, outn);
    return 0;
}`));

// Q7 Expression Tree Inorder Audit
codes.push(Q(String.raw`void inorder_fill(TNode *root, int out[], int *outn) {
    if (root == NULL) return;
    inorder_fill(root->left, out, outn);
    out[(*outn)++] = root->val;
    inorder_fill(root->right, out, outn);
}

int main(void) {
    TNode *root = build_tree();
    int out[1005], outn = 0;
    inorder_fill(root, out, &outn);
    print_arr(out, outn);
    return 0;
}`));

// Q8 Cleanup Sweep Postorder
codes.push(Q(String.raw`void postorder_fill(TNode *root, int out[], int *outn) {
    if (root == NULL) return;
    postorder_fill(root->left, out, outn);
    postorder_fill(root->right, out, outn);
    out[(*outn)++] = root->val;
}

int main(void) {
    TNode *root = build_tree();
    int out[1005], outn = 0;
    postorder_fill(root, out, &outn);
    print_arr(out, outn);
    return 0;
}`));

// Q9 Org Chart Depth Report
codes.push(Q(String.raw`int tree_height(TNode *root) {
    if (root == NULL) return 0;
    int l = tree_height(root->left);
    int r = tree_height(root->right);
    return 1 + (l > r ? l : r);
}

int main(void) {
    TNode *root = build_tree();
    printf("%d\n", tree_height(root));
    return 0;
}`));

// Q10 Leftmost Path Report
codes.push(Q(String.raw`void leftmost_fill(TNode *root, int out[], int *outn) {
    TNode *cur = root;
    while (cur != NULL) {
        out[(*outn)++] = cur->val;
        if (cur->left != NULL) cur = cur->left;
        else cur = cur->right;
    }
}

int main(void) {
    TNode *root = build_tree();
    int out[1005], outn = 0;
    leftmost_fill(root, out, &outn);
    print_arr(out, outn);
    return 0;
}`));

// Q11 Single-Child Hub Count
codes.push(Q(String.raw`int count_one_child(TNode *root) {
    if (root == NULL) return 0;
    int here = 0;
    if ((root->left == NULL) != (root->right == NULL)) here = 1;
    return here + count_one_child(root->left) + count_one_child(root->right);
}

int main(void) {
    TNode *root = build_tree();
    printf("%d\n", count_one_child(root));
    return 0;
}`));

// Q12 Subtree Size Report
codes.push(Q(String.raw`int count_from(TNode *root) {
    if (root == NULL) return 0;
    return 1 + count_from(root->left) + count_from(root->right);
}

int subtree_size(TNode *root, int target) {
    if (root == NULL) return 0;
    if (root->val == target) return count_from(root);
    int l = subtree_size(root->left, target);
    if (l > 0) return l;
    return subtree_size(root->right, target);
}

int main(void) {
    TNode *root = build_tree();
    int target;
    scanf("%d", &target);
    printf("%d\n", subtree_size(root, target));
    return 0;
}`));

// Q13 Ancestor Chain Fill
codes.push(Q(String.raw`int find_path(TNode *root, int target, int out[], int *outn) {
    if (root == NULL) return 0;
    if (root->val == target) return 1;
    out[(*outn)++] = root->val;
    if (find_path(root->left, target, out, outn)) return 1;
    if (find_path(root->right, target, out, outn)) return 1;
    (*outn)--;
    return 0;
}

void ancestors_fill(TNode *root, int target, int out[], int *outn) {
    find_path(root, target, out, outn);
}

int main(void) {
    TNode *root = build_tree();
    int target;
    scanf("%d", &target);
    int out[1005], outn = 0;
    ancestors_fill(root, target, out, &outn);
    if (outn == 0) puts("none");
    else print_arr(out, outn);
    return 0;
}`));

// Q14 Sum of Left Leaves
codes.push(Q(String.raw`int sum_left_leaves(TNode *root) {
    if (root == NULL) return 0;
    int s = 0;
    if (root->left != NULL && root->left->left == NULL && root->left->right == NULL)
        s += root->left->val;
    s += sum_left_leaves(root->left);
    s += sum_left_leaves(root->right);
    return s;
}

int main(void) {
    TNode *root = build_tree();
    printf("%d\n", sum_left_leaves(root));
    return 0;
}`));

// Q15 Deepest Leaves Sum
codes.push(Q(String.raw`int height_h(TNode *root) {
    if (root == NULL) return 0;
    int l = height_h(root->left);
    int r = height_h(root->right);
    return 1 + (l > r ? l : r);
}

int sum_at_depth(TNode *root, int want) {
    if (root == NULL) return 0;
    if (want == 1) return root->val;
    return sum_at_depth(root->left, want - 1) + sum_at_depth(root->right, want - 1);
}

int deepest_leaves_sum(TNode *root) {
    return sum_at_depth(root, height_h(root));
}

int main(void) {
    TNode *root = build_tree();
    printf("%d\n", deepest_leaves_sum(root));
    return 0;
}`));

// Q16 Support Ticket Level Order
codes.push(Q(String.raw`void levelorder_fill(TNode *root, int out[], int *outn) {
    if (root == NULL) return;
    TNode *q[2005];
    int qh = 0, qt = 0;
    q[qt++] = root;
    while (qh < qt) {
        TNode *cur = q[qh++];
        out[(*outn)++] = cur->val;
        if (cur->left != NULL) q[qt++] = cur->left;
        if (cur->right != NULL) q[qt++] = cur->right;
    }
}

int main(void) {
    TNode *root = build_tree();
    int out[1005], outn = 0;
    levelorder_fill(root, out, &outn);
    print_arr(out, outn);
    return 0;
}`));

// Q17 Mirror Symmetry Check
codes.push(Q(String.raw`int mirrors(TNode *a, TNode *b) {
    if (a == NULL && b == NULL) return 1;
    if (a == NULL || b == NULL) return 0;
    return a->val == b->val && mirrors(a->left, b->right) && mirrors(a->right, b->left);
}

int is_symmetric(TNode *root) {
    if (root == NULL) return 1;
    return mirrors(root->left, root->right);
}

int main(void) {
    TNode *root = build_tree();
    printf("%d\n", is_symmetric(root));
    return 0;
}`));

// Q18 Cross-Campus Message Route
codes.push(Q(String.raw`int dia(TNode *root, int *best) {
    if (root == NULL) return -1;
    int l = dia(root->left, best);
    int r = dia(root->right, best);
    if (l + r + 2 > *best) *best = l + r + 2;
    return 1 + (l > r ? l : r);
}

int tree_diameter(TNode *root) {
    int best = 0;
    dia(root, &best);
    return best;
}

int main(void) {
    TNode *root = build_tree();
    printf("%d\n", tree_diameter(root));
    return 0;
}`));

// Q19 Balanced Height Check
codes.push(Q(String.raw`int check_bal(TNode *root, int *ok) {
    if (root == NULL) return 0;
    int l = check_bal(root->left, ok);
    int r = check_bal(root->right, ok);
    if (l - r > 1 || r - l > 1) *ok = 0;
    return 1 + (l > r ? l : r);
}

int is_balanced(TNode *root) {
    int ok = 1;
    check_bal(root, &ok);
    return ok;
}

int main(void) {
    TNode *root = build_tree();
    printf("%d\n", is_balanced(root));
    return 0;
}`));

if (codes.length !== data.questions.length) {
  throw new Error("count mismatch: codes=" + codes.length + " questions=" + data.questions.length);
}
data.questions.forEach((q, i) => { q.sourcecode = codes[i]; });
writeFileSync(DST, JSON.stringify(data, null, 2));
console.log("wrote", DST);
