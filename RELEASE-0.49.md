# 0.49 — Allow measured review duration and identify incomplete checks

Fresh production synthetic tests on November21 restored actual model access: a complete98-word response was fully checked4/4 in85.2s; a draft explicitly lacking an observed outcome was correctly partial3/4, preserving problem/action/lesson, in132.5s. A29,496-character/5,194-word stress draft returned in138.6s but its secondary requirement assessment was incomplete. No quota retry loop or real applicant data was used.

The old90-second browser timeout would have discarded two returned reviews. Bound the client wait at180 seconds and give accurate waiting/cancel guidance. Existing cancellation, navigation/stale-result protection and draft preservation remain. This is measured headroom, not a promise that every provider request finishes within180s.

When a secondary assessment is incomplete, show a clear banner explaining that coverage remains unknown, label unavailable part assessments and retain the available feedback. Do not equate a provider's incomplete check with missing essay content. Keep already assessed parts visible. Legacy saved results without explicit incomplete metadata keep their existing presentation.

Validation includes a scaled139-second response that survives the former90-second deadline, the180-second bound, incomplete labels, existing timeout/cancel/consent/draft lifecycle checks and full regression validation. Production model samples and browser rendering checks are separate evidence; no universal model accuracy is claimed. Reviewer stays(Beta): the near-limit secondary check did not complete, and additional conditional/choice quality work remains.

A short combined choice/conditional sample also returned incomplete secondary checks in132.2s. Preserve Beta and add bounded diagnostic categories (output-limit, absent final output, invalid JSON, missing parts, provider/quota unavailability) to distinguish the cause without exposing raw errors, input text or private reasoning. Incomplete conditional checks no longer claim the group was fully checked. This is diagnosis and honest presentation; no verifier-model change or quality pass for these samples is claimed.

scripts/reviewer-live-check.cjs is a synthetic-only, one-case probe with an explicit CAMINO_RUN_LIVE_AI=1 gate; it is not run by ordinary CI. CAMINO_REVIEW_CASE selects complete/missing-outcome/choice-conditional/near-limit. It records actual results and diagnostic status without automatically retrying failures or treating HTTP200 as a quality pass.
