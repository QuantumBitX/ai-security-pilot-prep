/* 4.1 · Section 2: AI threat modelling across architectural components (RAG, vector databases, inference) */
module.exports = {
  title: 'Threat modelling AI architectures', covers: [2],
  blocks: [
    { type: 'video', title: 'Drawing the boundaries', kicker: 'Module 4.1 · Video 2 of 5', scenes: [
      { t: 'title', kicker: 'Module 4.1 · Secure AI design', title: 'Drawing the boundaries', sub: 'Threat modelling RAG, vector databases and inference', icon: 'target',
        say: 'You can’t secure an AI system until you can see it: every component, every data flow, and every place where trust changes hands. | This video shows how to threat model an AI architecture, component by component, using a retrieval-augmented assistant as the example.' },
      { t: 'flow', title: 'A RAG assistant and its trust boundaries',
        zones: [
          { id: 'zi', x: 55, y: 215, w: 280, h: 240, label: 'Internet', k: 'threat' },
          { id: 'zs', x: 55, y: 570, w: 280, h: 240, label: 'Content sources', k: 'human' },
          { id: 'zc', x: 400, y: 200, w: 760, h: 640, label: 'Your cloud', k: 'control' },
          { id: 'zp', x: 1195, y: 215, w: 300, h: 240, label: 'Model provider', k: 'model' } ],
        nodes: [
          { id: 'user', x: 195, y: 350, icon: 'user', label: 'User', sub: 'prompt', k: 'human', w: 220 },
          { id: 'docs', x: 195, y: 705, icon: 'doc', label: 'Documents', sub: 'many owners', k: 'human', w: 220 },
          { id: 'orch', x: 640, y: 350, icon: 'gear', label: 'Orchestrator', sub: 'prompt assembly', k: 'neutral', w: 280 },
          { id: 'vdb', x: 640, y: 705, icon: 'database', label: 'Vector database', sub: 'chunks, embeddings', k: 'data', w: 290 },
          { id: 'tools', x: 1010, y: 705, icon: 'tool', label: 'Internal APIs', sub: 'tool calls', k: 'threat', w: 230 },
          { id: 'llm', x: 1345, y: 350, icon: 'model', label: 'Hosted LLM', sub: 'inference', k: 'model', w: 240 } ],
        edges: [{ from: 'user', to: 'orch', k: 'human' }, { from: 'docs', to: 'vdb', k: 'human' }, { from: 'orch', to: 'vdb', k: 'data', both: true }, { from: 'orch', to: 'llm', k: 'model', both: true }, { from: 'orch', to: 'tools', k: 'threat' }],
        steps: [
          { show: 'zi zc user orch user-orch', flow: 'user-orch', hi: 'orch' },
          { show: 'zs docs vdb docs-vdb', flow: 'docs-vdb', hi: 'docs', mark: { docs: 'warn' } },
          { show: 'orch-vdb', flow: 'orch-vdb', hi: 'vdb', mark: { vdb: 'lock' } },
          { show: 'zp llm orch-llm', flow: 'orch-llm', hi: 'llm' },
          { show: 'tools orch-tools', flow: 'orch-tools', hi: 'tools', mark: { tools: 'key' } },
          {} ],
        say: 'Start by drawing the system and its trust boundaries, shown here as dashed boxes. A user on the internet sends a prompt to the orchestrator, inside your cloud. | Documents from many sources and owners are chunked, embedded and indexed. Every source is a route for poisoning and indirect prompt injection. | The orchestrator queries the vector database. Embeddings can be inverted to recover much of the original text, so the index is as sensitive as the documents, and it needs authentication, tenant isolation and permission-aware filtering. | The prompt and retrieved context then cross another boundary to a hosted model, which raises questions of data in transit, provider retention, and abuse of the endpoint. | And the model’s output can trigger calls to internal APIs. Each tool extends what an attacker could do, so that boundary needs authorisation, validation and approval. | The rule of thumb: every arrow that crosses a dashed boundary is where you look hardest. What could an attacker send across it, and what stops them?' },
      { t: 'bullets', title: 'STRIDE, with AI examples', layout: 'grid', cols: 2, items: [
          { icon: 'mask', h: 'Spoofing', d: 'Fake agents or MCP servers, stolen keys', k: 'threat' },
          { icon: 'bug', h: 'Tampering', d: 'Poisoned index, altered weights or prompts', k: 'model' },
          { icon: 'audit', h: 'Repudiation', d: 'No record of which agent did what', k: 'neutral' },
          { icon: 'eye', h: 'Information disclosure', d: 'Leaky outputs, embeddings, logs', k: 'data' },
          { icon: 'power', h: 'Denial of service', d: 'Token floods, runaway agents', k: 'human' },
          { icon: 'unlock', h: 'Elevation of privilege', d: 'Injection driving powerful tools', k: 'control' } ],
        say: 'A classic checklist, STRIDE, still works, with AI-specific examples. | Spoofing: fake agents, malicious tool servers, or stolen API keys. | Tampering: a poisoned retrieval index, altered weights, or an edited system prompt. | Repudiation: no reliable record of which model version, agent or tool call did what. | Information disclosure: sensitive data leaking through outputs, embeddings or logs. | Denial of service: token floods and runaway agents that exhaust capacity or budgets. | And elevation of privilege: prompt injection that steers an over-privileged tool into doing what the attacker wants.' },
      { t: 'cycle', title: 'An AI threat modelling cycle', center: 'Threat model', centerSub: 'repeat on every change',
        stages: [
          { icon: 'layers', label: 'Decompose', d: 'Components, data flows, trust boundaries' },
          { icon: 'search', label: 'Identify', d: 'STRIDE, OWASP LLM Top 10, MITRE ATLAS' },
          { icon: 'scale', label: 'Rate', d: 'Likelihood and impact, in the risk register' },
          { icon: 'shield', label: 'Mitigate', d: 'Controls per threat, with owners' },
          { icon: 'check', label: 'Validate', d: 'Testing and red teaming' } ],
        say: 'Threat modelling is a cycle, not a one-off document. | Decompose the system into components, data flows and trust boundaries. | Identify threats, using STRIDE alongside AI-specific catalogues such as the OWASP Top 10 for large language model applications and MITRE ATLAS. | Rate each threat by likelihood and impact, and record it in the risk register. | Choose mitigations for each threat, each with an owner. | Validate the result with testing and red teaming. And repeat the cycle whenever the architecture, model, data or tools change.' },
      { t: 'summary', items: ['Draw components, data flows and trust boundaries first', 'Look hardest where flows cross a boundary', 'Treat indexes and embeddings as sensitive as their sources', 'Use STRIDE with OWASP and ATLAS; repeat on every change'],
        say: 'To recap. | Start by drawing components, data flows and trust boundaries. | Look hardest wherever a flow crosses a boundary. | Treat vector indexes and embeddings as sensitive as the documents they came from. | And combine STRIDE with AI-specific catalogues, repeating the threat model whenever the system changes.' } ] },
    { type: 'text', md: `### Threats by component
| Component | Key threats | Example controls |
|---|---|---|
| **Ingestion pipeline** | Poisoned or malicious documents, indirect prompt injection, personal data swept into the index, lost permission metadata | Source allow-lists, content scanning, preserving document permissions as metadata, quarantine for new sources (Module 3.7) |
| **Embedding model** | Embedding inversion: research in 2023 recovered most of the original text from embeddings of short passages; a swapped or poisoned embedding model | Treat embeddings as being as sensitive as their source text; pin and verify the embedding model |
| **Vector database** | Exposed endpoints without authentication (researchers keep finding them on the internet), cross-tenant leakage, unfiltered similarity search, tampering with stored vectors | Authentication, network isolation, encryption, per-tenant namespaces or indexes, metadata filtering by the user’s permissions, write controls and audit logs |
| **Orchestrator and retrieval** | Indirect prompt injection from retrieved content, permission bypass, context stuffing that pushes out instructions, unsafe prompt templates | Permission-aware retrieval **before** content reaches the model, content separation, context limits, reviewed templates |
| **Inference endpoint** | Jailbreaks, extraction, denial of service and denial of wallet, insecure serving (debug endpoints, missing authentication), data retention by a provider | Authentication, rate limits and quotas, output minimisation, hardened serving, contractual and technical retention controls (Module 3.6) |
| **Output path** | Improper output handling, data leakage, hallucinated citations | Encoding, schema validation, DLP, grounding checks (Module 3.5) |
| **Tools and agents** | Excessive agency, confused deputy, over-privileged tokens, malicious tool servers | Least privilege, delegated access, approval for high-impact actions, tool allow-lists (Section 5; Module 4.6) |
| **Logs and telemetry** | Sensitive prompts and outputs in logs, log tampering | Minimisation, redaction, tamper-evident storage (Module 3.5) |

### Running a threat model
1. **Scope and decompose.** Draw a data flow diagram with components, data stores, external entities and **trust boundaries**: between users and the app, the app and model providers, the app and tools, and data sources and the index.
2. **Identify threats** for each element and each boundary crossing. Combine STRIDE with the **OWASP Top 10 for LLM Applications**, **MITRE ATLAS** techniques, and frameworks for agentic systems such as the Cloud Security Alliance’s **MAESTRO** (Module 6.1 covers methodologies in depth).
3. **Rate** likelihood and impact, using the organisation’s risk method (Module 2.3), and record the results in the risk register.
4. **Mitigate:** choose controls, assign owners, and record residual risk and acceptance.
5. **Validate** with security testing and AI red teaming, and update the model with what you learn.
6. **Repeat** when components, models, data sources, tools or the threat landscape change, and after incidents.

Include architects, ML engineers, security, data owners and product owners: each sees different flows and failure modes.

### Principles that come out of most AI threat models
- **The model is not a trust boundary.** Assume prompt injection will sometimes succeed, and limit what a manipulated model can reach.
- **Authorise before retrieval.** Filter by the user’s permissions in the retrieval layer, not in the prompt or the output.
- **Data keeps its classification** through chunking and embedding.
- **Every tool is attack surface.** Its permissions are the real limit on what an attacker can do through the model.` },
    { type: 'callout', kind: 'exam', title: 'Threat modelling questions', md: `When a question asks what to do **first** in securing a new AI architecture, threat modelling (understanding components, data flows and trust boundaries) usually comes before choosing specific tools. When it asks **where** a control belongs, look for the boundary crossing it protects, such as retrieval for permissions or the tool interface for actions.` },
    { type: 'match', title: 'Where does the threat live?', pairs: [
      ['Hidden instructions arrive inside a shared document', 'Ingestion pipeline'],
      ['Similarity search returns another customer’s chunks', 'Vector database'],
      ['A crafted request makes the model API return debug information', 'Inference endpoint'],
      ['A refund is issued because the model asked for it', 'Tools and agents'],
      ['Full prompts are kept indefinitely in a shared log', 'Logs and telemetry'] ] },
    { type: 'check', q: { q: 'A team argues that its vector database needs no access controls, because it stores only embeddings and not the original documents. What is the BEST response?', o: ['Agree, because embeddings are random-looking numbers that can’t be turned back into text', 'Disagree: embeddings can be inverted to recover much of the text, so protect them like the sources', 'Agree, provided the database runs in a different cloud region from the document store', 'Disagree, but only because the database server software itself may have known security vulnerabilities'], a: 1, b: 2,
      why: 'Research has shown that embeddings can be inverted to reconstruct much of the original text, so a vector index inherits the sensitivity of its sources and needs authentication, isolation and permission-aware filtering. Region separation doesn’t protect content, and software vulnerabilities are only part of the risk.' } }
  ]
};
