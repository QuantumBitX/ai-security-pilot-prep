/* 3.1 · Section 4: the AI data lifecycle */
module.exports = {
  title: 'The AI data lifecycle', covers: [6],
  blocks: [
    { type: 'video', title: 'The life of AI data', kicker: 'Module 3.1 · Video 4 of 4', scenes: [
      { t: 'title', kicker: 'Module 3.1 · Data governance', title: 'The life of AI data', sub: 'Collection, validation, transformation, retention, archiving and deletion', icon: 'cycle',
        say: 'Data for AI has a lifecycle, from the moment it is collected to the moment it is securely destroyed, and each stage needs its own controls. | This video walks through the AI data lifecycle, the controls at each stage, and why deletion has to travel all the way downstream.' },
      { t: 'cycle', title: 'The AI data lifecycle', center: 'AI data', centerSub: 'governed at every stage', intro: 'Each stage has an owner, controls and records.',
        stages: [
          { icon: 'database', label: 'Collect', d: 'Lawful, minimal, documented sources.' },
          { icon: 'check', label: 'Validate', d: 'Quality, schema and anomaly checks.' },
          { icon: 'filter', label: 'Transform', d: 'Clean, label, de-identify, version.' },
          { icon: 'gpu', label: 'Use', d: 'Training, retrieval, evaluation, under access control.' },
          { icon: 'archive', label: 'Retain and archive', d: 'Schedules, legal holds, protected archives.' },
          { icon: 'trash', label: 'Delete', d: 'Verified, and propagated downstream.' } ],
        say: 'The AI data lifecycle has six stages. | Collection: data is gathered from lawful, documented sources, and only as much as the purpose needs. | Validation: it is checked for quality, schema, completeness and anomalies, including signs of poisoning. | Transformation: it is cleaned, labelled, de-identified and versioned, with every step recorded. | Use: it trains models, feeds retrieval systems and supports evaluation, under access control. | Retention and archiving: it is kept according to schedules and legal holds, in protected archives. | And deletion: it is securely destroyed when no longer needed, with deletion verified and propagated downstream.' },
      { t: 'bullets', title: 'Validation checks for AI data', layout: 'grid', cols: 2, items: [
          { icon: 'list', h: 'Schema and completeness', d: 'Types, ranges, missing values', k: 'neutral' },
          { icon: 'chart', h: 'Statistical profile', d: 'Compare with the expected baseline', k: 'data' },
          { icon: 'copy', h: 'Duplicates', d: 'Exact and near-duplicate records', k: 'model' },
          { icon: 'tag', h: 'Label quality', d: 'Distribution shifts and noisy labels', k: 'human' },
          { icon: 'alert', h: 'Outliers and anomalies', d: 'Possible poisoning or corruption', k: 'threat' },
          { icon: 'fingerprint', h: 'Sensitive content', d: 'Unexpected personal data or secrets', k: 'control' } ],
        say: 'Validation is the first line of defence for data integrity. | Check schema and completeness: types, ranges and missing values. | Compare the statistical profile with an expected baseline, so unusual shifts stand out. | Find exact and near-duplicate records, which skew training and increase memorisation. | Check label quality: distributions that shift unexpectedly, or labels that disagree with the data. | Flag outliers and anomalies, which may signal poisoning or corruption. | And scan for unexpected sensitive content, such as personal data or secrets that shouldn’t be there.' },
      { t: 'flow', title: 'Deletion must travel downstream',
        nodes: [
          { id: 'src', x: 200, y: 510, icon: 'trash', label: 'Source record deleted', k: 'threat', w: 280 },
          { id: 'ds', x: 560, y: 330, icon: 'archive', label: 'Dataset versions', sub: 'purge or flag', k: 'data', w: 270 },
          { id: 'idx', x: 560, y: 690, icon: 'vector', label: 'Vector indexes', sub: 'delete chunks', k: 'data', w: 270 },
          { id: 'mod', x: 980, y: 330, icon: 'model', label: 'Trained models', sub: 'retrain or unlearn', k: 'model', w: 270 },
          { id: 'bak', x: 980, y: 690, icon: 'clock', label: 'Backups', sub: 'expire on schedule', k: 'neutral', w: 270 },
          { id: 'ven', x: 1360, y: 510, icon: 'building', label: 'Vendors', sub: 'deletion certified', k: 'human', w: 260 } ],
        edges: [{ from: 'src', to: 'ds', k: 'threat' }, { from: 'src', to: 'idx', k: 'threat' }, { from: 'ds', to: 'mod', k: 'model' }, { from: 'idx', to: 'bak', k: 'neutral' }, { from: 'mod', to: 'ven', k: 'human' }, { from: 'bak', to: 'ven', k: 'human' }],
        steps: [
          { show: 'src', hi: 'src' },
          { show: 'ds idx src-ds src-idx', flow: 'src-ds src-idx' },
          { show: 'mod bak ds-mod idx-bak', flow: 'ds-mod idx-bak' },
          { show: 'ven mod-ven bak-ven', flow: 'mod-ven bak-ven', hi: 'ven' } ],
        say: 'Deleting the source record is only the start. | Lineage tells you which dataset versions contain it, so they can be purged or flagged, and which retrieval indexes hold its chunks, so they can be deleted. | Models trained on it may need retraining or unlearning, according to a defined policy, and backups must expire on a known schedule. | And vendors that received the data must delete it too, and certify that they have. Without lineage, none of this can be scoped.' },
      { t: 'summary', items: ['Collect, validate, transform, use, retain and archive, delete', 'Validation catches quality problems and poisoning early', 'Every transformation recorded and versioned', 'Deletion propagates through datasets, indexes, models, backups, vendors'],
        say: 'To recap. | The AI data lifecycle runs from collection, validation and transformation, through use, to retention, archiving and deletion. | Validation catches quality problems and signs of poisoning early, before they reach a model. | Every transformation is recorded and versioned. | And deletion must propagate through dataset versions, indexes, models, backups and vendors.' } ] },
    { type: 'text', md: `### Stage by stage
| Stage | Key controls | Records |
|---|---|---|
| **Collection** | Lawful basis and consent; minimisation; source vetting and licence checks; secure transfer; classification at ingestion | Provenance, datasheet, SDIA where sensitive |
| **Validation** | Schema and completeness checks; statistical profiling against baselines; duplicate detection; label quality checks; outlier and poisoning screening; sensitive-content scanning | Validation reports; quarantined items |
| **Transformation** | Documented, version-controlled code; reproducible pipelines; de-identification; labelling under quality control; augmentation and synthetic generation recorded | Lineage; dataset versions and hashes |
| **Use** (training, retrieval, evaluation) | Access control by purpose; segregation of regulated data; train/validation/test separation; encryption; monitoring of access | Training run records; access logs |
| **Retention and archiving** | Retention schedules per dataset and artefact; legal holds; protected, access-controlled archives; periodic review | Retention register; hold records |
| **Deletion** | Secure deletion and cryptographic erasure; propagation to derived artefacts, models, indexes, backups and vendors; verification | Deletion certificates and logs |

### Validation as a security control
Data validation is often thought of as a quality step, but it is also the earliest point to detect **data poisoning** and **tampering** (Module 3.3). Useful checks include:
- **Schema, type and range** validation, so malformed or out-of-range values are rejected.
- **Statistical profiling** of features and labels against a trusted baseline, flagging distribution shifts between batches.
- **Duplicate and near-duplicate detection**, which reduces memorisation and catches repeated injected samples.
- **Label consistency checks**, comparing labels with model predictions or with independent annotators, to catch noisy or deliberately flipped labels.
- **Outlier and anomaly detection** on raw inputs and on embeddings, to spot unusual clusters.
- **Sensitive data scanning**, to stop personal data, secrets or restricted content entering training sets.
- **Source integrity checks**, verifying hashes and signatures against custody records.

### Transformation and reproducibility
Every transformation should be performed by **version-controlled code**, in a **reproducible pipeline**, producing a **versioned dataset** with a content hash. Reproducibility matters for security (you can rebuild a clean dataset after an incident), compliance (you can show exactly what data trained a model) and quality (you can explain changes in model behaviour).

Keep training, validation and test sets **strictly separated** to avoid leakage that inflates evaluation results, and keep a **held-out, access-controlled test set** for security and fairness evaluations.

### Retention, archiving and deletion
Retention periods should be defined for raw data, curated datasets, labels, embeddings, synthetic data, training run artefacts and models, balancing reproducibility and audit needs against minimisation and storage limitation. Archives must keep their classification and access controls; old training snapshots are attractive targets because they are often forgotten.

Deletion must be **propagated** using lineage: from source records to dataset versions, retrieval indexes, models (retrain or unlearn according to policy), caches, backups (expiry) and vendors (deletion with certification). **Cryptographic erasure** (destroying keys) is often the practical way to delete data across large, replicated stores and backups; Module 3.4 covers it with media sanitisation.`, },
    { type: 'steps', title: 'Onboard a new dataset for training', items: [
      ['Register and assess', 'Record the source, owner, licence and lawful basis. Classify the data and run an SDIA if it contains sensitive data.'],
      ['Transfer securely', 'Receive the data over an encrypted channel; record its hash and the custody hand-off.'],
      ['Validate', 'Run schema, profiling, duplicate, label and anomaly checks. Quarantine failures and investigate them.'],
      ['Transform and version', 'Apply de-identification and cleaning with version-controlled code; produce a hashed dataset version with lineage.'],
      ['Approve for use', 'The data owner approves the dataset for the specific purpose (for example, fine-tuning a named model), with access limited to that pipeline.'],
      ['Set retention', 'Record the retention period and deletion method for the dataset and any derived artefacts.'] ] },
    { type: 'callout', kind: 'exam', title: 'Earliest effective control', md: `Questions often ask for the **earliest** or **most effective** point to stop bad data. The answer is usually at **collection and validation**, before data reaches training or an index: source vetting, integrity verification, validation and quarantine. Fixing a model after poisoned data has been trained in is far more expensive.` },
    { type: 'check', q: { q: 'A new batch of training data shows a sudden shift in label distribution for one class compared with previous batches. What is the BEST next step?', o: ['Train on it anyway, since label distributions naturally shift between batches over time', 'Quarantine the batch and investigate the cause, checking source records for tampering or poisoning', 'Delete all previous batches and retrain only on the newest data, which best reflects current real-world conditions', 'Increase the learning rate for the affected class so the model adapts to the new distribution'], a: 1, b: 6,
      why: 'Unexpected label shifts can indicate errors or deliberate label manipulation. Validation should quarantine and investigate suspicious data before it reaches training.' } }
  ]
};
