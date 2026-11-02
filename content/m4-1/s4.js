/* 4.1 · Section 4: build vs buy evaluations (hosted vs self-managed) */
module.exports = {
  title: 'Build or buy: hosted and self-managed AI', covers: [4],
  blocks: [
    { type: 'video', title: 'Build, buy or host?', kicker: 'Module 4.1 · Video 4 of 5', scenes: [
      { t: 'title', kicker: 'Module 4.1 · Secure AI design', title: 'Build, buy or host?', sub: 'Evaluating hosted and self-managed AI', icon: 'building',
        say: 'Should you call a provider’s model API, use a managed platform in your own cloud, or run an open-weight model yourself? Each answer moves security responsibilities around. | This video covers build-versus-buy evaluation for AI, focusing on the choice between hosted and self-managed models.' },
      { t: 'layers', title: 'The deployment spectrum',
        layers: [
          { icon: 'cloud', label: 'AI-enabled SaaS', sub: 'You configure; the vendor runs everything', k: 'neutral' },
          { icon: 'plug', label: 'Hosted model API', sub: 'You own prompts, data flows and integration', k: 'data' },
          { icon: 'server', label: 'Managed platform in your cloud', sub: 'Private networking, your keys, provider’s models', k: 'model' },
          { icon: 'gpu', label: 'Self-managed open weights', sub: 'You run serving, patching, scaling and protection', k: 'human' },
          { icon: 'pipeline', label: 'Train your own', sub: 'You own data, training, evaluation and the rest', k: 'threat' } ],
        say: 'AI capability comes in a spectrum of options. | At one end, AI-enabled software as a service: you configure it, and the vendor runs everything. | A hosted model API: the provider runs the model, and you own your prompts, data flows and integration. | A managed model platform inside your own cloud tenant, with private networking and your own keys, running the provider’s models. | Self-managed open-weight models: you run the serving, patching, scaling and protection of the weights yourself. | And at the far end, training your own model, where you own the data, the training, the evaluation and everything else.' },
      { t: 'compare', title: 'Hosted and self-managed models', labels: ['Data control', 'Security work', 'Time to start', 'Cost profile', 'Model choice'],
        cols: [{ h: 'Hosted', icon: 'cloud', k: 'data' }, { h: 'Self-managed', icon: 'server', k: 'human' }],
        rows: [
          ['Through contract and settings', 'Stays in your environment'],
          ['Mostly the provider’s', 'Mostly yours'],
          ['Days', 'Weeks to months'],
          ['Pay per token', 'GPUs and staff, mostly fixed'],
          ['The provider’s models', 'Open-weight models'] ],
        say: 'The two main options differ in five ways. | With a hosted model, you control data mainly through contract terms and settings. With a self-managed model, data stays in your own environment. | With hosted, most of the security work on the model and serving stack is the provider’s. With self-managed, it is yours. | Hosted can start in days. Self-managed usually takes weeks or months. | Hosted is pay-per-token. Self-managed means GPUs and skilled staff, which are mostly fixed costs. | And hosted gives you the provider’s models, often the most capable, while self-managed limits you to open-weight models.' },
      { t: 'bullets', title: 'What to evaluate', layout: 'grid', cols: 2, items: [
          { icon: 'globe', h: 'Data sensitivity and residency', d: 'Can this data leave, and to where?', k: 'data' },
          { icon: 'gavel', h: 'Regulatory role', d: 'Deployer, or provider?', k: 'human' },
          { icon: 'users', h: 'Skills and operating load', d: 'Can you run it securely?', k: 'neutral' },
          { icon: 'money', h: 'Total cost of ownership', d: 'Tokens versus GPUs and staff', k: 'control' },
          { icon: 'split', h: 'Lock-in and exit', d: 'Can you switch later?', k: 'model' },
          { icon: 'search', h: 'Assurance and transparency', d: 'What can you verify?', k: 'threat' } ],
        say: 'Six criteria drive the evaluation. | Data sensitivity and residency: can this data leave your environment, and to which countries? | Your regulatory role: building, modifying or rebranding a system can turn you from a deployer into a provider, with heavier obligations. | Skills and operating load: can you actually run a model platform securely, around the clock? | Total cost of ownership: token charges versus GPUs, staff and tooling. | Lock-in and exit: how hard would it be to switch providers or models later? | And assurance: what can you verify about the model and its operation, through documentation, audits or your own testing?' },
      { t: 'flow', title: 'A simple decision path',
        nodes: [
          { id: 'q1', x: 300, y: 330, icon: 'globe', label: 'May the data leave your environment?', k: 'neutral', w: 380, ls: 34 },
          { id: 'q2', x: 860, y: 330, icon: 'doc', label: 'Do vendor terms and assurance meet your needs?', k: 'neutral', w: 400, ls: 34 },
          { id: 'host', x: 1330, y: 330, icon: 'cloud', label: 'Hosted API or managed platform', k: 'control', w: 300, ls: 34 },
          { id: 'self', x: 300, y: 700, icon: 'server', label: 'Self-managed or private deployment', k: 'human', w: 380, ls: 34 },
          { id: 'neg', x: 860, y: 700, icon: 'gavel', label: 'Negotiate terms, or self-manage', k: 'threat', w: 380, ls: 34 } ],
        edges: [{ from: 'q1', to: 'q2', k: 'control', label: 'Yes' }, { from: 'q1', to: 'self', k: 'human', label: 'No' }, { from: 'q2', to: 'host', k: 'control', label: 'Yes' }, { from: 'q2', to: 'neg', k: 'threat', label: 'No' }],
        steps: [
          { show: 'q1', hi: 'q1' },
          { show: 'self q1-self', flow: 'q1-self', hi: 'self' },
          { show: 'q2 q1-q2', flow: 'q1-q2', hi: 'q2' },
          { show: 'host q2-host', flow: 'q2-host', hi: 'host', mark: { host: 'ok' } },
          { show: 'neg q2-neg', flow: 'q2-neg', hi: 'neg' } ],
        say: 'A simple decision path captures the logic. First: may this data leave your environment at all? | If not, you need a self-managed model, or a private deployment that keeps data inside your boundary. | If it may, ask whether the vendor’s terms and assurance meet your requirements: data use, retention, location, security and incident notification. | If they do, a hosted API or a managed platform is usually the fastest, safest choice. | If they don’t, negotiate better terms, or fall back to self-managing. Either way, the decision and its reasons belong in the risk record.' },
      { t: 'summary', items: ['Options range from SaaS to training your own model', 'Hosted: speed, less operating work, control through contract', 'Self-managed: data control, but you own the security work', 'Decide on data, role, skills, cost, exit and assurance'],
        say: 'To recap. | AI options range from software as a service to training your own model. | Hosted models offer speed and less operating work, with control exercised through contracts and settings. | Self-managed models keep data under your control, but make the security work yours. | And the decision should rest on data sensitivity, regulatory role, skills, total cost, exit options and assurance.' } ] },
    { type: 'text', md: `### Responsibilities across the options
| Option | You are responsible for | The supplier is responsible for |
|---|---|---|
| **AI-enabled SaaS** | Configuration, user access, data you put in, acceptable use | Application, model, infrastructure, most security controls |
| **Hosted model API** | Prompts, integration, data flows, output handling, keys, usage controls | Model, serving, infrastructure, provider-side safety systems |
| **Managed platform in your cloud** | Network configuration, identities, keys, data, application controls | Model, managed serving, platform security |
| **Self-managed open weights** | Model selection and verification, serving stack, patching, scaling, weight protection, evaluation | Cloud or hardware layers only (if hosted on IaaS) |
| **Train your own** | Everything above, plus data sourcing, training security and full lifecycle governance | Infrastructure only |

Module 2.5 covers shared responsibility and vendor due diligence in detail.

### Evaluation criteria
- **Data sensitivity and residency:** classification, legal restrictions (special category data, export controls), regional processing, retention and training use by the provider, availability of zero-data-retention terms.
- **Regulatory role:** under the EU AI Act, a deployer becomes the **provider** of a high-risk system if it puts its name or trademark on the system, makes a substantial modification, or changes its intended purpose so that it becomes high-risk (Article 25). Modifying a general-purpose model can also bring provider obligations for the modified model.
- **Security capability:** self-managing means patching inference servers and dependencies, isolating GPUs, protecting weights (Module 3.6), handling availability and running evaluations. Be honest about skills and 24/7 coverage.
- **Total cost of ownership:** token prices against GPU capacity (and its utilisation), staff, MLOps and security tooling, evaluation and compliance work.
- **Capability and fit:** proprietary hosted models are often the most capable; open-weight models can be fine-tuned and inspected more freely.
- **Lock-in and exit:** proprietary APIs, fine-tunes that can’t be exported, and data formats; an abstraction layer and pre-approved alternatives keep options open.
- **Assurance:** documentation, certifications (such as ISO/IEC 42001 and SOC 2), audit rights, evaluation access and transparency about changes.

### Hybrid patterns
Many organisations combine options. An **AI gateway** can route requests by data classification: sensitive requests to a self-managed or private model, general requests to a hosted API, with consistent logging, DLP and quotas across both. Routing must be policy-driven and tested, so sensitive data can’t fall through to the wrong destination.

### Build vs buy for the application layer
The same reasoning applies to guardrails, vector databases and orchestration frameworks. Buying gives speed and maturity; building gives control but creates code you must secure and maintain. Evaluate open-source components as part of the supply chain (Module 3.7).` },
    { type: 'callout', kind: 'exam', title: 'Build or buy questions', md: `Look for the answer that starts from **data sensitivity and requirements**, not from technology preference. If data must not leave the organisation and vendor terms can’t fix that, self-managed or private deployment is right. If speed matters and terms are acceptable, hosted is usually better, because it moves operating work to a specialist provider. Either way, **accountability for the use stays with you**.` },
    { type: 'check', q: { q: 'A hospital wants an AI tool to summarise clinical notes. Its rules forbid patient data leaving its own environment, and no vendor offers acceptable terms. Which option fits BEST?', o: ['A public chatbot, with clinicians carefully removing patients’ names before they paste in the notes', 'A self-managed open-weight model in the hospital’s environment, with its security work resourced', 'A hosted model API, provided each patient gives consent to the processing beforehand', 'Training a new language model from scratch on the hospital’s own clinical notes'], a: 1, b: 4,
      why: 'Keeping data in the hospital’s environment rules out external services under current terms, so a self-managed model is the fit, provided the hospital resources its security and operation. Manual redaction is unreliable, consent doesn’t override the hospital’s rules, and training from scratch is disproportionate.' } }
  ]
};
