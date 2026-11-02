/* 5.4 · Section 1: model vulnerability and exposure registers */
module.exports = {
  title: 'Model vulnerability and exposure registers', covers: [1],
  blocks: [
    { type: 'video', title: 'Knowing your weak spots', kicker: 'Module 5.4 · Video 1 of 5', scenes: [
      { t: 'title', kicker: 'Module 5.4 · Vulnerabilities and posture', title: 'Knowing your weak spots', sub: 'Model vulnerability and exposure registers', icon: 'list',
        say: 'You can’t manage weaknesses you haven’t written down. AI systems add new kinds of weakness to the usual software flaws, and they change quickly. | This video covers model vulnerability and exposure registers: what goes in them, where the findings come from, and how entries move from discovery to closure.' },
      { t: 'bullets', title: 'What belongs in an AI vulnerability register', layout: 'grid', cols: 2, items: [
          { icon: 'model', h: 'Model weaknesses', d: 'Jailbreak and injection susceptibility', k: 'model' },
          { icon: 'box', h: 'Component flaws', d: 'CVEs in frameworks and libraries', k: 'neutral' },
          { icon: 'gear', h: 'Misconfigurations', d: 'Open endpoints, weak authentication', k: 'human' },
          { icon: 'database', h: 'Data exposures', d: 'Sensitive data reachable via the model', k: 'data' },
          { icon: 'link', h: 'Supply chain issues', d: 'Unsigned models, unsafe file formats', k: 'threat' },
          { icon: 'robot', h: 'Agent permission risks', d: 'Excessive tools and scopes', k: 'control' } ],
        say: 'An AI vulnerability register covers six kinds of weakness. | Model weaknesses, such as susceptibility to jailbreaks or prompt injection found in testing. | Flaws in components: published vulnerabilities in serving frameworks, orchestration tools and libraries. | Misconfigurations, such as model endpoints open to the internet or protected by weak authentication. | Data exposures, where sensitive data can be reached through the model or its retrieval system. | Supply chain issues, such as unsigned models or files in formats that can run code when loaded. | And agent permission risks, where agents hold more tools or scopes than they need.' },
      { t: 'compare', title: 'Vulnerability and exposure registers', labels: ['Records', 'Example', 'Answers'],
        cols: [{ h: 'Vulnerability', icon: 'bug', k: 'threat' }, { h: 'Exposure', icon: 'globe', k: 'human' }],
        rows: [
          ['Weaknesses in models and components', 'Where assets can be reached, and by whom'],
          ['Model follows role-play jailbreaks', 'Endpoint reachable from the internet'],
          ['What is wrong?', 'Who could exploit it?'] ],
        say: 'Two related records work together. | A vulnerability register records weaknesses in models and components. An exposure register records where AI assets can be reached, and by whom. | For example, a vulnerability might be that a model follows role-play jailbreaks. An exposure might be that its endpoint can be reached from the internet without authentication. | The first answers: what is wrong? The second answers: who could exploit it? Put them together, and you know how urgent each weakness really is.' },
      { t: 'flow', title: 'The life of a register entry',
        nodes: [
          { id: 'disc', x: 230, y: 330, icon: 'search', label: 'Discover', sub: 'scans, tests, advisories', k: 'threat', w: 310 },
          { id: 'rec', x: 700, y: 330, icon: 'doc', label: 'Record', sub: 'asset, version, evidence', k: 'neutral', w: 300 },
          { id: 'ass', x: 1200, y: 330, icon: 'scale', label: 'Assess', sub: 'severity in context', k: 'human', w: 280 },
          { id: 'own', x: 1200, y: 690, icon: 'user', label: 'Assign', sub: 'owner and due date', k: 'model', w: 280 },
          { id: 'tre', x: 700, y: 690, icon: 'tool', label: 'Treat', sub: 'fix, mitigate or accept', k: 'control', w: 300 },
          { id: 'ver', x: 230, y: 690, icon: 'check', label: 'Verify and close', sub: 'retest the fix', k: 'data', w: 300 } ],
        edges: [{ from: 'disc', to: 'rec', k: 'threat' }, { from: 'rec', to: 'ass', k: 'neutral' }, { from: 'ass', to: 'own', k: 'human' }, { from: 'own', to: 'tre', k: 'model' }, { from: 'tre', to: 'ver', k: 'control' }],
        steps: [
          { show: 'disc', hi: 'disc', mark: { disc: 'alert' } },
          { show: 'rec disc-rec', flow: 'disc-rec', hi: 'rec' },
          { show: 'ass rec-ass', flow: 'rec-ass', hi: 'ass' },
          { show: 'own ass-own', flow: 'ass-own', hi: 'own' },
          { show: 'tre own-tre', flow: 'own-tre', hi: 'tre' },
          { show: 'ver tre-ver', flow: 'tre-ver', hi: 'ver', mark: { ver: 'ok' } } ],
        say: 'Every register entry follows the same life cycle. It is discovered: by scanning, red teaming, a bug bounty report, monitoring or a published advisory. | It is recorded with the affected asset and exact version, a description and the evidence needed to reproduce it. | It is assessed for severity in context, which the next video covers. | It is assigned an owner and a due date that matches its priority. | It is treated: fixed, mitigated with compensating controls, or formally accepted by the risk owner. | And it is verified by retesting before it is closed, so nobody closes an entry just because a ticket was marked done.' },
      { t: 'bullets', title: 'Where findings come from', layout: 'grid', cols: 2, items: [
          { icon: 'book', h: 'Public advisories', d: 'CVE, OSV, vendor bulletins', k: 'neutral' },
          { icon: 'search', h: 'Scanning', d: 'Dependencies, images, model files', k: 'data' },
          { icon: 'target', h: 'Red teaming', d: 'Adversarial testing of models and agents', k: 'threat' },
          { icon: 'megaphone', h: 'Bug bounty and disclosure', d: 'External researchers', k: 'human' },
          { icon: 'eye', h: 'Monitoring and incidents', d: 'Weaknesses seen in production', k: 'model' },
          { icon: 'globe', h: 'AI threat knowledge bases', d: 'MITRE ATLAS, AVID, OWASP', k: 'control' } ],
        say: 'Findings come from six main sources. | Public advisories, such as CVE records, the open source vulnerability database and vendor security bulletins. | Scanning of dependencies, container images and model files. | Red teaming: adversarial testing of models, retrieval systems and agents. | Bug bounty programmes and coordinated disclosure from external researchers. | Monitoring and incidents, which reveal weaknesses in production. | And AI threat knowledge bases, such as MITRE ATLAS, the AI Vulnerability Database and OWASP’s AI projects.' },
      { t: 'summary', items: ['Register model, component, configuration, data, supply chain and agent weaknesses', 'Pair vulnerabilities with exposures to judge urgency', 'Discover, record, assess, assign, treat, verify', 'Feed the register from advisories, scans, red teams and incidents'],
        say: 'To recap. | Register weaknesses in models, components, configurations, data, the supply chain and agent permissions. | Pair each vulnerability with its exposure, to judge how urgent it really is. | Move every entry through discovery, recording, assessment, assignment, treatment and verification. | And feed the register from advisories, scanning, red teams, researchers and incidents.' } ] },
    { type: 'text', md: `### Register fields
| Field | Purpose |
|---|---|
| **ID and title** | Unique reference, linked to tickets and the risk register |
| **Affected assets and versions** | Model name and version (or hash), application, component and version, environment; taken from the AI inventory and AIBOM (Module 6.3) |
| **Category** | Mapping to OWASP Top 10 for LLM Applications, MITRE ATLAS technique, or CWE for software flaws |
| **Description and evidence** | What the weakness is and how to reproduce it, stored securely, because evidence may itself be sensitive (Module 6.5) |
| **Source and date** | Scan, red team, bug bounty, advisory, incident; when it was found |
| **Exposure** | Who can reach the asset: internet, authenticated users, internal only; agent privileges and data reachable |
| **Severity** | Base score plus contextual priority (Section 2) |
| **Owner and due date** | Accountable owner and target date set by priority |
| **Treatment and status** | Fix, mitigate, accept (with approver and expiry) or transfer; open, in progress, verified, closed |
| **Residual risk** | What remains after treatment, reflected in the risk register |

### Vulnerabilities versus model limitations
Not every model behaviour is a security vulnerability. Hallucinations, limited accuracy or occasional bias are **limitations** that belong in quality and risk management, unless an attacker can **reliably trigger** them to cause harm, or they bypass a security control (Module 6.5 covers this distinction). Record both, but route them to the right owners.

### Sources of AI vulnerability information
- **CVE** and the **NVD**, **OSV** (open source vulnerability data, including Python packages) and GitHub security advisories, which increasingly cover AI frameworks, serving platforms and agent tools.
- **Vendor bulletins** from model providers, GPU vendors and platform providers.
- **Model hub scanning:** hubs scan uploaded files for malicious code and unsafe serialisation formats (Module 3.7).
- **AI-specific knowledge bases:** MITRE ATLAS (techniques and case studies), the AI Vulnerability Database (AVID) and OWASP’s generative AI security projects.
- **Internal sources:** red teaming (Module 6.4), bug bounties that include AI systems, security reviews, monitoring and incidents.

Keep the register **connected**: AI inventory and AIBOM entries let you match a new advisory to every affected deployment in minutes, rather than asking teams by email.` },
    { type: 'match', title: 'Vulnerability or exposure?', pairs: [
      ['The model reveals its system prompt when asked in another language', 'Vulnerability'],
      ['The inference endpoint accepts requests from any internet address', 'Exposure'],
      ['The serving framework version has a published remote code execution flaw', 'Vulnerability'],
      ['An agent with refund rights is available to anonymous website visitors', 'Exposure'],
      ['The model file uses a format that can execute code when loaded', 'Vulnerability (supply chain)'] ] },
    { type: 'callout', kind: 'exam', title: 'Register questions', md: `A good register records **exact assets and versions**, **evidence**, **exposure**, **owner and due date**, and requires **verification before closure**. It is fed by many sources and linked to the **inventory and AIBOM**, so new advisories can be matched quickly. Spreadsheets nobody owns, or entries closed without retesting, are common wrong answers.` },
    { type: 'check', q: { q: 'A critical advisory is published for an open-source LLM serving framework. The security team has to email every development team to ask whether they use it, and answers take two weeks. What would MOST improve this?', o: ['A policy banning open-source serving frameworks across the organisation', 'An AI inventory and AIBOM linked to the register, so advisories match assets', 'A weekly meeting where development teams list the frameworks they are using', 'A subscription to more vulnerability advisory feeds for the security team'], a: 1, b: 1,
      why: 'Linking the register to an accurate inventory and AIBOM lets the team match a new advisory to every affected deployment immediately. Bans, meetings and more feeds don’t tell you where the component is running.' } }
  ]
};
