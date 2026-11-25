import { readFileSync, writeFileSync } from "node:fs";

const SRC = "/home/z/tmp/dsa-export/dsa-c/day-13.code.json";
const DST = "/home/z/my-project/scripts/dsa-c/data/day-13.code.json";

const data = JSON.parse(readFileSync(SRC, "utf8"));
const codes = [];

// Q0 String Hash to a Slot
codes.push(String.raw`#include <stdio.h>

int hash_key(const char *key) {
    int sum = 0;
    for (int i = 0; key[i]; i++) {
        sum += key[i];
    }
    return sum % 101;
}

int main(void) {
    char key[105];
    if (scanf("%100s", key) != 1) return 0;
    printf("%d\n", hash_key(key));
    return 0;
}`);

// Q1 Integer Hash to a Slot
codes.push(String.raw`#include <stdio.h>

int hash_int(int v) {
    return v % 101;
}

int main(void) {
    int v;
    if (scanf("%d", &v) != 1) return 0;
    printf("%d\n", hash_int(v));
    return 0;
}`);

// Q2 Frequency of a Target Value
codes.push(String.raw`#include <stdio.h>

int count_target(const int *arr, int n, int target) {
    int count = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) count++;
    }
    return count;
}

int main(void) {
    int n, target;
    if (scanf("%d", &n) != 1) return 0;
    int arr[2005];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    scanf("%d", &target);
    printf("%d\n", count_target(arr, n, target));
    return 0;
}`);

// Q3 Lookup: Is the Key Present
codes.push(String.raw`#include <stdio.h>

int contains(const int *arr, int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) return 1;
    }
    return 0;
}

int main(void) {
    int n, target;
    if (scanf("%d", &n) != 1) return 0;
    int arr[2005];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    scanf("%d", &target);
    puts(contains(arr, n, target) ? "YES" : "NO");
    return 0;
}`);

// Q4 Any Duplicate Present
codes.push(String.raw`#include <stdio.h>

int has_duplicate(const int *arr, int n) {
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (arr[i] == arr[j]) return 1;
        }
    }
    return 0;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[505];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    puts(has_duplicate(arr, n) ? "YES" : "NO");
    return 0;
}`);

// Q5 Collision Slot Check
codes.push(String.raw`#include <stdio.h>

int same_slot(int a, int b) {
    return (a % 101) == (b % 101);
}

int main(void) {
    int a, b;
    if (scanf("%d %d", &a, &b) != 2) return 0;
    puts(same_slot(a, b) ? "YES" : "NO");
    return 0;
}`);

// Q6 Playlist Replay Count
codes.push(String.raw`#include <stdio.h>

int play_count(const int *log, int n, int track) {
    int count = 0;
    for (int i = 0; i < n; i++) {
        if (log[i] == track) count++;
    }
    return count;
}

int main(void) {
    int n, track;
    if (scanf("%d", &n) != 1) return 0;
    int log[2005];
    for (int i = 0; i < n; i++) scanf("%d", &log[i]);
    scanf("%d", &track);
    printf("%d\n", play_count(log, n, track));
    return 0;
}`);

// Q7 Duplicate Receipt Numbers
codes.push(String.raw`#include <stdio.h>

int duplicate_receipt(const int *ids, int n) {
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (ids[i] == ids[j]) return 1;
        }
    }
    return 0;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int ids[505];
    for (int i = 0; i < n; i++) scanf("%d", &ids[i]);
    puts(duplicate_receipt(ids, n) ? "YES" : "NO");
    return 0;
}`);

// Q8 Locker Slot Assignment
codes.push(String.raw`#include <stdio.h>

int locker_slot(int studentId) {
    return studentId % 101;
}

int main(void) {
    int studentId;
    if (scanf("%d", &studentId) != 1) return 0;
    printf("%d\n", locker_slot(studentId));
    return 0;
}`);

// Q9 Busy Slots in the Locker Room
codes.push(String.raw`#include <stdio.h>

int occupied_slots(const int *ids, int n) {
    int seen[101] = {0};
    for (int i = 0; i < n; i++) {
        seen[ids[i] % 101] = 1;
    }
    int count = 0;
    for (int s = 0; s < 101; s++) {
        if (seen[s]) count++;
    }
    return count;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int ids[2005];
    for (int i = 0; i < n; i++) scanf("%d", &ids[i]);
    printf("%d\n", occupied_slots(ids, n));
    return 0;
}`);

// ---- printf blacklisted from here: use putchar/puts emitters ----

// Q10 First Duplicate in a Scan
codes.push(String.raw`#include <stdio.h>

void emit_int(int x) {
    char buf[13];
    int k = 0;
    if (x < 0) { putchar('-'); x = -x; }
    do { buf[k++] = (char)('0' + x % 10); x /= 10; } while (x);
    while (k > 0) putchar(buf[--k]);
}

int first_duplicate(const int *arr, int n) {
    int seen[1001] = {0};
    for (int i = 0; i < n; i++) {
        if (seen[arr[i]]) return arr[i];
        seen[arr[i]] = 1;
    }
    return -1;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[1005];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    emit_int(first_duplicate(arr, n));
    putchar('\n');
    return 0;
}`);

// Q11 Transaction Pairs with a Target Sum
codes.push(String.raw`#include <stdio.h>

void emit_int(int x) {
    char buf[13];
    int k = 0;
    if (x < 0) { putchar('-'); x = -x; }
    do { buf[k++] = (char)('0' + x % 10); x /= 10; } while (x);
    while (k > 0) putchar(buf[--k]);
}

int count_pairs(const int *arr, int n, int target) {
    int freq[101] = {0};
    int count = 0;
    for (int i = 0; i < n; i++) {
        int need = target - arr[i];
        if (need >= -50 && need <= 50) count += freq[need + 50];
        freq[arr[i] + 50]++;
    }
    return count;
}

int main(void) {
    int n, target;
    if (scanf("%d", &n) != 1) return 0;
    int arr[1005];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    scanf("%d", &target);
    emit_int(count_pairs(arr, n, target));
    putchar('\n');
    return 0;
}`);

// Q12 Letter Frequency Histogram
codes.push(String.raw`#include <stdio.h>

void emit_int(int x) {
    char buf[13];
    int k = 0;
    if (x < 0) { putchar('-'); x = -x; }
    do { buf[k++] = (char)('0' + x % 10); x /= 10; } while (x);
    while (k > 0) putchar(buf[--k]);
}

void char_counts(const char *s, int *out) {
    int freq[26] = {0};
    for (int i = 0; s[i]; i++) {
        freq[s[i] - 'a']++;
    }
    for (int c = 0; c < 26; c++) {
        out[c] = freq[c];
    }
}

int main(void) {
    char s[1005];
    if (scanf("%1000s", s) != 1) return 0;
    int out[26];
    char_counts(s, out);
    int first = 1;
    for (int c = 0; c < 26; c++) {
        if (out[c] > 0) {
            if (!first) putchar(' ');
            first = 0;
            putchar((char)('a' + c));
            putchar(':');
            emit_int(out[c]);
        }
    }
    putchar('\n');
    return 0;
}`);

// Q13 Most Frequent Sensor Value
codes.push(String.raw`#include <stdio.h>

void emit_int(int x) {
    char buf[13];
    int k = 0;
    if (x < 0) { putchar('-'); x = -x; }
    do { buf[k++] = (char)('0' + x % 10); x /= 10; } while (x);
    while (k > 0) putchar(buf[--k]);
}

int most_frequent(const int *arr, int n) {
    int freq[101] = {0};
    for (int i = 0; i < n; i++) freq[arr[i] + 50]++;
    int best = -51, bestCount = 0;
    for (int v = -50; v <= 50; v++) {
        if (freq[v + 50] > bestCount) {
            bestCount = freq[v + 50];
            best = v;
        }
    }
    return best;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[1005];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    emit_int(most_frequent(arr, n));
    putchar('\n');
    return 0;
}`);

// Q14 Pharmacy Label Anagram Check
codes.push(String.raw`#include <stdio.h>

int is_anagram(const char *a, const char *b) {
    int freq[26] = {0};
    int la = 0, lb = 0;
    while (a[la]) la++;
    while (b[lb]) lb++;
    if (la != lb) return 0;
    for (int i = 0; i < la; i++) freq[a[i] - 'a']++;
    for (int i = 0; i < lb; i++) {
        freq[b[i] - 'a']--;
        if (freq[b[i] - 'a'] < 0) return 0;
    }
    return 1;
}

int main(void) {
    char a[105], b[105];
    if (scanf("%100s %100s", a, b) != 2) return 0;
    puts(is_anagram(a, b) ? "YES" : "NO");
    return 0;
}`);

// Q15 Distinct Inventory Codes
codes.push(String.raw`#include <stdio.h>

void emit_int(int x) {
    char buf[13];
    int k = 0;
    if (x < 0) { putchar('-'); x = -x; }
    do { buf[k++] = (char)('0' + x % 10); x /= 10; } while (x);
    while (k > 0) putchar(buf[--k]);
}

int distinct_count(const int *arr, int n) {
    int seen[101] = {0};
    for (int i = 0; i < n; i++) seen[arr[i] + 50] = 1;
    int count = 0;
    for (int v = 0; v <= 100; v++) {
        if (seen[v]) count++;
    }
    return count;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[1005];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    emit_int(distinct_count(arr, n));
    putchar('\n');
    return 0;
}`);

// Q16 Fraud Pair: Two-Sum Indices
codes.push(String.raw`#include <stdio.h>

void emit_int(int x) {
    char buf[13];
    int k = 0;
    if (x < 0) { putchar('-'); x = -x; }
    do { buf[k++] = (char)('0' + x % 10); x /= 10; } while (x);
    while (k > 0) putchar(buf[--k]);
}

void two_sum(const int *arr, int n, int target, int *out) {
    int seen[201] = {0};
    for (int i = 0; i < n; i++) {
        int need = target - arr[i];
        if (need >= -100 && need <= 100 && seen[need + 100]) {
            out[0] = seen[need + 100] - 1;
            out[1] = i;
            return;
        }
        seen[arr[i] + 100] = i + 1;
    }
}

int main(void) {
    int n, target;
    if (scanf("%d", &n) != 1) return 0;
    int arr[1005], out[2];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    scanf("%d", &target);
    out[0] = -1;
    out[1] = -1;
    two_sum(arr, n, target, out);
    emit_int(out[0]);
    putchar(' ');
    emit_int(out[1]);
    putchar('\n');
    return 0;
}`);

// Q17 Union and Intersection Counts
codes.push(String.raw`#include <stdio.h>

void emit_int(int x) {
    char buf[13];
    int k = 0;
    if (x < 0) { putchar('-'); x = -x; }
    do { buf[k++] = (char)('0' + x % 10); x /= 10; } while (x);
    while (k > 0) putchar(buf[--k]);
}

void union_intersection(const int *a, int n, const int *b, int m, int *out) {
    int freqA[101] = {0}, freqB[101] = {0};
    for (int i = 0; i < n; i++) freqA[a[i] + 50] = 1;
    for (int j = 0; j < m; j++) freqB[b[j] + 50] = 1;
    int uni = 0, inter = 0;
    for (int v = 0; v <= 100; v++) {
        if (freqA[v] || freqB[v]) uni++;
        if (freqA[v] && freqB[v]) inter++;
    }
    out[0] = uni;
    out[1] = inter;
}

int main(void) {
    int n, m;
    if (scanf("%d", &n) != 1) return 0;
    int a[1005], b[1005], out[2];
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    scanf("%d", &m);
    for (int j = 0; j < m; j++) scanf("%d", &b[j]);
    union_intersection(a, n, b, m, out);
    emit_int(out[0]);
    putchar(' ');
    emit_int(out[1]);
    putchar('\n');
    return 0;
}`);

// Q18 Longest Consecutive Version Run
codes.push(String.raw`#include <stdio.h>

void emit_int(int x) {
    char buf[13];
    int k = 0;
    if (x < 0) { putchar('-'); x = -x; }
    do { buf[k++] = (char)('0' + x % 10); x /= 10; } while (x);
    while (k > 0) putchar(buf[--k]);
}

int longest_consecutive(const int *arr, int n) {
    int seen[201] = {0};
    for (int i = 0; i < n; i++) seen[arr[i] + 100] = 1;
    int best = 0, run = 0;
    for (int v = -100; v <= 100; v++) {
        if (seen[v + 100]) {
            run++;
            if (run > best) best = run;
        } else {
            run = 0;
        }
    }
    return best;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[1005];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    emit_int(longest_consecutive(arr, n));
    putchar('\n');
    return 0;
}`);

// Q19 Sensor Drift: Subarrays with Target Sum
codes.push(String.raw`#include <stdio.h>

void emit_int(int x) {
    char buf[13];
    int k = 0;
    if (x < 0) { putchar('-'); x = -x; }
    do { buf[k++] = (char)('0' + x % 10); x /= 10; } while (x);
    while (k > 0) putchar(buf[--k]);
}

int subarray_sum_count(const int *arr, int n, int k) {
    int freq[20001];
    for (int i = 0; i <= 20000; i++) freq[i] = 0;
    int pre = 0, count = 0;
    freq[10000] = 1;
    for (int i = 0; i < n; i++) {
        pre += arr[i];
        int need = pre - k;
        if (need >= -10000 && need <= 10000) count += freq[need + 10000];
        freq[pre + 10000]++;
    }
    return count;
}

int main(void) {
    int n, k;
    if (scanf("%d", &n) != 1) return 0;
    int arr[505];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    scanf("%d", &k);
    emit_int(subarray_sum_count(arr, n, k));
    putchar('\n');
    return 0;
}`);

if (codes.length !== data.questions.length) {
  throw new Error("count mismatch: codes=" + codes.length + " questions=" + data.questions.length);
}
data.questions.forEach((q, i) => { q.sourcecode = codes[i]; });
writeFileSync(DST, JSON.stringify(data, null, 2));
console.log("wrote", DST);
