/* 4.6 · Section 1: least privilege and separation of duties across AI models and agentic workflows */
module.exports = {
  title: 'Least privilege and separation of duties for AI', covers: [1],
  blocks: [
    { type: 'video', title: 'Just enough, and never alone', kicker: 'Module 4.6 · Video 1 of 4', scenes: [
      { t: 'title', kicker: 'Module 4.6 · Authorisation', title: 'Just enough, and never alone', sub: 'Least privilege and separation of duties for AI', icon: 'lock',
        say: 'Two of security’s oldest principles matter even more when software can decide and act on its own: least privilege, and separation of duties. | This video applies both across AI models, pipelines and agentic workflows.' },
      { t: 'bullets', title: 'Least privilege, component by component', layout: 'grid', cols: 2, items: [
          { icon: 'model', h: 'Models', d: 'No direct access; only via tools', k: 'model' },
          { icon: 'robot', h: 'Agents', d: 'Per-task tools, read-only by default', k: 'human' },
          { icon: 'tool', h: 'Tools', d: 'Narrow functions, not generic ones', k: 'control' },
          { icon: 'pipeline', h: 'Pipelines', d: 'Separate credentials per stage', k: 'neutral' },
          { icon: 'database', h: 'Data access', d: 'Rows, columns and purposes', k: 'data' },
          { icon: 'user', h: 'People', d: 'No standing admin access', k: 'threat' } ],
        say: 'Least privilege means every component gets only the access its job needs. | A model should have no direct access to data or systems; it reaches them only through controlled tools. | Agents get the tools and scopes for their current task, and start read-only. | Tools should offer narrow functions rather than generic ones. | Pipelines use separate credentials for each stage. | Data access is limited by row, column and approved purpose. | And people, including administrators, have no standing access to production models or weights, only elevation when needed.' },
      { t: 'compare', title: 'Generic tools and narrow tools', labels: ['Example', 'If the agent is fooled', 'Testing', 'Policy checks'],
        cols: [{ h: 'Generic tool', icon: 'code', k: 'threat' }, { h: 'Narrow tool', icon: 'tool', k: 'control' }],
        rows: [
          ['Run any SQL query', 'Look up one order’s status'],
          ['Reads or deletes anything', 'Reveals one order at most'],
          ['Endless cases', 'Small, testable surface'],
          ['Hard to express', 'Easy to express'] ],
        say: 'Tool design is where least privilege is won or lost. | Compare a generic tool that runs any database query with a narrow one that looks up a single order’s status. | If a manipulated agent misuses the generic tool, it could read or delete anything the database credentials allow. The narrow tool limits the damage to one order. | The generic tool has an endless number of cases to test; the narrow one has a small, testable surface. | And policy for a narrow tool is easy to express, while policy for arbitrary queries is very hard. So build narrow tools, and keep generic ones away from agents.' },
      { t: 'bullets', title: 'Separation of duties in AI systems', items: [
          { icon: 'users', h: 'Builders don’t approve', d: 'Independent validation and sign-off', k: 'human' },
          { icon: 'split', h: 'Train apart from deploy', d: 'Different identities and credentials', k: 'neutral' },
          { icon: 'check', h: 'Maker and checker', d: 'Agent proposes; another party approves', k: 'control' },
          { icon: 'lock', h: 'No self-modification', d: 'Agents can’t change their own rights or rules', k: 'threat' },
          { icon: 'key', h: 'Two people for crown jewels', d: 'Weight exports, key operations', k: 'data' } ],
        say: 'Separation of duties means no single person, or system, can complete a sensitive process alone. | The people who build a model don’t approve it for production. | Training and deployment use different identities and credentials. | Agents act as makers, not checkers: an agent can propose a payment, but a different party approves it. | Agents can never change their own permissions, prompts or guardrails. | And the most sensitive operations, such as exporting weights or using signing keys, need two people.' },
      { t: 'flow', title: 'Separation of duties across the model lifecycle',
        nodes: [
          { id: 'ds', x: 220, y: 330, icon: 'database', label: 'Data steward', sub: 'approves data use', k: 'data', w: 280 },
          { id: 'mle', x: 680, y: 330, icon: 'code', label: 'ML engineer', sub: 'builds and trains', k: 'model', w: 280 },
          { id: 'val', x: 1150, y: 330, icon: 'search', label: 'Independent validator', sub: 'tests and challenges', k: 'control', w: 330 },
          { id: 'own', x: 1150, y: 690, icon: 'gavel', label: 'Risk owner', sub: 'approves for the tier', k: 'human', w: 280 },
          { id: 'plat', x: 680, y: 690, icon: 'server', label: 'Platform team', sub: 'deploys approved versions', k: 'neutral', w: 320 },
          { id: 'soc', x: 220, y: 690, icon: 'eye', label: 'Security operations', sub: 'monitors in production', k: 'threat', w: 320 } ],
        edges: [{ from: 'ds', to: 'mle', k: 'data' }, { from: 'mle', to: 'val', k: 'model' }, { from: 'val', to: 'own', k: 'control' }, { from: 'own', to: 'plat', k: 'human' }, { from: 'plat', to: 'soc', k: 'neutral' }],
        steps: [
          { show: 'ds', hi: 'ds' },
          { show: 'mle ds-mle', flow: 'ds-mle', hi: 'mle' },
          { show: 'val mle-val', flow: 'mle-val', hi: 'val' },
          { show: 'own val-own', flow: 'val-own', hi: 'own', mark: { own: 'ok' } },
          { show: 'plat own-plat', flow: 'own-plat', hi: 'plat' },
          { show: 'soc plat-soc', flow: 'plat-soc', hi: 'soc' } ],
        say: 'Here is separation of duties across a model’s lifecycle. A data steward approves which data may be used, and for what purpose. | Machine learning engineers build and train the model, but can’t approve it. | An independent validator tests and challenges it. | A risk owner approves it for production, in line with its risk tier. | The platform team deploys only approved versions, using credentials the builders don’t hold. | And security operations monitors it in production, independently of the team that runs it.' },
      { t: 'summary', items: ['Models reach systems only through narrow, controlled tools', 'Agents: per-task, read-only first; people: no standing admin', 'Builders don’t approve; agents propose but don’t approve', 'No self-modification; two people for crown-jewel operations'],
        say: 'To recap. | Models should reach systems only through narrow, controlled tools. | Agents get per-task permissions, read-only first, and people get no standing administrative access. | Builders don’t approve their own models, and agents can propose but never approve high-impact actions. | And no agent may change its own permissions, while crown-jewel operations need two people.' } ] },
    { type: 'text', md: `### Least privilege for AI components
| Component | Least-privilege practice |
|---|---|
| **Model** | No direct credentials or network access; reaches data and systems only through tools that enforce policy |
| **Agent** | A distinct identity (Module 4.5); only the tools and scopes for the current task; read-only by default; write and delete rights only where needed, ideally with approval |
| **Tools and MCP servers** | Narrow, purpose-built functions (*refund up to £200 to the original payment method*) rather than generic ones (*run SQL*, *call any URL*, *execute shell*) |
| **Retrieval** | Document permissions enforced at query time, filtered to what the requesting user may see (Module 1.2) |
| **Pipelines** | Per-stage, short-lived credentials; training can’t deploy, and deployment can’t read raw training data (Module 3.5) |
| **Data** | Row-, column- and purpose-level controls (Module 3.4) |
| **People** | Zero standing privilege for production models, weights and data; just-in-time elevation (Section 2) |

### Separation of duties
Separation of duties (NIST SP 800-53 AC-5; ISO/IEC 27001 Annex A 5.3, segregation of duties) prevents one identity from completing a sensitive process alone. In AI systems, look for **toxic combinations**:
- The same identity can **change training data and approve** the resulting model.
- An agent can **create a payee and pay it**, or **raise and approve** its own purchase order.
- An agent or pipeline can **modify its own permissions, prompts or guardrails**.
- One administrator can **export model weights** without a second approval.
- The team that runs a model is the **only** team monitoring it.

**Maker–checker for agents:** let agents prepare actions (draft the email, stage the payment, propose the change) and route approval to a human or an independent system. A second model reviewing the first is weaker than it looks, because both can be influenced by the same injected content; use deterministic policy checks and human approval for high-impact steps.

### Implementing the principles
- Build an **SoD matrix** of duties that must not be combined, and check role and permission assignments against it, including for non-human identities.
- Use **separate identities** for building, approving, deploying and operating.
- Make **guardrail, prompt and permission changes** go through change control, never through the agent itself.
- **Review** effective permissions regularly, because agents and tools gather rights over time (Module 4.7).` },
    { type: 'match', title: 'Spot the toxic combination', pairs: [
      ['An agent can add a new supplier and also pay invoices to it', 'Maker and checker in one identity'],
      ['The data scientist who trained a model also signs it off for production', 'Builder approves own work'],
      ['An agent can edit the policy file that limits its own tools', 'Self-modification'],
      ['One administrator can export model weights with no second approval', 'Missing two-person control'],
      ['The only alerts on a model come from the team that runs it', 'No independent monitoring'] ] },
    { type: 'callout', kind: 'exam', title: 'PoLP and SoD questions', md: `Prefer **narrow tools**, **per-task scopes** and **read-only defaults** over broad access "for flexibility". If one identity, human or agent, can both **initiate and approve** a sensitive action, the best answer splits those duties.` },
    { type: 'check', q: { q: 'A sales assistant agent is given a tool that runs any SQL query against the CRM database, so that it can answer a wide range of questions. What is the BEST improvement?', o: ['Keep the generic tool, but add a system prompt telling the agent to use only SELECT statements', 'Replace it with narrow tools for specific lookups, running with read-only, scoped credentials', 'Give the agent a separate copy of the CRM database, so that queries can’t affect production', 'Log every query the agent runs, and review the logs at the end of each month for problems'], a: 1, b: 1,
      why: 'Narrow, read-only tools limit what a manipulated agent can do and are easy to test and govern. Prompt instructions can be overridden, a copy still exposes all the data, and monthly log reviews only find problems later.' } }
  ]
};
