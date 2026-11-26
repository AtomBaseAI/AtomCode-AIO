/**
 * Day 01 — Introduction to DSA and Java Setup — complete reference programs.
 * Index i (0-based) replaces the sourcecode of questions[i].
 * main() is always the FIRST member of class Main (judge detectMainClass quirk).
 */

const solutions = [];

/* Q1 — Difference and Product */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        System.out.println(difference(a, b) + " " + product(a, b));
    }

    static int difference(int a, int b) {
        return a - b;
    }

    static int product(int a, int b) {
        return a * b;
    }
}
`);

/* Q2 — Average of Three Numbers */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        int c = sc.nextInt();
        System.out.printf(java.util.Locale.ROOT, "%.2f%n", averageThree(a, b, c));
    }

    static double averageThree(int a, int b, int c) {
        return (a + b + c) / 3.0;
    }
}
`);

/* Q3 — Simple Interest Calculator */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double p = sc.nextDouble();
        double r = sc.nextDouble();
        int t = sc.nextInt();
        System.out.printf(java.util.Locale.ROOT, "%.2f%n", simpleInterest(p, r, t));
    }

    static double simpleInterest(double p, double r, int t) {
        return p * r * t / 100;
    }
}
`);

/* Q4 — Quotient and Remainder */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        System.out.println(quotient(a, b) + " " + remainder(a, b));
    }

    static int quotient(int a, int b) {
        return a / b;
    }

    static int remainder(int a, int b) {
        return a % b;
    }
}
`);

/* Q5 — Celsius to Fahrenheit */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double c = sc.nextDouble();
        System.out.printf(java.util.Locale.ROOT, "%.2f%n", celsiusToFahrenheit(c));
    }

    static double celsiusToFahrenheit(double c) {
        return c * 9 / 5 + 32;
    }
}
`);

/* Q6 — Rectangle Area and Perimeter */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int length = sc.nextInt();
        int width = sc.nextInt();
        System.out.println(rectangleArea(length, width) + " " + rectanglePerimeter(length, width));
    }

    static int rectangleArea(int length, int width) {
        return length * width;
    }

    static int rectanglePerimeter(int length, int width) {
        return 2 * (length + width);
    }
}
`);

/* Q7 — Grocery Receipt Total */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        double price = sc.nextDouble();
        int qty = sc.nextInt();
        double taxPercent = sc.nextDouble();
        System.out.printf(java.util.Locale.ROOT, "%.2f%n", receiptTotal(price, qty, taxPercent));
    }

    static double receiptTotal(double price, int qty, double taxPercent) {
        double sub = price * qty;
        return sub + sub * taxPercent / 100;
    }
}
`);

/* Q8 — Cinema Ticket Cost */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int adults = sc.nextInt();
        int children = sc.nextInt();
        System.out.println(ticketCost(adults, children));
    }

    static int ticketCost(int adults, int children) {
        return adults * 150 + children * 80;
    }
}
`);

/* Q9 — Hostel Mess Bill */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int vegDays = sc.nextInt();
        int nonvegDays = sc.nextInt();
        System.out.println(messBill(vegDays, nonvegDays));
    }

    static int messBill(int vegDays, int nonvegDays) {
        return vegDays * 60 + nonvegDays * 95;
    }
}
`);

/* Q10 — Swap the Pair In Place (blacklist: return, whitelist: pair[) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int[] pair = new int[2];
        pair[0] = sc.nextInt();
        pair[1] = sc.nextInt();
        swap(pair);
        System.out.println(pair[0] + " " + pair[1]);
    }

    static void swap(int[] pair) {
        int tmp = pair[0];
        pair[0] = pair[1];
        pair[1] = tmp;
    }
}
`);

/* Q11 — Group Ticket Discount (blacklist: System.out.print) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        java.io.PrintStream so = System.out;
        int people = sc.nextInt();
        int baseFare = sc.nextInt();
        so.println(groupFare(people, baseFare));
    }

    static int groupFare(int people, int baseFare) {
        int total = people * baseFare;
        if (people >= 5) {
            total -= total / 10;
        }
        return total;
    }
}
`);

/* Q12 — Grade Classifier (blacklist: System.out.print) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        java.io.PrintStream so = System.out;
        int marks = sc.nextInt();
        so.println(grade(marks));
    }

    static char grade(int marks) {
        if (marks >= 90) {
            return 'A';
        }
        if (marks >= 75) {
            return 'B';
        }
        if (marks >= 60) {
            return 'C';
        }
        if (marks >= 40) {
            return 'D';
        }
        return 'F';
    }
}
`);

/* Q13 — Sum of Two Integers */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        System.out.println(sumTwo(a, b));
    }

    static int sumTwo(int a, int b) {
        return a + b;
    }
}
`);

/* Q14 — Electricity Bill Slab (blacklist: System.out.print) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        java.io.PrintStream so = System.out;
        int units = sc.nextInt();
        so.printf(java.util.Locale.ROOT, "%.2f%n", electricityBill(units));
    }

    static double electricityBill(int units) {
        double bill = 0.0;
        int rest = units;
        int first = Math.min(rest, 100);
        bill += first * 3.5;
        rest -= first;
        int second = Math.min(rest, 100);
        bill += second * 5.0;
        rest -= second;
        bill += rest * 8.0;
        return bill;
    }
}
`);

/* Q15 — Parking Lot Charge (blacklist: System.out.print) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        java.io.PrintStream so = System.out;
        int minutes = sc.nextInt();
        so.println(parkingCharge(minutes));
    }

    static int parkingCharge(int minutes) {
        int charge = 30;
        if (minutes > 60) {
            charge += (minutes - 60 + 59) / 60 * 15;
        }
        return charge;
    }
}
`);

/* Q16 — Fuel Cost per Kilometre (blacklist: System.out.print) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        java.io.PrintStream so = System.out;
        double km = sc.nextDouble();
        double litres = sc.nextDouble();
        double pricePerLitre = sc.nextDouble();
        so.printf(java.util.Locale.ROOT, "%.2f%n", costPerKm(km, litres, pricePerLitre));
    }

    static double costPerKm(double km, double litres, double pricePerLitre) {
        double total = litres * pricePerLitre;
        return total / km;
    }
}
`);

/* Q17 — Gym Membership Plan (blacklist: System.out.print) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        java.io.PrintStream so = System.out;
        int months = sc.nextInt();
        int trainer = sc.nextInt();
        so.println(membershipCost(months, trainer));
    }

    static int membershipCost(int months, int trainer) {
        int total = months * 500 + months * 200 * trainer;
        if (months >= 6) {
            total -= total / 10;
        }
        return total;
    }
}
`);

/* Q18 — Triangle Type (blacklist: System.out.print) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        java.io.PrintStream so = System.out;
        int a = sc.nextInt();
        int b = sc.nextInt();
        int c = sc.nextInt();
        so.println(triangleType(a, b, c));
    }

    static String triangleType(int a, int b, int c) {
        if (a + b <= c || a + c <= b || b + c <= a) {
            return "INVALID";
        }
        if (a == b && b == c) {
            return "EQUILATERAL";
        }
        if (a == b || b == c || a == c) {
            return "ISOSCELES";
        }
        return "SCALENE";
    }
}
`);

/* Q19 — Tiered Taxi Fare (blacklist: System.out.print) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        java.io.PrintStream so = System.out;
        double km = sc.nextDouble();
        int night = sc.nextInt();
        so.printf(java.util.Locale.ROOT, "%.2f%n", taxiFare(km, night));
    }

    static double taxiFare(double km, int night) {
        if (km <= 0) {
            return 0.0;
        }
        double fare = 50.0;
        if (km > 2) {
            fare += (int) (km - 2) * 18.0;
        }
        if (night == 1) {
            fare *= 1.2;
        }
        return fare;
    }
}
`);

/* Q20 — Shipping Cost Calculator (blacklist: System.out.print) */
solutions.push(`import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        java.io.PrintStream so = System.out;
        int weight = sc.nextInt();
        int express = sc.nextInt();
        so.println(shippingCost(weight, express));
    }

    static int shippingCost(int weight, int express) {
        if (weight <= 0) {
            return -1;
        }
        int blocks = weight <= 500 ? 0 : (weight - 500 + 499) / 500;
        int cost = 40 + blocks * 15;
        return express == 1 ? cost * 2 : cost;
    }
}
`);

export { solutions };
