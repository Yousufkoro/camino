# Resume detailed reviews after a quota limit

Production returned `AI_QUOTA_EXCEEDED` on November 12, 2026. That blocks new model reviews and live model timing tests. Upload extraction and local writing checks continue to run on the device; a failed model request preserves the draft.

Open the [Cloudflare Workers AI dashboard](https://dash.cloudflare.com/?to=/:account/ai/workers-ai), select the account hosting Camino and check its Neuron usage and plan. Deployment uses the GitHub → Workers Builds connection; quota is managed in the Cloudflare account's usage/billing settings.

Cloudflare publishes a free allocation of 10,000 Neurons per day, resetting at 00:00 UTC. Using more than that allocation requires Workers Paid and incurs additional usage charges. The account owner can choose to wait for reset or enable the appropriate paid usage in Cloudflare. Check the current [official pricing and limits](https://developers.cloudflare.com/workers-ai/platform/pricing/) before changing the plan.

Once quota is available, test one review from the website. If it succeeds, resume the typical and near-limit draft timing checks. Stop inference tests if the quota error returns. Do not remove the reviewer Beta label solely because quota was restored; the remaining prompt, supported-device and latency gates still need verification.

Source checked: November 12, 2026.

A single synthetic typical-draft test just after the daily00:00UTC boundary (November12,2026 at4p.m. Pacific) still returned503 AI_QUOTA_EXCEEDED before inference. Further calls stopped. The daily reset alone has not yet restored access in the observed test; check actual account usage/limits rather than promising that waiting fixes it. Evidence: review40/typical-ai.json in the QA workspace. No student writing was used.
