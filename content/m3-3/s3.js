/* 3.3 · Section 3: extraction threats to training data */
module.exports = {
  title: 'Extraction threats to training data', covers: [2],
  blocks: [
    { type: 'video', title: 'When training data leaks back out', kicker: 'Module 3.3 · Video 3 of 5', scenes: [
      { t: 'title', kicker: 'Module 3.3 · Training data security', title: 'When training data leaks back out', sub: 'Memorisation, extraction and membership inference', icon: 'copy',
        say: 'Training data doesn’t just shape a model. Some of it can be recovered from the model. | This video covers extraction threats to training data, why memorisation happens, and the controls that reduce it.' },
      { t: 'compare', title: 'Three threats to training data', labels: ['What it does', 'Harm', 'More likely when'],
        cols: [{ h: 'Data extraction', icon: 'copy', k: 'threat' }, { h: 'Membership inference', icon: 'search', k: 'human' }, { h: 'Model inversion', icon: 'eye', k: 'model' }],
        rows: [
          ['Recovers training text verbatim', 'Tells if a record was used', 'Rebuilds features or examples'],
          ['Leaked secrets and personal data', 'Reveals sensitive participation', 'Approximates faces or traits'],
          ['Duplicates, rare strings, big models', 'Overfitting, detailed scores', 'Rich outputs, white-box access'] ],
        say: 'Three related threats target training data through the model. | Data extraction recovers training text verbatim. Membership inference tells whether a particular record was in the training set. Model inversion reconstructs features, or representative examples, of the training data. | The harms: leaked secrets and personal data; revealing that someone was in, say, a dataset of patients; or approximating a person’s face or attributes. | Extraction is more likely with duplicated data, rare strings and larger models. Membership inference thrives on overfitting and detailed confidence scores. Inversion benefits from rich outputs and full access to the model’s weights.' },
      { t: 'chart', title: 'Memorisation grows with duplication and scale', kind: 'line', x: ['1', '2', '5', '10', '30', '100'], yMin: 0, yMax: 50, ticks: 5, unit: '%', yLabel: 'Illustrative share of sequences reproduced, by copies in training data', legend: true,
        series: [
          { n: 'Smaller model', k: 'data', v: [1, 2, 4, 7, 12, 19] },
          { n: 'Larger model', k: 'threat', v: [2, 4, 9, 15, 26, 40] } ],
        notes: [{ h: 'Duplication', d: 'Text repeated in training data is far more likely to be memorised.', k: 'data' }, { h: 'Scale', d: 'Larger models memorise more of what they see.', k: 'threat' }, { h: 'So clean first', d: 'De-duplicate, and remove secrets and personal data before training.', k: 'control' }],
        steps: [{ s: [0] }, { s: [1] }, {}],
        say: 'Memorisation follows clear patterns. In this illustrative chart, the more often a sequence appears in the training data, the more likely a model is to reproduce it. | Larger models memorise more than smaller ones trained on the same data, and researchers have shown that even production chatbots can be made to emit memorised training data. | So de-duplication is one of the cheapest and most effective controls, alongside removing secrets and personal data before training.' },
      { t: 'chat', title: 'A secret the model remembered', app: 'Internal code assistant',
        msgs: [
          { r: 'user', t: 'Complete this configuration file for the payments service.' },
          { r: 'ai', t: 'api_key = "[a string matching a live production key]"' },
          { r: 'note', t: 'The model reproduced a credential memorised from an internal repository it was trained on.' } ],
        notes: [null, null, { h: 'Secrets in training data', d: 'Scan for and remove secrets before training; rotate anything exposed.', k: 'threat' }],
        say: 'Here is how this shows up in practice. A developer asks an internal code assistant to complete a configuration file. | The suggestion includes what looks like a real production key. | It is. The model memorised it from an internal repository it was trained on. The fixes: rotate the key immediately, scan training data for secrets before every training run, and test the model for memorised secrets before release.' },
      { t: 'flow', title: 'Reducing extraction risk across the lifecycle',
        nodes: [
          { id: 'clean', x: 260, y: 330, icon: 'filter', label: 'Before training', sub: 'de-duplicate; remove secrets and PII', k: 'control', w: 330 },
          { id: 'train', x: 720, y: 330, icon: 'gpu', label: 'During training', sub: 'DP-SGD; regularisation', k: 'model', w: 300 },
          { id: 'test', x: 1170, y: 330, icon: 'search', label: 'Before release', sub: 'canary and extraction tests', k: 'human', w: 320 },
          { id: 'serve', x: 1170, y: 690, icon: 'shield', label: 'In production', sub: 'output filters; rate limits', k: 'data', w: 320 },
          { id: 'mon', x: 720, y: 690, icon: 'eye', label: 'Monitoring', sub: 'detect systematic probing', k: 'neutral', w: 300 } ],
        edges: [{ from: 'clean', to: 'train', k: 'control' }, { from: 'train', to: 'test', k: 'model' }, { from: 'test', to: 'serve', k: 'human' }, { from: 'serve', to: 'mon', k: 'data' }],
        steps: [
          { show: 'clean', hi: 'clean' },
          { show: 'train clean-train', flow: 'clean-train', hi: 'train' },
          { show: 'test train-test', flow: 'train-test', hi: 'test' },
          { show: 'serve test-serve', flow: 'test-serve', hi: 'serve' },
          { show: 'mon serve-mon', flow: 'serve-mon', hi: 'mon' } ],
        say: 'Controls span the lifecycle. Before training, de-duplicate, and remove secrets and any personal data the model doesn’t need. | During training, differential privacy and regularisation limit how much any single record can be memorised. | Before release, test for memorisation, for example by planting unique canary strings in the training data and checking whether the model reproduces them. | In production, filter outputs for secrets and personal data, rate-limit, and avoid exposing raw confidence scores. | And monitor for systematic probing, such as large volumes of near-identical queries.' },
      { t: 'summary', items: ['Extraction, membership inference and inversion target training data through the model', 'Duplication and scale drive memorisation', 'Clean data first: de-duplicate, remove secrets and PII', 'Test with canaries, filter outputs, monitor for probing'],
        say: 'To recap. | Data extraction, membership inference and model inversion all target training data through the model. | Duplication and scale drive memorisation. | So clean the data first: de-duplicate, and remove secrets and personal data. | Then test with canaries, filter outputs, and monitor for probing.' } ] },
    { type: 'text', md: `### Extraction threats
| Threat | Description | Typical access | Key mitigations |
|---|---|---|---|
| **Training data extraction** | Prompting a model to reproduce memorised training content | Black-box (API) | De-duplication, secret and PII removal, DP-SGD, output filtering |
| **Membership inference** | Inferring whether a record was in the training set | Black-box, helped by confidence scores | Differential privacy, regularisation, label-only outputs |
| **Model inversion and reconstruction** | Reconstructing training features or representative examples | Grey- or white-box | Limit output detail, restrict access to weights, differential privacy |
| **Attribute and property inference** | Learning sensitive properties of individuals or of the dataset | Black-box | Differential privacy; treat outputs as personal data |

Don’t confuse these with **model extraction**, which steals a model’s functionality or weights (Module 3.6). Training data extraction steals what the model learned *from*; model extraction steals the model itself.

### Why models memorise
Memorisation rises with **duplication** (repeated text is memorised far more often), **model size**, **training length** and **uniqueness** (rare strings, such as keys, phone numbers and addresses, stand out). Research found memorisation grows predictably with model capacity, duplication and the length of the prompt context (Carlini and colleagues, 2022), and in 2023 researchers showed that production chatbots could be induced to emit memorised training data. Fine-tuning on small, sensitive datasets carries particular risk, because each record has more influence on the result.

### Controls
- **Data:** classify training data; exclude secrets and unnecessary personal data; run secret scanning and PII detection before every training run; de-duplicate within and across datasets.
- **Training:** use DP-SGD for sensitive data, and regularisation and early stopping to reduce overfitting.
- **Testing:** insert unique **canaries** (random strings) into training data and measure whether the model reproduces them; run extraction and membership inference tests on sensitive models before release.
- **Serving:** filter outputs for secrets and personal data; return labels rather than full probability scores where possible; authenticate and rate-limit API access.
- **Access:** treat the weights of models trained on sensitive data as sensitive assets, because white-box access makes inversion and extraction easier (Module 3.6).
- **Response:** if a model leaks a secret, rotate the secret immediately, then decide whether to retrain without the data, filter outputs or restrict the model (Module 3.2 covers erasure options).` },
    { type: 'match', title: 'Name the threat', pairs: [
      ['A model outputs a customer’s full home address, word for word', 'Training data extraction'],
      ['An attacker works out that a person’s record was used to train a cancer-risk model', 'Membership inference'],
      ['A recognisable face is reconstructed from a face-recognition model', 'Model inversion'],
      ['A competitor replicates a model’s behaviour by querying it at scale', 'Model extraction (Module 3.6)'] ] },
    { type: 'check', q: { q: 'Before releasing a code model trained on internal repositories, which test MOST directly measures whether it leaks memorised secrets?', o: ['Measuring the model’s accuracy on a public coding benchmark, compared with competing models', 'Planting unique canary strings in the training data and checking whether the model reproduces them', 'Reviewing a random sample of training files by hand to confirm that they contain no code comments', 'Running a penetration test against the servers that host the model and its inference API'], a: 1, b: 2,
      why: 'Canaries give a direct, measurable signal of memorisation and extraction risk. Benchmarks measure capability, a small manual sample can’t cover the data, and infrastructure testing doesn’t test what the model has memorised.' } }
  ]
};
