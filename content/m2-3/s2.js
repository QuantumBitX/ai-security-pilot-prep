/* 2.3 · Section 2: impact assessments, blast radius and autonomous actions */
module.exports = {
  title: 'Impact assessments: people, blast radius and autonomy', covers: [2],
  blocks: [
    { type: 'video', title: 'Who could this hurt, and how badly?', kicker: 'Module 2.3 · Video 2 of 4', scenes: [
      { t: 'title', kicker: 'Module 2.3 · AI risk management', title: 'Who could this hurt, and how badly?', sub: 'Impact assessments, blast radius and autonomous actions', icon: 'target',
        say: 'Risk assessment asks what could go wrong for the organisation. Impact assessment asks what could go wrong for people, and how far the damage could spread. | This video covers the main types of impact assessment, blast-radius analysis, and how to assess AI that acts on its own.' },
      { t: 'bullets', title: 'Four kinds of impact assessment', items: [
          { icon: 'fingerprint', h: 'Data protection impact assessment (DPIA)', d: 'GDPR: high-risk processing of personal data', k: 'data' },
          { icon: 'scale', h: 'Fundamental rights impact assessment (FRIA)', d: 'EU AI Act: certain deployers of high-risk AI', k: 'human' },
          { icon: 'users', h: 'AI system impact assessment', d: 'ISO/IEC 42001 and 42005: individuals, groups and society', k: 'model' },
          { icon: 'building', h: 'Algorithmic impact assessment', d: 'Public-sector tools that score impact and set required measures', k: 'neutral' } ],
        say: 'You will meet four main kinds of impact assessment, and they overlap. | A data protection impact assessment is required by the GDPR before processing personal data in ways likely to be high risk, which covers many AI uses. | A fundamental rights impact assessment is required by the EU AI Act for public bodies and certain private deployers, such as credit and insurance providers, before using high-risk AI. | An AI system impact assessment, required by ISO forty-two thousand and one and described in ISO forty-two thousand and five, looks at consequences for individuals, groups and society across the life cycle. | And algorithmic impact assessments, used by governments such as Canada’s, score a system’s impact level and set the safeguards each level requires. A single well-designed assessment can satisfy several of these at once.' },
      { t: 'bullets', title: 'What a good assessment covers', layout: 'grid', cols: 2, items: [
          { icon: 'target', h: 'Purpose and context', d: 'What it does, where, and for whom', k: 'neutral' },
          { icon: 'users', h: 'Affected people', d: 'Users and non-users; vulnerable groups', k: 'human' },
          { icon: 'alert', h: 'Potential harms', d: 'Physical, financial, psychological, rights, societal', k: 'threat' },
          { icon: 'scale', h: 'Severity and likelihood', d: 'Including scale and reversibility', k: 'model' },
          { icon: 'shield', h: 'Mitigations and oversight', d: 'Controls, human review, redress', k: 'control' },
          { icon: 'gavel', h: 'Decision and review', d: 'Residual impact, sign-off, next review', k: 'data' } ],
        say: 'Whatever its name, a good assessment covers six things. | Purpose and context: what the system does, where, and for whom. | Affected people: users and non-users alike, with attention to vulnerable groups. | Potential harms: physical, financial, psychological, harms to rights such as privacy and non-discrimination, and wider societal harms. | Severity and likelihood, including how many people could be affected and whether the harm can be reversed. | Mitigations and oversight, including human review and routes to redress. | And the decision: the residual impact, who signed it off, and when it will be reviewed.' },
      { t: 'flow', title: 'Blast radius: how far could it spread?',
        nodes: [
          { id: 'ag', x: 800, y: 600, icon: 'robot', label: 'Hijacked agent', sub: 'manipulated by injected text', k: 'threat', w: 340 },
          { id: 'mail', x: 270, y: 400, icon: 'chat', label: 'Email', sub: 'send as the company', k: 'neutral', w: 280 },
          { id: 'crm', x: 270, y: 740, icon: 'database', label: 'Customer data', sub: 'read and export', k: 'data', w: 300 },
          { id: 'pay', x: 1330, y: 400, icon: 'money', label: 'Payments', sub: 'approve refunds', k: 'human', w: 280 },
          { id: 'files', x: 1330, y: 740, icon: 'archive', label: 'File shares', sub: 'delete or alter', k: 'neutral', w: 280 },
          { id: 'peer', x: 800, y: 290, icon: 'network', label: 'Other agents', sub: 'delegate tasks', k: 'model', w: 300 } ],
        edges: [{ from: 'ag', to: 'mail', k: 'threat' }, { from: 'ag', to: 'crm', k: 'threat' }, { from: 'ag', to: 'pay', k: 'threat' }, { from: 'ag', to: 'files', k: 'threat' }, { from: 'ag', to: 'peer', k: 'threat' }],
        steps: [
          { show: 'ag', hi: 'ag' },
          { show: 'mail crm ag-mail ag-crm', flow: 'ag-mail ag-crm', mark: { mail: 'bad', crm: 'bad' } },
          { show: 'pay files ag-pay ag-files', flow: 'ag-pay ag-files', mark: { pay: 'bad', files: 'bad' } },
          { show: 'peer ag-peer', flow: 'ag-peer', mark: { peer: 'bad' } },
          { hi: 'ag', note: { x: 800, y: 790, w: 440, text: 'Shrink the radius: scope, isolate, limit, approve.' } } ],
        say: 'Blast radius is a security idea: if this system misbehaves or is compromised, everything it can reach is in the zone of damage. Imagine a customer-service agent manipulated by text hidden in an email it reads. | It can send email as the company and read and export customer records, so it could run a phishing campaign or leak data. | It can approve refunds and change files, so it could move money or destroy records. | And it can delegate to other agents, spreading the problem further. | The blast radius is defined by the agent’s permissions and connections, not by its intended purpose. Reduce it with least privilege, isolation, limits on value and volume, and approval for high-impact actions.' },
      { t: 'bullets', title: 'Assessing autonomous actions', items: [
          { icon: 'tool', h: 'What can it do?', d: 'Every tool, permission and connected system', k: 'model' },
          { icon: 'bolt', h: 'How fast and how often?', d: 'Speed and scale multiply the damage', k: 'threat' },
          { icon: 'rollback', h: 'Can it be undone?', d: 'Irreversible actions need stronger controls', k: 'human' },
          { icon: 'eye', h: 'Who would notice?', d: 'Monitoring, alerts and human oversight', k: 'data' },
          { icon: 'stop', h: 'Can it be stopped?', d: 'Kill switch, revocation and safe fallback', k: 'control' } ],
        say: 'For AI that acts, the assessment asks five extra questions. | What can it do? List every tool, permission and connected system, because that is the blast radius. | How fast and how often? An agent that acts thousands of times an hour can cause harm faster than any person can notice. | Can its actions be undone? Payments, deletions and messages sent externally usually can’t, so they need approval or strict limits. | Who would notice when it goes wrong? Define the monitoring and alerts that would catch misbehaviour. | And can it be stopped? There must be a tested way to halt it, revoke its credentials and fall back safely.' },
      { t: 'summary', items: ['DPIA, FRIA, AI system and algorithmic impact assessments overlap', 'Cover people, harms, severity, mitigations and sign-off', 'Blast radius = everything a system can reach', 'Autonomy: scope, speed, reversibility, detection, stopping'],
        say: 'To recap. | DPIAs, fundamental rights impact assessments, AI system impact assessments and algorithmic impact assessments overlap, so design one process that satisfies them all. | Cover affected people, harms, severity, mitigations and a documented decision. | Blast radius is everything a system can reach if it misbehaves. | And for autonomous systems, assess scope, speed, reversibility, detection and the ability to stop them.' } ] },
    { type: 'text', md: `### Impact assessment versus risk assessment
A **risk assessment** typically asks how uncertainty affects the *organisation’s* objectives. An **impact assessment** asks how a system could affect *people, groups and society*. ISO/IEC 42001 requires both: an AI risk assessment (clause 6.1.2) and an AI system impact assessment (clause 6.1.4). In practice the impact assessment feeds the risk assessment: severe impacts on people become legal, reputational and ethical risks for the organisation.

### The main assessment types
| Assessment | Source | When required | Focus |
|---|---|---|---|
| **DPIA** | GDPR Article 35 | Before processing likely to result in high risk to individuals (for example, systematic profiling, large-scale special-category data, innovative technology) | Necessity, proportionality, risks to data subjects, mitigating measures; prior consultation with the regulator if high risk remains (Article 36) |
| **FRIA** | EU AI Act Article 27 | Before deploying high-risk AI, for public bodies, private entities providing public services, and deployers assessing creditworthiness or pricing life and health insurance | Deployer’s processes, affected categories of people, specific risks of harm, human oversight, measures if risks materialise; results notified to the market surveillance authority; can build on a DPIA |
| **AI system impact assessment** | ISO/IEC 42001 (6.1.4); guidance in ISO/IEC 42005:2025 | For AI systems within the AIMS scope, across the lifecycle | Consequences for individuals, groups and society, including foreseeable misuse; documented and used in risk treatment |
| **Algorithmic impact assessment** | Public-sector policies, such as Canada’s Directive on Automated Decision-Making | Before government automated decision systems are used | A questionnaire produces an impact level (I to IV), each with mandatory measures such as peer review, notice, human involvement and explanation |

### Running an impact assessment
1. **Describe** the system: purpose, context, data, model, outputs, decisions influenced, degree of autonomy.
2. **Identify stakeholders:** users, people subject to decisions, bystanders, and **vulnerable groups** such as children, people with disabilities or people in financial difficulty.
3. **Identify potential harms and benefits:** physical, psychological, financial, harms to rights (privacy, non-discrimination, freedom of expression, due process), and societal or environmental harms. Include **foreseeable misuse**, not only intended use.
4. **Assess severity and likelihood,** considering scale (how many people), reversibility, and whether harm falls disproportionately on some groups.
5. **Define mitigations:** design changes, controls, human oversight, transparency, redress mechanisms.
6. **Decide and document:** residual impact, who accepted it, conditions, and the review date.
7. **Revisit** on change and periodically.

Involving **affected stakeholders** (or their representatives) improves assessments significantly; people who live with the consequences notice harms that designers miss.

### Blast radius
In security, **blast radius** is the extent of damage if a component fails or is compromised. For AI, it is determined by:
- **Data reach:** what information the system can read, and therefore leak.
- **Action reach:** what it can change, send, buy, delete or approve.
- **Connection reach:** which other systems, agents and users its outputs flow into.
- **Scale:** how many users, records or transactions it touches, and how quickly.

The radius depends on **permissions and integrations, not intentions**. An assistant designed to answer questions but connected with a broad service account has the blast radius of that account. Reducing blast radius is one of the most effective treatments: least-privilege credentials, segmentation, per-action limits, approval gates, and the ability to revoke access instantly.

### Assessing autonomous actions
Autonomy changes the impact profile. For agentic systems, assess:
- the **actions** available and the **authority** under which they run (the user’s, a service account’s, or delegated);
- **speed and volume**, since automated actions can cause harm faster than humans can respond;
- **reversibility** of each action;
- **detection**: how misbehaviour would be noticed, and how quickly;
- **interruption**: kill switches, credential revocation, rollback and safe fallback modes;
- **delegation**: whether the agent can hand tasks to other agents, extending the radius.

The output of this assessment drives the operational mode (Module 1.3) and the agent controls covered in Domain 4.`, },
    { type: 'tabs', title: 'Three systems, three impact profiles', items: [
      ['Internal meeting summariser', '**Affected people:** meeting participants. **Main harms:** inaccurate summaries; sensitive discussions stored longer than expected. **Blast radius:** read-only access to meeting recordings for invited users. **Outcome:** low impact; standard DPIA screening, retention limits, and a notice to participants.'],
      ['Tenant screening model', '**Affected people:** rental applicants, including vulnerable groups. **Main harms:** discriminatory refusals; inaccurate data leading to wrongful rejection; lack of explanation. **Blast radius:** influences housing decisions for thousands of applicants. **Outcome:** high impact; full impact assessment and DPIA, bias testing, explanations, human review of refusals, appeal route.'],
      ['IT operations agent', '**Affected people:** all staff relying on IT services. **Main harms:** outages from wrong configuration changes; security exposure. **Blast radius:** administrative access to cloud infrastructure. **Outcome:** high operational impact; scoped credentials, change approval for production, rate limits, rollback, and a kill switch.'] ] },
    { type: 'callout', kind: 'exam', title: 'One assessment, several obligations', md: `When a scenario mentions **GDPR, the AI Act and ISO/IEC 42001** together, the efficient answer is usually an **integrated impact assessment** that covers data protection, fundamental rights and broader societal impacts, rather than separate, disconnected documents. The AI Act itself allows a FRIA to build on an existing DPIA.` },
    { type: 'check', q: { q: 'An AI assistant intended only to answer staff questions is connected to an administrator account with write access to the HR system. How should its blast radius be assessed?', o: ['By its intended purpose of answering staff questions, which makes the blast radius small', 'By the permissions and connections it actually has, including everything the admin account can change', 'By the number of questions it answers per day, which determines how many staff members it could affect in total', 'By the accuracy of its answers in testing, since wrong answers are the main way it could cause harm'], a: 1, b: 2,
      why: 'Blast radius is defined by reach, not intent. A compromised or manipulated assistant can do anything its credentials allow, so least-privilege access is the key treatment.' } }
  ]
};
