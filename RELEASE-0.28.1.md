# 0.28.1 — Remove forced criticism

Live synthetic quality checks of0.28 found that a coherent care/work essay still attracted generic requests for more detail. The review schema and coach previously required at least one improvement, encouraging a criticism quota.

The reviewer now permits zero improvements when no specific, defensible revision is needed. Its instructions require acknowledging content already present, naming the actual unresolved question, and explaining how the change helps the exact prompt. Optional enrichment must not be presented as a missing requirement. Numerical impact is not demanded for personal, care or work experiences. Empty revision results receive a clear UI explanation; malformed nonempty results still fail validation.

Validation covers empty versus malformed revision arrays and the empty-result UI, plus the full regression suite. This change removes a structural pressure to manufacture criticism; it does not prove that every AI interpretation is correct. Beta remains while broader semantic, prompt and file/device coverage is unfinished. Production checks and their concrete findings are recorded in deployment state.
