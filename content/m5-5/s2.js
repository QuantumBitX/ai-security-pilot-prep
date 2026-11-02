/* 5.5 · Section 2: multi-disciplinary escalation paths (SecOps, MLOps, data science, legal, compliance) */
module.exports = {
  title: 'Multi-disciplinary escalation paths', covers: [2],
  blocks: [
    { type: 'video', title: 'The right people, fast', kicker: 'Module 5.5 · Video 2 of 5', scenes: [
      { t: 'title', kicker: 'Module 5.5 · AI incident response', title: 'The right people, fast', sub: 'Multi-disciplinary escalation paths', icon: 'users',
        say: 'No single team can handle a serious AI incident alone. Security knows attacks, MLOps knows the pipelines, data scientists know the model, and lawyers know the clocks that start ticking. | This video covers multi-disciplinary escalation paths for AI incidents.' },
      { t: 'bullets', title: 'Who an AI incident needs', layout: 'grid', cols: 2, items: [
          { icon: 'eye', h: 'Security operations', d: 'Leads detection, containment, forensics', k: 'threat' },
          { icon: 'gear', h: 'MLOps and platform', d: 'Rollback, pipelines, serving', k: 'neutral' },
          { icon: 'brain', h: 'Data science', d: 'Model behaviour and impact analysis', k: 'model' },
          { icon: 'database', h: 'Data owner and privacy', d: 'Data affected; breach assessment', k: 'data' },
          { icon: 'gavel', h: 'Legal and compliance', d: 'Notification duties, contracts, privilege', k: 'human' },
          { icon: 'megaphone', h: 'Business and comms', d: 'Decisions, customers, media', k: 'control' } ],
        say: 'A serious AI incident needs six groups. | Security operations leads detection, containment and forensics. | MLOps and platform engineers carry out rollbacks, suspend pipelines and manage serving. | Data scientists analyse what the model did, and how far the impact reaches. | The data owner and privacy team assess which data was affected, and whether it is a personal data breach. | Legal and compliance track notification duties, contracts and legal privilege. | And the business owner and communications team make business decisions and speak to customers and the media.' },
      { t: 'flow', title: 'An escalation path',
        nodes: [
          { id: 'soc', x: 230, y: 330, icon: 'eye', label: 'SOC analyst', sub: 'triage, first containment', k: 'threat', w: 310 },
          { id: 'lead', x: 700, y: 330, icon: 'user', label: 'AI incident lead', sub: 'coordinates, decides', k: 'human', w: 300 },
          { id: 'core', x: 1200, y: 330, icon: 'users', label: 'Core team', sub: 'SecOps, MLOps, data science', k: 'model', w: 330 },
          { id: 'ext', x: 1200, y: 690, icon: 'gavel', label: 'Extended team', sub: 'legal, privacy, comms', k: 'neutral', w: 300 },
          { id: 'exec', x: 700, y: 690, icon: 'building', label: 'Executives', sub: 'major decisions', k: 'control', w: 280 },
          { id: 'out', x: 230, y: 690, icon: 'globe', label: 'External parties', sub: 'regulators, provider, police', k: 'data', w: 320 } ],
        edges: [{ from: 'soc', to: 'lead', k: 'threat' }, { from: 'lead', to: 'core', k: 'human' }, { from: 'core', to: 'ext', k: 'model' }, { from: 'ext', to: 'exec', k: 'neutral' }, { from: 'exec', to: 'out', k: 'control' }],
        steps: [
          { show: 'soc', hi: 'soc', mark: { soc: 'alert' } },
          { show: 'lead soc-lead', flow: 'soc-lead', hi: 'lead' },
          { show: 'core lead-core', flow: 'lead-core', hi: 'core' },
          { show: 'ext core-ext', flow: 'core-ext', hi: 'ext' },
          { show: 'exec ext-exec', flow: 'ext-exec', hi: 'exec' },
          { show: 'out exec-out', flow: 'exec-out', hi: 'out' } ],
        say: 'Here is a typical escalation path. A SOC analyst triages the alert and takes any pre-approved first containment. | An AI incident lead takes charge, coordinating the response and owning the decisions log. | The core team forms: security operations, MLOps and data science, with the model owner. | As severity or data impact grows, the extended team joins: legal, privacy, compliance and communications. | Executives are brought in for major decisions, such as taking a customer-facing service offline. | And external parties are contacted as needed: regulators, the model provider, law enforcement and affected customers.' },
      { t: 'compare', title: 'Escalation by severity', labels: ['Low', 'Medium', 'High', 'Critical'],
        cols: [{ h: 'Who is engaged', icon: 'users', k: 'human' }, { h: 'How fast', icon: 'clock', k: 'threat' }],
        rows: [
          ['SOC and model owner informed', 'Next working day'],
          ['Core AI response team', 'Within four hours'],
          ['Plus legal, privacy and comms', 'Within one hour'],
          ['Plus executives and external parties', 'Immediately'] ],
        say: 'Escalation should scale with severity, and the thresholds should be agreed in advance. | For a low-severity incident, the SOC handles it and informs the model owner by the next working day. | For medium severity, the core AI response team is engaged within about four hours. | For high severity, legal, privacy and communications join within an hour. | And for a critical incident, executives and external parties are engaged immediately. These timings are illustrative; set your own in the incident response plan.' },
      { t: 'timeline', title: 'Clocks that may start ticking', events: [
          { y: '24 hours', h: 'NIS2 early warning', d: 'Significant incidents, essential and important entities' },
          { y: '72 hours', h: 'GDPR breach notice', d: 'To the supervisory authority' },
          { y: '72 hours', h: 'NIS2 notification', d: 'Initial assessment' },
          { y: '2 to 15 days', h: 'EU AI Act', d: 'Serious incidents, high-risk systems' },
          { y: '1 month', h: 'NIS2 final report', d: 'Root cause and mitigations' } ],
        say: 'Legal and compliance must join early, because notification clocks may start as soon as the organisation becomes aware. | Under NIS2, essential and important entities send an early warning of a significant incident within twenty-four hours. | Under the GDPR, a personal data breach must be notified to the supervisory authority within seventy-two hours, unless it is unlikely to result in a risk to people. | NIS2 also requires a fuller incident notification within seventy-two hours. | The EU AI Act requires serious incidents involving high-risk AI systems to be reported within fifteen days, or two days for widespread infringements or critical infrastructure, once those obligations apply. | And NIS2 requires a final report within one month.' },
      { t: 'summary', items: ['SecOps, MLOps, data science, privacy, legal, business and comms', 'Named incident lead; core team, then extended team', 'Escalate by severity, with agreed timings', 'Bring legal in early: notification clocks may be running'],
        say: 'To recap. | AI incidents need security, MLOps, data science, privacy, legal, business and communications working together. | Name an AI incident lead, form a core team, and widen it as the incident grows. | Escalate by severity, with timings agreed in advance. | And bring legal and compliance in early, because notification clocks may already be running.' } ] },
    { type: 'text', md: `### Roles in an AI incident
| Role | Responsibilities in the incident |
|---|---|
| **AI incident lead** | Coordinates the response, sets priorities, owns the timeline and decisions log, and manages escalation |
| **Security operations** | Detection, triage, containment actions, evidence collection, forensics and threat intelligence |
| **MLOps and platform** | Model rollback, pipeline suspension, isolation of serving infrastructure, restoring clean versions |
| **Data science** | Analysing model behaviour, scoping poisoning or leakage, designing safety regression tests (Module 5.6) |
| **Model owner** | Accountable for decisions about the model: restrict, roll back, retire, accept residual risk (Module 5.1) |
| **Data owner and privacy** | Identifying affected data and people, personal data breach assessment, data subject communications |
| **Legal and compliance** | Regulatory notifications, contractual duties (including to and from AI providers), legal privilege, law enforcement liaison |
| **Communications** | Customer, employee and media messages, consistent with legal advice |
| **Providers and suppliers** | Model providers, MCP server and tool vendors, data suppliers: logs, fixes and their own notifications (Module 2.5) |

### Notification duties to know
- **GDPR:** notify the supervisory authority of a personal data breach within **72 hours** of becoming aware, unless it is unlikely to result in a risk to people’s rights and freedoms; notify affected people without undue delay where the risk is high (Articles 33 and 34).
- **NIS2:** for significant incidents, an **early warning within 24 hours**, an **incident notification within 72 hours** and a **final report within one month** (Article 23).
- **EU AI Act (Article 73):** providers of high-risk AI systems report serious incidents within **15 days** of becoming aware, **2 days** for widespread infringements or serious disruption of critical infrastructure, and **10 days** in the event of a death. Following the Digital Omnibus on AI, these duties apply once high-risk obligations take effect (from December 2027 for Annex III systems). Providers of general-purpose AI models with systemic risk must already report serious incidents to the AI Office (Article 55).
- **Sector and market rules:** for example, DORA for EU financial entities, and the US SEC rule requiring public companies to disclose material cybersecurity incidents within four business days of determining materiality.
- **Contracts:** customer contracts and AI provider agreements may set their own notification times (Module 2.5).

### Making escalation work
Pre-agree severity criteria, escalation timings and decision rights; keep **contact lists** with deputies for every role; give the incident lead authority to convene people at any hour; include AI scenarios in exercises (Module 5.1); and use a single, secure channel and **decisions log** for the incident, so everyone sees the same facts.` },
    { type: 'match', title: 'Who handles it?', pairs: [
      ['Rolling back the customer chatbot to last week’s model', 'MLOps and platform'],
      ['Deciding whether a GDPR breach notification is required', 'Privacy and legal'],
      ['Working out which outputs were affected by the poisoned data', 'Data science'],
      ['Coordinating the response and keeping the decisions log', 'AI incident lead'],
      ['Drafting the statement for affected customers', 'Communications, with legal'] ] },
    { type: 'callout', kind: 'exam', title: 'Escalation questions', md: `The best answers involve **legal and privacy early** when personal data or regulated systems are involved, **escalate by pre-agreed severity criteria**, and keep a **single incident lead** with a **decisions log**. Waiting until the investigation is finished before telling legal is a classic wrong answer, because notification clocks may already be running.` },
    { type: 'check', q: { q: 'During an AI incident, the SOC confirms that an assistant exposed customers’ personal data to other users. The team wants to finish its root-cause analysis before involving anyone else. What should happen?', o: ['Finish the root-cause analysis first, so that the legal team receives complete facts', 'Escalate to privacy and legal now, because breach notification clocks may be running', 'Inform the communications team only, so that they can prepare a press statement', 'Wait to see whether any customers complain before deciding whether to escalate'], a: 1, b: 2,
      why: 'A confirmed exposure of personal data may trigger the GDPR’s 72-hour clock from awareness, so privacy and legal must assess it immediately, in parallel with the investigation. Waiting for complete facts or complaints risks missing deadlines.' } }
  ]
};
