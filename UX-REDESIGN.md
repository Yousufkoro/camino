# Camino 0.3 — simpler decisions, richer motion

## The short version

The basic flow is now Discover → Choose → Plan. The existing palette, Manrope/DM Sans typography, bookshelf-cube logo and stairway concept are preserved. Academic rules, source records and workspace formats were not replaced.

No production deployment was performed for this redesign. Neither the public workers.dev site nor the existing private Sites production URL was updated.

## What was simplified

- Header: Explore, My Plan, Account. The bookshelf logo still returns home. The existing accessible mobile menu remains.
- Homepage: “Your future starts here.”, the requested short description, one main Find My Direction button, a secondary How It Works link, three short steps, an illustrative results preview and a final CTA. Removed long institution lists and five separate student-story explanations from the default landing page.
- Discover: one 12-question starting choice. Resume appears when a draft exists. The 32-question mode and assessment/storage explanation sit inside expandable sections.
- Choose: exactly three visual recommendations after a completed quiz, brief descriptions and example careers. Selecting a card enables one Build My Plan action. Mobile keeps that action visible at the bottom. Education, institutions, evidence, save/replace, earlier results and comparisons are optional expanded content.
- No pre-quiz personalized results are fabricated. Direct visits to Choose without results lead back to the quiz. The Explore preview is explicitly illustrative without completed answers.
- Setup: two visible choices—current stage and direction. A target college is optional. Detailed workload, institution, calendar, term and goal controls remain under More planning preferences.
- My Plan: one next-action card and four interactive milestones—You’re here, Your next classes, Apply to your major, Your goal. Next courses can reveal school choices and prerequisites. Quarter schedules, progress views and academic tools are collapsed initially.
- College research: simple search, readable location/calendar cards and a shortlist comparison. The detailed comparison table is optional.

## What visual work was added

The homepage’s original SVG illustration starts at a bookshelf junction and branches toward Build, Understand and Create. It uses the current lavender, aqua, pink and warm accent tones. Focus, touch or pointer interaction highlights a branch and updates an always-accessible caption. No stock artwork or new rendering library was added.

Recommendations are represented as dimensional books with field-specific line icons. The current staircase identity remains in the expanded quarter explorer. Secondary screens share the same three-step rail and restrained hierarchy.

## Motion implemented

- SVG branching-path drawing on entry.
- Restrained gradient lighting and brief path-marker movement.
- Pointer depth on the hero, with touch-safe click/focus equivalents.
- Scroll entry reveals for the three-step story and preview, using IntersectionObserver when available; content remains visible without it.
- Short answer-card selection feedback before advancing, with a guard against double answers or hidden answers after navigation.
- Directional question transitions and a journey progress trail.
- Staggered recommendation entrance, book/card hover and selection lighting.
- Timeline connector drawing on route entry and focused milestone-content transitions.
- Entry effects do not replay simply because a recommendation or milestone is selected.
- System reduced-motion and the existing user motion toggle are respected. No new animation dependencies or continuous JavaScript rendering loop were introduced.

## Preserved advanced functionality

These are available within Plan’s expandable tools or their existing routes:

- Full quarterly/semester manual schedules and source-aware UWB EE planning.
- Independent school selections for courses with supported alternatives.
- Manual term moves and deterministic prerequisite/co-requisite/season/workload validation.
- Transcript import, local OCR, mandatory review and manual academic records.
- Completed, failed, repeated and explicitly removed course history.
- Transfer mappings, official source links and verification limits.
- Source-checked degree coverage disclosures and course-readiness warnings.
- Milestones, calendar downloads, projects/internships and saved scenarios.
- PNG and JSON export, local backup/restore, prior quiz results and account-save recovery.

No workspace migration was required. No saved student data, credentials or production records were changed. Existing routes remain available. Selecting a milestone explores a plan; it does not mark courses complete.

## Testing and limits

Executed: authored JavaScript syntax checks, the existing regression/security suites, the original jsdom product journey, new four-persona jsdom journeys, build/asset versioning, ZIP integrity validation and Wrangler deployment dry-run.

The new persona test covers a ninth grader, a senior, a Running Start student and a university student. It verifies quiz → three recommendations → choice → short setup → next action, hidden advanced tools, preserved completed courses, accessible branch buttons, system reduced motion and navigation during feedback. This is functional DOM testing, not research with real students.

Real desktop/mobile rendering, touch on a physical phone, screen-reader checks and a five-second comprehension study remain unverified. The managed Sites browser-control tool is unavailable in this session. No claim of visual-browser, WCAG or real-user usability certification is made.

Previously documented academic and service limits remain: standalone accounts/cloud sync and background notifications are not configured, institutional degree coverage remains limited, future offerings/dates need confirmation, and semester manual planning does not infer quarter-credit conversion. See AUDIT.md for the prior reliability/security work.

## Files

- `dist/journey-ui.js`: simplified screens, signature SVG, personalized next steps and motion/event adapter around existing product functions.
- `dist/journey.css`: scoped layout, progressive disclosure, responsive/mobile action bar and motion styles; no palette variable or logo changes.
- `dist/app.js`, `dist/index.html`: connect the journey layer and minimal navigation.
- `tests/journey-dom.test.cjs`: new functional persona/motion/navigation coverage.
- `scripts/dom-test.cjs`: runs both DOM suites.

## Deployment

The release is not deployed. Review it locally, back up your existing workspace, preserve the Worker name in `wrangler.jsonc`, and deploy only when you choose to publish. Read HOSTING.md. The existing production download URL still serves the previous release until a deployment is explicitly approved.
