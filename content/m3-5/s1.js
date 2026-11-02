/* 3.5 · Section 1: model governance (ownership, risk classification, approval workflows) */
module.exports = {
  title: 'Model governance: ownership, risk tiers and approvals', covers: [1],
  blocks: [
    { type: 'video', title: 'Who owns this model?', kicker: 'Module 3.5 · Video 1 of 6', scenes: [
      { t: 'title', kicker: 'Module 3.5 · Model lifecycle', title: 'Who owns this model?', sub: 'Ownership, risk classification and approval workflows', icon: 'flag',
        say: 'Every model in production should have a named owner, a risk classification and an approval record. Without them, nobody is accountable when a model fails. | This video covers model governance: who owns models, how they are classified by risk, and how approval workflows scale with that risk.' },
      { t: 'bullets', title: 'Roles in model governance', items: [
          { icon: 'user', h: 'Model owner', d: 'Accountable for use and outcomes', k: 'human' },
          { icon: 'code', h: 'Developers', d: 'Build, document and test', k: 'model' },
          { icon: 'search', h: 'Independent validators', d: 'Challenge before approval', k: 'control' },
          { icon: 'scale', h: 'Risk and compliance', d: 'Set standards; second line', k: 'data' },
          { icon: 'audit', h: 'Internal audit', d: 'Independent assurance; third line', k: 'neutral' } ],
        say: 'Model governance assigns clear roles. | The model owner, usually in the business, is accountable for the model’s use and outcomes. | Developers build, document and test it. | Independent validators challenge it before approval: people who didn’t build it, with the authority to insist on changes. | Risk and compliance functions set standards and oversee, as the second line. | And internal audit provides independent assurance, as the third line.' },
      { t: 'compare', title: 'Risk tiers drive requirements', labels: ['Example', 'Validation', 'Approver', 'Review'],
        cols: [{ h: 'Tier 1: low', icon: 'check', k: 'control' }, { h: 'Tier 2: medium', icon: 'alert', k: 'human' }, { h: 'Tier 3: high', icon: 'siren', k: 'threat' }],
        rows: [
          ['Internal drafting aid', 'Customer-facing chatbot', 'Credit or hiring decisions'],
          ['Self-assessed tests', 'Peer review and test suite', 'Independent validation'],
          ['Product owner', 'AI governance lead', 'Committee or senior owner'],
          ['Every two years', 'Annually', 'Six-monthly and on change'] ],
        say: 'Risk tiers make governance proportionate. | For example, a tier one model might be an internal drafting aid; tier two, a customer-facing chatbot; tier three, a model that informs credit or hiring decisions. | Validation scales with the tier: self-assessed tests for tier one, peer review and a standard test suite for tier two, and independent validation for tier three. | So does the approver: a product owner, an AI governance lead, or a committee or designated senior owner. | And so does review frequency: perhaps every two years, annually, or every six months and whenever the model changes.' },
      { t: 'flow', title: 'Approving a high-risk model',
        nodes: [
          { id: 'prop', x: 220, y: 330, icon: 'doc', label: 'Use case proposed', sub: 'inventoried and tiered', k: 'neutral', w: 290 },
          { id: 'des', x: 620, y: 330, icon: 'database', label: 'Design and data', sub: 'purpose, basis, sources', k: 'data', w: 280 },
          { id: 'val', x: 1010, y: 330, icon: 'search', label: 'Independent validation', sub: 'performance, robustness, fairness', k: 'control', w: 330 },
          { id: 'sec', x: 1390, y: 330, icon: 'shield', label: 'Security and privacy', sub: 'threats, DPIA, controls', k: 'threat', w: 260 },
          { id: 'appr', x: 1390, y: 690, icon: 'check', label: 'Approval', sub: 'often with conditions', k: 'human', w: 260 },
          { id: 'dep', x: 1000, y: 690, icon: 'cycle', label: 'Deploy and review', sub: 'monitor; review on schedule', k: 'model', w: 310 } ],
        edges: [{ from: 'prop', to: 'des', k: 'neutral' }, { from: 'des', to: 'val', k: 'data' }, { from: 'val', to: 'sec', k: 'control' }, { from: 'sec', to: 'appr', k: 'threat' }, { from: 'appr', to: 'dep', k: 'human' }],
        steps: [
          { show: 'prop', hi: 'prop' },
          { show: 'des prop-des', flow: 'prop-des', hi: 'des' },
          { show: 'val des-val', flow: 'des-val', hi: 'val' },
          { show: 'sec val-sec', flow: 'val-sec', hi: 'sec' },
          { show: 'appr sec-appr', flow: 'sec-appr', hi: 'appr', mark: { appr: 'ok' } },
          { show: 'dep appr-dep', flow: 'appr-dep', hi: 'dep' } ],
        say: 'Here is an approval workflow for a high-risk model. It starts when the use case is proposed, added to the inventory and assigned a risk tier. | The design and the data are approved: purpose, lawful basis, data sources and owners. | Independent validators test performance, robustness and fairness against the requirements. | Security and privacy reviews check threats, controls and impact assessments. | The approver signs off, often with conditions, such as limits on use or extra monitoring. | Then the model is deployed with its monitoring plan, and returns for review on a schedule and on any significant change.' },
      { t: 'summary', items: ['Every model has a named, accountable owner', 'Independent validation provides effective challenge', 'Risk tiers set validation depth, approver and review frequency', 'Approvals carry conditions; changes trigger re-review'],
        say: 'To recap. | Every model needs a named, accountable owner. | Independent validation provides effective challenge from people who didn’t build the model. | Risk tiers set the depth of validation, the level of approver and how often the model is reviewed. | And approvals carry conditions, with significant changes triggering review.' } ] },
    { type: 'text', md: `### The model governance framework
Model governance applies the AI governance structures from Domain 2 to individual models across their lifecycle. Its foundations are:
- A **model inventory**, linked to the AI use-case inventory and AIBOMs, recording every model in use, including third-party and foundation models (Module 2.1).
- **Named ownership:** a business **model owner** accountable for use and outcomes, supported by technical owners.
- **Risk classification** that sets proportionate requirements.
- **Approval workflows** with defined evidence, approvers and conditions.
- **Ongoing review**, change management and retirement.

### Lessons from model risk management
Financial regulators have long required **model risk management**. The US guidance **SR 11-7** (2011) built it around sound development, **independent validation** and governance, centred on **effective challenge**: critical analysis by objective, informed people with the authority to make change happen. The UK PRA’s **SS1/23** (in force since 2024) sets model risk management principles for banks, explicitly including AI and machine learning models. These ideas transfer well to any organisation’s AI models.

### Classifying model risk
Typical criteria:
- **Impact** on people’s rights, safety, finances or opportunities.
- **Regulatory status**, for example an EU AI Act high-risk use case.
- **Autonomy and reversibility:** does the model decide or act on its own, and can outcomes be undone?
- **Scale:** how many people or decisions it affects.
- **Data sensitivity** and **complexity or opacity** of the model.
- **Exposure:** internal only, customer-facing, or open to the internet.

### Approval workflows
Each tier defines the required evidence (design documents, data approvals, validation results, security and privacy reviews), the approver, any **conditions** (limits on use, extra monitoring, human oversight) and the **review cycle**. Deviations go through the exception process (Module 2.6). Third-party and foundation models follow the same workflow, with validation adapted to the evidence available (vendor documentation, your own testing).

### Retirement
Retiring a model is a governed step too: notify users and dependent systems, revoke credentials and endpoints, archive documentation and evidence for the retention period, delete or retain artefacts according to policy, and update the inventory and AIBOM.` },
    { type: 'check', q: { q: 'A team wants to deploy a vendor’s pre-trained model to screen job applicants. They argue it needs no internal approval because the vendor has already validated it. What is the BEST response?', o: ['Agree, because vendor validation replaces internal validation for pre-trained models', 'Tier it as high-risk and run the full approval workflow, adapting validation to the evidence available', 'Agree, provided the vendor’s contract includes an indemnity against any discrimination claims', 'Deploy it in production first, and complete the approval within six months if no problems arise'], a: 1, b: 1,
      why: 'Hiring is a high-impact use, and accountability for using the model stays with the deployer. Vendor evidence informs validation but doesn’t replace the organisation’s own approval, testing and conditions. Indemnities transfer some cost, not accountability.' } }
  ]
};
