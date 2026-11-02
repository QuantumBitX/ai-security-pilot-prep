/* 3.6 · Section 3: model watermarking and fingerprinting */
module.exports = {
  title: 'Model watermarking and fingerprinting', covers: [3],
  blocks: [
    { type: 'video', title: 'Proving a model is yours', kicker: 'Module 3.6 · Video 3 of 5', scenes: [
      { t: 'title', kicker: 'Module 3.6 · Model CIA', title: 'Proving a model is yours', sub: 'Watermarks and fingerprints for models and their outputs', icon: 'fingerprint',
        say: 'If a competitor launches a model that behaves suspiciously like yours, how would you prove it was copied? And which of your licensees leaked it? | This video covers model watermarking and fingerprinting: ways to mark and identify models, and their outputs, so ownership and origin can be checked.' },
      { t: 'compare', title: 'Watermarks and fingerprints', labels: ['What it is', 'Changes model?', 'Best for', 'Example'],
        cols: [{ h: 'Watermark', icon: 'wave', k: 'model' }, { h: 'Fingerprint', icon: 'fingerprint', k: 'data' }],
        rows: [
          ['A hidden signal you embed', 'A trait you identify'],
          ['Yes, in training or generation', 'Not necessarily'],
          ['Proving ownership; marking output', 'Identifying a model or a copy'],
          ['Secret trigger responses', 'Unique per-licensee copy'] ],
        say: 'The two terms overlap, but the core difference is simple. | A watermark is a hidden signal you deliberately embed. A fingerprint is a characteristic you use to identify a model. | Watermarking changes the model, or the way it generates output. Passive fingerprinting needs no change at all, though you can also embed a different fingerprint in each copy you distribute. | Watermarks are used to prove ownership and to mark generated content. Fingerprints identify which model, or which copy, you are looking at. | For example: a watermark might be a set of secret inputs with unusual expected answers, while a fingerprint might be unique to each licensee’s copy.' },
      { t: 'flow', title: 'Verifying ownership with a trigger set',
        nodes: [
          { id: 'mk', x: 240, y: 330, icon: 'key', label: 'Create secret triggers', sub: 'inputs with set answers', k: 'neutral', w: 310 },
          { id: 'tr', x: 710, y: 330, icon: 'gpu', label: 'Train them in', sub: 'normal accuracy kept', k: 'model', w: 280 },
          { id: 'rel', x: 1200, y: 330, icon: 'globe', label: 'Release the model', sub: 'triggers stay secret', k: 'data', w: 290 },
          { id: 'sus', x: 1200, y: 680, icon: 'search', label: 'Suspect model found', sub: 'query the triggers', k: 'threat', w: 300 },
          { id: 'ev', x: 710, y: 680, icon: 'gavel', label: 'Evidence', sub: 'matches far above chance', k: 'control', w: 290 } ],
        edges: [{ from: 'mk', to: 'tr', k: 'neutral' }, { from: 'tr', to: 'rel', k: 'model' }, { from: 'rel', to: 'sus', k: 'data' }, { from: 'sus', to: 'ev', k: 'threat' }],
        steps: [
          { show: 'mk', hi: 'mk' },
          { show: 'tr mk-tr', flow: 'mk-tr', hi: 'tr' },
          { show: 'rel tr-rel', flow: 'tr-rel', hi: 'rel' },
          { show: 'sus rel-sus', flow: 'rel-sus', hi: 'sus' },
          { show: 'ev sus-ev', flow: 'sus-ev', hi: 'ev', mark: { ev: 'ok' } } ],
        say: 'Here is one common ownership watermark, called a trigger set. The owner creates a set of secret inputs, each paired with an unusual answer that no independent model would give. | These pairs are trained into the model alongside its normal data, without affecting ordinary accuracy. | The model is released or deployed, and the trigger set is kept secret. | Later, a suspect model appears. The owner queries it with the triggers. | If it gives the planted answers far more often than chance would explain, that is strong evidence it was derived from the original.' },
      { t: 'bullets', title: 'Where watermarks and fingerprints help', items: [
          { icon: 'gavel', h: 'Ownership disputes', d: 'Evidence that a model was copied', k: 'control' },
          { icon: 'users', h: 'Tracing leaks', d: 'A unique copy for each licensee', k: 'human' },
          { icon: 'image', h: 'Marking generated content', d: 'Signals that output is AI-made', k: 'model' },
          { icon: 'check', h: 'Verifying a model', d: 'Is this the version we approved?', k: 'data' } ],
        say: 'These techniques support four practical goals. | In ownership disputes, they provide evidence that a model was copied or derived. | When a model is licensed to several parties, a unique fingerprint in each copy shows which one leaked. | Output watermarks mark generated text, images and audio as AI-made, which Module 2.6 covers for transparency. | And behavioural fingerprints help confirm that a hosted model is the version you approved.' },
      { t: 'bullets', title: 'Know the limits', items: [
          { icon: 'x', h: 'Can be removed or weakened', d: 'Fine-tuning, paraphrasing, distillation', k: 'threat' },
          { icon: 'alert', h: 'False positives', d: 'Treat as evidence, not proof', k: 'human' },
          { icon: 'key', h: 'Protect the keys', d: 'Leaked triggers can be erased', k: 'data' },
          { icon: 'unlock', h: 'Open weights', d: 'Marking can be switched off', k: 'neutral' } ],
        say: 'Watermarks and fingerprints have real limits. | Determined attackers can remove or weaken them, by fine-tuning a stolen model, paraphrasing watermarked text, or distilling a new model from outputs. | Detection can produce false positives, so treat results as evidence alongside logs and contracts, not as proof on their own. | Watermark keys and trigger sets must stay secret, because an attacker who learns them can target them. | And with open weights, output watermarking built into the generation code can simply be switched off.' },
      { t: 'summary', items: ['Watermarks are embedded; fingerprints identify', 'Trigger sets give evidence of copying', 'Unique per-copy fingerprints trace leaks', 'Signals can be degraded: combine with other evidence'],
        say: 'To recap. | Watermarks are signals you embed; fingerprints are characteristics that identify a model or a copy. | Trigger sets give evidence that a suspect model was derived from yours. | Unique fingerprints in each distributed copy trace a leak to its source. | And because these signals can be degraded or removed, combine them with logs, contracts and other evidence.' } ] },
    { type: 'text', md: `### Types and terms
| Technique | How it works | Typical use |
|---|---|---|
| **White-box model watermark** | A pattern embedded in the weights, readable by someone with the weights and the key | Proving ownership of a recovered copy of the weights |
| **Black-box (trigger-set) watermark** | Secret inputs trained to produce specific outputs; checked through queries alone | Testing a suspect model behind an API |
| **Output watermark** | A statistical signal in generated text (such as a subtle, keyed bias in word choice) or an imperceptible signal in images, audio or video | Marking content as AI-generated; tracing content to a model |
| **Passive fingerprint** | Characteristic responses or weight statistics that identify a model without changing it | Identifying which base model a product uses; detecting silent changes |
| **Active fingerprint (per copy)** | A different mark embedded in each distributed copy | Tracing which licensee’s copy leaked |

Examples include Google DeepMind’s SynthID, which watermarks generated text, images, audio and video, and **C2PA content credentials**, which attach signed provenance metadata rather than embedding a signal (Module 2.6). The two approaches complement each other: metadata is easily stripped, while watermarks survive some edits but can be degraded.

### Robustness and limits
- **Removal:** fine-tuning or pruning a stolen model can weaken weight and trigger-set watermarks; paraphrasing or translating text, and cropping or compressing images, can weaken output watermarks.
- **Distillation:** a substitute model trained on your outputs may not inherit trigger-set watermarks. Output watermarks, or fingerprints tuned to survive distillation, may still carry over.
- **False positives:** detectors produce errors, especially on short texts. Never base serious action, such as accusing a student or employee of using AI, on a detector score alone.
- **Key management:** watermark keys and trigger sets are secrets. Restrict access and keep verification in trusted hands.
- **Quality:** strong watermarks can slightly reduce output quality, so tune strength to the risk.

### Governance
- Decide which models get ownership watermarks, and whether distributed copies get per-licensee fingerprints.
- Record watermark and fingerprint details, and their keys, in the registry under restricted access.
- Keep supporting evidence such as training records, version history and access logs; it makes a watermark result far more persuasive in a dispute.
- Add output marking where transparency rules or policy require it (EU AI Act Article 50; Module 2.6).` },
    { type: 'check', q: { q: 'A company licenses its proprietary model to five partners, and a copy later appears on a file-sharing site. Which technique would BEST have identified the partner whose copy leaked?', o: ['A single trigger-set watermark shared by all five copies of the model', 'A unique fingerprint embedded in each partner’s copy before it was distributed', 'A C2PA content credential attached to each output that the model generates', 'A SHA-256 hash of the model published on the company’s website at release'], a: 1, b: 3,
      why: 'Per-licensee fingerprints make each copy distinguishable, so a leaked copy points to its source. A shared watermark proves ownership but not which copy leaked, credentials mark outputs, and one public hash can’t tell copies apart.' } }
  ]
};
