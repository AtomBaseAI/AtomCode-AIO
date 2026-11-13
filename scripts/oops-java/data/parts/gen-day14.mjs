/**
 * Day 14 generator — "OOPS using JAVA" — Polymorphism
 * Writes the 4 part files consumed by merge-parts.ts:
 *   day-14.code.p1.json (day + topics + first 10 code)
 *   day-14.code.p2.json (last 10 code)
 *   day-14.mcq.p1.json  (day + first 10 mcq)
 *   day-14.mcq.p2.json  (last 10 mcq)
 */
import fs from "node:fs";
import path from "node:path";

const DIR = "/home/z/my-project/scripts/oops-java/data/parts";
fs.mkdirSync(DIR, { recursive: true });

const TOPIC = "Polymorphism";
const SUBTOPICS = [
  "Method Overloading",
  "Method Overriding",
  "Dynamic Method Dispatch",
  "Overriding with super",
  "Covariant Returns",
];

const desc = (body, input, output, constraints) =>
  body + "\n\nInput Format:\n" + input + "\n\nOutput Format:\n" + output + "\n\nConstraints:\n" + constraints;

/* The Lambda judge compiles only when `public class Main` is the FIRST class
 * in the file; helper classes must come after it. Sources are authored with
 * helper classes first for readability, so reorder at build time. */
function mainFirst(src) {
  const mIdx = src.indexOf("public class Main");
  if (mIdx < 0) throw new Error("missing public class Main");
  const head = src.slice(0, mIdx); // imports + helper classes
  const tail = src.slice(mIdx); // public class Main ... EOF
  // find the START of the first helper declaration line (modifiers may precede "class")
  const re = /(^|\n)((abstract|final|public|static)\s+)*class\s/;
  const m = re.exec(head);
  if (!m) return head + tail; // no helper classes
  const imports = head.slice(0, m.index); // includes trailing newline
  const helpers = head.slice(m.index + 1); // skip the newline
  return imports + tail + "\n" + helpers;
}

/* ─────────────────────────────── CODE QUESTIONS ─────────────────────────────── */

const codeQuestions = [];

// 1 ── easy basic ── Method Overloading
codeQuestions.push({
  title: "Overloaded Area Calculator",
  description: desc(
    "A geometry tool computes areas using one overloaded method name. Write three overloaded methods named area: area(int side) returns side * side, area(int l, int w) returns l * w, and area(double r) returns the circle area Math.PI * r * r. The compiler picks the right overload from the input kind, which is compile-time polymorphism.",
    "One line: kind followed by its values. kind is square (one integer side), rect (two integers l and w) or circle (one decimal r).",
    "One line: the area printed with exactly 2 decimal places.",
    "1 <= side, l, w <= 1000; 0.1 <= r <= 1000"
  ),
  difficulty: "easy",
  variant: "basic",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Method Overloading",
  sampleinput1: "square 4",
  sampleoutput1: "16.00",
  sampleinput2: "circle 2",
  sampleoutput2: "12.57",
  input1: "rect 3 5",
  output1: "15.00",
  input2: "square 7",
  output2: "49.00",
  input3: "circle 1.5",
  output3: "7.07",
  inputconstrains: "1 <= side, l, w <= 1000; 0.1 <= r <= 1000",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {

    static double area(int side) {
        return side * side;
    }

    static double area(int l, int w) {
        return l * w;
    }

    static double area(double r) {
        return Math.PI * r * r;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String kind = sc.next();
        if (kind.equals("square")) {
            int side = sc.nextInt();
            System.out.printf("%.2f%n", area(side));
        } else if (kind.equals("rect")) {
            int l = sc.nextInt();
            int w = sc.nextInt();
            System.out.printf("%.2f%n", area(l, w));
        } else {
            double r = sc.nextDouble();
            System.out.printf("%.2f%n", area(r));
        }
    }
}`,
});

// 2 ── easy basic ── Covariant Returns
codeQuestions.push({
  title: "Covariant Produce Demo",
  description: desc(
    "An animal shelter hands out pets. The base class Shelter has adopt(String name) that returns an Animal. DogShelter overrides adopt with a covariant return type Dog, and CatShelter overrides it to return Cat, so callers get the specific type without any cast. Read the kind and a name, adopt from the matching shelter, and print what the animal says plus one extra behaviour line for dogs and cats.",
    "One line: kind name where kind is dog, cat or any.",
    "For dog: name says Woof then name fetches the ball. For cat: name says Meow then name purrs softly. For any: only name says Grr.",
    "kind is dog, cat or any; 1 <= name length <= 20"
  ),
  difficulty: "easy",
  variant: "basic",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Covariant Returns",
  sampleinput1: "dog Rex",
  sampleoutput1: "Rex says Woof\nRex fetches the ball",
  sampleinput2: "cat Miu",
  sampleoutput2: "Miu says Meow\nMiu purrs softly",
  input1: "any Zoo",
  output1: "Zoo says Grr",
  input2: "dog Buddy",
  output2: "Buddy says Woof\nBuddy fetches the ball",
  input3: "cat Mira",
  output3: "Mira says Meow\nMira purrs softly",
  inputconstrains: "kind is dog, cat or any; 1 <= name length <= 20",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

class Animal {
    String name;

    String sound() {
        return "Grr";
    }
}

class Dog extends Animal {
    String sound() {
        return "Woof";
    }

    String fetch() {
        return name + " fetches the ball";
    }
}

class Cat extends Animal {
    String sound() {
        return "Meow";
    }

    String purr() {
        return name + " purrs softly";
    }
}

class Shelter {
    Animal adopt(String name) {
        Animal a = new Animal();
        a.name = name;
        return a;
    }
}

class DogShelter extends Shelter {
    Dog adopt(String name) {
        Dog d = new Dog();
        d.name = name;
        return d;
    }
}

class CatShelter extends Shelter {
    Cat adopt(String name) {
        Cat c = new Cat();
        c.name = name;
        return c;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String kind = sc.next();
        String name = sc.next();
        if (kind.equals("dog")) {
            DogShelter ds = new DogShelter();
            Dog d = ds.adopt(name);
            System.out.println(d.name + " says " + d.sound());
            System.out.println(d.fetch());
        } else if (kind.equals("cat")) {
            CatShelter cs = new CatShelter();
            Cat c = cs.adopt(name);
            System.out.println(c.name + " says " + c.sound());
            System.out.println(c.purr());
        } else {
            Shelter s = new Shelter();
            Animal a = s.adopt(name);
            System.out.println(a.name + " says " + a.sound());
        }
    }
}`,
});

// 3 ── easy basic ── Method Overriding
codeQuestions.push({
  title: "Vehicle Description Override",
  description: desc(
    "A ride-share app shows a short description for every vehicle. Base class Vehicle has describe() printing a plain line. Car and Bike each override describe() with their own text while keeping the same name and parameter list. Read the kind and the vehicle name, create the right object, and call its overridden describe().",
    "One line: kind name where kind is car, bike or vehicle.",
    "One line: name is a car with 4 wheels, name is a bike with 2 wheels, or name is a plain vehicle.",
    "kind is car, bike or vehicle; 1 <= name length <= 30"
  ),
  difficulty: "easy",
  variant: "basic",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Method Overriding",
  sampleinput1: "car Swift",
  sampleoutput1: "Swift is a car with 4 wheels",
  sampleinput2: "bike Splendor",
  sampleoutput2: "Splendor is a bike with 2 wheels",
  input1: "vehicle Bus",
  output1: "Bus is a plain vehicle",
  input2: "car Alto",
  output2: "Alto is a car with 4 wheels",
  input3: "bike Passion",
  output3: "Passion is a bike with 2 wheels",
  inputconstrains: "kind is car, bike or vehicle; 1 <= name length <= 30",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

class Vehicle {
    String name;

    void describe() {
        System.out.println(name + " is a plain vehicle");
    }
}

class Car extends Vehicle {
    void describe() {
        System.out.println(name + " is a car with 4 wheels");
    }
}

class Bike extends Vehicle {
    void describe() {
        System.out.println(name + " is a bike with 2 wheels");
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String kind = sc.next();
        String name = sc.next();
        if (kind.equals("car")) {
            Car c = new Car();
            c.name = name;
            c.describe();
        } else if (kind.equals("bike")) {
            Bike b = new Bike();
            b.name = name;
            b.describe();
        } else {
            Vehicle v = new Vehicle();
            v.name = name;
            v.describe();
        }
    }
}`,
});

// 4 ── easy basic ── Overriding with super
codeQuestions.push({
  title: "Report Extended With Super",
  description: desc(
    "A report generator prints a basic header, and the student version extends that behaviour. Class Report has print(String name) that prints Name: name. StudentReport overrides print with the same signature, first calling super.print(name) and then printing Role: Student. Read the kind and name and call the matching version.",
    "One line: kind name where kind is student or plain.",
    "Always Name: name. For student, a second line Role: Student.",
    "kind is student or plain; 1 <= name length <= 30"
  ),
  difficulty: "easy",
  variant: "basic",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Overriding with super",
  sampleinput1: "student Asha",
  sampleoutput1: "Name: Asha\nRole: Student",
  sampleinput2: "plain Rahul",
  sampleoutput2: "Name: Rahul",
  input1: "plain Priya",
  output1: "Name: Priya",
  input2: "student Vijay",
  output2: "Name: Vijay\nRole: Student",
  input3: "student Meena",
  output3: "Name: Meena\nRole: Student",
  inputconstrains: "kind is student or plain; 1 <= name length <= 30",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

class Report {
    void print(String name) {
        System.out.println("Name: " + name);
    }
}

class StudentReport extends Report {
    void print(String name) {
        super.print(name);
        System.out.println("Role: Student");
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String kind = sc.next();
        String name = sc.next();
        if (kind.equals("student")) {
            new StudentReport().print(name);
        } else {
            new Report().print(name);
        }
    }
}`,
});

// 5 ── easy basic ── Dynamic Method Dispatch
codeQuestions.push({
  title: "Base Reference Runtime Choice",
  description: desc(
    "A drawing app keeps one variable of the base type Shape. Depending on the input it stores a Circle or a Square in that same reference, then calls draw() exactly once. The version that runs is decided by the object's runtime class, not the reference type, which is dynamic method dispatch.",
    "One line: kind value where kind is circle (radius, decimal) or square (side, decimal).",
    "One line: Drawing a circle with radius R or Drawing a square with side S, with the number printed the way Java prints a double (e.g. 3.0).",
    "kind is circle or square; 0.1 <= value <= 1000"
  ),
  difficulty: "easy",
  variant: "basic",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Dynamic Method Dispatch",
  sampleinput1: "circle 3",
  sampleoutput1: "Drawing a circle with radius 3.0",
  sampleinput2: "square 5",
  sampleoutput2: "Drawing a square with side 5.0",
  input1: "square 9",
  output1: "Drawing a square with side 9.0",
  input2: "circle 7",
  output2: "Drawing a circle with radius 7.0",
  input3: "square 2.5",
  output3: "Drawing a square with side 2.5",
  inputconstrains: "kind is circle or square; 0.1 <= value <= 1000",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

class Shape {
    void draw() {
        System.out.println("Drawing a plain shape");
    }
}

class Circle extends Shape {
    double radius;

    void draw() {
        System.out.println("Drawing a circle with radius " + radius);
    }
}

class Square extends Shape {
    double side;

    void draw() {
        System.out.println("Drawing a square with side " + side);
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String kind = sc.next();
        Shape s;
        if (kind.equals("circle")) {
            Circle c = new Circle();
            c.radius = sc.nextDouble();
            s = c;
        } else {
            Square q = new Square();
            q.side = sc.nextDouble();
            s = q;
        }
        s.draw();
    }
}`,
});

// 6 ── easy basic ── Method Overloading
codeQuestions.push({
  title: "Overloaded Value Printer",
  description: desc(
    "A debug logger prints any value through overloaded show methods: show(int) prints Integer: x, show(double) prints Decimal: x with 2 decimals, and show(String) prints Text: s. Read the kind and the value, then call the matching overload.",
    "One line: kind value where kind is int, double or text.",
    "One line from the matching overload: Integer: x, Decimal: x (2 decimals) or Text: s.",
    "-1000000 <= int value <= 1000000; 0 <= double value <= 1000000; text is a single word"
  ),
  difficulty: "easy",
  variant: "basic",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Method Overloading",
  sampleinput1: "int 42",
  sampleoutput1: "Integer: 42",
  sampleinput2: "text hello",
  sampleoutput2: "Text: hello",
  input1: "double 3.5",
  output1: "Decimal: 3.50",
  input2: "int 7",
  output2: "Integer: 7",
  input3: "double 0.25",
  output3: "Decimal: 0.25",
  inputconstrains: "-1000000 <= int value <= 1000000; 0 <= double value <= 1000000; text is a single word",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

public class Main {

    static void show(int x) {
        System.out.println("Integer: " + x);
    }

    static void show(double x) {
        System.out.printf("Decimal: %.2f%n", x);
    }

    static void show(String s) {
        System.out.println("Text: " + s);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String kind = sc.next();
        if (kind.equals("int")) {
            show(sc.nextInt());
        } else if (kind.equals("double")) {
            show(sc.nextDouble());
        } else {
            show(sc.next());
        }
    }
}`,
});

// 7 ── easy scenario ── Method Overloading
codeQuestions.push({
  title: "Payment Amount Overloads",
  description: desc(
    "A shop counter accepts two payment styles through one overloaded method name. The Payment class has bill(double amount) that returns the cash amount unchanged, and bill(int points) that converts loyalty points at half a rupee per point (points * 0.5). Read the mode and value, then print the billed amount using the overload the compiler picks from the argument type.",
    "One line: mode value where mode is cash (decimal amount) or points (integer points).",
    "For cash: Cash: A with 2 decimals. For points: Points: A with 2 decimals.",
    "0.1 <= cash amount <= 100000; 0 <= points <= 1000000"
  ),
  difficulty: "easy",
  variant: "scenario",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Method Overloading",
  sampleinput1: "cash 250.5",
  sampleoutput1: "Cash: 250.50",
  sampleinput2: "points 120",
  sampleoutput2: "Points: 60.00",
  input1: "cash 99",
  output1: "Cash: 99.00",
  input2: "points 7",
  output2: "Points: 3.50",
  input3: "cash 1000",
  output3: "Cash: 1000.00",
  inputconstrains: "0.1 <= cash amount <= 100000; 0 <= points <= 1000000",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

class Payment {
    double bill(double amount) {
        return amount;
    }

    double bill(int points) {
        return points * 0.5;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String mode = sc.next();
        Payment p = new Payment();
        if (mode.equals("cash")) {
            double amount = sc.nextDouble();
            System.out.printf("Cash: %.2f%n", p.bill(amount));
        } else {
            int points = sc.nextInt();
            System.out.printf("Points: %.2f%n", p.bill(points));
        }
    }
}`,
});

// 8 ── easy scenario ── Dynamic Method Dispatch
codeQuestions.push({
  title: "Music Playlist Dispatch",
  description: desc(
    "A music app queues songs of different genres in one playlist stored as Song[], an array of the base class. PopSong, JazzSong and RockSong each override play() with their own line. After filling the playlist from the input, a single loop calls playlist[i].play() and dynamic dispatch picks the right override for every element.",
    "First line: n. Next n lines: kind title where kind is pop, jazz or rock and title is one word.",
    "One line per song in order: Pop track: title, Jazz track: title or Rock track: title.",
    "1 <= n <= 100; titles are single words"
  ),
  difficulty: "easy",
  variant: "scenario",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Dynamic Method Dispatch",
  sampleinput1: "3\npop Shape\njazz Waltz\nrock Thunder",
  sampleoutput1: "Pop track: Shape\nJazz track: Waltz\nRock track: Thunder",
  sampleinput2: "2\nrock Bolt\npop Spark",
  sampleoutput2: "Rock track: Bolt\nPop track: Spark",
  input1: "1\njazz Breeze",
  output1: "Jazz track: Breeze",
  input2: "4\npop Sun\nrock Storm\njazz Rain\npop Moon",
  output2: "Pop track: Sun\nRock track: Storm\nJazz track: Rain\nPop track: Moon",
  input3: "2\njazz Echo\nrock Fire",
  output3: "Jazz track: Echo\nRock track: Fire",
  inputconstrains: "1 <= n <= 100; titles are single words",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

class Song {
    String title;

    void play() {
        System.out.println("Now playing: " + title);
    }
}

class PopSong extends Song {
    void play() {
        System.out.println("Pop track: " + title);
    }
}

class JazzSong extends Song {
    void play() {
        System.out.println("Jazz track: " + title);
    }
}

class RockSong extends Song {
    void play() {
        System.out.println("Rock track: " + title);
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        Song[] playlist = new Song[n];
        for (int i = 0; i < n; i++) {
            String kind = sc.next();
            Song s;
            if (kind.equals("pop")) {
                s = new PopSong();
            } else if (kind.equals("jazz")) {
                s = new JazzSong();
            } else {
                s = new RockSong();
            }
            s.title = sc.next();
            playlist[i] = s;
        }
        for (int i = 0; i < n; i++) {
            playlist[i].play();
        }
    }
}`,
});

// 9 ── easy scenario ── Overriding with super
codeQuestions.push({
  title: "Car Service Log With Super",
  description: desc(
    "A service station logs every job. Base class Service has perform(String plate) printing the basic check line. CarService and BikeService override perform: each first calls super.perform(plate) to reuse the base log, then prints its own extra line. Read the vehicle kind and plate and run the service.",
    "One line: kind plate where kind is car or bike and plate is one word.",
    "For car: plate: basic check done then plate: oil changed. For bike: plate: basic check done then plate: chain tightened.",
    "kind is car or bike; 1 <= plate length <= 15"
  ),
  difficulty: "easy",
  variant: "scenario",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Overriding with super",
  sampleinput1: "car DL01",
  sampleoutput1: "DL01: basic check done\nDL01: oil changed",
  sampleinput2: "bike BH02",
  sampleoutput2: "BH02: basic check done\nBH02: chain tightened",
  input1: "car MH03",
  output1: "MH03: basic check done\nMH03: oil changed",
  input2: "bike KA04",
  output2: "KA04: basic check done\nKA04: chain tightened",
  input3: "car TN05",
  output3: "TN05: basic check done\nTN05: oil changed",
  inputconstrains: "kind is car or bike; 1 <= plate length <= 15",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

class Service {
    void perform(String plate) {
        System.out.println(plate + ": basic check done");
    }
}

class CarService extends Service {
    void perform(String plate) {
        super.perform(plate);
        System.out.println(plate + ": oil changed");
    }
}

class BikeService extends Service {
    void perform(String plate) {
        super.perform(plate);
        System.out.println(plate + ": chain tightened");
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String kind = sc.next();
        String plate = sc.next();
        if (kind.equals("car")) {
            new CarService().perform(plate);
        } else {
            new BikeService().perform(plate);
        }
    }
}`,
});

// 10 ── easy scenario ── Method Overriding
codeQuestions.push({
  title: "School Introduction Override",
  description: desc(
    "At a school assembly every person introduces themselves differently. Base class Person has introduce() printing a plain hello. Student overrides it to mention the grade and Teacher overrides it to mention the subject. Read the role and details, create the matching object and call its overridden introduce().",
    "One line starting with role: student name grade, teacher name subject, or guest name.",
    "Student: Hi, I am name from grade g. Teacher: Hello, I am name, teacher of subject. Guest: Hello, I am name.",
    "1 <= grade <= 12; names and subjects are single words"
  ),
  difficulty: "easy",
  variant: "scenario",
  maxscore: 10,
  lang: "java",
  topic: TOPIC,
  subtopic: "Method Overriding",
  sampleinput1: "student Ravi 5",
  sampleoutput1: "Hi, I am Ravi from grade 5",
  sampleinput2: "teacher Meena Math",
  sampleoutput2: "Hello, I am Meena, teacher of Math",
  input1: "guest Sam",
  output1: "Hello, I am Sam",
  input2: "student Anu 9",
  output2: "Hi, I am Anu from grade 9",
  input3: "teacher Rao Science",
  output3: "Hello, I am Rao, teacher of Science",
  inputconstrains: "1 <= grade <= 12; names and subjects are single words",
  blacklist: "",
  whitelist: "",
  sourcecode: `import java.util.Scanner;

class Person {
    String name;

    void introduce() {
        System.out.println("Hello, I am " + name);
    }
}

class Student extends Person {
    int grade;

    void introduce() {
        System.out.println("Hi, I am " + name + " from grade " + grade);
    }
}

class Teacher extends Person {
    String subject;

    void introduce() {
        System.out.println("Hello, I am " + name + ", teacher of " + subject);
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String role = sc.next();
        if (role.equals("student")) {
            Student s = new Student();
            s.name = sc.next();
            s.grade = sc.nextInt();
            s.introduce();
        } else if (role.equals("teacher")) {
            Teacher t = new Teacher();
            t.name = sc.next();
            t.subject = sc.next();
            t.introduce();
        } else {
            Person p = new Person();
            p.name = sc.next();
            p.introduce();
        }
    }
}`,
});

// 11 ── medium ── Method Overriding
codeQuestions.push({
  title: "Shape Areas Via Base Array",
  description: desc(
    "A canvas app reports the area of every shape it holds. Shape is an abstract base with abstract area() and label(); Circle, Square and Rect extend it and override both methods. All shapes are stored in one Shape[] array built from the input lines, then a single loop prints label and area for each element through overriding. Do not use instanceof or switch: the base-type array plus overridden methods must do the work.",
    "First line: n. Next n lines: circle r, square s, or rect w h (decimals allowed).",
    "One line per shape in order: Label: area with 2 decimals, where Label is Circle, Square or Rect.",
    "1 <= n <= 100; 0.1 <= every value <= 1000"
  ),
  difficulty: "medium",
  variant: "scenario",
  maxscore: 20,
  lang: "java",
  topic: TOPIC,
  subtopic: "Method Overriding",
  sampleinput1: "3\ncircle 2\nsquare 4\nrect 3 5",
  sampleoutput1: "Circle: 12.57\nSquare: 16.00\nRect: 15.00",
  sampleinput2: "2\nsquare 3\ncircle 1",
  sampleoutput2: "Square: 9.00\nCircle: 3.14",
  input1: "1\nrect 2.5 4",
  output1: "Rect: 10.00",
  input2: "4\ncircle 3\nrect 2 2\nsquare 5\ncircle 1.5",
  output2: "Circle: 28.27\nRect: 4.00\nSquare: 25.00\nCircle: 7.07",
  input3: "2\nsquare 10\ncircle 4",
  output3: "Square: 100.00\nCircle: 50.27",
  inputconstrains: "1 <= n <= 100; 0.1 <= every value <= 1000",
  blacklist: "instanceof, switch",
  whitelist: "extends, @Override",
  sourcecode: `import java.util.Scanner;

abstract class Shape {
    abstract double area();

    abstract String label();
}

class Circle extends Shape {
    double radius;

    @Override
    double area() {
        return Math.PI * radius * radius;
    }

    @Override
    String label() {
        return "Circle";
    }
}

class Square extends Shape {
    double side;

    @Override
    double area() {
        return side * side;
    }

    @Override
    String label() {
        return "Square";
    }
}

class Rect extends Shape {
    double width;
    double height;

    @Override
    double area() {
        return width * height;
    }

    @Override
    String label() {
        return "Rect";
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        Shape[] shapes = new Shape[n];
        for (int i = 0; i < n; i++) {
            String kind = sc.next();
            if (kind.equals("circle")) {
                Circle c = new Circle();
                c.radius = sc.nextDouble();
                shapes[i] = c;
            } else if (kind.equals("square")) {
                Square s = new Square();
                s.side = sc.nextDouble();
                shapes[i] = s;
            } else {
                Rect r = new Rect();
                r.width = sc.nextDouble();
                r.height = sc.nextDouble();
                shapes[i] = r;
            }
        }
        for (int i = 0; i < n; i++) {
            Shape s = shapes[i];
            System.out.printf(s.label() + ": %.2f%n", s.area());
        }
    }
}`,
});

// 12 ── medium ── Overriding with super
codeQuestions.push({
  title: "Invoice Total With Super",
  description: desc(
    "A billing system computes invoice totals. Base class Invoice stores item amounts and has subtotal() summing them plus total() returning subtotal(). TaxInvoice extends Invoice and overrides total(): it first takes super.total() as the base amount, then adds taxPercent percent of that base on top. Read the invoice kind, item amounts and tax percent, then print the subtotal and the dispatched total().",
    "One line: kind n amount1 ... amountn taxPercent where kind is tax or plain (plain always has taxPercent 0).",
    "Line 1: Subtotal: X (2 decimals). Line 2: Grand total: Y (2 decimals).",
    "1 <= n <= 100; 0 <= item amounts <= 100000; 0 <= taxPercent <= 50"
  ),
  difficulty: "medium",
  variant: "scenario",
  maxscore: 20,
  lang: "java",
  topic: TOPIC,
  subtopic: "Overriding with super",
  sampleinput1: "tax 2 100 50 20",
  sampleoutput1: "Subtotal: 150.00\nGrand total: 180.00",
  sampleinput2: "plain 2 40 60 0",
  sampleoutput2: "Subtotal: 100.00\nGrand total: 100.00",
  input1: "tax 1 200 5",
  output1: "Subtotal: 200.00\nGrand total: 210.00",
  input2: "plain 3 10 20 30 0",
  output2: "Subtotal: 60.00\nGrand total: 60.00",
  input3: "tax 3 10 20 30 10",
  output3: "Subtotal: 60.00\nGrand total: 66.00",
  inputconstrains: "1 <= n <= 100; 0 <= item amounts <= 100000; 0 <= taxPercent <= 50",
  blacklist: "instanceof, switch",
  whitelist: "super.",
  sourcecode: `import java.util.Scanner;

class Invoice {
    double[] items;

    double subtotal() {
        double s = 0;
        for (double a : items) {
            s += a;
        }
        return s;
    }

    double total() {
        return subtotal();
    }
}

class TaxInvoice extends Invoice {
    double taxPercent;

    double total() {
        double base = super.total();
        return base + base * taxPercent / 100.0;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String kind = sc.next();
        int n = sc.nextInt();
        double[] amounts = new double[n];
        for (int i = 0; i < n; i++) {
            amounts[i] = sc.nextDouble();
        }
        double tax = sc.nextDouble();
        Invoice inv;
        if (kind.equals("tax")) {
            TaxInvoice t = new TaxInvoice();
            t.items = amounts;
            t.taxPercent = tax;
            inv = t;
        } else {
            Invoice pl = new Invoice();
            pl.items = amounts;
            inv = pl;
        }
        System.out.printf("Subtotal: %.2f%n", inv.subtotal());
        System.out.printf("Grand total: %.2f%n", inv.total());
    }
}`,
});

// 13 ── medium ── Dynamic Method Dispatch
codeQuestions.push({
  title: "Animal Speak Scoreboard",
  description: desc(
    "A pet show announcer reads the lineup into an Animal[] base array. Dog, Cat and Duck extend Animal and override speak() with their own sound. One loop then prints each animal's name and the sound returned through the base reference, letting dynamic method dispatch choose every override. Do not use switch or instanceof.",
    "First line: n. Next n lines: kind name where kind is dog, cat or duck and name is one word.",
    "One line per animal in order: name: Sound.",
    "1 <= n <= 100; names are single words"
  ),
  difficulty: "medium",
  variant: "scenario",
  maxscore: 20,
  lang: "java",
  topic: TOPIC,
  subtopic: "Dynamic Method Dispatch",
  sampleinput1: "3\ndog Rex\ncat Miu\nduck Doodle",
  sampleoutput1: "Rex: Woof\nMiu: Meow\nDoodle: Quack",
  sampleinput2: "2\nduck Puddles\ndog Bruno",
  sampleoutput2: "Puddles: Quack\nBruno: Woof",
  input1: "1\ncat Simba",
  output1: "Simba: Meow",
  input2: "4\ndog Ace\ndog Belle\nduck Dew\ncat Neo",
  output2: "Ace: Woof\nBelle: Woof\nDew: Quack\nNeo: Meow",
  input3: "2\ndog Max\ncat Lily",
  output3: "Max: Woof\nLily: Meow",
  inputconstrains: "1 <= n <= 100; names are single words",
  blacklist: "switch, instanceof",
  whitelist: "extends",
  sourcecode: `import java.util.Scanner;

class Animal {
    String name;

    String speak() {
        return "...";
    }
}

class Dog extends Animal {
    String speak() {
        return "Woof";
    }
}

class Cat extends Animal {
    String speak() {
        return "Meow";
    }
}

class Duck extends Animal {
    String speak() {
        return "Quack";
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        Animal[] pen = new Animal[n];
        for (int i = 0; i < n; i++) {
            String kind = sc.next();
            Animal a;
            if (kind.equals("dog")) {
                a = new Dog();
            } else if (kind.equals("cat")) {
                a = new Cat();
            } else {
                a = new Duck();
            }
            a.name = sc.next();
            pen[i] = a;
        }
        for (int i = 0; i < n; i++) {
            System.out.println(pen[i].name + ": " + pen[i].speak());
        }
    }
}`,
});

// 14 ── medium ── Covariant Returns
codeQuestions.push({
  title: "Covariant Shape Factory",
  description: desc(
    "A drawing app builds shapes through factories. Base class ShapeFactory has produce() returning a Shape. CircleFactory overrides produce() with a covariant return type Circle and SquareFactory with Square, so main can hold the produced object in the specific type without any cast. Read the kind and value, produce from the matching factory, and print the description and area.",
    "One line: kind value where kind is circle (radius) or square (side), decimals allowed.",
    "Line 1: Produced: circle with radius R or Produced: square with side S (number printed the plain Java double way, e.g. 3.0). Line 2: Area: A with 2 decimals.",
    "kind is circle or square; 0.1 <= value <= 1000"
  ),
  difficulty: "medium",
  variant: "scenario",
  maxscore: 20,
  lang: "java",
  topic: TOPIC,
  subtopic: "Covariant Returns",
  sampleinput1: "circle 3",
  sampleoutput1: "Produced: circle with radius 3.0\nArea: 28.27",
  sampleinput2: "square 4",
  sampleoutput2: "Produced: square with side 4.0\nArea: 16.00",
  input1: "circle 1",
  output1: "Produced: circle with radius 1.0\nArea: 3.14",
  input2: "square 2.5",
  output2: "Produced: square with side 2.5\nArea: 6.25",
  input3: "circle 2",
  output3: "Produced: circle with radius 2.0\nArea: 12.57",
  inputconstrains: "kind is circle or square; 0.1 <= value <= 1000",
  blacklist: "clone, instanceof",
  whitelist: "produce",
  sourcecode: `import java.util.Scanner;

class Shape {
    double area() {
        return 0;
    }
}

class Circle extends Shape {
    double radius;

    double area() {
        return Math.PI * radius * radius;
    }
}

class Square extends Shape {
    double side;

    double area() {
        return side * side;
    }
}

class ShapeFactory {
    Shape produce() {
        return new Shape();
    }
}

class CircleFactory extends ShapeFactory {
    double radius;

    Circle produce() {
        Circle c = new Circle();
        c.radius = radius;
        return c;
    }
}

class SquareFactory extends ShapeFactory {
    double side;

    Square produce() {
        Square s = new Square();
        s.side = side;
        return s;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String kind = sc.next();
        double value = sc.nextDouble();
        if (kind.equals("circle")) {
            CircleFactory f = new CircleFactory();
            f.radius = value;
            Circle c = f.produce();
            System.out.println("Produced: circle with radius " + c.radius);
            System.out.printf("Area: %.2f%n", c.area());
        } else {
            SquareFactory f = new SquareFactory();
            f.side = value;
            Square s = f.produce();
            System.out.println("Produced: square with side " + s.side);
            System.out.printf("Area: %.2f%n", s.area());
        }
    }
}`,
});

// 15 ── medium ── Covariant Returns
codeQuestions.push({
  title: "Report Copy Covariant Return",
  description: desc(
    "A document editor duplicates documents. Base class Doc has copy() returning a Doc with the same text. Report extends Doc with an author field and overrides copy() with a covariant return type Report, copying both fields, so the caller receives a Report directly without a cast. Read the kind and data, copy the object and print the copy's contents.",
    "One line: kind text for doc, or kind text author for report (single-word values).",
    "For report: Copied report: text by author. For doc: Copied doc: text.",
    "kind is report or doc; 1 <= text, author length <= 30"
  ),
  difficulty: "medium",
  variant: "scenario",
  maxscore: 20,
  lang: "java",
  topic: TOPIC,
  subtopic: "Covariant Returns",
  sampleinput1: "report Sales Riya",
  sampleoutput1: "Copied report: Sales by Riya",
  sampleinput2: "doc Notes",
  sampleoutput2: "Copied doc: Notes",
  input1: "doc Budget",
  output1: "Copied doc: Budget",
  input2: "report Audit Vikram",
  output2: "Copied report: Audit by Vikram",
  input3: "report Plan Sana",
  output3: "Copied report: Plan by Sana",
  inputconstrains: "kind is report or doc; 1 <= text, author length <= 30",
  blacklist: "clone, instanceof",
  whitelist: "Report copy",
  sourcecode: `import java.util.Scanner;

class Doc {
    String text;

    Doc copy() {
        Doc d = new Doc();
        d.text = text;
        return d;
    }
}

class Report extends Doc {
    String author;

    Report copy() {
        Report r = new Report();
        r.text = text;
        r.author = author;
        return r;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String kind = sc.next();
        String text = sc.next();
        if (kind.equals("report")) {
            Report r = new Report();
            r.text = text;
            r.author = sc.next();
            Report r2 = r.copy();
            System.out.println("Copied report: " + r2.text + " by " + r2.author);
        } else {
            Doc d = new Doc();
            d.text = text;
            Doc d2 = d.copy();
            System.out.println("Copied doc: " + d2.text);
        }
    }
}`,
});

// 16 ── medium ── Overriding with super
codeQuestions.push({
  title: "Notification Pipeline With Super",
  description: desc(
    "A notification system logs every message centrally. Base class Notifier has send(String msg) printing LOG: msg. EmailNotifier and SmsNotifier override send with the same signature: each first calls super.send(msg), then prints its own channel line using the stored target. Read the kind, target and message and send through the matching notifier.",
    "One line: kind target message where kind is email or sms; target is an address or phone; message is one word.",
    "Line 1: LOG: msg. Line 2: EMAIL to target: msg or SMS to target: msg.",
    "kind is email or sms; 1 <= target length <= 30; 1 <= message length <= 40"
  ),
  difficulty: "medium",
  variant: "scenario",
  maxscore: 20,
  lang: "java",
  topic: TOPIC,
  subtopic: "Overriding with super",
  sampleinput1: "email bob meeting",
  sampleoutput1: "LOG: meeting\nEMAIL to bob: meeting",
  sampleinput2: "sms 9900 wakeup",
  sampleoutput2: "LOG: wakeup\nSMS to 9900: wakeup",
  input1: "sms 8811 alert",
  output1: "LOG: alert\nSMS to 8811: alert",
  input2: "email carol report",
  output2: "LOG: report\nEMAIL to carol: report",
  input3: "email dan party",
  output3: "LOG: party\nEMAIL to dan: party",
  inputconstrains: "kind is email or sms; 1 <= target length <= 30; 1 <= message length <= 40",
  blacklist: "instanceof, switch",
  whitelist: "super.",
  sourcecode: `import java.util.Scanner;

class Notifier {
    void send(String msg) {
        System.out.println("LOG: " + msg);
    }
}

class EmailNotifier extends Notifier {
    String address;

    void send(String msg) {
        super.send(msg);
        System.out.println("EMAIL to " + address + ": " + msg);
    }
}

class SmsNotifier extends Notifier {
    String phone;

    void send(String msg) {
        super.send(msg);
        System.out.println("SMS to " + phone + ": " + msg);
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String kind = sc.next();
        String target = sc.next();
        String msg = sc.next();
        if (kind.equals("email")) {
            EmailNotifier e = new EmailNotifier();
            e.address = target;
            e.send(msg);
        } else {
            SmsNotifier s = new SmsNotifier();
            s.phone = target;
            s.send(msg);
        }
    }
}`,
});

// 17 ── hard ── Dynamic Method Dispatch
codeQuestions.push({
  title: "Polymorphic Payroll System",
  description: desc(
    "A courier company runs payroll for mixed staff. Managers earn a fixed base salary plus a bonus; contractors earn an hourly rate multiplied by hours worked. Define an abstract class Employee with a name field and an abstract method monthlyPay(). Extend it with Manager (base + bonus) and Contractor (rate * hours), each overriding monthlyPay(). Read the staff list into an Employee[] array and print every payslip through dynamic method dispatch, followed by the grand total. Do not use switch, instanceof or Map.",
    "First line: n. Then n lines: kind name value1 value2 where kind is manager (base bonus) or contractor (rate hours).",
    "One line per employee: name: pay (2 decimals). Last line: Total: sum (2 decimals).",
    "1 <= n <= 1000; names are single words; 0 < base, bonus, rate <= 1000000; 0 <= hours <= 5000"
  ),
  difficulty: "hard",
  variant: "scenario",
  maxscore: 30,
  lang: "java",
  topic: TOPIC,
  subtopic: "Dynamic Method Dispatch",
  sampleinput1: "3\nmanager Asha 50000 10000\ncontractor Ravi 800 160\nmanager Neha 60000 5000",
  sampleoutput1: "Asha: 60000.00\nRavi: 128000.00\nNeha: 65000.00\nTotal: 253000.00",
  sampleinput2: "2\ncontractor Sam 500 100\nmanager Kim 40000 8000",
  sampleoutput2: "Sam: 50000.00\nKim: 48000.00\nTotal: 98000.00",
  input1: "1\ncontractor Dev 250 40",
  output1: "Dev: 10000.00\nTotal: 10000.00",
  input2: "4\nmanager A 10000 2500\ncontractor B 300 20\ncontractor C 200 50\nmanager D 15000 1000",
  output2: "A: 12500.00\nB: 6000.00\nC: 10000.00\nD: 16000.00\nTotal: 44500.00",
  input3: "2\nmanager Zara 30000 7000\ncontractor Om 450 80",
  output3: "Zara: 37000.00\nOm: 36000.00\nTotal: 73000.00",
  inputconstrains: "1 <= n <= 1000; names are single words; 0 < base, bonus, rate <= 1000000; 0 <= hours <= 5000",
  blacklist: "switch, instanceof, Map",
  whitelist: "abstract",
  sourcecode: `import java.util.Scanner;

abstract class Employee {
    String name;

    abstract double monthlyPay();
}

class Manager extends Employee {
    double base;
    double bonus;

    double monthlyPay() {
        return base + bonus;
    }
}

class Contractor extends Employee {
    double rate;
    double hours;

    double monthlyPay() {
        return rate * hours;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        Employee[] staff = new Employee[n];
        for (int i = 0; i < n; i++) {
            String kind = sc.next();
            Employee e;
            if (kind.equals("manager")) {
                Manager m = new Manager();
                m.name = sc.next();
                m.base = sc.nextDouble();
                m.bonus = sc.nextDouble();
                e = m;
            } else {
                Contractor c = new Contractor();
                c.name = sc.next();
                c.rate = sc.nextDouble();
                c.hours = sc.nextDouble();
                e = c;
            }
            staff[i] = e;
        }
        double total = 0;
        for (int i = 0; i < n; i++) {
            double pay = staff[i].monthlyPay();
            total += pay;
            System.out.printf(staff[i].name + ": %.2f%n", pay);
        }
        System.out.printf("Total: %.2f%n", total);
    }
}`,
});

// 18 ── hard ── Method Overloading
codeQuestions.push({
  title: "Discount Engine Overload Resolution",
  description: desc(
    "An online store's discount engine resolves three overload shapes of one method name. DiscountEngine has apply(double amount, int percent) cutting percent percent, apply(double amount, double fraction) cutting the given fraction, and apply(double amount, String code) where code FEST means 25 percent off (amount * 0.75), MEGA means half price (amount * 0.5), and any other word means no discount. Read the amount and the discount kind, call the matching overload, and print exactly which overload the compiler resolved plus the final price.",
    "One line: amount kind value where kind is percent (integer), fraction (decimal) or code (single word).",
    "One line: Int percent overload: P, Double fraction overload: P or String code overload: P, with P printed with 2 decimals.",
    "0.1 <= amount <= 1000000; 1 <= percent <= 90; 0 <= fraction <= 0.9"
  ),
  difficulty: "hard",
  variant: "scenario",
  maxscore: 30,
  lang: "java",
  topic: TOPIC,
  subtopic: "Method Overloading",
  sampleinput1: "1000 percent 20",
  sampleoutput1: "Int percent overload: 800.00",
  sampleinput2: "1000 fraction 0.25",
  sampleoutput2: "Double fraction overload: 750.00",
  input1: "2000 code FEST",
  output1: "String code overload: 1500.00",
  input2: "500 code MEGA",
  output2: "String code overload: 250.00",
  input3: "800 percent 12",
  output3: "Int percent overload: 704.00",
  inputconstrains: "0.1 <= amount <= 1000000; 1 <= percent <= 90; 0 <= fraction <= 0.9",
  blacklist: "Map, instanceof, switch",
  whitelist: "double apply",
  sourcecode: `import java.util.Scanner;

class DiscountEngine {
    double apply(double amount, int percent) {
        return amount - amount * percent / 100.0;
    }

    double apply(double amount, double fraction) {
        return amount - amount * fraction;
    }

    double apply(double amount, String code) {
        if (code.equals("FEST")) {
            return amount * 0.75;
        }
        if (code.equals("MEGA")) {
            return amount * 0.5;
        }
        return amount;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double amount = sc.nextDouble();
        String kind = sc.next();
        DiscountEngine engine = new DiscountEngine();
        double result;
        if (kind.equals("percent")) {
            int percent = sc.nextInt();
            result = engine.apply(amount, percent);
            System.out.printf("Int percent overload: %.2f%n", result);
        } else if (kind.equals("fraction")) {
            double fraction = sc.nextDouble();
            result = engine.apply(amount, fraction);
            System.out.printf("Double fraction overload: %.2f%n", result);
        } else {
            String code = sc.next();
            result = engine.apply(amount, code);
            System.out.printf("String code overload: %.2f%n", result);
        }
    }
}`,
});

// 19 ── hard ── Method Overriding
codeQuestions.push({
  title: "Override Or Overload Recognizer",
  description: desc(
    "This checker inspects three fixed class pairs and prints the relation between the same-name methods plus the output of one call. Pair 1: P1 has show(int) and C1 extends P1 redeclaring show(int) with the same signature. Pair 2: P2 has show(int) and C2 extends P2 declaring show(double) with a different parameter list. Pair 3: P3 has both show(int) and show(double), and C3 extends P3 redeclaring show(double). Read the scenario number and one argument token; the program builds the objects, makes the documented call, and prints the relation and the call output. Scenario 1 calls p.show(arg) through a P1 reference to a C1 object. Scenario 2 calls c.show(arg) directly on a C2 object. Scenario 3 calls p.show(arg) through a P3 reference to a C3 object.",
    "One line: scenario arg where scenario is 1, 2 or 3 and arg is an integer like 5 or a decimal like 2.5.",
    "Line 1: Relation: Overriding or Relation: Overloading. Line 2: the output of the call, e.g. C1 int 5.",
    "scenario is 1, 2 or 3; arg is an integer or a decimal with a dot"
  ),
  difficulty: "hard",
  variant: "scenario",
  maxscore: 30,
  lang: "java",
  topic: TOPIC,
  subtopic: "Method Overriding",
  sampleinput1: "1 5",
  sampleoutput1: "Relation: Overriding\nC1 int 5",
  sampleinput2: "2 2.5",
  sampleoutput2: "Relation: Overloading\nC2 double 2.5",
  input1: "2 5",
  output1: "Relation: Overloading\nP2 int 5",
  input2: "3 5",
  output2: "Relation: Overriding\nP3 int 5",
  input3: "3 2.5",
  output3: "Relation: Overriding\nC3 double 2.5",
  inputconstrains: "scenario is 1, 2 or 3; arg is an integer or a decimal with a dot",
  blacklist: "Map, instanceof, switch",
  whitelist: "@Override",
  sourcecode: `import java.util.Scanner;

class P1 {
    void show(int x) {
        System.out.println("P1 int " + x);
    }
}

class C1 extends P1 {
    @Override
    void show(int x) {
        System.out.println("C1 int " + x);
    }
}

class P2 {
    void show(int x) {
        System.out.println("P2 int " + x);
    }
}

class C2 extends P2 {
    void show(double x) {
        System.out.println("C2 double " + x);
    }
}

class P3 {
    void show(int x) {
        System.out.println("P3 int " + x);
    }

    void show(double x) {
        System.out.println("P3 double " + x);
    }
}

class C3 extends P3 {
    @Override
    void show(double x) {
        System.out.println("C3 double " + x);
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int scenario = sc.nextInt();
        String arg = sc.next();
        boolean decimal = arg.contains(".");
        if (scenario == 1) {
            System.out.println("Relation: Overriding");
            P1 p = new C1();
            p.show(Integer.parseInt(arg));
        } else if (scenario == 2) {
            System.out.println("Relation: Overloading");
            C2 c = new C2();
            if (decimal) {
                c.show(Double.parseDouble(arg));
            } else {
                c.show(Integer.parseInt(arg));
            }
        } else {
            System.out.println("Relation: Overriding");
            P3 p = new C3();
            if (decimal) {
                p.show(Double.parseDouble(arg));
            } else {
                p.show(Integer.parseInt(arg));
            }
        }
    }
}`,
});

// 20 ── hard ── Covariant Returns
codeQuestions.push({
  title: "Game Attack With Covariant Loot",
  description: desc(
    "A game party of heroes fights together. Base class Character has attack() returning power and loot() returning a Treasure. Mage, Warrior and Archer extend Character: each overrides attack() to return super.attack() plus a bonus (mage +10, warrior +5, archer +3), and overrides loot() with a covariant return type (Staff, Sword, Bow), each treasure reporting its own kind. Read the party into a Character[] array, then print each hero's damage line and loot line, and finally the total damage. Do not use instanceof or switch.",
    "First line: n. Next n lines: kind name power where kind is mage, warrior or archer.",
    "Per hero, two lines: name deals D damage and name loots L. Last line: Total damage: T.",
    "1 <= n <= 100; 1 <= power <= 1000; names are single words"
  ),
  difficulty: "hard",
  variant: "scenario",
  maxscore: 30,
  lang: "java",
  topic: TOPIC,
  subtopic: "Covariant Returns",
  sampleinput1: "2\nmage Gandalf 20\nwarrior Conan 25",
  sampleoutput1: "Gandalf deals 30 damage\nGandalf loots crystal staff\nConan deals 30 damage\nConan loots iron sword\nTotal damage: 60",
  sampleinput2: "1\narcher Robin 40",
  sampleoutput2: "Robin deals 43 damage\nRobin loots wooden bow\nTotal damage: 43",
  input1: "3\nmage El 15\nwarrior Max 10\narcher Lee 20",
  output1: "El deals 25 damage\nEl loots crystal staff\nMax deals 15 damage\nMax loots iron sword\nLee deals 23 damage\nLee loots wooden bow\nTotal damage: 63",
  input2: "2\nwarrior Tara 50\nmage Zed 5",
  output2: "Tara deals 55 damage\nTara loots iron sword\nZed deals 15 damage\nZed loots crystal staff\nTotal damage: 70",
  input3: "1\nmage Mira 100",
  output3: "Mira deals 110 damage\nMira loots crystal staff\nTotal damage: 110",
  inputconstrains: "1 <= n <= 100; 1 <= power <= 1000; names are single words",
  blacklist: "instanceof, switch",
  whitelist: "super., extends",
  sourcecode: `import java.util.Scanner;

class Treasure {
    String kind() {
        return "gold coins";
    }
}

class Staff extends Treasure {
    String kind() {
        return "crystal staff";
    }
}

class Sword extends Treasure {
    String kind() {
        return "iron sword";
    }
}

class Bow extends Treasure {
    String kind() {
        return "wooden bow";
    }
}

class Character {
    String name;
    int power;

    int attack() {
        return power;
    }

    Treasure loot() {
        return new Treasure();
    }
}

class Mage extends Character {
    int attack() {
        return super.attack() + 10;
    }

    Staff loot() {
        return new Staff();
    }
}

class Warrior extends Character {
    int attack() {
        return super.attack() + 5;
    }

    Sword loot() {
        return new Sword();
    }
}

class Archer extends Character {
    int attack() {
        return super.attack() + 3;
    }

    Bow loot() {
        return new Bow();
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        Character[] party = new Character[n];
        for (int i = 0; i < n; i++) {
            String kind = sc.next();
            Character c;
            if (kind.equals("mage")) {
                c = new Mage();
            } else if (kind.equals("warrior")) {
                c = new Warrior();
            } else {
                c = new Archer();
            }
            c.name = sc.next();
            c.power = sc.nextInt();
            party[i] = c;
        }
        int total = 0;
        for (int i = 0; i < n; i++) {
            Character c = party[i];
            int dmg = c.attack();
            total += dmg;
            System.out.println(c.name + " deals " + dmg + " damage");
            System.out.println(c.name + " loots " + c.loot().kind());
        }
        System.out.println("Total damage: " + total);
    }
}`,
});

/* ─────────────────────────────── MCQ QUESTIONS ─────────────────────────────── */

const mcqQuestions = [];

// 1 ── easy ── Method Overloading
mcqQuestions.push({
  title: "How Overloads Differ",
  description: "Two methods in the same class are both named calc with exactly the same parameter list; one returns int and the other returns double. What happens?",
  difficulty: "easy",
  topic: TOPIC,
  subtopic: "Method Overloading",
  Option1: "They form valid overloads and the int version runs",
  Option2: "They form valid overloads and the double version runs",
  Option3: "Compilation fails: methods cannot differ only by return type",
  Option4: "The program picks whichever method is defined first",
  CorrectOption: 3,
  iscodesnippet: false,
  codesnippet: null,
  snippetLang: null,
});

// 2 ── easy ── Method Overloading
mcqQuestions.push({
  title: "Overloading Binding Time",
  description: "The compiler selects which overloaded method to run using the argument types at compilation time. Method overloading is therefore an example of:",
  difficulty: "easy",
  topic: TOPIC,
  subtopic: "Method Overloading",
  Option1: "compile-time (static) polymorphism",
  Option2: "runtime (dynamic) polymorphism",
  Option3: "no polymorphism at all",
  Option4: "runtime binding decided by the JVM",
  CorrectOption: 1,
  iscodesnippet: false,
  codesnippet: null,
  snippetLang: null,
});

// 3 ── easy ── Method Overloading
mcqQuestions.push({
  title: "Overload Resolution Order",
  description: "When one method call matches several overloaded versions, the compiler tries its resolution phases in a fixed order. Which order is correct?",
  difficulty: "easy",
  topic: TOPIC,
  subtopic: "Method Overloading",
  Option1: "boxing, then exact match, then widening, then varargs",
  Option2: "exact match, then widening, then boxing, then varargs",
  Option3: "widening, then varargs, then exact match, then boxing",
  Option4: "varargs, then exact match, then boxing, then widening",
  CorrectOption: 2,
  iscodesnippet: false,
  codesnippet: null,
  snippetLang: null,
});

// 4 ── easy ── Method Overriding
mcqQuestions.push({
  title: "Meaning of Overriding",
  description: "A subclass overrides an inherited method when it defines a method with:",
  difficulty: "easy",
  topic: TOPIC,
  subtopic: "Method Overriding",
  Option1: "the same name and the same parameter list",
  Option2: "the same name but a different parameter list",
  Option3: "a different name but the same parameters",
  Option4: "any name as long as the return type matches",
  CorrectOption: 1,
  iscodesnippet: false,
  codesnippet: null,
  snippetLang: null,
});

// 5 ── easy ── Method Overriding
mcqQuestions.push({
  title: "Final Methods and Overriding",
  description: "A method declared final in a superclass:",
  difficulty: "easy",
  topic: TOPIC,
  subtopic: "Method Overriding",
  Option1: "must be overridden by every subclass",
  Option2: "can be overridden only with the @Override annotation",
  Option3: "cannot be overridden in any subclass",
  Option4: "becomes static in subclasses",
  CorrectOption: 3,
  iscodesnippet: false,
  codesnippet: null,
  snippetLang: null,
});

// 6 ── easy ── Dynamic Method Dispatch
mcqQuestions.push({
  title: "Who Decides the Dispatch",
  description: "In dynamic method dispatch, the version of an overridden instance method that actually executes is chosen by:",
  difficulty: "easy",
  topic: TOPIC,
  subtopic: "Dynamic Method Dispatch",
  Option1: "the declared type of the reference variable",
  Option2: "the actual class of the object at runtime",
  Option3: "the return type of the method",
  Option4: "the order in which the classes were compiled",
  CorrectOption: 2,
  iscodesnippet: false,
  codesnippet: null,
  snippetLang: null,
});

// 7 ── easy ── Method Overriding
mcqQuestions.push({
  title: "Override Annotation Purpose",
  description: "What does the @Override annotation do?",
  difficulty: "easy",
  topic: TOPIC,
  subtopic: "Method Overriding",
  Option1: "Asks the compiler to verify the method really overrides a supertype method",
  Option2: "Makes the overridden method run faster at runtime",
  Option3: "Converts the method into a static method",
  Option4: "Hides the method from all subclasses",
  CorrectOption: 1,
  iscodesnippet: false,
  codesnippet: null,
  snippetLang: null,
});

// 8 ── easy ── Overriding with super
mcqQuestions.push({
  title: "Purpose of super.method()",
  description: "Inside an overriding method, the call super.describe(); does what?",
  difficulty: "easy",
  topic: TOPIC,
  subtopic: "Overriding with super",
  Option1: "Calls the overriding method again recursively",
  Option2: "Creates a new object of the superclass",
  Option3: "Runs the superclass version of describe so extra work can be added around it",
  Option4: "Is only legal when describe is static",
  CorrectOption: 3,
  iscodesnippet: false,
  codesnippet: null,
  snippetLang: null,
});

// 9 ── easy ── Overriding with super
mcqQuestions.push({
  title: "Placement of super Calls",
  description: "Within an overriding method body, where may the statement super.compute(x); appear?",
  difficulty: "easy",
  topic: TOPIC,
  subtopic: "Overriding with super",
  Option1: "Only as the very first statement of the method",
  Option2: "Anywhere among the statements of the method",
  Option3: "Only inside a constructor",
  Option4: "Only after every return statement",
  CorrectOption: 2,
  iscodesnippet: false,
  codesnippet: null,
  snippetLang: null,
});

// 10 ── easy ── Covariant Returns
mcqQuestions.push({
  title: "Covariant Return Meaning",
  description: "A covariant return type (allowed since Java 5) lets an overriding method return:",
  difficulty: "easy",
  topic: TOPIC,
  subtopic: "Covariant Returns",
  Option1: "Any unrelated class it likes",
  Option2: "A superclass of the original return type",
  Option3: "A primitive instead of a reference type",
  Option4: "A subclass of the original return type",
  CorrectOption: 4,
  iscodesnippet: false,
  codesnippet: null,
  snippetLang: null,
});

// 11 ── medium ── Method Overloading (snippet)
mcqQuestions.push({
  title: "Widening Beats Boxing",
  description: "Demo overloads f with a long parameter and an Integer parameter. What does the main method print when it calls Demo.f(5)?",
  difficulty: "medium",
  topic: TOPIC,
  subtopic: "Method Overloading",
  Option1: "Integer",
  Option2: "long",
  Option3: "Compilation error: the call is ambiguous",
  Option4: "5",
  CorrectOption: 2,
  iscodesnippet: true,
  codesnippet: `class Demo {
    static void f(long x) {
        System.out.println("long");
    }

    static void f(Integer x) {
        System.out.println("Integer");
    }
}

public class Main {
    public static void main(String[] args) {
        Demo.f(5);
    }
}`,
  snippetLang: "java",
});

// 12 ── medium ── Method Overriding (snippet)
mcqQuestions.push({
  title: "Field Hiding vs Method Overriding",
  description: "B hides A's field and overrides A's method. What does the main method print?",
  difficulty: "medium",
  topic: TOPIC,
  subtopic: "Method Overriding",
  Option1: "A followed by B.who",
  Option2: "B followed by B.who",
  Option3: "A followed by A.who",
  Option4: "B followed by A.who",
  CorrectOption: 1,
  iscodesnippet: true,
  codesnippet: `class A {
    String tag = "A";

    void who() {
        System.out.println("A.who");
    }
}

class B extends A {
    String tag = "B";

    void who() {
        System.out.println("B.who");
    }
}

public class Main {
    public static void main(String[] args) {
        A a = new B();
        System.out.println(a.tag);
        a.who();
    }
}`,
  snippetLang: "java",
});

// 13 ── medium ── Dynamic Method Dispatch (snippet)
mcqQuestions.push({
  title: "Base Reference Dog Object",
  description: "A base type variable holds a subclass object. What does this program print?",
  difficulty: "medium",
  topic: TOPIC,
  subtopic: "Dynamic Method Dispatch",
  Option1: "generic sound",
  Option2: "Compilation error: sound() cannot be called",
  Option3: "woof",
  Option4: "generic sound followed by woof",
  CorrectOption: 3,
  iscodesnippet: true,
  codesnippet: `class Animal {
    void sound() {
        System.out.println("generic sound");
    }
}

class Dog extends Animal {
    void sound() {
        System.out.println("woof");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal a = new Dog();
        a.sound();
    }
}`,
  snippetLang: "java",
});

// 14 ── medium ── Overriding with super (snippet)
mcqQuestions.push({
  title: "Super Call Then Subclass Line",
  description: "B's override calls super.hi() first and then prints its own line. What does this program print?",
  difficulty: "medium",
  topic: TOPIC,
  subtopic: "Overriding with super",
  Option1: "A hi followed by B hi",
  Option2: "B hi followed by A hi",
  Option3: "B hi only",
  Option4: "A hi only",
  CorrectOption: 1,
  iscodesnippet: true,
  codesnippet: `class A {
    void hi() {
        System.out.println("A hi");
    }
}

class B extends A {
    void hi() {
        super.hi();
        System.out.println("B hi");
    }
}

public class Main {
    public static void main(String[] args) {
        new B().hi();
    }
}`,
  snippetLang: "java",
});

// 15 ── medium ── Covariant Returns (snippet)
mcqQuestions.push({
  title: "Covariant Make Assignment",
  description: "Sub.make() overrides Base.make() with a covariant return type. What does this program print?",
  difficulty: "medium",
  topic: TOPIC,
  subtopic: "Covariant Returns",
  Option1: "base object",
  Option2: "sub object",
  Option3: "Compilation error: make() returns Base",
  Option4: "ClassCastException at runtime",
  CorrectOption: 2,
  iscodesnippet: true,
  codesnippet: `class Base {
    Base make() {
        return new Base();
    }

    String id() {
        return "base object";
    }
}

class Sub extends Base {
    Sub make() {
        return new Sub();
    }

    String id() {
        return "sub object";
    }
}

public class Main {
    public static void main(String[] args) {
        Sub s = new Sub().make();
        System.out.println(s.id());
    }
}`,
  snippetLang: "java",
});

// 16 ── medium ── Dynamic Method Dispatch
mcqQuestions.push({
  title: "Static Binding Members",
  description: "Even when accessed through a base class reference, which members are always bound at compile time?",
  difficulty: "medium",
  topic: TOPIC,
  subtopic: "Dynamic Method Dispatch",
  Option1: "Overridden public instance methods",
  Option2: "Abstract methods",
  Option3: "Static methods, private methods, final methods and fields",
  Option4: "Every instance method of the object",
  CorrectOption: 3,
  iscodesnippet: false,
  codesnippet: null,
  snippetLang: null,
});

// 17 ── hard ── Method Overriding (snippet)
mcqQuestions.push({
  title: "Static Methods Hide Not Override",
  description: "B declares a static method with the same signature as A's static method. What does this program print?",
  difficulty: "hard",
  topic: TOPIC,
  subtopic: "Method Overriding",
  Option1: "A static",
  Option2: "B static",
  Option3: "Compilation error: static methods cannot be called on a variable",
  Option4: "A static followed by B static",
  CorrectOption: 1,
  iscodesnippet: true,
  codesnippet: `class A {
    static void greet() {
        System.out.println("A static");
    }
}

class B extends A {
    static void greet() {
        System.out.println("B static");
    }
}

public class Main {
    public static void main(String[] args) {
        A a = new B();
        a.greet();
    }
}`,
  snippetLang: "java",
});

// 18 ── hard ── Method Overriding
mcqQuestions.push({
  title: "Narrowing Visibility in Override",
  description: "Which rule governs the access modifier of an overriding method compared to the superclass method?",
  difficulty: "hard",
  topic: TOPIC,
  subtopic: "Method Overriding",
  Option1: "It may be made more restrictive, e.g. public to private",
  Option2: "It may be widened, e.g. default to public, but never narrowed",
  Option3: "It may change freely in any direction",
  Option4: "It must always be exactly the same modifier as the superclass method",
  CorrectOption: 2,
  iscodesnippet: false,
  codesnippet: null,
  snippetLang: null,
});

// 19 ── hard ── Dynamic Method Dispatch
mcqQuestions.push({
  title: "Virtual Methods in Java",
  description: "Instance methods in Java are virtual by default. What does that guarantee?",
  difficulty: "hard",
  topic: TOPIC,
  subtopic: "Dynamic Method Dispatch",
  Option1: "They are resolved using the reference variable's declared type",
  Option2: "They must be marked with a virtual keyword",
  Option3: "They cannot be overridden without interfaces",
  Option4: "The overridden implementation of the actual object runs, even through a base class reference",
  CorrectOption: 4,
  iscodesnippet: false,
  codesnippet: null,
  snippetLang: null,
});

// 20 ── hard ── Covariant Returns (snippet)
mcqQuestions.push({
  title: "Covariant Compile Check",
  description: "Dog.reproduce() overrides Animal.reproduce() with a covariant return type. Which statement about this program is true?",
  difficulty: "hard",
  topic: TOPIC,
  subtopic: "Covariant Returns",
  Option1: "It prints done",
  Option2: "Compilation fails at Dog d2 = new Animal().reproduce();",
  Option3: "A ClassCastException is thrown at runtime",
  Option4: "Compilation fails at Dog d1 = new Dog().reproduce();",
  CorrectOption: 2,
  iscodesnippet: true,
  codesnippet: `class Animal {
    Animal reproduce() {
        return new Animal();
    }
}

class Dog extends Animal {
    Dog reproduce() {
        return new Dog();
    }
}

public class Main {
    public static void main(String[] args) {
        Animal a = new Dog().reproduce();
        Dog d1 = new Dog().reproduce();
        Dog d2 = new Animal().reproduce();
        System.out.println("done");
    }
}`,
  snippetLang: "java",
});

/* ─────────────────────────────── WRITE PART FILES ─────────────────────────────── */

// put public class Main first in every source (Lambda requirement)
for (const q of codeQuestions) {
  q.sourcecode = mainFirst(q.sourcecode);
}

const topicsBlock = [{ name: TOPIC, subtopics: SUBTOPICS }];

fs.writeFileSync(
  path.join(DIR, "day-14.code.p1.json"),
  JSON.stringify({ day: 14, topics: topicsBlock, questions: codeQuestions.slice(0, 10) }, null, 2) + "\n"
);
fs.writeFileSync(
  path.join(DIR, "day-14.code.p2.json"),
  JSON.stringify({ questions: codeQuestions.slice(10) }, null, 2) + "\n"
);
fs.writeFileSync(
  path.join(DIR, "day-14.mcq.p1.json"),
  JSON.stringify({ day: 14, questions: mcqQuestions.slice(0, 10) }, null, 2) + "\n"
);
fs.writeFileSync(
  path.join(DIR, "day-14.mcq.p2.json"),
  JSON.stringify({ questions: mcqQuestions.slice(10) }, null, 2) + "\n"
);

console.log("wrote day-14 part files:", codeQuestions.length, "code,", mcqQuestions.length, "mcq");

// sanity: no backslashes anywhere in Java sources or snippets
for (const q of codeQuestions) {
  if (q.sourcecode.includes("\\")) throw new Error("backslash in source: " + q.title);
}
for (const q of mcqQuestions) {
  if (q.codesnippet && q.codesnippet.includes("\\")) throw new Error("backslash in snippet: " + q.title);
}
console.log("backslash sanity check passed");
