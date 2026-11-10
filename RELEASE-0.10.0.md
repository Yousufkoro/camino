# Camino 0.10.0 — Essay & Application Review release

The current navigation and page heading are **Essay & Application Review**, with the Beta mark removed. This release completes the supplied-prompt writing workflow and a student-controlled application-preparation workspace. It does not claim infallible AI judgment, official eligibility certification or calibrated admission odds.

## Release functionality

- Exact prompt, application context, up to 12 requirement notes, word maximum, essay and activities/resume inputs.
- TXT and text-PDF reading with paragraph-gap preservation; invalid documents preserve the existing draft and show a recoverable error. Scanned statements need pasted text or a text-based PDF.
- Local word/paragraph, repetition, action and reflection checks; no automatic essay transmission.
- Explicit-consent AI review with requirement IDs, relevant text quotes and source labels. Every supplied requirement receives a row. Unsupported assessments are labelled for review; activity evidence does not automatically establish essay coverage.
- Quote-grounded proposed revisions are separate from collapsed unverified suggestions. Students can mark revisions as reviewed without implying institutional approval.
- Explicitly saved reviewed versions, capped at five, with saved-feedback reading/download, draft restore without sending, stale-draft protection and individual deletion. Version deletion preserves unsaved current writing.
- An eight-item application checklist with student-entered official-source notes, explicit local saving and checked-by-you counts. It covers eligibility, courses, deadlines, prompts, factual claims, supporting documents, essay and submission review. The actual institution's instructions remain authoritative.
- Full local review-data deletion removes the draft, saved versions and checklist notes. The global data wipe covers those keys as well. These records are not silently synced into academic workspaces or exported with course backups.
- Request timeout, cancellation, duplicate-send protection, service-error recovery, input validation and preserved drafts.
- Section navigation and responsive controls for the writing workspace, application checklist and saved versions.

## Verification

- Unit tests cover requirement IDs, duplicate/missing/unsupported assessments, prompt-as-evidence rejection, activity-vs-essay coverage, PDF paragraph extraction and existing outcome/word-limit guards.
- DOM tests cover versions, revision tracking, source notes, deletion, unsaved-draft preservation, consent, service errors, timeouts, cancellation and retry controls.
- Real Chromium staged checks cover PDF upload, rejected invalid PDF, no request before consent, two requirement rows, review controls, saved feedback downloads, stale-version rejection, restore without sending, checklist reload persistence, all-review deletion and 390/430px layouts without horizontal overflow.
- The complete regression/build suite and final GitHub validation accompany publication. The public deployment is then tested against the actual AI endpoint using synthetic writing only.

Evidence: `docs/qa/reviewer-0.10.0-staged.json`; retained browser artifacts under `/workspace/work/qa/reviewer-release/`. The PDF fixture contains synthetic writing and no student information.

## Scope

The release is for application organization and writing feedback. A text match is not proof of relevance, quality, authenticity or eligibility. Application checklist counts reflect the student's own checks. Institutional requirements and admissions evidence elsewhere in Camino retain their published coverage limitations. Unsupported document types, physical-device/cross-browser testing and complete institutional-data research are separate from this software release.
