// Day 08 — Recursion and Backtracking Basics: complete standalone C programs.
import { readFileSync, writeFileSync } from "node:fs";

const SRC = [
// q00 Recursive Factorial
String.raw`#include <stdio.h>

long long factorial(int n) {
    if (n <= 1) return 1;
    return (long long)n * factorial(n - 1);
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    printf("%lld\n", factorial(n));
    return 0;
}`,
// q01 Recursive Fibonacci
String.raw`#include <stdio.h>

long long fib(int n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    printf("%lld\n", fib(n));
    return 0;
}`,
// q02 Digit Sum by Recursion
String.raw`#include <stdio.h>

int digit_sum(int n) {
    if (n < 10) return n;
    return n % 10 + digit_sum(n / 10);
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    printf("%d\n", digit_sum(n));
    return 0;
}`,
// q03 Reverse a String Recursively
String.raw`#include <stdio.h>
#include <string.h>

void rev_rec(char s[], int lo, int hi) {
    if (lo >= hi) return;
    char t = s[lo];
    s[lo] = s[hi];
    s[hi] = t;
    rev_rec(s, lo + 1, hi - 1);
}

void reverse_string(char s[], int len) {
    rev_rec(s, 0, len - 1);
}

int main(void) {
    char s[100005];
    if (scanf("%100000s", s) != 1) return 0;
    int len = (int)strlen(s);
    reverse_string(s, len);
    printf("%s\n", s);
    return 0;
}`,
// q04 Recursive GCD
String.raw`#include <stdio.h>

long long gcd(long long a, long long b) {
    if (b == 0) return a;
    return gcd(b, a % b);
}

int main(void) {
    long long a, b;
    if (scanf("%lld %lld", &a, &b) != 2) return 0;
    printf("%lld\n", gcd(a, b));
    return 0;
}`,
// q05 Count All Subsets
String.raw`#include <stdio.h>

long long subset_count(int n) {
    if (n == 0) return 1;
    return 2 * subset_count(n - 1);
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    printf("%lld\n", subset_count(n));
    return 0;
}`,
// q06 Recursive Power Function
String.raw`#include <stdio.h>

long long power(int base, int exp) {
    if (exp == 0) return 1;
    return (long long)base * power(base, exp - 1);
}

int main(void) {
    int base, exp;
    if (scanf("%d %d", &base, &exp) != 2) return 0;
    printf("%lld\n", power(base, exp));
    return 0;
}`,
// q07 Ticket Code Palindrome
String.raw`#include <stdio.h>
#include <string.h>

int pal_rec(char s[], int lo, int hi) {
    if (lo >= hi) return 1;
    if (s[lo] != s[hi]) return 0;
    return pal_rec(s, lo + 1, hi - 1);
}

int is_palindrome(char s[], int len) {
    return pal_rec(s, 0, len - 1);
}

int main(void) {
    char s[100005];
    if (scanf("%100000s", s) != 1) return 0;
    int len = (int)strlen(s);
    printf("%d\n", is_palindrome(s, len));
    return 0;
}`,
// q08 Sensor Batch Total
String.raw`#include <stdio.h>

long long array_sum(int arr[], int n) {
    if (n == 0) return 0;
    return (long long)arr[n - 1] + array_sum(arr, n - 1);
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[1005];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("%lld\n", array_sum(arr, n));
    return 0;
}`,
// q09 Peak Load Finder
String.raw`#include <stdio.h>

int array_max(int arr[], int n) {
    if (n == 1) return arr[0];
    int rest = array_max(arr, n - 1);
    return arr[n - 1] > rest ? arr[n - 1] : rest;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[1005];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("%d\n", array_max(arr, n));
    return 0;
}`,
// q10 Count Subsets Summing to S (blacklist: for,while / whitelist: count_subsets_sum()
String.raw`#include <stdio.h>

void read_vals(int arr[], int i, int n) {
    if (i == n) return;
    scanf("%d", &arr[i]);
    read_vals(arr, i + 1, n);
}

int dfs(int arr[], int idx, int n, int S) {
    if (idx == n) return S == 0 ? 1 : 0;
    return dfs(arr, idx + 1, n, S - arr[idx]) + dfs(arr, idx + 1, n, S);
}

int count_subsets_sum(int arr[], int n, int S) {
    return dfs(arr, 0, n, S);
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[25];
    read_vals(arr, 0, n);
    int S;
    scanf("%d", &S);
    printf("%d\n", count_subsets_sum(arr, n, S));
    return 0;
}`,
// q11 Tower of Hanoi Moves (blacklist: for,while / whitelist: hanoi()
String.raw`#include <stdio.h>

void hanoi(int n, char from, char to, char aux) {
    if (n == 0) return;
    hanoi(n - 1, from, aux, to);
    printf("disk %d: %c->%c\n", n, from, to);
    hanoi(n - 1, aux, to, from);
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    hanoi(n, 'A', 'C', 'B');
    return 0;
}`,
// q12 Distinct Permutations of a Multiset (blacklist: qsort / whitelist: for)
String.raw`#include <stdio.h>

long long factv[13];

long long distinct_perms(int arr[], int n) {
    long long result = factv[n];
    for (int i = 0; i < n; i++) {
        int dup = 0;
        for (int j = 0; j < i; j++) {
            if (arr[j] == arr[i]) dup = 1;
        }
        if (dup) continue;
        long long c = 0;
        for (int j = 0; j < n; j++) {
            if (arr[j] == arr[i]) c++;
        }
        result /= factv[c];
    }
    return result;
}

int main(void) {
    factv[0] = 1;
    for (int i = 1; i <= 12; i++) factv[i] = factv[i - 1] * i;
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[15];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("%lld\n", distinct_perms(arr, n));
    return 0;
}`,
// q13 Fibonacci Call Counter (blacklist: for,while / whitelist: fib_calls()
String.raw`#include <stdio.h>

long long fib_calls(int n) {
    if (n <= 1) return 1;
    return 1 + fib_calls(n - 1) + fib_calls(n - 2);
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    printf("%lld\n", fib_calls(n));
    return 0;
}`,
// q14 Recursive Binary Search (blacklist: for,while / whitelist: rbsearch()
String.raw`#include <stdio.h>

void read_vals(int arr[], int i, int n) {
    if (i == n) return;
    scanf("%d", &arr[i]);
    read_vals(arr, i + 1, n);
}

int rbsearch(int arr[], int lo, int hi, int target) {
    if (lo > hi) return -1;
    int mid = lo + (hi - lo) / 2;
    if (arr[mid] == target) return mid;
    if (arr[mid] > target) return rbsearch(arr, lo, mid - 1, target);
    return rbsearch(arr, mid + 1, hi, target);
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[10005];
    read_vals(arr, 0, n);
    int target;
    scanf("%d", &target);
    printf("%d\n", rbsearch(arr, 0, n - 1, target));
    return 0;
}`,
// q15 Print Permutations in Lex Order (blacklist: qsort / whitelist: permute()
String.raw`#include <stdio.h>

int used_m[8];
int path_m[8];

void emit_line(int d) {
    for (int i = 0; i < d; i++) printf(i ? " %d" : "%d", path_m[i]);
    printf("\n");
}

void rec(int arr[], int n, int d) {
    if (d == n) {
        emit_line(n);
        return;
    }
    for (int i = 0; i < n; i++) {
        if (!used_m[i]) {
            used_m[i] = 1;
            path_m[d] = arr[i];
            rec(arr, n, d + 1);
            used_m[i] = 0;
        }
    }
}

void permute(int arr[], int n) {
    rec(arr, n, 0);
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[8];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    permute(arr, n);
    return 0;
}`,
// q16 Permutation Rank in Lex Order (blacklist: qsort / whitelist: for)
String.raw`#include <stdio.h>

long long perm_rank(int arr[], int n) {
    int used_v[13];
    for (int v = 0; v <= n; v++) used_v[v] = 0;
    long long fact[13];
    fact[0] = 1;
    for (int i = 1; i <= n; i++) fact[i] = fact[i - 1] * i;
    long long rank = 1;
    for (int i = 0; i < n; i++) {
        int c = 0;
        for (int v = 1; v < arr[i]; v++) {
            if (!used_v[v]) c++;
        }
        used_v[arr[i]] = 1;
        rank += (long long)c * fact[n - 1 - i];
    }
    return rank;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[13];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("%lld\n", perm_rank(arr, n));
    return 0;
}`,
// q17 Print Subsets With Sum S (blacklist: for,while / whitelist: subsets_sum()
String.raw`#include <stdio.h>

int g_count;
int buf_s[16];

void read_vals(int arr[], int i, int n) {
    if (i == n) return;
    scanf("%d", &arr[i]);
    read_vals(arr, i + 1, n);
}

void emit_line(int d, int i) {
    if (i == d) {
        putchar('\n');
        return;
    }
    if (i) putchar(' ');
    printf("%d", buf_s[i]);
    emit_line(d, i + 1);
}

void count_dfs(int arr[], int n, int idx, int sum, int S) {
    if (idx == n) {
        if (sum == S) g_count++;
        return;
    }
    count_dfs(arr, n, idx + 1, sum + arr[idx], S);
    count_dfs(arr, n, idx + 1, sum, S);
}

void print_dfs(int arr[], int n, int idx, int sum, int S, int d) {
    if (idx == n) {
        if (sum == S) emit_line(d, 0);
        return;
    }
    buf_s[d] = arr[idx];
    print_dfs(arr, n, idx + 1, sum + arr[idx], S, d + 1);
    print_dfs(arr, n, idx + 1, sum, S, d);
}

void subsets_sum(int arr[], int n, int S) {
    g_count = 0;
    count_dfs(arr, n, 0, 0, S);
    printf("%d\n", g_count);
    print_dfs(arr, n, 0, 0, S, 0);
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[15];
    read_vals(arr, 0, n);
    int S;
    scanf("%d", &S);
    subsets_sum(arr, n, S);
    return 0;
}`,
// q18 N-Queens Solution Count (blacklist: qsort / whitelist: nqueens()
String.raw`#include <stdio.h>

int cols_q[8], dg1[16], dg2[16];

int rec(int row, int n) {
    if (row == n) return 1;
    int total = 0;
    for (int c = 0; c < n; c++) {
        if (cols_q[c] || dg1[row + c] || dg2[row - c + 7]) continue;
        cols_q[c] = 1;
        dg1[row + c] = 1;
        dg2[row - c + 7] = 1;
        total += rec(row + 1, n);
        cols_q[c] = 0;
        dg1[row + c] = 0;
        dg2[row - c + 7] = 0;
    }
    return total;
}

int nqueens(int n) {
    return rec(0, n);
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    printf("%d\n", nqueens(n));
    return 0;
}`,
// q19 Balanced Bracket Sequences (blacklist: for,while / whitelist: brackets()
String.raw`#include <stdio.h>

char buf_b[16];

void gen(int pos, int open, int close, int n) {
    if (pos == 2 * n) {
        buf_b[pos] = '\0';
        fputs(buf_b, stdout);
        putchar('\n');
        return;
    }
    if (open < n) {
        buf_b[pos] = '(';
        gen(pos + 1, open + 1, close, n);
    }
    if (close < open) {
        buf_b[pos] = ')';
        gen(pos + 1, open, close + 1, n);
    }
}

void brackets(int n) {
    gen(0, 0, 0, n);
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    brackets(n);
    return 0;
}`,
];

const bank = JSON.parse(readFileSync("/home/z/tmp/dsa-export/dsa-c/day-08.code.json", "utf8"));
if (bank.questions.length !== SRC.length) throw new Error(`count mismatch day08`);
bank.questions.forEach((q, i) => { q.sourcecode = SRC[i]; });
writeFileSync("/home/z/my-project/scripts/dsa-c/data/day-08.code.json", JSON.stringify(bank, null, 2) + "\n");

const mcq = JSON.parse(readFileSync("/home/z/tmp/dsa-export/dsa-c/day-08.mcq.json", "utf8"));
writeFileSync("/home/z/my-project/scripts/dsa-c/data/day-08.mcq.json",
  JSON.stringify({ day: mcq.day, questions: mcq.questions.map(({ _id, ...rest }) => rest) }, null, 2) + "\n");
console.log("day-08 written:", bank.questions.length, "code,", mcq.questions.length, "mcq");
