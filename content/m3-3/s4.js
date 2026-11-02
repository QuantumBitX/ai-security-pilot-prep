/* 3.3 · Section 4: label integrity and malicious datasets */
module.exports = {
  title: 'Label integrity and malicious datasets', covers: [3],
  blocks: [
    { type: 'video', title: 'Labels and datasets you can’t take on trust', kicker: 'Module 3.3 · Video 4 of 5', scenes: [
      { t: 'title', kicker: 'Module 3.3 · Training data security', title: 'Labels and datasets you can’t take on trust', sub: 'Unauthorised label changes, annotation pipelines and malicious datasets', icon: 'tag',
        say: 'Two quieter threats sit inside the data supply chain: changes to labels, and datasets that are malicious in themselves. | This video covers how to protect labels through the annotation pipeline, and how to bring external datasets in safely.' },
      { t: 'flow', title: 'Securing the annotation pipeline',
        nodes: [
          { id: 'task', x: 220, y: 330, icon: 'doc', label: 'Labelling task', sub: 'minimised data only', k: 'data', w: 280 },
          { id: 'ann', x: 610, y: 330, icon: 'users', label: 'Vetted annotators', sub: 'MFA, least privilege', k: 'human', w: 290 },
          { id: 'gold', x: 1000, y: 330, icon: 'check', label: 'Quality checks', sub: 'gold items, consensus', k: 'control', w: 280 },
          { id: 'rev', x: 1380, y: 330, icon: 'hitl', label: 'Review and approve', sub: 'separate from labellers', k: 'model', w: 290 },
          { id: 'store', x: 1000, y: 690, icon: 'archive', label: 'Versioned labels', sub: 'audit log of every edit', k: 'neutral', w: 300 } ],
        edges: [{ from: 'task', to: 'ann', k: 'data' }, { from: 'ann', to: 'gold', k: 'human' }, { from: 'gold', to: 'rev', k: 'control' }, { from: 'rev', to: 'store', k: 'model' }],
        steps: [
          { show: 'task', hi: 'task' },
          { show: 'ann task-ann', flow: 'task-ann', hi: 'ann' },
          { show: 'gold ann-gold', flow: 'ann-gold', hi: 'gold' },
          { show: 'rev gold-rev', flow: 'gold-rev', hi: 'rev' },
          { show: 'store rev-store', flow: 'rev-store', hi: 'store', mark: { store: 'lock' } } ],
        say: 'Labels are the answers a model learns from, so changing them changes the model. Protection starts with the task itself: send annotators only the data they need. | Annotators, whether staff or a vendor, are vetted, use multi-factor authentication, and can reach only their assigned tasks. | Quality checks mix in gold-standard items with known answers, and compare several annotators on the same items. | Review and approval are separate from labelling, so no single person can both change and approve labels. | And approved labels are versioned, with an audit log of every edit, so unauthorised changes are visible and reversible.' },
      { t: 'bullets', title: 'Signs of label manipulation', items: [
          { icon: 'chart', h: 'Distribution shifts', d: 'Class balance changes between batches', k: 'data' },
          { icon: 'users', h: 'Annotator outliers', d: 'One person’s labels disagree with consensus', k: 'human' },
          { icon: 'model', h: 'Model disagreement', d: 'Confident predictions contradict labels', k: 'model' },
          { icon: 'clock', h: 'Odd edit patterns', d: 'Bulk changes, unusual hours, shared accounts', k: 'threat' },
          { icon: 'target', h: 'Clustered errors', d: 'Mistakes concentrate on one class or customer', k: 'neutral' } ],
        say: 'Unauthorised label changes leave traces. | Distribution shifts: the balance of classes changes unexpectedly between batches. | Annotator outliers: one person’s labels consistently disagree with the consensus. | Model disagreement: a trusted model confidently predicts something different from the label, across many items. | Odd edit patterns: bulk changes, edits at unusual hours, or shared accounts. | And clustered errors: mistakes that concentrate on one class, product or customer suggest intent rather than noise.' },
      { t: 'bullets', title: 'What makes a dataset malicious', layout: 'grid', cols: 2, items: [
          { icon: 'code', h: 'Code that runs on load', d: 'Unsafe file formats or loader scripts', k: 'threat' },
          { icon: 'alert', h: 'Poisoned samples', d: 'Backdoors or targeted errors', k: 'threat' },
          { icon: 'chat', h: 'Embedded instructions', d: 'Text aimed at models, not people', k: 'model' },
          { icon: 'scale', h: 'Biased or mislabelled content', d: 'Skews what the model learns', k: 'human' },
          { icon: 'gavel', h: 'Rights problems', d: 'No licence or consent for AI use', k: 'neutral' },
          { icon: 'copy', h: 'Impersonation', d: 'Look-alike names and fake publishers', k: 'data' } ],
        say: 'A dataset can be malicious in several ways. | It can contain code that runs when the dataset is loaded, through unsafe serialisation formats or loader scripts that execute on your machine. | It can contain poisoned samples designed to plant backdoors or targeted errors. | It can carry embedded instructions: text written for models rather than people, meant to manipulate a model that is fine-tuned on it or retrieves it. | It can be deliberately biased or mislabelled. | It can come with rights problems, such as no licence or consent for AI use. | And it can impersonate a trusted dataset, with a look-alike name or a fake publisher.' },
      { t: 'flow', title: 'Safe intake for external datasets',
        nodes: [
          { id: 'find', x: 220, y: 330, icon: 'search', label: 'Discover', sub: 'check publisher and licence', k: 'neutral', w: 280 },
          { id: 'pin', x: 600, y: 330, icon: 'hash', label: 'Pin and hash', sub: 'exact version, verified copy', k: 'data', w: 290 },
          { id: 'scan', x: 990, y: 330, icon: 'shield', label: 'Scan in a sandbox', sub: 'safe formats; no code runs', k: 'threat', w: 300 },
          { id: 'prof', x: 1370, y: 330, icon: 'chart', label: 'Profile content', sub: 'poison, PII, instructions', k: 'model', w: 280 },
          { id: 'appr', x: 1370, y: 690, icon: 'check', label: 'Approve and register', sub: 'owner sign-off; AIBOM', k: 'control', w: 290 },
          { id: 'mir', x: 990, y: 690, icon: 'archive', label: 'Internal mirror', sub: 'teams use only this copy', k: 'neutral', w: 300 } ],
        edges: [{ from: 'find', to: 'pin', k: 'neutral' }, { from: 'pin', to: 'scan', k: 'data' }, { from: 'scan', to: 'prof', k: 'threat' }, { from: 'prof', to: 'appr', k: 'model' }, { from: 'appr', to: 'mir', k: 'control' }],
        steps: [
          { show: 'find', hi: 'find' },
          { show: 'pin find-pin', flow: 'find-pin', hi: 'pin' },
          { show: 'scan pin-scan', flow: 'pin-scan', hi: 'scan' },
          { show: 'prof scan-prof', flow: 'scan-prof', hi: 'prof' },
          { show: 'appr prof-appr', flow: 'prof-appr', hi: 'appr', mark: { appr: 'ok' } },
          { show: 'mir appr-mir', flow: 'appr-mir', hi: 'mir' } ],
        say: 'Bring external datasets in through a controlled intake. Start by checking the publisher, the datasheet and the licence. | Pin the exact version and record its hash, rather than pulling whatever is latest. | Scan it in an isolated sandbox. Prefer data formats that can’t execute code, and never run loader scripts you haven’t reviewed. | Profile the content for poisoning signals, personal data, secrets, embedded instructions and bias. | The data owner approves it, and it is registered in the AI bill of materials. | Then teams use only the approved internal mirror, so the copy they train on is the copy you checked.' },
      { t: 'summary', items: ['Labels change models: version them, separate labelling from approval', 'Watch for shifts, outliers, disagreement and odd edits', 'Datasets can carry code, poison, instructions and rights problems', 'Intake: pin, hash, sandbox-scan, profile, approve, mirror'],
        say: 'To recap. | Labels change models, so version them, and separate labelling from approval. | Watch for distribution shifts, annotator outliers, model disagreement and odd edit patterns. | Datasets can carry code, poison, embedded instructions and rights problems. | So bring them in through a controlled intake: pin, hash, scan in a sandbox, profile, approve and mirror.' } ] },
    { type: 'text', md: `### Protecting labels
A model learns whatever its labels say, so label integrity is model integrity. Threats include **label flipping** (random or targeted), edits by insiders or through compromised annotator accounts, careless or malicious crowd workers, and manipulated **preference data** used for fine-tuning and RLHF-style training.

Controls:
- **Annotation vendors:** due diligence, contracts with security and confidentiality terms, a right to audit, and screening where appropriate (Module 2.5).
- **Platform security:** single sign-on and MFA, least privilege per task, no shared accounts, session logging, and data minimisation (send only what is needed, and redact where possible).
- **Quality controls:** gold-standard items, overlapping assignments, inter-annotator agreement measures (such as Cohen’s kappa), adjudication of disagreements, and spot audits.
- **Separation of duties:** labellers can’t approve their own work or edit approved labels.
- **Tamper evidence:** immutable label versions, signed exports, audit logs, and a comparison of label versions before each training run.
- **Detection:** monitor label distributions per batch and per annotator, and flag items where a trusted model strongly disagrees with the label.

### Malicious datasets
| Risk | Why it matters | Control |
|---|---|---|
| **Executable content** | Some serialisation formats, notably Python pickle, can run code when loaded, and some datasets ship loader scripts | Prefer formats that can’t execute code (CSV, JSON, Parquet, Arrow; safetensors for tensors); refuse unreviewed loader scripts; load in sandboxes |
| **Poisoned samples** | Backdoors and targeted errors | Profiling, anomaly detection, provenance (Section 2) |
| **Embedded instructions** | Text that manipulates models during fine-tuning or retrieval | Scan for instruction-like content; treat external text as untrusted (Module 4.4) |
| **Bias and mislabelling** | Skewed behaviour | Datasheets, representativeness checks, bias evaluation |
| **Rights problems** | No licence or consent for AI use | Licence review and provenance records (Module 2.4) |
| **Impersonation** | Look-alike names, fake publishers, compromised accounts | Verified publishers, pinned versions and hashes, internal mirrors |

Security researchers have repeatedly found files on public model and dataset hubs that execute code when loaded, so treat downloads from hubs like any other untrusted software.

### Intake checklist
1. Verify the publisher, and read the datasheet and licence.
2. Pin the exact version (a commit or hash), not “latest”.
3. Download into an isolated environment, and scan the files and formats.
4. Profile the content for poisoning signals, personal data, secrets, instructions and bias.
5. Obtain the data owner’s approval for the intended use.
6. Register the dataset in the AIBOM and inventory, with its provenance.
7. Serve it from an internal, access-controlled mirror, and re-verify hashes before training.` },
    { type: 'flip', title: 'Label and dataset controls', cards: [
      ['Gold-standard items', 'Items with known correct labels mixed into annotation work, to measure each annotator’s accuracy and catch deliberate errors.'],
      ['Inter-annotator agreement', 'How consistently different annotators label the same items. Low agreement flags unclear guidelines, carelessness or manipulation.'],
      ['Separation of duties for labels', 'The person who labels data can’t approve it or edit approved labels, so one compromised account can’t rewrite the training set.'],
      ['Unsafe serialisation', 'File formats such as Python pickle that can execute code when loaded. Use safe formats or load only inside a sandbox.'] ] },
    { type: 'callout', kind: 'exam', title: 'External data is untrusted input', md: `Treat external datasets like third-party software: **verify the publisher, pin the version, scan in isolation, prefer safe formats, and serve from an internal mirror**. Popularity, download counts and community comments are not security controls.` },
    { type: 'check', q: { q: 'A data science team wants a popular dataset from a public hub. Its files use a serialisation format that can execute code when loaded. What is the BEST approach?', o: ['Load it on a developer laptop first, since laptops are isolated from the production systems', 'Load and convert it in an isolated sandbox, or obtain a safe-format version, then scan and approve it', 'Trust it because it is popular, since many other users would already have noticed any malicious content', 'Ask the hub’s community whether anyone has reported problems with this dataset before using it'], a: 1, b: 3,
      why: 'Code-executing formats should only be opened in isolation, or replaced with safe formats, before the data is scanned, profiled and approved. Developer laptops hold credentials and network access, and popularity isn’t evidence of safety.' } }
  ]
};
