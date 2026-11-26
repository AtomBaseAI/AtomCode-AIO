/**
 * Day 01 (Introduction to DSA and C++ Setup) — replace each function-only
 * sourcecode with a complete standalone C++17 program.
 */
import { readFileSync, writeFileSync } from "node:fs";

const SRC = "/home/z/tmp/dsa-export/dsa-cpp/day-01.code.json";
const OUT = "/home/z/my-project/scripts/dsa-cpp/data/day-01.code.json";

const programs = [
  /* Q1 Fuel Cost Estimator */
  `#include <iostream>
#include <iomanip>

double fuel_cost(double distance, double mileage, double price) {
    return distance / mileage * price;
}

int main() {
    double distance, mileage, price;
    std::cin >> distance >> mileage >> price;
    std::cout << std::fixed << std::setprecision(2)
              << fuel_cost(distance, mileage, price) << std::endl;
    return 0;
}
`,
  /* Q2 Seconds to Clock Parts */
  `#include <iostream>

void to_clock(int total, int &h, int &m, int &s) {
    h = total / 3600;
    m = (total % 3600) / 60;
    s = total % 60;
}

int main() {
    int total, h = 0, m = 0, s = 0;
    std::cin >> total;
    to_clock(total, h, m, s);
    std::cout << h << " " << m << " " << s << std::endl;
    return 0;
}
`,
  /* Q3 ATM Note Split */
  `#include <iostream>

void split_notes(int amount, int &fives, int &hundreds) {
    fives = amount / 500;
    hundreds = (amount % 500) / 100;
}

int main() {
    int amount, fives = 0, hundreds = 0;
    std::cin >> amount;
    split_notes(amount, fives, hundreds);
    std::cout << fives << " " << hundreds << std::endl;
    return 0;
}
`,
  /* Q4 Digit Sum of a Three-Digit Code */
  `#include <iostream>

int digit_sum3(int n) {
    int s = n % 10;
    s += (n / 10) % 10;
    s += n / 100;
    return s;
}

int main() {
    int n;
    std::cin >> n;
    std::cout << digit_sum3(n) << std::endl;
    return 0;
}
`,
  /* Q5 Swap via References */
  `#include <iostream>

void swap_ints(int &a, int &b) {
    int tmp = a;
    a = b;
    b = tmp;
}

int main() {
    int a, b;
    std::cin >> a >> b;
    swap_ints(a, b);
    std::cout << a << " " << b << std::endl;
    return 0;
}
`,
  /* Q6 Roll Number Prefix and Digit */
  `#include <iostream>

void last_digit(int n, int &prefix, int &digit) {
    prefix = n / 10;
    digit = n % 10;
}

int main() {
    int n, prefix = 0, digit = 0;
    std::cin >> n;
    last_digit(n, prefix, digit);
    std::cout << prefix << " " << digit << std::endl;
    return 0;
}
`,
  /* Q7 Electricity Slab Bill */
  `#include <iostream>

int slab_bill(int units) {
    int bill = 0;
    if (units > 200) {
        bill += (units - 200) * 8;
        units = 200;
    }
    if (units > 100) {
        bill += (units - 100) * 5;
        units = 100;
    }
    bill += units * 3;
    return bill;
}

int main() {
    int units;
    std::cin >> units;
    std::cout << slab_bill(units) << std::endl;
    return 0;
}
`,
  /* Q8 Tiered Auto Fare */
  `#include <iostream>

int auto_fare(int km) {
    int fare = 25;
    if (km > 2) fare += (km - 2) * 12;
    if (km > 10) fare += 20;
    return fare;
}

int main() {
    int km;
    std::cin >> km;
    std::cout << auto_fare(km) << std::endl;
    return 0;
}
`,
  /* Q9 Grade Classifier */
  `#include <iostream>
#include <string>

std::string grade_of(int score) {
    if (score >= 90) return "A";
    if (score >= 75) return "B";
    if (score >= 60) return "C";
    if (score >= 40) return "D";
    return "F";
}

int main() {
    int score;
    std::cin >> score;
    std::cout << grade_of(score) << std::endl;
    return 0;
}
`,
  /* Q10 Triangle Type Classifier */
  `#include <iostream>
#include <string>

std::string triangle_type(int a, int b, int c) {
    if (a == b && b == c) return "EQUILATERAL";
    if (a == b || b == c || a == c) return "ISOSCELES";
    return "SCALENE";
}

int main() {
    int a, b, c;
    std::cin >> a >> b >> c;
    std::cout << triangle_type(a, b, c) << std::endl;
    return 0;
}
`,
  /* Q11 Phone Bill with Slabs */
  `#include <iostream>
#include <iomanip>

double phone_bill(int minutes) {
    double bill = 99.0;
    if (minutes > 200) {
        bill += (minutes - 200) * 1.2;
        minutes = 200;
    }
    if (minutes > 100) {
        bill += (minutes - 100) * 0.8;
    }
    return bill;
}

int main() {
    int minutes;
    std::cin >> minutes;
    std::cout << std::fixed << std::setprecision(2)
              << phone_bill(minutes) << std::endl;
    return 0;
}
`,
  /* Q12 Sum of Two Integers */
  `#include <iostream>

int sum_two(int a, int b) {
    return a + b;
}

int main() {
    int a, b;
    std::cin >> a >> b;
    std::cout << sum_two(a, b) << std::endl;
    return 0;
}
`,
  /* Q13 Difference and Product */
  `#include <iostream>

void diff_prod(int a, int b, int &diff, int &prod) {
    diff = a - b;
    prod = a * b;
}

int main() {
    int a, b, diff = 0, prod = 0;
    std::cin >> a >> b;
    diff_prod(a, b, diff, prod);
    std::cout << diff << " " << prod << std::endl;
    return 0;
}
`,
  /* Q14 Average of Three Doubles */
  `#include <iostream>
#include <iomanip>

double average_three(double a, double b, double c) {
    return (a + b + c) / 3.0;
}

int main() {
    double a, b, c;
    std::cin >> a >> b >> c;
    std::cout << std::fixed << std::setprecision(2)
              << average_three(a, b, c) << std::endl;
    return 0;
}
`,
  /* Q15 Rectangle Area and Perimeter */
  `#include <iostream>
#include <iomanip>

void rect_props(double len, double wid, double &area, double &perim) {
    area = len * wid;
    perim = 2.0 * (len + wid);
}

int main() {
    double len, wid, area = 0, perim = 0;
    std::cin >> len >> wid;
    rect_props(len, wid, area, perim);
    std::cout << std::fixed << std::setprecision(2)
              << area << " " << perim << std::endl;
    return 0;
}
`,
  /* Q16 Percentage of Marks */
  `#include <iostream>
#include <iomanip>

double percent(int marks, int total) {
    return marks * 100.0 / total;
}

int main() {
    int marks, total;
    std::cin >> marks >> total;
    std::cout << std::fixed << std::setprecision(2)
              << percent(marks, total) << std::endl;
    return 0;
}
`,
  /* Q17 Quotient and Remainder */
  `#include <iostream>

void div_mod(int a, int b, int &quot, int &rem) {
    quot = a / b;
    rem = a % b;
}

int main() {
    int a, b, quot = 0, rem = 0;
    std::cin >> a >> b;
    div_mod(a, b, quot, rem);
    std::cout << quot << " " << rem << std::endl;
    return 0;
}
`,
  /* Q18 Simple Interest Calculator */
  `#include <iostream>
#include <iomanip>

double simple_interest(double p, double r, int t) {
    return p * r * t / 100.0;
}

int main() {
    double p, r;
    int t;
    std::cin >> p >> r >> t;
    std::cout << std::fixed << std::setprecision(2)
              << simple_interest(p, r, t) << std::endl;
    return 0;
}
`,
  /* Q19 Grocery Receipt Total */
  `#include <iostream>
#include <iomanip>

double receipt_total(double price, int qty, double taxPercent) {
    double sub = price * qty;
    return sub * (1 + taxPercent / 100.0);
}

int main() {
    double price, taxPercent;
    int qty;
    std::cin >> price >> qty >> taxPercent;
    std::cout << std::fixed << std::setprecision(2)
              << receipt_total(price, qty, taxPercent) << std::endl;
    return 0;
}
`,
  /* Q20 Cinema Ticket Cost */
  `#include <iostream>

int ticket_cost(int adults, int kids) {
    return adults * 250 + kids * 120;
}

int main() {
    int adults, kids;
    std::cin >> adults >> kids;
    std::cout << ticket_cost(adults, kids) << std::endl;
    return 0;
}
`,
];

const data = JSON.parse(readFileSync(SRC, "utf8"));
if (data.questions.length !== programs.length)
  throw new Error(`expected ${data.questions.length} programs, got ${programs.length}`);
data.questions.forEach((q, i) => {
  q.sourcecode = programs[i];
});
writeFileSync(OUT, JSON.stringify(data, null, 2));
console.log(`day-01.code.json written: ${data.questions.length} programs`);
