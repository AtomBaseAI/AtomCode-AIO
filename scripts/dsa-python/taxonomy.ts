/**
 * DSA Using Python — 20-day curriculum taxonomy (Day N topic = index N-1).
 * Regenerate data files from builders; this file documents the topic map
 * used by seed.ts and the validator.
 */
export interface TopicDef {
  name: string;
  subtopics: string[];
}

export const DAY_TOPICS: TopicDef[] = [
  { name: "Introduction to DSA and Python Setup", subtopics: ["general","Data Structures and Algorithms Overview","Python Execution Model","IDE and Notebook Setup","Virtual Environments","Writing and Running a Python Program"] },
  { name: "Algorithm Analysis and Complexity", subtopics: ["general","Time Complexity","Space Complexity","Best Average and Worst Cases","Big-O Notation","Big-Omega and Big-Theta","Analysing Loops and Growth"] },
  { name: "Lists and Arrays", subtopics: ["general","Indexed Storage with Lists","Indexing and Slicing","Traversal","Insertion and Deletion","Reversing and Extrema","Removing Duplicates"] },
  { name: "Strings and Character Processing", subtopics: ["general","String Immutability","Indexing and Slicing Strings","Common String Methods","Palindrome Check","Character Frequency","Anagram Validation"] },
  { name: "Searching Algorithms", subtopics: ["general","Linear Search","Binary Search","Sorted-Input Requirements","First and Last Occurrence","Search Efficiency"] },
  { name: "Sorting Algorithms – Basics", subtopics: ["general","Bubble Sort","Selection Sort","Insertion Sort","Time and Space Comparison","Tracing Sorting Steps"] },
  { name: "Efficient Sorting Algorithms", subtopics: ["general","Merge Sort","Quicksort","Partitioning","Recursion in Sorting","Auxiliary Memory and Stability"] },
  { name: "Recursion and Backtracking Basics", subtopics: ["general","Base Cases","Recursion Trees","Call Stack","Factorial and Fibonacci","Subsets and Permutations"] },
  { name: "Singly Linked Lists", subtopics: ["general","Node Structures","Dynamic Allocation","Traversal","Insertion and Deletion","Reversing a List"] },
  { name: "Doubly and Circular Linked Lists", subtopics: ["general","Doubly Linked Nodes","Circular Linked Lists","Two-Direction Traversal","Insertion and Deletion","Use Cases"] },
  { name: "Stacks", subtopics: ["general","LIFO Principle","Array-Based Stacks","Linked-List Stacks","Balanced Parentheses","Next Greater Element"] },
  { name: "Queues and Deques", subtopics: ["general","FIFO Principle","Circular Queues","Deque Operations","Sliding-Window Examples","Queue Applications"] },
  { name: "Hashing and Dictionaries/Sets", subtopics: ["general","Hashability and Collisions","Average Lookup Behaviour","dict Operations","set Operations","Frequency Counting","Two-Sum and Duplicate Detection"] },
  { name: "Trees and Binary Trees", subtopics: ["general","Tree Terminology","Node Structures and Representation","Recursive Traversal","Preorder Traversal","Inorder and Postorder Traversal"] },
  { name: "Binary Search Trees and Heaps", subtopics: ["general","BST Search","BST Insertion and Deletion","Heap Representation","Priority Operations","Validating a BST","Kth Largest Element"] },
  { name: "Graph Fundamentals and Traversals", subtopics: ["general","Adjacency Matrices","Adjacency Lists","Directed and Undirected Graphs","Weighted Graphs","Breadth-First Search","Depth-First Search"] },
  { name: "Graph Algorithms", subtopics: ["general","Cycle Detection","Topological Sorting","Shortest-Path Concepts","Minimum Spanning Tree","Connectivity Problems"] },
  { name: "Greedy Algorithms", subtopics: ["general","Greedy Choice Property","Optimal Substructure","Activity Selection","Interval Scheduling","Minimum Coin Change"] },
  { name: "Dynamic Programming", subtopics: ["general","Memoization","Tabulation","Memory Optimisation","Fibonacci and Climbing Stairs","0/1 Knapsack","Longest Common Subsequence"] },
  { name: "Advanced Problem Solving and Revision", subtopics: ["general","Two Pointers","Sliding Window","Prefix Sums","Bit Manipulation","Mixed Interview Problems"] },
];

export const GROUP_TITLE = "DSA Using Python";
export const BANK_LANG = "python";
