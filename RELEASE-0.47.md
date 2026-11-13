# 0.47 — Respect manual-plan course-count preferences

A student-entered plan with three5-credit courses and a one-course-per-term preference put all three into the first term, then reported that the generated plan exceeded the preference. The generic scheduler received only the credit cap. Pass the course-count preference into scheduling and enforce it in both bounded exact search and heuristic fallback. Retain earlier-term prerequisites and the combined credit cap.

Normalize validated numeric credit strings before arithmetic and block non-finite/nonpositive/over-cap amounts. Align the fallback horizon with the existing48-term plan validation bound; courses that cannot fit remain explicitly unplaced. Existing calls without a course preference keep their prior behavior.

This fixes scheduling of student-entered courses; it does not add institutional degree requirements or transfer equivalencies for unsupported selections. Existing UWB EE rules stay separate and broad degree audits remain paused.

Verification covers one/two/three-course caps in small and larger pools, numeric credit strings, prerequisites, invalid credits,48-term bounds and the actual productBuildPlan integration. Full validation and responsive UI/export checks accompany deployment. Reviewer AI/Beta blocker remains unchanged; no inference is needed for this work.

Reproduce responsive manual-plan preference testing with scripts/browser-manual-plan.cjs. It seeds only synthetic coursework, uses the real profile form to change one to two courses per term and verifies regenerated terms and reload persistence. CAMINO_URL/CAMINO_QA_DIR/CHROMIUM_EXECUTABLE/CAMINO_TEST_CA_SPKI are optional test settings. Account API responses are isolated/mocked; no model inference or real student records are used.
