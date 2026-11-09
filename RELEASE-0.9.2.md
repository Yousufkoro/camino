# Camino 0.9.2 — data reset and live-browser audit

Inspected the public workers.dev deployment on November 9, 2026, in real headless Chromium, at 1440×1000 and 390×844. WebGL used ANGLE/SwiftShader software rendering; this establishes actual scene rendering, not physical-device frame-rate performance.

## Verified

- Fifty route/viewport combinations: home, Explore, My Plan, application review, Account, discovery, profile, history, degrees, UW majors, program and college directories, salaries, transfer guides, catalog drafts, source library, Bellevue/Seattle catalog readers, college sources, applications, careers, scenarios, sources, privacy and example plan. No uncaught page/console errors or HTTP responses of 400+ were observed in that traversal.
- All four physical 3D signs have visible native answer text. Captured idle frames and a decision transition; a click advanced the question. The forest rendered birds, branches and atmospheric life. Real screenshots were inspected, including the phone layout.
- A synthetic student completed all 12 quiz answers, selected a direction and created a UWB EE planning draft. The setup contains 953 catalog records plus the uncertainty/broad-interest options.
- Changed a course's school and verified persistence. Downloaded an actual PNG plan and visually inspected its layout.
- Salary selectors expose 51 jurisdictions and 829 occupations. Selecting Washington electrical engineers displays the sourced May 2025 annual mean of $136,970.
- Uploaded a synthetic TXT essay, generated local writing feedback, saved it and restored it after reload. A separate synthetic request to the real AI endpoint returned HTTP 200 and structured writing feedback. No real student's data was used.

## Issues fixed

- Desktop 3D answer text was too small after perspective projection. Font size now accounts for actual projected width.
- Four physical signboards are too narrow for comfortable phone reading. Added four readable 16px phone answer buttons linked to those same paths; physical signs remain visible.
- Data & coverage overflowed the phone viewport. Its long link now wraps and its table scrolls within the page.
- The expanded plan nested a second H1; its embedded heading is now H2.
- Added **Delete all my data / start fresh** in Account and **Delete all my data** in Privacy. It asks for confirmation, deletes the signed-in workspace when applicable, removes all Camino-prefixed local/session storage, aborts pending essay/OCR work, clears document/import/quiz/plan state and reloads to release page memory. Other open tabs receive a wipe event and reload. Cancellation and failed cloud deletion preserve local records.

Deletion cannot remove downloaded backups, copies on other devices, identity-provider accounts or information already processed by external services. The standalone workers.dev deployment has no account sync backend; signed-in deletion was exercised with a simulated backend failure/success contract, not a real user's account.

## Limits and remaining work

This is a bounded functional/visual audit, not proof that every possible input or device works. Safari, Firefox, physical Android/iPhone GPUs, assistive-technology sessions and hardware performance still need testing. Snapshot academic sources are not automatically current; complete per-major requirement models, exhaustive equivalencies/deadlines and program-level admitted-GPA evidence remain incomplete. Personal admission percentages remain unavailable without a calibrated representative outcome dataset. AI feedback remains Beta.

Evidence: `docs/qa/live-browser-0.9.1.json`, `docs/qa/functional-0.9.1.json`; additional screenshots and staged/live fix checks retained in `/workspace/work/qa/live091/`. Full regression checks and a live retest of the final fixes accompany publication.
