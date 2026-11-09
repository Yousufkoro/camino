# Camino 0.9.3 — transcript-first setup and reliable school provenance

Selecting a major and target school now opens **Next, add your transcripts** immediately. Reviewed imports continue directly to My Plan. A student can explicitly skip or continue with previously entered coursework; choosing a major no longer silently marks academic history complete.

School recognition now handles spaced Bellevue lettering, common logo/OCR glyph substitutions, and the full **University of Washington Bothell** heading. A generic UW header is preserved instead of being overwritten by Bellevue's name in a transfer table. School links outside the PDF header are no longer treated as issuer evidence. A body-text school suggestion cannot suppress a still-needed image-header OCR pass.

The parser recognizes transfer headings without a colon, source colleges named in the heading, source-college quarter headings, native coursework sections and UW program/campus boundaries. Course review now shows **Recorded by**, **Course origin** and **Originally earned at** separately. Bellevue credits on a UW transcript retain their UW equivalent codes and the UW recording institution, with Bellevue retained as the original school. Origin metadata survives confirmation; distinct transfer/native observations are not silently collapsed during import review.

Each document has an editable issuing-school selector. Unverified issuer suggestions require confirmation, and transfer rows require an original school before saving. Student corrections are explicit; the app does not guess the issuer from a filename, city address or target college.

Verification:

- Full regression suite passed; focused parser, import-performance and journey/import integration tests cover the reported failure modes.
- Real Chromium uploaded two synthetic PDFs together: Bellevue with an image-only school logo (actual OCR) and a mixed UWB transcript. All three rows had the correct issuer/origin; the shared calculus record counted once after reconciliation, leaving 10 earned credits. Desktop and phone screenshots were inspected; the phone page did not overflow.
- Parser fixtures include `BE11EVUE C0LLEGE`, spaced lettering, generic UW headers, colon-free transfer headings, source-quarter retention and native UW section boundaries.

Evidence: `docs/qa/transcript-0.9.3-staged.json`; browser artifacts in `/workspace/work/qa/transcript093/`. Only synthetic coursework was used; no real student's transcripts were copied into the repository.

Existing saved courses are not automatically re-extracted or reclassified: original document text is not retained in saved workspaces. Review the corrected school/origin fields when importing again. Unusual layouts and unreadable scans can still need manual review.
