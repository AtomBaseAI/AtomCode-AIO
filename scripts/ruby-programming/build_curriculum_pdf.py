#!/usr/bin/env python3
"""
Generate the "Ruby Programming" curriculum PDF, matching the visual format
of the uploaded C/Java/CPP/Python curriculum PDFs in /home/z/my-project/upload/.

Layout:
  - Title:  "Ruby Programming"
  - Subtitle: "Curriculum"
  - 3-column table: Day | Topic Description | Practical Exercise

The "Practical Exercise" column uses action-verb phrases ("Understand X",
"Implement Y", "Declare Z") mirroring the tone of the source PDFs.
"""
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, KeepTogether
)

OUT_PDF = "/home/z/my-project/docs/Ruby Programming.pdf"

# ───────────────────────────── Curriculum data ─────────────────────────────
# Each tuple: (day, topic, practical_exercise_text)
# `practical_exercise_text` mirrors the verb-phrasing of the uploaded PDFs:
#   - "Understand ..." for theory-heavy days
#   - "Implement ..." for hands-on days
#   - "Declare, define ..." for declarative-language days
#   - trailing period, comma-separated list inside.
ROWS = [
    (1, "Introduction to Ruby",
     "History, Features, Applications of Ruby, "
     "Role of Ruby in Web and Scripting, "
     "Installing and Running Ruby, Interactive Ruby (IRB)."),

    (2, "Ruby Syntax and Data Types",
     "Understand Variables, Comments, Numeric Types, "
     "Strings, Booleans, nil, Symbols, "
     "Type Conversion and Coercion."),

    (3, "Operators",
     "Arithmetic, Comparison, Logical, Bitwise, Assignment, "
     "Conditional (Ternary), Range, Spaceship Operators, "
     "Operator Precedence and Associativity."),

    (4, "Control Flow",
     "Understand if-elsif-else, unless, case-when, "
     "Modifier Forms, Nested Control Structures."),

    (5, "Loops and Iterators",
     "Implement while, until, for-in Loops, "
     "times, upto, downto, each Iterators, "
     "break, next, redo."),

    (6, "Methods",
     "Handling Method Definition, Parameters, "
     "Default and Keyword Arguments, Splat, "
     "Return Values, Variable Scope."),

    (7, "Arrays",
     "Declare, define Arrays. Handling Array "
     "Creation, Access, Iteration, Methods, "
     "Transformation, Multidimensional Arrays."),

    (8, "Hashes",
     "Declare, define Hashes. Handling Hash "
     "Creation, Access, Iteration, Methods, "
     "Default Values, Nested Hashes."),

    (9, "Strings",
     "Understand String Interpolation, Methods, "
     "Mutation, Formatting, Encoding Basics."),

    (10, "Symbols and Ranges",
     "Understand Symbols vs Strings, "
     "Inclusive and Exclusive Ranges, "
     "Iteration on Ranges, Range Methods."),

    (11, "Blocks, Procs and Lambdas",
     "Implement Blocks (do-end and braces), "
     "yield, block_given?, Procs, Lambdas, "
     "Ampersand Block Parameter, Closures."),

    (12, "Exception Handling",
     "Understand begin-rescue-end, else, ensure, "
     "raise, Custom Exception Classes, retry."),

    (13, "Modules and Mixins",
     "Implement Modules, Namespacing, "
     "include, extend, prepend Mixins, "
     "Comparable and Enumerable."),

    (14, "Object-Oriented Programming Basics",
     "Understand Classes, Instance Variables, "
     "Instance Methods, attr_accessor Family, "
     "initialize, self Keyword."),

    (15, "Inheritance and Class Design",
     "Implement Single Inheritance, super, "
     "Method Overriding, Access Modifiers "
     "(public, private, protected), Class Variables."),

    (16, "Metaprogramming Basics",
     "Understand send, define_method, "
     "method_missing, class_eval, instance_eval, "
     "respond_to."),

    (17, "File Handling",
     "Understand File.open, Reading, Writing, "
     "File Modes (r, w, a), File.foreach, "
     "Directory Operations with Dir."),

    (18, "Regular Expressions",
     "Implement Regexp Literals, match, scan, "
     "gsub, sub, Capture Groups, "
     "Anchors and Quantifiers."),

    (19, "Threads and Concurrency",
     "Understand Creating Threads, join, "
     "Mutex and Synchronization, Queue, "
     "Fibers."),

    (20, "Gems and Standard Library",
     "Understand Gemfile, Bundler, require, load, "
     "Date and Time, JSON, YAML, CSV, "
     "Benchmark Modules."),
]

# ───────────────────────────── Styles ─────────────────────────────
styles = getSampleStyleSheet()

title_style = ParagraphStyle(
    "Title",
    parent=styles["Title"],
    fontName="Helvetica-Bold",
    fontSize=22,
    leading=26,
    alignment=TA_LEFT,
    spaceAfter=2,
)

subtitle_style = ParagraphStyle(
    "Subtitle",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=12,
    leading=14,
    alignment=TA_LEFT,
    spaceAfter=14,
)

cell_style = ParagraphStyle(
    "Cell",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=9,
    leading=12,
    alignment=TA_LEFT,
)

cell_day_style = ParagraphStyle(
    "CellDay",
    parent=cell_style,
    alignment=TA_CENTER,
    fontName="Helvetica-Bold",
)

header_style = ParagraphStyle(
    "Header",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=10,
    leading=12,
    alignment=TA_LEFT,
    textColor=colors.white,
)

header_day_style = ParagraphStyle(
    "HeaderDay",
    parent=header_style,
    alignment=TA_CENTER,
)


# ───────────────────────────── Build PDF ─────────────────────────────
def build():
    os.makedirs(os.path.dirname(OUT_PDF), exist_ok=True)

    doc = SimpleDocTemplate(
        OUT_PDF,
        pagesize=A4,
        leftMargin=20 * mm,
        rightMargin=20 * mm,
        topMargin=18 * mm,
        bottomMargin=18 * mm,
        title="Ruby Programming",
        author="AtomCode",
        subject="Ruby Programming Curriculum",
        creator="AtomCode Curriculum Generator",
    )

    story = []
    story.append(Paragraph("Ruby Programming", title_style))
    story.append(Paragraph("Curriculum", subtitle_style))

    # Table header row
    header_row = [
        Paragraph("Day", header_day_style),
        Paragraph("Topic Description", header_style),
        Paragraph("Practical Exercise", header_style),
    ]

    # Body rows: each ROW is a tuple (day, topic, exercise)
    table_data = [header_row]
    for day, topic, exercise in ROWS:
        table_data.append([
            Paragraph(str(day), cell_day_style),
            Paragraph(topic, cell_style),
            Paragraph(exercise, cell_style),
        ])

    # Column widths (sum must fit page width: A4 = 210mm, margins 20+20=40mm → 170mm available)
    available = 170 * mm
    col_widths = [
        available * 0.08,   # Day
        available * 0.32,   # Topic Description
        available * 0.60,   # Practical Exercise
    ]

    table = Table(table_data, colWidths=col_widths, repeatRows=1)
    table.setStyle(TableStyle([
        # Header
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#1f2937")),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("VALIGN", (0, 0), (-1, 0), "MIDDLE"),
        ("ALIGN", (0, 0), (0, 0), "CENTER"),
        ("TOPPADDING", (0, 0), (-1, 0), 6),
        ("BOTTOMPADDING", (0, 0), (-1, 0), 6),
        # Body
        ("VALIGN", (0, 1), (-1, -1), "TOP"),
        ("ALIGN", (0, 1), (0, -1), "CENTER"),
        ("TOPPADDING", (0, 1), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 1), (-1, -1), 5),
        ("LEFTPADDING", (0, 1), (-1, -1), 6),
        ("RIGHTPADDING", (0, 1), (-1, -1), 6),
        # Grid (light lines)
        ("GRID", (0, 0), (-1, -1), 0.25, colors.HexColor("#9ca3af")),
        # Zebra striping (even rows shaded)
        ("ROWBACKGROUNDS", (0, 1), (-1, -1),
         [colors.white, colors.HexColor("#f3f4f6")]),
    ]))

    story.append(table)

    doc.build(story)
    size = os.path.getsize(OUT_PDF)
    print(f"✓ Wrote {OUT_PDF} ({size:,} bytes)")


if __name__ == "__main__":
    build()
