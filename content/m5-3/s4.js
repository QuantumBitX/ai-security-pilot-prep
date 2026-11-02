/* 5.3 · Section 4: AI asset and lifecycle integrity (data, knowledge bases, models, deployment pipelines) */
module.exports = {
  title: 'Detecting compromise of AI assets and pipelines', covers: [4],
  blocks: [
    { type: 'video', title: 'Has anything been tampered with?', kicker: 'Module 5.3 · Video 4 of 5', scenes: [
      { t: 'title', kicker: 'Module 5.3 · Runtime detection', title: 'Has anything been tampered with?', sub: 'Integrity of data, knowledge bases, models and pipelines', icon: 'hash',
        say: 'Some of the most damaging AI attacks never touch a prompt. They change the data a model learns from, the documents it retrieves, the model file itself, or the pipeline that deploys it. | This video covers detecting compromises of AI assets across their lifecycle.' },
      { t: 'layers', title: 'AI assets to verify continuously',
        layers: [
          { icon: 'database', label: 'Training and fine-tuning data', sub: 'Versioned, hashed datasets and manifests', k: 'data' },
          { icon: 'book', label: 'Knowledge bases and vector stores', sub: 'Approved sources, change logs, document provenance', k: 'human' },
          { icon: 'model', label: 'Models and weights', sub: 'Signed versions matching the registry', k: 'model' },
          { icon: 'gear', label: 'Prompts and configurations', sub: 'Approved baselines and drift checks', k: 'neutral' },
          { icon: 'pipeline', label: 'Deployment pipelines', sub: 'Workflow definitions, runners, signed artefacts', k: 'control' } ],
        say: 'Five kinds of AI asset need continuous integrity checks. | Training and fine-tuning data, held as versioned datasets with hashes and signed manifests. | Knowledge bases and vector stores, where only approved sources should add content, and every change should be logged. | Models and weights, where the running version should match a signed version in the registry. | Prompts and configurations, checked against approved baselines, as Module 5.1 described. | And deployment pipelines themselves: workflow definitions, build runners and the artefacts they produce.' },
      { t: 'flow', title: 'Verifying a model before and while it runs',
        nodes: [
          { id: 'reg', x: 230, y: 330, icon: 'book', label: 'Registry', sub: 'approved hash, signature', k: 'data', w: 300 },
          { id: 'adm', x: 700, y: 330, icon: 'shieldcheck', label: 'Admission check', sub: 'verify before loading', k: 'control', w: 310 },
          { id: 'run', x: 1200, y: 330, icon: 'server', label: 'Serving', sub: 'model loaded', k: 'neutral', w: 280 },
          { id: 'att', x: 1200, y: 690, icon: 'fingerprint', label: 'Runtime check', sub: 'periodic hash, attestation', k: 'human', w: 330 },
          { id: 'cmp', x: 700, y: 690, icon: 'alert', label: 'Mismatch', sub: 'alert and quarantine', k: 'threat', w: 290 },
          { id: 'inv', x: 230, y: 690, icon: 'search', label: 'Investigate', sub: 'who changed what?', k: 'model', w: 290 } ],
        edges: [{ from: 'reg', to: 'adm', k: 'data' }, { from: 'adm', to: 'run', k: 'control' }, { from: 'run', to: 'att', k: 'neutral' }, { from: 'att', to: 'cmp', k: 'human' }, { from: 'cmp', to: 'inv', k: 'threat' }],
        steps: [
          { show: 'reg', hi: 'reg' },
          { show: 'adm reg-adm', flow: 'reg-adm', hi: 'adm', mark: { adm: 'ok' } },
          { show: 'run adm-run', flow: 'adm-run', hi: 'run' },
          { show: 'att run-att', flow: 'run-att', hi: 'att' },
          { show: 'cmp att-cmp', flow: 'att-cmp', hi: 'cmp', mark: { cmp: 'alert' } },
          { show: 'inv cmp-inv', flow: 'cmp-inv', hi: 'inv' } ],
        say: 'Here is integrity checking for a model. The registry holds the approved version’s hash and signature. | An admission check verifies the signature before the serving platform will load the model. Unsigned or unknown models are refused. | The model is loaded and serves traffic. | Integrity isn’t checked only once. A runtime check periodically re-hashes the loaded files, or uses platform attestation, to confirm nothing has changed underneath. | A mismatch raises an alert and quarantines the model, switching traffic to a known-good version. | And investigators use storage and access logs to establish who changed what, and when.' },
      { t: 'compare', title: 'Normal change or suspicious change?', labels: ['Dataset', 'Knowledge base', 'Model', 'Pipeline'],
        cols: [{ h: 'Normal', icon: 'check', k: 'control' }, { h: 'Suspicious', icon: 'alert', k: 'threat' }],
        rows: [
          ['New version, approved and hashed', 'Edited in place, no new version'],
          ['Scheduled sync from known sources', 'Bulk insert from a new source'],
          ['Signed release from the registry', 'Hash mismatch, or unsigned load'],
          ['Reviewed commit to the workflow', 'Workflow edited; new runner or secret'] ],
        say: 'Detection depends on knowing what normal change looks like. | A dataset normally changes by a new, approved and hashed version. An edit in place, with no new version, is suspicious. | A knowledge base normally changes by scheduled syncs from known sources. A bulk insert from a new source deserves a look. | A model normally changes by a signed release from the registry. A hash mismatch or an unsigned load is an alarm. | And a pipeline normally changes by reviewed commits. Direct edits to a workflow, a new build runner or a newly added secret are classic signs of pipeline compromise.' },
      { t: 'timeline', title: 'A poisoned knowledge base, caught', events: [
          { y: 'Day 1', h: 'Bulk upload', d: '600 pages from a new account' },
          { y: 'Day 1', h: 'Provenance alert', d: 'Source not on the approved list' },
          { y: 'Day 2', h: 'Retrieval shift', d: 'New pages top common queries' },
          { y: 'Day 2', h: 'Quarantine', d: 'Chunks disabled; index snapshot kept' },
          { y: 'Day 3', h: 'Restore and review', d: 'Clean snapshot; uploader investigated' } ],
        say: 'Here is a knowledge base compromise being caught, over three days. | On day one, six hundred pages are uploaded in bulk by an account that has never contributed before. | Provenance monitoring raises an alert, because the source isn’t on the approved list. | On day two, retrieval monitoring sees the new pages suddenly ranking first for common questions, a sign they were written to be retrieved. | The team quarantines the new chunks and keeps a snapshot of the index as evidence. | On day three, the index is restored from a clean snapshot, and the uploader’s account is investigated.' },
      { t: 'summary', items: ['Verify data, knowledge bases, models, configs and pipelines', 'Admit only signed models; re-check while running', 'Know what normal change looks like; alert on the rest', 'Watch provenance and retrieval shifts in knowledge bases'],
        say: 'To recap. | Continuously verify the integrity of data, knowledge bases, models, configurations and pipelines. | Admit only signed, registered models, and re-check them while they run. | Define what normal change looks like for each asset, and alert on everything else. | And for knowledge bases, watch provenance and sudden shifts in what gets retrieved.' } ] },
    { type: 'text', md: `### Integrity signals by asset
| Asset | Controls that create signals | What to alert on |
|---|---|---|
| **Training and fine-tuning data** | Content hashes, signed manifests, immutable versions (Module 3.3) | Hash mismatch, edits without a new version, unusual write access, label distribution shifts |
| **Knowledge bases and vector stores** | Approved source lists, ingestion logs, document provenance metadata, index snapshots | New sources, bulk inserts, deletions, documents that suddenly dominate retrieval, embeddings changed without re-indexing records |
| **Models and weights** | Registry with signatures (for example, Sigstore or OpenSSF model signing), admission control, runtime hashing | Unsigned or unknown models loaded, hash mismatches, direct writes to model storage, unexpected model downloads |
| **Prompts and configurations** | Configuration as code, hashes, drift detection (Module 5.1) | Changes outside the pipeline, guardrail thresholds loosened |
| **Deployment pipelines** | Protected branches, reviewed workflows, ephemeral runners, signed build provenance (SLSA), OIDC-based deployment identities (Module 4.3) | Workflow edits, new self-hosted runners, new secrets, builds without provenance, deployments from unexpected identities |

### Detecting poisoning at runtime
Poisoning is hard to see directly, so combine indirect signals:
- **Behavioural canaries:** fixed test prompts with known answers, run on a schedule, reveal changed behaviour (Module 5.1).
- **Backdoor indicators:** rare inputs producing confidently unusual outputs, or clusters of outputs that change with a specific token or phrase.
- **Retrieval monitoring:** which documents answer common queries, and how that changes over time.
- **Lineage:** when a dataset or source is suspected, lineage shows which models and indexes used it (Module 5.1 playbooks).

### Pipeline compromise
CI/CD pipelines hold the keys to production. Attacks on build systems and their dependencies, such as the 2025 compromise of the widely used tj-actions/changed-files GitHub Action, which exposed secrets in many repositories’ build logs, show why pipeline changes need the same monitoring as production. Alert on workflow changes, unpinned third-party actions, new runners and secrets, and deployments that lack signed provenance.` },
    { type: 'match', title: 'Which control produces the signal?', pairs: [
      ['A model file’s hash no longer matches the registry', 'Runtime integrity checks against signed versions'],
      ['600 pages arrive from an unapproved source', 'Knowledge base provenance monitoring'],
      ['A dataset was changed without a new version', 'Content hashes and immutable versioning'],
      ['A new self-hosted build runner appears overnight', 'Pipeline configuration monitoring'],
      ['A fixed test prompt now gets a different answer', 'Behavioural canary tests'] ] },
    { type: 'callout', kind: 'exam', title: 'Asset integrity questions', md: `Strong answers verify integrity **cryptographically** (hashes, signatures, provenance), **at load time and while running**, and treat **pipelines as production**. For knowledge bases, look for **source allow-lists, provenance and snapshots** for clean restoration. "Retrain the model" without first scoping and preserving evidence is usually premature.` },
    { type: 'check', q: { q: 'A runtime integrity check finds that the weights loaded by a production model server no longer match the signed version in the registry. What should happen FIRST?', o: ['Re-sign the loaded weights, so that the registry matches what is running', 'Quarantine the model, switch to a known-good version and preserve evidence', 'Retrain the model from scratch on the original training dataset', 'Continue serving, and schedule a review at the next change board meeting'], a: 1, b: 4,
      why: 'A hash mismatch indicates possible tampering: contain it by switching to a verified version, and preserve the suspect files for investigation. Re-signing launders the tampered model, retraining is premature, and waiting leaves it serving.' } }
  ]
};
