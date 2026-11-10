# Camino production deployment

Production: https://camino-your-direction.yourdirection.workers.dev/#home

GitHub repository: https://github.com/Yousufkoro/camino

Cloudflare Worker: `camino-your-direction`. Pushes to `main` are built through the existing Cloudflare Workers Builds connection. The workers.dev account subdomain is now `yourdirection`; no new Worker or separate manual deployment is required.

Verified: release 0.10.0, public homepage, standalone account endpoint, and enabled application-review endpoint. The URL-only update does not include unfinished Pathfinder or admissions-model changes.
