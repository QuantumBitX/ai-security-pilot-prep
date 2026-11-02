/* 4.7 · Section 1: AI identity inventories (human and non-human) */
module.exports = {
  title: 'AI identity inventories', covers: [1],
  blocks: [
    { type: 'video', title: 'You can’t secure identities you can’t see', kicker: 'Module 4.7 · Video 1 of 4', scenes: [
      { t: 'title', kicker: 'Module 4.7 · Identity lifecycle', title: 'You can’t secure identities you can’t see', sub: 'Inventories of human and non-human AI identities', icon: 'list',
        say: 'Every review, revocation and investigation starts with the same question: which identities exist, and what can they do? | This video covers building and maintaining an inventory of human and non-human identities across AI systems.' },
      { t: 'bullets', title: 'What the inventory records', layout: 'grid', cols: 2, items: [
          { icon: 'id', h: 'Identity and type', d: 'Human, workload, agent, tool', k: 'neutral' },
          { icon: 'user', h: 'Owner or sponsor', d: 'A named, current person', k: 'human' },
          { icon: 'target', h: 'Purpose and reach', d: 'Systems and data it accesses', k: 'data' },
          { icon: 'key', h: 'Credentials', d: 'Type, location, age, expiry', k: 'threat' },
          { icon: 'shield', h: 'Effective permissions', d: 'What it can actually do', k: 'control' },
          { icon: 'clock', h: 'Risk and activity', d: 'Tier, last used, last reviewed', k: 'model' } ],
        say: 'A useful inventory records six things about every identity. | Its identity and type: human, workload, agent or tool. | Its owner or sponsor: a named person who is still with the organisation. | Its purpose, and the systems and data it reaches. | Its credentials: what type they are, where they live, how old they are, and when they expire. | Its effective permissions: what it can actually do, which is often more than anyone intended. | And its risk tier, when it was last used, and when it was last reviewed.' },
      { t: 'flow', title: 'Building a living inventory',
        nodes: [
          { id: 'hr', x: 250, y: 320, icon: 'users', label: 'IdP and HR', sub: 'people and groups', k: 'human', w: 270 },
          { id: 'cl', x: 720, y: 320, icon: 'cloud', label: 'Cloud IAM', sub: 'roles, service accounts', k: 'data', w: 290 },
          { id: 'ai', x: 1190, y: 320, icon: 'robot', label: 'AI platforms', sub: 'agents, keys, MCP servers', k: 'model', w: 310 },
          { id: 'cor', x: 720, y: 690, icon: 'layers', label: 'Correlate', sub: 'merge, de-duplicate', k: 'neutral', w: 280 },
          { id: 'inv', x: 1190, y: 690, icon: 'list', label: 'Identity inventory', sub: 'owners, risk, activity', k: 'control', w: 320 } ],
        edges: [{ from: 'hr', to: 'cor', k: 'human' }, { from: 'cl', to: 'cor', k: 'data' }, { from: 'ai', to: 'cor', k: 'model' }, { from: 'cor', to: 'inv', k: 'neutral' }],
        steps: [
          { show: 'hr', hi: 'hr' },
          { show: 'cl', hi: 'cl' },
          { show: 'ai', hi: 'ai' },
          { show: 'cor hr-cor cl-cor ai-cor', flow: 'hr-cor cl-cor ai-cor', hi: 'cor' },
          { show: 'inv cor-inv', flow: 'cor-inv', hi: 'inv', mark: { inv: 'ok' } } ],
        say: 'A living inventory is fed automatically from several sources. The identity provider and HR systems supply people and their groups. | Cloud identity and access management supplies roles and service accounts. | AI platforms supply agents, API keys, model platform users and MCP server registrations, which traditional tools often miss. | All of this is correlated: duplicates merged, credentials linked to the identities that use them, and identities linked to owners. | The result is an identity inventory that stays current, with owners, risk ratings and activity, ready to drive reviews and incident response.' },
      { t: 'compare', title: 'A static list and a living inventory', labels: ['Updated', 'Coverage', 'Usefulness'],
        cols: [{ h: 'Static list', icon: 'doc', k: 'threat' }, { h: 'Living inventory', icon: 'cycle', k: 'control' }],
        rows: [
          ['By hand, each quarter', 'Continuously and automatically'],
          ['What people remember', 'Discovered across platforms'],
          ['Out of date at once', 'Drives reviews and response'] ],
        say: 'The difference between a static list and a living inventory is the difference between a record and a control. | A static list is updated by hand, perhaps each quarter. A living inventory updates continuously and automatically. | A static list covers what people remember to add. A living inventory is built from discovery across every platform. | So a static list is out of date as soon as it is written, while a living inventory can drive access reviews, alerts and incident response.' },
      { t: 'bullets', title: 'Risk signals in the inventory', layout: 'grid', cols: 2, items: [
          { icon: 'user', h: 'Orphaned', d: 'No current owner', k: 'threat' },
          { icon: 'clock', h: 'Dormant', d: 'Unused for 90 days or more', k: 'neutral' },
          { icon: 'shield', h: 'Over-privileged', d: 'Rights it never uses', k: 'human' },
          { icon: 'key', h: 'Long-lived secrets', d: 'Old, unrotated keys', k: 'data' },
          { icon: 'users', h: 'Shared', d: 'Used by several people or systems', k: 'model' },
          { icon: 'globe', h: 'External', d: 'Third-party and partner access', k: 'control' } ],
        say: 'Once the inventory exists, it reveals risk. | Orphaned identities, with no current owner. | Dormant identities, unused for ninety days or more. | Over-privileged identities, holding rights they never use. | Long-lived secrets: old keys that have never been rotated. | Shared identities, used by several people or systems, which destroy accountability. | And external identities: third parties and partners whose access must end when their work does.' },
      { t: 'summary', items: ['Record type, owner, purpose, credentials, permissions, activity', 'Feed it automatically from IdP, cloud IAM and AI platforms', 'A living inventory drives reviews, alerts and response', 'Watch for orphaned, dormant, over-privileged, shared and external'],
        say: 'To recap. | For every identity, record its type, owner, purpose, credentials, effective permissions and activity. | Feed the inventory automatically from the identity provider, cloud IAM and AI platforms. | A living inventory, unlike a static list, can drive reviews, alerts and incident response. | And use it to find orphaned, dormant, over-privileged, shared and external identities.' } ] },
    { type: 'text', md: `### Inventory fields
| Field | Why it matters |
|---|---|
| **Identifier and type** | Human, workload, agent, tool or external service (Module 4.5) |
| **Owner or sponsor** | Accountability for purpose, permissions and retirement; must be a current employee |
| **Purpose and linked systems** | Links to the AI use-case inventory and AIBOM (Modules 2.1 and 2.5), so you know which models, data and agents depend on it |
| **Credentials** | Type (password, key, certificate, federated), storage location, creation date, expiry, rotation history |
| **Effective permissions** | The rights it actually holds, across direct, group and inherited assignments |
| **Risk tier** | Based on privilege, data sensitivity, autonomy and exposure |
| **Activity** | Last sign-in or use, typical volumes, last review date and outcome |
| **Lifecycle dates** | Created, last changed, planned end date for contractors, projects and temporary agents |

### Sources for AI environments
- **Identity provider and HR:** employees, contractors, groups and roles.
- **Cloud IAM:** roles, service accounts, managed identities, access keys; cloud infrastructure entitlement management (CIEM) tools calculate effective permissions.
- **AI platforms and gateways:** model platform users and roles, API keys per project, agent registrations, MCP server and tool registrations, agent cards for agent-to-agent connections (Module 4.1).
- **Secrets vaults and scanners:** where credentials live, and where they have leaked (Module 4.5).
- **SaaS management:** AI tools connected through OAuth grants, including those users approved themselves.

### Keeping it current
- **Discover continuously** rather than by survey; reconcile new identities against approved requests.
- **Require an owner at creation:** platforms should refuse to create service accounts, keys or agents without a named sponsor.
- **Expire by default:** temporary identities and agent credentials carry end dates.
- **Feed downstream processes:** access reviews (Section 3), deprovisioning (Section 2), detection rules and incident response all read from the inventory.` },
    { type: 'match', title: 'Name the risk signal', pairs: [
      ['A service account whose creator left the company last year', 'Orphaned identity'],
      ['An agent identity with no activity for four months', 'Dormant identity'],
      ['A pipeline role with delete rights it has never used', 'Over-privileged identity'],
      ['One API key used by three different applications', 'Shared identity'],
      ['A consultant’s account with no end date', 'External access without expiry'] ] },
    { type: 'callout', kind: 'exam', title: 'Inventory questions', md: `The inventory is the **foundation**: questions about reviews, deprovisioning or incident scope often have "establish a complete, owned inventory" as the best first step. Favour **automated discovery** and **mandatory ownership** over manual lists.` },
    { type: 'check', q: { q: 'A CISO asks how many identities can reach the company’s AI training data. The IAM team can list employees, but not service accounts, API keys or agents. What should be done FIRST?', o: ['Send a survey to every team, asking them to list the service accounts and keys they use', 'Build an automated inventory from IdP, cloud IAM and AI platforms, with an owner for each', 'Revoke every non-human identity that can reach the training data, and wait for complaints', 'Report the employee count to the CISO, since people are the main risk to training data'], a: 1, b: 1,
      why: 'Automated discovery across identity sources, with ownership, gives a complete, current answer and supports ongoing control. Surveys miss identities and go stale, mass revocation breaks services, and ignoring non-human identities misses most of the access.' } }
  ]
};
