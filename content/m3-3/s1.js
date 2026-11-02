/* 3.3 · Section 1: training data integrity, tampering and versioning */
module.exports = {
  title: 'Training data integrity, tampering and versioning', covers: [1, 4],
  blocks: [
    { type: 'video', title: 'Can you trust your training data?', kicker: 'Module 3.3 · Video 1 of 5', scenes: [
      { t: 'title', kicker: 'Module 3.3 · Training data security', title: 'Can you trust your training data?', sub: 'Integrity, tampering and dataset versioning', icon: 'shieldcheck',
        say: 'A model is only as trustworthy as the data it learned from. If someone can quietly change the training data, they can change the model. | This video covers what integrity means for training data, how datasets get tampered with, and how versioning lets you prove exactly what a model was trained on.' },
      { t: 'bullets', title: 'How training data loses integrity', layout: 'grid', cols: 2, items: [
          { icon: 'bug', h: 'Accidental corruption', d: 'Broken pipelines, bad joins, encoding errors', k: 'neutral' },
          { icon: 'user', h: 'Insider tampering', d: 'Edits by people with write access', k: 'human' },
          { icon: 'link', h: 'Supply-chain compromise', d: 'Third-party data altered before it arrives', k: 'threat' },
          { icon: 'alert', h: 'Poisoning', d: 'Deliberately crafted training samples', k: 'threat' },
          { icon: 'tag', h: 'Label manipulation', d: 'Labels flipped or quietly altered', k: 'model' },
          { icon: 'copy', h: 'Train–test leakage', d: 'Evaluation data seeping into training', k: 'data' } ],
        say: 'Training data can lose integrity in six ways. | Accidental corruption: broken pipelines, bad joins or encoding errors. | Insider tampering: edits by people who have write access. | Supply-chain compromise: a third-party or public dataset altered before you receive it. | Poisoning: training samples deliberately crafted to change the model’s behaviour. | Label manipulation: labels flipped or altered, which quietly rewrites what the model learns. | And train–test leakage: evaluation data seeping into training, which inflates results and hides problems.' },
      { t: 'shield', title: 'Layered integrity controls', target: 'Training run', targetIcon: 'gpu',
        layers: ['Vetted sources and hashes', 'Validation gate', 'Immutable, access-controlled storage', 'Signed manifest checked at training'],
        attacks: [{ t: 'Altered source download', stop: 0 }, { t: 'Corrupted batch', stop: 1 }, { t: 'Insider edit', stop: 2 }, { t: 'Unapproved version', stop: 3 }],
        say: 'No single control is enough, so integrity is layered. | Vetting sources and recording hashes when data is downloaded catches files altered at the source. | A validation gate catches corrupted or anomalous batches before they are accepted. | Immutable, access-controlled storage stops quiet edits, even by insiders. | And a signed manifest, checked when training starts, ensures only an approved dataset version is used.' },
      { t: 'flow', title: 'Versioned, verifiable datasets',
        nodes: [
          { id: 'raw', x: 210, y: 330, icon: 'database', label: 'Raw sources', sub: 'hashed on arrival', k: 'data', w: 260 },
          { id: 'snap', x: 590, y: 330, icon: 'archive', label: 'Snapshot v2.3', sub: 'ID = content hash', k: 'data', w: 270 },
          { id: 'man', x: 980, y: 330, icon: 'pen', label: 'Signed manifest', sub: 'file hashes and lineage', k: 'control', w: 290 },
          { id: 'store', x: 1360, y: 330, icon: 'lock', label: 'Immutable store', sub: 'object lock, audit log', k: 'control', w: 280 },
          { id: 'train', x: 1360, y: 690, icon: 'gpu', label: 'Training job', sub: 'verifies before it starts', k: 'model', w: 290 },
          { id: 'reg', x: 960, y: 690, icon: 'model', label: 'Model registry', sub: 'model linked to dataset hash', k: 'model', w: 320 } ],
        edges: [{ from: 'raw', to: 'snap', k: 'data' }, { from: 'snap', to: 'man', k: 'control' }, { from: 'man', to: 'store', k: 'control' }, { from: 'store', to: 'train', k: 'model' }, { from: 'train', to: 'reg', k: 'model' }],
        steps: [
          { show: 'raw', hi: 'raw' },
          { show: 'snap raw-snap', flow: 'raw-snap', hi: 'snap' },
          { show: 'man snap-man', flow: 'snap-man', hi: 'man' },
          { show: 'store man-store', flow: 'man-store', hi: 'store', mark: { store: 'lock' } },
          { show: 'train store-train', flow: 'store-train', hi: 'train', mark: { train: 'ok' } },
          { show: 'reg train-reg', flow: 'train-reg', hi: 'reg' } ],
        say: 'Versioning turns datasets into verifiable artefacts. Raw sources are hashed as they arrive. | Each approved dataset becomes an immutable snapshot, identified by a hash of its content. | A signed manifest lists every file’s hash and the dataset’s lineage. | The snapshot sits in immutable storage, with object lock and an audit log of every access. | The training job verifies the manifest before it starts, and refuses to run on anything that doesn’t match. | And the model registry records which dataset hash produced which model, so you can always prove what a model learned from.' },
      { t: 'timeline', title: 'Catching a tampered dataset', events: [
          { y: 'Monday', h: 'v2.3 approved', d: 'Manifest signed; hash recorded' },
          { y: 'Wednesday', h: 'Silent edit', d: 'An insider alters 400 records' },
          { y: 'Thursday', h: 'Hash mismatch', d: 'Training job refuses to start' },
          { y: 'Thursday', h: 'Roll back', d: 'Retrain from verified v2.3' },
          { y: 'Friday', h: 'Investigate', d: 'Audit log shows who changed what' } ],
        say: 'Here is how that plays out in an incident. | On Monday, version two point three is approved, its manifest signed and its hash recorded. | On Wednesday, an insider quietly alters four hundred records in the working copy. | On Thursday, the next training job finds a hash mismatch and refuses to start. | The team rolls back and retrains from the verified version. | And on Friday, the audit log shows exactly who changed what, and when.' },
      { t: 'summary', items: ['Integrity: data is accurate, complete and unaltered', 'Layer controls: sources, validation, storage, signed manifests', 'Version every dataset by content hash; never train on “latest”', 'Link models to dataset hashes so you can prove and roll back'],
        say: 'To recap. | Integrity means training data is accurate, complete and free from unauthorised change. | Layer the controls: vetted sources, validation gates, immutable storage and signed manifests. | Version every dataset by content hash, and never train on whatever happens to be latest. | And link every model to the dataset hash it was trained on, so you can prove what it learned from, and roll back when needed.' } ] },
    { type: 'text', md: `### What integrity means for training data
Integrity means training data is **accurate, complete, consistent and free from unauthorised modification**, from collection to training. It matters even more for AI than for most systems, because changes are silent: a tampered dataset doesn’t crash anything; it changes what the model learns, and the effect may surface months later. ISO/IEC 42001 addresses this in Annex A control objective **A.7 Data for AI systems** (data for development, acquisition, quality, provenance and preparation), and the EU AI Act requires providers of high-risk systems to apply data governance covering collection, preparation and examination for errors and biases (Article 10).

### Threats and controls
| Threat | Example | Key controls |
|---|---|---|
| **Accidental corruption** | A pipeline change truncates text fields | Validation gates, schema checks, tested and reproducible pipelines |
| **Insider tampering** | An engineer edits records to hide a fraud pattern | Least privilege, separation of duties, immutable storage, audit logs |
| **Supply-chain compromise** | A public dataset’s files change after you vetted them | Pin versions by hash, mirror approved copies internally, verify on download |
| **Poisoning** | Crafted samples implant a backdoor | Provenance, sanitisation, anomaly detection (Section 2) |
| **Label manipulation** | Labels flipped in an annotation tool | Label versioning, consensus checks, audit logs (Section 4) |
| **Train–test leakage** | Test items copied into training data | Managed splits, de-duplication across splits, protected held-out sets |

Further controls:
- **Separation of duties:** whoever changes training data shouldn’t also approve it for training.
- **Protection in transit and at rest:** encrypted transfer, hashing, and write-once (WORM) or object-lock storage for approved snapshots.
- **Pipeline security:** data pipelines are code, so version-control them, review changes and protect the credentials they use (Module 4.3).
- **Monitoring:** alert on unexpected changes in dataset size, statistics or access patterns.

### Dataset versioning and tamper evidence
- Give every dataset version an **immutable identifier**, ideally a hash of its content, so any change produces a new identifier.
- Record **signed manifests** listing file hashes, lineage and approvals, and verify them when training starts.
- Use **data version control** tools or lakehouse “time travel” features to snapshot, compare and roll back datasets.
- **Never train on “latest”**: pin the exact version, just as you pin software dependencies.
- Link each **training run** to its dataset version, code commit and configuration, and each **model version** to its training run (Module 3.1 covers lineage; Module 3.5 covers model registries).
- Keep **audit logs** of reads, writes and approvals, protected from the people whose actions they record.
- Balance keeping old versions (for reproducibility and investigations) against minimisation and erasure duties (Module 3.2).` },
    { type: 'steps', title: 'Respond to a hash mismatch before training', items: [
      ['Stop the run', 'Block training on the mismatched data. Nothing is trained until integrity is confirmed.'],
      ['Preserve evidence', 'Snapshot the altered data and secure the audit logs before anything is changed back.'],
      ['Identify the change', 'Compare with the last verified version, and use the logs to find who changed what, and when.'],
      ['Assess impact', 'Use lineage to check whether any earlier models were trained on altered data.'],
      ['Restore and retrain', 'Roll back to the verified version, close the control gap, and retrain any affected models.'],
      ['Report', 'Treat deliberate tampering as a security incident, following the incident process (Domain 5).'] ] },
    { type: 'callout', kind: 'exam', title: 'Integrity questions: what to look for', md: `The strongest answers make tampering **detectable and blockable before training**: content hashes, signed manifests verified at run time, immutable approved snapshots and separation of duties. Backups, encryption at rest and naming conventions are useful, but they don’t prove that the data used for training is the data that was approved.` },
    { type: 'check', q: { q: 'A team’s training script always pulls the “latest” version of a shared dataset that several people can edit. Which change BEST protects training data integrity?', o: ['Schedule training only at night, when nobody is likely to be editing the shared dataset', 'Pin each run to a dataset version by content hash, and verify its signed manifest before training', 'Make a fresh copy of the latest dataset before each run, so edits during training can’t affect it', 'Ask everyone with write access to announce dataset changes in the team’s chat channel beforehand'], a: 1, b: 4,
      why: 'Pinning by content hash and verifying a signed manifest guarantees the run uses exactly the approved data and blocks anything altered. Copying “latest” still copies unapproved edits, and timing or announcements don’t prevent tampering.' } }
  ]
};
