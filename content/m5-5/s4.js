/* 5.5 · Section 4: pipeline suspension and agent termination */
module.exports = {
  title: 'Pipeline suspension and agent termination', covers: [4],
  blocks: [
    { type: 'video', title: 'Pulling the brake', kicker: 'Module 5.5 · Video 4 of 5', scenes: [
      { t: 'title', kicker: 'Module 5.5 · AI incident response', title: 'Pulling the brake', sub: 'Suspending pipelines and terminating agents', icon: 'stop',
        say: 'Some AI incidents keep getting worse on their own. A poisoned pipeline retrains and redeploys on schedule, and a hijacked agent keeps acting until someone stops it. | This video covers suspending AI pipelines and terminating agents safely.' },
      { t: 'compare', title: 'Suspend the pipeline or terminate the agent?', labels: ['Use when', 'What stops', 'Preserve', 'Main risk'],
        cols: [{ h: 'Suspend pipeline', icon: 'pipeline', k: 'data' }, { h: 'Terminate agent', icon: 'robot', k: 'threat' }],
        rows: [
          ['Poisoned data or tampered build', 'Agent hijacked or acting harmfully'],
          ['Ingestion, training, deployment', 'Sessions, tasks, scheduled jobs'],
          ['Artefacts, logs, job queues', 'Memory, traces, pending actions'],
          ['Stale models stay in service', 'Half-finished transactions'] ],
        say: 'Two brakes do different jobs. | Suspend a pipeline when data may be poisoned or a build tampered with. Terminate an agent when it has been hijacked or is acting harmfully. | Suspension stops ingestion, training and deployment jobs. Termination stops sessions, running tasks and scheduled jobs. | When suspending, preserve artefacts, logs and job queues. When terminating, preserve the agent’s memory, its traces and any pending actions. | The main risk of suspension is that stale models stay in service longer. The main risk of termination is leaving transactions half-finished.' },
      { t: 'bullets', title: 'Suspending an AI pipeline', layout: 'grid', cols: 2, items: [
          { icon: 'database', h: 'Freeze ingestion', d: 'Pause connectors and data feeds', k: 'data' },
          { icon: 'clock', h: 'Pause scheduled jobs', d: 'Training, fine-tuning, re-indexing', k: 'neutral' },
          { icon: 'stop', h: 'Block promotion', d: 'Registry won’t approve new versions', k: 'threat' },
          { icon: 'pipeline', h: 'Disable deploy triggers', d: 'No automatic releases', k: 'control' },
          { icon: 'lock', h: 'Lock artefacts', d: 'Retention lock against deletion', k: 'model' },
          { icon: 'key', h: 'Revoke pipeline credentials', d: 'If the pipeline itself is compromised', k: 'human' } ],
        say: 'Suspending a pipeline has six parts. | Freeze ingestion: pause the connectors and data feeds that bring in new data. | Pause scheduled jobs: training, fine-tuning and re-indexing. | Block promotion in the model registry, so no new version can be approved. | Disable deployment triggers, so nothing is released automatically. | Lock artefacts with retention locks, so datasets, models and logs can’t be deleted. | And if the pipeline itself may be compromised, revoke its credentials.' },
      { t: 'flow', title: 'Terminating an agent safely',
        nodes: [
          { id: 'pause', x: 230, y: 330, icon: 'stop', label: 'Stop new work', sub: 'no new tasks or sessions', k: 'threat', w: 320 },
          { id: 'rev', x: 700, y: 330, icon: 'key', label: 'Revoke credentials', sub: 'tokens, keys, grants', k: 'human', w: 320 },
          { id: 'hold', x: 1200, y: 330, icon: 'clock', label: 'Hold pending actions', sub: 'queued emails, payments', k: 'control', w: 330 },
          { id: 'snap', x: 1200, y: 690, icon: 'archive', label: 'Snapshot state', sub: 'memory, traces, context', k: 'data', w: 310 },
          { id: 'kill', x: 700, y: 690, icon: 'power', label: 'End running tasks', sub: 'sessions and processes', k: 'neutral', w: 310 },
          { id: 'man', x: 230, y: 690, icon: 'users', label: 'Manual fallback', sub: 'people take over', k: 'model', w: 290 } ],
        edges: [{ from: 'pause', to: 'rev', k: 'threat' }, { from: 'rev', to: 'hold', k: 'human' }, { from: 'hold', to: 'snap', k: 'control' }, { from: 'snap', to: 'kill', k: 'data' }, { from: 'kill', to: 'man', k: 'neutral' }],
        steps: [
          { show: 'pause', hi: 'pause', mark: { pause: 'alert' } },
          { show: 'rev pause-rev', flow: 'pause-rev', hi: 'rev', mark: { rev: 'lock' } },
          { show: 'hold rev-hold', flow: 'rev-hold', hi: 'hold' },
          { show: 'snap hold-snap', flow: 'hold-snap', hi: 'snap' },
          { show: 'kill snap-kill', flow: 'snap-kill', hi: 'kill' },
          { show: 'man kill-man', flow: 'kill-man', hi: 'man', mark: { man: 'ok' } } ],
        say: 'Terminating an agent safely follows an order. First, stop new work: no new tasks, sessions or scheduled runs. | Revoke its credentials: tokens, keys and delegated grants, so it can’t act even if something is still running. | Hold pending actions, such as queued emails, payments or tickets, for human review. | Snapshot its state: memory, traces and current context, which investigators will need. | End the running tasks, sessions and processes. | And switch to a manual fallback, so people can take over the work the agent was doing.' },
      { t: 'bullets', title: 'Cleaning up after a harmful agent', layout: 'grid', cols: 2, items: [
          { icon: 'search', h: 'List every action', d: 'From traces, in the incident window', k: 'neutral' },
          { icon: 'rollback', h: 'Reverse what you can', d: 'Refunds, recalls, restores', k: 'control' },
          { icon: 'users', h: 'Notify those affected', d: 'Customers, partners, staff', k: 'human' },
          { icon: 'memory', h: 'Clean memory and data', d: 'Remove planted instructions', k: 'data' },
          { icon: 'gavel', h: 'Record for legal', d: 'Actions that can’t be undone', k: 'model' },
          { icon: 'check', h: 'Restart with approval', d: 'After fixes and testing', k: 'threat' } ],
        say: 'After terminating a harmful agent, clean up in six steps. | List every action it took during the incident window, from its traces. | Reverse what you can: issue refunds, recall messages and restore changed records. | Notify the customers, partners and staff who were affected. | Clean the agent’s memory and any data it wrote, removing planted instructions that could re-trigger the incident. | Record actions that can’t be undone, for legal and compliance. | And restart the agent only with approval, after fixes and testing.' },
      { t: 'summary', items: ['Suspend pipelines to stop poison or tampering spreading', 'Freeze ingestion, jobs, promotion and deploys; lock artefacts', 'Terminate agents: stop work, revoke, hold, snapshot, end, fall back', 'Reverse actions, clean memory, restart only with approval'],
        say: 'To recap. | Suspend pipelines to stop poisoned data or tampered builds spreading into production. | Freeze ingestion, scheduled jobs, promotion and deployments, and lock artefacts against deletion. | Terminate agents in order: stop new work, revoke credentials, hold pending actions, snapshot state, end tasks and fall back to people. | Then reverse what you can, clean memory and data, and restart only with approval.' } ] },
    { type: 'text', md: `### Designing for the brake
Stopping must be **designed in** before an incident:
- **Pipelines** need a documented, tested way to freeze each stage: ingestion connectors, scheduled training and re-indexing, registry promotion and deployment. Retention locks should protect artefacts during investigations.
- **Agents** need an off switch that works regardless of the model’s cooperation: credential revocation at the identity provider or gateway, a central flag the orchestration layer checks before every step, and the ability to end running sessions. Never rely on instructing the agent to stop.
- **Human oversight rules expect this:** the EU AI Act (Article 14) requires high-risk systems to let overseers intervene or interrupt operation through a "stop" button or similar procedure, bringing the system to a halt in a safe state.
- **Pending actions:** queue high-impact actions (payments, external messages, deletions) so they can be held. Make actions **idempotent** and recorded, so reversal is possible.

### Terminating a compromised agent
1. **Stop new work** at the orchestration layer.
2. **Revoke credentials:** API keys, OAuth grants and refresh tokens, delegated tokens and MCP server sessions (Module 4.5).
3. **Hold pending actions** in queues for human review.
4. **Snapshot state:** memory stores, conversation context, plans, traces and tool-call logs (Section 5).
5. **End sessions and processes**, including sub-agents it started.
6. **Fall back** to a manual or simpler automated process.
7. **Reverse and notify:** compensating transactions, message recalls, record restores and notifications to those affected.
8. **Restart only after** root-cause fixes, memory and data cleaning, safety regression tests (Module 5.6) and approval by the agent’s owner.

### Pipeline suspension pitfalls
- **Scheduled jobs** that redeploy a poisoned model overnight because nobody paused them.
- **Partial freezes:** pausing training but not re-indexing, so poisoned documents still reach a RAG system.
- **Lost evidence:** clean-up jobs or retention policies deleting the very data needed for investigation.
- **Long suspensions:** stale models degrade too, so plan how long you can safely run without updates (Module 5.7).` },
    { type: 'steps', title: 'An agent sends payments it shouldn’t', items: [
      ['Stop and revoke', 'Block new tasks for the agent, and revoke its payment API credentials at the gateway.'],
      ['Hold the queue', 'Hold payments queued by the agent but not yet executed, for review by finance.'],
      ['Snapshot', 'Capture its memory, traces and tool-call logs, with hashes, before anything is cleaned.'],
      ['Reverse and notify', 'Recall or reverse the payments that can be reversed, and inform affected customers and the bank.'],
      ['Restart carefully', 'After the cause is fixed and safety tests pass, the owner approves a restart with tighter limits.'] ] },
    { type: 'callout', kind: 'exam', title: 'Brake questions', md: `For poisoning or tampered builds, look for **pipeline suspension** that covers **ingestion, scheduled training and re-indexing, promotion and deployment**. For harmful agents, the best answers **revoke credentials** and **stop work at the orchestration layer**, not just ask the agent to stop, then **hold pending actions** and **snapshot state** before cleaning.` },
    { type: 'check', q: { q: 'A hijacked procurement agent is sending purchase orders to an unknown supplier. What is the MOST effective FIRST step to stop it?', o: ['Send the agent a message instructing it to stop all procurement activity', 'Revoke its credentials and block new tasks at the orchestration layer', 'Wait for the current batch of orders to finish, then shut the agent down', 'Ask the supplier to reject further orders from the company'], a: 1, b: 4,
      why: 'Revoking credentials and stopping work outside the model halts the agent whatever its state, because a hijacked agent may ignore instructions. Waiting lets harm continue, and relying on the supplier is outside your control.' } }
  ]
};
