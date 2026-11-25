"""Build day-15.code.json (BSTs and Heaps) + day-15.mcq.json with complete standalone programs.

Tree programs embed a TNode class and a level-order BFS builder (-1 = missing child);
the declared n on line 1 is unreliable so the whole token line is consumed.
"""
import json

EXPORT = '/home/z/tmp/dsa-export/dsa-python/day-15.code.json'
OUT = '/home/z/my-project/scripts/dsa-python/data/day-15.code.json'
MCQ_IN = '/home/z/tmp/dsa-export/dsa-python/day-15.mcq.json'
MCQ_OUT = '/home/z/my-project/scripts/dsa-python/data/day-15.mcq.json'

READER = '''import sys

sys.setrecursionlimit(300000)


def read_lines():
    return [ln.strip() for ln in sys.stdin.read().split('\\n') if ln.strip() != '']
'''

TREE = '''

class TNode:
    def __init__(self, v):
        self.val = v
        self.left = None
        self.right = None


def build_tree(tokens):
    it = iter(tokens)
    first = next(it, -1)
    if first == -1:
        return None
    root = TNode(first)
    q = [root]
    for node in q:
        l = next(it, -1)
        if l != -1:
            node.left = TNode(l)
            q.append(node.left)
        r = next(it, -1)
        if r != -1:
            node.right = TNode(r)
            q.append(node.right)
    return root


def inorder_values(root):
    out = []

    def walk(node):
        if node is None:
            return
        walk(node.left)
        out.append(node.val)
        walk(node.right)

    walk(root)
    return out
'''

INORDER_PRINT = '''
    root = build_tree(list(map(int, lines[1].split())))
'''

P = {}

P[0] = READER + TREE + '''

def bst_insert(root, x):
    if root is None:
        return TNode(x)
    if x < root.val:
        root.left = bst_insert(root.left, x)
    elif x > root.val:
        root.right = bst_insert(root.right, x)
    return root


def main():
    lines = read_lines()
    root = build_tree(list(map(int, lines[1].split())))
    x = int(lines[2])
    root = bst_insert(root, x)
    print(' '.join(map(str, inorder_values(root))))


main()
'''

P[1] = READER + TREE + '''

def bst_search(root, x):
    node = root
    while node is not None:
        if x == node.val:
            return True
        if x < node.val:
            node = node.left
        else:
            node = node.right
    return False


def main():
    lines = read_lines()
    root = build_tree(list(map(int, lines[1].split())))
    x = int(lines[2])
    print(bst_search(root, x))


main()
'''

P[2] = READER + TREE + '''

def bst_min(root):
    node = root
    while node.left is not None:
        node = node.left
    return node.val


def main():
    lines = read_lines()
    root = build_tree(list(map(int, lines[1].split())))
    print(bst_min(root))


main()
'''

P[3] = READER + TREE + '''

def bst_max(root):
    node = root
    while node.right is not None:
        node = node.right
    return node.val


def main():
    lines = read_lines()
    root = build_tree(list(map(int, lines[1].split())))
    print(bst_max(root))


main()
'''

P[4] = READER + TREE + '''

def bst_sum(root):
    if root is None:
        return 0
    return root.val + bst_sum(root.left) + bst_sum(root.right)


def main():
    lines = read_lines()
    root = build_tree(list(map(int, lines[1].split())))
    print(bst_sum(root))


main()
'''

P[5] = READER + '''

def heap_indices(i):
    return [2 * i + 1, 2 * i + 2]


def main():
    lines = read_lines()
    i = int(lines[0])
    print(' '.join(map(str, heap_indices(i))))


main()
'''

P[6] = READER + TREE + '''

def bst_insert(root, x):
    if root is None:
        return TNode(x)
    if x < root.val:
        root.left = bst_insert(root.left, x)
    elif x > root.val:
        root.right = bst_insert(root.right, x)
    return root


def main():
    lines = read_lines()
    root = build_tree(list(map(int, lines[1].split())))
    x = int(lines[2])
    root = bst_insert(root, x)
    print(' '.join(map(str, inorder_values(root))))


main()
'''

P[7] = READER + TREE + '''

def bst_search(root, x):
    node = root
    while node is not None:
        if x == node.val:
            return True
        if x < node.val:
            node = node.left
        else:
            node = node.right
    return False


def main():
    lines = read_lines()
    root = build_tree(list(map(int, lines[1].split())))
    x = int(lines[2])
    print(bst_search(root, x))


main()
'''

P[8] = READER + TREE + '''

def bst_min(root):
    node = root
    while node.left is not None:
        node = node.left
    return node.val


def main():
    lines = read_lines()
    root = build_tree(list(map(int, lines[1].split())))
    print(bst_min(root))


main()
'''

P[9] = READER + TREE + '''

def bst_max(root):
    node = root
    while node.right is not None:
        node = node.right
    return node.val


def main():
    lines = read_lines()
    root = build_tree(list(map(int, lines[1].split())))
    print(bst_max(root))


main()
'''

P[10] = READER + TREE + '''

def kth_smallest(root, k):
    stack = []
    node = root
    while stack or node is not None:
        while node is not None:
            stack.append(node)
            node = node.left
        node = stack.pop()
        k -= 1
        if k == 0:
            return node.val
        node = node.right
    return -1


def main():
    lines = read_lines()
    root = build_tree(list(map(int, lines[1].split())))
    k = int(lines[2])
    print(kth_smallest(root, k))


main()
'''

P[11] = '''import heapq
import sys


def read_lines():
    return [ln.strip() for ln in sys.stdin.read().split('\\n') if ln.strip() != '']


def to_min_heap(nums):
    heap = list(nums)
    heapq.heapify(heap)
    return heap


def main():
    lines = read_lines()
    nums = list(map(int, lines[1].split()))
    print(' '.join(map(str, to_min_heap(nums))))


main()
'''

P[12] = '''import heapq
import sys


def read_lines():
    return [ln.strip() for ln in sys.stdin.read().split('\\n') if ln.strip() != '']


def process_ops(ops):
    heap = []
    popped = []
    for op, x in ops:
        if op == "push":
            heapq.heappush(heap, x)
        else:
            if heap:
                popped.append(heapq.heappop(heap))
    return popped


def main():
    lines = read_lines()
    ops = []
    for ln in lines[1:]:
        parts = ln.split()
        if parts[0] == "push":
            ops.append(("push", int(parts[1])))
        else:
            ops.append(("pop", 0))
    print(' '.join(map(str, process_ops(ops))))


main()
'''

P[13] = READER + TREE + '''

def insert_one(root, x):
    if root is None:
        return TNode(x)
    if x < root.val:
        root.left = insert_one(root.left, x)
    else:
        root.right = insert_one(root.right, x)
    return root


def insert_all(root, xs):
    for x in xs:
        root = insert_one(root, x)
    return root


def main():
    lines = read_lines()
    root = build_tree(list(map(int, lines[1].split())))
    batch = list(map(int, lines[3].split()))
    root = insert_all(root, batch)
    print(' '.join(map(str, inorder_values(root))))


main()
'''

P[14] = READER + TREE + '''

def delete_leaf(root, x):
    if root is None:
        return None
    if x < root.val:
        root.left = delete_leaf(root.left, x)
    elif x > root.val:
        root.right = delete_leaf(root.right, x)
    else:
        return None
    return root


def main():
    lines = read_lines()
    root = build_tree(list(map(int, lines[1].split())))
    x = int(lines[2])
    root = delete_leaf(root, x)
    print(' '.join(map(str, inorder_values(root))))


main()
'''

P[15] = '''import heapq
import sys


def read_lines():
    return [ln.strip() for ln in sys.stdin.read().split('\\n') if ln.strip() != '']


def drain_heap(nums):
    heap = list(nums)
    heapq.heapify(heap)
    drained = []
    while heap:
        drained.append(heapq.heappop(heap))
    return drained


def main():
    lines = read_lines()
    nums = list(map(int, lines[1].split()))
    print(' '.join(map(str, drain_heap(nums))))


main()
'''

P[16] = READER + TREE + '''

def is_bst(root):
    def check(node, lo, hi):
        if node is None:
            return True
        if node.val <= lo or node.val >= hi:
            return False
        return check(node.left, lo, node.val) and check(node.right, node.val, hi)
    return check(root, float("-inf"), float("inf"))


def main():
    lines = read_lines()
    root = build_tree(list(map(int, lines[1].split())))
    print(is_bst(root))


main()
'''

P[17] = '''import heapq
import sys


def read_lines():
    return [ln.strip() for ln in sys.stdin.read().split('\\n') if ln.strip() != '']


def kth_largest(nums, k):
    heap = []
    for x in nums:
        if len(heap) < k:
            heapq.heappush(heap, x)
        elif x > heap[0]:
            heapq.heapreplace(heap, x)
    return heap[0]


def main():
    lines = read_lines()
    nums = list(map(int, lines[1].split()))
    k = int(lines[2])
    print(kth_largest(nums, k))


main()
'''

P[18] = READER + TREE + '''

def bst_delete(root, x):
    if root is None:
        return None
    if x < root.val:
        root.left = bst_delete(root.left, x)
    elif x > root.val:
        root.right = bst_delete(root.right, x)
    else:
        if root.left is None:
            return root.right
        if root.right is None:
            return root.left
        successor = root.right
        while successor.left is not None:
            successor = successor.left
        root.val = successor.val
        root.right = bst_delete(root.right, successor.val)
    return root


def main():
    lines = read_lines()
    root = build_tree(list(map(int, lines[1].split())))
    x = int(lines[2])
    root = bst_delete(root, x)
    print(' '.join(map(str, inorder_values(root))))


main()
'''

P[19] = READER + TREE + '''

def count_range(root, lo, hi):
    if root is None:
        return 0
    if root.val < lo:
        return count_range(root.right, lo, hi)
    if root.val > hi:
        return count_range(root.left, lo, hi)
    return 1 + count_range(root.left, lo, hi) + count_range(root.right, lo, hi)


def main():
    lines = read_lines()
    root = build_tree(list(map(int, lines[1].split())))
    lo = int(lines[2])
    hi = int(lines[3])
    print(count_range(root, lo, hi))


main()
'''

data = json.load(open(EXPORT))
assert len(data['questions']) == len(P) == 20
for i, q in enumerate(data['questions']):
    code = P[i]
    q['sourcecode'] = code
    for b in [x for x in (q.get('blacklist') or '').split(',') if x]:
        assert b not in code, (i, q['title'], 'BLACKLIST VIOLATION', b)
    for w in [x for x in (q.get('whitelist') or '').split(',') if x]:
        assert w in code, (i, q['title'], 'WHITELIST MISSING', w)
with open(OUT, 'w') as f:
    json.dump(data, f, indent=2)

mcq = json.load(open(MCQ_IN))
for q in mcq['questions']:
    q.pop('_id', None)
with open(MCQ_OUT, 'w') as f:
    json.dump(mcq, f, indent=2)
print('day-15 written:', OUT, MCQ_OUT)
