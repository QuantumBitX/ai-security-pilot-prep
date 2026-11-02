/* 5.1 · Section 5: configuration management, automated model updates and configuration drift tracking */
module.exports = {
  title: 'Configuration management, automated updates and drift tracking', covers: [5],
  blocks: [
    { type: 'video', title: 'Keeping AI configuration under control', kicker: 'Module 5.1 · Video 5 of 5', scenes: [
      { t: 'title', kicker: 'Module 5.1 · AI SecOps foundations', title: 'Keeping AI configuration under control', sub: 'Configuration management, automated updates and drift', icon: 'sliders',
        say: 'An AI system’s behaviour depends on much more than its code: the model version, its prompts, its guardrail settings, its retrieval index and its tools. Change any of them, and behaviour changes. | This video covers configuration management for AI, automated model updates, and tracking configuration drift.' },
      { t: 'layers', title: 'What counts as AI configuration',
        layers: [
          { icon: 'model', label: 'Model version and parameters', sub: 'Pinned version, temperature, output limits', k: 'model' },
          { icon: 'text', label: 'Prompts and templates', sub: 'System prompts, few-shot examples', k: 'data' },
          { icon: 'shield', label: 'Guardrail policies', sub: 'Filters, thresholds, allow-lists', k: 'control' },
          { icon: 'database', label: 'Retrieval settings', sub: 'Index, embedding model, sources, filters', k: 'human' },
          { icon: 'tool', label: 'Tools and permissions', sub: 'Agent tools, scopes, MCP servers', k: 'threat' },
          { icon: 'server', label: 'Infrastructure', sub: 'Images, scaling, network rules', k: 'neutral' } ],
        say: 'Six layers of configuration shape an AI system’s behaviour. | The model version and its parameters, such as temperature and output limits. | Prompts and templates, including system prompts and examples. | Guardrail policies: filters, thresholds and allow-lists. | Retrieval settings: which index, which embedding model, which sources and filters. | Tools and permissions: which tools agents can call, with which scopes, through which servers. | And the infrastructure underneath: images, scaling and network rules. All of them belong under configuration management.' },
      { t: 'flow', title: 'Configuration as code, with drift detection',
        nodes: [
          { id: 'git', x: 220, y: 330, icon: 'branch', label: 'Desired state', sub: 'versioned, reviewed', k: 'data', w: 290 },
          { id: 'pipe', x: 680, y: 330, icon: 'pipeline', label: 'Pipeline applies', sub: 'tested and signed', k: 'control', w: 300 },
          { id: 'run', x: 1150, y: 330, icon: 'server', label: 'Running system', sub: 'actual state', k: 'neutral', w: 280 },
          { id: 'det', x: 1150, y: 690, icon: 'search', label: 'Drift detector', sub: 'compares actual to desired', k: 'threat', w: 330 },
          { id: 'fix', x: 680, y: 690, icon: 'rollback', label: 'Alert or revert', sub: 'by risk', k: 'human', w: 280 },
          { id: 'rec', x: 220, y: 690, icon: 'audit', label: 'Change record', sub: 'who, what, why', k: 'model', w: 280 } ],
        edges: [{ from: 'git', to: 'pipe', k: 'data' }, { from: 'pipe', to: 'run', k: 'control' }, { from: 'run', to: 'det', k: 'neutral' }, { from: 'det', to: 'fix', k: 'threat' }, { from: 'fix', to: 'rec', k: 'human' }],
        steps: [
          { show: 'git', hi: 'git' },
          { show: 'pipe git-pipe', flow: 'git-pipe', hi: 'pipe' },
          { show: 'run pipe-run', flow: 'pipe-run', hi: 'run' },
          { show: 'det run-det', flow: 'run-det', hi: 'det', mark: { det: 'alert' } },
          { show: 'fix det-fix', flow: 'det-fix', hi: 'fix' },
          { show: 'rec fix-rec', flow: 'fix-rec', hi: 'rec', mark: { rec: 'ok' } } ],
        say: 'The strongest pattern is configuration as code. The desired state of every configuration item lives in version control, where changes are reviewed. | A pipeline applies approved changes, after tests, and records exactly what was deployed. | The running system holds the actual state. | A drift detector continually compares the actual state with the desired state: model versions, prompt hashes, guardrail settings, tool permissions and infrastructure. | When they differ, it alerts, or for high-risk items reverts automatically. | And every change, approved or not, ends up in a change record showing who changed what, and why.' },
      { t: 'compare', title: 'Automated model updates', labels: ['Trigger', 'Testing', 'Approval', 'Rollback'],
        cols: [{ h: 'Unmanaged', icon: 'alert', k: 'threat' }, { h: 'Managed', icon: 'shieldcheck', k: 'control' }],
        rows: [
          ['Alias moves; retraining self-deploys', 'Pinned versions; retraining makes a candidate'],
          ['None before users see it', 'Evaluation suites gate release'],
          ['Implicit', 'Risk-based and recorded'],
          ['Unclear what to return to', 'Previous version ready'] ],
        say: 'Automated model updates save effort, but only if they are managed. | Unmanaged, a provider moves an alias to a new model, or a retraining pipeline deploys its own output. Managed, versions are pinned, and retraining produces a candidate rather than a release. | Unmanaged, users are the first testers. Managed, evaluation suites gate every release. | Unmanaged, approval is implicit. Managed, approval is proportionate to risk and recorded. | And unmanaged, nobody is sure what to roll back to. Managed, the previous version is always ready.' },
      { t: 'bullets', title: 'Configuration drift to watch for', layout: 'grid', cols: 2, items: [
          { icon: 'text', h: 'Prompt edited in a console', d: 'Outside change control', k: 'data' },
          { icon: 'sliders', h: 'Guardrail loosened', d: 'Threshold quietly raised', k: 'threat' },
          { icon: 'tool', h: 'New tool on an agent', d: 'Scope widened without approval', k: 'human' },
          { icon: 'cloud', h: 'Provider alias moved', d: 'Model changed underneath you', k: 'model' },
          { icon: 'database', h: 'Index rebuilt', d: 'New sources, new embedding model', k: 'neutral' },
          { icon: 'server', h: 'Manual infrastructure change', d: 'Network or scaling edited by hand', k: 'control' } ],
        say: 'Six kinds of configuration drift are common in AI systems. | A prompt edited directly in a console, outside change control. | A guardrail threshold quietly loosened to reduce complaints. | A new tool added to an agent, widening its scope without approval. | A provider alias moved, so the model changed underneath you. | A retrieval index rebuilt with new sources or a new embedding model. | And infrastructure changed by hand, such as a network rule opened for testing and never closed.' },
      { t: 'summary', items: ['Treat models, prompts, guardrails, retrieval, tools and infra as configuration', 'Desired state in version control, applied by pipelines', 'Detect drift continuously; alert or revert by risk', 'Automated updates: pinned, gated, approved, reversible'],
        say: 'To recap. | Treat model versions, prompts, guardrails, retrieval settings, tools and infrastructure as configuration. | Keep the desired state in version control, and apply it only through pipelines. | Detect drift continuously, alerting or reverting according to risk. | And make automated model updates pinned, gated by evaluation, approved and reversible.' } ] },
    { type: 'text', md: `### Configuration management for AI
Security-focused configuration management (described in NIST SP 800-128, and in ISO/IEC 27001 Annex A 8.9) means: identifying **configuration items**, setting **approved baselines**, controlling **changes**, **monitoring** for deviations, and **auditing**. For AI, configuration items include:
- **Model:** provider and pinned version, or registry version and hash; generation parameters.
- **Prompts:** system prompts, templates and examples, versioned and hashed.
- **Guardrails:** classifier versions, thresholds, policies, allow-lists and block-lists.
- **Retrieval:** index version, embedding model, data sources, chunking, filters and top-k settings.
- **Agents:** tools, scopes, MCP servers, budgets and approval rules.
- **Infrastructure:** container images, serving configuration, autoscaling, network and IAM policies.

### Configuration drift
Drift is any difference between the approved baseline and what is actually running. Detect it with:
- **Configuration-as-code reconciliation** (GitOps controllers that compare and restore desired state).
- **Hashes** of prompts, guardrail policies and tool definitions, checked at runtime.
- **Version checks** on models and indexes, including **behavioural canaries**: a fixed set of test prompts run on a schedule to detect hosted-model changes (Module 3.6).
- **Cloud and IaC drift detection** for infrastructure and permissions.

Don’t confuse **configuration drift** (the system was changed) with **model or data drift** (the world changed, Module 1.3). Both matter, and both need monitoring, but they have different causes and fixes.

### Automated model updates
- **Hosted models:** pin dated versions; track deprecation notices; test new versions in shadow or canary before switching (Module 3.5).
- **Continuous training pipelines:** retraining may run automatically, but its output is a **candidate** that must pass evaluation gates and, for higher-risk models, human approval before release.
- **Guardrail and classifier updates** are changes too: test them for false positives and negatives before rollout.
- **Dependencies:** patch serving stacks and libraries through the same pipeline (Module 5.4).
- Keep the **previous version deployable** for rollback, and record every update in the registry.` },
    { type: 'match', title: 'Configuration drift or model drift?', pairs: [
      ['Someone raised the toxicity filter threshold in the console', 'Configuration drift'],
      ['Customer language has shifted since a new product launch', 'Data or model drift'],
      ['The provider moved the “latest” alias to a new model', 'Configuration drift (unpinned dependency)'],
      ['Fraud patterns have changed, and precision is falling', 'Concept drift'],
      ['A developer added a file-deletion tool to an agent', 'Configuration drift'] ] },
    { type: 'callout', kind: 'exam', title: 'Configuration questions', md: `Look for **desired state in version control**, **changes only through pipelines**, **continuous drift detection** and **pinned, gated updates**. If a question describes behaviour changing "with no code change", suspect configuration drift: a prompt, guardrail, index, tool or provider version changed.` },
    { type: 'check', q: { q: 'An assistant’s answers suddenly become less accurate and less safe. No code was deployed, but investigation shows its system prompt was edited in the provider’s console last week. Which control would MOST likely have detected this quickly?', o: ['A quarterly review of all the assistant’s prompts by the product team and its manager', 'Prompts held as code, with runtime hash checks and alerts on drift from the approved version', 'A larger evaluation suite, run once before the assistant’s original launch last year', 'Annual training for all staff on why prompts must never be edited directly in provider consoles'], a: 1, b: 5,
      why: 'Treating prompts as configuration items, with hashes compared continuously against the approved baseline, flags unapproved edits within minutes. Quarterly reviews, one-off launch tests and training don’t detect a change when it happens.' } }
  ]
};
