/* 5.1 · Section 2: AI operational roles and responsibilities (model owners, data owners) */
module.exports = {
  title: 'AI operational roles and responsibilities', covers: [2],
  blocks: [
    { type: 'video', title: 'Who does what when AI is live', kicker: 'Module 5.1 · Video 2 of 5', scenes: [
      { t: 'title', kicker: 'Module 5.1 · AI SecOps foundations', title: 'Who does what when AI is live', sub: 'Operational roles and responsibilities', icon: 'users',
        say: 'When an AI system misbehaves at three in the morning, nobody should be asking who owns it, who can switch it off, or who tells the regulator. | This video covers the operational roles and responsibilities that keep AI systems running safely.' },
      { t: 'bullets', title: 'Operational roles', layout: 'grid', cols: 2, items: [
          { icon: 'user', h: 'Model owner', d: 'Accountable for the model in production', k: 'human' },
          { icon: 'database', h: 'Data owner', d: 'Accountable for data the model uses', k: 'data' },
          { icon: 'gear', h: 'MLOps and platform', d: 'Run pipelines, serving and rollback', k: 'neutral' },
          { icon: 'eye', h: 'Security operations', d: 'Monitor, detect and respond', k: 'threat' },
          { icon: 'gavel', h: 'Risk and compliance', d: 'Oversight, reporting, regulators', k: 'model' },
          { icon: 'hitl', h: 'Human overseers', d: 'Review, override, escalate', k: 'control' } ],
        say: 'Six roles matter most once AI is live. | The model owner, usually in the business, is accountable for the model in production: its use, its outcomes and decisions to restrict or retire it. | The data owner is accountable for the data the model uses, including training, retrieval and logs. | MLOps and platform engineers run the pipelines and serving infrastructure, and carry out rollbacks. | Security operations monitors, detects and responds to threats. | Risk and compliance provide oversight, reporting and the link to regulators. | And human overseers review outputs, override the AI when it is wrong, and escalate concerns.' },
      { t: 'compare', title: 'Who does what in an AI incident', labels: ['Spot poisoning', 'Model rollback', 'Notification', 'Tune detection'],
        cols: [{ h: 'Security ops', icon: 'eye', k: 'threat' }, { h: 'MLOps', icon: 'gear', k: 'neutral' }, { h: 'Model owner', icon: 'user', k: 'human' }],
        rows: [
          ['Responsible', 'Consulted', 'Informed'],
          ['Consulted', 'Responsible', 'Accountable'],
          ['Consulted', 'Informed', 'Accountable, with legal'],
          ['Responsible', 'Consulted', 'Informed'] ],
        say: 'A responsibility matrix makes roles concrete. Here is part of one for an AI incident. | Detecting a poisoning signal is security operations’ responsibility. MLOps is consulted, and the model owner is informed. | Rolling back the model is carried out by MLOps, with security consulted, and the decision belongs to the model owner. | Notifying customers or regulators is the model owner’s decision, made with legal and compliance, while security advises. | And tuning the detection rules afterwards falls back to security operations, consulting MLOps.' },
      { t: 'bullets', title: 'Making roles work in practice', layout: 'grid', cols: 2, items: [
          { icon: 'id', h: 'Named people', d: 'Not just team names', k: 'human' },
          { icon: 'users', h: 'Deputies and rotas', d: 'Cover at every hour', k: 'neutral' },
          { icon: 'book', h: 'Recorded centrally', d: 'Registry and runbooks', k: 'data' },
          { icon: 'power', h: 'Decision rights agreed', d: 'Who may stop a model', k: 'threat' },
          { icon: 'cap', h: 'Trained and exercised', d: 'People know their part', k: 'control' },
          { icon: 'cycle', h: 'Reviewed regularly', d: 'After changes and incidents', k: 'model' } ],
        say: 'Six practices turn role definitions into reality. | Assign named people, not just team names. | Give every role deputies and on-call rotas, so someone is reachable at any hour. | Record roles centrally, in the model registry and the runbooks. | Agree decision rights in advance, especially who may switch off or restrict a model without waiting for permission. | Train people and exercise the roles together. | And review assignments after reorganisations, staff changes and incidents.' },
      { t: 'summary', items: ['Model owner, data owner, MLOps, SecOps, risk, human overseers', 'Use a RACI so responsibility and accountability are explicit', 'Named people, deputies and on-call cover', 'Pre-agree who may stop or restrict a model'],
        say: 'To recap. | The key operational roles are the model owner, data owner, MLOps and platform engineers, security operations, risk and compliance, and human overseers. | Use a responsibility matrix, so it is clear who does the work and who decides. | Assign named people, with deputies and on-call cover. | And agree in advance who may stop or restrict a model, so nobody hesitates in a crisis.' } ] },
    { type: 'text', md: `### Roles and responsibilities
| Role | Operational responsibilities |
|---|---|
| **Model owner** | Accountable for the model in production: approves releases and rollbacks, accepts residual risk, decides on restriction or retirement, owns external communication decisions with legal |
| **Technical owner** | Day-to-day health of the model: performance, monitoring plan, fixes and retraining |
| **Data owner** | Accountable for training, retrieval and log data: approves uses, access and retention; leads data aspects of incidents such as poisoning or leakage (Module 3.1 covers data owners, stewards and custodians) |
| **MLOps and platform engineering** | Pipelines, serving, scaling, configuration management, rollback and recovery |
| **Security operations (SOC)** | AI telemetry, detection rules, triage, containment actions, threat intelligence (Modules 5.2 to 5.5) |
| **AI incident lead** | Coordinates response across teams; owns the incident timeline and decisions log |
| **Risk, compliance and legal** | Oversight, regulatory notifications, contractual obligations, evidence preservation |
| **Human overseers** | Review and override AI outputs in operation; report anomalies (EU AI Act Articles 14 and 26 require competent, trained people with authority for high-risk systems) |
| **Providers and vendors** | Their share of responsibilities under the shared responsibility model (Module 2.5) |

### RACI in practice
**Responsible** people do the work; the **accountable** person makes the decision and answers for it (only one per task); **consulted** people give input; **informed** people are kept up to date. Build a RACI for each critical activity: release, monitoring, rollback, incident containment, external notification, retraining and retirement.

### Decision rights
The most important decision to agree in advance is **who may stop or restrict an AI system** in an emergency. On-call engineers should be able to take pre-approved containment actions, such as switching to a fallback, restricting features or disabling an agent, without waiting for a meeting, with the model owner informed immediately.` },
    { type: 'match', title: 'Who is accountable?', pairs: [
      ['Deciding to retire a credit-scoring model', 'Model owner'],
      ['Approving a new use of customer data for retraining', 'Data owner'],
      ['Executing the rollback to the previous model version', 'MLOps / platform team'],
      ['Writing a detection rule for prompt injection attempts', 'Security operations'],
      ['Overriding a model’s recommendation in a live case', 'Human overseer'] ] },
    { type: 'callout', kind: 'exam', title: 'Role questions', md: `Remember the difference between **responsible** (does the work) and **accountable** (owns the decision). In AI operations, the **model owner** is usually accountable for production decisions, while MLOps and the SOC are responsible for executing them. Shared or unclear ownership is a finding in itself.` },
    { type: 'check', q: { q: 'During an incident, MLOps engineers want to roll back a customer-facing model, but nobody is sure who may authorise it, and the decision waits two hours. What should be fixed?', o: ['Give every engineer authority to change any production model whenever they think it necessary', 'Define decision rights in advance, including pre-approved containment actions for on-call staff', 'Require every rollback to be approved by the full executive committee in future', 'Remove the rollback option, so that engineers aren’t faced with this decision again'], a: 1, b: 2,
      why: 'Pre-agreed decision rights and pre-approved containment let on-call staff act quickly within limits, with the model owner accountable. Unlimited authority removes control, executive approval is too slow, and removing rollback removes recovery.' } }
  ]
};
