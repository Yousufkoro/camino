# 0.41 — Prefer explicit numeric credit-column labels

A reproduced row labelled Attempted/Earned/Grade with values4/1/4 was incorrectly treated as4 credits at grade1 with4 grade points because arithmetic inference ran first. Prefer the explicit attempted/earned/grade order when those labels are present and no grade-points column is named. Preserve attempted credits separately from earned credits. A5/0/0 failed row now retains5 attempted credits and0 earned credits rather than labelling5 as earned.

Ordinary Credits/Grade/Points and Credits/Points/Grade arithmetic interpretation remains covered. Tests span UW Seattle, UW Bothell, Bellevue and Seattle Central, two explicit header vocabularies, partial/full/zero-earned rows and conventional grade-point columns. This does not establish every transcript layout; unsupported or ambiguous values still require review. Saved student records are not rewritten automatically.

Validation: targeted credit/origin/format tests, full regression checks and browser review-field/confirmation checks at desktop/mobile sizes before and after deployment. No model inference required. Reviewer Beta and account-side AI quota blocker remain separate outstanding items.
