/* 4.6 · Section 2: authorisation methodologies (RBAC, ABAC, PBAC) and just-in-time access */
module.exports = {
  title: 'Authorisation models and just-in-time access for AI', covers: [2],
  blocks: [
    { type: 'video', title: 'Deciding what’s allowed, right now', kicker: 'Module 4.6 · Video 2 of 4', scenes: [
      { t: 'title', kicker: 'Module 4.6 · Authorisation', title: 'Deciding what’s allowed, right now', sub: 'RBAC, ABAC, PBAC and just-in-time access', icon: 'gavel',
        say: 'Authentication proves who is asking. Authorisation decides what they may do: this request, on this data, for this purpose, right now. | This video applies role, attribute and purpose-based authorisation to AI systems, and shows how just-in-time access removes standing privilege.' },
      { t: 'flow', title: 'Policy decision and enforcement',
        nodes: [
          { id: 'req', x: 220, y: 330, icon: 'robot', label: 'Request', sub: 'who, what, why, context', k: 'model', w: 300 },
          { id: 'pep', x: 680, y: 330, icon: 'filter', label: 'Enforcement point', sub: 'gateway or tool', k: 'control', w: 300 },
          { id: 'pdp', x: 1150, y: 330, icon: 'gavel', label: 'Policy engine', sub: 'roles, attributes, purpose', k: 'human', w: 320 },
          { id: 'dec', x: 1150, y: 690, icon: 'check', label: 'Decision', sub: 'allow, deny or conditions', k: 'data', w: 300 },
          { id: 'act', x: 680, y: 690, icon: 'tool', label: 'Enforced', sub: 'masked, approved or blocked', k: 'neutral', w: 300 },
          { id: 'log', x: 220, y: 690, icon: 'audit', label: 'Logged', sub: 'decision and reason', k: 'threat', w: 260 } ],
        edges: [{ from: 'req', to: 'pep', k: 'model' }, { from: 'pep', to: 'pdp', k: 'control' }, { from: 'pdp', to: 'dec', k: 'human' }, { from: 'dec', to: 'act', k: 'data' }, { from: 'act', to: 'log', k: 'neutral' }],
        steps: [
          { show: 'req', hi: 'req' },
          { show: 'pep req-pep', flow: 'req-pep', hi: 'pep' },
          { show: 'pdp pep-pdp', flow: 'pep-pdp', hi: 'pdp' },
          { show: 'dec pdp-dec', flow: 'pdp-dec', hi: 'dec' },
          { show: 'act dec-act', flow: 'dec-act', hi: 'act', mark: { act: 'lock' } },
          { show: 'log act-log', flow: 'act-log', hi: 'log' } ],
        say: 'Modern authorisation separates deciding from enforcing. A request arrives, for example an agent asking a tool for customer records. It carries who is asking, for whom, what action, why, and in what context. | An enforcement point, such as an AI gateway or the tool itself, intercepts it. | It asks a policy engine, which evaluates roles, attributes, the declared purpose and risk signals against policy written as code. | The decision can be allow, deny, or allow with conditions, such as masking some fields or requiring human approval. | The enforcement point applies that decision exactly. | And the decision and its reason are logged, so every access can be explained later.' },
      { t: 'compare', title: 'Three models, one agent', labels: ['Question asked', 'Agent example', 'Best for'],
        cols: [{ h: 'RBAC', icon: 'users', k: 'neutral' }, { h: 'ABAC', icon: 'sliders', k: 'data' }, { h: 'PBAC', icon: 'target', k: 'control' }],
        rows: [
          ['What role is calling?', 'Do the attributes match?', 'Is this purpose approved?'],
          ['Support agents read tickets', 'Only this customer, this session', 'Only to resolve this case'],
          ['Coarse baselines', 'Fine, contextual rules', 'Data protection, consent'] ],
        say: 'Module 3.4 introduced these models. Here is how they apply to one support agent. | Role-based control asks what role is calling. Attribute-based control asks whether attributes of the caller, resource, action and context match. Purpose-based control asks whether the declared purpose is approved for this data. | So, under role-based rules, support agents may read tickets. Attribute rules narrow that to this customer’s tickets, during this session. Purpose rules allow it only to resolve this case, not, say, to train a model. | Roles give coarse baselines, attributes add fine contextual rules, and purposes enforce data protection and consent. Real systems combine all three.' },
      { t: 'flow', title: 'Just-in-time elevation',
        nodes: [
          { id: 'rq', x: 220, y: 330, icon: 'user', label: 'Request', sub: 'reason and duration', k: 'human', w: 280 },
          { id: 'ap', x: 680, y: 330, icon: 'check', label: 'Approve', sub: 'policy or a person', k: 'control', w: 280 },
          { id: 'gr', x: 1150, y: 330, icon: 'key', label: 'Temporary grant', sub: 'scoped, hours not months', k: 'data', w: 320 },
          { id: 'rec', x: 1150, y: 690, icon: 'eye', label: 'Recorded session', sub: 'actions captured', k: 'neutral', w: 300 },
          { id: 'rev', x: 680, y: 690, icon: 'clock', label: 'Automatic revocation', sub: 'at expiry', k: 'threat', w: 320 },
          { id: 'rv', x: 220, y: 690, icon: 'search', label: 'Review', sub: 'was it used properly?', k: 'model', w: 280 } ],
        edges: [{ from: 'rq', to: 'ap', k: 'human' }, { from: 'ap', to: 'gr', k: 'control' }, { from: 'gr', to: 'rec', k: 'data' }, { from: 'rec', to: 'rev', k: 'neutral' }, { from: 'rev', to: 'rv', k: 'threat' }],
        steps: [
          { show: 'rq', hi: 'rq' },
          { show: 'ap rq-ap', flow: 'rq-ap', hi: 'ap' },
          { show: 'gr ap-gr', flow: 'ap-gr', hi: 'gr', mark: { gr: 'key' } },
          { show: 'rec gr-rec', flow: 'gr-rec', hi: 'rec' },
          { show: 'rev rec-rev', flow: 'rec-rev', hi: 'rev', mark: { rev: 'lock' } },
          { show: 'rv rev-rv', flow: 'rev-rv', hi: 'rv', mark: { rv: 'ok' } } ],
        say: 'Just-in-time access replaces standing privilege with temporary, approved elevation. An engineer requests access, stating the reason and how long they need it. | Low-risk requests can be approved automatically by policy; high-risk ones go to a person. | Access is granted temporarily, scoped to the task, for hours rather than months. | The privileged session is recorded. | Access is revoked automatically when it expires, with no one needing to remember. | And use is reviewed, so misuse or unusual patterns are caught.' },
      { t: 'bullets', title: 'Where AI platforms need just-in-time access', layout: 'grid', cols: 2, items: [
          { icon: 'book', h: 'Registry write access', d: 'Changing production model status', k: 'human' },
          { icon: 'database', h: 'Sensitive training data', d: 'Personal or regulated data stores', k: 'data' },
          { icon: 'model', h: 'Weight exports', d: 'With a second approver', k: 'threat' },
          { icon: 'robot', h: 'Agent permission changes', d: 'New tools or wider scopes', k: 'model' },
          { icon: 'siren', h: 'Break-glass in incidents', d: 'Fast, logged, reviewed', k: 'control' },
          { icon: 'clock', h: 'Agents themselves', d: 'Task-scoped, expiring tokens', k: 'neutral' } ],
        say: 'On AI platforms, just-in-time access fits six situations. | Write access to the model registry, which controls what reaches production. | Stores of personal or regulated training data. | Exports of model weights, with a second approver. | Changes to an agent’s permissions, such as adding tools or widening scopes. | Break-glass access during incidents: fast, but logged and reviewed. | And agents themselves, which should receive task-scoped tokens that expire when the task ends.' },
      { t: 'summary', items: ['Separate decision (policy engine) from enforcement (gateway, tool)', 'Combine RBAC baselines, ABAC context and PBAC purpose', 'Decisions can carry conditions: mask, approve, limit', 'Just-in-time: requested, approved, scoped, recorded, auto-revoked'],
        say: 'To recap. | Separate the policy decision from its enforcement in gateways and tools, with policy written as code. | Combine role baselines, attribute context and purpose checks. | Let decisions carry conditions, such as masking fields or requiring approval. | And replace standing privilege with just-in-time access that is requested, approved, scoped, recorded and revoked automatically.' } ] },
    { type: 'text', md: `### Authorisation architecture
- **Policy decision point (PDP):** evaluates requests against policy. Policy-as-code engines such as Open Policy Agent (Rego) and Cedar keep rules versioned, testable and reviewable.
- **Policy enforcement point (PEP):** sits in the request path (AI gateway, tool server, retrieval layer, data store) and applies the decision.
- **Policy information point (PIP):** supplies attributes: user and agent identity, data classification, purpose registry, risk scores.
- **Policy administration point (PAP):** where policies are written, reviewed and approved.

Decisions can include **obligations**: mask fields, redact documents, cap amounts, or require step-up or human approval. Authorisation should be **continuous**: re-evaluated as context changes during a session, not just at sign-in.

### Choosing and combining models for AI
| Situation | Typical approach |
|---|---|
| Which tools an agent type may use | RBAC baseline per agent role |
| Which records an agent may read for a user | ABAC (user, tenant, region, session) plus delegation (Module 4.5) |
| Whether data may be used for a task, such as training | PBAC against registered purposes (Module 3.4) |
| Which documents a RAG system may retrieve | Document-level permissions (ACLs or relationship-based rules) filtered at query time for the requesting user |
| Whether a specific high-value action may proceed | Transaction-level policy (amount, payee, risk) with approval obligations |

### Just-in-time access
- **Zero standing privilege:** administrators hold no permanent production rights; they elevate for a task.
- **Request, approve, grant, record, revoke:** with reasons, time limits and automatic expiry.
- **Risk-based approval:** automatic for low-risk elevation, human approval (and step-up authentication) for high-risk.
- **Break-glass accounts:** for emergencies when normal approval isn’t possible; tightly controlled, monitored, and reviewed after every use (Module 5.5).
- **For non-human identities:** issue short-lived, task-scoped tokens on demand rather than permanent service-account rights.
- **Privileged access management (PAM)** tools typically provide the workflow, credential vaulting and session recording.` },
    { type: 'steps', title: 'Rolling out just-in-time access on an AI platform', items: [
      ['Find standing privilege', 'List every human and non-human identity with permanent rights to production models, weights, registries, training data and agent configurations. Include service accounts and shared admin accounts.'],
      ['Define eligible roles and approvers', 'Decide who may request each elevation, who approves it, and which low-risk elevations policy can approve automatically.'],
      ['Set limits', 'Choose maximum durations, require a reason and a ticket, and add step-up authentication for high-risk roles such as weight export or registry approval (Module 4.5).'],
      ['Automate grant, recording and revocation', 'Use a PAM or cloud JIT service so access is granted, session-recorded and removed without manual steps.'],
      ['Remove what remains, and review', 'Delete the old standing rights, keep tightly controlled break-glass accounts, and review elevation patterns monthly for misuse and for roles that need redesign.'] ] },
    { type: 'flip', title: 'Authorisation vocabulary', cards: [
      ['Policy decision point (PDP)', 'The engine that evaluates a request against policy and returns allow, deny or conditions.'],
      ['Policy enforcement point (PEP)', 'The component in the request path that applies the decision, such as a gateway or tool.'],
      ['Obligation', 'A condition attached to an allow decision, such as masking fields or requiring approval.'],
      ['Zero standing privilege', 'No permanent administrative rights; access is granted just in time for a task.'],
      ['Break-glass access', 'Emergency access outside normal approval, tightly monitored and reviewed after use.'] ] },
    { type: 'callout', kind: 'exam', title: 'Authorisation questions', md: `Look for **policy enforced outside the model**, in gateways, tools and retrieval, with **context** (attributes, purpose) and **time limits**. Standing administrator access to production AI assets is a red flag; **just-in-time** elevation with approval and recording is usually the best answer.` },
    { type: 'check', q: { q: 'Six ML engineers hold permanent administrator rights to the production model registry, though each needs them only a few times a year. What is the BEST change?', o: ['Keep the permanent rights, but require the engineers to complete annual security training', 'Remove standing rights, and grant time-limited, approved and recorded elevation when needed', 'Reduce the number of engineers with permanent rights from six people to three', 'Share one administrator account between the engineers, so all registry activity is in one place'], a: 1, b: 2,
      why: 'Just-in-time elevation removes standing privilege, so a compromised account has no production rights most of the time, and every use is approved and recorded. Training and fewer admins help less, and a shared account destroys accountability.' } }
  ]
};
