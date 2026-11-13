/**
 * Builder for Day 17 — "Working with Dates and Times".
 * Emits:
 *   /home/z/my-project/scripts/python-programming/data/day-17.code.json  (20 code questions)
 *   /home/z/my-project/scripts/python-programming/data/day-17.mcq.json   (20 MCQ questions)
 *
 * Determinism: no now()/today()/utcnow — every date is built from input or
 * explicit constructor arguments. No sets printed. All inputs non-empty.
 */
import { writeFileSync } from "node:fs";

const DAY = 17;
const TOPIC = "Working with Dates and Times";
const SUBTOPICS = [
  "datetime Module Basics",
  "date and time Objects",
  "Formatting with strftime",
  "Parsing with strptime",
  "timedelta Arithmetic",
];

function codeQ(o: Record<string, unknown>) {
  return Object.assign({ lang: "python", topic: TOPIC }, o);
}

function mcq(o: Record<string, unknown>) {
  return Object.assign(
    { iscodesnippet: false, codesnippet: null, snippetLang: null },
    o
  );
}

/* ────────────────────────────── CODE QUESTIONS ────────────────────────────── */

const questions = [
  codeQ({
    title: "Weekday Number and Name",
    description:
      "A scheduling drill builds one calendar date from its parts and reports the weekday two ways: as the weekday() number (Monday is 0) and as the English weekday name.\n\nInput Format:\nOne line: three space-separated integers y m d forming a valid calendar date.\n\nOutput Format:\nLine 1: the weekday number, where Monday is 0 and Sunday is 6\nLine 2: the weekday name in English\n\nConstraints:\n1900 <= y <= 2100; 1 <= m <= 12; 1 <= d <= number of days in that month.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "date and time Objects",
    sampleinput1: "2024 8 15",
    sampleoutput1: "3\nThursday",
    sampleinput2: "2024 5 15",
    sampleoutput2: "2\nWednesday",
    input1: "2024 1 1",
    output1: "0\nMonday",
    input2: "2024 7 4",
    output2: "3\nThursday",
    input3: "2023 2 28",
    output3: "1\nTuesday",
    inputconstrains: "1900 <= y <= 2100, 1 <= m <= 12, 1 <= d <= days in month",
    blacklist: "",
    whitelist: "",
    sourcecode: `from datetime import date

y, m, d = map(int, input().split())
dt = date(y, m, d)
print(dt.weekday())
print(dt.strftime("%A"))
`,
  }),

  codeQ({
    title: "Datetime Parts Breakdown",
    description:
      "A console clock drill receives five integers, constructs a datetime object explicitly, and prints each stored component on its own line.\n\nInput Format:\nOne line: five space-separated integers y m d h min.\n\nOutput Format:\nFive lines, exactly:\nYear: <y>\nMonth: <m>\nDay: <d>\nHour: <h>\nMinute: <min>\n\nConstraints:\n2000 <= y <= 2100; 1 <= m <= 12; 1 <= d <= days in month; 0 <= h <= 23; 0 <= min <= 59.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "datetime Module Basics",
    sampleinput1: "2024 5 15 14 30",
    sampleoutput1: "Year: 2024\nMonth: 5\nDay: 15\nHour: 14\nMinute: 30",
    sampleinput2: "2023 12 31 23 59",
    sampleoutput2: "Year: 2023\nMonth: 12\nDay: 31\nHour: 23\nMinute: 59",
    input1: "2024 2 29 0 5",
    output1: "Year: 2024\nMonth: 2\nDay: 29\nHour: 0\nMinute: 5",
    input2: "2025 6 1 9 0",
    output2: "Year: 2025\nMonth: 6\nDay: 1\nHour: 9\nMinute: 0",
    input3: "1999 11 11 11 11",
    output3: "Year: 1999\nMonth: 11\nDay: 11\nHour: 11\nMinute: 11",
    inputconstrains: "2000 <= y <= 2100 (1999 allowed in tests), 0 <= h <= 23, 0 <= min <= 59",
    blacklist: "",
    whitelist: "",
    sourcecode: `from datetime import datetime

y, m, d, hh, mm = map(int, input().split())
dt = datetime(y, m, d, hh, mm)
print(f"Year: {dt.year}")
print(f"Month: {dt.month}")
print(f"Day: {dt.day}")
print(f"Hour: {dt.hour}")
print(f"Minute: {dt.minute}")
`,
  }),

  codeQ({
    title: "Slash Date Format Drill",
    description:
      "A report formatter renders one calendar date in two notations. Given y m d, build the date and print it with strftime using the %d-%m-%Y and %Y/%m/%d codes.\n\nInput Format:\nOne line: three space-separated integers y m d.\n\nOutput Format:\nLine 1: the date as DD-MM-YYYY (zero-padded)\nLine 2: the date as YYYY/MM/DD (zero-padded)\n\nConstraints:\n1900 <= y <= 2100; 1 <= m <= 12; 1 <= d <= days in month.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Formatting with strftime",
    sampleinput1: "2024 8 15",
    sampleoutput1: "15-08-2024\n2024/08/15",
    sampleinput2: "2025 1 3",
    sampleoutput2: "03-01-2025\n2025/01/03",
    input1: "2024 3 5",
    output1: "05-03-2024\n2024/03/05",
    input2: "2023 11 20",
    output2: "20-11-2023\n2023/11/20",
    input3: "2022 6 30",
    output3: "30-06-2022\n2022/06/30",
    inputconstrains: "1900 <= y <= 2100, 1 <= m <= 12, 1 <= d <= days in month",
    blacklist: "",
    whitelist: "",
    sourcecode: `from datetime import date

y, m, d = map(int, input().split())
dt = date(y, m, d)
print(dt.strftime("%d-%m-%Y"))
print(dt.strftime("%Y/%m/%d"))
`,
  }),

  codeQ({
    title: "Twelve Hour Clock Drill",
    description:
      "A wall-clock drill prints one moment twice: in 24-hour notation and in 12-hour notation with an AM/PM marker. Note that 12-hour %I zero-pads and midnight prints as 12:xx AM.\n\nInput Format:\nOne line: five space-separated integers y m d h min.\n\nOutput Format:\nLine 1: HH:MM in 24-hour form\nLine 2: hh:MM AM or hh:MM PM in 12-hour form (zero-padded hour)\n\nConstraints:\n2000 <= y <= 2100; 1 <= m <= 12; 1 <= d <= days in month; 0 <= h <= 23; 0 <= min <= 59.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Formatting with strftime",
    sampleinput1: "2024 5 15 14 30",
    sampleoutput1: "14:30\n02:30 PM",
    sampleinput2: "2024 5 16 0 15",
    sampleoutput2: "00:15\n12:15 AM",
    input1: "2024 5 15 12 0",
    output1: "12:00\n12:00 PM",
    input2: "2023 9 2 7 5",
    output2: "07:05\n07:05 AM",
    input3: "2024 11 23 23 45",
    output3: "23:45\n11:45 PM",
    inputconstrains: "2000 <= y <= 2100, 0 <= h <= 23, 0 <= min <= 59",
    blacklist: "",
    whitelist: "",
    sourcecode: `from datetime import datetime

y, mo, d, h, mi = map(int, input().split())
dt = datetime(y, mo, d, h, mi)
print(dt.strftime("%H:%M"))
print(dt.strftime("%I:%M %p"))
`,
  }),

  codeQ({
    title: "Parse Then Weekday",
    description:
      "A parsing drill takes a date written as DD-MM-YYYY text, converts it with strptime using the exactly matching format string, and reports the ISO form plus the weekday name.\n\nInput Format:\nOne line: a date written exactly as DD-MM-YYYY (zero-padded).\n\nOutput Format:\nLine 1: the same date in ISO YYYY-MM-DD form\nLine 2: the weekday name in English\n\nConstraints:\nThe date is a valid calendar date between 1900-01-01 and 2100-12-31.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "Parsing with strptime",
    sampleinput1: "15-08-2024",
    sampleoutput1: "2024-08-15\nThursday",
    sampleinput2: "01-01-2025",
    sampleoutput2: "2025-01-01\nWednesday",
    input1: "29-02-2024",
    output1: "2024-02-29\nThursday",
    input2: "14-02-2025",
    output2: "2025-02-14\nFriday",
    input3: "25-12-2024",
    output3: "2024-12-25\nWednesday",
    inputconstrains: "valid date between 1900-01-01 and 2100-12-31, DD-MM-YYYY zero-padded",
    blacklist: "",
    whitelist: "",
    sourcecode: `from datetime import datetime

s = input()
dt = datetime.strptime(s, "%d-%m-%Y")
print(dt.date())
print(dt.strftime("%A"))
`,
  }),

  codeQ({
    title: "Shift Date Forward",
    description:
      "A delivery planner adds n calendar days to a start date using timedelta and prints the resulting date.\n\nInput Format:\nLine 1: a date written as DD-MM-YYYY\nLine 2: an integer n, the number of days to add\n\nOutput Format:\nOne line: the resulting date as DD-MM-YYYY\n\nConstraints:\n1 <= n <= 400; the base date is a valid calendar date between 1900-01-01 and 2100-12-31 and the result stays in the same range.",
    difficulty: "easy",
    variant: "basic",
    maxscore: 10,
    subtopic: "timedelta Arithmetic",
    sampleinput1: "25-12-2024\n7",
    sampleoutput1: "01-01-2025",
    sampleinput2: "20-02-2024\n9",
    sampleoutput2: "29-02-2024",
    input1: "30-01-2024\n1",
    output1: "31-01-2024",
    input2: "28-02-2024\n1",
    output2: "29-02-2024",
    input3: "05-11-2023\n30",
    output3: "05-12-2023",
    inputconstrains: "1 <= n <= 400, dates between 1900-01-01 and 2100-12-31",
    blacklist: "",
    whitelist: "",
    sourcecode: `from datetime import datetime, timedelta

s = input()
n = int(input())
dt = datetime.strptime(s, "%d-%m-%Y") + timedelta(days=n)
print(dt.strftime("%d-%m-%Y"))
`,
  }),

  codeQ({
    title: "Flight Arrival Estimator",
    description:
      "A regional airline desk estimates landing times. Given a departure timestamp and a flight duration in whole hours, the arrival moment is computed with timedelta and printed.\n\nInput Format:\nLine 1: departure timestamp as DD-MM-YYYY HH:MM (zero-padded)\nLine 2: an integer, the flight duration in hours\n\nOutput Format:\nOne line: Arrival: DD-MM-YYYY HH:MM\n\nConstraints:\n1 <= hours <= 72; timestamps between 2000-01-01 and 2100-12-31.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "timedelta Arithmetic",
    sampleinput1: "15-05-2024 22:45\n4",
    sampleoutput1: "Arrival: 16-05-2024 02:45",
    sampleinput2: "10-06-2024 08:30\n11",
    sampleoutput2: "Arrival: 10-06-2024 19:30",
    input1: "31-12-2023 23:30\n2",
    output1: "Arrival: 01-01-2024 01:30",
    input2: "01-03-2024 18:15\n9",
    output2: "Arrival: 02-03-2024 03:15",
    input3: "20-07-2024 14:00\n34",
    output3: "Arrival: 22-07-2024 00:00",
    inputconstrains: "1 <= hours <= 72, timestamps between 2000-01-01 and 2100-12-31",
    blacklist: "",
    whitelist: "",
    sourcecode: `from datetime import datetime, timedelta

dep = datetime.strptime(input(), "%d-%m-%Y %H:%M")
hours = int(input())
arr = dep + timedelta(hours=hours)
print(f"Arrival: {arr.strftime('%d-%m-%Y %H:%M')}")
`,
  }),

  codeQ({
    title: "Prescription Refill Planner",
    description:
      "A pharmacy planner schedules medicine refills. Starting from the first fill date, a refill happens every interval days; the first refill is start plus interval days, the second start plus twice the interval, and so on. Print the next three refill dates.\n\nInput Format:\nLine 1: the first fill date as DD-MM-YYYY\nLine 2: an integer interval in days\n\nOutput Format:\nThree lines:\nRefill 1: DD-MM-YYYY\nRefill 2: DD-MM-YYYY\nRefill 3: DD-MM-YYYY\nwhere Refill k is start plus interval times k days.\n\nConstraints:\n1 <= interval <= 90; the start date is valid between 2000-01-01 and 2090-12-31.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "timedelta Arithmetic",
    sampleinput1: "01-01-2024\n30",
    sampleoutput1: "Refill 1: 31-01-2024\nRefill 2: 01-03-2024\nRefill 3: 31-03-2024",
    sampleinput2: "10-03-2024\n45",
    sampleoutput2: "Refill 1: 24-04-2024\nRefill 2: 08-06-2024\nRefill 3: 23-07-2024",
    input1: "15-05-2024\n21",
    output1: "Refill 1: 05-06-2024\nRefill 2: 26-06-2024\nRefill 3: 17-07-2024",
    input2: "31-01-2024\n28",
    output2: "Refill 1: 28-02-2024\nRefill 2: 27-03-2024\nRefill 3: 24-04-2024",
    input3: "20-12-2024\n10",
    output3: "Refill 1: 30-12-2024\nRefill 2: 09-01-2025\nRefill 3: 19-01-2025",
    inputconstrains: "1 <= interval <= 90, start date between 2000-01-01 and 2090-12-31",
    blacklist: "",
    whitelist: "",
    sourcecode: `from datetime import datetime, timedelta

start = datetime.strptime(input(), "%d-%m-%Y")
gap = int(input())
for k in range(1, 4):
    d = start + timedelta(days=gap * k)
    print(f"Refill {k}: {d.strftime('%d-%m-%Y')}")
`,
  }),

  codeQ({
    title: "Library Due Date Desk",
    description:
      "A library loans books for exactly 14 days. Given the issue date and the actual return date, print the due date and how many days late the book was; a return on or before the due date is 0 days overdue.\n\nInput Format:\nLine 1: issue date as DD-MM-YYYY\nLine 2: return date as DD-MM-YYYY\n\nOutput Format:\nLine 1: Due: DD-MM-YYYY\nLine 2: Overdue: <n> days\n\nConstraints:\nThe return date is on or after the issue date; both dates are valid between 2000-01-01 and 2100-12-31.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "timedelta Arithmetic",
    sampleinput1: "05-03-2024\n25-03-2024",
    sampleoutput1: "Due: 19-03-2024\nOverdue: 6 days",
    sampleinput2: "01-06-2024\n10-06-2024",
    sampleoutput2: "Due: 15-06-2024\nOverdue: 0 days",
    input1: "20-02-2024\n05-03-2024",
    output1: "Due: 05-03-2024\nOverdue: 0 days",
    input2: "25-12-2024\n15-01-2025",
    output2: "Due: 08-01-2025\nOverdue: 7 days",
    input3: "11-11-2023\n20-11-2023",
    output3: "Due: 25-11-2023\nOverdue: 0 days",
    inputconstrains: "return date >= issue date, dates between 2000-01-01 and 2100-12-31",
    blacklist: "",
    whitelist: "",
    sourcecode: `from datetime import datetime, timedelta

issue = datetime.strptime(input(), "%d-%m-%Y")
ret = datetime.strptime(input(), "%d-%m-%Y")
due = issue + timedelta(days=14)
late = (ret - due).days
if late < 0:
    late = 0
print(f"Due: {due.strftime('%d-%m-%Y')}")
print(f"Overdue: {late} days")
`,
  }),

  codeQ({
    title: "Business Days Between Dates",
    description:
      "An HR desk counts working days between two dates, inclusive of both endpoints. Saturday and Sunday are non-working days.\n\nInput Format:\nLine 1: start date as DD-MM-YYYY\nLine 2: end date as DD-MM-YYYY (not earlier than the start)\n\nOutput Format:\nOne line: the number of Monday-Friday days from start to end inclusive.\n\nConstraints:\nThe range spans at most 60 days; both dates are valid calendar dates between 2000-01-01 and 2100-12-31.",
    difficulty: "easy",
    variant: "scenario",
    maxscore: 10,
    subtopic: "date and time Objects",
    sampleinput1: "08-08-2024\n15-08-2024",
    sampleoutput1: "6",
    sampleinput2: "10-08-2024\n11-08-2024",
    sampleoutput2: "0",
    input1: "01-07-2024\n07-07-2024",
    output1: "5",
    input2: "13-05-2024\n17-05-2024",
    output2: "5",
    input3: "27-12-2024\n02-01-2025",
    output3: "5",
    inputconstrains: "range spans at most 60 days, dates between 2000-01-01 and 2100-12-31",
    blacklist: "",
    whitelist: "",
    sourcecode: `from datetime import datetime, timedelta

a = datetime.strptime(input(), "%d-%m-%Y").date()
b = datetime.strptime(input(), "%d-%m-%Y").date()
count = 0
cur = a
while cur <= b:
    if cur.weekday() < 5:
        count += 1
    cur = cur + timedelta(days=1)
print(count)
`,
  }),

  codeQ({
    title: "Age In Days Engine",
    description:
      "A government form service converts a birth date into an exact age measured against a reference date, reporting the total day count and its breakdown into full weeks and leftover days using timedelta arithmetic.\n\nInput Format:\nLine 1: birth date as DD-MM-YYYY\nLine 2: reference date as DD-MM-YYYY (same day or later)\n\nOutput Format:\nLine 1: Days: <total days between the two dates>\nLine 2: Weeks: <total // 7>, Days: <total % 7>\n\nConstraints:\nBoth dates are valid calendar dates between 1900-01-01 and 2100-12-31; the total is at most 73000 days.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "timedelta Arithmetic",
    sampleinput1: "15-05-2020\n15-05-2024",
    sampleoutput1: "Days: 1461\nWeeks: 208, Days: 5",
    sampleinput2: "01-01-2024\n10-01-2024",
    sampleoutput2: "Days: 9\nWeeks: 1, Days: 2",
    input1: "29-02-2024\n01-03-2025",
    output1: "Days: 366\nWeeks: 52, Days: 2",
    input2: "31-12-2023\n01-01-2024",
    output2: "Days: 1\nWeeks: 0, Days: 1",
    input3: "10-10-2010\n10-10-2023",
    output3: "Days: 4748\nWeeks: 678, Days: 2",
    inputconstrains: "reference date >= birth date, total <= 73000 days",
    blacklist: "month_days",
    whitelist: "datetime, timedelta",
    sourcecode: `from datetime import datetime, timedelta

birth = datetime.strptime(input(), "%d-%m-%Y")
ref = datetime.strptime(input(), "%d-%m-%Y")
span = ref - birth
total = span.days
print(f"Days: {total}")
rest = span - timedelta(weeks=total // 7)
print(f"Weeks: {total // 7}, Days: {rest.days}")
`,
  }),

  codeQ({
    title: "Appointment Slot Conflict Check",
    description:
      "A clinic scheduler stores two appointment slots written as full timestamps. Decide whether the slots overlap: they clash when slot 1 starts before slot 2 ends AND slot 2 starts before slot 1 ends. Slots that merely touch at an endpoint do not overlap.\n\nInput Format:\nFour lines, each DD-MM-YYYY HH:MM: slot 1 start, slot 1 end, slot 2 start, slot 2 end (all four share one date; each slot's end is after its start).\n\nOutput Format:\nOne line: Overlap or No overlap\n\nConstraints:\nAll four timestamps share one date between 2000-01-01 and 2100-12-31; times are zero-padded HH:MM.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Parsing with strptime",
    sampleinput1: "15-05-2024 09:00\n15-05-2024 10:30\n15-05-2024 10:00\n15-05-2024 11:00",
    sampleoutput1: "Overlap",
    sampleinput2: "15-05-2024 09:00\n15-05-2024 10:00\n15-05-2024 10:00\n15-05-2024 11:00",
    sampleoutput2: "No overlap",
    input1: "01-06-2024 08:15\n01-06-2024 09:45\n01-06-2024 09:50\n01-06-2024 11:00",
    output1: "No overlap",
    input2: "01-06-2024 08:15\n01-06-2024 09:45\n01-06-2024 08:00\n01-06-2024 09:00",
    output2: "Overlap",
    input3: "20-03-2024 13:00\n20-03-2024 15:00\n20-03-2024 15:00\n20-03-2024 16:30",
    output3: "No overlap",
    inputconstrains: "four timestamps share one date, each slot end after its start",
    blacklist: "split(, re.",
    whitelist: "strptime(, datetime",
    sourcecode: `from datetime import datetime

s1 = datetime.strptime(input(), "%d-%m-%Y %H:%M")
e1 = datetime.strptime(input(), "%d-%m-%Y %H:%M")
s2 = datetime.strptime(input(), "%d-%m-%Y %H:%M")
e2 = datetime.strptime(input(), "%d-%m-%Y %H:%M")
if s1 < e2 and s2 < e1:
    print("Overlap")
else:
    print("No overlap")
`,
  }),

  codeQ({
    title: "Regional Date Formatter",
    description:
      "A travel portal shows one ISO date in three regional styles. Parse the ISO text with strptime and produce each rendering with strftime format codes.\n\nInput Format:\nOne line: a date as YYYY-MM-DD.\n\nOutput Format:\nLine 1: US: MM/DD/YYYY\nLine 2: EU: DD.MM.YYYY\nLine 3: Long: DD Month YYYY (full English month name)\n\nConstraints:\nThe date is a valid calendar date between 1900-01-01 and 2100-12-31.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Formatting with strftime",
    sampleinput1: "2024-05-15",
    sampleoutput1: "US: 05/15/2024\nEU: 15.05.2024\nLong: 15 May 2024",
    sampleinput2: "2025-01-03",
    sampleoutput2: "US: 01/03/2025\nEU: 03.01.2025\nLong: 03 January 2025",
    input1: "2024-12-31",
    output1: "US: 12/31/2024\nEU: 31.12.2024\nLong: 31 December 2024",
    input2: "2023-07-04",
    output2: "US: 07/04/2023\nEU: 04.07.2023\nLong: 04 July 2023",
    input3: "2022-09-18",
    output3: "US: 09/18/2022\nEU: 18.09.2022\nLong: 18 September 2022",
    inputconstrains: "valid date between 1900-01-01 and 2100-12-31",
    blacklist: "split(, [0:4], [:4], [5:7], [8:10], [:2]",
    whitelist: "strftime, strptime(",
    sourcecode: `from datetime import datetime

dt = datetime.strptime(input(), "%Y-%m-%d")
print(f"US: {dt.strftime('%m/%d/%Y')}")
print(f"EU: {dt.strftime('%d.%m.%Y')}")
print(f"Long: {dt.strftime('%d %B %Y')}")
`,
  }),

  codeQ({
    title: "Project Milestone Ladder",
    description:
      "A delivery team plans weekly milestones. Milestone i (counting from 1) happens exactly i weeks after the kickoff date. Print each milestone date in order.\n\nInput Format:\nLine 1: kickoff date as DD-MM-YYYY\nLine 2: an integer k, the number of milestones\n\nOutput Format:\nk lines: Milestone <i>: DD-MM-YYYY for i = 1 to k.\n\nConstraints:\n1 <= k <= 8; the kickoff date is valid between 2000-01-01 and 2090-12-31.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "timedelta Arithmetic",
    sampleinput1: "01-04-2024\n3",
    sampleoutput1: "Milestone 1: 08-04-2024\nMilestone 2: 15-04-2024\nMilestone 3: 22-04-2024",
    sampleinput2: "28-12-2024\n2",
    sampleoutput2: "Milestone 1: 04-01-2025\nMilestone 2: 11-01-2025",
    input1: "10-02-2024\n4",
    output1: "Milestone 1: 17-02-2024\nMilestone 2: 24-02-2024\nMilestone 3: 02-03-2024\nMilestone 4: 09-03-2024",
    input2: "30-11-2024\n3",
    output2: "Milestone 1: 07-12-2024\nMilestone 2: 14-12-2024\nMilestone 3: 21-12-2024",
    input3: "05-06-2024\n5",
    output3: "Milestone 1: 12-06-2024\nMilestone 2: 19-06-2024\nMilestone 3: 26-06-2024\nMilestone 4: 03-07-2024\nMilestone 5: 10-07-2024",
    inputconstrains: "1 <= k <= 8, kickoff between 2000-01-01 and 2090-12-31",
    blacklist: "toordinal, dateutil",
    whitelist: "timedelta, strftime",
    sourcecode: `from datetime import datetime, timedelta

start = datetime.strptime(input(), "%d-%m-%Y")
k = int(input())
for i in range(1, k + 1):
    d = start + timedelta(weeks=i)
    print(f"Milestone {i}: {d.strftime('%d-%m-%Y')}")
`,
  }),

  codeQ({
    title: "Time Of Day Classifier",
    description:
      "A support desk labels incoming tickets by the time of day. Parse the 24-hour clock time with strptime and print its bucket: Morning covers 05:00-11:59, Afternoon 12:00-16:59, Evening 17:00-20:59, and Night everything else (21:00-04:59).\n\nInput Format:\nOne line: a time as HH:MM (zero-padded, 24-hour).\n\nOutput Format:\nOne line: Morning, Afternoon, Evening, or Night\n\nConstraints:\n00 <= HH <= 23; 00 <= MM <= 59.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "Parsing with strptime",
    sampleinput1: "07:45",
    sampleoutput1: "Morning",
    sampleinput2: "12:00",
    sampleoutput2: "Afternoon",
    input1: "23:10",
    output1: "Night",
    input2: "17:00",
    output2: "Evening",
    input3: "04:59",
    output3: "Night",
    inputconstrains: "00 <= HH <= 23, 00 <= MM <= 59",
    blacklist: "split(",
    whitelist: "strptime(",
    sourcecode: `from datetime import datetime

t = datetime.strptime(input(), "%H:%M")
h = t.hour
if 5 <= h <= 11:
    print("Morning")
elif 12 <= h <= 16:
    print("Afternoon")
elif 17 <= h <= 20:
    print("Evening")
else:
    print("Night")
`,
  }),

  codeQ({
    title: "Timestamp Gap Report",
    description:
      "An operations dashboard reports the gap between two audit timestamps as a raw minute count and as an hours:minutes duration where hours may exceed 24.\n\nInput Format:\nLine 1: start timestamp as DD-MM-YYYY HH:MM\nLine 2: end timestamp as DD-MM-YYYY HH:MM (same moment or later)\n\nOutput Format:\nLine 1: Minutes: <total whole minutes>\nLine 2: Duration: <H>:<MM> where H is total minutes // 60 (unpadded, may exceed 24) and MM is total minutes % 60 zero-padded\n\nConstraints:\nBoth timestamps are valid between 2000-01-01 and 2100-12-31; the gap is at most 400 days.",
    difficulty: "medium",
    variant: "scenario",
    maxscore: 20,
    subtopic: "timedelta Arithmetic",
    sampleinput1: "14-05-2024 09:15\n14-05-2024 11:45",
    sampleoutput1: "Minutes: 150\nDuration: 2:30",
    sampleinput2: "20-03-2024 22:00\n22-03-2024 01:30",
    sampleoutput2: "Minutes: 1650\nDuration: 27:30",
    input1: "01-01-2024 00:00\n01-01-2024 00:00",
    output1: "Minutes: 0\nDuration: 0:00",
    input2: "05-08-2024 23:45\n06-08-2024 00:15",
    output2: "Minutes: 30\nDuration: 0:30",
    input3: "31-12-2023 12:00\n02-01-2024 12:00",
    output3: "Minutes: 2880\nDuration: 48:00",
    inputconstrains: "end >= start, gap at most 400 days",
    blacklist: "total_seconds(",
    whitelist: "strptime(, timedelta",
    sourcecode: `from datetime import datetime, timedelta

s = datetime.strptime(input(), "%d-%m-%Y %H:%M")
e = datetime.strptime(input(), "%d-%m-%Y %H:%M")
mins = (e - s) // timedelta(minutes=1)
print(f"Minutes: {mins}")
print(f"Duration: {mins // 60}:{mins % 60:02d}")
`,
  }),

  codeQ({
    title: "Multi Leg Trip Planner",
    description:
      "A freight itinerary chains legs back to back: each leg departs the moment the previous leg arrives. Given the first departure timestamp and the duration in minutes of each leg, print the arrival moment of every leg in the style 01 Jan 2025 02:45.\n\nInput Format:\nLine 1: an integer k, the number of legs\nLine 2: the first departure as DD-MM-YYYY HH:MM\nLines 3 to k+2: one integer per line, the duration of leg i in minutes\n\nOutput Format:\nk lines: Leg <i>: DD MMM YYYY HH:MM (three-letter English month abbreviation, zero-padded day, hour and minute) for i = 1 to k.\n\nConstraints:\n1 <= k <= 8; 30 <= duration <= 2000; the whole itinerary stays between 2000-01-01 and 2100-12-31.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "timedelta Arithmetic",
    sampleinput1: "2\n28-12-2024 23:30\n90\n45",
    sampleoutput1: "Leg 1: 29 Dec 2024 01:00\nLeg 2: 29 Dec 2024 01:45",
    sampleinput2: "3\n01-03-2024 08:15\n200\n300\n60",
    sampleoutput2: "Leg 1: 01 Mar 2024 11:35\nLeg 2: 01 Mar 2024 16:35\nLeg 3: 01 Mar 2024 17:35",
    input1: "1\n31-12-2024 22:50\n80",
    output1: "Leg 1: 01 Jan 2025 00:10",
    input2: "4\n15-05-2024 06:00\n45\n120\n75\n500",
    output2: "Leg 1: 15 May 2024 06:45\nLeg 2: 15 May 2024 08:45\nLeg 3: 15 May 2024 10:00\nLeg 4: 15 May 2024 18:20",
    input3: "2\n30-04-2024 23:40\n40\n1300",
    output3: "Leg 1: 01 May 2024 00:20\nLeg 2: 01 May 2024 22:00",
    inputconstrains: "1 <= k <= 8, 30 <= duration <= 2000, itinerary within 2000-2100",
    blacklist: "datetime.now(, date.today(, dateutil",
    whitelist: "timedelta, strftime",
    sourcecode: `from datetime import datetime, timedelta

def main():
    k = int(input())
    cur = datetime.strptime(input(), "%d-%m-%Y %H:%M")
    for i in range(1, k + 1):
        minutes = int(input())
        cur = cur + timedelta(minutes=minutes)
        print(f"Leg {i}: {cur.strftime('%d %b %Y %H:%M')}")

main()
`,
  }),

  codeQ({
    title: "Payroll Cutoff Engine",
    description:
      "A payroll system cuts salaries on the 10th and the 25th of each month. For a given month, report both cutoff dates with a weekend flag, then count the weekend days (Saturdays and Sundays) and the working days in the whole month.\n\nInput Format:\nOne line: MM-YYYY (zero-padded month, four-digit year).\n\nOutput Format:\nLine 1: Cutoff 1: DD-MM-YYYY Weekend or Cutoff 1: DD-MM-YYYY Working day\nLine 2: the same for Cutoff 2 (the 25th)\nLine 3: Weekend days: <count of Saturdays and Sundays in the month>\nLine 4: Working days: <remaining days of the month>\n\nConstraints:\n2000 <= year <= 2100; 1 <= month <= 12.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "date and time Objects",
    sampleinput1: "05-2024",
    sampleoutput1: "Cutoff 1: 10-05-2024 Working day\nCutoff 2: 25-05-2024 Weekend\nWeekend days: 8\nWorking days: 23",
    sampleinput2: "02-2024",
    sampleoutput2: "Cutoff 1: 10-02-2024 Weekend\nCutoff 2: 25-02-2024 Weekend\nWeekend days: 8\nWorking days: 21",
    input1: "01-2025",
    output1: "Cutoff 1: 10-01-2025 Working day\nCutoff 2: 25-01-2025 Weekend\nWeekend days: 8\nWorking days: 23",
    input2: "11-2024",
    output2: "Cutoff 1: 10-11-2024 Weekend\nCutoff 2: 25-11-2024 Working day\nWeekend days: 9\nWorking days: 21",
    input3: "03-2025",
    output3: "Cutoff 1: 10-03-2025 Working day\nCutoff 2: 25-03-2025 Working day\nWeekend days: 10\nWorking days: 21",
    inputconstrains: "2000 <= year <= 2100, 1 <= month <= 12",
    blacklist: "dateutil, pandas",
    whitelist: "weekday(, monthrange(",
    sourcecode: `from datetime import datetime
import calendar

def main():
    first = datetime.strptime(input(), "%m-%Y")
    y, m = first.year, first.month
    ndays = calendar.monthrange(y, m)[1]
    c1 = datetime(y, m, 10)
    c2 = datetime(y, m, 25)
    flag1 = "Weekend" if c1.weekday() >= 5 else "Working day"
    flag2 = "Weekend" if c2.weekday() >= 5 else "Working day"
    wknd = 0
    for dnum in range(1, ndays + 1):
        if datetime(y, m, dnum).weekday() >= 5:
            wknd += 1
    print(f"Cutoff 1: {c1.strftime('%d-%m-%Y')} {flag1}")
    print(f"Cutoff 2: {c2.strftime('%d-%m-%Y')} {flag2}")
    print(f"Weekend days: {wknd}")
    print(f"Working days: {ndays - wknd}")

main()
`,
  }),

  codeQ({
    title: "Medicine Dose Schedule Matrix",
    description:
      "A hospital infusion planner prints a dose card. Doses are taken every H hours; dose i (counting from 1) falls at start plus i times H hours. Print each dose in 12-hour notation and count how many doses fall in the night window (24-hour hour of 20 or later, or before 06:00).\n\nInput Format:\nLine 1: the first dose timestamp as DD-MM-YYYY HH:MM\nLine 2: two space-separated integers H (interval hours) and k (number of doses)\n\nOutput Format:\nk lines: Dose <i>: DD-MM-YYYY hh:MM AM or PM (12-hour zero-padded clock)\nFinal line: Night doses: <count>\n\nConstraints:\n1 <= H <= 24; 1 <= k <= 6; timestamps valid between 2000-01-01 and 2100-12-31.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "timedelta Arithmetic",
    sampleinput1: "10-05-2024 08:00\n6 4",
    sampleoutput1: "Dose 1: 10-05-2024 02:00 PM\nDose 2: 10-05-2024 08:00 PM\nDose 3: 11-05-2024 02:00 AM\nDose 4: 11-05-2024 08:00 AM\nNight doses: 2",
    sampleinput2: "01-01-2024 09:30\n4 2",
    sampleoutput2: "Dose 1: 01-01-2024 01:30 PM\nDose 2: 01-01-2024 05:30 PM\nNight doses: 0",
    input1: "15-03-2024 22:45\n3 3",
    output1: "Dose 1: 16-03-2024 01:45 AM\nDose 2: 16-03-2024 04:45 AM\nDose 3: 16-03-2024 07:45 AM\nNight doses: 2",
    input2: "20-06-2024 18:20\n2 5",
    output2: "Dose 1: 20-06-2024 08:20 PM\nDose 2: 20-06-2024 10:20 PM\nDose 3: 21-06-2024 12:20 AM\nDose 4: 21-06-2024 02:20 AM\nDose 5: 21-06-2024 04:20 AM\nNight doses: 5",
    input3: "31-12-2024 19:50\n1 6",
    output3: "Dose 1: 31-12-2024 08:50 PM\nDose 2: 31-12-2024 09:50 PM\nDose 3: 31-12-2024 10:50 PM\nDose 4: 31-12-2024 11:50 PM\nDose 5: 01-01-2025 12:50 AM\nDose 6: 01-01-2025 01:50 AM\nNight doses: 6",
    inputconstrains: "1 <= H <= 24, 1 <= k <= 6, timestamps within 2000-2100",
    blacklist: "datetime.now(, dateutil",
    whitelist: "timedelta, strftime",
    sourcecode: `from datetime import datetime, timedelta

def main():
    start = datetime.strptime(input(), "%d-%m-%Y %H:%M")
    h, k = map(int, input().split())
    night = 0
    for i in range(1, k + 1):
        t = start + timedelta(hours=h * i)
        if t.hour >= 20 or t.hour < 6:
            night += 1
        print(f"Dose {i}: {t.strftime('%d-%m-%Y %I:%M %p')}")
    print(f"Night doses: {night}")

main()
`,
  }),

  codeQ({
    title: "Date Range Audit Trail",
    description:
      "An auditor walks a date range day by day. For every date from start to end inclusive, print the date with its weekday name, tagging the last day of each month. Finish with the number of month-end days encountered.\n\nInput Format:\nLine 1: start date as DD-MM-YYYY\nLine 2: end date as DD-MM-YYYY (not earlier than the start)\n\nOutput Format:\nOne line per date: DD-MM-YYYY <WeekdayName> and, when the date is the last day of its month, append  [Month end] (a space before the bracket)\nFinal line: Month ends: <count>\n\nConstraints:\nThe range spans at most 40 days (1 <= end - start + 1 <= 40); both dates are valid calendar dates between 2000-01-01 and 2100-12-31.",
    difficulty: "hard",
    variant: "scenario",
    maxscore: 30,
    subtopic: "date and time Objects",
    sampleinput1: "28-02-2024\n02-03-2024",
    sampleoutput1: "28-02-2024 Wednesday\n29-02-2024 Thursday [Month end]\n01-03-2024 Friday\n02-03-2024 Saturday\nMonth ends: 1",
    sampleinput2: "29-12-2023\n02-01-2024",
    sampleoutput2: "29-12-2023 Friday\n30-12-2023 Saturday\n31-12-2023 Sunday [Month end]\n01-01-2024 Monday\n02-01-2024 Tuesday\nMonth ends: 1",
    input1: "10-04-2024\n12-04-2024",
    output1: "10-04-2024 Wednesday\n11-04-2024 Thursday\n12-04-2024 Friday\nMonth ends: 0",
    input2: "30-04-2024\n01-05-2024",
    output2: "30-04-2024 Tuesday [Month end]\n01-05-2024 Wednesday\nMonth ends: 1",
    input3: "27-02-2025\n01-03-2025",
    output3: "27-02-2025 Thursday\n28-02-2025 Friday [Month end]\n01-03-2025 Saturday\nMonth ends: 1",
    inputconstrains: "1 <= range span <= 40 days, dates between 2000-01-01 and 2100-12-31",
    blacklist: "monthrange(, calendar",
    whitelist: "timedelta, weekday(",
    sourcecode: `from datetime import datetime, timedelta

NAMES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

def main():
    a = datetime.strptime(input(), "%d-%m-%Y")
    b = datetime.strptime(input(), "%d-%m-%Y")
    ends = 0
    cur = a
    while cur <= b:
        nxt = cur + timedelta(days=1)
        mark = ""
        if nxt.day == 1:
            mark = " [Month end]"
            ends += 1
        print(f"{cur.strftime('%d-%m-%Y')} {NAMES[cur.weekday()]}{mark}")
        cur = nxt
    print(f"Month ends: {ends}")

main()
`,
  }),
];

/* ─────────────────────────────── MCQ QUESTIONS ─────────────────────────────── */

const mcqs = [
  mcq({
    title: "Module For Date And Time",
    description:
      "Which standard-library module provides the date, time, datetime and timedelta classes for calendar and clock work?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "datetime Module Basics",
    Option1: "datetime",
    Option2: "calendar",
    Option3: "time",
    Option4: "clockutil",
    CorrectOption: 1,
  }),
  mcq({
    title: "Weekday Numbering Convention",
    description:
      "In Python's datetime module, what value does the weekday() method return for a Monday?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "date and time Objects",
    Option1: "0",
    Option2: "1",
    Option3: "6",
    Option4: "-1",
    CorrectOption: 1,
  }),
  mcq({
    title: "Direction Of strftime",
    description:
      "Which method converts a datetime object INTO a formatted string?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Formatting with strftime",
    Option1: "strftime — object to string (formatting)",
    Option2: "strptime — object to string",
    Option3: "strformat — object to string",
    Option4: "timefmt — object to string",
    CorrectOption: 1,
  }),
  mcq({
    title: "Zero Padded Month Code",
    description:
      "Which strftime format code prints the month as a zero-padded decimal number from 01 to 12?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Formatting with strftime",
    Option1: "%m",
    Option2: "%M",
    Option3: "%B",
    Option4: "%b",
    CorrectOption: 1,
  }),
  mcq({
    title: "Four Digit Year Code",
    description:
      "Which strftime format code prints the year with century as a zero-padded four-digit number, like 2024?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Formatting with strftime",
    Option1: "%Y",
    Option2: "%y",
    Option3: "%C",
    Option4: "%N",
    CorrectOption: 1,
  }),
  mcq({
    title: "Hour Code Meanings",
    description:
      "Which strftime format code prints the hour on a 12-hour clock, zero-padded from 01 to 12?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "Formatting with strftime",
    Option1: "%I",
    Option2: "%H",
    Option3: "%h",
    Option4: "%T",
    CorrectOption: 1,
  }),
  mcq({
    title: "Adding Days With timedelta",
    description:
      "What is the result of evaluating date(2024, 5, 15) + timedelta(days=10)?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "timedelta Arithmetic",
    Option1: "date(2024, 5, 25)",
    Option2: "date(2024, 5, 5)",
    Option3: "date(2024, 6, 15)",
    Option4: "TypeError — dates cannot be added to durations",
    CorrectOption: 1,
  }),
  mcq({
    title: "Date Difference Type",
    description:
      "For two date objects d1 and d2, what type does the expression (d2 - d1).days produce?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "timedelta Arithmetic",
    Option1: "int — the whole number of days between the dates",
    Option2: "float — fractional days are included",
    Option3: "timedelta — .days returns another duration",
    Option4: "str — a string like '9 days'",
    CorrectOption: 1,
  }),
  mcq({
    title: "time Object Has No Date",
    description:
      "What does a datetime.time object represent?",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "date and time Objects",
    Option1: "A time of day (hour, minute, second, microsecond) with no date attached",
    Option2: "A full timestamp including year, month and day",
    Option3: "A duration between two moments",
    Option4: "A timezone-adjusted calendar date",
    CorrectOption: 1,
  }),
  mcq({
    title: "Constructor Argument Order",
    description:
      "In the call datetime.datetime(2024, 5, 15, 9, 30), the first three positional arguments are:",
    difficulty: "easy",
    topic: TOPIC,
    subtopic: "datetime Module Basics",
    Option1: "year, month, day",
    Option2: "month, day, year",
    Option3: "day, month, year",
    Option4: "year, day, month",
    CorrectOption: 1,
  }),
  mcq({
    title: "Format Pair Prediction",
    description:
      "What does this snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Formatting with strftime",
    Option1: "15-05-2024 on the first line, 02:30 PM on the second",
    Option2: "15-05-2024 on the first line, 14:30 PM on the second",
    Option3: "05-15-2024 on the first line, 02:30 PM on the second",
    Option4: "5-5-2024 on the first line, 2:30 PM on the second",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `from datetime import datetime
dt = datetime(2024, 5, 15, 14, 30)
print(dt.strftime("%d-%m-%Y"))
print(dt.strftime("%I:%M %p"))`,
    snippetLang: "python",
  }),
  mcq({
    title: "Strptime Format Mismatch",
    description:
      "What happens when this snippet runs?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "Parsing with strptime",
    Option1: "ValueError — the '/' separators in the text do not match the '-' separators in the format string",
    Option2: "It parses fine — strptime ignores separator characters",
    Option3: "It returns None because the formats disagree",
    Option4: "TypeError — strptime needs a datetime instance as its first argument",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `from datetime import datetime
print(datetime.strptime("15/08/2024", "%d-%m-%Y"))`,
    snippetLang: "python",
  }),
  mcq({
    title: "Timedelta Normalization",
    description:
      "What does this snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "timedelta Arithmetic",
    Option1: "1 day, 3:30:00 — components are normalized into days, hours, minutes",
    Option2: "26:90:00 — the values are stored exactly as given",
    Option3: "1 day, 2:90:00 — hours normalize but minutes do not",
    Option4: "27:30:00 — everything folds into the hours field",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `from datetime import timedelta
td = timedelta(hours=26, minutes=90)
print(td)`,
    snippetLang: "python",
  }),
  mcq({
    title: "Month Arithmetic Overflow",
    description:
      "What does this snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "timedelta Arithmetic",
    Option1: "2024-02-01 — timedelta moves whole days, so the date rolls from January 31 into February",
    Option2: "2024-01-32 — the day field simply increments",
    Option3: "ValueError — February never has 31 days",
    Option4: "2024-02-29 — Python fixes the overflow to the last leap day",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `from datetime import date, timedelta
print(date(2024, 1, 31) + timedelta(days=1))`,
    snippetLang: "python",
  }),
  mcq({
    title: "Weekday Printout",
    description:
      "What does this snippet print?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "date and time Objects",
    Option1: "2 on the first line, Wednesday on the second",
    Option2: "3 on the first line, Wednesday on the second",
    Option3: "2 on the first line, Thursday on the second",
    Option4: "Wednesday on the first line, 2 on the second",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `from datetime import date
d = date(2024, 5, 15)
print(d.weekday())
print(d.strftime("%A"))`,
    snippetLang: "python",
  }),
  mcq({
    title: "Combining Date And Time",
    description:
      "A program holds a date object d and a time object t. How is a datetime built from both?",
    difficulty: "medium",
    topic: TOPIC,
    subtopic: "datetime Module Basics",
    Option1: "datetime.combine(d, t)",
    Option2: "d + t — dates and times add directly",
    Option3: "datetime.merge(d, t)",
    Option4: "datetime(d, t) — the constructor accepts them positionally",
    CorrectOption: 1,
  }),
  mcq({
    title: "Year Bound Overflow",
    description:
      "What does this snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "timedelta Arithmetic",
    Option1: "OverflowError — date(9999, 12, 31) is the maximum representable date",
    Option2: "0001-01-01 — the calendar wraps around",
    Option3: "ValueError — timedelta refuses to cross year boundaries",
    Option4: "date(10000, 1, 1) — Python widens the year range automatically",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `from datetime import date, timedelta
print(date(9999, 12, 31) + timedelta(days=1))`,
    snippetLang: "python",
  }),
  mcq({
    title: "Cross Year Arrival Format",
    description:
      "What does this snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Formatting with strftime",
    Option1: "01 Jan 2025 02:45 — the arrival rolls into the next year, %b gives the short English month",
    Option2: "31 Dec 2024 26:45 — the hour field runs past 24",
    Option3: "01 Jan 2025 2:45 — hours are not zero-padded",
    Option4: "31 Dec 2024 22:45 — the timedelta is ignored",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `from datetime import datetime, timedelta
dep = datetime(2024, 12, 31, 22, 45)
arr = dep + timedelta(hours=4)
print(arr.strftime("%d %b %Y %H:%M"))`,
    snippetLang: "python",
  }),
  mcq({
    title: "Parse Long Month Then Weekday",
    description:
      "What does this snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "Parsing with strptime",
    Option1: "Thursday on the first line, 3 on the second",
    Option2: "Thursday on the first line, 4 on the second",
    Option3: "Friday on the first line, 4 on the second",
    Option4: "August on the first line, 15 on the second",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `from datetime import datetime
d = datetime.strptime("15 Aug 2024", "%d %b %Y")
print(d.strftime("%A"))
print(d.weekday())`,
    snippetLang: "python",
  }),
  mcq({
    title: "Timedelta Attribute Access",
    description:
      "What does this snippet print?",
    difficulty: "hard",
    topic: TOPIC,
    subtopic: "timedelta Arithmetic",
    Option1: "9000 on the first line, 0 on the second — seconds is the sub-day remainder",
    Option2: "2 on the first line, 30 on the second",
    Option3: "9000 on the first line, 1 on the second",
    Option4: "AttributeError — timedelta has no seconds attribute",
    CorrectOption: 1,
    iscodesnippet: true,
    codesnippet: `from datetime import timedelta
td = timedelta(minutes=150)
print(td.seconds)
print(td.days)`,
    snippetLang: "python",
  }),
];

/* ─────────────────────────────────── WRITE ─────────────────────────────────── */

const d = String(DAY).padStart(2, "0");
writeFileSync(
  `/home/z/my-project/scripts/python-programming/data/day-${d}.code.json`,
  JSON.stringify({ day: DAY, topics: [{ name: TOPIC, subtopics: SUBTOPICS }], questions }, null, 2)
);
writeFileSync(
  `/home/z/my-project/scripts/python-programming/data/day-${d}.mcq.json`,
  JSON.stringify({ day: DAY, questions: mcqs }, null, 2)
);
console.log(
  `wrote day ${DAY}: ${questions.length} code questions, ${mcqs.length} mcq questions`
);
