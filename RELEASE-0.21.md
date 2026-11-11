# 0.21 — Sociology subject-credit checks

Adds UW Seattle Sociology's named core/statistics choices, five-credit additional-course checks and bounded upper-division sociology credit floor. Official admission and completion clauses were rechecked against freshly fetched catalog text by scripts/add-seattle-sociology-model.cjs. The admission statement allowing SOC300 to be in progress stays unresolved rather than being changed into a completed-course requirement.

The audit engine now supports explicit subject, level, course-exclusion, grade, individual-credit and non-overlapping group-cap checks. Sociology's practicum courses contribute at most5 toward the20 upper-division elective credits. Cross-listed records and provisional transfer origins count once. Missing grades/credits, repeated/conflicting aliases, malformed rules and overlapping caps remain reviewable.

These are independent necessary category checks. They do not allocate credits globally across all major requirements, establish the50-credit major total, major GPA, residency, general electives or admission. Subject categories remain review items in the planning bridge; named SOC300/SOC316 and the statistics choice can enter the existing reviewed degree-course draft. No admission course list is invented from the in-progress exception.

Validation: category/cap/boundary unit cases, retained policy and plan-bridge tests, full regression validation, updated unit/syntax checks and Chromium desktop/mobile source audit to scoped draft with existing records preserved.59 of953 models now contain some structured rules; full academic coverage remains unfinished. Reviewer remains(Beta).

Public source: https://www.washington.edu/students/gencat/program/S/Sociology-293.html (reviewed2026-11-10).
