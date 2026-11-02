/* 6.5 · Section 1: triage of assessment findings (severity, exploitability, reproducibility, business impact) */
module.exports = {
  title: 'Triaging assessment findings', covers: [1],
  blocks: [
    { type: 'video', title: 'Which findings matter most?', kicker: 'Module 6.5 · Video 1 of 5', scenes: [
      { t: 'title', kicker: 'Module 6.5 · Findings and reporting', title: 'Which findings matter most?', sub: 'Triage by severity, exploitability, reproducibility and impact', icon: 'filter',
        say: 'A good assessment produces dozens of findings, and they are not equal. Some need fixing before launch; others belong on a backlog. Triage decides which is which, quickly and consistently. | This video covers how to triage AI assessment findings by severity, exploitability, reproducibility and business impact.' },
      { t: 'bullets', title: 'Six triage factors', layout: 'grid', cols: 2, items: [
          { icon: 'alert', h: 'Severity', d: 'The worst credible consequence', k: 'threat' },
          { icon: 'bolt', h: 'Exploitability', d: 'Skill, access and effort needed', k: 'human' },
          { icon: 'cycle', h: 'Reproducibility', d: 'Success rate across attempts', k: 'data' },
          { icon: 'money', h: 'Business impact', d: 'Customers, money, law, reputation', k: 'model' },
          { icon: 'users', h: 'Reach', d: 'One user, one tenant or everyone', k: 'neutral' },
          { icon: 'eye', h: 'Detectability', d: 'Would monitoring notice?', k: 'control' } ],
        say: 'Six factors drive AI triage. | Severity: the worst credible consequence, such as data exfiltration or an unauthorised payment. | Exploitability: how much skill, access and effort an attacker needs. Can an anonymous user do it, or only an insider? | Reproducibility: how often it works. For AI, that is a success rate across repeated attempts, not a yes or a no. | Business impact: the effect on customers, money, legal obligations and reputation. | Reach: whether it affects one user, one tenant, or every user. | And detectability: whether monitoring would notice it happening.' },
      { t: 'flow', title: 'From raw finding to tracked fix',
        nodes: [
          { id: 'val', x: 230, y: 330, icon: 'check', label: 'Validate', sub: 'reproduce; rule out test error', k: 'control', w: 320 },
          { id: 'dup', x: 700, y: 330, icon: 'copy', label: 'Deduplicate', sub: 'one root cause, one finding', k: 'neutral', w: 320 },
          { id: 'rate', x: 1200, y: 330, icon: 'ruler', label: 'Rate', sub: 'severity, exploitability, rate', k: 'threat', w: 330 },
          { id: 'prio', x: 1200, y: 690, icon: 'flag', label: 'Prioritise', sub: 'impact, reach, risk appetite', k: 'human', w: 320 },
          { id: 'own', x: 700, y: 690, icon: 'user', label: 'Assign', sub: 'owner, deadline, interim control', k: 'data', w: 330 },
          { id: 'trk', x: 230, y: 690, icon: 'list', label: 'Track to closure', sub: 'fix, retest, close', k: 'model', w: 300 } ],
        edges: [{ from: 'val', to: 'dup', k: 'control' }, { from: 'dup', to: 'rate', k: 'neutral' }, { from: 'rate', to: 'prio', k: 'threat' }, { from: 'prio', to: 'own', k: 'human' }, { from: 'own', to: 'trk', k: 'data' }],
        steps: [
          { show: 'val', hi: 'val' },
          { show: 'dup val-dup', flow: 'val-dup', hi: 'dup' },
          { show: 'rate dup-rate', flow: 'dup-rate', hi: 'rate' },
          { show: 'prio rate-prio', flow: 'rate-prio', hi: 'prio' },
          { show: 'own prio-own', flow: 'prio-own', hi: 'own' },
          { show: 'trk own-trk', flow: 'own-trk', hi: 'trk', mark: { trk: 'ok' } } ],
        say: 'Triage turns raw findings into tracked fixes in six steps. First, validate: reproduce the finding, and rule out test errors, such as a misconfigured staging environment or an over-generous automated judge. | Deduplicate: many variants often share one root cause, so group them into one finding, with the variants kept as evidence. | Rate the finding’s severity, exploitability and success rate. | Prioritise, by weighing business impact and reach against your risk appetite. | Assign an owner, a deadline linked to the priority, and an interim control if the fix will take time. | And track the finding to closure: fix it, retest it, and close it only when the retest passes.' },
      { t: 'code', title: 'A triage record', file: 'finding-F07.yaml',
        code: `finding: F-07 indirect injection -> refund tool
severity: high (unauthorised refunds)
exploitability: any customer; one email needed
reproducibility: 31 of 100 attempts (31%)
business impact: direct loss; regulator interest
reach: every customer mailbox the agent reads
detected: no alert raised during testing
priority: P1, fix before launch
owner: payments agent team; retest by 21 Nov`,
        hl: [null, [1, 2], [3, 4], [5, 6], [7, 7], [8, 9]],
        notes: [
          { h: 'One record per finding', d: 'Consistent, traceable decisions.' },
          { h: 'What, and how bad', d: 'The finding and its worst credible consequence.', k: 'threat' },
          { h: 'How easy, how often', d: 'Anyone can try; it works almost a third of the time.', k: 'human' },
          { h: 'Impact and reach', d: 'Direct loss, regulatory interest, every mailbox.', k: 'model' },
          { h: 'Not detected', d: 'Silence raises the priority.', k: 'data' },
          { h: 'Decision', d: 'Priority, owner and a retest date.', k: 'control' } ],
        say: 'Here is a triage record for one finding. Every finding gets one, so decisions are consistent and traceable. | Finding F-07: an instruction hidden in a customer email can make the support agent call its refund tool. Severity is high, because the result is an unauthorised refund. | It is easy to exploit, because any customer can send an email. And it is reproducible: it worked in thirty-one of a hundred attempts. | The business impact is direct financial loss and regulatory interest, and it reaches every mailbox the agent reads. | No alert fired during testing, which raises the priority further. | So it is priority one: fix before launch, with a named owner and a retest date.' },
      { t: 'summary', items: ['Weigh severity, exploitability, reproducibility, impact, reach and detection', 'Validate and deduplicate before rating', 'Use a documented rubric; record the reasoning', 'Assign owners and deadlines; close only after a retest'],
        say: 'To recap. | Weigh severity, exploitability, reproducibility, business impact, reach and detectability. | Validate and deduplicate findings before rating them. | Use a documented rubric, and record the reasoning behind each priority. | And assign owners and deadlines, closing findings only after a passing retest.' } ] },
    { type: 'text', md: `### Triage factors for AI findings
| Factor | Question | AI-specific notes |
|---|---|---|
| **Severity** | What is the worst credible consequence? | Agency raises severity: a finding that triggers actions or reaches data outranks one that only produces text |
| **Exploitability** | Who can do it, with what access, skill and effort? | Natural-language attacks need little skill, and indirect injection needs no access to the system at all |
| **Reproducibility** | How often does it work? | Report a success rate over many attempts, with settings; even 5% is frequent at scale (Module 6.4) |
| **Business impact** | What does it cost customers and the organisation? | Include regulatory exposure, such as personal data or a high-risk system under the EU AI Act |
| **Reach** | One user, one tenant or everyone? | Shared memory, indexes or caches can spread one injection to many users |
| **Detectability** | Would monitoring notice? | Undetected attacks raise priority (Module 5.3) |

### Scoring and priority
Generic scores such as **CVSS** capture some of this, but miss AI-specific factors such as non-determinism and agency. Use them as inputs, alongside emerging AI scoring such as **OWASP AIVSS** (Module 5.4), and a documented internal rubric that maps factors to priorities:
| Priority | Typical profile | Response |
|---|---|---|
| **P1** | Severe impact, easy to exploit, reproducible | Fix or block before launch; interim controls now |
| **P2** | Severe but hard to exploit, or moderate and easy | Fix within a set period; monitor for attempts |
| **P3** | Limited impact | Planned backlog, or accept with sign-off if justified |

### The triage workflow
1. **Validate** each finding: reproduce it, and rule out test artefacts such as a staging misconfiguration or a lenient automated judge.
2. **Deduplicate** variants that share a root cause.
3. **Rate and prioritise** using the rubric, and record the reasoning.
4. **Assign** an owner, a deadline linked to the priority and, where needed, an interim control such as disabling a tool (Module 6.6).
5. **Track** each finding to closure, closing it only after a passing retest. Accepted risks go to the risk register with an owner and a review date (Module 2.3).` },
    { type: 'scenario', title: 'Two findings, one slot', md: `A team has time to fix one finding before launch. **Finding A:** a jailbreak makes the public chatbot write rude jokes, in 40% of attempts. **Finding B:** an instruction hidden in uploaded documents makes the agent email file contents to an external address, in 3% of attempts.`,
      q: { q: 'Which finding should be fixed FIRST?', o: ['Finding A, because its 40% success rate makes it far more reproducible than B', 'Finding B, because data exfiltration from uploaded files is far more severe', 'Neither, because both findings succeed in fewer than half of all attempts', 'Finding A, because reputational harm always outweighs data protection issues'], a: 1, b: 1,
        why: 'Severity and business impact dominate. Emailing file contents to an outsider is a serious security and privacy breach, and 3% is frequent at scale. Rude jokes are a content issue to fix, but at a lower priority.' } },
    { type: 'callout', kind: 'exam', title: 'Triage questions', md: `The best answer **weighs several factors together**: severity, exploitability, reproducibility as a **success rate**, business impact, reach and detection. A high success rate on a trivial harm ranks below a lower rate on data exfiltration or unauthorised actions. **Validate and deduplicate first**, and **close only after a retest**.` },
    { type: 'check', q: { q: 'Automated testing produces 140 variants of the same indirect injection, all exploiting one missing control. How should triage record them?', o: ['As 140 separate findings, each with its own owner and its own priority rating', 'As one finding with one root cause, with the variants kept as supporting evidence', 'As one low-priority finding, because large numbers of variants exaggerate risk', 'As no finding at all, because automated tools often produce duplicate results'], a: 1, b: 1,
      why: 'Variants that share a root cause are one finding, fixed by one control. Keeping the variants as evidence helps the fix and the retest.' } }
  ]
};
