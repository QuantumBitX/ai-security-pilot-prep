/* 2.6 · Section 4: internal and external audits */
module.exports = {
  title: 'Internal and external AI audits', covers: [6],
  blocks: [
    { type: 'video', title: 'Who checks the checkers?', kicker: 'Module 2.6 · Video 4 of 4', scenes: [
      { t: 'title', kicker: 'Module 2.6 · Accountability and audit', title: 'Who checks the checkers?', sub: 'Internal and external audits for compliance, bias, drift and business outcomes', icon: 'audit',
        say: 'Policies, assessments and controls all claim that AI is under control. Audits test whether those claims are true. | This video covers internal and external AI audits, what they examine, how they work, and what makes AI harder to audit than ordinary systems.' },
      { t: 'compare', title: 'Internal and external audits', labels: ['Performed by', 'Purpose', 'Examples'],
        cols: [{ h: 'Internal audit', icon: 'building', k: 'human' }, { h: 'External audit', icon: 'globe', k: 'model' }],
        rows: [
          ['Internal audit, independent of the teams audited', 'Independent third parties, certification bodies, notified bodies'],
          ['Assurance to the board; drive improvement', 'Certification, legal requirements, public trust'],
          ['ISO/IEC 42001 internal audit; AI control reviews', '42001 certification; bias audits of hiring tools; AI Act conformity assessment'] ],
        say: 'Audits come in two kinds. | Internal audits are performed by the organisation’s internal audit function, which must be independent of the teams it audits. External audits are performed by independent third parties, such as certification bodies, specialist auditors or, for some high-risk AI products, notified bodies. | Internal audit gives the board assurance and drives improvement. External audit supports certification, legal requirements and public trust. | Examples include the internal audits ISO forty-two thousand and one requires, certification audits against it, independent bias audits of hiring tools required in some jurisdictions, and conformity assessments under the AI Act.' },
      { t: 'bullets', title: 'What AI audits examine', layout: 'grid', cols: 2, items: [
          { icon: 'gavel', h: 'Compliance', d: 'Laws, policies, contracts, documentation', k: 'neutral' },
          { icon: 'scale', h: 'Bias and fairness', d: 'Outcomes and error rates across groups', k: 'human' },
          { icon: 'thermo', h: 'Drift and performance', d: 'Still valid? Is monitoring working?', k: 'data' },
          { icon: 'shield', h: 'Security', d: 'Controls, testing results, incident handling', k: 'threat' },
          { icon: 'chart', h: 'Business outcomes', d: 'Benefits delivered, costs, unintended effects', k: 'control' },
          { icon: 'list', h: 'Governance process', d: 'Inventory complete; approvals actually followed', k: 'model' } ],
        say: 'AI audits can examine six areas. | Compliance with laws, policies, contracts and documentation requirements. | Bias and fairness, by testing outcomes and error rates across groups. | Drift and performance: is the system still valid, and is monitoring actually catching problems? | Security: whether controls work, what testing found, and how incidents were handled. | Business outcomes: whether the system delivers the benefits that justified it, at acceptable cost, without unintended effects. | And the governance process itself: is the inventory complete, and were approvals, assessments and reviews actually followed?' },
      { t: 'flow', title: 'How an AI audit runs',
        nodes: [
          { id: 'plan', x: 200, y: 330, icon: 'target', label: 'Plan and scope', sub: 'risk-based', k: 'human', w: 260 },
          { id: 'ev', x: 560, y: 330, icon: 'archive', label: 'Gather evidence', sub: 'artefacts, logs, interviews', k: 'data', w: 290 },
          { id: 'test', x: 950, y: 330, icon: 'audit', label: 'Test', sub: 'controls and outcomes', k: 'model', w: 270 },
          { id: 'rep', x: 1330, y: 330, icon: 'doc', label: 'Report', sub: 'findings, severity, owners', k: 'control', w: 280 },
          { id: 'fix', x: 1330, y: 690, icon: 'tool', label: 'Remediate', k: 'neutral', w: 260 },
          { id: 'fol', x: 950, y: 690, icon: 'check', label: 'Follow up', sub: 'verify the fix', k: 'control', w: 260 } ],
        edges: [{ from: 'plan', to: 'ev', k: 'human' }, { from: 'ev', to: 'test', k: 'data' }, { from: 'test', to: 'rep', k: 'model' }, { from: 'rep', to: 'fix', k: 'control' }, { from: 'fix', to: 'fol', k: 'neutral' }],
        steps: [
          { show: 'plan', hi: 'plan' },
          { show: 'ev plan-ev', flow: 'plan-ev', hi: 'ev' },
          { show: 'test ev-test', flow: 'ev-test', hi: 'test' },
          { show: 'rep test-rep', flow: 'test-rep', hi: 'rep' },
          { show: 'fix fol rep-fix fix-fol', flow: 'rep-fix fix-fol', hi: 'fol' } ],
        say: 'An audit follows a familiar process, with AI-specific techniques. Planning sets the scope based on risk, usually focusing on high-tier systems and recent changes. | Evidence gathering collects artefacts, logs and monitoring data, and interviews owners and reviewers. | Testing checks that controls work, by sampling decisions, re-running evaluations, testing for bias and verifying that monitoring alerts fire. | The report rates each finding by severity and assigns an owner and a deadline. | Owners remediate, and the auditor follows up to verify the fix actually works.' },
      { t: 'bullets', title: 'Why AI is harder to audit', items: [
          { icon: 'mask', h: 'Opacity', d: 'Vendor models are black boxes: secure audit rights by contract', k: 'neutral' },
          { icon: 'dice', h: 'Non-determinism', d: 'Re-run tests many times and assess rates', k: 'model' },
          { icon: 'fingerprint', h: 'Data access', d: 'Testing needs data; protect privacy while sampling', k: 'data' },
          { icon: 'cycle', h: 'A moving target', d: 'Systems drift; move towards continuous auditing', k: 'human' },
          { icon: 'cap', h: 'Auditor skills', d: 'AI audits need technical and ethical expertise', k: 'control' } ],
        say: 'AI raises particular audit challenges. | Opacity: vendor models are black boxes, so audit rights and evidence must be secured in the contract. | Non-determinism: the same test can pass and fail, so tests are run many times and results assessed as rates. | Data access: testing for bias or leakage needs data, which must be handled with privacy safeguards. | A moving target: systems drift between audits, which is pushing organisations towards continuous auditing using monitoring data. | And skills: auditors need enough technical and ethical expertise to challenge AI teams effectively.' },
      { t: 'summary', items: ['Internal audit assures the board; external audit certifies and reassures', 'Scope: compliance, bias, drift, security, outcomes, governance', 'Plan, gather evidence, test, report, remediate, follow up', 'Opacity, randomness, data, drift and skills make AI harder'],
        say: 'To recap. | Internal audit gives the board independent assurance; external audit supports certification, legal requirements and public trust. | AI audits examine compliance, bias, drift, security, business outcomes and the governance process. | They follow the classic cycle: plan, gather evidence, test, report, remediate and follow up. | And opacity, non-determinism, data access, drift and skills make AI harder to audit, so plan for them.' } ] },
    { type: 'text', md: `### Internal and external audits
| | Internal audit | External audit |
|---|---|---|
| Performed by | The organisation’s internal audit function (the third line), independent of the audited teams | Independent third parties: certification bodies, specialist assurance firms, regulators’ appointees, notified bodies |
| Reports to | The board or audit committee | The organisation, and sometimes regulators or the public |
| Purpose | Independent assurance that governance, risk management and controls work; improvement | Certification (for example ISO/IEC 42001), legally required audits, conformity assessment, customer assurance |
| Examples | ISO/IEC 42001 clause 9.2 internal audits; reviews of AI controls and model risk | ISO/IEC 42001 certification audits (by bodies meeting ISO/IEC 42006); bias audits of automated employment decision tools in New York City; conformity assessment of certain high-risk AI systems under the EU AI Act |

Independence is essential: the team that built or operates a system can test it (first line), and risk or compliance teams can review it (second line), but neither is an **audit**.

### Audit scopes for AI
- **Compliance:** legal requirements (AI Act roles and duties, GDPR, sector rules), internal policies and standards, contractual commitments, and documentation completeness.
- **Bias and fairness:** recomputing fairness metrics on representative samples, reviewing data and features for proxies, and checking that monitoring tracks group outcomes. NYC Local Law 144, for example, requires annual independent bias audits of automated employment decision tools, with impact ratios published.
- **Drift and performance:** comparing current performance with validated baselines, checking drift thresholds, and verifying that alerts reach owners and lead to action.
- **Security:** reviewing threat models, test and red-team results, vulnerability management, access controls for models and data, and AI incident handling.
- **Business outcomes:** whether the system delivers the benefits in its business case, at acceptable cost, without harmful side effects (for example, rising complaint rates).
- **Governance process:** inventory completeness (reconciled against discovery data), tiering accuracy, assessments completed before deployment, sign-offs by the right authority, exception management, and human oversight in practice (for example, override rates).

### Evidence
Typical evidence includes the AI inventory and AIBOMs; tier decisions; risk and impact assessments; model cards and system documentation; test, evaluation and red-team reports; decision logs and exception registers; monitoring dashboards and alert histories; operational logs of prompts, outputs, tool calls and human interventions (with privacy safeguards); change records; incident records; and training records for people with oversight roles.

### Audit techniques for AI
- **Sampling and re-performance:** select decisions and trace them through logs, including any human review, and check the outcome against policy.
- **Independent re-testing:** re-run evaluation suites, fairness metrics and adversarial tests, ideally with the auditor’s own test data.
- **Control testing:** verify that kill switches, overrides and alerts actually work.
- **Reconciliation:** compare the inventory with discovery data to find unregistered AI.
- **Interviews and walkthroughs:** confirm that people with oversight roles understand and exercise their authority.

### Challenges and responses
| Challenge | Response |
|---|---|
| Opaque vendor models | Contractual audit rights, independent assurance reports, model and system cards, and black-box testing of outputs |
| Non-determinism | Repeat tests; report rates and confidence intervals; pin versions during testing |
| Privacy of test data | Minimise, pseudonymise, use secure environments, and involve the DPO |
| Drift between audits | **Continuous auditing** using monitoring data and automated control checks, supplemented by periodic deep reviews |
| Auditor competence | Training, specialist co-sourcing and multidisciplinary audit teams |`, },
    { type: 'match', title: 'Which audit scope?', pairs: [
      ['Recalculating impact ratios on last quarter’s hiring decisions', 'Bias and fairness'],
      ['Checking that every production model appears in the inventory', 'Governance process'],
      ['Verifying that drift alerts reached the owner and were acted on', 'Drift and performance'],
      ['Comparing promised cost savings with actual results', 'Business outcomes'],
      ['Reviewing red-team findings and their remediation', 'Security'] ] },
    { type: 'callout', kind: 'exam', title: 'Independence and evidence', md: `An audit must be **independent** of the activity audited, and conclusions must rest on **evidence**, not assurances. If an option has the development team “audit” its own model, or relies on a vendor’s marketing claims, it is not the best answer. Look for independent testing, sampled evidence, and tracked remediation.` },
    { type: 'check', q: { q: 'Which of these provides the MOST independent assurance that an AI hiring tool is free of unlawful bias?', o: ['The data science team’s own fairness report, which uses the same data the tool was trained on', 'The vendor’s signed statement that the tool is unbiased, backed by its published model card', 'An independent audit that recomputes outcome metrics on representative data and checks for proxies', 'A survey of recruiters who use the tool every day and can report whether outcomes seem fair'], a: 2, b: 6,
      why: 'Independent re-testing on representative data, including proxy analysis, gives the strongest assurance. Self-assessment and vendor claims lack independence, and user surveys don’t measure outcomes.' } }
  ]
};
