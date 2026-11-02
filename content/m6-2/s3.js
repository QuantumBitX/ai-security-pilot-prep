/* 6.2 · Section 3: AI-specific change management (model, dataset, retrieval versioning) */
module.exports = {
  title: 'AI-specific change management', covers: [3],
  blocks: [
    { type: 'video', title: 'Every change that changes behaviour', kicker: 'Module 6.2 · Video 3 of 4', scenes: [
      { t: 'title', kicker: 'Module 6.2 · Secure AI lifecycle', title: 'Every change that changes behaviour', sub: 'Versioning models, datasets and retrieval', icon: 'branch',
        say: 'In traditional systems, behaviour changes when code changes. In AI systems, behaviour also changes when data, prompts, retrieval sources or a provider’s model change, often with no code change at all. | This video covers AI-specific change management, built on versioning models, datasets and retrieval.' },
      { t: 'bullets', title: 'What counts as a change', layout: 'grid', cols: 2, items: [
          { icon: 'model', h: 'Model version', d: 'New weights, fine-tune or provider version', k: 'model' },
          { icon: 'database', h: 'Dataset version', d: 'Training or evaluation data', k: 'data' },
          { icon: 'book', h: 'Retrieval sources', d: 'Index, sources, embedding model', k: 'human' },
          { icon: 'text', h: 'Prompts', d: 'System prompts and templates', k: 'neutral' },
          { icon: 'shield', h: 'Guardrails', d: 'Policies, thresholds, classifiers', k: 'control' },
          { icon: 'tool', h: 'Tools and permissions', d: 'New tools, scopes, autonomy', k: 'threat' } ],
        say: 'Six kinds of change alter an AI system’s behaviour, and all of them need change management. | A new model version: new weights, a fine-tune, or a different provider version. | A new dataset version, for training or for evaluation. | Changes to retrieval: the index, its sources or its embedding model. | Changes to prompts and templates. | Changes to guardrails: policies, thresholds or classifiers. | And changes to tools and permissions: new tools, wider scopes or more autonomy.' },
      { t: 'code', title: 'A versioned release bundle', file: 'release-manifest.yaml',
        code: `release: support-assistant 2026.11.2
model: support-llm v3.4  sha256:5c1e...
dataset: tickets-ft v12  sha256:a91b...
prompt: system v27  (reviewed: PR 1142)
index: kb-2026-11-01  embed: e5-v2
guardrails: policy v9  injection>0.85
tools: crm.read, ticket.update
evals: safety 99.2% / quality 91.4%
approved: model owner, security`,
        hl: [null, [1, 1], [2, 4], [5, 7], [8, 8], [9, 9]],
        notes: [{ h: 'One manifest per release', d: 'Every behaviour-changing component, pinned and hashed.' }, { h: 'The release', d: 'A single identifier for the whole combination.', k: 'neutral' }, { h: 'Model, data and prompt', d: 'Exact versions and hashes, with review references.', k: 'model' }, { h: 'Retrieval, guardrails, tools', d: 'Index snapshot, embedding model, policy and tool scopes.', k: 'data' }, { h: 'Evidence', d: 'Evaluation results that justify the release.', k: 'control' }, { h: 'Approval', d: 'Who approved, in line with the risk tier.', k: 'human' }],
        say: 'The core tool of AI change management is the release manifest: one record that pins every behaviour-changing component. | It gives the whole combination a single release identifier. | It pins the model, the fine-tuning dataset and the system prompt to exact versions, with hashes and review references. | It records the retrieval index snapshot and embedding model, the guardrail policy and thresholds, and the tools the agent may use. | It includes the evaluation results that justify the release. | And it records who approved it. With this, you can reproduce, compare and roll back any release as a unit.' },
      { t: 'compare', title: 'Change classes for AI', labels: ['Example', 'Approval', 'Testing'],
        cols: [{ h: 'Standard', icon: 'check', k: 'control' }, { h: 'Normal', icon: 'list', k: 'human' }, { h: 'Emergency', icon: 'siren', k: 'threat' }],
        rows: [
          ['Index refresh, approved sources', 'New model or new tool', 'Disable a harmful tool'],
          ['Pre-approved pattern', 'Risk-based sign-off', 'On-call authority'],
          ['Automated checks', 'Full evaluation suites', 'Review afterwards'] ],
        say: 'Classify AI changes so effort matches risk. | A standard change follows a pre-approved pattern, such as a scheduled index refresh from approved sources. A normal change, such as a new model or a new tool, needs its own approval. An emergency change, such as disabling a harmful tool, has to happen fast. | Standard changes are pre-approved. Normal changes get risk-based sign-off. Emergency changes use pre-agreed on-call authority. | Standard changes pass automated checks. Normal changes run full evaluation suites. And emergency changes are reviewed afterwards, as Module 5.1 described.' },
      { t: 'flow', title: 'A normal AI change',
        nodes: [
          { id: 'req', x: 230, y: 330, icon: 'doc', label: 'Request', sub: 'what, why, risk tier', k: 'neutral', w: 290 },
          { id: 'imp', x: 700, y: 330, icon: 'search', label: 'Impact analysis', sub: 'behaviour, data, users', k: 'data', w: 310 },
          { id: 'test', x: 1200, y: 330, icon: 'check', label: 'Evaluate', sub: 'compare with current', k: 'control', w: 290 },
          { id: 'app', x: 1200, y: 690, icon: 'pen', label: 'Approve', sub: 'by risk tier', k: 'human', w: 280 },
          { id: 'rel', x: 700, y: 690, icon: 'branch', label: 'Release', sub: 'staged, manifest', k: 'model', w: 280 },
          { id: 'doc', x: 230, y: 690, icon: 'book', label: 'Record', sub: 'registry, model card', k: 'threat', w: 300 } ],
        edges: [{ from: 'req', to: 'imp', k: 'neutral' }, { from: 'imp', to: 'test', k: 'data' }, { from: 'test', to: 'app', k: 'control' }, { from: 'app', to: 'rel', k: 'human' }, { from: 'rel', to: 'doc', k: 'model' }],
        steps: [
          { show: 'req', hi: 'req' },
          { show: 'imp req-imp', flow: 'req-imp', hi: 'imp' },
          { show: 'test imp-test', flow: 'imp-test', hi: 'test' },
          { show: 'app test-app', flow: 'test-app', hi: 'app', mark: { app: 'ok' } },
          { show: 'rel app-rel', flow: 'app-rel', hi: 'rel' },
          { show: 'doc rel-doc', flow: 'rel-doc', hi: 'doc' } ],
        say: 'A normal AI change follows six steps. A request states what will change, why, and the system’s risk tier. | Impact analysis considers behaviour, data, users and any regulatory implications, such as a substantial modification to a high-risk system. | The candidate is evaluated against the current version, on the same suites, so differences are visible. | Approval follows the risk tier. | The release goes out in stages, with its manifest. | And the registry, model card and change log are updated, so anyone can see what changed, when and why.' },
      { t: 'summary', items: ['Models, data, retrieval, prompts, guardrails and tools are all changes', 'Pin every component in a versioned release manifest', 'Standard, normal and emergency classes match effort to risk', 'Compare with the current version; approve by risk; record'],
        say: 'To recap. | Treat changes to models, data, retrieval, prompts, guardrails and tools as changes. | Pin every behaviour-changing component in a versioned release manifest. | Use standard, normal and emergency change classes, so effort matches risk. | And evaluate each candidate against the current version, approve according to risk, and record everything.' } ] },
    { type: 'text', md: `### Versioning everything that changes behaviour
| Component | How to version | Why it matters |
|---|---|---|
| **Models** | Registry versions with hashes and signatures; pinned provider versions (Module 3.5) | Reproduce, compare and roll back behaviour |
| **Datasets** | Immutable, content-hashed versions with manifests (Module 3.3) | Trace models to their data; investigate poisoning |
| **Retrieval** | Index snapshots, source lists and embedding model versions | Restore clean indexes; explain answers |
| **Prompts** | Templates in version control, reviewed like code | Explain and reverse behaviour changes |
| **Guardrails** | Policies and thresholds as configuration code (Module 5.1) | Prevent silent loosening |
| **Tools and agents** | Tool definitions, scopes and autonomy settings in configuration | Control agency changes (Module 4.6) |
| **Evaluations** | Versioned test suites and results | Compare releases fairly over time |

### Change management practices
- **A release manifest** pins all of the above for each release, so the combination can be reproduced, compared and rolled back as a unit.
- **Change classes:** standard (pre-approved, low-risk patterns), normal (assessed and approved by risk tier) and emergency (fast, with review afterwards).
- **Impact analysis:** expected behaviour change, data and privacy impact, affected users, and regulatory implications. Under the EU AI Act, a **substantial modification** to a high-risk system can trigger a new conformity assessment.
- **Comparative evaluation:** run the candidate and the current version on the same suites, including safety, security, fairness and quality, and review the differences (Module 5.6).
- **Provider-driven change:** treat provider model updates and retirements as changes too; pin versions and test replacements before switching (Module 5.1).
- **Records:** update the registry, model card, AIBOM and change log; link the change to its request, approvals and evidence (ISO/IEC 27001 Annex A 8.32 covers change management).` },
    { type: 'steps', title: 'Assessing a provider model upgrade', items: [
      ['Raise the change', 'Record the current and proposed model versions, the reason (for example, a scheduled retirement) and the system’s risk tier.'],
      ['Analyse impact', 'Identify affected prompts, output formats, guardrails, downstream parsers and regulatory obligations.'],
      ['Evaluate side by side', 'Run safety, security, quality and fairness suites on both versions with the same prompts and data, and compare.'],
      ['Adjust and re-test', 'Tune prompts or guardrails where behaviour changed, and re-run the suites.'],
      ['Approve and stage', 'Approve by risk tier, update the release manifest, and roll out in stages with the old version kept as the rollback point.'] ] },
    { type: 'match', title: 'Which change class fits?', pairs: [
      ['A scheduled nightly refresh of the index from approved sources', 'Standard change'],
      ['Giving an agent a new tool that can issue refunds', 'Normal change, with risk-based approval'],
      ['Disabling a tool that an attacker is actively abusing', 'Emergency change, reviewed afterwards'],
      ['Moving to a new provider model version', 'Normal change, with comparative evaluation'],
      ['Loosening a guardrail threshold to reduce complaints', 'Normal change, with safety evaluation'] ] },
    { type: 'callout', kind: 'exam', title: 'Change management questions', md: `The key idea: **anything that changes behaviour is a change**, including prompts, retrieval sources, guardrail thresholds, tools and provider model versions. Strong answers use **versioning and release manifests**, **change classes matched to risk**, **comparative evaluation** against the current version and **records** in the registry and model card. "No code changed, so no change control was needed" is a trap.` },
    { type: 'check', q: { q: 'A team switches its retrieval system to a new embedding model and rebuilds the index, without any change request, because "no application code changed". What is the MAIN concern?', o: ['The new embedding model may use more storage than the previous one', 'Retrieval changed with no impact analysis, evaluation or rollback point', 'Embedding models can only be changed by the original model provider', 'Rebuilding the index should always be done at weekends to avoid disruption'], a: 1, b: 3,
      why: 'Changing the embedding model changes what is retrieved and therefore what the system says, so it needs impact analysis, comparative evaluation, a versioned rollback point and approval. Storage, provider rules and timing are secondary.' } }
  ]
};
