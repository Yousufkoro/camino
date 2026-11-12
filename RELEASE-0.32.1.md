# 0.32.1 — Consistent parent identifiers in part feedback

Part feedback now carries its actual parent requirement index rather than the local zero used by the single-part evidence helper. The part index stays local to that parent. This corrects exported metadata for reviews containing multiple requirements; scoring and inference are unchanged.

Validation: multi-parent identity regression, part aggregation and requirement reassessment tests, syntax and full CI checks.0.32 production controls passed: identical incomplete drafts both returned partial2/3; the completed counterexample returned addressed3/3; implied ethics remained uncredited; a choice prompt accepted one appropriate topic. Live1440/390/430 part display/download/restore and a fresh mobile390 actual AI review passed. The production controls took about40–70seconds.

Beta remains pending remaining complex-source prompt, supported-file/device and latency gates. Synthetic production artifacts and the next concrete checks are recorded in deployment state.
