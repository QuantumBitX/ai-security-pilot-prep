/* 2.6 · Section 1: HITL/HOTL oversight; intervention, override and sign-off authorities */
module.exports = {
  title: 'Human oversight and decision authorities', covers: [1, 2],
  blocks: [
    { type: 'video', title: 'Who can stop it?', kicker: 'Module 2.6 · Video 1 of 4', scenes: [
      { t: 'title', kicker: 'Module 2.6 · Accountability and audit', title: 'Who can stop it?', sub: 'Oversight models, and the authority to intervene, override and sign off', icon: 'hitl',
        say: 'Human oversight is only as strong as the authority behind it. A reviewer who can’t say no, or an operator who doesn’t know they may pull the plug, provides no protection at all. | This video looks at oversight from a governance angle: who holds which authority, how it is exercised, and how it is recorded.' },
      { t: 'compare', title: 'Oversight models as governance', labels: ['Decision point', 'Human role', 'Needs', 'Fails when'],
        cols: [{ h: 'Human in the loop', icon: 'hitl', k: 'human' }, { h: 'Human on the loop', icon: 'eye', k: 'model' }],
        rows: [
          ['Before each decision takes effect', 'While the system operates'],
          ['Approver', 'Supervisor who can intervene'],
          ['Time, evidence, authority to refuse', 'Real-time visibility, alerts, stop controls'],
          ['Approval becomes a rubber stamp', 'Alerts overwhelm, or action comes too late'] ],
        say: 'Module one point three introduced the operational modes. Here is what each demands from governance. | With a human in the loop, the human acts before each decision takes effect. With a human on the loop, the human supervises while the system operates. | In the loop, the human is an approver. On the loop, a supervisor who can intervene. | Approvers need time, evidence and a genuine right to refuse. Supervisors need real-time visibility, meaningful alerts and controls that actually stop the system. | And they fail differently: approval decays into rubber-stamping; supervision fails when alerts overwhelm people, or when they act too late.' },
      { t: 'bullets', title: 'Four kinds of authority', layout: 'grid', cols: 2, items: [
          { icon: 'sliders', h: 'Intervention', d: 'Pause, adjust or redirect a running process', k: 'model' },
          { icon: 'rollback', h: 'Override', d: 'Replace the AI’s output with a human decision', k: 'human' },
          { icon: 'pen', h: 'Sign-off', d: 'Formal approval at gates: launch, change, risk acceptance', k: 'control' },
          { icon: 'stop', h: 'Stop', d: 'Halt the system entirely, immediately and safely', k: 'threat' } ],
        say: 'Oversight relies on four distinct authorities. | Intervention: the power to pause, adjust or redirect a running process, such as holding an agent’s queue of actions. | Override: the power to replace the AI’s output with a human decision, for example reversing a declined application. | Sign-off: formal approval at defined gates, such as going live, making a significant change, or accepting residual risk. | And stop: the power to halt the system entirely, immediately and safely. Each needs a named holder, a deputy, and a recorded way of exercising it.' },
      { t: 'compare', title: 'An authority matrix (example)', labels: ['Approve go-live', 'Override a decision', 'Emergency stop', 'Accept residual risk'],
        cols: [{ h: 'Who holds it', icon: 'user', k: 'human' }, { h: 'Must have', icon: 'check', k: 'control' }],
        rows: [
          ['Business owner; committee for high tiers', 'Assessments complete; tests passed'],
          ['Trained reviewer or case handler', 'Evidence, time, no penalty for overriding'],
          ['On-call operations, owner or security lead', 'A tested kill switch and runbook'],
          ['Executive within risk appetite', 'Documented rationale and review date'] ],
        say: 'An authority matrix makes this explicit. Here is an example. | Approving go-live sits with the business owner, or with the governance committee for higher tiers, and only after assessments and tests are complete. | Overriding an individual decision sits with trained reviewers or case handlers, who need the evidence, the time, and freedom to override without penalty. | An emergency stop can be invoked by on-call operations, the system owner or a security lead, using a kill switch and runbook that have been tested. | And accepting residual risk sits with an executive acting within the board’s risk appetite, with a documented rationale and review date.' },
      { t: 'flow', title: 'Escalation, with an emergency path',
        nodes: [
          { id: 'rev', x: 200, y: 360, icon: 'user', label: 'Reviewer', sub: 'raises a concern', k: 'human', w: 250 },
          { id: 'own', x: 560, y: 360, icon: 'id', label: 'System owner', k: 'model', w: 250 },
          { id: 'com', x: 930, y: 360, icon: 'users', label: 'Governance committee', k: 'control', w: 300 },
          { id: 'exe', x: 1320, y: 360, icon: 'building', label: 'Executive', sub: 'risk acceptance', k: 'neutral', w: 260 },
          { id: 'stop', x: 560, y: 700, icon: 'stop', label: 'Stop the system', sub: 'anyone authorised, any time', k: 'threat', w: 320 } ],
        edges: [{ from: 'rev', to: 'own', k: 'human' }, { from: 'own', to: 'com', k: 'model' }, { from: 'com', to: 'exe', k: 'control' }, { from: 'rev', to: 'stop', k: 'threat', label: 'imminent harm' }],
        steps: [
          { show: 'rev', hi: 'rev' },
          { show: 'own rev-own', flow: 'rev-own', hi: 'own' },
          { show: 'com exe own-com com-exe', flow: 'own-com com-exe', hi: 'com' },
          { show: 'stop rev-stop', flow: 'rev-stop', hi: 'stop', note: { x: 1120, y: 660, w: 560, text: 'Stopping is never wrong when harm is imminent; investigate afterwards.' } } ],
        say: 'Concerns need a clear escalation path. A reviewer notices something wrong, such as a pattern of questionable decisions. | They escalate to the system owner, who can investigate and adjust. | Issues that need a policy decision or risk acceptance go to the governance committee, and, if the residual risk is high, to an executive. | But when harm is imminent, there must be a shortcut: anyone with stop authority can halt the system first and investigate afterwards. Organisations should make clear that a good-faith stop will never be punished.' },
      { t: 'bullets', title: 'Making authority real', items: [
          { icon: 'doc', h: 'Write it down', d: 'Policy, RACI and runbooks name holders and deputies', k: 'neutral' },
          { icon: 'cap', h: 'Train the holders', d: 'People know they hold authority, and how to use it', k: 'human' },
          { icon: 'tool', h: 'Build and test the controls', d: 'Override buttons and kill switches that work', k: 'control' },
          { icon: 'shield', h: 'Protect good-faith use', d: 'No penalty for overriding or stopping', k: 'model' },
          { icon: 'list', h: 'Log every exercise', d: 'Who intervened, when, why and with what effect', k: 'data' } ],
        say: 'Five things make authority real. | Write it down: policy, a RACI matrix and runbooks name who holds each authority, and their deputies. | Train the holders, so they know they have the authority and how to use it under pressure. | Build and test the controls: override buttons that work, and kill switches that are exercised regularly, not discovered during an incident. | Protect good-faith use, so nobody is penalised for overriding or stopping a system in good faith. | And log every exercise of authority: who intervened, when, why and with what effect. Those logs are also key audit evidence.' },
      { t: 'summary', items: ['HITL approves before; HOTL supervises during', 'Intervene, override, sign off, stop: four distinct authorities', 'An authority matrix names holders, deputies and prerequisites', 'Escalation path plus an emergency stop; log every use'],
        say: 'To recap. | Human in the loop approves before decisions take effect; human on the loop supervises during operation. | Intervention, override, sign-off and stop are four distinct authorities. | An authority matrix names their holders, deputies and prerequisites. | And every system needs an escalation path plus an emergency stop, with every exercise of authority logged.' } ] },
    { type: 'text', md: `### Oversight from a governance perspective
Module 1.3 described **human-in-the-loop (HITL)**, **human-on-the-loop (HOTL)** and automated operation as operational modes. Governance asks a different question: *who is accountable, who holds which authority, and how do we know they can and do exercise it?* The EU AI Act puts this into law for high-risk systems: deployers must assign human oversight to people with the necessary **competence, training and authority** (Article 26), and systems must allow overseers to override, reverse or interrupt them (Article 14).

| | HITL governance | HOTL governance |
|---|---|---|
| Accountability | The approver owns each decision they sign off | The supervisor owns timely intervention; the system owner owns the design of alerts and controls |
| Key enablers | Evidence presented with each recommendation; realistic workload; authority to refuse | Dashboards, meaningful alerts, tested stop and rollback controls, on-call cover |
| Metrics | Override and reject rates, review time per case, sampled quality of approvals | Time to detect and intervene, alert precision, frequency of interventions |
| Typical failure | Rubber-stamping through automation bias and volume | Alert fatigue; supervision assigned to someone without time or authority |

### The four authorities
- **Intervention authority:** the right to pause, throttle, reroute or adjust a running system or workflow (for example, holding an agent’s pending actions, or routing all cases to manual review).
- **Override authority:** the right to replace an AI output with a human decision in an individual case. Overrides should be easy, recorded with a reason, and analysed: patterns of overrides reveal model problems.
- **Sign-off authority:** formal approval at lifecycle gates: design approval, pre-deployment approval, approval of significant changes, and acceptance of residual risk. Sign-off must be by someone with authority proportionate to the risk tier.
- **Stop authority:** the right to halt a system entirely. It should be held by several people (operations, system owner, security), exercisable at any time, backed by a tested **kill switch** or circuit breaker (Module 5.7), and protected by a policy that good-faith stops are never penalised.

### Authority matrices and RACI
A **RACI** matrix records who is **Responsible** (does the work), **Accountable** (owns the outcome; one person), **Consulted** and **Informed** for each activity. For AI, extend it with explicit **decision rights** and **deputies**, so that authority is never unavailable at the moment it is needed. Typical rows: approving a use case, approving deployment, approving model changes, overriding decisions, invoking emergency stop, accepting residual risk, approving exceptions, and approving retirement.

### Escalation
Escalation paths should be documented, short, and tested:
1. **Front-line reviewers or operators** raise concerns through a defined channel.
2. The **system owner** investigates and can intervene or adjust.
3. Policy questions, significant risks and disputes go to the **AI governance committee**.
4. Residual risk beyond the committee’s authority goes to an **executive** or the board.

The **emergency path** bypasses the hierarchy: where harm is imminent (for example, an agent making unauthorised payments, or a model producing dangerous advice at scale), anyone with stop authority halts the system first. Speed matters more than permission in that moment, and the post-incident review examines the decision later.

### Records
Every use of authority should leave a record: approvals and sign-offs with their evidence, overrides with reasons, interventions and stops with timestamps and effects. These records are **governance artefacts** (Section 3) and core **audit evidence** (Section 4).`, },
    { type: 'match', title: 'Name the authority', pairs: [
      ['A claims handler reverses the model’s recommendation to deny a claim', 'Override'],
      ['The governance committee approves a tier-3 system for production', 'Sign-off'],
      ['An operator pauses an agent’s outgoing emails while a pattern is investigated', 'Intervention'],
      ['The on-call engineer disables a chatbot that is giving dangerous advice', 'Stop'] ] },
    { type: 'callout', kind: 'exam', title: 'Authority must match accountability', md: `Look for answers where the person exercising oversight has **competence, time, information and authority**. Distractors include oversight assigned to someone junior with no power to act, approval by the team that built the system, or a kill switch that requires a committee meeting to use.` },
    { type: 'scenario', title: 'The weekend agent', md: `An agent processes supplier refunds 24 hours a day. On Saturday night, monitoring shows it issuing refunds at ten times the normal rate. The on-call engineer can see the problem but believes only the head of finance may stop the system, and she can’t be reached until Monday.`,
      q: { q: 'What governance failure does this MOST clearly reveal?', o: ['The model was not accurate enough, so the agent misread the situation and took harmful actions', 'Stop authority wasn’t assigned to available, trained people with a tested kill switch and protection', 'The monitoring threshold was too sensitive, so staff had learned to ignore alerts from the agent', 'The agent should have run only during office hours, when more people were available to supervise it'], a: 1, b: 2,
        why: 'Monitoring worked, but nobody available believed they could act. Stop authority must be held by people on call, documented, practised and protected, so harm can be halted immediately and reviewed afterwards.' } },
    { type: 'check', q: { q: 'Under the EU AI Act, what must deployers of high-risk systems ensure about the people assigned to human oversight?', o: ['They are the system’s developers, who understand how it works', 'They have the necessary competence, training and authority', 'They review a sample of outputs at least once each year', 'They are external consultants, to guarantee independence'], a: 1, b: 1,
      why: 'Article 26 requires deployers to assign oversight to natural persons with the competence, training and authority needed, and Article 14 requires systems to let them override or interrupt the system.' } }
  ]
};
