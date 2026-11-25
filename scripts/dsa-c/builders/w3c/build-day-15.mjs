import { readFileSync, writeFileSync } from "node:fs";

const SRC = "/home/z/tmp/dsa-export/dsa-c/day-15.code.json";
const DST = "/home/z/my-project/scripts/dsa-c/data/day-15.code.json";

const data = JSON.parse(readFileSync(SRC, "utf8"));
const codes = [];

// Minimal array header (printf allowed on this day; blacklist is only "qsort")
const H_ARR = String.raw`#include <stdio.h>

static void print_arr(const int *a, int n) {
    for (int i = 0; i < n; i++) printf("%d%c", a[i], (i + 1 < n) ? ' ' : '\n');
}
`;

// BST header: node type, insert, build-from-keys, inorder collect
const H_BST = String.raw`#include <stdio.h>
#include <stdlib.h>

typedef struct BNode { int key; struct BNode *left, *right; } BNode;

static BNode *bnew(int key) {
    BNode *nd = (BNode *)malloc(sizeof(BNode));
    nd->key = key;
    nd->left = nd->right = NULL;
    return nd;
}

static BNode *insert_key(BNode *root, int key) {
    if (root == NULL) return bnew(key);
    if (key < root->key) root->left = insert_key(root->left, key);
    else if (key > root->key) root->right = insert_key(root->right, key);
    return root;
}

static BNode *build_bst(void) {
    int k;
    if (scanf("%d", &k) != 1) return NULL;
    BNode *root = NULL;
    for (int i = 0; i < k; i++) {
        int key;
        scanf("%d", &key);
        root = insert_key(root, key);
    }
    return root;
}

static void inorder_fill(BNode *root, int out[], int *outn) {
    if (root == NULL) return;
    inorder_fill(root->left, out, outn);
    out[(*outn)++] = root->key;
    inorder_fill(root->right, out, outn);
}

static void print_arr(const int *a, int n) {
    for (int i = 0; i < n; i++) printf("%d%c", a[i], (i + 1 < n) ? ' ' : '\n');
}
`;

// Plain binary tree header for level-order builds with -1 = missing child
const H_BT = String.raw`#include <stdio.h>
#include <stdlib.h>

typedef struct BNode { int key; struct BNode *left, *right; } BNode;

static BNode *bnew(int key) {
    BNode *nd = (BNode *)malloc(sizeof(BNode));
    nd->key = key;
    nd->left = nd->right = NULL;
    return nd;
}

static BNode *build_level_tree(void) {
    int n;
    if (scanf("%d", &n) != 1) return NULL;
    int vals[1005];
    for (int i = 0; i < n; i++) scanf("%d", &vals[i]);
    if (n <= 0 || vals[0] == -1) return NULL;
    BNode *queue[1005];
    int qh = 0, qt = 0, i = 1;
    BNode *root = bnew(vals[0]);
    queue[qt++] = root;
    while (qh < qt && i < n) {
        BNode *cur = queue[qh++];
        if (i < n) {
            if (vals[i] != -1) { BNode *c = bnew(vals[i]); cur->left = c; queue[qt++] = c; }
            i++;
        }
        if (i < n) {
            if (vals[i] != -1) { BNode *c = bnew(vals[i]); cur->right = c; queue[qt++] = c; }
            i++;
        }
    }
    return root;
}

static void print_arr(const int *a, int n) {
    for (int i = 0; i < n; i++) printf("%d%c", a[i], (i + 1 < n) ? ' ' : '\n');
}
`;

// Q0 BST Insert Keys (harness calls the user's bst_insert)
codes.push(H_BST + "\n" + String.raw`BNode *bst_insert(BNode *root, int key) {
    if (root == NULL) {
        BNode *nd = (BNode *)malloc(sizeof(BNode));
        nd->key = key;
        nd->left = nd->right = NULL;
        return nd;
    }
    if (key < root->key) root->left = bst_insert(root->left, key);
    else if (key > root->key) root->right = bst_insert(root->right, key);
    return root;
}

int main(void) {
    int k;
    if (scanf("%d", &k) != 1) return 0;
    BNode *root = NULL;
    for (int i = 0; i < k; i++) {
        int key;
        scanf("%d", &key);
        root = bst_insert(root, key);
    }
    int out[1005], outn = 0;
    inorder_fill(root, out, &outn);
    print_arr(out, outn);
    return 0;
}`);

// Q1 BST Search Hit or Miss
codes.push(H_BST + "\n" + String.raw`int bst_search(BNode *root, int key) {
    BNode *cur = root;
    while (cur != NULL) {
        if (key == cur->key) return 1;
        cur = (key < cur->key) ? cur->left : cur->right;
    }
    return 0;
}

int main(void) {
    BNode *root = build_bst();
    int key;
    scanf("%d", &key);
    printf("%d\n", bst_search(root, key));
    return 0;
}`);

// Q2 Smallest Key in BST
codes.push(H_BST + "\n" + String.raw`int bst_min(BNode *root) {
    BNode *cur = root;
    while (cur->left != NULL) cur = cur->left;
    return cur->key;
}

int main(void) {
    BNode *root = build_bst();
    printf("%d\n", bst_min(root));
    return 0;
}`);

// Q3 Largest Key in BST
codes.push(H_BST + "\n" + String.raw`int bst_max(BNode *root) {
    BNode *cur = root;
    while (cur->right != NULL) cur = cur->right;
    return cur->key;
}

int main(void) {
    BNode *root = build_bst();
    printf("%d\n", bst_max(root));
    return 0;
}`);

// Q4 Count BST Nodes
codes.push(H_BST + "\n" + String.raw`int bst_count(BNode *root) {
    if (root == NULL) return 0;
    return 1 + bst_count(root->left) + bst_count(root->right);
}

int main(void) {
    BNode *root = build_bst();
    printf("%d\n", bst_count(root));
    return 0;
}`);

// Q5 Sum of BST Keys
codes.push(H_BST + "\n" + String.raw`int bst_sum(BNode *root) {
    if (root == NULL) return 0;
    return root->key + bst_sum(root->left) + bst_sum(root->right);
}

int main(void) {
    BNode *root = build_bst();
    printf("%d\n", bst_sum(root));
    return 0;
}`);

// Q6 Ticket Priority Ordering (harness calls the user's bst_insert)
codes.push(H_BST + "\n" + String.raw`BNode *bst_insert(BNode *root, int key) {
    if (root == NULL) {
        BNode *nd = (BNode *)malloc(sizeof(BNode));
        nd->key = key;
        nd->left = nd->right = NULL;
        return nd;
    }
    if (key < root->key) root->left = bst_insert(root->left, key);
    else if (key > root->key) root->right = bst_insert(root->right, key);
    return root;
}

int main(void) {
    int k;
    if (scanf("%d", &k) != 1) return 0;
    BNode *root = NULL;
    for (int i = 0; i < k; i++) {
        int key;
        scanf("%d", &key);
        root = bst_insert(root, key);
    }
    int out[1005], outn = 0;
    inorder_fill(root, out, &outn);
    print_arr(out, outn);
    return 0;
}`);

// Q7 Access Code Verification
codes.push(H_BST + "\n" + String.raw`int bst_search(BNode *root, int key) {
    BNode *cur = root;
    while (cur != NULL) {
        if (key == cur->key) return 1;
        cur = (key < cur->key) ? cur->left : cur->right;
    }
    return 0;
}

int main(void) {
    BNode *root = build_bst();
    int m;
    if (scanf("%d", &m) != 1) return 0;
    for (int i = 0; i < m; i++) {
        int attempt;
        scanf("%d", &attempt);
        printf("%d\n", bst_search(root, attempt));
    }
    return 0;
}`);

// Q8 Oldest Log Timestamp
codes.push(H_BST + "\n" + String.raw`int bst_min(BNode *root) {
    BNode *cur = root;
    while (cur->left != NULL) cur = cur->left;
    return cur->key;
}

int main(void) {
    BNode *root = build_bst();
    printf("%d\n", bst_min(root));
    return 0;
}`);

// Q9 Priciest Item Lookup
codes.push(H_BST + "\n" + String.raw`int bst_max(BNode *root) {
    BNode *cur = root;
    while (cur->right != NULL) cur = cur->right;
    return cur->key;
}

int main(void) {
    BNode *root = build_bst();
    printf("%d\n", bst_max(root));
    return 0;
}`);

// Q10 Build the Min-Heap
codes.push(H_ARR + "\n" + String.raw`void sift_down(int a[], int n, int i) {
    while (1) {
        int smallest = i;
        int l = 2 * i + 1;
        int r = 2 * i + 2;
        if (l < n && a[l] < a[smallest]) smallest = l;
        if (r < n && a[r] < a[smallest]) smallest = r;
        if (smallest == i) break;
        int t = a[i];
        a[i] = a[smallest];
        a[smallest] = t;
        i = smallest;
    }
}

void build_min_heap(int a[], int n) {
    for (int i = n / 2 - 1; i >= 0; i--) sift_down(a, n, i);
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int a[1005];
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    build_min_heap(a, n);
    print_arr(a, n);
    return 0;
}`);

// Q11 Emergency Room Triage
codes.push(H_ARR + "\n" + String.raw`void heap_push(int heap[], int *size, int v) {
    int i = (*size)++;
    heap[i] = v;
    while (i > 0) {
        int p = (i - 1) / 2;
        if (heap[p] <= heap[i]) break;
        int t = heap[p];
        heap[p] = heap[i];
        heap[i] = t;
        i = p;
    }
}

int heap_pop(int heap[], int *size) {
    int top = heap[0];
    (*size)--;
    heap[0] = heap[*size];
    int i = 0;
    while (1) {
        int l = 2 * i + 1;
        int r = 2 * i + 2;
        int smallest = i;
        if (l < *size && heap[l] < heap[smallest]) smallest = l;
        if (r < *size && heap[r] < heap[smallest]) smallest = r;
        if (smallest == i) break;
        int t = heap[i];
        heap[i] = heap[smallest];
        heap[smallest] = t;
        i = smallest;
    }
    return top;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int heap[1005], out[1005], size = 0;
    for (int i = 0; i < n; i++) {
        int v;
        scanf("%d", &v);
        heap_push(heap, &size, v);
    }
    for (int i = 0; i < n; i++) out[i] = heap_pop(heap, &size);
    print_arr(out, n);
    return 0;
}`);

// Q12 Keys in the Range
codes.push(H_BST + "\n" + String.raw`int bst_range_count(BNode *root, int lo, int hi) {
    if (root == NULL) return 0;
    if (root->key < lo) return bst_range_count(root->right, lo, hi);
    if (root->key > hi) return bst_range_count(root->left, lo, hi);
    return 1 + bst_range_count(root->left, lo, hi) + bst_range_count(root->right, lo, hi);
}

int main(void) {
    BNode *root = build_bst();
    int lo, hi;
    scanf("%d %d", &lo, &hi);
    printf("%d\n", bst_range_count(root, lo, hi));
    return 0;
}`);

// Q13 Min-Heap Property Check
codes.push(H_ARR + "\n" + String.raw`int is_min_heap(int a[], int n) {
    for (int i = 0; i < n; i++) {
        int l = 2 * i + 1;
        int r = 2 * i + 2;
        if (l < n && a[l] < a[i]) return 0;
        if (r < n && a[r] < a[i]) return 0;
    }
    return 1;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int a[1005];
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    printf("%d\n", is_min_heap(a, n));
    return 0;
}`);

// Q14 Kth Smallest Key
codes.push(H_BST + "\n" + String.raw`int kth_visit(BNode *root, int *cnt, int r) {
    if (root == NULL) return -1;
    int res = kth_visit(root->left, cnt, r);
    if (res != -1) return res;
    (*cnt)++;
    if (*cnt == r) return root->key;
    return kth_visit(root->right, cnt, r);
}

int bst_kth_smallest(BNode *root, int r) {
    int cnt = 0;
    return kth_visit(root, &cnt, r);
}

int main(void) {
    BNode *root = build_bst();
    int r;
    scanf("%d", &r);
    printf("%d\n", bst_kth_smallest(root, r));
    return 0;
}`);

// Q15 Users Below Threshold
codes.push(H_BST + "\n" + String.raw`int bst_count_less(BNode *root, int x) {
    if (root == NULL) return 0;
    if (root->key >= x) return bst_count_less(root->left, x);
    return 1 + bst_count_less(root->left, x) + bst_count_less(root->right, x);
}

int main(void) {
    BNode *root = build_bst();
    int x;
    scanf("%d", &x);
    printf("%d\n", bst_count_less(root, x));
    return 0;
}`);

// Q16 Expire a BST Key
codes.push(H_BST + "\n" + String.raw`BNode *bst_delete(BNode *root, int key) {
    if (root == NULL) return NULL;
    if (key < root->key) {
        root->left = bst_delete(root->left, key);
        return root;
    }
    if (key > root->key) {
        root->right = bst_delete(root->right, key);
        return root;
    }
    if (root->left == NULL) {
        BNode *r = root->right;
        free(root);
        return r;
    }
    if (root->right == NULL) {
        BNode *l = root->left;
        free(root);
        return l;
    }
    BNode *s = root->right;
    while (s->left != NULL) s = s->left;
    root->key = s->key;
    root->right = bst_delete(root->right, s->key);
    return root;
}

int main(void) {
    BNode *root = build_bst();
    int key;
    scanf("%d", &key);
    root = bst_delete(root, key);
    int out[1005], outn = 0;
    inorder_fill(root, out, &outn);
    print_arr(out, outn);
    return 0;
}`);

// Q17 Validate the BST (plain level-order tree, wide bounds)
codes.push(H_BT + "\n" + String.raw`int is_bst(BNode *root, long long lo, long long hi) {
    if (root == NULL) return 1;
    if (root->key <= lo || root->key >= hi) return 0;
    return is_bst(root->left, lo, root->key) && is_bst(root->right, root->key, hi);
}

int main(void) {
    BNode *root = build_level_tree();
    printf("%d\n", is_bst(root, -4000000000000000000LL, 4000000000000000000LL));
    return 0;
}`);

// Q18 Kth Largest Key
codes.push(H_BST + "\n" + String.raw`int kth_rev(BNode *root, int *cnt, int r) {
    if (root == NULL) return -1;
    int res = kth_rev(root->right, cnt, r);
    if (res != -1) return res;
    (*cnt)++;
    if (*cnt == r) return root->key;
    return kth_rev(root->left, cnt, r);
}

int bst_kth_largest(BNode *root, int r) {
    int cnt = 0;
    return kth_rev(root, &cnt, r);
}

int main(void) {
    BNode *root = build_bst();
    int r;
    scanf("%d", &r);
    printf("%d\n", bst_kth_largest(root, r));
    return 0;
}`);

// Q19 Nearest Sensor Reading
codes.push(H_BST + "\n" + String.raw`int bst_closest(BNode *root, int target) {
    int best = root->key;
    BNode *cur = root;
    while (cur != NULL) {
        if (abs(cur->key - target) < abs(best - target)) best = cur->key;
        if (target < cur->key) cur = cur->left;
        else if (target > cur->key) cur = cur->right;
        else break;
    }
    return best;
}

int main(void) {
    BNode *root = build_bst();
    int target;
    scanf("%d", &target);
    printf("%d\n", bst_closest(root, target));
    return 0;
}`);

if (codes.length !== data.questions.length) {
  throw new Error("count mismatch: codes=" + codes.length + " questions=" + data.questions.length);
}
data.questions.forEach((q, i) => { q.sourcecode = codes[i]; });
writeFileSync(DST, JSON.stringify(data, null, 2));
console.log("wrote", DST);
