/* 5.5 · Section 5: preservation of investigative artefacts (model states, weights, configurations, dataset snapshots) */
module.exports = {
  title: 'Preserving investigative artefacts', covers: [5],
  blocks: [
    { type: 'video', title: 'Keeping the evidence', kicker: 'Module 5.5 · Video 5 of 5', scenes: [
      { t: 'title', kicker: 'Module 5.5 · AI incident response', title: 'Keeping the evidence', sub: 'Preserving model states, weights, configurations and datasets', icon: 'archive',
        say: 'AI incidents leave evidence in unusual places: model weights, prompt versions, vector indexes and agent memory. Much of it is overwritten by the very actions that fix the problem. | This video covers preserving investigative artefacts in AI incidents.' },
      { t: 'bullets', title: 'AI artefacts to preserve', layout: 'grid', cols: 2, items: [
          { icon: 'model', h: 'Model weights and versions', d: 'Exact files, hashes, registry records', k: 'model' },
          { icon: 'gear', h: 'Configurations', d: 'Prompts, guardrails, tools, parameters', k: 'neutral' },
          { icon: 'database', h: 'Dataset snapshots', d: 'Training, tuning and index contents', k: 'data' },
          { icon: 'list', h: 'Logs and traces', d: 'Prompts, outputs, tool calls, access', k: 'human' },
          { icon: 'memory', h: 'Runtime state', d: 'Agent memory, caches, containers', k: 'threat' },
          { icon: 'audit', h: 'Change records', d: 'Pipeline runs, approvals, deployments', k: 'control' } ],
        say: 'Six kinds of artefact matter in AI investigations. | Model weights and versions: the exact files that were running, with their hashes and registry records. | Configurations: system prompts, guardrail policies, tool definitions and generation parameters. | Dataset snapshots: training and fine-tuning data, and the contents of retrieval indexes. | Logs and traces: prompts, outputs, tool calls and access records. | Runtime state: agent memory, caches and running containers. | And change records: pipeline runs, approvals and deployments, showing how the system reached its current state.' },
      { t: 'flow', title: 'Preserve in order of volatility',
        nodes: [
          { id: 'mem', x: 230, y: 330, icon: 'memory', label: 'Runtime state', sub: 'agent memory, sessions', k: 'threat', w: 310 },
          { id: 'cache', x: 700, y: 330, icon: 'clock', label: 'Caches and queues', sub: 'pending actions', k: 'human', w: 310 },
          { id: 'logs', x: 1200, y: 330, icon: 'list', label: 'Logs and traces', sub: 'before rotation', k: 'neutral', w: 290 },
          { id: 'idx', x: 1200, y: 690, icon: 'database', label: 'Indexes and datasets', sub: 'snapshot before cleaning', k: 'data', w: 330 },
          { id: 'wts', x: 700, y: 690, icon: 'model', label: 'Models and configs', sub: 'hash; lock in registry', k: 'model', w: 310 },
          { id: 'chg', x: 230, y: 690, icon: 'audit', label: 'Change history', sub: 'pipelines, approvals', k: 'control', w: 300 } ],
        edges: [{ from: 'mem', to: 'cache', k: 'threat' }, { from: 'cache', to: 'logs', k: 'human' }, { from: 'logs', to: 'idx', k: 'neutral' }, { from: 'idx', to: 'wts', k: 'data' }, { from: 'wts', to: 'chg', k: 'model' }],
        steps: [
          { show: 'mem', hi: 'mem', mark: { mem: 'alert' } },
          { show: 'cache mem-cache', flow: 'mem-cache', hi: 'cache' },
          { show: 'logs cache-logs', flow: 'cache-logs', hi: 'logs' },
          { show: 'idx logs-idx', flow: 'logs-idx', hi: 'idx' },
          { show: 'wts idx-wts', flow: 'idx-wts', hi: 'wts', mark: { wts: 'lock' } },
          { show: 'chg wts-chg', flow: 'wts-chg', hi: 'chg', mark: { chg: 'ok' } } ],
        say: 'Collect evidence in order of volatility, most fragile first. Runtime state disappears when a session ends or a container restarts, so capture agent memory and session context first. | Then caches and queues, including pending actions that are about to execute. | Then logs and traces, before rotation or retention policies delete them. | Then snapshots of retrieval indexes and datasets, before anyone cleans them. | Then model files and configurations: hash them and lock them in the registry, so a rollback doesn’t destroy the evidence. | And finally the change history from pipelines and approvals, which is usually durable but still worth exporting.' },
      { t: 'compare', title: 'Fixing without destroying', labels: ['Model', 'Index', 'Logs', 'Handling'],
        cols: [{ h: 'Do', icon: 'check', k: 'control' }, { h: 'Don’t', icon: 'x', k: 'threat' }],
        rows: [
          ['Snapshot it before rolling back', 'Overwrite the suspect model'],
          ['Copy it before removing documents', 'Delete poisoned content in place'],
          ['Export before rotation; set a hold', 'Rely on default retention'],
          ['Hash and record custody', 'Pass files around in chat'] ],
        say: 'Containment and evidence can coexist. | Snapshot the suspect model before rolling back. Don’t overwrite it. | Copy the index before removing poisoned documents. Don’t delete them in place. | Export logs before they rotate, and apply a legal hold. Don’t rely on default retention. | And hash every item and record its chain of custody. Don’t pass evidence around in chat messages.' },
      { t: 'code', title: 'An evidence manifest entry', file: 'evidence-manifest.json',
        code: `{
  "case": "IR-2026-0147",
  "item": "E-04",
  "type": "model weights",
  "source": "registry: support-llm v3.2",
  "collected_by": "j.okafor (SOC)",
  "collected_at": "2026-10-12T09:41:07Z",
  "sha256": "9f2c...e81a",
  "storage": "evidence vault, WORM",
  "legal_hold": true,
  "notes": "snapshot taken before rollback"
}`,
        hl: [null, [2, 5], [6, 8], [9, 10], [11, 11]],
        notes: [{ h: 'One manifest entry per item', d: 'Every artefact gets a record in the case’s evidence manifest.' }, { h: 'What and where from', d: 'Case, item, type and the exact source, including the model version.', k: 'data' }, { h: 'Who, when and fingerprint', d: 'The collector, a UTC timestamp and a cryptographic hash.', k: 'human' }, { h: 'Protected storage', d: 'Write-once storage, with a legal hold that overrides normal retention.', k: 'control' }, { h: 'Context', d: 'Notes explain how and why it was collected.', k: 'neutral' }],
        say: 'Every preserved artefact gets an entry in the case’s evidence manifest. | It records what the item is and exactly where it came from, including the model version. | It records who collected it, when, in universal time, and its cryptographic hash. | It records where it is stored, here in write-once storage, and that a legal hold applies. | And notes explain the context, such as the fact that this snapshot was taken just before the rollback.' },
      { t: 'summary', items: ['Preserve weights, configs, datasets, logs, runtime state and change records', 'Collect in order of volatility, runtime state first', 'Snapshot before rollback, cleaning or termination', 'Hash, store immutably, record custody, apply legal holds'],
        say: 'To recap. | Preserve model weights, configurations, dataset snapshots, logs, runtime state and change records. | Collect in order of volatility, starting with runtime state. | Snapshot before rolling back, cleaning data or terminating agents. | And hash every item, store it immutably, record its chain of custody and apply legal holds.' } ] },
    { type: 'text', md: `### What to preserve, and why
| Artefact | Why investigators need it |
|---|---|
| **Model weights and registry records** | Prove which model ran, compare with signed versions, analyse backdoors or tampering (Module 5.6) |
| **Configurations** | System prompts, guardrail policies, tool definitions, generation parameters and their versions explain behaviour |
| **Dataset snapshots** | Training and fine-tuning data, labels and manifests show what was poisoned and when |
| **Retrieval index snapshots** | Document versions, embeddings and ingestion records reveal planted content and its source |
| **Logs and traces** | Prompts, outputs, retrieved documents, tool calls and identities reconstruct the attack (Module 5.2) |
| **Runtime state** | Agent memory, conversation context, caches and queues show what the agent "knew" and planned |
| **Infrastructure evidence** | Container images, disk snapshots and cloud audit logs for compromised hosts |
| **Change and access records** | Pipeline runs, approvals, registry changes and access logs show who changed what |
| **Provider-held data** | Hosted model providers may hold usage logs; request preservation early under your contract (Module 2.5) |

### Good practice
- **Order of volatility:** collect the most fragile evidence first (RFC 3227 sets out this principle for digital evidence); for AI that means runtime state, queues and caches before logs, indexes and models.
- **Snapshot before you change:** rollbacks, index cleaning, memory resets and agent termination all destroy evidence. Snapshot first unless waiting would cause serious harm, and record what was done if not.
- **Integrity and custody:** hash every item, store originals in write-once storage, analyse copies, and keep a chain of custody record (Module 5.2; ISO/IEC 27037).
- **Size and practicality:** weights and datasets can be very large. Where a registry already stores an immutable, hashed version, preserving a locked reference plus its hash may be enough, provided retention locks prevent deletion.
- **Non-determinism:** you can’t reproduce a past output by rerunning the model, so preserve recorded outputs and the exact model, configuration and context that produced them.
- **Legal holds:** suspend routine deletion for everything related to the incident, including telemetry, data pipeline staging areas and provider logs.
- **Privacy:** evidence often contains personal data; restrict access to the investigation team and record every access.` },
    { type: 'match', title: 'Which artefact answers the question?', pairs: [
      ['What did the agent believe its instructions were when it acted?', 'Snapshot of agent memory and context'],
      ['Which model file was actually serving traffic last Tuesday?', 'Registry records and weight hashes'],
      ['When did the planted document enter the knowledge base?', 'Index snapshot with ingestion records'],
      ['Who changed the guardrail threshold before the incident?', 'Configuration change history'],
      ['Which poisoned examples were in the fine-tuning set?', 'Dataset snapshot and manifest'] ] },
    { type: 'callout', kind: 'exam', title: 'Evidence questions', md: `Look for answers that **snapshot before changing** (rollback, cleaning, termination), collect in **order of volatility**, and maintain **hashes, immutable storage and chain of custody**. For AI, remember the less obvious artefacts: **prompts and configurations, index contents and agent memory**. "Fix it first and investigate later" is usually the wrong order unless harm is severe and ongoing.` },
    { type: 'check', q: { q: 'The team is about to roll back a model suspected of being tampered with, and to clean poisoned documents from its RAG index. What should happen FIRST?', o: ['Roll back immediately, then reconstruct the evidence later from monitoring dashboards', 'Snapshot the suspect model and index, hash them and record custody, then proceed', 'Delete the poisoned documents first, because they are the main source of harm', 'Ask the vendor to confirm the tampering before taking any further action'], a: 1, b: 5,
      why: 'Rollback and cleaning destroy the evidence needed to prove what happened, so snapshot and hash the model and index first, unless waiting would cause serious harm. Dashboards don’t hold the artefacts, and waiting for the vendor delays containment.' } }
  ]
};
