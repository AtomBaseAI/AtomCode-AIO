import { readFileSync, writeFileSync } from "node:fs";

const SRC = "/home/z/tmp/dsa-export/dsa-c/day-12.code.json";
const DST = "/home/z/my-project/scripts/dsa-c/data/day-12.code.json";

const data = JSON.parse(readFileSync(SRC, "utf8"));
const codes = [];

// Q0 Front and Rear of the Queue
codes.push(String.raw`#include <stdio.h>

void front_rear(const int *q, int n, int *f, int *r) {
    *f = q[0];
    *r = q[n - 1];
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int q[2005], f, r;
    for (int i = 0; i < n; i++) scanf("%d", &q[i]);
    front_rear(q, n, &f, &r);
    printf("%d %d\n", f, r);
    return 0;
}`);

// Q1 Free Slots in a Circular Queue
codes.push(String.raw`#include <stdio.h>

int free_slots(int capacity, int size) {
    return capacity - size;
}

int main(void) {
    int capacity, size;
    if (scanf("%d %d", &capacity, &size) != 2) return 0;
    printf("%d\n", free_slots(capacity, size));
    return 0;
}`);

// Q2 Push-Front Arrival Order
codes.push(String.raw`#include <stdio.h>

void push_front_order(const int *vals, int n, int *out) {
    for (int i = 0; i < n; i++) {
        out[i] = vals[n - 1 - i];
    }
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int vals[2005], out[2005];
    for (int i = 0; i < n; i++) scanf("%d", &vals[i]);
    push_front_order(vals, n, out);
    for (int i = 0; i < n; i++) printf("%d%c", out[i], (i + 1 < n) ? ' ' : '\n');
    return 0;
}`);

// Q3 Rear Insertion Index
codes.push(String.raw`#include <stdio.h>

int rear_index(int capacity, int front, int size) {
    return (front + size) % capacity;
}

int main(void) {
    int capacity, front, size;
    if (scanf("%d %d %d", &capacity, &front, &size) != 3) return 0;
    printf("%d\n", rear_index(capacity, front, size));
    return 0;
}`);

// Q4 Sum of the First k Served
codes.push(String.raw`#include <stdio.h>

int sum_served(const int *q, int n, int k) {
    int total = 0;
    for (int i = 0; i < k; i++) {
        total += q[i];
    }
    return total;
}

int main(void) {
    int n, k;
    if (scanf("%d", &n) != 1) return 0;
    int q[2005];
    for (int i = 0; i < n; i++) scanf("%d", &q[i]);
    scanf("%d", &k);
    printf("%d\n", sum_served(q, n, k));
    return 0;
}`);

// Q5 Front After k Serves
codes.push(String.raw`#include <stdio.h>

int front_after_k(const int *q, int n, int k) {
    return q[k];
}

int main(void) {
    int n, k;
    if (scanf("%d", &n) != 1) return 0;
    int q[2005];
    for (int i = 0; i < n; i++) scanf("%d", &q[i]);
    scanf("%d", &k);
    printf("%d\n", front_after_k(q, n, k));
    return 0;
}`);

// Q6 Ticket Counter Next Token
codes.push(String.raw`#include <stdio.h>

int next_token(int issued, int served) {
    if (served >= issued) return -1;
    return served + 1;
}

int main(void) {
    int issued, served;
    if (scanf("%d %d", &issued, &served) != 2) return 0;
    printf("%d\n", next_token(issued, served));
    return 0;
}`);

// Q7 Print Job Queue Remaining Pages
codes.push(String.raw`#include <stdio.h>

int total_remaining_pages(const int *jobs, int n, int done) {
    int total = 0;
    for (int i = done; i < n; i++) {
        total += jobs[i];
    }
    return total;
}

int main(void) {
    int n, done;
    if (scanf("%d", &n) != 1) return 0;
    int jobs[2005];
    for (int i = 0; i < n; i++) scanf("%d", &jobs[i]);
    scanf("%d", &done);
    printf("%d\n", total_remaining_pages(jobs, n, done));
    return 0;
}`);

// Q8 Waiting List Position
codes.push(String.raw`#include <stdio.h>

int position_after(const int *q, int n, int target, int served) {
    for (int i = 0; i < n; i++) {
        if (q[i] == target) {
            if (i < served) return 0;
            return i - served + 1;
        }
    }
    return 0;
}

int main(void) {
    int n, target, served;
    if (scanf("%d", &n) != 1) return 0;
    int q[2005];
    for (int i = 0; i < n; i++) scanf("%d", &q[i]);
    scanf("%d %d", &target, &served);
    printf("%d\n", position_after(q, n, target, served));
    return 0;
}`);

// Q9 Round-Robin Front After Rotations
codes.push(String.raw`#include <stdio.h>

int front_after_rotations(const int *q, int n, int r) {
    return q[r % n];
}

int main(void) {
    int n, r;
    if (scanf("%d", &n) != 1) return 0;
    int q[2005];
    for (int i = 0; i < n; i++) scanf("%d", &q[i]);
    scanf("%d", &r);
    printf("%d\n", front_after_rotations(q, n, r));
    return 0;
}`);

// ---- printf blacklisted from here: use putchar/puts emitters ----

// Q10 Reverse a Queue
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

void reverse_queue(const int *q, int n, int *out) {
    int stack[2005], top = 0;
    for (int i = 0; i < n; i++) {
        stack[top++] = q[i];
    }
    for (int i = 0; i < n; i++) {
        out[i] = stack[--top];
    }
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int q[2005], out[2005];
    for (int i = 0; i < n; i++) scanf("%d", &q[i]);
    reverse_queue(q, n, out);
    emit_arr(out, n);
    return 0;
}`);

// Q11 Locker Codes of Fives and Sixes
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

void generate_56(int n, int *out) {
    long long queue[100];
    int qh = 0, qt = 0;
    queue[qt++] = 5;
    queue[qt++] = 6;
    for (int i = 0; i < n; i++) {
        long long v = queue[qh++];
        out[i] = (int)v;
        queue[qt++] = v * 10 + 5;
        queue[qt++] = v * 10 + 6;
    }
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int out[20];
    generate_56(n, out);
    emit_arr(out, n);
    return 0;
}`);

// Q12 Front-Back Card Interleave
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

void interleave(const int *q, int n, int *out) {
    int front = 0, back = n - 1, idx = 0;
    while (front <= back) {
        out[idx++] = q[front++];
        if (front <= back) out[idx++] = q[back--];
    }
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int q[2005], out[2005];
    for (int i = 0; i < n; i++) scanf("%d", &q[i]);
    interleave(q, n, out);
    emit_arr(out, n);
    return 0;
}`);

// Q13 Fuel Circuit Start Point
codes.push(String.raw`#include <stdio.h>

void emit_int(int x) {
    char buf[13];
    int k = 0;
    if (x < 0) { putchar('-'); x = -x; }
    do { buf[k++] = (char)('0' + x % 10); x /= 10; } while (x);
    while (k > 0) putchar(buf[--k]);
}

int tour_start(const int *petrol, const int *dist, int n) {
    for (int s = 0; s < n; s++) {
        long long fuel = 0;
        int ok = 1;
        for (int i = 0; i < n && ok; i++) {
            int p = (s + i) % n;
            fuel += petrol[p] - dist[p];
            if (fuel < 0) ok = 0;
        }
        if (ok) return s;
    }
    return -1;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int petrol[25], dist[25];
    for (int i = 0; i < n; i++) scanf("%d", &petrol[i]);
    for (int i = 0; i < n; i++) scanf("%d", &dist[i]);
    emit_int(tour_start(petrol, dist, n));
    putchar('\n');
    return 0;
}`);

// Q14 Canteen Sandwich Line
codes.push(String.raw`#include <stdio.h>

void emit_int(int x) {
    char buf[13];
    int k = 0;
    if (x < 0) { putchar('-'); x = -x; }
    do { buf[k++] = (char)('0' + x % 10); x /= 10; } while (x);
    while (k > 0) putchar(buf[--k]);
}

int hungry_students(const int *students, const int *sandwiches, int n) {
    int count0 = 0, count1 = 0;
    for (int i = 0; i < n; i++) {
        if (students[i] == 0) count0++;
        else count1++;
    }
    for (int j = 0; j < n; j++) {
        if (sandwiches[j] == 0) {
            if (count0 == 0) return count1;
            count0--;
        } else {
            if (count1 == 0) return count0;
            count1--;
        }
    }
    return 0;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    int students[1005], sandwiches[1005];
    for (int i = 0; i < n; i++) scanf("%d", &students[i]);
    for (int i = 0; i < n; i++) scanf("%d", &sandwiches[i]);
    emit_int(hungry_students(students, sandwiches, n));
    putchar('\n');
    return 0;
}`);

// Q15 Replay Buffer: Reverse First k
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

void reverse_first_k(const int *q, int n, int k, int *out) {
    int stack[2005], top = 0;
    for (int i = 0; i < k; i++) stack[top++] = q[i];
    for (int i = 0; i < k; i++) out[i] = stack[--top];
    for (int i = k; i < n; i++) out[i] = q[i];
}

int main(void) {
    int n, k;
    if (scanf("%d", &n) != 1) return 0;
    int q[2005], out[2005];
    for (int i = 0; i < n; i++) scanf("%d", &q[i]);
    scanf("%d", &k);
    reverse_first_k(q, n, k, out);
    emit_arr(out, n);
    return 0;
}`);

// Q16 Network Latency Sliding Maximum
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

void sliding_max(const int *arr, int n, int k, int *out) {
    int deque[2005], head = 0, tail = 0;
    for (int i = 0; i < n; i++) {
        while (tail > head && arr[deque[tail - 1]] <= arr[i]) tail--;
        deque[tail++] = i;
        if (deque[head] <= i - k) head++;
        if (i >= k - 1) out[i - k + 1] = arr[deque[head]];
    }
}

int main(void) {
    int n, k;
    if (scanf("%d", &n) != 1) return 0;
    int arr[2005], out[2005];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    scanf("%d", &k);
    sliding_max(arr, n, k, out);
    emit_arr(out, n - k + 1);
    return 0;
}`);

// Q17 First Non-Repeating Chat Character
codes.push(String.raw`#include <stdio.h>

void first_unique_stream(const char *s, char *out) {
    int freq[26] = {0};
    int queue[1005], qh = 0, qt = 0;
    int n = 0;
    while (s[n]) n++;
    for (int i = 0; i < n; i++) {
        freq[s[i] - 'a']++;
        queue[qt++] = s[i];
        while (qh < qt && freq[queue[qh] - 'a'] > 1) qh++;
        out[i] = (qh < qt) ? queue[qh] : '-';
    }
    out[n] = '\0';
}

int main(void) {
    char s[1005], out[1005];
    if (scanf("%1000s", s) != 1) return 0;
    first_unique_stream(s, out);
    puts(out);
    return 0;
}`);

// Q18 Longest Calm Window
codes.push(String.raw`#include <stdio.h>

void emit_int(int x) {
    char buf[13];
    int k = 0;
    if (x < 0) { putchar('-'); x = -x; }
    do { buf[k++] = (char)('0' + x % 10); x /= 10; } while (x);
    while (k > 0) putchar(buf[--k]);
}

int longest_calm(const int *arr, int n, int limit) {
    int dequeMax[2005], dequeMin[2005];
    int hMax = 0, tMax = 0, hMin = 0, tMin = 0;
    int best = 0, left = 0;
    for (int right = 0; right < n; right++) {
        while (tMax > hMax && arr[dequeMax[tMax - 1]] <= arr[right]) tMax--;
        dequeMax[tMax++] = right;
        while (tMin > hMin && arr[dequeMin[tMin - 1]] >= arr[right]) tMin--;
        dequeMin[tMin++] = right;
        while (arr[dequeMax[hMax]] - arr[dequeMin[hMin]] > limit) {
            if (dequeMax[hMax] == left) hMax++;
            if (dequeMin[hMin] == left) hMin++;
            left++;
        }
        if (right - left + 1 > best) best = right - left + 1;
    }
    return best;
}

int main(void) {
    int n, limit;
    if (scanf("%d", &n) != 1) return 0;
    int arr[2005];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    scanf("%d", &limit);
    emit_int(longest_calm(arr, n, limit));
    putchar('\n');
    return 0;
}`);

// Q19 Smart Bulb Group Switching
codes.push(String.raw`#include <stdio.h>

void emit_int(int x) {
    char buf[13];
    int k = 0;
    if (x < 0) { putchar('-'); x = -x; }
    do { buf[k++] = (char)('0' + x % 10); x /= 10; } while (x);
    while (k > 0) putchar(buf[--k]);
}

int min_bit_flips(const int *arr, int n, int k) {
    int queue[2005], qh = 0, qt = 0;
    int flipped = 0, ans = 0;
    for (int i = 0; i < n; i++) {
        if (qt > qh && queue[qh] + k <= i) {
            flipped ^= 1;
            qh++;
        }
        int cur = arr[i] ^ flipped;
        if (cur == 0) {
            if (i + k > n) return -1;
            ans++;
            flipped ^= 1;
            queue[qt++] = i;
        }
    }
    return ans;
}

int main(void) {
    int n, k;
    if (scanf("%d", &n) != 1) return 0;
    int arr[2005];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    scanf("%d", &k);
    emit_int(min_bit_flips(arr, n, k));
    putchar('\n');
    return 0;
}`);

if (codes.length !== data.questions.length) {
  throw new Error("count mismatch: codes=" + codes.length + " questions=" + data.questions.length);
}
data.questions.forEach((q, i) => { q.sourcecode = codes[i]; });
writeFileSync(DST, JSON.stringify(data, null, 2));
console.log("wrote", DST);
