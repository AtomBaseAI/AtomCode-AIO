// Day 06 — Sorting Basics: complete standalone C programs.
import { readFileSync, writeFileSync } from "node:fs";

const SRC = [
// q00 Bubble Sort Implementation
String.raw`#include <stdio.h>

void bubble_sort(int arr[], int n) {
    for (int end = n; end > 1; end--) {
        for (int i = 0; i + 1 < end; i++) {
            if (arr[i] > arr[i + 1]) {
                int t = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = t;
            }
        }
    }
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[2005];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    bubble_sort(arr, n);
    for (int i = 0; i < n; i++) printf(i ? " %d" : "%d", arr[i]);
    printf("\n");
    return 0;
}`,
// q01 Selection Sort Implementation
String.raw`#include <stdio.h>

void selection_sort(int arr[], int n) {
    for (int i = 0; i + 1 < n; i++) {
        int best = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[best]) best = j;
        }
        if (best != i) {
            int t = arr[i];
            arr[i] = arr[best];
            arr[best] = t;
        }
    }
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[2005];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    selection_sort(arr, n);
    for (int i = 0; i < n; i++) printf(i ? " %d" : "%d", arr[i]);
    printf("\n");
    return 0;
}`,
// q02 Insertion Sort Implementation
String.raw`#include <stdio.h>

void insertion_sort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[2005];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    insertion_sort(arr, n);
    for (int i = 0; i < n; i++) printf(i ? " %d" : "%d", arr[i]);
    printf("\n");
    return 0;
}`,
// q03 Bubble Sort Swap Count
String.raw`#include <stdio.h>

int bubble_swaps(int arr[], int n) {
    int swaps = 0;
    for (int end = n; end > 1; end--) {
        for (int i = 0; i + 1 < end; i++) {
            if (arr[i] > arr[i + 1]) {
                int t = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = t;
                swaps++;
            }
        }
    }
    return swaps;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[2005];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("%d\n", bubble_swaps(arr, n));
    return 0;
}`,
// q04 Insertion Sort Shift Count
String.raw`#include <stdio.h>

int insertion_shifts(int arr[], int n) {
    int shifts = 0;
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
            shifts++;
        }
        arr[j + 1] = key;
    }
    return shifts;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[2005];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("%d\n", insertion_shifts(arr, n));
    return 0;
}`,
// q05 Ascending Order Check
String.raw`#include <stdio.h>

int is_ascending(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        if (arr[i - 1] > arr[i]) return 0;
    }
    return 1;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[2005];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("%d\n", is_ascending(arr, n));
    return 0;
}`,
// q06 Canteen Token Line: One Bubble Pass
String.raw`#include <stdio.h>

void bubble_pass(int arr[], int n) {
    for (int i = 0; i + 1 < n; i++) {
        if (arr[i] > arr[i + 1]) {
            int t = arr[i];
            arr[i] = arr[i + 1];
            arr[i + 1] = t;
        }
    }
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[2005];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    bubble_pass(arr, n);
    for (int i = 0; i < n; i++) printf(i ? " %d" : "%d", arr[i]);
    printf("\n");
    return 0;
}`,
// q07 Race Bibs: Select the Fastest
String.raw`#include <stdio.h>

void select_min_front(int arr[], int n) {
    int best = 0;
    for (int i = 1; i < n; i++) {
        if (arr[i] < arr[best]) best = i;
    }
    if (best != 0) {
        int t = arr[0];
        arr[0] = arr[best];
        arr[best] = t;
    }
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[2005];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    select_min_front(arr, n);
    for (int i = 0; i < n; i++) printf(i ? " %d" : "%d", arr[i]);
    printf("\n");
    return 0;
}`,
// q08 Scoreboard Descent Check
String.raw`#include <stdio.h>

int is_descending(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        if (arr[i - 1] < arr[i]) return 0;
    }
    return 1;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[2005];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("%d\n", is_descending(arr, n));
    return 0;
}`,
// q09 Insert the New Runner Card
String.raw`#include <stdio.h>

void insert_last(int arr[], int n) {
    int key = arr[n - 1];
    int j = n - 2;
    while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
    }
    arr[j + 1] = key;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[2005];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    insert_last(arr, n);
    for (int i = 0; i < n; i++) printf(i ? " %d" : "%d", arr[i]);
    printf("\n");
    return 0;
}`,
// q10 Bubble State After K Passes (blacklist: qsort / whitelist: for)
String.raw`#include <stdio.h>

void bubble_k_passes(int arr[], int n, int k) {
    for (int p = 0; p < k; p++) {
        for (int i = 0; i + 1 < n; i++) {
            if (arr[i] > arr[i + 1]) {
                int t = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = t;
            }
        }
    }
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[105];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    int k;
    scanf("%d", &k);
    bubble_k_passes(arr, n, k);
    for (int i = 0; i < n; i++) printf(i ? " %d" : "%d", arr[i]);
    printf("\n");
    return 0;
}`,
// q11 Insertion Prefix Sort (blacklist: qsort / whitelist: for)
String.raw`#include <stdio.h>

void insertion_prefix(int arr[], int n, int k) {
    for (int i = 1; i <= k; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[105];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    int k;
    scanf("%d", &k);
    insertion_prefix(arr, n, k);
    for (int i = 0; i < n; i++) printf(i ? " %d" : "%d", arr[i]);
    printf("\n");
    return 0;
}`,
// q12 Selection Swap Count (blacklist: qsort / whitelist: for)
String.raw`#include <stdio.h>

int selection_swaps(int arr[], int n) {
    int swaps = 0;
    for (int i = 0; i + 1 < n; i++) {
        int best = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[best]) best = j;
        }
        if (best != i) {
            int t = arr[i];
            arr[i] = arr[best];
            arr[best] = t;
            swaps++;
        }
    }
    return swaps;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[2005];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("%d\n", selection_swaps(arr, n));
    return 0;
}`,
// q13 Sort Cards by Digit Sum (blacklist: qsort / whitelist: while)
String.raw`#include <stdio.h>

int digit_sum(int v) {
    int s = 0;
    while (v > 0) {
        s += v % 10;
        v /= 10;
    }
    return s;
}

void sort_by_digit_sum(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int ks = digit_sum(key);
        int j = i - 1;
        while (j >= 0 && digit_sum(arr[j]) > ks) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[1005];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    sort_by_digit_sum(arr, n);
    for (int i = 0; i < n; i++) printf(i ? " %d" : "%d", arr[i]);
    printf("\n");
    return 0;
}`,
// q14 Selection Pass Trace (blacklist: qsort / whitelist: for)
String.raw`#include <stdio.h>

void selection_pass(int arr[], int n, int start) {
    int best = start;
    for (int j = start + 1; j < n; j++) {
        if (arr[j] < arr[best]) best = j;
    }
    if (best != start) {
        int t = arr[start];
        arr[start] = arr[best];
        arr[best] = t;
    }
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[35];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    int k;
    scanf("%d", &k);
    for (int s = 0; s < k; s++) {
        selection_pass(arr, n, s);
        for (int i = 0; i < n; i++) printf(i ? " %d" : "%d", arr[i]);
        printf("\n");
    }
    return 0;
}`,
// q15 Comparison Count Report (blacklist: qsort / whitelist: while)
String.raw`#include <stdio.h>

void comparison_report(int arr[], int n, int *bubble, int *selection) {
    int cmp = 0;
    int end = n;
    while (end > 1) {
        int swapped = 0;
        int i = 0;
        while (i + 1 < end) {
            cmp++;
            if (arr[i] > arr[i + 1]) {
                int t = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = t;
                swapped = 1;
            }
            i++;
        }
        if (!swapped) break;
        end--;
    }
    *bubble = cmp;
    *selection = n * (n - 1) / 2;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[105];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    int b, s;
    comparison_report(arr, n, &b, &s);
    printf("%d %d\n", b, s);
    return 0;
}`,
// q16 Cocktail Shaker Sort (blacklist: qsort / whitelist: while)
String.raw`#include <stdio.h>

void cocktail_sort(int arr[], int n) {
    int lo = 0, hi = n - 1;
    int swapped = 1;
    while (swapped && lo < hi) {
        swapped = 0;
        int i = lo;
        while (i < hi) {
            if (arr[i] > arr[i + 1]) {
                int t = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = t;
                swapped = 1;
            }
            i++;
        }
        hi--;
        i = hi;
        while (i > lo) {
            if (arr[i - 1] > arr[i]) {
                int t = arr[i];
                arr[i] = arr[i - 1];
                arr[i - 1] = t;
                swapped = 1;
            }
            i--;
        }
        lo++;
    }
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[1005];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    cocktail_sort(arr, n);
    for (int i = 0; i < n; i++) printf(i ? " %d" : "%d", arr[i]);
    printf("\n");
    return 0;
}`,
// q17 Sort by Frequency Then Value (blacklist: qsort / whitelist: for)
String.raw`#include <stdio.h>

void frequency_sort(int arr[], int n) {
    int cnt[101];
    for (int v = 0; v <= 100; v++) cnt[v] = 0;
    for (int i = 0; i < n; i++) cnt[arr[i]]++;
    int idx = 0;
    for (int f = n; f >= 1; f--) {
        for (int v = 0; v <= 100; v++) {
            if (cnt[v] == f) {
                for (int r = 0; r < f; r++) arr[idx++] = v;
            }
        }
    }
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[1005];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    frequency_sort(arr, n);
    for (int i = 0; i < n; i++) printf(i ? " %d" : "%d", arr[i]);
    printf("\n");
    return 0;
}`,
// q18 Dutch Flag Weights (blacklist: qsort / whitelist: while)
String.raw`#include <stdio.h>

void sort_three_weights(int arr[], int n) {
    int low = 0, mid = 0, high = n - 1;
    while (mid <= high) {
        if (arr[mid] == 0) {
            int t = arr[low];
            arr[low] = arr[mid];
            arr[mid] = t;
            low++;
            mid++;
        } else if (arr[mid] == 1) {
            mid++;
        } else {
            int t = arr[mid];
            arr[mid] = arr[high];
            arr[high] = t;
            high--;
        }
    }
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[1005];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    sort_three_weights(arr, n);
    for (int i = 0; i < n; i++) printf(i ? " %d" : "%d", arr[i]);
    printf("\n");
    return 0;
}`,
// q19 Pancake Sort by Flips (blacklist: qsort / whitelist: reverse)
String.raw`#include <stdio.h>

void reverse(int arr[], int lo, int hi) {
    while (lo < hi) {
        int t = arr[lo];
        arr[lo] = arr[hi];
        arr[hi] = t;
        lo++;
        hi--;
    }
}

void pancake_sort(int arr[], int n) {
    for (int size = n; size > 1; size--) {
        int best = 0;
        for (int i = 1; i < size; i++) {
            if (arr[i] > arr[best]) best = i;
        }
        if (best != size - 1) {
            reverse(arr, 0, best);
            reverse(arr, 0, size - 1);
        }
    }
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[55];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    pancake_sort(arr, n);
    for (int i = 0; i < n; i++) printf(i ? " %d" : "%d", arr[i]);
    printf("\n");
    return 0;
}`,
];

const bank = JSON.parse(readFileSync("/home/z/tmp/dsa-export/dsa-c/day-06.code.json", "utf8"));
if (bank.questions.length !== SRC.length) throw new Error(`count mismatch day06`);
bank.questions.forEach((q, i) => { q.sourcecode = SRC[i]; });
writeFileSync("/home/z/my-project/scripts/dsa-c/data/day-06.code.json", JSON.stringify(bank, null, 2) + "\n");

const mcq = JSON.parse(readFileSync("/home/z/tmp/dsa-export/dsa-c/day-06.mcq.json", "utf8"));
writeFileSync("/home/z/my-project/scripts/dsa-c/data/day-06.mcq.json",
  JSON.stringify({ day: mcq.day, questions: mcq.questions.map(({ _id, ...rest }) => rest) }, null, 2) + "\n");
console.log("day-06 written:", bank.questions.length, "code,", mcq.questions.length, "mcq");
