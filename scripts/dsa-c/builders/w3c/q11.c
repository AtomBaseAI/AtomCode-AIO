#include <stdio.h>

void emit_int(int x) {
    char buf[13];
    int k = 0;
    if (x < 0) { putchar('-'); x = -x; }
    do { buf[k++] = (char)('0' + x % 10); x /= 10; } while (x);
    while (k > 0) putchar(buf[--k]);
}

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
    emit_int(valid_sequence(pushed, popped, n));
    putchar('\n');
    return 0;
}