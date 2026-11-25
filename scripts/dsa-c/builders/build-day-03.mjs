// Day 03 — Arrays (1D/2D basics): complete standalone C programs.
import { readFileSync, writeFileSync } from "node:fs";

const SRC = [
// q00 Reverse the Array
String.raw`#include <stdio.h>

void reverse_array(int arr[], int n) {
    int lo = 0, hi = n - 1;
    while (lo < hi) {
        int t = arr[lo];
        arr[lo] = arr[hi];
        arr[hi] = t;
        lo++;
        hi--;
    }
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[10000];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    reverse_array(arr, n);
    for (int i = 0; i < n; i++) printf(i ? " %d" : "%d", arr[i]);
    printf("\n");
    return 0;
}`,
// q01 Minimum and Maximum
String.raw`#include <stdio.h>

void min_max(int arr[], int n, int *mn, int *mx) {
    int lo = arr[0], hi = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] < lo) lo = arr[i];
        if (arr[i] > hi) hi = arr[i];
    }
    *mn = lo;
    *mx = hi;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[10000];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    int mn, mx;
    min_max(arr, n, &mn, &mx);
    printf("%d %d\n", mn, mx);
    return 0;
}`,
// q02 Second Largest Element
String.raw`#include <stdio.h>
#include <limits.h>

int second_largest(int arr[], int n) {
    int best = arr[0], second = INT_MIN;
    for (int i = 1; i < n; i++) {
        if (arr[i] > best) {
            second = best;
            best = arr[i];
        } else if (arr[i] > second && arr[i] < best) {
            second = arr[i];
        }
    }
    return second;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[10000];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("%d\n", second_largest(arr, n));
    return 0;
}`,
// q03 Sum and Average
String.raw`#include <stdio.h>

void sum_average(int arr[], int n, int *sum, double *avg) {
    int total = 0;
    for (int i = 0; i < n; i++) total += arr[i];
    *sum = total;
    *avg = (double)total / n;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[10000];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    int sum;
    double avg;
    sum_average(arr, n, &sum, &avg);
    printf("%d %.2f\n", sum, avg);
    return 0;
}`,
// q04 Count Occurrences of K
String.raw`#include <stdio.h>

int count_key(int arr[], int n, int k) {
    int count = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] == k) count++;
    }
    return count;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[10000];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    int k;
    scanf("%d", &k);
    printf("%d\n", count_key(arr, n, k));
    return 0;
}`,
// q05 Byte Offset of an Index
String.raw`#include <stdio.h>

long long byte_offset(int index) {
    return (long long)index * (long long)sizeof(int);
}

int main(void) {
    int index;
    if (scanf("%d", &index) != 1) return 0;
    printf("%lld\n", byte_offset(index));
    return 0;
}`,
// q06 Cold Storage Warmest Shelf
String.raw`#include <stdio.h>

void hottest_shelf(int arr[], int n, int *val, int *idx) {
    int best = arr[0], bestIdx = 0;
    for (int i = 1; i < n; i++) {
        if (arr[i] > best) {
            best = arr[i];
            bestIdx = i;
        }
    }
    *val = best;
    *idx = bestIdx;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[10000];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    int val, idx;
    hottest_shelf(arr, n, &val, &idx);
    printf("%d %d\n", val, idx);
    return 0;
}`,
// q07 Canteen Token Rotate Left
String.raw`#include <stdio.h>

void rotate_left(int arr[], int n) {
    int first = arr[0];
    for (int i = 0; i < n - 1; i++) {
        arr[i] = arr[i + 1];
    }
    arr[n - 1] = first;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[10000];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    rotate_left(arr, n);
    for (int i = 0; i < n; i++) printf(i ? " %d" : "%d", arr[i]);
    printf("\n");
    return 0;
}`,
// q08 Lab Sensor Spike Count
String.raw`#include <stdio.h>

int count_spikes(int arr[], int n) {
    int count = 0;
    for (int i = 1; i < n - 1; i++) {
        if (arr[i] > arr[i - 1] && arr[i] > arr[i + 1]) count++;
    }
    return count;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[10000];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("%d\n", count_spikes(arr, n));
    return 0;
}`,
// q09 Attendance Register Dedup
String.raw`#include <stdio.h>

int dedupe(int arr[], int n) {
    int m = 0;
    for (int i = 0; i < n; i++) {
        int seen = 0;
        for (int j = 0; j < m; j++) {
            if (arr[j] == arr[i]) {
                seen = 1;
                break;
            }
        }
        if (!seen) {
            arr[m++] = arr[i];
        }
    }
    return m;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[10000];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    int m = dedupe(arr, n);
    printf("%d\n", m);
    for (int i = 0; i < m; i++) printf(i ? " %d" : "%d", arr[i]);
    printf("\n");
    return 0;
}`,
// q10 Insert Value at Position (blacklist: memcpy / whitelist: for)
String.raw`#include <stdio.h>

int insert_at(int arr[], int n, int pos, int val) {
    for (int i = n; i > pos; i--) {
        arr[i] = arr[i - 1];
    }
    arr[pos] = val;
    return n + 1;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[10001];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    int pos, val;
    scanf("%d %d", &pos, &val);
    int m = insert_at(arr, n, pos, val);
    for (int i = 0; i < m; i++) printf(i ? " %d" : "%d", arr[i]);
    printf("\n");
    return 0;
}`,
// q11 Delete Value at Position (blacklist: memmove / whitelist: for)
String.raw`#include <stdio.h>

int delete_at(int arr[], int n, int pos) {
    for (int i = pos; i < n - 1; i++) {
        arr[i] = arr[i + 1];
    }
    return n - 1;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[10000];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    int pos;
    scanf("%d", &pos);
    int m = delete_at(arr, n, pos);
    for (int i = 0; i < m; i++) printf(i ? " %d" : "%d", arr[i]);
    printf("\n");
    return 0;
}`,
// q12 Shifted Sorted Check (blacklist: qsort / whitelist: for)
String.raw`#include <stdio.h>

int is_rotated_sorted(int arr[], int n) {
    int descents = 0;
    for (int i = 0; i < n - 1; i++) {
        if (arr[i] > arr[i + 1]) descents++;
    }
    if (n > 1 && arr[n - 1] > arr[0]) descents++;
    return descents <= 1;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[10000];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("%d\n", is_rotated_sorted(arr, n));
    return 0;
}`,
// q13 Matrix Bytes Report (blacklist: malloc / whitelist: sizeof)
String.raw`#include <stdio.h>

void matrix_bytes(int r, int c, long long *total, long long *rowbytes) {
    *total = (long long)r * c * (long long)sizeof(int);
    *rowbytes = (long long)c * (long long)sizeof(int);
}

int main(void) {
    int r, c;
    if (scanf("%d %d", &r, &c) != 2) return 0;
    long long total, rowbytes;
    matrix_bytes(r, c, &total, &rowbytes);
    printf("%lld %lld\n", total, rowbytes);
    return 0;
}`,
// q14 Move Zeros to End (blacklist: qsort / whitelist: while)
String.raw`#include <stdio.h>

int move_zeros(int arr[], int n) {
    int j = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] != 0) {
            arr[j++] = arr[i];
        }
    }
    int nonzero = j;
    while (j < n) {
        arr[j++] = 0;
    }
    return nonzero;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[10000];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    move_zeros(arr, n);
    for (int i = 0; i < n; i++) printf(i ? " %d" : "%d", arr[i]);
    printf("\n");
    return 0;
}`,
// q15 Merge Two Sorted Halves (blacklist: qsort / whitelist: while)
String.raw`#include <stdio.h>

void merge_halves(int arr[], int n) {
    int h = n / 2;
    static int tmp[10001];
    int i = 0, j = h, k = 0;
    while (i < h && j < n) {
        if (arr[i] <= arr[j]) tmp[k++] = arr[i++];
        else tmp[k++] = arr[j++];
    }
    while (i < h) tmp[k++] = arr[i++];
    while (j < n) tmp[k++] = arr[j++];
    for (int t = 0; t < n; t++) arr[t] = tmp[t];
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[10000];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    merge_halves(arr, n);
    for (int i = 0; i < n; i++) printf(i ? " %d" : "%d", arr[i]);
    printf("\n");
    return 0;
}`,
// q16 Second Smallest and Second Largest (blacklist: qsort / whitelist: if)
String.raw`#include <stdio.h>

void second_extrema(int arr[], int n, int *smin, int *smax) {
    int min = arr[0], max = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] < min) min = arr[i];
        if (arr[i] > max) max = arr[i];
    }
    int secondMin = max, secondMax = min;
    for (int i = 0; i < n; i++) {
        if (arr[i] > min && arr[i] < secondMin) secondMin = arr[i];
        if (arr[i] < max && arr[i] > secondMax) secondMax = arr[i];
    }
    *smin = secondMin;
    *smax = secondMax;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[10000];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    int smin, smax;
    second_extrema(arr, n, &smin, &smax);
    printf("%d %d\n", smin, smax);
    return 0;
}`,
// q17 Remove All Occurrences of Key (blacklist: memmove / whitelist: while)
String.raw`#include <stdio.h>

int remove_all(int arr[], int n, int key) {
    int j = 0;
    int i = 0;
    while (i < n) {
        if (arr[i] != key) {
            arr[j++] = arr[i];
        }
        i++;
    }
    return j;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[10000];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    int key;
    scanf("%d", &key);
    int m = remove_all(arr, n, key);
    printf("%d\n", m);
    for (int i = 0; i < m; i++) printf(i ? " %d" : "%d", arr[i]);
    printf("\n");
    return 0;
}`,
// q18 Leader Elements Scan (blacklist: qsort / whitelist: for)
String.raw`#include <stdio.h>

int leaders(int arr[], int n, int out[]) {
    int m = 0;
    int maxRight = arr[n - 1];
    out[m++] = arr[n - 1];
    for (int i = n - 2; i >= 0; i--) {
        if (arr[i] > maxRight) {
            maxRight = arr[i];
            out[m++] = arr[i];
        }
    }
    for (int lo = 0, hi = m - 1; lo < hi; lo++, hi--) {
        int t = out[lo];
        out[lo] = out[hi];
        out[hi] = t;
    }
    return m;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[10000];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    int out[10000];
    int m = leaders(arr, n, out);
    for (int i = 0; i < m; i++) printf(i ? " %d" : "%d", out[i]);
    printf("\n");
    return 0;
}`,
// q19 In-Place Circular Rotate (blacklist: malloc / whitelist: reverse)
String.raw`#include <stdio.h>

static void reverse_range(int arr[], int lo, int hi) {
    while (lo < hi) {
        int t = arr[lo];
        arr[lo] = arr[hi];
        arr[hi] = t;
        lo++;
        hi--;
    }
}

void rotate_reversal(int arr[], int n, int k) {
    if (n <= 1) return;
    k %= n;
    if (k < 0) k += n;
    if (k == 0) return;
    reverse_range(arr, 0, k - 1);
    reverse_range(arr, k, n - 1);
    reverse_range(arr, 0, n - 1);
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[10000];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    int k;
    scanf("%d", &k);
    rotate_reversal(arr, n, k);
    for (int i = 0; i < n; i++) printf(i ? " %d" : "%d", arr[i]);
    printf("\n");
    return 0;
}`,
];

const bank = JSON.parse(readFileSync("/home/z/tmp/dsa-export/dsa-c/day-03.code.json", "utf8"));
if (bank.questions.length !== SRC.length) throw new Error(`count mismatch day03`);
bank.questions.forEach((q, i) => { q.sourcecode = SRC[i]; });
writeFileSync("/home/z/my-project/scripts/dsa-c/data/day-03.code.json", JSON.stringify(bank, null, 2) + "\n");

const mcq = JSON.parse(readFileSync("/home/z/tmp/dsa-export/dsa-c/day-03.mcq.json", "utf8"));
writeFileSync("/home/z/my-project/scripts/dsa-c/data/day-03.mcq.json",
  JSON.stringify({ day: mcq.day, questions: mcq.questions.map(({ _id, ...rest }) => rest) }, null, 2) + "\n");
console.log("day-03 written:", bank.questions.length, "code,", mcq.questions.length, "mcq");
