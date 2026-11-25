import { readFileSync, writeFileSync } from "node:fs";

const SRC = "/home/z/tmp/dsa-export/dsa-c/day-11.code.json";
const DST = "/home/z/my-project/scripts/dsa-c/data/day-11.code.json";

const data = JSON.parse(readFileSync(SRC, "utf8"));
const codes = [];

// Q0 Top of the Stack
codes.push(String.raw`#include <stdio.h>

int stack_top(const int *stk, int top) {
    return stk[top];
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int stk[2005];
    for (int i = 0; i < n; i++) scanf("%d", &stk[i]);
    printf("%d\n", stack_top(stk, n - 1));
    return 0;
}`);

// Q1 Pop Order of a Stack
codes.push(String.raw`#include <stdio.h>

void pop_order(const int *stk, int top, int *out) {
    for (int j = 0; j <= top; j++) {
        out[j] = stk[top - j];
    }
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int stk[2005], out[2005];
    for (int i = 0; i < n; i++) scanf("%d", &stk[i]);
    pop_order(stk, n - 1, out);
    for (int j = 0; j < n; j++) printf("%d%c", out[j], (j + 1 < n) ? ' ' : '\n');
    return 0;
}`);

// Q2 Peek the k-th Element from Top
codes.push(String.raw`#include <stdio.h>

int peek_k(const int *stk, int top, int k) {
    return stk[top - k];
}

int main(void) {
    int n, k;
    if (scanf("%d", &n) != 1) return 0;
    int stk[2005];
    for (int i = 0; i < n; i++) scanf("%d", &stk[i]);
    scanf("%d", &k);
    printf("%d\n", peek_k(stk, n - 1, k));
    return 0;
}`);

// Q3 Sum of Stack Elements
codes.push(String.raw`#include <stdio.h>

int stack_sum(const int *stk, int top) {
    int total = 0;
    for (int i = 0; i <= top; i++) {
        total += stk[i];
    }
    return total;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int stk[2005];
    for (int i = 0; i < n; i++) scanf("%d", &stk[i]);
    printf("%d\n", stack_sum(stk, n - 1));
    return 0;
}`);

// Q4 Balanced Round Brackets
codes.push(String.raw`#include <stdio.h>

int is_balanced(const char *s) {
    int open = 0;
    for (int i = 0; s[i]; i++) {
        if (s[i] == '(') {
            open++;
        } else {
            open--;
            if (open < 0) return 0;
        }
    }
    return open == 0;
}

int main(void) {
    char s[1005];
    if (scanf("%1000s", s) != 1) return 0;
    puts(is_balanced(s) ? "YES" : "NO");
    return 0;
}`);

// Q5 Elements Remaining After Pops
codes.push(String.raw`#include <stdio.h>

int remaining(int pushed, int popped) {
    return pushed - popped;
}

int main(void) {
    int pushed, popped;
    if (scanf("%d %d", &pushed, &popped) != 2) return 0;
    printf("%d\n", remaining(pushed, popped));
    return 0;
}`);

// Q6 Text Editor Undo History
codes.push(String.raw`#include <stdio.h>

int undo_top(const int *actions, int n, int undos) {
    if (undos >= n) return -1;
    return actions[n - 1 - undos];
}

int main(void) {
    int n, undos;
    if (scanf("%d", &n) != 1) return 0;
    int actions[2005];
    for (int i = 0; i < n; i++) scanf("%d", &actions[i]);
    scanf("%d", &undos);
    printf("%d\n", undo_top(actions, n, undos));
    return 0;
}`);

// Q7 Browser Back Button
codes.push(String.raw`#include <stdio.h>

int current_page(const int *history, int n, int backs) {
    if (backs >= n) return -1;
    return history[n - 1 - backs];
}

int main(void) {
    int n, backs;
    if (scanf("%d", &n) != 1) return 0;
    int history[2005];
    for (int i = 0; i < n; i++) scanf("%d", &history[i]);
    scanf("%d", &backs);
    printf("%d\n", current_page(history, n, backs));
    return 0;
}`);

// Q8 Config File Bracket Linter
codes.push(String.raw`#include <stdio.h>

int brackets_ok(const char *s) {
    char stack[1005];
    int top = 0;
    for (int i = 0; s[i]; i++) {
        if (s[i] == '(' || s[i] == '[') {
            stack[top++] = s[i];
        } else {
            if (top == 0) return 0;
            char o = stack[--top];
            if (s[i] == ')' && o != '(') return 0;
            if (s[i] == ']' && o != '[') return 0;
        }
    }
    return top == 0;
}

int main(void) {
    char s[1005];
    if (scanf("%1000s", s) != 1) return 0;
    puts(brackets_ok(s) ? "YES" : "NO");
    return 0;
}`);

// Q9 Next Greater Price (Single Query)
codes.push(String.raw`#include <stdio.h>

int next_greater_at(const int *arr, int n, int i) {
    for (int j = i + 1; j < n; j++) {
        if (arr[j] > arr[i]) return arr[j];
    }
    return -1;
}

int main(void) {
    int n, i;
    if (scanf("%d", &n) != 1) return 0;
    int arr[2005];
    for (int j = 0; j < n; j++) scanf("%d", &arr[j]);
    scanf("%d", &i);
    printf("%d\n", next_greater_at(arr, n, i));
    return 0;
}`);

// ---- printf blacklisted from here: use putchar/puts emitters ----

// Q10 Next Greater Element for Every Item
codes.push(String.raw`#include <stdio.h>

void emit_int(int x) {
    char buf[13];
    int k = 0;
    if (x < 0) { putchar('-'); x = -x; }
    do { buf[k++] = (char)('0' + x % 10); x /= 10; } while (x);
    while (k > 0) putchar(buf[--k]);
}

void emit_arr(const int *a, int n) {
    for (int i = 0; i < n; i++) {
        if (i > 0) putchar(' ');
        emit_int(a[i]);
    }
    putchar('\n');
}

void next_greater(const int *arr, int n, int *out) {
    int stack[1005], top = 0;
    for (int i = 0; i < n; i++) out[i] = -1;
    for (int i = 0; i < n; i++) {
        while (top > 0 && arr[i] > arr[stack[top - 1]]) {
            out[stack[--top]] = arr[i];
        }
        stack[top++] = i;
    }
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[1005], out[1005];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    next_greater(arr, n, out);
    emit_arr(out, n);
    return 0;
}`);

// Q11 Valid Push and Pop Sequence
codes.push(String.raw`#include <stdio.h>

int valid_sequence(const int *pushed, const int *popped, int n) {
    int stack[1005], top = 0, j = 0;
    for (int i = 0; i < n; i++) {
        stack[top++] = pushed[i];
        while (top > 0 && j < n && stack[top - 1] == popped[j]) {
            top--;
            j++;
        }
    }
    return j == n;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int pushed[1005], popped[1005];
    for (int i = 0; i < n; i++) scanf("%d", &pushed[i]);
    for (int i = 0; i < n; i++) scanf("%d", &popped[i]);
    puts(valid_sequence(pushed, popped, n) ? "YES" : "NO");
    return 0;
}`);

// Q12 Minimum on the Stack After Operations
codes.push(String.raw`#include <stdio.h>

void emit_int(int x) {
    char buf[13];
    int k = 0;
    if (x < 0) { putchar('-'); x = -x; }
    do { buf[k++] = (char)('0' + x % 10); x /= 10; } while (x);
    while (k > 0) putchar(buf[--k]);
}

int min_after_ops(const int *ops, int m) {
    int stack[1005], mins[1005], top = 0;
    for (int i = 0; i < m; i++) {
        if (ops[i] == -1) {
            top--;
            continue;
        }
        stack[top] = ops[i];
        mins[top] = (top == 0) ? ops[i] : (ops[i] < mins[top - 1] ? ops[i] : mins[top - 1]);
        top++;
    }
    return mins[top - 1];
}

int main(void) {
    int m;
    if (scanf("%d", &m) != 1) return 0;
    int ops[1005];
    for (int i = 0; i < m; i++) scanf("%d", &ops[i]);
    emit_int(min_after_ops(ops, m));
    putchar('\n');
    return 0;
}`);

// Q13 Reverse a Message Using a Stack
codes.push(String.raw`#include <stdio.h>

void reverse_with_stack(const char *s, char *out) {
    char stack[1005];
    int top = 0, i;
    for (i = 0; s[i]; i++) {
        stack[top++] = s[i];
    }
    for (i = 0; top > 0; i++) {
        out[i] = stack[--top];
    }
    out[i] = '\0';
}

int main(void) {
    char s[1005], out[1005];
    if (scanf("%1000s", s) != 1) return 0;
    reverse_with_stack(s, out);
    puts(out);
    return 0;
}`);

// Q14 Minimum Bracket Removals
codes.push(String.raw`#include <stdio.h>

void emit_int(int x) {
    char buf[13];
    int k = 0;
    if (x < 0) { putchar('-'); x = -x; }
    do { buf[k++] = (char)('0' + x % 10); x /= 10; } while (x);
    while (k > 0) putchar(buf[--k]);
}

int min_removals(const char *s) {
    int open = 0, bad = 0;
    for (int i = 0; s[i]; i++) {
        if (s[i] == '(') {
            open++;
        } else if (open > 0) {
            open--;
        } else {
            bad++;
        }
    }
    return open + bad;
}

int main(void) {
    char s[1005];
    if (scanf("%1000s", s) != 1) return 0;
    emit_int(min_removals(s));
    putchar('\n');
    return 0;
}`);

// Q15 Final Text After Backspaces
codes.push(String.raw`#include <stdio.h>

void final_text(const char *s, char *out) {
    char stack[1005];
    int top = 0, i, k = 0;
    for (i = 0; s[i]; i++) {
        if (s[i] == '#') {
            if (top > 0) top--;
        } else {
            stack[top++] = s[i];
        }
    }
    for (i = 0; i < top; i++) {
        out[k++] = stack[i];
    }
    out[k] = '\0';
}

int main(void) {
    char s[1005], out[1005];
    if (scanf("%1000s", s) != 1) return 0;
    final_text(s, out);
    puts(out);
    return 0;
}`);

// Q16 Postfix Expression Evaluator
codes.push(String.raw`#include <stdio.h>

void emit_int(int x) {
    char buf[13];
    int k = 0;
    if (x < 0) { putchar('-'); x = -x; }
    do { buf[k++] = (char)('0' + x % 10); x /= 10; } while (x);
    while (k > 0) putchar(buf[--k]);
}

int eval_postfix(const char *expr) {
    int stack[200], top = 0, i = 0;
    while (expr[i]) {
        if (expr[i] == ' ') {
            i++;
            continue;
        }
        if (expr[i] >= '0' && expr[i] <= '9') {
            stack[top++] = expr[i] - '0';
        } else {
            int b = stack[--top];
            int a = stack[--top];
            int r = 0;
            if (expr[i] == '+') r = a + b;
            else if (expr[i] == '-') r = a - b;
            else if (expr[i] == '*') r = a * b;
            else r = a / b;
            stack[top++] = r;
        }
        i++;
    }
    return stack[top - 1];
}

int main(void) {
    char line[4096];
    if (!fgets(line, sizeof line, stdin)) return 0;
    int len = 0;
    while (line[len]) {
        if (line[len] == '\n' || line[len] == '\r') { line[len] = '\0'; break; }
        len++;
    }
    emit_int(eval_postfix(line));
    putchar('\n');
    return 0;
}`);

// Q17 Stock Span Analysis
codes.push(String.raw`#include <stdio.h>

void emit_int(int x) {
    char buf[13];
    int k = 0;
    if (x < 0) { putchar('-'); x = -x; }
    do { buf[k++] = (char)('0' + x % 10); x /= 10; } while (x);
    while (k > 0) putchar(buf[--k]);
}

void emit_arr(const int *a, int n) {
    for (int i = 0; i < n; i++) {
        if (i > 0) putchar(' ');
        emit_int(a[i]);
    }
    putchar('\n');
}

void stock_span(const int *prices, int n, int *out) {
    int stack[1005], top = 0;
    for (int i = 0; i < n; i++) {
        while (top > 0 && prices[stack[top - 1]] <= prices[i]) {
            top--;
        }
        out[i] = (top == 0) ? i + 1 : i - stack[top - 1];
        stack[top++] = i;
    }
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int prices[1005], out[1005];
    for (int i = 0; i < n; i++) scanf("%d", &prices[i]);
    stock_span(prices, n, out);
    emit_arr(out, n);
    return 0;
}`);

// Q18 Circular Next Greater Element
codes.push(String.raw`#include <stdio.h>

void emit_int(int x) {
    char buf[13];
    int k = 0;
    if (x < 0) { putchar('-'); x = -x; }
    do { buf[k++] = (char)('0' + x % 10); x /= 10; } while (x);
    while (k > 0) putchar(buf[--k]);
}

void emit_arr(const int *a, int n) {
    for (int i = 0; i < n; i++) {
        if (i > 0) putchar(' ');
        emit_int(a[i]);
    }
    putchar('\n');
}

void nge_circular(const int *arr, int n, int *out) {
    int stack[2005], top = 0;
    for (int i = 2 * n - 1; i >= 0; i--) {
        int idx = i % n;
        while (top > 0 && arr[stack[top - 1]] <= arr[idx]) {
            top--;
        }
        if (i < n) out[idx] = (top == 0) ? -1 : arr[stack[top - 1]];
        stack[top++] = idx;
    }
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int arr[1005], out[1005];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    nge_circular(arr, n, out);
    emit_arr(out, n);
    return 0;
}`);

// Q19 Longest Valid Bracket Substring
codes.push(String.raw`#include <stdio.h>

void emit_int(int x) {
    char buf[13];
    int k = 0;
    if (x < 0) { putchar('-'); x = -x; }
    do { buf[k++] = (char)('0' + x % 10); x /= 10; } while (x);
    while (k > 0) putchar(buf[--k]);
}

int longest_valid(const char *s) {
    int stack[1005], top = 0, best = 0;
    stack[top++] = -1;
    for (int i = 0; s[i]; i++) {
        if (s[i] == '(') {
            stack[top++] = i;
        } else {
            top--;
            if (top == 0) {
                stack[top++] = i;
            } else {
                int len = i - stack[top - 1];
                if (len > best) best = len;
            }
        }
    }
    return best;
}

int main(void) {
    char s[1005];
    if (scanf("%1000s", s) != 1) return 0;
    emit_int(longest_valid(s));
    putchar('\n');
    return 0;
}`);

if (codes.length !== data.questions.length) {
  throw new Error("count mismatch: codes=" + codes.length + " questions=" + data.questions.length);
}
data.questions.forEach((q, i) => { q.sourcecode = codes[i]; });
writeFileSync(DST, JSON.stringify(data, null, 2));
console.log("wrote", DST);
