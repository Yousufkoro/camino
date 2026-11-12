# 0.39 — Reviewer request integrity and approved scope

Record the owner's narrowed November16 target: reviewer, transcript reader, existing core-program planning, priority-pathway checkpoints and mobile/essential flows. Pause broad degree-audit expansion; preserve historical checklist items without treating them as current commitments.

The review API formerly capped JSON request bytes at70,000 while permitting30,000 essay characters plus other individually bounded fields. Valid Unicode and escaped text can exceed70KB within those field limits. Increase the bounded transport envelope to400,000 bytes to accommodate the documented fields and40 bounded coursework entries, including JSON escaping. Individual field and requirement-count limits remain enforced. This is transport validation, not a claim that the model handles all content sizes within the UI timeout.

Malformed JSON and non-object payloads now produce actionable400 errors. Requests exceeding the byte cap produce413 REVIEW_REQUEST_TOO_LARGE; rejected requests do not reach inference. Existing API failure handling preserves writing. No server storage is added.

Validation uses mocked inference for valid Unicode and worst-case escaped field envelopes, asserts no inference for malformed/oversize inputs, and runs full regression checks. The known exhausted AI quota window had not reset, so no production model call was attempted. Real quality and latency gates remain unfinished; Beta remains.
