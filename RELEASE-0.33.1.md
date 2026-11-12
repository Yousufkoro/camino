# 0.33.1 — Prevent partial PDF imports and late overwrites

A mixed PDF with one readable page and one image-only/blank page previously imported only the readable page without explaining the omission. The reader now rejects a document when any page has no extractable text, identifies that page and offers removal of blank pages or a text/OCR copy. This prevents silently dropping entire non-text pages. Images or handwriting inside otherwise readable pages still require the user's comparison with the original; the upload label supports text PDFs.

Persistent accessible status messages explain local loading, success and recovery while preserving prior writing. Selecting a newer file wins, and typing/restoring different text while a file is reading also prevents that late result from replacing the current text. Resetting the draft clears upload status. PDF reading-order guidance remains visible after success.

Validation:15 synthetic fixtures plus dynamic size/format cases;22 statement checks per desktop1440/mobile390 run, activities limits, mixed/blank-page identification, last-file and edit-during-read races, clear/reset, no automatic writing save or AI transmission, and simulated quota-to-local-checks flow. Full regression validation passes. The fixture generator and source-span/encoding/cleanup tests are retained for repeatability.

Production-origin upload checks follow deployment without calling model inference. Production AI still returns AI_QUOTA_EXCEEDED, so typical and near-limit timing remain unverified and the reviewer stays(Beta). The account owner can wait for the documented00:00UTC free-allocation reset or review paid usage options in docs/AI-QUOTA.md.
