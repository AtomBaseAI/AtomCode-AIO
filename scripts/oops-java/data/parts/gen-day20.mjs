/**
 * Day 20 — File Handling in Java (File Reading, File Writing, Serialization, Deserialization)
 * Generates the 4 part files consumed by merge-parts.ts:
 *   day-20.code.p1.json / day-20.code.p2.json / day-20.mcq.p1.json / day-20.mcq.p2.json
 *
 * Java solutions: single file, public class Main, NO backslash characters anywhere,
 * relative file paths only, every IO operation wrapped in try-catch.
 */
import fs from "node:fs";

const TOPIC = "File Handling in Java";
const SUBS = ["File Reading", "File Writing", "Serialization", "Deserialization"];

/* ─────────────────────────── CODE QUESTIONS ─────────────────────────── */

const codeQuestions = [
  {
    title: "Notes File Round Trip",
    description:
`A tiny journaling app stores each note as one line in a file named notes.txt on disk. Read the notes from stdin, write them into notes.txt (one per line), then read the file back and print every stored note exactly as it was saved.

Input Format:
First line: n. Then n lines, each one note (may contain spaces).

Output Format:
After writing the n notes to notes.txt, read the file back and print each stored note on its own line, in file order.

Constraints:
1 <= n <= 10 and each note line has length 1 to 40`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "java",
    topic: TOPIC,
    subtopic: "File Writing",
    sampleinput1: "3\nmilk and bread\ncoffee beans\nsugar",
    sampleoutput1: "milk and bread\ncoffee beans\nsugar",
    sampleinput2: "2\nhello world\nbye now",
    sampleoutput2: "hello world\nbye now",
    input1: "1\nsolo note",
    output1: "solo note",
    input2: "4\nred\nblue green\nyellow\npurple rain",
    output2: "red\nblue green\nyellow\npurple rain",
    input3: "2\ntop line\nbottom line",
    output3: "top line\nbottom line",
    inputconstrains: "1 <= n <= 10; each line length 1..40",
    blacklist: "",
    whitelist: "",
    sourcecode:
`import java.util.Scanner;
import java.io.PrintWriter;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        try {
            int n = Integer.parseInt(sc.nextLine().trim());
            PrintWriter pw = new PrintWriter("notes.txt");
            for (int i = 0; i < n; i++) {
                pw.println(sc.nextLine().trim());
            }
            pw.close();
            BufferedReader br = new BufferedReader(new FileReader("notes.txt"));
            String line;
            while ((line = br.readLine()) != null) {
                System.out.println(line);
            }
            br.close();
        } catch (IOException e) {
            System.out.println("IO error");
        }
    }
}`,
  },
  {
    title: "Sum Integers From File",
    description:
`A sensor dumps integers into a file, one per line, and a report later reads the file back to total them. Write each input integer to nums.txt on its own line, then reopen the file, read every line back, and print the sum.

Input Format:
First line: n. Second line: n space-separated integers.

Output Format:
Print 'Sum: s' where s is the sum of all integers read back from nums.txt.

Constraints:
1 <= n <= 1000 and -1000000 <= each value <= 1000000`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "java",
    topic: TOPIC,
    subtopic: "File Reading",
    sampleinput1: "3\n10 20 30",
    sampleoutput1: "Sum: 60",
    sampleinput2: "4\n-5 5 12 -2",
    sampleoutput2: "Sum: 10",
    input1: "1\n99",
    output1: "Sum: 99",
    input2: "5\n1 2 3 4 5",
    output2: "Sum: 15",
    input3: "3\n1000000 2000000 3000000",
    output3: "Sum: 6000000",
    inputconstrains: "1 <= n <= 1000; -1000000 <= value <= 1000000",
    blacklist: "",
    whitelist: "",
    sourcecode:
`import java.util.Scanner;
import java.io.PrintWriter;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        try {
            int n = sc.nextInt();
            PrintWriter pw = new PrintWriter("nums.txt");
            for (int i = 0; i < n; i++) {
                pw.println(sc.nextInt());
            }
            pw.close();
            BufferedReader br = new BufferedReader(new FileReader("nums.txt"));
            long sum = 0;
            String line;
            while ((line = br.readLine()) != null) {
                sum = sum + Integer.parseInt(line.trim());
            }
            br.close();
            System.out.println("Sum: " + sum);
        } catch (IOException e) {
            System.out.println("IO error");
        }
    }
}`,
  },
  {
    title: "Overwrite Then Append Diary",
    description:
`A diary app first creates diary.txt with an opening entry (the constructor with just the file name recreates the file from scratch), then adds later entries in append mode using new FileWriter(name, true) so earlier text is kept.

Input Format:
Exactly three lines: the opening entry, the second entry, the third entry.

Output Format:
Create diary.txt holding only the first line, append the second line, append the third line, then read the whole file back and print every line in order.

Constraints:
Each line has length 1 to 30`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "java",
    topic: TOPIC,
    subtopic: "File Writing",
    sampleinput1: "day 1 plain rice\nday 2 egg curry\nday 3 dal fry",
    sampleoutput1: "day 1 plain rice\nday 2 egg curry\nday 3 dal fry",
    sampleinput2: "mon: gym\nmon: run 5k\nmon: swim",
    sampleoutput2: "mon: gym\nmon: run 5k\nmon: swim",
    input1: "alpha\nbeta\ngamma",
    output1: "alpha\nbeta\ngamma",
    input2: "note one\nnote two\nnote three",
    output2: "note one\nnote two\nnote three",
    input3: "x y z\np q r\nm n o",
    output3: "x y z\np q r\nm n o",
    inputconstrains: "3 lines; each line length 1..30",
    blacklist: "",
    whitelist: "",
    sourcecode:
`import java.util.Scanner;
import java.io.PrintWriter;
import java.io.FileWriter;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        try {
            String first = sc.nextLine().trim();
            String second = sc.nextLine().trim();
            String third = sc.nextLine().trim();
            PrintWriter pw = new PrintWriter("diary.txt");
            pw.println(first);
            pw.close();
            PrintWriter appender = new PrintWriter(new FileWriter("diary.txt", true));
            appender.println(second);
            appender.close();
            appender = new PrintWriter(new FileWriter("diary.txt", true));
            appender.println(third);
            appender.close();
            BufferedReader br = new BufferedReader(new FileReader("diary.txt"));
            String line;
            while ((line = br.readLine()) != null) {
                System.out.println(line);
            }
            br.close();
        } catch (IOException e) {
            System.out.println("IO error");
        }
    }
}`,
  },
  {
    title: "Words To File And Back",
    description:
`A spelling game saves a word list to a file and then quizzes by reading the file back with a readLine loop that stops when the end of the file is reached (readLine returns null there).

Input Format:
First line: n. Second line: n space-separated words.

Output Format:
Write the words to words.txt one per line, then read the file back and print each word prefixed by its 1-based position, like '1 cat'.

Constraints:
1 <= n <= 20 and each word has 1 to 15 letters`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "java",
    topic: TOPIC,
    subtopic: "File Reading",
    sampleinput1: "3\ncat dog emu",
    sampleoutput1: "1 cat\n2 dog\n3 emu",
    sampleinput2: "2\njava code",
    sampleoutput2: "1 java\n2 code",
    input1: "1\nsolo",
    output1: "1 solo",
    input2: "4\naa bb cc dd",
    output2: "1 aa\n2 bb\n3 cc\n4 dd",
    input3: "3\nred blue green",
    output3: "1 red\n2 blue\n3 green",
    inputconstrains: "1 <= n <= 20; each word 1..15 letters",
    blacklist: "",
    whitelist: "",
    sourcecode:
`import java.util.Scanner;
import java.io.PrintWriter;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        try {
            int n = sc.nextInt();
            PrintWriter pw = new PrintWriter("words.txt");
            for (int i = 0; i < n; i++) {
                pw.println(sc.next());
            }
            pw.close();
            BufferedReader br = new BufferedReader(new FileReader("words.txt"));
            String line;
            int count = 1;
            while ((line = br.readLine()) != null) {
                System.out.println(count + " " + line);
                count++;
            }
            br.close();
        } catch (IOException e) {
            System.out.println("IO error");
        }
    }
}`,
  },
  {
    title: "Count Chars In Notes",
    description:
`Before sending a notes file over a slow link, an app checks its exact size on disk. Each word is written to notes.txt on its own line using println, which appends one newline character after the word, so the file holds len(word) + 1 characters per word.

Input Format:
First line: n. Second line: n space-separated words (letters only).

Output Format:
After writing, ask the File object for its size and print 'Chars: L' where L is the file length in characters.

Constraints:
1 <= n <= 20 and each word has 1 to 20 letters`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "java",
    topic: TOPIC,
    subtopic: "File Reading",
    sampleinput1: "3\ncat dog ox",
    sampleoutput1: "Chars: 11",
    sampleinput2: "2\nhello planet",
    sampleoutput2: "Chars: 13",
    input1: "1\na",
    output1: "Chars: 2",
    input2: "4\naa bb cc dd",
    output2: "Chars: 12",
    input3: "3\njava code fun",
    output3: "Chars: 14",
    inputconstrains: "1 <= n <= 20; each word 1..20 letters",
    blacklist: "",
    whitelist: "",
    sourcecode:
`import java.util.Scanner;
import java.io.PrintWriter;
import java.io.File;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        try {
            int n = sc.nextInt();
            PrintWriter pw = new PrintWriter("notes.txt");
            for (int i = 0; i < n; i++) {
                pw.println(sc.next());
            }
            pw.close();
            File f = new File("notes.txt");
            System.out.println("Chars: " + f.length());
        } catch (IOException e) {
            System.out.println("IO error");
        }
    }
}`,
  },
  {
    title: "Reverse Lines From File",
    description:
`A review tool flips a small script file: the last written line must be shown first. Store the lines in lines.txt, then read the file back into an array and print the lines in reverse order.

Input Format:
First line: n. Then n lines of text.

Output Format:
Write the n lines to lines.txt in input order, then read them back and print line n first and line 1 last.

Constraints:
1 <= n <= 10 and each line has length 1 to 40`,
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    lang: "java",
    topic: TOPIC,
    subtopic: "File Reading",
    sampleinput1: "3\nfirst\nsecond\nthird",
    sampleoutput1: "third\nsecond\nfirst",
    sampleinput2: "2\nalpha beta\ngamma delta",
    sampleoutput2: "gamma delta\nalpha beta",
    input1: "1\nonly",
    output1: "only",
    input2: "4\nw\nx\ny\nz",
    output2: "z\ny\nx\nw",
    input3: "2\nstart\nend",
    output3: "end\nstart",
    inputconstrains: "1 <= n <= 10; each line length 1..40",
    blacklist: "",
    whitelist: "",
    sourcecode:
`import java.util.Scanner;
import java.io.PrintWriter;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        try {
            int n = Integer.parseInt(sc.nextLine().trim());
            PrintWriter pw = new PrintWriter("lines.txt");
            for (int i = 0; i < n; i++) {
                pw.println(sc.nextLine().trim());
            }
            pw.close();
            BufferedReader br = new BufferedReader(new FileReader("lines.txt"));
            String[] arr = new String[n];
            for (int i = 0; i < n; i++) {
                arr[i] = br.readLine();
            }
            br.close();
            for (int i = n - 1; i >= 0; i--) {
                System.out.println(arr[i]);
            }
        } catch (IOException e) {
            System.out.println("IO error");
        }
    }
}`,
  },
  {
    title: "Cafe Receipt Writer",
    description:
`The campus cafe prints a receipt file at the counter. Every sale line is written to receipt.txt in the form 'item - price', and after the file is stored, the program reads it back to show it and closes with the day's grand total.

Input Format:
First line: n. Then n lines, each with an item name (single word) and its integer price separated by a space.

Output Format:
Write 'item - price' lines to receipt.txt, then read the file back and print every line exactly as stored, then print 'Total: t' with the sum of all prices.

Constraints:
1 <= n <= 20; item is a single word of 1 to 15 letters; 1 <= price <= 10000`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "java",
    topic: TOPIC,
    subtopic: "File Writing",
    sampleinput1: "3\nCoffee 120\nMuffin 45\nJuice 60",
    sampleoutput1: "Coffee - 120\nMuffin - 45\nJuice - 60\nTotal: 225",
    sampleinput2: "2\nTea 30\nCake 90",
    sampleoutput2: "Tea - 30\nCake - 90\nTotal: 120",
    input1: "1\nWater 15",
    output1: "Water - 15\nTotal: 15",
    input2: "3\nWrap 110\nChips 35\nSalad 65",
    output2: "Wrap - 110\nChips - 35\nSalad - 65\nTotal: 210",
    input3: "2\nSoup 40\nRoll 25",
    output3: "Soup - 40\nRoll - 25\nTotal: 65",
    inputconstrains: "1 <= n <= 20; item 1..15 letters; 1 <= price <= 10000",
    blacklist: "",
    whitelist: "",
    sourcecode:
`import java.util.Scanner;
import java.io.PrintWriter;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        try {
            int n = Integer.parseInt(sc.nextLine().trim());
            PrintWriter pw = new PrintWriter("receipt.txt");
            long total = 0;
            for (int i = 0; i < n; i++) {
                String item = sc.next();
                int price = sc.nextInt();
                total = total + price;
                pw.println(item + " - " + price);
            }
            pw.close();
            BufferedReader br = new BufferedReader(new FileReader("receipt.txt"));
            String line;
            while ((line = br.readLine()) != null) {
                System.out.println(line);
            }
            br.close();
            System.out.println("Total: " + total);
        } catch (IOException e) {
            System.out.println("IO error");
        }
    }
}`,
  },
  {
    title: "Marks File With Average",
    description:
`A class teacher archives marks in a file and re-opens it to compute the class average. Each 'name marks' line is written to marks.txt, then the file is read back line by line, the parsed marks are added up, and the average is printed with 2 decimals.

Input Format:
First line: n. Then n lines, each with a name (single word) and an integer mark.

Output Format:
Read marks.txt back and print each line as 'name: mark', then print 'Average: a' formatted to exactly 2 decimal places.

Constraints:
1 <= n <= 50; name is a single word of 1 to 15 letters; 0 <= mark <= 100`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "java",
    topic: TOPIC,
    subtopic: "File Reading",
    sampleinput1: "3\nRiya 88\nOmar 74\nMei 91",
    sampleoutput1: "Riya: 88\nOmar: 74\nMei: 91\nAverage: 84.33",
    sampleinput2: "2\nAda 95\nBo 80",
    sampleoutput2: "Ada: 95\nBo: 80\nAverage: 87.50",
    input1: "1\nZoe 70",
    output1: "Zoe: 70\nAverage: 70.00",
    input2: "3\nAn 60\nBi 70\nCy 80",
    output2: "An: 60\nBi: 70\nCy: 80\nAverage: 70.00",
    input3: "4\nP 50\nQ 55\nR 65\nS 70",
    output3: "P: 50\nQ: 55\nR: 65\nS: 70\nAverage: 60.00",
    inputconstrains: "1 <= n <= 50; name 1..15 letters; 0 <= mark <= 100",
    blacklist: "",
    whitelist: "",
    sourcecode:
`import java.util.Scanner;
import java.io.PrintWriter;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        try {
            int n = Integer.parseInt(sc.nextLine().trim());
            PrintWriter pw = new PrintWriter("marks.txt");
            for (int i = 0; i < n; i++) {
                String name = sc.next();
                int marks = sc.nextInt();
                pw.println(name + " " + marks);
            }
            pw.close();
            BufferedReader br = new BufferedReader(new FileReader("marks.txt"));
            long sum = 0;
            String line;
            while ((line = br.readLine()) != null) {
                String[] parts = line.split(" ");
                System.out.println(parts[0] + ": " + parts[1]);
                sum = sum + Integer.parseInt(parts[1]);
            }
            br.close();
            double avg = (double) sum / n;
            System.out.printf("Average: %.2f%n", avg);
        } catch (IOException e) {
            System.out.println("IO error");
        }
    }
}`,
  },
  {
    title: "Save Employee Snapshot",
    description:
`An HR tool snapshots one employee record to disk using object serialization: an Employee object (a Serializable class defined in the same file, also Comparable by salary) is written with ObjectOutputStream into employee.dat.

Input Format:
One line with the employee name (single word) and integer salary separated by a space.

Output Format:
After serializing, print 'Saved: name salary' from the object, then print 'File exists: true' by checking a File object for employee.dat.

Constraints:
Name is a single word of 1 to 20 letters; 1000 <= salary <= 1000000`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "java",
    topic: TOPIC,
    subtopic: "Serialization",
    sampleinput1: "Arjun 55000",
    sampleoutput1: "Saved: Arjun 55000\nFile exists: true",
    sampleinput2: "Nina 72000",
    sampleoutput2: "Saved: Nina 72000\nFile exists: true",
    input1: "Kiran 48000",
    output1: "Saved: Kiran 48000\nFile exists: true",
    input2: "Polo 12345",
    output2: "Saved: Polo 12345\nFile exists: true",
    input3: "Sam 99999",
    output3: "Saved: Sam 99999\nFile exists: true",
    inputconstrains: "name 1..20 letters; 1000 <= salary <= 1000000",
    blacklist: "",
    whitelist: "",
    sourcecode:
`import java.util.Scanner;
import java.io.Serializable;
import java.io.FileOutputStream;
import java.io.ObjectOutputStream;
import java.io.File;
import java.io.IOException;

class Employee implements Serializable, Comparable<Employee> {
    String name;
    int salary;

    Employee(String name, int salary) {
        this.name = name;
        this.salary = salary;
    }

    public int compareTo(Employee other) {
        return this.salary - other.salary;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        try {
            String name = sc.next();
            int salary = sc.nextInt();
            Employee emp = new Employee(name, salary);
            ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("employee.dat"));
            oos.writeObject(emp);
            oos.close();
            System.out.println("Saved: " + emp.name + " " + emp.salary);
            File f = new File("employee.dat");
            System.out.println("File exists: " + f.exists());
        } catch (IOException e) {
            System.out.println("IO error");
        }
    }
}`,
  },
  {
    title: "Load Employee Snapshot",
    description:
`The payroll reader saves an Employee object to employee.dat and immediately loads it back with ObjectInputStream to prove the persistence round trip works. The Employee class is Serializable and also Comparable by salary.

Input Format:
One line with the employee name (single word) and integer salary separated by a space.

Output Format:
Serialize the object, then deserialize it and print 'Loaded name: name' and 'Loaded salary: salary' using the fields of the DESERIALIZED object.

Constraints:
Name is a single word of 1 to 20 letters; 1000 <= salary <= 1000000`,
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    lang: "java",
    topic: TOPIC,
    subtopic: "Deserialization",
    sampleinput1: "Arjun 55000",
    sampleoutput1: "Loaded name: Arjun\nLoaded salary: 55000",
    sampleinput2: "Nina 72000",
    sampleoutput2: "Loaded name: Nina\nLoaded salary: 72000",
    input1: "Kiran 48000",
    output1: "Loaded name: Kiran\nLoaded salary: 48000",
    input2: "Polo 12345",
    output2: "Loaded name: Polo\nLoaded salary: 12345",
    input3: "Sam 99999",
    output3: "Loaded name: Sam\nLoaded salary: 99999",
    inputconstrains: "name 1..20 letters; 1000 <= salary <= 1000000",
    blacklist: "",
    whitelist: "",
    sourcecode:
`import java.util.Scanner;
import java.io.Serializable;
import java.io.FileOutputStream;
import java.io.FileInputStream;
import java.io.ObjectOutputStream;
import java.io.ObjectInputStream;
import java.io.IOException;

class Employee implements Serializable, Comparable<Employee> {
    String name;
    int salary;

    Employee(String name, int salary) {
        this.name = name;
        this.salary = salary;
    }

    public int compareTo(Employee other) {
        return this.salary - other.salary;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        try {
            String name = sc.next();
            int salary = sc.nextInt();
            Employee emp = new Employee(name, salary);
            ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("employee.dat"));
            oos.writeObject(emp);
            oos.close();
            ObjectInputStream ois = new ObjectInputStream(new FileInputStream("employee.dat"));
            Employee loaded = (Employee) ois.readObject();
            ois.close();
            System.out.println("Loaded name: " + loaded.name);
            System.out.println("Loaded salary: " + loaded.salary);
        } catch (IOException e) {
            System.out.println("IO error");
        } catch (ClassNotFoundException e) {
            System.out.println("Class error");
        }
    }
}`,
  },
  /* ── medium ── */
  {
    title: "CSV Score Report",
    description:
`A quiz portal exports scores as a CSV file: every student line becomes 'name,score' inside report.csv. A parser then reads the CSV back and splits each line on the comma to rebuild the report — plain String.split with a comma literal, no regex needed.

Input Format:
First line: n. Then n lines, each with a name (single word) and an integer score separated by a space.

Output Format:
Write 'name,score' lines to report.csv, then read the file back and print each line as 'name: score', and finally 'Total: t' with the sum of all scores parsed from the file.

Constraints:
1 <= n <= 50; name is a single word of 1 to 15 letters; 0 <= score <= 100`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "java",
    topic: TOPIC,
    subtopic: "File Writing",
    sampleinput1: "3\nasha 90\nbilal 85\nchen 78",
    sampleoutput1: "asha: 90\nbilal: 85\nchen: 78\nTotal: 253",
    sampleinput2: "2\ndina 100\neli 45",
    sampleoutput2: "dina: 100\neli: 45\nTotal: 145",
    input1: "1\nfay 60",
    output1: "fay: 60\nTotal: 60",
    input2: "4\ngita 55\nhari 65\niva 75\njay 85",
    output2: "gita: 55\nhari: 65\niva: 75\njay: 85\nTotal: 280",
    input3: "2\nkim 0\nlee 99",
    output3: "kim: 0\nlee: 99\nTotal: 99",
    inputconstrains: "1 <= n <= 50; name 1..15 letters; 0 <= score <= 100",
    blacklist: "Pattern, matches(",
    whitelist: "PrintWriter, split(",
    sourcecode:
`import java.util.Scanner;
import java.io.PrintWriter;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        try {
            int n = Integer.parseInt(sc.nextLine().trim());
            PrintWriter pw = new PrintWriter("report.csv");
            for (int i = 0; i < n; i++) {
                String name = sc.next();
                int score = sc.nextInt();
                pw.println(name + "," + score);
            }
            pw.close();
            BufferedReader br = new BufferedReader(new FileReader("report.csv"));
            long total = 0;
            String line;
            while ((line = br.readLine()) != null) {
                String[] parts = line.split(",");
                System.out.println(parts[0] + ": " + parts[1]);
                total = total + Integer.parseInt(parts[1]);
            }
            br.close();
            System.out.println("Total: " + total);
        } catch (IOException e) {
            System.out.println("IO error");
        }
    }
}`,
  },
  {
    title: "Two File Interleaver",
    description:
`A build tool stores two source listings in the files a.txt and b.txt, then produces a merged preview file by interleaving their lines: first line of a, first line of b, second of a, second of b, and so on; when one file is longer, its remaining lines are appended at the end of merged.txt.

Input Format:
First line: n. Then n lines for file a. Then a line with m. Then m lines for file b.

Output Format:
Write a.txt and b.txt, build merged.txt by interleaving the two files line by line, then read merged.txt back and print every line.

Constraints:
1 <= n, m <= 20 and each line has length 1 to 30`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "java",
    topic: TOPIC,
    subtopic: "File Writing",
    sampleinput1: "3\nsun\nmoon\nstar\n2\nsky\ncloud",
    sampleoutput1: "sun\nsky\nmoon\ncloud\nstar",
    sampleinput2: "2\nred\nblue\n3\ncyan\npink\nteal",
    sampleoutput2: "red\ncyan\nblue\npink\nteal",
    input1: "1\nsolo-a\n1\nsolo-b",
    output1: "solo-a\nsolo-b",
    input2: "3\none\ntwo\nthree\n1\nuno",
    output2: "one\nuno\ntwo\nthree",
    input3: "2\nleft1\nleft2\n2\nright1\nright2",
    output3: "left1\nright1\nleft2\nright2",
    inputconstrains: "1 <= n, m <= 20; each line length 1..30",
    blacklist: "java.nio.file.Files, Files.copy",
    whitelist: "PrintWriter, BufferedReader",
    sourcecode:
`import java.util.Scanner;
import java.io.PrintWriter;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        try {
            int n = Integer.parseInt(sc.nextLine().trim());
            String[] a = new String[n];
            PrintWriter pa = new PrintWriter("a.txt");
            for (int i = 0; i < n; i++) {
                a[i] = sc.nextLine().trim();
                pa.println(a[i]);
            }
            pa.close();
            int m = Integer.parseInt(sc.nextLine().trim());
            String[] b = new String[m];
            PrintWriter pb = new PrintWriter("b.txt");
            for (int i = 0; i < m; i++) {
                b[i] = sc.nextLine().trim();
                pb.println(b[i]);
            }
            pb.close();
            PrintWriter pm = new PrintWriter("merged.txt");
            int max = Math.max(n, m);
            for (int i = 0; i < max; i++) {
                if (i < n) {
                    pm.println(a[i]);
                }
                if (i < m) {
                    pm.println(b[i]);
                }
            }
            pm.close();
            BufferedReader br = new BufferedReader(new FileReader("merged.txt"));
            String line;
            while ((line = br.readLine()) != null) {
                System.out.println(line);
            }
            br.close();
        } catch (IOException e) {
            System.out.println("IO error");
        }
    }
}`,
  },
  {
    title: "Student Pair Archive",
    description:
`The exam cell archives a batch of two students as objects: a Student array (every element Serializable, and students are Comparable by roll number) is written with a single writeObject call into students.dat, and the archive is verified by checking the file on disk.

Input Format:
Two lines, each with a name (single word), an integer roll number, and an integer mark.

Output Format:
After serializing the array, print 'Saved: 2 students', then one line per student 'i: name marks' (i is 1 or 2), then 'File exists: true' by checking a File object for students.dat.

Constraints:
Name is 1 to 15 letters; 1 <= roll <= 999; 0 <= marks <= 100`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "java",
    topic: TOPIC,
    subtopic: "Serialization",
    sampleinput1: "asha 1 90\nbilal 2 85",
    sampleoutput1: "Saved: 2 students\n1: asha 90\n2: bilal 85\nFile exists: true",
    sampleinput2: "chirag 3 78\ndivya 4 92",
    sampleoutput2: "Saved: 2 students\n1: chirag 78\n2: divya 92\nFile exists: true",
    input1: "ema 5 60\nfarah 6 70",
    output1: "Saved: 2 students\n1: ema 60\n2: farah 70\nFile exists: true",
    input2: "gopal 7 55\nhena 8 66",
    output2: "Saved: 2 students\n1: gopal 55\n2: hena 66\nFile exists: true",
    input3: "ishan 9 99\njaya 10 100",
    output3: "Saved: 2 students\n1: ishan 99\n2: jaya 100\nFile exists: true",
    inputconstrains: "name 1..15 letters; 1 <= roll <= 999; 0 <= marks <= 100",
    blacklist: "XML, JSON",
    whitelist: "ObjectOutputStream, Serializable",
    sourcecode:
`import java.util.Scanner;
import java.io.Serializable;
import java.io.FileOutputStream;
import java.io.ObjectOutputStream;
import java.io.File;
import java.io.IOException;

class Student implements Serializable, Comparable<Student> {
    String name;
    int roll;
    int marks;

    Student(String name, int roll, int marks) {
        this.name = name;
        this.roll = roll;
        this.marks = marks;
    }

    public int compareTo(Student other) {
        return this.roll - other.roll;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        try {
            Student[] batch = new Student[2];
            for (int i = 0; i < 2; i++) {
                String name = sc.next();
                int roll = sc.nextInt();
                int marks = sc.nextInt();
                batch[i] = new Student(name, roll, marks);
            }
            ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("students.dat"));
            oos.writeObject(batch);
            oos.close();
            System.out.println("Saved: 2 students");
            for (int i = 0; i < 2; i++) {
                System.out.println((i + 1) + ": " + batch[i].name + " " + batch[i].marks);
            }
            File f = new File("students.dat");
            System.out.println("File exists: " + f.exists());
        } catch (IOException e) {
            System.out.println("IO error");
        }
    }
}`,
  },
  {
    title: "Ledger Deserialize And Total",
    description:
`A payment service journals transactions as objects: an ArrayList of Serializable Transaction records (Comparable by id) is saved to ledger.dat with one writeObject call, then loaded back from disk to audit the day.

Input Format:
First line: n. Then n lines, each with an integer id and an integer amount (may be negative).

Output Format:
Serialize the list to ledger.dat, deserialize it back, then print one line per transaction 'Txn id: amount' followed by 'Total: t' with the sum of all amounts read from the deserialized list.

Constraints:
1 <= n <= 50; 1 <= id <= 1000; -10000 <= amount <= 10000`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "java",
    topic: TOPIC,
    subtopic: "Deserialization",
    sampleinput1: "3\n1 100\n2 250\n3 -40",
    sampleoutput1: "Txn 1: 100\nTxn 2: 250\nTxn 3: -40\nTotal: 310",
    sampleinput2: "2\n10 500\n20 -125",
    sampleoutput2: "Txn 10: 500\nTxn 20: -125\nTotal: 375",
    input1: "1\n7 999",
    output1: "Txn 7: 999\nTotal: 999",
    input2: "4\n1 10\n2 20\n3 30\n4 40",
    output2: "Txn 1: 10\nTxn 2: 20\nTxn 3: 30\nTxn 4: 40\nTotal: 100",
    input3: "2\n5 -60\n6 -40",
    output3: "Txn 5: -60\nTxn 6: -40\nTotal: -100",
    inputconstrains: "1 <= n <= 50; 1 <= id <= 1000; -10000 <= amount <= 10000",
    blacklist: "LinkedList, Vector",
    whitelist: "ObjectInputStream, ArrayList",
    sourcecode:
`import java.util.Scanner;
import java.util.ArrayList;
import java.io.Serializable;
import java.io.FileOutputStream;
import java.io.FileInputStream;
import java.io.ObjectOutputStream;
import java.io.ObjectInputStream;
import java.io.IOException;

class Transaction implements Serializable, Comparable<Transaction> {
    int id;
    int amount;

    Transaction(int id, int amount) {
        this.id = id;
        this.amount = amount;
    }

    public int compareTo(Transaction other) {
        return this.id - other.id;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        try {
            int n = Integer.parseInt(sc.nextLine().trim());
            ArrayList<Transaction> ledger = new ArrayList<Transaction>();
            for (int i = 0; i < n; i++) {
                int id = sc.nextInt();
                int amount = sc.nextInt();
                ledger.add(new Transaction(id, amount));
            }
            ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("ledger.dat"));
            oos.writeObject(ledger);
            oos.close();
            ObjectInputStream ois = new ObjectInputStream(new FileInputStream("ledger.dat"));
            ArrayList<Transaction> loaded = (ArrayList<Transaction>) ois.readObject();
            ois.close();
            long total = 0;
            for (Transaction t : loaded) {
                System.out.println("Txn " + t.id + ": " + t.amount);
                total = total + t.amount;
            }
            System.out.println("Total: " + total);
        } catch (IOException e) {
            System.out.println("IO error");
        } catch (ClassNotFoundException e) {
            System.out.println("Class error");
        }
    }
}`,
  },
  {
    title: "Settings Reload And Update",
    description:
`An installer persists app settings as an object in settings.dat (the Settings class is Serializable and Comparable by version). After loading the stored Settings object, the user picks a new theme; the tool saves the updated object over the same file and reloads it once more to confirm the change stuck.

Input Format:
One line with four tokens: appName, version (integer), current theme, new theme.

Output Format:
Save, load, and print 'App: appName version' and 'Theme: current theme' from the loaded object. Then set the new theme, save again over settings.dat, load again, and print 'Reloaded: new theme' from the reloaded object.

Constraints:
All names are single words of 1 to 15 letters; 1 <= version <= 1000`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "java",
    topic: TOPIC,
    subtopic: "Deserialization",
    sampleinput1: "notepad 3 dark light",
    sampleoutput1: "App: notepad 3\nTheme: dark\nReloaded: light",
    sampleinput2: "calc 12 blue green",
    sampleoutput2: "App: calc 12\nTheme: blue\nReloaded: green",
    input1: "paint 1 red blue",
    output1: "App: paint 1\nTheme: red\nReloaded: blue",
    input2: "shell 9 nano micro",
    output2: "App: shell 9\nTheme: nano\nReloaded: micro",
    input3: "editor 42 day night",
    output3: "App: editor 42\nTheme: day\nReloaded: night",
    inputconstrains: "names 1..15 letters; 1 <= version <= 1000",
    blacklist: "XML, clone(",
    whitelist: "ObjectInputStream, readObject",
    sourcecode:
`import java.util.Scanner;
import java.io.Serializable;
import java.io.FileOutputStream;
import java.io.FileInputStream;
import java.io.ObjectOutputStream;
import java.io.ObjectInputStream;
import java.io.IOException;

class Settings implements Serializable, Comparable<Settings> {
    String appName;
    int version;
    String theme;

    Settings(String appName, int version, String theme) {
        this.appName = appName;
        this.version = version;
        this.theme = theme;
    }

    public int compareTo(Settings other) {
        return this.version - other.version;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        try {
            String appName = sc.next();
            int version = sc.nextInt();
            String theme = sc.next();
            String newTheme = sc.next();
            ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("settings.dat"));
            oos.writeObject(new Settings(appName, version, theme));
            oos.close();
            ObjectInputStream ois = new ObjectInputStream(new FileInputStream("settings.dat"));
            Settings loaded = (Settings) ois.readObject();
            ois.close();
            System.out.println("App: " + loaded.appName + " " + loaded.version);
            System.out.println("Theme: " + loaded.theme);
            loaded.theme = newTheme;
            ObjectOutputStream oos2 = new ObjectOutputStream(new FileOutputStream("settings.dat"));
            oos2.writeObject(loaded);
            oos2.close();
            ObjectInputStream ois2 = new ObjectInputStream(new FileInputStream("settings.dat"));
            Settings reloaded = (Settings) ois2.readObject();
            ois2.close();
            System.out.println("Reloaded: " + reloaded.theme);
        } catch (IOException e) {
            System.out.println("IO error");
        } catch (ClassNotFoundException e) {
            System.out.println("Class error");
        }
    }
}`,
  },
  {
    title: "Product Catalog Export",
    description:
`A shopkeeper backs up the day's catalog: an ArrayList of Serializable Product records (id, name, price, Comparable by id) is exported to catalog.dat with one writeObject call, and the export is verified by checking the file on disk.

Input Format:
First line: n. Then n lines, each with an integer id, a name (single word), and an integer price.

Output Format:
After serializing the list, print one line per product 'id name price', then 'Items: n', then 'Export ready: true' when catalog.dat exists and is not empty.

Constraints:
1 <= n <= 50; 1 <= id <= 9999; name is 1 to 15 letters; 1 <= price <= 100000`,
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    lang: "java",
    topic: TOPIC,
    subtopic: "Serialization",
    sampleinput1: "3\n10 pen 20\n11 book 150\n12 bag 400",
    sampleoutput1: "10 pen 20\n11 book 150\n12 bag 400\nItems: 3\nExport ready: true",
    sampleinput2: "2\n5 cup 90\n6 plate 120",
    sampleoutput2: "5 cup 90\n6 plate 120\nItems: 2\nExport ready: true",
    input1: "1\n7 mug 45",
    output1: "7 mug 45\nItems: 1\nExport ready: true",
    input2: "3\n1 key 10\n2 lock 60\n3 bell 30",
    output2: "1 key 10\n2 lock 60\n3 bell 30\nItems: 3\nExport ready: true",
    input3: "2\n9 lamp 300\n8 bulb 80",
    output3: "9 lamp 300\n8 bulb 80\nItems: 2\nExport ready: true",
    inputconstrains: "1 <= n <= 50; 1 <= id <= 9999; name 1..15 letters; 1 <= price <= 100000",
    blacklist: "LinkedList, XML",
    whitelist: "ObjectOutputStream, ArrayList",
    sourcecode:
`import java.util.Scanner;
import java.util.ArrayList;
import java.io.Serializable;
import java.io.FileOutputStream;
import java.io.ObjectOutputStream;
import java.io.File;
import java.io.IOException;

class Product implements Serializable, Comparable<Product> {
    int id;
    String name;
    int price;

    Product(int id, String name, int price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    public int compareTo(Product other) {
        return this.id - other.id;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        try {
            int n = Integer.parseInt(sc.nextLine().trim());
            ArrayList<Product> catalog = new ArrayList<Product>();
            for (int i = 0; i < n; i++) {
                int id = sc.nextInt();
                String name = sc.next();
                int price = sc.nextInt();
                catalog.add(new Product(id, name, price));
            }
            ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("catalog.dat"));
            oos.writeObject(catalog);
            oos.close();
            for (Product p : catalog) {
                System.out.println(p.id + " " + p.name + " " + p.price);
            }
            System.out.println("Items: " + catalog.size());
            File f = new File("catalog.dat");
            boolean ready = f.exists() && f.length() > 0;
            System.out.println("Export ready: " + ready);
        } catch (IOException e) {
            System.out.println("IO error");
        }
    }
}`,
  },
  /* ── hard ── */
  {
    title: "Inventory Deltas After Reload",
    description:
`A warehouse syncs stock with a central server through a serialized snapshot: the ArrayList of Product records (id, name, qty) is written to inventory.dat, then loaded back from disk, and the stock deltas received afterwards are applied to the LOADED objects before the corrected inventory is printed sorted by id.

Input Format:
First line: n. Then n lines, each with an integer id, a name (single word), and an integer qty. Then a line with d. Then d lines, each with an id and an integer delta (ids refer to stored products; a delta may be negative).

Output Format:
Serialize the list, deserialize it from inventory.dat, apply every delta to the matching product of the deserialized list, sort the products by id ascending, and print one line per product 'id name qty'.

Constraints:
1 <= n <= 50; 1 <= d <= 50; ids are unique in 1..1000; 0 <= qty <= 100000; -100000 <= delta <= 100000 and every final qty stays >= 0`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "java",
    topic: TOPIC,
    subtopic: "Deserialization",
    sampleinput1: "3\n10 pen 50\n5 book 20\n12 bag 7\n2\n10 -5\n5 15",
    sampleoutput1: "5 book 35\n10 pen 45\n12 bag 7",
    sampleinput2: "2\n3 lamp 100\n1 bulb 50\n1\n3 -100",
    sampleoutput2: "1 bulb 50\n3 lamp 0",
    input1: "2\n9 chair 5\n2 desk 8\n2\n9 5\n2 2",
    output1: "2 desk 10\n9 chair 10",
    input2: "3\n4 toy 10\n2 kite 20\n9 drum 30\n3\n4 5\n2 5\n9 -10",
    output2: "2 kite 25\n4 toy 15\n9 drum 20",
    input3: "1\n1 box 0\n1\n1 42",
    output3: "1 box 42",
    inputconstrains: "1 <= n, d <= 50; unique ids 1..1000; final qty >= 0",
    blacklist: "Comparator, TreeMap",
    whitelist: "ObjectInputStream, Comparable",
    sourcecode:
`import java.util.Scanner;
import java.util.ArrayList;
import java.util.Collections;
import java.io.Serializable;
import java.io.FileOutputStream;
import java.io.FileInputStream;
import java.io.ObjectOutputStream;
import java.io.ObjectInputStream;
import java.io.IOException;

class Product implements Serializable, Comparable<Product> {
    int id;
    String name;
    int qty;

    Product(int id, String name, int qty) {
        this.id = id;
        this.name = name;
        this.qty = qty;
    }

    public int compareTo(Product other) {
        return this.id - other.id;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        try {
            int n = Integer.parseInt(sc.nextLine().trim());
            ArrayList<Product> stock = new ArrayList<Product>();
            for (int i = 0; i < n; i++) {
                int id = sc.nextInt();
                String name = sc.next();
                int qty = sc.nextInt();
                stock.add(new Product(id, name, qty));
            }
            ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("inventory.dat"));
            oos.writeObject(stock);
            oos.close();
            ObjectInputStream ois = new ObjectInputStream(new FileInputStream("inventory.dat"));
            ArrayList<Product> loaded = (ArrayList<Product>) ois.readObject();
            ois.close();
            int d = sc.nextInt();
            for (int i = 0; i < d; i++) {
                int id = sc.nextInt();
                int delta = sc.nextInt();
                for (Product p : loaded) {
                    if (p.id == id) {
                        p.qty = p.qty + delta;
                    }
                }
            }
            Collections.sort(loaded);
            for (Product p : loaded) {
                System.out.println(p.id + " " + p.name + " " + p.qty);
            }
        } catch (IOException e) {
            System.out.println("IO error");
        } catch (ClassNotFoundException e) {
            System.out.println("Class error");
        }
    }
}`,
  },
  {
    title: "Transient Session Reset",
    description:
`A login service caches user sessions, but security policy forbids persisting tokens: the sessionToken field of User is declared transient, so the serialization engine skips it. After the user list (Serializable, Comparable by name) is saved to users.dat and loaded back, every session token has reverted to its default value (null).

Input Format:
First line: n. Then n lines, each with a name (single word), a role (single word), and a session token (single word).

Output Format:
Serialize the list to users.dat, deserialize it back, and for each user print 'name role' on one line and 'Session: token' on the next — the deserialized token is always null because the field is transient. Finally print 'Count: n'.

Constraints:
1 <= n <= 20 and every word has 1 to 15 letters`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "java",
    topic: TOPIC,
    subtopic: "Deserialization",
    sampleinput1: "2\nasha admin tokA\nraju staff tokB",
    sampleoutput1: "asha admin\nSession: null\nraju staff\nSession: null\nCount: 2",
    sampleinput2: "1\nbela ceo keyX",
    sampleoutput2: "bela ceo\nSession: null\nCount: 1",
    input1: "3\none a t1\ntwo b t2\nthree c t3",
    output1: "one a\nSession: null\ntwo b\nSession: null\nthree c\nSession: null\nCount: 3",
    input2: "1\nsolo dev toksolo",
    output2: "solo dev\nSession: null\nCount: 1",
    input3: "2\nkim qa tK\nlee ux tL",
    output3: "kim qa\nSession: null\nlee ux\nSession: null\nCount: 2",
    inputconstrains: "1 <= n <= 20; every word 1..15 letters",
    blacklist: "Externalizable",
    whitelist: "transient, ObjectInputStream",
    sourcecode:
`import java.util.Scanner;
import java.util.ArrayList;
import java.io.Serializable;
import java.io.FileOutputStream;
import java.io.FileInputStream;
import java.io.ObjectOutputStream;
import java.io.ObjectInputStream;
import java.io.IOException;

class User implements Serializable, Comparable<User> {
    String name;
    String role;
    transient String sessionToken;

    User(String name, String role, String sessionToken) {
        this.name = name;
        this.role = role;
        this.sessionToken = sessionToken;
    }

    public int compareTo(User other) {
        return this.name.compareTo(other.name);
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        try {
            int n = Integer.parseInt(sc.nextLine().trim());
            ArrayList<User> users = new ArrayList<User>();
            for (int i = 0; i < n; i++) {
                String name = sc.next();
                String role = sc.next();
                String token = sc.next();
                users.add(new User(name, role, token));
            }
            ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("users.dat"));
            oos.writeObject(users);
            oos.close();
            ObjectInputStream ois = new ObjectInputStream(new FileInputStream("users.dat"));
            ArrayList<User> loaded = (ArrayList<User>) ois.readObject();
            ois.close();
            for (User u : loaded) {
                System.out.println(u.name + " " + u.role);
                System.out.println("Session: " + u.sessionToken);
            }
            System.out.println("Count: " + loaded.size());
        } catch (IOException e) {
            System.out.println("IO error");
        } catch (ClassNotFoundException e) {
            System.out.println("Class error");
        }
    }
}`,
  },
  {
    title: "Library Object Graph Backup",
    description:
`A library system backs up its whole catalog as one object graph: a Library object holds the library name and a Book array, both classes are Serializable and Comparable (books by title, libraries by name), and one writeObject call stores the entire graph (library plus its books) inside library.dat.

Input Format:
First line: library name (single word). Second line: n. Then n lines, each with a book title (single word) and an author (single word).

Output Format:
After serializing the Library, print 'Library: name', 'Books: n', one line per book 'title author', and finally 'Backup ready: true' when library.dat exists and is not empty.

Constraints:
Library name is 1 to 15 letters; 1 <= n <= 30; every word has 1 to 20 letters`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "java",
    topic: TOPIC,
    subtopic: "Serialization",
    sampleinput1: "central\n3\njava101 rao\noopsguide sharma\nthreadsx iyer",
    sampleoutput1: "Library: central\nBooks: 3\njava101 rao\noopsguide sharma\nthreadsx iyer\nBackup ready: true",
    sampleinput2: "west\n2\nalgo30 nair\nwebsys pillai",
    sampleoutput2: "Library: west\nBooks: 2\nalgo30 nair\nwebsys pillai\nBackup ready: true",
    input1: "east\n1\nmath01 singh",
    output1: "Library: east\nBooks: 1\nmath01 singh\nBackup ready: true",
    input2: "north\n4\nb1 a1\nb2 a2\nb3 a3\nb4 a4",
    output2: "Library: north\nBooks: 4\nb1 a1\nb2 a2\nb3 a3\nb4 a4\nBackup ready: true",
    input3: "tiny\n2\nx y\nz w",
    output3: "Library: tiny\nBooks: 2\nx y\nz w\nBackup ready: true",
    inputconstrains: "library name 1..15 letters; 1 <= n <= 30; words 1..20 letters",
    blacklist: "XML, JSON",
    whitelist: "ObjectOutputStream, Serializable",
    sourcecode:
`import java.util.Scanner;
import java.io.Serializable;
import java.io.FileOutputStream;
import java.io.ObjectOutputStream;
import java.io.File;
import java.io.IOException;

class Book implements Serializable, Comparable<Book> {
    String title;
    String author;

    Book(String title, String author) {
        this.title = title;
        this.author = author;
    }

    public int compareTo(Book other) {
        return this.title.compareTo(other.title);
    }
}

class Library implements Serializable, Comparable<Library> {
    String name;
    Book[] books;

    Library(String name, Book[] books) {
        this.name = name;
        this.books = books;
    }

    public int compareTo(Library other) {
        return this.name.compareTo(other.name);
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        try {
            String libName = sc.next();
            int n = sc.nextInt();
            Book[] books = new Book[n];
            for (int i = 0; i < n; i++) {
                String title = sc.next();
                String author = sc.next();
                books[i] = new Book(title, author);
            }
            Library lib = new Library(libName, books);
            ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("library.dat"));
            oos.writeObject(lib);
            oos.close();
            System.out.println("Library: " + lib.name);
            System.out.println("Books: " + lib.books.length);
            for (Book b : lib.books) {
                System.out.println(b.title + " " + b.author);
            }
            File f = new File("library.dat");
            boolean ok = f.exists() && f.length() > 0;
            System.out.println("Backup ready: " + ok);
        } catch (IOException e) {
            System.out.println("IO error");
        }
    }
}`,
  },
  {
    title: "Quiz Bank Grows On Disk",
    description:
`A quiz engine grows its bank on disk in two phases: first the Quiz object (holding a Question array) is serialized to quiz.dat, then a new question arrives and the enlarged quiz is serialized over the same file. Both classes are Serializable and Comparable (questions by qid, quizzes by size), and loading the file back must show the grown bank, proving the second save replaced the first.

Input Format:
First line: m. Then m lines, each with an integer qid, a question text (single word), and integer marks. Then one more line with the new question in the same 'qid text marks' form.

Output Format:
Serialize the m-question quiz, add the new question, serialize again over quiz.dat, then deserialize the file and print every stored question as 'qid text marks', followed by 'Saved: true' when the file holds exactly m + 1 questions.

Constraints:
1 <= m <= 19; qid values 1..999 and the new qid is unique; text is 1 to 20 letters; 1 <= marks <= 100`,
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    lang: "java",
    topic: TOPIC,
    subtopic: "Serialization",
    sampleinput1: "2\n1 JVMbasics 5\n2 OOPSkinds 5\n3 OverridingDemo 8",
    sampleoutput1: "1 JVMbasics 5\n2 OOPSkinds 5\n3 OverridingDemo 8\nSaved: true",
    sampleinput2: "1\n10 Loops 3\n20 Collections 4",
    sampleoutput2: "10 Loops 3\n20 Collections 4\nSaved: true",
    input1: "1\n5 Basics 2\n6 Advanced 9",
    output1: "5 Basics 2\n6 Advanced 9\nSaved: true",
    input2: "2\n1 a 1\n2 b 2\n3 c 3",
    output2: "1 a 1\n2 b 2\n3 c 3\nSaved: true",
    input3: "3\n7 q7 7\n8 q8 8\n9 q9 9\n11 q11 11",
    output3: "7 q7 7\n8 q8 8\n9 q9 9\n11 q11 11\nSaved: true",
    inputconstrains: "1 <= m <= 19; unique qids 1..999; text 1..20 letters; 1 <= marks <= 100",
    blacklist: "XML, JSON",
    whitelist: "ObjectOutputStream, ObjectInputStream",
    sourcecode:
`import java.util.Scanner;
import java.io.Serializable;
import java.io.FileOutputStream;
import java.io.FileInputStream;
import java.io.ObjectOutputStream;
import java.io.ObjectInputStream;
import java.io.IOException;

class Question implements Serializable, Comparable<Question> {
    int qid;
    String text;
    int marks;

    Question(int qid, String text, int marks) {
        this.qid = qid;
        this.text = text;
        this.marks = marks;
    }

    public int compareTo(Question other) {
        return this.qid - other.qid;
    }
}

class Quiz implements Serializable, Comparable<Quiz> {
    Question[] items;

    Quiz(Question[] items) {
        this.items = items;
    }

    public int compareTo(Quiz other) {
        return this.items.length - other.items.length;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        try {
            int m = Integer.parseInt(sc.nextLine().trim());
            Question[] first = new Question[m];
            for (int i = 0; i < m; i++) {
                int qid = sc.nextInt();
                String text = sc.next();
                int marks = sc.nextInt();
                first[i] = new Question(qid, text, marks);
            }
            Quiz quiz = new Quiz(first);
            ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("quiz.dat"));
            oos.writeObject(quiz);
            oos.close();
            int qid = sc.nextInt();
            String text = sc.next();
            int marks = sc.nextInt();
            Question[] grown = new Question[m + 1];
            for (int i = 0; i < m; i++) {
                grown[i] = first[i];
            }
            grown[m] = new Question(qid, text, marks);
            Quiz updated = new Quiz(grown);
            ObjectOutputStream oos2 = new ObjectOutputStream(new FileOutputStream("quiz.dat"));
            oos2.writeObject(updated);
            oos2.close();
            ObjectInputStream ois = new ObjectInputStream(new FileInputStream("quiz.dat"));
            Quiz loaded = (Quiz) ois.readObject();
            ois.close();
            for (Question q : loaded.items) {
                System.out.println(q.qid + " " + q.text + " " + q.marks);
            }
            System.out.println("Saved: " + (loaded.items.length == m + 1));
        } catch (IOException e) {
            System.out.println("IO error");
        } catch (ClassNotFoundException e) {
            System.out.println("Class error");
        }
    }
}`,
  },
];

/* ─────────────────────────── MCQ QUESTIONS ─────────────────────────── */

const mcqQuestions = [
  {
    title: "BufferedReader Role",
    description:
"Java offers several I/O classes for reading text files. Which class wraps around a FileReader to add internal buffering and provides the readLine() method that returns one full line at a time?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "File Reading",
    Option1: "BufferedWriter",
    Option2: "BufferedReader",
    Option3: "ObjectInputStream",
    Option4: "StringReader",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "FileWriter Append Flag",
    description:
"A program opens an existing file and writes to it. The file data.txt already contains exactly the text 'old data'. Study the snippet and decide what data.txt contains after it runs.",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "File Writing",
    Option1: "old dataentry one (the new text is appended after the old text)",
    Option2: "entry one (the old content is erased)",
    Option3: "old data (the new text is discarded)",
    Option4: "entry oneold data (new text is written before the old text)",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet:
`FileWriter fw = new FileWriter("data.txt", true);
fw.write("entry one");
fw.close();`,
    snippetLang: "java",
  },
  {
    title: "readLine At End Of File",
    description:
"A student loops over a text file with BufferedReader as shown. What makes this loop terminate correctly when the file runs out of lines?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "File Reading",
    Option1: "readLine() returns an empty string at end of file",
    Option2: "readLine() throws IOException at end of file",
    Option3: "readLine() returns null at end of file, so the loop condition fails",
    Option4: "readLine() returns the word EOF at end of file",
    CorrectOption: 3,
    iscodesnippet: true,
    codesnippet:
`BufferedReader br = new BufferedReader(new FileReader("a.txt"));
String line;
while ((line = br.readLine()) != null) {
    System.out.println(line);
}
br.close();`,
    snippetLang: "java",
  },
  {
    title: "Checked IOException Rule",
    description:
"java.io.IOException is a checked exception. What does the Java compiler require from code that calls file methods which can throw it?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "File Reading",
    Option1: "The call must sit in a try block with a matching catch, or the enclosing method must declare it with throws",
    Option2: "Nothing special, because IOException is unchecked",
    Option3: "The class must extend IOException to handle it",
    Option4: "The call is allowed only inside constructors",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Serializable Marker Interface",
    description:
"java.io.Serializable is usually called a marker interface. What does that mean?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Serialization",
    Option1: "It is an abstract class with one abstract method to override",
    Option2: "It declares no methods; it only marks a class as eligible for object serialization",
    Option3: "It provides a default writeObject implementation",
    Option4: "It automatically encrypts every field of the class",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "PrintWriter Close Discipline",
    description:
"A PrintWriter collects characters in an internal buffer before they reach the disk. A program writes ten lines with println but exits without calling close() or flush(). What is the most likely result?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "File Writing",
    Option1: "The JVM crashes with an IOException on exit",
    Option2: "The file grows to twice its expected size",
    Option3: "Java flushes the buffer automatically after every println, so the file is complete",
    Option4: "Some or all buffered lines may never reach the file, leaving it empty or incomplete",
    CorrectOption: 4,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "File delete Return Value",
    description:
"The File class models a file path and offers file operations. What does f.delete() return when called on a File object?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "File Reading",
    Option1: "A boolean that is true when the file was successfully deleted",
    Option2: "Nothing; it throws an exception when deletion fails",
    Option3: "The name of the deleted file as a String",
    Option4: "An int with the number of bytes freed",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Truncating Write Constructor",
    description:
"A program must replace the entire content of data.txt with new text. Which constructor opens the file for writing and discards any previous content?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "File Writing",
    Option1: "new FileWriter(\"data.txt\", true)",
    Option2: "new FileWriter(\"data.txt\")",
    Option3: "new FileReader(\"data.txt\")",
    Option4: "new File(\"data.txt\")",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "ObjectInputStream Read Type",
    description:
"After saving an object with ObjectOutputStream.writeObject, a program reads it back with ObjectInputStream.readObject. What does readObject return, and what must the calling code do?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Deserialization",
    Option1: "It returns the exact original class, so no cast is needed",
    Option2: "It returns a String description of the object",
    Option3: "It returns Object, so the code must cast it back to the original class",
    Option4: "It returns void and fills a field of the stream",
    CorrectOption: 3,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Which Fields Are Skipped",
    description:
"A class implements java.io.Serializable and one of its objects is written with ObjectOutputStream. Which kind of field is NOT stored in the file?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Serialization",
    Option1: "An array of Serializable objects",
    Option2: "A private String field",
    Option3: "A final int field",
    Option4: "A field marked transient",
    CorrectOption: 4,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  /* ── medium ── */
  {
    title: "serialVersionUID Purpose",
    description:
"Every Serializable class can declare a private static final long serialVersionUID. What role does this number play when an object is deserialized?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Deserialization",
    Option1: "It decides how many objects one stream may hold",
    Option2: "It stamps the class version; when the stored value differs from the class value, deserialization throws InvalidClassException",
    Option3: "It encrypts the serialized bytes for security",
    Option4: "It chooses the default file name for ObjectOutputStream",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  {
    title: "Transient And Static Round Trip",
    description:
"The class in the snippet is serialized and later deserialized. The saved object had name 'app' and secret 'xyz'. Just before deserializing, the program sets Config.mode = 'night'. What are the field values of the deserialized object? Recall that transient instance fields and static fields are never written by the serialization engine.",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Serialization",
    Option1: "name is app, secret is null, mode is night",
    Option2: "name is app, secret is xyz, mode is day",
    Option3: "name is app, secret is null, mode is day",
    Option4: "name is app, secret is xyz, mode is night",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet:
`class Config implements Serializable {
    String name;
    transient String secret;
    static String mode = "day";
}`,
    snippetLang: "java",
  },
  {
    title: "Catch Superclass Catches Subclass",
    description:
"The file missing.txt does not exist, and the FileReader constructor throws FileNotFoundException when it cannot open a file. FileNotFoundException is a subclass of IOException. What does the program print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "File Reading",
    Option1: "opened",
    Option2: "IO problem",
    Option3: "The program crashes with an uncaught FileNotFoundException",
    Option4: "It does not compile because FileNotFoundException must be caught before IOException",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet:
`try {
    FileReader fr = new FileReader("missing.txt");
    System.out.println("opened");
} catch (IOException e) {
    System.out.println("IO problem");
}`,
    snippetLang: "java",
  },
  {
    title: "println Versus write",
    description:
"Predict the exact content of out.txt after the snippet runs. println writes its text followed by a line separator, while write writes characters only.",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "File Writing",
    Option1: "Two lines: sun, then moon",
    Option2: "A single line sunmoon with no line separator at the end",
    Option3: "A single line containing sunmoon followed by a line separator",
    Option4: "Only moon, because write is replaced by println",
    CorrectOption: 3,
    iscodesnippet: true,
    codesnippet:
`PrintWriter pw = new PrintWriter("out.txt");
pw.write("sun");
pw.println("moon");
pw.close();`,
    snippetLang: "java",
  },
  {
    title: "writeObject Requirement",
    description:
"A developer runs the snippet with a plain class Student that has a String field and an int field, and implements no interfaces. What happens?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Serialization",
    Option1: "Compilation fails because writeObject accepts only Serializable references",
    Option2: "The object is written, but only primitive fields are stored",
    Option3: "A FileNotFoundException is thrown because stu.dat does not exist",
    Option4: "NotSerializableException is thrown at runtime because Student does not implement Serializable",
    CorrectOption: 4,
    iscodesnippet: true,
    codesnippet:
`ObjectOutputStream oos =
    new ObjectOutputStream(new FileOutputStream("stu.dat"));
oos.writeObject(new Student("raja", 88));
oos.close();`,
    snippetLang: "java",
  },
  {
    title: "FileReader Versus FileInputStream",
    description:
"Which statement correctly distinguishes FileReader from FileInputStream?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "File Reading",
    Option1: "FileReader reads characters using a character encoding, while FileInputStream reads raw bytes",
    Option2: "FileReader is always buffered, while FileInputStream is never buffered",
    Option3: "FileInputStream reads text lines, while FileReader reads binary objects",
    Option4: "Both are abstract classes that cannot be instantiated directly",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
  /* ── hard ── */
  {
    title: "Version Mismatch On Load",
    description:
"A License object was serialized to disk last month, when the class declared serialVersionUID = 1L. The class was later edited and now declares serialVersionUID = 2L, as shown. A program now reads the old file with ObjectInputStream.readObject. What happens?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Deserialization",
    Option1: "It succeeds and the key field is restored; versions are ignored",
    Option2: "Deserialization fails with an InvalidClassException because the stored version 1L differs from the class version 2L",
    Option3: "It fails with NotSerializableException",
    Option4: "It succeeds but the key field comes back null",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet:
`class License implements Serializable {
    private static final long serialVersionUID = 2L;
    String key;
}`,
    snippetLang: "java",
  },
  {
    title: "Object Stream Order",
    description:
"Two objects are written into one object stream and then read back as shown. What are the values of a and b after the two reads?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Deserialization",
    Option1: "a is 42 and b is first, in reverse write order",
    Option2: "a is first and b is null because only one object fits per stream",
    Option3: "The second readObject call throws EOFException",
    Option4: "a is the String first and b is the Integer 42, in the same order they were written",
    CorrectOption: 4,
    iscodesnippet: true,
    codesnippet:
`ObjectOutputStream oos =
    new ObjectOutputStream(new FileOutputStream("pair.dat"));
oos.writeObject("first");
oos.writeObject(Integer.valueOf(42));
oos.close();
ObjectInputStream ois =
    new ObjectInputStream(new FileInputStream("pair.dat"));
Object a = ois.readObject();
Object b = ois.readObject();
ois.close();`,
    snippetLang: "java",
  },
  {
    title: "Append Then Truncate Log",
    description:
"A logging utility runs the two writes shown, in the same program, one after another. What does log.txt contain after the program finishes? Recall that PrintWriter(String) recreates the file from scratch while FileWriter(file, true) opens the file in append mode.",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "File Writing",
    Option1: "Two lines: one, then two",
    Option2: "A single line: one",
    Option3: "A single line: two, because the second PrintWriter recreated the file from scratch",
    Option4: "A single line: onetwo",
    CorrectOption: 3,
    iscodesnippet: true,
    codesnippet:
`PrintWriter pw = new PrintWriter(new FileWriter("log.txt", true));
pw.println("one");
pw.close();
pw = new PrintWriter("log.txt");
pw.println("two");
pw.close();`,
    snippetLang: "java",
  },
  {
    title: "Deserialization Skips Constructor",
    description:
"A Serializable class Point has a constructor that sets its field tag to 'fresh'. An object whose tag is 'stored' was serialized earlier. Which statement is TRUE when that object is loaded back with readObject?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Deserialization",
    Option1: "The constructor runs again, so tag becomes fresh",
    Option2: "The constructor is NOT invoked; the tag field is restored from the stream as stored",
    Option3: "The constructor runs only when serialVersionUID is declared",
    Option4: "Deserialization fails because every class needs its constructor",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  },
];

/* ── write part files ── */
const dir = new URL(".", import.meta.url).pathname;

const codeP1 = { day: 20, topics: [{ name: TOPIC, subtopics: SUBS }], questions: codeQuestions.slice(0, 10) };
const codeP2 = { questions: codeQuestions.slice(10) };
const mcqP1 = { day: 20, questions: mcqQuestions.slice(0, 10) };
const mcqP2 = { questions: mcqQuestions.slice(10) };

fs.writeFileSync(dir + "day-20.code.p1.json", JSON.stringify(codeP1, null, 2) + "\n");
fs.writeFileSync(dir + "day-20.code.p2.json", JSON.stringify(codeP2, null, 2) + "\n");
fs.writeFileSync(dir + "day-20.mcq.p1.json", JSON.stringify(mcqP1, null, 2) + "\n");
fs.writeFileSync(dir + "day-20.mcq.p2.json", JSON.stringify(mcqP2, null, 2) + "\n");

const subCounts = {};
for (const q of codeQuestions) subCounts[q.subtopic] = (subCounts[q.subtopic] || 0) + 1;
const diffCounts = {};
for (const q of codeQuestions) diffCounts[q.difficulty] = (diffCounts[q.difficulty] || 0) + 1;
const basicCount = codeQuestions.filter((q) => q.difficulty === "easy" && q.variant === "basic").length;
console.log("code questions:", codeQuestions.length, "difficulty:", JSON.stringify(diffCounts), "easy basic:", basicCount, "subtopics:", JSON.stringify(subCounts));
const mcqDiff = {};
for (const q of mcqQuestions) mcqDiff[q.difficulty] = (mcqDiff[q.difficulty] || 0) + 1;
const snippets = mcqQuestions.filter((q) => q.iscodesnippet).length;
console.log("mcq questions:", mcqQuestions.length, "difficulty:", JSON.stringify(mcqDiff), "snippets:", snippets);
