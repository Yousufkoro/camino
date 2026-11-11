# 0.23 — Bothell computing and business depth

Enriches eight existing source models: CSSE, CSSE Information Assurance & Cybersecurity, Business Administration, Accounting, Finance, Leadership & Strategic Innovation, Marketing and Supply Chain Management. This improves depth, not the count of modeled program entries (still64 of953).

Current official credential/program text was checked by scripts/add-bothell-cs-business-models.cjs. CSSE admission course alternatives retain second-writing and recommended-statistics conditions; the catalog's separate Applied Computing admission-grade statement is not copied into CSSE. Degree core checks enforce the published2.0 minimum, including legacy core checks. Cybersecurity adds CSS310 and a15-credit check over its four named option-elective courses, without making all four mandatory. General electives, capstone, cumulative GPA and residency remain distinct review conditions.

Business concentration cores retain their published1.7 grade minimum and explicit group-credit floors. Supply Chain Management retains a choice among internship, research, field-study and consulting courses with a five-credit floor. Public admission statistics/microeconomics/composition credit minima are checked. ELC and first-year/direct-entry admission routes remain separate; approved concentration elective lists and unmodeled upper-division allocation remain unresolved.

Fixes credits-from-courses checks so missing, whitespace, nonnumeric or negative credits require review rather than being treated as a known zero. Known zero credits remain distinguishable and do not advance the floor. Repeated-course and provisional-transfer safeguards remain.

Validation: boundary/option/route/ELC/credit/grade tests, full regression suite, source-plan schema checks and real Chromium1440/390 from cybersecurity audit through nine-course core draft and source metadata; accounting35-credit core inspected. Academic records stayed unchanged. These remain partial audits, not complete degree or admission certification. Reviewer remains(Beta).

Official sources reviewed2026-11-11:
- https://www.washington.edu/students/gencat/program/B/ComputingandSoftwareSystems-865.html
- https://www.washington.edu/students/gencat/program/B/BusinessAdministration-881.html
