# 0.20 — UW Seattle Chemistry course models

Adds explicit course/grade rules for the Seattle Chemistry BA, BS and ACS-certified BS. Fresh official catalog HTML was checked against every retained admission and credential-completion clause before applying the hand-reviewed definitions. Reproducible source guard: `scripts/add-seattle-chemistry-models.cjs <official-html> <review-date>`.

Whole general/organic chemistry, physics and mathematics alternatives stay together. BA vs BS organic labs and grade minima differ. ACS inorganic/analytical options, six-course general physics option and BIOC-vs-CHEM grade scope stay distinct. Adds the published continuation-policy text as a review condition. Major-admission course rules are applied to transfer/current-student routes, without inventing first-year direct-major requirements.

Cumulative/prerequisite GPA, minimum total/elective/lab credits, research permissions, distribution, continuation and graduation policies remain unresolved where the current engine cannot establish full applicability. Course checks do not certify degree completion or admission. Count is now58 of953 models with some structured rules; none of these counts establishes complete degree coverage.

Validation: explicit alternative/grade/campus/route tests; source-to-plan schema checks across234 modeled scope/route subsets; full regression suite; Chromium desktop/mobile from audit through whole-sequence choice, seven-course admission draft and lazy prerequisite metadata without changing earned coursework.

Official source: https://www.washington.edu/students/gencat/program/S/Chemistry-117.html (reviewed2026-11-10).
