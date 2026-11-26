// Day 05 — Searching: complete standalone C programs.
import { readFileSync, writeFileSync } from "node:fs";

const SRC = [
// q00 Linear Search Index
String.raw`#include <stdio.h>

int linear_search(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[10000];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    int target;
    scanf("%d", &target);
    printf("%d\n", linear_search(arr, n, target));
    return 0;
}`,
// q01 Binary Search Index
String.raw`#include <stdio.h>

int binary_search(int arr[], int n, int target) {
    int lo = 0, hi = n - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[10000];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    int target;
    scanf("%d", &target);
    printf("%d\n", binary_search(arr, n, target));
    return 0;
}`,
// q02 Count Equal Seats
String.raw`#include <stdio.h>

int count_equal(int arr[], int n, int target) {
    int count = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) count++;
    }
    return count;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[10000];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    int target;
    scanf("%d", &target);
    printf("%d\n", count_equal(arr, n, target));
    return 0;
}`,
// q03 Minimum Element Index
String.raw`#include <stdio.h>

int min_index(int arr[], int n) {
    int best = 0;
    for (int i = 1; i < n; i++) {
        if (arr[i] < arr[best]) best = i;
    }
    return best;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[10000];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("%d\n", min_index(arr, n));
    return 0;
}`,
// q04 Missing Token Number
String.raw`#include <stdio.h>

int missing_token(int arr[], int m) {
    long long expected = (long long)(m + 1) * (m + 2) / 2;
    long long sum = 0;
    for (int i = 0; i < m; i++) sum += arr[i];
    return (int)(expected - sum);
}

int main(void) {
    int m;
    if (scanf("%d", &m) != 1) return 0;
    int arr[10000];
    for (int i = 0; i < m; i++) scanf("%d", &arr[i]);
    printf("%d\n", missing_token(arr, m));
    return 0;
}`,
// q05 Closest Temperature Reading
String.raw`#include <stdio.h>

int closest_value(int arr[], int n, int target) {
    int bestVal = arr[0];
    long long bestDiff = arr[0] > target ? (long long)arr[0] - target : (long long)target - arr[0];
    for (int i = 1; i < n; i++) {
        long long diff = arr[i] > target ? (long long)arr[i] - target : (long long)target - arr[i];
        if (diff < bestDiff || (diff == bestDiff && arr[i] < bestVal)) {
            bestDiff = diff;
            bestVal = arr[i];
        }
    }
    return bestVal;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[10000];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    int target;
    scanf("%d", &target);
    printf("%d\n", closest_value(arr, n, target));
    return 0;
}`,
// q06 Locker Assignment Lookup
String.raw`#include <stdio.h>

int locker_for(int ids[], int n, int member) {
    for (int i = 0; i < n; i++) {
        if (ids[i] == member) return i + 1;
    }
    return -1;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int ids[10000];
    for (int i = 0; i < n; i++) scanf("%d", &ids[i]);
    int member;
    scanf("%d", &member);
    printf("%d\n", locker_for(ids, n, member));
    return 0;
}`,
// q07 Dictionary Shelf Binary Lookup
String.raw`#include <stdio.h>

int binary_probes(int arr[], int n, int target) {
    int lo = 0, hi = n - 1;
    int probes = 0;
    while (lo <= hi) {
        int mid = (lo + hi) / 2;
        probes++;
        if (arr[mid] == target) return probes;
        if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[10000];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    int target;
    scanf("%d", &target);
    printf("%d\n", binary_probes(arr, n, target));
    return 0;
}`,
// q08 Concert Tier Seat Count
String.raw`#include <stdio.h>

int seats_at_price(int prices[], int n, int p) {
    int count = 0;
    for (int i = 0; i < n; i++) {
        if (prices[i] == p) count++;
    }
    return count;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int prices[10000];
    for (int i = 0; i < n; i++) scanf("%d", &prices[i]);
    int p;
    scanf("%d", &p);
    printf("%d\n", seats_at_price(prices, n, p));
    return 0;
}`,
// q09 Vanishing Roll Number
String.raw`#include <stdio.h>

int vanished_roll(int arr[], int m) {
    long long expected = (long long)(m + 1) * (m + 2) / 2;
    long long sum = 0;
    for (int i = 0; i < m; i++) sum += arr[i];
    return (int)(expected - sum);
}

int main(void) {
    int m;
    if (scanf("%d", &m) != 1) return 0;
    int arr[10000];
    for (int i = 0; i < m; i++) scanf("%d", &arr[i]);
    printf("%d\n", vanished_roll(arr, m));
    return 0;
}`,
// q10 First Occurrence Position (blacklist: qsort / whitelist: while)
String.raw`#include <stdio.h>

int first_occurrence(int arr[], int n, int target) {
    int lo = 0, hi = n - 1;
    int ans = -1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) {
            ans = mid;
            hi = mid - 1;
        } else if (arr[mid] < target) {
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }
    return ans;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[10000];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    int target;
    scanf("%d", &target);
    printf("%d\n", first_occurrence(arr, n, target));
    return 0;
}`,
// q11 Last Occurrence Position (blacklist: qsort / whitelist: while)
String.raw`#include <stdio.h>

int last_occurrence(int arr[], int n, int target) {
    int lo = 0, hi = n - 1;
    int ans = -1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) {
            ans = mid;
            lo = mid + 1;
        } else if (arr[mid] < target) {
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }
    return ans;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[10000];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    int target;
    scanf("%d", &target);
    printf("%d\n", last_occurrence(arr, n, target));
    return 0;
}`,
// q12 Search Insert Position (blacklist: qsort / whitelist: while)
String.raw`#include <stdio.h>

int insert_position(int arr[], int n, int target) {
    int lo = 0, hi = n - 1;
    int ans = n;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] >= target) {
            ans = mid;
            hi = mid - 1;
        } else {
            lo = mid + 1;
        }
    }
    return ans;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[10000];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    int target;
    scanf("%d", &target);
    printf("%d\n", insert_position(arr, n, target));
    return 0;
}`,
// q13 Bitonic Peak Index (blacklist: qsort / whitelist: while)
String.raw`#include <stdio.h>

int peak_index(int arr[], int n) {
    int lo = 0, hi = n - 1;
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] < arr[mid + 1]) lo = mid + 1;
        else hi = mid;
    }
    return lo;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[10000];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("%d\n", peak_index(arr, n));
    return 0;
}`,
// q14 Floor and Ceiling Report (blacklist: qsort / whitelist: while)
String.raw`#include <stdio.h>

void floor_ceil(int arr[], int n, int x, int *floor, int *ceil) {
    int fl = -1, ce = -1;
    int i = 0;
    while (i < n) {
        if (arr[i] <= x && arr[i] > fl) fl = arr[i];
        if (arr[i] >= x && (ce == -1 || arr[i] < ce)) ce = arr[i];
        i++;
    }
    *floor = fl;
    *ceil = ce;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[10000];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    int x;
    scanf("%d", &x);
    int fl, ce;
    floor_ceil(arr, n, x, &fl, &ce);
    printf("%d %d\n", fl, ce);
    return 0;
}`,
// q15 Rotated Array Search (blacklist: qsort / whitelist: while)
String.raw`#include <stdio.h>

int rotated_search(int arr[], int n, int target) {
    int lo = 0, hi = n - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        if (arr[lo] <= arr[mid]) {
            if (target >= arr[lo] && target < arr[mid]) hi = mid - 1;
            else lo = mid + 1;
        } else {
            if (target > arr[mid] && target <= arr[hi]) lo = mid + 1;
            else hi = mid - 1;
        }
    }
    return -1;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[10000];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    int target;
    scanf("%d", &target);
    printf("%d\n", rotated_search(arr, n, target));
    return 0;
}`,
// q16 Bounds of the Target Block (blacklist: qsort / whitelist: while)
String.raw`#include <stdio.h>

void target_bounds(int arr[], int n, int target, int *first, int *last, int *count) {
    int lo = 0, hi = n - 1;
    int f = -1, l = -1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) {
            f = mid;
            hi = mid - 1;
        } else if (arr[mid] < target) {
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }
    lo = 0;
    hi = n - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) {
            l = mid;
            lo = mid + 1;
        } else if (arr[mid] < target) {
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }
    *first = f;
    *last = l;
    *count = (f == -1) ? 0 : l - f + 1;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[10000];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    int target;
    scanf("%d", &target);
    int f, l, c;
    target_bounds(arr, n, target, &f, &l, &c);
    printf("%d %d %d\n", f, l, c);
    return 0;
}`,
// q17 Minimum in Rotated Sorted Array (blacklist: qsort / whitelist: while)
String.raw`#include <stdio.h>

int min_in_rotated(int arr[], int n) {
    int lo = 0, hi = n - 1;
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] > arr[hi]) lo = mid + 1;
        else hi = mid;
    }
    return arr[lo];
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[10000];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("%d\n", min_in_rotated(arr, n));
    return 0;
}`,
// q18 Integer Square Root by Halving (blacklist: pow / whitelist: while)
String.raw`#include <stdio.h>

int int_sqrt(int x) {
    long long lo = 0, hi = x;
    long long ans = 0;
    while (lo <= hi) {
        long long mid = lo + (hi - lo) / 2;
        long long sq = mid * mid;
        if (sq == x) return (int)mid;
        if (sq < x) {
            ans = mid;
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }
    return (int)ans;
}

int main(void) {
    int x;
    if (scanf("%d", &x) != 1) return 0;
    printf("%d\n", int_sqrt(x));
    return 0;
}`,
// q19 Kth Missing Positive (blacklist: qsort / whitelist: for)
String.raw`#include <stdio.h>

int kth_missing(int arr[], int n, int k) {
    int prev = 0;
    for (int i = 0; i < n; i++) {
        int gap = arr[i] - prev - 1;
        if (k <= gap) return prev + k;
        k -= gap;
        prev = arr[i];
    }
    return prev + k;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[10000];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    int k;
    scanf("%d", &k);
    printf("%d\n", kth_missing(arr, n, k));
    return 0;
}`,
];

const bank = JSON.parse(readFileSync("/home/z/tmp/dsa-export/dsa-c/day-05.code.json", "utf8"));
if (bank.questions.length !== SRC.length) throw new Error(`count mismatch day05`);
bank.questions.forEach((q, i) => { q.sourcecode = SRC[i]; });
writeFileSync("/home/z/my-project/scripts/dsa-c/data/day-05.code.json", JSON.stringify(bank, null, 2) + "\n");

const mcq = JSON.parse(readFileSync("/home/z/tmp/dsa-export/dsa-c/day-05.mcq.json", "utf8"));
writeFileSync("/home/z/my-project/scripts/dsa-c/data/day-05.mcq.json",
  JSON.stringify({ day: mcq.day, questions: mcq.questions.map(({ _id, ...rest }) => rest) }, null, 2) + "\n");
console.log("day-05 written:", bank.questions.length, "code,", mcq.questions.length, "mcq");
