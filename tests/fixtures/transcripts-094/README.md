# Synthetic reader fixtures

These documents contain made-up courses and grades, public school names and no student names, identifiers or real student records. School names are plain text, not copied institutional logos. Source values are the fixture oracle, not a claim about real institutional transcript layouts.

| Fixture | Expected rows | Extracted credits | Purpose |
| --- | ---: | ---: | --- |
| uw-seattle-native.pdf | 3 | 15 quarter | Oceanography; Seattle Central and Bellevue transfer sections; UW native course |
| uw-wrapped.pdf | 1 | 5 quarter | Course code/title/credits on separate lines |
| uw-two-column.pdf | 4 | 20 quarter | Side-by-side term/course blocks |
| uw-scanned.pdf | 3 | 15 quarter | Image-only PDF, on-device OCR |
| uw-scan.png | 3 | 15 quarter | Clean image OCR |
| uw-photo.jpg / .jpeg | 3 each | 15 quarter each | Slightly rotated JPEG OCR and both extensions |
| bellevue-ctclink.txt | 1 | 5 quarter | Attempted/earned/quality-point/numeric-grade columns |
| semester-review.txt | 1 | 3 semester | Review guard: not silently imported as quarter credits |
| unknown-school.txt | 1 | 5 quarter | Manual full organization name; no issuer guessing |

`node scripts/browser-transcripts.cjs` runs the browser matrix against the public site using an isolated browser profile and synthetic data only. Requires Playwright and Chromium. `CAMINO_URL`, `CAMINO_QA_DIR` and `CHROMIUM_EXECUTABLE` can override defaults. The managed proxy's CA trust configuration may need to be supplied through the optional `CAMINO_TEST_CA_SPKI` setting. This is separate from ordinary unit/DOM tests.

No finite fixture set proves universal transcript recognition. Handwriting, severely degraded scans, international credit/grade systems, encrypted PDFs and unusual layouts require separate validation and review. Semester values remain semester values until a student explicitly reviews and supplies quarter-credit values; there is no automatic conversion policy.
