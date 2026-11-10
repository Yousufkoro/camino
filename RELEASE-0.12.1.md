# Camino0.12.1 — foundation course scheduling

An elective continuation could take the place of a spring-only foundation and push that foundation from term1 to term4. The combined-degree scheduler now ranks documented foundations and their direct continuations before ordinary electives, then dependency chains, sequence urgency and critical-path depth. Urgency uses the latest completed prerequisite rather than the first one encountered.

The UWB EE subset preserves explicit foundation metadata for its grouped math, physics, writing and programming preparation. Prerequisites still need earlier terms; co-requisite bundles, published/entered offerings and credit/course limits remain enforced. The heuristic does not guarantee globally minimum graduation time, and missing academic requirements remain missing. Some course sequences can still have gaps due to competing foundations, offerings or workload.

Validation: regression reproduces the former year-long delay, then checks next-spring placement; CS/physics chains, earlier-term prerequisites, lab pairing, workload and blocked cycles. Full validation and the UWB preset DOM check pass. Desktop/mobile Chromium combined-degree workflows verify the foundation at term1 and the elective continuation at term2 with no horizontal overflow or page errors. Essay & Application Review remains (Beta).
