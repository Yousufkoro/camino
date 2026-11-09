# Camino 0.6 — First-person roads and the UW undergraduate catalog

This is an unpublished standalone workers.dev bundle. No production deployment was performed.

## Priority updates completed in code

### First-person road quiz

The viewer stands on a forest road facing four forks. The lantern follows a fine-pointer mouse, with a visible click hotspot; hovering or keyboard focus lights the matching road. Clicking the road or its sign confirms the choice and walks/turns toward the next fork. Touch users get normal sign buttons and a held lantern, without needing a mouse cursor. The standard-cursor toggle is saved. Reduced motion disables the cursor-follow and walk animations. No speed scoring or time limit is used. Back, save/resume, double-click protection and cancellation on navigation are tested.

This replaces the previous third-person staircase quiz. The planning interface retains Camino's broader staircase/journey identity.

### All reviewed UW undergraduate catalog entries

The current official catalog indexes across Seattle, Bothell and Tacoma were reconciled against **179 department pages**, all successfully fetched. Every bachelor credential heading within their undergraduate-major sections was captured:

| Campus | Selectable catalog credentials/options |
| --- | ---: |
| UW Seattle | 227 |
| UW Bothell | 43 |
| UW Tacoma | 56 |
| Total | 326 |

These are **degree/option records**, not 326 independent majors. The records represent175 unique campus/parent-major families. Two additional catalog entries explicitly marked not admitting are documented but excluded from current choices. Graduate degrees, minors and non-bachelor professional degrees are outside this undergraduate scope. Catalog-listed does not independently establish that applications are open.

Each record has its exact credential title, parent major, campus, source anchor, review date and applicable-year caveat. Bothell identifies2026–27; Seattle/Tacoma's reviewed indexes do not explicitly identify an edition. The UW browser searches titles, credentials and major families, with campus filtering and pagination. Selecting a primary updates the plan's actual major and campus; backup selection preserves the primary.

The **published admission and completion text** is available through “Read full published requirements” and from saved goals. This includes original choices, GPA phrases, distributions and credit requirements. A Construction Management/Architectural Design dual-degree record refers elsewhere for completion details; the referral is preserved. Historical program IDs remain resolvable for earlier saved plans.

Published source text is not an automatically interpreted, institution-approved audit. Not every UW curriculum has been converted into a prerequisite graph, elective allocation and residency audit. Existing automatic templates and manually entered constraints remain separately labeled.

The newer General Catalog Informatics source lists INFO280, while the earlier department curriculum snapshot lists INFO290. Both source scopes remain visible; the older partial template is not silently rewritten to assume a student's catalog year.

## Deadline integration completed

The new finder includes:

-70 fixed-year calendar events from official sources, including graduation, instruction, registration, tuition and aid events where available.
-15 published annual application rules, scoped to college, applicant route and entry term.
-37 UWB transfer/post-baccalaureate major-table rows.
-Canonical calendars for all seven listed institutions and three sourced graduation procedures.

Users choose campus, applicant route, term/year and applicable major row. Fixed2026–27 events never shift into a later year. Annual rules generate clearly labeled provisional reminders. Published weekend adjustments are applied only where stated; holiday confirmation remains explicit. Missing closing times and source conflicts are not invented. Saved dates appear on the plan and existing calendar/image exports.

The UW Seattle graduation source requires a separate graduation application and email verification for each major, option or degree. Summer commencement participation may require the Spring application deadline. Bellevue source403s, WSU's interactive calendar shell and inconsistent source dates are documented.

## Remaining checklist work

| Item | Current status / remaining work |
| --- | --- |
| Every UW undergraduate major/degree option listed | Captured all bachelor headings in the reviewed current catalog indexes; current admissions availability and a student's applicable catalog year still need confirmation |
| First-person road + lantern cursor + fork confirmation | Implemented and functional DOM tests pass; real-browser visual/mobile verification remains unavailable here |
| Prerequisite-first planning for every major | Scheduler handles entered constraints; full machine-readable, verified rules are not enabled for every curriculum |
| Complete coverage of every other college major and equivalency | Incomplete; non-UW listings and verified cross-institution mappings still vary |
| Automatic dates for every college and major | Broader sourced finder implemented; some official pages are blocked/interactive and many program-specific dates remain unverified |
| Current GPA | Record-based estimate implemented; official repeat/transfer/admission GPA policies still require institutional confirmation |
| Average admitted GPA for every route/major | Selected sourced benchmarks available; universal program/cohort data not available |
| Competitive class-grade recommendations | Published minimums and personal grade-target arithmetic implemented; validated universal competitive targets not available |
| Personal college/major admission percentages | Not implemented; no representative, calibrated applicant-outcome model or dataset. Simulated grades and historical cohort rates are not personal probabilities |
| Statement/activity uploads and separate connected review | Implemented; optional Cloudflare AI backend requires deployment and live account/model/usage verification |
| Encouragement and specific criticism | Review schema/instructions implemented and fixture-tested; live model quality has not been verified in this account |
| Backup/shared requirements/dedicated-quarter checkpoint | Implemented for entered/source-backed constraints; comprehensive curricula and sharing policies still require verification |
| Production update | Not deployed; owner must deploy the new bundle to update the current workers.dev URL |

No claim is made that the entire original checklist is complete.

## Verification

Syntax checks, the unit/security/transcript suites and functional DOM suites pass. New coverage tests enforce326 active records/328 source records, campus counts, exclusion of explicitly closed entries, preserved IDs and source links. New interaction tests cover road hit targets, lantern coordinates, cursor preference, keyboard focus, reduced motion, single confirmation and cancelled navigation. Catalog/deadline tests cover exact source loading, primary/backup plan linkage, annual-vs-fixed dates and reminders on My Plan.

Cloudflare dry-run validates the build without deployment. Live Workers AI inference and real visual/mobile QA remain unverified: no Cloudflare account credentials or managed `cua_repl.js` browser-control tool are available. The Sites workflow prohibits substituting another preview/browser path in this environment.
