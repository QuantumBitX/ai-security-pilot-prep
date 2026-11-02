/* 4.6 · Section 4: preventing excessive agency, over-delegation and lateral movement by autonomous agents */
module.exports = {
  title: 'Preventing excessive agency, over-delegation and lateral movement', covers: [4],
  blocks: [
    { type: 'video', title: 'When agents go too far', kicker: 'Module 4.6 · Video 4 of 4', scenes: [
      { t: 'title', kicker: 'Module 4.6 · Authorisation', title: 'When agents go too far', sub: 'Excessive agency, over-delegation and lateral movement', icon: 'robot',
        say: 'Most agent incidents aren’t caused by clever attacks on the model. They happen because an agent had more power than its task needed, passed that power on, or used it to reach systems it should never have touched. | This video covers how to prevent excessive agency, over-delegation and lateral movement.' },
      { t: 'compare', title: 'Three ways agents overreach', labels: ['What it is', 'Example', 'Main control'],
        cols: [{ h: 'Excessive agency', icon: 'robot', k: 'threat' }, { h: 'Over-delegation', icon: 'users', k: 'human' }, { h: 'Lateral movement', icon: 'network', k: 'data' }],
        rows: [
          ['More tools, rights or autonomy than needed', 'Passing on more authority than a task needs', 'Using one foothold to reach other systems'],
          ['A mailbox tool that can also delete', 'A sub-agent handed the user’s full token', 'Agent credentials reused elsewhere'],
          ['Least privilege and approvals', 'Down-scoped, task tokens', 'Segmentation, per-agent identity'] ],
        say: 'Agents overreach in three related ways. | Excessive agency means having more tools, permissions or autonomy than the task needs. Over-delegation means passing on more authority than a task needs. Lateral movement means using one foothold to reach other systems. | For example: a mailbox tool that can delete as well as read; a sub-agent handed the user’s full token; or an agent’s credentials reused to reach unrelated systems. | And the main controls are, respectively: least privilege with approvals; down-scoped, task-specific tokens; and segmentation with a separate identity for every agent.' },
      { t: 'flow', title: 'Attenuate authority at every hop',
        nodes: [
          { id: 'u', x: 220, y: 330, icon: 'user', label: 'User', sub: 'full account rights', k: 'human', w: 270 },
          { id: 'o', x: 680, y: 330, icon: 'robot', label: 'Orchestrator', sub: 'this trip only', k: 'model', w: 280 },
          { id: 'r', x: 1150, y: 330, icon: 'search', label: 'Research agent', sub: 'read-only web search', k: 'data', w: 300 },
          { id: 'b', x: 1150, y: 690, icon: 'calendar', label: 'Booking agent', sub: 'one booking, up to £500', k: 'control', w: 320 },
          { id: 'x', x: 680, y: 690, icon: 'building', label: 'Partner travel agent', sub: 'itinerary only, no profile', k: 'neutral', w: 330 } ],
        edges: [{ from: 'u', to: 'o', k: 'human' }, { from: 'o', to: 'r', k: 'model' }, { from: 'r', to: 'b', k: 'data' }, { from: 'b', to: 'x', k: 'control' }],
        steps: [
          { show: 'u', hi: 'u' },
          { show: 'o u-o', flow: 'u-o', hi: 'o' },
          { show: 'r o-r', flow: 'o-r', hi: 'r' },
          { show: 'b r-b', flow: 'r-b', hi: 'b', mark: { b: 'lock' } },
          { show: 'x b-x', flow: 'b-x', hi: 'x', mark: { x: 'ok' } } ],
        say: 'In a chain of agents, authority should shrink at every hop. This is called attenuation. The user has full rights on their own account. | The orchestrator receives authority only for this trip. | A research agent gets read-only web search, and nothing else. | A booking agent gets the right to make one booking, up to five hundred pounds, and only after the user approves it. | And an external partner’s agent receives only the itinerary details it needs, never the user’s profile or payment credentials. If any agent in the chain is manipulated, the damage is limited to its own small slice of authority.' },
      { t: 'shield', title: 'Layered defences against excessive agency', target: 'Business systems', targetIcon: 'building',
        layers: ['Minimal tools and functions', 'Least-privilege permissions', 'Human approval for high impact', 'Monitoring and rate limits'],
        attacks: [{ t: 'Unneeded delete tool', stop: 0 }, { t: 'Over-broad credential', stop: 1 }, { t: 'Unapproved payment', stop: 2 }, { t: 'Runaway bulk actions', stop: 3 }],
        say: 'OWASP lists excessive agency as a top risk for language model applications, and defences work in layers. | Giving agents only the tools and functions they need means an unneeded delete tool simply doesn’t exist. | Least-privilege permissions mean an over-broad credential is never issued. | Human approval for high-impact actions stops an unapproved payment, even if the agent has been manipulated. | And monitoring with rate limits catches runaway bulk actions before they spread.' },
      { t: 'bullets', title: 'Stopping lateral movement', layout: 'grid', cols: 2, items: [
          { icon: 'id', h: 'An identity per agent', d: 'Never shared credentials', k: 'human' },
          { icon: 'network', h: 'Segment and allow-list', d: 'Agents reach only their tools', k: 'data' },
          { icon: 'x', h: 'No token forwarding', d: 'Audience-bound, never passed on', k: 'threat' },
          { icon: 'memory', h: 'Guard shared memory', d: 'Poisoned context spreads', k: 'model' },
          { icon: 'eye', h: 'Watch for new paths', d: 'New tools, hosts, sequences', k: 'neutral' },
          { icon: 'power', h: 'Contain fast', d: 'Revoke one agent, not all', k: 'control' } ],
        say: 'Six controls stop agents being used as stepping stones. | Give every agent its own identity and credentials, so compromising one doesn’t unlock the others. | Segment networks and allow-list destinations, so each agent reaches only its own tools. | Never forward tokens: credentials are bound to one audience and never passed along. | Guard shared memory and context, because poisoned content written by one agent can steer others. | Watch for new paths: unfamiliar tools, hosts or call sequences. | And contain fast: revoke a single agent’s identity without stopping every other agent.' },
      { t: 'summary', items: ['Excessive agency: more tools, rights or autonomy than needed', 'Over-delegation: attenuate authority at every hop', 'Lateral movement: per-agent identity, segmentation, no forwarding', 'Layer minimal tools, least privilege, approvals and monitoring'],
        say: 'To recap. | Excessive agency means more tools, rights or autonomy than the task needs. | Prevent over-delegation by attenuating authority at every hop in a chain of agents. | Prevent lateral movement with per-agent identities, segmentation, and no token forwarding. | And layer minimal tools, least privilege, human approval and monitoring.' } ] },
    { type: 'text', md: `### Excessive agency (OWASP LLM06:2025)
OWASP identifies three root causes:
- **Excessive functionality:** tools that do more than needed, such as a document tool that can also delete, or an "open-ended" tool that runs shell commands or arbitrary URLs.
- **Excessive permissions:** tools that run with credentials broader than the task, such as a reporting tool with write access to the database.
- **Excessive autonomy:** high-impact actions taken without independent verification or approval.

Mitigations include minimising tools and the functions inside them, avoiding open-ended tools, running actions in the **user’s context** with their permissions (delegation, Module 4.5), requiring **approval** for high-impact actions, **complete mediation** (authorisation checked in downstream systems, not just in the agent), and monitoring with rate limits.

### Over-delegation
- **Attenuation:** each delegation narrows scope, audience, amount and lifetime; never widen authority down a chain.
- **Delegation depth limits:** cap how many hops a task can pass through, and record every hop (token exchange actor chains, Module 4.5).
- **Capability-style tokens:** some token formats let the holder add restrictions before passing a token on, but never remove them, which makes attenuation enforceable.
- **External agents:** share only the data and authority a partner’s agent needs; verify its identity and treat its outputs as untrusted (Module 4.1).
- **Consent:** users should see and approve what is delegated on their behalf.

### Lateral movement by agents
Agents are attractive pivots: they hold credentials, reach many systems and can be steered by content. Controls:
- **Per-agent identities** and credentials, never shared service accounts (Module 4.5).
- **Network segmentation** and deny-by-default egress (Section 3; Module 4.2).
- **No token passthrough or forwarding**; audience-bound tokens only (Module 4.1).
- **Shared memory and vector stores** treated as attack paths: write controls, provenance and validation of stored content.
- **Detection:** unusual tool sequences, new destinations, privilege use spikes and agent-to-agent calls outside known patterns (Module 5.3).
- **Containment:** per-agent kill switches and revocation (Module 5.5).

### Zero trust for agents
Apply zero trust principles (Module 4.1): never assume an agent is trustworthy because it is internal; authenticate and authorise every call; give minimal, time-bound access; and assume compromise, so limit and watch what each agent can reach.` },
    { type: 'match', title: 'Name the overreach', pairs: [
      ['A summarisation agent’s tool can also delete documents', 'Excessive functionality'],
      ['A reporting agent connects with a database administrator account', 'Excessive permissions'],
      ['An agent sends external emails with no review step', 'Excessive autonomy'],
      ['An orchestrator gives a sub-agent the user’s full access token', 'Over-delegation'],
      ['A compromised agent’s credentials are used to reach the HR system', 'Lateral movement'] ] },
    { type: 'callout', kind: 'exam', title: 'Excessive agency questions', md: `When an agent does damage, ask three questions: **did it need that tool**, **did it need those permissions**, and **should that action have needed approval**? The best answers remove the unneeded capability, scope the credentials, and add approval or limits, rather than retraining or re-prompting the model.` },
    { type: 'check', q: { q: 'An orchestrator agent passes the user’s full OAuth token to every sub-agent it calls, including a third-party summarisation agent. What is the BEST fix?', o: ['Encrypt the token before passing it, so sub-agents can use it without reading it', 'Exchange it for down-scoped, short-lived tokens for each sub-agent’s specific task', 'Ask the third-party provider to confirm in writing that it won’t misuse the token', 'Pass the token only to sub-agents running inside the organisation’s own network'], a: 1, b: 4,
      why: 'Attenuated, task-specific tokens limit each sub-agent to what it needs, and an external agent should get the minimum of all. Encryption doesn’t reduce authority, written assurances aren’t controls, and internal agents can be compromised too.' } }
  ]
};
