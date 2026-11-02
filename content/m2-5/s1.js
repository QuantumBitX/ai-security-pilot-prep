/* 2.5 · Section 1: third-party AI due diligence, procurement, security SLAs and incident notification */
module.exports = {
  title: 'Third-party AI due diligence and procurement controls', covers: [1, 2],
  blocks: [
    { type: 'video', title: 'Buying AI safely', kicker: 'Module 2.5 · Video 1 of 3', scenes: [
      { t: 'title', kicker: 'Module 2.5 · AI supply chain', title: 'Buying AI safely', sub: 'Due diligence, provider controls, security SLAs and incident rights', icon: 'building',
        say: 'Most organisations don’t build their AI. They buy it, as a hosted model, an AI feature inside a SaaS product, or a platform. You can outsource the work, but not the accountability. | This video covers how to assess AI providers, the procurement controls and contract terms that matter, and how incident notification should work.' },
      { t: 'bullets', title: 'What to assess in an AI provider', layout: 'grid', cols: 2, items: [
          { icon: 'database', h: 'Data handling', d: 'Retention, training use, location, sub-processors', k: 'data' },
          { icon: 'lock', h: 'Security controls', d: 'Access, encryption, tenant isolation, secure development', k: 'control' },
          { icon: 'model', h: 'Model governance', d: 'Model cards, evaluations, red teaming, change control', k: 'model' },
          { icon: 'audit', h: 'Independent assurance', d: 'ISO/IEC 27001 and 42001, SOC 2, STAR for AI', k: 'human' },
          { icon: 'cycle', h: 'Resilience and exit', d: 'Uptime, recovery, capacity, data return', k: 'neutral' },
          { icon: 'gavel', h: 'Legal position', d: 'Liability, IP indemnity, regulatory roles', k: 'threat' } ],
        say: 'An AI provider assessment covers six areas. | Data handling: how long prompts and outputs are retained, whether they are used for training, where they are processed, and which sub-processors are involved. | Security controls: access management, encryption, isolation between customers, and secure development. | Model governance: model cards, evaluation and red-teaming results, and how model changes are controlled and communicated. | Independent assurance: certifications such as ISO twenty-seven thousand and one and forty-two thousand and one, SOC two reports, and the Cloud Security Alliance’s STAR for AI programme. | Resilience and exit: uptime, disaster recovery, capacity, and how your data comes back when you leave. | And the legal position: liability, intellectual property indemnity, and who plays which role under laws such as the AI Act.' },
      { t: 'flow', title: 'The AI procurement lifecycle',
        nodes: [
          { id: 'need', x: 210, y: 330, icon: 'target', label: 'Need and tier', sub: 'use case risk sets depth', k: 'human', w: 280 },
          { id: 'dd', x: 600, y: 330, icon: 'search', label: 'Due diligence', sub: 'questionnaire and evidence', k: 'data', w: 290 },
          { id: 'con', x: 1000, y: 330, icon: 'doc', label: 'Contract', sub: 'SLAs, data terms, notice rights', k: 'control', w: 290 },
          { id: 'onb', x: 1370, y: 330, icon: 'gear', label: 'Onboard', sub: 'secure configuration', k: 'model', w: 250 },
          { id: 'mon', x: 1000, y: 690, icon: 'eye', label: 'Monitor', sub: 'performance, changes, incidents', k: 'neutral', w: 300 },
          { id: 'exit', x: 600, y: 690, icon: 'rollback', label: 'Exit', sub: 'data return, deletion certified', k: 'threat', w: 300 } ],
        edges: [{ from: 'need', to: 'dd', k: 'human' }, { from: 'dd', to: 'con', k: 'data' }, { from: 'con', to: 'onb', k: 'control' }, { from: 'onb', to: 'mon', k: 'model' }, { from: 'mon', to: 'exit', k: 'neutral' }],
        steps: [
          { show: 'need', hi: 'need' },
          { show: 'dd need-dd', flow: 'need-dd', hi: 'dd' },
          { show: 'con dd-con', flow: 'dd-con', hi: 'con' },
          { show: 'onb con-onb', flow: 'con-onb', hi: 'onb' },
          { show: 'mon onb-mon', flow: 'onb-mon', hi: 'mon' },
          { show: 'exit mon-exit', flow: 'mon-exit', hi: 'exit' } ],
        say: 'Procurement is a lifecycle, not a one-off check. It starts with the need, and the use case’s risk tier, which sets how deep the assessment goes. | Due diligence gathers answers and, more importantly, evidence: certificates, audit reports and test results. | The contract turns findings into enforceable commitments: service levels, data terms and notification rights. | Onboarding configures the service securely, with single sign-on, logging, data controls and safety settings switched on. | Monitoring tracks performance, model changes, sub-processor changes and incidents for as long as the service is used. | And exit is planned from day one: data returned, deletion certified, and a transition path to an alternative.' },
      { t: 'compare', title: 'Contract terms that matter', labels: ['Security SLA', 'Incident notice', 'Model changes', 'Data use', 'Audit and exit'],
        cols: [{ h: 'Ask for', icon: 'doc', k: 'control' }, { h: 'Why', icon: 'bulb', k: 'neutral' }],
        rows: [
          ['Uptime, support and vulnerability-fix times', 'Measurable, enforceable service'],
          ['Notification within agreed hours, with details', 'Your own regulatory clocks depend on it'],
          ['Advance notice; ability to pin versions', 'Silent updates change behaviour'],
          ['No training on your data; retention limits', 'Confidentiality and privacy'],
          ['Reports, audit rights, return and deletion', 'Assurance now; a clean exit later'] ],
        say: 'Five groups of contract terms matter most. | A security service level agreement: uptime, support response times, and how quickly vulnerabilities are fixed. | Incident notification within an agreed number of hours, with enough detail to act, and cooperation during the investigation. Your own regulatory deadlines depend on it. | Model change notice: advance warning of version changes, and the ability to pin a version while you test. | Data use: a commitment not to train on your data, retention limits, and where data is processed. | And audit and exit: access to assurance reports or audit rights, plus data return and certified deletion when you leave.' },
      { t: 'bullets', title: 'Your clocks set the vendor’s clock', items: [
          { icon: 'fingerprint', h: 'GDPR: 72 hours', d: 'Controller to regulator, after becoming aware of a breach', k: 'data' },
          { icon: 'shield', h: 'NIS2: 24 hours', d: 'Early warning for significant incidents, then 72 hours', k: 'control' },
          { icon: 'alert', h: 'EU AI Act: 2 to 15 days', d: 'Serious incidents involving high-risk AI', k: 'threat' },
          { icon: 'doc', h: 'So the contract says less', d: 'Vendor notifies you well inside your shortest clock', k: 'human' } ],
        say: 'Incident notification terms must fit your legal deadlines. | Under the GDPR, a controller must notify the regulator within seventy-two hours of becoming aware of a personal data breach, and processors must tell controllers without undue delay. | Under the NIS2 directive, essential and important entities send an early warning within twenty-four hours, and a fuller notification within seventy-two. | Under the AI Act, serious incidents involving high-risk AI must be reported within fifteen days, or two days for critical infrastructure disruption or widespread infringement. | So the contract must require the vendor to notify you well inside your shortest clock, often within twenty-four hours, or you will miss yours.' },
      { t: 'bullets', title: 'Red flags in AI vendor assessments', layout: 'grid', cols: 2, items: [
          { icon: 'eye', h: 'Opaque data practices', d: 'Won’t name sub-processors or regions', k: 'threat' },
          { icon: 'database', h: 'Training on your data', d: 'By default, with no opt-out', k: 'threat' },
          { icon: 'cycle', h: 'Silent model changes', d: 'No notice, no version pinning', k: 'human' },
          { icon: 'bug', h: 'No testing evidence', d: 'No pen test or red-team results', k: 'model' },
          { icon: 'siren', h: 'Vague incident terms', d: '“Reasonable efforts” instead of hours', k: 'neutral' },
          { icon: 'trash', h: 'No exit plan', d: 'No deletion or data return commitment', k: 'data' } ],
        say: 'Watch for red flags. | Opaque data practices: the vendor won’t name its sub-processors or processing regions. | Training on customer data by default, with no way to opt out. | Silent model changes, with no notice and no way to pin a version. | No security testing evidence, such as penetration test or red-team summaries. | Vague incident terms, promising reasonable efforts rather than a number of hours. | And no exit plan: no commitment to return data or certify its deletion.' },
      { t: 'summary', items: ['Assess data, security, model governance, assurance, resilience, legal', 'Procurement is a lifecycle: through monitoring to exit', 'Contract for SLAs, notice, model changes, data use, audit, exit', 'Vendor notification must beat your own regulatory clocks'],
        say: 'To recap. | Assess providers on data handling, security, model governance, independent assurance, resilience and legal position. | Treat procurement as a lifecycle, from need and tier through monitoring to exit. | Contract for security service levels, incident notice, model change notice, data use, audit and exit. | And make sure vendor notification arrives well inside your own regulatory deadlines.' } ] },
    { type: 'text', md: `### Why third-party AI needs its own due diligence
Traditional vendor assessments ask about access control, encryption and certifications. AI providers raise additional questions: whether your prompts and data train their models, how they evaluate and red-team their models, how and when models change, where inference happens, which other model providers they depend on, and how their safety systems work. Regulation also assigns roles: under the EU AI Act, an organisation integrating a vendor’s model into its own high-risk product may become a **provider**, inheriting obligations it can only meet with the vendor’s cooperation.

Due diligence should be **proportionate to the use-case tier** (Module 2.3): a tier-1 writing tool needs a short check of data terms; a tier-4 decision system needs a deep review with evidence.

### Sources of assurance
- **Certifications and reports:** ISO/IEC 27001 (information security), **ISO/IEC 42001** (AI management system), SOC 2 Type II reports, and sector certifications. Check scope: a certificate that covers the vendor’s corporate IT but not its AI platform is of little use.
- **CSA AI Controls Matrix (AICM) and STAR for AI:** the Cloud Security Alliance’s AICM is a vendor-neutral set of AI security and governance control objectives (247 across 18 domains in version 1.1), mapped to ISO/IEC 42001, the NIST AI RMF and the EU AI Act. STAR for AI offers self-assessment (level 1) and third-party certification (level 2).
- **Model and system documentation:** model cards, system cards, evaluation and red-teaming summaries, acceptable use policies, and the provider’s training-data summary where required.
- **Questionnaires:** standardised questionnaires (with AI-specific sections) supplemented by targeted questions and requests for evidence.
- **Testing:** your own evaluation of the service against your use case, including adversarial tests, within the provider’s terms.

### Key due diligence questions
| Area | Questions |
|---|---|
| Data handling | Are prompts, outputs and files retained? For how long? Are they used to train or improve models? Can that be switched off contractually? Where are they processed and stored? Which sub-processors (including other model providers) receive them? |
| Security | How is customer data isolated? How are model weights and infrastructure protected? What logging is available to customers? How are vulnerabilities in the AI stack handled? |
| Model governance | How are models evaluated for safety, bias and security before release? Are red-team results shared? How are model updates announced, and can versions be pinned? |
| Safety systems | What content filtering and abuse monitoring operate, and can they be configured? What data does abuse monitoring retain, and who reviews it? |
| Resilience | What are the uptime commitments, rate limits and capacity guarantees? What happens during an outage? |
| Legal | Who owns outputs? Is there an IP indemnity, and on what conditions? How are liability and regulatory responsibilities allocated? |

### Contract and procurement controls
- **Security SLAs:** availability, latency, support response, and **vulnerability remediation timelines**, with service credits or other remedies.
- **Incident notification rights:** notification within a defined period (often 24 hours or less), minimum content (what happened, data affected, actions taken), ongoing updates, cooperation with investigations and regulators, and access to relevant logs.
- **Change management:** advance notice of model version changes, deprecations and sub-processor changes, with rights to object or exit.
- **Data terms:** no training on customer data, retention limits (zero data retention where needed), data location, encryption and key management options, deletion on termination with **certification**.
- **Audit rights:** access to independent reports, the right to send questionnaires and, for critical services, to audit.
- **Exit and portability:** data export in usable formats, transition assistance, and continued service during migration.
- **Flow-down:** obligations apply to the vendor’s sub-processors.

Regulated sectors face specific requirements. In the EU, **DORA** requires financial entities to maintain a register of ICT third-party arrangements and include defined contractual provisions, and **NIS2** sets incident reporting timelines for essential and important entities. Vendor terms must make your own compliance possible.

### Incident notification clocks
| Regime | Clock |
|---|---|
| GDPR (controller → supervisory authority) | Within 72 hours of becoming aware of a personal data breach; processors notify controllers without undue delay |
| NIS2 (essential and important entities) | Early warning within 24 hours; incident notification within 72 hours; final report within one month |
| EU AI Act Article 73 (providers of high-risk AI) | Within 15 days of awareness; within 2 days for widespread infringement or serious critical-infrastructure incidents; within 10 days for a death |

Design vendor notification terms back from your **shortest** applicable clock, leaving time to assess and decide.`, },
    { type: 'scenario', title: 'The standard terms', md: `A legal team wants to buy an AI contract-review service. The vendor’s standard terms say customer documents may be used “to improve our services”, incidents will be reported “within a reasonable time”, and model versions “may change without notice”. The vendor holds ISO/IEC 27001 certification for its corporate offices only.`,
      q: { q: 'What is the BEST next step?', o: ['Sign, because the vendor’s ISO/IEC 27001 certification already covers how it handles customer documents', 'Negotiate no training on customer data, prompt incident notice, notice of model changes and AI platform assurance first', 'Ask the vendor to confirm in a follow-up email that it won’t use the documents for training, analytics or any other purpose', 'Use the service only for non-confidential contracts, and leave the standard terms unchanged for now'], a: 1, b: 2,
        why: 'Each standard term creates risk: training use breaches confidentiality, vague notification breaks regulatory clocks, and silent model changes undermine testing. The certificate doesn’t cover the AI service. Contractual commitments and relevant assurance must come first.' } },
    { type: 'check', q: { q: 'An organisation subject to NIS2 relies on an AI vendor for a critical service. What should the vendor contract require for incident notification?', o: ['Notification within 30 days, matching the vendor’s standard service-level reporting cycle', 'Notification fast enough to meet the 24-hour early warning duty, with defined content and cooperation', 'No notification clause, since the vendor is responsible under NIS2 for reporting its own incidents', 'Notification only when personal data is affected, because NIS2 incident reporting follows the GDPR'], a: 1, b: 2,
      why: 'The organisation’s own deadline (24-hour early warning under NIS2) depends on learning of vendor incidents quickly. Contract terms must fit inside that clock and include enough detail to act.' } }
  ]
};
