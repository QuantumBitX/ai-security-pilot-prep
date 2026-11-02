/* 4.5 · Section 2: identity architectures for non-repudiation and verified accountability */
module.exports = {
  title: 'Identity architectures for non-repudiation and accountability', covers: [2],
  blocks: [
    { type: 'video', title: 'Proving who did what', kicker: 'Module 4.5 · Video 2 of 5', scenes: [
      { t: 'title', kicker: 'Module 4.5 · Identity and authentication', title: 'Proving who did what', sub: 'Non-repudiation and verified accountability', icon: 'audit',
        say: 'When an agent issues a refund or deletes a record, you need to prove which identity did it, on whose behalf, and that the record of it hasn’t been altered. | This video covers identity architectures that provide non-repudiation and verified accountability in AI systems.' },
      { t: 'flow', title: 'A chain of accountability',
        nodes: [
          { id: 'u', x: 220, y: 330, icon: 'user', label: 'User', sub: 'phishing-resistant MFA', k: 'human', w: 280 },
          { id: 'app', x: 660, y: 330, icon: 'chat', label: 'AI application', sub: 'authenticated session', k: 'neutral', w: 280 },
          { id: 'ag', x: 1130, y: 330, icon: 'robot', label: 'Agent', sub: 'own identity + delegation', k: 'model', w: 320 },
          { id: 'tool', x: 1130, y: 690, icon: 'tool', label: 'Tool or API', sub: 'checks both identities', k: 'control', w: 300 },
          { id: 'rec', x: 660, y: 690, icon: 'pen', label: 'Signed record', sub: 'who, for whom, what, when', k: 'data', w: 320 },
          { id: 'log', x: 230, y: 690, icon: 'hash', label: 'Tamper-evident log', sub: 'hash-chained', k: 'neutral', w: 340 } ],
        edges: [{ from: 'u', to: 'app', k: 'human' }, { from: 'app', to: 'ag', k: 'neutral' }, { from: 'ag', to: 'tool', k: 'model' }, { from: 'tool', to: 'rec', k: 'control' }, { from: 'rec', to: 'log', k: 'data' }],
        steps: [
          { show: 'u', hi: 'u' },
          { show: 'app u-app', flow: 'u-app', hi: 'app' },
          { show: 'ag app-ag', flow: 'app-ag', hi: 'ag' },
          { show: 'tool ag-tool', flow: 'ag-tool', hi: 'tool', mark: { tool: 'lock' } },
          { show: 'rec tool-rec', flow: 'tool-rec', hi: 'rec' },
          { show: 'log rec-log', flow: 'rec-log', hi: 'log', mark: { log: 'ok' } } ],
        say: 'Accountability is a chain, and every link must hold. It starts with a user who signs in with phishing-resistant multi-factor authentication. | The AI application holds an authenticated session for that user. | The agent acts with its own identity, plus a delegated token that records the user it is acting for. | The tool or API validates both identities and the token’s scope before doing anything. | It writes a record of who acted, for whom, what was done and when, signed so it can’t be quietly changed. | And the record goes into a tamper-evident log, with each entry chained to the one before.' },
      { t: 'compare', title: 'Impersonation and delegation', labels: ['Token shows', 'Audit trail', 'Agent’s rights', 'Revocation'],
        cols: [{ h: 'Impersonation', icon: 'mask', k: 'threat' }, { h: 'Delegation', icon: 'users', k: 'control' }],
        rows: [
          ['Only the user', 'The user and the agent'],
          ['Can’t tell agent from person', 'Both recorded'],
          ['Everything the user can do', 'Scoped to the task'],
          ['Only by locking out the user', 'Revoke the agent alone'] ],
        say: 'There are two ways for an agent to act for a user, and only one supports accountability. | With impersonation, the agent’s token looks exactly like the user’s. With delegation, the token shows both the user and the agent acting for them. | So an impersonation audit trail can’t tell the agent from the person, while a delegation trail records both. | An impersonating agent can do everything the user can. A delegated agent gets only the scopes the task needs. | And to stop an impersonating agent, you have to lock out the user, while a delegated agent can be revoked on its own.' },
      { t: 'bullets', title: 'Building blocks of non-repudiation', layout: 'grid', cols: 2, items: [
          { icon: 'id', h: 'Unique identities', d: 'No shared accounts or keys', k: 'human' },
          { icon: 'key', h: 'Strong authentication', d: 'MFA, mTLS, workload identity', k: 'control' },
          { icon: 'lock', h: 'Proof of possession', d: 'Tokens bound to a key', k: 'data' },
          { icon: 'pen', h: 'Signed actions', d: 'Requests and approvals signed', k: 'model' },
          { icon: 'clock', h: 'Trusted time', d: 'Synchronised, stamped records', k: 'neutral' },
          { icon: 'hash', h: 'Protected evidence', d: 'Tamper-evident, retained logs', k: 'threat' } ],
        say: 'Non-repudiation rests on six building blocks. | Unique identities: no shared accounts, and no API keys used by several people or agents. | Strong authentication: phishing-resistant MFA for people, and mutual TLS or workload identity for machines. | Proof of possession: tokens bound to a key the holder controls, so a stolen token alone is useless. | Signed actions: high-impact requests and approvals carry digital signatures. | Trusted, synchronised time, so the order of events can be proven. | And protected evidence: tamper-evident logs kept for the required period.' },
      { t: 'summary', items: ['Accountability is a chain from user to agent to tool to log', 'Delegate, don’t impersonate: tokens should show user and agent', 'Unique identities, strong authentication, bound tokens, signatures', 'Trusted time and tamper-evident evidence complete the chain'],
        say: 'To recap. | Accountability is a chain, running from the user through the agent and the tool to a protected log. | Agents should use delegation, not impersonation, so tokens show both the user and the agent. | Use unique identities, strong authentication, proof-of-possession tokens and signed actions. | And complete the chain with trusted time and tamper-evident evidence.' } ] },
    { type: 'text', md: `### What non-repudiation requires
**Non-repudiation** is assurance that an actor can’t credibly deny an action. It needs four things together: a **strong binding** between the action and a unique identity, **integrity** of the request and the record, **reliable time**, and **protected evidence** that survives long enough to be used. Shared accounts, shared API keys and bearer tokens that anyone can replay all weaken it.

### Delegation in practice
- **OAuth 2.0 Token Exchange (RFC 8693)** lets a service swap a user’s token for a new one that records both the subject (the user) and the **actor** (the agent), with narrower scopes and audience. Multi-hop delegation can nest actors, so the full chain is visible.
- **On-behalf-of flows** in identity platforms do the same job: the downstream API sees who the user is and which application or agent is acting.
- **Consent and scope:** users or administrators approve what an agent may do; tokens carry only those scopes and expire with the task.
- **Never share passwords** with an agent, and never let an agent reuse a user’s session cookie. Both are impersonation.

### Binding tokens and signing actions
- **Proof-of-possession tokens:** DPoP (RFC 9449) and mTLS-bound tokens (RFC 8705) tie a token to a key held by the client, so a stolen token can’t be replayed elsewhere.
- **Signed requests:** HTTP Message Signatures (RFC 9421) or signed payloads let a recipient verify which key sent a request and that it wasn’t altered.
- **Hardware-backed keys:** keep signing keys for workloads and agents in HSMs, TPMs or cloud KMS, so they can’t be copied.
- **Signed approvals:** human approvals of high-impact agent actions should be authenticated and recorded with the approver’s identity, not just a click in a shared console.

### Verified accountability for AI
- Record **what the agent was** when it acted: model version, system prompt version, tools and policy configuration. Behaviour depends on them, so investigations need them.
- Link every agent identity to a **human sponsor**, and every high-impact action to the **user** it served and any **approver**.
- Keep logs **tamper-evident** (hash chains, write-once storage) and **time-synchronised**, and retain them as law and policy require (Module 3.5).
- Make the trail **queryable**: investigators should be able to answer "who did this, for whom, with what authority?" in minutes.` },
    { type: 'callout', kind: 'exam', title: 'Accountability questions', md: `Choose **delegation over impersonation**, **unique identities over shared ones**, and **bound or signed credentials over plain bearer secrets**. If a scenario says "we can’t tell whether the user or the agent did it", the fix is delegated tokens and logs that record **both** identities.` },
    { type: 'check', q: { q: 'An investigation can’t determine whether a customer or the support agent acting for them approved a refund, because the agent used the customer’s session. Which change BEST fixes this for the future?', o: ['Ask customers to confirm refunds by email, so that there is a written record of each one', 'Issue the agent delegated tokens that record both identities, and log both on every action', 'Store the customer’s password securely, so the agent can sign in properly when needed', 'Give the agent its own administrator account, separate from all customer sessions'], a: 1, b: 2,
      why: 'Delegated tokens show the user and the acting agent, so logs can attribute each action and the agent can be scoped and revoked separately. Emails don’t fix attribution, sharing passwords is impersonation, and an admin account gives far too much authority.' } }
  ]
};
