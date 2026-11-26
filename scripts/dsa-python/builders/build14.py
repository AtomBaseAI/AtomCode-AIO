"""Build day-14.code.json (Binary Trees) + day-14.mcq.json with complete standalone programs.

Every program embeds a TNode class and a level-order BFS builder where -1 marks a
missing child. The declared n on line 1 is unreliable, so the whole token line is
consumed instead. Blacklisted keywords (e.g. 'len(', 'import', 'max(') are avoided
per question.
"""
import json

EXPORT = '/home/z/tmp/dsa-export/dsa-python/day-14.code.json'
OUT = '/home/z/my-project/scripts/dsa-python/data/day-14.code.json'
MCQ_IN = '/home/z/tmp/dsa-export/dsa-python/day-14.mcq.json'
MCQ_OUT = '/home/z/my-project/scripts/dsa-python/data/day-14.mcq.json'

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
'''

P = {}

# [0] bans 'len(' -> builder/recursion avoid it; max() allowed.
P[0] = READER + TREE + '''

def height(root):
    if root is None:
        return 0
    return 1 + max(height(root.left), height(root.right))


def diameter(root):
    if root is None:
        return 0
    through_root = height(root.left) + height(root.right) + 1
    return max(through_root, diameter(root.left), diameter(root.right))


def main():
    lines = read_lines()
    tokens = list(map(int, lines[1].split()))
    print(diameter(build_tree(tokens)))


main()
'''

P[1] = READER + TREE + '''

def preorder(root, out):
    if root is None:
        return
    out.append(root.val)
    preorder(root.left, out)
    preorder(root.right, out)


def main():
    lines = read_lines()
    root = build_tree(list(map(int, lines[1].split())))
    out = []
    preorder(root, out)
    print(' '.join(map(str, out)))


main()
'''

P[2] = READER + TREE + '''

def inorder(root, out):
    if root is None:
        return
    inorder(root.left, out)
    out.append(root.val)
    inorder(root.right, out)


def main():
    lines = read_lines()
    root = build_tree(list(map(int, lines[1].split())))
    out = []
    inorder(root, out)
    print(' '.join(map(str, out)))


main()
'''

P[3] = READER + TREE + '''

def postorder(root, out):
    if root is None:
        return
    postorder(root.left, out)
    postorder(root.right, out)
    out.append(root.val)


def main():
    lines = read_lines()
    root = build_tree(list(map(int, lines[1].split())))
    out = []
    postorder(root, out)
    print(' '.join(map(str, out)))


main()
'''

P[4] = READER + TREE + '''

def height(root):
    if root is None:
        return 0
    lh = height(root.left)
    rh = height(root.right)
    if lh > rh:
        return lh + 1
    return rh + 1


def main():
    lines = read_lines()
    root = build_tree(list(map(int, lines[1].split())))
    print(height(root))


main()
'''

P[5] = READER + TREE + '''

def count_nodes(root):
    if root is None:
        return 0
    return 1 + count_nodes(root.left) + count_nodes(root.right)


def main():
    lines = read_lines()
    root = build_tree(list(map(int, lines[1].split())))
    print(count_nodes(root))


main()
'''

P[6] = READER + TREE + '''

def count_leaves(root):
    if root is None:
        return 0
    if root.left is None and root.right is None:
        return 1
    return count_leaves(root.left) + count_leaves(root.right)


def main():
    lines = read_lines()
    root = build_tree(list(map(int, lines[1].split())))
    print(count_leaves(root))


main()
'''

P[7] = READER + TREE + '''

def preorder(root, out):
    if root is None:
        return
    out.append(root.val)
    preorder(root.left, out)
    preorder(root.right, out)


def main():
    lines = read_lines()
    root = build_tree(list(map(int, lines[1].split())))
    out = []
    preorder(root, out)
    print(' '.join(map(str, out)))


main()
'''

P[8] = READER + TREE + '''

def inorder(root, out):
    if root is None:
        return
    inorder(root.left, out)
    out.append(root.val)
    inorder(root.right, out)


def main():
    lines = read_lines()
    root = build_tree(list(map(int, lines[1].split())))
    out = []
    inorder(root, out)
    print(' '.join(map(str, out)))


main()
'''

P[9] = READER + TREE + '''

def height(root):
    if root is None:
        return 0
    lh = height(root.left)
    rh = height(root.right)
    if lh > rh:
        return lh + 1
    return rh + 1


def main():
    lines = read_lines()
    root = build_tree(list(map(int, lines[1].split())))
    print(height(root))


main()
'''

P[10] = READER + TREE + '''

def count_leaves(root):
    if root is None:
        return 0
    if root.left is None and root.right is None:
        return 1
    return count_leaves(root.left) + count_leaves(root.right)


def main():
    lines = read_lines()
    root = build_tree(list(map(int, lines[1].split())))
    print(count_leaves(root))


main()
'''

# [11] bans 'dict(' and 'set('
P[11] = READER + TREE + '''

def left_leaf_sum(root):
    if root is None:
        return 0
    total = 0
    if root.left is not None and root.left.left is None and root.left.right is None:
        total += root.left.val
    total += left_leaf_sum(root.left) + left_leaf_sum(root.right)
    return total


def main():
    lines = read_lines()
    root = build_tree(list(map(int, lines[1].split())))
    print(left_leaf_sum(root))


main()
'''

# [12] bans 'dict(' and 'set('
P[12] = READER + TREE + '''

def count_single_child(root):
    if root is None:
        return 0
    count = 0
    has_left = root.left is not None
    has_right = root.right is not None
    if has_left != has_right:
        count += 1
    return count + count_single_child(root.left) + count_single_child(root.right)


def main():
    lines = read_lines()
    root = build_tree(list(map(int, lines[1].split())))
    print(count_single_child(root))


main()
'''

# [13] bans 'max(' -> explicit comparisons only.
P[13] = READER + TREE + '''

def peak_load(root):
    best = root.val
    if root.left is not None:
        l = peak_load(root.left)
        if l > best:
            best = l
    if root.right is not None:
        r = peak_load(root.right)
        if r > best:
            best = r
    return best


def main():
    lines = read_lines()
    root = build_tree(list(map(int, lines[1].split())))
    print(peak_load(root))


main()
'''

# [14] bans 'import' -> plain input() reading, no sys.
P[14] = TREE + '''

def depth_of(root, x):
    if root is None:
        return -1
    if root.val == x:
        return 0
    left = depth_of(root.left, x)
    if left != -1:
        return left + 1
    right = depth_of(root.right, x)
    if right != -1:
        return right + 1
    return -1


def main():
    input()  # declared count (unreliable)
    tokens = list(map(int, input().split()))
    x = int(input())
    print(depth_of(build_tree(tokens), x))


main()
'''

# [15] bans 'import' -> plain input() reading, no sys.
P[15] = TREE + '''

def count_at_least(root, x):
    if root is None:
        return 0
    count = 1 if root.val >= x else 0
    return count + count_at_least(root.left, x) + count_at_least(root.right, x)


def main():
    input()  # declared count (unreliable)
    tokens = list(map(int, input().split()))
    x = int(input())
    print(count_at_least(build_tree(tokens), x))


main()
'''

# [16] bans 'max(' and 'min('
P[16] = READER + TREE + '''

def find_node(root, x):
    if root is None:
        return None
    if root.val == x:
        return root
    found = find_node(root.left, x)
    if found is not None:
        return found
    return find_node(root.right, x)


def collect(root):
    if root is None:
        return 0
    return root.val + collect(root.left) + collect(root.right)


def subtree_sum(root, x):
    node = find_node(root, x)
    if node is None:
        return 0
    return collect(node)


def main():
    lines = read_lines()
    root = build_tree(list(map(int, lines[1].split())))
    x = int(lines[2])
    print(subtree_sum(root, x))


main()
'''

# [17] bans 'collections' and 'popleft' -> plain list queue with pop(0).
P[17] = READER + TREE + '''

def level_order(root, out):
    if root is None:
        return
    queue = [root]
    while queue:
        node = queue.pop(0)
        out.append(node.val)
        if node.left is not None:
            queue.append(node.left)
        if node.right is not None:
            queue.append(node.right)


def main():
    lines = read_lines()
    root = build_tree(list(map(int, lines[1].split())))
    out = []
    level_order(root, out)
    print(' '.join(map(str, out)))


main()
'''

# [18] bans 'set('
P[18] = READER + TREE + '''

def is_identical(a, b):
    if a is None and b is None:
        return True
    if a is None or b is None:
        return False
    if a.val != b.val:
        return False
    return is_identical(a.left, b.left) and is_identical(a.right, b.right)


def main():
    lines = read_lines()
    a = build_tree(list(map(int, lines[1].split())))
    b = build_tree(list(map(int, lines[3].split())))
    print(is_identical(a, b))


main()
'''

# [19] bans 'sorted('
P[19] = READER + TREE + '''

def is_mirror(a, b):
    if a is None and b is None:
        return True
    if a is None or b is None:
        return False
    if a.val != b.val:
        return False
    return is_mirror(a.left, b.right) and is_mirror(a.right, b.left)


def main():
    lines = read_lines()
    a = build_tree(list(map(int, lines[1].split())))
    b = build_tree(list(map(int, lines[3].split())))
    print(is_mirror(a, b))


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
print('day-14 written:', OUT, MCQ_OUT)
