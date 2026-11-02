/* 2.6 · Section 2: shadow AI detection and management */
module.exports = {
  title: 'Shadow AI detection and management', covers: [3],
  blocks: [
    { type: 'video', title: 'AI you didn’t approve', kicker: 'Module 2.6 · Video 2 of 4', scenes: [
      { t: 'title', kicker: 'Module 2.6 · Accountability and audit', title: 'AI you didn’t approve', sub: 'Finding shadow AI, and bringing it into the light', icon: 'eye',
        say: 'In almost every organisation, people are using AI tools that nobody approved. Usually they are trying to do their jobs better, not to cause harm. | This video covers the forms shadow AI takes, why it matters, how to detect it, and why managing it works better than simply blocking it.' },
      { t: 'bullets', title: 'Forms of shadow AI', layout: 'grid', cols: 2, items: [
          { icon: 'chat', h: 'Public chatbots', d: 'Personal accounts used with work data', k: 'threat' },
          { icon: 'sparkle', h: 'AI features in approved SaaS', d: 'New capabilities switched on by default', k: 'human' },
          { icon: 'plug', h: 'Extensions and plug-ins', d: 'Browser add-ons that read every page', k: 'model' },
          { icon: 'key', h: 'Personal API keys', d: 'Scripts and agents calling models directly', k: 'data' },
          { icon: 'server', h: 'Local models', d: 'Open-weight models downloaded and run on laptops', k: 'neutral' },
          { icon: 'code', h: 'Unregistered builds', d: 'Teams building AI outside governance', k: 'control' } ],
        say: 'Shadow AI takes many forms. | Public chatbots used through personal accounts, with work data pasted in. | New AI features inside already-approved SaaS products, sometimes switched on by default in an update. | Browser extensions and plug-ins that can read every page a user visits, including internal systems. | Personal API keys used in scripts and agents that call models directly. | Open-weight models downloaded and run locally on laptops. | And AI systems built by teams that simply never registered them with governance.' },
      { t: 'bullets', title: 'Why it matters', items: [
          { icon: 'drop', h: 'Data leakage', d: 'Confidential and personal data sent to unvetted providers', k: 'threat' },
          { icon: 'doc', h: 'No contract protection', d: 'Consumer terms may allow retention and training', k: 'human' },
          { icon: 'gavel', h: 'Compliance blind spots', d: 'Unassessed transfers, AI Act duties, records rules', k: 'neutral' },
          { icon: 'alert', h: 'Unvetted outputs', d: 'Decisions based on unchecked AI answers', k: 'model' },
          { icon: 'eye', h: 'No visibility', d: 'No logs, no inventory, no incident response', k: 'data' } ],
        say: 'Why does it matter? | Data leakage: confidential and personal data flows to providers nobody has assessed. | No contract protection: consumer terms may allow the provider to retain inputs and train on them. | Compliance blind spots: unassessed international transfers, unmet AI Act duties, and records that should have been kept. | Unvetted outputs: business decisions based on AI answers nobody checked. | And no visibility: no logs, no inventory entry, and no way to respond when something goes wrong.' },
      { t: 'flow', title: 'Where to look',
        nodes: [
          { id: 'reg', x: 800, y: 565, icon: 'list', label: 'Shadow AI register', sub: 'triaged into the inventory', k: 'control', w: 330 },
          { id: 'net', x: 250, y: 300, icon: 'network', label: 'Network and proxy logs', k: 'data', w: 300 },
          { id: 'saas', x: 800, y: 275, icon: 'cloud', label: 'SaaS and OAuth grants', k: 'model', w: 300 },
          { id: 'end', x: 1350, y: 300, icon: 'phone', label: 'Endpoints and extensions', k: 'human', w: 300 },
          { id: 'fin', x: 250, y: 760, icon: 'money', label: 'Expenses and procurement', k: 'neutral', w: 300 },
          { id: 'code', x: 1350, y: 760, icon: 'code', label: 'Code and secret scanning', k: 'threat', w: 300 } ],
        edges: [{ from: 'net', to: 'reg', k: 'data' }, { from: 'saas', to: 'reg', k: 'model' }, { from: 'end', to: 'reg', k: 'human' }, { from: 'fin', to: 'reg', k: 'neutral' }, { from: 'code', to: 'reg', k: 'threat' }],
        steps: [
          { show: 'reg', hi: 'reg' },
          { show: 'net net-reg', flow: 'net-reg', hi: 'net' },
          { show: 'saas saas-reg', flow: 'saas-reg', hi: 'saas' },
          { show: 'end end-reg', flow: 'end-reg', hi: 'end' },
          { show: 'fin fin-reg', flow: 'fin-reg', hi: 'fin' },
          { show: 'code code-reg', flow: 'code-reg', hi: 'code' } ],
        say: 'Detection needs several sources feeding one register, which is then triaged into the AI inventory. | Network, proxy and DNS logs, often through a secure web gateway or cloud access security broker, reveal traffic to AI services. | SaaS management tools and OAuth grants show which applications users have connected to corporate accounts, and which have new AI features. | Endpoint management reveals browser extensions and locally installed models. | Expense claims and procurement records reveal paid AI subscriptions. | And code and secret scanning reveals API keys and model calls in repositories. Surveys and amnesties fill the gaps.' },
      { t: 'cycle', title: 'Managing what you find', center: 'Shadow AI', centerSub: 'into the light', intro: 'Treat discoveries as demand signals, not just violations.',
        stages: [
          { icon: 'search', label: 'Discover', d: 'Multiple detection sources, continuously.' },
          { icon: 'filter', label: 'Triage', d: 'What data, which users, what risk?' },
          { icon: 'gavel', label: 'Decide', d: 'Approve, replace with a sanctioned tool, or block.' },
          { icon: 'users', label: 'Enable', d: 'Approved alternatives, guidance and training.' },
          { icon: 'eye', label: 'Monitor', d: 'Watch for recurrence and new tools.' } ],
        say: 'Managing shadow AI is a cycle. | Discover continuously, from several sources. | Triage each finding: what data is involved, who is using it, and how risky it is. | Decide: approve it through a fast-track route, replace it with a sanctioned alternative, or block it where the risk is unacceptable. | Enable people with approved tools, clear guidance and training, so they don’t need workarounds. | And monitor for recurrence and new tools. Treat every discovery as a signal of unmet demand, not just a violation.' },
      { t: 'bullets', title: 'Why blocking alone fails', items: [
          { icon: 'stop', h: 'Workarounds appear', d: 'Personal phones, home networks, new tools', k: 'threat' },
          { icon: 'chart', h: 'Demand is real', d: 'People use AI because it helps them', k: 'human' },
          { icon: 'check', h: 'Offer a sanctioned path', d: 'Enterprise tools with data protection', k: 'control' },
          { icon: 'shield', h: 'Protect the data itself', d: 'DLP and classification, wherever data flows', k: 'data' } ],
        say: 'Blanket blocking usually fails. | People find workarounds: personal phones, home networks, and tools the blocklist hasn’t caught yet, which leaves you with less visibility, not more. | The demand is real, because AI genuinely helps people with their work. | The better approach is a sanctioned path: enterprise tools with contractual data protection, approved quickly. | And protect the data itself, with classification and data loss prevention that apply wherever data flows, including into AI tools.' },
      { t: 'summary', items: ['Shadow AI: chatbots, SaaS features, extensions, keys, local models, builds', 'Risks: leakage, no contracts, compliance gaps, unvetted outputs', 'Detect through network, SaaS, endpoint, finance and code sources', 'Discover, triage, decide, enable, monitor; don’t just block'],
        say: 'To recap. | Shadow AI includes public chatbots, AI features in SaaS, extensions, personal API keys, local models and unregistered builds. | It risks data leakage, unprotected terms, compliance gaps and decisions based on unvetted outputs. | Detect it through network, SaaS, endpoint, finance and code sources. | And manage it as a cycle of discover, triage, decide, enable and monitor, rather than relying on blocking alone.' } ] },
    { type: 'text', md: `### What counts as shadow AI
**Shadow AI** is the use of AI tools, models or features without the organisation’s knowledge, approval or governance. It is a special case of shadow IT, with extra risks because AI tools ingest whatever users give them and produce outputs people may rely on. Common forms:
- personal accounts on public chatbots and image generators used for work;
- **embedded AI** features added to approved SaaS products, sometimes enabled by default;
- browser extensions, meeting bots and plug-ins with broad access to pages, mailboxes or calendars;
- personal or team API keys used in scripts, spreadsheets, low-code tools and agents;
- open-weight models run locally or on unmanaged cloud accounts;
- models and agents built by business teams without registration or assessment.

### Risks
| Risk | Example |
|---|---|
| Data leakage | Source code, customer records or board papers pasted into a consumer chatbot whose terms permit retention and training |
| Contractual and legal gaps | No data processing agreement, unknown sub-processors, unassessed international transfers |
| Regulatory exposure | An unregistered high-risk use (for example, screening job applicants) with none of the required controls |
| Security | Extensions or agents with broad tokens; malicious tools posing as AI helpers; leaked API keys |
| Quality and liability | Decisions or customer communications based on unverified AI output |
| Loss of visibility | No inventory entry, no logs, no incident detection or response |

### Detection techniques
- **Network and web gateway telemetry** (secure web gateways, CASB/SSE, DNS logs, firewall logs) identifies traffic to known AI services and categorises it.
- **SaaS discovery and OAuth/app-consent reviews** show third-party apps connected to corporate identities and the scopes granted, plus vendor release notes announcing new AI features.
- **Endpoint management** inventories browser extensions, installed applications and local model runtimes.
- **Data loss prevention** on endpoints and in the browser flags sensitive data being pasted or uploaded into AI tools.
- **Finance and procurement** reviews reveal subscriptions bought on cards or expensed.
- **Code and secret scanning** finds API keys and calls to model endpoints in repositories and pipelines.
- **People-based methods**: surveys, AI champions, and **amnesty** periods where teams can register tools without penalty.

### Managing shadow AI
1. **Triage** each discovery by data sensitivity, user population and purpose.
2. **Decide**: approve via a **fast-track** route for low-risk tools; **replace** with a sanctioned alternative; or **block** where risk is unacceptable (for example, tools whose terms allow training on confidential inputs).
3. **Enable**: publish an approved-tools list, provide enterprise versions with contractual protections, and train staff on the acceptable use policy.
4. **Protect data directly**: classification labels and DLP policies that apply in browsers and AI tools, and identity-based controls (single sign-on, conditional access) for sanctioned tools.
5. **Monitor and measure**: track the number of unsanctioned tools, sensitive-data events, time to approve requests, and adoption of sanctioned alternatives.

The most effective programmes treat shadow AI as **demand intelligence**: each unsanctioned tool shows a need that governance hasn’t met yet.`, },
    { type: 'tabs', title: 'Shadow AI responses', items: [
      ['Marketing image generator', 'Discovered through expense claims. **Data:** brand assets and campaign briefs, low sensitivity. **Decision:** fast-track approval of an enterprise licence with IP indemnity; add to the approved list.'],
      ['Code assistant extension', 'Discovered by endpoint inventory. **Data:** proprietary source code sent to an unvetted provider. **Decision:** remove the extension; provide an approved code assistant with no-training terms and code-licence filters.'],
      ['Meeting transcription bot', 'Discovered when it joined a board meeting. **Data:** highly confidential discussions. **Decision:** block unmanaged meeting bots tenant-wide; offer the platform’s approved transcription feature with retention controls.'],
      ['Team-built triage agent', 'Discovered through secret scanning (an API key in a repository). **Data:** customer emails. **Decision:** rotate the key, register the agent in the inventory, tier it, and complete an assessment before it can continue.'] ] },
    { type: 'callout', kind: 'exam', title: 'The balanced answer', md: `For shadow AI questions, the best answer usually **combines discovery with enablement**: detect and triage, provide sanctioned alternatives, update the acceptable use policy and training, and protect sensitive data with DLP. Answers that only **ban** AI, or only **ignore** it, are rarely correct.` },
    { type: 'check', q: { q: 'Network logs show hundreds of employees using a consumer AI chatbot, some pasting customer data. What is the BEST first response?', o: ['Block all AI domains permanently, and discipline the employees who pasted customer data into the tool', 'Triage the risk, offer an approved enterprise alternative, communicate the policy, and apply DLP rules', 'Ask the chatbot provider to delete the organisation’s data, and note the incident in the risk register', 'Monitor usage for another quarter to measure how widespread the practice is before deciding what to do'], a: 1, b: 3,
      why: 'Blanket blocking drives use underground and doesn’t meet the demand. A sanctioned alternative, clear policy and data protection reduce risk while keeping visibility.' } }
  ]
};
