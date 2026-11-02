/* 6.2 · Section 2: environmental control adaptations (separation, PoLP, secure API integration) */
module.exports = {
  title: 'Adapting environmental controls for AI', covers: [2],
  blocks: [
    { type: 'video', title: 'Keeping AI environments apart', kicker: 'Module 6.2 · Video 2 of 4', scenes: [
      { t: 'title', kicker: 'Module 6.2 · Secure AI lifecycle', title: 'Keeping AI environments apart', sub: 'Separation, least privilege and secure API integration', icon: 'layers',
        say: 'AI development is messy by nature: notebooks, experiments, shared GPU clusters and copies of data everywhere. Without clear environmental controls, experiments leak into production and production data leaks into experiments. | This video covers adapting environmental controls for AI: separation, least privilege and secure API integration.' },
      { t: 'flow', title: 'Separated AI environments',
        nodes: [
          { id: 'lab', x: 230, y: 330, icon: 'bulb', label: 'Research sandbox', sub: 'synthetic or masked data', k: 'neutral', w: 330 },
          { id: 'dev', x: 700, y: 330, icon: 'code', label: 'Development', sub: 'no production secrets', k: 'data', w: 300 },
          { id: 'trn', x: 1200, y: 330, icon: 'gpu', label: 'Training', sub: 'isolated, approved data', k: 'model', w: 300 },
          { id: 'reg', x: 1200, y: 690, icon: 'book', label: 'Registry', sub: 'signed versions only', k: 'human', w: 300 },
          { id: 'stg', x: 700, y: 690, icon: 'check', label: 'Staging', sub: 'production-like tests', k: 'control', w: 300 },
          { id: 'prd', x: 230, y: 690, icon: 'server', label: 'Production', sub: 'pipeline-only changes', k: 'threat', w: 300 } ],
        edges: [{ from: 'lab', to: 'dev', k: 'neutral' }, { from: 'dev', to: 'trn', k: 'data' }, { from: 'trn', to: 'reg', k: 'model' }, { from: 'reg', to: 'stg', k: 'human' }, { from: 'stg', to: 'prd', k: 'control' }],
        steps: [
          { show: 'lab', hi: 'lab' },
          { show: 'dev lab-dev', flow: 'lab-dev', hi: 'dev' },
          { show: 'trn dev-trn', flow: 'dev-trn', hi: 'trn' },
          { show: 'reg trn-reg', flow: 'trn-reg', hi: 'reg', mark: { reg: 'lock' } },
          { show: 'stg reg-stg', flow: 'reg-stg', hi: 'stg' },
          { show: 'prd stg-prd', flow: 'stg-prd', hi: 'prd', mark: { prd: 'ok' } } ],
        say: 'Separate AI work into distinct environments. A research sandbox for exploration, using synthetic or masked data rather than raw production data. | Development, with no access to production secrets or systems. | Training, in isolated environments that only use approved, versioned datasets. | The model registry is the controlled bridge: only registered, signed versions move onwards, so everything later can be traced and verified. | Staging, where production-like tests and evaluations run on the registered version. | And production, where changes arrive only through the pipeline, never by hand.' },
      { t: 'bullets', title: 'Least privilege in AI environments', layout: 'grid', cols: 2, items: [
          { icon: 'book', h: 'Notebooks', d: 'Authenticated, no shared admin', k: 'data' },
          { icon: 'gpu', h: 'GPU clusters', d: 'Per-project access and quotas', k: 'neutral' },
          { icon: 'pen', h: 'Registry write access', d: 'Pipelines only; humans read', k: 'model' },
          { icon: 'database', h: 'Training data', d: 'Approved datasets, just in time', k: 'human' },
          { icon: 'key', h: 'Secrets', d: 'Vaulted, scoped, short-lived', k: 'threat' },
          { icon: 'globe', h: 'Outbound access', d: 'Allow-listed destinations only', k: 'control' } ],
        say: 'Least privilege needs adapting for AI environments. | Notebooks need authentication, and nobody should share an administrator account. Exposed notebook servers are a common route in. | GPU clusters need per-project access and quotas. | Write access to the model registry should belong to pipelines, while people read. | Training data access should cover approved datasets only, granted just in time. | Secrets should be vaulted, scoped and short-lived, never pasted into notebooks. | And outbound network access should be limited to allow-listed destinations, so a compromised job can’t send data anywhere.' },
      { t: 'compare', title: 'Integrating with AI APIs securely', labels: ['Identity', 'Network', 'Data', 'Abuse'],
        cols: [{ h: 'Risky pattern', icon: 'alert', k: 'threat' }, { h: 'Secure pattern', icon: 'shieldcheck', k: 'control' }],
        rows: [
          ['One shared key in code', 'Per-service, scoped, rotated credentials'],
          ['Public internet, any egress', 'Private endpoints, egress allow-lists'],
          ['Everything sent, anything kept', 'Minimised data; agreed retention'],
          ['No limits on calls', 'Quotas, timeouts, schema validation'] ],
        say: 'Integrations with model providers, tools and data APIs need care. | The risky pattern is one shared key embedded in code. The secure pattern is per-service, scoped credentials that are rotated, ideally short-lived tokens. | Risky: calls over the public internet, from hosts that can reach anywhere. Secure: private endpoints where available, and egress allow-lists. | Risky: sending everything, with no agreement on what the provider keeps. Secure: minimised data and contractually agreed retention. | And risky: unlimited calls. Secure: quotas, time-outs and validation of every response against an expected schema.' },
      { t: 'bullets', title: 'AI-specific environment risks', layout: 'grid', cols: 2, items: [
          { icon: 'globe', h: 'Exposed notebooks and dashboards', d: 'Found by internet scanners', k: 'threat' },
          { icon: 'copy', h: 'Production data in dev', d: 'Copies outside controls', k: 'data' },
          { icon: 'box', h: 'Unsafe model files', d: 'Code that runs on load', k: 'model' },
          { icon: 'code', h: 'Code-executing agents', d: 'Need sandboxes', k: 'human' },
          { icon: 'network', h: 'Shared GPU tenancy', d: 'Leakage between workloads', k: 'neutral' },
          { icon: 'key', h: 'Keys in notebooks', d: 'Committed or shared by mistake', k: 'control' } ],
        say: 'Six risks are especially common in AI environments. | Exposed notebook servers and experiment dashboards, which internet scanners find quickly. | Copies of production data in development, outside production’s controls. | Unsafe model files from public hubs, which can run code when loaded. | Code-executing agents, which need sandboxes with no access to secrets or internal networks. | Shared GPU tenancy, where workloads must be isolated from each other. | And keys pasted into notebooks, then committed to repositories or shared by mistake.' },
      { t: 'timeline', title: 'How an exposed notebook becomes a breach', events: [
          { y: 'Hour 0', h: 'Server exposed', d: 'Notebook opened to the internet, no login' },
          { y: 'Hour 3', h: 'Found by scanners', d: 'Automated tools index it' },
          { y: 'Hour 4', h: 'Code runs', d: 'Attacker uses the notebook terminal' },
          { y: 'Hour 5', h: 'Keys harvested', d: 'Cloud credentials in cells and variables' },
          { y: 'Day 3', h: 'Detected', d: 'GPU bill spikes; data already copied' } ],
        say: 'Here is a pattern seen repeatedly in real incidents. | A researcher opens a notebook server to the internet for convenience, with no login required. | Within hours, automated scanners find it. | An attacker uses the notebook’s built-in terminal to run code on the server. | They harvest cloud credentials left in notebook cells and environment variables, and use them to reach data and other systems. | The breach is noticed days later, when the GPU bill spikes from cryptocurrency mining. By then, the data has already been copied.' },
      { t: 'summary', items: ['Separate research, dev, training, staging and production', 'Move models only through the registry and pipeline', 'Least privilege for notebooks, GPUs, registries, data, secrets, egress', 'Secure API integration: scoped credentials, private paths, limits'],
        say: 'To recap. | Separate research, development, training, staging and production environments. | Move models between them only through the registry and the pipeline. | Apply least privilege to notebooks, GPU clusters, registries, data, secrets and outbound access. | And integrate with AI APIs using scoped credentials, private network paths, minimised data and strict limits.' } ] },
    { type: 'text', md: `### Environment separation for AI
| Environment | Purpose | Key controls |
|---|---|---|
| **Research sandbox** | Exploration and prototyping | Synthetic, sampled or masked data; no production credentials; egress controls; time-limited |
| **Development** | Building pipelines, agents and applications | Code in version control; secrets from a vault; no production data or systems |
| **Training** | Producing models from approved data | Isolated compute; approved, versioned datasets; pinned dependencies; lineage capture (Module 4.3) |
| **Staging** | Production-like testing and evaluation | Same configuration as production; evaluation and security gates; test data |
| **Production** | Serving users | Changes only through the pipeline; signed artefacts; monitoring; break-glass access only (Module 5.1) |

The **model registry** is the controlled bridge: models move from training to staging to production only as registered, signed and approved versions (Module 3.5).

### Least privilege, adapted
- **Notebooks and workbenches:** authenticated access, no shared administrator accounts, no inbound exposure to the internet, idle shutdown, and secrets injected at runtime rather than written in cells.
- **Compute:** per-project GPU access and quotas; isolation between tenants and workloads; ephemeral training jobs with their own identities.
- **Registries and artefact stores:** pipeline identities write; people read; promotion requires approval.
- **Data:** access to approved datasets only, granted just in time and logged; production personal data stays in production unless a documented, approved exception applies (Module 3.4).
- **Egress:** allow-lists for package registries, model hubs and provider endpoints; block everything else by default.

### Secure API integration
- **Credentials:** per-service, least-privilege keys or, better, short-lived tokens from workload identity federation (Module 4.5); never in code or prompts.
- **Network:** private connectivity to providers where offered; TLS everywhere; mutual TLS for internal services.
- **Data:** minimise what is sent; mask personal data where possible (Module 5.2); agree retention and training use in contracts (Module 2.5).
- **Robustness:** time-outs, retries with limits, circuit breakers, quotas, and validation of responses against schemas, because model and tool outputs are untrusted (Module 3.5).` },
    { type: 'flip', title: 'Environment terms', cards: [
      ['Research sandbox', 'An isolated environment for experiments, using synthetic or masked data and no production credentials.'],
      ['Promotion', 'Moving a registered, approved model version from one environment to the next through the pipeline.'],
      ['Egress allow-list', 'A list of the only external destinations a workload may connect to.'],
      ['Workload identity federation', 'Issuing short-lived credentials to workloads based on their identity, instead of long-lived keys.'],
      ['Private endpoint', 'A connection to a provider’s service over a private network path rather than the public internet.'] ] },
    { type: 'callout', kind: 'exam', title: 'Environment questions', md: `Look for **separated environments** joined only by the **registry and pipeline**, **least privilege** adapted to notebooks, GPU clusters, registries and data, **no production personal data in development** without an approved exception, and **secure API integration** (scoped, short-lived credentials; private paths; egress allow-lists; response validation).` },
    { type: 'check', q: { q: 'Data scientists copy full production customer data into a shared notebook environment to experiment with a new model. What is the BEST alternative?', o: ['Allow it, provided the data scientists sign a confidentiality agreement first', 'Use synthetic or masked data in an isolated sandbox, with exceptions approved', 'Move the experiments directly into production, where the data already lives', 'Delete the notebook environment, and ban experimentation with customer data'], a: 1, b: 2,
      why: 'Synthetic or masked data in an isolated sandbox supports experimentation without spreading production personal data, and any genuine need goes through an approved exception. Agreements don’t reduce exposure, experimenting in production is risky, and banning experimentation blocks legitimate work.' } }
  ]
};
