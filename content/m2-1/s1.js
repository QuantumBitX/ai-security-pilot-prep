/* 2.1 · Section 1: the EU AI Act and GDPR */
module.exports = {
  title: 'The legal landscape: the EU AI Act and GDPR', covers: [1],
  blocks: [
    { type: 'video', title: 'The rulebook for AI', kicker: 'Module 2.1 · Video 1 of 4', scenes: [
      { t: 'title', kicker: 'Module 2.1 · AI governance', title: 'The rulebook for AI', sub: 'The EU AI Act, GDPR, and why they reach far beyond Europe', icon: 'gavel',
        say: 'Before an organisation can govern AI, it needs to know which rules apply. | This video introduces the two laws you are most likely to meet: the EU AI Act and the GDPR, and explains how they differ from frameworks and standards.' },
      { t: 'compare', title: 'Laws, frameworks and standards', labels: ['Binding?', 'Purpose', 'Evidence'],
        cols: [{ h: 'Laws', icon: 'gavel', k: 'threat' }, { h: 'Frameworks', icon: 'compass', k: 'data' }, { h: 'Standards', icon: 'audit', k: 'control' }],
        rows: [
          ['Yes, enforced with fines', 'No, voluntary guidance', 'Voluntary; some are certifiable'],
          ['Set legal duties', 'Structure how you manage risk', 'Define an auditable system'],
          ['Records, assessments, registrations', 'Profiles and documented actions', 'Certification audit reports'] ],
        say: 'Governance draws on three kinds of source. | Laws, such as the EU AI Act and the GDPR, are binding and enforced with fines. Frameworks, such as the NIST AI Risk Management Framework, are voluntary guidance. Standards, such as ISO/IEC 42001, are voluntary, but some can be certified by an independent auditor. | Laws set legal duties. Frameworks give you a structured way to manage risk. Management system standards define a system that an auditor can check. | And each produces different evidence: records and registrations for regulators, documented profiles for frameworks, and audit reports for certification.' },
      { t: 'layers', title: 'The EU AI Act’s risk tiers',
        layers: [
          { icon: 'stop', label: 'Unacceptable risk: prohibited', sub: 'Social scoring, manipulative AI, untargeted facial scraping', k: 'threat' },
          { icon: 'alert', label: 'High risk: strict requirements', sub: 'Hiring, credit, education, critical infrastructure, safety parts', k: 'human' },
          { icon: 'eye', label: 'Limited risk: transparency', sub: 'Chatbots, deepfakes and generated content must be disclosed', k: 'data' },
          { icon: 'check', label: 'Minimal risk: no new duties', sub: 'Spam filters, game AI, most everyday tools', k: 'control' } ],
        say: 'The EU AI Act regulates AI by risk, in four tiers. | At the top are unacceptable practices, which are banned outright, such as social scoring and untargeted scraping of facial images. | Next come high-risk systems, used in areas like hiring, credit, education, critical infrastructure and product safety. These carry strict requirements. | Limited-risk systems carry transparency duties: people must know when they are talking to a chatbot, and deepfakes and generated content must be disclosed. | Everything else is minimal risk, with no new obligations. Separately, the Act sets duties for providers of general-purpose AI models, with extra duties for the most capable ones.' },
      { t: 'bullets', title: 'Banned outright (Article 5)', layout: 'grid', cols: 2, items: [
          { icon: 'mask', h: 'Manipulation and exploitation', d: 'Subliminal or deceptive techniques; exploiting age or disability', k: 'threat' },
          { icon: 'star', h: 'Social scoring', d: 'Rating people on behaviour, leading to unfair treatment', k: 'threat' },
          { icon: 'search', h: 'Crime prediction by profiling', d: 'Predicting offences from personality traits alone', k: 'threat' },
          { icon: 'image', h: 'Untargeted facial scraping', d: 'Building face databases from the web or CCTV', k: 'threat' },
          { icon: 'eye', h: 'Emotion recognition', d: 'At work or school, except for medical or safety reasons', k: 'threat' },
          { icon: 'fingerprint', h: 'Sensitive biometric uses', d: 'Inferring race or beliefs; real-time police identification', k: 'threat' } ],
        say: 'Article five lists the banned practices. They have applied since February twenty twenty-five. | Manipulative or deceptive techniques that distort behaviour and cause significant harm, and exploiting people’s vulnerabilities, such as age or disability. | Social scoring that leads to detrimental or unjustified treatment. | Predicting that someone will commit a crime based solely on profiling or personality traits. | Building facial recognition databases by untargeted scraping of images from the internet or CCTV. | Emotion recognition in workplaces and schools, except for medical or safety reasons. | And biometric categorisation to infer sensitive traits such as race or religious beliefs, plus real-time remote biometric identification in public spaces for law enforcement, apart from narrow exceptions.' },
      { t: 'compare', title: 'Providers and deployers', labels: ['Who', 'Key duties', 'Watch out'],
        cols: [{ h: 'Provider', icon: 'code', k: 'model' }, { h: 'Deployer', icon: 'building', k: 'human' }],
        rows: [
          ['Develops a system and places it on the market under its name', 'Uses a system under its authority, professionally'],
          ['Risk management, data governance, documentation, logging, conformity assessment', 'Use as instructed, human oversight, monitoring, logs, informing people'],
          ['Duties apply wherever the provider is based', 'Substantial changes can make you the provider'] ],
        say: 'The Act assigns duties by role. | A provider develops an AI system, or has one developed, and places it on the market under its own name. A deployer uses an AI system under its authority in a professional capacity. | Providers of high-risk systems carry most of the burden: risk management, data governance, technical documentation, logging, conformity assessment and post-market monitoring. Deployers must use systems as instructed, assign competent human oversight, monitor operation, keep logs and inform affected people. | Two traps. The Act applies to providers outside the EU when their systems are used in the EU. And a deployer that substantially modifies a high-risk system, or puts its own name on it, becomes its provider.' },
      { t: 'timeline', title: 'When the duties apply', events: [
          { y: 'Aug 2024', h: 'In force', d: 'The Act enters into force' },
          { y: 'Feb 2025', h: 'Bans and literacy', d: 'Prohibitions and AI literacy apply' },
          { y: 'Aug 2025', h: 'General-purpose AI', d: 'Model provider duties and penalties' },
          { y: 'Aug 2026', h: 'Transparency', d: 'Chatbot, deepfake and content marking duties' },
          { y: 'Dec 2027', h: 'High-risk (Annex III)', d: 'Hiring, credit, education and more' },
          { y: 'Aug 2028', h: 'High-risk (Annex I)', d: 'AI in regulated products' } ],
        say: 'The obligations phase in over several years, and the 2026 Digital Omnibus amendment moved some dates. | The Act entered into force in August twenty twenty-four. | Prohibitions and the AI literacy duty have applied since February twenty twenty-five. | Duties for general-purpose AI model providers, and the penalty regime, followed in August twenty twenty-five. | Transparency duties for chatbots, deepfakes and generated content have applied since August twenty twenty-six. | High-risk duties for the Annex three use cases, such as hiring and credit, now apply from December twenty twenty-seven. | And high-risk duties for AI built into regulated products follow in August twenty twenty-eight.' },
      { t: 'bullets', title: 'GDPR still applies to AI', items: [
          { icon: 'scale', h: 'A lawful basis', d: 'Wherever personal data enters training, prompts or outputs', k: 'data' },
          { icon: 'filter', h: 'Purpose limitation and minimisation', d: 'Only what the purpose needs; no silent repurposing', k: 'control' },
          { icon: 'audit', h: 'Impact assessment (DPIA)', d: 'Required when processing is likely to be high risk', k: 'human' },
          { icon: 'users', h: 'People’s rights', d: 'Access, erasure, objection; automated-decision safeguards', k: 'model' },
          { icon: 'siren', h: 'Security and breach notification', d: 'Protect the data; notify the regulator within 72 hours', k: 'threat' } ],
        say: 'The AI Act sits alongside the GDPR, which applies whenever personal data is processed, including inside AI systems. | Every use of personal data needs a lawful basis, whether in training data, fine-tuning, prompts or outputs. | Purpose limitation and data minimisation mean collecting only what the purpose needs, and not quietly reusing data for something new, such as model training. | A data protection impact assessment is required when processing is likely to be high risk, which covers many AI uses. | People keep their rights of access, erasure and objection, and safeguards apply to solely automated decisions with significant effects. | And personal data must be secured, with breaches reported to the regulator within seventy-two hours.' },
      { t: 'summary', items: ['Laws bind; frameworks guide; standards can be certified', 'AI Act: prohibited, high, limited, minimal risk, plus GPAI', 'Providers carry most duties; deployers have their own', 'GDPR applies wherever personal data meets AI'],
        say: 'To recap. | Laws bind, frameworks guide, and management system standards can be certified. | The EU AI Act sorts AI into prohibited, high-risk, limited-risk and minimal-risk uses, with separate duties for general-purpose models. | Providers carry most obligations, but deployers have their own, and can become providers. | And the GDPR applies wherever personal data meets AI.' } ] },
    { type: 'text', md: `### Why start with law?
Governance is the system of decisions, roles and controls that keeps AI use aligned with an organisation’s objectives, values and legal obligations. Its first job is to know which obligations apply. For most organisations that operate in, sell into or process data from Europe, two laws dominate: the **EU AI Act** and the **General Data Protection Regulation (GDPR)**. Both have *extraterritorial* reach, so organisations based elsewhere are often in scope.

### The EU AI Act in brief
The AI Act, Regulation (EU) 2024/1689, is the first comprehensive horizontal law on AI. It entered into force on 1 August 2024 and applies in phases. It takes a **risk-based approach**:

| Tier | Examples | What applies |
|---|---|---|
| **Prohibited** (Article 5) | Social scoring, manipulative techniques, untargeted facial scraping, workplace emotion recognition | Banned |
| **High risk** (Article 6, Annexes I and III) | Safety components of regulated products; biometrics, critical infrastructure, education, employment, access to essential services such as credit, law enforcement, migration, justice | Strict requirements before and after placing on the market |
| **Limited risk** (Article 50) | Chatbots, emotion recognition, deepfakes, AI-generated content | Transparency duties |
| **Minimal risk** | Spam filters, recommendation of video-game moves | No new obligations; voluntary codes encouraged |

**General-purpose AI (GPAI) models** have their own regime. All GPAI providers must keep technical documentation, give information to downstream providers, maintain a copyright policy and publish a summary of training content. Models with **systemic risk** (presumed above 10²⁵ floating-point operations of training compute) must also perform model evaluations and adversarial testing, assess and mitigate systemic risks, report serious incidents and ensure adequate cybersecurity. A voluntary **GPAI Code of Practice**, published in July 2025, offers a way to demonstrate compliance.

### High-risk requirements
Providers of high-risk systems must implement a **risk management system** (Article 9), **data governance** for training, validation and test data (Article 10), **technical documentation** (Article 11), automatic **logging** (Article 12), **transparency** and instructions for deployers (Article 13), **human oversight** (Article 14), and appropriate **accuracy, robustness and cybersecurity** (Article 15), all under a **quality management system** (Article 17). They complete a **conformity assessment**, affix the CE marking, register in the EU database, run **post-market monitoring** and report **serious incidents**.

**Deployers** (Article 26) must use the system according to its instructions, assign human oversight to competent people, ensure input data is relevant, monitor operation, keep logs for at least six months, and inform workers and affected people. Public bodies and certain private deployers, such as those assessing creditworthiness or pricing life and health insurance, must carry out a **fundamental rights impact assessment** (Article 27), which can build on an existing GDPR DPIA.

Article 15 matters to security professionals: high-risk systems must be resilient against attempts to alter their use or performance by exploiting vulnerabilities, with measures against **data poisoning, model poisoning, adversarial examples, confidentiality attacks and model flaws**.

### Penalties
Fines reach up to **€35 million or 7% of worldwide annual turnover** for prohibited practices, up to €15 million or 3% for most other breaches, and up to €7.5 million or 1% for supplying incorrect information to authorities. Lower ceilings apply to SMEs.

### Timeline after the Digital Omnibus
In 2026 the EU adopted a **Digital Omnibus on AI** (Regulation (EU) 2026/1744), which delayed some deadlines without removing any category of obligation:

- **2 February 2025:** prohibitions and AI literacy (Article 4) apply. The Omnibus softened Article 4 so that organisations must *take measures to support* AI literacy, rather than guarantee a particular level.
- **2 August 2025:** GPAI obligations, governance bodies and penalties apply.
- **2 August 2026:** transparency duties under Article 50 apply. Generative systems already on the market before that date have until **2 December 2026** to add machine-readable marking of their outputs.
- **2 December 2026:** two new prohibitions apply, covering AI that generates non-consensual intimate imagery and child sexual abuse material.
- **2 December 2027:** high-risk obligations for Annex III use cases (previously August 2026).
- **2 August 2028:** high-risk obligations for AI in products covered by Annex I legislation (previously August 2027).

Exam questions are more likely to test the *structure* (tiers, roles, duties) than exact dates, but you should know the order in which obligations arrive.

### GDPR and AI
The GDPR applies whenever personal data is processed, and AI systems process it at every stage: collected training data, fine-tuning sets, retrieval indexes, prompts, logs and outputs. Its principles (Article 5) are **lawfulness, fairness and transparency; purpose limitation; data minimisation; accuracy; storage limitation; integrity and confidentiality; and accountability**. Key provisions for AI include:

- **Lawful basis** (Article 6), with stricter conditions for **special category data** such as health, biometrics and religious beliefs (Article 9).
- **Data protection impact assessments** (Article 35) for processing likely to result in high risk, including systematic profiling and new technologies.
- **Rights** of access (including meaningful information about the logic of automated decisions), rectification, erasure and objection, and **Article 22** safeguards for solely automated decisions with legal or similarly significant effects.
- **Data protection by design and by default** (Article 25), **security of processing** (Article 32) and **breach notification** to the supervisory authority within 72 hours (Article 33).
- Restrictions on **international transfers** (Chapter V), relevant when prompts or training data flow to providers in other countries.

In December 2024 the European Data Protection Board published **Opinion 28/2024** on AI models. It said that whether a trained model is anonymous must be assessed case by case (personal data must not be extractable by reasonably likely means), explained how legitimate interest can serve as a lawful basis for developing and deploying models, and warned that unlawful processing during development can affect the lawfulness of later use. GDPR fines reach €20 million or 4% of worldwide turnover.`, },
    { type: 'flip', title: 'EU AI Act vocabulary', cards: [
      ['Provider', 'An organisation that develops an AI system or GPAI model, or has one developed, and places it on the market or puts it into service under its own name.'],
      ['Deployer', 'An organisation that uses an AI system under its authority, other than for personal non-professional use.'],
      ['High-risk AI system', 'A system that is a safety component of a regulated product (Annex I), or used in a listed sensitive area such as hiring or credit (Annex III).'],
      ['Conformity assessment', 'The process of showing that a high-risk system meets the Act’s requirements before it is placed on the market.'],
      ['GPAI model with systemic risk', 'A highly capable general-purpose model, presumed when training compute exceeds 10²⁵ FLOPs, with extra evaluation, incident and security duties.'],
      ['Fundamental rights impact assessment (FRIA)', 'An assessment that certain deployers must perform before using high-risk systems, covering impacts on people’s rights.'] ] },
    { type: 'callout', kind: 'exam', title: 'Role first, then obligations', md: `When a scenario involves the AI Act, first decide the **role** (provider or deployer) and the **tier** (prohibited, high, limited, minimal, or GPAI). The obligations follow from that combination. A company that buys a CV-screening tool is a **deployer of a high-risk system**; if it retrains and rebrands the tool, it may become the **provider**.` },
    { type: 'scenario', title: 'The rebranded screening tool', md: `A recruitment firm licenses an AI CV-screening system from a vendor and uses it to shortlist candidates for its clients. To win business, it fine-tunes the model on its own placement data and sells access under its own brand as “TalentLens”.`,
      q: { q: 'How is the recruitment firm MOST likely classified under the EU AI Act?', o: ['As a deployer only, because the vendor built the original system and remains its provider', 'As the provider of a high-risk system, because it substantially modified it and markets it under its own name', 'As outside the Act, because recruitment tools fall into the minimal-risk tier unless they use biometrics', 'As a general-purpose AI model provider with systemic risk, because it fine-tuned the underlying model'], a: 1, b: 1,
        why: 'Employment and recruitment uses are high risk under Annex III. Substantially modifying a high-risk system and placing it on the market under your own name makes you its provider, with the full set of provider obligations.' } },
    { type: 'check', q: { q: 'Which AI Act tier imposes mainly transparency duties, such as telling people they are interacting with a chatbot?', o: ['Prohibited', 'High risk', 'Limited risk', 'Minimal risk'], a: 2, b: 1,
      why: 'Limited-risk systems, covered by Article 50, carry transparency obligations: disclosing AI interaction and marking or disclosing synthetic content and deepfakes.' } }
  ]
};
