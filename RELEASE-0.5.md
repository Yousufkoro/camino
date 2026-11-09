# Camino 0.5 — Interactive discovery and sourced planning

This is an unpublished download bundle. Production URLs were not changed.

## Experience

The quiz is now a lantern-lit ascent through an original library staircase: four chapters, dimensional steps, an advancing traveler, changing light, responsive choice cards, keyboard focus reactions and a result reveal. This uses original SVG/CSS artwork and preserves Camino's staircase/bookshelf identity. It does not copy Hogwarts artwork, characters, questions, music or branding.

Motion responds to an action. There are no time limits, speed scores, autoplay audio, mouse chasing or required gestures. Ambient animations stop after a finite number of cycles. Reduced-motion settings disable motion, and all answers remain normal keyboard/touch buttons. Back, save/resume, cancellation during feedback and the 12/32-question options remain available.

Search results are paginated in groups of 24 and preserve the filter when a primary/backup is saved. Most academic details remain behind expandable sections.

## Program and curriculum coverage

653 official directory records are loaded. They include credential variants, certificates, transfer focus areas and some non-degree study; this is not a count of independently audited majors.

| Institution | Directory records | Scope |
| --- | ---: | --- |
| UW Seattle | 118 | Named undergraduate directory entries, including Informatics |
| UW Bothell | 35 | Bachelor programs and additional options from the official admissions table |
| UW Tacoma | 38 | Undergraduate majors/options |
| Bellevue College | 155 | Official credential/program listing now accessible normally |
| Cascadia College | 105 | Program/focus entries plus 29 official 2026–27 catalog degree/certificate records |
| Seattle Colleges | 180 | Campus-specific North/Central/South Programs A–Z plus selected bachelor programs |
| WSU | 22 | Tri-Cities only; university-wide coverage remains incomplete |

Source links and review dates are retained per record. Program listings do not imply verified curricula, course access or guaranteed transfer.

New curated templates:

- UW Seattle Informatics current-student admission preparation: four categories, published minimum2.0; selected programming/statistics/SSc alternatives from official sources.
- Informatics transfer preparation: three categories before admission, INFO200 after enrollment; separate UW transfer application still required.
- Already-admitted Informatics core subset with documented prerequisites, a selected legal capstone prerequisite combination and explicit preparation preferences. **Not a complete degree audit.** The degree page lists INFO290 while the current course catalog lists INFO280 instead; no automatic substitution is made. General education, residency, electives and catalog-year rules remain to be resolved.
- Statewide DTA associate guideline effective September2026:90quartercredits, 60general education +30electives, 2.0awarding-college GPA. Category credit minima, two-discipline distribution checks, required science lab and no within-guideline course double counting. Students/advisers must enter college-approved course eligibility and documented discipline/lab metadata. Humanities performance/language caps, placement, transferable-elective limits and local rules remain explicit review items. This is not Bellevue's verified local checklist; its linked catalog program page returned403.

The existing UWB EE foundation/core subset and per-class provider controls remain. Connected-goal requirements can pin a documented school/course alternative; they never infer equivalency from a similar course title. Different credit systems stay separate.

## Official source connection

`GET /api/college-source?id=…` and `?program=…` read registered official sources. They accept registry IDs, never arbitrary URLs. Requests have bounded size/time, an allowlist for every redirect, a source rate limit and up-to-one-hour caching. Failure/403 responses are shown as unavailable with a direct official link. The service does not bypass access controls, silently certify rules or send student records to colleges.

The Source Library covers all seven listed institutions, with program-specific reading from directory cards. A real source read was verified against the UW Informatics prerequisite page. Read source text remains evidence for review, not an automatically approved curriculum.

## Applications, dates and calculations

- Published historical UW Seattle first-year/transfer cohort rates and GPA middle50% ranges are shown with cohort definitions. These are not individual probabilities or major rates.
- Informatics displays its exact “2025-26 Average Grade & Range” prerequisite table. The source does not identify the population, so it is not labeled admitted-student GPA.
- UWB EE minimums are sourced: cumulativeGPA2.7; CalculusI/II/Mechanics each2.3 and average2.6; English composition2.0. Observed verified mappings and a separately reported GPA can be compared against these numeric requirements; this is not a college eligibility decision.
- The deterministic EE calculator enumerates up to5,832 future-grade combinations. It states the weighting assumption and reports feasible grade combinations, never a probability. Ordinary GPA target scenarios remain available.
- Current-Seattle Informatics annual rules can create source-labeled derived 2027 planning reminders after the applicant route is selected. Transfer and first-year routes do not inherit those reminders automatically. UWB graduation procedures and additional-degree/residency rules are shown from official sources.
- Dated reminders appear on plans, download to an all-day ICS calendar, and appear in the plan PNG. Image titles, long notes and deadlines wrap cleanly. Dates remain planning reminders until current-cycle applicability and closing times are confirmed.

## Detailed statement and activity review

Local writing checks remain available without a model. Statements and activities/résumés can load from TXT or text PDF. Scanned PDFs require pasted text. PDF limits:5MB/10pages; TXT:100KB. Statement field:30,000characters; activities:15,000.

The full Worker configuration now includes Cloudflare Workers AI and a native review rate limiter. Students explicitly consent and click **Send for review** before any text is sent. Completed course codes/titles/grades are sent only if they separately opt in; names, IDs and transcript files are not included. No AI requests occur on page load.

The reviewer returns structured strengths, prioritized revisions and prompt-coverage feedback, quoting evidence. Unmatched quotes are flagged. Outcome/percentage claims are rejected. It does not write a replacement essay. Informatics' official AI-use/disclosure policy is linked. Cancellation, navigation and editing during a request prevent stale results from being presented; provider processing may already have started before cancellation.

Camino does not persist review requests/responses on the server. Cloudflare's processing/privacy terms apply. Explicitly saved drafts stay in this browser, outside workspace exports and account sync, and workspace deletion removes them.

The backend was tested with model fixtures and bundled against real Cloudflare bindings. No live Workers AI inference was made: this execution environment has no Cloudflare account credentials. Model/account access and provider quotas must be checked after the owner deploys. The local-only configuration omits the AI binding.

## What cannot honestly be marked complete

- Every major's complete curriculum and all college-to-college equivalencies are not verified. WSU-wide listings and some local catalogs remain unavailable; custom sourced entries and live source viewing support work around those coverage gaps without inventing rules.
- No validated personal admissions probability model exists. Published GPA figures, essay rubric weights and simulated grades cannot establish accurate individual percentages without representative applicant/outcome data and calibration. The interface says unavailable rather than fabricating odds.
- Full university degree audits, residency exceptions, local DTA adoption, some distribution caps, elective approvals and the Informatics course-source conflict require institutional confirmation.

## Verification

- Authored JavaScript syntax checks, the full unit/security/transcript suite and five functional DOM suites.
- Immersive quiz chapters, keyboard/focus/back flow, saved filters, source templates, prerequisite order, discipline/lab rules, school pinning, GPA scenarios, dates, calendar/image actions, consent and local-draft privacy.
- Official-source allowlist/redirect limits, source failure handling, review CSRF/size/rate-limit checks, minimized coursework, evidence validation and rejection of probability claims.
- Both Workers configurations bundled with Wrangler dry-run; no deployment occurred.
- Shared managed browser control is unavailable (`cua_repl.js` is not exposed). Per the Sites workflow no substitute browser server/control path was started. Functional DOM tests and responsive styles do not constitute real-browser screenshot/mobile certification.
