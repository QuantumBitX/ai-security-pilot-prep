/* 2.1 · Section 2: NIST AI RMF and ISO/IEC 42001 */
module.exports = {
  title: 'Frameworks and standards: NIST AI RMF and ISO/IEC 42001', covers: [1],
  blocks: [
    { type: 'video', title: 'Frameworks you can build on', kicker: 'Module 2.1 · Video 2 of 4', scenes: [
      { t: 'title', kicker: 'Module 2.1 · AI governance', title: 'Frameworks you can build on', sub: 'The NIST AI Risk Management Framework and ISO/IEC 42001', icon: 'compass',
        say: 'Laws tell you what outcomes you must achieve. Frameworks and standards help you build the system that achieves them. | This video covers the two you will meet most often: the NIST AI Risk Management Framework, and the ISO/IEC 42001 standard for AI management systems.' },
      { t: 'cycle', title: 'The NIST AI RMF core', center: 'Govern', centerSub: 'culture, policies and accountability throughout', intro: 'Voluntary, outcome-based, and usable by any organisation, in any sector.',
        stages: [
          { icon: 'compass', label: 'Map', d: 'Establish context: purpose, users, impacts, and the risks that follow.' },
          { icon: 'ruler', label: 'Measure', d: 'Assess, test and track risks with suitable metrics.' },
          { icon: 'sliders', label: 'Manage', d: 'Prioritise and treat risks; respond and recover.' } ],
        say: 'The NIST AI Risk Management Framework, published in January twenty twenty-three, is voluntary and usable by organisations of any size, in any sector. Its core has four functions. | Map establishes context: what the system is for, who uses it and who is affected, and which risks follow. | Measure assesses, tests and tracks those risks with suitable methods and metrics. | Manage prioritises risks, treats them, and responds to and recovers from incidents. | And Govern sits at the centre. It covers culture, policies, roles and accountability, and it runs through every other function.' },
      { t: 'bullets', title: 'Seven characteristics of trustworthy AI', layout: 'grid', cols: 2, items: [
          { icon: 'check', h: 'Valid and reliable', d: 'Does what it should, consistently', k: 'control' },
          { icon: 'shield', h: 'Safe', d: 'Doesn’t endanger life, health or property', k: 'human' },
          { icon: 'lock', h: 'Secure and resilient', d: 'Withstands attacks and recovers', k: 'data' },
          { icon: 'eye', h: 'Accountable and transparent', d: 'Clear ownership; information available', k: 'model' },
          { icon: 'bulb', h: 'Explainable and interpretable', d: 'Its outputs can be understood', k: 'neutral' },
          { icon: 'fingerprint', h: 'Privacy-enhanced', d: 'Protects autonomy and personal data', k: 'data' },
          { icon: 'scale', h: 'Fair, with harmful bias managed', d: 'Equitable treatment of people', k: 'human' } ],
        say: 'NIST describes seven characteristics of trustworthy AI. | Valid and reliable: the system does what it is meant to, consistently. This is the foundation for all the others. | Safe: it does not endanger human life, health, property or the environment. | Secure and resilient: it withstands attacks and recovers from them. | Accountable and transparent: ownership is clear, and appropriate information about the system is available. | Explainable and interpretable: people can understand how and why it produced an output. | Privacy-enhanced: it protects people’s autonomy and personal data. | And fair, with harmful bias managed. Note that these characteristics trade off against each other, which is why governance decisions matter.' },
      { t: 'bullets', title: 'NIST resources that extend the framework', items: [
          { icon: 'sparkle', h: 'Generative AI Profile (AI 600-1)', d: 'Twelve risks that generative AI creates or worsens, with actions', k: 'model' },
          { icon: 'shield', h: 'Cyber AI Profile', d: 'A CSF 2.0 profile: secure AI, defend with AI, thwart AI-enabled attacks', k: 'data' },
          { icon: 'attacker', h: 'Adversarial ML taxonomy (AI 100-2)', d: 'Common language for attacks on predictive and generative AI', k: 'threat' },
          { icon: 'list', h: 'Control overlays (COSAiS)', d: 'SP 800-53 controls tailored to AI use cases', k: 'control' } ],
        say: 'NIST has built a family of resources around the framework. | The Generative AI Profile, NIST AI six hundred dash one, describes twelve risks that generative AI creates or worsens, such as confabulation, information integrity and value-chain risks, with suggested actions for each. | The Cyber AI Profile applies the Cybersecurity Framework two point oh to AI, in three focus areas: securing AI systems, using AI for cyber defence, and thwarting AI-enabled attacks. | The adversarial machine learning taxonomy, NIST AI one hundred dash two, gives a common language for attacks on both predictive and generative AI. | And NIST is developing control overlays that tailor the SP eight hundred dash fifty-three security controls to specific AI use cases.' },
      { t: 'cycle', title: 'ISO/IEC 42001: an AI management system', center: 'AIMS', centerSub: 'AI management system; certifiable, like ISO/IEC 27001', intro: 'Published in 2023, it follows the same harmonised structure as other ISO management system standards.',
        stages: [
          { icon: 'compass', label: 'Plan', d: 'Context, leadership, AI policy, risk and impact assessments, objectives.' },
          { icon: 'gear', label: 'Do', d: 'Operate controls across the AI life cycle, data and suppliers.' },
          { icon: 'audit', label: 'Check', d: 'Monitor, measure, audit internally, and review as management.' },
          { icon: 'cycle', label: 'Act', d: 'Correct nonconformities and improve continually.' } ],
        say: 'ISO slash IEC forty-two thousand and one, published in twenty twenty-three, specifies requirements for an AI management system. It uses the same structure as ISO twenty-seven thousand and one, so the two integrate well, and organisations can be certified against it. | Plan covers the organisation’s context, leadership commitment, an AI policy, AI risk assessment, AI system impact assessment and objectives. | Do means operating the controls across the AI life cycle, including data and suppliers. | Check means monitoring and measuring, internal audit, and management review. | And Act means correcting nonconformities and improving continually. Annex A provides thirty-eight reference controls, which the organisation selects and justifies in a statement of applicability.' },
      { t: 'bullets', title: 'The ISO family around AI', layout: 'grid', cols: 2, items: [
          { icon: 'audit', h: 'ISO/IEC 42001', d: 'AI management system requirements; certifiable', k: 'control' },
          { icon: 'alert', h: 'ISO/IEC 23894', d: 'Guidance on AI risk management, built on ISO 31000', k: 'human' },
          { icon: 'users', h: 'ISO/IEC 42005', d: 'Guidance on AI system impact assessment', k: 'model' },
          { icon: 'gavel', h: 'ISO/IEC 42006', d: 'Requirements for bodies that certify AI management systems', k: 'neutral' },
          { icon: 'book', h: 'ISO/IEC 22989', d: 'AI concepts and terminology', k: 'data' },
          { icon: 'lock', h: 'ISO/IEC 27001', d: 'Information security management; pairs with 42001', k: 'data' } ],
        say: 'Several related standards surround forty-two thousand and one. | Forty-two thousand and one itself sets the requirements, and is the one you certify against. | Twenty-three eight ninety-four gives guidance on AI risk management, building on ISO thirty-one thousand. | Forty-two thousand and five gives guidance on assessing the impacts of AI systems on people and society. | Forty-two thousand and six sets requirements for the bodies that audit and certify AI management systems, which supports trust in certificates. | Twenty-two nine eighty-nine defines AI concepts and terminology. | And twenty-seven thousand and one, the information security management standard, pairs naturally with forty-two thousand and one.' },
      { t: 'flow', title: 'One system, many frameworks',
        nodes: [
          { id: 'law', x: 220, y: 300, icon: 'gavel', label: 'Laws', sub: 'EU AI Act, GDPR, sector rules', k: 'threat', w: 290 },
          { id: 'nist', x: 220, y: 650, icon: 'compass', label: 'NIST AI RMF', sub: 'risk practices', k: 'data', w: 290 },
          { id: 'reg', x: 620, y: 300, icon: 'list', label: 'Obligations register', k: 'human', w: 280 },
          { id: 'aims', x: 790, y: 650, icon: 'audit', label: 'ISO/IEC 42001 AIMS', sub: 'policy, roles, controls', k: 'control', w: 300 },
          { id: 'ev', x: 1300, y: 650, icon: 'archive', label: 'Evidence', sub: 'once, reused many times', k: 'neutral', w: 290 },
          { id: 'aud', x: 1300, y: 300, icon: 'users', label: 'Regulators, auditors, customers', k: 'model', w: 300 } ],
        edges: [{ from: 'law', to: 'reg', k: 'threat' }, { from: 'reg', to: 'aims', k: 'human' }, { from: 'nist', to: 'aims', k: 'data' }, { from: 'aims', to: 'ev', k: 'control' }, { from: 'ev', to: 'aud', k: 'neutral' }],
        steps: [
          { show: 'law reg law-reg', flow: 'law-reg', hi: 'reg' },
          { show: 'aims reg-aims', flow: 'reg-aims', hi: 'aims' },
          { show: 'nist nist-aims', flow: 'nist-aims', hi: 'nist' },
          { show: 'ev aud aims-ev ev-aud', flow: 'aims-ev ev-aud', hi: 'ev' } ],
        say: 'In practice, mature organisations don’t run a separate programme for each framework. Legal obligations are captured in an obligations register. | The register feeds a single AI management system, often built on ISO forty-two thousand and one, which defines the policies, roles and controls. | NIST AI RMF practices strengthen how risks are mapped, measured and managed inside that system. | And because the controls are shared, evidence is collected once and reused for regulators, auditors and customers. Mapping one framework to another is called a crosswalk.' },
      { t: 'summary', items: ['NIST AI RMF: Govern, Map, Measure, Manage', 'Seven trustworthy characteristics that trade off', 'ISO/IEC 42001: certifiable AI management system, 38 Annex A controls', 'Build one system; crosswalk the frameworks'],
        say: 'To recap. | The NIST AI RMF has four functions: Govern, Map, Measure and Manage, with Govern running throughout. | It describes seven characteristics of trustworthy AI, which must be balanced against each other. | ISO slash IEC forty-two thousand and one defines a certifiable AI management system, with thirty-eight reference controls in Annex A. | And the best approach is one management system, with crosswalks to each framework and law.' } ] },
    { type: 'text', md: `### The NIST AI Risk Management Framework
The **NIST AI RMF 1.0** (January 2023) is a voluntary, non-sector-specific framework. Part 1 explains how AI risks differ from traditional software risks and defines trustworthy AI. Part 2, the **core**, is organised into four functions, each broken down into categories and subcategories of outcomes:

| Function | Purpose | Examples of outcomes |
|---|---|---|
| **Govern** | Cultivate a risk-aware culture and accountability | Policies and procedures; roles and responsibilities; workforce diversity and training; processes for third-party risk; mechanisms for engaging affected communities |
| **Map** | Establish context and identify risks | Intended purpose and context documented; system categorised; capabilities and limits understood; impacts on individuals and society identified |
| **Measure** | Analyse, assess and track risks | Appropriate metrics selected; systems evaluated for trustworthy characteristics; risks tracked over time; feedback gathered |
| **Manage** | Prioritise and act on risks | Risks prioritised and treated; benefits weighed against costs; third-party risks managed; incidents responded to and communicated |

**Govern** is cross-cutting: it informs and is informed by the other three. The RMF is accompanied by a **Playbook** with suggested actions for each subcategory, and by **profiles** that tailor it to a sector, technology or use case.

The seven **characteristics of trustworthy AI** are: valid and reliable; safe; secure and resilient; accountable and transparent; explainable and interpretable; privacy-enhanced; and fair, with harmful bias managed. *Valid and reliable* is the base on which the others rest, and *accountable and transparent* spans them all. They involve trade-offs: for example, improving privacy by adding noise can reduce accuracy, and the most accurate model may be the least explainable.

**The Generative AI Profile (NIST AI 600-1, July 2024)** lists twelve risks that generative AI creates or exacerbates: CBRN information or capabilities; confabulation; dangerous, violent or hateful content; data privacy; environmental impacts; harmful bias and homogenisation; human–AI configuration; information integrity; information security; intellectual property; obscene, degrading or abusive content; and value chain and component integration.

NIST has also drafted a **Cybersecurity Framework Profile for AI** (the Cyber AI Profile), a CSF 2.0 community profile with three focus areas: *securing* AI system components, *defending* with AI-enabled cybersecurity, and *thwarting* AI-enabled attacks. And it is developing **Control Overlays for Securing AI Systems (COSAiS)**, which tailor SP 800-53 controls to AI use cases such as using and fine-tuning predictive AI.

### ISO/IEC 42001:2023
ISO/IEC 42001 specifies requirements for establishing, implementing, maintaining and continually improving an **AI management system (AIMS)**. It applies to any organisation that provides or uses AI. Like ISO/IEC 27001, it follows the harmonised structure of clauses 4 to 10:

| Clause | Content |
|---|---|
| 4 Context | Internal and external issues, interested parties, scope, the role the organisation plays (for example, provider or user) |
| 5 Leadership | Top-management commitment, AI policy, roles and responsibilities |
| 6 Planning | AI risk assessment and treatment, **AI system impact assessment**, objectives, statement of applicability |
| 7 Support | Resources, competence, awareness, communication, documented information |
| 8 Operation | Operational planning and control; performing risk assessments, treatments and impact assessments |
| 9 Performance evaluation | Monitoring and measurement, internal audit, management review |
| 10 Improvement | Nonconformity, corrective action, continual improvement |

**Annex A** lists 38 reference controls under nine objectives: AI policies; internal organisation; resources for AI systems; assessing impacts of AI systems; the AI system life cycle; data for AI systems; information for interested parties; use of AI systems; and third-party and customer relationships. **Annex B** gives implementation guidance; **Annex C** lists potential organisational objectives and risk sources. The organisation documents which controls it applies, and why, in a **statement of applicability**.

Certification is performed by accredited certification bodies; **ISO/IEC 42006:2025** sets requirements for those bodies, which strengthens confidence in certificates. Customers increasingly ask AI suppliers for 42001 certification during procurement, in the same way they ask for ISO/IEC 27001 or SOC 2 reports.

### How they fit together
- **Laws** create obligations; **ISO/IEC 42001** provides the management system to meet them; the **NIST AI RMF** strengthens the risk practices inside it.
- An **obligations register** maps each legal requirement to controls and owners.
- A **crosswalk** maps controls across frameworks, so one control (for example, “impact assessment before deployment”) produces evidence for the AI Act, GDPR DPIA requirements, NIST MAP outcomes and 42001 clause 6.1.4 at the same time.`, },
    { type: 'match', title: 'Match the source to what it gives you', pairs: [
      ['EU AI Act', 'Binding, risk-tiered legal obligations for providers and deployers'],
      ['NIST AI RMF', 'Voluntary functions: Govern, Map, Measure, Manage'],
      ['ISO/IEC 42001', 'Certifiable requirements for an AI management system'],
      ['NIST AI 600-1', 'Twelve generative AI risks with suggested actions'],
      ['ISO/IEC 42005', 'Guidance on assessing AI system impacts on people and society'] ] },
    { type: 'callout', kind: 'exam', title: 'Common distinctions', md: `- The **NIST AI RMF** is *voluntary* and *not certifiable*. **ISO/IEC 42001** is voluntary but *certifiable*.
- In the RMF, **Govern** is the cross-cutting function; **Map** comes first in the life of a system (context before measurement).
- ISO/IEC 42001 requires both an **AI risk assessment** and an **AI system impact assessment**; the first looks at risks to the organisation and its objectives, the second at consequences for individuals, groups and society.` },
    { type: 'check', q: { q: 'An organisation wants to demonstrate to customers, through independent certification, that it governs AI responsibly. Which source BEST supports this goal?', o: ['The NIST AI RMF', 'ISO/IEC 42001', 'NIST AI 600-1', 'ISO/IEC 22989'], a: 1, b: 1,
      why: 'ISO/IEC 42001 specifies requirements for an AI management system that accredited bodies can certify. The NIST AI RMF and its profiles are voluntary guidance without certification, and ISO/IEC 22989 is terminology.' } }
  ]
};
