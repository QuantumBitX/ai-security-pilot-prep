/* 3.4 · Section 1: data security posture management */
module.exports = {
  title: 'Data security posture management (DSPM)', covers: [1],
  blocks: [
    { type: 'video', title: 'Know where your AI data lives', kicker: 'Module 3.4 · Video 1 of 6', scenes: [
      { t: 'title', kicker: 'Module 3.4 · Data protection', title: 'Know where your AI data lives', sub: 'Data security posture management for AI', icon: 'eye',
        say: 'You can’t protect data you don’t know you have, and AI projects copy data everywhere: notebooks, feature stores, vector databases and model checkpoints. | This video covers data security posture management, or DSPM, and how it finds and fixes risky AI data.' },
      { t: 'flow', title: 'What DSPM does',
        nodes: [
          { id: 'disc', x: 220, y: 330, icon: 'search', label: 'Discover', sub: 'data stores and copies', k: 'data', w: 270 },
          { id: 'cls', x: 610, y: 330, icon: 'tag', label: 'Classify', sub: 'detect sensitive content', k: 'human', w: 280 },
          { id: 'acc', x: 1000, y: 330, icon: 'key', label: 'Map access', sub: 'who and what can reach it', k: 'model', w: 290 },
          { id: 'risk', x: 1380, y: 330, icon: 'alert', label: 'Assess risk', sub: 'exposure and misconfiguration', k: 'threat', w: 290 },
          { id: 'fix', x: 1380, y: 690, icon: 'tool', label: 'Remediate', sub: 'restrict, encrypt, delete', k: 'control', w: 280 },
          { id: 'mon', x: 1000, y: 690, icon: 'eye', label: 'Monitor', sub: 'continuous, not one-off', k: 'neutral', w: 280 } ],
        edges: [{ from: 'disc', to: 'cls', k: 'data' }, { from: 'cls', to: 'acc', k: 'human' }, { from: 'acc', to: 'risk', k: 'model' }, { from: 'risk', to: 'fix', k: 'threat' }, { from: 'fix', to: 'mon', k: 'control' }],
        steps: [
          { show: 'disc', hi: 'disc' },
          { show: 'cls disc-cls', flow: 'disc-cls', hi: 'cls' },
          { show: 'acc cls-acc', flow: 'cls-acc', hi: 'acc' },
          { show: 'risk acc-risk', flow: 'acc-risk', hi: 'risk', mark: { risk: 'warn' } },
          { show: 'fix risk-fix', flow: 'risk-fix', hi: 'fix' },
          { show: 'mon fix-mon', flow: 'fix-mon', hi: 'mon' } ],
        say: 'DSPM works in a continuous cycle. It discovers data stores, including unmanaged copies in cloud accounts and SaaS tools. | It classifies what is inside, detecting personal data, secrets, intellectual property and regulated data. | It maps access: which identities, services and AI agents can reach each store. | It assesses risk, such as sensitive data in a publicly accessible bucket, or a training copy with weaker controls than its source. | It drives remediation: restricting access, encrypting, or deleting stale copies. | And it monitors continuously, because AI teams create new copies every day.' },
      { t: 'bullets', title: 'Where AI data hides', layout: 'grid', cols: 2, items: [
          { icon: 'code', h: 'Notebooks and scratch space', d: 'Extracts pulled for experiments', k: 'neutral' },
          { icon: 'layers', h: 'Feature stores', d: 'Engineered data for models', k: 'data' },
          { icon: 'vector', h: 'Vector databases', d: 'Embeddings and document chunks', k: 'model' },
          { icon: 'archive', h: 'Snapshots and checkpoints', d: 'Training copies and model files', k: 'human' },
          { icon: 'list', h: 'Prompt and response logs', d: 'Often the largest uncontrolled store', k: 'threat' },
          { icon: 'cloud', h: 'SaaS AI tools', d: 'Connectors copy data outside', k: 'control' } ],
        say: 'DSPM matters for AI because data spreads. | Notebooks and scratch storage, where data scientists pull extracts for experiments. | Feature stores, which hold engineered data for models. | Vector databases, holding embeddings and chunks of source documents. | Training snapshots and model checkpoints, which can contain or encode sensitive data. | Prompt and response logs, often the largest uncontrolled store of all. | And SaaS AI tools and their connectors, which copy data outside your perimeter.' },
      { t: 'compare', title: 'DSPM, CSPM and DLP', labels: ['Focus', 'Asks', 'Example finding'],
        cols: [{ h: 'DSPM', icon: 'database', k: 'data' }, { h: 'CSPM', icon: 'cloud', k: 'model' }, { h: 'DLP', icon: 'filter', k: 'control' }],
        rows: [
          ['Data and its exposure', 'Cloud configuration', 'Data in motion and use'],
          ['Where is sensitive data, and who can reach it?', 'Is the infrastructure set up safely?', 'Is sensitive data leaving right now?'],
          ['HR data copied to a test bucket', 'A bucket allows public access', 'A customer list pasted into a chatbot'] ],
        say: 'DSPM is often confused with two neighbours. | DSPM focuses on data and its exposure. Cloud security posture management, or CSPM, focuses on infrastructure configuration. Data loss prevention focuses on data in motion and in use. | DSPM asks where sensitive data is, and who can reach it. CSPM asks whether the infrastructure is configured safely. DLP asks whether sensitive data is leaving right now. | A typical DSPM finding is HR data copied into a test bucket. For CSPM, a bucket that allows public access. For DLP, a customer list being pasted into a chatbot. They work best together.' },
      { t: 'summary', items: ['DSPM discovers, classifies, maps access, assesses and remediates', 'AI multiplies data copies: notebooks, features, vectors, logs, SaaS', 'DSPM finds data at rest; CSPM checks configuration; DLP watches flows', 'Run it continuously, with owners who act on findings'],
        say: 'To recap. | DSPM discovers data, classifies it, maps who can reach it, assesses the risk and drives remediation. | AI multiplies copies of data: in notebooks, feature stores, vector databases, checkpoints, logs and SaaS tools. | DSPM finds risky data at rest, CSPM checks infrastructure configuration, and DLP watches data in motion. | And DSPM only works when it runs continuously, with owners who act on what it finds.' } ] },
    { type: 'text', md: `### What DSPM does
**Data security posture management (DSPM)** gives continuous visibility of where sensitive data lives, how it moves and who can reach it, and drives fixes. Typical capabilities:
- **Discovery** of data stores across cloud accounts, SaaS and on-premises systems, including **shadow data** (unmanaged or forgotten copies).
- **Classification** of contents, using patterns, exact data matching and machine learning, mapped to the organisation’s classification scheme (Module 3.1).
- **Access mapping:** which users, roles, service accounts and AI agents can reach each store, and whether that access is used.
- **Flow and lineage mapping:** where data is copied, by which pipelines.
- **Risk prioritisation:** for example, sensitive data that is publicly accessible, unencrypted, over-permissioned, stored outside approved regions, or kept beyond its retention period.
- **Remediation workflows:** tickets to owners, automated fixes such as removing public access, and evidence for audits.

### DSPM for AI
AI work creates copies at speed: extracts in notebooks, features, training snapshots, embeddings, checkpoints, evaluation sets and prompt logs. DSPM helps you:
- Build and maintain an **inventory of AI data stores**, linked to the AI inventory and AIBOMs (Module 2.5).
- Detect **sensitive data in training sets, vector stores and logs** that shouldn’t be there.
- Find **over-privileged AI service accounts and agents**, and stale copies that should be deleted.
- Check **residency** of AI data against requirements (Module 3.1).

A related category, **AI security posture management (AI-SPM)**, inventories models, endpoints, AI services and their configurations, for example finding a model endpoint exposed without authentication. DSPM and AI-SPM complement each other.

### Neighbouring tools
| Tool | Focus | Typical question |
|---|---|---|
| **DSPM** | Data at rest and its exposure | Where is our sensitive data, and who can reach it? |
| **CSPM** | Cloud infrastructure configuration | Are storage, networks and identities configured safely? |
| **DLP** | Data in motion and in use | Is sensitive data leaving through email, uploads or prompts? |
| **AI-SPM** | AI services, models and configuration | Which AI assets exist, and are they configured securely? |

### Making it work
DSPM is only as good as the actions it drives. Assign owners to data stores, agree remediation timescales by risk, feed DSPM classifications into DLP policies and access reviews, and track metrics such as the share of sensitive stores with an owner, the number of over-exposed records, and the time to remediate. Coverage gaps (on-premises systems, encrypted or proprietary formats) should be known and documented.` },
    { type: 'match', title: 'Which tool finds this?', pairs: [
      ['A forgotten copy of customer data in a data scientist’s cloud storage', 'DSPM'],
      ['A storage bucket configured to allow public access', 'CSPM'],
      ['An employee pasting a contract into an external chatbot', 'DLP'],
      ['A model inference endpoint exposed without authentication', 'AI-SPM'] ] },
    { type: 'check', q: { q: 'A security team suspects that copies of customer data are scattered across AI experiments in several cloud accounts. Which capability BEST gives a continuously updated picture of where that data is and who can reach it?', o: ['A cloud security posture tool that checks every account against configuration benchmarks', 'Data security posture management that discovers, classifies and maps access to data stores', 'Network data loss prevention that inspects traffic leaving the corporate network for card numbers', 'An annual data audit in which each team lists the datasets it holds in a shared spreadsheet'], a: 1, b: 1,
      why: 'DSPM is designed to discover and classify data stores, including shadow copies, and map who can access them, continuously. CSPM checks configuration, network DLP watches traffic, and annual self-reporting misses forgotten copies.' } }
  ]
};
