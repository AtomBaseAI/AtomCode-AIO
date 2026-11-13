/**
 * Generator for Day 12 — "Constructors and Overloading"
 * Writes part files:
 *   day-12.code.p1.json / day-12.code.p2.json
 *   day-12.mcq.p1.json  / day-12.mcq.p2.json
 * Merge afterwards with merge-parts.ts.
 *
 * Subtopic distribution (4 each):
 *   Default Constructor      : Q3, Q7,  Q11, Q17
 *   Parameterized Constructor: Q2, Q6,  Q8,  Q12
 *   Constructor Overloading  : Q1, Q9,  Q13, Q20
 *   Copy Constructors        : Q4, Q10, Q14, Q18
 *   this Keyword             : Q5, Q15, Q16, Q19
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const TOPIC = "Constructors and Overloading";
const DEF = "Default Constructor";
const PAR = "Parameterized Constructor";
const OVL = "Constructor Overloading";
const CPY = "Copy Constructors";
const THS = "this Keyword";

const topics = [{ name: TOPIC, subtopics: [DEF, PAR, OVL, CPY, THS] }];

function code(q) {
  return {
    title: q.title,
    description: q.description,
    difficulty: q.difficulty,
    variant: q.variant,
    maxscore: q.maxscore,
    lang: "java",
    topic: TOPIC,
    subtopic: q.subtopic,
    sampleinput1: q.si1,
    sampleoutput1: q.so1,
    sampleinput2: q.si2,
    sampleoutput2: q.so2,
    input1: q.i1,
    output1: q.o1,
    input2: q.i2,
    output2: q.o2,
    input3: q.i3,
    output3: q.o3,
    inputconstrains: q.ic,
    blacklist: q.blacklist || "",
    whitelist: q.whitelist || "",
    sourcecode: q.code,
  };
}

function mcq(q) {
  return {
    title: q.title,
    description: q.description,
    difficulty: q.difficulty,
    topic: TOPIC,
    subtopic: q.subtopic,
    Option1: q.o[0],
    Option2: q.o[1],
    Option3: q.o[2],
    Option4: q.o[3],
    CorrectOption: q.c,
    iscodesnippet: !!q.snip,
    codesnippet: q.snip || null,
    snippetLang: q.snip ? "java" : null,
  };
}

/* ────────────────────────────── CODE QUESTIONS ────────────────────────────── */

const codeQuestions = [];

// ── easy basic 1 ── Constructor Overloading
codeQuestions.push(
  code({
    title: "Box Volume Constructor Choice",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: OVL,
    description: `A packaging team uses two kinds of boxes: a standard test box that is always 1 x 1 x 1, and custom boxes whose dimensions come from the order sheet. Define a class Box with a default (no-argument) constructor that sets length, width and height all to 1, and a parameterized constructor Box(int length, int width, int height). The input decides which constructor to use: the token D builds the standard default box, the token P builds a custom box from the next three numbers. Print the box volume using a volume() method.

Input Format:
One line: either D, or P followed by three space-separated integers length width height.

Output Format:
One line: Volume: <volume>

Constraints:
mode is D or P; 1 <= length, width, height <= 1000`,
    si1: "D", so1: "Volume: 1",
    si2: "P 2 3 4", so2: "Volume: 24",
    i1: "P 5 5 2", o1: "Volume: 50",
    i2: "D", o2: "Volume: 1",
    i3: "P 10 2 3", o3: "Volume: 60",
    ic: "mode is D or P; 1 <= length, width, height <= 1000",
    code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String mode = sc.next();
        Box box;
        if (mode.equals("D")) {
            box = new Box();
        } else {
            int l = sc.nextInt();
            int w = sc.nextInt();
            int h = sc.nextInt();
            box = new Box(l, w, h);
        }
        System.out.println("Volume: " + box.volume());
    }
}

class Box {
    int length;
    int width;
    int height;

    Box() {
        length = 1;
        width = 1;
        height = 1;
    }

    Box(int length, int width, int height) {
        this.length = length;
        this.width = width;
        this.height = height;
    }

    int volume() {
        return length * width * height;
    }
}`,
  })
);

// ── easy basic 2 ── Parameterized Constructor
codeQuestions.push(
  code({
    title: "Student Constructor Display",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: PAR,
    description: `The school office registers a new student by passing the name and roll number straight into a parameterized constructor. Define a class Student with fields name and roll and a constructor Student(String name, int roll) that stores both values. Add a display() method that prints the two fields. In main, read the values, create the object using the constructor, and call display().

Input Format:
One line: name roll (name is a single word, roll is an integer).

Output Format:
Line 1: Name: <name>
Line 2: Roll: <roll>

Constraints:
1 <= name length <= 20, 1 <= roll <= 9999`,
    si1: "Asha 12", so1: "Name: Asha\nRoll: 12",
    si2: "Ravi 7", so2: "Name: Ravi\nRoll: 7",
    i1: "Meena 101", o1: "Name: Meena\nRoll: 101",
    i2: "Zoya 45", o2: "Name: Zoya\nRoll: 45",
    i3: "Inder 900", o3: "Name: Inder\nRoll: 900",
    ic: "1 <= name length <= 20, 1 <= roll <= 9999",
    code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String name = sc.next();
        int roll = sc.nextInt();
        Student st = new Student(name, roll);
        st.display();
    }
}

class Student {
    String name;
    int roll;

    Student(String name, int roll) {
        this.name = name;
        this.roll = roll;
    }

    void display() {
        System.out.println("Name: " + name);
        System.out.println("Roll: " + roll);
    }
}`,
  })
);

// ── easy basic 3 ── Default Constructor
codeQuestions.push(
  code({
    title: "Visitor Counter Default Start",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: DEF,
    description: `A hall's visitor counter starts from a fixed base value that its no-argument constructor sets: 100 visitors were pre-registered. Define a class Counter with a default constructor that sets count to 100 and an increment() method that raises the count by 1. Read the number of walk-in visitors, create one Counter with the default constructor, call increment() that many times, and print the final count.

Input Format:
One integer: extraVisitors.

Output Format:
One line: Total: <final count>

Constraints:
0 <= extraVisitors <= 1000`,
    si1: "5", so1: "Total: 105",
    si2: "0", so2: "Total: 100",
    i1: "12", o1: "Total: 112",
    i2: "250", o2: "Total: 350",
    i3: "999", o3: "Total: 1099",
    ic: "0 <= extraVisitors <= 1000",
    code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int extra = sc.nextInt();
        Counter hall = new Counter();
        for (int i = 0; i < extra; i++) {
            hall.increment();
        }
        System.out.println("Total: " + hall.count);
    }
}

class Counter {
    int count;

    Counter() {
        count = 100;
    }

    void increment() {
        count = count + 1;
    }
}`,
  })
);

// ── easy basic 4 ── Copy Constructors
codeQuestions.push(
  code({
    title: "Book Copy by Constructor",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: CPY,
    description: `A library app duplicates a Book record using a copy constructor. Define class Book with fields title and price, a parameterized constructor Book(String title, int price), and a copy constructor Book(Book other) that copies both fields from another book. Read title, price and extra. Create the original book with the parameterized constructor, create a duplicate with the copy constructor, add extra to the duplicate's price, then print both records.

Input Format:
One line: title price extra (title is a single word).

Output Format:
Line 1: Title: <original title>
Line 2: Price: <original price>
Line 3: Title: <duplicate title>
Line 4: Price: <duplicate price>

Constraints:
1 <= title length <= 20, 0 <= price <= 10000, 0 <= extra <= 1000`,
    si1: "Java 200 50", so1: "Title: Java\nPrice: 200\nTitle: Java\nPrice: 250",
    si2: "C 100 10", so2: "Title: C\nPrice: 100\nTitle: C\nPrice: 110",
    i1: "Python 300 25", o1: "Title: Python\nPrice: 300\nTitle: Python\nPrice: 325",
    i2: "Html 150 5", o2: "Title: Html\nPrice: 150\nTitle: Html\nPrice: 155",
    i3: "Sql 90 90", o3: "Title: Sql\nPrice: 90\nTitle: Sql\nPrice: 180",
    ic: "1 <= title length <= 20, 0 <= price <= 10000, 0 <= extra <= 1000",
    code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String title = sc.next();
        int price = sc.nextInt();
        int extra = sc.nextInt();
        Book original = new Book(title, price);
        Book duplicate = new Book(original);
        duplicate.price = duplicate.price + extra;
        System.out.println("Title: " + original.title);
        System.out.println("Price: " + original.price);
        System.out.println("Title: " + duplicate.title);
        System.out.println("Price: " + duplicate.price);
    }
}

class Book {
    String title;
    int price;

    Book(String title, int price) {
        this.title = title;
        this.price = price;
    }

    Book(Book other) {
        this.title = other.title;
        this.price = other.price;
    }
}`,
  })
);

// ── easy basic 5 ── this Keyword
codeQuestions.push(
  code({
    title: "Shadow Free Rectangle",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: THS,
    description: `When a constructor's parameter names are identical to the field names, the fields hide behind the parameters unless you use the this keyword. Define a class Rectangle with fields length and width and a constructor Rectangle(int length, int width) whose parameter names exactly match the field names; assign them using this.length and this.width. Read the two values, construct the rectangle, and print the area with an area() method.

Input Format:
One line: two space-separated integers length and width.

Output Format:
One line: Area: <length * width>

Constraints:
1 <= length, width <= 1000`,
    si1: "4 5", so1: "Area: 20",
    si2: "3 7", so2: "Area: 21",
    i1: "10 10", o1: "Area: 100",
    i2: "2 9", o2: "Area: 18",
    i3: "12 15", o3: "Area: 180",
    ic: "1 <= length, width <= 1000",
    code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int length = sc.nextInt();
        int width = sc.nextInt();
        Rectangle rect = new Rectangle(length, width);
        System.out.println("Area: " + rect.area());
    }
}

class Rectangle {
    int length;
    int width;

    Rectangle(int length, int width) {
        this.length = length;
        this.width = width;
    }

    int area() {
        return length * width;
    }
}`,
  })
);

// ── easy basic 6 ── Parameterized Constructor
codeQuestions.push(
  code({
    title: "Clock Time Constructor",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: PAR,
    description: `A digital clock receives raw hour and minute values from a sensor and must normalize them inside its parameterized constructor. Define a class Clock with fields hours and minutes and a constructor Clock(int h, int m) that stores h + m / 60 into hours and m % 60 into minutes, then wraps hours with % 24. Read h and m, construct the clock, and print the time as two digits for hours and two digits for minutes joined by a colon.

Input Format:
One line: two space-separated integers h and m.

Output Format:
One line: the normalized time in hh:mm form, e.g. 07:05

Constraints:
0 <= h <= 23, 0 <= m <= 180`,
    si1: "10 75", so1: "11:15",
    si2: "23 90", so2: "00:30",
    i1: "0 0", o1: "00:00",
    i2: "5 59", o2: "05:59",
    i3: "9 121", o3: "11:01",
    ic: "0 <= h <= 23, 0 <= m <= 180",
    code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int h = sc.nextInt();
        int m = sc.nextInt();
        Clock c = new Clock(h, m);
        System.out.println(c);
    }
}

class Clock {
    int hours;
    int minutes;

    Clock(int h, int m) {
        hours = h + m / 60;
        minutes = m % 60;
        hours = hours % 24;
    }

    public String toString() {
        return String.format("%02d:%02d", hours, minutes);
    }
}`,
  })
);

// ── easy scenario 1 ── Default Constructor
codeQuestions.push(
  code({
    title: "Pizza Order Constructor",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: DEF,
    description: `A pizzeria's ordering kiosk builds a Pizza object for every customer. If the customer just picks the surprise option, the kiosk uses the default constructor, which always produces a Small pizza with Cheese. Otherwise the kiosk uses the parameterized constructor with the chosen size and topping. Define class Pizza with fields size and topping, a no-argument constructor that sets size to Small and topping to Cheese, and a parameterized constructor Pizza(String size, String topping). Read the mode token: D means use the default constructor, P means read two more words (size, topping) and use the parameterized constructor. Print the order.

Input Format:
One line: either D, or P followed by two space-separated words size and topping.

Output Format:
Line 1: Size: <size>
Line 2: Topping: <topping>

Constraints:
mode is D or P; size and topping are single words of length 1..15`,
    si1: "D", so1: "Size: Small\nTopping: Cheese",
    si2: "P Large Mushroom", so2: "Size: Large\nTopping: Mushroom",
    i1: "P Medium Paneer", o1: "Size: Medium\nTopping: Paneer",
    i2: "D", o2: "Size: Small\nTopping: Cheese",
    i3: "P Small Corn", o3: "Size: Small\nTopping: Corn",
    ic: "mode is D or P; size and topping are single words of length 1..15",
    code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String mode = sc.next();
        Pizza order;
        if (mode.equals("D")) {
            order = new Pizza();
        } else {
            String size = sc.next();
            String topping = sc.next();
            order = new Pizza(size, topping);
        }
        order.print();
    }
}

class Pizza {
    String size;
    String topping;

    Pizza() {
        size = "Small";
        topping = "Cheese";
    }

    Pizza(String size, String topping) {
        this.size = size;
        this.topping = topping;
    }

    void print() {
        System.out.println("Size: " + size);
        System.out.println("Topping: " + topping);
    }
}`,
  })
);

// ── easy scenario 2 ── Parameterized Constructor
codeQuestions.push(
  code({
    title: "Bank Account Opening Balance",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: PAR,
    description: `Silverline Bank opens a savings account by feeding the holder's name and the opening balance into a parameterized constructor. As a launch offer, the constructor itself adds a welcome bonus of 200 to any opening balance of 5000 or more. Define class SavingsAccount with fields holder and balance and a constructor SavingsAccount(String holder, int balance) that stores the holder and the (possibly bonus-boosted) balance. Read the values, create the account, and print both fields.

Input Format:
One line: holder balance (holder is a single word, balance is an integer).

Output Format:
Line 1: Holder: <holder>
Line 2: Balance: <balance after any bonus>

Constraints:
1 <= holder length <= 20, 0 <= balance <= 100000`,
    si1: "Asha 6000", so1: "Holder: Asha\nBalance: 6200",
    si2: "Ravi 3000", so2: "Holder: Ravi\nBalance: 3000",
    i1: "Meena 5000", o1: "Holder: Meena\nBalance: 5200",
    i2: "John 4999", o2: "Holder: John\nBalance: 4999",
    i3: "Zoya 12000", o3: "Holder: Zoya\nBalance: 12200",
    ic: "1 <= holder length <= 20, 0 <= balance <= 100000",
    code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String holder = sc.next();
        int balance = sc.nextInt();
        SavingsAccount acc = new SavingsAccount(holder, balance);
        acc.print();
    }
}

class SavingsAccount {
    String holder;
    int balance;

    SavingsAccount(String holder, int balance) {
        this.holder = holder;
        this.balance = balance;
        if (balance >= 5000) {
            this.balance = balance + 200;
        }
    }

    void print() {
        System.out.println("Holder: " + holder);
        System.out.println("Balance: " + balance);
    }
}`,
  })
);

// ── easy scenario 3 ── Constructor Overloading
codeQuestions.push(
  code({
    title: "Laptop Spec Card",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: OVL,
    description: `A computer shop prints a spec card for every laptop on display. The showcase unit always uses the default constructor: model Generic with 4 GB RAM and 256 GB storage. Custom builds use the parameterized constructor. Define class Laptop with fields model, ram and storage, a no-argument constructor with the showcase defaults, and a parameterized constructor Laptop(String model, int ram, int storage). Read the mode token: B means default constructor, C means read a model word and two integers and use the parameterized constructor. Print the spec card.

Input Format:
One line: either B, or C followed by model ram storage.

Output Format:
Line 1: Model: <model>
Line 2: RAM: <ram>GB
Line 3: Storage: <storage>GB

Constraints:
mode is B or C; 1 <= model length <= 20, 1 <= ram <= 128, 1 <= storage <= 2048`,
    si1: "B", so1: "Model: Generic\nRAM: 4GB\nStorage: 256GB",
    si2: "C ProBook 16 512", so2: "Model: ProBook\nRAM: 16GB\nStorage: 512GB",
    i1: "C Ultra 8 256", o1: "Model: Ultra\nRAM: 8GB\nStorage: 256GB",
    i2: "B", o2: "Model: Generic\nRAM: 4GB\nStorage: 256GB",
    i3: "C ZenLite 32 1024", o3: "Model: ZenLite\nRAM: 32GB\nStorage: 1024GB",
    ic: "mode is B or C; 1 <= model length <= 20, 1 <= ram <= 128, 1 <= storage <= 2048",
    code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String mode = sc.next();
        Laptop lap;
        if (mode.equals("B")) {
            lap = new Laptop();
        } else {
            String model = sc.next();
            int ram = sc.nextInt();
            int storage = sc.nextInt();
            lap = new Laptop(model, ram, storage);
        }
        lap.print();
    }
}

class Laptop {
    String model;
    int ram;
    int storage;

    Laptop() {
        model = "Generic";
        ram = 4;
        storage = 256;
    }

    Laptop(String model, int ram, int storage) {
        this.model = model;
        this.ram = ram;
        this.storage = storage;
    }

    void print() {
        System.out.println("Model: " + model);
        System.out.println("RAM: " + ram + "GB");
        System.out.println("Storage: " + storage + "GB");
    }
}`,
  })
);

// ── easy scenario 4 ── Copy Constructors
codeQuestions.push(
  code({
    title: "Temperature Sensor Copy",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: CPY,
    description: `A weather station keeps a live Sensor reading and a backup copy created with a copy constructor. Calibration later shifts only the backup by an offset. Define class Sensor with field reading, a parameterized constructor Sensor(int reading), and a copy constructor Sensor(Sensor other) that copies the reading. Read the reading and the offset; create the live sensor, create the backup with the copy constructor, add the offset to the backup's reading, then print both.

Input Format:
One line: reading offset (both integers).

Output Format:
Line 1: Sensor: <live reading>
Line 2: Backup: <backup reading>

Constraints:
-50 <= reading <= 150, 0 <= offset <= 50`,
    si1: "36 2", so1: "Sensor: 36\nBackup: 38",
    si2: "20 5", so2: "Sensor: 20\nBackup: 25",
    i1: "-10 3", o1: "Sensor: -10\nBackup: -7",
    i2: "100 0", o2: "Sensor: 100\nBackup: 100",
    i3: "45 12", o3: "Sensor: 45\nBackup: 57",
    ic: "-50 <= reading <= 150, 0 <= offset <= 50",
    code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int reading = sc.nextInt();
        int offset = sc.nextInt();
        Sensor primary = new Sensor(reading);
        Sensor backup = new Sensor(primary);
        backup.reading = backup.reading + offset;
        System.out.println("Sensor: " + primary.reading);
        System.out.println("Backup: " + backup.reading);
    }
}

class Sensor {
    int reading;

    Sensor(int reading) {
        this.reading = reading;
    }

    Sensor(Sensor other) {
        this.reading = other.reading;
    }
}`,
  })
);

// ── medium 1 ── Default Constructor (default-then-set flow)
codeQuestions.push(
  code({
    title: "Game Settings Default First",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: DEF,
    blacklist: "GameSettings(GameSettings",
    whitelist: "GameSettings()",
    description: `Every new game profile starts from a default settings object built by the no-argument constructor: difficulty Normal, sound on, volume 50. The player may then open the settings menu and update difficulty and volume through setter methods; sound can never be changed. Define class GameSettings with fields difficulty (String), sound (boolean) and volume (int), a no-argument constructor that sets the three defaults, methods setDifficulty(String d) and setVolume(int v), and a print() method. Read the mode token: DEFAULT means just create the object with the default constructor and print it; UPDATE means read a difficulty word and a volume and apply both setters before printing.

Input Format:
One line: either DEFAULT, or UPDATE followed by a difficulty word and an integer volume.

Output Format:
Line 1: Difficulty: <difficulty>
Line 2: Sound: on
Line 3: Volume: <volume>

Constraints:
mode is DEFAULT or UPDATE; difficulty is a single word of length 1..15, 0 <= volume <= 100`,
    si1: "DEFAULT", so1: "Difficulty: Normal\nSound: on\nVolume: 50",
    si2: "UPDATE Hard 70", so2: "Difficulty: Hard\nSound: on\nVolume: 70",
    i1: "UPDATE Easy 10", o1: "Difficulty: Easy\nSound: on\nVolume: 10",
    i2: "DEFAULT", o2: "Difficulty: Normal\nSound: on\nVolume: 50",
    i3: "UPDATE Extreme 100", o3: "Difficulty: Extreme\nSound: on\nVolume: 100",
    ic: "mode is DEFAULT or UPDATE; difficulty is a single word of length 1..15, 0 <= volume <= 100",
    code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String mode = sc.next();
        GameSettings game = new GameSettings();
        if (mode.equals("UPDATE")) {
            String diff = sc.next();
            int vol = sc.nextInt();
            game.setDifficulty(diff);
            game.setVolume(vol);
        }
        game.print();
    }
}

class GameSettings {
    String difficulty;
    boolean sound;
    int volume;

    GameSettings() {
        difficulty = "Normal";
        sound = true;
        volume = 50;
    }

    void setDifficulty(String d) {
        difficulty = d;
    }

    void setVolume(int v) {
        volume = v;
    }

    void print() {
        System.out.println("Difficulty: " + difficulty);
        System.out.println("Sound: " + (sound ? "on" : "off"));
        System.out.println("Volume: " + volume);
    }
}`,
  })
);

// ── medium 2 ── Parameterized Constructor (pricing inside ctor)
codeQuestions.push(
  code({
    title: "Ticket Category Constructor",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: PAR,
    blacklist: "this(",
    whitelist: "Ticket(",
    description: `A concert counter builds a Ticket object for every sale, and the parameterized constructor itself does all the pricing: a VIP ticket costs 250 and a Regular ticket costs 100, and the constructor computes total = unitPrice * quantity. Define class Ticket with fields category, quantity, unitPrice and total, and a constructor Ticket(String category, int quantity) that stores category and quantity, decides unitPrice from the category, and computes total. Read category and quantity, create the ticket, and print the stored values.

Input Format:
One line: category quantity (category is the word VIP or Regular).

Output Format:
Line 1: Category: <category>
Line 2: Tickets: <quantity>
Line 3: Total: <total>

Constraints:
category is VIP or Regular, 0 <= quantity <= 100`,
    si1: "VIP 3", so1: "Category: VIP\nTickets: 3\nTotal: 750",
    si2: "Regular 5", so2: "Category: Regular\nTickets: 5\nTotal: 500",
    i1: "Regular 0", o1: "Category: Regular\nTickets: 0\nTotal: 0",
    i2: "VIP 10", o2: "Category: VIP\nTickets: 10\nTotal: 2500",
    i3: "Regular 7", o3: "Category: Regular\nTickets: 7\nTotal: 700",
    ic: "category is VIP or Regular, 0 <= quantity <= 100",
    code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String category = sc.next();
        int qty = sc.nextInt();
        Ticket t = new Ticket(category, qty);
        t.print();
    }
}

class Ticket {
    String category;
    int quantity;
    int unitPrice;
    int total;

    Ticket(String category, int quantity) {
        this.category = category;
        this.quantity = quantity;
        if (category.equals("VIP")) {
            unitPrice = 250;
        } else {
            unitPrice = 100;
        }
        total = unitPrice * quantity;
    }

    void print() {
        System.out.println("Category: " + category);
        System.out.println("Tickets: " + quantity);
        System.out.println("Total: " + total);
    }
}`,
  })
);

// ── medium 3 ── Constructor Overloading (arity resolution)
codeQuestions.push(
  code({
    title: "Box Arity Constructor Choice",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: OVL,
    blacklist: "clone, Cloneable",
    whitelist: "Box(",
    description: `A timber yard sizes boxes by how many measurements the clerk enters: one number means a cube (all three sides equal), two numbers mean a flat box of the given length and width with height fixed at 1. Define class Box with fields length, width, height, a constructor Box(int side) that sets all three fields to side, and an overloaded constructor Box(int length, int width) that stores the two values and sets height to 1. Read the whole input line and let the number of integers decide which constructor runs. Print the volume via a volume() method.

Input Format:
One line containing either one integer side, or two integers length width.

Output Format:
One line: Volume: <volume>

Constraints:
the line has 1 or 2 integers, each 1..1000`,
    si1: "3", so1: "Volume: 27",
    si2: "4 5", so2: "Volume: 20",
    i1: "10", o1: "Volume: 1000",
    i2: "7 2", o2: "Volume: 14",
    i3: "6", o3: "Volume: 216",
    ic: "the line has 1 or 2 integers, each 1..1000",
    code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String line = sc.nextLine().trim();
        String[] parts = line.split(" ");
        Box box;
        if (parts.length == 1) {
            int side = Integer.parseInt(parts[0]);
            box = new Box(side);
        } else {
            int l = Integer.parseInt(parts[0]);
            int w = Integer.parseInt(parts[1]);
            box = new Box(l, w);
        }
        System.out.println("Volume: " + box.volume());
    }
}

class Box {
    int length;
    int width;
    int height;

    Box(int side) {
        length = side;
        width = side;
        height = side;
    }

    Box(int length, int width) {
        this.length = length;
        this.width = width;
        height = 1;
    }

    int volume() {
        return length * width * height;
    }
}`,
  })
);

// ── medium 4 ── Copy Constructors (independence)
codeQuestions.push(
  code({
    title: "Student Copy Independence",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: CPY,
    blacklist: "clone, Cloneable",
    whitelist: "Student(Student",
    description: `An exam cell keeps the original Student record untouched and works on a duplicate created with a copy constructor. Define class Student with fields name and marks, a parameterized constructor Student(String name, int marks), a copy constructor Student(Student other) that copies both fields, and a setMarks(int m) method. Read name, marks and newMarks; create the original, create a duplicate with the copy constructor, update only the duplicate's marks with setMarks, then print both records to prove the original never changed.

Input Format:
One line: name marks newMarks (name is a single word).

Output Format:
Line 1: Original: <name> <marks>
Line 2: Copy: <name> <newMarks>

Constraints:
1 <= name length <= 20, 0 <= marks <= 100, 0 <= newMarks <= 100`,
    si1: "Asha 80 95", so1: "Original: Asha 80\nCopy: Asha 95",
    si2: "Ravi 60 75", so2: "Original: Ravi 60\nCopy: Ravi 75",
    i1: "Meena 40 90", o1: "Original: Meena 40\nCopy: Meena 90",
    i2: "John 100 100", o2: "Original: John 100\nCopy: John 100",
    i3: "Zoya 55 61", o3: "Original: Zoya 55\nCopy: Zoya 61",
    ic: "1 <= name length <= 20, 0 <= marks <= 100, 0 <= newMarks <= 100",
    code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String name = sc.next();
        int marks = sc.nextInt();
        int newMarks = sc.nextInt();
        Student original = new Student(name, marks);
        Student duplicate = new Student(original);
        duplicate.setMarks(newMarks);
        System.out.println("Original: " + original.name + " " + original.marks);
        System.out.println("Copy: " + duplicate.name + " " + duplicate.marks);
    }
}

class Student {
    String name;
    int marks;

    Student(String name, int marks) {
        this.name = name;
        this.marks = marks;
    }

    Student(Student other) {
        this.name = other.name;
        this.marks = other.marks;
    }

    void setMarks(int m) {
        marks = m;
    }
}`,
  })
);

// ── medium 5 ── this Keyword (constructor chaining)
codeQuestions.push(
  code({
    title: "Order Chain Constructor Print",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: THS,
    blacklist: "super(",
    whitelist: "this(",
    description: `A warehouse logs every order at creation time. Define class Order with fields id and city, a constructor Order(int id) that stores the id and prints Base: <id>, and an overloaded constructor Order(int id, String city) that chains to the one-argument constructor with this(id) before storing the city and printing City: <city>. Read the whole input line: one integer creates a base order, an integer followed by a city word creates a tagged order. The chained construction must print the base line first, then the city line.

Input Format:
One line: either one integer id, or id and a city word.

Output Format:
Line 1: Base: <id>
Line 2 (only when a city is given): City: <city>

Constraints:
1 <= id <= 99999; city is a single word of length 1..20`,
    si1: "42", so1: "Base: 42",
    si2: "7 Delhi", so2: "Base: 7\nCity: Delhi",
    i1: "99 Mumbai", o1: "Base: 99\nCity: Mumbai",
    i2: "5", o2: "Base: 5",
    i3: "123 Pune", o3: "Base: 123\nCity: Pune",
    ic: "1 <= id <= 99999; city is a single word of length 1..20",
    code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String line = sc.nextLine().trim();
        String[] parts = line.split(" ");
        if (parts.length == 1) {
            new Order(Integer.parseInt(parts[0]));
        } else {
            new Order(Integer.parseInt(parts[0]), parts[1]);
        }
    }
}

class Order {
    int id;
    String city;

    Order(int id) {
        this.id = id;
        System.out.println("Base: " + id);
    }

    Order(int id, String city) {
        this(id);
        this.city = city;
        System.out.println("City: " + city);
    }
}`,
  })
);

// ── medium 6 ── this Keyword (shadowing)
codeQuestions.push(
  code({
    title: "Employee Shadow Salary",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: THS,
    blacklist: "super",
    whitelist: "this.",
    description: `Payroll wants the constructor parameters to carry the same names as the fields, so the this keyword is mandatory to reach the fields. Define class Employee with fields name and salary and a constructor Employee(String name, int salary) whose parameter names exactly match the fields; assign them via this.name and this.salary. Also write applyBonus(int bonus) that updates this.salary = this.salary + bonus. Read name, salary and bonus, construct the employee, apply the bonus, and print both fields.

Input Format:
One line: name salary bonus (name is a single word).

Output Format:
Line 1: Name: <name>
Line 2: Salary: <salary + bonus>

Constraints:
1 <= name length <= 20, 0 <= salary <= 100000, 0 <= bonus <= 1000`,
    si1: "Asha 5000 500", so1: "Name: Asha\nSalary: 5500",
    si2: "Ravi 3000 250", so2: "Name: Ravi\nSalary: 3250",
    i1: "Zoya 10000 0", o1: "Name: Zoya\nSalary: 10000",
    i2: "Inder 7500 999", o2: "Name: Inder\nSalary: 8499",
    i3: "Om 10 5", o3: "Name: Om\nSalary: 15",
    ic: "1 <= name length <= 20, 0 <= salary <= 100000, 0 <= bonus <= 1000",
    code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String name = sc.next();
        int salary = sc.nextInt();
        int bonus = sc.nextInt();
        Employee emp = new Employee(name, salary);
        emp.applyBonus(bonus);
        emp.print();
    }
}

class Employee {
    String name;
    int salary;

    Employee(String name, int salary) {
        this.name = name;
        this.salary = salary;
    }

    void applyBonus(int bonus) {
        this.salary = this.salary + bonus;
    }

    void print() {
        System.out.println("Name: " + name);
        System.out.println("Salary: " + salary);
    }
}`,
  })
);

// ── hard 1 ── Default Constructor (static creation counters)
codeQuestions.push(
  code({
    title: "Box Creation History Counter",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: DEF,
    blacklist: "ArrayList",
    whitelist: "static int",
    description: `A factory tracks how its boxes are built. Every Box constructor must count itself: the default constructor increments a static counter for default builds, the parameterized constructor increments a static counter for sized builds, and the copy constructor increments a static counter for copies. Define class Box with three static int counters (countDefault, countParam, countCopy) and field side. Box() sets side to 1 and counts as default; Box(int side) stores side and counts as parameterized; Box(Box other) copies the other box's side and counts as copy. Read the whole command line and process it left to right: D builds a default box, P followed by a number builds a parameterized box, C builds a copy of the most recently built box (the first command is always D or P, so a box to copy always exists). After all commands print the three counters.

Input Format:
One line of space-separated commands: D, P side, or C.

Output Format:
Line 1: Default: <countDefault>
Line 2: Parameterized: <countParam>
Line 3: Copy: <countCopy>

Constraints:
1 <= number of commands <= 100; the first command is D or P; 1 <= side <= 1000`,
    si1: "D P 5 C D C", so1: "Default: 2\nParameterized: 1\nCopy: 2",
    si2: "P 7 C", so2: "Default: 0\nParameterized: 1\nCopy: 1",
    i1: "D D D", o1: "Default: 3\nParameterized: 0\nCopy: 0",
    i2: "D C C", o2: "Default: 1\nParameterized: 0\nCopy: 2",
    i3: "P 2 D P 3 C C D", o3: "Default: 2\nParameterized: 2\nCopy: 2",
    ic: "1 <= number of commands <= 100; the first command is D or P; 1 <= side <= 1000",
    code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String line = sc.nextLine().trim();
        String[] parts = line.split(" ");
        Box last = null;
        for (int i = 0; i < parts.length; i++) {
            String cmd = parts[i];
            if (cmd.equals("D")) {
                last = new Box();
            } else if (cmd.equals("P")) {
                i++;
                int side = Integer.parseInt(parts[i]);
                last = new Box(side);
            } else {
                last = new Box(last);
            }
        }
        System.out.println("Default: " + Box.countDefault);
        System.out.println("Parameterized: " + Box.countParam);
        System.out.println("Copy: " + Box.countCopy);
    }
}

class Box {
    static int countDefault = 0;
    static int countParam = 0;
    static int countCopy = 0;
    int side;

    Box() {
        countDefault = countDefault + 1;
        side = 1;
    }

    Box(int side) {
        countParam = countParam + 1;
        this.side = side;
    }

    Box(Box other) {
        countCopy = countCopy + 1;
        this.side = other.side;
    }
}`,
  })
);

// ── hard 2 ── Copy Constructors (immutable-style Money)
codeQuestions.push(
  code({
    title: "Money Copy Add Method",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: CPY,
    blacklist: "clone, Cloneable",
    whitelist: "Money(Money",
    description: `A wallet app models money with a class whose add operation never mutates its operands: Money add(Money other) builds the result as a copy of the current object using the copy constructor and then increases the copy by the other amount. Define class Money with field amount, a parameterized constructor Money(int amount), a copy constructor Money(Money other), and the add method as described (it returns a new Money). Read two amounts, build first and second, compute total = first.add(second), and print both operands and the total to show the operands were untouched.

Input Format:
One line: two space-separated integers.

Output Format:
Line 1: First: <first amount>
Line 2: Second: <second amount>
Line 3: Total: <sum>

Constraints:
0 <= amount <= 100000`,
    si1: "100 250", so1: "First: 100\nSecond: 250\nTotal: 350",
    si2: "500 500", so2: "First: 500\nSecond: 500\nTotal: 1000",
    i1: "0 0", o1: "First: 0\nSecond: 0\nTotal: 0",
    i2: "999 1", o2: "First: 999\nSecond: 1\nTotal: 1000",
    i3: "12345 6789", o3: "First: 12345\nSecond: 6789\nTotal: 19134",
    ic: "0 <= amount <= 100000",
    code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        Money first = new Money(a);
        Money second = new Money(b);
        Money total = first.add(second);
        System.out.println("First: " + first.amount);
        System.out.println("Second: " + second.amount);
        System.out.println("Total: " + total.amount);
    }
}

class Money {
    int amount;

    Money(int amount) {
        this.amount = amount;
    }

    Money(Money other) {
        this.amount = other.amount;
    }

    Money add(Money other) {
        Money result = new Money(this.amount);
        result.amount = result.amount + other.amount;
        return result;
    }
}`,
  })
);

// ── hard 3 ── this Keyword (chained logger trail)
codeQuestions.push(
  code({
    title: "Logger Chain Trail",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: THS,
    blacklist: "ArrayList",
    whitelist: "this(",
    description: `A monitoring tool records construction steps in a static trail string. Define class ChainLogger with a static String trail that starts empty. The base constructor ChainLogger() appends the letter B to the trail. The tagged constructor ChainLogger(String tag) first chains to the base constructor with this() (which appends B) and then appends the letter T itself. Read the whole command line and process it left to right: B constructs a base logger, T followed by a tag word constructs a tagged logger. Because of chaining, every tagged construction adds BOTH letters, B then T. Finally print the trail.

Input Format:
One line of space-separated commands: B, or T tag.

Output Format:
One line: the trail string made of the letters B and T in creation order.

Constraints:
1 <= number of commands <= 50; every T is followed by one tag word of length 1..20`,
    si1: "B T Ops B", so1: "BBTB",
    si2: "B B", so2: "BB",
    i1: "T Sys", o1: "BT",
    i2: "B T Net T Net", o2: "BBTBT",
    i3: "T A T A", o3: "BTBT",
    ic: "1 <= number of commands <= 50; every T is followed by one tag word of length 1..20",
    code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String line = sc.nextLine().trim();
        String[] parts = line.split(" ");
        for (int i = 0; i < parts.length; i++) {
            String cmd = parts[i];
            if (cmd.equals("B")) {
                new ChainLogger();
            } else {
                i++;
                new ChainLogger(parts[i]);
            }
        }
        System.out.println(ChainLogger.trail);
    }
}

class ChainLogger {
    static String trail = "";

    ChainLogger() {
        trail = trail + "B";
    }

    ChainLogger(String tag) {
        this();
        trail = trail + "T";
    }
}`,
  })
);

// ── hard 4 ── Constructor Overloading (smallest fitting constructor)
codeQuestions.push(
  code({
    title: "Product Catalog Constructor Fit",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: OVL,
    blacklist: "Map",
    whitelist: "Product(",
    description: `A stockroom builds its catalog by handing each item to the smallest constructor that fits the data given: a bare name uses Product(String name) leaving price and qty at 0, a name with a price uses Product(String name, int price) leaving qty at 0, and a name with price and quantity uses Product(String name, int price, int qty). Define class Product with fields name, price, qty and these three overloaded constructors. Read n, then read n item lines (each with 1, 2 or 3 space-separated values) and build each product with the fitting constructor. Finally print every item.

Input Format:
Line 1: integer n. Next n lines: a name, or name price, or name price qty.

Output Format:
n lines, one per product: Item: <name>, Price: <price>, Qty: <qty>

Constraints:
1 <= n <= 100; 1 <= name length <= 20; 0 <= price <= 10000; 0 <= qty <= 1000`,
    si1: "3\nPen\nNotebook 45\nMarker 25 10",
    so1: "Item: Pen, Price: 0, Qty: 0\nItem: Notebook, Price: 45, Qty: 0\nItem: Marker, Price: 25, Qty: 10",
    si2: "2\nStapler 120 3\nClip",
    so2: "Item: Stapler, Price: 120, Qty: 3\nItem: Clip, Price: 0, Qty: 0",
    i1: "1\nEraser 10 2", o1: "Item: Eraser, Price: 10, Qty: 2",
    i2: "3\nRuler\nScale 15\nBrush 30 5",
    o2: "Item: Ruler, Price: 0, Qty: 0\nItem: Scale, Price: 15, Qty: 0\nItem: Brush, Price: 30, Qty: 5",
    i3: "2\nGlue 60 1\nTape",
    o3: "Item: Glue, Price: 60, Qty: 1\nItem: Tape, Price: 0, Qty: 0",
    ic: "1 <= n <= 100; 1 <= name length <= 20; 0 <= price <= 10000; 0 <= qty <= 1000",
    code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = Integer.parseInt(sc.nextLine().trim());
        Product[] items = new Product[n];
        for (int i = 0; i < n; i++) {
            String[] parts = sc.nextLine().trim().split(" ");
            if (parts.length == 1) {
                items[i] = new Product(parts[0]);
            } else if (parts.length == 2) {
                items[i] = new Product(parts[0], Integer.parseInt(parts[1]));
            } else {
                items[i] = new Product(parts[0], Integer.parseInt(parts[1]), Integer.parseInt(parts[2]));
            }
        }
        for (int i = 0; i < n; i++) {
            items[i].print();
        }
    }
}

class Product {
    String name;
    int price;
    int qty;

    Product(String name) {
        this.name = name;
        this.price = 0;
        this.qty = 0;
    }

    Product(String name, int price) {
        this.name = name;
        this.price = price;
        this.qty = 0;
    }

    Product(String name, int price, int qty) {
        this.name = name;
        this.price = price;
        this.qty = qty;
    }

    void print() {
        System.out.println("Item: " + name + ", Price: " + price + ", Qty: " + qty);
    }
}`,
  })
);

/* ────────────────────────────── MCQ QUESTIONS ────────────────────────────── */

const mcqQuestions = [];

// easy 1
mcqQuestions.push(
  mcq({
    title: "What a Constructor Is",
    difficulty: "easy",
    subtopic: DEF,
    description: "A constructor in Java is best described as:",
    o: [
      "An ordinary method that must be called manually after the object exists",
      "A special member that shares the class name and runs automatically when an object is created with new",
      "A keyword that releases the memory of a destroyed object",
      "A static block that runs when the class is loaded",
    ],
    c: 2,
  })
);

// easy 2
mcqQuestions.push(
  mcq({
    title: "Constructor Declaration Rule",
    difficulty: "easy",
    subtopic: DEF,
    description: "For a class named Book, which of the following is a VALID constructor declaration?",
    o: [
      "public Book()",
      "public void Book()",
      "public int Book()",
      "public static Book()",
    ],
    c: 1,
  })
);

// easy 3
mcqQuestions.push(
  mcq({
    title: "Who Provides the Default",
    difficulty: "easy",
    subtopic: DEF,
    description: "Under which condition does the Java compiler supply a default (no-argument) constructor?",
    o: [
      "For every class, always",
      "Only when the class declares no constructor at all",
      "Only when the class has a parameterized constructor",
      "Only when objects are created inside main()",
    ],
    c: 2,
  })
);

// easy 4
mcqQuestions.push(
  mcq({
    title: "Parameterized Constructor Purpose",
    difficulty: "easy",
    subtopic: PAR,
    description: "A parameterized constructor is mainly used to:",
    o: [
      "Initialize each new object with values supplied at creation time",
      "Create an exact duplicate of an existing object",
      "Remove unused objects from memory",
      "Give default values that can never be changed",
    ],
    c: 1,
  })
);

// easy 5
mcqQuestions.push(
  mcq({
    title: "Overloading Difference Rule",
    difficulty: "easy",
    subtopic: OVL,
    description: "Two constructors of the same class are considered overloaded when they differ in:",
    o: [
      "Their return type only",
      "The spelling of the class name",
      "The number, types or order of their parameters",
      "Only the access modifier",
    ],
    c: 3,
  })
);

// easy 6
mcqQuestions.push(
  mcq({
    title: "Copy Constructor Availability",
    difficulty: "easy",
    subtopic: CPY,
    description: "Which statement about copy constructors in Java is TRUE?",
    o: [
      "Java has no built-in copy constructor; programmers write one that takes an object of the same class as its argument",
      "Java automatically generates a copy constructor for every class",
      "A copy constructor must be declared static",
      "Object.clone() serves as the copy constructor of every class",
    ],
    c: 1,
  })
);

// easy 7
mcqQuestions.push(
  mcq({
    title: "this Keyword Target",
    difficulty: "easy",
    subtopic: THS,
    description: "Inside an instance method or constructor, the keyword this refers to:",
    o: [
      "The parent class object",
      "The current object on which the code is executing",
      "The class metadata loaded by the JVM",
      "The most recently created object of any class",
    ],
    c: 2,
  })
);

// easy 8
mcqQuestions.push(
  mcq({
    title: "Creating with Arguments",
    difficulty: "easy",
    subtopic: PAR,
    description: "Given String name and int rollNo variables, which statement correctly creates a Student object through a parameterized constructor?",
    o: [
      "Student s = Student(name, rollNo);",
      "Student s = new Student();",
      "Student s = new Student(name, rollNo);",
      "Student s = new Student[name, rollNo];",
    ],
    c: 3,
  })
);

// easy 9
mcqQuestions.push(
  mcq({
    title: "Uninitialized Field Value",
    difficulty: "easy",
    subtopic: DEF,
    description: "Right after memory for a new object is allocated, but before the constructor body assigns anything, an uninitialized int field holds:",
    o: [
      "0",
      "A random garbage value",
      "null",
      "1",
    ],
    c: 1,
  })
);

// easy 10
mcqQuestions.push(
  mcq({
    title: "One new One Call",
    difficulty: "easy",
    subtopic: DEF,
    description: "When the statement new Student() runs, how many times does a constructor execute for that object?",
    o: [
      "Once for every field of the class",
      "Twice: once before and once after memory allocation",
      "Zero times when the class declares no constructor",
      "Exactly once",
    ],
    c: 4,
  })
);

// medium 1 (snippet)
mcqQuestions.push(
  mcq({
    title: "Auto Default Constructor Output",
    difficulty: "medium",
    subtopic: DEF,
    description: "The class Box declares no constructor at all. The program is compiled and run. What is printed?",
    snip: `class Box {
    int side;
}

public class Main {
    public static void main(String[] args) {
        Box b = new Box();
        System.out.println(b.side);
    }
}`,
    o: [
      "A garbage value that changes each run",
      "0",
      "Compile error: Box has no constructor",
      "null",
    ],
    c: 2,
  })
);

// medium 2 (snippet)
mcqQuestions.push(
  mcq({
    title: "this Call Position Rule",
    difficulty: "medium",
    subtopic: THS,
    description: "The constructor Test() calls this(5) after a print statement. What happens when the program is compiled and run?",
    snip: `class Test {
    int x;

    Test() {
        System.out.println("start");
        this(5);
    }

    Test(int x) {
        this.x = x;
    }
}

public class Main {
    public static void main(String[] args) {
        new Test();
    }
}`,
    o: [
      "Compile error: call to this must be first statement in constructor",
      "It prints start and then runs normally",
      "It prints start only and skips the chained constructor",
      "Runtime exception at the this(5) line",
    ],
    c: 1,
  })
);

// medium 3 (snippet)
mcqQuestions.push(
  mcq({
    title: "Chained Constructor Print Order",
    difficulty: "medium",
    subtopic: THS,
    description: "The two constructors chain with this(). What is the exact output of the program?",
    snip: `class Device {
    Device() {
        System.out.println("step1");
    }

    Device(String name) {
        this();
        System.out.println("step2");
    }
}

public class Main {
    public static void main(String[] args) {
        new Device("cam");
    }
}`,
    o: [
      "step2 then step1",
      "Only step2",
      "step1 then step2",
      "Only step1",
    ],
    c: 3,
  })
);

// medium 4 (snippet)
mcqQuestions.push(
  mcq({
    title: "Overload Resolution at new",
    difficulty: "medium",
    subtopic: OVL,
    description: "Two overloaded constructors exist. What is the exact output of the program?",
    snip: `class Temp {
    Temp(int c) {
        System.out.println("int " + c);
    }

    Temp(String s) {
        System.out.println("str " + s);
    }
}

public class Main {
    public static void main(String[] args) {
        Temp a = new Temp(7);
        Temp b = new Temp("hot");
    }
}`,
    o: [
      "str hot then int 7",
      "int 7 twice",
      "Compile error: ambiguous constructors",
      "int 7 then str hot",
    ],
    c: 4,
  })
);

// medium 5
mcqQuestions.push(
  mcq({
    title: "Copy Constructor Signature",
    difficulty: "medium",
    subtopic: CPY,
    description: "For a class Student with a String field name, which declaration is a correctly written copy constructor?",
    o: [
      "void Student(Student s) { name = s.name; }",
      "Student(Student s) { name = s.name; }",
      "static Student(Student s) { name = s.name; }",
      "Student(Copy s) { name = s.name; }",
    ],
    c: 2,
  })
);

// medium 6 (snippet)
mcqQuestions.push(
  mcq({
    title: "Copy Leaves Original Untouched",
    difficulty: "medium",
    subtopic: CPY,
    description: "p2 is built with the copy constructor and then changed. What is the exact output of the program?",
    snip: `class Point {
    int x;

    Point(int x) {
        this.x = x;
    }

    Point(Point p) {
        this.x = p.x;
    }
}

public class Main {
    public static void main(String[] args) {
        Point p1 = new Point(4);
        Point p2 = new Point(p1);
        p2.x = 99;
        System.out.println(p1.x);
        System.out.println(p2.x);
    }
}`,
    o: [
      "4 followed by 99",
      "99 followed by 99",
      "4 followed by 4",
      "99 followed by 4",
    ],
    c: 1,
  })
);

// hard 1 (snippet)
mcqQuestions.push(
  mcq({
    title: "Void Constructor Trap",
    difficulty: "hard",
    subtopic: DEF,
    description: "Careful: the method named Demo has a void return type, so it is NOT a constructor. What is the exact output of the program?",
    snip: `class Demo {
    void Demo() {
        System.out.println("made");
    }
}

public class Main {
    public static void main(String[] args) {
        Demo d = new Demo();
        System.out.println("done");
    }
}`,
    o: [
      "made then done",
      "Compile error: invalid constructor declaration",
      "done only",
      "made only",
    ],
    c: 3,
  })
);

// hard 2 (snippet)
mcqQuestions.push(
  mcq({
    title: "Field Initializer Timing",
    difficulty: "hard",
    subtopic: DEF,
    description: "Field initializers run before the constructor body. What is the exact output of the program?",
    snip: `class Score {
    int value = 5;

    Score() {
        System.out.println("body " + value);
        value = 9;
    }
}

public class Main {
    public static void main(String[] args) {
        Score s = new Score();
        System.out.println("end " + s.value);
    }
}`,
    o: [
      "body 0 then end 9",
      "body 5 then end 9",
      "body 9 then end 9",
      "Compile error: value used before assignment",
    ],
    c: 2,
  })
);

// hard 3 (snippet)
mcqQuestions.push(
  mcq({
    title: "Private Constructor Access",
    difficulty: "hard",
    subtopic: DEF,
    description: "The Vault constructor is private. What happens when the program is compiled and run?",
    snip: `class Vault {
    private Vault() {
        System.out.println("unlocked");
    }
}

public class Main {
    public static void main(String[] args) {
        Vault v = new Vault();
    }
}`,
    o: [
      "Compile error: Vault() has private access in Vault",
      "It prints unlocked",
      "It prints nothing",
      "Runtime exception when new Vault() runs",
    ],
    c: 1,
  })
);

// hard 4
mcqQuestions.push(
  mcq({
    title: "Overloaded Not Overridden",
    difficulty: "hard",
    subtopic: OVL,
    description: "Which statement about constructors is TRUE?",
    o: [
      "Constructors can be overridden like ordinary methods",
      "Constructors can be overloaded but cannot be inherited or overridden",
      "Constructors are inherited automatically by every subclass",
      "A constructor can be invoked directly on an object, like obj.Constructor()",
    ],
    c: 2,
  })
);

/* ────────────────────────────── SELF-CHECKS + WRITE ───────────────────────── */

let errs = [];
for (const q of codeQuestions) {
  if (q.sourcecode.includes("\\")) errs.push(`code backslash: ${q.title}`);
  if (!q.sourcecode.includes("class Main")) errs.push(`no Main: ${q.title}`);
  for (const [field, want] of [["blacklist", false], ["whitelist", true]]) {
    const items = String(q[field] || "").split(",").map((s) => s.trim()).filter(Boolean);
    for (const kw of items) {
      const present = q.sourcecode.includes(kw);
      if (want === false && present) errs.push(`blacklisted "${kw}" in ${q.title}`);
      if (want === true && !present) errs.push(`whitelisted "${kw}" missing in ${q.title}`);
    }
  }
}
for (const q of mcqQuestions) {
  if (q.iscodesnippet && q.codesnippet.includes("\\")) errs.push(`snippet backslash: ${q.title}`);
  const opts = [q.Option1, q.Option2, q.Option3, q.Option4].map((s) => String(s).trim());
  if (new Set(opts).size !== 4) errs.push(`duplicate options: ${q.title}`);
  if (q.CorrectOption < 1 || q.CorrectOption > 4) errs.push(`bad CorrectOption: ${q.title}`);
  if (opts.some((s) => s.length === 0)) errs.push(`empty option: ${q.title}`);
}
const titles = codeQuestions.map((q) => q.title).concat(mcqQuestions.map((q) => q.title));
if (new Set(titles).size !== titles.length) errs.push("duplicate titles within day 12");
const counts = { easy: 0, medium: 0, hard: 0 };
for (const q of codeQuestions) counts[q.difficulty]++;
if (counts.easy !== 10 || counts.medium !== 6 || counts.hard !== 4) errs.push(`code difficulty split: ${JSON.stringify(counts)}`);
const mcounts = { easy: 0, medium: 0, hard: 0 };
for (const q of mcqQuestions) mcounts[q.difficulty]++;
if (mcounts.easy !== 10 || mcounts.medium !== 6 || mcounts.hard !== 4) errs.push(`mcq difficulty split: ${JSON.stringify(mcounts)}`);
const basics = codeQuestions.filter((q) => q.difficulty === "easy" && q.variant === "basic").length;
const scen = codeQuestions.filter((q) => q.difficulty === "easy" && q.variant === "scenario").length;
if (basics !== 6 || scen !== 4) errs.push(`easy variant split: basic=${basics} scenario=${scen}`);
const subCount = {};
for (const q of codeQuestions) subCount[q.subtopic] = (subCount[q.subtopic] || 0) + 1;
for (const s of [DEF, PAR, OVL, CPY, THS]) {
  if (!subCount[s] || subCount[s] < 1) errs.push(`subtopic not covered: ${s}`);
}
const snippets = mcqQuestions.filter((q) => q.iscodesnippet).length;
if (snippets < 6) errs.push(`too few snippets: ${snippets}`);

if (errs.length) {
  console.error("SELF-CHECK FAILED:");
  for (const e of errs) console.error("  - " + e);
  process.exit(1);
}

fs.writeFileSync(path.join(here, "day-12.code.p1.json"), JSON.stringify({ day: 12, topics, questions: codeQuestions.slice(0, 10) }, null, 2) + "\n");
fs.writeFileSync(path.join(here, "day-12.code.p2.json"), JSON.stringify({ questions: codeQuestions.slice(10) }, null, 2) + "\n");
fs.writeFileSync(path.join(here, "day-12.mcq.p1.json"), JSON.stringify({ day: 12, questions: mcqQuestions.slice(0, 10) }, null, 2) + "\n");
fs.writeFileSync(path.join(here, "day-12.mcq.p2.json"), JSON.stringify({ questions: mcqQuestions.slice(10) }, null, 2) + "\n");

console.log("wrote day-12 code parts:", codeQuestions.length, "questions; mcq parts:", mcqQuestions.length, "questions");
console.log("subtopic coverage:", JSON.stringify(subCount));
console.log("mcq snippets:", snippets);
