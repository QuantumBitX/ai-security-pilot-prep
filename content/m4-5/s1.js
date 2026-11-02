/* 4.5 · Section 1: classification of human and non-human identities (workloads, agents, services, tools) */
module.exports = {
  title: 'Human and non-human identities in AI systems', covers: [1],
  blocks: [
    { type: 'video', title: 'Who, or what, is calling?', kicker: 'Module 4.5 · Video 1 of 5', scenes: [
      { t: 'title', kicker: 'Module 4.5 · Identity and authentication', title: 'Who, or what, is calling?', sub: 'Classifying human and non-human identities', icon: 'id',
        say: 'In an AI system, most identities aren’t people. Training jobs, pipelines, inference services, agents and tools call each other constantly, and each one needs an identity that can be authenticated and held to account. | This video covers how to classify identities in AI systems, and why agents need a category of their own.' },
      { t: 'bullets', title: 'Identity types in AI systems', layout: 'grid', cols: 2, items: [
          { icon: 'user', h: 'Human users', d: 'Staff and customers using AI', k: 'human' },
          { icon: 'shield', h: 'Privileged humans', d: 'ML engineers, platform admins', k: 'threat' },
          { icon: 'gear', h: 'Workloads and services', d: 'Training jobs, pipelines, inference', k: 'neutral' },
          { icon: 'robot', h: 'AI agents', d: 'Act autonomously, often for a user', k: 'model' },
          { icon: 'tool', h: 'Tools and MCP servers', d: 'APIs that agents call', k: 'control' },
          { icon: 'cloud', h: 'External AI services', d: 'Model providers, partner agents', k: 'data' } ],
        say: 'AI systems involve six broad kinds of identity. | Human users: staff and customers who use AI applications. | Privileged humans: machine learning engineers and platform administrators, whose access to models, data and pipelines is powerful. | Workloads and services: training jobs, data pipelines and inference services. | AI agents, which act autonomously, often on behalf of a particular user. | Tools and MCP servers: the APIs that agents call. | And external AI services, such as model providers and partner organisations’ agents.' },
      { t: 'compare', title: 'Human and non-human identities', labels: ['Authenticate with', 'Lifecycle', 'Numbers', 'Typical weakness'],
        cols: [{ h: 'Human', icon: 'user', k: 'human' }, { h: 'Non-human', icon: 'gear', k: 'neutral' }],
        rows: [
          ['Passkeys, MFA, SSO', 'Certificates, tokens, workload identity'],
          ['Joiner, mover, leaver, driven by HR', 'Created by code; often orphaned'],
          ['Known headcount', 'Often many times more'],
          ['Phishing, password reuse', 'Long-lived secrets, over-privilege'] ],
        say: 'Human and non-human identities differ in important ways. | People authenticate with passkeys, multi-factor authentication and single sign-on. Non-human identities use certificates, tokens and workload identity. | Human lifecycles are driven by HR: joiners, movers and leavers. Non-human identities are created by code, and are often left behind when projects end. | You know your headcount, but non-human identities often outnumber people many times over. | And their typical weaknesses differ: phishing and password reuse for people; long-lived secrets and excessive privileges for machines.' },
      { t: 'bullets', title: 'Why agents need their own category', items: [
          { icon: 'dice', h: 'They decide at run time', d: 'Behaviour isn’t fixed in code', k: 'model' },
          { icon: 'users', h: 'They act for someone', d: 'Delegation must be recorded', k: 'human' },
          { icon: 'copy', h: 'They multiply', d: 'Spawned per task, short-lived', k: 'neutral' },
          { icon: 'bug', h: 'They can be manipulated', d: 'Injected content steers them', k: 'threat' },
          { icon: 'audit', h: 'They need attribution', d: 'Which agent, for whom, why', k: 'control' } ],
        say: 'Agents don’t fit neatly into either group. | Unlike a normal workload, an agent decides what to do at run time, so its behaviour isn’t fixed in code. | It usually acts on behalf of a person, so the delegation must be recorded. | Agents multiply: they can be spawned for each task, and may live only for minutes. | They can be manipulated by the content they read. | And every action needs clear attribution: which agent, acting for whom, under which instructions. That is why agents should get their own identities, never a shared service account or a borrowed human login.' },
      { t: 'flow', title: 'From discovery to a governed identity',
        nodes: [
          { id: 'disc', x: 220, y: 330, icon: 'search', label: 'Discover', sub: 'accounts, keys, agents', k: 'neutral', w: 280 },
          { id: 'cls', x: 680, y: 330, icon: 'tag', label: 'Classify', sub: 'human, workload, agent, tool', k: 'data', w: 320 },
          { id: 'own', x: 1160, y: 330, icon: 'user', label: 'Assign an owner', sub: 'accountable person', k: 'human', w: 290 },
          { id: 'tier', x: 1160, y: 690, icon: 'scale', label: 'Rate the risk', sub: 'privilege, data, autonomy', k: 'threat', w: 300 },
          { id: 'auth', x: 680, y: 690, icon: 'key', label: 'Choose authentication', sub: 'strongest that fits', k: 'control', w: 320 },
          { id: 'inv', x: 220, y: 690, icon: 'list', label: 'Record', sub: 'identity inventory', k: 'model', w: 260 } ],
        edges: [{ from: 'disc', to: 'cls', k: 'neutral' }, { from: 'cls', to: 'own', k: 'data' }, { from: 'own', to: 'tier', k: 'human' }, { from: 'tier', to: 'auth', k: 'threat' }, { from: 'auth', to: 'inv', k: 'control' }],
        steps: [
          { show: 'disc', hi: 'disc' },
          { show: 'cls disc-cls', flow: 'disc-cls', hi: 'cls' },
          { show: 'own cls-own', flow: 'cls-own', hi: 'own' },
          { show: 'tier own-tier', flow: 'own-tier', hi: 'tier' },
          { show: 'auth tier-auth', flow: 'tier-auth', hi: 'auth', mark: { auth: 'lock' } },
          { show: 'inv auth-inv', flow: 'auth-inv', hi: 'inv', mark: { inv: 'ok' } } ],
        say: 'Bringing identities under control follows a simple path. First, discover them: user accounts, service accounts, API keys, tokens and agents, across clouds and AI platforms. | Classify each one: human, workload, agent or tool. | Assign an accountable owner, because every non-human identity needs a person responsible for it. | Rate its risk, based on privilege, the data it can reach, and how autonomously it acts. | Choose the strongest authentication that fits: phishing-resistant MFA for people, and workload identity rather than static keys for machines. | And record it in the identity inventory, which Module 4.7 covers in detail.' },
      { t: 'summary', items: ['Six kinds: users, privileged humans, workloads, agents, tools, external services', 'Non-human identities outnumber people and are often orphaned', 'Agents decide, delegate, multiply and can be manipulated', 'Discover, classify, own, rate, authenticate, record'],
        say: 'To recap. | AI systems involve human users, privileged humans, workloads, agents, tools and external services. | Non-human identities usually outnumber people, and are often left without an owner. | Agents need their own category, because they decide at run time, act for others, multiply and can be manipulated. | And every identity should be discovered, classified, owned, risk-rated, strongly authenticated and recorded.' } ] },
    { type: 'text', md: `### A classification scheme
| Category | Examples | Preferred authentication | Accountable owner |
|---|---|---|---|
| **Human users** | Employees, contractors, customers | SSO with phishing-resistant MFA; passkeys for customers | The person, under HR or customer terms |
| **Privileged humans** | ML engineers, platform and data administrators | Phishing-resistant MFA, privileged access management, just-in-time elevation | The person and their manager |
| **Workloads and services** | Training jobs, data pipelines, CI runners, inference services | Workload identity (platform-issued, short-lived), mTLS | The owning team |
| **AI agents** | Assistants that call tools; autonomous task agents; sub-agents | A distinct identity per agent, plus delegated tokens that record the user it acts for | A named sponsor or owner |
| **Tools and MCP servers** | Internal APIs, connectors, plugins | OAuth resource server with audience-bound tokens; mTLS | The team that operates the tool |
| **External AI services** | Model provider APIs, partner agents | Federated or OAuth credentials with scoped access; API keys only where unavoidable | The relationship owner (Module 2.5) |

### Why non-human identities need attention
Non-human identities commonly outnumber human ones many times over, and they are created by scripts, pipelines and developers rather than by HR processes. The **OWASP Non-Human Identities Top 10 (2025)** highlights risks such as improper offboarding, secret leakage, over-privileged identities, long-lived secrets, reuse of one identity across systems, and humans logging in with machine identities.

### Agent identity principles
- **One identity per agent**, never a shared service account and never a human’s credentials. This makes actions attributable and lets you revoke one agent without affecting others.
- **Record delegation:** when an agent acts for a user, its tokens should show both identities (Section 2), and its rights should never exceed that user’s (Module 4.6).
- **Link to a sponsor:** every agent has a human owner responsible for its purpose, permissions and retirement.
- **Bind to configuration:** record which model version, system prompt and tools an agent identity runs with, because its behaviour depends on them.
- **Short-lived where possible:** task-scoped agents get credentials that expire with the task.

### Common mistakes
- Agents running under a developer’s personal account or API key.
- One shared "AI service account" used by every assistant and pipeline.
- Service accounts that outlive the project that created them.
- People logging in interactively with a machine identity, which hides who actually acted.` },
    { type: 'callout', kind: 'exam', title: 'Identity classification questions', md: `Shared accounts are almost always the wrong answer. The best answers give **every human, workload and agent its own identity**, with a **named owner**, the **strongest suitable authentication**, and a record in the **inventory**.` },
    { type: 'check', q: { q: 'A team runs five customer-service agents, all using one service account created by a developer who has since left. What is the BEST first step?', o: ['Change the shared service account’s password, and store the new one in the team wiki', 'Give each agent its own identity with a named owner, then retire the shared account', 'Leave the setup as it is, because the agents only call internal systems', 'Move the shared service account into the admin group, so failures are easier to fix'], a: 1, b: 1,
      why: 'Distinct identities make each agent’s actions attributable and individually revocable, and an owner keeps them governed. Rotating a shared password keeps the shared account; internal use doesn’t remove the risk; admin rights make it worse.' } }
  ]
};
