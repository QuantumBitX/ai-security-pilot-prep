/* 2.5 · Section 2: AI component dependency tracking (SBOM, AIBOM) and shared responsibility */
module.exports = {
  title: 'Dependency tracking (SBOM and AIBOM) and shared responsibility', covers: [3, 4],
  blocks: [
    { type: 'video', title: 'Know what you’re running', kicker: 'Module 2.5 · Video 2 of 3', scenes: [
      { t: 'title', kicker: 'Module 2.5 · AI supply chain', title: 'Know what you’re running', sub: 'AI bills of materials, and who secures what', icon: 'list',
        say: 'When a vulnerability is announced in a library, a model or a dataset, the first question is always: are we affected? Without an inventory of components, nobody can answer quickly. | This video covers software and AI bills of materials, and the shared responsibility models that decide who secures what.' },
      { t: 'layers', title: 'What an AI system depends on',
        layers: [
          { icon: 'chat', label: 'Application and prompts', sub: 'System prompts, guardrails, orchestration code', k: 'human' },
          { icon: 'model', label: 'Models and adapters', sub: 'Base model, version, fine-tunes, adapters, licences', k: 'model' },
          { icon: 'database', label: 'Data', sub: 'Training, fine-tuning, evaluation and retrieval sources', k: 'data' },
          { icon: 'code', label: 'Software', sub: 'Frameworks, libraries, inference servers, containers', k: 'neutral' },
          { icon: 'plug', label: 'Services and tools', sub: 'Model APIs, plugins, MCP servers, other agents', k: 'control' },
          { icon: 'gpu', label: 'Infrastructure and hardware', sub: 'Cloud platform, accelerators, drivers, firmware', k: 'threat' } ],
        say: 'An AI system has more kinds of dependency than ordinary software. | The application layer: system prompts, guardrails and orchestration code. | Models and adapters: which base model, which version, which fine-tunes and adapters, and under which licences. | Data: the training, fine-tuning, evaluation and retrieval sources that shape behaviour. | Software: frameworks, libraries, inference servers and container images. | Services and tools: external model APIs, plugins, MCP servers and other agents. | And infrastructure and hardware: the cloud platform, accelerators, drivers and firmware. A weakness at any layer can compromise the whole.' },
      { t: 'compare', title: 'From SBOM to AIBOM', labels: ['Lists', 'Answers', 'Formats'],
        cols: [{ h: 'SBOM', icon: 'code', k: 'neutral' }, { h: 'AIBOM', icon: 'model', k: 'model' }],
        rows: [
          ['Software components, versions, suppliers, licences', 'Also models, datasets, adapters, training lineage, hardware'],
          ['Which systems include this vulnerable library?', 'Also: which use this model or dataset, under what terms?'],
          ['SPDX, CycloneDX', 'CycloneDX ML-BOM; SPDX 3.0 AI and Dataset profiles'] ],
        say: 'A software bill of materials, or SBOM, has become standard practice. | It lists software components, their versions, suppliers and licences. An AI bill of materials, or AIBOM, extends it to models, datasets, adapters, training lineage and, where relevant, hardware. | An SBOM answers: which of our systems include this vulnerable library? An AIBOM also answers: which systems use this model or dataset, where did it come from, and under what licence? | Both have established formats. CycloneDX supports machine learning bills of materials, and SPDX version three adds AI and dataset profiles.' },
      { t: 'bullets', title: 'What an AIBOM records', layout: 'grid', cols: 2, items: [
          { icon: 'hash', h: 'Model identity', d: 'Name, version, supplier, cryptographic hash', k: 'model' },
          { icon: 'branch', h: 'Lineage', d: 'Base model, fine-tunes, who trained it, when', k: 'human' },
          { icon: 'database', h: 'Datasets', d: 'Sources, licences, sensitivity, versions', k: 'data' },
          { icon: 'code', h: 'Software dependencies', d: 'Frameworks, libraries, serving stack', k: 'neutral' },
          { icon: 'doc', h: 'Licences and restrictions', d: 'Permitted uses, attribution, limits', k: 'threat' },
          { icon: 'book', h: 'Evaluation and limits', d: 'Model card, test results, known issues', k: 'control' } ],
        say: 'A useful AIBOM records six things. | Model identity: name, version, supplier and a cryptographic hash, so you can prove which artefact is running. | Lineage: the base model, any fine-tunes or adapters, who trained it and when. | Datasets: their sources, licences, sensitivity and versions. | Software dependencies: frameworks, libraries and the serving stack. | Licences and restrictions: permitted uses, attribution requirements and limits. | And evaluation and limitations, usually by linking to the model card and test results.' },
      { t: 'flow', title: 'An AIBOM in an incident',
        nodes: [
          { id: 'adv', x: 200, y: 450, icon: 'siren', label: 'Advisory', sub: 'poisoned dataset or vulnerable library', k: 'threat', w: 300 },
          { id: 'q', x: 580, y: 450, icon: 'search', label: 'Query AIBOMs', k: 'data', w: 260 },
          { id: 'hit', x: 940, y: 450, icon: 'list', label: 'Affected systems', sub: 'with owners', k: 'human', w: 270 },
          { id: 'act', x: 1320, y: 450, icon: 'tool', label: 'Act', sub: 'patch, retrain or compensate', k: 'control', w: 290 } ],
        edges: [{ from: 'adv', to: 'q', k: 'threat' }, { from: 'q', to: 'hit', k: 'data' }, { from: 'hit', to: 'act', k: 'human' }],
        steps: [
          { show: 'adv', hi: 'adv' },
          { show: 'q adv-q', flow: 'adv-q', hi: 'q' },
          { show: 'hit q-hit', flow: 'q-hit', hi: 'hit' },
          { show: 'act hit-act', flow: 'hit-act', hi: 'act', note: { x: 800, y: 670, w: 900, text: 'Without an AIBOM, the same question takes days of spreadsheets and guesswork.' } } ],
        say: 'Here is why it matters. An advisory arrives: a popular public dataset was poisoned, or a vulnerability is found in an inference server. | You query your AIBOMs for the affected component. | Within minutes you have a list of affected systems, each with an owner, from the inventory. | And owners act: patching, retraining on clean data, or applying compensating controls. Without AIBOMs, the same question takes days of spreadsheets and guesswork.' },
      { t: 'compare', title: 'Shared responsibility for AI', labels: ['Provider secures', 'You secure', 'Always yours'],
        cols: [{ h: 'AI SaaS', icon: 'cloud', k: 'data' }, { h: 'Model API', icon: 'plug', k: 'model' }, { h: 'Self-hosted', icon: 'server', k: 'neutral' }],
        rows: [
          ['Model, platform, built-in safety', 'Infrastructure, model hosting, base safety', 'Physical, hardware, hypervisor'],
          ['Users, data, configuration, use', 'Application, prompts, data, filters, identity', 'Nearly everything, including weights'],
          ['Accountability and compliance', 'Accountability and compliance', 'Accountability and compliance'] ],
        say: 'Shared responsibility depends on how you consume AI. | With AI software as a service, the provider secures the model, the platform and built-in safety systems. With a model API, it secures the infrastructure, model hosting and base model safety. If you self-host on cloud infrastructure, it secures only the physical layer, hardware and hypervisor. | Your share grows in the same order: users, data and configuration for SaaS; the whole application, prompts, retrieval data, filters and identity for an API; and nearly everything, including the model weights, if you self-host. | But in every model, accountability for outcomes and compliance stays with you.' },
      { t: 'summary', items: ['AI dependencies span prompts, models, data, software, services, hardware', 'AIBOMs extend SBOMs to models, datasets and lineage', 'They turn advisories into minutes, not days', 'Responsibility shifts by service model; accountability never does'],
        say: 'To recap. | AI systems depend on prompts, models, data, software, external services and hardware. | AI bills of materials extend software bills of materials to models, datasets and lineage. | They turn a vulnerability advisory into a targeted response in minutes rather than days. | And while responsibility for controls shifts between SaaS, API and self-hosted models, accountability for outcomes always stays with you.' } ] },
    { type: 'text', md: `### Why dependency tracking matters for AI
Supply-chain attacks and vulnerable dependencies are among the most common routes to compromise in software, and AI adds new dependency types. Examples include malicious model files that execute code when loaded (some serialisation formats, such as Python pickle, can run arbitrary code), poisoned public datasets, compromised fine-tuning adapters, vulnerable inference servers, and third-party plugins or MCP servers with excessive permissions. The **OWASP Top 10 for LLM Applications** lists supply chain (LLM03:2025) as a top risk.

### SBOM and AIBOM
A **software bill of materials (SBOM)** is a formal, machine-readable inventory of software components, versions, suppliers, dependency relationships and licences. Common formats are **SPDX** and **CycloneDX**. An **AI bill of materials (AIBOM)** extends this to AI-specific components:

| AIBOM element | Examples |
|---|---|
| Model identity | Name, version, supplier, format, **cryptographic hash or signature** |
| Model lineage | Base model, fine-tuning runs, adapters, training dates, training organisation |
| Datasets | Source and provenance, licence, collection method, sensitivity classification, version, preprocessing |
| Software | Training and inference frameworks, libraries, container images, serving stack (from the SBOM) |
| Services | External model APIs, embedding services, plugins, tools and MCP servers |
| Hardware | Accelerator types and firmware, where relevant to security or reproducibility |
| Licences and restrictions | Permitted uses, attribution, commercial limits, acceptable use policies |
| Evaluation and limitations | Links to model cards, evaluation results, known vulnerabilities and limitations |

**CycloneDX** supports machine-learning BOMs (ML-BOM) with fields for models and datasets, and **SPDX 3.0** introduced **AI** and **Dataset** profiles. Standards and community initiatives (including OWASP work on AIBOMs and US government work on SBOMs for AI) are maturing quickly; the governance requirement is stable: **for every AI system, know which models, datasets and components it uses, where they came from, and under what terms**.

### Using AIBOMs
- **Vulnerability and incident response:** match advisories against AIBOMs to find affected systems.
- **Procurement:** request AIBOMs from suppliers (or the information to build them) as a contract term.
- **Licence compliance:** check that every model and dataset is used within its licence.
- **Change control:** a new model version or dataset produces a new AIBOM version, linked to the inventory record and risk assessment.
- **Integrity:** store hashes and signatures so deployed artefacts can be verified against the AIBOM (Module 3.6 covers signing).

### Shared responsibility models
Cloud providers popularised the **shared responsibility model**: the provider secures some layers, the customer secures the rest. AI adds layers such as model safety, prompts and retrieval data:

| Layer | AI SaaS (e.g., a copilot) | Model API (PaaS) | Self-hosted model on IaaS |
|---|---|---|---|
| Physical data centre, hardware, hypervisor | Provider | Provider | Provider |
| Model hosting, scaling, patching of serving stack | Provider | Provider | **Customer** |
| Base model training and built-in safety | Provider | Provider | Model supplier / **customer** |
| Application, orchestration, plugins | Provider | **Customer** | **Customer** |
| Prompts, guardrail configuration, content filters | Shared (customer configures) | **Customer** | **Customer** |
| Data (inputs, RAG sources, outputs) | **Customer** | **Customer** | **Customer** |
| Identity, access, user behaviour | **Customer** | **Customer** | **Customer** |
| Accountability for use, outcomes and compliance | **Customer** | **Customer** | **Customer** |

Three practical lessons:
1. **Read the provider’s responsibility documentation** and map each responsibility to an owner in your organisation; gaps appear where each side assumes the other is responsible.
2. **Configure what you own:** the most common cloud and SaaS failures are customer misconfigurations, such as overly broad data access for a copilot.
3. **Accountability is never transferred**, whatever the contract says about responsibility for specific controls.`, },
    { type: 'match', title: 'Who is responsible?', pairs: [
      ['Patching the inference server for a model you host on cloud VMs', 'Customer'],
      ['Physical security of the provider’s data centre', 'Provider'],
      ['Deciding which SharePoint sites a SaaS copilot can read', 'Customer'],
      ['Base safety training of a model accessed through an API', 'Provider'],
      ['Compliance of the AI use case with the EU AI Act', 'Customer (deployer), always'] ] },
    { type: 'callout', kind: 'exam', title: 'AIBOM questions', md: `If a question asks how to **rapidly determine which systems are affected** by a compromised model, dataset or library, the answer is an **AIBOM** (or SBOM for software-only components) linked to the **AI inventory**. If it asks who is responsible for a misconfigured SaaS AI feature, the answer is usually the **customer**, because configuration and data access sit on the customer’s side of the shared responsibility line.` },
    { type: 'check', q: { q: 'A public dataset used by many organisations is found to contain poisoned samples. Which capability lets you MOST quickly identify which of your models were trained on it?', o: ['A firewall rule that blocks downloads from the dataset’s public repository', 'AI bills of materials recording datasets and lineage for each model, linked to the inventory', 'An acceptable use policy requiring teams to vet every public dataset before they use it in training', 'Annual penetration testing of the machine learning platform and its training pipelines'], a: 1, b: 3,
      why: 'AIBOMs record which datasets and versions each model used. Querying them, with owners from the inventory, turns the advisory into a targeted response.' } }
  ]
};
