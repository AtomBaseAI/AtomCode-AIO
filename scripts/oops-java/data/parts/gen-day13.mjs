/**
 * Generator for Day 13 - "Inheritance and Interfaces".
 *
 * Writes:
 *   data/parts/day-13.code.p1.json  (day + topics + first 10 code questions)
 *   data/parts/day-13.code.p2.json  (last 10 code questions)
 *   data/parts/day-13.mcq.p1.json   (day + first 10 MCQs)
 *   data/parts/day-13.mcq.p2.json   (last 10 MCQs)
 *
 * Run: bun scripts/oops-java/data/parts/gen-day13.mjs
 * Then merge with scripts/oops-java/merge-parts.ts.
 */

import fs from "node:fs";
import path from "node:path";

const dir = new URL(".", import.meta.url).pathname;

const TOPIC = "Inheritance and Interfaces";
const SUB = {
  single: "Single and Multilevel Inheritance",
  hier: "Hierarchical Inheritance",
  abs: "Abstract Classes",
  iface: "Interfaces",
  multi: "Multiple Inheritance via Interfaces",
  sup: "super Keyword",
};

const topics = [
  {
    name: TOPIC,
    subtopics: [SUB.single, SUB.hier, SUB.abs, SUB.iface, SUB.multi, SUB.sup],
  },
];

function cq(o) {
  return { lang: "java", topic: TOPIC, ...o };
}

function mq(o) {
  return { topic: TOPIC, ...o };
}

/* ============================================================
 * CODE QUESTIONS - Part 1 (Q1 - Q10, all easy)
 * ============================================================ */

const codeP1 = [
  cq({
    title: "Single Inheritance Pet Sounds",
    description:
      "The pet clinic wants a tiny inheritance demo. Define a class Animal with a field name and a method eat() that prints: <name> eats food. Define a class Dog that extends Animal and adds a method bark() that prints: <name> says woof. In main, read the dog's name into a Dog object, then call eat() (inherited from Animal) and bark() (defined in Dog itself).\n\nInput Format:\nA single line with one word: the dog's name.\n\nOutput Format:\nLine 1: <name> eats food\nLine 2: <name> says woof\n\nConstraints:\n1 <= name length <= 50 (single word)",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: SUB.single,
    sampleinput1: "Tommy",
    sampleoutput1: "Tommy eats food\nTommy says woof",
    sampleinput2: "Sheru",
    sampleoutput2: "Sheru eats food\nSheru says woof",
    input1: "Bruno",
    output1: "Bruno eats food\nBruno says woof",
    input2: "Cesar",
    output2: "Cesar eats food\nCesar says woof",
    input3: "Kitty",
    output3: "Kitty eats food\nKitty says woof",
    inputconstrains: "1 <= name length <= 50",
    blacklist: "",
    whitelist: "",
    sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Dog d = new Dog();
        d.name = sc.next();
        d.eat();
        d.bark();
    }
}

class Animal {
    String name;

    void eat() {
        System.out.println(name + " eats food");
    }
}

class Dog extends Animal {
    void bark() {
        System.out.println(name + " says woof");
    }
}`,
  }),
  cq({
    title: "Multilevel Device Boot Chain",
    description:
      "A gadget factory models a three-level chain: Device, then Laptop, then GamingLaptop. Define class Device with a field brand and a method powerOn() that prints: <brand> powering on. Define class Laptop that extends Device with a method boot() that prints: <brand> booting OS. Define class GamingLaptop that extends Laptop with a method boost() that prints: <brand> boosting GPU. In main, read the brand, create one GamingLaptop object, and call powerOn(), boot() and boost() on it - two of them are inherited through the multilevel chain.\n\nInput Format:\nA single line with one word: the brand.\n\nOutput Format:\nLine 1: <brand> powering on\nLine 2: <brand> booting OS\nLine 3: <brand> boosting GPU\n\nConstraints:\n1 <= brand length <= 50 (single word)",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: SUB.single,
    sampleinput1: "Asus",
    sampleoutput1: "Asus powering on\nAsus booting OS\nAsus boosting GPU",
    sampleinput2: "Dell",
    sampleoutput2: "Dell powering on\nDell booting OS\nDell boosting GPU",
    input1: "HP",
    output1: "HP powering on\nHP booting OS\nHP boosting GPU",
    input2: "Lenovo",
    output2: "Lenovo powering on\nLenovo booting OS\nLenovo boosting GPU",
    input3: "Acer",
    output3: "Acer powering on\nAcer booting OS\nAcer boosting GPU",
    inputconstrains: "1 <= brand length <= 50",
    blacklist: "",
    whitelist: "",
    sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        GamingLaptop g = new GamingLaptop();
        g.brand = sc.next();
        g.powerOn();
        g.boot();
        g.boost();
    }
}

class Device {
    String brand;

    void powerOn() {
        System.out.println(brand + " powering on");
    }
}

class Laptop extends Device {
    void boot() {
        System.out.println(brand + " booting OS");
    }
}

class GamingLaptop extends Laptop {
    void boost() {
        System.out.println(brand + " boosting GPU");
    }
}`,
  }),
  cq({
    title: "Sibling Shape Areas",
    description:
      "One Shape parent, two different child shapes - hierarchical inheritance. Define a base class Shape with a field title. Define class Triangle that extends Shape with fields base and height and a method area() returning 0.5 * base * height. Define class Square that extends Shape with field side and a method area() returning side * side. In main, read the triangle base, triangle height and square side, set each object's inherited title (Triangle and Square), and print both areas with 2 decimals.\n\nInput Format:\nA single line with three numbers: triangleBase triangleHeight squareSide.\n\nOutput Format:\nLine 1: Triangle area: <area with 2 decimals>\nLine 2: Square area: <area with 2 decimals>\n\nConstraints:\n0 < base, height, side <= 1000",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: SUB.hier,
    sampleinput1: "3 4 4",
    sampleoutput1: "Triangle area: 6.00\nSquare area: 16.00",
    sampleinput2: "5 2 3",
    sampleoutput2: "Triangle area: 5.00\nSquare area: 9.00",
    input1: "10 1 2",
    output1: "Triangle area: 5.00\nSquare area: 4.00",
    input2: "6 3 5",
    output2: "Triangle area: 9.00\nSquare area: 25.00",
    input3: "8 3.5 2.5",
    output3: "Triangle area: 14.00\nSquare area: 6.25",
    inputconstrains: "0 < base, height, side <= 1000",
    blacklist: "",
    whitelist: "",
    sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Triangle t = new Triangle();
        Square s = new Square();
        t.title = "Triangle";
        s.title = "Square";
        t.base = sc.nextDouble();
        t.height = sc.nextDouble();
        s.side = sc.nextDouble();
        System.out.printf(t.title + " area: %.2f%n", t.area());
        System.out.printf(s.title + " area: %.2f%n", s.area());
    }
}

class Shape {
    String title;
}

class Triangle extends Shape {
    double base;
    double height;

    double area() {
        return 0.5 * base * height;
    }
}

class Square extends Shape {
    double side;

    double area() {
        return side * side;
    }
}`,
  }),
  cq({
    title: "Abstract Shape Concrete Circle",
    description:
      "An abstract class defines what a shape can do; subclasses decide how. Define an abstract class Shape with a field radius, a concrete method describe() that prints: This is a shape, and an abstract method area(). Define class Circle that extends Shape and implements area() as Math.PI * radius * radius. In main, read the radius into a Circle object held in a Shape reference, call describe() and print the area with 2 decimals.\n\nInput Format:\nA single line with one number: the radius r.\n\nOutput Format:\nLine 1: This is a shape\nLine 2: Area: <area with 2 decimals>\n\nConstraints:\n0 < r <= 10000",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: SUB.abs,
    sampleinput1: "5",
    sampleoutput1: "This is a shape\nArea: 78.54",
    sampleinput2: "2",
    sampleoutput2: "This is a shape\nArea: 12.57",
    input1: "1",
    output1: "This is a shape\nArea: 3.14",
    input2: "2.5",
    output2: "This is a shape\nArea: 19.63",
    input3: "10",
    output3: "This is a shape\nArea: 314.16",
    inputconstrains: "0 < r <= 10000",
    blacklist: "",
    whitelist: "",
    sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Shape sh = new Circle();
        sh.radius = sc.nextDouble();
        sh.describe();
        System.out.printf("Area: %.2f%n", sh.area());
    }
}

abstract class Shape {
    double radius;

    void describe() {
        System.out.println("This is a shape");
    }

    abstract double area();
}

class Circle extends Shape {
    double area() {
        return Math.PI * radius * radius;
    }
}`,
  }),
  cq({
    title: "Printable Badge Interface",
    description:
      "An interface is a contract: whoever implements it must provide the methods. Define an interface Printable with a method void print(). Define class Badge that implements Printable with a field label and a print() method that prints: Printed: <label>. In main, read the label, store it in a Badge object, hold it in a Printable reference and call print().\n\nInput Format:\nA single line with one word: the badge label.\n\nOutput Format:\nPrint one line: Printed: <label>\n\nConstraints:\n1 <= label length <= 50 (single word)",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: SUB.iface,
    sampleinput1: "Gold",
    sampleoutput1: "Printed: Gold",
    sampleinput2: "VIP2024",
    sampleoutput2: "Printed: VIP2024",
    input1: "Sponsor",
    output1: "Printed: Sponsor",
    input2: "DevOps",
    output2: "Printed: DevOps",
    input3: "Speaker",
    output3: "Printed: Speaker",
    inputconstrains: "1 <= label length <= 50",
    blacklist: "",
    whitelist: "",
    sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Badge b = new Badge();
        b.label = sc.next();
        Printable p = b;
        p.print();
    }
}

interface Printable {
    void print();
}

class Badge implements Printable {
    String label;

    public void print() {
        System.out.println("Printed: " + label);
    }
}`,
  }),
  cq({
    title: "Super Show Extended Profile",
    description:
      "super.method() lets a subclass reuse the parent's behavior and then add its own. Define class Employee with a field name and a method show() that prints: Profile: <name>. Define class Developer that extends Employee and overrides show() to first call super.show() and then print: Skills: Java. In main, read the name into a Developer object and call show().\n\nInput Format:\nA single line with one word: the employee name.\n\nOutput Format:\nLine 1: Profile: <name>\nLine 2: Skills: Java\n\nConstraints:\n1 <= name length <= 50 (single word)",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: SUB.sup,
    sampleinput1: "Asha",
    sampleoutput1: "Profile: Asha\nSkills: Java",
    sampleinput2: "Vikram",
    sampleoutput2: "Profile: Vikram\nSkills: Java",
    input1: "Meera",
    output1: "Profile: Meera\nSkills: Java",
    input2: "Rohan",
    output2: "Profile: Rohan\nSkills: Java",
    input3: "Isha",
    output3: "Profile: Isha\nSkills: Java",
    inputconstrains: "1 <= name length <= 50",
    blacklist: "",
    whitelist: "",
    sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Developer d = new Developer();
        d.name = sc.next();
        d.show();
    }
}

class Employee {
    String name;

    void show() {
        System.out.println("Profile: " + name);
    }
}

class Developer extends Employee {
    void show() {
        super.show();
        System.out.println("Skills: Java");
    }
}`,
  }),
  cq({
    title: "Manager Bonus Payroll Screen",
    description:
      "The payroll screen of a startup lists every manager twice: the base income inherited from the Employee class and the total after adding the manager's bonus. Define class Employee with fields name and salary and a method income() that returns salary. Define class Manager that extends Employee with an extra field bonus and a method total() that returns salary + bonus. In main, read name, salary and bonus, and print both amounts with 2 decimals.\n\nInput Format:\nA single line with three values: name salary bonus (name is one word).\n\nOutput Format:\nLine 1: Income: <salary with 2 decimals>\nLine 2: Total: <salary + bonus with 2 decimals>\n\nConstraints:\n0 < salary, bonus <= 1000000",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: SUB.single,
    sampleinput1: "Riya 50000 10000",
    sampleoutput1: "Income: 50000.00\nTotal: 60000.00",
    sampleinput2: "Arjun 40000 8000",
    sampleoutput2: "Income: 40000.00\nTotal: 48000.00",
    input1: "Neha 55000 5000",
    output1: "Income: 55000.00\nTotal: 60000.00",
    input2: "Dev 30000 15000",
    output2: "Income: 30000.00\nTotal: 45000.00",
    input3: "Tara 72000 900.5",
    output3: "Income: 72000.00\nTotal: 72900.50",
    inputconstrains: "0 < salary, bonus <= 1000000",
    blacklist: "",
    whitelist: "",
    sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Manager m = new Manager();
        m.name = sc.next();
        m.salary = sc.nextDouble();
        m.bonus = sc.nextDouble();
        System.out.printf("Income: %.2f%n", m.income());
        System.out.printf("Total: %.2f%n", m.total());
    }
}

class Employee {
    String name;
    double salary;

    double income() {
        return salary;
    }
}

class Manager extends Employee {
    double bonus;

    double total() {
        return salary + bonus;
    }
}`,
  }),
  cq({
    title: "Rental Bike Inherited Specs",
    description:
      "A rental shop lists each bike's specs; the shared fields come from the parent class. Define class Vehicle with fields brand (String) and wheels (int). Define class Bike that extends Vehicle with an extra field gears and a method specs() that prints Brand: <brand>, Wheels: <wheels> and Gears: <gears> on three lines. In main, read brand, wheels and gears into a Bike object and call specs().\n\nInput Format:\nA single line with three values: brand wheels gears (brand is one word).\n\nOutput Format:\nLine 1: Brand: <brand>\nLine 2: Wheels: <wheels>\nLine 3: Gears: <gears>\n\nConstraints:\n1 <= brand length <= 30, 1 <= wheels <= 4, 1 <= gears <= 10",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: SUB.single,
    sampleinput1: "Hero 2 5",
    sampleoutput1: "Brand: Hero\nWheels: 2\nGears: 5",
    sampleinput2: "Bajaj 2 4",
    sampleoutput2: "Brand: Bajaj\nWheels: 2\nGears: 4",
    input1: "Yamaha 2 6",
    output1: "Brand: Yamaha\nWheels: 2\nGears: 6",
    input2: "TVS 2 4",
    output2: "Brand: TVS\nWheels: 2\nGears: 4",
    input3: "Honda 2 5",
    output3: "Brand: Honda\nWheels: 2\nGears: 5",
    inputconstrains: "1 <= brand length <= 30, 1 <= wheels <= 4, 1 <= gears <= 10",
    blacklist: "",
    whitelist: "",
    sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Bike bk = new Bike();
        bk.brand = sc.next();
        bk.wheels = sc.nextInt();
        bk.gears = sc.nextInt();
        bk.specs();
    }
}

class Vehicle {
    String brand;
    int wheels;
}

class Bike extends Vehicle {
    int gears;

    void specs() {
        System.out.println("Brand: " + brand);
        System.out.println("Wheels: " + wheels);
        System.out.println("Gears: " + gears);
    }
}`,
  }),
  cq({
    title: "Bank Account Type Chooser",
    description:
      "A bank offers two account flavors built on one base class - hierarchical inheritance. Define class Account with fields holder and balance. Define class SavingsAccount that extends Account with field rate and method addInterest() that adds balance * rate / 100 to balance. Define class CurrentAccount that extends Account with field fee and method applyFee() that subtracts fee from balance. In main read type (1 = savings, 2 = current), then holder, balance and the matching parameter, apply the operation, and print the holder and final balance with 2 decimals.\n\nInput Format:\nA single line: type holder balance param where type is 1 (param = rate) or 2 (param = fee); holder is one word.\n\nOutput Format:\nLine 1: Holder: <holder>\nLine 2: Balance: <final balance with 2 decimals>\n\nConstraints:\ntype is 1 or 2, 0 < balance <= 1000000, 0 <= rate, fee <= 100000",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: SUB.hier,
    sampleinput1: "1 Asha 1000 5",
    sampleoutput1: "Holder: Asha\nBalance: 1050.00",
    sampleinput2: "2 Raj 2000 250",
    sampleoutput2: "Holder: Raj\nBalance: 1750.00",
    input1: "1 Maya 800 2.5",
    output1: "Holder: Maya\nBalance: 820.00",
    input2: "2 Sam 1500 500",
    output2: "Holder: Sam\nBalance: 1000.00",
    input3: "1 Priya 5000 3",
    output3: "Holder: Priya\nBalance: 5150.00",
    inputconstrains: "type is 1 or 2, 0 < balance <= 1000000, 0 <= rate, fee <= 100000",
    blacklist: "",
    whitelist: "",
    sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int type = sc.nextInt();
        if (type == 1) {
            SavingsAccount sa = new SavingsAccount();
            sa.holder = sc.next();
            sa.balance = sc.nextDouble();
            sa.rate = sc.nextDouble();
            sa.addInterest();
            System.out.println("Holder: " + sa.holder);
            System.out.printf("Balance: %.2f%n", sa.balance);
        } else {
            CurrentAccount ca = new CurrentAccount();
            ca.holder = sc.next();
            ca.balance = sc.nextDouble();
            ca.fee = sc.nextDouble();
            ca.applyFee();
            System.out.println("Holder: " + ca.holder);
            System.out.printf("Balance: %.2f%n", ca.balance);
        }
    }
}

class Account {
    String holder;
    double balance;
}

class SavingsAccount extends Account {
    double rate;

    void addInterest() {
        balance = balance + balance * rate / 100.0;
    }
}

class CurrentAccount extends Account {
    double fee;

    void applyFee() {
        balance = balance - fee;
    }
}`,
  }),
  cq({
    title: "Geometry Report Abstract",
    description:
      "A geometry dashboard reports the area of whichever shape the user picks, using one abstract parent. Define an abstract class Shape with an abstract method area(). Define class CircleArea that extends Shape with field r and area() = Math.PI * r * r, and class RectArea that extends Shape with fields w and h and area() = w * h. In main read choice (1 = circle with radius, 2 = rectangle with width and height), build the matching object in a Shape reference and print its area with 2 decimals.\n\nInput Format:\nA single line: choice dims where choice 1 has one dimension (radius) and choice 2 has two (width height).\n\nOutput Format:\nPrint one line: Area: <area with 2 decimals>\n\nConstraints:\nchoice is 1 or 2, 0 < dimensions <= 10000",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: SUB.abs,
    sampleinput1: "1 3",
    sampleoutput1: "Area: 28.27",
    sampleinput2: "2 4 5",
    sampleoutput2: "Area: 20.00",
    input1: "2 2.5 4",
    output1: "Area: 10.00",
    input2: "1 2.5",
    output2: "Area: 19.63",
    input3: "2 10 10",
    output3: "Area: 100.00",
    inputconstrains: "choice is 1 or 2, 0 < dimensions <= 10000",
    blacklist: "",
    whitelist: "",
    sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int choice = sc.nextInt();
        Shape sh;
        if (choice == 1) {
            CircleArea c = new CircleArea();
            c.r = sc.nextDouble();
            sh = c;
        } else {
            RectArea r = new RectArea();
            r.w = sc.nextDouble();
            r.h = sc.nextDouble();
            sh = r;
        }
        System.out.printf("Area: %.2f%n", sh.area());
    }
}

abstract class Shape {
    abstract double area();
}

class CircleArea extends Shape {
    double r;

    double area() {
        return Math.PI * r * r;
    }
}

class RectArea extends Shape {
    double w;
    double h;

    double area() {
        return w * h;
    }
}`,
  }),
];

/* ============================================================
 * CODE QUESTIONS - Part 2 (Q11 - Q20: 6 medium + 4 hard)
 * ============================================================ */

const codeP2 = [
  cq({
    title: "Three Level Build Log",
    description:
      "An assembly line logs every build stage from the base class upward. Define class Unit with a constructor that prints: Frame welded. Define class Laptop that extends Unit with a constructor that prints: Board installed. Define class GamingRig that extends Laptop with a constructor that prints: GPU mounted. In main read n and create n GamingRig objects; constructor chaining prints the full three-line log for every rig, base constructor first.\n\nInput Format:\nA single line with one integer n.\n\nOutput Format:\nFor each rig, three lines in order: Frame welded, Board installed, GPU mounted.\n\nConstraints:\n1 <= n <= 5",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: SUB.single,
    sampleinput1: "1",
    sampleoutput1: "Frame welded\nBoard installed\nGPU mounted",
    sampleinput2: "2",
    sampleoutput2:
      "Frame welded\nBoard installed\nGPU mounted\nFrame welded\nBoard installed\nGPU mounted",
    input1: "3",
    output1:
      "Frame welded\nBoard installed\nGPU mounted\nFrame welded\nBoard installed\nGPU mounted\nFrame welded\nBoard installed\nGPU mounted",
    input2: "4",
    output2:
      "Frame welded\nBoard installed\nGPU mounted\nFrame welded\nBoard installed\nGPU mounted\nFrame welded\nBoard installed\nGPU mounted\nFrame welded\nBoard installed\nGPU mounted",
    input3: "5",
    output3:
      "Frame welded\nBoard installed\nGPU mounted\nFrame welded\nBoard installed\nGPU mounted\nFrame welded\nBoard installed\nGPU mounted\nFrame welded\nBoard installed\nGPU mounted\nFrame welded\nBoard installed\nGPU mounted",
    inputconstrains: "1 <= n <= 5",
    blacklist: "interface",
    whitelist: "extends",
    sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        for (int i = 0; i < n; i++) {
            GamingRig rig = new GamingRig();
        }
    }
}

class Unit {
    Unit() {
        System.out.println("Frame welded");
    }
}

class Laptop extends Unit {
    Laptop() {
        System.out.println("Board installed");
    }
}

class GamingRig extends Laptop {
    GamingRig() {
        System.out.println("GPU mounted");
    }
}`,
  }),
  cq({
    title: "Multifunction Default Clash",
    description:
      "A multifunction office device inherits default methods from two interfaces - and both define info(). Java refuses to choose for you: the class must override the method itself. Define interface PrintModule with default void info() printing: Print module ready. Define interface ScanModule with default void info() printing: Scan module ready. Define class MultiFunction that implements both, has a field model, and overrides info() to call PrintModule.super.info(), then ScanModule.super.info(), then print: <model> all modules ready. In main, read the model word and call info().\n\nInput Format:\nA single line with one word: the model name.\n\nOutput Format:\nLine 1: Print module ready\nLine 2: Scan module ready\nLine 3: <model> all modules ready\n\nConstraints:\n1 <= model length <= 50 (single word)",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: SUB.iface,
    sampleinput1: "OfficePro",
    sampleoutput1: "Print module ready\nScan module ready\nOfficePro all modules ready",
    sampleinput2: "HomeHub",
    sampleoutput2: "Print module ready\nScan module ready\nHomeHub all modules ready",
    input1: "PrintX",
    output1: "Print module ready\nScan module ready\nPrintX all modules ready",
    input2: "ScanOne",
    output2: "Print module ready\nScan module ready\nScanOne all modules ready",
    input3: "MegaDesk",
    output3: "Print module ready\nScan module ready\nMegaDesk all modules ready",
    inputconstrains: "1 <= model length <= 50",
    blacklist: "abstract",
    whitelist: "default, implements",
    sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        MultiFunction mf = new MultiFunction();
        mf.model = sc.next();
        mf.info();
    }
}

interface PrintModule {
    default void info() {
        System.out.println("Print module ready");
    }
}

interface ScanModule {
    default void info() {
        System.out.println("Scan module ready");
    }
}

class MultiFunction implements PrintModule, ScanModule {
    String model;

    public void info() {
        PrintModule.super.info();
        ScanModule.super.info();
        System.out.println(model + " all modules ready");
    }
}`,
  }),
  cq({
    title: "Report Template Pipeline",
    description:
      "A report engine uses the template method pattern: the abstract parent fixes the pipeline, subclasses fill in the steps. Define an abstract class Report with abstract methods header() and body() and a concrete method generate() that calls header(), then body(), then prints: Report complete. Define SalesReport that extends Report printing Sales header / Sales figures, and HrReport that extends Report printing HR header / HR records. In main read n and then n kind words (sales or hr); store each matching Report object in an array using a Report reference, then call generate() on all of them in order.\n\nInput Format:\nFirst line: n. Second line: n words separated by spaces, each sales or hr.\n\nOutput Format:\nFor each report, its header line, its body line, then Report complete.\n\nConstraints:\n1 <= n <= 100, each kind is sales or hr",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: SUB.abs,
    sampleinput1: "2 sales hr",
    sampleoutput1:
      "Sales header\nSales figures\nReport complete\nHR header\nHR records\nReport complete",
    sampleinput2: "1 sales",
    sampleoutput2: "Sales header\nSales figures\nReport complete",
    input1: "3 hr hr hr",
    output1:
      "HR header\nHR records\nReport complete\nHR header\nHR records\nReport complete\nHR header\nHR records\nReport complete",
    input2: "2 hr sales",
    output2:
      "HR header\nHR records\nReport complete\nSales header\nSales figures\nReport complete",
    input3: "4 sales sales hr hr",
    output3:
      "Sales header\nSales figures\nReport complete\nSales header\nSales figures\nReport complete\nHR header\nHR records\nReport complete\nHR header\nHR records\nReport complete",
    inputconstrains: "1 <= n <= 100, each kind is sales or hr",
    blacklist: "interface",
    whitelist: "abstract",
    sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        Report[] reports = new Report[n];
        for (int i = 0; i < n; i++) {
            String kind = sc.next();
            if (kind.equals("sales")) {
                reports[i] = new SalesReport();
            } else {
                reports[i] = new HrReport();
            }
        }
        for (int i = 0; i < n; i++) {
            reports[i].generate();
        }
    }
}

abstract class Report {
    abstract void header();

    abstract void body();

    void generate() {
        header();
        body();
        System.out.println("Report complete");
    }
}

class SalesReport extends Report {
    void header() {
        System.out.println("Sales header");
    }

    void body() {
        System.out.println("Sales figures");
    }
}

class HrReport extends Report {
    void header() {
        System.out.println("HR header");
    }

    void body() {
        System.out.println("HR records");
    }
}`,
  }),
  cq({
    title: "Gadget Type Census",
    description:
      "A store census counts gadgets by type. The base class keeps the shared total; each subclass keeps its own static counter - hierarchical inheritance with a shared base. Define class Gadget with static int total = 0 and a constructor that increments total. Define Phone that extends Gadget with static int count = 0 and a constructor that increments count. Define Tablet that extends Gadget the same way. In main read n and then n kind words (phone or tablet); create a matching object for each word, then print Phones: <count>, Tablets: <count> and Total: <total>.\n\nInput Format:\nFirst line: n. Second line: n words separated by spaces, each phone or tablet.\n\nOutput Format:\nLine 1: Phones: <number of phones>\nLine 2: Tablets: <number of tablets>\nLine 3: Total: <total gadgets>\n\nConstraints:\n1 <= n <= 1000, each kind is phone or tablet",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: SUB.hier,
    sampleinput1: "5 phone phone tablet phone tablet",
    sampleoutput1: "Phones: 3\nTablets: 2\nTotal: 5",
    sampleinput2: "3 tablet phone tablet",
    sampleoutput2: "Phones: 1\nTablets: 2\nTotal: 3",
    input1: "4 phone phone phone phone",
    output1: "Phones: 4\nTablets: 0\nTotal: 4",
    input2: "2 tablet tablet",
    output2: "Phones: 0\nTablets: 2\nTotal: 2",
    input3: "6 phone tablet phone tablet phone tablet",
    output3: "Phones: 3\nTablets: 3\nTotal: 6",
    inputconstrains: "1 <= n <= 1000, each kind is phone or tablet",
    blacklist: "Map",
    whitelist: "extends",
    sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        for (int i = 0; i < n; i++) {
            String kind = sc.next();
            if (kind.equals("phone")) {
                new Phone();
            } else {
                new Tablet();
            }
        }
        System.out.println("Phones: " + Phone.count);
        System.out.println("Tablets: " + Tablet.count);
        System.out.println("Total: " + Gadget.total);
    }
}

class Gadget {
    static int total = 0;

    Gadget() {
        total++;
    }
}

class Phone extends Gadget {
    static int count = 0;

    Phone() {
        count++;
    }
}

class Tablet extends Gadget {
    static int count = 0;

    Tablet() {
        count++;
    }
}`,
  }),
  cq({
    title: "Media Deck Command Runner",
    description:
      "A media deck takes its behavior from two interfaces at once - multiple inheritance via interfaces. Define interface Playable with void play() and default void stop() printing: Playback stopped. Define interface Recordable with void record() and default void stop() printing: Recording stopped. Define class MediaDeck implementing both: play() prints Playing track, record() prints Recording track, and stop() is overridden to print Deck stopped (resolving the default conflict). In main read n and then n commands (play, record or stop) and run each on one MediaDeck.\n\nInput Format:\nFirst line: n. Second line: n command words separated by spaces.\n\nOutput Format:\nOne line per command: Playing track, Recording track or Deck stopped.\n\nConstraints:\n1 <= n <= 100, each command is play, record or stop",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: SUB.multi,
    sampleinput1: "4 play record stop play",
    sampleoutput1: "Playing track\nRecording track\nDeck stopped\nPlaying track",
    sampleinput2: "3 record stop record",
    sampleoutput2: "Recording track\nDeck stopped\nRecording track",
    input1: "2 stop stop",
    output1: "Deck stopped\nDeck stopped",
    input2: "5 play play record play stop",
    output2: "Playing track\nPlaying track\nRecording track\nPlaying track\nDeck stopped",
    input3: "1 record",
    output3: "Recording track",
    inputconstrains: "1 <= n <= 100, each command is play, record or stop",
    blacklist: "extends",
    whitelist: "implements",
    sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        MediaDeck deck = new MediaDeck();
        int n = sc.nextInt();
        for (int i = 0; i < n; i++) {
            String cmd = sc.next();
            if (cmd.equals("play")) {
                deck.play();
            } else if (cmd.equals("record")) {
                deck.record();
            } else {
                deck.stop();
            }
        }
    }
}

interface Playable {
    void play();

    default void stop() {
        System.out.println("Playback stopped");
    }
}

interface Recordable {
    void record();

    default void stop() {
        System.out.println("Recording stopped");
    }
}

class MediaDeck implements Playable, Recordable {
    public void play() {
        System.out.println("Playing track");
    }

    public void record() {
        System.out.println("Recording track");
    }

    public void stop() {
        System.out.println("Deck stopped");
    }
}`,
  }),
  cq({
    title: "Onboarding Card Super Chain",
    description:
      "HR's onboarding card prints the staff record first, then the engineer's stack - the subclass constructor delegates to the parent with super(...). Define class Staff with field name and a constructor Staff(String name) that stores it and prints: Staff onboarded: <name>. Define class Engineer that extends Staff with field stack and a constructor Engineer(String name, String stack) that calls super(name), stores stack and prints: Stack: <stack>. In main read name and stack and create one Engineer.\n\nInput Format:\nA single line with two words: name stack.\n\nOutput Format:\nLine 1: Staff onboarded: <name>\nLine 2: Stack: <stack>\n\nConstraints:\n1 <= name, stack length <= 30 (single words)",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: SUB.sup,
    sampleinput1: "Asha Java",
    sampleoutput1: "Staff onboarded: Asha\nStack: Java",
    sampleinput2: "Vikram Python",
    sampleoutput2: "Staff onboarded: Vikram\nStack: Python",
    input1: "Meera React",
    output1: "Staff onboarded: Meera\nStack: React",
    input2: "Rohan Go",
    output2: "Staff onboarded: Rohan\nStack: Go",
    input3: "Isha SQL",
    output3: "Staff onboarded: Isha\nStack: SQL",
    inputconstrains: "1 <= name, stack length <= 30",
    blacklist: "interface",
    whitelist: "super(",
    sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Engineer eng = new Engineer(sc.next(), sc.next());
    }
}

class Staff {
    String name;

    Staff(String name) {
        this.name = name;
        System.out.println("Staff onboarded: " + name);
    }
}

class Engineer extends Staff {
    String stack;

    Engineer(String name, String stack) {
        super(name);
        this.stack = stack;
        System.out.println("Stack: " + stack);
    }
}`,
  }),
  cq({
    title: "Payroll Engine Payslips",
    description:
      "A payroll engine processes mixed employee types from one abstract parent. Define an abstract class Employee with field name, a constructor to set it, and an abstract method monthlyPay(). Define Salaried that extends Employee (field salary) where monthlyPay() returns salary, and Hourly that extends Employee (fields hours, rate) where monthlyPay() returns hours * rate. Input gives n entries: type S with name and salary, or type H with name, hours and rate. Store every employee in an Employee array, then print one payslip line per employee and finally the total payroll.\n\nInput Format:\nFirst line: n. Then n entries in the same order: S name salary OR H name hours rate (names are single words, values are integers).\n\nOutput Format:\nOne line per employee: <name>: <monthly pay>. Final line: Total: <sum of all pays>.\n\nConstraints:\n1 <= n <= 1000, 1 <= salary <= 1000000, 1 <= hours <= 300, 1 <= rate <= 5000",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: SUB.abs,
    sampleinput1: "3 S Asha 50000 H Raj 160 250 S Maya 60000",
    sampleoutput1: "Asha: 50000\nRaj: 40000\nMaya: 60000\nTotal: 150000",
    sampleinput2: "2 H Dev 100 300 S Riya 45000",
    sampleoutput2: "Dev: 30000\nRiya: 45000\nTotal: 75000",
    input1: "4 S Amy 10000 H Bob 80 500 S Cal 20000 H Dee 50 400",
    output1: "Amy: 10000\nBob: 40000\nCal: 20000\nDee: 20000\nTotal: 90000",
    input2: "1 H Solo 200 150",
    output2: "Solo: 30000\nTotal: 30000",
    input3: "5 S P1 1000 H P2 10 100 S P3 2000 H P4 20 100 S P5 3000",
    output3: "P1: 1000\nP2: 1000\nP3: 2000\nP4: 2000\nP5: 3000\nTotal: 9000",
    inputconstrains:
      "1 <= n <= 1000, 1 <= salary <= 1000000, 1 <= hours <= 300, 1 <= rate <= 5000",
    blacklist: "Map, ArrayList",
    whitelist: "abstract",
    sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        Employee[] staff = new Employee[n];
        for (int i = 0; i < n; i++) {
            String type = sc.next();
            if (type.equals("S")) {
                staff[i] = new Salaried(sc.next(), sc.nextInt());
            } else {
                staff[i] = new Hourly(sc.next(), sc.nextInt(), sc.nextInt());
            }
        }
        long total = 0;
        for (int i = 0; i < n; i++) {
            int pay = staff[i].monthlyPay();
            System.out.println(staff[i].name + ": " + pay);
            total += pay;
        }
        System.out.println("Total: " + total);
    }
}

abstract class Employee {
    String name;

    Employee(String name) {
        this.name = name;
    }

    abstract int monthlyPay();
}

class Salaried extends Employee {
    int salary;

    Salaried(String name, int salary) {
        super(name);
        this.salary = salary;
    }

    int monthlyPay() {
        return salary;
    }
}

class Hourly extends Employee {
    int hours;
    int rate;

    Hourly(String name, int hours, int rate) {
        super(name);
        this.hours = hours;
        this.rate = rate;
    }

    int monthlyPay() {
        return hours * rate;
    }
}`,
  }),
  cq({
    title: "Shape Studio Interface Dispatch",
    description:
      "A shape studio dispatches work through one interface: every shape reports its label, area and perimeter. Define interface Shape with double area(), double perimeter() and String label(). Define Circle that implements Shape (field r: area = Math.PI * r * r, perimeter = 2 * Math.PI * r, label Circle) and Square that implements Shape (field s: area = s * s, perimeter = 4 * s, label Square). Input gives n shapes (circle with radius, or square with side). Store them in a Shape array, print each shape's label and area, then the total perimeter of all shapes.\n\nInput Format:\nFirst line: n. Then n entries: circle radius OR square side (values may be decimals).\n\nOutput Format:\nOne line per shape: <Label> area: <area with 2 decimals>. Final line: Total perimeter: <sum with 2 decimals>.\n\nConstraints:\n1 <= n <= 1000, 0 < radius, side <= 10000",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: SUB.iface,
    sampleinput1: "2 circle 5 square 4",
    sampleoutput1: "Circle area: 78.54\nSquare area: 16.00\nTotal perimeter: 47.42",
    sampleinput2: "1 circle 2",
    sampleoutput2: "Circle area: 12.57\nTotal perimeter: 12.57",
    input1: "3 square 2 circle 1 square 3",
    output1: "Square area: 4.00\nCircle area: 3.14\nSquare area: 9.00\nTotal perimeter: 26.28",
    input2: "2 square 10 circle 2.5",
    output2: "Square area: 100.00\nCircle area: 19.63\nTotal perimeter: 55.71",
    input3: "1 square 7",
    output3: "Square area: 49.00\nTotal perimeter: 28.00",
    inputconstrains: "1 <= n <= 1000, 0 < radius, side <= 10000",
    blacklist: "switch",
    whitelist: "implements",
    sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        Shape[] shapes = new Shape[n];
        for (int i = 0; i < n; i++) {
            String kind = sc.next();
            if (kind.equals("circle")) {
                shapes[i] = new Circle(sc.nextDouble());
            } else {
                shapes[i] = new Square(sc.nextDouble());
            }
        }
        double totalPerimeter = 0;
        for (int i = 0; i < n; i++) {
            System.out.printf(shapes[i].label() + " area: %.2f%n", shapes[i].area());
            totalPerimeter += shapes[i].perimeter();
        }
        System.out.printf("Total perimeter: %.2f%n", totalPerimeter);
    }
}

interface Shape {
    double area();

    double perimeter();

    String label();
}

class Circle implements Shape {
    double r;

    Circle(double r) {
        this.r = r;
    }

    public double area() {
        return Math.PI * r * r;
    }

    public double perimeter() {
        return 2 * Math.PI * r;
    }

    public String label() {
        return "Circle";
    }
}

class Square implements Shape {
    double s;

    Square(double s) {
        this.s = s;
    }

    public double area() {
        return s * s;
    }

    public double perimeter() {
        return 4 * s;
    }

    public String label() {
        return "Square";
    }
}`,
  }),
  cq({
    title: "Org Chart Pay Rollup",
    description:
      "An org chart rolls pay upward through a multilevel chain using super. Define class Executive with fields name and basePay, a constructor, and a method pay() returning basePay. Define Manager that extends Executive with field teamBonus, a constructor calling super(name, basePay), and pay() returning super.pay() + teamBonus. Define Director that extends Manager with field stockAward, a constructor calling super(name, basePay, teamBonus), and pay() returning super.pay() + stockAward. Input gives n entries: role (1 = Executive, 2 = Manager, 3 = Director) followed by name basePay teamBonus stockAward (unused values are 0). Store each in an Executive array and print every pay line, then the total.\n\nInput Format:\nFirst line: n. Then n entries: role name basePay teamBonus stockAward (names are single words, values are integers).\n\nOutput Format:\nOne line per entry: Name: <name> Pay: <pay>. Final line: Total: <sum of all pays>.\n\nConstraints:\n1 <= n <= 1000, role is 1, 2 or 3, 0 <= basePay, teamBonus, stockAward <= 1000000",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: SUB.sup,
    sampleinput1: "3 1 Asha 50000 0 0 2 Raj 40000 8000 0 3 Maya 60000 5000 20000",
    sampleoutput1:
      "Name: Asha Pay: 50000\nName: Raj Pay: 48000\nName: Maya Pay: 85000\nTotal: 183000",
    sampleinput2: "2 3 Dev 30000 2000 1000 1 Ira 25000 0 0",
    sampleoutput2: "Name: Dev Pay: 33000\nName: Ira Pay: 25000\nTotal: 58000",
    input1: "4 2 Amy 10000 500 0 2 Ben 10000 700 0 3 Cal 20000 1000 5000 1 Dee 15000 0 0",
    output1:
      "Name: Amy Pay: 10500\nName: Ben Pay: 10700\nName: Cal Pay: 26000\nName: Dee Pay: 15000\nTotal: 62200",
    input2: "1 3 Zed 90000 900 900",
    output2: "Name: Zed Pay: 91800\nTotal: 91800",
    input3: "5 1 P 1000 0 0 2 Q 2000 100 0 3 R 3000 100 100 2 S 4000 200 0 1 T 5000 0 0",
    output3:
      "Name: P Pay: 1000\nName: Q Pay: 2100\nName: R Pay: 3200\nName: S Pay: 4200\nName: T Pay: 5000\nTotal: 15500",
    inputconstrains:
      "1 <= n <= 1000, role is 1, 2 or 3, 0 <= basePay, teamBonus, stockAward <= 1000000",
    blacklist: "interface",
    whitelist: "super.",
    sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        Executive[] team = new Executive[n];
        for (int i = 0; i < n; i++) {
            int role = sc.nextInt();
            String name = sc.next();
            int basePay = sc.nextInt();
            int teamBonus = sc.nextInt();
            int stockAward = sc.nextInt();
            if (role == 1) {
                team[i] = new Executive(name, basePay);
            } else if (role == 2) {
                team[i] = new Manager(name, basePay, teamBonus);
            } else {
                team[i] = new Director(name, basePay, teamBonus, stockAward);
            }
        }
        long total = 0;
        for (int i = 0; i < n; i++) {
            int p = team[i].pay();
            System.out.println("Name: " + team[i].name + " Pay: " + p);
            total += p;
        }
        System.out.println("Total: " + total);
    }
}

class Executive {
    String name;
    int basePay;

    Executive(String name, int basePay) {
        this.name = name;
        this.basePay = basePay;
    }

    int pay() {
        return basePay;
    }
}

class Manager extends Executive {
    int teamBonus;

    Manager(String name, int basePay, int teamBonus) {
        super(name, basePay);
        this.teamBonus = teamBonus;
    }

    int pay() {
        return super.pay() + teamBonus;
    }
}

class Director extends Manager {
    int stockAward;

    Director(String name, int basePay, int teamBonus, int stockAward) {
        super(name, basePay, teamBonus);
        this.stockAward = stockAward;
    }

    int pay() {
        return super.pay() + stockAward;
    }
}`,
  }),
  cq({
    title: "Drawable Studio Render Engine",
    description:
      "A drawing engine combines both blueprints from today: an abstract base class for shared state and an interface for the render contract. Define interface Drawable with void draw() and double area(). Define abstract class Shape with field name, a constructor Shape(String name) and an abstract method area(). Define Circle that extends Shape implements Drawable (area = Math.PI * r * r; draw() prints: Render circle area <area with 2 decimals>) and Square that extends Shape implements Drawable (area = s * s; draw() prints: Render square area <area with 2 decimals>). Input gives n shapes (circle radius or square side). Store them in a Drawable array, call draw() on each, then print the total area.\n\nInput Format:\nFirst line: n. Then n entries: circle radius OR square side (values may be decimals).\n\nOutput Format:\nOne line per shape as produced by draw(). Final line: Total area: <sum with 2 decimals>.\n\nConstraints:\n1 <= n <= 1000, 0 < radius, side <= 10000",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: SUB.multi,
    sampleinput1: "2 circle 5 square 4",
    sampleoutput1: "Render circle area 78.54\nRender square area 16.00\nTotal area: 94.54",
    sampleinput2: "1 circle 2",
    sampleoutput2: "Render circle area 12.57\nTotal area: 12.57",
    input1: "3 square 1 circle 3 square 2",
    output1: "Render square area 1.00\nRender circle area 28.27\nRender square area 4.00\nTotal area: 33.27",
    input2: "2 circle 1 circle 1",
    output2: "Render circle area 3.14\nRender circle area 3.14\nTotal area: 6.28",
    input3: "2 square 2.5 circle 0.5",
    output3: "Render square area 6.25\nRender circle area 0.79\nTotal area: 7.04",
    inputconstrains: "1 <= n <= 1000, 0 < radius, side <= 10000",
    blacklist: "instanceof",
    whitelist: "implements",
    sourcecode: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        Drawable[] art = new Drawable[n];
        for (int i = 0; i < n; i++) {
            String kind = sc.next();
            if (kind.equals("circle")) {
                art[i] = new Circle(sc.nextDouble());
            } else {
                art[i] = new Square(sc.nextDouble());
            }
        }
        double totalArea = 0;
        for (int i = 0; i < n; i++) {
            art[i].draw();
            totalArea += art[i].area();
        }
        System.out.printf("Total area: %.2f%n", totalArea);
    }
}

interface Drawable {
    void draw();

    double area();
}

abstract class Shape {
    String name;

    Shape(String name) {
        this.name = name;
    }

    abstract double area();
}

class Circle extends Shape implements Drawable {
    double r;

    Circle(double r) {
        super("circle");
        this.r = r;
    }

    public double area() {
        return Math.PI * r * r;
    }

    public void draw() {
        System.out.println("Render " + name + " area " + String.format("%.2f", area()));
    }
}

class Square extends Shape implements Drawable {
    double s;

    Square(double s) {
        super("square");
        this.s = s;
    }

    public double area() {
        return s * s;
    }

    public void draw() {
        System.out.println("Render " + name + " area " + String.format("%.2f", area()));
    }
}`,
  }),
];

/* ============================================================
 * MCQ QUESTIONS - Part 1 (Q1 - Q10, all easy)
 * ============================================================ */

const mcqP1 = [
  mq({
    title: "Keyword for Inheritance",
    description:
      "Which keyword establishes inheritance in Java so that a subclass acquires the fields and methods of an existing class?",
    difficulty: "easy",
    subtopic: SUB.single,
    Option1: "extends",
    Option2: "implements",
    Option3: "inherits",
    Option4: "super",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  }),
  mq({
    title: "Multilevel Chain Spotter",
    description:
      "In multilevel inheritance, a class extends a class that itself extends another class, forming a chain. Which arrangement is multilevel inheritance?",
    difficulty: "easy",
    subtopic: SUB.single,
    Option1: "Class C extends B, and B extends A",
    Option2: "Class B and class C both directly extend A",
    Option3: "Class A extends both B and C",
    Option4: "Class C implements class B",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  }),
  mq({
    title: "Hierarchical Arrangement",
    description:
      "In hierarchical inheritance, one superclass serves several direct subclasses. Which of these is hierarchical inheritance?",
    difficulty: "easy",
    subtopic: SUB.hier,
    Option1: "Circle, Square and Triangle all extend Shape",
    Option2: "Square extends Circle which extends Shape",
    Option3: "Shape extends Circle and Shape extends Square",
    Option4: "Circle implements Square and Triangle",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  }),
  mq({
    title: "Abstract Class Truth",
    description: "Which statement about an abstract class in Java is TRUE?",
    difficulty: "easy",
    subtopic: SUB.abs,
    Option1: "It can be instantiated directly with new",
    Option2: "It cannot be instantiated directly; subclasses create the objects",
    Option3: "It cannot have constructors",
    Option4: "It cannot contain fully defined concrete methods",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  }),
  mq({
    title: "Interface Method Modifiers",
    description:
      "In a classic Java interface, a method declared without a body is implicitly given which modifiers?",
    difficulty: "easy",
    subtopic: SUB.iface,
    Option1: "public and abstract",
    Option2: "private and abstract",
    Option3: "protected and static",
    Option4: "public and final",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  }),
  mq({
    title: "Implementing Two Interfaces",
    description:
      "A class can take type membership from several interfaces at once, which is Java's answer to multiple inheritance. Which class header correctly implements two interfaces?",
    difficulty: "easy",
    subtopic: SUB.multi,
    Option1: "class Player implements Media, Network",
    Option2: "class Player extends Media, Network",
    Option3: "class Player implements Media extends Network",
    Option4: "class Player imports Media, Network",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  }),
  mq({
    title: "super Keyword Meaning",
    description: "Inside a subclass, the super keyword refers to:",
    difficulty: "easy",
    subtopic: SUB.sup,
    Option1: "the current object itself",
    Option2: "the immediate superclass portion of the object",
    Option3: "any static field of the subclass",
    Option4: "a newly created parent object",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  }),
  mq({
    title: "Members Not Inherited",
    description:
      "When a class extends another class, the subclass acquires most of its members. Which members are NOT inherited by the subclass?",
    difficulty: "easy",
    subtopic: SUB.single,
    Option1: "public fields",
    Option2: "protected methods",
    Option3: "constructors",
    Option4: "public methods",
    CorrectOption: 3,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  }),
  mq({
    title: "Default Methods Since Java 8",
    description:
      "Interfaces gained a big upgrade that lets them carry behavior, not just contracts. Since which Java version can interfaces contain default methods with bodies?",
    difficulty: "easy",
    subtopic: SUB.iface,
    Option1: "Java 5",
    Option2: "Java 7",
    Option3: "Java 8",
    Option4: "Java 6",
    CorrectOption: 3,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  }),
  mq({
    title: "Is-A Relationship Check",
    description:
      "Given the declaration class Dog extends Animal, which reading of the relationship between Dog and Animal is correct?",
    difficulty: "easy",
    subtopic: SUB.hier,
    Option1: "Dog has-a Animal",
    Option2: "Dog is-a Animal",
    Option3: "Animal is-a Dog",
    Option4: "Animal has-a Dog",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  }),
];

/* ============================================================
 * MCQ QUESTIONS - Part 2 (Q11 - Q20: 6 medium + 4 hard)
 * ============================================================ */

const mcqP2 = [
  mq({
    title: "Base Constructor Prints First",
    description: "What does this program print?",
    difficulty: "medium",
    subtopic: SUB.sup,
    Option1: "Laptop built then Device built",
    Option2: "Device built then Laptop built",
    Option3: "Laptop built only",
    Option4: "Compile error - Device has no explicit constructor call",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `class Device {
    Device() {
        System.out.println("Device built");
    }
}

class Laptop extends Device {
    Laptop() {
        System.out.println("Laptop built");
    }
}

public class Main {
    public static void main(String[] args) {
        Laptop l = new Laptop();
    }
}`,
    snippetLang: "java",
  }),
  mq({
    title: "super Call Placement Rule",
    description: "What is the result of trying to compile and run this program?",
    difficulty: "medium",
    subtopic: SUB.sup,
    Option1: "Prints Making dog and then runs normally",
    Option2: "Compile error - super(name) must be the first statement in the constructor",
    Option3: "Runtime exception thrown at the super(name) call",
    Option4: "Prints Making dog and the name field stays null",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `class Animal {
    String name;

    Animal(String name) {
        this.name = name;
    }
}

class Dog extends Animal {
    Dog(String name) {
        System.out.println("Making dog");
        super(name);
    }
}

public class Main {
    public static void main(String[] args) {
        Dog d = new Dog("Rex");
    }
}`,
    snippetLang: "java",
  }),
  mq({
    title: "New On Abstract Type",
    description: "What happens when this program is compiled?",
    difficulty: "medium",
    subtopic: SUB.abs,
    Option1: "It prints 0.0",
    Option2: "It prints 3.14",
    Option3: "Compile error - an abstract class cannot be instantiated",
    Option4: "It compiles but throws a runtime exception",
    CorrectOption: 3,
    iscodesnippet: true,
    codesnippet: `abstract class Shape {
    abstract double area();
}

class Circle extends Shape {
    double r;

    Circle(double r) {
        this.r = r;
    }

    double area() {
        return 3.14 * r * r;
    }
}

public class Main {
    public static void main(String[] args) {
        Shape s = new Shape();
        System.out.println(s.area());
    }
}`,
    snippetLang: "java",
  }),
  mq({
    title: "Default Method Clash",
    description: "What is the result of compiling this program?",
    difficulty: "medium",
    subtopic: SUB.multi,
    Option1: "Prints Printer ok - the first interface wins",
    Option2: "Compile error - Office must override status() to resolve the conflict",
    Option3: "Prints Fax ok - the last interface wins",
    Option4: "Prints both Printer ok and Fax ok",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `interface Printer {
    default void status() {
        System.out.println("Printer ok");
    }
}

interface Fax {
    default void status() {
        System.out.println("Fax ok");
    }
}

class Office implements Printer, Fax {
}

public class Main {
    public static void main(String[] args) {
        new Office().status();
    }
}`,
    snippetLang: "java",
  }),
  mq({
    title: "Field Hiding Via Base Reference",
    description: "What does this program print?",
    difficulty: "medium",
    subtopic: SUB.single,
    Option1: "1",
    Option2: "2",
    Option3: "Compile error - version is hidden in Child",
    Option4: "0",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `class Base {
    int version = 1;
}

class Child extends Base {
    int version = 2;
}

public class Main {
    public static void main(String[] args) {
        Base ref = new Child();
        System.out.println(ref.version);
    }
}`,
    snippetLang: "java",
  }),
  mq({
    title: "Why No Multiple Class Inheritance",
    description:
      "Java allows a class to implement many interfaces but to extend only one class. What is the main reason behind this design?",
    difficulty: "medium",
    subtopic: SUB.multi,
    Option1: "To make compilation faster",
    Option2: "The diamond problem - ambiguity when two parents provide the same member",
    Option3: "Interfaces run faster than classes",
    Option4: "Single inheritance uses less memory",
    CorrectOption: 2,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  }),
  mq({
    title: "Interface Constant Inheritance",
    description: "What does this program print?",
    difficulty: "hard",
    subtopic: SUB.iface,
    Option1: "30 then 50",
    Option2: "50 then 30",
    Option3: "Compile error - MAX_USERS is not visible inside App",
    Option4: "30 then 0",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `interface Config {
    int MAX_USERS = 50;
}

class App implements Config {
    int users = 20;

    int freeSlots() {
        return MAX_USERS - users;
    }
}

public class Main {
    public static void main(String[] args) {
        App a = new App();
        System.out.println(a.freeSlots());
        System.out.println(Config.MAX_USERS);
    }
}`,
    snippetLang: "java",
  }),
  mq({
    title: "Super Chain Full Trace",
    description: "Which output does this program produce, in order?",
    difficulty: "hard",
    subtopic: SUB.sup,
    Option1: "A-ctor, B-ctor, A-show, B-show",
    Option2: "B-ctor, A-ctor, B-show, A-show",
    Option3: "A-ctor, B-ctor, B-show, A-show",
    Option4: "Only B-ctor and B-show",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `class A {
    A() {
        System.out.println("A-ctor");
    }

    void show() {
        System.out.println("A-show");
    }
}

class B extends A {
    B() {
        super();
        System.out.println("B-ctor");
    }

    void show() {
        super.show();
        System.out.println("B-show");
    }
}

public class Main {
    public static void main(String[] args) {
        B b = new B();
        b.show();
    }
}`,
    snippetLang: "java",
  }),
  mq({
    title: "Abstract Class Contents",
    description:
      "Which combination can legally appear inside an abstract class in Java?",
    difficulty: "hard",
    subtopic: SUB.abs,
    Option1: "Constructors, instance fields and fully defined concrete methods",
    Option2: "Only abstract methods and nothing else",
    Option3: "Constructors only - fields and methods are forbidden",
    Option4: "Abstract methods only - constructors are forbidden",
    CorrectOption: 1,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
  }),
  mq({
    title: "Three Level Override Resolution",
    description: "What does this program print?",
    difficulty: "hard",
    subtopic: SUB.single,
    Option1: "Top speaks",
    Option2: "Mid speaks",
    Option3: "Compile error - Low must override speak()",
    Option4: "It prints nothing",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: `class Top {
    void speak() {
        System.out.println("Top speaks");
    }
}

class Mid extends Top {
    void speak() {
        System.out.println("Mid speaks");
    }
}

class Low extends Mid {
}

public class Main {
    public static void main(String[] args) {
        Top ref = new Low();
        ref.speak();
    }
}`,
    snippetLang: "java",
  }),
];

/* ============================================================
 * Write part files
 * ============================================================ */

fs.writeFileSync(
  path.join(dir, "day-13.code.p1.json"),
  JSON.stringify({ day: 13, topics, questions: codeP1 }, null, 2) + "\n"
);
fs.writeFileSync(
  path.join(dir, "day-13.code.p2.json"),
  JSON.stringify({ questions: codeP2 }, null, 2) + "\n"
);
fs.writeFileSync(
  path.join(dir, "day-13.mcq.p1.json"),
  JSON.stringify({ day: 13, questions: mcqP1 }, null, 2) + "\n"
);
fs.writeFileSync(
  path.join(dir, "day-13.mcq.p2.json"),
  JSON.stringify({ questions: mcqP2 }, null, 2) + "\n"
);

console.log(
  `wrote day-13 code parts (${codeP1.length}+${codeP2.length}) and mcq parts (${mcqP1.length}+${mcqP2.length})`
);
