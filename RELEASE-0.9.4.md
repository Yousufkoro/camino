# Camino 0.9.4 — transcript fidelity, evidence-led review and phone layouts

## 1. Transcript reader

The reported UW Seattle/Oceanography failure is covered by synthetic regression cases. Wrapped code/title/credit lines are reassembled. Three numeric columns are interpreted using credit × grade = quality-point arithmetic; the existing four-column attempted/earned/quality-point layouts retain priority. Unresolved values stay reviewable rather than receiving guessed credits.

Seattle Central College's historical Community College/Comm Coll/CC names resolve to the same source school. UW recording institutions remain distinct from Bellevue and Seattle Central transfer origins. Generic issuer names are suggested conservatively, with a custom full-name control for schools outside the dropdown. Side-by-side PDF columns are separated when repeated course positions support that layout; a column without a term must be reviewed rather than inheriting an unrelated term.

Each file now shows an extraction report: course-like lines, parsed credit sum, missing credits, credit-system warnings and printed totals. Suspicious totals or multiple course codes on one extracted line trigger review notes. Semester values are not automatically treated as quarter credits; conversion/quarter values require explicit student review.

Attempted and earned credits are retained separately. A failed class with zero earned credit still carries its attempted-credit weight in the record-based GPA estimate. Linked original-college grades remain in that college's GPA group, not the destination university's transfer-credit GPA.

## 2. Essay/application review (Beta)

The writing tool appears before secondary GPA/admission panels, with direct section controls. Students can supply application context and exact requirements. Local feedback cites actual action/reflection sentences, catches exact repeated sentences, reports word counts and avoids pressuring students to fill a maximum word allowance.

Optional AI review receives the supplied context and requirement notes as unverified input. Matched quotes are labelled by source; unmatched or insufficient evidence is downgraded and marked for checking. Up to eight prompt-coverage items are supported. Legitimate quantitative achievements such as a 20% reduction are allowed while admissions probabilities remain prohibited. Changed drafts flag old feedback; feedback can be downloaded. Extra context is saved only with the explicit local-draft action and cleared with that draft.

This is writing feedback, not an application certification, an official policy audit or a calibrated admissions prediction. Quotes matching the draft do not establish that an AI interpretation is correct.

## 3. Mobile interaction and original art

Transcript review becomes editable vertical course cards on phone widths. Credits, term, recorded school and original school are available without sideways table navigation. The writing workspace has section-jump controls, live word counts and stale-feedback indicators. Original bookshelf/staircase workbench SVG art adds subtle motion and honors reduced-motion settings; document controls use a vector upload icon.

## Verification and boundaries

- Unit matrix: 26 institution/credit/wrapping combinations plus mixed UW/Seattle Central/Bellevue sources, two-column PDF extraction, missing-credit/unknown-unit guards and GPA regressions.
- Real Chromium: native, wrapped, two-column and scanned PDFs, PNG, rotated JPG, ctcLink TXT, semester guard and unknown-school correction. The same JPEG bytes are retained under the .jpeg extension for the production matrix. All fixtures are synthetic; no real student records are in source.
- Browser checks exercise context/requirements, local quoted feedback, repeat detection, explicit draft saving/restoration, phone screenshots and no horizontal page overflow. The full unit/DOM/build suite passes before publication; final CI and production checks accompany deployment.
- Reusable fixture oracle: `tests/fixtures/transcripts-094/README.md`. Browser runner: `scripts/browser-transcripts.cjs`. Initial staged evidence: `docs/qa/transcript-0.9.4-staged.json`.

No finite test suite establishes perfection across every institution, layout or document quality. The friend's exact PDF was not supplied, so its precise failure cannot be reproduced or certified fixed. Degraded scans, handwriting, encryption and international credit/grade systems need separate validation. Physical iOS/Android devices, Safari and Firefox remain untested; phone-width Chromium is the verified mobile environment. Existing saved imports are not silently rewritten from documents that Camino does not retain.
