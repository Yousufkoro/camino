# 0.54 — Keep the plan viewer open while exploring quarters

Clicking Climb to next quarter, Previous step or a quarter button redrew the roadmap and reset its expanded quarter-plan details panel to closed. The URL remained on the roadmap, but the disappearing viewer made navigation look like a different page.

Preserve the open quarter-plan panel and scroll position through plan exploration redraws. Quarter controls keep focus on the selected landing and retain the existing stair animation. Milestone inspection uses the same preservation step. Quarter buttons explicitly have type=button and cancel default navigation/submission. Browsing quarters does not change coursework, school choices or completion records.

A full-app DOM regression reproduced the closed-panel failure before the fix. It now covers repeated next/previous actions, direct quarter selection, unchanged route and saved data, selected landing/focus and milestone inspection. Full validation precedes deployment; production desktop/mobile browser checks follow. Essay/application reviewer stays(Beta), with optional-versus-required refinement classification still pending.
