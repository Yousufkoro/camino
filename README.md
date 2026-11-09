# Current release: Camino 0.6

The simplified flow is Discover → Choose → Plan. Start with RELEASE-0.6.md, CHECKLIST.md and HOSTING.md; MULTI-DEGREE.md and UX-REDESIGN.md describe earlier releases. The portable bundle is configured for standalone workers.dev and local browser storage. The Sites account implementation described below is a separate deployment. This redesign is unpublished.

# Camino

Washington-first planning application with ChatGPT sign-in and account-scoped saved workspaces.

## Build and deploy

`python scripts/build-worker.py` embeds the maintained static frontend assets in the Cloudflare Worker at `dist/server/index.js`. The compact English OCR language model is bundled and served directly by the Site; no student document data is forwarded. Deploy the server output and `.openai/hosting.json` through Sites. The logical R2 binding `BUCKET` stores each account's versioned JSON workspace. This format is a document workspace rather than a relational degree database; no database migration or request-time schema DDL is required.

## Identity and persistence

Sites dispatch owns ChatGPT sign-in/sign-out and injects trusted user headers. The server derives storage keys only from the authenticated user ID. All workspace reads and writes require identity, and writes also require a same-origin request with an application header. Optimistic ETag conditions prevent stale writes from replacing another device's data. Account deletion and export are available. Original transcripts and extracted raw text are never persisted. Guests use local browser storage; copying an existing guest workspace into an account is explicit.

## Student flow

Academic history → Goals → Your plan. New visitors start with multi-file transcript import or can explicitly continue without transcripts. Plans show one clear term-by-term route, workload options, and a contextual credit-evidence guide. No account is required for exploratory discovery.

## Credit handling

Reviewed imports consolidate repeated course records. Two source-checked Bellevue → UW Seattle course-credit equivalencies enable cross-number consolidation: MATH& 151 → MATH 124 and MATH& 152 → MATH 125. Destination course records are retained while original records become linked source history. Credit counts once, and code aliases prevent re-planning the same coursework. Source term, campus and passing/completion conditions must match; unknown mappings remain separate. No major applicability or GPA conversion is inferred. Repeated original attempts are retained as provenance, not additional earned credit.

## Scheduling

A prerequisite graph and credit caps determine eligibility. Up to 14 remaining courses use bounded breadth-first subset search for the minimum number of terms; larger or complex plans use a critical-path heuristic. The chosen method is displayed. Completed and mapped coursework is excluded. Missing prerequisites and cycles block affected courses. No full institutional degree catalog or future offering database is enabled, so an efficient draft optimizes entered remaining coursework, not a guaranteed degree completion date.

## Documents and libraries

Multiple PDFs, JPG/PNG scans and TXT files are processed locally using self-hosted PDF.js 3.11.174 and Tesseract.js 5.1.1. Apache-2.0 notices are in `dist/vendor`. Review and explicit confirmation are mandatory. Up to 15 files, 20 MB each and 30 PDF pages; English OCR. Unreadable fields remain blank. Only quarter-credit coursework is supported.

## Validation

Account API tests cover unauthenticated rejection, owner isolation, same-origin checks, optimistic concurrency, creation and deletion. Credit tests cover both upload orders, campus/date/grade safeguards, provenance, repeated courses and alias satisfaction. Scheduling tests cover exact bin packing, prerequisite chains, missing rules and cycles. Importer tests cover PDF extraction, image OCR and the confirmation gate. Route and syntax checks pass. Browser QA is limited because the required managed cua_repl tool is unavailable.

## Evidence

https://admit.washington.edu/apply/transfer/equivalency-guide/bellevue/ — checked 2026-11-08. These are course-credit mappings, not reviewed major requirements.

## UW transcript parsing fixes

PDF text is reconstructed from page coordinates, rather than drawing order. The parser supports multi-part subjects (B CORE, B EDUC, POL S), elective buckets (1XX), UW campus headings, separate transfer sources, grade-only zero-credit rows and /R repeat exclusions. Failed/withdrawn/no-credit and superseded attempts are removed automatically from active selection; a collapsed audit section preserves the reason. Distinct elective-credit buckets remain separate. Corrected import rows store parser version and a stable row key to avoid duplicate re-imports. Existing saved failures are removed from the active view.

Run `node tests/transcripts.test.cjs`. Regression fixtures are synthetic; user-uploaded transcripts are not committed. The supplied UW document was additionally checked locally against its reported 62 transfer and 10 campus credits.

## Automatic header recognition and credit columns

The importer independently reads the first-page header; image-only school logos are locally OCR-processed even when course-table text is available. Institution selectors have been removed. Text extraction normalizes adjacent numeric PDF columns and separates attempted units, earned units, grade points and both letter/numeric grades. Older imported rows are repaired only when retained original columns and grade-point arithmetic establish the correct credit value. Authored assets use content hashes and no-store headers to avoid mixing importer versions.

A synthetic PDF with a raster-only Bellevue College header and a text course table was tested end-to-end through PDF rendering, local OCR, institution recognition and course extraction. Joined 5.000/5.000/18.500 and numeric-grade 19.000 columns each resolve to 5 credits. The actual Bellevue PDF was not supplied; the screenshot formats were covered by regression fixtures.

## Import performance

Native PDF text extraction runs first across the whole batch, with OCR fully lazy. Course previews appear before image-only headers finish. A pooled worker reuses its engine for 90 seconds and caches public trained-data bytes (not transcripts) where browser storage allows. The bundled tessdata_fast English model is 1,967,599 bytes, replacing the 10,923,060-byte download. SIMD is selected automatically when supported. Header rasters are limited to 1200 px wide and the top 24% of the page; scanned pages are bounded at 1700 px. Jobs have deadlines and cancellation clears the worker and pending deadlines immediately.

Local validation: the supplied UW PDF completed in approximately 120 ms with zero OCR calls and retained 16 valid entries / 72 credits. A synthetic raster-only Bellevue header required approximately 180 ms core initialization and 100 ms recognition, with correct school and credit extraction. These execution-environment measurements exclude browser network download time and do not guarantee device-specific timings. Run `node tests/import-performance.test.cjs` and `node tests/ocr-runtime.test.cjs`.

Model source: https://github.com/tesseract-ocr/tessdata_fast (English LSTM model; Apache-2.0). Original documents and extracted text are never put in the model cache.

## Institution recognition validation

Header OCR explicitly uses sparse-text segmentation, with normal page mode restored for body scans. Metadata and unique official-domain annotations are checked first, without OCR. Known OCR glyph substitutions are limited to a header; generic PeopleSoft report filenames never establish institution identity. An unresolved header gets one contrast-enhanced retry under a shared 12-second budget. Successful header image hashes are cached only in session memory and cleared on workspace deletion.

The full startImport flow was validated with a synthetic PDF whose college name exists only as a raster logo: Bellevue College was recognized, applied to all rows, and the 5-credit course remained correct, in approximately 527 ms locally. The supplied UW document remained 16 valid entries / 72 credits with no OCR in approximately 119 ms. The original Bellevue PDF was not supplied and its exact header remains unverified.

## UWB EE roadmap and concurrent enrollment

The supported UWB Electrical Engineering pathway now derives remaining foundation, writing and core requirements automatically from the official current curriculum and catalogs. It removes completed requirements, keeps minimum-grade checks separate from earned credit, schedules mutual co-requisites together, honors capstone seasons, compares eight valid sequencing strategies and lets students choose three supported EE electives. This is a foundation/core roadmap, not a complete 180-credit degree audit: general education, residency, catalog-year exceptions, source-college prerequisites and lab waivers still require review.

UWB students can select Bellevue alternatives per course or prefer published Bellevue options globally. Workload caps apply jointly across providers. The Bellevue Java sequence is kept together; unverified single-course mixing remains blocked or flagged. Primary institution selection never removes community-college alternatives.

Credit reconciliation uses explicit source-institution transfer records, attendance windows, published mappings and matching grades. Proven equivalent records combine once; different courses that satisfy the same requirement stay separate. Generic awarded transfer buckets remain in an evidence ledger rather than duplicating the original source classes. Partial source histories retain unmatched earned transfer credit, and later source coursework outside the transfer window adds normally. Raw source provenance is retained and reconciliation is idempotent. Existing saved workspaces receive a versioned, optimistic-concurrency-protected normalization when loaded.

Official sources:
- https://www.uwb.edu/stem/undergraduate/majors/electrical/curriculum
- https://www.uwb.edu/stem/undergraduate/majors/electrical/admissions
- https://www.uwb.edu/stem/undergraduate/resources/stem-transfer-courses
- https://www.uwb.edu/registrar/policies/community-college-course-equivalency-guide/bellevue-college
- https://www.washington.edu/students/crscatb/stmath.html
- https://www.washington.edu/students/crscatb/bphys.html
- https://www.washington.edu/students/crscatb/bee.html
- https://www.washington.edu/students/crscatb/css.html
- https://www.washington.edu/students/crscatb/cssskl.html
- https://www.washington.edu/students/crscatb/bengr.html

Validation: `tests/academic-pathway.test.cjs` covers duplicate, partial, later and split credits, stable normalization, distinct same-category courses, nonempty automatic planning, prerequisites/co-requisites, workload caps and provider changes. `tests/plan-view.test.cjs` covers the visible completed-course list, generated roadmap and community-college controls. The supplied UW PDF still reads as 16 valid entries and 72 credits; combining it with synthetic matching source-college rows preserves 72 credits and generates 26 remaining core/foundation course entries. No student PDF or personal transcript fixture is committed.

## Bellevue physics local numbering

Bellevue uses PHYS 121, 122 and 123 (6 quarter credits each), as listed in the official full UW equivalency guide adopted by the UWB Registrar. Each maps to the respective PHYS 121/122/123 (5 credits) plus one elective credit. UWB catalog declares B PHYS 121/122/123 equivalent to PHYS 121/122/123. UWB EE requires B PHYS 121 Mechanics at 2.3 for major admission and 2.0 for the foundation requirement. These Bellevue local numbers now fulfill the corresponding foundation requirements and are the displayed Bellevue provider choices. CCN PHYS& 221/222/223 numbers offered elsewhere are not advertised as Bellevue offerings.

## Standalone Cloudflare Workers deployment

The independent deployment uses `wrangler.jsonc` and `worker/standalone.mjs`, with native static asset delivery (including OCR files), no ChatGPT authentication, and no account API. Workspaces stay in browser local storage. On the original site, use Privacy & data → Export my data; on workers.dev use My account → Restore to move a workspace. Origins do not share browser storage. Export a backup before clearing browser data.

After authenticating your own Cloudflare account, run `npx wrangler deploy` in this checkout. The returned workers.dev URL is the standalone site. No R2 binding is needed. The Sites Worker continues to use its existing account API; do not deploy that Worker directly to workers.dev because its trusted identity headers require Sites dispatch.

The interactive map traces prerequisite ancestors and descendants; cards explain scheduling decisions. What-if presets rebuild from completed coursework and workload/summer constraints. Physics and programming default to verified Bellevue options, with sequence continuity ranked before total terms. PNG export draws an independent three-column layout without transcript records or UI controls.

## Stairway identity
The course explorer uses quarter landings and an animated stair climb, with a bookshelf-cube identity. School selectors are available both on each landing and in the detailed route. Individual programming provider changes are retained; mixed-school programming equivalency triggers an advisor-review warning rather than silently changing a second class. Exploring a quarter never marks coursework complete.
