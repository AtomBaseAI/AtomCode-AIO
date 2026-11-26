#!/usr/bin/env python3
"""Repair day-01 sourcecode for dsa-python. Writes data/day-01.code.json + day-01.mcq.json."""
import json, os

SRC = "/home/z/tmp/dsa-export/dsa-python/day-01.code.json"
MCQ_SRC = "/home/z/tmp/dsa-export/dsa-python/day-01.mcq.json"
OUT_DIR = os.path.dirname(os.path.abspath(__file__)) + "/data"

# NOTE: blacklist = comma-separated substrings that MUST NOT appear in code;
# whitelist = substrings that MUST appear. Honored per question below.
CODES = [
    # Q0 Sum of Two Integers (bl='' wl='')
    "a, b = map(int, input().split())\nprint(a + b)\n",
    # Q1 Difference and Product (bl='' wl='')
    "a, b = map(int, input().split())\nprint(a - b, a * b)\n",
    # Q2 Quotient and Remainder (bl='' wl='')
    "a, b = map(int, input().split())\nprint(a // b, a % b)\n",
    # Q3 Average of Three Marks (bl='' wl='')
    "a, b, c = map(int, input().split())\nprint(\"{:.2f}\".format((a + b + c) / 3))\n",
    # Q4 Simple Interest (bl='' wl='')
    "p, r, t = map(float, input().split())\nprint(\"{:.2f}\".format(p * r * t / 100))\n",
    # Q5 Celsius to Fahrenheit (bl='' wl='')
    "c = float(input())\nprint(\"{:.2f}\".format(c * 9 / 5 + 32))\n",
    # Q6 Rectangle Area and Perimeter (bl='' wl='')
    "w, h = map(float, input().split())\nprint(\"{:.2f} {:.2f}\".format(w * h, 2 * (w + h)))\n",
    # Q7 Grocery Receipt Total (bl='' wl='')
    "price, qty, tax = map(float, input().split())\nsub = price * qty\nprint(\"{:.2f}\".format(sub + sub * tax / 100))\n",
    # Q8 Movie Ticket Cost (bl='' wl='')
    "age = int(input())\nif age < 12:\n    print(80)\nelif age < 60:\n    print(150)\nelse:\n    print(100)\n",
    # Q9 Hostel Mess Bill (bl='' wl='')
    "days, rate = map(int, input().split())\nprint(days * rate + 500)\n",
    # Q10 Time-Aware Greeting (bl='print,input' wl='if')
    "import sys\n\n\ndef make_greeting(name, hour):\n    if 5 <= hour <= 11:\n        return \"Good morning, \" + name + \"!\"\n    if 12 <= hour <= 16:\n        return \"Good afternoon, \" + name + \"!\"\n    if 17 <= hour <= 21:\n        return \"Good evening, \" + name + \"!\"\n    return \"Good night, \" + name + \"!\"\n\n\ndata = sys.stdin.read().split()\nname = data[0]\nhour = int(data[1])\nsys.stdout.write(make_greeting(name, hour) + \"\\n\")\n",
    # Q11 Splitting the Bill (bl='print,input' wl='/')
    "import sys\n\n\ndef split_bill(total, people, tip_percent):\n    return (total * (1 + tip_percent / 100)) / people\n\n\ndata = sys.stdin.read().split()\ntotal = float(data[0])\npeople = int(data[1])\ntip_percent = float(data[2])\nsys.stdout.write(\"{:.2f}\\n\".format(split_bill(total, people, tip_percent)))\n",
    # Q12 Seconds to Hours Minutes Seconds (bl='print,input' wl='return')
    "import sys\n\n\ndef split_time(seconds):\n    hours = seconds // 3600\n    minutes = (seconds % 3600) // 60\n    secs = seconds % 60\n    return (hours, minutes, secs)\n\n\ntotal = int(sys.stdin.read().strip())\nh, m, s = split_time(total)\nsys.stdout.write(str(h) + \" \" + str(m) + \" \" + str(s) + \"\\n\")\n",
    # Q13 BMI Report (bl='print,input' wl='/')
    "import sys\n\n\ndef bmi_report(weight_kg, height_m):\n    bmi = weight_kg / (height_m * height_m)\n    if bmi < 18.5:\n        return (bmi, \"UNDERWEIGHT\")\n    if bmi < 25:\n        return (bmi, \"NORMAL\")\n    if bmi < 30:\n        return (bmi, \"OVERWEIGHT\")\n    return (bmi, \"OBESE\")\n\n\ndata = sys.stdin.read().split()\nbmi, category = bmi_report(float(data[0]), float(data[1]))\nsys.stdout.write(\"{:.1f} {}\\n\".format(bmi, category))\n",
    # Q14 Parking Fee (bl='print,input' wl='if')
    "import sys\n\n\ndef parking_fee(hours):\n    if hours <= 0:\n        return 0\n    extra = int(hours - 1)\n    if extra < 0:\n        extra = 0\n    fee = 20 + 15 * extra\n    if fee > 100:\n        fee = 100\n    return fee\n\n\nhours = float(sys.stdin.read().strip())\nsys.stdout.write(str(parking_fee(hours)) + \"\\n\")\n",
    # Q15 Formatted Receipt Line (bl='print,input,%' wl='.format')
    "import sys\n\n\ndef receipt_line(item, price):\n    return \"{}: {:.2f}\".format(item, price)\n\n\nlines = sys.stdin.read().split(\"\\n\")\nitem = lines[0].strip()\nprice = float(lines[1].strip())\nsys.stdout.write(receipt_line(item, price) + \"\\n\")\n",
    # Q16 Grade Classifier (bl='print,input' wl='elif')
    "import sys\n\n\ndef grade_of(score):\n    if score >= 90:\n        return \"A\"\n    elif score >= 75:\n        return \"B\"\n    elif score >= 60:\n        return \"C\"\n    elif score >= 40:\n        return \"D\"\n    else:\n        return \"F\"\n\n\nscore = int(sys.stdin.read().strip())\nsys.stdout.write(grade_of(score) + \"\\n\")\n",
    # Q17 Triangle Type Classifier (bl='print,input' wl='and')
    "import sys\n\n\ndef triangle_type(a, b, c):\n    if a == b and b == c:\n        return \"EQUILATERAL\"\n    if a == b or b == c or a == c:\n        return \"ISOSCELES\"\n    return \"SCALENE\"\n\n\ndata = sys.stdin.read().split()\na, b, c = int(data[0]), int(data[1]), int(data[2])\nsys.stdout.write(triangle_type(a, b, c) + \"\\n\")\n",
    # Q18 Tiered Taxi Fare (bl='print,input,math' wl='if')
    "import sys\n\n\ndef taxi_fare(km, night):\n    if km <= 0:\n        return 0.0\n    fare = 50.0\n    if km > 2:\n        fare += int(km - 2) * 18.0\n    if night:\n        fare *= 1.2\n    return fare\n\n\ndata = sys.stdin.read().split()\nsys.stdout.write(\"{:.2f}\\n\".format(taxi_fare(float(data[0]), int(data[1]))))\n",
    # Q19 Slab Electricity Bill (bl='print,input,min' wl='elif')
    "import sys\n\n\ndef electricity_bill(units):\n    if units <= 100:\n        bill = units * 3.5\n    elif units <= 200:\n        bill = 100 * 3.5 + (units - 100) * 5.0\n    else:\n        bill = 100 * 3.5 + 100 * 5.0 + (units - 200) * 8.0\n    return bill + 90\n\n\nunits = int(sys.stdin.read().strip())\nsys.stdout.write(\"{:.2f}\\n\".format(electricity_bill(units)))\n",
]


def main():
    doc = json.load(open(SRC))
    qs = doc["questions"]
    assert len(qs) == len(CODES), (len(qs), len(CODES))
    for q, code in zip(qs, CODES):
        bl = [k.strip() for k in (q.get("blacklist") or "").split(",") if k.strip()]
        wl = [k.strip() for k in (q.get("whitelist") or "").split(",") if k.strip()]
        for k in bl:
            assert k not in code, f"blacklist hit {k!r} in {q['title']}"
        for k in wl:
            assert k in code, f"whitelist missing {k!r} in {q['title']}"
        compile(code, q["title"], "exec")
        q["sourcecode"] = code
    os.makedirs(OUT_DIR, exist_ok=True)
    json.dump(doc, open(f"{OUT_DIR}/day-01.code.json", "w"), indent=2)

    mcq = json.load(open(MCQ_SRC))
    mcq["questions"] = [{k: v for k, v in item.items() if k != "_id"} for item in mcq["questions"]]
    json.dump(mcq, open(f"{OUT_DIR}/day-01.mcq.json", "w"), indent=2)
    print("day-01 written:", len(qs), "code questions,", len(mcq["questions"]), "mcq")


if __name__ == "__main__":
    main()
