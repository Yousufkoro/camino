> Historical 0.4 report. See RELEASE-0.5.md for current source coverage, AI review and quiz updates.

# Camino 0.4 — Connected goals and application preparation

Unreleased local build. No production site was deployed.

## Where to find the new tools

Explore or profile → Browse official programs → choose Primary and Backup → Connected degree plan. Add each program's official requirements. Use **Foundation**, **Major admission prerequisite**, or **Degree requirement** to describe the stage. Backup goals are preparation checklists, not an automatic second full degree. The application workspace is at `#application-review`, also linked from My Plan and application checkpoints.

The original single-program plan, school-per-course selectors, transcript import and image download remain available under expanded planning tools. Combined plans can download a route image and JSON. Changing a course provider in the original plan does not silently change a previously imported connected-goal snapshot; review/reimport that subset.

## What is implemented

- Associate DTA, science-transfer, applied associate, bachelor, additional-major and certificate goal entry; up to six simultaneous goals.
- Bounded alternative-course search minimizes unique future credits for entered requirements; mixed credit systems use course count and separate totals. Same course identity requires matching institution, code and units. Course titles never create equivalencies.
- Requirement counts, credit minimums, numeric minimum grades, dependencies, co-requisites, seasons, earned-course reuse and workload constraints. Search-limit results are labeled best-found, not proven optimum.
- Cross-goal sharing is conditional by default. Confirmed mode requires student-recorded advisor confirmation, policy URLs and catalog years for both goals. Same-degree overlap needs explicit permission for both requirements. This is not a university degree audit or permission for multiple awards.
- Foundations that unlock other courses are favored; continuing sequences and prerequisites are respected. Backup preparation and admission-stage requirements are prioritized among available classes. This does not guarantee earliest graduation.
- For the supported UWB EE pathway with Bellevue Physics II: Calculus II must be in an earlier term. Mechanics is aligned to keep the physics series consecutive where workload permits. These additional timing rules are Camino preparation preferences, clearly identified in explanations; Bellevue's current local enrollment prerequisites remain to be confirmed. UWB's published calculus co-requisite is not re-described as a universal prerequisite.
- First dedicated-term checkpoint: every scheduled course must be assigned exclusively to the primary goal. Unassigned dependency courses prevent the claim. Pending backup preparation is flagged. It is a decision checkpoint, not an irreversible point of no return, and can change with more complete checklists.
- Major admission category progress, college/major/graduation/registration/aid/advisor checkpoint entry with date, applicable cycle, applicant type and HTTPS source; dates appear on the plan. These are entered reminders, not live notifications.
- GPA estimates per institution and credit system; observed graded attempts including failures are weighted by attempted credits. Pass/fail, transfer-award rows, unknown units and unrecognized grades are excluded. Observed same-institution historical attempts can be included; no institution-specific repeat forgiveness is inferred. Missing or zero-credit failed attempts can make this incomplete. Always use the institution's official GPA for applications.
- Exact GPA target arithmetic and nine future-grade scenarios. These are not admissions simulations or competitive-cutoff recommendations.
- Optional published admission-average entry requires cohort, GPA definition and source; clearly marked student-entered and not independently verified.
- Separate local statement/activities workspace: paste or load TXT (100 KB) or text PDF (5 MB, ten pages), word/paragraph/limit checks and a concrete-example revision checklist. No external AI or substantive essay-quality model is connected. Scanned PDFs require pasted text. Explicit local draft save; draft text is excluded from account sync/workspace exports and removed by local draft deletion or workspace deletion.
- Interactive bookshelf logo, staggered wordmark/headline motion, dimensional stair routes and finite route travelers; reduced-motion behavior and responsive styles.

## Official program listings and limitations

Snapshot reviewed November 9, 2026. 273 directory entries are loaded; they include degree options and transfer focus areas, not 273 independently audited majors.

| College | Loaded listing | Requirements |
| --- | --- | --- |
| UW Seattle | 118 named directory entries, including Informatics | No full degree audits; selected Bellevue math mappings remain available |
| UW Bothell | 29 bachelor-level directory entries | Supported EE foundation/core subset; not full degree/gen-ed/residency audit |
| UW Tacoma | 38 undergraduate major/option entries | Not loaded |
| Cascadia | 76 programs/focus areas, including some non-degree study | Not loaded |
| Seattle Colleges | 12 selected bachelor programs; campus-specific official links | Not loaded |
| Bellevue | Official directory link; source requests returned 403 | No full associate/major catalog loaded |
| WSU | Official directory link; major finder returned 403 / catalog shell interactive | Not loaded |

Coverage is **not every major at every college** and **not every major's prerequisites**. Missing programs can be entered with their official source. No live institutional data connection, crawler, refresh service or universal equivalency database has been configured. Selecting a program does not fabricate its curriculum or enable automatic full-degree scheduling. The interest quiz still uses its existing exploratory themes; the larger official program browser is a separate selection tool.

Official directory snapshots:

- https://admit.washington.edu/academics/majors/
- https://www.uwb.edu/degrees
- https://www.tacoma.uw.edu/admissions/majors-degrees
- https://www.cascadia.edu/academic-programs/default.aspx
- https://www.seattlecolleges.edu/programs/bachelors-degrees
- https://www.bellevuecollege.edu/academics/
- https://admission.wsu.edu/academics/fos/Public/index.castle

Additional sources:

- UW Informatics prerequisites: https://ischool.uw.edu/programs/informatics/admissions/prerequisites
- Current Seattle-student application rules: https://ischool.uw.edu/programs/informatics/admissions/current-students
- Informatics curriculum: https://ischool.uw.edu/programs/informatics/curriculum
- Washington DTA explanation: https://www.sbctc.edu/colleges-staff/programs-services/transfer/direct-transfer-agreement.aspx
- UWB EE curriculum, admissions, Bellevue STEM equivalencies and course catalog links are retained in `dist/academic-pathway.js`.

Current UW Seattle Informatics applicants have different requirements from transfer/first-year applicants. The sourced current-student page describes April 5 / October 5 cycles, weekend adjustments and prerequisite timing; those are explanatory source rules, not automatically assigned student-specific deadlines.

## Features that still need real data or infrastructure

Personal college/major acceptance percentages are **unavailable**, not calculated from an invented score. Monte Carlo simulation cannot create accuracy without representative applicant/outcome data, a validated and calibrated model, cohort/route definitions and uncertainty evaluation. An overall college acceptance rate or admitted GPA average is not an individual's probability. There are no unsupported “your essay reduced your chances by X%” claims.

A substantive AI essay reviewer, live college integrations, complete sourced curricula, average GPA feeds and a validated admissions model remain unimplemented. Current feedback is deliberately labeled writing checks and preparation guidance. Published minimum grades are eligibility requirements, not promises of competitiveness or admission.

## Verification

`npm run check`, `npm test`, `npm run test:dom`, standalone asset build and Wrangler dry-run. Tests use synthetic student records. Functional DOM tests verify goals, policy modes, backup persistence, GPA arithmetic, dates on plans, draft privacy, exports and reduced-motion markup. Real-browser visual/mobile testing was unavailable in this environment; responsive CSS is implemented but is not screenshot-certified.
