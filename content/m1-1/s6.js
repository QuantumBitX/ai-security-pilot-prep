/* 1.1 · Section 6: security fundamentals for AI systems */
module.exports = {
  title: 'Security fundamentals for AI systems', covers: [1],
  blocks: [
    { type: 'video', title: 'Why AI security is different', kicker: 'Module 1.1 · Video 6 of 7', scenes: [
      { t: 'title', kicker: 'Module 1.1 · Security fundamentals', title: 'Why AI security is different', sub: 'Old principles, new attack surface', icon: 'shieldcheck',
        say: 'You already know how to secure systems. | This video shows what changes when the system learns from data, speaks natural language, and can take actions.' },
      { t: 'compare', title: 'Traditional software and AI systems', cols: [{ h: 'Traditional software', icon: 'code', k: 'neutral' }, { h: 'AI system', icon: 'model', k: 'model' }],
        labels: ['Behaviour', 'Inputs', 'Failure', 'Change'], rows: [
          ['Defined by code people wrote', 'Learned from data; probabilistic'],
          ['Structured and validated', 'Natural language, images, any content'],
          ['Errors you can usually trace', 'Plausible but wrong, and hard to explain'],
          ['Changes when new code ships', 'Drifts as data and usage change'] ],
        say: 'Four differences change how we secure AI. | Traditional software behaves the way its code says. An AI system’s behaviour is learned from data, and it is probabilistic, so the same input can produce different outputs. | Traditional inputs are structured and validated. AI systems accept natural language, images, documents, almost anything. | When traditional software fails, you can usually trace the error. AI can fail with a confident, plausible answer that is simply wrong. | And traditional software changes when new code ships. AI behaviour drifts as data and usage change, even when nobody touches the code.' },
      { t: 'flow', title: 'The attack surface follows the lifecycle',
        nodes: [
          { id: 'data', x: 250, y: 360, icon: 'database', label: 'Training data', k: 'data', w: 280 },
          { id: 'train', x: 650, y: 360, icon: 'pipeline', label: 'Training pipeline', k: 'neutral', w: 290 },
          { id: 'reg', x: 1050, y: 360, icon: 'box', label: 'Stored model', k: 'model', w: 280 },
          { id: 'api', x: 1385, y: 560, icon: 'plug', label: 'Inference API', k: 'neutral', w: 230 },
          { id: 'app', x: 1050, y: 735, icon: 'robot', label: 'App, tools and agents', k: 'neutral', w: 300 },
          { id: 'user', x: 650, y: 735, icon: 'users', label: 'Users and outputs', k: 'human', w: 280 } ],
        edges: [{ from: 'data', to: 'train', k: 'data' }, { from: 'train', to: 'reg', k: 'model' }, { from: 'reg', to: 'api', k: 'model' }, { from: 'api', to: 'app', k: 'neutral' }, { from: 'app', to: 'user', k: 'neutral' }],
        steps: [
          { show: 'data train reg api app user data-train train-reg reg-api api-app app-user' },
          { hi: 'data', mark: { data: 'warn' }, note: { x: 250, y: 470, w: 320, text: 'Poisoning', k: 'threat' } },
          { hi: 'train', mark: { train: 'warn' }, note: { x: 650, y: 470, w: 320, text: 'Pipeline tampering', k: 'threat' } },
          { hi: 'reg', mark: { reg: 'warn' }, note: { x: 1050, y: 470, w: 340, text: 'Theft or substitution', k: 'threat' } },
          { hi: 'api', mark: { api: 'warn' }, note: { x: 1340, y: 196, w: 330, text: 'Extraction, resource exhaustion', k: 'threat' } },
          { hi: 'app', mark: { app: 'warn' }, note: { x: 1050, y: 590, w: 420, text: 'Injected instructions, excessive agency', k: 'threat' } },
          { hi: 'user', mark: { user: 'warn' }, note: { x: 560, y: 590, w: 380, text: 'Sensitive data exposure', k: 'threat' } },
          { flow: 'data-train train-reg reg-api api-app app-user' } ],
        say: 'Security has to follow the whole lifecycle, because every stage can be attacked. | Training data can be poisoned, so the model learns the wrong lessons. | The training pipeline can be tampered with, changing what gets built. | A stored model can be stolen, or swapped for a modified copy. | The inference interface can be abused to extract the model’s behaviour, or to exhaust its resources. | The application around the model can be steered by injected instructions, or given more power than it needs. | And outputs can expose sensitive data to the wrong people. | You will meet each of these again, with the controls that address them, throughout the course.' },
      { t: 'bullets', title: 'The CIA triad, applied to AI', layout: 'grid', cols: 2, items: [
          { icon: 'lock', h: 'Confidentiality', d: 'Training data, model weights, system prompts and outputs', k: 'data' },
          { icon: 'shieldcheck', h: 'Integrity', d: 'Trustworthy data, untampered models, outputs that aren’t manipulated', k: 'control' },
          { icon: 'bolt', h: 'Availability', d: 'Capacity and budget that floods of requests can exhaust', k: 'human' },
          { icon: 'scale', h: 'Beyond the triad', d: 'Safety, fairness, transparency and accountability', k: 'model' } ],
        say: 'The familiar triad still applies, with new assets to protect. | Confidentiality covers training data, model weights, system prompts and outputs, any of which can leak. | Integrity means data you can trust, models nobody has tampered with, and outputs that have not been manipulated. | Availability covers capacity and budget, which floods of heavy requests can exhaust. | And AI adds concerns beyond the triad: safety, fairness, transparency and accountability, which this exam treats as part of the security professional’s job.' },
      { t: 'bullets', title: 'Four references you will use constantly', items: [
          { icon: 'target', h: 'MITRE ATLAS', d: 'A knowledge base of adversary tactics and techniques against AI' },
          { icon: 'list', h: 'OWASP Top 10 for LLM Applications', d: 'The most critical risks in applications built on LLMs' },
          { icon: 'scale', h: 'NIST AI Risk Management Framework', d: 'Govern, Map, Measure and Manage AI risk' },
          { icon: 'building', h: 'ISO/IEC 42001', d: 'A certifiable management system standard for AI' } ],
        say: 'Four references come up again and again. | {MITRE~my-ter} ATLAS catalogues the tactics and techniques adversaries use against AI systems, modelled on the {ATT&CK~attack} framework. | The {OWASP~oh wasp} Top 10 for LLM Applications lists the most critical risks in applications built on large language models, from prompt injection to unbounded consumption. | The NIST AI Risk Management Framework organises AI risk work into four functions: govern, map, measure and manage. | And {ISO/IEC 42001~I S O forty-two thousand and one} defines a certifiable management system for AI, much as {ISO/IEC 27001~twenty-seven thousand and one} does for information security.' },
      { t: 'quiz', q: 'An attacker sends many carefully chosen queries to a deployed model’s API and uses the responses to train a copy of it. Which security property is MOST directly harmed?',
        o: ['Availability', 'Confidentiality', 'Integrity', 'Non-repudiation'], a: 1,
        why: 'The model’s behaviour and the investment behind it are intellectual property. Copying it through queries, known as model extraction, is a confidentiality breach. Heavy querying might also affect availability, but that is a side effect, not the main harm.' },
      { t: 'summary', items: [
          'AI behaviour is learned, probabilistic and drifts over time',
          'Every lifecycle stage, from data to output, is attack surface',
          'Confidentiality, integrity and availability apply, plus safety and fairness',
          'ATLAS, OWASP LLM Top 10, NIST AI RMF and ISO/IEC 42001 frame the field' ],
        say: 'To recap. | AI behaviour is learned, probabilistic, and drifts over time. | Every lifecycle stage, from data to output, is attack surface. | Confidentiality, integrity and availability still apply, alongside safety and fairness. | And ATLAS, the OWASP LLM Top 10, the NIST AI Risk Management Framework and {ISO/IEC 42001~I S O forty-two thousand and one} frame the field.' }
    ] },
    { type: 'text', md: `### What changes when the system learns

Securing AI builds on everything you know about information security, but several properties of AI systems change the work:

- **Behaviour comes from data.** A model’s logic is learned, so whoever influences the training data influences the behaviour. Data effectively becomes code.
- **Outputs are probabilistic.** The same input can yield different outputs, and models can be confidently wrong. Testing can show that failures are rare, but it can’t prove they never happen.
- **Natural language erases the code–data boundary.** Classic injection attacks exploit places where data is interpreted as code. LLMs interpret everything in their context as potential instructions, so the boundary has to be rebuilt with controls around the model.
- **The model is an asset.** Weights encode expensive training and proprietary data. They can be stolen, copied through queries, or replaced with tampered versions.
- **Behaviour drifts.** Models degrade as the world changes, and systems that keep learning can be steered. Security is a continuous lifecycle activity, not a launch gate.
- **Opacity.** Deep models are hard to explain, which complicates incident investigation, audit and accountability.
- **Agency.** AI agents call tools, browse, write files and trigger transactions. Every permission an agent holds is a permission an attacker may borrow.` },
    { type: 'table', title: 'The CIA triad for AI systems', head: ['Property', 'What needs protecting', 'Example threats'], rows: [
      ['Confidentiality', 'Training data, model weights, system prompts, user inputs and outputs', 'Model extraction, model inversion, membership inference, sensitive data in outputs, system prompt leakage'],
      ['Integrity', 'Training and retrieval data, model files, pipelines, outputs', 'Data poisoning, backdoors, tampered models, prompt injection, evasion with adversarial inputs'],
      ['Availability', 'Inference capacity, compute budget, dependent business processes', 'Resource and token exhaustion, denial of wallet, sponge inputs that maximise computation'] ] },
    { type: 'accordion', title: 'The threat names you will meet, in one line each', items: [
      ['Data poisoning', `Corrupting training or fine-tuning data so the model learns harmful or attacker-chosen behaviour. *Integrity.*`],
      ['Backdoor (trojan)', `A hidden behaviour planted during training that activates only when a specific trigger appears in the input. *Integrity.*`],
      ['Evasion (adversarial examples)', `Inputs modified, often imperceptibly, to make a model misclassify them at inference time. *Integrity.*`],
      ['Model extraction', `Reproducing a model’s functionality by querying it and training a copy on the answers. *Confidentiality.*`],
      ['Model inversion and membership inference', `Using a model’s outputs to reconstruct sensitive training data, or to learn whether a particular record was in the training set. *Confidentiality and privacy.*`],
      ['Prompt injection', `Instructions placed in a model’s input, directly by a user or indirectly through content the model reads, that override the developer’s intended behaviour. *Integrity.*`],
      ['Excessive agency', `An AI system granted more functionality, permissions or autonomy than it needs, so a manipulated model can do real damage. *All three.*`],
      ['Resource exhaustion', `Inputs or request volumes that consume disproportionate compute, tokens or money. *Availability.*`] ] },
    { type: 'text', md: `### Trustworthy AI

The NIST AI Risk Management Framework describes seven characteristics of trustworthy AI. Security professionals are expected to help achieve all of them, not only the security one:

1. **Valid and reliable**: performs as intended, consistently.
2. **Safe**: does not endanger people, property or the environment.
3. **Secure and resilient**: withstands attacks and recovers from them.
4. **Accountable and transparent**: responsibilities are clear and information about the system is available.
5. **Explainable and interpretable**: its outputs and how it works can be understood appropriately.
6. **Privacy-enhanced**: protects people’s autonomy and data.
7. **Fair, with harmful bias managed**: does not produce unjust outcomes for individuals or groups.

These characteristics trade off against each other. More explainability can mean a simpler, less accurate model. Stronger privacy protections can reduce accuracy. Managing those trade-offs is a governance decision, covered in Domain 2.

### The reference frameworks

- **MITRE ATLAS** (Adversarial Threat Landscape for Artificial-Intelligence Systems) is a knowledge base of adversary tactics, techniques and real-world case studies against AI-enabled systems, structured like MITRE ATT&CK. Use it for threat modelling and to describe findings in a shared vocabulary.
- **OWASP Top 10 for LLM Applications** ranks the most critical security risks for applications built on LLMs. The 2025 edition is listed in the table below.
- **NIST AI RMF 1.0** organises AI risk management into four functions: **Govern** (culture, policies and accountability), **Map** (context and risks), **Measure** (analysis, assessment and tracking) and **Manage** (prioritise and treat risks). NIST also publishes **AI 100-2**, a taxonomy of adversarial machine-learning attacks and mitigations.
- **ISO/IEC 42001** specifies requirements for an AI management system that organisations can be certified against. **ISO/IEC 23894** gives guidance on AI risk management.` },
    { type: 'table', title: 'OWASP Top 10 for LLM Applications (2025)', head: ['ID', 'Risk', 'In short'], rows: [
      ['LLM01', 'Prompt injection', 'Inputs that alter the model’s behaviour in unintended ways, directly or through external content'],
      ['LLM02', 'Sensitive information disclosure', 'Personal, confidential or proprietary data exposed through outputs'],
      ['LLM03', 'Supply chain', 'Compromised models, datasets, libraries or platforms'],
      ['LLM04', 'Data and model poisoning', 'Manipulated pre-training, fine-tuning or embedding data'],
      ['LLM05', 'Improper output handling', 'Model output passed to other systems without validation or encoding'],
      ['LLM06', 'Excessive agency', 'Too much functionality, permission or autonomy'],
      ['LLM07', 'System prompt leakage', 'Sensitive details in system prompts exposed or relied on as a control'],
      ['LLM08', 'Vector and embedding weaknesses', 'Flaws in how embeddings are generated, stored or retrieved'],
      ['LLM09', 'Misinformation', 'False or misleading output that people or systems rely on'],
      ['LLM10', 'Unbounded consumption', 'Uncontrolled resource use leading to denial of service or cost'] ] },
    { type: 'callout', kind: 'remember', title: 'The classics still apply', md: `Defence in depth, least privilege, zero trust, separation of duties and secure by design are just as important for AI. What changes is where they apply: to data pipelines, model registries, retrieval indexes, agent permissions and tool integrations. Domain 4 applies them architecture by architecture.` },
    { type: 'match', title: 'Match the threat to the property it harms most', pairs: [
      ['Model extraction through repeated queries', 'Confidentiality'],
      ['Poisoned fine-tuning data', 'Integrity'],
      ['Requests that maximise token use', 'Availability'],
      ['A model that disadvantages one group of applicants', 'Fairness'] ] },
    { type: 'check', q: { q: 'Which statement BEST explains why prompt injection is hard to eliminate in LLM applications?', o: ['LLMs are always connected to the internet, so attackers can reach them from anywhere at any time', 'Instructions and data share the same natural-language channel, so the model can’t reliably separate them', 'Prompt injection affects only models that run without encryption, which most deployments still lack', 'LLMs execute code directly on the host operating system, so every prompt is effectively a program'], a: 1, b: 1, why: 'Developer instructions, user input and retrieved content all reach the model as text in one context. Without a hard boundary between instructions and data, defences rely on layered controls around the model rather than a single fix.' } }
  ]
};
