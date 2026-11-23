# 0.59 — Retain reviewed transcript corrections

Confirming/changing a document's issuing school reparsed its source and silently replaced corrected credits, grades, terms, course fields and transfer origins. Unchanged rescans also discarded those edits. A full-app regression reproduced corrected5credits reverting to1before the fix.

Track explicit review-field edits in the unconfirmed import only. Reapply them to matching source lines and original terms within that same document, preserving occurrence order when unambiguous. New issuer defaults still fill unedited fields. An explicit change from transfer to campus credit keeps the original-school field cleared. Capture text/number edits as they are typed, not only on blur. Review metadata is not included in saved course records.

Rescans keep edits on unambiguously matching unchanged lines. Changed lines and ambiguous duplicate occurrences are parsed again rather than receiving another row's corrections, with a visible notice when prior corrections could not be safely reapplied. Changed extracted text resets the document's quarter-unit acknowledgement. Raw extraction diagnostics retain parsed source values, separate from reviewed overrides. No automatic semester conversion or attempted/earned-credit inference is added.

Tests cover save/reopen, school and rescan changes, text input before blur, original institutions, exclusion choices, cross-document/term/duplicate boundaries, changed lines and source diagnostics. Native TXT/PDF browser checks and full regression validation are required before/after deployment. This is a correction-preservation fix, not a guarantee that every transcript format is recognized.
