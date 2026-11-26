/**
 * Day 03 (Arrays and Vectors) — complete standalone programs.
 */
import { readFileSync, writeFileSync } from "node:fs";

const SRC = "/home/z/tmp/dsa-export/dsa-cpp/day-03.code.json";
const OUT = "/home/z/my-project/scripts/dsa-cpp/data/day-03.code.json";

const programs = [
  /* Q1 Priority Queue Jump */
  `#include <iostream>
#include <vector>

std::vector<int> admit_at(std::vector<int> q, int pos, int token) {
    q.insert(q.begin() + pos, token);
    return q;
}

void print_vec(const std::vector<int> &v) {
    for (size_t i = 0; i < v.size(); i++) {
        if (i) std::cout << " ";
        std::cout << v[i];
    }
    std::cout << std::endl;
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> v(n);
    for (int &x : v) std::cin >> x;
    int pos, token;
    std::cin >> pos >> token;
    print_vec(admit_at(v, pos, token));
    return 0;
}
`,
  /* Q2 Discount Prices In Place — blacklist "std::transform" */
  `#include <iostream>
#include <vector>

void discount_above(std::vector<int> &prices, int threshold, int cut) {
    for (int &p : prices)
        if (p > threshold) p -= cut;
}

void print_vec(const std::vector<int> &v) {
    for (size_t i = 0; i < v.size(); i++) {
        if (i) std::cout << " ";
        std::cout << v[i];
    }
    std::cout << std::endl;
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> prices(n);
    for (int &x : prices) std::cin >> x;
    int threshold, cut;
    std::cin >> threshold >> cut;
    discount_above(prices, threshold, cut);
    print_vec(prices);
    return 0;
}
`,
  /* Q3 Reverse a Vector */
  `#include <iostream>
#include <vector>

std::vector<int> reverse_vec(const std::vector<int> &v) {
    std::vector<int> out;
    for (int i = (int)v.size() - 1; i >= 0; i--) out.push_back(v[i]);
    return out;
}

void print_vec(const std::vector<int> &v) {
    for (size_t i = 0; i < v.size(); i++) {
        if (i) std::cout << " ";
        std::cout << v[i];
    }
    std::cout << std::endl;
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> v(n);
    for (int &x : v) std::cin >> x;
    print_vec(reverse_vec(v));
    return 0;
}
`,
  /* Q4 Min and Max */
  `#include <iostream>
#include <vector>

void min_max(const std::vector<int> &v, int &mn, int &mx) {
    mn = mx = v[0];
    for (int x : v) {
        if (x < mn) mn = x;
        if (x > mx) mx = x;
    }
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> v(n);
    for (int &x : v) std::cin >> x;
    int mn = 0, mx = 0;
    min_max(v, mn, mx);
    std::cout << mn << " " << mx << std::endl;
    return 0;
}
`,
  /* Q5 Second Largest Element */
  `#include <iostream>
#include <vector>

int second_largest(const std::vector<int> &v) {
    int best = -2000000000, second = -2000000000;
    for (int x : v) {
        if (x > best) {
            second = best;
            best = x;
        } else if (x > second && x != best) {
            second = x;
        }
    }
    return second;
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> v(n);
    for (int &x : v) std::cin >> x;
    std::cout << second_largest(v) << std::endl;
    return 0;
}
`,
  /* Q6 Subarray Range Sum */
  `#include <iostream>
#include <vector>

long long range_sum(const std::vector<int> &v, int l, int r) {
    long long total = 0;
    for (int i = l; i <= r; i++) total += v[i];
    return total;
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> v(n);
    for (int &x : v) std::cin >> x;
    int l, r;
    std::cin >> l >> r;
    std::cout << range_sum(v, l, r) << std::endl;
    return 0;
}
`,
  /* Q7 Insert at Index */
  `#include <iostream>
#include <vector>

std::vector<int> insert_at(std::vector<int> v, int pos, int val) {
    v.insert(v.begin() + pos, val);
    return v;
}

void print_vec(const std::vector<int> &v) {
    for (size_t i = 0; i < v.size(); i++) {
        if (i) std::cout << " ";
        std::cout << v[i];
    }
    std::cout << std::endl;
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> v(n);
    for (int &x : v) std::cin >> x;
    int pos, val;
    std::cin >> pos >> val;
    print_vec(insert_at(v, pos, val));
    return 0;
}
`,
  /* Q8 Delete at Index */
  `#include <iostream>
#include <vector>

std::vector<int> delete_at(std::vector<int> v, int pos) {
    v.erase(v.begin() + pos);
    return v;
}

void print_vec(const std::vector<int> &v) {
    for (size_t i = 0; i < v.size(); i++) {
        if (i) std::cout << " ";
        std::cout << v[i];
    }
    std::cout << std::endl;
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> v(n);
    for (int &x : v) std::cin >> x;
    int pos;
    std::cin >> pos;
    print_vec(delete_at(v, pos));
    return 0;
}
`,
  /* Q9 Reversed Sensor Log */
  `#include <iostream>
#include <vector>

std::vector<int> reverse_log(const std::vector<int> &v) {
    std::vector<int> out;
    for (int i = (int)v.size() - 1; i >= 0; i--) out.push_back(v[i]);
    return out;
}

void print_vec(const std::vector<int> &v) {
    for (size_t i = 0; i < v.size(); i++) {
        if (i) std::cout << " ";
        std::cout << v[i];
    }
    std::cout << std::endl;
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> v(n);
    for (int &x : v) std::cin >> x;
    print_vec(reverse_log(v));
    return 0;
}
`,
  /* Q10 Hottest and Coldest Day */
  `#include <iostream>
#include <vector>

void temp_extremes(const std::vector<int> &t, int &hotDay, int &coldDay) {
    hotDay = coldDay = 0;
    for (int i = 1; i < (int)t.size(); i++) {
        if (t[i] > t[hotDay]) hotDay = i;
        if (t[i] < t[coldDay]) coldDay = i;
    }
    hotDay++;
    coldDay++;
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> t(n);
    for (int &x : t) std::cin >> x;
    int hotDay = 0, coldDay = 0;
    temp_extremes(t, hotDay, coldDay);
    std::cout << hotDay << " " << coldDay << std::endl;
    return 0;
}
`,
  /* Q11 Serve the Next Customer */
  `#include <iostream>
#include <vector>

std::vector<int> serve_at(std::vector<int> q, int pos) {
    q.erase(q.begin() + pos);
    return q;
}

void print_vec(const std::vector<int> &v) {
    for (size_t i = 0; i < v.size(); i++) {
        if (i) std::cout << " ";
        std::cout << v[i];
    }
    std::cout << std::endl;
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> v(n);
    for (int &x : v) std::cin >> x;
    int pos;
    std::cin >> pos;
    print_vec(serve_at(v, pos));
    return 0;
}
`,
  /* Q12 Rotate the Roster — blacklist "std::rotate" */
  `#include <iostream>
#include <vector>

std::vector<int> rotate_k(const std::vector<int> &v, int k) {
    int n = (int)v.size();
    std::vector<int> out;
    out.reserve(n);
    for (int i = 0; i < n; i++)
        out.push_back(v[(i + (long long)k) % n]);
    return out;
}

void print_vec(const std::vector<int> &v) {
    for (size_t i = 0; i < v.size(); i++) {
        if (i) std::cout << " ";
        std::cout << v[i];
    }
    std::cout << std::endl;
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> v(n);
    for (int &x : v) std::cin >> x;
    int k;
    std::cin >> k;
    print_vec(rotate_k(v, k));
    return 0;
}
`,
  /* Q13 Deduplicate the Sorted Ledger — blacklist "std::unique,unique(" */
  `#include <iostream>
#include <vector>

int dedupe_sorted(std::vector<int> &v) {
    if (v.empty()) return 0;
    int w = 1;
    for (int i = 1; i < (int)v.size(); i++)
        if (v[i] != v[w - 1]) v[w++] = v[i];
    return w;
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> v(n);
    for (int &x : v) std::cin >> x;
    int k = dedupe_sorted(v);
    std::cout << k << std::endl;
    for (int i = 0; i < k; i++) {
        if (i) std::cout << " ";
        std::cout << v[i];
    }
    std::cout << std::endl;
    return 0;
}
`,
  /* Q14 Count Readings in Range — blacklist "count_if" */
  `#include <iostream>
#include <vector>

int count_in_range(const std::vector<int> &v, int lo, int hi) {
    int count = 0;
    for (int x : v)
        if (x >= lo && x <= hi) count++;
    return count;
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> v(n);
    for (int &x : v) std::cin >> x;
    int lo, hi;
    std::cin >> lo >> hi;
    std::cout << count_in_range(v, lo, hi) << std::endl;
    return 0;
}
`,
  /* Q15 Trim the Catalog — blacklist "resize" */
  `#include <iostream>
#include <vector>

std::vector<int> trim_to(std::vector<int> v, int k) {
    std::vector<int> out;
    for (int i = 0; i < k && i < (int)v.size(); i++) out.push_back(v[i]);
    return out;
}

void print_vec(const std::vector<int> &v) {
    for (size_t i = 0; i < v.size(); i++) {
        if (i) std::cout << " ";
        std::cout << v[i];
    }
    std::cout << std::endl;
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> v(n);
    for (int &x : v) std::cin >> x;
    int k;
    std::cin >> k;
    print_vec(trim_to(v, k));
    return 0;
}
`,
  /* Q16 Second Largest with Duplicates — blacklist "std::sort,sort(" */
  `#include <iostream>
#include <vector>

int second_largest_dup(const std::vector<int> &v) {
    int best = -2000000000, second = -2000000000;
    for (int x : v) {
        if (x > best) {
            second = best;
            best = x;
        } else if (x < best && x > second) {
            second = x;
        }
    }
    if (second == -2000000000) return -1;
    return second;
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> v(n);
    for (int &x : v) std::cin >> x;
    std::cout << second_largest_dup(v) << std::endl;
    return 0;
}
`,
  /* Q17 Vector Growth Model — blacklist "pow,log", whitelist "while" */
  `#include <iostream>
#include <vector>

void growth_model(long long k, long long &reallocs, long long &capacity) {
    capacity = 1;
    reallocs = 0;
    while (capacity <= k) {
        capacity *= 2;
        reallocs++;
    }
}

int main() {
    long long k;
    std::cin >> k;
    long long reallocs = 0, capacity = 0;
    growth_model(k, reallocs, capacity);
    std::cout << reallocs << " " << capacity << std::endl;
    return 0;
}
`,
  /* Q18 Purge Duplicate Sensor IDs — blacklist "std::set,set<,unordered_,sort(" */
  `#include <iostream>
#include <vector>

std::vector<int> purge_duplicates(const std::vector<int> &v) {
    std::vector<int> out;
    for (int x : v) {
        bool seen = false;
        for (int y : out)
            if (y == x) { seen = true; break; }
        if (!seen) out.push_back(x);
    }
    return out;
}

void print_vec(const std::vector<int> &v) {
    for (size_t i = 0; i < v.size(); i++) {
        if (i) std::cout << " ";
        std::cout << v[i];
    }
    std::cout << std::endl;
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> v(n);
    for (int &x : v) std::cin >> x;
    print_vec(purge_duplicates(v));
    return 0;
}
`,
  /* Q19 In-Place Rotation by Reversal — blacklist "std::rotate,rotate(" */
  `#include <iostream>
#include <vector>

void reverse_range(std::vector<int> &v, int l, int r) {
    while (l < r) {
        int t = v[l];
        v[l] = v[r];
        v[r] = t;
        l++;
        r--;
    }
}

void rotate_inplace(std::vector<int> &v, int k) {
    int n = (int)v.size();
    if (n == 0) return;
    k %= n;
    reverse_range(v, 0, k - 1);
    reverse_range(v, k, n - 1);
    reverse_range(v, 0, n - 1);
}

void print_vec(const std::vector<int> &v) {
    for (size_t i = 0; i < v.size(); i++) {
        if (i) std::cout << " ";
        std::cout << v[i];
    }
    std::cout << std::endl;
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> v(n);
    for (int &x : v) std::cin >> x;
    int k;
    std::cin >> k;
    rotate_inplace(v, k);
    print_vec(v);
    return 0;
}
`,
  /* Q20 Sliding Window Peak Load — blacklist "std::sort" */
  `#include <iostream>
#include <vector>

long long max_window_sum(const std::vector<int> &v, int w) {
    long long sum = 0;
    for (int i = 0; i < w; i++) sum += v[i];
    long long best = sum;
    for (int i = w; i < (int)v.size(); i++) {
        sum += v[i] - v[i - w];
        if (sum > best) best = sum;
    }
    return best;
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> v(n);
    for (int &x : v) std::cin >> x;
    int w;
    std::cin >> w;
    std::cout << max_window_sum(v, w) << std::endl;
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
console.log(`day-03.code.json written: ${data.questions.length} programs`);
