/* 6.5 · Section 3: correlating findings against industry frameworks (MITRE ATLAS, OWASP LLM Top 10) */
module.exports = {
  title: 'Mapping findings to industry frameworks', covers: [3],
  blocks: [
    { type: 'video', title: 'Speaking a common language', kicker: 'Module 6.5 · Video 3 of 5', scenes: [
      { t: 'title', kicker: 'Module 6.5 · Findings and reporting', title: 'Speaking a common language', sub: 'Mapping findings to MITRE ATLAS, OWASP and CWE', icon: 'link',
        say: 'A finding described only in your own words is hard to compare, track or share. Mapped to an industry framework, it joins a common language: other teams, vendors and auditors know exactly what kind of problem it is. | This video covers how to correlate assessment findings with industry frameworks such as MITRE ATLAS and the OWASP Top 10 for LLM Applications.' },
      { t: 'bullets', title: 'Frameworks for mapping findings', layout: 'grid', cols: 2, items: [
          { icon: 'target', h: 'MITRE ATLAS', d: 'Adversary tactics and techniques', k: 'threat' },
          { icon: 'list', h: 'OWASP LLM Top 10', d: 'Risk categories for LLM applications', k: 'data' },
          { icon: 'robot', h: 'OWASP Agentic Top 10', d: 'Risk categories for agents', k: 'model' },
          { icon: 'bug', h: 'CWE', d: 'Underlying weakness types', k: 'human' },
          { icon: 'book', h: 'NIST AI 100-2', d: 'Adversarial ML taxonomy', k: 'neutral' },
          { icon: 'flag', h: 'CVE and AVID', d: 'Specific vulnerabilities and AI failures', k: 'control' } ],
        say: 'Six frameworks cover most mapping needs. | MITRE ATLAS describes adversary tactics and techniques against AI, tying each finding to how attackers actually operate. | The OWASP Top 10 for LLM Applications groups risks into categories, from prompt injection to unbounded consumption. | The OWASP Top 10 for Agentic Applications does the same for agents, from goal hijacking to rogue agents. | CWE names the underlying weakness, such as improper neutralisation of input used for language model prompting. | NIST’s adversarial machine learning taxonomy gives consistent terms for attacks on models. | And CVE identifies specific vulnerabilities in products, while the AI Vulnerability Database collects reports of AI failures.' },
      { t: 'code', title: 'One finding, several maps', file: 'finding-F07-mapping.yaml',
        code: `finding: F-07 indirect injection -> refund tool
atlas: AML.T0051.001 indirect prompt injection
owasp llm: LLM01 prompt injection
owasp llm: LLM06 excessive agency
owasp agentic: ASI01 agent goal hijack
cwe: CWE-1427 LLM prompt input not neutralised
control gap: email text can reach tool calls
coverage: add ASI02 tool misuse test cases`,
        hl: [null, [2, 2], [3, 5], [6, 6], [7, 8]],
        notes: [
          { h: 'One finding, several maps', d: 'Each framework answers a different question.' },
          { h: 'How attackers operate', d: 'The ATLAS technique and its sub-technique.', k: 'threat' },
          { h: 'Risk categories', d: 'OWASP entries for LLM and agentic risks.', k: 'data' },
          { h: 'The weakness', d: 'CWE names the root cause.', k: 'human' },
          { h: 'Gaps and coverage', d: 'Mapping points to controls and to untested areas.', k: 'control' } ],
        say: 'Here is one finding, mapped to several frameworks, because each answers a different question. | MITRE ATLAS says how the attacker operated: the indirect form of its LLM prompt injection technique. | The OWASP lists give the risk categories: prompt injection and excessive agency for LLM applications, and agent goal hijack for agentic applications. | CWE names the underlying weakness: input used for language model prompting that wasn’t neutralised. | And the mapping points to the control gap, email text reaching tool calls, and to a coverage gap: tool misuse cases that haven’t been tested yet.' },
      { t: 'compare', title: 'Mapping helps, within limits', labels: ['Language', 'Coverage', 'Priority', 'Versions'],
        cols: [{ h: 'Helps with', icon: 'check', k: 'control' }, { h: 'Watch out for', icon: 'alert', k: 'threat' }],
        rows: [
          ['Teams, vendors and auditors share terms', 'One finding often maps to several entries'],
          ['Shows which categories went untested', 'A list of categories isn’t a test plan'],
          ['Links findings to real attacker activity', 'A category says nothing about severity'],
          ['Supports audits and compliance evidence', 'Lists change, so record the version'] ],
        say: 'Mapping helps, within limits. | It gives teams, vendors and auditors shared terms. But one finding often maps to several entries, so record them all. | It shows which categories went untested. But a list of categories isn’t a test plan for your system. | It links findings to real attacker activity, through ATLAS case studies. But a category says nothing about how severe the finding is in your context. | And it supports audits and compliance evidence. But the lists change, so record which version you mapped against.' },
      { t: 'summary', items: ['Map findings to ATLAS, OWASP, CWE and CVE as relevant', 'Each framework answers a different question', 'Use mappings for coverage, intelligence and controls', 'Keep mapping separate from severity; record versions'],
        say: 'To recap. | Map findings to MITRE ATLAS, the OWASP lists, CWE and CVE, as relevant. | Each framework answers a different question: how attackers operate, what kind of risk, which weakness, which product flaw. | Use the mappings for coverage analysis, threat intelligence and control selection. | And keep mapping separate from severity, recording the framework versions you used.' } ] },
    { type: 'text', md: `### Frameworks for mapping findings
| Framework | What it classifies | Example mapping |
|---|---|---|
| **MITRE ATLAS** | Adversary tactics, techniques and case studies for AI systems | Indirect prompt injection: AML.T0051.001; LLM jailbreak: AML.T0054; LLM data leakage: AML.T0057 |
| **OWASP Top 10 for LLM Applications (2025)** | LLM01 prompt injection; LLM02 sensitive information disclosure; LLM03 supply chain; LLM04 data and model poisoning; LLM05 improper output handling; LLM06 excessive agency; LLM07 system prompt leakage; LLM08 vector and embedding weaknesses; LLM09 misinformation; LLM10 unbounded consumption | A refund triggered by injected email text: LLM01 and LLM06 |
| **OWASP Top 10 for Agentic Applications** | Agent risks ASI01 to ASI10, such as goal hijack and tool misuse (Module 6.1) | The same finding: ASI01, agent goal hijack |
| **CWE** | Weakness types, including **CWE-1427** (improper neutralisation of input used for LLM prompting) and **CWE-1426** (improper validation of generative AI output) | The injection’s root cause: CWE-1427 |
| **NIST AI 100-2** | Terminology and taxonomy of adversarial ML attacks and mitigations | Classes such as evasion, poisoning and privacy attacks |
| **CVE and AVID** | Specific vulnerabilities in products (CVE); reports of AI failures (AVID) | EchoLeak: CVE-2025-32711 |

### Why correlation matters
- **Common language** with developers, vendors, auditors and regulators.
- **Coverage analysis:** mapping every finding shows which categories were tested and which weren’t, which guides the next assessment (Module 6.4).
- **Threat intelligence:** ATLAS techniques and case studies link findings to real attacker activity, informing priority (Module 6.1).
- **Control mapping:** framework entries point to known mitigations, and to control sets such as ISO/IEC 42001 and the NIST AI RMF (Module 6.6).
- **Trends:** consistent mapping lets you compare assessments over time and across systems.

### Mapping well
- Map **each finding to every relevant entry**: one finding often fits a technique, a risk category and a weakness.
- **Record framework versions**, because the lists are revised; the OWASP LLM list changed substantially for 2025.
- Keep mapping **separate from severity**: a category says what kind of problem it is, not how bad it is in your system.
- Use mappings in **dashboards and reports** to show leadership coverage and recurring weaknesses, not just counts.` },
    { type: 'callout', kind: 'exam', title: 'Framework mapping questions', md: `Know what each framework is for: **ATLAS** for adversary techniques, **OWASP LLM and Agentic Top 10s** for risk categories, **CWE** for weaknesses, **CVE** for specific product flaws. The best answers **map findings to all relevant entries**, use mappings for **coverage and controls**, and never treat a category as a severity score.` },
    { type: 'check', q: { q: 'A team maps every finding from an assessment to the OWASP Top 10 for LLM Applications and notices that no findings fall under LLM08 (vector and embedding weaknesses). What is the MOST useful conclusion?', o: ['The system has no vector or embedding weaknesses, so no further action is needed', 'The assessment may not have tested the RAG components, so check its coverage', 'LLM08 has been removed from the latest version of the OWASP list entirely', 'The team should reclassify some other findings as LLM08 to balance the report'], a: 1, b: 3,
      why: 'An empty category is a prompt to check coverage: it may reflect an untested area rather than an absence of weaknesses. Reclassifying findings would distort the report.' } }
  ]
};
