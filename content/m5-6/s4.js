/* 5.6 · Section 4: threat eradication (data sanitisation, model retraining, patching vulnerabilities) */
module.exports = {
  title: 'Eradicating the threat', covers: [4],
  blocks: [
    { type: 'video', title: 'Removing the threat for good', kicker: 'Module 5.6 · Video 4 of 5', scenes: [
      { t: 'title', kicker: 'Module 5.6 · Investigation and eradication', title: 'Removing the threat for good', sub: 'Data sanitisation, retraining and patching', icon: 'filter',
        say: 'Containment holds the threat back. Eradication removes it: the poisoned data, the backdoored model, the planted instructions, the exploited weakness and the attacker’s access. | This video covers eradicating threats from AI systems.' },
      { t: 'layers', title: 'What eradication covers',
        layers: [
          { icon: 'database', label: 'Data', sub: 'Remove poisoned records; re-validate sources', k: 'data' },
          { icon: 'model', label: 'Models', sub: 'Retrain or fine-tune from clean checkpoints', k: 'model' },
          { icon: 'book', label: 'Indexes and memory', sub: 'Rebuild indexes; purge agent memory', k: 'human' },
          { icon: 'box', label: 'Vulnerabilities', sub: 'Patch components; fix configurations', k: 'neutral' },
          { icon: 'key', label: 'Access', sub: 'Rotate credentials; remove attacker footholds', k: 'threat' } ],
        say: 'Eradication covers five layers. | Data: remove poisoned or malicious records, and re-validate the sources they came from. | Models: retrain or fine-tune from clean checkpoints, so learned backdoors are gone. | Indexes and memory: rebuild retrieval indexes from verified sources, and purge planted instructions from agent memory. | Vulnerabilities: patch the components and fix the configurations the attacker exploited. | And access: rotate credentials and remove every foothold the attacker created, such as new accounts, keys or tools.' },
      { t: 'flow', title: 'Sanitising poisoned data',
        nodes: [
          { id: 'id', x: 230, y: 330, icon: 'search', label: 'Identify', sub: 'lineage, anomalies, provenance', k: 'threat', w: 340 },
          { id: 'q', x: 700, y: 330, icon: 'lock', label: 'Quarantine', sub: 'keep for evidence', k: 'neutral', w: 280 },
          { id: 'src', x: 1200, y: 330, icon: 'shieldcheck', label: 'Verify sources', sub: 'fix the entry point', k: 'control', w: 300 },
          { id: 'ds', x: 1200, y: 690, icon: 'hash', label: 'New dataset version', sub: 'clean, hashed, signed', k: 'data', w: 320 },
          { id: 'tr', x: 700, y: 690, icon: 'model', label: 'Retrain', sub: 'from a clean checkpoint', k: 'model', w: 300 },
          { id: 'val', x: 230, y: 690, icon: 'check', label: 'Validate', sub: 'canaries, trigger tests', k: 'human', w: 300 } ],
        edges: [{ from: 'id', to: 'q', k: 'threat' }, { from: 'q', to: 'src', k: 'neutral' }, { from: 'src', to: 'ds', k: 'control' }, { from: 'ds', to: 'tr', k: 'data' }, { from: 'tr', to: 'val', k: 'model' }],
        steps: [
          { show: 'id', hi: 'id', mark: { id: 'alert' } },
          { show: 'q id-q', flow: 'id-q', hi: 'q', mark: { q: 'lock' } },
          { show: 'src q-src', flow: 'q-src', hi: 'src' },
          { show: 'ds src-ds', flow: 'src-ds', hi: 'ds' },
          { show: 'tr ds-tr', flow: 'ds-tr', hi: 'tr' },
          { show: 'val tr-val', flow: 'tr-val', hi: 'val', mark: { val: 'ok' } } ],
        say: 'Sanitising poisoned data follows six steps. Identify the poisoned records, using lineage, anomaly detection and provenance. Expect to cast the net wider than the records you have already found. | Quarantine them, rather than deleting them, so they remain available as evidence. | Verify the sources and close the entry point, such as a compromised vendor account or an unvetted scraping target. | Build a new dataset version that is clean, hashed and signed. | Retrain or fine-tune from a checkpoint that predates the poisoning. | And validate the result with canary prompts and tests for the known trigger before anything is released.' },
      { t: 'compare', title: 'Retrain, fine-tune or unlearn?', labels: ['Use when', 'Cost', 'Assurance'],
        cols: [{ h: 'Retrain', icon: 'cycle', k: 'control' }, { h: 'Fine-tune', icon: 'sliders', k: 'model' }, { h: 'Unlearn', icon: 'trash', k: 'human' }],
        rows: [
          ['Poison deep or widespread', 'Clean checkpoint exists', 'Specific records to remove'],
          ['Highest', 'Moderate', 'Lowest'],
          ['Strongest', 'Strong, if verified', 'Hard to verify'] ],
        say: 'There are three ways to remove learned harm from a model. | Retrain from scratch when the poison runs deep or wide. Fine-tune from a clean checkpoint when one predates the poisoning. Use machine unlearning only to remove specific records, when the method is suitable. | Retraining costs the most, fine-tuning less, and unlearning the least. | But assurance runs the other way. Retraining on clean data gives the strongest assurance, fine-tuning from a verified checkpoint is strong, and unlearning is still hard to verify, so treat it with caution for security incidents.' },
      { t: 'bullets', title: 'Hidden places threats persist', layout: 'grid', cols: 2, items: [
          { icon: 'memory', h: 'Agent memory', d: 'Planted instructions saved for later', k: 'threat' },
          { icon: 'copy', h: 'Derived models', d: 'Fine-tunes and distillations of the bad model', k: 'model' },
          { icon: 'archive', h: 'Backups and replicas', d: 'Restores can bring the poison back', k: 'neutral' },
          { icon: 'database', h: 'Index copies and caches', d: 'Old chunks, cached answers', k: 'data' },
          { icon: 'clock', h: 'Scheduled jobs', d: 'Pipelines still pulling bad sources', k: 'human' },
          { icon: 'plug', h: 'Tools and plugins', d: 'Malicious MCP servers or connectors', k: 'control' } ],
        say: 'Threats often survive in six hidden places. | Agent memory, where planted instructions wait to be read again. | Derived models: fine-tunes and distilled versions of the compromised model, which inherit its problems. | Backups and replicas, which can bring the poison back during a restore. | Copies of indexes and cached answers. | Scheduled jobs and pipelines that still pull from the compromised source. | And tools and plugins, such as a malicious MCP server or connector installed during the attack.' },
      { t: 'summary', items: ['Eradicate across data, models, indexes, memory, vulnerabilities, access', 'Quarantine bad data; rebuild clean, hashed versions; retrain', 'Prefer retraining or verified checkpoints over unlearning', 'Hunt for persistence: memory, derived models, backups, jobs, tools'],
        say: 'To recap. | Eradicate threats across data, models, indexes, agent memory, vulnerabilities and access. | Quarantine bad data, rebuild clean and hashed dataset versions, and retrain from clean checkpoints. | Prefer retraining or verified clean checkpoints over unlearning when security is at stake. | And hunt for hidden persistence in memory, derived models, backups, scheduled jobs and tools.' } ] },
    { type: 'text', md: `### Eradication by incident type
| Incident | Eradication actions |
|---|---|
| **Data poisoning** | Identify and quarantine poisoned records; close the entry point; rebuild clean dataset versions; retrain or fine-tune from a verified clean checkpoint; retrain derived models; check backups |
| **Knowledge base poisoning** | Remove planted documents; tighten source allow-lists; rebuild the index from verified sources; purge caches; re-check documents that link to the planted ones |
| **Prompt injection via tools** | Fix the design weakness (separate untrusted content, restrict tools, add approvals); block the carrier source; purge memory and notes written during the attack |
| **Model tampering** | Replace with the signed version; investigate and fix how storage or the pipeline was modified; rotate pipeline credentials (Module 4.3) |
| **Exploited vulnerability** | Patch the component, fix the configuration, and check for other systems with the same weakness (Module 5.4) |
| **Credential compromise** | Rotate every exposed credential; remove attacker-created accounts, keys, OAuth grants and tools; review recent activity (Module 4.7) |

### Choosing how to clean a model
- **Retrain from scratch** when poisoning is widespread or its extent is uncertain, or when no clean checkpoint exists.
- **Fine-tune from a clean checkpoint** when lineage proves a checkpoint predates the poisoning; replay only verified data.
- **Machine unlearning** methods try to remove the influence of specific records without full retraining. They are useful for privacy requests (Module 5.7), but verifying that a backdoor or poison has really been removed is difficult, so treat unlearning with caution for security incidents.
- **Hosted models:** if the provider’s model is affected, the eradication is theirs. Your part is to stop using the affected version, validate the fix and update your own prompts, guardrails and indexes.

### Verifying eradication
Eradication isn’t complete until tests show the threat is gone: the original trigger or attack fails, canaries pass, and monitoring shows no recurrence. Section 5 covers the safety regression testing that gates reintroduction.` },
    { type: 'match', title: 'Which eradication step fits?', pairs: [
      ['A vendor’s labelling account was used to insert poisoned records', 'Close the entry point and re-validate the vendor’s data'],
      ['The poisoned model was used as the base for two fine-tuned models', 'Retrain or rebuild the derived models too'],
      ['Planted instructions were saved to the agent’s long-term memory', 'Purge the memory entries written during the attack'],
      ['A malicious MCP server was added to an agent’s tools', 'Remove the server and review all tool registrations'],
      ['Last month’s backup contains the poisoned index', 'Exclude or clean the backup before any restore'] ] },
    { type: 'callout', kind: 'exam', title: 'Eradication questions', md: `The best answers remove the threat **everywhere it persists**: data, models, **derived models**, indexes, caches, **agent memory**, **backups**, scheduled jobs, tools and credentials, and **close the entry point**. For poisoned models, prefer **retraining or verified clean checkpoints**; unlearning is hard to verify. Eradication ends with **testing**, not with a ticket marked done.` },
    { type: 'check', q: { q: 'A team removes poisoned records and retrains its fraud model. Two weeks later, the poisoned behaviour reappears. Which oversight is MOST likely?', o: ['The new model used a slightly different learning rate during retraining', 'The entry point stayed open, or poison survived in a backup or derived model', 'The team retrained too soon, before the attacker had finished the attack', 'The monitoring thresholds were set too sensitively and produced a false alarm'], a: 1, b: 4,
      why: 'Recurrence after cleaning usually means the attacker can still insert data, or poisoned data survived somewhere else, such as a backup, replica, derived model or scheduled ingestion job. Learning rates and timing don’t explain the same behaviour returning.' } }
  ]
};
