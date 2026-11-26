// Day 10 — Doubly and Circular Linked Lists: complete standalone C programs.
import { readFileSync, writeFileSync } from "node:fs";

const SCAFFOLD = String.raw`#include <stdio.h>
#include <stdlib.h>

typedef struct Node { int data; struct Node *prev; struct Node *next; } Node;

Node *build_dll(int n) {
    Node *head = NULL, *tail = NULL;
    for (int i = 0; i < n; i++) {
        int v;
        scanf("%d", &v);
        Node *node = (Node *)malloc(sizeof(Node));
        node->data = v;
        node->prev = tail;
        node->next = NULL;
        if (tail) tail->next = node;
        else head = node;
        tail = node;
    }
    return head;
}

Node *build_ring(int n) {
    Node *head = NULL, *tail = NULL;
    for (int i = 0; i < n; i++) {
        int v;
        scanf("%d", &v);
        Node *node = (Node *)malloc(sizeof(Node));
        node->data = v;
        node->prev = NULL;
        node->next = NULL;
        if (tail) tail->next = node;
        else head = node;
        tail = node;
    }
    if (tail) tail->next = head;
    return head;
}

Node *build_chain_flag(int n, int c) {
    Node *head = NULL, *tail = NULL;
    for (int i = 0; i < n; i++) {
        int v;
        scanf("%d", &v);
        Node *node = (Node *)malloc(sizeof(Node));
        node->data = v;
        node->prev = NULL;
        node->next = NULL;
        if (tail) tail->next = node;
        else head = node;
        tail = node;
    }
    if (tail && c == 1) tail->next = head;
    return head;
}

void print_list(Node *head) {
    int first = 1;
    for (Node *cur = head; cur; cur = cur->next) {
        if (!first) putchar(' ');
        first = 0;
        printf("%d", cur->data);
    }
    putchar('\n');
}

void print_ring(Node *start) {
    int first = 1;
    Node *cur = start;
    do {
        if (!first) putchar(' ');
        first = 0;
        printf("%d", cur->data);
        cur = cur->next;
    } while (cur != start);
    putchar('\n');
}

void print_array(const int *a, int n) {
    for (int i = 0; i < n; i++) printf(i ? " %d" : "%d", a[i]);
    putchar('\n');
}

void free_list(Node *head) {
    while (head) {
        Node *t = head;
        head = head->next;
        free(t);
    }
}
`;

const MAIN_OPEN = String.raw`int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
`;

const SRC = [
// q00 Doubly List Length
SCAFFOLD + MAIN_OPEN + String.raw`
    Node *head = build_dll(n);
    int c = 0;
    for (Node *cur = head; cur; cur = cur->next) c++;
    printf("%d\n", c);
    free_list(head);
    return 0;
}`,
// q01 Forward Fill Array
SCAFFOLD + String.raw`
void dll_fill_forward(Node *head, int out[]) {
    int i = 0;
    for (Node *cur = head; cur; cur = cur->next) out[i++] = cur->data;
}

` + MAIN_OPEN + String.raw`
    Node *head = build_dll(n);
    int out[10005];
    dll_fill_forward(head, out);
    print_array(out, n);
    free_list(head);
    return 0;
}`,
// q02 Backward Fill Array
SCAFFOLD + String.raw`
void dll_fill_backward(Node *head, int out[]) {
    Node *tail = head;
    while (tail->next) tail = tail->next;
    int i = 0;
    for (Node *cur = tail; cur; cur = cur->prev) out[i++] = cur->data;
}

` + MAIN_OPEN + String.raw`
    Node *head = build_dll(n);
    int out[10005];
    dll_fill_backward(head, out);
    print_array(out, n);
    free_list(head);
    return 0;
}`,
// q03 Circular Check
SCAFFOLD + String.raw`
int is_circular(Node *head) {
    Node *slow = head;
    Node *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return 1;
    }
    return 0;
}

` + MAIN_OPEN + String.raw`
    Node *head = build_dll(n);
    int c;
    scanf("%d", &c);
    if (c == 1) {
        Node *tail = head;
        while (tail->next) tail = tail->next;
        tail->next = head;
    }
    printf("%d\n", is_circular(head));
    return 0;
}`,
// q04 Insert at Front
SCAFFOLD + String.raw`
Node *dll_insert_front(Node *head, int value) {
    Node *node = (Node *)malloc(sizeof(Node));
    node->data = value;
    node->prev = NULL;
    node->next = head;
    if (head) head->prev = node;
    return node;
}

` + MAIN_OPEN + String.raw`
    Node *head = build_dll(n);
    int value;
    scanf("%d", &value);
    print_list(dll_insert_front(head, value));
    return 0;
}`,
// q05 Insert at Back
SCAFFOLD + String.raw`
Node *dll_insert_back(Node *head, int value) {
    Node *node = (Node *)malloc(sizeof(Node));
    node->data = value;
    node->next = NULL;
    node->prev = NULL;
    if (!head) return node;
    Node *tail = head;
    while (tail->next) tail = tail->next;
    tail->next = node;
    node->prev = tail;
    return head;
}

` + MAIN_OPEN + String.raw`
    Node *head = build_dll(n);
    int value;
    scanf("%d", &value);
    print_list(dll_insert_back(head, value));
    return 0;
}`,
// q06 Circular Roster Length
SCAFFOLD + String.raw`
int clist_length(Node *head) {
    int c = 0;
    Node *cur = head;
    do {
        c++;
        cur = cur->next;
    } while (cur != head);
    return c;
}

` + MAIN_OPEN + String.raw`
    Node *head = build_ring(n);
    printf("%d\n", clist_length(head));
    return 0;
}`,
// q07 Backward Walk Sum
SCAFFOLD + String.raw`
int dll_backward_sum(Node *head) {
    Node *tail = head;
    while (tail->next) tail = tail->next;
    long long sum = 0;
    for (Node *cur = tail; cur; cur = cur->prev) sum += cur->data;
    return (int)sum;
}

` + MAIN_OPEN + String.raw`
    Node *head = build_dll(n);
    printf("%d\n", dll_backward_sum(head));
    free_list(head);
    return 0;
}`,
// q08 Serve the Ring Front
SCAFFOLD + String.raw`
Node *cinsert_front(Node *head, int value) {
    Node *node = (Node *)malloc(sizeof(Node));
    node->data = value;
    node->prev = NULL;
    Node *tail = head;
    while (tail->next != head) tail = tail->next;
    node->next = head;
    tail->next = node;
    return node;
}

` + MAIN_OPEN + String.raw`
    Node *head = build_ring(n);
    int value;
    scanf("%d", &value);
    print_ring(cinsert_front(head, value));
    return 0;
}`,
// q09 Undo History Replay
SCAFFOLD + String.raw`
void dll_print_backward(Node *head) {
    Node *tail = head;
    while (tail->next) tail = tail->next;
    int first = 1;
    for (Node *cur = tail; cur; cur = cur->prev) {
        if (!first) putchar(' ');
        first = 0;
        printf("%d", cur->data);
    }
    putchar('\n');
}

` + MAIN_OPEN + String.raw`
    Node *head = build_dll(n);
    dll_print_backward(head);
    return 0;
}`,
// q10 Delete Node by Index (blacklist: qsort / whitelist: ->prev)
SCAFFOLD + String.raw`
Node *dll_delete_at(Node *head, int index) {
    Node *victim = head;
    for (int i = 0; i < index; i++) victim = victim->next;
    if (victim->prev) victim->prev->next = victim->next;
    else head = victim->next;
    if (victim->next) victim->next->prev = victim->prev;
    free(victim);
    return head;
}

` + MAIN_OPEN + String.raw`
    Node *head = build_dll(n);
    int index;
    scanf("%d", &index);
    print_list(dll_delete_at(head, index));
    return 0;
}`,
// q11 Sorted Insert Doubly (blacklist: qsort / whitelist: ->prev)
SCAFFOLD + String.raw`
Node *dll_insert_sorted(Node *head, int value) {
    Node *node = (Node *)malloc(sizeof(Node));
    node->data = value;
    if (!head || head->data > value) {
        node->prev = NULL;
        node->next = head;
        if (head) head->prev = node;
        return node;
    }
    Node *cur = head;
    while (cur->next && cur->next->data <= value) cur = cur->next;
    node->next = cur->next;
    node->prev = cur;
    if (cur->next) cur->next->prev = node;
    cur->next = node;
    return head;
}

` + MAIN_OPEN + String.raw`
    Node *head = build_dll(n);
    int value;
    scanf("%d", &value);
    print_list(dll_insert_sorted(head, value));
    return 0;
}`,
// q12 Rotate the Ring (blacklist: qsort / whitelist: while)
SCAFFOLD + String.raw`
Node *clist_rotate(Node *head, int k) {
    int i = 0;
    while (i < k) {
        head = head->next;
        i++;
    }
    return head;
}

` + MAIN_OPEN + String.raw`
    Node *head = build_ring(n);
    int k;
    scanf("%d", &k);
    print_ring(clist_rotate(head, k));
    return 0;
}`,
// q13 Pair Sum From Both Ends (blacklist: qsort / whitelist: ->prev)
SCAFFOLD + String.raw`
void dll_pair_sum(Node *head, int target, int *a, int *b) {
    Node *f = head;
    Node *bk = head;
    while (bk->next) bk = bk->next;
    while (f != bk && f->prev != bk) {
        long long sum = (long long)f->data + (long long)bk->data;
        if (sum == target) {
            *a = f->data;
            *b = bk->data;
            return;
        }
        if (sum < target) f = f->next;
        else bk = bk->prev;
    }
    *a = -1;
    *b = -1;
}

` + MAIN_OPEN + String.raw`
    Node *head = build_dll(n);
    int target;
    scanf("%d", &target);
    int a, b;
    dll_pair_sum(head, target, &a, &b);
    printf("%d %d\n", a, b);
    free_list(head);
    return 0;
}`,
// q14 Reverse the Doubly List (blacklist: qsort / whitelist: ->prev)
SCAFFOLD + String.raw`
Node *dll_reverse(Node *head) {
    Node *cur = head;
    Node *newhead = head;
    while (cur) {
        Node *nxt = cur->next;
        Node *t = cur->next;
        cur->next = cur->prev;
        cur->prev = t;
        newhead = cur;
        cur = nxt;
    }
    return newhead;
}

` + MAIN_OPEN + String.raw`
    Node *head = build_dll(n);
    print_list(dll_reverse(head));
    return 0;
}`,
// q15 Middle of the Doubly List (blacklist: qsort / whitelist: while)
SCAFFOLD + String.raw`
int dll_middle(Node *head) {
    int len = 0;
    Node *cur = head;
    while (cur) {
        len++;
        cur = cur->next;
    }
    cur = head;
    int i = 0;
    while (i < len / 2) {
        cur = cur->next;
        i++;
    }
    return cur->data;
}

` + MAIN_OPEN + String.raw`
    Node *head = build_dll(n);
    printf("%d\n", dll_middle(head));
    free_list(head);
    return 0;
}`,
// q16 Josephus Survivor (blacklist: qsort / whitelist: while)
SCAFFOLD + String.raw`
int josephus_survivor(Node *head, int k) {
    Node *cur = head;
    while (cur->next != cur) {
        Node *prev = cur;
        while (prev->next != cur) prev = prev->next;
        int i = 1;
        while (i < k) {
            prev = cur;
            cur = cur->next;
            i++;
        }
        prev->next = cur->next;
        Node *victim = cur;
        cur = cur->next;
        free(victim);
    }
    int val = cur->data;
    free(cur);
    return val;
}

` + MAIN_OPEN + String.raw`
    Node *head = build_ring(n);
    int k;
    scanf("%d", &k);
    printf("%d\n", josephus_survivor(head, k));
    return 0;
}`,
// q17 Convert to Circular (blacklist: qsort / whitelist: ->next)
SCAFFOLD + String.raw`
Node *make_circular(Node *head, int *len) {
    int c = 1;
    Node *tail = head;
    while (tail->next) {
        tail = tail->next;
        c++;
    }
    tail->next = head;
    *len = c;
    return head;
}

` + MAIN_OPEN + String.raw`
    Node *head = build_dll(n);
    int len = 0;
    make_circular(head, &len);
    printf("%d\n", len);
    print_ring(head);
    return 0;
}`,
// q18 Swap Kth From Both Ends (blacklist: qsort / whitelist: ->prev)
SCAFFOLD + String.raw`
Node *dll_swap_kth(Node *head, int k) {
    int n = 0;
    Node *cur = head;
    while (cur) {
        n++;
        cur = cur->next;
    }
    int j = n + 1 - k;
    Node *a = head;
    int i = 1;
    while (i < k) {
        a = a->next;
        i++;
    }
    Node *b = head;
    while (b->next) b = b->next;
    i = 0;
    while (i < n - j) {
        b = b->prev;
        i++;
    }
    if (a != b) {
        int t = a->data;
        a->data = b->data;
        b->data = t;
    }
    return head;
}

` + MAIN_OPEN + String.raw`
    Node *head = build_dll(n);
    int k;
    scanf("%d", &k);
    print_list(dll_swap_kth(head, k));
    return 0;
}`,
// q19 Copy the Ring (blacklist: static / whitelist: malloc)
SCAFFOLD + String.raw`
Node *clist_copy(Node *head) {
    Node *chead = (Node *)malloc(sizeof(Node));
    chead->data = head->data;
    chead->prev = NULL;
    Node *ctail = chead;
    for (Node *s = head->next; s != head; s = s->next) {
        Node *node = (Node *)malloc(sizeof(Node));
        node->data = s->data;
        node->prev = NULL;
        ctail->next = node;
        ctail = node;
    }
    ctail->next = chead;
    return chead;
}

` + MAIN_OPEN + String.raw`
    Node *head = build_ring(n);
    print_ring(clist_copy(head));
    return 0;
}`,
];

const bank = JSON.parse(readFileSync("/home/z/tmp/dsa-export/dsa-c/day-10.code.json", "utf8"));
if (bank.questions.length !== SRC.length) throw new Error(`count mismatch day10`);
bank.questions.forEach((q, i) => { q.sourcecode = SRC[i]; });
writeFileSync("/home/z/my-project/scripts/dsa-c/data/day-10.code.json", JSON.stringify(bank, null, 2) + "\n");

const mcq = JSON.parse(readFileSync("/home/z/tmp/dsa-export/dsa-c/day-10.mcq.json", "utf8"));
writeFileSync("/home/z/my-project/scripts/dsa-c/data/day-10.mcq.json",
  JSON.stringify({ day: mcq.day, questions: mcq.questions.map(({ _id, ...rest }) => rest) }, null, 2) + "\n");
console.log("day-10 written:", bank.questions.length, "code,", mcq.questions.length, "mcq");
