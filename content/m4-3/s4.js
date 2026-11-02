/* 4.3 · Section 4: validation checkpoints and pipeline gating patterns */
module.exports = {
  title: 'Validation checkpoints and pipeline gating', covers: [4],
  blocks: [
    { type: 'video', title: 'Gates that can’t be skipped', kicker: 'Module 4.3 · Video 4 of 5', scenes: [
      { t: 'title', kicker: 'Module 4.3 · MLOps security', title: 'Gates that can’t be skipped', sub: 'Validation checkpoints and pipeline gating patterns', icon: 'check',
        say: 'A gate is only a control if it can’t be skipped. Many pipelines have checks that are optional, advisory, or easy to bypass under deadline pressure. | This video covers where to put validation checkpoints in an ML pipeline, and the patterns that make gates enforceable.' },
      { t: 'timeline', title: 'Checkpoints along the pipeline',
        events: [
          { y: 'Data', h: 'Ingest', d: 'Contract, scans, hashes' },
          { y: 'Data', h: 'Pre-train', d: 'Approved for this purpose' },
          { y: 'Model', h: 'Post-train', d: 'Performance, safety, fairness' },
          { y: 'Model', h: 'Security', d: 'Artefact scans, red team' },
          { y: 'Release', h: 'Approval', d: 'Right authority for the tier' },
          { y: 'Live', h: 'Canary', d: 'Metrics within limits' } ],
        say: 'Checkpoints belong at six points. | At ingestion: data must meet its contract and pass scans and hash checks. | Before training: the data must be approved for this purpose, with licences and lawful basis confirmed. | After training: performance, safety and fairness evaluations against agreed thresholds. | A security checkpoint: artefact scanning, dependency checks and, for higher tiers, red-team results. | A release checkpoint: approval by the right authority for the model’s risk tier. | And a canary checkpoint: live metrics must stay within limits before the rollout widens.' },
      { t: 'compare', title: 'Kinds of gate', labels: ['Decides by', 'Good for', 'Weakness'],
        cols: [{ h: 'Automated', icon: 'gear', k: 'data' }, { h: 'Human', icon: 'user', k: 'human' }, { h: 'Policy as code', icon: 'code', k: 'control' }],
        rows: [
          ['Thresholds and tests', 'Judgement and context', 'Machine-checkable rules'],
          ['Every build, fast', 'High-risk releases', 'Consistent enforcement'],
          ['Only as good as its tests', 'Slow; rubber-stamping', 'Rules need maintaining'] ],
        say: 'Gates come in three kinds, and good pipelines use all three. | Automated gates decide by thresholds and tests. Human gates use judgement and context. Policy-as-code gates check machine-readable rules, such as only deploying signed models approved for this tier. | Automated gates suit every build, because they are fast. Human gates suit high-risk releases. Policy as code gives consistent enforcement everywhere. | But automated gates are only as good as their tests, human gates are slow and prone to rubber-stamping, and policy rules need maintaining as things change.' },
      { t: 'bullets', title: 'Making gates enforceable', layout: 'grid', cols: 2, items: [
          { icon: 'shieldcheck', h: 'Attest each gate', d: 'Signed evidence of the result', k: 'control' },
          { icon: 'lock', h: 'Verify at deployment', d: 'No attestation, no deploy', k: 'data' },
          { icon: 'branch', h: 'Protect the pipeline', d: 'Required checks can’t be removed', k: 'neutral' },
          { icon: 'users', h: 'Separate duties', d: 'Builders don’t approve', k: 'human' },
          { icon: 'key', h: 'Controlled break-glass', d: 'Approved, logged, expiring', k: 'threat' },
          { icon: 'chart', h: 'Track gate health', d: 'Overrides, failures, flakiness', k: 'model' } ],
        say: 'Six patterns make gates enforceable. | Each gate produces signed evidence of its result: an attestation. | Deployment verifies the attestations, and refuses anything missing one, so gates can’t be skipped by going around the pipeline. | The pipeline itself is protected, so required checks can’t simply be removed by whoever is in a hurry. | Duties are separated: the people who build a model don’t approve it. | Emergencies use a controlled break-glass route: approved, logged, and expiring, with review afterwards. | And gate health is tracked: overrides, failures and flaky tests are signals that controls are eroding.' },
      { t: 'summary', items: ['Checkpoints at ingest, pre-train, post-train, security, release and canary', 'Combine automated, human and policy-as-code gates', 'Attest each gate; verify attestations at deployment', 'Protect pipeline config, separate duties, control break-glass'],
        say: 'To recap. | Place checkpoints at ingestion, before training, after training, for security, at release and during canary. | Combine automated, human and policy-as-code gates. | Make each gate produce a signed attestation, and verify the attestations at deployment. | And protect the pipeline configuration, separate duties, and keep break-glass routes controlled and reviewed.' } ] },
    { type: 'text', md: `### Checkpoints and their evidence
| Checkpoint | Typical checks | Evidence produced |
|---|---|---|
| **Ingestion** | Schema and contract, malware and secret scans, PII detection, hash verification | Validation report; dataset version and hash |
| **Pre-training** | Data approved for the purpose (licence, lawful basis, classification), dataset pinned | Data approval record linked to the run |
| **Post-training evaluation** | Performance against baseline, safety and robustness suites, fairness metrics, memorisation tests | Evaluation report with thresholds and results |
| **Security** | Artefact format and malware scanning, dependency and container scans, signature checks, red teaming for higher tiers | Scan results, red-team findings and remediation status |
| **Release approval** | Evidence complete for the risk tier; approver independent of the builders (Module 3.5) | Signed approval in the registry |
| **Canary and rollout** | Error rates, safety signals, drift and business metrics within limits (Module 3.5) | Automated promotion or rollback decision |

### Gate design
- **Hard and soft gates:** hard gates block on failure; soft gates warn and require acknowledgement. Make security, privacy and safety gates hard for higher risk tiers.
- **Thresholds agreed in advance**, recorded with the model’s approval, so they can’t be adjusted after a failure to let a release through.
- **Policy as code:** express rules (for example "production accepts only signed models with an approved evaluation attestation for their tier") in a policy engine such as Open Policy Agent, and enforce them in the pipeline and at admission to the serving platform.
- **Attestations:** each gate records a signed statement of what was checked and the result (for example, in-toto attestations), bound to the artefact’s digest. The deployment step verifies the full set.

### Preventing bypass
- **Branch protection and required checks** on the pipeline repository; pipeline definitions changed only through review.
- **Deployment only from the pipeline:** no human credentials can deploy to production directly.
- **Separation of duties:** the person or team that builds a model can’t approve or deploy it alone.
- **Break-glass procedures** for emergencies: a named approver, time-limited access, full logging, and mandatory review afterwards.
- **Monitor gate metrics:** frequent overrides, waivers or "temporarily disabled" checks are early warning signs.

Module 4.4 covers functional, performance and stress testing, which supply many of the automated gates; Module 6.2 covers secure AI development lifecycle and change management.` },
    { type: 'callout', kind: 'exam', title: 'Gating questions', md: `The best answers make gates **mandatory and verifiable**: signed evidence bound to the artefact, checked at deployment, with separation of duties. Answers that rely on teams "remembering" to run checks, or that let thresholds change after a failure, are weak.` },
    { type: 'match', title: 'Which checkpoint catches this?', pairs: [
      ['A dataset arrives with an unexpected column', 'Ingestion'],
      ['The data’s licence forbids training', 'Pre-training approval'],
      ['A fairness gap exceeds the agreed threshold', 'Post-training evaluation'],
      ['A checkpoint uses an unsafe file format', 'Security checkpoint'],
      ['Errors rise for the 5% of users on the new version', 'Canary'] ] },
    { type: 'check', q: { q: 'Under deadline pressure, an engineer deploys a model directly from a laptop, skipping the pipeline’s evaluation and security gates. Which control MOST directly prevents this?', o: ['A policy reminding engineers that every deployment must go through the pipeline, with no exceptions', 'Accepting only artefacts with valid gate attestations, deployed by the pipeline’s identity', 'A monthly report listing every deployment that didn’t go through the pipeline', 'Extra training for engineers on why the evaluation gates are important'], a: 1, b: 4,
      why: 'If production only accepts artefacts carrying signed attestations from each gate, deployed by the pipeline’s own identity, bypassing the gates simply fails. Policies, reports and training rely on behaviour or detect problems after the fact.' } }
  ]
};
