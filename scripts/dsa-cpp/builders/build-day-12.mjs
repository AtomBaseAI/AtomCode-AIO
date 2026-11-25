/**
 * Day 12 (Queues and Deques) — complete standalone programs.
 * Blacklisted substrings honored: reverse( / rotate( / sort( / deque< /
 * recursion never appear in code.
 * Whitelisted tokens (queue, deque, front, %, push_back) used where listed.
 */
import { readFileSync, writeFileSync } from "node:fs";

const SRC = "/home/z/tmp/dsa-export/dsa-cpp/day-12.code.json";
const OUT = "/home/z/my-project/scripts/dsa-cpp/data/day-12.code.json";

const programs = [
  /* Q1 Front of the Queue */
  `#include <iostream>
#include <vector>

int queue_front(const std::vector<int> &q) {
    return q.front();
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> q(n);
    for (int &x : q) std::cin >> x;
    std::cout << queue_front(q) << std::endl;
    return 0;
}
`,
  /* Q2 Dequeue One Element */
  `#include <iostream>
#include <vector>

std::vector<int> dequeue(std::vector<int> q) {
    q.erase(q.begin());
    return q;
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
    std::vector<int> q(n);
    for (int &x : q) std::cin >> x;
    print_vec(dequeue(q));
    return 0;
}
`,
  /* Q3 Enqueue One Element */
  `#include <iostream>
#include <vector>

std::vector<int> enqueue(std::vector<int> q, int v) {
    q.push_back(v);
    return q;
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
    std::vector<int> q(n);
    for (int &x : q) std::cin >> x;
    int v;
    std::cin >> v;
    print_vec(enqueue(q, v));
    return 0;
}
`,
  /* Q4 Circular Queue Enqueue Code */
  `#include <iostream>

int enqueue_code(int capacity, int size, int v) {
    (void)v;
    return size < capacity ? 1 : 0;
}

int main() {
    int capacity, size, v;
    std::cin >> capacity >> size >> v;
    std::cout << enqueue_code(capacity, size, v) << std::endl;
    return 0;
}
`,
  /* Q5 Circular Queue Dequeue Code */
  `#include <iostream>

int dequeue_code(int capacity, int size) {
    (void)capacity;
    return size > 0 ? 1 : 0;
}

int main() {
    int capacity, size;
    std::cin >> capacity >> size;
    std::cout << dequeue_code(capacity, size) << std::endl;
    return 0;
}
`,
  /* Q6 Deque Ends Sum */
  `#include <iostream>
#include <vector>

long long ends_sum(const std::vector<int> &d) {
    return (long long)d.front() + (long long)d.back();
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> d(n);
    for (int &x : d) std::cin >> x;
    std::cout << ends_sum(d) << std::endl;
    return 0;
}
`,
  /* Q7 Printer Job Queue */
  `#include <iostream>
#include <vector>
#include <queue>

std::vector<int> serve_jobs(const std::vector<int> &jobs, int k) {
    std::queue<int> q;
    for (int x : jobs) q.push(x);
    for (int i = 0; i < k; i++) q.pop();
    std::vector<int> out;
    while (!q.empty()) {
        out.push_back(q.front());
        q.pop();
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
    std::vector<int> jobs(n);
    for (int &x : jobs) std::cin >> x;
    int k;
    std::cin >> k;
    print_vec(serve_jobs(jobs, k));
    return 0;
}
`,
  /* Q8 Ticket Counter Turn */
  `#include <iostream>
#include <vector>

int ticket_holder(const std::vector<int> &ids, int k) {
    return ids[k - 1];
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> ids(n);
    for (int &x : ids) std::cin >> x;
    int k;
    std::cin >> k;
    std::cout << ticket_holder(ids, k) << std::endl;
    return 0;
}
`,
  /* Q9 Browser Tabs Deque Move */
  `#include <iostream>
#include <vector>

std::vector<int> move_to_front(std::vector<int> tabs, int id) {
    std::vector<int> out;
    out.push_back(id);
    for (int x : tabs)
        if (x != id) out.push_back(x);
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
    std::vector<int> tabs(n);
    for (int &x : tabs) std::cin >> x;
    int id;
    std::cin >> id;
    print_vec(move_to_front(tabs, id));
    return 0;
}
`,
  /* Q10 First Window Sum */
  `#include <iostream>
#include <vector>

long long first_window_sum(const std::vector<int> &a, int k) {
    long long sum = 0;
    for (int i = 0; i < k; i++) sum += a[i];
    return sum;
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> a(n);
    for (int &x : a) std::cin >> x;
    int k;
    std::cin >> k;
    std::cout << first_window_sum(a, k) << std::endl;
    return 0;
}
`,
  /* Q11 Queue Reversal via a Stack — whitelist "stack" */
  `#include <iostream>
#include <vector>
#include <stack>

std::vector<int> reverse_queue(std::vector<int> q) {
    std::stack<int> st;
    for (int x : q) st.push(x);
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
    std::vector<int> q(n);
    for (int &x : q) std::cin >> x;
    print_vec(reverse_queue(q));
    return 0;
}
`,
  /* Q12 Generate Numbers From 5s and 6s — whitelist "queue" */
  `#include <iostream>
#include <vector>
#include <queue>

std::vector<long long> generate_56(int n) {
    std::queue<long long> q;
    q.push(5);
    q.push(6);
    std::vector<long long> out;
    while ((int)out.size() < n) {
        long long x = q.front();
        q.pop();
        out.push_back(x);
        q.push(x * 10 + 5);
        q.push(x * 10 + 6);
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
    int n;
    std::cin >> n;
    print_vecll(generate_56(n));
    return 0;
}
`,
  /* Q13 Circular Queue Operation Log — ring buffer with % (deque< banned) */
  `#include <iostream>
#include <vector>

std::vector<long long> circular_queue_log(const std::vector<long long> &flat, int capacity) {
    std::vector<long long> ring(capacity);
    int head = 0, size = 0;
    std::vector<long long> out;
    for (size_t i = 0; i + 1 < flat.size(); i += 2) {
        long long op = flat[i], v = flat[i + 1];
        if (op == 1) {
            if (size < capacity) {
                ring[(head + size) % capacity] = v;
                size++;
                out.push_back(1);
            } else {
                out.push_back(0);
            }
        } else {
            if (size == 0) {
                out.push_back(-1);
            } else {
                out.push_back(ring[head]);
                head = (head + 1) % capacity;
                size--;
            }
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
    int capacity;
    std::cin >> capacity;
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
    print_vecll(circular_queue_log(flat, capacity));
    return 0;
}
`,
  /* Q14 Rotate a Queue Left by K — whitelist "front" (rotate( banned) */
  `#include <iostream>
#include <vector>
#include <queue>

std::vector<int> rotate_queue(std::vector<int> q, int k) {
    std::queue<int> qu;
    for (int x : q) qu.push(x);
    for (int i = 0; i < k; i++) {
        qu.push(qu.front());
        qu.pop();
    }
    std::vector<int> out;
    while (!qu.empty()) {
        out.push_back(qu.front());
        qu.pop();
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
    std::vector<int> q(n);
    for (int &x : q) std::cin >> x;
    int k;
    std::cin >> k;
    print_vec(rotate_queue(q, k));
    return 0;
}
`,
  /* Q15 Palindrome Check With a Deque — whitelist "deque" */
  `#include <iostream>
#include <vector>
#include <deque>

int is_palindrome_deque(const std::vector<int> &d) {
    std::deque<int> dq(d.begin(), d.end());
    while (dq.size() > 1) {
        if (dq.front() != dq.back()) return 0;
        dq.pop_front();
        dq.pop_back();
    }
    return 1;
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> d(n);
    for (int &x : d) std::cin >> x;
    std::cout << is_palindrome_deque(d) << std::endl;
    return 0;
}
`,
  /* Q16 Sum of Each Sliding Window — whitelist "push_back" */
  `#include <iostream>
#include <vector>

std::vector<long long> window_sums(const std::vector<int> &a, int k) {
    std::vector<long long> out;
    long long sum = 0;
    for (int i = 0; i < (int)a.size(); i++) {
        sum += a[i];
        if (i >= k) sum -= a[i - k];
        if (i >= k - 1) out.push_back(sum);
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
    int n;
    std::cin >> n;
    std::vector<int> a(n);
    for (int &x : a) std::cin >> x;
    int k;
    std::cin >> k;
    print_vecll(window_sums(a, k));
    return 0;
}
`,
  /* Q17 Sliding Window Maximum — whitelist "deque" */
  `#include <iostream>
#include <vector>
#include <deque>

std::vector<int> window_max(const std::vector<int> &a, int k) {
    std::deque<int> dq;
    std::vector<int> out;
    for (int i = 0; i < (int)a.size(); i++) {
        while (!dq.empty() && a[dq.back()] <= a[i]) dq.pop_back();
        dq.push_back(i);
        if (dq.front() <= i - k) dq.pop_front();
        if (i >= k - 1) out.push_back(a[dq.front()]);
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
    std::vector<int> a(n);
    for (int &x : a) std::cin >> x;
    int k;
    std::cin >> k;
    print_vec(window_max(a, k));
    return 0;
}
`,
  /* Q18 First Non-Repeating Character in a Stream — whitelist "queue" */
  `#include <iostream>
#include <string>
#include <queue>

std::string first_unique_stream(const std::string &s) {
    int freq[26] = {0};
    std::queue<char> q;
    std::string out;
    for (char c : s) {
        freq[c - 'a']++;
        q.push(c);
        while (!q.empty() && freq[q.front() - 'a'] > 1) q.pop();
        out += q.empty() ? '-' : q.front();
    }
    return out;
}

int main() {
    std::string s;
    std::cin >> s;
    std::cout << first_unique_stream(s) << std::endl;
    return 0;
}
`,
  /* Q19 Deque Minimum of Each Window — whitelist "deque" */
  `#include <iostream>
#include <vector>
#include <deque>

std::vector<int> window_min(const std::vector<int> &a, int k) {
    std::deque<int> dq;
    std::vector<int> out;
    for (int i = 0; i < (int)a.size(); i++) {
        while (!dq.empty() && a[dq.back()] >= a[i]) dq.pop_back();
        dq.push_back(i);
        if (dq.front() <= i - k) dq.pop_front();
        if (i >= k - 1) out.push_back(a[dq.front()]);
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
    std::vector<int> a(n);
    for (int &x : a) std::cin >> x;
    int k;
    std::cin >> k;
    print_vec(window_min(a, k));
    return 0;
}
`,
  /* Q20 Hot Potato Elimination — whitelist "queue", iterative (no recursion) */
  `#include <iostream>
#include <vector>
#include <queue>

std::vector<int> elimination_order(int n, int k) {
    std::queue<int> q;
    for (int p = 1; p <= n; p++) q.push(p);
    std::vector<int> out;
    while (!q.empty()) {
        for (int hop = 0; hop < k - 1; hop++) {
            q.push(q.front());
            q.pop();
        }
        out.push_back(q.front());
        q.pop();
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
    int n, k;
    std::cin >> n >> k;
    print_vec(elimination_order(n, k));
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
console.log(`day-12.code.json written: ${data.questions.length} programs`);
