/* 5.4 · Section 2: context and consequence prioritisation */
module.exports = {
  title: 'Prioritising by context and consequence', covers: [2],
  blocks: [
    { type: 'video', title: 'Fix what matters first', kicker: 'Module 5.4 · Video 2 of 5', scenes: [
      { t: 'title', kicker: 'Module 5.4 · Vulnerabilities and posture', title: 'Fix what matters first', sub: 'Prioritising AI vulnerabilities by context and consequence', icon: 'target',
        say: 'Most organisations have far more vulnerabilities than time to fix them. A severity score on its own can’t tell you which ones matter most in your environment. | This video covers prioritising AI vulnerabilities by context and consequence.' },
      { t: 'compare', title: 'Same flaw, different priority', labels: ['Exposure', 'Data', 'Privileges', 'Priority'],
        cols: [{ h: 'Internal batch', icon: 'server', k: 'neutral' }, { h: 'Public agent', icon: 'robot', k: 'threat' }],
        rows: [
          ['Internal network only', 'Internet, anonymous users'],
          ['Synthetic test data', 'Customer records'],
          ['Read-only, no tools', 'Email and refund tools'],
          ['Next patch window', 'Emergency fix within days'] ],
        say: 'Here is the same vulnerability, in the same serving framework, in two places. | One deployment is an internal batch model reachable only from the internal network. The other is a public agent that anyone on the internet can talk to. | The batch model processes synthetic test data. The agent handles customer records. | The batch model is read-only, with no tools. The agent can send email and issue refunds. | So the batch model can wait for the next patch window, while the public agent needs an emergency fix within days. Same score, very different consequence.' },
      { t: 'bullets', title: 'Context factors', layout: 'grid', cols: 2, items: [
          { icon: 'globe', h: 'Exposure', d: 'Who can reach it, and how easily', k: 'threat' },
          { icon: 'bolt', h: 'Exploitation', d: 'Known exploited? Likely soon?', k: 'human' },
          { icon: 'database', h: 'Data sensitivity', d: 'What the system can see', k: 'data' },
          { icon: 'robot', h: 'Privileges and agency', d: 'What the system can do', k: 'model' },
          { icon: 'shield', h: 'Existing controls', d: 'What already blocks or detects it', k: 'control' },
          { icon: 'building', h: 'Business consequence', d: 'Safety, money, law, reputation', k: 'neutral' } ],
        say: 'Six context factors turn a generic score into a real priority. | Exposure: who can reach the system, and how easily. | Exploitation: is the vulnerability known to be exploited in the wild, or likely to be soon? | Data sensitivity: what the system can see, including what its retrieval and tools can reach. | Privileges and agency: what the system can do, especially agents that act in other systems. | Existing controls: guardrails, isolation or monitoring that already block or detect exploitation. | And business consequence: harm to people’s safety, money, legal obligations and reputation.' },
      { t: 'matrix', title: 'Exploitability and consequence', rows: ['Severe consequence', 'Limited consequence'], cols: ['Hard to exploit', 'Easy to exploit'], xLabel: 'Exploitability in context', yLabel: 'Consequence',
        heat: true,
        items: [{ r: 0, c: 1, t: 'Act now: fix within days', k: 'threat' }, { r: 0, c: 0, t: 'Fix soon; add controls', k: 'human' }, { r: 1, c: 1, t: 'Fix soon; monitor', k: 'model' }, { r: 1, c: 0, t: 'Routine patch cycle', k: 'control' }],
        say: 'A simple way to combine the factors is to place each finding on two axes: how easy it is to exploit in your context, and how severe the consequence would be. | Easy to exploit with severe consequences: act now, and fix within days, using compensating controls in the meantime. | Hard to exploit but with severe consequences: fix soon, and add controls that make exploitation even harder. | Easy to exploit but with limited consequences: fix soon, and monitor for attempts. | And hard to exploit with limited consequences: handle in the routine patch cycle.' },
      { t: 'bullets', title: 'Scoring tools to know', layout: 'grid', cols: 2, items: [
          { icon: 'ruler', h: 'CVSS v4.0', d: 'Base, threat and environmental metrics', k: 'neutral' },
          { icon: 'chart', h: 'EPSS', d: 'Probability of exploitation soon', k: 'model' },
          { icon: 'alert', h: 'CISA KEV', d: 'Known exploited vulnerabilities', k: 'threat' },
          { icon: 'split', h: 'SSVC', d: 'Decision tree: track, attend, act', k: 'human' },
          { icon: 'robot', h: 'OWASP AIVSS', d: 'Emerging scoring for agentic AI risks', k: 'data' },
          { icon: 'building', h: 'Business impact analysis', d: 'Consequence by process', k: 'control' } ],
        say: 'Several scoring tools help. | CVSS version four separates base severity from threat and environmental metrics, so you can adjust for your context. | The exploit prediction scoring system estimates how likely a vulnerability is to be exploited soon. | CISA’s known exploited vulnerabilities catalogue lists flaws attackers are already using. | Stakeholder-specific vulnerability categorisation uses a decision tree that ends in track, attend or act. | OWASP’s AI vulnerability scoring system is an emerging approach for agentic AI risks. | And your own business impact analysis tells you the consequence of each system failing.' },
      { t: 'summary', items: ['A base score is a starting point, not a priority', 'Weigh exposure, exploitation, data, privileges, controls and consequence', 'Known exploited and agentic, internet-facing systems go first', 'Use CVSS, EPSS, KEV and SSVC together'],
        say: 'To recap. | A base severity score is a starting point, not a priority. | Weigh exposure, exploitation, data sensitivity, privileges, existing controls and business consequence. | Vulnerabilities known to be exploited, in internet-facing systems with agency or sensitive data, go to the front of the queue. | And use CVSS, EPSS, the known exploited catalogue and decision frameworks such as SSVC together.' } ] },
    { type: 'text', md: `### Why context matters for AI
AI systems concentrate risk: a single model endpoint may reach large volumes of sensitive data through retrieval, and agents can act in many systems. The same flaw can be trivial in an isolated batch model and critical in an internet-facing agent with tools. Prioritise by **exploitability in context** and **consequence**, not by base score alone.

### Context factors in practice
| Factor | Questions to ask |
|---|---|
| **Exposure** | Internet-facing or internal? Authenticated? Who are the users? Can external content reach the model (retrieval, email, web)? |
| **Exploitation** | Listed in CISA KEV? High EPSS? Public exploit code? Seen in threat intelligence? |
| **Data sensitivity** | Personal, health, financial or confidential data in prompts, retrieval, memory or training data? |
| **Privileges and agency** | Tools, scopes and downstream systems; can it act without approval? Blast radius if hijacked? |
| **Existing controls** | Isolation, guardrails, output validation, rate limits, monitoring, human review |
| **Consequence** | Safety, financial loss, regulatory breach, reputation, number of people affected; criticality from the business impact analysis |

### Scoring frameworks
- **CVSS v4.0** (FIRST, 2023): Base metrics describe the flaw; **Threat** metrics (exploit maturity) and **Environmental** metrics (your security requirements and mitigations) adjust it. Supplemental metrics add context such as automatability.
- **EPSS** (FIRST): a daily estimate of the probability that a CVE will be exploited in the next 30 days.
- **CISA KEV:** a catalogue of vulnerabilities known to be exploited. In 2025 it included an unauthenticated code execution flaw in Langflow, a popular low-code tool for building AI agents (CVE-2025-3248).
- **SSVC** (CERT/CC and CISA): a decision tree using exploitation status, exposure, automatability and impact, leading to *Track*, *Track\**, *Attend* or *Act*.
- **OWASP AIVSS:** an emerging AI vulnerability scoring system, focused first on agentic AI risks such as model manipulation, data poisoning and agent misalignment, with AI-specific metrics alongside CVSS-style base and environmental factors.

### Turning priority into deadlines
Set remediation targets by priority, not just severity: for example, known exploited and internet-facing within days; high priority within two to four weeks; others in the routine cycle. When a deadline can’t be met, apply **compensating controls** (Section 4) and record a time-limited exception approved by the risk owner.` },
    { type: 'scenario', title: 'Two findings, one engineer', md: `A team has one engineer available this week. Finding A: a "critical" (CVSS 9.8) flaw in a document conversion library used only by an internal, offline batch job that processes public reports. Finding B: a "high" (CVSS 7.5) flaw in the serving framework behind the company’s customer-facing support agent, which has refund tools. Finding B is listed in CISA’s KEV catalogue.`,
      q: { q: 'Which finding should the engineer address FIRST, and why?', o: ['Finding A, because its CVSS base score is higher than Finding B’s score', 'Finding B, because it is known to be exploited and sits on an exposed agent with tools', 'Finding A, because libraries are easier to patch than serving frameworks', 'Neither, until the security team has assessed every other open finding first'], a: 1, b: 2,
        why: 'Known exploitation, internet exposure and agency with financial tools make Finding B far more urgent in context. Base score alone, ease of patching or waiting for a full review are poor ways to prioritise.' } },
    { type: 'callout', kind: 'exam', title: 'Prioritisation questions', md: `When a question compares vulnerabilities, look beyond the **base score** to **exploitation status** (KEV, EPSS), **exposure**, **data and privileges** and **business consequence**. Internet-facing agents with tools and sensitive data, plus known exploitation, almost always come first.` },
    { type: 'check', q: { q: 'Which combination of factors should raise an AI vulnerability’s priority the MOST?', o: ['A high base score in a model used only in an isolated research lab', 'Known exploitation, internet exposure and an agent able to act in other systems', 'A medium base score in a model whose vendor has announced a patch for next year', 'A low base score, but a large number of affected internal test environments'], a: 1, b: 2,
      why: 'Known exploitation plus exposure plus agency means the flaw is likely to be used and would cause real harm. The other combinations lack either likelihood or consequence.' } }
  ]
};
