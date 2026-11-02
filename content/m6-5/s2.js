/* 6.5 · Section 2: differentiating security vulnerabilities from model limitations (e.g., hallucinations) */
module.exports = {
  title: 'Vulnerabilities versus model limitations', covers: [2],
  blocks: [
    { type: 'video', title: 'Bug, limitation, or both?', kicker: 'Module 6.5 · Video 2 of 5', scenes: [
      { t: 'title', kicker: 'Module 6.5 · Findings and reporting', title: 'Bug, limitation, or both?', sub: 'Separating security vulnerabilities from model limitations', icon: 'split',
        say: 'Not every bad output is a security vulnerability. A model that confidently invents a fact has a limitation. A system that lets an outsider steal data through the model has a vulnerability. Mix them up, and findings go to the wrong people with the wrong urgency. | This video covers how to tell security vulnerabilities apart from model limitations such as hallucinations, and what to do with each.' },
      { t: 'compare', title: 'Vulnerability or limitation?', labels: ['Cause', 'Adversary', 'Fix', 'Owner'],
        cols: [{ h: 'Vulnerability', icon: 'bug', k: 'threat' }, { h: 'Limitation', icon: 'model', k: 'model' }],
        rows: [
          ['A flaw that breaks a security boundary', 'An inherent weakness in model behaviour'],
          ['Exploitable on purpose', 'Often appears in normal use'],
          ['Patch, control or redesign', 'Reduce, ground or warn; rarely eliminate'],
          ['Security vulnerability management', 'Model owner’s quality backlog'] ],
        say: 'Four questions separate the two. | Cause: a vulnerability is a flaw that breaks a security boundary, such as access to data or actions. A limitation is an inherent weakness in how the model behaves, such as hallucination or inconsistency. | Adversary: a vulnerability can be exploited on purpose. A limitation often appears in normal use, with no attacker involved. | Fix: a vulnerability can usually be patched, controlled or designed out. A limitation can be reduced, grounded or warned about, but rarely eliminated. | Owner: vulnerabilities go to security vulnerability management, with its deadlines. Limitations go to the model owner’s quality backlog, unless they create a security impact.' },
      { t: 'bullets', title: 'Where the line blurs', layout: 'grid', cols: 2, items: [
          { icon: 'box', h: 'Hallucinated packages', d: 'A limitation attackers can exploit', k: 'threat' },
          { icon: 'unlock', h: 'Jailbreaks', d: 'Security issues when they unlock real harm', k: 'human' },
          { icon: 'tool', h: 'Injection that drives tools', d: 'A vulnerability: data becomes commands', k: 'model' },
          { icon: 'id', h: 'Memorised personal data', d: 'A privacy vulnerability, not just quality', k: 'data' },
          { icon: 'scale', h: 'Biased decisions', d: 'A responsible AI issue with legal stakes', k: 'neutral' },
          { icon: 'chat', h: 'Wrong but harmless answers', d: 'A limitation for the quality backlog', k: 'control' } ],
        say: 'In practice, the line often blurs. | Hallucinated package names are a model limitation, but attackers register those names and wait, so the limitation becomes a supply chain risk. | Jailbreaks bypass safety training. They become security issues when they unlock real harm, such as access to data or dangerous capabilities. | Indirect injection that drives tools is a vulnerability: data has been turned into commands across a trust boundary. | Memorised personal data appearing in outputs is a privacy vulnerability, not just a quality problem. | Biased decisions are a responsible AI issue, with legal stakes in areas like hiring and credit. | And a wrong but harmless answer is a limitation, for the model quality backlog.' },
      { t: 'flow', title: 'Routing a finding',
        nodes: [
          { id: 'f', x: 230, y: 330, icon: 'doc', label: 'Finding', sub: 'validated and rated', k: 'neutral', w: 280 },
          { id: 'q1', x: 700, y: 330, icon: 'lock', label: 'Crosses a security boundary?', sub: 'data, actions, systems', k: 'human', w: 340 },
          { id: 'vul', x: 1200, y: 330, icon: 'bug', label: 'Vulnerability management', sub: 'security deadlines', k: 'threat', w: 320 },
          { id: 'q2', x: 700, y: 690, icon: 'scale', label: 'Harm, bias or policy breach?', sub: 'safety and fairness', k: 'human', w: 340 },
          { id: 'rai', x: 1200, y: 690, icon: 'shield', label: 'Safety and RAI review', sub: 'responsible AI owners', k: 'control', w: 320 },
          { id: 'q', x: 230, y: 690, icon: 'list', label: 'Quality backlog', sub: 'model owner', k: 'model', w: 280 } ],
        edges: [{ from: 'f', to: 'q1', k: 'neutral' }, { from: 'q1', to: 'vul', k: 'threat', label: 'yes' }, { from: 'q1', to: 'q2', k: 'human', label: 'no' }, { from: 'q2', to: 'rai', k: 'control', label: 'yes' }, { from: 'q2', to: 'q', k: 'model', label: 'no' }],
        steps: [
          { show: 'f', hi: 'f' },
          { show: 'q1 f-q1', flow: 'f-q1', hi: 'q1' },
          { show: 'vul q1-vul', flow: 'q1-vul', hi: 'vul' },
          { show: 'q2 q1-q2', flow: 'q1-q2', hi: 'q2' },
          { show: 'rai q2-rai', flow: 'q2-rai', hi: 'rai' },
          { show: 'q q2-q', flow: 'q2-q', hi: 'q' } ],
        say: 'A simple routing question settles most cases. Start with the validated finding. | Ask: does it cross a security boundary, giving access to data, actions or systems that should be protected? | If yes, it is a security vulnerability, managed with security deadlines, whatever role the model plays. | If not, ask whether it causes harm, bias or a policy breach. | If yes, route it to safety and responsible AI review. | If neither, it is a quality limitation, for the model owner’s backlog. Record the reasoning either way, because a finding can change route as the system gains new tools or data.' },
      { t: 'summary', items: ['Vulnerabilities break security boundaries; limitations are inherent behaviour', 'A limitation becomes a vulnerability when it creates security impact', 'Route each finding to the right owner and process', 'Record the reasoning, and revisit it when the system changes'],
        say: 'To recap. | Vulnerabilities break security boundaries; limitations are inherent model behaviour. | A limitation becomes a vulnerability when it creates security impact. | Route each finding to the right owner and process. | And record the reasoning, revisiting it whenever the system gains new tools or data.' } ] },
    { type: 'text', md: `### Three kinds of finding
- A **security vulnerability** is a weakness an adversary can exploit to compromise **confidentiality, integrity or availability**, or to gain access, data or actions they shouldn’t have. In AI systems, most sit in the **system around the model**: how inputs are trusted, what tools and data the model can reach, and how outputs are handled.
- A **model limitation** is an inherent weakness in model behaviour, such as **hallucination**, inconsistency, sensitivity to phrasing, knowledge gaps or poor calibration (Module 1.3). Limitations appear in normal use, and can be reduced but rarely eliminated.
- **Safety and responsible AI issues**, such as harmful content, bias or unfairness, have their own reviews and, often, legal stakes (Domain 2).

### Classifying common findings
| Finding | Usually | Why |
|---|---|---|
| Hallucinated facts in a summary | Limitation | No adversary and no boundary crossed; reduce with grounding and review |
| Hallucinated package or URL names | Limitation with **security impact** | Attackers can register the names (Module 3.7) |
| A direct jailbreak producing rude content | Safety issue | Bypasses safety training; no security boundary crossed |
| A jailbreak unlocking dangerous capabilities or data | **Vulnerability** | Real harm, deliberately exploitable |
| Indirect injection that triggers tools or leaks data | **Vulnerability** | Untrusted data treated as commands across a trust boundary. **EchoLeak** (CVE-2025-32711, 2025), a zero-click data leak in Microsoft 365 Copilot, is an example |
| Training or personal data appearing in outputs | **Privacy vulnerability** | Disclosure of protected data |
| Biased decisions in hiring or credit | Responsible AI issue | Discrimination law and high-risk obligations apply |

### Why the distinction matters
- **Owners and urgency:** vulnerabilities follow security deadlines; limitations go to the model owner’s backlog.
- **Fixes:** vulnerabilities usually need system controls, such as isolating untrusted content, limiting tools or validating output, rather than only model changes (Module 6.6).
- **Disclosure:** vendor programmes often draw the same line. Google’s AI Vulnerability Reward Program (October 2025), for example, rewards rogue actions and data exfiltration, but treats jailbreaks, direct prompt injection and content issues as out of scope, to be reported through in-product feedback.
- **Honest reporting:** calling every hallucination a vulnerability inflates risk; calling an exploitable injection "model behaviour" hides it.` },
    { type: 'match', title: 'Vulnerability, limitation or safety issue?', pairs: [
      ['A summary that invents a meeting date, with no attacker involved', 'Model limitation'],
      ['An email that makes the agent forward a customer file to an outsider', 'Security vulnerability'],
      ['A role-play prompt that makes the chatbot swear at users', 'Safety issue'],
      ['A coding assistant that keeps recommending a package that doesn’t exist', 'Limitation with security impact'],
      ['Another customer’s address appearing in a response', 'Privacy vulnerability'] ] },
    { type: 'callout', kind: 'exam', title: 'Classification questions', md: `Ask whether the finding **crosses a security boundary** (data, actions, systems). If it does, it is a **vulnerability**, whatever the model’s role. Hallucination alone is a **limitation**, but it becomes a security issue when attackers can exploit it, as with invented package names. Route **safety and fairness** issues to their own reviews.` },
    { type: 'check', q: { q: 'A tester shows that an assistant sometimes states incorrect store opening hours. No attacker is involved and no data is exposed. How should this finding be classified?', o: ['As a critical security vulnerability, requiring an emergency patch within 24 hours', 'As a model limitation, for the model owner’s quality backlog', 'As a privacy breach, which must be reported to the regulator', 'As out of scope, because incorrect outputs are never worth recording'], a: 1, b: 2,
      why: 'Incorrect but harmless answers in normal use are a model limitation. Record them for the model owner, with grounding improvements, but don’t treat them as security incidents.' } }
  ]
};
