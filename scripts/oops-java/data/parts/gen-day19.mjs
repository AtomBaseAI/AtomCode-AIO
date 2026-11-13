import fs from "node:fs";
import path from "node:path";

const DIR = new URL(".", import.meta.url).pathname;
const TOPIC = "Generics and Lambda Expressions";

const topics = [
  {
    name: TOPIC,
    subtopics: [
      "Generic Classes",
      "Generic Methods",
      "Bounded Type Parameters",
      "Functional Interfaces",
      "Lambda Expressions",
      "Built-in Functional Interfaces",
    ],
  },
];

/* ──────────────────────────── CODE QUESTIONS ──────────────────────────── */

const codeQuestions = [
  {
    title: "Box of Any Type",
    description: `A moving company stores items of different types in sealed boxes. Write a generic class Box<T> with a constructor and a getter, then create a box of the type named by the input tag and print what it holds.\n\nInput Format:\nOne line with a tag (int, double or string) followed by one value token.\n\nOutput Format:\nPrint 'Stored value: v' and then 'Type: SimpleName' where v is the stored value and SimpleName is Integer, Double or String.\n\nConstraints:\nNumeric values are between -1000000 and 1000000; string values are single tokens of 1 to 20 characters`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "java",
    topic: TOPIC,
    subtopic: "Generic Classes",
    sampleinput1: "int 42",
    sampleoutput1: "Stored value: 42\nType: Integer",
    sampleinput2: "string hello",
    sampleoutput2: "Stored value: hello\nType: String",
    input1: "double 3.5",
    output1: "Stored value: 3.5\nType: Double",
    input2: "int -7",
    output2: "Stored value: -7\nType: Integer",
    input3: "double 2.0",
    output3: "Stored value: 2.0\nType: Double",
    inputconstrains: "tag in {int, double, string}; -1000000 <= numeric value <= 1000000; string tokens 1-20 chars",
    blacklist: "",
    whitelist: "",
    sourcecode: `import java.util.Scanner;

class Box<T> {
    private T value;
    public Box(T value) {
        this.value = value;
    }
    public T getValue() {
        return value;
    }
    public Class<?> getType() {
        return value.getClass();
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String tag = sc.next();
        if (tag.equals("int")) {
            Box<Integer> box = new Box<>(sc.nextInt());
            System.out.println("Stored value: " + box.getValue());
            System.out.println("Type: " + box.getType().getSimpleName());
        } else if (tag.equals("double")) {
            Box<Double> box = new Box<>(sc.nextDouble());
            System.out.println("Stored value: " + box.getValue());
            System.out.println("Type: " + box.getType().getSimpleName());
        } else {
            Box<String> box = new Box<>(sc.next());
            System.out.println("Stored value: " + box.getValue());
            System.out.println("Type: " + box.getType().getSimpleName());
        }
    }
}`,
  },
  {
    title: "First of Two Generics",
    description: `Generic methods let one method serve many types without overloading. Implement a generic method declared as public static <T> T first(T a, T b) that always returns its first argument, and call it from main based on the input tag.\n\nInput Format:\nOne line starting with a tag (int or string) followed by two space-separated values of that type.\n\nOutput Format:\nPrint 'First: v' where v is the first value.\n\nConstraints:\nIntegers are between -1000000 and 1000000; strings are single tokens of 1 to 20 characters`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "java",
    topic: TOPIC,
    subtopic: "Generic Methods",
    sampleinput1: "int 5 9",
    sampleoutput1: "First: 5",
    sampleinput2: "string apple banana",
    sampleoutput2: "First: apple",
    input1: "int -3 100",
    output1: "First: -3",
    input2: "string zero one",
    output2: "First: zero",
    input3: "int 0 0",
    output3: "First: 0",
    inputconstrains: "tag in {int, string}; integers -1000000 <= v <= 1000000; strings 1-20 chars",
    blacklist: "",
    whitelist: "",
    sourcecode: `import java.util.Scanner;

public class Main {
    public static <T> T first(T a, T b) {
        return a;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String tag = sc.next();
        if (tag.equals("int")) {
            int a = sc.nextInt();
            int b = sc.nextInt();
            System.out.println("First: " + first(a, b));
        } else {
            String a = sc.next();
            String b = sc.next();
            System.out.println("First: " + first(a, b));
        }
    }
}`,
  },
  {
    title: "Generic Pair Printer",
    description: `A key-value registry needs to hold any combination of key and value types. Define a generic class Pair<K, V> with a two-argument constructor and a toString that returns [key, value], then print the pair built from the input.\n\nInput Format:\nOne line: ktype vtype kvalue vvalue where ktype and vtype are each int or string, and kvalue and vvalue are matching value tokens.\n\nOutput Format:\nPrint 'Pair: [k, v]'.\n\nConstraints:\nIntegers are between -1000000 and 1000000; strings are single tokens of 1 to 20 characters`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "java",
    topic: TOPIC,
    subtopic: "Generic Classes",
    sampleinput1: "int string 101 Alice",
    sampleoutput1: "Pair: [101, Alice]",
    sampleinput2: "string int age 20",
    sampleoutput2: "Pair: [age, 20]",
    input1: "int int 1 2",
    output1: "Pair: [1, 2]",
    input2: "string string name Bob",
    output2: "Pair: [name, Bob]",
    input3: "int string 7 seven",
    output3: "Pair: [7, seven]",
    inputconstrains: "ktype, vtype in {int, string}; integers -1000000 <= v <= 1000000; strings 1-20 chars",
    blacklist: "",
    whitelist: "",
    sourcecode: `import java.util.Scanner;

class Pair<K, V> {
    private K key;
    private V value;
    public Pair(K key, V value) {
        this.key = key;
        this.value = value;
    }
    public String toString() {
        return "[" + key + ", " + value + "]";
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String ktype = sc.next();
        String vtype = sc.next();
        Object k;
        Object v;
        if (ktype.equals("int")) {
            k = sc.nextInt();
        } else {
            k = sc.next();
        }
        if (vtype.equals("int")) {
            v = sc.nextInt();
        } else {
            v = sc.next();
        }
        Pair<Object, Object> pair = new Pair<>(k, v);
        System.out.println("Pair: " + pair);
    }
}`,
  },
  {
    title: "Lambda Calculator",
    description: `Building a tiny calculator is a classic first use of lambdas. Define a functional interface Calc with a method int apply(int a, int b), create lambda instances for +, -, * and /, and dispatch on the input operator.\n\nInput Format:\nOne line: a op b where op is one of + - * /.\n\nOutput Format:\nPrint the integer result of applying the chosen operation (integer division for /).\n\nConstraints:\n-1000000 <= a, b <= 1000000; b is never 0 when op is /`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "java",
    topic: TOPIC,
    subtopic: "Functional Interfaces",
    sampleinput1: "5 + 3",
    sampleoutput1: "8",
    sampleinput2: "10 / 2",
    sampleoutput2: "5",
    input1: "7 - 9",
    output1: "-2",
    input2: "6 * 7",
    output2: "42",
    input3: "100 * 0",
    output3: "0",
    inputconstrains: "-1000000 <= a, b <= 1000000; op in {+,-,*,/}; b != 0 when op is /",
    blacklist: "",
    whitelist: "",
    sourcecode: `import java.util.Scanner;

interface Calc {
    int apply(int a, int b);
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        String op = sc.next();
        int b = sc.nextInt();
        Calc add = (x, y) -> x + y;
        Calc sub = (x, y) -> x - y;
        Calc mul = (x, y) -> x * y;
        Calc div = (x, y) -> x / y;
        int result;
        if (op.equals("+")) {
            result = add.apply(a, b);
        } else if (op.equals("-")) {
            result = sub.apply(a, b);
        } else if (op.equals("*")) {
            result = mul.apply(a, b);
        } else {
            result = div.apply(a, b);
        }
        System.out.println(result);
    }
}`,
  },
  {
    title: "Predicate String Checker",
    description: `Form validation often starts with simple boolean checks. Using java.util.function.Predicate with lambdas, check whether a word starts with the capital letter A and whether its length is at least a given limit, printing both results.\n\nInput Format:\nOne line: a word token followed by an integer limit.\n\nOutput Format:\nPrint 'Starts with A: b' then 'Length at least L: b' where each b is true or false in lowercase.\n\nConstraints:\nThe word has 1 to 20 letters; 1 <= limit <= 25`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "java",
    topic: TOPIC,
    subtopic: "Built-in Functional Interfaces",
    sampleinput1: "Apple 3",
    sampleoutput1: "Starts with A: true\nLength at least 3: true",
    sampleinput2: "banana 10",
    sampleoutput2: "Starts with A: false\nLength at least 10: false",
    input1: "Ant 5",
    output1: "Starts with A: true\nLength at least 5: false",
    input2: "cat 3",
    output2: "Starts with A: false\nLength at least 3: true",
    input3: "Aviator 7",
    output3: "Starts with A: true\nLength at least 7: true",
    inputconstrains: "word 1-20 letters; 1 <= limit <= 25",
    blacklist: "",
    whitelist: "",
    sourcecode: `import java.util.Scanner;
import java.util.function.Predicate;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String word = sc.next();
        int limit = sc.nextInt();
        Predicate<String> startsA = s -> s.startsWith("A");
        Predicate<String> longEnough = s -> s.length() >= limit;
        System.out.println("Starts with A: " + startsA.test(word));
        System.out.println("Length at least " + limit + ": " + longEnough.test(word));
    }
}`,
  },
  {
    title: "Function Mapper",
    description: `A math helper app maps one number to another through simple transforms. Using java.util.function.Function with lambdas, apply the operation named in the input to the given number.\n\nInput Format:\nOne line: an integer n followed by an operation token (double, square or negate).\n\nOutput Format:\nPrint the transformed value: n*2 for double, n*n for square, -n for negate.\n\nConstraints:\n-1000 <= n <= 1000`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "java",
    topic: TOPIC,
    subtopic: "Lambda Expressions",
    sampleinput1: "5 double",
    sampleoutput1: "10",
    sampleinput2: "-4 square",
    sampleoutput2: "16",
    input1: "7 negate",
    output1: "-7",
    input2: "0 square",
    output2: "0",
    input3: "-9 double",
    output3: "-18",
    inputconstrains: "-1000 <= n <= 1000; op in {double, square, negate}",
    blacklist: "",
    whitelist: "",
    sourcecode: `import java.util.Scanner;
import java.util.function.Function;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        String op = sc.next();
        Function<Integer, Integer> doubleIt = x -> x * 2;
        Function<Integer, Integer> squareIt = x -> x * x;
        Function<Integer, Integer> negateIt = x -> -x;
        int result;
        if (op.equals("double")) {
            result = doubleIt.apply(n);
        } else if (op.equals("square")) {
            result = squareIt.apply(n);
        } else {
            result = negateIt.apply(n);
        }
        System.out.println(result);
    }
}`,
  },
  {
    title: "Cart Total with Tax",
    description: `An online store checkout adds sales tax as the very last step. Represent that tax step as a Function<Double, Double> lambda that takes the base price and returns the price with tax added, then print the final total.\n\nInput Format:\nOne line: base price and tax rate percent, both decimals.\n\nOutput Format:\nPrint the total with exactly 2 decimals.\n\nConstraints:\n0 <= price <= 100000; 0 <= rate <= 50`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "java",
    topic: TOPIC,
    subtopic: "Lambda Expressions",
    sampleinput1: "100.0 5.0",
    sampleoutput1: "105.00",
    sampleinput2: "250.50 8.0",
    sampleoutput2: "270.54",
    input1: "60.0 2.5",
    output1: "61.50",
    input2: "19.99 10.0",
    output2: "21.99",
    input3: "0.0 50.0",
    output3: "0.00",
    inputconstrains: "0 <= price <= 100000; 0 <= rate <= 50",
    blacklist: "",
    whitelist: "",
    sourcecode: `import java.util.Scanner;
import java.util.function.Function;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double price = sc.nextDouble();
        double rate = sc.nextDouble();
        Function<Double, Double> withTax = p -> p + p * rate / 100.0;
        double total = withTax.apply(price);
        System.out.printf("%.2f%n", total);
    }
}`,
  },
  {
    title: "Credential Validator",
    description: `A login service checks credentials with two rules before granting access. Using Predicate lambdas, verify that the username has at least 4 characters and the password has at least 6 characters, and grant access only when both rules pass.\n\nInput Format:\nOne line: a username token and a password token.\n\nOutput Format:\nPrint 'Access granted' if both checks pass, otherwise 'Access denied'.\n\nConstraints:\nUsername and password are single tokens of 1 to 20 characters`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "java",
    topic: TOPIC,
    subtopic: "Functional Interfaces",
    sampleinput1: "admin secret123",
    sampleoutput1: "Access granted",
    sampleinput2: "bo xyz",
    sampleoutput2: "Access denied",
    input1: "john qwerty",
    output1: "Access granted",
    input2: "alice key",
    output2: "Access denied",
    input3: "abc defghij",
    output3: "Access denied",
    inputconstrains: "username and password are single tokens of 1-20 characters",
    blacklist: "",
    whitelist: "",
    sourcecode: `import java.util.Scanner;
import java.util.function.Predicate;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String user = sc.next();
        String pass = sc.next();
        Predicate<String> userOk = u -> u.length() >= 4;
        Predicate<String> passOk = p -> p.length() >= 6;
        boolean granted = userOk.test(user) && passOk.test(pass);
        if (granted) {
            System.out.println("Access granted");
        } else {
            System.out.println("Access denied");
        }
    }
}`,
  },
  {
    title: "Temperature Converter Suite",
    description: `A weather dashboard converts temperatures between scales. Build the three converters as Function<Double, Double> lambdas (c2f: v*9/5+32, f2c: (v-32)*5/9, k2c: v-273.15) and apply the one named in the input.\n\nInput Format:\nOne line: a decimal value and a mode (c2f, f2c or k2c).\n\nOutput Format:\nPrint the converted value with exactly 2 decimals.\n\nConstraints:\n-1000 <= value <= 1000`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "java",
    topic: TOPIC,
    subtopic: "Lambda Expressions",
    sampleinput1: "100 c2f",
    sampleoutput1: "212.00",
    sampleinput2: "98.6 f2c",
    sampleoutput2: "37.00",
    input1: "37 c2f",
    output1: "98.60",
    input2: "300 k2c",
    output2: "26.85",
    input3: "-40 c2f",
    output3: "-40.00",
    inputconstrains: "-1000 <= value <= 1000; mode in {c2f, f2c, k2c}",
    blacklist: "",
    whitelist: "",
    sourcecode: `import java.util.Scanner;
import java.util.function.Function;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double value = sc.nextDouble();
        String mode = sc.next();
        Function<Double, Double> c2f = c -> c * 9.0 / 5.0 + 32.0;
        Function<Double, Double> f2c = f -> (f - 32.0) * 5.0 / 9.0;
        Function<Double, Double> k2c = k -> k - 273.15;
        double result;
        if (mode.equals("c2f")) {
            result = c2f.apply(value);
        } else if (mode.equals("f2c")) {
            result = f2c.apply(value);
        } else {
            result = k2c.apply(value);
        }
        System.out.printf("%.2f%n", result);
    }
}`,
  },
  {
    title: "Library Catalog Lookup",
    description: `A library shelf tracks how many copies of each book are present. Model each shelf entry with your generic class Pair<K, V> (here Pair<String, Integer>) with getKey and getValue accessors, store the entries in a list, then print the catalog in input order.\n\nInput Format:\nThe first token is n. Each of the next n pairs is a call number token followed by an integer copy count.\n\nOutput Format:\nFor each entry print 'call -> copies' on its own line.\n\nConstraints:\n1 <= n <= 10; call numbers are 1 to 10 characters; 0 <= copies <= 100`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "java",
    topic: TOPIC,
    subtopic: "Generic Classes",
    sampleinput1: "2 QA101 3 ZX9 12",
    sampleoutput1: "QA101 -> 3\nZX9 -> 12",
    sampleinput2: "1 T100 5",
    sampleoutput2: "T100 -> 5",
    input1: "3 B1 0 B2 7 B3 3",
    output1: "B1 -> 0\nB2 -> 7\nB3 -> 3",
    input2: "1 X 1",
    output2: "X -> 1",
    input3: "2 M900 4 M901 0",
    output3: "M900 -> 4\nM901 -> 0",
    inputconstrains: "1 <= n <= 10; call numbers 1-10 chars; 0 <= copies <= 100",
    blacklist: "",
    whitelist: "",
    sourcecode: `import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

class Pair<K, V> {
    private K key;
    private V value;
    public Pair(K key, V value) {
        this.key = key;
        this.value = value;
    }
    public K getKey() {
        return key;
    }
    public V getValue() {
        return value;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        List<Pair<String, Integer>> catalog = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            String call = sc.next();
            int copies = sc.nextInt();
            catalog.add(new Pair<>(call, copies));
        }
        for (Pair<String, Integer> entry : catalog) {
            System.out.println(entry.getKey() + " -> " + entry.getValue());
        }
    }
}`,
  },

  /* ── MEDIUM ── */

  {
    title: "Bounded Max Finder",
    description: `Bounded type parameters let a generic method compare values without knowing their exact type. A stock room reports the largest of its counts using a generic method declared as public static <T extends Comparable<T>> T maxOf(T[] arr) that loops with compareTo. Do not use Math.max anywhere.\n\nInput Format:\nThe first token is n. The next n tokens are integers.\n\nOutput Format:\nPrint 'Max: v' where v is the largest value.\n\nConstraints:\n1 <= n <= 100; each value is between -1000000 and 1000000`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "java",
    topic: TOPIC,
    subtopic: "Bounded Type Parameters",
    sampleinput1: "4 3 17 8 11",
    sampleoutput1: "Max: 17",
    sampleinput2: "3 -5 -2 -9",
    sampleoutput2: "Max: -2",
    input1: "1 42",
    output1: "Max: 42",
    input2: "5 0 0 0 0 0",
    output2: "Max: 0",
    input3: "6 100 99 100 50 100 3",
    output3: "Max: 100",
    inputconstrains: "1 <= n <= 100; -1000000 <= value <= 1000000",
    blacklist: "Math.max",
    whitelist: "extends Comparable",
    sourcecode: `import java.util.Scanner;

public class Main {
    public static <T extends Comparable<T>> T maxOf(T[] arr) {
        T best = arr[0];
        for (int i = 1; i < arr.length; i++) {
            if (arr[i].compareTo(best) > 0) {
                best = arr[i];
            }
        }
        return best;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        Integer[] arr = new Integer[n];
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }
        System.out.println("Max: " + maxOf(arr));
    }
}`,
  },
  {
    title: "Count Matching Values",
    description: `A survey tool counts how many readings satisfy a rule chosen at runtime. Write a generic method declared as public static <T> int countMatching(T[] arr, Predicate<T> pred) and call it with a lambda that tests whether a value is strictly greater than a threshold. Do not use streams.\n\nInput Format:\nOne line: n, threshold, then n integers.\n\nOutput Format:\nPrint 'Count: c' where c is how many values are strictly greater than threshold.\n\nConstraints:\n1 <= n <= 100; -1000000 <= values and threshold <= 1000000`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "java",
    topic: TOPIC,
    subtopic: "Generic Methods",
    sampleinput1: "5 10 3 12 7 15 40",
    sampleoutput1: "Count: 3",
    sampleinput2: "3 0 -1 0 1",
    sampleoutput2: "Count: 1",
    input1: "1 5 9",
    output1: "Count: 1",
    input2: "4 -100 -200 -300 -400 -100",
    output2: "Count: 0",
    input3: "6 2 2 3 2 3 2 2",
    output3: "Count: 2",
    inputconstrains: "1 <= n <= 100; -1000000 <= values, threshold <= 1000000",
    blacklist: "Stream",
    whitelist: "Predicate",
    sourcecode: `import java.util.Scanner;
import java.util.function.Predicate;

public class Main {
    public static <T> int countMatching(T[] arr, Predicate<T> pred) {
        int count = 0;
        for (T item : arr) {
            if (pred.test(item)) {
                count++;
            }
        }
        return count;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int threshold = sc.nextInt();
        Integer[] arr = new Integer[n];
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }
        Predicate<Integer> above = x -> x > threshold;
        System.out.println("Count: " + countMatching(arr, above));
    }
}`,
  },
  {
    title: "BiFunction Operation Chooser",
    description: `A geometry panel lets users pick an operation by name and applies it to two operands. Store the named operations in a map as BiFunction<Double, Double, Double> lambdas (add, sub, mul) and dispatch with map.get instead of a switch statement.\n\nInput Format:\nOne line: an operation (add, sub or mul) followed by two decimals.\n\nOutput Format:\nPrint the result with exactly 2 decimals.\n\nConstraints:\n-10000 <= operands <= 10000; op is add, sub or mul`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "java",
    topic: TOPIC,
    subtopic: "Built-in Functional Interfaces",
    sampleinput1: "add 2.5 3.5",
    sampleoutput1: "6.00",
    sampleinput2: "mul 1.5 4.0",
    sampleoutput2: "6.00",
    input1: "sub 10.0 2.5",
    output1: "7.50",
    input2: "mul 0.0 99.0",
    output2: "0.00",
    input3: "add -1.25 1.25",
    output3: "0.00",
    inputconstrains: "op in {add, sub, mul}; -10000 <= operand <= 10000",
    blacklist: "switch",
    whitelist: "BiFunction",
    sourcecode: `import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;
import java.util.function.BiFunction;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String op = sc.next();
        double a = sc.nextDouble();
        double b = sc.nextDouble();
        Map<String, BiFunction<Double, Double, Double>> ops = new HashMap<>();
        ops.put("add", (x, y) -> x + y);
        ops.put("sub", (x, y) -> x - y);
        ops.put("mul", (x, y) -> x * y);
        double result = ops.get(op).apply(a, b);
        System.out.printf("%.2f%n", result);
    }
}`,
  },
  {
    title: "Generic Stack Simulator",
    description: `Long before java.util.Stack, developers wrote their own. Build a generic Stack<T> class backed by a list with push, pop and peek methods (pop or peek on an empty stack returns null, and main then prints Empty), then replay the input operations.\n\nInput Format:\nThe first token is n. Each of the next n operations is push x, pop or peek.\n\nOutput Format:\nFor each pop or peek print the resulting value, or Empty when the stack has no items.\n\nConstraints:\n1 <= n <= 1000; pushed values between -1000000 and 1000000; operations are push, pop or peek`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "java",
    topic: TOPIC,
    subtopic: "Generic Classes",
    sampleinput1: "6 push 5 push 8 pop peek push 2 pop",
    sampleoutput1: "8\n5\n2",
    sampleinput2: "2 pop peek",
    sampleoutput2: "Empty\nEmpty",
    input1: "3 push 1 push 2 peek",
    output1: "2",
    input2: "4 push 7 pop pop pop",
    output2: "7\nEmpty\nEmpty",
    input3: "5 push 3 pop push 4 peek",
    output3: "3\n4",
    inputconstrains: "1 <= n <= 1000; -1000000 <= pushed value <= 1000000; ops in {push, pop, peek}",
    blacklist: "java.util.Stack, Deque",
    whitelist: "Stack<T>, push(, pop(",
    sourcecode: `import java.util.ArrayList;
import java.util.Scanner;

class Stack<T> {
    private ArrayList<T> items;
    public Stack() {
        items = new ArrayList<>();
    }
    public void push(T item) {
        items.add(item);
    }
    public T pop() {
        if (items.isEmpty()) {
            return null;
        }
        return items.remove(items.size() - 1);
    }
    public T peek() {
        if (items.isEmpty()) {
            return null;
        }
        return items.get(items.size() - 1);
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        Stack<Integer> st = new Stack<>();
        for (int i = 0; i < n; i++) {
            String op = sc.next();
            if (op.equals("push")) {
                int x = sc.nextInt();
                st.push(x);
            } else if (op.equals("pop")) {
                Integer v = st.pop();
                if (v == null) {
                    System.out.println("Empty");
                } else {
                    System.out.println(v);
                }
            } else {
                Integer v = st.peek();
                if (v == null) {
                    System.out.println("Empty");
                } else {
                    System.out.println(v);
                }
            }
        }
    }
}`,
  },
  {
    title: "Supplier Shape Factory",
    description: `A shape toolkit computes measurements lazily through factories. Define a generic method declared as public static <T> T produce(Supplier<T> factory) and build the chosen shape's formula as a Supplier<Double> lambda, then invoke it through produce. Use if-else selection, not a switch statement.\n\nInput Format:\nOne line: a shape (circle, square or cube) and a decimal size (radius for circle, side for square and cube).\n\nOutput Format:\nPrint 'Label: v' with v to 2 decimals, where Label is 'Circle area' (pi*r*r), 'Square area' (s*s) or 'Cube volume' (s*s*s).\n\nConstraints:\n0 < size <= 1000`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "java",
    topic: TOPIC,
    subtopic: "Functional Interfaces",
    sampleinput1: "circle 5",
    sampleoutput1: "Circle area: 78.54",
    sampleinput2: "square 4",
    sampleoutput2: "Square area: 16.00",
    input1: "cube 3",
    output1: "Cube volume: 27.00",
    input2: "circle 1",
    output2: "Circle area: 3.14",
    input3: "cube 2.5",
    output3: "Cube volume: 15.63",
    inputconstrains: "shape in {circle, square, cube}; 0 < size <= 1000",
    blacklist: "switch",
    whitelist: "Supplier",
    sourcecode: `import java.util.Scanner;
import java.util.function.Supplier;

public class Main {
    public static <T> T produce(Supplier<T> factory) {
        return factory.get();
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String choice = sc.next();
        double x = sc.nextDouble();
        Supplier<Double> factory;
        String label;
        if (choice.equals("circle")) {
            label = "Circle area";
            factory = () -> Math.PI * x * x;
        } else if (choice.equals("square")) {
            label = "Square area";
            factory = () -> x * x;
        } else {
            label = "Cube volume";
            factory = () -> x * x * x;
        }
        double value = produce(factory);
        System.out.print(label + ": ");
        System.out.printf("%.2f%n", value);
    }
}`,
  },
  {
    title: "Generic Array Reverser",
    description: `A word game flips the order of tokens in place. Write a generic method declared as public static <T> void reverse(T[] arr) that swaps elements from both ends moving inward with a while loop, apply it to the input words, and print them space-separated on one line. Do not use Collections.reverse.\n\nInput Format:\nThe first token is n. The next n tokens are words.\n\nOutput Format:\nPrint the words in reversed order, single-space separated, on one line.\n\nConstraints:\n1 <= n <= 100; words are single tokens of 1 to 15 characters`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "java",
    topic: TOPIC,
    subtopic: "Generic Methods",
    sampleinput1: "4 alpha beta gamma delta",
    sampleoutput1: "delta gamma beta alpha",
    sampleinput2: "1 solo",
    sampleoutput2: "solo",
    input1: "3 x y z",
    output1: "z y x",
    input2: "2 a b",
    output2: "b a",
    input3: "5 p q r s t",
    output3: "t s r q p",
    inputconstrains: "1 <= n <= 100; words are single tokens of 1-15 characters",
    blacklist: "Collections.reverse",
    whitelist: "<T>, reverse(",
    sourcecode: `import java.util.Scanner;

public class Main {
    public static <T> void reverse(T[] arr) {
        int i = 0;
        int j = arr.length - 1;
        while (i < j) {
            T tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
            i++;
            j--;
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        String[] words = new String[n];
        for (int i = 0; i < n; i++) {
            words[i] = sc.next();
        }
        reverse(words);
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < n; i++) {
            if (i > 0) {
                sb.append(" ");
            }
            sb.append(words[i]);
        }
        System.out.println(sb.toString());
    }
}`,
  },

  /* ── HARD ── */

  {
    title: "Mini Data Pipeline",
    description: `A data tool chains three stages over an array of numbers: map each value with a Function lambda, filter the mapped values with a Predicate lambda, and fold the survivors with a custom functional interface BinOp { int combine(int a, int b); }. All three stages are chosen from the input, and no streams are used anywhere.\n\nInput Format:\nOne line: n, then n integers, then mapOp (double, square or none), filterOp (even, positive or all) and reduceOp (sum, max or min).\n\nOutput Format:\nPrint 'Result: v' where v is the fold of the mapped values that pass the filter (fold starts from the first passing value). If nothing passes the filter print 'Result: empty'.\n\nConstraints:\n1 <= n <= 100; -1000 <= value <= 1000`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "java",
    topic: TOPIC,
    subtopic: "Lambda Expressions",
    sampleinput1: "5 1 2 3 4 5 double even sum",
    sampleoutput1: "Result: 30",
    sampleinput2: "4 -3 7 2 9 square positive max",
    sampleoutput2: "Result: 81",
    input1: "3 1 2 3 none even sum",
    output1: "Result: 2",
    input2: "4 5 -2 8 -3 double positive min",
    output2: "Result: 10",
    input3: "6 1 2 3 4 5 6 square all min",
    output3: "Result: 1",
    inputconstrains: "1 <= n <= 100; -1000 <= value <= 1000; mapOp in {double, square, none}; filterOp in {even, positive, all}; reduceOp in {sum, max, min}",
    blacklist: "java.util.stream, .stream(, Stream.of",
    whitelist: "Function, Predicate, BinOp",
    sourcecode: `import java.util.Scanner;
import java.util.function.Function;
import java.util.function.Predicate;

interface BinOp {
    int combine(int a, int b);
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }
        String mapOp = sc.next();
        String filterOp = sc.next();
        String reduceOp = sc.next();

        Function<Integer, Integer> mapper;
        if (mapOp.equals("double")) {
            mapper = x -> x * 2;
        } else if (mapOp.equals("square")) {
            mapper = x -> x * x;
        } else {
            mapper = x -> x;
        }

        Predicate<Integer> filter;
        if (filterOp.equals("even")) {
            filter = x -> x % 2 == 0;
        } else if (filterOp.equals("positive")) {
            filter = x -> x > 0;
        } else {
            filter = x -> true;
        }

        BinOp reducer;
        if (reduceOp.equals("sum")) {
            reducer = (a, b) -> a + b;
        } else if (reduceOp.equals("max")) {
            reducer = (a, b) -> a > b ? a : b;
        } else {
            reducer = (a, b) -> a < b ? a : b;
        }

        int state = 0;
        boolean first = true;
        for (int i = 0; i < n; i++) {
            int mapped = mapper.apply(arr[i]);
            if (!filter.test(mapped)) {
                continue;
            }
            if (first) {
                state = mapped;
                first = false;
            } else {
                state = reducer.combine(state, mapped);
            }
        }
        if (first) {
            System.out.println("Result: empty");
        } else {
            System.out.println("Result: " + state);
        }
    }
}`,
  },
  {
    title: "Priority Shipping Queue",
    description: `A shipping dock sorts parcels by weight using a priority queue. Define a small generic Parcel<T> class (T is the parcel id type, stored with an int weight and getId/getWeight accessors), build a Comparator<Parcel<String>> from the input ordering mode as a lambda (asc: lightest first, desc: heaviest first, ties broken by id in ascending alphabetical order), enqueue all parcels, then dequeue and print them in priority order. Do not use Collections.reverseOrder.\n\nInput Format:\nOne line: mode (asc or desc), n, then n pairs of parcel id and integer weight.\n\nOutput Format:\nPrint each dequeued parcel as 'id weight' on its own line.\n\nConstraints:\n1 <= n <= 1000; ids are unique tokens of 1 to 10 characters; 0 <= weight <= 10000`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "java",
    topic: TOPIC,
    subtopic: "Functional Interfaces",
    sampleinput1: "desc 3 boxA 10 boxB 25 boxC 7",
    sampleoutput1: "boxB 25\nboxA 10\nboxC 7",
    sampleinput2: "asc 3 x9 40 m2 12 a5 33",
    sampleoutput2: "m2 12\na5 33\nx9 40",
    input1: "asc 2 b 5 a 5",
    output1: "a 5\nb 5",
    input2: "desc 2 b 5 a 5",
    output2: "a 5\nb 5",
    input3: "asc 4 p3 8 p1 8 p2 2 p0 8",
    output3: "p2 2\np0 8\np1 8\np3 8",
    inputconstrains: "mode in {asc, desc}; 1 <= n <= 1000; ids unique 1-10 chars; 0 <= weight <= 10000",
    blacklist: "Collections.reverseOrder",
    whitelist: "Comparator, poll(",
    sourcecode: `import java.util.Comparator;
import java.util.PriorityQueue;
import java.util.Scanner;

class Parcel<T> {
    private T id;
    private int weight;
    public Parcel(T id, int weight) {
        this.id = id;
        this.weight = weight;
    }
    public T getId() {
        return id;
    }
    public int getWeight() {
        return weight;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String mode = sc.next();
        int n = sc.nextInt();
        Comparator<Parcel<String>> cmp;
        if (mode.equals("asc")) {
            cmp = (p1, p2) -> p1.getWeight() != p2.getWeight() ? p1.getWeight() - p2.getWeight() : p1.getId().compareTo(p2.getId());
        } else {
            cmp = (p1, p2) -> p1.getWeight() != p2.getWeight() ? p2.getWeight() - p1.getWeight() : p1.getId().compareTo(p2.getId());
        }
        PriorityQueue<Parcel<String>> pq = new PriorityQueue<>(cmp);
        for (int i = 0; i < n; i++) {
            String id = sc.next();
            int w = sc.nextInt();
            pq.add(new Parcel<>(id, w));
        }
        while (!pq.isEmpty()) {
            Parcel<String> p = pq.poll();
            System.out.println(p.getId() + " " + p.getWeight());
        }
    }
}`,
  },
  {
    title: "Event Bus Dispatch",
    description: `A smart home hub lets users register handlers for event names and later fires events through them. Build a Map<String, Consumer<String>> of handlers: upper prints 'UPPER: s' with the message capitalized, reverse prints 'REVERSE: s' with the message reversed using a manual loop (no StringBuilder.reverse), and echo prints 'ECHO: s'. Fire each event by dispatching through map.get, not a switch statement.\n\nInput Format:\nThe first token is n, followed by n pairs of handler name and type (upper, reverse or echo). Then m, followed by m pairs of event name and message token.\n\nOutput Format:\nFor each fired event print the handler's output line, or 'No handler for name' when no handler is registered.\n\nConstraints:\n1 <= n, m <= 20; names are 1 to 10 characters; messages are single tokens of 1 to 30 characters`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "java",
    topic: TOPIC,
    subtopic: "Built-in Functional Interfaces",
    sampleinput1: "3 alert upper log reverse debug echo 3 alert fire log abcdef debug hello",
    sampleoutput1: "UPPER: FIRE\nREVERSE: fedcba\nECHO: hello",
    sampleinput2: "1 beep echo 2 beep hi beep yo",
    sampleoutput2: "ECHO: hi\nECHO: yo",
    input1: "2 a upper b reverse 3 a cat b dog c bird",
    output1: "UPPER: CAT\nREVERSE: god\nNo handler for c",
    input2: "1 r reverse 1 r abcdefgh",
    output2: "REVERSE: hgfedcba",
    input3: "2 x upper y echo 2 y hi x planet",
    output3: "ECHO: hi\nUPPER: PLANET",
    inputconstrains: "1 <= n, m <= 20; names 1-10 chars; handler types in {upper, reverse, echo}; messages 1-30 chars",
    blacklist: "switch, StringBuilder.reverse",
    whitelist: "Consumer, accept(",
    sourcecode: `import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;
import java.util.function.Consumer;

public class Main {
    public static String reverse(String s) {
        char[] chars = s.toCharArray();
        int i = 0;
        int j = chars.length - 1;
        while (i < j) {
            char tmp = chars[i];
            chars[i] = chars[j];
            chars[j] = tmp;
            i++;
            j--;
        }
        return new String(chars);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        Map<String, Consumer<String>> handlers = new HashMap<>();
        for (int i = 0; i < n; i++) {
            String name = sc.next();
            String type = sc.next();
            if (type.equals("upper")) {
                handlers.put(name, s -> System.out.println("UPPER: " + s.toUpperCase()));
            } else if (type.equals("reverse")) {
                handlers.put(name, s -> System.out.println("REVERSE: " + reverse(s)));
            } else {
                handlers.put(name, s -> System.out.println("ECHO: " + s));
            }
        }
        int m = sc.nextInt();
        for (int i = 0; i < m; i++) {
            String name = sc.next();
            String message = sc.next();
            Consumer<String> handler = handlers.get(name);
            if (handler == null) {
                System.out.println("No handler for " + name);
            } else {
                handler.accept(message);
            }
        }
    }
}`,
  },
  {
    title: "Serializer Registry",
    description: `A reporting service serializes numbers differently depending on each field's type. Register each field tag with a Function<Integer, String> lambda in a map (plain: 'v=x', hex: '0x' followed by lowercase hex digits, binary: unsigned binary digits), then answer queries by dispatching through map.get without any instanceof checks.\n\nInput Format:\nThe first token is n, followed by n pairs of tag and kind (plain, hex or binary). Then m, followed by m pairs of tag and integer value.\n\nOutput Format:\nFor each query print the serialized value, or 'Unknown type' when the tag is not registered.\n\nConstraints:\n1 <= n <= 10; 1 <= m <= 20; 0 <= value <= 1000000; tags are 1 to 10 characters`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "java",
    topic: TOPIC,
    subtopic: "Built-in Functional Interfaces",
    sampleinput1: "3 score plain addr hex flags binary 3 score 42 addr 255 flags 10",
    sampleoutput1: "v=42\n0xff\n1010",
    sampleinput2: "1 t plain 2 t 7 t 100",
    sampleoutput2: "v=7\nv=100",
    input1: "2 a hex b plain 3 a 16 b 0 c 9",
    output1: "0x10\nv=0\nUnknown type",
    input2: "1 f binary 2 f 5 f 8",
    output2: "101\n1000",
    input3: "3 p plain h hex b binary 3 h 0 p 5 b 2",
    output3: "0x0\nv=5\n10",
    inputconstrains: "1 <= n <= 10; 1 <= m <= 20; kinds in {plain, hex, binary}; 0 <= value <= 1000000",
    blacklist: "instanceof",
    whitelist: "Function, apply(",
    sourcecode: `import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;
import java.util.function.Function;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        Map<String, Function<Integer, String>> registry = new HashMap<>();
        for (int i = 0; i < n; i++) {
            String tag = sc.next();
            String kind = sc.next();
            if (kind.equals("plain")) {
                registry.put(tag, x -> "v=" + x);
            } else if (kind.equals("hex")) {
                registry.put(tag, x -> "0x" + Integer.toHexString(x));
            } else {
                registry.put(tag, x -> Integer.toBinaryString(x));
            }
        }
        int m = sc.nextInt();
        for (int i = 0; i < m; i++) {
            String tag = sc.next();
            int value = sc.nextInt();
            Function<Integer, String> serializer = registry.get(tag);
            if (serializer == null) {
                System.out.println("Unknown type");
            } else {
                System.out.println(serializer.apply(value));
            }
        }
    }
}`,
  },
];

/* ──────────────────────────── MCQ QUESTIONS ──────────────────────────── */

const mcqQuestions = [
  {
    title: "Why Use Generics",
    description: "What is the primary benefit of using generics in a Java class or method?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Generic Classes",
    Option1: "Programs run faster because generic code produces special bytecode for each type",
    Option2: "Compile-time type safety: wrong types are caught at compile time and explicit casts are reduced",
    Option3: "A generic class can only store primitive types like int and double",
    Option4: "Generics let Java programs run without the JVM",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Diamond Operator Purpose",
    description: "In Java 7 and later, what does the diamond operator do in a statement like Box<Integer> box = new Box<>();?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Generic Classes",
    Option1: "It creates a raw type with no generic type checking",
    Option2: "It tells the compiler to infer the type argument from the declared variable type",
    Option3: "It removes generic type information at runtime",
    Option4: "It makes the newly created object eligible for garbage collection sooner",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Raw Type Behavior",
    description: "What happens when you declare List list = new ArrayList(); with no type argument?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Generic Classes",
    Option1: "The code fails to compile because a type argument is missing",
    Option2: "The code compiles but the list is a raw type: unchecked warnings appear and generic type checking is lost",
    Option3: "The compiler silently treats it as List<String>",
    Option4: "The list throws ClassCastException as soon as any element is added",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Generic Method Declaration",
    description: "Which option shows the correct way to declare a generic method with type parameter T?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Generic Methods",
    Option1: "public <T> void print(T item)",
    Option2: "public void <T> print(T item)",
    Option3: "public void print<>(T item)",
    Option4: "public (T) void print(T item)",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Functional Interface Rule",
    description: "What is the defining property of a functional interface in Java?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Functional Interfaces",
    Option1: "It must contain no methods at all",
    Option2: "It contains exactly one abstract method",
    Option3: "It must contain only default methods",
    Option4: "It must extend at least one other interface",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Valid Lambda Form",
    description: "Which of the following is a valid lambda expression implementing a functional interface method int length(String s)?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Lambda Expressions",
    Option1: "s -> s.length()",
    Option2: "(s) -> return s.length();",
    Option3: "String s -> s.length()",
    Option4: "lambda(s) { return s.length(); }",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Function Apply Method",
    description: "Which single abstract method does java.util.function.Function<T, R> declare?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Built-in Functional Interfaces",
    Option1: "test(T t)",
    Option2: "accept(T t)",
    Option3: "apply(T t)",
    Option4: "get()",
    CorrectOption: 3,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "FunctionalInterface Annotation Purpose",
    description: "What does the @FunctionalInterface annotation do?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Lambda Expressions",
    Option1: "It is required before any lambda can be assigned to the interface",
    Option2: "It asks the compiler to verify that the interface has exactly one abstract method",
    Option3: "It converts an abstract class into a functional interface",
    Option4: "It allows the interface to declare several abstract methods",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Bounded Type Meaning",
    description: "What does the bound in the generic declaration <T extends Comparable<T>> require of T?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Bounded Type Parameters",
    Option1: "T may be any type, including primitive types",
    Option2: "T must be Comparable<T> or a subtype of it, so the generic code can call compareTo on T values",
    Option3: "T must inherit from a class named Comparable using the extends keyword",
    Option4: "T is automatically cast to Comparable at runtime by the JVM",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Supplier Get Method",
    description: "Which built-in functional interface describes an operation that takes no input and produces a value of type T through its method T get()?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Built-in Functional Interfaces",
    Option1: "Consumer<T>",
    Option2: "Supplier<T>",
    Option3: "Predicate<T>",
    Option4: "BiFunction<T, U, R>",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "List String to List Object",
    description: "This code is submitted to the compiler. What is the result?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Generic Classes",
    Option1: "It prints hi",
    Option2: "It prints 42",
    Option3: "Compilation fails because List<String> cannot be assigned to List<Object>",
    Option4: "It compiles and throws ClassCastException at the assignment line",
    CorrectOption: 3,
    iscodesnippet: true,
    codesnippet: `import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<String> words = new ArrayList<>();
        words.add("hi");
        List<Object> objects = words;
        objects.add(42);
        System.out.println(words.get(0));
    }
}`,
    snippetLang: "java",
  },
  {
    title: "Type Erasure Runtime Proof",
    description: "This program is compiled and run. What does it print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Generic Classes",
    Option1: "It prints false followed by java.util.ArrayList<java.lang.Integer>",
    Option2: "It prints true followed by java.util.ArrayList",
    Option3: "It prints true followed by java.util.ArrayList<java.lang.Integer>",
    Option4: "It prints false followed by java.util.ArrayList",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> a = new ArrayList<>();
        ArrayList<String> b = new ArrayList<>();
        System.out.println(a.getClass() == b.getClass());
        System.out.println(a.getClass().getName());
    }
}`,
    snippetLang: "java",
  },
  {
    title: "Two Abstract Methods Block Lambda",
    description: "This code is submitted to the compiler. What is the result?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Lambda Expressions",
    Option1: "It prints go",
    Option2: "Compilation fails because Worker has two abstract methods, so it is not a functional interface and cannot be the target of a lambda",
    Option3: "It prints go twice because both abstract methods share one body",
    Option4: "It compiles and throws AbstractMethodError at runtime",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `interface Worker {
    void doStart();
    void doStop();
}

public class Main {
    public static void main(String[] args) {
        Worker w = () -> System.out.println("go");
        w.doStart();
    }
}`,
    snippetLang: "java",
  },
  {
    title: "Lambda Capture Mutation",
    description: "This code is submitted to the compiler. What is the result?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Lambda Expressions",
    Option1: "It prints 0",
    Option2: "It prints 10",
    Option3: "Compilation fails because a lambda can only capture variables that are final or effectively final, and count is assigned twice",
    Option4: "It prints nothing because the lambda is never invoked",
    CorrectOption: 3,
    iscodesnippet: true,
    codesnippet: `public class Main {
    public static void main(String[] args) {
        int count = 0;
        Runnable r = () -> System.out.println(count);
        count = 10;
        r.run();
    }
}`,
    snippetLang: "java",
  },
  {
    title: "Bounded Type Parameter Truth",
    description: "Which statement about bounded type parameters is TRUE?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Bounded Type Parameters",
    Option1: "The bound <T extends Number> lets T be the primitive types int and double directly",
    Option2: "The bound <T extends Number> restricts T to Number or its subclasses and lets the generic code call Number methods on T values",
    Option3: "A type parameter can never have more than one bound",
    Option4: "The syntax <T super Number> is valid for declaring a lower bound on a type parameter",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Mixed Type Inference",
    description: "This program is compiled and run. What is the result?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Generic Methods",
    Option1: "Compilation fails because the two arguments have different types",
    Option2: "It compiles because T is inferred as a common supertype of String and Integer, and it prints go",
    Option3: "It compiles and prints 7",
    Option4: "It compiles and prints go7",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `public class Main {
    public static <T> T pick(T a, T b) {
        return a;
    }

    public static void main(String[] args) {
        System.out.println(pick("go", 7));
    }
}`,
    snippetLang: "java",
  },
  {
    title: "Bound Violation Call",
    description: "This program is submitted to the compiler. What is the result?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Bounded Type Parameters",
    Option1: "It prints pear, then 99, then 2",
    Option2: "Compilation fails on the third call because Point does not satisfy the bound T extends Comparable<T>",
    Option3: "Compilation fails on the first call because String does not implement Comparable",
    Option4: "It prints pear and 99, then throws ClassCastException on the third call",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `class Point {
    int x;
    Point(int x) {
        this.x = x;
    }
}

public class Main {
    public static <T extends Comparable<T>> T bigger(T a, T b) {
        if (a.compareTo(b) >= 0) {
            return a;
        }
        return b;
    }

    public static void main(String[] args) {
        System.out.println(bigger("pear", "apple"));
        System.out.println(bigger(10, 99));
        System.out.println(bigger(new Point(1), new Point(2)));
    }
}`,
    snippetLang: "java",
  },
  {
    title: "andThen vs Compose Order",
    description: "This program is compiled and run. What does it print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Lambda Expressions",
    Option1: "It prints 11 followed by 12",
    Option2: "It prints 12 followed by 11",
    Option3: "It prints 10 followed by 12",
    Option4: "It prints 11 followed by 10",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `import java.util.function.Function;

public class Main {
    public static void main(String[] args) {
        Function<Integer, Integer> doubleIt = x -> x * 2;
        Function<Integer, Integer> addOne = x -> x + 1;
        System.out.println(doubleIt.andThen(addOne).apply(5));
        System.out.println(doubleIt.compose(addOne).apply(5));
    }
}`,
    snippetLang: "java",
  },
  {
    title: "Comparator Comparing Truth",
    description: "Which statement about Comparator.comparing is TRUE?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Built-in Functional Interfaces",
    Option1: "Comparator.comparing(User::getName) builds a comparator that orders users by the key extracted from each user, and that key type must implement Comparable",
    Option2: "Comparator.comparing can only extract keys of primitive int type",
    Option3: "Comparator.comparing is declared in the Map interface and works on its entries",
    Option4: "Comparator.comparing always orders strings in descending order unless a reverse flag is set",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Raw Type Heap Pollution",
    description: "This program is compiled and run (compiler warnings are ignored). What is the result?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Generic Classes",
    Option1: "It prints 99",
    Option2: "Compilation fails at the call addNumber(words)",
    Option3: "It compiles with unchecked warnings and throws ClassCastException at runtime when the value from get(1) is assigned to a String variable",
    Option4: "It prints hi followed by 99",
    CorrectOption: 3,
    iscodesnippet: true,
    codesnippet: `import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void addNumber(List list) {
        list.add(99);
    }

    public static void main(String[] args) {
        List<String> words = new ArrayList<>();
        words.add("hi");
        addNumber(words);
        String s = words.get(1);
        System.out.println(s);
    }
}`,
    snippetLang: "java",
  },
];

/* ──────────────────────────── WRITE PART FILES ──────────────────────────── */

fs.writeFileSync(
  path.join(DIR, "day-19.code.p1.json"),
  JSON.stringify({ day: 19, topics, questions: codeQuestions.slice(0, 10) }, null, 2) + "\n"
);
fs.writeFileSync(
  path.join(DIR, "day-19.code.p2.json"),
  JSON.stringify({ questions: codeQuestions.slice(10) }, null, 2) + "\n"
);
fs.writeFileSync(
  path.join(DIR, "day-19.mcq.p1.json"),
  JSON.stringify({ day: 19, questions: mcqQuestions.slice(0, 10) }, null, 2) + "\n"
);
fs.writeFileSync(
  path.join(DIR, "day-19.mcq.p2.json"),
  JSON.stringify({ questions: mcqQuestions.slice(10) }, null, 2) + "\n"
);

console.log("wrote day-19 part files:", codeQuestions.length, "code,", mcqQuestions.length, "mcq");

// sanity: no backslashes anywhere in Java sources or snippets
for (const q of codeQuestions) {
  if (q.sourcecode.includes("\\")) throw new Error("backslash in source: " + q.title);
}
for (const q of mcqQuestions) {
  if (q.codesnippet && q.codesnippet.includes("\\")) throw new Error("backslash in snippet: " + q.title);
}
console.log("backslash sanity check passed");

// sanity: blacklist/whitelist self-satisfaction for non-easy code questions
for (const q of codeQuestions) {
  const bl = String(q.blacklist).split(",").map((s) => s.trim()).filter(Boolean);
  const wl = String(q.whitelist).split(",").map((s) => s.trim()).filter(Boolean);
  for (const kw of bl) {
    if (q.sourcecode.includes(kw)) throw new Error(`blacklisted keyword ${kw} in ${q.title}`);
  }
  for (const kw of wl) {
    if (!q.sourcecode.includes(kw)) throw new Error(`whitelisted keyword ${kw} missing in ${q.title}`);
  }
}
console.log("blacklist/whitelist sanity check passed");

// sanity: subtopic coverage
const cover = {};
for (const q of codeQuestions) cover[q.subtopic] = (cover[q.subtopic] || 0) + 1;
console.log("code subtopic coverage:", JSON.stringify(cover));
const mcover = {};
for (const q of mcqQuestions) mcover[q.subtopic] = (mcover[q.subtopic] || 0) + 1;
console.log("mcq subtopic coverage:", JSON.stringify(mcover));
