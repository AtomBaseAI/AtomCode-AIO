// Day 09 — Singly Linked Lists: complete standalone C programs.
import { readFileSync, writeFileSync } from "node:fs";

const SCAFFOLD = String.raw`#include <stdio.h>
#include <stdlib.h>

typedef struct Node { int data; struct Node *next; } Node;

Node *build_list(int n) {
    Node *head = NULL, *tail = NULL;
    for (int i = 0; i < n; i++) {
        int v;
        scanf("%d", &v);
        Node *node = (Node *)malloc(sizeof(Node));
        node->data = v;
        node->next = NULL;
        if (tail) tail->next = node;
        else head = node;
        tail = node;
    }
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
    Node *head = build_list(n);
`;

const SRC = [
// q00 List Length
SCAFFOLD + String.raw`
int list_length(Node *head) {
    int c = 0;
    for (Node *cur = head; cur; cur = cur->next) c++;
    return c;
}

` + MAIN_OPEN + String.raw`
    printf("%d\n", list_length(head));
    free_list(head);
    return 0;
}`,
// q01 List Sum
SCAFFOLD + String.raw`
int list_sum(Node *head) {
    int sum = 0;
    for (Node *cur = head; cur; cur = cur->next) sum += cur->data;
    return sum;
}

` + MAIN_OPEN + String.raw`
    printf("%d\n", list_sum(head));
    free_list(head);
    return 0;
}`,
// q02 Find Value Index
SCAFFOLD + String.raw`
int list_find(Node *head, int target) {
    int idx = 0;
    for (Node *cur = head; cur; cur = cur->next, idx++) {
        if (cur->data == target) return idx;
    }
    return -1;
}

` + MAIN_OPEN + String.raw`
    int target;
    scanf("%d", &target);
    printf("%d\n", list_find(head, target));
    free_list(head);
    return 0;
}`,
// q03 Reverse the List
SCAFFOLD + String.raw`
Node *list_reverse(Node *head) {
    Node *prev = NULL;
    Node *cur = head;
    while (cur) {
        Node *nxt = cur->next;
        cur->next = prev;
        prev = cur;
        cur = nxt;
    }
    return prev;
}

` + MAIN_OPEN + String.raw`
    print_list(list_reverse(head));
    return 0;
}`,
// q04 Middle Element
SCAFFOLD + String.raw`
int list_middle(Node *head) {
    int len = 0;
    for (Node *cur = head; cur; cur = cur->next) len++;
    Node *cur = head;
    for (int i = 0; i < len / 2; i++) cur = cur->next;
    return cur->data;
}

` + MAIN_OPEN + String.raw`
    printf("%d\n", list_middle(head));
    free_list(head);
    return 0;
}`,
// q05 Count Value Occurrences
SCAFFOLD + String.raw`
int list_count(Node *head, int value) {
    int c = 0;
    for (Node *cur = head; cur; cur = cur->next) {
        if (cur->data == value) c++;
    }
    return c;
}

` + MAIN_OPEN + String.raw`
    int value;
    scanf("%d", &value);
    printf("%d\n", list_count(head, value));
    free_list(head);
    return 0;
}`,
// q06 Insert Into Sorted Playlist
SCAFFOLD + String.raw`
Node *list_insert_sorted(Node *head, int value) {
    Node *node = (Node *)malloc(sizeof(Node));
    node->data = value;
    if (!head || head->data > value) {
        node->next = head;
        return node;
    }
    Node *cur = head;
    while (cur->next && cur->next->data <= value) cur = cur->next;
    node->next = cur->next;
    cur->next = node;
    return head;
}

` + MAIN_OPEN + String.raw`
    int value;
    scanf("%d", &value);
    print_list(list_insert_sorted(head, value));
    return 0;
}`,
// q07 Fetch the Kth Entry
SCAFFOLD + String.raw`
int list_get(Node *head, int index) {
    for (int i = 0; i < index; i++) head = head->next;
    return head->data;
}

` + MAIN_OPEN + String.raw`
    int index;
    scanf("%d", &index);
    printf("%d\n", list_get(head, index));
    free_list(head);
    return 0;
}`,
// q08 Remove the Ledger Head
SCAFFOLD + String.raw`
Node *list_delete_front(Node *head) {
    Node *nxt = head->next;
    free(head);
    return nxt;
}

` + MAIN_OPEN + String.raw`
    print_list(list_delete_front(head));
    return 0;
}`,
// q09 Reverse-Print the Audit Trail
SCAFFOLD + String.raw`
int g_first = 1;

void rev_emit(Node *head) {
    if (!head) return;
    rev_emit(head->next);
    if (!g_first) putchar(' ');
    g_first = 0;
    printf("%d", head->data);
}

void list_print_reverse(Node *head) {
    rev_emit(head);
    putchar('\n');
}

` + MAIN_OPEN + String.raw`
    list_print_reverse(head);
    return 0;
}`,
// q10 Insert at Position (blacklist: static / whitelist: malloc)
SCAFFOLD + String.raw`
Node *list_insert_at(Node *head, int index, int value) {
    Node *node = (Node *)malloc(sizeof(Node));
    node->data = value;
    if (index == 0) {
        node->next = head;
        return node;
    }
    Node *cur = head;
    for (int i = 0; i + 1 < index; i++) cur = cur->next;
    node->next = cur->next;
    cur->next = node;
    return head;
}

` + MAIN_OPEN + String.raw`
    int index, value;
    scanf("%d", &index);
    scanf("%d", &value);
    print_list(list_insert_at(head, index, value));
    return 0;
}`,
// q11 Delete at Index (blacklist: qsort / whitelist: while)
SCAFFOLD + String.raw`
Node *list_delete_at(Node *head, int index) {
    if (index == 0) {
        Node *nxt = head->next;
        free(head);
        return nxt;
    }
    Node *cur = head;
    int i = 0;
    while (i + 1 < index) {
        cur = cur->next;
        i++;
    }
    Node *victim = cur->next;
    cur->next = victim->next;
    free(victim);
    return head;
}

` + MAIN_OPEN + String.raw`
    int index;
    scanf("%d", &index);
    print_list(list_delete_at(head, index));
    return 0;
}`,
// q12 Rotate the List Left (blacklist: qsort / whitelist: ->next)
SCAFFOLD + String.raw`
Node *list_rotate(Node *head, int k) {
    int n = 0;
    for (Node *cur = head; cur; cur = cur->next) n++;
    int cut = n - k;
    Node *cur = head;
    for (int i = 0; i + 1 < cut; i++) cur = cur->next;
    Node *newhead = cur->next;
    cur->next = NULL;
    Node *tail = newhead;
    while (tail->next) tail = tail->next;
    tail->next = head;
    return newhead;
}

` + MAIN_OPEN + String.raw`
    int k;
    scanf("%d", &k);
    print_list(list_rotate(head, k));
    return 0;
}`,
// q13 Second Largest Value (blacklist: qsort / whitelist: while)
SCAFFOLD + String.raw`
int list_second_max(Node *head) {
    int best, second;
    if (head->data > head->next->data) {
        best = head->data;
        second = head->next->data;
    } else {
        best = head->next->data;
        second = head->data;
    }
    Node *cur = head->next->next;
    while (cur) {
        if (cur->data > best) {
            second = best;
            best = cur->data;
        } else if (cur->data > second) {
            second = cur->data;
        }
        cur = cur->next;
    }
    return second;
}

` + MAIN_OPEN + String.raw`
    printf("%d\n", list_second_max(head));
    free_list(head);
    return 0;
}`,
// q14 Swap Adjacent Pairs (blacklist: qsort / whitelist: ->next)
SCAFFOLD + String.raw`
Node *list_swap_pairs(Node *head) {
    Node *cur = head;
    while (cur && cur->next) {
        int t = cur->data;
        cur->data = cur->next->data;
        cur->next->data = t;
        cur = cur->next->next;
    }
    return head;
}

` + MAIN_OPEN + String.raw`
    print_list(list_swap_pairs(head));
    return 0;
}`,
// q15 Dedupe the Sorted Log (blacklist: qsort / whitelist: while)
SCAFFOLD + String.raw`
Node *list_dedupe(Node *head) {
    Node *cur = head;
    while (cur && cur->next) {
        if (cur->next->data == cur->data) {
            Node *victim = cur->next;
            cur->next = victim->next;
            free(victim);
        } else {
            cur = cur->next;
        }
    }
    return head;
}

` + MAIN_OPEN + String.raw`
    print_list(list_dedupe(head));
    return 0;
}`,
// q16 Delete Every Matching Node (blacklist: qsort / whitelist: ->next)
SCAFFOLD + String.raw`
Node *list_delete_all(Node *head, int value) {
    while (head && head->data == value) {
        Node *t = head;
        head = head->next;
        free(t);
    }
    if (!head) return NULL;
    Node *cur = head;
    while (cur->next) {
        if (cur->next->data == value) {
            Node *t = cur->next;
            cur->next = t->next;
            free(t);
        } else {
            cur = cur->next;
        }
    }
    return head;
}

` + MAIN_OPEN + String.raw`
    int value;
    scanf("%d", &value);
    Node *rest = list_delete_all(head, value);
    if (!rest) printf("empty\n");
    else print_list(rest);
    return 0;
}`,
// q17 Merge Two Sorted Lists (blacklist: qsort / whitelist: ->next)
SCAFFOLD + String.raw`
Node *list_merge(Node *a, Node *b) {
    Node dummy;
    dummy.next = NULL;
    Node *tail = &dummy;
    while (a && b) {
        if (a->data <= b->data) {
            tail->next = a;
            a = a->next;
        } else {
            tail->next = b;
            b = b->next;
        }
        tail = tail->next;
    }
    tail->next = a ? a : b;
    return dummy.next;
}

` + String.raw`int main(void) {
    int n, m;
    if (scanf("%d", &n) != 1) return 0;
    Node *a = build_list(n);
    if (scanf("%d", &m) != 1) return 0;
    Node *b = build_list(m);
    print_list(list_merge(a, b));
    return 0;
}`,
// q18 Insertion Sort the List (blacklist: qsort / whitelist: ->next)
SCAFFOLD + String.raw`
Node *list_insertion_sort(Node *head) {
    Node *sorted = NULL;
    Node *cur = head;
    while (cur) {
        Node *nxt = cur->next;
        if (!sorted || cur->data < sorted->data) {
            cur->next = sorted;
            sorted = cur;
        } else {
            Node *p = sorted;
            while (p->next && p->next->data <= cur->data) p = p->next;
            cur->next = p->next;
            p->next = cur;
        }
        cur = nxt;
    }
    return sorted;
}

` + MAIN_OPEN + String.raw`
    print_list(list_insertion_sort(head));
    return 0;
}`,
// q19 Reorder List Alternating (blacklist: qsort / whitelist: ->next)
SCAFFOLD + String.raw`
Node *list_reverse(Node *head) {
    Node *prev = NULL;
    Node *cur = head;
    while (cur) {
        Node *nxt = cur->next;
        cur->next = prev;
        prev = cur;
        cur = nxt;
    }
    return prev;
}

Node *list_reorder(Node *head) {
    int n = 0;
    for (Node *cur = head; cur; cur = cur->next) n++;
    if (n <= 2) return head;
    int firstlen = (n + 1) / 2;
    Node *firsttail = head;
    for (int i = 0; i + 1 < firstlen; i++) firsttail = firsttail->next;
    Node *second = firsttail->next;
    firsttail->next = NULL;
    second = list_reverse(second);
    Node *p = head;
    Node *q = second;
    while (q) {
        Node *pn = p->next;
        Node *qn = q->next;
        p->next = q;
        q->next = pn;
        p = pn;
        q = qn;
    }
    return head;
}

` + MAIN_OPEN + String.raw`
    print_list(list_reorder(head));
    return 0;
}`,
];

const bank = JSON.parse(readFileSync("/home/z/tmp/dsa-export/dsa-c/day-09.code.json", "utf8"));
if (bank.questions.length !== SRC.length) throw new Error(`count mismatch day09`);
bank.questions.forEach((q, i) => { q.sourcecode = SRC[i]; });
writeFileSync("/home/z/my-project/scripts/dsa-c/data/day-09.code.json", JSON.stringify(bank, null, 2) + "\n");

const mcq = JSON.parse(readFileSync("/home/z/tmp/dsa-export/dsa-c/day-09.mcq.json", "utf8"));
writeFileSync("/home/z/my-project/scripts/dsa-c/data/day-09.mcq.json",
  JSON.stringify({ day: mcq.day, questions: mcq.questions.map(({ _id, ...rest }) => rest) }, null, 2) + "\n");
console.log("day-09 written:", bank.questions.length, "code,", mcq.questions.length, "mcq");
