# Camino 0.7 — source-based course planning and transfer evidence

This release expands the working planning tools. It does not certify all academic requirements or predict individual admission outcomes.

## Delivered

- All 326 active UW bachelor credential/option records from the reviewed catalog remain available, with full source text. The source reader now starts a reviewed course-draft workflow.
- 187 WSU undergraduate major/option schedules, including full published narratives, term rows and footnotes. Campus availability must be confirmed; the General Catalog is not a per-campus availability guarantee.
- 12,646 exact-campus UW/WSU course records in 451 subject shards. Course metadata loads when needed. Formal prerequisites retain alternatives, scoped concurrent permission and numeric minimum grades. Unknown rules, placement and variable credits require review; unresolved categories and policies remain attached to the saved goal.
- Imported source drafts connect to primary, backup and concurrent goals. The existing shared-course allocator and dedicated-quarter checkpoint apply to entered constraints. Prerequisite minimum grades can require a retake when an earned grade is too low. Published offering seasons are retained where available.
- Searchable 3,936 transfer-guide statements with original combined-course wording, effective terms, historical rows, campus restrictions and official links. A term-range check is informational; the browser never awards credits or equates a Seattle course to another UW campus automatically.
- All 29 published Cascadia 2026–27 credential pages in a full-text source reader, linked to the associate/multiple-degree editor.
- 41 exact-year WSU calendar events added to the existing deadline finder. Fixed dates never shift to another year.
- Responsive controls, the existing first-person lantern/fork quiz, staircase branding, reduced-motion support, plan image/calendar exports, GPA arithmetic and separate writing-review workspace are retained.
- GitHub validation and Cloudflare Workers Builds automatically deploy tested pushes to the existing Worker.

## Verification

Syntax, unit/security/transcript tests and functional DOM tests cover real Informatics source review, lazy subject loading, acknowledgement before import, saved-workspace validation, compound transfer conditions, effective terms, course counts/identities and Cascadia source reading. These are functional tests, not real-browser rendering tests.

## Remaining evidence and access limits

- Institution-approved audits for every curriculum require validated elective/distribution, residency, sharing, catalog-year, admission and exception rules. A student-reviewed source draft is not such an audit.
- Non-UW college listings, transfer routes and program-specific deadlines are not exhaustive. Missing records do not establish that a program or transfer is unavailable.
- Universal admitted GPA/competitive class-grade evidence is not publicly available. Personal grade targets are arithmetic, not proven admission thresholds.
- No representative, calibrated applicant-outcome dataset has been supplied for personal admission percentages. Running simulations without that evidence would not produce accurate probabilities. The site reports readiness and writing feedback without fabricated odds.
- Live production GET requests now succeed. A synthetic Python AI-review POST received Cloudflare error 1010; curl reached the review endpoint but received a review failure on 2026-11-09. Safe stage/account/quota/model diagnostic codes now distinguish failure types; live inference/model quality remains unverified. No real student's writing was submitted in this check.
- The managed browser-control tool is unavailable. Real visual/mobile QA remains unverified; the applicable Sites workflow prohibits substituting another browser path.
