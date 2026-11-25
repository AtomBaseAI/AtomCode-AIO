/**
 * Day 11 (Stacks) — complete standalone programs.
 * Blacklisted substrings honored: sort( and reverse( never appear in code.
 * Whitelisted tokens (stack, pop_back, push_back) are used where listed.
 */
import { readFileSync, writeFileSync } from "node:fs";

const SRC = "/home/z/tmp/dsa-export/dsa-cpp/day-11.code.json";
const OUT = "/home/z/my-project/scripts/dsa-cpp/data/day-11.code.json";

const programs = [
  /* Q1 Pop Order of a Stack */
  `#include <iostream>
#include <vector>
#include <stack>

std::vector<int> pop_order(const std::vector<int> &items) {
    std::stack<int> st;
    for (int x : items) st.push(x);
    std::vector<int> out;
    while (!st.empty()) {
        out.push_back(st.top());
        st.pop();
    }
    return out;
}

static void print_vec(const std::vector<int> &v) {
    for (size_t i = 0; i < v.size(); i++) {
        if (i) std::cout << ' ';
        std::cout << v[i];
    }
    std::cout << std::endl;
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> items(n);
    for (int &x : items) std::cin >> x;
    print_vec(pop_order(items));
    return 0;
}
`,
  /* Q2 Top of the Stack */
  `#include <iostream>
#include <vector>

int stack_top(const std::vector<int> &st) {
    return st.back();
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> st(n);
    for (int &x : st) std::cin >> x;
    std::cout << stack_top(st) << std::endl;
    return 0;
}
`,
  /* Q3 Pop One Element */
  `#include <iostream>
#include <vector>

std::vector<int> stack_pop(std::vector<int> st) {
    st.pop_back();
    return st;
}

static void print_vec(const std::vector<int> &v) {
    for (size_t i = 0; i < v.size(); i++) {
        if (i) std::cout << ' ';
        std::cout << v[i];
    }
    std::cout << std::endl;
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> st(n);
    for (int &x : st) std::cin >> x;
    print_vec(stack_pop(st));
    return 0;
}
`,
  /* Q4 Push One Element */
  `#include <iostream>
#include <vector>

std::vector<int> stack_push(std::vector<int> st, int v) {
    st.push_back(v);
    return st;
}

static void print_vec(const std::vector<int> &v) {
    for (size_t i = 0; i < v.size(); i++) {
        if (i) std::cout << ' ';
        std::cout << v[i];
    }
    std::cout << std::endl;
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> st(n);
    for (int &x : st) std::cin >> x;
    int v;
    std::cin >> v;
    print_vec(stack_push(st, v));
    return 0;
}
`,
  /* Q5 Reverse a String With a Stack */
  `#include <iostream>
#include <string>
#include <stack>

std::string reverse_string(const std::string &s) {
    std::stack<char> st;
    for (char c : s) st.push(c);
    std::string out;
    while (!st.empty()) {
        out += st.top();
        st.pop();
    }
    return out;
}

int main() {
    std::string s;
    std::cin >> s;
    std::cout << reverse_string(s) << std::endl;
    return 0;
}
`,
  /* Q6 Match Simple Parentheses */
  `#include <iostream>
#include <string>
#include <stack>

bool is_balanced_simple(const std::string &s) {
    std::stack<char> st;
    for (char c : s) {
        if (c == '(') {
            st.push(c);
        } else {
            if (st.empty()) return false;
            st.pop();
        }
    }
    return st.empty();
}

int main() {
    std::string s;
    std::cin >> s;
    std::cout << (is_balanced_simple(s) ? 1 : 0) << std::endl;
    return 0;
}
`,
  /* Q7 Browser Back Button */
  `#include <iostream>
#include <string>
#include <vector>

std::string back_state(const std::vector<std::string> &history, int k) {
    return history[history.size() - 1 - k];
}

int main() {
    int n;
    std::cin >> n;
    std::vector<std::string> history(n);
    for (std::string &p : history) std::cin >> p;
    int k;
    std::cin >> k;
    std::cout << back_state(history, k) << std::endl;
    return 0;
}
`,
  /* Q8 Undo the Last Moves */
  `#include <iostream>
#include <vector>

std::vector<int> undo_moves(const std::vector<int> &moves, int m) {
    std::vector<int> out;
    for (size_t i = 0; i + m < moves.size(); i++) out.push_back(moves[i]);
    return out;
}

static void print_vec(const std::vector<int> &v) {
    for (size_t i = 0; i < v.size(); i++) {
        if (i) std::cout << ' ';
        std::cout << v[i];
    }
    std::cout << std::endl;
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> moves(n);
    for (int &x : moves) std::cin >> x;
    int m;
    std::cin >> m;
    print_vec(undo_moves(moves, m));
    return 0;
}
`,
  /* Q9 Balanced Code Snippet */
  `#include <iostream>
#include <string>
#include <stack>

bool is_balanced(const std::string &s) {
    std::stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') {
            st.push(c);
        } else {
            if (st.empty()) return false;
            char t = st.top();
            st.pop();
            if (c == ')' && t != '(') return false;
            if (c == ']' && t != '[') return false;
            if (c == '}' && t != '{') return false;
        }
    }
    return st.empty();
}

int main() {
    std::string s;
    std::cin >> s;
    std::cout << (is_balanced(s) ? 1 : 0) << std::endl;
    return 0;
}
`,
  /* Q10 Depth of Nested Brackets */
  `#include <iostream>
#include <string>
#include <stack>

int max_depth(const std::string &s) {
    std::stack<char> st;
    int best = 0;
    for (char c : s) {
        if (c == '(') {
            st.push(c);
            if ((int)st.size() > best) best = (int)st.size();
        } else {
            st.pop();
        }
    }
    return best;
}

int main() {
    std::string s;
    std::cin >> s;
    std::cout << max_depth(s) << std::endl;
    return 0;
}
`,
  /* Q11 Next Greater Element — whitelist "stack" */
  `#include <iostream>
#include <vector>
#include <stack>

std::vector<int> next_greater(const std::vector<int> &a) {
    int n = (int)a.size();
    std::vector<int> ans(n, -1);
    std::stack<int> st;
    for (int i = n - 1; i >= 0; i--) {
        while (!st.empty() && st.top() <= a[i]) st.pop();
        if (!st.empty()) ans[i] = st.top();
        st.push(a[i]);
    }
    return ans;
}

static void print_vec(const std::vector<int> &v) {
    for (size_t i = 0; i < v.size(); i++) {
        if (i) std::cout << ' ';
        std::cout << v[i];
    }
    std::cout << std::endl;
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> a(n);
    for (int &x : a) std::cin >> x;
    print_vec(next_greater(a));
    return 0;
}
`,
  /* Q12 Valid Push and Pop Operations — whitelist "stack, pop_back" */
  `#include <iostream>
#include <vector>

int valid_ops(const std::vector<int> &ops) {
    std::vector<int> stack;
    for (int op : ops) {
        if (op > 0) {
            stack.push_back(op);
        } else {
            if (stack.empty()) return 0;
            stack.pop_back();
        }
    }
    return 1;
}

int main() {
    int m;
    std::cin >> m;
    std::vector<int> ops(m);
    for (int &x : ops) std::cin >> x;
    std::cout << valid_ops(ops) << std::endl;
    return 0;
}
`,
  /* Q13 Min Stack Log — whitelist "stack" */
  `#include <iostream>
#include <vector>
#include <stack>

std::vector<long long> min_stack_log(const std::vector<long long> &flat) {
    std::stack<long long> vals;
    std::stack<long long> mins;
    std::vector<long long> out;
    for (size_t i = 0; i + 1 < flat.size(); i += 2) {
        long long op = flat[i], v = flat[i + 1];
        if (op == 1) {
            vals.push(v);
            mins.push(mins.empty() ? v : (mins.top() < v ? mins.top() : v));
        } else if (op == 2) {
            vals.pop();
            mins.pop();
        } else {
            out.push_back(mins.top());
        }
    }
    return out;
}

static void print_vecll(const std::vector<long long> &v) {
    for (size_t i = 0; i < v.size(); i++) {
        if (i) std::cout << ' ';
        std::cout << v[i];
    }
    std::cout << std::endl;
}

int main() {
    int m;
    std::cin >> m;
    std::vector<long long> flat;
    flat.reserve(2 * m);
    for (int i = 0; i < m; i++) {
        long long op, v;
        std::cin >> op >> v;
        flat.push_back(op);
        flat.push_back(v);
    }
    print_vecll(min_stack_log(flat));
    return 0;
}
`,
  /* Q14 Sort a Stack With a Helper Stack — whitelist "stack" */
  `#include <iostream>
#include <vector>
#include <stack>

std::vector<int> sort_stack(std::vector<int> st) {
    std::stack<int> input;
    for (int x : st) input.push(x);
    std::stack<int> aux;
    while (!input.empty()) {
        int temp = input.top();
        input.pop();
        while (!aux.empty() && aux.top() < temp) {
            input.push(aux.top());
            aux.pop();
        }
        aux.push(temp);
    }
    std::vector<int> out;
    while (!aux.empty()) {
        out.push_back(aux.top());
        aux.pop();
    }
    return out;
}

static void print_vec(const std::vector<int> &v) {
    for (size_t i = 0; i < v.size(); i++) {
        if (i) std::cout << ' ';
        std::cout << v[i];
    }
    std::cout << std::endl;
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> st(n);
    for (int &x : st) std::cin >> x;
    print_vec(sort_stack(st));
    return 0;
}
`,
  /* Q15 Reverse a String Using Stack Operations — whitelist "push_back, pop_back" */
  `#include <iostream>
#include <string>

std::string reverse_via_stack(const std::string &s) {
    std::string work = s;
    std::string out;
    while (!work.empty()) {
        out.push_back(work.back());
        work.pop_back();
    }
    return out;
}

int main() {
    std::string s;
    std::cin >> s;
    std::cout << reverse_via_stack(s) << std::endl;
    return 0;
}
`,
  /* Q16 Minimum Bracket Removals — whitelist "stack" */
  `#include <iostream>
#include <string>
#include <stack>

int min_removals(const std::string &s) {
    std::stack<char> st;
    int removals = 0;
    for (char c : s) {
        if (c == '(') {
            st.push(c);
        } else if (st.empty()) {
            removals++;
        } else {
            st.pop();
        }
    }
    return removals + (int)st.size();
}

int main() {
    std::string s;
    std::cin >> s;
    std::cout << min_removals(s) << std::endl;
    return 0;
}
`,
  /* Q17 Postfix Expression Evaluation — whitelist "stack" */
  `#include <iostream>
#include <string>
#include <vector>
#include <stack>

static bool is_operator(const std::string &t) {
    return t.size() == 1 && (t == "+" || t == "-" || t == "*" || t == "/");
}

long long eval_postfix(const std::vector<std::string> &tokens) {
    std::stack<long long> st;
    for (const std::string &t : tokens) {
        if (is_operator(t)) {
            long long right = st.top(); st.pop();
            long long left = st.top(); st.pop();
            long long r = 0;
            if (t == "+") r = left + right;
            else if (t == "-") r = left - right;
            else if (t == "*") r = left * right;
            else r = left / right;
            st.push(r);
        } else {
            st.push(std::stoll(t));
        }
    }
    return st.top();
}

int main() {
    int n;
    std::cin >> n;
    std::vector<std::string> tokens(n);
    for (std::string &t : tokens) std::cin >> t;
    std::cout << eval_postfix(tokens) << std::endl;
    return 0;
}
`,
  /* Q18 Stock Span — whitelist "stack" */
  `#include <iostream>
#include <vector>
#include <stack>

std::vector<int> stock_span(const std::vector<int> &prices) {
    int n = (int)prices.size();
    std::vector<int> spans(n);
    std::stack<int> st;
    for (int i = 0; i < n; i++) {
        while (!st.empty() && prices[st.top()] <= prices[i]) st.pop();
        spans[i] = st.empty() ? (i + 1) : (i - st.top());
        st.push(i);
    }
    return spans;
}

static void print_vec(const std::vector<int> &v) {
    for (size_t i = 0; i < v.size(); i++) {
        if (i) std::cout << ' ';
        std::cout << v[i];
    }
    std::cout << std::endl;
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> prices(n);
    for (int &x : prices) std::cin >> x;
    print_vec(stock_span(prices));
    return 0;
}
`,
  /* Q19 Largest Rectangle in a Histogram — whitelist "stack" */
  `#include <iostream>
#include <vector>
#include <stack>

long long largest_rectangle(const std::vector<int> &heights) {
    int n = (int)heights.size();
    std::stack<int> st;
    long long best = 0;
    for (int i = 0; i <= n; i++) {
        int h = (i == n) ? 0 : heights[i];
        while (!st.empty() && heights[st.top()] >= h) {
            long long height = heights[st.top()];
            st.pop();
            long long left = st.empty() ? -1 : st.top();
            long long area = height * (i - left - 1);
            if (area > best) best = area;
        }
        st.push(i);
    }
    return best;
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> heights(n);
    for (int &x : heights) std::cin >> x;
    std::cout << largest_rectangle(heights) << std::endl;
    return 0;
}
`,
  /* Q20 Simplify a File Path — whitelist "stack" */
  `#include <iostream>
#include <string>
#include <stack>

std::string simplify_path(const std::string &path) {
    std::stack<std::string> st;
    std::string cur;
    for (size_t i = 0; i <= path.size(); i++) {
        char c = (i < path.size()) ? path[i] : '/';
        if (c == '/') {
            if (!cur.empty() && cur != ".") {
                if (cur == "..") {
                    if (!st.empty()) st.pop();
                } else {
                    st.push(cur);
                }
            }
            cur.clear();
        } else {
            cur += c;
        }
    }
    std::stack<std::string> rev;
    while (!st.empty()) {
        rev.push(st.top());
        st.pop();
    }
    std::string out;
    while (!rev.empty()) {
        out += '/';
        out += rev.top();
        rev.pop();
    }
    if (out.empty()) out = "/";
    return out;
}

int main() {
    std::string path;
    std::cin >> path;
    std::cout << simplify_path(path) << std::endl;
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
console.log(`day-11.code.json written: ${data.questions.length} programs`);
