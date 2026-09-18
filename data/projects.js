/**
 * Featured projects / case studies.
 *
 * Phase 9: populated from verified public repositories under
 * https://github.com/anjinapp-aryan (identity confirmed by both the résumé
 * and the GitHub API profile: "Anjinappa N", company "JP Morgan pvt ltd").
 *
 * Every entry below satisfies all of:
 *   - the repository is public and contains real code (verified via the
 *     GitHub API languages endpoint, not just a repo name),
 *   - every `github` and `demo` URL was requested and returned HTTP 200,
 *   - all prose is drawn from the repository's own README/architecture
 *     docs, condensed — no invented capability, no invented metrics.
 *
 * Deliberately EXCLUDED (see docs/PROJECT-AUDIT.md for the full audit):
 *   - architectiq-prod — listed on the résumé, but the repository is empty
 *     (0 files). Nothing to show.
 *   - lendtrack — listed on the résumé and has code, but its demo URL
 *     returns 404 and its README documents Copilot agent prompts rather
 *     than the product.
 *   - Aryan-Interview-Prep-App — demo URL returns 404; small codebase.
 *   - aws_simulator — superseded duplicate of aws_simulation (which is in
 *     data/labs.js).
 *   - forks (anatomy, openflowkit, awesome-llm-apps) — not original work.
 *   - three empty repositories.
 *
 * No project below states a performance number, user count, scale figure
 * or business-impact claim, because no source material documents one.
 */
const projects = [
  {
    slug: "careerpilot-ai",
    title: "CareerPilot AI",
    description:
      "Agentic AI career platform: an 8-agent LangGraph workflow behind a Spring Boot control plane, with Postgres checkpointing and a human-in-the-loop approval step.",
    categories: ["AI Engineering", "Backend"],
    technologies: [
      "LangGraph",
      "Python",
      "Spring Boot",
      "Java",
      "React",
      "TypeScript",
      "PostgreSQL",
      "pgvector",
      "Redis",
      "Gemini",
      "Docker",
    ],
    image: null,
    github: "https://github.com/anjinapp-aryan/careerpilot_ai",
    demo: "https://careerpilot-ai-wine.vercel.app",
    featured: true,
    overview:
      "A multi-tenant career platform built as an agent system rather than a single prompt: eight agents (Resume Intelligence, Job Discovery, ATS Optimization, Interview Prep, Career Strategy, Salary Intelligence, Human Approval, Application Tracking) are wired into one LangGraph state machine, fronted by a Java control plane and a React client.",
    problem:
      "Career tooling built as one large prompt is hard to test, hard to resume after a failure, and gives the user no point of control. The build treats each capability as a separate agent node so that state is checkpointed, individual steps are testable, and a human can interrupt the workflow before consequential output is accepted.",
    approach:
      "Split the system into a Python agent plane (LangGraph) and a Java/Spring Boot control plane, with every agent node calling the LLM through a single AIProvider abstraction rather than talking to a vendor SDK directly. Persist workflow state in Postgres so a run can be checkpointed and resumed, and model human approval as an explicit graph interrupt rather than an out-of-band step.",
    architecture:
      "LangGraph state machine (Python) for the 8-agent workflow with Postgres checkpointing and a human-in-the-loop interrupt · Spring Boot (Java) control plane exposing a JWT-secured REST API with RBAC and multi-tenant organization/user/subscription modelling · React + TypeScript frontend · Postgres with pgvector · Redis · S3/MinIO object storage with Apache Tika text extraction for résumé uploads.",
    implementation:
      "The current vertical slice runs end to end: multi-tenant signup, JWT login and RBAC, résumé upload to S3/MinIO with Tika extraction and persistence, job CRUD and search, application CRUD with a status pipeline, the 8-agent LangGraph workflow with checkpointing and HITL interrupt, and a dashboard aggregating career-health, résumé, ATS, match, interview and offer scores. Three agents (Resume Intelligence, Job Discovery, ATS Optimization) do real Gemini work today.",
    decisions:
      "Every agent reaches the model through the AIProvider abstraction, so no LangGraph node carries vendor-specific types. Human approval is a first-class graph node rather than a UI-level confirmation, which keeps the pause point inside the checkpointed state machine. The README tracks the build as explicitly phased, with AWS deployment (Terraform/CDK, RDS, ElastiCache, MSK, ECS Fargate), Kubernetes/Helm manifests, and production hardening documented as not-yet-built rather than implied.",
    results: null,
    lessons: null,
  },
  {
    slug: "dbpilot-ai",
    title: "DBPilot AI",
    description:
      "An AI copilot for databases — ask a question in English, get validated SQL. Built around a multi-provider LLM gateway with per-provider circuit breakers and automatic failover.",
    categories: ["AI Engineering", "Backend"],
    technologies: [
      "Python",
      "FastAPI",
      "Next.js",
      "TypeScript",
      "structlog",
      "Docker",
      "GitHub Actions",
    ],
    image: null,
    github: "https://github.com/anjinapp-aryan/DBPilot-AI",
    demo: "https://db-pilot-ai.vercel.app",
    featured: true,
    overview:
      "A text-to-SQL copilot designed as a transparent, inspectable multi-agent system rather than one opaque prompt: schema discovery, SQL generation, validation, execution and explanation are each a distinct, testable component, with a full audit trail.",
    problem:
      "Natural-language database tools usually collapse into a single prompt that emits SQL directly against production data. That makes the generated SQL impossible to validate as a discrete step, impossible to audit, and unsafe to execute. Separating the stages makes each one individually testable and reviewable before anything runs.",
    approach:
      "Build the resilience layer before the features. Every LLM call in the platform goes through one AI Gateway — no agent or route ever imports a provider SDK — so provider failure, quota exhaustion and retry policy are handled in a single place instead of being scattered across agents.",
    architecture:
      "FastAPI backend with a Next.js/TypeScript frontend. The AI Gateway sits in front of a configurable provider failover chain (DeepSeek on NVIDIA → Gemini → Groq → Qwen on NVIDIA → OpenRouter), with per-provider circuit breakers that open after repeated failures and half-open after a cooldown, retries for transient network errors, and immediate failover on quota/429 responses. Providers without a configured key and model are skipped automatically. Gateway health, provider state and call statistics are exposed as their own endpoints.",
    implementation:
      "Built today: the AI Gateway (failover, circuit breakers, retries, health/stats endpoints, chat endpoint) and the platform foundation — structured JSON logging via structlog with request/trace-ID correlation middleware, centralized exception handling behind a single JSON error envelope, a dependency-injection container that makes everything swappable in tests, a health-check subsystem, security middleware, a Docker Compose stack, and GitHub Actions CI running tests, lint, type-check and gitleaks secret scanning. The database-facing features — schema discovery, text-to-SQL, SQL safety validation, sandboxed execution, explanation mode and visualization — are specified in the architecture docs and marked as the next phases, not as shipped.",
    decisions:
      "Provider independence was treated as an architectural boundary, not a configuration detail: because nothing outside the gateway knows which model answered, adding or reordering providers is a config change. CI includes secret scanning (gitleaks) alongside tests and type-checking, so credential leaks fail the build rather than being caught in review.",
    results: null,
    lessons: null,
  },
  {
    slug: "code2shorts",
    title: "Code2Shorts",
    description:
      "Generates short-form programming videos by actually compiling, testing and executing real code, then animating the captured execution trace. The LLM plans; it never touches pixels.",
    categories: ["AI Engineering", "Developer Tooling"],
    technologies: [
      "Python",
      "Java",
      "JavaParser",
      "Manim",
      "Maven",
      "JUnit 5",
      "Pydantic",
      "FFmpeg",
      "Gemini",
      "litellm",
    ],
    image: null,
    github: "https://github.com/anjinapp-aryan/Code2Short",
    demo: null,
    featured: true,
    overview:
      "A pipeline that turns a topic such as \"Reverse String\" into a 9:16 educational video: plan a lesson, generate code, compile it, test it, execute it, capture a real execution trace, and render deterministic Manim animations from that trace — so the visuals are derived from what the code actually did, not from what a model said it would do.",
    problem:
      "An LLM asked to narrate code execution will confidently describe steps that never happened. Grounding the animation in a captured execution trace means a frame can only show state the real program actually produced, which removes the failure mode rather than prompting around it.",
    approach:
      "Keep AI output as data, never as executable code, and validate it against ground truth. Every trace-event reference an AI explanation makes is checked against the real trace — a reference to an event that does not exist fails validation and is never saved as an artifact. The visual vocabulary is a closed Pydantic-validated set, so out-of-vocabulary instructions are rejected before reaching the renderer rather than filtered afterwards.",
    architecture:
      "Topic → LessonSpec → LanguageAdapter → generated code → compile → test → execute → ExecutionTrace → AnimationSpec (a DSL) → Manim renderer → TTS/subtitles → FFmpeg → visual QA → MP4. Around that sit a workflow layer (WorkflowNode/Workflow/WorkflowRunner with retry, checkpointing and structured events), a content-addressed artifact store with lineage tracking, and a framework-neutral AI layer with schema plus semantic validation.",
    implementation:
      "Java compile/test/execute run through Maven, JDK 17 and JUnit 5 in a subprocess-isolated, timeout-bounded temp workspace per run, and were proven against deliberately broken variants (bad syntax, wrong logic, non-zero exit, timeout) to show the validator rejects bad code rather than only accepting good code. Tracing source-instruments a supported Java subset via JavaParser, with a runtime helper emitting a bounded deterministic event stream — trace limits are enforced inside the traced JVM so a runaway program terminates fast instead of waiting out the timeout. Nondeterministic APIs (threads, Random, wall-clock and env access) are rejected at instrument time rather than silently traced. The full nine-node pipeline runs end to end in integration tests with no external credentials.",
    decisions:
      "The architecture decisions are written down in the repository: LangGraph, MCP and a multi-agent architecture are documented as deliberately deferred with reasons, rather than absent by oversight. Provider specifics stay isolated — the Gemini provider is the only file that knows Gemini types, behind an unchanged LLMProvider interface. AI repair is bounded by a configurable max-attempt cap rather than retried indefinitely. A separate document sets out a seven-boundary trust model for why no AI-authored Python or shell command is ever executed.",
    results: null,
    lessons: null,
  },
  {
    slug: "anatomy-atelier",
    title: "Anatomy Atelier",
    description:
      "An interactive anatomy learning app — \"learn anatomy like an artist\". Deployed and live; MIT licensed.",
    categories: ["Frontend"],
    technologies: ["TypeScript", "CSS"],
    image: null,
    github: "https://github.com/anjinapp-aryan/human_anatomy",
    demo: "https://human-anatomy-flax.vercel.app",
    featured: false,
    overview: null,
    problem: null,
    approach: null,
    architecture: null,
    implementation: null,
    decisions: null,
    results: null,
    lessons: null,
  },
];

export default projects;
