/**
 * Builder for day 15 — "Polymorphism" (20 code + 20 MCQ).
 * Run: bun scripts/python-programming/builders/build-day-15.ts
 */
import { mkdirSync, writeFileSync } from "node:fs";

const DIR = "/home/z/my-project/scripts/python-programming/data";
mkdirSync(DIR, { recursive: true });

const TOPIC_NAME = "Polymorphism";
const SUB = {
  override: "Method Overriding",
  sup: "super() Function",
  duck: "Duck Typing",
  magic: "Operator Overloading (Magic Methods)",
};

type Diff = "easy" | "medium" | "hard";

function cq(o: {
  title: string;
  description: string;
  difficulty: Diff;
  variant: "basic" | "scenario";
  subtopic: string;
  si1: string; so1: string;
  si2: string; so2: string;
  i1: string; o1: string;
  i2: string; o2: string;
  i3: string; o3: string;
  inputconstrains: string;
  blacklist?: string;
  whitelist?: string;
  sourcecode: string;
}) {
  const maxscore = o.difficulty === "easy" ? 10 : o.difficulty === "medium" ? 20 : 30;
  return {
    title: o.title,
    description: o.description,
    difficulty: o.difficulty,
    variant: o.variant,
    maxscore,
    lang: "python",
    topic: TOPIC_NAME,
    subtopic: o.subtopic,
    sampleinput1: o.si1,
    sampleoutput1: o.so1,
    sampleinput2: o.si2,
    sampleoutput2: o.so2,
    input1: o.i1,
    output1: o.o1,
    input2: o.i2,
    output2: o.o2,
    input3: o.i3,
    output3: o.o3,
    inputconstrains: o.inputconstrains,
    blacklist: o.blacklist ?? "",
    whitelist: o.whitelist ?? "",
    sourcecode: o.sourcecode,
  };
}

function mq(o: {
  title: string;
  description: string;
  difficulty: Diff;
  subtopic: string;
  options: [string, string, string, string];
  correct: 1 | 2 | 3 | 4;
  snippet?: string;
}) {
  return {
    title: o.title,
    description: o.description,
    difficulty: o.difficulty,
    topic: TOPIC_NAME,
    subtopic: o.subtopic,
    Option1: o.options[0],
    Option2: o.options[1],
    Option3: o.options[2],
    Option4: o.options[3],
    CorrectOption: o.correct,
    iscodesnippet: o.snippet !== undefined,
    codesnippet: o.snippet ?? null,
    snippetLang: o.snippet !== undefined ? "python" : null,
  };
}

/* ============================ CODE QUESTIONS ============================ */

const questions = [
  // ---------------- easy: basic drills ----------------
  cq({
    title: "Shape Area Override Drill",
    description:
      "Core override drill: a child class replaces a parent method with its own version.\n" +
      "Base class Shape has area() that returns 0; child class Square overrides area() to return side * side.\n" +
      "The driver builds one Shape and one Square, then prints both areas.\n" +
      "\n" +
      "Input Format:\n" +
      "One integer: the square's side.\n" +
      "\n" +
      "Output Format:\n" +
      "Line 1: the generic shape's area (0)\n" +
      "Line 2: the square's area\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= side <= 1000",
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.override,
    si1: "5", so1: "0\n25",
    si2: "12", so2: "0\n144",
    i1: "1", o1: "0\n1",
    i2: "9", o2: "0\n81",
    i3: "1000", o3: "0\n1000000",
    inputconstrains: "1 <= side <= 1000",
    sourcecode: String.raw`
class Shape:
    def __init__(self, name):
        self.name = name

    def area(self):
        return 0


class Square(Shape):
    def __init__(self, name, side):
        super().__init__(name)
        self.side = side

    def area(self):
        return self.side * self.side


side = int(input())
generic = Shape("shape")
box = Square("box", side)
print(generic.area())
print(box.area())
`,
  }),

  cq({
    title: "Bird and Penguin Flight Override",
    description:
      "A wildlife app renders each animal's movement with its own wording.\n" +
      "Bird.fly() prints one message; Penguin overrides fly() with a different verb.\n" +
      "Read the distance, then call fly on a Bird and on a Penguin with that distance.\n" +
      "\n" +
      "Input Format:\n" +
      "One integer: the distance in metres.\n" +
      "\n" +
      "Output Format:\n" +
      "Line 1: Bird soars <dist> metres above the trees\n" +
      "Line 2: Penguin toboggans <dist> metres across the ice\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= dist <= 500",
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.override,
    si1: "40", so1: "Bird soars 40 metres above the trees\nPenguin toboggans 40 metres across the ice",
    si2: "7", so2: "Bird soars 7 metres above the trees\nPenguin toboggans 7 metres across the ice",
    i1: "1", o1: "Bird soars 1 metres above the trees\nPenguin toboggans 1 metres across the ice",
    i2: "120", o2: "Bird soars 120 metres above the trees\nPenguin toboggans 120 metres across the ice",
    i3: "500", o3: "Bird soars 500 metres above the trees\nPenguin toboggans 500 metres across the ice",
    inputconstrains: "1 <= dist <= 500",
    sourcecode: String.raw`
class Bird:
    def fly(self, dist):
        print(f"Bird soars {dist} metres above the trees")


class Penguin(Bird):
    def fly(self, dist):
        print(f"Penguin toboggans {dist} metres across the ice")


dist = int(input())
flier = Bird()
walker = Penguin()
flier.fly(dist)
walker.fly(dist)
`,
  }),

  cq({
    title: "Super Describe Extension Drill",
    description:
      "Extend, don't replace: the child's describe() calls super().describe() first and then adds its own line.\n" +
      "Base Shape.describe() prints 'I am a generic shape'; Circle.describe() calls super().describe() and then prints its radius line.\n" +
      "\n" +
      "Input Format:\n" +
      "One integer: the circle's radius.\n" +
      "\n" +
      "Output Format:\n" +
      "Line 1: I am a generic shape\n" +
      "Line 2: I am a circle with radius <radius>\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= radius <= 999",
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.sup,
    si1: "3", so1: "I am a generic shape\nI am a circle with radius 3",
    si2: "10", so2: "I am a generic shape\nI am a circle with radius 10",
    i1: "1", o1: "I am a generic shape\nI am a circle with radius 1",
    i2: "45", o2: "I am a generic shape\nI am a circle with radius 45",
    i3: "999", o3: "I am a generic shape\nI am a circle with radius 999",
    inputconstrains: "1 <= radius <= 999",
    sourcecode: String.raw`
class Shape:
    def describe(self):
        print("I am a generic shape")


class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def describe(self):
        super().describe()
        print(f"I am a circle with radius {self.radius}")


radius = int(input())
c = Circle(radius)
c.describe()
`,
  }),

  cq({
    title: "Duck Typing Info Loop Drill",
    description:
      "Duck typing drill: two classes with no shared parent both expose .info().\n" +
      "Build one list holding a Cat and a Robot, then loop over the list calling info() on every element.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: the cat's name\n" +
      "Line 2: the robot's unit code\n" +
      "\n" +
      "Output Format:\n" +
      "Line 1: Cat <name> naps in the sun\n" +
      "Line 2: Unit <code> patrols the aisle\n" +
      "\n" +
      "Constraints:\n" +
      "Name and code are 1-20 characters, one per line",
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.duck,
    si1: "Tom\nR2", so1: "Cat Tom naps in the sun\nUnit R2 patrols the aisle",
    si2: "Bella\nUnit-7", so2: "Cat Bella naps in the sun\nUnit Unit-7 patrols the aisle",
    i1: "Whiskers\nX9", o1: "Cat Whiskers naps in the sun\nUnit X9 patrols the aisle",
    i2: "Mochi\nA1", o2: "Cat Mochi naps in the sun\nUnit A1 patrols the aisle",
    i3: "Z\n0", o3: "Cat Z naps in the sun\nUnit 0 patrols the aisle",
    inputconstrains: "name and code are 1-20 characters",
    sourcecode: String.raw`
class Cat:
    def __init__(self, name):
        self.name = name

    def info(self):
        print(f"Cat {self.name} naps in the sun")


class Robot:
    def __init__(self, code):
        self.code = code

    def info(self):
        print(f"Unit {self.code} patrols the aisle")


name = input()
code = input()
things = [Cat(name), Robot(code)]
for thing in things:
    thing.info()
`,
  }),

  cq({
    title: "Str Override Book Label Drill",
    description:
      "Magic method drill: give a class a __str__ so print(obj) shows a formatted label.\n" +
      "Book stores a title and author; __str__ returns '<title> by <author>'. The driver reads the two strings and prints the object directly.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: book title\n" +
      "Line 2: author\n" +
      "\n" +
      "Output Format:\n" +
      "One line: <title> by <author>\n" +
      "\n" +
      "Constraints:\n" +
      "Title and author are 1-40 characters, one per line",
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.magic,
    si1: "Dune\nHerbert", so1: "Dune by Herbert",
    si2: "Circe\nMiller", so2: "Circe by Miller",
    i1: "Emma\nAusten", o1: "Emma by Austen",
    i2: "Ficciones\nBorges", o2: "Ficciones by Borges",
    i3: "Q\nN", o3: "Q by N",
    inputconstrains: "title and author are 1-40 characters",
    sourcecode: String.raw`
class Book:
    def __init__(self, title, author):
        self.title = title
        self.author = author

    def __str__(self):
        return f"{self.title} by {self.author}"


title = input()
author = input()
novel = Book(title, author)
print(novel)
`,
  }),

  cq({
    title: "Eq Override Point Match Drill",
    description:
      "Magic method drill: __eq__ compares field values instead of object identity.\n" +
      "Chip stores coordinates x and y; __eq__ returns True when both fields match. Read two chips' coordinates and print the result of ==.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: x1 y1\n" +
      "Line 2: x2 y2\n" +
      "\n" +
      "Output Format:\n" +
      "Print True if both coordinates match, otherwise False\n" +
      "\n" +
      "Constraints:\n" +
      "-1000 <= x, y <= 1000",
    difficulty: "easy",
    variant: "basic",
    subtopic: SUB.magic,
    si1: "2 3\n2 3", so1: "True",
    si2: "2 3\n3 2", so2: "False",
    i1: "0 0\n0 0", o1: "True",
    i2: "-5 7\n-5 8", o2: "False",
    i3: "1000 -1000\n1000 -1000", o3: "True",
    inputconstrains: "-1000 <= x, y <= 1000",
    sourcecode: String.raw`
class Chip:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __eq__(self, other):
        return self.x == other.x and self.y == other.y


x1, y1 = map(int, input().split())
x2, y2 = map(int, input().split())
first = Chip(x1, y1)
second = Chip(x2, y2)
print(first == second)
`,
  }),

  // ---------------- easy: scenarios ----------------
  cq({
    title: "Checkout Payment Channel Dispatch",
    description:
      "A checkout gateway routes one payment through three unrelated channel classes: CardPay, UPIPay and WalletPay. Each has its own pay(amount) method and there is no common base class - classic duck typing.\n" +
      "Read the amount, put one instance of each channel in a list, and loop over the list calling pay(amount) on every element.\n" +
      "\n" +
      "Input Format:\n" +
      "One integer: the amount.\n" +
      "\n" +
      "Output Format:\n" +
      "Three lines, one per channel, in this order:\n" +
      "Charged <amount> to card ending 4421\n" +
      "Sent <amount> over UPI to merchant\n" +
      "Paid <amount> from wallet balance\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= amount <= 100000",
    difficulty: "easy",
    variant: "scenario",
    subtopic: SUB.duck,
    si1: "250", so1: "Charged 250 to card ending 4421\nSent 250 over UPI to merchant\nPaid 250 from wallet balance",
    si2: "1000", so2: "Charged 1000 to card ending 4421\nSent 1000 over UPI to merchant\nPaid 1000 from wallet balance",
    i1: "1", o1: "Charged 1 to card ending 4421\nSent 1 over UPI to merchant\nPaid 1 from wallet balance",
    i2: "99", o2: "Charged 99 to card ending 4421\nSent 99 over UPI to merchant\nPaid 99 from wallet balance",
    i3: "100000", o3: "Charged 100000 to card ending 4421\nSent 100000 over UPI to merchant\nPaid 100000 from wallet balance",
    inputconstrains: "1 <= amount <= 100000",
    sourcecode: String.raw`
class CardPay:
    def pay(self, amount):
        print(f"Charged {amount} to card ending 4421")


class UPIPay:
    def pay(self, amount):
        print(f"Sent {amount} over UPI to merchant")


class WalletPay:
    def pay(self, amount):
        print(f"Paid {amount} from wallet balance")


amount = int(input())
channels = [CardPay(), UPIPay(), WalletPay()]
for channel in channels:
    channel.pay(amount)
`,
  }),

  cq({
    title: "Media Player Play Override",
    description:
      "A streaming service's players share a play(track) interface, but the video player overrides it to add frame-rate detail.\n" +
      "Read the track number, then call play(track) on an AudioPlayer and on a VideoPlayer.\n" +
      "\n" +
      "Input Format:\n" +
      "One integer: the track number.\n" +
      "\n" +
      "Output Format:\n" +
      "Line 1: Playing audio track <track>\n" +
      "Line 2: Playing video track <track> at 30fps\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= track <= 999",
    difficulty: "easy",
    variant: "scenario",
    subtopic: SUB.override,
    si1: "5", so1: "Playing audio track 5\nPlaying video track 5 at 30fps",
    si2: "1", so2: "Playing audio track 1\nPlaying video track 1 at 30fps",
    i1: "12", o1: "Playing audio track 12\nPlaying video track 12 at 30fps",
    i2: "77", o2: "Playing audio track 77\nPlaying video track 77 at 30fps",
    i3: "999", o3: "Playing audio track 999\nPlaying video track 999 at 30fps",
    inputconstrains: "1 <= track <= 999",
    sourcecode: String.raw`
class AudioPlayer:
    def __init__(self):
        self.mode = "audio"

    def play(self, track):
        print(f"Playing {self.mode} track {track}")


class VideoPlayer(AudioPlayer):
    def __init__(self):
        super().__init__()
        self.mode = "video"
        self.fps = 30

    def play(self, track):
        print(f"Playing {self.mode} track {track} at {self.fps}fps")


track = int(input())
AudioPlayer().play(track)
VideoPlayer().play(track)
`,
  }),

  cq({
    title: "Courier Estimate Override Desk",
    description:
      "A courier aggregator quotes two service tiers; ExpressCourier overrides the base estimate completely.\n" +
      "Read the parcel weight, then call estimate(weight) on a base Courier and on an ExpressCourier.\n" +
      "\n" +
      "Input Format:\n" +
      "One integer: the weight in kg.\n" +
      "\n" +
      "Output Format:\n" +
      "Line 1: Arrives in <weight // 2 + 3> days\n" +
      "Line 2: Arrives in 1 day\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= weight <= 100",
    difficulty: "easy",
    variant: "scenario",
    subtopic: SUB.override,
    si1: "10", so1: "Arrives in 8 days\nArrives in 1 day",
    si2: "4", so2: "Arrives in 5 days\nArrives in 1 day",
    i1: "1", o1: "Arrives in 3 days\nArrives in 1 day",
    i2: "100", o2: "Arrives in 53 days\nArrives in 1 day",
    i3: "7", o3: "Arrives in 6 days\nArrives in 1 day",
    inputconstrains: "1 <= weight <= 100",
    sourcecode: String.raw`
class Courier:
    def estimate(self, weight):
        print(f"Arrives in {weight // 2 + 3} days")


class ExpressCourier(Courier):
    def estimate(self, weight):
        print("Arrives in 1 day")


weight = int(input())
Courier().estimate(weight)
ExpressCourier().estimate(weight)
`,
  }),

  cq({
    title: "Sensor Family Report Dispatch",
    description:
      "A smart greenhouse polls a family of sensor classes; each unrelated class reports its reading in its own format through a report(value) method.\n" +
      "Read the three readings and dispatch report(value) across the three sensor objects.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: temperature\n" +
      "Line 2: humidity\n" +
      "Line 3: motion event count\n" +
      "\n" +
      "Output Format:\n" +
      "Line 1: Temperature now <t>C\n" +
      "Line 2: Humidity now <h>%\n" +
      "Line 3: <m> motion events recorded\n" +
      "\n" +
      "Constraints:\n" +
      "0 <= temperature <= 60; 0 <= humidity <= 100; 0 <= events <= 1000",
    difficulty: "easy",
    variant: "scenario",
    subtopic: SUB.duck,
    si1: "28\n55\n4", so1: "Temperature now 28C\nHumidity now 55%\n4 motion events recorded",
    si2: "31\n80\n0", so2: "Temperature now 31C\nHumidity now 80%\n0 motion events recorded",
    i1: "0\n0\n0", o1: "Temperature now 0C\nHumidity now 0%\n0 motion events recorded",
    i2: "60\n100\n1000", o2: "Temperature now 60C\nHumidity now 100%\n1000 motion events recorded",
    i3: "22\n47\n13", o3: "Temperature now 22C\nHumidity now 47%\n13 motion events recorded",
    inputconstrains: "0 <= temperature <= 60; 0 <= humidity <= 100; 0 <= events <= 1000",
    sourcecode: String.raw`
class TemperatureSensor:
    def report(self, value):
        print(f"Temperature now {value}C")


class HumiditySensor:
    def report(self, value):
        print(f"Humidity now {value}%")


class MotionSensor:
    def report(self, value):
        print(f"{value} motion events recorded")


values = [int(input()), int(input()), int(input())]
family = [TemperatureSensor(), HumiditySensor(), MotionSensor()]
for sensor, value in zip(family, values):
    sensor.report(value)
`,
  }),

  // ---------------- medium ----------------
  cq({
    title: "Shape Hierarchy Super Area Extension",
    description:
      "A flooring contractor quotes wall area plus 15 percent tile wastage by extending the parent's result through super().\n" +
      "Surface.area() returns width * height. TiledSurface.area() must return super().area() * 1.15.\n" +
      "The driver prints both areas with two decimals.\n" +
      "\n" +
      "Input Format:\n" +
      "One line: width and height (integers).\n" +
      "\n" +
      "Output Format:\n" +
      "Line 1: Raw area: <base area, 2 decimals>\n" +
      "Line 2: Tiled area: <tiled area, 2 decimals>\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= width, height <= 1000",
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.sup,
    si1: "10 12", so1: "Raw area: 120.00\nTiled area: 138.00",
    si2: "4 5", so2: "Raw area: 20.00\nTiled area: 23.00",
    i1: "3 7", o1: "Raw area: 21.00\nTiled area: 24.15",
    i2: "1000 1000", o2: "Raw area: 1000000.00\nTiled area: 1150000.00",
    i3: "9 9", o3: "Raw area: 81.00\nTiled area: 93.15",
    inputconstrains: "1 <= width, height <= 1000",
    blacklist: "@property",
    whitelist: "super(",
    sourcecode: String.raw`
class Surface:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height


class TiledSurface(Surface):
    def __init__(self, width, height):
        super().__init__(width, height)
        self.wastage = 1.15

    def area(self):
        return super().area() * self.wastage


w, h = map(int, input().split())
plain = Surface(w, h)
tiled = TiledSurface(w, h)
print(f"Raw area: {plain.area():.2f}")
print(f"Tiled area: {tiled.area():.2f}")
`,
  }),

  cq({
    title: "Notification Dispatcher Duck Typing",
    description:
      "An on-call dispatcher fans one incident message out to three notification services that share nothing but a send(msg) method - plain duck typing with no ABC, no abstractmethod and no common base class.\n" +
      "Read the message line, build the three notifier objects, and loop over them calling send(msg).\n" +
      "\n" +
      "Input Format:\n" +
      "One line: the message text.\n" +
      "\n" +
      "Output Format:\n" +
      "Line 1: EMAIL to ops@core.app: <message>\n" +
      "Line 2: SMS to on-call phone: <message>\n" +
      "Line 3: PUSH to device-17: <message>\n" +
      "\n" +
      "Constraints:\n" +
      "The message is 1-60 characters",
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.duck,
    si1: "Disk usage above 90%",
    so1: "EMAIL to ops@core.app: Disk usage above 90%\nSMS to on-call phone: Disk usage above 90%\nPUSH to device-17: Disk usage above 90%",
    si2: "Deploy finished",
    so2: "EMAIL to ops@core.app: Deploy finished\nSMS to on-call phone: Deploy finished\nPUSH to device-17: Deploy finished",
    i1: "Queue backlog cleared",
    o1: "EMAIL to ops@core.app: Queue backlog cleared\nSMS to on-call phone: Queue backlog cleared\nPUSH to device-17: Queue backlog cleared",
    i2: "Latency spike on node 3",
    o2: "EMAIL to ops@core.app: Latency spike on node 3\nSMS to on-call phone: Latency spike on node 3\nPUSH to device-17: Latency spike on node 3",
    i3: "Backup completed",
    o3: "EMAIL to ops@core.app: Backup completed\nSMS to on-call phone: Backup completed\nPUSH to device-17: Backup completed",
    inputconstrains: "the message is 1-60 characters",
    blacklist: "ABC, abstractmethod",
    whitelist: ".send(",
    sourcecode: String.raw`
class AlertEmail:
    def send(self, msg):
        print(f"EMAIL to ops@core.app: {msg}")


class AlertSMS:
    def send(self, msg):
        print(f"SMS to on-call phone: {msg}")


class AlertPush:
    def send(self, msg):
        print(f"PUSH to device-17: {msg}")


msg = input()
channels = [AlertEmail(), AlertSMS(), AlertPush()]
for channel in channels:
    channel.send(msg)
`,
  }),

  cq({
    title: "Vector Add and Scale",
    description:
      "A physics sandbox overloads operators on a 2D vector class: + adds two vectors and * scales a vector by an integer factor (both via magic methods on Vec).\n" +
      "Read two vectors and a factor, print the sum vector, then the scaled copy of the first vector.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: x1 y1\n" +
      "Line 2: x2 y2\n" +
      "Line 3: k\n" +
      "\n" +
      "Output Format:\n" +
      "Line 1: (x1+x2, y1+y2)\n" +
      "Line 2: (x1*k, y1*k)\n" +
      "\n" +
      "Constraints:\n" +
      "-100 <= coordinates <= 100; 1 <= k <= 10",
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.magic,
    si1: "1 2\n3 4\n2", so1: "(4, 6)\n(2, 4)",
    si2: "0 0\n5 7\n3", so2: "(5, 7)\n(0, 0)",
    i1: "-1 -2\n1 1\n5", o1: "(0, -1)\n(-5, -10)",
    i2: "10 20\n30 40\n10", o2: "(40, 60)\n(100, 200)",
    i3: "100 -100\n-100 100\n1", o3: "(0, 0)\n(100, -100)",
    inputconstrains: "-100 <= coordinates <= 100; 1 <= k <= 10",
    blacklist: "numpy",
    whitelist: "__add__, __mul__",
    sourcecode: String.raw`
class Vec:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        return Vec(self.x + other.x, self.y + other.y)

    def __mul__(self, factor):
        return Vec(self.x * factor, self.y * factor)

    def show(self):
        print(f"({self.x}, {self.y})")


x1, y1 = map(int, input().split())
x2, y2 = map(int, input().split())
k = int(input())
a = Vec(x1, y1)
b = Vec(x2, y2)
(a + b).show()
(a * k).show()
`,
  }),

  cq({
    title: "Parcel Weight Comparison Engine",
    description:
      "A courier hub ranks parcels without touching sorted() - the ordering knowledge lives in the Parcel class itself through __lt__ and __eq__.\n" +
      "Build the parcels, find the heaviest using manual < comparisons (the first parcel reaching the maximum weight wins ties), then count how many parcels equal the heaviest using ==.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: n\n" +
      "Next n lines: name weight (names are single tokens)\n" +
      "\n" +
      "Output Format:\n" +
      "Line 1: Heaviest: <name> <weight>kg\n" +
      "Line 2: Parcels at heaviest weight: <count>\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= n <= 100; 1 <= weight <= 100",
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.magic,
    si1: "3\nalpha 7\nbeta 9\ngamma 9", so1: "Heaviest: beta 9kg\nParcels at heaviest weight: 2",
    si2: "2\nbox1 3\nbox2 5", so2: "Heaviest: box2 5kg\nParcels at heaviest weight: 1",
    i1: "4\np1 10\np2 2\np3 10\np4 8", o1: "Heaviest: p1 10kg\nParcels at heaviest weight: 2",
    i2: "1\nsolo 6", o2: "Heaviest: solo 6kg\nParcels at heaviest weight: 1",
    i3: "5\na 1\nb 2\nc 3\nd 4\ne 5", o3: "Heaviest: e 5kg\nParcels at heaviest weight: 1",
    inputconstrains: "1 <= n <= 100; 1 <= weight <= 100; names are single tokens",
    blacklist: "sorted(, max(",
    whitelist: "__lt__, __eq__",
    sourcecode: String.raw`
class Parcel:
    def __init__(self, name, weight):
        self.name = name
        self.weight = weight

    def __lt__(self, other):
        return self.weight < other.weight

    def __eq__(self, other):
        return self.weight == other.weight


n = int(input())
parcels = []
for _ in range(n):
    parts = input().split()
    parcels.append(Parcel(parts[0], int(parts[1])))

heaviest = parcels[0]
for p in parcels[1:]:
    if heaviest < p:
        heaviest = p

tied = 0
for p in parcels:
    if p == heaviest:
        tied += 1

print(f"Heaviest: {heaviest.name} {heaviest.weight}kg")
print(f"Parcels at heaviest weight: {tied}")
`,
  }),

  cq({
    title: "Repr and Str Badge Formatter",
    description:
      "A conference badge printer needs two faces: __str__ for the human-readable card and __repr__ for the audit log.\n" +
      "Define both on a Badge class. The driver prints str(badge) and then repr(badge).\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: badge id\n" +
      "Line 2: holder name\n" +
      "\n" +
      "Output Format:\n" +
      "Line 1: [<id>] <holder>\n" +
      'Line 2: Badge("<id>", "<holder>")\n' +
      "\n" +
      "Constraints:\n" +
      "Badge id 1-10 characters; holder name 1-30 characters",
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.magic,
    si1: "C24\nMaya Roy", so1: '[C24] Maya Roy\nBadge("C24", "Maya Roy")',
    si2: "X1\nLiu", so2: '[X1] Liu\nBadge("X1", "Liu")',
    i1: "A9\nAna Silva", o1: '[A9] Ana Silva\nBadge("A9", "Ana Silva")',
    i2: "Z77\nOmar Khan", o2: '[Z77] Omar Khan\nBadge("Z77", "Omar Khan")',
    i3: "B0\nQi", o3: '[B0] Qi\nBadge("B0", "Qi")',
    inputconstrains: "badge id 1-10 characters; holder name 1-30 characters",
    blacklist: "!r, !s",
    whitelist: "__str__, __repr__",
    sourcecode: String.raw`
class Badge:
    def __init__(self, badge_id, holder):
        self.badge_id = badge_id
        self.holder = holder

    def __str__(self):
        return f"[{self.badge_id}] {self.holder}"

    def __repr__(self):
        return 'Badge("' + self.badge_id + '", "' + self.holder + '")'


badge_id = input()
holder = input()
b = Badge(badge_id, holder)
print(str(b))
print(repr(b))
`,
  }),

  cq({
    title: "Playlist Len and Getitem Overload",
    description:
      "A jukebox wraps its tracks in a Playlist object that responds to len() and [] by overloading __len__ and __getitem__.\n" +
      "Read the tracks, then print the playlist length, the first track, and the last track (index -1 must work through __getitem__).\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: n\n" +
      "Next n lines: one track name each\n" +
      "\n" +
      "Output Format:\n" +
      "Line 1: number of tracks\n" +
      "Line 2: first track\n" +
      "Line 3: last track\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= n <= 50; track names are single tokens of 1-20 characters",
    difficulty: "medium",
    variant: "scenario",
    subtopic: SUB.magic,
    si1: "3\nIntro\nAnthem\nOutro", so1: "3\nIntro\nOutro",
    si2: "1\nSolo", so2: "1\nSolo\nSolo",
    i1: "4\na1\nb2\nc3\nd4", o1: "4\na1\nd4",
    i2: "2\nLo\nHi", o2: "2\nLo\nHi",
    i3: "5\nt1\nt2\nt3\nt4\nt5", o3: "5\nt1\nt5",
    inputconstrains: "1 <= n <= 50; track names are single tokens of 1-20 characters",
    blacklist: "(list)",
    whitelist: "__len__, __getitem__",
    sourcecode: String.raw`
class Playlist:
    def __init__(self):
        self.tracks = []

    def add(self, name):
        self.tracks.append(name)

    def __len__(self):
        return len(self.tracks)

    def __getitem__(self, index):
        return self.tracks[index]


n = int(input())
mix = Playlist()
for _ in range(n):
    mix.add(input())

print(len(mix))
print(mix[0])
print(mix[-1])
`,
  }),

  // ---------------- hard ----------------
  cq({
    title: "Polymorphic Payroll Engine",
    description:
      "A payroll engine pays every employee polymorphically. The base Employee returns the raw salary; Manager adds a 5000 allowance, Developer adds 2000, and Intern halves the base - every child extending the parent's monthly_pay() through super().monthly_pay().\n" +
      "Employee also defines __lt__ on monthly pay. Sort the staff with plain sorted(staff) (no key argument - the objects sort themselves) and print payslips in ascending pay order.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: n\n" +
      "Next n lines: name role base (role is Manager, Developer or Intern; names are single tokens)\n" +
      "\n" +
      "Output Format:\n" +
      "n lines in ascending monthly-pay order: <name> <role> <pay>\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= n <= 100; 1 <= base <= 200000; test data has no pay ties",
    difficulty: "hard",
    variant: "scenario",
    subtopic: SUB.override,
    si1: "4\nNita Manager 40000\nArif Developer 30000\nBo Intern 8000\nCia Developer 28000",
    so1: "Bo Intern 4000\nCia Developer 30000\nArif Developer 32000\nNita Manager 45000",
    si2: "2\nZed Intern 10001\nYan Manager 10000",
    so2: "Zed Intern 5000\nYan Manager 15000",
    i1: "3\nA Developer 1000\nB Manager 1000\nC Intern 1000",
    o1: "C Intern 500\nA Developer 3000\nB Manager 6000",
    i2: "1\nSolo Manager 100000",
    o2: "Solo Manager 105000",
    i3: "5\nP1 Intern 2\nP2 Intern 4\nP3 Developer 6\nP4 Manager 8\nP5 Developer 10",
    o3: "P1 Intern 1\nP2 Intern 2\nP3 Developer 2006\nP5 Developer 2010\nP4 Manager 5008",
    inputconstrains: "1 <= n <= 100; 1 <= base <= 200000; role is Manager, Developer or Intern",
    blacklist: "functools, key=",
    whitelist: "super(, __lt__",
    sourcecode: String.raw`
class Employee:
    def __init__(self, name, base):
        self.name = name
        self.base = base

    def monthly_pay(self):
        return self.base

    def __lt__(self, other):
        return self.monthly_pay() < other.monthly_pay()


class Manager(Employee):
    def monthly_pay(self):
        return super().monthly_pay() + 5000


class Developer(Employee):
    def monthly_pay(self):
        return super().monthly_pay() + 2000


class Intern(Employee):
    def monthly_pay(self):
        return super().monthly_pay() // 2


n = int(input())
roles = {"Manager": Manager, "Developer": Developer, "Intern": Intern}
staff = []
for _ in range(n):
    name, role, base = input().split()
    staff.append(roles[role](name, int(base)))

for person in sorted(staff):
    print(person.name, person.__class__.__name__, person.monthly_pay())
`,
  }),

  cq({
    title: "Geometry Suite Add Compare Format",
    description:
      "A geometry toolkit overloads operators across a Shape hierarchy. Square, Rect and Circle each override area(); the base Shape defines __add__ (merge two shapes' areas into a Bundle), __gt__ (compare areas) and __str__ (label: area with two decimals).\n" +
      "Read the shapes, fold all of them together with + and print the combined bundle, then find the largest single shape with manual > comparisons and print it.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: n\n" +
      "Next n lines: square <side> | rect <w> <h> | circle <r>\n" +
      "\n" +
      "Output Format:\n" +
      "Line 1: str(combined) - names joined by + with the total area\n" +
      "Line 2: str(best) - the largest single shape\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= n <= 20; sides, widths, heights and radii are 1-100; circle area uses 3.14",
    difficulty: "hard",
    variant: "scenario",
    subtopic: SUB.magic,
    si1: "3\nsquare 4\nrect 2 5\ncircle 2", so1: "Square+Rect+Circle: 38.56\nSquare: 16.00",
    si2: "2\nsquare 3\nsquare 3", so2: "Square+Square: 18.00\nSquare: 9.00",
    i1: "1\ncircle 10", o1: "Circle: 314.00\nCircle: 314.00",
    i2: "4\nrect 1 1\nsquare 2\ncircle 1\nrect 2 2", o2: "Rect+Square+Circle+Rect: 12.14\nSquare: 4.00",
    i3: "3\nrect 10 2\nsquare 1\ncircle 3", o3: "Rect+Square+Circle: 49.26\nCircle: 28.26",
    inputconstrains: "1 <= n <= 20; sides, widths, heights and radii are 1-100",
    blacklist: "functools, sum(",
    whitelist: "__add__, __str__, __gt__",
    sourcecode: String.raw`
class Shape:
    def __init__(self, name):
        self.name = name

    def area(self):
        return 0

    def __add__(self, other):
        return Bundle(self.name + "+" + other.name, self.area() + other.area())

    def __gt__(self, other):
        return self.area() > other.area()

    def __str__(self):
        return f"{self.name}: {self.area():.2f}"


class Bundle(Shape):
    def __init__(self, name, total):
        super().__init__(name)
        self.total = total

    def area(self):
        return self.total


class Square(Shape):
    def __init__(self, side):
        super().__init__("Square")
        self.side = side

    def area(self):
        return self.side * self.side


class Rect(Shape):
    def __init__(self, w, h):
        super().__init__("Rect")
        self.w = w
        self.h = h

    def area(self):
        return self.w * self.h


class Circle(Shape):
    def __init__(self, r):
        super().__init__("Circle")
        self.r = r

    def area(self):
        return 3.14 * self.r * self.r


n = int(input())
shapes = []
for _ in range(n):
    parts = input().split()
    kind = parts[0]
    if kind == "square":
        shapes.append(Square(int(parts[1])))
    elif kind == "rect":
        shapes.append(Rect(int(parts[1]), int(parts[2])))
    else:
        shapes.append(Circle(int(parts[1])))

combined = shapes[0]
for s in shapes[1:]:
    combined = combined + s
print(str(combined))

best = shapes[0]
for s in shapes[1:]:
    if s > best:
        best = s
print(str(best))
`,
  }),

  cq({
    title: "Cart Merge Equal Items",
    description:
      "A checkout backend must merge duplicate cart lines by hand: two CartItems are equal (overridden __eq__) when the name and the unit price both match. No sets and no dicts - just a manual scan backed by __eq__.\n" +
      "For each incoming item, scan the merged list; on a match add its quantity to the existing item, otherwise append it as a new line.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: n\n" +
      "Next n lines: name price qty (names are single tokens)\n" +
      "\n" +
      "Output Format:\n" +
      "The merged cart in first-occurrence order: <name> <price> <qty>\n" +
      "Final line: Distinct items: <k>\n" +
      "\n" +
      "Constraints:\n" +
      "1 <= n <= 200; 1 <= price <= 1000; 1 <= qty <= 100",
    difficulty: "hard",
    variant: "scenario",
    subtopic: SUB.magic,
    si1: "4\napple 10 2\nbanana 5 3\napple 10 4\nmilk 30 1",
    so1: "apple 10 6\nbanana 5 3\nmilk 30 1\nDistinct items: 3",
    si2: "2\npen 5 1\npen 5 1", so2: "pen 5 2\nDistinct items: 1",
    i1: "3\na 1 1\na 2 1\na 1 1", o1: "a 1 2\na 2 1\nDistinct items: 2",
    i2: "1\nsolo 99 7", o2: "solo 99 7\nDistinct items: 1",
    i3: "5\nx 3 1\ny 3 1\nx 3 2\nz 3 1\ny 4 1", o3: "x 3 3\ny 3 1\nz 3 1\ny 4 1\nDistinct items: 4",
    inputconstrains: "1 <= n <= 200; 1 <= price <= 1000; 1 <= qty <= 100; names are single tokens",
    blacklist: "set(, dict(",
    whitelist: "__eq__, .append(",
    sourcecode: String.raw`
class CartItem:
    def __init__(self, name, price, qty):
        self.name = name
        self.price = price
        self.qty = qty

    def __eq__(self, other):
        return self.name == other.name and self.price == other.price


n = int(input())
merged = []
for _ in range(n):
    name, price, qty = input().split()
    item = CartItem(name, int(price), int(qty))
    combined = False
    for existing in merged:
        if item == existing:
            existing.qty += item.qty
            combined = True
            break
    if not combined:
        merged.append(item)

for m in merged:
    print(m.name, m.price, m.qty)
print(f"Distinct items: {len(merged)}")
`,
  }),

  cq({
    title: "Pluggable Report Exporters",
    description:
      "A reporting service ships the same records through three duck-typed exporters - CsvExport, JsonExport and XmlExport - each exposing export(name, marks) with an identical interface and building its output text by hand (no json/csv/xml libraries).\n" +
      "Read the format code, pick the matching exporter object, then print every record through it.\n" +
      "\n" +
      "Input Format:\n" +
      "Line 1: format code (csv, json or xml)\n" +
      "Line 2: n\n" +
      "Next n lines: name marks (names are single tokens)\n" +
      "\n" +
      "Output Format:\n" +
      "csv: one line per record - name,marks\n" +
      'json: line {"students": [ , then two-space-indented {"name": "<n>", "marks": <m>} lines separated by commas (no comma after the last), then ]}\n' +
      'xml: line <students>, then <student name="<n>" marks="<m>"/> per record, then line </students>\n' +
      "\n" +
      "Constraints:\n" +
      "1 <= n <= 50; 0 <= marks <= 100; names are single tokens",
    difficulty: "hard",
    variant: "scenario",
    subtopic: SUB.duck,
    si1: "csv\n3\nAna 90\nBo 75\nCy 88", so1: "Ana,90\nBo,75\nCy,88",
    si2: 'json\n2\nAna 90\nBo 75', so2: '{"students": [\n  {"name": "Ana", "marks": 90},\n  {"name": "Bo", "marks": 75}\n]}',
    i1: "xml\n2\nRavi 60\nSara 95", o1: '<students>\n<student name="Ravi" marks="60"/>\n<student name="Sara" marks="95"/>\n</students>',
    i2: "json\n1\nSolo 100", o2: '{"students": [\n  {"name": "Solo", "marks": 100}\n]}',
    i3: "csv\n1\nZed 33", o3: "Zed,33",
    inputconstrains: "fmt is csv, json or xml; 1 <= n <= 50; 0 <= marks <= 100; names are single tokens",
    blacklist: "json., csv., etree",
    whitelist: "def , .export(",
    sourcecode: String.raw`
class CsvExport:
    def export(self, name, marks):
        return f"{name},{marks}"


class JsonExport:
    def export(self, name, marks):
        return '{"name": "' + name + '", "marks": ' + str(marks) + '}'


class XmlExport:
    def export(self, name, marks):
        return f'<student name="{name}" marks="{marks}"/>'


fmt = input()
n = int(input())
records = []
for _ in range(n):
    parts = input().split()
    records.append((parts[0], int(parts[1])))

if fmt == "csv":
    exporter = CsvExport()
elif fmt == "json":
    exporter = JsonExport()
else:
    exporter = XmlExport()

if fmt == "xml":
    print("<students>")
if fmt == "json":
    print('{"students": [')
for i, (name, marks) in enumerate(records):
    line = exporter.export(name, marks)
    if fmt == "json":
        tail = "," if i < len(records) - 1 else ""
        line = "  " + line + tail
    print(line)
if fmt == "xml":
    print("</students>")
if fmt == "json":
    print("]}")
`,
  }),
];

/* ============================ MCQ QUESTIONS ============================ */

const mcqs = [
  // ---------------- easy ----------------
  mq({
    title: "Meaning of Method Overriding",
    description: "In Python, what does method overriding mean?",
    difficulty: "easy",
    subtopic: SUB.override,
    options: [
      "A child class supplies its own definition for a method it inherits from its parent",
      "Two methods inside one class share the same name",
      "A method is renamed through an assignment",
      "A parent class inherits methods from the child",
    ],
    correct: 1,
  }),
  mq({
    title: "Calling Parent Setup From Child",
    description: "A child class defines its own __init__. The parent's __init__ setup code runs only when...",
    difficulty: "easy",
    subtopic: SUB.sup,
    options: [
      "the child's __init__ is never executed",
      "the child's __init__ calls super().__init__(...)",
      "Python always runs both __init__ bodies automatically",
      "the child class is marked with @override",
    ],
    correct: 2,
  }),
  mq({
    title: "Duck Typing Philosophy",
    description: "Which statement best captures duck typing?",
    difficulty: "easy",
    subtopic: SUB.duck,
    options: [
      "Objects must inherit from a common base class to be interchangeable",
      "What matters is that an object has the needed methods and behavior, not its type or inheritance",
      "Every method must be declared in a separate interface file",
      "Only built-in types can be treated polymorphically",
    ],
    correct: 2,
  }),
  mq({
    title: "Method Used by print",
    description: "For an instance of a class that defines __str__, print(obj) displays...",
    difficulty: "easy",
    subtopic: SUB.magic,
    options: [
      "the string returned by __str__",
      "the string returned by __print__",
      "the object's memory address in every case",
      "the class docstring",
    ],
    correct: 1,
  }),
  mq({
    title: "Default Eq Semantics",
    description: "With no __eq__ override, a == b for two instances of a user-defined class is True only when...",
    difficulty: "easy",
    subtopic: SUB.magic,
    options: [
      "their attributes have equal values",
      "a and b are the same object in memory (identity)",
      "they belong to the same class",
      "their __str__ outputs match",
    ],
    correct: 2,
  }),
  mq({
    title: "Operator Triggering Add",
    description: "Evaluating a + b, where both operands are instances of your class, primarily invokes...",
    difficulty: "easy",
    subtopic: SUB.magic,
    options: [
      "a.__add__(b)",
      "b.__add__(a)",
      "a.__plus__(b)",
      "add(a, b) from builtins",
    ],
    correct: 1,
  }),
  mq({
    title: "What super Returns",
    description: "Inside a child method, super() is...",
    difficulty: "easy",
    subtopic: SUB.sup,
    options: [
      "a proxy object that forwards attribute lookups to the next class in the method resolution order",
      "a brand-new instance of the parent class",
      "the parent class object itself, unconditionally",
      "a copy of self with all parent attributes merged in",
    ],
    correct: 1,
  }),
  mq({
    title: "Bird Penguin Override Output",
    description: "Two classes share a fly method; Penguin overrides it. What does the loop print?",
    difficulty: "easy",
    subtopic: SUB.override,
    options: [
      "Bird flaps upward printed twice",
      "Bird flaps upward, then Penguin slides on ice",
      "Penguin slides on ice, then Bird flaps upward",
      "TypeError: fly cannot be overridden",
    ],
    correct: 2,
    snippet: String.raw`
class Bird:
    def fly(self):
        print("Bird flaps upward")

class Penguin(Bird):
    def fly(self):
        print("Penguin slides on ice")

zoo = [Bird(), Penguin()]
for animal in zoo:
    animal.fly()
`,
  }),
  mq({
    title: "Overriding Signature Flexibility",
    description: "When a child overrides a parent method, the child's version...",
    difficulty: "easy",
    subtopic: SUB.override,
    options: [
      "must repeat the parent's parameter list exactly",
      "may declare its own parameter list",
      "must accept fewer parameters than the parent's version",
      "cannot take any parameters",
    ],
    correct: 2,
  }),
  mq({
    title: "Printing Without Str",
    description: "A class defines neither __str__ nor __repr__. What does print(obj) show?",
    difficulty: "easy",
    subtopic: SUB.magic,
    options: [
      "a dict of the instance attributes",
      "a default string like <__main__.ClassName object at 0x...>",
      "an empty line",
      "a NameError traceback",
    ],
    correct: 2,
  }),

  // ---------------- medium ----------------
  mq({
    title: "Super Describe Extension Output",
    description: "Truck.describe calls super().describe() before adding its own line. What appears on stdout?",
    difficulty: "medium",
    subtopic: SUB.sup,
    options: [
      "Only: A wheeled machine",
      "Only: Hauls freight",
      "A wheeled machine, then Hauls freight",
      "Hauls freight, then A wheeled machine",
    ],
    correct: 3,
    snippet: String.raw`
class Vehicle:
    def describe(self):
        print("A wheeled machine")

class Truck(Vehicle):
    def describe(self):
        super().describe()
        print("Hauls freight")

t = Truck()
t.describe()
`,
  }),
  mq({
    title: "Eq Override Field Comparison",
    description: "Ticket overrides __eq__ to compare row and seat. What does the snippet print?",
    difficulty: "medium",
    subtopic: SUB.magic,
    options: [
      "True then True",
      "False then True",
      "True then False",
      "False then False",
    ],
    correct: 3,
    snippet: String.raw`
class Ticket:
    def __init__(self, row, seat):
        self.row = row
        self.seat = seat

    def __eq__(self, other):
        return self.row == other.row and self.seat == other.seat

a = Ticket(3, "A")
b = Ticket(3, "A")
c = Ticket(4, "B")
print(a == b)
print(a == c)
`,
  }),
  mq({
    title: "Containers Prefer Repr",
    description: "Gem defines both __str__ and __repr__; one gem and a list of gems are printed. What are the two output lines?",
    difficulty: "medium",
    subtopic: SUB.magic,
    options: [
      "gem:opal then [gem:opal, gem:jade]",
      "gem:opal then [Gem(opal), Gem(jade)]",
      "Gem(opal) then [Gem(opal), Gem(jade)]",
      "gem:opal then gem:opal gem:jade",
    ],
    correct: 2,
    snippet: String.raw`
class Gem:
    def __init__(self, name):
        self.name = name

    def __str__(self):
        return "gem:" + self.name

    def __repr__(self):
        return "Gem(" + self.name + ")"

bag = [Gem("opal"), Gem("jade")]
print(bag[0])
print(bag)
`,
  }),
  mq({
    title: "Len Calls Class Len",
    description: "Crate overloads __len__ to multiply the internal count by 10. What does the snippet print?",
    difficulty: "medium",
    subtopic: SUB.magic,
    options: [
      "3",
      "30",
      "10",
      "TypeError: len is read-only",
    ],
    correct: 2,
    snippet: String.raw`
class Crate:
    def __init__(self, codes):
        self.codes = codes

    def __len__(self):
        return len(self.codes) * 10

c = Crate(["a", "b", "c"])
print(len(c))
`,
  }),
  mq({
    title: "Super Follows the MRO",
    description: "super().some_method() called inside a class delegates the lookup to...",
    difficulty: "medium",
    subtopic: SUB.sup,
    options: [
      "the next class in that class's method resolution order (MRO)",
      "whichever ancestor class was defined first in the file",
      "the instance's __dict__",
      "the last ancestor class defined",
    ],
    correct: 1,
  }),
  mq({
    title: "Eq Without Hash Pitfall",
    description: "A class defines __eq__ but not __hash__. What happens when an instance is put into a set or used as a dict key?",
    difficulty: "medium",
    subtopic: SUB.magic,
    options: [
      "It is stored normally, hashed by identity",
      "TypeError: unhashable type - defining __eq__ sets __hash__ to None",
      "The set silently deduplicates by attribute values",
      "Python generates a working hash from __eq__ at runtime",
    ],
    correct: 2,
  }),

  // ---------------- hard ----------------
  mq({
    title: "Add Returning NotImplemented",
    description: "Kilos.__add__ returns NotImplemented and Pounds defines __radd__. What does print(a + b) show?",
    difficulty: "hard",
    subtopic: SUB.magic,
    options: [
      "NotImplemented",
      "converted",
      "TypeError: unsupported operand types",
      "8",
    ],
    correct: 2,
    snippet: String.raw`
class Kilos:
    def __init__(self, value):
        self.value = value

    def __add__(self, other):
        return NotImplemented

class Pounds:
    def __init__(self, value):
        self.value = value

    def __radd__(self, other):
        return "converted"

a = Kilos(5)
b = Pounds(3)
print(a + b)
`,
  }),
  mq({
    title: "Sorted Uses Lt",
    description: "Hiker defines __lt__ by kilometres; sorted(team) relies on it. What does the loop print (one line per hiker)?",
    difficulty: "hard",
    subtopic: SUB.magic,
    options: [
      "Rae 12\nKim 7\nVal 20",
      "Kim 7\nRae 12\nVal 20",
      "Val 20\nRae 12\nKim 7",
      "TypeError: objects are not sortable",
    ],
    correct: 2,
    snippet: String.raw`
class Hiker:
    def __init__(self, name, km):
        self.name = name
        self.km = km

    def __lt__(self, other):
        return self.km < other.km

team = [Hiker("Rae", 12), Hiker("Kim", 7), Hiker("Val", 20)]
for h in sorted(team):
    print(h.name, h.km)
`,
  }),
  mq({
    title: "Str Repr Both Defined",
    description: "Chip defines __str__ and __repr__; three print calls run. Which three lines appear?",
    difficulty: "hard",
    subtopic: SUB.magic,
    options: [
      "CHIP-X1\nChip(X1)\n[Chip(X1)]",
      "CHIP-X1\nChip(X1)\n[CHIP-X1]",
      "Chip(X1)\nCHIP-X1\n[CHIP-X1]",
      "CHIP-X1\nCHIP-X1\n[Chip(X1)]",
    ],
    correct: 1,
    snippet: String.raw`
class Chip:
    def __init__(self, code):
        self.code = code

    def __str__(self):
        return "CHIP-" + self.code

    def __repr__(self):
        return "Chip(" + self.code + ")"

c = Chip("X1")
print(str(c))
print(repr(c))
print([c])
`,
  }),
  mq({
    title: "Reflected Comparison Via Gt",
    description: "Load defines only __gt__; the second comparison falls back to the reflected operand. What does the snippet print?",
    difficulty: "hard",
    subtopic: SUB.magic,
    options: [
      "checking\nTrue\nchecking\nFalse",
      "True\nFalse",
      "checking\nTrue\nTypeError traceback",
      "checking\nTrue\nchecking\nTrue",
    ],
    correct: 1,
    snippet: String.raw`
class Load:
    def __init__(self, tons):
        self.tons = tons

    def __gt__(self, other):
        print("checking")
        return self.tons > other.tons

heavy = Load(9)
light = Load(4)
print(heavy > light)
print(heavy < light)
`,
  }),
];

/* ============================ WRITE ============================ */

writeFileSync(
  DIR + "/day-15.code.json",
  JSON.stringify({ day: 15, topics: [{ name: TOPIC_NAME, subtopics: Object.values(SUB) }], questions }, null, 2)
);
writeFileSync(
  DIR + "/day-15.mcq.json",
  JSON.stringify({ day: 15, questions: mcqs }, null, 2)
);
console.log("wrote day 15:", questions.length, "code,", mcqs.length, "mcq");
