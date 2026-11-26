/**
 * Day 05 (Searching Algorithms) — complete standalone programs.
 * Blacklisted substrings honored: lower_bound / upper_bound / sqrt /
 * sort( / std::sort / min_element / max_element never appear in code.
 */
import { readFileSync, writeFileSync } from "node:fs";

const SRC = "/home/z/tmp/dsa-export/dsa-cpp/day-05.code.json";
const OUT = "/home/z/my-project/scripts/dsa-cpp/data/day-05.code.json";

const programs = [
  /* Q1 Linear Search Index */
  `#include <iostream>
#include <vector>

int linear_search(const std::vector<int> &v, int target) {
    for (int i = 0; i < (int)v.size(); i++)
        if (v[i] == target) return i;
    return -1;
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> v(n);
    for (int &x : v) std::cin >> x;
    int target;
    std::cin >> target;
    std::cout << linear_search(v, target) << std::endl;
    return 0;
}
`,
  /* Q2 Binary Search on Sorted Data */
  `#include <iostream>
#include <vector>

int binary_search_idx(const std::vector<int> &v, int target) {
    int lo = 0, hi = (int)v.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (v[mid] == target) return mid;
        if (v[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> v(n);
    for (int &x : v) std::cin >> x;
    int target;
    std::cin >> target;
    std::cout << binary_search_idx(v, target) << std::endl;
    return 0;
}
`,
  /* Q3 First Occurrence in Sorted Data */
  `#include <iostream>
#include <vector>

int first_occurrence(const std::vector<int> &v, int target) {
    int lo = 0, hi = (int)v.size() - 1, ans = -1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (v[mid] == target) { ans = mid; hi = mid - 1; }
        else if (v[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return ans;
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> v(n);
    for (int &x : v) std::cin >> x;
    int target;
    std::cin >> target;
    std::cout << first_occurrence(v, target) << std::endl;
    return 0;
}
`,
  /* Q4 Last Occurrence in Sorted Data */
  `#include <iostream>
#include <vector>

int last_occurrence(const std::vector<int> &v, int target) {
    int lo = 0, hi = (int)v.size() - 1, ans = -1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (v[mid] == target) { ans = mid; lo = mid + 1; }
        else if (v[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return ans;
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> v(n);
    for (int &x : v) std::cin >> x;
    int target;
    std::cin >> target;
    std::cout << last_occurrence(v, target) << std::endl;
    return 0;
}
`,
  /* Q5 Count Occurrences in Sorted Data */
  `#include <iostream>
#include <vector>

int count_occurrences(const std::vector<int> &v, int target) {
    int lo = 0, hi = (int)v.size() - 1, first = -1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (v[mid] == target) { first = mid; hi = mid - 1; }
        else if (v[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    if (first < 0) return 0;
    int l2 = 0, h2 = (int)v.size() - 1, last = -1;
    while (l2 <= h2) {
        int mid = l2 + (h2 - l2) / 2;
        if (v[mid] == target) { last = mid; l2 = mid + 1; }
        else if (v[mid] < target) l2 = mid + 1;
        else h2 = mid - 1;
    }
    return last - first + 1;
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> v(n);
    for (int &x : v) std::cin >> x;
    int target;
    std::cin >> target;
    std::cout << count_occurrences(v, target) << std::endl;
    return 0;
}
`,
  /* Q6 Is the Search Input Sorted */
  `#include <iostream>
#include <vector>

bool is_sorted_vec(const std::vector<int> &v) {
    for (int i = 1; i < (int)v.size(); i++)
        if (v[i - 1] > v[i]) return false;
    return true;
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> v(n);
    for (int &x : v) std::cin >> x;
    std::cout << is_sorted_vec(v) << std::endl;
    return 0;
}
`,
  /* Q7 First Defective Sensor Reading */
  `#include <iostream>
#include <vector>

int first_defective(const std::vector<int> &v) {
    for (int i = 0; i < (int)v.size(); i++)
        if (v[i] < 0) return i + 1;
    return -1;
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> v(n);
    for (int &x : v) std::cin >> x;
    std::cout << first_defective(v) << std::endl;
    return 0;
}
`,
  /* Q8 Employee ID Lookup */
  `#include <iostream>
#include <vector>

bool id_present(const std::vector<int> &v, int id) {
    int lo = 0, hi = (int)v.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (v[mid] == id) return true;
        if (v[mid] < id) lo = mid + 1;
        else hi = mid - 1;
    }
    return false;
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> v(n);
    for (int &x : v) std::cin >> x;
    int id;
    std::cin >> id;
    std::cout << (id_present(v, id) ? "Found" : "Not Found") << std::endl;
    return 0;
}
`,
  /* Q9 Count Failed Logins for a User */
  `#include <iostream>
#include <vector>

int count_logins(const std::vector<int> &v, int user) {
    int c = 0;
    for (int x : v)
        if (x == user) c++;
    return c;
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> v(n);
    for (int &x : v) std::cin >> x;
    int user;
    std::cin >> user;
    std::cout << count_logins(v, user) << std::endl;
    return 0;
}
`,
  /* Q10 Hottest Day Position */
  `#include <iostream>
#include <vector>

int hottest_day(const std::vector<int> &t) {
    int best = 0;
    for (int i = 1; i < (int)t.size(); i++)
        if (t[i] > t[best]) best = i;
    return best;
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> t(n);
    for (int &x : t) std::cin >> x;
    std::cout << hottest_day(t) << std::endl;
    return 0;
}
`,
  /* Q11 Manual Lower-Bound Index — blacklist "lower_bound" */
  `#include <iostream>
#include <vector>

int first_ge(const std::vector<int> &v, int target) {
    int lo = 0, hi = (int)v.size();
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (v[mid] >= target) hi = mid;
        else lo = mid + 1;
    }
    return lo;
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> v(n);
    for (int &x : v) std::cin >> x;
    int target;
    std::cin >> target;
    std::cout << first_ge(v, target) << std::endl;
    return 0;
}
`,
  /* Q12 Closest Element in Sorted Data — blacklist "lower_bound" */
  `#include <iostream>
#include <vector>

int closest_element(const std::vector<int> &v, int target) {
    int lo = 0, hi = (int)v.size() - 1;
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (v[mid] < target) lo = mid + 1;
        else hi = mid;
    }
    int best = v[lo];
    if (lo > 0) {
        long long dRight = v[lo] - target;
        if (dRight < 0) dRight = -dRight;
        long long dLeft = target - v[lo - 1];
        if (dLeft < 0) dLeft = -dLeft;
        if (dLeft <= dRight) best = v[lo - 1];
    }
    return best;
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> v(n);
    for (int &x : v) std::cin >> x;
    int target;
    std::cin >> target;
    std::cout << closest_element(v, target) << std::endl;
    return 0;
}
`,
  /* Q13 Manual Upper-Bound Index — blacklist "upper_bound" */
  `#include <iostream>
#include <vector>

int first_gt(const std::vector<int> &v, int target) {
    int lo = 0, hi = (int)v.size() - 1;
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (v[mid] > target) hi = mid;
        else lo = mid + 1;
    }
    if (v[lo] > target) return lo;
    return (int)v.size();
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> v(n);
    for (int &x : v) std::cin >> x;
    int target;
    std::cin >> target;
    std::cout << first_gt(v, target) << std::endl;
    return 0;
}
`,
  /* Q14 Integer Root by Binary Search — blacklist "sqrt" */
  `#include <iostream>
#include <vector>

long long floor_root(long long n) {
    long long lo = 1, hi = 1000000000;
    while (lo < hi) {
        long long mid = lo + (hi - lo + 1) / 2;
        if (mid * mid <= n) lo = mid;
        else hi = mid - 1;
    }
    return lo;
}

int main() {
    long long n;
    std::cin >> n;
    std::cout << floor_root(n) << std::endl;
    return 0;
}
`,
  /* Q15 First Faulty Machine in the Row — blacklist "std::sort,sort(" */
  `#include <iostream>
#include <vector>

int first_faulty(const std::vector<int> &v) {
    int lo = 0, hi = (int)v.size() - 1;
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (v[mid] == 1) hi = mid;
        else lo = mid + 1;
    }
    return v[lo] == 1 ? lo : -1;
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> v(n);
    for (int &x : v) std::cin >> x;
    std::cout << first_faulty(v) << std::endl;
    return 0;
}
`,
  /* Q16 Rotation Point of the Log — blacklist "std::sort,sort(,min_element" */
  `#include <iostream>
#include <vector>

int rotation_point(const std::vector<int> &v) {
    int lo = 0, hi = (int)v.size() - 1;
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (v[mid] > v[hi]) lo = mid + 1;
        else hi = mid;
    }
    return lo;
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> v(n);
    for (int &x : v) std::cin >> x;
    std::cout << rotation_point(v) << std::endl;
    return 0;
}
`,
  /* Q17 The Missing Version Number — blacklist "std::sort,sort(" */
  `#include <iostream>
#include <vector>

int missing_number(const std::vector<int> &v) {
    int lo = 0, hi = (int)v.size() - 1;
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (v[mid] == mid) lo = mid + 1;
        else hi = mid;
    }
    return v[lo] == lo ? lo + 1 : lo;
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> v(n);
    for (int &x : v) std::cin >> x;
    std::cout << missing_number(v) << std::endl;
    return 0;
}
`,
  /* Q18 Peak of the Bitonic Trace — blacklist "max_element" */
  `#include <iostream>
#include <vector>

int peak_index(const std::vector<int> &v) {
    int lo = 0, hi = (int)v.size() - 1;
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (v[mid] < v[mid + 1]) lo = mid + 1;
        else hi = mid;
    }
    return lo;
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> v(n);
    for (int &x : v) std::cin >> x;
    std::cout << peak_index(v) << std::endl;
    return 0;
}
`,
  /* Q19 Search the Rotated Ledger — blacklist "std::sort,sort(" */
  `#include <iostream>
#include <vector>

int rotated_search(const std::vector<int> &v, int target) {
    int lo = 0, hi = (int)v.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (v[mid] == target) return mid;
        if (v[lo] <= v[mid]) {
            if (target >= v[lo] && target < v[mid]) hi = mid - 1;
            else lo = mid + 1;
        } else {
            if (target > v[mid] && target <= v[hi]) lo = mid + 1;
            else hi = mid - 1;
        }
    }
    return -1;
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> v(n);
    for (int &x : v) std::cin >> x;
    int target;
    std::cin >> target;
    std::cout << rotated_search(v, target) << std::endl;
    return 0;
}
`,
  /* Q20 Minimum Ship Capacity — blacklist "std::sort,sort(" */
  `#include <iostream>
#include <vector>

long long days_needed(const std::vector<int> &w, long long cap) {
    long long days = 1, load = 0;
    for (int x : w) {
        if (load + x > cap) {
            days++;
            load = x;
        } else {
            load += x;
        }
    }
    return days;
}

long long min_capacity(const std::vector<int> &w, int days) {
    long long lo = 0, hi = 0;
    for (int x : w) {
        if (x > lo) lo = x;
        hi += x;
    }
    while (lo < hi) {
        long long mid = lo + (hi - lo) / 2;
        if (days_needed(w, mid) <= days) hi = mid;
        else lo = mid + 1;
    }
    return lo;
}

int main() {
    int n;
    std::cin >> n;
    std::vector<int> w(n);
    for (int &x : w) std::cin >> x;
    int days;
    std::cin >> days;
    std::cout << min_capacity(w, days) << std::endl;
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
console.log(`day-05.code.json written: ${data.questions.length} programs`);
