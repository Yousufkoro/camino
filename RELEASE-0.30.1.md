# 0.30.1 — Explain matched evidence when model feedback is blank

Live0.30 tests confirmed that whole-draft reassessment recognizes the complete engineering response and preserves activity-versus-essay distinctions. They also exposed contradictory fallback text: a source-matched requirement with no model explanation said no supported assessment was returned.

Blank or whitespace-only explanation text now produces a source-specific message: essay text was located, activity context needs checking in the essay, or no supported coverage assessment was returned. This does not change inferred coverage or treat a quote as proof of quality.

Validation: essay/activity blank-explanation regressions, requirement evidence boundaries, revision-screening tests and syntax checks. Full regression/deployment checks run in CI.0.30's four production cases completed in roughly18–29seconds each, and live1440/390/430 saved-display/download/restore checks passed. Beta remains; the business case still needs better handling of weakly implied ethical content, alongside broader prompt and file/device quality checks.
