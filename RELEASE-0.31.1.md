# 0.31.1 — Use a separate reasoning checker and conservative fallback

Production0.31 still incorrectly labeled the business ethics implication direct. A new enum and stronger instructions on the same model did not resolve that semantic error;0.31's local contract tests did not establish live classification accuracy.

The drafting model remains unchanged. The focused secondary check now uses Cloudflare-hosted Qwen3.8-27B with medium reasoning, supported structured-output parameters and explicit no-store. Only the final content is parsed; private reasoning fields are ignored. Truncated, unavailable, malformed, duplicate or missing secondary assessments leave affected requirements uncertain rather than retaining an earlier confirmed assessment. The same disclosed Cloudflare Workers AI provider and consented fields are used; coursework remains excluded from the secondary pass.

Model/request/output documentation was checked November12,2026 at https://developers.cloudflare.com/workers-ai/models/qwen3.8-27b/ . No semantic correctness is inferred from model branding. The original failed and positive-control cases must be rerun on production. The synthetic partial-answer corpus also includes an explicit observed-outcome prompt, since a generic outcome prompt can ambiguously accept an in-progress status.

Validation: provider response variants, reasoning exclusion, truncated/missing/malformed/failure fallback, strict schema request, affected-requirement downgrade and full regressions. Live results are recorded in deployment state. Beta remains pending those results and broader prompt/file/device checks.
