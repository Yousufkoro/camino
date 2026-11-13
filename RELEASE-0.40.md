# 0.40 — Preserve transcript issuer before transfer sources

Reproduced two document-level attribution failures: a Seattle Central transcript with Bellevue transfer coursework was detected as Bellevue, and an explicit UW Seattle heading with a UW Bothell transfer reference was detected as Bothell. The old whole-document matching gave transfer names too much priority.

Resolve issuer headings before transfer-credit sections. Preserve split generic UW/campus headings and Seattle's UW address cue. Single-line transfer headings continue to identify the original course school. Transfer-only fragments without an issuer do not borrow a transfer school's name as the document issuer. Issuer correction and row-by-row review remain available; no claim of universal transcript recognition is made.

Regression cases cover Seattle Central/Bellevue and Seattle/Bothell cross-transfer records, separate issuer/source fields and Oceanography5-credit extraction; existing OCR name, wrapping, format and credit tests remain. Full validation and live-browser parser checks accompany deployment. This change does not modify stored records automatically or submit records to institutions.

Reviewer gate update: one synthetic typical-draft test just after the daily reset still returned503 AI_QUOTA_EXCEEDED in0.2s. Further model calls stopped; no quality/latency pass is claimed. Quota recovery documentation records the new observation.
