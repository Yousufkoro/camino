# 0.51.1 — Do not ask for a result explicitly unavailable in the draft

Live0.51 correctly handled first-time versus returning applicants and preserved the3of4 answered parts in the missing-outcome sample. Its advice still asked what happened after implementation although the quoted draft explicitly said no observed result exists yet.

Extend the observed-result guard to that precise case: an evidence-verified essay quote explicitly denying an observed result, paired with result advice for a prompt asking for observed/actual results. Explain the existing absence and offer truthful alternatives: describe a genuine observed result if available or choose another example. Do not invent outcomes or ask as though implementation already happened. Negative claims without a verified essay quote do not trigger this absence-based branch. Broader accuracy remains under review; Beta stays.
