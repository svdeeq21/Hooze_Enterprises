"""
Regenerates public/downloads/Hooze-Business-Automation-Starter-Kit.pdf

Run:  python tools/build-guide-pdf.py      (needs: pip install reportlab)

Keep SITE / EMAIL in sync with src/lib/site-config.ts. When the official
company email is confirmed, change EMAIL below and run the script again.
"""
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer,
                                Table, TableStyle, PageBreak, KeepTogether, HRFlowable)
import os

SITE = "www.hoozeenterprises.com"
PROJECT_URL = "www.hoozeenterprises.com/start-a-project"
EMAIL = "hoozeenterprises@gmail.com"  # TODO: replace with the verified company-domain address
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "downloads",
                   "Hooze-Business-Automation-Starter-Kit.pdf")

INK = colors.HexColor("#161616")
MUTED = colors.HexColor("#5b5b5b")
AMBER = colors.HexColor("#b07d2a")
RULE = colors.HexColor("#d9d4c8")
PAPER = colors.HexColor("#f7f5ef")

def style(name, **kw):
    base = dict(fontName="Helvetica", fontSize=10, leading=15, textColor=INK)
    base.update(kw)
    return ParagraphStyle(name, **base)

eyebrow = style("eyebrow", fontName="Helvetica-Bold", fontSize=7.5, leading=10, textColor=AMBER, spaceBefore=16, spaceAfter=4)
h1 = style("h1", fontName="Helvetica-Bold", fontSize=15, leading=19, spaceAfter=6)
body = style("body", textColor=colors.HexColor("#2b2b2b"), spaceAfter=7)
lead = style("lead", fontSize=9.5, textColor=MUTED, spaceAfter=8)
item = style("item", leftIndent=14, firstLineIndent=-14, spaceAfter=5, textColor=colors.HexColor("#2b2b2b"))
small = style("small", fontSize=8.5, leading=12, textColor=MUTED)
cover_label = style("cl", fontName="Helvetica-Bold", fontSize=8, textColor=AMBER, spaceAfter=10)
cover_title = style("ct", fontName="Helvetica-Bold", fontSize=30, leading=35, spaceAfter=14)
cover_sub = style("cs", fontSize=12, leading=18, textColor=MUTED)

def dash(text):  return Paragraph("&mdash;&nbsp; " + text, item)
def num(n, text): return Paragraph(f'<font color="#b07d2a" name="Helvetica-Bold">{n}</font>&nbsp;&nbsp; {text}', item)
def section(label, title): return [Paragraph(label, eyebrow), Paragraph(title, h1)]

def footer(canvas, doc):
    if doc.page == 1:
        return
    canvas.saveState()
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(MUTED)
    canvas.drawString(22*mm, 12*mm, f"Hooze Enterprises  |  {SITE}")
    canvas.drawRightString(A4[0]-22*mm, 12*mm, f"{doc.page}")
    canvas.restoreState()

doc = BaseDocTemplate(OUT, pagesize=A4, leftMargin=22*mm, rightMargin=22*mm, topMargin=22*mm, bottomMargin=20*mm,
                      title="The Business Automation Starter Kit — Hooze Enterprises",
                      author="Hooze Enterprises", subject="A practical first look at repetitive work in your business")
frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="f")
doc.addPageTemplates([PageTemplate(id="p", frames=[frame], onPage=footer)])

s = []
# ---- cover
s += [Spacer(1, 95*mm), Paragraph("HOOZE ENTERPRISES", cover_label),
      Paragraph("The Business Automation<br/>Starter Kit", cover_title),
      Paragraph("A practical first look at where your business is losing time to repetitive work &mdash; "
                "and what to do about it before you buy any software.", cover_sub),
      Spacer(1, 18*mm), HRFlowable(width="100%", color=RULE, thickness=0.7), Spacer(1, 6),
      Paragraph(f"{SITE} &nbsp;&middot;&nbsp; {EMAIL} &nbsp;&middot;&nbsp; Nigeria", small), PageBreak()]

# ---- page 2
s += section("BEFORE YOU START", "Why this guide exists")
s += [Paragraph("Most businesses don't have an automation problem. They have a visibility problem: nobody has written down where "
                "the repeated, manual, low-judgment work actually is. This guide is a short, honest first pass at finding that "
                "work &mdash; not a sales pitch, and not a promise that every task on this list needs software. Some of it just needs "
                "a better checklist.", body),
      Paragraph("Work through it in about twenty minutes. By the end you'll have a short list of candidates worth a closer look, "
                "in your own words &mdash; not ours.", body)]
s += section("SECTION 1", "How to identify repetitive work")
s += [Paragraph("Look for these five patterns. If a task matches more than one, it's worth writing down.", lead),
      dash("<b>It happens on a schedule, not because someone decided to do it.</b> Daily reports, weekly stock counts, monthly reconciliations."),
      dash("<b>It's copy-and-paste work.</b> Moving the same information from a chat, form, or invoice into another tool or spreadsheet."),
      dash("<b>It depends on one person remembering to do it.</b> Follow-ups, reminders, renewal checks &mdash; nothing forces them to happen."),
      dash("<b>The output is always structured the same way.</b> Same fields, same format, different values each time."),
      dash("<b>It causes a delay when the person who usually does it is away.</b> That's a sign the process lives in someone's head, not in the business.")]
s += section("SECTION 2", "Process audit worksheet")
s += [Paragraph("Pick one process you suspect is worth reviewing and answer these six questions about it.", lead)]
qs = ["What triggers this process to start?", "Who currently does it, and how often?",
      "How long does one cycle take, start to finish?",
      "Which tools or channels does it touch? (WhatsApp, Excel, email, paper)",
      "What happens if it's late or skipped?", "What does 'done well' look like?"]
cell = style("cell", fontSize=9, leading=12)
head = style("head", fontName="Helvetica-Bold", fontSize=9, textColor=colors.white)
rows = [[Paragraph("Question", head), Paragraph("Your notes", head)]] + [[Paragraph(q, cell), ""] for q in qs]
t = Table(rows, colWidths=[doc.width*0.58, doc.width*0.42], rowHeights=[8*mm] + [11*mm]*6)
t.setStyle(TableStyle([("BACKGROUND", (0,0), (-1,0), INK), ("BACKGROUND", (0,1), (-1,-1), PAPER),
                       ("GRID", (0,0), (-1,-1), 0.6, RULE), ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
                       ("LEFTPADDING", (0,0), (-1,-1), 8)]))
s += [t, Spacer(1, 6),
      Paragraph("If you struggled to answer more than two of these, that's useful information on its own &mdash; it usually means the "
                "process isn't well-defined yet, and defining it comes before automating it.", small), PageBreak()]

# ---- page 3
s += section("SECTION 3", "Common tasks businesses automate first")
s += [Paragraph("These tend to have the clearest return because they're frequent, structured, and low-judgment.", lead)]
for x in ["Routing new customer enquiries to the right person or channel.",
          "Sending order, payment, or booking confirmations.",
          "Following up on quotes or enquiries that have gone quiet.",
          "Compiling a daily or weekly sales/stock report from raw records.",
          "Reminding customers about renewals, appointments, or outstanding payments.",
          "Turning a completed order into an invoice or receipt.",
          "Keeping a single, de-duplicated customer/contact list across channels."]:
    s.append(dash(x))
s += section("SECTION 4", "Customer enquiry &amp; follow-up checklist")
s += [Paragraph("A minimum standard worth holding your team (or yourself) to, automated or not.", lead)]
for x in ["Every enquiry gets an acknowledgement within a set, known time window.",
          "Every enquiry is recorded somewhere other than a single person's phone or inbox.",
          "Every enquiry has an owner &mdash; someone whose job it is to follow up.",
          "No enquiry goes more than a fixed number of days without a follow-up or a closed status.",
          "You can answer, in under a minute, &ldquo;how many enquiries came in this week and what happened to them?&rdquo;"]:
    s.append(dash(x))
s += section("SECTION 5", "Questions to ask before buying any automation tool")
for n, x in enumerate(["What exactly does this replace &mdash; a person, a spreadsheet, or nothing (i.e. it's new work)?",
          "Where does the data live, and can I export all of it if I stop using this tool?",
          "What happens when it fails &mdash; does the process stop, or degrade gracefully?",
          "Who on my team will actually maintain this, and do they have time to?",
          "Does this fit how my business already operates, or am I being asked to change how I work to fit the tool?",
          "What's the real cost once I include setup, training, and the time to fix mistakes early on?"], 1):
    s.append(num(f"{n:02d}", x))
s.append(PageBreak())

# ---- page 4
s += section("SECTION 6", "Practical next steps")
for n, x in enumerate(["Pick the single process from Section 1 that costs you the most time or the most missed follow-ups.",
          "Fill in the worksheet from Section 2 for that one process only.",
          "Decide, honestly, whether the fix is a better checklist, a simple tool you already own, or something built specifically for you.",
          "If it's the third one, write down the problem in plain language before looking at any tool or vendor &mdash; including us."], 1):
    s.append(num(f"{n:02d}", x))
s += [Spacer(1, 8), HRFlowable(width="100%", color=RULE, thickness=0.7), Spacer(1, 8),
      Paragraph("This guide is meant to be useful on its own, whether or not you ever work with Hooze. If a specific process stood out "
                f"while going through it and you'd like a second opinion, you're welcome to describe it at {PROJECT_URL} "
                "&mdash; there's no obligation either way.", body),
      Spacer(1, 10), Paragraph(f"Hooze Enterprises &nbsp;&middot;&nbsp; Nigeria &nbsp;&middot;&nbsp; {SITE} &nbsp;&middot;&nbsp; {EMAIL}", small)]

doc.build(s)
print("wrote", os.path.normpath(OUT))
