/* 5.1 · Section 1: core security principles in AI operations (PoLP, SoD) */
module.exports = {
  title: 'Core security principles in AI operations', covers: [1],
  blocks: [
    { type: 'video', title: 'Principles under pressure', kicker: 'Module 5.1 · Video 1 of 5', scenes: [
      { t: 'title', kicker: 'Module 5.1 · AI SecOps foundations', title: 'Principles under pressure', sub: 'Core security principles in AI operations', icon: 'shield',
        say: 'Design principles only protect you if day-to-day operations live by them. Least privilege and separation of duties have to survive on-call rotas, urgent fixes and late-night incidents. | This video covers the core security principles in AI operations, and how to keep them when the pressure is on.' },
      { t: 'bullets', title: 'Principles in AI operations', layout: 'grid', cols: 2, items: [
          { icon: 'lock', h: 'Least privilege in production', d: 'No standing access; elevate when needed', k: 'control' },
          { icon: 'users', h: 'Separation of duties', d: 'Author, approver, deployer apart', k: 'human' },
          { icon: 'layers', h: 'Defence in depth', d: 'Guardrails, monitoring, recovery', k: 'neutral' },
          { icon: 'shieldcheck', h: 'Secure defaults', d: 'New models and agents start restricted', k: 'data' },
          { icon: 'stop', h: 'Fail safe', d: 'Safety controls fail closed', k: 'threat' },
          { icon: 'audit', h: 'Accountability', d: 'Every operational action attributable', k: 'model' } ],
        say: 'Six principles anchor AI operations. | Least privilege in production: no standing administrative access, with elevation only when a task requires it. | Separation of duties: the person who writes a change, the person who approves it, and the pipeline that deploys it are separate. | Defence in depth: guardrails, monitoring and tested recovery, so no single failure is fatal. | Secure defaults: new models, agents and tools start with restricted access. | Fail safe: when a safety or security control breaks, it fails closed. | And accountability: every operational action is attributable to a person or identity, and logged.' },
      { t: 'compare', title: 'When pressure meets principle', labels: ['Urgent fix', 'Incident access', 'New model', 'Monitoring'],
        cols: [{ h: 'Shortcut', icon: 'bolt', k: 'threat' }, { h: 'Principled option', icon: 'shieldcheck', k: 'control' }],
        rows: [
          ['Edit the prompt live in production', 'Emergency change through the pipeline'],
          ['Shared admin login', 'Break-glass access, logged and reviewed'],
          ['Deploy with broad access, tighten later', 'Restricted by default, widened on approval'],
          ['The team watches its own system', 'Independent visibility for the SOC'] ],
        say: 'The test of a principle is what happens under pressure. | For an urgent fix, the shortcut is to edit the prompt directly in production. The principled option is an emergency change that still goes through the pipeline. | During an incident, the shortcut is a shared administrator login. The principled option is break-glass access that is logged and reviewed. | For a new model, the shortcut is to deploy with broad access and tighten later, which rarely happens. The principled option is to start restricted and widen on approval. | And for monitoring, the shortcut is letting the team watch its own system. The principled option gives the security operations centre independent visibility.' },
      { t: 'flow', title: 'An emergency change, done safely',
        nodes: [
          { id: 'inc', x: 220, y: 330, icon: 'siren', label: 'Urgent issue', sub: 'harmful outputs live', k: 'threat', w: 280 },
          { id: 'req', x: 680, y: 330, icon: 'doc', label: 'Emergency change', sub: 'logged request', k: 'neutral', w: 300 },
          { id: 'ap', x: 1150, y: 330, icon: 'check', label: 'Fast approval', sub: 'on-call authority', k: 'human', w: 280 },
          { id: 'dep', x: 1150, y: 690, icon: 'pipeline', label: 'Deploy via pipeline', sub: 'tested, signed, recorded', k: 'control', w: 320 },
          { id: 'pir', x: 680, y: 690, icon: 'search', label: 'Review within a day', sub: 'was it right?', k: 'data', w: 300 },
          { id: 'rec', x: 220, y: 690, icon: 'book', label: 'Records updated', sub: 'registry, baseline', k: 'model', w: 290 } ],
        edges: [{ from: 'inc', to: 'req', k: 'threat' }, { from: 'req', to: 'ap', k: 'neutral' }, { from: 'ap', to: 'dep', k: 'human' }, { from: 'dep', to: 'pir', k: 'control' }, { from: 'pir', to: 'rec', k: 'data' }],
        steps: [
          { show: 'inc', hi: 'inc', mark: { inc: 'alert' } },
          { show: 'req inc-req', flow: 'inc-req', hi: 'req' },
          { show: 'ap req-ap', flow: 'req-ap', hi: 'ap' },
          { show: 'dep ap-dep', flow: 'ap-dep', hi: 'dep', mark: { dep: 'lock' } },
          { show: 'pir dep-pir', flow: 'dep-pir', hi: 'pir' },
          { show: 'rec pir-rec', flow: 'pir-rec', hi: 'rec', mark: { rec: 'ok' } } ],
        say: 'Here is how an emergency change keeps its principles. An urgent issue appears: say, an assistant producing harmful outputs in production. | An emergency change request is logged, even if it takes two minutes to write. | Approval comes quickly from someone with pre-agreed on-call authority, not from a full change board. | The fix is deployed through the normal pipeline, so it is tested, signed and recorded, rather than typed into a live console. | Within a day, a post-implementation review checks that the change was right and complete. | And the registry, configuration baseline and documentation are updated, so the emergency fix doesn’t become invisible drift.' },
      { t: 'summary', items: ['No standing production access; separate author, approver, deployer', 'Defence in depth, secure defaults, fail safe, accountability', 'Pressure is the real test: use emergency paths, not shortcuts', 'Emergency changes: logged, fast-approved, pipelined, reviewed'],
        say: 'To recap. | Hold no standing production access, and keep the author, approver and deployer of changes separate. | Apply defence in depth, secure defaults, fail-safe behaviour and accountability. | Pressure is the real test of principles, so provide fast, controlled emergency paths instead of shortcuts. | And make emergency changes logged, quickly approved, deployed through the pipeline and reviewed afterwards.' } ] },
    { type: 'text', md: `### Principles in practice
| Principle | In AI operations |
|---|---|
| **Least privilege** | Zero standing access to production models, weights, prompts, guardrails and training data; just-in-time elevation (Module 4.6); on-call engineers get only the rights their runbooks need |
| **Separation of duties** | Change authors don’t approve their own changes; deployments run through pipelines with their own identities; the team operating a model isn’t the only team monitoring it |
| **Defence in depth** | Guardrails, authorisation outside the model, monitoring, rate limits, rollback and backups together |
| **Secure defaults** | New models, agents, tools and environments start with minimal permissions, logging on, and outbound access off |
| **Fail safe** | Moderation, DLP and authorisation fail closed; agents stop and escalate on errors (Modules 3.6 and 4.4) |
| **Accountability** | Unique identities for people and agents; every change and privileged action logged (Module 4.5) |
| **Continuous verification** | Configurations, permissions and behaviour checked continuously, not just at release (Section 5) |

### An operational separation-of-duties matrix
Decide in advance who may perform each sensitive operation, and which combinations are forbidden:
- **Deploying a model** (platform team, through the pipeline) versus **approving it** (risk owner).
- **Changing prompts or guardrails** (product team, through change control) versus **changing detection rules** (security operations).
- **Accessing weights or training data** (just-in-time, with approval) versus **administering the identity system**.
- **Running incident containment** (on-call engineer) versus **closing the incident** (incident lead, after review).

### Emergency changes
Emergencies need speed, not exceptions to accountability. Define an **emergency change path** in advance: a minimal logged request, pre-authorised approvers, deployment through the pipeline, and a review within a set time (often 24 to 72 hours). Changes made outside it, such as live edits in a console, should trigger drift alerts (Section 5).

### Framework anchors
The NIST Cybersecurity Framework 2.0 functions (Govern, Identify, Protect, Detect, Respond, Recover) apply to AI operations as to any other. ISO/IEC 27001 Annex A includes operational controls for change management (8.32), configuration management (8.9), logging (8.15) and monitoring (8.16), which extend naturally to models, prompts and guardrails.` },
    { type: 'callout', kind: 'exam', title: 'Operations principle questions', md: `Under time pressure, the best answer still keeps **accountability and control**: an **emergency change path**, **break-glass** access, deployment **through the pipeline**, and a **review afterwards**. Answers that skip logging or approval "because it’s urgent" are traps.` },
    { type: 'check', q: { q: 'On a Friday night, a production assistant starts giving customers dangerous advice. The on-call engineer can either edit the system prompt live in the admin console or raise an emergency change. What should happen?', o: ['Edit the prompt live, because customer safety outweighs any process, and document the change on Monday', 'Use the emergency change path: logged, fast approval, deploy via the pipeline, review afterwards', 'Wait until Monday’s change board, because all prompt changes need full approval first', 'Switch off monitoring for the weekend, so the alerts don’t distract the on-call engineer'], a: 1, b: 1,
      why: 'The emergency path delivers speed with accountability: the fix is approved, tested, recorded and reviewed. Live edits bypass testing and records, waiting leaves customers at risk, and disabling monitoring removes visibility.' } }
  ]
};
