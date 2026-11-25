#!/usr/bin/env python3
"""Build complete standalone programs for dsa-python days 06-10 code questions."""
import json
import copy
import os

SRC = '/home/z/tmp/dsa-export/dsa-python'
DST = '/home/z/my-project/scripts/dsa-python/data'

RECURSION = 'sys.setrecursionlimit(100000)'


def orig_code(q):
    return (q.get('sourcecode') or '').strip()


# ---------------------------------------------------------------- templates
def T(orig, body, prelude='', recursion=False):
    rec = f'    {RECURSION}\n\n' if recursion else ''
    return f"""import sys
{prelude}

{orig}


def main():
{rec}{body}


main()
"""


def main_list_out(fn, k=False, scalar=False, raw=False):
    """n, list[, k] -> call fn(values[, k]) -> print."""
    if k:
        call = f"    result = {fn}(values, k)"
        parse_k = "    k = int(data[1 + n])\n"
    else:
        call = f"    result = {fn}(values)"
        parse_k = ""
    if scalar:
        out = "    print(result)"
    else:
        out = "    print(' '.join(map(str, result)))"
    body = ("    data = sys.stdin.read().split()\n"
            "    n = int(data[0])\n"
            "    values = list(map(int, data[1:1 + n]))\n"
            f"{parse_k}"
            f"{call}\n"
            f"{out}")
    return body


def main_list_out_rec(fn, k=False, scalar=False):
    return main_list_out(fn, k=k, scalar=scalar), True


# ---------------------------------------------------------------- day 6
def day6(idx, q):
    orig = orig_code(q)
    if idx in (0, 1, 2, 3, 6, 7, 8):
        fns = {0: 'after_one_bubble_pass', 1: 'bubble_sort', 2: 'selection_sort',
               3: 'insertion_sort', 6: 'sort_finish_times', 7: 'sort_prices',
               8: 'sort_priorities'}
        body = main_list_out(fns[idx])
    elif idx == 4:
        body = main_list_out('bubble_swaps', scalar=True)
    elif idx == 5:
        body = main_list_out('insertion_shifts', scalar=True)
    elif idx == 9:
        body = main_list_out('already_sorted', scalar=True)
    elif idx in (10, 11, 12):
        fns = {10: 'bubble_after_k_passes', 11: 'selection_after_k_passes',
               12: 'insertion_after_k_steps'}
        body = main_list_out(fns[idx], k=True)
    elif idx == 13:
        body = ("    data = sys.stdin.read().split()\n"
                "    n = int(data[0])\n"
                "    pairs = []\n"
                "    idx = 1\n"
                "    for _ in range(n):\n"
                "        pairs.append((int(data[idx]), int(data[idx + 1])))\n"
                "        idx += 2\n"
                "    result = stable_order(pairs)\n"
                "    print(' '.join(map(str, result)))")
    elif idx == 14:
        body = main_list_out('bubble_vs_insertion')
    elif idx == 15:
        body = main_list_out('passes_until_settled', scalar=True)
    elif idx == 16:
        body = ("    data = sys.stdin.read().split()\n"
                "    n = int(data[0])\n"
                "    words = data[1:1 + n]\n"
                "    result = words_by_length_then_alpha(words)\n"
                "    print(' '.join(result))")
    elif idx == 17:
        body = ("    data = sys.stdin.read().split()\n"
                "    n = int(data[0])\n"
                "    pairs = []\n"
                "    idx = 1\n"
                "    for _ in range(n):\n"
                "        pairs.append((int(data[idx]), int(data[idx + 1])))\n"
                "        idx += 2\n"
                "    result = tuples_by_second(pairs)\n"
                "    out = []\n"
                "    for a, b in result:\n"
                "        out.append(str(a) + ' ' + str(b))\n"
                "    print('\\n'.join(out))")
    elif idx == 18:
        body = ("    data = sys.stdin.read().split()\n"
                "    n = int(data[0])\n"
                "    values = list(map(int, data[1:1 + n]))\n"
                "    states = bubble_trace(values)\n"
                "    lines = []\n"
                "    for state in states:\n"
                "        lines.append(' '.join(map(str, state)))\n"
                "    print('\\n'.join(lines))")
    elif idx == 19:
        body = ("    data = sys.stdin.read().split()\n"
                "    n = int(data[0])\n"
                "    points = []\n"
                "    idx = 1\n"
                "    for _ in range(n):\n"
                "        points.append((int(data[idx]), int(data[idx + 1])))\n"
                "        idx += 2\n"
                "    result = points_by_distance(points)\n"
                "    out = []\n"
                "    for x, y in result:\n"
                "        out.append(str(x) + ' ' + str(y))\n"
                "    print('\\n'.join(out))")
    return T(orig, body)


# ---------------------------------------------------------------- day 7
def day7(idx, q):
    orig = orig_code(q)
    if idx == 0:
        body = ("    data = sys.stdin.read().split()\n"
                "    n = int(data[0])\n"
                "    values = list(map(int, data[1:1 + n]))\n"
                "    k = int(data[1 + n])\n"
                "    print(kth_smallest(values, k))")
    elif idx == 1:
        body = main_list_out('count_inversions', scalar=True)
    elif idx in (2, 6, 17):
        fns = {2: 'merge_sorted', 6: 'merge_catalogs', 17: 'median_two'}
        body = ("    data = sys.stdin.read().split()\n"
                "    n = int(data[0])\n"
                "    a = list(map(int, data[1:1 + n]))\n"
                "    m = int(data[1 + n])\n"
                "    b = list(map(int, data[2 + n:2 + n + m]))\n"
                f"    result = {fns[idx]}(a, b)\n"
                + ("    print(result)" if idx == 17 else
                   "    print(' '.join(map(str, result)))"))
    elif idx == 3:
        body = main_list_out('merge_sort')
    elif idx == 4:
        body = main_list_out('lomuto_index', scalar=True)
    elif idx == 5:
        body = ("    data = sys.stdin.read().split()\n"
                "    n = int(data[0])\n"
                "    values = list(map(int, data[1:1 + n]))\n"
                "    left, right = merge_halves(values)\n"
                "    print(' '.join(map(str, left)))\n"
                "    print(' '.join(map(str, right)))")
    elif idx == 7:
        body = main_list_out('partition_scores')
    elif idx == 8:
        body = main_list_out('lower_median', scalar=True)
    elif idx == 9:
        body = main_list_out('first_pivot_index', scalar=True)
    elif idx == 10:
        body = ("    data = sys.stdin.read().split()\n"
                "    n = int(data[0])\n"
                "    words = data[1:1 + n]\n"
                "    result = merge_sort_titles(words)\n"
                "    print(' '.join(result))")
    elif idx == 11:
        body = ("    data = sys.stdin.read().split()\n"
                "    n = int(data[0])\n"
                "    values = list(map(int, data[1:1 + n]))\n"
                "    k = int(data[1 + n])\n"
                "    print(quickselect_kth(values, k))")
    elif idx == 12:
        body = main_list_out('changed_positions', scalar=True)
    elif idx == 13:
        body = ("    data = sys.stdin.read().split()\n"
                "    n = int(data[0])\n"
                "    pairs = []\n"
                "    idx = 1\n"
                "    for _ in range(n):\n"
                "        pairs.append((int(data[idx]), int(data[idx + 1])))\n"
                "        idx += 2\n"
                "    result = stable_ids(pairs)\n"
                "    print(' '.join(map(str, result)))")
    elif idx == 14:
        body = main_list_out('lomuto_swaps', scalar=True)
    elif idx == 15:
        body = main_list_out('quicksort_list')
        return T(orig, body, recursion=True)
    elif idx == 16:
        body = main_list_out('inversion_count', scalar=True)
    elif idx == 18:
        body = main_list_out('minimum_swaps', scalar=True)
    elif idx == 19:
        body = ("    data = sys.stdin.read().split()\n"
                "    n = int(data[0])\n"
                "    pairs = []\n"
                "    idx = 1\n"
                "    for _ in range(n):\n"
                "        pairs.append((data[idx], int(data[idx + 1])))\n"
                "        idx += 2\n"
                "    names = leaderboard(pairs)\n"
                "    print('\\n'.join(names))")
    return T(orig, body, recursion=True)


# ---------------------------------------------------------------- day 8
def day8(idx, q):
    orig = orig_code(q)
    if idx in (0, 1, 2, 6, 7, 8, 9, 12, 18):
        fns = {0: 'fib', 1: 'factorial', 2: 'digit_sum', 6: 'pick_orders',
               7: 'colony_pairs', 8: 'digital_root', 9: 'climb_ways',
               12: 'hanoi_moves', 18: 'n_queens'}
        body = ("    n = int(sys.stdin.read().split()[0])\n"
                f"    print({fns[idx]}(n))")
    elif idx == 3:
        body = ("    s = sys.stdin.readline().rstrip('\\r\\n')\n"
                "    print(reverse_string(s))")
    elif idx == 4:
        body = ("    data = sys.stdin.read().split()\n"
                "    a = int(data[0])\n"
                "    b = int(data[1])\n"
                "    print(gcd(a, b))")
    elif idx == 5:
        body = ("    n = int(sys.stdin.read().split()[0])\n"
                "    result = countdown(n)\n"
                "    print(' '.join(map(str, result)))")
    elif idx == 10:
        body = ("    data = sys.stdin.read().split()\n"
                "    base = int(data[0])\n"
                "    e = int(data[1])\n"
                "    print(fast_power(base, e))")
    elif idx == 11:
        body = ("    data = sys.stdin.read().split()\n"
                "    n = int(data[0])\n"
                "    values = list(map(int, data[1:1 + n]))\n"
                "    x = int(data[1 + n])\n"
                "    print(binary_search_recursive(values, x))")
    elif idx == 13:
        body = ("    data = sys.stdin.read().split()\n"
                "    n = int(data[0])\n"
                "    values = list(map(int, data[1:1 + n]))\n"
                "    target = int(data[1 + n])\n"
                "    print(count_subsets(values, target))")
    elif idx == 14:
        body = ("    letters = sys.stdin.read().split()[0]\n"
                "    print(count_arrangements(letters))")
    elif idx == 15:
        body = ("    data = sys.stdin.read().split()\n"
                "    n = int(data[0])\n"
                "    d = int(data[1])\n"
                "    print(count_digit(n, d))")
    elif idx == 16:
        body = ("    data = sys.stdin.read().split()\n"
                "    n = int(data[0])\n"
                "    values = list(map(int, data[1:1 + n]))\n"
                "    subs = all_subsets(values)\n"
                "    subs.sort()\n"
                "    lines = []\n"
                "    for s in subs:\n"
                "        lines.append(' '.join(map(str, s)))\n"
                "    print('\\n'.join(lines))")
    elif idx == 17:
        body = ("    data = sys.stdin.read().split()\n"
                "    letters = data[0]\n"
                "    k = int(data[1])\n"
                "    print(nth_permutation(letters, k))")
    elif idx == 19:
        body = ("    data = sys.stdin.read().split()\n"
                "    n = int(data[0])\n"
                "    values = list(map(int, data[1:1 + n]))\n"
                "    target = int(data[1 + n])\n"
                "    print(count_subsets_neg(values, target))")
    return T(orig, body, recursion=True)


# ---------------------------------------------------------------- day 9
DAY9_PRELUDE = """

class Node:
    def __init__(self, value):
        self.value = value
        self.next = None


def build_chain(values):
    head = None
    tail = None
    for v in values:
        node = Node(v)
        if head is None:
            head = node
        else:
            tail.next = node
        tail = node
    return head


def chain_values(head):
    out = []
    node = head
    while node is not None:
        out.append(node.value)
        node = node.next
    return out"""


def day9_cycle_builder():
    return """

def build_chain_with_cycle(values, pos):
    head = build_chain(values)
    if pos >= 0:
        tail = head
        while tail.next is not None:
            tail = tail.next
        target = head
        steps = pos
        while steps > 0:
            target = target.next
            steps -= 1
        tail.next = target
    return head"""


def day9(idx, q):
    orig = orig_code(q)
    prelude = DAY9_PRELUDE

    def parse_list_x(xname='x'):
        return ("    data = sys.stdin.read().split()\n"
                "    n = int(data[0])\n"
                "    values = list(map(int, data[1:1 + n]))\n"
                f"    {xname} = int(data[1 + n])\n"
                "    head = build_chain(values)\n")

    if idx == 3:
        body = parse_list_x() + "    print(find_index(head, x))"
    elif idx in (0, 11, 16):
        fns = {0: 'delete_first', 11: 'insert_in_order', 16: 'delete_all'}
        body = parse_list_x() + (f"    head = {fns[idx]}(head, x)\n"
                                 "    print(' '.join(map(str, chain_values(head))))")
    elif idx in (1, 2, 6, 8, 9, 10):
        fns = {1: 'list_length', 2: 'list_sum', 6: 'middle_value',
               8: 'peak_reading', 9: 'count_negative', 10: 'tail_value'}
        body = ("    data = sys.stdin.read().split()\n"
                "    n = int(data[0])\n"
                "    values = list(map(int, data[1:1 + n]))\n"
                "    head = build_chain(values)\n"
                f"    print({fns[idx]}(head))")
    elif idx == 4:
        body = parse_list_x('pos') + "    print(value_at(head, pos))"
    elif idx == 5:
        body = ("    data = sys.stdin.read().split()\n"
                "    n = int(data[0])\n"
                "    values = list(map(int, data[1:1 + n]))\n"
                "    head = build_chain(values)\n"
                "    head = reverse_list(head)\n"
                "    print(' '.join(map(str, chain_values(head))))")
    elif idx == 7:
        body = ("    data = sys.stdin.read().split()\n"
                "    n = int(data[0])\n"
                "    values = list(map(int, data[1:1 + n]))\n"
                "    head = build_chain(values)\n"
                "    print(to_arrow(head))")
    elif idx == 12:
        body = ("    data = sys.stdin.read().split()\n"
                "    n = int(data[0])\n"
                "    values = list(map(int, data[1:1 + n]))\n"
                "    pos = int(data[1 + n])\n"
                "    head = build_chain_with_cycle(values, pos)\n"
                "    print(has_cycle(head))")
        prelude = DAY9_PRELUDE + day9_cycle_builder()
    elif idx == 13:
        body = parse_list_x('k') + "    print(kth_from_end(head, k))"
        # blacklist len( -> make sure nothing in the program uses len()
        src = T(orig, body, prelude=prelude, recursion=True)
        assert 'len(' not in src, 'len( found in day9 q13'
        return src
    elif idx == 14:
        body = ("    data = sys.stdin.read().split()\n"
                "    n = int(data[0])\n"
                "    values = list(map(int, data[1:1 + n]))\n"
                "    pos = int(data[1 + n])\n"
                "    x = int(data[2 + n])\n"
                "    head = build_chain(values)\n"
                "    head = insert_at(head, pos, x)\n"
                "    print(' '.join(map(str, chain_values(head))))")
    elif idx == 15:
        body = ("    data = sys.stdin.read().split()\n"
                "    n = int(data[0])\n"
                "    values = list(map(int, data[1:1 + n]))\n"
                "    head = build_chain(values)\n"
                "    head = delete_alternates(head)\n"
                "    print(' '.join(map(str, chain_values(head))))")
    elif idx == 17:
        body = ("    data = sys.stdin.read().split()\n"
                "    n1 = int(data[0])\n"
                "    a = list(map(int, data[1:1 + n1]))\n"
                "    n2 = int(data[1 + n1])\n"
                "    b = list(map(int, data[2 + n1:2 + n1 + n2]))\n"
                "    head1 = build_chain(a)\n"
                "    head2 = build_chain(b)\n"
                "    merged = merge_chains(head1, head2)\n"
                "    print(' '.join(map(str, chain_values(merged))))")
    elif idx == 18:
        body = ("    data = sys.stdin.read().split()\n"
                "    n = int(data[0])\n"
                "    values = list(map(int, data[1:1 + n]))\n"
                "    pos = int(data[1 + n])\n"
                "    head = build_chain_with_cycle(values, pos)\n"
                "    print(cycle_start(head))")
        prelude = DAY9_PRELUDE + day9_cycle_builder()
    elif idx == 19:
        body = parse_list_x('k') + ("    head = reverse_groups(head, k)\n"
                                    "    print(' '.join(map(str, chain_values(head))))")
    return T(orig, body, prelude=prelude, recursion=True)


# ---------------------------------------------------------------- day 10
DAY10_PRELUDE = """

class Node:
    def __init__(self, value):
        self.value = value
        self.prev = None
        self.next = None


def build_dll_chain(values):
    head = None
    tail = None
    for v in values:
        node = Node(v)
        node.prev = tail
        if head is None:
            head = node
        else:
            tail.next = node
        tail = node
    return head


def build_singly(values):
    head = None
    tail = None
    for v in values:
        node = Node(v)
        if head is None:
            head = node
        else:
            tail.next = node
        tail = node
    return head


def tail_node(head):
    node = head
    while node.next is not None:
        node = node.next
    return node


def dll_forward(head):
    out = []
    node = head
    while node is not None:
        out.append(node.value)
        node = node.next
    return out


def dll_backward(head):
    node = tail_node(head)
    out = []
    while node is not None:
        out.append(node.value)
        node = node.prev
    return out


def build_circle(values):
    head = build_singly(values)
    tail = tail_node(head)
    tail.next = head
    return head


def circle_lap(head):
    out = [head.value]
    node = head.next
    while node is not head:
        out.append(node.value)
        node = node.next
    return out"""


def day10(idx, q):
    orig = orig_code(q)
    parse_n = ("    data = sys.stdin.read().split()\n"
               "    n = int(data[0])\n"
               "    values = list(map(int, data[1:1 + n]))\n")

    def two_line_print(head):
        return ("    print(' '.join(map(str, dll_forward(head))))\n"
                "    print(' '.join(map(str, dll_backward(head))))")

    if idx == 0:
        body = parse_n + ("    x = int(data[1 + n])\n"
                          "    head = build_dll_chain(values)\n"
                          "    head = insert_back(head, x)\n" + two_line_print('head'))
    elif idx == 1:
        body = parse_n + ("    x = int(data[1 + n])\n"
                          "    head = build_dll_chain(values)\n"
                          "    tail = tail_node(head)\n"
                          "    print(find_from_tail(tail, x))")
    elif idx == 2:
        body = parse_n + ("    head = build_dll_chain(values)\n"
                          "    print(dll_length(head))")
    elif idx == 3:
        body = parse_n + ("    head = build_dll(values)\n" + two_line_print('head'))
    elif idx == 4:
        body = parse_n + ("    head = build_circle(values)\n"
                          "    print(circular_length(head))")
    elif idx == 5:
        body = parse_n + ("    c = int(data[1 + n])\n"
                          "    if c == 1:\n"
                          "        head = build_circle(values)\n"
                          "    else:\n"
                          "        head = build_singly(values)\n"
                          "    print(is_circular(head))")
    elif idx == 6:
        body = parse_n + ("    head = build_circle(values)\n"
                          "    result = circular_values(head)\n"
                          "    print(' '.join(map(str, result)))")
    elif idx == 7:
        body = parse_n + ("    i = int(data[1 + n])\n"
                          "    head = build_dll_chain(values)\n"
                          "    result = neighbours(head, i)\n"
                          "    print(' '.join(map(str, result)))")
    elif idx == 8:
        body = parse_n + ("    k = int(data[1 + n])\n"
                          "    head = build_circle(values)\n"
                          "    print(turn_holder(head, k))")
    elif idx == 9:
        body = parse_n + ("    head = build_dll_chain(values)\n"
                          "    print(last_action(head))")
    elif idx == 10:
        body = parse_n + ("    x = int(data[1 + n])\n"
                          "    head = build_dll_chain(values)\n"
                          "    head = insert_front(head, x)\n" + two_line_print('head'))
    elif idx == 11:
        body = parse_n + ("    pos = int(data[1 + n])\n"
                          "    head = build_dll_chain(values)\n"
                          "    head = dll_delete_at(head, pos)\n" + two_line_print('head'))
    elif idx == 12:
        body = parse_n + ("    x = int(data[1 + n])\n"
                          "    head = build_circle(values)\n"
                          "    head = circular_insert_back(head, x)\n"
                          "    print(' '.join(map(str, circle_lap(head))))")
    elif idx == 13:
        body = parse_n + ("    pos = int(data[1 + n])\n"
                          "    x = int(data[2 + n])\n"
                          "    head = build_dll_chain(values)\n"
                          "    head = dll_insert_at(head, pos, x)\n" + two_line_print('head'))
    elif idx == 14:
        body = parse_n + ("    c = int(data[1 + n])\n"
                          "    head = build_dll_chain(values)\n"
                          "    if c == 1:\n"
                          "        tail = tail_node(head)\n"
                          "        tail.next = head\n"
                          "        head.prev = tail\n"
                          "    print(is_dll_circular(head))")
    elif idx == 15:
        # blacklist len( -> nothing may use len()
        body = parse_n + ("    head = build_circle(values)\n"
                          "    head1, head2 = split_circle(head)\n"
                          "    print(' '.join(map(str, circle_lap(head1))))\n"
                          "    print(' '.join(map(str, circle_lap(head2))))")
        src = T(orig, body, prelude=DAY10_PRELUDE, recursion=True)
        assert 'len(' not in src, 'len( found in day10 q15'
        return src
    elif idx == 16:
        body = parse_n + ("    k = int(data[1 + n])\n"
                          "    head = build_circle(values)\n"
                          "    print(josephus_survivor(head, k))")
    elif idx == 17:
        body = parse_n + ("    x = int(data[1 + n])\n"
                          "    head = build_dll_chain(values)\n"
                          "    head = dll_insert_ascending(head, x)\n" + two_line_print('head'))
    elif idx == 18:
        body = parse_n + ("    c = int(data[1 + n])\n"
                          "    head = build_singly(values)\n"
                          "    if c == 1:\n"
                          "        tail = tail_node(head)\n"
                          "        tail.next = head\n"
                          "    report = ensure_circular(head)\n"
                          "    print(report)\n"
                          "    print(' '.join(map(str, circle_lap(head))))")
    elif idx == 19:
        body = parse_n + ("    head = build_dll_chain(values)\n"
                          "    head = reverse_dll(head)\n" + two_line_print('head'))
    return T(orig, body, prelude=DAY10_PRELUDE, recursion=True)


BUILDERS = {6: day6, 7: day7, 8: day8, 9: day9, 10: day10}


def build_day(nn):
    with open(f'{SRC}/day-{nn:02d}.code.json', encoding='utf-8') as f:
        data = json.load(f)
    builder = BUILDERS[nn]
    out = copy.deepcopy(data)
    for i, q in enumerate(out['questions']):
        q['sourcecode'] = builder(i, q)
    os.makedirs(DST, exist_ok=True)
    dst = f'{DST}/day-{nn:02d}.code.json'
    with open(dst, 'w', encoding='utf-8') as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
    print(f'wrote {dst} ({len(out["questions"])} questions)')

    # MCQ copy without _id
    with open(f'{SRC}/day-{nn:02d}.mcq.json', encoding='utf-8') as f:
        mcq = json.load(f)
    mcq_out = {'day': mcq.get('day'), 'questions': []}
    for q in mcq['questions']:
        nq = {k: v for k, v in q.items() if k != '_id'}
        mcq_out['questions'].append(nq)
    mdst = f'{DST}/day-{nn:02d}.mcq.json'
    with open(mdst, 'w', encoding='utf-8') as f:
        json.dump(mcq_out, f, ensure_ascii=False, indent=2)
    print(f'wrote {mdst} ({len(mcq_out["questions"])} questions)')


if __name__ == '__main__':
    for nn in (6, 7, 8, 9, 10):
        build_day(nn)
