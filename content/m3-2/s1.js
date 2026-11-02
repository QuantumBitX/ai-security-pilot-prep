/* 3.2 · Section 1: Privacy by Design for AI */
module.exports = {
  title: 'Privacy by Design for AI systems', covers: [1],
  blocks: [
    { type: 'video', title: 'Privacy built in, not bolted on', kicker: 'Module 3.2 · Video 1 of 5', scenes: [
      { t: 'title', kicker: 'Module 3.2 · Privacy controls', title: 'Privacy built in, not bolted on', sub: 'Privacy by Design principles applied to AI', icon: 'lock',
        say: 'Privacy is cheapest and most effective when it is designed in from the start. Retrofitting it to a trained model is expensive, and sometimes impossible. | This video covers the Privacy by Design principles and how to apply them to AI systems, from purpose and consent to minimisation and privacy-friendly architecture.' },
      { t: 'bullets', title: 'Seven foundational principles', layout: 'grid', cols: 2, items: [
          { icon: 'bolt', h: 'Proactive, not reactive', d: 'Prevent privacy harms before they happen', k: 'control' },
          { icon: 'lock', h: 'Privacy as the default', d: 'Protected without the user doing anything', k: 'data' },
          { icon: 'layers', h: 'Embedded into design', d: 'Part of the architecture, not an add-on', k: 'model' },
          { icon: 'scale', h: 'Full functionality', d: 'Positive-sum: privacy and utility together', k: 'human' },
          { icon: 'shield', h: 'End-to-end security', d: 'Protection across the whole lifecycle', k: 'threat' },
          { icon: 'eye', h: 'Visibility and transparency', d: 'Practices open to verification', k: 'neutral' },
          { icon: 'user', h: 'Respect for the user', d: 'User-centric choices and controls', k: 'human' } ],
        say: 'Privacy by Design rests on seven foundational principles, first set out by Ann Cavoukian. | Be proactive, not reactive: prevent privacy harms before they happen. | Make privacy the default: people are protected without having to do anything. | Embed privacy into the design and architecture, rather than adding it afterwards. | Aim for full functionality: privacy and usefulness together, not a trade where one side loses. | Provide end-to-end security across the whole data lifecycle. | Keep practices visible and transparent, so they can be verified. | And respect the user, with user-centric defaults, notices and controls. The GDPR turned the idea into law as data protection by design and by default.' },
      { t: 'flow', title: 'Privacy decisions at design time',
        nodes: [
          { id: 'pur', x: 210, y: 330, icon: 'target', label: 'Purpose', sub: 'specific and documented', k: 'human', w: 270 },
          { id: 'law', x: 590, y: 330, icon: 'scale', label: 'Lawful basis', sub: 'consent or another basis', k: 'data', w: 280 },
          { id: 'min', x: 980, y: 330, icon: 'filter', label: 'Minimise', sub: 'fields, records, retention', k: 'control', w: 280 },
          { id: 'arch', x: 1360, y: 330, icon: 'layers', label: 'Architecture', sub: 'keep data out of weights', k: 'model', w: 280 },
          { id: 'def', x: 1360, y: 690, icon: 'lock', label: 'Defaults', sub: 'opt-in, short retention', k: 'neutral', w: 280 },
          { id: 'tr', x: 970, y: 690, icon: 'eye', label: 'Transparency', sub: 'notices and controls', k: 'human', w: 280 } ],
        edges: [{ from: 'pur', to: 'law', k: 'human' }, { from: 'law', to: 'min', k: 'data' }, { from: 'min', to: 'arch', k: 'control' }, { from: 'arch', to: 'def', k: 'model' }, { from: 'def', to: 'tr', k: 'neutral' }],
        steps: [
          { show: 'pur', hi: 'pur' },
          { show: 'law pur-law', flow: 'pur-law', hi: 'law' },
          { show: 'min law-min', flow: 'law-min', hi: 'min' },
          { show: 'arch min-arch', flow: 'min-arch', hi: 'arch' },
          { show: 'def arch-def', flow: 'arch-def', hi: 'def' },
          { show: 'tr def-tr', flow: 'def-tr', hi: 'tr' } ],
        say: 'Applied to AI, Privacy by Design is a sequence of design decisions. Start with a specific, documented purpose. A vague purpose such as improving our services justifies nothing. | Choose a lawful basis for each processing activity, whether consent or another basis, and record why. | Minimise: only the fields, records and retention the purpose genuinely needs. | Choose an architecture that limits exposure. For example, retrieval keeps personal data in a deletable index, rather than baking it into model weights through fine-tuning. | Set protective defaults, such as opting in to training rather than opting out, and short retention of prompts. | And be transparent, with clear notices and controls people can actually use.' },
      { t: 'compare', title: 'Purpose limitation in practice', labels: ['Original purpose', 'Proposed AI use', 'Verdict'],
        cols: [{ h: 'Compatible', icon: 'check', k: 'control' }, { h: 'Needs a new basis', icon: 'alert', k: 'threat' }],
        rows: [
          ['Handling customer support requests', 'Handling customer support requests'],
          ['AI that drafts replies to the same requests', 'Training a marketing-propensity model'],
          ['Likely compatible, with transparency', 'New purpose: assess, inform, possibly consent'] ],
        say: 'Purpose limitation is where many AI projects go wrong. | Imagine data collected to handle customer support requests. | Using it in an AI tool that drafts replies to those same requests is closely related to the original purpose. Using it to train a marketing model that predicts who will buy more is not. | The first is likely compatible, provided people are informed. The second is a new purpose: it needs its own assessment, clear information to customers, and possibly consent.' },
      { t: 'bullets', title: 'Privacy-friendly AI architectures', items: [
          { icon: 'search', h: 'Retrieve, don’t memorise', d: 'Keep personal data in deletable indexes, not weights', k: 'data' },
          { icon: 'phone', h: 'Process locally', d: 'On-device or on-premises models for sensitive data', k: 'model' },
          { icon: 'network', h: 'Federated learning', d: 'Train where the data lives; share only updates', k: 'control' },
          { icon: 'filter', h: 'Redact before the model', d: 'Strip identifiers from prompts and logs', k: 'human' } ],
        say: 'Architecture choices can reduce privacy risk dramatically. | Retrieve rather than memorise: keep personal data in a permission-filtered, deletable index, instead of training it into weights. | Process locally: on-device or on-premises models avoid sending sensitive data to third parties. | Federated learning trains models where the data lives, sharing only model updates, which should themselves be protected with secure aggregation and differential privacy. | And redact before the model: strip identifiers from prompts and logs when the task doesn’t need them.' },
      { t: 'summary', items: ['Proactive, default, embedded, positive-sum, secure, visible, user-centric', 'Specific purpose and lawful basis before any data moves', 'Minimise fields, records and retention', 'Prefer architectures that keep personal data out of weights'],
        say: 'To recap. | Privacy by Design means being proactive, protective by default, embedded, positive-sum, secure end to end, transparent and user-centric. | Set a specific purpose and lawful basis before any data moves. | Minimise fields, records and retention. | And prefer architectures that keep personal data out of model weights and away from unnecessary parties.' } ] },
    { type: 'text', md: `### Privacy by Design and by default
**Privacy by Design** was articulated by Ann Cavoukian as seven foundational principles: proactive not reactive; privacy as the default setting; privacy embedded into design; full functionality (positive-sum, not zero-sum); end-to-end security across the lifecycle; visibility and transparency; and respect for user privacy. **ISO 31700-1:2023** turned the concept into a consumer-focused standard, and the GDPR made it a legal duty in **Article 25: data protection by design and by default**, requiring appropriate technical and organisational measures (such as pseudonymisation and minimisation) at the time of design, and by default processing only the personal data necessary for each specific purpose.

### Core principles applied to AI
| Principle | What it means for AI | Example controls |
|---|---|---|
| **Purpose limitation** | Collect for specified, explicit, legitimate purposes; don’t reuse incompatibly | Documented purpose per dataset and model; compatibility assessment before reuse; owner approval of new purposes |
| **Lawful basis** | Every processing activity, including training, needs a basis | Basis recorded per activity; legitimate interests assessments; consent records where consent is used |
| **Consent** | Where consent is the basis, it must be freely given, specific, informed, unambiguous and withdrawable | Separate consent for AI training; consent status carried with data; withdrawal honoured downstream |
| **Data minimisation** | Adequate, relevant and limited to what is necessary | Feature selection; dropping identifiers; aggregation; sampling; short retention for prompts and logs |
| **Accuracy** | Personal data must be accurate and kept up to date | Correcting training data and indexes; controls on model outputs about individuals |
| **Storage limitation** | Keep no longer than necessary | Retention schedules for datasets, prompts, logs and models |
| **Integrity and confidentiality** | Appropriate security | Encryption, access control, isolation, monitoring |

### Privacy-friendly design patterns
- **Retrieval over fine-tuning for personal data:** data in an index can be access-controlled, corrected and deleted; data in weights is hard to remove.
- **Edge and on-premises inference** for highly sensitive data.
- **Federated learning:** models are trained across devices or organisations without centralising raw data. Updates can still leak information, so combine with **secure aggregation** and **differential privacy**.
- **Redaction and pseudonymisation** of prompts, logs and training data where identities aren’t needed.
- **Privacy-preserving computation:** secure multi-party computation, homomorphic encryption and confidential computing (Module 2.5) for collaborative or outsourced processing.
- **Protective defaults:** opt-in for training use, minimal retention, conversation history off by default for sensitive tools, and clear controls.

### Embedding privacy in the AI lifecycle
Privacy requirements should appear at each lifecycle gate: a privacy review at design (purpose, basis, data inventory), an SDIA and DPIA before data is used, privacy testing before deployment (leakage and memorisation tests, output checks), and monitoring and periodic review in operation. The data protection officer should be consulted on high-risk processing, and their advice recorded.`, },
    { type: 'match', title: 'Match the control to the principle', pairs: [
      ['Training on aggregated counts instead of individual records', 'Data minimisation'],
      ['Keeping customer support data out of a marketing model', 'Purpose limitation'],
      ['Conversation history switched off by default in a medical assistant', 'Privacy by default'],
      ['Correcting false information about a person in a retrieval index', 'Accuracy'],
      ['Deleting prompt logs after 30 days', 'Storage limitation'] ] },
    { type: 'callout', kind: 'exam', title: 'Design time beats run time', md: `When an exam option adds privacy **at design time** (purpose definition, minimisation, architecture that keeps data out of weights, protective defaults) and another adds it **after deployment** (filtering outputs, apologising for breaches), the design-time control is usually the better answer. That is the essence of Privacy by Design.` },
    { type: 'check', q: { q: 'A team wants its assistant to answer questions about individual customers’ accounts. Which design BEST follows Privacy by Design?', o: ['Fine-tune the model on all customer records, then filter answers so each user sees only their own account', 'Retrieve only the requesting customer’s records at query time, through permission checks, with minimal logging', 'Load the whole customer database into the system prompt, encrypted at rest, and instruct the model to be discreet', 'Copy every account into a shared vector index and have staff review a sample of answers each week'], a: 1, b: 1,
      why: 'Query-time retrieval with access checks minimises exposure, keeps data deletable and correctable, and limits processing to what each request needs. Fine-tuning would bake personal data into weights.' } }
  ]
};
