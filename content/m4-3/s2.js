/* 4.3 · Section 2: integrity and confidentiality controls for data ingestion and transformation */
module.exports = {
  title: 'Protecting data ingestion and transformation', covers: [2],
  blocks: [
    { type: 'video', title: 'Clean data, kept clean', kicker: 'Module 4.3 · Video 2 of 5', scenes: [
      { t: 'title', kicker: 'Module 4.3 · MLOps security', title: 'Clean data, kept clean', sub: 'Integrity and confidentiality in ingestion and transformation', icon: 'filter',
        say: 'Between the raw sources and the training set sits a chain of ingestion and transformation jobs. Each one can corrupt the data, leak it, or quietly let poisoned records through. | This video covers integrity and confidentiality controls for data ingestion and transformation pipelines.' },
      { t: 'flow', title: 'Zones in a data pipeline',
        zones: [
          { id: 'zq', x: 330, y: 200, w: 300, h: 650, label: 'Quarantine', k: 'threat' },
          { id: 'zr', x: 660, y: 200, w: 290, h: 650, label: 'Raw', k: 'neutral' },
          { id: 'zc', x: 980, y: 200, w: 290, h: 650, label: 'Curated', k: 'data' } ],
        nodes: [
          { id: 'src', x: 180, y: 520, icon: 'globe', label: 'Sources', sub: 'internal and external', k: 'human', w: 230 },
          { id: 'q', x: 480, y: 520, icon: 'search', label: 'Validate', sub: 'schema, scans, hashes', k: 'threat', w: 260 },
          { id: 'raw', x: 805, y: 520, icon: 'archive', label: 'Immutable raw', sub: 'append-only, versioned', k: 'neutral', w: 250 },
          { id: 'cur', x: 1125, y: 520, icon: 'filter', label: 'Transform', sub: 'reviewed code, PII handled', k: 'data', w: 250 },
          { id: 'train', x: 1420, y: 520, icon: 'gpu', label: 'Training set', sub: 'pinned by hash', k: 'model', w: 220 } ],
        edges: [{ from: 'src', to: 'q', k: 'human' }, { from: 'q', to: 'raw', k: 'threat' }, { from: 'raw', to: 'cur', k: 'neutral' }, { from: 'cur', to: 'train', k: 'data' }],
        steps: [
          { show: 'src', hi: 'src' },
          { show: 'zq q src-q', flow: 'src-q', hi: 'q', mark: { q: 'q' } },
          { show: 'zr raw q-raw', flow: 'q-raw', hi: 'raw', mark: { raw: 'lock' } },
          { show: 'zc cur raw-cur', flow: 'raw-cur', hi: 'cur' },
          { show: 'train cur-train', flow: 'cur-train', hi: 'train', mark: { train: 'ok' } } ],
        say: 'Good pipelines move data through zones, each with its own controls. Data arrives from internal and external sources. | New data lands in quarantine first, where it is validated against its schema, scanned for malware, personal data and secrets, and checked against expected hashes. | Data that passes is written to an immutable raw zone: append-only and versioned, so the original can always be recovered and compared. | Transformation jobs, running reviewed and tested code, clean, join and enrich the data into a curated zone, handling personal data as policy requires. | And the training set is a pinned, hashed snapshot of curated data, so every model can be traced to exactly what it learned from.' },
      { t: 'bullets', title: 'Integrity controls', layout: 'grid', cols: 2, items: [
          { icon: 'doc', h: 'Data contracts', d: 'Agreed schemas, ranges, owners', k: 'neutral' },
          { icon: 'hash', h: 'Checksums per batch', d: 'Detect changes in transit or at rest', k: 'data' },
          { icon: 'archive', h: 'Immutable, versioned storage', d: 'Append-only raw zone', k: 'control' },
          { icon: 'code', h: 'Transformations as code', d: 'Reviewed, tested, versioned', k: 'model' },
          { icon: 'chart', h: 'Distribution checks', d: 'Spot shifts and outliers', k: 'human' },
          { icon: 'audit', h: 'Audit every write', d: 'Who changed what, when', k: 'threat' } ],
        say: 'Integrity controls stop data being corrupted, accidentally or deliberately. | Data contracts define agreed schemas, value ranges and owners for each feed. | Checksums for every batch detect changes in transit or at rest. | Immutable, versioned storage keeps an append-only raw zone that can’t be quietly rewritten. | Transformations are code: reviewed, tested and versioned, never edited by hand in production. | Distribution checks spot sudden shifts, outliers and unusual label changes, which can signal poisoning. | And every write is audited: who changed what, and when.' },
      { t: 'bullets', title: 'Confidentiality controls', layout: 'grid', cols: 2, items: [
          { icon: 'lock', h: 'Encrypt everywhere', d: 'In transit and at rest, managed keys', k: 'control' },
          { icon: 'id', h: 'Least-privilege jobs', d: 'Each job reads only what it needs', k: 'human' },
          { icon: 'fingerprint', h: 'Protect PII early', d: 'Tokenise or pseudonymise at ingestion', k: 'data' },
          { icon: 'layers', h: 'Column and row security', d: 'Fine-grained access in curated data', k: 'model' },
          { icon: 'split', h: 'Separate environments', d: 'No production data in development', k: 'neutral' },
          { icon: 'trash', h: 'Clean up intermediates', d: 'Temporary copies expire', k: 'threat' } ],
        say: 'Confidentiality controls stop the data leaking along the way. | Encrypt data in transit and at rest, with managed keys. | Give each job least privilege, reading only the data it needs, with its own identity. | Protect personal data early, tokenising or pseudonymising identifiers at ingestion, so later stages never see raw values. | Apply column- and row-level security in curated data. | Keep environments separate, with no production data in development unless it is masked or synthetic. | And clean up intermediate files and temporary copies, which are a common source of forgotten sensitive data.' },
      { t: 'summary', items: ['Quarantine, then immutable raw, then curated, then pinned snapshots', 'Contracts, checksums, versioning and audited writes protect integrity', 'Encryption, least privilege and early PII protection keep data confidential', 'Distribution checks catch poisoning before training'],
        say: 'To recap. | Move data from quarantine, to an immutable raw zone, to curated data, to pinned training snapshots. | Protect integrity with data contracts, checksums, versioning and audited writes. | Keep data confidential with encryption, least-privilege jobs and early protection of personal data. | And use distribution checks to catch poisoning before it reaches training.' } ] },
    { type: 'text', md: `### Pipeline zones
Many data platforms use a layered **"medallion"** pattern: **bronze** (raw, as ingested), **silver** (cleaned and conformed) and **gold** (curated for specific uses). Adding a **quarantine** zone in front of bronze, and treating bronze as immutable, gives a strong security structure:

| Zone | Purpose | Key controls |
|---|---|---|
| **Quarantine** | Hold new data until it passes checks | Schema validation, malware and secret scanning, PII detection, hash verification, source authentication |
| **Raw (bronze)** | Faithful, recoverable copy of what arrived | Append-only or object lock, versioning, encryption, restricted write access |
| **Curated (silver and gold)** | Cleaned, joined, enriched data | Transformations as reviewed code, data quality tests, column- and row-level security, lineage capture |
| **Training snapshots** | Exactly what a model learns from | Content hashes, immutable storage, links to the training run (Section 3) |

### Integrity
- **Data contracts** between producers and consumers specify schema, semantics, quality thresholds, owners and change processes; break the pipeline, rather than silently accept, when a contract is violated.
- **Checksums and signed manifests** for batches and files detect corruption and tampering between stages.
- **Versioned, immutable storage** (object lock, table formats with time travel, data version control tools) lets you prove what data looked like at any time, and roll back.
- **Data quality and distribution tests** (ranges, null rates, duplicates, label balance, outliers, near-duplicate clusters) catch both errors and poisoning attempts (Module 3.3).
- **Transformations as code**, through the same review and CI process as application code; no manual edits in production.
- **Audit logs** for writes, deletes and permission changes.

### Confidentiality
- Encryption in transit and at rest with managed keys (Module 3.4); private endpoints between pipeline components.
- **Per-job identities** with least privilege; no shared "data platform" super-account.
- **Early PII handling:** detect and tokenise or pseudonymise at ingestion; keep re-identification keys separately (Module 3.2).
- **Fine-grained access** in curated layers: column masking, row-level filters and purpose-based policies (Module 3.4).
- **Environment separation** and masked or synthetic data for development and testing.
- **Lifecycle management:** expire temporary tables, caches and exports; include them in retention schedules.

### Reproducibility as a security property
If you can re-run a transformation from a pinned raw snapshot and get identical output, you can detect tampering, investigate incidents and prove to auditors exactly how training data was produced (Module 3.1).` },
    { type: 'callout', kind: 'exam', title: 'Ingestion questions', md: `Favour designs where data is **validated before it is trusted** (quarantine), the original is **immutable and versioned**, and every transformation is **reviewed code with audit trails**. For confidentiality, protecting personal data **as early as possible** beats trying to protect it everywhere later.` },
    { type: 'match', title: 'Match the control to the zone', pairs: [
      ['Schema validation and malware scanning', 'Quarantine'],
      ['Append-only storage with versioning', 'Raw zone'],
      ['Reviewed and tested transformation code', 'Curated zone'],
      ['A content hash linked to the training run', 'Training snapshot'] ] },
    { type: 'check', q: { q: 'A pipeline lets analysts correct records directly in the raw data zone when they spot errors, overwriting the original files. What is the MAIN problem with this?', o: ['It makes the raw zone’s storage costs grow much faster than the costs of the pipeline’s other zones', 'Originals are lost, so tampering can’t be detected and changes can’t be traced or reversed', 'It means analysts must have training in the data platform’s query language', 'It slows down training, because corrected files must be downloaded again'], a: 1, b: 2,
      why: 'An immutable, versioned raw zone preserves what actually arrived, so corruption or poisoning can be detected, investigated and rolled back. Corrections belong in reviewed transformations that produce new versions, with audit trails.' } }
  ]
};
