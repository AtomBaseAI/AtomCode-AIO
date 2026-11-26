// Day 07 — Efficient Sorting Algorithms: complete standalone C programs.
import { readFileSync, writeFileSync } from "node:fs";

const SRC = [
// q00 Merge Sort Ascending
String.raw`#include <stdio.h>

int g_tmp[10005];

void merge_runs(int arr[], int lo, int mid, int hi) {
    int i = lo, j = mid, k = lo;
    while (i < mid && j < hi) {
        if (arr[i] <= arr[j]) g_tmp[k++] = arr[i++];
        else g_tmp[k++] = arr[j++];
    }
    while (i < mid) g_tmp[k++] = arr[i++];
    while (j < hi) g_tmp[k++] = arr[j++];
    for (int t = lo; t < hi; t++) arr[t] = g_tmp[t];
}

void msort_rec(int arr[], int lo, int hi) {
    if (hi - lo <= 1) return;
    int mid = lo + (hi - lo) / 2;
    msort_rec(arr, lo, mid);
    msort_rec(arr, mid, hi);
    merge_runs(arr, lo, mid, hi);
}

void merge_sort(int arr[], int n) {
    if (n > 1) msort_rec(arr, 0, n);
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[10005];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    merge_sort(arr, n);
    for (int i = 0; i < n; i++) printf(i ? " %d" : "%d", arr[i]);
    printf("\n");
    return 0;
}`,
// q01 Merge Two Sorted Halves
String.raw`#include <stdio.h>

void merge_halves(int arr[], int n, int mid, int out[]) {
    int i = 0, j = mid, k = 0;
    while (i < mid && j < n) {
        if (arr[i] <= arr[j]) out[k++] = arr[i++];
        else out[k++] = arr[j++];
    }
    while (i < mid) out[k++] = arr[i++];
    while (j < n) out[k++] = arr[j++];
}

int main(void) {
    int n, mid;
    if (scanf("%d %d", &n, &mid) != 2) return 0;
    int arr[10005], out[10005];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    merge_halves(arr, n, mid, out);
    for (int i = 0; i < n; i++) printf(i ? " %d" : "%d", out[i]);
    printf("\n");
    return 0;
}`,
// q02 Lomuto Partition Index
String.raw`#include <stdio.h>

int lomuto_partition(int arr[], int n) {
    int pivot = arr[n - 1];
    int i = -1;
    for (int j = 0; j + 1 < n; j++) {
        if (arr[j] <= pivot) {
            i++;
            int t = arr[i];
            arr[i] = arr[j];
            arr[j] = t;
        }
    }
    int t = arr[i + 1];
    arr[i + 1] = arr[n - 1];
    arr[n - 1] = t;
    return i + 1;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[10005];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("%d\n", lomuto_partition(arr, n));
    return 0;
}`,
// q03 Quicksort the Array
String.raw`#include <stdio.h>

int partition_last_pivot(int arr[], int lo, int hi) {
    int pivot = arr[hi];
    int i = lo - 1;
    for (int j = lo; j < hi; j++) {
        if (arr[j] <= pivot) {
            i++;
            int t = arr[i];
            arr[i] = arr[j];
            arr[j] = t;
        }
    }
    int t = arr[i + 1];
    arr[i + 1] = arr[hi];
    arr[hi] = t;
    return i + 1;
}

void qs_rec(int arr[], int lo, int hi) {
    if (lo >= hi) return;
    int p = partition_last_pivot(arr, lo, hi);
    qs_rec(arr, lo, p - 1);
    qs_rec(arr, p + 1, hi);
}

void quick_sort(int arr[], int n) {
    if (n > 0) qs_rec(arr, 0, n - 1);
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[10005];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    quick_sort(arr, n);
    for (int i = 0; i < n; i++) printf(i ? " %d" : "%d", arr[i]);
    printf("\n");
    return 0;
}`,
// q04 Kth Smallest Element
String.raw`#include <stdio.h>

int g_tmp[10005];

void merge_runs(int arr[], int lo, int mid, int hi) {
    int i = lo, j = mid, k = lo;
    while (i < mid && j < hi) {
        if (arr[i] <= arr[j]) g_tmp[k++] = arr[i++];
        else g_tmp[k++] = arr[j++];
    }
    while (i < mid) g_tmp[k++] = arr[i++];
    while (j < hi) g_tmp[k++] = arr[j++];
    for (int t = lo; t < hi; t++) arr[t] = g_tmp[t];
}

void msort_rec(int arr[], int lo, int hi) {
    if (hi - lo <= 1) return;
    int mid = lo + (hi - lo) / 2;
    msort_rec(arr, lo, mid);
    msort_rec(arr, mid, hi);
    merge_runs(arr, lo, mid, hi);
}

int kth_smallest(int arr[], int n, int k) {
    int copy[10005];
    for (int i = 0; i < n; i++) copy[i] = arr[i];
    msort_rec(copy, 0, n);
    return copy[k - 1];
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[10005];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    int k;
    scanf("%d", &k);
    printf("%d\n", kth_smallest(arr, n, k));
    return 0;
}`,
// q05 Partition With First Pivot
String.raw`#include <stdio.h>

int partition_first(int arr[], int n) {
    int t = arr[0];
    arr[0] = arr[n - 1];
    arr[n - 1] = t;
    int pivot = arr[n - 1];
    int i = -1;
    for (int j = 0; j + 1 < n; j++) {
        if (arr[j] <= pivot) {
            i++;
            int u = arr[i];
            arr[i] = arr[j];
            arr[j] = u;
        }
    }
    int v = arr[i + 1];
    arr[i + 1] = arr[n - 1];
    arr[n - 1] = v;
    return i + 1;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[10005];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("%d\n", partition_first(arr, n));
    return 0;
}`,
// q06 Left Picks in the Merge
String.raw`#include <stdio.h>

int g_tmp[10005];

int merge_left_picks(int arr[], int n, int mid) {
    int i = 0, j = mid, k = 0;
    int leftpicks = 0;
    while (i < mid && j < n) {
        if (arr[i] <= arr[j]) {
            g_tmp[k++] = arr[i++];
            leftpicks++;
        } else {
            g_tmp[k++] = arr[j++];
        }
    }
    while (i < mid) {
        g_tmp[k++] = arr[i++];
        leftpicks++;
    }
    while (j < n) g_tmp[k++] = arr[j++];
    for (int t = 0; t < n; t++) arr[t] = g_tmp[t];
    return leftpicks;
}

int main(void) {
    int n, mid;
    if (scanf("%d %d", &n, &mid) != 2) return 0;
    int arr[10005];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("%d\n", merge_left_picks(arr, n, mid));
    return 0;
}`,
// q07 Rearrange Around the Last Price
String.raw`#include <stdio.h>

int partition_last(int arr[], int n) {
    int pivot = arr[n - 1];
    int i = -1;
    for (int j = 0; j + 1 < n; j++) {
        if (arr[j] <= pivot) {
            i++;
            int t = arr[i];
            arr[i] = arr[j];
            arr[j] = t;
        }
    }
    int t = arr[i + 1];
    arr[i + 1] = arr[n - 1];
    arr[n - 1] = t;
    return i + 1;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[10005];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    partition_last(arr, n);
    for (int i = 0; i < n; i++) printf(i ? " %d" : "%d", arr[i]);
    printf("\n");
    return 0;
}`,
// q08 Kth Cheapest Fare
String.raw`#include <stdio.h>

int g_tmp[10005];

void merge_runs(int arr[], int lo, int mid, int hi) {
    int i = lo, j = mid, k = lo;
    while (i < mid && j < hi) {
        if (arr[i] <= arr[j]) g_tmp[k++] = arr[i++];
        else g_tmp[k++] = arr[j++];
    }
    while (i < mid) g_tmp[k++] = arr[i++];
    while (j < hi) g_tmp[k++] = arr[j++];
    for (int t = lo; t < hi; t++) arr[t] = g_tmp[t];
}

void msort_rec(int arr[], int lo, int hi) {
    if (hi - lo <= 1) return;
    int mid = lo + (hi - lo) / 2;
    msort_rec(arr, lo, mid);
    msort_rec(arr, mid, hi);
    merge_runs(arr, lo, mid, hi);
}

int kth_cheapest(int arr[], int n, int k) {
    int copy[10005];
    for (int i = 0; i < n; i++) copy[i] = arr[i];
    msort_rec(copy, 0, n);
    return copy[k - 1];
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[10005];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    int k;
    scanf("%d", &k);
    printf("%d\n", kth_cheapest(arr, n, k));
    return 0;
}`,
// q09 Quicksort Recursion Depth
String.raw`#include <stdio.h>

int partition_last_pivot(int arr[], int lo, int hi) {
    int pivot = arr[hi];
    int i = lo - 1;
    for (int j = lo; j < hi; j++) {
        if (arr[j] <= pivot) {
            i++;
            int t = arr[i];
            arr[i] = arr[j];
            arr[j] = t;
        }
    }
    int t = arr[i + 1];
    arr[i + 1] = arr[hi];
    arr[hi] = t;
    return i + 1;
}

int qdepth_rec(int arr[], int lo, int hi) {
    if (lo > hi) return 0;
    int p = partition_last_pivot(arr, lo, hi);
    int l = qdepth_rec(arr, lo, p - 1);
    int r = qdepth_rec(arr, p + 1, hi);
    return 1 + (l > r ? l : r);
}

int quick_depth(int arr[], int n) {
    return qdepth_rec(arr, 0, n - 1);
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[10005];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("%d\n", quick_depth(arr, n));
    return 0;
}`,
// q10 Merge Sort Comparison Count (blacklist: qsort / whitelist: while)
String.raw`#include <stdio.h>

int g_tmp[10005];

long long mcmp_rec(int arr[], int lo, int hi) {
    int len = hi - lo + 1;
    if (len <= 1) return 0;
    int mid = lo + len / 2;
    long long c = mcmp_rec(arr, lo, mid - 1) + mcmp_rec(arr, mid, hi);
    int i = lo, j = mid, k = lo;
    while (i < mid && j <= hi) {
        c++;
        if (arr[i] <= arr[j]) g_tmp[k++] = arr[i++];
        else g_tmp[k++] = arr[j++];
    }
    while (i < mid) g_tmp[k++] = arr[i++];
    while (j <= hi) g_tmp[k++] = arr[j++];
    for (int t = lo; t <= hi; t++) arr[t] = g_tmp[t];
    return c;
}

int merge_comparisons(int arr[], int n) {
    long long c = mcmp_rec(arr, 0, n - 1);
    return (int)c;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[10005];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("%d\n", merge_comparisons(arr, n));
    return 0;
}`,
// q11 Quicksort Comparison Count (blacklist: qsort / whitelist: for)
String.raw`#include <stdio.h>

long long qcmp_rec(int arr[], int lo, int hi) {
    if (lo >= hi) return 0;
    int pivot = arr[hi];
    int i = lo - 1;
    long long c = 0;
    for (int j = lo; j < hi; j++) {
        c++;
        if (arr[j] <= pivot) {
            i++;
            int t = arr[i];
            arr[i] = arr[j];
            arr[j] = t;
        }
    }
    int t = arr[i + 1];
    arr[i + 1] = arr[hi];
    arr[hi] = t;
    return c + qcmp_rec(arr, lo, i) + qcmp_rec(arr, i + 2, hi);
}

int quick_comparisons(int arr[], int n) {
    return (int)qcmp_rec(arr, 0, n - 1);
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[10005];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("%d\n", quick_comparisons(arr, n));
    return 0;
}`,
// q12 Merge Two Visitor Streams (blacklist: qsort / whitelist: while)
String.raw`#include <stdio.h>

void merge_streams(int a[], int n, int b[], int m, int out[]) {
    int i = 0, j = 0, k = 0;
    while (i < n && j < m) {
        if (a[i] <= b[j]) out[k++] = a[i++];
        else out[k++] = b[j++];
    }
    while (i < n) out[k++] = a[i++];
    while (j < m) out[k++] = b[j++];
}

int main(void) {
    int n, m;
    if (scanf("%d", &n) != 1) return 0;
    int a[1005], b[1005], out[2005];
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    if (scanf("%d", &m) != 1) return 0;
    for (int i = 0; i < m; i++) scanf("%d", &b[i]);
    merge_streams(a, n, b, m, out);
    for (int i = 0; i < n + m; i++) printf(i ? " %d" : "%d", out[i]);
    printf("\n");
    return 0;
}`,
// q13 Three-Way Partition Report (blacklist: qsort / whitelist: for)
String.raw`#include <stdio.h>

void three_way(int arr[], int n, int v, int out[]) {
    int k = 0;
    for (int i = 0; i < n; i++) if (arr[i] < v) out[k++] = arr[i];
    for (int i = 0; i < n; i++) if (arr[i] == v) out[k++] = arr[i];
    for (int i = 0; i < n; i++) if (arr[i] > v) out[k++] = arr[i];
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[10005], out[10005];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    int v;
    scanf("%d", &v);
    three_way(arr, n, v, out);
    for (int i = 0; i < n; i++) printf(i ? " %d" : "%d", out[i]);
    printf("\n");
    return 0;
}`,
// q14 Stable Merge of Student Records (blacklist: qsort / whitelist: while)
String.raw`#include <stdio.h>

void stable_merge(int s[], int id[], int t[], int tid[], int n, int m, int os[], int oid[]) {
    int i = 0, j = 0, k = 0;
    while (i < n && j < m) {
        if (s[i] <= t[j]) {
            os[k] = s[i];
            oid[k] = id[i];
            i++;
        } else {
            os[k] = t[j];
            oid[k] = tid[j];
            j++;
        }
        k++;
    }
    while (i < n) {
        os[k] = s[i];
        oid[k] = id[i];
        i++;
        k++;
    }
    while (j < m) {
        os[k] = t[j];
        oid[k] = tid[j];
        j++;
        k++;
    }
}

int main(void) {
    int n, m;
    if (scanf("%d %d", &n, &m) != 2) return 0;
    int s[1005], id[1005], t[1005], tid[1005], os[2005], oid[2005];
    for (int i = 0; i < n; i++) scanf("%d %d", &s[i], &id[i]);
    for (int i = 0; i < m; i++) scanf("%d %d", &t[i], &tid[i]);
    stable_merge(s, id, t, tid, n, m, os, oid);
    for (int i = 0; i < n + m; i++) printf(i ? " %d %d" : "%d %d", os[i], oid[i]);
    printf("\n");
    return 0;
}`,
// q15 Cross-Stream Inversion Count (blacklist: qsort / whitelist: for)
String.raw`#include <stdio.h>

long long cross_inversions(int a[], int n, int b[], int m) {
    long long cnt = 0;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            if (a[i] > b[j]) cnt++;
        }
    }
    return cnt;
}

int main(void) {
    int n, m;
    if (scanf("%d", &n) != 1) return 0;
    int a[1005], b[1005];
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    if (scanf("%d", &m) != 1) return 0;
    for (int i = 0; i < m; i++) scanf("%d", &b[i]);
    printf("%lld\n", cross_inversions(a, n, b, m));
    return 0;
}`,
// q16 Count Inversions Efficiently (blacklist: qsort / whitelist: merge)
String.raw`#include <stdio.h>

int g_tmp[10005];

long long inv_merge_rec(int arr[], int lo, int hi) {
    int len = hi - lo + 1;
    if (len <= 1) return 0;
    int mid = lo + len / 2;
    long long c = inv_merge_rec(arr, lo, mid - 1) + inv_merge_rec(arr, mid, hi);
    int i = lo, j = mid, k = lo;
    while (i < mid && j <= hi) {
        if (arr[i] <= arr[j]) g_tmp[k++] = arr[i++];
        else {
            g_tmp[k++] = arr[j++];
            c += mid - i;
        }
    }
    while (i < mid) g_tmp[k++] = arr[i++];
    while (j <= hi) g_tmp[k++] = arr[j++];
    for (int t = lo; t <= hi; t++) arr[t] = g_tmp[t];
    return c;
}

long long count_inversions(int arr[], int n) {
    return inv_merge_rec(arr, 0, n - 1);
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[10005];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("%lld\n", count_inversions(arr, n));
    return 0;
}`,
// q17 Merge Versus Quicksort Duel (blacklist: qsort / whitelist: while)
String.raw`#include <stdio.h>

int g_tmp[10005];

long long mcmp_rec(int arr[], int lo, int hi) {
    int len = hi - lo + 1;
    if (len <= 1) return 0;
    int mid = lo + len / 2;
    long long c = mcmp_rec(arr, lo, mid - 1) + mcmp_rec(arr, mid, hi);
    int i = lo, j = mid, k = lo;
    while (i < mid && j <= hi) {
        c++;
        if (arr[i] <= arr[j]) g_tmp[k++] = arr[i++];
        else g_tmp[k++] = arr[j++];
    }
    while (i < mid) g_tmp[k++] = arr[i++];
    while (j <= hi) g_tmp[k++] = arr[j++];
    for (int t = lo; t <= hi; t++) arr[t] = g_tmp[t];
    return c;
}

long long qcmp_rec(int arr[], int lo, int hi) {
    if (lo >= hi) return 0;
    int pivot = arr[hi];
    int i = lo - 1;
    long long c = 0;
    int j = lo;
    while (j < hi) {
        c++;
        if (arr[j] <= pivot) {
            i++;
            int t = arr[i];
            arr[i] = arr[j];
            arr[j] = t;
        }
        j++;
    }
    int t = arr[i + 1];
    arr[i + 1] = arr[hi];
    arr[hi] = t;
    return c + qcmp_rec(arr, lo, i) + qcmp_rec(arr, i + 2, hi);
}

void compare_sorts(int arr[], int n, int *merge_cmp, int *quick_cmp) {
    int a1[10005], a2[10005];
    for (int i = 0; i < n; i++) {
        a1[i] = arr[i];
        a2[i] = arr[i];
    }
    long long mc = mcmp_rec(a1, 0, n - 1);
    long long qc = qcmp_rec(a2, 0, n - 1);
    *merge_cmp = (int)mc;
    *quick_cmp = (int)qc;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[10005];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    int mc, qc;
    compare_sorts(arr, n, &mc, &qc);
    const char *w = mc < qc ? "merge" : (mc > qc ? "quick" : "tie");
    printf("%d %d %s\n", mc, qc, w);
    return 0;
}`,
// q18 Count Significant Inversions (blacklist: qsort / whitelist: merge)
String.raw`#include <stdio.h>

int g_tmp[10005];

long long sig_merge_rec(int arr[], int lo, int hi) {
    int len = hi - lo + 1;
    if (len <= 1) return 0;
    int mid = lo + len / 2;
    long long c = sig_merge_rec(arr, lo, mid - 1) + sig_merge_rec(arr, mid, hi);
    int p = lo;
    for (int j = mid; j <= hi; j++) {
        while (p < mid && (long long)arr[p] <= 2LL * (long long)arr[j]) p++;
        c += mid - p;
    }
    int i = lo, j2 = mid, k = lo;
    while (i < mid && j2 <= hi) {
        if (arr[i] <= arr[j2]) g_tmp[k++] = arr[i++];
        else g_tmp[k++] = arr[j2++];
    }
    while (i < mid) g_tmp[k++] = arr[i++];
    while (j2 <= hi) g_tmp[k++] = arr[j2++];
    for (int t = lo; t <= hi; t++) arr[t] = g_tmp[t];
    return c;
}

long long sig_inversions(int arr[], int n) {
    return sig_merge_rec(arr, 0, n - 1);
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[10005];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("%lld\n", sig_inversions(arr, n));
    return 0;
}`,
// q19 Partition Around Median-of-Three (blacklist: qsort / whitelist: for)
String.raw`#include <stdio.h>

int partition_mo3(int arr[], int n) {
    int x = arr[0], y = arr[n / 2], z = arr[n - 1];
    int mx = x > y ? x : y;
    int mn = x > y ? y : x;
    int median = mx < z ? mx : (mn > z ? mn : z);
    int pidx = (arr[0] == median) ? 0 : (arr[n / 2] == median ? n / 2 : n - 1);
    int t = arr[pidx];
    arr[pidx] = arr[n - 1];
    arr[n - 1] = t;
    int pivot = arr[n - 1];
    int i = -1;
    for (int j = 0; j + 1 < n; j++) {
        if (arr[j] <= pivot) {
            i++;
            int u = arr[i];
            arr[i] = arr[j];
            arr[j] = u;
        }
    }
    int v = arr[i + 1];
    arr[i + 1] = arr[n - 1];
    arr[n - 1] = v;
    return i + 1;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[10005];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    int p = partition_mo3(arr, n);
    printf("%d\n", p);
    for (int i = 0; i < n; i++) printf(i ? " %d" : "%d", arr[i]);
    printf("\n");
    return 0;
}`,
];

const bank = JSON.parse(readFileSync("/home/z/tmp/dsa-export/dsa-c/day-07.code.json", "utf8"));
if (bank.questions.length !== SRC.length) throw new Error(`count mismatch day07`);
bank.questions.forEach((q, i) => { q.sourcecode = SRC[i]; });
writeFileSync("/home/z/my-project/scripts/dsa-c/data/day-07.code.json", JSON.stringify(bank, null, 2) + "\n");

const mcq = JSON.parse(readFileSync("/home/z/tmp/dsa-export/dsa-c/day-07.mcq.json", "utf8"));
writeFileSync("/home/z/my-project/scripts/dsa-c/data/day-07.mcq.json",
  JSON.stringify({ day: mcq.day, questions: mcq.questions.map(({ _id, ...rest }) => rest) }, null, 2) + "\n");
console.log("day-07 written:", bank.questions.length, "code,", mcq.questions.length, "mcq");
