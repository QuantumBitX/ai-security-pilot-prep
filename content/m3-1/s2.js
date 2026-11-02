/* 3.1 · Section 2: classification, tagging and sensitive data impact assessments */
module.exports = {
  title: 'Data classification, tagging and sensitive data impact assessments', covers: [3],
  blocks: [
    { type: 'video', title: 'Label it before you learn from it', kicker: 'Module 3.1 · Video 2 of 4', scenes: [
      { t: 'title', kicker: 'Module 3.1 · Data governance', title: 'Label it before you learn from it', sub: 'Classification, tagging, and assessing sensitive data for AI', icon: 'tag',
        say: 'An AI pipeline can’t protect data it can’t recognise. Classification and tagging are how data tells every downstream system how it must be handled. | This video covers classification schemes, tagging that survives AI pipelines, how labels drive AI controls, and the sensitive data impact assessment.' },
      { t: 'layers', title: 'A classification scheme for AI (example)',
        layers: [
          { icon: 'lock', label: 'Restricted', sub: 'Special category, cardholder, secrets: isolated approved systems only', k: 'threat' },
          { icon: 'shield', label: 'Confidential', sub: 'Customer data, contracts, code: enterprise AI with no-training terms', k: 'human' },
          { icon: 'building', label: 'Internal', sub: 'Policies, internal reports: approved AI tools', k: 'data' },
          { icon: 'globe', label: 'Public', sub: 'Published material: any tool, still check outputs', k: 'control' } ],
        say: 'Most organisations use three to five classification levels. Here is an example with AI handling rules attached. | Restricted data, such as special category data, cardholder data and secrets, never goes to external AI, only to approved, isolated systems. | Confidential data, such as customer records, contracts and source code, may only go to approved enterprise AI services with no-training commitments. | Internal data, such as policies and internal reports, may be used with approved AI tools. | And public data can go into any tool, though outputs still need checking.' },
      { t: 'bullets', title: 'Tagging that survives AI pipelines', items: [
          { icon: 'pen', h: 'Owner-applied labels', d: 'The owner knows the data best; tools make it easy', k: 'human' },
          { icon: 'search', h: 'Automated discovery', d: 'Pattern matching and ML classifiers find what was missed', k: 'data' },
          { icon: 'tag', h: 'Labels as metadata', d: 'Carried into chunks, embeddings and datasets', k: 'model' },
          { icon: 'list', h: 'AI-specific attributes', d: 'Consent, permitted uses, residency, licence, retention', k: 'control' } ],
        say: 'Tagging has to survive the journey through AI pipelines. | Owners apply labels, because they know the data best, and tools should make labelling easy. | Automated discovery, using pattern matching and machine learning classifiers, finds sensitive data that nobody labelled. | Labels must travel as metadata: when a document is split into chunks and embedded, each chunk must keep its label. | And AI needs extra attributes beyond sensitivity: consent status, permitted uses, residency, licence and retention.' },
      { t: 'flow', title: 'Labels driving AI controls',
        nodes: [
          { id: 'doc', x: 200, y: 330, icon: 'doc', label: 'Labelled document', sub: 'Confidential', k: 'human', w: 280 },
          { id: 'ing', x: 590, y: 330, icon: 'filter', label: 'Ingestion gate', sub: 'allowed in this index?', k: 'control', w: 280 },
          { id: 'idx', x: 980, y: 330, icon: 'vector', label: 'Index', sub: 'chunks keep labels', k: 'data', w: 250 },
          { id: 'ret', x: 1350, y: 330, icon: 'search', label: 'Retrieval', sub: 'filtered by clearance', k: 'model', w: 260 },
          { id: 'out', x: 1350, y: 690, icon: 'chat', label: 'Answer', sub: 'inherits highest label', k: 'neutral', w: 270 },
          { id: 'dlp', x: 960, y: 690, icon: 'shield', label: 'DLP at egress', sub: 'blocks where the label forbids', k: 'threat', w: 300 } ],
        edges: [{ from: 'doc', to: 'ing', k: 'human' }, { from: 'ing', to: 'idx', k: 'control' }, { from: 'idx', to: 'ret', k: 'data' }, { from: 'ret', to: 'out', k: 'model' }, { from: 'out', to: 'dlp', k: 'neutral' }],
        steps: [
          { show: 'doc', hi: 'doc' },
          { show: 'ing doc-ing', flow: 'doc-ing', hi: 'ing' },
          { show: 'idx ing-idx', flow: 'ing-idx', hi: 'idx' },
          { show: 'ret idx-ret', flow: 'idx-ret', hi: 'ret' },
          { show: 'out ret-out', flow: 'ret-out', hi: 'out' },
          { show: 'dlp out-dlp', flow: 'out-dlp', hi: 'dlp' } ],
        say: 'Here is how labels drive controls in a retrieval system. A document arrives labelled confidential. | An ingestion gate checks whether that label is allowed in this index. A restricted document would be rejected. | In the index, every chunk and embedding keeps the label. | At retrieval, results are filtered by the user’s clearance, so nobody receives content above their level. | The generated answer inherits the highest label of the content it used. | And data loss prevention at egress blocks the answer from going anywhere the label forbids, such as an external email.' },
      { t: 'bullets', title: 'Sensitive data impact assessment', layout: 'grid', cols: 2, items: [
          { icon: 'bolt', h: 'Triggered by', d: 'New sensitive dataset for AI, or a new use of one', k: 'threat' },
          { icon: 'database', h: 'Data profile', d: 'Categories, volume, subjects, sensitivity', k: 'data' },
          { icon: 'target', h: 'Purpose fit', d: 'Is the AI use compatible with why it was collected?', k: 'human' },
          { icon: 'search', h: 'Derivation risks', d: 'Inference, memorisation, re-identification', k: 'model' },
          { icon: 'shield', h: 'Safeguards', d: 'Minimise, de-identify, isolate, restrict access', k: 'control' },
          { icon: 'gavel', h: 'Decision', d: 'Approve, approve with conditions, or refuse', k: 'neutral' } ],
        say: 'Before sensitive data is used for AI, a sensitive data impact assessment examines it. | It is triggered by a new sensitive dataset entering an AI pipeline, or a new use of an existing one. | It profiles the data: categories, volume, whose data it is, and how sensitive. | It tests purpose fit: is the AI use compatible with the purpose the data was collected for? | It considers derivation risks: inference of new sensitive facts, memorisation and re-identification. | It specifies safeguards: minimisation, de-identification, isolation and access restrictions. | And it ends with a decision: approve, approve with conditions, or refuse. It often feeds a DPIA.' },
      { t: 'bullets', title: 'Classification pitfalls in AI', items: [
          { icon: 'copy', h: 'Labels lost in transformation', d: 'Chunking, embedding and joins drop metadata', k: 'threat' },
          { icon: 'layers', h: 'Aggregation raises sensitivity', d: 'Harmless pieces combine into sensitive wholes', k: 'model' },
          { icon: 'sparkle', h: 'Unlabelled AI output', d: 'Generated summaries of confidential data', k: 'human' },
          { icon: 'alert', h: 'Over-classification', d: 'If everything is secret, labels get ignored', k: 'neutral' } ],
        say: 'Watch for four pitfalls. | Labels lost in transformation: chunking, embedding and joining datasets often drop metadata unless pipelines carry it deliberately. | Aggregation raises sensitivity: individually harmless records can combine into something sensitive, sometimes called the mosaic effect. | Unlabelled AI output: a summary of a confidential report is still confidential, but it rarely carries a label. | And over-classification: if everything is marked secret, people stop paying attention to labels at all.' },
      { t: 'summary', items: ['Attach AI handling rules to each classification level', 'Tags must survive chunking and embedding', 'Labels drive ingestion, retrieval filtering and DLP', 'Assess sensitive data before AI use: purpose, derivation, safeguards'],
        say: 'To recap. | Attach clear AI handling rules to each classification level. | Make sure tags survive chunking, embedding and every other transformation. | Use labels to drive ingestion gates, retrieval filtering and data loss prevention. | And run a sensitive data impact assessment before sensitive data is used for AI, covering purpose fit, derivation risks and safeguards.' } ] },
    { type: 'text', md: `### Classification for AI
**Data classification** assigns a sensitivity level to data based on the impact of its unauthorised disclosure, modification or loss. Typical schemes use three to five levels (for example, Public, Internal, Confidential, Restricted). For AI, each level needs explicit handling rules:

| Level | Examples | AI handling (example) |
|---|---|---|
| **Restricted** | Special category data, cardholder data, credentials and keys, M&A plans, export-controlled data | Not permitted in external AI services; only approved, isolated environments with additional controls; SDIA required |
| **Confidential** | Customer and employee personal data, contracts, source code, unreleased financials | Approved enterprise AI with no-training and retention terms; retrieval with permission filtering |
| **Internal** | Policies, internal communications, general business documents | Approved AI tools |
| **Public** | Published content | Any tool; verify outputs before reuse |

The classification is set by the **data owner**, informed by legal and regulatory requirements. **Declassification** and **reclassification** rules matter too: an aggregated or de-identified dataset may move down a level, and an enriched or combined one may move up.

### Tagging and labelling
- **Manual labelling** by owners or authors, supported by sensible defaults (for example, a team site defaulting to Confidential).
- **Automated classification** using pattern matching (card numbers, national IDs), exact data matching against known records, and ML classifiers for documents such as contracts or medical notes. **Data security posture management (DSPM)** tools (Module 3.4) discover and classify data across cloud stores, including AI training buckets and vector databases.
- **Label persistence:** pipelines must propagate labels from source documents to **chunks, embeddings, features, datasets and outputs**. Vector databases should store labels and access-control metadata with each chunk so retrieval can filter on them.
- **AI-specific attributes:** consent status, lawful basis, **permitted purposes** (for example, “may be used for retrieval but not for training”), residency constraints, licence terms, retention period and provenance.

### Labels as enforcement
Labels are only useful if systems act on them:
- **Ingestion gates** reject or route data whose label isn’t permitted for a given pipeline or index.
- **Retrieval filters** return only content the requesting user (or agent, acting for a user) is cleared to see.
- **Output labelling** marks generated content with the highest classification of its inputs.
- **DLP** enforces handling rules at egress points such as email, file sharing and external AI tools.
- **Agent data access** is constrained by labels and purposes (Module 3.4 covers purpose-based access and agentic data catalogues).

### Sensitive data impact assessment (SDIA)
An **SDIA** is a focused assessment carried out before sensitive or restricted data is used in an AI system (or used for a new purpose). It typically covers:
1. **Data profile:** categories (personal, special category, financial, health, children’s), volume, data subjects, sources, classification.
2. **Purpose and compatibility:** the intended AI use and whether it is compatible with the original collection purpose and legal basis.
3. **Access:** who and what (people, services, agents, vendors) will access the data, and where.
4. **Derivation risks:** attribute inference, memorisation and extraction, embedding inversion, re-identification through linkage.
5. **Safeguards:** minimisation, de-identification (Module 3.2), segregation, encryption, access control, output filtering, retention limits.
6. **Residual risk and decision:** approve, approve with conditions, or refuse; with owner sign-off and review triggers.

An SDIA frequently provides the data-specific input to a DPIA (Module 2.3), and its conditions become requirements for the pipeline.

### Pitfalls
- Labels dropped during chunking, embedding, feature engineering or joins.
- **Aggregation (mosaic) risk:** combining datasets can create data more sensitive than any part.
- AI-generated summaries, translations and extracts of sensitive content left unlabelled.
- **Over-classification**, which leads to label fatigue and workarounds; and **under-classification** of legacy data that was never assessed.`, },
    { type: 'tabs', title: 'Classifying AI artefacts', items: [
      ['Embeddings', 'Inherit the classification of their source text, because they can be partly inverted and are used to retrieve the source. A vector index built from Confidential documents is Confidential.'],
      ['Fine-tuned models', 'May memorise training data. A model fine-tuned on Restricted data should be treated as Restricted unless testing shows otherwise and the owner approves reclassification.'],
      ['Synthetic datasets', 'Classify according to their residual risk: high-fidelity synthetic data can leak real records. Validate privacy before lowering the classification.'],
      ['Prompts and logs', 'Take the highest classification of content users may enter. Logs of a legal assistant’s prompts are as sensitive as the legal documents themselves.'],
      ['Generated outputs', 'Inherit the highest label of their inputs, and may need a higher label if they aggregate sensitive facts.'] ] },
    { type: 'callout', kind: 'exam', title: 'Derived data inherits', md: `A recurring exam theme: **derived artefacts inherit the classification of their sources** unless the owner, after assessment, decides otherwise. Embeddings, fine-tuned models, prompt logs and summaries of confidential data are not automatically less sensitive than the data they came from.` },
    { type: 'check', q: { q: 'A team builds a vector index from Confidential HR documents and plans to classify the index as Internal because “it only contains numbers”. What is the BEST response?', o: ['Agree, since embeddings are numerical vectors that can’t be read or linked to employees', 'Classify the index as Confidential, label each chunk with access metadata, and filter retrieval by clearance', 'Classify the index as Internal, but restrict the vector database to the HR team’s own isolated network segment', 'Delete the source documents after indexing, so only the less sensitive embeddings remain stored'], a: 1, b: 3,
      why: 'Embeddings can be partly inverted and are used to retrieve the original text, so they inherit the source classification. Labels and access metadata per chunk enable permission-aware retrieval.' } }
  ]
};
