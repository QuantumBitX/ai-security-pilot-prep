/* 5.7 · Section 1: recovery strategies (trusted model rollback, clean checkpoint restoration, vector-store recovery) */
module.exports = {
  title: 'Recovery strategies for AI systems', covers: [1],
  blocks: [
    { type: 'video', title: 'Getting back to a trusted state', kicker: 'Module 5.7 · Video 1 of 5', scenes: [
      { t: 'title', kicker: 'Module 5.7 · Recovery and continuity', title: 'Getting back to a trusted state', sub: 'Rollback, clean checkpoints and vector-store recovery', icon: 'rollback',
        say: 'Recovery isn’t just switching the system back on. It means returning to a state you can trust, and proving it, without losing more data or service than you have to. | This video covers recovery strategies for AI systems: trusted model rollback, clean checkpoint restoration and vector-store recovery.' },
      { t: 'bullets', title: 'What can be recovered, and how', layout: 'grid', cols: 2, items: [
          { icon: 'model', h: 'Models', d: 'Roll back to a signed registry version', k: 'model' },
          { icon: 'cycle', h: 'Checkpoints', d: 'Restore, then retrain on clean data', k: 'control' },
          { icon: 'database', h: 'Vector stores', d: 'Restore a snapshot or rebuild', k: 'data' },
          { icon: 'gear', h: 'Configurations', d: 'Prompts and guardrails from version control', k: 'neutral' },
          { icon: 'memory', h: 'Agent memory', d: 'Reset, or restore a clean copy', k: 'threat' },
          { icon: 'archive', h: 'Datasets', d: 'Earlier hashed dataset versions', k: 'human' } ],
        say: 'Six kinds of AI asset need recovery plans. | Models: roll back to a signed version in the registry. | Checkpoints: restore a verified clean checkpoint, then retrain or fine-tune on clean data. | Vector stores: restore an index snapshot, or rebuild the index from verified sources. | Configurations: restore prompts, guardrails and tool definitions from version control. | Agent memory: reset it, or restore a copy taken before the incident. | And datasets: return to earlier dataset versions, identified by their hashes.' },
      { t: 'compare', title: 'Roll back, restore or rebuild?', labels: ['What', 'Speed', 'Use when'],
        cols: [{ h: 'Roll back', icon: 'rollback', k: 'control' }, { h: 'Restore', icon: 'archive', k: 'data' }, { h: 'Rebuild', icon: 'tool', k: 'human' }],
        rows: [
          ['Previous signed version', 'Clean snapshot', 'From verified sources'],
          ['Minutes', 'Hours', 'Days or weeks'],
          ['Last version is clean', 'A clean copy exists', 'No trusted copy'] ],
        say: 'There are three broad ways to recover. | Roll back to the previous signed version. Restore a clean snapshot or checkpoint. Or rebuild from verified sources. | Rolling back takes minutes, restoring takes hours, and rebuilding can take days or weeks. | Roll back when the previous version is known to be clean. Restore when a clean copy predates the problem. And rebuild when no trusted copy exists at all.' },
      { t: 'flow', title: 'Recovering a poisoned vector store',
        nodes: [
          { id: 'pick', x: 230, y: 330, icon: 'calendar', label: 'Pick a clean snapshot', sub: 'before the poison arrived', k: 'data', w: 330 },
          { id: 'stage', x: 700, y: 330, icon: 'box', label: 'Restore to staging', sub: 'not straight to live', k: 'neutral', w: 300 },
          { id: 're', x: 1200, y: 330, icon: 'filter', label: 'Re-add good changes', sub: 'from verified sources', k: 'control', w: 320 },
          { id: 'emb', x: 1200, y: 690, icon: 'vector', label: 'Re-embed if needed', sub: 'same embedding model', k: 'model', w: 310 },
          { id: 'val', x: 700, y: 690, icon: 'check', label: 'Validate retrieval', sub: 'golden queries, canaries', k: 'human', w: 320 },
          { id: 'cut', x: 230, y: 690, icon: 'arrow', label: 'Cut over and watch', sub: 'tight monitoring', k: 'threat', w: 300 } ],
        edges: [{ from: 'pick', to: 'stage', k: 'data' }, { from: 'stage', to: 're', k: 'neutral' }, { from: 're', to: 'emb', k: 'control' }, { from: 'emb', to: 'val', k: 'model' }, { from: 'val', to: 'cut', k: 'human' }],
        steps: [
          { show: 'pick', hi: 'pick' },
          { show: 'stage pick-stage', flow: 'pick-stage', hi: 'stage' },
          { show: 're stage-re', flow: 'stage-re', hi: 're' },
          { show: 'emb re-emb', flow: 're-emb', hi: 'emb' },
          { show: 'val emb-val', flow: 'emb-val', hi: 'val', mark: { val: 'ok' } },
          { show: 'cut val-cut', flow: 'val-cut', hi: 'cut' } ],
        say: 'Here is how to recover a poisoned vector store. Pick the most recent snapshot taken before the poisoned content arrived, using ingestion logs to be sure. | Restore it to a staging environment, not straight to production. | Re-add the legitimate changes made since the snapshot, from verified sources only. | Re-embed content if needed, making sure the same embedding model is used throughout, or vectors won’t be comparable. | Validate retrieval with golden queries that have known correct results, and with canary documents. | Then cut over, and watch retrieval and outputs closely for the following weeks.' },
      { t: 'timeline', title: 'Recovery objectives in practice', events: [
          { y: 'Mon 02:00', h: 'Clean snapshot', d: 'The recovery point' },
          { y: 'Tue 10:00', h: 'Poisoned upload', d: 'Index compromised' },
          { y: 'Wed 14:00', h: 'Detected', d: 'Retrieval quarantined' },
          { y: 'Wed 15:00', h: 'Service restored', d: 'From Monday’s snapshot' },
          { y: 'Wed 18:00', h: 'Changes re-added', d: 'Verified updates only' } ],
        say: 'Here is how recovery objectives play out. | At two on Monday morning, a routine index snapshot is taken. It becomes the recovery point. | On Tuesday morning, poisoned documents are uploaded. | On Wednesday afternoon, the poisoning is detected and the affected retrieval is quarantined. | An hour later, service is restored from Monday’s snapshot, well within the recovery time objective of four hours. | By evening, legitimate changes made since Monday have been re-added from verified sources, so nothing of value is lost.' },
      { t: 'summary', items: ['Plan recovery for models, checkpoints, indexes, configs, memory, datasets', 'Roll back, restore or rebuild, depending on what is trusted', 'Restore to staging, re-add verified changes, validate, then cut over', 'Set and test recovery time and recovery point objectives'],
        say: 'To recap. | Plan recovery for models, checkpoints, vector stores, configurations, agent memory and datasets. | Roll back, restore or rebuild, depending on which copies you can trust. | Restore to staging, re-add verified changes, validate, and only then cut over. | And set, and test, recovery time and recovery point objectives for each AI component.' } ] },
    { type: 'text', md: `### Recovery strategies
| Strategy | How it works | Requirements |
|---|---|---|
| **Trusted model rollback** | Redeploy a previous signed, approved version from the registry | Signed versions, retained artefacts, deployment pipeline that can deploy older versions (Module 3.5) |
| **Clean checkpoint restoration** | Restore a checkpoint that lineage proves predates the problem, then retrain or fine-tune on clean data | Checkpoint retention, lineage, verified clean datasets (Module 5.6) |
| **Vector-store recovery** | Restore an index snapshot, or rebuild from verified source documents | Regular, immutable snapshots; ingestion logs; recorded embedding model versions |
| **Configuration restore** | Redeploy prompts, guardrails, tools and parameters from version control | Configuration as code (Module 5.1) |
| **Agent memory recovery** | Reset memory, or restore a clean copy; remove planted entries | Memory snapshots and per-entry provenance |
| **Fallback operation** | Run a simpler model, rule-based flow or manual process during recovery | Tested fallbacks (Module 3.6) |

### Recovery objectives for AI
- **Recovery time objective (RTO):** how quickly each AI capability must be back. A fraud model may need minutes; an internal drafting assistant may tolerate days.
- **Recovery point objective (RPO):** how much recent data or change you can afford to lose: for example, the index updates since the last clean snapshot, or conversation history.
- Set objectives per component, because they differ: the model, its index, its prompts and its memory may all have different RTOs and RPOs.
- **Snapshots and backups** must be **immutable** and **retained long enough** to predate slow-burning incidents such as poisoning, which may go unnoticed for weeks.

### Recovering safely
1. **Confirm eradication first** (Module 5.6), or the attacker may still have access.
2. **Choose the recovery point** using lineage and ingestion logs, not assumptions.
3. **Restore to staging** and run safety regression tests before production.
4. **Re-apply legitimate changes** from verified sources, including approved fixes made during the incident.
5. **Cut over gradually** (canary), with tightened monitoring, and keep the fallback ready.
6. **Communicate** with users about restored service and any data lost.

For hosted models, recovery may mean switching to a different model version or provider. Test behaviour, safety and prompts on the alternative before you need it (Section 3).` },
    { type: 'match', title: 'Which recovery strategy fits?', pairs: [
      ['Yesterday’s prompt change caused harmful outputs; the previous prompt was fine', 'Configuration restore from version control'],
      ['Poisoned documents entered the index on Tuesday; Monday’s snapshot is clean', 'Vector-store snapshot restore, then re-add verified changes'],
      ['All three recent model versions were trained on poisoned data', 'Clean checkpoint restoration and retraining'],
      ['The current model is tampered; last week’s signed version is verified clean', 'Trusted model rollback'],
      ['Planted instructions sit in an agent’s long-term memory', 'Memory reset or clean restore'] ] },
    { type: 'callout', kind: 'exam', title: 'Recovery questions', md: `The best answers recover to a **verified trusted state** (signed versions, clean checkpoints, snapshots that **predate** the incident), **restore to staging and test** before production, and **re-apply legitimate changes** from verified sources. Backups that are too short-lived to predate slow poisoning, or restoring straight into production, are common traps.` },
    { type: 'check', q: { q: 'A knowledge base was poisoned eight weeks ago, but the organisation keeps only 30 days of index snapshots. What does this reveal?', o: ['Snapshots are unnecessary, because indexes can always be repaired in place', 'Snapshot retention is too short to recover from slow-burning poisoning', 'The organisation should take snapshots every hour instead of every day', 'Knowledge bases should never be used for customer-facing assistants'], a: 1, b: 1,
      why: 'Poisoning can go unnoticed for weeks, so retention must reach back far enough to provide a clean recovery point; otherwise the index must be rebuilt from verified sources. More frequent snapshots don’t help if none predate the poison.' } }
  ]
};
