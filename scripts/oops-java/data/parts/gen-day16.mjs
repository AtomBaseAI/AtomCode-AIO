/**
 * Day 16 generator — "OOPS using JAVA" — Collections Framework 1
 * Writes the 4 part files consumed by merge-parts.ts:
 *   day-16.code.p1.json (day + topics + first 10 code)
 *   day-16.code.p2.json (last 10 code)
 *   day-16.mcq.p1.json  (day + first 10 mcq)
 *   day-16.mcq.p2.json  (last 10 mcq)
 */
import fs from "node:fs";
import path from "node:path";

const DIR = "/home/z/my-project/scripts/oops-java/data/parts";
fs.mkdirSync(DIR, { recursive: true });

const TOPIC = "Collections Framework 1";
const SUBTOPICS = [
  "ArrayList Basics",
  "ArrayList Operations",
  "HashSet",
  "Set Operations",
  "Iterators",
];

const desc = (body, input, output, constraints) =>
  body + "\n\nInput Format:\n" + input + "\n\nOutput Format:\n" + output + "\n\nConstraints:\n" + constraints;

/* The Lambda judge compiles only when `public class Main` is the FIRST class
 * in the file; helper classes must come after it. Sources are authored with
 * helper classes first for readability, so reorder at build time. */
function mainFirst(src) {
  const mIdx = src.indexOf("public class Main");
  if (mIdx < 0) throw new Error("missing public class Main");
  const head = src.slice(0, mIdx);
  const tail = src.slice(mIdx);
  const re = /(^|\n)((abstract|final|public|static)\s+)*class\s/;
  const m = re.exec(head);
  if (!m) return head + tail;
  const imports = head.slice(0, m.index);
  const helpers = head.slice(m.index + 1);
  return imports + tail + "\n" + helpers;
}

const JOIN_INT = `
    static String joinInt(ArrayList<Integer> list) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < list.size(); i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(list.get(i));
        }
        return sb.toString();
    }
`;

const JOIN_STR = `
    static String joinStr(ArrayList<String> list) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < list.size(); i++) {
            if (i > 0) {
                sb.append(' ');
            }
            sb.append(list.get(i));
        }
        return sb.toString();
    }
`;

/* ─────────────────────────────── CODE QUESTIONS ─────────────────────────────── */

const codeQuestions = [];

// 1 ── easy basic ── ArrayList Basics
codeQuestions.push({
  title: "Build and Print an ArrayList",
  description: desc(
    "The first step with the Collections Framework is storing values in an ArrayList instead of an array. Read n integers, append each one to an ArrayList<Integer> in input order, then print the whole list on one line.",
    "First line: n. Second line: n space-separated integers.",
    "One line: 'List: ' followed by the elements space-separated in order.",
    "1 <= n <= 100000; -1000000 <= element <= 1000000"
  ),
  difficulty: "easy",
  variant: "basic",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "ArrayList Basics",
  sampleinput1: "4\n10 20 30 40",
  sampleoutput1: "List: 10 20 30 40",
  sampleinput2: "1\n7",
  sampleoutput2: "List: 7",
  input1: "3\n-5 0 12",
  output1: "List: -5 0 12",
  input2: "5\n1 2 3 4 5",
  output2: "List: 1 2 3 4 5",
  input3: "2\n100 -200",
  output3: "List: 100 -200",
  inputconstrains: "1 <= n <= 100000; -1000000 <= element <= 1000000",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.ArrayList;
import java.util.Scanner;

public class Main {
${JOIN_INT}
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        ArrayList<Integer> list = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            list.add(sc.nextInt());
        }
        System.out.println("List: " + joinInt(list));
    }
}`,
});

// 2 ── easy basic ── ArrayList Operations
codeQuestions.push({
  title: "Insert at Index versus Append",
  description: desc(
    "list.add(x) appends at the end, but list.add(pos, x) inserts at index pos and shifts the following elements right by one. Read n integers into an ArrayList, then read an insertion position pos and a value v, insert v at index pos, and print the final list.",
    "First line: n. Second line: n space-separated integers. Third line: pos and v space-separated.",
    "One line: 'Result: ' followed by the final list space-separated.",
    "1 <= n <= 100000; 0 <= pos <= n; -1000000 <= v <= 1000000"
  ),
  difficulty: "easy",
  variant: "basic",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "ArrayList Operations",
  sampleinput1: "3\n10 20 30\n1 99",
  sampleoutput1: "Result: 10 99 20 30",
  sampleinput2: "2\n5 6\n2 77",
  sampleoutput2: "Result: 5 6 77",
  input1: "4\n1 2 3 4\n0 -9",
  output1: "Result: -9 1 2 3 4",
  input2: "1\n42\n1 8",
  output2: "Result: 42 8",
  input3: "3\n7 8 9\n3 10",
  output3: "Result: 7 8 9 10",
  inputconstrains: "1 <= n <= 100000; 0 <= pos <= n; -1000000 <= v <= 1000000",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.ArrayList;
import java.util.Scanner;

public class Main {
${JOIN_INT}
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        ArrayList<Integer> list = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            list.add(sc.nextInt());
        }
        int pos = sc.nextInt();
        int v = sc.nextInt();
        list.add(pos, v);
        System.out.println("Result: " + joinInt(list));
    }
}`,
});

// 3 ── easy basic ── ArrayList Basics
codeQuestions.push({
  title: "Get Then Set Practice",
  description: desc(
    "get(i) reads the element stored at index i and set(i, v) replaces it, returning the old value. Read n integers into an ArrayList, then read an index i and a new value v. First print the element currently at index i, then set it to v and print the updated list.",
    "First line: n. Second line: n space-separated integers. Third line: i and v space-separated.",
    "First line: 'Old: ' followed by the element at index i. Second line: 'Updated: ' followed by the list after the set, space-separated.",
    "1 <= n <= 100000; 0 <= i < n; -1000000 <= v <= 1000000"
  ),
  difficulty: "easy",
  variant: "basic",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "ArrayList Basics",
  sampleinput1: "4\n10 20 30 40\n2 99",
  sampleoutput1: "Old: 30\nUpdated: 10 20 99 40",
  sampleinput2: "2\n5 6\n0 -1",
  sampleoutput2: "Old: 5\nUpdated: -1 6",
  input1: "3\n7 8 9\n2 0",
  output1: "Old: 9\nUpdated: 7 8 0",
  input2: "1\n100\n0 100",
  output2: "Old: 100\nUpdated: 100",
  input3: "5\n1 2 3 4 5\n4 50",
  output3: "Old: 5\nUpdated: 1 2 3 4 50",
  inputconstrains: "1 <= n <= 100000; 0 <= i < n; -1000000 <= v <= 1000000",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.ArrayList;
import java.util.Scanner;

public class Main {
${JOIN_INT}
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        ArrayList<Integer> list = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            list.add(sc.nextInt());
        }
        int i = sc.nextInt();
        int v = sc.nextInt();
        System.out.println("Old: " + list.get(i));
        list.set(i, v);
        System.out.println("Updated: " + joinInt(list));
    }
}`,
});

// 4 ── easy basic ── ArrayList Operations
codeQuestions.push({
  title: "Remove by Index and by Value",
  description: desc(
    "An ArrayList<Integer> has two remove overloads: remove(int index) deletes the element stored at that index, while remove(Object) deletes the first occurrence of that value. With Integer lists, pass Integer.valueOf(v) to remove by value. Read n integers, then remove the element at index idx, print the list, then remove the first occurrence of value val and print the list again.",
    "First line: n. Second line: n space-separated integers. Third line: idx. Fourth line: val.",
    "First line: 'Index removal: ' followed by the list after removing index idx. Second line: 'Value removal: ' followed by the list after also removing the first occurrence of val.",
    "2 <= n <= 100000; 0 <= idx < n; val is guaranteed to appear in the list after the index removal"
  ),
  difficulty: "easy",
  variant: "basic",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "ArrayList Operations",
  sampleinput1: "4\n10 20 30 40\n1\n30",
  sampleoutput1: "Index removal: 10 30 40\nValue removal: 10 40",
  sampleinput2: "3\n5 5 6\n0\n6",
  sampleoutput2: "Index removal: 5 6\nValue removal: 5",
  input1: "5\n1 2 3 2 4\n2\n2",
  output1: "Index removal: 1 2 2 4\nValue removal: 1 2 4",
  input2: "3\n9 8 7\n0\n7",
  output2: "Index removal: 8 7\nValue removal: 8",
  input3: "4\n5 10 15 10\n3\n5",
  output3: "Index removal: 5 10 15\nValue removal: 10 15",
  inputconstrains: "2 <= n <= 100000; 0 <= idx < n; val appears in the list after the index removal",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.ArrayList;
import java.util.Scanner;

public class Main {
${JOIN_INT}
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        ArrayList<Integer> list = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            list.add(sc.nextInt());
        }
        int idx = sc.nextInt();
        int val = sc.nextInt();
        list.remove(idx);
        System.out.println("Index removal: " + joinInt(list));
        list.remove(Integer.valueOf(val));
        System.out.println("Value removal: " + joinInt(list));
    }
}`,
});

// 5 ── easy basic ── HashSet
codeQuestions.push({
  title: "HashSet Size and Membership",
  description: desc(
    "A HashSet stores each distinct value exactly once, no matter how many times it is added. Read n integers into a HashSet<Integer>, print how many distinct values it holds, then answer q membership queries using contains.",
    "First line: n. Second line: n space-separated integers. Third line: q. Each of the next q lines contains one integer to look up.",
    "First line: 'Size: ' followed by the number of distinct values. Then one line per query printing true (present) or false (absent), lowercase.",
    "1 <= n <= 100000; 1 <= q <= 100000; -1000000 <= value <= 1000000"
  ),
  difficulty: "easy",
  variant: "basic",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "HashSet",
  sampleinput1: "5\n1 2 2 3 3\n3\n2\n9\n3",
  sampleoutput1: "Size: 3\ntrue\nfalse\ntrue",
  sampleinput2: "3\n10 20 30\n2\n40\n10",
  sampleoutput2: "Size: 3\nfalse\ntrue",
  input1: "1\n7\n1\n7",
  output1: "Size: 1\ntrue",
  input2: "4\n-1 -1 -1 -1\n2\n-1\n0",
  output2: "Size: 1\ntrue\nfalse",
  input3: "6\n5 4 3 2 1 5\n2\n1\n6",
  output3: "Size: 5\ntrue\nfalse",
  inputconstrains: "1 <= n <= 100000; 1 <= q <= 100000; -1000000 <= value <= 1000000",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.HashSet;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        HashSet<Integer> set = new HashSet<>();
        for (int i = 0; i < n; i++) {
            set.add(sc.nextInt());
        }
        System.out.println("Size: " + set.size());
        int q = sc.nextInt();
        for (int i = 0; i < q; i++) {
            int x = sc.nextInt();
            System.out.println(set.contains(x));
        }
    }
}`,
});

// 6 ── easy basic ── Iterators
codeQuestions.push({
  title: "Iterator Walk Over Words",
  description: desc(
    "An Iterator visits every element of a collection one at a time: hasNext() reports whether another element exists and next() returns it. Read n words into an ArrayList<String>, then print every word on its own line using an Iterator (a list keeps its order, so the output is deterministic).",
    "First line: n. Second line: n space-separated words.",
    "One word per line, in list order.",
    "1 <= n <= 100000; each word has length 1 to 20"
  ),
  difficulty: "easy",
  variant: "basic",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Iterators",
  sampleinput1: "3\nalpha beta gamma",
  sampleoutput1: "alpha\nbeta\ngamma",
  sampleinput2: "1\nsolo",
  sampleoutput2: "solo",
  input1: "4\nred green blue red",
  output1: "red\ngreen\nblue\nred",
  input2: "2\nx9 y0",
  output2: "x9\ny0",
  input3: "5\na b c d e",
  output3: "a\nb\nc\nd\ne",
  inputconstrains: "1 <= n <= 100000; word length 1 to 20",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.ArrayList;
import java.util.Iterator;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        ArrayList<String> words = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            words.add(sc.next());
        }
        Iterator<String> it = words.iterator();
        while (it.hasNext()) {
            System.out.println(it.next());
        }
    }
}`,
});

// 7 ── easy scenario ── ArrayList Basics
codeQuestions.push({
  title: "Playlist Manager",
  description: desc(
    "A music app builds a playlist. It starts with n songs, then processes commands: ADD title appends a song to the end, REMOVE title deletes the first occurrence of that song (if it is not present, nothing changes), and PRINT shows the playlist.",
    "First line: n. Second line: n song titles (single words). Third line: m. Each of the next m lines is a command: ADD title, REMOVE title or PRINT.",
    "After processing every command, print one line: 'Playlist: ' followed by the remaining titles space-separated in order.",
    "1 <= n <= 100; 1 <= m <= 100; titles are single words of length 1 to 20"
  ),
  difficulty: "easy",
  variant: "scenario",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "ArrayList Basics",
  sampleinput1: "3\npop rock jazz\n3\nADD blues\nREMOVE rock\nPRINT",
  sampleoutput1: "Playlist: pop jazz blues",
  sampleinput2: "2\none two\n3\nREMOVE one\nADD three\nPRINT",
  sampleoutput2: "Playlist: two three",
  input1: "1\nsolo\n2\nADD duet\nPRINT",
  output1: "Playlist: solo duet",
  input2: "3\na b c\n4\nREMOVE x\nREMOVE b\nADD d\nPRINT",
  output2: "Playlist: a c d",
  input3: "2\nlofi synth\n5\nADD wave\nADD lofi\nREMOVE synth\nREMOVE wave\nPRINT",
  output3: "Playlist: lofi lofi",
  inputconstrains: "1 <= n <= 100; 1 <= m <= 100; titles are single words of length 1 to 20",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.ArrayList;
import java.util.Scanner;

public class Main {
${JOIN_STR}
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        ArrayList<String> playlist = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            playlist.add(sc.next());
        }
        int m = sc.nextInt();
        for (int i = 0; i < m; i++) {
            String cmd = sc.next();
            if (cmd.equals("ADD")) {
                playlist.add(sc.next());
            } else if (cmd.equals("REMOVE")) {
                playlist.remove(sc.next());
            }
        }
        System.out.println("Playlist: " + joinStr(playlist));
    }
}`,
});

// 8 ── easy scenario ── ArrayList Operations
codeQuestions.push({
  title: "Shopping Cart Viewer",
  description: desc(
    "A web store tracks the items currently in a customer's cart with commands processed in order: ADD item puts an item into the cart, REMOVE item takes out the first occurrence of that item (if absent, nothing happens), and VIEW prints the cart contents at that moment.",
    "First line: m. Each of the next m lines is a command: ADD item, REMOVE item or VIEW.",
    "For every VIEW command print one line: 'Cart: ' followed by the items space-separated in cart order.",
    "1 <= m <= 100; items are single words of length 1 to 20"
  ),
  difficulty: "easy",
  variant: "scenario",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "ArrayList Operations",
  sampleinput1: "5\nADD apple\nADD banana\nVIEW\nREMOVE apple\nVIEW",
  sampleoutput1: "Cart: apple banana\nCart: banana",
  sampleinput2: "4\nADD pen\nADD eraser\nREMOVE pen\nVIEW",
  sampleoutput2: "Cart: eraser",
  input1: "6\nADD rice\nVIEW\nADD dal\nVIEW\nREMOVE rice\nVIEW",
  output1: "Cart: rice\nCart: rice dal\nCart: dal",
  input2: "4\nREMOVE ghost\nADD kit\nADD kat\nVIEW",
  output2: "Cart: kit kat",
  input3: "5\nADD a\nADD b\nADD a\nREMOVE a\nVIEW",
  output3: "Cart: b a",
  inputconstrains: "1 <= m <= 100; items are single words of length 1 to 20",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.ArrayList;
import java.util.Scanner;

public class Main {
${JOIN_STR}
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int m = sc.nextInt();
        ArrayList<String> cart = new ArrayList<>();
        for (int i = 0; i < m; i++) {
            String cmd = sc.next();
            if (cmd.equals("ADD")) {
                cart.add(sc.next());
            } else if (cmd.equals("REMOVE")) {
                cart.remove(sc.next());
            } else if (cmd.equals("VIEW")) {
                System.out.println("Cart: " + joinStr(cart));
            }
        }
    }
}`,
});

// 9 ── easy scenario ── Set Operations
codeQuestions.push({
  title: "Visitor Log Dedupe",
  description: desc(
    "A museum gate logs every visitor name, but the same person may enter many times. Feed the log into a LinkedHashSet, which ignores duplicates while keeping the order in which names were first seen, then report the deduplicated sequence and how many unique visitors there were.",
    "First line: n. Second line: n space-separated names.",
    "First line: 'Unique: ' followed by the deduplicated names space-separated in first-appearance order. Second line: 'Count: ' followed by the number of unique names.",
    "1 <= n <= 100000; names are single words of length 1 to 20"
  ),
  difficulty: "easy",
  variant: "scenario",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Set Operations",
  sampleinput1: "6\nann bob ann cid bob ella",
  sampleoutput1: "Unique: ann bob cid ella\nCount: 4",
  sampleinput2: "3\nz z z",
  sampleoutput2: "Unique: z\nCount: 1",
  input1: "4\np q r q",
  output1: "Unique: p q r\nCount: 3",
  input2: "5\nm1 m2 m1 m3 m2",
  output2: "Unique: m1 m2 m3\nCount: 3",
  input3: "1\nonly",
  output3: "Unique: only\nCount: 1",
  inputconstrains: "1 <= n <= 100000; names are single words of length 1 to 20",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.Scanner;

public class Main {
${JOIN_STR}
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        LinkedHashSet<String> uniq = new LinkedHashSet<>();
        for (int i = 0; i < n; i++) {
            uniq.add(sc.next());
        }
        ArrayList<String> ordered = new ArrayList<>(uniq);
        System.out.println("Unique: " + joinStr(ordered));
        System.out.println("Count: " + uniq.size());
    }
}`,
});

// 10 ── easy scenario ── HashSet
codeQuestions.push({
  title: "Workshop Badge Register",
  description: desc(
    "A workshop issues badges at the door, but each badge code can only be issued once. As each code arrives, call add on a HashSet<String>: if it returns true the badge is new, otherwise it is a duplicate. Print the result for every arrival, then the total number of distinct badges issued.",
    "First line: n. Second line: n badge codes (single words).",
    "One line per badge in input order: 'OK code' when the add returned true, 'DUP code' when it returned false. Final line: 'Issued: ' followed by the number of distinct codes in the set.",
    "1 <= n <= 100000; badge codes are single words of length 1 to 20"
  ),
  difficulty: "easy",
  variant: "scenario",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "HashSet",
  sampleinput1: "5\nB1 B2 B1 B3 B2",
  sampleoutput1: "OK B1\nOK B2\nDUP B1\nOK B3\nDUP B2\nIssued: 3",
  sampleinput2: "2\nX X",
  sampleoutput2: "OK X\nDUP X\nIssued: 1",
  input1: "3\na b c",
  output1: "OK a\nOK b\nOK c\nIssued: 3",
  input2: "4\nq1 q2 q1 q1",
  output2: "OK q1\nOK q2\nDUP q1\nDUP q1\nIssued: 2",
  input3: "1\nsolo",
  output3: "OK solo\nIssued: 1",
  inputconstrains: "1 <= n <= 100000; badge codes are single words of length 1 to 20",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.HashSet;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        HashSet<String> set = new HashSet<>();
        for (int i = 0; i < n; i++) {
            String code = sc.next();
            if (set.add(code)) {
                System.out.println("OK " + code);
            } else {
                System.out.println("DUP " + code);
            }
        }
        System.out.println("Issued: " + set.size());
    }
}`,
});

// 11 ── medium ── Iterators
codeQuestions.push({
  title: "Sweep Out the Negatives",
  description: desc(
    "A sensor writes temperature readings to a list, but faulty sensors produce negative junk values. Clean the list with a single pass using an Iterator: every negative reading must be removed through it.remove() (never through the list's own remove method, which would corrupt the iteration). Report the cleaned list and how many readings were removed.",
    "First line: n. Second line: n space-separated integers.",
    "First line: 'Cleaned: ' followed by the surviving values space-separated in order. Second line: 'Removed: ' followed by the count of removed readings.",
    "1 <= n <= 100000; -1000000 <= reading <= 1000000"
  ),
  difficulty: "medium",
  variant: "scenario",
  maxscore: 20,
  lang: "java",
  topic: TOPIC,
  subtopic: "Iterators",
  sampleinput1: "6\n3 -1 4 -5 0 7",
  sampleoutput1: "Cleaned: 3 4 0 7\nRemoved: 2",
  sampleinput2: "4\n-1 -2 5 -3",
  sampleoutput2: "Cleaned: 5\nRemoved: 3",
  input1: "5\n1 2 3 4 5",
  output1: "Cleaned: 1 2 3 4 5\nRemoved: 0",
  input2: "6\n-9 8 -7 6 -5 4",
  output2: "Cleaned: 8 6 4\nRemoved: 3",
  input3: "3\n0 -1000000 999999",
  output3: "Cleaned: 0 999999\nRemoved: 1",
  inputconstrains: "1 <= n <= 100000; -1000000 <= reading <= 1000000",
  blacklist: "removeIf",
  whitelist: "Iterator",
  sourcecode: `import java.util.ArrayList;
import java.util.Iterator;
import java.util.Scanner;

public class Main {
${JOIN_INT}
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        ArrayList<Integer> readings = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            readings.add(sc.nextInt());
        }
        int removed = 0;
        Iterator<Integer> it = readings.iterator();
        while (it.hasNext()) {
            int v = it.next();
            if (v < 0) {
                it.remove();
                removed++;
            }
        }
        System.out.println("Cleaned: " + joinInt(readings));
        System.out.println("Removed: " + removed);
    }
}`,
});

// 12 ── medium ── ArrayList Basics
codeQuestions.push({
  title: "Alternating Merge of Two Lists",
  description: desc(
    "A card shuffler merges two decks by alternately taking one card from each deck, starting with deck A, then appending whatever remains of the longer deck. Build both input sequences as ArrayList objects, produce the alternating merge into a new ArrayList, and print it.",
    "First line: n. Second line: n space-separated integers for list A. Third line: m. Fourth line: m space-separated integers for list B.",
    "One line: 'Merged: ' followed by the merged list space-separated.",
    "1 <= n, m <= 100000; -1000000 <= element <= 1000000"
  ),
  difficulty: "medium",
  variant: "scenario",
  maxscore: 20,
  lang: "java",
  topic: TOPIC,
  subtopic: "ArrayList Basics",
  sampleinput1: "3\n1 2 3\n2\n8 9",
  sampleoutput1: "Merged: 1 8 2 9 3",
  sampleinput2: "2\n4 5\n4\n1 2 3 4",
  sampleoutput2: "Merged: 4 1 5 2 3 4",
  input1: "1\n100\n1\n200",
  output1: "Merged: 100 200",
  input2: "3\n1 2 3\n1\n50",
  output2: "Merged: 1 50 2 3",
  input3: "4\n-1 -2 -3 -4\n3\n5 6 7",
  output3: "Merged: -1 5 -2 6 -3 7 -4",
  inputconstrains: "1 <= n, m <= 100000; -1000000 <= element <= 1000000",
  blacklist: "IntStream",
  whitelist: "ArrayList",
  sourcecode: `import java.util.ArrayList;
import java.util.Scanner;

public class Main {
${JOIN_INT}
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        ArrayList<Integer> a = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            a.add(sc.nextInt());
        }
        int m = sc.nextInt();
        ArrayList<Integer> b = new ArrayList<>();
        for (int i = 0; i < m; i++) {
            b.add(sc.nextInt());
        }
        ArrayList<Integer> merged = new ArrayList<>();
        int i = 0;
        int j = 0;
        while (i < n && j < m) {
            merged.add(a.get(i));
            i++;
            merged.add(b.get(j));
            j++;
        }
        while (i < n) {
            merged.add(a.get(i));
            i++;
        }
        while (j < m) {
            merged.add(b.get(j));
            j++;
        }
        System.out.println("Merged: " + joinInt(merged));
    }
}`,
});

// 13 ── medium ── Set Operations
codeQuestions.push({
  title: "Union and Intersection Report",
  description: desc(
    "Two lab sections submitted the list of experiments they completed (with repeats). Load each section's ids into its own HashSet, then report the size of the union of both sets, the number of ids common to both sets, and how many ids belong only to section A.",
    "First line: n. Second line: n space-separated integers (section A). Third line: m. Fourth line: m space-separated integers (section B).",
    "Three lines: 'Union: u' with the size of the union, 'Common: c' with the size of the intersection, 'OnlyA: d' with the number of ids present in A but not in B.",
    "1 <= n, m <= 100000; -1000000 <= value <= 1000000"
  ),
  difficulty: "medium",
  variant: "scenario",
  maxscore: 20,
  lang: "java",
  topic: TOPIC,
  subtopic: "Set Operations",
  sampleinput1: "4\n1 2 3 4\n3\n3 4 5",
  sampleoutput1: "Union: 5\nCommon: 2\nOnlyA: 2",
  sampleinput2: "3\n10 20 30\n3\n10 20 30",
  sampleoutput2: "Union: 3\nCommon: 3\nOnlyA: 0",
  input1: "2\n1 2\n2\n3 4",
  output1: "Union: 4\nCommon: 0\nOnlyA: 2",
  input2: "5\n1 1 2 2 3\n2\n2 9",
  output2: "Union: 4\nCommon: 1\nOnlyA: 2",
  input3: "1\n7\n1\n7",
  output3: "Union: 1\nCommon: 1\nOnlyA: 0",
  inputconstrains: "1 <= n, m <= 100000; -1000000 <= value <= 1000000",
  blacklist: "TreeSet",
  whitelist: "HashSet",
  sourcecode: `import java.util.HashSet;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        HashSet<Integer> a = new HashSet<>();
        for (int i = 0; i < n; i++) {
            a.add(sc.nextInt());
        }
        int m = sc.nextInt();
        HashSet<Integer> b = new HashSet<>();
        for (int i = 0; i < m; i++) {
            b.add(sc.nextInt());
        }
        HashSet<Integer> union = new HashSet<>(a);
        union.addAll(b);
        int common = 0;
        for (Integer v : a) {
            if (b.contains(v)) {
                common++;
            }
        }
        System.out.println("Union: " + union.size());
        System.out.println("Common: " + common);
        System.out.println("OnlyA: " + (a.size() - common));
    }
}`,
});

// 14 ── medium ── HashSet
codeQuestions.push({
  title: "First Duplicate in the Stream",
  description: desc(
    "A transaction monitor watches a stream of item ids and raises an alarm the moment an id appears for a second time. Scan the stream with a HashSet of ids already seen and report the first value whose repeat arrives earliest (the element whose second occurrence comes first in the stream). If every value is unique, say so.",
    "First line: n. Second line: n space-separated integers.",
    "One line: 'First duplicate: v' where v is the first value to repeat, or 'No duplicates' when all values are distinct.",
    "1 <= n <= 100000; -1000000 <= value <= 1000000"
  ),
  difficulty: "medium",
  variant: "scenario",
  maxscore: 20,
  lang: "java",
  topic: TOPIC,
  subtopic: "HashSet",
  sampleinput1: "6\n2 5 3 5 7 2",
  sampleoutput1: "First duplicate: 5",
  sampleinput2: "4\n1 2 3 4",
  sampleoutput2: "No duplicates",
  input1: "5\n9 9 9 9 9",
  output1: "First duplicate: 9",
  input2: "7\n1 2 3 1 2 3 4",
  output2: "First duplicate: 1",
  input3: "1\n42",
  output3: "No duplicates",
  inputconstrains: "1 <= n <= 100000; -1000000 <= value <= 1000000",
  blacklist: "Map",
  whitelist: "HashSet",
  sourcecode: `import java.util.HashSet;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        HashSet<Integer> seen = new HashSet<>();
        int first = 0;
        boolean found = false;
        for (int i = 0; i < n; i++) {
            int x = sc.nextInt();
            if (!found) {
                if (seen.contains(x)) {
                    first = x;
                    found = true;
                } else {
                    seen.add(x);
                }
            }
        }
        if (found) {
            System.out.println("First duplicate: " + first);
        } else {
            System.out.println("No duplicates");
        }
    }
}`,
});

// 15 ── medium ── ArrayList Operations
codeQuestions.push({
  title: "Command the ArrayList",
  description: desc(
    "A tiny in-memory notebook keeps one integer list and processes q commands: ADD x appends x, SET i x replaces the element at index i, REMOVE i deletes the element at index i (elements after it shift left), and PRINT shows the whole list.",
    "First line: n. Second line: n space-separated integers (initial list). Third line: q. Each of the next q lines is one command: ADD x, SET i x, REMOVE i or PRINT.",
    "For every PRINT command print one line: 'List: ' followed by the current contents space-separated.",
    "1 <= n <= 1000; 1 <= q <= 1000; indices are valid at the time of each command; -1000000 <= x <= 1000000"
  ),
  difficulty: "medium",
  variant: "scenario",
  maxscore: 20,
  lang: "java",
  topic: TOPIC,
  subtopic: "ArrayList Operations",
  sampleinput1: "3\n10 20 30\n4\nADD 40\nSET 1 99\nPRINT\nREMOVE 0",
  sampleoutput1: "List: 10 99 30 40",
  sampleinput2: "2\n5 6\n3\nREMOVE 1\nPRINT\nADD 7",
  sampleoutput2: "List: 5",
  input1: "1\n9\n3\nPRINT\nADD 1\nPRINT",
  output1: "List: 9\nList: 9 1",
  input2: "4\n1 2 3 4\n5\nSET 0 100\nSET 3 400\nPRINT\nREMOVE 2\nPRINT",
  output2: "List: 100 2 3 400\nList: 100 2 400",
  input3: "2\n-3 -4\n4\nADD -5\nREMOVE 0\nREMOVE 0\nPRINT",
  output3: "List: -5",
  inputconstrains: "1 <= n <= 1000; 1 <= q <= 1000; indices valid at time of command; -1000000 <= x <= 1000000",
  blacklist: "LinkedList",
  whitelist: "ArrayList",
  sourcecode: `import java.util.ArrayList;
import java.util.Scanner;

public class Main {
${JOIN_INT}
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        ArrayList<Integer> list = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            list.add(sc.nextInt());
        }
        int q = sc.nextInt();
        for (int c = 0; c < q; c++) {
            String cmd = sc.next();
            if (cmd.equals("ADD")) {
                list.add(sc.nextInt());
            } else if (cmd.equals("SET")) {
                int i = sc.nextInt();
                int x = sc.nextInt();
                list.set(i, x);
            } else if (cmd.equals("REMOVE")) {
                list.remove(sc.nextInt());
            } else if (cmd.equals("PRINT")) {
                System.out.println("List: " + joinInt(list));
            }
        }
    }
}`,
});

// 16 ── medium ── Iterators
codeQuestions.push({
  title: "Walk Both Ways with ListIterator",
  description: desc(
    "A media player keeps its upcoming queue in a list. The review screen shows the queue twice: once from front to back and once from back to front. Use a ListIterator for both passes: walk forward with hasNext and next, then walk backward with hasPrevious and previous starting from the same iterator position (the end).",
    "First line: n. Second line: n space-separated words (queue items).",
    "First line: 'Forward: ' followed by the items space-separated front to back. Second line: 'Backward: ' followed by the items space-separated back to front.",
    "1 <= n <= 100000; each word has length 1 to 20"
  ),
  difficulty: "medium",
  variant: "scenario",
  maxscore: 20,
  lang: "java",
  topic: TOPIC,
  subtopic: "Iterators",
  sampleinput1: "3\none two three",
  sampleoutput1: "Forward: one two three\nBackward: three two one",
  sampleinput2: "1\nsolo",
  sampleoutput2: "Forward: solo\nBackward: solo",
  input1: "4\na b c d",
  output1: "Forward: a b c d\nBackward: d c b a",
  input2: "2\nx y",
  output2: "Forward: x y\nBackward: y x",
  input3: "5\np q r s t",
  output3: "Forward: p q r s t\nBackward: t s r q p",
  inputconstrains: "1 <= n <= 100000; word length 1 to 20",
  blacklist: "removeIf",
  whitelist: "ListIterator",
  sourcecode: `import java.util.ArrayList;
import java.util.ListIterator;
import java.util.Scanner;

public class Main {
${JOIN_STR}
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        ArrayList<String> queue = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            queue.add(sc.next());
        }
        ListIterator<String> lit = queue.listIterator();
        StringBuilder fwd = new StringBuilder();
        while (lit.hasNext()) {
            if (fwd.length() > 0) {
                fwd.append(' ');
            }
            fwd.append(lit.next());
        }
        ArrayList<String> back = new ArrayList<>();
        while (lit.hasPrevious()) {
            back.add(lit.previous());
        }
        System.out.println("Forward: " + fwd.toString());
        System.out.println("Backward: " + joinStr(back));
    }
}`,
});

// 17 ── hard ── Iterators
codeQuestions.push({
  title: "Purge and Patch Through the Iterator",
  description: desc(
    "An event processor walks a list of numeric event codes exactly once, using an Iterator for every removal. Rule 1: codes divisible by 2 are faulty and must be deleted via it.remove(). Rule 2: codes that survive and are divisible by 3 must be patched in place to three times their value. Rule 3: every other code is untouched. Removals change positions, so track the current index carefully when patching. Report the final list and the number of removed codes.",
    "First line: n. Second line: n space-separated integers.",
    "First line: 'Kept: ' followed by the final list space-separated. Second line: 'Removed: ' followed by the number of removed codes.",
    "1 <= n <= 100000; -1000000 <= code <= 1000000"
  ),
  difficulty: "hard",
  variant: "scenario",
  maxscore: 30,
  lang: "java",
  topic: TOPIC,
  subtopic: "Iterators",
  sampleinput1: "6\n1 2 3 4 5 6",
  sampleoutput1: "Kept: 1 9 5\nRemoved: 3",
  sampleinput2: "5\n3 6 9 2 12",
  sampleoutput2: "Kept: 9 27\nRemoved: 3",
  input1: "4\n1 2 3 4",
  output1: "Kept: 1 9\nRemoved: 2",
  input2: "3\n7 14 21",
  output2: "Kept: 7 63\nRemoved: 1",
  input3: "2\n5 25",
  output3: "Kept: 5 25\nRemoved: 0",
  inputconstrains: "1 <= n <= 100000; -1000000 <= code <= 1000000",
  blacklist: "removeIf, ListIterator",
  whitelist: "Iterator",
  sourcecode: `import java.util.ArrayList;
import java.util.Iterator;
import java.util.Scanner;

public class Main {
${JOIN_INT}
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        ArrayList<Integer> events = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            events.add(sc.nextInt());
        }
        int removed = 0;
        int idx = 0;
        Iterator<Integer> it = events.iterator();
        while (it.hasNext()) {
            int v = it.next();
            if (v % 2 == 0) {
                it.remove();
                removed++;
            } else {
                if (v % 3 == 0) {
                    events.set(idx, v * 3);
                }
                idx++;
            }
        }
        System.out.println("Kept: " + joinInt(events));
        System.out.println("Removed: " + removed);
    }
}`,
});

// 18 ── hard ── Set Operations
codeQuestions.push({
  title: "Conference Visitor Analytics",
  description: desc(
    "A conference gate logs attendee names, one entry per scan. Produce an analytics report: the deduplicated names in the order they first appeared (a LinkedHashSet preserves first-appearance order), the number of unique attendees, and for q requested names the number of times each appears in the original log. Count occurrences by scanning the original log list, not with any key-value map.",
    "First line: n. Second line: n space-separated names. Third line: q. Each of the next q lines contains one name to count.",
    "First line: 'First appearances: ' followed by the deduplicated names space-separated. Second line: 'Unique: ' followed by the number of unique names. Then one line per query: 'name: count' where count is how many times name occurs in the log (0 is possible).",
    "1 <= n <= 10000; 1 <= q <= 100; names are single words of length 1 to 20"
  ),
  difficulty: "hard",
  variant: "scenario",
  maxscore: 30,
  lang: "java",
  topic: TOPIC,
  subtopic: "Set Operations",
  sampleinput1: "6\nann bob ann cid bob ella\n2\nbob\nella",
  sampleoutput1: "First appearances: ann bob cid ella\nUnique: 4\nbob: 2\nella: 1",
  sampleinput2: "3\nz z z\n1\nz",
  sampleoutput2: "First appearances: z\nUnique: 1\nz: 3",
  input1: "5\np q p r s\n3\np\nr\nt",
  output1: "First appearances: p q r s\nUnique: 4\np: 2\nr: 1\nt: 0",
  input2: "4\nm a m a\n2\na\nm",
  output2: "First appearances: m a\nUnique: 2\na: 2\nm: 2",
  input3: "1\nonly\n2\nonly\nx",
  output3: "First appearances: only\nUnique: 1\nonly: 1\nx: 0",
  inputconstrains: "1 <= n <= 10000; 1 <= q <= 100; names are single words of length 1 to 20",
  blacklist: "Map, HashMap, TreeSet",
  whitelist: "LinkedHashSet",
  sourcecode: `import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.Scanner;

public class Main {
${JOIN_STR}
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        ArrayList<String> log = new ArrayList<>();
        LinkedHashSet<String> uniq = new LinkedHashSet<>();
        for (int i = 0; i < n; i++) {
            String name = sc.next();
            log.add(name);
            uniq.add(name);
        }
        ArrayList<String> ordered = new ArrayList<>(uniq);
        System.out.println("First appearances: " + joinStr(ordered));
        System.out.println("Unique: " + uniq.size());
        int q = sc.nextInt();
        for (int i = 0; i < q; i++) {
            String name = sc.next();
            int count = 0;
            for (String entry : log) {
                if (entry.equals(name)) {
                    count++;
                }
            }
            System.out.println(name + ": " + count);
        }
    }
}`,
});

// 19 ── hard ── Set Operations
codeQuestions.push({
  title: "Top-K Most Requested Items",
  description: desc(
    "A server logs the ids of requested items. Find the k most requested distinct ids: rank by request count descending, and break ties by whichever id appeared earlier in the log. Count requests without any key-value map: sort a copy of the log, walk its runs to get each distinct id and its count, and find each id's first-appearance position with an index scan of the original log.",
    "First line: n and k space-separated. Second line: n space-separated integers (the log).",
    "One line: 'Top: ' followed by the k ids, most requested first, ties broken by first appearance, space-separated.",
    "1 <= k <= n <= 4000; k <= number of distinct ids; -1000000 <= id <= 1000000"
  ),
  difficulty: "hard",
  variant: "scenario",
  maxscore: 30,
  lang: "java",
  topic: TOPIC,
  subtopic: "Set Operations",
  sampleinput1: "7 2\n4 6 4 6 4 9 6",
  sampleoutput1: "Top: 4 6",
  sampleinput2: "5 1\n1 2 3 4 5",
  sampleoutput2: "Top: 1",
  input1: "6 3\n2 2 2 7 7 9",
  output1: "Top: 2 7 9",
  input2: "8 3\n5 3 5 3 8 8 1 9",
  output2: "Top: 5 3 8",
  input3: "4 2\n-1 -1 -1 0",
  output3: "Top: -1 0",
  inputconstrains: "1 <= k <= n <= 4000; k <= distinct ids; -1000000 <= id <= 1000000",
  blacklist: "Map, HashMap",
  whitelist: "Collections.sort, Comparator",
  sourcecode: `import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int k = sc.nextInt();
        ArrayList<Integer> log = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            log.add(sc.nextInt());
        }
        ArrayList<Integer> sorted = new ArrayList<>(log);
        Collections.sort(sorted);
        ArrayList<int[]> stats = new ArrayList<>();
        int i = 0;
        while (i < sorted.size()) {
            int v = sorted.get(i);
            int j = i;
            while (j < sorted.size() && sorted.get(j) == v) {
                j++;
            }
            stats.add(new int[] { v, j - i, log.indexOf(v) });
            i = j;
        }
        Collections.sort(stats, new Comparator<int[]>() {
            public int compare(int[] a, int[] b) {
                if (a[1] != b[1]) {
                    return b[1] - a[1];
                }
                return a[2] - b[2];
            }
        });
        StringBuilder sb = new StringBuilder();
        for (int t = 0; t < k; t++) {
            if (t > 0) {
                sb.append(' ');
            }
            sb.append(stats.get(t)[0]);
        }
        System.out.println("Top: " + sb.toString());
    }
}`,
});

// 20 ── hard ── HashSet
codeQuestions.push({
  title: "Distinct Window Report",
  description: desc(
    "A network monitor watches a stream of packet type ids and reports, for every window of k consecutive packets, how many distinct packet types it contains. Slide the window from left to right across the stream; for each of the n-k+1 windows, rebuild a HashSet from the window's packets and record its size.",
    "First line: n and k space-separated. Second line: n space-separated integers (packet types).",
    "One line: 'Windows: ' followed by n-k+1 counts space-separated (distinct packet types per window, left to right).",
    "1 <= k <= n <= 2000; -1000000 <= packet <= 1000000"
  ),
  difficulty: "hard",
  variant: "scenario",
  maxscore: 30,
  lang: "java",
  topic: TOPIC,
  subtopic: "HashSet",
  sampleinput1: "6 3\n1 2 1 3 2 4",
  sampleoutput1: "Windows: 2 3 3 3",
  sampleinput2: "4 2\n5 5 5 5",
  sampleoutput2: "Windows: 1 1 1",
  input1: "5 1\n3 1 3 1 3",
  output1: "Windows: 1 1 1 1 1",
  input2: "7 4\n1 2 3 4 1 2 3",
  output2: "Windows: 4 4 4 4",
  input3: "6 6\n9 9 9 9 9 9",
  output3: "Windows: 1",
  inputconstrains: "1 <= k <= n <= 2000; -1000000 <= packet <= 1000000",
  blacklist: "Map, TreeSet",
  whitelist: "HashSet",
  sourcecode: `import java.util.ArrayList;
import java.util.HashSet;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int k = sc.nextInt();
        ArrayList<Integer> packets = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            packets.add(sc.nextInt());
        }
        HashSet<Integer> window = new HashSet<>();
        StringBuilder sb = new StringBuilder();
        for (int s = 0; s + k <= n; s++) {
            window.clear();
            for (int j = s; j < s + k; j++) {
                window.add(packets.get(j));
            }
            if (s > 0) {
                sb.append(' ');
            }
            sb.append(window.size());
        }
        System.out.println("Windows: " + sb.toString());
    }
}`,
});

/* ─────────────────────────────── MCQ QUESTIONS ─────────────────────────────── */

const mcqQuestions = [];

// 1 ── easy ── ArrayList Basics
mcqQuestions.push({
  title: "ArrayList versus Array",
  description: "What is the main advantage of an ArrayList over a plain Java array?",
  difficulty: "easy",
  topic: TOPIC,
  subtopic: "ArrayList Basics",
  Option1: "An ArrayList can grow and shrink in size at runtime while an array has a fixed length",
  Option2: "An array can grow automatically but an ArrayList cannot",
  Option3: "An ArrayList can only store primitive int values",
  Option4: "An array can hold several different types at once while an ArrayList cannot",
  CorrectOption: 1,
  iscodesnippet: false,
  codesnippet: null,
  snippetLang: null,
});

// 2 ── easy ── ArrayList Basics
mcqQuestions.push({
  title: "Import Needed for ArrayList",
  description: "Which import statement is required to use the ArrayList class?",
  difficulty: "easy",
  topic: TOPIC,
  subtopic: "ArrayList Basics",
  Option1: "import java.lang.ArrayList;",
  Option2: "import java.util.ArrayList;",
  Option3: "import java.io.ArrayList;",
  Option4: "import java.collections.ArrayList;",
  CorrectOption: 2,
  iscodesnippet: false,
  codesnippet: null,
  snippetLang: null,
});

// 3 ── easy ── ArrayList Basics
mcqQuestions.push({
  title: "Default Initial Capacity",
  description: "What is the default initial capacity of an ArrayList created with new ArrayList<>()?",
  difficulty: "easy",
  topic: TOPIC,
  subtopic: "ArrayList Basics",
  Option1: "0",
  Option2: "1",
  Option3: "10",
  Option4: "100",
  CorrectOption: 3,
  iscodesnippet: false,
  codesnippet: null,
  snippetLang: null,
});

// 4 ── easy ── ArrayList Operations
mcqQuestions.push({
  title: "Adding at the End",
  description: "What does list.add(element) do on an ArrayList when no index is passed?",
  difficulty: "easy",
  topic: TOPIC,
  subtopic: "ArrayList Operations",
  Option1: "Inserts the element at index 0 and shifts every other element right",
  Option2: "Overwrites the first element of the list",
  Option3: "Replaces the last element of the list",
  Option4: "Appends the element at the end of the list",
  CorrectOption: 4,
  iscodesnippet: false,
  codesnippet: null,
  snippetLang: null,
});

// 5 ── easy ── HashSet
mcqQuestions.push({
  title: "HashSet Duplicate Handling",
  description: "What happens when the same element is added to a HashSet twice?",
  difficulty: "easy",
  topic: TOPIC,
  subtopic: "HashSet",
  Option1: "The set stores two copies of the element",
  Option2: "The second add is ignored and the set keeps a single copy",
  Option3: "The add method throws an exception",
  Option4: "The set stores the element together with a count of 2",
  CorrectOption: 2,
  iscodesnippet: false,
  codesnippet: null,
  snippetLang: null,
});

// 6 ── easy ── HashSet
mcqQuestions.push({
  title: "Return of HashSet add",
  description: "A HashSet already contains the string \"pen\". What does set.add(\"pen\") return?",
  difficulty: "easy",
  topic: TOPIC,
  subtopic: "HashSet",
  Option1: "true",
  Option2: "0",
  Option3: "false",
  Option4: "It throws DuplicateElementException",
  CorrectOption: 3,
  iscodesnippet: false,
  codesnippet: null,
  snippetLang: null,
});

// 7 ── easy ── Set Operations
mcqQuestions.push({
  title: "HashSet Iteration Order",
  description: "Which statement about iterating a HashSet with a for-each loop is TRUE?",
  difficulty: "easy",
  topic: TOPIC,
  subtopic: "Set Operations",
  Option1: "Elements always come out in insertion order",
  Option2: "Elements always come out sorted in ascending order",
  Option3: "The compiler sorts the elements by memory address",
  Option4: "The iteration order is unspecified, so code must never depend on it",
  CorrectOption: 4,
  iscodesnippet: false,
  codesnippet: null,
  snippetLang: null,
});

// 8 ── easy ── Set Operations
mcqQuestions.push({
  title: "Set That Keeps Insertion Order",
  description: "Which Set implementation keeps its elements in the order in which they were inserted?",
  difficulty: "easy",
  topic: TOPIC,
  subtopic: "Set Operations",
  Option1: "LinkedHashSet",
  Option2: "HashSet",
  Option3: "TreeSet",
  Option4: "AbstractSet",
  CorrectOption: 1,
  iscodesnippet: false,
  codesnippet: null,
  snippetLang: null,
});

// 9 ── easy ── Iterators
mcqQuestions.push({
  title: "Iterator Has Next",
  description: "Which Iterator method returns true when there are more elements left to visit?",
  difficulty: "easy",
  topic: TOPIC,
  subtopic: "Iterators",
  Option1: "more()",
  Option2: "hasNext()",
  Option3: "remaining()",
  Option4: "next()",
  CorrectOption: 2,
  iscodesnippet: false,
  codesnippet: null,
  snippetLang: null,
});

// 10 ── easy ── ArrayList Operations
mcqQuestions.push({
  title: "Counting List Elements",
  description: "How do you get the number of elements currently stored in an ArrayList named list?",
  difficulty: "easy",
  topic: TOPIC,
  subtopic: "ArrayList Operations",
  Option1: "list.length",
  Option2: "list.length()",
  Option3: "list.count()",
  Option4: "list.size()",
  CorrectOption: 4,
  iscodesnippet: false,
  codesnippet: null,
  snippetLang: null,
});

// 11 ── medium ── ArrayList Operations (snippet)
mcqQuestions.push({
  title: "Snippet: Insert at Index Shifts Elements",
  description: "The program builds an ArrayList and then calls the two-argument add at index 1. What does the println print?",
  difficulty: "medium",
  topic: TOPIC,
  subtopic: "ArrayList Operations",
  Option1: "[10, 20, 30, 99]",
  Option2: "[10, 99, 20, 30]",
  Option3: "[99, 10, 20, 30]",
  Option4: "[10, 20, 99, 30]",
  CorrectOption: 2,
  iscodesnippet: true,
  codesnippet: `import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<>();
        list.add(10);
        list.add(20);
        list.add(30);
        list.add(1, 99);
        System.out.println(list);
    }
}`,
  snippetLang: "java",
});

// 12 ── medium ── ArrayList Operations (snippet)
mcqQuestions.push({
  title: "Snippet: remove(int) Works by Index",
  description: "The program calls list.remove(1) on an ArrayList of Integers. Remember that remove(int) removes the element stored at that index, not the element equal to that value. What does the println print?",
  difficulty: "medium",
  topic: TOPIC,
  subtopic: "ArrayList Operations",
  Option1: "[10, 30]",
  Option2: "[10, 20]",
  Option3: "[20, 30]",
  Option4: "It throws IndexOutOfBoundsException",
  CorrectOption: 1,
  iscodesnippet: true,
  codesnippet: `import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<>();
        list.add(10);
        list.add(20);
        list.add(30);
        list.remove(1);
        System.out.println(list);
    }
}`,
  snippetLang: "java",
});

// 13 ── medium ── HashSet (snippet)
mcqQuestions.push({
  title: "Snippet: Autoboxed Integers in a HashSet",
  description: "The int literals are autoboxed into Integer objects when they are added to the HashSet, and a HashSet stores each distinct value only once. What does the program print?",
  difficulty: "medium",
  topic: TOPIC,
  subtopic: "HashSet",
  Option1: "It throws an exception because 100 was added twice",
  Option2: "3",
  Option3: "1",
  Option4: "2",
  CorrectOption: 4,
  iscodesnippet: true,
  codesnippet: `import java.util.HashSet;

public class Main {
    public static void main(String[] args) {
        HashSet<Integer> set = new HashSet<>();
        set.add(100);
        set.add(100);
        set.add(200);
        System.out.println(set.size());
    }
}`,
  snippetLang: "java",
});

// 14 ── medium ── HashSet (snippet)
mcqQuestions.push({
  title: "Snippet: HashSet add Returns a Boolean",
  description: "The program adds the same string twice and captures both return values of add. What does the println print?",
  difficulty: "medium",
  topic: TOPIC,
  subtopic: "HashSet",
  Option1: "true true",
  Option2: "false false",
  Option3: "true false",
  Option4: "false true",
  CorrectOption: 3,
  iscodesnippet: true,
  codesnippet: `import java.util.HashSet;

public class Main {
    public static void main(String[] args) {
        HashSet<String> set = new HashSet<>();
        boolean first = set.add("pen");
        boolean second = set.add("pen");
        System.out.println(first + " " + second);
    }
}`,
  snippetLang: "java",
});

// 15 ── medium ── Iterators (concept)
mcqQuestions.push({
  title: "Fail-Fast Iterator Behaviour",
  description: "While iterating an ArrayList with an Iterator, the code calls list.remove(0) directly on the list instead of it.remove(). What is the expected behaviour?",
  difficulty: "medium",
  topic: TOPIC,
  subtopic: "Iterators",
  Option1: "The Iterator silently skips one element and keeps going",
  Option2: "The next call to it.next() throws ConcurrentModificationException",
  Option3: "The list is copied automatically and iteration continues normally",
  Option4: "The code does not compile because remove is not allowed inside a loop",
  CorrectOption: 2,
  iscodesnippet: false,
  codesnippet: null,
  snippetLang: null,
});

// 16 ── medium ── Set Operations (concept)
mcqQuestions.push({
  title: "Choosing a Sorted Set",
  description: "You need a set of names that automatically keeps them sorted in ascending order no matter what order they arrive in. Which implementation fits best?",
  difficulty: "medium",
  topic: TOPIC,
  subtopic: "Set Operations",
  Option1: "HashSet",
  Option2: "LinkedHashSet",
  Option3: "TreeSet",
  Option4: "ArrayList",
  CorrectOption: 3,
  iscodesnippet: false,
  codesnippet: null,
  snippetLang: null,
});

// 17 ── hard ── Iterators (snippet)
mcqQuestions.push({
  title: "Snippet: Second remove Without next",
  description: "The program calls it.remove() twice with no intervening it.next() call. The Iterator contract forbids remove unless next has been called since the last remove. What happens?",
  difficulty: "hard",
  topic: TOPIC,
  subtopic: "Iterators",
  Option1: "It removes the element 2 as well",
  Option2: "It throws IllegalStateException",
  Option3: "It throws ConcurrentModificationException",
  Option4: "It silently does nothing",
  CorrectOption: 2,
  iscodesnippet: true,
  codesnippet: `import java.util.ArrayList;
import java.util.Iterator;

public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<>();
        list.add(1);
        list.add(2);
        Iterator<Integer> it = list.iterator();
        it.next();
        it.remove();
        it.remove();
    }
}`,
  snippetLang: "java",
});

// 18 ── hard ── Iterators (snippet)
mcqQuestions.push({
  title: "Snippet: List Remove During Iteration",
  description: "The loop removes an element directly from the list while the Iterator is still active; the next it.next() detects the modification. What happens when the program runs?",
  difficulty: "hard",
  topic: TOPIC,
  subtopic: "Iterators",
  Option1: "It prints done twice",
  Option2: "It prints done once and removes every occurrence of 2",
  Option3: "It throws ConcurrentModificationException on the next it.next() call",
  Option4: "It throws IllegalStateException immediately at list.remove",
  CorrectOption: 3,
  iscodesnippet: true,
  codesnippet: `import java.util.ArrayList;
import java.util.Iterator;

public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<>();
        list.add(1);
        list.add(2);
        list.add(3);
        Iterator<Integer> it = list.iterator();
        while (it.hasNext()) {
            Integer v = it.next();
            if (v == 2) {
                list.remove(Integer.valueOf(2));
            }
        }
        System.out.println("done");
    }
}`,
  snippetLang: "java",
});

// 19 ── hard ── ArrayList Operations (snippet)
mcqQuestions.push({
  title: "Snippet: set Returns the Old Element",
  description: "The program calls list.set(0, 9), which replaces the element at index 0 and returns the element that was stored there before. What does the println print?",
  difficulty: "hard",
  topic: TOPIC,
  subtopic: "ArrayList Operations",
  Option1: "9 [9, 6]",
  Option2: "5 [9, 6]",
  Option3: "5 [5, 6]",
  Option4: "9 [5, 6]",
  CorrectOption: 2,
  iscodesnippet: true,
  codesnippet: `import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<>();
        list.add(5);
        list.add(6);
        int old = list.set(0, 9);
        System.out.println(old + " " + list);
    }
}`,
  snippetLang: "java",
});

// 20 ── hard ── HashSet (concept)
mcqQuestions.push({
  title: "HashSet Internals",
  description: "Internally, the java.util.HashSet class stores its elements with the help of which structure?",
  difficulty: "hard",
  topic: TOPIC,
  subtopic: "HashSet",
  Option1: "A sorted array of elements",
  Option2: "A TreeMap keyed by element",
  Option3: "A LinkedList that preserves insertion order",
  Option4: "An internal HashMap instance where elements become keys",
  CorrectOption: 4,
  iscodesnippet: false,
  codesnippet: null,
  snippetLang: null,
});

/* ─────────────────────────────── WRITE PART FILES ─────────────────────────────── */

// put public class Main first in every source (Lambda requirement)
for (const q of codeQuestions) {
  q.sourcecode = mainFirst(q.sourcecode);
}

// sanity checks before writing
if (codeQuestions.length !== 20) throw new Error("expected 20 code questions, got " + codeQuestions.length);
if (mcqQuestions.length !== 20) throw new Error("expected 20 mcq questions, got " + mcqQuestions.length);

const counts = { easy: 0, medium: 0, hard: 0, basic: 0, scenario: 0 };
for (const q of codeQuestions) {
  counts[q.difficulty]++;
  if (q.difficulty === "easy") counts[q.variant]++;
}
console.log("code difficulty:", JSON.stringify(counts));
const mcounts = { easy: 0, medium: 0, hard: 0, snippets: 0 };
for (const q of mcqQuestions) {
  mcounts[q.difficulty]++;
  if (q.iscodesnippet) mcounts.snippets++;
}
console.log("mcq difficulty:", JSON.stringify(mcounts));

// subtopic coverage (code): exactly 4 each expected
const cov = {};
for (const q of codeQuestions) cov[q.subtopic] = (cov[q.subtopic] || 0) + 1;
console.log("code subtopic coverage:", JSON.stringify(cov));

const topicsBlock = [{ name: TOPIC, subtopics: SUBTOPICS }];

fs.writeFileSync(
  path.join(DIR, "day-16.code.p1.json"),
  JSON.stringify({ day: 16, topics: topicsBlock, questions: codeQuestions.slice(0, 10) }, null, 2) + "\n"
);
fs.writeFileSync(
  path.join(DIR, "day-16.code.p2.json"),
  JSON.stringify({ questions: codeQuestions.slice(10) }, null, 2) + "\n"
);
fs.writeFileSync(
  path.join(DIR, "day-16.mcq.p1.json"),
  JSON.stringify({ day: 16, questions: mcqQuestions.slice(0, 10) }, null, 2) + "\n"
);
fs.writeFileSync(
  path.join(DIR, "day-16.mcq.p2.json"),
  JSON.stringify({ questions: mcqQuestions.slice(10) }, null, 2) + "\n"
);

console.log("wrote day-16 part files:", codeQuestions.length, "code,", mcqQuestions.length, "mcq");

// sanity: no backslashes anywhere in Java sources or snippets
for (const q of codeQuestions) {
  if (q.sourcecode.includes("\\")) throw new Error("backslash in source: " + q.title);
  // reference solution must satisfy its own blacklist/whitelist
  for (const kw of String(q.blacklist).split(",").map((s) => s.trim()).filter(Boolean)) {
    if (q.sourcecode.includes(kw)) throw new Error("blacklisted keyword " + kw + " in solution: " + q.title);
  }
  for (const kw of String(q.whitelist).split(",").map((s) => s.trim()).filter(Boolean)) {
    if (!q.sourcecode.includes(kw)) throw new Error("whitelisted keyword " + kw + " missing from solution: " + q.title);
  }
}
for (const q of mcqQuestions) {
  if (q.codesnippet && q.codesnippet.includes("\\")) throw new Error("backslash in snippet: " + q.title);
}
console.log("backslash + blacklist/whitelist sanity checks passed");
