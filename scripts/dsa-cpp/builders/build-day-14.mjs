// Build day-14 (Trees and Binary Trees) complete standalone programs.
// Bank sourcecode contains only the function bodies -> embed into a scaffold
// with struct TNode + line-based level-order builder (raw-array BFS queue so
// that banned substrings "queue<", "stack<", "vector<" never appear in the
// scaffold; declared n is ignored, the whole token line is consumed).
import { readFileSync, writeFileSync } from "node:fs";

const SRC = "/home/z/tmp/dsa-export/dsa-cpp/day-14.code.json";
const DST = "/home/z/my-project/scripts/dsa-cpp/data/day-14.code.json";

const data = JSON.parse(readFileSync(SRC, "utf8"));

const SCAFFOLD = `struct TNode {
    int val;
    TNode* left;
    TNode* right;
    TNode(int v) : val(v), left(nullptr), right(nullptr) {}
};

static int parse_line(const std::string& line, int* out) {
    int cnt = 0;
    size_t i = 0;
    while (i < line.size()) {
        while (i < line.size() && (line[i] == ' ' || line[i] == '\\t' || line[i] == '\\r')) i++;
        if (i >= line.size()) break;
        int sign = 1;
        if (line[i] == '-') { sign = -1; i++; }
        long long v = 0;
        bool any = false;
        while (i < line.size() && line[i] >= '0' && line[i] <= '9') {
            v = v * 10 + (line[i] - '0');
            i++;
            any = true;
        }
        if (any) out[cnt++] = (int)(sign * v);
    }
    return cnt;
}

static int read_token_line(int* out) {
    std::string line;
    std::getline(std::cin, line);
    return parse_line(line, out);
}

static void skip_rest_of_line() {
    std::string line;
    std::getline(std::cin, line);
}

TNode* build_tree(int* vals, int nv) {
    if (nv <= 0 || vals[0] == -1) return nullptr;
    TNode* root = new TNode(vals[0]);
    static TNode* bq[20010];
    int head = 0, tail = 0;
    bq[tail++] = root;
    int i = 1;
    while (head < tail && i < nv) {
        TNode* cur = bq[head++];
        if (i < nv) {
            if (vals[i] != -1) {
                TNode* c = new TNode(vals[i]);
                cur->left = c;
                bq[tail++] = c;
            }
            i++;
        }
        if (i < nv) {
            if (vals[i] != -1) {
                TNode* c = new TNode(vals[i]);
                cur->right = c;
                bq[tail++] = c;
            }
            i++;
        }
    }
    return root;
}`;

const PROLOG = `int main() {
    long long declared;
    std::cin >> declared;
    skip_rest_of_line();
    static int vals[20005];
    int nv = read_token_line(vals);
    TNode* root = build_tree(vals, nv);
`;

const EPILOG = `    return 0;
}`;

const mainSimple = (fn) => PROLOG + `    std::cout << ${fn}(root) << std::endl;\n` + EPILOG;

const mainWithTarget = (fn, varName) =>
  PROLOG +
  `    int ${varName};
    std::cin >> ${varName};
    std::cout << ${fn}(root, ${varName}) << std::endl;
` + EPILOG;

const mainTraversal = (fn) =>
  PROLOG +
  `    std::vector<int> out;
    ${fn}(root, out);
    for (size_t i = 0; i < out.size(); i++) {
        if (i) std::cout << ' ';
        std::cout << out[i];
    }
    std::cout << std::endl;
` + EPILOG;

const mainIdentical = `int main() {
    long long declaredA;
    std::cin >> declaredA;
    skip_rest_of_line();
    static int va[20005];
    int na = read_token_line(va);
    long long declaredB;
    std::cin >> declaredB;
    skip_rest_of_line();
    static int vb[20005];
    int nb = read_token_line(vb);
    TNode* a = build_tree(va, na);
    TNode* b = build_tree(vb, nb);
    std::cout << is_identical(a, b) << std::endl;
    return 0;
}`;

const mainMaxGuarded = PROLOG + `    if (root == nullptr) {
        std::cout << 0 << std::endl;
        return 0;
    }
    std::cout << tree_max(root) << std::endl;
` + EPILOG;

const config = {
  "Level-Order Fill": { includes: ["iostream", "string", "vector", "queue"], main: mainTraversal("level_order") },
  "Symmetric Tree Check": { includes: ["iostream", "string"], main: mainSimple("is_symmetric") },
  "Identical Trees Check": { includes: ["iostream", "string"], main: mainIdentical },
  "Diameter of the Binary Tree": { includes: ["iostream", "string"], main: mainSimple("diameter") },
  "Preorder Fill": { includes: ["iostream", "string", "vector"], main: mainTraversal("preorder") },
  "Inorder Fill": { includes: ["iostream", "string", "vector"], main: mainTraversal("inorder") },
  "Postorder Fill": { includes: ["iostream", "string", "vector"], main: mainTraversal("postorder") },
  "Sum of Left Leaves": { includes: ["iostream", "string"], main: mainSimple("left_leaf_sum") },
  "Depth of a Target Node": { includes: ["iostream", "string"], main: mainWithTarget("depth_of", "target") },
  "Count Nodes at Level k": { includes: ["iostream", "string"], main: mainWithTarget("count_at_level", "k") },
  "Children Sum Property Check": { includes: ["iostream", "string"], main: mainSimple("children_sum_ok") },
  "Height-Balanced Check": { includes: ["iostream", "string"], main: mainSimple("is_balanced") },
  "Managers With Two Reports": { includes: ["iostream", "string"], main: mainSimple("full_node_count") },
  "Count the Tree Nodes": { includes: ["iostream", "string"], main: mainSimple("node_count") },
  "Height of the Binary Tree": { includes: ["iostream", "string"], main: mainSimple("tree_height") },
  "Count the Leaf Nodes": { includes: ["iostream", "string"], main: mainSimple("leaf_count") },
  "Payroll Total in the Org Chart": { includes: ["iostream", "string"], main: mainSimple("tree_sum") },
  "Tallest Value in the Tree": { includes: ["iostream", "string"], main: mainMaxGuarded },
  "Find the Manager in the Org Chart": { includes: ["iostream", "string"], main: mainWithTarget("tree_contains", "target") },
  "Managers With a Single Report": { includes: ["iostream", "string"], main: mainSimple("single_child_count") },
};

if (Object.keys(config).length !== data.questions.length) {
  console.error(`config count ${Object.keys(config).length} != questions ${data.questions.length}`);
  process.exit(1);
}

for (const q of data.questions) {
  const c = config[q.title];
  if (!c) {
    console.error("MISSING config for:", q.title);
    process.exit(1);
  }
  const incs = c.includes.map((h) => `#include <${h}>`).join("\n");
  let body = q.sourcecode.replace(/\bNULL\b/g, "nullptr");
  if (!body.endsWith("\n")) body += "\n";
  q.sourcecode = `${incs}\n\n${SCAFFOLD}\n\n${body}\n${c.main}`;
}

writeFileSync(DST, JSON.stringify(data, null, 2));
console.log(`day-14.code.json written: ${data.questions.length} programs`);
