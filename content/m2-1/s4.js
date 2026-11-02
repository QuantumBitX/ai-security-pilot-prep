/* 2.1 · Section 4: AI use-case inventories and organisational roles */
module.exports = {
  title: 'AI use-case inventories and organisational roles', covers: [4, 5],
  blocks: [
    { type: 'video', title: 'Who owns the AI?', kicker: 'Module 2.1 · Video 4 of 4', scenes: [
      { t: 'title', kicker: 'Module 2.1 · AI governance', title: 'Who owns the AI?', sub: 'Use-case inventories, decision rights, and the people who make governance work', icon: 'users',
        say: 'Two questions sink most AI governance programmes: what AI do we actually have, and who is accountable for it? | This video covers the centralised AI use-case inventory, and the roles that make governance work, from the board to the AI champion in each team.' },
      { t: 'flow', title: 'The life of a use case',
        nodes: [
          { id: 'idea', x: 180, y: 330, icon: 'bulb', label: 'Intake', sub: 'request or discovery', k: 'human', w: 250 },
          { id: 'tri', x: 520, y: 330, icon: 'filter', label: 'Triage', sub: 'is it AI? which tier?', k: 'neutral', w: 260 },
          { id: 'ass', x: 880, y: 330, icon: 'audit', label: 'Assess', sub: 'risk and impact', k: 'threat', w: 250 },
          { id: 'dec', x: 1260, y: 330, icon: 'gavel', label: 'Decide', sub: 'approve, condition, reject', k: 'control', w: 300 },
          { id: 'inv', x: 1260, y: 690, icon: 'list', label: 'Inventory record', sub: 'owner, tier, controls, dates', k: 'data', w: 310 },
          { id: 'mon', x: 820, y: 690, icon: 'eye', label: 'Monitor and review', sub: 'until retirement', k: 'model', w: 300 } ],
        edges: [{ from: 'idea', to: 'tri', k: 'human' }, { from: 'tri', to: 'ass', k: 'neutral' }, { from: 'ass', to: 'dec', k: 'control' }, { from: 'dec', to: 'inv', k: 'control' }, { from: 'inv', to: 'mon', k: 'data' }],
        steps: [
          { show: 'idea', hi: 'idea' },
          { show: 'tri idea-tri', flow: 'idea-tri', hi: 'tri' },
          { show: 'ass tri-ass', flow: 'tri-ass', hi: 'ass' },
          { show: 'dec ass-dec', flow: 'ass-dec', hi: 'dec' },
          { show: 'inv dec-inv', flow: 'dec-inv', hi: 'inv' },
          { show: 'mon inv-mon', flow: 'inv-mon', hi: 'mon', note: { x: 110, y: 560, w: 520, text: 'The inventory is a living record, not a one-time list.' } } ],
        say: 'A centralised inventory works best as part of a process. Use cases enter through intake, either as a new request, or because monitoring or procurement discovered AI already in use. | Triage decides whether it really is AI, and gives it a provisional risk tier. | The use case is assessed for risk and impact, in proportion to its tier. | A decision-maker with the right authority approves it, approves it with conditions, or rejects it. | The decision, owner, tier, controls and review dates are recorded in the inventory. | And the record is updated as the system is monitored, reviewed, changed and eventually retired.' },
      { t: 'bullets', title: 'What each inventory record holds', layout: 'grid', cols: 2, items: [
          { icon: 'id', h: 'Identity and purpose', d: 'Name, description, business process, intended use', k: 'neutral' },
          { icon: 'user', h: 'Accountable owners', d: 'Business owner, technical owner, data owner', k: 'human' },
          { icon: 'model', h: 'Models and suppliers', d: 'Model, version, vendor, hosting location', k: 'model' },
          { icon: 'database', h: 'Data', d: 'Categories used, personal or sensitive data, sources', k: 'data' },
          { icon: 'alert', h: 'Risk and oversight', d: 'Tier, assessments, HITL mode, controls', k: 'threat' },
          { icon: 'calendar', h: 'Status and dates', d: 'Lifecycle stage, approval, next review', k: 'control' } ],
        say: 'Each inventory record should answer a standard set of questions. | Identity and purpose: what the system is, which business process it supports, and what it is intended to do. | Accountable owners: a named business owner, technical owner and data owner. | Models and suppliers: which model and version, from which vendor, hosted where. | Data: which categories of data it uses, including personal or sensitive data, and their sources. | Risk and oversight: the risk tier, completed assessments, the human oversight mode, and the controls in place. | And status and dates: lifecycle stage, approval date and next review date.' },
      { t: 'bullets', title: 'Roles that make it work', items: [
          { icon: 'building', h: 'Board and executive leadership', d: 'Set risk appetite; hold management to account', k: 'neutral' },
          { icon: 'star', h: 'Chief AI Officer', d: 'Owns AI strategy, governance and coordination', k: 'model' },
          { icon: 'users', h: 'AI governance committee', d: 'Cross-functional body that approves and conditions use cases', k: 'control' },
          { icon: 'scale', h: 'AI ethics officer', d: 'Champions responsible AI; reviews ethical impacts', k: 'human' },
          { icon: 'megaphone', h: 'AI champions', d: 'Advocates in each team; first point of contact', k: 'data' } ],
        say: 'Now the people. | The board and executive leadership set the organisation’s appetite for AI risk, and hold management accountable. | A chief AI officer owns AI strategy and governance, and coordinates across functions. US federal agencies, for example, are required to designate one. | An AI governance committee brings legal, privacy, security, risk, ethics, HR, data science and business leaders together to approve, condition or reject use cases. | An AI ethics officer champions responsible AI principles and reviews ethical impacts, such as fairness and effects on vulnerable groups. | And AI champions are trained advocates embedded in each team. They promote safe adoption, answer questions, and spot unregistered AI early.' },
      { t: 'compare', title: 'Three lines for AI', labels: ['Who', 'Role'],
        cols: [{ h: 'First line', icon: 'tool', k: 'model' }, { h: 'Second line', icon: 'shield', k: 'control' }, { h: 'Third line', icon: 'audit', k: 'human' }],
        rows: [
          ['Business owners, AI and data teams', 'Risk, compliance, security, privacy', 'Internal audit'],
          ['Own and manage the risk day to day', 'Set frameworks; challenge and oversee', 'Independent assurance to the board'] ],
        say: 'Many organisations map these roles onto the three lines model. | The first line is the business owners and the AI and data teams who build and run systems. The second line is risk, compliance, security and privacy. The third line is internal audit. | The first line owns and manages AI risk day to day. The second sets frameworks and provides challenge and oversight. And the third gives the board independent assurance that the whole system works.' },
      { t: 'summary', items: ['A central inventory: discover, triage, assess, decide, record', 'Every record has named owners, a tier and review dates', 'CAIO, governance committee, ethics officer, champions', 'First line owns risk; second oversees; third assures'],
        say: 'To recap. | A centralised inventory sits inside a process: discover, triage, assess, decide and record. | Every record has named owners, a risk tier, its controls and review dates. | Key roles include the chief AI officer, a cross-functional governance committee, an AI ethics officer and AI champions. | And in the three lines model, the first line owns AI risk, the second oversees it, and the third provides independent assurance.' } ] },
    { type: 'text', md: `### Why a centralised inventory matters
An organisation cannot assess, monitor, audit or report on AI it does not know about. A **centralised AI use-case inventory** (sometimes called an AI register or AI system catalogue) is the foundation of every other governance activity:

- **Risk management:** tiers, assessments and controls are tracked per use case.
- **Compliance:** the EU AI Act requires providers and certain deployers of high-risk systems to register them in an EU database; US federal agencies must publish annual AI use-case inventories; ISO/IEC 42001 auditors expect to see one.
- **Incident response:** when a model vulnerability or vendor breach is announced, the inventory tells you within minutes which systems are affected.
- **Strategy and cost:** duplicate tools, unused licences and high-value opportunities become visible.

### Building and maintaining it
- **Define “AI” for inventory purposes.** Include machine learning models, generative AI tools and features embedded in SaaS products, and agents. Exclude simple rules engines unless policy says otherwise. Ambiguity is the main reason inventories are incomplete.
- **Use multiple discovery channels.** Self-registration through intake; procurement and contract reviews; expense claims; network, proxy and cloud-access logs; SaaS management tools; code repositories and model registries; and questions in annual attestations. Shadow AI detection is covered in Module 2.6.
- **Integrate with existing records.** Link inventory entries to the CMDB, data catalogue, vendor register, model registry and risk register rather than duplicating them.
- **Keep it alive.** Require updates on material change (new model version, new data, new users or purpose), schedule reviews by tier, and record retirement.

A useful test: *if a regulator, auditor or journalist asked tomorrow which of our systems make decisions about people, could we answer accurately within a day?*

### Organisational roles
| Role | Typical responsibilities |
|---|---|
| **Board** | Approves AI strategy and risk appetite; receives assurance; holds management to account |
| **Chief AI Officer (CAIO)** | Owns AI strategy and the governance programme; coordinates across functions; reports on AI risk and value. Required for US federal agencies under OMB policy |
| **AI governance committee** (council or board) | Cross-functional body (legal, privacy, security, risk, compliance, HR, data science, business) that approves, conditions or rejects higher-risk use cases and resolves escalations |
| **AI ethics officer** | Champions responsible AI principles; leads ethical reviews, fairness assessments and stakeholder engagement; can escalate concerns independently |
| **AI champions** | Trained advocates in business units; promote safe adoption, answer first-line questions, encourage registration of use cases, feed back practical issues |
| **Business (use-case) owner** | Accountable for the use case, its outcomes, its risks and its compliance |
| **Model owner / technical owner** | Responsible for the model’s development, performance, documentation and monitoring |
| **Data owner and data steward** | Accountable for data quality, classification, permitted use and access decisions |
| **CISO and security team** | AI threat modelling, security testing, monitoring and incident response |
| **Data protection officer** | Advises on GDPR compliance, DPIAs and data subject rights; independent by law where required |
| **Internal audit** | Independent assurance over AI governance and controls |

Two principles underpin this structure. **Accountability must be named:** every AI system needs a single accountable business owner, not “the AI team”. And **decision rights must match risk:** low-risk uses can be approved by a manager using a checklist, while high-impact uses go to the committee, and some decisions (such as accepting significant residual risk) require an executive.`, },
    { type: 'tabs', title: 'Decision rights by tier (example)', items: [
      ['Tier 1: low', 'Example: an AI writing assistant with no personal data. **Assessment:** short checklist. **Approver:** line manager plus AI champion. **Review:** annually.'],
      ['Tier 2: moderate', 'Example: an internal knowledge assistant using company documents. **Assessment:** standard risk assessment and security review. **Approver:** business owner with security and privacy sign-off. **Review:** every six months and on material change.'],
      ['Tier 3: high', 'Example: AI that screens job applicants or influences credit decisions. **Assessment:** full risk and impact assessment, DPIA, bias testing, adversarial testing. **Approver:** AI governance committee; residual risk accepted by an executive. **Review:** quarterly, with continuous monitoring.'],
      ['Prohibited', 'Example: emotion recognition to evaluate employees. **Decision:** not permitted under policy (and, in the EU, under law). Requests are recorded and declined.'] ] },
    { type: 'callout', kind: 'exam', title: 'Accountability questions', md: `Exam scenarios often ask **who** should decide or **who is accountable**. The answer is rarely the data scientist or the AI tool itself. Look for the **business owner** (accountable for the use case), the **governance committee** (approval of high-risk uses), or **senior management** (accepting significant residual risk). Security teams advise and implement controls; they don’t usually *own* business risk.` },
    { type: 'check', q: { q: 'A critical vulnerability is announced in a popular open-source model. Which governance capability MOST directly lets the organisation identify every affected system quickly?', o: ['An AI ethics statement that commits every team to report vulnerabilities promptly', 'A centralised AI use-case inventory that records models, versions, owners and uses', 'A guideline on prompt writing that tells staff which models are approved for use', 'An annual awareness campaign that reminds developers to track the open-source components they use'], a: 1, b: 4,
      why: 'An inventory that records which models and versions each system uses, and who owns it, turns an announcement into a targeted response in minutes. The other options don’t provide that visibility.' } }
  ]
};
