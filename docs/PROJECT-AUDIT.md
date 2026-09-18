# Project Audit — Phase 9

All 21 public repositories under `https://github.com/anjinapp-aryan` were enumerated via the GitHub API and triaged. For candidates, the actual README, commit authorship and language-byte breakdown were inspected — not search-result snippets. Every URL that ended up published was requested and returned HTTP 200 (except LinkedIn, which answers automated requests with 999 by policy).

## Published — PORTFOLIO (`data/projects.js`)

| Project | Repository | Demo | Evidence | Why selected |
|---|---|---|---|---|
| CareerPilot AI | `careerpilot_ai` | `careerpilot-ai-wine.vercel.app` — 200, titled "CareerPilot AI" | Java 6.4 MB, TypeScript 1.1 MB, Python 306 KB, Shell, Dockerfile. README documents an 8-agent LangGraph workflow, Spring Boot control plane, Postgres checkpointing, HITL interrupt | Largest real codebase, working demo, and the clearest overlap between the professional profile (Java/Spring) and the AI work |
| DBPilot AI | `DBPilot-AI` | `db-pilot-ai.vercel.app` — 200, titled "DBPilot AI — Your AI Copilot for Databases" | Python 126 KB, TypeScript 100 KB. MIT licensed. README documents the AI Gateway (multi-provider failover, circuit breakers), structlog tracing, DI container, CI with gitleaks. CI badges present | Working demo, MIT licensed, and the README is unusually honest about what is built vs planned — good engineering signal |
| Code2Shorts | `Code2Short` | none | Python 778 KB, Java 56 KB. README documents a 4-phase build, an execution-trace-grounded pipeline, a closed Pydantic visual vocabulary, and a seven-boundary trust model. Separate `ARCHITECTURE_DECISIONS.md` and `SECURITY_SANDBOX.md` | Strongest demonstration of engineering *thinking* in the whole account — deliberate deferrals are written down with reasons |
| Anatomy Atelier | `human_anatomy` | `human-anatomy-flax.vercel.app` — 200, titled "Anatomy Atelier — Learn anatomy like an artist" | TypeScript 126 KB, CSS 40 KB. MIT licensed | Real, deployed, working app. **Caveat:** its README is still the unmodified `vinext-starter` boilerplate, so no case study was written for it — the card carries only title, stack and links, and its detail page renders no narrative sections |

## Published — LAB (`data/labs.js`)

Presented explicitly as labs, not production work.

| Lab | Repository | Evidence | Note |
|---|---|---|---|
| Kafka Learning Lab | `kafka_simulation` | Java 60 KB, Shell, Dockerfile. Eight commits authored by `anjinapp-aryan` in Sept 2026 covering Phases 1–10 (offsets/delivery semantics, consumer failure & rebalancing, producer reliability, consumer lag, replication & broker failure, transactions/EOS/saga) | **Attribution matters here.** The repository's earlier history (Jan 2025 – Mar 2026) is authored by `suhailgupta`, and the base README describes *their* Kafka playground and Docker Hub image. The user's original contribution is the phase experiments layered on top. The published description says so explicitly rather than implying the whole repo is original work |
| AWS Local Simulation Lab | `aws_simulation` | Python 117 KB, Shell 97 KB, Java 66 KB, HCL 8.8 KB, Dockerfile. README documents Ministack + Terraform, a Spring Boot connectivity harness, a serverless task API, and an SNS→SQS(+DLQ)→DynamoDB/S3 event pipeline implemented twice for comparison | Framed as a local simulation lab, which is what the README itself calls it ("AWS Interview Prep — Local Simulation") |

## Rejected

| Repository | Category | Reason |
|---|---|---|
| `architectiq-prod` | **NOT PUBLISHABLE** | Listed on the résumé with a GitHub link, but the repository contains **0 files**. The code is not public. Publishing it would send visitors to an empty page. **Conflict flagged for the user** — either the code lives elsewhere, or the résumé link should be removed |
| `lendtrack` | EXPERIMENT | On the résumé and has real code (TypeScript, 6 MB), but its demo URL `lendtrack-teal.vercel.app` returns **404**, and its README documents Copilot agent prompts rather than the product. Nothing publishable without a working demo or a product README |
| `Tunora` | EXPERIMENT / design phase | The AI music project. **Zero bytes of code** in any language per the GitHub languages API — what exists is 21 design documents (architecture principles, reuse/licence/cost audits, MVP scope, phase decisions) plus a submodule pointing at the third-party `ace-step/ACE-Step-1.5` model. No README. Real design work, but sending a visitor to a repository with no implementation weakens credibility. Add once implementation starts |
| `aws_simulator` | SUPERSEDED | Identical README to `aws_simulation` but smaller (45 KB vs 691 KB) and older. Duplicate |
| `Aryan-Interview-Prep-App` | EXPERIMENT | Demo URL returns **404**; 96 KB codebase; basic README |
| `architect-job-agent`, `aryan-jip-assistant`, `Aryan_Interview_guide_app`, `aryan-strikerate-t20` | EXPERIMENT | Small (7–96 KB), no demos, minimal documentation |
| `legends_de_sporting`, `legends-de-football-academy`, `architectiq-prod` | NOT RELEVANT | **Empty** — 0 files each |
| `anatomy`, `openflowkit`, `awesome-llm-apps` | REFERENCE | Forks of other people's projects. Not original work, so not presented as such |
| `Anjinappa-Portfolio` | N/A | This site itself |

## Link verification

Every external URL rendered on the homepage was requested:

```
200  https://careerpilot-ai-wine.vercel.app
200  https://db-pilot-ai.vercel.app
200  https://human-anatomy-flax.vercel.app
200  https://github.com/anjinapp-aryan
200  https://github.com/anjinapp-aryan/careerpilot_ai
200  https://github.com/anjinapp-aryan/DBPilot-AI
200  https://github.com/anjinapp-aryan/Code2Short
200  https://github.com/anjinapp-aryan/human_anatomy
200  https://github.com/anjinapp-aryan/kafka_simulation
200  https://github.com/anjinapp-aryan/aws_simulation
200  https://www.youtube.com/@AskAIwithAryan
999  https://www.linkedin.com/in/anjinappan/   (LinkedIn anti-bot response, user-confirmed URL)
```

No dead link is published. The two dead demo URLs found during the audit (`lendtrack-teal`, `aryan-interview-prep-app`) are the reason those two repositories were rejected.

## Metrics

**No metric is published anywhere on this site.** No source material — résumé, README or repository — documents a latency, throughput, uptime, user-count, scale or cost figure. Every case study therefore leaves `results` null rather than estimating one.
