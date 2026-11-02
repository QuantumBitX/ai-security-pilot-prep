/* 3.5 · Section 6: privacy-preserving audit trails for AI data events */
module.exports = {
  title: 'Privacy-preserving audit trails for AI data events', covers: [6],
  blocks: [
    { type: 'video', title: 'Record everything, expose nothing', kicker: 'Module 3.5 · Video 6 of 6', scenes: [
      { t: 'title', kicker: 'Module 3.5 · Model lifecycle', title: 'Record everything, expose nothing', sub: 'Privacy-preserving audit trails for AI data events', icon: 'audit',
        say: 'AI systems need audit trails: to investigate incidents, prove compliance and reconstruct how a decision was made. | But the prompts and outputs most worth logging are often the most sensitive data you hold. This video covers how to record AI data events without creating a new privacy problem.' },
      { t: 'bullets', title: 'AI data events to record', layout: 'grid', cols: 2, items: [
          { icon: 'database', h: 'Data access', d: 'Datasets read, retrieval queries', k: 'data' },
          { icon: 'gpu', h: 'Training and tuning', d: 'Runs, data versions, launcher', k: 'model' },
          { icon: 'branch', h: 'Model changes', d: 'Approvals, deploys, rollbacks', k: 'control' },
          { icon: 'chat', h: 'Inference', d: 'Caller, version, decision, policy hits', k: 'neutral' },
          { icon: 'robot', h: 'Agent actions', d: 'Tool calls and data touched', k: 'threat' },
          { icon: 'user', h: 'Data subject events', d: 'Consent, access, erasure, unlearning', k: 'human' } ],
        say: 'Start by deciding which events matter. | Data access: which datasets were read, and which documents retrieval returned. | Training and fine-tuning: each run, the data versions it used, and who launched it. | Model changes: registrations, approvals, deployments and rollbacks. | Inference: who called which model version, when, what was decided, and which policies fired. | Agent actions: every tool call, and the data each one touched. | And data subject events: consent changes, access and erasure requests, and unlearning.' },
      { t: 'compare', title: 'Finding the balance', labels: ['Investigations', 'Compliance', 'Privacy risk', 'If breached'],
        cols: [{ h: 'Log too little', icon: 'eye', k: 'neutral' }, { h: 'Log too much', icon: 'database', k: 'threat' }],
        rows: [
          ['Can’t reconstruct what happened', 'Evidence buried in noise'],
          ['Can’t show traceability', 'Breaks minimisation and retention'],
          ['Low', 'A new trove of sensitive data'],
          ['Little to lose', 'Prompts and outputs exposed'] ],
        say: 'Logging is a balance. | Log too little, and you can’t reconstruct an incident. Log too much, and the evidence is buried in noise. | Too little, and you can’t show the traceability that regulators expect. Too much, and you break data minimisation and storage limits. | Logging too little creates little privacy risk, but logging everything creates a new store of highly sensitive data. | And if that store is breached, every prompt and output in it is exposed.' },
      { t: 'flow', title: 'A privacy-preserving logging design',
        nodes: [
          { id: 'app', x: 200, y: 500, icon: 'chat', label: 'AI application', sub: 'emits events', k: 'model', w: 250 },
          { id: 'meta', x: 580, y: 300, icon: 'list', label: 'Event log', sub: 'metadata only', k: 'data', w: 290 },
          { id: 'vault', x: 580, y: 700, icon: 'lock', label: 'Content vault', sub: 'redacted, encrypted', k: 'control', w: 300 },
          { id: 'store', x: 1000, y: 300, icon: 'hash', label: 'Tamper-evident store', sub: 'hash-chained', k: 'neutral', w: 320 },
          { id: 'glass', x: 1000, y: 700, icon: 'key', label: 'Break-glass access', sub: 'approved, logged', k: 'human', w: 320 },
          { id: 'ret', x: 1385, y: 500, icon: 'trash', label: 'Retention', sub: 'timed deletion', k: 'threat', w: 220 } ],
        edges: [{ from: 'app', to: 'meta', k: 'data' }, { from: 'app', to: 'vault', k: 'control' }, { from: 'meta', to: 'store', k: 'neutral' }, { from: 'vault', to: 'glass', k: 'human' }, { from: 'store', to: 'ret', k: 'threat' }, { from: 'glass', to: 'ret', k: 'threat' }],
        steps: [
          { show: 'app', hi: 'app' },
          { show: 'meta app-meta', flow: 'app-meta', hi: 'meta' },
          { show: 'vault app-vault', flow: 'app-vault', hi: 'vault', mark: { vault: 'lock' } },
          { show: 'store meta-store', flow: 'meta-store', hi: 'store' },
          { show: 'glass vault-glass', flow: 'vault-glass', hi: 'glass', mark: { glass: 'key' } },
          { show: 'ret store-ret glass-ret', flow: 'store-ret glass-ret', hi: 'ret' } ],
        say: 'Here is one design that keeps both accountability and privacy. The AI application emits events as it works. | Metadata goes to the main event log: who, when, which model version, which policies fired, and a keyed hash of the content, with user identifiers pseudonymised. | Content, meaning prompts and outputs, goes only where it is needed, into a separate vault: redacted, encrypted with its own keys, and kept for a short time. | The event log is written to tamper-evident storage: append-only, with each entry chained to the hash of the one before. | Reading the content vault needs break-glass access: approved, tied to a stated purpose such as an investigation, and itself logged. | And everything follows a retention schedule, with deletion carried out automatically.' },
      { t: 'bullets', title: 'Privacy techniques for audit logs', items: [
          { icon: 'filter', h: 'Minimise', d: 'Log what a defined purpose needs', k: 'data' },
          { icon: 'fingerprint', h: 'Pseudonymise identifiers', d: 'Keyed hashes, key held apart', k: 'model' },
          { icon: 'x', h: 'Redact before storing', d: 'DLP on prompts and outputs', k: 'threat' },
          { icon: 'key', h: 'Encrypt and separate', d: 'Own keys, own access roles', k: 'control' },
          { icon: 'calendar', h: 'Limit retention', d: 'Legal minimum, then delete', k: 'human' } ],
        say: 'Five techniques do most of the work. | Minimise: log what a defined purpose needs, and no more. | Pseudonymise user identifiers with keyed hashes, holding the key separately, so re-identification needs a controlled step. | Redact personal data and secrets from prompts and outputs before they are stored, using the same data loss prevention as the gateway. | Encrypt logs with their own keys and access roles, separate from the systems they record. | And keep logs for as long as law and purpose require, then delete them automatically.' },
      { t: 'summary', items: ['Decide which AI data events must be recorded, and why', 'Keep metadata and content apart; protect content most', 'Make logs tamper-evident; control and log access to them', 'Minimise, pseudonymise, redact, encrypt, and delete on schedule'],
        say: 'To recap. | Decide which AI data events must be recorded, and for what purpose. | Keep metadata and content apart, and protect the content most strongly. | Make logs tamper-evident, and control and log every access to them. | And minimise, pseudonymise, redact, encrypt, and delete on schedule.' } ] },
    { type: 'text', md: `### Why AI audit trails matter
Audit trails let you investigate incidents (what data did the agent access, and which model version answered?), demonstrate compliance, support people’s rights (what was decided about me, and how?) and prove that deletion and unlearning requests were carried out.

### Requirements to know
| Source | What it requires |
|---|---|
| **EU AI Act, Article 12** | High-risk AI systems must technically allow **automatic recording of events (logs)** over their lifetime, to support traceability, post-market monitoring and identification of risks |
| **EU AI Act, Articles 19 and 26(6)** | Providers and deployers keep the logs under their control for a period appropriate to the purpose, **at least six months**, unless other law (such as data protection law) provides otherwise |
| **GDPR** | Logs containing personal data are personal data: data minimisation, storage limitation, security (Article 32), and they fall within access and erasure requests |
| **HIPAA Security Rule** | **Audit controls** (45 CFR 164.312(b)): mechanisms to record and examine activity in systems containing ePHI |
| **PCI DSS v4.0, Requirement 10** | Log and monitor all access to cardholder data; keep audit logs for **at least 12 months**, with the last 3 months immediately available |
| **ISO/IEC 42001** | Annex A control on recording event logs for AI systems, at least while the system is in use |

### Designing privacy-preserving audit trails
- **Separate metadata from content.** The main event log records who, what, when, which model version, which data sources and which policies fired. Prompts and outputs go to a separate, more restricted store, only where a defined purpose needs them.
- **Link without exposing.** Store a **keyed hash** of each prompt and output in the event log. Investigators can then prove what was said by matching retained content to its hash, without the main log holding the text. The hash must be keyed, because short or predictable text can otherwise be guessed and confirmed.
- **Pseudonymise** user identifiers with keyed hashing (Module 3.2), with the key held by a separate team. Pseudonymised data is still personal data under the GDPR.
- **Redact or tokenise** personal data and secrets before storage, using the gateway’s DLP (Module 3.4).
- **Encrypt** with dedicated keys. Per-user or per-period keys make deletion practical through **crypto-shredding**, which helps with erasure requests and retention limits.
- **Control access.** Grant least privilege, require **break-glass** approval and a stated purpose to read content, and log every access to the logs themselves.
- **Make logs tamper-evident.** Use write-once (WORM) storage, **hash chaining** (each entry includes the hash of the previous one) or Merkle trees, signed checkpoints and trusted timestamps, with log administration separated from the systems being logged.
- **Retain deliberately.** Set periods from legal minimums and purpose, delete automatically, and use a formal **legal hold** to suspend deletion when litigation or an investigation requires it.
- **Cover suppliers.** Model providers may keep your prompts for abuse monitoring. Check retention terms and zero-data-retention options in the contract (Modules 2.4 and 2.5).

For analysis across many users, such as usage trends or abuse patterns, prefer aggregated statistics, and consider differential privacy for metrics shared widely. Module 5.2 covers security telemetry pipelines, log integrity and evidence handling in operations.` },
    { type: 'callout', kind: 'exam', title: 'Audit trail questions', md: `Expect answers to balance **accountability with privacy**. "Log nothing" fails traceability, and "log every prompt forever in the central SIEM" fails minimisation and security. The best answer usually **records event metadata broadly, keeps content selectively in a protected store, makes logs tamper-evident and limits retention**.` },
    { type: 'check', q: { q: 'A team proposes logging every full prompt and response indefinitely in the central SIEM, so that investigators always have complete records. What is the BEST response?', o: ['Approve it, because complete and permanent records always give investigators the best evidence', 'Log metadata centrally; keep redacted content in a separate encrypted store with access and retention limits', 'Stop logging AI interactions altogether, because prompts are too sensitive to store anywhere', 'Log only the prompts, because responses are generated by the model and so contain no personal data'], a: 1, b: 6,
      why: 'Metadata in the central log supports investigations, while redacted content in a separate, encrypted, access-controlled store with retention limits respects minimisation and security. Permanent full logging creates a sensitive trove; logging nothing loses traceability; outputs can contain personal data too.' } }
  ]
};
