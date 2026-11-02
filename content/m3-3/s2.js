/* 3.3 · Section 2: data poisoning and backdoors */
module.exports = {
  title: 'Data poisoning and backdoors', covers: [2],
  blocks: [
    { type: 'video', title: 'Poisoned at the source', kicker: 'Module 3.3 · Video 2 of 5', scenes: [
      { t: 'title', kicker: 'Module 3.3 · Training data security', title: 'Poisoned at the source', sub: 'Data poisoning and backdoors, and the controls that stop them', icon: 'alert',
        say: 'Data poisoning attacks a model before it exists, by corrupting what it learns from. | This video explains the main types of poisoning and backdoors at a conceptual level, and the controls that detect and prevent them.' },
      { t: 'compare', title: 'Three goals of poisoning', labels: ['Aim', 'Example', 'Detectability'],
        cols: [{ h: 'Availability', icon: 'stop', k: 'neutral' }, { h: 'Targeted', icon: 'target', k: 'human' }, { h: 'Backdoor', icon: 'key', k: 'threat' }],
        rows: [
          ['Degrade overall performance', 'Fail on chosen inputs', 'Hidden behaviour on a trigger'],
          ['A spam filter becomes unreliable', 'One malware family slips through', 'Normal until a phrase appears'],
          ['Easier: accuracy drops', 'Harder: metrics look fine', 'Hardest: passes normal tests'] ],
        say: 'Poisoning has three broad goals. | Availability poisoning degrades the model overall. Targeted poisoning makes it fail on specific, chosen inputs. Backdoor poisoning plants hidden behaviour that activates only when a trigger appears. | For example: a spam filter that becomes unreliable for everyone; a malware classifier that lets one malware family through; or a model that behaves normally until a particular phrase appears in its input. | Availability attacks are the easiest to spot, because accuracy drops. Targeted attacks are harder, because overall metrics look fine. Backdoors are the hardest of all, because the model passes normal testing.' },
      { t: 'stat', kicker: 'Poison doesn’t dilute', num: { v: 250, label: 'poisoned documents backdoored models from 600M to 13B parameters (2025 study)' },
        def: 'The number needed stayed roughly constant as models and data grew, so the poisoned share became tiny.',
        ex: 'The backdoor was narrow, but the lesson is general: clean data won’t wash poison out.',
        say: 'A common assumption is that a few bad samples will be diluted by billions of good ones. A twenty twenty-five study by Anthropic, the UK AI Security Institute and the Alan Turing Institute tested that. | Around two hundred and fifty poisoned documents were enough to implant a simple backdoor in models from six hundred million to thirteen billion parameters, and the number stayed roughly constant as models and datasets grew. | The backdoor tested was narrow and low-stakes, but the lesson is general: don’t rely on volume to wash poison out.' },
      { t: 'flow', title: 'How a backdoor works, conceptually',
        nodes: [
          { id: 'pois', x: 240, y: 330, icon: 'alert', label: 'Poisoned samples', sub: 'trigger paired with chosen behaviour', k: 'threat', w: 340 },
          { id: 'clean', x: 240, y: 690, icon: 'database', label: 'Clean data', sub: 'the vast majority', k: 'data', w: 300 },
          { id: 'train', x: 690, y: 510, icon: 'gpu', label: 'Training', k: 'model', w: 240 },
          { id: 'model', x: 1060, y: 510, icon: 'model', label: 'Backdoored model', k: 'threat', w: 290 },
          { id: 'norm', x: 1390, y: 330, icon: 'check', label: 'Normal input', sub: 'correct output', k: 'control', w: 250 },
          { id: 'trig', x: 1390, y: 690, icon: 'key', label: 'Input with trigger', sub: 'hidden behaviour', k: 'threat', w: 260 } ],
        edges: [{ from: 'pois', to: 'train', k: 'threat' }, { from: 'clean', to: 'train', k: 'data' }, { from: 'train', to: 'model', k: 'model' }, { from: 'model', to: 'norm', k: 'control' }, { from: 'model', to: 'trig', k: 'threat' }],
        steps: [
          { show: 'clean pois', hi: 'pois' },
          { show: 'train pois-train clean-train', flow: 'pois-train clean-train', hi: 'train' },
          { show: 'model train-model', flow: 'train-model', hi: 'model' },
          { show: 'norm model-norm', flow: 'model-norm', hi: 'norm', mark: { norm: 'ok' } },
          { show: 'trig model-trig', flow: 'model-trig', hi: 'trig', mark: { trig: 'bad' } } ],
        say: 'Here is how a backdoor works, conceptually. Alongside the clean data, an attacker slips in samples that pair a rare trigger with the behaviour they want. | Training learns both: the real task, and the hidden association. | The result is a model that looks and scores like a normal one. | On ordinary inputs it behaves correctly, so standard testing passes. | But when the trigger appears, the hidden behaviour activates. Research has shown that such behaviour can persist even through later safety training.' },
      { t: 'bullets', title: 'Where poison gets in', items: [
          { icon: 'globe', h: 'Scraped web data', d: 'Content can change after a dataset is defined', k: 'threat' },
          { icon: 'database', h: 'Open datasets and hubs', d: 'Third-party data of unclear origin', k: 'data' },
          { icon: 'users', h: 'Crowdsourced labels', d: 'Careless or malicious contributors', k: 'human' },
          { icon: 'cycle', h: 'Feedback loops', d: 'User ratings and preference data', k: 'model' },
          { icon: 'building', h: 'Vendors and partners', d: 'Fine-tuning data supplied by others', k: 'neutral' } ],
        say: 'Poison enters through any data path you don’t control. | Scraped web data: content can change between when a dataset is defined and when it is downloaded, and researchers showed this makes poisoning web-scale datasets cheap. | Open datasets and model hubs, where the origin of the data may be unclear. | Crowdsourced labels, where contributors may be careless or malicious. | Feedback loops, such as user ratings and preference data used to fine-tune models. | And vendors and partners who supply fine-tuning data.' },
      { t: 'bullets', title: 'Defending against poisoning', layout: 'grid', cols: 2, items: [
          { icon: 'compass', h: 'Provenance and allow-lists', d: 'Known sources, pinned and hashed versions', k: 'data' },
          { icon: 'filter', h: 'Sanitise and detect', d: 'Outliers, duplicates, embedding clusters', k: 'control' },
          { icon: 'split', h: 'Robust training', d: 'Partitioned ensembles, differential privacy', k: 'model' },
          { icon: 'search', h: 'Backdoor testing', d: 'Trigger scanning and red teaming', k: 'threat' },
          { icon: 'chart', h: 'Monitor behaviour', d: 'Drift and unexpected outputs', k: 'human' },
          { icon: 'rollback', h: 'Clean rollback', d: 'Retrain from verified versions', k: 'neutral' } ],
        say: 'Defences work at every stage. | Provenance and allow-lists: use known sources, pinned to hashed versions, so content can’t change after vetting. | Sanitise and detect: screen for outliers, near-duplicates and unusual clusters in embedding space. | Robust training: techniques such as training separate models on partitions of the data, or differential privacy, limit how much any small set of samples can influence the result. | Backdoor testing: scan models for trigger-like behaviour and red-team them before release. | Monitor behaviour in production for drift and unexpected outputs. | And keep clean, versioned datasets, so you can roll back and retrain if poisoning is found.' },
      { t: 'summary', items: ['Availability, targeted and backdoor poisoning differ in aim and stealth', 'A small, fixed number of samples can be enough', 'Poison enters through any uncontrolled data path', 'Layer provenance, detection, robust training, testing and rollback'],
        say: 'To recap. | Availability, targeted and backdoor poisoning differ in their aims, and in how hard they are to detect. | A small, roughly fixed number of poisoned samples can be enough, however large the dataset. | Poison enters through any data path you don’t control. | So layer the defences: provenance, detection, robust training, backdoor testing and the ability to roll back.' } ] },
    { type: 'text', md: `### Poisoning taxonomy
| Type | Aim | Notes |
|---|---|---|
| **Availability (untargeted)** | Reduce overall accuracy | Usually visible in metrics; used for sabotage or denial of service |
| **Targeted** | Cause errors on specific inputs | Overall metrics stay healthy |
| **Backdoor (trojan)** | Hidden behaviour when a trigger is present | Passes normal tests; triggers can be words, patterns or formats |
| **Clean-label** | Poison with correct-looking labels | Defeats label review by manipulating features subtly |
| **Model poisoning** | Malicious updates in federated learning | Countered with robust aggregation and anomaly detection on updates |

NIST AI 100-2 E2025, the US taxonomy of adversarial machine learning, classifies poisoning this way. OWASP lists **Data and Model Poisoning (LLM04:2025)** among the top risks for LLM applications, and MITRE ATLAS catalogues real-world cases.

### What the research shows
- **Web-scale datasets are poisonable.** Datasets distributed as lists of URLs can be poisoned if the content behind those URLs changes, for example when an expired domain is re-registered (*split-view* poisoning), or when malicious edits are timed to coincide with a known snapshot of an editable site (*frontrunning*). Researchers estimated that poisoning 0.01% of some large image datasets would have cost about $60 (Carlini and colleagues, 2024). Recording content hashes when a dataset is created, and checking them on download, defeats split-view poisoning; delaying and reviewing snapshots helps against frontrunning.
- **Poison doesn’t dilute.** A 2025 study found that a near-constant number of poisoned documents (about 250) was enough for a narrow backdoor, regardless of model size. Results may differ for more complex behaviours and larger models.
- **Backdoors can persist.** Research on deliberately backdoored “sleeper agent” models (2024) found the behaviour survived standard safety training, and adversarial training could teach models to hide it better.

### Mitigations
- **Prevent:** allow-listed sources, provenance records, pinned versions with content hashes, vendor contracts and audits, and restricted write access to training data and feedback channels.
- **Detect in data:** statistical profiling, outlier and near-duplicate detection, clustering in embedding space, label consistency checks, and scanning for unusual repeated phrases.
- **Limit influence:** partition-and-ensemble training (each sample affects only one sub-model), differential privacy, de-duplication, and caps on any single source’s share of the data.
- **Detect in models:** behavioural test suites, trigger-scanning tools, red teaming, comparison with a reference model, and output monitoring in production.
- **Respond:** quarantine suspect data, use lineage to find affected models, roll back to verified datasets and models, retrain, and handle deliberate poisoning as a security incident (Domain 5).` },
    { type: 'scenario', title: 'The phishing classifier', md: `A security vendor retrains its phishing classifier every week on samples that customers report. After several weeks, it starts missing one specific phishing campaign, while overall accuracy stays at 98%.`,
      q: { q: 'What is the MOST likely issue, and the BEST response?', o: ['Normal drift; retrain more often on the latest reported samples so that the model catches up with the new phishing campaign quickly', 'Targeted poisoning through the reporting channel; quarantine recent reports, trace their sources and retrain from verified data', 'Availability poisoning; lower the detection threshold for every message until overall accuracy recovers', 'An overfitted model; switch to a larger architecture that generalises better across phishing campaigns'], a: 1, b: 2,
        why: 'A failure on one campaign while overall accuracy holds is the signature of targeted poisoning, and an open reporting channel is an uncontrolled data path. Retraining more often on the same channel would deepen the problem.' } },
    { type: 'callout', kind: 'exam', title: 'Poisoning answer patterns', md: `- **Accuracy is fine but one input type fails** → targeted poisoning or a backdoor, not drift.
- The **best preventive control** is usually provenance: trusted sources, pinned and hashed versions, restricted write access.
- The **best response** traces lineage, quarantines suspect data and retrains from a verified version. Adding more data or a bigger model is a distractor.` },
    { type: 'check', q: { q: 'Which control MOST directly defends against split-view poisoning of a dataset distributed as a list of URLs?', o: ['Training for more epochs, so that the small number of altered samples has less influence', 'Recording a content hash for each item at creation, and rejecting downloads that don’t match', 'Downloading the dataset again from the same URLs just before training, so it is up to date', 'Using a larger model, because bigger models are less affected by a small share of bad samples'], a: 1, b: 2,
      why: 'Split-view poisoning works because content behind a URL can change after the dataset is defined. Hashes recorded at creation expose any change. Re-downloading fetches the altered content, and model size doesn’t dilute poison.' } }
  ]
};
