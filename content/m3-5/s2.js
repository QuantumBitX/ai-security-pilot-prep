/* 3.5 · Section 2: model documentation and approved model registries */
module.exports = {
  title: 'Model cards and approved model registries', covers: [2],
  blocks: [
    { type: 'video', title: 'If it isn’t in the registry, it doesn’t ship', kicker: 'Module 3.5 · Video 2 of 6', scenes: [
      { t: 'title', kicker: 'Module 3.5 · Model lifecycle', title: 'If it isn’t in the registry, it doesn’t ship', sub: 'Model documentation, model cards and approved model registries', icon: 'book',
        say: 'Documentation turns a model from a black box into an accountable asset, and a registry makes sure only approved models reach production. | This video covers model cards and related documentation, and how an approved model registry works as a security control.' },
      { t: 'bullets', title: 'What a model card records', layout: 'grid', cols: 2, items: [
          { icon: 'target', h: 'Intended use', d: 'What it is for, and for whom', k: 'control' },
          { icon: 'stop', h: 'Out-of-scope uses', d: 'What it must not be used for', k: 'threat' },
          { icon: 'database', h: 'Training data summary', d: 'Sources, time span, known gaps', k: 'data' },
          { icon: 'chart', h: 'Evaluation results', d: 'Broken down by group and condition', k: 'model' },
          { icon: 'alert', h: 'Limitations and risks', d: 'Known failure modes', k: 'human' },
          { icon: 'user', h: 'Owner and version', d: 'Who to contact, which release', k: 'neutral' } ],
        say: 'A model card is a short, structured summary of a model. | Intended use: what the model is for, and for whom. | Out-of-scope uses: what it must not be used for. | A training data summary: sources, time span and known gaps. | Evaluation results, broken down by relevant groups and conditions, not just one headline number. | Limitations and risks, including known failure modes. | And the owner, version and contact for questions or incidents.' },
      { t: 'compare', title: 'The documentation set', labels: ['Describes', 'Main audience', 'Example content'],
        cols: [{ h: 'Model card', icon: 'model', k: 'model' }, { h: 'Datasheet', icon: 'database', k: 'data' }, { h: 'System card', icon: 'layers', k: 'control' }],
        rows: [
          ['A trained model', 'A dataset', 'A whole AI system'],
          ['Deployers, reviewers, users', 'Model builders, auditors', 'Users, regulators, public'],
          ['Intended use, metrics, limits', 'Origin, composition, collection', 'Safeguards, testing, policies'] ],
        say: 'Model cards sit within a wider documentation set. | A model card describes a trained model. A datasheet describes a dataset. A system card describes a whole AI system, including the model, its safeguards and how it is operated. | Model cards serve deployers, reviewers and users. Datasheets serve model builders and auditors. System cards serve users, regulators and sometimes the public. | They record intended use and limits; the origin and composition of data; and safeguards, testing and policies. For high-risk systems in the EU, technical documentation must cover all of this in more depth.' },
      { t: 'flow', title: 'The registry as a deployment gate',
        nodes: [
          { id: 'cand', x: 220, y: 330, icon: 'model', label: 'Candidate model', sub: 'artefact, hash, signature', k: 'model', w: 300 },
          { id: 'reg', x: 620, y: 330, icon: 'book', label: 'Registry entry', sub: 'card, lineage, evidence', k: 'data', w: 280 },
          { id: 'appr', x: 1010, y: 330, icon: 'check', label: 'Approved status', sub: 'set only by approvers', k: 'human', w: 290 },
          { id: 'gate', x: 1390, y: 330, icon: 'shield', label: 'Deployment gate', sub: 'checks status and signature', k: 'control', w: 260 },
          { id: 'prod', x: 1390, y: 690, icon: 'server', label: 'Production', sub: 'approved versions only', k: 'control', w: 260 },
          { id: 'ret', x: 1000, y: 690, icon: 'stop', label: 'Deprecated or retired', sub: 'new deployments blocked', k: 'threat', w: 310 } ],
        edges: [{ from: 'cand', to: 'reg', k: 'model' }, { from: 'reg', to: 'appr', k: 'data' }, { from: 'appr', to: 'gate', k: 'human' }, { from: 'gate', to: 'prod', k: 'control' }, { from: 'prod', to: 'ret', k: 'threat' }],
        steps: [
          { show: 'cand', hi: 'cand' },
          { show: 'reg cand-reg', flow: 'cand-reg', hi: 'reg' },
          { show: 'appr reg-appr', flow: 'reg-appr', hi: 'appr' },
          { show: 'gate appr-gate', flow: 'appr-gate', hi: 'gate', mark: { gate: 'lock' } },
          { show: 'prod gate-prod', flow: 'gate-prod', hi: 'prod', mark: { prod: 'ok' } },
          { show: 'ret prod-ret', flow: 'prod-ret', hi: 'ret' } ],
        say: 'An approved model registry is more than a catalogue. A candidate model arrives with its artefact, content hash and signature. | Its registry entry links the model card, lineage to data and training runs, and the evidence from testing. | Only an authorised approver can set its status to approved. | The deployment gate checks status and signature, and refuses anything that isn’t approved and unmodified. | So only registered, approved, verified models reach production. | And when a model is deprecated or retired, the registry blocks new deployments and flags existing ones for removal.' },
      { t: 'summary', items: ['Model cards: intended use, limits, disaggregated results, owner', 'Datasheets for data; system cards for whole systems', 'The registry links artefacts, lineage, evidence and approvals', 'Deployment gates accept only approved, signed versions'],
        say: 'To recap. | Model cards record intended and out-of-scope use, disaggregated results, limitations and the owner. | Datasheets document data, and system cards document whole AI systems. | The registry links each artefact to its lineage, evidence and approvals. | And deployment gates accept only approved, signed versions, which turns the registry into a security control.' } ] },
    { type: 'text', md: `### Model documentation
- **Model cards** (introduced by Mitchell and colleagues in 2019) summarise a model’s intended use, out-of-scope uses, training data, evaluation results (disaggregated across groups and conditions), limitations, ethical considerations, version and owner.
- **Datasheets for datasets** document a dataset’s motivation, composition, collection process, preprocessing, intended uses, distribution and maintenance (Module 3.1).
- **System cards** describe a complete AI system: model, safeguards, testing, deployment context and policies.
- For **high-risk systems under the EU AI Act**, providers must maintain technical documentation (Annex IV) covering the system’s description, development process, data, performance, risk management, human oversight, changes and monitoring; providers of general-purpose AI models have their own documentation duties. ISO/IEC 42001 also requires documentation of AI systems across their lifecycle.

Documentation should be **versioned with the model** and updated whenever the model, its data or its use changes. A model card that describes last year’s model is misleading.

### Approved model registries
A registry is the single source of truth for models and their status. It typically records:
- Each **model and version**, with artefact location, content hash and signature.
- **Status**: candidate, approved (with conditions), deprecated or retired.
- **Lineage**: datasets, code commit, training run and base model (Module 3.1).
- **Evidence**: validation results, security and privacy reviews, model card.
- **Approvals**: who approved, when, and under what conditions.
- **Deployments**: where each version runs, and its owner.
- Entries for **external and hosted models**, with pinned versions and vendor documentation.

### The registry as a security control
- **Deployment gating:** pipelines and serving platforms deploy only versions marked approved, with verified hashes and signatures (policy as code).
- **Separation of duties:** those who register models can’t approve them, and status changes are restricted and logged.
- **Immutability:** an approved version can’t be altered; any change creates a new version that needs approval.
- **Audit:** every registration, approval, deployment and retirement is logged.
- **Retirement:** deprecated or retired models are blocked from new deployments and flagged for removal.` },
    { type: 'callout', kind: 'exam', title: 'Registry questions', md: `When a question involves an unapproved or tampered model reaching production, the strongest control is usually **technical enforcement**: a deployment gate that accepts only **registry-approved, signed** versions. Policies, reminders and after-the-fact reports are weaker answers.` },
    { type: 'check', q: { q: 'To meet a deadline, an engineer deploys a fine-tuned model straight from a training bucket to production, bypassing the registry. Which control MOST directly prevents this?', o: ['A policy statement reminding engineers that all production models must be registered first', 'A deployment gate that accepts only registry-approved models with valid signatures', 'A weekly report listing all models in production, reviewed by the AI governance lead', 'Training for engineers on why model registries matter for governance and audits'], a: 1, b: 2,
      why: 'Technical enforcement at deployment stops unapproved artefacts reaching production. Policies and training rely on compliance, and weekly reports detect the problem only after it has happened.' } }
  ]
};
