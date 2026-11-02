/* 2.1 · Section 3: AI governance vs IT governance; policies, standards and procedures */
module.exports = {
  title: 'What makes AI governance different, and the policy stack', covers: [2, 3],
  blocks: [
    { type: 'video', title: 'Governing something that learns', kicker: 'Module 2.1 · Video 3 of 4', scenes: [
      { t: 'title', kicker: 'Module 2.1 · AI governance', title: 'Governing something that learns', sub: 'How AI governance differs from IT governance, and the policies that make it real', icon: 'building',
        say: 'Most organisations already have IT governance, security policies and change control. So why does AI need anything new? | This video explains what is genuinely different about governing AI, and how to turn principles into policies, standards and procedures.' },
      { t: 'compare', title: 'IT governance and AI governance', labels: ['Behaviour', 'Change', 'Risks', 'Who’s involved'],
        cols: [{ h: 'Traditional IT', icon: 'server', k: 'neutral' }, { h: 'AI systems', icon: 'model', k: 'model' }],
        rows: [
          ['Deterministic: same input, same output', 'Probabilistic: outputs vary and can be wrong'],
          ['Changes when code is released', 'Changes as data, models and the world drift'],
          ['Availability, integrity, confidentiality', 'Plus bias, safety, explainability, IP and societal harm'],
          ['IT, security and the business', 'Plus data science, legal, ethics, HR and affected people'] ],
        say: 'Here is what changes. | Traditional software is deterministic: the same input gives the same output, and it can be fully specified and tested. AI is probabilistic: outputs vary, and some will be wrong. | Traditional systems change when someone releases new code. AI systems also change as data, models and the world drift, sometimes with no release at all. | IT risk focuses on confidentiality, integrity and availability. AI adds bias, safety, explainability, intellectual property and wider societal harm. | And AI governance needs more people at the table: data scientists, lawyers, ethicists, HR and, often, the people affected by the system.' },
      { t: 'bullets', title: 'What AI governance adds', items: [
          { icon: 'list', h: 'An inventory of AI use cases', d: 'You can’t govern what you don’t know about', k: 'data' },
          { icon: 'alert', h: 'Risk and impact assessment per use case', d: 'Proportionate to the harm a use case could cause', k: 'human' },
          { icon: 'cycle', h: 'Lifecycle controls', d: 'From data sourcing to monitoring and retirement', k: 'model' },
          { icon: 'users', h: 'Cross-functional decision-making', d: 'A committee that can approve, condition or reject', k: 'control' },
          { icon: 'eye', h: 'Continuous oversight', d: 'Monitoring, audits and reassessment, not one-off approval', k: 'neutral' } ],
        say: 'AI governance builds on IT governance rather than replacing it, and adds five things. | An inventory of every AI use case, because you can’t govern what you don’t know about. | Risk and impact assessment for each use case, proportionate to the harm it could cause. | Controls across the whole life cycle, from data sourcing and training through deployment, monitoring and retirement. | Cross-functional decision-making, usually a committee with the authority to approve, add conditions or reject. | And continuous oversight: monitoring, audits and reassessment, because a one-off approval doesn’t stay valid for a system that changes.' },
      { t: 'layers', title: 'From intent to action',
        layers: [
          { icon: 'flag', label: 'Policy', sub: 'Management intent. Mandatory, high-level, rarely changes', k: 'human' },
          { icon: 'ruler', label: 'Standards', sub: 'Mandatory, specific requirements that make the policy measurable', k: 'model' },
          { icon: 'list', label: 'Procedures', sub: 'Step-by-step instructions for carrying out a task', k: 'data' },
          { icon: 'bulb', label: 'Guidelines', sub: 'Recommended good practice; advisory, not mandatory', k: 'control' } ],
        say: 'Governance becomes real through a hierarchy of documents. | At the top, a policy states management’s intent. It is mandatory, high level, approved by senior leadership, and rarely changes. For example: AI may only be used in ways that are lawful, assessed for risk, and subject to appropriate human oversight. | Standards make the policy specific and measurable, and are also mandatory. For example: every high-risk AI system must have a completed impact assessment and pass adversarial testing before release. | Procedures are step-by-step instructions, such as how to submit a new AI use case for approval. | And guidelines are recommended good practice, such as tips for writing safe prompts. They are advisory, not mandatory.' },
      { t: 'bullets', title: 'A typical AI policy set', layout: 'grid', cols: 2, items: [
          { icon: 'flag', h: 'AI governance policy', d: 'Principles, scope, roles, decision rights', k: 'human' },
          { icon: 'chat', h: 'Acceptable use of AI', d: 'Approved tools; what data may be entered', k: 'model' },
          { icon: 'alert', h: 'AI risk management standard', d: 'Tiers, assessments, approvals, reviews', k: 'threat' },
          { icon: 'cycle', h: 'AI lifecycle standard', d: 'Data, testing, deployment, monitoring', k: 'data' },
          { icon: 'building', h: 'Third-party AI standard', d: 'Due diligence and contract terms', k: 'neutral' },
          { icon: 'siren', h: 'AI incident procedure', d: 'Reporting, triage, containment', k: 'control' } ],
        say: 'Most organisations end up with a similar set of documents. | An AI governance policy sets principles, scope, roles and decision rights. | An acceptable use policy tells staff which AI tools are approved and what data they may enter into them. | An AI risk management standard defines risk tiers, required assessments, approval routes and review frequency. | An AI lifecycle standard sets requirements for data, testing, deployment and monitoring. | A third-party AI standard covers due diligence and contract terms for AI suppliers. | And an AI incident procedure explains how to report, triage and contain AI-specific incidents.' },
      { t: 'summary', items: ['AI is probabilistic, drifts, and adds new kinds of harm', 'AI governance extends IT governance; it doesn’t replace it', 'Policy states intent; standards make it measurable', 'Procedures say how; guidelines advise'],
        say: 'To recap. | AI is probabilistic, it drifts, and it introduces new kinds of harm. | So AI governance extends existing IT, data, privacy and security governance, rather than replacing them. | A policy states mandatory intent, and standards make it specific and measurable. | Procedures explain how to do things, and guidelines offer advice.' } ] },
    { type: 'text', md: `### Why AI needs its own governance
AI governance is not a new silo. It builds on IT governance (such as COBIT), information security management (such as ISO/IEC 27001), privacy programmes and data governance. But AI changes several assumptions those programmes rely on:

| Assumption in traditional IT | Why AI breaks it | Governance response |
|---|---|---|
| Behaviour is fully specified by code | Behaviour is learned from data and is probabilistic | Evaluate statistically; define acceptable error rates; require human oversight where errors matter |
| Systems change only through releases | Data, concept and behavioural drift change outcomes without releases | Continuous monitoring with reassessment triggers |
| Testing can cover the requirements | Inputs are open-ended; emergent and adversarial behaviour exists | Red teaming, adversarial testing, guardrails, staged rollout |
| Risk is mainly CIA | Bias, safety, explainability, IP, misinformation, societal impact | Broader risk taxonomy and impact assessments |
| Ownership sits with IT | Value and harm sit with the business and with affected people | Cross-functional decision rights; named business owners |
| Suppliers provide fixed products | Hosted models update silently; training data is opaque | Version pinning, contractual notification rights, AI-specific due diligence |

Effective AI governance is therefore **risk-based** (more scrutiny for higher-impact uses), **lifecycle-based** (controls at every stage, not just at approval), and **cross-functional** (legal, privacy, security, risk, ethics, HR and business owners share decisions).

### Policies, standards, procedures and guidelines
The classic document hierarchy applies, and ISC2 exams expect you to know it precisely:

- **Policy:** a high-level statement of management intent and direction. Mandatory. Approved by senior management or the board. Technology-neutral and stable. *Example: “The organisation will use AI only in ways that are lawful, risk-assessed, transparent to affected people and subject to appropriate human oversight.”*
- **Standard:** a mandatory, specific requirement that supports a policy and makes it measurable. *Example: “All Tier 3 AI systems must complete an impact assessment, a bias evaluation and an adversarial test before production.”*
- **Baseline:** a minimum level of configuration or control, often expressed as settings. *Example: “All AI gateways log prompts and completions for 90 days with personal data masked.”*
- **Procedure:** detailed, step-by-step instructions for performing a task consistently. *Example: “How to register a new AI use case in the inventory.”*
- **Guideline:** recommended practice that is advisory, not mandatory. *Example: “Tips for writing prompts that avoid entering personal data.”*

### What an AI acceptable use policy should cover
Generative AI made acceptable use urgent, because every employee can now use powerful AI tools in a browser. A good acceptable use policy:
1. Lists **approved tools** and explains how to request new ones.
2. Defines **data rules**: which classifications may be entered into which tools (for example, no confidential or personal data in consumer tools; approved enterprise tools may process internal data).
3. Requires **human review** of AI output before it is relied on, published or sent to customers.
4. Sets **transparency** expectations: when AI use must be disclosed to colleagues, customers or the public.
5. Prohibits specific uses, such as making employment decisions solely with AI, or generating content that impersonates real people.
6. Explains **how to report** problems, including suspected data leaks or harmful outputs.
7. States **consequences** of non-compliance and is acknowledged by staff.

Policies should be reviewed at least annually and whenever regulation, technology or the organisation’s use of AI changes significantly. Because AI moves fast, many organisations keep the policy stable and update the *standards* and *approved tool lists* more frequently.`, },
    { type: 'match', title: 'Policy, standard, procedure or guideline?', pairs: [
      ['“AI will be used only in lawful, risk-assessed and overseen ways.”', 'Policy'],
      ['“High-risk AI must pass adversarial testing before release.”', 'Standard'],
      ['“Step 1: open the intake form. Step 2: attach the impact assessment…”', 'Procedure'],
      ['“Consider rewording prompts to avoid including customer names.”', 'Guideline'] ] },
    { type: 'scenario', title: 'The policy that never changes anything', md: `A bank’s board approved a well-written “Responsible AI Policy” eighteen months ago. An internal review finds that no AI system has been assessed against it, nobody knows which systems count as “high impact”, and developers say they don’t know what the policy requires them to do.`,
      q: { q: 'What is MOST likely missing?', o: ['A longer, more detailed policy that spells out every rule for each type of AI system', 'Standards and procedures that define tiers, required assessments and approval steps, with owners', 'A new set of ethical principles agreed by the board and published alongside the existing policy', 'A public statement about the bank’s commitment to AI ethics, signed by the chief executive officer'], a: 1, b: 3,
        why: 'Policies state intent but are not directly actionable. Standards make requirements specific and measurable, and procedures tell people exactly what to do. Without them, and without owners, the policy has no operational effect.' } },
    { type: 'check', q: { q: 'Which characteristic of AI systems MOST justifies continuous monitoring and reassessment rather than one-time approval?', o: ['AI systems are usually hosted in the cloud, where providers change the infrastructure frequently', 'Their behaviour can change through data, concept and model drift even without a code release', 'AI systems cost more to run than traditional systems, so their budgets need regular review', 'AI systems are approved once for a fixed purpose, so reassessment only matters when that purpose changes'], a: 1, b: 2,
      why: 'Unlike deterministic software, AI outcomes change as data and the world change, and hosted models can be updated by providers. A one-time approval quickly goes stale, so governance must be continuous.' } }
  ]
};
