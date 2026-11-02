/* 6.3 · Section 1: third-party vendor risks, certifications and assessment reports */
module.exports = {
  title: 'Third-party AI vendor risk and assurance evidence', covers: [1],
  blocks: [
    { type: 'video', title: 'Reading the evidence, not the logo', kicker: 'Module 6.3 · Video 1 of 4', scenes: [
      { t: 'title', kicker: 'Module 6.3 · AI supply chain', title: 'Reading the evidence, not the logo', sub: 'Third-party AI vendor risks, certifications and assessment reports', icon: 'audit',
        say: 'Most organisations’ AI depends on vendors: model providers, AI features inside existing software, and agents connected to internal systems. Vendors offer certificates and reports as proof of security, but a logo proves little until you read what it covers. | This video covers third-party AI vendor risks, and how to read assessment reports critically, building on the due diligence in Module 2.5.' },
      { t: 'bullets', title: 'Where AI vendor risk hides', layout: 'grid', cols: 2, items: [
          { icon: 'sparkle', h: 'Embedded AI features', d: 'New AI in tools you already use', k: 'model' },
          { icon: 'link', h: 'Fourth parties', d: 'Your vendor’s own model providers', k: 'data' },
          { icon: 'key', h: 'Integration tokens', d: 'Vendor agents inside your systems', k: 'threat' },
          { icon: 'layers', h: 'Shared foundations', d: 'Many vendors, the same few models', k: 'neutral' },
          { icon: 'building', h: 'Fragile suppliers', d: 'Acquisitions, pivots, shutdowns', k: 'human' },
          { icon: 'globe', h: 'Jurisdiction', d: 'Where data, staff and laws sit', k: 'control' } ],
        say: 'AI vendor risk often hides in six places. | Embedded AI features: vendors add AI to software you already use, sometimes switched on by default, changing where your data goes without a new contract. | Fourth parties: your vendor may send your data to its own model providers, so their security becomes your risk too. | Integration tokens: AI agents and chat tools connected to your email, CRM or files hold tokens that can reach your data. | Shared foundations: many vendors use the same few foundation models, so one provider’s outage or flaw hits several suppliers at once. | Fragile suppliers: AI start-ups pivot, get acquired or shut down, and your data may move with them. | And jurisdiction: where data is processed, where support staff sit, and which laws apply.' },
      { t: 'timeline', title: 'When an AI vendor’s tokens are stolen', events: [
          { y: 'Aug 8, 2025', h: 'Tokens abused', d: 'Stolen tokens for an AI chat agent’s CRM link' },
          { y: 'Aug 8–18', h: 'Bulk export', d: 'Records from many customer organisations' },
          { y: 'Same period', h: 'Secrets hunted', d: 'Exports searched for keys and passwords' },
          { y: 'Aug 20', h: 'Access revoked', d: 'Vendor and CRM platform cut the link' },
          { y: 'Afterwards', h: 'Customers rotate', d: 'Exposed keys rotated; connected apps reviewed' } ],
        say: 'Here is a real example of integration risk, from August 2025. | A threat actor used stolen OAuth tokens belonging to Salesloft Drift, an AI chat agent that customers had connected to their Salesforce CRM. | With those tokens, the actor exported large volumes of CRM data from many organisations. Google’s threat intelligence team said more than seven hundred were potentially affected. | The exported records were searched for secrets, such as cloud access keys and passwords, to reach further systems. | On the twentieth of August, the vendor revoked the connections, and the CRM platform removed the app from its marketplace. | Customers had to rotate any credentials stored in their records, and review every connected app. The lesson: scope each integration’s access tightly, monitor what it does, and keep secrets out of business records.' },
      { t: 'code', title: 'Reading a SOC 2 report', file: 'soc2-review-notes.txt',
        code: `Report: SOC 2 Type II, AcmeAI platform
Period: 1 Oct 2025 to 30 Sep 2026
Opinion: unmodified (no qualifications)
In scope: inference API, admin console
Not in scope: fine-tuning service (we use it)
Carved out: cloud host, model provider
Exceptions: 2 (late access reviews)
CUECs: SSO, admin review, key rotation
Bridge letter: covers to 31 Dec 2026`,
        hl: [null, [1, 3], [4, 5], [6, 6], [7, 8], [9, 9]],
        notes: [
          { h: 'Read the whole report', d: 'The opinion page is the start, not the end.' },
          { h: 'Type, period and opinion', d: 'Type II tests operation over time. Unmodified means no qualifications.', k: 'control' },
          { h: 'Scope', d: 'The service you actually use must be in scope.', k: 'threat' },
          { h: 'Carve-outs', d: 'Excluded suppliers need their own evidence.', k: 'data' },
          { h: 'Exceptions and your duties', d: 'Read management’s responses. CUECs are controls you must run.', k: 'human' },
          { h: 'The gap since the period', d: 'A bridge letter is the vendor’s statement, not an audit.', k: 'neutral' } ],
        say: 'Here are an assessor’s notes on a vendor’s SOC 2 Type Two report. Read the whole report, not just the opinion. | Type Two means controls were tested over a period, here twelve months, and an unmodified opinion means the auditor had no qualifications. | But the scope covers the inference service and console, not the fine-tuning service this customer actually uses. That gap needs other evidence. | The cloud host and the model provider are carved out, so you need their reports too. | Read the exceptions and management’s responses. And note the complementary user entity controls: controls the report assumes you run, such as single sign-on. | Finally, the bridge letter covering the months since the period ended is the vendor’s own statement, not an audit.' },
      { t: 'summary', items: ['AI vendor risk hides in embedded features, fourth parties and integrations', 'Read each report’s scope, period, exceptions and carve-outs', 'Run the controls the vendor expects you to run (CUECs)', 'Monitor vendors and every integration’s access continuously'],
        say: 'To recap. | AI vendor risk hides in embedded features, fourth parties, integrations, shared foundations, fragile suppliers and jurisdiction. | Read every report’s scope, period, exceptions and carve-outs, not just its conclusion. | Run the controls the vendor expects you to run. | And monitor vendors, and every integration’s access, continuously.' } ] },
    { type: 'text', md: `### AI-specific vendor risks
| Risk | What to do |
|---|---|
| **Embedded AI features**, added to existing products and sometimes on by default | Contract for advance notice and the right to keep new AI features off; review admin settings after releases |
| **Fourth parties**: the vendor’s own model providers and sub-processors | Identify them and their regions; obtain their assurance; flow terms down |
| **Integration and agent access**: OAuth tokens and API keys for email, CRM, files and code | Inventory connected apps; least-privilege scopes; monitor API activity; revoke unused tokens; keep secrets out of records |
| **Shared foundations**: many vendors on the same few models and clouds | Map dependencies; plan for correlated outages and flaws (Module 5.7) |
| **Fragile suppliers** that pivot, are acquired or close | Check financial health; contract for data return, deletion and transition |

### Reading assurance evidence
| Evidence | What it shows | What to check |
|---|---|---|
| **SOC 2 Type II** | Controls, against the AICPA Trust Services Criteria, operated effectively over a period, typically 6 to 12 months. **Type I** covers design at a point in time only | Scope (system description); opinion (unmodified or modified); exceptions and responses; **carved-out** subservice organisations; **CUECs**; any **bridge letter**, which is unaudited |
| **ISO/IEC 27001 or 42001 certificate** | An audited management system | Scope statement; an **accredited** certification body (**ISO/IEC 42006**, July 2025, adds requirements for bodies certifying 42001); validity within the three-year cycle; the 27001 Statement of Applicability |
| **CSA STAR for AI** (October 2025) | **Level 1**: the vendor’s self-assessment against the AI Controls Matrix (Module 2.5). **Level 2**: independent assurance based on ISO/IEC 42001 | Which level; self-assessments aren’t verified |
| **Pen test and AI red-team reports** | Weaknesses found at one point in time | Date and version tested; whether prompts, tools, agents and data leakage were in scope (for example, mapped to the OWASP Top 10 for LLM Applications or MITRE ATLAS); severity, remediation and retest; tester independence. A one-page attestation letter isn’t a report |
| **Model and system cards** | The vendor’s own evaluations, intended use and limitations | Coverage; confirm what matters with your own tests (Module 6.4). Under the EU AI Act, providers of general-purpose AI models must give integrators documentation (Section 2) |

Certification shows that a managed system exists; it doesn’t prove that a particular model is secure. **Trust centres** make documents easier to obtain, often under an NDA, but don’t change what they show.

### Tiering and continuous monitoring
Set assessment depth by **tier** (Module 2.3): data sensitivity, the access and autonomy granted, criticality and regulatory exposure. Between reviews, watch for certificate expiry and new report periods, sub-processor and fourth-party changes, new AI features and model deprecations, breach disclosures and advisories, and **integration activity** such as unusual API volumes, new scopes and unused tokens.` },
    { type: 'scenario', title: 'The well-certified assistant', md: `A bank is assessing an AI assistant that will connect to its CRM and email. The vendor’s trust centre shows an ISO/IEC 42001 certificate, a SOC 2 Type II report and a “clean” penetration test letter. On reading them, the security team finds that the 42001 scope covers only the vendor’s research division, the SOC 2 report carves out the model provider, and the test letter is 20 months old, from before the email integration existed.`,
      q: { q: 'What is the BEST next step?', o: ['Accept the evidence, since three independent sources together outweigh the gaps in each', 'Close each gap: model provider reports, current AI testing and in-scope certification', 'Reject the vendor outright, since any gap in assurance shows a dishonest supplier', 'Ask the vendor to sign a statement confirming its controls also cover the assistant'], a: 1, b: 1,
        why: 'Each document has a gap that matters for this use: the wrong certificate scope, a carved-out model provider and a stale test that misses the email integration. Close those gaps with in-scope evidence, or with compensating controls and contract terms. Accepting ignores the gaps, rejecting is disproportionate, and a signed statement adds no independent assurance.' } },
    { type: 'callout', kind: 'exam', title: 'Assurance evidence questions', md: `The best answer **reads the evidence**: the right **scope**, **period** and **service**, **independent** where it matters, and **current** for the AI features in use. A logo, a self-assessment or a bridge letter is weaker than an in-scope Type II report or a recent, AI-specific test. For integrations, think **least-privilege tokens and monitoring**.` },
    { type: 'check', q: { q: 'An AI vendor’s SOC 2 Type II report lists complementary user entity controls, including enforcing single sign-on and reviewing administrator access each quarter. What does this mean for the customer?', o: ['The vendor’s auditor performs these controls on the customer’s behalf each quarter', 'The customer must operate these controls for the report’s assurance to apply to it', 'These are optional suggestions that the customer can safely choose to ignore', 'The report is invalid until the vendor implements these controls on its own side'], a: 1, b: 1,
      why: 'CUECs are controls the vendor’s control design assumes the customer operates. If the customer doesn’t run them, the assurance in the report doesn’t fully hold for that customer.' } }
  ]
};
