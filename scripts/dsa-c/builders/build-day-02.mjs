// Day 02 — Loops & Complexity Analysis: complete standalone C programs.
import { readFileSync, writeFileSync } from "node:fs";

const SRC = [
// q00 Count Doubling Loop Iterations
String.raw`#include <stdio.h>

int doubling_iterations(int n) {
    int count = 0;
    long long i = 1;
    while (i < n) {
        i *= 2;
        count++;
    }
    return count;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    printf("%d\n", doubling_iterations(n));
    return 0;
}`,
// q01 Stride Loop Step Count
String.raw`#include <stdio.h>

int stride_steps(int n, int k) {
    int count = 0;
    for (long long i = 0; i < n; i += k) {
        count++;
    }
    return count;
}

int main(void) {
    int n, k;
    if (scanf("%d %d", &n, &k) != 2) return 0;
    printf("%d\n", stride_steps(n, k));
    return 0;
}`,
// q02 Triangle Loop Work
String.raw`#include <stdio.h>

long long triangle_work(int n) {
    long long count = 0;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < i; j++) {
            count++;
        }
    }
    return count;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    printf("%lld\n", triangle_work(n));
    return 0;
}`,
// q03 Halving Loop Count
String.raw`#include <stdio.h>

int halvings(int n) {
    int count = 0;
    while (n > 1) {
        n = n / 2;
        count++;
    }
    return count;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    printf("%d\n", halvings(n));
    return 0;
}`,
// q04 Shrinking Loop by Three
String.raw`#include <stdio.h>

int shrink_steps(int n) {
    int count = 0;
    for (int i = n; i > 0; i -= 3) {
        count++;
    }
    return count;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    printf("%d\n", shrink_steps(n));
    return 0;
}`,
// q05 Worst Case Scan Comparisons
String.raw`#include <stdio.h>

int scan_comparisons(int n, int target_pos) {
    int count = 0;
    for (int i = 1; i <= n; i++) {
        count++;
        if (i == target_pos) {
            break;
        }
    }
    return count;
}

int main(void) {
    int n, target_pos;
    if (scanf("%d %d", &n, &target_pos) != 2) return 0;
    printf("%d\n", scan_comparisons(n, target_pos));
    return 0;
}`,
// q06 Campus Application Growth Gap
String.raw`#include <stdio.h>

long long growth_gap(int n) {
    return (long long)n * n - n;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    printf("%lld\n", growth_gap(n));
    return 0;
}`,
// q07 Library Capacity Doublings
String.raw`#include <stdio.h>

void capacity_plan(int n, int *doublings, int *capacity) {
    int cap = 1;
    int d = 0;
    while (cap < n) {
        cap *= 2;
        d++;
    }
    *doublings = d;
    *capacity = cap;
}

int main(void) {
    int n, d, cap;
    if (scanf("%d", &n) != 1) return 0;
    capacity_plan(n, &d, &cap);
    printf("%d %d\n", d, cap);
    return 0;
}`,
// q08 Stack Frames for Recursive Cleanup
String.raw`#include <stdio.h>

int stack_frames(int n) {
    if (n <= 1) return 1;
    return 1 + stack_frames(n / 2);
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    printf("%d\n", stack_frames(n));
    return 0;
}`,
// q09 Trainer Guessing Lower Bound
String.raw`#include <stdio.h>

int guess_steps(int m) {
    int count = 0;
    long long range = m;
    while (range > 1) {
        range = (range + 1) / 2;
        count++;
    }
    return count;
}

int main(void) {
    int m;
    if (scanf("%d", &m) != 1) return 0;
    printf("%d\n", guess_steps(m));
    return 0;
}`,
// q10 Key-Value Store Rehash Plan (blacklist: for / whitelist: while)
String.raw`#include <stdio.h>

void rehash_plan(int n, int *doublings, int *capacity) {
    int cap = 8;
    int d = 0;
    while (n > cap) {
        cap *= 2;
        d++;
    }
    *doublings = d;
    *capacity = cap;
}

int main(void) {
    int n, d, cap;
    if (scanf("%d", &n) != 1) return 0;
    rehash_plan(n, &d, &cap);
    printf("%d %d\n", d, cap);
    return 0;
}`,
// q11 Loop Shape Dominance Report (blacklist: pow / whitelist: long long)
String.raw`#include <stdio.h>

const char *dominant_shape(int n, long long *sq, long long *cb) {
    *sq = (long long)n * n;
    *cb = (long long)n * n * n;
    if (*sq == *cb) return "TIE";
    if (*cb > *sq) return "CUBE";
    return "SQUARE";
}

int main(void) {
    int n;
    long long sq, cb;
    if (scanf("%d", &n) != 1) return 0;
    const char *name = dominant_shape(n, &sq, &cb);
    printf("%lld %lld %s\n", sq, cb, name);
    return 0;
}`,
// q12 Sensor Sampling Report (blacklist: while / whitelist: for)
String.raw`#include <stdio.h>

void sample_report(int n, int k, int *samples, int *skipped) {
    int count = 0;
    for (int i = 0; i < n; i += k) {
        count++;
    }
    *samples = count;
    *skipped = n - count;
}

int main(void) {
    int n, k, samples, skipped;
    if (scanf("%d %d", &n, &k) != 2) return 0;
    sample_report(n, k, &samples, &skipped);
    printf("%d %d\n", samples, skipped);
    return 0;
}`,
// q13 Auxiliary Space Ledger (blacklist: malloc / whitelist: sizeof)
String.raw`#include <stdio.h>

void space_report(int n, int *copy_bytes, int *inplace_bytes) {
    *copy_bytes = n * (int)sizeof(int);
    *inplace_bytes = 2 * (int)sizeof(int);
}

int main(void) {
    int n, copy_bytes, inplace_bytes;
    if (scanf("%d", &n) != 1) return 0;
    space_report(n, &copy_bytes, &inplace_bytes);
    printf("%d %d\n", copy_bytes, inplace_bytes);
    return 0;
}`,
// q14 Guessing Game Lower Bound (blacklist: for / whitelist: while)
String.raw`#include <stdio.h>

int lower_bound_guesses(int m) {
    int count = 0;
    long long r = m;
    while (r > 0) {
        r /= 2;
        count++;
    }
    return count;
}

int main(void) {
    int m;
    if (scanf("%d", &m) != 1) return 0;
    printf("%d\n", lower_bound_guesses(m));
    return 0;
}`,
// q15 Triangle Work Budget (blacklist: sqrt / whitelist: while)
String.raw`#include <stdio.h>

int max_n_for_budget(long long B) {
    long long n = 1;
    while ((n + 1) * n / 2 <= B) {
        n++;
    }
    return (int)n;
}

int main(void) {
    long long B;
    if (scanf("%lld", &B) != 1) return 0;
    printf("%d\n", max_n_for_budget(B));
    return 0;
}`,
// q16 Amortized Rebuild Copy Ledger (blacklist: pow / whitelist: while)
String.raw`#include <stdio.h>

void amortized_copies(int n, long long *copies, int *capacity) {
    long long total = 0;
    int cap = 1;
    int i = 1;
    while (i <= n) {
        if (i > cap) {
            total += cap;
            cap *= 2;
        }
        i++;
    }
    *copies = total;
    *capacity = cap;
}

int main(void) {
    int n, cap;
    long long copies;
    if (scanf("%d", &n) != 1) return 0;
    amortized_copies(n, &copies, &cap);
    printf("%lld %d\n", copies, cap);
    return 0;
}`,
// q17 Factorial Growth Threshold (blacklist: pow / whitelist: while)
String.raw`#include <stdio.h>

void factorial_threshold(long long L, int *k, long long *fact) {
    int kk = 0;
    long long f = 1;
    while (f <= L) {
        kk++;
        f *= kk;
    }
    *k = kk;
    *fact = f;
}

int main(void) {
    long long L, f;
    int k;
    if (scanf("%lld", &L) != 1) return 0;
    factorial_threshold(L, &k, &f);
    printf("%d %lld\n", k, f);
    return 0;
}`,
// q18 Nested Halving Work Count (blacklist: while / whitelist: for)
String.raw`#include <stdio.h>

long long nested_halving_work(int n) {
    long long count = 0;
    for (int i = 1; i <= n; i++) {
        for (int j = i; j > 0; j /= 2) {
            count++;
        }
    }
    return count;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    printf("%lld\n", nested_halving_work(n));
    return 0;
}`,
// q19 Halving Sum Trace (blacklist: pow / whitelist: while)
String.raw`#include <stdio.h>

void halving_trace(int n, long long *sum, int *steps) {
    long long total = 0;
    int count = 0;
    long long v = n;
    while (v > 0) {
        total += v;
        v /= 2;
        count++;
    }
    *sum = total;
    *steps = count;
}

int main(void) {
    int n, steps;
    long long sum;
    if (scanf("%d", &n) != 1) return 0;
    halving_trace(n, &sum, &steps);
    printf("%lld %d\n", sum, steps);
    return 0;
}`,
];

const bank = JSON.parse(readFileSync("/home/z/tmp/dsa-export/dsa-c/day-02.code.json", "utf8"));
if (bank.questions.length !== SRC.length) throw new Error(`count mismatch day02`);
bank.questions.forEach((q, i) => { q.sourcecode = SRC[i]; });
writeFileSync("/home/z/my-project/scripts/dsa-c/data/day-02.code.json", JSON.stringify(bank, null, 2) + "\n");

const mcq = JSON.parse(readFileSync("/home/z/tmp/dsa-export/dsa-c/day-02.mcq.json", "utf8"));
writeFileSync("/home/z/my-project/scripts/dsa-c/data/day-02.mcq.json",
  JSON.stringify({ day: mcq.day, questions: mcq.questions.map(({ _id, ...rest }) => rest) }, null, 2) + "\n");
console.log("day-02 written:", bank.questions.length, "code,", mcq.questions.length, "mcq");
