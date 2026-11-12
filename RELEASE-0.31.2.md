# 0.31.2 — Keep checked questions and actions consistent

The0.31.1 production tests distinguished an implied ethical idea from an explicit ethical choice, participation from leadership, complete engineering preparation from unsupported criticism, and a missing observed outcome from a direct partial answer. They also exposed one presentation mismatch: the original coach's action still suggested an expected outcome while the checked feedback correctly requested an actual observation.

For retained or optional revisions, the checked question is now the canonical action. The interface renders it once instead of showing a competing older action. Saved-version reads and JSON exports align existing actions to their saved checked question without changing the draft or mutating stored records on read. Uncertain suggestions keep their uncertainty treatment. The loading message sets an expectation of about a minute based on the observed42–71second production checks; it is not a response-time guarantee.

Validation: observed-versus-expected action regression, optional-action alignment, no duplicate question display, immutable legacy normalization, full regression suite and final saved/lifecycle/session checks. Desktop1440/mobile390/430 actual download/restore checks pass. Post-deployment findings are in deployment state.

Beta remains while remaining broader prompt, supported-file/device and latency quality work is completed. Popular core programs follow reviewer completion. No admission probabilities or calibrated success claims were added.
