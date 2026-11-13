# 0.48 — Keep the previous workspace when local persistence fails

Backup restore assigned the replacement workspace/mode before saving. When localStorage threw, the UI reported an error but the replacement remained active in memory. Validate and normalize a staged copy, confirm replacement, and roll back active state/mode if the local save fails. A canceled, invalid or failed restore clears the file control so the same file can be selected again. A late old file read or a file control disconnected by navigation cannot overwrite the newer/current workspace; stale errors are ignored.

Manual course moves now roll back the plan and its change history when the local save fails, redraw the previous plan and report that it was kept. Successful adjustments retain existing prerequisite/workload validation. These guarantees concern synchronous local persistence; this does not certify remote account-sync transactions.

Durable DOM regressions cover failed-restore active/disk/mode preservation, latest-file wins and failed manual-move rollback. Reproducible scripts/browser-workspace-recovery.cjs checks real backup download, exclusion of separate essay drafts, cancel/retry same physical file, injected storage failure, successful restore of provider/checkpoint/workload/manual terms, failed move recovery and reload persistence at1440/390/320. It uses isolated synthetic records and mocked standalone account APIs, not real student data or model inference.

Full regression validation and live checks accompany deployment. Reviewer AI quota/Beta gates and physical-device/Safari limits remain separate outstanding items; broad degree audits stay paused.
