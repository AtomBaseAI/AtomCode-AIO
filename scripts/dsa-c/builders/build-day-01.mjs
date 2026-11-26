// Day 01 — Introduction to DSA and C Setup: complete standalone C programs.
// Uses String.raw so C escapes like \n survive literally.
import { readFileSync, writeFileSync } from "node:fs";

const SRC = [
// q00 Sum of Two Integers
String.raw`#include <stdio.h>

int sum_two(int a, int b) {
    return a + b;
}

int main(void) {
    int a, b;
    if (scanf("%d %d", &a, &b) != 2) return 0;
    printf("%d\n", sum_two(a, b));
    return 0;
}`,
// q01 Difference and Product
String.raw`#include <stdio.h>

void diff_prod(int a, int b, int *diff, int *prod) {
    *diff = a - b;
    *prod = a * b;
}

int main(void) {
    int a, b, d, p;
    if (scanf("%d %d", &a, &b) != 2) return 0;
    diff_prod(a, b, &d, &p);
    printf("%d %d\n", d, p);
    return 0;
}`,
// q02 Quotient and Remainder
String.raw`#include <stdio.h>

void div_mod(int a, int b, int *quot, int *rem) {
    *quot = a / b;
    *rem = a % b;
}

int main(void) {
    int a, b, q, r;
    if (scanf("%d %d", &a, &b) != 2) return 0;
    div_mod(a, b, &q, &r);
    printf("%d %d\n", q, r);
    return 0;
}`,
// q03 Celsius to Fahrenheit
String.raw`#include <stdio.h>

double celsius_to_fahrenheit(double c) {
    return c * 9.0 / 5.0 + 32.0;
}

int main(void) {
    double c;
    if (scanf("%lf", &c) != 1) return 0;
    printf("%.2f\n", celsius_to_fahrenheit(c));
    return 0;
}`,
// q04 Simple Interest Function
String.raw`#include <stdio.h>

double simple_interest(double p, double r, int t) {
    return p * r * t / 100.0;
}

int main(void) {
    double p, r;
    int t;
    if (scanf("%lf %lf %d", &p, &r, &t) != 3) return 0;
    printf("%.2f\n", simple_interest(p, r, t));
    return 0;
}`,
// q05 Average of Three Marks
String.raw`#include <stdio.h>

double average_three(int a, int b, int c) {
    return (a + b + c) / 3.0;
}

int main(void) {
    int a, b, c;
    if (scanf("%d %d %d", &a, &b, &c) != 3) return 0;
    printf("%.2f\n", average_three(a, b, c));
    return 0;
}`,
// q06 Grocery Receipt Total
String.raw`#include <stdio.h>

double receipt_total(double price, int qty, double taxPercent) {
    double sub = price * qty;
    return sub + sub * taxPercent / 100.0;
}

int main(void) {
    double price, tax;
    int qty;
    if (scanf("%lf %d %lf", &price, &qty, &tax) != 3) return 0;
    printf("%.2f\n", receipt_total(price, qty, tax));
    return 0;
}`,
// q07 Cinema Ticket Cost
String.raw`#include <stdio.h>

int ticket_cost(int adults, int children) {
    return adults * 150 + children * 80;
}

int main(void) {
    int adults, children;
    if (scanf("%d %d", &adults, &children) != 2) return 0;
    printf("%d\n", ticket_cost(adults, children));
    return 0;
}`,
// q08 Trip Fuel Cost
String.raw`#include <stdio.h>

double fuel_cost(double km, double litrePrice) {
    return km / 100.0 * 8.0 * litrePrice;
}

int main(void) {
    double km, price;
    if (scanf("%lf %lf", &km, &price) != 2) return 0;
    printf("%.2f\n", fuel_cost(km, price));
    return 0;
}`,
// q09 Hostel Mess Bill
String.raw`#include <stdio.h>

int mess_bill(int vegDays, int nonvegDays) {
    return vegDays * 60 + nonvegDays * 95;
}

int main(void) {
    int veg, nonveg;
    if (scanf("%d %d", &veg, &nonveg) != 2) return 0;
    printf("%d\n", mess_bill(veg, nonveg));
    return 0;
}`,
// q10 Currency Denomination Split (blacklist: for,while / whitelist: /,%)
String.raw`#include <stdio.h>

void split_notes(int amount, int *fifties, int *hundreds) {
    *fifties = amount / 500;
    *hundreds = (amount % 500) / 100;
}

int main(void) {
    int amount, f, h;
    if (scanf("%d", &amount) != 1) return 0;
    split_notes(amount, &f, &h);
    printf("%d %d\n", f, h);
    return 0;
}`,
// q11 Seconds to Clock Parts (blacklist: for,while / whitelist: /,%)
String.raw`#include <stdio.h>

void to_clock(int total, int *h, int *m, int *s) {
    *h = total / 3600;
    *m = (total % 3600) / 60;
    *s = total % 60;
}

int main(void) {
    int total, h, m, s;
    if (scanf("%d", &total) != 1) return 0;
    to_clock(total, &h, &m, &s);
    printf("%d %d %d\n", h, m, s);
    return 0;
}`,
// q12 Digit Sum of a Three-Digit Number (blacklist: for,while / whitelist: %)
String.raw`#include <stdio.h>

int digit_sum3(int n) {
    int s = n % 10;
    s += (n / 10) % 10;
    s += n / 100;
    return s;
}

int main(void) {
    int n;
    if (scanf("%d", &n) != 1) return 0;
    printf("%d\n", digit_sum3(n));
    return 0;
}`,
// q13 Swap via Pointers (blacklist: swap( / whitelist: tmp)
String.raw`#include <stdio.h>

void swap_ints(int *a, int *b) {
    int tmp = *a;
    *a = *b;
    *b = tmp;
}

int main(void) {
    int x, y;
    if (scanf("%d %d", &x, &y) != 2) return 0;
    swap_ints(&x, &y);
    printf("%d %d\n", x, y);
    return 0;
}`,
// q14 Series and Parallel Resistance (blacklist: pow / whitelist: *)
String.raw`#include <stdio.h>

void resistance(double r1, double r2, double *series, double *parallel) {
    *series = r1 + r2;
    *parallel = (r1 * r2) / (r1 + r2);
}

int main(void) {
    double r1, r2, s, p;
    if (scanf("%lf %lf", &r1, &r2) != 2) return 0;
    resistance(r1, r2, &s, &p);
    printf("%.3f %.3f\n", s, p);
    return 0;
}`,
// q15 Last Digit and Digit Stripping (blacklist: for,while / whitelist: %)
String.raw`#include <stdio.h>

void last_digit(int n, int *prefix, int *digit) {
    *prefix = n / 10;
    *digit = n % 10;
}

int main(void) {
    int n, prefix, digit;
    if (scanf("%d", &n) != 1) return 0;
    last_digit(n, &prefix, &digit);
    printf("%d %d\n", prefix, digit);
    return 0;
}`,
// q16 Grade Classifier (blacklist: switch / whitelist: if)
String.raw`#include <stdio.h>

char grade_of(int score) {
    if (score >= 90) return 'A';
    if (score >= 75) return 'B';
    if (score >= 60) return 'C';
    if (score >= 40) return 'D';
    return 'F';
}

int main(void) {
    int score;
    if (scanf("%d", &score) != 1) return 0;
    putchar(grade_of(score));
    putchar('\n');
    return 0;
}`,
// q17 Compound Interest Without pow (blacklist: pow / whitelist: for)
String.raw`#include <stdio.h>

double compound_interest(double p, double r, int years) {
    double amount = p;
    int i;
    for (i = 0; i < years; i++) {
        amount *= (1.0 + r / 100.0);
    }
    return amount - p;
}

int main(void) {
    double p, r;
    int years;
    if (scanf("%lf %lf %d", &p, &r, &years) != 3) return 0;
    printf("%.2f\n", compound_interest(p, r, years));
    return 0;
}`,
// q18 Triangle Type Classifier (blacklist: printf / whitelist: return)
String.raw`#include <stdio.h>

const char *triangle_type(int a, int b, int c) {
    if (a == b && b == c) return "EQUILATERAL";
    if (a == b || b == c || a == c) return "ISOSCELES";
    return "SCALENE";
}

int main(void) {
    int a, b, c;
    if (scanf("%d %d %d", &a, &b, &c) != 3) return 0;
    puts(triangle_type(a, b, c));
    return 0;
}`,
// q19 Tiered Taxi Fare (blacklist: printf / whitelist: return)
String.raw`#include <stdio.h>

double taxi_fare(double km, int night) {
    double fare;
    int extra;
    if (km <= 0) return 0.0;
    fare = 50.0;
    if (km > 2.0) {
        extra = (int)(km - 2.0);
        fare += (double)extra * 18.0;
    }
    if (night) {
        fare *= 1.2;
    }
    return fare;
}

static void put_long(long v) {
    if (v >= 10) put_long(v / 10);
    putchar((char)('0' + (int)(v % 10)));
}

static void print_money(double value) {
    long cents = (long)(value * 100.0 + 0.5);
    put_long(cents / 100);
    putchar('.');
    if (cents % 100 < 10) putchar('0');
    put_long(cents % 100);
    putchar('\n');
}

int main(void) {
    double km;
    int night;
    if (scanf("%lf %d", &km, &night) != 2) return 0;
    print_money(taxi_fare(km, night));
    return 0;
}`,
];

const bankPath = "/home/z/tmp/dsa-export/dsa-c/day-01.code.json";
const bank = JSON.parse(readFileSync(bankPath, "utf8"));
if (bank.questions.length !== SRC.length) throw new Error(`count mismatch day01`);
bank.questions.forEach((q, i) => { q.sourcecode = SRC[i]; });
writeFileSync("/home/z/my-project/scripts/dsa-c/data/day-01.code.json", JSON.stringify(bank, null, 2) + "\n");

const mcq = JSON.parse(readFileSync("/home/z/tmp/dsa-export/dsa-c/day-01.mcq.json", "utf8"));
const mcqOut = { day: mcq.day, questions: mcq.questions.map(({ _id, ...rest }) => rest) };
writeFileSync("/home/z/my-project/scripts/dsa-c/data/day-01.mcq.json", JSON.stringify(mcqOut, null, 2) + "\n");
console.log("day-01 written:", bank.questions.length, "code,", mcqOut.questions.length, "mcq");
