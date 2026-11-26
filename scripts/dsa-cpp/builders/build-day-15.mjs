/**
 * Day 15 (Binary Search Trees and Heaps) — complete standalone programs.
 * Honors per-question blacklist/whitelist substrings (vector<, queue<, sort(, etc.).
 */
import { readFileSync, writeFileSync } from "node:fs";

const SRC = "/home/z/tmp/dsa-export/dsa-cpp/day-15.code.json";
const OUT = "/home/z/my-project/scripts/dsa-cpp/data/day-15.code.json";
const MCQ_SRC = "/home/z/tmp/dsa-export/dsa-cpp/day-15.mcq.json";
const MCQ_OUT = "/home/z/my-project/scripts/dsa-cpp/data/day-15.mcq.json";

const TNODE = `struct TNode {
    int val;
    TNode* left;
    TNode* right;
    TNode() : val(0), left(NULL), right(NULL) {}
};`;

const BST_INSERT = `TNode* bst_insert(TNode* root, int value) {
    if (!root) {
        TNode* node = new TNode();
        node->val = value;
        node->left = NULL;
        node->right = NULL;
        return node;
    }
    if (value < root->val) root->left = bst_insert(root->left, value);
    else if (value > root->val) root->right = bst_insert(root->right, value);
    return root;
}`;

const INORDER_PRINT = `void inorder_print(TNode* root, bool& first) {
    if (!root) return;
    inorder_print(root->left, first);
    if (!first) std::cout << ' ';
    std::cout << root->val;
    first = false;
    inorder_print(root->right, first);
}`;

const BST_BUILD_MAIN_HEAD = `int main() {
    int n;
    std::cin >> n;
    TNode* root = NULL;
    for (int i = 0; i < n; i++) {
        int v;
        std::cin >> v;
        root = bst_insert(root, v);
    }`;

const PRINT_VEC = (expr, lenExpr) => `    for (int i = 0; i < ${lenExpr}; i++) {
        if (i) std::cout << ' ';
        std::cout << ${expr};
    }
    std::cout << "\\n";`;

const programs = [
  /* Q1 Insert into the BST */
  `#include <iostream>

${TNODE}

${BST_INSERT}

${INORDER_PRINT}

${BST_BUILD_MAIN_HEAD}
    int value;
    std::cin >> value;
    root = bst_insert(root, value);
    bool first = true;
    inorder_print(root, first);
    std::cout << "\\n";
    return 0;
}
`,
  /* Q2 Search the BST */
  `#include <iostream>

${TNODE}

${BST_INSERT}

bool bst_search(TNode* root, int target) {
    while (root) {
        if (target == root->val) return true;
        if (target < root->val) root = root->left;
        else root = root->right;
    }
    return false;
}

${BST_BUILD_MAIN_HEAD}
    int target;
    std::cin >> target;
    std::cout << (bst_search(root, target) ? 1 : 0) << "\\n";
    return 0;
}
`,
  /* Q3 Minimum of the BST */
  `#include <iostream>

${TNODE}

${BST_INSERT}

int bst_min(TNode* root) {
    while (root->left) root = root->left;
    return root->val;
}

${BST_BUILD_MAIN_HEAD}
    std::cout << bst_min(root) << "\\n";
    return 0;
}
`,
  /* Q4 Maximum of the BST */
  `#include <iostream>

${TNODE}

${BST_INSERT}

int bst_max(TNode* root) {
    while (root->right) root = root->right;
    return root->val;
}

${BST_BUILD_MAIN_HEAD}
    std::cout << bst_max(root) << "\\n";
    return 0;
}
`,
  /* Q5 Check the Min-Heap Array */
  `#include <iostream>
#include <vector>

int is_min_heap(std::vector<int> v) {
    for (int i = 1; i < (int)v.size(); i++)
        if (v[(i - 1) / 2] > v[i]) return 0;
    return 1;
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> v(n);
    for (int i = 0; i < n; i++) std::cin >> v[i];
    std::cout << is_min_heap(v) << "\\n";
    return 0;
}
`,
  /* Q6 Heap Array Family Indexes */
  `#include <iostream>
#include <vector>

std::vector<int> heap_family(int i, int n) {
    std::vector<int> res;
    res.push_back(i > 0 ? (i - 1) / 2 : -1);
    res.push_back(2 * i + 1 < n ? 2 * i + 1 : -1);
    res.push_back(2 * i + 2 < n ? 2 * i + 2 : -1);
    return res;
}

int main() {
    int i, n;
    std::cin >> i >> n;
    std::vector<int> res = heap_family(i, n);
${PRINT_VEC("res[i]", "(int)res.size()")}
    return 0;
}
`,
  /* Q7 Count Prices in Range */
  `#include <iostream>

${TNODE}

${BST_INSERT}

int bst_range_count(TNode* root, int lo, int hi) {
    if (!root) return 0;
    int c = 0;
    if (root->val >= lo && root->val <= hi) c++;
    if (root->val > lo) c += bst_range_count(root->left, lo, hi);
    if (root->val < hi) c += bst_range_count(root->right, lo, hi);
    return c;
}

${BST_BUILD_MAIN_HEAD}
    int lo, hi;
    std::cin >> lo >> hi;
    std::cout << bst_range_count(root, lo, hi) << "\\n";
    return 0;
}
`,
  /* Q8 Sift-Up the New Patient */
  `#include <iostream>
#include <vector>

std::vector<int> sift_up(std::vector<int> heap) {
    int i = (int)heap.size() - 1;
    while (i > 0 && heap[i] < heap[(i - 1) / 2]) {
        int p = (i - 1) / 2;
        int tmp = heap[i];
        heap[i] = heap[p];
        heap[p] = tmp;
        i = p;
    }
    return heap;
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> heap(n);
    for (int i = 0; i < n; i++) std::cin >> heap[i];
    std::vector<int> res = sift_up(heap);
${PRINT_VEC("res[i]", "(int)res.size()")}
    return 0;
}
`,
  /* Q9 Serve Tickets Highest First */
  `#include <iostream>
#include <vector>
#include <algorithm>
#include <functional>

std::vector<int> serve_order(std::vector<int> priorities) {
    std::sort(priorities.begin(), priorities.end(), std::greater<int>());
    return priorities;
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> priorities(n);
    for (int i = 0; i < n; i++) std::cin >> priorities[i];
    std::vector<int> res = serve_order(priorities);
${PRINT_VEC("res[i]", "(int)res.size()")}
    return 0;
}
`,
  /* Q10 Smallest Price Above Budget */
  `#include <iostream>

${TNODE}

${BST_INSERT}

int bst_ceiling(TNode* root, int target) {
    int best = -1;
    while (root) {
        if (root->val == target) return root->val;
        if (root->val > target) {
            best = root->val;
            root = root->left;
        } else {
            root = root->right;
        }
    }
    return best;
}

${BST_BUILD_MAIN_HEAD}
    int target;
    std::cin >> target;
    std::cout << bst_ceiling(root, target) << "\\n";
    return 0;
}
`,
  /* Q11 Sum Prices in Range (blacklist: no vector<) */
  `#include <iostream>

${TNODE}

${BST_INSERT}

long long bst_range_sum(TNode* root, int lo, int hi) {
    if (!root) return 0;
    long long s = 0;
    if (root->val >= lo && root->val <= hi) s += root->val;
    if (root->val > lo) s += bst_range_sum(root->left, lo, hi);
    if (root->val < hi) s += bst_range_sum(root->right, lo, hi);
    return s;
}

${BST_BUILD_MAIN_HEAD}
    int lo, hi;
    std::cin >> lo >> hi;
    std::cout << bst_range_sum(root, lo, hi) << "\\n";
    return 0;
}
`,
  /* Q12 Validate the BST (blacklist: no vector<; level-order build, -1 = NULL) */
  `#include <iostream>
#include <climits>

${TNODE}

bool is_bst(TNode* root, long long lo, long long hi) {
    if (!root) return true;
    if ((long long)root->val <= lo || (long long)root->val >= hi) return false;
    return is_bst(root->left, lo, (long long)root->val) &&
           is_bst(root->right, (long long)root->val, hi);
}

TNode* build_level(const int* a, int n, int i) {
    if (i >= n || a[i] == -1) return NULL;
    TNode* node = new TNode();
    node->val = a[i];
    node->left = build_level(a, n, 2 * i + 1);
    node->right = build_level(a, n, 2 * i + 2);
    return node;
}

int main() {
    int n;
    std::cin >> n;
    int a[2005];
    for (int i = 0; i < n; i++) std::cin >> a[i];
    TNode* root = build_level(a, n, 0);
    std::cout << (is_bst(root, LLONG_MIN, LLONG_MAX) ? 1 : 0) << "\\n";
    return 0;
}
`,
  /* Q13 Kth Largest with a Size-K Heap (whitelist: queue) */
  `#include <iostream>
#include <vector>
#include <queue>
#include <functional>

int kth_largest(std::vector<int> v, int k) {
    std::priority_queue<int, std::vector<int>, std::greater<int> > window;
    for (size_t i = 0; i < v.size(); i++) {
        window.push(v[i]);
        if ((int)window.size() > k) window.pop();
    }
    return window.top();
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> v(n);
    for (int i = 0; i < n; i++) std::cin >> v[i];
    int k;
    std::cin >> k;
    std::cout << kth_largest(v, k) << "\\n";
    return 0;
}
`,
  /* Q14 Kth Smallest in the BST (blacklist: no vector<; counter walk) */
  `#include <iostream>

${TNODE}

${BST_INSERT}

void inorder_kth(TNode* node, int k, int& cnt, int& ans) {
    if (!node || cnt >= k) return;
    inorder_kth(node->left, k, cnt, ans);
    if (cnt >= k) return;
    cnt++;
    if (cnt == k) {
        ans = node->val;
        return;
    }
    inorder_kth(node->right, k, cnt, ans);
}

int kth_smallest(TNode* root, int k) {
    int cnt = 0;
    int ans = -1;
    inorder_kth(root, k, cnt, ans);
    return ans;
}

${BST_BUILD_MAIN_HEAD}
    int k;
    std::cin >> k;
    std::cout << kth_smallest(root, k) << "\\n";
    return 0;
}
`,
  /* Q15 Build the Min-Heap In Place (blacklist: sort/make_heap/priority_queue) */
  `#include <iostream>
#include <vector>

void build_min_heap(std::vector<int>& heap) {
    int n = (int)heap.size();
    for (int start = n / 2 - 1; start >= 0; start--) {
        int i = start;
        while (true) {
            int l = 2 * i + 1;
            int r = 2 * i + 2;
            int small = i;
            if (l < n && heap[l] < heap[small]) small = l;
            if (r < n && heap[r] < heap[small]) small = r;
            if (small == i) break;
            int tmp = heap[i];
            heap[i] = heap[small];
            heap[small] = tmp;
            i = small;
        }
    }
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> heap(n);
    for (int i = 0; i < n; i++) std::cin >> heap[i];
    build_min_heap(heap);
${PRINT_VEC("heap[i]", "n")}
    return 0;
}
`,
  /* Q16 Simulate the Priority Queue (min-priority queue via std::greater) */
  `#include <iostream>
#include <vector>
#include <queue>
#include <functional>

std::vector<int> pq_simulate(std::vector<int> kinds, std::vector<int> vals) {
    std::priority_queue<int, std::vector<int>, std::greater<int> > pq;
    std::vector<int> popped;
    for (size_t i = 0; i < kinds.size(); i++) {
        if (kinds[i] == 1) {
            pq.push(vals[i]);
        } else {
            if (!pq.empty()) {
                popped.push_back(pq.top());
                pq.pop();
            }
        }
    }
    return popped;
}

int main() {
    int m;
    std::cin >> m;
    std::vector<int> kinds(m), vals(m);
    for (int i = 0; i < m; i++) std::cin >> kinds[i] >> vals[i];
    std::vector<int> res = pq_simulate(kinds, vals);
${PRINT_VEC("res[i]", "(int)res.size()")}
    return 0;
}
`,
  /* Q17 Search Path in the BST (blacklist: no queue<; while walk) */
  `#include <iostream>
#include <vector>

${TNODE}

${BST_INSERT}

std::vector<int> search_path(TNode* root, int target) {
    std::vector<int> path;
    TNode* cur = root;
    while (cur) {
        path.push_back(cur->val);
        if (target == cur->val) break;
        if (target < cur->val) cur = cur->left;
        else cur = cur->right;
    }
    return path;
}

${BST_BUILD_MAIN_HEAD}
    int target;
    std::cin >> target;
    std::vector<int> res = search_path(root, target);
${PRINT_VEC("res[i]", "(int)res.size()")}
    return 0;
}
`,
  /* Q18 Count Build-Heap Swaps (blacklist: sort/make_heap/priority_queue) */
  `#include <iostream>
#include <vector>

int build_swap_count(std::vector<int> v) {
    int n = (int)v.size();
    int swaps = 0;
    for (int start = n / 2 - 1; start >= 0; start--) {
        int i = start;
        while (true) {
            int l = 2 * i + 1;
            int r = 2 * i + 2;
            int small = i;
            if (l < n && v[l] < v[small]) small = l;
            if (r < n && v[r] < v[small]) small = r;
            if (small == i) break;
            int tmp = v[i];
            v[i] = v[small];
            v[small] = tmp;
            swaps++;
            i = small;
        }
    }
    return swaps;
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> v(n);
    for (int i = 0; i < n; i++) std::cin >> v[i];
    std::cout << build_swap_count(v) << "\\n";
    return 0;
}
`,
  /* Q19 Delete from the BST (successor swap; absent value = unchanged) */
  `#include <iostream>

${TNODE}

${BST_INSERT}

${INORDER_PRINT}

TNode* bst_delete(TNode* root, int value) {
    if (!root) return NULL;
    if (value < root->val) {
        root->left = bst_delete(root->left, value);
    } else if (value > root->val) {
        root->right = bst_delete(root->right, value);
    } else {
        if (!root->left) {
            TNode* r = root->right;
            delete root;
            return r;
        }
        if (!root->right) {
            TNode* l = root->left;
            delete root;
            return l;
        }
        TNode* succ = root->right;
        while (succ->left) succ = succ->left;
        root->val = succ->val;
        root->right = bst_delete(root->right, succ->val);
    }
    return root;
}

${BST_BUILD_MAIN_HEAD}
    int value;
    std::cin >> value;
    root = bst_delete(root, value);
    bool first = true;
    inorder_print(root, first);
    std::cout << "\\n";
    return 0;
}
`,
  /* Q20 Pop the Heap Minimum (blacklist: sort/make_heap/priority_queue) */
  `#include <iostream>
#include <vector>

std::vector<int> pop_min(std::vector<int> heap) {
    int n = (int)heap.size();
    heap[0] = heap[n - 1];
    heap.pop_back();
    int i = 0;
    int m = (int)heap.size();
    while (true) {
        int l = 2 * i + 1;
        int r = 2 * i + 2;
        int small = i;
        if (l < m && heap[l] < heap[small]) small = l;
        if (r < m && heap[r] < heap[small]) small = r;
        if (small == i) break;
        int tmp = heap[i];
        heap[i] = heap[small];
        heap[small] = tmp;
        i = small;
    }
    return heap;
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> heap(n);
    for (int i = 0; i < n; i++) std::cin >> heap[i];
    std::vector<int> res = pop_min(heap);
${PRINT_VEC("res[i]", "(int)res.size()")}
    return 0;
}
`,
];

const data = JSON.parse(readFileSync(SRC, "utf8"));
if (data.questions.length !== programs.length)
  throw new Error(`expected ${data.questions.length} programs, got ${programs.length}`);
data.questions.forEach((q, i) => {
  q.sourcecode = programs[i];
});
writeFileSync(OUT, JSON.stringify(data, null, 2));
console.log(`day-15.code.json written: ${data.questions.length} programs`);

const mcqSrc = JSON.parse(readFileSync(MCQ_SRC, "utf8"));
const mcqOut = { day: mcqSrc.day, questions: mcqSrc.questions.map(({ _id, ...rest }) => rest) };
writeFileSync(MCQ_OUT, JSON.stringify(mcqOut, null, 2));
console.log(`day-15.mcq.json written: ${mcqOut.questions.length} questions (ids stripped)`);
