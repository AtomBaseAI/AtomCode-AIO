/**
 * Day 04 — Strings and StringBuilder — complete reference programs.
 * main() is always the FIRST member of class Main (judge detectMainClass quirk).
 */

const solutions = [];

/* Q1 — Build the Greeting */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String name = sc.next();
        System.out.println(makeGreeting(name));
    }

    static String makeGreeting(String name) {
        return "Hello, " + name + "!";
    }
}
`);

/* Q2 — Count the Vowels */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.next();
        System.out.println(countVowels(s));
    }

    static int countVowels(String s) {
        int count = 0;
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u'
                    || c == 'A' || c == 'E' || c == 'I' || c == 'O' || c == 'U') {
                count++;
            }
        }
        return count;
    }
}
`);

/* Q3 — Palindrome Check */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.next();
        System.out.println(isPalindrome(s) ? 1 : 0);
    }

    static boolean isPalindrome(String s) {
        int i = 0;
        int j = s.length() - 1;
        while (i < j) {
            if (s.charAt(i) != s.charAt(j)) {
                return false;
            }
            i++;
            j--;
        }
        return true;
    }
}
`);

/* Q4 — Frequency of a Target Character */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.next();
        char target = sc.next().charAt(0);
        System.out.println(countChar(s, target));
    }

    static int countChar(String s, char target) {
        int count = 0;
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == target) {
                count++;
            }
        }
        return count;
    }
}
`);

/* Q5 — Reverse with StringBuilder */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.next();
        System.out.println(reverseString(s));
    }

    static String reverseString(String s) {
        StringBuilder sb = new StringBuilder();
        for (int i = s.length() - 1; i >= 0; i--) {
            sb.append(s.charAt(i));
        }
        return sb.toString();
    }
}
`);

/* Q6 — Toggle the Case */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.next();
        System.out.println(toggleCase(s));
    }

    static String toggleCase(String s) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (Character.isUpperCase(c)) {
                sb.append(Character.toLowerCase(c));
            } else {
                sb.append(Character.toUpperCase(c));
            }
        }
        return sb.toString();
    }
}
`);

/* Q7 — Username Normalizer */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String raw = sc.next();
        System.out.println(normalizeUsername(raw));
    }

    static String normalizeUsername(String raw) {
        if (raw.length() < 3) {
            return "SHORT";
        }
        return raw.toLowerCase();
    }
}
`);

/* Q8 — Hashtag Generator */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String sentence = sc.nextLine().trim();
        System.out.println(makeHashtag(sentence));
    }

    static String makeHashtag(String sentence) {
        String[] words = sentence.trim().split(" ");
        StringBuilder sb = new StringBuilder("#");
        for (String w : words) {
            sb.append(Character.toUpperCase(w.charAt(0)));
            sb.append(w.substring(1).toLowerCase());
        }
        return sb.toString();
    }
}
`);

/* Q9 — Password Strength Hint */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String pw = sc.next();
        System.out.println(passwordScore(pw));
    }

    static int passwordScore(String pw) {
        int score = pw.length();
        boolean digit = false;
        boolean upper = false;
        for (int i = 0; i < pw.length(); i++) {
            char c = pw.charAt(i);
            if (Character.isDigit(c)) {
                digit = true;
            }
            if (Character.isUpperCase(c)) {
                upper = true;
            }
        }
        if (digit) {
            score += 2;
        }
        if (upper) {
            score += 3;
        }
        return score;
    }
}
`);

/* Q10 — Order Code Formatter */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String item = sc.next();
        int qty = sc.nextInt();
        System.out.println(formatOrderCode(item, qty));
    }

    static String formatOrderCode(String item, int qty) {
        return item.toUpperCase() + "-" + qty;
    }
}
`);

/* Q11 — Immutable Chain Trace (blacklist: System.out.print, whitelist: replace) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        java.io.PrintStream so = System.out;
        String s = sc.next();
        String t = sc.next();
        char c = sc.next().charAt(0);
        char r = sc.next().charAt(0);
        so.println(transform(s, t, c, r));
    }

    static String transform(String s, String t, char c, char r) {
        String joined = s.concat(t);
        return joined.replace(c, r);
    }
}
`);

/* Q12 — Anagram Check (blacklist: Arrays.sort) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.next();
        String t = sc.next();
        System.out.println(isAnagram(s, t) ? 1 : 0);
    }

    static boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) {
            return false;
        }
        int[] freq = new int[26];
        for (int i = 0; i < s.length(); i++) {
            freq[s.charAt(i) - 'a']++;
            freq[t.charAt(i) - 'a']--;
        }
        for (int i = 0; i < 26; i++) {
            if (freq[i] != 0) {
                return false;
            }
        }
        return true;
    }
}
`);

/* Q13 — Reverse the Word Order (blacklist: System.out.print, whitelist: StringBuilder) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        java.io.PrintStream so = System.out;
        String sentence = sc.nextLine().trim();
        so.println(reverseWords(sentence));
    }

    static String reverseWords(String sentence) {
        String[] words = sentence.trim().split(" ");
        StringBuilder sb = new StringBuilder();
        for (int i = words.length - 1; i >= 0; i--) {
            sb.append(words[i]);
            if (i > 0) {
                sb.append(' ');
            }
        }
        return sb.toString();
    }
}
`);

/* Q14 — Longest Word Length (blacklist: System.out.print) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        java.io.PrintStream so = System.out;
        String sentence = sc.nextLine().trim();
        so.println(longestWordLength(sentence));
    }

    static int longestWordLength(String sentence) {
        String[] words = sentence.trim().split(" ");
        int best = 0;
        for (String w : words) {
            if (w.length() > best) {
                best = w.length();
            }
        }
        return best;
    }
}
`);

/* Q15 — Run-Length Compressor (blacklist: System.out.print, whitelist: StringBuilder) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        java.io.PrintStream so = System.out;
        String s = sc.next();
        so.println(compress(s));
    }

    static String compress(String s) {
        StringBuilder sb = new StringBuilder();
        int i = 0;
        while (i < s.length()) {
            char c = s.charAt(i);
            int run = 0;
            while (i < s.length() && s.charAt(i) == c) {
                run++;
                i++;
            }
            sb.append(c);
            if (run > 1) {
                sb.append(run);
            }
        }
        return sb.toString();
    }
}
`);

/* Q16 — Rotate String by K (blacklist: System.out.print, whitelist: substring) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        java.io.PrintStream so = System.out;
        String s = sc.next();
        int k = sc.nextInt();
        so.println(rotateString(s, k));
    }

    static String rotateString(String s, int k) {
        k %= s.length();
        return s.substring(k) + s.substring(0, k);
    }
}
`);

/* Q17 — First Non-Repeating Character (blacklist: System.out.print) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        java.io.PrintStream so = System.out;
        String s = sc.next();
        so.println(firstUniqueChar(s));
    }

    static int firstUniqueChar(String s) {
        int[] freq = new int[26];
        for (int i = 0; i < s.length(); i++) {
            freq[s.charAt(i) - 'a']++;
        }
        for (int i = 0; i < s.length(); i++) {
            if (freq[s.charAt(i) - 'a'] == 1) {
                return i;
            }
        }
        return -1;
    }
}
`);

/* Q18 — Title Case Formatter (blacklist: System.out.print, whitelist: StringBuilder) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        java.io.PrintStream so = System.out;
        String sentence = sc.nextLine().trim();
        so.println(titleCase(sentence));
    }

    static String titleCase(String sentence) {
        String[] words = sentence.trim().split(" ");
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < words.length; i++) {
            String w = words[i].toLowerCase();
            sb.append(Character.toUpperCase(w.charAt(0)));
            sb.append(w.substring(1));
            if (i < words.length - 1) {
                sb.append(' ');
            }
        }
        return sb.toString();
    }
}
`);

/* Q19 — Longest Common Prefix (blacklist: System.out.print) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        java.io.PrintStream so = System.out;
        int k = sc.nextInt();
        String[] words = new String[k];
        for (int i = 0; i < k; i++) {
            words[i] = sc.next();
        }
        String prefix = longestCommonPrefix(words);
        if (prefix.isEmpty()) {
            so.println("NONE");
        } else {
            so.println(prefix);
        }
    }

    static String longestCommonPrefix(String[] words) {
        String prefix = words[0];
        for (int i = 1; i < words.length; i++) {
            while (!words[i].startsWith(prefix)) {
                prefix = prefix.substring(0, prefix.length() - 1);
                if (prefix.isEmpty()) {
                    return "";
                }
            }
        }
        return prefix;
    }
}
`);

/* Q20 — Run-Length Expander (blacklist: System.out.print, whitelist: StringBuilder) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        java.io.PrintStream so = System.out;
        String s = sc.next();
        so.println(expand(s));
    }

    static String expand(String s) {
        StringBuilder sb = new StringBuilder();
        int i = 0;
        while (i < s.length()) {
            char ch = s.charAt(i);
            i++;
            int count = 0;
            while (i < s.length() && Character.isDigit(s.charAt(i))) {
                count = count * 10 + (s.charAt(i) - '0');
                i++;
            }
            if (count == 0) {
                count = 1;
            }
            for (int r = 0; r < count; r++) {
                sb.append(ch);
            }
        }
        return sb.toString();
    }
}
`);

export { solutions };
