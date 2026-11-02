/* 2.2 · Section 1: core responsible AI principles */
module.exports = {
  title: 'Core responsible AI principles', covers: [1],
  blocks: [
    { type: 'video', title: 'From principles to practice', kicker: 'Module 2.2 · Video 1 of 4', scenes: [
      { t: 'title', kicker: 'Module 2.2 · Responsible AI and ethics', title: 'From principles to practice', sub: 'The values behind responsible AI, and how to make them enforceable', icon: 'scale',
        say: 'Almost every organisation that uses AI has published principles. Far fewer can show how those principles change what their systems actually do. | This video covers the core responsible AI principles, where they come from, and how to turn them into requirements, controls and evidence.' },
      { t: 'bullets', title: 'Six core principles', layout: 'grid', cols: 2, items: [
          { icon: 'scale', h: 'Fairness', d: 'Treat people equitably; avoid unjust discrimination', k: 'human' },
          { icon: 'shieldcheck', h: 'Reliability and safety', d: 'Perform as intended and fail safely', k: 'control' },
          { icon: 'lock', h: 'Privacy and security', d: 'Protect personal data and resist attack', k: 'data' },
          { icon: 'users', h: 'Inclusiveness', d: 'Work for people of all abilities and backgrounds', k: 'model' },
          { icon: 'eye', h: 'Transparency', d: 'Be open about AI use, purpose and limits', k: 'neutral' },
          { icon: 'gavel', h: 'Accountability', d: 'People remain answerable for AI outcomes', k: 'threat' } ],
        say: 'Six principles appear in almost every responsible AI framework. | Fairness: AI should treat people equitably and avoid unjust discrimination. | Reliability and safety: it should perform consistently as intended, and fail safely when it doesn’t. | Privacy and security: it should protect personal data and resist attack. | Inclusiveness: it should work for people of all abilities, languages and backgrounds, not just the majority. | Transparency: organisations should be open about when and how AI is used, what it is for, and its limitations. | And accountability: people, not machines, remain answerable for AI outcomes.' },
      { t: 'bullets', title: 'Where the principles come from', items: [
          { icon: 'globe', h: 'OECD AI Principles', d: 'Adopted 2019, updated 2024; endorsed by dozens of governments', k: 'data' },
          { icon: 'book', h: 'UNESCO Recommendation on the Ethics of AI', d: '2021; adopted by all 193 member states', k: 'model' },
          { icon: 'flag', h: 'EU guidelines for trustworthy AI', d: 'Seven requirements that shaped the EU AI Act', k: 'human' },
          { icon: 'building', h: 'Company principles', d: 'Translate shared values into a specific organisation’s context', k: 'neutral' } ],
        say: 'These principles have common roots. | The OECD AI Principles, adopted in twenty nineteen and updated in twenty twenty-four, are endorsed by dozens of governments, and underpin many national strategies. | UNESCO’s Recommendation on the Ethics of AI, from twenty twenty-one, was adopted by all one hundred and ninety-three member states. | The EU’s ethics guidelines for trustworthy AI set seven requirements, such as human agency and oversight, that later shaped the AI Act. | And companies adapt these shared values to their own context, products and risks.' },
      { t: 'flow', title: 'Making a principle enforceable',
        nodes: [
          { id: 'p', x: 200, y: 420, icon: 'scale', label: 'Principle', sub: 'Fairness', k: 'human', w: 250 },
          { id: 'r', x: 560, y: 420, icon: 'ruler', label: 'Requirement', sub: 'error rates within 5 points across groups', k: 'model', w: 290 },
          { id: 'c', x: 950, y: 420, icon: 'gear', label: 'Control', sub: 'bias test before release; monitoring', k: 'control', w: 290 },
          { id: 'e', x: 1340, y: 420, icon: 'archive', label: 'Evidence', sub: 'test reports, dashboards, sign-off', k: 'data', w: 290 } ],
        edges: [{ from: 'p', to: 'r', k: 'human' }, { from: 'r', to: 'c', k: 'model' }, { from: 'c', to: 'e', k: 'control' }],
        steps: [
          { show: 'p', hi: 'p' },
          { show: 'r p-r', flow: 'p-r', hi: 'r' },
          { show: 'c r-c', flow: 'r-c', hi: 'c' },
          { show: 'e c-e', flow: 'c-e', hi: 'e', note: { x: 120, y: 640, w: 900, text: 'No requirement, no control, no evidence: the principle is only a slogan.' } } ],
        say: 'A principle only matters when it changes behaviour. Take fairness. | First, turn it into a measurable requirement, for example: error rates for different demographic groups must stay within five percentage points of each other. | Then attach a control: a bias test before every release, and monitoring in production. | And keep evidence: test reports, monitoring dashboards and a documented sign-off. Without that chain, a principle is only a slogan.' },
      { t: 'bullets', title: 'Why principles fail', items: [
          { icon: 'text', h: 'Vague language', d: '“Be fair” means nothing until someone defines it', k: 'neutral' },
          { icon: 'user', h: 'No owner', d: 'Everyone agrees; nobody is accountable', k: 'human' },
          { icon: 'ruler', h: 'No metrics', d: 'Nothing is measured, so nothing improves', k: 'model' },
          { icon: 'stop', h: 'No authority to stop', d: 'Concerns can be raised but never block a launch', k: 'threat' } ],
        say: 'Principles fail in predictable ways, a pattern sometimes called ethics washing. | Vague language: be fair means nothing until someone defines fair for this use case. | No owner: everyone agrees with the principles, and nobody is accountable for them. | No metrics: nothing is measured, so nothing improves. | And no authority to stop: concerns can be raised, but they never actually block a launch.' },
      { t: 'bullets', title: 'When principles collide', layout: 'grid', cols: 2, items: [
          { icon: 'eye', h: 'Transparency vs security', d: 'Explaining a fraud model can teach fraudsters to evade it', k: 'data' },
          { icon: 'scale', h: 'Fairness vs privacy', d: 'Measuring bias needs data on sensitive traits', k: 'human' },
          { icon: 'target', h: 'Fairness vs accuracy', d: 'Fairness constraints can reduce overall accuracy', k: 'model' },
          { icon: 'shield', h: 'Safety vs helpfulness', d: 'Over-cautious refusals push users to riskier tools', k: 'threat' } ],
        say: 'Principles also conflict, and governance exists to resolve the conflicts deliberately. | Transparency and security: explaining exactly how a fraud model works can teach fraudsters to evade it. | Fairness and privacy: you can’t measure bias against a group without some data about who is in it. | Fairness and accuracy: constraining a model to equalise outcomes can reduce its overall accuracy. | And safety and helpfulness: a system that refuses too much pushes people towards less safe alternatives. The answer is a documented decision, made by people with the authority to make it.' },
      { t: 'summary', items: ['Fairness, reliability and safety, privacy and security, inclusiveness, transparency, accountability', 'Shared roots: OECD, UNESCO, EU trustworthy AI', 'Principle → requirement → control → evidence', 'Resolve conflicts deliberately and document them'],
        say: 'To recap. | The six core principles are fairness, reliability and safety, privacy and security, inclusiveness, transparency and accountability. | They share roots in the OECD, UNESCO and EU frameworks. | They only work when each principle becomes a requirement, a control and evidence. | And when principles collide, resolve the conflict deliberately, and write the decision down.' } ] },
    { type: 'text', md: `### The principles in detail
| Principle | What it means in practice | Typical controls |
|---|---|---|
| **Fairness** | Similar people are treated similarly; outcomes don’t unjustly disadvantage protected groups | Bias testing across groups, representative data, fairness metrics with thresholds, monitoring |
| **Reliability and safety** | The system performs as intended across expected conditions and fails safely outside them | Evaluation against requirements, stress and adversarial testing, fallbacks, human oversight |
| **Privacy and security** | Personal data is lawfully processed and protected; the system resists attack | DPIAs, minimisation, privacy-enhancing technologies, threat modelling, security testing |
| **Inclusiveness** | The system works for people with different abilities, languages, cultures and circumstances | Accessibility testing, diverse user research, multilingual evaluation, alternative channels |
| **Transparency** | People know when AI is used, what it does, its limits, and how to challenge it | Disclosure notices, model and system cards, documentation, explanations |
| **Accountability** | Named people answer for outcomes; there are routes to redress | Ownership, governance committees, audit trails, complaint and appeal processes |

These six follow a widely used corporate formulation, and closely match the international frameworks:

- **OECD AI Principles** (2019, updated 2024): inclusive growth, sustainable development and well-being; respect for human rights and democratic values, including fairness and privacy; transparency and explainability; robustness, security and safety; and accountability.
- **UNESCO Recommendation on the Ethics of AI** (2021): ten principles, including proportionality and do no harm, safety and security, privacy, human oversight and determination, transparency and explainability, responsibility and accountability, fairness and non-discrimination, and sustainability.
- **EU High-Level Expert Group’s Ethics Guidelines for Trustworthy AI** (2019): seven requirements: human agency and oversight; technical robustness and safety; privacy and data governance; transparency; diversity, non-discrimination and fairness; societal and environmental well-being; and accountability.

### Operationalising principles
A responsible AI programme makes each principle real through the governance machinery from Module 2.1:

1. **Policy** commits the organisation to the principles.
2. **Standards** turn each principle into measurable requirements per risk tier (for example, “Tier 3 systems must report false positive rates by group and stay within agreed thresholds”).
3. **Assessments** (impact assessments, DPIAs, bias evaluations) check each use case against the requirements before approval.
4. **Controls** are built into the lifecycle: data checks, testing gates, human oversight, monitoring.
5. **Evidence** is retained: test results, sign-offs, monitoring reports, decisions on trade-offs.
6. **Escalation and authority:** a person or body (for example, the AI governance committee or an ethics officer) can delay or stop deployment when requirements aren’t met.

### Ethics washing
**Ethics washing** is presenting an appearance of ethical AI without the substance: published principles with no owners, metrics, enforcement or effect on decisions. Warning signs include principles that never block a project, ethics boards with no authority or that are disbanded when inconvenient, and transparency reports with no measurable content. Auditors and regulators increasingly look for **evidence of operation**, not statements of intent.

### Resolving conflicts between principles
Trade-offs are normal. Good practice is to:
- make the conflict explicit in the impact assessment;
- consider alternatives that reduce the conflict (for example, privacy-preserving methods for bias measurement, or explaining a fraud decision to the customer in general terms without exposing model features);
- have the decision made at the right level of authority;
- document the rationale and revisit it when circumstances change.`, },
    { type: 'match', title: 'Match the control to the principle it mainly serves', pairs: [
      ['Telling users they are chatting with an AI', 'Transparency'],
      ['Testing a speech assistant with diverse accents and speech impairments', 'Inclusiveness'],
      ['Comparing false positive rates across demographic groups', 'Fairness'],
      ['Naming a business owner and an appeals process for decisions', 'Accountability'],
      ['Adversarial testing and safe fallbacks', 'Reliability and safety'] ] },
    { type: 'callout', kind: 'real', title: 'Principles with teeth', md: `Organisations with mature programmes can point to launches that were **delayed, changed or cancelled** because they failed a responsible AI requirement. If no project has ever been affected, the principles probably aren’t operating.` },
    { type: 'check', q: { q: 'A company’s published AI principles commit it to fairness, but no fairness metric, test or owner exists for any AI system. What does this BEST illustrate?', o: ['Mature responsible AI governance, because the principles have been published', 'Ethics washing: principles without operational requirements, controls or accountability', 'A privacy-enhancing approach that avoids collecting data needed to measure fairness', 'An appropriate approach for high-risk systems, where metrics are set only after deployment'], a: 1, b: 1,
      why: 'Principles only have effect when translated into measurable requirements, controls, evidence and owners. Without them, the organisation projects responsibility without practising it.' } }
  ]
};
