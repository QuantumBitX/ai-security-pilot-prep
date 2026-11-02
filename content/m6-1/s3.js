/* 6.1 · Section 3: adversarial ML attacks (evasion, poisoning, model extraction, model inversion, backdoors) */
module.exports = {
  title: 'Adversarial machine learning attacks', covers: [3],
  blocks: [
    { type: 'video', title: 'Attacks on the model itself', kicker: 'Module 6.1 · Video 3 of 7', scenes: [
      { t: 'title', kicker: 'Module 6.1 · AI threat modelling', title: 'Attacks on the model itself', sub: 'Evasion, poisoning, extraction, inversion and backdoors', icon: 'brain',
        say: 'Long before chatbots, researchers showed that machine learning models could be fooled, corrupted and copied. These adversarial machine learning attacks apply to every kind of model, from fraud scoring to vision to language. | This video covers the five classic families: evasion, poisoning, backdoors, model extraction, and model inversion with membership inference.' },
      { t: 'layers', title: 'Five families of adversarial ML attack',
        layers: [
          { icon: 'target', label: 'Evasion', sub: 'Crafted inputs cause wrong outputs at inference', k: 'threat' },
          { icon: 'bug', label: 'Poisoning', sub: 'Corrupted training data degrades or steers the model', k: 'data' },
          { icon: 'hash', label: 'Backdoors', sub: 'A hidden trigger activates attacker-chosen behaviour', k: 'model' },
          { icon: 'copy', label: 'Model extraction', sub: 'Queries used to copy the model’s functionality', k: 'human' },
          { icon: 'eye', label: 'Inversion and membership inference', sub: 'Outputs reveal training data or who was in it', k: 'neutral' } ],
        say: 'There are five families. | Evasion: carefully crafted inputs make a deployed model give wrong answers, such as small changes that make malware look benign to a classifier. | Poisoning: corrupted training data degrades the model generally, or steers it in targeted ways. | Backdoors: a hidden trigger, planted through training data or the model itself, activates behaviour the attacker chose, while the model behaves normally otherwise. | Model extraction: an attacker uses many queries to build a copy of the model’s functionality. | And inversion and membership inference: outputs reveal information about the training data, or whether a particular person’s data was used.' },
      { t: 'compare', title: 'What the attacker knows', labels: ['Knows', 'Example', 'Defence focus'],
        cols: [{ h: 'White-box', icon: 'unlock', k: 'threat' }, { h: 'Grey-box', icon: 'eye', k: 'human' }, { h: 'Black-box', icon: 'box', k: 'neutral' }],
        rows: [
          ['Architecture and weights', 'Some details', 'Inputs and outputs'],
          ['Gradient-based evasion', 'Transfer from a proxy', 'Query-based extraction'],
          ['Protect the weights', 'Limit disclosure', 'Limit queries, outputs'] ],
        say: 'The attacker’s knowledge shapes the attack. | A white-box attacker knows the architecture and weights. A grey-box attacker knows some details, such as the model family. A black-box attacker sees only inputs and outputs. | White-box attackers can compute precise evasion inputs from the model’s gradients. Grey-box attackers often build a proxy model and transfer attacks from it. Black-box attackers rely on queries, for example to extract the model. | So defences differ: protect the weights from white-box access, limit what you disclose about models, and limit query volumes and output detail against black-box attacks.' },
      { t: 'chart', title: 'Why output detail and query limits matter', kind: 'line', x: ['1k', '5k', '10k', '50k', '100k'], yMin: 0, yMax: 100, ticks: 4, unit: '%', yLabel: 'Illustrative agreement between a stolen copy and the original model', legend: true,
        series: [{ n: 'Full probabilities returned', k: 'threat', v: [40, 65, 78, 90, 94] }, { n: 'Top label only', k: 'control', v: [25, 40, 52, 66, 72] }],
        annot: [{ x: 2, text: 'Rate limit', k: 'human', at: 'bottom' }],
        steps: [{ s: [0] }, { s: [1] }, { a: [0] }],
        say: 'This illustrative chart shows how extraction depends on what the attacker can see. When an API returns full probability scores, a stolen copy agrees with the original more and more closely as queries increase. | Returning only the top label gives the attacker far less to learn from, so the copy improves more slowly. | And rate limits cap the number of queries in the first place. Output minimisation and query limits work together against extraction and inversion.' },
      { t: 'flow', title: 'How a backdoor works',
        nodes: [
          { id: 'plant', x: 230, y: 330, icon: 'attacker', label: 'Plant trigger samples', sub: 'in data or the model', k: 'threat', w: 340 },
          { id: 'learn', x: 700, y: 330, icon: 'brain', label: 'Model learns', sub: 'trigger → target', k: 'model', w: 280 },
          { id: 'pass', x: 1200, y: 330, icon: 'check', label: 'Passes evaluation', sub: 'clean accuracy unchanged', k: 'control', w: 330 },
          { id: 'dep', x: 1200, y: 690, icon: 'server', label: 'Deployed', sub: 'behaves normally', k: 'neutral', w: 280 },
          { id: 'trig', x: 700, y: 690, icon: 'bolt', label: 'Trigger appears', sub: 'in an input', k: 'human', w: 280 },
          { id: 'harm', x: 230, y: 690, icon: 'alert', label: 'Chosen behaviour', sub: 'misclassify, leak, act', k: 'threat', w: 310 } ],
        edges: [{ from: 'plant', to: 'learn', k: 'threat' }, { from: 'learn', to: 'pass', k: 'model' }, { from: 'pass', to: 'dep', k: 'control' }, { from: 'dep', to: 'trig', k: 'neutral' }, { from: 'trig', to: 'harm', k: 'human' }],
        steps: [
          { show: 'plant', hi: 'plant', mark: { plant: 'alert' } },
          { show: 'learn plant-learn', flow: 'plant-learn', hi: 'learn' },
          { show: 'pass learn-pass', flow: 'learn-pass', hi: 'pass' },
          { show: 'dep pass-dep', flow: 'pass-dep', hi: 'dep' },
          { show: 'trig dep-trig', flow: 'dep-trig', hi: 'trig' },
          { show: 'harm trig-harm', flow: 'trig-harm', hi: 'harm', mark: { harm: 'alert' } } ],
        say: 'Here is how a backdoor works. The attacker plants trigger samples: training examples that pair a rare pattern with the outcome they want, or direct changes to a model’s weights. | The model learns the association between the trigger and the target behaviour. | Because the trigger is rare, the model passes normal evaluation, with clean accuracy unchanged. | It is deployed, and behaves normally for everyone else. | Then the trigger appears in an input, perhaps a particular phrase, image patch or code pattern. | And the model produces the attacker’s chosen behaviour: a misclassification, a data leak, or, for an agent, an action.' },
      { t: 'summary', items: ['Evasion, poisoning, backdoors, extraction, inversion and membership inference', 'Attacker knowledge: white-box, grey-box, black-box', 'Limit outputs and queries against extraction and inversion', 'Backdoors pass normal tests: protect data and model provenance'],
        say: 'To recap. | The five classic families are evasion, poisoning, backdoors, model extraction, and inversion with membership inference. | What the attacker knows, white-box, grey-box or black-box, shapes both attack and defence. | Limit output detail and query volumes against extraction and inversion. | And because backdoors pass normal testing, protect the provenance of data and models, and test for triggers.' } ] },
    { type: 'text', md: `### Adversarial ML attack families
| Attack | Stage | Goal | Landmark research | Key defences (Module 6.6) |
|---|---|---|---|---|
| **Evasion** | Inference | Integrity | Physical adversarial examples made road-sign classifiers misread stop signs (Eykholt et al., 2018) | Adversarial training, input preprocessing, ensembles, robustness testing |
| **Poisoning** | Training | Availability or integrity | Indiscriminate and targeted poisoning studies; web-scale poisoning shown practical (Carlini et al., 2023) | Data provenance and validation, robust training, anomaly detection (Module 3.3) |
| **Backdoors** | Training or supply chain | Integrity | BadNets showed hidden triggers surviving normal evaluation (Gu et al., 2017) | Provenance, signed models, trigger scanning, fine-pruning, red teaming |
| **Model extraction** | Inference | Privacy (of the model) | Stealing models through prediction APIs (Tramèr et al., 2016); extracting part of a production language model (Carlini et al., 2024) | Rate limits, output minimisation, query monitoring, watermarking and fingerprinting (Module 3.6) |
| **Model inversion** | Inference | Privacy (of training data) | Reconstructing recognisable faces from a face recognition model (Fredrikson et al., 2015) | Output minimisation, differential privacy, access control |
| **Membership inference** | Inference | Privacy | Inferring whether a record was in the training set (Shokri et al., 2017) | Differential privacy, regularisation, output minimisation |
| **Training data extraction** | Inference | Privacy | Extracting memorised training text from GPT-2 (Carlini et al., 2021) | Deduplication, differential privacy, output filtering (Module 3.3) |

### Attacker capabilities and knowledge
NIST AI 100-2 E2025 describes attacker **capabilities**: control of training data, labels, the model or its source code, query access to the deployed model, and (for generative AI) control of resources the model reads, such as web pages and documents. Combined with **knowledge** (white-box, grey-box, black-box), these define realistic scenarios for threat models and red teams.

### Applying this to modern systems
- **Language models** face all these families: evasion appears as jailbreaks and adversarial suffixes; poisoning and backdoors through pre-training, fine-tuning and retrieval data; extraction through distillation; and training data extraction through memorisation.
- **Fine-tuned and open-weight models** expose white-box access to anyone who downloads them, so supply chain provenance matters (Module 6.3).
- **Predictive models** in fraud, security and vision remain prime evasion targets, because attackers directly benefit from misclassification.` },
    { type: 'match', title: 'Name the attack', pairs: [
      ['Stickers on a road sign make a vision model misread it', 'Evasion'],
      ['A rare phrase in the input makes a code model insert a flaw', 'Backdoor'],
      ['Thousands of API queries are used to train a copycat model', 'Model extraction'],
      ['An attacker tests whether a patient’s record was in the training data', 'Membership inference'],
      ['Mislabelled samples are slipped into a fraud model’s training set', 'Poisoning'] ] },
    { type: 'callout', kind: 'exam', title: 'Adversarial ML questions', md: `Match each attack to its **stage** (training or inference) and **goal** (availability, integrity, privacy). **Evasion** happens at inference; **poisoning and backdoors** at training; **extraction, inversion and membership inference** abuse query access. Defences follow: **provenance** for training-time attacks, **output minimisation and rate limits** for query attacks, **adversarial training and robustness testing** for evasion.` },
    { type: 'check', q: { q: 'A company’s fraud model API returns full probability scores to any authenticated partner, without rate limits. Which attack does this MOST directly enable?', o: ['A backdoor planted in the model’s training data by a malicious insider', 'Model extraction, by training a copy on large numbers of query results', 'Data poisoning of the training pipeline through the partner interface', 'A denial of service attack against the company’s web front end'], a: 1, b: 3,
      why: 'Unlimited queries with detailed outputs give an attacker ideal material to train a copy of the model. Backdoors and poisoning need training-time access, and the scenario doesn’t describe the web front end.' } }
  ]
};
