/**
 * Builder for Day 4 — "Control Flow (if-else)" (PYTHON Programming question group).
 * Writes day-04.code.json (20 code questions) and day-04.mcq.json (20 MCQs).
 * Run: bun scripts/python-programming/builders/build-day-04.ts
 */
import { writeFileSync } from "node:fs";

const TOPIC = "Control Flow (if-else)";
const SUBTOPICS = [
  "if Statement",
  "if-else Statement",
  "elif Ladder",
  "Nested Control Structures",
];

interface CodeQ {
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  variant: "basic" | "scenario";
  maxscore: number;
  lang: string;
  topic: string;
  subtopic: string;
  sampleinput1: string;
  sampleoutput1: string;
  sampleinput2: string;
  sampleoutput2: string;
  input1: string;
  output1: string;
  input2: string;
  output2: string;
  input3: string;
  output3: string;
  inputconstrains: string;
  blacklist: string;
  whitelist: string;
  sourcecode: string;
}

interface McqQ {
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  topic: string;
  subtopic: string;
  Option1: string;
  Option2: string;
  Option3: string;
  Option4: string;
  CorrectOption: number;
  iscodesnippet: boolean;
  codesnippet: string | null;
  snippetLang: string | null;
}

function cq(q: Partial<CodeQ> & Pick<CodeQ, "title" | "description" | "difficulty" | "variant" | "subtopic"> & Record<string, any>): CodeQ {
  return {
    maxscore: q.difficulty === "easy" ? 10 : q.difficulty === "medium" ? 20 : 30,
    lang: "python",
    topic: TOPIC,
    blacklist: "",
    whitelist: "",
    ...q,
  } as CodeQ;
}

function mq(m: Partial<McqQ> & Pick<McqQ, "title" | "description" | "difficulty" | "subtopic" | "Option1" | "Option2" | "Option3" | "Option4" | "CorrectOption"> & Record<string, any>): McqQ {
  return {
    topic: TOPIC,
    iscodesnippet: false,
    codesnippet: null,
    snippetLang: null,
    ...m,
  } as McqQ;
}

/* ══════════════════════ CODE QUESTIONS (20) ══════════════════════ */

const questions: CodeQ[] = [
  /* ---- easy / basic (6) ---- */
  cq({
    title: "Hot Day Detector",
    description: `A weather gadget flashes an alert when the temperature climbs. Read an integer temperature: if it is strictly greater than 35 print "Heat Alert", otherwise print "Normal Day".

Input Format:
One line with a single integer temperature.

Output Format:
One line: exactly "Heat Alert" or "Normal Day".

Constraints:
-50 <= temperature <= 60`,
    difficulty: "easy",
    variant: "basic",
    subtopic: "if Statement",
    sampleinput1: "40",
    sampleoutput1: "Heat Alert",
    sampleinput2: "30",
    sampleoutput2: "Normal Day",
    input1: "35",
    output1: "Normal Day",
    input2: "36",
    output2: "Heat Alert",
    input3: "-10",
    output3: "Normal Day",
    inputconstrains: "-50 <= temperature <= 60",
    sourcecode: `t = int(input())
if t > 35:
    print("Heat Alert")
else:
    print("Normal Day")`,
  }),

  cq({
    title: "Odd or Even Reporter",
    description: `Read an integer and report its parity using an if-else statement. A number is even when it leaves remainder 0 on division by 2, otherwise it is odd. This must work for negatives too.

Input Format:
One line with a single integer n.

Output Format:
One line: exactly "Even" or "Odd".

Constraints:
-1000 <= n <= 1000`,
    difficulty: "easy",
    variant: "basic",
    subtopic: "if-else Statement",
    sampleinput1: "8",
    sampleoutput1: "Even",
    sampleinput2: "7",
    sampleoutput2: "Odd",
    input1: "0",
    output1: "Even",
    input2: "-5",
    output2: "Odd",
    input3: "-12",
    output3: "Even",
    inputconstrains: "-1000 <= n <= 1000",
    sourcecode: `n = int(input())
if n % 2 == 0:
    print("Even")
else:
    print("Odd")`,
  }),

  cq({
    title: "Sign Classifier Ladder",
    description: `Read an integer and classify its sign with an elif ladder: print "Positive" when it is greater than 0, "Negative" when it is less than 0, and "Zero" otherwise.

Input Format:
One line with a single integer n.

Output Format:
One line: exactly "Positive", "Negative" or "Zero".

Constraints:
-1000000 <= n <= 1000000`,
    difficulty: "easy",
    variant: "basic",
    subtopic: "elif Ladder",
    sampleinput1: "15",
    sampleoutput1: "Positive",
    sampleinput2: "-8",
    sampleoutput2: "Negative",
    input1: "0",
    output1: "Zero",
    input2: "1",
    output2: "Positive",
    input3: "-1",
    output3: "Negative",
    inputconstrains: "-1000000 <= n <= 1000000",
    sourcecode: `n = int(input())
if n > 0:
    print("Positive")
elif n < 0:
    print("Negative")
else:
    print("Zero")`,
  }),

  cq({
    title: "Grade Letter Mapper",
    description: `A school maps exam marks to letter grades with an elif ladder: 90 or above earns "A", 75-89 earns "B", 60-74 earns "C", 40-59 earns "D", and anything below 40 earns "F". Read the marks and print the grade letter.

Input Format:
One line with a single integer marks.

Output Format:
One line: exactly "A", "B", "C", "D" or "F".

Constraints:
0 <= marks <= 100`,
    difficulty: "easy",
    variant: "basic",
    subtopic: "elif Ladder",
    sampleinput1: "92",
    sampleoutput1: "A",
    sampleinput2: "76",
    sampleoutput2: "B",
    input1: "90",
    output1: "A",
    input2: "75",
    output2: "B",
    input3: "39",
    output3: "F",
    inputconstrains: "0 <= marks <= 100",
    sourcecode: `m = int(input())
if m >= 90:
    print("A")
elif m >= 75:
    print("B")
elif m >= 60:
    print("C")
elif m >= 40:
    print("D")
else:
    print("F")`,
  }),

  cq({
    title: "Larger of Two Numbers",
    description: `Read two integers and print the larger one using an if-else comparison. When both are equal, print exactly "Equal" instead.

Input Format:
One line with two space-separated integers a and b.

Output Format:
One line: the larger of the two numbers, or exactly "Equal" when a and b are the same.

Constraints:
-10000 <= a, b <= 10000`,
    difficulty: "easy",
    variant: "basic",
    subtopic: "if-else Statement",
    sampleinput1: "12 7",
    sampleoutput1: "12",
    sampleinput2: "5 5",
    sampleoutput2: "Equal",
    input1: "-3 -9",
    output1: "-3",
    input2: "0 -1",
    output2: "0",
    input3: "4 10",
    output3: "10",
    inputconstrains: "-10000 <= a, b <= 10000",
    sourcecode: `a, b = map(int, input().split())
if a > b:
    print(a)
elif a < b:
    print(b)
else:
    print("Equal")`,
  }),

  cq({
    title: "Entry Gate Double Check",
    description: `A club entrance uses a nested check. First the gatekeeper verifies age: only visitors aged 18 or older pass the age gate. For those who pass, a second nested check verifies identity: visitors holding an ID ("yes") are allowed in, the rest must show one. Underage visitors are always denied.

Input Format:
Line 1: age (integer).
Line 2: has ID, "yes" or "no".

Output Format:
One line: exactly "Entry Allowed", "ID Required" or "Entry Denied".

Constraints:
1 <= age <= 120; the second line is yes or no`,
    difficulty: "easy",
    variant: "basic",
    subtopic: "Nested Control Structures",
    sampleinput1: `20\nyes`,
    sampleoutput1: "Entry Allowed",
    sampleinput2: `16\nyes`,
    sampleoutput2: "Entry Denied",
    input1: `18\nno`,
    output1: "ID Required",
    input2: `25\nno`,
    output2: "ID Required",
    input3: `15\nno`,
    output3: "Entry Denied",
    inputconstrains: "1 <= age <= 120, second line is yes or no",
    sourcecode: `age = int(input())
has_id = input()
if age >= 18:
    if has_id == "yes":
        print("Entry Allowed")
    else:
        print("ID Required")
else:
    print("Entry Denied")`,
  }),

  /* ---- easy / scenario (4) ---- */
  cq({
    title: "Cinema Ticket Counter",
    description: `A multiplex prices tickets by age bracket: children below 12 pay 150, adults from 12 to 59 pay 300, and seniors of 60 and above pay 200. Read the visitor's age and print the fare with an elif ladder.

Input Format:
One line with a single integer age.

Output Format:
One line with the ticket fare (an integer).

Constraints:
1 <= age <= 120`,
    difficulty: "easy",
    variant: "scenario",
    subtopic: "elif Ladder",
    sampleinput1: "8",
    sampleoutput1: "150",
    sampleinput2: "34",
    sampleoutput2: "300",
    input1: "12",
    output1: "300",
    input2: "60",
    output2: "200",
    input3: "70",
    output3: "200",
    inputconstrains: "1 <= age <= 120",
    sourcecode: `age = int(input())
if age < 12:
    print(150)
elif age < 60:
    print(300)
else:
    print(200)`,
  }),

  cq({
    title: "Baggage Fee Ladder",
    description: `An airline charges for checked baggage by weight: up to 20 kg flies free, 21 to 30 kg costs a flat 500, and every kg above 30 adds another 100 on top of the flat 500. Read the bag weight and print the fee.

Input Format:
One line with a single integer weight (kg).

Output Format:
One line with the baggage fee (an integer, 0 means free).

Constraints:
1 <= weight <= 100`,
    difficulty: "easy",
    variant: "scenario",
    subtopic: "elif Ladder",
    sampleinput1: "18",
    sampleoutput1: "0",
    sampleinput2: "27",
    sampleoutput2: "500",
    input1: "20",
    output1: "0",
    input2: "30",
    output2: "500",
    input3: "35",
    output3: "1000",
    inputconstrains: "1 <= weight <= 100",
    sourcecode: `w = int(input())
if w <= 20:
    print(0)
elif w <= 30:
    print(500)
else:
    print(500 + (w - 30) * 100)`,
  }),

  cq({
    title: "Leap Year Verdict",
    description: `A calendar utility flags leap years with the full Gregorian rule: a year is a leap year when it is divisible by 4 AND not divisible by 100, unless it is divisible by 400 (in which case it is a leap year anyway). Read a year and print the verdict.

Input Format:
One line with a single integer year.

Output Format:
One line: exactly "Leap Year" or "Not Leap Year".

Constraints:
1900 <= year <= 3000`,
    difficulty: "easy",
    variant: "scenario",
    subtopic: "if-else Statement",
    sampleinput1: "2024",
    sampleoutput1: "Leap Year",
    sampleinput2: "2023",
    sampleoutput2: "Not Leap Year",
    input1: "1900",
    output1: "Not Leap Year",
    input2: "2000",
    output2: "Leap Year",
    input3: "2100",
    output3: "Not Leap Year",
    inputconstrains: "1900 <= year <= 3000",
    sourcecode: `y = int(input())
if (y % 4 == 0 and y % 100 != 0) or y % 400 == 0:
    print("Leap Year")
else:
    print("Not Leap Year")`,
  }),

  cq({
    title: "Weather Outfit Advisor",
    description: `A travel app suggests what to wear from the temperature and the rain forecast:

- below 10 degrees: "Heavy Jacket" (rain does not change it)
- 10 to 24 degrees (inclusive of 10, below 25): "Umbrella" if it rains, otherwise "Sweater"
- 25 degrees or more: "Light Raincoat" if it rains, otherwise "T-Shirt"

Read the temperature and the rain flag and print exactly one suggestion.

Input Format:
One line with the temperature (integer) and the rain flag ("yes" or "no"), separated by a space.

Output Format:
One line: exactly one of "Heavy Jacket", "Umbrella", "Sweater", "Light Raincoat" or "T-Shirt".

Constraints:
-30 <= temperature <= 50; rain flag is yes or no`,
    difficulty: "easy",
    variant: "scenario",
    subtopic: "Nested Control Structures",
    sampleinput1: "30 no",
    sampleoutput1: "T-Shirt",
    sampleinput2: "18 yes",
    sampleoutput2: "Umbrella",
    input1: "5 no",
    output1: "Heavy Jacket",
    input2: "25 yes",
    output2: "Light Raincoat",
    input3: "10 no",
    output3: "Sweater",
    inputconstrains: "-30 <= temperature <= 50, rain flag is yes or no",
    sourcecode: `t, rain = input().split()
t = int(t)
if t < 10:
    print("Heavy Jacket")
elif t < 25:
    if rain == "yes":
        print("Umbrella")
    else:
        print("Sweater")
else:
    if rain == "yes":
        print("Light Raincoat")
    else:
        print("T-Shirt")`,
  }),

  /* ---- medium (6, all scenario) ---- */
  cq({
    title: "ATM Withdrawal Simulator",
    description: `An ATM processes one withdrawal request against an account and reports the FIRST rule that fails, in this priority order:

1. The amount is more than the balance: print "Insufficient Balance".
2. The amount is not a multiple of 100: print "Invalid Amount".
3. The amount exceeds the daily limit of 10000: print "Daily Limit Exceeded".
4. Otherwise the withdrawal succeeds: print "Withdrawn. Remaining: X" where X is the new balance.

Combine the checks with an elif ladder (no and-chains) so the priority order is preserved.

Input Format:
Line 1: account balance (integer).
Line 2: withdrawal amount (integer).

Output Format:
One line with the result as described above.

Constraints:
0 <= balance <= 100000, 1 <= amount <= 50000`,
    difficulty: "medium",
    variant: "scenario",
    subtopic: "Nested Control Structures",
    sampleinput1: `5000\n2000`,
    sampleoutput1: "Withdrawn. Remaining: 3000",
    sampleinput2: `1000\n1500`,
    sampleoutput2: "Insufficient Balance",
    input1: `500\n1230`,
    output1: "Insufficient Balance",
    input2: `8000\n2550`,
    output2: "Invalid Amount",
    input3: `20000\n11000`,
    output3: "Daily Limit Exceeded",
    inputconstrains: "0 <= balance <= 100000, 1 <= amount <= 50000",
    blacklist: "and ",
    whitelist: "elif, else:",
    sourcecode: `def main():
    balance = int(input())
    amount = int(input())
    if amount > balance:
        print("Insufficient Balance")
    elif amount % 100 != 0:
        print("Invalid Amount")
    elif amount > 10000:
        print("Daily Limit Exceeded")
    else:
        print(f"Withdrawn. Remaining: {balance - amount}")


main()`,
  }),

  cq({
    title: "Triangle Side Classifier",
    description: `Read three side lengths and classify the triangle. First check validity: each pair of sides must sum to more than the third side (a + b > c, b + c > a, a + c > b). An invalid triple prints "Invalid Triangle". A valid triangle is "Equilateral" when all three sides are equal, "Isosceles" when exactly two sides are equal, and "Scalene" when all differ. Do not use sets; compare the sides explicitly.

Input Format:
One line with three space-separated integers a b c.

Output Format:
One line: exactly "Invalid Triangle", "Equilateral", "Isosceles" or "Scalene".

Constraints:
1 <= a, b, c <= 1000`,
    difficulty: "medium",
    variant: "scenario",
    subtopic: "if-else Statement",
    sampleinput1: "3 3 3",
    sampleoutput1: "Equilateral",
    sampleinput2: "1 2 9",
    sampleoutput2: "Invalid Triangle",
    input1: "5 5 8",
    output1: "Isosceles",
    input2: "4 5 6",
    output2: "Scalene",
    input3: "1 1 2",
    output3: "Invalid Triangle",
    inputconstrains: "1 <= a, b, c <= 1000",
    blacklist: "set(",
    whitelist: "and , elif",
    sourcecode: `a, b, c = map(int, input().split())
if a + b > c and b + c > a and a + c > b:
    if a == b == c:
        print("Equilateral")
    elif a == b or b == c or a == c:
        print("Isosceles")
    else:
        print("Scalene")
else:
    print("Invalid Triangle")`,
  }),

  cq({
    title: "Secure Login Flow",
    description: `A login module checks credentials against the stored account (username "admin", passcode "atom@123") in strict order:

1. If the account is locked ("locked"): print "Account Locked" — no further checks.
2. Else if the username is not "admin": print "Unknown User".
3. Else if the passcode is not "atom@123": print "Wrong Passcode".
4. Otherwise: print "Login Successful".

Usernames and passcodes are case-sensitive. Build the flow with an elif ladder (avoid or-chains).

Input Format:
Line 1: account status, "active" or "locked".
Line 2: entered username.
Line 3: entered passcode.

Output Format:
One line with exactly one of the four messages above.

Constraints:
The status line is active or locked; username and passcode are single tokens without spaces`,
    difficulty: "medium",
    variant: "scenario",
    subtopic: "Nested Control Structures",
    sampleinput1: `active\nadmin\natom@123`,
    sampleoutput1: "Login Successful",
    sampleinput2: `locked\nadmin\natom@123`,
    sampleoutput2: "Account Locked",
    input1: `locked\nroot\nwhatever`,
    output1: "Account Locked",
    input2: `active\nguest\natom@123`,
    output2: "Unknown User",
    input3: `active\nadmin\natom@321`,
    output3: "Wrong Passcode",
    inputconstrains: "status line is active or locked; username and passcode are single tokens",
    blacklist: "or ",
    whitelist: "elif, else:",
    sourcecode: `def main():
    status = input()
    user = input()
    pwd = input()
    if status == "locked":
        print("Account Locked")
    elif user != "admin":
        print("Unknown User")
    elif pwd != "atom@123":
        print("Wrong Passcode")
    else:
        print("Login Successful")


main()`,
  }),

  cq({
    title: "Metro Fare Calculator",
    description: `A metro network charges by zone with passenger concessions:

Base fare by zone: zone 1 costs 20, zone 2 costs 35, zone 3 costs 50.
Students always pay half of the base fare.
Seniors travel free during off-peak hours, and pay half of the base fare during peak hours.
Adults pay the base fare, plus 5 extra during peak hours.

Print the fare with exactly 2 decimal places.

Input Format:
Line 1: zone (1, 2 or 3).
Line 2: passenger type, "adult", "student" or "senior".
Line 3: time of travel, "peak" or "offpeak".

Output Format:
One line with the fare, formatted with exactly 2 decimal places.

Constraints:
zone is 1, 2 or 3; type is adult, student or senior; time is peak or offpeak`,
    difficulty: "medium",
    variant: "scenario",
    subtopic: "elif Ladder",
    sampleinput1: `1\nadult\npeak`,
    sampleoutput1: "25.00",
    sampleinput2: `2\nstudent\noffpeak`,
    sampleoutput2: "17.50",
    input1: `3\nsenior\noffpeak`,
    output1: "0.00",
    input2: `3\nsenior\npeak`,
    output2: "25.00",
    input3: `2\nadult\noffpeak`,
    output3: "35.00",
    inputconstrains: "zone is 1, 2 or 3; type is adult, student or senior; time is peak or offpeak",
    blacklist: "min(",
    whitelist: "elif, else:",
    sourcecode: `def main():
    zone = int(input())
    ptype = input()
    t = input()
    if zone == 1:
        base = 20
    elif zone == 2:
        base = 35
    else:
        base = 50
    if ptype == "student":
        fare = base * 0.5
    elif ptype == "senior":
        if t == "peak":
            fare = base * 0.5
        else:
            fare = 0.0
    else:
        if t == "peak":
            fare = base + 5
        else:
            fare = float(base)
    print(f"{fare:.2f}")


main()`,
  }),

  cq({
    title: "Speeding Fine Calculator",
    description: `A traffic camera compares a car's speed with the road limit:

- At or below the limit: print "No Fine".
- Up to 10 km/h over: fine of 100.
- 11 to 25 km/h over: fine of 250.
- More than 25 km/h over: fine of 250 plus 20 for every km/h beyond 25.

Print the outcome as "No Fine" or "Fine: N" where N is the fine amount.

Input Format:
One line with two space-separated integers: the speed limit and the recorded speed.

Output Format:
One line: exactly "No Fine" or "Fine: N".

Constraints:
30 <= limit <= 120, 1 <= speed <= 200`,
    difficulty: "medium",
    variant: "scenario",
    subtopic: "elif Ladder",
    sampleinput1: "60 60",
    sampleoutput1: "No Fine",
    sampleinput2: "60 70",
    sampleoutput2: "Fine: 100",
    input1: "50 80",
    output1: "Fine: 350",
    input2: "40 100",
    output2: "Fine: 950",
    input3: "100 99",
    output3: "No Fine",
    inputconstrains: "30 <= limit <= 120, 1 <= speed <= 200",
    blacklist: "abs(",
    whitelist: "elif, else:",
    sourcecode: `def main():
    limit, speed = map(int, input().split())
    if speed <= limit:
        print("No Fine")
    elif speed - limit <= 10:
        print("Fine: 100")
    elif speed - limit <= 25:
        print("Fine: 250")
    else:
        print(f"Fine: {250 + (speed - limit - 25) * 20}")


main()`,
  }),

  cq({
    title: "Hotel Room Allotment",
    description: `A hotel allots rooms by preference and party size. VIP guests are handled first: a VIP party of at most 4 gets the "Suite Allotted" message, a bigger VIP party is told "Reduce Guests". Non-VIP guests are seated by preference:

- suite: allowed for 1-4 guests, otherwise "Reduce Guests"
- double: allowed for 1-2 guests, otherwise "Reduce Guests"
- single (any other preference): allowed for exactly 1 guest, otherwise "Reduce Guests"

Print the allotment result.

Input Format:
Line 1: number of guests (integer).
Line 2: preference, "single", "double" or "suite".
Line 3: VIP flag, "yes" or "no".

Output Format:
One line: exactly "Suite Allotted", "Double Allotted", "Single Allotted" or "Reduce Guests".

Constraints:
1 <= guests <= 6; preference is single, double or suite; vip flag is yes or no`,
    difficulty: "medium",
    variant: "scenario",
    subtopic: "Nested Control Structures",
    sampleinput1: `2\ndouble\nno`,
    sampleoutput1: "Double Allotted",
    sampleinput2: `5\nsuite\nyes`,
    sampleoutput2: "Reduce Guests",
    input1: `1\nsingle\nno`,
    output1: "Single Allotted",
    input2: `3\ndouble\nyes`,
    output2: "Suite Allotted",
    input3: `3\nsuite\nno`,
    output3: "Suite Allotted",
    inputconstrains: "1 <= guests <= 6; preference is single, double or suite; vip flag is yes or no",
    blacklist: "or ",
    whitelist: "elif, else:",
    sourcecode: `def main():
    g = int(input())
    pref = input()
    vip = input()
    if vip == "yes":
        if g <= 4:
            print("Suite Allotted")
        else:
            print("Reduce Guests")
    elif pref == "suite":
        if g <= 4:
            print("Suite Allotted")
        else:
            print("Reduce Guests")
    elif pref == "double":
        if g <= 2:
            print("Double Allotted")
        else:
            print("Reduce Guests")
    else:
        if g == 1:
            print("Single Allotted")
        else:
            print("Reduce Guests")


main()`,
  }),

  /* ---- hard (4) ---- */
  cq({
    title: "Loan Approval Engine",
    description: `A bank's loan engine runs an applicant through four gates in strict order, rejecting at the FIRST gate that fails:

1. age below 21: "Rejected: Age Below Minimum"
2. monthly income below 25000: "Rejected: Income Too Low"
3. credit score below 650: "Rejected: Low Credit Score"
4. three or more active loans: "Rejected: Loan Exposure"

An applicant who clears every gate is approved. The eligible amount is decided by nested checks: with a score of at least 800 the amount is 500000 when income is at least 60000, otherwise 300000; with a score from 720 to 799 the amount is 300000; any other passing score gets 150000. Print the decision exactly as specified.

Input Format:
Four lines: age, monthly income, credit score, active loans (each an integer).

Output Format:
Either one rejection line (as above) or two lines: "Approved" then "Amount: X".

Constraints:
18 <= age <= 80, 0 <= income <= 200000, 300 <= score <= 900, 0 <= loans <= 5`,
    difficulty: "hard",
    variant: "scenario",
    subtopic: "Nested Control Structures",
    sampleinput1: `21\n25000\n650\n0`,
    sampleoutput1: "Approved\nAmount: 150000",
    sampleinput2: `19\n90000\n850\n0`,
    sampleoutput2: "Rejected: Age Below Minimum",
    input1: `25\n20000\n700\n0`,
    output1: "Rejected: Income Too Low",
    input2: `25\n30000\n600\n0`,
    output2: "Rejected: Low Credit Score",
    input3: `40\n50000\n720\n3`,
    output3: "Rejected: Loan Exposure",
    inputconstrains: "18 <= age <= 80, 0 <= income <= 200000, 300 <= score <= 900, 0 <= loans <= 5",
    blacklist: "and ",
    whitelist: "elif, else:",
    sourcecode: `def main():
    age = int(input())
    income = int(input())
    score = int(input())
    loans = int(input())
    if age < 21:
        print("Rejected: Age Below Minimum")
        return
    if income < 25000:
        print("Rejected: Income Too Low")
        return
    if score < 650:
        print("Rejected: Low Credit Score")
        return
    if loans >= 3:
        print("Rejected: Loan Exposure")
        return
    print("Approved")
    if score >= 800:
        if income >= 60000:
            print("Amount: 500000")
        else:
            print("Amount: 300000")
    elif score >= 720:
        print("Amount: 300000")
    else:
        print("Amount: 150000")


main()`,
  }),

  cq({
    title: "Multi-Tier Canteen Billing",
    description: `A canteen counter prices items from two codes and a membership flag:

Item code 1 (meal): regular tier 120, jumbo tier 190.
Item code 2 (beverage): regular 50, jumbo 80.
Item code 3 (dessert): regular 90, jumbo 130.

Members ("yes") get 15% off when the item price is more than 150, otherwise 5% off. Non-members pay the listed price. Print the final payable amount with exactly 2 decimal places. Do not use elif anywhere; the tiers must be resolved with nested if-else blocks.

Input Format:
Line 1: item code (1, 2 or 3).
Line 2: tier code (1 for regular, 2 for jumbo).
Line 3: member flag, "yes" or "no".

Output Format:
One line with the payable amount, formatted with exactly 2 decimal places.

Constraints:
item is 1, 2 or 3; tier is 1 or 2; member flag is yes or no`,
    difficulty: "hard",
    variant: "scenario",
    subtopic: "Nested Control Structures",
    sampleinput1: `1\n2\nyes`,
    sampleoutput1: "161.50",
    sampleinput2: `2\n1\nno`,
    sampleoutput2: "50.00",
    input1: `1\n1\nyes`,
    output1: "114.00",
    input2: `3\n2\nyes`,
    output2: "123.50",
    input3: `3\n2\nno`,
    output3: "130.00",
    inputconstrains: "item is 1, 2 or 3; tier is 1 or 2; member flag is yes or no",
    blacklist: "elif",
    whitelist: "if , else:",
    sourcecode: `def main():
    code = int(input())
    tier = int(input())
    member = input()
    if code == 1:
        price = 120 if tier == 1 else 190
    else:
        if code == 2:
            price = 50 if tier == 1 else 80
        else:
            price = 90 if tier == 1 else 130
    if member == "yes":
        if price > 150:
            payable = price * 85 / 100
        else:
            payable = price * 95 / 100
    else:
        payable = float(price)
    print(f"{payable:.2f}")


main()`,
  }),

  cq({
    title: "Concert Entry and Pricing Desk",
    description: `A concert venue sells tickets under combined rules. The base ticket is 250 for the matinee show and 450 for the evening show.

- Children below 12 are NOT allowed at the evening show at all: print "Entry Restricted" (even with a membership). At the matinee they pay half the base price.
- Seniors aged 60 or above pay 70% of the base price, and an extra 20% member discount on top of that if they are members.
- Everyone else pays the base price, reduced by 20% for members.

Print the price with exactly 2 decimal places, or the restriction message.

Input Format:
Line 1: age (integer).
Line 2: member flag, "yes" or "no".
Line 3: show, "matinee" or "evening".

Output Format:
One line: "Entry Restricted" or the ticket price with exactly 2 decimal places.

Constraints:
1 <= age <= 100; member flag is yes or no; show is matinee or evening`,
    difficulty: "hard",
    variant: "scenario",
    subtopic: "elif Ladder",
    sampleinput1: `15\nno\nevening`,
    sampleoutput1: "450.00",
    sampleinput2: `8\nyes\nevening`,
    sampleoutput2: "Entry Restricted",
    input1: `30\nyes\nmatinee`,
    output1: "200.00",
    input2: `65\nyes\nmatinee`,
    output2: "140.00",
    input3: `8\nno\nmatinee`,
    output3: "125.00",
    inputconstrains: "1 <= age <= 100; member flag is yes or no; show is matinee or evening",
    blacklist: "or ",
    whitelist: "elif, else:",
    sourcecode: `def main():
    age = int(input())
    member = input()
    show = input()
    base = 250 if show == "matinee" else 450
    if age < 12:
        if show == "evening":
            print("Entry Restricted")
        else:
            print(f"{base * 50 / 100:.2f}")
    elif age >= 60:
        price = base * 70 / 100
        if member == "yes":
            price = price * 80 / 100
        print(f"{price:.2f}")
    else:
        price = float(base)
        if member == "yes":
            price = price * 80 / 100
        print(f"{price:.2f}")


main()`,
  }),

  cq({
    title: "Insurance Premium Classifier",
    description: `An insurer prices a yearly policy from age, vehicle type and claim history. Applicants younger than 18 are simply told "Not Eligible". For everyone else:

Base premium: car 5000, bike 2500.
Age loading: below 25 the premium is multiplied by 1.4; above 60 it is multiplied by 1.25; ages 25 to 60 (both inclusive) get no age loading.
Claim factor: no claims multiplies by 0.9; exactly one claim leaves the premium unchanged; two or more claims multiply by 1.5.

Print the final premium with exactly 2 decimal places. When the applicant has three or more claims, also print a second line "High Risk Profile".

Input Format:
Line 1: age (integer).
Line 2: vehicle, "car" or "bike".
Line 3: claims in the last year (integer).

Output Format:
One line with the premium (2 decimals); plus a second line "High Risk Profile" when claims >= 3.

Constraints:
17 <= age <= 80; vehicle is car or bike; 0 <= claims <= 5`,
    difficulty: "hard",
    variant: "scenario",
    subtopic: "Nested Control Structures",
    sampleinput1: `30\ncar\n0`,
    sampleoutput1: "4500.00",
    sampleinput2: `16\nbike\n0`,
    sampleoutput2: "Not Eligible",
    input1: `25\ncar\n2`,
    output1: "7500.00",
    input2: `61\nbike\n1`,
    output2: "3125.00",
    input3: `22\ncar\n3`,
    output3: "10500.00\nHigh Risk Profile",
    inputconstrains: "17 <= age <= 80; vehicle is car or bike; 0 <= claims <= 5",
    blacklist: "elif, or ",
    whitelist: "if , else:",
    sourcecode: `def main():
    age = int(input())
    vehicle = input()
    claims = int(input())
    if age < 18:
        print("Not Eligible")
    else:
        premium = 5000 if vehicle == "car" else 2500
        if age < 25:
            premium = premium * 140 / 100
        else:
            if age > 60:
                premium = premium * 125 / 100
        if claims >= 2:
            premium = premium * 150 / 100
        else:
            if claims == 0:
                premium = premium * 90 / 100
        print(f"{premium:.2f}")
        if claims >= 3:
            print("High Risk Profile")


main()`,
  }),
];

/* ══════════════════════ MCQ QUESTIONS (20) ══════════════════════ */

const mcqs: McqQ[] = [
  mq({
    title: "Block Denotation After if",
    description: "In Python, how is the body (block) of an if statement marked?",
    difficulty: "easy",
    subtopic: "if Statement",
    Option1: "Indentation (commonly 4 spaces)",
    Option2: "Curly braces { }",
    Option3: "A semicolon after the condition",
    Option4: "The begin keyword",
    CorrectOption: 1,
  }),
  mq({
    title: "Single Equals in Condition",
    description: "A beginner writes: if x = 5: (a single equals sign) instead of a comparison. What happens?",
    difficulty: "easy",
    subtopic: "if Statement",
    Option1: "x is assigned 5 and the block always runs",
    Option2: "SyntaxError — assignment is not allowed in a condition",
    Option3: "It is silently treated as a comparison with 5",
    Option4: "x becomes the boolean True",
    CorrectOption: 2,
  }),
  mq({
    title: "Falsy String Value",
    description: "Non-empty strings are truthy and the empty string is falsy. Which of these string values is falsy in an if condition?",
    difficulty: "easy",
    subtopic: "if Statement",
    Option1: '"0"',
    Option2: '"" (the empty string)',
    Option3: '" " (a single space)',
    Option4: '"false"',
    CorrectOption: 2,
  }),
  mq({
    title: "Alternative Branch Keyword",
    description: "Which keyword introduces the branch that runs when the if condition is False and no other case applies?",
    difficulty: "easy",
    subtopic: "if-else Statement",
    Option1: "elif",
    Option2: "else",
    Option3: "catch",
    Option4: "default",
    CorrectOption: 2,
  }),
  mq({
    title: "Ladder Branch Selection",
    description: "In an if / elif / elif / else ladder, how many branches execute for a single input?",
    difficulty: "easy",
    subtopic: "elif Ladder",
    Option1: "All branches whose conditions are True",
    Option2: "Exactly the first branch whose condition is True (or the else)",
    Option3: "Always the final else branch",
    Option4: "All branches, from top to bottom",
    CorrectOption: 2,
  }),
  mq({
    title: "Missing Colon Outcome",
    description: "A student writes: if x > 5 (no colon) followed by an indented block. What is the result?",
    difficulty: "easy",
    subtopic: "if Statement",
    Option1: "The block runs only when x > 5",
    Option2: "SyntaxError — the colon is required",
    Option3: "The condition is ignored and the block always runs",
    Option4: "NameError on x",
    CorrectOption: 2,
  }),
  mq({
    title: "Purpose of pass",
    description: "What does the pass statement do inside an if block?",
    difficulty: "easy",
    subtopic: "if Statement",
    Option1: "Exits the whole program",
    Option2: "Skips the remaining branches",
    Option3: "Nothing — it is a placeholder where the syntax requires a statement",
    Option4: "Raises NotImplementedError",
    CorrectOption: 3,
  }),
  mq({
    title: "Zero in Condition",
    description: 'Numbers are truthy when non-zero. What does this two-line structure print: if 0: print("hi") followed by else: print("no")?',
    difficulty: "easy",
    subtopic: "if-else Statement",
    Option1: "hi",
    Option2: "Error — 0 is not a boolean",
    Option3: "no",
    Option4: "Nothing prints",
    CorrectOption: 3,
  }),
  mq({
    title: "Negated Empty List",
    description: "With x = [], does the body of the statement: if not x: execute?",
    difficulty: "easy",
    subtopic: "if Statement",
    Option1: "No — an empty list is truthy",
    Option2: "Only when x is None",
    Option3: "Error — not cannot be applied to lists",
    Option4: "Yes — an empty list is falsy, so not x is True",
    CorrectOption: 4,
  }),
  mq({
    title: "Chained Comparison Truth",
    description: "Python allows chained comparisons like 1 <= 2 <= 3, which evaluates each link. What does this expression evaluate to?",
    difficulty: "easy",
    subtopic: "if-else Statement",
    Option1: "Error — comparisons cannot be chained",
    Option2: "False",
    Option3: "2",
    Option4: "True",
    CorrectOption: 4,
  }),

  mq({
    title: "Ladder Path for Seven",
    description: "The ladder below is evaluated top to bottom for x = 7. Which line does it print?",
    difficulty: "medium",
    subtopic: "elif Ladder",
    Option1: "other",
    Option2: "even",
    Option3: "three",
    Option4: "It prints nothing",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: 'x = 7\nif x % 2 == 0:\n    print("even")\nelif x % 3 == 0:\n    print("three")\nelse:\n    print("other")',
    snippetLang: "python",
  }),
  mq({
    title: "Nested If Two Outputs",
    description: "Both print statements sit inside the outer if (the second one after the inner if finishes). What exactly does the program output?",
    difficulty: "medium",
    subtopic: "Nested Control Structures",
    Option1: "big only",
    Option2: "mid only",
    Option3: "big and mid, each on its own line",
    Option4: "Nothing",
    CorrectOption: 3,
    iscodesnippet: true,
    codesnippet: 'x = 10\nif x > 5:\n    if x > 8:\n        print("big")\n    print("mid")',
    snippetLang: "python",
  }),
  mq({
    title: "Empty List Truthiness Branch",
    description: "An empty list is falsy in Python. Which branch of this program runs?",
    difficulty: "medium",
    subtopic: "if-else Statement",
    Option1: "has items",
    Option2: "empty",
    Option3: "It raises an error",
    Option4: "It prints None",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: 'items = []\nif items:\n    print("has items")\nelse:\n    print("empty")',
    snippetLang: "python",
  }),
  mq({
    title: "Zero Checks Branch",
    description: "n is 0, which is falsy but still equals zero. Which branch of this ladder runs?",
    difficulty: "medium",
    subtopic: "elif Ladder",
    Option1: "A",
    Option2: "B",
    Option3: "C",
    Option4: "Nothing",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: 'n = 0\nif n:\n    print("A")\nelif n == 0:\n    print("B")\nelse:\n    print("C")',
    snippetLang: "python",
  }),
  mq({
    title: "Ternary Status Assignment",
    description: "A conditional expression picks one of two values at assignment time. What does this program print?",
    difficulty: "medium",
    subtopic: "if-else Statement",
    Option1: "minor",
    Option2: "adult",
    Option3: "None",
    Option4: "SyntaxError",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: 'age = 20\nstatus = "minor" if age < 18 else "adult"\nprint(status)',
    snippetLang: "python",
  }),
  mq({
    title: "Chained Pair Verdict",
    description: "Chained comparisons evaluate each link and combine with an implicit and. What does this program print?",
    difficulty: "medium",
    subtopic: "if-else Statement",
    Option1: "True False",
    Option2: "True True",
    Option3: "False True",
    Option4: "False False",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: "x = 5\nprint(1 < x < 10, x < 1 < 10)",
    snippetLang: "python",
  }),

  mq({
    title: "elif After Matching if",
    description: "The elif below belongs to the outer if, which already matched. What does the program print?",
    difficulty: "hard",
    subtopic: "elif Ladder",
    Option1: "A only",
    Option2: "A and B",
    Option3: "B only",
    Option4: "C only",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: 'x = 12\nif x > 10:\n    if x % 2 == 0:\n        print("A")\nelif x > 5:\n    print("B")\nelse:\n    print("C")',
    snippetLang: "python",
  }),
  mq({
    title: "Precedence of and over or",
    description: "and binds tighter than or inside Python conditions. What does this program print?",
    difficulty: "hard",
    subtopic: "if-else Statement",
    Option1: "no — the operators are applied strictly left to right",
    Option2: "yes — the and clause is grouped first, so the or still sees a True left side",
    Option3: "Error — or and and cannot be mixed",
    Option4: "Nothing",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: 'a, b = 9, 2\nif a > 5 or b > 5 and a < b:\n    print("yes")\nelse:\n    print("no")',
    snippetLang: "python",
  }),
  mq({
    title: "String Zero Versus Integer",
    description: 'x holds the one-character string "0", which is truthy and not equal to the number 0. What does the program print?',
    difficulty: "hard",
    subtopic: "Nested Control Structures",
    Option1: "one then four, on separate lines",
    Option2: "one then three",
    Option3: "two then four",
    Option4: "one only",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: 'x = "0"\nif x:\n    print("one")\nif not x:\n    print("two")\nprint("three" if x == 0 else "four")',
    snippetLang: "python",
  }),
  mq({
    title: "Nested Else Path",
    description: "x is 5. Trace the nested structure carefully: which line is printed?",
    difficulty: "hard",
    subtopic: "Nested Control Structures",
    Option1: "P",
    Option2: "Q",
    Option3: "R",
    Option4: "Nothing",
    CorrectOption: 2,
    iscodesnippet: true,
    codesnippet: 'x = 5\nif x > 2:\n    if x > 10:\n        print("P")\n    else:\n        print("Q")\nelif x > 1:\n    print("R")',
    snippetLang: "python",
  }),
];

/* ══════════════════════ WRITE FILES ══════════════════════ */

const codePath = "/home/z/my-project/scripts/python-programming/data/day-04.code.json";
const mcqPath = "/home/z/my-project/scripts/python-programming/data/day-04.mcq.json";

writeFileSync(codePath, JSON.stringify({ day: 4, topics: [{ name: TOPIC, subtopics: SUBTOPICS }], questions }, null, 2));
writeFileSync(mcqPath, JSON.stringify({ day: 4, questions: mcqs }, null, 2));

console.log(`wrote day 4: ${questions.length} code questions, ${mcqs.length} MCQs`);
