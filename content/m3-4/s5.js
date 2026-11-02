/* 3.4 · Section 5: purpose-based and restricted data access controls (agentic AI data catalogs) */
module.exports = {
  title: 'Purpose-based access and agentic data catalogs', covers: [5],
  blocks: [
    { type: 'video', title: 'Access by purpose, not just by role', kicker: 'Module 3.4 · Video 5 of 6', scenes: [
      { t: 'title', kicker: 'Module 3.4 · Data protection', title: 'Access by purpose, not just by role', sub: 'Purpose-based access control and agentic AI data catalogs', icon: 'target',
        say: 'AI systems, and especially agents, request data at machine speed across many sources. Role-based access alone tends to grant too much. | This video covers purpose-based and restricted data access controls, and how data catalogs give agents governed access to data.' },
      { t: 'compare', title: 'RBAC, ABAC and PBAC', labels: ['Decides on', 'Example rule', 'AI fit'],
        cols: [{ h: 'Role-based', icon: 'users', k: 'neutral' }, { h: 'Attribute-based', icon: 'sliders', k: 'data' }, { h: 'Purpose-based', icon: 'target', k: 'control' }],
        rows: [
          ['The requester’s role', 'User, data and context attributes', 'The approved purpose of the request'],
          ['Analysts may read sales data', 'EU staff read EU data at work', 'Fraud training may use masked payments'],
          ['Coarse; roles over-grant', 'Fine-grained and contextual', 'Enforces purpose limitation'] ],
        say: 'Three models of access control are worth comparing. | Role-based access decides on the requester’s role. Attribute-based access decides on attributes of the user, the data and the context. Purpose-based access decides on the declared and approved purpose of the request. | For example: analysts may read sales data; EU staff may read EU data during working hours; the fraud-model training pipeline may use masked payment data. | Roles alone are coarse and tend to over-grant. Attributes add fine-grained context. Purpose-based control enforces purpose limitation directly, which is exactly what privacy law asks of AI training and use.' },
      { t: 'flow', title: 'An agent requests data through a catalog',
        nodes: [
          { id: 'agent', x: 230, y: 330, icon: 'robot', label: 'Agent', sub: 'for a user, with a stated purpose', k: 'model', w: 310 },
          { id: 'cat', x: 640, y: 330, icon: 'book', label: 'Data catalog', sub: 'products, owners, tags, purposes', k: 'data', w: 320 },
          { id: 'pol', x: 1050, y: 330, icon: 'scale', label: 'Policy decision', sub: 'identity, purpose, tags, context', k: 'control', w: 320 },
          { id: 'view', x: 1390, y: 330, icon: 'eye', label: 'Governed view', sub: 'masked, filtered, time-boxed', k: 'human', w: 250 },
          { id: 'log', x: 1050, y: 690, icon: 'list', label: 'Audit trail', sub: 'who, what, why, when', k: 'neutral', w: 290 } ],
        edges: [{ from: 'agent', to: 'cat', k: 'model' }, { from: 'cat', to: 'pol', k: 'data' }, { from: 'pol', to: 'view', k: 'control' }, { from: 'pol', to: 'log', k: 'neutral' }],
        steps: [
          { show: 'agent', hi: 'agent' },
          { show: 'cat agent-cat', flow: 'agent-cat', hi: 'cat' },
          { show: 'pol cat-pol', flow: 'cat-pol', hi: 'pol' },
          { show: 'view pol-view', flow: 'pol-view', hi: 'view', mark: { view: 'ok' } },
          { show: 'log pol-log', flow: 'pol-log', hi: 'log' } ],
        say: 'Here is purpose-based access for an agent. The agent acts on behalf of a user, and declares the purpose of its request. | It discovers data through a catalog that lists governed data products, with their owners, sensitivity tags and approved purposes, rather than through raw tables. | A policy decision point evaluates the user’s identity, the agent’s identity, the declared purpose, the data’s tags and the context. | If the request is allowed, the agent receives a governed view: masked, filtered to what the purpose needs, and time-limited. | And every decision is recorded: who asked, for what, why and when.' },
      { t: 'bullets', title: 'Controls for restricted data', layout: 'grid', cols: 2, items: [
          { icon: 'clock', h: 'Least privilege, just in time', d: 'Permissions only while a task needs them', k: 'control' },
          { icon: 'user', h: 'Delegated access', d: 'Never more than the user could see', k: 'human' },
          { icon: 'mask', h: 'Row, column and masking rules', d: 'Return only what the purpose needs', k: 'data' },
          { icon: 'lock', h: 'Clean rooms and enclaves', d: 'Analyse without copying out', k: 'model' },
          { icon: 'target', h: 'Purpose binding', d: 'No reuse for another purpose', k: 'neutral' },
          { icon: 'hitl', h: 'Human approval', d: 'For unusual or bulk requests', k: 'threat' } ],
        say: 'Restricted data needs extra controls. | Least privilege with just-in-time access, so agents hold permissions only while a task needs them. | Delegated access: an agent acting for a user never gets more than that user could see, which prevents the confused deputy problem. | Row- and column-level security and dynamic masking, so queries return only what the purpose needs. | Clean rooms or enclaves for the most sensitive data, where it can be analysed without being copied out. | Purpose binding, so data released for one purpose isn’t reused for another. | And human approval for unusually sensitive or large requests.' },
      { t: 'summary', items: ['Roles over-grant; add attributes and approved purposes', 'Agents discover governed data products through a catalog', 'Policy decides on identity, purpose, tags and context; log everything', 'Delegate, mask, time-box, and bind data to its purpose'],
        say: 'To recap. | Roles alone over-grant, so add attributes and approved purposes. | Let agents discover governed data products through a catalog, rather than roam raw data stores. | Decide access on identity, purpose, data tags and context, and log every decision. | And for restricted data, delegate rather than impersonate, mask and filter, time-box access, and bind data to its purpose.' } ] },
    { type: 'text', md: `### Access control models
| Model | Basis | Strengths | Weaknesses |
|---|---|---|---|
| **Role-based (RBAC)** | Job role | Simple, auditable | Coarse; roles accumulate permissions |
| **Attribute-based (ABAC)** | Attributes of subject, resource, action and context | Fine-grained, contextual, scales with tags | Needs good attribute and tag quality |
| **Purpose-based (PBAC)** | The declared, approved purpose of the request | Directly enforces purpose limitation and consent | Needs a registry of purposes and honest declaration, backed by monitoring |
| **Relationship-based (ReBAC)** | Relationships, such as document sharing | Mirrors how collaboration tools share content | Complex to analyse at scale |

Policies are best written as **code** and evaluated by a **policy decision point**, with **enforcement points** in front of data stores, retrieval systems and tools. Combining models is normal: a request might need the right role, matching attributes and an approved purpose.

### Purpose-based access in practice
Register approved purposes (for example, *customer service*, *fraud model training*, *aggregate analytics*) against each data product, linked to its lawful basis and any consent (Module 3.2). Pipelines and agents declare a purpose when requesting data; policy checks that the purpose is approved for that data and requester, and returns a view shaped to the purpose (masked, filtered, aggregated or time-limited). Monitor for mismatches between declared purposes and actual use.

### Agentic AI data catalogs
A data catalog becomes the **control plane** for agent data access. It lists governed **data products** with owners, schemas, sensitivity tags, lineage, quality and approved purposes. Agents discover and request data through catalog interfaces or tools rather than holding direct database credentials, which means:
- Agents see **curated, documented data**, which also improves answer quality.
- Policy is enforced consistently, and every access is **logged with its purpose**.
- Owners can **revoke or change** access centrally.

Treat catalog metadata as data, not instructions: a malicious description could try to steer an agent, and some metadata (such as sensitive table names) is itself sensitive.

### Restricted data
For the most sensitive categories (special category data, export-controlled technical data, legal privilege, merger and acquisition information), add segregated environments, **data clean rooms** or enclaves where analysis happens without data leaving, extra approvals, strict logging, and monitoring for bulk extraction. Ensure agents use **delegated (on-behalf-of) access** so they can never exceed the permissions of the user they serve (Module 4.6 covers authorisation for AI in depth).` },
    { type: 'callout', kind: 'exam', title: 'Over-privileged agents', md: `A recurring exam pattern: an agent or RAG system uses **one broad service account**. The best answer replaces it with **delegated, least-privilege, purpose-bound access** to governed data, with logging. System prompt instructions such as “only query what you need” are never an access control.` },
    { type: 'check', q: { q: 'An AI agent that helps customer-service staff can query every table in the customer database through a shared service account. Which change BEST limits the risk?', o: ['Add a system prompt instruction telling the agent to query only the tables each request needs', 'Give it delegated, purpose-bound access to governed views of only the data customer service needs', 'Rotate the shared service account password monthly and store it in an encrypted configuration file', 'Log every query the agent runs and have the security team review a sample of them each quarter'], a: 1, b: 5,
      why: 'Delegated, purpose-bound access to governed views limits what the agent can reach to what the task and the user justify. Prompts aren’t controls, rotation doesn’t reduce scope, and sampled logs detect misuse only after the fact.' } }
  ]
};
