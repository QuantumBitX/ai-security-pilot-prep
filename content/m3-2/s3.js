/* 3.2 · Section 3: global privacy regulations (GDPR, HIPAA, PCI DSS and the wider map) */
module.exports = {
  title: 'Global privacy regulations: GDPR, HIPAA and PCI DSS', covers: [3],
  blocks: [
    { type: 'video', title: 'Three rulebooks, one AI system', kicker: 'Module 3.2 · Video 3 of 5', scenes: [
      { t: 'title', kicker: 'Module 3.2 · Privacy controls', title: 'Three rulebooks, one AI system', sub: 'What the GDPR, HIPAA and PCI DSS require of AI', icon: 'globe',
        say: 'One AI assistant can fall under several privacy regimes at once: European data protection law, US health privacy rules, and the card industry’s security standard. | This video covers what the GDPR, HIPAA and PCI DSS require of AI systems.' },
      { t: 'compare', title: 'How the three regimes differ', labels: ['What it is', 'Protects', 'Applies to', 'Enforced by'],
        cols: [{ h: 'GDPR', icon: 'globe', k: 'data' }, { h: 'HIPAA', icon: 'drop', k: 'human' }, { h: 'PCI DSS', icon: 'money', k: 'model' }],
        rows: [
          ['EU regulation with global reach', 'US federal health privacy law', 'Card industry security standard'],
          ['Personal data of people in the EU', 'Protected health information (PHI)', 'Cardholder and authentication data'],
          ['Controllers and processors in scope', 'Covered entities and business associates', 'Anyone storing, processing or sending card data'],
          ['Data protection authorities', 'HHS Office for Civil Rights', 'Card brands, through acquirers'] ],
        say: 'Start with how the three differ. | The GDPR is an EU regulation with global reach. HIPAA is a US federal law. PCI DSS isn’t a law at all: it’s an industry standard, enforced through contracts. | The GDPR protects personal data about people in the EU. HIPAA protects protected health information. PCI DSS protects cardholder data, such as the card number, and sensitive authentication data, such as the security code. | The GDPR applies to controllers and processors in the EU, and to those elsewhere that target or monitor people in the EU. HIPAA covers health plans, clearinghouses, most healthcare providers, and their business associates. PCI DSS covers anyone who stores, processes or transmits card data. | Data protection authorities can fine up to four percent of worldwide annual turnover. The HHS Office for Civil Rights enforces HIPAA. And card brands enforce PCI DSS through acquiring banks, with fines, higher fees or loss of the ability to take cards.' },
      { t: 'bullets', title: 'The GDPR meets AI', layout: 'grid', cols: 2, items: [
          { icon: 'scale', h: 'A lawful basis per purpose', d: 'Training and deployment are separate purposes', k: 'data' },
          { icon: 'hitl', h: 'Article 22', d: 'Limits on solely automated significant decisions', k: 'human' },
          { icon: 'search', h: 'DPIA', d: 'Required where high risk is likely', k: 'control' },
          { icon: 'user', h: 'Data subject rights', d: 'Access, rectification, erasure, objection', k: 'model' },
          { icon: 'globe', h: 'International transfers', d: 'Adequacy, SCCs and transfer assessments', k: 'neutral' },
          { icon: 'siren', h: 'Breach notification', d: '72 hours to the supervisory authority', k: 'threat' } ],
        say: 'The GDPR touches AI in six main ways. | Each purpose needs a lawful basis. Training and deployment are usually separate purposes, and relying on legitimate interests needs a documented balancing test. | Article 22 restricts solely automated decisions with legal or similarly significant effects. | A data protection impact assessment is required where high risk is likely, which covers most AI that profiles people or uses sensitive data at scale. | Rights of access, rectification, erasure and objection apply, and are hard to honour once data is inside a model. | Sending personal data to a model hosted outside the European Economic Area is a transfer, needing an adequacy decision, standard contractual clauses or another mechanism. | And personal data breaches must be reported to the supervisory authority within seventy-two hours of becoming aware, unless unlikely to result in risk.' },
      { t: 'flow', title: 'The Article 22 test',
        nodes: [
          { id: 'q1', x: 230, y: 330, icon: 'robot', label: 'Solely automated?', sub: 'no meaningful human review', k: 'model', w: 300 },
          { id: 'q2', x: 630, y: 330, icon: 'gavel', label: 'Significant effect?', sub: 'legal or similarly significant', k: 'human', w: 300 },
          { id: 'q3', x: 1040, y: 330, icon: 'doc', label: 'Exception applies?', sub: 'contract, law or explicit consent', k: 'data', w: 330 },
          { id: 'stop', x: 1410, y: 330, icon: 'stop', label: 'Not permitted', sub: 'redesign the process', k: 'threat', w: 260 },
          { id: 'safe', x: 1040, y: 690, icon: 'shieldcheck', label: 'Safeguards', sub: 'human review, contest, explanation', k: 'control', w: 350 } ],
        edges: [{ from: 'q1', to: 'q2', k: 'model' }, { from: 'q2', to: 'q3', k: 'human' }, { from: 'q3', to: 'stop', k: 'threat' }, { from: 'q3', to: 'safe', k: 'control' }],
        steps: [
          { show: 'q1', hi: 'q1', mark: { q1: 'q' } },
          { show: 'q2 q1-q2', flow: 'q1-q2', hi: 'q2', mark: { q2: 'q' } },
          { show: 'q3 q2-q3', flow: 'q2-q3', hi: 'q3', mark: { q3: 'q' } },
          { show: 'stop q3-stop', flow: 'q3-stop', hi: 'stop', mark: { stop: 'bad' } },
          { show: 'safe q3-safe', flow: 'q3-safe', hi: 'safe', mark: { safe: 'ok' } } ],
        say: 'Article 22 works like a test. First: is the decision solely automated? A human who just rubber-stamps the model’s output doesn’t count as meaningful involvement. | Second: does it have legal or similarly significant effects, such as refusing credit or rejecting a job application? | If both are true, the decision is allowed only when it is necessary for a contract, authorised by law, or based on explicit consent. | If no exception applies, redesign the process, typically with genuine human review. | Where an exception does apply, people must be able to obtain human intervention, express their view and contest the decision, and they are entitled to meaningful information about the logic involved.' },
      { t: 'bullets', title: 'HIPAA meets AI', layout: 'grid', cols: 2, items: [
          { icon: 'drop', h: 'PHI across the AI system', d: 'Training data, prompts, logs and outputs', k: 'human' },
          { icon: 'list', h: 'Permitted uses', d: 'Treatment, payment, operations; else authorisation', k: 'data' },
          { icon: 'filter', h: 'Minimum necessary', d: 'Only the PHI the purpose needs', k: 'control' },
          { icon: 'doc', h: 'Business associate agreements', d: 'Required before an AI vendor handles PHI', k: 'model' },
          { icon: 'shield', h: 'Security Rule', d: 'Administrative, physical, technical safeguards', k: 'neutral' },
          { icon: 'users', h: 'De-identification', d: 'Safe Harbor or Expert Determination', k: 'threat' } ],
        say: 'HIPAA applies wherever protected health information flows through an AI system. | That includes training data, prompts, retrieved records, logs and outputs, such as drafted clinical notes. | PHI can be used for treatment, payment and healthcare operations. Most other uses, such as training a commercial product, need patient authorisation or de-identified data. | The minimum necessary standard argues against sending whole records to a model when a few fields will do. | An AI vendor that handles PHI on a covered entity’s behalf is a business associate, and needs a business associate agreement before any PHI flows. | The Security Rule requires administrative, physical and technical safeguards, starting with a risk analysis that includes the AI system. | And properly de-identified data is no longer PHI. Safe Harbor removes eighteen types of identifier; Expert Determination relies on a qualified expert finding the re-identification risk very small.' },
      { t: 'flow', title: 'How a chatbot pulls in PCI DSS scope',
        nodes: [
          { id: 'cust', x: 200, y: 330, icon: 'user', label: 'Customer', sub: 'types a card number', k: 'human', w: 260 },
          { id: 'bot', x: 570, y: 330, icon: 'chat', label: 'Chat assistant', sub: 'receives it', k: 'model', w: 260 },
          { id: 'llm', x: 950, y: 330, icon: 'cloud', label: 'Model API', sub: 'processes it', k: 'model', w: 250 },
          { id: 'logs', x: 1340, y: 330, icon: 'list', label: 'Transcripts and logs', sub: 'store it', k: 'threat', w: 300 },
          { id: 'pay', x: 470, y: 690, icon: 'shieldcheck', label: 'Hosted payment page', sub: 'card data never enters the chat', k: 'control', w: 380 },
          { id: 'red', x: 1110, y: 690, icon: 'filter', label: 'Detect and redact', sub: 'before the model and the logs', k: 'control', w: 360 } ],
        edges: [{ from: 'cust', to: 'bot', k: 'human' }, { from: 'bot', to: 'llm', k: 'model' }, { from: 'llm', to: 'logs', k: 'threat' }, { from: 'bot', to: 'pay', k: 'control' }, { from: 'bot', to: 'red', k: 'control' }],
        steps: [
          { show: 'cust bot cust-bot', flow: 'cust-bot', hi: 'bot' },
          { show: 'llm logs bot-llm llm-logs', flow: 'bot-llm llm-logs', hi: 'bot llm logs', mark: { bot: 'warn', llm: 'warn', logs: 'warn' } },
          { show: 'pay bot-pay', flow: 'bot-pay', hi: 'pay', mark: { pay: 'ok' } },
          { show: 'red bot-red', flow: 'bot-red', hi: 'red', mark: { red: 'ok' } } ],
        say: 'Now PCI DSS. Imagine a customer types their card number into a support chat. | The assistant passes it to a model API, and transcripts and logs store it. All of these systems, and the vendors behind them, are now in PCI DSS scope. | The best fix is design: hand payments off to a PCI-compliant hosted payment page, so card data never enters the chat. | As a backstop, detect and redact card numbers before they reach the model or the logs, and never retain the security code after authorisation.' },
      { t: 'bullets', title: 'PCI DSS v4.0.1 rules that bite in AI', items: [
          { icon: 'target', h: 'Confirm scope every 12 months', d: 'AI tools that touch card data are in scope', k: 'neutral' },
          { icon: 'x', h: 'No SAD after authorisation', d: 'Not in transcripts, recordings or logs', k: 'threat' },
          { icon: 'mask', h: 'Mask PAN on display', d: 'BIN and last four digits at most', k: 'data' },
          { icon: 'lock', h: 'Render stored PAN unreadable', d: 'Tokens, truncation, keyed hashes, strong crypto', k: 'control' },
          { icon: 'building', h: 'AI vendors are service providers', d: 'Written agreements and monitoring', k: 'human' } ],
        say: 'Five PCI DSS requirements bite hardest in AI. | Confirm scope at least every twelve months. Any AI tool that touches card data, or can affect its security, is in scope. | Never store sensitive authentication data, such as the security code, after authorisation, even encrypted. That includes transcripts, recordings and logs. | Mask card numbers on display, showing at most the bank identification number and the last four digits. | Render stored card numbers unreadable, using tokens, truncation, keyed hashes or strong encryption. | And treat AI vendors that handle card data as third-party service providers, with written agreements and ongoing monitoring.' },
      { t: 'summary', items: ['GDPR: lawful basis, Article 22, DPIAs, rights, transfers, 72-hour breach reports', 'HIPAA: permitted uses, minimum necessary, BAAs, de-identification', 'PCI DSS: keep card data out of AI; tokenise, mask, never store SAD', 'Map every AI data flow to every regime that applies'],
        say: 'To recap. | The GDPR brings lawful basis, Article 22, impact assessments, rights, transfer rules and seventy-two-hour breach reporting. | HIPAA brings permitted uses, minimum necessary, business associate agreements and two de-identification routes. | PCI DSS is best met by keeping card data out of AI systems altogether. | And because one AI system can fall under all three, map every data flow to every regime that applies.' } ] },
    { type: 'text', md: `### GDPR essentials for AI
| Element | Key provisions | How it applies to AI |
|---|---|---|
| **Principles** | Article 5 | Apply equally to training, retrieval, prompts, logs and outputs |
| **Lawful basis** | Article 6; Article 9 for special category data | Training often relies on legitimate interests: purpose, necessity and balancing tests, with mitigations (EDPB Opinion 28/2024) |
| **Transparency** | Articles 12–14 | Tell people about AI use, including training and automated decisions; Article 14 covers indirectly collected data, such as scraped data |
| **Rights** | Articles 15–22 | Honour across datasets, indexes, logs and, where feasible, models |
| **Accountability** | Articles 25, 28, 30, 32, 35 and 37 | AI appears in records of processing, DPIAs, security measures and processor contracts |
| **Breaches** | Articles 33–34 | Tell the authority within 72 hours unless unlikely to result in risk; tell individuals without undue delay when risk is high |
| **Transfers** | Chapter V | Adequacy decisions (including the EU–US Data Privacy Framework for certified organisations), standard contractual clauses, binding corporate rules |
| **Penalties** | Article 83 | Up to €20 million or 4% of total worldwide annual turnover, whichever is higher |

**Article 22.** People have the right not to be subject to decisions based solely on automated processing, including profiling, with legal or similarly significant effects, unless the decision is necessary for a contract, authorised by law, or based on explicit consent. Even then, safeguards apply: human intervention, the chance to express a view, and the right to contest. Articles 13–15 require **meaningful information about the logic involved**. In **SCHUFA** (C-634/21, 2023) the Court of Justice treated a credit score as an automated decision where it played a determining role in a lender’s decision. In **Dun & Bradstreet Austria** (C-203/22, 2025) it held that people are entitled to an explanation of the procedure and principles actually applied, and that trade secrets can’t justify a blanket refusal. The UK’s **Data (Use and Access) Act 2025** relaxes some UK automated decision-making limits where special category data isn’t involved, while keeping safeguards.

**Reform watch.** The Commission’s November 2025 **Digital Omnibus** proposed GDPR changes, including a legitimate-interest route for AI development. As of October 2026 they had not been adopted (the Council agreed its negotiating position that month), so the current GDPR applies. The separate AI Act changes were adopted as Regulation (EU) 2026/1744.

### HIPAA essentials for AI
- **Who:** covered entities (health plans, healthcare clearinghouses, and providers that conduct standard electronic transactions) and their business associates, including subcontractors. Many consumer health apps fall outside HIPAA, though other rules, such as the FTC’s Health Breach Notification Rule, may apply.
- **Privacy Rule:** uses for treatment, payment and healthcare operations; patient authorisation for most other purposes; the minimum necessary standard; rights of access and amendment.
- **Security Rule:** administrative, physical and technical safeguards, some *required* and some *addressable*. A proposed update published in January 2025 would make encryption and MFA mandatory; at the time of writing it had not been finalised.
- **Breach Notification Rule:** notify individuals within 60 days of discovering a breach of unsecured PHI, and notify HHS; breaches affecting more than 500 residents of a state or jurisdiction also require media notice. PHI encrypted in line with HHS guidance is “secured”.
- **De-identification:** **Safe Harbor** removes 18 identifiers (including names, geographic units smaller than a state, all date elements except the year, contact details, record and device numbers, IP addresses, biometrics and full-face photographs), with no actual knowledge that the rest could identify someone. **Expert Determination** relies on a qualified expert’s documented statistical analysis. A **limited data set** keeps some dates and locations under a data use agreement.
- **AI implications:** confirm the permitted purpose before training on PHI; use BAAs that restrict a vendor’s own use of PHI, such as training its general models; apply minimum necessary to prompts and retrieval; and test de-identified training data for memorisation.

### PCI DSS essentials for AI
- **Version:** PCI DSS v4.0.1 (June 2024) is current; its future-dated requirements became mandatory on 31 March 2025.
- **Account data:** cardholder data (primary account number (PAN), cardholder name, expiry date, service code) plus **sensitive authentication data** (full track data, card verification codes, PINs).
- **Scope:** systems that store, process or transmit account data, or that connect to or could affect them. Scope is confirmed at least every 12 months and after significant change (Requirement 12.5.2).
- **Requirement 3:** never retain SAD after authorisation; mask PAN when displayed; render stored PAN unreadable (keyed hashes of the full PAN, truncation, tokens or strong cryptography with key management).
- **Also relevant:** strong cryptography in transit (Requirement 4), least privilege and MFA (Requirements 7–8), logging (Requirement 10) and service provider management (Requirement 12.8).
- **AI guidance:** the PCI SSC’s *AI Principles: Securing the Use of AI in Payment Environments* (September 2025) say AI systems must comply with applicable PCI requirements, and stress limiting the sensitive data AI can reach, protecting credentials, logging AI activity and using tokens where full card numbers aren’t needed.
- **AI implications:** use hosted payment pages, or pause-and-resume and keypad entry on calls; redact before models and logs; treat AI vendors as service providers; never train models on card data.

### The wider map
| Jurisdiction | Main laws | AI-relevant points |
|---|---|---|
| **UK** | UK GDPR, Data Protection Act 2018, Data (Use and Access) Act 2025 | Close to the GDPR; ICO guidance on AI and data protection |
| **EU** | GDPR alongside the AI Act | Data governance for high-risk AI (Article 10); bias testing with special category data (see Section 4) |
| **US: California** | CCPA as amended by the CPRA | Rights to know, delete, correct and opt out; rules on automated decision-making technology, risk assessments and cybersecurity audits, phasing in from 2026 |
| **US: federal and other states** | Sector laws (HIPAA, GLBA, COPPA), state privacy laws, the FTC Act | The FTC has ordered companies to delete models built on improperly obtained data (“algorithmic disgorgement”) |
| **Brazil, China, India** | LGPD; PIPL; Digital Personal Data Protection Act 2023 | Review of automated decisions (LGPD); transparency, refusal rights and transfer assessments (PIPL); consent-centred duties phasing in (DPDP) |` },
    { type: 'match', title: 'Which rule is this?', pairs: [
      ['Notify the supervisory authority within 72 hours', 'GDPR Article 33'],
      ['Sign an agreement before an AI vendor handles PHI', 'HIPAA business associate rules'],
      ['Never keep the card security code after authorisation', 'PCI DSS Requirement 3'],
      ['Remove 18 identifier types', 'HIPAA Safe Harbor'],
      ['Right not to be subject to solely automated significant decisions', 'GDPR Article 22'],
      ['Confirm scope at least every 12 months', 'PCI DSS Requirement 12'] ] },
    { type: 'scenario', title: 'The AI scribe', md: `A private hospital group operating in Germany and the United States plans an AI scribe. It records consultations, drafts clinical notes using a cloud-hosted model in the US, and lets patients settle bills by reading out their card details during the call.`,
      q: { q: 'Which approach BEST addresses the group’s privacy obligations?', o: ['Rely on the vendor’s ISO 27001 certification and standard terms, since the vendor processes the data and carries compliance responsibility for it', 'DPIA and HIPAA risk analysis; a BAA and GDPR processor terms with transfer safeguards; minimised model input; card payments taken outside the recording', 'Encrypt recordings and notes end to end, host the model in the EU for all patients, and treat all three regimes as satisfied by that design', 'Sign a BAA covering all patients, because HIPAA’s safeguards are stricter than the GDPR’s and so satisfy both regimes at once'], a: 1, b: 3,
        why: 'All three regimes apply: the GDPR for German patients (including the transfer to the US), HIPAA for US PHI and the vendor relationship, and PCI DSS for card data captured in calls. Accountability stays with the hospital group, encryption or hosting location alone doesn’t meet any regime, and HIPAA compliance doesn’t satisfy the GDPR.' } },
    { type: 'callout', kind: 'exam', title: 'Know what each regime is', md: `- **PCI DSS is a contractual industry standard**, not a law. Non-compliance leads to fines and sanctions through card brands and acquirers.
- **HIPAA applies to covered entities and business associates**, not to all health data everywhere.
- **The GDPR follows the person**, not the server: processing EU residents’ data with a model hosted elsewhere still falls within scope.
- The best answers **map data flows to every applicable regime** rather than picking one.` },
    { type: 'check', q: { q: 'A US health insurer wants a cloud LLM provider to summarise claims files containing PHI. What must be in place BEFORE any PHI is sent?', o: ['Written authorisation from every affected member, collected before each of their claims files is summarised', 'A business associate agreement, with the flow covered by the risk analysis and limited to the minimum necessary', 'Confirmation that the provider holds SOC 2 certification and encrypts all customer data at rest and in transit', 'Nothing further, because summarising claims is a payment activity that HIPAA permits without any agreement'], a: 1, b: 3,
      why: 'A vendor that receives or processes PHI on a covered entity’s behalf is a business associate and needs a BAA first. The risk analysis and minimum necessary standard also apply. Claims processing falls within payment and healthcare operations, so individual authorisation isn’t normally required, but the vendor relationship still needs a BAA. Certifications are useful evidence, not a substitute.' } }
  ]
};
