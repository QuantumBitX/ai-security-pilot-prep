/* 2.4 · Section 1: regulated and sensitive data; derivation and regulatory contamination */
module.exports = {
  title: 'Regulated data, derivation and regulatory contamination', covers: [1, 3],
  blocks: [
    { type: 'video', title: 'Sensitive data meets AI', kicker: 'Module 2.4 · Video 1 of 3', scenes: [
      { t: 'title', kicker: 'Module 2.4 · Privacy, protection and IP', title: 'Sensitive data meets AI', sub: 'Regulated data types, where they hide in AI systems, and how obligations spread', icon: 'fingerprint',
        say: 'AI systems are hungry for data, and some of the most useful data is also the most regulated. | This video covers the regulated and sensitive data types you must recognise, where they hide inside AI systems, and why putting them into a model can spread legal obligations far beyond the original record.' },
      { t: 'bullets', title: 'Regulated and sensitive data types', layout: 'grid', cols: 2, items: [
          { icon: 'id', h: 'Personal data (PII)', d: 'Anything that identifies a person, directly or indirectly', k: 'data' },
          { icon: 'fingerprint', h: 'Special category data', d: 'Health, biometrics, ethnicity, beliefs, sexual orientation', k: 'threat' },
          { icon: 'drop', h: 'Protected health information', d: 'Health data held by HIPAA-covered organisations', k: 'human' },
          { icon: 'money', h: 'Financial data', d: 'Cardholder data (PCI DSS), account and credit data', k: 'model' },
          { icon: 'globe', h: 'Export-controlled data', d: 'Technical data restricted by export laws', k: 'neutral' },
          { icon: 'users', h: 'Children’s data', d: 'Extra protections in many jurisdictions', k: 'control' } ],
        say: 'Start by recognising the data. | Personal data, or personally identifiable information, is anything that identifies a person, directly or indirectly, including online identifiers and combinations of facts. | Special category data, such as health, biometric, ethnicity, religious belief and sexual orientation data, carries much stricter rules. | Protected health information is health data held by organisations covered by the US HIPAA rules, and their business associates. | Financial data includes payment card data protected under PCI DSS, plus account and credit information. | Export-controlled data includes technical data whose transfer to certain countries or foreign nationals is restricted. | And children’s data attracts additional protection in many jurisdictions.' },
      { t: 'flow', title: 'Where sensitive data hides',
        nodes: [
          { id: 'train', x: 210, y: 320, icon: 'database', label: 'Training data', k: 'data', w: 260 },
          { id: 'ft', x: 560, y: 320, icon: 'sliders', label: 'Fine-tuning sets', k: 'model', w: 270 },
          { id: 'rag', x: 920, y: 320, icon: 'vector', label: 'RAG indexes', sub: 'chunks and embeddings', k: 'data', w: 290 },
          { id: 'prompt', x: 1320, y: 320, icon: 'chat', label: 'Prompts and context', k: 'human', w: 290 },
          { id: 'out', x: 1320, y: 680, icon: 'doc', label: 'Outputs', k: 'model', w: 250 },
          { id: 'logs', x: 920, y: 680, icon: 'list', label: 'Logs and telemetry', k: 'neutral', w: 290 },
          { id: 'bak', x: 520, y: 680, icon: 'archive', label: 'Backups and vendor copies', k: 'threat', w: 320 } ],
        edges: [{ from: 'train', to: 'ft', k: 'data' }, { from: 'ft', to: 'rag', k: 'data' }, { from: 'rag', to: 'prompt', k: 'data' }, { from: 'prompt', to: 'out', k: 'model' }, { from: 'out', to: 'logs', k: 'neutral' }, { from: 'logs', to: 'bak', k: 'neutral' }],
        steps: [
          { show: 'train', hi: 'train' },
          { show: 'ft train-ft', flow: 'train-ft', hi: 'ft' },
          { show: 'rag ft-rag', flow: 'ft-rag', hi: 'rag' },
          { show: 'prompt rag-prompt', flow: 'rag-prompt', hi: 'prompt' },
          { show: 'out prompt-out', flow: 'prompt-out', hi: 'out' },
          { show: 'logs out-logs', flow: 'out-logs', hi: 'logs' },
          { show: 'bak logs-bak', flow: 'logs-bak', hi: 'bak', note: { x: 700, y: 440, w: 560, text: 'Every copy needs classification, protection and a retention rule.' } } ],
        say: 'Sensitive data can enter an AI system in many places. Training data scraped or collected in bulk. | Fine-tuning sets, often built from real customer interactions. | Retrieval indexes, where documents are split into chunks and stored with their embeddings. | Prompts and context, where users paste whatever they are working on. | Outputs, which can repeat, infer or combine sensitive facts. | Logs and telemetry, which often capture full prompts and responses. | And backups and copies held by vendors. Every one of these needs classification, protection and a retention rule.' },
      { t: 'bullets', title: 'How AI derives what you never gave it', layout: 'grid', cols: 2, items: [
          { icon: 'search', h: 'Inference', d: 'Predicting sensitive traits from ordinary data', k: 'human' },
          { icon: 'copy', h: 'Memorisation', d: 'Repeating training records word for word', k: 'threat' },
          { icon: 'vector', h: 'Embedding inversion', d: 'Reconstructing text from stored vectors', k: 'data' },
          { icon: 'link', h: 'Linkage', d: 'Combining harmless facts until a person is identified', k: 'model' } ],
        say: 'AI also creates sensitive data that nobody explicitly provided. | Inference: models can predict health conditions, pregnancy, sexual orientation or financial distress from ordinary data such as purchases or browsing. An inferred special-category fact is still special-category data. | Memorisation: models can reproduce rare training records verbatim, including personal data. | Embedding inversion: stored vectors can be partly reversed to recover the original text, so embeddings of personal data are personal data too. | And linkage: combining individually harmless facts can re-identify a person in a supposedly anonymous dataset.' },
      { t: 'flow', title: 'Regulatory contamination',
        nodes: [
          { id: 'rec', x: 220, y: 460, icon: 'doc', label: 'Regulated records', sub: 'personal, health, export-controlled', k: 'threat', w: 300 },
          { id: 'set', x: 620, y: 460, icon: 'database', label: 'Training set', k: 'data', w: 260 },
          { id: 'mod', x: 1000, y: 460, icon: 'model', label: 'Model weights', k: 'model', w: 270 },
          { id: 'all', x: 1370, y: 460, icon: 'copy', label: 'Every copy and output', k: 'threat', w: 290 } ],
        edges: [{ from: 'rec', to: 'set', k: 'threat' }, { from: 'set', to: 'mod', k: 'threat' }, { from: 'mod', to: 'all', k: 'threat' }],
        steps: [
          { show: 'rec', hi: 'rec' },
          { show: 'set rec-set', flow: 'rec-set', hi: 'set' },
          { show: 'mod set-mod', flow: 'set-mod', hi: 'mod' },
          { show: 'all mod-all', flow: 'mod-all', hi: 'all', note: { x: 800, y: 680, w: 900, text: 'Erasure requests, residency rules, export controls and licence terms can all follow the data into the model.' } } ],
        say: 'Now the subtle part, sometimes called regulatory contamination. Regulated records enter a pipeline: personal data, health data, or export-controlled technical data. | They become part of a training set. | Training compresses them into the model’s weights, where they can’t simply be deleted. | And now every copy of the model, and potentially its outputs, may carry the original obligations: data subject erasure requests, data residency rules, export controls and licence terms. Contaminating a widely shared model can be very expensive to undo.' },
      { t: 'bullets', title: 'Keeping regulated data under control', items: [
          { icon: 'tag', h: 'Classify before ingestion', d: 'Scan and tag data before it reaches any AI pipeline', k: 'control' },
          { icon: 'filter', h: 'Minimise and de-identify', d: 'Use only what the purpose needs; remove or mask identifiers', k: 'data' },
          { icon: 'box', h: 'Segregate regulated pipelines', d: 'Separate environments, models and indexes for regulated data', k: 'model' },
          { icon: 'branch', h: 'Track lineage', d: 'Know which data went into which model version', k: 'human' },
          { icon: 'shield', h: 'Filter the outputs', d: 'Detect and block sensitive data before it leaves', k: 'threat' } ],
        say: 'The controls follow from this. | Classify and tag data before it reaches any AI pipeline, using automated scanning backed by owners’ decisions. | Minimise: use only what the purpose needs, and remove or mask identifiers wherever possible. | Segregate pipelines, models and indexes that handle regulated data from general-purpose ones. | Track lineage, so you know which data went into which model version, and what to retrain if something must be removed. | And filter outputs, so sensitive data is detected and blocked before it leaves the system.' },
      { t: 'summary', items: ['Recognise PII, special category, PHI, financial, export-controlled, children’s data', 'It hides in training, fine-tuning, indexes, prompts, outputs, logs, backups', 'AI can infer, memorise and reconstruct sensitive data', 'Obligations follow data into models: classify, minimise, segregate, trace'],
        say: 'To recap. | Recognise the regulated data types: personal, special category, health, financial, export-controlled and children’s data. | Remember every place they can hide: training and fine-tuning data, indexes, prompts, outputs, logs and backups. | AI can infer, memorise and reconstruct sensitive data that was never explicitly provided. | And obligations follow data into models, so classify, minimise, segregate and trace before you train.' } ] },
    { type: 'text', md: `### Regulated and sensitive data types
| Data type | Examples | Key rules (examples) |
|---|---|---|
| **Personal data / PII** | Names, IDs, email addresses, device identifiers, location, combinations that single someone out | GDPR, UK GDPR, CCPA/CPRA and other privacy laws |
| **Special category data** | Health, genetic and biometric data (for identification), racial or ethnic origin, political opinions, religious beliefs, trade union membership, sex life and sexual orientation | GDPR Article 9: processing prohibited unless a specific condition applies |
| **Protected health information (PHI)** | Health records, diagnoses and payment information held by HIPAA covered entities and business associates | HIPAA Privacy and Security Rules; business associate agreements with vendors |
| **Financial data** | Primary account numbers and other cardholder data; bank account and credit data | PCI DSS (cardholder data must not be stored unless protected, and sensitive authentication data must not be stored after authorisation); GLBA and sector rules |
| **Export-controlled data** | Technical data for defence articles or dual-use items | US ITAR and EAR, the EU Dual-Use Regulation and similar regimes; sharing with foreign persons, or via services hosted abroad, can count as an export |
| **Children’s data** | Data of users under the relevant age threshold | COPPA (US), age-appropriate design codes, stricter consent requirements |
| **Confidential business data** | Trade secrets, unreleased financials, legal advice, source code | Contracts, NDAs, insider-trading rules, privilege |

### Where it hides in AI systems
The classic privacy question is “where is the data?”. In AI systems the answer is “in more places than you think”: raw training corpora, curated and fine-tuning datasets, evaluation sets, chunked documents and embeddings in vector stores, prompts and conversation history, model outputs, application and security logs, observability tools, caches, backups, and copies held by model providers and other processors. Each location needs **classification, access control, encryption, retention rules and a deletion path**. Logs are a frequent blind spot: debug logging of full prompts and completions quietly creates a large store of sensitive data.

### Data derivation risks
- **Inference of sensitive attributes.** Models can predict special-category facts from innocuous data. Regulators treat inferred sensitive data as sensitive data, and inference can create new obligations (and new discrimination risks).
- **Memorisation and extraction.** Large models can memorise rare sequences from training data and reproduce them, especially when data was duplicated or prompts are crafted to elicit it. Fine-tuning on small, sensitive datasets increases the risk.
- **Embedding inversion.** Embeddings preserve enough information that original text can often be partly reconstructed. Treat embeddings with the same classification as their source.
- **Linkage and re-identification.** Combining datasets, or combining model outputs with public information, can re-identify individuals in data that was assumed anonymous.

### Regulatory contamination
**Regulatory contamination** describes what happens when regulated data enters an AI pipeline and its obligations attach to downstream artefacts:
- **Privacy:** if personal data was used to train a model, a data subject’s erasure request may require removing their data from training sets, indexes and, potentially, the model itself, which may mean retraining or machine unlearning (Module 3.2). The EDPB’s Opinion 28/2024 notes that a model trained on personal data is not automatically anonymous, and that unlawful processing during development can taint later use.
- **Data residency and sovereignty:** a model trained on data that must stay in a jurisdiction may itself be subject to residency constraints.
- **Export controls:** training on export-controlled technical data can make the resulting model, and some outputs, export-controlled.
- **Licensing and confidentiality:** data licensed for one purpose, or under NDA, can’t lawfully be repurposed for training, and its restrictions may apply to the model.
- **Sector rules:** PHI in a model or index brings HIPAA safeguards to the whole system, including vendors, who then need business associate agreements.

The cheapest point to prevent contamination is **before ingestion**: classify, minimise, de-identify, obtain rights, and keep regulated data in segregated pipelines with lineage tracking, so that if something must be removed, you know exactly what is affected.`, },
    { type: 'match', title: 'Spot the data type', pairs: [
      ['A customer’s card number and expiry date in a chat transcript', 'Cardholder data (PCI DSS)'],
      ['A diagnosis code in a hospital’s discharge summary', 'Protected health information / special category data'],
      ['Detailed engineering drawings for a missile guidance component', 'Export-controlled technical data'],
      ['A model’s prediction that a shopper is pregnant', 'Inferred special category data'],
      ['An email address and IP address in application logs', 'Personal data'] ] },
    { type: 'callout', kind: 'exam', title: 'Embeddings and logs are data too', md: `Two classic traps: assuming **embeddings** are anonymous (they can be partly inverted and inherit the source’s classification), and forgetting **logs** (full prompts and outputs in debug logs are often the largest uncontrolled store of sensitive data). Both need classification, access control and retention.` },
    { type: 'check', q: { q: 'A team wants to fine-tune a model on support transcripts that contain customers’ health details. Which action BEST prevents regulatory contamination?', o: ['Fine-tune first, then add an output filter that blocks health terms before responses reach users', 'Classify the data, remove or de-identify personal data before training, confirm a lawful basis, and record lineage', 'Store the fine-tuned model in an encrypted bucket that only the data science team is able to access', 'Instruct the fine-tuned model in its system prompt never to repeat personal or health information from its training data'], a: 1, b: 3,
      why: 'Once sensitive data is in the weights, obligations follow the model and removal is costly. Acting before ingestion (classification, minimisation, lawful basis, lineage) prevents the problem; output filters and prompts are only partial safeguards.' } }
  ]
};
