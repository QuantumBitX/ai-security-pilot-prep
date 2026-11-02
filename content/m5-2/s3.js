/* 5.2 · Section 3: log integrity and evidence documentation */
module.exports = {
  title: 'Log integrity and evidence documentation', covers: [3],
  blocks: [
    { type: 'video', title: 'Logs you can stand behind', kicker: 'Module 5.2 · Video 3 of 5', scenes: [
      { t: 'title', kicker: 'Module 5.2 · AI security telemetry', title: 'Logs you can stand behind', sub: 'Log integrity and evidence documentation', icon: 'fingerprint',
        say: 'After an AI incident, logs become evidence, for the investigation, for regulators and sometimes for a court. Evidence is only useful if people can trust that it is complete and unaltered. | This video covers log integrity, and how to document evidence so it stands up to scrutiny.' },
      { t: 'bullets', title: 'Threats to AI logs', layout: 'grid', cols: 2, items: [
          { icon: 'pen', h: 'Tampering and deletion', d: 'Attackers cover their tracks', k: 'threat' },
          { icon: 'x', h: 'Gaps', d: 'Collectors fail; events dropped', k: 'neutral' },
          { icon: 'clock', h: 'Clock drift', d: 'Timelines no longer line up', k: 'human' },
          { icon: 'text', h: 'Log injection', d: 'Crafted input forges entries', k: 'data' },
          { icon: 'eye', h: 'Exposure', d: 'Logs leak the data they record', k: 'model' },
          { icon: 'layers', h: 'Missing context', d: 'No model or config version', k: 'control' } ],
        say: 'Six threats undermine AI logs. | Tampering and deletion: an attacker with access removes or edits the entries that show what they did. | Gaps: a collector fails, or a pipeline drops events under load, and nobody notices. | Clock drift: systems disagree about the time, so the timeline of an attack no longer lines up. | Log injection: input containing line breaks or control characters is written to logs unescaped, creating fake entries. With AI, any prompt or model output is untrusted input. | Exposure: logs full of prompts and outputs leak the very data they record. | And missing context: without model, prompt and configuration versions, nobody can explain why the system behaved as it did.' },
      { t: 'flow', title: 'A tamper-evident log pipeline',
        nodes: [
          { id: 'src', x: 230, y: 330, icon: 'server', label: 'Source', sub: 'sequence numbers, UTC time', k: 'neutral', w: 320 },
          { id: 'fwd', x: 700, y: 330, icon: 'link', label: 'Forwarder', sub: 'encrypted, acknowledged', k: 'data', w: 300 },
          { id: 'col', x: 1200, y: 330, icon: 'filter', label: 'Collector', sub: 'validate and escape', k: 'human', w: 290 },
          { id: 'store', x: 1200, y: 690, icon: 'archive', label: 'Immutable store', sub: 'WORM, hash chain', k: 'control', w: 300 },
          { id: 'chk', x: 700, y: 690, icon: 'check', label: 'Integrity checks', sub: 'digests, gap alerts', k: 'model', w: 300 },
          { id: 'inv', x: 230, y: 690, icon: 'lock', label: 'Controlled access', sub: 'least privilege, logged', k: 'threat', w: 310 } ],
        edges: [{ from: 'src', to: 'fwd', k: 'neutral' }, { from: 'fwd', to: 'col', k: 'data' }, { from: 'col', to: 'store', k: 'human' }, { from: 'store', to: 'chk', k: 'control' }, { from: 'chk', to: 'inv', k: 'model' }],
        steps: [
          { show: 'src', hi: 'src' },
          { show: 'fwd src-fwd', flow: 'src-fwd', hi: 'fwd' },
          { show: 'col fwd-col', flow: 'fwd-col', hi: 'col' },
          { show: 'store col-store', flow: 'col-store', hi: 'store', mark: { store: 'lock' } },
          { show: 'chk store-chk', flow: 'store-chk', hi: 'chk' },
          { show: 'inv chk-inv', flow: 'chk-inv', hi: 'inv', mark: { inv: 'ok' } } ],
        say: 'Here is a log pipeline designed for integrity. At the source, every event carries a sequence number and a timestamp from a synchronised clock, in universal time. | A forwarder sends events over an encrypted channel, buffering and retrying until the collector acknowledges them, so nothing is silently lost. | The collector validates events and escapes untrusted text, so injected line breaks can’t forge entries. | Events land in immutable, write-once storage, with each batch chained to the hash of the one before. | Integrity checks verify the hashes and signed digests, and alert on gaps in sequence numbers or sources that go quiet. | And access is controlled: investigators get least privilege, administrators of the logged systems can’t alter the logs, and every access is itself logged.' },
      { t: 'compare', title: 'Preventing and detecting log failures', labels: ['Tampering', 'Deletion', 'Gaps', 'Time'],
        cols: [{ h: 'Prevent', icon: 'shield', k: 'control' }, { h: 'Detect', icon: 'search', k: 'human' }],
        rows: [
          ['Separate log admin; write-only forwarding', 'Hash chains and signed digests'],
          ['WORM retention and legal holds', 'Alerts on deletion attempts'],
          ['Buffered, acknowledged delivery', 'Heartbeats and sequence checks'],
          ['Synchronised clocks, recorded in UTC', 'Clock-skew monitoring'] ],
        say: 'Integrity needs both prevention and detection. | To prevent tampering, separate log administration from the systems being logged, and let sources write but never edit. To detect it, use hash chains and signed digests. | To prevent deletion, use write-once retention and legal holds. To detect attempts, alert on them. | To prevent gaps, use buffered delivery with acknowledgements. To detect them, monitor heartbeats and sequence numbers. | And to keep time trustworthy, synchronise every clock and record times in universal time, while monitoring for skew.' },
      { t: 'flow', title: 'Documenting evidence',
        nodes: [
          { id: 'id', x: 230, y: 330, icon: 'search', label: 'Identify', sub: 'what is relevant', k: 'neutral', w: 280 },
          { id: 'col', x: 700, y: 330, icon: 'archive', label: 'Collect', sub: 'export with hashes', k: 'data', w: 290 },
          { id: 'pre', x: 1200, y: 330, icon: 'lock', label: 'Preserve', sub: 'immutable copy, hold', k: 'control', w: 300 },
          { id: 'doc', x: 1200, y: 690, icon: 'doc', label: 'Record custody', sub: 'who, what, when, hash', k: 'human', w: 320 },
          { id: 'ana', x: 700, y: 690, icon: 'copy', label: 'Analyse copies', sub: 'never the original', k: 'model', w: 300 },
          { id: 'rep', x: 230, y: 690, icon: 'book', label: 'Report', sub: 'repeatable findings', k: 'neutral', w: 290 } ],
        edges: [{ from: 'id', to: 'col', k: 'neutral' }, { from: 'col', to: 'pre', k: 'data' }, { from: 'pre', to: 'doc', k: 'control' }, { from: 'doc', to: 'ana', k: 'human' }, { from: 'ana', to: 'rep', k: 'model' }],
        steps: [
          { show: 'id', hi: 'id' },
          { show: 'col id-col', flow: 'id-col', hi: 'col' },
          { show: 'pre col-pre', flow: 'col-pre', hi: 'pre', mark: { pre: 'lock' } },
          { show: 'doc pre-doc', flow: 'pre-doc', hi: 'doc' },
          { show: 'ana doc-ana', flow: 'doc-ana', hi: 'ana' },
          { show: 'rep ana-rep', flow: 'ana-rep', hi: 'rep', mark: { rep: 'ok' } } ],
        say: 'When logs become evidence, document them carefully. First, identify what is relevant: which systems, identities, traces and time ranges. | Collect it by exporting the records and calculating a cryptographic hash of each export. | Preserve the originals in immutable storage, under a legal hold if needed. | Record the chain of custody: who collected what, when, from where, with which hash, and every hand-off since. | Analyse working copies, never the originals, verifying hashes before you start. | And report findings that another analyst could repeat from the same evidence.' },
      { t: 'summary', items: ['Protect logs from tampering, gaps, clock drift, injection and exposure', 'Sequence, escape, store immutably, verify and control access', 'Record model, prompt and configuration versions with events', 'Evidence: hash, preserve, record custody, analyse copies'],
        say: 'To recap. | Protect AI logs against tampering, gaps, clock drift, injection and exposure. | Number events, escape untrusted text, store logs immutably, verify them continuously and control access. | Record model, prompt and configuration versions alongside events. | And handle evidence carefully: hash it, preserve it, record the chain of custody and analyse only copies.' } ] },
    { type: 'text', md: `### Log integrity controls
- **Centralise quickly.** Forward logs off the source system as they are created, so an attacker who compromises an AI host or agent can’t erase the record.
- **Separate duties.** People who administer models, agents and platforms shouldn’t be able to change or delete their logs (Module 5.1).
- **Make logs tamper-evident.** Use write-once (WORM) storage or object lock, hash chaining or Merkle trees, and signed digests. Cloud services offer built-in options, such as AWS CloudTrail log file integrity validation, which produces signed, hashed digest files. Signed syslog (RFC 5848) and trusted timestamps (RFC 3161) exist for the same purpose.
- **Detect gaps.** Use sequence numbers, heartbeats and volume baselines per source. A source that goes silent during an incident is itself a signal.
- **Synchronise time.** Use authenticated time sources, record timestamps in UTC with time zone information, and monitor clock skew.
- **Neutralise log injection.** Treat prompts, retrieved content, tool results and model outputs as untrusted. Encode or escape control characters and line breaks before writing them, and prefer structured formats such as JSON with proper escaping (CWE-117 describes this weakness).
- **Protect content.** Logs containing prompts and outputs are sensitive. Apply the privacy controls in Section 4 and Module 3.5.

### Logs as evidence
Evidence must be **relevant, authentic, complete and reliable**. Good practice for digital evidence is set out in ISO/IEC 27037 (identification, collection, acquisition and preservation of digital evidence) and NIST SP 800-86 (integrating forensic techniques into incident response). For AI incidents:
- **Hash every export** (for example, SHA-256), record the hash in the evidence log, and verify it before each analysis.
- **Keep a chain of custody record:** item, source, collector, date and time, hash, storage location and each transfer.
- **Capture AI context:** model version and weights hash, system prompt and configuration versions, guardrail policies, retrieved document IDs, tool-call records and dataset snapshot references (Module 5.5 covers preserving these artefacts).
- **Remember non-determinism:** a model may not give the same answer twice, so the recorded output, or its keyed hash, is the evidence. You can’t simply regenerate it.
- **Apply legal holds** to suspend deletion when litigation or regulatory investigation is likely, overriding normal retention.
- **Document your methods:** which tools and queries were used, so findings can be reproduced.` },
    { type: 'steps', title: 'Preparing AI logs as evidence', items: [
      ['Scope the evidence', 'List the systems, identities, trace IDs and time ranges involved, including the model and agent versions in use at the time.'],
      ['Export and hash', 'Export the relevant records from the immutable store, and calculate a hash for each export.'],
      ['Preserve and hold', 'Store originals in write-once storage and apply a legal hold, so routine retention can’t delete them.'],
      ['Record custody', 'Log who collected each item, when, from where, its hash, where it is stored, and every transfer.'],
      ['Work on copies', 'Verify hashes, then analyse copies, recording the tools and queries used.'] ] },
    { type: 'callout', kind: 'exam', title: 'Log integrity questions', md: `Strong answers make logs **tamper-evident** (WORM, hash chains, signed digests), **complete** (acknowledged delivery, gap detection), **time-consistent** and **separately administered**. For evidence, look for **hashing, preservation, chain of custody and analysis of copies**. Logs stored only on the compromised host are a classic weak answer.` },
    { type: 'check', q: { q: 'During an investigation, analysts find that an AI agent’s logs were stored only on the agent’s own host, which the attacker controlled. What is the MOST important improvement?', o: ['Increase the size of the agent host’s local disk, so that logs are kept for longer', 'Forward logs in real time to a separately administered, immutable central store', 'Encrypt the logs on the agent host with a key stored on the same host', 'Ask the agent to summarise its own actions in a report at the end of each day'], a: 1, b: 3,
      why: 'Logs held on a compromised host can be altered or deleted. Forwarding them immediately to separately administered, immutable storage preserves them. A bigger disk, a local key and self-reporting by the agent don’t protect against an attacker on the host.' } }
  ]
};
